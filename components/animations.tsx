'use client';

import React from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export const EASE_ULTRA_SMOOTH: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const SPRING_SMOOTH = { type: 'spring' as const, stiffness: 350, damping: 25 };
export const SPRING_BOUNCE = { type: 'spring' as const, stiffness: 450, damping: 18 };

// Smooth Rise-and-Settle animation for cards and elements
export const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 35, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: EASE_ULTRA_SMOOTH,
    },
  },
};

export const scaleInVariant: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: EASE_ULTRA_SMOOTH,
    },
  },
};

export const slideInLeftVariant: Variants = {
  hidden: { opacity: 0, x: -35 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: EASE_ULTRA_SMOOTH,
    },
  },
};

export const slideInRightVariant: Variants = {
  hidden: { opacity: 0, x: 35 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: EASE_ULTRA_SMOOTH,
    },
  },
};

export const staggerContainerVariant: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

export const dropdownMenuVariant: Variants = {
  hidden: {
    opacity: 0,
    y: -10,
    scale: 0.95,
    transition: { duration: 0.16, ease: 'easeOut' },
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.25,
      ease: EASE_ULTRA_SMOOTH,
      staggerChildren: 0.04,
      delayChildren: 0.02,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.95,
    transition: { duration: 0.16, ease: 'easeIn' },
  },
};

export const dropdownItemVariant: Variants = {
  hidden: { opacity: 0, x: -10 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.2, ease: EASE_ULTRA_SMOOTH },
  },
};

export const cardHoverProps = {
  whileHover: { y: -5, scale: 1.01 },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.25, ease: EASE_ULTRA_SMOOTH },
};

export const categoryHoverProps = {
  whileHover: { y: -5, scale: 1.025 },
  whileTap: { scale: 0.97 },
  transition: { duration: 0.25, ease: EASE_ULTRA_SMOOTH },
};

export const buttonHoverProps = {
  whileHover: { scale: 1.02, y: -1 },
  whileTap: { scale: 0.96 },
  transition: { duration: 0.2, ease: EASE_ULTRA_SMOOTH },
};

export const smallButtonTapProps = {
  whileHover: { scale: 1.08 },
  whileTap: { scale: 0.92 },
  transition: { duration: 0.15, ease: EASE_ULTRA_SMOOTH },
};

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className,
  style,
  delay = 0,
  direction = 'up',
}) => {
  const getInitial = () => {
    switch (direction) {
      case 'down': return { opacity: 0, y: -45 };
      case 'left': return { opacity: 0, x: 45 };
      case 'right': return { opacity: 0, x: -45 };
      case 'scale': return { opacity: 0, scale: 0.94 };
      case 'up':
      default:
        return { opacity: 0, y: 45, scale: 0.98 };
    }
  };

  return (
    <motion.section
      className={className}
      style={{
        willChange: 'transform, opacity',
        ...style,
      }}
      initial={getInitial()}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        transition: {
          duration: 0.7,
          delay,
          ease: EASE_ULTRA_SMOOTH,
        },
      }}
      viewport={{ once: true, amount: 0.1, margin: '0px 0px -40px 0px' }}
    >
      {children}
    </motion.section>
  );
};

export const AnimatedGrid: React.FC<{
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}> = ({ children, className, style }) => {
  return (
    <motion.div
      className={className}
      style={{
        willChange: 'transform, opacity',
        ...style,
      }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.08, margin: '0px 0px -30px 0px' }}
      variants={staggerContainerVariant}
    >
      {children}
    </motion.div>
  );
};

export interface ToastMessage {
  id: string;
  text: string;
}

export const ToastContainer: React.FC<{ toasts: ToastMessage[]; onDismiss: (id: string) => void }> = ({
  toasts,
}) => {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        zIndex: 20000,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        pointerEvents: 'none',
      }}
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 25, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9, transition: { duration: 0.2 } }}
            transition={SPRING_SMOOTH}
            style={{
              pointerEvents: 'auto',
              background: 'linear-gradient(135deg, #1A56DB 0%, #059669 100%)',
              color: '#FFFFFF',
              padding: '12px 20px',
              borderRadius: '999px',
              boxShadow: '0 12px 30px rgba(26, 86, 219, 0.35)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontWeight: 700,
              fontSize: '13.5px',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <motion.div
              initial={{ rotate: -45, scale: 0.5 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={SPRING_BOUNCE}
            >
              <CheckCircle2 size={18} color="#FFE76A" />
            </motion.div>
            <span>{toast.text}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
