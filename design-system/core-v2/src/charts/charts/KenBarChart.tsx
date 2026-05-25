'use client';

/**
 * KenBarChart · horizontal bar chart · Ken DS chart wrapper.
 *
 * WHY  · Horizontal bars handle long category names cleanly · vertical ColumnChart
 *        rotates labels 45° (rejected per refs). 3-8 categories · % share OR
 *        absolute value · ranked OR ordered.
 *
 * WHAT · Horizontal bars · ranked top-to-bottom · sharp corners · purple-500 ·
 *        DM Sans category labels (left) + value labels (right of bar).
 *        Plain comma-thousands · no axis title · refs canonical horizontal
 *        composition pattern (rainbow-pothos zone tables).
 *
 * WHEN · 3-8 categories · % share OR absolute value · ranked OR ordered.
 *        Used in §10 (Region · Reefer Truck Type) · §11 Industry · §13 D-S Gap.
 *
 * WHERE · `design-system/core-v2/src/charts/charts/KenBarChart.tsx`
 *         Consumed via `@kenresearch/design-system/charts`.
 *
 * HOW  · ```tsx
 *        <KenBarChart
 *          labels={['Sydney', 'Melbourne', 'Brisbane', 'Other']}
 *          data={[35.0, 27.5, 15.5, 22.0]}
 *          unit="%"
 *          height={240}
 *        />
 *        ```
 *
 * A11y · `role="img"` on outer div · `aria-label` required from consumer.
 *
 * @promotedFrom projects/v1-project/v1-product-page-ver0.4/src/components/charts/KenBarChart.tsx
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

export interface KenBarChartProps {
  /** Category labels · one per bar · top-to-bottom render order */
  labels: string[];
  /** Values · same length as labels */
  data: number[];
  /** Chart height · default 240 (~40px per bar) */
  height?: number;
  /** Unit suffix in tooltip + value labels (e.g. "%" · "Mn") */
  unit?: string;
  /** Show value at end of each bar · default true */
  showValueLabels?: boolean;
  /** Surface context (light=default · dark=cinematic section) */
  surface?: 'light' | 'dark';
  /** Loading state · renders ChartSkeleton instead of chart */
  loading?: boolean;
  /** Empty state · renders EmptyState instead of chart */
  empty?: boolean;
  /** Error message · renders ErrorState with message */
  errorMessage?: string;
  /** ARIA label */
  ariaLabel?: string;
  /** Optional className */
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

export function KenBarChart({
  labels,
  data,
  height = 240,
  unit = '',
  showValueLabels = true,
  surface: _surface = 'light',
  loading,
  empty,
  errorMessage,
  ariaLabel,
  className,
  disableReveal = false,
}: KenBarChartProps) {
  const chartRef = useRef<HighchartsReact.RefObject | null>(null);

  const options = useMemo<Highcharts.Options>(() => {
    const base = buildKenChartBase();
    return deepMerge(base, {
      chart: {
        type: 'bar',
        height,
        marginLeft: 96, // room for category labels
        marginRight: 56, // room for value labels at end
        marginTop: 8,
        marginBottom: 24,
      },
      xAxis: {
        categories: labels,
        labels: {
          style: {
            color: KEN_INK.strong,
            fontFamily: KEN_CHART_FONT.sans,
            fontSize: '12px',
            fontWeight: '500',
          },
        },
        lineColor: 'transparent',
        tickColor: 'transparent',
      },
      yAxis: {
        gridLineColor: '#f5f5f5',
        gridLineWidth: 1,
        labels: {
          style: {
            color: KEN_INK.muted,
            fontFamily: KEN_CHART_FONT.sans,
            fontSize: '10px',
          },
          formatter: function () {
            const v = this.value as number;
            return `${v.toLocaleString('en-US')}${unit ? unit : ''}`;
          },
        },
        title: { text: undefined },
      },
      tooltip: {
        useHTML: true,
        formatter: function () {
          const v = (this.y as number).toLocaleString('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 1,
          });
          return `
            <div style="font-family:${KEN_CHART_FONT.sans};">
              <div style="font-size:9.5px;text-transform:uppercase;letter-spacing:0.08em;color:rgba(0,0,0,0.55);margin-bottom:2px;">${this.key}</div>
              <div style="font-size:12px;font-weight:500;color:rgb(26,26,46);font-variant-numeric:tabular-nums;">${v}${unit ? ` ${unit}` : ''}</div>
            </div>
          `;
        },
      },
      plotOptions: {
        bar: {
          color: KEN_CHART_SERIES_ARRAY[0],
          borderRadius: 0,
          borderWidth: 0,
          pointPadding: 0.15,
          groupPadding: 0.1,
          dataLabels: {
            enabled: showValueLabels,
            inside: false,
            align: 'left',
            style: {
              color: KEN_INK.strong,
              fontFamily: KEN_CHART_FONT.sans,
              fontSize: '11px',
              fontWeight: '500',
              textOutline: 'none',
            },
            formatter: function () {
              const v = (this.y as number).toLocaleString('en-US', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 1,
              });
              return `${v}${unit ? unit : ''}`;
            },
          },
        },
      },
      series: [
        {
          type: 'bar',
          name: 'Share',
          data,
          showInLegend: false,
        },
      ],
    } as Partial<Highcharts.Options>);
  }, [labels, data, height, unit, showValueLabels]);

  useEffect(() => {
    const onResize = () => chartRef.current?.chart?.reflow();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // State guards AFTER all hooks
  if (loading)      return <ChartSkeleton type="bar" height={height} />;
  if (empty)        return <ChartEmptyState title="No data available" />;
  if (errorMessage) return <ErrorState message={errorMessage} />;

  return (
    <ChartReveal disabled={disableReveal}>
      <div
        className={['w-full', className ?? ''].join(' ')}
        role="img"
        aria-label={ariaLabel ?? 'Horizontal bar chart'}
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
