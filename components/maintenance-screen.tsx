'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Wrench, MessageSquare, ShieldCheck, Sparkles } from 'lucide-react';
import { useStore } from '../context/store-context';

export const MaintenanceScreen: React.FC = () => {
  const { settings } = useStore();

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 50%, #065F46 100%)',
        color: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        textAlign: 'center',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          maxWidth: '620px',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRadius: '28px',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          padding: '48px 36px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.3)',
        }}
      >
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'var(--accent-yellow)',
            color: '#111827',
            display: 'grid',
            placeItems: 'center',
            margin: '0 auto 24px auto',
            boxShadow: '0 8px 24px rgba(255, 190, 0, 0.4)',
          }}
        >
          <Wrench size={38} />
        </div>

        <span
          style={{
            background: 'rgba(255, 255, 255, 0.2)',
            padding: '4px 14px',
            borderRadius: '999px',
            fontSize: '12px',
            fontWeight: 800,
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}
        >
          {settings.storeName}
        </span>

        <h1 style={{ fontSize: '32px', fontWeight: 800, marginTop: '16px', marginBottom: '14px', lineHeight: 1.2 }}>
          Temporary Store Maintenance
        </h1>

        <p style={{ fontSize: '15px', color: '#E0F2FE', lineHeight: 1.6, marginBottom: '32px' }}>
          {settings.maintenanceNotice}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
          <motion.a
            href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent('Hi EECO AROMATICS! I want to place an order during maintenance.')}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: '#25D366',
              color: '#FFFFFF',
              padding: '14px 28px',
              borderRadius: '999px',
              fontWeight: 700,
              fontSize: '15px',
              textDecoration: 'none',
              boxShadow: '0 8px 20px rgba(37, 211, 102, 0.4)',
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <MessageSquare size={20} />
            <span>Chat with Us on WhatsApp</span>
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
};
