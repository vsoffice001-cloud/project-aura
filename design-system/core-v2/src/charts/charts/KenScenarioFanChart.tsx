'use client';

/**
 * KenScenarioFanChart · 3-scenario area-spline fan chart · Ken DS chart wrapper.
 *
 * WHY  · §16 Future Outlook requires scenario visualization showing divergence
 *        of Bear/Base/Bull outcomes. Areaspline fan chart is the standard
 *        format for scenario-range presentations (McKinsey Scenarios · Oxford
 *        Economics projections · CB Insights market forecasts).
 *
 * WHAT · Line area chart · 3 scenarios (Bear · Base · Bull) · 2022-2027.
 *        Base scenario = solid purple-600 line (accent).
 *        Bear/Bull = dashed perano-800 and periwinkle-700 lines.
 *        Fan area between Bear and Bull = fillOpacity 0.18 perano shade.
 *        X axis: 2022–2027F with forecast styling on 2026F+2027F.
 *        Y axis: AUD Mn · comma thousands.
 *        Shared tooltip · scenario-filtered (hides arearange from tooltip).
 *
 * WHEN · §16 Future Outlook · primary chart · below lede + MetricStrip.
 *
 * WHERE · `design-system/core-v2/src/charts/charts/KenScenarioFanChart.tsx`
 *         Consumed via `@kenresearch/design-system/charts`.
 *
 * HOW  · ```tsx
 *        <KenScenarioFanChart
 *          labels={['2022', '2023', '2024', '2025', '2026F', '2027F']}
 *          bearData={[6548, 7010, 7505, 8038, 8606, 9218]}
 *          baseData={[6548, 7205, 7928, 8723, 9598, 10705]}
 *          bullData={[6548, 7430, 8446, 9603, 10920, 12452]}
 *          unit="AUD Mn"
 *        />
 *        ```
 *
 * Bug fix applied during DS port (2026-05-25):
 *   - Spline markers `fillColor: '#ffffff'` made markers invisible on white bg.
 *     FIX: changed all spline markers to use their own series color for fillColor.
 *     Base → KEN_CHART_SERIES.primary (#9488ec)
 *     Bear → KEN_CHART_SERIES.tertiary (#86b3e5)
 *     Bull → KEN_CHART_SERIES.quaternary (#7075c8)
 *   - Fan arearange: `color/fillColor` → KEN_CHART_SERIES.light (#a7c9ed) at 0.18 opacity
 *   - Grid stroke verified via highcharts-base.ts both xAxis/yAxis gridLineColor set.
 *
 * A11y · `role="img"` + `aria-label` on outer div.
 *
 * @promotedFrom projects/v1-project/v1-product-page-ver0.4/src/components/charts/KenScenarioFanChart.tsx
 * @relatedDoc design-system/core-v2/src/charts/theme/tokens.ts
 * @relatedDoc projects/v1-project/v1-product-page-ver0.4/docs/_internal/CURRENT-STATE-CHARTS-TABLES-2026-05-25.md §16
 */

import { useMemo, useRef, useEffect } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
// highcharts-more factory · registers areaspline + area range series
import HighchartsMore from 'highcharts/highcharts-more';
import { ChartSkeleton } from '../states/ChartSkeleton';
import { ChartEmptyState } from '../states/EmptyState';
import { ErrorState } from '../states/ErrorState';

if (typeof window !== 'undefined' && typeof HighchartsMore === 'function') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (HighchartsMore as any)(Highcharts);
}

import { buildKenChartBase } from '../theme/highcharts-base';
import { KEN_CHART_SERIES, KEN_INK, KEN_CHART_FONT } from '../theme/tokens';
import { ChartReveal } from '../primitives/ChartReveal';

// ─── Scenario palette · Ken DS data-viz ───────────────────────────────────────
// FIX (Bug 2 · 2026-05-25): was KEN_CHART_COLORS[0/2/3] with marker fillColor '#ffffff'
// White markers = invisible on light bg. Now each marker matches its series color.
//
// Base → KEN_CHART_SERIES.primary  (#9488ec) · solid line · most prominent
// Bull → KEN_CHART_SERIES.quaternary (#7075c8) · shortdash · secondary
// Bear → KEN_CHART_SERIES.tertiary  (#86b3e5) · dash · secondary
// Fan area → KEN_CHART_SERIES.light (#a7c9ed) · fillOpacity 0.18
const SCENARIO_COLORS = {
  base: KEN_CHART_SERIES.primary,    // #9488ec purple · solid
  bull: KEN_CHART_SERIES.quaternary, // #7075c8 periwinkle-800
  bear: KEN_CHART_SERIES.tertiary,   // #86b3e5 perano-800
  fan:  KEN_CHART_SERIES.light,      // #a7c9ed perano-700 fan fill
} as const;

export interface KenScenarioFanChartProps {
  /** X axis labels · 2022–2027 (6 items · last 2 projected) */
  labels: readonly string[];
  /** Bear scenario AUD Mn values · dashed line */
  bearData: readonly number[];
  /** Base scenario AUD Mn values · solid accent line */
  baseData: readonly number[];
  /** Bull scenario AUD Mn values · dashed line */
  bullData: readonly number[];
  /** Chart height px · default 380 */
  height?: number;
  /** Y axis unit label · default "AUD Mn" */
  unit?: string;
  /** Surface context (light=default · dark=cinematic section) */
  surface?: 'light' | 'dark';
  /** Loading state · renders ChartSkeleton instead of chart */
  loading?: boolean;
  /** Empty state · renders EmptyState instead of chart */
  empty?: boolean;
  /** Error message · renders ErrorState with message */
  errorMessage?: string;
  /** Aria label for outer wrapper */
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

export function KenScenarioFanChart({
  labels,
  bearData,
  baseData,
  bullData,
  height = 380,
  unit = 'AUD Mn',
  surface: _surface = 'light',
  loading,
  empty,
  errorMessage,
  ariaLabel,
  className,
  disableReveal = false,
}: KenScenarioFanChartProps) {
  const chartRef = useRef<HighchartsReact.RefObject | null>(null);

  const options = useMemo<Highcharts.Options>(() => {
    const base = buildKenChartBase();

    // Build arearange data pairs for fan fill between bear and bull
    const fanData = bearData.map((bear, i) => [bear, bullData[i] ?? bear]);

    return deepMerge(base, {
      chart: {
        type: 'areaspline',
        height,
        marginLeft: 64,
        marginRight: 16,
        marginTop: 16,
        marginBottom: 48,
      },

      xAxis: {
        categories: [...labels],
        // Visual mark for projection years (2026F+2027F = last 2)
        plotLines:
          labels.length >= 2
            ? [
                {
                  color: 'rgba(0,0,0,0.12)',
                  dashStyle: 'Dot',
                  width: 1,
                  // Between index 3 (2025) and index 4 (2026F) · x = 3.5
                  value: labels.length - 2 - 0.5,
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
          // Style forecast year labels differently
          formatter: function () {
            const cat = String(this.value);
            const isProjected = cat.endsWith('F');
            return `<span style="color:${isProjected ? KEN_INK.muted : 'rgba(0,0,0,0.6)'}; font-style:${isProjected ? 'italic' : 'normal'}">${cat}</span>`;
          },
          useHTML: true,
        },
      },

      yAxis: {
        title: {
          text: unit,
          style: {
            color: KEN_INK.muted,
            fontFamily: KEN_CHART_FONT.sans,
            fontSize: '10px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          },
          rotation: -90,
          offset: 44,
        },
        labels: {
          formatter: function () {
            const v = this.value as number;
            return v >= 1000
              ? `${(v / 1000).toLocaleString('en-US', { maximumFractionDigits: 1 })}k`
              : v.toLocaleString('en-US');
          },
        },
        min: 0,
      },

      tooltip: {
        useHTML: true,
        shared: true,
        formatter: function () {
          const pts = (this as Highcharts.TooltipFormatterContextObject).points ?? [];
          const cat = (this as Highcharts.TooltipFormatterContextObject).x;
          // Filter out the arearange fan series from tooltip
          const scenarioPts = pts.filter((p) => p.series.type !== 'arearange');
          const rows = scenarioPts
            .map((p) => {
              const v = typeof p.y === 'number'
                ? p.y.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
                : '—';
              return `<div style="display:flex;align-items:center;gap:8px;margin-top:3px;">
                <span style="display:inline-block;width:10px;height:2px;background:${p.color};"></span>
                <span style="font-size:10.5px;color:rgba(0,0,0,0.6);">${p.series.name}</span>
                <span style="font-size:11.5px;color:rgb(26,26,46);font-variant-numeric:tabular-nums;font-weight:500;margin-left:auto;">${v} ${unit}</span>
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

      plotOptions: {
        areaspline: {
          lineWidth: 2,
          fillOpacity: 0,
          marker: {
            enabled: true,
            symbol: 'circle',
            radius: 3,
            // FIX (Bug 2): marker fillColor removed from plotOptions base
            // Each series sets its own marker fillColor = series color (not white)
          },
          states: {
            hover: { lineWidthPlus: 1 },
          },
        },
        arearange: {
          // FIX (Bug 2): fan fill uses light perano · was same as bear color
          fillOpacity: 0.18,
          lineWidth: 0,
          color: SCENARIO_COLORS.fan,
          fillColor: SCENARIO_COLORS.fan,
          enableMouseTracking: false,
          marker: { enabled: false },
          showInLegend: false,
        },
      },

      // Internal Highcharts legend disabled · ChartFigure owns legend slot exclusively.
      // Bug 1+2 fix (2026-05-25): double-legend collision + label collision.
      // Was: legend enabled at verticalAlign:'bottom' → labels touched each other.
      legend: { enabled: false },

      series: [
        // Fan fill first (renders behind lines)
        {
          type: 'arearange',
          name: 'Uncertainty band',
          data: fanData as number[][],
          showInLegend: false,
          color: SCENARIO_COLORS.fan,
          fillColor: SCENARIO_COLORS.fan,
          lineWidth: 0,
          enableMouseTracking: false,
          zIndex: 0,
        },
        // Bear · dashed
        {
          type: 'spline',
          name: 'Bear',
          data: [...bearData],
          color: SCENARIO_COLORS.bear,
          dashStyle: 'Dash',
          lineWidth: 1.5,
          zIndex: 1,
          marker: {
            enabled: true,
            symbol: 'circle',
            radius: 3,
            // FIX (Bug 2): fillColor = series color not '#ffffff'
            fillColor: SCENARIO_COLORS.bear,
            lineWidth: 1.5,
            lineColor: SCENARIO_COLORS.bear,
          },
        },
        // Base · solid accent · most prominent
        {
          type: 'spline',
          name: 'Base',
          data: [...baseData],
          color: SCENARIO_COLORS.base,
          dashStyle: 'Solid',
          lineWidth: 2.5,
          zIndex: 3,
          marker: {
            enabled: true,
            symbol: 'circle',
            radius: 4,
            // FIX (Bug 2): fillColor = series color not '#ffffff'
            fillColor: SCENARIO_COLORS.base,
            lineWidth: 2,
            lineColor: SCENARIO_COLORS.base,
          },
        },
        // Bull · shortdash
        {
          type: 'spline',
          name: 'Bull',
          data: [...bullData],
          color: SCENARIO_COLORS.bull,
          dashStyle: 'ShortDash',
          lineWidth: 1.5,
          zIndex: 2,
          marker: {
            enabled: true,
            symbol: 'circle',
            radius: 3,
            // FIX (Bug 2): fillColor = series color not '#ffffff'
            fillColor: SCENARIO_COLORS.bull,
            lineWidth: 1.5,
            lineColor: SCENARIO_COLORS.bull,
          },
        },
      ],
    } as Partial<Highcharts.Options>);
  }, [labels, bearData, baseData, bullData, height, unit]);

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
        aria-label={ariaLabel ?? 'Scenario fan chart · Bear / Base / Bull projections'}
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
