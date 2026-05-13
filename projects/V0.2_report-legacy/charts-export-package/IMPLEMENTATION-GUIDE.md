# 📐 Charts Implementation Guide

**For:** Development Team  
**Package Version:** 1.0.0  
**Est. Implementation Time:** 2-4 hours

---

## 🎯 Goal

Implement all 4 KP 2.0 charts in your React application using Highcharts.

---

## ✅ Prerequisites Checklist

Before starting, ensure you have:

- [ ] Node.js 16+ installed
- [ ] React 18+ project setup
- [ ] TypeScript configured (recommended)
- [ ] Access to this charts export package
- [ ] Code editor (VS Code recommended)

---

## 📦 Step 1: Install Dependencies

### Install Highcharts Packages

```bash
npm install highcharts highcharts-react-official
```

**OR with Yarn:**

```bash
yarn add highcharts highcharts-react-official
```

**OR with pnpm:**

```bash
pnpm add highcharts highcharts-react-official
```

### Verify Installation

Check your `package.json`:

```json
{
  "dependencies": {
    "highcharts": "^11.4.0",
    "highcharts-react-official": "^3.2.1"
  }
}
```

---

## 📁 Step 2: Copy Components to Your Project

### File Structure

Create this folder structure in your project:

```
your-project/
├── src/
│   └── components/
│       └── ui/
│           ├── chart.tsx                    ← Copy from package
│           └── chart-title-header.tsx       ← Copy from package
```

### Copy Files

1. **Copy `chart.tsx`**
   - Source: `/charts-export-package/components/chart.tsx`
   - Destination: `/your-project/src/components/ui/chart.tsx`

2. **Copy `chart-title-header.tsx`**
   - Source: `/charts-export-package/components/chart-title-header.tsx`
   - Destination: `/your-project/src/components/ui/chart-title-header.tsx`

---

## 🎨 Step 3: Set Up CSS Variables

### Add KP 2.0 Color Variables

Add these to your global CSS file (e.g., `globals.css` or `theme.css`):

```css
:root {
  /* Purple colors */
  --purple-50: #f4f2fc;
  --purple-100: #ebe8f9;
  --purple-200: #d9d3f3;
  --purple-300: #b8aeef;
  --purple-400: #9b80eb;
  --purple-500: #7f5fe3;  /* BASE color */
  --purple-600: #6d52d9;
  --purple-700: #5b43b8;
  
  /* Black/Gray colors */
  --black-50: #fafafa;
  --black-100: #f5f5f5;
  --black-200: #e5e5e5;
  --black-500: #666666;
  --black-900: #171717;
  
  /* White */
  --white: #ffffff;
  
  /* Font */
  --font-body: 'DM Sans', sans-serif;
}
```

### Add Font (DM Sans)

Add to your `<head>` or import in CSS:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">
```

---

## 🔧 Step 4: Fix Import Paths

### Update Import Paths in Components

The copied components use `@/app/components/ui/...` imports. Update them to match your project structure.

#### In `chart.tsx`:

```typescript
// BEFORE (KP 2.0 project)
import { ChartTitleHeader, type LegendItem } from '@/app/components/ui/chart-title-header';

// AFTER (your project - adjust as needed)
import { ChartTitleHeader, type LegendItem } from './chart-title-header';
// OR
import { ChartTitleHeader, type LegendItem } from '@/components/ui/chart-title-header';
```

#### In `chart-title-header.tsx`:

```typescript
// BEFORE (KP 2.0 project)
import { CardHeader, CardTitle } from '@/app/components/ui/card';

// AFTER (your project)
// If you have shadcn/ui components:
import { CardTitle } from '@/components/ui/card';

// OR create simple replacements:
const CardTitle = ({ children, ...props }: any) => <h3 {...props}>{children}</h3>;
```

---

## 📊 Step 5: Implement Your First Chart

### Example: Market Size Area Chart

Create a new component:

```typescript
// src/components/MarketSizeChart.tsx

import { Chart } from '@/components/ui/chart';
import type { LegendItem } from '@/components/ui/chart-title-header';
import Highcharts from 'highcharts';

export function MarketSizeChart() {
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
        marker: { enabled: false },
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
        data: [[5, 150], [6, 160], [7, 172], [8, 185], [9, 196], [10, 204], [11, 213]],
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

  const legend: LegendItem[] = [
    { color: 'purple-500', label: 'Historical (2019-2024)' },
    { color: 'purple-300', label: 'Projected (2025-2030)' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <Chart
        title="Historical & Projected Market Size ($ Million)"
        legendItems={legend}
        chartOptions={marketSizeOptions}
        height={380}
      />
    </div>
  );
}
```

### Use in Your App

```typescript
// src/App.tsx

import { MarketSizeChart } from './components/MarketSizeChart';

function App() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Market Analysis</h1>
      <MarketSizeChart />
    </div>
  );
}

export default App;
```

---

## 🚀 Step 6: Implement Remaining Charts

### Use Pre-Built Configurations

Instead of manually typing chart options, copy them from the `/configurations/` folder:

#### Chart 2: Growth Rate Column Chart

```typescript
// Copy from: /configurations/market-analysis-charts.tsx → growthRateOptions
import { growthRateOptions } from './configs/market-analysis-charts';

<Chart
  title="Year-over-Year Growth Rate (%)"
  chartOptions={growthRateOptions}
  height={360}
/>
```

#### Chart 3: Value vs Volume Line Chart

```typescript
// Copy from: /configurations/market-analysis-charts.tsx → valueVolumeOptions
import { valueVolumeOptions } from './configs/market-analysis-charts';

<Chart
  title="Market Value vs Volume Growth"
  chartOptions={valueVolumeOptions}
  height={360}
/>
```

#### Chart 4: Market Share Pie Chart

```typescript
// Copy from: /configurations/competitive-landscape-charts.tsx → marketShareOptions
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { marketShareOptions } from './configs/competitive-landscape-charts';

<div className="h-[200px]">
  <HighchartsReact highcharts={Highcharts} options={marketShareOptions} />
</div>
```

---

## 🎨 Step 7: Customize for Your Data

### Update Data Arrays

To use your own data, modify the `series` array in chart options:

```typescript
// BEFORE (example data)
series: [{
  type: 'area',
  name: 'Historical',
  data: [[0, 120], [1, 125], [2, 130]],  // [index, value]
}]

// AFTER (your data)
series: [{
  type: 'area',
  name: 'Historical',
  data: [[0, 200], [1, 220], [2, 250]],  // Your actual values
}]
```

### Update Categories (X-Axis)

```typescript
// BEFORE
xAxis: {
  categories: ['2019', '2020', '2021'],
}

// AFTER
xAxis: {
  categories: ['Q1', 'Q2', 'Q3'],  // Your labels
}
```

### Update Colors

```typescript
// BEFORE
color: 'var(--purple-500)',

// AFTER
color: '#ff6b6b',  // Your brand color
```

---

## 🐛 Step 8: Troubleshooting

### Issue 1: "Module not found: 'highcharts'"

**Solution:**
```bash
npm install highcharts highcharts-react-official
```

---

### Issue 2: CSS variables not working

**Solution:** Ensure variables are defined in a global CSS file:

```typescript
// In your entry file (main.tsx or App.tsx)
import './styles/globals.css';
```

---

### Issue 3: Chart not rendering

**Checklist:**
- [ ] Is Highcharts imported?
- [ ] Is chart height set?
- [ ] Is parent container sized correctly?
- [ ] Are there console errors?

**Debug:**
```typescript
console.log('Chart options:', marketSizeOptions);
```

---

### Issue 4: Font not applied

**Solution:** Import DM Sans font:

```html
<!-- In index.html -->
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">
```

```css
/* In CSS */
body {
  font-family: 'DM Sans', sans-serif;
}
```

---

### Issue 5: TypeScript errors

**Solution:** Install Highcharts types:

```bash
npm install --save-dev @types/highcharts
```

---

## ✅ Step 9: Verification Checklist

After implementation, verify:

- [ ] All 4 charts render without errors
- [ ] Charts are responsive (test different screen sizes)
- [ ] Tooltips display correctly
- [ ] Colors match KP 2.0 design system
- [ ] Font is DM Sans
- [ ] Legends display correctly (where applicable)
- [ ] No console warnings or errors
- [ ] Charts load within 1 second

---

## 📚 Additional Resources

### Official Documentation
- [Highcharts API Reference](https://api.highcharts.com/highcharts/)
- [Highcharts React Wrapper](https://github.com/highcharts/highcharts-react)
- [Highcharts Demos](https://www.highcharts.com/demo)

### KP 2.0 Package Files
- **CHARTS-OVERVIEW.md** - Visual catalog of all charts
- **design-specs/chart-colors.md** - Color specifications
- **design-specs/chart-typography.md** - Typography rules
- **configurations/** - Pre-built chart configs

---

## 🎓 Next Steps

### Beginner Level
1. ✅ Implement all 4 charts with provided configs
2. Test responsiveness
3. Verify design matches KP 2.0

### Intermediate Level
1. Customize charts with your own data
2. Add new chart types (scatter, heatmap, etc.)
3. Implement chart export functionality

### Advanced Level
1. Add real-time data updates
2. Implement chart animations
3. Create custom Highcharts plugins
4. Optimize performance for large datasets

---

## 💡 Pro Tips

### Tip 1: Reuse Chart Wrapper
The `Chart` component automatically applies KP 2.0 fonts and styling. Always use it for consistency.

### Tip 2: Use TypeScript
Type your chart options with `Highcharts.Options` for autocomplete and error checking.

### Tip 3: Extract Data
Store chart data in separate files for easier maintenance:

```typescript
// data/market-data.ts
export const marketSizeData = {
  historical: [[0, 120], [1, 125], ...],
  projected: [[5, 150], [6, 160], ...],
};
```

### Tip 4: Environment Variables
Store API keys or data endpoints in `.env` files:

```
VITE_CHART_DATA_API=https://api.example.com/data
```

---

## 🤝 Support

### Questions?

1. Check **CHARTS-OVERVIEW.md** for visual references
2. Review **configurations/** for complete examples
3. Search [Highcharts documentation](https://api.highcharts.com/)
4. Check [Highcharts GitHub issues](https://github.com/highcharts/highcharts/issues)

---

## ✨ You're Done!

After completing all steps, you should have:

✅ 4 fully functional charts  
✅ Matching KP 2.0 design system  
✅ Responsive and performant  
✅ Ready for production  

---

**Guide Version:** 1.0.0  
**Last Updated:** February 11, 2026  
**Estimated Time to Complete:** 2-4 hours
