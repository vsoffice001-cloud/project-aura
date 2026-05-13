# Project KP 2.0 Design System - Changelog

All notable changes to the Project KP 2.0 Design System will be documented in this file.

---

## [2.0.1] - 2026-01-23

### ✨ Added

#### Layout & Container – Proportional Padding System
- **New intelligent padding system** that adapts to viewport width
- `--content-max-width: 1440px` - Prevents ultra-wide text lines on 4K+
- `--content-min-width: 320px` - Mobile safety threshold
- `--padding-page-side: 20%` - Proportional side padding (20% each side = 40% total)
- `--padding-page-side-min: 16px` - Never smaller than mobile comfort
- `--padding-page-side-max: 160px` - Cap extreme padding on ultra-wide
- `--padding-page-inline: clamp(...)` - **Smart computed padding (recommended)** ⭐

**Benefits:**
- Adapts gracefully from mobile (16px) to ultra-wide (160px max)
- Maintains comfortable reading width on all devices
- Prevents ultra-wide text lines on 4K+ displays
- Uses CSS `clamp()` for intelligent responsive behavior

**TypeScript exports added in `/design-system/spacing.ts`:**
```typescript
export const layout = {
  content: {
    maxWidth: '1440px',
    minWidth: '320px',
  },
  padding: {
    side: '20%',
    sideMin: '16px',
    sideMax: '160px',
  },
  paddingInline: 'clamp(16px, 20%, 160px)',
}
```

#### Border Radius – Intent-driven Scale
- **New comprehensive border radius system** with semantic intent-driven naming
- `--radius-xs: 2.5px` - Tiny tags, badges, micro-buttons
- `--radius-sm: 5px` - Form inputs, chips, toggles (Ken Research standard)
- `--radius-md: 10px` - Cards, panels, tables
- `--radius-lg: 15px` - Dialogs, modals, drawers
- `--radius-xl: 20px` - Hero containers, large banners
- `--radius-full: 9999px` - Pills, avatars, circular buttons

**TypeScript exports updated in `/design-system/spacing.ts`**

#### Elevation / Shadow Levels – Semantic Depth
- **New semantic shadow system** with intent-driven hierarchy
- `--elevation-flat: none` - No elevation
- `--elevation-xs: 0 1px 2px rgba(0,0,0,0.08)` - Minimal lift
- `--elevation-sm: 0 1px 2px rgba(0,0,0,0.08)` - Subtle lift, cards on hover
- `--elevation-md: 0 4px 12px rgba(0,0,0,0.12)` - Standard cards, popovers
- `--elevation-lg: 0 12px 28px rgba(0,0,0,0.18)` - Modals, dialogs, dropdowns
- `--elevation-xl: 0 20px 40px rgba(0,0,0,0.22)` - Deep overlays, floating panels

**Brand-specific shadows retained:**
- `--shadow-brand-red` - Red-tinted shadow for CTAs
- `--shadow-brand-red-hover` - Enhanced hover state
- `--shadow-brand-periwinkle` - Periwinkle accents

**TypeScript exports updated in `/design-system/spacing.ts`**

#### Transitions & Timing – Feel Tuning
- **Complete duration scale** from 150ms to 900ms
- `--duration-xxs: 150ms` - Very quick micro-interactions
- `--duration-xs: 200ms` - Quick button feedback
- `--duration-sm: 300ms` - Default hover/click (recommended)
- `--duration-md: 400ms` - Component state changes
- `--duration-lg: 500ms` - Content transitions
- `--duration-xl: 600ms` - Page transitions, drawer open
- `--duration-xxl: 700ms` - Loading states
- `--duration-xxxl: 800ms` - Emphasis animations
- `--duration-max: 900ms` - Slow reveals, loading emphasis

**Enhanced timing functions:**
- `--timing-ease-out: cubic-bezier(0.16, 1, 0.3, 1)` - Recommended for most exits
- `--timing-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)` - Bidirectional animations

**TypeScript exports updated in `/design-system/spacing.ts`**

### 📝 Updated

- **README.md** - Added comprehensive documentation for all new tokens
  - Border radius usage guide with intent-driven examples
  - Elevation system with semantic depth levels
  - Transition timing guide with common animation patterns
  - CSS variable usage examples
  - TypeScript import examples
  - Tailwind integration examples

- **spacing.ts** - Updated TypeScript exports
  - Replaced old border radius tokens with new intent-driven scale
  - Replaced old shadow tokens with semantic elevation system
  - Enhanced transition timing with expanded duration scale
  - Improved type safety with updated type exports

- **theme.css** - Updated CSS variables
  - New border radius variables (`--radius-xs` through `--radius-xl`)
  - New elevation variables (`--elevation-flat` through `--elevation-xl`)
  - New duration variables (`--duration-xxs` through `--duration-max`)
  - New timing function variables (`--timing-ease-out`, `--timing-ease-in-out`)

### 💡 Design Intent

The new tokens introduce **intent-driven design** - each token has a specific purpose and context:

**Border Radius:**
- Not just sizes (sm, md, lg) but **contexts** (form inputs, cards, modals)
- Guides developers to use the right radius for the right component

**Elevation:**
- Not just shadow strength but **UI layers** (cards, modals, overlays)
- Creates consistent depth hierarchy across the application

**Transitions:**
- Not just speeds but **interaction types** (micro, hover, page transitions)
- Ensures animations feel cohesive and purposeful

### 🎯 Usage Recommendations

**Border Radius:**
```css
.form-input { border-radius: var(--radius-sm); }     /* 5px - tight, clean */
.card { border-radius: var(--radius-md); }           /* 10px - standard */
.modal { border-radius: var(--radius-lg); }          /* 15px - spacious */
```

**Elevation:**
```css
.card { box-shadow: var(--elevation-md); }           /* Standard lift */
.modal { box-shadow: var(--elevation-lg); }          /* Floating above */
.card:hover { box-shadow: var(--elevation-sm); }     /* Subtle hover */
```

**Transitions:**
```css
.button {
  transition: all var(--duration-sm) var(--timing-ease-out);
  /* 300ms with natural exit - recommended default */
}

.modal {
  transition: opacity var(--duration-xl) var(--timing-ease-in-out);
  /* 600ms for page-level transitions */
}
```

---

## [2.0.0] - 2026-01-23

### 🎉 Initial Release

#### Color System
- Foundation colors (Black, White)
- Grayscale (Black Tints 50-900)
- Warm Off-White Scale (50-900)
- Ken Bold Red - Primary Brand (#b01f24)
- Periwinkle - Trust & Accents (#a7abf0)
- Utility colors (Green, Rose, Amber)

#### Typography
- Major Third Scale (1.25 ratio)
- Font families (Noto Serif, DM Sans, Fira Code)
- Two-weight system (Bold 700, Regular 400)
- Text opacity hierarchy
- Line height system

#### Spacing & Layout
- Base spacing scale (0-384px)
- Semantic spacing tokens
- Container padding system
- Section spacing
- Content spacing

#### Original Border Radius
- `--radius-sm: 2px`
- `--radius-base: 4px`
- `--radius-md: 5px` (Ken standard)
- `--radius-lg: 8px`
- `--radius-xl: 12px`
- `--radius-2xl: 16px`
- `--radius-full: 9999px`

#### Original Shadows
- Standard shadow scale (xs, sm, base, md, lg, xl)
- Brand-specific shadows (red, periwinkle)

#### Original Transitions
- Duration: instant (100ms) → slower (600ms)
- Timing functions (ease, easeIn, easeOut, easeInOut, sharp)

---

## Migration Guide

### From 2.0.0 to 2.0.1

#### Border Radius Changes

**Old:**
```css
--radius-base: 4px
--radius-md: 5px
--radius-lg: 8px
--radius-xl: 12px
--radius-2xl: 16px
```

**New:**
```css
--radius-xs: 2.5px    /* NEW - micro elements */
--radius-sm: 5px      /* RENAMED from --radius-md */
--radius-md: 10px     /* EXPANDED - standard cards */
--radius-lg: 15px     /* EXPANDED - modals */
--radius-xl: 20px     /* EXPANDED - hero containers */
```

**Action Required:**
- `--radius-md` → Update to `--radius-sm` if using for buttons/inputs
- `--radius-lg` → Update to `--radius-md` if using for cards
- Review all border radius usage for semantic correctness

#### Shadow Changes

**Old:**
```css
--shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
--shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)
--shadow-base: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)
--shadow-md: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)
```

**New (Semantic):**
```css
--elevation-flat: none
--elevation-xs: 0 1px 2px rgba(0,0,0,0.08)
--elevation-sm: 0 1px 2px rgba(0,0,0,0.08)
--elevation-md: 0 4px 12px rgba(0,0,0,0.12)
--elevation-lg: 0 12px 28px rgba(0,0,0,0.18)
--elevation-xl: 0 20px 40px rgba(0,0,0,0.22)
```

**Action Required:**
- Old shadow variables still work for backward compatibility
- Migrate to new `--elevation-*` variables for semantic clarity
- Brand shadows unchanged (`--shadow-brand-red`, etc.)

#### Transition Changes

**Old:**
```css
--duration-instant: 100ms
--duration-fast: 200ms
--duration-base: 300ms
--duration-slow: 400ms
--duration-slower: 600ms

--timing-ease-out: cubic-bezier(0, 0, 0.2, 1)
```

**New (Expanded):**
```css
--duration-xxs: 150ms
--duration-xs: 200ms
--duration-sm: 300ms     /* RENAMED from --duration-base */
--duration-md: 400ms
--duration-lg: 500ms
--duration-xl: 600ms
--duration-xxl: 700ms
--duration-xxxl: 800ms
--duration-max: 900ms

--timing-ease-out: cubic-bezier(0.16, 1, 0.3, 1)  /* UPDATED - better feel */
```

**Action Required:**
- `--duration-base` → Update to `--duration-sm`
- `--duration-fast` → Update to `--duration-xs`
- Old timing function updated - animations may feel slightly different
- Test all animations after migration

---

## TypeScript Type Updates

### New Types in 2.0.1

```typescript
// Updated in spacing.ts
export type BorderRadius = typeof borderRadius;
export type Shadows = typeof shadows;
export type Transitions = typeof transitions;

// New tokens accessible via:
import { borderRadius, shadows, transitions } from '@/design-system';

// Example:
borderRadius.xs    // '2.5px'
borderRadius.sm    // '5px'
borderRadius.md    // '10px'
shadows.md         // '0 4px 12px rgba(0,0,0,0.12)'
shadows.brand.red  // Red-tinted shadow
transitions.duration.sm        // '300ms'
transitions.timing.easeOut     // 'cubic-bezier(0.16, 1, 0.3, 1)'
```

---

## CSS Variable Reference

### Complete List of New Variables (2.0.1)

```css
/* Border Radius */
--radius-xs: 2.5px;
--radius-sm: 5px;
--radius-md: 10px;
--radius-lg: 15px;
--radius-xl: 20px;
--radius-full: 9999px;

/* Elevation */
--elevation-flat: none;
--elevation-xs: 0 1px 2px rgba(0,0,0,0.08);
--elevation-sm: 0 1px 2px rgba(0,0,0,0.08);
--elevation-md: 0 4px 12px rgba(0,0,0,0.12);
--elevation-lg: 0 12px 28px rgba(0,0,0,0.18);
--elevation-xl: 0 20px 40px rgba(0,0,0,0.22);

/* Brand Shadows (unchanged) */
--shadow-brand-red: 0 10px 15px -3px rgba(176, 31, 36, 0.1), 0 4px 6px -4px rgba(176, 31, 36, 0.1);
--shadow-brand-red-hover: 0 20px 25px -5px rgba(176, 31, 36, 0.15), 0 8px 10px -6px rgba(176, 31, 36, 0.1);
--shadow-brand-periwinkle: 0 10px 15px -3px rgba(167, 171, 240, 0.1), 0 4px 6px -4px rgba(167, 171, 240, 0.1);

/* Transitions - Duration */
--duration-xxs: 150ms;
--duration-xs: 200ms;
--duration-sm: 300ms;
--duration-md: 400ms;
--duration-lg: 500ms;
--duration-xl: 600ms;
--duration-xxl: 700ms;
--duration-xxxl: 800ms;
--duration-max: 900ms;

/* Transitions - Timing */
--timing-ease-out: cubic-bezier(0.16, 1, 0.3, 1);
--timing-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

---

## Files Updated in 2.0.1

1. `/design-system/spacing.ts` - TypeScript token definitions
2. `/src/styles/theme.css` - CSS variable declarations
3. `/design-system/README.md` - Documentation
4. `/design-system/CHANGELOG.md` - This file

---

**Version:** 2.0.1  
**Release Date:** January 23, 2026  
**Breaking Changes:** None (backward compatible)  
**Migration Required:** Optional (recommended for semantic clarity)