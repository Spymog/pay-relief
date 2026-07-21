import type { Metadata } from "next";
import { getCounterparties } from "@/app/actions/counterparties";
import { getBanks } from "@/lib/banks";
import CounterpartiesSection from "./_components/CounterpartiesSection";

export const metadata: Metadata = {
  title: "Counterparties — PayRelief",
  description: "Manage the lenders and agencies you negotiate with.",
};

export default async function CounterpartiesPage() {
  const [counterparties, banks] = await Promise.all([
    getCounterparties(),
    getBanks(),
  ]);

  return (
    <div className="container mx-auto max-w-6xl px-4 py-10 space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-semibold">Counterparties</h1>
        <p className="text-muted-foreground">
          Manage the lenders and agencies you negotiate with.
        </p>
      </div>
      <CounterpartiesSection initialCounterparties={counterparties} banks={banks} />
    </div>
  );
}
