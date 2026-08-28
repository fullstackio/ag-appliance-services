"use client";

import { useState } from "react";

import { ArrowDown, ArrowUp, Plus, RotateCcw, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { IconPicker } from "@/components/dashboard/icon-picker";
import { ImageField } from "@/components/dashboard/image-field";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useResetSection, useSaveSection, useSection } from "@/hooks/use-admin";
import { ApiError } from "@/lib/api-client";
import {
  GALLERY_SIZES,
  type IconKey,
  type Section,
  type SectionKey,
  sectionSchema,
} from "@/lib/validations/content";

// ---------------------------------------------------------------- field definitions per section
type FieldType = "text" | "textarea" | "icon" | "image" | "number" | "boolean" | "chips" | "select";
interface FieldDef {
  name: string;
  label: string;
  type: FieldType;
  options?: readonly string[];
  wide?: boolean;
}

const ITEM_FIELDS: Record<SectionKey, FieldDef[]> = {
  stats: [
    { name: "icon", label: "Icon", type: "icon" },
    { name: "value", label: "Value (e.g. 650+)", type: "text" },
    { name: "label", label: "Label (use a new line to break)", type: "textarea", wide: true },
  ],
  services: [
    { name: "icon", label: "Icon", type: "icon" },
    { name: "title", label: "Title", type: "text" },
    { name: "subtitle", label: "Subtitle", type: "text" },
    { name: "href", label: "Link", type: "text" },
  ],
  serviceCategories: [
    { name: "icon", label: "Icon", type: "icon" },
    { name: "title", label: "Title", type: "text" },
    { name: "chips", label: "Chips (comma separated)", type: "chips", wide: true },
  ],
  why: [
    { name: "icon", label: "Icon", type: "icon" },
    { name: "title", label: "Title", type: "text" },
    { name: "text", label: "Text", type: "textarea", wide: true },
  ],
  steps: [
    { name: "icon", label: "Icon", type: "icon" },
    { name: "title", label: "Title", type: "text" },
    { name: "text", label: "Text", type: "textarea", wide: true },
  ],
  video: [],
  testimonials: [
    { name: "name", label: "Customer name", type: "text" },
    { name: "location", label: "Location", type: "text" },
    { name: "rating", label: "Rating (1-5)", type: "number" },
    { name: "quote", label: "Quote", type: "textarea", wide: true },
  ],
  gallery: [
    { name: "image", label: "Image", type: "image", wide: true },
    { name: "chip", label: "Chip label", type: "text" },
    { name: "category", label: "Category (matches a tab)", type: "text" },
    { name: "title", label: "Title", type: "text" },
    { name: "subtitle", label: "Subtitle", type: "text" },
    { name: "size", label: "Tile size", type: "select", options: GALLERY_SIZES },
    { name: "feature", label: "Highlight (copper outline)", type: "boolean" },
  ],
  brands: [
    { name: "name", label: "Brand name", type: "text" },
    { name: "logo", label: "Logo (SVG/PNG)", type: "image", wide: true },
  ],
  areas: [{ name: "name", label: "Area name", type: "text", wide: true }],
  faqs: [
    { name: "question", label: "Question", type: "text", wide: true },
    { name: "answer", label: "Answer", type: "textarea", wide: true },
  ],
  cta: [],
};

const HAS_CTAS: SectionKey[] = ["video", "cta"];
const TOP_LABELS = {
  pill: "Pill label",
  heading: "Heading",
  headingAccent: "Heading accent (copper)",
} as const;

const SECTION_TITLES: Record<SectionKey, string> = {
  stats: "Stats bar",
  services: "Services grid",
  serviceCategories: "Service categories (dark cards)",
  why: "Why choose us",
  steps: "How it works",
  video: "Video / about banner",
  testimonials: "Testimonials",
  gallery: "Recent work gallery",
  brands: "Brands we service",
  areas: "Service areas",
  faqs: "FAQs",
  cta: "Bottom call-to-action",
};
export { SECTION_TITLES };

type AnyRecord = Record<string, unknown>;

const EMPTY_BY_TYPE: Record<FieldType, unknown> = {
  text: "",
  textarea: "",
  icon: "check",
  image: "",
  number: 5,
  boolean: false,
  chips: [],
  select: undefined,
};

function emptyItem(key: SectionKey): AnyRecord {
  const out: AnyRecord = {};
  for (const f of ITEM_FIELDS[key]) {
    out[f.name] = f.type === "select" ? f.options?.[0] : EMPTY_BY_TYPE[f.type];
  }
  return out;
}

// ---------------------------------------------------------------- generic field renderer
function FieldInput({
  def,
  value,
  onChange,
  id,
}: {
  def: FieldDef;
  value: unknown;
  onChange: (v: unknown) => void;
  id: string;
}) {
  switch (def.type) {
    case "textarea":
      return (
        <Textarea
          id={id}
          rows={3}
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    case "icon":
      return <IconPicker id={id} value={(value as IconKey) ?? "check"} onChange={onChange} />;
    case "image":
      return (
        <ImageField id={id} value={String(value ?? "")} onChange={onChange} aspect="aspect-[4/3]" />
      );
    case "number":
      return (
        <Input
          id={id}
          type="number"
          value={Number(value ?? 0)}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      );
    case "boolean":
      return <Switch id={id} checked={Boolean(value)} onCheckedChange={(c) => onChange(c)} />;
    case "chips":
      return (
        <Input
          id={id}
          value={Array.isArray(value) ? (value as string[]).join(", ") : ""}
          onChange={(e) =>
            onChange(
              e.target.value
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
            )
          }
        />
      );
    case "select":
      return (
        <Select value={String(value ?? "")} onValueChange={(v) => onChange(v)}>
          <SelectTrigger id={id} className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {def.options?.map((o) => (
              <SelectItem key={o} value={o}>
                {o}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    default:
      return (
        <Input id={id} value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} />
      );
  }
}

// ---------------------------------------------------------------- editor
export function SectionEditor({ sectionKey }: { sectionKey: SectionKey }) {
  const { data, isLoading } = useSection(sectionKey);
  const save = useSaveSection(sectionKey);
  const reset = useResetSection(sectionKey);
  const [edited, setDraft] = useState<AnyRecord | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Local edits win; otherwise show the server document. Saving/resetting clears local edits.
  const draft: AnyRecord | null = edited ?? (data ? (data as unknown as AnyRecord) : null);

  if (isLoading || !draft) {
    return <Skeleton className="h-64 w-full" />;
  }

  const items = (draft.items as AnyRecord[] | undefined) ?? [];
  const setTop = (k: string, v: unknown) => setDraft({ ...draft, [k]: v });
  const setItem = (i: number, k: string, v: unknown) =>
    setDraft({ ...draft, items: items.map((it, idx) => (idx === i ? { ...it, [k]: v } : it)) });
  const move = (i: number, dir: -1 | 1) => {
    const next = [...items];
    const j = i + dir;
    if (j < 0 || j >= next.length) {
      return;
    }
    [next[i], next[j]] = [next[j] as AnyRecord, next[i] as AnyRecord];
    setDraft({ ...draft, items: next });
  };
  const remove = (i: number) => setDraft({ ...draft, items: items.filter((_, idx) => idx !== i) });
  const add = () => setDraft({ ...draft, items: [...items, emptyItem(sectionKey)] });

  const onSave = async () => {
    const parsed = sectionSchema.safeParse({ ...draft, key: sectionKey });
    if (!parsed.success) {
      const map: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        map[issue.path.join(".")] = issue.message;
      }
      setErrors(map);
      toast.error("Please fix the highlighted fields");
      return;
    }
    setErrors({});
    try {
      await save.mutateAsync(parsed.data as Section);
      setDraft(null);
      toast.success("Section saved — website updated");
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Save failed");
    }
  };

  const onReset = async () => {
    if (
      !window.confirm("Reset this section to the approved mockup content? This cannot be undone.")
    ) {
      return;
    }
    await reset.mutateAsync();
    setDraft(null);
    toast.success("Section reset to defaults");
  };

  const itemDefs = ITEM_FIELDS[sectionKey];
  const err = (path: string) => errors[path];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="text-base">Heading</CardTitle>
          <label className="flex items-center gap-2 text-sm">
            <Switch
              checked={Boolean(draft.visible)}
              onCheckedChange={(c) => setTop("visible", c)}
            />
            Visible on site
          </label>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <div className="grid gap-4 sm:grid-cols-3">
              {(["pill", "heading", "headingAccent"] as const).map((k) => (
                <Field key={k}>
                  <FieldLabel htmlFor={`top-${k}`}>{TOP_LABELS[k]}</FieldLabel>
                  <Input
                    id={`top-${k}`}
                    value={String(draft[k] ?? "")}
                    onChange={(e) => setTop(k, e.target.value)}
                    aria-invalid={Boolean(err(k))}
                  />
                  {err(k) ? <p className="text-destructive text-xs">{err(k)}</p> : null}
                </Field>
              ))}
            </div>
            <Field>
              <FieldLabel htmlFor="top-subtitle">Subtitle / paragraph</FieldLabel>
              <Textarea
                id="top-subtitle"
                rows={2}
                value={String(draft.subtitle ?? "")}
                onChange={(e) => setTop("subtitle", e.target.value)}
              />
            </Field>
            {sectionKey === "video" ? (
              <Field>
                <FieldLabel htmlFor="top-image">Background image</FieldLabel>
                <ImageField
                  id="top-image"
                  value={String(draft.image ?? "")}
                  onChange={(v) => setTop("image", v)}
                />
              </Field>
            ) : null}
            {sectionKey === "gallery" ? (
              <Field>
                <FieldLabel htmlFor="top-tabs">
                  Filter tabs (comma separated, first is “All”)
                </FieldLabel>
                <Input
                  id="top-tabs"
                  value={((draft.tabs as string[] | undefined) ?? []).join(", ")}
                  onChange={(e) =>
                    setTop(
                      "tabs",
                      e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean)
                    )
                  }
                />
              </Field>
            ) : null}
            {HAS_CTAS.includes(sectionKey) ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {(["primaryCta", "secondaryCta"] as const).map((k) => {
                  const cta = (draft[k] as { label?: string; href?: string } | undefined) ?? {};
                  return (
                    <div key={k} className="space-y-2 rounded-md border p-3">
                      <div className="text-sm font-medium">
                        {k === "primaryCta" ? "Primary button" : "Secondary button"}
                      </div>
                      <Input
                        placeholder="Label"
                        value={cta.label ?? ""}
                        onChange={(e) => setTop(k, { ...cta, label: e.target.value })}
                      />
                      <Input
                        placeholder="Link (#book, tel:…, https://…)"
                        value={cta.href ?? ""}
                        onChange={(e) => setTop(k, { ...cta, href: e.target.value })}
                      />
                      {err(`${k}.label`) ? (
                        <p className="text-destructive text-xs">{err(`${k}.label`)}</p>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            ) : null}
          </FieldGroup>
        </CardContent>
      </Card>

      {itemDefs.length ? (
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="text-base">Items ({items.length})</CardTitle>
            <Button type="button" size="sm" variant="outline" onClick={add}>
              <Plus /> Add item
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {items.map((item, i) => (
              // eslint-disable-next-line react/no-array-index-key -- positional rows, no stable id
              <div key={i} className="bg-card relative rounded-lg border p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                    #{i + 1}
                  </span>
                  <div className="flex gap-1">
                    <Button
                      type="button"
                      size="icon-sm"
                      variant="ghost"
                      onClick={() => move(i, -1)}
                      aria-label="Move up"
                    >
                      <ArrowUp />
                    </Button>
                    <Button
                      type="button"
                      size="icon-sm"
                      variant="ghost"
                      onClick={() => move(i, 1)}
                      aria-label="Move down"
                    >
                      <ArrowDown />
                    </Button>
                    <Button
                      type="button"
                      size="icon-sm"
                      variant="destructive"
                      onClick={() => remove(i)}
                      aria-label="Remove"
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {itemDefs.map((def) => {
                    const id = `item-${i}-${def.name}`;
                    const e = err(`items.${i}.${def.name}`);
                    return (
                      <Field key={def.name} className={def.wide ? "sm:col-span-2" : undefined}>
                        <FieldLabel htmlFor={id}>{def.label}</FieldLabel>
                        <FieldInput
                          def={def}
                          id={id}
                          value={item[def.name]}
                          onChange={(v) => setItem(i, def.name, v)}
                        />
                        {e ? <p className="text-destructive text-xs">{e}</p> : null}
                      </Field>
                    );
                  })}
                </div>
              </div>
            ))}
            {!items.length ? (
              <p className="text-muted-foreground py-6 text-center text-sm">
                No items — add one above.
              </p>
            ) : null}
          </CardContent>
        </Card>
      ) : null}

      <div className="bg-background/90 sticky bottom-0 flex justify-between gap-2 border-t py-3 backdrop-blur">
        <Button
          type="button"
          variant="ghost"
          onClick={() => void onReset()}
          disabled={reset.isPending}
        >
          <RotateCcw /> Reset to mockup defaults
        </Button>
        <Button
          type="button"
          variant="copper"
          onClick={() => void onSave()}
          disabled={save.isPending}
        >
          <Save /> {save.isPending ? "Saving…" : "Save & publish"}
        </Button>
      </div>
    </div>
  );
}
