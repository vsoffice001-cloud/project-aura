'use client';

/**
 * KenGanttTimeline · CSS-grid pipeline timeline · Ken DS chart.
 *
 * Mobile strategy (Sprint G.3) · SCROLL:
 *   Already has overflow-x:auto + minWidth (120 + periods × 60px).
 *   Sprint G.3: adds overscrollBehaviorX:contain + WebkitOverflowScrolling:touch.
 *   Min-width logic already adapts to period count — no change needed there.
 *
 * WHY  · §16 Future Outlook needs a phase-encoded timeline showing build
 *        progression of entities (warehouses · networks · projects) across
 *        FY periods. Refs use grid-based gantt in strategic planning sections
 *        (rainbow-pothos §16 pipeline). CSS grid gives clean alignment and
 *        avoids Highcharts Gantt module license complexity.
 *
 * WHAT · N entity rows × M FY-period columns · CSS grid. Phase color encoding
 *        via background fill + opacity (planning → build → commissioning → live →
 *        completed). Click callback per cell. Hover ring. Optional cell label.
 *
 * WHEN · §16 Future Outlook pipeline · §08 Market Size capacity build-out ·
 *        any entity × time-period phase visualization.
 *
 * WHERE · `design-system/core-v2/src/charts/charts/KenGanttTimeline.tsx`
 *         Consumed via `@kenresearch/design-system/charts`.
 *
 * HOW  · ```tsx
 *        <KenGanttTimeline
 *          periods={['FY25','FY26','FY27','FY28','FY29','FY30']}
 *          entries={[
 *            { id: 'e1', entityName: 'Lineage Sydney', phases: [
 *                { period: 'FY25', phase: 'planning' },
 *                { period: 'FY26', phase: 'build' },
 *              ]},
 *          ]}
 *        />
 *        ```
 *
 * A11y · role="table" + column/row headers · aria-label per cell.
 *
 * @module design-system/core-v2/src/charts/charts/KenGanttTimeline
 */

import React, { useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ChartReveal } from '../primitives/ChartReveal';
import { ChartSkeleton } from '../states/ChartSkeleton';
import { ChartEmptyState } from '../states/EmptyState';
import { ErrorState } from '../states/ErrorState';
import { CellTooltip } from '../primitives/CellTooltip';
import { TruncatedText } from '../primitives/TruncatedText';
import { KEN_CHART_FONT, KEN_CHART_SERIES_LUMINANCE_SAFE } from '../theme/tokens';
import type { ChartSurface } from '../theme/highcharts-base';

// ─── Types ────────────────────────────────────────────────────────────────────

export type GanttPhase = 'planning' | 'build' | 'commissioning' | 'live' | 'completed';

export interface GanttEntry {
  id: string;
  /** Row label */
  entityName: string;
  /** Phase cells — one per period that has activity. Sparse: missing = empty */
  phases: Array<{
    /** Must match one of the strings in the `periods` prop */
    period: string;
    phase: GanttPhase;
    /** Optional override text in cell · default = phase name */
    label?: string;
  }>;
}

export interface KenGanttTimelineProps {
  /** Column headers · e.g. ['FY25','FY26','FY27','FY28','FY29','FY30'] */
  periods: readonly string[];
  /** Row entries */
  entries: readonly GanttEntry[];
  /** Row height px · default 48 */
  rowHeight?: number;
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
  onCellClick?: (entry: GanttEntry, period: string) => void;
  /** Optional className on outer wrapper */
  className?: string;
}

// ─── Phase color map · luminance-stepped · color-blind safe ──────────────────
// Light surface:
//   planning = L*≈90 (light) · build = L*≈78 (tertiary) · commissioning = L*≈62 (secondary)
//   live = L*≈45 (primary) · completed = L*≈30 (darkest)
// Dark surface (inverted mapping — planning becomes deepest / completed becomes brightest):
//   planning = L*≈30 (darkest) · build = L*≈45 (primary) · commissioning = L*≈62 (secondary)
//   live = L*≈78 (tertiary) · completed = L*≈90 (light)
//   Rationale: on near-black bg (#0a0a0c) the ramp still reads in order (early = dark · done = bright)
//   while maintaining ≥3:1 contrast for all tiers above L*≈30.
// Each step ≥15 L* → monochrome conversion distinguishes all phases.
// Uses KEN_CHART_SERIES_LUMINANCE_SAFE (keeps KEN_CHART_SERIES for Highcharts).

const PHASE_COLORS_LIGHT: Record<GanttPhase, string> = {
  planning:      KEN_CHART_SERIES_LUMINANCE_SAFE.light,      // #e0e3fb · L*≈90
  build:         KEN_CHART_SERIES_LUMINANCE_SAFE.tertiary,   // #c3c6f9 · L*≈78
  commissioning: KEN_CHART_SERIES_LUMINANCE_SAFE.secondary,  // #9488ec · L*≈62
  live:          KEN_CHART_SERIES_LUMINANCE_SAFE.primary,    // #5e51c8 · L*≈45
  completed:     KEN_CHART_SERIES_LUMINANCE_SAFE.darkest,    // #3d3499 · L*≈30
};

const PHASE_COLORS_DARK: Record<GanttPhase, string> = {
  planning:      KEN_CHART_SERIES_LUMINANCE_SAFE.darkest,    // #3d3499 · L*≈30 · earliest = darkest
  build:         KEN_CHART_SERIES_LUMINANCE_SAFE.primary,    // #5e51c8 · L*≈45
  commissioning: KEN_CHART_SERIES_LUMINANCE_SAFE.secondary,  // #9488ec · L*≈62
  live:          KEN_CHART_SERIES_LUMINANCE_SAFE.tertiary,   // #c3c6f9 · L*≈78
  completed:     KEN_CHART_SERIES_LUMINANCE_SAFE.light,      // #e0e3fb · L*≈90 · done = brightest
};

const PHASE_TEXT_COLORS_LIGHT: Record<GanttPhase, string> = {
  planning:      'rgba(148,136,236,0.85)',
  build:         'rgba(255,255,255,0.90)',
  commissioning: 'rgba(255,255,255,0.95)',
  live:          'rgba(255,255,255,1.00)',
  completed:     'rgba(255,255,255,1.00)',
};

const PHASE_TEXT_COLORS_DARK: Record<GanttPhase, string> = {
  planning:      'rgba(255,255,255,0.90)',  // white on dark fill
  build:         'rgba(255,255,255,0.95)',
  commissioning: 'rgba(26,26,46,0.90)',     // dark ink on L*≈62 mid fill
  live:          'rgba(26,26,46,0.90)',     // dark ink on L*≈78 light fill
  completed:     'rgba(26,26,46,0.90)',     // dark ink on L*≈90 bright fill
};

// Dark surface row-hover brightness: applied as 'inset 0 0 0 9999px rgba(255,255,255,0.05)' boxShadow overlay in cell style

const PHASE_LABELS: Record<GanttPhase, string> = {
  planning:      'Planning',
  build:         'Build',
  commissioning: 'Commissioning',
  live:          'Live',
  completed:     'Completed',
};

// ─── Component ────────────────────────────────────────────────────────────────

export function KenGanttTimeline({
  periods,
  entries,
  rowHeight = 48,
  ariaLabel,
  surface = 'light',
  loading,
  empty,
  errorMessage,
  disableReveal = false,
  onCellClick,
  className,
}: KenGanttTimelineProps) {
  const prefersReducedMotion = useReducedMotion();
  // Hover whole-row: highlight one entity row · dim all others to 0.4 opacity
  const [hoveredEntityId, setHoveredEntityId] = useState<string | null>(null);
  const isDark = surface === 'dark';

  const headerHeight = 40;
  const entityLabelWidth = 200;

  const headerColor = isDark ? 'rgba(255,255,255,0.60)' : 'rgba(0,0,0,0.55)';
  const entityNameColor = isDark ? 'rgba(255,255,255,0.85)' : 'rgba(26,26,46,0.9)';
  const borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';
  const emptyCellBg = isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)';

  // State guards AFTER all hooks
  if (loading)      return <ChartSkeleton type="generic" height={(entries.length + 1) * rowHeight + headerHeight} />;
  if (empty)        return <ChartEmptyState title="No timeline data available" />;
  if (errorMessage) return <ErrorState message={errorMessage} />;

  return (
    <ChartReveal disabled={disableReveal}>
      {/* Mobile strategy: SCROLL · overscroll-behavior contains swipe · webkit smooth */}
      <div
        className={['w-full overflow-x-auto', className ?? ''].join(' ')}
        role="img"
        aria-label={ariaLabel ?? 'Gantt timeline'}
        style={{
          overscrollBehaviorX: 'contain',
          WebkitOverflowScrolling: 'touch',
        } as React.CSSProperties}
      >
        <div
          role="table"
          aria-label={ariaLabel ?? 'Gantt timeline'}
          style={{
            display: 'grid',
            gridTemplateColumns: `minmax(120px, ${entityLabelWidth}px) repeat(${periods.length}, minmax(60px, 1fr))`,
            gridTemplateRows: `${headerHeight}px repeat(${entries.length}, ${rowHeight}px)`,
            fontFamily: KEN_CHART_FONT.sans,
            width: '100%',
            minWidth: 120 + periods.length * 60,
            border: `1px solid ${borderColor}`,
            borderRadius: 6,
            overflow: 'hidden',
          }}
        >
          {/* Header row */}
          <div role="columnheader" style={{ borderBottom: `1px solid ${borderColor}` }} />
          {periods.map((period) => (
            <div
              key={`header-${period}`}
              role="columnheader"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 10,
                fontWeight: 700,
                color: headerColor,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                borderLeft: `1px solid ${borderColor}`,
                borderBottom: `1px solid ${borderColor}`,
              }}
            >
              {period}
            </div>
          ))}

          {/* Data rows */}
          {entries.map((entry, rowIdx) => {
            const isLastRow = rowIdx === entries.length - 1;
            const phaseMap = new Map(entry.phases.map((p) => [p.period, p]));
            const isRowHovered = hoveredEntityId === entry.id;
            // rowDimmed removed — Sprint G.1 locked decision: border accent replaces opacity dim
            // G.2: added background-color + color to transition for smooth surface switch + dark hover
            const rowTransition = prefersReducedMotion
              ? undefined
              : 'background-color 200ms ease-out, color 200ms ease-out, border-color 150ms ease-out, box-shadow 150ms ease-out';

            return (
              <React.Fragment key={`entry-${entry.id}`}>
                {/* Entity label cell — TruncatedText (200px col · names often longer) */}
                <div
                  role="rowheader"
                  onMouseEnter={() => setHoveredEntityId(entry.id)}
                  onMouseLeave={() => setHoveredEntityId(null)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: 12,
                    paddingRight: 8,
                    fontSize: 12,
                    fontWeight: 500,
                    color: entityNameColor,
                    borderBottom: isLastRow ? undefined : `1px solid ${borderColor}`,
                    overflow: 'hidden',
                    // Border accent on row hover: periwinkle left border accent (whole-row signal)
                    borderLeft: isRowHovered && !prefersReducedMotion
                      ? '3px solid rgb(228,226,240)'
                      : '3px solid transparent',
                    // No opacity dim on others — border accent interaction (Sprint G.1 locked)
                    transition: rowTransition,
                    cursor: 'default',
                  }}
                >
                  <TruncatedText
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                      color: entityNameColor,
                      width: '100%',
                    }}
                    tooltipMeta={`${entry.phases.length} phase${entry.phases.length !== 1 ? 's' : ''} · ${entry.phases.map(p => p.period).join(', ')}`}
                    alwaysShowTooltip={false}
                  >
                    {entry.entityName}
                  </TruncatedText>
                </div>

                {/* Phase cells */}
                {periods.map((period) => {
                  const phaseData = phaseMap.get(period);
                  const isClickable = !!onCellClick;
                  const cellTransition = prefersReducedMotion
                    ? undefined
                    : 'background-color 200ms ease-out, color 200ms ease-out, box-shadow 0.15s ease-out';

                  if (!phaseData) {
                    return (
                      <div
                        key={`cell-${entry.id}-${period}`}
                        role="cell"
                        aria-label={`${entry.entityName} ${period}: no activity`}
                        onMouseEnter={() => setHoveredEntityId(entry.id)}
                        onMouseLeave={() => setHoveredEntityId(null)}
                        style={{
                          background: emptyCellBg,
                          borderLeft: `1px solid ${borderColor}`,
                          borderBottom: isLastRow ? undefined : `1px solid ${borderColor}`,
                          // No opacity dim — border accent on row label shows focus (Sprint G.1)
                        }}
                      />
                    );
                  }

                  const phaseColorMap = isDark ? PHASE_COLORS_DARK : PHASE_COLORS_LIGHT;
                  const phaseTextMap = isDark ? PHASE_TEXT_COLORS_DARK : PHASE_TEXT_COLORS_LIGHT;
                  const bg = phaseColorMap[phaseData.phase];
                  const textColor = phaseTextMap[phaseData.phase];
                  // Dark surface row-hover brightness boost applied via boxShadow overlay below
                  // (rgba white inset 9999px fill — avoids re-computing fill, works with transition)
                  const displayLabel = phaseData.label ?? PHASE_LABELS[phaseData.phase];

                  // Tooltip: entity name + period + phase + notes
                  const tooltipContent = (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      <span style={{ fontWeight: 600 }}>{entry.entityName}</span>
                      <span style={{ fontSize: '10px', color: 'rgba(26,26,46,0.65)' }}>
                        {period} · {displayLabel}
                      </span>
                      {phaseData.label && (
                        <span style={{ fontSize: '10px', color: 'rgba(26,26,46,0.50)' }}>
                          {phaseData.label}
                        </span>
                      )}
                    </div>
                  );

                  return (
                    <CellTooltip key={`cell-${entry.id}-${period}`} content={tooltipContent} position="auto">
                      <div
                        role="cell"
                        tabIndex={isClickable ? 0 : undefined}
                        aria-label={`${entry.entityName} ${period}: ${displayLabel}`}
                        onClick={isClickable ? () => onCellClick(entry, period) : undefined}
                        onKeyDown={isClickable ? (e) => {
                          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onCellClick(entry, period); }
                        } : undefined}
                        onMouseEnter={() => setHoveredEntityId(entry.id)}
                        onMouseLeave={() => setHoveredEntityId(null)}
                        onFocus={(e) => {
                          setHoveredEntityId(entry.id);
                          e.currentTarget.style.boxShadow = 'inset 0 0 0 2px rgb(228,226,240)';
                        }}
                        onBlur={(e) => {
                          setHoveredEntityId(null);
                          e.currentTarget.style.boxShadow = '';
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: bg,
                          borderLeft: `1px solid ${borderColor}`,
                          borderBottom: isLastRow ? undefined : `1px solid ${borderColor}`,
                          cursor: isClickable ? 'pointer' : 'default',
                          // CSS transition: smooth bg/color change on surface switch + hover
                          transition: cellTransition,
                          fontSize: 9,
                          fontWeight: 600,
                          color: textColor,
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                          padding: '0 4px',
                          textAlign: 'center',
                          lineHeight: 1.2,
                          outline: 'none',
                          // Row hover: border accent + dark surface brightness overlay (Goal 5)
                          // Light surface: periwinkle inset ring only (Sprint G.1 locked)
                          // Dark surface: periwinkle ring PLUS rgba white inset fill overlay for brightness
                          boxShadow: isRowHovered && !prefersReducedMotion
                            ? isDark
                              ? 'inset 0 0 0 2px rgb(228,226,240), inset 0 0 0 9999px rgba(255,255,255,0.05)'
                              : 'inset 0 0 0 2px rgb(228,226,240)'
                            : undefined,
                        }}
                      >
                        {displayLabel}
                      </div>
                    </CellTooltip>
                  );
                })}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </ChartReveal>
  );
}
