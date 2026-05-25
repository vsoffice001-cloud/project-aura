# FilterSearchInput · Atom · OG Audit

**Source:** `Design_system_vs_26 (og and final)/src/app/components/FilterSearchInput.tsx` (103 lines)

---

## 1. WHAT

Search input with leading Search icon + conditional X clear button. Container-focused pattern (outer div gets focus ring, NOT the inner input) — gives full control over the focus visual. Used in listing toolbars and inside SidebarPanel for "search within filters".

## 2. WHY

OG JSDoc verbatim (`FilterSearchInput.tsx:1-22`):

> "FilterSearchInput — Atom (DS v4.3)"
> "WHAT: Search input with icon and clear button for filtering content."
> "WHY: Extracted from listing page header for reuse across Research & Surveys pillars."
> "WHEN: In listing page toolbars OR inside SidebarPanel for search-within-filters."
> "INTERACTION STATES (container-pattern — focus on OUTER div, not inner input): Default → borderColor rgba(0,0,0,0.1). Hover → borderColor rgba(0,0,0,0.25) (Weber's Law: 150% increase). Focus-within → borderColor rgba(0,0,0,0.9) (near-black = unmistakable). Disabled → borderColor rgba(0,0,0,0.06), color rgba(0,0,0,0.35), bg rgba(0,0,0,0.03). Clear btn → color rgba(0,0,0,0.35) → hover rgba(0,0,0,0.6) → active scale(0.9)"
> "NOTE: Focus ring is on the OUTER container (focus-within), NOT the inner <input>. The inner input has focus styles fully suppressed."

- Container-focus pattern allows custom border-color focus indicator (instead of browser's default outline on the input)
- Search icon + clear button = standard search-input affordance
- Weber's Law mention (`FilterSearchInput.tsx:11`) — explicit perceptual reasoning for the 0.1 → 0.25 hover step (150% increase = "just noticeable difference")
- Reusable across listing pillars (Research, Surveys, Reports)
- `minWidth` prop allows responsive width control

## 3. WHEN to use ✅

- Listing page toolbar — search across the visible result set
- Inside SidebarPanel — "search within filters" (e.g., search through 100 industries)
- Resource catalog search
- Component documentation search

## 4. WHEN NOT to use ❌

- Global site search → use a dedicated SearchBar with full keyboard nav (Cmd+K pattern)
- Form text input → use `shadcn/ui Input` with `<Label>` (form integration)
- Inline editable text → use plain `<input>` styled with text tokens
- Tag input / multi-select with text entry → use a combobox component
- Code search / regex / structured query — needs a more powerful input

## 5. WHERE used

- `FiltersDocumentation.tsx:431-437, 1461` — docs catalog
- `organisms/FiltersPanel.tsx:46` — `<FilterSearchInput value={sidebarSearch} onChange={setSidebarSearch} placeholder="Search filters..." />` — primary production consumer

## 6. HOW to implement

```tsx
const [query, setQuery] = useState('');

// Standard listing toolbar
<FilterSearchInput
  value={query}
  onChange={setQuery}
  placeholder="Search reports..."
/>

// Inside sidebar (narrower)
<FilterSearchInput
  value={filterQuery}
  onChange={setFilterQuery}
  placeholder="Search filters..."
  minWidth="240px"
/>

// Disabled (e.g., when no filters selected yet)
<FilterSearchInput
  value=""
  onChange={() => {}}
  disabled
  placeholder="Select an industry first"
/>
```

## 7. Properties

| Prop | Type | Default | Why exists |
|---|---|---|---|
| `value` | `string` | required | Controlled value |
| `onChange` | `(value: string) => void` | required | Updates value — receives string (not event) for ergonomics |
| `placeholder` | `string` | `'Search filters...'` | Default placeholder anchors the "search within filters" use case (`FilterSearchInput.tsx:37`) |
| `minWidth` | `string` | `'100%'` | Responsive width control (`FilterSearchInput.tsx:38`) |
| `disabled` | `boolean` | `false` | Suppresses input + clear button (`FilterSearchInput.tsx:39`) |

## 8. States

- **Default:** border `rgba(0,0,0,0.1)`, no fill (`FilterSearchInput.tsx:50`)
- **Hover:** border `rgba(0,0,0,0.25)` — Weber's-Law-calibrated 150% increase (`FilterSearchInput.tsx:48`)
- **Focus-within:** border `rgba(0,0,0,0.9)` — near-black (`FilterSearchInput.tsx:46`)
- **Disabled:** border `rgba(0,0,0,0.06)`, text `rgba(0,0,0,0.35)`, bg `rgba(0,0,0,0.03)`, `cursor-not-allowed` (`FilterSearchInput.tsx:44, 61-62`)
- **Has value (clear button visible):** X button shown to right (`FilterSearchInput.tsx:88-99`)

## 9. Variants

None.

## 10. Sizes

Fixed: container `px-3 py-2`, search icon `size={14}`, clear icon `size={12}`. Input text `var(--text-xs)`. Width via `minWidth` prop. (`FilterSearchInput.tsx:54, 68, 82, 97`)

## 11. Tokens used

- `--text-xs` — input font (`FilterSearchInput.tsx:82`)
- `--radius-element` (5px) — container rounding (`FilterSearchInput.tsx:57`)
- All colors raw rgba (per monochromatic discipline)

## 12. A11y rules

- Real `<input type="text">` — semantic, keyboard accessible
- Clear button `aria-label="Clear search"` ✓ (`FilterSearchInput.tsx:95`)
- **Gap:** No `aria-label` or `<label>` association on the input — placeholder is the only label. Screen readers announce placeholder but no persistent label. Wrap in `<Label>` at consumer level or add `ariaLabel` prop.
- Inner input has `outline:none` — focus moves to outer container's border-color change ✓ (`FilterSearchInput.tsx:80`)
- Disabled state uses real HTML `disabled` ✓
- Touch target: 14×14 search icon + ~36px tall container — clear button is ~24×24 (below 44px floor — **smell**)

## 13. Motion rules

- Container border `transition-colors duration-150` (`FilterSearchInput.tsx:54`)
- Clear button `transition-colors` (no explicit duration)
- `active:scale-[0.9]` on clear button (`FilterSearchInput.tsx:91`)
- Reduced-motion: not explicitly respected

## 14. Anti-patterns ❌

- Never style the inner `<input>` directly — focus ring lives on container, breaking either kills the UX
- Never replace with native `<input type="search">` (loses container focus pattern)
- Never use without `value` + `onChange` — controlled-only API
- Never use as form field — no Label, no validation, no form integration
- Never debounce inside the atom — that's parent's responsibility (`onChange` fires on every keystroke)
- Never override border color via className — defeats the focus visual

## 15. REUSABILITY SCORE

**4/5 ⭐⭐⭐⭐** — Documented production usage in FiltersPanel. Clean API. Lower than 5/5 only because grep shows limited spread.

## 16. Linked components

- **Parent:** `organisms/FiltersPanel.tsx:46`, `ListingToolbar`, `MobileFilterSheet`
- **Sibling atoms:** `<FilterChip>` (active filter display), `<FilterSectionHeader>` (filter group toggle), `<FilterCheckbox>` / `<FilterCheckboxItem>` (filter options)
- **Children:** Lucide `<Search>`, `<X>`
- **Hooks involved:** internal `useState` for focus + hover

## 17. Reasons + Decisions log

- **Container-focus pattern (`FilterSearchInput.tsx:17-19, 80`):** Explicit decision: "Focus ring is on the OUTER container (focus-within), NOT the inner <input>." Allows custom border color focus indicator instead of browser default outline.
- **Weber's Law step 0.1 → 0.25 (`FilterSearchInput.tsx:11`):** Explicitly cited in JSDoc. ~150% increase = "just-noticeable-difference" psychophysical threshold. The hover step is calibrated to be perceptible.
- **Focus-within border alpha 0.9 (`FilterSearchInput.tsx:46`):** Near-black, "unmistakable". Avoid pure black (1.0) so it doesn't read as "fixed border" — slight transparency keeps it dynamic.
- **Why `transition-colors duration-150` (`FilterSearchInput.tsx:54`):** 150ms = fast but visible. Matches FilterCheckbox transition for cross-atom consistency.
- **Why search icon size 14 / clear icon size 12 (`FilterSearchInput.tsx:68, 97`):** Search icon larger because it's persistent context (the "what this is"). Clear icon smaller because it's conditional and shouldn't dominate when active.
- **Why icon color 0.35 default (`FilterSearchInput.tsx:70`):** De-emphasizes icons relative to text content. Icons are scaffolding, text is content.
- **`minWidth` prop with default 100% (`FilterSearchInput.tsx:38`):** Default fills parent. Consumer overrides for fixed-width contexts (sidebar = 240px, header = auto).
- **Disabled state has bg tint (`FilterSearchInput.tsx:61`):** Visual disambiguation — disabled inputs need to look different from empty inputs. The `rgba(0,0,0,0.03)` is barely visible but enough to feel "inert".
- **Why `onMouseEnter`/`onMouseLeave` on outer div not CSS :hover (`FilterSearchInput.tsx:64-65`):** Logic depends on `disabled` state — conditional via JS is cleaner than CSS `:hover:not(:disabled)`.
- **No label association (gap):** Should add `<label>` wrap or `aria-label` prop. Currently relies on parent / placeholder.
