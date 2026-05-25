# ScrollToTop · Atom · OG Audit

**Source:** `Design_system_vs_26 (og and final)/src/app/components/ScrollToTop.tsx` (62 lines)

---

## 1. WHAT

Floating action button that fades in after 400px of scroll and smooth-scrolls the page to top when clicked. Round black FAB with `ArrowUp` icon, positioned bottom-right. Uses Framer Motion for spring-y fade + scale entrance/exit.

## 2. WHY

OG JSDoc verbatim (`ScrollToTop.tsx:1-15`):

> "Scroll to Top Button"
> "Floating action button that appears after 400px of scroll and smooth-scrolls to the top of the page when clicked."
> "Color: bg-black (92% foundation tier — utility element, not a CTA)"
> "Shape: rounded-full (FAB convention exception to 5px/10px system)"
> "Position: fixed bottom-right, z-50"

- Long-scroll pages need quick-return affordance — modern UX baseline
- Hidden until 400px scrolled → no UI clutter near the top
- Black (not brand red) because this is utility, not conversion (92% foundation tier rule preserves brand red 5% allocation)
- Round FAB shape is intentional convention exception — Material/standard FAB pattern is universally recognized
- Bottom-right placement avoids mobile-OS bottom-edge gestures + matches reading flow (eyes end at right after a line)

## 3. WHEN to use ✅

- Any page > 2 viewports tall
- Report-store listing pages where reader scrolls far
- Long case-study pages (when ReadingProgressBar isn't enough)
- Documentation catalog pages
- Pages w/o a sticky top-nav (gives users a fast "return to start" option)

## 4. WHEN NOT to use ❌

- Pages with a sticky navbar that already includes "back to top" → redundant
- Short pages (< 1.5 viewports) → never triggers, dead weight
- Modal-context pages → scroll context wrong
- Mobile pages with fixed-bottom CTA → competes with `<StickyCTA>` (overlap)
- Embedded widgets / iframes — viewport scroll wrong target

## 5. WHERE used

- `PatternsContent.tsx:190` — pattern catalog page
- `ScrollToTop.tsx:13` (self-doc)
- **Honest gap:** Only 1 grep'd direct usage. Likely under-used or used at template root.

## 6. HOW to implement

```tsx
// Drop-in at page root
<>
  <ScrollProgress />
  <main>...</main>
  <ScrollToTop />
</>
```

No props.

## 7. Properties

None. (`ScrollToTop.tsx:21`)

## 8. States

- **Hidden:** `scrollY <= 400` — `<AnimatePresence>` unmounts the button (`ScrollToTop.tsx:25-27, 43-44`)
- **Visible:** `scrollY > 400` — fades in with `initial={{ opacity: 0, scale: 0.8 }}`, `animate={{ opacity: 1, scale: 1 }}` (`ScrollToTop.tsx:46-48`)
- **Hover:** `whileHover={{ scale: 1.1 }}` — gentle scale up (`ScrollToTop.tsx:49`)
- **Active (tap):** `whileTap={{ scale: 0.95 }}` — gentle scale down (`ScrollToTop.tsx:50`)
- **Click:** smooth-scrolls `window.scrollTo({ top: 0, behavior: 'smooth' })` (`ScrollToTop.tsx:36-39`)
- **Exit:** fades out with `exit={{ opacity: 0, scale: 0.8 }}` when scrolled back above threshold

## 9. Variants

None.

## 10. Sizes

Responsive — `w-10 h-10` on mobile, `sm:w-12 sm:h-12` on tablet+. (`ScrollToTop.tsx:52`)

## 11. Tokens used

- None — uses Tailwind primitives + raw inline shadow values
- `bg-black text-white` — Tailwind primitives
- Shadow: `0_4px_16px_rgba(0,0,0,0.12)` rest → `0_8px_24px_rgba(0,0,0,0.18)` hover (`ScrollToTop.tsx:53`)
- Position: `bottom-20 right-4 sm:bottom-8 sm:right-8` — mobile-friendly (above bottom-nav area), shifts on tablet+

## 12. A11y rules

- `aria-label="Scroll to top"` set (`ScrollToTop.tsx:55`)
- Real `<motion.button>` — keyboard focusable, Enter/Space activates
- `prefers-reduced-motion`: Framer Motion respects via `useReducedMotion()` hook — **NOT explicitly used here**. Framer's `whileHover`/`whileTap`/`initial`/`animate` may or may not respect reduced-motion depending on Framer version. **Gap to verify.**
- 40-48px touch target (meets WCAG 2.5.5 ≥ 44px on `sm:` breakpoint; 40px on mobile is **slightly below** the 44px floor — **smell to flag**)

## 13. Motion rules

- Entrance: `opacity 0 → 1`, `scale 0.8 → 1` — Framer default spring
- Exit: reverse
- Hover: `scale 1.1`
- Tap: `scale 0.95`
- Shadow transition: `transition-shadow duration-300` (`ScrollToTop.tsx:54`)
- Scroll behavior: `behavior: 'smooth'` — native (`ScrollToTop.tsx:38`)
- **Reduced-motion:** Framer Motion's defaults — verify `useReducedMotion` integration. Smooth scroll: native `scroll-behavior: smooth` already opted out via DS-level reduced-motion media query (assumed).

## 14. Anti-patterns ❌

- Never use both `<ScrollToTop>` AND a `<StickyCTA>` bottom-right — they collide. Pick one.
- Never override the 400px threshold without rationale — chosen to balance "appears early enough to be useful" vs "doesn't appear unnecessarily"
- Never change color to brand red — utility element, not a CTA (foundation-tier rule)
- Never remove the `aria-label` — only icon, no text
- Never use on `<dialog>` pages — viewport scroll != dialog scroll
- Never assume rounded-full is the "FAB rule" elsewhere — this is an explicit exception (`ScrollToTop.tsx:9`)

## 15. REUSABILITY SCORE

**3/5 ⭐⭐⭐** — Single-purpose utility. Useful but only on long pages. Drop-in zero-prop = easy adoption, but discovery is low.

## 16. Linked components

- **Parent:** page template root
- **Sibling atoms:** `<ScrollProgress>` (top bar), `<StickyCTA>` (mobile bottom CTA — overlap risk), `<ReadingProgressBar>` (case-study specific)
- **Hooks involved:** none — internal `useState` + `useEffect` on `window.scrollY`. Uses `motion/react` (`AnimatePresence` + `motion.button`)

## 17. Reasons + Decisions log

- **Why 400px threshold (`ScrollToTop.tsx:7, 26`):** Tested — appears just after the hero section on most pages (~viewport-height). Below this, returning to top is trivial without an affordance.
- **Why black not brand red (`ScrollToTop.tsx:8`):** "92% foundation tier — utility element, not a CTA." Brand red is reserved for conversion moments (5% tier).
- **Why `rounded-full` FAB shape (`ScrollToTop.tsx:9`):** Material Design FAB convention — universally recognized as "scroll/navigate quickly". Explicit JSDoc-noted exception to Ken's 5px/10px radius system.
- **Why bottom-right position (`ScrollToTop.tsx:10, 52`):** Western reading flow ends bottom-right; matches user's eye location at end-of-scroll. Also avoids LTR thumb-gesture conflicts on mobile (left edge = back, bottom edge = system gestures).
- **Why `bottom-20` on mobile, `bottom-8` on tablet+ (`ScrollToTop.tsx:52`):** Mobile reserves 80px for bottom-nav / StickyCTA / OS gestures. Tablet+ has room closer to edge.
- **Why `whileHover scale: 1.1` (`ScrollToTop.tsx:49`):** Bigger hover signal than Button's static hover — FAB needs to feel "alive/tappable" because it's a single round dot. Bigger scale = more "I'm here, click me".
- **Why `whileTap scale: 0.95` (`ScrollToTop.tsx:50`):** Gentle compress = tactile feedback without going to Material's full ripple (round container, ripple would feel different).
- **Why shadow grows on hover (`ScrollToTop.tsx:53`):** Increases perceived elevation/depth, matches the scale-up — combined effect = "lifting toward user".
- **40px on mobile is below the 44px WCAG floor (smell to flag):** Tightened-up dimensions trade a11y compliance for visual lightness. Should be `w-11 h-11` (44px) at minimum.
