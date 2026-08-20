'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../context/store-context';
import { ProductCard } from './product-card';

interface ProductCarouselProps {
  products: Product[];
  isWishlisted: (id: number) => boolean;
  onToggleWishlist: (id: number) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  autoPlayInterval?: number; // default 3000ms (3s)
  customArrowControls?: boolean;
}

export function ProductCarousel({
  products,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
  autoPlayInterval = 3000,
}: ProductCarouselProps) {
  const [startIndex, setStartIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const containerRef = useRef<HTMLDivElement>(null);

  // Responsive visible count (6 on desktop)
  useEffect(() => {
    const updateVisibleCount = () => {
      if (typeof window === 'undefined') return;
      const w = window.innerWidth;
      if (w >= 1380) {
        setVisibleCount(6);
      } else if (w >= 1150) {
        setVisibleCount(5);
      } else if (w >= 920) {
        setVisibleCount(4);
      } else if (w >= 680) {
        setVisibleCount(3);
      } else if (w >= 360) {
        setVisibleCount(2);
      } else {
        setVisibleCount(1);
      }
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  const total = products.length;

  // Auto shuffle every 3 seconds (3000ms)
  useEffect(() => {
    if (isPaused || total <= visibleCount) return;

    const timer = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % total);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [isPaused, total, visibleCount, autoPlayInterval]);

  const handlePrev = () => {
    if (total === 0) return;
    setStartIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    if (total === 0) return;
    setStartIndex((prev) => (prev + 1) % total);
  };

  if (total === 0) {
    return null;
  }

  // Generate the window of visible products with wrap-around
  const displayedProducts = [];
  const countToDisplay = Math.min(total, visibleCount);
  for (let i = 0; i < countToDisplay; i++) {
    const itemIndex = (startIndex + i) % total;
    displayedProducts.push({
      item: products[itemIndex],
      uniqueKey: `${products[itemIndex].id}-${itemIndex}-${startIndex}-${i}`,
    });
  }

  return (
    <div
      className="product-carousel-wrapper"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      ref={containerRef}
    >
      <div className="product-carousel-track">
        {displayedProducts.map(({ item, uniqueKey }) => (
          <div key={uniqueKey} className="product-carousel-item-wrap">
            <ProductCard
              product={item}
              isWishlisted={isWishlisted(item.id)}
              onToggleWishlist={onToggleWishlist}
              onQuickView={onQuickView}
              onAddToCart={onAddToCart}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

interface SectionCarouselHeaderProps {
  title: string;
  subtitle?: string;
  viewAllLink?: string;
  viewAllText?: string;
  onPrev: () => void;
  onNext: () => void;
  children?: React.ReactNode;
}

export function SectionCarouselHeader({
  title,
  subtitle,
  viewAllLink,
  viewAllText = 'View All',
  onPrev,
  onNext,
  children,
}: SectionCarouselHeaderProps) {
  return (
    <div className="section-carousel-header">
      <div className="section-header-titles">
        <h2 className="section-title-main">{title}</h2>
        {subtitle && <p className="section-subtitle-text">{subtitle}</p>}
      </div>

      {children && <div className="section-header-custom-controls">{children}</div>}

      <div className="section-header-actions">
        {viewAllLink && (
          <a href={viewAllLink} className="section-viewall-link">
            <span>{viewAllText}</span>
            <ChevronRight size={16} />
          </a>
        )}

        <div className="carousel-nav-arrows-group">
          <button
            type="button"
            className="carousel-nav-arrow-btn"
            onClick={onPrev}
            aria-label="Previous products"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            className="carousel-nav-arrow-btn"
            onClick={onNext}
            aria-label="Next products"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
