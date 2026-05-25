# v1-product-page · Ken Research Report PDP recipe

**Status:** AUTHORITATIVE
**Last updated:** 2026-05-19
**Stack:** Next.js 15 + React 19 + Tailwind v4 + Framer Motion · core-v2 DS
**Batch:** 3.3e · aura-builder · Sonnet

---

## Overview

V1 Product Page is Ken Research's premium report Product Detail Page (PDP).
It is the canonical long-form report consumer surface — 30 sections covering
every dimension of a market report: scope · taxonomy · market overview ·
segmentation · competitive landscape · methodology · FAQ · related reports.

**Master example:** Australia Cold Chain Logistics Market Report 2024.

---

## Page chrome (every page)

| Element | Component | Config |
|---|---|---|
| Navbar | `Navbar` organism | sticky top · z-1000 · glass header |
| Skip link | `SkipLink` | targetId="main" |
| TOC sidebar | `TableOfContentsSidebar` | sticky 88px top · lg+ only · sections prop |
| Reading progress | `ReadingProgressBar` | (optional · fixed top) |
| Page shell | `PDPLayoutTemplate` | wraps all of the above + Footer |

---

## Section order (30 sections)

| # | Section | Background | Template | DS Organism inside |
|---|---|---|---|---|
| 1 | **Report Hero** | cinematic-dark (mesh) | `HeroCinematicTemplate` | `ReportHeroSection` |
| 2 | **Key Stats Strip** | warm (#f5f2f1) | `ChapterSectionTemplate` (no header) | `KeyStatsStrip` |
| 3 | **Executive Summary** | white | `ChapterSectionTemplate` | BodyText + inline quotes |
| 4 | **Report Scope** | warm | `ChapterSectionTemplate` | `ScopeOfReport` |
| 5 | **Taxonomy** | white | `ChapterSectionTemplate` | `TaxonomyTree` |
| 6 | **Country & Infra** | warm | `ChapterSectionTemplate` | `KeyStatsStrip` inside |
| 7 | **Definitions** | white | `AccordionListTemplate` showContactCTA=false | AccordionItem list |
| 8 | **Market Overview** | warm | `ChapterSectionTemplate` | `MarketOverview` |
| 9 | **Genesis Timeline** | white | `ChapterSectionTemplate` | TimelineCard grid |
| 10 | **Seasonality Calendar** | warm | `ChapterSectionTemplate` | Custom calendar grid |
| 11 | **Market Size & Forecast** | white | `DataChartTemplate` | `MarketAnalysis` + `DatasetPreviewTable` |
| 12 | **Sub-market Intelligence** | warm | `ChapterSectionTemplate` | `MarketAnalysis` sub |
| 13 | **Segment Intelligence** | white | `MultiCardGridTemplate` | `SegmentationSection` (7 cards · 2/3/2) |
| 14 | **Regional Comparison** | warm | `ChapterSectionTemplate` | `RegionalComparison` (MapChart + Table + TabStrip) |
| 15 | **Ecosystem / Growth Drivers** | white | `ChapterSectionTemplate` | `GrowthDriversChallenges` |
| 16 | **Industry Profile** | warm | `ChapterSectionTemplate` | IconCard 3-col grid |
| 17 | **End User Profile** | white | `ChapterSectionTemplate` | `TargetAudience` (StakeholderCard grid) |
| 18 | **DS Gap (Supply-Demand)** | warm | `DataChartTemplate` | Single ChartCard (chart slot only) |
| 19 | **Competitive Landscape** | white | `ChapterSectionTemplate` | `CompetitiveLandscape` |
| 20 | **Macro Indicators** | warm | `DataChartTemplate` | `MarketDataTable` |
| 21 | **Regulatory Framework** | white | `ChapterSectionTemplate` | TextCard list |
| 22 | **Future Outlook** | warm | `ChapterSectionTemplate` | BodyText + StatCardGroup |
| 23 | **Opportunities** | white | `ChapterSectionTemplate` | `GrowthDriversChallenges` (opportunities variant) |
| 24 | **Research Methodology** | warm | `StepperPlusGridTemplate` | `ResearchMethodology` + MethodologyCard grid |
| 25 | **TOC Reference** | white | `AccordionListTemplate` showContactCTA=false | Expandable chapter list |
| 26 | **FAQ** | warm | `AccordionListTemplate` showContactCTA=true includeFaqJsonLd=true | `FAQSection` |
| 27 | **Sample Report Preview** | white | `ChapterSectionTemplate` | `SampleReportPreview` |
| 28 | **Related Reports** | warm | `ChapterSectionTemplate` (no header block needed) | `RelatedReports` |
| 29 | **Association Strip** | white | (standalone — no template wrapper) | `AssociationStrip` (TrustBar) |
| 30 | **Final CTA** | cinematic-dark OR white | (FinalCTASection standalone) | `FinalCTASection` singleCTA=true showOrbs=true |
| — | **Footer** | dark (#0a0a0c) | (Footer standalone) | `Footer` |

---

## Bg alternation

```
white → warm → white → warm → ... (editorial alternation per CANON §3.5)
```

- Cinematic-dark only on: Section 1 (Hero) + Section 30 (FinalCTA optional)
- Footer: always dark bg-black
- **Do NOT break alternation.** If adding/removing sections, re-check the odd/even sequence.

Canonical sequence:
```
1. cinematic (Hero)
2. warm
3. white
4. warm
5. white
6. warm
7. white
8. warm
9. white
10. warm
11. white
12. warm
13. white
14. warm
15. white
16. warm
17. white
18. warm
19. white
20. warm
21. white
22. warm
23. white
24. warm
25. white
26. warm
27. white
28. warm
29. white (AssociationStrip)
30. cinematic OR white (FinalCTA)
Footer: dark
```

---

## Spacing

| Token | Value | Where |
|---|---|---|
| `--section-py-lg` | `py-12 md:py-20` (48/80px) | All chapter sections (default) |
| `--section-py-xl` | `py-16 md:py-24` (64/96px) | Hero (cinematic) + FinalCTA only |
| `--section-header-mb` | `mb-10 md:mb-12` (40/48px) | Header block bottom margin |
| `--container-page` | 1200px | Page chrome · Navbar · Footer · Hero |
| `--container-content` | 1000px | Section content default |
| `--card-grid-gap` | `gap-6` | Default card grid gap |
| `--sticky-toc-top` | `calc(64px + 24px) = 88px` | TOC sidebar sticky offset |
| `--scroll-margin-section` | 72px | Section anchor scroll-margin-top |

---

## Z-ladder

| Layer | Token | Value | Element |
|---|---|---|---|
| Navbar | `--z-navbar` | 1000 | Sticky top navbar |
| Sticky TOC | `--z-sticky` | 100 | TOC sidebar |
| Mobile floating | `--z-floating` | 1500 | MobileFilterBar / FloatingCTA |
| Modal backdrop | `--z-modal-backdrop` | 9990 | Overlay backdrop |
| Modal | `--z-modal` | 9999 | MindMapModal / dialogs |
| Tooltip | `--z-tooltip` | 10000 | Tooltips |

---

## A11y requirements

- `SkipLink` → `<main id="main">` (PDPLayoutTemplate handles this)
- ARIA landmark roles: `banner` (Navbar wrapper) · `main` · `navigation` (TOC) · `contentinfo` (Footer)
- Section anchors: every `ChapterSectionTemplate` receives `id` + `scroll-margin-top: 72px`
- TOC sidebar: `TableOfContentsSidebar` → `aria-label="Table of contents"` + `role="navigation"`
- Accordion items: `aria-expanded` + `aria-controls` per AccordionItem
- AccordionListTemplate section 26: `includeFaqJsonLd=true` for FAQPage schema

---

## Template usage map

| Template | Used in section(s) |
|---|---|
| `PDPLayoutTemplate` | Wraps entire page |
| `HeroCinematicTemplate` | 1 (ReportHeroSection inside) |
| `ChapterSectionTemplate` | 2–17 · 19 · 21–23 · 25 · 27–28 |
| `DataChartTemplate` | 11 · 18 · 20 |
| `MultiCardGridTemplate` | 13 |
| `AccordionListTemplate` | 7 · 25 · 26 |
| `StepperPlusGridTemplate` | 24 |
| `HeroEditorialTemplate` | NOT used on PDP (used in case-study + listing recipes) |
| `ListingPageTemplate` | NOT used on PDP (used on report-store-listing recipe) |

---

## Source provenance

| Feature | Source |
|---|---|
| Hero cinematic | V0_lite + V0.2 hybrid |
| Chapter sections | V0.2 ChapterSectionTemplate composition |
| Data viz | @ken-research/charts + MapChart (react-simple-maps) |
| Listing patterns | report-store-legacy |
| Tokens canonical | `core-v2/styles/base.css` (foundation lock 2026-05-15) |
| Recipes | `design-system/recipes/v1-product-page.md` (this file) |

---

## Mock data

All mock data for V1 Product Page: `projects/_briefs/v1-product-page/` + `src/lib/mock-data.ts`.

Use `// TODO: replace w/ real API call — GET /api/reports/{slug}` markers on every mock import.

---

## Consumer project

**Active consumer:** V1 Product Page (`projects/v1-product-page/` — pending creation).
Deferred: v0.3 swap referenced in Batch 3.3e brief.

---

**END · v1-product-page.md**
