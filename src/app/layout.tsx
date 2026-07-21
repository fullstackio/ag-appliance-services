import type { Metadata, Viewport } from "next";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { SiteChrome } from "@/components/layout/site-chrome";
import { Toaster } from "@/components/ui/sonner";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
  // Match the original HTML stack exactly (`"Space Grotesk", sans-serif`).
  // Disable next/font's metric-adjusted Arial fallback so the rendered/FOUT
  // typography is identical to the static PF/ site.
  fallback: ["sans-serif"],
  adjustFontFallback: false,
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
  fallback: ["sans-serif"],
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://avijitghosh.example"),
  title: "Avijit Ghosh — Sr. Software Engineer | WordPress & Frontend Developer",
  description:
    "Avijit Ghosh — Sr. Software Engineer with 8+ years building scalable, high-performance websites and enterprise apps. Expert in React, Next.js, WordPress VIP/Multisite, Core Web Vitals, APIs and pixel-perfect UI.",
  keywords: [
    "Frontend Engineer",
    "WordPress Developer",
    "React Developer",
    "Next.js",
    "Redux",
    "TypeScript",
    "WordPress VIP",
    "Core Web Vitals",
    "Software Engineer",
    "Avijit Ghosh",
  ],
  authors: [{ name: "Avijit Ghosh" }],
  robots: { index: true, follow: true },
  icons: { icon: "/assets/images/favicon.svg" },
  openGraph: {
    type: "website",
    title:
      "Avijit Ghosh — Sr. Software Engineer | WordPress & Frontend Developer",
    description:
      "8+ years building scalable, high-performance websites and enterprise applications with React, Next.js and WordPress.",
    images: ["/assets/images/og-cover.svg"],
    url: "https://avijitghosh.example/",
    siteName: "Avijit Ghosh",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Avijit Ghosh — Sr. Software Engineer | WordPress & Frontend Developer",
    description:
      "8+ years of frontend & WordPress engineering — React, Next.js, Core Web Vitals and pixel-perfect UI.",
    images: ["/assets/images/og-cover.svg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0e1a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      // The next/font CSS variables MUST live on <html> (:root), because
      // portfolio.css declares `--font-display`/`--font-body` on :root and
      // references them via var(). A custom property resolves its var()s at the
      // element where it's declared, so if the font vars were only on <body>
      // the :root declarations would resolve to empty and fall back to serif.
      className={`no-anim ${spaceGrotesk.variable} ${ibmPlexMono.variable}`}
      suppressHydrationWarning
    >
      {/* suppressHydrationWarning: browser extensions (e.g. Grammarly) inject
          data-* attributes onto <body> before React hydrates, which would
          otherwise trigger a hydration attribute-mismatch warning. */}
      <body suppressHydrationWarning>
        <Providers>
          <a className="skip-link" href="#main">
            Skip to main content
          </a>
          <SiteChrome />
          {children}
        </Providers>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
