import { Suspense } from "react";

import { BookingDialog } from "@/components/site/booking-dialog";
import { Faqs } from "@/components/site/faqs";
import { Gallery } from "@/components/site/gallery";
import { Hero } from "@/components/site/hero";
import {
  Areas,
  Brands,
  CtaBand,
  Services,
  Stats,
  Steps,
  Testimonials,
  VideoCta,
  Why,
} from "@/components/site/sections";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { SiteSkeleton } from "@/components/site/site-skeleton";
import { SmoothScroll } from "@/components/site/smooth-scroll";
import { WhatsAppFab } from "@/components/site/whatsapp-fab";
import { getSiteContent } from "@/lib/content/get-content";
import {
  buildHomeMetadata,
  faqJsonLd,
  jsonLdString,
  localBusinessJsonLd,
  websiteJsonLd,
} from "@/lib/seo";

import type { Metadata } from "next";

import "@/styles/site.css";

// Content is edited from the dashboard → route handlers call revalidatePath("/")
export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await getSiteContent();
  return buildHomeMetadata(settings);
}

/** Data-dependent part of the page — streams in behind <SiteSkeleton />. */
async function HomeContent() {
  const content = await getSiteContent();
  const { settings, menus, banners, sections } = content;
  const banner = banners[0];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(localBusinessJsonLd(content)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(websiteJsonLd(settings)) }}
      />
      {sections.faqs.items.length ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(faqJsonLd(content)) }}
        />
      ) : null}

      <SmoothScroll />
      <SiteHeader settings={settings} menu={menus.header} />
      <main>
        {banner ? <Hero banner={banner} settings={settings} /> : null}
        <Stats section={sections.stats} settings={settings} />
        <Services section={sections.services} categories={sections.serviceCategories} />
        <Why section={sections.why} />
        <Steps section={sections.steps} />
        <VideoCta section={sections.video} />
        <Testimonials section={sections.testimonials} />
        <Gallery section={sections.gallery} />
        <Brands section={sections.brands} />
        <Areas section={sections.areas} />
        <Faqs section={sections.faqs} />
        <CtaBand section={sections.cta} />
      </main>
      <SiteFooter settings={settings} quick={menus.footerQuick} services={menus.footerServices} />
      <WhatsAppFab number={settings.whatsapp} />
      <BookingDialog phone={settings.phone} />
    </>
  );
}

export default function HomePage() {
  return (
    <div className="site">
      <Suspense fallback={<SiteSkeleton />}>
        <HomeContent />
      </Suspense>
    </div>
  );
}
