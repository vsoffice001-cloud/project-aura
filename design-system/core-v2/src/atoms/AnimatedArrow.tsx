'use client';

import { ArrowUpRight } from 'lucide-react';
import { cn } from '../lib/cn';

export type AnimatedArrowColor = 'white' | 'black' | 'brand';

export interface AnimatedArrowProps {
  size?: number;
  color?: AnimatedArrowColor;
  isHovered?: boolean;
}

const colorClass: Record<AnimatedArrowColor, string> = {
  white: 'text-[var(--color-foundation-white)]',
  black: 'text-[var(--color-foundation-black)]',
  brand: 'text-[var(--color-brand-red)]',
};

/**
 * AnimatedArrow — 2-arrow replacement system for urgency CTAs.
 *
 * On hover: first arrow slides up-right + fades out, second arrow slides up
 * from below-left + fades in. ↗ direction signals forward momentum.
 *
 * USE FOR: urgency CTAs (forms, checkout, urgency redirects). Pair w/ shimmer.
 * DO NOT USE FOR: standard buttons (use `icon` prop instead).
 * Respects `prefers-reduced-motion` via `motion-reduce:transition-none`.
 *
 * @promotedFrom V0_lite_report
 */
export function AnimatedArrow({
  size = 20,
  color = 'white',
  isHovered = false,
}: AnimatedArrowProps) {
  return (
    <span
      className="relative inline-block overflow-visible align-middle"
      style={{ width: size, height: size }}
    >
      <ArrowUpRight
        size={size}
        strokeWidth={2}
        className={cn(
          'absolute top-0 left-0 block transition-all duration-300 ease-out motion-reduce:transition-none',
          colorClass[color],
          isHovered
            ? 'translate-x-[150%] -translate-y-[150%] opacity-0'
            : 'translate-x-0 translate-y-0 opacity-100',
        )}
      />
      <ArrowUpRight
        size={size}
        strokeWidth={2}
        className={cn(
          'absolute top-0 left-0 block transition-all duration-300 ease-out motion-reduce:transition-none',
          colorClass[color],
          isHovered
            ? 'translate-x-0 translate-y-0 opacity-100'
            : '-translate-x-[150%] translate-y-[150%] opacity-0',
        )}
      />
    </span>
  );
}
