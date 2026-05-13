'use client';

/**
 * CRAFT (aura-craft step 4.5 · 2026-05-12)
 * Section type: Chart card (wraps ChartCard 8-zone wrapper)
 * Lead element: chart viz (static bar+line SVG placeholder · min-h-[220px] · full-width)
 * Support: SectionHeading (section lead) + ChartCard zones (title · insight · controls · dataset · source · CTA)
 * Type rhythm: 2xl/base italic/sm/xs — SectionHeading level={2} = section lead · ChartCard title = text-lg
 *   insight = text-compact italic · toggle labels = 12px inline · source = text-2xs
 * Motion event: hydration fade 400ms via ChartCard whileInView (1 event · 450ms ease)
 *   dataset drawer entrance = spring via DatasetPreviewDrawer (separate overlay · not counted here)
 *   — useReducedMotion: ChartCard initial:{} → no entrance · drawer duration 0
 * Depth: ChartCard uses Card variant="outlined" shadow="sm" · dataset strip = warm-100 bg + border
 *   StaticBarLineChart area = warm-100 bg rounded-[var(--radius-card)] (consistent radius token)
 * Mobile override: controls flex-wrap (toggle groups stack if viewport < 400px) · drawer = bottom-sheet
 */

/**
 * MarketSizeChart — Market size + forecast chart section (PRD §20)
 *
 * Wraps ChartCard w/ all 8 zones populated.
 * Variant: editorial-light
 * Background: white · spacing: lg (LOCK 3)
 *
 * Chart viz: STATIC SVG/HTML placeholder for now.
 * TODO: wire @ken-research/charts Highcharts engine
 *
 * Controls:
 *   Revenue / Growth Rate toggle
 *   Historical / Forecast toggle
 *   View Dataset button (opens DatasetPreviewDrawer)
 *
 * access="public" — chart preview public · dataset is lead-gated via drawer
 */

import { useState, useId } from 'react';
import { SectionWrapper, SectionHeading, Button } from '@kenresearch/design-system/atoms';
import { ChartCard } from './ChartCard';
import { DatasetPreviewDrawer, type DatasetColumn, type DatasetRow } from './DatasetPreviewDrawer';
import type { ChartModule } from '@/types/schema';
import { useLeadFormModal } from '@/components/LeadFormModalProvider';

// ─── Static bar+line chart placeholder ─────────────────────────────────────

const HISTORIC_BARS = [
  { year: 2017, value: 4231.1 },
  { year: 2018, value: 4640.7 },
  { year: 2019, value: 5123.7 },
  { year: 2020, value: 5596.1 },
  { year: 2021, value: 6063.3 },
  { year: 2022, value: 6547.8 },
];

const FORECAST_BARS = [
  { year: 2022, value: 6547.8 },
  { year: 2023, value: 7162.4 },
  { year: 2024, value: 7815.0 },
  { year: 2025, value: 8513.0 },
  { year: 2026, value: 9256.0 },
  { year: 2027, value: 10705.0 },
];

const GROWTH_RATES = [
  { year: 2018, rate: 9.7 },
  { year: 2019, rate: 10.4 },
  { year: 2020, rate: 9.2 },
  { year: 2021, rate: 8.3 },
  { year: 2022, rate: 8.0 },
];

type ViewMode = 'revenue' | 'growth-rate';
type TimeMode = 'historical' | 'forecast';

function StaticBarLineChart({
  viewMode,
  timeMode,
}: {
  viewMode: ViewMode;
  timeMode: TimeMode;
}) {
  const bars = timeMode === 'historical' ? HISTORIC_BARS : FORECAST_BARS;
  const maxVal = Math.max(...bars.map((b) => b.value));

  if (viewMode === 'growth-rate') {
    // Simple line chart placeholder
    const points = GROWTH_RATES;
    const minRate = 7;
    const maxRate = 12;
    const w = 340;
    const h = 140;
    const pts = points.map((p, i) => ({
      x: (i / (points.length - 1)) * w,
      y: h - ((p.rate - minRate) / (maxRate - minRate)) * (h - 20),
      ...p,
    }));
    const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

    return (
      <div
        className="w-full h-[220px] rounded-[var(--radius-card)] p-4 flex flex-col gap-2"
        style={{ backgroundColor: 'var(--color-ramp-warm-100)' }}
        role="img"
        aria-label="Growth rate trend chart — static preview"
      >
        <p className="text-2xs font-body" style={{ color: 'var(--surface-text-muted)' }}>
          Growth Rate % (Historical)
        </p>
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full flex-1" aria-hidden="true">
          <path
            d={path}
            fill="none"
            stroke="var(--color-brand-red)"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {pts.map((p) => (
            <g key={p.year}>
              <circle cx={p.x} cy={p.y} r={4} fill="var(--color-brand-red)" />
              <text x={p.x} y={h + 2} textAnchor="middle" fontSize={9} fill="var(--surface-text-muted)">
                {p.year}
              </text>
              <text x={p.x} y={p.y - 8} textAnchor="middle" fontSize={9} fill="var(--color-foundation-black)">
                {p.rate}%
              </text>
            </g>
          ))}
        </svg>
        {/* TODO: wire @ken-research/charts Highcharts engine */}
      </div>
    );
  }

  // Revenue bar chart
  const isForecast = timeMode === 'forecast';

  return (
    <div
      className="w-full h-[220px] rounded-[var(--radius-card)] px-4 pt-4 pb-2 flex flex-col gap-1"
      style={{ backgroundColor: 'var(--color-ramp-warm-100)' }}
      role="img"
      aria-label={`${isForecast ? 'Forecast' : 'Historical'} market size bar chart — static preview`}
    >
      <p className="text-2xs font-body shrink-0" style={{ color: 'var(--surface-text-muted)' }}>
        Revenue (AUD Mn) — {isForecast ? '2022–2027 Forecast' : '2017–2022 Historical'}
      </p>
      <div className="flex-1 flex items-end gap-2 mt-2 overflow-hidden">
        {bars.map((bar) => {
          const heightPct = (bar.value / maxVal) * 100;
          return (
            <div key={bar.year} className="flex flex-col items-center gap-1 flex-1 min-w-0">
              <span
                className="text-2xs font-body tabular-nums"
                style={{ color: 'var(--color-foundation-black)', fontSize: '8px' }}
                aria-label={`${bar.year}: AUD ${bar.value.toLocaleString()} Mn`}
              >
                {(bar.value / 1000).toFixed(1)}k
              </span>
              <div
                className="w-full rounded-t-sm"
                style={{
                  height: `${heightPct}%`,
                  minHeight: '4px',
                  backgroundColor: isForecast
                    ? 'var(--color-ramp-warm-400)'
                    : 'var(--color-brand-red)',
                  opacity: isForecast ? 0.7 : 1,
                }}
                aria-hidden="true"
              />
              <span className="text-2xs" style={{ color: 'var(--surface-text-muted)', fontSize: '8px' }}>
                {bar.year}
              </span>
            </div>
          );
        })}
      </div>
      {/* TODO: wire @ken-research/charts Highcharts engine */}
    </div>
  );
}

// ─── Dataset columns + rows for drawer ──────────────────────────────────────

const DATASET_COLUMNS: DatasetColumn[] = [
  { id: 'year', label: 'Year', format: 'year', align: 'left' },
  { id: 'value', label: 'Value (AUD Mn)', format: 'currency', align: 'right' },
  { id: 'growth', label: 'Growth %', format: 'percent', align: 'right' },
];

const DATASET_ROWS: DatasetRow[] = [
  { id: 'r0', cells: [{ columnId: 'year', value: 2017 }, { columnId: 'value', value: 4231.1 }, { columnId: 'growth', value: '—' }] },
  { id: 'r1', cells: [{ columnId: 'year', value: 2018 }, { columnId: 'value', value: 4640.7 }, { columnId: 'growth', value: 9.7 }] },
  { id: 'r2', cells: [{ columnId: 'year', value: 2019 }, { columnId: 'value', value: 5123.7 }, { columnId: 'growth', value: 10.4 }] },
  { id: 'r3', cells: [{ columnId: 'year', value: 2020 }, { columnId: 'value', value: 5596.1 }, { columnId: 'growth', value: 9.2 }] },
  { id: 'r4', cells: [{ columnId: 'year', value: 2021 }, { columnId: 'value', value: 6063.3 }, { columnId: 'growth', value: 8.3 }] },
  { id: 'r5', cells: [{ columnId: 'year', value: 2022 }, { columnId: 'value', value: 6547.8 }, { columnId: 'growth', value: 8.0 }] },
];

// ─── Component ───────────────────────────────────────────────────────────────

export interface MarketSizeChartProps {
  data?: ChartModule;
  reportSlug: string;
}

export function MarketSizeChart({ reportSlug }: MarketSizeChartProps) {
  const { openForm } = useLeadFormModal();
  const [viewMode, setViewMode] = useState<ViewMode>('revenue');
  const [timeMode, setTimeMode] = useState<TimeMode>('historical');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleGroupId = useId();

  // Toggle button style helper
  const toggleStyle = (active: boolean) => ({
    backgroundColor: active ? 'var(--color-foundation-black)' : 'transparent',
    color: active ? 'var(--color-foundation-white)' : 'var(--surface-text-muted)',
    border: '1px solid var(--border-default)',
    borderRadius: 'var(--radius-button)',
    fontSize: '12px',
    padding: '4px 10px',
    fontFamily: 'inherit',
    cursor: 'pointer',
    transition: 'background 0.15s, color 0.15s',
  });

  const controls = (
    <div className="flex items-center gap-2 flex-wrap">
      {/* Revenue / Growth Rate toggle */}
      <div
        role="group"
        aria-label="Chart view mode"
        className="flex gap-1"
        id={`${toggleGroupId}-view`}
      >
        {(['revenue', 'growth-rate'] as ViewMode[]).map((mode) => (
          <div
            key={mode}
            role="button"
            tabIndex={0}
            aria-pressed={viewMode === mode}
            style={toggleStyle(viewMode === mode)}
            onClick={() => setViewMode(mode)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setViewMode(mode); }}
          >
            {mode === 'revenue' ? 'Revenue' : 'Growth Rate'}
          </div>
        ))}
      </div>

      {/* Historical / Forecast toggle */}
      <div
        role="group"
        aria-label="Time period"
        className="flex gap-1"
        id={`${toggleGroupId}-time`}
      >
        {(['historical', 'forecast'] as TimeMode[]).map((mode) => (
          <div
            key={mode}
            role="button"
            tabIndex={0}
            aria-pressed={timeMode === mode}
            style={toggleStyle(timeMode === mode)}
            onClick={() => setTimeMode(mode)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setTimeMode(mode); }}
          >
            {mode === 'historical' ? 'Historical' : 'Forecast'}
          </div>
        ))}
      </div>

      {/* View Dataset */}
      <Button
        variant="secondary"
        size="sm"
        onClick={() => setDrawerOpen(true)}
        aria-label="View market size dataset"
      >
        View Dataset
      </Button>
    </div>
  );

  return (
    <SectionWrapper background="white" spacing="lg" id="market-size">
      <SectionHeading level={2} eyebrow="Market Sizing" align="left">
        Australia Cold Chain Market Size
      </SectionHeading>

      <div className="mt-8">
        <ChartCard
          id="chart-market-size"
          eyebrow="Market Sizing · 2017–2027"
          methodologyBadge="Bottom-up analysis"
          title="Australia Cold Chain Market — Historic & Forecast"
          insight="Australia cold chain expanded from AUD 4,231 Mn (2017) to AUD 6,547.8 Mn (2022), with AUD 10,705 Mn forecast for 2027 (10.03% CAGR)."
          controls={controls}
          dataset={{
            publicRows: 3,
            leadRows: 6,
            fullRowCount: 6,
            onView: () => setDrawerOpen(true),
          }}
          source={{ label: 'Ken Research analysis', lastUpdated: 'May 2026' }}
          access="public"
          primaryCTA={{
            label: 'Download Sample Report',
            onClick: () =>
              openForm('sample', {
                reportSlug,
                ctaLocation: 'market-size-chart',
                sectionName: 'market-size',
              }),
            variant: 'brand',
          }}
        >
          <StaticBarLineChart viewMode={viewMode} timeMode={timeMode} />
        </ChartCard>
      </div>

      {/* DatasetPreviewDrawer */}
      <DatasetPreviewDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Australia Cold Chain Market Size Dataset"
        columns={DATASET_COLUMNS}
        rows={DATASET_ROWS}
        publicRows={3}
        leadRows={6}
        accessTier="public"
        onUnlock={() => {
          setDrawerOpen(false);
          openForm('sample', {
            reportSlug,
            ctaLocation: 'dataset-drawer',
            sectionName: 'market-size',
          });
        }}
      />
    </SectionWrapper>
  );
}
