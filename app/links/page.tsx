'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Globe,
  MessageSquare,
  Share2,
  Check,
  Copy,
  Sparkles,
  MapPin,
  CheckCircle2,
  Mail,
  Phone,
  ShieldCheck,
  ChevronRight,
  ArrowUpRight,
  Leaf,
  Truck,
  Star,
} from 'lucide-react';
import { useStore, BusinessLink } from '@/context/store-context';

export default function HiddenLinksPage() {
  const { businessProfile, businessLinks, settings } = useStore();
  const [copied, setCopied] = useState(false);

  // Dynamic Page Title
  useEffect(() => {
    document.title = `${businessProfile?.businessName || 'EECO AROMATICS'} | Official Hub & Social Links`;
  }, [businessProfile?.businessName]);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: businessProfile?.businessName || 'EECO AROMATICS Links',
          text: businessProfile?.description || 'Official business & social links for EECO AROMATICS',
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled
      }
    } else {
      handleCopyLink();
    }
  };

  // Filter and sort active links
  const activeLinks = (businessLinks || [])
    .filter((l) => l.isActive)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  // Categorize links for modern Bento layout
  const isSocial = (icon: string) =>
    ['instagram', 'facebook', 'youtube', 'tiktok'].includes((icon || '').toLowerCase());
  const isHero = (l: BusinessLink) =>
    l.highlight || ['website', 'globe', 'store', 'whatsapp'].includes((l.icon || '').toLowerCase());

  const heroLinks = activeLinks.filter((l) => isHero(l) && !isSocial(l.icon));
  const socialLinks = activeLinks.filter((l) => isSocial(l.icon));
  const otherLinks = activeLinks.filter((l) => !isHero(l) && !isSocial(l.icon));

  // Render icon based on type
  const renderLinkIcon = (icon: string, size = 20) => {
    switch ((icon || '').toLowerCase()) {
      case 'website':
      case 'globe':
      case 'store':
        return (
          <div className="linktree-icon-bubble" style={{ background: 'linear-gradient(135deg, #059669, #0284C7)' }}>
            <Globe size={size} color="#FFFFFF" />
          </div>
        );
      case 'whatsapp':
        return (
          <div className="linktree-icon-bubble whatsapp-bubble">
            <MessageSquare size={size} color="#FFFFFF" />
          </div>
        );
      case 'facebook':
        return (
          <div className="linktree-icon-bubble fb-bubble">
            <svg width={size} height={size} fill="#FFFFFF" viewBox="0 0 24 24">
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
            </svg>
          </div>
        );
      case 'instagram':
        return (
          <div className="linktree-icon-bubble insta-bubble">
            <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24" color="#FFFFFF">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </div>
        );
      case 'youtube':
        return (
          <div className="linktree-icon-bubble yt-bubble">
            <svg width={size} height={size} fill="#FFFFFF" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </div>
        );
      case 'tiktok':
        return (
          <div className="linktree-icon-bubble tiktok-bubble">
            <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68a6.34 6.34 0 0 0 6.35 6.32 6.34 6.34 0 0 0 6.35-6.32V8.67a8.21 8.21 0 0 0 4.89 1.6V6.82a4.78 4.78 0 0 1-1-.13z" />
            </svg>
          </div>
        );
      case 'gmail':
      case 'email':
      case 'mail':
        return (
          <div className="linktree-icon-bubble mail-bubble">
            <Mail size={size} color="#FFFFFF" />
          </div>
        );
      case 'phone':
      case 'call':
        return (
          <div className="linktree-icon-bubble phone-bubble">
            <Phone size={size} color="#FFFFFF" />
          </div>
        );
      case 'map':
      case 'location':
        return (
          <div className="linktree-icon-bubble map-bubble">
            <MapPin size={size} color="#FFFFFF" />
          </div>
        );
      default:
        return (
          <div className="linktree-icon-bubble default-bubble">
            <Sparkles size={size} color="#FFFFFF" />
          </div>
        );
    }
  };

  return (
    <main className="linktree-main-container">
      {/* Dynamic Background Glows */}
      <div className="linktree-bg-gradient"></div>
      <div className="linktree-ambient-orb orb-top"></div>
      <div className="linktree-ambient-orb orb-bottom"></div>

      {/* Central Glass Bento Canvas */}
      <div className="linktree-glass-canvas">
        {/* Top Bar: Live Status & Actions */}
        <div className="linktree-top-bar">
          <div className="linktree-live-status-pill">
            <span className="linktree-live-dot" />
            <span>Islandwide Delivery Active</span>
          </div>

          <div className="linktree-top-action-group">
            <button
              onClick={handleShare}
              className="linktree-share-btn"
              title="Share this page"
              aria-label="Share Link"
            >
              <Share2 size={13} />
              <span>Share</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="linktree-copy-btn"
              title="Copy link"
              aria-label="Copy Link"
            >
              {copied ? (
                <>
                  <Check size={13} color="#10B981" />
                  <span style={{ color: '#10B981' }}>Copied</span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Brand Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="linktree-profile-wrap"
        >
          <div className="linktree-avatar-wrap">
            <img
              src={businessProfile?.logo || '/eeco_logo.png'}
              alt={businessProfile?.businessName || 'Business Logo'}
              className="linktree-avatar-img"
            />
            <div className="linktree-avatar-ring"></div>
          </div>

          <h1 className="linktree-brand-title">
            {businessProfile?.businessName || settings?.storeName || 'EECO AROMATICS'}
            <CheckCircle2 size={19} className="linktree-verified-badge" />
          </h1>

          <span className="linktree-tagline-badge">
            ✦ We Care About You ✦
          </span>

          <p className="linktree-brand-desc">
            {businessProfile?.description ||
              'Sri Lanka’s premier brand for 100% pure natural herbal incense sticks, dhoop powder, aroma room diffusers & air fresheners.'}
          </p>

          {/* Trust Metric Chips */}
          <div className="linktree-trust-strip">
            <span className="linktree-trust-chip">
              <Leaf size={12} color="#059669" />
              100% Natural
            </span>
            <span className="linktree-trust-chip">
              <Truck size={12} color="#2563EB" />
              Fast Islandwide COD
            </span>
            <span className="linktree-trust-chip">
              <Star size={12} fill="#F59E0B" color="#F59E0B" />
              4.9/5 Quality Rating
            </span>
          </div>
        </motion.div>

        {/* Bento Content Stack */}
        <div className="linktree-bento-stack">
          {/* 1. Hero Primary Links (Full-Width Bento Cards with rich info) */}
          {heroLinks.map((link, index) => {
            const isWhatsapp = (link.icon || '').toLowerCase() === 'whatsapp';
            const isInternal = link.url.startsWith('/') && !link.url.startsWith('//');
            const cardContent = (
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ scale: 1.015, y: -2 }}
                whileTap={{ scale: 0.985 }}
                className={`linktree-hero-bento-card ${
                  link.highlight
                    ? isWhatsapp
                      ? 'whatsapp-highlighted highlighted'
                      : 'highlighted'
                    : ''
                }`}
              >
                {renderLinkIcon(link.icon, 20)}
                <div className="linktree-hero-info">
                  <div className="linktree-hero-title-row">
                    <span className="linktree-hero-title">{link.title}</span>
                    {link.badge && (
                      <span className="linktree-btn-badge">{link.badge}</span>
                    )}
                  </div>
                  {link.subtitle && (
                    <span className="linktree-hero-subtitle">{link.subtitle}</span>
                  )}
                </div>
                <div className="linktree-hero-action-btn">
                  <ArrowUpRight size={17} />
                </div>
                <div className="linktree-btn-shimmer" />
              </motion.div>
            );

            return isInternal ? (
              <Link key={link.id || index} href={link.url} style={{ textDecoration: 'none' }}>
                {cardContent}
              </Link>
            ) : (
              <a
                key={link.id || index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                {cardContent}
              </a>
            );
          })}

          {/* 2. Social Channels (2x2 Modern Bento Grid) */}
          {socialLinks.length > 0 && (
            <div className="linktree-social-bento-grid">
              {socialLinks.map((link, idx) => (
                <motion.a
                  key={link.id || idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="linktree-social-tile"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, delay: 0.15 + idx * 0.06 }}
                  whileHover={{ scale: 1.025, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="linktree-social-tile-top">
                    {renderLinkIcon(link.icon, 18)}
                    <ArrowUpRight size={16} className="linktree-social-tile-arrow" />
                  </div>
                  <div className="linktree-social-tile-bottom">
                    <span className="linktree-social-tile-title">{link.title}</span>
                    {link.subtitle && (
                      <span className="linktree-social-tile-sub" title={link.subtitle}>
                        {link.subtitle}
                      </span>
                    )}
                  </div>
                  <div className="linktree-btn-shimmer" />
                </motion.a>
              ))}
            </div>
          )}

          {/* 3. Other Links (Contact / Inquiries) */}
          {otherLinks.length > 0 && (
            <div className="linktree-contact-strip">
              {otherLinks.map((link, idx) => (
                <motion.a
                  key={link.id || idx}
                  href={link.url}
                  target={link.url.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="linktree-contact-pill-btn"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {link.icon === 'gmail' || link.icon === 'mail' ? (
                    <Mail size={16} color="#EA4335" />
                  ) : link.icon === 'phone' ? (
                    <Phone size={16} color="#059669" />
                  ) : (
                    <Sparkles size={16} color="#3B82F6" />
                  )}
                  <span>{link.title}</span>
                </motion.a>
              ))}
            </div>
          )}
        </div>

        {/* Quality Guarantee Seal */}
        <div className="linktree-guarantee-box">
          <ShieldCheck size={18} color="#059669" />
          <span>100% Genuine Sri Lankan Herbal Formulations • Direct Dispatch</span>
        </div>

        {/* Minimal Footer */}
        <footer className="linktree-footer">
          <span>&copy; {new Date().getFullYear()} {businessProfile?.businessName || settings?.storeName || 'EECO AROMATICS'}</span>
          <span className="linktree-footer-divider">•</span>
          <span>We Care About You</span>
        </footer>
      </div>
    </main>
  );
}
