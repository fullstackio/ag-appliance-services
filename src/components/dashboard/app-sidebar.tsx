"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  CalendarCheck,
  ExternalLink,
  Images,
  LayoutDashboard,
  LayoutList,
  ListTree,
  LogOut,
  MessageSquare,
  Settings,
  Users,
} from "lucide-react";
import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useOverview } from "@/hooks/use-admin";
import type { UserRole } from "@/lib/validations/auth";

const NAV = [
  {
    label: "Overview",
    items: [{ href: "/dashboard", icon: LayoutDashboard, title: "Dashboard" }],
  },
  {
    label: "Website",
    items: [
      { href: "/dashboard/banners", icon: Images, title: "Banners" },
      { href: "/dashboard/menus", icon: ListTree, title: "Menus" },
      { href: "/dashboard/content", icon: LayoutList, title: "Page content" },
      { href: "/dashboard/settings", icon: Settings, title: "Site settings" },
    ],
  },
  {
    label: "Customers",
    items: [
      { href: "/dashboard/bookings", icon: CalendarCheck, title: "Bookings", badge: "bookingsNew" },
      {
        href: "/dashboard/enquiries",
        icon: MessageSquare,
        title: "Enquiries",
        badge: "enquiriesNew",
      },
    ],
  },
  {
    label: "Team",
    items: [{ href: "/dashboard/users", icon: Users, title: "Users", badge: "usersPending" }],
  },
] as const;

export function AppSidebar({
  user,
}: {
  user: { name?: string | null; email?: string | null; role: UserRole };
}) {
  const pathname = usePathname();
  const { data: overview } = useOverview();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link href="/dashboard" className="flex items-center gap-3 px-2 py-1">
          <Image src="/images/logo.png" alt="" width={36} height={36} className="rounded-full" />
          <div className="leading-tight group-data-[collapsible=icon]:hidden">
            <div className="text-sm font-extrabold tracking-wide">AG APPLIANCE</div>
            <div className="text-brand-gold text-[11px] font-bold tracking-[.14em]">DASHBOARD</div>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {NAV.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const active =
                    item.href === "/dashboard"
                      ? pathname === item.href
                      : pathname.startsWith(item.href);
                  const badge =
                    "badge" in item && overview ? overview[item.badge as keyof typeof overview] : 0;
                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        isActive={active}
                        tooltip={item.title}
                        render={<Link href={item.href} />}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                      {typeof badge === "number" && badge > 0 ? (
                        <SidebarMenuBadge className="bg-brand-copper text-white">
                          {badge}
                        </SidebarMenuBadge>
                      ) : null}
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center gap-2 px-2 py-1 group-data-[collapsible=icon]:hidden">
          <div className="bg-brand-copper grid size-8 shrink-0 place-items-center rounded-full text-xs font-bold text-white">
            {(user.name ?? user.email ?? "?").slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1 leading-tight">
            <div className="truncate text-sm font-medium">{user.name}</div>
            <div className="text-sidebar-foreground/60 truncate text-[11px] capitalize">
              {user.role}
            </div>
          </div>
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="View website"
              render={<a href="/" target="_blank" rel="noreferrer" />}
            >
              <ExternalLink />
              <span>View website</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Sign out"
              render={<Button variant="ghost" className="w-full justify-start" />}
              onClick={() => void signOut({ callbackUrl: "/login" })}
            >
              <LogOut />
              <span>Sign out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
