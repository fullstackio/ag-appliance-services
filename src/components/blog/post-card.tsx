import Link from "next/link";
import { AnimHead } from "@/components/common/anim-head";
import { PostTagIcon } from "@/components/icons";
import type { Post } from "@/lib/types";

/** Inner content shared by the slider slide and the listing card. */
export function PostCardBody({ post }: { post: Post }) {
  return (
    <div className="post__body">
      <p className="post__cats">
        <PostTagIcon className="post__ico" width={14} height={14} aria-hidden="true" />
        {post.categories.map((cat) => (
          <Link className="post__cat" href="/blog" key={cat}>
            {cat}
          </Link>
        ))}
        {post.moreCategory && (
          <span className="post__cat-more" title={post.moreCategory} aria-hidden="true">
            [..]
          </span>
        )}
      </p>
      <Link
        className="post__title-link"
        href={`/blog/${post.slug}`}
        aria-label={`Read: ${post.title}`}
      >
        <AnimHead as="h3" className="post__title" lines={post.titleLines} />
      </Link>
      <p className="post__meta">
        <span className="post__author">{post.author}</span> ·{" "}
        <time dateTime={post.date}>{post.dateDisplay}</time>
      </p>
    </div>
  );
}

/** Listing-page card (plain <article> with filter data attributes). */
export function PostCard({ post }: { post: Post }) {
  return (
    <article
      className="post"
      data-cursor="view"
      data-category={post.categoryTokens}
      data-date={post.date}
      data-title={post.title.toLowerCase()}
      style={{ backgroundImage: `url('${post.image}')` }}
    >
      <PostCardBody post={post} />
    </article>
  );
}
