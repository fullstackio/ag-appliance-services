import type { ReactNode } from "react";

import { BookingDialog } from "@/components/site/booking-dialog";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { SmoothScroll } from "@/components/site/smooth-scroll";
import { WhatsAppFab } from "@/components/site/whatsapp-fab";
import { getSiteContent } from "@/lib/content/get-content";

import "@/styles/site.css";

export const revalidate = 3600;

/** Shared chrome for the legal pages: site header/footer with links pointing back home. */
export default async function LegalLayout({ children }: { children: ReactNode }) {
  const { settings, menus } = await getSiteContent();
  return (
    <div className="site">
      <SmoothScroll />
      <SiteHeader settings={settings} menu={menus.header} base="/" />
      <main className="legal">
        <div className="wrap">{children}</div>
      </main>
      <SiteFooter
        settings={settings}
        quick={menus.footerQuick}
        services={menus.footerServices}
        base="/"
      />
      <WhatsAppFab number={settings.whatsapp} />
      <BookingDialog phone={settings.phone} />
    </div>
  );
}
