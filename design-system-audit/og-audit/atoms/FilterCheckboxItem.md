# FilterCheckboxItem · Atom · OG Audit

**Source:** `Design_system_vs_26 (og and final)/src/app/components/FilterCheckboxItem.tsx` (108 lines)

---

## 1. WHAT

Multi-select checkbox-style filter option with check square + label + optional count. Filled-square when checked, label color promotes, left-border tints. Used inside sidebar filter sections for Tags, Regions, Publish Year — anywhere users pick multiple items.

## 2. WHY

OG JSDoc verbatim (`FilterCheckboxItem.tsx:1-23`):

> "FilterCheckboxItem — Atom (DS v4.3)"
> "WHAT: Checkbox-style filter option with check square, label, and optional count."
> "WHY: Extracted from 3x duplicate inline checkbox patterns in the sidebar (Tags, Regions, Publish Year all share identical checkbox anatomy)."
> "vs FilterCheckbox (atom): FilterCheckbox = single-select radio-button-style (borderLeft + text only). FilterCheckboxItem = multi-select checkbox-style (square check + borderLeft)"
> "INTERACTION STATES: Default → checkbox border rgba(0,0,0,0.18), label rgba(0,0,0,0.5). Hover → bg rgba(0,0,0,0.02). Checked → checkbox filled black + white check, label 0.85, bg 0.03, borderLeft 0.6. Focus → role=\"checkbox\" + tabIndex for keyboard access"
> "RADIUS: Checkbox → var(--radius-inner) = 2.5px (DS checkbox mark radius)"

- Replaces 3x duplicate inline checkbox patterns → DRY
- Naming explicitly contrasts with FilterCheckbox (sister atom) — multi vs single
- Filled check square is the conventional multi-select indicator (universally read as "multi pick")
- `role="checkbox"` + `aria-checked` + keyboard Space/Enter handlers — best a11y of any filter atom
- Custom checkbox visual (not native) for visual control + token alignment

## 3. WHEN to use ✅

- Tags filter group (multi-select)
- Regions filter (Europe, Asia, NA simultaneously)
- Publish year multi-select
- Industry sub-filter multi-pick
- Any "select all that apply" group

## 4. WHEN NOT to use ❌

- Single-select (one-of-N) → use `<FilterCheckbox>` (no check square)
- Toggle on/off → use `shadcn/ui Switch`
- Dismissible chip → use `<FilterChip>` (X button)
- Form checkbox with validation → use `shadcn/ui Checkbox` (form integration)
- Categorical nav with chevron → use `<CategoryListItem>`

## 5. WHERE used

- `FiltersDocumentation.tsx:546, 1329, 1348, 1578, 1606` — docs catalog
- **Honest gap:** No production consumer grep'd directly; likely consumed via SidebarPanel composition.

## 6. HOW to implement

```tsx
const [selected, setSelected] = useState<Set<string>>(new Set());

['Europe', 'Asia', 'NA'].map(region => (
  <FilterCheckboxItem
    key={region}
    label={region}
    count={regionCounts[region]}
    checked={selected.has(region)}
    onChange={() => {
      const next = new Set(selected);
      if (next.has(region)) next.delete(region);
      else next.add(region);
      setSelected(next);
    }}
  />
))

// No tooltip (label is short)
<FilterCheckboxItem
  label="2024"
  checked
  showTooltip={false}
/>
```

## 7. Properties

| Prop | Type | Default | Why exists |
|---|---|---|---|
| `label` | `string` | required | Option text |
| `checked` | `boolean` | `false` | Check state |
| `count` | `number` | — | Optional count to right |
| `onChange` | `() => void` | — | Toggle handler (no boolean arg — caller derives from current state) |
| `showTooltip` | `boolean` | `true` | Sets `title={label}` for truncated labels (native HTML tooltip) (`FilterCheckboxItem.tsx:34`) |

## 8. States

- **Default:** checkbox border `rgba(0,0,0,0.18)`, label `rgba(0,0,0,0.5)`, bg transparent (`FilterCheckboxItem.tsx:54-57, 71, 87`)
- **Hover:** bg `rgba(0,0,0,0.02)` (`FilterCheckboxItem.tsx:54`)
- **Checked:** checkbox filled black + white Check icon, label `rgba(0,0,0,0.85)`, bg `rgba(0,0,0,0.03)`, left-border `2px solid rgba(0,0,0,0.6)` (`FilterCheckboxItem.tsx:54-57, 71-78, 87`)
- **Focus:** native focus on `<div role="checkbox" tabIndex={0}>` (`FilterCheckboxItem.tsx:48-50`)
- **No disabled state** — gap

## 9. Variants

None — checked state is the only visual variant.

## 10. Sizes

Single fixed size: `padding: 6px 16px`, checkbox `w-4 h-4` (16px), label `var(--text-xs)`, count `var(--text-card-micro)`. (`FilterCheckboxItem.tsx:53, 66, 86, 98`)

## 11. Tokens used

- `--text-xs` — label font (`FilterCheckboxItem.tsx:86`)
- `--text-card-micro` — count font (`FilterCheckboxItem.tsx:98`)
- `--radius-inner` (2.5px) — checkbox mark radius (`FilterCheckboxItem.tsx:68`)
- All colors raw rgba (per monochromatic decision)

## 12. A11y rules

- `role="checkbox"` + `aria-checked={checked}` ✓ (`FilterCheckboxItem.tsx:48-49`)
- `tabIndex={0}` — keyboard focusable ✓
- Space + Enter trigger `onChange` ✓ (`FilterCheckboxItem.tsx:62`)
- `e.preventDefault()` on Space — prevents page scroll ✓
- `title={label}` tooltip when `showTooltip` ✓ — discovers truncated labels (`FilterCheckboxItem.tsx:84`)
- **Best a11y of all filter atoms** — pattern to copy for FilterCheckbox

## 13. Motion rules

- `transition-all duration-100` on container (`FilterCheckboxItem.tsx:51`)
- Checkbox `transition-all duration-150` for fill animation (`FilterCheckboxItem.tsx:66`)
- Label `transition-colors duration-100` (`FilterCheckboxItem.tsx:83`)
- Count `transition-colors duration-100` (`FilterCheckboxItem.tsx:96`)
- Reduced-motion: not explicitly respected

## 14. Anti-patterns ❌

- Never use for single-select — use `<FilterCheckbox>`
- Never override the check square visual via className — breaks the conventional multi-select read
- Never disable via `disabled` HTML — atom has no disabled prop (gap to flag)
- Never use without `onChange` — atom doesn't toggle itself
- Never put inside a `<button>` — invalid HTML (already has `tabIndex` for keyboard)

## 15. REUSABILITY SCORE

**4/5 ⭐⭐⭐⭐** — Best-a11y filter atom, well-encapsulated. Used inside FilterAccordion / SidebarPanel composition.

## 16. Linked components

- **Parent:** `FilterAccordion`, `SidebarPanel`, mobile `MobileFilterSheet`
- **Sibling atoms:** `<FilterCheckbox>` (single-select), `<FilterChip>` (dismissible), `<FilterSectionHeader>` (section toggle)
- **Children:** Lucide `<Check>` icon
- **Hooks involved:** internal `useState` hover

## 17. Reasons + Decisions log

- **Why FilterCheckbox + FilterCheckboxItem split (`FilterCheckboxItem.tsx:13-14`):** Different selection semantics warrant different visual affordances. Single-select shows current selection via border-left. Multi-select shows individual selections via check squares. Mixing them = user confusion about whether they can pick multiple.
- **Why `var(--radius-inner) = 2.5px` for checkbox (`FilterCheckboxItem.tsx:68`):** DS-defined checkbox mark radius. Smaller than card (10px) or element (5px) — checkboxes have their own micro-radius tier.
- **Why `1.5px` checkbox border (`FilterCheckboxItem.tsx:69`):** Heavier than `1px` (looks too thin at 16px size) but lighter than `2px` (looks chunky). Calibrated.
- **Why `Check size={10} strokeWidth={3}` (`FilterCheckboxItem.tsx:78`):** Heavier stroke than default `2` because the icon is small (10px) — at small sizes, increased stroke prevents the check from looking thready.
- **Why `boxShadow` differs by checked state (`FilterCheckboxItem.tsx:73-75`):** Unchecked: inset shadow (looks recessed, inviting). Checked: drop shadow (looks lifted, committed). Subtle depth cue.
- **Why `borderLeft 2px not 3px` (`FilterCheckboxItem.tsx:55`):** FilterCheckbox uses 3px (heavier single-select indicator). FilterCheckboxItem uses 2px (subtler because the check square already carries the visual weight).
- **Why `borderLeft alpha 0.6` not `1.0` (`FilterCheckboxItem.tsx:57`):** Softer than FilterCheckbox's pure black because the check square is the primary indicator; left-border is reinforcement.
- **Why `role="checkbox"` on `<div>` not native `<input type="checkbox">` (`FilterCheckboxItem.tsx:48`):** Custom visual control needed (filled black square + white check). Native checkbox can't be styled this thoroughly across browsers. Trade-off: keyboard handling re-implemented (Space/Enter via onKeyDown).
- **Why `e.preventDefault()` on Space (`FilterCheckboxItem.tsx:62`):** Without it, Space scrolls the page in a non-form context. Required.
- **`onChange` signature is `() => void` not `(checked: boolean) => void`:** Consumer derives new state from current. Trade-off: simpler API but consumer must track state.
- **No `disabled` prop (gap):** Should add for "Tags requires industry first" pattern that FilterCheckbox handles. Inconsistent API.
