import { Geist_Mono, Poppins } from "next/font/google";

import { QueryProvider } from "@/components/providers/query-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { CookieConsent } from "@/components/site/cookie-consent";
import { Toaster } from "@/components/ui/sonner";
import { SITE_URL } from "@/lib/seo";

import type { Metadata, Viewport } from "next";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
