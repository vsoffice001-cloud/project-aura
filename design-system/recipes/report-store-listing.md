# Recipe — Report Store Listing

**Pillar:** research  
**Variant:** editorial-light  
**Voice:** [voice/research.md](../voice/research.md)  
**Motion:** [motion/MOTION_SPEC.md](../motion/MOTION_SPEC.md)  
**Anti-patterns:** Categories 1, 2, 5, 7, 11 from [ANTI_PATTERNS.md](../ANTI_PATTERNS.md)

**Source-of-truth files** (verbatim mirror these — do NOT recreate):
- Sidebar: `projects/report-store-v07/src/app/components/IndustrySidebar.tsx` (NOT `FiltersPanel.tsx` — legacy)
- Card: `projects/report-store-v07/src/app/components/ReportCard.tsx` (4 variants in one file: grid · list · compact · featured)
- Active-filter chips: `projects/report-store-v07/src/app/components/ListingContextBanner.tsx` Zone B pattern
- Toolbar: `projects/report-store-v07/src/app/components/ListingToolbar.tsx`
- Card listing wrapper: `projects/report-store-v07/src/app/components/CardListing.tsx`
- Mobile filter sheet: derive from `IndustrySidebar` w/ `MobileFilterSheet` molecule wrapper
- Catalogs (industries · regions · countries · trending tags): `projects/report-store-v07/src/app/components/data.ts` exports `industries`, `geographyData`, `trendingTopics`

---

## Intent

Provide a filterable, searchable listing of all available research reports. Reader is a research buyer with a specific sector, region, or topic in mind. Page must reduce friction between intent and result — clear filters, fast response, scannable cards, easy toggle between grid and list views.

---

## When to use this recipe

- The primary listing/browse page for the Report Store
- Industry-filtered listing views (pre-filtered by sector from `sector-landing.md` CTA)
- Search-results listing view (when results populate from `ReportStoreHero` search)

## When NOT to use

- Report Store homepage with featured + curated editorial sections (use `report-store-home.md`)
- Single sector landing with spotlight content (use `sector-landing.md`)
- Single report detail page (use `report-detail.md`)

---

## Section sequence

| # | Organism | Purpose | Background | Spacing | Motion |
|---|---|---|---|---|---|
| 1 | `Navbar` | Top navigation | white | — | CSS transition on scroll |
| 2 | `ReportStoreHero` (compact mode) | Search bar only — no featured editorial content | black | md | GSAP fade-up h1 + search bar `--duration-medium` |
| 3 | `ListingToolbar` | Active filter chips, sort dropdown, result count, `ViewToggle` | white | sm | static |
| 4 | `SidebarPanel` wrapping `FiltersPanel` | Left-rail filter sidebar | white | — | CSS expand/collapse on filter accordion open |
| 5 | `CardListing` with `ReportCard` grid | Main listings area — `layout="grid"` default, `layout="list"` on toggle | white | lg | `CardReveal` stagger 80ms on initial load and filter change |
| 6 | `LoadMoreSentinel` | Intersection observer trigger for infinite scroll / load more | white | sm | static |
| 7 | `Footer` | Site footer | black | — | static |

**Layout structure:** Two-column on tablet+. `SidebarPanel` (left, ~280px) + `CardListing` (right, flex-1). Single column on mobile — filters in `MobileFilterSheet` (bottom sheet).

---

## Voice highlights

- Toolbar labels: Sentence case. *"Sort: Newest first"* / *"Industry"* / *"Published Year"* / *"Page Count"*.
- Filter section headers: Sentence case, descriptive. *"Industry"* / *"Region"* / *"Published year"* / *"Page count"*.
- Result count: Numeral. *"124 reports"* / *"No reports found."* — never "0 results found" (use `EmptyState` with action).
- `EmptyState` copy: Specific suggestion. *"No reports match these filters. Try removing the region filter or changing the date range."*
- Never abbreviate report titles on `ReportCard`. Full publication name always.

---

## Motion highlights

- Hero compact: GSAP fade-up, `--duration-medium` (500ms), `--ease-out-expo`.
- Card grid entrance: `CardReveal` stagger 80ms per card on initial load. Re-trigger on filter change (re-mount cards).
- Filter sidebar accordion: CSS expand/collapse, `--duration-base` (300ms). No GSAP or Framer for filter accordion — CSS is sufficient.
- `MobileFilterSheet`: Framer `AnimatePresence` slide-up from bottom, `--duration-medium`, `--ease-out`.
- Reduced-motion contract: `CardReveal` disabled under `prefers-reduced-motion`. Cards shown immediately at final state.

---

## Mock data shape

```ts
// TODO: replace w/ real API — GET /api/reports?page=1&filters=...
export const FILTERS: {
  industries: { id: string; label: string; count: number }[];
  regions: { id: string; label: string; count: number }[];
  publishedYears: { id: string; label: string; count: number }[];
  pageCountRanges: { id: string; label: string; min: number; max: number }[];
} = {
  industries: [
    { id: "healthcare", label: "Healthcare", count: 47 },
    { id: "fmcg", label: "FMCG", count: 63 },
    { id: "auto", label: "Automotive", count: 34 },
  ],
  regions: [
    { id: "india", label: "India", count: 102 },
    { id: "gcc", label: "GCC", count: 58 },
  ],
  publishedYears: [
    { id: "2026", label: "2026", count: 45 },
    { id: "2025", label: "2025", count: 79 },
  ],
  pageCountRanges: [
    { id: "under100", label: "Under 100 pages", min: 0, max: 99 },
    { id: "100to200", label: "100–200 pages", min: 100, max: 200 },
  ],
};

export const REPORTS_PAGE_1: {
  id: string;
  title: string;
  industry: string;
  pages: number;
  publishedDate: string;
  region: string;
  slug: string;
  thumbnailUrl?: string;
  description: string;
}[] = [
  {
    id: "r001",
    title: "India Pharmaceutical Market Outlook 2026",
    industry: "Healthcare",
    pages: 180,
    publishedDate: "Q1 2026",
    region: "India",
    slug: "india-pharma-outlook-2026",
    description: "Sector breakdown, CAGR projection, and 15-segment outlook across branded and generic segments.",
  },
];
```

---

## Component composition (skeleton)

```tsx
<Navbar />
<ReportStoreHero mode="compact" />
<SectionWrapper background="white" spacing="sm">
  <Container variant="page">
    <ListingToolbar
      resultCount={REPORTS_PAGE_1.length}
      activeFilters={activeFilters}
      onFilterRemove={handleFilterRemove}
      sortValue={sortValue}
      onSortChange={handleSortChange}
      viewMode={viewMode}
      onViewModeChange={setViewMode}
    />
  </Container>
</SectionWrapper>
<SectionWrapper background="white" spacing="lg">
  <Container variant="page">
    <div className="flex gap-8">
      {/* Desktop sidebar */}
      <SidebarPanel>
        <FiltersPanel filters={FILTERS} onFilterChange={handleFilterChange} />
      </SidebarPanel>
      {/* Main listing area */}
      <div className="flex-1">
        {isLoading ? (
          <div className="grid grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} layout={viewMode} />)}
          </div>
        ) : reports.length === 0 ? (
          <EmptyState onClearFilters={handleClearFilters} />
        ) : (
          <CardReveal staggerDelay={80}>
            {reports.map((r) => (
              <ReportCard key={r.id} {...r} layout={viewMode} />
            ))}
          </CardReveal>
        )}
        <LoadMoreSentinel onVisible={handleLoadMore} />
      </div>
    </div>
    {/* Mobile filter trigger */}
    <MobileFilterSheet filters={FILTERS} onFilterChange={handleFilterChange} />
  </Container>
</SectionWrapper>
<Footer />
```

**ViewToggle** is rendered inside `ListingToolbar`. `viewMode` state drives `ReportCard layout` prop. Never use deprecated `ReportGridCard`.

---

## A11y gates

- WCAG AA contrast — filter labels, card text, badge text all on editorial-light surface
- Keyboard nav fully traversable — `FiltersPanel` checkboxes, `ViewToggle`, sort dropdown all keyboard-operable
- ARIA landmarks — `<main>`, `<nav>`, `<aside>` for filter sidebar, `role="status"` on result count
- `prefers-reduced-motion` respected — `CardReveal` and `MobileFilterSheet` animations disabled
- 44px touch targets — filter checkboxes, `ViewToggle` buttons, card click areas
- Focus rings on all interactive elements
- `EmptyState` must include a keyboard-accessible action ("Clear filters" button)

## Perf gates

- LCP < 2.5s on 4G mobile — first 6 `ReportCard` items must be server-rendered or statically available
- INP < 200ms — filter checkbox state changes must not re-render entire listing synchronously
- CLS < 0.1 — `SkeletonCard` dimensions must match `ReportCard` dimensions exactly
- `LoadMoreSentinel` intersection observer: use `rootMargin: "200px"` for pre-fetch
- Max 12 cards per page before load-more triggers

## Visual baseline

- Desktop 1440×900 screenshot
- Tablet 768×1024 screenshot
- Mobile 390×844 screenshot — verify `MobileFilterSheet` covers bottom 80% with handle affordance
- Compare against baseline on regression
