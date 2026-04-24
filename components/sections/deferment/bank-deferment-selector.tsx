"use client";

import * as React from "react";
import {
  Check,
  ChevronsUpDown,
  Phone,
  Clock,
  ExternalLink,
  Building2,
  MapPin,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Bank } from "@/lib/banks";

interface BankDefermentSelectorProps {
  banks: Bank[];
  /** Called when the user confirms their bank selection */
  onSelect?: (bank: Bank) => void;
  /** Optional placeholder override */
  placeholder?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Pre-selected bank id */
  defaultBankId?: string;
}

export function BankDefermentSelector({
  banks,
  onSelect,
  placeholder = "Search for your bank…",
  disabled = false,
  defaultBankId,
}: BankDefermentSelectorProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedBank, setSelectedBank] = React.useState<Bank | null>(
    banks.find((b) => b.id === defaultBankId) ?? null,
  );

  const handleSelect = (bank: Bank) => {
    setSelectedBank(bank);
    setOpen(false);
    console.log("bank:", bank);
  };

  return (
    <div className="w-full space-y-4">
      {/* Combobox trigger */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select your bank"
            disabled={disabled}
            className={cn(
              "w-full justify-between h-12 px-4 text-base font-normal",
              "border-2 transition-colors duration-150",
              "hover:border-primary focus-visible:border-primary",
              !selectedBank && "text-muted-foreground",
            )}
          >
            <span className="flex items-center gap-2 truncate">
              <Building2 className="h-4 w-4 shrink-0 text-muted-foreground" />
              {selectedBank ? selectedBank.name : placeholder}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 text-muted-foreground" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="w-[var(--radix-popover-trigger-width)] p-0"
          align="start"
          sideOffset={4}
        >
          <Command>
            <CommandInput placeholder="Type to search…" className="h-11" />
            <CommandList>
              <CommandEmpty>
                <div className="py-6 text-center text-sm text-muted-foreground">
                  No bank found.{" "}
                  <span className="text-foreground font-medium">
                    Contact support to add your bank.
                  </span>
                </div>
              </CommandEmpty>

              <CommandGroup heading={`${banks.length} supported banks`}>
                {banks.map((bank) => (
                  <CommandItem
                    key={bank.id}
                    value={bank.name}
                    onSelect={() => handleSelect(bank)}
                    className="flex items-center justify-between py-2.5 px-3 cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Check
                        className={cn(
                          "h-4 w-4 shrink-0",
                          selectedBank?.id === bank.id
                            ? "opacity-100 text-primary"
                            : "opacity-0",
                        )}
                      />
                      {bank.rank && (
                        <span className="text-xs text-muted-foreground tabular-nums w-5 text-right shrink-0">
                          {bank.rank}.
                        </span>
                      )}
                      <span>{bank.name}</span>
                    </span>
                    {bank.hq && (
                      <span className="text-xs text-muted-foreground truncate max-w-[120px]">
                        {bank.hq}
                      </span>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Result card — shown after selection */}
      {selectedBank && <DefermentResultCard bank={selectedBank} />}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Result card                                                                 */
/* -------------------------------------------------------------------------- */

function DefermentResultCard({ bank }: { bank: Bank }) {
  const [copied, setCopied] = React.useState(false);

  const copyNumber = async () => {
    if (!bank.deferment_phone) return;
    await navigator.clipboard.writeText(bank.deferment_phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "rounded-xl border-2 border-primary/20 bg-primary/5 p-5 space-y-4",
        "animate-in fade-in-0 slide-in-from-top-2 duration-300",
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
            Deferment Department
          </p>
          <h3 className="text-lg font-semibold leading-tight">{bank.name}</h3>
          <div className="flex items-center gap-3 mt-1">
            {bank.hq && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {bank.hq}
              </span>
            )}
            {bank.rank && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3" />#{bank.rank} by assets
                {bank.assets_bn && ` · $${bank.assets_bn.toLocaleString()}bn`}
              </span>
            )}
          </div>
        </div>
        <Badge variant="secondary" className="shrink-0 text-xs">
          Verified
        </Badge>
      </div>

      <Separator />

      {/* Phone number — primary CTA */}
      {bank.deferment_phone ? (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="h-3.5 w-3.5" />
            <span>Deferment line</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`tel:${bank.deferment_phone.replace(/\D/g, "")}`}
              className={cn(
                "text-2xl font-bold tracking-tight font-mono",
                "text-primary hover:text-primary/80 transition-colors",
              )}
            >
              {bank.deferment_phone}
            </a>
            <Button
              size="sm"
              variant="ghost"
              onClick={copyNumber}
              className="h-8 text-xs"
              aria-label="Copy phone number"
            >
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground italic">
          Phone number not available — please visit their website.
        </p>
      )}

      {/* Hours */}
      {bank.deferment_hours && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-3.5 w-3.5 shrink-0" />
          <span>{bank.deferment_hours}</span>
        </div>
      )}

      {/* External link */}
      {bank.deferment_url && (
        <div>
          <Separator className="mb-4" />
          <a
            href={bank.deferment_url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-1.5 text-sm font-medium",
              "text-primary hover:text-primary/80 transition-colors",
            )}
          >
            Visit deferment portal
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      )}
    </div>
  );
}
