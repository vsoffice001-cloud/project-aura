# Recipe — Methodology

**Pillar:** consulting  
**Variant:** editorial-light  
**Voice:** [voice/consulting.md](../voice/consulting.md)  
**Motion:** [motion/MOTION_SPEC.md](../motion/MOTION_SPEC.md)  
**Anti-patterns:** Categories 1, 2, 3, 4, 5, 6, 7, 11 from [ANTI_PATTERNS.md](../ANTI_PATTERNS.md)  
**Critical rule:** Every claim must link to a named phase or approach step — see Anti-patterns Category 7, rule 10.

---

## Intent

Explain Ken Research's consulting methodology in full — phases, approach rationale, diagnostic tools, governance cadence. Reader is an analytically-minded buyer who needs to understand the process before committing. Page must make abstract methodology concrete and reviewable.

---

## When to use this recipe

- Standalone methodology documentation page (linked from case studies, service pages)
- Detailed process disclosure for RFP or due-diligence contexts
- Anchor for "Read Methodology" CTAs across the consulting pillar

## When NOT to use

- Summary methodology blocks inside a case study (use `MethodologySection` organism within `case-study.md`)
- Service overview pages where methodology is one section, not the focus (use `service-overview.md`)
- Research methodology disclosures for reports (use `ResearchMethodology` organism in Report Store recipes)

---

## Section sequence

| # | Organism | Purpose | Background | Spacing | Motion |
|---|---|---|---|---|---|
| 1 | `Navbar` | Top navigation | transparent → white | — | CSS transition on scroll |
| 2 | `HeroSection` (compact) | Methodology name, short descriptor — smaller scale than case study hero | black | lg | GSAP timeline fade-up h1 + subtitle — `--duration-medium` `--ease-out-expo` |
| 3 | `MethodologySection` | Primary phase / step timeline with full descriptions | white | xl | Framer `whileInView` per phase, stagger 100ms `--ease-out` |
| 4 | `SectionWrapper` (approach detail) | Deeper prose for each phase — principles, tools used, governance checkpoints | warm-300 | xl | Framer `whileInView` fade-up `--duration-medium` |
| 5 | `ValuePillarsSection` | Underlying principles that inform the methodology | white | lg | Framer `staggerChildren` 80ms per pillar `--ease-spring` |
| 6 | `CodeBlockWithCopy` | Artifact example — framework template, diagnostic questionnaire structure, or structured output schema (when showing tangible deliverables) | warm-300 | lg | static |
| 7 | `FinalCTASection` | CTA to initiate engagement or request methodology briefing | black | xl | Framer `whileInView` fade-up |

**Background alternation:** black → white → warm-300 → white → warm-300 → black.

**Note on `CodeBlockWithCopy`:** Use only when methodology produces structured artifacts (e.g., a diagnostic framework template, a governance cadence table in JSON/YAML). If no artifact applies, omit this section.

---

## Voice highlights

- Hero h1: Descriptive title, not a claim. Example: *"The Engagement Diagnostic Framework."* / *"Workforce Alignment Methodology."* — 4-6 words, no adjectives.
- Every phase title: Noun phrase, no verbs. Example: *"Discovery Phase"* / *"Diagnostic Architecture"* / *"Governance Cadence."*
- Approach detail copy: Prose-led (not bullets). 2-4 sentences per phase principle. Past tense for observed outcomes, present tense for process description.
- Critical rule: Every claim of outcome in the methodology page must link to either a named phase within the page or a case study. Example: *"This phase typically reduces time-to-insight by 6–8 weeks (see: [Culture Restored](/case-studies/culture-restored))."*
- Never use "transform" as a verb in headings. Never use "journey", "leverage", "innovative".

---

## Motion highlights

- Hero: GSAP timeline, `--duration-medium` (500ms), `--ease-out-expo`. Compact hero — no chip strip, no metric row.
- Phase reveals: Framer `whileInView` per phase item, 100ms stagger. `--ease-out`. Fires once on scroll entry at `top 80%`.
- Approach detail: Framer `whileInView` fade-up single block. `--duration-medium`.
- Value pillars: Framer `staggerChildren` 80ms, `--ease-spring`. Max 3 pillars — stagger stays under 240ms total.
- Reduced-motion contract: All animations disabled under `prefers-reduced-motion: reduce`. Final state rendered immediately.

---

## Mock data shape

```ts
// TODO: replace w/ real API — GET /api/methodology/:slug
export const METHODOLOGY_HERO: { title: string; descriptor: string } = {
  title: "The Engagement Diagnostic Framework.",
  descriptor:
    "A structured, phase-based approach to diagnosing workforce disengagement and designing sustainable intervention architecture.",
};

export const METHODOLOGY_PHASES: {
  step: string;
  title: string;
  description: string;
  duration: string;
  tools?: string[];
}[] = [
  {
    step: "Phase Alpha",
    title: "Discovery",
    description:
      "Structured stakeholder mapping, existing data audit, and baseline diagnostic across 5 workforce segments.",
    duration: "6–8 weeks",
    tools: ["Stakeholder Registry", "Engagement Baseline Survey", "Data Audit Protocol"],
  },
  {
    step: "Phase Beta",
    title: "Diagnostic Architecture",
    description:
      "Quantitative and qualitative synthesis. Root-cause identification across managerial, structural, and cultural dimensions.",
    duration: "8–10 weeks",
    tools: ["Causal Analysis Matrix", "Focus Group Protocol", "Segment Heat Map"],
  },
];

export const APPROACH_PRINCIPLES: {
  title: string;
  description: string;
}[] = [
  {
    title: "Evidence before intervention.",
    description:
      "No framework is designed before the diagnostic phase is complete. Opinion and assumption are excluded from the process.",
  },
  {
    title: "Governance at every stage.",
    description:
      "Each phase concludes with a structured review gate — client and Ken Research jointly validate findings before progressing.",
  },
];

export const METHODOLOGY_VALUE_PILLARS: {
  icon: string;
  title: string;
  description: string;
}[] = [
  { icon: "Diagnosis", title: "Evidence-Led Diagnosis", description: "..." },
  { icon: "Architecture", title: "Systemic Framework Design", description: "..." },
  { icon: "Governance", title: "Structured Governance", description: "..." },
];

// Optional: only include if methodology has a structured artifact to show
export const ARTIFACT_EXAMPLE: { language: string; code: string; label: string } = {
  language: "yaml",
  label: "Diagnostic Framework Template (sample structure)",
  code: `framework:\n  name: Engagement Diagnostic v2\n  phases: 4\n  instruments:\n    - stakeholder_survey\n    - focus_group_protocol\n    - causal_matrix`,
};
```

---

## Component composition (skeleton)

```tsx
<Navbar />
<HeroSection compact title={METHODOLOGY_HERO.title} descriptor={METHODOLOGY_HERO.descriptor} />
<MethodologySection phases={METHODOLOGY_PHASES} />
<SectionWrapper background="warm-300" spacing="xl">
  <Container variant="prose">
    <SectionHeading label="APPROACH PRINCIPLES" title="How Each Phase Is Governed." />
    {APPROACH_PRINCIPLES.map((p) => (
      <CollapsibleSection key={p.title} title={p.title}>
        <p>{p.description}</p>
      </CollapsibleSection>
    ))}
  </Container>
</SectionWrapper>
<ValuePillarsSection pillars={METHODOLOGY_VALUE_PILLARS} />
{ARTIFACT_EXAMPLE && (
  <SectionWrapper background="warm-300" spacing="lg">
    <Container variant="content">
      <SectionHeading label="ARTIFACT SAMPLE" title={ARTIFACT_EXAMPLE.label} />
      <CodeBlockWithCopy language={ARTIFACT_EXAMPLE.language} code={ARTIFACT_EXAMPLE.code} />
    </Container>
  </SectionWrapper>
)}
<FinalCTASection />
```

**Note:** `HeroSection` compact mode — check component API for `compact?: boolean` prop. If not implemented, compose manually with `SectionWrapper background="black" spacing="lg"` + heading block. Do not invent props that don't exist in source.

---

## A11y gates

- WCAG AA contrast — black text on white and warm-300, white text on black sections
- Keyboard nav fully traversable — `CollapsibleSection` must be keyboard-operable
- ARIA landmarks — `<main>`, `<nav>`, `details`/`summary` semantics for `CollapsibleSection`
- `prefers-reduced-motion` respected
- 44px touch targets on mobile
- Focus rings visible on all interactive elements — especially `CollapsibleSection` trigger

## Perf gates

- LCP < 2.5s on 4G mobile
- INP < 200ms
- CLS < 0.1 — `CollapsibleSection` expansion must not trigger layout shift on surrounding content
- `CodeBlockWithCopy` syntax highlighting must not block initial paint — lazy load if needed

## Visual baseline

- Desktop 1440×900 screenshot
- Tablet 768×1024 screenshot
- Mobile 390×844 screenshot
- Compare against baseline on regression
