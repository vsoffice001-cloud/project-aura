# v01 — Anatomy · Section-by-section WWWWH

**Source:** `projects/competition-benchmarking-listing-v01/src/app/App.tsx`
**Page-section contract:** `App.tsx:5-14` (header comment names 8 sections in render order)

Since v02 is byte-identical to v01, this anatomy applies to both. (v02 deltas
covered in `v02-anatomy.md`.)

WWWWH framing per region: **What** (the section) · **Why** (it exists) · **Where**
(in the page + file path) · **When** (render-time conditions) · **How** (the
implementation primitives).

---

## Section 1 — Header (top nav)

- **What:** Site-wide top nav, white surface with Ken logo + primary nav + search +
  CTA. Reused unchanged from `report-store-legacy`.
- **Why:** Global identity + navigation continuity across all Ken surfaces. Not a
  page-specific concern; lives in the DS layer.
- **Where:** Rendered at `App.tsx:99`. Source `src/app/components/Header.tsx`.
- **When:** Always — every render of every route in this SPA.
- **How:** Plain composed atoms (`Container`, `Button`, `IconBadge`, `iconColors`).
  No motion. No scroll behaviour. No condensed/sticky variant on this page.

---

## Section 2 — `BenchmarkHeroBanner` (black hero)

- **What:** Black-surface hero with **4 variants A/B/C/D** all carrying the same
  H1 + dek + 2 CTAs, but differing in right-column treatment.
  - **D (default · `App.tsx:102`):** slim 50vh cap, left text + right
    `FeaturedReportCarousel` (auto-rotates 4 featured reports every 6s, pause on
    hover, dot indicators with role="tablist"). `BenchmarkHeroBanner.tsx:431-440`
    documents the WHY: "Listing page hero should be informational, not theatrical".
  - **A:** editorial 2-col split + right-column `RecentBenchmarksTicker` (3-item
    auto-cycle, `BenchmarkHeroBanner.tsx:181-275`). 85svh.
  - **B:** image split (Unsplash boardroom photo, `BenchmarkHeroBanner.tsx:299-332`).
  - **C:** data-viz node graph SVG background, single-column text
    (`BenchmarkHeroBanner.tsx:334-428`). CSS keyframe `node-pulse` on 3 of 8
    nodes; opt-out via `prefers-reduced-motion` CSS gate (L371-373).
- **Why:** Designer left all 4 alts in the code so the tech team can compare in
  prod. Variant D is the canonical slim default per L9 + L431-439.
- **Where:** `App.tsx:101-102` invocation. File `BenchmarkHeroBanner.tsx` (795 LOC).
- **When:** Always renders. Variant gated by `SubtleVariantSwitcher` widget
  (top-right) which is itself gated by `import.meta.env.DEV` so it is invisible
  in prod builds (STATUS L29 + v02 HANDOVER L129 confirm).
- **How:**
  - GSAP `gsap.matchMedia()` (BenchmarkHeroBanner.tsx imports) for entrance fade-up
    sequenced on heading → dek → CTAs → stats; respects `prefers-reduced-motion`.
  - Shared atoms: `EyebrowPill`, `LeftContent`, `CTARow`, `StatsRow` defined as
    private sub-components in the same file (`BenchmarkHeroBanner.tsx:51-130`).
  - DS tokens only — every color goes through `var(--ink-on-dark-*)`,
    `var(--brand-red)`, `var(--black-50)`. No raw hex except where Ken-red is
    embedded inside RGBA literals (e.g. `rgba(176, 31, 36, 0.65)` on the
    Featured badge background, `BenchmarkHeroBanner.tsx:549`). **Anti-pattern
    flagged** — see `pattern-lessons.md`.

---

## Section 3 — `BenchmarkContextBanner` (warm-300 strip)

- **What:** Warm-300 surface strip with breadcrumb, jump links (`#filter-industry`,
  `#filter-region`, `#filter-methodology`), result count, and "Clear all" link.
- **Why:** Spatial bridge between black hero and white listing body. Also surfaces
  the filter state context (count + clear) so user knows what they're seeing.
- **Where:** `App.tsx:105-109`. File `src/app/components/ListingContextBanner.tsx`
  (named export `BenchmarkContextBanner`, the same file that hosts the RS-legacy
  `ListingContextBanner`). 513 LOC.
- **When:** Always — even with zero active filters; the breadcrumb and count are
  unconditional.
- **How:** Pure composition. Reads `resultCount`, `activeFilterCount`, `onClearAll`
  from the filters hook.

---

## Section 4 — `BenchmarkStatsStrip` (warm-400 trust strip)

- **What:** Slim warm-400 bar with "240+ benchmarks · 18 industries · 35 regions".
- **Why (BenchmarkStatsStrip.tsx:9-12):** "Trust signals shouldn't live in hero
  (eats vertical space). Pure black strip felt heavy + jarring after warm-300
  context banner; switch to warm palette keeps editorial-light continuity
  (warm-300 ContextBanner → warm-400 strip → white listing)." This is a documented
  design decision; pattern is **replicable** for any listing page.
- **Where:** `App.tsx:112`. File `BenchmarkStatsStrip.tsx` (78 LOC).
- **When:** Always.
- **How:** Flex row, gap, mobile collapses (`flex-wrap`). Serif numerals,
  `tabular-nums` for visual rhythm. Hairline 1px vertical dividers between items
  on `sm+` only.

---

## Section 5 — 2-col listing body (white)

The page's payload. Three sub-regions:

### 5a — `BenchmarkFilterSidebar` (desktop 280px sticky-ish sidebar)

- **What:** Faceted-filter accordion with **8 sections**: Report Type · Industry ·
  Tags · Region · Country · Competitor Set · Methodology · Year
  (BenchmarkFilterSidebar.tsx:16). Each section is a `FilterAccordion` with
  `FilterCheckbox` rows; live facet counts ("(12)") on each row.
- **Why:** Direct 1:1 mirror of `report-store-legacy/IndustrySidebar.tsx` per the
  file's own comment block (`BenchmarkFilterSidebar.tsx:5-15`). Keeps cross-page
  consistency.
- **Where:** `App.tsx:120-140`. File `BenchmarkFilterSidebar.tsx` (447 LOC).
- **When:** Renders at `xl` breakpoint and up (hidden below). Mobile users get
  `BenchmarkMobileFilterSheet` instead.
- **How:**
  - `SidebarPanel` molecule provides the chrome (header w/ icon-box + "Filters"
    label + count badge + "Clear all"; footer w/ "X+ benchmarks available").
  - Search input at top auto-opens matching sections via the `q` state
    (BenchmarkFilterSidebar.tsx:99-104, 107-118).
  - Report Type section has 5 entries, only "Competition Benchmarking" is
    enabled (`locked: true`, BenchmarkFilterSidebar.tsx:69-75). The other 4 are
    `count: 0` placeholders — UX-tells-user "this filter exists across the site
    but only this one applies here". Pattern is **subtle but smart**.

### 5b — `BenchmarkListingToolbar`

- **What:** Toolbar above the grid: result count ("12 of 24 reports"), active
  chips inline pill, sort dropdown (5 options), `ViewToggle` (grid/list), mobile
  filter trigger.
- **Why:** Standard listing affordance row.
- **Where:** `App.tsx:145-155`. File `BenchmarkListingToolbar.tsx`.
- **When:** Always.
- **How:** Driven by `useBenchmarkFilters` hook return values
  (`useBenchmarkFilters.ts:219` sort label, `:221-234` exported actions).

### 5c — `BenchmarkActiveFilters` (color-coded chip strip)

- **What:** Color-coded chip strip above the card grid showing every active
  filter (industry · tag · region · country · size · methodology · year ·
  search). Each chip carries a TYPE pill + value + ✕ removal.
- **Why:** Mirrors `report-store-legacy` "Zone B" pattern from
  `ListingContextBanner.tsx` (`BenchmarkActiveFilters.tsx:4-17`). Keeps removal
  affordance one click away.
- **Where:** `App.tsx:158-177`. File `BenchmarkActiveFilters.tsx` (193 LOC).
- **When:** Only renders chips that are active (component returns nothing if all
  arrays empty).
- **How:**
  - Per-type color: industry = brand-red tint, tag = emerald, region = blue,
    country = amber, size = purple, methodology = indigo, year = neutral, search
    = neutral (BenchmarkActiveFilters.tsx:30-39). **All hardcoded in RGBA literals,
    not DS tokens** — anti-pattern.
  - Each chip has its own `onRemove` from the hook's toggle methods.

### 5d — Card grid (masonry) or list view (`crossfadeStyle`)

- **What:** Either masonry of `BenchmarkCard` (grid mode) or stacked
  `BenchmarkListCard` rows (list mode). Empty state if `visibleReports.length===0`.
- **Why:** Grid for browse, list for compare. Different user modes need different
  density.
- **Where:** `App.tsx:179-205`. Files `BenchmarkCard.tsx` (242 LOC) +
  `BenchmarkListCard.tsx`.
- **When:** `viewMode === 'grid' | 'list'` from local `useState<ViewMode>`
  (default 'grid', `App.tsx:53`).
- **How:**
  - Grid uses `ResponsiveMasonry columnsCountBreakPoints={{ 0: 1, 640: 2, 1280: 3 }}`
    + `Masonry gutter={`${masonryGutter}px`}` where gutter is 24/32px per breakpoint
    (App.tsx:80-89).
  - Each card wrapped in `CardReveal` molecule with `delay={Math.min(idx,8)*80}` ms
    (App.tsx:191) → staggered scroll-in entrance, capped at 8 to avoid late items
    flashing on.
  - **`BenchmarkCard` masonry rhythm trick (BenchmarkCard.tsx:5-22):** uses 7
    variant configs ("full-featured", "standard", "minimal", "category-featured",
    "clean", "latest", "featured-focus") and rotates per slot index. Each variant
    omits a different subset of elements (date, description, region+comp, tags),
    producing **organic height variation** so masonry doesn't look mechanical.
    Slot 0 always = `full-featured`. Slots 1+ rotate through indices 1..6 of the
    `VARIANT_ROTATION` array (BenchmarkCard.tsx:55-60). This is a **replicable
    DS pattern** — see `pattern-lessons.md`.

### 5e — `LoadMoreSentinel` (infinite scroll)

- **What:** Invisible div that triggers `loadMore` via IntersectionObserver when
  scrolled into view.
- **Why:** Infinite scroll without pagination clicks.
- **Where:** `App.tsx:208-215`.
- **How:** `useProgressiveLoad` hook returns the ref + state. 12 initial + 12
  per load, `rootMargin: '200px'` so it pre-fetches ahead of the viewport edge.

### 5f — Crossfade on filter change

- **What:** 200ms opacity dip wrapper around the entire grid.
- **Why:** Soften the abrupt re-render when filters mutate the set.
- **Where:** `App.tsx:180` wraps the conditional grid/list in `style={crossfadeStyle}`.
- **How:** `useCrossfade(f.filterHash)` returns a style object that briefly
  drops opacity then restores when `filterHash` (a memoised concat of all filter
  arrays) changes.

---

## Section 6 — `BenchmarkTrendingTopics` (warm-300)

- **What:** Tag pill row of trending topics ("Electric Vehicles", "GenAI",
  "Sustainability"...).
- **Why:** Surface cross-cutting tag dimension without forcing user into the
  sidebar.
- **Where:** `App.tsx:226-230`. File `BenchmarkTrendingTopics.tsx` (64 LOC).
- **When:** Always.
- **How:** Static list mapped to pill atoms. Hover → white surface.

---

## Section 7 — `BenchmarkMethodologyPreview` (white, compact)

- **What:** 3-step process card row (Frame · Source · Synthesize) with icon +
  number + title + dek per step.
- **Why:** Methodology disclosure inline — addresses "How we benchmark?" without
  forcing user off-page (BenchmarkMethodologyPreview.tsx:5).
- **Where:** `App.tsx:233-237`. File `BenchmarkMethodologyPreview.tsx` (132 LOC).
- **When:** Always.
- **How:** Static 3-tuple, lucide icons (`Target`, `Search`, `BarChart3`).

---

## Section 8 — `BenchmarkCustomResearchCTA` (black)

- **What:** Black tail CTA. 2-col layout: left eyebrow + h2 + dek + 2 buttons
  ("Request custom benchmark" + "Talk to an analyst"); right "What you get" 3-row
  list with icons (BenchmarkCustomResearchCTA.tsx:15-28: custom competitor set,
  methodology choice, board-ready deck).
- **Why:** Conversion handoff — listing browsers who didn't find their report
  get a path to commissioned research.
- **Where:** `App.tsx:240`. File `BenchmarkCustomResearchCTA.tsx` (163 LOC).
- **When:** Always.
- **How:** Sits over `var(--black-900)`. CTAs use `Button` atom with
  `variant="brand"` (brand-red), secondary CTA likely outline-on-dark.

---

## Footer + persistent overlays

- **Footer** (App.tsx:243) — global, unchanged from DS.
- **`BenchmarkMobileFilterSheet`** (App.tsx:246-269) — bottom-up dialog, full
  filter set duplicated; only visible when `mobileFilterOpen` is true (toggled
  by `MobileFilterBar` or toolbar trigger). Focus trap inherited from Radix Dialog.
- **`MobileFilterBar`** (App.tsx:272-275) — sticky-bottom mobile FAB pill with
  active-filter count badge.
- **`BackToTop`** (App.tsx:277) — appears after scroll threshold.
- **`Toaster`** (App.tsx:279-290) — sonner mounted at app root; styled with
  cinematic surface tokens (`--surface-cinematic-1` etc.) — interesting
  inconsistency: rest of the page is editorial-light, but toasts go dark. Likely
  intentional (toast always reads dark for contrast over any bg).

---

## Word count: ~1,470.
