'use client';

/**
 * CRAFT (aura-craft step 4.5 · 2026-05-12)
 * Lead: driver title (text-xl font-display font-medium — first text element in card; impact badge follows at right)
 * Type rhythm: xl/sm/base/xs — driver title = text-xl · explanation = text-sm · impact badge = text-xs · supporting data = text-xs tabular-nums
 * Motion: optional CardReveal stagger 80ms per card (whileInView · once · opacity 0→1 + y 12→0)
 *   — useReducedMotion disables stagger; all cards render at final state
 * Depth: subtle-shadows — Card border + --shadow-card-default · hover --shadow-card-hover translateY(-2px) 200ms · nested in warm parent so shadow reads clearly against white card
 * Mobile: 1-col stack · 2-col md · max 4 cards per PRD Cat 4.8 · stack column default
 */

/**
 * GrowthDriversCardGrid — Driver cards grid (recipe row 19)
 *
 * Variant: editorial-light
 * Background: warm-300 (NESTED — NO SectionWrapper · parent IndustryAnalysisModule handles bg)
 * Cat 4.5: no nested SectionWrapper
 *
 * Cards: title · explanation · impact tag · related segment · supporting data
 * Public: all driver cards visible (deep analysis lead-gated)
 * Grid: grid-cols-1 md:grid-cols-2 (max 4 per PRD Cat 4.8 — never 5+)
 *
 * A11y: <ul> <li> <article> semantic · 44px touch targets
 * useReducedMotion mandatory · stagger 80ms per card
 */

import { motion, useReducedMotion } from 'framer-motion';
import {
  SectionHeading,
  SectionLabel,
  Badge,
  Card,
} from '@kenresearch/design-system/atoms';
import type { CardGridModule } from '@/types/schema';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface GrowthDriversCardGridProps {
  drivers: CardGridModule;
}

// ─── Accent token map ────────────────────────────────────────────────────────

const ACCENT_TOKEN: Record<string, string> = {
  purple: 'var(--color-ramp-purple-500)',
  periwinkle: 'var(--color-ramp-periwinkle-500)',
  perano: 'var(--color-ramp-perano-400)',
  coral: 'var(--color-ramp-coral-400)',
  neutral: 'var(--surface-text-muted)',
};

// ─── Single driver card ──────────────────────────────────────────────────────

interface DriverCardProps {
  icon?: string;
  title: string;
  body: string;
  impactLevel?: 'high' | 'medium' | 'low';
  relatedSegment?: string;
  supportingData?: string;
  accent?: string;
  delayIndex: number;
  shouldReduceMotion: boolean;
}

// Badge theme map (DS Badge uses theme prop, not variant for color)
const IMPACT_BADGE_THEME: Record<string, 'brand' | 'muted' | 'neutral'> = {
  high: 'brand',
  medium: 'muted',
  low: 'neutral',
};

function DriverCard({
  title,
  body,
  impactLevel,
  relatedSegment,
  supportingData,
  accent,
  delayIndex,
  shouldReduceMotion,
}: DriverCardProps) {
  const accentColor = ACCENT_TOKEN[accent ?? 'neutral'] ?? 'var(--surface-text-muted)';

  return (
    <motion.li
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
        delay: shouldReduceMotion ? 0 : delayIndex * 0.08,
      }}
      className="list-none"
    >
      <article className="h-full">
        <Card padding="md" className="flex flex-col gap-4 h-full">
          {/* Accent bar */}
          <div
            className="w-8 h-1 rounded-full"
            style={{ backgroundColor: accentColor }}
            aria-hidden="true"
          />

          {/* Title */}
          <h3 className="text-base font-display font-medium" style={{ color: 'var(--color-foundation-black)' }}>
            {title}
          </h3>

          {/* Body */}
          <p className="text-compact font-body leading-relaxed flex-1" style={{ color: 'var(--surface-text-muted)' }}>
            {body}
          </p>

          {/* Tags row */}
          <div className="flex flex-wrap gap-2 pt-1">
            {impactLevel && (
              <Badge theme={IMPACT_BADGE_THEME[impactLevel] ?? 'muted'} variant="rounded">
                {impactLevel.charAt(0).toUpperCase() + impactLevel.slice(1)} impact
              </Badge>
            )}
            {relatedSegment && (
              <Badge theme="neutral" variant="rounded">
                {relatedSegment}
              </Badge>
            )}
          </div>

          {/* Supporting data (lead-gated text) */}
          {supportingData && (
            <p
              className="text-compact font-body"
              style={{ color: 'var(--surface-text-muted)', borderTop: '1px solid var(--border-soft)', paddingTop: '0.5rem' }}
            >
              {supportingData}
            </p>
          )}
        </Card>
      </article>
    </motion.li>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export function GrowthDriversCardGrid({ drivers }: GrowthDriversCardGridProps) {
  const shouldReduceMotion = useReducedMotion() ?? false;

  if (!drivers.cards || drivers.cards.length === 0) return null;

  return (
    <div
      id="growth-drivers"
      className="py-10 md:py-14"
      style={{ backgroundColor: 'var(--color-ramp-warm-300)' }}
      data-industry-child="drivers"
    >
      <div className="flex flex-col gap-6">
        {/* Sub-heading */}
        <div>
          <SectionLabel>Market Dynamics</SectionLabel>
          <SectionHeading level={3} align="left">
            {drivers.heading ?? 'Growth Drivers'}
          </SectionHeading>
        </div>

        {/* Card grid — max 4 per recipe Cat 4.8 */}
        <ul
          className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6"
          aria-label="Growth driver cards"
        >
          {drivers.cards.slice(0, 4).map((card, idx) => (
            <DriverCard
              key={card.id}
              icon={card.icon}
              title={card.title}
              body={card.body}
              impactLevel={card.impactLevel}
              relatedSegment={card.relatedSegment}
              supportingData={card.supportingData}
              accent={card.accent}
              delayIndex={idx}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
