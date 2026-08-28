import { OverviewPanel } from "@/components/dashboard/overview-panel";
import { PageHeader } from "@/components/dashboard/page-header";

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        description="What's happening with AG Appliance Services today"
      />
      <div className="p-4 sm:p-6">
        <OverviewPanel />
      </div>
    </>
  );
}
