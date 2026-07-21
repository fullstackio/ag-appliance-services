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
              TRUSTED <span className="accent">APPLIANCE</span>
            </>,
            <>
              <span className="accent">REPAIR</span> &amp; SERVICE
            </>,
            "FOR EVERY HOME",
          ]}
        />
        <div className="about__copy">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris.
          </p>
          <p className="muted">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
        </div>
      </div>
    </section>
  );
}
