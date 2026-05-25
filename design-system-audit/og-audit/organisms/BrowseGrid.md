# BrowseGrid — Organism Audit (OG)

**Source:** `Design_system_vs_26 (og and final)/src/app/components/organisms/BrowseGrid.tsx` (110 LOC)
**Reuse tier:** ⭐⭐⭐⭐⭐ (5/5) — generic-typed cross-pillar grid · most-composable OG organism
**Status:** Best-shaped organism in OG · generic T type · controlled/uncontrolled view-mode · port-ready (model template)

---

## 1. WHAT

Reusable card grid/list section: SectionHeading + ViewToggle + Card/Skeleton grid. Accepts generic items with a `renderCard` function so both Report Store and Surveys can plug in their own card components. (BrowseGrid.tsx:1–9 JSDoc verbatim: *"Component Triad section: SectionHeading + ViewToggle + Card/Skeleton grid"*)

---

## 2. WHY

- Catalogs need a browse surface that handles grid OR list view + loading + empty + controlled view-state
- Generic `<T extends { id: string }>` + `renderCard(item, viewMode)` render-prop = ANY data shape works (anti-fork pattern)
- ViewToggle (grid/list) is a Ken-signature interaction — must be everywhere catalog browsing happens
- Controlled/uncontrolled view-mode = consumer can lift state (e.g. URL-sync) OR let organism own it
- Skeleton loading + EmptyState fallback baked-in = consumer doesn't reimplement loading UX per pillar
- Cross-pillar: Report Store · Surveys · future Datasets all use same BrowseGrid w/ pillar-specific cards

---

## 3. WHEN to use ✅

- Zone 5 of any Product page (the catalog browse section)
- Search-result pages
- Filtered listing pages
- Anywhere user must browse N items w/ grid/list toggle
- Pages w/ async data + skeleton-loading need
- "View all X" landing surfaces

---

## 4. WHEN NOT to use ❌

- Single hero item → use bespoke card
- 1-3 items → use simple grid w/o ViewToggle overhead
- Tabular comparison data → use `ComparisonTable` organism
- When pagination is needed → use `CardListing` organism (BrowseGrid has no pagination)
- When sort + filter toolbar needed → pair w/ `ListingToolbar` separately (BrowseGrid doesn't include sort)
- Carousel of curated items → use `FeaturedCarousel`

---

## 5. WHERE used (consumer file:line)

- `Design_system_vs_26.../src/app/components/organisms/ProductPageTemplate.tsx:81` — Zone 5 (Browse)
- (Not wrapped by other OG organisms — used directly via template)

---

## 6. HOW to implement

```tsx
import { BrowseGrid } from '@/app/components/organisms';
import { ReportCard } from '@/app/components/molecules/ReportCard';
import type { ReportItem } from '@/app/components/data';

// Uncontrolled view-mode · loading false
<BrowseGrid<ReportItem>
  label="Browse"
  title="All reports"
  subtitle="2,400+ reports across 28 industries"
  items={reports}
  renderCard={(report, viewMode) => (
    <ReportCard {...report} layout={viewMode} />
  )}
  countLabel="reports"
/>

// Controlled · async loading
const [viewMode, setViewMode] = useState<ViewMode>('grid');
const [loading, setLoading] = useState(true);

<BrowseGrid<ReportItem>
  label="Filtered"
  title="Results"
  items={filtered}
  loading={loading}
  viewMode={viewMode}
  onViewModeChange={setViewMode}
  renderCard={(r, mode) => <ReportCard {...r} layout={mode} />}
  renderSkeleton={(i, mode) => <SkeletonCard key={i} variant={mode} />}
  skeletonCount={6}
  countLabel="reports"
/>

// 2-column grid · warm bg · custom empty fallback
<BrowseGrid<SurveyItem>
  label="Surveys"
  title="Consumer research"
  items={surveys}
  renderCard={(s, m) => <SurveyCard {...s} layout={m} />}
  columns={2}
  background="warm"
/>
```

---

## 7. Composition tree

```
BrowseGrid
└─ SectionWrapper (background · spacing="lg" · maxWidth="wide")  (L79)
   └─ inner (max-w-1000px · mx-auto · px-4/6/8)  (L80)
      ├─ Header row (flex items-start justify-between · mb-8)  (L81)
      │  ├─ SectionHeading (label · title · subtitle)  (L82–86)
      │  └─ ViewToggle (viewMode · onChange · count · countLabel)  (L88–93)
      └─ Grid OR list container (L96–105)
         ├─ if loading → N × SkeletonCard (or custom renderSkeleton)
         └─ else → items.map(renderCard(item, viewMode))
```

**Atoms:** `SectionWrapper` · `SectionHeading` · `ViewToggle`
**Molecules:** `SkeletonCard` (default skeleton)
**Render-props:** `renderCard`, `renderSkeleton`

---

## 8. Properties · WHY each exists

| Prop | Type | Default | Why |
|---|---|---|---|
| label | string | — | SectionHeading kicker |
| title | string | — | H2 |
| subtitle | string? | — | Context |
| items | T[] | — | Generic typed data array |
| renderCard | (item, viewMode) => ReactNode | — | Consumer-provided card renderer · gets current view-mode for variant switching |
| renderSkeleton | (index, viewMode) => ReactNode? | undefined | Custom skeleton · defaults to `<SkeletonCard variant={viewMode} />` |
| skeletonCount | number | 6 | How many skeletons render during loading |
| countLabel | string? | — | Plural noun for ViewToggle count ("reports", "surveys") |
| loading | boolean | false | Controlled loading state |
| background | 'white' \| 'warm' \| 'black' | 'white' | Surface |
| columns | 2 \| 3 | 3 | Grid columns at lg+ |
| viewMode | ViewMode? | undefined | Controlled view-mode (override internal state) |
| onViewModeChange | (mode) => void? | — | Callback when view-mode changes |
| className | string? | — | Wrapper override |

**Generic constraint:** `<T extends { id: string }>` — items MUST have `id` field (used as React key implicitly via consumer renderCard typically).

---

## 9. Data contract

```ts
import type { ViewMode } from '@/app/components/ViewToggle';

export interface BrowseGridProps<T> {
  label: string;
  title: string;
  subtitle?: string;
  items: T[];
  renderCard: (item: T, viewMode: ViewMode) => ReactNode;
  renderSkeleton?: (index: number, viewMode: ViewMode) => ReactNode;
  skeletonCount?: number;
  countLabel?: string;
  loading?: boolean;
  background?: 'white' | 'warm' | 'black';
  columns?: 2 | 3;
  viewMode?: ViewMode;
  onViewModeChange?: (mode: ViewMode) => void;
  className?: string;
}

// Generic constraint:
export function BrowseGrid<T extends { id: string }>(props: BrowseGridProps<T>): JSX.Element;
```

**Controlled vs uncontrolled view-mode pattern** (L59–72):
- If `viewMode` prop provided + `onViewModeChange` → controlled (consumer owns state)
- If neither → uncontrolled (internal `useState`)

Consumer responsibility: provide `items` + `renderCard` · optionally control view-mode for URL-sync · DS owns grid/list switch, loading, EmptyState (when items=[]).

---

## 10. States

- **Default (items present · loading=false):** grid/list of renderCard outputs
- **Loading:** N skeletons (default 6 · `skeletonCount` configurable)
- **Empty (items=[] · loading=false):** ❌ **bug** — actually renders empty grid not EmptyState. Per OG code at L96–104, if loading=false and items=[] → ternary doesn't catch empty case · just renders `items.map()` → empty array → empty grid. EmptyState is NOT rendered. Compare CardListing.tsx:56–67 which DOES handle empty correctly.
- **View-mode switch (grid → list):** Grid class changes from `grid grid-cols-X` to `flex flex-col gap-4` (L74–76, 96)

---

## 11. Variants

By `background`: white (default) / warm / black
By `columns`: 2 / 3 (default)
By `viewMode`: grid / list (toggle-controlled)
By `loading`: skeleton state vs populated state

Generic typing variants:
- `<BrowseGrid<ReportItem>>`
- `<BrowseGrid<SurveyItem>>`
- `<BrowseGrid<IndustryItem>>`
- Any data shape with `id`

---

## 12. Responsive behavior

- **Grid mode `columns=3`:** `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6` (L75–77)
- **Grid mode `columns=2`:** `grid-cols-1 md:grid-cols-2 gap-6`
- **List mode:** `flex flex-col gap-4` at all breakpoints (L96)
- Padding: `px-4 sm:px-6 md:px-8` (L80)

---

## 13. Tokens used

✅ Inherited via SectionWrapper · SectionHeading · ViewToggle · SkeletonCard
⚠️ `gap-6` (grid) and `gap-4` (list) raw — should be `--space-card-gap-grid` / `--space-card-gap-list`
⚠️ `mb-8` header→grid spacing — should be tokenized

---

## 14. A11y rules

✅ SectionHeading → H2
✅ ViewToggle is a real toggle widget (deferred to atom audit)
✅ Cards rendered via consumer renderCard (consumer responsibility)
✅ Generic typed items prevent stringly-typed bugs

❌ No `role="region"` / `aria-labelledby` on grid container
❌ Empty-state missing entirely · screen readers see "0 reports" via ViewToggle count then empty void
❌ Loading state has no `aria-busy` / `aria-live`
❌ View-mode change has no announcement (`aria-live="polite"` on container would help)

---

## 15. Motion rules

- No section-level entrance animation
- View-mode switch is instant (no transition between grid/list layout — CSS swap)
- Skeleton shimmer: per SkeletonCard molecule
- **Reduced-motion:** no built-in handling at organism layer

---

## 16. Anti-patterns ❌

- ❌ **Missing EmptyState** when items=[] and loading=false (the big bug · see State 10)
- ❌ No pagination — for pages that need it, use `CardListing` instead (or extend BrowseGrid)
- ❌ No sort/filter integration — needs paired `ListingToolbar` (organism-organism coupling)
- ❌ No `key` provided to consumer's renderCard — consumer must remember to put `key` on returned card
- ❌ Header `mb-8` hard-coded — should be tokenized
- ❌ Skeleton default count 6 — magic number · should be configurable per breakpoint

---

## 17. REUSABILITY SCORE

**5/5 ⭐⭐⭐⭐⭐** — **model organism in OG**: generic-typed · render-props · controlled/uncontrolled toggle · loading state · cross-pillar. After bug-fix (empty-state) → perfect 5/5 in practice.

---

## 18. Linked components

- **Parent template:** `ProductPageTemplate` (Zone 5)
- **Companion organisms (for full catalog UX):** `ListingToolbar` (sort/filter above) · `FiltersPanel` (sidebar) · `CardListing` (alternate w/ pagination)
- **Atoms:** `SectionWrapper` · `SectionHeading` · `ViewToggle`
- **Molecules:** `SkeletonCard` · consumer-provided card (ReportCard / SurveyCard / etc.)
- **Types:** `ViewMode` (from `@/app/components/ViewToggle`)
- **Should-link:** `EmptyState` molecule (currently MISSING in render path — bug)

---

## 19. Composition rule (in a page recipe)

**ProductPageTemplate order:**

```
Zone 1: ProductHero       (black)
Zone 2: FeaturedCarousel  (white)
Zone 3: StatsRow          (warm)
Zone 5: BrowseGrid        (white)  ← main browse · default white surface
Zone 8: CTABanner         (black)
```

**Before:** StatsRow (warm) or after-stats slot · white bg-flip
**After:** CTABanner (black · final)
**Alternate composition:** if page = listing (filtered) → BrowseGrid is replaced by `ListingToolbar` + sidebar `FiltersPanel` + `CardListing` (with pagination). See `ReportStorePage.tsx:119–167` LISTING MODE.

---

## 20. Reasons + Decisions log

- **Why generic typed?** OG comment L46–47 generic `<T extends { id: string }>` — explicit type-safety decision. Forces id-uniqueness contract.
- **Why render-prop not children?** Cards need per-render view-mode info (grid vs list layout differ). children would only work for single-shape cards. Render-prop = ergonomic + type-safe.
- **Why controlled-or-uncontrolled view-mode?** Common React pattern · supports URL-sync (controlled · e.g. `?view=list`) and standalone use (uncontrolled · DS owns). Per L59–72 explicit fork.
- **Why default 6 skeletons?** Matches typical 2×3 grid first-fold · gives sense of "loading more than visible" without overwhelming.
- **Why `flex flex-col` for list mode?** List mode is single-column stack regardless of breakpoint · simpler than grid-cols-1.
- **Why `gap-6` grid · `gap-4` list?** Grid cards are denser, need more breathing · list cards stack tightly. Visual rhythm tuned to layout.
- **Why no built-in EmptyState?** **Bug · oversight.** Comment in CardListing shows the intended pattern · should be ported here. Possibly was deferred to consumer renderCard returning [] handling (which doesn't actually work via .map).
- **Why `<T extends { id: string }>` constraint?** Forces consumer to think about identity · prevents accidental array-index keys. ID is also the contract assumption for renderCard-returned key prop.
- **Why `countLabel` separate from `items.length`?** Plural noun ("reports" vs "surveys") is content-config not data-shape · keeps ViewToggle text label flexible across pillars.
- **Why columns max 3 (not 4)?** Cards in BrowseGrid are richer than StatCards · 4-col cramps card content at lg. 3-col is the optimal density for typical card width.

---

**Audit conclusion:** Best-shaped organism in OG · model for future organisms. ONE bug to fix: render `<EmptyState>` when `items=[]` and `!loading`. After fix, port verbatim to core-v2 · token sweep on gap/spacing values.
