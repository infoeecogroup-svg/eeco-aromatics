'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { EASE_ULTRA_SMOOTH } from './animations';

interface BannerSlide {
  id: number;
  image: string;
  alt: string;
}

const DEFAULT_BANNER_SLIDES: BannerSlide[] = [
  {
    id: 1,
    image: '/xtrime_aroma_banner.jpg',
    alt: 'EECO XTRIME AROMA Combo Bundle Promotion',
  },
  {
    id: 2,
    image: '/banner_incense_packs.jpg',
    alt: 'EECO 14-in-1 Fragrance Incense Sticks Value Pack',
  },
  {
    id: 3,
    image: '/banner_room_diffuser.jpg',
    alt: 'EECO Luxury Room Diffusers 12 Scents',
  },
  {
    id: 4,
    image: '/banner_cinnamon_dhoop.jpg',
    alt: 'EECO Pure Organic Cinnamon Dhoop Incense Powder',
  },
];

interface HeroBannerSliderProps {
  slides?: BannerSlide[];
  autoPlayInterval?: number; // 3500ms
}

export function HeroBannerSlider({
  slides = DEFAULT_BANNER_SLIDES,
  autoPlayInterval = 3500,
}: HeroBannerSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const total = slides.length;

  useEffect(() => {
    if (isPaused || total <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [isPaused, total, autoPlayInterval]);

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const currentSlide = slides[currentIndex] || slides[0];

  return (
    <div
      className="hero-banner-aligned-wrap layout-max-width"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Link
        href="/combo-bundle"
        className="hero-banner-link-wrapper"
        aria-label="View Combo Bundle Offers"
      >
        <div className="hero-banner-slide-stage">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="hero-banner-slide-item"
              initial={{ opacity: 0, scale: 1.01 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.55, ease: EASE_ULTRA_SMOOTH }}
            >
              <img
                src={currentSlide.image}
                alt={currentSlide.alt}
                className="hero-banner-pure-img"
              />
            </motion.div>
          </AnimatePresence>

          {/* Left Arrow Button */}
          <button
            type="button"
            className="hero-banner-nav-arrow left"
            onClick={handlePrev}
            aria-label="Previous banner"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            className="hero-banner-nav-arrow right"
            onClick={handleNext}
            aria-label="Next banner"
          >
            <ChevronRight size={24} />
          </button>

          {/* Scalloped Pagination Dots */}
          <div
            className="hero-banner-pagination-dots"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`hero-banner-dot ${currentIndex === idx ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
}
