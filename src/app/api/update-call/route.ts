import { NextRequest, NextResponse } from "next/server";
import { CallWebhookPayload, CallStatus } from "@/types/nlpearl-call-webhooks";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: NextRequest) {
  try {
    const body: CallWebhookPayload = await request.json();

    console.log("body:", body);

    const { pearlId, leadId, conversationStatus, status, summary, collectedInfo } = body;

    if (!pearlId || !leadId) {
      console.error("Missing pearl id or lead id");
      return NextResponse.json(
        { error: "Missing pearl id or lead id" },
        { status: 500 },
      );
    }

    if (!status) {
      console.error("Missing call status");
      return NextResponse.json(
        { error: "Missing call status" },
        { status: 500 },
      );
    }

    if (!conversationStatus) {
      console.error("Missing conversation status");
      return NextResponse.json(
        { error: "Missing conversation status" },
        { status: 500 },
      );
    }

    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

    const updatePayload: Record<string, unknown> = {
      conversation_status: conversationStatus,
      call_status: status,
      status: status === CallStatus.InProgress ? "in_progress" : "completed",
    };

    if (status === CallStatus.Completed) {
      const infoMap = Object.fromEntries(
        collectedInfo.map((item) => [item.id, item.value]),
      );

      Object.assign(updatePayload, {
        call_outcome: infoMap["callOutcome"] ?? null,
        post_call_summary: summary,
        documents_required: Array.isArray(infoMap["documentsRequired"])
          ? infoMap["documentsRequired"][0]
          : (infoMap["documentsRequired"] ?? null),
        next_steps: infoMap["nextSteps"] ?? null,
      });
    }

    const { error } = await supabase
      .from("call_records")
      .update(updatePayload)
      .eq("pearl_id", pearlId)
      .eq("lead_id", leadId);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("update-call error:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
