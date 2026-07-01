import React from "react";
import { useCallRecord } from "@/hooks/use-call-record";

type Props = {
  callId: string;
};

export default function CallStatus({ callId }: Props) {
  const record = useCallRecord(callId);
  if (!record) return null;

  return (
    <div className="mt-6 text-sm text-muted-foreground border m-auto flex flex-col p-3 w-fit rounded-2xl">
      <p>Call Status: {record.status}</p>
      <p>Result: </p>
      <p>
        Summary:{" "}
        {record.post_call_summary && (
          <p className="mt-2">{record.post_call_summary}</p>
        )}
      </p>
    </div>
  );
}
