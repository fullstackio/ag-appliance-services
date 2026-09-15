"use client";

import { useEffect, useMemo } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { City, Country, State } from "country-state-city";
import { XIcon } from "lucide-react";
import {
  Controller,
  type Control,
  useForm,
  type UseFormSetValue,
  useWatch,
} from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
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
import { Textarea } from "@/components/ui/textarea";
import { useCreateBooking } from "@/hooks/use-bookings";
import { useIsMobile } from "@/hooks/use-mobile";
import { ApiError } from "@/lib/api-client";
import { cn } from "@/lib/utils";
import {
  APPLIANCE_LABELS,
  APPLIANCE_TYPES,
  type ApplianceType,
  bookingInputSchema,
  type BookingInput,
} from "@/lib/validations/booking";
import type { IconKey } from "@/lib/validations/content";
import { useBookingDialogStore } from "@/store/useBookingDialogStore";
import { useBookingStore } from "@/store/useBookingStore";

import { Icon } from "./icons";

type FormValues = BookingInput;

const APPLIANCE_ICON: Record<ApplianceType, IconKey> = {
  ac: "ac",
  refrigerator: "fridge",
  geyser: "geyser",
  microwave: "microwave",
  "mixer-grinder": "mixer",
  induction: "induction",
  "pcb-electrical": "pcb",
  other: "tool",
};

const FIELD_CLASS =
  "h-12 rounded-xl border-transparent bg-neutral-100 px-4.5 dark:bg-neutral-800";

const emptyFormValues: FormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  appliance: "ac",
  company: "",
  country: "IN",
  state: "",
  city: "",
  zipCode: "",
  address: "",
  landmark: "",
  message: "",
};

/** Small line icon matched 1:1 to the site's `.ic` look (stroke, no fill) without relying on
 * the `.site .ic` CSS specificity, which a plain Tailwind size override can't win against. */
function FieldIcon({ name, className }: { name: IconKey; className?: string }) {
  return (
    <Icon
      name={name}
      className={cn("size-3.5 shrink-0", className)}
      style={{
        stroke: "currentColor",
        fill: "none",
        strokeWidth: 2,
        strokeLinecap: "round",
        strokeLinejoin: "round",
      }}
    />
  );
}

function SectionHeading({ step, title }: { step: number; title: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="from-brand-copper2 to-brand-copper flex size-5 shrink-0 items-center justify-center rounded-full bg-linear-135 text-[11px] font-bold text-white">
        {step}
      </span>
      <h3 className="text-foreground text-[13px] font-semibold tracking-wide uppercase">
        {title}
      </h3>
    </div>
  );
}

function OptionalTag() {
  return (
    <span className="text-muted-foreground/70 ml-auto text-[11px] font-normal normal-case">
      optional
    </span>
  );
}

function ContactFields({ control }: { control: Control<FormValues> }) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <Controller
          control={control}
          name="firstName"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor="bk-first-name"
                className="text-muted-foreground gap-1.5 text-xs font-semibold tracking-wide uppercase"
              >
                <FieldIcon name="user" className="text-brand-copper" />
                First name
              </FieldLabel>
              <Input
                id="bk-first-name"
                placeholder="First name"
                autoComplete="given-name"
                className={FIELD_CLASS}
                {...field}
              />
              <FieldError
                errors={fieldState.error ? [fieldState.error] : undefined}
              />
            </Field>
          )}
        />
        <Controller
          control={control}
          name="lastName"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor="bk-last-name"
                className="text-muted-foreground gap-1.5 text-xs font-semibold tracking-wide uppercase"
              >
                <FieldIcon name="user" className="text-brand-copper" />
                Last name
              </FieldLabel>
              <Input
                id="bk-last-name"
                placeholder="Last name"
                autoComplete="family-name"
                className={FIELD_CLASS}
                {...field}
              />
              <FieldError
                errors={fieldState.error ? [fieldState.error] : undefined}
              />
            </Field>
          )}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor="bk-email"
                className="text-muted-foreground gap-1.5 text-xs font-semibold tracking-wide uppercase"
              >
                <FieldIcon name="mail" className="text-brand-copper" />
                Email ID
              </FieldLabel>
              <Input
                id="bk-email"
                type="email"
                inputMode="email"
                placeholder="you@example.com"
                autoComplete="email"
                className={FIELD_CLASS}
                {...field}
              />
              <FieldError
                errors={fieldState.error ? [fieldState.error] : undefined}
              />
            </Field>
          )}
        />
        <Controller
          control={control}
          name="phone"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor="bk-phone"
                className="text-muted-foreground gap-1.5 text-xs font-semibold tracking-wide uppercase"
              >
                <FieldIcon name="phone" className="text-brand-copper" />
                Mobile number
              </FieldLabel>
              <Input
                id="bk-phone"
                inputMode="numeric"
                placeholder="10-digit mobile"
                autoComplete="tel"
                className={FIELD_CLASS}
                {...field}
              />
              <FieldError
                errors={fieldState.error ? [fieldState.error] : undefined}
              />
            </Field>
          )}
        />
      </div>
      <Controller
        control={control}
        name="company"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel
              htmlFor="bk-company"
              className="text-muted-foreground gap-1.5 text-xs font-semibold tracking-wide uppercase"
            >
              <FieldIcon name="building" className="text-brand-copper" />
              Company
              <OptionalTag />
            </FieldLabel>
            <Input
              id="bk-company"
              placeholder="Company name"
              autoComplete="organization"
              className={FIELD_CLASS}
              {...field}
              value={field.value ?? ""}
            />
            <FieldError
              errors={fieldState.error ? [fieldState.error] : undefined}
            />
          </Field>
        )}
      />
    </>
  );
}

function ServiceFields({ control }: { control: Control<FormValues> }) {
  return (
    <>
      <Controller
        control={control}
        name="appliance"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel
              htmlFor="bk-appliance"
              className="text-muted-foreground gap-1.5 text-xs font-semibold tracking-wide uppercase"
            >
              <FieldIcon
                name={APPLIANCE_ICON[field.value as ApplianceType] ?? "tool"}
                className="text-brand-copper"
              />
              Service type
            </FieldLabel>
            <Select
              value={field.value}
              onValueChange={(v) => field.onChange(v)}
            >
              <SelectTrigger
                id="bk-appliance"
                className={cn(FIELD_CLASS, "w-full")}
              >
                <SelectValue placeholder="Select service type" />
              </SelectTrigger>
              <SelectContent>
                {APPLIANCE_TYPES.map((a) => (
                  <SelectItem key={a} value={a}>
                    <FieldIcon
                      name={APPLIANCE_ICON[a]}
                      className="text-muted-foreground"
                    />
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
        control={control}
        name="message"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel
              htmlFor="bk-message"
              className="text-muted-foreground gap-1.5 text-xs font-semibold tracking-wide uppercase"
            >
              <FieldIcon name="list" className="text-brand-copper" />
              Problem description
              <OptionalTag />
            </FieldLabel>
            <Textarea
              id="bk-message"
              rows={3}
              placeholder="e.g. AC not cooling, water leakage"
              className="rounded-xl border-transparent bg-neutral-100 p-4.5 dark:bg-neutral-800"
              {...field}
              value={field.value ?? ""}
            />
            <FieldError
              errors={fieldState.error ? [fieldState.error] : undefined}
            />
          </Field>
        )}
      />
    </>
  );
}

function AddressFields({
  control,
  setValue,
}: {
  control: Control<FormValues>;
  setValue: UseFormSetValue<FormValues>;
}) {
  const country = useWatch({ control, name: "country" });
  const state = useWatch({ control, name: "state" });

  const countries = useMemo(
    () =>
      Country.getAllCountries().sort((a, b) => a.name.localeCompare(b.name)),
    [],
  );
  const states = useMemo(
    () =>
      (country ? State.getStatesOfCountry(country) : []).sort((a, b) =>
        a.name.localeCompare(b.name),
      ),
    [country],
  );
  const cities = useMemo(
    () =>
      (country && state ? City.getCitiesOfState(country, state) : []).sort(
        (a, b) => a.name.localeCompare(b.name),
      ),
    [country, state],
  );

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <Controller
          control={control}
          name="country"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor="bk-country"
                className="text-muted-foreground gap-1.5 text-xs font-semibold tracking-wide uppercase"
              >
                <FieldIcon name="globe" className="text-brand-copper" />
                Country
              </FieldLabel>
              <Select
                value={field.value}
                onValueChange={(v) => {
                  field.onChange(v);
                  setValue("state", "");
                  setValue("city", "");
                }}
              >
                <SelectTrigger
                  id="bk-country"
                  className={cn(FIELD_CLASS, "w-full")}
                >
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((c) => (
                    <SelectItem key={c.isoCode} value={c.isoCode}>
                      {c.name}
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
          control={control}
          name="state"
          render={({ field, fieldState }) =>
            country && states.length === 0 ? (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="bk-state"
                  className="text-muted-foreground gap-1.5 text-xs font-semibold tracking-wide uppercase"
                >
                  <FieldIcon name="pin" className="text-brand-copper" />
                  State / region
                </FieldLabel>
                <Input
                  id="bk-state"
                  placeholder="State / region"
                  className={FIELD_CLASS}
                  {...field}
                />
                <FieldError
                  errors={fieldState.error ? [fieldState.error] : undefined}
                />
              </Field>
            ) : (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="bk-state"
                  className="text-muted-foreground gap-1.5 text-xs font-semibold tracking-wide uppercase"
                >
                  <FieldIcon name="pin" className="text-brand-copper" />
                  State
                </FieldLabel>
                <Select
                  value={field.value}
                  disabled={!country}
                  onValueChange={(v) => {
                    field.onChange(v);
                    setValue("city", "");
                  }}
                >
                  <SelectTrigger
                    id="bk-state"
                    className={cn(FIELD_CLASS, "w-full")}
                  >
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((s) => (
                      <SelectItem key={s.isoCode} value={s.isoCode}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError
                  errors={fieldState.error ? [fieldState.error] : undefined}
                />
              </Field>
            )
          }
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Controller
          control={control}
          name="city"
          render={({ field, fieldState }) =>
            state && cities.length === 0 ? (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="bk-city"
                  className="text-muted-foreground gap-1.5 text-xs font-semibold tracking-wide uppercase"
                >
                  <FieldIcon name="pin" className="text-brand-copper" />
                  City
                </FieldLabel>
                <Input
                  id="bk-city"
                  placeholder="City"
                  className={FIELD_CLASS}
                  {...field}
                />
                <FieldError
                  errors={fieldState.error ? [fieldState.error] : undefined}
                />
              </Field>
            ) : (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="bk-city"
                  className="text-muted-foreground gap-1.5 text-xs font-semibold tracking-wide uppercase"
                >
                  <FieldIcon name="pin" className="text-brand-copper" />
                  City
                </FieldLabel>
                <Select
                  value={field.value}
                  disabled={!state}
                  onValueChange={(v) => field.onChange(v)}
                >
                  <SelectTrigger
                    id="bk-city"
                    className={cn(FIELD_CLASS, "w-full")}
                  >
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((c) => (
                      <SelectItem key={c.name} value={c.name}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError
                  errors={fieldState.error ? [fieldState.error] : undefined}
                />
              </Field>
            )
          }
        />
        <Controller
          control={control}
          name="zipCode"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor="bk-zip"
                className="text-muted-foreground gap-1.5 text-xs font-semibold tracking-wide uppercase"
              >
                <FieldIcon name="hash" className="text-brand-copper" />
                Zip code
              </FieldLabel>
              <Input
                id="bk-zip"
                placeholder="e.g. 700001"
                autoComplete="postal-code"
                className={FIELD_CLASS}
                {...field}
              />
              <FieldError
                errors={fieldState.error ? [fieldState.error] : undefined}
              />
            </Field>
          )}
        />
      </div>
      <Controller
        control={control}
        name="address"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel
              htmlFor="bk-address"
              className="text-muted-foreground gap-1.5 text-xs font-semibold tracking-wide uppercase"
            >
              <FieldIcon name="pin" className="text-brand-copper" />
              Address
            </FieldLabel>
            <Input
              id="bk-address"
              placeholder="House / street, e.g. Salt Lake, Sector V"
              className={FIELD_CLASS}
              {...field}
            />
            <FieldError
              errors={fieldState.error ? [fieldState.error] : undefined}
            />
          </Field>
        )}
      />
      <Controller
        control={control}
        name="landmark"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel
              htmlFor="bk-landmark"
              className="text-muted-foreground gap-1.5 text-xs font-semibold tracking-wide uppercase"
            >
              <FieldIcon name="pin" className="text-brand-copper" />
              Landmark
              <OptionalTag />
            </FieldLabel>
            <Input
              id="bk-landmark"
              placeholder="e.g. Near City Mall"
              className={FIELD_CLASS}
              {...field}
              value={field.value ?? ""}
            />
            <FieldError
              errors={fieldState.error ? [fieldState.error] : undefined}
            />
          </Field>
        )}
      />
    </>
  );
}

export function BookingDialog({ phone }: { phone: string }) {
  const { open, setOpen, appliance } = useBookingDialogStore();
  const draft = useBookingStore((s) => s.draft);
  const setField = useBookingStore((s) => s.setField);
  const resetDraft = useBookingStore((s) => s.reset);
  const create = useCreateBooking();
  // below lg: full-width bottom drawer (phones and tablets alike); lg+: right-side drawer
  const isCompact = useIsMobile(1024);

  const form = useForm<FormValues>({
    resolver: zodResolver(bookingInputSchema),
    defaultValues: {
      firstName: draft.firstName,
      lastName: draft.lastName,
      email: draft.email,
      phone: draft.phone,
      appliance:
        (appliance as ApplianceType | undefined) ?? (draft.appliance || "ac"),
      company: draft.company,
      country: draft.country || "IN",
      state: draft.state,
      city: draft.city,
      zipCode: draft.zipCode,
      address: draft.address,
      landmark: draft.landmark,
      message: draft.message,
      preferredDate: draft.preferredDate || undefined,
    },
  });

  // the form mounts once; re-sync the appliance field whenever a service card
  // re-opens the (already-mounted) dialog with a different pre-selected appliance
  useEffect(() => {
    if (open && appliance) {
      form.setValue("appliance", appliance as ApplianceType);
    }
  }, [open, appliance, form]);

  // persist the draft (Zustand + localStorage) when the dialog closes so input isn't lost
  const handleOpenChange = (next: boolean) => {
    if (!next) {
      const v = form.getValues();
      setField("firstName", v.firstName ?? "");
      setField("lastName", v.lastName ?? "");
      setField("email", v.email ?? "");
      setField("phone", v.phone ?? "");
      setField("appliance", (v.appliance as ApplianceType | undefined) ?? "");
      setField("company", v.company ?? "");
      setField("country", v.country ?? "");
      setField("state", v.state ?? "");
      setField("city", v.city ?? "");
      setField("zipCode", v.zipCode ?? "");
      setField("address", v.address ?? "");
      setField("landmark", v.landmark ?? "");
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
      form.reset(emptyFormValues);
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
    <Drawer
      open={open}
      onOpenChange={handleOpenChange}
      swipeDirection={isCompact ? "down" : "right"}
      showSwipeHandle={isCompact}
    >
      <DrawerContent className="gap-0 p-0 data-[swipe-direction=down]:rounded-t-3xl data-[swipe-axis=x]:sm:[--drawer-content-width:44rem] data-[swipe-axis=y]:[--drawer-content-max-height:94dvh] group-data-[swipe-axis=y]/drawer-popup:text-left">
        <form
          onSubmit={onSubmit}
          noValidate
          className="site flex h-full flex-col overflow-hidden"
          style={{ background: "transparent" }}
        >
          <div className="from-brand-copper via-brand-copper2 to-brand-gold h-1 shrink-0 bg-linear-to-r" />
          <DrawerHeader className="border-(--line) from-brand-cream/70 dark:from-brand-ink2/50 flex-row items-center gap-5 border-b bg-linear-to-b to-transparent px-6 py-6">
            <span className="from-brand-copper2 to-brand-copper flex size-12 shrink-0 items-center justify-center rounded-2xl bg-linear-135 text-white shadow-[0_8px_20px_rgba(184,113,47,.35)]">
              <FieldIcon name="tool" className="size-5" />
            </span>
            <div className="flex flex-1 flex-col gap-1">
              <DrawerTitle className="text-lg">Book a Service</DrawerTitle>
              <DrawerDescription>
                Tell us about the appliance and we&apos;ll call back to confirm
                a same-day visit.
              </DrawerDescription>
            </div>
            <DrawerClose
              render={
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className="shrink-0 self-start"
                />
              }
            >
              <XIcon />
              <span className="sr-only">Close</span>
            </DrawerClose>
          </DrawerHeader>
          <div className="flex-1 overflow-y-auto px-5! py-6! sm:px-8 sm:py-8">
            <FieldGroup>
              <div className="flex flex-col gap-4">
                <SectionHeading step={1} title="Your details" />
                <ContactFields control={form.control} />
              </div>

              <div className="border-(--line) flex flex-col gap-4 border-t pt-8!">
                <SectionHeading step={2} title="Service details" />
                <ServiceFields control={form.control} />
              </div>

              <div className="border-(--line) flex flex-col gap-4 border-t pt-8!">
                <SectionHeading step={3} title="Address" />
                <AddressFields
                  control={form.control}
                  setValue={form.setValue}
                />
              </div>
            </FieldGroup>
          </div>
          <DrawerFooter className="border-(--line) bg-popover/95 flex-row justify-end gap-2 border-t px-6 py-4 backdrop-blur-sm">
            <Button
              type="button"
              variant="outline"
              className="h-12 flex-1 rounded-xl px-6 sm:flex-none"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="copper"
              className="h-12 flex-1 rounded-xl px-6 sm:flex-none"
              disabled={create.isPending}
            >
              {create.isPending ? "Sending…" : "📅 Confirm Booking"}
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
