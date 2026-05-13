# Typography System - Major Third Scale

**Version:** 2.0.0  
**Scale Ratio:** 1.25 (Major Third)  
**Philosophy:** Massive, editorial-style headings with generous whitespace

---

## 📐 System Overview

Our typography system uses a **Major Third scale (1.25 ratio)** with massive, editorial-style headings, generous line-height, and intentional hierarchy to create exceptional readability and visual impact.

### Core Principles

1. **Massive Headings** - 48px minimum for H1 hero sections
2. **Generous Whitespace** - Line-height 1.6 for body, 1.2 for headings
3. **Two Weights Only** - Bold (700) and Regular (400) - no semi-bold, no light
4. **Opacity for Hierarchy** - 100% primary, 70% body, 60% captions, 40% metadata

---

## 🎯 Font Family Usage Rule

### ⚠️ IMPORTANT: Two Fonts, Clear Rules

**Noto Serif** - ONLY for section titles/headings (semantic H1-H6 that introduce sections)
- "Qatar Fresh Herbs Market Overview" ✅
- "Scope of the Report" ✅
- "Market Size, Growth Forecast & Trends" ✅

**DM Sans** - For EVERYTHING ELSE including:
- "Qatar Fresh Herbs Market" (hero display - even if 48px) ✅
- Body text and paragraphs ✅
- Buttons, labels, navigation, UI elements ✅
- All other text content ✅

### Visual Example from Your App:

```tsx
{/* Hero - Large display but NOT a section heading → DM Sans */}
<div 
  className="text-[48px] font-bold" 
  style={{ fontFamily: "'DM Sans', sans-serif" }}
>
  Qatar Fresh Herbs Market
</div>

{/* Section Heading - Introduces a section → Noto Serif */}
<h2 
  className="text-[31px] font-bold" 
  style={{ fontFamily: "'Noto Serif', serif" }}
>
  Qatar Fresh Herbs Market Overview
</h2>

{/* Body text → DM Sans */}
<p 
  className="text-[16px] leading-[1.6]" 
  style={{ fontFamily: "'DM Sans', sans-serif" }}
>
  The Qatar Fresh Herbs Market is valued at $150 million...
</p>
```

---

## 🎵 What is the Major Third Type Scale?

The Major Third scale uses a **1.25 ratio** between each size step, creating harmonious proportions inspired by musical intervals. Starting from a 16px base, each step multiplies by 1.25, resulting in sizes that feel naturally balanced and create clear visual hierarchy.

### Mathematical Progression

```
Base: 16px
× 1.25 = 20px
× 1.25 = 25px
× 1.25 = 31px
× 1.25 = 39px
× 1.25 = 48px ← Hero H1
× 1.25 = 61px
× 1.25 = 76px
```

### Why This System Works

✓ **Clear Hierarchy** - Each size step is distinct enough to signal importance  
✓ **Editorial Feel** - Large headings (48px+) create magazine-quality layouts  
✓ **Readability First** - Generous line-heights (1.6 for body) reduce eye strain  
✓ **Scalable** - Works consistently from mobile to desktop  
✓ **Minimalist** - Bold/Regular weights only—no complexity  

---

## 📏 Complete Type Scale

**10-step scale from 12px to 76px based on 1.25 ratio multiplication**

| Name | Size | Rem | Usage |
|------|------|-----|-------|
| **6XL** | `76px` | 4.768rem | Massive impact headlines (rare) |
| **5XL** | `61px` | 3.815rem | Large hero headlines (rare) |
| **4XL** | `48px` | 3rem | **Hero/Display sections** ⭐ |
| **3XL** | `39px` | 2.441rem | **Page titles H1** ⭐ |
| **2XL** | `31px` | 1.953rem | Main sections H2 |
| **XL** | `25px` | 1.5625rem | Subsections H3 |
| **LG** | `20px` | 1.25rem | Card headings H4 |
| **BASE** | `16px` | 1rem | **H5 / Standard body text** ⭐ |
| **SM** | `14px` | 0.875rem | H6 / Captions, labels |
| **XS** | `12px` | 0.75rem | Metadata, timestamps, legal |

---

## 🔤 Hierarchy Guidelines

### Hero/Display - Large Displays Only
```
Size: 48px (4xl)
Weight: Bold (700)
Line-height: 1.2
Font: Noto Serif
Opacity: 100%
```
**Usage:** Reserved for hero sections and special landing page displays. **Use sparingly.**

**Example:**
```tsx
<h1 
  className="text-[48px] leading-[1.2] font-bold"
  style={{ fontFamily: "'Noto Serif', serif" }}
>
  Hero Display Title
</h1>
```

---

### H1 - Page Titles
```
Size: 39px (3xl)
Weight: Bold (700)
Line-height: 1.2
Font: Noto Serif
Opacity: 100%
```
**Usage:** Main page titles. **One per page maximum.**

**Example:**
```tsx
<h1 
  className="text-[39px] leading-[1.2] font-bold"
  style={{ fontFamily: "'Noto Serif', serif" }}
>
  Qatar Fresh Herbs Market Overview
</h1>
```

---

### H2 - Section Headings
```
Size: 31px (2xl)
Weight: Bold (700)
Line-height: 1.3
Font: Noto Serif
Opacity: 100%
```
**Usage:** Major section dividers. Use to break up long content.

**Example:**
```tsx
<h2 
  className="text-[31px] leading-[1.3] font-bold"
  style={{ fontFamily: "'Noto Serif', serif" }}
>
  Market Size, Growth Forecast & Trends
</h2>
```

---

### H3 - Subsection Titles
```
Size: 25px (xl)
Weight: Bold (700)
Line-height: 1.4
Font: Noto Serif
Opacity: 100%
```
**Usage:** Subsection headers within major sections.

**Example:**
```tsx
<h3 
  className="text-[25px] leading-[1.4] font-bold"
  style={{ fontFamily: "'Noto Serif', serif" }}
>
  Growth Drivers
</h3>
```

---

### H4 - Card Headings
```
Size: 20px (lg)
Weight: Bold (700)
Line-height: 1.4
Font: Noto Serif
Opacity: 100%
```
**Usage:** Card titles, modal headers, prominent labels.

**Example:**
```tsx
<h4 
  className="text-[20px] leading-[1.4] font-bold"
  style={{ fontFamily: "'Noto Serif', serif" }}
>
  Revenue Overview
</h4>
```

---

### H5 - Small Headings
```
Size: 16px (base)
Weight: Bold (700)
Line-height: 1.4
Font: Noto Serif
Opacity: 100%
```
**Usage:** Minor section headers, small card titles.

**Example:**
```tsx
<h5 
  className="text-[16px] leading-[1.4] font-bold"
  style={{ fontFamily: "'Noto Serif', serif" }}
>
  Key Metrics
</h5>
```

---

### H6 - Smallest Headings
```
Size: 14px (sm)
Weight: Bold (700)
Line-height: 1.4
Font: Noto Serif
Opacity: 100%
```
**Usage:** Inline section headers, smallest headings.

**Example:**
```tsx
<h6 
  className="text-[14px] leading-[1.4] font-bold"
  style={{ fontFamily: "'Noto Serif', serif" }}
>
  Details
</h6>
```

---

## ⚖️ Font Weight System

### The Two-Weight Philosophy

Limiting to two weights forces intentional hierarchy. Instead of reaching for "semi-bold" to create subtle emphasis, we use **size, color opacity, and spacing** to communicate importance. This constraint makes designs stronger, not weaker.

### Bold (700) - `font-bold`
```
Usage: All headings (H1-H6), button labels, emphasized inline text, data labels
```

**Examples:**
```tsx
<h1 className="font-bold">Hero Heading</h1>
<button className="font-bold">Primary CTA</button>
<span className="font-bold">Emphasized text</span>
```

### Regular (400) - Default
```
Usage: Body text, paragraphs, captions, labels, UI text, links
```

**Examples:**
```tsx
<p>Standard body text uses Regular weight by default</p>
<a href="#">Links are Regular weight</a>
<label>Form labels are Regular weight</label>
```

---

## 📊 Line Height System

Generous line-heights ensure exceptional readability across all text sizes.

| Context | Line Height | Usage |
|---------|-------------|-------|
| **H1, H2** | `1.2` | Large headings (48px, 39px) |
| **H3** | `1.3` | Medium headings (31px) |
| **H4, H5, H6** | `1.4` | Small headings (25px, 20px, 16px) |
| **Body Large, Base** | `1.6` ⭐ | Standard body text |
| **Body Small** | `1.5` | Captions, labels (14px) |
| **Body XS** | `1.5` | Metadata (12px) |

---

## 🎨 Text Opacity Hierarchy

Use opacity to create hierarchy without changing font weight or size.

| Level | Opacity | Usage |
|-------|---------|-------|
| **Primary** | `100%` | Primary headings, important text |
| **Body** | `70%` | Standard body text ⭐ |
| **Caption** | `60%` | Captions, labels, secondary info |
| **Metadata** | `40%` | Timestamps, metadata, legal copy |

**Tailwind Classes:**
```tsx
<p className="text-black">100% - Primary</p>
<p className="text-black/70">70% - Body text</p>
<p className="text-black/60">60% - Captions</p>
<p className="text-black/40">40% - Metadata</p>
```

---

## 🌳 Size Selection Decision Tree

### Step 1: Identify Content Type
- Hero heading?
- Section title?
- Body text?
- Label?
- Metadata?

### Step 2: Check Hierarchy Level
- Is it the most important thing?
- Second level?
- Supporting info?

### Step 3: Match to Scale
- **Hero** = 48px (4xl)
- **Section** = 39px (3xl)
- **Body** = 16px (base)
- **Caption** = 14px (sm)
- **Metadata** = 12px (xs)

### Step 4: Apply Weight + Opacity
- **Bold** for headings (`font-bold`)
- **Regular** for body
- Then use opacity (`text-black/70`) for further hierarchy

---

## 🎯 Real-World Decision Making

### Scenario: Landing Page Hero Section
```tsx
<div>
  {/* Main headline: 48px Bold */}
  <h1 className="text-[48px] leading-[1.2] font-bold" style={{ fontFamily: "'Noto Serif', serif" }}>
    Qatar Fresh Herbs Market
  </h1>
  
  {/* Subheadline: 20px Regular with 70% opacity */}
  <p className="text-[20px] leading-[1.6] text-black/70">
    Comprehensive market analysis covering size, share, growth drivers...
  </p>
</div>
```

### Scenario: Blog Post Layout
```tsx
<article>
  {/* Article title: 39px Bold */}
  <h1 className="text-[39px] leading-[1.2] font-bold" style={{ fontFamily: "'Noto Serif', serif" }}>
    Article Title
  </h1>
  
  {/* Body: 16px Regular with 70% opacity */}
  <p className="text-[16px] leading-[1.6] text-black/70">
    Article body content...
  </p>
  
  {/* Metadata: 12px Regular with 40% opacity */}
  <p className="text-[12px] leading-[1.5] text-black/40">
    Published January 23, 2026 • 5 min read
  </p>
</article>
```

### Scenario: Dashboard with Data Cards
```tsx
<div>
  {/* Page title: 39px Bold */}
  <h1 className="text-[39px] leading-[1.2] font-bold" style={{ fontFamily: "'Noto Serif', serif" }}>
    Dashboard
  </h1>
  
  {/* Card titles: 25px Bold */}
  <h3 className="text-[25px] leading-[1.4] font-bold" style={{ fontFamily: "'Noto Serif', serif" }}>
    Revenue Overview
  </h3>
  
  {/* Metrics: 31px Bold */}
  <div className="text-[31px] leading-[1.3] font-bold">
    $1.2M
  </div>
  
  {/* Labels: 14px Regular with 60% opacity */}
  <p className="text-[14px] leading-[1.5] text-black/60">
    Total Revenue
  </p>
</div>
```

---

## ✅ Best Practices

### DO
✓ Use exact scale values (48px, 39px, 31px) - never estimate  
✓ Apply `font-bold` to all headings and important labels  
✓ Use opacity (`text-black/70`, `text-black/60`) to create hierarchy  
✓ Maintain 1.6 line-height for body text  
✓ Limit to one H1 per page (48px hero heading)  
✓ Use 16px (base) as default for all body text  
✓ Use Noto Serif for ALL headings (H1-H6)  
✓ Use DM Sans for ALL body text and UI elements  

### DON'T
✗ Use arbitrary font sizes (50px, 35px, 18px) outside the scale  
✗ Use semi-bold, medium, light, or other intermediate weights  
✗ Set body text smaller than 16px - hurts readability  
✗ Use tight line-heights (1.0-1.2) for body text  
✗ Have multiple 48px headings competing for attention  
✗ Mix Tailwind text utilities (`text-2xl`) with pixel values - stay consistent  
✗ Use Noto Serif for body text  
✗ Use DM Sans for headlines  

---

## 💻 Usage Examples

### TypeScript Import
```typescript
import { fontSize, fontWeight, lineHeight, textStyles } from '@/design-system/typography';

// Use tokens
const heroStyle = {
  fontSize: fontSize['4xl'],        // 48px
  fontWeight: fontWeight.bold,      // 700
  lineHeight: lineHeight.tight,     // 1.2
};

// Or use presets
const bodyStyle = textStyles.body;
```

### CSS Variables
```css
.hero-heading {
  font-size: var(--text-4xl);          /* 48px */
  font-weight: var(--font-bold);        /* 700 */
  line-height: var(--leading-tight);    /* 1.2 */
  font-family: var(--font-display);     /* Noto Serif */
}

.body-text {
  font-size: var(--text-base);          /* 16px */
  font-weight: var(--font-regular);     /* 400 */
  line-height: var(--leading-comfortable); /* 1.6 */
  font-family: var(--font-body);        /* DM Sans */
  color: rgba(0, 0, 0, var(--text-opacity-body)); /* 70% */
}
```

### Tailwind Classes
```tsx
{/* Hero heading */}
<h1 className="text-[48px] leading-[1.2] font-bold" style={{ fontFamily: "'Noto Serif', serif" }}>
  Hero Headline
</h1>

{/* Section heading */}
<h2 className="text-[39px] leading-[1.2] font-bold" style={{ fontFamily: "'Noto Serif', serif" }}>
  Section Title
</h2>

{/* Body text */}
<p className="text-[16px] leading-[1.6] text-black/70">
  Standard paragraph with optimal readability.
</p>

{/* Caption */}
<p className="text-[14px] leading-[1.5] text-black/60">
  Caption or label text
</p>
```

---

## 📋 Quick Reference Summary

### Scale Ratio
**1.25 (Major Third)** - Mathematical harmony for natural size progression

### Font Weights
**2 weights only** - Bold (700) and Regular (400)

### Body Line-Height
**1.6** - Generous spacing for comfortable reading

### Heading Line-Height
**1.2** - Tight spacing for visual impact

### Standard Sizes
- **Hero/Display:** 48px Bold, 1.2 leading
- **H1 Page Title:** 39px Bold, 1.2 leading ⭐
- **H2 Section:** 31px Bold, 1.3 leading
- **H3 Subsection:** 25px Bold, 1.4 leading
- **H4 Card:** 20px Bold, 1.4 leading
- **H5 Small:** 16px Bold, 1.4 leading
- **H6 Smallest:** 14px Bold, 1.4 leading
- **Body Large:** 20px Regular, 1.6 leading
- **Body Default:** 16px Regular, 1.6 leading ⭐

---

## 🔗 Related Resources

- **Main Documentation:** `/design-system/README.md`
- **Quick Reference:** `/design-system/QUICK-REFERENCE.md`
- **Handover Guide:** `/design-system/HANDOVER-GUIDE.md`
- **CSS Variables:** `/src/styles/theme.css`
- **TypeScript Tokens:** `/design-system/typography.ts`

---

**Version:** 2.0.0  
**Last Updated:** January 23, 2026  
**Status:** Production Ready ✅