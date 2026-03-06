import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "For Debtors — NegotiateNow",
  description: "Take control of your debt with professional advocacy. NegotiateNow helps you negotiate better terms with creditors.",
}

export default function ForDebtorsPage() {
  return (
    <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="font-serif text-4xl lg:text-5xl font-semibold text-foreground mb-4 text-balance">
          For Debtors
        </h1>
        <p className="text-lg text-muted-foreground">
          Page content coming soon.
        </p>
      </div>
    </div>
  )
}
