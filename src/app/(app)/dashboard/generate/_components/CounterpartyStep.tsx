"use client";

import { useState } from "react";
import { Landmark, Loader2, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
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
} from "@/lib/statement-extraction";
import {
  createCounterparty,
  type Counterparty,
} from "@/app/actions/counterparties";
import WizardFooter from "./WizardFooter";

export default function CounterpartyStep({
  counterparties,
  banks,
  selectedIds,
  onToggle,
  onAdded,
  onContinue,
}: {
  counterparties: Counterparty[];
  banks: Bank[];
  selectedIds: Set<string>;
  onToggle: (id: string) => void;
  onAdded: (counterparty: Counterparty) => void;
  onContinue: () => void;
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedBankId, setSelectedBankId] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [accountType, setAccountType] = useState<AccountType>("other");
  const [last4, setLast4] = useState("");

  function resetForm() {
    setSelectedBankId(null);
    setDisplayName("");
    setAccountType("other");
    setLast4("");
    setIsAdding(false);
  }

  function handleBankSelect(value: string) {
    const bankId = value === "none" ? null : value;
    setSelectedBankId(bankId);
    const bank = banks.find((b) => b.id === bankId);
    if (bank) setDisplayName(bank.name);
  }

  async function handleAdd() {
    setIsSaving(true);
    const result = await createCounterparty({
      bank_id: selectedBankId,
      display_name: displayName.trim(),
      account_type: accountType,
      last4: last4.trim() || null,
      source: "manual",
    });
    setIsSaving(false);

    if (result.error || !result.data) {
      toast.error(result.error ?? "Failed to save that counterparty.");
      return;
    }

    onAdded(result.data);
    toast.success(`Added ${result.data.display_name}`);
    resetForm();
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-xl">
            Who are you communicating with?
          </CardTitle>
          <CardDescription>
            Select every lender or agency you&apos;d like this script to
            address.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {counterparties.length === 0 && !isAdding && (
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Landmark />
                </EmptyMedia>
                <EmptyTitle>No counterparties yet</EmptyTitle>
                <EmptyDescription>
                  Add the lender or agency you need to reach out to.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button
                  className="cursor-pointer"
                  onClick={() => setIsAdding(true)}
                >
                  <Plus />
                  Add a Counterparty
                </Button>
              </EmptyContent>
            </Empty>
          )}

          {counterparties.length > 0 && (
            <div className="space-y-2">
              {counterparties.map((cp) => (
                <Label
                  key={cp.id}
                  htmlFor={`cp-${cp.id}`}
                  className="flex cursor-pointer items-center gap-3 rounded-md border p-3 hover:bg-muted/50"
                >
                  <Checkbox
                    id={`cp-${cp.id}`}
                    checked={selectedIds.has(cp.id)}
                    onCheckedChange={() => onToggle(cp.id)}
                  />
                  <Landmark className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{cp.display_name}</p>
                    <p className="text-sm text-muted-foreground">
                      {ACCOUNT_TYPE_LABELS[cp.account_type as AccountType] ??
                        cp.account_type}
                      {cp.last4 ? ` •••• ${cp.last4}` : ""}
                    </p>
                  </div>
                </Label>
              ))}
            </div>
          )}

          {counterparties.length > 0 && !isAdding && (
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={() => setIsAdding(true)}
            >
              <Plus />
              Add Another Counterparty
            </Button>
          )}

          {isAdding && (
            <div className="space-y-4 rounded-lg border p-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Lender</Label>
                  <Select
                    value={selectedBankId ?? "none"}
                    onValueChange={handleBankSelect}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Not on our list" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Not on our list</SelectItem>
                      {banks.map((bank) => (
                        <SelectItem key={bank.id} value={bank.id}>
                          {bank.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-display-name">Display Name</Label>
                  <Input
                    id="new-display-name"
                    value={displayName}
                    onChange={(event) => setDisplayName(event.target.value)}
                    placeholder="e.g. Chase Credit Card"
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
                  <Label htmlFor="new-last4">Last 4 of Account #</Label>
                  <Input
                    id="new-last4"
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
                  className="cursor-pointer"
                  onClick={handleAdd}
                  disabled={isSaving || !displayName.trim()}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Counterparty"
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="cursor-pointer"
                  onClick={resetForm}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <WizardFooter>
        <p className="text-sm text-muted-foreground">
          {selectedIds.size === 0
            ? "Select at least one counterparty to continue."
            : `${selectedIds.size} selected`}
        </p>
        <Button
          className="cursor-pointer"
          onClick={onContinue}
          disabled={selectedIds.size === 0}
        >
          Continue
        </Button>
      </WizardFooter>
    </div>
  );
}
