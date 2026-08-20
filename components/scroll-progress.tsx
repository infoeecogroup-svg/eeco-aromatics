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
        background: 'linear-gradient(90deg, #078A83 0%, #FFBE00 50%, #D9003B 100%)',
        boxShadow: '0 0 12px rgba(7, 138, 131, 0.6), 0 0 4px rgba(255, 190, 0, 0.4)',
      }}
    />
  );
};
