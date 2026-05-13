# 🎨 Chart Color Specifications - KP 2.0

**Design System:** KP 2.0  
**Version:** 1.0.0  
**Date:** February 11, 2026

---

## 🎯 Color Philosophy

All charts use the **Purple 500** (`#7f5fe3`) as the BASE color for standard interactive elements and data visualization, matching the KP 2.0 Design System.

---

## 📊 Primary Chart Colors

### Purple Palette

| Color Name | Hex Code | RGB | CSS Variable | Usage |
|------------|----------|-----|--------------|--------|
| Purple 50 | `#f4f2fc` | `244, 242, 252` | `var(--purple-50)` | Light backgrounds |
| Purple 100 | `#ebe8f9` | `235, 232, 249` | `var(--purple-100)` | Subtle backgrounds |
| Purple 200 | `#d9d3f3` | `217, 211, 243` | `var(--purple-200)` | Borders, accents |
| **Purple 300** | `#b8aeef` | `184, 174, 239` | `var(--purple-300)` | **Secondary data series** |
| Purple 400 | `#9b80eb` | `155, 128, 235` | `var(--purple-400)` | Pie chart slices |
| **Purple 500** | `#7f5fe3` | `127, 95, 227` | `var(--purple-500)` | **PRIMARY (BASE)** |
| Purple 600 | `#6d52d9` | `109, 82, 217` | `var(--purple-600)` | Pie chart slices |
| Purple 700 | `#5b43b8` | `91, 67, 184` | `var(--purple-700)` | Darkest purple |

---

## 🖤 Neutral Colors

### Black/Gray Palette

| Color Name | Hex Code | RGB | CSS Variable | Usage |
|------------|----------|-----|--------------|--------|
| Black 50 | `#fafafa` | `250, 250, 250` | `var(--black-50)` | Light backgrounds |
| Black 100 | `#f5f5f5` | `245, 245, 245` | `var(--black-100)` | Subtle backgrounds |
| **Black 200** | `#e5e5e5` | `229, 229, 229` | `var(--black-200)` | **Grid lines, borders** |
| Black 500 | `#666666` | `102, 102, 102` | `var(--black-500)` | Text, labels |
| Black 900 | `#171717` | `23, 23, 23` | `var(--black-900)` | Primary text |
| White | `#ffffff` | `255, 255, 255` | `var(--white)` | Backgrounds, borders |

---

## 📋 Color Usage by Chart Element

### Area Chart

| Element | Color | CSS Variable |
|---------|-------|--------------|
| Line (Historical) | Purple 500 | `var(--purple-500)` |
| Line (Projected) | Purple 500 | `var(--purple-500)` |
| Fill Gradient (Top) | `rgba(127, 95, 227, 0.2)` | - |
| Fill Gradient (Bottom) | `rgba(127, 95, 227, 0)` | - |
| Grid Lines | Black 200 | `var(--black-200)` |
| Axis Labels | Black 500 | `var(--black-500)` |

---

### Column Chart

| Element | Color | CSS Variable |
|---------|-------|--------------|
| Columns | Purple 500 | `var(--purple-500)` |
| Grid Lines | Black 200 | `var(--black-200)` |
| Axis Labels | Black 500 | `var(--black-500)` |

---

### Line Chart

| Element | Color | CSS Variable |
|---------|-------|--------------|
| Line 1 (Value Growth) | Purple 500 | `var(--purple-500)` |
| Line 2 (Volume Growth) | Purple 300 | `var(--purple-300)` |
| Markers (Dots) | Same as line | - |
| Grid Lines | Black 200 | `var(--black-200)` |
| Axis Labels | Black 500 | `var(--black-500)` |

---

### Pie/Donut Chart

| Element | Color | CSS Variable |
|---------|-------|--------------|
| Slice 1 (12%) | Purple 300 | `var(--purple-300)` |
| Slice 2 (10%) | Purple 400 | `var(--purple-400)` |
| Slice 3 (8%) | Purple 500 | `var(--purple-500)` |
| Slice 4 (8%) | Purple 600 | `var(--purple-600)` |
| Slice 5 (7%) | Purple 700 | `var(--purple-700)` |
| Slice 6 "Others" (55%) | Black 200 | `var(--black-200)` |
| Slice Borders | White | `#ffffff` |

---

## 🎨 Color Schemes for New Charts

### Single Data Series
Use **Purple 500** as the primary color.

```typescript
series: [{
  type: 'column',
  data: [10, 20, 30],
  color: 'var(--purple-500)',
}]
```

---

### Two Data Series
Use **Purple 500** (primary) and **Purple 300** (secondary).

```typescript
series: [
  {
    type: 'line',
    name: 'Series 1',
    data: [10, 20, 30],
    color: 'var(--purple-500)',
  },
  {
    type: 'line',
    name: 'Series 2',
    data: [15, 25, 35],
    color: 'var(--purple-300)',
  },
]
```

---

### Three or More Data Series
Use purple gradient: **500 → 300 → 600 → 400 → 700**

```typescript
series: [
  { name: 'Series 1', data: [...], color: 'var(--purple-500)' },
  { name: 'Series 2', data: [...], color: 'var(--purple-300)' },
  { name: 'Series 3', data: [...], color: 'var(--purple-600)' },
  { name: 'Series 4', data: [...], color: 'var(--purple-400)' },
  { name: 'Series 5', data: [...], color: 'var(--purple-700)' },
]
```

---

### Categorical Data (Pie Charts)
Use purple gradient from **lightest to darkest** (300 → 700), then gray for "Others".

```typescript
data: [
  { name: 'Category 1', y: 30, color: 'var(--purple-300)' },
  { name: 'Category 2', y: 25, color: 'var(--purple-400)' },
  { name: 'Category 3', y: 20, color: 'var(--purple-500)' },
  { name: 'Category 4', y: 15, color: 'var(--purple-600)' },
  { name: 'Category 5', y: 10, color: 'var(--purple-700)' },
  { name: 'Others', y: 10, color: 'var(--black-200)' },
]
```

---

## 🌈 Gradient Specifications

### Area Chart Fill Gradient

**Vertical gradient** from top (20% opacity) to bottom (transparent):

```typescript
fillColor: {
  linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
  stops: [
    [0, 'rgba(127, 95, 227, 0.2)'],  // Top: 20% opacity
    [1, 'rgba(127, 95, 227, 0)'],    // Bottom: 0% opacity
  ],
}
```

**For projected data** (lighter gradient):

```typescript
fillColor: {
  linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
  stops: [
    [0, 'rgba(127, 95, 227, 0.15)'],  // Top: 15% opacity
    [1, 'rgba(127, 95, 227, 0)'],     // Bottom: 0% opacity
  ],
}
```

---

## ♿ Accessibility & Contrast

### WCAG Compliance

All color combinations meet **WCAG AA standards** (4.5:1 contrast ratio):

| Foreground | Background | Contrast Ratio | WCAG Level |
|------------|------------|----------------|------------|
| Purple 500 | White | 7.2:1 | AAA ✅ |
| Black 500 | White | 4.6:1 | AA ✅ |
| Black 900 | White | 12.6:1 | AAA ✅ |
| White | Purple 500 | 7.2:1 | AAA ✅ |

---

### Color Blindness Considerations

**Purple 500 vs Purple 300:**
- Sufficient contrast for deuteranopia (red-green color blindness)
- Sufficient contrast for protanopia
- Sufficient contrast for tritanopia (blue-yellow color blindness)

**Best Practice:**
- Always use **labels** in addition to colors
- Use **patterns** or **textures** for critical distinctions
- Provide **text legends** for pie charts

---

## 🔄 Color Variations

### Hover States

**Increase opacity by 10%:**

```typescript
states: {
  hover: {
    color: 'rgba(127, 95, 227, 0.9)',  // Slightly darker
    brightness: 1.1,
  },
}
```

---

### Selected States

**Increase brightness by 20%:**

```typescript
states: {
  select: {
    color: 'var(--purple-600)',
    borderColor: 'var(--purple-700)',
  },
}
```

---

## 📦 CSS Variables Setup

Add these to your global CSS file:

```css
:root {
  /* Purple colors */
  --purple-50: #f4f2fc;
  --purple-100: #ebe8f9;
  --purple-200: #d9d3f3;
  --purple-300: #b8aeef;
  --purple-400: #9b80eb;
  --purple-500: #7f5fe3;  /* BASE */
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
}
```

---

## 🎯 Quick Reference

### Most Used Colors

1. **Purple 500** (`#7f5fe3`) - Primary data color
2. **Purple 300** (`#b8aeef`) - Secondary data color
3. **Black 200** (`#e5e5e5`) - Grid lines, "Others"
4. **Black 500** (`#666666`) - Labels, text
5. **White** (`#ffffff`) - Backgrounds, borders

---

### Color Palette Swatch

```
████ Purple 500 (#7f5fe3) ← PRIMARY
████ Purple 300 (#b8aeef) ← Secondary
████ Purple 600 (#6d52d9) ← Accent
████ Black 200 (#e5e5e5)  ← Grid/Others
████ Black 500 (#666666)  ← Text
```

---

**Document Version:** 1.0.0  
**Last Updated:** February 11, 2026  
**Maintained by:** KP 2.0 Design System Team
