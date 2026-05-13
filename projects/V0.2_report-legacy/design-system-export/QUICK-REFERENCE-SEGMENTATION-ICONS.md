# Implementation Quick Reference - Market Segmentation Icons

**Date:** February 10, 2026  
**Feature:** Random Icon System for Market Segmentation Cards

---

## 🎯 Quick Summary

**What:** 15 generic market segmentation icons that randomly assign to segmentation cards  
**Where:** `/src/app/constants/segmentation-icons.tsx` (icon collection)  
**How:** Deterministic assignment using `getSegmentationIconByIndex()`

---

## 📂 Files Changed

### 1. **NEW FILE:** `/src/app/constants/segmentation-icons.tsx`
```typescript
// Imports 15 Phosphor icons
import { ChartPie, ChartDonut, ChartPieSlice, ... } from '@phosphor-icons/react';

// Array of 15 icons
export const SEGMENTATION_ICONS = [
  ChartPie, ChartDonut, ChartPieSlice, ChartBar, ChartBarHorizontal,
  ChartLine, Funnel, FunnelSimple, Target, CirclesThree,
  CirclesThreePlus, Percent, Strategy, GridFour, Graph
] as const;

// Helper: Get icon by index (deterministic)
export function getSegmentationIconByIndex(index: number) {
  return SEGMENTATION_ICONS[index % SEGMENTATION_ICONS.length];
}

// Helper: Get random icon
export function getRandomSegmentationIcon() {
  return SEGMENTATION_ICONS[Math.floor(Math.random() * SEGMENTATION_ICONS.length)];
}
```

**Why:** Centralized repository for all segmentation icons

---

### 2. **MODIFIED:** `/src/app/components/SegmentationSection.tsx`

**Changes:**
```typescript
// OLD: Direct icon import
import { ChartPie } from '@phosphor-icons/react';

// NEW: Helper function import
import { getSegmentationIconByIndex } from '@/app/constants/segmentation-icons';
```

**Usage in 7 Cards:**
```typescript
// Card 1: Product Type
<SegmentationCard icon={getSegmentationIconByIndex(0)} ... />  // ChartPie

// Card 2: Customer Type
<SegmentationCard icon={getSegmentationIconByIndex(1)} ... />  // ChartDonut

// Card 3: Distribution
<SegmentationCard icon={getSegmentationIconByIndex(2)} ... />  // ChartPieSlice

// Card 4: Packaging
<SegmentationCard icon={getSegmentationIconByIndex(3)} ... />  // ChartBar

// Card 5: Geographic
<SegmentationCard icon={getSegmentationIconByIndex(4)} ... />  // ChartBarHorizontal

// Card 6: Cultivation
<SegmentationCard icon={getSegmentationIconByIndex(5)} ... />  // ChartLine

// Card 7: Pricing
<SegmentationCard icon={getSegmentationIconByIndex(6)} ... />  // Funnel
```

**Why:** Each card gets a unique icon from the pool

---

### 3. **MODIFIED:** `/src/app/components/ui/segmentation-card.tsx`

**Changes:**
```typescript
// OLD: Generic ReactNode type
icon: ReactNode

// NEW: Specific PhosphorIcon type
import { Icon as PhosphorIcon } from '@phosphor-icons/react';

export interface SegmentationCardProps {
  icon: PhosphorIcon;  // Changed type
  // ... other props
}

// Render with specific props
export function SegmentationCard({ icon: Icon, ... }) {
  return (
    <div className="size-10 mb-4 rounded-lg flex items-center justify-center bg-[var(--purple-100)]">
      <Icon size={20} weight="regular" className="text-[var(--purple-500)]" />
    </div>
  );
}
```

**Why:** Type safety for Phosphor icons, consistent rendering

---

## 🧠 Logic Explained

### Icon Assignment Flow

```
User Request
    ↓
SegmentationSection.tsx
    ↓
getSegmentationIconByIndex(0-6) ← Called for each of 7 cards
    ↓
/constants/segmentation-icons.tsx
    ↓
SEGMENTATION_ICONS[index % 15] ← Returns icon from array
    ↓
SegmentationCard receives PhosphorIcon component
    ↓
Renders with: size={20}, weight="regular", color=Purple 500
```

---

### Modulo Logic

**Why use modulo (`%`)?**
```typescript
index % 15
```

**Example:**
- Card 0: `0 % 15 = 0` → Icon 0 (ChartPie)
- Card 1: `1 % 15 = 1` → Icon 1 (ChartDonut)
- Card 7: `7 % 15 = 7` → Icon 7 (FunnelSimple)
- Card 15: `15 % 15 = 0` → Icon 0 (ChartPie) - cycles back!

**Benefit:** Supports any number of cards (1-100+) without hardcoding

---

## 🎨 Styling Constants

All icons use these consistent styles:

| Property | Value | Variable | Reasoning |
|----------|-------|----------|-----------|
| **Size** | 20px | N/A | Readable without overwhelming |
| **Weight** | Regular/Outline | `weight="regular"` | Matches KP 2.0 icon style |
| **Color** | Purple 500 | `text-[var(--purple-500)]` | Brand color for interactive elements |
| **Background** | Purple 100 | `bg-[var(--purple-100)]` | Subtle purple tint |
| **Container Size** | 40px × 40px | `size-10` | Balanced proportion |
| **Border Radius** | 8px | `rounded-lg` | Matches card radius |

---

## 📋 Icon Inventory

### Complete List of 15 Icons

| Index | Icon Name | Category | Visual |
|-------|-----------|----------|--------|
| 0 | `ChartPie` | Pie Chart | Circle with slices |
| 1 | `ChartDonut` | Pie Chart | Ring chart |
| 2 | `ChartPieSlice` | Pie Chart | Single slice |
| 3 | `ChartBar` | Bar Chart | Vertical bars |
| 4 | `ChartBarHorizontal` | Bar Chart | Horizontal bars |
| 5 | `ChartLine` | Line Chart | Line graph |
| 6 | `Funnel` | Funnel | Sales funnel |
| 7 | `FunnelSimple` | Funnel | Simple funnel |
| 8 | `Target` | Target | Bullseye target |
| 9 | `CirclesThree` | Circles | Three circles |
| 10 | `CirclesThreePlus` | Circles | Three circles + more |
| 11 | `Percent` | Symbol | Percentage sign |
| 12 | `Strategy` | Strategy | Chess knight |
| 13 | `GridFour` | Grid | 2×2 grid |
| 14 | `Graph` | Graph | Node graph |

**Common Theme:** All represent data analysis, market breakdown, or segmentation concepts

---

## 🔧 How to Use

### Basic Usage
```typescript
import { getSegmentationIconByIndex } from '@/app/constants/segmentation-icons';

<SegmentationCard
  icon={getSegmentationIconByIndex(0)}
  title="Your Title"
  items={[...]}
/>
```

### Random Icons (Dynamic)
```typescript
import { getRandomSegmentationIcon } from '@/app/constants/segmentation-icons';

<SegmentationCard
  icon={getRandomSegmentationIcon()}  // Changes each render
  title="Your Title"
  items={[...]}
/>
```

### Direct Icon Usage
```typescript
import { SEGMENTATION_ICONS } from '@/app/constants/segmentation-icons';

const MyIcon = SEGMENTATION_ICONS[3];  // ChartBar

<MyIcon size={20} weight="regular" className="text-purple-500" />
```

---

## 🚀 Extension Guide

### Adding New Icons

1. **Choose Icon:** Browse [Phosphor Icons](https://phosphoricons.com/) for market segmentation themes
2. **Import:** Add to imports in `/src/app/constants/segmentation-icons.tsx`
   ```typescript
   import { NewIcon } from '@phosphor-icons/react';
   ```
3. **Add to Array:** Append to `SEGMENTATION_ICONS`
   ```typescript
   export const SEGMENTATION_ICONS = [
     // ... existing 15 icons
     NewIcon,  // Icon 16
   ] as const;
   ```
4. **Update Docs:** Change "15 icons" to "16 icons" in documentation

---

### Creating More Card Sets

**Example: Adding 3 More Cards (Total = 10)**

```typescript
// Cards 8, 9, 10 will use icons 8, 9, 10
<SegmentationCard icon={getSegmentationIconByIndex(7)} ... />  // Target
<SegmentationCard icon={getSegmentationIconByIndex(8)} ... />  // CirclesThree
<SegmentationCard icon={getSegmentationIconByIndex(9)} ... />  // CirclesThreePlus
```

**No code changes needed!** The modulo logic handles it automatically.

---

## ❓ Troubleshooting

### Issue: "Icon not rendering"

**Check:**
1. Is icon imported in `/src/app/constants/segmentation-icons.tsx`?
2. Is icon name spelled correctly?
3. Does icon exist in `@phosphor-icons/react`?
4. Is `@phosphor-icons/react` package installed?

**Fix:**
```bash
npm install @phosphor-icons/react
```

---

### Issue: "TypeScript error on icon prop"

**Error:**
```
Type 'X' is not assignable to type 'PhosphorIcon'
```

**Fix:** Ensure you're passing a Phosphor icon component, not a JSX element:
```typescript
// ❌ WRONG
icon={<ChartPie />}

// ✅ CORRECT
icon={ChartPie}
```

---

### Issue: "Same icon appearing on all cards"

**Check:** Are you calling the function or passing the same index?

```typescript
// ❌ WRONG: Same icon for all
{cards.map((card, index) => (
  <SegmentationCard icon={getSegmentationIconByIndex(0)} ... />
))}

// ✅ CORRECT: Different icon for each
{cards.map((card, index) => (
  <SegmentationCard icon={getSegmentationIconByIndex(index)} ... />
))}
```

---

## 📊 Design Decision Log

### Why Deterministic vs. Random?

**Decision:** Use deterministic assignment (`getSegmentationIconByIndex`)

**Reasoning:**
- ✅ Consistent UX (same icons on refresh)
- ✅ Predictable for documentation
- ✅ Easier debugging
- ✅ Better performance (no randomization)

**When to Use Random:**
- User wants dynamic variation
- Gamification features
- A/B testing

---

### Why 15 Icons?

**Decision:** 15-icon collection

**Reasoning:**
- ✅ Sufficient variety for 7 cards (no repetition)
- ✅ Scalable to 15+ cards with cycling
- ✅ Covers all major chart/graph types
- ✅ Manageable to maintain

**Alternative Considered:** 7 icons (one per card)
- ❌ Less flexible for future expansion
- ❌ No cycling benefit

---

### Why Regular Weight?

**Decision:** Use `weight="regular"` (outline style)

**Reasoning:**
- ✅ Matches Key Stakeholders section (`Users` icon)
- ✅ Better readability at 20px
- ✅ Consistent with KP 2.0 design system
- ✅ Better contrast on purple background

**Alternative Considered:** `weight="bold"` (filled)
- ❌ Too heavy, dominates card header
- ❌ Inconsistent with existing icons

---

## 🎓 Key Learnings

### 1. **Type Safety Matters**
Using `PhosphorIcon` type ensures compile-time validation and prevents runtime errors.

### 2. **Modulo Pattern for Cycling**
```typescript
index % arrayLength
```
This pattern allows infinite cards without array bounds errors.

### 3. **Centralized Constants**
Storing icons in `/constants/` makes them reusable across multiple components.

### 4. **Generic Iconography**
Icons should represent concepts (market segmentation), not specific content (retail, wholesale).

### 5. **Deterministic > Random for UX**
Predictable behavior improves user experience and debugging.

---

## 📚 Related Files

- **Main Documentation:** `/design-system-export/MARKET-SEGMENTATION-ICONS-DOCUMENTATION.md`
- **Component Library:** `/design-system-export/COMPONENT-LIBRARY.md`
- **KP 2.0 Colors:** `/design-system-export/COLOR-SYSTEM.md`

---

**Quick Reference Version:** 1.0.0  
**Last Updated:** February 10, 2026
