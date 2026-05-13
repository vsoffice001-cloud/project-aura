import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { ChartTitleHeader, type LegendItem } from '@/app/components/ui/chart-title-header';

interface ChartProps {
  title: string;
  legendItems?: LegendItem[];
  chartOptions: Highcharts.Options;
  height?: number;
}

export function Chart({ title, legendItems, chartOptions, height = 380 }: ChartProps) {
  // Ensure all chart text uses DM Sans font family
  const chartOptionsWithFonts: Highcharts.Options = {
    ...chartOptions,
    chart: {
      ...chartOptions.chart,
      style: {
        fontFamily: 'var(--font-body)',
      },
    },
    xAxis: Array.isArray(chartOptions.xAxis)
      ? chartOptions.xAxis.map(axis => ({
          ...axis,
          labels: {
            ...axis.labels,
            style: {
              ...axis.labels?.style,
              fontFamily: 'var(--font-body)',
              color: 'var(--black-500)',
            },
          },
          title: {
            ...axis.title,
            style: {
              ...axis.title?.style,
              fontFamily: 'var(--font-body)',
              color: 'var(--black-500)',
            },
          },
        }))
      : {
          ...chartOptions.xAxis,
          labels: {
            ...(chartOptions.xAxis as Highcharts.XAxisOptions)?.labels,
            style: {
              ...(chartOptions.xAxis as Highcharts.XAxisOptions)?.labels?.style,
              fontFamily: 'var(--font-body)',
              color: 'var(--black-500)',
            },
          },
          title: {
            ...(chartOptions.xAxis as Highcharts.XAxisOptions)?.title,
            style: {
              ...(chartOptions.xAxis as Highcharts.XAxisOptions)?.title?.style,
              fontFamily: 'var(--font-body)',
              color: 'var(--black-500)',
            },
          },
        },
    yAxis: Array.isArray(chartOptions.yAxis)
      ? chartOptions.yAxis.map(axis => ({
          ...axis,
          labels: {
            ...axis.labels,
            style: {
              ...axis.labels?.style,
              fontFamily: 'var(--font-body)',
              color: 'var(--black-500)',
            },
          },
          title: {
            ...axis.title,
            style: {
              ...axis.title?.style,
              fontFamily: 'var(--font-body)',
              color: 'var(--black-500)',
            },
          },
        }))
      : {
          ...chartOptions.yAxis,
          labels: {
            ...(chartOptions.yAxis as Highcharts.YAxisOptions)?.labels,
            style: {
              ...(chartOptions.yAxis as Highcharts.YAxisOptions)?.labels?.style,
              fontFamily: 'var(--font-body)',
              color: 'var(--black-500)',
            },
          },
          title: {
            ...(chartOptions.yAxis as Highcharts.YAxisOptions)?.title,
            style: {
              ...(chartOptions.yAxis as Highcharts.YAxisOptions)?.title?.style,
              fontFamily: 'var(--font-body)',
              color: 'var(--black-500)',
            },
          },
        },
    legend: {
      ...chartOptions.legend,
      itemStyle: {
        ...chartOptions.legend?.itemStyle,
        fontFamily: 'var(--font-body)',
        color: 'var(--black-500)',
        fontSize: 'var(--text-xs)',
      },
    },
    tooltip: {
      ...chartOptions.tooltip,
      style: {
        ...chartOptions.tooltip?.style,
        fontFamily: 'var(--font-body)',
      },
    },
  };

  return (
    <div>
      <ChartTitleHeader title={title} legendItems={legendItems} />
      <div className="w-full relative" style={{ height: `${height}px`, paddingBottom: 'var(--space-2)' }}>
        <HighchartsReact highcharts={Highcharts} options={chartOptionsWithFonts} />
      </div>
    </div>
  );
}
