"use client";

import { useState } from "react";

import { Save } from "lucide-react";
import { toast } from "sonner";

import { ImageField } from "@/components/dashboard/image-field";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useSaveSettings, useSettings } from "@/hooks/use-admin";
import { ApiError } from "@/lib/api-client";
import { type SiteSettings, siteSettingsSchema } from "@/lib/validations/content";

type TextKey = Exclude<keyof SiteSettings, "social" | "logo" | "footerAbout" | "seoDescription">;

const GROUPS: Array<{ title: string; fields: Array<[TextKey, string]> }> = [
  {
    title: "Business",
    fields: [
      ["businessName", "Business name"],
      ["brandLine1", "Logo text line 1"],
      ["brandLine2", "Logo text line 2"],
      ["tagline", "Tagline"],
      ["since", "Since (year)"],
    ],
  },
  {
    title: "Contact",
    fields: [
      ["phone", "Phone (10 digits)"],
      ["whatsapp", "WhatsApp number (with country code, e.g. 91…)"],
      ["email", "Email"],
      ["address", "Address"],
      ["hours", "Working hours"],
      ["googleBusinessUrl", "Google Business Profile URL"],
    ],
  },
  {
    title: "Footer & SEO",
    fields: [
      ["copyright", "Copyright line (year is added automatically)"],
      ["legalText", "Legal links text"],
      ["seoTitle", "Browser / SEO title"],
    ],
  },
];

export function SettingsForm() {
  const { data, isLoading } = useSettings();
  const save = useSaveSettings();
  const [edited, setD] = useState<SiteSettings | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const d = edited ?? data ?? null;

  if (isLoading || !d) {
    return <Skeleton className="h-64 w-full" />;
  }
  const set = <K extends keyof SiteSettings>(k: K, v: SiteSettings[K]) => setD({ ...d, [k]: v });

  const onSave = async () => {
    const parsed = siteSettingsSchema.safeParse(d);
    if (!parsed.success) {
      const map: Record<string, string> = {};
      for (const i of parsed.error.issues) {
        map[i.path.join(".")] = i.message;
      }
      setErrors(map);
      toast.error("Please fix the highlighted fields");
      return;
    }
    setErrors({});
    try {
      await save.mutateAsync(parsed.data);
      setD(null);
      toast.success("Settings saved — website updated");
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Save failed");
    }
  };

  return (
    <div className="space-y-6">
      {GROUPS.map((g) => (
        <Card key={g.title}>
          <CardHeader>
            <CardTitle className="text-base">{g.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <div className="grid gap-4 sm:grid-cols-2">
                {g.fields.map(([k, label]) => (
                  <Field key={k}>
                    <FieldLabel htmlFor={`s-${k}`}>{label}</FieldLabel>
                    <Input
                      id={`s-${k}`}
                      value={d[k]}
                      onChange={(e) => set(k, e.target.value)}
                      aria-invalid={Boolean(errors[k])}
                    />
                    {errors[k] ? <p className="text-destructive text-xs">{errors[k]}</p> : null}
                  </Field>
                ))}
              </div>
            </FieldGroup>
          </CardContent>
        </Card>
      ))}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Logo, about & social</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="s-logo">Logo</FieldLabel>
              <ImageField
                id="s-logo"
                value={d.logo}
                onChange={(v) => set("logo", v)}
                aspect="aspect-square"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="s-about">Footer about text</FieldLabel>
              <Textarea
                id="s-about"
                rows={3}
                value={d.footerAbout}
                onChange={(e) => set("footerAbout", e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="s-seo">SEO description</FieldLabel>
              <Textarea
                id="s-seo"
                rows={2}
                value={d.seoDescription}
                onChange={(e) => set("seoDescription", e.target.value)}
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              {(["facebook", "instagram", "whatsapp", "google"] as const).map((k) => (
                <Field key={k}>
                  <FieldLabel htmlFor={`s-social-${k}`} className="capitalize">
                    {k} URL
                  </FieldLabel>
                  <Input
                    id={`s-social-${k}`}
                    value={d.social[k]}
                    onChange={(e) => set("social", { ...d.social, [k]: e.target.value })}
                  />
                </Field>
              ))}
            </div>
          </FieldGroup>
        </CardContent>
      </Card>

      <div className="bg-background/90 sticky bottom-0 flex justify-end border-t py-3 backdrop-blur">
        <Button variant="copper" disabled={save.isPending} onClick={() => void onSave()}>
          <Save /> {save.isPending ? "Saving…" : "Save & publish"}
        </Button>
      </div>
    </div>
  );
}
