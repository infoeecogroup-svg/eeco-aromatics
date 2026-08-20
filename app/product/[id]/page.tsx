'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Star,
  Heart,
  ShoppingCart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Flame,
  Wind,
  Droplets,
  Plus,
  Minus,
  MessageCircle,
  Share2,
  CheckCircle2,
} from 'lucide-react';
import { useStore, Product } from '../../../context/store-context';
import { TopBar } from '../../../components/top-bar';
import { Header } from '../../../components/header';
import { Navigation } from '../../../components/navigation';
import { Footer } from '../../../components/footer';
import { CartDrawer } from '../../../components/cart-drawer';
import { AnimatedSection, AnimatedGrid, fadeUpVariant, cardHoverProps } from '../../../components/animations';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { products, addToCart, toggleWishlist, isInWishlist, settings, showToast } = useStore();

  const [cartOpen, setCartOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'ingredients' | 'reviews'>('desc');

  const productId = Number(params?.id);
  const product = products.find((p) => p.id === productId) || products[0];

  if (!product) {
    return (
      <div style={{ padding: '80px', textAlign: 'center' }}>
        <h2>Product not found</h2>
        <Link href="/shop" style={{ color: '#1A56DB', fontWeight: 700 }}>Return to Shop</Link>
      </div>
    );
  }

  const isLiked = isInWishlist(product.id);

  const getProductIcon = (type: Product['iconType']) => {
    switch (type) {
      case 'flame': return <Flame size={48} color="#059669" />;
      case 'sparkles': return <Sparkles size={48} color="#E11D48" />;
      case 'wind': return <Wind size={48} color="#1A56DB" />;
      case 'droplets': return <Droplets size={48} color="#A855F7" />;
      default: return <Sparkles size={48} color="#1A56DB" />;
    }
  };

  const handleWhatsAppBuyNow = () => {
    const msg = `*DIRECT PRODUCT INQUIRY / ORDER*\n\n*Product:* ${product.name}\n*Price:* ${product.price}\n*Quantity:* ${quantity}\n\nPlease confirm availability and delivery for my address!`;
    window.open(`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <TopBar />
      <Header onOpenCart={() => setCartOpen(true)} />
      <Navigation />

      <div className="product-detail-container layout-max-width">
        {/* Breadcrumb */}
        <div className="shop-breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/shop">Shop</Link>
          <span>/</span>
          <Link href={`/shop?category=${encodeURIComponent(product.category)}`}>{product.category}</Link>
          <span>/</span>
          <span style={{ color: '#111827', fontWeight: 700 }}>{product.name}</span>
        </div>

        {/* Main Product Section */}
        <div className="product-detail-grid">
          {/* Left Column: Image Gallery */}
          <div>
            <div className="gallery-main-image">
              {product.badge && (
                <span
                  style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    background: '#E11D48',
                    color: '#FFFFFF',
                    fontWeight: 800,
                    fontSize: '13px',
                    padding: '6px 14px',
                    borderRadius: '999px',
                  }}
                >
                  {product.badge}
                </span>
              )}
              {product.image ? (
                <img src={product.image} alt={product.name} />
              ) : (
                <div style={{ textAlign: 'center' }}>
                  {getProductIcon(product.iconType)}
                  <h4 style={{ marginTop: '12px', color: '#1A56DB', fontWeight: 700 }}>{product.category}</h4>
                </div>
              )}
            </div>

            {/* Purity Guarantee Badges */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '20px' }}>
              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '12px', borderRadius: '12px', textAlign: 'center' }}>
                <ShieldCheck size={20} color="#059669" style={{ margin: '0 auto 4px auto' }} />
                <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#374151', display: 'block' }}>100% Herbal Purity</span>
              </div>
              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '12px', borderRadius: '12px', textAlign: 'center' }}>
                <Truck size={20} color="#1A56DB" style={{ margin: '0 auto 4px auto' }} />
                <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#374151', display: 'block' }}>Cash on Delivery</span>
              </div>
              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '12px', borderRadius: '12px', textAlign: 'center' }}>
                <RotateCcw size={20} color="#059669" style={{ margin: '0 auto 4px auto' }} />
                <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#374151', display: 'block' }}>Govt. Registered</span>
              </div>
            </div>
          </div>

          {/* Right Column: Product Specs & Actions */}
          <div>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#1A56DB', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {product.category} • {settings.storeName}
            </span>

            <h1 className="product-info-title">{product.name}</h1>

            {/* Stars & Reviews */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', gap: '2px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={17} fill="#F59E0B" color="#F59E0B" />
                ))}
              </div>
              <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#111827' }}>5.0</span>
              <span style={{ fontSize: '13px', color: '#6B7280' }}>({product.reviewCount} customer reviews)</span>
            </div>

            {/* Price & Savings */}
            <div className="product-info-price-row">
              <span className="product-info-current-price">{product.price}</span>
              <del style={{ fontSize: '18px', color: '#9CA3AF' }}>{product.originalPrice}</del>
              {product.discountText && (
                <span style={{ background: '#FEE2E2', color: '#E11D48', fontSize: '12px', fontWeight: 800, padding: '4px 10px', borderRadius: '999px' }}>
                  {product.discountText}
                </span>
              )}
            </div>

            {/* Description */}
            <p style={{ fontSize: '14.5px', color: '#4B5563', lineHeight: 1.6, marginBottom: '24px' }}>
              {product.description || 'Finest quality Sri Lankan traditional aroma blend carefully prepared with natural essential herbs and essential extracts for daily worship, meditation, and home ambiance.'}
            </p>

            {/* Scent Notes / Highlights */}
            {product.scentNotes && (
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '13.5px', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>Aroma Profile &amp; Notes:</h4>
                <div className="scent-notes-grid">
                  {product.scentNotes.map((note, idx) => (
                    <span key={idx} className="scent-note-pill">
                      🌿 {note}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Burning Duration */}
            {product.burnTime && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: '#374151', marginBottom: '24px' }}>
                <Sparkles size={16} color="#1A56DB" />
                <span>Duration / Specifications: <strong>{product.burnTime}</strong></span>
              </div>
            )}

            {/* Quantity Selector & Action Buttons */}
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '20px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1.5px solid #E5E7EB',
                  borderRadius: '10px',
                  padding: '4px 12px',
                  height: '48px',
                  gap: '12px',
                }}
              >
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                >
                  <Minus size={16} />
                </button>
                <span style={{ fontSize: '16px', fontWeight: 700, minWidth: '24px', textAlign: 'center' }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                >
                  <Plus size={16} />
                </button>
              </div>

              <motion.button
                style={{
                  flex: 1,
                  height: '48px',
                  backgroundColor: 'var(--primary-teal)',
                  color: '#FFFFFF',
                  borderRadius: '999px',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '14.5px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  boxShadow: '0 6px 18px rgba(7, 138, 131, 0.3)',
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  addToCart(product, quantity);
                }}
              >
                <ShoppingCart size={18} />
                <span>Add {quantity} to Cart</span>
              </motion.button>

              <motion.button
                onClick={() => toggleWishlist(product.id)}
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  border: '1.5px solid #E5E7EB',
                  background: isLiked ? '#D9003B' : '#FFFFFF',
                  color: isLiked ? '#FFFFFF' : '#374151',
                  display: 'grid',
                  placeItems: 'center',
                  cursor: 'pointer',
                }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
              >
                <Heart size={20} fill={isLiked ? '#FFFFFF' : 'none'} />
              </motion.button>
            </div>

            {/* Direct Instant WhatsApp Buy Now Button */}
            <motion.button
              style={{
                width: '100%',
                backgroundColor: '#25D366',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '999px',
                padding: '14px',
                fontWeight: 700,
                fontSize: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                cursor: 'pointer',
                boxShadow: '0 6px 18px rgba(37, 211, 102, 0.3)',
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleWhatsAppBuyNow}
            >
              <MessageCircle size={20} />
              <span>Instant Buy via WhatsApp Support</span>
            </motion.button>
          </div>
        </div>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <div style={{ marginTop: '70px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#111827', marginBottom: '24px' }}>
              Frequently Bought Together
            </h2>
            <AnimatedGrid style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
              {relatedProducts.map((rel) => {
                const relLiked = isInWishlist(rel.id);
                return (
                  <motion.div
                    className="product-card-spec"
                    key={rel.id}
                    variants={fadeUpVariant}
                    {...cardHoverProps}
                  >
                    <div
                      className="product-card-img-wrap"
                      style={{ cursor: 'pointer' }}
                      onClick={() => router.push(`/product/${rel.id}`)}
                    >
                      {rel.image ? (
                        <img src={rel.image} alt={rel.name} className="product-real-img" />
                      ) : (
                        <div className="product-card-aromatic-placeholder">
                          {getProductIcon(rel.iconType)}
                          <span>{rel.category}</span>
                        </div>
                      )}
                    </div>

                    <Link href={`/product/${rel.id}`} style={{ textDecoration: 'none' }}>
                      <h3 className="product-spec-title">{rel.name}</h3>
                    </Link>

                    <div className="product-pricing-row">
                      <span className="price-current">{rel.price}</span>
                      <del className="price-old-strike">{rel.originalPrice}</del>
                    </div>

                    <div className="product-actions-row">
                      <motion.button
                        className="btn-add-cart-pill"
                        onClick={() => addToCart(rel)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>Add to Cart</span>
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatedGrid>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
