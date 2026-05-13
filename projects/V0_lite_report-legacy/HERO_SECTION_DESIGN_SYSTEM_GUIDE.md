# Hero Section - Design System VS 26 Implementation Guide

**Date:** 2026-02-13  
**Project:** Healthcare Market Analysis Landing Page  
**Design System:** VS 26  

---

## 🎯 Overview

This guide documents the **correct implementation** of Design System VS 26 components in the Hero section, following the official patterns from the GitHub repository.

---

## 📦 Component Usage Patterns

### 1. **Badge Component** - Labels & Status Indicators

#### ✅ Correct Usage in Hero:

```tsx
import { Badge } from '../../design-system/components/Badge';

// Premium feature indicator (purple accent - 3% rule)
<Badge variant="purple" size="md">
  <span className="h-2 w-2 rounded-full bg-[#806ce0]" />
  New Report Available
</Badge>

// Alternative: Trust indicator (periwinkle)
<Badge variant="periwinkle" size="sm">
  Verified Data
</Badge>
```

#### 📋 Badge Variants Guide:

| Variant | Color | Use Case | Example |
|---------|-------|----------|---------|
| `default` | Gray | Neutral labels | "Featured", "Latest" |
| `brand` | Ken Bold Red | **Use sparingly!** Critical CTAs only | "Limited Time" |
| `purple` | #806ce0 | **Premium features** | "New Report Available" |
| `periwinkle` | #c3c6f9 | **Trust indicators** | "Verified", "Certified" |
| `perano` | #dfeafa | **Data sections** | "2024 Analysis" |

#### ⚠️ Design System Rules:

- **3% Color Rule**: Purple/periwinkle/perano should appear in <3% of page
- **Ken Bold Red**: Only for primary CTAs, never for decorative badges
- **Size**: `md` for hero badges, `sm` for subtle indicators

---

### 2. **Button Component** - CTAs & Actions

#### ✅ Correct Usage in Hero:

```tsx
import { Button } from '../../design-system/Button';

// PRIMARY CTA - Brand variant with animated arrow (urgency)
<Button 
  variant="brand" 
  size="lg"                      // 56px height for hero prominence
  animatedArrow={true}           // ✅ YES - form redirect (urgency)
  className="font-sans font-bold"
>
  Download Sample Report
</Button>

// SECONDARY CTA - Outlined style on dark background
<Button 
  variant="secondary" 
  size="lg"
  background="dark"              // Adapts colors for dark hero
  icon={<FileText />}
  className="font-sans font-medium"
>
  Request Custom Report
</Button>
```

#### 📋 Button Sizing Strategy (from Design System):

| Size | Height | Font Size | Use Case | Hero Usage |
|------|--------|-----------|----------|------------|
| `sm` | 40px | 14px | Navbar, compact CTAs | ❌ Too small |
| `md` | 48px | 16px | **Default for report pages** | ⚠️ Acceptable |
| `lg` | 56px | 16px | **Big hero sections** | ✅ **PRIMARY** |
| `xl` | 64px | 18px | Homepage hero only | ⚠️ Use rarely |

#### ⚠️ Design System Rules:

**Shimmer Effect:**
- ✅ **ALWAYS active** on ALL buttons (signature brand identity)
- Auto-applied by Button component
- Do NOT disable

**Animated Arrow:**
- ✅ YES: Forms, downloads, page redirects (urgency signals)
- ❌ NO: Secondary actions, navigation, low-priority links

**Background Awareness:**
- `background="dark"` for dark hero sections (white text/borders)
- `background="light"` for white sections (black text/borders)

---

### 3. **Typography** - Headings & Body Text

#### ✅ Correct Hero Typography:

```tsx
// HERO H1 - Noto Serif Light (300) for editorial elegance
<h1 className="font-serif text-[3.052rem] font-light leading-[1.2] text-white">
  Global AI in Healthcare
  <span className="block bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
    Market Analysis 2024
  </span>
</h1>

// BODY TEXT - DM Sans Normal (400) for readability
<p className="font-sans max-w-lg text-[1rem] leading-relaxed text-white/70">
  Comprehensive market intelligence covering 50+ countries...
</p>
```

#### 📋 Font Family Decision Matrix:

| Element Type | Font Family | Weight | Tailwind Classes |
|--------------|-------------|--------|------------------|
| **Hero H1** | Noto Serif | 300 (Light) | `font-serif font-light` |
| **Section H2** | Noto Serif | 300 (Light) | `font-serif font-light` |
| **Subsection H3** | Noto Serif | 400 (Normal) | `font-serif font-normal` |
| **Body Text** | DM Sans | 400 (Normal) | `font-sans font-normal` |
| **UI Labels** | DM Sans | 500 (Medium) | `font-sans font-medium` |
| **Buttons** | DM Sans | 700 (Bold) | `font-sans font-bold` |
| **Large Numbers** | Noto Serif | 300 (Light) | `font-serif font-light` |

#### ⚠️ Typography Scale (Major Third 1.25x):

```css
--text-xs: 0.8rem;      /* 12.8px - Labels, metadata */
--text-sm: 1rem;        /* 16px - Body text */
--text-base: 1.25rem;   /* 20px - Large body */
--text-lg: 1.563rem;    /* 25px - Card titles */
--text-xl: 1.953rem;    /* 31.25px - Subsection headings (h3) */
--text-2xl: 2.441rem;   /* 39px - Section headings (h2) */
--text-3xl: 3.052rem;   /* 48.8px - Hero h1 ONLY */
```

**Rule:** Use `text-[3.052rem]` for hero h1, don't use `--text-3xl` for anything else!

---

### 4. **Stat Cards / Metrics Display**

#### ✅ Correct Stat Card Pattern:

```tsx
// Stat Card Component - Design System compliant
<div className="group relative space-y-2 cursor-pointer">
  {/* Icon with accent color (purple/periwinkle/perano) */}
  <div className="flex items-center gap-2">
    <div 
      className="flex h-8 w-8 items-center justify-center rounded-[5px]"
      style={{ backgroundColor: '#806ce010' }}
    >
      <Globe className="h-4 w-4" style={{ color: '#806ce0' }} />
    </div>
  </div>
  
  {/* VALUE - Noto Serif Light (300) for professional numbers */}
  <div className="font-serif text-[1.563rem] font-light text-white">
    $45.2B
  </div>
  
  {/* LABEL - DM Sans Medium (500) for UI labels */}
  <p className="font-sans text-[0.8rem] font-medium text-white/50">
    Market Size 2024
  </p>
</div>
```

#### 📋 Stat Card Color Strategy (3% Rule):

| Stat | Icon Color | Token | Purpose |
|------|-----------|--------|---------|
| Stat 1 | Purple #806ce0 | `--purple-600` | Premium data |
| Stat 2 | Perano #dfeafa | `--perano-500` | Data visualization |
| Stat 3 | Periwinkle #c3c6f9 | `--periwinkle-500` | Trust indicator |

**Rule:** Each stat gets ONE accent color for icon only. Values and labels stay white/neutral.

---

## 🎨 Hero Section Color Composition

### Background Pattern (100 Periwinkle Mix):

```tsx
// Dark hero with subtle purple/periwinkle accents
<section className="relative bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#2a2a2a]">
  {/* Decorative blurs - purple accent (3% rule) */}
  <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[#806ce0] blur-3xl opacity-[0.03]" />
  <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-[#c3c6f9] blur-3xl opacity-[0.03]" />
  
  {/* Content */}
</section>
```

### Color Hierarchy (92-5-3 Rule):

- **92%**: Black (#0a0a0a), white (#ffffff), grays
- **5%**: Warm tones (#f5f2f1) for section backgrounds
- **3%**: Purple (#806ce0), periwinkle (#c3c6f9), perano (#dfeafa) for accents
- **<1%**: Ken Bold Red (#b01f24) for primary CTAs ONLY

---

## ✅ Complete Hero Section Pattern

```tsx
<section className="relative overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#2a2a2a] py-16 md:py-24">
  {/* Background decorations - 3% rule */}
  <div className="absolute inset-0 opacity-[0.03]">
    <div className="absolute right-0 top-0 h-96 w-96 bg-[#806ce0] blur-3xl" />
    <div className="absolute bottom-0 left-0 h-96 w-96 bg-[#c3c6f9] blur-3xl" />
  </div>

  <div className="container relative max-w-[1200px] mx-auto px-4">
    <div className="grid items-center gap-12 lg:grid-cols-2">
      {/* LEFT CONTENT */}
      <div className="space-y-6">
        {/* Badge - Purple variant (premium feature) */}
        <Badge variant="purple" size="md">
          <span className="h-2 w-2 rounded-full bg-[#806ce0]" />
          New Report Available
        </Badge>

        {/* H1 - Noto Serif Light */}
        <h1 className="font-serif text-[3.052rem] font-light leading-[1.2] text-white">
          Global AI in Healthcare
          <span className="block">Market Analysis 2024</span>
        </h1>

        {/* Body - DM Sans Normal */}
        <p className="font-sans max-w-lg text-[1rem] leading-relaxed text-white/70">
          Comprehensive market intelligence...
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-4">
          <Button 
            variant="brand" 
            size="lg"
            animatedArrow={true}
            className="font-sans font-bold"
          >
            Download Sample Report
          </Button>
          <Button 
            variant="secondary" 
            size="lg"
            background="dark"
            icon={<FileText />}
            className="font-sans font-medium"
          >
            Request Custom Report
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-6">
          {/* Stat 1 - Purple accent */}
          <StatCard
            icon={Globe}
            value="50+"
            label="Countries Covered"
            color="#806ce0"
          />
          
          {/* Stat 2 - Perano accent */}
          <StatCard
            icon={BarChart3}
            value="$45.2B"
            label="Market Size 2024"
            color="#dfeafa"
          />
          
          {/* Stat 3 - Periwinkle accent */}
          <StatCard
            icon={TrendingUp}
            value="32.5%"
            label="CAGR 2024-2030"
            color="#c3c6f9"
          />
        </div>
      </div>

      {/* RIGHT CONTENT - Preview card */}
      {/* ... */}
    </div>
  </div>
</section>
```

---

## 📊 Design System Compliance Checklist

### ✅ Badges:
- [ ] Using `<Badge>` component from design system
- [ ] Purple variant for "New Report" (premium feature)
- [ ] Size `md` for hero prominence
- [ ] Not overusing brand red

### ✅ Buttons:
- [ ] Using `<Button>` component from design system
- [ ] Primary CTA: `variant="brand"` with `animatedArrow={true}`
- [ ] Secondary CTA: `variant="secondary"` with `background="dark"`
- [ ] Size `lg` for hero (56px height)
- [ ] Font: `font-sans font-bold` for primary, `font-medium` for secondary
- [ ] Shimmer effect auto-applied (don't disable)

### ✅ Typography:
- [ ] H1: `font-serif font-light` (Noto Serif 300)
- [ ] Body: `font-sans font-normal` (DM Sans 400)
- [ ] H1 size: `text-[3.052rem]` (48.8px)
- [ ] Body size: `text-[1rem]` (16px)

### ✅ Metrics/Stats:
- [ ] Values: `font-serif font-light` (Noto Serif 300)
- [ ] Labels: `font-sans font-medium` (DM Sans 500)
- [ ] Value size: `text-[1.563rem]` (25px)
- [ ] Label size: `text-[0.8rem]` (12.8px)
- [ ] Icon colors: Purple (#806ce0), Perano (#dfeafa), Periwinkle (#c3c6f9)

### ✅ Color Usage:
- [ ] 92% black/white/gray
- [ ] 5% warm tones
- [ ] 3% purple/periwinkle/perano accents
- [ ] <1% Ken Bold Red (primary CTA only)

---

## 🚫 Common Mistakes to Avoid

### ❌ DON'T:
1. ❌ Use `font-medium` for hero h1 → Use `font-light`
2. ❌ Use system fonts for h1 → Use `font-serif`
3. ❌ Use `size="md"` for hero buttons → Use `size="lg"`
4. ❌ Add arrows to all buttons → Only for urgency CTAs
5. ❌ Use Ken Bold Red for badges → Use purple/periwinkle
6. ❌ Use Tailwind font size classes → Use exact rem values
7. ❌ Disable shimmer effect → Always keep it
8. ❌ Use primary variant for dark backgrounds → Use brand or secondary

### ✅ DO:
1. ✅ Use `font-serif font-light` for hero h1
2. ✅ Use `font-sans` for all body text and buttons
3. ✅ Use `size="lg"` for hero prominence
4. ✅ Add `animatedArrow={true}` for download/form CTAs
5. ✅ Use purple/periwinkle/perano for stat icons
6. ✅ Use exact token values: `text-[3.052rem]`
7. ✅ Let shimmer effect work automatically
8. ✅ Use `background="dark"` for secondary buttons on dark hero

---

## 📝 Summary

**Design System VS 26 Hero Section Formula:**

1. **Badge**: Purple variant (`variant="purple"`) for premium features
2. **H1**: Noto Serif Light (`font-serif font-light text-[3.052rem]`)
3. **Body**: DM Sans Normal (`font-sans font-normal text-[1rem]`)
4. **Primary CTA**: Brand + Arrow (`variant="brand" animatedArrow={true} size="lg"`)
5. **Secondary CTA**: Secondary + Dark (`variant="secondary" background="dark" size="lg"`)
6. **Stats Values**: Noto Serif Light (`font-serif font-light text-[1.563rem]`)
7. **Stats Labels**: DM Sans Medium (`font-sans font-medium text-[0.8rem]`)
8. **Colors**: 92% neutral, 5% warm, 3% purple/periwinkle accents

---

**Last Updated:** 2026-02-13  
**Status:** ✅ Production Ready  
**Repository:** vsoffice001-cloud/Design-System-vs-26
