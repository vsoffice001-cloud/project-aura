# Variable Fonts Implementation Guide - Design System VS 26

## 📋 Overview

This document outlines the **correct implementation of variable fonts** (Google Fonts - DM Sans & Noto Serif) with full weight range support, proper optical sizing, and font feature settings.

**Date Created:** February 16, 2026  
**Design System:** VS 26  
**Fonts:** DM Sans (Sans-Serif) + Noto Serif (Serif)  
**Status:** ✅ Production Ready

---

## 🎯 Key Requirements

### Variable Fonts Must Have:
1. ✅ Full weight range import (e.g., `100..1000` not individual weights)
2. ✅ `font-optical-sizing: auto` for automatic size optimization
3. ✅ `font-variation-settings` for custom axes (width, etc.)
4. ✅ `font-feature-settings` for typography features (kerning, ligatures, numbers)
5. ✅ Proper font smoothing for cross-browser consistency
6. ✅ `text-rendering: optimizeLegibility` for better kerning

---

## 📦 Step 1: Google Fonts Import

### ✅ CORRECT Import (Variable Fonts)

**Location:** `/src/styles/fonts.css` (top of file)

```css
/* Google Fonts - Variable Fonts with Full Weight Range */
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Noto+Serif:ital,wght@0,100..900;1,100..900&display=swap');
```

### 📖 URL Breakdown:

**DM Sans:**
```
family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000
```
- `ital` - Italic axis (0 = normal, 1 = italic)
- `opsz` - Optical sizing axis (9..40 = 9pt to 40pt)
- `wght` - Weight axis (100..1000 = full range)
- `;` - Separates normal and italic configurations
- First config: `0,9..40,100..1000` (normal style, all optical sizes, all weights)
- Second config: `1,9..40,100..1000` (italic style, all optical sizes, all weights)

**Noto Serif:**
```
family=Noto+Serif:ital,wght@0,100..900;1,100..900
```
- `ital` - Italic axis (0 = normal, 1 = italic)
- `wght` - Weight axis (100..900 = full range)
- First config: `0,100..900` (normal style, all weights)
- Second config: `1,100..900` (italic style, all weights)

**Parameters:**
- `display=swap` - Show fallback font first, swap when custom font loads (better performance)

### ❌ WRONG Import (Static Fonts)

```css
/* DON'T DO THIS - Only loads specific weights, not variable */
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Noto+Serif:wght@300;400;600&display=swap');
```

**Problems:**
- ❌ Only loads 3 specific weights (400, 500, 700)
- ❌ Can't use intermediate weights like 350, 450, 550
- ❌ No optical sizing support
- ❌ Larger file size (multiple font files)
- ❌ Less flexibility for design adjustments

---

## 🎨 Step 2: CSS Font Classes

### ✅ CORRECT Implementation

**Location:** `/src/styles/theme.css` in `@layer base { }`

```css
/* Font family utilities - Design System VS 26 with Variable Fonts */
.font-serif {
  font-family: 'Noto Serif', Georgia, 'Times New Roman', serif;
  font-optical-sizing: auto;
  font-variation-settings: 'wdth' 100;
  font-weight: 300; /* Default to Light (300) for headings */
  font-feature-settings: 'kern' 1, 'liga' 1, 'calt' 1, 'tnum' 0, 'lnum' 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

.font-sans {
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
  font-optical-sizing: auto;
  font-weight: 400; /* Default to Regular (400) for body text */
  font-feature-settings: 'kern' 1, 'liga' 1, 'calt' 1, 'tnum' 0, 'lnum' 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

/* Variable font weight utilities */
.font-thin { font-weight: 100; }
.font-extralight { font-weight: 200; }
.font-light { font-weight: 300; }
.font-normal { font-weight: 400; }
.font-medium { font-weight: 500; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }
.font-extrabold { font-weight: 800; }
.font-black { font-weight: 900; }

/* Tabular numbers for statistics and data */
.font-tabular-nums {
  font-feature-settings: 'tnum' 1;
  font-variant-numeric: tabular-nums;
}
```

### ❌ WRONG Implementation

```css
/* Missing critical properties */
.font-serif {
  font-family: 'Noto Serif', serif;
  /* ❌ Missing font-optical-sizing */
  /* ❌ Missing font-variation-settings */
  /* ❌ Missing font-feature-settings */
  /* ❌ Missing font-smoothing */
}
```

---

## 🔧 Step 3: Property Explanations

### 1. `font-optical-sizing: auto`
**What it does:** Automatically adjusts font rendering based on text size.
- Small text (9-12px): More open spacing, increased x-height for readability
- Large text (20px+): Tighter spacing, refined details for elegance

**Why needed:** Makes small text readable and large headlines elegant.

### 2. `font-variation-settings: 'wdth' 100`
**What it does:** Sets the width axis for variable fonts.
- `'wdth'` = Width axis name (must use single quotes!)
- `100` = Standard width (can range from 75 to 125 typically)

**Why needed:** Some variable fonts have width axes that need explicit values.

⚠️ **CRITICAL:** Use single quotes (`'wdth'`) NOT double quotes (`"wdth"`) - double quotes cause CSS parsing errors!

### 3. `font-feature-settings`
**What it does:** Enables/disables OpenType font features.

```css
font-feature-settings: 'kern' 1, 'liga' 1, 'calt' 1, 'tnum' 0, 'lnum' 1;
```

| Feature | Value | Description |
|---------|-------|-------------|
| `'kern'` | `1` | ✅ Enable kerning (proper letter spacing) |
| `'liga'` | `1` | ✅ Enable ligatures (fi, fl, etc.) |
| `'calt'` | `1` | ✅ Enable contextual alternates |
| `'tnum'` | `0` | ❌ Disable tabular numbers (use proportional) |
| `'lnum'` | `1` | ✅ Enable lining numbers (same height) |

**Number Types:**
- **Lining numbers** (`lnum`): All numbers same height (1234567890) - best for headlines, statistics
- **Old-style numbers** (`onum`): Variable height (like lowercase letters) - best for body text
- **Tabular numbers** (`tnum`): Fixed width for alignment - best for tables, prices
- **Proportional numbers** (default): Variable width - best for running text

### 4. Font Smoothing
```css
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
text-rendering: optimizeLegibility;
```

**Why needed:**
- Makes fonts look smoother on macOS/iOS (WebKit)
- Consistent rendering across browsers
- Better kerning and ligature support

---

## 📐 Step 4: Design System Usage

### Typography Hierarchy - Design System VS 26

**Noto Serif (Headings & Display):**
```tsx
// Hero H1 - text-3xl (48.8px), Light 300
<h1 className="font-serif text-[3.052rem] font-light leading-[1.2] tracking-[-0.02em]">
  Global AI in Healthcare Market Analysis 2024
</h1>

// Section H2 - text-2xl (39px), Light 300
<h2 className="font-serif text-[2.441rem] font-light leading-[1.3]">
  Report Highlights
</h2>

// Subsection H3 - text-xl (31.25px), Normal 400
<h3 className="font-serif text-[1.953rem] font-normal leading-[1.4]">
  Market Overview
</h3>

// Large numbers/stats - text-lg (25px), Light 300
<div className="font-serif text-[1.563rem] font-light">
  $28.5B
</div>
```

**DM Sans (Body & UI):**
```tsx
// Body text - text-sm (16px), Normal 400
<p className="font-sans text-[1rem] leading-relaxed">
  Comprehensive market intelligence covering 50+ countries...
</p>

// UI labels - text-xs (12.8px), Medium 500
<span className="font-sans text-[0.8rem] font-medium uppercase tracking-wide">
  Market Size
</span>

// Buttons - text-sm (16px), Bold 700
<button className="font-sans text-[1rem] font-bold">
  Download Report
</button>
```

### When to Use Tabular Numbers

```tsx
// ✅ Good - Statistics, prices, data tables
<div className="font-serif font-light font-tabular-nums">
  $28,500,000,000
</div>

// ❌ Bad - Running text, paragraphs
<p className="font-sans font-tabular-nums">
  The market grew by 15.7% in 2024... {/* Don't do this */}
</p>
```

---

## ✅ Implementation Checklist

### Phase 1: Font Import
- [ ] Open `/src/styles/fonts.css`
- [ ] Add Google Fonts import at the **top of file**
- [ ] Use variable font URL with full weight range (`100..1000` format)
- [ ] Include both normal and italic styles
- [ ] Add `display=swap` parameter

### Phase 2: CSS Configuration
- [ ] Open `/src/styles/theme.css`
- [ ] Find `@layer base { }` section
- [ ] Add `.font-serif` class with all 7 properties
- [ ] Add `.font-sans` class with all 6 properties
- [ ] Add font weight utility classes (`.font-light`, `.font-bold`, etc.)
- [ ] Add `.font-tabular-nums` utility class
- [ ] Verify single quotes in `font-variation-settings: 'wdth' 100`

### Phase 3: Verification
- [ ] Check browser DevTools > Elements > Computed styles
- [ ] Verify `font-family` shows "Noto Serif" or "DM Sans"
- [ ] Verify `font-optical-sizing: auto` is applied
- [ ] Verify `font-feature-settings` shows all values
- [ ] Test different font weights (100-900) in UI
- [ ] Compare numbers appearance with Google Fonts preview
- [ ] Test on multiple browsers (Chrome, Firefox, Safari)

---

## 🧪 Testing & Validation

### Browser DevTools Test

1. **Open DevTools** (F12 or Cmd+Option+I)
2. **Select an element** with `.font-serif` or `.font-sans`
3. **Check Computed tab:**

```
font-family: "Noto Serif", Georgia, "Times New Roman", serif
font-optical-sizing: auto
font-variation-settings: 'wdth' 100
font-feature-settings: 'kern' 1, 'liga' 1, 'calt' 1, 'tnum' 0, 'lnum' 1
font-weight: 300
-webkit-font-smoothing: antialiased
-moz-osx-font-smoothing: grayscale
text-rendering: optimizeLegibility
```

### Visual Comparison Test

**Create a test component:**

```tsx
export function FontTest() {
  return (
    <div className="p-8 space-y-8">
      {/* Noto Serif Tests */}
      <div className="space-y-4">
        <h2 className="font-serif text-[2.441rem] font-light">
          Noto Serif Light 300 - Heading
        </h2>
        <div className="font-serif text-[1.563rem] font-light">
          1234567890 - Numbers Test
        </div>
      </div>

      {/* DM Sans Tests */}
      <div className="space-y-4">
        <p className="font-sans text-[1rem] font-normal">
          DM Sans Regular 400 - Body text with numbers 1234567890
        </p>
        <button className="font-sans text-[1rem] font-bold px-6 py-3 bg-[#b01f24] text-white">
          DM Sans Bold 700 - Button
        </button>
      </div>

      {/* Tabular Numbers Test */}
      <div className="space-y-2">
        <div className="font-serif text-[1.563rem] font-light font-tabular-nums">
          $28,500,000,000
        </div>
        <div className="font-serif text-[1.563rem] font-light font-tabular-nums">
          $12,345,678,900
        </div>
        <p className="text-xs text-gray-500">Numbers should align vertically</p>
      </div>
    </div>
  );
}
```

**Compare with Google Fonts:**
1. Go to [Google Fonts - Noto Serif](https://fonts.google.com/specimen/Noto+Serif)
2. Type same text in preview
3. Set same font size and weight
4. Compare character shapes, spacing, and number rendering

---

## 🚨 Common Mistakes & Fixes

### Mistake 1: Using Static Font Import
```css
❌ @import url('...family=Noto+Serif:wght@300;400;600...');
✅ @import url('...family=Noto+Serif:wght@0,100..900;1,100..900...');
```

### Mistake 2: Double Quotes in font-variation-settings
```css
❌ font-variation-settings: "wdth" 100;  /* CSS parse error! */
✅ font-variation-settings: 'wdth' 100;  /* Correct */
```

### Mistake 3: Missing font-optical-sizing
```css
❌ .font-serif {
     font-family: 'Noto Serif', serif;
     font-weight: 300;
   }

✅ .font-serif {
     font-family: 'Noto Serif', serif;
     font-optical-sizing: auto;  /* Required for variable fonts */
     font-weight: 300;
   }
```

### Mistake 4: Missing Font Smoothing
```css
❌ .font-serif {
     font-family: 'Noto Serif', serif;
     /* No smoothing - looks jagged on macOS */
   }

✅ .font-serif {
     font-family: 'Noto Serif', serif;
     -webkit-font-smoothing: antialiased;
     -moz-osx-font-smoothing: grayscale;
   }
```

### Mistake 5: Wrong Number Type for Use Case
```tsx
❌ {/* Statistics with proportional numbers - unaligned */}
   <div className="font-serif">$28,500,000,000</div>

✅ {/* Statistics with tabular numbers - aligned */}
   <div className="font-serif font-tabular-nums">$28,500,000,000</div>
```

---

## 📚 Reference Links

### Documentation
- [Variable Fonts Guide (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Fonts/Variable_Fonts_Guide)
- [font-variation-settings (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variation-settings)
- [font-feature-settings (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/font-feature-settings)
- [OpenType Features](https://learn.microsoft.com/en-us/typography/opentype/spec/features_pt)

### Google Fonts
- [DM Sans on Google Fonts](https://fonts.google.com/specimen/DM+Sans)
- [Noto Serif on Google Fonts](https://fonts.google.com/specimen/Noto+Serif)
- [Google Fonts API Documentation](https://developers.google.com/fonts/docs/getting_started)

### Tools
- [Font Variation Settings Playground](https://wakamaifondue.com/)
- [OpenType Feature Tester](https://fontdrop.info/)

---

## 🎯 Quick Copy-Paste Template

### Complete Implementation (Copy All)

**1. `/src/styles/fonts.css`**
```css
/* Google Fonts - Variable Fonts with Full Weight Range */
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Noto+Serif:ital,wght@0,100..900;1,100..900&display=swap');
```

**2. `/src/styles/theme.css` (in @layer base)**
```css
/* Font family utilities - Design System VS 26 with Variable Fonts */
.font-serif {
  font-family: 'Noto Serif', Georgia, 'Times New Roman', serif;
  font-optical-sizing: auto;
  font-variation-settings: 'wdth' 100;
  font-weight: 300;
  font-feature-settings: 'kern' 1, 'liga' 1, 'calt' 1, 'tnum' 0, 'lnum' 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

.font-sans {
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-feature-settings: 'kern' 1, 'liga' 1, 'calt' 1, 'tnum' 0, 'lnum' 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

.font-thin { font-weight: 100; }
.font-extralight { font-weight: 200; }
.font-light { font-weight: 300; }
.font-normal { font-weight: 400; }
.font-medium { font-weight: 500; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }
.font-extrabold { font-weight: 800; }
.font-black { font-weight: 900; }

.font-tabular-nums {
  font-feature-settings: 'tnum' 1;
  font-variant-numeric: tabular-nums;
}
```

**3. Usage in React Components**
```tsx
// Headings - Noto Serif Light 300
<h1 className="font-serif text-[3.052rem] font-light leading-[1.2] tracking-[-0.02em]">
  Your Headline Here
</h1>

// Body - DM Sans Regular 400
<p className="font-sans text-[1rem] leading-relaxed">
  Your body text here
</p>

// Statistics - Noto Serif Light 300 with Tabular Numbers
<div className="font-serif text-[1.563rem] font-light font-tabular-nums">
  $28,500,000,000
</div>

// Buttons - DM Sans Bold 700
<button className="font-sans text-[1rem] font-bold px-6 py-3">
  Click Me
</button>
```

---

## 📝 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Feb 16, 2026 | Initial documentation - Full variable fonts implementation |

---

## ✅ Final Checklist for New Projects

When starting a new project with Design System VS 26:

1. [ ] Copy Google Fonts import to `/src/styles/fonts.css`
2. [ ] Copy CSS classes to `/src/styles/theme.css`
3. [ ] Verify single quotes in `font-variation-settings`
4. [ ] Test in DevTools (check Computed styles)
5. [ ] Create test component with all font weights
6. [ ] Compare with Google Fonts preview
7. [ ] Test tabular numbers alignment
8. [ ] Verify across Chrome, Firefox, Safari
9. [ ] Document any project-specific customizations
10. [ ] Share this guide with team members

---

**Document Owner:** Design System Team  
**Last Updated:** February 16, 2026  
**Status:** ✅ Production Ready  
**Questions?** Contact design system maintainers
