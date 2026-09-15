"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { XIcon } from "lucide-react";
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
import { cn } from "@/lib/utils";
import {
  contactInputSchema,
  type ContactInput,
} from "@/lib/validations/contact";

type FormValues = ContactInput;

// bg-neutral-* (not bg-muted): site.css redefines --muted for its own mockup text color,
// which collides with the shadcn --muted design token used by the bg-muted/text-muted utilities.
const FIELD_CLASS =
  "h-12 rounded-lg border-transparent bg-neutral-100 px-4 dark:bg-neutral-800";
const TEXTAREA_CLASS =
  "field-sizing-fixed h-[120px] resize-y rounded-lg border-transparent bg-neutral-100 p-4 dark:bg-neutral-800";

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
      defaultOpen
      onOpenChange={(next) => {
        if (!next) {
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
              className="absolute top-4 right-4"
            />
          }
        >
          <XIcon />
          <span className="sr-only">Close</span>
        </DialogClose>
        <DialogHeader className="gap-2 px-6 pt-6 pb-4">
          <DialogTitle className="font-heading text-xl">
            Get In Touch
          </DialogTitle>
          <DialogDescription>
            Send us a message and we&apos;ll get back to you shortly.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} noValidate>
          <FieldGroup className="px-6 pb-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <Controller
                control={form.control}
                name="firstName"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Input
                      id="ct-first-name"
                      aria-label="First name"
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
                control={form.control}
                name="lastName"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Input
                      id="ct-last-name"
                      aria-label="Last name"
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
            <Controller
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    id="ct-email"
                    type="email"
                    aria-label="Email ID"
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
              control={form.control}
              name="phone"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center gap-2 pl-4 text-sm font-medium text-neutral-500 dark:text-neutral-400">
                      +91
                      <span className="h-5 w-px bg-neutral-300 dark:bg-neutral-600" />
                    </span>
                    <Input
                      id="ct-phone"
                      inputMode="numeric"
                      aria-label="Phone"
                      placeholder="10-digit mobile"
                      autoComplete="tel"
                      maxLength={10}
                      className={cn(FIELD_CLASS, "pl-16")}
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
            <Controller
              control={form.control}
              name="subject"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    id="ct-subject"
                    aria-label="Subject"
                    placeholder="What is this about?"
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
              control={form.control}
              name="message"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Textarea
                    id="ct-message"
                    aria-label="Message"
                    placeholder="How can we help?"
                    className={TEXTAREA_CLASS}
                    {...field}
                  />
                  <FieldError
                    errors={fieldState.error ? [fieldState.error] : undefined}
                  />
                </Field>
              )}
            />
          </FieldGroup>
          <DialogFooter className="mx-0 mb-0 gap-2 rounded-none border-t bg-transparent px-6 py-4">
            <DialogClose render={<Button type="button" variant="outline" />}>
              Cancel
            </DialogClose>
            <Button type="submit" variant="copper" disabled={create.isPending}>
              {create.isPending ? "Sending…" : "Send"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
