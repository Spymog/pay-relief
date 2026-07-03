"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { sbBrowserClient } from "@/lib/supabase/client";
import { useUser } from "@/context/UserProvider";

export type CallRecord = {
  id: string;
  status: "pending" | "in_progress" | "completed" | "failed" | "cancelled";
  call_status: number | null;
  conversation_status: number | null;
  call_outcome: string | null;
  post_call_summary: string | null;
  documents_required: string | null;
  next_steps: string | null;
  bank_name: string | null;
  bank_phone: string | null;
  acct_type: string | null;
  acct_num_last_4: string | null;
  created_at: string;
};

type CallRecordsContextValue = {
  records: Map<string, CallRecord>;
  loading: boolean;
};

const CallRecordsContext = createContext<CallRecordsContextValue>({
  records: new Map(),
  loading: true,
});

export function CallRecordsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useUser();
  const [records, setRecords] = useState<Map<string, CallRecord>>(new Map());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setRecords(new Map());
      setLoading(false);
      return;
    }

    const supabase = sbBrowserClient();
    let cancelled = false;

    setLoading(true);
    supabase
      .from("call_records")
      .select("*")
      .eq("user_id", user.id)
      .then(({ data }) => {
        if (cancelled) return;
        setRecords(
          new Map((data ?? []).map((row) => [row.id, row as CallRecord])),
        );
        setLoading(false);
      });

    const channel = supabase
      .channel(`call_records:user:${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "call_records",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          setRecords((prev) => {
            const next = new Map(prev);
            if (payload.eventType === "DELETE") {
              next.delete((payload.old as CallRecord).id);
            } else {
              const row = payload.new as CallRecord;
              next.set(row.id, row);
            }
            return next;
          });
        },
      )
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, [user?.id]);

  return (
    <CallRecordsContext.Provider value={{ records, loading }}>
      {children}
    </CallRecordsContext.Provider>
  );
}

export function useCallRecords() {
  const { records, loading } = useContext(CallRecordsContext);
  const list = Array.from(records.values()).sort((a, b) =>
    b.created_at.localeCompare(a.created_at),
  );
  return { records: list, loading };
}

export function useCallRecord(id: string) {
  const { records } = useContext(CallRecordsContext);
  return records.get(id) ?? null;
}
