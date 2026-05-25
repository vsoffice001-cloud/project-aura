# FilterChip · Atom · OG Audit

**Source:** `Design_system_vs_26 (og and final)/src/app/components/FilterChip.tsx` (68 lines)

---

## 1. WHAT

Dismissible active-filter pill. Shows the filter value, optional uppercase category prefix (e.g., "REGION: Europe"), and an X button to remove. Used in the active-filter bar above listing grids.

## 2. WHY

OG JSDoc verbatim (`FilterChip.tsx:1-17`):

> "FilterChip — Atom (DS v4.3)"
> "WHAT: Dismissible pill showing an active filter value with optional category prefix."
> "WHY: Extracted from inline active-filter pills for reuse across listing pages."
> "WHEN: In the active-filter bar above the card grid."
> "HOW: Monochromatic black/opacity tint bg with X button to remove."
> "INTERACTION STATES: Default → bg rgba(0,0,0,0.06), color rgba(0,0,0,0.7). Hover (X) → color rgba(0,0,0,0.5). Pressed (X) → scale(0.9). Read-only → onRemove omitted, no X button rendered"

- Visualizes active filters → user sees "what's filtering my results" at a glance
- Category prefix lets one chip carry context: "REGION: Europe" vs ambiguous "Europe"
- Read-only mode (no `onRemove`) for display-only contexts
- Monochromatic — same color discipline as FilterCheckbox / FilterCheckboxItem
- 5px radius via `--radius-element` — matches buttons/inputs (chip is interactive element class)

## 3. WHEN to use ✅

- Active filter bar above results grid: "Showing 124 reports filtered by [Technology ×] [Europe ×] [2024 ×]"
- Selected facet display in search results
- Tag display on a profile / dashboard
- Read-only context tagging in card metadata
- Saved-filter display ("Your filters: [...]")

## 4. WHEN NOT to use ❌

- Static label / status → use `<Badge>` (no X, more variant flexibility)
- Multi-select option picker → use `<FilterCheckboxItem>` (check square)
- Single-select option → use `<FilterCheckbox>`
- Card-level category label → use `<Badge variant="rounded">` or `CategoryBadge`
- Toggleable on/off pill → use `shadcn/ui Toggle`
- Search-query echo → use `<Badge>` (no dismiss semantic if it's not a removable filter)

## 5. WHERE used

- `FiltersDocumentation.tsx:838-847` — docs catalog (with + without category prefix)
- **Honest gap:** No production consumer grep'd directly. Likely consumed at listing-page level (`ListingToolbar` organism candidate).

## 6. HOW to implement

```tsx
// Simple removable chip
<FilterChip label="Technology" onRemove={() => clearFilter('industry')} />

// With category prefix
<FilterChip label="Europe" category="REGION" onRemove={() => clearFilter('region')} />

// Quoted search term
<FilterChip label={`"AI chips"`} onRemove={() => clearQuery()} />

// Read-only (no X)
<FilterChip label="Premium" category="TIER" />

// Active filter bar pattern
<div className="flex flex-wrap gap-2">
  {activeFilters.map(f => (
    <FilterChip
      key={f.id}
      label={f.label}
      category={f.category}
      onRemove={() => removeFilter(f.id)}
    />
  ))}
</div>
```

## 7. Properties

| Prop | Type | Default | Why exists |
|---|---|---|---|
| `label` | `string` | required | Filter value |
| `category` | `string` | — | Optional uppercase prefix — disambiguates value (e.g., "SUB-INDUSTRY" vs "REGION") (`FilterChip.tsx:22`) |
| `onRemove` | `() => void` | — | If omitted, no X button rendered (read-only mode) (`FilterChip.tsx:23, 53`) |

## 8. States

- **Default:** bg `rgba(0,0,0,0.06)`, text `rgba(0,0,0,0.7)`, border `rgba(0,0,0,0.08)`, X icon `rgba(0,0,0,0.3)` (`FilterChip.tsx:33-38, 55`)
- **Hover (X button only):** X color `rgba(0,0,0,0.5)` (`FilterChip.tsx:56`)
- **Pressed (X):** `active:scale-[0.9]` (`FilterChip.tsx:54`)
- **Read-only:** X button not rendered, no interactive state

## 9. Variants

None. `category` toggles the prefix; `onRemove` toggles the X button.

## 10. Sizes

Single fixed size: `px-2.5 py-1`, label `var(--text-xs)`, category `var(--text-card-micro)`. (`FilterChip.tsx:30, 32, 44`)

## 11. Tokens used

- `--text-xs` — label font (`FilterChip.tsx:32`)
- `--text-card-micro` — category prefix font (`FilterChip.tsx:44`)
- `--radius-element` (5px) — chip rounding (`FilterChip.tsx:33`)
- All colors raw rgba (per monochromatic discipline)

## 12. A11y rules

- X button is real `<button>` with `aria-label={\`Remove ${label} filter\`}` ✓ (`FilterChip.tsx:60`)
- Outer `<span>` is presentational — no role
- **Gap:** No `aria-live="polite"` on parent filter-bar — AT users don't hear when filters are added/removed (parent responsibility)

## 13. Motion rules

- X button `transition-colors` (no explicit duration — Tailwind default)
- `active:scale-[0.9]` press feedback (heavier compress than other atoms because the X button is small — gives stronger tactile signal)
- Reduced-motion: not explicitly respected

## 14. Anti-patterns ❌

- Never use as a static label — use `<Badge>` (more variants, no dismiss semantic implied)
- Never put `<FilterChip>` as a clickable filter option — use `<FilterCheckbox>` / `<FilterCheckboxItem>` (selection state pattern)
- Never override colors via inline style — defeats monochromatic system
- Never use as primary CTA — utility surface
- Never assume X is the only way to remove — provide programmatic "clear all" too at parent

## 15. REUSABILITY SCORE

**4/5 ⭐⭐⭐⭐** — Single-purpose, clean API, good a11y on the X button. Used wherever filters get applied.

## 16. Linked components

- **Parent:** `ListingToolbar` organism (potential), active-filter bar
- **Sibling atoms:** `<Badge>` (static label), `<FilterCheckbox>` / `<FilterCheckboxItem>` (filter pickers), `<FilterSearchInput>` (filter search)
- **Children:** Lucide `<X>` icon
- **Hooks involved:** none

## 17. Reasons + Decisions log

- **Why category prefix as uppercase + smaller (`FilterChip.tsx:42-49`):** Disambiguates value — "Europe" alone is unclear ("region? team? language?"). "REGION: Europe" is unambiguous. Visual hierarchy: prefix de-emphasized (lighter, smaller) so value reads as primary.
- **Why `--radius-element` (5px) not pill (`FilterChip.tsx:33`):** Chip is interactive-element-class (like a button), not a label-class (like a Badge pill). 5px = button radius family.
- **Why bg `rgba(0,0,0,0.06)` (`FilterChip.tsx:34`):** Same tint as FilterCheckbox selected state — visual consistency. Both atoms represent "actively engaged filter".
- **Why X color 0.3 → 0.5 on hover (`FilterChip.tsx:55, 58-59`):** Subtle default (0.3) — X shouldn't compete with label. Hover promotes (0.5) so user knows it's interactive.
- **Why `active:scale-[0.9]` heavier compress than Button's `0.98` (`FilterChip.tsx:54`):** X is small (11px icon). Heavier scale = stronger tactile feedback for small target. Calibrated by relative-size.
- **Why omit X when no `onRemove` (`FilterChip.tsx:53`):** Read-only mode for display contexts. Avoids dead X buttons.
- **Why `onMouseEnter`/`onMouseLeave` not Tailwind `:hover` (`FilterChip.tsx:58-59`):** Direct inline color manipulation — works without :hover specificity fights. Less elegant but more predictable.
- **Why X is `lucide-react` `<X size={11}>` (`FilterChip.tsx:62`):** Smaller than 12px default for tighter visual weight. Filter chip is compact; 11 matches the visual density.
- **Why aria-label includes "filter" word (`FilterChip.tsx:60`):** AT user hears "Remove Europe filter" — explicit context. "Remove Europe" alone is ambiguous.
- **No focus ring on X button (gap):** Should add `focus-visible:outline-2 focus-visible:outline-black/40` or similar. Keyboard users currently get browser default.
