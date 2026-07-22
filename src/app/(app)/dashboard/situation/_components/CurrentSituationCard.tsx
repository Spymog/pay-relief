import { CheckCircle2 } from "lucide-react";
import { format, parseISO } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  situations,
  outcomes,
  tones,
  type SituationFormData,
} from "./SituationWizard";

function formatDate(value: string): string | null {
  if (!value) return null;
  try {
    // parseISO (not `new Date`) so a date-only string like "2026-06-01"
    // is read as that local calendar day, not shifted by UTC parsing.
    return format(parseISO(value), "PPP");
  } catch {
    return null;
  }
}

function formatIncome(value: string): string | null {
  if (!value) return null;
  const amount = Number(value);
  if (Number.isNaN(amount)) return null;
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export default function CurrentSituationCard({
  situation,
}: {
  situation: SituationFormData;
}) {
  const situationOption = situations.find(
    (s) => s.value === situation.situation,
  );
  const outcomeOption = outcomes.find(
    (o) => o.value === situation.desired_outcome,
  );
  const toneOption = tones.find(
    (t) => t.value === situation.preferred_communication_tone,
  );

  const startDate = formatDate(situation.situation_start_date);
  const resolutionDate = formatDate(situation.expected_resolution_date);
  const incomeBefore = formatIncome(situation.monthly_income_before);
  const incomeCurrent = formatIncome(situation.monthly_income_current);
  const SituationIcon = situationOption?.icon;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2.5">
          <CheckCircle2 className="h-6 w-6 text-accent" />
          <CardTitle className="font-serif text-xl">Your Situation</CardTitle>
        </div>
        <CardDescription>
          This is what we&apos;ll use to craft your negotiation messages.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm text-muted-foreground">Situation</p>
            <p className="flex items-center gap-1.5 font-medium">
              {SituationIcon && (
                <SituationIcon className="h-4 w-4 text-accent" />
              )}
              {situationOption?.label ?? situation.situation}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Goal</p>
            <p className="font-medium">
              {outcomeOption?.label ?? situation.desired_outcome}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              Communication Tone
            </p>
            <p className="font-medium">
              {toneOption?.label ?? situation.preferred_communication_tone}
            </p>
          </div>
          {(incomeBefore || incomeCurrent) && (
            <div>
              <p className="text-sm text-muted-foreground">Income Change</p>
              <p className="font-medium">
                {incomeBefore ?? "—"} → {incomeCurrent ?? "—"}
              </p>
            </div>
          )}
          {startDate && (
            <div>
              <p className="text-sm text-muted-foreground">Started</p>
              <p className="font-medium">{startDate}</p>
            </div>
          )}
          {resolutionDate && (
            <div>
              <p className="text-sm text-muted-foreground">
                Expected to Improve By
              </p>
              <p className="font-medium">{resolutionDate}</p>
            </div>
          )}
        </div>

        {situation.situation_details && (
          <div>
            <p className="mb-1 text-sm text-muted-foreground">Details</p>
            <p className="whitespace-pre-wrap text-sm">
              {situation.situation_details}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
