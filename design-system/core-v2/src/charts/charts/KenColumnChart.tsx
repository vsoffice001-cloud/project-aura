'use client';

/**
 * KenColumnChart · vertical-bar chart · Ken DS chart wrapper.
 *
 * Mobile strategy (Sprint G.3) · SIMPLIFY at <640px:
 *   x-axis labels rotate -45° when >6 bars · 10px font size.
 *   Via Highcharts `responsive.rules` — ONE place · no JS resize listener.
 *
 * WHY  · `@ken-research/charts` ColumnChart hardcodes `column.borderRadius:4` ·
 *        wraps every chart in 16px-radius padded card · concatenates AUD0Mn labels
 *        · uses violet `#7c3aed` bars. Local wrapper owns Highcharts directly ·
 *        zero library fight. Ref-aligned look (rainbow-pothos · merged-report).
 *
 * WHAT · Bare ColumnChart · uses Highcharts directly via highcharts-react-official.
 *        Sharp bars · Ken DS purple-500 default · hairline gridlines · plain
 *        comma-thousands tick labels · horizontal x-axis labels · NO card frame ·
 *        NO Y-axis title fallback.
 *
 * WHEN · Use in §08 Market Size · §11 Industry Analysis · §18 Macro Indicators ·
 *        any single-metric column chart needing ref-quality look.
 *
 * WHERE · `design-system/core-v2/src/charts/charts/KenColumnChart.tsx`
 *         Consumed via `@kenresearch/design-system/charts`.
 *
 * HOW  · ```tsx
 *        <KenColumnChart
 *          labels={['2017', '2018', '2019', '2020', '2021', '2022']}
 *          data={[4231.1, 4616.1, 5036.2, 5494.6, 5994.9, 6547.8]}
 *          height={360}
 *          unit="AUD Mn"
 *          projectionStartIndex={5}  // optional · index from which bars dim/dash
 *        />
 *        ```
 *
 * A11y · `role="img"` on outer `<figure>` · `aria-label` required from consumer.
 *
 * @promotedFrom projects/v1-project/v1-product-page-ver0.4/src/components/charts/KenColumnChart.tsx
 * @relatedDoc design-system/core-v2/src/charts/theme/tokens.ts
 */

import { useMemo, useRef, useEffect } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { buildKenChartBase, surfaceOverrides } from '../theme/highcharts-base';
import type { ChartSurface } from '../theme/highcharts-base';
import { KEN_CHART_SERIES_ARRAY } from '../theme/tokens';
import { ChartReveal } from '../primitives/ChartReveal';
import { ChartSkeleton } from '../states/ChartSkeleton';
import { ChartEmptyState } from '../states/EmptyState';
import { ErrorState } from '../states/ErrorState';

export interface KenColumnChartProps {
  /** X-axis category labels · one per data point */
  labels: string[];
  /** Data values · same length as labels */
  data: number[];
  /** Chart height in pixels · default 360 */
  height?: number;
  /**
   * Optional unit suffix shown in tooltip (e.g. "AUD Mn" · "%"). Does NOT
   * appear on axis labels (axis stays clean · figcaption + SourceCluster cite unit).
   */
  unit?: string;
  /**
   * If set · bars from this index onward render with reduced opacity + dashed
   * border to signal projection/forecast. Index is zero-based. Pass -1 or omit
   * for fully-actual series.
   */
  projectionStartIndex?: number;
  /** Surface context (light=default · dark=cinematic section) */
  surface?: ChartSurface;
  /** Loading state · renders ChartSkeleton instead of chart */
  loading?: boolean;
  /** Empty state · renders EmptyState instead of chart */
  empty?: boolean;
  /** Error message · renders ErrorState with message */
  errorMessage?: string;
  /** Optional aria-label for screen readers */
  ariaLabel?: string;
  /** Optional className for outer container */
  className?: string;
  /**
   * Disable ChartReveal entrance animation.
   * Use for above-fold charts where entrance would be invisible anyway.
   * @default false
   */
  disableReveal?: boolean;
}

/**
 * Deep merge utility (Object.assign would shallow-clobber Highcharts nested options)
 */
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

export function KenColumnChart({
  labels,
  data,
  height = 360,
  unit,
  projectionStartIndex,
  surface = 'light' as ChartSurface,
  loading,
  empty,
  errorMessage,
  ariaLabel,
  className,
  disableReveal = false,
}: KenColumnChartProps) {
  const chartRef = useRef<HighchartsReact.RefObject | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);

  // Mark projected points w/ dashed border + reduced opacity (built into pointWise data array)
  const pointWiseData = useMemo(() => {
    if (projectionStartIndex === undefined || projectionStartIndex < 0) {
      return data.map((y) => ({ y }));
    }
    return data.map((y, i) => ({
      y,
      color:
        i >= projectionStartIndex
          ? `${KEN_CHART_SERIES_ARRAY[0]}99` // ~60% alpha for projected
          : KEN_CHART_SERIES_ARRAY[0],
      borderColor: i >= projectionStartIndex ? KEN_CHART_SERIES_ARRAY[0] : undefined,
      borderWidth: i >= projectionStartIndex ? 1 : 0,
      dashStyle: i >= projectionStartIndex ? 'Dash' : undefined,
    }));
  }, [data, projectionStartIndex]);

  const options = useMemo<Highcharts.Options>(() => {
    const base = buildKenChartBase();
    const surfOpts = surfaceOverrides(surface);
    return deepMerge(deepMerge(base, surfOpts), {
      chart: {
        type: 'column',
        height,
      },
      xAxis: {
        categories: labels,
        crosshair: {
          color: 'rgba(0,0,0,0.04)',
          width: 1,
        },
      },
      tooltip: {
        useHTML: true,
        formatter: function () {
          const v = (this.y as number).toLocaleString('en-US', {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1,
          });
          const cat = this.x;
          const unitPart = unit ? ` <span style="color:rgba(0,0,0,0.55)">${unit}</span>` : '';
          return `
            <div style="font-family:'DM Sans', -apple-system, sans-serif;">
              <div style="font-size:9.5px;text-transform:uppercase;letter-spacing:0.08em;color:rgba(0,0,0,0.55);margin-bottom:2px;">${cat}</div>
              <div style="font-size:12px;font-weight:500;color:rgb(26,26,46);font-variant-numeric:tabular-nums;">${v}${unitPart}</div>
            </div>
          `;
        },
      },
      plotOptions: {
        column: {
          // Hover dim-others: non-hovered bars dim to 0.3 opacity (Highcharts built-in)
          states: {
            inactive: { opacity: 0.3 },
          },
        },
      },
      series: [
        {
          type: 'column',
          name: 'Series',
          data: pointWiseData,
          showInLegend: false,
        },
      ],
      // Mobile strategy: SIMPLIFY · rotate x-axis labels at <640px
      // Highcharts responsive.rules applied here — ONE place · no JS resize listener
      responsive: {
        rules: [
          {
            condition: { maxWidth: 640 },
            chartOptions: {
              xAxis: {
                labels: {
                  rotation: labels.length > 6 ? -45 : 0,
                  style: { fontSize: '10px' },
                },
              },
              legend: { itemDistance: 8 },
            },
          },
        ],
      },
    } as Partial<Highcharts.Options>);
  }, [labels, height, unit, pointWiseData, surface]);

  // Reflow on window resize · Highcharts doesn't always catch container resize w/o it
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

  // State guards AFTER all hooks (Rules of Hooks: no conditional hook calls)
  if (loading)      return <ChartSkeleton type="bar" height={height} />;
  if (empty)        return <ChartEmptyState title="No data available" />;
  if (errorMessage) return <ErrorState message={errorMessage} />;

  return (
    <ChartReveal disabled={disableReveal}>
      <figure
        ref={(el) => { containerRef.current = el; }}
        className={className}
        role="img"
        aria-label={ariaLabel ?? 'Market data column chart'}
        style={{ width: '100%' }}
      >
        <HighchartsReact
          ref={chartRef}
          highcharts={Highcharts}
          options={options}
          containerProps={{ style: { width: '100%' } }}
        />
      </figure>
    </ChartReveal>
  );
}
