# Recipe — Service Overview

**Pillar:** consulting  
**Variant:** editorial-light  
**Voice:** [voice/consulting.md](../voice/consulting.md)  
**Motion:** [motion/MOTION_SPEC.md](../motion/MOTION_SPEC.md)  
**Anti-patterns:** Categories 1, 2, 3, 4, 5, 6, 7, 11 from [ANTI_PATTERNS.md](../ANTI_PATTERNS.md)

---

## Intent

Detail a single advisory service practice (e.g., "Workforce Engagement Practice", "Organisational Diagnosis"). Reader is a potential buyer evaluating whether the service addresses their specific mandate. Page is informational, not narrative — structured around value, method, and outcomes rather than a single client story.

---

## When to use this recipe

- Dedicated page per advisory service line
- Capability overview that precedes a case study link
- Landing destination from a service-category menu item or campaign

## When NOT to use

- Full client engagement narratives with named outcomes (use `case-study.md`)
- Methodology deep-dives with phase-by-phase breakdown (use `methodology.md`)
- Pages that need a hero with client context or testimonial as primary content anchor

---

## Section sequence

| # | Organism | Purpose | Background | Spacing | Motion |
|---|---|---|---|---|---|
| 1 | `Navbar` | Top navigation | transparent → white | — | CSS transition on scroll |
| 2 | `SectionWrapper` (intro) | Service name, short descriptor, primary CTA | black | xl | Framer `whileInView` fade-up `--duration-slow` |
| 3 | `ValuePillarsSection` | 3-pillar value proposition for this service | white | lg | Framer `staggerChildren` 80ms per pillar `--ease-spring` |
| 4 | `MethodologySection` | Approach phases / steps for this service | warm-300 | xl | Framer `whileInView` per phase, stagger 100ms |
| 5 | `ImpactSection` | Representative outcome metrics (not client-specific — label as indicative) | white | lg | GSAP counter count-up `power2.out` 2.5s |
| 6 | `ResourcesSection` | Related case studies for this service | warm-300 | lg | `CardReveal` stagger 80ms |
| 7 | `FinalCTASection` | Primary CTA to initiate engagement | black | xl | Framer `whileInView` fade-up |

**Background alternation:** black → white → warm-300 → white → warm-300 → black. Fewer sections than case study — sequence is compressed but same rule applies.

---

## Voice highlights

- Intro h1: Noun phrase naming the service. Example: *"Workforce Engagement Practice."* / *"Organisational Diagnosis."* — 3-5 words, descriptive, no adjectives.
- Section h2: Functional labels. Example: *"What We Deliver."* / *"The Approach."* / *"Representative Outcomes."*
- Outcome metrics must be labeled as indicative, not attributed to a specific client. Example: *"Representative of multi-sector engagements, 2022–2025."*
- Voice is informational, not narrative. No client story arc — present tense for capability, past tense for outcomes.
- Never write claims without methodology link. Cross-reference `MethodologySection` or link to `methodology.md`.

---

## Motion highlights

- Intro section: Framer `whileInView` fade-up, `--duration-slow` (800ms), `--ease-out-expo`.
- Value pillars stagger: 80ms per card, `--ease-spring`. Never nest `CardReveal` inside `FadeInSection`.
- Outcome counters: GSAP count-up from 0 → target if metrics are numeric. Under `prefers-reduced-motion`, show final value immediately via `gsap.set()`.
- Reduced-motion contract: all animations must honor `prefers-reduced-motion: reduce`.

---

## Mock data shape

```ts
// TODO: replace w/ real API — GET /api/services/:slug
export const SERVICE_INTRO: {
  title: string;
  descriptor: string;
  ctaLabel: string;
  ctaHref: string;
} = {
  title: "Workforce Engagement Practice",
  descriptor:
    "Structured diagnostic and intervention architecture for frontline and mid-management workforce alignment.",
  ctaLabel: "Initiate Strategy",
  ctaHref: "/contact",
};

export const SERVICE_VALUE_PILLARS: {
  icon: string;
  title: string;
  description: string;
}[] = [
  { icon: "Diagnostic", title: "Evidence-Led Diagnosis", description: "..." },
  { icon: "Framework", title: "Customised Framework", description: "..." },
  { icon: "Governance", title: "Governance Cadence", description: "..." },
];

export const SERVICE_PHASES: {
  step: string;
  title: string;
  description: string;
  duration: string;
}[] = [
  { step: "Phase Alpha", title: "Discovery", description: "...", duration: "6–8 weeks" },
  { step: "Phase Beta", title: "Framework Design", description: "...", duration: "10–12 weeks" },
  { step: "Phase Gamma", title: "Implementation", description: "...", duration: "12–16 weeks" },
];

export const SERVICE_METRICS: { value: string; label: string; note?: string }[] = [
  {
    value: "34%",
    label: "Average engagement improvement",
    note: "Representative of multi-sector engagements, 2022–2025",
  },
  { value: "18 months", label: "Typical transformation timeline" },
];

export const SERVICE_RELATED_CASES: {
  title: string;
  industry: string;
  slug: string;
}[] = [
  { title: "Culture Restored", industry: "Manufacturing", slug: "culture-restored" },
];
```

---

## Component composition (skeleton)

```tsx
<Navbar />
<SectionWrapper background="black" spacing="xl">
  <Container variant="content">
    <SectionLabel>WORKFORCE ENGAGEMENT</SectionLabel>
    <h1>{SERVICE_INTRO.title}</h1>
    <p>{SERVICE_INTRO.descriptor}</p>
    <Button variant="brand" size="md" showArrow>{SERVICE_INTRO.ctaLabel}</Button>
  </Container>
</SectionWrapper>
<ValuePillarsSection pillars={SERVICE_VALUE_PILLARS} />
<MethodologySection phases={SERVICE_PHASES} />
<ImpactSection metrics={SERVICE_METRICS} />
<ResourcesSection cases={SERVICE_RELATED_CASES} />
<FinalCTASection />
```

**Note:** `SectionWrapper` for intro is a manual composition — no dedicated `ServiceIntroSection` organism exists. `ValuePillarsSection`, `MethodologySection`, `ImpactSection`, `ResourcesSection`, `FinalCTASection` are canonical case-study organisms reused here. They live flat in `src/app/components/` — import from that path, not from `organisms/`.

---

## A11y gates

- WCAG AA contrast — editorial-light variant: `#000` on `#f5f2f1`, verify CTA red `#b01f24` on white meets 4.5:1
- Keyboard nav fully traversable
- ARIA landmarks — `<main>`, `<nav>`
- `prefers-reduced-motion` respected
- 44px touch targets on mobile for all CTAs
- Focus rings visible on all interactive elements

## Perf gates

- LCP < 2.5s on 4G mobile
- INP < 200ms
- CLS < 0.1
- No full-page hero image required — LCP target is achievable without image optimization concerns

## Visual baseline

- Desktop 1440×900 screenshot
- Tablet 768×1024 screenshot
- Mobile 390×844 screenshot
- Compare against baseline on regression
