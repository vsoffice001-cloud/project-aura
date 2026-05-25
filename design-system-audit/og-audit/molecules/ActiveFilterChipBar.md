# ActiveFilterChipBar — Molecule Audit (OG DS v4.3)

> **Source:** `Design_system_vs_26 (og and final)/src/app/components/molecules/ActiveFilterChip.tsx:34-72`
> **Export name:** `ActiveFilterChipBar` (file is `ActiveFilterChip.tsx` — naming asymmetry, deliberate per index.ts:44)

---

## 1. WHAT
A horizontal bar showing every currently-active filter as a removable `FilterChip` pill, prefixed with a "N FILTERS" count label and trailed by an optional "Clear all" link. Renders **nothing** when no filters are active.

## 2. WHY
- **Pattern extraction** (OG comment line 6-7): "Extracted the active-filter-pills bar from listing pages into a composable molecule." Listing pages were duplicating this row inline.
- **Self-hiding contract** (line 35: `if (filters.length === 0) return null`): callers don't need to gate render — passing empty array yields zero DOM. Less consumer code.
- **Affordance + escape hatch in one row:** user sees what's applied (chips) AND has a one-click clear at the same eye level. Fitts's-Law win — no hunting for clear button.
- **Composes existing atom** (`FilterChip`) rather than re-implementing chip styling. Single source of truth for chip visual.

## 3. WHEN to use ✅
- Listing/search results page directly above the card grid · `ReportStorePage.tsx:151`
- Below a sidebar filter toolbar header, when active filters need surfacing outside the sidebar
- Inside organism showcases / docs to demonstrate active state · `ReportStoreOrganismsShowcase.tsx:573` · `FiltersDocumentation.tsx:1210, 1468`

## 4. WHEN NOT to use ❌
- Sidebar **filter input area** itself → use `FilterAccordion` (different concept: select chips vs already-applied chips)
- Tag input field (creation, not active applied) → use a tag-input atom, not this
- Single-value status badges (not removable) → use `Badge` atom
- Selected/multi-select state inside a dropdown → use checkboxes + counts (`FilterAccordion`)

## 5. WHERE used (file:line)
- `components/ReportStorePage.tsx:151` — main listing page, primary call site
- `components/ReportStoreOrganismsShowcase.tsx:573` — showcase demo
- `components/FiltersDocumentation.tsx:1210, 1468` — documentation examples

## 6. HOW to implement

```tsx
import { ActiveFilterChipBar } from '@/app/components/molecules/ActiveFilterChip';

const activeFilters = [
  { label: 'Healthcare', category: 'Industry', onRemove: () => removeFilter('industry', 'Healthcare') },
  { label: 'APAC',       category: 'Region',   onRemove: () => removeFilter('region', 'APAC') },
  { label: '2024',       category: 'Year',     onRemove: () => removeFilter('year', '2024') },
];

<ActiveFilterChipBar
  filters={activeFilters}
  onClearAll={() => clearAllFilters()}
/>
```

## 7. Composition tree
- Wrapper `<div>` w/ top border `rgba(0,0,0,0.06)`
- `<span>` count label · uppercase tracking-[0.1em] tabular-nums
- `filters.map(...)` → `FilterChip` atom (each)
- Optional clear-all `<button>` w/ inline `X` icon (`lucide-react`)

**Atoms consumed:** `FilterChip` (only one direct atom).
**Data fields needed per filter:** `label`, `category?`, `onRemove`.

## 8. Properties

| Prop | Type | Default | WHY |
|---|---|---|---|
| `filters` | `ActiveFilter[]` | — (required) | Drives render; empty array = null output |
| `onClearAll` | `() => void` | undefined | Optional clear-all link; hidden if not provided |

`ActiveFilter` shape:

| Field | Type | Purpose |
|---|---|---|
| `label` | `string` | Chip text |
| `category?` | `string` | Used as part of React key; helps when same label exists across categories |
| `onRemove` | `() => void` | Per-chip remove handler (chip wires it to its own X button) |

## 9. Data contract

```ts
interface ActiveFilter {
  label: string;
  category?: string;
  onRemove: () => void;
}

interface ActiveFilterChipBarProps {
  filters: ActiveFilter[];
  onClearAll?: () => void;
}
```

**Where data comes from:** consumer state (e.g., `ReportStorePage`'s active-filter selector), derived by mapping each selected facet to an `ActiveFilter`.

## 10. States
- **Empty** (`filters.length === 0`): returns `null` — no DOM at all (line 35).
- **One filter:** singular label "1 FILTER" (line 53).
- **Many filters:** "N FILTERS" plural (line 53).
- **No clear-all:** `onClearAll` undefined → button hidden.
- **Clear-all hover:** color animates `rgba(0,0,0,0.4)` → `rgba(0,0,0,0.8)` (lines 63-64).
- **Clear-all pressed:** `active:scale-[0.95]` (line 61).

## 11. Variants
None. Single visual — extracted as a single canonical bar.

## 12. Responsive behavior
- `flex-wrap` → chips wrap onto multiple rows when row width exceeded
- Clear-all uses `ml-auto` → stays pinned right at any width
- No breakpoint-specific layout switch

## 13. Tokens used
- `var(--text-card-micro)` → "N FILTERS" label size (10px-class micro)
- `var(--text-xs)` → clear-all label
- Inline colors:
  - `rgba(0,0,0,0.06)` top border
  - `rgba(0,0,0,0.35)` count label color
  - `rgba(0,0,0,0.4)` clear-all default, `rgba(0,0,0,0.8)` hover

> **Note:** Tokens used minimally — most styling is inline rgba per OG comment line 15 ("All colors via inline style rgba(). No Tailwind color classes.")

## 14. A11y rules
- Clear-all is a real `<button>` (line 59) — keyboard reachable.
- X icon at `h-3 w-3` decorative (text "Clear all" carries label).
- Per-chip remove relies on FilterChip atom's own a11y (not this molecule's concern).
- **Gap:** no `aria-label` on clear-all (text content suffices but could be more descriptive: "Clear all filters").
- **Gap:** `aria-live="polite"` region would help screen readers announce removal — not implemented.

## 15. Motion rules
- Clear-all color transition via `transition-colors` (~150ms default).
- Clear-all press: `active:scale-[0.95]` (compositor transform — instant).
- No mount/enter animation — chips snap in/out (FilterChip atom handles its own removal animation if any).

## 16. Anti-patterns ❌
- Don't manually check `filters.length === 0` before rendering — the molecule already handles it.
- Don't put this **inside** the sidebar — it lives **outside**, above the result grid.
- Don't pass plain string array — wrap as `ActiveFilter` objects with `onRemove` callbacks. The contract is "applied filter with removal action".
- Don't omit `onRemove` per chip — chip without remove handler is a `Badge`, not a `FilterChip`.
- Don't pass shared `onRemove` mutating one global — each filter owns its own remove handler closure.

## 17. REUSABILITY SCORE
**4/5 ⭐⭐⭐⭐** — Universal across any **listing/search** page with multi-facet filtering. Loses one star because it's not applicable to non-filtered surfaces (case-study, marketing). On listing surfaces, it's mandatory.

## 18. Linked components
- **Parent organisms:** `ReportStorePage` (consumer) · listing organisms that wire active state
- **Sibling molecules:** `FilterAccordion` (filter selection, not active state) · `MobileFilterSheet` (mobile container)
- **Child atoms:** `FilterChip` (the only renderable child)
- **Icons:** `lucide-react/X`

## 19. Reasons + Decisions log
- **Why text + chips + clear-all in same row?** Reading-order: see count → scan applied → escape (clear). Mirrors Gmail filter chips.
- **Why uppercase "N FILTERS" label?** Visual differentiation from chip labels — count is meta-info, chips are values. Uppercase + tracking-[0.1em] = "label" tone, not "data" tone.
- **Why `rgba(0,0,0,0.06)` top border, not bottom?** Sits below toolbar; border at top divides "controls" from "applied state". If border were at bottom, it would visually merge with the result grid.
- **Why `tabular-nums` on the count?** Numbers don't shift width when 1 → 9 → 10 — prevents row jitter as user adds/removes filters.
- **Why singular/plural toggle?** Microcopy detail; "1 FILTERS" reads broken. Worth the line-of-code cost.
- **Why `category` optional in key?** Same label could appear across facets ("2024" in Year, "2024" in Edition). Adding category prevents React key collision.
- **Why `return null` on empty, not invisible CSS?** Saves DOM nodes; cleaner devtools; consumer doesn't need to wrap in conditional.
- **Why filename `ActiveFilterChip.tsx` but export `ActiveFilterChipBar`?** Likely historical — file previously held a single chip primitive that became `FilterChip` atom, then bar wrapper was added in same file. Naming drift noted by `index.ts:44` re-export.
