import type { Metadata } from "next";
import { getBanks } from "@/app/actions/getBanks";
import NewCallDialog from "./_components/NewCallDialog";
import CallRecordsView from "./_components/CallRecordsView";

export const metadata: Metadata = {
  title: "Dashboard — PayRelief",
  description: "Track your deferment calls.",
};

export default async function DashboardPage() {
  const banks = await getBanks();

  return (
    <div className="container mx-auto max-w-6xl px-4 py-10 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl font-semibold">Dashboard</h1>
        <NewCallDialog banks={banks} />
      </div>
      <CallRecordsView />
    </div>
  );
}
