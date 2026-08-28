import type { ReactNode } from "react";

import Link from "next/link";

interface LegalPageProps {
  pill: string;
  title: string;
  accent?: string;
  updated: string;
  intro: string;
  children: ReactNode;
}

/** Article shell shared by the three legal pages. */
export function LegalPage({ pill, title, accent, updated, intro, children }: LegalPageProps) {
  return (
    <article>
      <header className="legal-head">
        <span className="pill">{pill}</span>
        <h1>
          {title} {accent ? <span className="accent">{accent}</span> : null}
        </h1>
        <p className="lede">{intro}</p>
        <p className="meta">Last updated: {updated}</p>
      </header>
      <div className="legal-body">{children}</div>
      <footer className="legal-foot">
        <Link href="/" className="back">
          ← Back to homepage
        </Link>
      </footer>
    </article>
  );
}
