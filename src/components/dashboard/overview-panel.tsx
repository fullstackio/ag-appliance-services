"use client";

import Link from "next/link";

import { StatusBadge } from "@/components/dashboard/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useOverview } from "@/hooks/use-admin";
import { APPLIANCE_LABELS } from "@/lib/validations/booking";

export function OverviewPanel() {
  const { data, isLoading } = useOverview();

  const tiles = [
    { label: "Bookings today", value: data?.bookingsToday, href: "/dashboard/bookings" },
    { label: "New bookings", value: data?.bookingsNew, href: "/dashboard/bookings?status=new" },
    { label: "New enquiries", value: data?.enquiriesNew, href: "/dashboard/enquiries?status=new" },
    { label: "Users awaiting approval", value: data?.usersPending, href: "/dashboard/users" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {tiles.map((t) => (
          <Link key={t.label} href={t.href}>
            <Card className="hover:border-brand-copper/50 transition-colors">
              <CardHeader className="pb-1">
                <CardTitle className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                  {t.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-9 w-16" />
                ) : (
                  <div className="text-brand-copper text-3xl font-extrabold">{t.value ?? 0}</div>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Appliance</TableHead>
                <TableHead>Area</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Received</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5}>
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                </TableRow>
              ) : data?.recent.length ? (
                data.recent.map((b) => (
                  <TableRow key={b._id}>
                    <TableCell>
                      <div className="font-medium">{b.name}</div>
                      <div className="text-muted-foreground text-xs">{b.phone}</div>
                    </TableCell>
                    <TableCell>{APPLIANCE_LABELS[b.appliance]}</TableCell>
                    <TableCell className="max-w-[220px] truncate">{b.address}</TableCell>
                    <TableCell>
                      <StatusBadge status={b.status} />
                    </TableCell>
                    <TableCell className="text-muted-foreground text-right text-xs">
                      {new Date(b.createdAt).toLocaleString("en-IN")}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-muted-foreground py-8 text-center">
                    No bookings yet — they&apos;ll appear here as customers book from the website.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
