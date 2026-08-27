"use client";

import { Landmark, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ACCOUNT_TYPE_LABELS,
  type AccountType,
} from "@/lib/statement-extraction";
import type { Counterparty } from "@/app/actions/counterparties";
import CurrentSituationCard from "../../situation/_components/CurrentSituationCard";
import type { SituationFormData } from "../../situation/_components/SituationWizard";

export default function ReviewStep({
  selectedCounterparties,
  situation,
  onBack,
  onGenerate,
}: {
  selectedCounterparties: Counterparty[];
  situation: SituationFormData;
  onBack: () => void;
  onGenerate: () => void;
}) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-xl">
            Addressed To
          </CardTitle>
          <CardDescription>
            {selectedCounterparties.length} counterpart
            {selectedCounterparties.length === 1 ? "y" : "ies"} selected.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {selectedCounterparties.map((cp) => (
            <div
              key={cp.id}
              className="flex items-center gap-3 rounded-md border p-3"
            >
              <Landmark className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">{cp.display_name}</p>
                <p className="text-sm text-muted-foreground">
                  {ACCOUNT_TYPE_LABELS[cp.account_type as AccountType] ??
                    cp.account_type}
                  {cp.last4 ? ` •••• ${cp.last4}` : ""}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <CurrentSituationCard situation={situation} />

      <div className="flex items-center justify-between">
        <Button variant="outline" className="cursor-pointer" onClick={onBack}>
          Back
        </Button>
        <Button className="cursor-pointer" onClick={onGenerate}>
          <Sparkles />
          Generate Script
        </Button>
      </div>
    </div>
  );
}
