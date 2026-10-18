"use client";

import { useState } from "react";

import Image from "next/image";

import { CardSlider } from "@/components/site/card-slider";
import { SectionHeading } from "@/components/site/section-heading";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { SectionOf } from "@/lib/validations/content";

type Item = SectionOf<"gallery">["items"][number];

/**
 * Gallery slider: a single row of equal-size cards (react-slick, via CardSlider)
 * instead of a filterable bento grid — each card carries its own category chip,
 * so there's no separate tab/filter control to keep in sync.
 */

export function Gallery({ section }: { section: SectionOf<"gallery"> }) {
  const [zoom, setZoom] = useState<Item | null>(null);

  if (!section.visible) {
    return null;
  }

  return (
    <section className="sec gallery" id="gallery">
      <div className="wrap">
        <SectionHeading
          pill={section.pill}
          heading={section.heading}
          accent={section.headingAccent}
          subtitle={section.subtitle}
        />
      </div>
      <div className="gallery-full">
        <CardSlider
          perView={4.5}
          dots={false}
          autoplay={false}
          loop={false}
          label="Recent work gallery"
        >
          {section.items.map((g) => (
            <button
              type="button"
              key={g.title}
              className={cn(
                "g",
                g.feature && "feature",
                "cursor-pointer border-0 p-0 text-left",
              )}
              onClick={() => setZoom(g)}
              aria-label={`Open ${g.title}`}
            >
              <Image
                src={g.image}
                alt={g.title}
                fill
                sizes="(max-width: 640px) 85vw, (max-width: 1100px) 45vw, 22vw"
              />
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
        </CardSlider>
      </div>

      <Dialog open={Boolean(zoom)} onOpenChange={(o) => !o && setZoom(null)}>
        <DialogContent className="max-w-4xl overflow-hidden p-0">
          {zoom ? (
            <>
              <div className="relative aspect-16/10 w-full">
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
