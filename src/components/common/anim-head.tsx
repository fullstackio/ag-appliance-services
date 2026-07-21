import type { CSSProperties, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimHeadProps {
  /** Each entry becomes one masked line (the original split-on-<br> behaviour). */
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  duration?: number;
}

/**
 * Recreates the site's `.anim-head` masked heading reveal.
 * Each line is wrapped in `.mask-line > .mask-line__inner`; AOS toggles
 * `.aos-animate` on scroll into view and the CSS sweeps a bar across each line
 * (staggered by the `--i` index).
 */
export function AnimHead({
  lines,
  as: Tag = "h2",
  className,
  duration = 1000,
}: AnimHeadProps) {
  return (
    <Tag
      className={cn("anim-head", className)}
      data-aos="anim-head"
      data-aos-duration={duration}
      // AOS toggles `aos-init`/`aos-animate` on this node on the client; for
      // lazily-hydrated sections that stamping can precede hydration, so tell
      // React the className may differ from the SSR markup.
      suppressHydrationWarning
    >
      {lines.map((line, i) => (
        <span
          key={i}
          className="mask-line"
          style={{ "--i": i } as CSSProperties}
        >
          <span className="mask-line__inner">{line}</span>
        </span>
      ))}
    </Tag>
  );
}
