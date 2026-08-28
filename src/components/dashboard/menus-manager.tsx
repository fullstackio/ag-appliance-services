"use client";

import { useState } from "react";

import { ArrowDown, ArrowUp, Plus, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMenus, useSaveMenu } from "@/hooks/use-admin";
import { ApiError } from "@/lib/api-client";
import {
  type Menu,
  type MenuItem,
  MENU_LOCATIONS,
  type MenuLocation,
  menuSchema,
} from "@/lib/validations/content";

const LABELS: Record<MenuLocation, { title: string; hint: string }> = {
  header: {
    title: "Header navigation",
    hint: "Top navigation bar links (anchor links like #services scroll on the page)",
  },
  footerQuick: { title: "Footer — Quick Links", hint: "Second footer column" },
  footerServices: { title: "Footer — Our Services", hint: "Third footer column" },
};

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "") || `item-${Date.now().toString(36)}`;

function MenuEditor({ menu }: { menu: Menu }) {
  const [edited, setDraft] = useState<Menu | null>(null);
  const save = useSaveMenu();
  const draft = edited ?? menu;

  const items = draft.items;
  const setItems = (next: MenuItem[]) => setDraft({ ...draft, items: next });
  const upd = (i: number, patch: Partial<MenuItem>) =>
    setItems(items.map((it, idx) => (idx === i ? { ...it, ...patch } : it)));
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) {
      return;
    }
    const next = [...items];
    [next[i], next[j]] = [next[j] as MenuItem, next[i] as MenuItem];
    setItems(next);
  };

  const onSave = async () => {
    const parsed = menuSchema.safeParse(draft);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid menu");
      return;
    }
    try {
      await save.mutateAsync(parsed.data);
      setDraft(null);
      toast.success("Menu saved — website updated");
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Save failed");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{LABELS[menu.location].title}</CardTitle>
        <CardDescription>{LABELS[menu.location].hint}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {menu.location !== "header" ? (
          <Input
            placeholder="Column title"
            value={draft.title ?? ""}
            onChange={(e) => setDraft({ ...draft, title: e.target.value })}
            className="max-w-xs"
          />
        ) : null}
        <div className="space-y-2">
          {items.map((it, i) => (
            <div key={it.id} className="flex flex-wrap items-center gap-2 rounded-md border p-2">
              <Input
                className="min-w-40 flex-1"
                placeholder="Label"
                value={it.label}
                onChange={(e) => upd(i, { label: e.target.value })}
              />
              <Input
                className="min-w-40 flex-1"
                placeholder="Link (#section, /page, https://…)"
                value={it.href}
                onChange={(e) => upd(i, { href: e.target.value })}
              />
              <label className="flex items-center gap-1.5 text-xs">
                <Switch checked={it.visible} onCheckedChange={(c) => upd(i, { visible: c })} />{" "}
                Visible
              </label>
              <Button
                type="button"
                size="icon-sm"
                variant="ghost"
                aria-label="Move up"
                onClick={() => move(i, -1)}
              >
                <ArrowUp />
              </Button>
              <Button
                type="button"
                size="icon-sm"
                variant="ghost"
                aria-label="Move down"
                onClick={() => move(i, 1)}
              >
                <ArrowDown />
              </Button>
              <Button
                type="button"
                size="icon-sm"
                variant="destructive"
                aria-label="Remove"
                onClick={() => setItems(items.filter((_, idx) => idx !== i))}
              >
                <Trash2 />
              </Button>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              setItems([
                ...items,
                {
                  id: slug(`new-${items.length + 1}`),
                  label: "New link",
                  href: "#",
                  visible: true,
                  children: [],
                },
              ])
            }
          >
            <Plus /> Add link
          </Button>
          <Button
            type="button"
            variant="copper"
            size="sm"
            disabled={save.isPending}
            onClick={() => void onSave()}
          >
            <Save /> {save.isPending ? "Saving…" : "Save & publish"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function MenusManager() {
  const { data, isLoading } = useMenus();
  if (isLoading || !data) {
    return <Skeleton className="h-64 w-full" />;
  }
  return (
    <Tabs defaultValue="header">
      <TabsList>
        {MENU_LOCATIONS.map((loc) => (
          <TabsTrigger key={loc} value={loc}>
            {LABELS[loc].title}
          </TabsTrigger>
        ))}
      </TabsList>
      {MENU_LOCATIONS.map((loc) => {
        const menu = data.find((m) => m.location === loc);
        return (
          <TabsContent key={loc} value={loc} className="pt-4">
            {menu ? <MenuEditor menu={menu} /> : null}
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
