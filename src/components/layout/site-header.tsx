"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { NavLink } from "@/lib/types";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useHireMe } from "@/components/layout/hire-me-drawer";
import { PhoneIcon, MailIcon } from "@/components/icons";
import { siteConfig } from "@/lib/data/site";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";

interface SiteHeaderProps {
  links: NavLink[];
  brandHref: string;
  /** Force the active link on non-scrollspy pages (e.g. "/blog"). */
  activeHref?: string;
  /** Enable in-page scrollspy (home page only). */
  scrollSpy?: boolean;
}

export function SiteHeader({
  links,
  brandHref,
  activeHref,
  scrollSpy = false,
}: SiteHeaderProps) {
  const { open: openHireMe } = useHireMe();
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<string>(activeHref ?? "");

  // Sticky header + optional scrollspy.
  useEffect(() => {
    const anchors = scrollSpy
      ? links
          .filter((l) => l.href.startsWith("#"))
          .map((l) => ({ href: l.href, el: document.querySelector<HTMLElement>(l.href) }))
          .filter((x): x is { href: string; el: HTMLElement } => !!x.el)
      : [];

    const onScroll = () => {
      const y = window.pageYOffset;
      setStuck(y > 40);
      if (scrollSpy && anchors.length) {
        let active = "";
        anchors.forEach(({ href, el }) => {
          if (y >= el.offsetTop - 140) active = href;
        });
        if (active) setCurrent(active);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [links, scrollSpy]);

  return (
    <header className={cn("site-header", stuck && "is-stuck")} id="siteHeader">
      <div className="site-header__inner">
        <Link className="brand" href={brandHref} aria-label="Avijit Ghosh — Home">
          <span className="brand__mark" aria-hidden="true" />
          <span className="brand__name">Avijit&nbsp;Ghosh</span>
        </Link>

        {/* Desktop navigation (hidden on mobile via CSS; the drawer takes over). */}
        <nav className="main-nav" id="mainNav" aria-label="Primary">
          <ul className="main-nav__list">
            {links.map((link) => {
              const isActive = current === link.href;
              return (
                <li key={link.href}>
                  <Link
                    className={cn(isActive && "is-active")}
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <ThemeToggle />

        <span className="animated-border-box header__cta-box">
          <button
            type="button"
            className="btn btn--pill header__cta"
            onClick={openHireMe}
          >
            Hire Me
          </button>
        </span>

        {/* Mobile navigation — shadcn Sheet (side drawer). */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <button
                className="nav-toggle"
                aria-label="Toggle navigation menu"
              />
            }
          >
            <span />
            <span />
            <span />
          </SheetTrigger>

          <SheetContent side="left" className="site-drawer">
            <SheetTitle className="sr-only">Navigation menu</SheetTitle>

            <SheetClose
              nativeButton={false}
              render={
                <Link
                  className="brand site-drawer__brand"
                  href={brandHref}
                  aria-label="Avijit Ghosh — Home"
                />
              }
            >
              <span className="brand__mark" aria-hidden="true" />
              <span className="brand__name">Avijit&nbsp;Ghosh</span>
            </SheetClose>

            <nav className="site-drawer__nav" aria-label="Mobile">
              <ul className="main-nav__list">
                {links.map((link) => {
                  const isActive = current === link.href;
                  return (
                    <li key={link.href}>
                      <SheetClose
                        nativeButton={false}
                        render={
                          <Link
                            className={cn(isActive && "is-active")}
                            href={link.href}
                            aria-current={isActive ? "page" : undefined}
                          />
                        }
                      >
                        {link.label}
                      </SheetClose>
                    </li>
                  );
                })}
              </ul>
              <button
                type="button"
                className="btn btn--pill main-nav__cta"
                onClick={() => {
                  setOpen(false);
                  openHireMe();
                }}
              >
                Hire Me <span aria-hidden="true">↗</span>
              </button>
            </nav>

            <div className="site-drawer__contact">
              <a
                className="drawer-contact"
                href={siteConfig.phoneHref}
                aria-label={`Call me at ${siteConfig.phone}`}
              >
                <span className="drawer-contact__icon" aria-hidden="true">
                  <PhoneIcon width={18} height={18} />
                </span>
                <span className="drawer-contact__text">
                  <span className="drawer-contact__label">
                    Available now — talk to me directly
                  </span>
                  <span className="drawer-contact__value">{siteConfig.phone}</span>
                </span>
              </a>
              <a
                className="drawer-contact"
                href={`mailto:${siteConfig.emails[0]}`}
                aria-label={`Email me at ${siteConfig.emails[0]}`}
              >
                <span className="drawer-contact__icon" aria-hidden="true">
                  <MailIcon width={18} height={18} />
                </span>
                <span className="drawer-contact__text">
                  <span className="drawer-contact__label">Drop me a line</span>
                  <span className="drawer-contact__value">
                    {siteConfig.emails[0]}
                  </span>
                </span>
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
