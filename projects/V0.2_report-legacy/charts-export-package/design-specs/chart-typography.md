# 📝 Chart Typography Specifications - KP 2.0

**Design System:** KP 2.0  
**Version:** 1.0.0  
**Date:** February 11, 2026

---

## 🎯 Typography Philosophy

All charts use **DM Sans** as the universal font for consistency with the KP 2.0 Design System. No other fonts should be used in charts.

---

## 🔤 Font Family

### Primary Font

**DM Sans** (Google Fonts)

```css
font-family: 'DM Sans', sans-serif;
```

**CSS Variable:**
```css
--font-body: 'DM Sans', sans-serif;
```

**Highcharts Configuration:**
```typescript
chart: {
  style: {
    fontFamily: 'var(--font-body)',
  },
}
```

---

### Font Weights Used

| Weight | Value | Usage |
|--------|-------|-------|
| Regular | 400 | Axis labels, legend items, tooltips |
| Medium | 500 | Chart titles (optional) |
| Bold | 700 | Tooltip values, emphasis |

---

## 📊 Typography by Chart Element

### 1. Chart Titles

**Font:** DM Sans  
**Size:** Varies by container (typically inherited from card title)  
**Weight:** Regular (400) or Medium (500)  
**Color:** Black 900 (`#171717`)

```typescript
// Not set in Highcharts (uses custom header component)
title: {
  text: '',  // Empty (using ChartTitleHeader component)
}
```

---

### 2. Axis Labels

**Font:** DM Sans  
**Size:** 12px  
**Weight:** Regular (400)  
**Color:** Black 500 (`#666666`)

```typescript
xAxis: {
  labels: {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '12px',
      fontWeight: '400',
      color: 'var(--black-500)',
    },
  },
}
```

---

### 3. Axis Titles

**Font:** DM Sans  
**Size:** 14px  
**Weight:** Regular (400)  
**Color:** Black 500 (`#666666`)

```typescript
yAxis: {
  title: {
    text: '$ Million',
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '14px',
      fontWeight: '400',
      color: 'var(--black-500)',
    },
  },
}
```

---

### 4. Legend Items

**Font:** DM Sans  
**Size:** 12px  
**Weight:** Regular (400)  
**Color:** Black 500 (`#666666`)

```typescript
legend: {
  itemStyle: {
    fontFamily: 'var(--font-body)',
    fontSize: '12px',
    fontWeight: '400',
    color: 'var(--black-500)',
  },
}
```

---

### 5. Tooltips

**Font:** DM Sans  
**Size:** 14px  
**Weight:** Regular (400) for labels, Bold (700) for values  
**Color:** Black 900 (`#171717`)

```typescript
tooltip: {
  style: {
    fontFamily: 'var(--font-body)',
    fontSize: '14px',
    color: 'var(--black-900)',
  },
  // Bold values in formatter:
  formatter: function () {
    return `<b>${this.x}</b><br/>${this.series.name}: <b>$${this.y}M</b>`;
  },
}
```

---

### 6. Data Labels (when enabled)

**Font:** DM Sans  
**Size:** 11px  
**Weight:** Regular (400)  
**Color:** Black 900 (`#171717`)

```typescript
plotOptions: {
  series: {
    dataLabels: {
      enabled: true,
      style: {
        fontFamily: 'var(--font-body)',
        fontSize: '11px',
        fontWeight: '400',
        color: 'var(--black-900)',
      },
    },
  },
}
```

---

## 📏 Font Size Scale

### Size Hierarchy

| Element | Size | Example |
|---------|------|---------|
| Chart Title | 18-24px | "Market Size Over Time" |
| Axis Title | 14px | "$ Million" |
| Tooltip Text | 14px | "Historical: $150M" |
| Axis Labels | 12px | "2024", "10%", "$120M" |
| Legend Items | 12px | "Historical (2019-2024)" |
| Data Labels | 11px | "45%" (on pie slices) |

---

## 🎨 Text Colors

### Color Usage

| Text Type | Color | Hex | CSS Variable |
|-----------|-------|-----|--------------|
| **Primary Text** | Black 900 | `#171717` | `var(--black-900)` |
| **Secondary Text** | Black 500 | `#666666` | `var(--black-500)` |
| **Muted Text** | Black 300 | `#a3a3a3` | `var(--black-300)` |

### Usage Examples

```typescript
// Chart title
color: 'var(--black-900)',

// Axis labels
color: 'var(--black-500)',

// Disabled/muted text
color: 'var(--black-300)',
```

---

## 📐 Line Height & Spacing

### Line Heights

| Element | Line Height |
|---------|-------------|
| Chart Title | 1.2 |
| Axis Labels | 1.4 |
| Legend Items | 1.5 |
| Tooltip Text | 1.6 |

### Letter Spacing

**All text:** Normal (0)  
**Exception:** Chart titles may use slight tracking (0.01em)

---

## 🔧 Implementation

### Setup DM Sans Font

#### Method 1: Google Fonts CDN

```html
<!-- In your index.html -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">
```

#### Method 2: CSS Import

```css
/* In your global CSS */
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');
```

#### Method 3: Self-Hosted

Download DM Sans from Google Fonts and host locally:

```css
@font-face {
  font-family: 'DM Sans';
  src: url('/fonts/DMSans-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: 'DM Sans';
  src: url('/fonts/DMSans-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
}
```

---

### Apply to All Charts

The `Chart` component automatically applies DM Sans to all chart elements:

```typescript
// In chart.tsx
const chartOptionsWithFonts: Highcharts.Options = {
  ...chartOptions,
  chart: {
    ...chartOptions.chart,
    style: {
      fontFamily: 'var(--font-body)',
    },
  },
  xAxis: {
    labels: {
      style: {
        fontFamily: 'var(--font-body)',
        color: 'var(--black-500)',
      },
    },
  },
  // ... etc for all text elements
};
```

---

## 📋 Typography Checklist

When creating a new chart, verify:

- [ ] All text uses DM Sans font
- [ ] Font sizes match specifications
- [ ] Text colors use CSS variables
- [ ] Bold is only used for emphasis (tooltips, values)
- [ ] Line heights are consistent
- [ ] No custom fonts or fallback fonts
- [ ] Axis labels are 12px
- [ ] Tooltips are 14px
- [ ] Legend items are 12px

---

## 🎯 Common Typography Patterns

### Pattern 1: Axis Label with Units

```typescript
yAxis: {
  labels: {
    formatter: function () {
      return '$' + this.value + 'M';  // "$120M"
    },
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '12px',
      color: 'var(--black-500)',
    },
  },
}
```

---

### Pattern 2: Tooltip with Bold Values

```typescript
tooltip: {
  formatter: function () {
    return `<b>${this.x}</b><br/>${this.series.name}: <b>$${this.y}M</b>`;
  },
  style: {
    fontFamily: 'var(--font-body)',
    fontSize: '14px',
    color: 'var(--black-900)',
  },
}
```

---

### Pattern 3: Custom Legend Item

```typescript
// Using ChartTitleHeader component
const legend: LegendItem[] = [
  { color: 'purple-500', label: 'Historical (2019-2024)' },
  { color: 'purple-300', label: 'Projected (2025-2030)' },
];

<ChartTitleHeader title="Chart Title" legendItems={legend} />
```

---

## ♿ Accessibility

### Font Size Minimum

**Never go below 11px** for any chart text to ensure readability.

### High Contrast Mode

Ensure sufficient contrast between text and background:
- Black 500 on white: 4.6:1 (AA ✅)
- Black 900 on white: 12.6:1 (AAA ✅)

### Responsive Text

Text sizes should remain consistent across screen sizes. Do not reduce font sizes on mobile.

---

## 🔍 Typography Testing

### Visual Checks

- [ ] Zoom to 200% - text remains readable
- [ ] Check on mobile - no text cutoff
- [ ] Verify bold weights render correctly
- [ ] Ensure no font flashing (FOIT/FOUT)

### Browser DevTools

```javascript
// Check computed font in console
const axisLabel = document.querySelector('.highcharts-axis-labels text');
console.log(window.getComputedStyle(axisLabel).fontFamily);
// Should output: "DM Sans, sans-serif"
```

---

## 📦 Quick Reference

### Typography Stack

```
Chart Title     → 18-24px, Regular/Medium, Black 900
Axis Title      → 14px, Regular, Black 500
Tooltip         → 14px, Regular/Bold, Black 900
Axis Labels     → 12px, Regular, Black 500
Legend Items    → 12px, Regular, Black 500
Data Labels     → 11px, Regular, Black 900
```

### Font Weights

```
Regular (400)   → Default for all text
Medium (500)    → Optional for titles
Bold (700)      → Tooltip values, emphasis
```

### Colors

```
Primary Text    → Black 900 (#171717)
Secondary Text  → Black 500 (#666666)
Muted Text      → Black 300 (#a3a3a3)
```

---

**Document Version:** 1.0.0  
**Last Updated:** February 11, 2026  
**Maintained by:** KP 2.0 Design System Team
