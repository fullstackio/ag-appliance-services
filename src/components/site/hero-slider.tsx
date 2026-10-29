"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import { useReducedMotion } from "framer-motion";
import { Pause, Play } from "lucide-react";

interface HeroSliderProps {
  images: string[];
  position?: string;
  alt: string;
}

const AUTOPLAY_MS = 3800;

/**
 * Auto-rotating fade slider for the hero visual — CSS-only crossfade (no carousel
 * library) so the LCP image paints straight from the initial HTML instead of waiting
 * on client JS to measure/initialize a track, and so nothing ever sets an inline
 * track width that could shift layout after mount. Respects prefers-reduced-motion
 * (autoplay starts off) and exposes a pause/play toggle so the auto-rotation can
 * always be stopped (WCAG 2.2.2 Pause, Stop, Hide).
 */
export function HeroSlider({ images, position, alt }: HeroSliderProps) {
  const slides = images.length ? images : ["/images/technician.jpg"];
  const reduceMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [active, setActive] = useState(0);
  const playing = slides.length > 1 && !reduceMotion && !paused;

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [playing, slides.length]);

  return (
    <>
      <div className="hero-slider">
        {slides.map((src, i) => (
          <div
            className="hero-slide"
            key={src}
            style={{ opacity: i === active ? 1 : 0 }}
            aria-hidden={i === active ? undefined : true}
          >
            <Image
              className="ph"
              src={src}
              alt={i === 0 ? alt : ""}
              fill
              sizes="(max-width: 1100px) 100vw, 800px"
              style={{ objectPosition: position }}
              priority={i === 0}
              fetchPriority={i === 0 ? "high" : undefined}
            />
          </div>
        ))}
      </div>
      {slides.length > 1 ? (
        <button
          type="button"
          className="slider-pause"
          aria-pressed={!playing}
          aria-label={
            playing ? "Pause image slideshow" : "Play image slideshow"
          }
          onClick={() => setPaused((p) => !p)}
        >
          {playing ? <Pause /> : <Play />}
        </button>
      ) : null}
    </>
  );
}
