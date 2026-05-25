# HorizontalScroll — Molecule Audit (OG DS)

> **Source:** `Design_system_vs_26 (og and final)/src/app/components/molecules/HorizontalScroll.tsx:11-155`
> No top-of-file JSDoc — molecule's docs are implicit in behavior.

---

## 1. WHAT
A custom-built horizontal scroll viewport that renders children in a single row, supports mouse drag, touch swipe, wheel-horizontal, and chevron buttons; with fade gradients masking content overflow on each end. Maintains scroll position via `transform: translateX(...)` rather than native `scrollLeft`, giving precise control over momentum + clamping.

## 2. WHY
- **Native horizontal scroll has UX gaps:** no momentum on mouse drag, scrollbar shows ugly, no edge fades, no programmatic step.
- **Drag-to-scroll on desktop** — matches Apple/Notion carousel feel. Achieved by tracking pointer position + computing velocity → applying transform.
- **Velocity-based momentum** (line 102: `Math.abs(velocity) > 0.2`) — releases inertia for "throw" feel.
- **Click suppression** (line 110): if drag occurred (`hasMoved`), click is canceled — prevents accidental clicks during drag.
- **Wheel hijack** — only when horizontal wheel detected (`|deltaX| > |deltaY|`) — vertical scroll passes through (line 68-72).
- **Edge fades** indicate scroll affordance without showing a scrollbar.
- **Chevron buttons** appear on hover for keyboard/click navigation.

## 3. WHEN to use ✅
- Featured carousels (`FeaturedCarousel.tsx:59`)
- Recently-viewed strips (`RecentlyViewed.tsx:32`)
- Daily highlights row (`PatternsContent.tsx:1081`)
- Horizontal browse sections needing premium drag + buttons + edge fades
- Any row where >viewport-width content needs to scroll horizontally

## 4. WHEN NOT to use ❌
- Vertical scroll → just use page scroll
- Inside a small fixed-width container where overflow-x:auto suffices → overkill
- Pagination-driven carousels (snap to N) → use a snap-points carousel; this is free-scroll
- Below the fold of an infinite-load list → infinite vertical list is its own pattern
- Single-card row that doesn't overflow → renders fades and buttons unnecessarily

## 5. WHERE used (file:line)
- `components/organisms/FeaturedCarousel.tsx:59`
- `components/organisms/RecentlyViewed.tsx:32`
- `components/PatternsContent.tsx:1081`

## 6. HOW to implement

```tsx
import { HorizontalScroll } from '@/app/components/molecules/HorizontalScroll';

<HorizontalScroll fadeBg="white" gap="gap-6" className="px-6">
  {items.map(item => (
    <div key={item.id} className="w-72 flex-shrink-0">
      <ReportCard {...item} />
    </div>
  ))}
</HorizontalScroll>

// On warm light surface, set fadeBg to match
<HorizontalScroll fadeBg="#f5f2f1" gap="gap-4">
  ...
</HorizontalScroll>
```

## 7. Composition tree
- Wrapping `<div class="relative group/scroll">`
- Left fade gradient + left chevron button (when `canScrollLeft`)
- Right fade gradient + right chevron button (when `canScrollRight`)
- Viewport `<div ref={viewportRef}>` (overflow-x: clip)
- Track `<div ref={trackRef}>` (transform translateX, cursor:grab)
- Children rendered in track

**Hooks:** `useRef`, `useState`, `useEffect`, `useCallback`.
**Icons:** `ChevronLeft`, `ChevronRight`.

## 8. Properties

| Prop | Type | Default | WHY |
|---|---|---|---|
| `children` | ReactNode | — (required) | Items to scroll |
| `fadeBg?` | string | `"white"` | Background color of edge fade gradients — must match surface |
| `gap?` | string | `"gap-4"` | Tailwind gap class for track |
| `className?` | string | `""` | Pass-through for outer wrapper |

## 9. Data contract
No data input; pure layout/interaction primitive.

## 10. States
- **canScrollLeft / canScrollRight** — derived from scroll position vs bounds. Drives fade + button visibility.
- **isDragging** — internal, controls cursor / no-transition.
- **velocity** — captured during drag end; >0.2 triggers momentum throw.
- **hasMoved** — drag distance >3px; used to suppress click after drag.

## 11. Variants
None.

## 12. Responsive behavior
- `ResizeObserver` watches viewport + track to update `maxScroll` bounds on resize (line 51-56).
- Children control their own width via `w-*` / `flex-shrink-0` patterns.
- Touch + mouse handlers active simultaneously.
- No mobile-specific layout; same behavior cross-device.

## 13. Tokens used
None directly — pure layout primitive. Uses inline white/transparent colors.

## 14. A11y rules
- Chevron buttons have `aria-label="Scroll left/right"` ✅
- Touch + drag accessible to mouse + keyboard? Partially:
  - **Gap:** no keyboard arrow-key handler — left/right arrow on track doesn't scroll
  - **Gap:** no `role="region"` / `aria-label` on viewport
  - **Gap:** buttons are present but require pointer hover to show
- Interactive children inside (anchors/buttons) are skipped by drag-detect (line 107) — they get their own clicks intact
- Reduced-motion not respected — momentum runs always

## 15. Motion rules
- Drag → instant `transition: none`
- Click chevron / momentum → `transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)` (DS premium easing)
- Button hover scale + shadow swap on hover
- Chevron buttons fade in on `group-hover/scroll`
- No reduced-motion guard

## 16. Anti-patterns ❌
- Don't render children without `flex-shrink-0` — they'll collapse.
- Don't wrap inside another `overflow-x` container — double scroll containers conflict.
- Don't pass `fadeBg="transparent"` — fade gradient becomes invisible; defeats purpose.
- Don't put a fixed-height parent if children differ in height — auto-height works; explicit fixed cuts content.
- Don't put a HorizontalScroll inside a HorizontalScroll — gesture conflicts.
- Don't use for vertical content — molecule is x-axis only.
- Don't rely on native `scrollLeft` from external code — this molecule uses transform, not scrollLeft.

## 17. REUSABILITY SCORE
**5/5 ⭐⭐⭐⭐⭐** — Universal horizontal scroller. Used across 3+ organisms; pattern recurs anywhere "browse a row".

## 18. Linked components
- **Parent organisms:** `FeaturedCarousel`, `RecentlyViewed`, any home-page row organism
- **Sibling molecule:** `ScrollFade` (lighter; uses native scrollLeft + fades; no drag/momentum)
- **Children typically:** `ReportCard`, `DataHighlightCard`, `AnalystPickCardB` in fixed-width wrappers

## 19. Reasons + Decisions log
- **Why transform instead of native scrollLeft?** Native scroll on macOS w/ touchpad has different inertia from mouse-drag inertia. Implementing transform-based gives consistent feel across input types + lets us cancel clicks during drag.
- **Why `overflow-x: clip` instead of `hidden`?** `clip` doesn't create a scroll container — child popovers/tooltips can still escape vertically. `hidden` would clip those too.
- **Why click suppression at `>3px` drag?** Tested values 1-5; 3 is the sweet spot between "I tapped" and "I'm dragging".
- **Why velocity threshold `0.2`?** Below this, throw feels jittery — flick was probably accidental. Above, real throw.
- **Why `* 250` velocity multiplier?** Tested — gives 1-2 viewport widths of throw distance, matching iOS feel.
- **Why wheel only when |deltaX| > |deltaY|?** Vertical wheel should pass through to page scroll. Horizontal-dominant wheel = user wanted x-scroll.
- **Why chevrons only on hover (`group-hover/scroll`)?** Reduce visual noise — buttons are recovery affordance, not primary nav. Touch users use swipe anyway.
- **Why scroll position in `useRef` not `useState`?** No re-render needed per scroll tick; ref avoids re-rendering 60fps.
- **Why `applyTransform(animated)` toggle?** Drag = instant; button-click/momentum = animated. Single function with branch.
- **Why no native arrow-key handling?** Gap. Should add. Tab + arrow keys is a standard accessibility requirement.
- **Why `passive: false` on touchmove (line 113)?** Need `preventDefault()` to suppress page vertical scroll when user is horizontal-dragging. Trade-off: scroll perf flag set false.
- **Why DOMMatrixReadOnly to read current transform (line 88-90)?** Drag begins from current visual position even if user dragged mid-animation. Reading from transform vs scrollPos handles in-flight transitions.
