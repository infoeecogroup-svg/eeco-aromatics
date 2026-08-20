'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Sparkles, Plus, Minus, ArrowRight, MessageCircle } from 'lucide-react';
import { EASE_ULTRA_SMOOTH } from './animations';
import { useStore } from '../context/store-context';

export const CartDrawer: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { cart, updateCartQuantity, settings } = useStore();

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleWhatsAppCheckout = () => {
    const itemsList = cart
      .map((item, idx) => `${idx + 1}. ${item.name} x${item.quantity} - Rs. ${(item.price * item.quantity).toLocaleString()}.00`)
      .join('\n');
    const msg = `*NEW ORDER FROM WEBSITE*\n\n*Items Ordered:*\n${itemsList}\n\n*Total Amount:* Rs. ${totalCartPrice.toLocaleString()}.00\n*Payment:* Cash on Delivery\n\nPlease confirm my order!`;
    window.open(`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(4px)',
            zIndex: 15000,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.div
            style={{
              width: '100%',
              maxWidth: '430px',
              height: '100%',
              background: '#FFFFFF',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '-15px 0 40px rgba(0,0,0,0.2)',
            }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: EASE_ULTRA_SMOOTH }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
                borderBottom: '1px solid #E5E7EB',
                paddingBottom: '16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShoppingCart size={22} color="#1A56DB" />
                <h3 style={{ fontSize: '18px', fontWeight: 800 }}>Shopping Cart ({totalCartCount})</h3>
              </div>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#F3F4F6',
                  display: 'grid',
                  placeItems: 'center',
                  cursor: 'pointer',
                  border: 'none',
                }}
              >
                <X size={18} />
              </motion.button>
            </div>

            {/* Cart Items List */}
            <div style={{ flex: 1, overflowY: 'auto', paddingRight: '4px' }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#6B7280', marginTop: '70px' }}>
                  <ShoppingCart size={56} style={{ opacity: 0.25, marginBottom: '12px' }} />
                  <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#111827', marginBottom: '6px' }}>Your cart is empty</h4>
                  <p style={{ fontSize: '13px' }}>Explore our authentic Sri Lankan aromatic packs to add fragrance to your cart.</p>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div
                    key={item.id}
                    style={{
                      display: 'flex',
                      gap: '12px',
                      marginBottom: '14px',
                      alignItems: 'center',
                      borderBottom: '1px solid #F3F4F6',
                      paddingBottom: '14px',
                    }}
                    layout
                  >
                    <div
                      style={{
                        width: '56px',
                        height: '56px',
                        background: '#F8FAFC',
                        borderRadius: '10px',
                        display: 'grid',
                        placeItems: 'center',
                        overflow: 'hidden',
                        border: '1px solid #E2E8F0',
                      }}
                    >
                      {item.image ? (
                        <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <Sparkles size={22} color="#1A56DB" />
                      )}
                    </div>

                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '13.5px', fontWeight: 700, lineHeight: 1.3, marginBottom: '4px' }}>{item.name}</h4>
                      <span style={{ fontSize: '13.5px', color: '#1A56DB', fontWeight: 800 }}>
                        Rs. {item.price.toLocaleString()}.00
                      </span>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        border: '1.5px solid #E5E7EB',
                        borderRadius: '6px',
                        padding: '2px 8px',
                      }}
                    >
                      <button
                        onClick={() => updateCartQuantity(item.id, -1)}
                        style={{ cursor: 'pointer', border: 'none', background: 'none' }}
                      >
                        <Minus size={12} />
                      </button>
                      <span style={{ fontSize: '13px', fontWeight: 700, minWidth: '16px', textAlign: 'center' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, 1)}
                        style={{ cursor: 'pointer', border: 'none', background: 'none' }}
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '17px', marginBottom: '16px' }}>
                  <span>Total Amount:</span>
                  <span style={{ color: '#1A56DB' }}>Rs. {totalCartPrice.toLocaleString()}.00</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <motion.button
                    style={{
                      width: '100%',
                      background: '#25D366',
                      color: '#FFFFFF',
                      padding: '14px',
                      borderRadius: '999px',
                      fontWeight: 700,
                      fontSize: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      border: 'none',
                      boxShadow: '0 6px 16px rgba(37, 211, 102, 0.3)',
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleWhatsAppCheckout}
                  >
                    <MessageCircle size={18} />
                    <span>Order All on WhatsApp</span>
                  </motion.button>

                  <a
                    href="/cart"
                    onClick={() => onClose()}
                    style={{
                      width: '100%',
                      background: '#F3F4F6',
                      color: '#374151',
                      padding: '12px',
                      borderRadius: '999px',
                      fontWeight: 700,
                      fontSize: '13.5px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      textAlign: 'center',
                    }}
                  >
                    <span>View Full Checkout</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
