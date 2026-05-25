'use client';

/**
 * CRAFT (aura-craft step 4.5 · 2026-05-12)
 * Lead: — (overlay utility · no type hierarchy · no content · motion only)
 * Type rhythm: — (no text content · purely visual progress indicator)
 * Motion: scroll-linked scaleX (counts as 0 per motion budget — continuous utility · not an animation event) · useScroll + useTransform scrollYProgress → scaleX 0→1
 *   — useReducedMotion: hides entirely (display:none when reduced motion preferred · not just stopped)
 * Depth: — (fixed top 0 · z-50 · 3px height · no card chrome · no shadow)
 * Mobile: same behavior (fixed positioned · viewport-relative · no mobile override needed)
 */

/**
 * ReadingProgressBar — overlay · fixed top (recipe row 37)
 *
 * Fixed 3px bar at top of viewport. Ken Red fill scaleX from 0→100%.
 * Hidden over hero (top ~100vh). Framer useScroll + useTransform.
 * useReducedMotion: hide entirely if reduced motion preferred.
 *
 * A11y: role="progressbar" aria-valuemin/max/now aria-label
 * No SectionWrapper — overlay element.
 */

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

export function ReadingProgressBar() {
  const shouldReduceMotion = useReducedMotion() ?? false;
  // Use ref for heroHeight to avoid setState-in-effect lint error
  const heroHeightRef = useRef(600);
  const [pct, setPct] = useState(0);
  const [visible, setVisible] = useState(false);
  const { scrollYProgress, scrollY } = useScroll();

  // Measure hero height on mount using a layout effect approximation
  // Store in ref, not state — avoids cascading render + lint error
  useEffect(() => {
    const heroEl = document.querySelector('[data-section="report-hero"]') as HTMLElement | null;
    if (heroEl) {
      heroHeightRef.current = heroEl.offsetTop + heroEl.offsetHeight;
    } else {
      heroHeightRef.current = window.innerHeight * 0.9;
    }
  }, []);

  // Track scroll pct for aria-valuenow
  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => setPct(Math.round(v * 100)));
    return unsub;
  }, [scrollYProgress]);

  // Visibility: hide while within hero zone
  useEffect(() => {
    const unsub = scrollY.on('change', (y) => {
      setVisible(y > heroHeightRef.current);
    });
    return unsub;
  }, [scrollY]);

  // scaleX driven by scroll progress
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Reduced motion: hide bar entirely
  if (shouldReduceMotion) return null;

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
      aria-label="Reading progress"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 60,
        height: '3px',
        backgroundColor: 'rgba(0, 0, 0, 0.06)',
        pointerEvents: 'none',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}
    >
      <motion.div
        style={{
          height: '100%',
          backgroundColor: 'var(--color-brand-red)',
          transformOrigin: 'left',
          scaleX,
        }}
      />
    </div>
  );
}
