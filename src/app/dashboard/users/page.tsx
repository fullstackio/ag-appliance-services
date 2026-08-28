import { auth } from "@/auth";
import { PageHeader } from "@/components/dashboard/page-header";
import { UsersTable } from "@/components/dashboard/users-table";

export default async function UsersPage() {
  const session = await auth();
  const me = { id: session?.user.id ?? "", role: session?.user.role ?? "admin" } as const;
  return (
    <>
      <PageHeader
        title="Users"
        description="Dashboard accounts — new registrations wait here for approval"
      />
      <div className="p-4 sm:p-6">
        <UsersTable me={me} />
      </div>
    </>
  );
}
