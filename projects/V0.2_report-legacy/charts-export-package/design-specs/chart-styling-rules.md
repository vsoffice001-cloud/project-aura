# 📐 Chart Styling Rules - KP 2.0

**Design System:** KP 2.0  
**Version:** 1.0.0  
**Date:** February 11, 2026

---

## 🎯 Styling Philosophy

All charts follow consistent layout, spacing, and styling rules to maintain visual harmony across the KP 2.0 Design System.

---

## 📏 Chart Dimensions

### Default Heights

| Chart Type | Default Height | Use Case |
|------------|---------------|----------|
| **Area Chart** | 380px | Primary/hero charts |
| **Column Chart** | 360px | Supporting charts |
| **Line Chart** | 360px | Supporting charts |
| **Pie Chart** | 200px | Compact visualizations |

### Height Variations

```typescript
// Standard (default)
<Chart chartOptions={...} height={380} />

// Compact
<Chart chartOptions={...} height={280} />

// Expanded
<Chart chartOptions={...} height={480} />
```

---

### Width

**All charts:** 100% of container width (responsive)

```typescript
chart: {
  type: 'area',
  width: null,  // Auto-width (100% of container)
}
```

---

## 📦 Spacing & Padding

### Chart Container Spacing

```typescript
chart: {
  spacingTop: 10,      // 10px above chart
  spacingBottom: 35,   // 35px below chart (for legend/labels)
  spacingLeft: 15,     // 15px left margin
  spacingRight: 15,    // 15px right margin
}
```

### Rationale
- **Top (10px):** Minimal space for clean integration
- **Bottom (35px):** Space for X-axis labels and legend
- **Left/Right (15px):** Breathing room without wasting space

---

## 🎨 Background & Transparency

### Chart Background

**Always transparent** to inherit parent container color:

```typescript
chart: {
  backgroundColor: 'transparent',
}
```

### Why?
- Charts can be placed on white OR gray backgrounds
- Maintains flexibility
- Reduces visual noise

---

## 🔲 Borders & Outlines

### Chart Borders

**No borders** on the chart itself:

```typescript
chart: {
  borderWidth: 0,
  borderColor: null,
}
```

### Container Borders

Charts live inside card containers with borders:

```css
.chart-container {
  border: 1px solid var(--black-200);  /* #e5e5e5 */
  border-radius: 8px;
  padding: 24px;
}
```

---

## 🌐 Grid Lines

### Configuration

```typescript
xAxis: {
  gridLineWidth: 1,
  gridLineColor: 'var(--black-200)',  /* #e5e5e5 */
  lineColor: 'var(--black-200)',
}

yAxis: {
  gridLineWidth: 1,
  gridLineColor: 'var(--black-200)',
}
```

### Visual Style
- **Width:** 1px (subtle)
- **Color:** Black 200 (light gray)
- **Style:** Solid (not dashed)

---

## 🔘 Border Radius

### Chart Elements

| Element | Border Radius | Example |
|---------|--------------|---------|
| **Column Bars** | 4px (top only) | Rounded tops |
| **Tooltips** | 8px (all corners) | Smooth corners |
| **Pie Slices** | None | Sharp edges |
| **Markers (dots)** | 50% (circle) | Perfect circles |

### Implementation

```typescript
// Column chart
plotOptions: {
  column: {
    borderRadius: 4,  // Top corners only
  },
}

// Tooltip
tooltip: {
  borderRadius: 8,
}

// Line chart markers
plotOptions: {
  line: {
    marker: {
      symbol: 'circle',
      radius: 4,
    },
  },
}
```

---

## 🎯 Marker Styling

### Line Chart Markers

**Size:** 4px radius (8px diameter)  
**Shape:** Circle  
**Color:** Same as line color  
**Hover:** Enabled

```typescript
plotOptions: {
  line: {
    marker: {
      enabled: true,
      symbol: 'circle',
      radius: 4,
      states: {
        hover: {
          enabled: true,
          radius: 6,  // Larger on hover
        },
      },
    },
  },
}
```

### Area Chart Markers

**Default:** Hidden  
**Hover:** Visible (4px radius)

```typescript
plotOptions: {
  area: {
    marker: {
      enabled: false,  // Hidden by default
      symbol: 'circle',
      radius: 4,
      states: {
        hover: {
          enabled: true,
        },
      },
    },
  },
}
```

---

## 📊 Line Widths

### Chart Lines

| Chart Type | Line Width | Rationale |
|------------|-----------|-----------|
| **Area Chart** | 3px | Prominent, easy to follow |
| **Line Chart** | 3px | Clear distinction between series |
| **Pie Chart Borders** | 2px | Separates slices cleanly |

### Implementation

```typescript
// Area/Line charts
plotOptions: {
  area: {
    lineWidth: 3,
  },
  line: {
    lineWidth: 3,
  },
}

// Pie chart
plotOptions: {
  pie: {
    borderWidth: 2,
    borderColor: '#ffffff',  // White borders
  },
}
```

---

## 🎭 Shadows & Effects

### No Drop Shadows

Charts use **flat design** with no shadows:

```typescript
chart: {
  shadow: false,
}

plotOptions: {
  series: {
    shadow: false,
  },
}
```

### Hover Effects

**Subtle brightness increase** on hover:

```typescript
plotOptions: {
  series: {
    states: {
      hover: {
        brightness: 0.1,  // 10% brighter
      },
    },
  },
}
```

---

## 🔄 Animations

### Enable Animations

**Smooth animations** on chart load and updates:

```typescript
chart: {
  animation: {
    duration: 1000,  // 1 second
  },
}

plotOptions: {
  series: {
    animation: {
      duration: 800,  // 0.8 seconds
    },
  },
}
```

### Animation Curve

**Easing:** `easeOutQuart` (default)

---

## 🖼️ Tooltip Styling

### Design Specs

```typescript
tooltip: {
  backgroundColor: 'var(--white)',
  borderColor: 'var(--black-200)',
  borderRadius: 8,
  borderWidth: 1,
  shadow: false,
  padding: 12,
  style: {
    fontFamily: 'var(--font-body)',
    fontSize: '14px',
    color: 'var(--black-900)',
  },
}
```

### Visual
- White background
- Light gray border (Black 200)
- 8px rounded corners
- 12px padding
- No shadow

---

## 📐 Legend Styling

### Built-in Highcharts Legend

**Disabled** (using custom ChartTitleHeader component):

```typescript
legend: {
  enabled: false,
}
```

### Custom Legend (ChartTitleHeader)

```typescript
const legend: LegendItem[] = [
  { color: 'purple-500', label: 'Historical (2019-2024)' },
  { color: 'purple-300', label: 'Projected (2025-2030)' },
];

<ChartTitleHeader title="Chart Title" legendItems={legend} />
```

**Visual:**
- Colored dots (3px × 3px, circular)
- 2px gap between dot and label
- Hover effect: dot scales 1.25×
- Label hover: color changes to Black 900

---

## 📱 Responsive Behavior

### Desktop (1024px+)

```typescript
chart: {
  height: 380,
  spacingLeft: 15,
  spacingRight: 15,
}
```

### Tablet (768px - 1023px)

```typescript
// Same as desktop (charts scale proportionally)
```

### Mobile (< 768px)

**Considerations:**
- Reduce height to 280-320px if needed
- Rotate X-axis labels 45° if crowded
- Increase touch target size for markers

```typescript
// Mobile-specific adjustments
xAxis: {
  labels: {
    rotation: -45,  // Angled labels on mobile
    style: {
      fontSize: '11px',  // Slightly smaller on mobile
    },
  },
}
```

---

## 🎨 Color Opacity

### Gradient Fills (Area Charts)

**Historical Data:**
- Top: 20% opacity (`rgba(127, 95, 227, 0.2)`)
- Bottom: 0% opacity (transparent)

**Projected Data:**
- Top: 15% opacity (`rgba(127, 95, 227, 0.15)`)
- Bottom: 0% opacity (transparent)

### Rationale
Lower opacity for projected data creates visual distinction.

---

## 📏 Axis Styling

### X-Axis

```typescript
xAxis: {
  gridLineWidth: 1,
  gridLineColor: 'var(--black-200)',
  lineColor: 'var(--black-200)',
  tickLength: 5,
  tickColor: 'var(--black-200)',
  labels: {
    padding: 8,
    style: {
      fontSize: '12px',
      color: 'var(--black-500)',
    },
  },
}
```

### Y-Axis

```typescript
yAxis: {
  gridLineWidth: 1,
  gridLineColor: 'var(--black-200)',
  lineWidth: 0,  // No Y-axis line
  tickWidth: 0,  // No Y-axis ticks
  title: {
    text: '$ Million',
    style: {
      fontSize: '14px',
      color: 'var(--black-500)',
    },
  },
  labels: {
    padding: 8,
    style: {
      fontSize: '12px',
      color: 'var(--black-500)',
    },
  },
}
```

---

## 🔲 Card Container Styling

### Chart Card Wrapper

```css
.chart-card {
  background-color: var(--white);
  border: 1px solid var(--black-200);
  border-radius: 8px;
  padding: 24px;
  box-shadow: none;  /* No shadow */
}

.chart-card:hover {
  border-color: var(--black-300);  /* Subtle hover */
}
```

### Title Area

```css
.chart-card-header {
  margin-bottom: 16px;
}

.chart-card-title {
  font-size: 18px;
  font-weight: 500;
  color: var(--black-900);
  margin-bottom: 12px;
}
```

---

## 🎯 Consistent Spacing System

| Element | Spacing | Variable |
|---------|---------|----------|
| Chart top margin | 10px | `spacingTop: 10` |
| Chart bottom margin | 35px | `spacingBottom: 35` |
| Chart left/right margin | 15px | `spacingLeft/Right: 15` |
| Card padding | 24px | `padding: 24px` |
| Title bottom margin | 16px | `margin-bottom: 16px` |
| Legend item gap | 2px | `gap-2` |
| Tooltip padding | 12px | `padding: 12` |

---

## ✅ Styling Checklist

When creating a new chart, verify:

- [ ] Background is transparent
- [ ] Height is set (default: 380px)
- [ ] Spacing: top 10px, bottom 35px, sides 15px
- [ ] Grid lines are 1px, Black 200
- [ ] Border radius: 4px (columns), 8px (tooltips)
- [ ] Line width is 3px
- [ ] No shadows
- [ ] Animations enabled (1s duration)
- [ ] Tooltip: white bg, gray border, 8px radius
- [ ] Legend disabled (using custom component)
- [ ] Colors use CSS variables
- [ ] Font is DM Sans

---

## 🎨 Complete Styling Template

```typescript
const chartOptions: Highcharts.Options = {
  chart: {
    type: 'area',
    backgroundColor: 'transparent',
    height: 380,
    spacingTop: 10,
    spacingBottom: 35,
    spacingLeft: 15,
    spacingRight: 15,
    animation: { duration: 1000 },
    shadow: false,
  },
  title: { text: '' },
  credits: { enabled: false },
  accessibility: { enabled: false },
  legend: { enabled: false },
  xAxis: {
    gridLineWidth: 1,
    gridLineColor: 'var(--black-200)',
    lineColor: 'var(--black-200)',
    tickLength: 5,
    tickColor: 'var(--black-200)',
  },
  yAxis: {
    gridLineWidth: 1,
    gridLineColor: 'var(--black-200)',
    lineWidth: 0,
    tickWidth: 0,
  },
  tooltip: {
    backgroundColor: 'var(--white)',
    borderColor: 'var(--black-200)',
    borderRadius: 8,
    borderWidth: 1,
    shadow: false,
    padding: 12,
  },
  plotOptions: {
    area: {
      lineWidth: 3,
      marker: { enabled: false },
      shadow: false,
    },
  },
};
```

---

**Document Version:** 1.0.0  
**Last Updated:** February 11, 2026  
**Maintained by:** KP 2.0 Design System Team
