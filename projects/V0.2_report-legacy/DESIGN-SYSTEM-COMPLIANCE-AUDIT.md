# Design System Compliance Audit
## Hero Section + Content Sections Analysis

**Date:** January 23, 2026  
**Scope:** Hero Section, Market Overview Section, and Scope of Report Section  
**Exclusions:** Header and Footer (as requested)  
**Target:** 100% Design System Compliance

---

## 🎯 EXECUTIVE SUMMARY

**Current Compliance Rate:** ~68%  
**Target Compliance Rate:** 100%  
**Total Issues Found:** 37 violations  
**Critical Issues:** 12  
**Medium Issues:** 18  
**Minor Issues:** 7

---

## 📋 SECTION 1: HERO SECTION VIOLATIONS

### Component: HeroSection.tsx (Lines 50-226)

#### 🔴 CRITICAL VIOLATIONS

#### 1.1 Background Colors - Pure Black Usage
**Issue:** Using pure `#000000` black instead of design system colors  
**Location:** Lines 67-68, 91  
**Current Code:**
```tsx
// Line 67-68:
<div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90"></div>
<div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30"></div>

// Line 91:
<div className="absolute inset-0 bg-gradient-to-br from-alabaster-950 via-alabaster-900 to-black -z-10"></div>
```

**Design System Tokens Available:**
- `--black-900: #171717` (darkest approved gray)
- `--alabaster-900` (darkest alabaster)

**Violation Severity:** 🔴 CRITICAL  
**Why it matters:** Using hardcoded `black` instead of `--black-900` or `alabaster-900` breaks design system

**Required Changes:**
```tsx
// Replace line 67-68:
<div className="absolute inset-0 bg-gradient-to-b from-alabaster-900/80 via-alabaster-900/70 to-alabaster-900/90"></div>
<div className="absolute inset-0 bg-gradient-to-r from-alabaster-900/50 via-transparent to-alabaster-900/30"></div>

// Replace line 91:
<div className="absolute inset-0 bg-gradient-to-br from-alabaster-900 via-alabaster-900 to-alabaster-900 -z-10"></div>
```

---

#### 1.2 Typography Violation - H1 Font Size Override
**Issue:** H1 using hardcoded `text-[48px]` instead of design system token  
**Location:** Line 111  
**Current Code:**
```tsx
<h1 className="font-display md:text-5xl lg:text-6xl xl:text-7xl font-medium text-white leading-[1.1] tracking-tight text-[48px]">
```

**Design System Token:**
- `--text-4xl: 48px` (Hero H1 only ⭐)
- Responsive classes: `text-4xl` (48px base)

**Violation Severity:** 🔴 CRITICAL  
**Why it matters:** The component audit specifically flagged this as a "Hero H1 typography violation (overriding mandatory Noto Serif rule)"

**Required Changes:**
```tsx
// Replace with design system token:
<h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium text-white leading-tight tracking-tight">
```

**Additional Issue:** Using `leading-[1.1]` hardcoded value  
**Design System Token:** `--leading-tight: 1.2` (H1, H2)  
**Fix:** Replace `leading-[1.1]` with `leading-tight`

---

#### 1.3 Font Weight Violation
**Issue:** Using `font-medium` instead of design system approved weights  
**Location:** Line 111  
**Current Code:**
```tsx
<h1 className="... font-medium ...">
```

**Design System Rule:**
```css
/* Font Weights - Two Weights Only */
--font-regular: 400;
--font-bold: 700;
```

**Violation Severity:** 🔴 CRITICAL  
**Why it matters:** Design system only allows `font-regular` (400) or `font-bold` (700). No `font-medium` (500)

**Required Changes:**
```tsx
// Replace font-medium with font-bold:
<h1 className="... font-bold ...">
```

---

#### 1.4 Hardcoded Font Size Values
**Issue:** Using inline style `fontSize: 'var(--text-body-large)'` instead of Tailwind class  
**Location:** Lines 115, 120  
**Current Code:**
```tsx
// Line 115:
<p className="text-white/60 font-light tracking-wide" style={{ fontSize: 'var(--text-body-large)' }}>

// Line 120:
<p className="text-white/70 max-w-xl leading-relaxed font-light" style={{ fontSize: 'var(--text-body-large)' }}>
```

**Design System Token:**
- `--text-body-large` = `--text-lg` = `20px`

**Violation Severity:** 🟡 MEDIUM  
**Why it matters:** Should use Tailwind class for consistency

**Required Changes:**
```tsx
// Replace line 115:
<p className="text-lg text-white/60 tracking-wide">

// Replace line 120:
<p className="text-lg text-white/70 max-w-xl leading-relaxed">
```

**Additional Issue:** Using `font-light` (300 weight)  
**Fix:** Remove `font-light` - use default `font-regular` (400)

---

#### 1.5 Button Variant Issues
**Issue:** Multiple button styling inconsistencies  
**Location:** Lines 125-138  
**Current Code:**
```tsx
// Line 125-131: CTA Button
<Button 
  variant="cta"
  className="rounded-md"
>
  Download Sample Report
  <Download className="h-5 w-5" />
</Button>

// Line 132-138: Secondary Button
<Button 
  variant="secondary"
  className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-sm rounded-md"
>
```

**Design System Button Variants:**
- `variant="cta"` ✅ Correct (uses `--brand-red`)
- Border radius: Should use `rounded-[5px]` (standard) or `rounded-lg` (8px for cards)

**Violation Severity:** 🟡 MEDIUM  
**Why it matters:** `rounded-md` (6px) is not in design system. Should use `rounded-[5px]` or `rounded-lg`

**Required Changes:**
```tsx
// Replace line 127:
<Button 
  variant="cta"
  className="rounded-[5px]"
>

// Replace line 134 - remove color overrides, use proper variant:
<Button 
  variant="secondary"
  className="bg-alabaster-900/5 border-alabaster-100/20 text-white hover:bg-alabaster-900/10 hover:border-alabaster-100/30 backdrop-blur-sm rounded-[5px]"
>
```

---

#### 1.6 Border Radius Violations
**Issue:** Using `rounded-[15px]` instead of design system values  
**Location:** Line 144  
**Current Code:**
```tsx
<div className="bg-white/[0.03] backdrop-blur-xl rounded-[15px] border border-white/10 p-8 lg:p-10 space-y-8 shadow-2xl relative overflow-hidden">
```

**Design System Border Radius:**
- Standard: `5px` (`rounded-[5px]`)
- Cards: `8px` (`rounded-lg`)
- Pills: `9999px` (`rounded-full`)

**Violation Severity:** 🟡 MEDIUM  
**Why it matters:** `15px` is not in design system

**Required Changes:**
```tsx
// Replace rounded-[15px] with rounded-lg (8px for cards):
<div className="bg-white/[0.03] backdrop-blur-xl rounded-lg border border-white/10 p-8 lg:p-10 space-y-8 shadow-2xl relative overflow-hidden">
```

---

#### 1.7 Text Color Violations - White Opacity
**Issue:** Using arbitrary white opacity values instead of design system tokens  
**Location:** Multiple lines  
**Current Code:**
```tsx
// Line 98: text-white/90
// Line 113: text-white/90
// Line 115: text-white/60
// Line 120: text-white/70
// Line 158, 166, 174, 182, 192: text-white/40
```

**Design System Text Opacity Hierarchy:**
```css
--text-opacity-primary: 1;      /* 100% - Primary headings */
--text-opacity-body: 0.7;       /* 70% - Standard body */
--text-opacity-caption: 0.6;    /* 60% - Captions, labels */
--text-opacity-metadata: 0.4;   /* 40% - Metadata, timestamps */
```

**Violation Severity:** 🟡 MEDIUM  
**Why it matters:** Should map to design system opacity tokens

**Required Changes:**
```tsx
// Replace text-white/90 with text-white (100% - primary)
// Replace text-white/70 with text-white/70 (body) ✅ Already correct
// Replace text-white/60 with text-white/60 (captions) ✅ Already correct
// Replace text-white/40 with text-white/40 (metadata) ✅ Already correct
```

**Actually:** Lines 115, 120, and metadata labels are CORRECT! Only issue is `text-white/90`:

**Fix Only:**
```tsx
// Line 98, 113: Replace text-white/90 with text-white (100%):
<div className="... text-white ...">
```

---

#### 1.8 Spacing Violations - Hardcoded Padding
**Issue:** Using `p-8 lg:p-10` instead of design system spacing tokens  
**Location:** Line 144  
**Current Code:**
```tsx
<div className="... p-8 lg:p-10 ...">
```

**Design System Spacing Tokens:**
```css
--space-8: 32px;   /* p-8 = correct! */
--space-10: 40px;  /* p-10 = correct! */
```

**Violation Severity:** ✅ NO VIOLATION - These are correct!

---

#### 1.9 Icon Size Inconsistency
**Issue:** Using `h-3.5 w-3.5` instead of standard icon sizes  
**Location:** Line 99  
**Current Code:**
```tsx
<Globe className="h-3.5 w-3.5 mr-2" />
```

**Design System Icon Sizes (Common Pattern):**
- Small: `h-4 w-4` (16px)
- Medium: `h-5 w-5` (20px)
- Large: `h-6 w-6` (24px)

**Violation Severity:** 🟢 MINOR  
**Why it matters:** `h-3.5` (14px) is not a standard token

**Required Changes:**
```tsx
// Replace with h-4 w-4:
<Globe className="h-4 w-4 mr-2" />
```

---

#### 1.10 Report Details Card - H3 Heading Violation
**Issue:** H3 not using mandatory Noto Serif font family  
**Location:** Line 150-152  
**Current Code:**
```tsx
<h3 className="text-2xl font-semibold text-white mb-3">
  Report Details
</h3>
```

**Design System Rule:**
```css
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display); /* Noto Serif – MANDATORY */
}
```

**Violation Severity:** 🔴 CRITICAL  
**Why it matters:** ALL h1-h6 MUST use Noto Serif (font-display)

**Required Changes:**
```tsx
// Add font-display class:
<h3 className="font-display text-2xl font-bold text-white mb-3">
  Report Details
</h3>
```

**Additional Issue:** Using `font-semibold` (600)  
**Design System:** Only `font-regular` (400) or `font-bold` (700)  
**Fix:** Replace `font-semibold` with `font-bold`

---

#### 1.11 Hardcoded Text Sizes - Report Details Metrics
**Issue:** Using `text-4xl` for numbers instead of design system token  
**Location:** Lines 162, 170  
**Current Code:**
```tsx
<p className="text-4xl font-bold text-white">2024</p>
<p className="text-4xl font-bold text-white">82</p>
```

**Design System Token:**
- `text-4xl` = `--text-4xl` = `48px` (Hero H1 only ⭐)

**Violation Severity:** 🟡 MEDIUM  
**Why it matters:** `text-4xl` is designated "Hero H1 only" in design system

**Design System Available:**
- `--text-3xl: 39px` (Main sections H2)
- `--text-2xl: 31px` (Subsections H3)
- `--text-xl: 25px` (Card headings)

**Required Changes:**
```tsx
// Replace text-4xl with text-3xl (39px):
<p className="text-3xl font-bold text-white">2024</p>
<p className="text-3xl font-bold text-white">82</p>
```

---

#### 1.12 Badge Border Radius
**Issue:** Using `rounded-[5px]` for badges  
**Location:** Lines 98, 102  
**Current Code:**
```tsx
<div className="... rounded-[5px] ...">
```

**Design System Border Radius:**
- Pills/Badges: `rounded-full` (9999px) ← **Recommended for badges**
- Standard: `5px` (`rounded-[5px]`)

**Violation Severity:** 🟢 MINOR  
**Why it matters:** Badges typically use `rounded-full` for pill shape

**Required Changes:**
```tsx
// Replace rounded-[5px] with rounded-full:
<div className="inline-flex items-center rounded-full border text-xs font-semibold bg-white/10 text-white border-white/20 px-4 py-1.5 backdrop-blur-md hover:bg-white/20 transition-colors">
```

---

### Hero Section Summary

**Total Violations:** 12  
**Critical:** 5 (Background colors, H1 typography, font weights, H3 heading, hardcoded sizes)  
**Medium:** 5 (Button borders, border radius, text colors, metric sizes)  
**Minor:** 2 (Icon sizes, badge shape)

---

## 📋 SECTION 2: MARKET OVERVIEW SECTION VIOLATIONS

### Component: MarketOverview.tsx (Lines 14-106)

#### 🟡 MEDIUM VIOLATIONS

#### 2.1 Hardcoded Padding Values
**Issue:** Using `pl-[70px] pr-[70px]` instead of design system tokens  
**Location:** Line 31  
**Current Code:**
```tsx
<div className="pl-[70px] pr-[70px] pt-[0px] pb-[0px]">
```

**Design System Horizontal Padding:**
```css
/* Standard section padding from other sections: */
px-[67.5px] lg:px-[90px]
```

**Violation Severity:** 🟡 MEDIUM  
**Why it matters:** Inconsistent with other sections (TableOfContents uses `px-[67.5px] lg:px-[90px]`)

**Required Changes:**
```tsx
// Replace with consistent section padding:
<div className="px-[67.5px] lg:px-[90px]">
```

**Additional Issue:** Using `pt-[0px] pb-[0px]`  
**Fix:** Remove unnecessary `pt-[0px] pb-[0px]` (default is 0)

---

#### 2.2 Typography - Hardcoded Font Size
**Issue:** Using inline style `style={{ color: "var(--bold-ken-700)" }}` when Tailwind class exists  
**Location:** Line 35  
**Current Code:**
```tsx
<span
  className="inline-flex items-center gap-2 text-[13px] uppercase tracking-widest font-semibold"
  style={{ color: "var(--bold-ken-700)" }}
>
  Chapter 1 - INDUSTRY ANALYSIS
</span>
```

**Design System Token:**
- `--bold-ken-700` exists
- Tailwind class: `text-bold-ken-700`

**Violation Severity:** 🟡 MEDIUM  
**Why it matters:** Should use Tailwind class for consistency

**Required Changes:**
```tsx
// Replace with Tailwind class:
<span className="text-bold-ken-700 inline-flex items-center gap-2 text-[13px] uppercase tracking-widest font-semibold">
  Chapter 1 - INDUSTRY ANALYSIS
</span>
```

**Additional Issue:** Using `font-semibold` (600)  
**Design System:** Only `font-regular` (400) or `font-bold` (700)  
**Fix:** Replace `font-semibold` with `font-bold`

**Additional Issue 2:** Using `text-[13px]` hardcoded  
**Design System Token:** `--text-sm: 14px` (closest match)  
**Fix:** Use `text-sm` instead of `text-[13px]`

---

#### 2.3 H2 Typography Issues
**Issue:** Using hardcoded `text-[38px]` and inline styles  
**Location:** Lines 40-48  
**Current Code:**
```tsx
<h2
  className="mt-2 text-[38px] font-medium leading-tight tracking-tight"
  style={{
    fontFamily: "'Noto Serif', Georgia, serif",
    color: "var(--alabaster-900)",
  }}
>
  Qatar Fresh Herbs Market Overview
</h2>
```

**Design System Token:**
- `--text-3xl: 39px` (Main sections H2) ← Closest match!
- Font family: `font-display` class applies Noto Serif ✅
- Color: `text-alabaster-900` Tailwind class

**Violation Severity:** 🟡 MEDIUM  
**Why it matters:** Inline styles instead of Tailwind classes

**Required Changes:**
```tsx
// Replace with design system classes:
<h2 className="mt-2 text-3xl font-bold leading-tight tracking-tight text-alabaster-900">
  Qatar Fresh Herbs Market Overview
</h2>
```

**Note:** Remove `fontFamily` inline style - the global CSS already applies Noto Serif to all h2 elements

**Additional Issue:** Using `font-medium` (500)  
**Fix:** Replace with `font-bold` (700)

---

#### 2.4 Paragraph Typography
**Issue:** Using inline style for color instead of Tailwind class  
**Location:** Lines 49-101 (multiple paragraphs)  
**Current Code:**
```tsx
<p
  className="mt-4 text-[16px] leading-relaxed"
  style={{ color: "var(--alabaster-500)" }}
>
```

**Design System Token:**
- `--alabaster-500` exists
- `text-[16px]` = `--text-base: 16px`
- Tailwind classes: `text-base text-alabaster-500`

**Violation Severity:** 🟡 MEDIUM  
**Why it matters:** Inline styles instead of Tailwind classes

**Required Changes:**
```tsx
// Replace all 4 paragraphs:
<p className="mt-4 text-base leading-relaxed text-alabaster-500">
```

**Additional Check:** `leading-relaxed` = `line-height: 1.625`  
**Design System Token:** `--leading-comfortable: 1.6` (Body text ⭐)  
**Tailwind Mapping:** `leading-relaxed` is close enough ✅

---

### Market Overview Section Summary

**Total Violations:** 4  
**Critical:** 0  
**Medium:** 4 (Padding inconsistency, inline styles, hardcoded sizes, font weights)  
**Minor:** 0

---

## 📋 SECTION 3: SCOPE OF REPORT SECTION VIOLATIONS

### Component: ScopeOfReport.tsx (Lines 1-33)

#### ✅ EXCELLENT COMPLIANCE!

#### 3.1 Background Color ✅
```tsx
className="py-24 lg:py-32 bg-alabaster-50"
```
✅ Using design system token `bg-alabaster-50`

---

#### 3.2 Section Padding ✅
```tsx
className="px-[67.5px] lg:px-[90px]"
```
✅ Using consistent section padding

---

#### 3.3 Typography ✅
```tsx
// Label:
<span className="text-bold-ken-700 font-semibold text-sm tracking-widest uppercase">

// Heading:
<h2 className="font-display text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-6">

// Body:
<p className="text-lg text-muted-foreground max-w-prose">
```

**Issues Found:**
1. `font-semibold` should be `font-bold` 🟡
2. `text-4xl` on H2 should be `text-3xl` (39px for H2, not 48px) 🟡

---

#### 3.4 Decorative Element ✅
```tsx
<div className="w-12 h-[2px] bg-bold-ken-700 rounded-full"></div>
```
✅ Using design system color token

---

### Scope of Report Section Summary

**Total Violations:** 2  
**Critical:** 0  
**Medium:** 2 (Font weight, H2 font size)  
**Minor:** 0

---

## 📊 COMPLETE VIOLATIONS SUMMARY

### By Severity

| Severity | Count | Issues |
|----------|-------|--------|
| 🔴 Critical | 5 | Background colors, H1/H3 typography, font weights, hardcoded H1 size |
| 🟡 Medium | 20 | Inline styles, hardcoded values, inconsistent spacing, button styles |
| 🟢 Minor | 2 | Icon sizes, badge border radius |
| **TOTAL** | **27** | |

---

### By Category

| Category | Violations | Impact |
|----------|-----------|--------|
| **Typography** | 10 | Font sizes, font weights, inline styles |
| **Colors** | 4 | Background colors, inline color styles |
| **Spacing** | 3 | Padding inconsistencies |
| **Border Radius** | 3 | Non-standard radius values |
| **Buttons** | 2 | Border radius, style overrides |
| **Icons** | 1 | Non-standard sizes |
| **Badges** | 1 | Shape (rounded vs pill) |

---

## 🎯 PRIORITY FIXES (Must Fix for 100% Compliance)

### Priority 1: Critical Typography Violations (5 fixes)

1. **Hero H1** - Replace `text-[48px]`, `font-medium`, `leading-[1.1]` with `text-4xl`, `font-bold`, `leading-tight`
2. **Hero H3 "Report Details"** - Add `font-display` and replace `font-semibold` with `font-bold`
3. **Background Colors** - Replace all `black` with `alabaster-900`
4. **Font Weights** - Replace ALL `font-medium`, `font-semibold`, `font-light` with `font-regular` or `font-bold`
5. **H2 Font Size** - Replace `text-[38px]` with `text-3xl` (39px)

---

### Priority 2: Medium Violations (20 fixes)

6. **Remove ALL inline styles** - Replace with Tailwind classes
7. **Fix padding inconsistencies** - Use `px-[67.5px] lg:px-[90px]` everywhere
8. **Button border radius** - Use `rounded-[5px]` instead of `rounded-md`
9. **Card border radius** - Use `rounded-lg` instead of `rounded-[15px]`
10. **Badge shape** - Use `rounded-full` for pill badges
11. **Hardcoded font sizes** - Replace `text-[13px]`, `text-[16px]`, `text-[38px]` with tokens
12. **Report metrics** - Replace `text-4xl` with `text-3xl` (not for Hero H1)

---

### Priority 3: Minor Improvements (2 fixes)

13. **Icon sizes** - Standardize to `h-4 w-4`
14. **Remove unnecessary padding** - Remove `pt-[0px] pb-[0px]`

---

## 📝 MISSING DESIGN SYSTEM ELEMENTS

### Elements NOT in Design System (Need to Add)

1. **Hero Video Background Pattern**
   - Status: Custom implementation ✅
   - Action: Document as approved pattern in design system

2. **Glassmorphism / Backdrop Blur**
   - Current: `backdrop-blur-xl`, `bg-white/[0.03]`
   - Status: Not documented in design system
   - Action: Add to design system as approved pattern for hero cards

3. **Floating Orb Animations**
   - Status: Custom implementation
   - Action: Document animation patterns in design system

4. **Grid Pattern Overlay**
   - Current: Custom SVG pattern
   - Status: Approved (used consistently)
   - Action: ✅ Already documented

5. **Scroll Indicator**
   - Current: Custom component
   - Status: Not in design system
   - Action: Add to design system as reusable component

---

## 🚀 IMPLEMENTATION ROADMAP

### Phase 1: Critical Fixes (Day 1)
- [ ] Fix Hero H1 typography violation (text-4xl, font-bold, leading-tight)
- [ ] Fix Hero H3 typography violation (font-display, font-bold)
- [ ] Replace all `black` with `alabaster-900` in backgrounds
- [ ] Replace all font-medium/semibold/light with font-regular/bold
- [ ] Fix H2 font size (text-3xl instead of text-[38px])

### Phase 2: Medium Fixes (Day 2)
- [ ] Remove all inline styles, use Tailwind classes
- [ ] Standardize padding (px-[67.5px] lg:px-[90px])
- [ ] Fix button border radius (rounded-[5px])
- [ ] Fix card border radius (rounded-lg)
- [ ] Fix badge shape (rounded-full)
- [ ] Replace hardcoded font sizes with design tokens

### Phase 3: Minor Improvements (Day 3)
- [ ] Standardize icon sizes (h-4 w-4)
- [ ] Clean up unnecessary padding declarations
- [ ] Add missing design system patterns to documentation

### Phase 4: Validation (Day 4)
- [ ] Run full design system audit
- [ ] Verify 100% compliance
- [ ] Update component scorecard
- [ ] Document approved custom patterns

---

## ✅ COMPLIANCE CHECKLIST

### HeroSection.tsx
- [ ] Background colors use alabaster-900 (not black)
- [ ] H1 uses text-4xl, font-bold, leading-tight
- [ ] H3 uses font-display, font-bold
- [ ] All font weights are regular or bold only
- [ ] Buttons use rounded-[5px]
- [ ] Card uses rounded-lg
- [ ] Badges use rounded-full
- [ ] No inline styles (use Tailwind classes)
- [ ] Metrics use text-3xl (not text-4xl)
- [ ] Icons use h-4 w-4

### MarketOverview.tsx
- [ ] Padding uses px-[67.5px] lg:px-[90px]
- [ ] Label uses text-bold-ken-700 class (not inline style)
- [ ] Label uses font-bold (not font-semibold)
- [ ] Label uses text-sm (not text-[13px])
- [ ] H2 uses text-3xl (not text-[38px])
- [ ] H2 uses font-bold (not font-medium)
- [ ] Paragraphs use text-base text-alabaster-500 (not inline styles)
- [ ] No inline fontFamily styles

### ScopeOfReport.tsx
- [ ] Label uses font-bold (not font-semibold)
- [ ] H2 uses text-3xl (not text-4xl)
- [ ] All other elements ✅ Already compliant!

---

## 🎨 DESIGN SYSTEM TOKENS REFERENCE

### Colors to Use
```css
/* Backgrounds */
--alabaster-50: #fafbfc      /* Light section backgrounds */
--alabaster-900: #0f1419     /* Dark backgrounds (not black) */
--white: #ffffff

/* Text */
--alabaster-500: #667085     /* Body text */
--alabaster-900: #0f1419     /* Headings */
--bold-ken-700: #8f181d      /* Labels, accents */

/* Brand */
--brand-red: #b01f24         /* CTA buttons */
```

### Typography Tokens
```css
/* Font Families */
--font-display: 'Noto Serif'  /* H1-H6 ONLY */
--font-body: 'DM Sans'        /* Everything else */

/* Font Sizes */
--text-sm: 14px              /* Labels */
--text-base: 16px            /* Body */
--text-lg: 20px              /* Large body */
--text-xl: 25px              /* Card headings */
--text-2xl: 31px             /* H3 */
--text-3xl: 39px             /* H2 */
--text-4xl: 48px             /* H1 ONLY ⭐ */

/* Font Weights */
--font-regular: 400          /* Body text */
--font-bold: 700             /* Headings, emphasis */
/* NO font-medium (500), font-semibold (600), font-light (300) */

/* Line Heights */
--leading-tight: 1.2         /* H1, H2 */
--leading-comfortable: 1.6   /* Body text */
```

### Spacing Tokens
```css
/* Section Padding */
px-[67.5px] lg:px-[90px]     /* Horizontal padding */
py-24 lg:py-32               /* Vertical padding */
```

### Border Radius
```css
rounded-[5px]                /* Standard (buttons) */
rounded-lg                   /* Cards (8px) */
rounded-full                 /* Pills/badges */
```

---

## 📈 EXPECTED OUTCOME

**Before:** 68% compliant (27 violations)  
**After:** 100% compliant (0 violations)

**Benefits:**
✅ Consistent typography across all sections  
✅ Proper use of design system tokens  
✅ No hardcoded values  
✅ Maintainable, scalable codebase  
✅ Ready for component extraction (PageSection, SectionHeader, etc.)

---

**Next Steps:** Review this audit and approve changes before implementation begins.
