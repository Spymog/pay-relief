"use client";

import { useCallRecords } from "@/context/CallRecordsProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const STATUS_VARIANT: Record<
  string,
  "default" | "secondary" | "destructive" | "outline"
> = {
  pending: "secondary",
  in_progress: "default",
  completed: "outline",
  failed: "destructive",
  cancelled: "destructive",
};

export default function CallRecordsList({
  selectedId,
  onSelect,
}: {
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
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
    <div className="grid gap-4">
      {records.map((record) => (
        <Card
          key={record.id}
          role="button"
          tabIndex={0}
          aria-pressed={record.id === selectedId}
          onClick={() => onSelect(record.id)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onSelect(record.id);
            }
          }}
          className={cn(
            "cursor-pointer transition-colors hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            record.id === selectedId && "border-primary bg-accent/50",
          )}
        >
          <CardHeader className="flex flex-row items-center justify-between gap-2">
            <CardTitle className="text-base font-medium">
              {record.bank_name ?? "Unknown bank"}
            </CardTitle>
            <Badge variant={STATUS_VARIANT[record.status] ?? "secondary"}>
              {record.status}
            </Badge>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-1">
            <p className="line-clamp-2 min-h-10">
              {record.post_call_summary ?? (
                <span className="italic">No summary yet.</span>
              )}
            </p>
            <p className="text-xs">
              Started {new Date(record.created_at).toLocaleString()}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
