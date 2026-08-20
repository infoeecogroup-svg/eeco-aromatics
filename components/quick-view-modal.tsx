'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ShoppingCart, Heart, Truck, CheckCircle2, ShieldCheck, Flame, Sparkles, Wind, Droplets } from 'lucide-react';
import { EASE_ULTRA_SMOOTH } from './animations';

export interface QuickViewProduct {
  id: number;
  badge?: string;
  category: string;
  name: string;
  price: string;
  originalPrice: string;
  discountText?: string;
  rating: number;
  reviewCount: number;
  shipping?: string;
  storeCategory?: string;
  iconType: 'flame' | 'sparkles' | 'wind' | 'droplets';
  image?: string;
}

interface QuickViewModalProps {
  product: QuickViewProduct | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: any, quantity: number) => void;
  onToggleWishlist: (id: number) => void;
  isWishlisted: boolean;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}) => {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const getProductIcon = (type: string) => {
    switch (type) {
      case 'flame': return <Flame size={48} color="#059669" />;
      case 'sparkles': return <Sparkles size={48} color="#E11D48" />;
      case 'wind': return <Wind size={48} color="#1A56DB" />;
      case 'droplets': return <Droplets size={48} color="#A855F7" />;
      default: return <Sparkles size={48} color="#1A56DB" />;
    }
  };

  const handleWhatsAppOrder = () => {
    const msg = `Hi EECO AROMATICS! I want to order ${quantity}x "${product.name}" (${product.price} each).`;
    window.open(`https://wa.me/940762051906?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="quick-view-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <motion.div
            className="quick-view-dialog"
            initial={{ opacity: 0, scale: 0.92, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 25 }}
            transition={{ duration: 0.35, ease: EASE_ULTRA_SMOOTH }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#FFFFFF',
              borderRadius: '24px',
              maxWidth: '820px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              position: 'relative',
              boxShadow: '0 25px 60px -15px rgba(15, 23, 42, 0.3)',
              padding: '36px',
            }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '18px',
                right: '18px',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: '#F3F4F6',
                border: 'none',
                display: 'grid',
                placeItems: 'center',
                cursor: 'pointer',
                color: '#6B7280',
                transition: 'all 0.2s',
              }}
              aria-label="Close dialog"
            >
              <X size={18} />
            </button>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '32px',
              }}
            >
              {/* Left Column: Image */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#F8FAFC',
                  borderRadius: '18px',
                  padding: '30px',
                  border: '1px solid #E2E8F0',
                }}
              >
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '260px',
                      objectFit: 'contain',
                      borderRadius: '12px',
                    }}
                  />
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '12px',
                    }}
                  >
                    {getProductIcon(product.iconType)}
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#1A56DB' }}>
                      {product.category}
                    </span>
                  </div>
                )}

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginTop: '20px',
                    color: '#059669',
                    fontSize: '12px',
                    fontWeight: 700,
                    background: 'rgba(5, 150, 105, 0.1)',
                    padding: '6px 14px',
                    borderRadius: '999px',
                  }}
                >
                  <Truck size={14} />
                  <span>Doorstep Delivery Across Sri Lanka</span>
                </div>
              </div>

              {/* Right Column: Details & Actions */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      color: '#1A56DB',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                    }}
                  >
                    EECO AROMATICS • {product.category}
                  </span>

                  <h2
                    style={{
                      fontSize: '22px',
                      fontWeight: 800,
                      color: '#0F172A',
                      lineHeight: 1.3,
                      marginTop: '6px',
                      marginBottom: '12px',
                    }}
                  >
                    {product.name}
                  </h2>

                  {/* Rating */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          fill={i < product.rating ? '#F59E0B' : '#E2E8F0'}
                          color={i < product.rating ? '#F59E0B' : '#E2E8F0'}
                        />
                      ))}
                    </div>
                    <span style={{ fontSize: '13px', color: '#64748B', fontWeight: 600 }}>
                      ({product.reviewCount} customer reviews)
                    </span>
                  </div>

                  {/* Price */}
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '18px' }}>
                    <span style={{ fontSize: '24px', fontWeight: 800, color: '#1A56DB' }}>
                      {product.price}
                    </span>
                    {product.originalPrice && (
                      <del style={{ fontSize: '15px', color: '#94A3B8', fontWeight: 500 }}>
                        {product.originalPrice}
                      </del>
                    )}
                    {product.discountText && (
                      <span
                        style={{
                          fontSize: '12px',
                          fontWeight: 800,
                          color: '#E11D48',
                          background: 'rgba(225, 29, 72, 0.1)',
                          padding: '2px 8px',
                          borderRadius: '4px',
                        }}
                      >
                        {product.discountText}
                      </span>
                    )}
                  </div>

                  <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.55, marginBottom: '20px' }}>
                    Handcrafted premium natural formulation by EECO AROMATICS. Long-lasting therapeutic aroma designed for meditation, sacred worship, and room freshness.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '22px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: '#334155' }}>
                      <CheckCircle2 size={16} color="#059669" />
                      <span>100% Genuine Sri Lankan Herbal Aromatic Product</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: '#334155' }}>
                      <ShieldCheck size={16} color="#059669" />
                      <span>Cash on Delivery &amp; Fast Islandwide Courier Available</span>
                    </div>
                  </div>
                </div>

                {/* Actions & Quantity */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        border: '1.5px solid #E2E8F0',
                        borderRadius: '999px',
                        padding: '4px 12px',
                        gap: '12px',
                      }}
                    >
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        style={{ fontSize: '16px', fontWeight: 700, cursor: 'pointer', padding: '0 4px', border: 'none', background: 'none' }}
                      >
                        -
                      </button>
                      <span style={{ fontSize: '14px', fontWeight: 700, minWidth: '20px', textAlign: 'center' }}>
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity((q) => q + 1)}
                        style={{ fontSize: '16px', fontWeight: 700, cursor: 'pointer', padding: '0 4px', border: 'none', background: 'none' }}
                      >
                        +
                      </button>
                    </div>

                    <motion.button
                      onClick={() => onToggleWishlist(product.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '50%',
                        border: isWishlisted ? 'none' : '1.5px solid #E2E8F0',
                        backgroundColor: isWishlisted ? '#E11D48' : '#FFFFFF',
                        color: isWishlisted ? '#FFFFFF' : '#475569',
                        display: 'grid',
                        placeItems: 'center',
                        cursor: 'pointer',
                      }}
                    >
                      <Heart size={18} fill={isWishlisted ? '#FFFFFF' : 'none'} />
                    </motion.button>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <motion.button
                      onClick={() => {
                        onAddToCart(product, quantity);
                        onClose();
                      }}
                      whileHover={{ scale: 1.02, backgroundColor: '#1E3A8A' }}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        flex: 1,
                        backgroundColor: '#1A56DB',
                        color: '#FFFFFF',
                        padding: '12px 20px',
                        borderRadius: '999px',
                        fontWeight: 700,
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        cursor: 'pointer',
                        boxShadow: '0 6px 16px rgba(26, 86, 219, 0.3)',
                      }}
                    >
                      <ShoppingCart size={16} />
                      <span>Add to Cart</span>
                    </motion.button>

                    <motion.button
                      onClick={handleWhatsAppOrder}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        flex: 1,
                        backgroundColor: '#25D366',
                        color: '#FFFFFF',
                        padding: '12px 20px',
                        borderRadius: '999px',
                        fontWeight: 700,
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        cursor: 'pointer',
                        boxShadow: '0 6px 16px rgba(37, 211, 102, 0.3)',
                      }}
                    >
                      <span>WhatsApp Order</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
