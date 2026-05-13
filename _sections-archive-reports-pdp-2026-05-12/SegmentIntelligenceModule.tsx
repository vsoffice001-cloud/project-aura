'use client';

/**
 * SegmentIntelligenceModule — Row 15 — Recipe report-detail.md line 56
 * bg: white · spacing: lg · motion: tab transitions
 * Tabs: End User · Market Type · Temp Range · Region · Mode · Truck Type · Domestic/International
 * Per-tab: chart placeholder + dominant-segment Badge
 * Metered chart interactions (AccessLevelGate)
 * Mobile: horizontal-scroll tab strip w/ scroll-snap
 */

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  SectionWrapper,
  SectionHeading,
  SectionLabel,
  Badge,
  Card,
} from '@kenresearch/design-system/atoms';
import { AccessLevelGate } from '@/components/AccessLevelGate';
import { useAnalytics } from '@/hooks/useAnalytics';
import type { ChartModule } from '@/types/schema';
import { BarChart3 } from 'lucide-react';

interface Props {
  /** Array of ChartModules for each segment dimension */
  segments: ChartModule[];
}

// Recipe-locked tab labels (row 15 spec)
const TAB_LABELS = [
  'End User',
  'Market Type',
  'Temp Range',
  'Region',
  'Mode',
  'Truck Type',
  'Domestic/International',
] as const;

type SegmentTab = (typeof TAB_LABELS)[number];

const METERED_ACCESS = {
  level: 'metered' as const,
  ctaTrigger: 'sample' as const,
  meterKey: 'segment-chart',
  schemaIsAccessibleForFree: true,
  paywallSelector: '.kr-meter-segment',
};

// Map tab label to segment chart module
function findSegmentModule(
  segments: ChartModule[],
  tab: SegmentTab,
): ChartModule | null {
  const labelMap: Record<SegmentTab, string[]> = {
    'End User': ['end-user', 'end_user', 'enduser'],
    'Market Type': ['market-type', 'market_type'],
    'Temp Range': ['temp-range', 'temperature', 'temp_range'],
    Region: ['region'],
    Mode: ['mode', 'transport-mode'],
    'Truck Type': ['truck-type', 'truck_type'],
    'Domestic/International': ['domestic', 'international', 'domestic-international'],
  };
  const keys = labelMap[tab];
  return (
    segments.find((s) =>
      keys.some(
        (k) =>
          s.id.toLowerCase().includes(k) ||
          (s.heading ?? '').toLowerCase().includes(k) ||
          (s.label ?? '').toLowerCase().includes(k),
      ),
    ) ?? segments[0] ?? null
  );
}

// Derive dominant segment from series data
function getDominantSegment(module: ChartModule | null): string | null {
  if (!module) return null;
  const series = module.series[0];
  if (!series || series.data.length === 0) return null;
  const dominant = [...series.data].sort((a, b) => b.y - a.y)[0];
  if (!dominant) return null;
  return typeof dominant.x === 'string' ? dominant.x : String(dominant.x);
}

function ChartTabContent({
  module,
  prefersReduced,
}: {
  module: ChartModule | null;
  prefersReduced: boolean | null;
}) {
  const dominant = getDominantSegment(module);

  return (
    <motion.div
      key={module?.id ?? 'empty'}
      initial={prefersReduced ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="mt-6"
    >
      {/* Dominant segment badge */}
      {dominant && (
        <div className="flex items-center gap-2 mb-4">
          <span
            style={{
              fontSize: 'var(--typography-size-compact)',
              color: 'var(--surface-text-muted)',
            }}
          >
            Dominant segment:
          </span>
          <Badge theme="neutral" size="sm">
            {dominant}
          </Badge>
        </div>
      )}

      {/* Metered chart area */}
      <AccessLevelGate
        access={METERED_ACCESS}
        moduleId={module?.id ?? 'segment-chart'}
        sectionName="SegmentIntelligenceModule"
      >
        <Card variant="white" padding="md" className="w-full">
          <div
            style={{
              minHeight: '280px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--space-3)',
            }}
          >
            <BarChart3
              size={32}
              aria-hidden="true"
              style={{ color: 'var(--color-ramp-warm-400)' }}
            />
            <p
              style={{
                fontSize: 'var(--typography-size-sm)',
                color: 'var(--surface-text-muted)',
                fontStyle: 'italic',
                textAlign: 'center',
              }}
            >
              {module?.heading ?? 'Segment chart'} — Phase C (Highcharts wire)
            </p>
          </div>
        </Card>
      </AccessLevelGate>

      {/* Series data teaser */}
      {module && module.series[0] && (
        <div className="flex flex-wrap gap-2 mt-4">
          {module.series[0].data.slice(0, 5).map((point) => (
            <div
              key={String(point.x)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: 'var(--space-2) var(--space-3)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-soft)',
                background: 'var(--color-ramp-warm-50)',
                minWidth: '80px',
              }}
            >
              <span
                style={{
                  fontSize: 'var(--typography-size-compact)',
                  color: 'var(--surface-text)',
                  fontWeight: 600,
                }}
              >
                {point.y}%
              </span>
              <span
                style={{
                  fontSize: 'var(--typography-size-compact)',
                  color: 'var(--surface-text-muted)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '100px',
                }}
              >
                {String(point.x)}
              </span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export function SegmentIntelligenceModule({ segments }: Props) {
  const prefersReduced = useReducedMotion();
  const dispatch = useAnalytics();
  const [activeTab, setActiveTab] = useState<SegmentTab>('End User');

  const handleTabChange = (tab: SegmentTab) => {
    setActiveTab(tab);
    dispatch('chart_filter_change', {
      section_name: 'SegmentIntelligenceModule',
      tab_name: tab,
    });
  };

  const activeModule = findSegmentModule(segments, activeTab);

  return (
    <SectionWrapper
      background="white"
      spacing="lg"
      maxWidth="wide"
      id="sec-segmentation"
    >
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="inline-flex mb-3">
          <SectionLabel background="light" variant="default">
            SEGMENTATION
          </SectionLabel>
        </div>
        <SectionHeading level={2} align="left">
          Segment Intelligence
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
          Seven segmentation dimensions — explore each to understand market composition
          and identify growth pockets.
        </p>
      </motion.div>

      {/* Tab strip — horizontal scroll on mobile */}
      <div
        className="overflow-x-auto mt-8"
        style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
        role="tablist"
        aria-label="Segmentation dimensions"
      >
        <div
          style={{
            display: 'flex',
            gap: 'var(--space-1)',
            minWidth: 'max-content',
            paddingBottom: 'var(--space-1)',
            borderBottom: '1px solid var(--border-soft)',
          }}
        >
          {TAB_LABELS.map((label) => (
            <button
              key={label}
              type="button"
              role="tab"
              aria-selected={activeTab === label}
              tabIndex={activeTab === label ? 0 : -1}
              aria-controls={`seg-panel-${label.replace(/\//g, '-').replace(/\s+/g, '-').toLowerCase()}`}
              onClick={() => handleTabChange(label)}
              style={{
                scrollSnapAlign: 'start',
                padding: 'var(--space-2) var(--space-4)',
                borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0',
                border: 'none',
                background:
                  activeTab === label
                    ? 'var(--color-ramp-warm-200)'
                    : 'transparent',
                cursor: 'pointer',
                fontSize: 'var(--typography-size-sm)',
                fontWeight: activeTab === label ? 600 : 400,
                color:
                  activeTab === label
                    ? 'var(--surface-text)'
                    : 'var(--surface-text-muted)',
                whiteSpace: 'nowrap',
                minHeight: '44px',
                borderBottom:
                  activeTab === label
                    ? '2px solid var(--color-brand-red)'
                    : '2px solid transparent',
                transition: 'background-color 0.15s ease, border-color 0.15s ease',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab panel */}
      <div
        id={`seg-panel-${activeTab.replace(/\//g, '-').replace(/\s+/g, '-').toLowerCase()}`}
        role="tabpanel"
        aria-label={activeTab}
      >
        <ChartTabContent
          module={activeModule}
          prefersReduced={prefersReduced}
        />
      </div>
    </SectionWrapper>
  );
}
