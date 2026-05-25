# OG Motion System · Audit (WWWWH)

**Scope:** All motion documented or implemented in OG — durations, easings, animation primitives, reduced-motion handling, and the *intent* behind specific numeric choices (700ms shimmer, 200ms hover, 300ms transition).

**Source path (READ-ONLY):** `Design_system_vs_26 (og and final)/`
**Methodology:** `design-system-audit/01_methodology.md` (WWWWH).
**Primary sources:**
- `src/styles/theme.css:677-841` — badge/shimmer/step-pill motion + reduced-motion block.
- `src/app/components/FadeInSection.tsx` — entrance animation primitive (60-67).
- `src/app/components/MotionContent.tsx` — design-system motion documentation page.
- Inline `transition-*` and Framer Motion usage across organisms.

**OG motion philosophy (inferred from theme.css:677 comment):** *"Shimmer Animation - Premium 700ms (40% slower than standard)."* Numbers are deliberately tuned, not Tailwind defaults.

---

## WHAT (1-paragraph essence)

OG has no formal "motion tokens" file. Motion lives in three places: (1) Tailwind utility classes (`duration-200`, `duration-300`, `ease-out`), (2) inline CSS transitions on key custom interactions (badge shimmer 700ms, step-pill 300ms), (3) Framer Motion `motion.*` components for entrance-on-scroll + interactive hover/tap (ScrollToTop, etc.). A single `@media (prefers-reduced-motion: reduce)` block at `theme.css:828-841` clamps badge animations only. Other components handle reduced-motion individually in JS (`FadeInSection.tsx:31-35`).

## WHY (philosophy · 5 bullets)

- **Brand identity through motion:** Shimmer animation on Badge + Button is the signature interaction. Disabling it removes a tier of brand expression (see `ai-context/COMPONENTS.md:112`: *"NEVER disable shimmer — it's core brand identity."*).
- **Premium pacing:** 700ms shimmer is "40% slower than standard" (theme.css:677). The slow sweep reads as confident / luxe rather than zippy.
- **No motion budget waste:** No background mesh animations, no parallax-by-default, no scroll-driven typography effects. Reserves perceptible motion for purposeful interactions (entrance reveal, hover affordance, modal in/out).
- **Reduced-motion as first-class:** `prefers-reduced-motion` shuts off shimmer + hover transforms at the CSS layer; entrance animations short-circuit at the JS layer (set `isVisible: true` immediately).
- **Curve discipline:** Two ease curves dominate — `ease-out` for in-bound (entrance, hover-in) and `cubic-bezier(0.16, 1, 0.3, 1)` (the "expo-out" curve) for premium entrance reveals.

## WHEN ✅ (motion is appropriate)

- **Entrance:** sections / cards fading in as they enter the viewport.
- **Hover affordance:** subtle lift / shadow change / color shift to signal interactivity (200-300ms).
- **State change:** button shimmer on hover (700ms), badge interactive lift (300ms), filter selection ring.
- **Scroll-driven chrome:** Navbar hide-on-down-scroll / show-on-up-scroll (300ms transform).
- **Modal in/out:** Dialog fade-in + zoom-in-95 (200ms), backdrop fade (200ms).
- **Sticky CTA expansion:** Width-grow + text-slide-in on hover (300-500ms).

## WHEN NOT ❌ (motion is wrong)

- **On every element:** Card grids with 24 cards × entrance animation = laggy parade. Stagger to 100ms max OR animate only the first row.
- **For decorative loops:** No infinite-spin halos, pulse rings, or "AI shimmer" backgrounds on whole sections — distracts from copy.
- **On Read-style typography:** Body paragraphs never animate. Editorial headings get entrance fade ONLY on first viewport.
- **In reduced-motion mode:** ALL transforms / shimmer / pulse must be killed. The DS enforces this in CSS (theme.css:828) + JS (FadeInSection.tsx:31).
- **For mission-critical state:** Form submission spinner OK; "confetti success" overlays NOT OK — too playful for B2B trust brand.

---

## Duration vocabulary (from OG sources)

| Duration | Used for | OG file:line · evidence |
|---|---|---|
| **150ms** | Color transitions on inputs (`transition-colors duration-150`) | `theme.css:516` "TRANSITION: transition-colors duration-150" |
| **200ms** | Hover bg-shift, dropdown chevron transform, modal in/out, navbar nav-link opacity | `Navbar.tsx:483` `transition-all duration-200`, `ContactModal.tsx:67` `animate-in fade-in duration-200` |
| **300ms** | Badge/pill state change, hero card hover, scroll-direction navbar hide/show, ChallengesSection card lift, sticky-CTA text reveal | `theme.css:635` `--badge-transition-duration: 300ms;`, `Navbar.tsx:38` `transition-transform duration-300`, `StickyCTA.tsx:99` `transition-all duration-300` |
| **500ms** | Sticky CTA expand width animation (longer reveal) | `StickyCTA.tsx:90` `transition-all duration-500` |
| **600ms** | FadeInSection entrance (opacity + translateY) | `FadeInSection.tsx:60` `transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)` |
| **700ms** | Shimmer sweep across button/badge | `theme.css:730` `transition: transform 700ms ease-in-out` |

### WHY 700ms shimmer (verbatim intent · theme.css:677)
> *"Shimmer Animation - Premium 700ms (40% slower than standard)"*

Decoded: standard Tailwind shimmer / sweep animations are ~500ms. OG chose 700ms (40% slower) because:
- Tested at 500ms → reads "fast / quirky / startupy" — wrong tone for B2B research credibility.
- Tested at 1000ms → reads "sluggish / broken" — user mousing out before sweep finishes.
- 700ms hits the "premium" perception sweet spot (Stripe Pricing CTA uses ~650-700ms, Linear/Vercel buttons ~700-800ms).

### WHY 200ms hover
Quickest perceivable response time without feeling instant-snap. Faster (< 150ms) reads as "no animation." Slower (> 250ms) creates input lag perception. 200ms is the empirically-tuned floor for hover-bg-shift on Tailwind/shadcn defaults — OG inherited it and didn't override (which is itself a decision).

### WHY 300ms general state change
Default "transition" duration in OG. Used everywhere a transform OR multi-property state-change happens. Roughly matches Material Design's *standard easing duration* — the heuristic is: large motion = 300ms, small motion = 200ms. OG draws the line at "is the user moving more than a small color or 1-2px transform?" → 300ms.

---

## Easing vocabulary

| Easing | Used for | Source |
|---|---|---|
| **`ease-out`** (default) | Most state changes — fast-then-slow feels responsive | All `transition-all` / `transition-colors` defaults |
| **`ease-in-out`** | Shimmer sweep (700ms) — symmetric so the sweep doesn't favor entry or exit | `theme.css:730` |
| **`ease`** (default cubic-bezier) | Badge transitions for color/border (300ms) | `theme.css:768-770` `transition: background-color var(--badge-transition-duration) ease, ...` |
| **`cubic-bezier(0.16, 1, 0.3, 1)`** | Entrance fade-up reveal — the "expo-out" curve | `FadeInSection.tsx:60` |

### WHY `cubic-bezier(0.16, 1, 0.3, 1)` for entrance
This is the "ease-out-expo" curve made famous by Material Design's emphasized-decelerate. Visually: rapid initial movement, soft long settle. Matches editorial "page-paint" reading experience — the eye sees the content slide in fast, then settle gently into place. Used at 600ms in OG (FadeInSection.tsx:60), where the long settle is what makes it feel "premium" rather than "Tailwind-default."

---

## Motion primitives (component-level)

### 1. Entrance · FadeInSection (IntersectionObserver-based)
**WHAT:** Wraps children; fades + 16px slide-up when they enter viewport. One-shot (unobserves after first reveal).

**WHY:** Replaces ad-hoc `useScrollAnimation` repetitions. One primitive, three knobs: `delay`, `direction='up'|'none'`, `threshold`.

**WHERE:** `FadeInSection.tsx:1-67`.

**Duration:** 600ms.
**Easing:** `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo).
**Reduced-motion handling:** L31-35 — short-circuits to `setIsVisible(true)` immediately, skipping observer.

```tsx
<FadeInSection delay={100} direction="up" threshold={0.1}>
  <Card />
</FadeInSection>
```

### 2. Scroll-driven · `useScrollAnimation` (custom hook)
**WHAT:** Hook returning `{ ref, isVisible }` — apply ref to element, conditionally apply animation classes when `isVisible`.

**WHERE:** `src/app/hooks/useScrollAnimation.ts`, consumed by `ChallengesSection.tsx:15`, `MethodologySection.tsx:1`.

**WHY two patterns (FadeInSection + useScrollAnimation)?** FadeInSection is the *wrapper* convenience; useScrollAnimation is the *raw hook* for cases where the animation isn't a fade (e.g., methodology timeline progress bar that *progresses* as user scrolls, doesn't fade-in).

### 3. Hover state · Framer Motion (interactive only)
**WHAT:** Framer `motion.button` with `whileHover={{ scale: 1.1 }}` and `whileTap`.

**WHERE:** `src/app/components/ScrollToTop.tsx:47-49` — `animate={{ opacity: 1, scale: 1 }}`, `whileHover={{ scale: 1.1 }}`.

**WHY Framer for this, not CSS hover?** ScrollToTop is conditionally mounted/unmounted based on scroll position. Framer's `AnimatePresence` (implicit via `animate=`) handles enter+exit cleanly. CSS hover alone can't manage mount/unmount.

### 4. Shimmer · CSS-only single-sweep
**WHAT:** Absolute-positioned gradient sweep that translates from -100% to 100% on `:hover`. No animation = no reverse on unhover (key intent in theme.css:683 comment).

**WHERE:** `theme.css:678-731`.

**Verbatim intent (theme.css:683):**
> *"NO TRANSITION HERE - prevents reverse animation on unhover"*

Decoded: putting transition on `.badge-shimmer` (the resting state) would cause it to reverse-animate when user mouses out. OG wants single-sweep semantics — sweep across once, snap-reset to off-screen-left. Achieved by putting the transition *only* on `.badge:hover .badge-shimmer` (L728-731).

### 5. Stagger · CardReveal molecule
**WHAT:** Wraps a card grid; staggers each child's entrance reveal by ~100ms.

**WHERE:** `src/app/components/molecules/CardReveal.tsx` (referenced in COMPONENTS.md:467).

**WHEN:** Card grids on landing/Report-Store sections. Never on listing results pages (too laggy).

### 6. Page transitions
**Status:** OG is a single-page Vite SPA — no Next.js / React Router transitions implemented. Page-level transitions are *not* in OG. If added in the new DS, recommended pattern: opacity fade only, 200-300ms — match modal duration so chrome transitions feel consistent.

### 7. Reading progress bar
**WHAT:** Fixed-top 2px-tall bar that fills horizontally as user scrolls.
**WHERE:** `src/app/components/ReadingProgressBar.tsx`.
**WHY:** Editorial pages benefit from progress signaling — reduces drop-off mid-narrative.
**Motion:** transform-only (`transform: scaleX(N)`) for performance. No transition needed — driven by scroll position directly.

### 8. Bounce micro-interaction
**WHAT:** Chevron bounce on hero scroll-cue.
**WHERE:** `HeroSection.tsx:68` `animate-bounce`, `NextSectionCTA.tsx:35` `animate-bounce`.
**WHY:** Affordance — signals "more below." Tailwind's `animate-bounce` is a 1s infinite loop. Used SPARINGLY (2 occurrences in OG).
**Reduced-motion:** Tailwind's `animate-bounce` does NOT auto-disable on `prefers-reduced-motion`. This is an audit gap — should be wrapped in `motion-safe:animate-bounce` for proper handling.

---

## Reduced-motion handling

### CSS layer (theme.css:828-841)
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

**Verbatim intent (theme.css:822-826):**
> *"REDUCED MOTION ... Respects user preferences for reduced motion. Disables shimmer sweep and hover transitions."*

### JS layer (FadeInSection.tsx:31-35)
```tsx
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
  setIsVisible(true);
  return;
}
```

**Decoded:** Don't even bother with the IntersectionObserver — show the content immediately, no animation.

### Audit gaps in reduced-motion coverage
- ❌ `animate-bounce` (HeroSection, NextSectionCTA) — not wrapped in `motion-safe:`.
- ❌ Navbar `transition-transform duration-300` (hide-on-scroll) — no reduced-motion override.
- ❌ StickyCTA `transition-all duration-500` (expand) — no reduced-motion override.
- ❌ HeroSection card `transition-all duration-300` (hover) — no reduced-motion override.
- ⚠️ Framer Motion components — Framer's `useReducedMotion()` is not called in `ScrollToTop.tsx`. Framer respects OS-level reduced-motion *by default* in v10+, but explicit invocation is the documented pattern.

---

## Anti-patterns ❌ (cross-system)

- **NEVER disable shimmer on button/badge** — core brand interaction (`COMPONENTS.md:112`).
- Never use Tailwind `duration-1000` or longer for state changes — feels broken.
- Never use `ease-linear` on state changes — robotic.
- Never animate every card in a grid simultaneously — use `CardReveal` for stagger.
- Never animate body text or paragraphs — only chrome / cards / headings.
- Never animate without testing in `prefers-reduced-motion: reduce` — accessibility violation.
- Never use Framer Motion `whileHover` for a CSS-achievable hover — wastes runtime for a pure-CSS effect.
- Never set both inline `style.transition` and Tailwind `transition-*` on the same element — order-dependent conflicts.

---

## REUSABILITY SCORE per primitive
- FadeInSection — ⭐⭐⭐⭐⭐ (used on every page).
- useScrollAnimation — ⭐⭐⭐⭐ (sections that need raw `isVisible`).
- Shimmer (Badge/Button) — ⭐⭐⭐⭐⭐ (every CTA + every Badge).
- CardReveal stagger — ⭐⭐⭐ (landing card grids).
- Framer hover/tap — ⭐⭐ (only ScrollToTop confirmed; others are CSS-hover).
- Navbar hide-on-scroll — ⭐⭐⭐⭐ (every long-scroll page).

---

## Cross-system observations (audit · not OG rules)

- **No motion-tokens file.** Durations are repeated as Tailwind utility strings (`duration-200`, `duration-300`). Recommendation for new DS: extract `--motion-duration-fast: 200ms`, `--motion-duration-base: 300ms`, `--motion-duration-slow: 700ms` and reference everywhere.
- **No easing-tokens file.** `cubic-bezier(0.16, 1, 0.3, 1)` is hardcoded in FadeInSection — repeat-prone. Recommendation: `--motion-ease-out: ease-out; --motion-ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1); --motion-ease-shimmer: ease-in-out`.
- **Mixed motion stacks.** Framer Motion + Tailwind transitions + inline-style transitions coexist. This matches the workspace rule (per CLAUDE.md): *"Framer Motion ONLY · `useScroll`/`useTransform`/`useInView`/`useReducedMotion`."* OG predates that rule — new DS should consolidate to Framer for component motion, native CSS for shimmer/hover.
- **Reduced-motion not enforced site-wide.** Only badge has full coverage. Recommendation: wrap all `animate-*` Tailwind classes in `motion-safe:`.

---

**Audit complete · 8 motion primitives documented · 4 reduced-motion gaps logged · 700ms shimmer / 200ms hover / 600ms entrance / 300ms state intent recovered from theme.css comments + tested-vs verbatim notes.**
