'use client';

/**
 * MacroeconomicSection — v0.4 §18 Macroeconomic Indicators
 *
 * @what  5 macro indicator cards + multi-series line chart + SourceCluster + InsightBox:
 *        - Inline narrative lede w/ GDP correlation + lead-lag claim
 *        - MetricStrip: 4 stats (GDP · CPI · disposable income growth · trade balance)
 *        - 5 IndicatorCards: GDP · CPI · Disposable Income · Trade Balance · FX AUD/USD
 *        - KenMultiLineChart: GDP growth · Cold-chain demand · CPI overlay 2018–2027
 *        - SourceCluster (RBA · ABS · World Bank · Ken Research)
 *        - InsightBox: disposable income inflection Q1-2026 = cold-chain demand lead
 *
 * @why   Macro indicators are the "why" behind the market trajectory — B2B buyers
 *        need to understand demand drivers before trusting a 5-yr forecast.
 *        Oxford Economics / CB Insights / Ken Research all lead macro sections
 *        with correlated overlay charts. Lead-lag claim (disposable income 2Q ahead)
 *        is the proprietary insight that distinguishes Ken from commodity data.
 *
 * @when  v0.4 PDP body §18 · below §17 Opportunities · above §19 Methodology.
 *
 * Source: RBA · ABS · World Bank · Oxford Economics · Ken Research Analysis.
 *
 * @relatedDoc projects/v1-product-page-ver0.4/docs/CHARTS-TABLES-PATTERNS.md §3.6
 */

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@kenresearch/design-system/ui/tabs';
import { TABS_LIST_PRIMARY, TABS_TRIGGER_PRIMARY } from '@/lib/tab-styles';
import { SectionLabel } from '@kenresearch/design-system/atoms';
import { InsightBox } from '@/components/atoms/InsightBox';
import { SourceCluster } from '@/components/atoms/SourceCluster';
import { IndicatorCard } from '@/components/atoms/IndicatorCard';
import { KenMultiLineChart, ChartFigure, KEN_CHART_SERIES_ARRAY } from '@kenresearch/design-system/charts';
import { getSources } from '@/lib/sources';

// ─────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────

// S3-2026-05-22: Removed METRICS array (duplicated Snapshot tab IndicatorCards · redundant).
// All 5 indicators now live in Snapshot tab as IndicatorCards only.

// 5 macro indicator cards
const INDICATOR_CARDS = [
  {
    name: 'GDP Growth',
    value: '2.8%',
    trend: 'up' as const,
    yoyChange: '+0.4pp',
    descriptor: '2024 actual · steady expansion',
    year: '2024A',
  },
  {
    name: 'CPI Inflation',
    value: '3.4%',
    trend: 'down' as const,
    yoyChange: '−1.1pp',
    descriptor: 'Easing · RBA target band by Q2-2025',
    year: '2024A',
  },
  {
    name: 'Disposable Income',
    value: '+2.1%',
    trend: 'up' as const,
    yoyChange: '+0.8pp',
    descriptor: 'Real growth · consumer spend recovery',
    year: '2024A',
  },
  {
    name: 'Trade Balance',
    value: 'AUD +14 Bn',
    trend: 'neutral' as const,
    yoyChange: '−AUD 2 Bn',
    descriptor: 'Goods surplus · stable ag exports',
    year: 'FY24',
  },
  {
    name: 'FX AUD/USD',
    value: '0.66',
    trend: 'down' as const,
    yoyChange: '−0.03',
    descriptor: 'Weaker AUD → export competitiveness',
    year: '2024 avg',
  },
];

// Multi-line chart data · 2018–2027 (10 points · projectionStartIndex=7 for 2025F+)
const CHART_LABELS = [
  '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025F', '2026F', '2027F'
];

// GDP growth % · actual + projection
// 2018-2024 actual · 2025-2027 Oxford Economics projection
const GDP_DATA = [2.8, 1.9, -3.7, 4.8, 3.7, 2.0, 2.8, 2.6, 2.9, 3.1];

// Cold-chain demand growth % · compounded from market size series
// 2018-2022 observed (9.1% CAGR basis) · 2023-2027 Ken forecast (10.3%)
const COLDCHAIN_DATA = [9.1, 9.1, 9.1, 9.1, 9.1, 10.3, 10.3, 10.3, 10.3, 10.3];

// CPI % · actual + projection
const CPI_DATA = [1.9, 1.6, 0.9, 3.5, 7.8, 5.4, 3.4, 2.8, 2.5, 2.4];

const CHART_SERIES = [
  {
    name: 'GDP growth',
    data: GDP_DATA,
    color: KEN_CHART_SERIES_ARRAY[0], // purple
  },
  {
    name: 'Cold-chain demand growth',
    data: COLDCHAIN_DATA,
    color: KEN_CHART_SERIES_ARRAY[3], // periwinkle-800
  },
  {
    name: 'CPI inflation',
    data: CPI_DATA,
    color: KEN_CHART_SERIES_ARRAY[2], // perano-800
  },
];

// ─────────────────────────────────────────────────────────────────
// Section
// ─────────────────────────────────────────────────────────────────

export function MacroeconomicSection() {
  return (
    <section
      id="macro"
      aria-labelledby="macro-heading"
      className="px-4 sm:px-6 lg:px-12 max-w-[1100px] mx-auto w-full scroll-mt-[120px]"
    >
      {/* Header */}
      <div className="inline-flex mb-3">
        <SectionLabel background="light" variant="accent">
          Section 18 · Macroeconomic Indicators
        </SectionLabel>
      </div>

      <h2
        id="macro-heading"
        className="font-display font-light text-[clamp(28px,3vw,39px)] leading-[1.15] tracking-[-0.015em] text-[var(--semantic-ink-strong)] mb-3"
      >
        Five macro signals — one demand acceleration story
      </h2>

      {/* Lede */}
      <p
        className="font-body text-[var(--semantic-ink-body)] max-w-[64ch] mb-2"
        style={{ fontSize: '17px', lineHeight: 1.65 }}
      >
        <strong className="font-medium text-[var(--semantic-ink-strong)]">5 macro indicators</strong>
        {' '}drive cold-chain demand —{' '}
        <strong className="font-medium text-[var(--color-brand-red,#b01f24)]">GDP correlation 0.78</strong>
        {' '}at 12-month lag · consumer spending leads cold-chain demand growth by{' '}
        <strong className="font-medium text-[var(--semantic-ink-strong)]">2 quarters</strong>.
        The easing CPI cycle + rising disposable income points to demand acceleration
        into 2026 before operators can add equivalent supply.
      </p>
      <p
        className="font-body italic text-[var(--semantic-ink-muted)] max-w-[60ch] mb-10"
        style={{ fontSize: '14px', lineHeight: 1.55 }}
      >
        Historical 2018–2024 · projection 2025–2027 per Oxford Economics + Ken Forecast Model.
      </p>

      {/* S3-2026-05-22: MetricStrip removed · was duplicating Snapshot IndicatorCards ·
          all 5 indicators now in Snapshot tab only */}

      {/* Sprint 4 · 2-tab layout · Snapshot + Trends · pill style */}
      <Tabs defaultValue="snapshot" className="mb-4">
        <TabsList className={TABS_LIST_PRIMARY}>
          <TabsTrigger value="snapshot" className={TABS_TRIGGER_PRIMARY}>
            Snapshot 2024
          </TabsTrigger>
          <TabsTrigger value="trends" className={TABS_TRIGGER_PRIMARY}>
            Trends 2018–2027
          </TabsTrigger>
        </TabsList>

        {/* Tab 1 · Snapshot 2024 · 5 IndicatorCards (single row) */}
        <TabsContent value="snapshot">
          <p
            className="font-body uppercase tracking-[0.12em] text-[var(--semantic-ink-subtle)] mb-4"
            style={{ fontSize: '10px', fontWeight: 600 }}
          >
            Current macro snapshot · key indicators · 2024
          </p>
          <div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
            role="list"
            aria-label="Macroeconomic indicators · 5 key metrics"
          >
            {INDICATOR_CARDS.map((card) => (
              <div key={card.name} role="listitem" className="min-w-0">
                <IndicatorCard
                  name={card.name}
                  value={card.value}
                  trend={card.trend}
                  yoyChange={card.yoyChange}
                  descriptor={card.descriptor}
                  year={card.year}
                />
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Tab 2 · Trends 2018–2027 · multi-line chart */}
        <TabsContent value="trends">
          <ChartFigure
            eyebrow="Macro correlation · 2018–2027 overlay"
            title="GDP growth · cold-chain demand growth · CPI inflation (2018–2027)"
            insight="Cold-chain demand growth (10.3% CAGR) runs 7pp above GDP growth — confirming structural above-GDP expansion. CPI easing 2023–2027 supports consumer demand recovery ahead of cold-chain capacity expansion."
            unit="%"
            legend={[
              { kind: 'line',   color: KEN_CHART_SERIES_ARRAY[0], label: 'GDP growth %' },
              { kind: 'line',   color: KEN_CHART_SERIES_ARRAY[3], label: 'Cold-chain demand growth %' },
              { kind: 'dashed', color: KEN_CHART_SERIES_ARRAY[2], label: 'CPI inflation %' },
            ]}
            figcaption="2018–2024 actual per ABS + RBA. 2025–2027F per Oxford Economics macro projection + Ken Forecast Model. Cold-chain demand growth derived from annual market size CAGR calculation."
          >
            <KenMultiLineChart
              labels={CHART_LABELS}
              series={CHART_SERIES}
              height={320}
              unit="%"
              projectionStartIndex={7}
              ariaLabel="GDP growth · cold-chain demand growth · CPI overlay · 2018 to 2027"
            />
          </ChartFigure>
        </TabsContent>
      </Tabs>

      {/* SourceCluster · OUTSIDE tabs */}
      <SourceCluster
        citations={getSources([
          'ken-forecast-coldchain-2025',
          'industry-macro-forecast-2025',
          'ken-primary-coldchain-2024',
          'abs-warehousing-2023',
        ])}
        methodologyHref="#methodology"
        className="mb-12"
      />

      {/* InsightBox closer */}
      <InsightBox
        eyebrow="Watch · leading indicator"
        lead="Disposable income inflection Q1-2026 = 6mo lead on cold-chain demand acceleration."
        body={
          <>
            Ken Research macro model identifies{' '}
            <strong className="font-medium text-[var(--semantic-ink-strong)]">
              real disposable income growth
            </strong>{' '}
            as the strongest 2-quarter leading indicator for cold-chain volume demand (r² = 0.74 ·
            ABS household income + Ken demand model). Current trajectory: disposable income growth
            reaches{' '}
            <strong className="font-medium text-[var(--semantic-ink-strong)]">+2.8% in Q1-2026</strong>,
            implying a cold-chain demand inflection{' '}
            <strong className="font-medium text-[var(--semantic-ink-strong)]">Q3-2026</strong>.
            Operators who add capacity in 2025 will capture the demand surge; late movers face
            a 12–18 month supply-side lag.
          </>
        }
      />
    </section>
  );
}
