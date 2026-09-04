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
      dots={false}
      arrows={false}
      infinite
      fade
      autoplay
      autoplaySpeed={3800}
      speed={900}
      pauseOnHover={false}
      cssEase="cubic-bezier(0.4, 0, 0.2, 1)"
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
