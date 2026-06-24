import type { Metadata } from "next";
import { LendersHero } from "@/components/sections/lenders/lenders-hero";
import { LendersProblem } from "@/components/sections/lenders/lenders-problem";
import { LendersHowItWorks } from "@/components/sections/lenders/lenders-how-it-works";
import { LendersFeatures } from "@/components/sections/lenders/lenders-features";
import { LendersPerks } from "@/components/sections/lenders/lenders-perks";
import { LendersDebtTypes } from "@/components/sections/lenders/lenders-debt-types";
import { LendersTiers } from "@/components/sections/lenders/lenders-tiers";
import { LendersFAQ } from "@/components/sections/lenders/lenders-faq";
import { LendersFinalCTA } from "@/components/sections/lenders/lenders-final-cta";

export const metadata: Metadata = {
  title: "For Lenders — PayRelief",
  description: "Recover more delinquent accounts with less legal overhead.",
};

export default function ForLendersPage() {
  return (
    <div className="w-full">
      <LendersHero />
      <LendersProblem />
      <LendersHowItWorks />
      <LendersFeatures />
      <LendersPerks />
      <LendersDebtTypes />
      <LendersTiers />
      {/* <LendersFAQ /> */}
      <LendersFinalCTA />
    </div>
  );
}
