"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SituationWizard, { type SituationFormData } from "./SituationWizard";

export default function SituationSection() {
  const [savedData, setSavedData] = useState<SituationFormData | null>(null);
  const [isEditing, setIsEditing] = useState(true);

  const handleComplete = (data: SituationFormData) => {
    // TODO: persist to the backend once the situations table/API exists
    setSavedData(data);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <SituationWizard
        onComplete={handleComplete}
        initialData={savedData ?? undefined}
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2.5">
          <CheckCircle2 className="h-6 w-6 text-accent" />
          <CardTitle className="font-serif text-xl">Situation Saved</CardTitle>
        </div>
        <CardDescription>
          Your answers are stored for this session. They aren&apos;t sent
          anywhere yet.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="outline" onClick={() => setIsEditing(true)}>
          Edit My Answers
        </Button>
      </CardContent>
    </Card>
  );
}
