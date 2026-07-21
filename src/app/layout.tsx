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
  title: "Avijit Ghosh — Home Appliance Repair & Service Technician",
  description:
    "Avijit Ghosh — trusted home appliance repair technician with 8+ years servicing AC, refrigerators, washing machines, microwaves and kitchen appliances. Fast, reliable, same-day service.",
  keywords: [
    "Appliance Repair",
    "AC Repair",
    "Refrigerator Repair",
    "Washing Machine Repair",
    "Microwave Repair",
    "Home Appliance Service",
    "Kitchen Appliance Repair",
    "Service Technician",
    "Kolkata",
    "Avijit Ghosh",
  ],
  authors: [{ name: "Avijit Ghosh" }],
  robots: { index: true, follow: true },
  icons: { icon: "/assets/images/favicon.svg" },
  openGraph: {
    type: "website",
    title: "Avijit Ghosh — Home Appliance Repair & Service Technician",
    description:
      "8+ years repairing and servicing home appliances — AC, refrigerators, washing machines, microwaves and kitchen appliances.",
    images: ["/assets/images/og-cover.svg"],
    url: "https://avijitghosh.example/",
    siteName: "Avijit Ghosh",
  },
  twitter: {
    card: "summary_large_image",
    title: "Avijit Ghosh — Home Appliance Repair & Service Technician",
    description:
      "8+ years of home appliance repair — AC, refrigerators, washing machines and kitchen appliances. Reliable, same-day service.",
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
