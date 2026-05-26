'use client';

/**
 * KenBubbleChart · scatter w/ sized bubbles · Highcharts bubble type.
 *
 * Mobile strategy (Sprint G.3) · SIMPLIFY at <640px:
 *   Only top-3 bubbles by Z-value show dataLabels — prevents label collision.
 *   Bubble minSize reduced 8% → 4% at narrow.
 *   Tooltip becomes primary disclosure (already wired via Highcharts built-in).
 *   Via Highcharts responsive.rules — ONE place.
 *
 * WHY  · `@ken-research/charts` v0.1.5 has NO bubble chart (KEN-CHARTS-PLAN.md
 *        gap). Builds via Highcharts bubble series directly. Refs canonical
 *        pattern (rainbow-pothos ADR×Occupancy positioning chart · McKinsey
 *        PwC tech-trends Impact×Time-to-impact).
 *
 * WHAT · Bubble chart · X axis × Y axis × bubble size (3 dimensions).
 *        Labels rendered ABOVE bubbles via dataLabels (y: -8 gap · no textOutline).
 *        Sharp purple bubbles at 0.5 default opacity · hover brightens.
 *        NO card frame · uses shared DS theme tokens.
 *
 * WHEN · §07 Ecosystem (player pallet × share) · §11 Trends (Impact × Time) ·
 *        §14 Competitor (revenue × growth × capacity). Any 3-dim positioning.
 *
 * WHERE · `design-system/core-v2/src/charts/charts/KenBubbleChart.tsx`
 *         Consumed via `@kenresearch/design-system/charts`.
 *
 * HOW  · ```tsx
 *        <KenBubbleChart
 *          data={[
 *            { name: 'IoT', x: 1.5, y: 7, z: 30 },
 *            { name: 'Automation', x: 3.2, y: 9, z: 60 },
 *          ]}
 *          xAxisTitle="Years to mainstream"
 *          yAxisTitle="Business impact"
 *          height={420}
 *        />
 *        ```
 *
 * Bug fix applied during DS port (2026-05-25):
 *   - Removed `textOutline: '2px white'` — caused ghosting / duplicate visual rendering
 *     ("LinfoxLinfox" duplicate label seen in DOM probe on v0.4).
 *   - Changed label position to `verticalAlign: 'top'`, `y: -8`, `align: 'center'`
 *     so label floats ABOVE bubble · no overlap with bubble fill.
 *   - Changed `inside: false` explicitly.
 *   - Changed `allowOverlap: true` — small bubbles now show labels (was false · hid labels).
 *   - Removed duplicate `format` + `formatter` (had both → kept `format` only, dropped formatter).
 *
 * A11y · `role="img"` + `aria-label` on outer div.
 *
 * @promotedFrom projects/v1-project/v1-product-page-ver0.4/src/components/charts/KenBubbleChart.tsx
 * @relatedDoc design-system/core-v2/src/charts/theme/tokens.ts
 * @relatedDoc projects/v1-project/v1-product-page-ver0.4/docs/_internal/CURRENT-STATE-CHARTS-TABLES-2026-05-25.md §14
 */

import { useMemo, useRef, useEffect } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
// highcharts-more factory · MUST be called w/ Highcharts to register bubble series.
// Bare side-effect import `import 'highcharts/highcharts-more'` does NOT work in
// Next 16 Turbopack · module exports factory function · must invoke explicitly.
import HighchartsMore from 'highcharts/highcharts-more';

if (typeof window !== 'undefined' && typeof HighchartsMore === 'function') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (HighchartsMore as any)(Highcharts);
}

import { buildKenChartBase } from '../theme/highcharts-base';
export type { ChartSurface } from '../theme/highcharts-base';
import type { ChartSurface } from '../theme/highcharts-base';
import { KEN_CHART_SERIES_ARRAY, KEN_INK, KEN_CHART_FONT } from '../theme/tokens';
import { ChartReveal } from '../primitives/ChartReveal';
import { ChartSkeleton } from '../states/ChartSkeleton';
import { ChartEmptyState } from '../states/EmptyState';
import { ErrorState } from '../states/ErrorState';

export interface BubblePoint {
  name: string;
  /** X-axis position */
  x: number;
  /** Y-axis position */
  y: number;
  /** Bubble size (relative · auto-scaled by Highcharts to chart area) */
  z: number;
  /** Optional override color · default uses palette */
  color?: string;
}

export interface KenBubbleChartProps {
  data: readonly BubblePoint[];
  height?: number;
  xAxisTitle?: string;
  yAxisTitle?: string;
  /** Optional X axis tick categories (e.g. ['<1yr', '2-3yr', '5+yr']) · pass numeric x values 0/1/2 to align */
  xCategories?: readonly string[];
  /** Show bubble name as inline label · default true */
  showLabels?: boolean;
  /** Bubble fill opacity · default 0.5 */
  bubbleOpacity?: number;
  /**
   * Surface context.
   * dark: cinematic section → bump spacing to 36px · axis labels rgba(255,255,255,0.6) · tooltip text inverts.
   * Tooltip bg stays white (canonical — refs keep white tooltip even on dark charts).
   * @default 'light'
   */
  surface?: ChartSurface;
  /** Loading state · renders ChartSkeleton instead of chart */
  loading?: boolean;
  /** Empty state · renders EmptyState instead of chart */
  empty?: boolean;
  /** Error message · renders ErrorState with message */
  errorMessage?: string;
  ariaLabel?: string;
  className?: string;
  /**
   * Disable ChartReveal entrance animation.
   * @default false
   */
  disableReveal?: boolean;
}

function deepMerge<T>(target: T, source: Partial<T>): T {
  if (!source) return target;
  const out: Record<string, unknown> = { ...(target as Record<string, unknown>) };
  for (const key of Object.keys(source) as Array<keyof T>) {
    const srcVal = source[key];
    const tgtVal = (target as Record<string, unknown>)[key as string];
    if (
      srcVal &&
      typeof srcVal === 'object' &&
      !Array.isArray(srcVal) &&
      tgtVal &&
      typeof tgtVal === 'object' &&
      !Array.isArray(tgtVal)
    ) {
      out[key as string] = deepMerge(tgtVal, srcVal as Partial<typeof tgtVal>);
    } else {
      out[key as string] = srcVal;
    }
  }
  return out as T;
}

export function KenBubbleChart({
  data,
  height = 420,
  xAxisTitle,
  yAxisTitle,
  xCategories,
  showLabels = true,
  bubbleOpacity = 0.5,
  surface = 'light',
  loading,
  empty,
  errorMessage,
  ariaLabel,
  className,
  disableReveal = false,
}: KenBubbleChartProps) {
  const chartRef = useRef<HighchartsReact.RefObject | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);

  // Dark surface: axis labels invert · tooltip text also inverts (bg stays white — ref canonical)
  const isDark = surface === 'dark';
  const axisLabelColor = isDark ? 'rgba(255,255,255,0.6)' : KEN_INK.muted;

  // Mobile simplify: top-3 by z-value get labels · others suppressed at <640px
  // Computed once per data change — stable across re-renders
  const top3ZIds = useMemo(() => {
    const sorted = [...data].sort((a, b) => b.z - a.z);
    return new Set(sorted.slice(0, 3).map((d) => d.name));
  }, [data]);

  const options = useMemo<Highcharts.Options>(() => {
    const base = buildKenChartBase();
    return deepMerge(base, {
      chart: {
        type: 'bubble',
        height,
        marginLeft: 56,
        marginRight: 24,
        // Bug 4 fix (2026-05-25): labels clip through section boundary on cinematic dark.
        // spacingTop bumped from 16 to 24 (light) / 36 (dark) to clear top labels.
        marginTop: isDark ? 36 : 24,
        marginBottom: 48,
      },
      xAxis: {
        categories: xCategories ? [...xCategories] : undefined,
        labels: {
          style: {
            color: axisLabelColor,
            fontFamily: KEN_CHART_FONT.sans,
            fontSize: '11px',
          },
        },
        title: xAxisTitle
          ? {
              text: xAxisTitle,
              style: {
                color: axisLabelColor,
                fontFamily: KEN_CHART_FONT.sans,
                fontSize: '11px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              },
            }
          : undefined,
        gridLineWidth: 0,
      },
      yAxis: {
        labels: {
          style: {
            color: axisLabelColor,
            fontFamily: KEN_CHART_FONT.sans,
            fontSize: '11px',
          },
        },
        title: yAxisTitle
          ? {
              text: yAxisTitle,
              style: {
                color: axisLabelColor,
                fontFamily: KEN_CHART_FONT.sans,
                fontSize: '11px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              },
            }
          : undefined,
      },
      tooltip: {
        useHTML: true,
        formatter: function () {
          const point = this.point as Highcharts.Point & { z?: number };
          const xVal = xCategories && typeof this.x === 'number'
            ? xCategories[this.x]
            : String(this.x);
          return `
            <div style="font-family:${KEN_CHART_FONT.sans};max-width:200px;">
              <div style="font-size:12px;font-weight:600;color:rgb(26,26,46);margin-bottom:4px;">${point.name}</div>
              <div style="font-size:10.5px;color:rgba(0,0,0,0.6);font-variant-numeric:tabular-nums;">
                ${xAxisTitle ?? 'X'}: ${xVal}<br/>
                ${yAxisTitle ?? 'Y'}: ${this.y}<br/>
                Magnitude: ${point.z ?? '—'}
              </div>
            </div>
          `;
        },
      },
      plotOptions: {
        bubble: {
          minSize: '8%',
          maxSize: '22%',
          fillOpacity: bubbleOpacity,
          color: KEN_CHART_SERIES_ARRAY[0],
          marker: {
            lineColor: KEN_CHART_SERIES_ARRAY[0],
            lineWidth: 1.5,
            fillOpacity: bubbleOpacity,
          },
          dataLabels: {
            enabled: showLabels,
            // FIX (Bug 1 · 2026-05-25): label ABOVE bubble · no overlap with fill
            // Previous: textOutline '2px white' caused ghosting · "LinfoxLinfox" duplicate
            // Fix: removed textOutline · positioned y:-8 above bubble · allowOverlap:true
            format: '{point.name}',
            align: 'center',
            verticalAlign: 'top',
            inside: false,
            y: -8,
            allowOverlap: true,
            crop: false,
            overflow: 'allow',
            style: {
              color: KEN_INK.strong,
              fontFamily: KEN_CHART_FONT.sans,
              fontSize: '11px',
              fontWeight: '500',
              // NO textOutline — refs don't use it · causes ghosting double-render
            },
          },
          states: {
            hover: {
              halo: { size: 8, opacity: 0.3 },
              brightness: 0.05,
            },
            // Hover dim-others: non-hovered bubbles dim to 0.25 opacity
            // Highcharts auto-handles inactive state when any bubble is hovered
            inactive: { opacity: 0.25 },
          },
        },
      },
      series: [
        {
          type: 'bubble',
          name: 'Items',
          // Per-point dataLabels: mobile simplify — only top-3 by z get labels at narrow
          // At wide viewport: all show labels (if showLabels=true) — plotOptions.bubble.dataLabels applies
          // At narrow (<640px): responsive rules disable plotOptions labels; top-3 points re-enable via point-level override
          data: data.map((d) => ({
            name: d.name,
            x: d.x,
            y: d.y,
            z: d.z,
            color: d.color,
            // Point-level dataLabels enabled only for top-3 at mobile (responsive rule sets plotOptions to disabled)
            dataLabels: {
              enabled: showLabels && top3ZIds.has(d.name),
              format: '{point.name}',
              align: 'center' as const,
              verticalAlign: 'top' as const,
              inside: false,
              y: -8,
              allowOverlap: true,
              crop: false,
              overflow: 'allow' as const,
              style: {
                color: KEN_INK.strong,
                fontFamily: KEN_CHART_FONT.sans,
                fontSize: '11px',
                fontWeight: '500',
              },
            },
          })),
          showInLegend: false,
        },
      ],
      // Mobile strategy: SIMPLIFY · reduce bubble sizes + suppress non-top-3 labels at <640px
      responsive: {
        rules: [
          {
            condition: { maxWidth: 640 },
            chartOptions: {
              plotOptions: {
                bubble: {
                  minSize: '4%',
                  maxSize: '16%',
                  // Disable global dataLabels — point-level top3ZIds override re-enables for top-3
                  dataLabels: { enabled: false },
                },
              },
              xAxis: {
                labels: { style: { fontSize: '10px' } },
              },
              yAxis: {
                labels: { style: { fontSize: '10px' } },
              },
            },
          },
        ],
      },
    } as Partial<Highcharts.Options>);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, height, xAxisTitle, yAxisTitle, xCategories, showLabels, bubbleOpacity, isDark, axisLabelColor, top3ZIds]);

  useEffect(() => {
    const onResize = () => chartRef.current?.chart?.reflow();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // ResizeObserver · fires when parent container resizes (more reliable than window resize)
  useEffect(() => {
    if (typeof ResizeObserver === 'undefined') return;
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => chartRef.current?.chart?.reflow());
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // State guards AFTER all hooks
  if (loading)      return <ChartSkeleton type="bubble" height={height} />;
  if (empty)        return <ChartEmptyState title="No data available" />;
  if (errorMessage) return <ErrorState message={errorMessage} />;

  return (
    <ChartReveal disabled={disableReveal}>
      <div
        ref={(el) => { containerRef.current = el; }}
        className={['w-full', className ?? ''].join(' ')}
        role="img"
        aria-label={ariaLabel ?? 'Bubble chart · 3-dimensional positioning'}
      >
        <HighchartsReact
          ref={chartRef}
          highcharts={Highcharts}
          options={options}
          containerProps={{ style: { width: '100%' } }}
        />
      </div>
    </ChartReveal>
  );
}
