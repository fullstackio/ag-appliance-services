import { MenusManager } from "@/components/dashboard/menus-manager";
import { PageHeader } from "@/components/dashboard/page-header";

export default function MenusPage() {
  return (
    <>
      <PageHeader title="Menus" description="Header navigation and footer link columns" />
      <div className="p-4 sm:p-6">
        <MenusManager />
      </div>
    </>
  );
}
