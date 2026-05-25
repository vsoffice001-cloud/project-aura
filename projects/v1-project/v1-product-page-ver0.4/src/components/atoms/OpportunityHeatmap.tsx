'use client';

/**
 * OpportunityHeatmap · Impact × Likelihood 3×3 risk/opportunity matrix.
 *
 * @what  9-cell grid · X axis Likelihood (Low/Med/High) · Y axis Impact (Low/Med/High).
 *        Items placed as labeled dots in cells (or quadrant zones). Color tier
 *        per cell: top-right (high impact + high likelihood) = brand-red caution
 *        · top-left + bottom-right = mid (coral/periwinkle) · bottom-left = low (neutral).
 *        Hover dot → tooltip w/ full rationale. Click → expanded narrative card.
 *
 * @why   Gartner risk-research canonical pattern · most-recognized B2B framing
 *        for industry challenges + risks. Refs: Gartner Top Risks · Forrester
 *        market forecasts · PwC megatrends · McKinsey strategic risk.
 *
 * @when  §11 Challenges · §13 D-S Gap items · §17 Opportunities ranked · any
 *        challenge/risk/opportunity that scores along Impact + Likelihood axes.
 *
 * @how   ```tsx
 *        <OpportunityHeatmap
 *          items={[
 *            { id: 'energy', label: 'Energy volatility', impact: 'high', likelihood: 'high', body: '...' },
 *            { id: 'carbon', label: 'Carbon compliance',  impact: 'high', likelihood: 'medium', body: '...' },
 *          ]}
 *          xLabel="Likelihood"
 *          yLabel="Impact"
 *        />
 *        ```
 *
 * Reusable across §11/§13/§17. Project-local atom · promote to DS at 3rd consumer.
 *
 * @relatedDoc projects/v1-product-page-ver0.4/docs/CHARTS-TABLES-PATTERNS.md §3.6
 * @relatedMemory feedback_web_pdp_vs_print_refs.md (Gartner heatmap canonical)
 */

import { useState } from 'react';

export type Tier = 'low' | 'medium' | 'high';

export interface HeatmapItem {
  id: string;
  label: string;
  impact: Tier;
  likelihood: Tier;
  /** Optional narrative · shown in selected-item panel below grid */
  body?: string;
}

export interface OpportunityHeatmapProps {
  items: readonly HeatmapItem[];
  /** X-axis label · default "Likelihood" */
  xLabel?: string;
  /** Y-axis label · default "Impact" */
  yLabel?: string;
  /** Optional className */
  className?: string;
}

// 3×3 cell tier · combines impact + likelihood · refs canonical color logic
function cellTier(impact: Tier, likelihood: Tier): 'critical' | 'high' | 'medium' | 'low' {
  // Critical: high impact + high likelihood (top-right)
  if (impact === 'high' && likelihood === 'high') return 'critical';
  // High: 2-of-3 high signals
  if (impact === 'high' || likelihood === 'high') {
    if (impact === 'low' || likelihood === 'low') return 'medium';
    return 'high';
  }
  // Medium: both medium
  if (impact === 'medium' && likelihood === 'medium') return 'medium';
  // Low: anything else
  return 'low';
}

// Color per tier · Ken DS palette · NEVER brand-red (per stakeholder rule)
const TIER_STYLES: Record<ReturnType<typeof cellTier>, { bg: string; bgHover: string; dot: string; label: string }> = {
  critical: { bg: 'rgba(196, 97, 71, 0.18)',  bgHover: 'rgba(196, 97, 71, 0.28)',  dot: '#c46147', label: 'CRITICAL' },
  high:     { bg: 'rgba(196, 97, 71, 0.10)',  bgHover: 'rgba(196, 97, 71, 0.18)',  dot: '#c46147', label: 'HIGH'     },
  medium:   { bg: 'rgba(148, 136, 236, 0.10)', bgHover: 'rgba(148, 136, 236, 0.18)', dot: '#9488ec', label: 'MEDIUM'   },
  low:      { bg: 'rgba(112, 117, 200, 0.06)', bgHover: 'rgba(112, 117, 200, 0.12)', dot: '#7075c8', label: 'LOW'      },
};

const TIER_INDEX: Record<Tier, number> = { low: 0, medium: 1, high: 2 };
const TIER_LABEL: Record<Tier, string> = { low: 'Low', medium: 'Med', high: 'High' };

export function OpportunityHeatmap({
  items,
  xLabel = 'Likelihood',
  yLabel = 'Impact',
  className,
}: OpportunityHeatmapProps) {
  const [selected, setSelected] = useState<HeatmapItem | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  // Bin items into 3×3 grid · row 0 = high impact (top) · col 2 = high likelihood (right)
  const grid: HeatmapItem[][][] = [
    [[], [], []], // top row · impact=high
    [[], [], []], // mid row · impact=medium
    [[], [], []], // bot row · impact=low
  ];
  for (const it of items) {
    const row = 2 - TIER_INDEX[it.impact];     // high impact → row 0 (top)
    const col = TIER_INDEX[it.likelihood];      // high likelihood → col 2 (right)
    grid[row][col].push(it);
  }

  return (
    <div
      role="region"
      aria-label={`${yLabel} × ${xLabel} heatmap matrix`}
      className={['w-full', className ?? ''].join(' ')}
    >
      {/* Y-axis label · top-left · rotated */}
      <div className="flex">
        <div className="flex-none flex flex-col items-center justify-center pr-3 py-12" style={{ width: '36px' }}>
          <span
            className="font-body uppercase tracking-[0.16em] text-[var(--semantic-ink-subtle)]"
            style={{
              fontSize: '10px',
              fontWeight: 600,
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
              whiteSpace: 'nowrap',
            }}
          >
            ↑ {yLabel}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          {/* Grid · 3×3 */}
          <div className="grid grid-cols-3 gap-1">
            {grid.map((row, rowIdx) =>
              row.map((cellItems, colIdx) => {
                // Determine cell tier by its impact+likelihood (row 0 = high impact · col 2 = high likelihood)
                const cellImpact: Tier = rowIdx === 0 ? 'high' : rowIdx === 1 ? 'medium' : 'low';
                const cellLike: Tier = colIdx === 0 ? 'low' : colIdx === 1 ? 'medium' : 'high';
                const tier = cellTier(cellImpact, cellLike);
                const tierStyle = TIER_STYLES[tier];
                return (
                  <div
                    key={`${rowIdx}-${colIdx}`}
                    className="rounded-[var(--radius-xs,5px)] p-3 transition-colors duration-200"
                    style={{
                      background: tierStyle.bg,
                      minHeight: '110px',
                    }}
                  >
                    {/* Cell tier label · top-left small */}
                    <p
                      className="font-body uppercase tracking-[0.14em] mb-2 opacity-50"
                      style={{ fontSize: '9px', fontWeight: 700, color: tierStyle.dot }}
                    >
                      {tierStyle.label}
                    </p>

                    {/* Items in this cell · as labeled chips */}
                    <ul className="space-y-1.5">
                      {cellItems.map((it) => (
                        <li key={it.id}>
                          <button
                            type="button"
                            onClick={() => setSelected(it.id === selected?.id ? null : it)}
                            onMouseEnter={() => setHovered(it.id)}
                            onMouseLeave={() => setHovered(null)}
                            className="flex items-start gap-1.5 text-left w-full rounded transition-colors"
                            style={{
                              background: hovered === it.id || selected?.id === it.id ? tierStyle.bgHover : 'transparent',
                              padding: '2px 4px',
                              margin: '-2px -4px',
                            }}
                            aria-pressed={selected?.id === it.id}
                          >
                            <span
                              aria-hidden="true"
                              className="inline-block flex-none rounded-full mt-[6px]"
                              style={{ width: '5px', height: '5px', background: tierStyle.dot }}
                            />
                            <span
                              className="font-body text-[var(--semantic-ink-body)] min-w-0"
                              style={{ fontSize: '12px', lineHeight: 1.4, fontWeight: 500 }}
                            >
                              {it.label}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })
            )}
          </div>

          {/* X-axis labels · bottom row */}
          <div className="grid grid-cols-3 gap-1 mt-2">
            {(['low', 'medium', 'high'] as Tier[]).map((t) => (
              <p
                key={t}
                className="font-body uppercase tracking-[0.14em] text-[var(--semantic-ink-subtle)] text-center"
                style={{ fontSize: '10px', fontWeight: 600 }}
              >
                {TIER_LABEL[t]}
              </p>
            ))}
          </div>

          {/* X-axis title */}
          <p
            className="font-body uppercase tracking-[0.16em] text-[var(--semantic-ink-subtle)] text-center mt-1"
            style={{ fontSize: '10px', fontWeight: 600 }}
          >
            {xLabel} →
          </p>
        </div>
      </div>

      {/* Selected item detail panel · slides in below grid · refs canonical drill-down */}
      {selected && selected.body && (
        <aside
          role="region"
          aria-label={`Detail · ${selected.label}`}
          className="mt-6 border-l-2 pl-5 py-3 transition-all duration-200"
          style={{ borderColor: TIER_STYLES[cellTier(selected.impact, selected.likelihood)].dot }}
        >
          <div className="flex items-baseline gap-3 mb-2 flex-wrap">
            <p
              className="font-body font-medium text-[var(--semantic-ink-strong)]"
              style={{ fontSize: '14px' }}
            >
              {selected.label}
            </p>
            <span
              className="font-body uppercase tracking-[0.12em] flex-none"
              style={{
                fontSize: '10px',
                fontWeight: 700,
                color: TIER_STYLES[cellTier(selected.impact, selected.likelihood)].dot,
              }}
            >
              {TIER_LABEL[selected.impact]} impact · {TIER_LABEL[selected.likelihood]} likelihood
            </span>
          </div>
          <p
            className="font-body text-[var(--semantic-ink-body)]"
            style={{ fontSize: '13.5px', lineHeight: 1.6 }}
          >
            {selected.body}
          </p>
        </aside>
      )}
    </div>
  );
}
