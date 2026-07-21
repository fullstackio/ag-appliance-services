"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { AnimHead } from "@/components/common/anim-head";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { projects } from "@/lib/data/portfolio";

export function Projects() {
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);
  const [pagEl, setPagEl] = useState<HTMLElement | null>(null);

  return (
    <section className="block plain projects" id="projects" data-aos="fade-up" suppressHydrationWarning>
      <div className="projects__head">
        <p className="eyebrow">SELECTED WORK</p>
        <div className="projects__head-grid">
          <AnimHead
            as="h2"
            className="projects__title"
            lines={[
              <>
                FEATURED <span className="accent">PROJECTS</span>
              </>,
            ]}
          />
          <p className="muted projects__head-copy">
            A slice of recent builds across e-commerce, health, ERP and insurance
            — from WordPress &amp; WooCommerce to React and Angular.
          </p>
        </div>
      </div>

      <div className="projects__slider">
        <Swiper
          className="projects-swiper"
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
            900: { slidesPerView: 2.1 },
            1280: { slidesPerView: 2.6 },
          }}
        >
          {projects.map((project) => (
            <SwiperSlide className="project-card" key={project.name}>
              <span className="project-card__role">{project.role}</span>
              <h3 className="project-card__name">{project.name}</h3>
              <p className="project-card__sub">{project.sub}</p>
              <p className="project-card__desc">{project.description}</p>
              <ul className="project-card__tags">
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <a
                className="project-card__link"
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit site <span aria-hidden="true">↗</span>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="projects__nav">
          <button
            className="slider-btn projects-prev"
            type="button"
            aria-label="Previous project"
            ref={setPrevEl}
          >
            <ChevronLeftIcon width={20} height={20} aria-hidden="true" />
          </button>
          <div className="projects-pagination swiper-pagination" ref={setPagEl} />
          <button
            className="slider-btn projects-next"
            type="button"
            aria-label="Next project"
            ref={setNextEl}
          >
            <ChevronRightIcon width={20} height={20} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
