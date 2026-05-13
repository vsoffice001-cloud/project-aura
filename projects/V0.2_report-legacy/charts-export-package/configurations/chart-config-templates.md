# 🎨 Chart Configuration Templates - KP 2.0

**Purpose:** Reusable templates for creating new charts  
**Version:** 1.0.0  
**Date:** February 11, 2026

---

## 🎯 How to Use These Templates

1. Copy the template for your chart type
2. Replace `[DATA]` with your actual data
3. Customize labels and titles
4. Adjust colors if needed (use KP 2.0 palette)
5. Test in your application

---

## 📊 Template 1: Area Chart

### Use For
- Historical data with projections
- Trend analysis over time
- Market size growth

### Template

```typescript
import Highcharts from 'highcharts';

const areaChartOptions: Highcharts.Options = {
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
    categories: ['2020', '2021', '2022', '2023', '2024'],  // [CUSTOMIZE]
    gridLineWidth: 1,
    gridLineColor: 'var(--black-200)',
    lineColor: 'var(--black-200)',
  },
  yAxis: {
    title: {
      text: 'Value',  // [CUSTOMIZE]
    },
    gridLineColor: 'var(--black-200)',
    labels: {
      formatter: function () {
        return this.value + ' Units';  // [CUSTOMIZE FORMAT]
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
      return `<b>${point.x}</b><br/>${point.series.name}: <b>${point.y}</b>`;
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
      name: 'Series 1',  // [CUSTOMIZE]
      data: [10, 20, 30, 40, 50],  // [YOUR DATA]
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
  ],
};
```

---

## 📊 Template 2: Column Chart

### Use For
- Comparing values across categories
- Year-over-year comparisons
- Growth rate analysis

### Template

```typescript
import Highcharts from 'highcharts';

const columnChartOptions: Highcharts.Options = {
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
    categories: ['Q1', 'Q2', 'Q3', 'Q4'],  // [CUSTOMIZE]
    gridLineWidth: 1,
    gridLineColor: 'var(--black-200)',
    lineColor: 'var(--black-200)',
  },
  yAxis: {
    title: {
      text: 'Revenue ($)',  // [CUSTOMIZE]
    },
    gridLineColor: 'var(--black-200)',
    labels: {
      formatter: function () {
        return '$' + this.value + 'K';  // [CUSTOMIZE FORMAT]
      },
    },
  },
  tooltip: {
    backgroundColor: 'var(--white)',
    borderColor: 'var(--black-200)',
    borderRadius: 8,
    formatter: function () {
      return `<b>${this.x}</b><br/>Revenue: <b>$${this.y}K</b>`;
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
      name: 'Revenue',  // [CUSTOMIZE]
      data: [100, 150, 200, 250],  // [YOUR DATA]
      color: 'var(--purple-500)',
    },
  ],
};
```

---

## 📊 Template 3: Line Chart (Multi-Series)

### Use For
- Comparing multiple metrics over time
- Value vs volume analysis
- Multi-dimensional trends

### Template

```typescript
import Highcharts from 'highcharts';

const lineChartOptions: Highcharts.Options = {
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
    enabled: true,  // Show built-in legend for multi-series
  },
  xAxis: {
    categories: ['2020', '2021', '2022', '2023', '2024'],  // [CUSTOMIZE]
    gridLineWidth: 1,
    gridLineColor: 'var(--black-200)',
    lineColor: 'var(--black-200)',
  },
  yAxis: {
    title: {
      text: 'Percentage (%)',  // [CUSTOMIZE]
    },
    gridLineColor: 'var(--black-200)',
    labels: {
      formatter: function () {
        return this.value + '%';  // [CUSTOMIZE FORMAT]
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
      name: 'Metric 1',  // [CUSTOMIZE]
      data: [10, 20, 30, 40, 50],  // [YOUR DATA]
      color: 'var(--purple-500)',
    },
    {
      type: 'line',
      name: 'Metric 2',  // [CUSTOMIZE]
      data: [15, 25, 35, 45, 55],  // [YOUR DATA]
      color: 'var(--purple-300)',
    },
  ],
};
```

---

## 📊 Template 4: Pie/Donut Chart

### Use For
- Market share distribution
- Category percentages
- Composition analysis

### Template

```typescript
import Highcharts from 'highcharts';

const pieChartOptions: Highcharts.Options = {
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
      innerSize: '50%',  // Donut chart (remove for regular pie)
      dataLabels: {
        enabled: false,
      },
      showInLegend: false,
      borderWidth: 2,
      borderColor: '#ffffff',
    },
  },
  series: [
    {
      type: 'pie',
      name: 'Share',
      colorByPoint: true,
      data: [
        { name: 'Category A', y: 30, color: 'var(--purple-300)' },  // [CUSTOMIZE]
        { name: 'Category B', y: 25, color: 'var(--purple-400)' },
        { name: 'Category C', y: 20, color: 'var(--purple-500)' },
        { name: 'Category D', y: 15, color: 'var(--purple-600)' },
        { name: 'Others', y: 10, color: 'var(--black-200)' },
      ],
    },
  ],
};
```

---

## 📊 Template 5: Bar Chart (Horizontal)

### Use For
- Long category names
- Ranking/comparison
- Top 10 lists

### Template

```typescript
import Highcharts from 'highcharts';

const barChartOptions: Highcharts.Options = {
  chart: {
    type: 'bar',  // Horizontal bars
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
    categories: ['Product A', 'Product B', 'Product C', 'Product D'],  // [CUSTOMIZE]
    gridLineWidth: 0,
  },
  yAxis: {
    title: {
      text: 'Sales ($)',  // [CUSTOMIZE]
    },
    gridLineColor: 'var(--black-200)',
    labels: {
      formatter: function () {
        return '$' + this.value + 'K';  // [CUSTOMIZE FORMAT]
      },
    },
  },
  tooltip: {
    backgroundColor: 'var(--white)',
    borderColor: 'var(--black-200)',
    borderRadius: 8,
    formatter: function () {
      return `<b>${this.x}</b><br/>Sales: <b>$${this.y}K</b>`;
    },
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      dataLabels: {
        enabled: false,
      },
    },
  },
  series: [
    {
      type: 'bar',
      name: 'Sales',  // [CUSTOMIZE]
      data: [100, 200, 300, 400],  // [YOUR DATA]
      color: 'var(--purple-500)',
    },
  ],
};
```

---

## 📊 Template 6: Stacked Column Chart

### Use For
- Composition over time
- Part-to-whole relationships
- Multi-category comparisons

### Template

```typescript
import Highcharts from 'highcharts';

const stackedColumnOptions: Highcharts.Options = {
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
    enabled: true,
  },
  xAxis: {
    categories: ['Q1', 'Q2', 'Q3', 'Q4'],  // [CUSTOMIZE]
    gridLineWidth: 1,
    gridLineColor: 'var(--black-200)',
  },
  yAxis: {
    title: {
      text: 'Total Sales',  // [CUSTOMIZE]
    },
    gridLineColor: 'var(--black-200)',
    stackLabels: {
      enabled: false,
    },
  },
  tooltip: {
    backgroundColor: 'var(--white)',
    borderColor: 'var(--black-200)',
    borderRadius: 8,
  },
  plotOptions: {
    column: {
      stacking: 'normal',
      borderRadius: 4,
      dataLabels: {
        enabled: false,
      },
    },
  },
  series: [
    {
      type: 'column',
      name: 'Product A',  // [CUSTOMIZE]
      data: [50, 60, 70, 80],  // [YOUR DATA]
      color: 'var(--purple-500)',
    },
    {
      type: 'column',
      name: 'Product B',  // [CUSTOMIZE]
      data: [30, 40, 50, 60],  // [YOUR DATA]
      color: 'var(--purple-300)',
    },
    {
      type: 'column',
      name: 'Product C',  // [CUSTOMIZE]
      data: [20, 30, 40, 50],  // [YOUR DATA]
      color: 'var(--purple-600)',
    },
  ],
};
```

---

## 🎨 Color Palette Reference

### For 1-2 Series
- **Primary:** `var(--purple-500)`
- **Secondary:** `var(--purple-300)`

### For 3-5 Series
- Series 1: `var(--purple-500)`
- Series 2: `var(--purple-300)`
- Series 3: `var(--purple-600)`
- Series 4: `var(--purple-400)`
- Series 5: `var(--purple-700)`

### For Pie Charts (6+ categories)
- Slice 1: `var(--purple-300)` (lightest)
- Slice 2: `var(--purple-400)`
- Slice 3: `var(--purple-500)`
- Slice 4: `var(--purple-600)`
- Slice 5: `var(--purple-700)` (darkest)
- "Others": `var(--black-200)` (gray)

---

## 🔧 Common Customizations

### Add Data Labels

```typescript
plotOptions: {
  column: {
    dataLabels: {
      enabled: true,
      style: {
        fontFamily: 'var(--font-body)',
        fontSize: '11px',
        color: 'var(--black-900)',
      },
    },
  },
}
```

---

### Format Y-Axis as Currency

```typescript
yAxis: {
  labels: {
    formatter: function () {
      return '$' + this.value.toLocaleString();
    },
  },
}
```

---

### Format Y-Axis as Percentage

```typescript
yAxis: {
  labels: {
    formatter: function () {
      return this.value + '%';
    },
  },
  max: 100,  // Optional: cap at 100%
}
```

---

### Add Threshold Line (Target/Goal)

```typescript
yAxis: {
  plotLines: [{
    value: 50,  // Your threshold
    color: 'var(--brand-red)',
    dashStyle: 'Dash',
    width: 2,
    label: {
      text: 'Target',
      style: {
        color: 'var(--brand-red)',
      },
    },
  }],
}
```

---

### Rotate X-Axis Labels

```typescript
xAxis: {
  labels: {
    rotation: -45,  // Negative = counter-clockwise
    align: 'right',
  },
}
```

---

## ✅ Template Checklist

When using a template, remember to:

- [ ] Replace all `[CUSTOMIZE]` markers
- [ ] Add your actual data
- [ ] Update axis titles
- [ ] Update category labels
- [ ] Customize tooltip formatter
- [ ] Choose appropriate colors
- [ ] Set correct chart height
- [ ] Test with real data
- [ ] Verify responsiveness
- [ ] Check accessibility

---

## 📚 Additional Resources

- **CHARTS-OVERVIEW.md** - See all KP 2.0 charts
- **design-specs/chart-colors.md** - Color specifications
- **design-specs/chart-typography.md** - Typography rules
- **design-specs/chart-styling-rules.md** - Styling guidelines

---

**Document Version:** 1.0.0  
**Last Updated:** February 11, 2026  
**Maintained by:** KP 2.0 Design System Team
