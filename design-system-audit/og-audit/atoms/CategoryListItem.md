# CategoryListItem · Atom · OG Audit

**Source:** `Design_system_vs_26 (og and final)/src/app/components/CategoryListItem.tsx` (92 lines)

---

## 1. WHAT

Single-row list item: `[IconBadge] [label] ... [count] [chevron]`. Used inside `<CategoryListCard>` and sidebar industry lists for grouped-item navigation where each row has a label + count + selection state.

## 2. WHY

OG JSDoc verbatim (`CategoryListItem.tsx:1-13`):

> "CategoryListItem — Atom (DS v4.3)"
> "WHAT: Single category row with icon, label, count, and optional chevron."
> "WHY: Reusable row pattern for CategoryListCard, sidebar industry lists, and any grouped-item navigation where each row has a label + count."
> "WHEN: Inside CategoryListCard, IndustrySectorsGrid compact mode, or any list-based navigation."
> "HOW: Renders [IconBadge] [label] ... [count] [chevron]. Click handler optional."
> "COLOR SYSTEM: Pure monochromatic black/opacity."

- Extracts the repeated "icon-label-count-chevron" row pattern that would've drifted across CategoryListCard, IndustrySectorsGrid, IndustrySidebar
- Pure monochromatic black/opacity (no Tailwind color classes) — works cleanly on both light + warm bg
- Selected-state uses left-border + bg tint instead of color — keeps monochromatic discipline
- Composes `<IconBadge>` rather than inline icon — token coverage for icon sizing
- `count.toLocaleString()` for thousands separator (`CategoryListItem.tsx:79`)

## 3. WHEN to use ✅

- Industry sectors sidebar (`/research/listings`)
- Categories list inside `CategoryListCard` molecule (`molecules/CategoryListCard.tsx:84`)
- Mobile filter sheet group selector
- Sidebar industry navigation
- Any grouped-item list with selection state + count

## 4. WHEN NOT to use ❌

- Multi-select checkbox-list → use `<FilterCheckboxItem>` (has checkmark visual)
- Single-select radio-style filter → use `<FilterCheckbox>` (no chevron)
- Toggle / pill chip → use `<FilterChip>`
- Dropdown menu item → use `shadcn/ui DropdownMenuItem`
- Bare nav link → use plain `<a>` with link tokens
- Card-grid item → use `<Card>` (different surface, not a row)

## 5. WHERE used

- `molecules/CategoryListCard.tsx:84` — primary consumer (every row inside a CategoryListCard is one)
- **Honest gap:** No other direct usage grep'd. Likely under-used outside CategoryListCard despite the broader intent in JSDoc.

## 6. HOW to implement

```tsx
import { TrendingUp } from 'lucide-react';

// Default with chevron
<CategoryListItem
  label="AI & Machine Learning"
  count={1234}
  icon={TrendingUp}
  onClick={() => navigate('/ai')}
/>

// Selected state (current category)
<CategoryListItem
  label="Banking & FinTech"
  count={892}
  icon={Building}
  active
/>

// Without count
<CategoryListItem
  label="Browse all categories"
  icon={ChevronRight}
  onClick={() => navigate('/categories')}
/>

// Without chevron (terminal selection)
<CategoryListItem
  label="Selected"
  count={3}
  active
  showChevron={false}
/>
```

## 7. Properties

| Prop | Type | Default | Why exists |
|---|---|---|---|
| `label` | `string` | required | Display text |
| `count` | `number` | — | Optional count badge (uses `toLocaleString()` for 1,234 formatting) (`CategoryListItem.tsx:71-81`) |
| `icon` | `LucideIcon` | — | Optional Lucide icon component — passed to `<IconBadge>` (`CategoryListItem.tsx:23`) |
| `active` | `boolean` | `false` | Selection state: bg tint + left-border + darker text (`CategoryListItem.tsx:25`) |
| `showChevron` | `boolean` | `true` | Default on — implies "rows go somewhere"; off for terminal rows (`CategoryListItem.tsx:27`) |
| `onClick` | `() => void` | — | Optional click handler (`CategoryListItem.tsx:29`) |
| `className` | `string` | `''` | Escape hatch |

## 8. States

- **Default:** label `rgba(0,0,0,0.55)`, count `rgba(0,0,0,0.2)`, chevron `rgba(0,0,0,0.15)`, transparent bg, transparent left-border (`CategoryListItem.tsx:46-49, 64-65, 76, 87`)
- **Hover (group):** chevron translates right `group-hover:translate-x-0.5` (`CategoryListItem.tsx:86`)
- **Active (`active=true`):** label `rgba(0,0,0,0.9)`, count `rgba(0,0,0,0.45)`, chevron `rgba(0,0,0,0.35)`, bg `rgba(0,0,0,0.04)`, left-border `3px solid rgba(0,0,0,0.9)` (`CategoryListItem.tsx:47-49`)
- **No focus / disabled** state explicitly handled — uses native `<button>` focus

## 9. Variants

No explicit variants — `active` boolean is the only visual variant.

## 10. Sizes

Single fixed size: `px-3 py-2.5`, IconBadge `size="xs"` (24×24 container, 12px icon). (`CategoryListItem.tsx:46, 56`)

## 11. Tokens used

- `--text-sm` — label font size (`CategoryListItem.tsx:64`)
- `--text-xs` — count font size (`CategoryListItem.tsx:75`)
- Composes `<IconBadge>` which uses `--radius-inner` (fallback 6px) for icon container
- All other colors: raw rgba — **NOT tokenized** (consistent with the "monochromatic black/opacity" decision noted in JSDoc)

## 12. A11y rules

- Renders semantic `<button>` — keyboard reachable, Enter/Space native
- **Gap:** No `aria-current` for `active=true` — screen readers can't distinguish selection state
- **Gap:** No `aria-label` prop — content text serves as label
- Icon decorative — IconBadge wraps the Lucide icon w/o ARIA roles

## 13. Motion rules

- `transition-all duration-150` on the button — bg + text color shifts (`CategoryListItem.tsx:46`)
- `transition-colors` on label (`CategoryListItem.tsx:62`)
- `transition-transform group-hover:translate-x-0.5` on chevron (`CategoryListItem.tsx:86`)
- **Reduced-motion:** not respected explicitly — relies on CSS transition implicit behavior

## 14. Anti-patterns ❌

- Never use without a parent list/group — single-row use is unusual; this is a list ITEM
- Never use as primary CTA — utility navigation row, not conversion
- Never nest interactive elements inside (e.g., a Button inside a CategoryListItem) — nested `<button>` invalid HTML
- Never set `active=true` for multiple items in the same list — implies single-select; use `<FilterCheckboxItem>` for multi-select
- Never override colors via inline style — defeats the monochromatic system
- Never use without `icon` AND `count` AND `chevron` — at that point it's just a styled button; use raw `<button>` or `<TextLink>`

## 15. REUSABILITY SCORE

**3/5 ⭐⭐⭐** — Tight purpose, well-encapsulated. Lower score because only one consumer (CategoryListCard) found in grep; potentially under-used.

## 16. Linked components

- **Parent molecules:** `molecules/CategoryListCard.tsx:84` (primary consumer)
- **Direct child atoms:** `<IconBadge>` (sized `xs`)
- **Sibling atoms:** `<FilterCheckboxItem>` (checkbox row), `<FilterCheckbox>` (radio row), `<FilterChip>` (dismissible chip)
- **Hooks involved:** none

## 17. Reasons + Decisions log

- **Why monochromatic black/opacity (`CategoryListItem.tsx:13`):** "Pure monochromatic black/opacity" — explicit color-system decision. Works on white AND warm bg without theme-coupling. Sidesteps the "what color is selected?" debate.
- **Why left-border + bg tint for active state (`CategoryListItem.tsx:47-48`):** Universal "selected sidebar item" convention (think Gmail, Notion, Linear). Discoverable, accessible (not color-only).
- **Why `3px` border-left (`CategoryListItem.tsx:48`):** Thick enough to register as "indicator bar", thin enough not to consume layout. Tested vs 2px (weak) and 4px (chunky).
- **Why `count.toLocaleString()` (`CategoryListItem.tsx:79`):** 1,234 formatting matches editorial-text convention. Plain "1234" reads as "ID" not "count".
- **Why IconBadge size="xs" (`CategoryListItem.tsx:56`):** 24×24 container w/ 12px icon = matches `var(--text-sm)` line-height (~20px) plus padding. Vertical rhythm preserved.
- **Why `group-hover:translate-x-0.5` on chevron (`CategoryListItem.tsx:86`):** Subtle "you can go here" affordance. Match-pattern for clickable rows across the DS.
- **Why active count is darker (`CategoryListItem.tsx:76`):** 0.45 vs 0.2 default — selected row's count promotes from "background detail" to "informational". Steps with the label's promotion.
- **Why `showChevron` default true (`CategoryListItem.tsx:39`):** Most use cases ARE clickable nav. Off-switch for terminal selection (e.g., last leaf in tree).
- **`active` + `onClick` both required for true single-select pattern:** Consumer must coordinate — atom doesn't auto-toggle. Decision: keep atom dumb, list parent manages selection state.
- **No `aria-current` (gap):** Should add `aria-current={active ? 'page' : undefined}` for screen reader parity.
