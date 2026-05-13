'use client';

/**
 * ReportScopeModule — Row 8 — Recipe report-detail.md line 49
 * bg: warm-300 · spacing: lg · motion: Framer fade-up
 * 8-bucket coverage: Market · Geography · Segment · Competitor ·
 * Time · Methodology · Deliverables · Customization
 */

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  SectionWrapper,
  SectionHeading,
  SectionLabel,
  Card,
} from '@kenresearch/design-system/atoms';
import {
  MapPin,
  Layers,
  Users,
  Clock,
  FlaskConical,
  Package,
  Settings,
  Globe,
  ChevronDown,
} from 'lucide-react';
import type { ReportScope, ScopeItem } from '@/types/schema';

interface Props {
  scope: ReportScope;
}

interface Bucket {
  id: string;
  icon: React.ElementType;
  label: string;
  items: ScopeItem[] | string[];
}

function normItems(items: ScopeItem[]): string[] {
  return items.map((i) => i.label);
}

const SHOW_THRESHOLD = 5;

function BucketCard({ bucket }: { bucket: Bucket }) {
  const [expanded, setExpanded] = useState(false);
  const items = bucket.items as (ScopeItem | string)[];
  const displayItems = items.map((i) => (typeof i === 'string' ? i : i.label));
  const visible = expanded ? displayItems : displayItems.slice(0, SHOW_THRESHOLD);
  const hasMore = displayItems.length > SHOW_THRESHOLD;
  const Icon = bucket.icon;

  return (
    <Card variant="white" padding="md" className="h-full flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Icon
          size={16}
          aria-hidden="true"
          style={{ color: 'var(--color-brand-red)', flexShrink: 0 }}
        />
        <span
          style={{
            fontFamily: 'var(--typography-family-display)',
            fontSize: 'var(--typography-size-sm)',
            fontWeight: 600,
            color: 'var(--surface-text)',
          }}
        >
          {bucket.label}
        </span>
      </div>

      <ul className="flex flex-col gap-1.5" role="list">
        {visible.map((item) => (
          <li
            key={item}
            style={{
              fontSize: 'var(--typography-size-sm)',
              color: 'var(--surface-text-muted)',
              lineHeight: 1.5,
              paddingLeft: 'var(--space-3)',
              position: 'relative',
            }}
          >
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: 0,
                top: '0.55em',
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: 'var(--color-ramp-warm-400)',
                display: 'inline-block',
              }}
            />
            {item}
          </li>
        ))}
      </ul>

      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--space-1)',
            fontSize: 'var(--typography-size-compact)',
            color: 'var(--color-brand-red)',
            fontWeight: 500,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            marginTop: 'auto',
            minHeight: '44px',
          }}
        >
          <ChevronDown
            size={14}
            aria-hidden="true"
            style={{
              transform: expanded ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.2s ease',
            }}
          />
          {expanded
            ? 'Show less'
            : `Show all (${displayItems.length})`}
        </button>
      )}
    </Card>
  );
}

export function ReportScopeModule({ scope }: Props) {
  const prefersReduced = useReducedMotion();

  const buckets: Bucket[] = [
    {
      id: 'market',
      icon: Globe,
      label: 'Market Coverage',
      items: normItems(scope.marketCoverage),
    },
    {
      id: 'geography',
      icon: MapPin,
      label: 'Geography',
      items: normItems(scope.geographyCoverage),
    },
    {
      id: 'segment',
      icon: Layers,
      label: 'Segments',
      items: normItems(scope.segmentCoverage),
    },
    {
      id: 'competitor',
      icon: Users,
      label: 'Competitors',
      items: normItems(scope.competitorCoverage),
    },
    {
      id: 'time',
      icon: Clock,
      label: 'Time Coverage',
      items: [
        `Base Year: ${scope.timeCoverage.baseYear}`,
        `Historical: ${scope.timeCoverage.historical}`,
        `Forecast: ${scope.timeCoverage.forecast}`,
      ],
    },
    {
      id: 'methodology',
      icon: FlaskConical,
      label: 'Methodology',
      items: normItems(scope.methodologyCoverage),
    },
    {
      id: 'deliverables',
      icon: Package,
      label: 'Deliverables',
      items: normItems(scope.deliverables),
    },
    {
      id: 'customization',
      icon: Settings,
      label: 'Customization',
      items: normItems(scope.customizationOptions),
    },
  ];

  return (
    <SectionWrapper
      background="warm"
      spacing="lg"
      maxWidth="wide"
      id="sec-scope"
    >
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="inline-flex mb-3">
          <SectionLabel background="light" variant="default">
            WHAT&apos;S COVERED
          </SectionLabel>
        </div>
        <SectionHeading level={2} align="left">
          Report Scope
        </SectionHeading>
        <p
          style={{
            fontSize: 'var(--typography-size-sm)',
            color: 'var(--surface-text-muted)',
            marginTop: 'var(--space-3)',
            maxWidth: '56ch',
            lineHeight: 1.6,
          }}
        >
          Eight coverage dimensions — markets, geographies, segments, competitors,
          time periods, methodology, deliverables, and customization options.
        </p>
      </motion.div>

      {/* 4×2 desktop grid · 2×4 tablet · 1-col mobile */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8"
        role="list"
      >
        {buckets.map((bucket, i) => (
          <motion.div
            key={bucket.id}
            role="listitem"
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{
              duration: 0.4,
              ease: 'easeOut',
              delay: prefersReduced ? 0 : Math.min(i, 7) * 0.06,
            }}
          >
            <BucketCard bucket={bucket} />
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
