'use client';

/**
 * KenMultiLineChart · multi-series spline line chart · Ken DS chart wrapper.
 *
 * WHY  · Macro indicator panels (Oxford Economics · RBA · McKinsey) overlay 3-5
 *        economic time series on one chart to show correlation visually.
 *        dashDot projection styling signals historical vs forecast boundary
 *        without a verbal explanation.
 *
 * WHAT · 3-5 series spline chart · indicator trends over time (2018-2027) ·
 *        periwinkle/perano/purple palette · projection styling on 2025+ years ·
 *        shared dark tooltip · dashed lines after projectionStartIndex.
 *
 * WHEN · §18 Macroeconomic Indicators · primary chart · after IndicatorCard grid.
 *        Reusable for any 3-5 series time trend.
 *
 * WHERE · `design-system/core-v2/src/charts/charts/KenMultiLineChart.tsx`
 *         Consumed via `@kenresearch/design-system/charts`.
 *
 * HOW  · ```tsx
 *        <KenMultiLineChart
 *          labels={['2018','2019','2020','2021','2022','2023','2024','2025F','2026F','2027F']}
 *          series={[
 *            { name: 'GDP Growth', data: [2.9,1.9,-3.7,...], color: '#9488ec' },
 *            { name: 'Cold-chain demand', data: [...] },
 *          ]}
 *          unit="%"
 *          projectionStartIndex={7}
 *        />
 *        ```
 *
 * A11y · `role="img"` + `aria-label` on outer div.
 *
 * @promotedFrom projects/v1-project/v1-product-page-ver0.4/src/components/charts/KenMultiLineChart.tsx
 * @relatedDoc design-system/core-v2/src/charts/theme/tokens.ts
 */

import { useMemo, useRef, useEffect } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { buildKenChartBase } from '../theme/highcharts-base';
import { KEN_CHART_SERIES_ARRAY, KEN_INK, KEN_CHART_FONT } from '../theme/tokens';
import { ChartReveal } from '../primitives/ChartReveal';
import { ChartSkeleton } from '../states/ChartSkeleton';
import { ChartEmptyState } from '../states/EmptyState';
import { ErrorState } from '../states/ErrorState';

// ─────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────

export interface MultiLineSeries {
  /** Series name · shown in legend + tooltip */
  name: string;
  /** Numeric data values · one per label · same length as labels */
  data: (number | null)[];
  /** Optional override color · defaults to KEN_CHART_SERIES_ARRAY[index] */
  color?: string;
}

export interface KenMultiLineChartProps {
  /** X axis labels · year strings (historical + projected) */
  labels: string[];
  /** 3-5 data series */
  series: MultiLineSeries[];
  /** Chart height px · default 340 */
  height?: number;
  /** Y axis unit for tooltip + axis title */
  unit?: string;
  /** Index of first projected point · lines become dashDot from here onward */
  projectionStartIndex?: number;
  /** Surface context (light=default · dark=cinematic section) */
  surface?: 'light' | 'dark';
  /** Loading state · renders ChartSkeleton instead of chart */
  loading?: boolean;
  /** Empty state · renders EmptyState instead of chart */
  empty?: boolean;
  /** Error message · renders ErrorState with message */
  errorMessage?: string;
  /** ARIA label for outer wrapper */
  ariaLabel?: string;
  /** Optional className */
  className?: string;
  /**
   * Disable ChartReveal entrance animation.
   * @default false
   */
  disableReveal?: boolean;
}

// ─────────────────────────────────────────────────────────────────
// deepMerge · consistent w/ all wrappers
// ─────────────────────────────────────────────────────────────────

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

// ─────────────────────────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────────────────────────

export function KenMultiLineChart({
  labels,
  series,
  height = 340,
  unit = '%',
  projectionStartIndex,
  surface: _surface = 'light',
  loading,
  empty,
  errorMessage,
  ariaLabel,
  className,
  disableReveal = false,
}: KenMultiLineChartProps) {
  const chartRef = useRef<HighchartsReact.RefObject | null>(null);

  const options = useMemo<Highcharts.Options>(() => {
    const base = buildKenChartBase();

    // Build per-series Highcharts series config
    // Projection styling: split each series into solid (historical) + dashDot (projected)
    const hcSeries: Highcharts.SeriesOptionsType[] = series.map((s, i) => {
      const color = s.color ?? KEN_CHART_SERIES_ARRAY[i % KEN_CHART_SERIES_ARRAY.length];

      if (projectionStartIndex !== undefined && projectionStartIndex < s.data.length) {
        // Split data: historical portion solid · projected portion dashed
        // Highcharts zones split by x index value
        return {
          type: 'spline',
          name: s.name,
          data: s.data as (number | null)[],
          color,
          lineWidth: 2,
          zoneAxis: 'x',
          zones: [
            {
              value: projectionStartIndex,
              // historical: solid (default)
            },
            {
              // projected: dashDot
              dashStyle: 'LongDashDot',
              color,
            },
          ],
          marker: {
            enabled: true,
            symbol: 'circle',
            radius: 3,
            fillColor: '#ffffff',
            lineWidth: 2,
            lineColor: color,
          },
          states: {
            hover: { lineWidthPlus: 1 },
          },
        } as Highcharts.SeriesSplineOptions;
      }

      // No projection split — solid throughout
      return {
        type: 'spline',
        name: s.name,
        data: s.data as (number | null)[],
        color,
        lineWidth: 2,
        marker: {
          enabled: true,
          symbol: 'circle',
          radius: 3,
          fillColor: '#ffffff',
          lineWidth: 2,
          lineColor: color,
        },
        states: {
          hover: { lineWidthPlus: 1 },
        },
      } as Highcharts.SeriesSplineOptions;
    });

    return deepMerge(base, {
      chart: {
        type: 'spline',
        height,
        marginLeft: 56,
        marginRight: 16,
        marginTop: 20,
        marginBottom: 48,
      },

      xAxis: {
        categories: labels,
        // Vertical plot line at projection boundary
        plotLines:
          projectionStartIndex !== undefined
            ? [
                {
                  color: 'rgba(0,0,0,0.12)',
                  dashStyle: 'Dot',
                  width: 1,
                  value: projectionStartIndex - 0.5,
                  label: {
                    text: 'FORECAST',
                    rotation: 0,
                    align: 'left',
                    x: 4,
                    y: -6,
                    style: {
                      color: KEN_INK.muted,
                      fontFamily: KEN_CHART_FONT.sans,
                      fontSize: '9px',
                      fontWeight: '600',
                      letterSpacing: '0.1em',
                    },
                  },
                },
              ]
            : [],
        labels: {
          formatter: function () {
            const cat = String(this.value);
            const isProjected = cat.endsWith('F') || (projectionStartIndex !== undefined && (this.pos as number) >= projectionStartIndex);
            return `<span style="color:${isProjected ? KEN_INK.muted : 'rgba(0,0,0,0.6)'};font-style:${isProjected ? 'italic' : 'normal'}">${cat}</span>`;
          },
          useHTML: true,
        },
      },

      yAxis: {
        labels: {
          formatter: function () {
            const v = this.value as number;
            return `${v.toLocaleString('en-US', { maximumFractionDigits: 1 })}`;
          },
        },
        title: { text: undefined },
      },

      // Internal Highcharts legend disabled · ChartFigure owns legend slot exclusively.
      // Bug 1 fix (2026-05-25): double-legend collision — Highcharts showed legend internally
      // AND ChartFigure showed external legend → collision at chart top edge.
      legend: { enabled: false },

      tooltip: {
        useHTML: true,
        shared: true,
        formatter: function () {
          const pts = (this as Highcharts.TooltipFormatterContextObject).points ?? [];
          const cat = (this as Highcharts.TooltipFormatterContextObject).x;
          const rows = pts
            .map((p) => {
              const v =
                typeof p.y === 'number'
                  ? p.y.toLocaleString('en-US', {
                      minimumFractionDigits: 1,
                      maximumFractionDigits: 1,
                    })
                  : '—';
              return `<div style="display:flex;align-items:center;gap:8px;margin-top:3px;">
                <span style="display:inline-block;width:14px;height:2px;background:${p.color};border-radius:1px;flex-none;"></span>
                <span style="font-size:10.5px;color:rgba(0,0,0,0.6);">${p.series.name}</span>
                <span style="font-size:11.5px;color:rgb(26,26,46);font-variant-numeric:tabular-nums;font-weight:500;margin-left:auto;">${v}${unit ? ` ${unit}` : ''}</span>
              </div>`;
            })
            .join('');
          return `
            <div style="font-family:${KEN_CHART_FONT.sans};min-width:200px;">
              <div style="font-size:9.5px;text-transform:uppercase;letter-spacing:0.08em;color:rgba(0,0,0,0.55);margin-bottom:4px;">${cat}</div>
              ${rows}
            </div>
          `;
        },
      },

      series: hcSeries,
    } as Partial<Highcharts.Options>);
  }, [labels, series, height, unit, projectionStartIndex]);

  useEffect(() => {
    const onResize = () => chartRef.current?.chart?.reflow();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // State guards AFTER all hooks
  if (loading)      return <ChartSkeleton type="line" height={height} />;
  if (empty)        return <ChartEmptyState title="No data available" />;
  if (errorMessage) return <ErrorState message={errorMessage} />;

  return (
    <ChartReveal disabled={disableReveal}>
      <div
        className={['w-full', className ?? ''].join(' ')}
        role="img"
        aria-label={ariaLabel ?? 'Multi-series line chart'}
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
