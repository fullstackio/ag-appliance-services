import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import type { Metadata } from "next";

export const metadata: Metadata = { title: "Dashboard — AG Appliance Services" };

export default async function DashboardLayout({ children }: LayoutProps<"/dashboard">) {
  const session = await auth();
  if (!session?.user || session.user.status !== "active") {
    redirect("/login?callbackUrl=/dashboard");
  }
  return (
    <SidebarProvider>
      <AppSidebar user={session.user} />
      <SidebarInset className="min-h-screen">{children}</SidebarInset>
    </SidebarProvider>
  );
}
