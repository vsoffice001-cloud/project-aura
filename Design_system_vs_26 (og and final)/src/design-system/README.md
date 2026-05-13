# Design System Components & Utilities

This folder contains reusable design system components, tokens, and utilities that can be imported anywhere in the application.

---

## 📦 What's Inside

### **tokens.ts**
All design tokens as TypeScript constants for type-safe usage.

**Includes:**
- Colors (primary, brand red, accents)
- Gradients
- Typography scale (Major Third 1.25 ratio)
- Spacing scale (4px base)
- Border radius system
- Shadows
- Animation (easing, duration)
- Breakpoints
- Layout constraints
- Opacity values
- Z-index scale

### **ColorSwatch.tsx**
Components for displaying color swatches in documentation and showcases.

**Components:**
- `ColorSwatch` - Single color display
- `ColorSwatchGrid` - Grid layout for multiple colors
- `GradientSwatch` - Gradient display

### **TypeScale.tsx**
Components for visualizing the typography scale.

**Components:**
- `TypeScale` - Full typography scale showcase
- `TypeScaleItem` - Single type size display
- `TypeScaleComparison` - Compare two sizes
- `TypeHierarchyExample` - Proper heading hierarchy

### **SpacingScale.tsx**
Components for visualizing spacing values.

**Components:**
- `SpacingScale` - Full spacing scale
- `SpacingScaleItem` - Single spacing value
- `SpacingExample` - Spacing in layout context
- `SpacingComparison` - Compare two spacing values
- `SectionSpacingGuide` - Recommended section spacing

### **ComponentCard.tsx**
Wrapper components for showcasing design system elements.

**Components:**
- `ComponentCard` - Showcase wrapper
- `ComponentGrid` - Grid layout for cards
- `ComponentSection` - Section wrapper
- `ComponentSubSection` - Subsection wrapper
- `CodeBlock` - Code display
- `PropertyTable` - Props documentation
- `DoAndDont` - Correct/incorrect examples

### **index.ts**
Barrel export - import everything from here.

---

## 🚀 Quick Start

### Import Design Tokens

```tsx
import { colors, typography, spacing } from '@/design-system';

// Use in components
function MyComponent() {
  return (
    <div style={{ 
      backgroundColor: colors.warmBg,
      fontSize: typography.size['2xl'],
      padding: spacing.rem[8]
    }}>
      Content
    </div>
  );
}
```

### Use Color Swatches

```tsx
import { ColorSwatch, ColorSwatchGrid, colors } from '@/design-system';

function ColorShowcase() {
  return (
    <>
      {/* Single swatch */}
      <ColorSwatch 
        color={colors.black}
        name="Pure Black"
        usage="Primary text, dark backgrounds"
      />
      
      {/* Grid of swatches */}
      <ColorSwatchGrid
        colors={[
          { color: colors.black, name: 'Pure Black' },
          { color: colors.white, name: 'Pure White', showBorder: true },
          { color: colors.warmBg, name: 'Warm Off-White' },
        ]}
        columns={3}
      />
    </>
  );
}
```

### Display Typography Scale

```tsx
import { TypeScale } from '@/design-system';

function TypographyShowcase() {
  return (
    <TypeScale variant="essential" />
  );
}
```

### Show Spacing Scale

```tsx
import { SpacingScale, SpacingExample } from '@/design-system';

function SpacingShowcase() {
  return (
    <>
      {/* Full scale */}
      <SpacingScale showTailwind />
      
      {/* Example in context */}
      <SpacingExample gap={6} layout="grid" itemCount={3} />
    </>
  );
}
```

### Create Component Showcase

```tsx
import { ComponentCard, ComponentGrid } from '@/design-system';
import { Button } from '@/app/components/Button';

function ButtonShowcase() {
  return (
    <ComponentGrid columns={2} gap={8}>
      <ComponentCard
        title="Brand Button"
        variant='variant="brand"'
        usage="✅ Highest conversion priority"
        background="warm"
      >
        <Button variant="brand" size="lg">Click Me</Button>
      </ComponentCard>
      
      <ComponentCard
        title="Primary Button"
        variant='variant="primary"'
        usage="✅ Secondary actions"
        background="warm"
      >
        <Button variant="primary" size="lg">Click Me</Button>
      </ComponentCard>
    </ComponentGrid>
  );
}
```

---

## 🎨 Design Token Usage Examples

### Colors

```tsx
import { colors } from '@/design-system';

// Primary palette
colors.black      // #000000
colors.white      // #ffffff
colors.warmBg     // #f5f2f1
colors.warmBorder // #eae5e3

// Brand red (5% usage - CTAs only)
colors.brand.red600  // #b01f24 (primary)
colors.brand.red700  // #8f181d (hover)

// Accent colors (3% usage - shadows only)
colors.accent.purple600 // #806ce0
```

### Typography

```tsx
import { typography } from '@/design-system';

// Font sizes
typography.size['3xl']  // 3.052rem (48.8px) - Hero H1
typography.size['2xl']  // 2.441rem (39px) - Sections
typography.size.base    // 1.25rem (20px) - Body

// Font weights
typography.fontWeight.bold  // 700

// Line heights
typography.lineHeight['3xl']  // 1.2
```

### Spacing

```tsx
import { spacing } from '@/design-system';

// Rem values
spacing.rem[6]   // 1.5rem (24px)
spacing.rem[8]   // 2rem (32px)
spacing.rem[20]  // 5rem (80px)

// Pixel values
spacing.px[6]   // 24
spacing.px[8]   // 32
spacing.px[20]  // 80
```

### Border Radius

```tsx
import { borderRadius } from '@/design-system';

borderRadius.image  // 2.5px (images, photos)
borderRadius.small  // 5px (buttons, small cards)
borderRadius.large  // 10px (big cards, containers)
```

### Shadows

```tsx
import { shadows } from '@/design-system';

shadows.sm  // Subtle elevation
shadows.md  // Standard cards
shadows.lg  // Prominent elements

// Special shadows
shadows.brandButton.default  // Brand button shadow
shadows.brandButton.hover    // Brand button hover glow
```

---

## 🛠️ Utility Functions

### Spacing Utilities

```tsx
import { getSpacingPx, getSpacingRem } from '@/design-system';

const paddingPx = getSpacingPx(8);    // 32
const gapRem = getSpacingRem(6);      // "1.5rem"
```

### Unit Conversion

```tsx
import { remToPx, pxToRem } from '@/design-system';

const pixels = remToPx('2rem');    // 32
const rems = pxToRem(48);          // "3rem"
```

### Breakpoint Utilities

```tsx
import { getBreakpoint, matchesBreakpoint } from '@/design-system';

const mdBreakpoint = getBreakpoint('md');  // 768
const isMobile = !matchesBreakpoint('md'); // true/false
```

### CSS Variable Utilities

```tsx
import { getCSSVariable, setCSSVariable } from '@/design-system';

const textColor = getCSSVariable('--text-3xl');
setCSSVariable('--custom-color', '#000000');
```

### Color Hierarchy Validation

```tsx
import { validateColorHierarchy } from '@/design-system';

const validation = validateColorHierarchy({
  foundationColors: 92,
  brandRedUsage: 5,
  accentUsage: 3,
});

console.log(validation.valid);     // true
console.log(validation.warnings);  // []
```

---

## 📋 TypeScript Types

All tokens have TypeScript types for type-safe usage:

```tsx
import type { 
  Color, 
  BrandColor, 
  TypographySize, 
  SpacingValue 
} from '@/design-system';

function MyComponent({ 
  textSize,
  spacing 
}: { 
  textSize: TypographySize;
  spacing: SpacingValue;
}) {
  // Type-safe!
}
```

---

## ✅ Best Practices

### 1. **Always Import from Barrel Export**
```tsx
// ✅ CORRECT
import { colors, typography } from '@/design-system';

// ❌ WRONG
import { colors } from '@/design-system/tokens';
```

### 2. **Use Type-Safe Token References**
```tsx
// ✅ CORRECT - Type-safe
import { colors } from '@/design-system';
const bg = colors.warmBg;

// ❌ WRONG - Magic strings
const bg = '#f5f2f1';
```

### 3. **Respect the 92-5-3 Color Hierarchy**
```tsx
// ✅ CORRECT - 92% foundation, 5% red, 3% accents
<div style={{ backgroundColor: colors.warmBg }}>
  <Button variant="brand">CTA</Button>
</div>

// ❌ WRONG - Too much color
<div style={{ backgroundColor: colors.accent.purple600 }}>
  <Button variant="brand">CTA 1</Button>
  <Button variant="brand">CTA 2</Button>
</div>
```

### 4. **Use Spacing Tokens Consistently**
```tsx
// ✅ CORRECT - Token reference
<div style={{ padding: spacing.rem[8], gap: spacing.rem[6] }}>

// ❌ WRONG - Magic numbers
<div style={{ padding: '32px', gap: '24px' }}>
```

---

## 🔗 Related Documentation

- **[/DESIGN_TOKENS.md](../../DESIGN_TOKENS.md)** - Complete token reference
- **[/COMPONENT_LIBRARY.md](../../COMPONENT_LIBRARY.md)** - Component specifications
- **[/PATTERN_LIBRARY.md](../../PATTERN_LIBRARY.md)** - Pattern documentation
- **[/DESIGN_PRINCIPLES.md](../../DESIGN_PRINCIPLES.md)** - Design philosophy

---

## 📝 Contributing

When adding new design system utilities:

1. Add tokens to `tokens.ts`
2. Create component in new file (e.g., `NewComponent.tsx`)
3. Export from `index.ts`
4. Update this README
5. Add examples in `/src/app/components/DesignSystemPage.tsx`

---

**Version:** 1.0.0  
**Last Updated:** January 21, 2026
