import type { Metadata } from "next";
import { getCounterparties } from "@/app/actions/counterparties";
import { getSituation } from "@/app/actions/situations";
import { getBanks } from "@/lib/banks";
import GenerateWizard from "./_components/GenerateWizard";

export const metadata: Metadata = {
  title: "Generate — PayRelief",
  description: "Generate negotiation materials.",
};

export default async function GeneratePage() {
  const [counterparties, situation, banks] = await Promise.all([
    getCounterparties(),
    getSituation(),
    getBanks(),
  ]);

  return (
    <div className="container mx-auto max-w-3xl px-4 py-10 space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-semibold">Generate</h1>
        <p className="text-muted-foreground">
          Select who you need to talk to, confirm your situation, and
          we&apos;ll draft a script for the conversation.
        </p>
      </div>
      <GenerateWizard
        initialCounterparties={counterparties}
        initialSituation={situation}
        banks={banks}
      />
    </div>
  );
}
