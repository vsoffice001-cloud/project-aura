# Project KP 2.0 Product Design System

**Version:** 2.0.1  
**Last Updated:** January 23, 2026  
**Maintainer:** Ken Research Design Team

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Installation & Setup](#installation--setup)
3. [Color System](#color-system)
4. [Typography](#typography)
5. [Spacing & Layout](#spacing--layout)
6. [Component Patterns](#component-patterns)
7. [Usage Examples](#usage-examples)
8. [Best Practices](#best-practices)
9. [Migration Guide](#migration-guide)

---

## Overview

The Project KP 2.0 Product Design System is a comprehensive design language for Ken Research applications. It provides a complete set of design tokens, component patterns, and guidelines to ensure consistency across all digital products.

### Key Features

- ✅ **Type-Safe Tokens** - Full TypeScript support with type exports
- ✅ **CSS Variables** - All tokens available as CSS custom properties
- ✅ **Tailwind Compatible** - Direct integration with Tailwind CSS
- ✅ **Semantic Naming** - Intuitive, purpose-driven token names
- ✅ **Complete Scales** - Full 50-900 color scales for flexibility
- ✅ **Developer Friendly** - Easy to import and use

### What's New in 2.0

- 🎨 **Simplified Color System** - Streamlined from 3 palettes to 2 core + utilities
- 📐 **New Warm Scale** - Dedicated warm off-white scale for subtle backgrounds
- 🔴 **Ken Bold Red as Primary** - #b01f24 now the primary brand color
- 💜 **Refined Periwinkle** - Updated for better accessibility and harmony
- 📊 **Enhanced Grayscale** - Complete black tint scale (50-900)
- 🎯 **Semantic Tokens** - Purpose-driven token names for faster development

---

## Installation & Setup

### 1. Import Design System

```typescript
// Import all tokens
import { colors, typography, spacing } from '@/design-system';

// Import specific tokens
import { colors, semanticColors } from '@/design-system/colors';
import { textStyles } from '@/design-system/typography';
import { semanticSpacing, shadows } from '@/design-system/spacing';
```

### 2. CSS Variables

All design tokens are available as CSS variables. They're automatically loaded from `/src/styles/theme.css`.

```css
/* Use in CSS */
.element {
  color: var(--brand-red);
  background: var(--warm-300);
  padding: var(--space-md);
}
```

### 3. Tailwind CSS

Use design tokens directly in Tailwind classes:

```tsx
<div className="bg-[#f5f2f1] text-[#000000] p-[16px] rounded-[5px]">
  Content
</div>
```

---

## Color System

### Foundation Colors

```typescript
colors.foundation.black   // #000000 - Primary text, hero backgrounds
colors.foundation.white   // #ffffff - Primary backgrounds
```

**Usage:**
- **Black (#000000):** Hero sections, primary headlines, body text on light backgrounds
- **White (#ffffff):** Primary page background, card backgrounds, text on dark backgrounds

---

### Grayscale (Black Tints 50-900)

Complete neutral scale for text, borders, and backgrounds.

| Token | Hex | Usage |
|-------|-----|-------|
| `grayscale.50` | #fafafa | Very subtle backgrounds |
| `grayscale.100` | #f5f5f5 | Card backgrounds |
| `grayscale.200` | #e5e5e5 | Borders, dividers |
| `grayscale.300` | #d4d4d4 | Disabled states |
| `grayscale.400` | #a3a3a3 | Placeholder text |
| `grayscale.500` | #737373 | Secondary text |
| `grayscale.600` | #525252 | Body text alternative ⭐ |
| `grayscale.700` | #404040 | Headings alternative |
| `grayscale.800` | #262626 | Strong text |
| `grayscale.900` | #171717 | Deep backgrounds |

**CSS Variables:**
```css
var(--black-50) through var(--black-900)
```

**Tailwind Classes:**
```tsx
<div className="bg-[#f5f5f5] text-[#525252] border-[#e5e5e5]">
```

---

### Warm Off-White Scale (50-900)

Warm, inviting neutral scale for section backgrounds and subtle differentiation.

| Token | Hex | Usage |
|-------|-----|-------|
| `warm.50` | #fefdfd | Subtle overlays |
| `warm.100` | #fcfbfa | Hover backgrounds |
| `warm.200` | #f9f7f6 | Card backgrounds |
| `warm.300` | #f5f2f1 | Section backgrounds ⭐ |
| `warm.400` | #f0ebe9 | Alternative backgrounds |
| `warm.500` | #eae5e3 | Borders |
| `warm.600` | #d9d1ce | Timeline base |
| `warm.700` | #c8bcb8 | Timeline nodes |
| `warm.800` | #b7a9a3 | Text on light warm |
| `warm.900` | #a6968e | Strong accents |

**Primary Use Case:** Alternating section backgrounds
```tsx
<section className="bg-white">White section</section>
<section className="bg-[#f5f2f1]">Warm section</section>
<section className="bg-white">White section</section>
```

**CSS Variables:**
```css
var(--warm-50) through var(--warm-900)
```

---

### Ken Bold Red - Primary Brand Color ⭐

The primary brand color for CTAs, links, and key interactive elements.

| Token | Hex | Usage |
|-------|-----|-------|
| `red.50` | #fef2f2 | Subtle backgrounds |
| `red.100` | #fee2e2 | Notice backgrounds |
| `red.200` | #fecaca | Disabled states |
| `red.300` | #fca5a7 | Borders |
| `red.400` | #f87176 | Icons, secondary |
| `red.500` | #dc3238 | Links, active states |
| `red.600` | **#b01f24** | **PRIMARY BRAND** ⭐ |
| `red.700` | #8f181d | Hover state |
| `red.800` | #771419 | Active/pressed state |
| `red.900` | #5f1014 | Text, shadows |

**Quick Access:**
```typescript
colors.brand.red         // #b01f24 - Primary
colors.brand.redHover    // #8f181d - Hover
colors.brand.redActive   // #771419 - Active
```

**CSS Variables:**
```css
--brand-red: #b01f24
--brand-red-hover: #8f181d
--brand-red-active: #771419
```

#### Primary CTA Button Pattern

**Gradient Version (Recommended for Hero/Landing):**
```tsx
<button className="
  bg-gradient-to-br from-[#8f181d] to-[#dc3238]
  hover:from-[#b01f24] hover:to-[#f87176]
  text-white px-8 py-4 rounded-[5px]
  transition-all duration-300 font-bold
  shadow-lg hover:shadow-xl
">
  Primary CTA
</button>
```

**Solid Version (Recommended for Standard UI):**
```tsx
<button className="
  bg-[#b01f24]
  hover:bg-[#8f181d]
  active:bg-[#771419]
  text-white px-6 py-3 rounded-[5px]
  transition-colors duration-200
">
  Primary Action
</button>
```

---

### Periwinkle - Trust & Soft Accents

Soft, trustworthy accent color for secondary elements and data visualization.

| Token | Hex | Usage |
|-------|-----|-------|
| `periwinkle.50` | #fafbfe | Subtle backgrounds |
| `periwinkle.100` | #f5f6fd | Hover backgrounds |
| `periwinkle.200` | #ebedfb | Borders |
| `periwinkle.300` | #dfe1f9 | Disabled states |
| `periwinkle.400` | #d3d5f9 | Icon backgrounds |
| `periwinkle.500` | #c3c6f9 | Accents |
| `periwinkle.600` | **#a7abf0** | **PRIMARY** ⭐ |
| `periwinkle.700` | #8b90e0 | Hover states |
| `periwinkle.800` | #7075c8 | Active states |
| `periwinkle.900` | #5a5fa0 | Text on light |

**Usage:**
- Secondary buttons and links
- Icon backgrounds (color-600 with background-100)
- Data visualization (charts, graphs)
- Informational messages
- Soft UI accents

**CSS Variables:**
```css
var(--periwinkle-50) through var(--periwinkle-900)
```

---

### Utility Colors

#### Green - Success & Positive Metrics

```typescript
colors.green[600]  // #16a34a - Base green
```

**Usage:** Success messages, positive metrics, growth indicators, checkmarks

#### Rose - Errors & Warnings

```typescript
colors.rose[600]  // #e11d48 - Base rose
```

**Usage:** Error messages, validation errors, critical warnings, alerts

#### Amber - Warnings & Highlights

```typescript
colors.amber[600]  // #d97706 - Base amber
```

**Usage:** Warning messages, highlights, pending states, caution indicators

---

### Semantic Color Tokens

Pre-configured semantic tokens for common use cases:

```typescript
// Text
semanticColors.text.primary      // Black - Primary text
semanticColors.text.secondary    // Gray 600 - Secondary text
semanticColors.text.muted        // Gray 400 - Muted text
semanticColors.text.disabled     // Gray 300 - Disabled text

// Backgrounds
semanticColors.background.primary    // White - Primary background
semanticColors.background.warm       // Warm 300 - Section backgrounds
semanticColors.background.secondary  // Gray 50 - Subtle backgrounds

// Borders
semanticColors.border.default    // Gray 200 - Default borders
semanticColors.border.warm       // Warm 500 - Warm borders

// Brand
semanticColors.brand.primary         // Ken Bold Red
semanticColors.brand.primaryHover    // Red hover state
semanticColors.brand.accent          // Periwinkle

// Feedback
semanticColors.feedback.success      // Green 600
semanticColors.feedback.error        // Rose 600
semanticColors.feedback.warning      // Amber 600
semanticColors.feedback.info         // Periwinkle 600
```

---

## Typography

### Major Third Scale (1.25 Ratio)

Our typography system uses a **Major Third scale** with a 1.25 ratio, creating harmonious proportions inspired by musical intervals. This system features massive, editorial-style headings with generous whitespace for exceptional readability.

**Core Principles:**
- **Massive Headings:** 48px minimum for H1 hero sections
- **Generous Whitespace:** Line-height 1.6 for body, 1.2 for headings
- **Two Weights Only:** Bold (700) and Regular (400) - no semi-bold, no light
- **Opacity for Hierarchy:** 100% primary, 70% body, 60% captions, 40% metadata

### Font Families

**Display Font (Noto Serif):**
```typescript
typography.fontFamily.display  // 'Noto Serif', Georgia, serif
```
**Usage:** ONLY for section headings (semantic H1-H6 elements)

**Examples:**
- ✅ "Qatar Fresh Herbs Market Overview" (section heading)
- ✅ "Scope of the Report" (section heading)
- ✅ "Market Size, Growth Forecast & Trends" (section heading)

**Body Font (DM Sans):**
```typescript
typography.fontFamily.body  // 'DM Sans', sans-serif
```
**Usage:** Everything else including:
- Hero display text (e.g., "Qatar Fresh Herbs Market" - even if 48px/bold)
- Body text, paragraphs, descriptions
- UI elements (buttons, labels, inputs, navigation)
- All other text content

**Examples:**
- ✅ "Qatar Fresh Herbs Market" (hero display)
- ✅ "Download Sample Report" (button)
- ✅ Body paragraphs and descriptions
- ✅ Navigation menus and UI text

**Monospace Font:**
```typescript
typography.fontFamily.mono  // 'Fira Code', 'Courier New', monospace
```
**Usage:** Code snippets, technical data, IDs

---

### ⚠️ Critical Font Rule

**Noto Serif** = Section headings ONLY (semantic H1-H6)  
**DM Sans** = Everything else (hero text, body, UI, buttons)

---

### Type Scale (Major Third - 1.25 Ratio)

**Complete 10-step scale from 12px to 76px**

| Size | Token | Usage | Line Height |
|------|-------|-------|-------------|
| 76px | `6xl` | Massive impact (rare) | 1.2 |
| 61px | `5xl` | Large hero (rare) | 1.2 |
| **48px** | **4xl** | **Hero/Display sections** ⭐ | **1.2** |
| **39px** | **3xl** | **Page titles H1** ⭐ | **1.2** |
| 31px | `2xl` | Main sections H2 | 1.3 |
| 25px | `xl` | Subsections H3 | 1.4 |
| 20px | `lg` | Card headings H4 | 1.4 |
| **16px** | **base** | **H5 / Standard body** ⭐ | **1.4 / 1.6** |
| 14px | `sm` | H6 / Captions, labels | 1.4 / 1.5 |
| 12px | `xs` | Metadata, timestamps | 1.5 |

**Mathematical Progression:** Each step multiplies by 1.25  
**Example:** 16px × 1.25 = 20px × 1.25 = 25px × 1.25 = 31px...

---

### Font Weight System

**Two Weights Only - The Philosophy:**

Limiting to two weights forces intentional hierarchy. Instead of reaching for "semi-bold," we use size, color opacity, and spacing to communicate importance.

#### Bold (700) - `font-bold`
```
Usage: All headings (H1-H6), button labels, emphasized inline text, data labels
```

**Examples:**
```tsx
<h1 className="font-bold">Hero Heading</h1>
<button className="font-bold">Primary CTA</button>
<span className="font-bold">Emphasized text</span>
```

#### Regular (400) - Default
```
Usage: Body text, paragraphs, captions, labels, UI text, links
```

**Examples:**
```tsx
<p>Standard body text uses Regular weight</p>
<a href="#">Links are Regular weight</a>
<label>Form labels are Regular weight</label>
```

---

### Text Opacity Hierarchy

Use opacity to create hierarchy without changing font weight:

| Level | Opacity | Usage | Tailwind Class |
|-------|---------|-------|----------------|
| **Primary** | 100% | Headings, important text | `text-black` |
| **Body** | 70% | Standard body text ⭐ | `text-black/70` |
| **Caption** | 60% | Captions, labels | `text-black/60` |
| **Metadata** | 40% | Timestamps, metadata | `text-black/40` |

---

## Spacing & Layout

### Base Spacing Scale

```typescript
spacing[0]   // 0px
spacing[1]   // 4px
spacing[2]   // 8px
spacing[3]   // 12px
spacing[4]   // 16px - Base unit ⭐
spacing[6]   // 24px
spacing[8]   // 32px
spacing[12]  // 48px
spacing[16]  // 64px
spacing[24]  // 96px
spacing[32]  // 128px
```

### Semantic Spacing

**Component Spacing:**
```typescript
semanticSpacing.component.xs   // 8px - Tight spacing
semanticSpacing.component.md   // 16px - Standard ⭐
semanticSpacing.component.lg   // 24px - Comfortable
```

**Layout Spacing:**
```typescript
semanticSpacing.layout.sm     // 24px
semanticSpacing.layout.md     // 32px
semanticSpacing.layout.lg     // 48px - Standard section ⭐
semanticSpacing.layout.xl     // 64px
semanticSpacing.layout.xxl    // 96px - Major sections
```

**Container Padding:**
```typescript
semanticSpacing.container.mobile   // 16px
semanticSpacing.container.tablet   // 32px
semanticSpacing.container.desktop  // 48px ⭐
semanticSpacing.container.wide     // 64px
```

---

## Layout & Container – Proportional Padding System

**Purpose:** Intelligent padding that adapts to viewport width while maintaining readability and preventing ultra-wide text lines.

### Core Concept

The layout system uses **proportional padding** (20% on each side = 40% total) that scales with viewport width, but with intelligent min/max constraints.

**Benefits:**
- ✅ Content never gets too wide on 4K+ displays
- ✅ Maintains comfortable reading width
- ✅ Adapts gracefully from mobile to ultra-wide
- ✅ Never shrinks below mobile-safe padding

### Layout Tokens

| Token | Value | Purpose |
|-------|-------|---------|
| `layout.content.maxWidth` | 1440px | Maximum content width (prevents ultra-wide text) |
| `layout.content.minWidth` | 320px | Minimum width (mobile safety) |
| `layout.padding.side` | 20% | Proportional side padding per side |
| `layout.padding.sideMin` | 16px | Minimum padding (never smaller) |
| `layout.padding.sideMax` | 160px | Maximum padding (caps extreme widths) |
| `layout.paddingInline` ⭐ | clamp(...) | **Recommended: Smart computed padding** |

### How It Works

```css
/* The Magic Formula */
padding-inline: clamp(16px, 20%, 160px);

/* Breakdown: */
/* - At narrow viewports: Uses minimum 16px */
/* - At medium viewports: Uses 20% of width */
/* - At ultra-wide viewports: Caps at maximum 160px */
```

**Visual Example:**

```
Mobile (375px):      16px padding (min)
Tablet (768px):      ~154px padding (20%)
Desktop (1440px):    160px padding (max - capped)
4K (3840px):         160px padding (max - capped)
```

### TypeScript Usage

```typescript
import { layout } from '@/design-system';

// Recommended: Use computed padding
const containerStyles = {
  paddingInline: layout.paddingInline,  // 'clamp(16px, 20%, 160px)'
  maxWidth: layout.content.maxWidth,    // '1440px'
};

// Manual control
const customStyles = {
  paddingLeft: layout.padding.side,     // '20%'
  paddingRight: layout.padding.side,
  minWidth: layout.content.minWidth,    // '320px'
};
```

### CSS Variables

```css
/* Core constraints */
--content-max-width: 1440px;
--content-min-width: 320px;

/* Side padding */
--padding-page-side: 20%;
--padding-page-side-min: 16px;
--padding-page-side-max: 160px;

/* ⭐ Recommended: Smart computed padding */
--padding-page-inline: clamp(
  var(--padding-page-side-min),
  var(--padding-page-side),
  var(--padding-page-side-max)
);
```

**Usage:**

```css
/* Recommended: Single property with smart scaling */
.container {
  padding-inline: var(--padding-page-inline);
  max-width: var(--content-max-width);
  margin-inline: auto;
}

/* Manual approach */
.custom-container {
  padding-left: clamp(var(--padding-page-side-min), var(--padding-page-side), var(--padding-page-side-max));
  padding-right: clamp(var(--padding-page-side-min), var(--padding-page-side), var(--padding-page-side-max));
}
```

### Tailwind Classes

```tsx
{/* Recommended: Use CSS variable */}
<div 
  className="mx-auto max-w-[1440px]"
  style={{ paddingInline: 'var(--padding-page-inline)' }}
>
  Content
</div>

{/* Alternative: Inline clamp */}
<div 
  className="mx-auto max-w-[1440px]"
  style={{ paddingInline: 'clamp(16px, 20%, 160px)' }}
>
  Content
</div>

{/* With breakpoints (if you need more control) */}
<div className="mx-auto max-w-[1440px] px-4 md:px-[10%] lg:px-[20%] xl:px-[160px]">
  Content
</div>
```

### Common Patterns

#### **Full-Width Section with Proportional Padding**

```tsx
<section className="w-full bg-white py-24">
  <div 
    className="mx-auto max-w-[1440px]"
    style={{ paddingInline: 'var(--padding-page-inline)' }}
  >
    <h2>Section Title</h2>
    <p>Content automatically scales with smart padding...</p>
  </div>
</section>
```

#### **TypeScript/React Component**

```typescript
import { layout } from '@/design-system';

function ContentSection({ children }: { children: React.ReactNode }) {
  return (
    <section style={{ width: '100%' }}>
      <div
        style={{
          maxWidth: layout.content.maxWidth,
          paddingInline: layout.paddingInline,
          marginInline: 'auto',
        }}
      >
        {children}
      </div>
    </section>
  );
}
```

#### **CSS Module**

```css
.section {
  width: 100%;
  background: var(--color-bg-primary);
  padding-block: var(--space-24); /* 96px */
}

.container {
  max-width: var(--content-max-width);
  padding-inline: var(--padding-page-inline);
  margin-inline: auto;
}
```

### Why This System?

**Problem:** Traditional fixed padding doesn't scale well:
```css
/* ❌ Old way - breaks on ultra-wide */
.container {
  max-width: 1200px;
  padding: 0 20px;  /* Too small on large screens */
}
```

**Solution:** Proportional padding with smart constraints:
```css
/* ✅ New way - adapts intelligently */
.container {
  max-width: 1440px;
  padding-inline: clamp(16px, 20%, 160px);
}
```

**Advantages:**
1. **Mobile-first:** Never smaller than 16px
2. **Scales naturally:** Uses 20% on medium screens
3. **Ultra-wide safe:** Caps at 160px
4. **Readable:** Content width never exceeds comfortable reading length

---

### Border Radius – Intent-driven Scale

**Purpose:** Each radius size has a specific UI intent to guide consistent usage.

| Token | Size | Intent | Usage |
|-------|------|--------|-------|
| `borderRadius.xs` | 2.5px | Exceptional | Tiny tags, badges, micro-buttons |
| `borderRadius.sm` | 5px ⭐ | Tight | Form inputs, chips, toggles (Ken Research standard) |
| `borderRadius.md` | 10px | Standard | Cards, panels, tables |
| `borderRadius.lg` | 15px | Spacious | Dialogs, modals, drawers, large surfaces |
| `borderRadius.xl` | 20px | Marketing | Hero containers, large banners |
| `borderRadius.full` | 9999px | Circular | Pills, avatars, circular buttons |

**TypeScript Usage:**
```typescript
import { borderRadius } from '@/design-system';

const cardStyles = {
  borderRadius: borderRadius.md,  // 10px - Standard cards
};
```

**CSS Variables:**
```css
.card {
  border-radius: var(--radius-md);  /* 10px */
}

.button-primary {
  border-radius: var(--radius-sm);  /* 5px - Ken standard */
}

.avatar {
  border-radius: var(--radius-full);  /* 9999px */
}
```

**Tailwind Classes:**
```tsx
<div className="rounded-[10px]">Standard card</div>
<button className="rounded-[5px]">Ken Research button</button>
<img className="rounded-full" />
```

---

### Elevation / Shadow Levels – Semantic Depth

**Purpose:** Create visual hierarchy through shadow depth. Each level represents a specific UI layer.

| Token | Shadow | Intent | Usage |
|-------|--------|--------|-------|
| `shadows.flat` | none | No elevation | Flat UI elements, inline content |
| `shadows.xs` | 0 1px 2px rgba(0,0,0,0.08) | Minimal | Dividers, borders |
| `shadows.sm` | 0 1px 2px rgba(0,0,0,0.08) | Subtle lift | Cards on hover, slight emphasis |
| `shadows.md` | 0 4px 12px rgba(0,0,0,0.12) | Standard ⭐ | Cards, popovers, tooltips |
| `shadows.lg` | 0 12px 28px rgba(0,0,0,0.18) | Elevated | Modals, dialogs, dropdown menus |
| `shadows.xl` | 0 20px 40px rgba(0,0,0,0.22) | Deep | Floating panels, overlays |

**Brand-Specific Shadows:**
```typescript
shadows.brand.red           // Red-tinted shadow for brand CTAs
shadows.brand.redHover      // Deeper red shadow for hover states
shadows.brand.periwinkle    // Periwinkle-tinted shadow for accents
```

**TypeScript Usage:**
```typescript
import { shadows } from '@/design-system';

const cardStyles = {
  boxShadow: shadows.md,  // Standard card elevation
};

const modalStyles = {
  boxShadow: shadows.lg,  // Modal elevation
};
```

**CSS Variables:**
```css
.card {
  box-shadow: var(--elevation-md);  /* 0 4px 12px rgba(0,0,0,0.12) */
}

.modal {
  box-shadow: var(--elevation-lg);  /* 0 12px 28px rgba(0,0,0,0.18) */
}

.cta-button {
  box-shadow: var(--shadow-brand-red);
}

.cta-button:hover {
  box-shadow: var(--shadow-brand-red-hover);
}
```

**Tailwind Inline:**
```tsx
<div className="shadow-[0_4px_12px_rgba(0,0,0,0.12)]">
  Standard card with md elevation
</div>
```

---

### Transitions & Timing – Feel Tuning

**Purpose:** Consistent animation timing creates a cohesive, polished user experience.

#### Duration Scale

| Token | Duration | Intent | Usage |
|-------|----------|--------|-------|
| `transitions.duration.xxs` | 150ms | Very quick | Micro-interactions, icon changes |
| `transitions.duration.xs` | 200ms | Quick | Button feedback |
| `transitions.duration.sm` | 300ms ⭐ | Default | Hover/click feedback (recommended) |
| `transitions.duration.md` | 400ms | Moderate | Component state changes |
| `transitions.duration.lg` | 500ms | Slow | Content transitions |
| `transitions.duration.xl` | 600ms | Deliberate | Page transitions, drawer open |
| `transitions.duration.xxl` | 700ms | Slow reveal | Loading states |
| `transitions.duration.xxxl` | 800ms | Very slow | Emphasis animations |
| `transitions.duration.max` | 900ms | Maximum | Loading emphasis, slow reveals |

#### Timing Functions

| Token | Bezier | Intent | Usage |
|-------|--------|--------|-------|
| `transitions.timing.easeOut` | cubic-bezier(0.16, 1, 0.3, 1) ⭐ | Recommended | Most exits, natural feel |
| `transitions.timing.easeInOut` | cubic-bezier(0.4, 0, 0.2, 1) | Balanced | Bidirectional animations |
| `transitions.timing.easeIn` | cubic-bezier(0.4, 0, 1, 1) | Accelerating | Entrances |
| `transitions.timing.sharp` | cubic-bezier(0.4, 0, 0.6, 1) | Snappy | Quick interactions |

**TypeScript Usage:**
```typescript
import { transitions } from '@/design-system';

const buttonStyles = {
  transition: `all ${transitions.duration.sm} ${transitions.timing.easeOut}`,
};

const modalStyles = {
  transition: `opacity ${transitions.duration.xl} ${transitions.timing.easeInOut}`,
};
```

**CSS Variables:**
```css
.button {
  transition: all var(--duration-sm) var(--timing-ease-out);
  /* 300ms with ease-out - recommended for most interactions */
}

.modal {
  transition: opacity var(--duration-xl) var(--timing-ease-in-out);
  /* 600ms for page transitions */
}

.hover-effect {
  transition: transform var(--duration-xs) var(--timing-ease-out);
  /* 200ms quick feedback */
}

.hover-effect:hover {
  transform: translateY(-2px);
}
```

**Tailwind Classes:**
```tsx
// Duration
<div className="transition-all duration-[300ms]">Default hover</div>
<div className="transition-transform duration-[600ms]">Drawer open</div>

// Combined with timing
<button 
  className="transition-all duration-[300ms]"
  style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
>
  Smooth button
</button>
```

**Common Patterns:**
```css
/* Recommended default for most interactions */
.interactive-element {
  transition: all 300ms cubic-bezier(0.16, 1, 0.3, 1);
}

/* Button hover */
.button {
  transition: background-color 200ms cubic-bezier(0.16, 1, 0.3, 1),
              transform 200ms cubic-bezier(0.16, 1, 0.3, 1);
}

/* Modal fade in/out */
.modal {
  transition: opacity 600ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* Drawer slide */
.drawer {
  transition: transform 600ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## Icon System - Phosphor Icons

**Status:** ✅ Official Icon Library for KP 2.0  
**Package:** `@phosphor-icons/react@2.1.10`  
**Website:** https://phosphoricons.com/

### Overview

Phosphor Icons is the official icon library for the KP 2.0 Design System, offering over 9,000 icons with multiple weights and a consistent design language.

### Installation

```bash
pnpm add @phosphor-icons/react
```

### Icon Weights

Phosphor Icons support 6 weight variants. For KP 2.0, use:

| Weight | Usage | Example |
|--------|-------|---------|
| **Regular** | Default icons | Body content, UI elements |
| **Bold** | Emphasis | Buttons, headers, CTAs |
| **Fill** | Active states | Badges, selected items |
| **Duotone** | Highlights | Featured content (optional) |

**Avoid:** Thin, Light weights (not part of KP 2.0)

### Icon Sizes (KP 2.0 Standard)

| Size | Tailwind Class | Pixels | Usage |
|------|---------------|--------|-------|
| XS | `size-4` | 16px | Inline text icons |
| SM | `size-5` | 20px | Standard UI icons ⭐ |
| MD | `size-6` | 24px | Prominent icons |
| LG | `size-8` | 32px | Headers |
| XL | `size-10` | 40px | Hero sections |

### Icon Colors (KP 2.0 Palette)

```tsx
// Primary - Periwinkle
className="text-[#6D52D9]"  // Periwinkle 600 (most common)
className="text-[#9d9aef]"  // Periwinkle 400
className="text-[#e2e4fd]"  // Periwinkle 100 (backgrounds)

// Secondary - Ken Bold Red
className="text-[#b01f24]"  // Bold Red 600

// Neutral - Grayscale
className="text-[#171717]"  // Black (Foundation)
className="text-[#404040]"  // Grayscale 700
className="text-[#525252]"  // Grayscale 600
className="text-[#737373]"  // Grayscale 500
```

### Basic Usage

```tsx
import { TrendUp, MapPin, Buildings } from '@phosphor-icons/react';

// Regular weight (default)
<TrendUp className="size-5 text-[#6D52D9]" />

// Bold weight (for emphasis)
<MapPin className="size-5 text-[#6D52D9]" weight="bold" />

// Fill weight (for active states)
<Buildings className="size-6 text-[#b01f24]" weight="fill" />
```

### Migration from Lucide React

For a complete migration guide, see: `/PHOSPHOR_ICONS_MIGRATION_GUIDE.md`

---

## Component Patterns

### Primary CTA Button

```tsx
<button className="
  bg-[#b01f24]
  hover:bg-[#8f181d]
  active:bg-[#771419]
  text-white 
  px-8 py-4 
  rounded-[5px]
  font-bold
  transition-colors duration-200
  shadow-lg hover:shadow-xl
">
  Get Started
</button>
```

### Secondary Button

```tsx
<button className="
  bg-white
  hover:bg-[#fafafa]
  text-[#b01f24]
  border-2 border-[#b01f24]
  px-6 py-3
  rounded-[5px]
  font-semibold
  transition-all duration-200
">
  Learn More
</button>
```

### Card Component

```tsx
<div className="
  bg-white
  border border-[#e5e5e5]
  rounded-[8px]
  p-[24px]
  shadow-sm
  hover:shadow-md
  transition-shadow duration-200
">
  <h3 className="text-[22px] font-semibold text-[#000000] mb-[8px]">
    Card Title
  </h3>
  <p className="text-[16px] text-[#525252] leading-[1.6]">
    Card content goes here
  </p>
</div>
```

### Icon Background Pattern

```tsx
<div className="
  w-12 h-12
  rounded-[8px]
  bg-[#f5f6fd]
  flex items-center justify-center
">
  <Icon className="text-[#a7abf0] w-6 h-6" />
</div>
```

---

## Usage Examples

### Alternating Section Backgrounds

```tsx
<main>
  <section className="bg-white py-[64px]">
    {/* White section content */}
  </section>
  
  <section className="bg-[#f5f2f1] py-[64px]">
    {/* Warm section content */}
  </section>
  
  <section className="bg-white py-[64px]">
    {/* White section content */}
  </section>
</main>
```

### Typography Hierarchy

```tsx
<article>
  <h1 
    className="text-[48px] leading-[1.2] font-bold text-[#000000] mb-[24px]"
    style={{ fontFamily: "'Noto Serif', serif" }}
  >
    Article Title
  </h1>
  
  <h2 
    className="text-[32px] leading-[1.2] font-semibold text-[#000000] mb-[16px]"
    style={{ fontFamily: "'Noto Serif', serif" }}
  >
    Section Heading
  </h2>
  
  <p className="text-[16px] leading-[1.6] text-[#525252] mb-[24px]">
    Body paragraph with standard line height for comfortable reading.
  </p>
</article>
```

### Color Usage in Components

```tsx
// Primary action
<button className="bg-[#b01f24] text-white">
  Primary CTA
</button>

// Secondary action with periwinkle
<button className="bg-[#a7abf0] text-white">
  Secondary Action
</button>

// Success feedback
<div className="bg-[#dcfce7] text-[#16a34a] border border-[#16a34a]">
  Success message
</div>

// Error feedback
<div className="bg-[#ffe4e6] text-[#e11d48] border border-[#e11d48]">
  Error message
</div>
```

---

## Best Practices

### Color Usage

✅ **DO:**
- Use Ken Bold Red (#b01f24) for all primary CTAs
- Use warm-300 (#f5f2f1) for alternating section backgrounds
- Use grayscale-600 (#525252) for body text
- Use black (#000000) for headlines and hero text
- Use periwinkle-600 (#a7abf0) for secondary accents

❌ **DON'T:**
- Don't create new colors outside the design system
- Don't use pure black for body text (use grayscale-600 instead)
- Don't mix warm and cool grays in the same component
- Don't use brand red for body text

### Typography

✅ **DO:**
- Use Noto Serif ONLY for section headings (semantic H1-H6 elements)
- Use DM Sans for hero display text (even if 48px/bold)
- Use DM Sans for ALL body text, paragraphs, and UI elements
- Use DM Sans for buttons, labels, navigation, inputs
- Maintain consistent line heights (1.6 for body, 1.2 for headings)
- Use semantic text sizes from the type scale

❌ **DON'T:**
- Don't use Noto Serif for hero display text
- Don't use Noto Serif for body text or UI elements
- Don't create custom font sizes
- Don't use font weights outside the system (only Bold 700 and Regular 400)
- Don't mix display and body fonts inconsistently

**Example:**
```tsx
{/* ✅ CORRECT - Hero uses DM Sans */}
<div className="text-[48px] font-bold" style={{ fontFamily: "'DM Sans', sans-serif" }}>
  Qatar Fresh Herbs Market
</div>

{/* ✅ CORRECT - Section heading uses Noto Serif */}
<h2 className="text-[31px] font-bold" style={{ fontFamily: "'Noto Serif', serif" }}>
  Qatar Fresh Herbs Market Overview
</h2>

{/* ❌ WRONG - Don't use Noto Serif for hero text */}
<div className="text-[48px] font-bold" style={{ fontFamily: "'Noto Serif', serif" }}>
  Qatar Fresh Herbs Market
</div>
```

### Spacing

✅ **DO:**
- Use multiples of 4px (the base unit)
- Use semantic spacing tokens when available
- Maintain consistent padding across similar components
- Use layout spacing for sections (48px, 64px, 96px)

❌ **DON'T:**
- Don't use arbitrary spacing values
- Don't use inconsistent padding within component types
- Don't use spacing tokens outside the defined scale

---

## Migration Guide

### From Project K 1.0 to 2.0

**Color Changes:**
```diff
- colors.alabaster[900]  (#3d3d3d)
+ colors.grayscale[600]  (#525252)

- colors.alabaster[50]   (#fcfcfc)
+ colors.warm[300]       (#f5f2f1)

- colors.periwinkle[600] (#6d52d9) [for icons]
+ colors.periwinkle[600] (#a7abf0) [for accents]

- colors.boldKen[700]    (#b01f24) [CTAs]
+ colors.brand.red       (#b01f24) [same value, new name]
```

**Typography Changes:**
```diff
- "Section titles must be Noto Serif"
+ "All H1-H6 headlines use Noto Serif"

- "DM Sans for everything else"
+ "DM Sans for body text and UI elements"
```

**Breaking Changes:**
- Old color token names removed (boldKen, alabaster)
- New grayscale and warm scales introduced
- Periwinkle hex value changed (#6d52d9 → #a7abf0)
- All icon colors need manual review

---

## Support & Resources

- **Design System Folder:** `/design-system/`
- **CSS Variables:** `/src/styles/theme.css`
- **Interactive Docs:** `/design-system-page` route in app
- **Handover Guide:** `/design-system/HANDOVER-GUIDE.md`

---

**Last Updated:** January 23, 2026  
**Version:** 2.0.1  
**Questions?** Contact Ken Research Design Team