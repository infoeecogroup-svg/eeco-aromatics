'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Heart,
  ShoppingCart,
  Trash2,
  ArrowRight,
  Sparkles,
  MessageCircle,
} from 'lucide-react';
import { useStore } from '../../context/store-context';
import { TopBar } from '../../components/top-bar';
import { Header } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { Footer } from '../../components/footer';
import { CartDrawer } from '../../components/cart-drawer';
import { AnimatedSection, AnimatedGrid, fadeUpVariant } from '../../components/animations';

export default function WishlistPage() {
  const { wishlist, products, toggleWishlist, addToCart, settings, showToast } = useStore();
  const [cartOpen, setCartOpen] = useState(false);

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  const handleOrderWishlistWhatsApp = () => {
    if (wishlistedProducts.length === 0) return;
    const itemsList = wishlistedProducts
      .map((p, idx) => `${idx + 1}. ${p.name} - ${p.price}`)
      .join('\n');
    const msg = `*WISHLIST ORDER INQUIRY*\n\n*Saved Items:*\n${itemsList}\n\nPlease check availability and delivery details!`;
    window.open(`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <TopBar />
      <Header onOpenCart={() => setCartOpen(true)} />
      <Navigation />

      <div className="layout-max-width" style={{ padding: '40px 24px 80px' }}>
        {/* Breadcrumb */}
        <div className="shop-breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span style={{ color: '#111827', fontWeight: 700 }}>My Wishlist</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#111827', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Heart size={28} color="#D9003B" fill="#D9003B" />
              <span>My Wishlist ({wishlistedProducts.length})</span>
            </h1>
            <p style={{ fontSize: '14px', color: '#6B7280', marginTop: '4px' }}>
              Your saved aromatic favourites for easy checkout and ordering.
            </p>
          </div>

          {wishlistedProducts.length > 0 && (
            <motion.button
              style={{
                backgroundColor: '#25D366',
                color: '#FFFFFF',
                border: 'none',
                padding: '12px 22px',
                borderRadius: '999px',
                fontWeight: 700,
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                boxShadow: '0 6px 16px rgba(37, 211, 102, 0.3)',
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleOrderWishlistWhatsApp}
            >
              <MessageCircle size={18} />
              <span>Order Wishlist on WhatsApp</span>
            </motion.button>
          )}
        </div>

        {wishlistedProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px', background: '#FFFFFF', borderRadius: '24px', border: '1px solid #E5E7EB' }}>
            <Heart size={64} color="#CBD5E1" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#111827', marginBottom: '8px' }}>Your Wishlist is Empty</h3>
            <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '24px' }}>
              Explore our shop and tap the heart icon on any product to save it here.
            </p>
            <Link href="/shop" style={{ textDecoration: 'none' }}>
              <button
                style={{
                  backgroundColor: 'var(--primary-teal)',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '12px 28px',
                  borderRadius: '999px',
                  fontWeight: 700,
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                Browse Fragrance Catalog
              </button>
            </Link>
          </div>
        ) : (
          <AnimatedGrid style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px' }}>
            {wishlistedProducts.map((product) => (
              <motion.div
                key={product.id}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '20px',
                  padding: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
                }}
                variants={fadeUpVariant}
                whileHover={{ y: -4, borderColor: '#078A83' }}
              >
                <div
                  style={{
                    height: '180px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    background: '#F8FAF9',
                    marginBottom: '14px',
                    border: '1px solid #E5E7EB',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {product.image ? (
                    <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <Sparkles size={36} color="#078A83" />
                  )}
                </div>

                <span style={{ fontSize: '11px', fontWeight: 700, color: '#078A83', textTransform: 'uppercase' }}>
                  {product.category}
                </span>

                <Link href={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#111827', margin: '6px 0 10px 0', lineHeight: 1.3 }}>
                    {product.name}
                  </h3>
                </Link>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '16px' }}>
                  <span style={{ fontSize: '16px', fontWeight: 800, color: '#111827' }}>{product.price}</span>
                  <del style={{ fontSize: '12.5px', color: '#9CA3AF' }}>{product.originalPrice}</del>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                  <motion.button
                    style={{
                      flex: 1,
                      backgroundColor: 'var(--primary-teal)',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '10px',
                      borderRadius: '999px',
                      fontWeight: 700,
                      fontSize: '13px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      cursor: 'pointer',
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      addToCart(product);
                      showToast(`Moved "${product.name.substring(0, 18)}..." to cart!`);
                    }}
                  >
                    <ShoppingCart size={15} />
                    <span>Move to Cart</span>
                  </motion.button>

                  <motion.button
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      border: '1px solid #E5E7EB',
                      background: '#FFFFFF',
                      color: '#D9003B',
                      display: 'grid',
                      placeItems: 'center',
                      cursor: 'pointer',
                    }}
                    whileHover={{ scale: 1.08, background: '#FEE2E2' }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => toggleWishlist(product.id)}
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 size={16} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatedGrid>
        )}
      </div>

      <Footer />
    </main>
  );
}
