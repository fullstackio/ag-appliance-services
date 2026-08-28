"use client";

import { Check, ShieldOff, Trash2, UserCheck } from "lucide-react";
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
import { useDeleteUser, useUpdateUser, type UserRow, useUsers } from "@/hooks/use-admin";
import { ApiError } from "@/lib/api-client";
import type { UserRole } from "@/lib/validations/auth";

export function UsersTable({ me }: { me: { id: string; role: UserRole } }) {
  const { data, isLoading } = useUsers();
  const update = useUpdateUser();
  const del = useDeleteUser();
  const isOwner = me.role === "owner";

  const act = async (fn: () => Promise<unknown>, okMsg: string) => {
    try {
      await fn();
      toast.success(okMsg);
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Action failed");
    }
  };

  const remove = (u: UserRow) => {
    if (!window.confirm(`Delete ${u.email}? They will no longer be able to sign in.`)) {
      return;
    }
    void act(() => del.mutateAsync(u._id), "User deleted");
  };

  return (
    <div className="space-y-3">
      {!isOwner ? (
        <p className="text-muted-foreground text-sm">
          Only the owner can approve, disable or delete users.
        </p>
      ) : null}
      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last login</TableHead>
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
            ) : (
              data?.map((u) => {
                const self = u._id === me.id;
                return (
                  <TableRow key={u._id}>
                    <TableCell>
                      <div className="font-medium">
                        {u.name}{" "}
                        {self ? <span className="text-muted-foreground text-xs">(you)</span> : null}
                      </div>
                      <div className="text-muted-foreground text-xs">{u.email}</div>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={u.role} />
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={u.status} />
                    </TableCell>
                    <TableCell className="text-muted-foreground text-xs whitespace-nowrap">
                      {u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleString("en-IN") : "—"}
                    </TableCell>
                    <TableCell className="space-x-1 text-right">
                      {isOwner && !self ? (
                        <>
                          {u.status !== "active" ? (
                            <Button
                              size="xs"
                              variant="outline"
                              onClick={() =>
                                void act(
                                  () => update.mutateAsync({ id: u._id, status: "active" }),
                                  "User approved"
                                )
                              }
                            >
                              <Check /> Approve
                            </Button>
                          ) : (
                            <Button
                              size="xs"
                              variant="ghost"
                              onClick={() =>
                                void act(
                                  () => update.mutateAsync({ id: u._id, status: "disabled" }),
                                  "User disabled"
                                )
                              }
                            >
                              <ShieldOff /> Disable
                            </Button>
                          )}
                          {u.role === "admin" ? (
                            <Button
                              size="xs"
                              variant="ghost"
                              onClick={() =>
                                void act(
                                  () => update.mutateAsync({ id: u._id, role: "owner" }),
                                  "Promoted to owner"
                                )
                              }
                            >
                              <UserCheck /> Make owner
                            </Button>
                          ) : null}
                          <Button
                            size="icon-xs"
                            variant="destructive"
                            aria-label="Delete"
                            onClick={() => remove(u)}
                          >
                            <Trash2 />
                          </Button>
                        </>
                      ) : null}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
