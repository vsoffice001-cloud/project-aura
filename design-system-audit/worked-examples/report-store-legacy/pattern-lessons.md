# Pattern Lessons — What to Replicate, Reject, Modify

> Synthesis pass across the four prior audit docs.
> Three sections: **Replicate** (carries forward to the new DS / Competition-Benchmarking listing as-is), **Reject** (anti-patterns or scoping decisions that must NOT propagate), **Modify** (good DNA that needs reshape, hardening, or generalisation).
>
> Each entry: 1-line headline + rationale + source citation + benchmarking applicability.

---

## 1. Replicate — carry forward as-is

### R1. The two-column listing chassis (persistent left rail + content)
**Why.** Filter discoverability and result density are best served by a fixed-width filter rail at desktop. The two-col flex with `gap-0 lg:gap-10` is the right shape for any catalogue listing — research reports, vendors, competitors, dimensions. `App.tsx:100-213`.
**Benchmarking applicability.** Direct re-use. Same chassis, swap the right-column data shape.

### R2. The canonical card anatomy (eyebrow → title → meta → footer)
**Why.** Every report card in the project — grid, list, compact, featured — collapses to this 4-zone shape with optional zones. The `<IndustryBadge>` + `<CardMetaRow>` + `<CardFooterRow>` molecule trio expresses it cleanly. `molecules/ReportGridCard.tsx:44-106` is the reference. The benefit is **typographic consistency across surfaces** — once users learn one card, they read all the others faster (Jakob's Law).
**Benchmarking applicability.** Lock the anatomy in DS. For vendor cards: eyebrow=category, title=vendor, meta=score+region, footer=last-updated.

### R3. ListingToolbar already domain-agnostic
**Why.** All copy is prop-driven (`backLabel`, `resultLabel`, `contextLabel`, `searchQuery`, `sortOptions`). Result-count line uses tabular-nums and conditional segments. View-toggle + sort + mobile-filter trigger collapse cleanly. `ListingToolbar.tsx:73-169` is **ready to ship into the DS with zero domain assumptions**.
**Benchmarking applicability.** Drop in. Change defaults: `resultLabel="vendors"`, `sortOptions=["Highest Score", "Newest", ...]`.

### R4. CardListing render-prop pattern
**Why.** Decoupling the listing chrome (grid/list/skeleton/empty) from the card itself via `renderCard: (item) => ReactNode` is the right architecture for a multi-domain DS. `CardListing.tsx:24-57, 86-91`. The same listing can host report cards, vendor cards, dataset cards, anything.
**Benchmarking applicability.** Use directly with a vendor-card render-prop.

### R5. Progressive-load pattern (sentinel + skeleton + progress bar + completion line)
**Why.** Three-state UX — "Showing X of Y" with spinner + progress bar (active), "Showing all N" (completed), null (no data) — covers every loading scenario without state-machine complexity. IntersectionObserver with `rootMargin: '200px'` triggers early enough to feel instant. `useProgressiveLoad.ts:67-80` + `LoadMoreSentinel.tsx:36-122`.
**Benchmarking applicability.** Direct re-use. Hook + sentinel are 100% domain-agnostic.

### R6. Crossfade on filter change (`useCrossfade` + fingerprint)
**Why.** Building a fingerprint string and tweening opacity on change is a cheap, effective visual confirmation that the result set updated. `App.tsx:53-54`. Avoids the "did anything happen?" doubt after filter clicks.
**Benchmarking applicability.** Direct re-use. Same fingerprint pattern — vendor count, sort, active filters concatenated.

### R7. Search-within-filters with auto-open-matching-sections
**Why.** Typing into a single search input auto-expands every accordion section that has matches and dims others — turns a 100-line filter rail into a 10-line targeted view. The auto-open uses a computed override that temporarily ignores the user's manually-toggled state. `IndustrySidebar.tsx:219-233`. **One of the most polished UX touches in the whole project.**
**Benchmarking applicability.** Direct re-use inside `<FilterSearchInput>` + accordion siblings.

### R8. Cross-axis coherence rules with toast confirmation
**Why.** When filter axes are coupled (industry ⇄ sub-industry ⇄ tags), enforce coherence in the state layer and notify the user of automatic corrections via a 2.5s toast. Removes the "why did my filter change?" surprise. `useReportFilters.ts:165-180, 271-283`.
**Benchmarking applicability.** Generalise as `useFilterCoherence(axes, rules)` — applies to benchmarking dimensions that have parent-child or mutex relationships.

### R9. Auto-scroll to `#listing-area` after filter-driven viewMode change
**Why.** When clicking a filter on the home page jumps the user from row 7 of 10 to a listing that rendered at row 1, scrolling to the toolbar makes the change feel intentional. `useReportFilters.ts:57-62`.
**Benchmarking applicability.** Direct re-use.

### R10. EmptyState with action button as 1-click escape
**Why.** Zero-results UX needs a single dominant CTA: "Clear all filters". The current design (dashed warm card + Search icon + message + button) is on-brand and gentle. `EmptyState.tsx:19-57`.
**Benchmarking applicability.** Direct re-use. Default action label fine; message can be customised.

### R11. Skeleton shapes that match their real card
**Why.** Skeleton-card grid mirrors `<GridCard>` exactly; skeleton-list mirrors `<ListCard>` exactly. No layout shift on hydration; shimmer pulses gently rather than spinning aggressively. `SkeletonCard.tsx:14-85`.
**Benchmarking applicability.** Re-use; ship two variants per card type in DS.

### R12. Mobile sticky-pill filter trigger (frosted glass, safe-area-aware)
**Why.** Bottom-pill with frosted glass + red count badge is the thumb-reachable equivalent of the desktop sidebar's clear-all. Safe-area-inset-bottom respected for iOS notch. `MobileFilterBar.tsx:14-62`.
**Benchmarking applicability.** Direct re-use.

### R13. ViewToggle (list/grid) as separate pill
**Why.** Single-purpose pill with two states, tooltipped icon buttons, white-active + shadow-sm. Atomic, reusable. `ViewToggle.tsx:21-72`.
**Benchmarking applicability.** Direct re-use. Could extend with table/map view modes for benchmarking comparison surfaces.

### R14. Iconography palette (`iconColors.ts`)
**Why.** Semantic icon color tokens (`utility`, `content`, `brand`, `success`) prevent ad-hoc color choices. Every Lucide icon usage in the project pulls from this file — single source of truth.
**Benchmarking applicability.** Direct re-use as DS token export.

### R15. Sonner toasts for cross-state confirmations
**Why.** Already styled to match the editorial-light palette (dark bg `#1a1a1c`, white/85 text, token radii). Used for cross-industry switch but extends naturally to "Filters saved", "Comparison list updated", etc. `App.tsx:317-328`.
**Benchmarking applicability.** Direct re-use.

---

## 2. Reject — must NOT propagate

### X1. Inline styles for spacing, color, and border
**Problem.** ~70% of styling decisions in the project use inline `style={{ background: "rgba(0,0,0,0.04)", borderRadius: "var(--radius-element)" }}` rather than Tailwind utility classes or token-mapped components. Examples: every `IndustrySidebar.tsx` row (lines 412-548), `ListingContextBanner.tsx` chip strip, every accordion header. **This kills DS adoption** — when a designer wants to change radius or hover-color globally, they touch 200 files.
**Decision.** Reject. Use Tailwind v4 classes (already installed) for spacing/layout and CSS variables consumed via classes for theme tokens. Inline styles only for runtime-dynamic values (animation delays, computed widths).

### X2. Duplicate grid-card implementations (`ReportCard.GridCard` and `ReportGridCard`)
**Problem.** Two grid card components, ~30% feature overlap, ~60% shared anatomy. Result: when DS anatomy changes, both must be updated — and `ReportGridCard.tsx` has already drifted (slightly different paddings, no badge support). `ReportCard.tsx:163-252` vs `molecules/ReportGridCard.tsx:44-106`.
**Decision.** Reject. New DS ships ONE `<ReportCard variant>` molecule. Optional zones via boolean props or slot children — no parallel implementations.

### X3. Inline `onMouseEnter` / `onMouseLeave` setting `style.background`
**Problem.** Hover states across `IndustrySidebar.tsx` (lines 349-357, 424-432, 438-444, 471-479, 561-567, etc.) and `ListingContextBanner.tsx` (lines 83-88, 268-282) imperatively set `e.currentTarget.style.background`. This blocks CSS optimisation (no compile-time pseudoclass), causes flickers on rapid pointer-move, and is non-portable to Server Components.
**Decision.** Reject. Use Tailwind `hover:` modifiers or CSS-defined `:hover` selectors.

### X4. Hand-rolled focus trap in mobile sheet
**Problem.** `MobileFilterSheet.tsx:122-164` implements focus trap by hand: querying focusable elements, intercepting Tab/Shift-Tab, calling `.focus()` on first/last. Misses screen-reader announcement of dialog state, won't restore focus to the trigger on close, and re-implements behaviour Radix Dialog ships for free.
**Decision.** Reject. Use Radix Dialog (or `vaul` Drawer — already in `package.json:70`) for any modal/sheet pattern.

### X5. Hardcoded `maxHeight: 600px` on FilterAccordion content
**Problem.** `FilterAccordion.tsx:109, 224` caps expansion at 600px. Industries section with all 14 industries + ~80 subcategories overflows and gets clipped without a visible scrollbar.
**Decision.** Reject. Use `grid-template-rows: 0fr → 1fr` animation pattern, or measured height, or `display` swap with content scroll inside.

### X6. URL state ignored
**Problem.** No filter state persisted to URL. Refresh wipes everything. Deep-link to a filtered view impossible. Share-a-filtered-listing impossible. This is the **single biggest UX gap**, called out in `MIGRATION_LOG.md`.
**Decision.** Reject. New build must sync `useReportFilters` state to URL via `useSearchParams` (Next.js) or query-string library. Hydrate from URL on mount.

### X7. Single-page SPA (no router)
**Problem.** The whole app is one React tree with a `viewMode` toggle (`useReportFilters.ts:66`). `/reports/healthcare/oncology` is impossible — every state collapses to `/`. Also breaks browser-back semantics (back from a deep filter → exits the site, not unselects).
**Decision.** Reject. New build uses route segments or searchParams. Browser-back must undo the last filter change.

### X8. Hardcoded copy in editorial banner ("Explore comprehensive market research...")
**Problem.** `ListingContextBanner.tsx:241-246` templates a fixed description from industry name. Editorial team wants per-industry voice ("Healthcare research grounded in 10 years of patient-outcome data" vs "Renewable energy research with verified deal-flow"). Currently zero hooks for this.
**Decision.** Reject. New banner accepts a `description?: ReactNode` slot prop. Editorial overrides per industry in catalog data.

### X9. `paginatedReports` + `currentPage` state alongside infinite scroll
**Problem.** `useReportFilters.ts:88-89, 397-405` maintains a slicing-by-pages mechanism that is never consumed by any component. Dead code from a pre-infinite-scroll iteration. Adds cognitive load when reading the hook.
**Decision.** Reject. Either remove entirely OR re-enable paginated mode as an A/B option. Don't ship both.

### X10. Single mega-hook `useReportFilters` (466 lines, 30+ returns)
**Problem.** Useful encapsulation BUT god-object: search state + filter state + sort state + pagination state + viewMode state + all handlers + all derived in one file. Hard to reason about, hard to test in isolation. A single change to one filter axis re-renders consumers of unrelated axes (no memo separation).
**Decision.** Modify (see M5 below) — split into composable hooks with clear axes.

---

## 3. Modify — good DNA, reshape before re-use

### M1. Industry tree → extract `<FilterTreeItem>` molecule
**Status.** Currently inlined 165 lines in `IndustrySidebar.tsx:408-572`.
**Reshape.** Lift into `molecules/FilterTreeItem.tsx` with props: `{ name, count, isSelected, isExpanded, isActiveSub: (sub) => bool, subcategories, onSelect, onSubToggle, onExpand }`. Keep the auto-expand + scroll-into-view behaviours (`IndustrySidebar.tsx:123-161`) as a sibling hook `useTreeAutoExpand`.
**Why.** Lets benchmarking re-use the tree for its own hierarchical filters (e.g. vendor segment → sub-segment) without copying 165 lines.

### M2. ActiveFilterChip duplication — consolidate
**Status.** `molecules/ActiveFilterChip.tsx` exists but `ListingContextBanner.tsx:59-99` ships its own copy with slightly different padding and type-color mapping.
**Reshape.** Delete the inline copy; refactor the banner to use the molecule. Add the banner's type-color map to the molecule's `chipColors` if it's richer.
**Why.** Single source of truth for chip styling. New DS must enforce.

### M3. FilterChip touch target 40px → 44px
**Status.** `FilterChip.tsx:36` sets `min-h-[40px]`. WCAG AAA recommends 44×44 for touch targets; Apple HIG mandates 44; Material 3 recommends 48.
**Reshape.** Change to `min-h-[44px]` and verify visual density acceptable.
**Why.** A11y compliance is non-negotiable in the new DS.

### M4. ReportCard variant explosion → opt-in slots
**Status.** Four named variants (`grid` / `list` / `compact` / `featured`) each implemented as a separate React component dispatched by a switch (`ReportCard.tsx:554-583`).
**Reshape.** Keep 2 layout primitives (`<ReportCard variant="grid">` and `<ReportCard variant="list">`). Express compact and featured as **slot overrides** (`leadingSlot={rank}` for compact, `overlay` mode + `<FeaturedSlots>` for featured) on the same component.
**Why.** Easier to evolve. New variants don't fork the dispatcher. Per `aura-craft` per-section-design-decision discipline, variants should be expressed in props/slots when 80% of the markup is shared.

### M5. Split `useReportFilters` into composable hooks
**Status.** Single 466-line hook (`useReportFilters.ts`).
**Reshape.** Split into: `useSearchFilter(query, category)` · `useTaxonomyFilter(industry, subIndustries, tags)` (encapsulates coherence rules) · `useFacetFilter(regions, years)` · `useSort(sortBy)` · `useViewMode(mode)` · `useDerivedResults(items, filters, sort)`. Compose them in the listing page.
**Why.** Independent re-render (memoisation). Easier to test. Easier to swap one axis without touching others. Benchmarking listing reuses 80% (taxonomy → vendor-segment, facets → score-range / region / sector, sort → score / newest).

### M6. Banner description as slot, not template
**Reshape.** Add `description?: ReactNode` prop to `<ListingContextBanner>` Zone A. Replace the inline template (`:241-246`) with `{description ?? defaultTemplate}`. Editorial team feeds per-industry description from the industries catalog.
**Why.** Editorial voice per axis. Carries forward to benchmarking (per-category description: "Cloud DBs — benchmarked across 8 dimensions in 2026 Q2").

### M7. Pagination state — pick one and commit
**Reshape.** Delete `paginatedReports` + `currentPage` setter if infinite-scroll stays. OR keep them, drop the sentinel, and offer numbered pagination as an A/B test in the new build. Do not ship both.
**Why.** Code smell removal. Less cognitive load.

### M8. FilterAccordion maxHeight cap — uncap with grid-rows animation
**Reshape.** Replace `maxHeight: 0 → 600px` with `grid-template-rows: 0fr → 1fr` + inner `min-height: 0; overflow: hidden`. Modern, uncapped, smooth.
**Why.** Avoid clipping long lists. Future-proof for taxonomies that grow.

### M9. ReportStoreHero → swap for benchmarking-shaped hero
**Status.** Search-first hero with category dropdown + popular tags (`ReportStoreHero.tsx`).
**Reshape.** For benchmarking, swap to a dimension-first hero: "Compare on Performance, Cost, Vendor Lock-in..." with chip-cloud of dimensions. Keep the search-bar shape but make the search semantic (vendor names / capability tags).
**Why.** Different mental model — vendor browse is comparison-first, not search-first.

### M10. Mobile filter sheet refactor to Radix `Dialog` + `Drawer` (vaul)
**Reshape.** Replace the hand-rolled sheet (`MobileFilterSheet.tsx:183-409`) with `Drawer` from `vaul` (already in deps at `package.json:70`) or `Dialog` from Radix. Preserve the sticky header + scrollable body + sticky footer structure as slots.
**Why.** Free focus trap, ARIA, focus restore, body-scroll lock, plus mobile-feel gestures (swipe-to-dismiss in vaul).

### M11. Hardcoded grid breakpoints (`sm:grid-cols-2 xl:grid-cols-3`)
**Status.** `CardListing.tsx:72` defaults the grid class to `sm:grid-cols-2 xl:grid-cols-3` with a prop override available (`gridClassName`) but never overridden in App.tsx.
**Reshape.** Pass `gridClassName` from page level. New DS exposes 3 standard preset classes (`grid-2col`, `grid-3col`, `grid-2-3-4`) for different density needs.
**Why.** Benchmarking comparison cards may want wider rows (`xl:grid-cols-2`). Don't bake into the listing organism.

### M12. Image-badge override CSS-vars pattern
**Status.** `ReportCard.tsx:113-153` defines `IMAGE_BADGE_OVERRIDES` keyed by theme that ship inline `--badge-bg` / `--badge-border` / `--badge-text` variables to override the base Badge atom's CSS vars. Works, but couples 40 lines of card code to badge internals.
**Reshape.** Add `mode="image"` to the Badge atom itself, with the higher-opacity backdrop-blur built in. Card consumer just sets `mode="image"`.
**Why.** Encapsulation. Tighter API.

---

## Top 5 takeaways (TL;DR)

1. **Carry forward the listing chassis + canonical card anatomy.** The two-column shell + 4-zone card (eyebrow→title→meta→footer) are the highest-leverage patterns and battle-tested across this project.
2. **Inherit the cross-axis coherence rules + toast pattern.** Filter-state coherence with user-visible auto-correction is rare and well-executed here; generalise it for benchmarking dimensions.
3. **Reject inline styles + duplicate components.** ~70% of styling is inline; two grid cards diverged. Both block DS adoption and must NOT propagate.
4. **Build URL-sync + routing into the new build.** The single biggest functional gap. Filter state must persist to URL.
5. **Modify mobile sheet to use Radix Dialog / vaul Drawer.** Free focus trap, ARIA, body-scroll lock — drop ~150 lines of hand-rolled focus-management code.

---

## Open questions for Aura craft-pass

These need explicit per-section design decisions before benchmarking build (would normally come from the `aura-craft` step):

1. **View modes for benchmarking listings.** Grid + list inherited from reports. Do we add **table view** (most data-dense for vendor comparison) and **map view** (when geography matters)?
2. **Industry/category hero treatment.** Cinematic-dark banner inherited from `ListingContextBanner.tsx:157-293`. Does benchmarking want the same dark hero, or a lighter editorial card (since benchmarking surfaces are more analytical and less aspirational)?
3. **Compact ranked variant prominence.** ReportCard.Compact is currently home-only. Should benchmarking promote "Top 10 vendors in category" rails to first-class listing-mode-too?
4. **Default sort.** Reports defaults "Newest First". Vendor benchmarking probably defaults "Highest Score" or "Most Recommended". Worth user-research validation.
5. **Search-bar role.** Reports use search to find a specific report. Benchmarking's search likely surfaces capabilities ("vendors with OAuth + multi-tenant") — needs a fundamentally different query shape (semantic / filter-builder) than the current free-text input. Possibly out-of-scope for v1.

All five flow into the Competition-Benchmarking page-build's INTAKE step. Resolve there.
