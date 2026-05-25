# LoadMoreSentinel — Molecule Audit (OG DS v4.3)

> **Source:** `Design_system_vs_26 (og and final)/src/app/components/molecules/LoadMoreSentinel.tsx:28-84`
> **OG comment (line 1-10):** *"LoadMoreSentinel — Molecule (DS v4.3). WHAT: Invisible trigger element for infinite scroll + loading indicator. WHY: Pairs with useProgressiveLoad hook to provide a visual 'loading more' indicator at the bottom of progressively-loaded lists. WHEN: Below the last visible card in any infinite-scroll list/grid. HOW: Renders a ref-target div (observed by IntersectionObserver) plus an optional loading spinner/skeleton row."*

---

## 1. WHAT
A two-part footer for infinite-scroll lists:
1. An invisible 1px `<div>` (the **sentinel**) attached to a consumer-supplied ref — observed by an IntersectionObserver owned by `useProgressiveLoad` hook.
2. A visible loading indicator: three pulsing dots + a "X of Y" count, OR a "Showing all N" final-state message when fully loaded.

## 2. WHY
- **Separates "trigger" from "indicator"** — the same molecule serves both: scroll trigger (sentinel) and visual feedback (dots).
- **Three logical states in one component** (line 36-48): "more to load", "loading right now", "all loaded — show final count". Caller doesn't manage three components.
- **Pairs with `useProgressiveLoad` hook** — molecule is the visual half; hook owns the IntersectionObserver. Decoupled.
- **Final-state footer** ("Showing all N results") gives definitive feedback that there's no more content — closes the scroll loop.

## 3. WHEN to use ✅
- Bottom of any progressively-loaded list/grid (Report Store, search results, surveys list) · `ReportStoreOrganismsShowcase.tsx:383`
- Below the last `<CardListing>` page
- Any place using `useProgressiveLoad` (hook contract)

## 4. WHEN NOT to use ❌
- Paginated lists with explicit "Next page" buttons → use a `Pagination` atom
- Lists with <50 items where all load at once → unnecessary
- Modals with their own scroll container → IntersectionObserver complexity inside scroll containers; verify the hook handles `root`
- Outside `useProgressiveLoad` integration — `sentinelRef` contract requires the hook
- Vertical-only lists — sentinel is a `h-px w-full` div; horizontal scroll needs different sentinel

## 5. WHERE used (file:line)
- `components/ReportStoreOrganismsShowcase.tsx:383` — primary showcase

## 6. HOW to implement

```tsx
import { LoadMoreSentinel } from '@/app/components/molecules/LoadMoreSentinel';
import { useProgressiveLoad } from '@/app/hooks/useProgressiveLoad';

const { visibleItems, sentinelRef, hasMore, loading } = useProgressiveLoad(reports, 12);

return (
  <>
    <div className="grid grid-cols-3 gap-6">
      {visibleItems.map(r => <ReportCard key={r.id} {...r} />)}
    </div>
    <LoadMoreSentinel
      sentinelRef={sentinelRef}
      hasMore={hasMore}
      loading={loading}
      visibleCount={visibleItems.length}
      totalCount={reports.length}
    />
  </>
);
```

## 7. Composition tree
- Either: nothing (if `!hasMore && !loading && visibleCount<totalCount`)
- Or: "Showing all N" footer (final state)
- Or:
  - Invisible sentinel `<div ref={sentinelRef} h-px w-full aria-hidden>`
  - Loading row: 3 pulsing dots + "X of Y" count

**Atoms consumed:** none.
**Hooks:** none directly; depends on consumer's `useProgressiveLoad`.

## 8. Properties

| Prop | Type | Default | WHY |
|---|---|---|---|
| `sentinelRef` | `RefObject<HTMLDivElement\|null>` | — (required) | Provided by useProgressiveLoad — observed by IO |
| `hasMore` | boolean | — (required) | Drives render decision |
| `loading?` | boolean | `false` | If true, keep showing dots even when hasMore false (in-flight) |
| `visibleCount?` | number | — | For "X of Y" label |
| `totalCount?` | number | — | For "X of Y" label and "Showing all N" final |
| `className?` | string | `""` | Pass-through |

## 9. Data contract

```ts
interface LoadMoreSentinelProps {
  sentinelRef: React.RefObject<HTMLDivElement | null>;
  hasMore: boolean;
  loading?: boolean;
  visibleCount?: number;
  totalCount?: number;
  className?: string;
}
```

**Where data comes from:** `useProgressiveLoad` hook returns these.

## 10. States
- **More to load** (`hasMore=true`): sentinel + 3 dots + count.
- **Loading in-flight** (`loading=true`): sentinel + dots (even if hasMore just became false mid-fetch).
- **All loaded with totals** (`!hasMore && !loading && visibleCount>=totalCount`): "Showing all N results" final footer.
- **All loaded silent** (`!hasMore && !loading && !visibleCount`): `return null` — no footer.

## 11. Variants
None at prop level. State is the variant.

## 12. Responsive behavior
- Full-width content; no breakpoint logic.
- Dots are 6px each; visible at any zoom level.

## 13. Tokens used
- `var(--text-xs)` count label
- Inline rgba: `0.2` dot bg, `0.3` text
- `skeleton-pulse` keyframes (defined in DS CSS)

## 14. A11y rules
- Sentinel marked `aria-hidden="true"` ✅ (it's purely behavioral)
- **Gap:** loading row has no `role="status"` or `aria-live` — screen readers don't announce "loading more results" or "all results shown"
- **Gap:** "Showing all N" final state should be `<p role="status">` so SR users get closure

## 15. Motion rules
- 3 dots animate via `skeleton-pulse 1.2s ease-in-out` keyframe, staggered `i * 0.2s` delay
- No reduced-motion at molecule level — depends on `skeleton-pulse` keyframe handling

## 16. Anti-patterns ❌
- Don't render this **above** the list — sentinel must be at the bottom for IO to trigger correctly.
- Don't pass a manually-managed ref — must come from `useProgressiveLoad` (or compatible hook).
- Don't render without `hasMore` — molecule's render decisions depend on it; missing = always falsy = nothing renders.
- Don't put inside a horizontally-scrolling container — IO + scroll root mismatch.
- Don't use as an "Add more" button — this is automatic; use a `<Button>` for manual load.
- Don't omit `visibleCount/totalCount` — without them, "X of Y" hidden but loses informational value.

## 17. REUSABILITY SCORE
**4/5 ⭐⭐⭐⭐** — Universal for infinite-scroll listings. Loses one star because (a) tightly coupled to `useProgressiveLoad` hook, (b) a11y `aria-live` gap.

## 18. Linked components
- **Parent organisms:** any `CardListing`-style organism
- **Hook dependency:** `useProgressiveLoad` (referenced in OG comment but file not audited here)
- **Sibling molecules:** `SkeletonCard` (per-item loading) vs this (list-tail loading)
- **Sibling concept:** `Pagination` atom for explicit paging (alternative pattern)

## 19. Reasons + Decisions log
- **Why split sentinel + visual into one molecule?** Caller writes one tag, both jobs done. Splitting would mean two refs and two locations to coordinate.
- **Why dots not spinner?** Spinners imply "wait this is slow"; dots imply "more is coming, casual". Brand tone is calm/editorial.
- **Why 3 dots, staggered 0.2s?** Tested 2-5; 3 is the iOS-standard "loading more" rhythm. 0.2s offset reads as wave, not as random pulse.
- **Why "Showing all N" as final state, not silent?** Silent end → user keeps scrolling waiting for more, doesn't know they hit the end. Explicit closure = better UX.
- **Why `toLocaleString()` on counts (line 41, 77)?** Comma-formatted numbers ("1,280 of 5,432") read better than raw ("1280 of 5432").
- **Why `tabular-nums` on count (line 74)?** Numbers don't shift width as they grow during scroll-in — prevents row jitter.
- **Why optional `visibleCount/totalCount`?** Hook may not always know totals (e.g., infinite API). Without them, label hidden but dots still play.
- **Why no manual "Load more" button fallback?** Decision: infinite scroll only. Pagination is a different molecule.
- **Why `h-px w-full` sentinel?** Visible-but-not-perceptible; full width ensures IO threshold easy to meet.
- **Why molecule, not part of CardListing organism?** Molecule extracted so other list organisms (surveys, analysts) reuse without re-bundling. CardListing imports it.
