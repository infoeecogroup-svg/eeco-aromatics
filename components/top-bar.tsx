'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Headphones, Globe, RefreshCw, Check, ChevronDown, ShieldCheck } from 'lucide-react';
import { dropdownMenuVariant, dropdownItemVariant } from './animations';
import { useStore } from '../context/store-context';

export const TopBar: React.FC = () => {
  const { settings, wishlist, showToast } = useStore();
  const [language, setLanguage] = useState<'English' | 'Sinhala' | 'Tamil'>('English');
  const [languageOpen, setLanguageOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLanguageOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  return (
    <div className="top-bar">
      <div className="top-bar-inner layout-max-width">
        <div className="top-bar-left">
          <a
            href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent('Hi EECO AROMATICS, I need customer support!')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="top-whatsapp-pill"
          >
            <Headphones size={14} />
            <span>WhatsApp Support</span>
          </a>

          <div className="top-separator"></div>

          {/* Language Selector */}
          <div className="language-dropdown-wrapper" ref={langRef}>
            <button
              className="top-item lang-btn-pill"
              onClick={() => setLanguageOpen((prev) => !prev)}
              aria-label="Select Language"
            >
              <Globe size={14} />
              <span>{language}</span>
              <motion.div animate={{ rotate: languageOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown size={12} />
              </motion.div>
            </button>

            <AnimatePresence>
              {languageOpen && (
                <motion.div
                  className="language-dropdown-menu"
                  variants={dropdownMenuVariant}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                >
                  {[
                    { code: 'English', label: 'English (US)' },
                    { code: 'Sinhala', label: 'Sinhala (සිංහල)' },
                    { code: 'Tamil', label: 'Tamil (தமிழ்)' },
                  ].map((lang) => (
                    <motion.button
                      key={lang.code}
                      variants={dropdownItemVariant}
                      className={`language-option-btn ${language === lang.code ? 'active' : ''}`}
                      onClick={() => {
                        setLanguage(lang.code as any);
                        setLanguageOpen(false);
                        showToast(`Language set to ${lang.label}`);
                      }}
                    >
                      <span>{lang.label}</span>
                      {language === lang.code && <Check size={14} />}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="top-bar-center">
          <div className="top-item">
            <RefreshCw size={13} />
            <span>{settings.storeName}</span>
            <span className="discount-pill">WE CARE ABOUT YOU</span>
            <span>Cash on Delivery</span>
          </div>
        </div>

        <div className="top-bar-right">
          <Link href="/about">About us</Link>
          <div className="top-separator"></div>
          <Link href="/track-order">Track Order</Link>
          <div className="top-separator"></div>
          <Link href="/wishlist">My Wishlist ({wishlist.length})</Link>
        </div>
      </div>
    </div>
  );
};
