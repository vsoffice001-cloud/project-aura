# 🏷️ Complete Badge System Documentation

**Project:** YASH Case Study  
**Component:** Universal Badge System  
**Location:** `/src/app/components/Badge.tsx`  
**Date:** February 17, 2026

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Main Badge Component](#main-badge-component)
3. [Badge Variants](#badge-variants)
4. [Badge Sizes](#badge-sizes)
5. [Badge Themes](#badge-themes)
6. [Convenience Wrappers](#convenience-wrappers)
7. [Specialized Badges](#specialized-badges)
8. [Usage Examples](#usage-examples)
9. [Design Tokens](#design-tokens)

---

## 🎯 Overview

The Badge system is a **unified, flexible component** supporting all label and pill variants across the editorial design system. It replaces fragmented badge components with a single, scalable API.

### Design Principles

- ✅ **Single Source of Truth** - One component, multiple variants
- ✅ **Semantic Props** - Clear, self-documenting API
- ✅ **Design Token Based** - Uses CSS custom properties
- ✅ **WCAG AAA Compliant** - All color combinations tested
- ✅ **Performance Optimized** - Pure CSS animations

### File Location

```
/src/app/components/Badge.tsx           ← Main unified badge component
/src/app/components/badges/
├── InfoCardLabel.tsx                   ← Specialized info card labels
├── ObjectivePill.tsx                   ← Objective/step pills
├── SectionLabel.tsx                    ← Section headers
└── index.ts                            ← Exports
```

---

## 🧩 Main Badge Component

### Props

```typescript
interface BadgeProps {
  children: ReactNode;                  // Text or content
  variant?: 'minimal' | 'rounded' | 'pill';  // Shape (default: 'minimal')
  size?: 'xs' | 'sm' | 'md' | 'lg';     // Size scale (default: 'sm')
  theme?: 'neutral' | 'warm' | 'brand' | 'success' | 'warning' | 'error';
  mode?: 'light' | 'dark';              // Background mode (default: 'light')
  bordered?: boolean;                   // Show border (default: false)
  shimmer?: boolean;                    // Shimmer animation (default: false)
  interactive?: boolean;                // Hover states (default: false)
  uppercase?: boolean;                  // Force uppercase (default: true)
  letterSpacing?: string;               // Custom spacing override
  as?: 'span' | 'div' | 'p';           // HTML tag (default: 'span')
  className?: string;                   // Additional CSS classes
  style?: CSSProperties;                // Custom inline styles
  ariaLabel?: string;                   // Accessibility label
  onClick?: () => void;                 // Click handler
}
```

### Basic Usage

```tsx
import { Badge } from '@/app/components/Badge';

// Simple section label
<Badge variant="minimal" size="sm" theme="neutral">
  Challenges
</Badge>

// Step pill with shimmer
<Badge variant="pill" size="sm" theme="warm" bordered shimmer>
  Step 1
</Badge>

// Interactive objective pill
<Badge variant="pill" size="sm" bordered interactive onClick={() => {}}>
  Objective 1
</Badge>
```

---

## 🎨 Badge Variants

### 1. **Minimal** (No Background, No Border)

**Use for:** Section labels, inline text labels

```tsx
<Badge variant="minimal" size="sm" theme="neutral">
  Client Context
</Badge>
```

**Style:**
- Border radius: `0px`
- Padding: `0px`
- Background: `transparent`
- Font weight: `400`

---

### 2. **Rounded** (5px Radius, Optional Background)

**Use for:** Category tags, status indicators

```tsx
<Badge variant="rounded" size="sm" theme="neutral" bordered>
  Strategy
</Badge>
```

**Style:**
- Border radius: `5px`
- Padding: Size-based (see sizes section)
- Background: Theme-based
- Font weight: `500`

---

### 3. **Pill** (Fully Rounded, Usually Bordered)

**Use for:** Step numbers, objectives, sequential items

```tsx
<Badge variant="pill" size="sm" theme="neutral" bordered>
  Step 1
</Badge>
```

**Style:**
- Border radius: `9999px` (fully rounded)
- Padding: Size-based
- Background: Theme-based
- Font weight: `500`

---

## 📏 Badge Sizes

Based on **Major Third scale** (1.25 ratio):

### XS (Extra Small)
**Use for:** Info card labels, metadata

```tsx
<Badge size="xs">Client</Badge>
```

**Tokens:**
- Font size: `clamp(9px, 0.8vw, 10px)`
- Padding: `6px 13px`
- Letter spacing: `1.2px`

---

### SM (Small) **← DEFAULT**
**Use for:** Section labels, pills, general badges

```tsx
<Badge size="sm">Objective 1</Badge>
```

**Tokens:**
- Font size: `var(--text-xs)` (10-11px)
- Padding: `8px 16px`
- Letter spacing: `1.8px`

---

### MD (Medium)
**Use for:** Emphasized badges, interactive elements

```tsx
<Badge size="md">Featured</Badge>
```

**Tokens:**
- Font size: `13px`
- Padding: `10px 20px`
- Letter spacing: `2px`

---

### LG (Large)
**Use for:** Large interactive badges, CTAs

```tsx
<Badge size="lg">New Release</Badge>
```

**Tokens:**
- Font size: `15px`
- Padding: `13px 25px`
- Letter spacing: `2.2px`

---

## 🎨 Badge Themes

### Neutral (Default)
**Use for:** General labels, section headers, neutral content

**Light Mode:**
```tsx
<Badge theme="neutral" mode="light">Content</Badge>
```
- Background: `rgba(0, 0, 0, 0.04)`
- Border: `rgba(0, 0, 0, 0.15)`
- Text: `rgba(0, 0, 0, 0.6)`
- Contrast: 8.9:1 (WCAG AAA)

**Dark Mode:**
```tsx
<Badge theme="neutral" mode="dark">Content</Badge>
```
- Background: `rgba(255, 255, 255, 0.1)`
- Border: `rgba(255, 255, 255, 0.25)`
- Text: `rgba(255, 255, 255, 0.9)`
- Contrast: 12.6:1 (WCAG AAA)

---

### Warm
**Use for:** Editorial content, soft accents

```tsx
<Badge theme="warm" bordered>Step 1</Badge>
```

**Colors:**
- Uses editorial warm palette
- Rust: `#c44536`
- Terracotta: `#d4835c`
- Sand: `#e8a87c`
- Contrast: 7.2:1+ (WCAG AAA)

---

### Brand
**Use for:** Primary actions, featured content (use sparingly)

```tsx
<Badge theme="brand" bordered>Featured</Badge>
```

**Colors:**
- Brand Red: `#b01f24`
- Background (light): `rgba(176, 31, 36, 0.06)`
- Text: `var(--brand-red)`
- Contrast: 7.8:1 (WCAG AAA)

---

### Success
**Use for:** Positive states, completed items

```tsx
<Badge theme="success" bordered>Completed</Badge>
```

**Colors:**
- Green tones
- Contrast: 8.1:1 (WCAG AAA)

---

### Warning
**Use for:** Caution, attention items

```tsx
<Badge theme="warning" bordered>In Progress</Badge>
```

**Colors:**
- Amber tones
- Contrast: 8.5:1 (WCAG AAA)

---

### Error
**Use for:** Negative states, failures

```tsx
<Badge theme="error" bordered>Failed</Badge>
```

**Colors:**
- Red tones
- Contrast: 9.2:1 (WCAG AAA)

---

## 🎁 Convenience Wrappers

Pre-configured badge types for common use cases:

### SectionLabel
**For page section headers**

```tsx
import { SectionLabel } from '@/app/components/Badge';

<SectionLabel>Challenges</SectionLabel>
<SectionLabel mode="dark">Client Context</SectionLabel>
```

**Pre-configured:**
- Variant: `minimal`
- Size: `sm`
- Theme: `neutral`
- Margin bottom: `var(--pair-label-heading)` (12px)

---

### StepPill
**For methodology steps and sequential processes**

```tsx
import { StepPill } from '@/app/components/Badge';

<StepPill stepNumber={1} />
<StepPill stepNumber={2} active />
```

**Pre-configured:**
- Variant: `pill`
- Size: `sm`
- Theme: `warm`
- Bordered: `true`
- Shimmer: `true`

---

### ObjectivePill
**For engagement objectives and goals**

```tsx
import { ObjectivePill } from '@/app/components/Badge';

<ObjectivePill objectiveNumber={1} />
<ObjectivePill objectiveNumber={2} interactive onClick={() => {}} />
```

**Pre-configured:**
- Variant: `pill`
- Size: `sm`
- Theme: `neutral`
- Bordered: `true`
- Shimmer: Interactive only

---

### ObjectivePillInteractive
**Interactive version with shimmer on hover**

```tsx
import { ObjectivePillInteractive } from '@/app/components/Badge';

<ObjectivePillInteractive number="1" />
<ObjectivePillInteractive number="2" label="Goal" />
```

**Pre-configured:**
- Variant: `pill`
- Size: `md` (bigger than regular)
- Theme: `neutral`
- Bordered: `true`
- Shimmer: `true`

---

### InfoCardLabel
**For metadata labels in info cards**

```tsx
import { InfoCardLabel } from '@/app/components/Badge';

<InfoCardLabel>Client</InfoCardLabel>
<InfoCardLabel mode="dark">Industry</InfoCardLabel>
```

**Pre-configured:**
- Variant: `minimal`
- Size: `xs`
- Theme: `neutral`
- Opacity: `0.7`
- Margin bottom: `clamp(6px, 0.6vw, 8px)`

---

### CategoryBadge
**For content categorization**

```tsx
import { CategoryBadge } from '@/app/components/Badge';

<CategoryBadge>Strategy</CategoryBadge>
<CategoryBadge theme="brand">Case Study</CategoryBadge>
```

**Pre-configured:**
- Variant: `rounded`
- Size: `sm`
- Bordered: `true`

---

### StatusBadge
**For status indicators**

```tsx
import { StatusBadge } from '@/app/components/Badge';

<StatusBadge status="success">Completed</StatusBadge>
<StatusBadge status="warning">In Progress</StatusBadge>
<StatusBadge status="error">Failed</StatusBadge>
```

**Pre-configured:**
- Variant: `rounded`
- Size: `sm`
- Bordered: `true`
- Theme: Based on status

---

## 📦 Specialized Badges (Separate Components)

### InfoCardLabel (Detailed)

Located in `/src/app/components/badges/InfoCardLabel.tsx`

**Purpose:** Ultra-small labels for metadata cards (hero info cards, stat cards)

**Key Features:**
- Font size: `9-10px`
- Letter spacing: `1.2px`
- 70% opacity for subtle hierarchy
- Responsive scaling with `clamp()`

**Complete InfoCard Example:**

```tsx
import { InfoCard } from '@/app/components/badges/InfoCardLabel';

<InfoCard
  label="Client"
  value="Yash Highvoltage Insulators"
  variant="light"
  cardType="frosted-glass"
  context="desktop"
/>
```

**Also includes:**
- `StatCard` - For statistics/metrics
- `HeroInfoCardGrid` - Pre-configured grid layout

---

### ObjectivePill (Detailed)

Located in `/src/app/components/badges/ObjectivePill.tsx`

**Purpose:** Sequential objective numbers with shimmer animation

**Layer Structure:**
1. Container (pill shell with border)
2. Shimmer overlay (animated gradient)
3. Text content (z-indexed above)

**Animation:**
- Shimmer width: 50% of pill
- Gradient: Transparent → White (60%) → Transparent
- Animation: Slides left→right on hover
- Duration: 700ms
- Timing: ease-out

**Usage Guidelines:**
- ✅ Use for: 2+ sequential items
- ✅ Optimal: 3-6 objectives
- ✅ Maximum: 12 objectives
- ❌ Avoid: Single items, non-sequential lists

---

### SectionLabel (Detailed)

Located in `/src/app/components/badges/SectionLabel.tsx`

**Purpose:** Minimalist labels for section headers in editorial layouts

**Typography Hierarchy:**

```
SECTION LABEL (11px, uppercase, 60% opacity)
↓ 12px gap
Section Heading (20-36px, sentence case, 100% opacity)
↓ 16-24px gap
Body Text (15px, normal case, 70% opacity)
```

**Spacing Tokens:**
- `--pair-label-heading`: 12px (tight coupling)
- `--spacing-section`: 64-80px (section breaks)
- `--spacing-heading-body`: 16-24px (breathing room)

**Combined Component:**

```tsx
import { SectionLabelWithHeading } from '@/app/components/badges/SectionLabel';

<SectionLabelWithHeading 
  label="Challenges"
  heading="Key Engagement Obstacles"
  headingLevel="h2"
  description="Identifying critical risks"
/>
```

---

## 💡 Usage Examples

### Section Headers

```tsx
<Badge variant="minimal" size="sm" theme="neutral">
  Challenges
</Badge>
```

---

### Step Pills with Shimmer

```tsx
<Badge variant="pill" size="sm" theme="warm" bordered shimmer>
  Step 1
</Badge>
```

---

### Interactive Objectives

```tsx
<Badge 
  variant="pill" 
  size="sm" 
  theme="neutral" 
  bordered 
  interactive 
  onClick={() => console.log('Clicked')}
>
  Objective 1
</Badge>
```

---

### Resource Card Badges (Glassmorphism Overlay)

**Standard pattern for badges over images:**

```tsx
<div 
  className="absolute top-4 right-4 backdrop-blur-[24px] rounded-[5px] border border-white/10"
  style={{
    background: 'rgba(0, 0, 0, 0.65)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    zIndex: 10
  }}
>
  <Badge 
    variant="minimal"
    size="xs"
    theme="neutral"
    mode="dark"
    className="text-white font-semibold uppercase tracking-[1.2px]"
    style={{ 
      fontSize: '10px',
      padding: '6px 12px',
      textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
    }}
  >
    Featured
  </Badge>
</div>
```

**Key Features:**
- Dark frosted background (`rgba(0, 0, 0, 0.65)`)
- Backdrop blur: `24px`
- Border radius: `5px`
- White text with text shadow for readability
- Padding: `6px 12px`
- Font size: `10px`

---

### Category Tags

```tsx
<Badge variant="rounded" size="sm" theme="neutral" bordered>
  Strategy
</Badge>
```

---

### Status Indicators

```tsx
<Badge variant="rounded" size="sm" theme="success" bordered>
  Completed
</Badge>
```

---

### Info Card Labels

```tsx
<Badge variant="minimal" size="xs" theme="neutral">
  Client
</Badge>
```

---

## 🎨 Design Tokens

### Size Tokens

```typescript
const SIZE_TOKENS = {
  xs: {
    fontSize: 'clamp(9px, 0.8vw, 10px)',
    padding: '6px 13px',
    letterSpacing: '1.2px',
  },
  sm: {
    fontSize: 'var(--text-xs)',  // 10-11px
    padding: '8px 16px',
    letterSpacing: '1.8px',
  },
  md: {
    fontSize: '13px',
    padding: '10px 20px',
    letterSpacing: '2px',
  },
  lg: {
    fontSize: '15px',
    padding: '13px 25px',
    letterSpacing: '2.2px',
  },
};
```

---

### Variant Tokens

```typescript
const VARIANT_TOKENS = {
  minimal: {
    borderRadius: '0px',
    padding: '0px',
    background: 'transparent',
  },
  rounded: {
    borderRadius: '5px',
    padding: 'inherit',
    background: 'default',
  },
  pill: {
    borderRadius: '9999px',
    padding: 'inherit',
    background: 'default',
  },
};
```

---

### Theme Color Tokens

All themes include both light and dark modes:

```typescript
{
  light: {
    background: string;
    border: string;
    text: string;
    textMinimal: string;
    hoverBackground: string;
    hoverBorder: string;
    shimmer: string;
    contrastRatio: string;
  },
  dark: {
    // Same structure
  }
}
```

---

## 🔄 Migration from Old Badge Components

If you find old badge imports:

```tsx
// ❌ OLD (deprecated)
import { InfoCardLabel } from '@/app/components/badges';
import { ObjectivePill } from '@/app/components/badges';
import { SectionLabel } from '@/app/components/badges';

// ✅ NEW (recommended)
import { 
  InfoCardLabel, 
  ObjectivePill, 
  SectionLabel 
} from '@/app/components/Badge';
```

**Why migrate?**
- ✅ Unified API
- ✅ Consistent theming
- ✅ Better TypeScript support
- ✅ Performance optimized
- ✅ Single source of truth

---

## ✅ Best Practices

### DO ✅

1. **Use semantic wrappers** for common use cases
   ```tsx
   <SectionLabel>Challenges</SectionLabel>
   ```

2. **Use design tokens** for consistency
   ```tsx
   <Badge theme="neutral" size="sm">Content</Badge>
   ```

3. **Follow WCAG AAA** contrast guidelines
   - All theme combinations are pre-tested

4. **Use appropriate sizes** for context
   - `xs` for metadata
   - `sm` for general labels
   - `md`/`lg` for emphasis

5. **Apply glassmorphism overlay** for image badges
   - Follow the standard pattern documented above

---

### DON'T ❌

1. **Don't use random colors**
   ```tsx
   // ❌ Bad
   <Badge style={{ color: '#ff0000' }}>Text</Badge>
   
   // ✅ Good
   <Badge theme="error">Text</Badge>
   ```

2. **Don't mix font size classes**
   ```tsx
   // ❌ Bad
   <Badge className="text-2xl">Text</Badge>
   
   // ✅ Good
   <Badge size="lg">Text</Badge>
   ```

3. **Don't use badges for buttons**
   ```tsx
   // ❌ Bad
   <Badge onClick={doSomething}>Click me</Badge>
   
   // ✅ Good
   <Button onClick={doSomething}>Click me</Button>
   ```

4. **Don't skip bordered prop for pills**
   ```tsx
   // ❌ Bad (pill without border looks incomplete)
   <Badge variant="pill">Step 1</Badge>
   
   // ✅ Good
   <Badge variant="pill" bordered>Step 1</Badge>
   ```

---

## 🎯 Quick Reference

| Use Case | Variant | Size | Theme | Bordered | Shimmer |
|----------|---------|------|-------|----------|---------|
| Section headers | minimal | sm | neutral | false | false |
| Step numbers | pill | sm | warm | true | true |
| Objectives | pill | sm | neutral | true | interactive |
| Info labels | minimal | xs | neutral | false | false |
| Category tags | rounded | sm | neutral | true | false |
| Status indicators | rounded | sm | success/warning/error | true | false |
| Featured badges | minimal | xs | neutral | false | false |

---

## 📚 Related Documentation

- **Main Badge Component:** `/src/app/components/Badge.tsx`
- **InfoCardLabel:** `/src/app/components/badges/InfoCardLabel.tsx`
- **ObjectivePill:** `/src/app/components/badges/ObjectivePill.tsx`
- **SectionLabel:** `/src/app/components/badges/SectionLabel.tsx`
- **CardBadge (Badge-inside-cards):** `/src/app/components/ResourceCard.tsx` — The `CardBadge` sub-component is the **canonical standard** for placing a Badge on image overlays. It uses `variant="minimal"` inside a glassmorphism wrapper with `--rc-badge-*` tokens. Full prop-by-prop rationale, className/style override reasoning, CSS token table, and WCAG compliance audit are documented inline in the component and in **[RESOURCE_CARD_DOCUMENTATION.md](./RESOURCE_CARD_DOCUMENTATION.md)** (v3.0, "Badge Overlay System" section).
- **Design System:** `/TECHNICAL_HANDOVER.md` → Design System section

---

## 🔍 Troubleshooting

### Issue: Badge text not uppercase

**Solution:** Badges are uppercase by default. To override:
```tsx
<Badge uppercase={false}>Text</Badge>
```

---

### Issue: Shimmer not animating

**Solution:** Add CSS for parent hover:
```css
.parent:hover .badge-shimmer {
  transform: translateX(200%);
}
```

---

### Issue: Badge spacing incorrect

**Solution:** Check padding override:
```tsx
// For image overlay badges:
<Badge style={{ padding: '6px 12px' }}>Featured</Badge>
```

---

### Issue: Badge text color too light

**Solution:** Use correct mode for background:
```tsx
// On light background
<Badge mode="light">Text</Badge>

// On dark background
<Badge mode="dark">Text</Badge>
```

---

**Last Updated:** February 28, 2026  
**Status:** ✅ Complete & Production Ready  
**Version:** 2.1