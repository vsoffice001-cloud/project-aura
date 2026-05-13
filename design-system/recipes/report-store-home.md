# Recipe — Report Store Home

**Pillar:** research  
**Variant:** editorial-light  
**Voice:** [voice/research.md](../voice/research.md)  
**Motion:** [motion/MOTION_SPEC.md](../motion/MOTION_SPEC.md)  
**Anti-patterns:** Categories 1, 2, 3, 5, 7, 11 from [ANTI_PATTERNS.md](../ANTI_PATTERNS.md)

---

## Intent

Present Ken Research's full report catalog as a discoverable, browseable homepage. Reader is a research buyer in scan-mode: they want to locate relevant sectors, see trending publications, and proceed to a report detail page. Page serves discovery and orientation, not persuasion.

---

## When to use this recipe

- The primary landing page of the Report Store product surface
- Re-entry point for returning users browsing new publications
- Campaign landing page driving directly to research discovery

## When NOT to use

- Filtered listing views with search/filter UI active (use `report-store-listing.md`)
- Single industry or sector deep-dives (use `sector-landing.md`)
- Single report detail pages (use `report-detail.md`)

---

## Section sequence

| # | Organism | Purpose | Background | Spacing | Motion |
|---|---|---|---|---|---|
| 1 | `Navbar` | Top navigation with Report Store identity | white | — | CSS transition on scroll |
| 2 | `ReportStoreHero` | Search bar, category pills, prominent CTA | black | xl | GSAP timeline: h1 → search bar → pills — `--duration-slow` `--ease-out-expo` |
| 3 | `FeaturedResearch` | Featured report cards (4-6 items, grid) | white | lg | `CardReveal` stagger 80ms `--ease-spring` |
| 4 | `IndustrySectorsGrid` | Sector tile grid — browse by industry | warm-300 | lg | Framer `staggerChildren` 80ms `--ease-spring` |
| 5 | `DailyDataHighlights` | Daily data tile grid (time-sensitive content) | white | lg | Framer `whileInView` fade-up `--duration-medium` |
| 6 | `AnalystPicks` | Analyst-curated row (horizontal scroll) | warm-300 | lg | `HorizontalScroll` drag + momentum, no entrance stagger |
| 7 | `KeyMarketIndicators` | Market indicators panel (CAGR, market size, etc.) | black | lg | Framer `whileInView` fade-up per indicator, stagger 60ms |
| 8 | `RecommendedForYou` | Personalized recommendations row (horizontal scroll) | white | lg | `HorizontalScroll` drag + momentum |
| 9 | `TopDownloads` | Most-downloaded list | warm-300 | lg | Framer `whileInView` stagger 60ms |
| 10 | `TrendingTopics` | Trending topic tags (pill overflow row) | white | md | `ScrollFade` for tag overflow — never use `HorizontalScroll` for pills |
| 11 | `CustomResearchCTA` | "Need custom research?" CTA block | black | xl | Framer `whileInView` fade-up `--duration-medium` |
| 12 | `NewsletterSignup` | Email capture | warm-300 | lg | static |
| 13 | `Footer` | Site footer | black | — | static |

**Background alternation:** black → white → warm-300 → white → warm-300 → black → white → warm-300 → white → black → warm-300 → black.

---

## Voice highlights

- Hero h1: 3-6 words, descriptive label. Example: *"India's Research Intelligence Hub."* / *"Market Reports. Sector Intelligence."* — no exclamation marks, no slogans.
- Section h2: Functional labels. *"Featured Research"* / *"Trending This Quarter"* / *"Top Downloads"*. 2-4 words.
- Report card titles: Full publication name, never abbreviated. Example: *"India Pharmaceutical Market Outlook 2026"* — never *"India Pharma Outlook"*.
- Metadata format on cards: *"125 pages · Published Q1 2026 · India"* — middle-dot separator.
- Never use: "comprehensive", "actionable insights", "cutting-edge", "everything you need to know".

---

## Motion highlights

- Hero entrance: GSAP timeline, `--duration-slow` (800ms), `--ease-out-expo`. Fires on page load only.
- Featured grid: `CardReveal` stagger 80ms. Do not nest inside `FadeInSection` — pick one reveal pattern.
- Horizontal scroll sections (`AnalystPicks`, `RecommendedForYou`): `HorizontalScroll` handles drag + momentum internally — do not add additional entrance animation.
- Trending topics: `ScrollFade` for overflow. Not `HorizontalScroll`.
- Reduced-motion contract: All entrance animations disabled under `prefers-reduced-motion: reduce`. `HorizontalScroll` drag behavior unchanged.

---

## Mock data shape

```ts
// TODO: replace w/ real API — GET /api/report-store/home
export const FEATURED_REPORTS: {
  id: string;
  title: string;
  industry: string;
  pages: number;
  publishedDate: string;
  region: string;
  slug: string;
  thumbnailUrl?: string;
}[] = [
  {
    id: "r001",
    title: "India Pharmaceutical Market Outlook 2026",
    industry: "Healthcare",
    pages: 180,
    publishedDate: "Q1 2026",
    region: "India",
    slug: "india-pharma-outlook-2026",
  },
];

export const SECTORS: {
  id: string;
  label: string;
  icon: string;
  reportCount: number;
  slug: string;
}[] = [
  { id: "s001", label: "Healthcare", icon: "health", reportCount: 47, slug: "healthcare" },
  { id: "s002", label: "FMCG", icon: "fmcg", reportCount: 63, slug: "fmcg" },
];

export const DAILY_HIGHLIGHTS: {
  id: string;
  stat: string;
  label: string;
  source: string;
  date: string;
}[] = [
  { id: "d001", stat: "8.4%", label: "CAGR — India FMCG 2024–2029", source: "Ken Research", date: "2026-05-04" },
];

export const ANALYST_PICKS: {
  id: string;
  title: string;
  analyst: string;
  note: string;
  slug: string;
}[] = [];

export const MARKET_INDICATORS: {
  id: string;
  label: string;
  value: string;
  cagr?: string;
  period?: string;
  sector: string;
}[] = [
  { id: "mi001", label: "India Healthcare Market", value: "USD 638B", cagr: "11.2%", period: "2024–2030", sector: "Healthcare" },
];

export const TRENDING_TOPICS: { label: string; slug: string }[] = [
  { label: "GCC FMCG", slug: "gcc-fmcg" },
  { label: "India Pharma", slug: "india-pharma" },
];

export const TOP_DOWNLOADS: {
  rank: number;
  title: string;
  industry: string;
  downloadCount: number;
  slug: string;
}[] = [
  { rank: 1, title: "India FMCG Market Report 2026", industry: "FMCG", downloadCount: 1240, slug: "india-fmcg-2026" },
];
```

---

## Component composition (skeleton)

```tsx
<Navbar />
<ReportStoreHero />
<FeaturedResearch reports={FEATURED_REPORTS} />
<IndustrySectorsGrid sectors={SECTORS} />
<DailyDataHighlights highlights={DAILY_HIGHLIGHTS} />
<AnalystPicks picks={ANALYST_PICKS} />
<KeyMarketIndicators indicators={MARKET_INDICATORS} />
<RecommendedForYou />  {/* user-state dependent — falls back to TopDownloads if no user session */}
<TopDownloads reports={TOP_DOWNLOADS} />
<TrendingTopics topics={TRENDING_TOPICS} />
<CustomResearchCTA />
<NewsletterSignup />
<Footer />
```

**Carousel vs grid decision:** `AnalystPicks` and `RecommendedForYou` use `HorizontalScroll` (card-sized, snap-scroll). `TrendingTopics` uses `ScrollFade` (pill overflow). Never swap these patterns. See COMPONENT_REFERENCE.md decision table.

---

## A11y gates

- WCAG AA contrast — editorial-light: `#000` on `#f5f2f1`, purple accent on warm-bg
- Keyboard nav fully traversable — `HorizontalScroll` must support arrow key navigation
- ARIA landmarks — `<main>`, `<nav>`, `<footer>`, `aria-label` on each content section
- `prefers-reduced-motion` respected — entrance animations disabled, drag interaction unchanged
- 44px touch targets — all cards, sector tiles, topic pills
- Focus rings visible on all interactive elements
- `HorizontalScroll` is not autoplay — no pause control required

## Perf gates

- LCP < 2.5s on 4G mobile — `ReportStoreHero` must not use unoptimized background image
- INP < 200ms — `HorizontalScroll` drag must not block main thread
- CLS < 0.1 — `FeaturedResearch` grid must have fixed aspect-ratio card slots
- Skeleton loading: use `SkeletonCard` for `FeaturedResearch` and `RecommendedForYou` during async load
- `EmptyState` for `RecommendedForYou` when no user session

## Visual baseline

- Desktop 1440×900 screenshot
- Tablet 768×1024 screenshot
- Mobile 390×844 screenshot
- Compare against baseline on regression
