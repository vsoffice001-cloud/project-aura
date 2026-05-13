'use client';

/**
 * CRAFT (aura-craft step 4.5 · 2026-05-12)
 * Section type: content-dense (scope grid)
 * Lead element: scope grid (8 cards in 4-col grid · each with icon + label + scope items)
 * Support: included/excluded/optional badges (semantic color via theme prop · success/error/neutral)
 * Type rhythm: 2xl/base/sm/xs — section heading via SectionHeading level={2} (DS atom)
 *   bucket label = text-compact font-semibold · item text = text-compact · badge = xs
 * Motion event: stagger optional — currently whileInView fade-up 0.05s delay per card
 *   DECISION: stagger on 8 cards = 1 motion event (counted as group) · within budget
 *   — useReducedMotion disables stagger; all cards render at final opacity immediately
 * Depth: Card variant="white" shadow="sm" (white card on warm bg — needs shadow for separation)
 *   border present via Card default · subtle-shadows depth strategy applied
 * Mobile override: 1-col → sm:2-col → lg:4-col responsive grid · chips wrap naturally
 */

/**
 * ReportScopeModule — 8-bucket coverage (PRD §14)
 *
 * Variant: editorial-light
 * Background: warm · spacing: lg (LOCK 3)
 * Access: public
 *
 * 8 buckets: Market · Geography · Segment · Competitor · Time · Methodology · Deliverables · Customization
 */

import { motion, useReducedMotion } from 'framer-motion';
import {
  Globe,
  PieChart,
  Users,
  Calendar,
  FlaskConical,
  Package,
  Settings,
  Map,
} from 'lucide-react';
import {
  SectionWrapper,
  SectionHeading,
  Card,
  Badge,
} from '@kenresearch/design-system/atoms';
import type { ReportScope, ScopeItem } from '@/types/schema';

export interface ReportScopeModuleProps {
  scope: ReportScope;
}

const BADGE_BADGE_THEME: Record<'included' | 'excluded' | 'optional', 'success' | 'error' | 'neutral'> = {
  included: 'success',
  excluded: 'error',
  optional: 'neutral',
};

function ScopeList({ items }: { items: ScopeItem[] }) {
  return (
    <ul className="flex flex-col gap-1.5">
      {items.map((item) => (
        <li key={item.label} className="flex items-start gap-2">
          <span
            className="text-compact font-body flex-1 leading-snug"
            style={{ color: 'var(--color-foundation-black)' }}
          >
            {item.label}
            {item.description && (
              <span
                className="block text-2xs mt-0.5"
                style={{ color: 'var(--surface-text-muted)' }}
              >
                {item.description}
              </span>
            )}
          </span>
          {item.badge && (
            <Badge
              variant="rounded"
              size="xs"
              theme={BADGE_BADGE_THEME[item.badge]}
              bordered
            >
              {item.badge}
            </Badge>
          )}
        </li>
      ))}
    </ul>
  );
}

export function ReportScopeModule({ scope }: ReportScopeModuleProps) {
  const shouldReduceMotion = useReducedMotion();

  const BUCKETS = [
    {
      id: 'market',
      label: 'Market coverage',
      icon: <Map size={18} aria-hidden="true" />,
      items: scope.marketCoverage,
    },
    {
      id: 'geography',
      label: 'Geography',
      icon: <Globe size={18} aria-hidden="true" />,
      items: scope.geographyCoverage,
    },
    {
      id: 'segments',
      label: 'Segments',
      icon: <PieChart size={18} aria-hidden="true" />,
      items: scope.segmentCoverage,
    },
    {
      id: 'competitors',
      label: 'Competitors',
      icon: <Users size={18} aria-hidden="true" />,
      items: scope.competitorCoverage,
    },
    {
      id: 'time',
      label: 'Time period',
      icon: <Calendar size={18} aria-hidden="true" />,
      items: [
        { label: `Base year: ${scope.timeCoverage.baseYear}` },
        { label: `Historical: ${scope.timeCoverage.historical}` },
        { label: `Forecast: ${scope.timeCoverage.forecast}` },
      ] as ScopeItem[],
    },
    {
      id: 'methodology',
      label: 'Methodology',
      icon: <FlaskConical size={18} aria-hidden="true" />,
      items: scope.methodologyCoverage,
    },
    {
      id: 'deliverables',
      label: 'Deliverables',
      icon: <Package size={18} aria-hidden="true" />,
      items: scope.deliverables,
    },
    {
      id: 'customization',
      label: 'Customization',
      icon: <Settings size={18} aria-hidden="true" />,
      items: scope.customizationOptions,
    },
  ];

  return (
    <SectionWrapper background="warm" spacing="lg" id="report-scope">
      <div className="flex flex-col gap-8">
        <SectionHeading level={2} eyebrow="Coverage" align="left">
          What this report covers
        </SectionHeading>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          role="list"
          aria-label="Report scope buckets"
        >
          {BUCKETS.map((bucket, i) => (
            <motion.div
              key={bucket.id}
              role="listitem"
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card variant="white" padding="md" shadow="sm">
                <div className="flex flex-col gap-3 h-full">
                  {/* Bucket header */}
                  <div className="flex items-center gap-2">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-button)] flex-shrink-0"
                      style={{ backgroundColor: 'var(--color-ramp-warm-200)' }}
                      aria-hidden="true"
                    >
                      <span style={{ color: 'var(--color-brand-red)' }}>{bucket.icon}</span>
                    </div>
                    <h3
                      className="text-compact font-body font-semibold"
                      style={{ color: 'var(--color-foundation-black)' }}
                    >
                      {bucket.label}
                    </h3>
                  </div>

                  <ScopeList items={bucket.items} />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
