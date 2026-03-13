import type { Metadata } from "next";
import { DebtorsHero } from "@/components/sections/debtors-hero";
import { DebtorsPainPoints } from "@/components/sections/debtors-pain-points";
import { DebtorsHowItWorks } from "@/components/sections/debtors-how-it-works";
import { DebtorsPerks } from "@/components/sections/debtors-perks";
import { DebtorsSocialProof } from "@/components/sections/debtors-social-proof";
import { DebtorsSignup } from "@/components/sections/debtors-signup";
import { DebtorsFounderNote } from "@/components/sections/debtors-founder-note";
import { DebtorsFAQ } from "@/components/sections/debtors-faq";

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
      <DebtorsSignup />
    </div>
  );
}
