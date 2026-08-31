"use client";

import { useMutation } from "@tanstack/react-query";

import { apiFetch } from "@/lib/api-client";
import type { ContactInput } from "@/lib/validations/contact";

export function useCreateContact() {
  return useMutation({
    mutationFn: (input: ContactInput) =>
      apiFetch<{ data: { id: string } }>("/api/contact", {
        method: "POST",
        body: JSON.stringify(input),
      }).then((r) => r.data),
  });
}
