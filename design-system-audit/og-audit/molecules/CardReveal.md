# CardReveal — Molecule Audit (OG DS)

> **Source:** `Design_system_vs_26 (og and final)/src/app/components/molecules/CardReveal.tsx:15-51`
> **OG comment (line 1-5):** *"CardReveal — Viewport-aware card entrance animation. Uses IntersectionObserver + .card-reveal CSS class. Once visible, stays visible. Respects prefers-reduced-motion."*

---

## 1. WHAT
A wrapper component that fades/slides its children in **once** when they scroll into view, using IntersectionObserver to trigger a CSS class swap (`is-visible`) on a `.card-reveal` element. Static-on-entry after first reveal — no re-animation on scroll-out/in. Honors `prefers-reduced-motion` by skipping the animation entirely.

## 2. WHY
- **Cinematic feel for card grids** — sequential reveals add motion polish without GSAP/heavy timeline orchestration.
- **CSS-driven animation, JS-driven trigger** — DS owns the `.card-reveal` rule (transform/opacity/easing); molecule just toggles state.
- **Per-instance `delay` prop** — staggering siblings via `delay={index * 60}` creates wave-in effect without an orchestrator.
- **Once-in semantics** — `observer.unobserve(el)` on intersection (line 33) prevents flicker on re-scroll. Also matches user expectation: "I already saw it".
- **Reduced-motion bypass** (line 23) → immediate `setIsVisible(true)` so end-state shows w/o animation.

## 3. WHEN to use ✅
- Wrap each card in a listing/grid to get staggered scroll-in animation
- Wrap section headings/long-form blocks for editorial reveal
- Use with `delay` to choreograph entrance order across siblings

## 4. WHEN NOT to use ❌
- Above-the-fold content visible on first paint → unnecessary delay
- Repeated re-animation on scroll → this is once-only; use a Framer Motion `useInView` w/o unobserve
- Position-sticky elements → IntersectionObserver behaves oddly with sticky reposition
- Content you don't want hidden if JS fails — reveals require JS to set is-visible class
- Wrapper around `<tr>` / `<li>` (semantic breakage — wraps as `<div>`)

## 5. WHERE used (file:line)
**No active consumer in OG grep.** Exported via `molecules/index.ts:29` but no organism currently wraps cards in it. Likely a designed-for-future molecule.

## 6. HOW to implement

```tsx
import { CardReveal } from '@/app/components/molecules/CardReveal';

// Stagger a grid of report cards
{reports.map((r, i) => (
  <CardReveal key={r.id} delay={i * 60}>
    <ReportCard {...r} />
  </CardReveal>
))}

// Single block fade-in
<CardReveal delay={120}>
  <SectionHeading>Featured</SectionHeading>
</CardReveal>
```

## 7. Composition tree
- Single `<div ref={ref} className="card-reveal ...">`
- Renders `{children}` as-is
- Adds `is-visible` class once IntersectionObserver fires

**Hooks:** `useRef`, `useEffect`, `useState`.
**External:** IntersectionObserver API, `prefers-reduced-motion` media query.
**CSS dep:** `.card-reveal` + `.card-reveal.is-visible` rules in DS global CSS (not in molecule).

## 8. Properties

| Prop | Type | Default | WHY |
|---|---|---|---|
| `children` | ReactNode | — (required) | The content to reveal |
| `delay?` | number | `0` | ms transition-delay for stagger choreography |
| `className?` | string | `""` | Pass-through; appends to `card-reveal is-visible` |

## 9. Data contract

```ts
interface CardRevealProps {
  children: ReactNode;
  delay?: number;     // ms
  className?: string;
}
```

No data input beyond visual children + timing.

## 10. States
- **Pre-reveal:** class `card-reveal` (no `is-visible`) → CSS sets opacity 0 / translateY (defined externally).
- **Post-reveal:** class `card-reveal is-visible` → CSS animates to final state with `transitionDelay: <delay>ms`.
- **Reduced-motion:** `is-visible` set immediately, no animation.
- **Unobserved:** stops listening after first reveal — no further state changes.

## 11. Variants
None.

## 12. Responsive behavior
- IntersectionObserver `rootMargin: "50px 0px -20px 0px"` — fires 50px **before** element enters viewport top, 20px **before** bottom (compensates for fold).
- `threshold: 0.08` — only 8% of element needs to be visible.
- No breakpoint logic — observer works at all viewport widths.

## 13. Tokens used
None directly in this file. **Depends on `.card-reveal` CSS rules in DS global stylesheet** (timing, transform, easing tokens used there).

## 14. A11y rules
- `prefers-reduced-motion: reduce` → no animation, immediate visible (line 23-26) ✅
- Children visible to screen readers regardless of class state (no `aria-hidden`)
- **Gap:** during pre-reveal, CSS may hide via opacity → screen readers may still read; keyboard tabbing reaches "invisible" content. If `.card-reveal` uses `visibility:hidden`, content is screen-reader-hidden too. Verify in DS CSS.

## 15. Motion rules
- All motion is CSS-side; molecule just toggles class
- Reduced-motion check is **runtime** — uses `matchMedia` (line 23), not just CSS, so behavior + class state stay consistent
- Once observed, never re-animates — `unobserve(el)` after first intersection (line 33)

## 16. Anti-patterns ❌
- Don't wrap above-the-fold content — observer triggers immediately, no benefit vs noise.
- Don't wrap in containers that themselves have `overflow:hidden` and clip viewport — IO may never fire.
- Don't pass `delay` >300-400ms — feels broken at higher values.
- Don't nest CardReveal inside CardReveal — both fire independently, can cascade unexpectedly.
- Don't use for content that must respond to scroll-out (parallax) — use Framer `useScroll` instead.
- Don't apply to layout containers like `<table>` — `<div>` wrap breaks table semantics.

## 17. REUSABILITY SCORE
**3/5 ⭐⭐⭐** — Universal scroll-reveal primitive but unused in OG. Will get full 5 stars once page-build process adopts it for case-study/listing surfaces. For now, latent capability.

## 18. Linked components
- **Sibling molecules:** `RevealImage` (img-specific entrance) · `ScrollFade` (different concept — horizontal scroll fade)
- **CSS dependency:** `.card-reveal` / `.card-reveal.is-visible` rules
- **Framer-Motion alternative:** `useInView({ once: true })` from framer-motion (workspace standard 2026-05-08)

## 19. Reasons + Decisions log
- **Why IntersectionObserver, not Framer `useInView`?** Predates the GSAP-removal/Framer-only decision (2026-05-08). At v1, IO + CSS class was the lightest path. Today's standard would be Framer.
- **Why `unobserve` after first trigger?** Performance + intent. Once-seen-once-revealed matches user mental model — no startle on re-scroll.
- **Why `threshold: 0.08`?** Tested vs 0.25 (felt late) and 0 (jumped too early). 8% = "edge starts entering, time to animate".
- **Why `rootMargin: "50px 0px -20px 0px"`?** Top 50px = pre-trigger to feel natural with smooth scroll. Bottom −20px = avoid double-firing when element wraps near fold.
- **Why CSS class swap, not inline style?** Easier to centralize timing/easing in DS CSS. Molecule code stays trivial. Designers tune by editing CSS, not TS.
- **Why no `once` prop to optionally re-animate?** Decision: scrolling content should not re-jolt. If you need re-animation, use a different primitive.
- **Why `delay` via `transitionDelay` inline style?** Easier than per-instance class — just set ms on the element.
- **Why no fallback for environments without IntersectionObserver?** Modern browsers all support; SSR safe (`window.matchMedia` inside useEffect). For very old envs, content stays hidden — accept the regression rather than ship a polyfill.
- **Why molecule, not hook (`useReveal`)?** Wrapper component is one-line consumer code; hook would require ref + className wiring per call site. Wrapper > hook for this use.
