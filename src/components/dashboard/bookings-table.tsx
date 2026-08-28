"use client";

import { useState } from "react";

import { toast } from "sonner";

import { StatusBadge } from "@/components/dashboard/status-badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type BookingRow, useAdminBookings, useUpdateBooking } from "@/hooks/use-admin";
import { APPLIANCE_LABELS } from "@/lib/validations/booking";

const STATUSES = ["new", "confirmed", "completed", "cancelled"] as const;

export function BookingsTable({ initialStatus }: { initialStatus?: string }) {
  const [status, setStatus] = useState<string>(initialStatus ?? "all");
  const { data, isLoading } = useAdminBookings(status === "all" ? undefined : status);
  const update = useUpdateBooking();

  const change = async (b: BookingRow, next: BookingRow["status"]) => {
    try {
      await update.mutateAsync({ id: b._id, status: next });
      toast.success(`Booking marked ${next}`);
    } catch {
      toast.error("Could not update booking");
    }
  };

  return (
    <div className="space-y-4">
      <Tabs value={status} onValueChange={(v) => setStatus(String(v))}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          {STATUSES.map((s) => (
            <TabsTrigger key={s} value={s} className="capitalize">
              {s}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Appliance</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Problem</TableHead>
              <TableHead>Received</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6}>
                  <Skeleton className="h-6 w-full" />
                </TableCell>
              </TableRow>
            ) : data?.items.length ? (
              data.items.map((b) => (
                <TableRow key={b._id}>
                  <TableCell>
                    <div className="font-medium">{b.name}</div>
                    <a
                      href={`tel:${b.phone}`}
                      className="text-brand-copper text-xs hover:underline"
                    >
                      {b.phone}
                    </a>
                  </TableCell>
                  <TableCell>{APPLIANCE_LABELS[b.appliance]}</TableCell>
                  <TableCell className="max-w-[220px] whitespace-normal">{b.address}</TableCell>
                  <TableCell className="text-muted-foreground max-w-[260px] text-xs whitespace-normal">
                    {b.message ?? "—"}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs whitespace-nowrap">
                    {new Date(b.createdAt).toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={b.status}
                      onValueChange={(v) => void change(b, v as BookingRow["status"])}
                    >
                      <SelectTrigger className="h-8 w-36">
                        <SelectValue>
                          <StatusBadge status={b.status} />
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {STATUSES.map((s) => (
                          <SelectItem key={s} value={s} className="capitalize">
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-muted-foreground py-10 text-center">
                  No bookings in this view.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {data ? <p className="text-muted-foreground text-xs">{data.total} booking(s)</p> : null}
    </div>
  );
}
