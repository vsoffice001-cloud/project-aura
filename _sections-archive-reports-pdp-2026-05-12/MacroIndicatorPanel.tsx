'use client';

/**
 * MacroIndicatorPanel — Row 27 — Recipe report-detail.md line 68
 * bg: white · spacing: lg · motion: Framer fade-up
 * GDP · Inflation · Population · Imports/Exports · Infrastructure · Ports — 6-card grid
 * Each card: icon · name · big numeral (Noto Serif) · unit · year · buyer-relevance
 * Extended macro detail paid-locked at bottom
 */

import { motion, useReducedMotion } from 'framer-motion';
import {
  TrendingUp,
  Users,
  ArrowLeftRight,
  Package,
  Anchor,
  BarChart2,
  type LucideIcon,
} from 'lucide-react';
import {
  SectionWrapper,
  SectionHeading,
  SectionLabel,
  Card,
  Badge,
} from '@kenresearch/design-system/atoms';
import { AccessLevelGate } from '@/components/AccessLevelGate';
import type { MacroPanelModule } from '@/types/schema';

const PAID_ACCESS = {
  level: 'paid' as const,
  ctaTrigger: 'dataset-unlock' as const,
  paywallSelector: '.kr-paywall-macro',
  schemaIsAccessibleForFree: false,
};

interface MacroIndicator {
  id: string;
  icon: LucideIcon;
  name: string;
  value: string;
  unit: string;
  year: string;
  buyerRelevance: string;
  trend?: 'up' | 'down' | 'flat';
}

// Derived from MacroPanelModule KPI panels + static supplemental indicators
function buildIndicators(module: MacroPanelModule): MacroIndicator[] {
  const kpiPanels = module.panels.filter((p) => p.kind === 'kpi') as {
    kind: 'kpi';
    label: string;
    value: string;
    sublabel?: string;
    buyerRelevanceLine?: string;
  }[];

  const defaultIndicators: MacroIndicator[] = [
    {
      id: 'gdp',
      icon: TrendingUp,
      name: 'GDP',
      value: 'USD 1,450.0 Bn',
      unit: 'USD Bn',
      year: '2022',
      buyerRelevance: 'Strong GDP signals sustained consumer spending and cold chain demand through 2027.',
      trend: 'up',
    },
    {
      id: 'inflation',
      icon: BarChart2,
      name: 'Inflation Rate',
      value: '6.1%',
      unit: '%',
      year: '2022',
      buyerRelevance: 'Cost inflation in fuel and energy elevates cold transport operating costs — factor into vendor contracts.',
      trend: 'up',
    },
    {
      id: 'population',
      icon: Users,
      name: 'Population',
      value: '25.9 Mn',
      unit: 'Mn',
      year: '2022',
      buyerRelevance: 'Concentrated metro population in Sydney, Melbourne, and Brisbane drives perishable last-mile demand.',
      trend: 'flat',
    },
    {
      id: 'imports',
      icon: Package,
      name: 'Imports',
      value: 'AUD 513.2 Bn',
      unit: 'AUD Bn',
      year: '2022',
      buyerRelevance: 'Import growth in fresh produce and pharma directly expands cold chain throughput at port facilities.',
      trend: 'up',
    },
    {
      id: 'exports',
      icon: ArrowLeftRight,
      name: 'Exports',
      value: 'AUD 513.2 Bn',
      unit: 'AUD Bn',
      year: '2022',
      buyerRelevance: 'Meat and seafood export volumes require certified cold transport from farm gate to port — growing mandate.',
      trend: 'up',
    },
    {
      id: 'ports',
      icon: Anchor,
      name: 'Key Ports',
      value: '5 Major',
      unit: 'ports',
      year: '2022',
      buyerRelevance: 'Fremantle, Brisbane, Sydney, Melbourne, and Adelaide anchor cold chain import/export corridors.',
      trend: 'flat',
    },
  ];

  // Override values from live KPI panels if available
  kpiPanels.forEach((panel, i) => {
    if (defaultIndicators[i]) {
      defaultIndicators[i].value = panel.value;
    }
  });

  return defaultIndicators;
}

interface Props {
  macro: MacroPanelModule | null;
}

interface MacroCardProps {
  indicator: MacroIndicator;
  index: number;
  prefersReduced: boolean | null;
}

function MacroCard({ indicator, index, prefersReduced }: MacroCardProps) {
  const Icon = indicator.icon;

  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Card variant="white" padding="md" className="h-full flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div
            className="shrink-0 w-8 h-8 rounded-md flex items-center justify-center"
            style={{ background: 'var(--color-ramp-warm-300)' }}
            aria-hidden="true"
          >
            <Icon size={16} style={{ color: 'var(--color-brand-red, #b01f24)' }} />
          </div>
          <p
            className="text-xs uppercase tracking-wider font-medium"
            style={{ color: 'var(--color-neutral-500, #6b7280)' }}
          >
            {indicator.name}
          </p>
        </div>

        <div className="flex items-baseline gap-2">
          <span
            className="font-[var(--typography-family-display)] font-semibold tabular-nums"
            style={{ fontSize: 'var(--typography-size-2xl)', color: 'var(--color-foundation-black)' }}
          >
            {indicator.value}
          </span>
        </div>

        <p
          className="text-xs"
          style={{ color: 'var(--color-neutral-500, #6b7280)' }}
        >
          {indicator.year}
        </p>

        <p
          className="mt-auto leading-relaxed"
          style={{ fontSize: 'var(--typography-size-sm)', color: 'var(--color-neutral-600, #4b5563)' }}
        >
          {indicator.buyerRelevance}
        </p>

        {indicator.trend && (
          <div className="pt-1">
            <Badge theme={indicator.trend === 'up' ? 'purple' : 'neutral'}>
              {indicator.trend === 'up' ? 'Trending up' : indicator.trend === 'down' ? 'Trending down' : 'Stable'}
            </Badge>
          </div>
        )}
      </Card>
    </motion.div>
  );
}

export function MacroIndicatorPanel({ macro }: Props) {
  const prefersReduced = useReducedMotion();

  if (!macro) return null;

  const indicators = buildIndicators(macro);

  return (
    <SectionWrapper background="white" spacing="lg" id="sec-macro">
      <SectionLabel>Macro Context</SectionLabel>
      <SectionHeading level={2} className="mt-2 mb-8">
        {macro.heading ?? 'Macroeconomic Indicators'}
      </SectionHeading>

      {/* 6-card grid: 3-col desktop · 2-col tablet · 1-col mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {indicators.map((indicator, i) => (
          <MacroCard
            key={indicator.id}
            indicator={indicator}
            index={i}
            prefersReduced={prefersReduced}
          />
        ))}
      </div>

      {/* Extended macro detail — paid-gated */}
      <div className="mt-8">
        <AccessLevelGate
          access={PAID_ACCESS}
          sectionName="MacroIndicatorPanel"
        >
          <div
            className="rounded-lg border p-6 mt-4"
            style={{ borderColor: 'var(--border-default)', background: 'var(--color-ramp-warm-300)' }}
          >
            <p style={{ fontSize: 'var(--typography-size-sm)', color: 'var(--color-neutral-700, #374151)' }}>
              Extended macroeconomic analysis — GDP growth trajectory, inflation band projections, infrastructure investment pipeline, and port throughput forecasts — available in the full report.
            </p>
          </div>
        </AccessLevelGate>
      </div>
    </SectionWrapper>
  );
}
