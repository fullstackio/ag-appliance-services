"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useReviews } from "@/lib/hooks/use-portfolio-data";
import { usePrefersReducedMotion } from "@/lib/hooks/use-media";
import type { Review } from "@/lib/types";

function Stars({ count }: { count: number }) {
  return (
    <div className="review__stars" aria-label={`${count} out of 5 stars`}>
      {"★".repeat(count)}
      {"☆".repeat(5 - count)}
    </div>
  );
}

function ReviewsSkeleton() {
  return (
    <div className="testimonials__skeleton">
      {Array.from({ length: 3 }).map((_, i) => (
        <div className="skeleton-card" key={i}>
          <span className="sk sk--line" />
          <span className="sk sk--line" />
          <span className="sk sk--line short" />
        </div>
      ))}
    </div>
  );
}

export function Testimonials() {
  const { data: reviews, isPending } = useReviews();
  const prefersReduced = usePrefersReducedMotion();

  // Clone reviews up to at least 10 so the marquee loop is always seamless.
  const slides: Review[] = [];
  if (reviews) {
    while (reviews.length && slides.length < 10) slides.push(...reviews);
  }

  return (
    <section className="block plain testimonials" id="testimonials" data-aos="fade-up" suppressHydrationWarning>
      <p className="eyebrow center">WHAT PEOPLE ARE SAYING</p>
      <blockquote className="testimonials__quote">
        &ldquo;Avijit fixed our AC the same day and later built the booking app
        for my business — <span className="accent">one person I fully trust</span>{" "}
        for the screen and the spanner&rdquo;
        <cite>
          Rahul Sen <span>Small Business Owner</span>
        </cite>
      </blockquote>

      <div className="testimonials__slider">
        {isPending || !reviews ? (
          <ReviewsSkeleton />
        ) : (
          <Swiper
            className="reviews-swiper"
            modules={[Autoplay, Pagination]}
            slidesPerView={1.2}
            spaceBetween={22}
            grabCursor
            loop={!prefersReduced}
            speed={prefersReduced ? 600 : 6000}
            autoplay={
              prefersReduced
                ? false
                : { delay: 0, disableOnInteraction: false, pauseOnMouseEnter: false }
            }
            pagination={{ clickable: true }}
            breakpoints={{
              560: { slidesPerView: 2.2 },
              900: { slidesPerView: 3.2 },
              1280: { slidesPerView: 4.2 },
            }}
          >
            {slides.map((review, i) => (
              <SwiperSlide className="review" key={i}>
                <figure>
                  <Stars count={review.stars} />
                  <blockquote>{review.quote}</blockquote>
                  <figcaption>
                    <span className="review__avatar" aria-hidden="true">
                      {review.avatar}
                    </span>
                    {review.name}
                  </figcaption>
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}
