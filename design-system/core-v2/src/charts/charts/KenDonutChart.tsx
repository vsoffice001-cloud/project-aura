'use client';

/**
 * KenDonutChart · pie/donut composition chart · Ken DS chart wrapper.
 *
 * WHY  · `@ken-research/charts` PieChart has same library quirks as ColumnChart
 *        (hardcoded colors · framed card wrapper · concat label format).
 *        Building DS wrapper for full control · same theme tokens shared.
 *
 * WHAT · 2-6 slice donut · neutral palette (periwinkle/perano/purple) ·
 *        center label slot · DM Sans labels · plain percentages · refs canonical
 *        composition pattern. Uses Highcharts pie type w/ innerSize.
 *
 * WHEN · Composition snapshot · 2-6 categories at single point in time.
 *        Used in §10 Segmentation (Temperature · End-User) · future composition needs.
 *
 * WHERE · `design-system/core-v2/src/charts/charts/KenDonutChart.tsx`
 *         Consumed via `@kenresearch/design-system/charts`.
 *
 * HOW  · ```tsx
 *        <KenDonutChart
 *          data={[
 *            { name: 'Frozen', value: 45 },
 *            { name: 'Chiller', value: 40 },
 *            { name: 'Ambient', value: 15 },
 *          ]}
 *          height={280}
 *          centerLabel="100%"
 *          centerSubLabel="2022 share"
 *        />
 *        ```
 *
 * A11y · `role="img"` + `aria-label` on outer div.
 *
 * @promotedFrom projects/v1-project/v1-product-page-ver0.4/src/components/charts/KenDonutChart.tsx
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

export interface DonutSlice {
  name: string;
  value: number;
}

export interface KenDonutChartProps {
  /** 2-6 slices · value in any unit (% · count · revenue) */
  data: DonutSlice[];
  /** Chart height in pixels · default 280 */
  height?: number;
  /** Optional center label · large display (e.g. "100%" · total · headline) */
  centerLabel?: string;
  /** Optional center subtitle · small DM Sans below center label */
  centerSubLabel?: string;
  /** Show slice % labels around donut · default true */
  showLabels?: boolean;
  /** Optional unit suffix for tooltip (e.g. "%" · "Mn") */
  unit?: string;
  /** ARIA label */
  ariaLabel?: string;
  /** Optional className */
  className?: string;
  /** Surface context (light=default · dark=cinematic section) */
  surface?: 'light' | 'dark';
  /** Loading state · renders ChartSkeleton instead of chart */
  loading?: boolean;
  /** Empty state · renders EmptyState instead of chart */
  empty?: boolean;
  /** Error message · renders ErrorState with message */
  errorMessage?: string;
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

export function KenDonutChart({
  data,
  height = 280,
  centerLabel,
  centerSubLabel,
  showLabels = true,
  unit = '%',
  surface: _surface = 'light',
  loading,
  empty,
  errorMessage,
  ariaLabel,
  className,
  disableReveal = false,
}: KenDonutChartProps) {
  const chartRef = useRef<HighchartsReact.RefObject | null>(null);

  const options = useMemo<Highcharts.Options>(() => {
    const base = buildKenChartBase();
    return deepMerge(base, {
      chart: {
        type: 'pie',
        height,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 8,
        marginBottom: 8,
        spacing: [0, 0, 0, 0],
      },
      xAxis: { lineColor: 'transparent', tickColor: 'transparent', labels: { enabled: false } },
      yAxis: { gridLineWidth: 0, lineColor: 'transparent', labels: { enabled: false } },
      tooltip: {
        useHTML: true,
        formatter: function () {
          const v = (this.y as number).toLocaleString('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 1,
          });
          const name = this.point?.name ?? this.key;
          return `
            <div style="font-family:${KEN_CHART_FONT.sans};">
              <div style="font-size:9.5px;text-transform:uppercase;letter-spacing:0.08em;color:rgba(0,0,0,0.55);margin-bottom:2px;">${name}</div>
              <div style="font-size:12px;font-weight:500;color:rgb(26,26,46);font-variant-numeric:tabular-nums;">${v}${unit ? ` ${unit}` : ''}</div>
            </div>
          `;
        },
      },
      plotOptions: {
        pie: {
          innerSize: '62%',
          // Bug 3 fix (2026-05-25): donut was right-shifted · empty left half.
          // Force center explicitly — do NOT rely on Highcharts default (can drift).
          center: ['50%', '50%'],
          // Consistent sizing relative to chart area (was auto-shrinking on narrow containers)
          size: '85%',
          borderWidth: 2,
          borderColor: '#ffffff',
          colors: [...KEN_CHART_SERIES_ARRAY],
          dataLabels: {
            enabled: showLabels,
            distance: 20,  // slightly more clearance than 14 · prevents label overlap with outer border
            style: {
              color: KEN_INK.strong,
              fontFamily: KEN_CHART_FONT.sans,
              fontSize: '11px',
              fontWeight: '500',
              textOutline: 'none',
            },
            formatter: function () {
              const pct = this.percentage ?? 0;
              return `<span style="color:${KEN_INK.muted};">${this.point?.name}</span><br/><span style="font-variant-numeric:tabular-nums;color:${KEN_INK.strong};font-weight:500;">${pct.toFixed(pct < 10 ? 1 : 0)}%</span>`;
            },
            useHTML: true,
          },
          states: {
            hover: {
              brightness: -0.08,
              halo: { size: 4, opacity: 0.2 },
            },
          },
        },
      },
      series: [
        {
          type: 'pie',
          name: 'Share',
          data: data.map((d) => ({ name: d.name, y: d.value })),
        },
      ],
    } as Partial<Highcharts.Options>);
  }, [data, height, showLabels, unit]);

  useEffect(() => {
    const onResize = () => chartRef.current?.chart?.reflow();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // State guards AFTER all hooks
  if (loading)      return <ChartSkeleton type="pie" height={height} />;
  if (empty)        return <ChartEmptyState title="No data available" />;
  if (errorMessage) return <ErrorState message={errorMessage} />;

  return (
    <ChartReveal disabled={disableReveal}>
      <div
        className={['relative w-full', className ?? ''].join(' ')}
        role="img"
        aria-label={ariaLabel ?? 'Composition donut chart'}
      >
        <HighchartsReact
          ref={chartRef}
          highcharts={Highcharts}
          options={options}
          containerProps={{ style: { width: '100%' } }}
        />
        {/* Center label · overlays donut hole */}
        {(centerLabel || centerSubLabel) && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
            aria-hidden="true"
          >
            {centerLabel && (
              <p
                className="font-display font-light text-[var(--semantic-ink-strong)] leading-none"
                style={{
                  fontSize: 'clamp(24px, 3vw, 34px)',
                  fontFamily: KEN_CHART_FONT.serif,
                  fontVariantNumeric: 'tabular-nums lining-nums',
                  letterSpacing: '-0.02em',
                }}
              >
                {centerLabel}
              </p>
            )}
            {centerSubLabel && (
              <p
                className="font-body uppercase tracking-[0.12em] text-[var(--semantic-ink-subtle)] mt-1.5"
                style={{ fontSize: '10px', fontWeight: 600 }}
              >
                {centerSubLabel}
              </p>
            )}
          </div>
        )}
      </div>
    </ChartReveal>
  );
}
