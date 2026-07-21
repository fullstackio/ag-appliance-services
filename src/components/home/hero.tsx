import Link from "next/link";
import { AnimHead } from "@/components/common/anim-head";
import { PhoneIcon } from "@/components/icons";
import { HireMeButton } from "@/components/layout/hire-me-drawer";
import { siteConfig } from "@/lib/data/site";

export function Hero() {
  return (
    <section className="block hero" id="home" data-aos="fade-up" data-cursor="view" suppressHydrationWarning>
      <video
        className="hero__video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/assets/images/home22_bg1.webp"
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src="/assets/videos/bg-technology.mp4" type="video/mp4" />
      </video>
      <div className="hero__bg" aria-hidden="true" />
      <div className="hero__scan" aria-hidden="true">
        <span className="hero__scan-line" />
      </div>
      <div className="hero__content">
        <h1 className="hero__title">
          <AnimHead as="span" lines={["HOME APPLIANCE", "REPAIR SPECIALIST"]} />
        </h1>
        <p className="hero__display" aria-hidden="true">
          BUILT ON
          <br />
          EXPERIENCE
        </p>
        <div className="hero__card">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <div className="hero__actions">
            <span className="animated-border-box">
              <HireMeButton className="btn btn--pill">
                Hire Me <span aria-hidden="true">↗</span>
              </HireMeButton>
            </span>
            <Link className="btn btn--outline" href="#testimonials">
              Client Speaks
            </Link>
          </div>
          <a
            className="hero__call"
            href={siteConfig.phoneHref}
            aria-label="Call me at +91 85838 22906"
          >
            <span className="hero__call-icon" aria-hidden="true">
              <PhoneIcon width={20} height={20} />
            </span>
            <span className="hero__call-text">
              <span className="hero__call-label">
                Available now — talk to me directly
              </span>
              <span className="hero__call-num">+91&nbsp;85838&nbsp;22906</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
