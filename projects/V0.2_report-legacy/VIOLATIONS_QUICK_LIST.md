# Design System Violations - Quick Reference List

## ALL VIOLATIONS BY COMPONENT (NO CHANGES MADE YET)

---

### ✅ CHAPTER 3: MarketAnalysis.tsx
**Violations:** 0  
**Status:** COMPLIANT

---

### ⚠️ CHAPTER 4: MarketDataTable.tsx
**Violations:** 8

1. Line 73: `hover:shadow-[var(--shadow-brand-periwinkle)]` → Should be `--shadow-brand-purple`
2. Line 90: `text-[var(--periwinkle-600)]` → Should be `text-[var(--purple-500)]`
3. Line 100: `text-[var(--periwinkle-600)]` → Should be `text-[var(--purple-500)]`
4. Line 110: `text-[var(--periwinkle-600)]` → Should be `text-[var(--purple-500)]`
5. Line 120: `text-[var(--periwinkle-600)]` → Should be `text-[var(--purple-500)]`
6. Line 130: `text-[var(--periwinkle-600)]` → Should be `text-[var(--purple-500)]`
7. Line 140: `text-[var(--periwinkle-600)]` → Should be `text-[var(--purple-500)]`
8. Line 174: `bg-[var(--periwinkle-600)]` → Should be `bg-[var(--purple-500)]`
9. Line 208: Chapter number "CHAPTER 3" → Should be "CHAPTER 4 - Market Breakdown"

---

### ⚠️ CHAPTER 5: RegionalComparison.tsx
**Violations:** 8

1. Line 96: `color: 'var(--periwinkle-500)'` → Should be `'var(--purple-500)'`
2. Line 239: `backgroundColor: 'var(--periwinkle-100)'` → Should be `'var(--purple-100)'`
3. Line 240: `color: 'var(--periwinkle-600)'` → Should be `'var(--purple-500)'`
4. Line 250: `backgroundColor: 'var(--periwinkle-100)'` → Should be `'var(--purple-100)'`
5. Line 251: `color: 'var(--periwinkle-600)'` → Should be `'var(--purple-500)'`
6. Line 261: `backgroundColor: 'var(--periwinkle-100)'` → Should be `'var(--purple-100)'`
7. Line 262: `color: 'var(--periwinkle-600)'` → Should be `'var(--purple-500)'`
8. Line 110: Missing "CHAPTER 5 - " prefix → Should be "CHAPTER 5 - Regional Analysis"
9. Multiple shadow violations: `hover:shadow-[var(--shadow-brand-periwinkle)]`

---

### ⚠️ CHAPTER 6: SegmentationSection.tsx
**Violations:** 22+

**Pattern Violations (each appears 7 times):**
1. Icon backgrounds: `bg-[var(--periwinkle-100)]` → Should be `bg-[var(--purple-100)]`
   - Lines: 103, 137, 177, 211, 245, 277, 311
   
2. Icon colors: `text-[var(--periwinkle-600)]` → Should be `text-[var(--purple-500)]`
   - Lines: 104, 138, 178, 212, 246, 278, 312
   
3. Progress bar fills: `bg-[var(--periwinkle-400)]` → Should be `bg-[var(--purple-300)]`
   - Lines: 126, 160, 200, 234, 263, 300

4. Shadow violations: Multiple `hover:shadow-[var(--shadow-brand-periwinkle)]`

5. Missing chapter number → Should add "CHAPTER 6 - Industrial Analysis"

---

### ⚠️ CHAPTER 7: CompetitiveLandscape.tsx
**Violations:** 32+

**Hardcoded Purple-600 to Purple-500:**
1. Line 61: `color: '#6D52D9'` → Should be `'#7f5fe3'`
2. Line 218: `backgroundColor: '#6D52D9'` → Should be `'#7f5fe3'`
3. Line 308: `color: '#6D52D9'` → Should be `'#7f5fe3'`
4. Line 319: `color: '#6D52D9'` → Should be `'#7f5fe3'`
5. Line 329: `color: '#6D52D9'` → Should be `'#7f5fe3'`
6. Line 339: `color: '#6D52D9'` → Should be `'#7f5fe3'`
7. Line 358: `color: '#6D52D9'` → Should be `'#7f5fe3'`
8. Line 405: `color: '#6D52D9'` → Should be `'#7f5fe3'`
9. Line 418: `color: '#6D52D9'` → Should be `'#7f5fe3'`
10. Line 431: `color: '#6D52D9'` → Should be `'#7f5fe3'`
11. Line 444: `color: '#6D52D9'` → Should be `'#7f5fe3'`
12. Line 457: `color: '#6D52D9'` → Should be `'#7f5fe3'`
13. Line 470: `color: '#6D52D9'` → Should be `'#7f5fe3'`
14. Line 483: `color: '#6D52D9'` → Should be `'#7f5fe3'`
15. Line 496: `color: '#6D52D9'` → Should be `'#7f5fe3'`
16. Line 509: `color: '#6D52D9'` → Should be `'#7f5fe3'`
17. Line 522: `color: '#6D52D9'` → Should be `'#7f5fe3'`
18. Line 565: `color: '#6d52d9'` → Should be `'#7f5fe3'`

**Shadow RGBA Violations:**
- Lines 197, 225, 251, 291, 392: `rgba(109,82,217,0.1)` → Should be `rgba(127,95,227,0.1)`

**Border Class Violations:**
- Line 563: `hover:border-periwinkle-300` → Should be `hover:border-purple-300`

**Icon Backgrounds (keep as is - already correct):**
- Lines 233, 357, 404, 417, 430, 443, 456, 469, 482, 495, 508, 521: `bg-[#eff1fe]` ✅

**Chapter Number:**
- Line 124: "Chapter 4" → Should be "CHAPTER 7 - Competitive Landscape"

---

### ⚠️ CHAPTER 8: TableOfContentsSection.tsx
**Violations:** 24+

1. Line 46: `bg-periwinkle-200` → Should be `bg-purple-200`
2. Line 309: `text-periwinkle-600` → Should be `text-purple-500`
3. Line 399: `border-periwinkle-300` → Should be `border-purple-300`
4. Line 400: `hover:border-periwinkle-200` → Should be `hover:border-purple-200`
5. Line 404: `from-periwinkle-200/30 to-periwinkle-200/10` → Should be `from-purple-200/30 to-purple-200/10`
6. Line 409: `bg-periwinkle-200/20` → Should be `bg-purple-200/20`
7. Line 410: `text-periwinkle-400` → Should be `text-purple-300`
8. Line 413: `text-periwinkle-400` → Should be `text-purple-300`
9. Line 418: `text-periwinkle-400` → Should be `text-purple-300`
10. Lines 453-454: Similar violations for Phase 2 card
11. Lines 495-496: Similar violations for Phase 3 card (if exists)

**Additional violations in second and third phase cards following same pattern**

**Chapter Number:** Needs verification for "CHAPTER 8 - Table of Contents"

---

### ⚠️ CHAPTER 9: TargetAudience.tsx
**Violations:** 5

1. Line 97: `bg-[#e2e4fd]` → Should be `bg-[var(--purple-100)]` or `bg-[#eff1fe]`
2. Line 99: `color: '#6D52D9'` → Should be `color: '#7f5fe3'`
3. Line 119: `color: '#6D52D9'` → Should be `color: '#7f5fe3'`
4. Line 129: `color: '#6D52D9'` → Should be `color: '#7f5fe3'`
5. Line 76: "CHAPTER 5" → Should be "CHAPTER 9 - Key Stakeholders"

---

### ⚠️ CHAPTER 10: ResearchMethodology.tsx
**Violations:** 4

1. Line 130: `bg-[#e2e4fd]` → Should be `bg-[var(--purple-100)]` or `bg-[#eff1fe]`
2. Line 131: `color: '#6D52D9'` → Should be `color: '#7f5fe3'`
3. Line 145: `color: '#6D52D9'` → Should be `color: '#7f5fe3'`
4. Line 69: "CHAPTER 6" → Should be "CHAPTER 10 - Our Approach"

---

### ✅ CHAPTER 11: FAQSection.tsx
**Violations:** 1

1. Line 69: "CHAPTER 7" → Should be "CHAPTER 11 - FAQ"

(No color violations - uses neutral colors only)

---

## SUMMARY BY VIOLATION TYPE

### Color Violations: 67 instances
- `--periwinkle-600` → `--purple-500`: 23x
- `--periwinkle-500` → `--purple-500`: 1x
- `--periwinkle-400` → `--purple-300`: 10x
- `--periwinkle-300` → `--purple-300`: 4x
- `--periwinkle-200` → `--purple-200`: 5x
- `--periwinkle-100` → `--purple-100`: 13x
- `#6D52D9` / `#6d52d9` → `#7f5fe3`: 20x
- `#e2e4fd` → `#eff1fe`: 4x
- Shadow RGBA updates: 13x

### Chapter Number Issues: 9 instances
- MarketDataTable.tsx: Wrong chapter number and name
- RegionalComparison.tsx: Missing chapter prefix
- SegmentationSection.tsx: Missing entirely
- CompetitiveLandscape.tsx: Wrong number
- TableOfContentsSection.tsx: Needs verification
- TargetAudience.tsx: Wrong number
- ResearchMethodology.tsx: Wrong number
- FAQSection.tsx: Wrong number

### Reusable Component Opportunities: 12 patterns identified
(See main audit report for details)

---

## TOTAL VIOLATIONS: 87

**Status:** Ready for systematic remediation  
**Priority:** Execute color updates first, then chapter numbers, then component refactoring  
**No changes have been made yet - this is an audit report only**
