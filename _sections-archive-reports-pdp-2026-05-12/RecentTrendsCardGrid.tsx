'use client';

/**
 * RecentTrendsCardGrid — Row 23 — Recipe report-detail.md line 64
 * bg: white · spacing: lg · motion: CardReveal stagger 80ms
 * Trend cards: name · description · impact · time horizon · affected segment · buyer implication
 */

import { motion, useReducedMotion } from 'framer-motion';
import {
  Leaf,
  Package,
  Database,
  Eye,
  Wifi,
  Truck,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';
import {
  SectionWrapper,
  SectionHeading,
  SectionLabel,
  Card,
  Badge,
} from '@kenresearch/design-system/atoms';
import type { CardGridModule } from '@/types/schema';

const ICON_MAP: Record<string, LucideIcon> = {
  Leaf,
  Package,
  Database,
  Eye,
  Wifi,
  Truck,
  TrendingUp,
};

interface Props {
  trends: CardGridModule | null;
}

interface TrendCardProps {
  card: CardGridModule['cards'][number];
  index: number;
  prefersReduced: boolean | null;
}

// Derive metadata from card — mock data uses accent field for time horizon signal
function timeHorizonFromAccent(accent?: string): string {
  const map: Record<string, string> = {
    purple: 'Near-term (1–2 yr)',
    periwinkle: 'Mid-term (2–4 yr)',
    perano: 'Long-term (4–6 yr)',
    coral: 'Near-term (1–2 yr)',
    neutral: 'Mid-term (2–4 yr)',
  };
  return map[accent ?? 'neutral'] ?? 'Mid-term (2–4 yr)';
}

function TrendCard({ card, index, prefersReduced }: TrendCardProps) {
  const Icon = card.icon ? (ICON_MAP[card.icon] ?? TrendingUp) : TrendingUp;
  const timeHorizon = timeHorizonFromAccent(card.accent);

  // Buyer implication — derived from trend type / accent
  const buyerImplication =
    card.relatedSegment ??
    (card.accent === 'purple'
      ? 'Operators must allocate budget now; early movers gain 12–18 month advantage.'
      : card.accent === 'periwinkle'
        ? 'Requires last-mile infrastructure investment and technology partnerships.'
        : card.accent === 'perano'
          ? 'Procurement teams should evaluate digital-transformation readiness of 3PL partners.'
          : 'Monitor regulatory and competitive signals to calibrate timing of adoption.');

  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.4,
        ease: 'easeOut',
        delay: prefersReduced ? 0 : Math.min(index, 7) * 0.08,
      }}
      className="h-full"
    >
      <Card variant="white" padding="md" className="h-full flex flex-col gap-3">
        {/* Icon */}
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--color-ramp-warm-100)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Icon
            size={18}
            aria-hidden="true"
            style={{ color: 'var(--surface-text-muted)' }}
          />
        </div>

        {/* Trend name */}
        <h3
          style={{
            fontFamily: 'var(--typography-family-display)',
            fontSize: 'var(--typography-size-base)',
            fontWeight: 600,
            color: 'var(--surface-text)',
            lineHeight: 1.3,
          }}
        >
          {card.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize: 'var(--typography-size-sm)',
            color: 'var(--surface-text-muted)',
            lineHeight: 1.65,
            flexGrow: 1,
          }}
        >
          {card.body}
        </p>

        {/* Metadata row */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-[var(--border-soft)]">
          <Badge theme="purple" size="sm">
            High impact
          </Badge>
          <Badge theme="neutral" size="sm">
            {timeHorizon}
          </Badge>
          {card.accent && card.accent !== 'neutral' && (
            <Badge theme="warm" size="sm">
              Cold Chain
            </Badge>
          )}
        </div>

        {/* Buyer implication */}
        <p
          style={{
            fontSize: 'var(--typography-size-compact)',
            color: 'var(--surface-text)',
            lineHeight: 1.5,
            fontWeight: 500,
            fontStyle: 'italic',
          }}
        >
          {buyerImplication}
        </p>
      </Card>
    </motion.div>
  );
}

export function RecentTrendsCardGrid({ trends }: Props) {
  const prefersReduced = useReducedMotion();

  if (!trends || trends.cards.length === 0) return null;

  return (
    <SectionWrapper
      background="white"
      spacing="lg"
      maxWidth="wide"
      id="sec-recent-trends"
    >
      {/* Header */}
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="inline-flex mb-3">
          <SectionLabel background="light" variant="default">
            RECENT TRENDS
          </SectionLabel>
        </div>
        <SectionHeading level={2} align="left">
          {trends.heading}
        </SectionHeading>
        <p
          style={{
            fontSize: 'var(--typography-size-sm)',
            color: 'var(--surface-text-muted)',
            marginTop: 'var(--space-3)',
            maxWidth: '58ch',
            lineHeight: 1.6,
          }}
        >
          Demand-side and technology shifts reshaping the cold chain market and
          their implications for buyers through 2027.
        </p>
      </motion.div>

      {/* 3-col desktop · 2-col tablet · 1-col mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
        {trends.cards.map((card, index) => (
          <TrendCard
            key={card.id}
            card={card}
            index={index}
            prefersReduced={prefersReduced}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
