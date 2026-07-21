"use client";

import { cn } from "@/lib/utils";
import { AnimHead } from "@/components/common/anim-head";
import { Counter } from "@/components/common/counter";
import { useImageLoaded } from "@/lib/hooks/use-image-loaded";
import { stats } from "@/lib/data/portfolio";

const MEDIA = "/assets/images/home22_bg2.webp";

export function Stats() {
  const loaded = useImageLoaded(MEDIA);

  return (
    <section
      className={cn("block card stats media", loaded && "is-loaded")}
      id="stats"
      data-aos="fade-up"
      data-cursor="view"
      suppressHydrationWarning
    >
      {!loaded && <span className="media-sk" aria-hidden="true" />}
      <div className="stats__scan" aria-hidden="true">
        <span className="stats__scan-line" />
      </div>
      <div className="stats__inner">
        <AnimHead
          as="h2"
          className="stats__title"
          lines={["ENGINEERING", "FOR A FASTER", "WEB"]}
        />
        <div className="stats__right">
          {stats.map((stat) => (
            <div
              className={cn("stat", stat.offset && "stat--offset")}
              key={stat.label}
            >
              <Counter target={stat.count} suffix={stat.suffix} />
              <span className="stat__label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
