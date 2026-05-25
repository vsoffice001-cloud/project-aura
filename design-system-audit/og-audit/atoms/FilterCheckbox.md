# FilterCheckbox · Atom · OG Audit

**Source:** `Design_system_vs_26 (og and final)/src/app/components/FilterCheckbox.tsx` (70 lines)

---

## 1. WHAT

Single-select radio-button-style filter option button. Label + optional count + selection indicator via left-border (3px black) + bg tint. Monochromatic black/opacity color system — works on both light and warm bg without theme coupling.

## 2. WHY

OG JSDoc verbatim (`FilterCheckbox.tsx:1-19`):

> "FilterCheckbox — Atom (DS v4.3)"
> "WHAT: Single filter option button with label + count."
> "WHY: Extracted from IndustrySidebar to create a reusable, testable filter control."
> "WHEN: Inside FilterAccordion groups (Industry, Format, Region, Tags, Years)."
> "HOW: Monochromatic black/opacity color system. Selected state uses black left-border indicator + darkened text. No colour hue."
> "INTERACTION STATES: Default → color rgba(0,0,0,0.5), bg transparent. Hover → color rgba(0,0,0,0.85), bg rgba(0,0,0,0.02). Selected → color rgba(0,0,0,0.9), bg rgba(0,0,0,0.04), borderLeft 3px black. Disabled → opacity 0.4, cursor-not-allowed, no hover. Pressed → scale(0.98) (active pseudo-class)"
> "COLOR SYSTEM: All colors via inline style rgba(). No Tailwind color classes."

- Extracts duplicate sidebar filter pattern → testable atom
- Pairs with `<FilterCheckboxItem>` (multi-select variant) — naming distinguishes single vs multi
- Monochromatic via inline rgba (not Tailwind classes) — works across light/warm/black bg
- Left-border indicator pattern matches `<CategoryListItem>` selection convention — DS-wide consistency

## 3. WHEN to use ✅

- Single-select filter group (e.g., "Format: Full Report / Excerpt / Summary" — only one)
- Pricing tier picker
- Sort order selector
- Inside `<FilterAccordion>` groups (per JSDoc)

## 4. WHEN NOT to use ❌

- Multi-select → use `<FilterCheckboxItem>` (has check square + multi-select semantics)
- Dismissible chip → use `<FilterChip>` (X button)
- Toggle / on-off → use `shadcn/ui Switch`
- Nav row with icon → use `<CategoryListItem>` (has icon + chevron)
- Form radio with required validation → use `shadcn/ui RadioGroup` (form integration)

## 5. WHERE used

- `FiltersDocumentation.tsx:492-495` — docs catalog
- **Honest gap:** No production consumer grep'd directly. Likely consumed via FilterAccordion molecule (not visible in grep due to deeper composition).

## 6. HOW to implement

```tsx
// Single-select group
const [selected, setSelected] = useState<string | null>(null);

['Full Report', 'Excerpt', 'Summary'].map(option => (
  <FilterCheckbox
    key={option}
    label={option}
    count={counts[option]}
    selected={selected === option}
    onClick={() => setSelected(option)}
  />
))

// Disabled (e.g., "Tags" requires industry selected first)
<FilterCheckbox label="AI / ML" disabled />
```

## 7. Properties

| Prop | Type | Default | Why exists |
|---|---|---|---|
| `label` | `string` | required | Filter option text |
| `count` | `number` | — | Optional count badge (shown to right) (`FilterCheckbox.tsx:24`) |
| `selected` | `boolean` | `false` | Selection state — drives left-border + bg + text shift (`FilterCheckbox.tsx:25`) |
| `disabled` | `boolean` | `false` | Suppresses hover, click; sets `cursor-not-allowed` + 40% opacity (`FilterCheckbox.tsx:26`) |
| `onClick` | `() => void` | — | Click handler (suppressed when disabled) |

## 8. States

- **Default:** `color: rgba(0,0,0,0.5)`, `bg: transparent`, `borderLeft: 3px transparent` (`FilterCheckbox.tsx:46-48`)
- **Hover (not selected, not disabled):** `color: rgba(0,0,0,0.85)`, `bg: rgba(0,0,0,0.02)` (`FilterCheckbox.tsx:33, 47-48`)
- **Selected:** `color: rgba(0,0,0,0.9)`, `bg: rgba(0,0,0,0.04)`, `borderLeft: 3px solid rgba(0,0,0,1)` (`FilterCheckbox.tsx:46-48`)
- **Disabled:** `opacity: 0.4`, `cursor: not-allowed`, no hover (`FilterCheckbox.tsx:49-50`)
- **Pressed:** `active:scale-[0.98]` Tailwind utility (`FilterCheckbox.tsx:39`)

## 9. Variants

None — selection state is the only visual variant.

## 10. Sizes

Single fixed size: `py-1.5 px-2.5`. Label `var(--text-xs)` 12.8px, count `var(--text-card-micro)` 10px. (`FilterCheckbox.tsx:39, 42, 60`)

## 11. Tokens used

- `--text-xs` — label font size (`FilterCheckbox.tsx:42`)
- `--text-card-micro` — count font size (`FilterCheckbox.tsx:60`)
- All colors raw rgba — intentionally NOT tokenized (per "monochromatic black/opacity" decision)

## 12. A11y rules

- Renders `<button>` — keyboard reachable
- **Gap:** No `aria-pressed` or `aria-checked` for selection state — AT users get no indicator
- **Gap:** No `role="radio"` — semantically it's a radio choice but uses button
- Disabled state uses real HTML `disabled` attr ✓ (`FilterCheckbox.tsx:38`)

## 13. Motion rules

- `transition-all duration-100` — fast (100ms) because filters need responsive feedback (`FilterCheckbox.tsx:39`)
- `active:scale-[0.98]` press state
- Reduced-motion: not explicitly respected (Tailwind transition default)

## 14. Anti-patterns ❌

- Never use for multi-select — single-select semantic baked in; use `<FilterCheckboxItem>`
- Never override colors via className — defeats monochromatic system
- Never use without managing `selected` state at parent — atom is dumb
- Never use as primary CTA — filter affordance only
- Never pair with `<FilterCheckboxItem>` in same group — visual inconsistency (radio + checkbox styles mixed)

## 15. REUSABILITY SCORE

**3/5 ⭐⭐⭐** — Tight single-purpose atom. Used inside FilterAccordion molecule. Slightly under-used in OG grep.

## 16. Linked components

- **Parent:** `FilterAccordion` molecule, `IndustrySidebar`
- **Sibling atoms:** `<FilterCheckboxItem>` (multi-select sister), `<FilterChip>` (dismissible pill), `<CategoryListItem>` (nav row with icon)
- **Hooks involved:** none — internal `useState` for hover

## 17. Reasons + Decisions log

- **Why monochromatic black/opacity (`FilterCheckbox.tsx:17`):** "All colors via inline style rgba(). No Tailwind color classes." Allows the atom to work on any bg without theme prop.
- **Why left-border 3px not checkmark (`FilterCheckbox.tsx:46`):** Single-select pattern — left-border = "currently active row" (Gmail/Notion convention). Checkmark would imply multi-select.
- **Why 0.5 → 0.85 → 0.9 text opacity progression (`FilterCheckbox.tsx:47`):** Visually distinct states. 0.5 (resting) → 0.85 (hover invitation) → 0.9 (selected commitment). 3-tier scale, not 2.
- **Why `transition-all duration-100` (`FilterCheckbox.tsx:39`):** 100ms = perceived as "instant" but still smooth. Filter feedback needs immediacy — slow transitions feel laggy.
- **Why `active:scale-[0.98]` (`FilterCheckbox.tsx:39`):** Tactile press feedback. 0.98 (not 0.95) = subtle, doesn't break layout.
- **Why distinct from FilterCheckboxItem (`FilterCheckbox.tsx:13-14` in sister file):** Documented split: single-select (this) vs multi-select (FilterCheckboxItem). Visual semantics differ (border-left vs check square).
- **Why count font smaller (`--text-card-micro` 10px):** De-emphasizes count vs label. Count is "context", label is "action".
- **No `aria-pressed` (gap):** Should add `aria-pressed={selected}` or shift to `role="radio"` + `aria-checked`.
- **`useState` for hover (`FilterCheckbox.tsx:31`):** Hand-tracked hover vs CSS `:hover` because of the conditional `isHovered = hovered && !disabled && !selected` logic — CSS can't express this.
