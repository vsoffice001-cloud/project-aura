'use client';

/**
 * charts-showcase · Main showcase page
 *
 * WHY  · Single-page live preview of every chart + table exported from
 *        @kenresearch/design-system/charts. No real PDP content — pure demo canvas.
 *        Educational mock data only.
 *
 * WHAT · 3 sections: Primitives · Charts (7 wrappers) · Tables (2 components).
 *        Each demo wrapped in a card with title + prop control toggles where useful.
 *        One cinematic-dark section to verify dark-surface rendering.
 *
 * HOW  · All Highcharts wrappers loaded via dynamic import (SSR disabled — Highcharts
 *        is browser-only). ChartReveal scroll-entrance via Framer Motion useInView.
 *        Density toggle for tables uses React useState.
 *
 * NOTE · Mock data imported from src/lib/mock-data.ts. No API calls.
 */

import dynamic from 'next/dynamic';
import { useState } from 'react';
import {
  ChartFigure,
  ChartReveal,
  TableShell,
  RankingTable,
  PropertyTable,
  KEN_CHART_SERIES_ARRAY,
  type TableDensity,
} from '@kenresearch/design-system/charts';

import {
  COLUMN_LABELS,
  COLUMN_DATA_MID,
  COLUMN_DATA_LOW,
  COLUMN_DATA_HIGH,
  COLUMN_LABELS_DECADE,
  COLUMN_DATA_DECADE,
  COLUMN_PROJECTION_START,
  BAR_LABELS,
  BAR_DATA,
  BAR_UNIT,
  DUAL_LABELS,
  DUAL_SERIES_A,
  DUAL_SERIES_B,
  BUBBLE_DATA,
  DONUT_DATA,
  LINE_LABELS,
  LINE_SERIES,
  SCENARIO_LABELS,
  SCENARIO_BASE,
  SCENARIO_BEAR,
  SCENARIO_BULL,
  PROPERTY_PROPS,
  PROPERTY_PLAYERS,
  RANKING_COLUMNS,
  RANKING_ROWS,
} from '@/lib/mock-data';

// ─── Dynamic imports (Highcharts browser-only) ────────────────────

const KenColumnChart = dynamic(
  () => import('@kenresearch/design-system/charts').then((m) => m.KenColumnChart),
  { ssr: false, loading: () => <ChartSkeleton height={300} /> },
);
const KenBarChart = dynamic(
  () => import('@kenresearch/design-system/charts').then((m) => m.KenBarChart),
  { ssr: false, loading: () => <ChartSkeleton height={280} /> },
);
const KenDualColumnChart = dynamic(
  () => import('@kenresearch/design-system/charts').then((m) => m.KenDualColumnChart),
  { ssr: false, loading: () => <ChartSkeleton height={300} /> },
);
const KenBubbleChart = dynamic(
  () => import('@kenresearch/design-system/charts').then((m) => m.KenBubbleChart),
  { ssr: false, loading: () => <ChartSkeleton height={320} /> },
);
const KenDonutChart = dynamic(
  () => import('@kenresearch/design-system/charts').then((m) => m.KenDonutChart),
  { ssr: false, loading: () => <ChartSkeleton height={260} /> },
);
const KenMultiLineChart = dynamic(
  () => import('@kenresearch/design-system/charts').then((m) => m.KenMultiLineChart),
  { ssr: false, loading: () => <ChartSkeleton height={300} /> },
);
const KenScenarioFanChart = dynamic(
  () => import('@kenresearch/design-system/charts').then((m) => m.KenScenarioFanChart),
  { ssr: false, loading: () => <ChartSkeleton height={300} /> },
);

// ─── Helpers ─────────────────────────────────────────────────────

function ChartSkeleton({ height }: { height: number }) {
  return (
    <div
      style={{ height, background: 'rgba(0,0,0,0.04)', borderRadius: 4 }}
      aria-hidden="true"
    />
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-display font-light"
      style={{
        fontSize: 'clamp(22px, 2.5vw, 28px)',
        color: 'var(--semantic-ink-strong)',
        marginBottom: '8px',
        letterSpacing: '-0.015em',
      }}
    >
      {children}
    </h2>
  );
}

function DemoCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <article
      style={{
        background: '#ffffff',
        border: '1px solid #e5e5e5',
        borderRadius: '8px',
        padding: '24px',
        marginBottom: '24px',
      }}
    >
      <h3
        className="font-body font-medium"
        style={{ fontSize: '14px', color: 'var(--semantic-ink-strong)', marginBottom: '4px' }}
      >
        {title}
      </h3>
      {subtitle && (
        <p
          className="font-body"
          style={{ fontSize: '12px', color: 'var(--semantic-ink-muted)', marginBottom: '16px' }}
        >
          {subtitle}
        </p>
      )}
      {children}
    </article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────

export default function ShowcasePage() {
  const [colVariant, setColVariant] = useState<'mid' | 'low' | 'high'>('mid');
  const [tableDensity, setTableDensity] = useState<TableDensity>('standard');
  const [rankingDensity, setRankingDensity] = useState<TableDensity>('standard');

  const colData = colVariant === 'low' ? COLUMN_DATA_LOW : colVariant === 'high' ? COLUMN_DATA_HIGH : COLUMN_DATA_MID;
  const colUnit = colVariant === 'low' ? 'Units (low)' : colVariant === 'high' ? 'AUD Mn (high)' : 'AUD Mn';

  const densityOptions: TableDensity[] = ['compact', 'standard', 'comfortable', 'spacious'];

  return (
    <main
      style={{
        background: 'var(--semantic-bg-page, #f5f2f1)',
        minHeight: '100vh',
        padding: '40px 0 80px',
      }}
    >
      {/* Page header */}
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 24px',
          marginBottom: '48px',
        }}
      >
        <p
          className="font-body uppercase"
          style={{
            fontSize: '10px',
            letterSpacing: '0.12em',
            color: 'var(--semantic-ink-subtle)',
            fontWeight: 600,
            marginBottom: '8px',
          }}
        >
          @kenresearch/design-system/charts · Sprint A.3 · 2026-05-22
        </p>
        <h1
          className="font-display font-light"
          style={{
            fontSize: 'clamp(32px, 4vw, 48px)',
            color: 'var(--semantic-ink-strong)',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            marginBottom: '12px',
          }}
        >
          Ken Research · Chart Library Showcase
        </h1>
        <p
          className="font-body"
          style={{
            fontSize: '16px',
            color: 'var(--semantic-ink-body)',
            maxWidth: '56ch',
            lineHeight: 1.65,
          }}
        >
          Live preview of all 9 charts/tables + 3 primitives exported from the design system.
          All data is mock/educational only.
        </p>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>

        {/* ─── Section 1 · Primitives ─────────────────────────────── */}
        <section aria-labelledby="s-primitives" style={{ marginBottom: '64px' }}>
          <SectionTitle>
            <span id="s-primitives">1 · Primitives</span>
          </SectionTitle>
          <p
            className="font-body"
            style={{ fontSize: '13px', color: 'var(--semantic-ink-muted)', marginBottom: '24px' }}
          >
            ChartFigure · ChartReveal · TableShell — composition wrappers consumed by all chart + table components.
          </p>

          <DemoCard
            title="ChartFigure"
            subtitle="Outer wrapper: eyebrow · title · insight · unit · legend · figcaption. Used by every chart."
          >
            <ChartFigure
              eyebrow="Demo · ChartFigure standalone"
              title="Revenue · AUD Mn · 2017–2027F"
              insight="Structural demand acceleration continues through forecast horizon. Cold Storage CAGR outpaces Cold Transport from 2023."
              unit="AUD Mn"
              legend={[
                { kind: 'solid', color: KEN_CHART_SERIES_ARRAY[0], label: 'Primary series' },
                { kind: 'dashed', color: KEN_CHART_SERIES_ARRAY[0], label: 'Forecast / projected' },
                { kind: 'dot', color: KEN_CHART_SERIES_ARRAY[1], label: 'Secondary series' },
              ]}
              figcaption="Anchored 2017–2022 per PRD V2.1 §6.3. Forward 2023–2027F compounded at CAGR per Ken Forecast Model."
            >
              <div
                style={{
                  height: 160,
                  background: 'rgba(148,136,236,0.08)',
                  borderRadius: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                aria-hidden="true"
              >
                <span className="font-body" style={{ fontSize: '12px', color: 'var(--semantic-ink-subtle)' }}>
                  Chart slot · inner content renders here
                </span>
              </div>
            </ChartFigure>
          </DemoCard>

          <DemoCard
            title="ChartReveal"
            subtitle="Framer Motion scroll-entrance wrapper. Wraps any chart; fades in when in view."
          >
            <ChartReveal>
              <div
                style={{
                  height: 100,
                  background: 'rgba(148,136,236,0.08)',
                  borderRadius: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                aria-hidden="true"
              >
                <span className="font-body" style={{ fontSize: '12px', color: 'var(--semantic-ink-subtle)' }}>
                  Inner content — fades in on scroll entrance
                </span>
              </div>
            </ChartReveal>
          </DemoCard>

          <DemoCard
            title="TableShell"
            subtitle="Table outer wrapper: sticky header · row dividers · density context. Used by PropertyTable + RankingTable."
          >
            {/* TableShell demo — card variant (default) */}
            <TableShell
              ariaLabel="TableShell card variant demo"
              variant="card"
              headerStyle="wash"
              stickyHeader={false}
              density="standard"
              caption="TableShell card variant demonstration table"
            >
              {/* Children: thead + tbody ONLY — no outer <table> wrapper */}
              <thead>
                <tr>
                  {['Column A', 'Column B', 'Column C'].map((h) => (
                    <th
                      key={h}
                      scope="col"
                      className="font-body"
                      style={{ textAlign: 'left', padding: '10px 12px', fontSize: '11px', fontWeight: 600 }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3].map((r) => (
                  <tr key={r}>
                    {['Alpha', 'Beta', 'Gamma'].map((c) => (
                      <td
                        key={c}
                        className="font-body"
                        style={{ padding: '10px 12px', fontSize: '13px', color: 'var(--semantic-ink-body)' }}
                      >
                        {c} {r}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </TableShell>

            {/* TableShell demo — open variant */}
            <TableShell
              ariaLabel="TableShell open variant demo"
              variant="open"
              headerStyle="transparent"
              density="compact"
              caption="TableShell open variant demonstration table"
            >
              <thead>
                <tr>
                  {['Metric', 'Value', 'Change'].map((h) => (
                    <th
                      key={h}
                      scope="col"
                      className="font-body"
                      style={{ textAlign: 'left', padding: '8px 12px', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[['Revenue', 'AUD 12.4Mn', '+9.1%'], ['Volume', '8,240 units', '+7.3%'], ['Margin', '34.2%', '+2.1pp']].map(([m, v, c]) => (
                  <tr key={m}>
                    <td className="font-body" style={{ padding: '8px 12px', fontSize: '12px', fontWeight: 500, color: 'var(--semantic-ink-strong)' }}>{m}</td>
                    <td className="font-body" style={{ padding: '8px 12px', fontSize: '12px', color: 'var(--semantic-ink-body)' }}>{v}</td>
                    <td className="font-body" style={{ padding: '8px 12px', fontSize: '12px', color: 'var(--semantic-ink-muted)' }}>{c}</td>
                  </tr>
                ))}
              </tbody>
            </TableShell>
          </DemoCard>
        </section>

        {/* ─── Section 2 · Charts ──────────────────────────────────── */}
        <section aria-labelledby="s-charts" style={{ marginBottom: '64px' }}>
          <SectionTitle>
            <span id="s-charts">2 · Charts</span>
          </SectionTitle>
          <p
            className="font-body"
            style={{ fontSize: '13px', color: 'var(--semantic-ink-muted)', marginBottom: '24px' }}
          >
            7 Highcharts wrappers. All wrapped in ChartReveal (scroll-entrance) and ChartFigure (outer chrome).
          </p>

          {/* KenColumnChart */}
          <DemoCard
            title="KenColumnChart"
            subtitle="Vertical bar chart · projection start index · 3 data variants (low / mid / high)"
          >
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
              {(['low', 'mid', 'high'] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setColVariant(v)}
                  className="font-body"
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    padding: '4px 10px',
                    borderRadius: '4px',
                    border: '1px solid',
                    borderColor: colVariant === v ? '#9488ec' : '#e5e5e5',
                    background: colVariant === v ? '#9488ec' : 'transparent',
                    color: colVariant === v ? '#fff' : 'var(--semantic-ink-body)',
                    cursor: 'pointer',
                  }}
                >
                  {v}
                </button>
              ))}
            </div>
            <ChartReveal>
              <ChartFigure
                eyebrow="Monthly revenue · 12 months"
                title={`Revenue by month · ${colUnit}`}
                insight="Revenue accelerates in H2 across all variants. High variant demonstrates 2× multiplier effect of premium tier."
                unit={colUnit}
                legend={[{ kind: 'solid', color: KEN_CHART_SERIES_ARRAY[0], label: 'Monthly revenue' }]}
                figcaption="Mock data · educational only."
              >
                <KenColumnChart
                  labels={COLUMN_LABELS}
                  data={colData}
                  height={280}
                  unit={colUnit}
                  ariaLabel="Monthly revenue column chart demo"
                />
              </ChartFigure>
            </ChartReveal>
            <div style={{ marginTop: '24px', borderTop: '1px solid #e5e5e5', paddingTop: '20px' }}>
              <p className="font-body" style={{ fontSize: '11px', color: 'var(--semantic-ink-subtle)', marginBottom: '8px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Decade view with projectionStartIndex
              </p>
              <ChartReveal>
                <ChartFigure
                  eyebrow="Decade trajectory · 2017–2027F"
                  title="Revenue · AUD Mn · projected bars lighter"
                  unit="AUD Mn"
                  legend={[
                    { kind: 'solid', color: KEN_CHART_SERIES_ARRAY[0], label: 'Historical actual' },
                    { kind: 'dashed', color: KEN_CHART_SERIES_ARRAY[0], label: 'Forecast 2023–2027F' },
                  ]}
                  figcaption="Projection bars rendered at 60% alpha from index 6 onward."
                >
                  <KenColumnChart
                    labels={COLUMN_LABELS_DECADE}
                    data={COLUMN_DATA_DECADE}
                    height={260}
                    unit="AUD Mn"
                    projectionStartIndex={COLUMN_PROJECTION_START}
                    ariaLabel="Decade revenue column chart with projection"
                  />
                </ChartFigure>
              </ChartReveal>
            </div>
          </DemoCard>

          {/* KenBarChart */}
          <DemoCard
            title="KenBarChart"
            subtitle="Horizontal bar chart · 6 regions · percentage unit"
          >
            <ChartReveal>
              <ChartFigure
                eyebrow="Regional revenue share"
                title="Revenue share by metro · %"
                unit="%"
                legend={[{ kind: 'solid', color: KEN_CHART_SERIES_ARRAY[0], label: 'Revenue share %' }]}
                figcaption="Mock data · illustrative regional split."
              >
                <KenBarChart
                  labels={BAR_LABELS}
                  data={BAR_DATA}
                  height={280}
                  unit={BAR_UNIT}
                  ariaLabel="Revenue share by region horizontal bar chart"
                />
              </ChartFigure>
            </ChartReveal>
          </DemoCard>

          {/* KenDualColumnChart */}
          <DemoCard
            title="KenDualColumnChart"
            subtitle="Grouped 2-series bar · Cold Storage vs Cold Transport · diverging CAGR"
          >
            <ChartReveal>
              <ChartFigure
                eyebrow="Submarket comparison · 2019–2025F"
                title="Cold Storage vs Cold Transport · AUD Mn"
                unit="AUD Mn"
                legend={[
                  { kind: 'solid', color: KEN_CHART_SERIES_ARRAY[0], label: 'Cold Storage' },
                  { kind: 'solid', color: KEN_CHART_SERIES_ARRAY[1], label: 'Cold Transport' },
                ]}
                figcaption="Mock PRD V2.1 §6.3 anchors · CAGR-compounded forward."
              >
                <KenDualColumnChart
                  labels={DUAL_LABELS}
                  series1={DUAL_SERIES_A}
                  series2={DUAL_SERIES_B}
                  height={300}
                  unit="AUD Mn"
                  ariaLabel="Cold Storage vs Cold Transport grouped column chart"
                />
              </ChartFigure>
            </ChartReveal>
          </DemoCard>

          {/* KenBubbleChart · cinematic dark surface */}
          <section
            data-variant-section="cinematic"
            style={{ borderRadius: '12px', padding: '24px', marginBottom: '24px' }}
            aria-labelledby="bubble-dark-demo"
          >
            <h3
              id="bubble-dark-demo"
              className="font-body"
              style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '4px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}
            >
              KenBubbleChart · Cinematic dark surface demo
            </h3>
            <p
              className="font-body"
              style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginBottom: '16px' }}
            >
              Verify: bubble labels render ABOVE bubbles (no ghost duplicate). 8 entities.
            </p>
            <ChartReveal>
              <ChartFigure
                eyebrow="Competitor positioning · revenue × growth × capacity"
                title="Market participants · x = revenue · y = growth % · z = fleet capacity"
                unit="AUD Mn"
                legend={[
                  { kind: 'dot', color: KEN_CHART_SERIES_ARRAY[0], label: 'Tier-1 operators' },
                  { kind: 'dot', color: KEN_CHART_SERIES_ARRAY[2], label: 'Mid-tier' },
                  { kind: 'dot', color: KEN_CHART_SERIES_ARRAY[4], label: 'Emerging / niche' },
                ]}
                figcaption="Mock data · 8 illustrative market participants."
              >
                <KenBubbleChart
                  data={BUBBLE_DATA}
                  height={320}
                  xAxisTitle="Revenue (AUD Mn)"
                  yAxisTitle="YoY growth %"
                  ariaLabel="Competitor positioning bubble chart"
                />
              </ChartFigure>
            </ChartReveal>
          </section>

          {/* KenDonutChart */}
          <DemoCard
            title="KenDonutChart"
            subtitle="5-slice donut · end-user sector breakdown"
          >
            <ChartReveal>
              <ChartFigure
                eyebrow="End-user composition · 2024"
                title="Revenue share by end-user sector"
                unit="%"
                legend={DONUT_DATA.map((d, i) => ({
                  kind: 'dot' as const,
                  color: KEN_CHART_SERIES_ARRAY[i % KEN_CHART_SERIES_ARRAY.length],
                  label: d.name,
                }))}
                figcaption="Mock data · PRD V2.1 §6.4 cross-ref."
              >
                <KenDonutChart
                  data={DONUT_DATA}
                  height={260}
                  ariaLabel="End-user sector donut chart"
                />
              </ChartFigure>
            </ChartReveal>
          </DemoCard>

          {/* KenMultiLineChart */}
          <DemoCard
            title="KenMultiLineChart"
            subtitle="6 series · 12 data points each · macro overlay"
          >
            <ChartReveal>
              <ChartFigure
                eyebrow="Macro overlay · 2018–2029F"
                title="6 macro indicators · % YoY"
                unit="% YoY"
                legend={LINE_SERIES.map((s, i) => ({
                  kind: 'line' as const,
                  color: KEN_CHART_SERIES_ARRAY[i % KEN_CHART_SERIES_ARRAY.length],
                  label: s.name,
                }))}
                figcaption="Mock data · 2025–2029F projected."
              >
                <KenMultiLineChart
                  labels={LINE_LABELS}
                  series={LINE_SERIES}
                  height={300}
                  unit="% YoY"
                  ariaLabel="Macro multi-line overlay chart"
                />
              </ChartFigure>
            </ChartReveal>
          </DemoCard>

          {/* KenScenarioFanChart */}
          <DemoCard
            title="KenScenarioFanChart"
            subtitle="3-scenario area-spline · verify spline visible (not white-on-white)"
          >
            <ChartReveal>
              <ChartFigure
                eyebrow="Scenario fan · 2022–2027F"
                title="Market size under Bear / Base / Bull scenarios · AUD Mn"
                unit="AUD Mn"
                legend={[
                  { kind: 'line',   color: KEN_CHART_SERIES_ARRAY[0], label: 'Base · 10.3% CAGR' },
                  { kind: 'dashed', color: KEN_CHART_SERIES_ARRAY[3], label: 'Bull · 13.8% CAGR' },
                  { kind: 'dashed', color: KEN_CHART_SERIES_ARRAY[2], label: 'Bear · 7.1% CAGR' },
                ]}
                figcaption="Ken Forecast Model 2025 · Oxford Economics · mock anchored at 2022 actual."
              >
                <KenScenarioFanChart
                  labels={SCENARIO_LABELS}
                  baseData={SCENARIO_BASE}
                  bearData={SCENARIO_BEAR}
                  bullData={SCENARIO_BULL}
                  height={300}
                  unit="AUD Mn"
                  ariaLabel="3-scenario fan chart 2022 to 2027F"
                />
              </ChartFigure>
            </ChartReveal>
          </DemoCard>
        </section>

        {/* ─── Section 3 · Tables ──────────────────────────────────── */}
        <section aria-labelledby="s-tables" style={{ marginBottom: '64px' }}>
          <SectionTitle>
            <span id="s-tables">3 · Tables</span>
          </SectionTitle>
          <p
            className="font-body"
            style={{ fontSize: '13px', color: 'var(--semantic-ink-muted)', marginBottom: '24px' }}
          >
            PropertyTable · RankingTable — both with density toggle demo.
          </p>

          {/* PropertyTable · density toggle */}
          <DemoCard
            title="PropertyTable"
            subtitle="Competitor comparison matrix · 8 properties × 5 players (3 visible · 2 gated). Density toggle below."
          >
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', alignItems: 'center' }}>
              <span className="font-body" style={{ fontSize: '11px', color: 'var(--semantic-ink-subtle)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Density:
              </span>
              {densityOptions.map((d) => (
                <button
                  key={d}
                  onClick={() => setTableDensity(d)}
                  className="font-body"
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    padding: '4px 10px',
                    borderRadius: '4px',
                    border: '1px solid',
                    borderColor: tableDensity === d ? '#9488ec' : '#e5e5e5',
                    background: tableDensity === d ? '#9488ec' : 'transparent',
                    color: tableDensity === d ? '#fff' : 'var(--semantic-ink-body)',
                    cursor: 'pointer',
                  }}
                >
                  {d}
                </button>
              ))}
            </div>
            <p
              className="font-body italic"
              style={{ fontSize: '12px', color: 'var(--semantic-ink-muted)', marginBottom: '12px' }}
            >
              Verify: 48px comfortable rows · periwinkle header wash · last 2 columns gated.
            </p>
            <PropertyTable
              properties={PROPERTY_PROPS}
              players={PROPERTY_PLAYERS}
              gatedFrom={3}
              density={tableDensity}
              stickyHeader={false}
            />
          </DemoCard>

          {/* RankingTable · density toggle */}
          <DemoCard
            title="RankingTable"
            subtitle="7 rows · ranked opportunities · top 3 highlighted · density toggle."
          >
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', alignItems: 'center' }}>
              <span className="font-body" style={{ fontSize: '11px', color: 'var(--semantic-ink-subtle)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Density:
              </span>
              {densityOptions.map((d) => (
                <button
                  key={d}
                  onClick={() => setRankingDensity(d)}
                  className="font-body"
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    padding: '4px 10px',
                    borderRadius: '4px',
                    border: '1px solid',
                    borderColor: rankingDensity === d ? '#9488ec' : '#e5e5e5',
                    background: rankingDensity === d ? '#9488ec' : 'transparent',
                    color: rankingDensity === d ? '#fff' : 'var(--semantic-ink-body)',
                    cursor: 'pointer',
                  }}
                >
                  {d}
                </button>
              ))}
            </div>
            <p
              className="font-body italic"
              style={{ fontSize: '12px', color: 'var(--semantic-ink-muted)', marginBottom: '12px' }}
            >
              Verify: single table (not split) · sticky header · top-3 rank highlighted.
            </p>
            <RankingTable
              rows={RANKING_ROWS}
              columns={RANKING_COLUMNS}
              topHighlightCount={3}
              density={rankingDensity}
              stickyHeader={true}
              ariaLabel="7-opportunity ranking table demo"
              footnote="Weighted Score = 0.5 × Impact + 0.3 × Feasibility + 0.2 × (1 – Time-penalty) · Ken Research analysis 2024"
            />
          </DemoCard>
        </section>

        {/* Footer */}
        <footer style={{ borderTop: '1px solid #e5e5e5', paddingTop: '24px' }}>
          <p
            className="font-body"
            style={{ fontSize: '12px', color: 'var(--semantic-ink-subtle)' }}
          >
            @kenresearch/design-system · charts barrel · Sprint A.3 · 2026-05-22 · aura-builder Sonnet 4.6
          </p>
        </footer>
      </div>
    </main>
  );
}
