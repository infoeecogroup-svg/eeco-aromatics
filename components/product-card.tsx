'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Heart,
  Eye,
  ShoppingCart,
  Truck,
  Star,
  Flame,
  Sparkles,
  Wind,
  Droplets,
} from 'lucide-react';
import { Product } from '../context/store-context';
import { cardHoverProps } from './animations';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (id: number) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  className?: string;
  style?: React.CSSProperties;
}

export function ProductCard({
  product,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
  className = '',
  style = {},
}: ProductCardProps) {
  const getProductIcon = (type: Product['iconType']) => {
    switch (type) {
      case 'flame':
        return <Flame size={32} color="#078A83" />;
      case 'sparkles':
        return <Sparkles size={32} color="#D9003B" />;
      case 'wind':
        return <Wind size={32} color="#06666B" />;
      case 'droplets':
        return <Droplets size={32} color="#078A83" />;
      default:
        return <Sparkles size={32} color="#078A83" />;
    }
  };

  return (
    <motion.div
      className={`product-card-spec ${className}`}
      style={{ ...style }}
      {...cardHoverProps}
    >
      {/* Top Badge */}
      {product.badge ? (
        <span className="badge-discount-red">{product.badge}</span>
      ) : null}

      {/* Product Image Area */}
      <div
        className="product-card-img-wrap"
        onClick={() => onQuickView(product)}
      >
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="product-real-img"
            loading="lazy"
          />
        ) : (
          <div className="product-card-aromatic-placeholder">
            {getProductIcon(product.iconType)}
            <span>{product.category}</span>
          </div>
        )}

        {/* Quick Action Overlay on Hover */}
        <div className="quick-action-overlay">
          <button
            type="button"
            className="quick-action-btn"
            aria-label="Add to wishlist"
            title="Wishlist"
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product.id);
            }}
          >
            <Heart
              size={15}
              fill={isWishlisted ? '#D9003B' : 'none'}
              color={isWishlisted ? '#D9003B' : '#435467'}
            />
          </button>
          <button
            type="button"
            className="quick-action-btn"
            aria-label="Quick view"
            title="Quick view"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
          >
            <Eye size={15} />
          </button>
        </div>
      </div>

      {/* Card Content Area - Fixed Heights for Strict Alignment */}
      <div className="product-card-content-area">
        {/* Shipping Badge */}
        <div className="product-shipping-row">
          <span className="shipping-badge">
            <Truck size={12} />
            <span>{product.shipping || 'Courier 1-3 Days'}</span>
          </span>
        </div>

        {/* Product Title (2-Line Clamp Fixed Height) */}
        <Link href={`/product/${product.id}`} className="product-title-link">
          <h3 className="product-spec-title" title={product.name}>
            {product.name}
          </h3>
        </Link>

        {/* Star Ratings Row */}
        <div className="product-stars-row">
          <div className="stars-cluster">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={13}
                fill={i < product.rating ? '#FFB800' : '#C7CDD3'}
                color={i < product.rating ? '#FFB800' : '#C7CDD3'}
              />
            ))}
          </div>
          <span className="review-count-text">({product.reviewCount})</span>
        </div>

        {/* Pricing Row */}
        <div className="product-pricing-row">
          <span className="price-current">{product.price}</span>
          {product.originalPrice && (
            <del className="price-old-strike">{product.originalPrice}</del>
          )}
          {product.discountText && (
            <span className="discount-text-red">{product.discountText}</span>
          )}
        </div>
      </div>

      {/* Actions Row (Pinned to bottom for perfect line alignment) */}
      <div className="product-actions-row">
        <motion.button
          type="button"
          className={`btn-wishlist-circle ${isWishlisted ? 'active' : ''}`}
          onClick={() => onToggleWishlist(product.id)}
          aria-label="Add to Wishlist"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
        >
          <Heart
            size={16}
            fill={isWishlisted ? '#FFFFFF' : 'none'}
            color={isWishlisted ? '#FFFFFF' : '#65717A'}
          />
        </motion.button>

        <motion.button
          type="button"
          className="btn-add-cart-pill"
          onClick={() => onAddToCart(product)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
        >
          <ShoppingCart size={14} />
          <span>Add to Cart</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
