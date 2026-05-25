'use client';

/**
 * RankingTable · ranked opportunity/leaderboard table · Ken DS table component.
 *
 * WHY  · McKinsey/CB Insights ranking tables establish prioritization frame ·
 *        score bars communicate relative magnitude instantly (no need to parse
 *        numbers) · gating of lower rows creates lead-gen hook without hiding
 *        the top signal (top N = free value · analyst credibility established).
 *
 * WHAT · Ranked list of N rows · cols: Rank · Name+detail · Metric1 · ScoreBar ·
 *        ScoreBar · Chip · WeightedScore. Top `gatedFrom` rows highlighted bg ·
 *        remaining rows optionally gated via `GatedContent` slot.
 *        ONE single `<table>` element for all rows (no split-table pattern).
 *
 * WHEN · §17 Opportunities · below MetricStrip · above SourceCluster.
 *        Reusable for any ranked dataset (competitorranking · driver ranking etc).
 *
 * WHERE · `design-system/core-v2/src/charts/tables/RankingTable.tsx`
 *         Consumed via `@kenresearch/design-system/charts`.
 *
 * HOW  · ```tsx
 *        <RankingTable
 *          rows={OPPORTUNITIES}
 *          columns={COLUMN_DEFS}
 *          topHighlightCount={3}
 *        />
 *        ```
 *
 * Bug fixes applied during DS port (2026-05-25):
 *   - §17 had TWO `<table>` elements (top 3 + bottom 4) with width mismatch
 *     (864px vs 830px) and density mismatch (45px vs 62px row heights).
 *     FIX: ONE table · all rows · uniform `density="standard"` (40px).
 *   - Header opacity was 0.45 → WCAG AA fail at small text.
 *     FIX: raised to 0.60 (`KEN_INK.muted` = rgba(0,0,0,0.60)).
 *   - Header bg transparent → FIX: TableShell `headerWash` applies periwinkle wash.
 *   - Score bar color hardcoded hex → FIX: uses KEN_CHART_SERIES.primary from tokens.
 *
 * Consumer note: gating of bottom rows is handled via the `gatedContent` prop.
 * Pass a `<GatedBlock>` with `<PremiumLockCard>` containing the bottom rows.
 * This keeps the DS component free of project-specific gating atoms.
 *
 * A11y · `aria-label` on `<table>` via TableShell `ariaLabel`.
 *        `scope="col"` on `<th>` · sticky header via `stickyHeader` prop.
 *        Score bars have `role="img"` + `aria-label` for assistive tech.
 *
 * @promotedFrom projects/v1-project/v1-product-page-ver0.4/src/components/atoms/OpportunityRankingTable.tsx
 * @relatedDoc design-system/core-v2/src/charts/primitives/TableShell.tsx
 * @relatedDoc design-system/core-v2/src/charts/theme/tokens.ts
 */

import type { ReactNode } from 'react';
import { TableShell, useTableDensity, type TableDensity } from '../primitives/TableShell';
import { KEN_CHART_SERIES, KEN_INK } from '../theme/tokens';

// ─── Score bar ────────────────────────────────────────────────────────────────

interface ScoreBarProps {
  score: number;
  max?: number;
}

/**
 * ScoreBar · inline 1–10 bar with periwinkle gradient.
 * Color: KEN_CHART_SERIES.primary (not hardcoded hex).
 */
function ScoreBar({ score, max = 10 }: ScoreBarProps) {
  const pct = (score / max) * 100;
  return (
    <div className="flex items-center gap-2 min-w-[80px]">
      <div
        className="relative flex-1 h-[6px] rounded-full overflow-hidden"
        // Track: 15% opacity of primary token
        style={{ background: `${KEN_CHART_SERIES.primary}26` }}
        role="img"
        aria-label={`Score ${score} of ${max}`}
      >
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            width: `${pct}%`,
            // Gradient: secondary → primary → quaternary (periwinkle ramp)
            background: `linear-gradient(90deg, ${KEN_CHART_SERIES.secondary} 0%, ${KEN_CHART_SERIES.primary} 60%, ${KEN_CHART_SERIES.quaternary} 100%)`,
          }}
        />
      </div>
      <span
        className="font-body tabular-nums text-[var(--semantic-ink-body)] flex-none"
        style={{ fontSize: '12px', fontVariantNumeric: 'tabular-nums', minWidth: '24px' }}
      >
        {score.toFixed(1)}
      </span>
    </div>
  );
}

// ─── Types · generic row interface ────────────────────────────────────────────

/** One ranked opportunity row */
export interface RankingRow {
  rank: number;
  name: string;
  detail: string;
  /** Primary metric · e.g. TAM in AUD Mn */
  primaryMetric: number;
  /** Primary metric label prefix (e.g. "AUD") */
  primaryMetricPrefix?: string;
  /** Primary metric unit suffix (e.g. "Mn") */
  primaryMetricUnit?: string;
  /** First score (e.g. Impact) · 1–10 · renders as score bar */
  score1: number;
  /** Second score (e.g. Feasibility) · 1–10 · renders as score bar */
  score2: number;
  /** Chip label · e.g. "14mo" */
  chipLabel: string;
  /** Chip urgency · fast=periwinkle · medium=blue · slow=neutral */
  chipUrgency?: 'fast' | 'medium' | 'slow';
  /** Weighted/composite score · right-aligned */
  weightedScore: number;
}

/** Column header labels */
export interface RankingTableColumns {
  primaryMetric: string;
  score1: string;
  score2: string;
  chip: string;
  weightedScore: string;
}

export interface RankingTableProps {
  /** All rows · sorted by rank (caller is responsible for ordering) */
  rows: readonly RankingRow[];
  /** Column header labels */
  columns: RankingTableColumns;
  /**
   * Number of top rows highlighted with a subtle periwinkle bg tint.
   * Typically 3 (top-3 signal). Set 0 to disable.
   * @default 3
   */
  topHighlightCount?: number;
  /**
   * Row density · controls row height via TableShell context.
   * @default 'standard' (40px per ref)
   */
  density?: TableDensity;
  /**
   * Sticky header for long tables (>12 rows recommended).
   * @default true
   */
  stickyHeader?: boolean;
  /**
   * Optional: content to render BELOW the visible rows (e.g. GatedBlock with remaining rows).
   * Pass a GatedBlock containing a second <table> with rows.
   * The gated table MUST omit <thead> and use the same column order.
   */
  gatedContent?: ReactNode;
  /** Legend / footnote text below the table */
  footnote?: string;
  /** ARIA label for the table */
  ariaLabel?: string;
  /** Optional className passthrough */
  className?: string;
}

// ─── Chip component ───────────────────────────────────────────────────────────

const CHIP_STYLES = {
  fast:   { bg: `${KEN_CHART_SERIES.primary}1f`,    text: 'var(--semantic-ink-body)' },
  medium: { bg: `${KEN_CHART_SERIES.tertiary}26`,   text: 'var(--semantic-ink-body)' },
  slow:   { bg: 'rgba(0,0,0,0.04)',                  text: 'var(--semantic-ink-muted)' },
} as const;

function Chip({ label, urgency = 'slow' }: { label: string; urgency?: 'fast' | 'medium' | 'slow' }) {
  const style = CHIP_STYLES[urgency];
  return (
    <span
      className="inline-block rounded-[3px] px-1.5 py-0.5 font-body tabular-nums"
      style={{ fontSize: '11px', fontWeight: 500, background: style.bg, color: style.text }}
    >
      {label}
    </span>
  );
}

// ─── Row inner ────────────────────────────────────────────────────────────────

function RankingRowInner({ row, isTop }: { row: RankingRow; isTop: boolean }) {
  const rowHeightPx = useTableDensity();
  return (
    <tr
      className="group border-b border-[rgba(0,0,0,0.08)] last:border-0 transition-colors"
      style={{
        height: `${rowHeightPx}px`,
        background: isTop ? `${KEN_CHART_SERIES.primary}0a` : undefined,
      }}
    >
      {/* Rank */}
      <td className="py-2.5 pr-4 align-middle">
        <span
          className="inline-flex items-center justify-center w-6 h-6 rounded-full font-body font-semibold"
          style={{
            fontSize: '11px',
            background: isTop ? `${KEN_CHART_SERIES.primary}2e` : 'rgba(0,0,0,0.04)',
            color: isTop ? KEN_CHART_SERIES.quaternary : 'var(--semantic-ink-muted)',
          }}
        >
          {row.rank}
        </span>
      </td>

      {/* Name + detail */}
      <td className="py-2.5 pr-5 align-middle min-w-[160px]">
        <p
          className="font-body font-medium text-[var(--semantic-ink-strong)] leading-snug mb-0.5"
          style={{ fontSize: '13px' }}
        >
          {row.name}
        </p>
        <p
          className="font-body text-[var(--semantic-ink-muted)] leading-snug"
          style={{ fontSize: '11px' }}
        >
          {row.detail}
        </p>
      </td>

      {/* Primary metric */}
      <td className="py-2.5 pr-5 align-middle text-right whitespace-nowrap">
        <span
          className="font-body tabular-nums text-[var(--semantic-ink-body)]"
          style={{ fontSize: '13px', fontVariantNumeric: 'tabular-nums' }}
        >
          {row.primaryMetricPrefix ? `${row.primaryMetricPrefix} ` : ''}
          {row.primaryMetric.toLocaleString('en-US')}
          {row.primaryMetricUnit ? ` ${row.primaryMetricUnit}` : ''}
        </span>
      </td>

      {/* Score 1 bar */}
      <td className="py-2.5 pr-5 align-middle">
        <ScoreBar score={row.score1} />
      </td>

      {/* Score 2 bar */}
      <td className="py-2.5 pr-5 align-middle">
        <ScoreBar score={row.score2} />
      </td>

      {/* Chip */}
      <td className="py-2.5 pr-5 align-middle">
        <Chip label={row.chipLabel} urgency={row.chipUrgency} />
      </td>

      {/* Weighted score */}
      <td className="py-2.5 align-middle text-right">
        <span
          className="font-body font-medium tabular-nums"
          style={{
            fontSize: '13px',
            color: isTop ? KEN_CHART_SERIES.quaternary : 'var(--semantic-ink-body)',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {row.weightedScore.toFixed(1)}
        </span>
      </td>
    </tr>
  );
}

// ─── Header row inner ─────────────────────────────────────────────────────────

function HeaderRow({ columns }: { columns: RankingTableColumns }) {
  // FIX (Bug 5 · 2026-05-25): header opacity raised from 0.45 → 0.60
  // (KEN_INK.muted = rgba(0,0,0,0.60)) for WCAG AA contrast at 10px/600 text
  const headerStyle = { fontSize: '10px', fontWeight: 600, color: KEN_INK.muted };

  return (
    <thead>
      <tr className="border-b border-[rgba(0,0,0,0.12)]">
        <th
          scope="col"
          className="pb-3 pr-4 text-left font-body uppercase tracking-[0.1em]"
          style={headerStyle}
        >
          #
        </th>
        <th
          scope="col"
          className="pb-3 pr-5 text-left font-body uppercase tracking-[0.1em]"
          style={headerStyle}
        >
          Opportunity
        </th>
        <th
          scope="col"
          className="pb-3 pr-5 text-right font-body uppercase tracking-[0.1em] whitespace-nowrap"
          style={headerStyle}
        >
          {columns.primaryMetric}
        </th>
        <th
          scope="col"
          className="pb-3 pr-5 text-left font-body uppercase tracking-[0.1em] min-w-[110px]"
          style={headerStyle}
        >
          {columns.score1}
        </th>
        <th
          scope="col"
          className="pb-3 pr-5 text-left font-body uppercase tracking-[0.1em] min-w-[110px]"
          style={headerStyle}
        >
          {columns.score2}
        </th>
        <th
          scope="col"
          className="pb-3 pr-5 text-left font-body uppercase tracking-[0.1em] whitespace-nowrap"
          style={headerStyle}
        >
          {columns.chip}
        </th>
        <th
          scope="col"
          className="pb-3 text-right font-body uppercase tracking-[0.1em] whitespace-nowrap"
          style={headerStyle}
        >
          {columns.weightedScore}
        </th>
      </tr>
    </thead>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function RankingTable({
  rows,
  columns,
  topHighlightCount = 3,
  density = 'standard',
  stickyHeader = true,
  gatedContent,
  footnote,
  ariaLabel,
  className,
}: RankingTableProps) {
  return (
    <div className={['w-full', className ?? ''].join(' ')}>
      <TableShell
        density={density}
        stickyHeader={stickyHeader}
        headerWash={true}
        ariaLabel={ariaLabel ?? 'Ranked table'}
        caption="Ranked opportunity table"
      >
        <HeaderRow columns={columns} />
        <tbody>
          {rows.map((row) => (
            <RankingRowInner
              key={row.rank}
              row={row}
              isTop={row.rank <= topHighlightCount}
            />
          ))}
        </tbody>
      </TableShell>

      {/* Gated rows slot · consumer provides GatedBlock with remaining rows */}
      {gatedContent}

      {/* Footnote / legend */}
      {footnote && (
        <p
          className="font-body italic text-[var(--semantic-ink-subtle)] mt-3"
          style={{ fontSize: '10.5px', lineHeight: 1.5 }}
        >
          {footnote}
        </p>
      )}
    </div>
  );
}
