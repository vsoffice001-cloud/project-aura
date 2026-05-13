# Motion Router — decision tree (REVISED 2026-05-08 · Framer-only)

**When to load:** task brief mentions animation / scroll / hover / transition / micro-interaction · `motion-pass` workflow · motion step in `page-build`.

**Output:** Framer Motion API choice + reduced-motion strategy + perf budget.

**Stack lock-in 2026-05-08:** Framer Motion ONLY. GSAP + Lenis REMOVED for dev-team parity — devs don't use either. Native CSS handles smooth scroll + simple transitions.

---

## Step 1 — Map motion type to Framer API

| Motion type | API | Reason |
|---|---|---|
| Component state transitions (open/close, mount/unmount) | `motion.*` + `AnimatePresence` | exit animations · keyed transitions |
| Hover / press / focus | `whileHover` · `whileTap` · `whileFocus` | declarative gesture API |
| Drag / swipe | `drag` + `dragConstraints` | gesture system |
| Layout transitions (reorder, resize, FLIP) | `layout` prop · `LayoutGroup` | automatic FLIP animations |
| Scroll-driven (parallax, scrub, scroll-into-view) | `useScroll` + `useTransform` + `useInView` | native to Framer · works inside RSC island pattern |
| Cinematic timeline scrubbing | `useScroll({ target, offset })` + `useTransform` chain | maps scroll progress to property values |
| Stagger entrance | `variants` w/ `transition.staggerChildren` | declarative stagger |
| Number counters | DS `useAnimatedCounter` (uses Framer `animate()` under the hood) | spring physics · `inView` trigger |
| Smooth page scroll | native CSS `html { scroll-behavior: smooth }` (DS `core-v2/styles/base.css`) | zero JS · no Framer or Lenis |
| Simple CSS transitions <300ms | CSS `transition` w/ `var(--duration-*)` token | GPU · faster than Framer for trivial fades |
| Micro-interaction polish | `impeccable animate` subcommand | post-build polish pass |

---

## Step 2 — Reduced-motion (HARD GATE)

ALL motion MUST respect `prefers-reduced-motion: reduce`.

### Framer
```tsx
import { useReducedMotion, motion } from 'framer-motion';

const reduced = useReducedMotion();

<motion.div
  initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
  animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
  transition={{ duration: reduced ? 0 : 0.4 }}
/>
```

### CSS (catches anything outside Framer)
Already in DS `core-v2/styles/base.css`:
```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Reduced-motion test:** macOS System Settings → Accessibility → Display → Reduce motion. Toggle ON · navigate page · zero motion (or instant transitions) should run.

---

## Step 3 — Perf budget per surface

| Surface | Motion budget |
|---|---|
| Discovery (marketing) | Generous — 60fps required · cinematic mesh CSS + Framer scroll OK |
| Report Store (listing) | Moderate — card hover + sidebar slide OK · NO heavy parallax |
| Report Viewer | Restrained — reading surface · 1-2 micro-interactions · no scroll-driven |
| Dashboards | Minimal — working surface · skeleton loads, drill-down slide-in only |
| Engagement | Minimal — same as dashboards · async-thread updates fade-in only |

**60fps gate:** Chrome DevTools Performance tab · record interaction · scripting+rendering must hit 16ms frame budget. Profile reveals jank → reduce.

**Anti-pattern:** wrapping `<HighchartsReact>` inside `motion.div` w/ transform initial state can cause -1/-1 dim bug (Framer transform applied before chart measures). Use `initial={{ opacity: 0 }}` only — NO `y` translate on chart wrappers. Use `useInView` w/ `once: true` to defer chart mount until visible if needed.

---

## Step 4 — Common patterns + recipes (Framer-native)

### Hero h1 entrance (mount)
```tsx
const reduced = useReducedMotion();

<motion.h1
  initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
  animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: 'easeOut', staggerChildren: 0.08 }}
>
  {words.map(w => <motion.span key={w} variants={wordVariants}>{w} </motion.span>)}
</motion.h1>
```

### Stat counter (inView)
DS `useAnimatedCounter` hook — spring physics · `useInView` trigger · respects `useReducedMotion()`.

### Card hover (interactive)
```tsx
<motion.article
  whileHover={{ y: -2 }}
  transition={{ duration: 0.2, ease: 'easeOut' }}
/>
```

### Card grid stagger entrance (scroll-into-view)
```tsx
const ref = useRef(null);
const inView = useInView(ref, { once: true, margin: '-10% 0px' });

<motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'}
  variants={{
    visible: { transition: { staggerChildren: 0.06 } },
    hidden: {}
  }}
>
  {cards.map(c => (
    <motion.div key={c.id} variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
    }}>
      <Card {...c} />
    </motion.div>
  ))}
</motion.div>
```

### Cinematic mesh background (continuous)
CSS only · 5-overlay gradient mesh per `core-v2/patterns/DarkGradientMesh.tsx` · zero JS.

### Modal / drawer (state)
```tsx
<AnimatePresence>
  {open && (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    />
  )}
</AnimatePresence>
```

### Right-rail drill-down (state)
```tsx
<motion.aside
  initial={{ x: 320 }}
  animate={{ x: 0 }}
  exit={{ x: 320 }}
  transition={{ duration: 0.25, ease: 'easeOut' }}
/>
```

### Scroll-pinned hero (parallax/scrub)
```tsx
const ref = useRef(null);
const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);

<section ref={ref} className="h-[200vh] sticky top-0">
  <motion.div style={{ y, opacity }}>{/* hero */}</motion.div>
</section>
```

### Sticky-CTA scroll-triggered (mid-page reveal)
```tsx
const { scrollYProgress } = useScroll();
const ctaY = useTransform(scrollYProgress, [0, 0.6, 0.7], [100, 100, 0]);
const ctaOpacity = useTransform(scrollYProgress, [0, 0.6, 0.7], [0, 0, 1]);

<motion.div style={{ y: ctaY, opacity: ctaOpacity }} className="fixed bottom-6 right-6">
  <Button variant="brand">Buy report</Button>
</motion.div>
```

### Smooth page scroll
NO library. CSS handles it:
```css
html { scroll-behavior: smooth; }
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
}
```
Anchor links (`href="#section-id"`) get smooth scroll for free. `element.scrollIntoView({ behavior: 'smooth' })` works programmatically.

---

## Step 5 — Banned patterns

| Banned | Why | Use instead |
|---|---|---|
| GSAP / `@gsap/react` / ScrollTrigger | Removed 2026-05-08 dev-team parity · they don't use it | Framer `useScroll` + `useTransform` |
| Lenis / smooth-scroll JS lib | Removed 2026-05-08 · CSS-native works | `html { scroll-behavior: smooth }` |
| Auto-rotating carousels <6s | Cognitive load · Cat 13.4 | Static grid OR pause-on-hover ≥6s |
| Bouncy springs on working surfaces (dashboard, engagement, viewer) | Playful = wrong context | `transition: { ease: 'easeOut', duration: 0.2-0.3 }` |
| Confetti / celebration animations | Out of brand voice ("verified > vibes") | None (just success state) |
| Loading spinners | Anxiety signal | Skeleton states (Vercel/Linear pattern) |
| Auto-play hero videos | Bandwidth + battery + a11y trap | Static cinematic still + `useScroll` parallax |
| Charts wrapped in `motion.div` w/ `y` translate initial | Highcharts measures parent w/ active transform → -1/-1 dim bug | `initial={{ opacity: 0 }}` only · OR `useInView` defer mount |
| Heavy parallax on text-heavy pages | Reading fatigue | Subtle on hero only · text never parallaxed |
| `whileInView` w/o `viewport: { once: true }` | Re-fires on every scroll | Always `viewport={{ once: true }}` for entrance animations |

---

## Step 6 — Decision tree (when ambiguous)

```
Need motion?
  YES ↓
  
  Is it state-driven (mount, click, hover)?
    YES → Framer motion.* + AnimatePresence
  
  Is it scroll-driven (parallax, scrub, reveal)?
    YES → Framer useScroll / useTransform / useInView
  
  Is it micro (<300ms fade, color shift, simple transition)?
    YES → CSS transition + var(--duration-*) token
  
  Is it page smooth-scroll?
    YES → CSS html { scroll-behavior: smooth } (already in DS base.css)
  
  Is it polish on shipped UI?
    YES → impeccable animate subcommand
  
  Always: useReducedMotion() guard MANDATORY
```

---

## Cross-surface citations

- Surface 01 (Discovery) — full motion budget · cinematic mesh CSS + Framer scroll stagger + counter
- Surface 02 (Store) — moderate · card hover + filter slide + carousel
- Surface 03 (Viewer) — restrained · 1-2 micro-interactions
- Surface 04 (Dashboard) — minimal · drill-down slide only · NO scroll-driven mesh
- Surface 05 (Engagement) — minimal · same as dashboard
