"use client";

import { useState } from "react";

import { toast } from "sonner";

import { StatusBadge } from "@/components/dashboard/status-badge";
import { Button } from "@/components/ui/button";
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
import { type EnquiryRow, useEnquiries, useUpdateEnquiry } from "@/hooks/use-admin";

export function EnquiriesTable({ initialStatus }: { initialStatus?: string }) {
  const [status, setStatus] = useState<string>(initialStatus ?? "all");
  const { data, isLoading } = useEnquiries(status === "all" ? undefined : status);
  const update = useUpdateEnquiry();

  const mark = async (e: EnquiryRow, next: EnquiryRow["status"]) => {
    try {
      await update.mutateAsync({ id: e._id, status: next });
      toast.success(`Marked ${next}`);
    } catch {
      toast.error("Could not update enquiry");
    }
  };

  return (
    <div className="space-y-4">
      <Tabs value={status} onValueChange={(v) => setStatus(String(v))}>
        <TabsList>
          {["all", "new", "read", "closed"].map((s) => (
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
              <TableHead>From</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Received</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <Skeleton className="h-6 w-full" />
                </TableCell>
              </TableRow>
            ) : data?.items.length ? (
              data.items.map((e) => (
                <TableRow key={e._id}>
                  <TableCell>
                    <div className="font-medium">{e.name}</div>
                    <a
                      href={`tel:${e.phone}`}
                      className="text-brand-copper text-xs hover:underline"
                    >
                      {e.phone}
                    </a>
                  </TableCell>
                  <TableCell className="max-w-[380px] text-sm whitespace-normal">
                    {e.message}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs whitespace-nowrap">
                    {new Date(e.createdAt).toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={e.status} />
                  </TableCell>
                  <TableCell className="space-x-1 text-right">
                    {e.status === "new" ? (
                      <Button size="xs" variant="outline" onClick={() => void mark(e, "read")}>
                        Mark read
                      </Button>
                    ) : null}
                    {e.status !== "closed" ? (
                      <Button size="xs" variant="ghost" onClick={() => void mark(e, "closed")}>
                        Close
                      </Button>
                    ) : null}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-muted-foreground py-10 text-center">
                  No enquiries in this view.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
