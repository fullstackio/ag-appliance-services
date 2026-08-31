"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Icon } from "@/components/site/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateContact } from "@/hooks/use-contact";
import { ApiError } from "@/lib/api-client";
import {
  contactInputSchema,
  type ContactInput,
} from "@/lib/validations/contact";

type FormValues = ContactInput;

/** "Get In Touch" nav CTA — opens a generic contact modal. */
export function ContactDialog() {
  const create = useCreateContact();
  const form = useForm<FormValues>({
    resolver: zodResolver(contactInputSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      comment: "",
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
      <DialogContent className="z-70 sm:max-w-lg">
        <div className="site flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>Get In Touch</DialogTitle>
            <DialogDescription>
              Send us a message and we&apos;ll get back to you shortly.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit} noValidate>
            <FieldGroup>
              <div className="grid gap-4 sm:grid-cols-2">
                <Controller
                  control={form.control}
                  name="firstName"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="ct-first-name">
                        First name
                      </FieldLabel>
                      <Input
                        id="ct-first-name"
                        placeholder="First name"
                        autoComplete="given-name"
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
                  name="lastName"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="ct-last-name">Last name</FieldLabel>
                      <Input
                        id="ct-last-name"
                        placeholder="Last name"
                        autoComplete="family-name"
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
                name="email"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="ct-email">Email ID</FieldLabel>
                    <Input
                      id="ct-email"
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
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
                    <FieldLabel htmlFor="ct-phone">Phone</FieldLabel>
                    <Input
                      id="ct-phone"
                      inputMode="numeric"
                      placeholder="10-digit mobile"
                      autoComplete="tel"
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
                name="comment"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="ct-comment">Comment</FieldLabel>
                    <Textarea
                      id="ct-comment"
                      rows={3}
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
              <Button
                type="submit"
                variant="copper"
                disabled={create.isPending}
              >
                {create.isPending ? "Sending…" : "Send"}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
