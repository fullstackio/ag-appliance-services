import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { AnimHead } from "@/components/common/anim-head";
import { ArticleContent } from "@/components/blog/article-content";
import { PostCard } from "@/components/blog/post-card";
import { pageNav } from "@/lib/data/site";
import { pageFooterColumns } from "@/lib/data/footer";
import { posts, getPostBySlug } from "@/lib/data/posts";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Article not found — Avijit Ghosh" };
  return {
    title: `${post.title} — Avijit Ghosh`,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, images: [post.image] },
  };
}

export default async function BlogDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const tags = [...post.categories, post.moreCategory].filter(Boolean) as string[];
  const eyebrow = tags.join(" · ").toUpperCase();
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <SiteHeader links={pageNav} brandHref="/" ctaHref="/#contact" activeHref="/blog" />
      <main id="main">
        <article>
          <header
            className="block card page-hero page-hero--article"
            data-aos="fade-up"
            data-cursor="view"
            style={{ backgroundImage: `url('${post.image}')` }}
            suppressHydrationWarning
          >
            <div className="page-hero__inner">
              <ol className="breadcrumb">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/blog">Blog</Link>
                </li>
                <li>{post.title}</li>
              </ol>
              <p className="eyebrow">{eyebrow}</p>
              <AnimHead
                as="h1"
                className="page-hero__title"
                lines={post.titleLines}
              />
              <p className="article-meta">
                <span>
                  By <strong>{post.author}</strong>
                </span>
                <time dateTime={post.date}>{post.dateDisplay}</time>
                <span>{post.readTime}</span>
              </p>
            </div>
          </header>

          {/* Author bar */}
          <section className="block plain author-bar" data-aos="fade-up" suppressHydrationWarning>
            <div className="author-bar__inner">
              <div className="author-bar__id">
                <span className="author-bar__avatar" aria-hidden="true">
                  AG
                </span>
                <div>
                  <p className="author-bar__name">{post.author}</p>
                  <p className="author-bar__role">
                    Fullstack Engineer &amp; Service Pro
                  </p>
                </div>
              </div>
              <div className="author-bar__cats">
                <span className="author-bar__label">Posted in</span>
                {post.categories.map((cat) => (
                  <Link className="cat-chip" href="/blog" key={cat}>
                    {cat}
                  </Link>
                ))}
              </div>
              <ul className="author-bar__socials" aria-label="Author social links">
                <li>
                  <a href="#" aria-label="X (Twitter)">
                    X
                  </a>
                </li>
                <li>
                  <a href="#" aria-label="LinkedIn">
                    In
                  </a>
                </li>
                <li>
                  <a href="#" aria-label="GitHub">
                    Gh
                  </a>
                </li>
              </ul>
            </div>
          </section>

          {/* Article body */}
          <section className="block plain article" data-aos="fade-up" suppressHydrationWarning>
            <ArticleContent lead={post.excerpt} />

            <hr className="article__divider" />

            <div className="article__foot">
              <div className="article__tags">
                {tags.map((tag) => (
                  <Link className="article__tag" href="/blog" key={tag}>
                    {tag}
                  </Link>
                ))}
              </div>
              <Link className="btn btn--primary btn--sm article__back" href="/blog">
                ← Back to Blog
              </Link>
            </div>
          </section>
        </article>

        {/* Related posts */}
        <section className="block plain related" data-aos="fade-up" suppressHydrationWarning>
          <div className="related__head">
            <p className="eyebrow">KEEP READING</p>
            <AnimHead as="h2" className="section-title" lines={["MORE ARTICLES"]} />
          </div>
          <div className="related__grid">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter columns={pageFooterColumns} brandHref="/" quoteHref="/#contact" />
    </>
  );
}
