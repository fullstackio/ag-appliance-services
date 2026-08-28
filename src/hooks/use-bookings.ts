"use client";

/**
 * React Query hooks for bookings.
 * Author: Avijit Ghosh
 */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { apiFetch } from "@/lib/api-client";
import type { BookingInput } from "@/lib/validations/booking";
import type { Booking } from "@/models/Booking";

export type BookingRecord = Booking & { _id: string; createdAt: string; updatedAt: string };

export const bookingKeys = {
  all: ["bookings"] as const,
  list: () => [...bookingKeys.all, "list"] as const,
};

export function useBookings() {
  return useQuery({
    queryKey: bookingKeys.list(),
    queryFn: () => apiFetch<{ data: BookingRecord[] }>("/api/bookings").then((r) => r.data),
  });
}

export function useCreateBooking() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: BookingInput) =>
      apiFetch<{ data: BookingRecord }>("/api/bookings", {
        method: "POST",
        body: JSON.stringify(input),
      }).then((r) => r.data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: bookingKeys.all });
    },
  });
}
