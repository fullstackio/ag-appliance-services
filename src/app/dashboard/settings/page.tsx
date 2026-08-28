import { PageHeader } from "@/components/dashboard/page-header";
import { SettingsForm } from "@/components/dashboard/settings-form";

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        title="Site settings"
        description="Business details, contact info, logo and social links"
      />
      <div className="p-4 sm:p-6">
        <SettingsForm />
      </div>
    </>
  );
}
