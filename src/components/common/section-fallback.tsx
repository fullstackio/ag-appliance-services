/** Lightweight placeholder shown while a lazily-loaded section chunk streams in. */
export function SectionFallback() {
  return (
    <section className="block plain" aria-hidden="true">
      <div className="section-fallback">
        <span className="sk sk--title" />
        <span className="sk sk--line" />
        <span className="sk sk--line short" />
      </div>
    </section>
  );
}
