import localFont from "next/font/local";

import { QueryProvider } from "@/components/providers/query-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { CookieConsent } from "@/components/site/cookie-consent";
import { Toaster } from "@/components/ui/sonner";
import { SITE_URL } from "@/lib/seo";

import type { Metadata, Viewport } from "next";
import "./globals.css";

const poppins = localFont({
  variable: "--font-poppins",
  display: "swap",
  src: [
    {
      path: "../fonts/poppins/poppins-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/poppins/poppins-500.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/poppins/poppins-600.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/poppins/poppins-700.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/poppins/poppins-800.woff2",
      weight: "800",
      style: "normal",
    },
  ],
});

const geistMono = localFont({
  variable: "--font-geist-mono",
  display: "swap",
  src: [
    {
      path: "../fonts/geist-mono/geistmono-400.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/geist-mono/geistmono-700.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AG Appliance Services — Appliance Repair in Kolkata",
    template: "%s | AG Appliance Services",
  },
  description:
    "Reliable home appliance repair in Kolkata: AC, refrigerator, geyser, microwave, mixer grinder, induction and PCB/electrical repair.",
  applicationName: "AG Appliance Services",
  authors: [{ name: "Avijit Ghosh" }],
  creator: "AG Appliance Services",
  category: "Home Services",
  formatDetection: { telephone: true, email: true, address: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FBF8F3" },
    { media: "(prefers-color-scheme: dark)", color: "#131315" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <ThemeProvider>
          <QueryProvider>
            {children}
            <CookieConsent />
            <Toaster richColors position="top-center" />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
