import type { Metadata } from "next";
import { DefermentHero } from "@/components/sections/deferment/deferment-hero";

export const metadata: Metadata = {
  title: "Deferment Notification — PayRelief",
  description: "Negotiate your debt with confidence.",
};

export default function DefermentPage() {
  return (
    <div className="w-full">
      <DefermentHero />
    </div>
  );
}
