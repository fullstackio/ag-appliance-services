"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { AnimHead } from "@/components/common/anim-head";
import { PostCardBody } from "@/components/blog/post-card";
import { useLatestPosts } from "@/lib/hooks/use-portfolio-data";

function BlogSkeleton() {
  return (
    <div className="blog__skeleton">
      {Array.from({ length: 4 }).map((_, i) => (
        <div className="skeleton-card" key={i}>
          <span className="sk sk--icon" />
          <span className="sk sk--title" />
          <span className="sk sk--line" />
          <span className="sk sk--line short" />
        </div>
      ))}
    </div>
  );
}

export function BlogSlider() {
  const { data: posts, isPending } = useLatestPosts();

  return (
    <section className="block plain blog" id="blog" data-aos="fade-up" suppressHydrationWarning>
      <div className="blog__head">
        <p className="eyebrow">BLOG &amp; NEWS</p>
        <div className="blog__head-grid">
          <AnimHead
            as="h2"
            className="blog__title"
            lines={[
              <>
                LATEST <span className="accent">POSTS &amp;</span>
              </>,
              <span className="accent" key="insights">
                INSIGHTS
              </span>,
              "FROM THE FIELD",
            ]}
          />
          <div className="blog__head-copy">
            <p className="muted">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do
              eiusmod tempor incididunt ut labore et dolore magna — the 7 most
              recent articles.
            </p>
            <Link className="btn btn--primary btn--sm blog__viewall" href="/blog">
              View all Posts <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="blog__slider">
        {isPending || !posts ? (
          <BlogSkeleton />
        ) : (
          <Swiper
            className="blog-swiper"
            modules={[Pagination]}
            slidesPerView={1.05}
            spaceBetween={26}
            grabCursor
            speed={600}
            watchOverflow
            watchSlidesProgress
            pagination={{ clickable: true }}
            breakpoints={{
              560: { slidesPerView: 1.4 },
              900: { slidesPerView: 1.9 },
              1280: { slidesPerView: 2.5 },
            }}
          >
            {posts.map((post) => (
              <SwiperSlide
                tag="article"
                className="post"
                key={post.slug}
                data-cursor="view"
                style={{ backgroundImage: `url('${post.image}')` }}
              >
                <PostCardBody post={post} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}
