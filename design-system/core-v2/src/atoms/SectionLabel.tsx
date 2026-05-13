'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '../lib/cn';

export type SectionLabelStyle = 'text' | 'pill';
export type SectionLabelBackground = 'dark' | 'light';
export type SectionLabelVariant = 'default' | 'accent';

export interface SectionLabelProps {
  children: ReactNode;
  style?: SectionLabelStyle;
  background?: SectionLabelBackground;
  variant?: SectionLabelVariant;
  icon?: ReactNode;
  pulse?: boolean;
  className?: string;
}

const textColor: Record<SectionLabelBackground, Record<SectionLabelVariant, string>> = {
  dark: {
    default: 'text-[var(--semantic-ink-on-dark-body)]',
    accent:  'text-[var(--color-ramp-coral-500)]',
  },
  light: {
    default: 'text-[var(--surface-text-muted)]',
    accent:  'text-[var(--color-brand-red)]',
  },
};

const borderColor: Record<SectionLabelBackground, Record<SectionLabelVariant, string>> = {
  dark: {
    default: 'border-[var(--semantic-hairline-on-dark-default)]',
    accent:  'border-[var(--color-ramp-coral-500)]/30',
  },
  light: {
    default: 'border-[var(--border-default)]',
    accent:  'border-[var(--color-brand-red)]/30',
  },
};

const pulseDotColor: Record<SectionLabelBackground, string> = {
  dark:  'var(--color-ramp-coral-500)',
  light: 'var(--color-brand-red)',
};

const shimmerGradient: Record<SectionLabelBackground, string> = {
  dark:  'linear-gradient(90deg, transparent, rgba(255,255,255,0.10), transparent)',
  light: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.05), transparent)',
};

/**
 * SectionLabel — section identifier in text or pill style.
 *
 * Variants:
 *   style=text (default): all-caps tracked label, optional pulse dot or icon prefix.
 *   style=pill: outlined pill w/ animated shimmer sweep (2s loop).
 *
 * Background dictates text + border color (`light` for white/warm sections,
 * `dark` for black sections). Variant `accent` switches default gray → brand-red
 * (light) or coral (dark).
 *
 * Used in: SampleReportPreview (CHAPTER labels), ExtendedTOC, HeroSection (status
 * labels), ResearchMethodology (STEP labels).
 *
 * @promotedFrom V0_lite_report
 */
export function SectionLabel({
  children,
  style = 'text',
  background = 'light',
  variant = 'default',
  icon,
  pulse = false,
  className,
}: SectionLabelProps) {
  if (style === 'pill') {
    return (
      <div className={cn('relative inline-block overflow-hidden rounded-full', className)}>
        <motion.div
          className="absolute inset-0 -translate-x-full pointer-events-none"
          animate={{ translateX: ['-100%', '100%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
          style={{ background: shimmerGradient[background] }}
        />
        <span
          className={cn(
            'relative inline-flex items-center justify-center',
            'font-[var(--typography-family-body)] font-semibold tracking-[0.2em] uppercase',
            'px-4 py-1.5 rounded-full bg-transparent border',
            'text-[var(--typography-size-xs)]',
            textColor[background][variant],
            borderColor[background][variant],
          )}
        >
          {children}
        </span>
      </div>
    );
  }

  return (
    <p
      className={cn(
        'font-[var(--typography-family-body)] font-semibold tracking-[0.2em] uppercase',
        'flex items-center gap-2 text-[var(--typography-size-xs)]',
        textColor[background][variant],
        className,
      )}
    >
      {pulse && (
        <motion.span
          className="relative flex h-2.5 w-2.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.span
            className="absolute inline-flex h-full w-full rounded-full opacity-75"
            style={{ backgroundColor: pulseDotColor[background] }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.75, 0, 0.75] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span
            className="relative inline-flex h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: pulseDotColor[background] }}
          />
        </motion.span>
      )}
      {icon && !pulse && <span className="inline-flex h-3.5 w-3.5">{icon}</span>}
      <span>{children}</span>
    </p>
  );
}
