"use client";

import { useEffect, useState } from "react";

/**
 * Tracks whether a (background) image has finished loading so a shimmer
 * skeleton can be shown until then. Includes a 3s safety net, mirroring the
 * original `initMediaSkeletons` behaviour.
 */
export function useImageLoaded(src: string): boolean {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
    const img = new Image();
    const reveal = () => setLoaded(true);
    img.onload = reveal;
    img.onerror = reveal;
    img.src = src;
    if (img.complete) reveal();
    const t = window.setTimeout(reveal, 3000);
    return () => window.clearTimeout(t);
  }, [src]);

  return loaded;
}
