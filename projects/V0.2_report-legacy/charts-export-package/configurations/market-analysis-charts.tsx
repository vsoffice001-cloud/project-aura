import Highcharts from 'highcharts';
import type { LegendItem } from '../components/chart-title-header';

/**
 * KP 2.0 Charts Export Package - Market Analysis Charts
 * 
 * This file contains all 3 chart configurations from the Market Analysis section:
 * 1. Market Size Area Chart (Historical + Projected)
 * 2. Year-over-Year Growth Rate Column Chart
 * 3. Value vs Volume Growth Line Chart
 * 
 * All charts follow KP 2.0 Design System:
 * - Colors: Purple 500 (#7f5fe3) as primary
 * - Typography: DM Sans font family
 * - Styling: Transparent backgrounds, rounded borders
 */

// ============================================================================
// CHART 1: Market Size Area Chart
// ============================================================================

export const marketSizeOptions: Highcharts.Options = {
  chart: {
    type: 'area',
    backgroundColor: 'transparent',
    spacingBottom: 35,
    spacingTop: 10,
    spacingLeft: 15,
    spacingRight: 15,
  },
  title: {
    text: '',
  },
  credits: {
    enabled: false,
  },
  accessibility: {
    enabled: false,
  },
  legend: {
    enabled: false,
  },
  xAxis: {
    categories: ['2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'],
    gridLineWidth: 1,
    gridLineColor: 'var(--black-200)',
    lineColor: 'var(--black-200)',
  },
  yAxis: {
    title: {
      text: '$ Million',
    },
    gridLineColor: 'var(--black-200)',
    labels: {
      formatter: function () {
        return '$' + this.value + 'M';
      },
    },
  },
  tooltip: {
    shared: true,
    backgroundColor: 'var(--white)',
    borderColor: 'var(--black-200)',
    borderRadius: 8,
    formatter: function () {
      const point = this.points?.[0];
      if (!point) return '';
      const label = point.series.name === 'Historical' ? 'Historical' : 'Projected';
      return `<b>${point.x}</b><br/>${label}: <b>$${point.y}M</b>`;
    },
  },
  plotOptions: {
    area: {
      marker: {
        enabled: false,
        symbol: 'circle',
        radius: 4,
        states: {
          hover: {
            enabled: true,
          },
        },
      },
      lineWidth: 3,
      states: {
        hover: {
          lineWidth: 3,
        },
      },
      threshold: null,
    },
  },
  series: [
    {
      type: 'area',
      name: 'Historical',
      data: [
        [0, 120],  // 2019: $120M
        [1, 125],  // 2020: $125M
        [2, 130],  // 2021: $130M
        [3, 138],  // 2022: $138M
        [4, 142],  // 2023: $142M
        [5, 150],  // 2024: $150M
      ],
      color: 'var(--purple-500)',
      fillColor: {
        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
        stops: [
          [0, 'rgba(127, 95, 227, 0.2)'],
          [1, 'rgba(127, 95, 227, 0)'],
        ],
      },
      dashStyle: 'Solid',
    },
    {
      type: 'area',
      name: 'Projected',
      data: [
        [5, 150],  // 2024: $150M (connection point)
        [6, 160],  // 2025: $160M
        [7, 172],  // 2026: $172M
        [8, 185],  // 2027: $185M
        [9, 196],  // 2028: $196M
        [10, 204], // 2029: $204M
        [11, 213], // 2030: $213M
      ],
      color: 'var(--purple-500)',
      fillColor: {
        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
        stops: [
          [0, 'rgba(127, 95, 227, 0.15)'],
          [1, 'rgba(127, 95, 227, 0)'],
        ],
      },
      dashStyle: 'Dash',
    },
  ],
};

export const marketSizeLegend: LegendItem[] = [
  { color: 'purple-500', label: 'Historical (2019-2024)' },
  { color: 'purple-300', label: 'Projected (2025-2030)' },
];

// ============================================================================
// CHART 2: Year-over-Year Growth Rate Column Chart
// ============================================================================

export const growthRateOptions: Highcharts.Options = {
  chart: {
    type: 'column',
    backgroundColor: 'transparent',
    spacingBottom: 35,
    spacingTop: 10,
    spacingLeft: 15,
    spacingRight: 15,
  },
  title: {
    text: '',
  },
  credits: {
    enabled: false,
  },
  accessibility: {
    enabled: false,
  },
  legend: {
    enabled: false,
  },
  xAxis: {
    categories: ['2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'],
    gridLineWidth: 1,
    gridLineColor: 'var(--black-200)',
    lineColor: 'var(--black-200)',
  },
  yAxis: {
    title: {
      text: 'Growth Rate (%)',
    },
    gridLineColor: 'var(--black-200)',
    labels: {
      formatter: function () {
        return this.value + '%';
      },
    },
  },
  tooltip: {
    backgroundColor: 'var(--white)',
    borderColor: 'var(--black-200)',
    borderRadius: 8,
    formatter: function () {
      return `<b>${this.x}</b><br/>Growth Rate: <b>${this.y}%</b>`;
    },
  },
  plotOptions: {
    column: {
      borderRadius: 4,
      dataLabels: {
        enabled: false,
      },
    },
  },
  series: [
    {
      type: 'column',
      name: 'YoY Growth',
      data: [
        4.2,  // 2020: 4.2%
        4.0,  // 2021: 4.0%
        6.2,  // 2022: 6.2%
        2.9,  // 2023: 2.9%
        5.6,  // 2024: 5.6%
        6.7,  // 2025: 6.7%
        7.5,  // 2026: 7.5%
        7.6,  // 2027: 7.6%
        5.9,  // 2028: 5.9%
        4.1,  // 2029: 4.1%
        4.4,  // 2030: 4.4%
      ],
      color: 'var(--purple-500)',
    },
  ],
};

// ============================================================================
// CHART 3: Value vs Volume Growth Line Chart
// ============================================================================

export const valueVolumeOptions: Highcharts.Options = {
  chart: {
    type: 'line',
    backgroundColor: 'transparent',
    spacingBottom: 35,
    spacingTop: 10,
    spacingLeft: 15,
    spacingRight: 15,
  },
  title: {
    text: '',
  },
  credits: {
    enabled: false,
  },
  accessibility: {
    enabled: false,
  },
  legend: {
    enabled: true,
  },
  xAxis: {
    categories: ['2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'],
    gridLineWidth: 1,
    gridLineColor: 'var(--black-200)',
    lineColor: 'var(--black-200)',
  },
  yAxis: {
    title: {
      text: 'Growth Rate (%)',
    },
    gridLineColor: 'var(--black-200)',
    labels: {
      formatter: function () {
        return this.value + '%';
      },
    },
  },
  tooltip: {
    shared: true,
    backgroundColor: 'var(--white)',
    borderColor: 'var(--black-200)',
    borderRadius: 8,
  },
  plotOptions: {
    line: {
      marker: {
        enabled: true,
        symbol: 'circle',
        radius: 4,
      },
      lineWidth: 3,
    },
  },
  series: [
    {
      type: 'line',
      name: 'Value Growth',
      data: [
        4.2,  // 2019: 4.2%
        4.0,  // 2020: 4.0%
        6.2,  // 2021: 6.2%
        2.9,  // 2022: 2.9%
        5.6,  // 2023: 5.6%
        6.7,  // 2024: 6.7%
        7.5,  // 2025: 7.5%
        7.6,  // 2026: 7.6%
        5.9,  // 2027: 5.9%
        4.1,  // 2028: 4.1%
        4.4,  // 2029: 4.4%
      ],
      color: 'var(--purple-500)',
    },
    {
      type: 'line',
      name: 'Volume Growth',
      data: [
        3.8,  // 2019: 3.8%
        3.5,  // 2020: 3.5%
        5.8,  // 2021: 5.8%
        2.5,  // 2022: 2.5%
        5.2,  // 2023: 5.2%
        6.2,  // 2024: 6.2%
        7.0,  // 2025: 7.0%
        7.2,  // 2026: 7.2%
        5.5,  // 2027: 5.5%
        3.8,  // 2028: 3.8%
        4.0,  // 2029: 4.0%
      ],
      color: 'var(--purple-300)',
    },
  ],
};

// ============================================================================
// USAGE EXAMPLE
// ============================================================================

/**
 * Example: Using these charts in a React component
 * 
 * import { Chart } from '@/components/ui/chart';
 * import { marketSizeOptions, marketSizeLegend } from './market-analysis-charts';
 * 
 * function MarketAnalysis() {
 *   return (
 *     <Chart
 *       title="Historical & Projected Market Size ($ Million)"
 *       legendItems={marketSizeLegend}
 *       chartOptions={marketSizeOptions}
 *       height={380}
 *     />
 *   );
 * }
 */
