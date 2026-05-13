# Project KP 2.0 - Quick Reference Card

**Version:** 2.0.0 | **For:** Developers | **Print/Save this page for quick access**

---

## 🎨 COLORS

### Primary Brand Color
```
#b01f24  ← PRIMARY CTA (Ken Bold Red)
#8f181d  ← Hover
#771419  ← Active
```

### Foundation
```
#000000  ← Black (headlines)
#ffffff  ← White (backgrounds)
#525252  ← Body text (grayscale-600) ⭐
```

### Backgrounds
```
#ffffff  ← White sections
#f5f2f1  ← Warm sections (warm-300) ⭐
#f5f5f5  ← Cards (grayscale-100)
```

### Borders
```
#e5e5e5  ← Default borders (grayscale-200) ⭐
#eae5e3  ← Warm borders (warm-500)
```

### Accents
```
#a7abf0  ← Periwinkle (secondary)
#f5f6fd  ← Periwinkle BG (icon backgrounds)
```

### Utilities
```
#16a34a  ← Success (green)
#e11d48  ← Error (rose)
#d97706  ← Warning (amber)
```

---

## 📝 TYPOGRAPHY

### Fonts
```css
/* Headlines (H1-H6 ONLY) */
font-family: 'Noto Serif', serif;

/* Body text, UI, everything else */
font-family: 'DM Sans', sans-serif;
```

### Sizes
```
48px → Hero headlines
36px → H1
32px → H2
26px → H3
22px → H4
18px → H5
16px → H6 / Body (BASE) ⭐
14px → Small text
12px → Captions
```

### Line Heights
```
1.2 → Headlines
1.6 → Body text ⭐
```

---

## 📐 SPACING

### Common Values
```
4px   → spacing[1]
8px   → spacing[2]
16px  → spacing[4] (BASE UNIT) ⭐
24px  → spacing[6] (paragraphs)
32px  → spacing[8]
48px  → spacing[12] (sections) ⭐
64px  → spacing[16] (major sections)
96px  → spacing[24]
```

### Padding Guide
```
Cards:      24px
Buttons:    16px-32px (horizontal), 12px-16px (vertical)
Containers: 48px (desktop), 16px (mobile)
Sections:   48px-64px (vertical)
```

---

## 🔘 COMMON PATTERNS

### Primary CTA Button
```tsx
className="
  bg-[#b01f24]
  hover:bg-[#8f181d]
  active:bg-[#771419]
  text-white
  px-8 py-4
  rounded-[5px]
  font-bold
"
```

### Secondary Button
```tsx
className="
  bg-white
  text-[#b01f24]
  border-2 border-[#b01f24]
  px-6 py-3
  rounded-[5px]
  hover:bg-[#fef2f2]
"
```

### Card
```tsx
className="
  bg-white
  border border-[#e5e5e5]
  rounded-[8px]
  p-[24px]
  hover:shadow-md
"
```

### Icon Background
```tsx
className="
  w-12 h-12
  rounded-[8px]
  bg-[#f5f6fd]
  flex items-center justify-center
"
<!-- Icon inside -->
className="text-[#a7abf0] w-6 h-6"
```

### Section
```tsx
<section className="bg-[#f5f2f1] py-[64px]">
  <div className="max-w-7xl mx-auto px-[48px]">
    <!-- content -->
  </div>
</section>
```

### Headline
```tsx
<h1 
  className="text-[36px] leading-[1.2] font-bold text-[#000000]"
  style={{ fontFamily: "'Noto Serif', serif" }}
>
  Headline Text
</h1>
```

### Body Text
```tsx
<p className="text-[16px] leading-[1.6] text-[#525252]">
  Body paragraph text
</p>
```

---

## 🎯 DESIGN RULES

### Colors
✅ CTAs = #b01f24 (Ken Bold Red)  
✅ Body text = #525252 (NOT black)  
✅ Headlines = #000000 (pure black)  
✅ Alternating sections = white → warm → white

### Typography
✅ Noto Serif = H1-H6 ONLY  
✅ DM Sans = Body + UI  
✅ Line height = 1.6 (body), 1.2 (headlines)

### Spacing
✅ All spacing = multiples of 4px  
✅ Section padding = 48px or 64px  
✅ Card padding = 24px  
✅ Border radius = 5px (standard), 8px (cards)

---

## 🚫 COMMON MISTAKES

### ❌ WRONG
```tsx
// Using pure black for body text
<p className="text-black">

// Using Noto Serif for body
<p style={{ fontFamily: "'Noto Serif', serif" }}>

// Arbitrary spacing
<div className="px-[17px]">

// Wrong button color
<button className="bg-blue-600">

// Creating custom colors
<div className="bg-[#7a3fe4]">
```

### ✅ CORRECT
```tsx
// Grayscale-600 for body text
<p className="text-[#525252]">

// DM Sans for body
<p style={{ fontFamily: "'DM Sans', sans-serif" }}>

// Multiples of 4
<div className="px-[16px]">

// Ken Bold Red for CTAs
<button className="bg-[#b01f24]">

// Use design system colors
<div className="bg-[#a7abf0]">
```

---

## 📦 IMPORT GUIDE

### TypeScript
```typescript
import { colors, typography, spacing } from '@/design-system';

// Use tokens
colors.brand.red              // #b01f24
colors.grayscale[600]         // #525252
typography.fontFamily.body    // 'DM Sans'
spacing[4]                    // '16px'
```

### CSS Variables
```css
var(--brand-red)              /* #b01f24 */
var(--black-600)              /* #525252 */
var(--warm-300)               /* #f5f2f1 */
var(--space-4)                /* 16px */
var(--font-body)              /* 'DM Sans' */
var(--radius-md)              /* 5px */
```

---

## 📱 RESPONSIVE SPACING

### Container Padding
```
Mobile:   16px
Tablet:   32px
Desktop:  48px ⭐
Wide:     64px
```

### Section Spacing
```
Small:  32px
Medium: 48px ⭐
Large:  64px
XLarge: 96px
```

---

## 🎨 ALTERNATING SECTIONS PATTERN

```tsx
<section className="bg-white py-[64px]">
  <!-- Section 1 - White -->
</section>

<section className="bg-[#f5f2f1] py-[64px]">
  <!-- Section 2 - Warm -->
</section>

<section className="bg-white py-[64px]">
  <!-- Section 3 - White -->
</section>
```

---

## 🔗 RESOURCES

- **Full Docs:** `/design-system/README.md`
- **Handover Guide:** `/design-system/HANDOVER-GUIDE.md`
- **Interactive Demo:** Navigate to `/design-system-page`
- **CSS Variables:** `/src/styles/theme.css`
- **Import From:** `/design-system/index.ts`

---

## ⚡ MOST USED VALUES (Memorize These!)

```
COLORS:
#b01f24  Primary CTA
#525252  Body text
#f5f2f1  Section backgrounds
#e5e5e5  Borders

SPACING:
16px     Base unit
24px     Paragraphs
48px     Sections
64px     Major sections

RADIUS:
5px      Standard
8px      Cards

FONTS:
Noto Serif   → Headlines
DM Sans      → Body/UI
```

---

**Version:** 2.0.0 | **Quick Reference Card** | Print or bookmark this page 🔖