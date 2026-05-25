# SectionLabel Component Guide

## 📦 Component Overview

The `SectionLabel` component is a label identifier that follows the GitHub repo design system pattern. It supports two styles:

1. **Text Style** - Plain text labels (CHAPTER, CASE STUDY, CHALLENGES)
2. **Pill Style** - Outlined pill shape with shimmer effect (STEP 1, OBJECTIVE 01)

**File Location:** `/src/design-system/components/SectionLabel.tsx`

---

## ✅ Design System Patterns

### Pattern 1: Plain Text Labels
```tsx
// Original pattern (before component)
<p className="text-[0.688rem] font-semibold tracking-[0.2em] uppercase text-[#b01f24] mb-4">
  CHAPTER 1 - INDUSTRY ANALYSIS
</p>
```

### Pattern 2: Pill Labels (STEP 1, OBJECTIVE 01)
```tsx
// Outlined pill with shimmer effect
<div className="inline-block rounded-full border border-gray-300 px-6 py-2.5">
  <span className="text-[0.688rem] font-semibold tracking-[0.2em] uppercase">
    STEP 1
  </span>
</div>
```

**Typography Specifications:**
- Font size: `0.8rem` (12.8px) - **Design System Token: `--text-xs`**
- Font weight: `600` (semibold) - DM Sans
- Letter spacing: `0.2em` (wide tracking)
- Text transform: `uppercase`
- Font family: DM Sans (explicit `font-sans` class)

---

## 🔤 Typography Deep Dive

### Font Family: DM Sans

The SectionLabel component explicitly uses **DM Sans** via the `font-sans` utility class. This aligns with the Design System VS 26 typography hierarchy:

```tsx
// Applied to both text and pill styles
className="font-sans ..."
```

**Why DM Sans?**
- **UI Elements**: Labels are functional UI components, not editorial content
- **Legibility**: DM Sans optimized for small sizes (11px) with excellent readability
- **Variable Font**: Supports weights 100-1000 with optical sizing
- **Design System Rule**: Body text and UI = DM Sans, Editorial headings = Noto Serif

### Font Features (from theme.css)

The `.font-sans` class includes these optimizations:

```css
.font-sans {
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', ...;
  font-optical-sizing: auto;          /* Adjusts for 12.8px size */
  font-weight: 400;                   /* Default (overridden by semibold) */
  font-feature-settings: 
    'kern' 1,                         /* Kerning enabled */
    'liga' 1,                         /* Ligatures enabled */
    'calt' 1,                         /* Contextual alternates */
    'tnum' 0,                         /* Proportional numbers */
    'lnum' 1;                         /* Lining numbers */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
```

### Typography Token Mapping

According to Design System VS 26 (theme.css line 11):

```css
--text-xs: 0.8rem;      /* 12.8px - Labels, metadata */
```

**SectionLabel correctly uses the design system token:**
- Size: `0.8rem` (12.8px) = `--text-xs`
- Purpose: Labels and metadata (per design system)
- Context: Distinct from body text (16px = `--text-sm`)

### Letter Spacing Strategy

```tsx
tracking-[0.2em]  // 20% of font size = 2.2px spacing
```

**Why 0.2em?**
- Improves readability at small sizes
- Creates visual hierarchy (labels feel "lighter")
- Standard for all-caps UI text in design systems
- Matches the existing codebase pattern

### Weight Hierarchy

```tsx
font-semibold  // 600 weight
```

**Design Decision:**
- **Not Bold (700)**: Too heavy for 11px text
- **Not Medium (500)**: Not enough distinction from body text
- **Semibold (600)**: Perfect balance for labels

---

## 🎨 Usage Examples

### 1. **Text Style - Dark Background** (Hero Section, Case Studies)

```tsx
import { SectionLabel } from '../../design-system/components/SectionLabel';

// Basic label on dark background
<SectionLabel background="dark">
  CASE STUDY
</SectionLabel>

// With pulse animation (status indicator)
<SectionLabel background="dark" pulse>
  New Report Available
</SectionLabel>

// With icon
<SectionLabel background="dark" icon={<Sparkles className="h-3.5 w-3.5" />}>
  Premium Content
</SectionLabel>
```

**Visual Output:**
- Text color: `text-white/80` (semi-transparent white)
- Pulse color: `#ff6b6b` (coral red for visibility)
- Use case: Hero sections, dark cards, modals

---

### 2. **Text Style - Light Background** (Content Sections)

```tsx
// Basic label on light background
<SectionLabel background="light">
  CHALLENGES
</SectionLabel>

// With accent color (red)
<SectionLabel background="light" variant="accent">
  CHAPTER 1 - INDUSTRY ANALYSIS
</SectionLabel>

// With icon
<SectionLabel background="light" icon={<FileText className="h-3.5 w-3.5" />}>
  Research Methodology
</SectionLabel>
```

**Visual Output:**
- Default text color: `text-[#737373]` (neutral gray)
- Accent text color: `text-[#b01f24]` (Ken Bold Red)
- Pulse color: `#b01f24` (brand red)
- Use case: White sections, light gray backgrounds

---

### 3. **Pill Style - Light Background** (Steps, Objectives)

```tsx
// Basic pill on light background
<SectionLabel style="pill" background="light">
  STEP 1
</SectionLabel>

// With accent color (red border)
<SectionLabel style="pill" background="light" variant="accent">
  OBJECTIVE 01
</SectionLabel>
```

**Visual Output:**
- Text color: `text-[#737373]` (neutral gray)
- Border color: `border-[#737373]/30`
- Accent border: `border-[#b01f24]/30` (red)
- Shimmer effect: Subtle horizontal sweep (2s loop, 1s delay)
- Shape: Rounded-full pill with `px-6 py-2.5` padding
- Use case: Step indicators, methodology sections, numbered objectives

---

### 4. **Pill Style - Dark Background** (Dark Cards)

```tsx
// Basic pill on dark background
<SectionLabel style="pill" background="dark">
  PHASE 1
</SectionLabel>

// With accent color
<SectionLabel style="pill" background="dark" variant="accent">
  STEP 2
</SectionLabel>
```

**Visual Output:**
- Text color: `text-white/80`
- Border color: `border-white/20`
- Accent border: `border-[#ff6b6b]/30` (coral)
- Shimmer effect: White glow sweep
- Use case: Dark-themed methodology sections, dark cards

---

## 📋 Component API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | **required** | Label text content |
| `background` | `'dark' \| 'light'` | `'light'` | Background context (determines text color) |
| `variant` | `'default' \| 'accent'` | `'default'` | Visual variant (accent = red color) |
| `icon` | `ReactNode` | `undefined` | Optional Lucide icon element |
| `pulse` | `boolean` | `false` | Enable pulsing dot animation |
| `className` | `string` | `''` | Additional CSS classes |
| `style` | `'text' \| 'pill'` | `'text'` | Label style (text or pill) |

---

## 🎯 Real-World Examples

### Example 1: Hero Section Status Label

```tsx
<SectionLabel background="dark" pulse>
  New Report Available
</SectionLabel>
```

**Output:**
- White/80 text
- Coral pulsing dot
- Uppercase, wide tracking

---

### Example 2: Chapter Label (Report Preview)

```tsx
<SectionLabel background="light" variant="accent">
  CHAPTER 1 - INDUSTRY ANALYSIS
</SectionLabel>
```

**Output:**
- Ken Bold Red (`#b01f24`)
- No icon or pulse
- Used in report chapter headings

---

### Example 3: Section Label with Icon

```tsx
import { Database } from 'lucide-react';

<SectionLabel background="light" icon={<Database className="h-3.5 w-3.5" />}>
  Data Collection
</SectionLabel>
```

**Output:**
- Gray text (`#737373`)
- Database icon (3.5 × 3.5)
- Horizontal layout with gap

---

### Example 4: Dark Card Section Label

```tsx
<SectionLabel background="dark">
  CASE STUDY
</SectionLabel>
```

**Output:**
- White/80 text
- No icon or pulse
- Used in dark-themed cards

---

### Example 5: Pill Label with Accent

```tsx
<SectionLabel style="pill" background="light" variant="accent">
  OBJECTIVE 01
</SectionLabel>
```

**Output:**
- Gray text (`#737373`)
- Red border (`#b01f24`)
- Shimmer effect
- Used in step indicators

---

### Example 6: Pill Label on Dark Background

```tsx
<SectionLabel style="pill" background="dark">
  PHASE 1
</SectionLabel>
```

**Output:**
- White/80 text
- White border (`#ffffff/20`)
- Shimmer effect
- Used in dark-themed methodology sections

---

## 🎨 Color System

### Dark Background Colors
```tsx
{
  default: "text-white/80",      // Semi-transparent white
  accent: "text-[#ff6b6b]",      // Coral red (warm)
  pulse: "#ff6b6b"               // Coral dot
}
```

### Light Background Colors
```tsx
{
  default: "text-[#737373]",     // Neutral gray
  accent: "text-[#b01f24]",      // Ken Bold Red
  pulse: "#b01f24"               // Brand red dot
}
```

---

## ⚡ Animation Details

### Pulse Animation
When `pulse={true}`:
- Two-layer dot: solid core + expanding ring
- Duration: 2 seconds (infinite loop)
- Scale: 1 → 1.5 → 1
- Opacity: 0.75 → 0 → 0.75
- Easing: `easeInOut`

```tsx
// Pulse structure
<motion.span className="relative flex h-2.5 w-2.5">
  {/* Expanding ring */}
  <motion.span 
    animate={{
      scale: [1, 1.5, 1],
      opacity: [0.75, 0, 0.75],
    }}
    transition={{ duration: 2, repeat: Infinity }}
  />
  {/* Solid core */}
  <span className="h-2.5 w-2.5 rounded-full" />
</motion.span>
```

---

## 🔄 Migration Guide

### Before (Manual Implementation)
```tsx
<p className="text-[0.688rem] font-semibold tracking-[0.2em] uppercase text-[#b01f24] mb-4">
  CHAPTER 1 - INDUSTRY ANALYSIS
</p>
```

### After (Component)
```tsx
<SectionLabel background="light" variant="accent" className="mb-4">
  CHAPTER 1 - INDUSTRY ANALYSIS
</SectionLabel>
```

---

## ✅ Design System Compliance Checklist

- [x] Typography: 0.8rem (12.8px) = `--text-xs` token, semibold (600), 0.2em tracking, uppercase
- [x] Font family: DM Sans with explicit `font-sans` class
- [x] Variable font features: Optical sizing, kerning, ligatures enabled
- [x] Color hierarchy: 92% neutral, 5% warm, 3% purple (respect hierarchy)
- [x] Accessibility: Proper color contrast ratios
- [x] Responsive: Works on all screen sizes
- [x] Motion: Smooth animations with `prefers-reduced-motion` support
- [x] Reusable: Single source of truth for section labels

---

## 📍 Where to Use

### ✅ **Appropriate Use Cases:**
1. Section identifiers ("CASE STUDY", "CHALLENGES")
2. Chapter labels ("CHAPTER 1 - INDUSTRY ANALYSIS")
3. Status indicators ("New Report Available")
4. Category labels ("RESEARCH METHODOLOGY")
5. Step labels ("STEP 1", "STEP 2")

### ❌ **Avoid Using For:**
1. Body text (use `<p>` with proper text classes)
2. Navigation links (use `InlineLink` or buttons)
3. Card titles (use heading tags)
4. Form labels (use semantic `<label>` elements)

---

## 🎯 Examples in Current Codebase

### HeroSection.tsx
```tsx
<SectionLabel background="dark" pulse>
  New Report Available
</SectionLabel>
```

### SampleReportPreview.tsx (to be migrated)
```tsx
// Current
<p className="text-[0.688rem] font-semibold tracking-[0.2em] uppercase text-[#b01f24] mb-4">
  CHAPTER 1 - INDUSTRY ANALYSIS
</p>

// Should be
<SectionLabel background="light" variant="accent" className="mb-4">
  CHAPTER 1 - INDUSTRY ANALYSIS
</SectionLabel>
```

### ExtendedTOC.tsx (to be migrated)
```tsx
// Current
<p className="text-[0.688rem] font-semibold tracking-[0.2em] uppercase text-[#b01f24] mb-4">
  CHAPTER 9 - TABLE OF CONTENTS
</p>

// Should be
<SectionLabel background="light" variant="accent" className="mb-4">
  CHAPTER 9 - TABLE OF CONTENTS
</SectionLabel>
```

---

## 🔧 Customization

### Adding Custom Styling
```tsx
<SectionLabel 
  background="dark" 
  className="mb-6 opacity-90"
>
  CUSTOM SECTION
</SectionLabel>
```

### Icon Sizing
```tsx
import { Sparkles } from 'lucide-react';

// Standard size (3.5 × 3.5)
<SectionLabel background="dark" icon={<Sparkles className="h-3.5 w-3.5" />}>
  Premium
</SectionLabel>

// Custom size
<SectionLabel background="dark" icon={<Sparkles className="h-4 w-4" />}>
  Larger Icon
</SectionLabel>
```

---

## 📝 Notes

1. **Icon vs Pulse:** You cannot use both `icon` and `pulse` together. Pulse takes priority.
2. **Background Context:** Always specify the correct `background` prop based on the section's background color.
3. **Accent Variant:** Use `variant="accent"` sparingly - it's meant for important hierarchical labels like chapter headings.
4. **Motion Package:** Component uses `motion/react` for animations (already installed).

---

## 🚀 Future Enhancements

Potential additions based on user feedback:
- [ ] Size variants (sm, md, lg)
- [ ] Additional color variants (purple, periwinkle)
- [ ] Animation timing customization
- [ ] RTL support
- [ ] Tooltip integration

---

**Last Updated:** 2026-02-16  
**Component Version:** 1.0.0  
**Design System:** VS26