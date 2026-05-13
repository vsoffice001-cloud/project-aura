'use client';

/**
 * CRAFT (aura-craft step 4.5 · 2026-05-12)
 * Section type: Tabbed chart
 * Lead element: active tab chart (ChartCard 8-zone · full-width · dominant segment badge prominent)
 * Support: 7-tab chip bar (active = black bg · icon + label · 44px · snap-scroll) + metered nudge banner
 * Type rhythm: 2xl/base/sm/xs — SectionHeading level={2} (section lead) · tab label = 13px font-body
 *   ChartCard title = text-lg · dominant badge = sm · insight = text-compact italic
 * Motion event: tab cross-fade 200ms (AnimatePresence mode="wait" · 220ms) + metered nudge height 250ms
 *   chart hydration fade via ChartCard = 450ms (counts as 3rd concurrent if visible simultaneously — borderline)
 *   DECISION: tab cross-fade + chart fade = 2 motion events; nudge is conditional (rarely visible) = acceptable
 *   — useReducedMotion: initial:{} on tab panel · duration 0 on nudge · chart no entrance
 * Depth: ChartCard shadow="sm" · tab bar chips: border-default with black/transparent active state
 *   metered nudge: warm-100 bg + border-soft (contextual strip · no shadow)
 * Mobile override: tab bar horizontal scroll chip row (overflow-x-auto · snap-x mandatory · scrollbarWidth none)
 *   chart = full-width card · dominant badge above chart in card
 */

/**
 * SegmentIntelligenceModule — 7-tab segmentation cockpit (recipe row 16)
 *
 * Variant: editorial-light
 * Background: white · spacing: lg (LOCK 3)
 *
 * 7 tabs: End User / Market Type / Temp Range / Region / Mode / Truck Type / Domestic-International
 * Per-tab: ChartCard placeholder + dominant-segment Badge
 *
 * Mobile: horizontal scroll chips (overflow-x-auto · snap-x · gap-2)
 * access="metered" on chart interactions — after 2 tab switches → lead form CTA
 *
 * A11y: ARIA tablist · keyboard nav · arrow keys · 44px min touch targets
 * TODO: promote Tabs component to DS atom after sprint
 */

import { useState, useRef, useId } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { PieChart, BarChart2, Thermometer, Globe, Truck, Container, Map } from 'lucide-react';
import {
  SectionWrapper,
  SectionHeading,
  Badge,
  Button,
} from '@kenresearch/design-system/atoms';
import { ChartCard } from './ChartCard';
import { useLeadFormModal } from '@/components/LeadFormModalProvider';

// ─── Tab configuration ───────────────────────────────────────────────────────

const SEGMENT_TABS = [
  {
    key: 'end-user',
    label: 'End User',
    icon: PieChart,
    chartTitle: 'End-User Segmentation by Revenue Share, 2022',
    insight: 'Pharmaceuticals lead revenue share at 43.7%, followed by Meat & Seafood at 34.6%.',
    dominant: { label: 'Pharmaceuticals', value: '43.7%' },
    chartSummary: 'Meat & Seafood · Fruits & Vegetables · Pharma · Confectionery',
  },
  {
    key: 'market-type',
    label: 'Market Type',
    icon: BarChart2,
    chartTitle: 'Cold Storage vs Cold Transport Revenue Split, 2022',
    insight: 'Cold Transport (59.6%) leads Cold Storage (40.4%) by revenue — driven by geographic spread.',
    dominant: { label: 'Cold Transport', value: '59.6%' },
    chartSummary: 'Cold Storage AUD 2,647.8 Mn · Cold Transport AUD 3,900.0 Mn',
  },
  {
    key: 'temp-range',
    label: 'Temp Range',
    icon: Thermometer,
    chartTitle: 'Revenue Split by Temperature Range, 2022',
    insight: 'Frozen storage (-18°C) accounts for majority of cold storage capacity utilization.',
    dominant: { label: 'Frozen (-18°C)', value: '54%' },
    chartSummary: 'Frozen · Chilled · Ambient-controlled',
  },
  {
    key: 'region',
    label: 'Region',
    icon: Globe,
    chartTitle: 'Revenue by Australian State, 2022',
    insight: 'NSW and VIC together account for ~55% of total cold chain revenue.',
    dominant: { label: 'NSW + VIC', value: '~55%' },
    chartSummary: 'NSW · VIC · QLD · WA · SA · Others',
  },
  {
    key: 'mode',
    label: 'Mode',
    icon: Truck,
    chartTitle: 'Cold Transport by Mode, 2022',
    insight: 'Road transport dominates at ~78% of cold transport revenue.',
    dominant: { label: 'Road', value: '~78%' },
    chartSummary: 'Road · Sea (Reefer) · Air',
  },
  {
    key: 'truck-type',
    label: 'Truck Type',
    icon: Container,
    chartTitle: 'Refrigerated Truck Fleet Breakdown, 2022',
    insight: 'Refrigerated semi-trailers (>14t) account for ~62% of fleet revenue.',
    dominant: { label: 'Semi-trailers >14t', value: '~62%' },
    chartSummary: 'Semi-trailers >14t · Vans <3.5t · Rigid trucks 3.5-14t',
  },
  {
    key: 'domestic-international',
    label: 'Dom / Intl',
    icon: Map,
    chartTitle: 'Domestic vs International Cold Chain Revenue, 2022',
    insight: 'Domestic cold chain represents ~82% of total revenue; international growing at ~12% CAGR.',
    dominant: { label: 'Domestic', value: '~82%' },
    chartSummary: 'Domestic · International exports · Import cold chain',
  },
] as const;

type SegmentTabKey = (typeof SEGMENT_TABS)[number]['key'];

// Meter threshold: after N tab switches → show lead form nudge
const METER_THRESHOLD = 2;

// ─── Static chart placeholder ────────────────────────────────────────────────

function SegmentChartPlaceholder({
  tabKey,
  chartSummary,
}: {
  tabKey: SegmentTabKey;
  chartSummary: string;
}) {
  // Simple donut/bar placeholder with CSS
  const isDonut = ['end-user', 'market-type', 'temp-range', 'domestic-international'].includes(tabKey);

  if (isDonut) {
    return (
      <div
        className="w-full h-[200px] rounded-[var(--radius-card)] flex flex-col items-center justify-center gap-3"
        style={{ backgroundColor: 'var(--color-ramp-warm-100)' }}
        role="img"
        aria-label={`${tabKey} segmentation chart — static preview`}
      >
        {/* Simple concentric circle placeholder */}
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center"
          style={{
            background: `conic-gradient(var(--color-brand-red) 0deg 158deg, var(--color-ramp-warm-300) 158deg 283deg, var(--color-ramp-warm-400) 283deg 360deg)`,
            boxShadow: '0 0 0 20px var(--color-ramp-warm-100)',
          }}
          aria-hidden="true"
        >
          <div
            className="w-12 h-12 rounded-full"
            style={{ backgroundColor: 'var(--color-ramp-warm-100)' }}
          />
        </div>
        <p className="text-2xs font-body text-center px-4" style={{ color: 'var(--surface-text-muted)' }}>
          {chartSummary}
        </p>
        {/* TODO: wire @ken-research/charts Highcharts engine */}
      </div>
    );
  }

  // Bar chart placeholder for region/mode/truck-type
  return (
    <div
      className="w-full h-[200px] rounded-[var(--radius-card)] px-4 pt-4 pb-2 flex flex-col gap-1"
      style={{ backgroundColor: 'var(--color-ramp-warm-100)' }}
      role="img"
      aria-label={`${tabKey} segmentation bar chart — static preview`}
    >
      <div className="flex-1 flex items-end gap-2">
        {[78, 14, 8].map((pct, i) => (
          <div key={i} className="flex flex-col items-center gap-1 flex-1">
            <div
              className="w-full rounded-t-sm"
              style={{
                height: `${pct}%`,
                backgroundColor: i === 0 ? 'var(--color-brand-red)' : 'var(--color-ramp-warm-400)',
                opacity: i === 0 ? 1 : 0.5 + i * 0.1,
              }}
              aria-hidden="true"
            />
          </div>
        ))}
      </div>
      <p className="text-2xs font-body text-center" style={{ color: 'var(--surface-text-muted)' }}>
        {chartSummary}
        {/* TODO: wire @ken-research/charts Highcharts engine */}
      </p>
    </div>
  );
}

// ─── SegmentIntelligenceModule ────────────────────────────────────────────────

export interface SegmentIntelligenceModuleProps {
  reportSlug?: string;
}

export function SegmentIntelligenceModule({ reportSlug = '' }: SegmentIntelligenceModuleProps) {
  const [activeTab, setActiveTab] = useState<SegmentTabKey>('end-user');
  const [switchCount, setSwitchCount] = useState(0);
  const [meterNudgeShown, setMeterNudgeShown] = useState(false);
  const { openForm } = useLeadFormModal();
  const shouldReduceMotion = useReducedMotion();
  const tablistId = useId();
  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);

  const activeTabData = SEGMENT_TABS.find((t) => t.key === activeTab)!;

  const handleTabChange = (key: SegmentTabKey) => {
    if (key === activeTab) return;
    setActiveTab(key);
    const newCount = switchCount + 1;
    setSwitchCount(newCount);
    if (newCount >= METER_THRESHOLD && !meterNudgeShown) {
      setMeterNudgeShown(true);
    }
  };

  const handleKeyNav = (e: React.KeyboardEvent, currentIdx: number) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIdx = (currentIdx + 1) % SEGMENT_TABS.length;
      handleTabChange(SEGMENT_TABS[nextIdx].key);
      tabRefs.current[nextIdx]?.focus();
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIdx = (currentIdx - 1 + SEGMENT_TABS.length) % SEGMENT_TABS.length;
      handleTabChange(SEGMENT_TABS[prevIdx].key);
      tabRefs.current[prevIdx]?.focus();
    }
  };

  return (
    <SectionWrapper background="white" spacing="lg" id="segment-intelligence">
      <div className="flex flex-col gap-8">
        <SectionHeading level={2} eyebrow="Segment Intelligence" align="left">
          Segmentation Analysis
        </SectionHeading>

        {/* Tab bar — horizontal scroll chips on mobile */}
        <div
          role="tablist"
          aria-label="Segmentation dimensions"
          className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 snap-x snap-mandatory"
          id={tablistId}
        >
          {SEGMENT_TABS.map((tab, idx) => {
            const isActive = activeTab === tab.key;
            const Icon = tab.icon;
            return (
              <div
                key={tab.key}
                ref={(el) => { tabRefs.current[idx] = el; }}
                role="tab"
                id={`${tablistId}-tab-${tab.key}`}
                aria-selected={isActive}
                aria-controls={`${tablistId}-panel-${tab.key}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => handleTabChange(tab.key)}
                onKeyDown={(e) => handleKeyNav(e, idx)}
                className="snap-start shrink-0 flex items-center gap-1.5 cursor-pointer transition-colors"
                style={{
                  minHeight: '44px',
                  padding: '8px 14px',
                  borderRadius: '9999px',
                  backgroundColor: isActive ? 'var(--color-foundation-black)' : 'transparent',
                  color: isActive ? 'var(--color-foundation-white)' : 'var(--color-foundation-black)',
                  border: '1px solid var(--border-default)',
                  fontSize: '13px',
                  fontFamily: 'inherit',
                  lineHeight: '1.3',
                  whiteSpace: 'nowrap',
                }}
              >
                <Icon size={13} aria-hidden="true" />
                {tab.label}
              </div>
            );
          })}
        </div>

        {/* Metered nudge — after 2 switches */}
        <AnimatePresence>
          {meterNudgeShown && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
              className="flex items-center justify-between gap-3 flex-wrap px-4 py-3 rounded-[var(--radius-card)]"
              style={{
                backgroundColor: 'var(--color-ramp-warm-100)',
                border: '1px solid var(--border-soft)',
              }}
            >
              <p className="text-compact font-body" style={{ color: 'var(--surface-text-muted)' }}>
                You&apos;ve explored {switchCount} segments — unlock the full dataset to compare all segments.
              </p>
              <Button
                variant="brand"
                size="sm"
                onClick={() => {
                  setMeterNudgeShown(false);
                  openForm('sample', {
                    reportSlug,
                    ctaLocation: 'segment-intelligence-meter',
                    sectionName: 'segment-intelligence',
                  });
                }}
              >
                Unlock Segments
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tab panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            role="tabpanel"
            id={`${tablistId}-panel-${activeTab}`}
            aria-labelledby={`${tablistId}-tab-${activeTab}`}
            tabIndex={0}
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? {} : { opacity: 0, y: -4 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <ChartCard
              id={`segment-chart-${activeTab}`}
              eyebrow={`Segmentation · ${activeTabData.label}`}
              methodologyBadge="Bottom-up analysis"
              title={activeTabData.chartTitle}
              insight={activeTabData.insight}
              source={{ label: 'Ken Research analysis', lastUpdated: 'Q1 2026' }}
              access="metered"
              primaryCTA={{
                label: 'Download Sample Report',
                onClick: () =>
                  openForm('sample', {
                    reportSlug,
                    ctaLocation: `segment-chart-${activeTab}`,
                    sectionName: 'segment-intelligence',
                  }),
                variant: 'brand',
              }}
              secondaryCTA={{
                label: 'Request Customization',
                onClick: () =>
                  openForm('customization', {
                    reportSlug,
                    ctaLocation: `segment-chart-${activeTab}`,
                    sectionName: 'segment-intelligence',
                  }),
              }}
            >
              <div className="flex flex-col gap-3">
                {/* Dominant segment badge */}
                <div className="flex items-center gap-2">
                  <span
                    className="text-2xs font-body font-semibold uppercase tracking-wider"
                    style={{ color: 'var(--surface-text-muted)' }}
                  >
                    Dominant segment
                  </span>
                  <Badge theme="neutral" size="sm">
                    {activeTabData.dominant.label} — {activeTabData.dominant.value}
                  </Badge>
                </div>

                {/* Chart placeholder */}
                <SegmentChartPlaceholder
                  tabKey={activeTabData.key}
                  chartSummary={activeTabData.chartSummary}
                />
              </div>
            </ChartCard>
          </motion.div>
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}
