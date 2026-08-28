import { BookingsTable } from "@/components/dashboard/bookings-table";
import { PageHeader } from "@/components/dashboard/page-header";

export default async function BookingsPage({ searchParams }: PageProps<"/dashboard/bookings">) {
  const { status } = await searchParams;
  return (
    <>
      <PageHeader title="Bookings" description="Service requests submitted from the website" />
      <div className="p-4 sm:p-6">
        <BookingsTable initialStatus={typeof status === "string" ? status : undefined} />
      </div>
    </>
  );
}
