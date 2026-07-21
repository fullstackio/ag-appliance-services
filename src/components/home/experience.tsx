"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { AnimHead } from "@/components/common/anim-head";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { experience } from "@/lib/data/portfolio";

export function Experience() {
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);
  const [pagEl, setPagEl] = useState<HTMLElement | null>(null);

  return (
    <section className="block plain experience" id="experience" data-aos="fade-up" suppressHydrationWarning>
      <div className="exp__head">
        <p className="eyebrow">CAREER TIMELINE</p>
        <div className="exp__head-grid">
          <AnimHead
            as="h2"
            className="exp__title"
            lines={[
              <>
                WORK <span className="accent">EXPERIENCE</span>
              </>,
              "& KEY ROLES",
            ]}
          />
          <p className="muted exp__head-copy">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do
            eiusmod tempor incididunt ut labore. Drag, swipe or use the arrows
            to move through the timeline.
          </p>
        </div>
      </div>

      <div className="exp__slider">
        <Swiper
          className="exp-swiper"
          modules={[Navigation, Pagination]}
          slidesPerView={1.05}
          spaceBetween={22}
          grabCursor
          speed={600}
          watchOverflow
          navigation={{ prevEl, nextEl }}
          pagination={{ el: pagEl, clickable: true }}
          breakpoints={{
            560: { slidesPerView: 1.5 },
            900: { slidesPerView: 2.2 },
            1280: { slidesPerView: 3.1 },
          }}
        >
          {experience.map((item) => (
            <SwiperSlide className="exp-card" key={item.period}>
              <span className="exp-card__period">{item.period}</span>
              <h3 className="exp-card__role">{item.role}</h3>
              <p className="exp-card__org">
                {item.org} <span>{item.location}</span>
              </p>
              <ul className="exp-card__list">
                {item.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="exp__nav">
          <button
            className="slider-btn exp-prev"
            type="button"
            aria-label="Previous role"
            ref={setPrevEl}
          >
            <ChevronLeftIcon width={20} height={20} aria-hidden="true" />
          </button>
          <div className="exp-pagination swiper-pagination" ref={setPagEl} />
          <button
            className="slider-btn exp-next"
            type="button"
            aria-label="Next role"
            ref={setNextEl}
          >
            <ChevronRightIcon width={20} height={20} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
