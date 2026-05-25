# CardListing — Organism Audit (OG)

**Source:** `Design_system_vs_26 (og and final)/src/app/components/organisms/CardListing.tsx` (148 LOC)
**Reuse tier:** ⭐⭐⭐⭐⭐ (5/5) — the listing-mode catalog organism
**Status:** Functional but RS-specific · hard-typed to ReportItem · should be generic-typed like BrowseGrid

---

## 1. WHAT

Card grid/list with **pagination · skeleton loading · empty state**. Per OG JSDoc (L1–12): *"WHAT: Card grid/list with pagination, skeleton loading, and empty state. WHY: Extracted from ReportStoreListingDemoContent to make the card display area a reusable, composable organism."* The listing-mode counterpart to BrowseGrid (which has no pagination).

---

## 2. WHY

- Listing pages (filtered results) need pagination · BrowseGrid doesn't have it · CardListing fills that gap
- Pagination separation prevents 200-line listing-demo files from re-implementing the same paginator
- Skeleton loading + EmptyState fallback baked-in — async data UX handled at organism layer
- Receives `paginated` slice from parent (consumer paginates · CardListing renders) — keeps pagination logic externalizable for URL-sync or server pagination
- Numbered pagination + prev/next chevrons = standard pattern · brand-consistent w/ DS tokens

---

## 3. WHEN to use ✅

- Main content area of any Listing page (filtered results · search results)
- When pagination is required (10+ items typical · `PAGE_SIZE` from data.ts)
- When you need integrated empty-state w/ "Clear filters" action
- Skeleton-loading visible during data fetch
- Wrap inside `ListingToolbar` + `FiltersPanel` layout

---

## 4. WHEN NOT to use ❌

- Catalog browse w/o pagination → use `BrowseGrid`
- Carousel of curated items → use `FeaturedCarousel`
- Comparison data → use `ComparisonTable`
- Infinite-scroll patterns → CardListing doesn't support (pagination only)
- Cards other than ReportCard → currently hard-typed (anti-pattern · should be generic)

---

## 5. WHERE used (consumer file:line)

- `Design_system_vs_26.../src/app/components/ReportStorePage.tsx:156–166` — LISTING MODE main content
- `Design_system_vs_26.../src/app/components/organisms/index.ts:33` — barrel export
- `projects/report-store-legacy/src/app/components/CardListing.tsx` — port
- `projects/competition-benchmarking-listing-v02/src/app/components/CardListing.tsx` — port
- `projects/reports-pdp-v2/src/components/sections/CompetitorComparisonTable.tsx` — partial reuse pattern

---

## 6. HOW to implement

```tsx
import { CardListing } from '@/app/components/organisms';
import { useReportFilters } from '@/app/hooks/useReportFilters';

const filters = useReportFilters();
const [loading, setLoading] = useState(false);
const [viewMode, setViewMode] = useState<ViewMode>('grid');

<CardListing
  items={filters.filtered}            // full filtered set (for count display)
  paginated={filters.paginated}       // current-page slice (what's rendered)
  viewMode={viewMode}
  loading={loading}
  currentPage={filters.currentPage}
  totalPages={filters.totalPages}
  onPageChange={(page) => {
    filters.handlePageChange(page);
    setLoading(true);
    setTimeout(() => setLoading(false), 800);
  }}
  onClearFilters={filters.clearAllFilters}
/>
```

---

## 7. Composition tree

```
CardListing (<div className="mt-4">)
├─ Loading branch (L50–55)
│  └─ N × SkeletonCard (N = PAGE_SIZE from data.ts)
├─ Empty branch (L56–67)
│  └─ EmptyState (title · description · action=<Button onClick={onClearFilters}>)
├─ Populated branch (L68–86)
│  └─ paginated.map → ReportCard layout={viewMode}
└─ Pagination row (L89–145 · conditional · !loading && items.length > 0 && totalPages > 1)
   ├─ "Showing X–Y of Z" text (L94–96)
   └─ Page-button row
      ├─ ChevronLeft button (prev · disabled at page 1)
      ├─ Array.from({ length: totalPages }) → numbered buttons
      └─ ChevronRight button (next · disabled at totalPages)
```

**Atoms:** `Button` · `ChevronLeft` · `ChevronRight` (lucide)
**Molecules:** `ReportCard` · `SkeletonCard` · `EmptyState`
**Types:** `ViewMode` · `ReportItem` · `PAGE_SIZE` (from data.ts)

---

## 8. Properties · WHY each exists

| Prop | Type | Default | Why |
|---|---|---|---|
| items | ReportItem[] (required) | — | Full filtered set · used for count display + empty-check |
| paginated | ReportItem[] (required) | — | Current-page slice · what actually renders |
| viewMode | ViewMode (required) | — | Grid/list controlled by parent (toolbar) |
| loading | boolean (required) | — | Skeleton-state toggle |
| currentPage | number (required) | — | Current page (1-indexed) |
| totalPages | number (required) | — | Total page count |
| onPageChange | (page: number) => void (required) | — | Pagination handler |
| onClearFilters | () => void? | — | EmptyState action button handler · optional |

**No `renderCard` prop · hard-coded to render `ReportCard`** — this is the biggest design flaw vs BrowseGrid's generic render-prop. To use CardListing with SurveyItem or any other type → must fork.

---

## 9. Data contract

```ts
import type { ReportItem } from '@/app/components/data';
import type { ViewMode } from '@/app/components/ViewToggle';

interface CardListingProps {
  items: ReportItem[];
  paginated: ReportItem[];
  viewMode: ViewMode;
  loading: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onClearFilters?: () => void;
}
```

**Hooks pattern (parent owns):** `useReportFilters()` returns `{ filtered, paginated, currentPage, totalPages, handlePageChange, clearAllFilters }`. CardListing is a dumb renderer · parent owns state.

---

## 10. States

- **Loading:** grid of N SkeletonCards (N = PAGE_SIZE)
- **Empty (items=[] · !loading):** EmptyState w/ optional Clear-Filters button
- **Populated:** paginated grid of ReportCards
- **Single page (totalPages ≤ 1):** pagination hidden
- **First page:** Prev button disabled (`opacity-25 cursor-not-allowed`)
- **Last page:** Next button disabled
- **Mid-page:** all controls active · current page-number has black-bg highlight

---

## 11. Variants

By `viewMode`: grid (3-col responsive) / list (vertical stack)

Grid layout (L44–46):
- grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5`
- list: `flex flex-col gap-3`

---

## 12. Responsive behavior

- Grid: 1 col mobile → 2 col md → 3 col lg
- Pagination row: `flex items-center justify-between` (L91) — horizontal at all breakpoints
- Pagination buttons: fixed 32×32px (w-8 h-8) · don't scale w/ breakpoint
- "Showing X of Y" text wraps if narrow

---

## 13. Tokens used

✅ Strong token usage:
- `var(--text-xs)` (L94, 119) — pagination + count text
- `var(--radius-element)` (L103, 118, 134) — button border-radius

⚠️ Inline rgba (should be tokens):
- `rgba(0,0,0,0.06)` — pagination row top-border (L92)
- `rgba(0,0,0,0.08)` · `rgba(0,0,0,0.04)` — button borders
- `rgba(0,0,0,1)` · `rgba(255,255,255,1)` — active page bg/text
- `rgba(0,0,0,0.4)` — disabled chevron color

---

## 14. A11y rules

✅ ChevronLeft / ChevronRight buttons have `disabled` attribute (real disabled state · L101, 131)
✅ Pagination is keyboard-tabbable (real `<button>` elements)
✅ "Showing X–Y of Z" provides count summary (L94)

❌ No `aria-current="page"` on active page button (L113–128)
❌ No `aria-label="Page X"` on numbered buttons (just text "1", "2", ... — fine but verbose for SR)
❌ No `<nav aria-label="Pagination">` wrapping pagination row (L97)
❌ Pagination as a whole has no group label
❌ EmptyState branch — relies on EmptyState molecule a11y (deferred)

---

## 15. Motion rules

- Pagination button hover: `transition-all` (L101, 131) — no specific properties listed (transitions everything)
- ChevronLeft/Right disabled state: opacity 25% (no animation)
- No section-level entrance animation

---

## 16. Anti-patterns ❌

- ❌ **Hard-typed to ReportItem** — can't use with SurveyItem · IndustryItem · etc. Should be generic `<T>` w/ `renderCard` like BrowseGrid
- ❌ No `renderCard` prop — even though ReportCard is the only card, the generic capability is needed
- ❌ Imports `PAGE_SIZE` from data.ts as a magic constant — should be a prop (`pageSize`) for consumer flexibility
- ❌ Hard-coded to render ReportCard inline (L72–84) — 12 props passed individually instead of `...spread`
- ❌ All pagination numbers rendered at once (L112–128) — for high totalPages count (100+) this creates 100+ DOM nodes · should ellipsize ("1 ... 5 6 7 ... 100")
- ❌ Pagination doesn't sync to URL · scroll to top of list after page change not handled
- ❌ Inline rgba should be tokenized
- ❌ Two different pagination button styles (active vs inactive) defined inline — should be a `<PaginationButton>` atom

---

## 17. REUSABILITY SCORE

**5/5 ⭐⭐⭐⭐⭐** for the pattern · **3/5 in practice** because hard-typed to ReportItem. After generic refactor → 5/5.

---

## 18. Linked components

- **Atoms:** `Button` · lucide chevrons
- **Molecules:** `ReportCard` · `SkeletonCard` · `EmptyState`
- **Companion organisms:** `ListingToolbar` (above) · `FiltersPanel` (sidebar) · `IndustrySidebar` (sidebar wrapper)
- **Parent template:** `ReportStorePage` (LISTING MODE)
- **Hooks:** `useReportFilters` (parent-owned)
- **Type imports:** `ReportItem` · `ViewMode` · `PAGE_SIZE` (data.ts)
- **Alternative:** `BrowseGrid` (no pagination · home/landing version)

---

## 19. Composition rule (in a page recipe)

**ReportStorePage LISTING MODE (L119–168):**

```
IndustryFocusBanner            (conditional · selected industry context)
├─ left column: IndustrySidebar
│   └─ FiltersPanel (industries · tags · regions · year)
└─ right column:
    ├─ ListingToolbar          (back · count · view-toggle · sort · mobile-filter)
    ├─ ActiveFilterChipBar     (active filter chips · clear-all)
    └─ CardListing             ← THIS · main content
        └─ MobileFilterSheet   (overlay · mobile-only)
```

**Before:** ActiveFilterChipBar (chips of active filters)
**After:** nothing (CardListing is last in the listing main content)
**Bg-alternation:** Listing mode is all-white surface · no bg-flip needed mid-content.

---

## 20. Reasons + Decisions log

- **Why extracted from `ReportStoreListingDemoContent` into an organism?** Per OG JSDoc L7–9: *"Extracted from ReportStoreListingDemoContent to make the card display area a reusable, composable organism."* — Explicit refactor to enable reuse + reduce listing-demo file size.
- **Why separate `items` and `paginated` props?** `items` is the full filtered count (drives empty-check + count summary) · `paginated` is the slice rendered. Splitting keeps the prop API explicit about responsibilities.
- **Why hard-typed to ReportItem?** Quick refactor decision · not yet generalized. **Generic-T refactor is the next step.**
- **Why no `renderCard` prop?** Same — quick extraction · should match BrowseGrid pattern.
- **Why PAGE_SIZE constant from data.ts?** Per-page count was a demo-data assumption (probably 6 or 9 reports per page). Should be a prop.
- **Why inline ReportCard prop-by-prop instead of spread?** Possibly for explicit type-safety check (passes only known fields) · could be `...report` with proper typing.
- **Why pagination at all-numbers no ellipsis?** Demo has small dataset (totalPages typically ≤ 10) · ellipsis ("1 ... 5 6 7 ... 100") is needed at production scale.
- **Why 32×32px pagination buttons?** Matches touch-target floor (32 is below WCAG 44 floor · only acceptable because it's mid-density toolbar context · debatable).
- **Why grid `gap-5` not `gap-6` (like BrowseGrid)?** Listing-mode is denser than browse-mode · 5 (20px) vs 6 (24px) gap — subtle but intentional density tier.
- **Why `borderRadius: 'var(--radius-element)'` inline style not className?** Token used inline · same pattern across CardListing/ListingToolbar/FiltersPanel — consistency w/in listing-mode organisms. Should converge to className utilities long-term.

---

**Audit conclusion:** Solid pattern · needs generic-T refactor to match BrowseGrid quality. Port to core-v2 w/ 5 fixes: (1) generic `<T extends { id: string }>` + `renderCard` prop · (2) `pageSize` as prop · (3) ellipsis pagination · (4) `aria-current="page"` + `<nav aria-label="Pagination">` · (5) extract `<PaginationButton>` atom. Estimated effort: 4 hours.
