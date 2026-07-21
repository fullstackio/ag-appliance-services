import Link from "next/link";
import { NewsletterForm } from "@/components/layout/newsletter-form";
import { AnimHead } from "@/components/common/anim-head";
import type { FooterColumn } from "@/lib/data/footer";

interface SiteFooterProps {
  columns: FooterColumn[];
  brandHref: string;
  quoteHref: string;
}

export function SiteFooter({ columns, brandHref, quoteHref }: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer" id="footer">
      <div className="footer__inner">
        {/* Newsletter row */}
        <div className="footer__news">
          <div className="footer__news-text">
            <AnimHead as="h2" lines={["Stay Informed with Early Updates!"]} />
            <p className="muted">
              Get occasional tips on tech, home care and special service offers
              delivered straight to your inbox.
            </p>
          </div>
          <NewsletterForm />
        </div>

        <hr className="footer__divider" />

        {/* CTA + link columns */}
        <div className="footer__top">
          <div className="footer__cta">
            <h2 className="footer__heading">LET&apos;S TALK</h2>
            <span className="animated-border-box">
              <Link className="btn btn--pill" href={quoteHref}>
                Get a Quote <span aria-hidden="true">↗</span>
              </Link>
            </span>
          </div>
          <nav className="footer__cols" aria-label="Footer">
            {columns.map((col) => (
              <div className="footer__col" key={col.title}>
                <AnimHead as="h3" lines={[col.title]} />
                <ul>
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <hr className="footer__divider" />

        {/* Bottom bar */}
        <div className="footer__bottom">
          <p>&copy; {year} Avijit Ghosh. All rights reserved.</p>
          <Link className="brand brand--sm" href={brandHref}>
            <span className="brand__mark" aria-hidden="true" />
            <span className="brand__name">Avijit&nbsp;Ghosh</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
