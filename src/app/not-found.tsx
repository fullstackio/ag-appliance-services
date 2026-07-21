import Link from "next/link";
import { AnimHead } from "@/components/common/anim-head";
import { BackgroundDeco } from "@/components/layout/background-deco";

export default function NotFound() {
  return (
    <main id="main" className="notfound">
      <BackgroundDeco />
      <div className="notfound__scan" aria-hidden="true">
        <span className="hero__scan-line" />
      </div>
      <div className="notfound__inner">
        <p className="eyebrow center">ERROR 404</p>
        <AnimHead as="h1" className="notfound__code" lines={["404"]} />
        <AnimHead
          as="h2"
          className="notfound__title"
          lines={["THIS PAGE TOOK", "A WRONG TURN"]}
        />
        <p className="notfound__copy">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s
          get you back on track.
        </p>
        <div className="notfound__actions">
          <span className="animated-border-box">
            <Link className="btn btn--pill" href="/">
              Back Home <span aria-hidden="true">↗</span>
            </Link>
          </span>
          <Link className="btn btn--outline" href="/blog">
            Read the Blog
          </Link>
        </div>
        <Link className="brand brand--sm notfound__brand" href="/">
          <span className="brand__mark" aria-hidden="true" />
          <span className="brand__name">Avijit&nbsp;Ghosh</span>
        </Link>
      </div>
    </main>
  );
}
