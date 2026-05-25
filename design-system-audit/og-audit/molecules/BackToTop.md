# BackToTop — Molecule Audit (OG DS)

> **Source:** `Design_system_vs_26 (og and final)/src/app/components/molecules/BackToTop.tsx:13-41`
> **OG comment (line 1-3):** *"Floating button after 600px scroll. Mobile: bottom-16 (clears MobileFilterBar)."*

---

## 1. WHAT
A floating round button fixed to the bottom-right corner of the viewport that, when clicked, smooth-scrolls the page to the top. Appears only after the user has scrolled past a configurable threshold (default 600px) and fades out otherwise.

## 2. WHY
- **Long-scroll page recovery:** listing pages with hundreds of cards make it laborious to return to filters/nav. Native browsers don't offer a "back to top" affordance.
- **Mobile-thumb-friendly bottom-right placement** (Fitts's Law) — `bottom-16` on mobile specifically **clears the MobileFilterBar** (OG comment line 3) so it doesn't overlap.
- **Self-managed visibility:** consumer doesn't track scroll state — molecule listens internally (passive scroll listener, line 18).
- **Tabbable only when visible:** `tabIndex={visible ? 0 : -1}` (line 36) — keyboard users don't tab to an invisible button.

## 3. WHEN to use ✅
- Long listing pages (Report Store, search results)
- Long-form articles/case-studies past 2× viewport height
- Documentation pages with deep ToC
- Any page where average scroll depth >600px in analytics

## 4. WHEN NOT to use ❌
- Short pages (<1.5× viewport) → never visible anyway; adds dead JS
- Pages with sticky in-page nav already offering "jump to top" (avoid two affordances)
- Modals/sheets (scope is window scroll, not container scroll — would not work)
- Inside iframes / scoped-overflow containers (uses `window.scrollY`, line 17)

## 5. WHERE used (file:line)
**No active consumer found in the OG source grep.** Defined and exported (`molecules/index.ts:27`), but no organism wires it in. Likely intended for `App.tsx` / page-level shell; gap noted.

## 6. HOW to implement

```tsx
import { BackToTop } from '@/app/components/molecules/BackToTop';

// page shell — render once
<BackToTop />

// custom threshold (show earlier)
<BackToTop threshold={300} />

// custom class
<BackToTop className="lg:right-10" />
```

## 7. Composition tree
- Single `<button>` element — no nested atoms/molecules
- One Lucide icon (`ArrowUp`)
- Self-contained scroll listener via `useEffect`
- No `useState` for anything except `visible`

**Hooks:** `useState`, `useEffect`.
**Atoms:** none (it's a leaf molecule — could arguably be an atom; classified as molecule for its scroll-listening behavior).

## 8. Properties

| Prop | Type | Default | WHY |
|---|---|---|---|
| `threshold` | number | `600` | Scroll-px before visible. Default chosen for ~1 viewport tall on desktop |
| `className` | string | — | Allow pages to override position (e.g. `lg:right-10`) without forking |

## 9. Data contract
No data input — purely behavioral.

```ts
interface BackToTopProps {
  threshold?: number;   // default 600
  className?: string;
}
```

## 10. States
- **Hidden** (`scrollY <= threshold`): `opacity 0` · `scale(0.85) translateY(8px)` · `pointer-events: none` · `tabIndex=-1`
- **Visible** (`scrollY > threshold`): `opacity 1` · `scale(1) translateY(0)` · `pointer-events: auto` · `tabIndex=0`
- **Hover:** inherits CSS (no inline; cursor-pointer + bg unchanged)
- **Active:** click triggers `window.scrollTo({ top: 0, behavior: 'smooth' })`
- **Reduced-motion:** **NOT handled** — even with `prefers-reduced-motion`, scrollTo uses smooth behavior. Gap.

## 11. Variants
None.

## 12. Responsive behavior
- Mobile: `bottom-16 right-4` — leaves space for sticky filter bar/nav (per OG comment)
- Desktop (`lg:`): `bottom-6 right-6` — closer to corner since no mobile bar
- Width/height fixed `w-10 h-10` both breakpoints — 40×40 just under the WCAG 2.5.5 floor (44px) — **a11y concern**

## 13. Tokens used
- `var(--radius-full)` (pill button)
- Inline shadow `0 4px 20px rgba(0,0,0,0.2), 0 1px 4px rgba(0,0,0,0.1)`
- Tailwind: `bg-white`, `text-black/70`, `border-black/[0.06]`, `backdrop-blur-sm`

> **Note:** no DS color tokens — all rgba/Tailwind. Consistent with OG's "inline rgba" philosophy.

## 14. A11y rules
- `aria-label="Back to top"` (line 24) ✅
- `title="Scroll to top"` tooltip ✅
- `tabIndex` toggles 0/-1 on visibility ✅
- **Touch target 40×40 — below WCAG 2.5.5 floor of 44px** ⚠️
- No focus-visible styling defined (relies on browser default outline)

## 15. Motion rules
- Show/hide: opacity + transform `0.35s cubic-bezier(0.16, 1, 0.3, 1)` (DS premium easing)
- Smooth scroll on click via `behavior: 'smooth'`
- **No `prefers-reduced-motion` respect** — should snap-scroll + no transform if reduced. Gap.

## 16. Anti-patterns ❌
- Don't render multiple instances on the same page — they overlap.
- Don't use inside a scrollable container (modal, drawer) — listens to window scroll only.
- Don't make threshold 0 — button always visible defeats the "hide until needed" UX.
- Don't override `bottom-16` on mobile without checking conflict with sticky bars.
- Don't increase to `w-12 h-12` without proportionally moving the position — bigger button + same margin = touches corner edge.
- **Anti-pattern (current code):** smooth-scroll without reduced-motion check.

## 17. REUSABILITY SCORE
**4/5 ⭐⭐⭐⭐** — Universal utility for long-scroll pages. Loses one star because (a) no current consumer, (b) `prefers-reduced-motion` gap, (c) touch target below 44px.

## 18. Linked components
- **Sibling molecules:** `LoadMoreSentinel` (also bottom-of-page interactivity)
- **Page shells where it should live:** any `<Page>` wrapper / `App.tsx`
- **Hook potentials:** could be refactored to `useScrollPosition` shared hook (currently inline)

## 19. Reasons + Decisions log
- **Why 600px default threshold?** Roughly one full viewport tall on desktop — appears only after user has scrolled "meaningfully". Tunable.
- **Why `bottom-16` mobile vs `bottom-6` desktop?** Mobile has a sticky MobileFilterBar at `bottom-0..h-12-ish`; 16 = 64px clears it. Desktop has no such bar so 24px from edge is fine.
- **Why scale + translate animation, not just opacity?** Adds "presence" — element feels like it pops in rather than flashes. The 0.85 → 1 scale + 8px → 0 translate matches DS "premium" motion (cubic-bezier 0.16/1/0.3/1 = Apple-curve).
- **Why `passive: true` on scroll listener (line 19)?** Performance — non-blocking, no preventDefault needed.
- **Why no debounce / throttle on scroll?** Setting state every event is acceptable here because state only flips on threshold crossing (React diffs out no-op re-renders).
- **Why `unobserve` then re-add via `removeEventListener`?** Standard cleanup pattern to avoid leaks; required by useEffect contract.
- **Why w-10 h-10 (40px) when WCAG floor is 44px?** Likely designer choice for visual mass; **should be 44 minimum**. Flagged.
- **Why no `<a href="#top">`-based pure HTML version?** Smooth scroll + visibility logic needs JS; pure-HTML fallback would jump-scroll. Tradeoff accepted.
