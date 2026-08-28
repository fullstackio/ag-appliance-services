"use client";

import { useState } from "react";

import Image from "next/image";

import { SectionHeading } from "@/components/site/section-heading";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { SectionOf } from "@/lib/validations/content";

type Item = SectionOf<"gallery">["items"][number];

export function Gallery({ section }: { section: SectionOf<"gallery"> }) {
  const [tab, setTab] = useState<string>(section.tabs[0] ?? "All");
  const [zoom, setZoom] = useState<Item | null>(null);

  if (!section.visible) {
    return null;
  }
  const items = tab === "All" ? section.items : section.items.filter((i) => i.category === tab);

  return (
    <section className="sec gallery" id="gallery">
      <div className="wrap">
        <SectionHeading
          pill={section.pill}
          heading={section.heading}
          accent={section.headingAccent}
          subtitle={section.subtitle}
        />
        <Tabs value={tab} onValueChange={(v) => setTab(String(v))}>
          <TabsList className="tabs" variant="line">
            {section.tabs.map((t) => (
              <TabsTrigger key={t} value={t}>
                {t}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="grid">
          {items.map((g) => (
            <button
              type="button"
              key={g.title}
              className={`g ${g.size === "normal" ? "" : g.size} ${g.feature ? "feature" : ""} cursor-pointer border-0 p-0 text-left`}
              onClick={() => setZoom(g)}
              aria-label={`Open ${g.title}`}
            >
              <Image src={g.image} alt={g.title} fill sizes="(max-width: 1100px) 50vw, 620px" />
              <span className="chip">{g.chip}</span>
              <div className="cap">
                <div>
                  <b>{g.title}</b>
                  <small>{g.subtitle}</small>
                </div>
                <span className="zoom">⤢</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Dialog open={Boolean(zoom)} onOpenChange={(o) => !o && setZoom(null)}>
        <DialogContent className="max-w-4xl overflow-hidden p-0">
          {zoom ? (
            <>
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={zoom.image}
                  alt={zoom.title}
                  fill
                  sizes="900px"
                  className="object-cover"
                />
              </div>
              <div className="px-6 pb-6">
                <DialogTitle>{zoom.title}</DialogTitle>
                <DialogDescription>{zoom.subtitle}</DialogDescription>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}
