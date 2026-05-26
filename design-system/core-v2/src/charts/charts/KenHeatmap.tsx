'use client';

/**
 * KenHeatmap · N×M CSS-grid heatmap · Ken DS chart.
 *
 * Mobile strategy (Sprint G.3) · SCROLL:
 *   N×M grid must maintain readable cell sizes — squeezing makes cells too small.
 *   Outer wrapper already has overflow-x:auto.
 *   Sprint G.3: adds overscrollBehaviorX:contain + WebkitOverflowScrolling:touch.
 *   Inner grid gets explicit minWidth = rowLabelWidth + cols × 50px (min readable cell).
 *
 * WHY  · Opportunity and driver analysis needs a cell-grid visualization where
 *        two dimensions cross (e.g. industry × capability). Refs show N×M heatmaps
 *        in §13 Demand-Supply Gap and §11 Industry Analysis — CSS grid gives exact
 *        control over cell size, label placement, and hover UX that Highcharts
 *        heatmap module cannot match without extensive overrides.
 *
 * WHAT · Pure CSS grid · rows × cols · 3-tier periwinkle color encoding (faint/mid/
 *        strong). Optional star-rating overlay per cell. Cell hover: scale 1.02 +
 *        periwinkle ring. Click callback. Sparse cells (missing data) render as
 *        empty with no fill.
 *
 * WHEN · §13 D-S Gap heatmap · §11 Industry driver grid · §17 Opportunity matrix.
 *        Any N×M qualitative/quantitative grid up to ~8×8.
 *
 * WHERE · `design-system/core-v2/src/charts/charts/KenHeatmap.tsx`
 *         Consumed via `@kenresearch/design-system/charts`.
 *
 * HOW  · ```tsx
 *        <KenHeatmap
 *          rows={['Pharma', 'Food', 'Dairy']}
 *          cols={['Storage', 'Transport', 'Last-mile']}
 *          cells={[
 *            { rowKey: 'Pharma', colKey: 'Storage', value: 9.2, starRating: 5 },
 *          ]}
 *          showStars
 *        />
 *        ```
 *
 * A11y · role="table" + caption + column headers + row headers via scope="row".
 *
 * @module design-system/core-v2/src/charts/charts/KenHeatmap
 */

import React, { useMemo, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ChartReveal } from '../primitives/ChartReveal';
import { ChartSkeleton } from '../states/ChartSkeleton';
import { ChartEmptyState } from '../states/EmptyState';
import { ErrorState } from '../states/ErrorState';
import { CellTooltip } from '../primitives/CellTooltip';
import { KEN_CHART_FONT, KEN_CHART_SERIES_LUMINANCE_SAFE } from '../theme/tokens';
import type { ChartSurface } from '../theme/highcharts-base';

// ─── Types ────────────────────────────────────────────────────────────────────

export type HeatmapTier = 'faint' | 'mid' | 'strong';

export interface HeatmapCell {
  rowKey: string;
  colKey: string;
  /** Numeric value — drives auto-tier if tier not provided */
  value: number;
  /** Override auto-tier calculation */
  tier?: HeatmapTier;
  /** Displayed in cell · default = value formatted to 1dp */
  label?: string;
  /** Optional star rating overlay (1-5 stars shown in cell) */
  starRating?: 1 | 2 | 3 | 4 | 5;
}

export interface KenHeatmapProps {
  /** Row keys · rendered as left-column labels */
  rows: readonly string[];
  /** Column keys · rendered as top-row labels */
  cols: readonly string[];
  /** Cell data · sparse OK — missing combos render as empty */
  cells: readonly HeatmapCell[];
  /** Cell size in px · default 80 */
  cellSize?: number;
  /** Show star rating overlay · default false */
  showStars?: boolean;
  /** ARIA label for the table */
  ariaLabel?: string;
  /** Surface context */
  surface?: ChartSurface;
  /** Loading state */
  loading?: boolean;
  /** Empty state */
  empty?: boolean;
  /** Error message */
  errorMessage?: string;
  /** Disable ChartReveal entrance · @default false */
  disableReveal?: boolean;
  /** Cell click callback */
  onCellClick?: (cell: HeatmapCell) => void;
  /** Optional className on outer wrapper */
  className?: string;
}

// ─── Tier color map · luminance-stepped · color-blind safe ───────────────────
// Light surface:
//   faint = L*≈90 (#e0e3fb) · mid = L*≈78 (#c3c6f9) · strong = L*≈62 (#9488ec)
// Dark surface (inverted mapping — faint becomes brightest, strong becomes deepest):
//   faint = L*≈62 (#9488ec) · mid = L*≈78 (#c3c6f9) · strong = L*≈90 (#e0e3fb)
//   Rationale: on near-black bg (#0a0a0c) all L*≥62 tiers have ≥3:1 contrast.
//   "strong" on dark is brightest (most salient) · "faint" is most receded.
// Each step ≥15 L* apart → monochrome conversion still distinguishes tiers.
// Uses KEN_CHART_SERIES_LUMINANCE_SAFE (NOT KEN_CHART_SERIES — Highcharts keeps those).

const TIER_BG_LIGHT: Record<HeatmapTier, string> = {
  faint:  KEN_CHART_SERIES_LUMINANCE_SAFE.light,     // #e0e3fb · L*≈90
  mid:    KEN_CHART_SERIES_LUMINANCE_SAFE.tertiary,  // #c3c6f9 · L*≈78
  strong: KEN_CHART_SERIES_LUMINANCE_SAFE.secondary, // #9488ec · L*≈62
};

const TIER_BG_DARK: Record<HeatmapTier, string> = {
  faint:  KEN_CHART_SERIES_LUMINANCE_SAFE.secondary,  // #9488ec · L*≈62 · most receded on dark
  mid:    KEN_CHART_SERIES_LUMINANCE_SAFE.tertiary,   // #c3c6f9 · L*≈78 · mid on dark
  strong: KEN_CHART_SERIES_LUMINANCE_SAFE.light,      // #e0e3fb · L*≈90 · most prominent on dark
};

// Hover fill boost for dark surface: one step brighter than current tier
const TIER_BG_DARK_HOVER: Record<HeatmapTier, string> = {
  faint:  KEN_CHART_SERIES_LUMINANCE_SAFE.tertiary,   // bump faint → mid brightness
  mid:    KEN_CHART_SERIES_LUMINANCE_SAFE.light,      // bump mid → strong brightness
  strong: KEN_CHART_SERIES_LUMINANCE_SAFE.light,      // already brightest — stays
};

// ─── Auto-tier from value percentile ─────────────────────────────────────────

function computeTier(value: number, sorted: number[]): HeatmapTier {
  const idx = sorted.indexOf(value);
  const pct = sorted.length <= 1 ? 1 : idx / (sorted.length - 1);
  if (pct < 0.33) return 'faint';
  if (pct < 0.67) return 'mid';
  return 'strong';
}

// ─── Star renderer ────────────────────────────────────────────────────────────

function Stars({ rating }: { rating: 1 | 2 | 3 | 4 | 5 }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 4,
        right: 4,
        fontSize: '8px',
        color: 'rgba(148,136,236,0.9)',
        lineHeight: 1,
        letterSpacing: '-1px',
      }}
      aria-label={`${rating} stars`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} style={{ opacity: i < rating ? 1 : 0.25 }}>★</span>
      ))}
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function KenHeatmap({
  rows,
  cols,
  cells,
  cellSize = 80,
  showStars = false,
  ariaLabel,
  surface = 'light',
  loading,
  empty,
  errorMessage,
  disableReveal = false,
  onCellClick,
  className,
}: KenHeatmapProps) {
  const prefersReducedMotion = useReducedMotion();
  const [hoveredCellKey, setHoveredCellKey] = useState<string | null>(null);

  // Build a lookup map rowKey×colKey → HeatmapCell
  const cellMap = useMemo(() => {
    const map = new Map<string, HeatmapCell>();
    for (const cell of cells) {
      map.set(`${cell.rowKey}::${cell.colKey}`, cell);
    }
    return map;
  }, [cells]);

  // Sorted values for percentile-based auto-tier
  const sortedValues = useMemo(
    () => [...cells].map((c) => c.value).sort((a, b) => a - b),
    [cells],
  );

  // Surface-aware text colors
  const isDark = surface === 'dark';
  const headerColor = isDark ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,0.55)';
  const valueFontColor = isDark ? 'rgba(255,255,255,0.9)' : 'rgba(26,26,46,0.85)';

  const rowLabelWidth = 120;
  const headerHeight = 32;

  // State guards AFTER all hooks
  if (loading)      return <ChartSkeleton type="generic" height={(rows.length + 1) * cellSize + headerHeight} />;
  if (empty)        return <ChartEmptyState title="No data available" />;
  if (errorMessage) return <ErrorState message={errorMessage} />;

  // Min-width formula: row label column + N columns × min 50px per cell
  // Ensures scroll rather than squeeze at narrow viewport
  const minWidth = rowLabelWidth + cols.length * 50;

  return (
    <ChartReveal disabled={disableReveal}>
      {/* Mobile strategy: SCROLL · overscroll-behavior contains horizontal swipe */}
      <div
        className={['w-full overflow-x-auto', className ?? ''].join(' ')}
        role="img"
        aria-label={ariaLabel ?? 'Heatmap grid'}
        style={{
          overscrollBehaviorX: 'contain',
          WebkitOverflowScrolling: 'touch',
        } as React.CSSProperties}
      >
        {/* Outer table-like grid */}
        <div
          role="table"
          aria-label={ariaLabel ?? 'Heatmap grid'}
          style={{
            display: 'grid',
            gridTemplateColumns: `${rowLabelWidth}px repeat(${cols.length}, clamp(50px, 5vw, ${cellSize}px))`,
            gridTemplateRows: `${headerHeight}px repeat(${rows.length}, clamp(50px, 5vw, ${cellSize}px))`,
            fontFamily: KEN_CHART_FONT.sans,
            width: 'max-content',
            minWidth,
          }}
        >
          {/* Corner cell */}
          <div role="columnheader" aria-label="Category" style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: 4 }} />

          {/* Column headers */}
          {cols.map((col) => (
            <div
              key={col}
              role="columnheader"
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                paddingBottom: 4,
                fontSize: 10,
                fontWeight: 600,
                color: headerColor,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                textAlign: 'center',
                lineHeight: 1.2,
              }}
            >
              {col}
            </div>
          ))}

          {/* Data rows */}
          {rows.map((row) => (
            <React.Fragment key={`row-${row}`}>
              {/* Row label */}
              <div
                role="rowheader"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  paddingRight: 8,
                  fontSize: 11,
                  fontWeight: 500,
                  color: headerColor,
                }}
              >
                {row}
              </div>


              {/* Row cells */}
              {cols.map((col) => {
                const cell = cellMap.get(`${row}::${col}`);
                if (!cell) {
                  // Empty sparse cell
                  return (
                    <div
                      key={`cell-${row}-${col}`}
                      role="cell"
                      style={{
                        margin: 2,
                        borderRadius: 4,
                        background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
                      }}
                    />
                  );
                }

                const tier = cell.tier ?? computeTier(cell.value, sortedValues);
                const tierBgMap = isDark ? TIER_BG_DARK : TIER_BG_LIGHT;
                const tierBgHoverMap = isDark ? TIER_BG_DARK_HOVER : null;
                const isClickable = !!onCellClick;
                const cellKey = `${row}::${col}`;
                const isHovered = hoveredCellKey === cellKey;
                // Dark surface: brighten fill on hover (Goal 5) + keep border accent
                const bg = (isHovered && isDark && tierBgHoverMap)
                  ? tierBgHoverMap[tier]
                  : tierBgMap[tier];
                const displayLabel = cell.label ?? cell.value.toLocaleString('en-US', { maximumFractionDigits: 1 });
                // CSS transition covers bg color change on surface switch + hover brighten
                const transition = prefersReducedMotion
                  ? undefined
                  : 'background-color 200ms ease-out, color 200ms ease-out, box-shadow 0.15s ease-out';

                // Tooltip: rowKey × colKey + value + star rating + tier
                const tooltipContent = (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <span style={{ fontWeight: 600 }}>{row} × {col}</span>
                    <span style={{ fontSize: '10px', color: 'rgba(26,26,46,0.65)' }}>
                      Value: {displayLabel}
                    </span>
                    {cell.starRating && (
                      <span style={{ fontSize: '10px', color: 'rgba(26,26,46,0.65)' }}>
                        Rating: {cell.starRating}/5
                      </span>
                    )}
                    <span style={{ fontSize: '10px', color: 'rgba(26,26,46,0.50)', marginTop: 1 }}>
                      Tier: {tier}
                    </span>
                  </div>
                );

                return (
                  <CellTooltip key={`cell-${row}-${col}`} content={tooltipContent} position="auto">
                    <div
                      role="cell"
                      data-component="ken-heatmap-cell"
                      tabIndex={isClickable ? 0 : undefined}
                      aria-label={`${row}, ${col}: ${displayLabel}${cell.starRating ? `, ${cell.starRating} stars` : ''}`}
                      onClick={isClickable ? () => onCellClick(cell) : undefined}
                      onKeyDown={isClickable ? (e) => {
                        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onCellClick(cell); }
                      } : undefined}
                      onMouseEnter={() => setHoveredCellKey(cellKey)}
                      onMouseLeave={() => setHoveredCellKey(null)}
                      onFocus={() => setHoveredCellKey(cellKey)}
                      onBlur={() => setHoveredCellKey(null)}
                      style={{
                        position: 'relative',
                        margin: 2,
                        borderRadius: 4,
                        background: bg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 12,
                        fontWeight: 600,
                        color: valueFontColor,
                        cursor: isClickable ? 'pointer' : 'default',
                        transition,
                        // Border accent on hover: periwinkle inset ring — no opacity dim (Sprint G.1 locked)
                        boxShadow: isHovered && !prefersReducedMotion
                          ? 'inset 0 0 0 2px rgb(228,226,240)'
                          : undefined,
                      }}
                    >
                      {showStars && cell.starRating ? <Stars rating={cell.starRating} /> : null}
                      <span style={{ fontVariantNumeric: 'tabular-nums' }}>{displayLabel}</span>
                    </div>
                  </CellTooltip>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </ChartReveal>
  );
}
