# Motion Spec — Ken Research Design System

**Status:** Phase 1 (Aura Sprint 2026-05-01)  
**Source:** Extracted from existing DS-core hooks, theme.css keyframes, and component motion code  
**Voice:** Foundations — instructive, exact, scannable

---

## Identity

Motion at Ken Research = **editorial choreography, not decoration.**

- Confirms state changes (loading, hover, focus, completion).
- Reveals hierarchy (scroll-in stagger, eye-flow direction).
- Earns attention (shimmer brand signature, hero entrance).
- Respects user (reduced-motion always honored).

Never used to delight for its own sake. Never used to disguise slow performance.

---

## Brand-locked motion (NEVER override)

These two are brand identity. Removing them removes Ken Research's interaction signature.

| # | Motion | Where | Spec | Source |
|---|---|---|---|---|
| 1 | **Always-active shimmer** on Buttons | `Button` `variant="primary"` and `"brand"` | `--badge-shimmer-duration: 700ms`, `transition: transform 700ms ease-out` | `useShimmer.ts` hook, `theme.css` |
| 2 | **Counter count-up** on stats | Any `--text-3xl` / `--text-4xl` numeric stat that scrolls into view | GSAP `ScrollTrigger` start `top 80%`, duration 2.5s, ease `power2.out`, count from 0 → target | Pattern from ken-v1 `Chapter4Impact` (now deleted, pattern preserved here) |

**`useShimmer` hook is annotated DO NOT DELETE in DS source. Brand fundamental.**

---

## Easing tokens

Six canonical easings. Use these names. Never invent custom cubic-beziers.

| Token | CSS value | Use case |
|---|---|---|
| `--ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Default for entrance + reveal animations |
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | Hero-scale entrances, large display reveals |
| `--ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | Symmetric movement (loading, oscillation) |
| `--ease-pulse` | `cubic-bezier(0.4, 0, 0.6, 1)` | Pulse rings, breathing effects |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Card reveals, badge entrances (gentle overshoot) |
| `--ease-back-out` | `cubic-bezier(0.18, 0.89, 0.32, 1.28)` | Stat callouts, attention-grabbing reveals (more overshoot) |

**Migration note:** These are not yet in `tokens.json`. Phase 2 sprint adds them as `motion.ease.*` DTCG tokens.

---

## Duration tokens

Five canonical durations. Pick the closest. No `1234ms` arbitrary values.

| Token | Value | Use case |
|---|---|---|
| `--duration-fast` | `150ms` | Micro-interactions: button press, focus ring, tooltip open |
| `--duration-base` | `300ms` | Default state transitions: hover, color shift, badge open |
| `--duration-medium` | `500ms` | Card reveals, section scroll-in, modal open |
| `--duration-slow` | `800ms` | Hero entrance, large staggered reveals |
| `--duration-cinematic` | `1500ms` | Once-per-page hero choreography, scroll-scrubbed parallax |

Existing values found in DS-core code:
- `300ms` — badge transition, fade-in-scale (matches `--duration-base`)
- `500ms` — bounce-once (matches `--duration-medium`)
- `700ms` — shimmer (brand-locked, separate token `--shimmer-duration`)
- `1000ms` — bounce-subtle iteration (within `--duration-slow`)
- `1500ms` — loading-bar iteration (matches `--duration-cinematic`)

---

## Section-type → motion-type map

Choose motion type by section role. No freelancing.

| Section type | Motion library | Pattern | Duration | Easing |
|---|---|---|---|---|
| **Hero (page entry)** | GSAP timeline | Staggered reveal: line scaleX → headline y/opacity → subtitle → chips | 800ms hero, 150ms stagger | `--ease-out-expo` |
| **Section reveal (scroll-in)** | Framer Motion `whileInView` | Single fade-up: `opacity 0→1`, `y 40→0` | 500ms | `--ease-out` |
| **Card grid (stagger)** | Framer Motion `staggerChildren` or GSAP stagger | 80-100ms per card, fade + scale | 600ms each | `--ease-spring` |
| **Stat counter** | GSAP onUpdate | Count from 0 → target, parallel bar fill | 2500ms | `power2.out` |
| **Image reveal (cinematic)** | GSAP scrubbed | Blur-to-sharp + scale 1.05 → 1 | scrubbed by scroll | linear scrub |
| **Hover state (button, card)** | CSS transition | Single property, scale + bg | 150-300ms | `--ease-out` |
| **Loading skeleton** | CSS `@keyframes` | Shimmer sweep gradient | 1500ms infinite | `--ease-in-out` |
| **Modal / sheet open** | Framer Motion `AnimatePresence` | Fade + scale 0.96 → 1 | 300ms | `--ease-out` |
| **Tooltip** | Framer Motion or CSS | Fade only, no movement | 150ms | `--ease-out` |
| **Page transition** | None (intentional) | Hard cut on route change | n/a | n/a |

**Rule:** scroll-driven = GSAP. State-driven = Framer Motion. Hover = CSS. Brand-locked = preserved hook (`useShimmer`).

---

## Scroll triggers (GSAP ScrollTrigger)

Standard threshold values for scroll-in:

| Element | `start` | `end` | Behavior |
|---|---|---|---|
| Section reveal | `top 80%` | — | Fires once when 80% from top viewport |
| Hero parallax | `top top` | `bottom top` | Scrub-driven through section |
| Counter count-up | `top 80%` | — | Fires once on entry |
| Image cinematic reveal | `top 60%` | `top 20%` | Scrub-driven over 40% scroll |
| Sticky CTA | `top center` | `bottom center` | Pin during section scroll |

**Stagger:** never exceed 150ms per item. Beyond that, reader perceives lag, not choreography.

---

## Reduced-motion contract (mandatory)

Every animation MUST honor `prefers-reduced-motion: reduce`. No exceptions.

**Implementation rules:**

| Library | Pattern |
|---|---|
| **CSS** | `@media (prefers-reduced-motion: reduce) { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }` (already in DS theme.css) |
| **Framer Motion** | `useReducedMotion()` hook → conditionally disable variants. Use `transition={prefersReducedMotion ? { duration: 0 } : ...}` |
| **GSAP** | `gsap.matchMedia()` w/ `(prefers-reduced-motion: no-preference)` for full motion + `(prefers-reduced-motion: reduce)` setting final state directly via `gsap.set()` |

**Reduced-motion = final state shown immediately, no entrance animation.** Never just slow down — disable.

**Brand-locked exception:** `useShimmer` brand signature is the ONE motion that may persist at reduced amplitude under reduced-motion (debatable — Phase 2 audit decision). Stat counters MUST set final value immediately under reduced-motion (no count-up).

---

## Performance contract

| Constraint | Limit | How to verify |
|---|---|---|
| Frame rate | 60fps minimum on desktop, 30fps mobile | Chrome DevTools Performance tab during scroll |
| Compositor-only properties | `transform`, `opacity` only | Avoid animating `width`, `top`, `margin` |
| Layout thrashing | Zero layout reads after writes | Use `requestAnimationFrame` for synced reads/writes |
| Concurrent animations | Max 12 simultaneous | Beyond that, paint cost rises |
| Total motion budget per page | < 4 seconds total animation time on initial paint | Hero + reveals only |

If any animation drops below 60fps on a 2-year-old MacBook, simplify or remove. Speed > delight.

---

## Library boundaries

**Three libraries used. Do not blur boundaries.**

| Library | Owns | Never use for |
|---|---|---|
| **GSAP** (`@gsap/react` `useGSAP`, `ScrollTrigger`, `Timeline`) | Scroll-driven, scrubbed animations · multi-element timelines · cinematic hero choreography · count-up | Component state · gestures · layout animation · simple hover |
| **Framer Motion** (`motion`, `useReducedMotion`, `AnimatePresence`, `whileInView`, `whileHover`) | Component state · `AnimatePresence` mount/unmount · gesture handling · layout animation · simple scroll-in (`whileInView`) | Scrubbed scroll · timeline-coordinated multi-element · count-up |
| **CSS transitions / `@keyframes`** | Hover state · focus state · loading skeleton · brand shimmer | State-driven mount/unmount · scroll-driven · gesture |

**Never animate the same property on the same element from two libraries** — fight conditions, unpredictable.

**Lenis** (smooth scroll) — used at page level only, paired with GSAP ScrollTrigger sync. Not a motion lib for components.

**`motion/react` v12 vs `framer-motion` v11** — different package names for same library. DS-Dashboard uses `motion/react`, DS-core uses `framer-motion`. Phase 2 sprint = unify on one.

---

## Anti-patterns

1. **Never animate `top`, `left`, `width`, `height`, `margin`** for entrance/state changes. Use `transform: translate()`, `transform: scale()`, `opacity`. Compositor-only.
2. **Never use `transition: all`.** Specify properties. `transition: transform 300ms, opacity 300ms`.
3. **Never animate text color w/ duration > 200ms.** Visual lag, breaks scan.
4. **Never use bouncy easings on body text.** Save bounce for stat callouts and badges.
5. **Never use scroll-jacking** (overriding native scroll). Lenis = smooth, not hijacked.
6. **Never trigger animation on `mouseenter` for sections.** Only buttons/cards. Sections fire on scroll.
7. **Never animate during the first 1.5s after page load** unless brand hero entrance. User is still parsing layout.
8. **Never use `setInterval` for animation.** Use `requestAnimationFrame` or library timers.
9. **Never animate `box-shadow`** if avoidable (paint cost). Use opacity-fade overlay or pseudo-element.
10. **Never use staggered reveal beyond 8 items.** Becomes a parade. Use grouping or pagination.
11. **Never animate inside `position: fixed` ancestor without GPU layer hint.** Add `will-change: transform` to hint compositor.
12. **Never block scroll for > 50ms.** Profile any scroll handler.
13. **Never use `delay` longer than 1500ms** for entrance animations. Reader has scrolled past.
14. **Never autoplay sound or video** in any motion context.
15. **Never use parallax on mobile.** Disable < 1024px width — perception cost > visual gain on small screens.
16. **Never remove `useShimmer`** — it's brand-locked.

---

## When in doubt

1. Choose simpler animation
2. Choose shorter duration
3. Use existing easing token
4. Prefer CSS > Framer > GSAP (cost order)
5. Test with reduced-motion ON
6. Test on a low-end device
7. Ask: does this confirm a state change, or am I just decorating?

If decorating → cut it.

---

## Roadmap (Phase 2+)

- Add `motion.ease.*` and `motion.duration.*` to `tokens.json` as DTCG tokens
- Generate CSS custom properties for easings + durations via Style Dictionary
- Audit every animated component for spec compliance
- Visual regression baselines for all hero / scroll-in / stat patterns (Playwright snapshot)
- Unify `motion/react` vs `framer-motion` package usage across DS-core and DS-dashboard
- Consider adopting `Motion One` (lighter alternative) for simple state animations to reduce bundle size
