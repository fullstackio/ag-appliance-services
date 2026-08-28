"use client";

import { useEffect, useRef, useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

/**
 * Cookie consent bar (full-width, bottom). Choice is stored in localStorage under
 * `ag-cookie-consent`; "necessary" is always on. Read the stored value before loading any
 * analytics/marketing script: JSON.parse(localStorage.getItem("ag-cookie-consent") ?? "{}").
 */
const KEY = "ag-cookie-consent";
const HIDDEN_ON = [/^\/dashboard/, /^\/login/, /^\/register/];
/** Dispatch this on `window` (e.g. footer "Cookie settings") to reopen the bar. */
export const OPEN_COOKIE_SETTINGS = "ag:open-cookie-settings";

interface Consent {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  at: string;
}

function read(): Consent | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
}

export function CookieConsent() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [customize, setCustomize] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (HIDDEN_ON.some((re) => re.test(pathname))) {
      return;
    }
    if (!read()) {
      // small delay so the bar slides in after first paint
      const t = setTimeout(() => setOpen(true), 600);
      return () => clearTimeout(t);
    }
  }, [pathname]);

  // reopen on demand (footer "Cookie settings"), pre-filled with the stored choice
  useEffect(() => {
    const onOpen = () => {
      const c = read();
      setAnalytics(Boolean(c?.analytics));
      setMarketing(Boolean(c?.marketing));
      setCustomize(true);
      setOpen(true);
    };
    window.addEventListener(OPEN_COOKIE_SETTINGS, onOpen);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS, onOpen);
  }, []);

  // the bar is fixed → reserve its height at the bottom of the page so it never covers the footer
  useEffect(() => {
    const el = barRef.current;
    if (!open || !el) {
      document.body.style.removeProperty("padding-bottom");
      return;
    }
    const apply = () => {
      document.body.style.paddingBottom = `${el.offsetHeight}px`;
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => {
      ro.disconnect();
      document.body.style.removeProperty("padding-bottom");
    };
  }, [open, customize]);

  const save = (c: Omit<Consent, "necessary" | "at">) => {
    try {
      localStorage.setItem(
        KEY,
        JSON.stringify({ necessary: true, ...c, at: new Date().toISOString() })
      );
    } catch {
      // storage unavailable — just close
    }
    setOpen(false);
  };

  if (!open) {
    return null;
  }

  return (
    <div
      ref={barRef}
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="animate-in slide-in-from-bottom-4 fade-in fixed inset-x-0 bottom-0 z-[60] w-full duration-500"
    >
      {/* copper → gold hairline, matching the brand accent used across the site */}
      <div className="from-brand-copper via-brand-gold to-brand-copper2 h-[3px] w-full bg-linear-to-r" />
      <div className="bg-brand-paper text-brand-ink dark:bg-brand-ink dark:text-brand-cream w-full shadow-[0_-12px_40px_rgba(18,18,18,.35)]">
        <div className="flex w-full items-start gap-4 px-5 py-5 sm:px-8 sm:py-6">
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
              <p className="text-brand-ink dark:text-brand-cream min-w-0 flex-1 text-sm leading-relaxed">
                By continuing to use this website, you agree that AG Appliance Services can store
                cookies on your device and disclose information in accordance with our{" "}
                <Link
                  href="/cookies-policy"
                  className="text-brand-copper dark:text-brand-gold font-medium underline underline-offset-2"
                >
                  Cookie Policy
                </Link>
                . By exiting this window, default (necessary) cookies will be accepted. To reject
                optional cookies, choose an option below.
              </p>

              {!customize ? (
                <div className="flex flex-wrap justify-end gap-3 lg:shrink-0">
                  <Button
                    variant="ink"
                    size="site"
                    onClick={() => save({ analytics: false, marketing: false })}
                  >
                    Necessary cookies only
                  </Button>
                  <Button variant="light" size="site" onClick={() => setCustomize(true)}>
                    Customize settings
                  </Button>
                </div>
              ) : null}
            </div>

            {customize ? (
              <>
                <div className="border-brand-line dark:border-brand-ink3 dark:bg-brand-ink2/60 grid gap-3 rounded-lg border bg-black/[.02] p-4 sm:grid-cols-3">
                  <label className="flex items-start gap-3 text-sm">
                    <Switch checked disabled className="mt-0.5" />
                    <span>
                      <b className="block">Necessary</b>
                      <span className="text-brand-muted text-xs">
                        Required for the site to work (theme, booking form draft). Always on.
                      </span>
                    </span>
                  </label>
                  <label className="flex items-start gap-3 text-sm">
                    <Switch checked={analytics} onCheckedChange={setAnalytics} className="mt-0.5" />
                    <span>
                      <b className="block">Analytics</b>
                      <span className="text-brand-muted text-xs">
                        Anonymous usage statistics that help us improve the website.
                      </span>
                    </span>
                  </label>
                  <label className="flex items-start gap-3 text-sm">
                    <Switch checked={marketing} onCheckedChange={setMarketing} className="mt-0.5" />
                    <span>
                      <b className="block">Marketing</b>
                      <span className="text-brand-muted text-xs">
                        Used to measure our ads and show relevant offers.
                      </span>
                    </span>
                  </label>
                </div>

                <div className="flex flex-wrap justify-end gap-3">
                  <Button
                    variant="ink"
                    size="site"
                    onClick={() => save({ analytics: false, marketing: false })}
                  >
                    Necessary cookies only
                  </Button>
                  <Button
                    variant="copper"
                    size="site"
                    onClick={() => save({ analytics, marketing })}
                  >
                    Save preferences
                  </Button>
                  <Button
                    variant="light"
                    size="site"
                    onClick={() => save({ analytics: true, marketing: true })}
                  >
                    Accept all
                  </Button>
                </div>
              </>
            ) : null}
          </div>

          <button
            type="button"
            aria-label="Close and accept default cookies"
            className="grid size-9 shrink-0 place-items-center rounded-full border border-white/10 bg-black text-white shadow-sm transition-colors hover:bg-neutral-800"
            onClick={() => save({ analytics: false, marketing: false })}
          >
            <X className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
