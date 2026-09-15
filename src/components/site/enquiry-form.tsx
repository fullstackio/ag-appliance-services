"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateEnquiry } from "@/hooks/use-enquiries";
import { ApiError } from "@/lib/api-client";
import { cn } from "@/lib/utils";
import {
  type EnquiryInput,
  enquiryInputSchema,
} from "@/lib/validations/content";

/** "Send us a message" — posts to /api/enquiries (shown in Dashboard → Enquiries). */
export function EnquiryForm({
  onDone,
  phone,
}: {
  onDone: () => void;
  phone: string;
}) {
  const create = useCreateEnquiry();
  const form = useForm<EnquiryInput>({
    resolver: zodResolver(enquiryInputSchema),
    defaultValues: { name: "", phone: "", message: "" },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await create.mutateAsync(values);
      toast.success("Message sent!", {
        description: "We'll get back to you shortly.",
      });
      form.reset();
      onDone();
    } catch (err) {
      if (err instanceof ApiError && err.fields) {
        for (const [k, msg] of Object.entries(err.fields)) {
          form.setError(k as keyof EnquiryInput, { message: msg });
        }
      }
      toast.error(
        err instanceof Error ? err.message : "Could not send message",
        {
          description: `You can also call us on ${phone}.`,
        },
      );
    }
  });

  return (
    <form onSubmit={onSubmit} noValidate>
      <FieldGroup>
        <div className="grid gap-4 sm:grid-cols-2">
          <Controller
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input
                  id="eq-name"
                  aria-label="Your name"
                  placeholder="Full name"
                  autoComplete="name"
                  {...field}
                />
                <FieldError
                  errors={fieldState.error ? [fieldState.error] : undefined}
                />
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="phone"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center gap-1.5 pl-2.5 text-sm font-medium text-neutral-500 dark:text-neutral-400">
                    +91
                    <span className="h-4 w-px bg-neutral-300 dark:bg-neutral-600" />
                  </span>
                  <Input
                    id="eq-phone"
                    inputMode="numeric"
                    aria-label="Mobile number"
                    placeholder="10-digit mobile"
                    maxLength={10}
                    className={cn("pl-12")}
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value.replace(/\D/g, "").slice(0, 10),
                      )
                    }
                  />
                </div>
                <FieldError
                  errors={fieldState.error ? [fieldState.error] : undefined}
                />
              </Field>
            )}
          />
        </div>
        <Controller
          control={form.control}
          name="message"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Textarea
                id="eq-message"
                rows={4}
                aria-label="Your message"
                placeholder="How can we help?"
                {...field}
              />
              <FieldError
                errors={fieldState.error ? [fieldState.error] : undefined}
              />
            </Field>
          )}
        />
      </FieldGroup>
      <DialogFooter className="mt-6">
        <Button type="button" variant="outline" onClick={onDone}>
          Cancel
        </Button>
        <Button type="submit" variant="copper" disabled={create.isPending}>
          {create.isPending ? "Sending…" : "✉ Send message"}
        </Button>
      </DialogFooter>
    </form>
  );
}
