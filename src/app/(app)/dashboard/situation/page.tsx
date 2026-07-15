import type { Metadata } from "next";
import SituationSection from "./_components/SituationSection";

export const metadata: Metadata = {
  title: "Situation — PayRelief",
  description: "Describe your financial situation.",
};

export default function SituationPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-10 space-y-6">
      <h1 className="font-serif text-3xl font-semibold">Situation</h1>
      <SituationSection />
    </div>
  );
}
