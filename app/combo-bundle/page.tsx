'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Package,
  Gift,
  Truck,
  CheckCircle,
  MessageCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Flame,
} from 'lucide-react';
import { useStore } from '../../context/store-context';
import { TopBar } from '../../components/top-bar';
import { Header } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { Footer } from '../../components/footer';
import { CartDrawer } from '../../components/cart-drawer';
import { AnimatedSection, AnimatedGrid, fadeUpVariant, cardHoverProps } from '../../components/animations';

export default function ComboBundlePage() {
  const { settings, addToCart, products } = useStore();
  const [cartOpen, setCartOpen] = useState(false);

  const BUNDLES = [
    {
      id: 9,
      badge: '🔥 BEST VALUE COMBO',
      title: 'XTRIME AROMA 14-in-1 Master Combo Bundle',
      price: 'Rs. 2,100.00',
      regularValue: 'Rs. 2,900.00',
      savings: 'SAVE Rs. 800',
      image: '/xtrime_aroma_banner.jpg',
      inclusions: [
        '14-in-1 Fragrance Incense Sticks Full Pack (Rs. 1,300 Value)',
        '4x 100g Suwada Dupa Incense Powder Packs (Rs. 800 Value)',
        '🎁 FREE 50g Special Ashtadupa Smoke Powder Pack',
        '🚚 FREE Doorstep Delivery Islandwide Included',
        '💵 Cash on Delivery Available',
      ],
      whatsappMsg: 'Hi EECO AROMATICS, I want to order the Rs. 2,100 XTRIME AROMA 14-in-1 Master Combo Bundle with Free Delivery!',
    },
    {
      id: 6,
      badge: 'DUAL PACK SPECIAL',
      title: '14-in-1 Incense Sticks Double Pack + FREE Air Freshener',
      price: 'Rs. 2,650.00',
      regularValue: 'Rs. 3,360.00',
      savings: 'SAVE Rs. 710',
      image: '/banner_incense_packs.jpg',
      inclusions: [
        '2x Complete 14-in-1 Incense Sticks Boxes (28 Fragrances)',
        '🎁 FREE EECO Card Fragrance Air Freshener',
        '🚚 FREE Islandwide Courier Delivery',
        '🌿 100% Organic Scented Bamboo Sticks',
      ],
      whatsappMsg: 'Hi EECO AROMATICS, I want to order the 14-in-1 Incense Sticks Dual Pack (Rs. 2,650) with Free Air Freshener!',
    },
    {
      id: 5,
      badge: 'WHOLESALE ECONOMY',
      title: '12x 100g Jasmine Incense Powder Master Box',
      price: 'Rs. 2,000.00',
      regularValue: 'Rs. 2,400.00',
      savings: 'SAVE Rs. 400',
      image: '/product_jasmine_powder_bundle.jpg',
      inclusions: [
        '12 Packets of 100g Pure Jasmine Dhoop Powder (1.2kg Total)',
        'Pure White Benzoin & Jasmine Oil Infusion',
        'Sacred temple smoke for daily pooja & meditation',
        '🚚 Islandwide Courier Delivery',
      ],
      whatsappMsg: 'Hi EECO AROMATICS, I want to order the 12x 100g Jasmine Incense Powder Master Box (Rs. 2,000)!',
    },
    {
      id: 7,
      badge: 'LUXURY HOME SET',
      title: 'EECO Extrime Reed Diffuser & Room Spray Duo',
      price: 'Rs. 2,190.00',
      regularValue: 'Rs. 2,650.00',
      savings: 'SAVE Rs. 460',
      image: '/banner_room_diffuser.jpg',
      inclusions: [
        '1x Extrime Luxury Reed Diffuser (Choice of 12 Scents)',
        '1x 100ml Luxury Room Air Freshener Spray',
        '60 Days continuous flame-free room freshening',
        '🚚 Islandwide Courier Delivery',
      ],
      whatsappMsg: 'Hi EECO AROMATICS, I want to order the Luxury Reed Diffuser & Room Spray Duo (Rs. 2,190)!',
    },
  ];

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <TopBar />
      <Header onOpenCart={() => setCartOpen(true)} />
      <Navigation />

      <div className="layout-max-width" style={{ padding: '40px 24px 80px' }}>
        {/* Breadcrumbs */}
        <div className="shop-breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span style={{ color: '#111827', fontWeight: 700 }}>Exclusive Combo Bundles</span>
        </div>

        {/* Hero Header */}
        <div
          style={{
            background: 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 50%, #065F46 100%)',
            color: '#FFFFFF',
            borderRadius: '24px',
            padding: '48px 40px',
            marginBottom: '48px',
            boxShadow: '0 20px 50px rgba(15, 23, 42, 0.35)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '24px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <div style={{ maxWidth: '640px' }}>
            <span
              style={{
                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                color: '#FFFFFF',
                padding: '4px 12px',
                borderRadius: '999px',
                fontSize: '12px',
                fontWeight: 800,
                display: 'inline-block',
                marginBottom: '12px',
                boxShadow: '0 2px 8px rgba(245, 158, 11, 0.3)',
              }}
            >
              VALUE SAVINGS &amp; FREE GIFTS
            </span>
            <h1 style={{ fontSize: '36px', fontWeight: 800, lineHeight: 1.2, marginBottom: '14px' }}>
              EECO Signature Combo Packs &amp; Gift Bundles
            </h1>
            <p style={{ fontSize: '15px', opacity: 0.95, lineHeight: 1.6, color: '#E2E8F0' }}>
              Get more value for your money! Enjoy bundled savings on our 14-in-1 Incense Packs, Ashtadupa Powders, and Luxury Diffusers with Free Islandwide Delivery.
            </p>
          </div>

          <div
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '18px',
              padding: '24px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              textAlign: 'center',
            }}
          >
            <Truck size={32} color="#FBBF24" style={{ margin: '0 auto 8px auto' }} />
            <h4 style={{ fontSize: '16px', fontWeight: 800 }}>Free Delivery Included</h4>
            <p style={{ fontSize: '12.5px', opacity: 0.9, color: '#CBD5E1' }}>On all major combo bundles</p>
          </div>
        </div>

        {/* Bundles Grid */}
        <AnimatedGrid style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '30px' }}>
          {BUNDLES.map((bundle) => (
            <motion.div
              key={bundle.id}
              style={{
                background: '#FFFFFF',
                border: '1.5px solid #E5E7EB',
                borderRadius: '24px',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.05)',
                position: 'relative',
              }}
              variants={fadeUpVariant}
              whileHover={{ y: -6, borderColor: '#1A56DB' }}
              transition={{ duration: 0.25 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span
                  style={{
                    background: '#FEF3C7',
                    color: '#92400E',
                    fontSize: '12px',
                    fontWeight: 800,
                    padding: '4px 10px',
                    borderRadius: '999px',
                  }}
                >
                  {bundle.badge}
                </span>

                <span
                  style={{
                    background: '#FEE2E2',
                    color: '#E11D48',
                    fontSize: '12px',
                    fontWeight: 800,
                    padding: '4px 10px',
                    borderRadius: '999px',
                  }}
                >
                  {bundle.savings}
                </span>
              </div>

              {/* Image box */}
              <div
                style={{
                  height: '200px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  marginBottom: '20px',
                  border: '1px solid #E5E7EB',
                  background: '#F8FAFC',
                }}
              >
                <img
                  src={bundle.image}
                  alt={bundle.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#111827', marginBottom: '12px', lineHeight: 1.3 }}>
                {bundle.title}
              </h3>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '20px' }}>
                <span style={{ fontSize: '28px', fontWeight: 800, color: '#1A56DB' }}>{bundle.price}</span>
                <del style={{ fontSize: '15px', color: '#9CA3AF' }}>{bundle.regularValue}</del>
              </div>

              {/* Inclusions */}
              <div style={{ background: '#F8FAF9', borderRadius: '14px', padding: '16px', marginBottom: '24px', flex: 1 }}>
                <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#374151', marginBottom: '10px', textTransform: 'uppercase' }}>
                  Bundle Includes:
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13.5px', color: '#4B5563' }}>
                  {bundle.inclusions.map((inc, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                      <span>✔</span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <motion.button
                  style={{
                    width: '100%',
                    backgroundColor: '#25D366',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '999px',
                    padding: '14px',
                    fontWeight: 700,
                    fontSize: '14.5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    boxShadow: '0 6px 16px rgba(37, 211, 102, 0.3)',
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => window.open(`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(bundle.whatsappMsg)}`, '_blank')}
                >
                  <MessageCircle size={18} />
                  <span>Order Bundle on WhatsApp</span>
                </motion.button>

                <motion.button
                  style={{
                    width: '100%',
                    backgroundColor: 'var(--primary-teal)',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '999px',
                    padding: '12px',
                    fontWeight: 700,
                    fontSize: '13.5px',
                    cursor: 'pointer',
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    const prod = products.find((p) => p.id === bundle.id) || products[0];
                    addToCart(prod);
                  }}
                >
                  Add Bundle to Cart
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatedGrid>
      </div>

      <Footer />
    </main>
  );
}
