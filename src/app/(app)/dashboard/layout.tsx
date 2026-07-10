import { CallRecordsProvider } from "@/context/CallRecordsProvider";
import { DashboardSidebar } from "./_components/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CallRecordsProvider>
      <div className="flex flex-col md:flex-row">
        <DashboardSidebar />
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </CallRecordsProvider>
  );
}
