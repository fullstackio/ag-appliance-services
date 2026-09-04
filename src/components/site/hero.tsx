import Image from "next/image";

import { HeroSlider } from "@/components/site/hero-slider";
import { Icon } from "@/components/site/icons";
import { SiteButton } from "@/components/site/site-link";
import type { Banner, SiteSettings } from "@/lib/validations/content";

interface HeroProps {
  banner: Banner;
  settings: SiteSettings;
}

function MultiLine({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <>
      {lines.map((line, i) => (
        <span key={line}>
          {line}
          {i < lines.length - 1 ? <br /> : null}
        </span>
      ))}
    </>
  );
}

export function Hero({ banner, settings }: HeroProps) {
  return (
    <section className="hero" id="home">
      <div className="wrap">
        <div>
          <div className="tag">{banner.tag}</div>
          <h1>
            <MultiLine text={banner.heading} />
            {banner.headingAccent ? (
              <>
                {" "}
                <span className="accent">{banner.headingAccent}</span>
              </>
            ) : null}
          </h1>
          <p>{banner.text}</p>
          <div className="actions">
            <SiteButton variant="copper" href={banner.primaryCta.href}>
              {banner.primaryCta.label}
            </SiteButton>
            {banner.secondaryCta ? (
              <SiteButton variant="gold" href={banner.secondaryCta.href}>
                {banner.secondaryCta.label}
              </SiteButton>
            ) : null}
          </div>
          {banner.trust.length ? (
            <div className="trust">
              {banner.trust.map((t) => (
                <div key={t.label}>
                  <Icon name={t.icon} />
                  <span className="txt">
                    <MultiLine text={t.label} />
                  </span>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div className="visual">
          <HeroSlider
            images={[
              banner.image,
              ...banner.images.filter((i) => i !== banner.image),
            ]}
            position={banner.imagePosition}
            alt="Expert technician at work"
          />
          <Image
            className="badge"
            src={settings.logo}
            alt=""
            width={190}
            height={190}
          />
          <span className="tag2">{banner.badgeText}</span>
          <div className="card">
            <div className="ico">
              <Icon name="tool" />
            </div>
            <div>
              <b>{banner.cardTitle}</b>
              <small>{banner.cardText}</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
