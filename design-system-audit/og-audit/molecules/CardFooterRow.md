# CardFooterRow — Molecule Audit (OG DS)

> **Source:** `Design_system_vs_26 (og and final)/src/app/components/molecules/CardFooterRow.tsx:13-22`
> **OG comment (line 1-4):** *"CardFooterRow — Molecule. Bottom row: date display with Calendar icon. Pinned to bottom via mt-auto."*

---

## 1. WHAT
A minimal one-line card footer element showing a date label with a calendar icon, pinned to the bottom of its parent flex container via `mt-auto`. Single-purpose: surface "when was this published/updated" at the foot of a card.

## 2. WHY
- **Standardization of card bottoms** — without this molecule, each card type would freestyle its date rendering (icon yes/no, color, spacing). Drift across `ReportCard`, `AnalystPickCardB`, etc. is prevented.
- **Pinning is the trick:** `mt-auto` (when parent is `flex flex-col`) pushes this row to the foot regardless of body content height — aligning grids of varying-content cards.
- **Visual constraint:** the icon color is centralized via `iconColors.utility` (line 17) — change one place, all card footers update.

## 3. WHEN to use ✅
- Bottom row of a `ReportCard` grid layout when `metaVariant === 'A'` (date doesn't live in `CardMetaRow` variant A) · `ReportCard.tsx:177`
- Any custom card where the **only** footer info is a published date
- Listings of news/articles/PDF reports where date is the universal metadata

## 4. WHEN NOT to use ❌
- Footer needs date + author → build inline; this molecule is **date-only**
- Footer needs CTA button → use card's own footer slot
- Date should appear inline within meta row → use `CardMetaRow variant="B"` (which already integrates date)
- Card has no top-level flex column → `mt-auto` has no effect; pin manually

## 5. WHERE used (file:line)
- `components/molecules/ReportCard.tsx:177` — only when `metaVariant === 'A'`
- (Searches show it's a single-consumer molecule — extracted for that one usage)

## 6. HOW to implement

```tsx
import { CardFooterRow } from '@/app/components/molecules/CardFooterRow';

// inside a flex-col Card body
<Card className="flex flex-col">
  <h4>{title}</h4>
  <CardMetaRow projection={projection} region={region} variant="A" />
  <CardFooterRow date="Jan 2025" />
</Card>

// override layout (rare)
<CardFooterRow date="2024" className="flex items-center gap-2 mt-4" />
```

## 7. Composition tree
- Wrapping `<div>` — `flex items-center gap-2 mt-auto pt-1`
- Inner `<span>` with calendar icon + text

**Atoms consumed:** none.
**Dependencies:** `lucide-react/Calendar`, `iconColors.utility` (shared icon-color contract).

## 8. Properties

| Prop | Type | Default | WHY |
|---|---|---|---|
| `date` | string | — (required) | The text to render — caller formats |
| `className?` | string | — | Override default wrapper class (entire class string, not concat) |

## 9. Data contract

```ts
interface CardFooterRowProps {
  date: string;        // pre-formatted; molecule does not parse
  className?: string;  // *replaces* default classes when set
}
```

**Where data comes from:** card consumer formats date (e.g., "Jan 2025") and passes string. No internal Date parsing.

## 10. States
- **Default:** rendered as static text + icon, no interactivity.
- No hover/focus/loading/error states — molecule has no events.

## 11. Variants
None — single visual.

## 12. Responsive behavior
- No breakpoint-specific behavior; sits inline within parent card layout.
- `flex-shrink-0` not applied — long date strings could wrap but unlikely (date strings are typically <12 chars).

## 13. Tokens used
- `var(--text-xs)` font size
- `iconColors.utility` icon color (from shared `iconColors` const)
- Tailwind: `text-black/35`, `gap-2`, `mt-auto`, `pt-1`, `h-3 w-3`

## 14. A11y rules
- Date is inline text — readable by screen readers as part of card.
- Calendar icon decorative (no aria-label) — text carries meaning.
- **No semantic `<time>` element** used — gap. Best practice: `<time dateTime="2025-01">Jan 2025</time>` for machine readability.

## 15. Motion rules
- No motion.

## 16. Anti-patterns ❌
- Don't pass `className` if you want the default — `className` **replaces** default classes (line 15: `className || "flex items-center..."`). Easy to break with a partial override.
- Don't use without parent `flex flex-col` — `mt-auto` becomes a no-op.
- Don't pass a Date object — string only; caller formats.
- Don't add other content as siblings — wrap them; this is single-purpose.
- Don't use for "Updated X ago" relative time — molecule isn't reactive to time; pass pre-computed string.

## 17. REUSABILITY SCORE
**3/5 ⭐⭐⭐** — Useful as a card-row primitive but extremely narrow scope (date only). One real consumer. Could justify generalizing to `CardMetaItem` (icon + text) — currently doesn't.

## 18. Linked components
- **Parent molecule:** `ReportCard` (the sole consumer in OG)
- **Sibling molecule:** `CardMetaRow` (richer meta primitive)
- **Atoms:** none directly; depends on `iconColors` utility

## 19. Reasons + Decisions log
- **Why a dedicated molecule for one line of text + an icon?** Standardization — preventing every card author from inventing their own date-row. Cheap to maintain.
- **Why icon at `h-3 w-3` (12px) and `text-xs`?** Pairs visually with `CardMetaRow` icons — same scale family. Hierarchy: footer is "smallest visual weight" on the card.
- **Why `text-black/35` not a token?** OG inline-rgba philosophy (also seen in ActiveFilterChipBar, EmptyState). DS hasn't surfaced "muted text" as a token yet.
- **Why `mt-auto`?** Pins to flex-col bottom. Without it, footer would sit immediately under whatever's above, causing grid alignment jitter when cards have unequal middle content.
- **Why `className` overrides default rather than concats?** Line 15 uses `className || "..."` — full replace. Probably an oversight; safer pattern would be `clsx(defaultClasses, className)`. Note for refactor.
- **Why no `<time>` element?** Likely missed at v1 — straightforward improvement.
- **Why decoupled from CardMetaRow?** Variant A of meta-row doesn't include date — date lives in its own footer slot to allow projection + region on one row, then date pinned below. Variant B inlines date in meta-row and doesn't use this molecule.
- **Why `iconColors.utility` not a CSS var?** Centralized JS const for icon coloring across atoms; alternative to CSS variables when callers need to pass the color directly to Lucide's `color` prop.
