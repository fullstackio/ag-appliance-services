"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";

import { SectionHeading } from "@/components/site/section-heading";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import type { SectionOf } from "@/lib/validations/content";

type Item = SectionOf<"gallery">["items"][number];

/**
 * Gallery grid: a plain native-scroll flex row (not react-slick), so wheel, trackpad and
 * touch input all move it through the browser's own scrolling — continuous and inertial,
 * never a discrete per-card jump. While the pointer is over it, a vertical wheel scroll is
 * redirected 1:1 into horizontal scroll, releasing back to normal page scroll at either end;
 * a mostly-horizontal gesture (trackpad) is left untouched since it already scrolls the row
 * natively. Category filter tabs above it are unchanged.
 */
export function Gallery({ section }: { section: SectionOf<"gallery"> }) {
  const [tab, setTab] = useState<string>(section.tabs[0] ?? "All");
  const [zoom, setZoom] = useState<Item | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const items =
    tab === "All"
      ? section.items
      : section.items.filter((i) => i.category === tab);

  // a fresh filter scrolls the row back to the start
  useEffect(() => {
    trackRef.current?.scrollTo({ left: 0 });
  }, [tab]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) {
      return;
    }
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) {
        return;
      }
      const forward = e.deltaY > 0;
      const atStart = el.scrollLeft <= 0;
      const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 2;
      // at either end, let the wheel event through so the page keeps scrolling normally
      if (forward ? atEnd : atStart) {
        return;
      }
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

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
        <Tabs value={tab} onValueChange={(v) => setTab(String(v))}>
          <TabsList className="tabs" variant="line">
            {section.tabs.map((t) => (
              <TabsTrigger key={t} value={t}>
                {t}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      <div className="gallery-full">
        <div className="g-track" ref={trackRef}>
          {items.map((g) => (
            <div className="g-slide" key={g.title}>
              <button
                type="button"
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
                  sizes="(max-width: 640px) 68vw, (max-width: 1100px) 44vw, 24vw"
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
            </div>
          ))}
        </div>
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
