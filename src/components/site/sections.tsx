/**
 * Server-rendered static sections: stats, services, why, steps, video, testimonials,
 * brands, areas, cta. (Gallery + FAQ are interactive → separate client components.)
 */
import Image from "next/image";

import { AreasMap } from "@/components/site/areas-map";
import { CardSlider } from "@/components/site/card-slider";
import { Icon } from "@/components/site/icons";
import { ScrollReveal } from "@/components/site/scroll-reveal";
import { AccentHeading, SectionHeading } from "@/components/site/section-heading";
import { SiteButton } from "@/components/site/site-link";
import type { SectionOf, SiteSettings } from "@/lib/validations/content";

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

// ---------------------------------------------------------------- stats
/** Years of operation since `settings.since`, counting the founding year itself as year 1. */
function yearsSince(since: string): number {
  const foundedYear = Number.parseInt(since, 10);
  if (!Number.isFinite(foundedYear)) {
    return 1;
  }
  return Math.max(1, new Date().getFullYear() - foundedYear + 1);
}

export function Stats({
  section,
  settings,
}: {
  section: SectionOf<"stats">;
  settings: SiteSettings;
}) {
  if (!section.visible) {
    return null;
  }
  // the "Years of Experience" stat (icon: users) is computed live from settings.since rather
  // than the stored value, so it never needs manual updating year to year
  const experience = `${yearsSince(settings.since)}+`;
  return (
    <section className="stats">
      <div className="wrap">
        {section.items.map((s) => (
          <div className="s" key={s.label}>
            <Icon name={s.icon} />
            <div>
              <b>{s.icon === "users" ? experience : s.value}</b>
              <span>
                <MultiLine text={s.label} />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------- services + categories
export function Services({
  section,
  categories,
}: {
  section: SectionOf<"services">;
  categories: SectionOf<"serviceCategories">;
}) {
  if (!section.visible) {
    return null;
  }
  return (
    <section className="sec services" id="services">
      <div className="wrap">
        <SectionHeading
          pill={section.pill}
          heading={section.heading}
          accent={section.headingAccent}
          subtitle={section.subtitle}
        />
        <div className="grid">
          {section.items.map((svc) => (
            <div className="svc" key={svc.title}>
              <div className="ico">
                <Icon name={svc.icon} />
              </div>
              <b>{svc.title}</b>
              <small>{svc.subtitle}</small>
            </div>
          ))}
        </div>
        {categories.visible ? (
          <div className="cats">
            <CardSlider
              perView={3}
              responsive={[
                [1100, 1],
                [640, 1],
              ]}
              label="Service categories"
            >
              {categories.items.map((cat) => (
                <div className="cat" key={cat.title}>
                  <h3>
                    <Icon name={cat.icon} />
                    {cat.title}
                  </h3>
                  <div className="chips">
                    {cat.chips.map((chip) => (
                      <span key={chip}>{chip}</span>
                    ))}
                  </div>
                </div>
              ))}
            </CardSlider>
          </div>
        ) : null}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------- why
export function Why({ section }: { section: SectionOf<"why"> }) {
  if (!section.visible) {
    return null;
  }
  return (
    <section className="sec dark why" id="why-us">
      <div className="wrap">
        <SectionHeading
          pill={section.pill}
          heading={section.heading}
          accent={section.headingAccent}
        />
        <div className="why-slider">
          <CardSlider
            perView={6}
            responsive={[
              [1400, 4],
              [1100, 1],
              [640, 1],
            ]}
            autoplay={false}
            onDark
            label="Why choose us"
          >
            {section.items.map((w) => (
              <div className="card" key={w.title}>
                <div className="ico">
                  <Icon name={w.icon} />
                </div>
                <b>{w.title}</b>
                <p>{w.text}</p>
              </div>
            ))}
          </CardSlider>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------- steps
export function Steps({ section }: { section: SectionOf<"steps"> }) {
  if (!section.visible) {
    return null;
  }
  return (
    <section className="sec" id="how-it-works">
      <div className="wrap">
        <SectionHeading
          pill={section.pill}
          heading={section.heading}
          accent={section.headingAccent}
        />
        <div className="steps">
          {section.items.map((step, i) => (
            <div key={step.title} style={{ display: "contents" }}>
              {i > 0 ? <div className="arrow">⟶</div> : null}
              <div className="step">
                <div className="num">{i + 1}</div>
                <div className="ico">
                  <Icon name={step.icon} />
                </div>
                <div>
                  <b>{step.title}</b>
                  <p>{step.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------- video cta
export function VideoCta({ section }: { section: SectionOf<"video"> }) {
  if (!section.visible) {
    return null;
  }
  return (
    <section className="video" id="about" style={{ backgroundImage: `url('${section.image}')` }}>
      <div className="wrap">
        <ScrollReveal className="video-head">
          <span className="tag">{section.pill}</span>
          <h2>
            <AccentHeading heading={section.heading} accent={section.headingAccent} />
          </h2>
        </ScrollReveal>
        <p>{section.subtitle}</p>
        <div className="actions">
          <SiteButton variant="copper" size="site-lg" href={section.primaryCta.href}>
            {section.primaryCta.label}
          </SiteButton>
          {section.secondaryCta ? (
            <SiteButton variant="gold" size="site-lg" href={section.secondaryCta.href}>
              {section.secondaryCta.label}
            </SiteButton>
          ) : null}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------- testimonials
function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .join("");
}

export function Testimonials({ section }: { section: SectionOf<"testimonials"> }) {
  if (!section.visible) {
    return null;
  }
  return (
    <section className="sec dark testi" id="testimonials">
      <div className="wrap">
        <SectionHeading
          pill={section.pill}
          heading={section.heading}
          accent={section.headingAccent}
        />
        <div className="row">
          <CardSlider
            perView={4}
            responsive={[
              [1100, 1],
              [640, 1],
            ]}
            autoplay={false}
            onDark
            label="Customer reviews"
          >
            {section.items.map((t) => (
              <div className="card" key={t.name}>
                <div className="stars">{"★".repeat(t.rating)}</div>
                <p>&ldquo;{t.quote}&rdquo;</p>
                <div className="person">
                  <div className="avatar">{initials(t.name)}</div>
                  <div>
                    <b>{t.name}</b>
                    <small>{t.location}</small>
                  </div>
                </div>
              </div>
            ))}
          </CardSlider>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------- brands
export function Brands({ section }: { section: SectionOf<"brands"> }) {
  if (!section.visible) {
    return null;
  }
  const rows = [0, 1, 2].map((r) => section.items.filter((_, i) => i % 3 === r));
  return (
    <section className="sec brands" id="brands">
      <div className="wrap">
        <SectionHeading
          pill={section.pill}
          heading={section.heading}
          accent={section.headingAccent}
          subtitle={section.subtitle}
        />
      </div>
      <div className="logos">
        {rows.map((row) => (
          <div className="strip" key={row[0]?.name ?? "row"}>
            {["a", "b"].flatMap((dup) =>
              row.map((b) => (
                // eslint-disable-next-line @next/next/no-img-element -- SVG logos, no optimisation needed
                <img key={`${dup}-${b.name}`} src={b.logo} alt={b.name} loading="lazy" />
              ))
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------- areas
export function Areas({ section }: { section: SectionOf<"areas"> }) {
  if (!section.visible) {
    return null;
  }
  return (
    <section className="sec dark areas" id="areas">
      <div className="wrap">
        <div>
          <span className="pill">{section.pill}</span>
          <h2>
            <AccentHeading heading={section.heading} accent={section.headingAccent} />
          </h2>
          <AreasMap items={section.items} />
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------- cta band
export function CtaBand({ section }: { section: SectionOf<"cta"> }) {
  if (!section.visible) {
    return null;
  }
  return (
    <section className="cta" id="contact" style={{ padding: "0 0 70px" }}>
      <div className="wrap">
        <div>
          <h3>{section.heading}</h3>
          <p>{section.subtitle}</p>
        </div>
        <div className="actions">
          <SiteButton variant="ink" href={section.primaryCta.href}>
            {section.primaryCta.label}
          </SiteButton>
          {section.secondaryCta ? (
            <SiteButton variant="light" href={section.secondaryCta.href} className="border-0">
              {section.secondaryCta.label}
            </SiteButton>
          ) : null}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------- footer profile cards
export function ProfileCards({ settings }: { settings: SiteSettings }) {
  return (
    <div className="profiles">
      <a
        className="profile"
        href={settings.googleBusinessUrl || "#"}
        target="_blank"
        rel="noreferrer"
      >
        <b>
          <Image src="/brands/google.svg" alt="Google" width={18} height={18} />
          Google
        </b>
        FIND US ON GOOGLE
        <div
          className="bar"
          style={{ background: "linear-gradient(135deg,var(--copper2),var(--bronze))" }}
        >
          BUSINESS PROFILE
        </div>
      </a>
      <a
        className="profile"
        href={`https://wa.me/${settings.whatsapp}`}
        target="_blank"
        rel="noreferrer"
      >
        <b>
          <Image src="/brands/whatsapp.svg" alt="WhatsApp" width={18} height={18} />
          WhatsApp
        </b>
        CHAT WITH US
        <div className="bar" style={{ background: "linear-gradient(135deg,#1f9d55,#146a3a)" }}>
          BUSINESS PROFILE
        </div>
      </a>
    </div>
  );
}
