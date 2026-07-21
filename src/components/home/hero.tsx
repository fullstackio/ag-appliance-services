import Link from "next/link";
import { AnimHead } from "@/components/common/anim-head";
import { PhoneIcon } from "@/components/icons";
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
          <AnimHead as="span" lines={["SOFTWARE ENGINEER", "& SERVICE TECHNICIAN"]} />
        </h1>
        <p className="hero__display" aria-hidden="true">
          BUILT ON
          <br />
          EXPERIENCE
        </p>
        <div className="hero__card">
          <p>
            Building modern web applications with React, Next.js and WordPress
            while delivering reliable AC, Refrigerator, PCB and all home-appliance
            repair services. One trusted professional for both digital solutions
            and technical support.
          </p>
          <div className="hero__actions">
            <span className="animated-border-box">
              <Link className="btn btn--pill" href="#contact">
                Hire Me <span aria-hidden="true">↗</span>
              </Link>
            </span>
            <Link className="btn btn--outline" href="#projects">
              View Projects
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
