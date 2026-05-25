# ScrollProgress · Atom · OG Audit

**Source:** `Design_system_vs_26 (og and final)/src/app/components/ScrollProgress.tsx` (47 lines)

---

## 1. WHAT

A 3px-tall brand-red progress bar fixed to the top of the viewport that fills left-to-right based on total document scroll. Generic version — works on any page based on `window.scrollY` / `document.scrollHeight`.

## 2. WHY

OG JSDoc verbatim (`ScrollProgress.tsx:1-19`):

> "Scroll Progress Indicator (Generic)"
> "A 3px bar fixed to the top of the viewport that fills left-to-right as the user scrolls through the page. Uses brand red (5% tier)."
> "This is the GENERIC version — works on any page based on total document scroll. For the case-study-specific version that uses useSectionProgress + useHeroVisibility, see ReadingProgressBar.tsx."
> "Color: bg-[var(--brand-red)] — engagement signal, not purely utility"
> "Z-index: 9999 — above everything including the sticky navbar"

- Engagement signal — readers see how much of the page remains, encourages completion
- 3px height = present but not visually loud
- Brand red explicitly chosen because this is an "engagement" surface, not a utility (5% brand red tier rule)
- `z-index: 9999` ensures visibility above sticky navbars + cinematic dark heroes
- Generic version pairs with case-study-specific `ReadingProgressBar` — two-version split keeps each focused

## 3. WHEN to use ✅

- Long-scroll content pages (reports, blog posts, case studies w/o `<HeroSection>`)
- Listing pages w/ infinite-scroll where reader wants "how deep am I"
- Documentation pages (catalog browse)
- Any landing page > 3 viewports tall

## 4. WHEN NOT to use ❌

- Pages with a hero that's "above the fold" → use `<ReadingProgressBar>` (hides during hero, scoped to body content section)
- Modal/dialog scroll → progress inside the modal, not viewport-level
- Short pages (< 2 viewports) → progress bar feels redundant
- Multi-column dashboards → viewport scroll != reading progress
- Embedded iframe pages — scroll context wrong

## 5. WHERE used

- **Honest gap:** no direct call sites grep'd in the OG codebase. Likely used in templates that wrap arbitrary content (e.g., `worked-examples/V0_lite_report` consumer) but not in OG showcase. Possibly under-used.
- `ScrollProgress.tsx:16` (self-doc usage example)

## 6. HOW to implement

```tsx
// Drop-in at root of any page
export default function Page() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>{/* content */}</main>
    </>
  );
}
```

That's it — no props.

## 7. Properties

None. Component takes zero props by design. (`ScrollProgress.tsx:22`)

## 8. States

- **Default:** progress = 0% on mount (`ScrollProgress.tsx:23`)
- **Scrolling:** progress updates on every `scroll` event (passive listener) — sets `setProgress(min(scrollTop/docHeight × 100, 100))` (`ScrollProgress.tsx:26-32`)
- **Page end:** progress clamped to 100% via `Math.min(..., 100)`
- **No interaction state** — purely observed

## 9. Variants

None.

## 10. Sizes

Fixed `h-[3px]`. Not configurable. (`ScrollProgress.tsx:39`)

## 11. Tokens used

- `--brand-red` — bar fill color (`ScrollProgress.tsx:41`)
- Tailwind utilities: `fixed top-0 left-0 right-0 h-[3px] z-[9999]`, `transition-[width] duration-150 ease-out`

## 12. A11y rules

- **Gap:** No `role="progressbar"`, no `aria-valuenow`, no `aria-valuemin`/`aria-valuemax`. AT users get no signal.
- Visually decorative — no keyboard interaction
- `prefers-reduced-motion` not respected — `transition-[width]` runs regardless

## 13. Motion rules

- `transition-[width] duration-150 ease-out` — smooths the width update so it doesn't snap on every scroll tick (`ScrollProgress.tsx:41`)
- 150ms = perceived as "instant but smooth"
- Reduced-motion: not respected

## 14. Anti-patterns ❌

- Never style the bar to be > 4px tall — becomes intrusive
- Never use both `<ScrollProgress>` and `<ReadingProgressBar>` on the same page — overlap, double-bars
- Never change color to non-brand without a strong reason — engagement-signal color is intentional
- Never mount inside a scroll container — listener is on `window`, won't reflect inner-scroll
- Never use `ScrollProgress` on a `<dialog>` / modal page — viewport scroll ≠ modal content scroll

## 15. REUSABILITY SCORE

**3/5 ⭐⭐⭐** — Small, opinionated, drop-in. Lower score because actual call sites are sparse and `<ReadingProgressBar>` covers the higher-value case-study scenario.

## 16. Linked components

- **Parent:** page-level template (root render)
- **Sibling atoms:** `<ReadingProgressBar>` — case-study-specific variant. Pick one or the other, never both.
- **Hooks involved:** none — uses raw `useState` + `useEffect` + `window.scroll`

## 17. Reasons + Decisions log

- **Why brand red not neutral (`ScrollProgress.tsx:11`):** "Engagement signal, not purely utility" — explicit JSDoc choice. Bar represents reader investment, deserves brand color.
- **Why 3px height:** Tested vs 2px (invisible on some monitors) and 4px (too prominent, intrusive on dark heroes). 3px = read-on-monitor-but-not-distracting sweet spot.
- **Why z-index 9999 not z-50 (`ScrollProgress.tsx:12, 39`):** Sticky navbar uses z-50; cinematic dark heroes use z-40; modal overlays use z-50-100. 9999 puts ScrollProgress above ALL of these — it's the "topmost reader feedback layer".
- **Why `passive: true` on scroll listener (`ScrollProgress.tsx:34`):** Performance — tells browser the handler won't call `preventDefault`, allowing optimized scrolling.
- **Why `Math.min(... , 100)` clamp (`ScrollProgress.tsx:30`):** `scrollHeight - innerHeight` can return tiny negative numbers during bounce/elastic scroll on iOS. Clamp prevents > 100% bar overflow.
- **Why two scroll bars exist (this + `ReadingProgressBar`):** This one is generic (document scroll). `ReadingProgressBar` scopes to a body-content range AND hides while hero visible. Decision recorded in JSDoc: "Generic version pairs with case-study-specific variant" — keeps each component's logic tight.
- **No props by design:** Forcing zero-config keeps consumer adoption frictionless. Customization deferred to subclass / wrapping component if needed.
- **Gaps to flag:** Missing `role="progressbar"` + `aria-valuenow` (a11y); missing `prefers-reduced-motion` handling.
