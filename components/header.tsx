'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  UserCircle,
  ShoppingCart,
  ChevronDown,
  Package,
  Heart,
  MessageCircle,
  User,
  ShieldCheck,
} from 'lucide-react';
import { dropdownMenuVariant, dropdownItemVariant } from './animations';
import { useStore } from '../context/store-context';

export const Header: React.FC<{ onOpenCart: () => void }> = ({ onOpenCart }) => {
  const { settings, cart, wishlist, showToast } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setAccountOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="main-header">
      <div className="main-header-inner layout-max-width">
        {/* Brand Logo */}
        <Link href="/" className="brand-logo">
          <img src="/eeco_logo.png" alt="EECO AROMATICS Logo" className="header-logo-img" />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="logo-title">{settings.storeName}</span>
            <span className="logo-slogan-text">{settings.storeSlogan}</span>
          </div>
        </Link>

        {/* Global Search Bar */}
        <form className="header-search-wrap" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search Incense Sticks, Powder, Air Fresheners, Diffusers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-btn-icon" aria-label="Search">
            <Search size={20} />
          </button>
        </form>

        {/* Header Right Controls */}
        <div className="header-right-controls">
          {/* Account Dropdown */}
          <div className="account-dropdown-wrapper" ref={accountRef}>
            <motion.div
              className="control-box"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setAccountOpen((prev) => !prev)}
            >
              <div className="yellow-circle-icon">
                <UserCircle size={22} />
              </div>
              <div className="control-labels">
                <span className="small-label">Account</span>
                <span className="large-label">
                  My Profile{' '}
                  <motion.span animate={{ rotate: accountOpen ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ display: 'inline-flex' }}>
                    <ChevronDown size={13} />
                  </motion.span>
                </span>
              </div>
            </motion.div>

            <AnimatePresence>
              {accountOpen && (
                <motion.div
                  className="account-dropdown-menu"
                  variants={dropdownMenuVariant}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                >
                  <div className="account-menu-header">
                    <h4>Welcome to EECO</h4>
                    <p>Instant WhatsApp shopping enabled</p>
                  </div>

                  <Link
                    href="/track-order"
                    className="account-dropdown-item"
                    onClick={() => setAccountOpen(false)}
                  >
                    <Package size={16} color="#1A56DB" />
                    <span>Track My Order</span>
                  </Link>

                  <Link
                    href="/wishlist"
                    className="account-dropdown-item"
                    onClick={() => setAccountOpen(false)}
                  >
                    <Heart size={16} color="#E11D48" />
                    <span>Wishlist ({wishlist.length})</span>
                  </Link>

                  <a
                    href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent('Hi EECO AROMATICS, I need customer support!')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="account-dropdown-item"
                    onClick={() => setAccountOpen(false)}
                  >
                    <MessageCircle size={16} color="#25D366" />
                    <span>WhatsApp Helpdesk</span>
                  </a>

                  <button
                    className="account-dropdown-item login-btn"
                    onClick={() => {
                      setAccountOpen(false);
                      showToast('Instant WhatsApp ordering active across the entire store!');
                    }}
                  >
                    <User size={15} />
                    <span>Instant WhatsApp Order</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Shopping Cart Control */}
          <motion.div
            className="control-box"
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.94 }}
            onClick={onOpenCart}
          >
            <div className="yellow-circle-icon">
              <ShoppingCart size={22} />
            </div>
            <div className="control-labels">
              <span className="small-label">Cart</span>
              <span className="large-label">{totalCartCount}– Items</span>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
};
