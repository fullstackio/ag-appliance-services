/**
 * Zustand store — booking form draft + UI state.
 * Persisted to localStorage so a visitor doesn't lose a half-filled form.
 * Author: Avijit Ghosh
 */
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import type { ApplianceType } from "@/lib/validations/booking";

export interface BookingDraft {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  appliance: ApplianceType | "";
  company: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  address: string;
  landmark: string;
  message: string;
  preferredDate: string;
}

interface BookingState {
  draft: BookingDraft;
  isSubmitting: boolean;
  lastBookingId: string | null;
  setField: <K extends keyof BookingDraft>(
    key: K,
    value: BookingDraft[K],
  ) => void;
  setSubmitting: (value: boolean) => void;
  setLastBookingId: (id: string | null) => void;
  reset: () => void;
}

const emptyDraft: BookingDraft = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  appliance: "",
  company: "",
  country: "",
  state: "",
  city: "",
  zipCode: "",
  address: "",
  landmark: "",
  message: "",
  preferredDate: "",
};

export const useBookingStore = create<BookingState>()(
  devtools(
    persist(
      (set) => ({
        draft: emptyDraft,
        isSubmitting: false,
        lastBookingId: null,
        setField: (key, value) =>
          set((s) => ({ draft: { ...s.draft, [key]: value } })),
        setSubmitting: (isSubmitting) => set({ isSubmitting }),
        setLastBookingId: (lastBookingId) => set({ lastBookingId }),
        reset: () => set({ draft: emptyDraft, isSubmitting: false }),
      }),
      {
        name: "ag-booking-draft",
        partialize: (s) => ({ draft: s.draft }),
      },
    ),
    { name: "BookingStore", enabled: process.env.NODE_ENV !== "production" },
  ),
);
