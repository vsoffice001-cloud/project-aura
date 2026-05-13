'use client';

/**
 * ReadingProgressBar — Recipe report-detail.md lines 79-81
 * position: fixed top-0 · Ken red accent · 3px tall
 * Hidden over hero (startY > 100vh) · useScroll + useTransform
 * Reduced-motion: static progress bar (no animation) — still functional
 */

import { useEffect, useState } from 'react';
import { useScroll, useTransform, useReducedMotion, motion } from 'framer-motion';

const BAR_HEIGHT = 3; // px
const HERO_THRESHOLD_VH = 0.85; // start fill after 85vh

export function ReadingProgressBar() {
  const prefersReduced = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [staticProgress, setStaticProgress] = useState(0);

  const { scrollYProgress } = useScroll();

  // Framer transform: map [0,1] → ['0%', '100%'] for scaleX
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const checkVisibility = () => {
      const threshold = window.innerHeight * HERO_THRESHOLD_VH;
      setIsVisible(window.scrollY > threshold);

      if (prefersReduced) {
        // For reduced motion: update static progress manually
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? window.scrollY / docHeight : 0;
        setStaticProgress(Math.min(pct, 1));
      }
    };

    checkVisibility();
    window.addEventListener('scroll', checkVisibility, { passive: true });
    return () => window.removeEventListener('scroll', checkVisibility);
  }, [prefersReduced]);

  return (
    <div
      role="progressbar"
      aria-label="Reading progress"
      aria-valuenow={prefersReduced ? Math.round(staticProgress * 100) : undefined}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed top-0 inset-x-0 z-[9999] pointer-events-none"
      style={{ height: `${BAR_HEIGHT}px`, opacity: isVisible ? 1 : 0, transition: 'opacity 0.3s ease' }}
    >
      {prefersReduced ? (
        // Static bar for reduced-motion — no JS animation
        <div
          style={{
            height: '100%',
            width: `${staticProgress * 100}%`,
            background: 'var(--color-brand-red, #b01f24)',
          }}
        />
      ) : (
        <motion.div
          style={{
            height: '100%',
            width: '100%',
            scaleX,
            transformOrigin: 'left',
            background: 'var(--color-brand-red, #b01f24)',
          }}
        />
      )}
    </div>
  );
}
