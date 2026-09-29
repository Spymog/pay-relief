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

  // The container fills the viewport below the navbar (the same 4rem/5rem
  // offsets the dashboard sidebar uses) so the wizard's sticky action bar sits
  // at the bottom of the screen on short steps too, not just on ones long
  // enough to scroll. It has no bottom padding: the bar runs flush to the edge.
  return (
    <div className="container mx-auto flex min-h-[calc(100svh-4rem)] max-w-3xl flex-col gap-6 px-4 pt-10 lg:min-h-[calc(100svh-5rem)]">
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
