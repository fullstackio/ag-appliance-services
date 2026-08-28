"use client";

import { useMutation } from "@tanstack/react-query";

import { apiFetch } from "@/lib/api-client";
import type { EnquiryInput } from "@/lib/validations/content";

export function useCreateEnquiry() {
  return useMutation({
    mutationFn: (input: EnquiryInput) =>
      apiFetch<{ data: { id: string } }>("/api/enquiries", {
        method: "POST",
        body: JSON.stringify(input),
      }).then((r) => r.data),
  });
}
