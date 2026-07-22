"use client";

import { useRef, useState, useTransition, type ChangeEvent } from "react";
import { Landmark, Loader2, Trash2, UploadCloud } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Bank } from "@/lib/banks";
import {
  ACCOUNT_TYPES,
  ACCOUNT_TYPE_LABELS,
  type AccountType,
  type StatementExtraction,
} from "@/lib/statement-extraction";
import {
  createCounterparty,
  deleteCounterparty,
  type Counterparty,
} from "@/app/actions/counterparties";

interface ExtractStatementResponse {
  extraction: StatementExtraction;
  matchedBank: Bank | null;
  error?: string;
}

export default function CounterpartiesSection({
  initialCounterparties,
  banks,
}: {
  initialCounterparties: Counterparty[];
  banks: Bank[];
}) {
  const [counterparties, setCounterparties] = useState(initialCounterparties);
  const [isUploading, setIsUploading] = useState(false);
  const [review, setReview] = useState<{
    extraction: StatementExtraction;
    matchedBank: Bank | null;
  } | null>(null);
  const [isSaving, startSaving] = useTransition();
  const [isDeleting, startDeleting] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedBankId, setSelectedBankId] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [accountType, setAccountType] = useState<AccountType>("other");
  const [last4, setLast4] = useState("");

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setIsUploading(true);
    setReview(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/counterparties/extract-statement", {
        method: "POST",
        body: formData,
      });

      const body: ExtractStatementResponse = await response.json();

      if (!response.ok) {
        toast.error(body.error ?? "Failed to read that statement.");
        return;
      }

      const { extraction, matchedBank } = body;
      setReview({ extraction, matchedBank });
      setSelectedBankId(matchedBank?.id ?? null);
      setDisplayName(matchedBank?.name ?? extraction.institution_name);
      setAccountType(extraction.account_type);
      setLast4(extraction.last4 ?? "");
    } catch (error) {
      console.error("[CounterpartiesSection] Upload failed:", error);
      toast.error("Something went wrong reading that statement.");
    } finally {
      setIsUploading(false);
    }
  }

  function handleBankSelect(value: string) {
    const bankId = value === "none" ? null : value;
    setSelectedBankId(bankId);

    const bank = banks.find((b) => b.id === bankId);
    if (bank) setDisplayName(bank.name);
  }

  function handleSave() {
    startSaving(async () => {
      const result = await createCounterparty({
        bank_id: selectedBankId,
        display_name: displayName.trim(),
        account_type: accountType,
        last4: last4.trim() || null,
        source: "statement_upload",
      });

      if (result.error || !result.data) {
        toast.error(result.error ?? "Failed to save that counterparty.");
        return;
      }

      setCounterparties((prev) => [result.data as Counterparty, ...prev]);
      setReview(null);
      toast.success(`Added ${result.data.display_name}`);
    });
  }

  function handleDelete(counterparty: Counterparty) {
    setDeletingId(counterparty.id);
    startDeleting(async () => {
      const result = await deleteCounterparty(counterparty.id);

      if (result.error) {
        toast.error(result.error);
        setDeletingId(null);
        return;
      }

      setCounterparties((prev) =>
        prev.filter((cp) => cp.id !== counterparty.id),
      );
      setDeletingId(null);
      toast.success(`Removed ${counterparty.display_name}`);
    });
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-xl">
            Add a Lender from a Statement
          </CardTitle>
          <CardDescription>
            Upload a PDF or photo of a bank/lender statement and we&apos;ll
            identify who it&apos;s from. The file itself is never stored —
            only the details you confirm below.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!review && (
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf,image/png,image/jpeg"
                className="hidden"
                onChange={handleFileChange}
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
              >
                {isUploading ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Reading statement...
                  </>
                ) : (
                  <>
                    <UploadCloud />
                    Upload Statement
                  </>
                )}
              </Button>
            </div>
          )}

          {review && (
            <div className="space-y-4 rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">We detected:</p>
                <Badge
                  variant={
                    review.extraction.confidence === "high"
                      ? "default"
                      : "secondary"
                  }
                >
                  {review.extraction.confidence} confidence
                </Badge>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Matched Lender</Label>
                  <Select
                    value={selectedBankId ?? "none"}
                    onValueChange={handleBankSelect}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Not on our list" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">
                        Not on our list ({review.extraction.institution_name})
                      </SelectItem>
                      {banks.map((bank) => (
                        <SelectItem key={bank.id} value={bank.id}>
                          {bank.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="display-name">Display Name</Label>
                  <Input
                    id="display-name"
                    value={displayName}
                    onChange={(event) => setDisplayName(event.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Account Type</Label>
                  <Select
                    value={accountType}
                    onValueChange={(value) =>
                      setAccountType(value as AccountType)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ACCOUNT_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {ACCOUNT_TYPE_LABELS[type]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="last4">Last 4 of Account #</Label>
                  <Input
                    id="last4"
                    maxLength={4}
                    value={last4}
                    onChange={(event) =>
                      setLast4(event.target.value.replace(/\D/g, ""))
                    }
                    placeholder="Optional"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleSave}
                  disabled={isSaving || !displayName.trim()}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Confirm & Save"
                  )}
                </Button>
                <Button variant="outline" onClick={() => setReview(null)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-xl">Your Lenders</CardTitle>
          <CardDescription>
            {counterparties.length === 0
              ? "You haven't added any lenders yet."
              : `${counterparties.length} lender${counterparties.length === 1 ? "" : "s"} on file.`}
          </CardDescription>
        </CardHeader>
        {counterparties.length > 0 && (
          <CardContent className="space-y-2">
            {counterparties.map((cp) => (
              <div
                key={cp.id}
                className="flex items-center justify-between gap-3 rounded-md border p-3"
              >
                <div className="flex items-center gap-3">
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

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      disabled={isDeleting && deletingId === cp.id}
                      aria-label={`Remove ${cp.display_name}`}
                    >
                      {isDeleting && deletingId === cp.id ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        <Trash2 />
                      )}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Remove {cp.display_name}?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This only removes it from your saved list — it
                        won&apos;t affect anything you&apos;ve already sent or
                        called about.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(cp)}>
                        Remove
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ))}
          </CardContent>
        )}
      </Card>
    </div>
  );
}
