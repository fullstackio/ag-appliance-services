"use client";

import { useEffect } from "react";

/**
 * Smooth in-page anchor scrolling that works everywhere.
 * Uses native `scrollTo({ behavior: "smooth" })` when supported and falls back to a
 * requestAnimationFrame animation (older Safari / WebViews). Honours prefers-reduced-motion.
 */
const DURATION = 650;

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

function supportsNativeSmooth(): boolean {
  return "scrollBehavior" in document.documentElement.style;
}

function animateScrollTo(targetY: number): void {
  const startY = window.scrollY;
  const delta = targetY - startY;
  if (Math.abs(delta) < 1) {
    return;
  }
  const start = performance.now();
  let cancelled = false;
  const cancel = () => {
    cancelled = true;
  };
  window.addEventListener("wheel", cancel, { passive: true, once: true });
  window.addEventListener("touchstart", cancel, { passive: true, once: true });

  const step = (now: number) => {
    if (cancelled) {
      return;
    }
    const t = Math.min(1, (now - start) / DURATION);
    window.scrollTo(0, startY + delta * easeInOutCubic(t));
    if (t < 1) {
      requestAnimationFrame(step);
    }
  };
  requestAnimationFrame(step);
}

export function scrollToElement(el: HTMLElement): void {
  // land just below the sticky header, and ask it to stay visible while we scroll
  const header = document.querySelector<HTMLElement>("[data-site-header]");
  const offset = header?.offsetHeight ?? 0;
  window.dispatchEvent(new CustomEvent("site:scroll-lock", { detail: 1600 }));
  const top = Math.max(0, el.getBoundingClientRect().top + window.scrollY - offset);
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    window.scrollTo(0, top);
  } else if (supportsNativeSmooth()) {
    window.scrollTo({ top, behavior: "smooth" });
  } else {
    animateScrollTo(top);
  }
}

export function SmoothScroll() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      // ignore modified clicks and clicks already handled (e.g. "#book" opens the dialog)
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) {
        return;
      }
      const anchor = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) {
        return;
      }
      const hash = anchor.getAttribute("href") ?? "";
      if (hash.length < 2) {
        return;
      }
      const el = document.querySelector<HTMLElement>(hash);
      if (!el) {
        return;
      }
      e.preventDefault();
      scrollToElement(el);
      // keep the URL in sync without triggering the browser's instant jump
      history.pushState(null, "", hash);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
