# Recipe — Sector Landing

**Pillar:** research  
**Variant:** editorial-light  
**Voice:** [voice/research.md](../voice/research.md)  
**Motion:** [motion/MOTION_SPEC.md](../motion/MOTION_SPEC.md)  
**Anti-patterns:** Categories 1, 2, 3, 5, 7, 11 from [ANTI_PATTERNS.md](../ANTI_PATTERNS.md)

---

## Intent

Serve as the canonical landing page for a single industry or sector within the Report Store (e.g., "Healthcare", "FMCG", "Automotive"). Reader arrives from a sector tile, navigation menu, or SEO. They want a sector-specific overview: what coverage Ken Research provides, key market indicators, and top publications. Page serves orientation and then drives to individual reports.

---

## When to use this recipe

- Industry / sector category page (one page per sector)
- SEO landing page for a market vertical
- Destination from `IndustrySectorsGrid` tile click on Report Store home

## When NOT to use

- Full report catalog browse with filters (use `report-store-listing.md`)
- Single report detail page (use `report-detail.md`)
- Report Store homepage with cross-sector editorial (use `report-store-home.md`)

---

## Section sequence

| # | Organism | Purpose | Background | Spacing | Motion |
|---|---|---|---|---|---|
| 1 | `Navbar` | Top navigation | white | — | CSS transition on scroll |
| 2 | `IndustryFocusBanner` | Sector identity banner — sector name, icon, short descriptor, report count | black | xl | GSAP timeline fade-up h1 + descriptor + count — `--duration-slow` `--ease-out-expo` |
| 3 | `IndustrySpotlight` | Editorial spotlight feature — latest or flagship publication for this sector | white | lg | Framer `whileInView` fade-up `--duration-medium` |
| 4 | `FeaturedResearch` | Featured reports filtered to this sector (4-6 items) | warm-300 | lg | `CardReveal` stagger 80ms `--ease-spring` |
| 5 | `KeyMarketIndicators` | Sector-specific key indicators (CAGR, market size, forecast horizon) | white | lg | Framer `whileInView` stagger 60ms per indicator |
| 6 | `UpcomingReports` | Pre-publication / upcoming reports filtered to this sector | warm-300 | lg | Framer `whileInView` stagger 60ms |
| 7 | `CustomResearchCTA` | "Need custom research in this sector?" CTA | black | xl | Framer `whileInView` fade-up `--duration-medium` |
| 8 | `Footer` | Site footer | black | — | static |

**Background alternation:** black → white → warm-300 → white → warm-300 → black → black.

---

## Voice highlights

- Page h1 (banner): 3-6 words, sector descriptor. Example: *"India Healthcare Reports."* / *"FMCG Sector Intelligence."* — descriptive label, not a slogan.
- Report counts: Exact numeral. Example: *"47 reports covering India Healthcare."* — never *"dozens of reports"*.
- Indicator format: *"CAGR 11.2% (2024–2030) · India Healthcare Market"* — structured, no narrative prose.
- `UpcomingReports` labels: Quarter + year. *"Expected Q3 2026"* — never *"coming soon"*.
- Never use: vague time references ("recently", "soon"), "comprehensive", "actionable insights".

---

## Motion highlights

- Banner entrance: GSAP timeline, `--duration-slow` (800ms), `--ease-out-expo`. Page-load only.
- Featured grid: `CardReveal` stagger 80ms. Do not nest inside `FadeInSection`.
- Key indicators: Framer `whileInView` stagger 60ms per indicator. `--ease-out`.
- Spotlight and upcoming: Framer `whileInView` fade-up, `--duration-medium` (500ms).
- Reduced-motion contract: All animations disabled under `prefers-reduced-motion: reduce`. Final state shown immediately.

---

## Mock data shape

```ts
// TODO: replace w/ real API — GET /api/sectors/:slug
export const SECTOR_META: {
  id: string;
  label: string;
  slug: string;
  icon: string;
  descriptor: string;
  reportCount: number;
  coverageSince: string;
} = {
  id: "healthcare",
  label: "Healthcare",
  slug: "healthcare",
  icon: "health",
  descriptor:
    "Pharmaceutical, medical devices, diagnostics, and hospital infrastructure coverage across India and GCC.",
  reportCount: 47,
  coverageSince: "2018",
};

export const SECTOR_SPOTLIGHT: {
  title: string;
  description: string;
  pages: number;
  publishedDate: string;
  slug: string;
  thumbnailUrl?: string;
} = {
  title: "India Pharmaceutical Market Outlook 2026",
  description:
    "Sector breakdown, CAGR projection, and 15-segment outlook across branded and generic segments.",
  pages: 180,
  publishedDate: "Q1 2026",
  slug: "india-pharma-outlook-2026",
};

export const SECTOR_REPORTS: {
  id: string;
  title: string;
  industry: string;
  pages: number;
  publishedDate: string;
  region: string;
  slug: string;
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

export const SECTOR_INDICATORS: {
  id: string;
  label: string;
  value: string;
  cagr?: string;
  period?: string;
}[] = [
  { id: "i001", label: "India Healthcare Market", value: "USD 638B", cagr: "11.2%", period: "2024–2030" },
  { id: "i002", label: "India Pharma Segment", value: "USD 57B", cagr: "9.4%", period: "2024–2029" },
];

export const SECTOR_UPCOMING: {
  id: string;
  title: string;
  expectedDate: string;
  region: string;
}[] = [
  { id: "u001", title: "India Medical Devices Market Report 2026", expectedDate: "Q3 2026", region: "India" },
];
```

---

## Component composition (skeleton)

```tsx
<Navbar />
<IndustryFocusBanner sector={SECTOR_META} />
<IndustrySpotlight report={SECTOR_SPOTLIGHT} />
<FeaturedResearch reports={SECTOR_REPORTS} label={`Featured ${SECTOR_META.label} Research`} />
<KeyMarketIndicators indicators={SECTOR_INDICATORS} />
<UpcomingReports reports={SECTOR_UPCOMING} />
<CustomResearchCTA sector={SECTOR_META.label} />
<Footer />
```

**`FeaturedResearch` label override:** Pass a sector-specific label to `SectionHeading`. Default label is *"Featured Research"* — override with *"Featured Healthcare Research"* or equivalent. Verify prop API supports this.

---

## A11y gates

- WCAG AA contrast — white text on black banner, `#000` on warm-300 for card text
- Keyboard nav fully traversable
- ARIA landmarks — `<main>`, `<nav>`, `<footer>`, `aria-label` for sector content section
- `prefers-reduced-motion` respected
- 44px touch targets — all report cards, upcoming report items
- Focus rings visible on all interactive elements

## Perf gates

- LCP < 2.5s on 4G mobile — `IndustryFocusBanner` background must use `next/image` if it has a background image
- INP < 200ms
- CLS < 0.1 — `FeaturedResearch` grid must reserve card dimensions before data loads
- `SkeletonCard` for `FeaturedResearch` during async load

## Visual baseline

- Desktop 1440×900 screenshot
- Tablet 768×1024 screenshot
- Mobile 390×844 screenshot
- Compare against baseline on regression
