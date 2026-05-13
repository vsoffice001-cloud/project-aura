# 🔧 COMPREHENSIVE FIX PLAN - Phase 2

## Issues to Fix

### 1. ✅ H2 Font Size Inconsistency
**Files with incorrect h2 (text-[2.25rem]):**
- ExtendedTOC.tsx - Line 128
- SlideshowSection.tsx - Line 200  
- BannerSection.tsx - Line 124

**Fix:** Change all from `text-[2.25rem]` → `text-[2.441rem]`

---

### 2. ✅ Apply Research Methodology Card Styling

**Research Methodology Card Properties:**
```tsx
<Card
  variant="white"           // bg-white border border-[#e5e5e5]
  padding="md"              // p-6
  shadow="sm"               // shadow-[0_1px_2px_rgba(0,0,0,0.05)]
  hover={true}              // hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.15)] hover:-translate-y-0.5
  className="..."
/>
```

**Apply to:**

#### A. Key Insights Cards (ReportHighlights.tsx)
**Current styling:**
```tsx
className="group bg-white rounded-[12px] p-6 border border-orange-200/60 shadow-sm 
  hover:shadow-md hover:border-orange-100/80 hover:-translate-y-1 
  transition-all duration-300"
```

**Change to:**
```tsx
className="group bg-white rounded-[10px] p-6 border border-[#e5e5e5] 
  shadow-[0_1px_2px_rgba(0,0,0,0.05)]
  hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.15)] hover:-translate-y-0.5
  transition-all duration-300"
```

**Changes:**
- Border radius: 12px → 10px
- Border color: orange-200/60 → #e5e5e5 (neutral)
- Shadow: sm → specific shadow values
- Hover translate: -translate-y-1 → -translate-y-0.5

#### B. Extended TOC Phase Cards (ExtendedTOC.tsx)
**Current styling:**
```tsx
className="rounded-[10px] border border-[#c3c6f9]/20 bg-white
  shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
```

**Change to:**
```tsx
className="rounded-[10px] border border-[#e5e5e5] bg-white
  shadow-[0_1px_2px_rgba(0,0,0,0.05)]
  hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.15)] hover:-translate-y-0.5
  transition-all duration-300 overflow-hidden"
```

**Changes:**
- Border color: #c3c6f9]/20 → #e5e5e5 (neutral)
- Shadow: specific values
- Add hover translate

---

### 3. ✅ Fix Hero Section

#### A. Hero Heading Font (h1)
**Current:** Correct at text-[3.052rem] ✅

#### B. Hero Gradient Issues
**Problem:** Light variant backgrounds not prominently visible

**Current Light Variant:**
```tsx
background: "bg-gradient-to-br from-white via-gray-50 to-gray-100"
```

**Glows are correct but need more prominence**

#### C. Restore Highlighting Background Compositions
**User says:** "correctly implement the hero section light variants highlighting background compositions that you removed"

**Need to enhance light variant glows for better visibility:**
- Increase opacity values
- Make periwinkle and orange glows more prominent
- Add central highlighting effect

---

## Detailed Changes

### File 1: ExtendedTOC.tsx
**Changes:**
1. Line 128: h2 size 2.25rem → 2.441rem
2. Phase cards border and shadow

### File 2: SlideshowSection.tsx
**Changes:**
1. Line 200: h2 size 2.25rem → 2.441rem

### File 3: BannerSection.tsx
**Changes:**
1. Line 124: h2 size 2.25rem → 2.441rem

### File 4: ReportHighlights.tsx
**Changes:**
1. Card styling to match Research Methodology

### File 5: heroThemes.ts
**Changes:**
1. Enhance light variant background composition
2. Increase glow opacity and prominence

---

## Summary

| Issue | Files Affected | Changes |
|-------|---------------|---------|
| H2 size inconsistency | 3 files | 2.25rem → 2.441rem |
| Card styling | 2 files | Apply Research card style |
| Hero light variant | 1 file | Enhance background glows |

**Total:** 6 files, ~15 specific changes
