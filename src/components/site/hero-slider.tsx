"use client";

import Image from "next/image";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";

interface HeroSliderProps {
  images: string[];
  position?: string;
  alt: string;
}

/** Auto-rotating fade slider for the hero visual — dots only, no arrows. */
export function HeroSlider({ images, position, alt }: HeroSliderProps) {
  const slides = images.length ? images : [];
  if (slides.length <= 1) {
    return (
      <Image
        className="ph"
        src={slides[0] ?? "/images/technician.jpg"}
        alt={alt}
        fill
        sizes="(max-width: 1100px) 100vw, 800px"
        style={{ objectPosition: position }}
        priority
      />
    );
  }
  return (
    <Slider
      className="hero-slider"
      dots
      arrows={false}
      infinite
      fade
      autoplay
      autoplaySpeed={3800}
      speed={900}
      pauseOnHover={false}
      pauseOnDotsHover
      cssEase="cubic-bezier(0.4, 0, 0.2, 1)"
      dotsClass="slick-dots hero-dots"
      customPaging={(i) => (
        <button type="button" aria-label={`Show slide ${i + 1}`}>
          <span />
        </button>
      )}
    >
      {slides.map((src, i) => (
        <div className="hero-slide" key={src}>
          <Image
            className="ph"
            src={src}
            alt={i === 0 ? alt : ""}
            fill
            sizes="(max-width: 1100px) 100vw, 800px"
            style={{ objectPosition: position }}
            priority={i === 0}
          />
        </div>
      ))}
    </Slider>
  );
}
