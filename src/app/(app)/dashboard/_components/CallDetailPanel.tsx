"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCallRecord } from "@/context/CallRecordsProvider";
import {
  CallStatusByCode,
  ConversationStatusByCode,
  type CallStatusCode,
  type ConversationStatusCode,
} from "@/types/nlpearl-call-webhooks";
import { STATUS_VARIANT } from "./CallRecordsList";

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="text-sm font-medium text-right">{value ?? "—"}</dd>
    </div>
  );
}

export default function CallDetailPanel({
  recordId,
}: {
  recordId: string | null;
}) {
  const record = useCallRecord(recordId ?? "");

  if (!record) {
    return (
      <Card className="hidden md:flex min-h-48 items-center justify-center border-dashed">
        <p className="text-sm text-muted-foreground">
          Select a call to see its details.
        </p>
      </Card>
    );
  }

  return (
    <Card className="md:sticky md:top-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2 text-lg">
          {record.bank_name ?? "Unknown bank"}
          <Badge variant={STATUS_VARIANT[record.status] ?? "secondary"}>
            {record.status}
          </Badge>
        </CardTitle>
        <CardDescription>
          Call started {new Date(record.created_at).toLocaleString()}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <dl className="space-y-2">
          <DetailRow label="Bank phone" value={record.bank_phone} />
          <DetailRow label="Account type" value={record.acct_type} />
          <DetailRow
            label="Account number"
            value={
              record.acct_num_last_4 ? `•••• ${record.acct_num_last_4}` : null
            }
          />
          <DetailRow
            label="Call status"
            value={
              record.call_status != null
                ? (CallStatusByCode[record.call_status as CallStatusCode] ??
                  record.call_status)
                : null
            }
          />
          <DetailRow
            label="Conversation status"
            value={
              record.conversation_status != null
                ? (ConversationStatusByCode[
                    record.conversation_status as ConversationStatusCode
                  ] ?? record.conversation_status)
                : null
            }
          />
          <DetailRow label="Outcome" value={record.call_outcome} />
        </dl>

        {(record.post_call_summary ||
          record.documents_required ||
          record.next_steps) && <Separator />}

        {record.post_call_summary && (
          <div className="space-y-1">
            <h3 className="text-sm font-medium">Summary</h3>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {record.post_call_summary}
            </p>
          </div>
        )}

        {record.documents_required && (
          <div className="space-y-1">
            <h3 className="text-sm font-medium">Documents required</h3>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {record.documents_required}
            </p>
          </div>
        )}

        {record.next_steps && (
          <div className="space-y-1">
            <h3 className="text-sm font-medium">Next steps</h3>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {record.next_steps}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
