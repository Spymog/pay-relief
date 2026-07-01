"use client";

import { useEffect, useState } from "react";
import { sbBrowserClient } from "@/lib/supabase/client";

type CallRecord = {
  id: string;
  status: "pending" | "in_progress" | "completed" | "failed" | "cancelled";
  call_outcome: string | null;
  post_call_summary: string | null;
  // ...other fields you care about
};

export function useCallRecord(recordId: string) {
  const [record, setRecord] = useState<CallRecord | null>(null);

  useEffect(() => {
    const supabase = sbBrowserClient();

    // 1. Fetch the current state once up front, so you're not waiting
    //    for the first change event to show anything.
    supabase
      .from("call_records")
      .select("*")
      .eq("id", recordId)
      .single()
      .then(({ data }) => setRecord(data));

    // 2. Subscribe to changes on just this row.
    const channel = supabase
      .channel(`call_record:${recordId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE", // you only care about updates after creation
          schema: "public",
          table: "call_records",
          filter: `id=eq.${recordId}`, // narrow to this specific row
        },
        (payload) => {
          setRecord(payload.new as CallRecord);
        },
      )
      .subscribe();

    // 3. Clean up on unmount.
    return () => {
      supabase.removeChannel(channel);
    };
  }, [recordId]);

  return record;
}
