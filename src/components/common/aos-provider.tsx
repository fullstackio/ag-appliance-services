"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";
import { usePrefersReducedMotion } from "@/lib/hooks/use-media";

/**
 * Initialises AOS (Animate On Scroll) once, drives both the section fade-ups
 * and the `.anim-head` masked heading reveals, and refreshes on navigation.
 * Also lifts the load-time `no-anim` guard after the first paint.
 */
export function AosProvider() {
  const pathname = usePathname();
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    AOS.init({
      once: false,
      mirror: true,
      duration: 800,
      easing: "ease-out-cubic",
      offset: 100,
      disable: prefersReduced,
    });
  }, [prefersReduced]);

  // Re-scan the DOM whenever the route changes so new sections animate.
  useEffect(() => {
    AOS.refreshHard();
  }, [pathname]);

  // Remove the no-transition guard once we've painted a frame.
  useEffect(() => {
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() =>
        document.documentElement.classList.remove("no-anim"),
      ),
    );
    return () => cancelAnimationFrame(id);
  }, []);

  return null;
}
