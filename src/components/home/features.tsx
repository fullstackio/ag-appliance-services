"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { AnimHead } from "@/components/common/anim-head";
import { useImageLoaded } from "@/lib/hooks/use-image-loaded";

function FeatureCard({
  variant,
  media,
  title,
  copy,
  cta,
  withAvatars = false,
}: {
  variant: "light" | "gradient";
  media: string;
  title: string;
  copy: string;
  cta: { label: string; className: string };
  withAvatars?: boolean;
}) {
  const loaded = useImageLoaded(media);
  return (
    <article
      className={cn(
        "feature-card",
        `feature-card--${variant}`,
        "media",
        loaded && "is-loaded",
      )}
      data-cursor="view"
    >
      {!loaded && <span className="media-sk" aria-hidden="true" />}
      <div className="feature-card__body">
        {withAvatars && (
          <div className="feature-card__avatars" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        )}
        <AnimHead as="h3" lines={[title]} />
        <p>{copy}</p>
        <Link className={cta.className} href="#contact">
          {cta.label}
        </Link>
      </div>
    </article>
  );
}

export function Features() {
  return (
    <section className="block plain features" data-aos="fade-up" suppressHydrationWarning>
      <div className="features__grid">
        <FeatureCard
          variant="light"
          media="/assets/images/home22-img1.webp"
          title="Reliable, On-Time Service"
          copy="Punctual, dependable and tidy — whether at your home for a repair or delivering a software release on schedule."
          cta={{ label: "Contact Me", className: "btn btn--primary btn--sm" }}
        />
        <FeatureCard
          variant="gradient"
          media="/assets/images/home22-img2.webp"
          title="Trusted by the Community"
          copy="Used by households and businesses alike — years of word-of-mouth referrals from people who count on me again and again."
          cta={{ label: "Get in Touch", className: "btn btn--pill btn--sm" }}
          withAvatars
        />
      </div>
    </section>
  );
}
