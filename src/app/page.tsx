import type { Metadata } from "next";
import { HomeLanding } from "@/components/sections/home/home-landing";

export const metadata: Metadata = {
  title: "PayRelief — Negotiate Your Bills with AI",
  description:
    "Connect your accounts and let PayRelief call and notify your lenders for you.",
};

export default function HomePage() {
  return (
    <div className="w-full">
      <HomeLanding />
    </div>
  );
}
