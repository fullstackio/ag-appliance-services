import { AnimHead } from "@/components/common/anim-head";

export function About() {
  return (
    <section className="block plain about" id="about" data-aos="fade-up" suppressHydrationWarning>
      <p className="eyebrow">WHO I AM</p>
      <div className="about__grid">
        <AnimHead
          as="h2"
          className="about__title"
          lines={[
            <>
              SCALABLE <span className="accent">FRONTEND</span>
            </>,
            <>
              <span className="accent">ENGINEERING</span> &amp; WORDPRESS
            </>,
            "FOR HIGH-TRAFFIC SYSTEMS",
          ]}
        />
        <div className="about__copy">
          <p>
            I&apos;m Avijit Ghosh, a Sr. Software Engineer with 8+ years building
            scalable, high-performance websites and enterprise applications. I
            bring strong expertise in WordPress VIP, Multisite and custom
            theme/plugin development.
          </p>
          <p className="muted">
            Proven ability to optimize Core Web Vitals, integrate APIs and
            deliver pixel-perfect UI with modern front-end technologies — React,
            Next.js, Redux and TypeScript. Immediate joiner with a valid passport
            and exposure to international projects.
          </p>
        </div>
      </div>
    </section>
  );
}
