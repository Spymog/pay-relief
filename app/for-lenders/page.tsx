import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "For Lenders — NegotiateNow",
  description: "Streamline debt recovery and improve customer relationships. NegotiateNow connects lenders with advocates.",
}

export default function ForLendersPage() {
  return (
    <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="font-serif text-4xl lg:text-5xl font-semibold text-foreground mb-4 text-balance">
          For Lenders
        </h1>
        <p className="text-lg text-muted-foreground">
          Page content coming soon.
        </p>
      </div>
    </div>
  )
}
