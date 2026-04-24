import { getBanks } from "@/lib/banks";
import { BankDefermentSelector } from "@/components/sections/deferment/bank-deferment-selector";

/**
 * Server component — fetches bank list from Supabase, then renders
 * the interactive client selector. Drop this anywhere in your app.
 *
 * Usage:
 *   import { BankDefermentLookup } from "@/components/bank-deferment-lookup";
 *   <BankDefermentLookup />
 */
export async function BankDefermentLookup() {
  const banks = await getBanks();

  return (
    <div className="w-full max-w-lg space-y-2">
      <div className="space-y-1">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Select your bank
        </label>
        <p className="text-xs text-muted-foreground">
          We'll show you the correct deferment department number.
        </p>
      </div>

      <BankDefermentSelector banks={banks} />

      {banks.length === 0 && (
        <p className="text-sm text-destructive">
          Unable to load banks. Please refresh or contact support.
        </p>
      )}
    </div>
  );
}
