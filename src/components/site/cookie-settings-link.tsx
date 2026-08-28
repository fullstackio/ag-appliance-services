"use client";

import { OPEN_COOKIE_SETTINGS } from "@/components/site/cookie-consent";

/** Footer control that reopens the cookie consent bar. */
export function CookieSettingsLink() {
  return (
    <button
      type="button"
      className="link-btn"
      onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS))}
    >
      Cookie settings
    </button>
  );
}
