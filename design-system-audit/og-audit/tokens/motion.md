# OG Token Audit · Motion (Duration + Easing + Patterns)

**Source-of-truth:** `src/design-system/tokens.ts:201–216` (canonical TS easing + duration · 4 + 4 tokens) · `src/styles/theme.css:635` (badge transition duration) · `src/styles/theme.css:677–731` (badge shimmer + interactive lift) · `src/styles/theme.css:822–841` (reduced-motion handling) · `src/app/components/MotionContent.tsx` (DS motion reference doc · canonical easing definitions)
**Audit date:** 2026-05-14 · WWWWH framework

---

## WWWWH

**WHAT** — Motion is a **4-duration + 4-easing token system** (`tokens.ts:201–216`), supplemented by named patterns (shimmer · ripple · entrance · hover lift · stagger · scroll-driven) and a **mandatory reduced-motion suppression rule** at the DS layer. Motion is intentionally **less tokenized** than other domains — most consumers reach for the named patterns + `useReducedMotion` hook rather than raw duration vars.

**WHY a separate domain** — Motion encodes **temporal feedback** (state changes feel responsive · spatial relationships are taught via transitions). Without tokenized timing curves, every animation would re-invent its own bezier and the system would feel "twitchy" (mixed accelerations) or "soupy" (over-damped consistency). Motion is the **single domain where accessibility is a HARD law** — `prefers-reduced-motion` non-compliance breaks WCAG 2.3.3 + vestibular-disorder users.

**WHEN to use** ✅
- Use `duration.instant` (150ms) for state-only changes (input border color · checkbox check)
- Use `duration.fast` (300ms) for hover states · card lift · button press
- Use `duration.normal` (600ms) for entrance animations · modal slide-in
- Use `duration.slow` (900ms) for hero/scroll-driven sequences (rare · max one per page)
- Use `easing.smooth` cubic-bezier(0.22, 1, 0.36, 1) for default UI transitions
- Use `easing.out` cubic-bezier(0, 0, 0.2, 1) for entrance / hover (responsive feel)
- Use `easing.sharp` cubic-bezier(0.4, 0, 0.2, 1) for larger movements (modals · drawers)
- Use `easing.bounce` cubic-bezier(0.34, 1.56, 0.64, 1) sparingly for delight moments (success states · max 1–2/page)
- ALWAYS check `useReducedMotion()` for non-trivial animations · disable when true

**WHEN NOT to use** ❌
- NEVER animate page load with intro animations (`MotionContent.tsx:197` — *"Page load (no intro animations)"*)
- NEVER animate static content at rest (decorative motion forbidden)
- NEVER use bounce easing on data-viz / functional flows (delight ≠ data)
- NEVER omit `prefers-reduced-motion` handling (WCAG hard requirement · `theme.css:822`)
- NEVER use durations >900ms for UI (feels broken · users assume nothing happened)
- NEVER animate background loops continuously (`MotionContent.tsx:200`)
- NEVER stack 3+ animations on same element simultaneously (`MotionContent.tsx:201`)
- NEVER animate critical user flows · keep instant (`MotionContent.tsx:202`)

**WHERE deployed** — Card hover (`Card.tsx:92` · 400ms cubic-bezier(0.16, 1, 0.3, 1)) · Badge shimmer (`theme.css:730` · 700ms ease-in-out) · ScrollProgress (`ScrollProgress.tsx:41` · 150ms ease-out) · Navbar slide (`Navbar.tsx:38` · 300ms ease-in-out) · ContactModal entrance (`ContactModal.tsx:74` · animate-in zoom-in-95 duration-200) · Framer Motion components project-wide.

**HOW to consume**
```tsx
// Using TS token import (PREFERRED for type-safety)
import { duration, easing } from '@/design-system/tokens';
<motion.div
  transition={{ duration: parseFloat(duration.fast) / 1000, ease: easing.smooth }}
/>

// Inline CSS
<div style={{ transition: `all ${duration.fast} ${easing.smooth}` }} />

// Tailwind (consumes raw values · prefer arbitrary)
<div className="transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]">

// Reduced-motion guard (MANDATORY for non-trivial)
const reduced = useReducedMotion();
<motion.div animate={reduced ? {} : { y: 0, opacity: 1 }} />

// NEVER:
<div style={{ transition: 'all 500ms ease' }}>        // ❌ off-scale duration
<div className="duration-[450ms]">                    // ❌ arbitrary off-scale
// Animation without reduced-motion check ❌ a11y violation
```

---

## Duration tokens (`tokens.ts:211–216`)

```ts
duration = {
  instant: '150ms',
  fast:    '300ms',
  normal:  '600ms',
  slow:    '900ms',
}
```

| Token | Value | Role | WHY this exact value |
|---|---|---|---|
| `instant` | 150ms | State-only changes · input border · checkbox check · scroll progress bar | Just above human-perceptible threshold (~100ms feels "instant") · low enough to feel like a direct response |
| `fast` | 300ms | Hover · button press · card transition · dropdown open | The **editorial sweet spot** for "noticed but not lingering" UI feedback |
| `normal` | 600ms | Modal entrance · panel slide · scroll-into-view fade | Long enough to communicate spatial shift · short enough not to feel "show-offy" |
| `slow` | 900ms | Hero unfolds · scroll-driven keyframes · staggered card sequences | Reserved for "intentional drama" · max one per page |

### WHY 150 · 300 · 600 · 900 (not 200/400/800/1200)

Doubling progression keeps cognitive math easy. 150ms → 300ms → 600ms → 900ms (last one ~1.5× to avoid full second). The 1-second threshold is a known UX wall (users assume "the page is broken") — staying below 900ms keeps motion feeling like UI not loading.

### Reality check vs in-codebase usage

OG components frequently use durations OUTSIDE the scale:
- `Card.tsx:92` → 400ms (between fast 300 and normal 600 — flagged · possible candidate for a `medium: '400ms'` token)
- `theme.css:730` badge shimmer → 700ms (close to normal 600 — flagged for either tokenization or alignment)
- `theme.css:635` `--badge-transition-duration: 300ms` (matches `fast` · should reference token)
- `Navbar.tsx:38` → 300ms (matches `fast` · should reference token)
- `ContactModal.tsx:74` → 200ms (close to instant 150 — flagged)

**Modification risk** — Removing `duration.slow` won't break code (rarely used) but losing it means hero animations re-invent. Reconciliation candidate: codify a `medium: '400ms'` for the in-the-wild values.

---

## Easing tokens (`tokens.ts:201–207`)

```ts
easing = {
  smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
  bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  sharp:  'cubic-bezier(0.4, 0, 0.2, 1)',
  out:    'cubic-bezier(0, 0, 0.2, 1)',
}
```

### Per-curve breakdown

| Token | Bezier | Feel | WHEN to use |
|---|---|---|---|
| `smooth` | `cubic-bezier(0.22, 1, 0.36, 1)` | Ease-out-quart · starts fast · soft deceleration | Default UI transitions · "editorial premium" feel |
| `bounce` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Overshoot (y >1.0 at peak) | Delight moments only · success ticks · sparingly |
| `sharp` | `cubic-bezier(0.4, 0, 0.2, 1)` | Material-style ease-in-out · symmetric | Larger movements · modal · drawer · "transport" feel |
| `out` | `cubic-bezier(0, 0, 0.2, 1)` | Material standard ease-out | Entrance · hover · "responsive" feel — most common |

### WHY these specific curves

Per `MotionContent.tsx:213–256` reference doc:
> *"ease-out (Default) — cubic-bezier(0, 0, 0.2, 1) — Starts fast, slows down. Use for most UI transitions - feels responsive and natural."*
>
> *"ease-in-out — cubic-bezier(0.4, 0, 0.2, 1) — Smooth acceleration and deceleration. Use for larger movements or element transitions."*

**`smooth` (0.22, 1, 0.36, 1)** is the editorial signature — softer landing than Material's ease-out. Used for the premium "settling" feel on card hovers. Mathematically: the curve peaks early (y=1 at x=0.22) then very gently approaches the endpoint — this is what makes the motion feel "intentional" not "snappy."

**`bounce` (0.34, 1.56, 0.64, 1)** — Note the y=1.56 at peak (overshoots target by 56%). Brand decision: bouncy easing for success / delight ONLY. Overuse breaks editorial gravitas.

**`sharp` (0.4, 0, 0.2, 1)** — Standard Material ease-in-out. Symmetric · transports things from A to B without bias.

**`out` (0, 0, 0.2, 1)** — Material ease-out. The "responsive" default — fastest at start (user just clicked) decelerating into final position.

### In-codebase canonical curves NOT in token set

- `cubic-bezier(0.16, 1, 0.3, 1)` — Card.tsx hover (custom · stronger deceleration than smooth · close cousin)
- `linear` — for opacity-only / spinner rotations (`MotionContent.tsx:246`)

**Decision-phase reconciliation** — `Card.tsx`'s `(0.16, 1, 0.3, 1)` candidate for either replacing `smooth` or codifying as `easeOutQuart`. Two near-identical "premium" curves coexist.

---

## Named patterns (motion vocabulary)

### Entrance pattern

Fade-up + opacity 0→1 + y translate 16px → 0 on enter viewport.
```tsx
// Canonical entrance via Framer Motion + useInView
<motion.div
  initial={{ opacity: 0, y: 16 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}  // duration.normal + easing.out
/>
```
**Duration:** `normal` (600ms) · **Easing:** `out` · **Disabled when reduced-motion**.

### Stagger pattern

Children of a list each delay +60–80ms.
```tsx
transition={{ duration: 0.6, ease: [0, 0, 0.2, 1], delay: index * 0.08 }}
```
**WHY 80ms stagger** — Each card "follows" the previous before the prior settles. 100ms+ feels like a slideshow; <60ms reads as simultaneous.

### Hover pattern (Card)

`box-shadow` + `transform: translateY(-2px)` + `border-color` over 400ms cubic-bezier(0.16, 1, 0.3, 1).
- Lift = `translateY(-2px)` (small enough to feel responsive · big enough to perceive)
- Shadow steps one tier (`md` → `lg`)
- Border opacity steps `0.06 → 0.10` (Weber-Law perceptible · `COLORS.md:248`)

### Shimmer pattern (Badge / Button)

CSS animation · 700ms · ease-in-out · single sweep · resets instantly on unhover (no reverse animation · `theme.css:683`).
```css
.badge:hover .badge-shimmer {
  transform: translateX(100%);
  transition: transform 700ms ease-in-out;
}
```
**WHY 700ms** — Per `BadgeShowcase.tsx:1313` doc: *"Travel: -200% to 100% (300% total distance). Width: 200% (2× badge width). Duration: 700ms. Easing: ease-out."* — Mathematically tuned so the shimmer crosses a 2× viewport in 700ms · feels "premium-watch-face" not "blinking-loader."

### Scroll-driven pattern

Per `CLAUDE.md` workspace rule (Framer Motion `useScroll` + `useTransform`):
```tsx
const { scrollYProgress } = useScroll({ target, offset: ['start end', 'end start'] });
const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
<motion.div style={{ y }} />
```
**Native CSS** `html { scroll-behavior: smooth }` at DS layer for page anchors.

### Ripple pattern (Button :active)

Material-default 600ms · contained to button bounds. Per `COMPONENT_GUIDELINES_4WH.md` (Button doc):
> *"Active (mousedown): Material ripple · subtle scale 0.98"*

---

## Reduced-motion (HARD requirement · `theme.css:822–841`)

```css
@media (prefers-reduced-motion: reduce) {
  .badge {
    transition: none !important;
  }
  .badge:hover .badge-shimmer {
    transition: none !important;
    transform: translateX(-100%);
  }
  .badge-interactive:hover {
    transform: none !important;
  }
}
```

**Rule** — Every interactive component MUST suppress non-trivial animation when user has set `prefers-reduced-motion: reduce`. The DS handles this at base level for badges; consumers must replicate for custom motion.

**Framer Motion hook** — `useReducedMotion()` from framer-motion returns boolean. Use to gate animations:
```tsx
const reduced = useReducedMotion();
<motion.div animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }} />
```

Per `MotionContent.tsx:265–270`:
> *"Always respect the prefers-reduced-motion media query. Users with vestibular disorders or motion sensitivity must be able to disable animations."*

**WCAG mapping** — 2.3.3 Animation from Interactions (Level AAA). Required for accessibility compliance.

**Anti-pattern** — Setting `transition-duration: 0.01ms !important` global override (`MotionContent.tsx:282`) — kills ALL animation everywhere · acceptable as a blunt rule but doesn't preserve "essential" motion (loading spinners). Per-component opt-out is better.

---

## Core principles (`MotionContent.tsx:118–168`)

Three governing principles:

1. **Purposeful** — *"Every animation communicates something — state change, focus, feedback, or hierarchy. No decorative motion."*
2. **Subtle** — *"Animations should enhance, not dominate. Users notice the effect, not the animation itself."*
3. **Responsive** — *"Fast enough to feel instant, slow enough to be perceived. Respect prefers-reduced-motion."*

### Do animate ✅ (`MotionContent.tsx:181–188`)
- State changes (open/close · expand/collapse)
- User feedback (hover · click · focus)
- Loading / progress indicators
- Attention direction (new content · errors)
- Spatial relationships (modals · dropdowns)
- Micro-interactions on interactive elements

### Don't animate ❌ (`MotionContent.tsx:196–203`)
- Page load (no intro animations)
- Static content (text · images at rest)
- Background decorations
- Continuous looping (unless loading)
- Multiple elements simultaneously
- Critical user flows (keep instant)

---

## Modification risk summary

| Change | Breaks |
|---|---|
| Remove `easing.smooth` | Default UI premium feel · every Card transition |
| Remove `easing.out` | Every entrance · most hovers |
| Remove `duration.fast` | ~80% of UI transitions |
| Add new duration outside scale | Decision fatigue · drift |
| Disable reduced-motion media query | WCAG 2.3.3 violation · vestibular users |
| Change shimmer 700ms → 500ms | Brand signature interaction · feels "snappy" not "premium" |
| Card transition 400ms → 200ms | Lift not perceived · just snaps |

---

## Anti-patterns (master list)

| Anti-pattern | Where banned | Use instead |
|---|---|---|
| Page-load intro animation | `MotionContent.tsx:197` | Content appears instantly |
| Decorative continuous loop | `MotionContent.tsx:200` | Reserve for loading only |
| Multiple animations simultaneously | `MotionContent.tsx:201` | Stagger by 60–80ms |
| Bounce easing on data flow | implicit | Sharp / smooth for data |
| `duration: 500ms` arbitrary | implicit | Map to fast (300) or normal (600) |
| Missing reduced-motion check | `theme.css:822` | `useReducedMotion()` mandatory |
| `linear` easing on transform | implicit | `linear` only for opacity / rotation (spinner) |
| Animating critical flow (form submit lag) | `MotionContent.tsx:202` | Keep instant |
| Hardcoded `cubic-bezier(...)` inline | by convention | Reference `easing.*` token |

---

## REUSABILITY SCORE
**4/5 ⭐⭐⭐⭐** — Every interactive component uses motion · but heavy reuse skewed to `duration.fast` + `easing.out` + `easing.smooth` (~85% of consumption). `duration.slow` + `easing.bounce` are deliberately rare-use. Loses one star for the in-the-wild duration/easing drift (400ms · 700ms · 200ms outside the token set) that needs reconciliation.

## LINKED concepts
- **shadow.md** — Card uses 400ms cubic-bezier(0.16, 1, 0.3, 1) for `box-shadow` transition (motion + elevation pair)
- **colors.md** — hover color transitions use `duration.instant` (150ms) for input border state (`theme.css:516`)
- **typography.md** — text never animates on rest (motion only on interaction)
- **Card.tsx** — primary consumer of hover motion (400ms / cubic-bezier(0.16, 1, 0.3, 1))
- **Badge.tsx** — shimmer pattern + interactive lift transforms
- **Button.tsx** — shimmer + ripple + active scale (0.98)
- **`useReducedMotion()`** — Framer Motion hook · MANDATORY for non-trivial animation
- **`prefers-reduced-motion`** — global CSS suppression at `theme.css:822` (badge baseline)
- **Framer Motion** — primary motion library project-wide (per `CLAUDE.md` · GSAP + Lenis removed 2026-05-08)
- **`useScroll` + `useTransform`** — scroll-driven motion replacement for GSAP scroll triggers
- **Native CSS `scroll-behavior: smooth`** — replaces Lenis at DS layer
- **In-the-wild drift** — 400ms (Card) · 700ms (shimmer) · 200ms (Modal) outside the 4-duration token set · flagged for decision phase
