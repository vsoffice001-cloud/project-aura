'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Lock } from 'lucide-react';
import { Card, SectionWrapper } from '@kenresearch/design-system/atoms';
import { StatCard } from '@kenresearch/design-system/molecules';
import { AccessLevelGate } from '@/components/AccessLevelGate';
import { useAnalytics } from '@/hooks/useAnalytics';
import type { KeyStat } from '@/types/schema';

// Lucide icon map for StatCard (uses LucideIcon type)
import { BarChart3, TrendingUp as TrendUp, Percent, Package, Truck, Globe } from 'lucide-react';

const STAT_ICONS = [BarChart3, TrendUp, Percent, Package, Truck, Globe] as const;

interface KeyStatsStripProps {
  stats: KeyStat[];
}

/**
 * KeyStatTile — thin adapter over StatCard + locked indicator.
 * Recipe row 6 spec: lock indicator when access.level !== 'public'.
 */
function KeyStatTile({ stat, index }: { stat: KeyStat; index: number }) {
  const prefersReduced = useReducedMotion();
  const dispatch = useAnalytics();

  const isLocked = stat.access.level !== 'public';
  const Icon = STAT_ICONS[index % STAT_ICONS.length];

  const handleClick = () => {
    if (!isLocked && stat.expandRelatedChartId) {
      dispatch('stat_card_click', { section_name: stat.label, chart_id: stat.expandRelatedChartId });
    }
  };

  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: 'easeOut' }}
    >
      <AccessLevelGate
        access={stat.access}
        moduleId={stat.id}
        sectionName="KeyStatsStrip"
        fallback={
          <LockedStatCard label={stat.label} yearOrPeriod={stat.yearOrPeriod} />
        }
      >
        <div onClick={handleClick} role={stat.expandRelatedChartId ? 'button' : undefined} tabIndex={stat.expandRelatedChartId ? 0 : undefined}>
          <StatCard
            icon={Icon}
            value={stat.value}
            label={stat.label}
            animate={false}
            delay={index * 0.06}
          />
          <p className="mt-1 text-[var(--typography-size-xs)] font-[var(--typography-family-body)]" style={{ opacity: 0.55 }}>
            {stat.yearOrPeriod}
          </p>
          {stat.trend && (
            <span role="img" aria-label={`Trend: ${stat.trend}`}>
              {stat.trend === 'up' && <TrendingUp className="h-3.5 w-3.5 text-[var(--semantic-status-success-text)]" aria-hidden />}
              {stat.trend === 'down' && <TrendingDown className="h-3.5 w-3.5 text-[var(--semantic-status-error-text)]" aria-hidden />}
              {stat.trend === 'flat' && <Minus className="h-3.5 w-3.5" style={{ opacity: 0.5 }} aria-hidden />}
            </span>
          )}
        </div>
      </AccessLevelGate>
    </motion.div>
  );
}

function LockedStatCard({ label, yearOrPeriod }: { label: string; yearOrPeriod: string }) {
  return (
    <Card variant="outlined" padding="sm" shadow="none">
      <div className="flex items-center gap-2 mb-1">
        <Lock className="h-3.5 w-3.5 text-[var(--surface-text-muted)]" aria-hidden />
        <span className="text-[var(--typography-size-xs)] uppercase tracking-wider font-semibold" style={{ opacity: 0.5 }}>
          Locked
        </span>
      </div>
      <p className="text-[var(--typography-size-sm)] font-[var(--typography-family-body)] font-medium" style={{ opacity: 0.5 }}>
        {label}
      </p>
      <p className="text-[var(--typography-size-xs)] font-[var(--typography-family-body)]" style={{ opacity: 0.4 }}>
        {yearOrPeriod}
      </p>
    </Card>
  );
}

/**
 * KeyStatsStrip — recipe row 6.
 * bg: warm-300 · spacing: md · motion: Framer stagger 60ms.
 * 5-7 stat tiles. Mobile: horizontal scroll w/ snap.
 */
export function KeyStatsStrip({ stats }: KeyStatsStripProps) {
  return (
    <SectionWrapper background="warm" spacing="md" id="key-stats">
      {/* Mobile: horizontal scroll + snap. Desktop: grid. */}
      <div
        className="
          flex gap-4
          overflow-x-auto snap-x snap-mandatory
          md:grid md:grid-cols-3 md:overflow-visible
          lg:grid-cols-5
          pb-2 md:pb-0
          scrollbar-none
        "
        role="list"
        aria-label="Key market statistics"
      >
        {stats.slice(0, 7).map((stat, i) => (
          <div
            key={stat.id}
            role="listitem"
            className="snap-start shrink-0 w-44 md:w-auto"
          >
            <KeyStatTile stat={stat} index={i} />
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
