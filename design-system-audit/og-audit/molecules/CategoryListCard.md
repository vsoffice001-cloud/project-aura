# CategoryListCard — Molecule Audit (OG DS v4.3)

> **Source:** `Design_system_vs_26 (og and final)/src/app/components/molecules/CategoryListCard.tsx:43-116`
> **OG comment (line 1-9):** *"CategoryListCard — Molecule (DS v4.3). WHAT: Card containing a list of CategoryListItems with a header and optional footer. WHY: Used for 'Browse by Industry' or 'Browse by Region' compact cards. WHEN: Report Store home page sidebar, explore sections, quick-nav cards. HOW: Composes Card + SectionHeading (compact) + CategoryListItem rows."*

---

## 1. WHAT
A self-contained card UI block that presents a list of selectable categories (industry, region, type, etc.) with a small header (optional label + title), divider, list of `CategoryListItem` rows, a "+N more" truncation footer, and an optional custom footer slot. Designed for browse/quick-nav sidebars and explore sections.

## 2. WHY
- **Pattern compression** — "Browse by X" sections recur across the report store. Each was previously hand-built; this molecule fixes the visual contract.
- **Active state lives at this layer** — `activeLabel` prop drives the highlighted item; consumer holds state once and passes it down.
- **Truncation built-in** (`maxVisible`) — listing-with-collapse pattern handled internally; consumer just supplies all items.
- **Footer slot** — extends card with arbitrary CTA (e.g., "View all industries") without forking the molecule.

## 3. WHEN to use ✅
- Report Store sidebar with "Browse by Industry" / "Browse by Region" lists · `ReportStoreOrganismsShowcase.tsx:360`
- Explore page quick-nav cards (top 5 categories with link to full list)
- Settings panel with grouped category navigation
- Any vertical list of <8 categories with optional counts + active selection

## 4. WHEN NOT to use ❌
- Wide horizontal pill row of categories → use a horizontal chip list (not this)
- Hierarchical/tree categories → this is flat; use a tree component
- Multi-select facet filter → use `FilterAccordion` (this is single-select navigation)
- Long uncollapsed lists (>15 items) → use `maxVisible` or a virtualized list molecule
- Footer needs CTA + counts + button → build a custom organism

## 5. WHERE used (file:line)
- `components/ReportStoreOrganismsShowcase.tsx:360` — primary showcase (single consumer in OG)

> Single-consumer molecule indicates v4.3 introduction — not yet adopted across pages.

## 6. HOW to implement

```tsx
import { CategoryListCard } from '@/app/components/molecules/CategoryListCard';
import { Globe, Briefcase, FlaskConical } from 'lucide-react';

<CategoryListCard
  label="EXPLORE"
  title="Browse by industry"
  items={[
    { label: 'Healthcare',     count: 1280, icon: FlaskConical },
    { label: 'Financial Svcs', count:  962, icon: Briefcase },
    { label: 'Energy',         count:  734, icon: Globe },
    // ...
  ]}
  activeLabel="Healthcare"
  onSelect={(label) => router.push(`/industry/${slug(label)}`)}
  maxVisible={5}
  showChevrons
  footer={<button className="...">View all 24 industries</button>}
/>
```

## 7. Composition tree
- `Card` (atom) — `shadow="sm"`, `padding="none"` (controls internal padding manually)
  - **Header block** (px-4 pt-4 pb-3)
    - optional `<span>` uppercase label
    - `<h3>` title
  - **Divider** (1px line)
  - **Items block** (`py-1`) — `visibleItems.map → CategoryListItem`
  - **More indicator** (if `hasMore`) — `<button>` "+N more" → calls `onSelect('__view_all__')`
  - **Footer slot** (if provided) — wrapped in top-border container

**Atoms consumed:** `Card`, `CategoryListItem`.

## 8. Properties

| Prop | Type | Default | WHY |
|---|---|---|---|
| `title` | string | — (required) | Card heading text |
| `label?` | string | — | Eyebrow above title (kicker text) |
| `items` | `CategoryItem[]` | — (required) | List of rows |
| `activeLabel?` | string | — | Currently selected; matches by string equality |
| `onSelect?` | `(label:string)=>void` | — | Click handler per item + "view all" sentinel |
| `showChevrons?` | boolean | `true` | Show right-arrow on each row |
| `maxVisible?` | number | `0` | Items shown before "+N more". 0 = show all |
| `footer?` | ReactNode | — | Custom footer slot |
| `className?` | string | `""` | Pass-through |

## 9. Data contract

```ts
interface CategoryItem {
  label: string;
  count?: number;
  icon?: LucideIcon;
}

interface CategoryListCardProps {
  title: string;
  label?: string;
  items: CategoryItem[];
  activeLabel?: string;
  onSelect?: (label: string) => void;
  showChevrons?: boolean;
  maxVisible?: number;     // 0 = show all
  footer?: React.ReactNode;
  className?: string;
}
```

**Where data comes from:** taxonomy catalog (`design-system/catalogs/industries.ts` etc.) → consumer slices to top-N → passes as `items`.

**Magic string:** `'__view_all__'` sentinel passed to `onSelect` when "+N more" clicked (line 103). Consumer must handle this.

## 10. States
- **All items visible** (`maxVisible=0`): full list, no more-indicator.
- **Truncated** (`maxVisible<items.length`): first N + "+(remaining) more" button.
- **Active item:** `activeLabel === item.label` → row highlight (in `CategoryListItem`).
- **Hover row:** handled by `CategoryListItem` atom.
- **With footer:** footer block appears below items with top border.
- **No items:** still renders header + divider (no empty-state UX). Edge case — consider gating upstream.

## 11. Variants
None at molecule level. Visual customization via `showChevrons` flag and `footer` slot.

## 12. Responsive behavior
- Card is full-width of its container. No internal breakpoint logic.
- Hidden/shown via parent (sidebar typically `hidden lg:block`).

## 13. Tokens used
- `var(--text-card-micro)` label
- `var(--text-base)` title
- `var(--text-xs)` more-indicator button
- Inline colors: `rgba(0,0,0,0.4)`, `rgba(0,0,0,0.9)`, divider `rgba(0,0,0,0.06)`, footer border `rgba(0,0,0,0.04)`

## 14. A11y rules
- `<h3>` for title — semantic heading ✅
- `<button>` for "+N more" — keyboard reachable ✅
- Active state visual (in CategoryListItem) should pair with `aria-current="true"` — verify atom
- **Gap:** no `aria-label` on header label-eyebrow; could be confusing for SR
- **Gap:** "+N more" button text is dynamic — fine, but missing `aria-label` for screen reader expansion intent

## 15. Motion rules
- No internal motion. Item-level hover transitions live in `CategoryListItem`.

## 16. Anti-patterns ❌
- Don't pass huge lists without `maxVisible` — performance and visual overload.
- Don't repurpose `onSelect('__view_all__')` magic string — it's a contract; consumer must handle.
- Don't use for multi-select filtering — wrong semantic; use `FilterAccordion`.
- Don't nest CategoryListCard inside CategoryListCard.
- Don't override `padding="none"` on Card — molecule controls inner spacing.
- Don't pass `items` without unique `label` per item — used as React key (line 85).

## 17. REUSABILITY SCORE
**3/5 ⭐⭐⭐** — Solid pattern but currently single-consumer; reusability potential is 5 once adopted across Report Store + explore pages. Niche outside taxonomy navigation.

## 18. Linked components
- **Parent organisms:** `ReportStoreOrganismsShowcase` (showcase) + future report store sidebar
- **Sibling molecules:** `FilterAccordion` (filtering, not navigation) · `SidebarPanel` (container)
- **Child atoms:** `Card`, `CategoryListItem`
- **Icons:** any `LucideIcon` via item.icon

## 19. Reasons + Decisions log
- **Why `padding="none"` + manual internal padding?** Header has `px-4 pt-4 pb-3`; divider full-width; items `py-1`. Card's default padding would mis-align the divider.
- **Why "+N more" inside the card vs a separate "see all" CTA?** Single click target inside the card means user doesn't need to leave the card region to see more. Footer slot covers true CTA case.
- **Why `'__view_all__'` magic string?** Allows reusing `onSelect` for both item click + view-all without exposing two handlers. Tradeoff: magic value tracking. Alternative: `onViewAll?: ()=>void` separate prop — cleaner; could refactor.
- **Why `maxVisible=0` default = show all?** Defaults to least surprising; truncation is opt-in.
- **Why `label` (eyebrow) above title?** Kicker pattern — adds context (`EXPLORE` / `BROWSE`) without bloating title text. Matches editorial typography rhythm.
- **Why no count display in header (e.g., "Industries (24)")?** Tested — feels redundant when items show their own counts. Header stays clean.
- **Why divider as `<div height:1px>` not `<hr>`?** Avoids browser default margin. Cheap visual rule.
- **Why active state matched by **string** label?** Simplicity over IDs. Risk: label collision across taxonomies (none seen in Ken catalogs).
- **Why footer wrapped in top-border `<div>`?** Visual separation from items list; consistent if footer is text vs button.
- **Why no `aria-current` wired?** Gap. Should be added to `CategoryListItem` atom — molecule passes `active` prop already.
