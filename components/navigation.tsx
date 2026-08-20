'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Grid2X2, ChevronDown, ArrowUpRight, Flame, Sparkles, Wind, Droplets, MessageSquare } from 'lucide-react';
import { dropdownMenuVariant, dropdownItemVariant, buttonHoverProps } from './animations';
import { useStore } from '../context/store-context';

export const Navigation: React.FC = () => {
  const { settings, pageVisibility } = useStore();
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const catRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (catRef.current && !catRef.current.contains(e.target as Node)) {
        setCategoriesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const CATEGORIES = [
    { name: 'Incense Sticks Packs', sub: 'Traditional 14-in-1 herbal sticks', icon: Flame, color: '#078A83' },
    { name: 'Incense Powder Packs', sub: 'Sambrani, Cinnamon & Ashtadupa', icon: Sparkles, color: '#D9003B' },
    { name: 'Air Fresheners', sub: 'Long-lasting room sprays', icon: Wind, color: '#06666B' },
    { name: 'Diffuser', sub: 'Natural reed oil aroma diffusers', icon: Droplets, color: '#078A83' },
    { name: 'Wholesale Products', sub: 'Bulk merchant cartons & master packs', icon: Sparkles, color: '#FFBE00' },
  ];

  return (
    <nav className="primary-nav-bar">
      <div className="primary-nav-inner layout-max-width">
        {/* Explore All Categories Mega-Dropdown */}
        <div className="categories-dropdown-wrapper" ref={catRef}>
          <motion.button
            className="btn-explore-categories"
            {...buttonHoverProps}
            onClick={() => setCategoriesOpen((prev) => !prev)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Grid2X2 size={18} />
              <span>Explore All Categories</span>
            </div>
            <motion.div animate={{ rotate: categoriesOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown size={16} />
            </motion.div>
          </motion.button>

          <AnimatePresence>
            {categoriesOpen && (
              <motion.div
                className="category-dropdown-menu"
                variants={dropdownMenuVariant}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                {CATEGORIES.map((cat, idx) => {
                  const Icon = cat.icon;
                  return (
                    <Link
                      key={idx}
                      href={`/shop?category=${encodeURIComponent(cat.name)}`}
                      className="category-dropdown-item"
                      onClick={() => setCategoriesOpen(false)}
                    >
                      <div className="category-dropdown-item-icon">
                        <Icon size={20} color={cat.color} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: '14px' }}>{cat.name}</div>
                        <div style={{ fontSize: '11.5px', color: '#6B7280' }}>{cat.sub}</div>
                      </div>
                      <ArrowUpRight size={15} color="#9CA3AF" />
                    </Link>
                  );
                })}

                <Link
                  href="/shop"
                  className="category-dropdown-item"
                  style={{ borderTop: '1px solid #F3F4F6', marginTop: '4px', paddingTop: '10px', color: '#078A83' }}
                  onClick={() => setCategoriesOpen(false)}
                >
                  <Sparkles size={16} />
                  <span>View All Fragrances</span>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Page Links */}
        <div className="nav-menu-list">
          <Link href="/" className={pathname === '/' ? 'active' : ''}>
            Home
          </Link>
          {pageVisibility.shop && (
            <Link href="/shop" className={pathname === '/shop' ? 'active' : ''}>
              Shop
            </Link>
          )}
          {pageVisibility.comboBundle && (
            <Link href="/combo-bundle" className={pathname === '/combo-bundle' ? 'active' : ''}>
              Combo Bundle <span className="popular-badge-inline">popular</span>
            </Link>
          )}
          {pageVisibility.about && (
            <Link href="/about" className={pathname === '/about' ? 'active' : ''}>
              About Us
            </Link>
          )}
          {pageVisibility.contact && (
            <Link href="/contact" className={pathname === '/contact' ? 'active' : ''}>
              Contact
            </Link>
          )}
          {pageVisibility.trackOrder && (
            <Link href="/track-order" className={pathname === '/track-order' ? 'active' : ''}>
              Track Order
            </Link>
          )}
        </div>

        {/* WhatsApp Support Clean Action Button */}
        <motion.a
          href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(settings.whatsappMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="support-block-btn"
          whileHover={{ scale: 1.03, y: -1 }}
          whileTap={{ scale: 0.96 }}
        >
          <div className="support-icon-circle">
            <MessageSquare size={17} />
            <span className="live-pulse-dot" />
          </div>
          <div className="support-labels">
            <div className="support-status-row">
              <span className="support-live-text">24/7 Live Assistance</span>
            </div>
            <span className="large-label">Chat on WhatsApp</span>
          </div>
        </motion.a>
      </div>
    </nav>
  );
};
