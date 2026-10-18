"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, XIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Icon } from "@/components/site/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateContact } from "@/hooks/use-contact";
import { ApiError } from "@/lib/api-client";
import { touchedError } from "@/lib/form-utils";
import { cn } from "@/lib/utils";
import {
  contactInputSchema,
  type ContactInput,
} from "@/lib/validations/contact";

type FormValues = ContactInput;

// bg-neutral-* (not bg-muted): site.css redefines --muted for its own mockup text color,
// which collides with the shadcn --muted design token used by the bg-muted/text-muted utilities.
const FIELD_CLASS =
  "h-10 rounded-lg border-transparent bg-neutral-100 px-3 text-sm sm:h-12 sm:px-4 sm:text-base dark:bg-neutral-800";
const TEXTAREA_CLASS =
  "field-sizing-fixed h-[80px] resize-y rounded-lg border-transparent bg-neutral-100 p-3 text-sm sm:h-[120px] sm:p-4 sm:text-base dark:bg-neutral-800";

/** "Get In Touch" nav CTA — opens a generic contact modal. */
export function ContactDialog() {
  const create = useCreateContact();
  const form = useForm<FormValues>({
    resolver: zodResolver(contactInputSchema),
    mode: "onTouched",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await create.mutateAsync(values);
      toast.success("Message sent!", {
        description: "We'll get back to you shortly.",
      });
      form.reset();
    } catch (err) {
      if (err instanceof ApiError && err.fields) {
        for (const [k, msg] of Object.entries(err.fields)) {
          form.setError(k as keyof FormValues, { message: msg });
        }
      }
      toast.error(
        err instanceof Error ? err.message : "Could not send message",
      );
    }
  });

  return (
    <Dialog
      onOpenChange={(next) => {
        if (next) {
          // compute validity as soon as the dialog opens, so the submit button
          // starts disabled instead of waiting for the first field blur
          void form.trigger();
        } else {
          form.reset();
        }
      }}
    >
      <DialogTrigger
        render={
          <Button variant="ink" size="site" className="nav-contact-btn">
            <Icon name="phone" /> Get In Touch
          </Button>
        }
      />
      <DialogContent
        className="z-70 gap-0 overflow-hidden p-0 sm:max-w-lg"
        showCloseButton={false}
      >
        <DialogClose
          render={
            <Button
              variant="ghost"
              size="icon-sm"
              className="absolute top-3 right-3 sm:top-4 sm:right-4"
            />
          }
        >
          <XIcon />
          <span className="sr-only">Close</span>
        </DialogClose>
        <DialogHeader className="gap-1 px-4 pt-4 pb-3 sm:gap-2 sm:px-6 sm:pt-6 sm:pb-4">
          <DialogTitle className="font-heading text-lg sm:text-xl">
            Get In Touch
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            Send us a message and we&apos;ll get back to you shortly.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} noValidate>
          <FieldGroup className="gap-3 px-4 pb-4 sm:gap-4 sm:px-6 sm:pb-6">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <Controller
                control={form.control}
                name="firstName"
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.isTouched && fieldState.invalid}
                  >
                    <Input
                      id="ct-first-name"
                      aria-label="First name"
                      placeholder="First name"
                      autoComplete="given-name"
                      className={FIELD_CLASS}
                      {...field}
                    />
                    <FieldError errors={touchedError(fieldState)} />
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="lastName"
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.isTouched && fieldState.invalid}
                  >
                    <Input
                      id="ct-last-name"
                      aria-label="Last name"
                      placeholder="Last name"
                      autoComplete="family-name"
                      className={FIELD_CLASS}
                      {...field}
                    />
                    <FieldError errors={touchedError(fieldState)} />
                  </Field>
                )}
              />
            </div>
            <Controller
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.isTouched && fieldState.invalid}
                >
                  <Input
                    id="ct-email"
                    type="email"
                    aria-label="Email ID"
                    placeholder="you@example.com"
                    autoComplete="email"
                    className={FIELD_CLASS}
                    {...field}
                  />
                  <FieldError errors={touchedError(fieldState)} />
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="phone"
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.isTouched && fieldState.invalid}
                >
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center gap-1.5 pl-3 text-xs font-medium text-neutral-500 sm:gap-2 sm:pl-4 sm:text-sm dark:text-neutral-400">
                      +91
                      <span className="h-4 w-px bg-neutral-300 sm:h-5 dark:bg-neutral-600" />
                    </span>
                    <Input
                      id="ct-phone"
                      inputMode="numeric"
                      aria-label="Phone"
                      placeholder="10-digit mobile"
                      autoComplete="tel"
                      maxLength={10}
                      className={cn(FIELD_CLASS, "pl-12 sm:pl-16")}
                      {...field}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value.replace(/\D/g, "").slice(0, 10),
                        )
                      }
                    />
                  </div>
                  <FieldError errors={touchedError(fieldState)} />
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="subject"
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.isTouched && fieldState.invalid}
                >
                  <Input
                    id="ct-subject"
                    aria-label="Subject"
                    placeholder="What is this about?"
                    className={FIELD_CLASS}
                    {...field}
                  />
                  <FieldError errors={touchedError(fieldState)} />
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="message"
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.isTouched && fieldState.invalid}
                >
                  <Textarea
                    id="ct-message"
                    aria-label="Message"
                    placeholder="How can we help?"
                    className={TEXTAREA_CLASS}
                    {...field}
                  />
                  <FieldError errors={touchedError(fieldState)} />
                </Field>
              )}
            />
          </FieldGroup>
          <DialogFooter className="mx-0 mb-0 flex-row justify-start gap-2 rounded-none border-t bg-transparent px-4 py-3 sm:px-6 sm:py-4">
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="outline"
                  className="h-10 flex-1 rounded-xl px-6 sm:h-12 sm:flex-none"
                />
              }
            >
              Cancel
            </DialogClose>
            <Button
              type="submit"
              variant="copper"
              className="h-10 flex-1 rounded-xl px-6 sm:h-12 sm:flex-none"
              disabled={!form.formState.isValid || create.isPending}
            >
              {create.isPending ? (
                <>
                  <Loader2 className="animate-spin" />
                  Sending…
                </>
              ) : (
                "Send"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
