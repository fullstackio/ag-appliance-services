"use client";

import { useState } from "react";

import { Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { IconPicker } from "@/components/dashboard/icon-picker";
import { ImageField } from "@/components/dashboard/image-field";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  useBanners,
  useCreateBanner,
  useDeleteBanner,
  useUpdateBanner,
  type WithId,
} from "@/hooks/use-admin";
import { ApiError } from "@/lib/api-client";
import { defaultBanners } from "@/lib/content/defaults";
import { type Banner, bannerSchema, type IconKey } from "@/lib/validations/content";

type Draft = Banner & { _id?: string };

function BannerForm({ initial, onDone }: { initial: Draft; onDone: () => void }) {
  const [d, setD] = useState<Draft>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const create = useCreateBanner();
  const update = useUpdateBanner();
  const busy = create.isPending || update.isPending;
  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => setD({ ...d, [k]: v });

  const submit = async () => {
    const { _id, ...rest } = d;
    const parsed = bannerSchema.safeParse(rest);
    if (!parsed.success) {
      const map: Record<string, string> = {};
      for (const i of parsed.error.issues) {
        map[i.path.join(".")] = i.message;
      }
      setErrors(map);
      return;
    }
    try {
      if (_id) {
        await update.mutateAsync({ id: _id, ...parsed.data });
      } else {
        await create.mutateAsync(parsed.data);
      }
      toast.success("Banner saved — website updated");
      onDone();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Save failed");
    }
  };

  const errAt = (p: string) =>
    errors[p] ? <p className="text-destructive text-xs">{errors[p]}</p> : null;

  return (
    <>
      <FieldGroup className="max-h-[65vh] overflow-y-auto pr-1">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="b-tag">Small tag</FieldLabel>
            <Input id="b-tag" value={d.tag} onChange={(e) => set("tag", e.target.value)} />
          </Field>
          <Field>
            <FieldLabel htmlFor="b-badge">Image badge text</FieldLabel>
            <Input
              id="b-badge"
              value={d.badgeText}
              onChange={(e) => set("badgeText", e.target.value)}
            />
          </Field>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="b-heading">Heading (new line = line break)</FieldLabel>
            <Textarea
              id="b-heading"
              rows={2}
              value={d.heading}
              onChange={(e) => set("heading", e.target.value)}
            />
            {errAt("heading")}
          </Field>
          <Field>
            <FieldLabel htmlFor="b-accent">Heading accent (copper word)</FieldLabel>
            <Input
              id="b-accent"
              value={d.headingAccent}
              onChange={(e) => set("headingAccent", e.target.value)}
            />
          </Field>
        </div>
        <Field>
          <FieldLabel htmlFor="b-text">Paragraph</FieldLabel>
          <Textarea
            id="b-text"
            rows={3}
            value={d.text}
            onChange={(e) => set("text", e.target.value)}
          />
          {errAt("text")}
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 rounded-md border p-3">
            <div className="text-sm font-medium">Primary button</div>
            <Input
              placeholder="Label"
              value={d.primaryCta.label}
              onChange={(e) => set("primaryCta", { ...d.primaryCta, label: e.target.value })}
            />
            <Input
              placeholder="Link"
              value={d.primaryCta.href}
              onChange={(e) => set("primaryCta", { ...d.primaryCta, href: e.target.value })}
            />
            {errAt("primaryCta.label")}
          </div>
          <div className="space-y-2 rounded-md border p-3">
            <div className="text-sm font-medium">Secondary button</div>
            <Input
              placeholder="Label"
              value={d.secondaryCta?.label ?? ""}
              onChange={(e) =>
                set("secondaryCta", { label: e.target.value, href: d.secondaryCta?.href ?? "#" })
              }
            />
            <Input
              placeholder="Link"
              value={d.secondaryCta?.href ?? ""}
              onChange={(e) =>
                set("secondaryCta", { label: d.secondaryCta?.label ?? "", href: e.target.value })
              }
            />
          </div>
        </div>
        <Field>
          <FieldLabel htmlFor="b-image">Hero image</FieldLabel>
          <ImageField id="b-image" value={d.image} onChange={(v) => set("image", v)} />
          {errAt("image")}
        </Field>
        <div>
          <div className="mb-2 text-sm font-medium">Extra slider images (max 6)</div>
          <p className="text-muted-foreground mb-2 text-xs">
            The hero image above is slide 1; these rotate after it. Leave empty for a static image.
          </p>
          <div className="space-y-2">
            {d.images.map((img, i) => (
              // eslint-disable-next-line react/no-array-index-key -- positional rows, no stable id
              <div key={i} className="flex items-start gap-2">
                <div className="flex-1">
                  <ImageField
                    value={img}
                    onChange={(v) =>
                      set(
                        "images",
                        d.images.map((x, j) => (j === i ? v : x))
                      )
                    }
                  />
                </div>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  aria-label="Remove image"
                  onClick={() =>
                    set(
                      "images",
                      d.images.filter((_, j) => j !== i)
                    )
                  }
                >
                  <Trash2 />
                </Button>
              </div>
            ))}
          </div>
          {d.images.length < 6 ? (
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="mt-2"
              onClick={() => set("images", [...d.images, ""])}
            >
              <Plus /> Add image
            </Button>
          ) : null}
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field>
            <FieldLabel htmlFor="b-pos">Image focus (CSS object-position)</FieldLabel>
            <Input
              id="b-pos"
              value={d.imagePosition}
              onChange={(e) => set("imagePosition", e.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="b-ct">Floating card title</FieldLabel>
            <Input
              id="b-ct"
              value={d.cardTitle}
              onChange={(e) => set("cardTitle", e.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="b-cx">Floating card text</FieldLabel>
            <Input id="b-cx" value={d.cardText} onChange={(e) => set("cardText", e.target.value)} />
          </Field>
        </div>
        <div>
          <div className="mb-2 text-sm font-medium">Trust badges (max 4)</div>
          <div className="grid gap-3 sm:grid-cols-2">
            {d.trust.map((t, i) => (
              // eslint-disable-next-line react/no-array-index-key -- positional rows, no stable id
              <div key={i} className="flex gap-2">
                <div className="w-36 shrink-0">
                  <IconPicker
                    value={t.icon}
                    onChange={(v: IconKey) =>
                      set(
                        "trust",
                        d.trust.map((x, j) => (j === i ? { ...x, icon: v } : x))
                      )
                    }
                  />
                </div>
                <Input
                  value={t.label}
                  onChange={(e) =>
                    set(
                      "trust",
                      d.trust.map((x, j) => (j === i ? { ...x, label: e.target.value } : x))
                    )
                  }
                />
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  aria-label="Remove"
                  onClick={() =>
                    set(
                      "trust",
                      d.trust.filter((_, j) => j !== i)
                    )
                  }
                >
                  <Trash2 />
                </Button>
              </div>
            ))}
          </div>
          {d.trust.length < 4 ? (
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="mt-2"
              onClick={() => set("trust", [...d.trust, { icon: "check", label: "" }])}
            >
              <Plus /> Add badge
            </Button>
          ) : null}
        </div>
        <label className="flex items-center gap-2 text-sm">
          <Switch checked={d.active} onCheckedChange={(c) => set("active", c)} /> Active (shown on
          the website)
        </label>
      </FieldGroup>
      <DialogFooter className="mt-4">
        <Button type="button" variant="outline" onClick={onDone}>
          Cancel
        </Button>
        <Button type="button" variant="copper" disabled={busy} onClick={() => void submit()}>
          {busy ? "Saving…" : "Save banner"}
        </Button>
      </DialogFooter>
    </>
  );
}

export function BannersManager() {
  const { data, isLoading } = useBanners();
  const del = useDeleteBanner();
  const update = useUpdateBanner();
  const [editing, setEditing] = useState<Draft | null>(null);

  const remove = async (b: WithId<Banner>) => {
    if (!window.confirm(`Delete banner “${b.heading.replace("\n", " ")}”?`)) {
      return;
    }
    await del.mutateAsync(b._id);
    toast.success("Banner deleted");
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          variant="copper"
          onClick={() =>
            setEditing({
              ...(defaultBanners[0] as Banner),
              heading: "New banner",
              order: data?.length ?? 0,
            })
          }
        >
          <Plus /> New banner
        </Button>
      </div>
      {isLoading ? (
        <Skeleton className="h-40 w-full" />
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {data?.map((b) => (
            <Card key={b._id} className={b.active ? "" : "opacity-60"}>
              <CardContent className="flex gap-4 py-4">
                {/* eslint-disable-next-line @next/next/no-img-element -- dynamic upload path */}
                <img
                  src={b.image}
                  alt=""
                  className="h-28 w-40 shrink-0 rounded-md object-cover"
                  style={{ objectPosition: b.imagePosition }}
                />
                <div className="min-w-0 flex-1">
                  <div className="text-brand-copper text-[10px] font-semibold tracking-widest uppercase">
                    {b.tag}
                  </div>
                  <div className="truncate font-bold">
                    {b.heading.replace("\n", " ")}{" "}
                    <span className="text-brand-copper2">{b.headingAccent}</span>
                  </div>
                  <p className="text-muted-foreground line-clamp-2 text-xs">{b.text}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <label className="flex items-center gap-2 text-xs">
                      <Switch
                        checked={b.active}
                        onCheckedChange={(c) => void update.mutateAsync({ id: b._id, active: c })}
                      />
                      Active
                    </label>
                    <div className="flex-1" />
                    <Button size="sm" variant="outline" onClick={() => setEditing(b)}>
                      <Pencil /> Edit
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => void remove(b)}>
                      <Trash2 />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <p className="text-muted-foreground text-xs">
        The first active banner (by order) is shown in the hero. Keep at least one active.
      </p>

      <Dialog open={Boolean(editing)} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>{editing?._id ? "Edit banner" : "New banner"}</DialogTitle>
            <DialogDescription>
              Hero section content shown at the top of the website.
            </DialogDescription>
          </DialogHeader>
          {editing ? <BannerForm initial={editing} onDone={() => setEditing(null)} /> : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
