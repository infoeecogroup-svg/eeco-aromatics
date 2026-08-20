'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, MapPin, Mail, MessageSquare, ShieldCheck, Heart, Sparkles, Phone } from 'lucide-react';
import { useStore } from '../context/store-context';

export const Footer: React.FC = () => {
  const { settings } = useStore();

  return (
    <footer className="sellzy-main-footer">
      <div className="footer-5col-grid layout-max-width">
        {/* Column 1: Brand & Bio */}
        <div className="footer-brand-col">
          <Link href="/" className="footer-logo-wrap">
            <img src="/eeco_logo.png" alt="EECO AROMATICS Logo" className="footer-logo-img" />
            <div className="footer-logo-text-group">
              <span className="footer-brand-title">{settings.storeName}</span>
              <span className="footer-brand-slogan">{settings.storeSlogan}</span>
            </div>
          </Link>
          <div className="footer-logo-underline"></div>

          <p className="footer-company-desc">
            Sri Lanka&apos;s premier online boutique for traditional 14-in-1 Incense Sticks, pure Dhoop Powder, natural Room Diffusers &amp; refreshing Air Fresheners. Handcrafted with sacred herbs &amp; pure aromatic oils.
          </p>

          <div className="social-icons-row">
            <a
              href="https://web.facebook.com/EECOSL"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn"
              aria-label="Facebook Page"
              title="EECO Facebook Page"
            >
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
            </a>
            <a
              href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent('Hi EECO AROMATICS, I would like to order fragrances!')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn whatsapp-highlight"
              aria-label="WhatsApp Hotline"
              title="Chat on WhatsApp"
            >
              <MessageSquare size={18} />
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-links-col">
          <h4 className="footer-column-heading">Quick Links</h4>
          <div className="footer-column-divider"></div>

          <Link href="/" className="footer-link-item">
            <ChevronRight size={14} className="footer-chevron" />
            <span>Home</span>
          </Link>
          <Link href="/shop" className="footer-link-item">
            <ChevronRight size={14} className="footer-chevron" />
            <span>Shop Catalog</span>
          </Link>
          <Link href="/combo-bundle" className="footer-link-item highlight-combo">
            <ChevronRight size={14} className="footer-chevron" />
            <span>Combo Bundle <span className="footer-pill-hot">HOT</span></span>
          </Link>
          <Link href="/about" className="footer-link-item">
            <ChevronRight size={14} className="footer-chevron" />
            <span>About EECO</span>
          </Link>
          <Link href="/contact" className="footer-link-item">
            <ChevronRight size={14} className="footer-chevron" />
            <span>Contact &amp; Support</span>
          </Link>
        </div>

        {/* Column 3: Customer Care */}
        <div className="footer-links-col">
          <h4 className="footer-column-heading">Customer Care</h4>
          <div className="footer-column-divider"></div>

          <Link href="/track-order" className="footer-link-item">
            <ChevronRight size={14} className="footer-chevron" />
            <span>Track My Order</span>
          </Link>
          <Link href="/wishlist" className="footer-link-item">
            <ChevronRight size={14} className="footer-chevron" />
            <span>Saved Wishlist</span>
          </Link>
          <Link href="/cart" className="footer-link-item">
            <ChevronRight size={14} className="footer-chevron" />
            <span>View Shopping Cart</span>
          </Link>
          <Link href="/about#delivery" className="footer-link-item">
            <ChevronRight size={14} className="footer-chevron" />
            <span>Cash on Delivery Terms</span>
          </Link>
          <Link href="/contact#faq" className="footer-link-item">
            <ChevronRight size={14} className="footer-chevron" />
            <span>FAQs &amp; Help Center</span>
          </Link>
        </div>

        {/* Column 4: Fragrance Categories */}
        <div className="footer-links-col">
          <h4 className="footer-column-heading">Fragrance Lines</h4>
          <div className="footer-column-divider"></div>

          <Link href="/shop?category=Incense+Sticks+Packs" className="footer-link-item">
            <ChevronRight size={14} className="footer-chevron" />
            <span>Incense Sticks (14-in-1)</span>
          </Link>
          <Link href="/shop?category=Incense+Powder+Packs" className="footer-link-item">
            <ChevronRight size={14} className="footer-chevron" />
            <span>Pure Dhoop Powder</span>
          </Link>
          <Link href="/shop?category=Air+Fresheners" className="footer-link-item">
            <ChevronRight size={14} className="footer-chevron" />
            <span>Luxury Air Fresheners</span>
          </Link>
          <Link href="/shop?category=Diffuser" className="footer-link-item">
            <ChevronRight size={14} className="footer-chevron" />
            <span>Reed Room Diffusers</span>
          </Link>
          <Link href="/shop?category=Wholesale+Products" className="footer-link-item wholesale-link">
            <ChevronRight size={14} className="footer-chevron" />
            <span>Wholesale Bulk Orders</span>
          </Link>
        </div>

        {/* Column 5: Contact & Delivery Hub */}
        <div className="footer-contact-col">
          <h4 className="footer-column-heading">Get in Touch</h4>
          <div className="footer-column-divider"></div>

          <div className="contact-info-item">
            <div className="contact-icon-circle">
              <MapPin size={16} />
            </div>
            <span>222/3, 3rd Lane, Colombo Road, Gampaha (WP 11000)</span>
          </div>

          <div className="contact-info-item">
            <div className="contact-icon-circle whatsapp-circle">
              <MessageSquare size={16} />
            </div>
            <a
              href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent('Hi EECO AROMATICS, I want to make an inquiry!')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-text-link"
            >
              24/7 Hotline: +94 76 205 1906
            </a>
          </div>

          <div className="contact-info-item">
            <div className="contact-icon-circle">
              <Mail size={16} />
            </div>
            <a href="mailto:info.eecogroup@gmail.com" style={{ color: '#D5F5F4' }}>
              info.eecogroup@gmail.com
            </a>
          </div>

          <div className="payment-badges-row">
            <span className="payment-pill pill-cod">
              <ShieldCheck size={13} color="#D9003B" />
              <span>Cash On Delivery</span>
            </span>
            <span className="payment-pill pill-transfer">Bank Transfer</span>
            <span className="payment-pill pill-card">Visa / Mastercard</span>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="copyright-bar-wrap layout-max-width">
        <div className="copyright-arch-line"></div>
        <div className="copyright-content-row">
          <span>&copy; {new Date().getFullYear()} {settings.storeName} — {settings.storeSlogan}. All Rights Reserved.</span>
          <span className="islandwide-delivery-tag">🚚 Islandwide Fast Delivery • 100% Genuine Sri Lankan Herbal Formulations</span>
        </div>
      </div>
    </footer>
  );
};
