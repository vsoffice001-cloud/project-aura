# Recipe — Survey Detail

**Pillar:** surveys  
**Variant:** editorial-light  
**Voice:** [voice/surveys.md](../voice/surveys.md)  
**Motion:** [motion/MOTION_SPEC.md](../motion/MOTION_SPEC.md)  
**Anti-patterns:** Categories 1, 2, 3, 5, 7, 11 from [ANTI_PATTERNS.md](../ANTI_PATTERNS.md)

---

## Intent

Provide all information a respondent needs to decide whether to participate in a specific survey and then start it. Reader has arrived from the survey listing or a direct link. Page must surface time estimate, question count, and privacy stance before any call-to-action. Remove friction; do not add pressure.

---

## When to use this recipe

- Any individual survey's pre-participation detail page
- "Preview" destination from `SurveyCard` click on `survey-listing.md`
- Direct URL from panel invitation email

## When NOT to use

- Survey listing across multiple surveys (use `survey-listing.md`)
- In-survey question flow (separate product, not a DS-core recipe)
- Survey result / analysis page (use Research pillar recipes for published results)

---

## Section sequence

| # | Organism | Purpose | Background | Spacing | Motion |
|---|---|---|---|---|---|
| 1 | `Navbar` | Top navigation | white | — | CSS transition on scroll |
| 2 | Survey Hero (custom composition) | Title, `CompletionBadge`, time estimate, question count, closing date, privacy tag — all above the fold | black | xl | Framer `whileInView` fade-up `--duration-medium` |
| 3 | `SectionWrapper` (what we ask) | Question preview cards using `QuestionPreview` molecule | white | lg | `CardReveal` stagger 80ms `--ease-spring` |
| 4 | `ResponseChart` (conditional) | Aggregate response distribution if prior wave data is available — CSS-only bar/donut | warm-300 | lg | static — no entrance animation on data visualization |
| 5 | `MethodologySection` | Survey methodology: approach, sample target, anonymization method, data use statement | white | lg | Framer `whileInView` fade-up `--duration-medium` |
| 6 | `SectionWrapper` (take survey CTA) | Full-width CTA to start the survey, restates time estimate + privacy | black | xl | Framer `whileInView` fade-up `--duration-medium` |
| 7 | `Footer` | Site footer | black | — | static |

**Survey Hero is a custom composition** — no dedicated `SurveyHero` organism exists. Compose using `SectionWrapper background="black" spacing="xl"` + `Container variant="content"` + explicit heading/metadata structure. See composition skeleton below.

**Background alternation:** black → white → warm-300 → white → black → black.

---

## Voice highlights

- Survey h1: Match card title exactly. *"Frontline Workforce Engagement 2026"* — never rewritten for the detail page.
- Time estimate: Top of hero, above all other metadata. Conservative, rounded up. *"5 minutes"* — never *"just 5 minutes"* or *"quick"*.
- Privacy stance: Explicit, plain language in hero. *"Anonymous. Aggregated. Not shared with third parties."* — never buried in methodology section alone.
- Closing date: Factual. *"Open until 30 May 2026"* — never *"Closes soon!"* even if closing in 2 days.
- Question preview labels: Sentence case, max 20 words per question preview. Example: *"How many people report to you directly?"*
- CTA: *"Start Survey"* — never *"Take it now!"* or *"Submit your voice"*.
- Never use: "important survey", "critical data", "your voice matters", "quick", "easy".

---

## Motion highlights

- Hero composition: Framer `whileInView` fade-up, `--duration-medium` (500ms), `--ease-out`. Fires once on entry.
- Question preview cards: `CardReveal` stagger 80ms. Maximum 6 preview cards — beyond 6, group or paginate.
- `ResponseChart`: Static, no entrance animation. Data visualization should not animate — renders confusing.
- Methodology section: Framer `whileInView` fade-up, `--duration-medium`.
- CTA section: Framer `whileInView` fade-up, `--duration-medium`.
- Reduced-motion contract: All Framer animations disabled. `CardReveal` shows final state. `ResponseChart` unchanged.

---

## Mock data shape

```ts
// TODO: replace w/ real API — GET /api/surveys/:slug
export const SURVEY_DETAIL: {
  id: string;
  title: string;
  topic: string;
  status: "open" | "closing-soon" | "closed" | "completed";
  timeEstimateMinutes: number;
  questionCount: number;
  sectionCount: number;
  isAnonymous: boolean;
  privacyStatement: string;
  responseCount: number;
  closingDate?: string;
  completedDate?: string;
  description: string;
  methodology: {
    approach: string;
    targetSample: string;
    dataUse: string;
    anonymizationMethod: string;
  };
  surveyUrl: string;
} = {
  id: "sv001",
  title: "Frontline Workforce Engagement 2026",
  topic: "HR & Workforce",
  status: "open",
  timeEstimateMinutes: 5,
  questionCount: 12,
  sectionCount: 3,
  isAnonymous: true,
  privacyStatement: "Anonymous. Aggregated. Not shared with third parties.",
  responseCount: 1247,
  closingDate: "2026-05-30",
  description:
    "This survey captures workforce engagement patterns among frontline employees across manufacturing, logistics, and retail sectors in India.",
  methodology: {
    approach: "Self-administered structured questionnaire with 5-point Likert scale responses.",
    targetSample: "HR managers and CHRO-level professionals at organisations with 500+ employees.",
    dataUse: "Aggregated for the 2026 India Workforce Engagement Report, published Q3 2026.",
    anonymizationMethod: "Responses are collected without personally identifiable information.",
  },
  surveyUrl: "/surveys/sv001/start",
};

export const QUESTION_PREVIEWS: {
  id: string;
  sectionLabel: string;
  questionText: string;
  type: "single-choice" | "multi-choice" | "scale" | "open-text";
}[] = [
  {
    id: "q001",
    sectionLabel: "About your role",
    questionText: "How many people report to you directly?",
    type: "single-choice",
  },
  {
    id: "q002",
    sectionLabel: "About your role",
    questionText: "Which sector does your organisation primarily operate in?",
    type: "single-choice",
  },
  {
    id: "q003",
    sectionLabel: "Team engagement",
    questionText: "How would you rate overall morale in your team over the past 6 months?",
    type: "scale",
  },
];

// Optional — only populate if prior wave data exists
export const PRIOR_RESPONSE_DATA: {
  label: string;
  percentage: number;
  waveLabel: string;
}[] | null = null;
```

---

## Component composition (skeleton)

```tsx
<Navbar />

{/* Survey Hero — custom composition, no SurveyHero organism */}
<SectionWrapper background="black" spacing="xl">
  <Container variant="content">
    <CompletionBadge state={SURVEY_DETAIL.status} />
    <h1>{SURVEY_DETAIL.title}</h1>
    <p>{SURVEY_DETAIL.description}</p>
    {/* Metadata strip — always in this order: time → questions → closing date → privacy */}
    <div className="flex gap-6 flex-wrap">
      <span>{SURVEY_DETAIL.timeEstimateMinutes} minutes</span>
      <span>{SURVEY_DETAIL.questionCount} questions</span>
      {SURVEY_DETAIL.closingDate && (
        <span>Open until {SURVEY_DETAIL.closingDate}</span>
      )}
      <Badge theme="neutral">{SURVEY_DETAIL.privacyStatement}</Badge>
    </div>
    <Button variant="brand" size="md" href={SURVEY_DETAIL.surveyUrl}>
      Start Survey
    </Button>
  </Container>
</SectionWrapper>

{/* Question previews */}
<SectionWrapper background="white" spacing="lg">
  <Container variant="content">
    <SectionHeading label="WHAT WE ASK" title="Question preview." />
    <CardReveal staggerDelay={80}>
      {QUESTION_PREVIEWS.map((q) => (
        <QuestionPreview key={q.id} {...q} />
      ))}
    </CardReveal>
  </Container>
</SectionWrapper>

{/* Prior response data — conditional */}
{PRIOR_RESPONSE_DATA && (
  <SectionWrapper background="warm-300" spacing="lg">
    <Container variant="content">
      <SectionHeading label="PRIOR WAVE" title="How others responded." />
      <ResponseChart data={PRIOR_RESPONSE_DATA} />
    </Container>
  </SectionWrapper>
)}

{/* Methodology */}
<MethodologySection
  title="How this survey works."
  approach={SURVEY_DETAIL.methodology.approach}
  targetSample={SURVEY_DETAIL.methodology.targetSample}
  dataUse={SURVEY_DETAIL.methodology.dataUse}
  anonymizationMethod={SURVEY_DETAIL.methodology.anonymizationMethod}
/>

{/* Final CTA */}
<SectionWrapper background="black" spacing="xl">
  <Container variant="content">
    <SectionHeading
      title="Participate in this survey."
      subtitle={`${SURVEY_DETAIL.timeEstimateMinutes} minutes · ${SURVEY_DETAIL.privacyStatement}`}
    />
    <Button variant="brand" size="md" href={SURVEY_DETAIL.surveyUrl} showArrow>
      Start Survey
    </Button>
    <CTALink href="/surveys">View all surveys</CTALink>
  </Container>
</SectionWrapper>

<Footer />
```

**`MethodologySection` organism:** This is the case-study `MethodologySection` at `@/app/components/MethodologySection`. Verify its props accept the survey methodology shape — may need a custom section composition if props are case-study-specific.

---

## A11y gates

- WCAG AA contrast — hero: white text on black, badge colors on black background
- Keyboard nav fully traversable — "Start Survey" CTA in hero and final section both reachable
- ARIA landmarks — `<main>`, `<nav>`, `<footer>`
- `prefers-reduced-motion` respected — `CardReveal` and Framer animations disabled
- 44px touch targets — "Start Survey" button, all question preview cards
- Focus rings visible on all interactive elements
- `CompletionBadge` uses both color and text — not color-only state indicator
- Privacy statement must not require scroll to discover — above fold in hero

## Perf gates

- LCP < 2.5s on 4G mobile
- INP < 200ms
- CLS < 0.1
- `ResponseChart` CSS-only — no JS animation, no runtime chart library import for simple bar/donut
- `QuestionPreview` cards are static content — no async loading needed

## Visual baseline

- Desktop 1440×900 screenshot — verify privacy + time estimate visible in hero without scroll
- Tablet 768×1024 screenshot
- Mobile 390×844 screenshot — verify CTA button above fold
- Compare against baseline on regression
