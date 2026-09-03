"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";

import { Menu as MenuIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { ContactDialog } from "@/components/site/contact-dialog";
import { Icon, MoonIcon, SunIcon } from "@/components/site/icons";
import { sectionHref } from "@/components/site/section-href";
import { SiteButton } from "@/components/site/site-link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { Menu, SiteSettings } from "@/lib/validations/content";
import { useBookingDialogStore } from "@/store/useBookingDialogStore";

interface SiteHeaderProps {
  settings: SiteSettings;
  menu: Menu;
  /** "/" when rendered outside the home page so "#section" links navigate home first */
  base?: string;
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <button
      type="button"
      className="mode"
      title="Switch theme"
      aria-label="Switch theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <MoonIcon />
      <SunIcon />
    </button>
  );
}

export function Brand({
  settings,
  light,
  base = "",
}: {
  settings: SiteSettings;
  light?: boolean;
  base?: string;
}) {
  return (
    <a
      href={`${base}#home`}
      className="brand"
      style={light ? { color: "#fff" } : undefined}
    >
      <Image
        src={settings.logo}
        alt={settings.businessName}
        width={62}
        height={62}
        priority
      />
      <div className="name">
        {settings.brandLine1}
        <span>{settings.brandLine2}</span>
      </div>
    </a>
  );
}

/** LinkedIn-style header: sticks to the top, hides on scroll-down, reveals on scroll-up. */
function useHeaderScroll() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let lockedUntil = 0;
    let raf = 0;

    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const delta = y - lastY;
      setScrolled(y > 10);
      if (y < 120 || performance.now() < lockedUntil) {
        setHidden(false);
      } else if (delta > 6) {
        setHidden(true);
      } else if (delta < -6) {
        setHidden(false);
      }
      lastY = y;
    };
    const onScroll = () => {
      if (!raf) {
        raf = requestAnimationFrame(update);
      }
    };
    // keep the bar visible while an anchor link is smooth-scrolling the page
    const onLock = (e: Event) => {
      lockedUntil =
        performance.now() + ((e as CustomEvent<number>).detail ?? 800);
      setHidden(false);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("site:scroll-lock", onLock);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("site:scroll-lock", onLock);
      if (raf) {
        cancelAnimationFrame(raf);
      }
    };
  }, []);

  return { scrolled, hidden };
}

/** Publishes the header's live height as `--header-h` on <html> (used by full-height sections). */
function useHeaderHeightVar(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }
    const apply = () =>
      document.documentElement.style.setProperty(
        "--header-h",
        `${el.offsetHeight}px`,
      );
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
}

export function SiteHeader({ settings, menu, base = "" }: SiteHeaderProps) {
  const openDialog = useBookingDialogStore((s) => s.openDialog);
  const navRef = useRef<HTMLElement>(null);
  useHeaderHeightVar(navRef);
  const [active, setActive] = useState<string>(menu.items[0]?.href ?? "#home");
  const { scrolled, hidden } = useHeaderScroll();
  const items = menu.items.filter((i) => i.visible);
  const [mobileOpen, setMobileOpen] = useState(false);

  // scroll-spy: highlight the menu item whose section is in view
  useEffect(() => {
    const ids = items.map((i) => i.href).filter((h) => h.startsWith("#"));
    const els = ids
      .map((id) => document.querySelector<HTMLElement>(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) {
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          setActive(`#${visible.target.id}`);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5] },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [items]);

  return (
    <nav
      ref={navRef}
      id="top"
      data-site-header
      className={[scrolled ? "is-scrolled" : "", hidden ? "is-hidden" : ""]
        .join(" ")
        .trim()}
    >
      <div className="wrap">
        <Brand settings={settings} base={base} />
        <ul>
          {items.map((item) => (
            <li
              key={item.id}
              className={active === item.href ? "active" : undefined}
            >
              <a href={sectionHref(item.href, base)}>{item.label}</a>
            </li>
          ))}
        </ul>
        <div className="nav-cta">
          <ContactDialog />
          <SiteButton variant="copper" href="#book" className="book-cta">
            📅 Book A Service
          </SiteButton>
          <ThemeToggle />
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-lg"
                  className="nav-burger"
                  aria-label="Open menu"
                />
              }
            >
              <MenuIcon />
            </SheetTrigger>
            <SheetContent side="left" className="w-80 gap-0 p-0">
              {/* .site re-establishes the brand CSS variables + Poppins font-family that this
                  panel loses by being portalled outside the page's <div className="site"> root */}
              <div className="site flex h-full flex-col">
                <SheetHeader className="gap-2 border-b border-(--line) px-4 py-4">
                  <Brand settings={settings} base={base} />
                  <SheetTitle className="sr-only">
                    {settings.businessName} menu
                  </SheetTitle>
                  <SheetDescription className="text-xs">
                    {settings.tagline}
                  </SheetDescription>
                </SheetHeader>
                <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-4">
                  {items.map((item) => (
                    <a
                      key={item.id}
                      href={sectionHref(item.href, base)}
                      onClick={() => setMobileOpen(false)}
                      className="hover:bg-muted rounded-md px-3 py-2 text-sm font-medium"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
                <SheetFooter className="gap-2 border-t border-(--line)">
                  <Button
                    variant="copper"
                    size="site"
                    onClick={() => {
                      setMobileOpen(false);
                      openDialog();
                    }}
                  >
                    📅 Book A Service
                  </Button>
                  <Button
                    variant="ink"
                    size="site"
                    nativeButton={false}
                    render={
                      <a
                        href={`tel:${settings.phone}`}
                        onClick={() => setMobileOpen(false)}
                      />
                    }
                  >
                    <Icon name="phone" /> {settings.phone}
                  </Button>
                </SheetFooter>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
