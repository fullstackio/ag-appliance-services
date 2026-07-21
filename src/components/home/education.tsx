import { AnimHead } from "@/components/common/anim-head";
import { educationAcademics, educationCertifications } from "@/lib/data/portfolio";
import type { EducationItem } from "@/lib/types";

function Timeline({ items }: { items: EducationItem[] }) {
  return (
    <ol className="edu-timeline">
      {items.map((item) => (
        <li className="edu-item" key={item.name}>
          <span className="edu-item__date">{item.date}</span>
          <h3 className="edu-item__name">{item.name}</h3>
          <p className="edu-item__org">{item.org}</p>
        </li>
      ))}
    </ol>
  );
}

export function Education() {
  return (
    <section className="block plain education" id="education" data-aos="fade-up" suppressHydrationWarning>
      <div className="edu__grid">
        <div className="edu__col">
          <p className="eyebrow">EDUCATION</p>
          <AnimHead as="h2" className="edu__title" lines={["ACADEMICS"]} />
          <Timeline items={educationAcademics} />
        </div>
        <div className="edu__col">
          <p className="eyebrow">CERTIFICATIONS</p>
          <AnimHead as="h2" className="edu__title" lines={["TRAINING"]} />
          <Timeline items={educationCertifications} />
        </div>
      </div>
    </section>
  );
}
