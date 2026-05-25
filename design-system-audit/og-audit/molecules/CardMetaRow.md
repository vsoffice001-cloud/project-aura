# CardMetaRow — Molecule Audit (OG DS)

> **Source:** `Design_system_vs_26 (og and final)/src/app/components/molecules/CardMetaRow.tsx:22-64`
> **OG comment (line 1-7):** *"DS-compliant inline meta row with two layout variants: A (default): projection (TrendingUp green) · region (MapPin gray). B (compact): region (MapPin) · date (Calendar)"*

---

## 1. WHAT
A horizontal inline row that renders 2-3 meta facets of a card (projection / region / date) separated by middle-dot dividers, with icon prefixes per facet. Two layout variants (A and B) pick a different facet combination. Returns null if no facets are passed.

## 2. WHY
- **Standardize card meta lines** — every Ken card needs region/projection/date metadata; rolling each ad-hoc creates icon-color drift, dot-divider drift, font-size drift.
- **Variant prop instead of two molecules** — one component, one mental model. Caller picks layout by name (A/B) rather than choosing between separate components (a 4WH lesson — single molecule reduces import surface).
- **Self-hiding** (line 23: `if (!projection && !region && !date) return null`) — caller doesn't need to gate.
- **Projection tooltip:** wraps projection in `Tooltip text="Projected growth rate"` — explains a possibly-cryptic CAGR figure inline (line 47-54).

## 3. WHEN to use ✅
- Inside any card body needing 2-3 inline meta facets · `ReportCard.tsx:99-105, 171-176` · `AnalystPickCardB.tsx:63`
- Variant A: when card emphasizes **opportunity** (projection front-and-center)
- Variant B: when card emphasizes **recency / timeline** (date in line)

## 4. WHEN NOT to use ❌
- More than 3 facets needed → use a bespoke row; this molecule supports max 3
- Standalone date footer → use `CardFooterRow` (different pinning behavior)
- Facets need to wrap vertically on mobile → wrap callers explicitly; this molecule is horizontal-only
- Need clickable facets → these are display-only spans; for interactivity use a chip/link atom

## 5. WHERE used (file:line)
- `components/molecules/ReportCard.tsx:99-105` (list layout) and `:171-176` (grid)
- `components/molecules/AnalystPickCardB.tsx:63` (inside embedded mini-card)

## 6. HOW to implement

```tsx
import { CardMetaRow } from '@/app/components/molecules/CardMetaRow';

// Variant A — projection + region (growth-led)
<CardMetaRow
  projection="14.2%"
  region="APAC"
  variant="A"
/>

// Variant B — region + date (recency-led)
<CardMetaRow
  region="India"
  date="Jan 2025"
  variant="B"
/>

// Empty (no facets) — renders nothing
<CardMetaRow region={undefined} projection={null} />
```

## 7. Composition tree
- Wrapping `<div>` — `flex items-center gap-1.5 flex-wrap`
- Variant A: `Tooltip` wrapping projection span · "·" divider span · region span
- Variant B: region span · "·" divider · date span

**Atoms consumed:** `Tooltip` (variant A only).
**Icons:** `TrendingUp` (projection, green), `MapPin` (region, utility), `Calendar` (date, utility).
**Const:** `iconColors` shared map.

## 8. Properties

| Prop | Type | Default | WHY |
|---|---|---|---|
| `projection?` | `string \| null` | — | Growth/projection string ("14.2%") — variant A only |
| `region` | string | — (required) | Region label, both variants |
| `date?` | string | — | Variant B only |
| `variant?` | `'A' \| 'B'` | `'A'` | Picks facet combination + visual hierarchy |
| `className?` | string | — | Replaces default wrapper class |

## 9. Data contract

```ts
export type CardMetaVariant = "A" | "B";

interface CardMetaRowProps {
  projection?: string | null;
  region: string;
  date?: string;
  variant?: CardMetaVariant;
  className?: string;
}
```

**Where data comes from:** report/asset detail object — formatted strings, not raw numbers.

## 10. States
- **Empty** (no facets): returns null.
- **Default:** static spans, no interactivity (except tooltip on projection variant A).
- **Projection tooltip hover:** Tooltip atom shows "Projected growth rate".

## 11. Variants
- **A** (default): projection · region. Green TrendingUp icon + tooltip on projection.
- **B** (compact): region · date. Both gray. No tooltip.

> Variant choice is by data emphasis: A = growth-led card; B = timeline-led card.

## 12. Responsive behavior
- `flex-wrap` allows wrapping at narrow widths.
- `flex-shrink-0` on icons keeps them from squishing.
- No breakpoint variants.

## 13. Tokens used
- `var(--text-xs)` row font size
- `var(--green-600)` projection text + icon
- `iconColors.utility` for MapPin/Calendar
- Tailwind: `text-black/15` (divider), `text-black/35`, `text-black/40`

## 14. A11y rules
- Plain text spans → screen-reader-friendly.
- Tooltip atom should provide accessible explanation (Tooltip atom's a11y is its concern).
- Icons decorative (no aria).
- **Gap:** middle dots (`&middot;`) are content; screen readers will read "middle dot". Better: `aria-hidden="true"` on dividers.

## 15. Motion rules
- No motion. Tooltip handles its own enter/exit.

## 16. Anti-patterns ❌
- Don't pass both `date` and `variant="A"` — date is ignored (line 26 only reads date in variant B).
- Don't pass `projection` in `variant="B"` — ignored similarly.
- Don't override `className` partially — full replacement (line 27, 46). Use clsx upstream if you need to merge.
- Don't render with **only** a divider showing because all data is missing — molecule handles that (returns null).
- Don't nest CardMetaRow inside itself or CardFooterRow — semantic confusion.
- Don't pass numeric `projection` — must be a pre-formatted string ("14.2%").

## 17. REUSABILITY SCORE
**5/5 ⭐⭐⭐⭐⭐** — Used by every primary card (`ReportCard` both layouts, `AnalystPickCardB`). Mandatory atom of card composition. Foundation molecule.

## 18. Linked components
- **Parent molecules:** `ReportCard`, `AnalystPickCardB`
- **Sibling molecule:** `CardFooterRow` (date-only, different placement contract)
- **Child atom:** `Tooltip`
- **Icons:** lucide TrendingUp · MapPin · Calendar
- **Shared util:** `iconColors`

## 19. Reasons + Decisions log
- **Why two variants in one molecule, not two molecules?** Lower import surface — one name to remember. Variant prop encodes intent ("A = growth-led, B = date-led"). Naming A/B is opaque to outsiders; could rename `growth`/`compact` but stable now.
- **Why projection green, not coral red?** Green = positive signal (growth). Coral = brand. Don't conflate. Tested in OG against rating-style red — red felt warning-like.
- **Why Tooltip only on projection?** Region/date are self-explanatory; CAGR / growth-pct without context could read as "what is this %?". Tooltip is education affordance.
- **Why `&middot;` (·) divider, not pipe (|) or comma?** Middle dot is editorial — feels like print typography, matches Ken's editorial light surface tone.
- **Why `text-black/15` for divider (lighter than text)?** Hierarchy — divider is structural, not content; should disappear to peripheral vision.
- **Why `flex-wrap` not `truncate`?** Truncation would hide data; wrap preserves it. Card grid tolerates a 2-line meta row better than missing data.
- **Why `flex-shrink-0` on icons?** Icons should never deform — text can shrink/wrap, icons stay crisp.
- **Why `gap-1.5` not `gap-2`?** Tested compact density — 6px sits right with `text-xs`. 8px feels gappy at small font size.
- **Why no `as` prop / no `<dl>` semantics?** Could be `<dl><dt><dd>` but adds DOM. Visual-first decision; missed a11y opportunity.
