'use client';

/**
 * GrowthDriversCardGrid — Row 18 — Recipe report-detail.md line 59
 * bg: warm-300 · spacing: lg · motion: CardReveal stagger 80ms
 * Driver cards: title · explanation · impact tag · related segment · supporting data
 */

import { motion, useReducedMotion } from 'framer-motion';
import {
  TrendingUp,
  ShoppingCart,
  Globe,
  Cpu,
  Package,
  Truck,
  BarChart2,
  Zap,
  Leaf,
  Database,
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
  TrendingUp,
  ShoppingCart,
  Globe,
  Cpu,
  Package,
  Truck,
  BarChart2,
  Zap,
  Leaf,
  Database,
};

interface Props {
  drivers: CardGridModule | null;
}

interface DriverCardProps {
  card: CardGridModule['cards'][number];
  index: number;
  prefersReduced: boolean | null;
}

function DriverCard({ card, index, prefersReduced }: DriverCardProps) {
  const Icon = card.icon ? (ICON_MAP[card.icon] ?? TrendingUp) : TrendingUp;

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

        {/* Title */}
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

        {/* Explanation */}
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
          {card.impactLevel && (
            <Badge
              theme={
                card.impactLevel === 'high'
                  ? 'purple'
                  : card.impactLevel === 'medium'
                    ? 'neutral'
                    : 'neutral'
              }
              size="sm"
            >
              {card.impactLevel === 'high'
                ? 'High Impact'
                : card.impactLevel === 'medium'
                  ? 'Medium Impact'
                  : 'Low Impact'}
            </Badge>
          )}
          {!card.impactLevel && (
            <Badge theme="purple" size="sm">
              High Impact
            </Badge>
          )}
          {card.relatedSegment && (
            <Badge theme="neutral" size="sm">
              {card.relatedSegment}
            </Badge>
          )}
        </div>

        {/* Supporting stat */}
        {card.supportingData && (
          <p
            style={{
              fontSize: 'var(--typography-size-compact)',
              color: 'var(--surface-text-muted)',
              fontWeight: 500,
            }}
          >
            {card.supportingData}
          </p>
        )}
      </Card>
    </motion.div>
  );
}

export function GrowthDriversCardGrid({ drivers }: Props) {
  const prefersReduced = useReducedMotion();

  if (!drivers || drivers.cards.length === 0) return null;

  return (
    <SectionWrapper
      background="warm"
      spacing="lg"
      maxWidth="wide"
      id="sec-growth-drivers"
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
            GROWTH DRIVERS
          </SectionLabel>
        </div>
        <SectionHeading level={2} align="left">
          {drivers.heading}
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
          Key demand-side and supply-side forces driving market expansion
          through the forecast period.
        </p>
      </motion.div>

      {/* 3-col desktop · 2-col tablet · 1-col mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
        {drivers.cards.map((card, index) => (
          <DriverCard
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
