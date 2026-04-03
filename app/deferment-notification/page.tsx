import type { Metadata } from "next";
// import { DebtorsHero } from "@/components/sections/debtors-hero";
// import { DebtorsPainPoints } from "@/components/sections/debtors-pain-points";
// import { DebtorsHowItWorks } from "@/components/sections/debtors-how-it-works";
// import { DebtorsPerks } from "@/components/sections/debtors-perks";
// import { DebtorsSocialProof } from "@/components/sections/debtors-social-proof";
// import { DebtorsSignup } from "@/components/sections/debtors-signup";
// import { DebtorsFounderNote } from "@/components/sections/debtors-founder-note";
// import { DebtorsFAQ } from "@/components/sections/debtors-faq";
import { DefermentHero } from "@/components/sections/deferment/deferment-hero";

export const metadata: Metadata = {
  title: "Deferment Notification — PayRelief",
  description: "Negotiate your debt with confidence.",
};

export default function DefermentPage() {
  return (
    <div className="w-full">
      <DefermentHero />
      {/* <DebtorsHero />
      <DebtorsPainPoints />
      <DebtorsHowItWorks />
      <DebtorsPerks /> */}
      {/* <DebtorsSocialProof /> */}
      {/* <DebtorsFounderNote /> */}
      {/* <DebtorsFAQ /> */}
      {/* <DebtorsSignup /> */}
    </div>
  );
}
