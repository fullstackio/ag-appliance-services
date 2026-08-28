"use client";

import { type ReactNode, useEffect } from "react";

import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";

/** `?theme=dark|light` in the URL switches (and persists) the theme — handy for sharing/QA. */
function ThemeQuerySync() {
  const { setTheme } = useTheme();
  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).get("theme");
    if (wanted === "dark" || wanted === "light") {
      setTheme(wanted);
    }
  }, [setTheme]);
  return null;
}

/** Adds/removes the `dark` class on <html>; persisted in localStorage by next-themes.
 *  Colour transitions on toggle are defined in styles/site.css (`.site`, `.site *`). */
export function ThemeProvider({ children }: { children: ReactNode }): ReactNode {
  return (
    <NextThemesProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <ThemeQuerySync />
      {children}
    </NextThemesProvider>
  );
}
