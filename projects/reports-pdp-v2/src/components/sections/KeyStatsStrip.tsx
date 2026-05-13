'use client';

/**
 * CRAFT (aura-craft step 4.5 · 2026-05-12)
 * Section type: Stat strip
 * Lead element: big number (text-lg tabular-nums font-display font-light — largest visual in each tile)
 * Support: yearOrPeriod label (text-2xs uppercase tracking-wider) + trend icon + label text
 * Type rhythm: 3xl tabular-num/sm/base/micro — stat values upgraded to text-xl (from text-lg builder default)
 *   DECISION: text-xl chosen (not text-3xl) — StatCard min-w-[180px] constrains layout; text-xl is max comfortable for tile width
 *   text-3xl reserved for standalone hero-stats; at 5-tile strip text-xl reads as strong without overflow
 * Motion event: count-up on view (once) — currently whileInView stagger 60ms fade-up per card
 *   DECISION: stagger fade-up IS the entrance; no separate count-up hook (useAnimatedCounter deferred to Wave 3)
 *   — useReducedMotion disables stagger; all tiles render at final opacity immediately
 * Depth: --shadow-sm on tile cards (border + subtle shadow per subtle-shadows strategy — NOT borders-only)
 *   Gated overlay uses backdrop-filter blur(4px) — acceptable for lock state overlay only
 * Mobile override: 3 tiles visible initially · overflow-x-auto horizontal scroll for remainder · min-w-[180px] per tile
 */

/**
 * KeyStatsStrip — 5-7 stat tiles (PRD §12)
 *
 * Variant: editorial-light
 * Background: warm · spacing: md (LOCK 3)
 * Access: public for s1-s3 · lead-gated for s4-s5 (lock indicator shown)
 *
 * Public minimum (PRD §21): market size + forecast + CAGR always visible
 * Mobile: 3 tiles visible, horizontal scroll for rest
 * Motion: Framer stagger 60ms per card (whileInView)
 */

import { motion, useReducedMotion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Lock } from 'lucide-react';
import { SectionWrapper, Badge, Button } from '@kenresearch/design-system/atoms';
import type { KeyStat } from '@/types/schema';
import { useLeadFormModal } from '@/components/LeadFormModalProvider';

export interface KeyStatsStripProps {
  stats: KeyStat[];
  reportSlug: string;
}

export function KeyStatsStrip({ stats, reportSlug }: KeyStatsStripProps) {
  const shouldReduceMotion = useReducedMotion();
  const { openForm } = useLeadFormModal();

  return (
    <SectionWrapper background="warm" spacing="md" id="key-stats">
      <div
        className="overflow-x-auto -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0"
        style={{ scrollbarWidth: 'none' }}
        aria-label="Key market statistics"
        role="region"
      >
        <ul
          className="flex gap-4 min-w-max md:min-w-0 md:grid md:grid-cols-3 lg:grid-cols-5"
          aria-label="Market statistics"
        >
          {stats.map((stat, i) => {
            const isGated = stat.access.level !== 'public';
            return (
              <motion.li
                key={stat.id}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative"
              >
                <div
                  className="relative flex flex-col gap-2 rounded-[var(--radius-card)] p-5 min-w-[180px] md:min-w-0 h-full"
                  style={{
                    backgroundColor: 'var(--color-foundation-white)',
                    border: '1px solid var(--border-soft)',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  {/* Gated overlay */}
                  {isGated && (
                    <div
                      className="absolute inset-0 rounded-[var(--radius-card)] flex flex-col items-center justify-center gap-2 z-10"
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.88)',
                        backdropFilter: 'blur(4px)',
                      }}
                      aria-label={`${stat.label} — sign in to unlock`}
                    >
                      <Lock
                        size={16}
                        style={{ color: 'var(--color-brand-red)' }}
                        aria-hidden="true"
                      />
                      <p
                        className="text-2xs text-center px-2"
                        style={{ color: 'var(--surface-text-muted)' }}
                      >
                        Unlock full dataset
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          openForm(stat.unlockTrigger ?? 'sample', {
                            reportSlug,
                            ctaLocation: 'key-stats',
                            sectionName: 'key-stats',
                          })
                        }
                      >
                        Download Sample Report
                      </Button>
                    </div>
                  )}

                  {/* Stat content — public stats satisfy PRD §21 */}
                  <div
                    className={[
                      'flex flex-col gap-1.5',
                      isGated ? 'pointer-events-none select-none' : '',
                    ].join(' ')}
                    aria-hidden={isGated}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span
                        className="text-2xs font-body uppercase tracking-wider"
                        style={{ color: 'var(--surface-text-muted)' }}
                      >
                        {stat.yearOrPeriod}
                      </span>
                      {stat.trend && (
                        <span
                          className="flex items-center"
                          style={{
                            color:
                              stat.trend === 'up'
                                ? 'var(--semantic-status-success-text)'
                                : stat.trend === 'down'
                                  ? 'var(--semantic-status-error-text)'
                                  : 'var(--surface-text-muted)',
                          }}
                        >
                          {stat.trend === 'up' && <TrendingUp size={14} aria-label="Trending up" />}
                          {stat.trend === 'down' && <TrendingDown size={14} aria-label="Trending down" />}
                          {stat.trend === 'flat' && <Minus size={14} aria-label="Stable" />}
                        </span>
                      )}
                    </div>

                    {/* Value — tabular-nums for alignment · text-xl per CRAFT uplift (text-lg was too modest for stat strip) */}
                    <p
                      className="text-xl font-display font-light tabular-nums leading-tight"
                      style={{ color: 'var(--color-foundation-black)' }}
                    >
                      {stat.value}
                    </p>

                    <p
                      className="text-compact font-body leading-tight"
                      style={{ color: 'var(--surface-text-muted)' }}
                    >
                      {stat.label}
                    </p>

                    {stat.access.level === 'public' && (
                      <Badge variant="pill" size="xs" theme="success" bordered>
                        Public
                      </Badge>
                    )}
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>

      <p className="mt-4 text-2xs text-right" style={{ color: 'var(--surface-text-muted)' }}>
        Source: Ken Research analysis
      </p>
    </SectionWrapper>
  );
}
