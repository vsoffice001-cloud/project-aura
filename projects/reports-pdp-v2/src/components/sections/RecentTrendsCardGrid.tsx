'use client';

/**
 * CRAFT (aura-craft step 4.5 · 2026-05-12)
 * Lead: trend name (text-xl font-display font-medium · h3 in article · time horizon badge follows inline)
 * Type rhythm: xl/sm/base/xs — trend name = text-xl · description = text-sm · impact + horizon = text-xs badges · buyer implication = text-compact italic
 * Motion: CardReveal 80ms stagger (whileInView · once · opacity 0→1 + y 12→0 per card)
 *   — useReducedMotion disables stagger; all cards render at final state
 * Depth: subtle-shadows — Card border + --shadow-card-default · hover --shadow-card-hover translateY(-2px) · white cards on white bg → shadow essential for separation
 * Mobile: 1-col stack · 2-col md · 3-col lg · carousel potential Wave 3 · stack column default
 */

/**
 * RecentTrendsCardGrid — Trend cards (recipe row 24)
 *
 * Variant: editorial-light
 * Background: white · spacing: lg (LOCK 3)
 * STANDALONE section — has own SectionWrapper
 *
 * Trend card fields: name · description · impact · time horizon · affected segment · buyer implication
 * Public: all trend names + summaries visible
 * Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
 *
 * A11y: <ul> <li> <article> · cards = article · stagger 80ms
 * useReducedMotion mandatory
 */

import { motion, useReducedMotion } from 'framer-motion';
import {
  SectionWrapper,
  SectionHeading,
  SectionLabel,
  Badge,
  Card,
} from '@kenresearch/design-system/atoms';
import type { CardGridModule } from '@/types/schema';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface RecentTrendsCardGridProps {
  trends: CardGridModule;
}

// ─── Accent token map ────────────────────────────────────────────────────────

const ACCENT_TOKEN: Record<string, string> = {
  purple: 'var(--color-ramp-purple-500)',
  periwinkle: 'var(--color-ramp-periwinkle-500)',
  perano: 'var(--color-ramp-perano-400)',
  coral: 'var(--color-ramp-coral-400)',
  neutral: 'var(--surface-text-muted)',
};

// ─── Single trend card ───────────────────────────────────────────────────────

interface TrendCardProps {
  id: string;
  title: string;
  body: string;
  accent?: string;
  impactLevel?: 'high' | 'medium' | 'low';
  relatedSegment?: string;
  delayIndex: number;
  shouldReduceMotion: boolean;
}

function TrendCard({
  title,
  body,
  accent,
  impactLevel,
  relatedSegment,
  delayIndex,
  shouldReduceMotion,
}: TrendCardProps) {
  const accentColor = ACCENT_TOKEN[accent ?? 'neutral'] ?? 'var(--surface-text-muted)';

  return (
    <motion.li
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
        delay: shouldReduceMotion ? 0 : delayIndex * 0.08,
      }}
      className="list-none"
    >
      <article aria-label={`Trend: ${title}`} className="h-full">
        <Card padding="md" className="flex flex-col gap-4 h-full">
          {/* Accent top bar */}
          <div
            className="w-full h-1 rounded-full -mt-[var(--space-3)] mx-auto"
            style={{ backgroundColor: accentColor, maxWidth: '40px' }}
            aria-hidden="true"
          />

          {/* Title */}
          <h3 className="text-base font-display font-medium" style={{ color: 'var(--color-foundation-black)' }}>
            {title}
          </h3>

          {/* Description */}
          <p className="text-compact font-body leading-relaxed flex-1" style={{ color: 'var(--surface-text-muted)' }}>
            {body}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-1">
            {impactLevel && (
              <Badge
                theme={impactLevel === 'high' ? 'brand' : impactLevel === 'medium' ? 'muted' : 'neutral'}
                variant="rounded"
              >
                {impactLevel.charAt(0).toUpperCase() + impactLevel.slice(1)} impact
              </Badge>
            )}
            {relatedSegment && (
              <Badge theme="neutral" variant="rounded">{relatedSegment}</Badge>
            )}
          </div>
        </Card>
      </article>
    </motion.li>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export function RecentTrendsCardGrid({ trends }: RecentTrendsCardGridProps) {
  const shouldReduceMotion = useReducedMotion() ?? false;

  if (!trends.cards || trends.cards.length === 0) return null;

  return (
    <SectionWrapper background="white" spacing="lg" id="recent-trends">
      <div className="flex flex-col gap-8">
        {/* Heading */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionLabel>Market Dynamics</SectionLabel>
          <SectionHeading level={2} align="left">
            {trends.heading ?? 'Recent Trends'}
          </SectionHeading>
          {trends.subheading && (
            <p className="mt-2 text-compact font-body" style={{ color: 'var(--surface-text-muted)' }}>
              {trends.subheading}
            </p>
          )}
        </motion.div>

        {/* Card grid */}
        <ul
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
          aria-label="Recent market trends"
        >
          {trends.cards.map((card, idx) => (
            <TrendCard
              key={card.id}
              id={card.id}
              title={card.title}
              body={card.body}
              accent={card.accent}
              impactLevel={card.impactLevel}
              relatedSegment={card.relatedSegment}
              delayIndex={idx}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </ul>
      </div>
    </SectionWrapper>
  );
}
