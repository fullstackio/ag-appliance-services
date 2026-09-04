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
 * Gallery grid: a plain native-scroll flex row (not react-slick), so trackpad and touch
 * input move it through the browser's own scrolling — continuous and inertial, never a
 * discrete per-card jump. While the pointer is over it, a vertical wheel scroll is
 * redirected into an eased horizontal slide (see useWheelSlide), releasing back to normal
 * page scroll at either end. A mouse can also grab and drag the row directly (see
 * useDragToScroll) since plain `overflow-x: auto` has no drag-to-pan of its own — touch
 * already scrolls natively so it's left untouched. Category filter tabs above it are
 * unchanged.
 */

/** Redirects vertical wheel input into an eased (lerped) horizontal slide of `ref`. */
function useWheelSlide(ref: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }

    let target = el.scrollLeft;
    let raf = 0;

    const step = () => {
      const diff = target - el.scrollLeft;
      if (Math.abs(diff) < 0.5) {
        el.scrollLeft = target;
        raf = 0;
        return;
      }
      // ease toward the target instead of jumping straight there — this is what makes the
      // row feel like it's sliding rather than snapping card-to-card
      el.scrollLeft += diff * 0.2;
      raf = requestAnimationFrame(step);
    };

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) {
        return;
      }
      if (!raf) {
        target = el.scrollLeft; // resync in case a drag or native scroll moved it since
      }
      const max = el.scrollWidth - el.clientWidth;
      const next = Math.min(max, Math.max(0, target + e.deltaY));
      if (next === target) {
        return; // already at that boundary — let the page keep scrolling normally
      }
      target = next;
      e.preventDefault();
      if (!raf) {
        raf = requestAnimationFrame(step);
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      if (raf) {
        cancelAnimationFrame(raf);
      }
    };
  }, [ref]);
}

/** Lets a mouse grab-and-drag `ref` to pan it horizontally (touch already scrolls natively). */
function useDragToScroll(ref: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }

    let dragging = false;
    let moved = false;
    let startX = 0;
    let startScroll = 0;

    // a drag that actually moved the row shouldn't also fire the card's onClick on release
    const suppressClick = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "touch" || e.button !== 0) {
        return;
      }
      // don't capture the pointer yet — capturing here would redirect the eventual "click"
      // to this element instead of the card underneath, breaking plain (non-drag) clicks
      dragging = true;
      moved = false;
      startX = e.clientX;
      startScroll = el.scrollLeft;
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) {
        return;
      }
      const dx = e.clientX - startX;
      if (!moved) {
        if (Math.abs(dx) <= 3) {
          return; // still within the click threshold — leave normal click handling alone
        }
        moved = true;
        el.setPointerCapture(e.pointerId);
        el.classList.add("is-dragging");
      }
      el.scrollLeft = startScroll - dx;
    };
    const endDrag = (e: PointerEvent) => {
      if (!dragging) {
        return;
      }
      dragging = false;
      if (!moved) {
        return;
      }
      el.classList.remove("is-dragging");
      if (el.hasPointerCapture(e.pointerId)) {
        el.releasePointerCapture(e.pointerId);
      }
      el.addEventListener("click", suppressClick, {
        capture: true,
        once: true,
      });
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", endDrag);
    el.addEventListener("pointercancel", endDrag);
    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", endDrag);
      el.removeEventListener("pointercancel", endDrag);
      el.removeEventListener("click", suppressClick, true);
    };
  }, [ref]);
}

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

  useWheelSlide(trackRef);
  useDragToScroll(trackRef);

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
