# SkeletonCard — Molecule Audit (OG DS)

> **Source:** `Design_system_vs_26 (og and final)/src/app/components/molecules/SkeletonCard.tsx:13-46`
> **OG comment (line 1-5):** *"SkeletonCard — Molecule. Shimmer loading placeholders for grid and list card variants. Uses .skeleton-shimmer CSS class."*

---

## 1. WHAT
A shimmer-loading placeholder card that visually mirrors `ReportCard`'s grid and list layouts. Renders grayscale skeletal shapes (rounded rectangles with animated shimmer via `.skeleton-shimmer` CSS class) in the exact dimensions/positions of the real card to prevent layout jolt when data loads.

## 2. WHY
- **Layout parity prevents jolt** (OG comment line 10 of ReportCard: *"SkeletonCard mirrors both variants"*) — when real card replaces skeleton, no shift.
- **Variant matching:** caller passes the same `viewMode` (grid/list) to `SkeletonCard` and `ReportCard`. Both render in the same shape.
- **Shimmer via CSS class** — animation defined in DS global CSS (`.skeleton-shimmer`); molecule just toggles class.
- **No image fetch** — skeleton shows immediately; no network dependency.

## 3. WHEN to use ✅
- During fetch of report listings · `PatternsContent.tsx:509, 1141` · `ComponentsContent.tsx:790`
- Above the fold while initial paint waits for data
- During filter changes that re-fetch the grid

## 4. WHEN NOT to use ❌
- Empty state (zero results) → use `EmptyState`
- Error state (fetch failed) → dedicated error component
- Surveys — use `SurveySkeleton` (mirrors SurveyCard, not ReportCard)
- Non-card placeholders — use a `Skeleton` atom (single shape, not a full card)
- For content that's already cached/fast — skeleton flashes unnecessarily

## 5. WHERE used (file:line)
- `components/PatternsContent.tsx:509, 1141` — listing pages
- `components/ComponentsContent.tsx:790` — DS showcase
- `components/AllBorderRadiusTokensContent.tsx:387` — referenced in docs

## 6. HOW to implement

```tsx
import { SkeletonCard } from '@/app/components/molecules/SkeletonCard';

// Loading state, grid layout
{loading
  ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} variant="grid" />)
  : reports.map((r) => <ReportCard key={r.id} {...r} layout="grid" />)
}

// List layout
<SkeletonCard variant="list" />

// Square aspect
<SkeletonCard variant="grid" aspectRatio="1/1" />
```

## 7. Composition tree

**Grid variant:**
- Outer `<div>` (white bg, border, rounded `var(--rc-radius-card)`, flex-col)
  - Image placeholder (aspectRatio + skeleton-shimmer)
  - Body block (p-4 gap-2.5)
    - Industry badge placeholder (h-4 w-20)
    - Two title lines (h-3.5 full + 3/4)
    - Meta line (h-3 w-2/3)
    - Footer line (h-3 w-1/2)

**List variant:**
- Outer `<div>` (flex row, border, rounded)
  - Thumbnail placeholder (w-16 sm:w-20, self-stretch)
  - Main column (flex-1, py-2.5 px-3 gap-2)
    - Industry placeholder (h-4 w-20)
    - Two title lines
    - Meta line
  - Right column (hidden sm:flex)
    - Date placeholder (h-3 w-16)
    - CTA placeholder (h-7 w-24)

**Atoms consumed:** none.
**CSS dep:** `.skeleton-shimmer` keyframe class (in DS CSS).

## 8. Properties

| Prop | Type | Default | WHY |
|---|---|---|---|
| `variant?` | `'grid'\|'list'` | `'grid'` | Match ReportCard layout |
| `aspectRatio?` | string | `'16/9'` | Match image aspect ratio |
| `className?` | string | — | Pass-through |

## 9. Data contract
No data input — placeholder.

## 10. States
- Single animated state via `.skeleton-shimmer` class.
- No interaction states.

## 11. Variants
- `grid` (default) — vertical card layout
- `list` — horizontal row layout

## 12. Responsive behavior
- List variant: right column `hidden sm:flex` matches `ReportCard` exactly.
- Thumbnail width breakpoints match ReportCard (w-16 sm:w-20 vs ReportCard's w-20 sm:w-28 md:w-36 — **slight discrepancy** noted).

## 13. Tokens used
- `var(--rc-radius-card)` outer radius
- `var(--radius-inner, 2.5px)` inner element radius
- `var(--radius-element, 5px)` CTA placeholder radius
- `.skeleton-shimmer` (DS CSS)

## 14. A11y rules
- **Gap:** no `aria-busy` / `aria-live` on parent. Should signal "loading" to SR.
- **Gap:** no `role="status"` — SR users get visual shimmer with no equivalent.
- Decorative pattern; SR ideally skips entirely — but should announce loading state somewhere.

## 15. Motion rules
- `.skeleton-shimmer` (CSS keyframe, owned by DS stylesheet)
- No reduced-motion guard at molecule level — depends on DS CSS implementation

## 16. Anti-patterns ❌
- Don't mismatch `variant` and the eventual `ReportCard` layout — defeats jolt-prevention.
- Don't use as a single-shape skeleton (e.g., a label) — use an atom `Skeleton` instead.
- Don't render >12 at a time — performance + visual noise.
- Don't replace with real cards without removing skeletons (double render).
- Don't pass odd `aspectRatio` — must match real card's aspect to prevent jolt.
- Don't use for Survey listings — use `SurveySkeleton`.

## 17. REUSABILITY SCORE
**4/5 ⭐⭐⭐⭐** — Universal loading state for Reports listings. Loses one star for (a) a11y gaps, (b) thumbnail-width discrepancy with ReportCard list mode.

## 18. Linked components
- **Mirrors:** `ReportCard` (both layouts)
- **Sibling skeleton:** `SurveySkeleton` (mirrors SurveyCard)
- **Sibling molecule for empty data:** `EmptyState`

## 19. Reasons + Decisions log
- **Why a dedicated SkeletonCard molecule, not an atom Skeleton in a custom layout?** Real ReportCard layout is non-trivial — three skeleton zones (image, body, footer); composing inline at every call site would invite drift.
- **Why width tokens slightly mismatched between SkeletonCard list and ReportCard list?** SkeletonCard: `w-16 sm:w-20`; ReportCard: `w-20 sm:w-28 md:w-36`. **Mismatch is a bug** — should sync. When data loads, list view jolts slightly at sm breakpoint.
- **Why `aspect-ratio` prop?** Some consumers use 4:3 or 1:1 covers; must match.
- **Why grayscale only, no color tint?** Skeleton = "no info yet"; color would imply data.
- **Why white background not warm?** Tested both — white is cleaner, doesn't compete with the shimmer pattern.
- **Why `flex flex-col` on grid skeleton?** Matches ReportCard's `flex flex-col` (line 148 in ReportCard) for height consistency.
- **Why no padding="md" Card here?** Doesn't use the Card atom — uses raw div + same visual treatment. Should use Card to stay token-aligned (gap noted).
- **Why border `1px solid rgba(0,0,0,0.06)` not via Card?** Inline duplication; should match Card atom's border style or use Card directly.
- **Why h-4/h-3.5/h-3 placeholders?** Approximate the line-heights of `--text-xs` and `--text-nav`. Calibrated to look "weighty enough" but not "blocky".
- **Why no `role="status"` / `aria-live`?** Oversight. Standard a11y skeleton pattern. Easy fix.
- **Why no count prop (e.g., `<SkeletonCard count={6} />`)?** Caller uses `Array.from(...)`. Could be added but current pattern is OK.
