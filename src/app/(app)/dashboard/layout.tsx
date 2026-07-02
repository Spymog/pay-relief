import { CallRecordsProvider } from "@/context/CallRecordsProvider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CallRecordsProvider>{children}</CallRecordsProvider>;
}
