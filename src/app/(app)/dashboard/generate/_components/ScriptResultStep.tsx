"use client";

import { useEffect, useState } from "react";
import { Check, Copy, RotateCcw, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import type { Counterparty } from "@/app/actions/counterparties";
import type { SituationFormData } from "../../situation/_components/SituationWizard";
import { outcomes, situations } from "../../situation/_components/SituationWizard";

// Stands in for the real GenAI call (e.g. the Claude API) until that
// integration is wired up. Swap this out for a request to the backend.
async function requestScript(
  counterparties: Counterparty[],
  situation: SituationFormData,
): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 1600));

  const names = counterparties.map((cp) => cp.display_name).join(", ");
  const situationLabel =
    situations.find((s) => s.value === situation.situation)?.label ??
    situation.situation;
  const outcomeLabel =
    outcomes.find((o) => o.value === situation.desired_outcome)?.label ??
    situation.desired_outcome;

  return `Hi, my name is [Your Name] and I'm calling about my account with ${names}.

I'm reaching out because I've recently experienced ${situationLabel.toLowerCase()}, and it's affected my ability to keep up with payments as usual. ${situation.situation_details ? situation.situation_details + "\n\n" : ""}What I'm hoping we can work out today is ${outcomeLabel.toLowerCase()}, so I can stay current while I get back on my feet.

Could you walk me through what options are available for a situation like mine?`;
}

export default function ScriptResultStep({
  selectedCounterparties,
  situation,
  onBack,
  onStartOver,
}: {
  selectedCounterparties: Counterparty[];
  situation: SituationFormData;
  onBack: () => void;
  onStartOver: () => void;
}) {
  const [status, setStatus] = useState<"generating" | "done" | "error">(
    "generating",
  );
  const [script, setScript] = useState("");
  const [copied, setCopied] = useState(false);

  async function generate() {
    setStatus("generating");
    try {
      const result = await requestScript(selectedCounterparties, situation);
      setScript(result);
      setStatus("done");
    } catch (error) {
      console.error("[ScriptResultStep] Generation failed:", error);
      setStatus("error");
    }
  }

  useEffect(() => {
    generate();
  }, []);

  async function handleCopy() {
    await navigator.clipboard.writeText(script);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  }

  if (status === "generating") {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
          <Spinner className="h-6 w-6" />
          <p className="font-medium">Writing your script...</p>
          <p className="text-sm text-muted-foreground">
            This usually takes a few seconds.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (status === "error") {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
          <p className="font-medium">Something went wrong.</p>
          <Button className="cursor-pointer" onClick={generate}>
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-xl">Your Script</CardTitle>
          <CardDescription>
            Use this as a starting point when you call or write to{" "}
            {selectedCounterparties.map((cp) => cp.display_name).join(", ")}.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            readOnly
            value={script}
            className="min-h-70 font-mono text-sm"
          />
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={handleCopy}
            >
              {copied ? <Check /> : <Copy />}
              {copied ? "Copied" : "Copy Script"}
            </Button>
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={generate}
            >
              <Sparkles />
              Regenerate
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <Button variant="outline" className="cursor-pointer" onClick={onBack}>
          Back to Review
        </Button>
        <Button variant="ghost" className="cursor-pointer" onClick={onStartOver}>
          <RotateCcw />
          Start Over
        </Button>
      </div>
    </div>
  );
}
