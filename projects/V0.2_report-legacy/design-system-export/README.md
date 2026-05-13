# KP 2.0 Product Design System Export

## Overview
This package contains all the design system files and components from the Qatar Fresh Herbs Market Research Report Landing Page project. The design system is built on **KP 2.0 Product Design System** standards with React, TypeScript, and Tailwind CSS v4.

---

## 📁 Package Contents

### 1. **Foundation Files** (`/styles`)
- `theme.css` - Complete design token system (colors, typography, spacing, radius, shadows)
- `fonts.css` - Font imports (DM Sans, Noto Serif)

### 2. **Core UI Components** (`/ui`)
- `button.tsx` - Button variants (default, cta, outline, ghost, link, glass)
- `card.tsx` - Card container system
- `badge.tsx` - Badge component
- `utils.ts` - Utility functions (cn helper)

### 3. **Custom Components** (`/components`)
- `SectionHeader.tsx` - Standardized section headers with chapter numbering
- `FinalCTA.tsx` - Gradient CTA banner with animations
- `MindMap.tsx` - Interactive D3-based mind map with dual interaction modes
- `CompetitiveLandscape.tsx` - Complex data visualization section

---

## 🎨 Design System Highlights

### Color System
- **Brand Red**: `#b01f24` (Primary CTAs)
- **Purple 500**: `#7f5fe3` (Charts, interactive elements)
- **Grayscale**: Black tints 50-900
- **Warm Off-White**: Section backgrounds
- **Periwinkle**: Trust/reliability accents

### Typography
- **Font**: DM Sans (400, 700 weights only)
- **Scale**: Major Third (1.25 ratio)
- **Heading Sizes**: 12px - 76px
- **Line Heights**: 1.2 (tight) to 1.6 (comfortable)

### Border Radius (Intent-driven)
- **xs**: 2.5px (tags, badges)
- **sm**: 5px (inputs, chips)
- **md**: 10px (cards, panels) ⭐ Standard
- **lg**: 15px (dialogs, modals)
- **xl**: 20px (large banners)
- **full**: 9999px (pills, avatars)

### Spacing
- **Section Padding**: `px-[84.375px] lg:px-[112.5px]` (25% increase from original)
- **Vertical**: `py-24 lg:py-32`
- **Base Unit**: 4px increments

---

## 🧩 Component Specifications

### Button Component
**Variants:**
- `default` - Primary background
- `cta` - Brand red gradient with shadow
- `outline` - Bordered with hover effects
- `ghost` - Transparent with hover
- `link` - Underlined text
- `glass` - Glassmorphic for hero overlays

**Sizes:** `sm`, `default`, `lg`, `icon`

**Usage:**
```tsx
<Button variant="cta" size="lg">Download Report</Button>
<Button variant="outline">Learn More</Button>
```

### Card Component
**Features:**
- White background with border
- Elevation shadows (sm → md on hover)
- Rounded corners (10px)
- Sub-components: CardHeader, CardContent, CardFooter

**Usage:**
```tsx
<Card>
  <CardContent>
    <h3>Card Title</h3>
    <p>Card description...</p>
  </CardContent>
</Card>
```

### SectionHeader Component
**Props:**
- `chapter` - Chapter number (e.g., "CHAPTER 3")
- `title` - Section name
- `heading` - Optional ReactNode for custom heading
- `subtitle` - Optional subtitle text
- `description` - Optional description paragraph

**Format:** "CHAPTER [NUMBER] [Section Name]" (no dashes)

**Usage:**
```tsx
<SectionHeader
  chapter="CHAPTER 5"
  title="Competitive Landscape"
  subtitle="Market Leaders and Analysis"
  description="Comprehensive overview of key players..."
/>
```

### FinalCTA Component
**Features:**
- Horizontal to diagonal gradient animation on hover
- Lift effect (8px translate-y)
- Decorative geometric shapes
- Two-button layout (primary + secondary)
- White text with high contrast

**Gradient:**
- Base: `bg-gradient-to-r` (horizontal)
- Hover: `bg-gradient-to-br` (diagonal bottom-right)
- Colors: `from-[var(--brand-red-active)] via-[var(--brand-red)] to-[var(--red-500)]`

### Interactive MindMap Component
**Features:**
- D3-based hierarchical tree visualization
- Dual interaction modes: `full` (pan/zoom/click) vs `preview` (click only)
- Exclusive expansion (siblings collapse when expanding)
- Search highlighting
- 36px pill-shaped nodes with badges
- Smooth animations (800ms)

**Props:**
- `data` - Hierarchical data structure
- `searchTerm` - Optional search filter
- `onNodeClick` - Click handler
- `interactionMode` - 'full' | 'preview'

---

## 📐 Layout Rules

### Mandatory Section Padding
ALL sections MUST use:
```tsx
<section className="py-24 lg:py-32">
  <div className="max-w-7xl mx-auto px-[84.375px] lg:px-[112.5px]">
    {/* Content */}
  </div>
</section>
```

### Background Pattern (Alternating)
- **Odd sections**: White background (`bg-white`)
- **Even sections**: Grey background (`bg-[var(--black-50)]`)

### Dot Pattern Background
```tsx
<div
  className="absolute inset-0"
  style={{
    opacity: 'var(--pattern-opacity)',
    backgroundImage: `radial-gradient(circle at var(--pattern-dot-position) var(--pattern-dot-position), hsl(var(--foreground)) var(--pattern-dot-size), transparent 0)`,
    backgroundSize: `var(--pattern-grid-size) var(--pattern-grid-size)`
  }}
/>
```

---

## 🛠️ Installation & Setup

### Required Dependencies
```json
{
  "@radix-ui/react-slot": "^1.0.2",
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.2.0",
  "lucide-react": "^0.263.1",
  "d3": "^7.8.5",
  "highcharts": "^11.2.0",
  "highcharts-react-official": "^3.2.1"
}
```

### Import Paths
This project uses Vite with `@` alias mapped to `/src`:
```tsx
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { SectionHeader } from '@/app/components/SectionHeader';
```

---

## 🎯 Design Principles

1. **Consistency**: All components follow KP 2.0 standards
2. **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation
3. **Responsiveness**: Mobile-first approach with lg breakpoint
4. **Performance**: Optimized animations, lazy loading where applicable
5. **Scalability**: Modular components with clear prop interfaces

---

## 💰 Currency & Formatting
- **Currency**: Use `$` instead of "USD" throughout
- **Numbers**: Use proper formatting (e.g., `$120.5M`, `45%`)

---

## 📝 Typography Rules

### Headings
- **ALL headings (h1-h6)**: DM Sans, 400 weight (regular)
- **Root/Main section headings**: Can optionally use Noto Serif for distinction
- **No bold headings** unless explicitly specified
- **Letter spacing**: `-0.02em` for headings

### Body Text
- **Font**: DM Sans, 400 weight
- **Size**: 16px (base)
- **Line height**: 1.6 (comfortable)
- **Opacity**: 70% for standard body text

---

## 🚀 Usage Examples

### Complete Section Example
```tsx
<section className="py-24 lg:py-32 bg-white relative overflow-hidden">
  {/* Dot pattern background */}
  <div
    className="absolute inset-0"
    style={{
      opacity: 'var(--pattern-opacity)',
      backgroundImage: `radial-gradient(...)`,
      backgroundSize: `var(--pattern-grid-size) var(--pattern-grid-size)`
    }}
  />

  <div className="max-w-7xl mx-auto px-[84.375px] lg:px-[112.5px] relative">
    <SectionHeader
      chapter="CHAPTER 3"
      title="Market Analysis"
      subtitle="Comprehensive Market Insights"
      description="Deep dive into market trends..."
    />

    <Card>
      <CardContent>
        <h3>Market Overview</h3>
        <p>The market is growing at...</p>
        <Button variant="cta">Download Report</Button>
      </CardContent>
    </Card>
  </div>
</section>
```

---

## 📦 What to Use for Figma

### For Figma Design System Creation:
1. **Extract all CSS custom properties** from `theme.css`
2. **Document button variants** with screenshots
3. **Create component variants** for Card, Badge, etc.
4. **Typography styles**: Create text styles for each heading/body level
5. **Color swatches**: All color tokens from grayscale to brand colors
6. **Border radius**: Create corner radius styles (2.5px - 20px)
7. **Shadow styles**: Elevation levels (xs, sm, md, lg, xl)
8. **Spacing tokens**: Document spacing scale (4px - 128px)

### Component States to Document:
- **Buttons**: Default, hover, active, disabled
- **Cards**: Default, hover
- **Interactive elements**: Focus states with ring styles

---

## 📄 License & Credits
Built with React, TypeScript, Tailwind CSS v4, and D3.js.
Design System: KP 2.0 Product Design System (v2.0.1)

---

## 🔗 Related Files
- Main application: `/src/app/App.tsx`
- Additional sections: `/src/app/components/`
- Utilities: `/src/app/components/ui/utils.ts`

---

**Last Updated**: January 2026  
**Version**: 2.0.1
