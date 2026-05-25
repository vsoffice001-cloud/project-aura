# Design System VS 26 - Quick Reference

## 🚀 Quick Start

### Import Components

```tsx
// Button with animated arrow
import { Button } from '@/design-system/Button';

// Link components
import { CTALink } from '@/app/components/CTALink';
import { InlineLink } from '@/app/components/InlineLink';

// Hooks
import { useShimmer } from '@/app/hooks';

// Design tokens
import { colors, typography, spacing } from '@/design-system/tokens';
```

---

## 🎨 Component Cheat Sheet

### Button

```tsx
// Brand CTA with urgency arrow
<Button variant="brand" size="lg" animatedArrow>
  Get Started
</Button>

// Primary button (no arrow)
<Button variant="primary" size="md">
  Download Report
</Button>

// Secondary with icon
<Button variant="secondary" icon={<Download />}>
  Export Data
</Button>

// Ghost on dark background
<Button variant="ghost" background="dark">
  Learn More
</Button>

// Loading state
<Button loading>Processing...</Button>

// Disabled
<Button disabled>Unavailable</Button>

// Icon only
<Button iconOnly icon={<Settings />} ariaLabel="Settings" />
```

**Props Quick Reference:**
- `variant`: `'primary'` | `'secondary'` | `'ghost'` | `'brand'`
- `size`: `'sm'` (40px) | `'md'` (48px) | `'lg'` (56px) | `'xl'` (64px)
- `background`: `'light'` | `'dark'`
- `animatedArrow`: `boolean` - Show arrow animation for urgency CTAs
- `icon`: `ReactNode` - Optional icon
- `iconPosition`: `'left'` | `'right'`
- `loading`: `boolean`
- `disabled`: `boolean`
- `fullWidth`: `boolean`

---

### CTALink

```tsx
// Brand CTA link
<CTALink href="/contact" variant="brand" size="lg">
  Schedule Consultation
</CTALink>

// Default (black) CTA link
<CTALink href="/signup" variant="default" size="md">
  Create Account
</CTALink>
```

**Props Quick Reference:**
- `variant`: `'default'` (black) | `'brand'` (red)
- `size`: `'sm'` (16px) | `'md'` (20px) | `'lg'` (25px)
- `href`: `string` - Destination URL

**When to Use:**
- ✅ Forms, redirects, high-priority actions
- ❌ NOT within paragraphs

---

### InlineLink

```tsx
// Simple inline link
<InlineLink href="/methodology">
  design methodology
</InlineLink>

// In paragraph context
<p>
  Learn more about our{' '}
  <InlineLink href="/methodology">
    design methodology
  </InlineLink>{' '}
  and how we approach problems.
</p>
```

**Props Quick Reference:**
- `href`: `string` - Destination URL

**When to Use:**
- ✅ Within paragraphs for cross-references
- ❌ NOT for primary actions or CTAs

---

## 🎯 Decision Tree

```
Need a clickable element?
│
├─ Primary page action (e.g., form submission)?
│  └─ Button variant="brand" animatedArrow ✓
│
├─ Secondary page action (e.g., download)?
│  └─ Button variant="primary" ✓
│
├─ Form redirect in section?
│  └─ CTALink variant="brand" ✓
│
├─ Cross-reference within paragraph?
│  └─ InlineLink ✓
│
└─ Navigation (non-urgent)?
   └─ Button variant="ghost" ✓
```

---

## 🎨 Color System (92-5-3)

### Foundation Colors (92%)
```tsx
colors.black       // #000000 - Text, hero backgrounds
colors.white       // #ffffff - Primary backgrounds
colors.warmBg      // #f5f2f1 - Section backgrounds
colors.warmBorder  // #eae5e3 - Borders
```

### Brand Red (5% - CTAs ONLY)
```tsx
colors.brand.red600  // #b01f24 - Primary brand
colors.brand.red700  // #8f181d - Hover
colors.brand.red800  // #771419 - Active
```

### Accents (3% - Shadows/Highlights ONLY)
```tsx
colors.accent.purple600      // #806ce0
colors.accent.periwinkle500  // #c3c6f9
colors.accent.perano500      // #dfeafa
colors.accent.warm600        // #d9d1ce
```

### Element-Color Classification

| Element Type | Color Tier | Example |
|--------------|-----------|---------|
| Utility/Navigation | 92% Foundation (black/white) | ScrollToTop, pagination, breadcrumbs |
| Conversion CTA | 5% Brand Red | "Download Report", "Get Started" |
| Content Icons | 3% Purple (stroke only) | Feature icons, metric icons |
| Decorative | 3% Accent (low opacity) | Shadow tints, icon backgrounds |

**Purple (#806ce0) boundaries:**
- ✅ Icon stroke, 10% opacity fills, 6% shadow tints
- ❌ Solid backgrounds, text color, full-opacity borders

---

## 📏 Typography Scale (Major Third 1.25)

```tsx
// CSS Variables
var(--text-xs)    // 12.8px - Labels, metadata
var(--text-sm)    // 16px - Standard body
var(--text-base)  // 20px - Large body, card titles
var(--text-lg)    // 25px - Card titles (2-3 cards)
var(--text-xl)    // 31.25px - Subsection H3
var(--text-2xl)   // 39px - Section H2
var(--text-3xl)   // 48.8px - Hero H1 ONLY

// TypeScript Tokens
typography.size.xs    // '0.8rem'
typography.size.sm    // '1rem'
typography.size.base  // '1.25rem'
typography.size.lg    // '1.563rem'
typography.size.xl    // '1.953rem'
typography.size['2xl'] // '2.441rem'
typography.size['3xl'] // '3.052rem'
```

---

## 📦 Spacing Scale (4px base)

```tsx
// CSS Variables
var(--button-height-sm)  // 40px
var(--button-height-md)  // 48px ← DEFAULT
var(--button-height-lg)  // 56px
var(--button-height-xl)  // 64px

// TypeScript Tokens
spacing.px[4]   // 16px
spacing.px[6]   // 24px
spacing.px[8]   // 32px
spacing.px[12]  // 48px
spacing.px[16]  // 64px
```

---

## 🎭 Border Radius (3 Tiers)

```tsx
borderRadius.image  // 2.5px - Images, photos
borderRadius.small  // 5px - Buttons, badges
borderRadius.large  // 10px - Cards, containers
```

**Rule:** Never mix radius sizes within the same component!

---

## ⚡ Animation Tokens

```tsx
// Duration
duration.instant  // 150ms
duration.fast     // 300ms
duration.normal   // 600ms
duration.slow     // 900ms

// Easing
easing.smooth     // cubic-bezier(0.22, 1, 0.36, 1)
easing.bounce     // cubic-bezier(0.34, 1.56, 0.64, 1)
easing.sharp      // cubic-bezier(0.4, 0, 0.2, 1)
easing.out        // cubic-bezier(0, 0, 0.2, 1)
```

---

## 📱 Responsive Breakpoints

```tsx
breakpoints.sm   // 640px
breakpoints.md   // 768px
breakpoints.lg   // 1024px
breakpoints.xl   // 1280px
breakpoints['2xl'] // 1536px
```

---

## 🎯 Common Patterns

### Pattern 1: Hero CTA
```tsx
<section className="bg-black text-white">
  <h1 className="text-[var(--text-3xl)]">
    Global AI in Healthcare Market Analysis 2024
  </h1>
  <Button variant="brand" size="lg" animatedArrow>
    Get Full Report
  </Button>
</section>
```

### Pattern 2: Section with CTALink
```tsx
<section>
  <h2 className="text-[var(--text-2xl)]">Research Methodology</h2>
  <p className="text-[var(--text-sm)]">Our comprehensive approach...</p>
  <CTALink href="/methodology" variant="brand" size="md">
    Learn More About Our Process
  </CTALink>
</section>
```

### Pattern 3: Content with Inline Links
```tsx
<section>
  <p>
    Our analysis follows the{' '}
    <InlineLink href="/framework">4W+H framework</InlineLink>{' '}
    and incorporates{' '}
    <InlineLink href="/sources">peer-reviewed sources</InlineLink>.
  </p>
</section>
```

### Pattern 4: Button Group
```tsx
<div className="flex gap-4">
  <Button variant="brand" animatedArrow>
    Get Started
  </Button>
  <Button variant="secondary">
    View Demo
  </Button>
</div>
```

---

## ✅ Quality Checklist

Before pushing code:

- [ ] Used `animatedArrow` ONLY for urgency CTAs
- [ ] Followed 92-5-3 color hierarchy
- [ ] Used Major Third typography scale
- [ ] Button size is appropriate (md default)
- [ ] Shimmer effect present on buttons
- [ ] Inline links ONLY in paragraphs
- [ ] CTALinks for standalone CTAs
- [ ] Tested with keyboard navigation
- [ ] Tested with prefers-reduced-motion
- [ ] No mixing of border radius sizes

---

## 🐛 Common Mistakes

❌ **Wrong:**
```tsx
// Using arrow for navigation
<Button animatedArrow>Learn More</Button>

// CTALink in paragraph
<p>Read our <CTALink>docs</CTALink></p>

// InlineLink as primary CTA
<InlineLink href="/signup">Get Started</InlineLink>

// Overusing brand red
<div className="bg-[var(--brand-red)]">...</div>
```

✅ **Correct:**
```tsx
// No arrow for navigation
<Button variant="ghost">Learn More</Button>

// InlineLink in paragraph
<p>Read our <InlineLink href="/docs">docs</InlineLink></p>

// CTALink as primary CTA
<CTALink href="/signup" variant="brand">Get Started</CTALink>

// Brand red only for CTAs
<Button variant="brand">Sign Up</Button>
```

---

## 💡 Pro Tips

1. **Button Sizing:** Use `md` (48px) as default. Use `lg` only for big heroes.

2. **Arrow Animation:** Reserve for forms and redirects only. Overuse dilutes urgency.

3. **Color Hierarchy:** If in doubt, use black/white. Brand red is precious!

4. **Typography:** Stick to the scale. Don't hardcode pixel sizes.

5. **Shimmer Effect:** It's ALWAYS active. Don't disable it!

6. **Link Hierarchy:** Button > CTALink > InlineLink. Use the right tool for the job.

7. **Accessibility:** Always provide `ariaLabel` for icon-only buttons.

8. **Motion:** Test with `prefers-reduced-motion` enabled.

---

## 📞 Need Help?

Check the complete documentation in `/DESIGN_SYSTEM_VS26_IMPLEMENTATION.md`

---

**Design System VS 26 | Quick Reference v1.0.0**