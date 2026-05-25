# Pattern lessons — what to REPLICATE · REJECT · MODIFY in the new DS

This document distils audit findings from the competition-benchmarking pair
into actionable DS guidance. Each pattern is rated as:

- **REPLICATE** → port directly to the new DS as a canonical primitive
- **REJECT** → known anti-pattern; do not carry forward
- **MODIFY** → useful idea, broken implementation; redesign before porting

---

## REPLICATE — 8 patterns worth porting wholesale

### R1 · Faceted-sidebar 8-dimension filter chrome
- **Where:** `BenchmarkFilterSidebar.tsx:67` (SectionKey union) ·
  composed via `SidebarPanel` + `FilterAccordion` + `FilterCheckbox` +
  `FilterSearchInput`.
- **Why:** Clean 1:1 mirror of `report-store-legacy/IndustrySidebar.tsx`. Live
  facet counts on each row · search auto-opens matching sections · "X+ items
  available" footer · header w/ icon-box + label + count badge + clear-all
  · scrollable section max-height (240–300px) · "No matches found" empty state.
- **How to port:** Lift `SidebarPanel`, `FilterAccordion`, `FilterCheckbox`,
  `FilterSearchInput` as DS molecules. Document the *header chrome contract* +
  *footer copy template* + *empty-state copy* as DS guidance.
- **Cited:** `BenchmarkFilterSidebar.tsx:5-17` self-attests to RS lineage.

### R2 · `?type=<lock>` always-set URL discriminator
- **Where:** `useBenchmarkFilters.ts:103` — `sp.set('type', 'competition-benchmarking')`
  always written, regardless of which filters are active.
- **Why:** Anticipates the consolidated multi-report-type API. The URL itself
  is self-describing — a backend route resolver can dispatch by `type` without
  needing path-based routing.
- **How to port:** Make this a **DS rule** for any listing page. Every listing's
  filter hook should always-emit a `?type=<surface-id>` even if downstream
  endpoints don't yet require it. Cheap future-proofing.

### R3 · Variant-rotation card pattern for masonry rhythm
- **Where:** `BenchmarkCard.tsx:36-78`. 7 variants — "full-featured" · "standard"
  · "minimal" · "category-featured" · "clean" · "latest" · "featured-focus"
  — each omitting a different subset of (category, description, date,
  region+comp, featured/latest tags). Slot 0 always "full-featured", slot 1+
  rotates indices 1..6.
- **Why:** Solves the "masonry looks mechanical" problem by producing organic
  card-height variation through **content omission**, not arbitrary padding/margin
  hacks. The variation is also legible — each variant has a coherent identity, not
  random.
- **How to port:** Generalise as a DS card primitive — `<DSCard variant={…}>` with
  the variant config table exported as a DS constant. Each consuming page picks
  a rotation strategy. The slot-→-variant mapping function is reusable.
- **Cited:** `BenchmarkCard.tsx:5-22` self-documents the rationale.

### R4 · Color-coded chip strip with TYPE pill + value + ✕
- **Where:** `BenchmarkActiveFilters.tsx:30-39`. 8 chip types, each with bg/border
  rgba pair. Each chip = TYPE label (small uppercase) + value + ✕ button.
- **Why:** Lets users scan filter dimension at a glance. "industry: Healthcare ✕"
  reads faster than just "Healthcare ✕" when 7 filters are active across 7
  dimensions. Color reinforces the typology — once user learns "red = industry,
  blue = region", they can find-and-remove without reading the label.
- **How to port:** DS primitive `<FilterChip type="industry" value="…" onRemove={…} />`.
  Type→color mapping lives in DS, not page-local.
- **⚠ Caveat:** current implementation has the rgba colors as raw hex tuples in
  the chip-styles map. **Port the pattern, not the implementation** — see M2.

### R5 · `useBenchmarkFilters` single-hook state machine
- **Where:** `useBenchmarkFilters.ts` (235 LOC). Owns: filter arrays · sort ·
  search · debounce timer · URL parse on mount · URL push debounced 300ms ·
  facet counts memoised · featured-first override · activeFilterCount derived
  · activeChips derived · toggle helpers · clearAll · loadMore.
- **Why:** One hook, one source of truth. Page App.tsx just spreads. Backend
  swap = swap one import. Real API integration = replace `BENCHMARK_REPORTS`
  with `useQuery(['benchmarks', filters], () => fetch(...))`.
- **How to port:** Codify the hook shape as a DS contract. Any listing hook
  must return: `filteredReports · visibleReports · hasMore · isLoadingMore ·
  filterHash · activeFilterCount · activeChips · facetCounts · sortLabel · setters · toggles · clearAll · loadMore · mobile{Open,setOpen}`.
- **Cited:** `useBenchmarkFilters.ts:221-234`.

### R6 · Slim hero default + variant switcher gated dev-only
- **Where:** `BenchmarkHeroBanner.tsx:431-440` (Variant D rationale), `:42-47`
  (variant set), `App.tsx:102`. `SubtleVariantSwitcher` gated by
  `import.meta.env.DEV` so it only renders in dev mode.
- **Why:** Listing pages need viewport for the grid — slim hero (50vh cap)
  beats theatrical hero (85svh). The dev-only switcher lets tech team preview
  alts post-handover without exposing to end users. Pattern is "ship one
  treatment, keep alts for stakeholder review".
- **How to port:** DS rule for listing-page heroes: **default slim (max 50vh)**;
  alts allowed but gated DEV-only. Also generally: **`import.meta.env.DEV` is
  the canonical pattern** for design-team preview affordances.

### R7 · Surface alternation black → warm-300 → warm-400 → white
- **Where:** App.tsx:5-14 documents the 8-section bg sequence.
  Hero(black) → ContextBanner(warm-300) → StatsStrip(warm-400) → listing(white)
  → TrendingTopics(warm-300) → Methodology(white) → CustomCTA(black) → Footer(black).
- **Why:** Editorial-light variant demands warm transitions; pure black→white
  is "heavy + jarring" (BenchmarkStatsStrip.tsx:11). Warm-300 is the bridge
  surface. Warm-400 strip is the **trust-signal surface** (numerics live there).
- **How to port:** Codify the **3-warm-surface ladder** (warm-300 = bridge,
  warm-400 = trust-strip, warm-500 = hairline). Document the alternation
  recipe per page-type in `design-system/recipes/`.

### R8 · Three-doc handover contract (`STATUS · HANDOVER · README`)
- **Where:** v02 ships these three only. v01 ships them plus 3 archaeology docs
  + a `guidelines/` dir which v02 strips per anti-bloat.
- **Why:** Tech team only needs three things: project state, contract,
  run-locally. Migration archaeology is a design-folder concern.
- **How to port:** Already enforced via workspace `templates/`. Re-affirm in
  any new DS guidance doc.

---

## REJECT — 4 anti-patterns to NOT carry forward

### X1 · Hardcoded hex inside RGBA literals (escape from token build)
- **Where:**
  - `BenchmarkHeroBanner.tsx:549` — `rgba(176, 31, 36, 0.65)` (Featured badge bg)
  - `BenchmarkHeroBanner.tsx:550` — `rgba(176, 31, 36, 0.8)` (Featured badge border)
  - `BenchmarkActiveFilters.tsx:30-39` — 8 rgba pairs hardcoded
  - `BenchmarkHeroBanner.tsx:495-509` — `rgba(255,255,255,0.03)` ... `rgba(255,255,255,0.18)` (carousel surface bg states)
  - `BenchmarkCard.tsx` thumbnail gradient overlays
  - `BenchmarkStatsStrip.tsx:45` — `rgba(0,0,0,0.12)` (divider)
- **Why reject:** breaks token-build canonicalisation. If brand-red changes,
  these don't follow. If we add a high-contrast mode, these are invisible to
  the alt-token pipeline.
- **Workspace acknowledgement:** STATUS v02 L32 + HANDOVER v02 L130 explicitly
  flag this as a systemic DS gap. `docs/LEARNINGS.md` tracks it.
- **How to handle:** New DS must expose **rgba-friendly tokens** — e.g.
  `--brand-red-rgb: 176 31 36;` consumed as `rgba(var(--brand-red-rgb) / 0.65)`.
  Same for `--black-rgb`, `--white-rgb`. Add a lint rule rejecting literal
  rgba/rgb in component files.

### X2 · Dead-code carry-over from fork-by-copy
- **Where:** ~20 files in `src/app/components/` not imported by the page —
  `useReportFilters.ts`, `MobileFilterSheet.tsx`, `ListingToolbar.tsx`, `Globe.tsx`,
  `RecommendedForYou.tsx`, `AnalystPicks.tsx`, etc. (full list in
  `differences-from-report-store.md` §6).
- **Why reject:** discoverability anti-pattern. Fresh reader can't tell what's
  on this page without reading App.tsx. Tree-shake nukes them in prod but they
  bloat the design-time mental model.
- **How to handle:** New DS pages should be **scaffolded by deletion** —
  start from an empty `src/app/components/`, only copy components that the
  page actually imports. Or: import shared atoms from a DS package, never copy.

### X3 · Stale unused deps from template-clone
- **Where:** `package.json` carries `@react-three/drei`, `@react-three/fiber`,
  `three`, `three-globe`, `cobe`, `recharts`, `embla-carousel-react`,
  `react-slick`, `react-dnd`, `@mui/material`. None used by the listing page.
- **Why reject:** install-time + audit-time cost (security audits, license
  audits, supply-chain risk). Per workspace anti-bloat, deps used only by the
  template scaffold should be pruned at fork time.
- **How to handle:** **Dep prune step** in the fork-from-template recipe. Or:
  ship the template with a `tools/prune-unused-deps.sh` script.

### X4 · Two co-existing filter hooks with name collision
- **Where:** `src/app/components/hooks/useReportFilters.ts` (inherited from RS)
  AND `src/app/components/hooks/useBenchmarkFilters.ts` (active). The page
  uses the latter; the former is dead code.
- **Why reject:** confuses anyone reading the folder. "Which is canonical?"
- **How to handle:** When forking a hook, **rename or delete the parent**, do
  not keep both. Even simpler: have one canonical `useFacetedListing` hook in
  the DS that accepts a config object describing dimensions, surfaces, and
  sort options.

---

## MODIFY — 5 ideas to keep, with redesign

### M1 · Hero with 4 in-file variants
- **What's good:** Designer-team A/B/C/D comparison without separate branches.
- **What's broken:** 795-LOC file. Variants share atoms (EyebrowPill, StatsRow,
  LeftContent, CTARow) but each variant function (HeroVariantA/B/C/D) re-declares
  ~60–120 LOC of layout.
- **Modify how:** Extract variants to separate files (`HeroVariantA.tsx` etc.)
  imported into a thin orchestrator. Shared atoms become DS molecules.
  Result: 4 × ~120-LOC files + 60-LOC orchestrator, easier to diff per-variant.
- **Cited:** `BenchmarkHeroBanner.tsx` (whole file, 795 LOC, line counts above).

### M2 · `BenchmarkActiveFilters` color-coded chip strip
- **What's good:** color-coded TYPE+value+✕ chip pattern (see R4).
- **What's broken:** color tuples are hardcoded rgba literals (see X1).
- **Modify how:** Port the *pattern* (DS primitive `<FilterChip type=… />`) and
  let DS tokens drive the colors:
  `--chip-bg-industry`, `--chip-border-industry`, etc.
- **Cited:** `BenchmarkActiveFilters.tsx:30-39`.

### M3 · `deriveCountry()` / `deriveTags()` heuristics over title strings
- **What's good:** Lets the mock-data ship with rich filterable dimensions
  without bloating the seed-array schema.
- **What's broken:** Heuristic over string content is brittle, and HANDOVER v02
  L99 explicitly flags real API should return `country`/`tags[]` directly.
- **Modify how:** **Reject for prod**, keep as a documented mock-only pattern
  for the design-phase. Add a TODO + a runtime warning so any non-mock callers
  scream. Or: ship the mock-data with the fields filled in directly (cheap).
- **Cited:** `useBenchmarkFilters.ts:18` (import) · v02 HANDOVER L99.

### M4 · `MIGRATION_LOG.md` archaeology
- **What's good:** Phase 0–4 record of every token rename + every component
  migrated. Invaluable for understanding DS evolution.
- **What's broken:** Lives only inside v01 — gets nuked on every "ready-for-tech"
  freeze. Re-running same migration on next fork re-creates from scratch.
- **Modify how:** Migration logs should live in **workspace `docs/`**, not
  per-project. Adopt a `docs/MIGRATIONS/2026-03-01_ds-26_report-store.md` naming
  scheme. Per-project `MIGRATION_LOG.md` files reference up to the workspace log.

### M5 · `import.meta.env.DEV`-gated design affordances
- **What's good:** `SubtleVariantSwitcher` only shows in DEV — clean pattern.
- **What's broken:** No DS guidance exists for *which* affordances are
  dev-gated and *how* they should be styled (`SubtleVariantSwitcher` styled
  ad-hoc — could conflict with a future affordance).
- **Modify how:** Codify a **`DesignAffordance` DS primitive** — wrapper that
  enforces `import.meta.env.DEV` + applies a "design-only" visual shell
  (subtle dotted border, dev-tag label) so the affordance is unambiguously
  dev-mode UI. Add a `prod-build-smoke-test` to verify it's stripped.

---

## Quick scorecard for the new DS port

| Category | Counts |
|---|---|
| Patterns to replicate | 8 |
| Anti-patterns to reject | 4 |
| Patterns to keep with redesign | 5 |
| Net DS gain | Strong — listing-page recipe ~80% ready to harden |

The competition-benchmarking pair is a **net asset** for the new DS:
8 replicable patterns vs 4 rejects + 5 modifies. The biggest single risk is
**X1 (escaped hex in rgba)** — solving that at the token-build level unblocks
a wholesale port of the chip-color and surface-state systems.

---

## Sources cited
- `projects/competition-benchmarking-listing-v01/src/app/App.tsx:5-14,102`
- `projects/competition-benchmarking-listing-v01/src/app/components/BenchmarkHeroBanner.tsx:42-47,431-440,495-509,549-550`
- `projects/competition-benchmarking-listing-v01/src/app/components/BenchmarkCard.tsx:5-22,36-78`
- `projects/competition-benchmarking-listing-v01/src/app/components/BenchmarkActiveFilters.tsx:30-39`
- `projects/competition-benchmarking-listing-v01/src/app/components/BenchmarkFilterSidebar.tsx:5-17,67`
- `projects/competition-benchmarking-listing-v01/src/app/components/BenchmarkStatsStrip.tsx:9-15,45`
- `projects/competition-benchmarking-listing-v01/src/app/components/hooks/useBenchmarkFilters.ts:18,103,139-144,221-234`
- `projects/competition-benchmarking-listing-v02/STATUS.md:32`
- `projects/competition-benchmarking-listing-v02/HANDOVER.md:99,127,129-130`
- workspace `docs/LEARNINGS.md` (hex anti-pattern tracking)

**Word count:** ~1,500.
