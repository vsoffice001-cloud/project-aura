# Resource Card & Resources Section - Design System Documentation

**Component:** `ResourceCard` + `ResourcesSection`  
**Location:** `/src/app/components/ResourceCard.tsx` & `/src/app/components/ResourcesSection.tsx`  
**Version:** 3.0 - Token-Driven, Dual-Mode, Production Ready  
**Last Updated:** February 28, 2026

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [File Structure](#file-structure)
3. [Image Aspect Ratio Standard](#image-aspect-ratio-standard)
4. [ResourceCard Component](#resourcecard-component)
   - [Exported Types](#exported-types)
   - [Props API](#props-api)
   - [Content Variants](#content-variants)
   - [Card Styles](#card-styles)
   - [Color Modes](#color-modes)
   - [Mode + Style Matrix](#mode--style-matrix)
5. [ResourcesSection Component](#resourcessection-component)
   - [Props API](#resourcessection-props-api)
   - [Layout System](#layout-system)
   - [Background Layers](#background-layers)
   - [Section Header](#section-header)
6. [Badge Overlay System (CardBadge)](#badge-overlay-system-cardbadge)
   - [Why CardBadge Exists](#why-cardbadge-exists)
   - [Wrapper Container](#wrapper-container)
   - [Badge Configuration](#badge-configuration)
   - [Prop-by-Prop Rationale](#prop-by-prop-rationale)
   - [className Overrides](#classname-overrides)
   - [style Overrides](#style-overrides)
   - [WCAG Compliance Audit](#wcag-compliance-audit)
   - [When to Use CardBadge](#when-to-use-cardbadge)
   - [How to Add a New Badge Label](#how-to-add-a-new-badge-label)
7. [CSS Custom Properties (Token Table)](#css-custom-properties-token-table)
   - [Shape Tokens](#shape-tokens)
   - [Spacing Tokens](#spacing-tokens)
   - [Dark Mode Tokens](#dark-mode-tokens)
   - [Light Mode Tokens](#light-mode-tokens)
   - [Badge Overlay Tokens](#badge-overlay-tokens)
   - [Hover Overlay Token](#hover-overlay-token)
8. [Design System Dependencies](#design-system-dependencies)
   - [Container Component](#container-component)
   - [useResponsiveGutter Hook](#useresponsivegutter-hook)
   - [Badge Component](#badge-component)
   - [SubtleVariantSwitcher](#subtlevariantswitcher)
9. [Typography Scale](#typography-scale)
10. [Border Radius System](#border-radius-system)
11. [Accessibility (WCAG AAA)](#accessibility-wcag-aaa)
12. [Usage Examples](#usage-examples)
13. [Best Practices](#best-practices)
14. [Variant Comparison Table](#variant-comparison-table)
15. [Quick Reference](#quick-reference)
16. [Troubleshooting](#troubleshooting)

---

## Architecture Overview

The Resource Card system is a **two-component architecture**:

```
ResourcesSection (layout + grid + background + header)
  └── ResourceCard (individual card rendering)
        └── CardBadge (glassmorphism badge overlay)
              └── Badge (design system base component)
```

**Design principles:**

- **Zero Tailwind color classes** — all colors come from `--rc-*` CSS custom properties
- **Mode prop cascade** — `ResourcesSection` passes `mode` to every `ResourceCard`
- **Declarative variant config** — a single `VARIANT_CONFIG` record controls all 7 variants
- **React state-driven hover** — `useState` + `onMouseEnter/Leave` (no ref-based listeners)
- **Backward compatible** — `mode` defaults to `"dark"`, existing usage works unchanged

---

## File Structure

```
/src/
├── app/
│   ├── components/
│   │   ├── ResourceCard.tsx          ← Card component (types, CardBadge, main export)
│   │   ├── ResourcesSection.tsx      ← Section wrapper (layout, grid, backgrounds)
│   │   ├── Badge.tsx                 ← Base badge (used inside CardBadge)
│   │   ├── Container.tsx             ← Layout container (3 width tiers)
│   │   ├── SubtleVariantSwitcher.tsx ← Optional variant toggle UI
│   │   └── Button.tsx                ← CTA button at section bottom
│   └── hooks/
│       └── useResponsiveGutter.tsx   ← Responsive gutter: 24px → 32px at 768px+
└── styles/
    └── theme.css                     ← All --rc-* tokens (lines 1460-1539)
```

---

## Image Aspect Ratio Standard

Different card types across the design system use **specific aspect ratios** to maintain visual consistency and optimize image cropping for their content purpose.

| Card Type        | Aspect Ratio | CSS Value  | Token                 | Rationale                                                                 |
|------------------|-------------|------------|-----------------------|---------------------------------------------------------------------------|
| **Resource Card** | **4:3**     | `4 / 3`   | `--rc-aspect-ratio`   | Standard editorial proportion. Gives enough vertical space for image subjects while keeping cards compact in a 3-column masonry grid. Works well with article/case study hero images. |
| **Report Card**   | **3:2**     | `3 / 2`   | *(future token)*      | Wider proportion for report/document cards. The extra horizontal space accommodates landscape-oriented visuals (charts, dashboards, data visualizations) commonly used in reports, whitepapers, and market analysis content. |

### Why Different Ratios?

- **4:3 (Resource Cards):** The taller proportion creates visual weight in masonry grids where cards of varying content lengths need to feel balanced. Editorial photos (people, environments, abstract concepts) crop well at 4:3.
- **3:2 (Report Cards):** Reports are typically associated with wider, data-heavy imagery. The 3:2 ratio mirrors standard photographic proportions and gives report cover images more breathing room without excessive vertical height.

### How It Works in Code

```tsx
// ResourceCard — uses 4:3 by default via token
<div style={{ aspectRatio: aspectRatio || 'var(--rc-aspect-ratio)' }}>

// Override per-card (e.g., for a report card):
<ResourceCard aspectRatio="3/2" ... />
```

### Image Preparation Guidelines

| Ratio | Minimum Resolution | Recommended Resolution | Example Crops           |
|-------|-------------------|----------------------|-------------------------|
| 4:3   | 800 x 600px       | 1200 x 900px         | 1600x1200, 2400x1800   |
| 3:2   | 900 x 600px       | 1200 x 800px         | 1800x1200, 2400x1600   |

All images use `object-fit: cover` — the container crops the image to fit. Source images larger than the container are recommended to avoid upscaling artifacts.

---

## ResourceCard Component

### Exported Types

All types are exported from `ResourceCard.tsx` for external consumption:

```typescript
/** Content variant — controls which elements are rendered */
export type ResourceCardVariant =
  | 'full-featured'      // All elements + Featured badge
  | 'featured-focus'     // Featured badge + title + description
  | 'minimal'            // Category + date + title (compact)
  | 'category-featured'  // Category + title + Featured badge
  | 'latest'             // Latest badge + title + description
  | 'clean'              // Title + description only
  | 'standard';          // Category + date + title + description (default)

/** Visual container style */
export type ResourceCardStyle = 'default' | 'bordered';

/** Color mode — adapts all colors for background context */
export type ResourceCardMode = 'light' | 'dark';

/** Content type label (for semantic aria-label) */
export type ResourceContentType = 'article' | 'blog' | 'case-study' | 'pov';
```

### Props API

```typescript
interface ResourceCardProps {
  // ── Required ──
  image: string;                      // Image URL or imported asset path
  title: string;                      // Card title text

  // ── Optional Content ──
  category?: string;                  // Category label (e.g., "TECHNOLOGY")
  date?: string;                      // Publication date (e.g., "Jan 15, 2024")
  description?: string;               // Body text / excerpt

  // ── Interaction ──
  href?: string;                      // Link URL (default: '#')
  onClick?: () => void;               // Click handler (prevents default nav)

  // ── Semantic ──
  type?: ResourceContentType;         // For aria-label: "Read {type}: {title}"
  isFeatured?: boolean;               // (Legacy) Featured flag

  // ── Layout Control ──
  variant?: ResourceCardVariant;      // Content variant (default: 'standard')
  cardStyle?: ResourceCardStyle;      // Visual style (default: 'default')
  mode?: ResourceCardMode;            // Color mode (default: 'dark')
  aspectRatio?: string;               // Image aspect ratio override (CSS value, e.g. "3/2")

  // ── Styling ──
  className?: string;                 // Additional classes on outermost <a> tag
}
```

### Content Variants

Each variant is defined in a declarative `VARIANT_CONFIG` record:

```typescript
const VARIANT_CONFIG: Record<ResourceCardVariant, {
  showCategory: boolean;
  showDate: boolean;
  showDescription: boolean;
  showFeaturedTag: boolean;
  showLatestTag: boolean;
}> = {
  'full-featured':     { showCategory: true,  showDate: true,  showDescription: true,  showFeaturedTag: true,  showLatestTag: false },
  'featured-focus':    { showCategory: false, showDate: false, showDescription: true,  showFeaturedTag: true,  showLatestTag: false },
  'minimal':           { showCategory: true,  showDate: true,  showDescription: false, showFeaturedTag: false, showLatestTag: false },
  'category-featured': { showCategory: true,  showDate: false, showDescription: false, showFeaturedTag: true,  showLatestTag: false },
  'latest':            { showCategory: false, showDate: false, showDescription: true,  showFeaturedTag: false, showLatestTag: true  },
  'clean':             { showCategory: false, showDate: false, showDescription: true,  showFeaturedTag: false, showLatestTag: false },
  'standard':          { showCategory: true,  showDate: true,  showDescription: true,  showFeaturedTag: false, showLatestTag: false },
};
```

### Card Styles

| Style       | Background               | Border                        | Content Layout             |
|-------------|--------------------------|-------------------------------|----------------------------|
| `default`   | Transparent              | None                          | Content floats on parent bg, image has `--rc-image-mb` gap |
| `bordered`  | Frosted glass (mode-aware) | 1px solid (mode-aware, hover) | Content inside padded container, image flush to top edges  |

### Color Modes

The `mode` prop switches between two complete color palettes via a `getModeTokens()` helper that returns CSS variable references:

```typescript
function getModeTokens(mode: ResourceCardMode) {
  const p = mode === 'dark' ? 'rc-dark' : 'rc-light';
  return {
    title:             `var(--${p}-title)`,
    titleHover:        `var(--${p}-title-hover)`,
    category:          `var(--${p}-category)`,
    date:              `var(--${p}-date)`,
    description:       `var(--${p}-description)`,
    descriptionHover:  `var(--${p}-description-hover)`,
    cardBg:            `var(--${p}-card-bg)`,
    cardBorder:        `var(--${p}-card-border)`,
    cardBorderHover:   `var(--${p}-card-border-hover)`,
    cardBlur:          `var(--${p}-card-blur)`,
    imagePlaceholder:  `var(--${p}-image-placeholder)`,
    focusRing:         `var(--${p}-focus-ring)`,
    focusOffset:       `var(--${p}-focus-offset)`,
  };
}
```

### Mode + Style Matrix

| Mode   | Style     | Background              | Border                   | Text Colors  | Focus Ring        |
|--------|-----------|-------------------------|--------------------------|-------------|-------------------|
| dark   | default   | transparent             | none                     | white-based  | white on black    |
| dark   | bordered  | white/3% + blur(8px)    | white/8% → 16% on hover | white-based  | white on black    |
| light  | default   | transparent             | none                     | black-based  | Brand Red on white |
| light  | bordered  | white/70% + blur(12px)  | black/8% → 15% on hover | black-based  | Brand Red on white |

---

## ResourcesSection Component

### ResourcesSection Props API

```typescript
interface ResourcesSectionProps {
  /** Color mode — controls section background & card coloring. @default 'dark' */
  mode?: ResourcesSectionMode;          // 'light' | 'dark'

  /** Card visual style. @default 'default' */
  cardStyle?: ResourceCardStyle;        // 'default' | 'bordered'

  /** Show variant switcher for card style toggling. @default false */
  enableVariantSwitcher?: boolean;

  /** Section eyebrow label. @default 'Related Resources' */
  sectionLabel?: string;

  /** Section heading. @default 'Industry Insights & Resources' */
  title?: string;

  /** Section description paragraph */
  description?: string;

  /** CTA button label. @default 'View All Resources' */
  ctaLabel?: string;

  /** CTA click handler */
  onCtaClick?: () => void;

  /** Custom resources array (replaces default demo data) */
  customResources?: ResourceItem[];

  /** Custom Masonry column breakpoints. @default { 350: 1, 640: 2, 1024: 3 } */
  customColumns?: Record<number, number>;

  /** HTML id for the section element. @default 'resources' */
  sectionId?: string;
}
```

### Layout System

```
Section (<section> — full-width, relative, overflow-hidden)
  ├── Background Layer (absolute, mode-dependent)
  │   ├── DarkBackground: 6-layer gradient mesh (periwinkle, purple, green, warm, center depth)
  │   └── LightBackground: var(--bg-composition-warm-editorial)
  │
  └── Content Layer (relative z-10)
      └── Container (width="content" → 1000px max, responsive gutters)
          ├── SectionHeader (label + h2 + description)
          ├── Masonry Grid (negative-margin trick for edge-to-edge gutters)
          │   └── ResponsiveMasonry → 1col / 2col@640 / 3col@1024
          │       └── ResourceCard × N (each wrapped in gutter-padding div)
          ├── CTA Button (centered, ghost variant with animated arrow)
          └── SubtleVariantSwitcher (optional, top-right position)
```

**Grid gutter system:** The masonry grid uses the `useResponsiveGutter` hook (24px mobile → 32px at 768px+). A negative-margin technique on the grid wrapper compensates for half-gutter padding on each card, ensuring edge-to-edge alignment with the Container:

```tsx
<div style={{
  marginTop: 0,
  marginLeft: `-${responsiveGutter / 2}px`,
  marginRight: `-${responsiveGutter / 2}px`,
  marginBottom: '80px'
}}>
```

### Background Layers

**Dark mode** uses 6 stacked gradient layers for a rich, dimensional background:

1. Base dark gradient (linear, #0f0f0f → #1a1a1a → #0f0f0f)
2. Top-left periwinkle radial blob (screen blend, 30% opacity, 80px blur)
3. Top-right purple radial blob (screen blend, 35% opacity, 90px blur)
4. Bottom-left green radial blob (screen blend, 25% opacity, 75px blur)
5. Bottom-right warm radial blob (screen blend, 28% opacity, 85px blur)
6. Center depth radial (2% white, 60px blur)

**Light mode** uses a single CSS custom property: `var(--bg-composition-warm-editorial)`

### Section Header

```
SectionHeader
├── Eyebrow label (15px, uppercase, tracking-[1.8px], mode-aware color)
├── Heading h2 (Noto Serif, font-light, clamp(1.5rem, 4.5vw, var(--text-2xl)))
└── Description p (var(--text-sm), relaxed line-height, max-width: var(--text-measure))
```

Spacing uses semantic tokens: `--section-header-mb`, `--pair-label-heading`, `--pair-heading-description`.

---

## Badge Overlay System (CardBadge)

### Why CardBadge Exists

Resource cards display status labels ("Featured", "Latest") floating over card images. These labels need:

1. **Guaranteed readability** on any image content (dark photos, light photos, busy textures)
2. **Visual subordination** — the badge should never compete with the image or title
3. **Mode independence** — the badge looks identical on light-mode and dark-mode cards because it sits on the image, not the card background

`CardBadge` solves this with a **two-layer approach**: a glassmorphism wrapper provides the dark frosted container, and a minimal-variant Badge inside provides just the text.

### Wrapper Container

```tsx
<div
  className="absolute top-4 right-4 inline-block"
  style={{
    background: 'var(--rc-badge-bg)',           // rgba(0, 0, 0, 0.65)
    backdropFilter: 'blur(var(--rc-badge-blur))', // blur(24px)
    WebkitBackdropFilter: 'blur(var(--rc-badge-blur))',
    borderRadius: '5px',                         // Design system badge/button rule
    border: '1px solid var(--rc-badge-border)',  // rgba(255,255,255,0.10)
    boxShadow: 'var(--rc-badge-shadow)',         // Dual: depth + inner highlight
    zIndex: 10,                                  // Above image hover overlay
  }}
>
```

| Property        | Value                          | Why                                                    |
|----------------|--------------------------------|--------------------------------------------------------|
| Position       | `absolute top-4 right-4`      | Top-right corner, 16px inset from image edges          |
| Background     | `rgba(0, 0, 0, 0.65)`         | 65% black — dark enough for white text, light enough to see image through |
| Backdrop blur   | `24px`                         | Strong frosted glass smooths any image content behind  |
| Border radius   | `5px`                          | Design system rule: badges/buttons = 5px               |
| Border         | `rgba(255, 255, 255, 0.10)`   | 10% white edge catches light, adds depth               |
| Box shadow     | depth + inset highlight        | Dual shadow for floating + glass edge effect           |
| z-index        | `10`                           | Above the hover overlay (which is `inset-0`)           |

### Badge Configuration

```tsx
<Badge
  variant="minimal"
  size="xs"
  theme="neutral"
  mode="dark"
  className="text-white font-semibold uppercase tracking-[1.2px]"
  style={{
    fontSize: '10px',
    padding: '6px 12px',
    textShadow: 'var(--rc-badge-text-shadow)',
  }}
>
  {label}
</Badge>
```

### Prop-by-Prop Rationale

#### `variant="minimal"`

- **WHAT:** Renders Badge with zero visual container — no background, no border, no border-radius, padding reset to 0px.
- **WHY:** The parent wrapper already provides the frosted glass container. Using `"rounded"` or `"pill"` would create a badge-inside-a-badge visual artifact (double background, double border).
- **WHEN:** Always use `"minimal"` when the Badge is placed inside a custom container that handles its own visual styling. Use `"rounded"` or `"pill"` when Badge stands alone.

#### `size="xs"`

- **WHAT:** Smallest Badge scale — font ~9-10px, padding 6px 13px, letter-spacing 1.2px (from `SIZE_TOKENS` in Badge.tsx).
- **WHY:** Image overlays must be compact. Larger sizes (sm/md/lg) visually compete with the card image and title. XS keeps the badge subordinate in the visual hierarchy: **Image > Title > Badge** (correct scanning order).
- **WHEN:** Use `"xs"` for any badge overlaid on images or thumbnails. Use `"sm"` for section header labels. Use `"md"`/`"lg"` for standalone interactive badges (objectives, filters).

#### `theme="neutral"`

- **WHAT:** Black/white color palette from `THEME_COLORS` in Badge.tsx. In dark mode: white-based text colors.
- **WHY:** The glassmorphism wrapper has a dark background (`rgba(0,0,0,0.65)`), so we need white-toned text. `"neutral"` is correct because the badge label ("Featured", "Latest") carries no semantic color meaning — it's informational, not success/warning/error/brand.
- **WHEN:** Use `"neutral"` for status labels on images. Use `"brand"` only for CTAs. Use `"success"`/`"warning"`/`"error"` only for semantic states (e.g., "Published", "Draft", "Archived").

#### `mode="dark"`

- **WHAT:** Forces dark-mode color scheme (white text on dark background).
- **WHY:** **ALWAYS `"dark"` regardless of the card's own `mode` prop.** This badge sits on the glassmorphism wrapper which has a fixed dark background (`--rc-badge-bg: rgba(0,0,0,0.65)`). Even on a light-mode card, the image overlay is dark, so badge text must be white.
- **WHEN:** Any badge on a dark or image-overlaid surface. The card's `mode="light"` / `"dark"` does NOT affect this — the wrapper's darkness is constant.

### className Overrides

These override Badge defaults because the defaults aren't quite right for the image overlay context:

| Class              | Badge Default (neutral/dark/minimal) | Override Value | Why                                                                                                     |
|-------------------|------------------------------------|----------------|---------------------------------------------------------------------------------------------------------|
| `text-white`      | `rgba(255,255,255,0.7)` (70%)     | `#ffffff` (100%) | At 10px font size, 0.7 opacity loses readability on busy images. 100% white + text-shadow = AAA guaranteed. |
| `font-semibold`   | `normal` (400 weight)             | `600` weight   | At 10px, normal weight renders too thin for overlays — letterforms blur on low-DPI screens. 600 ensures instant scannability. |
| `uppercase`       | Applied by Badge internally       | Explicit       | Design system convention for ALL badge labels. Made explicit for documentation clarity and grep-ability. |
| `tracking-[1.2px]`| 1.2px (from xs `SIZE_TOKENS`)     | 1.2px          | Re-applied in className so the value is visible at usage site. Developers shouldn't need to open Badge.tsx. |

### style Overrides

These are **precision values** that go beyond what the Badge token system provides:

| Property      | Badge xs Default             | Override Value                     | Why                                                                                                                 |
|--------------|-----------------------------|------------------------------------|---------------------------------------------------------------------------------------------------------------------|
| `fontSize`   | `clamp(9px, 0.8vw, 10px)`  | `10px` (fixed)                     | The clamp can shrink to 9px on narrow viewports. The wrapper has fixed padding — if font shrinks but padding doesn't, the badge looks awkwardly spacious. Pinning at 10px keeps proportions locked. |
| `padding`    | `6px 13px`                  | `6px 12px`                         | 1px tighter horizontal padding for a more compact overlay footprint. The wrapper's own border/shadow provide visual weight, so inner padding can be slightly reduced. |
| `textShadow` | *(none)*                    | `var(--rc-badge-text-shadow)`      | Resolves to `0 1px 2px rgba(0,0,0,0.5)`. Safety net for edge cases where image behind badge is very light. Adds a 1px dark halo around each letterform. |

### WCAG Compliance Audit

| Metric       | Value                                      | Standard        | Result   |
|-------------|--------------------------------------------|-----------------|----------|
| Text color   | `#ffffff` (white, 100% opacity)            | -               | -        |
| Background   | `rgba(0, 0, 0, 0.65)` + backdrop-blur(24px) | -             | -        |
| Contrast ratio | ~15.4:1                                  | AAA requires 7:1 | **PASS** |
| Font size    | 10px (small text)                          | AAA small = 7:1 | **PASS** |
| Font weight  | 600 (semibold)                             | Improves perceived contrast | **PASS** |
| Text shadow  | 0.5 opacity black halo                    | Additional separation | **PASS** |

### When to Use CardBadge

**Inside Resource Cards:**

| Component     | Label       | Triggered By Variant                               |
|--------------|-------------|---------------------------------------------------|
| ResourceCard | "Featured"  | `full-featured`, `featured-focus`, `category-featured` |
| ResourceCard | "Latest"    | `latest`                                           |

**Reuse in other design system cards:**

| Card Type        | Example Labels                         | Aspect Ratio |
|-----------------|----------------------------------------|-------------|
| Report cards    | "New", "Updated", "Premium"           | 3:2          |
| Gallery items   | "Sold", "Reserved"                    | 4:3          |
| Portfolio cards | "Award Winner", "Client Pick"         | 4:3          |
| Video thumbnails | "Live", "Replay", duration labels    | 16:9         |

### How to Add a New Badge Label

1. Add a new boolean to `VARIANT_CONFIG`:
   ```typescript
   const VARIANT_CONFIG = {
     // ...existing variants...
     'new-variant': { showCategory: true, showDate: false, showDescription: true, showFeaturedTag: false, showLatestTag: false, showNewTag: true },
   };
   ```

2. Add the render condition in the image container:
   ```tsx
   {config.showNewTag && <CardBadge label="New Label" />}
   ```

3. **No styling changes needed** — CardBadge handles all visual treatment via tokens.

---

## CSS Custom Properties (Token Table)

All tokens are defined in `/src/styles/theme.css` under `:root` (lines 1460-1539).

### Shape Tokens

| Token                    | Value    | Used By                                    |
|-------------------------|----------|--------------------------------------------|
| `--rc-radius-image`     | `2.5px`  | Image corners (default style)              |
| `--rc-radius-card`      | `10px`   | Bordered card outer radius                 |
| `--rc-radius-card-inner`| `9px`    | Image top corners inside bordered card     |
| `--rc-aspect-ratio`     | `4 / 3`  | Default image aspect ratio (Resource Cards) |

### Spacing Tokens

| Token              | Value      | Used By                                       |
|-------------------|-----------|-----------------------------------------------|
| `--rc-content-px` | `1rem`    | Horizontal padding inside bordered card       |
| `--rc-content-pt` | `1rem`    | Top padding below image in bordered card      |
| `--rc-content-pb` | `1.25rem` | Bottom padding in bordered card               |
| `--rc-image-mb`   | `1rem`    | Margin below image (default style only)       |
| `--rc-meta-mb`    | `0.75rem` | Margin below category/date metadata block     |
| `--rc-title-mb`   | `0.5rem`  | Margin below title                            |

### Dark Mode Tokens (`--rc-dark-*`)

| Token                        | Value                        | Element         | Contrast  |
|-----------------------------|------------------------------|-----------------|-----------|
| `--rc-dark-title`           | `rgba(255, 255, 255, 1)`    | Title text      | 21:1 AAA  |
| `--rc-dark-title-hover`     | `rgba(255, 255, 255, 0.80)` | Title on hover  | 16.7:1 AAA |
| `--rc-dark-category`        | `rgba(255, 255, 255, 0.30)` | Category label  | 4.6:1 AA  |
| `--rc-dark-date`            | `rgba(255, 255, 255, 0.40)` | Date text       | 6.3:1 AA  |
| `--rc-dark-description`     | `rgba(255, 255, 255, 0.50)` | Description     | 7.8:1 AAA |
| `--rc-dark-description-hover`| `rgba(255, 255, 255, 0.60)` | Desc on hover  | 9.4:1 AAA |
| `--rc-dark-card-bg`         | `rgba(255, 255, 255, 0.03)` | Bordered card bg | -        |
| `--rc-dark-card-border`     | `rgba(255, 255, 255, 0.08)` | Bordered border | -         |
| `--rc-dark-card-border-hover`| `rgba(255, 255, 255, 0.16)` | Border on hover | -        |
| `--rc-dark-card-blur`       | `8px`                        | Backdrop blur   | -         |
| `--rc-dark-image-placeholder`| `rgba(255, 255, 255, 0.05)` | Loading bg     | -         |
| `--rc-dark-focus-ring`      | `rgba(255, 255, 255, 1)`    | Focus ring      | -         |
| `--rc-dark-focus-offset`    | `rgba(0, 0, 0, 1)`          | Focus offset    | -         |

### Light Mode Tokens (`--rc-light-*`)

| Token                         | Value                        | Element         | Contrast  |
|------------------------------|------------------------------|-----------------|-----------|
| `--rc-light-title`           | `rgba(0, 0, 0, 0.90)`       | Title text      | 18.4:1 AAA |
| `--rc-light-title-hover`     | `rgba(0, 0, 0, 0.70)`       | Title on hover  | 12.6:1 AAA |
| `--rc-light-category`        | `#a6968e`                    | Category label  | warm tone  |
| `--rc-light-date`            | `rgba(0, 0, 0, 0.60)`       | Date text       | 9.7:1 AAA |
| `--rc-light-description`     | `rgba(0, 0, 0, 0.70)`       | Description     | 12.6:1 AAA |
| `--rc-light-description-hover`| `rgba(0, 0, 0, 0.90)`      | Desc on hover   | 18.4:1 AAA |
| `--rc-light-card-bg`         | `rgba(255, 255, 255, 0.70)` | Bordered card bg | -         |
| `--rc-light-card-border`     | `rgba(0, 0, 0, 0.08)`       | Bordered border | -         |
| `--rc-light-card-border-hover`| `rgba(0, 0, 0, 0.15)`      | Border on hover | -         |
| `--rc-light-card-blur`       | `12px`                       | Backdrop blur   | -         |
| `--rc-light-image-placeholder`| `rgba(0, 0, 0, 0.04)`      | Loading bg      | -         |
| `--rc-light-focus-ring`      | `#b01f24`                    | Focus ring (Brand Red) | - |
| `--rc-light-focus-offset`    | `rgba(255, 255, 255, 1)`    | Focus offset    | -         |

### Badge Overlay Tokens (`--rc-badge-*`)

| Token                    | Value                                                              | Used By       |
|-------------------------|--------------------------------------------------------------------|---------------|
| `--rc-badge-bg`         | `rgba(0, 0, 0, 0.65)`                                            | Wrapper bg    |
| `--rc-badge-blur`       | `24px`                                                             | Wrapper backdrop-filter |
| `--rc-badge-border`     | `rgba(255, 255, 255, 0.10)`                                      | Wrapper border |
| `--rc-badge-shadow`     | `0 2px 8px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.1)` | Wrapper depth + glass edge |
| `--rc-badge-text-shadow`| `0 1px 2px rgba(0, 0, 0, 0.5)`                                   | Badge text halo |

### Hover Overlay Token

| Token                       | Value                    | Used By                |
|----------------------------|--------------------------|------------------------|
| `--rc-image-overlay-hover` | `rgba(0, 0, 0, 0.20)`   | Image darkening on hover |

---

## Design System Dependencies

### Container Component

**File:** `/src/app/components/Container.tsx`

ResourcesSection uses Container with `width="content"` (1000px max-width):

```tsx
<Container className="relative z-10">
  {/* Section header + masonry grid + CTA */}
</Container>
```

| Width Preset | CSS Variable             | Max Width | Use Case               |
|-------------|--------------------------|-----------|------------------------|
| `content`   | `var(--container-content)` | 1000px    | Body sections (default) |
| `nav`       | `var(--container-nav)`     | 1200px    | Navbar, MegaMenu       |
| `narrow`    | `var(--container-narrow)`  | 900px     | Final CTA, Endorsement |

Responsive gutters: `px-4 sm:px-6 md:px-8` (16px → 24px → 32px).

### useResponsiveGutter Hook

**File:** `/src/app/hooks/useResponsiveGutter.tsx`

Returns a number: `24` (< 768px) or `32` (>= 768px). Used for Masonry grid spacing.

### Badge Component

**File:** `/src/app/components/Badge.tsx`

CardBadge uses the base Badge with `variant="minimal"` to strip all visual container styling. Full Badge API docs in [BADGES_DOCUMENTATION.md](./BADGES_DOCUMENTATION.md).

### SubtleVariantSwitcher

**File:** `/src/app/components/SubtleVariantSwitcher.tsx`

Optional UI for toggling `cardStyle` between `"default"` and `"bordered"` during design review. Positioned `top-right`, theme-aware (`light`/`dark`).

---

## Typography Scale

All card typography uses the Major Third (1.25) scale defined in theme.css:

| Element       | Token           | Resolves To | Weight      | Line Height | Tracking     |
|--------------|-----------------|-------------|-------------|-------------|-------------|
| Category     | `var(--text-xs)` | ~12.8px     | medium (500) | block       | 1.5px        |
| Date         | `var(--text-xs)` | ~12.8px     | normal (400) | block       | normal       |
| Title        | `var(--text-sm)` | ~16px       | normal (400) | 1.35        | tight        |
| Description  | `var(--text-sm)` | ~16px       | normal (400) | 1.6         | normal       |
| Badge text   | 10px (fixed)    | 10px        | semibold (600)| -          | 1.2px        |

---

## Border Radius System

The design system enforces three radius tiers:

| Tier             | Radius  | Token                    | Elements                                  |
|-----------------|---------|--------------------------|-------------------------------------------|
| Small (images)  | 2.5px   | `--rc-radius-image`      | Image containers, card links (default)    |
| Medium (controls) | 5px   | *(hardcoded in CardBadge)* | Badge wrapper, buttons                  |
| Large (cards)   | 10px    | `--rc-radius-card`       | Bordered card container                   |
| Inner card      | 9px     | `--rc-radius-card-inner` | Image top corners inside bordered card (10px - 1px border) |

---

## Accessibility (WCAG AAA)

### Color Contrast

All text/background combinations meet or exceed WCAG AAA (7:1 for normal text):

- **Dark mode title:** White on dark = 21:1
- **Light mode title:** 90% black on white = 18.4:1
- **Badge text:** White on rgba(0,0,0,0.65) = ~15.4:1
- **Dark mode description:** 50% white on dark ≥ 7.8:1

### Keyboard Navigation

- Full keyboard access via `<a>` tag wrapper
- Focus ring: 2px ring with mode-appropriate color (white in dark, Brand Red in light)
- Focus offset: 2px with contrasting background color
- Tab order preserved in DOM order

### Screen Readers

- Semantic HTML: `<article>`, `<h3>`, `<p>`, `<span>`
- Descriptive `aria-label`: `"Read {type}: {title}"`
- Alt text on images from `title` prop
- Badge text is part of accessible content tree

### Image Overlay Hover

- Hover overlay is purely decorative (20% black tint)
- Not relied upon for any information conveyance
- Respects `prefers-reduced-motion` via CSS transitions

---

## Usage Examples

### Dark Mode — Case Study Page (Original)

```tsx
<ResourcesSection
  mode="dark"
  cardStyle="bordered"
  enableVariantSwitcher
/>
```

### Light Mode — Blog Listing Page

```tsx
<ResourcesSection
  mode="light"
  cardStyle="bordered"
  title="Latest Insights"
  description="Explore our thought leadership..."
  sectionLabel="Blog"
  ctaLabel="View All Posts"
/>
```

### Custom Data — Any Project

```tsx
import { ResourcesSection, type ResourceItem } from '@/app/components/ResourcesSection';

const myResources: ResourceItem[] = [
  {
    image: '/images/report-cover.jpg',
    category: 'MARKET REPORT',
    date: 'Feb 2026',
    title: 'Q4 Transformer Market Analysis',
    description: 'Comprehensive IPO readiness assessment...',
    variant: 'full-featured',
  },
  // ...more items
];

<ResourcesSection
  mode="light"
  cardStyle="default"
  customResources={myResources}
  title="Our Work"
  sectionLabel="Case Studies"
/>
```

### Standalone ResourceCard (outside ResourcesSection)

```tsx
import { ResourceCard } from '@/app/components/ResourceCard';

// Resource card — default 4:3 aspect ratio
<ResourceCard
  mode="light"
  cardStyle="bordered"
  variant="standard"
  image="/images/article.jpg"
  category="STRATEGY"
  date="Jan 8, 2024"
  title="Digital Transformation in Logistics"
  description="How leading companies leverage digital tools..."
/>

// Report card — override to 3:2 aspect ratio
<ResourceCard
  mode="light"
  cardStyle="bordered"
  variant="full-featured"
  aspectRatio="3/2"
  image="/images/report-cover.jpg"
  category="MARKET REPORT"
  date="Q4 2025"
  title="India Transformer Bushing Market Analysis"
  description="Comprehensive IPO readiness assessment..."
/>
```

### Masonry Grid with Mixed Cards

```tsx
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { ResourceCard } from '@/app/components/ResourceCard';

<ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 640: 2, 1024: 3 }}>
  <Masonry gutter="0px">
    {resources.map((resource, index) => (
      <div key={resource.title} style={{ padding: '0 12px 24px 12px' }}>
        <ResourceCard
          mode="dark"
          cardStyle="bordered"
          variant={resource.variant}
          image={resource.image}
          category={resource.category}
          date={resource.date}
          title={resource.title}
          description={resource.description}
        />
      </div>
    ))}
  </Masonry>
</ResponsiveMasonry>
```

---

## Best Practices

### DO

1. **Always pass `mode` explicitly** when using ResourceCard outside ResourcesSection
2. **Use 4:3 images for resource cards** and 3:2 for report cards
3. **Provide descriptive titles** — they double as image alt text and aria labels
4. **Use semantic dates:** `"January 15, 2024"` not `"1/15/24"`
5. **Limit description to 100-150 characters** (1-2 sentences)
6. **Use `variant` to control content**, not conditional rendering in parent
7. **Use `cardStyle="bordered"` on patterned or gradient backgrounds** — default style needs a solid-color parent to look clean
8. **Let CardBadge handle all badge-on-image styling** — never customize badge appearance per-card

### DON'T

1. **Don't use Tailwind color classes on ResourceCard** — all colors come from `--rc-*` tokens
2. **Don't set `mode="dark"` on CardBadge Badge** to match the card mode — it's always `"dark"` because the glassmorphism wrapper is always dark
3. **Don't override CardBadge wrapper styles** — they're token-driven for consistency
4. **Don't use ResourceCard without an `image` prop** — the component requires images
5. **Don't mix shorthand and longhand margin/padding on the same element** — causes React warnings
6. **Don't use the `isFeatured` prop** — use `variant="full-featured"` or `variant="featured-focus"` instead (isFeatured is legacy)

---

## Variant Comparison Table

| Variant             | Category | Date | Title | Description | Badge    | Best For                    |
|---------------------|----------|------|-------|-------------|----------|-----------------------------|
| `full-featured`     | Yes      | Yes  | Yes   | Yes         | Featured | Hero/highlight articles     |
| `featured-focus`    | -        | -    | Yes   | Yes         | Featured | Premium/exclusive content   |
| `minimal`           | Yes      | Yes  | Yes   | -           | -        | Compact lists, archives     |
| `category-featured` | Yes      | -    | Yes   | -           | Featured | Category landing pages      |
| `latest`            | -        | -    | Yes   | Yes         | Latest   | Recent posts, "What's New"  |
| `clean`             | -        | -    | Yes   | Yes         | -        | Portfolios, simple grids    |
| `standard` (default)| Yes      | Yes  | Yes   | Yes         | -        | Blog lists, general content |

---

## Quick Reference

| Decision                          | Answer                                              |
|----------------------------------|-----------------------------------------------------|
| What aspect ratio for resource cards? | **4:3** (`--rc-aspect-ratio`)                    |
| What aspect ratio for report cards? | **3:2** (pass `aspectRatio="3/2"`)                |
| What border radius for images?   | **2.5px** (`--rc-radius-image`)                     |
| What border radius for badges?   | **5px** (hardcoded in CardBadge wrapper)            |
| What border radius for bordered cards? | **10px** (`--rc-radius-card`)                  |
| What mode for the badge's Badge? | Always `"dark"` (glassmorphism wrapper is always dark) |
| Where are tokens defined?        | `/src/styles/theme.css` lines 1460-1539             |
| How to add a new variant?        | Add entry to `VARIANT_CONFIG` record                |
| How to add a new badge label?    | Add boolean to config + render `<CardBadge>`        |
| How to use light mode?           | `<ResourcesSection mode="light" />` or `<ResourceCard mode="light" />` |

---

## Troubleshooting

### Badge not visible on image

**Cause:** Image is very dark and blends with the 65% black wrapper.
**Fix:** The text-shadow and white text ensure readability. If the image is nearly black, consider a lighter image. The frosted glass effect provides edge separation.

### Margin warning in console

**Cause:** Mixing `margin` shorthand with `marginBottom` longhand on the same element.
**Fix:** Use only longhand properties: `marginTop`, `marginLeft`, `marginRight`, `marginBottom`. This was fixed in ResourcesSection grid wrapper (Feb 28, 2026).

### Cards look wrong on light backgrounds

**Cause:** Missing `mode="light"` prop.
**Fix:** Pass `mode="light"` to both ResourcesSection and/or individual ResourceCards.

### Bordered card border invisible

**Cause:** Using `cardStyle="bordered"` with `mode="dark"` — the border is 8% white, very subtle.
**Fix:** This is by design. The border becomes visible on hover (16% white). Use `mode="light"` for more visible borders.

### Image stretching or distortion

**Cause:** Image aspect ratio doesn't match container.
**Fix:** All images use `object-fit: cover` — they crop, never stretch. Provide images at or above the recommended resolution (1200x900 for 4:3, 1200x800 for 3:2).

---

## Related Documentation

- [Badge System](./BADGES_DOCUMENTATION.md) — Full Badge component API
- [Technical Handover](./TECHNICAL_HANDOVER.md) — Complete project architecture
- [Handover Checklist](./HANDOVER_CHECKLIST.md) — Deployment & QA checklist

---

**Status:** Production Ready  
**Version:** 3.0  
**Last Updated:** February 28, 2026
