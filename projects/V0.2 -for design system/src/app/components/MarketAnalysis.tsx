import { TrendUp, ArrowRight } from '@phosphor-icons/react';
import Highcharts from 'highcharts';
import { Chart } from '@/app/components/ui/chart';
import type { LegendItem } from '@/app/components/ui/chart-title-header';
import { TextCard } from '@/app/components/ui/text-card';
import { Card, CardHeader, CardTitle, CardContent } from '@/app/components/ui/card';

export function MarketAnalysis() {
  // Historical & Projected Market Size Data
  const marketSizeOptions: Highcharts.Options = {
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
          [0, 120],  // 2019
          [1, 125],  // 2020
          [2, 130],  // 2021
          [3, 138],  // 2022
          [4, 142],  // 2023
          [5, 150],  // 2024
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
          [5, 150],  // 2024 (connection point)
          [6, 160],  // 2025
          [7, 172],  // 2026
          [8, 185],  // 2027
          [9, 196],  // 2028
          [10, 204], // 2029
          [11, 213], // 2030
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

  const marketSizeLegend: LegendItem[] = [
    { color: 'purple-500', label: 'Historical (2019-2024)' },
    { color: 'purple-300', label: 'Projected (2025-2030)' },
  ];

  // Year-over-Year Growth Rate Data
  const growthRateOptions: Highcharts.Options = {
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
        data: [4.2, 4.0, 6.2, 2.9, 5.6, 6.7, 7.5, 7.6, 5.9, 4.1, 4.4],
        color: 'var(--purple-500)',
      },
    ],
  };

  // Market Value vs Volume Growth Data
  const valueVolumeOptions: Highcharts.Options = {
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
        data: [4.2, 4.0, 6.2, 2.9, 5.6, 6.7, 7.5, 7.6, 5.9, 4.1, 4.4],
        color: 'var(--purple-500)',
      },
      {
        type: 'line',
        name: 'Volume Growth',
        data: [3.8, 3.5, 5.8, 2.5, 5.2, 6.2, 7.0, 7.2, 5.5, 3.8, 4.0],
        color: 'var(--purple-300)',
      },
    ],
  };

  return (
    <section id="market-analysis" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-[84.375px] lg:px-[112.5px]">
        <div className="mb-16">
          <div className="mb-4">
            <span className="font-bold tracking-widest uppercase" style={{ fontSize: '13px', color: 'var(--brand-red)' }}>
              CHAPTER 3 - Market Trajectory & Growth Analysis
            </span>
          </div>
          <h2 className="font-display tracking-tight" style={{ fontSize: '48px', color: 'var(--black-900)' }}>
            Market Size, Growth Forecast
            <span className="block" style={{ color: 'var(--black-900)' }}>& Trends</span>
          </h2>
          <p className="leading-relaxed max-w-3xl" style={{ fontSize: '16px', paddingTop: '10px', color: 'var(--black-500)' }}>
            Comprehensive analysis of the Qatar Fresh Herbs Market covering historical performance (2019-2024) and projected growth trajectory (2025-2030). This section examines market size trends, year-over-year growth rates, volume dynamics, and segment-wise CAGR projections to support strategic planning and investment decisions.
          </p>
        </div>

        <div className="space-y-6 lg:space-y-8">
          {/* Main Market Size Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Historical & Projected Market Size ($ Million)</CardTitle>
            </CardHeader>
            <CardContent>
              <Chart
                title=""
                legendItems={marketSizeLegend}
                chartOptions={marketSizeOptions}
                height={380}
              />
            </CardContent>
          </Card>

          {/* Two Column Charts */}
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            <TextCard
              title="Year-over-Year Growth Rate (%)"
              paragraphs={[]}
            >
              <Chart
                title=""
                chartOptions={growthRateOptions}
                height={360}
              />
            </TextCard>

            <Card>
              <CardHeader>
                <CardTitle>Market Value vs Volume Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <Chart
                  title=""
                  chartOptions={valueVolumeOptions}
                  height={360}
                />
              </CardContent>
            </Card>
          </div>

          {/* Insight Cards */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            <TextCard 
              icon={<TrendUp weight="regular" className="h-5 w-5 text-[var(--purple-500)]" />}
              title="Historical Performance"
              paragraphs={[
                "The market demonstrated steady growth from $120 million in 2019 to $150 million in 2024, achieving a CAGR of 4.6%. Growth was temporarily affected in 2023-2024 but remained resilient."
              ]}
            />

            <TextCard 
              icon={<ArrowRight weight="regular" className="h-5 w-5 text-[var(--purple-500)]" />}
              title="Future Outlook"
              paragraphs={[
                "The market is projected to reach $213 million by 2030, growing at an accelerated CAGR of 6.0%. Increased investment in hydroponics and government support will drive this acceleration."
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}