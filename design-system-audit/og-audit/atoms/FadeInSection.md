# FadeInSection · Atom · OG Audit

**Source:** `Design_system_vs_26 (og and final)/src/app/components/FadeInSection.tsx` (68 lines)

---

## 1. WHAT

IntersectionObserver-based fade-in wrapper. Children render at `opacity:0 translateY(16px)` initially; once 10% of the wrapper enters the viewport, transitions to `opacity:1 translateY(0)` over 600ms cubic-bezier. Respects `prefers-reduced-motion` — sets visible immediately if user opts out.

## 2. WHY

OG JSDoc verbatim (`FadeInSection.tsx:1-6`):

> "FadeInSection — Utility wrapper"
> "Uses IntersectionObserver to fade-in children when they enter the viewport."
> "Provides a smooth, staggered reveal effect for sections and cards."

- Page-scroll reveal pattern — content "arrives" instead of being already-there. Subtle premium feel.
- Lightweight: IntersectionObserver native (no Framer / GSAP dependency for this atom)
- `delay` prop enables staggered reveals (card-grid: 0ms / 100ms / 200ms cascade)
- Respects reduced-motion at the DS layer — consumers can't forget (`FadeInSection.tsx:31-35`)
- Once visible, unobserves → no perf cost after reveal (`FadeInSection.tsx:41`)
- `willChange` set during transition only, removed after — perf-conscious (`FadeInSection.tsx:62`)

## 3. WHEN to use ✅

- Wrapping each card in a grid for staggered reveal: `<FadeInSection delay={i * 80}>`
- Section-level reveal for hero/feature sections below the fold
- Long-scroll case study content blocks
- Methodology step cards reveal-on-scroll
- Statistic cards in a dashboard

## 4. WHEN NOT to use ❌

- Above-the-fold content → users see the empty `opacity:0` state on initial load → use raw render
- Form fields → users typing don't want their input animating
- Tooltip / popover → use the tooltip's own entrance animation
- High-frequency scroll reveals (every paragraph) → reveal fatigue, annoying
- Content needed for SEO immediately readable — bots may not trigger IntersectionObserver

## 5. WHERE used

- **Honest gap:** No direct grep'd usage in OG. Likely under-used or wrapped at consumer-template level in `worked-examples/`.

## 6. HOW to implement

```tsx
// Simple section reveal
<FadeInSection>
  <SectionHeading title="Why us" />
  <p>...</p>
</FadeInSection>

// Staggered card reveal
<div className="grid grid-cols-3 gap-6">
  {cards.map((card, i) => (
    <FadeInSection key={card.id} delay={i * 80}>
      <Card>{card.content}</Card>
    </FadeInSection>
  ))}
</div>

// No translate, just opacity
<FadeInSection direction="none">
  <p>Subtle fade only</p>
</FadeInSection>

// Higher threshold (delay reveal until 30% visible)
<FadeInSection threshold={0.3}>
  ...
</FadeInSection>
```

## 7. Properties

| Prop | Type | Default | Why exists |
|---|---|---|---|
| `children` | `ReactNode` | required | Content to reveal |
| `delay` | `number` | `0` (ms) | Staggered reveal — passes to both opacity AND transform transition-delay (`FadeInSection.tsx:60`) |
| `direction` | `'up' \| 'none'` | `'up'` | `'up'` = `translateY(16px)` → 0; `'none'` = no translate, opacity only (`FadeInSection.tsx:11, 51`) |
| `className` | `string` | `''` | Escape hatch |
| `threshold` | `number` | `0.1` | IntersectionObserver threshold — 0.1 = trigger when 10% visible (`FadeInSection.tsx:14, 44`) |

## 8. States

- **Initial (hidden):** `opacity: 0`, `transform: translateY(16px)` (if `direction='up'`) (`FadeInSection.tsx:58-59`)
- **Visible (after intersection):** `opacity: 1`, `transform: translateY(0)` (`FadeInSection.tsx:58-59`)
- **Reduced motion:** `setIsVisible(true)` on mount, observer never created (`FadeInSection.tsx:31-35`)

## 9. Variants

`direction` enum — two values:
1. `up` — translates up 16px while fading in (default, more pronounced)
2. `none` — opacity only (subtle, no layout shift)

## 10. Sizes

No `size` prop. Wrapping `<div>` takes the size of its children. Translate is fixed 16px.

## 11. Tokens used

- None — uses hard-coded `16px` translate distance, `0.6s` duration, and `cubic-bezier(0.16, 1, 0.3, 1)` easing. **Should be tokenized** (`--motion-duration-reveal`, `--motion-easing-soft`, etc.). Smell.

## 12. A11y rules

- **`prefers-reduced-motion: reduce` RESPECTED** — sets visible immediately, skips observer (`FadeInSection.tsx:31-35`). This is the ONLY OG atom that proactively handles reduced-motion. Good pattern.
- Wrapping `<div>` is non-semantic — children carry semantics
- No ARIA props
- Content is always in DOM (just invisible) — AT can read it before visible

## 13. Motion rules

- Transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms` (`FadeInSection.tsx:60`)
- 600ms duration — slow enough to be perceived, fast enough not to feel slow
- `cubic-bezier(0.16, 1, 0.3, 1)` — the Ken DS "ease-out-soft" curve (same as Card hover)
- IntersectionObserver `rootMargin: '0px 0px -40px 0px'` — triggers 40px BEFORE entering viewport bottom, so content reveals just-in-time (`FadeInSection.tsx:44`)
- Once intersected, observer unsubscribes — content stays visible (`FadeInSection.tsx:41`)
- **Reduced-motion: respected** ✓

## 14. Anti-patterns ❌

- Never use above the fold — initial render shows opacity:0 → FOIT-like effect for the user
- Never nest FadeInSection inside FadeInSection — double-delay confuses staggering
- Never use for inputs/forms — user input shouldn't fade
- Never use without `delay` in a card grid — all cards trigger at once, no stagger benefit
- Never set `threshold` higher than 0.3 — content may never reveal on tall items
- Never expect SEO bots to trigger reveal — content IS in DOM (good for SEO) but visual readers see motion (intended)

## 15. REUSABILITY SCORE

**3/5 ⭐⭐⭐** — Good DS pattern, lightweight, well-behaved. Lower score because grep shows no active consumers — possibly underused or replaced by Framer Motion `<motion.div whileInView>` patterns in newer code.

## 16. Linked components

- **Parent:** any section / card grid wanting scroll-reveal
- **Sibling atoms:** none — unique role within atoms; competes with Framer Motion's `whileInView` at the consumer level
- **Hooks involved:** internal `useRef` + `useState` + `useEffect` (no shared hook)

## 17. Reasons + Decisions log

- **Why IntersectionObserver native not Framer Motion (`FadeInSection.tsx:37-48`):** Lower dependency cost for a basic fade-in. Framer Motion's `whileInView` adds the whole library if not already imported. IntersectionObserver is built-in.
- **Why `translateY(16px)` upward (`FadeInSection.tsx:51`):** "Up" direction = content "arriving from below" — subtle vertical motion implies "loading in".
- **Why `threshold: 0.1` + `rootMargin: -40px` (`FadeInSection.tsx:44`):** Triggers when 10% visible, AND 40px before entering — content reveals just-in-time, not after user is fully scrolled past.
- **Why 600ms duration:** Slow enough to perceive as deliberate, fast enough not to feel sluggish. Same as Card hover for system coherence.
- **Why `cubic-bezier(0.16, 1, 0.3, 1)`:** "Ease-out-soft" — fast start, very slow settle. Reads as "content easing into place".
- **Why `willChange` removed after visible (`FadeInSection.tsx:62`):** Performance optimization. `willChange` allocates GPU layer; removing it after transition releases the layer. Subtle perf win.
- **Why `observer.unobserve(el)` on first intersection (`FadeInSection.tsx:41`):** Don't waste CPU observing element after it's revealed. One-shot reveal.
- **Why `direction='none'` option (`FadeInSection.tsx:11`):** Some content (e.g., inline text) shouldn't translate — it'd push surrounding flow. Opacity-only mode.
- **Why `delay` applies to BOTH opacity AND transform (`FadeInSection.tsx:60`):** Synchronized — both properties start at same time. Splitting them creates uncoordinated reveal.
- **Reduced-motion handling pattern (`FadeInSection.tsx:31-35`):** Best-practice example for the rest of the DS. Other atoms should copy this pattern.
- **Hard-coded values not tokenized (smell):** `16px`, `0.6s`, easing should all be `--motion-*` tokens. Token gap.
