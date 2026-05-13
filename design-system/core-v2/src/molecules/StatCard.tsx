'use client';

import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { useAnimatedCounter } from '../hooks/useAnimatedCounter';
import { cn } from '../lib/cn';

export interface StatCardProps {
  /** Optional icon — when absent, stat renders without icon row */
  icon?: LucideIcon;
  /** Display value (e.g. "$45.2B", "32.5%", "200+") */
  value: string;
  label: string;
  /** Hex/CSS-var color for icon + glow accent. Default: var(--color-accent-purple). */
  color?: string;
  /** Stagger delay (seconds) for entrance animation. Default 0. */
  delay?: number;
  /** When true, animates value from 0 to numeric portion of `value`. Default false. */
  animate?: boolean;
  className?: string;
}

/**
 * StatCard — animated stat tile w/ icon + value + label.
 *
 * Used in: HeroSection stat row, KeyStats strip, Chapter1 metric grid.
 * `animate=true` triggers count-up via useAnimatedCounter when scrolled into view.
 *
 * Format detection by suffix: `B` (billions, 1 decimal), `%` (percent, 1 decimal),
 * `+` (count w/ plus suffix), default = integer.
 *
 * @promotedFrom V0_lite_report (HeroSection.tsx StatCard inline component)
 */
export function StatCard({
  icon: Icon,
  value,
  label,
  color = 'var(--color-accent-purple)',
  delay = 0,
  animate = false,
  className,
}: StatCardProps) {
  const numericValue = animate ? parseFloat(value.replace(/[^0-9.]/g, '')) : 0;
  const { count, ref } = useAnimatedCounter(numericValue, 2000);

  const formatValue = (val: number): string => {
    if (!animate) return value;
    if (value.includes('B')) return `$${val.toFixed(1)}B`;
    if (value.includes('%')) return `${val.toFixed(1)}%`;
    if (value.includes('+')) return `${val}+`;
    return val.toString();
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05, y: -4 }}
      className={cn('group relative space-y-2 cursor-pointer', className)}
    >
      <div
        className="absolute inset-0 rounded-[var(--radius-card)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 blur-xl"
        style={{ backgroundColor: `${color}20` }}
        aria-hidden
      />
      <div className="relative">
        <div className="flex items-center gap-2">
          {Icon && (
            <motion.div
              className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-button)] transition-all duration-300"
              style={{ backgroundColor: `${color}15` }}
              whileHover={{ rotate: 5, scale: 1.1 }}
            >
              <Icon className="h-4 w-4" style={{ color }} />
            </motion.div>
          )}
          <p className="text-[var(--typography-size-xs)] uppercase tracking-wider opacity-70">
            {label}
          </p>
        </div>
        <p
          className="text-[var(--typography-size-xl)] font-[var(--typography-family-display)] font-light tabular-nums leading-none mt-2"
          style={{ color }}
        >
          {formatValue(count)}
        </p>
      </div>
    </motion.div>
  );
}
