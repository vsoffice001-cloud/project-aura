/**
 * FadeInSection — Atom (scroll-entrance wrapper)
 *
 * WHY: Provides a reusable, accessible scroll-driven entrance animation so
 * every section / card gets a consistent reveal without each component
 * hand-rolling its own IntersectionObserver or Framer Motion setup.
 *
 * WHAT: Wraps children in a Framer Motion `motion.div` that fades in (and
 * optionally slides up) when the element enters the viewport via `useInView`.
 * Respects `prefers-reduced-motion` — skips animation entirely when set.
 *
 * WHEN:
 * - Wrap any section, card grid, or standalone block you want revealed on scroll.
 * - Use `delay` to stagger sibling reveals (e.g., 0, 100, 200ms).
 *
 * WHEN NOT:
 * - Don't wrap every DOM node — only top-level section blocks or major cards.
 * - Don't use inside hero sections where content should be visible immediately.
 *
 * HOW:
 * ```tsx
 * <FadeInSection delay={0}>
 *   <p>Visible on scroll</p>
 * </FadeInSection>
 *
 * // Staggered children
 * {items.map((item, i) => (
 *   <FadeInSection key={item.id} delay={i * 80}>
 *     <Card>{item.title}</Card>
 *   </FadeInSection>
 * ))}
 * ```
 *
 * ANIMATION STACK: Framer Motion `useInView` + `motion.div` (no GSAP, no Lenis).
 * Smooth page scroll = native CSS `scroll-behavior: smooth` in DS base.css.
 * Reduced motion = `useReducedMotion()` bypasses all transform/opacity animation.
 *
 * @promotedFrom Design_system_vs_26/src/app/components/FadeInSection.tsx
 * @portedDate 2026-05-12 — DS Port Batch 1
 */
'use client';

import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

export interface FadeInSectionProps {
  children: React.ReactNode;
  /** Delay in ms before animation starts once in-view. */
  delay?: number;
  /** Slide direction on reveal. `'up'` = translateY from 16px. `'none'` = fade only. */
  direction?: 'up' | 'none';
  /** Additional CSS classes applied to the wrapper div. */
  className?: string;
  /** IntersectionObserver threshold (0-1). Default 0.1 = triggers when 10% visible. */
  threshold?: number;
}

export function FadeInSection({
  children,
  delay = 0,
  direction = 'up',
  className,
  threshold = 0.1,
}: FadeInSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const isInView = useInView(ref, {
    once: true,
    margin: '0px 0px -40px 0px',
    amount: threshold,
  });

  /* Skip animation entirely when prefers-reduced-motion is set */
  if (prefersReduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  const translateY = direction === 'up' ? 16 : 0;

  const variants = {
    hidden:  { opacity: 0, y: translateY },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        delay: delay / 1000,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {children}
    </motion.div>
  );
}
