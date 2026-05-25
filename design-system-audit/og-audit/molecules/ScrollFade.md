# ScrollFade — Molecule Audit (OG DS)

> **Source:** `Design_system_vs_26 (og and final)/src/app/components/molecules/ScrollFade.tsx:14-62`
> No top-of-file JSDoc — molecule's purpose evident from name + props.

---

## 1. WHAT
A native-scroll horizontal container with edge-fade gradients (left and right) that appear when content overflows in that direction. Optional chevron buttons (on hover) for click-to-scroll. Uses `scrollLeft` (native scroll) rather than transform — lighter than `HorizontalScroll`, no drag/momentum.

## 2. WHY
- **Lightweight alternative to `HorizontalScroll`** — when you only need edge fades + optional buttons but not drag/touch-throw/momentum, this is the right tool.
- **Native scroll = native momentum** on touch devices — works as expected without JS gymnastics.
- **Edge fades indicate scroll affordance** without visible scrollbars (`scrollbarWidth: none`).
- **Tab-strip pattern** — useful for documentation pages, navigation strips, tab pills.

## 3. WHEN to use ✅
- Documentation tab strips · `NavigationDocumentation.tsx:108, 144, 197`
- Compact horizontal nav with fading edges
- Anywhere a native-scroll row with visual fade is enough (no drag needed)

## 4. WHEN NOT to use ❌
- Card carousels needing drag-throw → use `HorizontalScroll`
- Touch-momentum-critical UX → native momentum is fine but `HorizontalScroll` adds intentional click-suppression
- Vertical scroll → not supported
- When you need precise scrollLeft control → exposes none

## 5. WHERE used (file:line)
- `components/NavigationDocumentation.tsx:108, 144, 197` — primary consumer (tab strips)

## 6. HOW to implement

```tsx
import { ScrollFade } from '@/app/components/molecules/ScrollFade';

// Tab strip
<ScrollFade showButtons className="pb-1">
  <div className="flex gap-2 px-4">
    {tabs.map(t => <Tab key={t.id} {...t} />)}
  </div>
</ScrollFade>

// On dark surface — match fadeBg
<ScrollFade fadeBg="#0a0a0c" fadeWidth={48} showButtons>
  ...
</ScrollFade>

// Inner overflow styling
<ScrollFade innerClassName="py-2">
  ...
</ScrollFade>
```

## 7. Composition tree
- Wrapping `<div>` (with `group/sf` if showButtons)
- Left fade `<div>` (gradient L→R) — when canScrollLeft
- Left chevron `<button>` — when showButtons && canScrollLeft
- Right fade `<div>` (gradient R→L) — when canScrollRight
- Right chevron `<button>` — when showButtons && canScrollRight
- Scroll container `<div ref={scrollRef}>` w/ `overflow-x-auto` + `scrollbarWidth: none`
- Children

**Hooks:** `useRef`, `useState`, `useEffect`, `useCallback`.
**Icons:** `ChevronLeft`, `ChevronRight`.
**Resize:** `ResizeObserver` for bounds updates.

## 8. Properties

| Prop | Type | Default | WHY |
|---|---|---|---|
| `children` | ReactNode | — (required) | Content to scroll |
| `fadeBg?` | string | `'white'` | Fade gradient base color (match surface) |
| `fadeWidth?` | number | `32` | Fade gradient width in px |
| `showButtons?` | boolean | `false` | Render hover chevrons |
| `className?` | string | `''` | Outer wrapper class |
| `style?` | CSSProperties | — | Outer wrapper inline style |
| `innerClassName?` | string | `''` | Scrollable inner container class |

## 9. Data contract
No data input — layout primitive.

## 10. States
- **canScrollLeft / canScrollRight** — derived from `scrollLeft` vs `scrollWidth - clientWidth`.
- **Fade visibility** — driven by above flags.
- **Buttons:**
  - Hidden by default (`opacity-0`)
  - Visible on `group-hover/sf` AND when scroll possible in that direction.

## 11. Variants
None at prop level. `showButtons` flag is closest to a variant.

## 12. Responsive behavior
- `ResizeObserver` watches scroll container + first child for bounds updates.
- Fade width fixed (default 32px) regardless of viewport.
- Buttons scaled w-7 h-7 (28×28) — smaller than `HorizontalScroll`'s w-9 h-9 (intentional compactness).

## 13. Tokens used
None directly. Uses inline white/transparent + Tailwind utilities.

## 14. A11y rules
- Chevron buttons have `aria-label="Scroll left/right"` ✅
- **Gap:** no keyboard arrow-key support for scroll
- **Gap:** no `role="region"` on scroll container
- **Gap:** scrollbar hidden — keyboard-only users may have no scroll affordance beyond chevrons

## 15. Motion rules
- Scroll click uses `behavior: "smooth"` (line 40)
- Buttons fade-in on hover: `transition-all duration-300`
- Button hover scale + shadow swap: `hover:scale-105 hover:shadow-lg`
- No reduced-motion guard

## 16. Anti-patterns ❌
- Don't use when drag interaction is desired — use `HorizontalScroll`.
- Don't pass `fadeBg="transparent"` — fade gradient invisible.
- Don't wrap inside another `overflow-x` container.
- Don't pass child with fixed height that exceeds parent — outer wrapper doesn't manage height.
- Don't use for vertical scroll.
- Don't override `scrollbarWidth: none` via innerClassName — molecule's contract is "hidden scrollbar with fades".
- Don't put a single non-overflowing child — buttons + fades never appear; molecule adds JS for nothing.

## 17. REUSABILITY SCORE
**3/5 ⭐⭐⭐** — Useful for tab strips and nav rows. Less universal than `HorizontalScroll`. Loses points for limited current usage and overlap with `HorizontalScroll`.

## 18. Linked components
- **Sibling molecule:** `HorizontalScroll` (heavier, drag/momentum/click-suppress)
- **Parent organism:** `NavigationDocumentation` (tab strips)
- **Inside children:** typically `Tab`, `Pill`, navigation links

## 19. Reasons + Decisions log
- **Why both ScrollFade AND HorizontalScroll exist?** Different intents:
  - `ScrollFade`: native scroll + fades + optional buttons. Use for tab strips.
  - `HorizontalScroll`: transform-based, drag-throw, click suppression. Use for content carousels.
- **Why native `scrollLeft` here, not transform?** Tab strips are simple linear; native scroll works fine. No need for momentum or click suppression. Lighter molecule.
- **Why `scrollbarWidth: none` not `display: none` ::-webkit-scrollbar?** Firefox respects `scrollbarWidth`; webkit needs the pseudo. Setting both would be belt-and-suspenders.
- **Why fade width 32px default?** Half the apparent button width — enough mask, not too much obscured content.
- **Why button w-7 h-7 (28px)?** Smaller than HorizontalScroll's 36px — tab-strip context calls for less visual presence.
- **Why `clientWidth * 0.6` per scroll click (line 40)?** 60% of viewport ensures user sees overlap between before/after scroll — prevents disorientation.
- **Why hidden buttons until hover?** Reduce visual clutter; chevrons are recovery affordance.
- **Why `showButtons` opt-in not default true?** Many usages (under-rolling pill rows) don't need buttons — just visual fade. Opt-in keeps default minimal.
- **Why `style` prop + `innerClassName` prop?** Outer needs control for layout (margin, padding outside scroll); inner needs control for content spacing (padding inside scroll without affecting fade edges). Two layers, two props.
- **Why pass `children` directly into scrollRef container?** Caller controls their own flex/grid inside; molecule doesn't dictate layout.
- **Why `+/- 2` tolerance in canScroll detection (line 23-24)?** Subpixel rounding errors — `scrollLeft` can read 0.5 when fully left; 2px tolerance avoids fade flicker.
