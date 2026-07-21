"use client";

import Link from "next/link";
import { AnimHead } from "@/components/common/anim-head";
import { CodeChevronIcon, CmsIcon, BoltIcon } from "@/components/icons";
import { useServices } from "@/lib/hooks/use-portfolio-data";
import type { ServiceCard } from "@/lib/types";

const iconMap = {
  code: CodeChevronIcon,
  cms: CmsIcon,
  bolt: BoltIcon,
} as const;

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <span className="sk sk--icon" />
      <span className="sk sk--title" />
      <span className="sk sk--line" />
      <span className="sk sk--line short" />
    </div>
  );
}

function ServiceCardItem({ service, index }: { service: ServiceCard; index: number }) {
  const Icon = iconMap[service.icon];
  return (
    <article
      className="service-card"
      style={{
        animation: "fadeInUp .5s var(--ease) both",
        animationDelay: `${index * 0.11}s`,
      }}
    >
      <span className="service-card__icon" aria-hidden="true">
        <Icon width={26} height={26} />
      </span>
      <AnimHead as="h3" lines={[service.title]} />
      <p>{service.description}</p>
    </article>
  );
}

export function Services() {
  const { data: services, isPending } = useServices();

  return (
    <section className="block card card--soft services" id="services" data-aos="fade-up" suppressHydrationWarning>
      <p className="eyebrow">WHAT I DO</p>
      <div className="services__grid">
        {isPending || !services
          ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
          : services.map((service, i) => (
              <ServiceCardItem key={service.title} service={service} index={i} />
            ))}
      </div>

      <div className="services__other">
        <p className="services__other-label">Also offering locally</p>
        <p className="services__other-text">
          Beyond software, I&apos;m a trusted local hand for{" "}
          <strong>
            home-appliance repair
          </strong>{" "}
          (AC, washing machine, fridge, microwave &amp; more) and{" "}
          <strong>bike &amp; car wash and maintenance</strong>.{" "}
          <Link href="#contact">Get in touch ↗</Link>
        </p>
      </div>
    </section>
  );
}
