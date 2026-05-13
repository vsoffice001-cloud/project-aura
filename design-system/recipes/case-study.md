# Recipe — Case Study

> **🚨 HARD GATES — read before building:**
> 1. **Variant DEFAULT = `editorial-light`.** Do NOT build cinematic-dark unless user explicitly asks for it OR project is pre-flagged dark. If unsure, ASK before scaffold.
> 2. **Organism filenames are LOCKED.** Use exactly: `Navbar`, `ReadingProgressBar`, `HeroSection`, `ClientContextSection`, `ChallengesSection`, `EngagementObjectivesSection`, `MethodologySection`, `ImpactSection`, `ValuePillarsSection`, `TestimonialSection`, `ResourcesSection`, `FinalCTASection`, `StickyCTA`. Inventing names like `Hero`, `Chapter1`, `ClosingScene` = build is wrong, redo.
> 3. **Background alternation is NOT optional.** Sequence on L50 is the source of truth. Even in cinematic-dark variant, alternate within dark family (deep / darker / surface). Same bg on every section = build is wrong.
> 4. **DS components per `design-system/COMPONENT_REFERENCE.md` MUST be imported.** Re-implementing atoms inline (Button, Badge, Card, etc.) violates Cat 13.8.
> 5. **No build "done" until aura-qa recipe-conformance gate passes.** Section count + names + bg alternation + variant verified.
> 6. **Source-of-truth files** (verbatim mirror, do NOT recreate): organism implementations live in `design-system/core/src/app/components/` (HeroSection.tsx, ChallengesSection.tsx, etc — see COMPONENT_REFERENCE.md). Reference case-study consumers: `projects/casestudy-templates/template-v3/` and `template-v28/`.

**Pillar:** consulting  
**Variant:** **editorial-light (DEFAULT)** · cinematic-dark (opt-in only, requires user-explicit override)  
**Voice:** [voice/consulting.md](../voice/consulting.md)  
**Motion:** [motion/MOTION_SPEC.md](../motion/MOTION_SPEC.md)  
**Anti-patterns:** Categories 1, 2, 3, 4, 5, 6, 7, 11, 13 from [ANTI_PATTERNS.md](../ANTI_PATTERNS.md)

---

## Intent

Showcase a single client engagement from challenge to outcome. Reader is a senior buyer (CHRO, Strategy Head, GM) evaluating whether Ken Research's approach matches their context. Page must earn credibility through evidence, not adjectives.

---

## When to use this recipe

- Publishing a client engagement narrative end-to-end
- Demonstrating methodology in a real-world context
- Building a premium showcase to anchor a service pitch
- Presenting measurable outcomes backed by process

## When NOT to use

- Service category listing pages (use `service-overview.md`)
- Abstract methodology documentation without a named client context (use `methodology.md`)
- Report Store content or market research narratives (use Research pillar recipes)

---

## Section sequence

| # | Organism | Purpose | Background | Spacing | Motion |
|---|---|---|---|---|---|
| 1 | `Navbar` | Top navigation, glass-header on scroll | transparent → warm-300 | — | CSS transition on scroll |
| 2 | `ReadingProgressBar` | Scroll progress indicator pinned to top | — | — | GSAP `useReadingProgress` |
| 3 | `HeroSection` | Hero h1, chips, metrics strip | black | xl | GSAP timeline: line scaleX → h1 y/opacity → subtitle → chips — `--duration-slow` `--ease-out-expo` |
| 4 | `ClientContextSection` | Client backdrop, industry, situation | white | lg | Framer `whileInView` fade-up — `--duration-medium` |
| 5 | `ChallengesSection` | Stat-led challenge callouts | warm-300 | lg | GSAP counter count-up on scroll-in, `power2.out` 2.5s |
| 6 | `EngagementObjectivesSection` | Strategic objectives grid (2-4 cards, asymmetric) | white | lg | Framer `staggerChildren` 80ms per card `--ease-spring` |
| 7 | `MethodologySection` | Phase / step timeline | black | xl | Framer `whileInView` per phase, stagger 100ms |
| 8 | `ImpactSection` | Outcome metrics (4 variants available) | white | lg | GSAP counter count-up + GSAP bar fill `power2.out` 2.5s |
| 9 | `ValuePillarsSection` | 3-pillar value proposition | warm-300 | lg | Framer `whileInView` stagger 80ms |
| 10 | `TestimonialSection` | Client quote, attribution, portrait | black | lg | Framer `whileInView` fade-up `--duration-medium` |
| 11 | `ResourcesSection` | Related cases / resources grid | white | lg | `CardReveal` stagger 80ms — never nest inside `FadeInSection` |
| 12 | `FinalCTASection` | Bottom CTA + related links | warm-300 | xl | Framer `whileInView` fade-up |
| 13 | `StickyCTA` | Persistent bottom bar — visible while reading, hidden at hero + footer | — | — | CSS `position: fixed`, visibility controlled by `useHeroVisibility` |

**Background alternation rule (HARD GATE):**
- **editorial-light variant:** `black → white → warm-300 → white → black → white → warm-300 → black → white → warm-300`
- **cinematic-dark variant (opt-in):** `bg-deep → bg-darker → bg-surface → bg-deep → bg-darker → bg-surface → bg-deep → bg-darker → bg-surface → bg-deep`
- Same bg on every section = bug.
- Improvising sequence = bug.
- aura-qa MUST sample computed `background-color` per section + assert alternation. No alternation = recipe-conformance gate FAILS.

---

## Voice highlights

- Hero h1: 2-4 words MAX, declarative noun phrase, past tense. Example: *"Culture Restored."* / *"Operations Reimagined."*
- Section h2: 3-6 words, noun + qualifier + period. Example: *"The Transformation Architecture."* / *"Tangible Impact."*
- Eyebrow labels: ALL CAPS, tracking-wide. Example: *"CHAPTER 02 — STRATEGIC OBJECTIVES"* / *"PHASE BETA"*
- Never write claims without methodology link. *"We achieved 34% reduction"* must include *"through structured X"* or a page link.
- Never use: "journey", "leverage" (verb), "synergy", "innovative", "seamless", "transform" (as verb in headings).

---

## Motion highlights

- Hero entrance: GSAP timeline, `--duration-slow` (800ms), `--ease-out-expo`. Fires on page load only.
- Stats/counter: GSAP count-up from 0 → target, `power2.out`, 2500ms. Fires once on `top 80%` scroll trigger. Under `prefers-reduced-motion`, set final state immediately via `gsap.set()`.
- Card stagger: Framer `staggerChildren`, 80ms per card, `--ease-spring`. Never exceed 150ms per item, never exceed 8 items without grouping.
- Reduced-motion contract: every animation must show final state immediately under `prefers-reduced-motion: reduce`. `useShimmer` on `Button` is brand-locked — do not remove.

---

## Mock data shape

```ts
// TODO: replace w/ real API — GET /api/case-studies/:slug
export const HERO_CHIPS: { label: string }[] = [
  { label: "Workforce Engagement" },
  { label: "Manufacturing" },
  { label: "60,000+ Employees" },
];

export const HERO_METRICS: { value: string; label: string }[] = [
  { value: "34%", label: "Increase in Engagement Score" },
  { value: "18 months", label: "Transformation Timeline" },
  { value: "60K+", label: "Employees Covered" },
];

export const CHALLENGE_STATS: { value: string; label: string; description: string }[] = [
  { value: "42%", label: "Disengagement rate", description: "Among frontline workforce pre-intervention" },
  { value: "28%", label: "Attrition", description: "Annual, concentrated in production units" },
];

export const OBJECTIVES: { title: string; description: string; pill: string }[] = [
  { title: "Diagnostic Architecture", description: "...", pill: "OBJECTIVE 01" },
  { title: "Engagement Framework", description: "...", pill: "OBJECTIVE 02" },
];

export const PHASES: { step: string; title: string; description: string; duration: string }[] = [
  { step: "Phase Alpha", title: "Discovery", description: "...", duration: "8 weeks" },
  { step: "Phase Beta", title: "Intervention Design", description: "...", duration: "12 weeks" },
];

export const METRICS: { value: string; label: string; delta?: string }[] = [
  { value: "34%", label: "Engagement improvement", delta: "+34pts" },
  { value: "60K+", label: "Employees reached" },
];

export const TESTIMONIAL: {
  quote: string;
  author: string;
  role: string;
  company: string;
  portrait?: string;
} = {
  quote: "The diagnostic framework gave us a language for disengagement we had never had before.",
  author: "Ravi Sharma",
  role: "Group CHRO",
  company: "Apex Manufacturing",
};

export const RELATED_CASES: { title: string; industry: string; slug: string }[] = [
  { title: "Retention Redesigned", industry: "Logistics", slug: "retention-redesigned" },
];
```

---

## Component composition (skeleton)

```tsx
<Navbar />
<ReadingProgressBar />
<HeroSection chips={HERO_CHIPS} metrics={HERO_METRICS} />
<ClientContextSection />
<ChallengesSection stats={CHALLENGE_STATS} />
<EngagementObjectivesSection objectives={OBJECTIVES} />
<MethodologySection phases={PHASES} />
<ImpactSection metrics={METRICS} />
<ValuePillarsSection />
<TestimonialSection testimonial={TESTIMONIAL} />
<ResourcesSection cases={RELATED_CASES} />
<FinalCTASection />
<StickyCTA />
```

**Note:** Case Study organisms live flat in `src/app/components/`, not under `organisms/`. Import paths differ from Research/Surveys organisms. See COMPONENT_REFERENCE.md Category note.

---

## A11y gates

- WCAG AA contrast — minimum 4.5:1 body, 3:1 large text. Verify on both editorial-light and cinematic-dark variants separately.
- Keyboard nav fully traversable — tab order follows DOM order
- ARIA landmarks — `<main>`, `<nav>`, `<article>` where appropriate
- `prefers-reduced-motion` respected — all animations disabled (final state shown)
- 44px touch targets on mobile — `StickyCTA` buttons, all card CTAs, `Navbar` items
- Focus rings visible on all interactive elements — `:focus-visible` with 2px solid ring

## Perf gates

- LCP < 2.5s on 4G mobile — hero image (if any) must use `next/image` with priority
- INP < 200ms — `StickyCTA` visibility toggle must not trigger layout recalc
- CLS < 0.1 — `ReadingProgressBar` uses `position: fixed`, no layout impact
- Bundle size: GSAP ScrollTrigger is code-split — verify it does not land on initial paint

## Visual baseline

- Desktop 1440×900 screenshot
- Tablet 768×1024 screenshot
- Mobile 390×844 screenshot
- Compare against baseline on regression
