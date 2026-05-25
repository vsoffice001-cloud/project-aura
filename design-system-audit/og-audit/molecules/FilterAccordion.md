# FilterAccordion — Molecule Audit (OG DS v4.3)

> **Source:** `Design_system_vs_26 (og and final)/src/app/components/molecules/FilterAccordion.tsx:44-115`
> **OG comment (line 1-10):** *"FilterAccordion — Molecule (DS v4.3). WHAT: Collapsible filter section with heading + list of FilterCheckbox items. WHY: Unified the two duplicated FilterSection implementations (IndustrySidebar desktop vs MobileFilterSheet) with a single variant prop."*

---

## 1. WHAT
A filter section group composed of a section heading and a list of `FilterCheckbox` items. Two variants:
- **`static`** — always-open heading (default)
- **`collapsible`** — heading is a button that toggles open/closed with a ChevronDown rotation.

Supports single-select per group via `selectedValue` + `onSelect`. Items can be individually disabled.

## 2. WHY
- **De-duplication trigger** (OG comment line 5-7): two competing `FilterSection`s existed — one in desktop sidebar, one in mobile sheet. They drifted. This molecule unified them via a single prop (`variant`).
- **Token-only styling** — every color/size via inline rgba + CSS vars; no Tailwind color classes (line 19 self-described).
- **Hover-state lifted to React state** (`hovered`, line 54) — needed because heading toggles between text colors; pure CSS hover doesn't transition both arrow + text reliably.
- **Disabled cascades** (line 107) — group-level `disabled` propagates to every option, with visual opacity 0.4.

## 3. WHEN to use ✅
- Inside `SidebarPanel` (desktop) and `MobileFilterSheet` (mobile) for filter facets · `FiltersDocumentation.tsx:943-957`
- Single-select facets (Industry, Region, Format, etc.)
- Anywhere a labeled group of single-select options needs a heading + checkboxes pattern

## 4. WHEN NOT to use ❌
- Multi-select facets → swap underlying atom from `FilterCheckbox` (radio-style) to a multi-select checkbox; currently single-select only by `selectedValue` contract
- Hierarchical filters (parent → children) → use a tree component
- Range filters (price slider) → different atom entirely
- Search-as-you-type filters → use `FilterSearchInput`
- Standalone heading without options → just use `<h3>`

## 5. WHERE used (file:line)
- `components/FiltersDocumentation.tsx:943-1072` — DS showcase + docs
- (Indirect via SidebarPanel composition in organisms — verify per-page)

## 6. HOW to implement

```tsx
import { FilterAccordion } from '@/app/components/molecules/FilterAccordion';

const industries = [
  { label: 'Healthcare',      count: 1280 },
  { label: 'Financial Svcs',  count: 962 },
  { label: 'Energy',          count: 734, disabled: true },
];

// Static (always open) — default for sidebars
<FilterAccordion
  title="Industry"
  options={industries}
  selectedValue={selectedIndustry}
  onSelect={setIndustry}
/>

// Collapsible — for mobile sheet or compact sidebars
<FilterAccordion
  title="Industry"
  variant="collapsible"
  defaultOpen={false}
  options={industries}
  selectedValue={selectedIndustry}
  onSelect={setIndustry}
/>

// Disabled entire group
<FilterAccordion title="Format" options={fmts} selectedValue="" onSelect={()=>{}} disabled />
```

## 7. Composition tree
- Wrapping `<div>` (with opacity if disabled)
- **Header:** either a `<button>` (collapsible) with `<h3>` + `ChevronDown` icon, or a plain `<h3>` (static)
- **Content:** `options.map → FilterCheckbox` rows (only shown if open)

**Atoms consumed:** `FilterCheckbox`.
**Hooks:** `useState` (isOpen, hovered).
**Icons:** `ChevronDown`.

## 8. Properties

| Prop | Type | Default | WHY |
|---|---|---|---|
| `title` | string | — (required) | Section heading text |
| `options` | `FilterOption[]` | — (required) | List of selectable rows |
| `selectedValue` | string | — (required) | Currently selected label (controlled) |
| `onSelect` | `(value:string)=>void` | — (required) | Called when a row clicked |
| `variant?` | `'static'\|'collapsible'` | `'static'` | Layout switch — collapsible adds toggle button |
| `defaultOpen?` | boolean | `true` | Initial state for collapsible variant |
| `disabled?` | boolean | `false` | Group-level disable — cascades to all rows |

## 9. Data contract

```ts
interface FilterOption {
  label: string;
  count?: number;
  disabled?: boolean;
}

interface FilterAccordionProps {
  title: string;
  options: FilterOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
  variant?: 'static' | 'collapsible';
  defaultOpen?: boolean;
  disabled?: boolean;
}
```

**Where data comes from:** facet taxonomy (e.g., industries catalog) + facet counts from API/mock.

## 10. States
- **Static:** always rendered open.
- **Collapsible-open:** heading rotated chevron 180°, options visible.
- **Collapsible-closed:** chevron 0°, options hidden (no render — `showContent` false).
- **Heading hover (collapsible only):** text color shifts `0.5` → `0.7`.
- **Heading pressed:** `active:scale-[0.98]`.
- **Disabled:** opacity 0.4 group-wide, cursor-not-allowed on heading, items cascade-disabled.
- **Selected option:** managed by `FilterCheckbox` atom (selected prop).

## 11. Variants
- `static` (default) — for desktop sidebar where space allows always-open
- `collapsible` — for mobile sheets or dense sidebars; user opts-in to view

## 12. Responsive behavior
- No breakpoint logic. Variant choice IS the responsive switch (caller picks static vs collapsible per context).
- Content sizing inherits from parent (sidebar width).

## 13. Tokens used
- `var(--text-xs)` heading
- Inline rgba: `0.5` heading default, `0.7` heading hover, `0.3` chevron, opacity `0.4` disabled

## 14. A11y rules
- Collapsible heading is a `<button>` with `disabled` attr ✅
- ChevronDown decorative (no aria) ✅
- **Gap:** no `aria-expanded` on the toggle button — screen readers can't announce open/closed state.
- **Gap:** no `aria-controls` linking button → content region.
- **Gap:** disabled group could benefit from `aria-disabled="true"` on heading element.
- `<h3>` heading is semantic ✅
- `letterSpacing: '0.1em'` inline → consistent tracking; not a token

## 15. Motion rules
- `transition-colors` on heading text
- `transition-transform` on chevron (180° rotation)
- `active:scale-[0.98]` press feedback
- No reduced-motion handling at molecule level

## 16. Anti-patterns ❌
- Don't pass mutating `selectedValue` from local state w/o controlled wiring — molecule is controlled.
- Don't omit `onSelect` — required prop; no internal fallback.
- Don't put unrelated content inside (no children prop) — use options-only contract.
- Don't use for multi-select — `selectedValue` is single string; passing array won't work.
- Don't nest accordions (parent variant=collapsible containing child accordions) — UI confusion.
- Don't override `letterSpacing` via className wrapper — inline style wins; would need editing molecule.
- Don't use for >12 options uncollapsed — overwhelming; use collapsible or paginated atom.

## 17. REUSABILITY SCORE
**4/5 ⭐⭐⭐⭐** — Universal filter primitive across all listing surfaces with facets. Loses one star because (a) single-select only, (b) a11y gaps (`aria-expanded`/`aria-controls`).

## 18. Linked components
- **Parent molecules:** `SidebarPanel`, `MobileFilterSheet`
- **Sibling molecule:** `ActiveFilterChipBar` (applied filters, not selection)
- **Child atom:** `FilterCheckbox`
- **Icons:** lucide ChevronDown

## 19. Reasons + Decisions log
- **Why unify two FilterSection implementations into one molecule?** Drift prevention. The two implementations had diverged: one used `<details>`, one used a custom toggle; spacing differed; hover colors differed. Single source of truth.
- **Why `variant` prop instead of two molecules?** Less import surface; clear mental model (one component, two modes). Tradeoff: more conditional rendering inside.
- **Why static is default?** Most usage is desktop sidebar where space allows always-open. Mobile opts into collapsible.
- **Why hover state lifted to React, not pure CSS?** Heading color needs to transition while chevron arrow also responds. Pure-CSS hover on parent button works, but lifting to React makes the intent explicit + testable.
- **Why `defaultOpen=true` for collapsible?** First-render assumes user wants to see what's filterable. Collapse is an explicit user action.
- **Why no animation on options reveal (static height tween)?** Tested — animating height of variable lists felt janky. Snap reveal is honest.
- **Why letter-spacing 0.1em inline, not token?** Consistent "section header" spacing across heading elements. Token candidate (`--tracking-section-label`) not yet defined; inline is the placeholder.
- **Why disabled cascade vs per-item only?** Allows greying-out an entire facet when context demands (e.g., "Region disabled until Industry is selected"). Common pattern in faceted search.
- **Why no count summary in heading (e.g., "Industry · 3 selected")?** Single-select means at most 1 selected — number adds little. Multi-select version would benefit.
- **Why `active:scale-[0.98]` not lift?** Press inset feels right for header click. Lift would compete with parent panel hover.
