import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support — PayRelief",
  description: "Get help with PayRelief.",
};

export default function SupportPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-10 space-y-6">
      <h1 className="font-serif text-3xl font-semibold">Support</h1>
      <p className="text-muted-foreground">Coming soon.</p>
    </div>
  );
}
