import { ArrowLeft } from 'lucide-react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Chart } from '@/app/components/ui/chart';
import type { LegendItem } from '@/app/components/ui/chart-title-header';
import { Card, CardHeader, CardTitle, CardContent } from '@/app/components/ui/card';
import { CaretUpDown } from '@phosphor-icons/react';
import { SegmentationCard, SegmentationItem } from '@/app/components/ui/segmentation-card';
import { getSegmentationIconByIndex } from '@/app/constants/segmentation-icons';

/**
 * KP 2.0 Design System - Charts Showcase Page
 * 
 * Displays all charts and data visualizations used in the KP 2.0 Market Research Report Landing Page.
 * This page serves as a visual reference for the development team.
 */

export function ChartsShowcasePage() {
  // ============================================================================
  // CHART 1: Market Size Area Chart
  // ============================================================================
  
  const marketSizeOptions: Highcharts.Options = {
    chart: {
      type: 'area',
      backgroundColor: 'transparent',
      spacingBottom: 35,
      spacingTop: 10,
      spacingLeft: 15,
      spacingRight: 15,
    },
    title: { text: '' },
    credits: { enabled: false },
    accessibility: { enabled: false },
    legend: { enabled: false },
    xAxis: {
      categories: ['2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'],
      gridLineWidth: 1,
      gridLineColor: 'var(--black-200)',
      lineColor: 'var(--black-200)',
    },
    yAxis: {
      title: { text: '$ Million' },
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
        marker: { enabled: false, symbol: 'circle', radius: 4, states: { hover: { enabled: true } } },
        lineWidth: 3,
        threshold: null,
      },
    },
    series: [
      {
        type: 'area',
        name: 'Historical',
        data: [[0, 120], [1, 125], [2, 130], [3, 138], [4, 142], [5, 150]],
        color: 'var(--purple-500)',
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [[0, 'rgba(127, 95, 227, 0.2)'], [1, 'rgba(127, 95, 227, 0)']],
        },
        dashStyle: 'Solid',
      },
      {
        type: 'area',
        name: 'Projected',
        data: [[5, 150], [6, 160], [7, 172], [8, 185], [9, 196], [10, 204], [11, 213]],
        color: 'var(--purple-500)',
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [[0, 'rgba(127, 95, 227, 0.15)'], [1, 'rgba(127, 95, 227, 0)']],
        },
        dashStyle: 'Dash',
      },
    ],
  };

  const marketSizeLegend: LegendItem[] = [
    { color: 'purple-500', label: 'Historical (2019-2024)' },
    { color: 'purple-300', label: 'Projected (2025-2030)' },
  ];

  // ============================================================================
  // CHART 2: Growth Rate Column Chart
  // ============================================================================

  const growthRateOptions: Highcharts.Options = {
    chart: {
      type: 'column',
      backgroundColor: 'transparent',
      spacingBottom: 35,
      spacingTop: 10,
      spacingLeft: 15,
      spacingRight: 15,
    },
    title: { text: '' },
    credits: { enabled: false },
    accessibility: { enabled: false },
    legend: { enabled: false },
    xAxis: {
      categories: ['2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'],
      gridLineWidth: 1,
      gridLineColor: 'var(--black-200)',
      lineColor: 'var(--black-200)',
    },
    yAxis: {
      title: { text: 'Growth Rate (%)' },
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
        dataLabels: { enabled: false },
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

  // ============================================================================
  // CHART 3: Value vs Volume Line Chart
  // ============================================================================

  const valueVolumeOptions: Highcharts.Options = {
    chart: {
      type: 'line',
      backgroundColor: 'transparent',
      spacingBottom: 35,
      spacingTop: 10,
      spacingLeft: 15,
      spacingRight: 15,
    },
    title: { text: '' },
    credits: { enabled: false },
    accessibility: { enabled: false },
    legend: { enabled: true },
    xAxis: {
      categories: ['2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'],
      gridLineWidth: 1,
      gridLineColor: 'var(--black-200)',
      lineColor: 'var(--black-200)',
    },
    yAxis: {
      title: { text: 'Growth Rate (%)' },
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
        marker: { enabled: true, symbol: 'circle', radius: 4 },
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

  // ============================================================================
  // CHART 4: Market Share Pie Chart
  // ============================================================================

  const marketShareOptions: Highcharts.Options = {
    chart: {
      type: 'pie',
      backgroundColor: 'transparent',
      height: 300,
    },
    title: { text: '' },
    credits: { enabled: false },
    accessibility: { enabled: false },
    tooltip: {
      backgroundColor: '#ffffff',
      borderColor: '#e5e5e5',
      borderRadius: 8,
      style: { color: '#171717' },
      pointFormat: '<b>{point.percentage:.1f}%</b>',
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        innerSize: '50%',
        dataLabels: { enabled: false },
        showInLegend: false,
        borderWidth: 2,
        borderColor: '#ffffff',
      },
    },
    series: [
      {
        type: 'pie',
        name: 'Market Share',
        colorByPoint: true,
        data: [
          { name: 'Qatar Green Farms', y: 12, color: '#b8aeef' },
          { name: 'Al Waha Farms', y: 10, color: '#9b80eb' },
          { name: 'Fresh Herbs Qatar', y: 8, color: '#7f5fe3' },
          { name: 'Qatar Organic Farms', y: 8, color: '#6d52d9' },
          { name: 'Gulf Herbs Co.', y: 7, color: '#5b43b8' },
          { name: 'Others', y: 55, color: '#e5e5e5' },
        ],
      },
    ],
  };

  // ============================================================================
  // CHART 5: GCC Market Size Comparison (Bar Chart)
  // ============================================================================

  const gccComparisonOptions: Highcharts.Options = {
    chart: {
      type: 'bar',
      backgroundColor: 'transparent',
      height: 350,
      spacingBottom: 35,
      spacingTop: 10,
      spacingLeft: 15,
      spacingRight: 15,
    },
    title: { text: '' },
    credits: { enabled: false },
    accessibility: { enabled: false },
    xAxis: {
      categories: ['Saudi Arabia', 'UAE', 'Kuwait', 'Qatar', 'Oman', 'Bahrain'],
      gridLineWidth: 0,
      lineColor: 'var(--black-200)',
    },
    yAxis: {
      min: 0,
      title: { text: '$ Million' },
      gridLineColor: 'var(--black-200)',
      labels: {
        formatter: function () {
          return '$' + this.value + 'M';
        },
      },
    },
    legend: { enabled: false },
    tooltip: {
      backgroundColor: 'var(--white)',
      borderColor: 'var(--black-200)',
      borderRadius: 10,
      formatter: function () {
        return `<b>${this.x}</b><br/>Market Size: <b>$${this.y}M</b>`;
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 5,
        pointWidth: 30,
        dataLabels: {
          enabled: true,
          format: '${point.y}M',
          style: {
            color: 'var(--black-500)',
            fontSize: '11px',
            fontWeight: '400',
          },
        },
      },
    },
    series: [
      {
        type: 'bar',
        name: 'Market Size',
        data: [
          { y: 850, color: 'var(--black-300)' },
          { y: 420, color: 'var(--purple-300)' },
          { y: 180, color: 'var(--purple-400)' },
          { y: 150, color: 'var(--purple-500)' },
          { y: 95, color: 'var(--purple-600)' },
          { y: 65, color: 'var(--purple-700)' },
        ],
      },
    ],
  };

  // ============================================================================
  // DATA: Market Performance Table Data
  // ============================================================================

  const marketData = [
    { year: 2019, marketSize: 120, yoyGrowth: null, domestic: 18, imports: 82, organicShare: 8, period: 'Historical' },
    { year: 2020, marketSize: 125, yoyGrowth: 4.2, domestic: 19, imports: 81, organicShare: 10, period: 'Historical' },
    { year: 2021, marketSize: 132, yoyGrowth: 5.6, domestic: 20, imports: 80, organicShare: 12, period: 'Historical' },
    { year: 2022, marketSize: 140, yoyGrowth: 6.1, domestic: 22, imports: 78, organicShare: 14, period: 'Historical' },
    { year: 2023, marketSize: 145, yoyGrowth: 3.6, domestic: 24, imports: 76, organicShare: 16, period: 'Historical' },
    { year: 2024, marketSize: 150, yoyGrowth: 3.4, domestic: 26, imports: 74, organicShare: 18, period: 'Historical' },
    { year: 2025, marketSize: 158, yoyGrowth: 5.3, domestic: 28, imports: 72, organicShare: 21, period: 'Forecast' },
    { year: 2026, marketSize: 167, yoyGrowth: 5.7, domestic: 31, imports: 69, organicShare: 24, period: 'Forecast' },
    { year: 2027, marketSize: 177, yoyGrowth: 6.0, domestic: 34, imports: 66, organicShare: 27, period: 'Forecast' },
    { year: 2028, marketSize: 188, yoyGrowth: 6.2, domestic: 37, imports: 63, organicShare: 30, period: 'Forecast' },
    { year: 2029, marketSize: 200, yoyGrowth: 6.4, domestic: 40, imports: 60, organicShare: 33, period: 'Forecast' },
    { year: 2030, marketSize: 213, yoyGrowth: 6.5, domestic: 44, imports: 56, organicShare: 36, period: 'Forecast' },
  ];

  // ============================================================================
  // DATA: Segmentation Data
  // ============================================================================

  const herbTypeData: SegmentationItem[] = [
    { name: 'Mint', share: 25, cagr: '7.2%' },
    { name: 'Parsley', share: 20, cagr: '5.5%' },
    { name: 'Basil', share: 18, cagr: '6.8%' },
    { name: 'Coriander', share: 15, cagr: '5.2%' },
    { name: 'Thyme', share: 8 },
    { name: 'Oregano', share: 6 },
    { name: 'Others', share: 8 },
  ];

  const endUserData: SegmentationItem[] = [
    { name: 'Retail Consumers', share: 35, cagr: '8.0%', description: 'Home cooking & personal use' },
    { name: 'Restaurants', share: 30, description: 'Fine dining & casual eateries' },
    { name: 'Food Processing', share: 15, description: 'Manufacturing & packaging' },
    { name: 'Catering Services', share: 12, description: 'Events & institutional' },
    { name: 'Others', share: 8, description: 'Hotels, airlines, etc.' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[var(--purple-500)] text-white py-8">
        <div className="max-w-7xl mx-auto px-[84.375px] lg:px-[112.5px]">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </a>
          <h1 className="font-display text-4xl tracking-tight mb-4">
            Charts Showcase
          </h1>
          <p className="text-white/90 text-lg max-w-3xl">
            All 4 charts used in the KP 2.0 Market Research Report Landing Page.
            These charts visualize market data using Highcharts with the KP 2.0 Design System.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-[84.375px] lg:px-[112.5px] py-16">
        {/* Overview */}
        <section className="mb-16">
          <h2 className="font-display text-2xl tracking-tight mb-4">Overview</h2>
          <p className="text-[var(--black-500)] text-base leading-relaxed mb-4">
            This page showcases all charts from the Market Research Report, including area charts,
            column charts, line charts, and pie charts. All charts follow the KP 2.0 Design System
            with Purple 500 (#7f5fe3) as the primary color and DM Sans as the universal font.
          </p>
          <div className="bg-[var(--black-50)] rounded-[var(--radius-md)] p-6 border border-[var(--black-200)]">
            <h3 className="font-bold text-lg mb-2">Technical Details</h3>
            <ul className="space-y-2 text-[var(--black-500)]">
              <li>• <strong>Library:</strong> Highcharts v11+</li>
              <li>• <strong>React Wrapper:</strong> highcharts-react-official v3+</li>
              <li>• <strong>Color Palette:</strong> Purple 500 (base), Purple 300-700 (gradients)</li>
              <li>• <strong>Typography:</strong> DM Sans font family</li>
              <li>• <strong>Styling:</strong> Transparent backgrounds, 8px border radius</li>
            </ul>
          </div>
        </section>

        {/* Charts */}
        <section className="space-y-12">
          {/* Chart 1: Market Size Area Chart */}
          <div>
            <div className="mb-6">
              <h2 className="font-display text-2xl tracking-tight mb-2">
                Chart 1: Market Size Area Chart
              </h2>
              <p className="text-[var(--black-500)]">
                Historical and projected market size from 2019 to 2030. Uses gradient fill and dashed line for projections.
              </p>
              <div className="flex gap-2 mt-3 text-sm">
                <span className="px-3 py-1 bg-[var(--purple-100)] text-[var(--purple-700)] rounded-full">Area Chart</span>
                <span className="px-3 py-1 bg-[var(--black-100)] text-[var(--black-700)] rounded-full">12 Data Points</span>
                <span className="px-3 py-1 bg-[var(--black-100)] text-[var(--black-700)] rounded-full">380px Height</span>
              </div>
            </div>
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
          </div>

          {/* Chart 2 & 3: Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Chart 2: Growth Rate Column Chart */}
            <div>
              <div className="mb-6">
                <h2 className="font-display text-2xl tracking-tight mb-2">
                  Chart 2: Growth Rate
                </h2>
                <p className="text-[var(--black-500)]">
                  Year-over-year growth rate percentages from 2020 to 2030.
                </p>
                <div className="flex gap-2 mt-3 text-sm">
                  <span className="px-3 py-1 bg-[var(--purple-100)] text-[var(--purple-700)] rounded-full">Column Chart</span>
                  <span className="px-3 py-1 bg-[var(--black-100)] text-[var(--black-700)] rounded-full">11 Data Points</span>
                </div>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Year-over-Year Growth Rate (%)</CardTitle>
                </CardHeader>
                <CardContent>
                  <Chart
                    title=""
                    chartOptions={growthRateOptions}
                    height={360}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Chart 3: Value vs Volume Line Chart */}
            <div>
              <div className="mb-6">
                <h2 className="font-display text-2xl tracking-tight mb-2">
                  Chart 3: Value vs Volume
                </h2>
                <p className="text-[var(--black-500)]">
                  Comparison of value growth and volume growth trends.
                </p>
                <div className="flex gap-2 mt-3 text-sm">
                  <span className="px-3 py-1 bg-[var(--purple-100)] text-[var(--purple-700)] rounded-full">Line Chart</span>
                  <span className="px-3 py-1 bg-[var(--black-100)] text-[var(--black-700)] rounded-full">2 Series</span>
                </div>
              </div>
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
          </div>

          {/* Chart 4: Market Share Pie Chart */}
          <div>
            <div className="mb-6">
              <h2 className="font-display text-2xl tracking-tight mb-2">
                Chart 4: Market Share Pie Chart
              </h2>
              <p className="text-[var(--black-500)]">
                Market share distribution by company using a donut chart with purple gradient colors.
              </p>
              <div className="flex gap-2 mt-3 text-sm">
                <span className="px-3 py-1 bg-[var(--purple-100)] text-[var(--purple-700)] rounded-full">Pie/Donut Chart</span>
                <span className="px-3 py-1 bg-[var(--black-100)] text-[var(--black-700)] rounded-full">6 Slices</span>
                <span className="px-3 py-1 bg-[var(--black-100)] text-[var(--black-700)] rounded-full">300px Height</span>
              </div>
            </div>
            <Card className="max-w-2xl">
              <CardHeader>
                <CardTitle>Market Share by Company</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <HighchartsReact highcharts={Highcharts} options={marketShareOptions} />
                </div>
                <div className="grid grid-cols-2 gap-3 mt-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#b8aeef' }}></div>
                    <span className="text-sm text-[var(--black-500)]">Qatar Green Farms (12%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#9b80eb' }}></div>
                    <span className="text-sm text-[var(--black-500)]">Al Waha Farms (10%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#7f5fe3' }}></div>
                    <span className="text-sm text-[var(--black-500)]">Fresh Herbs Qatar (8%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#6d52d9' }}></div>
                    <span className="text-sm text-[var(--black-500)]">Qatar Organic Farms (8%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#5b43b8' }}></div>
                    <span className="text-sm text-[var(--black-500)]">Gulf Herbs Co. (7%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#e5e5e5' }}></div>
                    <span className="text-sm text-[var(--black-500)]">Others (55%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chart 5: GCC Market Size Comparison (Bar Chart) */}
          <div>
            <div className="mb-6">
              <h2 className="font-display text-2xl tracking-tight mb-2">
                Chart 5: GCC Market Size Comparison
              </h2>
              <p className="text-[var(--black-500)]">
                Market size comparison of GCC countries in 2024. Uses a bar chart with color-coded bars for each country.
              </p>
              <div className="flex gap-2 mt-3 text-sm">
                <span className="px-3 py-1 bg-[var(--purple-100)] text-[var(--purple-700)] rounded-full">Bar Chart</span>
                <span className="px-3 py-1 bg-[var(--black-100)] text-[var(--black-700)] rounded-full">6 Data Points</span>
                <span className="px-3 py-1 bg-[var(--black-100)] text-[var(--black-700)] rounded-full">350px Height</span>
              </div>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>GCC Market Size Comparison ($ Million)</CardTitle>
              </CardHeader>
              <CardContent>
                <Chart
                  title=""
                  chartOptions={gccComparisonOptions}
                  height={350}
                />
              </CardContent>
            </Card>
          </div>

          {/* Data Table: Market Performance Data */}
          <div>
            <div className="mb-6">
              <h2 className="font-display text-2xl tracking-tight mb-2">
                Data Table: Market Performance Data
              </h2>
              <p className="text-[var(--black-500)]">
                Comprehensive market data table showing year-by-year market performance metrics including market size, growth rates, and distribution breakdowns.
              </p>
              <div className="flex gap-2 mt-3 text-sm">
                <span className="px-3 py-1 bg-[var(--purple-100)] text-[var(--purple-700)] rounded-full">Data Table</span>
                <span className="px-3 py-1 bg-[var(--black-100)] text-[var(--black-700)] rounded-full">12 Rows</span>
                <span className="px-3 py-1 bg-[var(--black-100)] text-[var(--black-700)] rounded-full">Sortable Columns</span>
              </div>
            </div>
            <div className="relative overflow-x-auto bg-white border border-[var(--black-200)] rounded-[var(--radius-md)]">
              <table className="w-full text-sm text-left rtl:text-right text-[var(--black-500)]">
                <caption className="p-5 text-lg text-left rtl:text-right text-[var(--black-900)]">
                  Market Performance Data
                  <p className="mt-1.5 text-sm font-normal text-[var(--black-500)]">
                    Historical data (2019-2024) • Projected data (2025-2030)
                  </p>
                </caption>
                <thead className="text-sm text-[var(--black-500)] bg-[var(--black-50)] border-b border-t border-[var(--black-200)]">
                  <tr>
                    <th scope="col" className="px-6 py-3 font-normal">Year</th>
                    <th scope="col" className="px-6 py-3 font-normal">Market Size ($ Mn)</th>
                    <th scope="col" className="px-6 py-3 font-normal">YoY Growth (%)</th>
                    <th scope="col" className="px-6 py-3 font-normal">Domestic (%)</th>
                    <th scope="col" className="px-6 py-3 font-normal">Imports (%)</th>
                    <th scope="col" className="px-6 py-3 font-normal">Organic Share (%)</th>
                    <th scope="col" className="px-6 py-3 font-normal">Period</th>
                  </tr>
                </thead>
                <tbody>
                  {marketData.map((row, index) => (
                    <tr key={row.year} className={index % 2 === 0 ? 'bg-white' : 'bg-[var(--black-50)]'}>
                      <th scope="row" className="px-6 py-4 font-medium text-[var(--black-900)] whitespace-nowrap">
                        {row.year}
                      </th>
                      <td className="px-6 py-4">${row.marketSize}M</td>
                      <td className="px-6 py-4">{row.yoyGrowth !== null ? row.yoyGrowth + '%' : '—'}</td>
                      <td className="px-6 py-4">{row.domestic}%</td>
                      <td className="px-6 py-4">{row.imports}%</td>
                      <td className="px-6 py-4">{row.organicShare}%</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          row.period === 'Historical' 
                            ? 'bg-[var(--purple-100)] text-[var(--purple-700)]' 
                            : 'bg-[var(--black-100)] text-[var(--black-700)]'
                        }`}>
                          {row.period}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Segmentation Cards: Product Type & End-User */}
          <div>
            <div className="mb-6">
              <h2 className="font-display text-2xl tracking-tight mb-2">
                Segmentation Cards: Product Type & End-User
              </h2>
              <p className="text-[var(--black-500)]">
                Market segmentation visualized through custom cards showing market share distribution with progress bars and CAGR indicators.
              </p>
              <div className="flex gap-2 mt-3 text-sm">
                <span className="px-3 py-1 bg-[var(--purple-100)] text-[var(--purple-700)] rounded-full">Custom Component</span>
                <span className="px-3 py-1 bg-[var(--black-100)] text-[var(--black-700)] rounded-full">Progress Bars</span>
                <span className="px-3 py-1 bg-[var(--black-100)] text-[var(--black-700)] rounded-full">Icons</span>
              </div>
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
              <SegmentationCard
                icon={getSegmentationIconByIndex(0)}
                title="Product Type"
                description="Mint and Parsley dominate due to extensive use in traditional Arabic and Mediterranean cuisines, with growing demand for specialty herbs."
                items={herbTypeData}
              />

              <SegmentationCard
                icon={getSegmentationIconByIndex(1)}
                title="End-User"
                description="Retail consumers lead with 35% share as home cooking trends rise, while restaurants maintain steady demand from Qatar's hospitality sector."
                items={endUserData}
              />
            </div>
          </div>
        </section>

        {/* Related Pages */}
        <section className="mt-16 pb-8">
          <h2 className="font-display text-2xl tracking-tight mb-4">Related Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/design-system"
              className="bg-[var(--black-50)] border border-[var(--black-200)] rounded-[var(--radius-md)] p-6 hover:border-[var(--purple-500)] transition-colors"
            >
              <h3 className="font-bold text-lg mb-2">Design System</h3>
              <p className="text-[var(--black-500)] text-sm">
                Complete KP 2.0 Design System documentation
              </p>
            </a>
            <a
              href="/stakeholder-icons"
              className="bg-[var(--black-50)] border border-[var(--black-200)] rounded-[var(--radius-md)] p-6 hover:border-[var(--purple-500)] transition-colors"
            >
              <h3 className="font-bold text-lg mb-2">Stakeholder Icons</h3>
              <p className="text-[var(--black-500)] text-sm">
                15 stakeholder and audience themed icons
              </p>
            </a>
            <a
              href="/segmentation-icons"
              className="bg-[var(--black-50)] border border-[var(--black-200)] rounded-[var(--radius-md)] p-6 hover:border-[var(--purple-500)] transition-colors"
            >
              <h3 className="font-bold text-lg mb-2">Segmentation Icons</h3>
              <p className="text-[var(--black-500)] text-sm">
                15 market segmentation themed icons
              </p>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}