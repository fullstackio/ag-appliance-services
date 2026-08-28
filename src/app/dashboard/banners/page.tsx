import { BannersManager } from "@/components/dashboard/banners-manager";
import { PageHeader } from "@/components/dashboard/page-header";

export default function BannersPage() {
  return (
    <>
      <PageHeader
        title="Banners"
        description="Hero banner content, image, buttons and trust badges"
      />
      <div className="p-4 sm:p-6">
        <BannersManager />
      </div>
    </>
  );
}
