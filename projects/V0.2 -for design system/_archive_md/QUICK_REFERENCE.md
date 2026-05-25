# 🎨 KP 2.0 Design System - Quick Reference Card

**Version:** 3.0.0 | **Date:** Feb 12, 2026

---

## 🎯 **Color System**

### **Two Primary Colors:**

| Color | Hex | Purpose | Use For |
|-------|-----|---------|---------|
| 🔴 **BRAND RED** | `#b01f24` | Action & Identity | CTAs, Chapter Headers, Brand |
| 🟣 **DATA PURPLE** | `#7f5fe3` | Information & Data | Charts, Icons, Numbers |

---

## 🔴 **When to Use RED**

```tsx
// ✅ Chapter Headers
<span className="text-[var(--brand-red-500)]">CHAPTER 1</span>

// ✅ Primary CTAs
<button className="bg-[var(--brand-red-500)] text-white">Download</button>

// ✅ Focus Rings
<input className="focus:ring-[var(--brand-red-500)]" />

// ✅ Hover Text (Outline Buttons)
<button className="hover:text-[var(--brand-red-500)]">Learn More</button>
```

---

## 🟣 **When to Use PURPLE**

```tsx
// ✅ Charts
<Chart color="var(--data-purple-500)" />

// ✅ Informational Icons
<Icon className="text-[var(--data-purple-500)]" />

// ✅ Icon Backgrounds
<div className="bg-[var(--data-purple-100)]">

// ✅ Stat Numbers
<div className="text-[var(--data-purple-500)]">$2.4B</div>

// ✅ Loading Spinners
<div className="border-[var(--data-purple-500)] animate-spin" />
```

---

## ⚫ **Neutral Colors**

| Token | Color | Usage |
|-------|-------|-------|
| `--grey-700` | `#171717` | Primary text, headings |
| `--grey-500` | `#737373` | Secondary text, descriptions |
| `--grey-200` | `#e5e5e5` | Borders, dividers |
| `--grey-50` | `#fafafa` | Even section backgrounds |
| `--white` | `#ffffff` | Odd section backgrounds |

---

## 📐 **Section Structure**

```tsx
<section className="py-24 px-[84.375px] lg:px-[112.5px] bg-[white or grey-50]">
  <div className="max-w-[1200px] mx-auto">
    {/* Chapter Header */}
    <span className="text-[var(--brand-red-500)] font-bold text-[13px] uppercase tracking-widest">
      CHAPTER X - Title
    </span>
    
    {/* Heading */}
    <h2 className="font-display text-[40px] text-[var(--grey-700)]">
      Section Title
    </h2>
    
    {/* Description */}
    <p className="text-[var(--grey-500)] text-base">
      Description
    </p>
    
    {/* Content */}
  </div>
</section>
```

**Rules:**
- ✅ Padding: `py-24 px-[84.375px] lg:px-[112.5px]`
- ✅ Max width: `1200px` centered
- ✅ Alternate backgrounds: white → grey-50 → white

---

## 🎨 **Component Patterns**

### **Primary CTA Button** 🔴
```tsx
<button className="bg-[var(--brand-red-500)] hover:bg-[var(--brand-red-600)] text-white px-8 py-4 rounded-[10px] font-semibold transition-colors duration-200">
  Download Report
</button>
```

### **Outline Button** 🔴
```tsx
<button className="border border-[var(--grey-200)] text-[var(--grey-700)] hover:text-[var(--brand-red-500)] hover:border-[var(--brand-red-500)] px-8 py-4 rounded-[10px] font-semibold transition-colors duration-200">
  Learn More
</button>
```

### **Stat Card** 🟣
```tsx
<div className="bg-white border border-[var(--grey-200)] rounded-[10px] p-6 text-center">
  <div className="text-[40px] font-bold text-[var(--data-purple-500)]">
    $2.4B
  </div>
  <div className="text-[var(--grey-500)] text-sm">
    Market Size
  </div>
</div>
```

### **Icon Card** 🟣
```tsx
<div className="bg-white border border-[var(--grey-200)] rounded-[10px] p-6">
  <div className="w-12 h-12 rounded-lg bg-[var(--data-purple-100)] flex items-center justify-center mb-4">
    <Icon className="h-6 w-6 text-[var(--data-purple-500)]" />
  </div>
  <h3 className="text-lg font-semibold text-[var(--grey-700)] mb-2">
    Title
  </h3>
  <p className="text-[var(--grey-500)] text-sm">
    Description
  </p>
</div>
```

---

## 📊 **Charts** 🟣

```tsx
import { contextColors } from '@/design-system/tokens';

const chartOptions = {
  series: [{
    color: contextColors.chart.primary,  // #7f5fe3
  }],
  chart: {
    backgroundColor: contextColors.chart.background,  // #eff1fe
  },
};
```

**Chart Tokens:**
- Primary: `contextColors.chart.primary`
- Background: `contextColors.chart.background`
- Grid: `contextColors.chart.grid`
- Series: `contextColors.chart.series` (array)

---

## 🎯 **Decision Tree**

```
Is it an ACTION element?
├─ YES → 🔴 RED
│  └─ CTAs, buttons, chapter headers
│
└─ NO → Is it INFORMATION/DATA?
   ├─ YES → 🟣 PURPLE
   │  └─ Charts, icons, numbers
   │
   └─ NO → ⚫ GREY/BLACK
      └─ Text, borders, backgrounds
```

---

## 📋 **Typography**

```tsx
// Top-level heading (Noto Serif)
<h1 className="font-display text-[48px] text-[var(--grey-700)]">

// Section heading (Noto Serif)
<h2 className="font-display text-[40px] text-[var(--grey-700)]">

// Subsection (DM Sans)
<h3 className="text-xl font-semibold text-[var(--grey-700)]">

// Body text
<p className="text-base text-[var(--grey-500)]">

// Chapter header
<span className="text-[13px] font-bold uppercase tracking-widest text-[var(--brand-red-500)]">
```

---

## 🌈 **Semantic Colors**

| Use Case | Token | Color |
|----------|-------|-------|
| Success | `--green-600` | `#16a34a` |
| Error | `--red-600` | `#dc2626` |
| Warning | `--amber-400` | `#fbbf24` |
| Info | `--blue-600` | `#2563eb` |

---

## 📦 **Import Methods**

### **Context Tokens (Recommended)**
```tsx
import { contextColors } from '@/design-system/tokens';
contextColors.chapter          // RED for chapter headers
contextColors.chart.primary    // PURPLE for charts
contextColors.icon.informational // PURPLE for icons
contextColors.button.primary   // RED for CTAs
```

### **CSS Variables (Most Common)**
```tsx
className="text-[var(--brand-red-500)]"
className="bg-[var(--data-purple-100)]"
className="border-[var(--grey-200)]"
```

### **Color Scales (Direct)**
```tsx
import { colors } from '@/design-system/tokens';
colors.brand[500]  // RED
colors.data[500]   // PURPLE
```

---

## ✅ **Page Checklist**

- [ ] Chapter headers are RED
- [ ] Primary CTAs are RED
- [ ] Charts are PURPLE
- [ ] Informational icons are PURPLE
- [ ] Numbers/stats are PURPLE
- [ ] Icon backgrounds are light PURPLE
- [ ] Body text is Grey 500
- [ ] Headings are Grey 700
- [ ] Borders are Grey 200
- [ ] Sections alternate white/grey-50
- [ ] Padding is `px-[84.375px] lg:px-[112.5px]`
- [ ] Max width is `1200px`

---

## 🚫 **Common Mistakes**

### **❌ WRONG:**
```tsx
// Using RED for informational icons
<Icon className="text-[var(--brand-red-500)]" /> 

// Using PURPLE for CTAs
<button className="bg-[var(--data-purple-500)]">

// Mixing RED and PURPLE
<div className="bg-brand-red-50 border-data-purple-500">
```

### **✅ CORRECT:**
```tsx
// PURPLE for informational icons
<Icon className="text-[var(--data-purple-500)]" />

// RED for CTAs
<button className="bg-[var(--brand-red-500)]">

// One color family per component
<div className="bg-brand-red-50 border-brand-red-500">
```

---

## 🎨 **Grid Layouts**

```tsx
// 2 columns
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

// 3 columns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// 4 columns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
```

---

## 🔄 **Hover Effects**

```tsx
// Card hover
className="hover:shadow-[var(--shadow-brand-hover)] transition-shadow duration-200"

// Button hover
className="hover:bg-[var(--brand-red-600)] transition-colors duration-200"

// Link hover
className="hover:text-[var(--brand-red-500)] transition-colors duration-200"
```

---

## 📚 **Full Documentation**

- **Color Guide:** `/src/design-system/docs/color-usage-guide.md`
- **Patterns Guide:** `/src/design-system/docs/patterns-guide.md`
- **Example Page:** `/src/app/pages/MarketInsightsExamplePage.tsx`

---

## 💡 **Remember:**

> **🔴 RED = "Do this!" (Action)**  
> **🟣 PURPLE = "Here's info" (Data)**  
> **⚫ GREY = "Content" (Structure)**

---

**Version:** 3.0.0 | **Last Updated:** Feb 12, 2026
