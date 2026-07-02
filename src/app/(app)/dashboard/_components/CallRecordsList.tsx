"use client";

import { useCallRecords } from "@/context/CallRecordsProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const STATUS_VARIANT: Record<
  string,
  "default" | "secondary" | "destructive" | "outline"
> = {
  pending: "secondary",
  in_progress: "default",
  completed: "outline",
  failed: "destructive",
  cancelled: "destructive",
};

export default function CallRecordsList() {
  const { records, loading } = useCallRecords();

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading tasks...</p>;
  }

  if (records.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No calls started yet. Start one above to track it here.
      </p>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {records.map((record) => (
        <Card key={record.id}>
          <CardHeader className="flex flex-row items-center justify-between gap-2">
            <CardTitle className="text-base font-medium">
              {record.bank_name ?? "Unknown bank"}
            </CardTitle>
            <Badge variant={STATUS_VARIANT[record.status] ?? "secondary"}>
              {record.status}
            </Badge>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-1">
            {record.post_call_summary && <p>{record.post_call_summary}</p>}
            <p className="text-xs">
              Started {new Date(record.created_at).toLocaleString()}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
