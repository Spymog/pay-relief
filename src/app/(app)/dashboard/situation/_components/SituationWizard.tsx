"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  CalendarIcon,
  Briefcase,
  Clock,
  Heart,
  Users,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  Check,
  type LucideIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const SITUATION_DETAILS_MAX_LENGTH = 1000;

export type SituationFormData = {
  situation: string;
  situation_details: string;
  situation_start_date: string;
  expected_resolution_date: string;
  monthly_income_before: string;
  monthly_income_current: string;
  desired_outcome: string;
  preferred_communication_tone: string;
};

type Situation = {
  value: string;
  label: string;
  icon: LucideIcon;
  description: string;
};

type Option = {
  value: string;
  label: string;
  description: string;
};

const situations: Situation[] = [
  {
    value: "job_loss",
    label: "Job Loss",
    icon: Briefcase,
    description: "Recently lost employment",
  },
  {
    value: "reduced_hours",
    label: "Reduced Hours",
    icon: Clock,
    description: "Working fewer hours or pay cut",
  },
  {
    value: "medical_leave",
    label: "Medical Leave",
    icon: Heart,
    description: "On medical or disability leave",
  },
  {
    value: "caring_for_family",
    label: "Family Care",
    icon: Users,
    description: "Caring for ill family member",
  },
  {
    value: "temporary_hardship",
    label: "Temporary Hardship",
    icon: HelpCircle,
    description: "Other temporary financial difficulty",
  },
];

const outcomes: Option[] = [
  {
    value: "lower_payments",
    label: "Lower My Payments",
    description: "Reduce monthly payment amounts",
  },
  {
    value: "skip_payments",
    label: "Skip Payments",
    description: "Pause payments temporarily",
  },
  {
    value: "payment_deferral",
    label: "Defer Payments",
    description: "Move payments to end of term",
  },
  {
    value: "interest_reduction",
    label: "Reduce Interest",
    description: "Lower interest rates",
  },
];

const tones: Option[] = [
  {
    value: "formal",
    label: "Formal",
    description: "Professional and business-like",
  },
  {
    value: "friendly",
    label: "Friendly",
    description: "Warm but professional",
  },
  {
    value: "direct",
    label: "Direct",
    description: "Straightforward and concise",
  },
  {
    value: "empathetic",
    label: "Empathetic",
    description: "Understanding and relatable",
  },
];

type SituationWizardProps = {
  onComplete: (data: SituationFormData) => void;
  initialData?: Partial<SituationFormData>;
};

export default function SituationWizard({
  onComplete,
  initialData = {},
}: SituationWizardProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<SituationFormData>({
    situation: initialData.situation || "",
    situation_details: initialData.situation_details || "",
    situation_start_date: initialData.situation_start_date || "",
    expected_resolution_date: initialData.expected_resolution_date || "",
    monthly_income_before: initialData.monthly_income_before || "",
    monthly_income_current: initialData.monthly_income_current || "",
    desired_outcome: initialData.desired_outcome || "lower_payments",
    preferred_communication_tone:
      initialData.preferred_communication_tone || "empathetic",
  });

  const totalSteps = 3;

  const updateField = (field: keyof SituationFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete(formData);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return Boolean(formData.situation);
      case 2:
        return Boolean(formData.desired_outcome);
      case 3:
        return true;
      default:
        return false;
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-muted/50 border-b border-border">
        <CardTitle className="font-serif text-xl">
          Tell Us About Your Situation
        </CardTitle>
        <CardDescription>
          This helps us craft the perfect message for your creditors
        </CardDescription>
        <div className="flex gap-2 mt-4">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-all duration-300",
                s <= step ? "bg-accent" : "bg-muted",
              )}
            />
          ))}
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <Label className="text-base font-medium mb-3 block">
                  What&apos;s happening in your life right now?
                </Label>
                <div className="grid gap-3">
                  {situations.map((situation) => {
                    const Icon = situation.icon;
                    const isSelected = formData.situation === situation.value;
                    return (
                      <div
                        key={situation.value}
                        className={cn(
                          "flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all",
                          isSelected
                            ? "border-accent bg-accent/10"
                            : "border-border hover:border-muted-foreground/40",
                        )}
                        onClick={() =>
                          updateField("situation", situation.value)
                        }
                      >
                        <div
                          className={cn(
                            "p-2 rounded-lg",
                            isSelected
                              ? "bg-accent/20 text-accent"
                              : "bg-muted text-muted-foreground",
                          )}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            {situation.label}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {situation.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Any additional details? (optional)
                </Label>
                <Textarea
                  placeholder="e.g., I was laid off on March 1st and am actively seeking new employment..."
                  value={formData.situation_details}
                  onChange={(e) =>
                    updateField("situation_details", e.target.value)
                  }
                  className="min-h-[100px]"
                  maxLength={SITUATION_DETAILS_MAX_LENGTH}
                />
                <p
                  className={cn(
                    "mt-1.5 text-right text-xs",
                    formData.situation_details.length >=
                      SITUATION_DETAILS_MAX_LENGTH
                      ? "text-destructive"
                      : "text-muted-foreground",
                  )}
                >
                  {formData.situation_details.length} /{" "}
                  {SITUATION_DETAILS_MAX_LENGTH}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    When did this start?
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.situation_start_date
                          ? format(
                              new Date(formData.situation_start_date),
                              "PPP",
                            )
                          : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        startMonth={new Date(1900, 0)}
                        endMonth={new Date()}
                        disabled={{ after: new Date() }}
                        selected={
                          formData.situation_start_date
                            ? new Date(formData.situation_start_date)
                            : undefined
                        }
                        onSelect={(date) =>
                          updateField(
                            "situation_start_date",
                            date ? date.toISOString() : "",
                          )
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Expected to improve by?
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.expected_resolution_date
                          ? format(
                              new Date(formData.expected_resolution_date),
                              "PPP",
                            )
                          : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        startMonth={new Date()}
                        endMonth={new Date(2099, 11)}
                        disabled={{ before: new Date() }}
                        selected={
                          formData.expected_resolution_date
                            ? new Date(formData.expected_resolution_date)
                            : undefined
                        }
                        onSelect={(date) =>
                          updateField(
                            "expected_resolution_date",
                            date ? date.toISOString() : "",
                          )
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <Label className="text-base font-medium mb-3 block">
                  What outcome are you hoping for?
                </Label>
                <div className="grid sm:grid-cols-2 gap-3">
                  {outcomes.map((outcome) => (
                    <div
                      key={outcome.value}
                      className={cn(
                        "p-4 rounded-xl border-2 cursor-pointer transition-all",
                        formData.desired_outcome === outcome.value
                          ? "border-accent bg-accent/10"
                          : "border-border hover:border-muted-foreground/40",
                      )}
                      onClick={() =>
                        updateField("desired_outcome", outcome.value)
                      }
                    >
                      <p className="font-medium text-foreground">
                        {outcome.label}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {outcome.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Previous Monthly Income
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      $
                    </span>
                    <Input
                      type="number"
                      placeholder="5,000"
                      className="pl-7"
                      value={formData.monthly_income_before}
                      onChange={(e) =>
                        updateField("monthly_income_before", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Current Monthly Income
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      $
                    </span>
                    <Input
                      type="number"
                      placeholder="2,000"
                      className="pl-7"
                      value={formData.monthly_income_current}
                      onChange={(e) =>
                        updateField("monthly_income_current", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <Label className="text-base font-medium mb-3 block">
                  How should we communicate on your behalf?
                </Label>
                <div className="grid sm:grid-cols-2 gap-3">
                  {tones.map((tone) => (
                    <div
                      key={tone.value}
                      className={cn(
                        "p-4 rounded-xl border-2 cursor-pointer transition-all",
                        formData.preferred_communication_tone === tone.value
                          ? "border-accent bg-accent/10"
                          : "border-border hover:border-muted-foreground/40",
                      )}
                      onClick={() =>
                        updateField("preferred_communication_tone", tone.value)
                      }
                    >
                      <p className="font-medium text-foreground">
                        {tone.label}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {tone.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-muted/50 rounded-xl p-4 border border-border">
                <h4 className="font-medium text-foreground mb-2">Summary</h4>
                <div className="space-y-1 text-sm text-foreground/80">
                  <p>
                    <span className="text-muted-foreground">Situation:</span>{" "}
                    {
                      situations.find((s) => s.value === formData.situation)
                        ?.label
                    }
                  </p>
                  <p>
                    <span className="text-muted-foreground">Goal:</span>{" "}
                    {
                      outcomes.find((o) => o.value === formData.desired_outcome)
                        ?.label
                    }
                  </p>
                  {formData.monthly_income_before &&
                    formData.monthly_income_current && (
                      <p>
                        <span className="text-muted-foreground">
                          Income Change:
                        </span>{" "}
                        ${formData.monthly_income_before} → $
                        {formData.monthly_income_current}
                      </p>
                    )}
                  <p>
                    <span className="text-muted-foreground">Tone:</span>{" "}
                    {
                      tones.find(
                        (t) =>
                          t.value === formData.preferred_communication_tone,
                      )?.label
                    }
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-between mt-8 pt-6 border-t border-border">
          <Button
            variant="outline"
            onClick={() => setStep(step - 1)}
            disabled={step === 1}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            {step === totalSteps ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Save & Continue
              </>
            ) : (
              <>
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
