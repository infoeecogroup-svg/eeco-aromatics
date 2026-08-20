'use client';

import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3.5px',
        transformOrigin: '0%',
        scaleX,
        zIndex: 9999,
        background: 'linear-gradient(90deg, #1A56DB 0%, #059669 35%, #F59E0B 70%, #E11D48 100%)',
        boxShadow: '0 0 12px rgba(26, 86, 219, 0.6), 0 0 4px rgba(245, 158, 11, 0.4)',
      }}
    />
  );
};
