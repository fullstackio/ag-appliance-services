"use client";

/**
 * React Query hooks for the dashboard (all call /api/admin/*).
 * Author: Avijit Ghosh
 */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { apiFetch } from "@/lib/api-client";
import type { UserRole, UserStatus } from "@/lib/validations/auth";
import type { ApplianceType } from "@/lib/validations/booking";
import type {
  Banner,
  Menu,
  MenuLocation,
  Section,
  SectionKey,
  SiteSettings,
} from "@/lib/validations/content";

export type WithId<T> = T & {
  _id: string;
  createdAt?: string;
  updatedAt?: string;
};

export interface BookingRow {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  appliance: ApplianceType;
  company?: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  address: string;
  landmark?: string;
  message?: string;
  preferredDate?: string;
  status: "new" | "confirmed" | "completed" | "cancelled";
  note?: string;
  createdAt: string;
}
export interface EnquiryRow {
  _id: string;
  name: string;
  phone: string;
  message: string;
  status: "new" | "read" | "closed";
  createdAt: string;
}
export interface UserRow {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  lastLoginAt?: string;
  createdAt: string;
}
export interface Overview {
  bookingsTotal: number;
  bookingsNew: number;
  bookingsToday: number;
  enquiriesNew: number;
  usersPending: number;
  recent: BookingRow[];
}

export const adminKeys = {
  overview: ["admin", "overview"] as const,
  settings: ["admin", "settings"] as const,
  menus: ["admin", "menus"] as const,
  banners: ["admin", "banners"] as const,
  sections: ["admin", "sections"] as const,
  section: (key: SectionKey) => ["admin", "sections", key] as const,
  bookings: (status?: string) =>
    ["admin", "bookings", status ?? "all"] as const,
  enquiries: (status?: string) =>
    ["admin", "enquiries", status ?? "all"] as const,
  users: ["admin", "users"] as const,
};

const unwrap = <T>(p: Promise<{ data: T }>) => p.then((r) => r.data);

// ---------------------------------------------------------------- overview
export const useOverview = () =>
  useQuery({
    queryKey: adminKeys.overview,
    queryFn: () => unwrap(apiFetch<{ data: Overview }>("/api/admin/overview")),
  });

// ---------------------------------------------------------------- settings
export const useSettings = () =>
  useQuery({
    queryKey: adminKeys.settings,
    queryFn: () =>
      unwrap(apiFetch<{ data: SiteSettings }>("/api/admin/settings")),
  });

export function useSaveSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: SiteSettings) =>
      unwrap(
        apiFetch<{ data: SiteSettings }>("/api/admin/settings", {
          method: "PUT",
          body: JSON.stringify(data),
        }),
      ),
    onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.settings }),
  });
}

// ---------------------------------------------------------------- menus
export const useMenus = () =>
  useQuery({
    queryKey: adminKeys.menus,
    queryFn: () => unwrap(apiFetch<{ data: Menu[] }>("/api/admin/menus")),
  });

export function useSaveMenu() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ location, ...data }: Menu) =>
      unwrap(
        apiFetch<{ data: Menu }>(
          `/api/admin/menus/${location satisfies MenuLocation}`,
          {
            method: "PUT",
            body: JSON.stringify(data),
          },
        ),
      ),
    onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.menus }),
  });
}

// ---------------------------------------------------------------- banners
export const useBanners = () =>
  useQuery({
    queryKey: adminKeys.banners,
    queryFn: () =>
      unwrap(apiFetch<{ data: Array<WithId<Banner>> }>("/api/admin/banners")),
  });

export function useCreateBanner() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Banner) =>
      unwrap(
        apiFetch<{ data: WithId<Banner> }>("/api/admin/banners", {
          method: "POST",
          body: JSON.stringify(data),
        }),
      ),
    onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.banners }),
  });
}

export function useUpdateBanner() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: Partial<Banner> & { id: string }) =>
      unwrap(
        apiFetch<{ data: WithId<Banner> }>(`/api/admin/banners/${id}`, {
          method: "PATCH",
          body: JSON.stringify(data),
        }),
      ),
    onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.banners }),
  });
}

export function useDeleteBanner() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      unwrap(
        apiFetch<{ data: { id: string } }>(`/api/admin/banners/${id}`, {
          method: "DELETE",
        }),
      ),
    onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.banners }),
  });
}

// ---------------------------------------------------------------- sections
export const useSections = () =>
  useQuery({
    queryKey: adminKeys.sections,
    queryFn: () => unwrap(apiFetch<{ data: Section[] }>("/api/admin/sections")),
  });

export const useSection = (key: SectionKey) =>
  useQuery({
    queryKey: adminKeys.section(key),
    queryFn: () =>
      unwrap(apiFetch<{ data: Section }>(`/api/admin/sections/${key}`)),
  });

export function useSaveSection(key: SectionKey) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Section) =>
      unwrap(
        apiFetch<{ data: Section }>(`/api/admin/sections/${key}`, {
          method: "PUT",
          body: JSON.stringify(data),
        }),
      ),
    onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.sections }),
  });
}

export function useResetSection(key: SectionKey) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () =>
      unwrap(
        apiFetch<{ data: Section }>(`/api/admin/sections/${key}`, {
          method: "DELETE",
        }),
      ),
    onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.sections }),
  });
}

// ---------------------------------------------------------------- bookings / enquiries
export const useAdminBookings = (status?: string) =>
  useQuery({
    queryKey: adminKeys.bookings(status),
    queryFn: () =>
      unwrap(
        apiFetch<{ data: { items: BookingRow[]; total: number } }>(
          `/api/admin/bookings${status ? `?status=${status}` : ""}`,
        ),
      ),
  });

export function useUpdateBooking() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      ...data
    }: {
      id: string;
      status?: BookingRow["status"];
      note?: string;
    }) =>
      unwrap(
        apiFetch<{ data: BookingRow }>(`/api/admin/bookings/${id}`, {
          method: "PATCH",
          body: JSON.stringify(data),
        }),
      ),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["admin", "bookings"] });
      void qc.invalidateQueries({ queryKey: adminKeys.overview });
    },
  });
}

export const useEnquiries = (status?: string) =>
  useQuery({
    queryKey: adminKeys.enquiries(status),
    queryFn: () =>
      unwrap(
        apiFetch<{ data: { items: EnquiryRow[]; total: number } }>(
          `/api/admin/enquiries${status ? `?status=${status}` : ""}`,
        ),
      ),
  });

export function useUpdateEnquiry() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: EnquiryRow["status"];
    }) =>
      unwrap(
        apiFetch<{ data: EnquiryRow }>(`/api/admin/enquiries/${id}`, {
          method: "PATCH",
          body: JSON.stringify({ status }),
        }),
      ),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "enquiries"] }),
  });
}

// ---------------------------------------------------------------- users
export const useUsers = () =>
  useQuery({
    queryKey: adminKeys.users,
    queryFn: () => unwrap(apiFetch<{ data: UserRow[] }>("/api/admin/users")),
  });

export function useUpdateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      ...data
    }: {
      id: string;
      role?: UserRole;
      status?: UserStatus;
    }) =>
      unwrap(
        apiFetch<{ data: UserRow }>(`/api/admin/users/${id}`, {
          method: "PATCH",
          body: JSON.stringify(data),
        }),
      ),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: adminKeys.users });
      void qc.invalidateQueries({ queryKey: adminKeys.overview });
    },
  });
}

export function useDeleteUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      unwrap(
        apiFetch<{ data: { id: string } }>(`/api/admin/users/${id}`, {
          method: "DELETE",
        }),
      ),
    onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.users }),
  });
}

// ---------------------------------------------------------------- upload
export async function uploadImage(file: File): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
  const body = (await res.json()) as { data?: { url: string }; error?: string };
  if (!res.ok || !body.data) {
    throw new Error(body.error ?? "Upload failed");
  }
  return body.data.url;
}
