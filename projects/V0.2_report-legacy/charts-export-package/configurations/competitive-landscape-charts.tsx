import Highcharts from 'highcharts';

/**
 * KP 2.0 Charts Export Package - Competitive Landscape Charts
 * 
 * This file contains the pie chart configuration from the Competitive Landscape section:
 * - Market Share Pie/Donut Chart
 * 
 * Features:
 * - Donut chart (innerSize: 50%)
 * - Custom colors for each company
 * - Purple gradient from 300-700
 * - Interactive selection
 * - No data labels (cleaner look)
 */

// ============================================================================
// CHART: Market Share Pie/Donut Chart
// ============================================================================

export const marketShareOptions: Highcharts.Options = {
  chart: {
    type: 'pie',
    backgroundColor: 'transparent',
    height: 200,
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
  tooltip: {
    backgroundColor: '#ffffff',
    borderColor: '#e5e5e5',
    borderRadius: 8,
    style: {
      color: '#171717',
    },
    pointFormat: '<b>{point.percentage:.1f}%</b>',
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      innerSize: '50%',  // Creates donut chart effect
      dataLabels: {
        enabled: false,  // No labels on pie slices
      },
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
        { name: 'Qatar Green Farms', y: 12, color: '#b8aeef' },  // Purple 300
        { name: 'Al Waha Farms', y: 10, color: '#9b80eb' },      // Purple 400
        { name: 'Fresh Herbs Qatar', y: 8, color: '#7f5fe3' },   // Purple 500 (BASE)
        { name: 'Qatar Organic Farms', y: 8, color: '#6d52d9' }, // Purple 600
        { name: 'Gulf Herbs Co.', y: 7, color: '#5b43b8' },      // Purple 700
        { name: 'Others', y: 55, color: '#e5e5e5' },             // Black 200 (gray for "Others")
      ],
    },
  ],
};

// ============================================================================
// MARKET SHARE DATA (for reference)
// ============================================================================

/**
 * This data corresponds to the pie chart above.
 * Use this if you need to display a data table alongside the chart.
 */
export const marketShareData = [
  {
    company: 'Qatar Green Farms',
    share: 12,
    color: '#b8aeef', // Purple 300
    description: 'Organic herbs & vegetables',
    established: 2010,
  },
  {
    company: 'Al Waha Farms',
    share: 10,
    color: '#9b80eb', // Purple 400
    description: 'Hydroponic cultivation',
    established: 2015,
  },
  {
    company: 'Fresh Herbs Qatar',
    share: 8,
    color: '#7f5fe3', // Purple 500 (BASE)
    description: 'Fresh herb retail',
    established: 2018,
  },
  {
    company: 'Qatar Organic Farms',
    share: 8,
    color: '#6d52d9', // Purple 600
    description: 'Certified organic produce',
    established: 2012,
  },
  {
    company: 'Gulf Herbs Co.',
    share: 7,
    color: '#5b43b8', // Purple 700
    description: 'Wholesale distribution',
    established: 2016,
  },
  {
    company: 'Others',
    share: 55,
    color: '#e5e5e5', // Black 200
    description: 'Remaining market players',
    established: null,
  },
];

// ============================================================================
// COLOR PALETTE (for consistency)
// ============================================================================

/**
 * KP 2.0 Purple gradient used for market share visualization
 * 
 * Use these colors when creating similar pie/donut charts:
 * - Lightest to darkest purple for data series
 * - Gray (#e5e5e5) for "Others" or miscellaneous categories
 */
export const marketShareColors = {
  purple300: '#b8aeef',
  purple400: '#9b80eb',
  purple500: '#7f5fe3', // BASE color
  purple600: '#6d52d9',
  purple700: '#5b43b8',
  gray: '#e5e5e5', // For "Others"
};

// ============================================================================
// USAGE EXAMPLE
// ============================================================================

/**
 * Example: Using the market share chart in a React component
 * 
 * import Highcharts from 'highcharts';
 * import HighchartsReact from 'highcharts-react-official';
 * import { marketShareOptions } from './competitive-landscape-charts';
 * 
 * function MarketShareChart() {
 *   return (
 *     <div className="h-[200px]">
 *       <HighchartsReact highcharts={Highcharts} options={marketShareOptions} />
 *     </div>
 *   );
 * }
 */

/**
 * Example: Using the data alongside the chart
 * 
 * import { marketShareData } from './competitive-landscape-charts';
 * 
 * function MarketShareLegend() {
 *   return (
 *     <div className="grid grid-cols-2 gap-2 mt-4">
 *       {marketShareData.map((item) => (
 *         <div key={item.company} className="flex items-center gap-2">
 *           <div 
 *             className="w-3 h-3 rounded-full" 
 *             style={{ backgroundColor: item.color }}
 *           />
 *           <span className="text-sm">
 *             {item.company} ({item.share}%)
 *           </span>
 *         </div>
 *       ))}
 *     </div>
 *   );
 * }
 */
