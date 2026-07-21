import { AnimHead } from "@/components/common/anim-head";
import { SnowflakeIcon, BoltIcon, WrenchIcon } from "@/components/icons";
import { skillGroups, relocateLocations } from "@/lib/data/portfolio";

const iconMap = {
  cooling: SnowflakeIcon,
  power: BoltIcon,
  tools: WrenchIcon,
} as const;

export function Skills() {
  return (
    <section className="block card card--soft skills" id="skills" data-aos="fade-up" suppressHydrationWarning>
      <div className="skills__head">
        <p className="eyebrow">CORE SKILLS</p>
        <AnimHead
          as="h2"
          className="skills__title"
          lines={[
            <>
              WHAT I <span className="accent">SERVICE &amp; FIX</span>
            </>,
          ]}
        />
      </div>
      <div className="skills__grid">
        {skillGroups.map((group) => {
          const Icon = iconMap[group.icon];
          return (
            <article className="skill-group" key={group.title}>
              <h3 className="skill-group__title">
                <span className="skill-group__icon" aria-hidden="true">
                  <Icon width={20} height={20} />
                </span>
                {group.title}
              </h3>
              <ul className="skill-tags">
                {group.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
      <div className="skills__foot">
        <p className="skills__locations">
          <span className="skills__foot-label">Open to relocate:</span>{" "}
          {relocateLocations}
        </p>
      </div>
    </section>
  );
}
