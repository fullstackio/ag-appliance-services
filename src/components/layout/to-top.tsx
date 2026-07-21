"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks/use-media";

/** Back-to-top button; appears after scrolling past 600px. */
export function ToTop() {
  const [visible, setVisible] = useState(false);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.pageYOffset >= 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      className="to-top"
      aria-label="Back to top"
      hidden={!visible}
      onClick={() =>
        window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" })
      }
    >
      ↑
    </button>
  );
}
