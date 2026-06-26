import { NextRequest, NextResponse } from "next/server";
import { toE164US } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";

interface MakeCallRequestBody {
  bankId: string;
  bankAccountNumber: string;
  phoneNumber: string;
  address: string;
  bankContactNumber: string;
  email: string;
  ssnLast4: string;
}

interface NLPearlLeadPayload {
  phoneNumber: string;
  callData: Record<string, string>;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: MakeCallRequestBody = await request.json();

    const {
      bankAccountNumber,
      bankContactNumber,
      phoneNumber,
      address,
      email,
      ssnLast4,
    } = body;

    // Validate required fields
    if (!bankContactNumber) {
      return NextResponse.json(
        { error: "bankContactNumber is required" },
        { status: 400 },
      );
    }

    const bankNumberE164 = toE164US(bankContactNumber);
    if (!bankNumberE164) {
      return NextResponse.json(
        { error: "bankContactNumber must be a valid US phone number" },
        { status: 400 },
      );
    }

    // .env variables
    const accountId = process.env.NLPEARL_ACCOUNT_ID;
    const secretKey = process.env.NLPEARL_SECRET_KEY;
    const pearlId = process.env.NLPEARL_PEARL_ID;

    if (!secretKey || !pearlId) {
      console.error(
        "Missing required environment variables: NLPEARL_ACCOUNT_ID, NLPEARL_SECRET_KEY, or NLPEARL_PEARL_ID",
      );
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 },
      );
    }

    // Form the request body
    const payload: NLPearlLeadPayload = {
      phoneNumber: bankNumberE164,
      callData: {
        firstName: "John",
        lastName: "Doe",
        accountType: "Credit Card",
        emailAddress: email,
        accountNumber: bankAccountNumber,
        address: address,
        last4SSN: ssnLast4,
      },
    };

    // Send request to NLPearl
    const nlPearlResponse = await fetch(
      `https://api.nlpearl.ai/v2/Outbound/${pearlId}/Lead`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accountId}:${secretKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      },
    );

    // Check response status
    if (!nlPearlResponse.ok) {
      const errorText = JSON.parse(await nlPearlResponse.text());
      console.error("NLPearl API error:", nlPearlResponse.status, errorText);
      return NextResponse.json(
        { error: "Failed to create lead", errorDetails: errorText },
        { status: nlPearlResponse.status },
      );
    }

    // Insert row into call_records table
    const supabase = await createClient();

    const initialRecord = {};

    const { data: rowData, error: insertError } = await supabase
      .from("call_records")
      .insert({ id: 1, name: "Mordor" })
      .select()
      .single();

    const data = await nlPearlResponse.json();

    return NextResponse.json(
      { success: true, leadId: data.leadId },
      { status: 200 },
    );
  } catch (error) {
    console.error("Unexpected error in /api/make-call:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
