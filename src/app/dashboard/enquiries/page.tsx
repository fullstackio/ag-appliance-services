import { EnquiriesTable } from "@/components/dashboard/enquiries-table";
import { PageHeader } from "@/components/dashboard/page-header";

export default async function EnquiriesPage({ searchParams }: PageProps<"/dashboard/enquiries">) {
  const { status } = await searchParams;
  return (
    <>
      <PageHeader title="Enquiries" description="Messages from the contact form" />
      <div className="p-4 sm:p-6">
        <EnquiriesTable initialStatus={typeof status === "string" ? status : undefined} />
      </div>
    </>
  );
}
