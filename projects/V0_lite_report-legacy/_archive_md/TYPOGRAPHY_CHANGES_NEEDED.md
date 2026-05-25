# 📍 Typography Changes Needed - Detailed Location Guide

**Date:** February 17, 2026  
**Status:** Ready for review and decision

---

## 📊 SUMMARY

**Total Changes Needed:** 30+ instances across 5 files  
**Files Impacted:** 5 component files  
**Current Compliance:** 60% on-scale  
**Target Compliance:** 100% Major Third scale

---

## 🎯 CHANGE BREAKDOWN BY PRIORITY

### Priority 1: CRITICAL - Accessibility Issues (Too Small)
**Count:** 2 instances  
**Issue:** Text below 12px minimum (WCAG concern)

### Priority 2: HIGH - Inconsistent TOC & Labels  
**Count:** 8 instances  
**Issue:** Multiple off-scale sizes in navigation

### Priority 3: MEDIUM - Section Headings
**Count:** 3 instances  
**Issue:** h2 headings using wrong scale size

### Priority 4: MEDIUM - Body Text
**Count:** 3 instances  
**Issue:** Body text using 15px instead of 16px

### Priority 5: LOW - Card Titles
**Count:** 6 instances  
**Issue:** Card titles using 18px instead of 20px

### Priority 6: LOW - Metadata Labels
**Count:** 4 instances  
**Issue:** Small labels using 12px instead of 12.8px

### Priority 7: CLEANUP - Redundant Declarations
**Count:** 3-4 instances  
**Issue:** Unnecessary `font-sans` on buttons

---

## 📁 FILE 1: `/src/app/components/SampleReportPreview.tsx`

### Location 1 - TOC Header (Lines 58-64)
**Priority:** Priority 1 (CRITICAL - Too Small)

**Current Code:**
```tsx
<h3
  className={`font-bold tracking-[0.15em] uppercase ${
    tocState === 'open' ? 'text-[0.688rem]' : 'text-[0.625rem]'  // ❌ 11px / 10px
  }`}
>
  TABLE OF CONTENTS
</h3>
{tocState === 'open' && (
  <span className="text-[0.688rem] text-utility-icon">165 pages</span>  // ❌ 11px
)}
```

**Recommended Fix:**
```tsx
<h3
  className={`font-bold tracking-[0.15em] uppercase text-[0.8rem]`}  // ✅ 12.8px (text-xs)
>
  TABLE OF CONTENTS
</h3>
{tocState === 'open' && (
  <span className="text-[0.8rem] text-utility-icon">165 pages</span>  // ✅ 12.8px
)}
```

**Impact:**
- Improves accessibility (10px → 12.8px)
- Consistent scale usage
- Simplifies responsive logic (no conditional sizing)

**Visual Change:** Slightly larger TOC header (barely noticeable, ~2.8px difference)

---

### Location 2 - TOC Item Title (Line 98)
**Priority:** Priority 2 (HIGH - Inconsistent TOC)

**Current Code:**
```tsx
<span
  className={`text-[0.813rem] leading-[1.4] ${  // ❌ 13px (off-scale)
    item.unlocked || item.number === activeChapter
      ? 'text-black font-medium'
      : 'text-gray-400'
  }`}
>
  {item.title}
</span>
```

**Recommended Fix - Option A (Smaller):**
```tsx
<span
  className={`text-[0.8rem] leading-[1.4] ${  // ✅ 12.8px (text-xs)
    item.unlocked || item.number === activeChapter
      ? 'text-black font-medium'
      : 'text-gray-400'
  }`}
>
```

**Recommended Fix - Option B (Larger):**
```tsx
<span
  className={`text-[1rem] leading-[1.4] ${  // ✅ 16px (text-sm)
    item.unlocked || item.number === activeChapter
      ? 'text-black font-medium'
      : 'text-gray-400'
  }`}
>
```

**Decision Needed:** Should TOC titles be small (12.8px) or standard body size (16px)?

**Visual Change:** -0.2px (Option A) or +3px (Option B)

---

### Location 3 - TOC Metadata (Line 107)
**Priority:** Priority 2 (HIGH - Inconsistent TOC)

**Current Code:**
```tsx
<div className="flex items-center gap-2 text-[0.688rem]">  // ❌ 11px
  <span className="text-gray-400">Pages {item.pages}</span>
  <span className="text-gray-400">•</span>
  <span className="text-gray-400">{item.time}</span>
</div>
```

**Recommended Fix:**
```tsx
<div className="flex items-center gap-2 text-[0.8rem]">  // ✅ 12.8px (text-xs)
  <span className="text-gray-400">Pages {item.pages}</span>
  <span className="text-gray-400">•</span>
  <span className="text-gray-400">{item.time}</span>
</div>
```

**Impact:** Consistent metadata sizing across TOC

**Visual Change:** +1.8px (very subtle)

---

### Location 4 - TOC Compressed State (Line 118)
**Priority:** Priority 2 (HIGH - Inconsistent TOC)

**Current Code:**
```tsx
<span
  className={`text-[0.75rem] leading-[1.4] line-clamp-2 ${  // ❌ 12px
    item.unlocked || item.number === activeChapter
      ? 'text-black'
      : 'text-gray-400'
  }`}
>
  {item.title}
</span>
```

**Recommended Fix:**
```tsx
<span
  className={`text-[0.8rem] leading-[1.4] line-clamp-2 ${  // ✅ 12.8px (text-xs)
    item.unlocked || item.number === activeChapter
      ? 'text-black'
      : 'text-gray-400'
  }`}
>
```

**Impact:** Consistent compressed TOC sizing

**Visual Change:** +0.8px (very subtle)

---

### Location 5 - TOC CTA Text (Line 136)
**Priority:** Priority 6 (LOW - Metadata)

**Current Code:**
```tsx
<p className="text-[0.75rem] text-utility-icon mb-3 leading-[1.5]">  // ❌ 12px
  165+ pages of comprehensive market analysis
</p>
```

**Recommended Fix:**
```tsx
<p className="text-[0.8rem] text-utility-icon mb-3 leading-[1.5]">  // ✅ 12.8px (text-xs)
  165+ pages of comprehensive market analysis
</p>
```

**Impact:** Consistent caption sizing

**Visual Change:** +0.8px (very subtle)

---

### Location 6 - Chapter Navigation Circles (Line 168)
**Priority:** Priority 2 (HIGH - Inconsistent TOC)

**Current Code:**
```tsx
<div
  className={`w-7 h-7 rounded-full flex items-center justify-center text-[0.688rem] font-medium  // ❌ 11px
    transition-all duration-200 cursor-pointer
    ${...}`}
>
  {item.number}
</div>
```

**Recommended Fix:**
```tsx
<div
  className={`w-7 h-7 rounded-full flex items-center justify-center text-[0.8rem] font-medium  // ✅ 12.8px
    transition-all duration-200 cursor-pointer
    ${...}`}
>
```

**Impact:** Chapter numbers more legible in navigation circles

**Visual Change:** +1.8px (slightly more prominent numbers)

---

### Location 7 - Chapter 1 Heading (Line 205)
**Priority:** Priority 3 (MEDIUM - Section Headings)

**Current Code:**
```tsx
<h1 className="text-[2.25rem] font-normal font-serif text-black leading-[1.25] mb-6">  // ❌ 36px
  Qatar Fresh Herbs Market Overview
</h1>
```

**Recommended Fix:**
```tsx
<h1 className="text-[2.441rem] font-normal font-serif text-black leading-[1.25] mb-6">  // ✅ 39px (text-2xl)
  Qatar Fresh Herbs Market Overview
</h1>
```

**Impact:** Proper h1 hierarchy (should be text-2xl per design system)

**Visual Change:** +3px larger heading (more prominent, better hierarchy)

---

### Location 8 - Chapter 1 Body Text (Line 210)
**Priority:** Priority 4 (MEDIUM - Body Text)

**Current Code:**
```tsx
<div className="space-y-4 text-[0.938rem] text-black leading-[1.7]">  // ❌ 15px
  <p>The Qatar Fresh Herbs Market is valued at $150 million...</p>
  ...
</div>
```

**Recommended Fix:**
```tsx
<div className="space-y-4 text-[1rem] text-black leading-[1.7]">  // ✅ 16px (text-sm)
  <p>The Qatar Fresh Herbs Market is valued at $150 million...</p>
  ...
</div>
```

**Impact:** Standard body text size (16px is industry standard)

**Visual Change:** +1px larger body text (better readability)

---

### Location 9 - Stat Cards Label (Lines 239, 247, 255)
**Priority:** Priority 6 (LOW - Metadata)

**Current Code:**
```tsx
<p className="text-[0.75rem] text-black/60 mb-1">Market Value</p>  // ❌ 12px
<p className="text-[0.75rem] text-black/60 mb-1">Dominant City</p>  // ❌ 12px
<p className="text-[0.75rem] text-black/60 mb-1">Organic Growth</p>  // ❌ 12px
```

**Recommended Fix:**
```tsx
<p className="text-[0.8rem] text-black/60 mb-1">Market Value</p>  // ✅ 12.8px (text-xs)
<p className="text-[0.8rem] text-black/60 mb-1">Dominant City</p>  // ✅ 12.8px
<p className="text-[0.8rem] text-black/60 mb-1">Organic Growth</p>  // ✅ 12.8px
```

**Impact:** Consistent metadata label sizing

**Visual Change:** +0.8px (very subtle)

---

### Location 10 - Stat Cards Values (Lines 240, 248, 256)
**Priority:** Priority 5 (LOW - Card Titles)

**Current Code:**
```tsx
<p className="text-[1.125rem] font-medium text-black">$150 M</p>  // ❌ 18px
<p className="text-[1.125rem] font-medium text-black">Doha</p>  // ❌ 18px
<p className="text-[1.125rem] font-medium text-black">15% Y-o-Y</p>  // ❌ 18px
```

**Recommended Fix:**
```tsx
<p className="text-[1.25rem] font-medium text-black">$150 M</p>  // ✅ 20px (text-base)
<p className="text-[1.25rem] font-medium text-black">Doha</p>  // ✅ 20px
<p className="text-[1.25rem] font-medium text-black">15% Y-o-Y</p>  // ✅ 20px
```

**Impact:** Stat values slightly larger and on-scale

**Visual Change:** +2px larger stat values (more prominent)

---

### Location 11 - Chapter 6 Heading (Line 274)
**Priority:** Priority 3 (MEDIUM - Section Headings)

**Current Code:**
```tsx
<h2 className="text-[2.25rem] font-light font-serif text-black leading-[1.25] mb-6">  // ❌ 36px
  Market Players & Strategies
</h2>
```

**Recommended Fix:**
```tsx
<h2 className="text-[2.441rem] font-light font-serif text-black leading-[1.25] mb-6">  // ✅ 39px (text-2xl)
  Market Players & Strategies
</h2>
```

**Impact:** Consistent h2 hierarchy with Chapter 1

**Visual Change:** +3px larger heading

---

### Location 12 - Chapter 6 Body Text (Line 281)
**Priority:** Priority 4 (MEDIUM - Body Text)

**Current Code:**
```tsx
<div className="space-y-4 text-[0.938rem] text-black leading-[1.7]">  // ❌ 15px
  <p>The Qatar Fresh Herbs Market demonstrates distinct competitive dynamics...</p>
</div>
```

**Recommended Fix:**
```tsx
<div className="space-y-4 text-[1rem] text-black leading-[1.7]">  // ✅ 16px (text-sm)
  <p>The Qatar Fresh Herbs Market demonstrates distinct competitive dynamics...</p>
</div>
```

**Impact:** Consistent body text with Chapter 1

**Visual Change:** +1px larger body text

---

### Location 13 - Premium Content Title (Line 317)
**Priority:** Priority 5 (LOW - Card Titles)

**Current Code:**
```tsx
<p className="text-[1.125rem] font-semibold text-black mb-2">Premium Content</p>  // ❌ 18px
```

**Recommended Fix:**
```tsx
<p className="text-[1.25rem] font-semibold text-black mb-2">Premium Content</p>  // ✅ 20px (text-base)
```

**Impact:** More prominent premium content title

**Visual Change:** +2px larger

---

**File 1 Summary:**
- **Total changes:** 13 instances
- **Priority 1 (Critical):** 2 instances
- **Priority 2 (High):** 5 instances
- **Priority 3 (Medium):** 2 instances
- **Priority 4 (Medium):** 2 instances
- **Priority 5 (Low):** 1 instance
- **Priority 6 (Low):** 4 instances

---

## 📁 FILE 2: `/src/app/components/HeroSection.tsx`

### Location 1 - Chart Tooltip Value (Line 151)
**Priority:** Priority 6 (LOW - Metadata)

**Current Code:**
```tsx
<div className="text-[0.75rem] text-white font-medium">${item.value}B</div>  // ❌ 12px
```

**Recommended Fix:**
```tsx
<div className="text-[0.8rem] text-white font-medium">${item.value}B</div>  // ✅ 12.8px (text-xs)
```

**Impact:** Slightly more legible chart tooltips

**Visual Change:** +0.8px (very subtle)

---

### Location 2 - Chart Tooltip Year (Line 152)
**Priority:** Priority 1 (CRITICAL - Too Small)

**Current Code:**
```tsx
<div className="text-[0.65rem] text-white/60">{item.year}</div>  // ❌ 10.4px (TOO SMALL!)
```

**Recommended Fix:**
```tsx
<div className="text-[0.8rem] text-white/60">{item.year}</div>  // ✅ 12.8px (text-xs)
```

**Impact:** 
- Meets accessibility minimum (10.4px → 12.8px)
- More legible year labels

**Visual Change:** +2.4px (noticeable improvement in legibility)

---

### Location 3 - Modal Heading (Line 622)
**Priority:** Priority 3 (MEDIUM - Section Headings)

**Current Code:**
```tsx
<h2 className="font-serif font-light text-[2.25rem] text-white mb-2">  // ❌ 36px
  Sample Report Preview
</h2>
```

**Recommended Fix:**
```tsx
<h2 className="font-serif font-light text-[2.441rem] text-white mb-2">  // ✅ 39px (text-2xl)
  Sample Report Preview
</h2>
```

**Impact:** Consistent h2 hierarchy across site

**Visual Change:** +3px larger modal heading

---

**File 2 Summary:**
- **Total changes:** 3 instances
- **Priority 1 (Critical):** 1 instance
- **Priority 3 (Medium):** 1 instance
- **Priority 6 (Low):** 1 instance

---

## 📁 FILE 3: `/src/app/components/ReportHighlights.tsx`

### Location 1 - Highlight Badge Label (Line 115)
**Priority:** Priority 6 (LOW - Metadata)

**Current Code:**
```tsx
<div className="text-[0.75rem] text-utility-icon">  // ❌ 12px
  {highlight.badgeLabel}
</div>
```

**Recommended Fix:**
```tsx
<div className="text-[0.8rem] text-utility-icon">  // ✅ 12.8px (text-xs)
  {highlight.badgeLabel}
</div>
```

**Impact:** Consistent metadata sizing

**Visual Change:** +0.8px (very subtle)

---

### Location 2 - Highlight Description (Line 122)
**Priority:** Priority 4 (MEDIUM - Body Text)

**Current Code:**
```tsx
<p className="text-[0.938rem] text-utility-icon leading-relaxed">  // ❌ 15px
  {highlight.description}
</p>
```

**Recommended Fix:**
```tsx
<p className="text-[1rem] text-utility-icon leading-relaxed">  // ✅ 16px (text-sm)
  {highlight.description}
</p>
```

**Impact:** Standard body text size

**Visual Change:** +1px (better readability)

---

**File 3 Summary:**
- **Total changes:** 2 instances
- **Priority 4 (Medium):** 1 instance
- **Priority 6 (Low):** 1 instance

---

## 📁 FILE 4: `/src/app/components/ResearchMethodology.tsx`

### Location 1 - Step Title (Line 93)
**Priority:** Priority 5 (LOW - Card Titles)

**Current Code:**
```tsx
<h3 className="font-serif font-light text-[1.125rem] mb-2">{step.title}</h3>  // ❌ 18px
```

**Recommended Fix:**
```tsx
<h3 className="font-serif font-light text-[1.25rem] mb-2">{step.title}</h3>  // ✅ 20px (text-base)
```

**Impact:** More prominent step titles

**Visual Change:** +2px larger

---

**File 4 Summary:**
- **Total changes:** 1 instance
- **Priority 5 (Low):** 1 instance

---

## 📁 FILE 5: `/src/app/components/MarketDataVisualization.tsx`

### Location 1 - Chart Labels (Lines 67, 70, 108, 111, 153, 156)
**Priority:** Priority 6 (LOW - Metadata)

**Current Code (multiple instances):**
```tsx
<p className="text-[0.875rem] text-black/60 mb-6">  // ❌ 14px (off-scale)
  Global AI in Healthcare Market (USD Billion)
</p>
```

**Context:** This is `0.875rem` (14px) which is used for buttons. For chart captions/metadata, it's technically off the Major Third scale.

**Recommended Fix - Option A (Smaller):**
```tsx
<p className="text-[0.8rem] text-black/60 mb-6">  // ✅ 12.8px (text-xs)
```

**Recommended Fix - Option B (Larger):**
```tsx
<p className="text-[1rem] text-black/60 mb-6">  // ✅ 16px (text-sm)
```

**Decision Needed:** Should chart captions be small metadata (12.8px) or body size (16px)?

**Visual Change:** -0.875rem → 0.8rem (-1.2px) OR 0.875rem → 1rem (+2px)

---

**File 5 Summary:**
- **Total changes:** ~6 instances
- **Priority 6 (Low):** 6 instances
- **Decision needed:** Size preference for chart captions

---

## 📁 BONUS: Redundant Font Declarations (Priority 7 - CLEANUP)

### Location 1 - HeroSection Button (Line 330)
```tsx
// BEFORE:
<Button className="font-sans font-bold">  // ❌ font-sans is redundant

// AFTER:
<Button className="font-bold">  // ✅ font-sans is default
```

### Location 2 - HeroSection Button (Line 339)
```tsx
// BEFORE:
<Button className="font-sans font-medium">  // ❌ font-sans is redundant

// AFTER:
<Button className="font-medium">  // ✅ font-sans is default
```

### Location 3 - HeroSection Modal Button (Line 696)
```tsx
// BEFORE:
<Button className="font-sans font-bold">  // ❌ font-sans is redundant

// AFTER:
<Button className="font-bold">  // ✅ font-sans is default
```

**Impact:** Cleaner code, no visual change

---

## 🎯 DECISION MATRIX

### Decision 1: TOC Title Size (Location 2)
**Options:**
- **A) Small:** `text-[0.8rem]` (12.8px) - Keeps TOC compact
- **B) Standard:** `text-[1rem]` (16px) - Better readability

**Recommendation:** Option A (compact TOC is typical pattern)

---

### Decision 2: Chart Caption Size (File 5)
**Options:**
- **A) Metadata:** `text-[0.8rem]` (12.8px) - Subtle captions
- **B) Body:** `text-[1rem]` (16px) - More prominent

**Recommendation:** Option B (better accessibility and readability)

---

## 📊 IMPACT SUMMARY

### By Priority Level

| Priority | Count | Description | Impact |
|----------|-------|-------------|--------|
| **1 - Critical** | 2 | Accessibility (< 12px) | HIGH - Must fix |
| **2 - High** | 5 | Inconsistent TOC/Nav | MEDIUM - User experience |
| **3 - Medium** | 3 | Section headings | MEDIUM - Visual hierarchy |
| **4 - Medium** | 3 | Body text | MEDIUM - Readability |
| **5 - Low** | 2 | Card titles | LOW - Visual polish |
| **6 - Low** | 11 | Metadata labels | LOW - Consistency |
| **7 - Cleanup** | 3 | Redundant code | NONE - Code quality |
| **TOTAL** | **29** | | |

---

### By File

| File | Changes | Priority 1-2 | Priority 3-4 | Priority 5-7 |
|------|---------|--------------|--------------|--------------|
| SampleReportPreview.tsx | 13 | 7 | 4 | 2 |
| HeroSection.tsx | 3 | 1 | 1 | 1 |
| ReportHighlights.tsx | 2 | 0 | 1 | 1 |
| ResearchMethodology.tsx | 1 | 0 | 0 | 1 |
| MarketDataVisualization.tsx | 6 | 0 | 0 | 6 |
| Various (cleanup) | 3 | 0 | 0 | 3 |
| **TOTAL** | **28** | **8** | **6** | **14** |

---

## 🎯 RECOMMENDATION TIERS

### Tier 1: Must Fix (Priority 1-2)
**Count:** 8 instances  
**Why:** Accessibility and user experience

**Files:**
- SampleReportPreview.tsx: 7 changes
- HeroSection.tsx: 1 change

**Estimated Time:** 15 minutes

---

### Tier 2: Should Fix (Priority 3-4)
**Count:** 6 instances  
**Why:** Visual hierarchy and readability standards

**Files:**
- SampleReportPreview.tsx: 4 changes
- HeroSection.tsx: 1 change
- ReportHighlights.tsx: 1 change

**Estimated Time:** 10 minutes

---

### Tier 3: Nice to Fix (Priority 5-7)
**Count:** 14 instances  
**Why:** Visual polish and code consistency

**Files:**
- SampleReportPreview.tsx: 2 changes
- HeroSection.tsx: 1 change
- ReportHighlights.tsx: 1 change
- ResearchMethodology.tsx: 1 change
- MarketDataVisualization.tsx: 6 changes
- Various: 3 changes

**Estimated Time:** 20 minutes

---

## 💡 SUGGESTED APPROACH

### Option A: Fix Everything (100% Compliance)
**Changes:** All 28 instances  
**Time:** ~45 minutes  
**Result:** Perfect Major Third scale compliance ✅

### Option B: Critical + Important (Tier 1 + 2)
**Changes:** 14 instances  
**Time:** ~25 minutes  
**Result:** 90% compliance, all accessibility/readability issues fixed ✅

### Option C: Critical Only (Tier 1)
**Changes:** 8 instances  
**Time:** ~15 minutes  
**Result:** 80% compliance, accessibility issues fixed ✅

### Option D: Keep As-Is
**Changes:** 0  
**Time:** 0  
**Result:** 60% compliance, current state maintained

---

## 📝 NEXT STEPS

1. **Review this document** and decide which tier to implement
2. **Make decisions** on:
   - TOC title size (Decision 1)
   - Chart caption size (Decision 2)
3. **Confirm approach** (Option A, B, C, or D)
4. **Proceed with fixes** once approved

---

**Document prepared by:** AI Architecture System  
**Date:** February 17, 2026  
**Status:** Awaiting decision
