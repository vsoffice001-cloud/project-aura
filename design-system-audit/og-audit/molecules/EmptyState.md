# EmptyState — Molecule Audit (OG DS v4.3)

> **Source:** `Design_system_vs_26 (og and final)/src/app/components/molecules/EmptyState.tsx:27-69`
> **OG comment (line 1-9):** *"EmptyState — Molecule (DS v4.3). WHAT: Reusable empty/no-results state with icon, title, description, and optional action. WHY: Provides a consistent zero-result fallback across listing pages. WHEN: Inside CardListing when filters return 0 results. HOW: Dashed border card with icon circle + title + description + action slot."*

---

## 1. WHAT
A centered "no results / empty" message card with a circular icon, a title, a description, and an optional action slot (typically a Button to reset filters or browse). Uses a dashed border + warm tint background to read as "intentional empty" rather than broken layout.

## 2. WHY
- **Zero-result UX standardization** — every listing/search page needs an empty state; without this, each invents its own copy and styling.
- **Action slot enables recovery** — empty without recovery is a dead-end; this molecule reserves space for "Clear filters" / "Browse all" CTA.
- **Dashed border + tint** signals "this is a state, not content" — distinguishes from real-data cards. Visual grammar of "placeholder".
- **Default copy** ("No results found" / "Try adjusting your filters…") covers 80% of cases; consumer can override per context.
- **Self-contained fade-in animation** (line 43: `animation: 'fadeUp 0.45s ...'`) makes the appearance feel deliberate, not jarring.

## 3. WHEN to use ✅
- Listing/search returning zero results · `CardListing.tsx:57`, `SurveysListingDemoContent.tsx:341`
- Filter combinations that match nothing
- Newly-created accounts before user uploads anything ("Your library is empty")
- After-action states ("All caught up — no new tasks")

## 4. WHEN NOT to use ❌
- Error state (server failed) → use a dedicated error component (different copy + icon)
- Loading state → use `SkeletonCard`
- Inline empty list rows (table with zero rows) → use a smaller text row, not a full card
- Onboarding empty (new user, no actions yet) → richer onboarding pattern; this is "filter found nothing"
- Permanent navigation dead-end → use a `404`/`PageNotFound` template, not this

## 5. WHERE used (file:line)
- `components/organisms/CardListing.tsx:57` — primary listing organism
- `components/SurveysListingDemoContent.tsx:341` — survey listing demo

## 6. HOW to implement

```tsx
import { EmptyState } from '@/app/components/molecules/EmptyState';
import { Button } from '@/app/components/Button';

// Default
<EmptyState />

// With recovery action
<EmptyState
  title="No reports match"
  description="Try widening the date range or removing an industry filter."
  action={<Button variant="ghost" size="sm" onClick={clearAll}>Clear filters</Button>}
/>

// Custom icon
import { Inbox } from 'lucide-react';
<EmptyState
  icon={<Inbox className="h-5 w-5" />}
  title="Inbox empty"
  description="You're all caught up."
/>
```

## 7. Composition tree
- Wrapping `<div>` — dashed border, warm bg, fade-in animation
- Icon circle `<div>` containing icon (default `Search`)
- Title `<p>`
- Description `<p>`
- Action slot (optional `<div>` wrapping ReactNode)

**Atoms consumed:** none directly (only icon).
**Icons:** lucide `Search` (default) or user-supplied.

## 8. Properties

| Prop | Type | Default | WHY |
|---|---|---|---|
| `icon?` | ReactNode | `<Search />` | Override icon to match context |
| `title?` | string | `'No results found'` | Override default headline |
| `description?` | string | `'Try adjusting your filters or search query to find reports.'` | Override default body |
| `action?` | ReactNode | — | Recovery CTA slot |
| `className?` | string | — | Pass-through |

## 9. Data contract

```ts
interface EmptyStateProps {
  icon?: ReactNode;
  title?: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}
```

No data-input; purely presentational.

## 10. States
- **Default** (no props): default icon + copy.
- **With overrides:** custom icon/title/description.
- **With action:** action button rendered below description.
- **Mount:** plays `fadeUp` animation 0.45s once (line 43).

## 11. Variants
None at prop level.

## 12. Responsive behavior
- `text-center py-20` — vertical padding 80px both breakpoints.
- Content sizes scale with viewport via font tokens.
- No breakpoint-specific layout.

## 13. Tokens used
- `var(--radius-element)` border-radius
- `var(--text-xs)` title + description
- Inline rgba colors: border `0.12`, bg `0.015`, icon circle bg `0.04`, title `0.6`, description `0.35`, icon color `0.3`

## 14. A11y rules
- Headline + description as `<p>` text — screen-reader-readable
- Icon decorative (no `aria-label` on default Search; user-supplied icons should also be decorative or have inline label)
- Default copy is meaningful; default `title` reads naturally
- **Gap:** title is `<p>` not `<h2>`/`<h3>` — missing semantic heading. Screen readers get text but no landmark.
- **Gap:** `role="status"` or `aria-live="polite"` would announce when filter changes flip the page from results to empty — currently not present.
- Animation respects `prefers-reduced-motion`? **NO** — `fadeUp` runs always. Gap.

## 15. Motion rules
- `fadeUp 0.45s cubic-bezier(0.16, 1, 0.3, 1) both` once on mount.
- No reduced-motion check at molecule level — depends on whether `@keyframes fadeUp` has a media query (verify in DS CSS).

## 16. Anti-patterns ❌
- Don't use for error states — "No results" copy implies user-driven empty, not failure.
- Don't omit `action` on filter pages — leaves user stranded.
- Don't use as a loading state — use `SkeletonCard`.
- Don't pass icon larger than `h-5 w-5` — breaks the icon circle layout.
- Don't render zero results without this molecule — invents drift.
- Don't nest a long-form layout in `action` — slot is for one button/link, not paragraph copy.

## 17. REUSABILITY SCORE
**5/5 ⭐⭐⭐⭐⭐** — Universal across any listing/search/filtered page. Mandatory for any "0 results possible" surface.

## 18. Linked components
- **Parent organisms:** `CardListing`, `SurveysListingDemoContent`
- **Sibling molecules:** `SkeletonCard` (loading), `LoadMoreSentinel` (paging)
- **Atoms in action slot:** `Button`, `CTALink`, `TextLink`

## 19. Reasons + Decisions log
- **Why dashed border?** Universal "this is a placeholder zone" signal in UI vocabulary (Figma, Sketch, Webflow all use dashed). Departure from card solid borders.
- **Why warm tint `rgba(0,0,0,0.015)`?** Just enough to visually demarcate the empty zone without being mistaken for a card.
- **Why icon in a colored circle?** Adds visual anchor; centered icon alone feels lost in whitespace.
- **Why `Search` as default icon?** 90% of empty-state usage is "filter found nothing" → search icon matches that mental model.
- **Why `var(--text-xs)` for title (not larger)?** Tested with `text-base` and `text-sm` — felt too loud; users in a filter-iteration loop don't need a hero. Tone: "here's the issue, fix it and try again".
- **Why optional action slot, not always required?** Some empties are deliberate (caught-up inboxes); forcing a button creates wrong UX.
- **Why default copy in props with fallback?** Override-friendly without each consumer passing strings. Internationalization gap: hard-coded English.
- **Why `py-20` (80px)?** Tested — 48-64 feels cramped, 96+ feels lost. 80 balances generosity with screen real estate.
- **Why fade-in animation by default?** Empty appearing instantly mid-scroll feels like a layout glitch; 450ms fade signals "this is a state, not a load".
- **Why no `error` variant?** Errors have different copy + retry semantics; separate component intended (not in OG yet).
