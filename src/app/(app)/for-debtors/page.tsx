import type { Metadata } from "next";
import { DebtorsHero } from "@/components/sections/debtors/debtors-hero";
import { DebtorsPainPoints } from "@/components/sections/debtors/debtors-pain-points";
import { DebtorsHowItWorks } from "@/components/sections/debtors/debtors-how-it-works";
import { DebtorsPerks } from "@/components/sections/debtors/debtors-perks";
import { DebtorsSocialProof } from "@/components/sections/debtors/debtors-social-proof";
import { DebtorsSignup } from "@/components/sections/debtors/debtors-signup";
import { DebtorsFounderNote } from "@/components/sections/debtors/debtors-founder-note";
import { DebtorsFAQ } from "@/components/sections/debtors/debtors-faq";

export const metadata: Metadata = {
  title: "For Debtors — PayRelief",
  description: "Negotiate your debt with confidence.",
};

export default function ForDebtorsPage() {
  return (
    <div className="w-full">
      <DebtorsHero />
      <DebtorsPainPoints />
      <DebtorsHowItWorks />
      <DebtorsPerks />
      {/* <DebtorsSocialProof /> */}
      {/* <DebtorsFounderNote /> */}
      {/* <DebtorsFAQ /> */}
      {/* <DebtorsSignup /> */}
    </div>
  );
}
