'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Package,
  Search,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  MessageCircle,
  ShieldCheck,
} from 'lucide-react';
import { useStore } from '../../context/store-context';
import { TopBar } from '../../components/top-bar';
import { Header } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { Footer } from '../../components/footer';
import { CartDrawer } from '../../components/cart-drawer';
import { AnimatedSection } from '../../components/animations';

export default function TrackOrderPage() {
  const { settings, showToast } = useStore();
  const [orderQuery, setOrderQuery] = useState('');
  const [phoneQuery, setPhoneQuery] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderQuery || !phoneQuery) {
      showToast('Please enter both Order ID and your Phone Number.');
      return;
    }
    setSearched(true);
    showToast('Tracking details retrieved!');
  };

  const handleWhatsAppInquiry = () => {
    const msg = `*ORDER TRACKING INQUIRY*\n\n*Order ID / Reference:* ${orderQuery || 'Not specified'}\n*My Phone:* ${phoneQuery || 'Not specified'}\n\nPlease check the current dispatch status of my package!`;
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
          <span style={{ color: '#111827', fontWeight: 700 }}>Track My Order</span>
        </div>

        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: '#F0FDF4',
                color: '#078A83',
                display: 'grid',
                placeItems: 'center',
                margin: '0 auto 16px auto',
              }}
            >
              <Package size={32} />
            </div>
            <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#111827', marginBottom: '8px' }}>
              Track Your Courier Delivery
            </h1>
            <p style={{ fontSize: '14.5px', color: '#6B7280' }}>
              Enter your Order Reference Number or WhatsApp Phone Number to check real-time courier dispatch status.
            </p>
          </div>

          {/* Search Card */}
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: '24px',
              padding: '32px',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)',
              marginBottom: '32px',
            }}
          >
            <form onSubmit={handleTrackSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '6px' }}>
                  Order ID / Waybill Number
                </label>
                <input
                  type="text"
                  placeholder="e.g. EECO-2026-8941"
                  value={orderQuery}
                  onChange={(e) => setOrderQuery(e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1.5px solid #D1D5DB', fontSize: '14px', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '6px' }}>
                  Your WhatsApp Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 076 205 1906"
                  value={phoneQuery}
                  onChange={(e) => setPhoneQuery(e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1.5px solid #D1D5DB', fontSize: '14px', outline: 'none' }}
                />
              </div>

              <motion.button
                type="submit"
                style={{
                  backgroundColor: 'var(--primary-teal)',
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
                  marginTop: '8px',
                  boxShadow: '0 6px 18px rgba(7, 138, 131, 0.25)',
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
              >
                <Search size={18} />
                <span>Track Order Status</span>
              </motion.button>
            </form>
          </div>

          {/* Results Display */}
          {searched && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: '#FFFFFF',
                border: '1.5px solid #BBF7D0',
                borderRadius: '24px',
                padding: '32px',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.05)',
                marginBottom: '32px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#15803D', background: '#F0FDF4', padding: '4px 10px', borderRadius: '999px' }}>
                    IN TRANSIT
                  </span>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111827', marginTop: '6px' }}>
                    Order {orderQuery}
                  </h3>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '12px', color: '#6B7280' }}>Estimated Delivery:</span>
                  <div style={{ fontSize: '14.5px', fontWeight: 800, color: '#078A83' }}>1-2 Business Days</div>
                </div>
              </div>

              {/* Progress Steps */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative', paddingLeft: '32px' }}>
                <div style={{ position: 'absolute', left: '11px', top: '10px', bottom: '10px', width: '2px', background: '#E5E7EB' }}></div>

                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-32px', width: '24px', height: '24px', borderRadius: '50%', background: '#078A83', color: '#FFFFFF', display: 'grid', placeItems: 'center', fontSize: '12px' }}>
                    ✔
                  </div>
                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#111827' }}>Order Confirmed &amp; Packed</h4>
                  <span style={{ fontSize: '12.5px', color: '#6B7280' }}>EECO Central Facility, Gampaha</span>
                </div>

                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-32px', width: '24px', height: '24px', borderRadius: '50%', background: '#078A83', color: '#FFFFFF', display: 'grid', placeItems: 'center', fontSize: '12px' }}>
                    ✔
                  </div>
                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#111827' }}>Handed to Courier Service</h4>
                  <span style={{ fontSize: '12.5px', color: '#6B7280' }}>Islandwide Courier Dispatch Hub</span>
                </div>

                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-32px', width: '24px', height: '24px', borderRadius: '50%', background: '#FFBE00', color: '#111827', display: 'grid', placeItems: 'center', fontSize: '12px' }}>
                    ⏳
                  </div>
                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#111827' }}>Out for Doorstep Delivery</h4>
                  <span style={{ fontSize: '12.5px', color: '#6B7280' }}>Cash on Delivery will be collected upon arrival</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* WhatsApp Direct Help */}
          <div
            style={{
              background: '#F0FDF4',
              border: '1px solid #BBF7D0',
              borderRadius: '20px',
              padding: '24px',
              textAlign: 'center',
            }}
          >
            <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#166534', marginBottom: '6px' }}>
              Need Help with Your Delivery?
            </h4>
            <p style={{ fontSize: '13.5px', color: '#15803D', marginBottom: '16px' }}>
              Send a direct WhatsApp message to our logistics support team for immediate assistance.
            </p>
            <motion.button
              style={{
                backgroundColor: '#25D366',
                color: '#FFFFFF',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '999px',
                fontWeight: 700,
                fontSize: '14px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleWhatsAppInquiry}
            >
              <MessageCircle size={18} />
              <span>Ask Support on WhatsApp</span>
            </motion.button>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
