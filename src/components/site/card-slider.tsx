"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

import Slider from "react-slick";

import { cn } from "@/lib/utils";

import "slick-carousel/slick/slick.css";

interface CardSliderProps {
  children: ReactNode[];
  /** cards visible on desktop */
  perView: number;
  /** [maxWidth, cards visible] pairs, widest first */
  responsive?: Array<[number, number]>;
  autoplaySpeed?: number;
  /** set false for a manual (swipe / dots) carousel */
  autoplay?: boolean;
  className?: string;
  /** dots on a dark section → light dots */
  onDark?: boolean;
  label: string;
}

/** Below this width the carousel switches to a centred, non-looping, one-at-a-time layout. */
const COMPACT_MAX_WIDTH = 1100;
/** Peek of the neighbouring cards on each side of the centred slide, on mobile/tablet. */
const CENTER_PADDING = "12%";

/**
 * Cards visible for the current container width. Measured with ResizeObserver on the slider's
 * own wrapper — react-slick's `responsive` option does not re-evaluate reliably after hydration.
 */
function useSlidesToShow(
  ref: React.RefObject<HTMLDivElement | null>,
  perView: number,
  responsive: Array<[number, number]>
): { show: number; compact: boolean } {
  // pick(0) — used for both the server render and the client's pre-hydration render — must be
  // window-independent so the two match exactly; only the post-mount ResizeObserver measurement
  // (a real DOM width) is allowed to switch into compact mode.
  const pick = (containerWidth: number) => {
    if (!containerWidth) {
      return { show: perView, compact: false };
    }
    // responsive is [maxWidth, cards] widest → narrowest; the narrowest matching wins
    let show = perView;
    for (const [maxWidth, n] of responsive) {
      if (containerWidth <= maxWidth) {
        show = n;
      }
    }
    return { show, compact: containerWidth < COMPACT_MAX_WIDTH };
  };
  const [state, setState] = useState(() => pick(0));
  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }
    const update = () => setState(pick(el.offsetWidth));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- pick closes over stable props
  }, [perView, responsive.map((r) => r.join(":")).join(",")]);
  return state;
}

/**
 * Auto-rotating card carousel (react-slick): equal-height cards, dots only, no arrows.
 * On mobile/tablet it switches to a centred, non-looping, one-card-at-a-time view (with a
 * peek of its neighbours) — the hero banner slider is a separate component and is unaffected.
 */
export function CardSlider({
  children,
  perView,
  responsive = [
    [1100, 2],
    [640, 1],
  ],
  autoplaySpeed = 4200,
  autoplay = true,
  className,
  onDark,
  label,
}: CardSliderProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const count = children.length;
  const { show: rawShow, compact } = useSlidesToShow(wrapRef, perView, responsive);
  const show = Math.min(rawShow, count);
  const canLoop = count > show;
  // mobile / tablet: no autoplay, no loop — browse by swipe or dots, one card at a time, centred
  const infinite = compact ? false : canLoop;
  const effectiveAutoplay = autoplay && !compact && canLoop;
  return (
    <div ref={wrapRef}>
      <Slider
        key={`${show}-${compact}`} // re-initialise slick when the layout mode changes
        className={cn("card-slider", onDark && "on-dark", className)}
        dots
        arrows={false}
        infinite={infinite}
        autoplay={effectiveAutoplay}
        autoplaySpeed={autoplaySpeed}
        speed={700}
        pauseOnHover
        centerMode={compact && count > 1}
        centerPadding={compact ? CENTER_PADDING : "0px"}
        slidesToShow={compact ? 1 : show}
        slidesToScroll={1}
        cssEase="cubic-bezier(0.4, 0, 0.2, 1)"
        dotsClass="slick-dots card-dots"
        customPaging={(i) => (
          <button type="button" aria-label={`${label}: show group ${i + 1}`}>
            <span />
          </button>
        )}
      >
        {children.map((child, i) => (
          // eslint-disable-next-line react/no-array-index-key -- slides are positional
          <div className="card-slide" key={i}>
            {child}
          </div>
        ))}
      </Slider>
    </div>
  );
}
