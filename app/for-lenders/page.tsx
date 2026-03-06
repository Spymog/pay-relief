import type { Metadata } from "next"
import { LendersHero } from '@/components/sections/lenders-hero'
import { LendersProblem } from '@/components/sections/lenders-problem'
import { LendersHowItWorks } from '@/components/sections/lenders-how-it-works'
import { LendersFeatures } from '@/components/sections/lenders-features'
import { LendersPerks } from '@/components/sections/lenders-perks'
import { LendersDebtTypes } from '@/components/sections/lenders-debt-types'
import { LendersTiers } from '@/components/sections/lenders-tiers'
import { LendersFAQ } from '@/components/sections/lenders-faq'
import { LendersFinalCTA } from '@/components/sections/lenders-final-cta'

export const metadata: Metadata = {
  title: "For Lenders — PayRelief",
  description: "Recover more delinquent accounts with less legal overhead. PayRelief connects institutional lenders with pre-screened debtors for compliant, structured resolutions.",
}

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
      <LendersFAQ />
      <LendersFinalCTA />
    </div>
  )
}
