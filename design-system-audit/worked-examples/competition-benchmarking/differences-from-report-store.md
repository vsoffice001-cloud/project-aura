# Differences from `report-store-legacy` — what was kept · what was customised

**Parent template:** `projects/report-store-legacy/` (Ken DS-26 migration target,
the canonical RS-v07 architecture documented in
`MIGRATION_LOG.md`).
**Fork target:** `projects/competition-benchmarking-listing-v01/` (+ frozen v02
snapshot, byte-identical src/).

This document maps the **specialisation fork** that took the report-store
listing pattern and adapted it to the Competition Benchmarking use case.

---

## At a glance — fork posture

```
report-store-legacy/                  competition-benchmarking-listing-v01/
├── 53 components in src/             ├── 68 components (+15 net)
├── useReportFilters.ts (canonical)   ├── useBenchmarkFilters.ts (235 LOC, +3 dimensions)
├── ReportCard.tsx (583 LOC)          ├── BenchmarkCard.tsx (242 LOC) + ListCard
├── IndustrySidebar.tsx (675 LOC)     ├── BenchmarkFilterSidebar.tsx (447 LOC)
├── ListingContextBanner.tsx (350)    ├── ListingContextBanner.tsx (513 LOC, expanded)
│                                     │   + BenchmarkActiveFilters.tsx (193 LOC, Zone-B split)
├── CustomResearchCTA.tsx (57 LOC)    ├── BenchmarkCustomResearchCTA.tsx (163 LOC, +3x scope)
├── ReportStoreHero.tsx               ├── BenchmarkHeroBanner.tsx (795 LOC, 4 variants)
├── (none)                            ├── BenchmarkStatsStrip.tsx (78 LOC, new)
├── (none)                            ├── BenchmarkMethodologyPreview.tsx (132 LOC, new)
├── (none)                            ├── BenchmarkTrendingTopics.tsx (64 LOC, new)
├── (none)                            ├── SubtleVariantSwitcher.tsx (dev-only)
├── (none)                            ├── ResourceCard.tsx (new — DS variant template)
└── (full multi-section home)         └── (listing-only, no home sections)
```

Direction of the fork: **trim non-listing scaffolding, expand listing
sophistication, expand hero treatment**.

---

## 1 — Kept verbatim (no changes vs report-store)

These atoms ported file-for-file. Confirmed by `ls` diff
(`diff <(ls report-store-legacy/src/app/components) <(ls
competition-benchmarking-listing-v01/src/app/components)`) and spot-checks of
imports inside the benchmark page.

### Layout primitives
- `Container.tsx` — 5-width semantic wrapper (page · content · narrow · prose · compact)
- `SectionWrapper.tsx` — bg + padding alternation primitive
- `FadeInSection.tsx` — entrance fade-in wrapper

### Chrome
- `Header.tsx` — global top nav
- `Footer.tsx` — global footer

### Atoms
- `Badge.tsx` · `Button.tsx` · `CTALink.tsx` · `Card.tsx` · `IconBadge.tsx` ·
  `InlineLink.tsx` · `Tooltip.tsx`
- `iconColors.ts` — content (#806ce0 purple) · utility (#737373 grey) constants
- `industryIconMap.ts` — industry → lucide-icon mapping

### Filter atoms / molecules
- `FilterCheckbox.tsx` · `FilterChip.tsx` · `FilterSearchInput.tsx` ·
  `FiltersPanel.tsx`
- `MobileFilterBar.tsx` · `MobileFilterSheet.tsx`
- `molecules/FilterAccordion`, `molecules/SidebarPanel`,
  `molecules/IndustryBadge`, `molecules/CardFooterRow`,
  `molecules/CardMetaRow`, `molecules/CardReveal`, `molecules/RevealImage`,
  `molecules/EmptyState`, `molecules/LoadMoreSentinel`, `molecules/BackToTop`,
  `molecules/ActiveFilterChip`

### Listing controls
- `ListingToolbar.tsx` (parent) — still in the benchmark folder unused (see §6).
- `ViewToggle.tsx` — grid/list mode toggle
- `CardListing.tsx` — list-mode card row

### Hooks
- `hooks/useProgressiveLoad.ts` — infinite-scroll IntersectionObserver
- `hooks/useCrossfade.ts` — opacity-dip on filter change
- `hooks/useMountTransition.ts` — mount-fade
- `hooks/useReportFilters.ts` — **still present** in benchmark folder despite
  being superseded by `useBenchmarkFilters.ts` (see anti-pattern §6)

### CSS / tokens
- `src/styles/theme.css` — DS-26 token system (warm palette · brand-red · serif
  scale · DM Sans body). Migrated verbatim from report-store, per
  `MIGRATION_LOG.md` Phase 0.

### Mock helper
- `src/app/components/figma/ImageWithFallback.tsx` — Figma Make import legacy.

**Count: ~36 components + 4 hooks + theme.css kept identical.**

---

## 2 — Renamed and specialised (same shape, benchmark-specific content)

### `IndustrySidebar.tsx` (675 LOC) → `BenchmarkFilterSidebar.tsx` (447 LOC)
- **Kept (file-comment self-attests, `BenchmarkFilterSidebar.tsx:5-15`):**
  SidebarPanel header/footer chrome · "Filters" tracking-[0.1em] uppercase label
  · count badge · "Clear all" with X icon · "X+ benchmarks available" footer ·
  search auto-opens matching sections · scrollable section maxHeight · "No
  matches found" empty state.
- **Specialised:**
  - 8 filter sections instead of RS's 6: adds **Report Type** (locked to
    Competition Benchmarking with 4 disabled placeholders for other future
    research-type filters, `BenchmarkFilterSidebar.tsx:69-75`), **Country**,
    **Competitor Set Size**, **Methodology**.
  - Drops RS's industry-tree drill-down sub-categories — competition
    benchmarking has flat industry list (the 14 Ken industries).
- **Why smaller:** flatter taxonomy + less subcategory drill-down = -228 LOC.

### `ReportCard.tsx` (583 LOC) → `BenchmarkCard.tsx` (242 LOC) + `BenchmarkListCard.tsx`
- **Kept (`BenchmarkCard.tsx:5-12` self-attests):** Layout shell · typography /
  colors · `Card`/`Badge`/`IndustryBadge` atoms · RS canonical 16:9 image aspect
  ratio (BenchmarkCard.tsx:97).
- **Specialised:**
  - Adds **variant rotation system** (BenchmarkCard.tsx:36-78) — 7 variant
    configs each omitting a different subset of elements (date · description ·
    region+comp · featured/latest tags). Slot 0 always "full-featured", slot 1+
    rotates 6. Produces **organic masonry rhythm** by varying card heights.
    **This is net-new vs RS** — RS used uniform `ReportCard` shape.
  - Pages info excluded (varies report-to-report; PDP only).
  - Click navigates to `/research/competition-benchmarking/${slug}` rather than
    `/reports/${slug}`.
- **Why net-smaller despite added rotation:** RS card had two big modes (grid +
  list) in one file; benchmark splits list mode into a separate file
  (`BenchmarkListCard.tsx`).

### `ListingContextBanner.tsx` (350 LOC RS) → 513 LOC + extracted `BenchmarkActiveFilters.tsx` (193 LOC)
- **Kept:** Breadcrumb · jump links · result count · "Clear all" surface.
- **Specialised:**
  - Zone-B (active-filter chips strip) extracted to own file
    `BenchmarkActiveFilters.tsx` (`BenchmarkActiveFilters.tsx:4-17` self-attests
    "mirrors RS-v07 ListingContextBanner Zone B verbatim").
  - Chips are now **color-coded per filter type** — 8 colors:
    `BenchmarkActiveFilters.tsx:30-39`. industry = brand-red tint, tag = emerald,
    region = blue, country = amber, size = purple, methodology = indigo, year =
    neutral, search = neutral. RS used uniform chip styling.
  - Each chip carries an explicit **TYPE pill + value + ✕** (RS only had value
    + ✕). User can scan filter dimension at a glance.

### `CustomResearchCTA.tsx` (57 LOC RS) → `BenchmarkCustomResearchCTA.tsx` (163 LOC, +3x)
- **Kept:** Black bg · eyebrow + h2 + dek + button pattern.
- **Specialised:**
  - Added 2-col layout with right-column "What you get" 3-item list
    (BenchmarkCustomResearchCTA.tsx:15-28). Explicit deliverable list — buyer
    knows what they're paying for. RS had no deliverable list.
  - Added second CTA "Talk to an analyst" alongside "Request custom benchmark".

### `useReportFilters.ts` (RS) → `useBenchmarkFilters.ts` (235 LOC)
- **Kept (`useBenchmarkFilters.ts:1-10`):** 300ms debounce on URL push · facet
  count derivation · toggle-on-array pattern · clear-all method · sort enum.
- **Specialised:**
  - **+3 filter dimensions:** `tag`, `country`, `methodology` (RS had industry ·
    region · year only).
  - **`?type=competition-benchmarking` always-set lock** (useBenchmarkFilters.ts:103) —
    URL always carries the report-type discriminator. Anticipates a future
    consolidated listing endpoint that filters across all research types.
  - **Featured-first override** (`useBenchmarkFilters.ts:139-144`): the featured
    report is always pulled to position 0 regardless of sort. RS sorted purely
    by user choice.
  - **`deriveCountry()` + `deriveTags()` heuristics** — mock-only string
    extractors over `title`. RS had `country`/`tag` directly on data shape. HANDOVER
    v02 L99 acknowledges: real API should provide these fields directly.

---

## 3 — Net-new organisms (no RS parent)

### `BenchmarkHeroBanner.tsx` (795 LOC, 4 variants)
RS used `ReportStoreHero.tsx` — single-treatment full-hero. Benchmark introduces
**4 hero variants in one file** (A: editorial split + ticker · B: image split ·
C: data-viz node graph SVG · D: slim 50vh w/ featured-carousel · DEFAULT).
Gated by `SubtleVariantSwitcher` only visible in DEV
(`import.meta.env.DEV`).
**Why:** designer wanted to ship D and leave A/B/C for tech-team preview.

### `BenchmarkStatsStrip.tsx` (78 LOC, new)
RS had stats inside the hero. Benchmark extracts to its own warm-400 strip
between context-banner (warm-300) and listing (white). Documented rationale
(`BenchmarkStatsStrip.tsx:9-15`): "Trust signals shouldn't live in hero".
**This is a replicable pattern.**

### `BenchmarkMethodologyPreview.tsx` (132 LOC, new)
Inline 3-step "How we benchmark" disclosure (Frame · Source · Synthesize). RS
had no in-listing methodology surface — link to a separate page instead.
Benchmark inlines it because the methodology is a **buyer-trust driver** for
this report type.

### `BenchmarkTrendingTopics.tsx` (64 LOC, new)
Tag pill row in the tail. RS had a `TrendingTopics.tsx` on the home page but
not in listing. Benchmark moves it into the listing tail.

### `SubtleVariantSwitcher.tsx` (new, dev-only)
Hero variant picker, gated by `import.meta.env.DEV`. RS had no equivalent
because RS shipped one hero treatment.

### `ResourceCard.tsx` (new, DS variant template)
General-purpose DS card with variant-rotation pattern. Its variant configs are
what `BenchmarkCard.tsx` consumes.

### `BenchmarkListingToolbar.tsx` (new)
Toolbar wrapping `ViewToggle` + sort dropdown + result count. RS used
`ListingToolbar.tsx` directly — benchmark wraps with a benchmark-specific
header so it can include active-chip-count + mobile filter trigger inline.

### `BenchmarkMobileFilterSheet.tsx` (new)
Mobile sheet specialised to the 8-filter benchmark taxonomy. RS used
`MobileFilterSheet.tsx` (still present, unused in benchmark page —
anti-pattern §6).

### `ActiveFilterStickyBar.tsx` (new)
Documented in v01 HANDOVER L82 ("Desktop sticky condensed filter chip row") —
sticky condensed strip that appears when the sidebar header scrolls out via
IntersectionObserver. RS had no equivalent.

---

## 4 — Section structure delta

**RS-v07 home/listing page:** Hero → FeaturedResearch → IndustrySectorsGrid →
IndustryReportSection → RecommendedForYou → AnalystPicks → TrendingStatistics
→ DailyDataHighlights → QuickAccess → TrendingTopics → ExploreByRegion →
Testimonials → UpcomingReports → CustomResearchCTA → Footer. (~15 sections.)

**Benchmark v01/v02:** Hero → ContextBanner → StatsStrip → 2-col body
(sidebar + grid) → TrendingTopics → MethodologyPreview → CustomResearchCTA →
Footer. (8 sections, App.tsx:5-14.)

The benchmark page is **listing-first, not homepage-first**. RS home had ~12
content-discovery sections layered before the user got to a filtered grid.
Benchmark gets the user to the grid by Section 5 (and the grid IS the page).
This is the right call for a faceted listing — sections 1–4 are framing, 6–8
are tail. Buyer-focused.

---

## 5 — Mock data delta

| Aspect | RS | Benchmark |
|---|---|---|
| Shape interface | `Report` (industry · region · date · pages · downloads · projection · formats · badge · image) | `BenchmarkReport` (industry · region · country · tags · `competitorSetSize` enum · publishedDate · pages · methodology[] · thumbnailUrl · description · slug · isFeatured · reportType) |
| Seed count | mixed home + listing fixtures | 24 benchmark entries |
| Locked discriminator | none | `reportType: 'competition-benchmarking'` on every entry |
| Methodology | absent | 4 enum values (mystery-shopping / expert-interview / public-data / hybrid) |
| Catalogs | INDUSTRIES + REGIONS | INDUSTRIES (14) + REGIONS (6) + COUNTRIES_BY_REGION + COUNTRIES (23) + TAGS (10) + COMPETITOR_SET_SIZES (3) + METHODOLOGY_LABELS (4) + SORT_OPTIONS (5) |

Benchmark mock data is **richer + more explicit about taxonomy**. Real API
target: `GET /api/benchmarks?industry=…&tag=…&region=…&country=…&size=…&method=…&year=…&sort=…&q=…`
(useBenchmarkFilters.ts:97-118 builds this URL contract verbatim).

---

## 6 — Dead-code carry-over (the cost of fork-by-copy)

Files ported from RS that are **not used** on the benchmark page but still
present:
- `useReportFilters.ts` — superseded by `useBenchmarkFilters.ts` but file
  remains.
- `MobileFilterSheet.tsx` — superseded by `BenchmarkMobileFilterSheet.tsx` but
  remains.
- `ListingToolbar.tsx` — superseded by `BenchmarkListingToolbar.tsx`.
- `Globe.tsx`, `RecommendedForYou.tsx`, `AnalystPicks.tsx`, `TrendingStatistics.tsx`,
  `DailyDataHighlights.tsx`, `QuickAccess.tsx`, `ExploreByRegion.tsx`,
  `TrendingTopics.tsx`, `UpcomingReports.tsx`, `Testimonials.tsx`,
  `IndustrySectorsGrid.tsx`, `IndustryReportSection.tsx`,
  `FeaturedResearch.tsx`, `ReportStoreHero.tsx`, `ReportStorePage.tsx`,
  `ReportCard.tsx`, `IndustrySidebar.tsx`, `CardListing.tsx`, `BenchmarkTestimonials.tsx.unused`.

All inherited from the RS-v07 import. Tree-shake to zero in prod build (v02
HANDOVER L127 verifies), so no perf cost — but they're a **lint signal** and a
**discoverability anti-pattern**: a fresh contributor browsing the components
folder can't tell what is and isn't on this page without reading App.tsx first.

**Recommendation:** at v03, prune. See `pattern-lessons.md`.

---

## Sources cited
- `projects/report-store-legacy/src/app/App.tsx:1-35` (RS section order)
- `projects/report-store-legacy/src/app/components/IndustrySidebar.tsx` (675 LOC)
- `projects/report-store-legacy/src/app/components/ReportCard.tsx` (583 LOC)
- `projects/report-store-legacy/src/app/components/ListingContextBanner.tsx` (350 LOC)
- `projects/report-store-legacy/src/app/components/CustomResearchCTA.tsx` (57 LOC)
- `projects/competition-benchmarking-listing-v01/src/app/App.tsx:5-14`
- `projects/competition-benchmarking-listing-v01/src/app/components/BenchmarkFilterSidebar.tsx:5-17,69-75`
- `projects/competition-benchmarking-listing-v01/src/app/components/BenchmarkCard.tsx:5-22,36-78`
- `projects/competition-benchmarking-listing-v01/src/app/components/BenchmarkActiveFilters.tsx:4-17,30-39`
- `projects/competition-benchmarking-listing-v01/src/app/components/BenchmarkCustomResearchCTA.tsx:15-28`
- `projects/competition-benchmarking-listing-v01/src/app/components/BenchmarkHeroBanner.tsx:42-47,431-440`
- `projects/competition-benchmarking-listing-v01/src/app/components/BenchmarkStatsStrip.tsx:9-15`
- `projects/competition-benchmarking-listing-v01/src/app/components/hooks/useBenchmarkFilters.ts:97-118,139-144`
- `projects/competition-benchmarking-listing-v01/src/lib/mock-data.ts:9-27`
- `projects/competition-benchmarking-listing-v01/MIGRATION_LOG.md` (full Phase 0–4 trace)
- `projects/competition-benchmarking-listing-v02/HANDOVER.md:99,127`

**Word count:** ~1,470.
