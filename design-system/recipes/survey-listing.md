# Recipe — Survey Listing

**Pillar:** surveys  
**Variant:** editorial-light  
**Voice:** [voice/surveys.md](../voice/surveys.md)  
**Motion:** [motion/MOTION_SPEC.md](../motion/MOTION_SPEC.md)  
**Anti-patterns:** Categories 1, 2, 3, 5, 7, 11 from [ANTI_PATTERNS.md](../ANTI_PATTERNS.md)

---

## Intent

Present all available surveys grouped by lifecycle state so respondents can quickly find surveys that are open for participation. Reader is a research participant or Ken Research panel member. Page must surface time-sensitive surveys (open / closing soon) prominently without using scarcity manipulation. Lifecycle state must be unambiguous.

---

## When to use this recipe

- The primary survey browse/listing page
- Panel portal page showing surveys available to a respondent
- Admin-facing listing of all surveys across lifecycle states

## When NOT to use

- Single survey detail / take-survey flow (use `survey-detail.md`)
- Survey completion confirmation pages
- Research methodology disclosure pages (use Research pillar recipes)

---

## Section sequence

| # | Organism | Purpose | Background | Spacing | Motion |
|---|---|---|---|---|---|
| 1 | `Navbar` | Top navigation | white | — | CSS transition on scroll |
| 2 | `ReportStoreHero` (re-themed for Surveys) | Surveys surface hero — title, short descriptor, search bar | black | xl | GSAP timeline fade-up h1 + descriptor — `--duration-slow` `--ease-out-expo` |
| 3 | `ListingToolbar` | Active filter chips, sort dropdown, result count | white | sm | static |
| 4 | `SidebarPanel` wrapping filter section | Left-rail filter sidebar — filter by topic, duration, lifecycle state | white | — | CSS expand/collapse |
| 5 | `BrowseGrid` with `SurveyCard` — Open group | Surveys currently accepting responses | white | lg | `CardReveal` stagger 80ms `--ease-spring` |
| 6 | `BrowseGrid` with `SurveyCard` — Closing soon group | Surveys within 7 days of close, `CompletionBadge state="closing-soon"` | warm-300 | lg | `CardReveal` stagger 80ms |
| 7 | `BrowseGrid` with `SurveyCard` — Closed group | Surveys no longer accepting responses | white | lg | Framer `whileInView` stagger 60ms — subtler, less prominent |
| 8 | `BrowseGrid` with `SurveyCard` — Completed group | Published results available, `CompletionBadge state="completed"` | warm-300 | lg | Framer `whileInView` stagger 60ms |
| 9 | `Footer` | Site footer | black | — | static |

**Lifecycle group labels:** *"Open"* · *"Closing Soon"* · *"Closed"* · *"Completed"* — use `SectionHeading` with `SectionLabel` eyebrow. Each group is a separate `SectionWrapper`.

**Mobile layout:** Single column. `SidebarPanel` collapses to `MobileFilterSheet` (bottom sheet). All lifecycle groups stack vertically.

---

## Voice highlights

- Hero h1: Descriptive, low-pressure. Example: *"Participate in Research."* / *"Active Surveys."* — never *"Join the community!"*.
- Survey card title: 3-8 words, subject-descriptive. Example: *"Frontline Workforce Engagement 2026"* — matches detail page h1 exactly.
- Closing-soon framing: Factual, not manipulative. *"Closes 30 May 2026"* — never *"Last chance!"* / *"Only 3 days left!"*.
- Time estimate: Always visible on card. *"5 minutes"* — never *"quick survey"* or *"just a few minutes"*.
- Privacy badge: Always visible on card. *"Anonymous"* — never buried.
- Never use: scarcity language, "important", "critical", "urgent", "your voice matters".

---

## Motion highlights

- Hero entrance: GSAP timeline, `--duration-slow` (800ms), `--ease-out-expo`. Page-load only.
- Open surveys grid: `CardReveal` stagger 80ms — most prominent group, receives full entrance treatment.
- Closing-soon group: `CardReveal` stagger 80ms — same as open, proximity conveys priority without manipulation.
- Closed / completed groups: Framer `whileInView` stagger 60ms — subtler. These are secondary content.
- Filter sheet (`MobileFilterSheet`): Framer `AnimatePresence` slide-up, `--duration-medium`, `--ease-out`.
- Reduced-motion contract: All card reveal animations disabled. Cards shown at final state immediately.

---

## Mock data shape

```ts
// TODO: replace w/ real API — GET /api/surveys?status=open,closing-soon,closed,completed
export const SURVEYS_OPEN: {
  id: string;
  title: string;
  topic: string;
  timeEstimateMinutes: number;
  questionCount: number;
  isAnonymous: boolean;
  responseCount: number;
  closingDate: string;
  slug: string;
}[] = [
  {
    id: "sv001",
    title: "Frontline Workforce Engagement 2026",
    topic: "HR & Workforce",
    timeEstimateMinutes: 5,
    questionCount: 12,
    isAnonymous: true,
    responseCount: 1247,
    closingDate: "2026-05-30",
    slug: "frontline-workforce-engagement-2026",
  },
];

export const SURVEYS_CLOSING_SOON: typeof SURVEYS_OPEN = [
  {
    id: "sv002",
    title: "GCC Healthcare Sentiment Q2 2026",
    topic: "Healthcare",
    timeEstimateMinutes: 8,
    questionCount: 15,
    isAnonymous: true,
    responseCount: 892,
    closingDate: "2026-05-08",
    slug: "gcc-healthcare-sentiment-q2-2026",
  },
];

export const SURVEYS_CLOSED: {
  id: string;
  title: string;
  topic: string;
  closedDate: string;
  responseCount: number;
  slug: string;
}[] = [];

export const SURVEYS_COMPLETED: {
  id: string;
  title: string;
  topic: string;
  completedDate: string;
  responseCount: number;
  resultsUrl?: string;
  slug: string;
}[] = [];
```

---

## Component composition (skeleton)

```tsx
<Navbar />
<ReportStoreHero
  title="Active Surveys"
  descriptor="Research surveys open for participation across workforce, healthcare, and market topics."
  mode="surveys"
/>
<SectionWrapper background="white" spacing="sm">
  <Container variant="page">
    <ListingToolbar resultCount={totalSurveyCount} />
  </Container>
</SectionWrapper>
<SectionWrapper background="white" spacing="sm">
  <Container variant="page">
    <div className="flex gap-8">
      <SidebarPanel>
        {/* filter by topic, duration, lifecycle */}
      </SidebarPanel>
      <div className="flex-1 space-y-12">
        {/* Open surveys */}
        <section aria-label="Open surveys">
          <SectionHeading label="OPEN" title="Accepting Responses" />
          <CardReveal staggerDelay={80}>
            {SURVEYS_OPEN.map((s) => (
              <SurveyCard key={s.id} {...s} layout="grid" badge={<CompletionBadge state="open" />} />
            ))}
          </CardReveal>
        </section>
        {/* Closing soon */}
        <section aria-label="Closing soon surveys">
          <SectionHeading label="CLOSING SOON" title="Last Days Open" />
          <CardReveal staggerDelay={80}>
            {SURVEYS_CLOSING_SOON.map((s) => (
              <SurveyCard key={s.id} {...s} layout="grid" badge={<CompletionBadge state="closing-soon" />} />
            ))}
          </CardReveal>
        </section>
        {/* Closed */}
        {SURVEYS_CLOSED.length > 0 && (
          <section aria-label="Closed surveys">
            <SectionHeading label="CLOSED" title="No Longer Accepting Responses" />
            {SURVEYS_CLOSED.map((s) => (
              <SurveyCard key={s.id} {...s} layout="grid" badge={<CompletionBadge state="closed" />} />
            ))}
          </section>
        )}
        {/* Completed */}
        {SURVEYS_COMPLETED.length > 0 && (
          <section aria-label="Completed surveys">
            <SectionHeading label="COMPLETED" title="Results Published" />
            {SURVEYS_COMPLETED.map((s) => (
              <SurveyCard key={s.id} {...s} layout="grid" badge={<CompletionBadge state="completed" />} />
            ))}
          </section>
        )}
      </div>
    </div>
    <MobileFilterSheet />
  </Container>
</SectionWrapper>
<Footer />
```

**`CompletionBadge` legend:** Consider a legend block at the top of the listing area explaining the 4 states — `CompletionBadge state="open"` | `state="closing-soon"` | `state="closed"` | `state="completed"`. Small, static, placed above first group. Improves first-time user orientation.

---

## A11y gates

- WCAG AA contrast — `CompletionBadge` color variants must each meet 4.5:1 on editorial-light background
- Keyboard nav fully traversable — each `SurveyCard` focusable, filter checkboxes keyboard-operable
- ARIA landmarks — `<main>`, `<nav>`, `<footer>`, `<aside>` for filter sidebar, `aria-label` per lifecycle group section
- `prefers-reduced-motion` respected — `CardReveal`, `MobileFilterSheet` animations disabled
- 44px touch targets — all `SurveyCard` click areas, filter checkboxes
- Color is not the only state indicator — `CompletionBadge` uses both color and text label
- Focus rings visible on all interactive elements

## Perf gates

- LCP < 2.5s on 4G mobile
- INP < 200ms — filter changes must not synchronously re-render all groups
- CLS < 0.1 — `SurveyCard` must have fixed height in grid mode
- `SurveySkeleton` for loading states
- Empty groups (Closed, Completed with zero items) rendered conditionally — do not render empty `SectionWrapper`

## Visual baseline

- Desktop 1440×900 screenshot — verify all 4 lifecycle groups visible or scrollable
- Tablet 768×1024 screenshot
- Mobile 390×844 screenshot — verify `MobileFilterSheet` handle visible
- Compare against baseline on regression
