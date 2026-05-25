# RevealImage — Molecule Audit (OG DS)

> **Source:** `Design_system_vs_26 (og and final)/src/app/components/molecules/RevealImage.tsx:12-27`
> **OG comment (line 1-4):** *"RevealImage — Molecule. Wraps img with smooth opacity transition on load."*

---

## 1. WHAT
A thin wrapper around `ImageWithFallback` that fades the image in from a placeholder color when the image finishes loading. Prevents the harsh "click → image pops in fully formed" effect. Falls back to `placeholderBg` color until `onLoad` fires.

## 2. WHY
- **Smooth image entrance** — replaces the abrupt swap between empty space and rendered image.
- **Placeholder bg shows during load** — avoids "Cumulative Layout Shift"-like visual jolt while image fetches.
- **One-line consumer integration** — drop-in replacement for `<img>`/`<ImageWithFallback>`.
- **Composes `ImageWithFallback`** — error-handling fallback already baked in via that atom.

## 3. WHEN to use ✅
- Cards with large images that take noticeable time to fetch
- Hero images / above-the-fold visuals
- Lazy-loaded image grids where pop-in jitter is visible
- Anywhere a `<img>` would be used and the page wants premium polish

## 4. WHEN NOT to use ❌
- Background images (CSS `background-image`) — molecule wraps an `<img>` tag
- Tiny icons (<48px) → load is instant; animation invisible
- SVG inline → use the SVG directly
- Images already wrapped by another reveal mechanism (`CardReveal`) — animations may compound
- When `prefers-reduced-motion` should remove all motion → molecule lacks explicit guard

## 5. WHERE used (file:line)
**No active consumer in OG grep.** Exported via `molecules/index.ts:30`. Likely intended for adoption in cards but `ReportCard` still uses `ImageWithFallback` directly (not RevealImage).

## 6. HOW to implement

```tsx
import { RevealImage } from '@/app/components/molecules/RevealImage';

// Default warm placeholder
<RevealImage
  src="https://..."
  alt="Cover for Renewable Energy report"
  className="w-full aspect-[16/9] object-cover"
/>

// Custom placeholder color (dark surface)
<RevealImage
  src="..."
  alt="..."
  placeholderBg="#1a1a1c"
  className="w-full h-64 object-cover"
/>
```

## 7. Composition tree
- `ImageWithFallback` (atom) with combined style
  - `backgroundColor: placeholderBg`
  - `opacity: 0 → 1` on `onLoad`
  - `transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)`

**Atoms consumed:** `ImageWithFallback`.
**Hooks:** `useState` (loaded).

## 8. Properties

| Prop | Type | Default | WHY |
|---|---|---|---|
| `placeholderBg?` | string | `'rgba(0,0,0,0.04)'` | Color shown while loading; matches surface tint |
| (...rest) | `ImgHTMLAttributes<HTMLImageElement>` | — | Pass-through `src/alt/className/style/...` |

## 9. Data contract

```ts
interface RevealImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  placeholderBg?: string;
}
```

No data input beyond standard `<img>` attrs.

## 10. States
- **Pre-load** (`loaded=false`): `opacity: 0`, `backgroundColor: placeholderBg`
- **Loaded** (`loaded=true`): `opacity: 1`
- **Error:** handled by `ImageWithFallback` atom (verify atom)

## 11. Variants
None.

## 12. Responsive behavior
- No internal layout; consumer's `className`/`style` controls sizing.

## 13. Tokens used
None directly. Consumer provides via className/style.

## 14. A11y rules
- Inherits `alt` from rest props ✅
- **Gap:** if `alt` missing, image is unreadable to SR — consumer responsibility
- **Gap:** no `prefers-reduced-motion` — opacity transition runs always

## 15. Motion rules
- `opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)` (DS premium easing)
- **No reduced-motion guard** — should set transition to none when reduced

## 16. Anti-patterns ❌
- Don't omit `alt` (regress a11y).
- Don't pass mismatched `placeholderBg` to surface (e.g., white placeholder on dark surface → flash).
- Don't use for tiny icons — adds JS overhead for invisible effect.
- Don't double-wrap with `<CardReveal>` — competing animations.
- Don't override `onLoad` in rest props — molecule's load handler will be replaced and reveal won't fire.

## 17. REUSABILITY SCORE
**3/5 ⭐⭐⭐** — Useful primitive but unadopted in OG. Should be the default img wrapper for cards/hero shots. Currently latent capability.

## 18. Linked components
- **Underlying atom:** `ImageWithFallback` (handles error/fallback)
- **Sibling molecule:** `CardReveal` (full-element reveal; this is image-only)
- **Should be consumed by:** `ReportCard`, `AnalystPickCardB`, `DataHighlightCard` (currently use `ImageWithFallback` directly)

## 19. Reasons + Decisions log
- **Why `rgba(0,0,0,0.04)` default?** Subtle gray that works on both light surfaces (`#f5f2f1` warm) and white. Visible enough to mark "image will load here", invisible enough not to flash.
- **Why opacity 0.4s with cubic-bezier(0.16,1,0.3,1)?** DS premium easing repeated across molecules (CardReveal, MobileFilterSheet, HorizontalScroll). Consistent motion personality.
- **Why not use `<img loading="lazy">`?** Lazy loading is independent of reveal animation; they should compose (lazy + reveal). This molecule handles reveal; consumer adds `loading="lazy"` via rest prop.
- **Why no IntersectionObserver?** Different molecule (`CardReveal`) handles viewport reveal. This molecule handles network-load reveal. Two separate concerns.
- **Why `placeholderBg` prop instead of token?** Surfaces vary (warm light, dark cinematic) — consumer picks. Future: could derive from CSS variable.
- **Why no blur-up / LQIP placeholder?** Out of scope for v1; would require server-side LQIP generation pipeline. Solid color is the minimum useful placeholder.
- **Why fade duration 400ms not 300/500?** Tested — 400ms matches typical perceived "this loaded smoothly". Faster = pop. Slower = sluggish.
- **Why composed on `ImageWithFallback` not raw `<img>`?** Error fallback already handled in atom; molecule reuses.
- **Why no `onLoad` callback prop?** Internal `onLoad` would conflict with user's `onLoad`. Acceptable v1 limitation; could expose `onReveal` if needed.
- **Why no support for `srcset`?** Pass-through via rest props; consumer can include srcset in their attrs — molecule doesn't interfere.
