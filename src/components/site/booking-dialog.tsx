"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { useCreateBooking } from "@/hooks/use-bookings";
import { useIsMobile } from "@/hooks/use-mobile";
import { ApiError } from "@/lib/api-client";
import {
  APPLIANCE_LABELS,
  APPLIANCE_TYPES,
  type ApplianceType,
  bookingInputSchema,
  type BookingInput,
} from "@/lib/validations/booking";
import { useBookingDialogStore } from "@/store/useBookingDialogStore";
import { useBookingStore } from "@/store/useBookingStore";

type FormValues = BookingInput;

export function BookingDialog({ phone }: { phone: string }) {
  const { open, setOpen, appliance } = useBookingDialogStore();
  const draft = useBookingStore((s) => s.draft);
  const setField = useBookingStore((s) => s.setField);
  const resetDraft = useBookingStore((s) => s.reset);
  const create = useCreateBooking();
  const isMobile = useIsMobile();

  const form = useForm<FormValues>({
    resolver: zodResolver(bookingInputSchema),
    defaultValues: {
      name: draft.name,
      phone: draft.phone,
      appliance:
        (appliance as ApplianceType | undefined) ?? (draft.appliance || "ac"),
      address: draft.address,
      message: draft.message,
      preferredDate: draft.preferredDate || undefined,
    },
  });

  // persist the draft (Zustand + localStorage) when the dialog closes so input isn't lost
  const handleOpenChange = (next: boolean) => {
    if (!next) {
      const v = form.getValues();
      setField("name", v.name ?? "");
      setField("phone", v.phone ?? "");
      setField("appliance", (v.appliance as ApplianceType | undefined) ?? "");
      setField("address", v.address ?? "");
      setField("message", v.message ?? "");
    }
    setOpen(next);
  };

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await create.mutateAsync(values);
      toast.success("Booking received!", {
        description: `We'll call you on ${values.phone} shortly to confirm.`,
      });
      resetDraft();
      form.reset({
        name: "",
        phone: "",
        appliance: "ac",
        address: "",
        message: "",
      });
      setOpen(false);
    } catch (err) {
      if (err instanceof ApiError && err.fields) {
        for (const [k, msg] of Object.entries(err.fields)) {
          form.setError(k as keyof FormValues, { message: msg });
        }
      }
      toast.error(
        err instanceof Error ? err.message : "Could not submit booking",
        {
          description: `You can also call us directly on ${phone}.`,
        },
      );
    }
  });

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side={isMobile ? "bottom" : "right"}
        className="site gap-0 p-0 sm:max-w-lg data-[side=bottom]:max-h-[85vh]"
      >
        <form
          onSubmit={onSubmit}
          noValidate
          className="flex h-full flex-col overflow-hidden"
        >
          <SheetHeader className="border-b border-(--line) px-6 py-5">
            <SheetTitle>Book a Service</SheetTitle>
            <SheetDescription>
              Tell us about the appliance and we&apos;ll call back to confirm a
              same-day visit.
            </SheetDescription>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto px-6 py-4">
            <FieldGroup>
              <div className="grid gap-4 sm:grid-cols-2">
                <Controller
                  control={form.control}
                  name="name"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="bk-name">Your name</FieldLabel>
                      <Input
                        id="bk-name"
                        placeholder="Full name"
                        autoComplete="name"
                        {...field}
                      />
                      <FieldError
                        errors={
                          fieldState.error ? [fieldState.error] : undefined
                        }
                      />
                    </Field>
                  )}
                />
                <Controller
                  control={form.control}
                  name="phone"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="bk-phone">Mobile number</FieldLabel>
                      <Input
                        id="bk-phone"
                        inputMode="numeric"
                        placeholder="10-digit mobile"
                        autoComplete="tel"
                        {...field}
                      />
                      <FieldError
                        errors={
                          fieldState.error ? [fieldState.error] : undefined
                        }
                      />
                    </Field>
                  )}
                />
              </div>
              <Controller
                control={form.control}
                name="appliance"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="bk-appliance">Appliance</FieldLabel>
                    <Select
                      value={field.value}
                      onValueChange={(v) => field.onChange(v)}
                    >
                      <SelectTrigger id="bk-appliance" className="w-full">
                        <SelectValue placeholder="Select appliance" />
                      </SelectTrigger>
                      <SelectContent>
                        {APPLIANCE_TYPES.map((a) => (
                          <SelectItem key={a} value={a}>
                            {APPLIANCE_LABELS[a]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FieldError
                      errors={fieldState.error ? [fieldState.error] : undefined}
                    />
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="address"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="bk-address">Address / area</FieldLabel>
                    <Input
                      id="bk-address"
                      placeholder="e.g. Salt Lake, Sector V"
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
                name="message"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="bk-message">
                      Problem description (optional)
                    </FieldLabel>
                    <Textarea
                      id="bk-message"
                      rows={3}
                      placeholder="e.g. AC not cooling, water leakage"
                      {...field}
                      value={field.value ?? ""}
                    />
                    <FieldError
                      errors={fieldState.error ? [fieldState.error] : undefined}
                    />
                  </Field>
                )}
              />
            </FieldGroup>
          </div>
          <SheetFooter className="flex-row justify-end gap-2 border-t border-(--line)">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="copper" disabled={create.isPending}>
              {create.isPending ? "Sending…" : "📅 Confirm Booking"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
