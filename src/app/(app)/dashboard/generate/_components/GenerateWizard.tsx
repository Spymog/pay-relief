"use client";

import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Bank } from "@/lib/banks";
import type { Counterparty } from "@/app/actions/counterparties";
import type { SituationFormData } from "../../situation/_components/SituationWizard";
import CounterpartyStep from "./CounterpartyStep";
import SituationStep from "./SituationStep";
import ReviewStep from "./ReviewStep";
import ScriptResultStep from "./ScriptResultStep";

const STEPS = [
  { number: 1, label: "Counterparties" },
  { number: 2, label: "Situation" },
  { number: 3, label: "Review" },
  { number: 4, label: "Script" },
] as const;

function StepIndicator({ step }: { step: number }) {
  return (
    <ol className="flex items-center gap-2 sm:gap-4">
      {STEPS.map(({ number, label }, index) => (
        <li key={number} className="flex flex-1 items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-xs font-medium transition-colors",
                number < step
                  ? "border-accent bg-accent text-accent-foreground"
                  : number === step
                    ? "border-accent text-accent"
                    : "border-border text-muted-foreground",
              )}
            >
              {number < step ? <Check className="h-3.5 w-3.5" /> : number}
            </div>
            <span
              className={cn(
                "hidden text-sm font-medium sm:inline",
                number <= step ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {label}
            </span>
          </div>
          {index < STEPS.length - 1 && (
            <div
              className={cn(
                "h-0.5 flex-1 rounded-full transition-colors",
                number < step ? "bg-accent" : "bg-border",
              )}
            />
          )}
        </li>
      ))}
    </ol>
  );
}

export default function GenerateWizard({
  initialCounterparties,
  initialSituation,
  banks,
}: {
  initialCounterparties: Counterparty[];
  initialSituation: SituationFormData | null;
  banks: Bank[];
}) {
  const [step, setStep] = useState(1);
  const [counterparties, setCounterparties] = useState(initialCounterparties);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [situation, setSituation] = useState(initialSituation);

  const selectedCounterparties = useMemo(
    () => counterparties.filter((cp) => selectedIds.has(cp.id)),
    [counterparties, selectedIds],
  );

  function toggleCounterparty(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function handleCounterpartyAdded(counterparty: Counterparty) {
    setCounterparties((prev) => [counterparty, ...prev]);
    setSelectedIds((prev) => new Set(prev).add(counterparty.id));
  }

  function handleStartOver() {
    setStep(1);
    setSelectedIds(new Set());
  }

  return (
    <div className="space-y-6">
      <StepIndicator step={step} />

      {step === 1 && (
        <CounterpartyStep
          counterparties={counterparties}
          banks={banks}
          selectedIds={selectedIds}
          onToggle={toggleCounterparty}
          onAdded={handleCounterpartyAdded}
          onContinue={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <SituationStep
          situation={situation}
          onSave={setSituation}
          onBack={() => setStep(1)}
          onContinue={() => setStep(3)}
        />
      )}

      {step === 3 && situation && (
        <ReviewStep
          selectedCounterparties={selectedCounterparties}
          situation={situation}
          onBack={() => setStep(2)}
          onGenerate={() => setStep(4)}
        />
      )}

      {step === 4 && situation && (
        <ScriptResultStep
          selectedCounterparties={selectedCounterparties}
          situation={situation}
          onBack={() => setStep(3)}
          onStartOver={handleStartOver}
        />
      )}
    </div>
  );
}
