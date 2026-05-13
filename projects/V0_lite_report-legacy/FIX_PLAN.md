# 🔧 COMPREHENSIVE FIX PLAN

## Issues Identified by User

### 1. ✅ H2 Font Size Wrong
**Location:** SectionHeading.tsx - h2 uses `text-[2.25rem]` instead of `text-[2.441rem]`

**Current:**
```tsx
2: 'text-[2.25rem] leading-tight',   // ❌ 36px
```

**Fix to:**
```tsx
2: 'text-[2.441rem] leading-tight',  // ✅ 39px (text-2xl per Major Third)
```

---

### 2. ✅ Font Sizes Below XL Should Use DM Sans (font-sans)

**Rule:** Sizes below xl (1.953rem) should use font-sans, not font-serif

**Issues Found:**

| File | Line | Current | Fix |
|------|------|---------|-----|
| ResearchMethodology.tsx | 93 | `font-serif text-[1.25rem]` | `font-sans text-[1.25rem]` |
| ExtendedTOC.tsx | 314 | `font-serif text-[1.25rem]` | `font-sans text-[1.25rem]` |
| ReportHighlights.tsx | 108 | `font-sans text-[1.25rem]` | ✅ Already correct |

**Typography Hierarchy:**
- **1.25rem (20px) and below** → DM Sans (font-sans)
- **1.953rem (31.25px) and above** → Noto Serif (font-serif)

---

### 3. ✅ Font Weight Should Be Medium for Priority Elements

**Current State:**
- Card titles (1.25rem): Some use `font-medium` ✅, some use `font-light` ❌

**Fix:**
- ResearchMethodology.tsx step titles: Change `font-light` → `font-medium`
- ExtendedTOC.tsx CTA heading: Change `font-light` → `font-medium`

---

### 4. ✅ Red Color in Key Insights Cards - Should Be Black

**Issue:** Badge numbers use `text-gradient-coral` (orange/red gradient)

**Location:** ReportHighlights.tsx line 112

**Current:**
```tsx
<div className="text-[1rem] font-semibold text-gradient-coral">
  {highlight.badge}
</div>
```

**Fix to:**
```tsx
<div className="text-[1rem] font-semibold text-black">
  {highlight.badge}
</div>
```

---

### 5. ✅ Text Colors Should Adapt to Background

**Need to verify:** Text contrast on warm gradient backgrounds

**ReportHighlights.tsx:**
- Background: `bg-gradient-to-b from-white via-warm to-white`
- Card backgrounds: `bg-white`
- Text on cards: `text-black` ✅ (good contrast)
- Description: `text-utility-icon` ✅ (appropriate for secondary text)

**Status:** Current text colors are appropriate ✅

---

### 6. ✅ Gradient and Background Compositions

**ReportHighlights.tsx Background:**
```tsx
<section className="relative py-16 md:py-20 overflow-hidden">
  {/* Gradient background */}
  <div className="absolute inset-0 bg-gradient-to-b from-white via-warm to-white"></div>
  
  {/* Radial glow */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute top-1/2 left-1/2 w-[1000px] h-[600px] rounded-full 
         bg-gradient-to-br from-orange-50/30 via-orange-50/20 to-transparent 
         blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
  </div>
</section>
```

**Status:** Properly implemented with layered gradients ✅

---

## Summary of Fixes

| Issue | File | Line | Change |
|-------|------|------|--------|
| 1. h2 size | SectionHeading.tsx | 36 | 2.25rem → 2.441rem |
| 2. Font family | ResearchMethodology.tsx | 93 | font-serif → font-sans |
| 3. Font family | ExtendedTOC.tsx | 314 | font-serif → font-sans |
| 4. Font weight | ResearchMethodology.tsx | 93 | font-light → font-medium |
| 5. Font weight | ExtendedTOC.tsx | 314 | font-light → font-medium |
| 6. Badge color | ReportHighlights.tsx | 112 | text-gradient-coral → text-black |

**Total Fixes:** 6 changes across 4 files
