import { NextRequest, NextResponse } from "next/server";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { anthropicClient } from "@/lib/anthropic-client";
import { sbServerClient } from "@/lib/supabase/server";
import { getBanks } from "@/lib/banks";
import { matchBank } from "@/lib/bank-matching";
import { StatementExtractionSchema } from "@/lib/statement-extraction";

const MAX_FILE_SIZE_BYTES = 15 * 1024 * 1024; // 15MB
const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "image/png",
  "image/jpeg",
]);

export async function POST(request: NextRequest) {
  const supabase = await sbServerClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }

  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: "Unsupported file type. Upload a PDF, PNG, or JPEG." },
      { status: 400 },
    );
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return NextResponse.json(
      { error: "File is too large (max 15MB)." },
      { status: 400 },
    );
  }

  const base64Data = Buffer.from(await file.arrayBuffer()).toString("base64");

  // The file only ever exists in memory for this request — it is never
  // written to disk or to Supabase Storage.
  const documentBlock =
    file.type === "application/pdf"
      ? ({
          type: "document" as const,
          source: {
            type: "base64" as const,
            media_type: "application/pdf" as const,
            data: base64Data,
          },
        } as const)
      : ({
          type: "image" as const,
          source: {
            type: "base64" as const,
            media_type: file.type as "image/png" | "image/jpeg",
            data: base64Data,
          },
        } as const);

  try {
    const response = await anthropicClient.messages.parse({
      model: "claude-opus-4-8",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: [
            documentBlock,
            {
              type: "text",
              text: "This is a bank or lender statement. Identify the financial institution that issued it and the account details. If a field can't be confidently determined, make your best judgement and lower the confidence rating accordingly.",
            },
          ],
        },
      ],
      output_config: {
        format: zodOutputFormat(StatementExtractionSchema),
      },
    });

    const extraction = response.parsed_output;

    if (!extraction) {
      return NextResponse.json(
        { error: "Couldn't read the details on that statement." },
        { status: 422 },
      );
    }

    const banks = await getBanks();
    const matchedBank = matchBank(extraction, banks);

    return NextResponse.json({ extraction, matchedBank });
  } catch (error) {
    console.error("[extract-statement] Anthropic error:", error);
    return NextResponse.json(
      { error: "Failed to process that statement." },
      { status: 500 },
    );
  }
}
