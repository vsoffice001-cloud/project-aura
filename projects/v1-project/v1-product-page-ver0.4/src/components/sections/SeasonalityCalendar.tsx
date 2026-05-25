'use client';

/**
 * SeasonalityCalendar — v0.4 port from v0.3 (verbatim · inline type)
 *
 * @what  12-month horizontal strip showing seasonal demand patterns. Each month
 *        chips coloured by level: peak = brand-red filled, low = warm-200 muted, normal = white.
 * @why   PRD V2 §15 · "Seasonality Trends" visual anchor for §04 Market Overview tab.
 *        User 2026-05-20 brief B3: port v0.3 AS-IS · color polish (neutral) considered later.
 * @where Inside MarketOverviewGenesisSection (Seasonality tab).
 * @when  Renders when months array has 12 items.
 *
 * Ported 2026-05-21 from v0.3 src/components/sections/SeasonalityCalendar.tsx.
 */

import { motion, useReducedMotion } from 'framer-motion';

export interface SeasonalityMonth {
  /** 1–12 */
  month: number;
  level: 'peak' | 'normal' | 'low';
}

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const LEVEL_STYLES: Record<SeasonalityMonth['level'], { bg: string; text: string; border: string }> = {
  peak: {
    bg: 'var(--color-brand-red, #b01f24)',
    text: '#ffffff',
    border: 'transparent',
  },
  normal: {
    bg: 'var(--color-foundation-white, #ffffff)',
    text: 'var(--semantic-ink-body, rgba(0,0,0,0.75))',
    border: 'rgba(0,0,0,0.1)',
  },
  low: {
    bg: 'rgba(0,0,0,0.04)',
    text: 'var(--semantic-ink-muted, rgba(0,0,0,0.4))',
    border: 'rgba(0,0,0,0.06)',
  },
};

const LEVEL_LABELS: Record<SeasonalityMonth['level'], string> = {
  peak: 'Peak season',
  normal: 'Normal',
  low: 'Low season',
};

interface SeasonalityCalendarProps {
  months: SeasonalityMonth[];
}

export function SeasonalityCalendar({ months }: SeasonalityCalendarProps) {
  const prefersReduced = useReducedMotion() ?? false;

  if (!months || months.length !== 12) return null;

  const sorted = [...months].sort((a, b) => a.month - b.month);
  const uniqueLevels = Array.from(new Set(sorted.map((m) => m.level))) as SeasonalityMonth['level'][];

  return (
    <div data-component="SeasonalityCalendar">
      <motion.div
        initial={prefersReduced ? {} : { opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <div
          style={{ display: 'flex', gap: 'var(--space-1, 4px)', flexWrap: 'wrap' }}
          role="list"
          aria-label="Seasonal demand calendar"
        >
          {sorted.map((m) => {
            const styles = LEVEL_STYLES[m.level];
            const label = MONTH_LABELS[m.month - 1];
            return (
              <div
                key={m.month}
                role="listitem"
                aria-label={`${label}: ${LEVEL_LABELS[m.level]}`}
                style={{
                  flex: '1 0 calc(8.33% - 4px)',
                  minWidth: '32px',
                  padding: 'var(--space-2, 8px) var(--space-1, 4px)',
                  borderRadius: 'var(--radius-sm, 4px)',
                  background: styles.bg,
                  border: `1px solid ${styles.border}`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '2px',
                  cursor: 'default',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-dm-sans, system-ui, sans-serif)',
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: styles.text,
                    lineHeight: 1,
                  }}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        <div
          style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4, 16px)', marginTop: 'var(--space-3, 12px)' }}
          aria-label="Seasonality legend"
        >
          {uniqueLevels.map((level) => {
            const styles = LEVEL_STYLES[level];
            return (
              <div key={level} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2, 8px)' }}>
                <span
                  aria-hidden="true"
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: 'var(--radius-xs, 2px)',
                    background: styles.bg,
                    border: `1px solid ${styles.border === 'transparent' ? styles.bg : styles.border}`,
                    display: 'inline-block',
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-dm-sans, system-ui, sans-serif)',
                    fontSize: 'var(--text-xs, 12px)',
                    color: 'var(--semantic-ink-muted, rgba(0,0,0,0.5))',
                  }}
                >
                  {LEVEL_LABELS[level]}
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
