"use client";

import { useEffect, useRef } from "react";
import { useIsTouch } from "@/lib/hooks/use-media";

const INTERACTIVE =
  "a, button, input, textarea, select, label, [data-cursor='hover']";

/** Xen-style custom cursor: a precise dot + an eased trailing ring. */
export function CustomCursor() {
  const isTouch = useIsTouch();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isTouch) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let dotX = 0, dotY = 0;
    let active = false;
    let raf = 0;

    const track = (e: PointerEvent | MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!active) {
        active = true;
        document.body.classList.add("cursor-active");
        ringX = dotX = mouseX;
        ringY = dotY = mouseY;
      }
    };
    const onLeave = () => {
      document.body.classList.remove("cursor-active", "cursor-hover", "cursor-view");
      active = false;
    };
    const onDown = () => document.body.classList.add("cursor-down");
    const onUp = () => document.body.classList.remove("cursor-down");
    const onOver = (e: MouseEvent) => {
      const node = e.target as Element | null;
      const isInteractive = !!node?.closest?.(INTERACTIVE);
      const viewEl = !isInteractive ? node?.closest?.("[data-cursor='view']") : null;
      document.body.classList.toggle("cursor-hover", isInteractive);
      document.body.classList.toggle("cursor-view", !!viewEl);
    };

    document.addEventListener("mousemove", track, { passive: true });
    document.addEventListener("pointermove", track, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onOver);

    const render = () => {
      dotX += (mouseX - dotX) * 0.55;
      dotY += (mouseY - dotY) * 0.55;
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      dot.style.transform = `translate3d(${dotX}px,${dotY}px,0) translate(-50%,-50%)`;
      ring.style.transform = `translate3d(${ringX}px,${ringY}px,0) translate(-50%,-50%)`;
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", track);
      document.removeEventListener("pointermove", track);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onOver);
      root.classList.remove("has-custom-cursor");
      document.body.classList.remove("cursor-active", "cursor-hover", "cursor-view", "cursor-down");
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      <div className="cursor-dot" aria-hidden="true" ref={dotRef} />
      <div className="cursor-ring" aria-hidden="true" ref={ringRef} />
    </>
  );
}
