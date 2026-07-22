"use client";

import { useState, useTransition } from "react";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { saveSituation } from "@/app/actions/situations";
import CurrentSituationCard from "./CurrentSituationCard";
import SituationWizard, { type SituationFormData } from "./SituationWizard";

export default function SituationSection({
  initialSituation,
}: {
  initialSituation: SituationFormData | null;
}) {
  const [savedData, setSavedData] = useState<SituationFormData | null>(
    initialSituation,
  );
  const [isEditing, setIsEditing] = useState(!initialSituation);
  const [isSaving, startSaving] = useTransition();

  const handleComplete = (data: SituationFormData) => {
    startSaving(async () => {
      const result = await saveSituation(data);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      setSavedData(data);
      setIsEditing(false);
      toast.success("Situation saved");
    });
  };

  if (isEditing) {
    return (
      <div className="space-y-4">
        {savedData && (
          <Button variant="ghost" onClick={() => setIsEditing(false)}>
            <ArrowLeft />
            Back to My Situation
          </Button>
        )}
        <SituationWizard
          onComplete={handleComplete}
          initialData={savedData ?? undefined}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <CurrentSituationCard situation={savedData as SituationFormData} />
      <Button
        variant="outline"
        onClick={() => setIsEditing(true)}
        disabled={isSaving}
      >
        Edit My Answers
      </Button>
    </div>
  );
}
