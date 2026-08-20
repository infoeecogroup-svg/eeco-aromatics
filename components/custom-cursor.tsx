'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Position motion values for 120fps hardware-accelerated movement
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Ultra-smooth spring physics for outer trailing circle
  const springX = useSpring(mouseX, { stiffness: 450, damping: 28, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 450, damping: 28, mass: 0.5 });

  // Faster spring for inner precise dot
  const dotSpringX = useSpring(mouseX, { stiffness: 900, damping: 35, mass: 0.1 });
  const dotSpringY = useSpring(mouseY, { stiffness: 900, damping: 35, mass: 0.1 });

  useEffect(() => {
    // Detect touch device
    if (typeof window !== 'undefined') {
      const checkTouch = () => {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      };
      if (checkTouch()) {
        setIsTouchDevice(true);
        return;
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check if hovering interactive elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactiveEl = target.closest('button, a, input, select, [role="button"], .product-card-spec, .category-card-item, .benefit-card-spec, .clickable');
        if (interactiveEl) {
          setIsHovered(true);
          const customLabel = interactiveEl.getAttribute('data-cursor');
          setCursorText(customLabel || '');
        } else {
          setIsHovered(false);
          setCursorText('');
        }
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 99999,
      }}
    >
      {/* Outer Smooth Trailing Ring */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovered ? (cursorText ? 64 : 44) : isClicked ? 24 : 32,
          height: isHovered ? (cursorText ? 64 : 44) : isClicked ? 24 : 32,
          borderRadius: '50%',
          border: isHovered ? '2px solid rgba(7, 138, 131, 0.85)' : '1.5px solid rgba(7, 138, 131, 0.45)',
          backgroundColor: isHovered ? 'rgba(7, 138, 131, 0.12)' : 'transparent',
          boxShadow: isHovered ? '0 0 20px rgba(7, 138, 131, 0.3)' : 'none',
          transition: 'width 0.22s ease-out, height 0.22s ease-out, border 0.2s ease-out, background-color 0.2s ease-out, box-shadow 0.2s ease-out',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: isHovered ? 'blur(2px)' : 'none',
        }}
      >
        {cursorText && (
          <span
            style={{
              fontSize: '10px',
              fontWeight: 800,
              color: '#078A83',
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
            }}
          >
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Inner Fast Glow Core Dot */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: dotSpringX,
          y: dotSpringY,
          translateX: '-50%',
          translateY: '-50%',
          width: isClicked ? 10 : isHovered ? 6 : 7,
          height: isClicked ? 10 : isHovered ? 6 : 7,
          borderRadius: '50%',
          backgroundColor: isHovered ? '#FFBE00' : '#078A83',
          boxShadow: '0 0 10px rgba(255, 190, 0, 0.8)',
          transition: 'width 0.15s ease-out, height 0.15s ease-out, background-color 0.2s ease-out',
        }}
      />
    </div>
  );
};
