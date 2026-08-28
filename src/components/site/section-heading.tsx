interface SectionHeadingProps {
  pill?: string;
  heading?: string;
  accent?: string;
  subtitle?: string;
}

export function AccentHeading({ heading, accent }: { heading?: string; accent?: string }) {
  return (
    <>
      {heading}
      {accent ? (
        <>
          {" "}
          <span className="accent">{accent}</span>
        </>
      ) : null}
    </>
  );
}

export function SectionHeading({ pill, heading, accent, subtitle }: SectionHeadingProps) {
  return (
    <div className="sec-head">
      {pill ? <span className="pill">{pill}</span> : null}
      <h2>
        <AccentHeading heading={heading} accent={accent} />
      </h2>
      {subtitle ? <p>{subtitle}</p> : null}
    </div>
  );
}
