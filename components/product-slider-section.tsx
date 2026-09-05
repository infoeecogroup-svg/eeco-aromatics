'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { Product } from '../context/store-context';
import { ProductCard } from './product-card';

interface ProductSliderSectionProps {
  title: string;
  subtitle?: string;
  viewAllLink?: string;
  viewAllText?: string;
  products: Product[];
  isWishlisted: (id: number) => boolean;
  onToggleWishlist: (id: number) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  autoPlayInterval?: number; // default 3000ms
  desktopItemsPerView?: number; // default 6, Hot Deals uses 4
  className?: string;
  headerChildren?: React.ReactNode;
  containerStyle?: React.CSSProperties;
}

export function ProductSliderSection({
  title,
  subtitle,
  viewAllLink,
  viewAllText = 'View All',
  products,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
  autoPlayInterval = 3000,
  desktopItemsPerView = 6,
  className = '',
  headerChildren,
  containerStyle,
}: ProductSliderSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(desktopItemsPerView);
  const touchStartX = useRef<number | null>(null);

  const total = products.length;

  // Calculate items per view based on viewport width (6 items on desktop by default)
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w >= 1380) {
        setItemsPerView(desktopItemsPerView); // 6 items on wide desktop
      } else if (w >= 1150) {
        setItemsPerView(Math.min(5, desktopItemsPerView)); // 5 items
      } else if (w >= 920) {
        setItemsPerView(Math.min(4, desktopItemsPerView)); // 4 items (tablets landscape)
      } else if (w >= 680) {
        setItemsPerView(Math.min(3, desktopItemsPerView)); // 3 items (tablets portrait)
      } else if (w >= 360) {
        setItemsPerView(2); // 2 cards on standard mobile devices
      } else {
        setItemsPerView(1); // 1 card on compact / narrow screens
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [desktopItemsPerView]);

  const maxIndex = Math.max(0, total - itemsPerView);

  // Auto shuffle every 3s (3000ms)
  useEffect(() => {
    if (isHovered || total <= itemsPerView) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isHovered, total, itemsPerView, maxIndex, autoPlayInterval]);

  // Reset index if products change or itemsPerView changes
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(0);
    }
  }, [products, maxIndex, currentIndex]);

  const handlePrev = () => {
    if (total <= itemsPerView) return;
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const handleNext = () => {
    if (total <= itemsPerView) return;
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  if (total === 0) return null;

  // Percentage shift calculation
  // Each card width percentage = 100 / itemsPerView
  const cardWidthPercent = 100 / itemsPerView;
  const transformPercent = -(currentIndex * cardWidthPercent);

  return (
    <div
      className={`slider-section-wrap layout-max-width ${className}`}
      style={containerStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Section Header with Title & Navigation Arrows */}
      <div className="slider-section-header">
        <div className="slider-header-left">
          <h2 className="slider-section-title">{title}</h2>
          {subtitle && <p className="slider-section-subtitle">{subtitle}</p>}
        </div>

        {headerChildren && <div className="slider-header-center">{headerChildren}</div>}

        <div className="slider-header-right">
          {viewAllLink && (
            <Link href={viewAllLink} className="slider-viewall-link">
              <span>{viewAllText}</span>
              <ArrowUpRight size={16} />
            </Link>
          )}

          <div className="slider-nav-arrows-container">
            <button
              type="button"
              className="slider-nav-btn prev"
              onClick={handlePrev}
              aria-label="Previous items"
              title="Previous"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              className="slider-nav-btn next"
              onClick={handleNext}
              aria-label="Next items"
              title="Next"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Slider Viewport and Track */}
      <div
        className="slider-viewport"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="slider-track"
          style={{
            transform: `translateX(${transformPercent}%)`,
            transition: 'transform 500ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {products.map((product, idx) => (
            <div
              key={`${product.id}-${idx}`}
              className="slider-card-cell"
              style={{
                flex: `0 0 ${cardWidthPercent}%`,
                maxWidth: `${cardWidthPercent}%`,
              }}
            >
              <ProductCard
                product={product}
                isWishlisted={isWishlisted(product.id)}
                onToggleWishlist={onToggleWishlist}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
