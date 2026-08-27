"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import CurrentSituationCard from "../../situation/_components/CurrentSituationCard";
import SituationWizard, {
  type SituationFormData,
} from "../../situation/_components/SituationWizard";

export default function SituationStep({
  situation,
  onSave,
  onBack,
  onContinue,
}: {
  situation: SituationFormData | null;
  onSave: (data: SituationFormData) => void;
  onBack: () => void;
  onContinue: () => void;
}) {
  const [isEditing, setIsEditing] = useState(!situation);

  function handleComplete(data: SituationFormData) {
    onSave(data);
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <div className="space-y-4">
        {situation && (
          <Button
            variant="ghost"
            className="cursor-pointer"
            onClick={() => setIsEditing(false)}
          >
            <ArrowLeft />
            Back to My Situation
          </Button>
        )}
        <SituationWizard
          onComplete={handleComplete}
          initialData={situation ?? undefined}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <CurrentSituationCard situation={situation as SituationFormData} />

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={onBack}
          >
            Back
          </Button>
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => setIsEditing(true)}
          >
            Edit My Answers
          </Button>
        </div>
        <Button className="cursor-pointer" onClick={onContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
}
