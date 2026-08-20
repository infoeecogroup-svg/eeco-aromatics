'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ShieldCheck,
  Leaf,
  Heart,
  Award,
  Users,
  CheckCircle,
  MessageCircle,
  Flame,
  Truck,
} from 'lucide-react';
import { useStore } from '../../context/store-context';
import { TopBar } from '../../components/top-bar';
import { Header } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { Footer } from '../../components/footer';
import { CartDrawer } from '../../components/cart-drawer';
import { AnimatedSection, AnimatedGrid, fadeUpVariant } from '../../components/animations';

export default function AboutPage() {
  const { settings } = useStore();
  const [cartOpen, setCartOpen] = useState(false);

  const VALUES = [
    {
      icon: Leaf,
      title: '100% Natural Herbal Extracts',
      desc: 'We source the purest Ceylon cinnamon, sambrani resins, thulasi, rose petals, and holy herbs to deliver authentic non-toxic aroma.',
    },
    {
      icon: ShieldCheck,
      title: 'Quality & Safety Assurance',
      desc: 'Formulated adhering to premium quality standards, customer satisfaction, and safe botanical aromatic ingredients.',
    },
    {
      icon: Flame,
      title: 'Artisan Craftsmanship',
      desc: 'Carefully rolled and formulated by skilled Sri Lankan incense artisans dedicated to traditional aromatic heritage.',
    },
    {
      icon: Heart,
      title: 'We Care About You',
      desc: 'Our guiding principle is creating calming, uplifting atmospheres that enhance your home wellness and spiritual rituals.',
    },
  ];

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
          <span style={{ color: '#111827', fontWeight: 700 }}>About Us</span>
        </div>

        {/* Hero Section */}
        <AnimatedSection
          style={{
            background: 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 50%, #065F46 100%)',
            color: '#FFFFFF',
            borderRadius: '28px',
            padding: '60px 48px',
            marginBottom: '60px',
            boxShadow: '0 20px 50px rgba(15, 23, 42, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '40px',
            flexWrap: 'wrap',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <div style={{ maxWidth: '640px' }}>
            <span
              style={{
                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                color: '#FFFFFF',
                padding: '4px 14px',
                borderRadius: '999px',
                fontSize: '12px',
                fontWeight: 800,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                display: 'inline-block',
                marginBottom: '16px',
                boxShadow: '0 2px 8px rgba(245, 158, 11, 0.3)',
              }}
            >
              OUR HERITAGE &amp; MISSION
            </span>
            <h1 style={{ fontSize: '40px', fontWeight: 800, lineHeight: 1.2, marginBottom: '16px' }}>
              Sri Lanka's Trusted Name in Natural Home Fragrance
            </h1>
            <p style={{ fontSize: '16px', lineHeight: 1.6, opacity: 0.95, marginBottom: '24px', color: '#E2E8F0' }}>
              Welcome to <strong>{settings.storeName}</strong>. We are passionate about enriching households with natural, therapeutic, and traditional aromatic creations.
            </p>
            <motion.a
              href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent('Hi EECO AROMATICS, I want to learn more about your products!')}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#25D366',
                color: '#FFFFFF',
                padding: '12px 24px',
                borderRadius: '999px',
                fontWeight: 700,
                fontSize: '14.5px',
                textDecoration: 'none',
                boxShadow: '0 6px 16px rgba(37, 211, 102, 0.3)',
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <MessageCircle size={18} />
              <span>Connect with our Team</span>
            </motion.a>
          </div>

          <div
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              borderRadius: '24px',
              padding: '32px',
              textAlign: 'center',
              width: '300px',
            }}
          >
            <img src="/eeco_logo.png" alt="EECO Logo" style={{ width: '100px', height: '100px', objectFit: 'contain', margin: '0 auto 16px auto' }} />
            <h3 style={{ fontSize: '20px', fontWeight: 800 }}>{settings.storeName}</h3>
            <p style={{ fontSize: '13px', color: '#FBBF24', fontWeight: 700, marginTop: '4px' }}>"{settings.storeSlogan}"</p>
          </div>
        </AnimatedSection>

        {/* Brand Values Grid */}
        <div style={{ marginBottom: '70px' }}>
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 40px auto' }}>
            <h2 style={{ fontSize: '30px', fontWeight: 800, color: '#111827', marginBottom: '8px' }}>
              Why Choose EECO AROMATICS?
            </h2>
            <p style={{ fontSize: '15px', color: '#6B7280' }}>
              Every stick, powder blend, and diffuser bottle is crafted to bring serene wellness to your living spaces.
            </p>
          </div>

          <AnimatedGrid style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            {VALUES.map((val, idx) => {
              const IconComponent = val.icon;
              return (
                <motion.div
                  key={idx}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '20px',
                    padding: '32px 24px',
                    textAlign: 'center',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
                  }}
                  variants={fadeUpVariant}
                  whileHover={{ y: -6, borderColor: '#1A56DB' }}
                >
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      background: '#EFF6FF',
                      color: '#1A56DB',
                      display: 'grid',
                      placeItems: 'center',
                      margin: '0 auto 20px auto',
                    }}
                  >
                    <IconComponent size={26} />
                  </div>
                  <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#111827', marginBottom: '10px' }}>
                    {val.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#4B5563', lineHeight: 1.6 }}>
                    {val.desc}
                  </p>
                </motion.div>
              );
            })}
          </AnimatedGrid>
        </div>

        {/* Company Registration & Facility */}
        <AnimatedSection
          style={{
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '24px',
            padding: '40px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '30px',
          }}
        >
          <div style={{ maxWidth: '680px' }}>
            <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#111827', marginBottom: '12px' }}>
              Headquartered in Gampaha, Serving All of Sri Lanka
            </h3>
            <p style={{ fontSize: '14.5px', color: '#4B5563', lineHeight: 1.6, marginBottom: '16px' }}>
              Operating from our dedicated dispatch hub at <strong>222/3, 3rd Lane, Colombo Road, Gampaha (WP 11000)</strong>, we ship swiftly across all 25 districts with reliable Cash on Delivery service.
            </p>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', fontSize: '13.5px', fontWeight: 700, color: '#1A56DB' }}>
              <span>✔ Fast Islandwide Courier Delivery</span>
              <span>✔ Cash on Delivery Available</span>
              <span>✔ 24/7 WhatsApp Hotline</span>
            </div>
          </div>

          <Link href="/shop" style={{ textDecoration: 'none' }}>
            <motion.button
              style={{
                backgroundColor: 'var(--primary-teal)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '999px',
                padding: '14px 28px',
                fontSize: '15px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 6px 18px rgba(7, 138, 131, 0.3)',
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              Explore Our Fragrances
            </motion.button>
          </Link>
        </AnimatedSection>
      </div>

      <Footer />
    </main>
  );
}
