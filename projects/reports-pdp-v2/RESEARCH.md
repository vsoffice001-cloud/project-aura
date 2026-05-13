# RESEARCH — reports-pdp-v2 rebuild

**Date:** 2026-05-12
**Author:** Aura (Opus)
**Recipe source:** [`design-system/recipes/report-detail.md`](../../design-system/recipes/report-detail.md)
**PRD source:** `Ken_Research_V1_Product_Page_Rebuild_PRD (OFFICIAL) (1).pdf` (54 sections, 19 pages, 6 May 2026)
**Master sample report:** Australia Cold Chain Market 2022–2027 (AUD 6,547.8 Mn → AUD 10,705 Mn @ 10.03% CAGR)
**Step:** 2 of 8 canonical page-build process

---

## Why — strategic rationale

1. **First rebuild attempt drifted.** Prior pass built 34 bespoke organisms before user review, with raw `<button>`, arbitrary `text-[var(--token)]` classes (silently no-op in Tailwind v4), arbitrary `max-w-[1200px]`, hardcoded hex `#0a0a0c` in FinalCTA. ~10000 LOC rework triggered. Root cause = bypassed canonical workflow + skipped PROPOSE+BLOCK gate.
2. **PRD §53 success bar:** "Should not feel like a CMS-generated report page. Should feel like a live preview of Ken Research's intelligence engine."
3. **Business stakes:** This template runs across 1M+ reports. Each percentage-point conversion lift compounds across Ken's full catalog.
4. **User direction 2026-05-12:** NO pricing surfaces anywhere. Conversion via content depth · information density · key impacts · knowledge proof — not transactional price reveal.

---

## What — page identity

5-page-type hybrid (PRD §6) executed simultaneously:

| Page-type role | How surfaced |
|---|---|
| Research report PDP | Product metadata · TOC · scope · author |
| Market intelligence landing | Answer blocks · ReportFactsBlock · SEO H1 patterns |
| Interactive data preview | ChartCard 8-zone wrapper · DatasetPreviewDrawer |
| Lead-generation | 4 LeadForm types · contextual CTA placement per PRD §45 |
| Controlled-access content | 5 access tiers w/ schema.org `isAccessibleForFree: false` |

**Page must be text-heavy by design.** Research depth = product. Not a brochure.

---

## When + Where

- **Trigger:** User lands on any `/<country>-<market>-market` URL (preserving v1 SEO equity via 301 redirects)
- **Device priority:** Mobile-first. ≥60% Ken Research org traffic = mobile.
- **Browser baseline:** Modern evergreen (Chrome/Safari/Firefox latest 2 versions)
- **Viewport tiers:**
  - Mobile 390 (single-column stack)
  - Tablet 768 (2-col where data permits)
  - Desktop 1280+ (12-col grid · hero 60/40 split)
- **Variant tier:** V2A Editorial Light A (DEFAULT per recipe). V2B/V2C deferred to future sprint.

---

## How — execution plan

### Mobile-first reading priority (per user direction 2026-05-12)

Above-the-fold mobile (390px viewport, no scroll):

1. Breadcrumb chip row
2. H1 (compressed scale on mobile · 2xl not 3xl-display)
3. 1-line product promise
4. 1 hero metric (largest stat · 2022 market size)
5. Primary CTA `Download Sample Report` visible
6. Secondary CTA `Talk to Analyst` visible

Below-fold scroll priority (mobile order):

1. Hero cockpit (tabs collapse to horizontal-scroll chips)
2. Key Stats Strip (3 stats visible at a time · horizontal scroll for rest)
3. Executive Summary (single column · takeaway cards stacked)
4. Sticky NavBar (anchors enabled · horizontal scroll chips)
5. Market Size Chart (full-width card · dataset preview opens drawer not hover)
6. Segment Intelligence (tab chips · single chart at a time)
7. Competitor Landscape (logo strip · single card per row)
8. Methodology (vertical stepper not horizontal flow)
9. TOC (collapsed accordion)
10. FAQ (collapsed accordion)
11. Final CTA

### Desktop layout (1280+)

- 12-col base grid
- Hero 60/40 split (left content / right cockpit)
- StickyNavBar = full-width below hero
- 2-col card grids inside SegmentIntelligence/IndustryAnalysis
- 3-4 col card grids inside GrowthDrivers/Trends/Tech
- Value chain = horizontal stepper
- Methodology = horizontal 6-step flow

### Conversion logic (NO PRICING · per 2026-05-12 user direction)

| Surface | Trigger | Form |
|---|---|---|
| Hero primary | `Download Sample Report` | Sample Download |
| Hero secondary | `Talk to Analyst` | Analyst Call |
| Stats Strip | `Unlock Full Dataset` | Dataset Unlock |
| Market Size | `Download Sample Report` | Sample Download |
| Segmentation | `Request Customization` | Customization |
| Competitor | `Talk to Analyst` | Analyst Call |
| Forecast | `Unlock Forecast Data` | Dataset Unlock |
| Methodology | `Download Sample Report` | Sample Download |
| TOC | `Preview Full TOC` | Sample Download |
| Final | `Get Report Access` | Sample Download (no purchase) |

**Removed:** "Buy Now" CTA · price display · cart/checkout UI. Backend `access_level: paid` still tracked for CMS gating; frontend renders "Request Access" only.

### Trust + intelligence depth (conversion driver in absence of price)

- Methodology module visible above-the-fold of scroll (not buried at bottom)
- Source notes on every chart card (PRD §15: "No long-text section without visual anchor + source note")
- Analyst portrait + name + last-updated in hero trust strip
- Sample report download = lead bait (not purchase friction)
- Public minimum protected (PRD §21): main market size · forecast size · CAGR · primary segment share · major players · scope · methodology summary ALWAYS visible — never gated

---

## References read

### Canonical recipe
- [`design-system/recipes/report-detail.md`](../../design-system/recipes/report-detail.md) — 34-row organism table · 3 LOCKS · 8-zone ChartCard · 5 access tiers · 4 LeadForms · 21 analytics events · 9 schema types

### Design-system foundations
- DS atoms (20 total · `core-v2/src/atoms/`): AnimatedArrow · Avatar · Badge · Button · CTALink · Card · Divider · DropdownChevron · HamburgerIcon · InlineLink · LogoButton · MenuItem · ScrollProgress · ScrollToTop · SectionHeading · SectionLabel · SectionWrapper · SkipLink · StatusDot · TextLink
- DS molecules (`core-v2/src/molecules/`): StatCard · navbar/
- DS organisms (`core-v2/src/organisms/`): navbar/ (TopNavigation canonical)
- DS charts (`core-v2/src/charts/`): highchartsTheme.ts · presets/
- DS patterns (`core-v2/src/patterns/`): CarouselFadeMask · DarkGradientMesh · NavbarGlassHover · SectionBg
- DS hooks (`core-v2/src/hooks/`): useAnimatedCounter · useAuthPopover · useDebounce · useFocusTrap · useKeyboardNavigation · useMobileMenu · useNavDropdown · useShimmer · useVariant

### Anti-patterns enforced (Categories 1-7, 11 per recipe)
- Cat 1: Tokens — never hardcode hex · never invent tokens · never `text-[15px]` arbitrary
- Cat 2: Color — Ken Red CTA-only · 92-5-3 hierarchy · no accent-teal in editorial-light
- Cat 3: Typography — `--text-3xl` hero-only · Serif display-only · Sans UI-only
- Cat 4: Spacing — `--space-*` tokens only · SectionWrapper handles padding · no double-padding · Container variants only
- Cat 5: Components — Button variant=brand for primary · NEVER raw `<button>` · NEVER `max-w-[1200px]` · ArrowUpRight only (via `showArrow` prop)
- Cat 7: Motion — Framer Motion only (GSAP + Lenis removed) · `useReducedMotion` mandatory
- Cat 11: Density (Cat 11 in ANTI_PATTERNS.md TBD per skim)

### Canonical consumer patterns
- V0_lite_report (`projects/V0_lite_report/src/components/sections/`): HeroSection · KeyStats · ReportHighlights · ChapterMethodology · CTASection · FAQSection · SlideshowSection — section bg-alternation rhythm reference
- V0.2_report + report-store: same DS atom usage pattern · `SectionWrapper background spacing` props · `<Container variant>` width constraints

### Voice
- [`design-system/voice/research.md`](../../design-system/voice/research.md) — research pillar voice: analyst-led · evidence-first · structured exposition

### Motion
- [`design-system/motion/MOTION_SPEC.md`](../../design-system/motion/MOTION_SPEC.md) — Framer-only · `whileInView` · `useScroll`/`useTransform` for parallax · `useReducedMotion` opt-out

---

## 3 LOCKS (extracted from recipe header)

### LOCK 1 · Variant
**editorial-light** (DEFAULT). NO cinematic-dark for this build. Reason: PRD §7 specifies "white/off-white background, large containers, card-based layout, muted borders, soft shadows" — editorial-light variant matches.

### LOCK 2 · Organism filenames (34 exact)
Per recipe master architecture table (rows 1–34). NEVER improvise names.

```
1.  Breadcrumb
2.  ReportPDPHero
3.  ReportIntelligenceSnapshot
4.  StickyNavBar
5.  KeyStatsStrip
6.  ExecutiveSummaryModule
7.  ReportScopeModule
8.  MarketOverviewModule
9.  MarketDefinitionsBlock
10. TaxonomyTree
11. EcosystemTierGrid
12. ChartCard                  (wrapper · 8-zone)
13. DatasetPreviewDrawer       (modal)
14. MarketSizeChart            (uses ChartCard)
15. InlineCTA1
16. SegmentIntelligenceModule
17. IndustryAnalysisModule     (parent wrapper)
18. SWOTQuadrant
19. GrowthDriversCardGrid
20. ValueChainStepper
21. ChallengesSolutionsTable
22. InlineCTA2
23. CompetitorLandscapeModule
24. CompetitorComparisonTable
25. RecentTrendsCardGrid
26. EmergingTechNodes
27. RegulatoryCardStack
28. FutureOutlookModule
29. MacroIndicatorPanel
30. MethodologyFlow
31. TableOfContentsModule
32. ReportFAQ
33. RelatedReportsModule
34. ReportFactsBlock
35. FinalCTABlock
36. StickyCTA                  (overlay)
37. ReadingProgressBar         (overlay)
```

Navbar = sourced from `topnav-v32` (workspace-canonical TopNavigation). Footer = NOT in DS scope per 2026-05-12 user decision (kenresearch.com owns site footer · use lightweight shim if needed).

### LOCK 3 · Background alternation
Per recipe row Background column. Strict warm-300 → white → warm-300 → white pattern. EXCEPTIONS: FinalCTABlock = black (row 33). Footer = N/A (shim).

| Section | Bg | | Section | Bg |
|---|---|---|---|---|
| Breadcrumb | white | | InlineCTA2 | white |
| Hero | warm-300 | | Competitor | warm-300 |
| Snapshot | white | | ComparisonTable | white (nested) |
| StickyNavBar | n/a sticky | | RecentTrends | white |
| KeyStats | warm-300 | | EmergingTech | warm-300 |
| ExecSummary | white | | Regulatory | white |
| ReportScope | warm-300 | | FutureOutlook | warm-300 |
| MarketOverview | white | | MacroIndicators | white |
| Definitions | warm-300 | | Methodology | warm-300 |
| Taxonomy | white | | TOC | white |
| Ecosystem | warm-300 | | FAQ | warm-300 |
| MarketSize | white | | RelatedReports | white |
| InlineCTA1 | warm-300 | | ReportFacts | warm-300 |
| Segment | white | | FinalCTA | **black** |
| IndustryAnalysis | warm-300 | | | |
| SWOT | white (nested) | | | |
| Drivers | warm-300 (nested) | | | |
| ValueChain | white (nested) | | | |
| Challenges | warm-300 (nested) | | | |

---

## DS atoms list (enforce in step 4 builder brief)

Builder MUST use these DS atoms exclusively. No re-implementation. No raw HTML primitives where DS atom exists.

| Need | DS atom (exact import) | Anti-pattern (NEVER) |
|---|---|---|
| Primary CTA | `Button variant="brand" size="md"` from `@design-system/core-v2` | raw `<button>` |
| Secondary CTA | `Button variant="secondary"` | raw `<button>` |
| Exploratory link | `CTALink href` | raw `<a>` for CTAs |
| Section wrapper | `SectionWrapper background spacing` | inline `px-* py-*` for section padding |
| Width constraint | `Container variant="page\|content\|narrow\|prose\|compact"` | `max-w-[1200px]` arbitrary |
| Card chrome | `Card variant padding` | bespoke `<div className="rounded-lg shadow-...">` |
| Section heading | `SectionHeading label title subtitle action` | bespoke `<h2 className="text-3xl ...">` |
| Eyebrow label | `SectionLabel` | raw `<span className="uppercase ...">` |
| Status indicator | `StatusDot` | bespoke colored dot |
| Avatar | `Avatar` | raw `<img>` for analyst portrait |
| Divider | `Divider` | raw `<hr>` |
| Inline link | `InlineLink` / `TextLink` | raw `<a>` in body copy |
| Stat tile | `StatCard` molecule | bespoke stat layout |
| Animated arrow | use `Button showArrow` prop | static `<ArrowUpRight />` icon |
| Type scale | registered `@theme` utilities (`text-2xl`, `text-xl`, etc.) | arbitrary `text-[var(--typography-size-X)]` (silent no-op in Tailwind v4) |
| Colors | `var(--color-*)` via inline style OR registered `@theme` utility | hardcoded hex `#0a0a0c` |
| Backgrounds | `<SectionWrapper background="warm-300\|white\|black">` | `bg-[var(--token)]` arbitrary (silent no-op) |
| Scroll reveal | Framer `useInView` + `motion.div` OR DS `FadeInSection` if present | bespoke IntersectionObserver |
| Reduced motion | Framer `useReducedMotion()` | none = a11y fail |

**ChartCard 8-zone wrapper:** Reused as standalone organism (recipe row 12). Wraps every chart. Zones in order: Header · Title · Insight · Controls · Viz · DatasetPreview · Source · Access+CTA.

**Charts engine:** `@ken-research/charts` (Highcharts wrapper · `core-v2/src/charts/highchartsTheme.ts` preset). Server-render fallback static image until hydration.

---

## Spacing tokens

- Section vertical: `<SectionWrapper spacing="sm|md|lg|xl">` ONLY
  - `sm` = inline CTA strips
  - `md` = stat strips · breadcrumb
  - `lg` = standard content sections (DEFAULT for content modules)
  - `xl` = hero · final CTA
- Card padding: `<Card padding="sm|md|lg">` ONLY
- Inter-element gap: `gap-N` Tailwind utilities (mapped to `var(--space-N)`)
- Container widths: `<Container variant="page">` for full-width content · `narrow` for prose · `compact` for chart cards

---

## Grid system

- `grid grid-cols-N` standard Tailwind (1-12)
- Mobile-first: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` for card grids
- NO bespoke `grid-template-columns: [arbitrary]`
- Hero split: `grid-cols-1 lg:grid-cols-[60%_40%]` (acceptable arbitrary — recipe-locked split)

---

## Anti-patterns cats applied (categories from `design-system/ANTI_PATTERNS.md`)

- **Cat 1.1** No hardcoded hex (FinalCTA `#0a0a0c` → `<SectionWrapper background="black">`)
- **Cat 1.5** No `text-[15px]` arbitrary
- **Cat 2.1** Ken Red CTA-only
- **Cat 3.5** No `text-2xl` Tailwind when token utility registered
- **Cat 4.2** No double-padding (SectionWrapper handles all section padding)
- **Cat 4.3** No `max-w-[1200px]` — use `Container variant`
- **Cat 4.5** No nested `SectionWrapper`
- **Cat 5.4-5** No raw `<button>` · ArrowUpRight only · `showArrow` prop
- **Cat 5.16** No bypass of Container for width

---

## Public minimum (PRD §21 · NEVER gate)

These MUST always render as visible HTML text (not images, not gated):

- Main market size · value · unit · year
- Forecast size · value · unit · year
- CAGR · pct · period
- Primary segment share
- Major players (name + logo)
- Report scope (8 buckets)
- Methodology summary (6 steps · public summary level)

---

## Open questions (none blocking · for builder context)

1. Charts library final: `@ken-research/charts@0.1.5` (Highcharts) OR Recharts fallback? → Per STATUS.md, Highcharts wrapper chosen. Confirmed.
2. Lead form submit endpoint: mock-only `console.log` in `forms/shared.tsx` for now? → Yes, real `/api/leads` Next Route Handler deferred to backend handover.
3. Navbar source: import from `topnav-v32` or use DS `core-v2/organisms/navbar`? → DS `core-v2/organisms/navbar` (canonical post-Sprint 2026-05-07).
4. Footer: shim w/ "Footer goes here · kenresearch.com owns" placeholder? → Yes, per 2026-05-12 user decision.

---

## Deliverable (Step 2 exit)

This RESEARCH.md = step 2 output. Step 3 PROPOSE next = formatted approach summary w/ 3 LOCKS + DS atoms list + spacing + grid + anti-pattern cats — BLOCKS on user approval before any builder spawn.
