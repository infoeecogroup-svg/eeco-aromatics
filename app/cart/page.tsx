'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  MessageCircle,
  Truck,
  ShieldCheck,
  Tag,
  Check,
} from 'lucide-react';
import { useStore } from '../../context/store-context';
import { TopBar } from '../../components/top-bar';
import { Header } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { Footer } from '../../components/footer';
import { AnimatedSection } from '../../components/animations';

export default function CartPage() {
  const { cart, updateCartQuantity, removeFromCart, clearCart, settings, showToast } = useStore();
  const [coupon, setCoupon] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [orderNotes, setOrderNotes] = useState('');

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const isFreeDelivery = subtotal >= settings.freeDeliveryThreshold;
  const deliveryFee = isFreeDelivery || subtotal === 0 ? 0 : settings.deliveryFee;
  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  const applyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (coupon.trim().toUpperCase() === 'EECO10') {
      setDiscountPercent(10);
      showToast('Promo Code EECO10 Applied (10% Discount)!');
    } else if (coupon.trim().toUpperCase() === 'FREE') {
      setDiscountPercent(15);
      showToast('Special Promo Applied (15% Discount)!');
    } else {
      showToast('Invalid promo code. Try EECO10');
    }
  };

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;
    if (!customerName || !customerPhone || !customerAddress) {
      showToast('Please provide your name, phone number, and delivery address.');
      return;
    }

    const itemsSummary = cart
      .map((item, idx) => `${idx + 1}. ${item.name} x${item.quantity} - Rs. ${(item.price * item.quantity).toLocaleString()}.00`)
      .join('\n');

    const msg = `*🛍️ NEW ORDER CONFIRMATION*\n----------------------------------\n*Customer Name:* ${customerName}\n*Phone / WhatsApp:* ${customerPhone}\n*Delivery Address:* ${customerAddress}, ${customerCity || 'Sri Lanka'}\n\n*🛒 Items Ordered:*\n${itemsSummary}\n\n*Subtotal:* Rs. ${subtotal.toLocaleString()}.00\n*Discount:* Rs. ${discountAmount.toLocaleString()}.00\n*Delivery Fee:* ${deliveryFee === 0 ? 'FREE' : `Rs. ${deliveryFee}.00`}\n*TOTAL PAYABLE:* Rs. ${grandTotal.toLocaleString()}.00\n*Payment Method:* Cash on Delivery\n${orderNotes ? `*Notes:* ${orderNotes}\n` : ''}\nPlease confirm my delivery schedule!`;

    window.open(`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopBar />
      <Header onOpenCart={() => {}} />
      <Navigation />

      <div className="layout-max-width" style={{ padding: '40px 24px 80px' }}>
        {/* Breadcrumb */}
        <div className="shop-breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span style={{ color: '#111827', fontWeight: 700 }}>Shopping Cart &amp; Checkout</span>
        </div>

        <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#111827', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ShoppingCart size={32} color="#1A56DB" />
          <span>Shopping Cart ({cart.reduce((s, i) => s + i.quantity, 0)} Items)</span>
        </h1>

        {cart.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px', background: '#FFFFFF', borderRadius: '24px', border: '1px solid #E5E7EB' }}>
            <ShoppingCart size={64} color="#CBD5E1" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#111827', marginBottom: '8px' }}>Your Shopping Cart is Empty</h3>
            <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '24px' }}>
              Add some of our authentic Sri Lankan incense and aroma packs to proceed.
            </p>
            <Link href="/shop" style={{ textDecoration: 'none' }}>
              <button
                style={{
                  backgroundColor: '#1A56DB',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '12px 28px',
                  borderRadius: '999px',
                  fontWeight: 700,
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                Browse Shop Catalog
              </button>
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '40px', alignItems: 'start' }}>
            {/* Left: Cart Items Table */}
            <div>
              <div
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '20px',
                  padding: '24px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
                  marginBottom: '24px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid #F3F4F6', marginBottom: '16px' }}>
                  <span style={{ fontSize: '15px', fontWeight: 800, color: '#111827' }}>Product Details</span>
                  <button
                    onClick={clearCart}
                    style={{ background: 'none', border: 'none', color: '#EF4444', fontSize: '13px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <Trash2 size={14} />
                    <span>Clear Cart</span>
                  </button>
                </div>

                {cart.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      padding: '14px 0',
                      borderBottom: '1px solid #F3F4F6',
                    }}
                  >
                    <div
                      style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '12px',
                        background: '#F8FAFC',
                        border: '1px solid #E2E8F0',
                        overflow: 'hidden',
                        display: 'grid',
                        placeItems: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {item.image ? (
                        <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <ShoppingCart size={24} color="#1A56DB" />
                      )}
                    </div>

                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '14.5px', fontWeight: 700, color: '#111827', marginBottom: '4px', lineHeight: 1.3 }}>
                        {item.name}
                      </h4>
                      <span style={{ fontSize: '14px', fontWeight: 800, color: '#1A56DB' }}>
                        Rs. {item.price.toLocaleString()}.00
                      </span>
                    </div>

                    {/* Quantity Controls */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        border: '1.5px solid #E5E7EB',
                        borderRadius: '8px',
                        padding: '4px 10px',
                      }}
                    >
                      <button
                        onClick={() => updateCartQuantity(item.id, -1)}
                        style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                      >
                        <Minus size={13} />
                      </button>
                      <span style={{ fontSize: '14px', fontWeight: 800, minWidth: '20px', textAlign: 'center' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, 1)}
                        style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    <span style={{ fontSize: '15px', fontWeight: 800, color: '#111827', minWidth: '100px', textAlign: 'right' }}>
                      Rs. {(item.price * item.quantity).toLocaleString()}.00
                    </span>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{ border: 'none', background: 'none', color: '#9CA3AF', cursor: 'pointer', padding: '6px' }}
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Delivery Details Form */}
              <div
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '20px',
                  padding: '24px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
                }}
              >
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#111827', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Truck size={20} color="#1A56DB" />
                  <span>Doorstep Delivery Address</span>
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '6px' }}>
                      Recipient Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Kasun Silva"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #D1D5DB', fontSize: '14px', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '6px' }}>
                      WhatsApp Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 077 123 4567"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #D1D5DB', fontSize: '14px', outline: 'none' }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '6px' }}>
                    Street Address *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. No. 123, Kandy Road"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #D1D5DB', fontSize: '14px', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '6px' }}>
                      City / District
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Gampaha / Colombo"
                      value={customerCity}
                      onChange={(e) => setCustomerCity(e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #D1D5DB', fontSize: '14px', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '6px' }}>
                      Special Delivery Notes
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Call before delivery"
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #D1D5DB', fontSize: '14px', outline: 'none' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Order Summary Card */}
            <div
              style={{
                background: '#FFFFFF',
                border: '1.5px solid #E5E7EB',
                borderRadius: '24px',
                padding: '28px',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.05)',
                position: 'sticky',
                top: '94px',
              }}
            >
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#111827', marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid #F3F4F6' }}>
                Order Summary
              </h3>

              {/* Promo code form */}
              <form onSubmit={applyCoupon} style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                <div style={{ flex: 1, position: 'relative' }}>
                  <Tag size={16} color="#9CA3AF" style={{ position: 'absolute', top: '12px', left: '12px' }} />
                  <input
                    type="text"
                    placeholder="Promo Code (EECO10)"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px 10px 36px', borderRadius: '8px', border: '1.5px solid #D1D5DB', fontSize: '13.5px', outline: 'none' }}
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#111827',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '10px 16px',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '13px',
                    cursor: 'pointer',
                  }}
                >
                  Apply
                </button>
              </form>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14.5px', color: '#4B5563', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #F3F4F6' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Items Subtotal:</span>
                  <span style={{ fontWeight: 700, color: '#111827' }}>Rs. {subtotal.toLocaleString()}.00</span>
                </div>

                {discountAmount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#D9003B', fontWeight: 700 }}>
                    <span>Promo Discount ({discountPercent}%):</span>
                    <span>- Rs. {discountAmount.toLocaleString()}.00</span>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Islandwide Delivery:</span>
                  <span style={{ fontWeight: 700, color: deliveryFee === 0 ? '#15803D' : '#111827' }}>
                    {deliveryFee === 0 ? 'FREE' : `Rs. ${deliveryFee}.00`}
                  </span>
                </div>

                {isFreeDelivery && (
                  <span style={{ fontSize: '12px', color: '#15803D', fontWeight: 700, background: '#F0FDF4', padding: '4px 8px', borderRadius: '6px' }}>
                    🎉 Qualified for FREE Islandwide Delivery!
                  </span>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', fontWeight: 800, color: '#111827', marginBottom: '24px' }}>
                <span>Total Amount:</span>
                <span style={{ color: '#1A56DB' }}>Rs. {grandTotal.toLocaleString()}.00</span>
              </div>

              <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', padding: '12px 14px', borderRadius: '12px', marginBottom: '20px', fontSize: '12.5px', color: '#166534', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Check size={16} />
                <span>Cash on Delivery (COD) available islandwide</span>
              </div>

              <motion.button
                style={{
                  width: '100%',
                  backgroundColor: '#25D366',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '999px',
                  padding: '16px',
                  fontWeight: 800,
                  fontSize: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(37, 211, 102, 0.35)',
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleWhatsAppCheckout}
              >
                <MessageCircle size={20} />
                <span>Complete Order on WhatsApp</span>
              </motion.button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
