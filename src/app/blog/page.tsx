import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { AnimHead } from "@/components/common/anim-head";
import { BlogListing } from "@/components/blog/blog-listing";
import { pageNav } from "@/lib/data/site";
import { pageFooterColumns } from "@/lib/data/footer";

export const metadata: Metadata = {
  title: "Blog & News — Avijit Ghosh",
  description:
    "Articles and updates from Avijit Ghosh on software engineering, home appliance care and bike & car maintenance.",
};

export default function BlogPage() {
  return (
    <>
      <SiteHeader
        links={pageNav}
        brandHref="/"
        ctaHref="/#contact"
        activeHref="/blog"
      />
      <main id="main">
        <section className="block card page-hero" data-aos="fade-up" data-cursor="view" suppressHydrationWarning>
          <video
            className="page-hero__video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            tabIndex={-1}
          >
            <source src="/assets/videos/dark-round-wheel.mp4" type="video/mp4" />
          </video>
          <div className="page-hero__inner">
            <ol className="breadcrumb">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>Blog</li>
            </ol>
            <p className="eyebrow">BLOG &amp; NEWS</p>
            <AnimHead
              as="h1"
              className="page-hero__title"
              lines={["LATEST POSTS", "& INSIGHTS"]}
            />
            <p className="page-hero__sub">
              Notes from the codebase and the workshop — articles on software
              engineering, home appliance care and keeping your ride road-ready.
            </p>
          </div>
        </section>

        <BlogListing />
      </main>
      <SiteFooter columns={pageFooterColumns} brandHref="/" quoteHref="/#contact" />
    </>
  );
}
