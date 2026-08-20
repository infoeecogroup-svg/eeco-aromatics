'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Mail,
  Printer,
  MessageSquare,
  Clock,
  Send,
  HelpCircle,
  ChevronDown,
  PhoneCall,
  Truck,
} from 'lucide-react';
import { useStore } from '../../context/store-context';
import { TopBar } from '../../components/top-bar';
import { Header } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { Footer } from '../../components/footer';
import { CartDrawer } from '../../components/cart-drawer';
import { AnimatedSection, AnimatedGrid, fadeUpVariant } from '../../components/animations';

export default function ContactPage() {
  const { settings, showToast } = useStore();
  const [cartOpen, setCartOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', message: '', subject: 'Product Inquiry' });
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const FAQS = [
    {
      q: 'How can I place an order?',
      a: 'You can easily order directly through our website by adding items to your cart, or click any "Order on WhatsApp" button to place your order with our friendly team in seconds.',
    },
    {
      q: 'Do you offer Cash on Delivery (COD)?',
      a: 'Yes! We provide Cash on Delivery across all 25 districts of Sri Lanka. You only pay when the courier safely delivers your parcel to your doorstep.',
    },
    {
      q: 'How long does delivery take?',
      a: 'Western Province deliveries typically take 1 to 2 working days. All other provinces and outstation districts arrive within 2 to 3 working days.',
    },
    {
      q: 'Are your incense products 100% natural?',
      a: 'Yes, all EECO AROMATICS incense sticks and powder blends are crafted using pure natural botanicals, Ceylon cinnamon, sambrani resins, and non-toxic extracts.',
    },
    {
      q: 'Can I purchase bulk wholesale quantities for shops or temples?',
      a: 'Absolutely. We offer special discounted wholesale rates for retailers, distributors, and temple organizations. Message our WhatsApp helpdesk for custom wholesale quotation.',
    },
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      showToast('Please fill in your name and phone number.');
      return;
    }
    const msg = `*NEW CONTACT MESSAGE*\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Subject:* ${formData.subject}\n*Message:* ${formData.message}`;
    window.open(`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
    showToast('Redirecting to WhatsApp with your message!');
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
          <span style={{ color: '#111827', fontWeight: 700 }}>Contact &amp; Support Hub</span>
        </div>

        {/* Top Header */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 48px auto' }}>
          <span
            style={{
              background: '#F0FDF4',
              color: '#15803D',
              padding: '4px 14px',
              borderRadius: '999px',
              fontSize: '12px',
              fontWeight: 800,
              display: 'inline-block',
              marginBottom: '10px',
            }}
          >
            24/7 CUSTOMER HELPDESK
          </span>
          <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#111827', marginBottom: '12px' }}>
            We’d Love to Hear from You
          </h1>
          <p style={{ fontSize: '15px', color: '#6B7280', lineHeight: 1.6 }}>
            Have a question about our fragrance products, need help with your order, or interested in wholesale supply? Contact us anytime.
          </p>
        </div>

        {/* Contact Info Cards */}
        <AnimatedGrid style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '60px' }}>
          {/* Card 1: WhatsApp Support */}
          <motion.div
            style={{
              background: '#FFFFFF',
              border: '1.5px solid #BBF7D0',
              borderRadius: '20px',
              padding: '28px',
              boxShadow: '0 6px 20px rgba(37, 211, 102, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
            variants={fadeUpVariant}
            whileHover={{ y: -4 }}
          >
            <div>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#25D366', color: '#FFFFFF', display: 'grid', placeItems: 'center', marginBottom: '16px' }}>
                <MessageSquare size={24} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111827', marginBottom: '6px' }}>Instant WhatsApp Chat</h3>
              <p style={{ fontSize: '13.5px', color: '#4B5563', lineHeight: 1.5, marginBottom: '20px' }}>
                Chat live with our customer support team for instant order tracking and product questions.
              </p>
            </div>
            <motion.a
              href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent('Hi EECO AROMATICS, I need assistance with an order!')}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: '#25D366',
                color: '#FFFFFF',
                padding: '10px 18px',
                borderRadius: '999px',
                fontWeight: 700,
                fontSize: '13.5px',
                textAlign: 'center',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
            >
              <MessageSquare size={16} />
              <span>Chat on WhatsApp</span>
            </motion.a>
          </motion.div>

          {/* Card 2: Dispatch Facility Location */}
          <motion.div
            style={{
              background: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: '20px',
              padding: '28px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
            }}
            variants={fadeUpVariant}
            whileHover={{ y: -4 }}
          >
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#EFF6FF', color: '#1A56DB', display: 'grid', placeItems: 'center', marginBottom: '16px' }}>
              <MapPin size={24} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111827', marginBottom: '6px' }}>Headquarters &amp; Dispatch</h3>
            <p style={{ fontSize: '13.5px', color: '#4B5563', lineHeight: 1.5, marginBottom: '8px' }}>
              222/3, 3rd Lane, Colombo Road, Gampaha (WP 11000), Sri Lanka
            </p>
          </motion.div>

          {/* Card 3: Email & Business Hours */}
          <motion.div
            style={{
              background: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: '20px',
              padding: '28px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
            }}
            variants={fadeUpVariant}
            whileHover={{ y: -4 }}
          >
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#EFF6FF', color: '#1A56DB', display: 'grid', placeItems: 'center', marginBottom: '16px' }}>
              <Clock size={24} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111827', marginBottom: '6px' }}>Dispatch Hours</h3>
            <p style={{ fontSize: '13.5px', color: '#4B5563', lineHeight: 1.5, marginBottom: '6px' }}>
              Monday – Saturday: 8:00 AM – 7:00 PM<br />Sunday: 9:00 AM – 2:00 PM
            </p>
            <span style={{ fontSize: '12.5px', color: '#6B7280' }}>Email: info.eecogroup@gmail.com</span>
          </motion.div>
        </AnimatedGrid>

        {/* Message Form & FAQs Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>
          {/* Left: Message Form */}
          <AnimatedSection
            style={{
              background: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: '24px',
              padding: '36px',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)',
            }}
          >
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#111827', marginBottom: '8px' }}>
              Send Us a Message
            </h2>
            <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '24px' }}>
              Fill in your details below to send an instant inquiry to our direct support desk.
            </p>

            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '6px' }}>
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kasun Perera"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1.5px solid #D1D5DB', fontSize: '14px', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '6px' }}>
                  Phone / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 077 123 4567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1.5px solid #D1D5DB', fontSize: '14px', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '6px' }}>
                  Subject
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1.5px solid #D1D5DB', fontSize: '14px', outline: 'none', background: '#FFFFFF' }}
                >
                  <option value="Product Inquiry">Product Inquiry</option>
                  <option value="Combo Bundle Order">Combo Bundle Order</option>
                  <option value="Delivery Status">Delivery Status</option>
                  <option value="Wholesale Inquiry">Wholesale / Bulk Supply</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '6px' }}>
                  Your Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us what you'd like to ask or order..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1.5px solid #D1D5DB', fontSize: '14px', outline: 'none', resize: 'vertical' }}
                />
              </div>

              <motion.button
                type="submit"
                style={{
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
                  marginTop: '8px',
                  boxShadow: '0 6px 16px rgba(37, 211, 102, 0.3)',
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
              >
                <Send size={16} />
                <span>Submit &amp; Open WhatsApp Chat</span>
              </motion.button>
            </form>
          </AnimatedSection>

          {/* Right: FAQ Accordion */}
          <div id="faq">
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#111827', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <HelpCircle size={22} color="#1A56DB" />
              <span>Frequently Asked Questions</span>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {FAQS.map((faq, idx) => (
                <div
                  key={idx}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '14px',
                    overflow: 'hidden',
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      border: 'none',
                      background: 'none',
                      textAlign: 'left',
                      fontWeight: 700,
                      fontSize: '14.5px',
                      color: '#111827',
                      cursor: 'pointer',
                    }}
                  >
                    <span>{faq.q}</span>
                    <motion.div animate={{ rotate: openFaq === idx ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown size={16} color="#1A56DB" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {openFaq === idx && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ padding: '0 20px 16px 20px', fontSize: '13.5px', color: '#4B5563', lineHeight: 1.6 }}
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
