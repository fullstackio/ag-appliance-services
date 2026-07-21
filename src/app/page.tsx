import dynamic from "next/dynamic";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { BackgroundDeco } from "@/components/layout/background-deco";
import { Hero } from "@/components/home/hero";
import { About } from "@/components/home/about";
import { Services } from "@/components/home/services";
import { Stats } from "@/components/home/stats";
import { Skills } from "@/components/home/skills";
import { Education } from "@/components/home/education";
import { Workflow } from "@/components/home/workflow";
import { Features } from "@/components/home/features";
import { Contact } from "@/components/home/contact";
import { SectionFallback } from "@/components/common/section-fallback";
import { homeNav } from "@/lib/data/site";
import { homeFooterColumns } from "@/lib/data/footer";

// Heavy, below-the-fold Swiper sections — split into their own chunks.
const Experience = dynamic(
  () => import("@/components/home/experience").then((m) => m.Experience),
  { loading: () => <SectionFallback /> },
);
const Projects = dynamic(
  () => import("@/components/home/projects").then((m) => m.Projects),
  { loading: () => <SectionFallback /> },
);
const Testimonials = dynamic(
  () => import("@/components/home/testimonials").then((m) => m.Testimonials),
  { loading: () => <SectionFallback /> },
);
const BlogSlider = dynamic(
  () => import("@/components/home/blog-slider").then((m) => m.BlogSlider),
  { loading: () => <SectionFallback /> },
);

export default function HomePage() {
  return (
    <>
      <SiteHeader links={homeNav} brandHref="#home" ctaHref="#contact" scrollSpy />
      <BackgroundDeco />
      <main id="main">
        <Hero />
        <About />
        <Services />
        <Stats />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Workflow />
        <Features />
        <Testimonials />
        <BlogSlider />
        <Contact />
      </main>
      <SiteFooter columns={homeFooterColumns} brandHref="#home" quoteHref="#contact" />
    </>
  );
}
