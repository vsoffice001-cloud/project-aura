/**
 * Ken Design System · Charts barrel
 *
 * Import primitives, theme tokens, and chart wrappers from this single entry point:
 *   import { ChartReveal, KenBubbleChart, PropertyTable, KEN_CHART_SERIES } from '@kenresearch/design-system/charts';
 *
 * SSR note: Highcharts is browser-only.
 *   Wrap any chart component with next/dynamic({ ssr: false }) in Next.js consumers.
 *
 * Phase A.1 exports (Sprint 2026-05-25):
 *   - Primitives: ChartFigure · ChartReveal · TableShell + context
 *   - Theme:      buildKenChartBase · KEN_CHART_* tokens
 *
 * Phase A.2 exports (Sprint 2026-05-25):
 *   - charts/  7 Ken*Chart wrappers (KenBarChart · KenBubbleChart · KenColumnChart ·
 *              KenDonutChart · KenDualColumnChart · KenMultiLineChart · KenScenarioFanChart)
 *   - tables/  PropertyTable · RankingTable
 *   - Bug fixes: bubble label ghosting · scenario white spline · row density · split-table
 *
 * Legacy exports (kept for backward compat · v1 DS consumers):
 *   - kenHighchartsTheme · buildKenHighchartsTheme · mergePreset · readToken  (DEPRECATED — use buildKenChartBase)
 *   - chart presets (area · line · pie · bar · column)
 */

// ─── Phase A.2 · Charts ───────────────────────────────────────────────────────
export { KenBarChart } from './charts/KenBarChart';
export type { KenBarChartProps } from './charts/KenBarChart';

export { KenBubbleChart } from './charts/KenBubbleChart';
export type { KenBubbleChartProps, BubblePoint, ChartSurface } from './charts/KenBubbleChart';

export { KenColumnChart } from './charts/KenColumnChart';
export type { KenColumnChartProps } from './charts/KenColumnChart';

export { KenDonutChart } from './charts/KenDonutChart';
export type { KenDonutChartProps, DonutSlice } from './charts/KenDonutChart';

export { KenDualColumnChart } from './charts/KenDualColumnChart';
export type { KenDualColumnChartProps, DualSeries } from './charts/KenDualColumnChart';

export { KenMultiLineChart } from './charts/KenMultiLineChart';
export type { KenMultiLineChartProps, MultiLineSeries } from './charts/KenMultiLineChart';

export { KenScenarioFanChart } from './charts/KenScenarioFanChart';
export type { KenScenarioFanChartProps } from './charts/KenScenarioFanChart';

// ─── Phase A.2 · Tables ───────────────────────────────────────────────────────
export { PropertyTable } from './tables/PropertyTable';
export type { PropertyTableProps, PlayerProperty, PlayerColumn } from './tables/PropertyTable';

export { RankingTable } from './tables/RankingTable';
export type { RankingTableProps, RankingRow, RankingTableColumns } from './tables/RankingTable';

// ─── Phase B.1 · State atoms ──────────────────────────────────────────────────
export { ChartSkeleton } from './states/ChartSkeleton';
export type { ChartSkeletonProps, SkeletonChartType } from './states/ChartSkeleton';

export { TableSkeleton } from './states/TableSkeleton';
export type { TableSkeletonProps } from './states/TableSkeleton';

export { ChartEmptyState } from './states/EmptyState';
export type { ChartEmptyStateProps } from './states/EmptyState';

export { ErrorState } from './states/ErrorState';
export type { ErrorStateProps } from './states/ErrorState';

// ─── Phase A.1 · Primitives ───────────────────────────────────────────────────
export { ChartFigure } from './primitives/ChartFigure';
export type { ChartFigureProps, LegendEntry, LegendKind, SourceInfo } from './primitives/ChartFigure';

export { ChartReveal } from './primitives/ChartReveal';
export type { ChartRevealProps } from './primitives/ChartReveal';

export {
  TableShell,
  TableDensityContext,
  useTableDensity,
  KEN_TABLE,
  KEN_TABLE_DENSITY,
} from './primitives/TableShell';
export type { TableShellProps, TableDensity, TableVariant, TableHeaderStyle } from './primitives/TableShell';

// ─── Phase A.1 · Theme tokens ─────────────────────────────────────────────────
export {
  KEN_CHART_SERIES,
  KEN_CHART_SERIES_ARRAY,
  KEN_INK,
  KEN_CHART_BORDERS,
  KEN_TOOLTIP,
  KEN_CHART_MOTION,
  KEN_CHART_FONT,
} from './theme/tokens';

export { buildKenChartBase, prefersReducedMotion } from './theme/highcharts-base';

// ─── Legacy · v1 DS (kept for backward compat) ───────────────────────────────
// SSR: Highcharts is browser-only — wrap consumer with next/dynamic({ ssr: false })
// Theme reads CSS custom properties at runtime (--chart-palette-1..8, etc.)
export {
  kenHighchartsTheme,
  buildKenHighchartsTheme,
  mergePreset,
  readToken,
} from './highchartsTheme';
export * from './presets/index';
