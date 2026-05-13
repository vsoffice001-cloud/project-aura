# Link & CTA Component System

## 📦 Component Overview

This directory contains three specialized components for different linking scenarios:

### 1. **Button** (`/src/app/components/Button.tsx`)
Full-featured button component with shimmer effects and optional arrow animation.

### 2. **CTALink** (`/src/app/components/CTALink.tsx`)
Lightweight text+arrow link with unified hover behavior for urgency CTAs.

### 3. **InlineLink** (`/src/app/components/InlineLink.tsx`)
Subtle paragraph link with red underline for content interlinking.

---

## 🚀 Quick Start

```tsx
import { Button, CTALink, InlineLink } from '@/app/components';

// Button - Primary action
<Button variant="brand" showArrow onClick={handleSubmit}>
  Get Started
</Button>

// CTALink - Unified hover for text+arrow
<CTALink href="/contact" variant="brand">
  Get Started Today
</CTALink>

// InlineLink - Paragraph interlinking
<p>
  Read our <InlineLink href="/docs">documentation</InlineLink> for details.
</p>
```

---

## 📚 Documentation Files

- **Full Documentation:** `/src/app/components/LINK_SYSTEM_DOCUMENTATION.md`
- **Quick Reference:** `/src/app/components/LINK_SYSTEM_QUICK_REFERENCE.md`
- **Summary:** `/IMPROVEMENTS_SUMMARY.md`

---

## 🧪 Testing

To test all components visually:

1. **Replace** `/src/app/App.tsx` content with:
   ```tsx
   export { default } from './test-link-system';
   ```

2. **Or import demo:**
   ```tsx
   import { LinkSystemDemo } from '@/app/components/LinkSystemDemo';
   ```

---

## 🎯 Decision Tree

```
Need a clickable element?
│
├─ Is it a primary action (form, modal)?
│  └─> Use Button
│
├─ Is it a high-urgency CTA (redirect with time pressure)?
│  └─> Use CTALink or Button with showArrow
│
└─ Is it a paragraph cross-reference?
   └─> Use InlineLink
```

---

## 🎨 Visual Hierarchy

**Highest Urgency:**
1. Button Brand + Arrow
2. CTALink Brand
3. Button Primary + Arrow

**Medium Urgency:**
4. CTALink Default
5. Button Secondary
6. Button Primary (no arrow)

**Lowest Urgency:**
7. InlineLink
8. Button Ghost

---

## ✅ Best Practices

### Button
- ✅ Use for primary actions
- ✅ Shimmer is always active (brand signature)
- ✅ Arrow only for urgency CTAs
- ❌ Don't disable shimmer

### CTALink
- ✅ Use for lightweight urgency CTAs
- ✅ Unified hover zone (text OR arrow)
- ✅ Prefer over Button when you want less visual weight
- ❌ Don't use in paragraphs

### InlineLink
- ✅ Use within paragraph text
- ✅ Red underline always visible
- ✅ Warm-100 background on hover
- ❌ Don't add arrow animation

---

## 🔧 Shared Infrastructure

### useShimmer Hook
```tsx
import { useShimmer } from '@/app/hooks';

const { isHovering, handleMouseEnter, handleMouseLeave } = useShimmer(700);
```

Used by all three components for consistent hover state management.

---

## 📊 Props Comparison

| Prop | Button | CTALink | InlineLink |
|------|--------|---------|------------|
| `variant` | 4 options | 2 options | N/A |
| `size` | 4 options | 3 options | Inherits |
| `showArrow` | Optional | Always | Never |
| `icon` | Yes | No | No |
| `loading` | Yes | No | No |
| `disabled` | Yes | No | No |
| `ripple` | Yes | No | No |

---

## 🎨 Shimmer Colors

```css
/* Button Primary */
from-[#141016] via-[#656565] to-[#141016]

/* Button Brand */
from-[#b01f24] via-[#eb484e] to-[#b01f24]

/* Button Secondary Light */
var(--periwinkle-100) /* #f5f6fd */

/* Button Secondary Dark */
#ffffff /* pure white */

/* InlineLink Underline */
#b01f24 /* Ken Bold Red */

/* InlineLink Background */
var(--warm-100) /* #fcfbfa */
```

---

## 🧩 Integration Examples

### Hero Section
```tsx
<section>
  <h1>Transform Your Business</h1>
  <p>Start your journey today</p>
  <Button variant="brand" showArrow>
    Get Started Now
  </Button>
</section>
```

### CTA Section
```tsx
<section>
  <h2>Ready to begin?</h2>
  <CTALink href="/contact" variant="brand" size="lg">
    Contact Us Today
  </CTALink>
</section>
```

### Content Section
```tsx
<section>
  <p>
    Our design system is built on{' '}
    <InlineLink href="/methodology">Atomic Design principles</InlineLink>
    {' '}ensuring consistency across all components.
  </p>
</section>
```

---

## 🔍 Accessibility

All components include:
- ✅ Semantic HTML (`<button>`, `<a>`)
- ✅ Keyboard navigation
- ✅ Focus states
- ✅ ARIA labels (Button)
- ✅ Motion respect (`prefers-reduced-motion`)

---

## 📦 File Structure

```
/src/app/
├── components/
│   ├── Button.tsx                          # Main button component
│   ├── CTALink.tsx                         # Unified hover CTA link
│   ├── InlineLink.tsx                      # Paragraph interlinking
│   ├── LinkSystemDemo.tsx                  # Demo page
│   ├── LINK_SYSTEM_DOCUMENTATION.md        # Full docs
│   ├── LINK_SYSTEM_QUICK_REFERENCE.md      # Quick ref
│   └── AnimatedArrow.tsx                   # Shared arrow
├── hooks/
│   ├── useShimmer.ts                       # Shimmer hook
│   └── index.ts                            # Hook exports
└── test-link-system.tsx                    # Visual test page
```

---

## 🎓 Learning Path

1. **Start:** Read this README
2. **Understand:** Review `/src/app/components/LINK_SYSTEM_QUICK_REFERENCE.md`
3. **Deep Dive:** Read `/src/app/components/LINK_SYSTEM_DOCUMENTATION.md`
4. **Test:** Run `/src/app/test-link-system.tsx`
5. **Build:** Use `LinkSystemDemo` component as reference

---

## 🤝 Contributing

When adding new link/CTA patterns:
1. Consider if it fits into existing components
2. Document use cases clearly
3. Follow established naming conventions
4. Add to LinkSystemDemo for visual testing
5. Update documentation files

---

**Last Updated:** Commit #47  
**Status:** ✅ Production Ready  
**Maintainer:** VS Design System Team
