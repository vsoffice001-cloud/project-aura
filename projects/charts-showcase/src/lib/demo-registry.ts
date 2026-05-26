/**
 * charts-showcase · Demo Registry
 *
 * WHY  · Single source of truth for all chart/table/primitive demos.
 *        Registry-driven pattern replaces 720-LOC inline JSX dump (Sprint B.2 rebuild).
 *        Components, props, code snippets, variants — all here.
 *
 * WHAT · DEMOS array of Demo objects. Each demo drives DemoCanvas + RightPanel.
 *        No JSX in this file — pure data (component refs + serializable config).
 *
 * HOW  · Import DEMOS in page.tsx. Filter, map over DemoCanvas.
 *        DemoCanvas reads Component + defaultProps + variants → renders live preview.
 *
 * @module charts-showcase/lib/demo-registry
 */

import type { ComponentType } from 'react';
import {
  ChartFigure,
  ChartReveal,
  TableShell,
  KenColumnChart,
  KenBarChart,
  KenDualColumnChart,
  KenBubbleChart,
  KenDonutChart,
  KenMultiLineChart,
  KenScenarioFanChart,
  KenTreemap,
  KenHeatmap,
  KenKeywordScatter,
  KenGanttTimeline,
  PropertyTable,
  RankingTable,
  ChartSkeleton,
  TableSkeleton,
  ChartEmptyState,
  ErrorState,
  KEN_CHART_SERIES_ARRAY,
} from '@kenresearch/design-system/charts';
import { AsyncFetchDemo } from '@/components/AsyncFetchDemo';

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
  TREEMAP_DATA,
  HEATMAP_ROWS,
  HEATMAP_COLS,
  HEATMAP_CELLS,
  KEYWORD_DATA,
  GANTT_PERIODS,
  GANTT_ENTRIES,
  PROPERTY_PROPS,
  PROPERTY_PLAYERS,
  RANKING_COLUMNS,
  RANKING_ROWS,
} from './mock-data';

// ─── Types ───────────────────────────────────────────────────────────────────

export type DemoCategory = 'primitive' | 'chart' | 'table' | 'state';
export type DemoSurface = 'light' | 'dark';

export interface DemoVariant {
  id: string;
  label: string;
  props: Record<string, unknown>;
}

export interface DemoProp {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
}

export interface DemoToken {
  /** CSS custom property name e.g. '--semantic-ink-strong' */
  name: string;
  /** Category for grouping: 'color' | 'typography' | 'spacing' | 'other' */
  category: 'color' | 'typography' | 'spacing' | 'other';
  /** Short usage note e.g. 'Title text color' */
  usage: string;
}

export interface Demo {
  id: string;
  category: DemoCategory;
  name: string;
  description: string;
  importPath: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: ComponentType<any>;
  defaultProps: Record<string, unknown>;
  variants?: DemoVariant[];
  surfaces?: DemoSurface[];
  importSnippet: string;
  exampleSnippet: string;
  propsTable: DemoProp[];
  a11y?: string;
  knownIssues?: string;
  stateDemos?: {
    loading?: boolean;
    empty?: boolean;
    error?: string;
  };
  /** Design tokens consumed by this component */
  tokensUsed?: DemoToken[];
  /** For primitive demos that don't map directly to a chart type */
  isPrimitive?: boolean;
  /** Skeleton type for state demo loading state */
  skeletonType?: 'bar' | 'line' | 'pie' | 'bubble' | 'generic';
}

// ─── Helper — Periwinkle series colors (short refs for snippets) ──────────────
const S0 = KEN_CHART_SERIES_ARRAY[0]; // periwinkle #9488ec
const S1 = KEN_CHART_SERIES_ARRAY[1]; // perano #a8b7f0
const _S2 = KEN_CHART_SERIES_ARRAY[2]; // purple #c084fc — reserved for future demos
const _S3 = KEN_CHART_SERIES_ARRAY[3]; // lavender #b8aff8 — reserved for future demos
const _S4 = KEN_CHART_SERIES_ARRAY[4]; // soft-purple #d8b4fe — reserved for future demos

// ─── DEMOS ────────────────────────────────────────────────────────────────────

export const DEMOS: Demo[] = [

  // ══════════════════════════════════════════════════════════════════════════
  // PRIMITIVES
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'primitive-chartfigure',
    category: 'primitive',
    name: 'ChartFigure',
    description: 'Outer chrome for every chart. Eyebrow · title · subtitle · unit · insight · legend · figcaption · source citation. All charts must be wrapped in this.',
    importPath: '@kenresearch/design-system/charts',
    isPrimitive: true,
    Component: ChartFigure,
    defaultProps: {
      eyebrow: 'MARKET TRAJECTORY · Demo',
      title: 'Revenue · AUD Mn · 2017–2027F',
      subtitle: 'AUD Mn · 2022 constant prices',
      unit: 'AUD Mn',
      unitPosition: 'top-right',
      insight: 'Market sustains 9.1% historical growth · forecast accelerates to 10.3% CAGR through 2027F.',
      legend: [
        { kind: 'solid', color: S0, label: 'Historical · 2017–2022' },
        { kind: 'dashed', color: S0, label: 'Forecast · 2023–2027F' },
        { kind: 'dot', color: S1, label: 'Secondary series' },
      ],
      figcaption: 'Anchored 2017–2022 per PRD V2.1 §6.3. Forward 2023–2027F compounded at CAGR per Ken Forecast Model.',
      source: { primary: 'Ken Forecast Model 2025', cross: ['Oxford Economics'], date: '2025-Q2' },
    },
    importSnippet: `import { ChartFigure } from '@kenresearch/design-system/charts';`,
    exampleSnippet: `<ChartFigure
  eyebrow="MARKET TRAJECTORY"
  title="Revenue · AUD Mn · 2017–2027F"
  subtitle="AUD Mn · 2022 constant prices"
  unit="AUD Mn"
  unitPosition="top-right"
  insight="Market sustains 9.1% growth through forecast horizon."
  legend={[
    { kind: 'solid', color: '#9488ec', label: 'Historical' },
    { kind: 'dashed', color: '#9488ec', label: 'Forecast 2023–2027F' },
  ]}
  figcaption="Analyst interpretation here."
  source={{ primary: 'Ken Forecast Model 2025', cross: ['Oxford Economics'], date: '2025-Q2' }}
>
  <KenColumnChart labels={labels} data={data} height={280} unit="AUD Mn" />
</ChartFigure>`,
    propsTable: [
      { name: 'title', type: 'string', required: true, description: 'Serif chart title · what the chart shows · 8–14 words' },
      { name: 'eyebrow', type: 'string', description: 'Uppercase tracked context tag above title · e.g. "MARKET TRAJECTORY"' },
      { name: 'subtitle', type: 'string', description: 'Italic DM Sans 13px · displayed below title · use for units/context when unit is long' },
      { name: 'unit', type: 'string', description: 'Unit label · AUD Mn · % · etc.' },
      { name: 'unitPosition', type: "'top-right' | 'inline-eyebrow'", default: "'top-right'", description: 'Where to render unit label · top-right pill or inline with eyebrow' },
      { name: 'insight', type: 'string', description: 'Italic 1–2 line explanation of WHY the chart matters · max 24 words' },
      { name: 'legend', type: 'LegendEntry[]', description: 'ChartFigure-owned legend. Kind: solid | dashed | line | area | dot. Chart internal legend MUST be disabled.' },
      { name: 'figcaption', type: 'string', description: 'Italic analyst interpretation · 1–2 lines · max 30 words' },
      { name: 'source', type: 'SourceInfo', description: 'Source citation: { primary, cross?: string[], date?: string }' },
      { name: 'className', type: 'string', description: 'Optional class on outer <figure>' },
      { name: 'children', type: 'ReactNode', required: true, description: 'The chart itself — KenColumnChart, KenBarChart, etc.' },
    ],
    a11y: 'Renders semantic <figure> + <figcaption>. Legend is a <ul aria-label="Chart legend">. Source is a <p>. All text elements use DS ink tokens meeting WCAG AA contrast.',
    tokensUsed: [
      { name: '--semantic-ink-strong', category: 'color', usage: 'Title text' },
      { name: '--semantic-ink-body', category: 'color', usage: 'Insight + figcaption text' },
      { name: '--semantic-ink-muted', category: 'color', usage: 'Eyebrow + source text' },
      { name: '--semantic-ink-subtle', category: 'color', usage: 'Unit pill text' },
      { name: '--semantic-bg-page', category: 'color', usage: 'Fallback page background' },
      { name: '--color-brand-red', category: 'color', usage: 'CTA accent (never chart series)' },
      { name: '--font-display', category: 'typography', usage: 'Noto Serif — chart title' },
      { name: '--font-body', category: 'typography', usage: 'DM Sans — eyebrow, insight, source' },
      { name: '--space-4', category: 'spacing', usage: 'Gap between legend items' },
      { name: '--space-6', category: 'spacing', usage: 'Inner padding' },
    ],
  },

  {
    id: 'primitive-chartreveal',
    category: 'primitive',
    name: 'ChartReveal',
    description: 'Framer Motion scroll-entrance wrapper. fadeInUp 0.6s ease-out · useInView trigger · useReducedMotion respected. Wraps any chart for scroll-entrance animation.',
    importPath: '@kenresearch/design-system/charts',
    isPrimitive: true,
    Component: ChartReveal,
    defaultProps: {},
    importSnippet: `import { ChartReveal } from '@kenresearch/design-system/charts';`,
    exampleSnippet: `<ChartReveal>
  <ChartFigure title="Revenue · AUD Mn" ...>
    <KenColumnChart labels={labels} data={data} height={280} unit="AUD Mn" />
  </ChartFigure>
</ChartReveal>`,
    propsTable: [
      { name: 'children', type: 'ReactNode', required: true, description: 'Any chart or table to animate in on scroll' },
      { name: 'className', type: 'string', description: 'Optional class on wrapper div' },
    ],
    a11y: 'Framer Motion useReducedMotion() hook: animation disabled when user prefers reduced motion. No aria changes — purely visual enhancement.',
    stateDemos: {},
    tokensUsed: [
      { name: '--semantic-bg-page', category: 'color', usage: 'Wrapper background fallback' },
      { name: '--space-4', category: 'spacing', usage: 'Inner padding around children' },
    ],
  },

  {
    id: 'primitive-tableshell',
    category: 'primitive',
    name: 'TableShell',
    description: 'Table outer wrapper. Renders the <table> element itself — children must be <thead> + <tbody> ONLY. 2 variants (card/open) · 3 header styles · 4 density levels · sticky · scrollX.',
    importPath: '@kenresearch/design-system/charts',
    isPrimitive: true,
    Component: TableShell,
    defaultProps: {
      variant: 'card',
      headerStyle: 'wash',
      density: 'standard',
      stickyHeader: false,
      alternateRows: false,
    },
    variants: [
      {
        id: 'card-wash',
        label: 'Card · Wash header',
        props: { variant: 'card', headerStyle: 'wash', density: 'standard' },
      },
      {
        id: 'card-inverted',
        label: 'Card · Inverted header',
        props: { variant: 'card', headerStyle: 'inverted', density: 'standard' },
      },
      {
        id: 'open-transparent',
        label: 'Open · Transparent header',
        props: { variant: 'open', headerStyle: 'transparent', density: 'compact' },
      },
    ],
    importSnippet: `import { TableShell } from '@kenresearch/design-system/charts';`,
    exampleSnippet: `<TableShell
  variant="card"
  headerStyle="wash"
  density="comfortable"
  stickyHeader
  scrollX
>
  {/* IMPORTANT: children must be <thead> + <tbody> ONLY */}
  {/* No outer <table> wrapper — TableShell owns the <table> element */}
  <thead>
    <tr>
      <th scope="col">Column A</th>
      <th scope="col">Column B</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Value 1</td>
      <td>Value 2</td>
    </tr>
  </tbody>
</TableShell>`,
    propsTable: [
      { name: 'children', type: 'ReactNode', required: true, description: 'MUST be <thead> + <tbody> ONLY. No outer <table> — TableShell renders the <table> element.' },
      { name: 'variant', type: "'card' | 'open'", default: "'card'", description: 'card: 1px periwinkle-tinted border + 10px radius (Ref 1). open: flush editorial, no border (Ref 2).' },
      { name: 'headerStyle', type: "'wash' | 'transparent' | 'inverted'", default: "'wash'", description: 'wash: rgb(248,247,254) periwinkle bg. transparent: no fill + border-bottom only. inverted: rgb(91,79,207) solid + white text.' },
      { name: 'density', type: "'compact' | 'standard' | 'comfortable' | 'spacious'", default: "'standard'", description: 'Row height: compact=28px · standard=40px · comfortable=45px · spacious=48px' },
      { name: 'stickyHeader', type: 'boolean', default: 'false', description: 'Pure CSS sticky. 2px border-bottom = sticky signal. Card variant auto-provides scroll parent.' },
      { name: 'alternateRows', type: 'boolean', default: 'false', description: 'Zebra striping · subtle periwinkle wash on even rows' },
      { name: 'scrollX', type: 'boolean', default: 'true (card) / false (open)', description: 'Wrapper overflow-x:auto for horizontal scroll' },
      { name: 'caption', type: 'string', description: 'Visually hidden <caption> for screen readers' },
      { name: 'ariaLabel', type: 'string', description: 'aria-label on the <table> element' },
      { name: 'className', type: 'string', description: 'Additional class names on outer wrapper div' },
    ],
    a11y: 'caption prop renders visually hidden <caption> for screen readers. ariaLabel on <table>. stickyHeader preserves keyboard scroll. Cell border-radius: 0 always (wrapper clips corners).',
    knownIssues: 'stickyHeader on open variant requires consumer to provide a fixed-height overflow:auto parent. Card variant auto-provides scroll parent.',
    stateDemos: { loading: true },
    tokensUsed: [
      { name: '--color-ramp-periwinkle-50', category: 'color', usage: 'Header wash background' },
      { name: '--color-ramp-periwinkle-200', category: 'color', usage: 'Card border tint' },
      { name: '--semantic-ink-strong', category: 'color', usage: 'Header text' },
      { name: '--semantic-ink-body', category: 'color', usage: 'Cell body text' },
      { name: '--space-4', category: 'spacing', usage: 'Standard density cell padding' },
      { name: '--space-2', category: 'spacing', usage: 'Compact density cell padding' },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // CHARTS
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'chart-column',
    category: 'chart',
    name: 'KenColumnChart',
    description: 'Vertical bar chart · projectionStartIndex renders forecast bars at 60% alpha · 3 data size variants · Highcharts column series.',
    importPath: '@kenresearch/design-system/charts',
    Component: KenColumnChart,
    defaultProps: {
      labels: COLUMN_LABELS,
      data: COLUMN_DATA_MID,
      height: 280,
      unit: 'AUD Mn',
      ariaLabel: 'Monthly revenue column chart',
    },
    variants: [
      {
        id: 'mid',
        label: 'Mid · 12 months',
        props: { labels: COLUMN_LABELS, data: COLUMN_DATA_MID, unit: 'AUD Mn' },
      },
      {
        id: 'low',
        label: 'Low · 12 months',
        props: { labels: COLUMN_LABELS, data: COLUMN_DATA_LOW, unit: 'Units (low)' },
      },
      {
        id: 'high',
        label: 'High · 12 months',
        props: { labels: COLUMN_LABELS, data: COLUMN_DATA_HIGH, unit: 'AUD Mn (high)' },
      },
      {
        id: 'decade',
        label: 'Decade · with projection',
        props: {
          labels: COLUMN_LABELS_DECADE,
          data: COLUMN_DATA_DECADE,
          projectionStartIndex: COLUMN_PROJECTION_START,
          unit: 'AUD Mn',
        },
      },
    ],
    surfaces: ['light', 'dark'],
    skeletonType: 'bar',
    importSnippet: `import { KenColumnChart } from '@kenresearch/design-system/charts';`,
    exampleSnippet: `<ChartReveal>
  <ChartFigure
    eyebrow="MONTHLY REVENUE · 12 MONTHS"
    title="Revenue by month · AUD Mn"
    unit="AUD Mn"
    insight="Revenue accelerates in H2 across all variants."
    legend={[{ kind: 'solid', color: '#9488ec', label: 'Monthly revenue' }]}
  >
    <KenColumnChart
      labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
               'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
      data={[420, 390, 445, 510, 480, 560, 530, 580, 610, 575, 640, 720]}
      height={280}
      unit="AUD Mn"
      ariaLabel="Monthly revenue column chart"
    />
  </ChartFigure>
</ChartReveal>`,
    propsTable: [
      { name: 'labels', type: 'string[]', required: true, description: 'X-axis category labels' },
      { name: 'data', type: 'number[]', required: true, description: 'Y-axis values · must match labels length' },
      { name: 'height', type: 'number', default: '320', description: 'Chart height in px' },
      { name: 'unit', type: 'string', description: 'Y-axis unit label · shown in tooltip' },
      { name: 'projectionStartIndex', type: 'number', description: 'Index from which bars render at 60% alpha (forecast bars)' },
      { name: 'ariaLabel', type: 'string', description: 'Accessible label on the Highcharts SVG container' },
      { name: 'disableReveal', type: 'boolean', default: 'false', description: 'Skip ChartReveal scroll-entrance animation' },
    ],
    a11y: 'ariaLabel prop sets accessible label on SVG container. Internal Highcharts legend disabled — ChartFigure owns legend slot.',
    stateDemos: { loading: true, empty: true, error: 'Mock data failed to load.' },
    tokensUsed: [
      { name: '--color-ramp-periwinkle-400', category: 'color', usage: 'Bar fill color (KEN_CHART_SERIES_ARRAY[0])' },
      { name: '--semantic-ink-muted', category: 'color', usage: 'Axis tick labels' },
      { name: '--color-foundation-white', category: 'color', usage: 'Chart background' },
      { name: '--font-body', category: 'typography', usage: 'DM Sans — axis labels + tooltip' },
      { name: '--space-4', category: 'spacing', usage: 'Chart internal padding' },
    ],
  },

  {
    id: 'chart-bar',
    category: 'chart',
    name: 'KenBarChart',
    description: 'Horizontal bar chart · category comparison · percentage unit · 6 regions demo.',
    importPath: '@kenresearch/design-system/charts',
    Component: KenBarChart,
    defaultProps: {
      labels: BAR_LABELS,
      data: BAR_DATA,
      height: 280,
      unit: BAR_UNIT,
      ariaLabel: 'Revenue share by region horizontal bar chart',
    },
    surfaces: ['light', 'dark'],
    skeletonType: 'bar',
    importSnippet: `import { KenBarChart } from '@kenresearch/design-system/charts';`,
    exampleSnippet: `<ChartFigure
  eyebrow="REGIONAL REVENUE SHARE"
  title="Revenue share by metro · %"
  unit="%"
  legend={[{ kind: 'solid', color: '#9488ec', label: 'Revenue share %' }]}
>
  <KenBarChart
    labels={['Sydney Metro', 'Melbourne CBD', 'Brisbane', 'Perth', 'Adelaide', 'Darwin']}
    data={[35.0, 27.5, 15.5, 11.0, 7.5, 3.5]}
    height={280}
    unit="%"
    ariaLabel="Revenue share by region"
  />
</ChartFigure>`,
    propsTable: [
      { name: 'labels', type: 'string[]', required: true, description: 'Category labels · rendered on Y-axis (horizontal chart)' },
      { name: 'data', type: 'number[]', required: true, description: 'Values · must match labels length' },
      { name: 'height', type: 'number', default: '320', description: 'Chart height in px' },
      { name: 'unit', type: 'string', description: 'Unit label shown in tooltip · e.g. "%" or "AUD Mn"' },
      { name: 'ariaLabel', type: 'string', description: 'Accessible label on SVG container' },
    ],
    a11y: 'ariaLabel on SVG container. Highcharts internal legend disabled — ChartFigure owns.',
    stateDemos: { loading: true, empty: true },
    tokensUsed: [
      { name: '--color-ramp-periwinkle-400', category: 'color', usage: 'Bar fill (KEN_CHART_SERIES_ARRAY[0])' },
      { name: '--semantic-ink-muted', category: 'color', usage: 'Y-axis category labels' },
      { name: '--color-foundation-white', category: 'color', usage: 'Chart background' },
      { name: '--font-body', category: 'typography', usage: 'DM Sans — labels + tooltip' },
      { name: '--space-4', category: 'spacing', usage: 'Chart inner padding' },
    ],
  },

  {
    id: 'chart-dual-column',
    category: 'chart',
    name: 'KenDualColumnChart',
    description: 'Grouped 2-series column chart · Cold Storage vs Cold Transport · diverging CAGR · Highcharts column with 2 named series.',
    importPath: '@kenresearch/design-system/charts',
    Component: KenDualColumnChart,
    defaultProps: {
      labels: DUAL_LABELS,
      series1: DUAL_SERIES_A,
      series2: DUAL_SERIES_B,
      height: 300,
      unit: 'AUD Mn',
      ariaLabel: 'Cold Storage vs Cold Transport grouped column chart',
    },
    surfaces: ['light', 'dark'],
    skeletonType: 'bar',
    importSnippet: `import { KenDualColumnChart } from '@kenresearch/design-system/charts';`,
    exampleSnippet: `<ChartFigure
  eyebrow="SUBMARKET COMPARISON · 2019–2025F"
  title="Cold Storage vs Cold Transport · AUD Mn"
  unit="AUD Mn"
  legend={[
    { kind: 'solid', color: '#9488ec', label: 'Cold Storage' },
    { kind: 'solid', color: '#a8b7f0', label: 'Cold Transport' },
  ]}
>
  <KenDualColumnChart
    labels={['2019', '2020', '2021', '2022', '2023', '2024F', '2025F']}
    series1={{ name: 'Cold Storage', data: [1680, 1842, 2022, 2648, 2939, 3262, 3621] }}
    series2={{ name: 'Cold Transport', data: [2540, 2780, 3040, 3900, 4267, 4668, 5107] }}
    height={300}
    unit="AUD Mn"
    ariaLabel="Grouped column chart"
  />
</ChartFigure>`,
    propsTable: [
      { name: 'labels', type: 'string[]', required: true, description: 'X-axis category labels' },
      { name: 'series1', type: 'DualSeries', required: true, description: 'First series: { name: string, data: number[] }' },
      { name: 'series2', type: 'DualSeries', required: true, description: 'Second series: { name: string, data: number[] }' },
      { name: 'height', type: 'number', default: '320', description: 'Chart height in px' },
      { name: 'unit', type: 'string', description: 'Unit label in tooltip' },
      { name: 'ariaLabel', type: 'string', description: 'Accessible label on SVG container' },
    ],
    a11y: 'ariaLabel on SVG container. Both series use distinct periwinkle palette colors meeting contrast on white.',
    stateDemos: { loading: true, empty: true },
    tokensUsed: [
      { name: '--color-ramp-periwinkle-400', category: 'color', usage: 'Series 1 bar (KEN_CHART_SERIES_ARRAY[0])' },
      { name: '--color-ramp-periwinkle-300', category: 'color', usage: 'Series 2 bar (KEN_CHART_SERIES_ARRAY[1])' },
      { name: '--semantic-ink-muted', category: 'color', usage: 'Axis tick labels' },
      { name: '--color-foundation-white', category: 'color', usage: 'Chart background' },
      { name: '--font-body', category: 'typography', usage: 'DM Sans — axis + tooltip' },
    ],
  },

  {
    id: 'chart-bubble',
    category: 'chart',
    name: 'KenBubbleChart',
    description: 'Bubble scatter chart · 3D data (x=revenue · y=growth · z=capacity) · 8 competitor entities · supports light and dark surfaces.',
    importPath: '@kenresearch/design-system/charts',
    Component: KenBubbleChart,
    defaultProps: {
      data: BUBBLE_DATA,
      height: 320,
      xAxisTitle: 'Revenue (AUD Mn)',
      yAxisTitle: 'YoY growth %',
      ariaLabel: 'Competitor positioning bubble chart',
    },
    surfaces: ['light', 'dark'],
    skeletonType: 'bubble',
    importSnippet: `import { KenBubbleChart } from '@kenresearch/design-system/charts';`,
    exampleSnippet: `<ChartFigure
  eyebrow="COMPETITOR POSITIONING · REVENUE × GROWTH × CAPACITY"
  title="Market participants · x = revenue · y = growth % · z = fleet capacity"
  unit="AUD Mn"
  legend={[
    { kind: 'dot', color: '#9488ec', label: 'Tier-1 operators' },
    { kind: 'dot', color: '#c084fc', label: 'Mid-tier' },
    { kind: 'dot', color: '#d8b4fe', label: 'Emerging / niche' },
  ]}
>
  <KenBubbleChart
    data={[
      { name: 'Alpha 3PL', x: 850, y: 8.2, z: 280 },
      { name: 'Beta Logistics', x: 720, y: 6.8, z: 210 },
    ]}
    height={320}
    xAxisTitle="Revenue (AUD Mn)"
    yAxisTitle="YoY growth %"
    ariaLabel="Competitor positioning bubble chart"
  />
</ChartFigure>`,
    propsTable: [
      { name: 'data', type: 'BubblePoint[]', required: true, description: '{ name: string, x: number, y: number, z: number }[] · z drives bubble size' },
      { name: 'height', type: 'number', default: '320', description: 'Chart height in px' },
      { name: 'xAxisTitle', type: 'string', description: 'X-axis label · e.g. "Revenue (AUD Mn)"' },
      { name: 'yAxisTitle', type: 'string', description: 'Y-axis label · e.g. "YoY growth %"' },
      { name: 'ariaLabel', type: 'string', description: 'Accessible label on SVG container' },
      { name: 'surface', type: "'light' | 'dark'", default: "'light'", description: 'Affects tooltip + grid + ink colors. Use dark for cinematic-dark sections.' },
    ],
    a11y: 'ariaLabel on SVG. Bubble labels above each bubble (y: -8 offset). Dark surface uses rgba(255,255,255,0.7) ink for WCAG AA on #0a0a0c bg.',
    tokensUsed: [
      { name: '--color-ramp-periwinkle-400', category: 'color', usage: 'Primary bubble series color' },
      { name: '--color-ramp-periwinkle-300', category: 'color', usage: 'Secondary bubble series' },
      { name: '--color-ramp-purple-400', category: 'color', usage: 'Tertiary bubble series' },
      { name: '--semantic-ink-strong', category: 'color', usage: 'Bubble data labels (light surface)' },
      { name: '--semantic-bg-page', category: 'color', usage: 'Tooltip background' },
      { name: '--space-4', category: 'spacing', usage: 'Chart internal padding' },
    ],
    stateDemos: { loading: true, empty: true },
  },

  {
    id: 'chart-donut',
    category: 'chart',
    name: 'KenDonutChart',
    description: '5-slice donut chart · end-user sector breakdown · ChartFigure-owned legend · Highcharts pie with innerSize.',
    importPath: '@kenresearch/design-system/charts',
    Component: KenDonutChart,
    defaultProps: {
      data: DONUT_DATA,
      height: 260,
      ariaLabel: 'End-user sector donut chart',
    },
    surfaces: ['light', 'dark'],
    skeletonType: 'pie',
    importSnippet: `import { KenDonutChart } from '@kenresearch/design-system/charts';`,
    exampleSnippet: `<ChartFigure
  eyebrow="END-USER COMPOSITION · 2024"
  title="Revenue share by end-user sector"
  unit="%"
  legend={[
    { kind: 'dot', color: '#9488ec', label: 'Meat & Seafood' },
    { kind: 'dot', color: '#a8b7f0', label: 'Dairy' },
    { kind: 'dot', color: '#c084fc', label: 'Pharma' },
  ]}
>
  <KenDonutChart
    data={[
      { name: 'Meat & Seafood', value: 32 },
      { name: 'Dairy', value: 24 },
      { name: 'Pharma', value: 18 },
    ]}
    height={260}
    ariaLabel="End-user sector donut chart"
  />
</ChartFigure>`,
    propsTable: [
      { name: 'data', type: 'DonutSlice[]', required: true, description: '{ name: string, value: number }[] · values sum to 100 ideally' },
      { name: 'height', type: 'number', default: '280', description: 'Chart height in px' },
      { name: 'ariaLabel', type: 'string', description: 'Accessible label on SVG container' },
    ],
    a11y: 'ariaLabel on SVG. Internal Highcharts legend disabled — ChartFigure owns. Slice colors use accessible periwinkle palette.',
    knownIssues: 'Donut center fixed at 50%/50% via plotOptions.pie.center. If rendering right-shifted, verify parent has width set.',
    stateDemos: { loading: true, empty: true },
    tokensUsed: [
      { name: '--color-ramp-periwinkle-400', category: 'color', usage: 'Slice 1 (KEN_CHART_SERIES_ARRAY[0])' },
      { name: '--color-ramp-periwinkle-300', category: 'color', usage: 'Slice 2 (KEN_CHART_SERIES_ARRAY[1])' },
      { name: '--color-ramp-purple-400', category: 'color', usage: 'Slices 3–5' },
      { name: '--color-foundation-white', category: 'color', usage: 'Chart background + slice dividers' },
      { name: '--font-body', category: 'typography', usage: 'DM Sans — tooltip' },
    ],
  },

  {
    id: 'chart-multiline',
    category: 'chart',
    name: 'KenMultiLineChart',
    description: '6-series multi-line chart · macro indicators overlay · 12 data points per series · Highcharts spline.',
    importPath: '@kenresearch/design-system/charts',
    Component: KenMultiLineChart,
    defaultProps: {
      labels: LINE_LABELS,
      series: LINE_SERIES,
      height: 300,
      unit: '% YoY',
      ariaLabel: 'Macro multi-line overlay chart',
    },
    surfaces: ['light', 'dark'],
    skeletonType: 'line',
    importSnippet: `import { KenMultiLineChart } from '@kenresearch/design-system/charts';`,
    exampleSnippet: `<ChartFigure
  eyebrow="MACRO OVERLAY · 2018–2029F"
  title="6 macro indicators · % YoY"
  unit="% YoY"
  legend={series.map((s, i) => ({
    kind: 'line',
    color: KEN_CHART_SERIES_ARRAY[i],
    label: s.name,
  }))}
>
  <KenMultiLineChart
    labels={['2018', '2019', '2020', '2021', '2022', '2023', '2024']}
    series={[
      { name: 'GDP Growth %', data: [2.8, 1.9, -3.7, 4.8, 3.7, 2.0, 2.8] },
      { name: 'Cold-chain demand %', data: [9.1, 9.1, 9.1, 9.1, 9.1, 10.3, 10.3] },
    ]}
    height={300}
    unit="% YoY"
    ariaLabel="Macro multi-line chart"
  />
</ChartFigure>`,
    propsTable: [
      { name: 'labels', type: 'string[]', required: true, description: 'X-axis category labels (years or dates)' },
      { name: 'series', type: 'MultiLineSeries[]', required: true, description: '{ name: string, data: number[] }[] · each series one line' },
      { name: 'height', type: 'number', default: '320', description: 'Chart height in px' },
      { name: 'unit', type: 'string', description: 'Unit label in tooltip' },
      { name: 'ariaLabel', type: 'string', description: 'Accessible label on SVG container' },
    ],
    a11y: 'ariaLabel on SVG. Highcharts internal legend disabled — ChartFigure owns. Up to 6 series — each uses distinct periwinkle palette color.',
    stateDemos: { loading: true, empty: true },
    tokensUsed: [
      { name: '--color-ramp-periwinkle-400', category: 'color', usage: 'Series 1 line (KEN_CHART_SERIES_ARRAY[0])' },
      { name: '--color-ramp-periwinkle-300', category: 'color', usage: 'Series 2 line color' },
      { name: '--color-ramp-purple-400', category: 'color', usage: 'Series 3–6 line colors' },
      { name: '--semantic-ink-muted', category: 'color', usage: 'Axis tick labels' },
      { name: '--color-foundation-white', category: 'color', usage: 'Chart background' },
      { name: '--font-body', category: 'typography', usage: 'DM Sans — axis + tooltip' },
    ],
  },

  {
    id: 'chart-scenario',
    category: 'chart',
    name: 'KenScenarioFanChart',
    description: '3-scenario area-spline fan chart · Base / Bull / Bear paths · shaded envelope between Bull and Bear · Ken Forecast Model standard.',
    importPath: '@kenresearch/design-system/charts',
    Component: KenScenarioFanChart,
    defaultProps: {
      labels: SCENARIO_LABELS,
      baseData: SCENARIO_BASE,
      bearData: SCENARIO_BEAR,
      bullData: SCENARIO_BULL,
      height: 300,
      unit: 'AUD Mn',
      ariaLabel: '3-scenario fan chart 2022 to 2027F',
    },
    surfaces: ['light', 'dark'],
    skeletonType: 'line',
    importSnippet: `import { KenScenarioFanChart } from '@kenresearch/design-system/charts';`,
    exampleSnippet: `<ChartFigure
  eyebrow="SCENARIO FAN · 2022–2027F"
  title="Market size under Bear / Base / Bull scenarios · AUD Mn"
  unit="AUD Mn"
  legend={[
    { kind: 'line', color: '#9488ec', label: 'Base · 10.3% CAGR' },
    { kind: 'dashed', color: '#b8aff8', label: 'Bull · 13.8% CAGR' },
    { kind: 'dashed', color: '#c084fc', label: 'Bear · 7.1% CAGR' },
  ]}
>
  <KenScenarioFanChart
    labels={['2022', '2023', '2024', '2025', '2026F', '2027F']}
    baseData={[6548, 7223, 7965, 8786, 9690, 10705]}
    bearData={[6548, 7013, 7511, 8044, 8611, 9218]}
    bullData={[6548, 7451, 8479, 9649, 10981, 12497]}
    height={300}
    unit="AUD Mn"
    ariaLabel="Scenario fan chart"
  />
</ChartFigure>`,
    propsTable: [
      { name: 'labels', type: 'string[]', required: true, description: 'X-axis category labels · years' },
      { name: 'baseData', type: 'number[]', required: true, description: 'Base scenario values' },
      { name: 'bearData', type: 'number[]', required: true, description: 'Bear (pessimistic) scenario values' },
      { name: 'bullData', type: 'number[]', required: true, description: 'Bull (optimistic) scenario values' },
      { name: 'height', type: 'number', default: '320', description: 'Chart height in px' },
      { name: 'unit', type: 'string', description: 'Unit label in tooltip' },
      { name: 'ariaLabel', type: 'string', description: 'Accessible label on SVG container' },
    ],
    a11y: 'ariaLabel on SVG. Three distinct series — base spline + bull/bear area-fill envelope. Highcharts internal legend disabled.',
    stateDemos: { loading: true, empty: true },
    tokensUsed: [
      { name: '--color-ramp-periwinkle-400', category: 'color', usage: 'Base scenario spline line' },
      { name: '--color-ramp-periwinkle-300', category: 'color', usage: 'Bull scenario area fill' },
      { name: '--color-ramp-purple-400', category: 'color', usage: 'Bear scenario area fill' },
      { name: '--semantic-ink-muted', category: 'color', usage: 'Axis tick labels' },
      { name: '--color-foundation-white', category: 'color', usage: 'Chart background' },
      { name: '--font-body', category: 'typography', usage: 'DM Sans — axis + tooltip' },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // TABLES
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'table-property',
    category: 'table',
    name: 'PropertyTable',
    description: 'Competitor comparison matrix. 8 properties × 5 players (2 gated). Cell values wrapped in TruncatedText — hover shows full value tooltip (portaled · overflow:hidden safe). Card variant · wash header · comfortable density default. Gating overlay on last N columns.',
    importPath: '@kenresearch/design-system/charts',
    Component: PropertyTable,
    defaultProps: {
      properties: PROPERTY_PROPS,
      players: PROPERTY_PLAYERS,
      gatedFrom: 3,
      density: 'comfortable',
      stickyHeader: false,
    },
    variants: [
      // Density variants
      { id: 'comfortable', label: 'Comfortable', props: { density: 'comfortable' } },
      { id: 'standard', label: 'Standard', props: { density: 'standard' } },
      { id: 'compact', label: 'Compact', props: { density: 'compact' } },
      { id: 'spacious', label: 'Spacious', props: { density: 'spacious' } },
      // Variant + header style demos (Sprint D.1 2026-05-26)
      { id: 'card-wash', label: 'Card · Wash header', props: { variant: 'card', headerStyle: 'wash', density: 'comfortable' } },
      { id: 'card-transparent', label: 'Card · Transparent header', props: { variant: 'card', headerStyle: 'transparent', density: 'comfortable' } },
      { id: 'card-inverted', label: 'Card · Inverted header', props: { variant: 'card', headerStyle: 'inverted', density: 'comfortable' } },
      { id: 'open-transparent', label: 'Open · Transparent', props: { variant: 'open', headerStyle: 'transparent', density: 'comfortable' } },
      { id: 'card-sticky', label: 'Card · Sticky header', props: { variant: 'card', headerStyle: 'wash', density: 'comfortable', stickyHeader: true, maxHeight: '280px' } },
    ],
    importSnippet: `import { PropertyTable } from '@kenresearch/design-system/charts';`,
    exampleSnippet: `<PropertyTable
  properties={[
    { property: 'HQ', sublabel: 'Primary base' },
    { property: 'Founded' },
    { property: 'Fleet size', sublabel: 'Reefer units est.' },
  ]}
  players={[
    {
      name: 'Alpha 3PL',
      descriptor: 'Private · Tier 1',
      values: ['Melbourne, VIC', '1956', '~1,800 units'],
    },
    {
      name: 'Beta Cold',
      descriptor: 'ASX listed',
      gated: true,
      values: ['Sydney, NSW', '1978', '~1,200 units'],
    },
  ]}
  gatedFrom={1}
  density="comfortable"
  stickyHeader={false}
/>`,
    propsTable: [
      { name: 'properties', type: 'PlayerProperty[]', required: true, description: '{ property: string, sublabel?: string }[] · row definitions' },
      { name: 'players', type: 'PlayerColumn[]', required: true, description: '{ name, descriptor?, gated?, values: string[] }[] · column definitions' },
      { name: 'gatedFrom', type: 'number', description: 'Column index from which columns are gated (blurred + lock overlay)' },
      { name: 'density', type: "'compact' | 'standard' | 'comfortable' | 'spacious'", default: "'comfortable'", description: 'Row height passthrough to TableShell' },
      { name: 'variant', type: "'card' | 'open'", default: "'card'", description: 'Card: bordered rounded card (Ref 1). Open: flush editorial (Ref 2).' },
      { name: 'headerStyle', type: "'wash' | 'transparent' | 'inverted'", default: "'wash'", description: 'wash: periwinkle wash bg · transparent: border-bottom only · inverted: solid periwinkle + white text' },
      { name: 'stickyHeader', type: 'boolean', default: 'false', description: 'Sticky column header passthrough to TableShell' },
      { name: 'maxHeight', type: 'string | number', default: "'400px'", description: 'Max height when stickyHeader=true — creates v-scroll context' },
    ],
    a11y: 'Uses TableShell with aria-label. Property column uses th[scope="row"]. Player columns use th[scope="col"]. Gated columns include sr-only "Premium — upgrade to access" text.',
    tokensUsed: [
      { name: '--color-ramp-periwinkle-50', category: 'color', usage: 'Table header wash background' },
      { name: '--color-ramp-periwinkle-200', category: 'color', usage: 'Table border tint' },
      { name: '--semantic-ink-strong', category: 'color', usage: 'Header text' },
      { name: '--semantic-ink-body', category: 'color', usage: 'Cell text' },
      { name: '--semantic-ink-muted', category: 'color', usage: 'Sub-label text' },
      { name: '--color-brand-red', category: 'color', usage: 'Gated lock icon' },
      { name: '--space-4', category: 'spacing', usage: 'Cell padding (standard density)' },
    ],
    stateDemos: { loading: true, empty: true, error: 'API timeout: failed to load competitor data after 3 retries.' },
  },

  {
    id: 'table-ranking',
    category: 'table',
    name: 'RankingTable',
    description: '7-opportunity ranking table. Name + detail wrapped in TruncatedText (tooltip shows TAM + weighted score). Rank number · TAM · Impact + Feasibility score bars · time-to-monetize chip · weighted score. Top-3 highlighted. Neutral color palette (no chart-series in chrome).',
    importPath: '@kenresearch/design-system/charts',
    Component: RankingTable,
    defaultProps: {
      rows: RANKING_ROWS,
      columns: RANKING_COLUMNS,
      topHighlightCount: 3,
      density: 'standard',
      stickyHeader: true,
      maxHeight: '360px',
      ariaLabel: '7-opportunity ranking table demo',
      footnote: 'Weighted Score = 0.5 × Impact + 0.3 × Feasibility + 0.2 × (1 – Time-penalty) · Ken Research analysis 2024',
    },
    variants: [
      // Density variants (all 4 — was only 2 per audit)
      { id: 'standard', label: 'Standard', props: { density: 'standard', topHighlightCount: 3 } },
      { id: 'compact', label: 'Compact', props: { density: 'compact', topHighlightCount: 3 } },
      { id: 'comfortable', label: 'Comfortable', props: { density: 'comfortable', topHighlightCount: 3 } },
      { id: 'spacious', label: 'Spacious', props: { density: 'spacious', topHighlightCount: 3 } },
      { id: 'highlight-5', label: 'Top 5 highlight', props: { density: 'standard', topHighlightCount: 5 } },
      // Variant + header style demos (Sprint D.1 2026-05-26)
      { id: 'card-wash', label: 'Card · Wash header', props: { variant: 'card', headerStyle: 'wash', density: 'standard' } },
      { id: 'card-transparent', label: 'Card · Transparent header', props: { variant: 'card', headerStyle: 'transparent', density: 'standard' } },
      { id: 'card-inverted', label: 'Card · Inverted header', props: { variant: 'card', headerStyle: 'inverted', density: 'standard' } },
      { id: 'open-transparent', label: 'Open · Transparent', props: { variant: 'open', headerStyle: 'transparent', density: 'standard' } },
      { id: 'card-sticky', label: 'Card · Sticky header', props: { variant: 'card', headerStyle: 'wash', density: 'standard', stickyHeader: true, maxHeight: '280px' } },
    ],
    importSnippet: `import { RankingTable } from '@kenresearch/design-system/charts';`,
    exampleSnippet: `<RankingTable
  rows={[
    {
      rank: 1,
      name: 'Pharma cold-chain 3PL',
      detail: 'TGA GDP-compliant · biologics',
      primaryMetric: 820,
      primaryMetricPrefix: 'AUD',
      primaryMetricUnit: 'Mn',
      score1: 9.2,
      score2: 7.8,
      chipLabel: '18mo',
      chipUrgency: 'medium',
      weightedScore: 8.7,
    },
  ]}
  columns={{
    primaryMetric: 'TAM (AUD Mn)',
    score1: 'Impact (1–10)',
    score2: 'Feasibility (1–10)',
    chip: 'Time-to-monetize',
    weightedScore: 'Score',
  }}
  topHighlightCount={3}
  density="standard"
  stickyHeader={true}
  ariaLabel="Opportunity ranking table"
  footnote="Weighted Score formula..."
/>`,
    propsTable: [
      { name: 'rows', type: 'RankingRow[]', required: true, description: 'Array of ranked rows. RankingRow: { rank, name, detail?, primaryMetric, score1, score2, chipLabel, chipUrgency, weightedScore }' },
      { name: 'columns', type: 'RankingTableColumns', required: true, description: 'Column header labels: { primaryMetric, score1, score2, chip, weightedScore }' },
      { name: 'topHighlightCount', type: 'number', default: '3', description: 'Number of top rows to highlight with periwinkle wash bg' },
      { name: 'density', type: 'TableDensity', default: "'standard'", description: 'Row height passthrough to TableShell' },
      { name: 'variant', type: "'card' | 'open'", default: "'card'", description: 'Card: bordered rounded card (Ref 1). Open: flush editorial (Ref 2).' },
      { name: 'headerStyle', type: "'wash' | 'transparent' | 'inverted'", default: "'wash'", description: 'wash: periwinkle wash bg · transparent: border-bottom only · inverted: solid periwinkle + white text' },
      { name: 'stickyHeader', type: 'boolean', default: 'true', description: 'Sticky header passthrough. Requires maxHeight to create v-scroll context.' },
      { name: 'maxHeight', type: 'string | number', default: "'400px'", description: 'Max height when stickyHeader=true — creates v-scroll context' },
      { name: 'ariaLabel', type: 'string', description: 'Accessible label on table' },
      { name: 'footnote', type: 'string', description: 'Formula or methodology note below table · italic 11px' },
    ],
    a11y: 'ariaLabel on table element. Rank column th[scope="row"]. chipUrgency colors use sufficient contrast: fast=periwinkle, medium=neutral, slow=muted.',
    tokensUsed: [
      { name: '--color-ramp-periwinkle-600', category: 'color', usage: 'Inverted header background' },
      { name: '--color-ramp-periwinkle-50', category: 'color', usage: 'Top-N row highlight wash' },
      { name: '--color-ramp-periwinkle-200', category: 'color', usage: 'Table border + chip fast' },
      { name: '--semantic-ink-strong', category: 'color', usage: 'Rank number + weighted score' },
      { name: '--semantic-ink-muted', category: 'color', usage: 'Detail / sub-text' },
      { name: '--space-3', category: 'spacing', usage: 'Compact cell padding' },
      { name: '--space-5', category: 'spacing', usage: 'Standard cell padding' },
    ],
    stateDemos: { loading: true, empty: true, error: 'API timeout: failed to load rankings data after 3 retries.' },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // STATES
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'state-chartskeleton',
    category: 'state',
    name: 'ChartSkeleton',
    description: 'Loading placeholder for chart areas. 5 types (bar · line · pie · bubble · generic) · periwinkle shimmer animation · respects prefers-reduced-motion.',
    importPath: '@kenresearch/design-system/charts',
    Component: ChartSkeleton,
    defaultProps: { type: 'bar', height: 280 },
    variants: [
      { id: 'bar', label: 'Bar type', props: { type: 'bar', height: 280 } },
      { id: 'line', label: 'Line type', props: { type: 'line', height: 280 } },
      { id: 'pie', label: 'Pie type', props: { type: 'pie', height: 280 } },
      { id: 'bubble', label: 'Bubble type', props: { type: 'bubble', height: 280 } },
      { id: 'generic', label: 'Generic', props: { type: 'generic', height: 280 } },
    ],
    isPrimitive: true,
    importSnippet: `import { ChartSkeleton } from '@kenresearch/design-system/charts';`,
    exampleSnippet: `{/* Use directly or via chart loading prop */}
<ChartSkeleton type="bar" height={320} />
<ChartSkeleton type="pie" height={280} animate={false} />

{/* Or as next/dynamic loading fallback */}
const KenColumnChart = dynamic(
  () => import('@kenresearch/design-system/charts').then(m => m.KenColumnChart),
  { ssr: false, loading: () => <ChartSkeleton type="bar" height={320} /> }
);`,
    propsTable: [
      { name: 'type', type: "'bar' | 'line' | 'pie' | 'bubble' | 'generic'", default: "'generic'", description: 'Chart type — renders type-appropriate SVG placeholder' },
      { name: 'height', type: 'number', default: '320', description: 'Height in px · should match the chart height' },
      { name: 'width', type: "number | string", default: "'100%'", description: 'Width in px or CSS string' },
      { name: 'animate', type: 'boolean', default: 'true', description: 'Shimmer animation. Auto-disabled when prefers-reduced-motion is active.' },
      { name: 'className', type: 'string', description: 'Optional className on wrapper' },
    ],
    a11y: 'role="status" + aria-label="Loading chart" on wrapper. shimmer animation disabled when prefers-reduced-motion active. sr-only "Loading chart data" text.',
    tokensUsed: [
      { name: '--color-ramp-periwinkle-100', category: 'color', usage: 'Skeleton bar base fill' },
      { name: '--color-ramp-periwinkle-50', category: 'color', usage: 'Shimmer highlight sweep' },
      { name: '--semantic-bg-page', category: 'color', usage: 'Skeleton background' },
    ],
  },

  {
    id: 'state-tableskeleton',
    category: 'state',
    name: 'TableSkeleton',
    description: 'Loading placeholder for table areas. Matches TableShell card/open styling. Configurable rows/cols/density. Periwinkle shimmer · prefers-reduced-motion respected.',
    importPath: '@kenresearch/design-system/charts',
    Component: TableSkeleton,
    defaultProps: { rows: 5, cols: 4, density: 'standard', variant: 'card' },
    variants: [
      { id: 'card-standard', label: 'Card · Standard', props: { variant: 'card', density: 'standard', rows: 5, cols: 4 } },
      { id: 'card-compact', label: 'Card · Compact', props: { variant: 'card', density: 'compact', rows: 7, cols: 5 } },
      { id: 'open-standard', label: 'Open · Standard', props: { variant: 'open', density: 'standard', rows: 4, cols: 3 } },
    ],
    isPrimitive: true,
    importSnippet: `import { TableSkeleton } from '@kenresearch/design-system/charts';`,
    exampleSnippet: `<TableSkeleton rows={5} cols={4} density="comfortable" />
<TableSkeleton variant="open" rows={3} cols={3} animate={false} />`,
    propsTable: [
      { name: 'rows', type: 'number', default: '5', description: 'Number of fake body rows' },
      { name: 'cols', type: 'number', default: '5', description: 'Number of fake columns' },
      { name: 'density', type: 'TableDensity', default: "'standard'", description: 'Row density — matches TableShell density prop' },
      { name: 'variant', type: "'card' | 'open'", default: "'card'", description: 'Card shows border+radius · open shows flush styling' },
      { name: 'animate', type: 'boolean', default: 'true', description: 'Shimmer animation · disabled when prefers-reduced-motion active' },
      { name: 'className', type: 'string', description: 'Optional className on wrapper' },
    ],
    a11y: 'role="status" + aria-label="Loading table". sr-only "Loading table data" text.',
    tokensUsed: [
      { name: '--color-ramp-periwinkle-100', category: 'color', usage: 'Skeleton cell base fill' },
      { name: '--color-ramp-periwinkle-50', category: 'color', usage: 'Shimmer highlight sweep' },
      { name: '--color-ramp-periwinkle-200', category: 'color', usage: 'Card variant border tint' },
    ],
  },

  {
    id: 'state-emptystate',
    category: 'state',
    name: 'ChartEmptyState',
    description: 'No-data placeholder for charts and tables. Lucide Inbox icon · title · optional description · optional CTA button. Centered layout.',
    importPath: '@kenresearch/design-system/charts',
    Component: ChartEmptyState,
    defaultProps: {
      title: 'No data available',
      description: 'Market data for this segment isn\'t available in the selected date range.',
      cta: undefined,
    },
    variants: [
      {
        id: 'no-cta',
        label: 'No CTA',
        props: { title: 'No data available', description: 'Market data for this segment isn\'t available.' },
      },
      {
        id: 'with-cta',
        label: 'With CTA',
        props: {
          title: 'No data available',
          description: 'Market data for this segment isn\'t available in the selected date range.',
          cta: { label: 'Request data', onClick: () => {} },
        },
      },
      {
        id: 'no-icon',
        label: 'No icon',
        props: {
          icon: null,
          title: 'Data not available for this filter',
          description: 'Try adjusting your date range or filters.',
        },
      },
    ],
    isPrimitive: true,
    importSnippet: `import { ChartEmptyState } from '@kenresearch/design-system/charts';`,
    exampleSnippet: `<ChartEmptyState
  title="No data available"
  description="Market data for this segment isn't available in the selected date range."
  cta={{ label: 'Request data', onClick: () => requestData() }}
/>

{/* Suppress icon */}
<ChartEmptyState icon={null} title="Data not found" />`,
    propsTable: [
      { name: 'title', type: 'string', required: true, description: 'Concise state label · e.g. "No data available"' },
      { name: 'icon', type: 'ReactNode | null', description: 'Custom icon. null = suppress. undefined (default) = Lucide Inbox at 32px.' },
      { name: 'description', type: 'string', description: '1–2 sentences explaining why + what to do · max 40ch' },
      { name: 'cta', type: '{ label: string, onClick: () => void }', description: 'Optional CTA button (DS Button variant=secondary size=sm)' },
      { name: 'className', type: 'string', description: 'Optional className on wrapper' },
    ],
    a11y: 'role="status" + aria-label={title} on wrapper. CTA via DS Button — keyboard accessible. Icon aria-hidden.',
    tokensUsed: [
      { name: '--semantic-ink-muted', category: 'color', usage: 'Title text' },
      { name: '--semantic-ink-subtle', category: 'color', usage: 'Description text + Inbox icon' },
      { name: '--semantic-bg-page', category: 'color', usage: 'Empty state background fallback' },
    ],
  },

  {
    id: 'state-errorstate',
    category: 'state',
    name: 'ErrorState',
    description: 'Load-failure placeholder for charts and tables. AlertCircle icon in brand-red · title · optional message · optional retry CTA. role="alert" live region.',
    importPath: '@kenresearch/design-system/charts',
    Component: ErrorState,
    defaultProps: {
      title: 'Failed to load',
      message: 'Market data failed to load. Check your connection and try again.',
    },
    variants: [
      {
        id: 'with-retry',
        label: 'With retry',
        props: {
          title: 'Failed to load',
          message: 'Market data failed to load. Check your connection.',
          onRetry: () => {},
        },
      },
      {
        id: 'no-retry',
        label: 'No retry',
        props: { title: 'Chart unavailable', message: 'This chart is temporarily unavailable.' },
      },
      {
        id: 'minimal',
        label: 'Minimal',
        props: { title: 'Failed to load' },
      },
    ],
    isPrimitive: true,
    importSnippet: `import { ErrorState } from '@kenresearch/design-system/charts';`,
    exampleSnippet: `<ErrorState
  message="Market data failed to load. Check your connection."
  onRetry={() => refetch()}
/>

{/* Minimal — no retry */}
<ErrorState title="Chart unavailable" />`,
    propsTable: [
      { name: 'title', type: 'string', default: "'Failed to load'", description: 'Error state title' },
      { name: 'message', type: 'string', description: '1–2 sentence explanation of the error · max 40ch' },
      { name: 'onRetry', type: '() => void', description: 'Retry callback · renders DS Button variant=brand when provided' },
      { name: 'className', type: 'string', description: 'Optional className on wrapper' },
    ],
    a11y: 'role="alert" + aria-live="assertive" — announces to screen readers immediately. AlertCircle icon aria-hidden. Retry button keyboard accessible.',
    tokensUsed: [
      { name: '--color-brand-red', category: 'color', usage: 'AlertCircle icon + title text' },
      { name: '--semantic-ink-muted', category: 'color', usage: 'Error message body text' },
      { name: '--semantic-bg-page', category: 'color', usage: 'Background fallback' },
    ],
  },
  // ─── ASYNC DEMO ──────────────────────────────────────────────────────────────

  {
    id: 'state-async-fetch',
    category: 'state',
    name: 'AsyncFetchDemo',
    description: 'Live async data-fetch simulation. ChartSkeleton → 1.5s → KenColumnChart. "Refetch" triggers reload. "Simulate error" forces ErrorState with retry. Real-world loading flow.',
    importPath: '@kenresearch/design-system/charts',
    Component: AsyncFetchDemo,
    defaultProps: {},
    isPrimitive: true,
    importSnippet: `import { ChartSkeleton, ErrorState } from '@kenresearch/design-system/charts';`,
    exampleSnippet: `// Async loading pattern
const [state, setState] = useState<'loading' | 'loaded' | 'error'>('loading');

useEffect(() => {
  fetchChartData()
    .then(data => { setData(data); setState('loaded'); })
    .catch(() => setState('error'));
}, []);

{state === 'loading' && <ChartSkeleton type="bar" height={280} />}
{state === 'loaded'  && <KenColumnChart labels={labels} data={data} height={280} />}
{state === 'error'   && <ErrorState message="Failed to load" onRetry={refetch} />}`,
    propsTable: [],
    a11y: 'ChartSkeleton: role="status" aria-label="Loading chart". ErrorState: role="alert" aria-live="assertive". Retry button keyboard accessible. State badge communicates status textually.',
    tokensUsed: [
      { name: '--semantic-ink-strong', category: 'color', usage: 'State badge text' },
      { name: '--color-brand-red', category: 'color', usage: 'Error state icon + text' },
      { name: '--color-ramp-periwinkle-400', category: 'color', usage: 'Chart series color (loaded state)' },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // SPRINT C · NEW CHARTS
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'chart-treemap',
    category: 'chart',
    name: 'KenTreemap',
    description: 'D3 squarified treemap · luminance-stepped tier colors (L*30/45/62/90 · color-blind safe) · hover/tap any cell → CellTooltip portal (full name + pallets + share + tier · white bg + periwinkle border · no z-clip) · border accent on focused cell (replaces opacity dim) · per-cell adaptive font sizes · optional tier legend + italic caption. §07 Ecosystem · §11 Industry sizing.',
    importPath: '@kenresearch/design-system/charts',
    Component: KenTreemap,
    defaultProps: {
      data: TREEMAP_DATA,
      height: 400,
      ariaLabel: 'Cold-chain operator capacity treemap',
      legend: [
        { tier: 1 as const, label: 'Tier 1', range: '> 200,000 pallets' },
        { tier: 2 as const, label: 'Tier 2', range: '40,000–200,000 pallets' },
        { tier: 3 as const, label: 'Tier 3', range: '< 40,000 pallets' },
      ],
      caption: 'Box area is proportional to pallet capacity. Source: Ken Research Analysis.',
    },
    variants: [
      {
        id: 'default',
        label: 'Default (10 cells + legend)',
        props: {
          data: TREEMAP_DATA,
          height: 400,
          legend: [
            { tier: 1 as const, label: 'Tier 1', range: '> 200,000 pallets' },
            { tier: 2 as const, label: 'Tier 2', range: '40,000–200,000 pallets' },
            { tier: 3 as const, label: 'Tier 3', range: '< 40,000 pallets' },
          ],
          caption: 'Box area is proportional to pallet capacity. Source: Ken Research Analysis.',
        },
      },
      {
        id: 'compact',
        label: 'Compact (5 cells, no legend)',
        props: { data: TREEMAP_DATA.slice(0, 5), height: 300 },
      },
      {
        id: 'dark',
        label: 'Dark surface',
        props: {
          data: TREEMAP_DATA,
          height: 400,
          surface: 'dark',
          legend: [
            { tier: 1 as const, label: 'Tier 1', range: '> 200,000 pallets' },
            { tier: 2 as const, label: 'Tier 2', range: '40,000–200,000 pallets' },
            { tier: 3 as const, label: 'Tier 3', range: '< 40,000 pallets' },
          ],
        },
      },
    ],
    surfaces: ['light', 'dark'],
    importSnippet: `import { KenTreemap } from '@kenresearch/design-system/charts';`,
    exampleSnippet: `<KenTreemap
  data={[
    { id: 'lineage',   name: 'Lineage',   value: 590000, tier: 1,
      subText: '590,000 pallets', metaText: '12.5% share' },
    { id: 'americold', name: 'Americold', value: 226000, tier: 2,
      subText: '226,000 pallets', metaText: '4.8% share' },
  ]}
  height={400}
  legend={[
    { tier: 1, label: 'Tier 1', range: '> 200,000 pallets' },
    { tier: 2, label: 'Tier 2', range: '40,000–200,000 pallets' },
    { tier: 3, label: 'Tier 3', range: '< 40,000 pallets' },
  ]}
  caption="Box area proportional to pallet capacity."
  onCellClick={(cell) => console.log(cell.name)}
/>`,
    propsTable: [
      { name: 'data',          type: 'readonly TreemapCellData[]', required: true, description: 'Array of cells · id + name + value · optional tier, subText, metaText' },
      { name: 'height',        type: 'number',   default: 'auto (width × 0.5, min 360)', description: 'Chart height px' },
      { name: 'legend',        type: 'Array<{ tier: 1|2|3; label: string; range: string }>', description: 'Optional legend strip above treemap' },
      { name: 'caption',       type: 'string',   description: 'Optional italic caption below treemap' },
      { name: 'surface',       type: "'light' | 'dark'", default: "'light'", description: 'Surface context for theming' },
      { name: 'onCellClick',   type: '(cell: TreemapCellData) => void', description: 'Click callback · receives clicked cell data' },
      { name: 'loading',       type: 'boolean',  description: 'Show ChartSkeleton instead of chart' },
      { name: 'empty',         type: 'boolean',  description: 'Show ChartEmptyState' },
      { name: 'errorMessage',  type: 'string',   description: 'Show ErrorState with message' },
      { name: 'disableReveal', type: 'boolean',  default: 'false', description: 'Disable ChartReveal entrance animation' },
      { name: 'ariaLabel',     type: 'string',   description: 'ARIA label for screen readers' },
      { name: 'className',     type: 'string',   description: 'Optional className on outer wrapper' },
    ],
    a11y: 'role="img" + aria-label on outer wrapper. Per-cell role="button" + tabIndex=0 + aria-label. Keyboard: Enter/Space fires onCellClick. useReducedMotion respected (disables hover transition). focus-visible ring via SVG rect.',
    stateDemos: { loading: true, empty: true, error: 'Failed to load treemap data' },
    skeletonType: 'generic',
    tokensUsed: [
      { name: '--semantic-ink-strong', category: 'color', usage: 'Cell label text (tier 2+3)' },
      { name: '--semantic-ink-body',   category: 'color', usage: 'Legend body text' },
      { name: '--semantic-ink-subtle', category: 'color', usage: 'Legend range text + caption' },
      { name: '--radius-sm',           category: 'other', usage: 'Outer container border-radius' },
      { name: '--font-sans',           category: 'typography', usage: 'DM Sans — all text in cells' },
    ],
  },

  {
    id: 'chart-heatmap',
    category: 'chart',
    name: 'KenHeatmap',
    description: 'N×M CSS-grid heatmap · luminance-stepped tier colors (L*62/78/90 · color-blind safe) · hover/tap any cell → CellTooltip (rowKey × colKey + value + star rating + tier) · periwinkle inset border accent on hover (replaces opacity dim) · optional star-rating overlay · sparse cells OK. §13 D-S Gap · §11 Industry driver grid · §17 Opportunity matrix.',
    importPath: '@kenresearch/design-system/charts',
    Component: KenHeatmap,
    defaultProps: {
      rows: HEATMAP_ROWS,
      cols: HEATMAP_COLS,
      cells: HEATMAP_CELLS,
      cellSize: 80,
      showStars: false,
      ariaLabel: 'Industry × capability heatmap',
    },
    variants: [
      {
        id: 'default',
        label: 'Default (no stars)',
        props: { rows: HEATMAP_ROWS, cols: HEATMAP_COLS, cells: HEATMAP_CELLS, cellSize: 80, showStars: false },
      },
      {
        id: 'with-stars',
        label: 'With star ratings',
        props: { rows: HEATMAP_ROWS, cols: HEATMAP_COLS, cells: HEATMAP_CELLS, cellSize: 80, showStars: true },
      },
      {
        id: 'large-cells',
        label: 'Large cells (100px)',
        props: { rows: HEATMAP_ROWS, cols: HEATMAP_COLS, cells: HEATMAP_CELLS, cellSize: 100, showStars: true },
      },
    ],
    surfaces: ['light', 'dark'],
    importSnippet: `import { KenHeatmap } from '@kenresearch/design-system/charts';`,
    exampleSnippet: `<KenHeatmap
  rows={['Pharma', 'Food', 'Dairy']}
  cols={['Storage', 'Transport', 'Last-mile']}
  cells={[
    { rowKey: 'Pharma', colKey: 'Storage', value: 9.2, starRating: 5 },
  ]}
  showStars
  cellSize={80}
/>`,
    propsTable: [
      { name: 'rows',          type: 'readonly string[]', required: true, description: 'Row keys — rendered as left-column labels' },
      { name: 'cols',          type: 'readonly string[]', required: true, description: 'Column keys — rendered as top-row labels' },
      { name: 'cells',         type: 'readonly HeatmapCell[]', required: true, description: 'Cell data — sparse OK (missing combos = empty cell)' },
      { name: 'cellSize',      type: 'number',  default: '80',    description: 'Cell size px (square)' },
      { name: 'showStars',     type: 'boolean', default: 'false', description: 'Show star-rating overlay top-right of each cell' },
      { name: 'surface',       type: "'light' | 'dark'", default: "'light'", description: 'Surface context — affects header + value text colors' },
      { name: 'onCellClick',   type: '(cell: HeatmapCell) => void', description: 'Click callback' },
      { name: 'loading',       type: 'boolean', description: 'Show ChartSkeleton' },
      { name: 'empty',         type: 'boolean', description: 'Show ChartEmptyState' },
      { name: 'errorMessage',  type: 'string',  description: 'Show ErrorState' },
      { name: 'disableReveal', type: 'boolean', default: 'false', description: 'Disable ChartReveal entrance' },
      { name: 'ariaLabel',     type: 'string',  description: 'ARIA label for the table' },
    ],
    a11y: 'role="table" on grid container · role="columnheader" + role="rowheader" + role="cell" · aria-label per data cell includes value + star rating. Keyboard: tabIndex on clickable cells · Enter/Space triggers onCellClick. Focus-visible ring at rgba(148,136,236,0.6). useReducedMotion: hover transitions disabled.',
    stateDemos: { loading: true, empty: true, error: 'Failed to load heatmap data' },
    skeletonType: 'generic',
    tokensUsed: [
      { name: '--color-ramp-periwinkle-400', category: 'color', usage: 'High-value cell fill (KEN_CHART_SERIES_ARRAY[0])' },
      { name: '--color-ramp-periwinkle-200', category: 'color', usage: 'Mid-value cell fill' },
      { name: '--color-ramp-periwinkle-50', category: 'color', usage: 'Low-value cell fill' },
      { name: '--semantic-ink-strong', category: 'color', usage: 'Cell value label text' },
      { name: '--font-body', category: 'typography', usage: 'DM Sans — cell values + header labels' },
      { name: '--space-2', category: 'spacing', usage: 'Cell gap' },
    ],
  },

  {
    id: 'chart-keyword-scatter',
    category: 'chart',
    name: 'KenKeywordScatter',
    description: 'Positioned keyword cloud · dual-encoding (font-size + opacity) · DM Sans only · deterministic spiral layout. Hover lift + scale. Click callback. §11 Industry trends · §16 Strategic signals.',
    importPath: '@kenresearch/design-system/charts',
    Component: KenKeywordScatter,
    defaultProps: {
      keywords: KEYWORD_DATA,
      width: 800,
      height: 360,
      minFontSize: 11,
      maxFontSize: 28,
      ariaLabel: 'Strategic keyword importance chart',
    },
    variants: [
      {
        id: 'default',
        label: 'Default (25 keywords)',
        props: { keywords: KEYWORD_DATA, width: 800, height: 360 },
      },
      {
        id: 'compact',
        label: 'Compact (12 keywords)',
        props: { keywords: KEYWORD_DATA.slice(0, 12), width: 600, height: 300 },
      },
      {
        id: 'tight-range',
        label: 'Tight font range',
        props: { keywords: KEYWORD_DATA, width: 800, height: 360, minFontSize: 13, maxFontSize: 22 },
      },
    ],
    surfaces: ['light', 'dark'],
    importSnippet: `import { KenKeywordScatter } from '@kenresearch/design-system/charts';`,
    exampleSnippet: `<KenKeywordScatter
  keywords={[
    { id: 'k1', text: 'AI-Vision QC',   weight: 1.0 },
    { id: 'k2', text: 'Reefer-EV',      weight: 0.85 },
    { id: 'k3', text: 'IoT Monitoring', weight: 0.72 },
  ]}
  width={800}
  height={360}
  onKeywordClick={(kw) => console.log(kw.text)}
/>`,
    propsTable: [
      { name: 'keywords',      type: 'readonly KeywordItem[]', required: true, description: 'Keywords · id + text + weight (0-1) · optional color override' },
      { name: 'width',         type: 'number', default: '800', description: 'Container width px' },
      { name: 'height',        type: 'number', default: '400', description: 'Container height px' },
      { name: 'minFontSize',   type: 'number', default: '11',  description: 'Font size px at weight=0' },
      { name: 'maxFontSize',   type: 'number', default: '28',  description: 'Font size px at weight=1' },
      { name: 'minOpacity',    type: 'number', default: '0.45', description: 'Opacity at weight=0' },
      { name: 'maxOpacity',    type: 'number', default: '1',   description: 'Opacity at weight=1' },
      { name: 'surface',       type: "'light' | 'dark'", default: "'light'", description: 'Surface context' },
      { name: 'onKeywordClick', type: '(keyword: KeywordItem) => void', description: 'Click callback per keyword' },
      { name: 'loading',       type: 'boolean', description: 'Show ChartSkeleton (bubble type)' },
      { name: 'empty',         type: 'boolean', description: 'Show ChartEmptyState' },
      { name: 'errorMessage',  type: 'string',  description: 'Show ErrorState' },
      { name: 'disableReveal', type: 'boolean', default: 'false', description: 'Disable ChartReveal entrance' },
    ],
    a11y: 'role="list" container · role="listitem" per keyword · aria-label per keyword includes text + weight %. Keyboard: tabIndex on clickable keywords · Enter/Space triggers callback. Focus-visible outline. useReducedMotion: hover transitions disabled.',
    stateDemos: { loading: true, empty: true, error: 'Failed to load keyword data' },
    skeletonType: 'bubble',
    tokensUsed: [
      { name: '--color-ramp-periwinkle-400', category: 'color', usage: 'High-weight keyword color' },
      { name: '--color-ramp-periwinkle-300', category: 'color', usage: 'Mid-weight keyword color' },
      { name: '--semantic-ink-body', category: 'color', usage: 'Low-weight keyword color' },
      { name: '--font-body', category: 'typography', usage: 'DM Sans — keyword labels (only body font used)' },
    ],
  },

  {
    id: 'chart-gantt-timeline',
    category: 'chart',
    name: 'KenGanttTimeline',
    description: 'CSS-grid phase timeline · luminance-stepped 5-phase colors (L*30→45→62→78→90 · color-blind safe) · entity names via TruncatedText (200px col · tooltip shows phases summary) · hover/tap phase cell → CellTooltip (entity + period + phase) · periwinkle inset border accent on row/cell hover (replaces opacity dim). §16 Future Outlook pipeline.',
    importPath: '@kenresearch/design-system/charts',
    Component: KenGanttTimeline,
    defaultProps: {
      periods: GANTT_PERIODS,
      entries: GANTT_ENTRIES,
      rowHeight: 48,
      ariaLabel: 'Cold-chain operator pipeline FY25–FY30',
    },
    variants: [
      {
        id: 'default',
        label: 'Default (7 entities)',
        props: { periods: GANTT_PERIODS, entries: GANTT_ENTRIES, rowHeight: 48 },
      },
      {
        id: 'compact',
        label: 'Compact rows (36px)',
        props: { periods: GANTT_PERIODS, entries: GANTT_ENTRIES, rowHeight: 36 },
      },
      {
        id: 'spacious',
        label: 'Spacious rows (60px)',
        props: { periods: GANTT_PERIODS, entries: GANTT_ENTRIES, rowHeight: 60 },
      },
    ],
    surfaces: ['light', 'dark'],
    importSnippet: `import { KenGanttTimeline } from '@kenresearch/design-system/charts';`,
    exampleSnippet: `<KenGanttTimeline
  periods={['FY25','FY26','FY27','FY28','FY29','FY30']}
  entries={[
    { id: 'e1', entityName: 'Lineage Sydney NDC', phases: [
      { period: 'FY25', phase: 'planning' },
      { period: 'FY26', phase: 'build' },
      { period: 'FY27', phase: 'commissioning' },
      { period: 'FY28', phase: 'live' },
    ]},
  ]}
  rowHeight={48}
/>`,
    propsTable: [
      { name: 'periods',       type: 'readonly string[]', required: true, description: 'Column headers · e.g. FY25, FY26, ...' },
      { name: 'entries',       type: 'readonly GanttEntry[]', required: true, description: 'Row entries · entityName + phases array (period + phase + optional label)' },
      { name: 'rowHeight',     type: 'number', default: '48', description: 'Row height px' },
      { name: 'surface',       type: "'light' | 'dark'", default: "'light'", description: 'Surface context' },
      { name: 'onCellClick',   type: '(entry: GanttEntry, period: string) => void', description: 'Click callback — receives entry + period string' },
      { name: 'loading',       type: 'boolean', description: 'Show ChartSkeleton' },
      { name: 'empty',         type: 'boolean', description: 'Show ChartEmptyState' },
      { name: 'errorMessage',  type: 'string',  description: 'Show ErrorState' },
      { name: 'disableReveal', type: 'boolean', default: 'false', description: 'Disable ChartReveal entrance' },
      { name: 'ariaLabel',     type: 'string',  description: 'ARIA label for the timeline table' },
    ],
    a11y: 'role="table" + role="columnheader" + role="rowheader" + role="cell" · aria-label per cell includes entity + period + phase. Keyboard: tabIndex on clickable cells · Enter/Space triggers onCellClick. Focus ring inset. useReducedMotion: hover box-shadow disabled.',
    stateDemos: { loading: true, empty: true, error: 'Failed to load pipeline data' },
    skeletonType: 'generic',
    tokensUsed: [
      { name: '--color-ramp-periwinkle-600', category: 'color', usage: 'Phase: live (darkest ramp)' },
      { name: '--color-ramp-periwinkle-400', category: 'color', usage: 'Phase: build + commissioning' },
      { name: '--color-ramp-periwinkle-200', category: 'color', usage: 'Phase: planning (lightest ramp)' },
      { name: '--semantic-ink-strong', category: 'color', usage: 'Entity row labels' },
      { name: '--font-body', category: 'typography', usage: 'DM Sans — headers + phase labels' },
      { name: '--space-3', category: 'spacing', usage: 'Cell padding (standard row height)' },
    ],
  },
];

// ─── Category meta ────────────────────────────────────────────────────────────

export const CATEGORY_META: Record<DemoCategory, { label: string; description: string }> = {
  primitive: {
    label: 'Primitives',
    description: 'Base wrappers — ChartFigure · ChartReveal · TableShell. Required chrome for all charts.',
  },
  chart: {
    label: 'Charts',
    description: '11 chart wrappers — Column · Bar · Dual Column · Bubble · Donut · Multi-line · Scenario Fan · Treemap · Heatmap · Keyword Scatter · Gantt Timeline.',
  },
  table: {
    label: 'Tables',
    description: 'PropertyTable (comparison matrix) · RankingTable (opportunity ranking) — both via TableShell.',
  },
  state: {
    label: 'States',
    description: 'ChartSkeleton · TableSkeleton · ChartEmptyState · ErrorState — loading / empty / error contract.',
  },
};

export const CATEGORY_ORDER: DemoCategory[] = ['primitive', 'chart', 'table', 'state'];
