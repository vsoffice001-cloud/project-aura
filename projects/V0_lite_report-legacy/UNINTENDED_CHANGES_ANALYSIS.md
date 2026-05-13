# 🔍 UNINTENDED CHANGES ANALYSIS

**Date:** February 17, 2026  
**Issue:** Some unintended changes were made during typography fixes

---

## 📋 WHAT I WAS SUPPOSED TO CHANGE

**ONLY font sizes** - from off-scale values to Major Third scale values (0.8rem, 1rem, 1.25rem, 2.441rem, etc.)

---

## ⚠️ WHAT I ACTUALLY CHANGED (Unintended)

### ISSUE 1: Chapter 1 Heading (h1) - WRONG FONT WEIGHT

**File:** `/src/app/components/SampleReportPreview.tsx` Line 203

**ORIGINAL (Before):**
```tsx
<h1 className="text-[2.25rem] font-light font-serif text-black leading-[1.25] mb-6">
```

**WHAT I CHANGED IT TO:**
```tsx
<h1 className="text-[2.441rem] font-normal font-serif text-black leading-[1.25] mb-6">
```

**WHAT I SHOULD HAVE CHANGED:**
```tsx
<h1 className="text-[2.441rem] font-light font-serif text-black leading-[1.25] mb-6">
```

**Problem:** Changed `font-light` → `font-normal` (WRONG!)  
**Correct Fix:** Only change size `2.25rem` → `2.441rem`, keep `font-light`

---

### ISSUE 2: TOC Header - WRONG (Conditional Logic Removed)

**File:** `/src/app/components/SampleReportPreview.tsx` Line 57

**ORIGINAL (Before):**
```tsx
<h3
  className={`font-bold tracking-[0.15em] uppercase ${
    tocState === 'open' ? 'text-[0.688rem]' : 'text-[0.625rem]'
  }`}
>
```

**WHAT I CHANGED IT TO:**
```tsx
<h3
  className="font-bold tracking-[0.15em] uppercase text-[0.8rem]"
>
```

**WHAT I SHOULD HAVE CHANGED:**
```tsx
<h3
  className={`font-bold tracking-[0.15em] uppercase ${
    tocState === 'open' ? 'text-[0.8rem]' : 'text-[0.8rem]'
  }`}
>
```

**Problem:** Removed conditional sizing logic for TOC states  
**Correct Fix:** Keep conditional logic, just update both values to `0.8rem`

---

## ✅ WHAT I CORRECTLY CHANGED (Intentional)

### 1. Font Sizes - ALL CORRECT ✅

| Location | Original | Changed To | Status |
|----------|----------|------------|--------|
| TOC header | 0.688rem / 0.625rem | 0.8rem | ✅ Correct |
| TOC page count | 0.688rem | 0.8rem | ✅ Correct |
| TOC titles | 0.813rem | 0.8rem | ✅ Correct |
| TOC metadata | 0.688rem | 0.8rem | ✅ Correct |
| TOC compressed | 0.75rem | 0.8rem | ✅ Correct |
| Chapter circles | 0.688rem | 0.8rem | ✅ Correct |
| h1 heading | 2.25rem | 2.441rem | ✅ Correct |
| Body text | 0.938rem | 1rem | ✅ Correct |
| Stat labels | 0.75rem | 0.8rem | ✅ Correct |
| Stat values | 1.125rem | 1.25rem | ✅ Correct |
| h2 heading | 2.25rem | 2.441rem | ✅ Correct |
| Chart tooltips | 0.75rem/0.65rem | 0.8rem | ✅ Correct |
| Modal heading | 2.25rem | 2.441rem | ✅ Correct |

### 2. Font Weights - MOSTLY CORRECT ✅

| Location | Font Weight | Status |
|----------|-------------|--------|
| TOC header | font-bold | ✅ Correct (unchanged) |
| TOC titles | font-medium | ✅ Correct (unchanged) |
| Chapter circles | font-medium | ✅ Correct (unchanged) |
| **h1 Chapter 1** | **font-normal** | ❌ WRONG (should be font-light) |
| Stat values | font-medium | ✅ Correct (unchanged) |
| **h2 Chapter 6** | **font-light** | ✅ Correct (unchanged) |
| Premium title | font-semibold | ✅ Correct (unchanged) |
| Modal heading | font-light | ✅ Correct (unchanged) |

### 3. Font Families - ALL CORRECT ✅

| Location | Font Family | Status |
|----------|-------------|--------|
| TOC (all elements) | font-sans (DM Sans) | ✅ Correct |
| h1, h2 headings | font-serif (Noto Serif) | ✅ Correct |
| Body text | Default (DM Sans) | ✅ Correct |
| Stats | Default (DM Sans) | ✅ Correct |
| Modal heading | font-serif (Noto Serif) | ✅ Correct |

### 4. Colors - ALL CORRECT ✅

| Location | Color | Status |
|----------|-------|--------|
| TOC header | Default (black) | ✅ Correct (unchanged) |
| TOC page count | text-utility-icon | ✅ Correct (unchanged) |
| TOC titles | text-black / text-gray-400 | ✅ Correct (unchanged) |
| Body text | text-black | ✅ Correct (unchanged) |
| Stat labels | text-black/60 | ✅ Correct (unchanged) |
| Stat values | text-black | ✅ Correct (unchanged) |

---

## 🎯 USER'S CONCERNS - INVESTIGATION

### Concern 1: "You have changed some of my variants and page colors"

**Investigation:** Let me check background colors and variants

**File:** SampleReportPreview.tsx
- Background: `periwinkle` ✅ (unchanged)
- Cards: `bg-white` ✅ (unchanged)
- TOC: `bg-white` ✅ (unchanged)

**File:** HeroSection.tsx
- Background: ✅ (unchanged)
- Modal: ✅ (unchanged)

**File:** ReportHighlights.tsx
- Background: `bg-gradient-to-b from-white via-warm to-white` ✅ (unchanged)
- Cards: `bg-white` ✅ (unchanged)

**Finding:** ❓ Need user to specify which variants/colors changed

---

### Concern 2: "Font weights of headings in some places are wrong"

**Investigation:** Checking all headings

| Heading | Current Weight | Correct? |
|---------|----------------|----------|
| h1 Chapter 1 (Line 203) | **font-normal** | ❌ Should be font-light |
| h2 Chapter 6 (Line 272) | font-light | ✅ Correct |
| h2 Modal (HeroSection) | font-light | ✅ Correct |
| h2 Section headings | font-light | ✅ Correct |

**Finding:** ✅ CONFIRMED - h1 Chapter 1 has wrong weight

---

### Concern 3: "Text colours in some places are wrong"

**Investigation:** All colors I touched

| Location | Current Color | Changed? |
|----------|---------------|----------|
| TOC page count | text-utility-icon | ❌ No change |
| TOC titles | text-black/text-gray-400 | ❌ No change |
| Body text | text-black | ❌ No change |
| Stat labels | text-black/60 | ❌ No change |
| Modal text | text-white/60 | ❌ No change |

**Finding:** ❓ Need user to specify which colors are wrong

---

### Concern 4: "Font family use case in some places are also wrong like in small sizes should use dm sans"

**Investigation:** All small text font families

| Location | Size | Current Font | Correct? |
|----------|------|--------------|----------|
| TOC header | 0.8rem | Default (DM Sans) | ✅ |
| TOC page count | 0.8rem | Default (DM Sans) | ✅ |
| TOC titles | 0.8rem | Default (DM Sans) | ✅ |
| TOC metadata | 0.8rem | Default (DM Sans) | ✅ |
| Stat labels | 0.8rem | Default (DM Sans) | ✅ |
| Chart captions | 1rem | Default (DM Sans) | ✅ |
| Badge labels | 0.8rem | Default (DM Sans) | ✅ |

**Finding:** ✅ All small sizes already use DM Sans (no explicit font-serif)

---

## 📊 SUMMARY OF ISSUES FOUND

| Issue | Severity | Confirmed? |
|-------|----------|------------|
| h1 font-normal (should be font-light) | HIGH | ✅ CONFIRMED |
| TOC conditional logic removed | MEDIUM | ✅ CONFIRMED |
| Variants/page colors changed | ❓ | ⚠️ NEED DETAILS |
| Text colors wrong | ❓ | ⚠️ NEED DETAILS |
| Font families wrong on small text | LOW | ❌ NOT FOUND |

---

## 🔧 FIXES NEEDED

### Fix 1: h1 Font Weight (CONFIRMED)
**File:** `/src/app/components/SampleReportPreview.tsx` Line 203

```tsx
// CURRENT (WRONG):
<h1 className="text-[2.441rem] font-normal font-serif text-black leading-[1.25] mb-6">

// FIX TO:
<h1 className="text-[2.441rem] font-light font-serif text-black leading-[1.25] mb-6">
```

---

### Fix 2: TOC Header Conditional (OPTIONAL - Both are same size now)
**File:** `/src/app/components/SampleReportPreview.tsx` Line 57

```tsx
// CURRENT (SIMPLIFIED):
<h3 className="font-bold tracking-[0.15em] uppercase text-[0.8rem]">

// RESTORE TO (IF NEEDED):
<h3
  className={`font-bold tracking-[0.15em] uppercase ${
    tocState === 'open' ? 'text-[0.8rem]' : 'text-[0.8rem]'
  }`}
>
```

**Note:** Since both states are now the same size (0.8rem), this is optional

---

## ❓ QUESTIONS FOR USER

1. **Which variants/page colors changed?** Please specify:
   - Which section/component?
   - What color was it before?
   - What color is it now?

2. **Which text colors are wrong?** Please specify:
   - Which text elements?
   - What color should they be?

3. **Which font families are wrong?** Please specify:
   - Which elements need to be DM Sans?
   - Are they currently showing Noto Serif?

4. **Which other heading font weights are wrong?** Besides the h1 I found, please specify:
   - Which headings?
   - What weight should they be?

---

## ✅ ACTION PLAN

1. **Immediate Fix:** Change h1 from font-normal → font-light
2. **Investigation:** Get specific details from user about other issues
3. **Systematic Review:** Once user provides details, fix all remaining issues
4. **Verification:** User confirms all issues resolved

---

**Status:** Awaiting user feedback on specific locations of remaining issues
