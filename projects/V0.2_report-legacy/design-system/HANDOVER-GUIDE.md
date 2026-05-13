# Project KP 2.0 - Developer Handover Guide

**Project:** Qatar Fresh Herbs Market Research Report Landing Page  
**Design System Version:** 2.0.0  
**Handover Date:** January 23, 2026  
**Technology Stack:** React 18, TypeScript, Tailwind CSS 4, Vite

---

## 📦 Quick Start

### 1. Access Design Tokens

```typescript
// Import everything
import { colors, typography, spacing } from '@/design-system';

// Use tokens
const primaryColor = colors.brand.red;        // #b01f24
const warmBg = colors.warm[300];              // #f5f2f1
const bodyFont = typography.fontFamily.body;  // 'DM Sans', sans-serif
```

### 2. Use CSS Variables

All tokens are available as CSS variables in `/src/styles/theme.css`:

```css
.element {
  color: var(--brand-red);              /* #b01f24 */
  background: var(--warm-300);          /* #f5f2f1 */
  font-family: var(--font-body);        /* DM Sans */
  padding: var(--space-md);             /* 16px */
}
```

### 3. Tailwind Classes

Use token values directly in Tailwind:

```tsx
<div className="bg-[#f5f2f1] text-[#000000] p-[16px] rounded-[5px]">
  Content
</div>
```

---

## 📁 File Structure

```
/design-system/
├── index.ts                  // Main export file (import from here)
├── colors.ts                 // All color tokens
├── typography.ts             // Typography tokens
├── spacing.ts                // Spacing, shadows, radius, etc.
├── README.md                 // Complete documentation
└── HANDOVER-GUIDE.md         // This file

/src/styles/
├── theme.css                 // CSS variables for all tokens
├── fonts.css                 // Font imports (Noto Serif, DM Sans)
└── tailwind.css              // Tailwind configuration

/src/app/pages/
└── DesignSystem.tsx          // Interactive design system page
```

---

## 🎨 Color System - Quick Reference

### Foundation

| Token | Hex | Usage |
|-------|-----|-------|
| `colors.foundation.black` | `#000000` | Primary text, headlines |
| `colors.foundation.white` | `#ffffff` | Primary backgrounds |

### Grayscale (Essential Tokens)

| Token | Hex | Usage |
|-------|-----|-------|
| `colors.grayscale[100]` | `#f5f5f5` | Card backgrounds |
| `colors.grayscale[200]` | `#e5e5e5` | Borders, dividers |
| `colors.grayscale[400]` | `#a3a3a3` | Placeholder text |
| `colors.grayscale[600]` | `#525252` | Body text ⭐ |
| `colors.grayscale[900]` | `#171717` | Dark backgrounds |

### Warm Scale (Essential Tokens)

| Token | Hex | Usage |
|-------|-----|-------|
| `colors.warm[200]` | `#f9f7f6` | Card backgrounds |
| `colors.warm[300]` | `#f5f2f1` | Section backgrounds ⭐ |
| `colors.warm[500]` | `#eae5e3` | Borders |

### Ken Bold Red (Brand)

| Token | Hex | Usage |
|-------|-----|-------|
| `colors.brand.red` | `#b01f24` | PRIMARY CTA ⭐ |
| `colors.brand.redHover` | `#8f181d` | Hover state |
| `colors.brand.redActive` | `#771419` | Active state |
| `colors.red[500]` | `#dc3238` | Links, gradients |

### Periwinkle (Accent)

| Token | Hex | Usage |
|-------|-----|-------|
| `colors.periwinkle[100]` | `#f5f6fd` | Icon backgrounds |
| `colors.periwinkle[600]` | `#a7abf0` | Accent color ⭐ |
| `colors.periwinkle[700]` | `#8b90e0` | Hover states |

### Utility Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `colors.green[600]` | `#16a34a` | Success |
| `colors.rose[600]` | `#e11d48` | Error |
| `colors.amber[600]` | `#d97706` | Warning |

---

## 📝 Typography - Quick Reference

### Fonts

```typescript
typography.fontFamily.display  // 'Noto Serif', Georgia, serif
typography.fontFamily.body     // 'DM Sans', sans-serif
```

**Rule:** 
- **Noto Serif** = H1, H2, H3, H4, H5, H6 (headlines only)
- **DM Sans** = Body text, UI elements, everything else

### Type Scale

| Size | Usage |
|------|-------|
| `48px` | Hero headlines |
| `36px` | H1 |
| `32px` | H2 |
| `26px` | H3 |
| `22px` | H4 |
| `18px` | H5 |
| `16px` | H6, Base body text ⭐ |
| `14px` | Small text |
| `12px` | Captions |

---

## 📐 Spacing - Quick Reference

### Base Units

```typescript
spacing[4]   // 16px - Base unit ⭐
spacing[6]   // 24px - Paragraph gaps
spacing[8]   // 32px - Component spacing
spacing[12]  // 48px - Section spacing
spacing[16]  // 64px - Major sections ⭐
```

### Common Patterns

```typescript
// Component padding
semanticSpacing.component.md   // 16px ⭐

// Section spacing
semanticSpacing.layout.lg      // 48px ⭐
semanticSpacing.layout.xl      // 64px

// Container padding (responsive)
semanticSpacing.container.mobile    // 16px
semanticSpacing.container.desktop   // 48px ⭐
```

### Border Radius

```typescript
borderRadius.md    // 5px - Standard ⭐
borderRadius.lg    // 8px - Cards
borderRadius.full  // 9999px - Pills
```

---

## 🔧 Common Component Patterns

### 1. Primary CTA Button

```tsx
<button className="
  bg-[#b01f24]
  hover:bg-[#8f181d]
  active:bg-[#771419]
  text-white
  px-8 py-4
  rounded-[5px]
  font-bold
  transition-colors duration-200
  shadow-lg hover:shadow-xl
">
  Primary CTA
</button>
```

**CSS Variables Version:**
```tsx
<button className="
  bg-[var(--brand-red)]
  hover:bg-[var(--brand-red-hover)]
  text-white px-8 py-4 rounded-[5px]
">
  Primary CTA
</button>
```

---

### 2. Gradient CTA (Hero Sections)

```tsx
<button className="
  bg-gradient-to-br from-[#8f181d] to-[#dc3238]
  hover:from-[#b01f24] hover:to-[#f87176]
  text-white
  px-8 py-4
  rounded-[5px]
  font-bold
  transition-all duration-300
  shadow-lg hover:shadow-xl
">
  Get Started
</button>
```

---

### 3. Secondary Button

```tsx
<button className="
  bg-white
  hover:bg-[#fafafa]
  text-[#b01f24]
  border-2 border-[#b01f24]
  px-6 py-3
  rounded-[5px]
  font-semibold
  transition-all duration-200
">
  Learn More
</button>
```

---

### 4. Card Component

```tsx
<div className="
  bg-white
  border border-[#e5e5e5]
  rounded-[8px]
  p-[24px]
  shadow-sm
  hover:shadow-md
  transition-shadow duration-200
">
  <h3 className="text-[22px] font-semibold text-[#000000] mb-[8px]">
    Card Title
  </h3>
  <p className="text-[16px] text-[#525252] leading-[1.6]">
    Card content goes here with comfortable line height.
  </p>
</div>
```

---

### 5. Icon Background

```tsx
<div className="
  w-12 h-12
  rounded-[8px]
  bg-[#f5f6fd]
  flex items-center justify-center
">
  <Icon className="text-[#a7abf0] w-6 h-6" />
</div>
```

**Pattern:** 
- Background: `periwinkle-100` (#f5f6fd)
- Icon color: `periwinkle-600` (#a7abf0)

---

### 6. Section with Warm Background

```tsx
<section className="bg-[#f5f2f1] py-[64px]">
  <div className="max-w-7xl mx-auto px-[48px]">
    <h2 
      className="text-[32px] leading-[1.2] font-bold text-[#000000] mb-[24px]"
      style={{ fontFamily: "'Noto Serif', serif" }}
    >
      Section Title
    </h2>
    <p className="text-[16px] leading-[1.6] text-[#525252]">
      Section content with warm background for visual separation.
    </p>
  </div>
</section>
```

---

### 7. Typography Hierarchy

```tsx
<article>
  {/* H1 - Noto Serif */}
  <h1 
    className="text-[48px] leading-[1.2] font-bold text-[#000000] mb-[24px]"
    style={{ fontFamily: "'Noto Serif', serif" }}
  >
    Page Title
  </h1>
  
  {/* H2 - Noto Serif */}
  <h2 
    className="text-[32px] leading-[1.2] font-semibold text-[#000000] mb-[16px]"
    style={{ fontFamily: "'Noto Serif', serif" }}
  >
    Section Heading
  </h2>
  
  {/* Body - DM Sans */}
  <p className="text-[16px] leading-[1.6] text-[#525252] mb-[24px]">
    Body paragraph with standard line height for comfortable reading.
  </p>
  
  {/* Caption - DM Sans */}
  <p className="text-[12px] leading-[1.6] text-[#a3a3a3]">
    Caption or small text
  </p>
</article>
```

---

## Design Rules & Guidelines

### Color Rules

1. **Primary CTA = Always Ken Bold Red (#b01f24)**
2. **Body Text = Always Grayscale 600 (#525252)** - NOT pure black
3. **Headlines = Pure Black (#000000)**
4. **Alternating Sections = White → Warm 300 → White**
5. **Icon Backgrounds = Periwinkle 100 + Periwinkle 600**
6. **Never create colors outside the design system**

### Typography Rules

1. **Noto Serif = Headlines ONLY (H1-H6)**
2. **DM Sans = Everything else**
3. **Line Height = 1.6 for body text, 1.2 for headlines**
4. **Body Text Size = 16px (standard)**
5. **Never use Noto Serif for body text**

### Spacing Rules

1. **All spacing = multiples of 4px**
2. **Section padding = 48px or 64px**
3. **Card padding = 24px**
4. **Paragraph gaps = 24px**
5. **Border radius = 5px (standard), 8px (cards)**

---

## 🚨 Common Mistakes to Avoid

### ❌ Wrong

```tsx
// Using arbitrary colors
<div className="bg-purple-500">...</div>

// Using Noto Serif for body text
<p style={{ fontFamily: "'Noto Serif', serif" }}>Body text</p>

// Using pure black for body text
<p className="text-black">Body text</p>

// Arbitrary spacing
<div className="px-[17px] py-[23px]">...</div>

// Wrong button color
<button className="bg-blue-600">Primary CTA</button>
```

### ✅ Correct

```tsx
// Use design system colors
<div className="bg-[#a7abf0]">...</div>

// DM Sans for body text
<p style={{ fontFamily: "'DM Sans', sans-serif" }}>Body text</p>

// Grayscale 600 for body text
<p className="text-[#525252]">Body text</p>

// Spacing in multiples of 4
<div className="px-[16px] py-[24px]">...</div>

// Ken Bold Red for CTAs
<button className="bg-[#b01f24]">Primary CTA</button>
```

---

## 📊 Design System Usage Examples

### Example 1: Hero Section

```tsx
<section className="bg-[#000000] py-[96px]">
  <div className="max-w-7xl mx-auto px-[48px]">
    <h1 
      className="text-[48px] leading-[1.2] font-bold text-white mb-[24px]"
      style={{ fontFamily: "'Noto Serif', serif" }}
    >
      Qatar Fresh Herbs Market
    </h1>
    <p className="text-[18px] leading-[1.6] text-[#d4d4d4] mb-[32px]">
      Comprehensive analysis of market size, share, growth drivers,
      competitive landscape & forecast through 2030.
    </p>
    <button className="
      bg-[#b01f24]
      hover:bg-[#8f181d]
      text-white
      px-8 py-4
      rounded-[5px]
      font-bold
      transition-colors duration-200
    ">
      Download Sample Report
    </button>
  </div>
</section>
```

### Example 2: Alternating Sections

```tsx
<main>
  {/* Section 1 - White */}
  <section className="bg-white py-[64px]">
    <div className="max-w-7xl mx-auto px-[48px]">
      <h2 
        className="text-[32px] font-bold text-[#000000] mb-[16px]"
        style={{ fontFamily: "'Noto Serif', serif" }}
      >
        Market Overview
      </h2>
      <p className="text-[16px] text-[#525252] leading-[1.6]">
        Section content...
      </p>
    </div>
  </section>
  
  {/* Section 2 - Warm */}
  <section className="bg-[#f5f2f1] py-[64px]">
    <div className="max-w-7xl mx-auto px-[48px]">
      <h2 
        className="text-[32px] font-bold text-[#000000] mb-[16px]"
        style={{ fontFamily: "'Noto Serif', serif" }}
      >
        Key Insights
      </h2>
      <p className="text-[16px] text-[#525252] leading-[1.6]">
        Section content...
      </p>
    </div>
  </section>
  
  {/* Section 3 - White */}
  <section className="bg-white py-[64px]">
    <div className="max-w-7xl mx-auto px-[48px]">
      <h2 
        className="text-[32px] font-bold text-[#000000] mb-[16px]"
        style={{ fontFamily: "'Noto Serif', serif" }}
      >
        Competitive Landscape
      </h2>
      <p className="text-[16px] text-[#525252] leading-[1.6]">
        Section content...
      </p>
    </div>
  </section>
</main>
```

### Example 3: Card Grid

```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
  {items.map((item) => (
    <div 
      key={item.id}
      className="
        bg-white
        border border-[#e5e5e5]
        rounded-[8px]
        p-[24px]
        hover:shadow-md
        transition-shadow duration-200
      "
    >
      {/* Icon */}
      <div className="
        w-12 h-12
        rounded-[8px]
        bg-[#f5f6fd]
        flex items-center justify-center
        mb-[16px]
      ">
        <item.icon className="text-[#a7abf0] w-6 h-6" />
      </div>
      
      {/* Title */}
      <h3 className="text-[18px] font-semibold text-[#000000] mb-[8px]">
        {item.title}
      </h3>
      
      {/* Description */}
      <p className="text-[14px] text-[#525252] leading-[1.6]">
        {item.description}
      </p>
    </div>
  ))}
</div>
```

---

## 🔄 Import Patterns

### TypeScript Imports

```typescript
// Full import
import { colors, typography, spacing } from '@/design-system';

// Selective import
import { colors } from '@/design-system/colors';
import { semanticSpacing } from '@/design-system/spacing';

// Usage
const Button = () => {
  return (
    <button style={{ 
      backgroundColor: colors.brand.red,
      color: colors.foundation.white,
      padding: spacing[4],
      borderRadius: borderRadius.md,
    }}>
      Click me
    </button>
  );
};
```

### CSS Variable Imports

```css
/* In your CSS file */
@import '../styles/theme.css';

.custom-button {
  background-color: var(--brand-red);
  color: var(--white);
  padding: var(--space-md);
  border-radius: var(--radius-md);
}

.custom-button:hover {
  background-color: var(--brand-red-hover);
}
```

---

## 🧪 Testing Checklist

Before shipping, verify:

- [ ] All CTAs use Ken Bold Red (#b01f24)
- [ ] Body text uses Grayscale 600 (#525252), NOT black
- [ ] Headlines use Noto Serif, body text uses DM Sans
- [ ] Alternating sections use white → warm-300 → white
- [ ] All spacing is in multiples of 4px
- [ ] Border radius is 5px (standard) or 8px (cards)
- [ ] Icon backgrounds use periwinkle-100 + periwinkle-600
- [ ] No colors exist outside the design system
- [ ] Line heights are 1.6 (body) or 1.2 (headlines)
- [ ] Responsive padding matches container tokens

---

## 📞 Support

**Design System Location:** `/design-system/`  
**CSS Variables:** `/src/styles/theme.css`  
**Interactive Docs:** Navigate to `/design-system-page` in the app  
**Complete Documentation:** `/design-system/README.md`

**Questions?** Contact Ken Research Design Team

---

**Version:** 2.0.0  
**Last Updated:** January 23, 2026  
**Handover Complete** ✅