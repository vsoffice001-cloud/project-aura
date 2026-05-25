# Listing-Anatomy — Full walkthrough of the Report Store listing page

> Region-by-region WWWWH (What · Why · Where · When · How) for every visible zone of the listing-mode UI.
> Citations are `file:line` against `projects/report-store-legacy/src/app/components/`.

Listing mode is everything that renders when `useReportFilters.viewMode === "listing"` (`useReportFilters.ts:66`). The home/listing toggle happens in-place inside the same two-column shell defined at `App.tsx:100-213`.

---

## 0. Two-column shell (the chassis)

**What.** A `<Container maxWidth="page">` wraps a horizontal flex with `gap-0 lg:gap-10` between the sidebar column and the content column. `App.tsx:100-101`.

**Why.** The listing is a **persistent sidebar** pattern (not a top-toolbar pattern). The filter rail never collapses on desktop, mirroring Bloomberg / Crunchbase / G2 listing chrome.

**Where.** `App.tsx:101` — `<div id="listing-area" className="flex gap-0 lg:gap-10 py-10 lg:py-12">`. The `id` is the scroll target used by `useReportFilters.scrollToListing` (`useReportFilters.ts:57-62`) so deep links / clicks scroll to the toolbar, not page top.

**When.** Always — in both home and listing mode the sidebar renders (`App.tsx:102-116`). Only the right column's contents differ.

**How.** `scrollMarginTop: '72px'` aligns the in-view top with the sticky header. `App.tsx:101`.

Region cost: 1 outer div + 1 container. Cheap.

---

## 1. Filters panel (left rail)

**What.** A 240px-wide sticky sidebar with: header (icon + "Filters" + active count + clear-all) → search-within-filters → 4 accordion sections (Industries / Tags / Regions / Years) → footer ("X+ reports available"). Rendered by `IndustrySidebar.tsx:304-674` inside the chrome of `SidebarPanel.tsx`.

**Why.** Filter discovery is the **primary navigation** of the store. Putting it left, persistent, and scannable beats a top dropdown for catalogue-density UX (cf. Algolia / Coveo / Amazon filter rails). The header pill count gives reassurance that "yes, my filters applied". The footer count gives a sense of corpus size (1,247+ reports).

**Where.** `App.tsx:102-116` instantiates `<IndustrySidebar>`. Container/sticky behaviour delegated to `SidebarPanel.tsx:68-117`.

**When.** Visible `lg:` and up (`SidebarPanel.tsx:60-66`, `hideBelow="lg"`). Below `lg` the rail is replaced by the mobile sheet (Section 8 below) triggered by the sticky pill bar.

**How.**
- Sticky positioning: `top: 72px`, `maxHeight: calc(100vh - 88px)`, internal scroll, scrollbar hidden via `.scrollbar-hide` class. `SidebarPanel.tsx:70-74, 96`.
- Header has fixed `--black-50` background, scrollable body is white, footer mirrors header. `SidebarPanel.tsx:82-114`.
- Accordion sections: `IndustrySidebar.tsx:398-672` — one `<FilterAccordion>` per concern (Industries, Tags, Regions, Years), each accepts `count` (active selection count, drives badge + chrome) + `disabled` (Tags disabled when no industry picked, with `disabledHint` tooltip explaining why).
- Industries section is a **tree** (industry → expand caret → subcategories) rather than flat checkboxes, because Ken's domain is hierarchical. `IndustrySidebar.tsx:408-573`.
- Search input `<FilterSearchInput>` filters all four sections simultaneously and **auto-opens** sections that have matches (`IndustrySidebar.tsx:219-228`). When search clears, accordions return to previous state.
- Selections auto-expand parent industries when sub-categories are toggled, then `scrollIntoView` the active row (`IndustrySidebar.tsx:123-161`).

Region cost: 676 lines, but most of it is one organism. Could shrink ~30% with a `<FilterTreeItem>` molecule extraction.

---

## 2. Sort bar / Listing toolbar (row 1 above results)

**What.** Horizontal row with: back arrow → divider → result-count text → (right-aligned) mobile-filter button (lg-hidden) → ViewToggle pill (list/grid) → divider → sort dropdown. `ListingToolbar.tsx:73-169`.

**Why.** Three jobs at once: (a) escape hatch back to home, (b) feedback ("12 reports in Healthcare for 'oncology'"), (c) presentation control (sort + view + mobile filter trigger). Keeping all three in one row above the grid is cheaper than a side panel and easier to scan than spread-out controls.

**Where.** `App.tsx:138-151` mounts it; component file is dedicated organism `ListingToolbar.tsx` — 170 lines, fully presentational.

**When.** Renders only when `viewMode === "listing"` (`App.tsx:133`). Not visible in home mode (where there's nothing to sort).

**How.**
- Back button: `ArrowLeft` icon + label, `min-h-[44px]` for touch, label hidden below `sm` (`ListingToolbar.tsx:76-85`). Arrow translates `-translate-x-0.5` on group-hover for affordance (`:83`).
- Result count summary: tabular-nums on the number, three-segment label that **conditionally appends** context ("in Healthcare") and search query ("for 'oncology'"). `ListingToolbar.tsx:94-113`.
- Mobile filter trigger: `lg:hidden`, 44×44 min touch target, shows count badge in top-right when `activeFilterCount > 0`. `:118-138`.
- ViewToggle: separate atom (see `ViewToggle.tsx:21-72`), pill with two icon buttons (LayoutList / LayoutGrid), white-active + shadow style, count display optional.
- Sort dropdown: native `<select>` with custom chevron, `appearance-none`, 5 default options (`Newest First / Oldest First / Most Popular / A-Z / Z-A`). `ListingToolbar.tsx:150-166`. Hidden below `sm:` — mobile uses sort accordion in the sheet.

Region cost: 1 organism, ~170 lines. Strong replicate candidate — already domain-agnostic via `resultLabel` / `contextLabel` / `sortOptions` props.

---

## 3. Result grid / Card listing (row 3 — the main content)

**What.** Either a `grid sm:grid-cols-2 xl:grid-cols-3 gap-6` (grid view) or `flex flex-col gap-3` (list view) of `<CardReveal>`-wrapped `<ReportCard>`s. Crossfade wrapper outside; LoadMoreSentinel inside via children slot. Empty state when no items.

**Why.** The grid is **the deliverable**. Everything else (filter rail, toolbar, banner) exists to shape this list. Two view-modes (grid for browse / list for compare) is the table-stakes pattern for catalogue UIs (cf. Airbnb, Booking, Pluralsight).

**Where.** `App.tsx:177-208` mounts `<CardListing>` (`CardListing.tsx:59-143`). The card renderer is a render-prop (`renderCard`) so the listing is decoupled from `ReportCard`.

**When.** Always present in listing mode. Switches internal layout based on `viewMode === "grid" | "list"`.

**How.**
- Stagger animation: first 8 items each delayed `idx * 50ms` via `<CardReveal>` (`CardListing.tsx:77-78, 88`). Items beyond #8 appear instantly (`getDelay` returns 0).
- Crossfade on filter change: `style={crossfadeStyle}` wraps the whole grid. `useCrossfade` (`hooks/useCrossfade.ts`) returns opacity tween triggered by the fingerprint string built in `App.tsx:53`.
- View-mode switch: ternary inside `CardListing.tsx:85-127` picks grid or list shell. `<ReportCard variant={listingViewMode}>` then renders the appropriate sub-variant.
- Bottom padding: `<div className="h-16 lg:hidden" />` reserves space for the sticky mobile filter pill (`:140`).
- Empty state branch: when `items.length === 0` falls through to `<EmptyState>` (Section 7).

Region cost: 144-line listing organism + 4-variant card. Grid-cols numbers (`sm:2 xl:3`) are hardcoded — should be a `gridClassName` prop override (already supported but not used).

---

## 4. Pagination

**What.** None. The listing uses **infinite scroll with progressive load**, not numbered pages.

**Why.** Endless catalogue UX matches the "explore the corpus" mental model better than 1/2/3/.../50 paging. Removes a click between user and next result.

**Where.** `<LoadMoreSentinel>` (`molecules/LoadMoreSentinel.tsx:36-122`) rendered as children of `<CardListing>` (`App.tsx:199-207`). State managed by `useProgressiveLoad` hook (`hooks/useProgressiveLoad.ts`).

**When.** Active throughout listing mode. The sentinel `<div>` sits below the rendered cards; `IntersectionObserver` watches it (`useProgressiveLoad.ts:67-80`).

**How.**
- Initial render: 12 cards (`initialCount`, `App.tsx:48`).
- When user scrolls within 200px of the sentinel (`rootMargin: '200px'`, `useProgressiveLoad.ts:35`), `handleLoadMore` fires.
- Fake 350ms delay simulates API (`useProgressiveLoad.ts:60-63`), then `setVisibleCount(prev + 20)` (`loadMoreCount: 20`, `App.tsx:49`).
- During the delay, skeleton placeholders render at the end of the grid (`CardListing.tsx:93-104`) with their own stagger (60ms each).
- Sentinel renders 3-state UI:
  1. Has-more: "Showing X of Y reports" + `Loader2` spinner + progress bar (width = visibleCount/totalCount × 100%) `LoadMoreSentinel.tsx:55-102`.
  2. All loaded: "Showing all N reports" (faded, no spinner) `:106-118`.
  3. Empty: null `:120`.
- Reset behaviour: when `items.length` changes (e.g. user toggles a filter) the hook auto-resets `visibleCount` to initial (`useProgressiveLoad.ts:48-55`).

`useReportFilters.ts:88-89, 397-405` also maintains an unused `currentPage` + `paginatedReports` slice — leftover from a pre-infinite-scroll iteration. Tech port should drop the unused page state OR re-enable numbered paging as an A/B candidate.

Region cost: ~120-line hook + ~120-line sentinel. Excellent reuse candidate.

---

## 5. Facets (active filter chips strip)

**What.** A horizontal pill row below the toolbar showing: filter-count label · color-coded removable chips · "Clear all" link (right-aligned when 2+ chips). Rendered by `<ListingContextBanner>` Zone B.

**Why.** Two functions: (a) **show user what's filtering the result set right now** (commitment / undo affordance), (b) **let user surgically remove one filter without opening the sidebar** (1-click vs 4-clicks-into-the-rail). Standard pattern in any post-Algolia filter UX.

**Where.** `ListingContextBanner.tsx:298-348`. The chips are built from controlled props (`searchQuery`, `selectedSubIndustries[]`, etc.) into a `FilterChipData[]` array at `:121-142`.

**When.** Renders whenever there's at least one active filter OR a search query (`App.tsx:57` — `showBanner = activeFilterCount > 0 || !!searchQuery`). Wrapped in `useMountTransition` for smooth enter/exit (`App.tsx:58`).

**How.**
- Chip data shape: `{ type, label, value, onRemove }`. Five types (search / subIndustry / tag / region / year) each with a colour: gray / purple / green / blue / amber (`:43-49`). Industry filter is NOT shown as a chip — it's the banner header (Section 6).
- Each chip is an inline-flex pill with: uppercase type-label (e.g. "TAG") + value (truncated to 180px) + circular X button. `ListingContextBanner.tsx:59-99`.
- Clicking X calls the chip's `onRemove`, which is wired to one of `useReportFilters.removeXxx` (`:226-255`).
- "Clear all" only renders when `totalActive > 1` (`:328`) — avoids redundancy with the single chip's own X.

Region cost: bundled into the banner organism; ~50 lines for chip atom + ~50 for chip strip rendering.

---

## 6. Industry hero banner (context banner Zone A)

**What.** A dark, gradient-backed banner that highlights the currently selected industry: badge ("Industry Focus") · dismiss X · industry name (serif, light weight, 20-26px clamp) · report count · description line · horizontal-scrollable sub-category quick-link pills.

**Why.** The industry filter is **special** — it's the primary axis of the corpus, and Ken's editorial team curates a narrative per industry ("comprehensive market research across all Healthcare sectors"). Treating it as a hero (not just another chip) gives editorial space + visual anchor + sub-category cross-sell.

**Where.** `ListingContextBanner.tsx:157-293`. Composed with Zone B (chip strip) under one rounded container.

**When.** Renders only when `selectedIndustry !== null` (`:157`). Zone B (chips) renders independently — both, one, or neither can show.

**How.**
- Gradient: `linear-gradient(135deg, #0a0a0a 0%, #1a1a1c 50%, #111113 100%)` plus a dot-grid overlay at 3% opacity + two blurred radial glows (purple top-right, warm bottom-left). `:160-183`.
- Heading: `font-serif`, `font-weight-light`, `clamp(20px, 3vw, 26px)` — uses fluid type. `:222-228`.
- Report count: `{industry.count} research reports` at `--text-2xs`, white/30 — secondary metadata. `:231-236`.
- Description: hard-coded template "Explore comprehensive market research across all `{industry.name.toLowerCase()}` sectors and sub-categories." — should be data-driven for the real product. `:241-246`.
- Sub-category quick-links: `<HorizontalScroll>` (`molecules/HorizontalScroll.tsx`) with edge-fade against `fadeBg="#111113"`. Each pill is a button with active/inactive styling (`:249-290`). Clicking calls `onSubcategoryClick(sub)` which routes back into `useReportFilters.handleSubcategorySelect`.

Region cost: ~140 lines for Zone A alone — heavier than the rest of the banner. Strong replicate for benchmarking surface (where the "industry" axis becomes "vendor segment" or "benchmark dimension").

---

## 7. Empty state

**What.** Dashed-border card with: 48×48 circular icon container (Search icon by default) → message text → optional action button. `molecules/EmptyState.tsx:19-57`.

**Why.** No-results is a **load-bearing UX moment** — users who hit it have over-filtered and are about to bounce. The action button (default: "Clear all filters") gives a 1-click escape.

**Where.** Falls through automatically when `items.length === 0` inside `<CardListing>` (`CardListing.tsx:128-134`).

**When.** Whenever the filter combo yields zero results. Replaces the entire grid; toolbar + banner remain visible above.

**How.**
- Visual: warm dashed border (`var(--warm-500)`), warm fill (`var(--warm-300)`), 10px radius, centred icon + text + button. Soft (not alarmist) tone.
- Entrance animation: `fadeUp 0.45s cubic-bezier(0.16, 1, 0.3, 1) both` on mount (`:32`).
- Action wired from `App.tsx:185` → `f.clearAllFilters` (`useReportFilters.ts:207-216`).
- Defaults: message "No results found matching your criteria.", action label "Clear all filters". Both overridable.

Region cost: ~57 lines. Cheap, strong replicate.

---

## 8. Loading state (skeletons)

**What.** Shimmer placeholders that mirror the card shape: image block + badge bar + 2 title lines + meta line. Two variants (grid / list) match the active view-mode. `molecules/SkeletonCard.tsx:14-85`.

**Why.** Skeletons reduce perceived latency vs spinners (Nielsen Norman 2017). Shape-matching skeletons (vs generic boxes) further reduce layout shift on hydration.

**Where.** Rendered at the end of the grid during `isLoadingMore === true`. `CardListing.tsx:94-104` (grid) · `:115-125` (list). Each skeleton has its own 60ms stagger entrance.

**When.** During the 350ms simulated load-more delay (`useProgressiveLoad.ts:60-63`). Also visible on initial mount if data is fetched async (not the case in the fixture, but the shape supports it).

**How.**
- Class `skeleton-shimmer` is defined in `styles/theme.css` (CSS gradient animation — couldn't trace from given citations but referenced consistently). Provides the moving-light shimmer effect.
- Grid variant: full-width 16/9 image block + p-4 content area with 4 stacked lines. Mirrors `<GridCard>` proportions exactly.
- List variant: 16/20-width image column + content column with 4 stacked lines + right-column with meta + CTA. Mirrors `<ListCard>` exactly.
- Skeletons inherit the same border/radius tokens as real cards so the transition is invisible.

Region cost: ~85-line molecule. Replicates well.

---

## 9. Mobile listing flow (parallel system below `lg`)

**What.** Same content, different chrome: no left rail, no toolbar sort dropdown. Instead: a floating bottom-pill (`MobileFilterBar.tsx`) that opens a slide-from-right full-screen sheet (`MobileFilterSheet.tsx`).

**Why.** 320-640px viewport can't afford 240px of horizontal filter rail. Bottom-pill keeps the trigger thumb-reachable (Apple HIG, Material 3 FAB pattern). Sheet uses chip-based filters (vs. checkboxes desktop) for fatter touch targets.

**Where.**
- Sticky pill: `MobileFilterBar.tsx:14-62`, mounted at `App.tsx:308-311`.
- Sheet: `MobileFilterSheet.tsx:79-409`, mounted at `App.tsx:290-305`.

**When.** Both render on every page but visually only below `lg` (`MobileFilterBar.tsx:22` — `lg:hidden`; `MobileFilterSheet.tsx:187` — `lg:hidden`).

**How.**
- Pill: 9999px-radius frosted-glass button, fixed bottom, safe-area-inset-bottom aware. Shows red count badge when filters active.
- Sheet: 380px max-width, slides in via `transform: translateX(0|100%)` + 300ms cubic-bezier (`MobileFilterSheet.tsx:206-209`). Backdrop fade 250ms.
- Body scroll locked while open (`:111-120`). Focus trap with Tab/Shift-Tab cycle + Escape-to-close (`:122-164`) — hand-rolled, would be cheaper via Radix Dialog.
- Sticky header (title + clear-all + close X) + scrollable body of `<FilterAccordion variant="sheet">` sections + sticky footer with brand "Show Results" button.
- Sort is a top-level accordion section here (vs. dropdown on desktop) — list of `<FilterChip>` toggles, one active.

Region cost: ~410-line sheet + ~62-line pill. Sheet is the heaviest single component but contains substantial focus-trap logic that would be inherited from Radix in a port.

---

## 10. Toast layer

**What.** Sonner `<Toaster>` mounted at `App.tsx:317-328` with dark-themed style (matches editorial-light page bg with high-contrast bottom-center toasts).

**Why.** Used for **cross-industry switch confirmation** when user picks a sub-cat outside the current industry (`useReportFilters.ts:175-178, 278-281`). Without the toast, the auto-switch would feel like a bug ("why did my industry change?").

**Where.** Rendered globally; called via `toast()` from inside the filters hook.

**When.** Fires only on cross-industry sub-cat toggles; 2500ms duration.

**How.** Custom styled — dark bg `#1a1a1c`, white/85 text, `var(--text-xs)`, `var(--radius-element)`. Position bottom-center.

Region cost: ~12 lines of config. Replicates trivially.

---

## Summary table — listing zones at a glance

| # | Zone | File | Lines | Mount | Replicate? |
|---|---|---|---|---|---|
| 0 | Two-col shell | `App.tsx:100-213` | 20 | Always (listing) | Yes — pattern |
| 1 | Filter panel | `IndustrySidebar.tsx` | 676 | Always (lg+) | Yes — shrink first |
| 2 | Listing toolbar | `ListingToolbar.tsx` | 170 | Listing only | Yes — already generic |
| 3 | Card grid | `CardListing.tsx` | 144 | Listing only | Yes — render-prop ready |
| 4 | Progressive load | `LoadMoreSentinel.tsx` + `useProgressiveLoad.ts` | ~210 | Listing only | Yes |
| 5 | Chip strip (Zone B) | `ListingContextBanner.tsx:298-348` | ~50 | When filters active | Yes |
| 6 | Industry hero (Zone A) | `ListingContextBanner.tsx:157-293` | ~140 | When industry picked | Modify — data-driven |
| 7 | Empty state | `EmptyState.tsx` | 57 | When 0 results | Yes |
| 8 | Skeletons | `SkeletonCard.tsx` | 85 | While load-more | Yes |
| 9 | Mobile sheet | `MobileFilterSheet.tsx` + `MobileFilterBar.tsx` | ~470 | Below lg | Yes — use Radix Dialog |
| 10 | Toast layer | `App.tsx:317-328` | 12 | Cross-industry switch | Yes |

Total listing-mode surface: ~14 files, ~2,100 lines of TSX. About **40% is replicable as-is**, **40% needs token migration + Radix swap**, **20% (the hand-rolled focus trap, inline styles, hard-coded copy) is reject + rewrite**. Details in `pattern-lessons.md`.
