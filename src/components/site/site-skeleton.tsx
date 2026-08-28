/**
 * Full-page skeleton shown while the home page content streams in.
 * Reuses the mockup layout classes (.wrap, .hero, .stats …) so blocks sit exactly where the
 * real sections render — no layout shift when content arrives.
 */
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const light = "bg-brand-ink/8 dark:bg-white/8";
const onDark = "bg-white/10";

function Sk({ className, dark }: { className: string; dark?: boolean }) {
  return <Skeleton className={cn(dark ? onDark : light, className)} />;
}

function Heading({ dark }: { dark?: boolean }) {
  return (
    <div className="sec-head flex flex-col items-center gap-3">
      <Sk dark={dark} className="h-6 w-32 rounded-full" />
      <Sk dark={dark} className="h-10 w-[420px] max-w-full" />
      <Sk dark={dark} className="h-4 w-[520px] max-w-full" />
    </div>
  );
}

function Cards({ n, className, dark }: { n: number; className: string; dark?: boolean }) {
  return (
    <>
      {Array.from({ length: n }, (_, i) => (
        <Sk key={i} dark={dark} className={className} />
      ))}
    </>
  );
}

export function SiteSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading AG Appliance Services">
      {/* header */}
      <nav>
        <div className="wrap">
          <div className="brand">
            <Sk className="size-[62px] rounded-full" />
            <div className="flex flex-col gap-2">
              <Sk className="h-5 w-36" />
              <Sk className="h-3 w-24" />
            </div>
          </div>
          <ul>
            <Cards n={6} className="h-4 w-16" />
          </ul>
          <div className="nav-cta">
            <Sk className="h-[46px] w-36 rounded-[10px]" />
            <Sk className="h-[46px] w-36 rounded-[10px]" />
            <Sk className="size-[34px] rounded-full" />
          </div>
        </div>
      </nav>

      {/* hero */}
      <section className="hero">
        <div className="wrap">
          <div>
            <Sk dark className="mb-6 h-8 w-56 rounded-full" />
            <Sk dark className="mb-3 h-14 w-[90%]" />
            <Sk dark className="mb-6 h-14 w-[70%]" />
            <Sk dark className="mb-2 h-4 w-[85%]" />
            <Sk dark className="mb-2 h-4 w-[80%]" />
            <Sk dark className="mb-8 h-4 w-[60%]" />
            <div className="actions">
              <Sk dark className="h-[46px] w-40 rounded-[10px]" />
              <Sk dark className="h-[46px] w-40 rounded-[10px]" />
            </div>
            <div className="trust">
              <Cards n={4} className="h-[70px] w-full rounded-xl" dark />
            </div>
          </div>
          <Sk dark className="visual rounded-[24px]" />
        </div>
      </section>

      {/* stats */}
      <section className="stats">
        <div className="wrap">
          <Cards n={4} className="h-14 w-full rounded-lg" dark />
        </div>
      </section>

      {/* services */}
      <section className="sec services">
        <div className="wrap">
          <Heading />
          <div className="grid">
            <Cards n={8} className="h-[190px] w-full rounded-[14px]" />
          </div>
          <div className="cats">
            <Cards n={3} className="h-[180px] w-full rounded-2xl" />
          </div>
        </div>
      </section>

      {/* why */}
      <section className="sec dark why">
        <div className="wrap">
          <Heading dark />
          <div className="grid">
            <Cards n={6} className="h-[210px] w-full rounded-[14px]" dark />
          </div>
        </div>
      </section>

      {/* steps */}
      <section className="sec">
        <div className="wrap">
          <Heading />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Cards n={3} className="h-[90px] w-full rounded-xl" />
          </div>
        </div>
      </section>

      {/* video */}
      <section className="video" style={{ background: "#1a1410" }}>
        <div className="wrap">
          <Sk dark className="mb-5 h-8 w-56 rounded-full" />
          <Sk dark className="mb-4 h-12 w-[640px] max-w-full" />
          <Sk dark className="mb-8 h-4 w-[560px] max-w-full" />
          <div className="actions">
            <Sk dark className="h-[52px] w-44 rounded-[10px]" />
            <Sk dark className="h-[52px] w-44 rounded-[10px]" />
          </div>
        </div>
      </section>

      {/* testimonials */}
      <section className="sec dark testi">
        <div className="wrap">
          <Heading dark />
          <div className="row">
            <Cards n={4} className="h-[230px] w-full rounded-2xl" dark />
          </div>
        </div>
      </section>

      {/* gallery */}
      <section className="sec gallery">
        <div className="wrap">
          <Heading />
          <div className="tabs flex justify-center gap-2">
            <Cards n={5} className="h-9 w-24 rounded-full" />
          </div>
          <div className="grid">
            <Sk className="g big rounded-[18px]" />
            <Sk className="g rounded-[18px]" />
            <Sk className="g tall rounded-[18px]" />
            <Sk className="g rounded-[18px]" />
            <Sk className="g wide rounded-[18px]" />
            <Sk className="g rounded-[18px]" />
          </div>
        </div>
      </section>

      {/* brands */}
      <section className="sec brands">
        <div className="wrap">
          <Heading />
          <div className="flex flex-col gap-10 py-6">
            <Cards n={3} className="h-8 w-full rounded-md" />
          </div>
        </div>
      </section>

      {/* areas */}
      <section className="sec dark areas">
        <div className="wrap">
          <div>
            <Sk dark className="mb-4 h-6 w-40 rounded-full" />
            <Sk dark className="mb-6 h-10 w-[80%]" />
            <ul>
              <Cards n={16} className="h-4 w-full" dark />
            </ul>
          </div>
          <Sk dark className="map rounded-[20px]" />
        </div>
      </section>

      {/* faqs */}
      <section className="sec faq">
        <div className="wrap">
          <Heading />
          <div className="cols">
            <Cards n={10} className="h-[54px] w-full rounded-[10px]" />
          </div>
        </div>
      </section>

      {/* cta band */}
      <section className="cta" style={{ padding: "0 0 70px" }}>
        <div className="wrap" style={{ background: "none", boxShadow: "none", padding: 0 }}>
          <Sk className="h-[140px] w-full rounded-[18px]" />
        </div>
      </section>

      {/* footer */}
      <footer>
        <div className="wrap">
          <div className="cols">
            <Cards n={4} className="h-[240px] w-full rounded-xl" dark />
          </div>
          <div className="copy">
            <Sk dark className="h-3 w-72" />
            <Sk dark className="h-3 w-48" />
          </div>
        </div>
      </footer>
    </div>
  );
}
