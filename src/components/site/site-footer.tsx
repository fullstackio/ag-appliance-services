import Link from "next/link";

import { CookieSettingsLink } from "@/components/site/cookie-settings-link";
import { sectionHref } from "@/components/site/section-href";
import { ProfileCards } from "@/components/site/sections";
import { Brand } from "@/components/site/site-header";
import type { Menu, SiteSettings } from "@/lib/validations/content";

interface SiteFooterProps {
  settings: SiteSettings;
  quick: Menu;
  services: Menu;
  /** "/" when rendered outside the home page */
  base?: string;
}

export const LEGAL_LINKS = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-and-conditions", label: "Terms & Conditions" },
  { href: "/cookies-policy", label: "Cookie Policy" },
] as const;

export function SiteFooter({ settings, quick, services, base = "" }: SiteFooterProps) {
  const social = [
    { key: "f", href: settings.social.facebook, label: "Facebook" },
    { key: "ig", href: settings.social.instagram, label: "Instagram" },
    {
      key: "wa",
      href: settings.social.whatsapp || `https://wa.me/${settings.whatsapp}`,
      label: "WhatsApp",
    },
    { key: "G", href: settings.social.google || settings.googleBusinessUrl, label: "Google" },
  ];
  return (
    <footer>
      <div className="wrap" style={{ position: "relative" }}>
        <div className="cols">
          <div>
            <Brand settings={settings} light base={base} />
            <p className="about">{settings.footerAbout}</p>
            <div className="social">
              {social.map((s) => (
                <a
                  key={s.key}
                  href={s.href || "#"}
                  aria-label={s.label}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>{s.key}</span>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4>{quick.title ?? "Quick Links"}</h4>
            <ul>
              {quick.items
                .filter((i) => i.visible)
                .map((i) => (
                  <li key={i.id}>
                    <a href={sectionHref(i.href, base)}>{i.label}</a>
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <h4>{services.title ?? "Our Services"}</h4>
            <ul>
              {services.items
                .filter((i) => i.visible)
                .map((i) => (
                  <li key={i.id}>
                    <a href={sectionHref(i.href, base)}>{i.label}</a>
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <h4>Contact Us</h4>
            <ul>
              <li>
                📞 <a href={`tel:${settings.phone}`}>{settings.phone}</a> (Call / WhatsApp)
              </li>
              <li>
                ✉ <a href={`mailto:${settings.email}`}>{settings.email}</a>
              </li>
              <li>📍 {settings.address}</li>
              <li>🕘 {settings.hours}</li>
            </ul>
            <ProfileCards settings={settings} />
          </div>
        </div>
        <div className="copy">
          {/* year is computed at render time, never stored — see lib/validations/content.ts */}
          <span>
            © {new Date().getFullYear()} {settings.copyright}
          </span>
          <span className="legal-links">
            {LEGAL_LINKS.map((l, i) => (
              <span key={l.href}>
                {i > 0 ? " • " : null}
                <Link href={l.href}>{l.label}</Link>
              </span>
            ))}
            <span>
              {" • "}
              <CookieSettingsLink />
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}
