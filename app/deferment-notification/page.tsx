import type { Metadata } from "next";
import { DefermentHero } from "@/components/sections/deferment/deferment-hero";
import { getBanks } from "../actions/getBanks";

export const metadata: Metadata = {
  title: "Deferment Notification — PayRelief",
  description: "Negotiate your debt with confidence.",
};

export default async function DefermentPage() {
  const banks = await getBanks();

  return (
    <div className="w-full">
      <DefermentHero banks={banks} />
    </div>
  );
}
