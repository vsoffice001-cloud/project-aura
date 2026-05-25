# ComparisonTable — Organism Audit (OG)

**Source:** `Design_system_vs_26 (og and final)/src/app/components/organisms/ComparisonTable.tsx` (144 LOC)
**Reuse tier:** ⭐⭐⭐☆☆ (3/5) — purpose-built for RS report-format comparison · hard-coded data
**Status:** Single-purpose · should be generalized w/ data-driven props

---

## 1. WHAT

Report format comparison table: Full Report vs Market Brief vs Data Pack. Each row shows a feature with check/dash icons indicating inclusion per format. Per OG JSDoc (L1–10): *"WHAT: Report format comparison table (Full Report vs Market Brief vs Data Pack). WHY: Helps users understand what each report format includes before purchasing."*

---

## 2. WHY

- Report Store sells 3 report tiers — buyers need explicit "what's in each tier" before purchase decision
- Comparison table is the conversion-critical "format picker" — without it, users can't differentiate tiers
- Recommended badge ("Popular") on Full Report = subtle nudge to higher-margin tier (sales psychology)
- Price + tier name + feature matrix = complete info-arch for the purchase moment
- Warm surface = "informational reading" tone · differentiates from cinematic-dark CTAs

---

## 3. WHEN to use ✅

- Report Store home page (mid-page · trust block area)
- Report detail page (PDP) when format selector needed
- Pricing pages comparing tiers
- Anywhere 3-column feature-matrix is the right pattern

---

## 4. WHEN NOT to use ❌

- Single-tier products (no comparison needed)
- 2-tier products → use simpler side-by-side
- 5+ tiers → table becomes cramped at lg · use card-grid
- Comparing dissimilar offerings (apples-oranges) → use bespoke layout
- Mobile-primary contexts → horizontal-scroll table is awkward on small screens

---

## 5. WHERE used (consumer file:line)

- `Design_system_vs_26.../src/app/components/organisms/index.ts:53` — barrel export
- (Direct consumer in OG: not yet adopted by RSPage HOME mode · likely planned section)
- Pattern reference: any future pricing-comparison page

---

## 6. HOW to implement

OG is **zero-prop** w/ hard-coded data (FEATURES + FORMATS at L23–38):

```tsx
import { ComparisonTable } from '@/app/components/organisms';

// Zero-config
<ComparisonTable />
```

That renders:
- 8 hard-coded features (Executive Summary, Market Sizing, ..., Analyst Consultation)
- 3 hard-coded formats (Full Report $4,500 · Market Brief $1,200 · Data Pack $2,800)

---

## 7. Composition tree

```
ComparisonTable
└─ SectionWrapper (background="warm" · spacing="lg" · maxWidth="wide")  (L42)
   └─ inner wrapper (max-w-1000px · mx-auto · px-4/6/8)  (L43)
      ├─ SectionHeading (label="Formats" · title="Compare Report Types" · subtitle)  (L44–48)
      └─ Overflow-x-auto wrapper (L51–53 · borderRadius=--radius-element)
         └─ <table> (min-w-600px)
            ├─ <thead>
            │   └─ <tr>: "Feature" + 3 format cells
            │       └─ format cell: <div flex-col>: name · Badge(Popular?) · "from $X"
            └─ <tbody>
                └─ FEATURES.map → <tr>: feature label · 3 cells
                    └─ each cell: <Check> (included) or <Minus> (not included)
```

**Atoms:** `SectionWrapper` · `SectionHeading` · `Badge` · `Check`/`Minus` icons
**No molecules · pure data render**

---

## 8. Properties · WHY each exists

**OG: zero props.** Hard-coded data internally.

Hard-coded data structures:
- `FEATURES: Feature[]` (L23–32) — 8 entries
- `FORMATS` (L34–38) — 3 entries · each w/ `key`, `name`, `price`, `recommended`

Should-be props:
- `features: Feature[]` — feature matrix
- `formats: Format[]` — column definitions w/ price/recommended badge
- `label`, `title`, `subtitle` — header content
- `background?: 'warm' | 'white' | 'black'` — surface

---

## 9. Data contract

**Current (hard-coded):**

```ts
interface Feature {
  label: string;
  fullReport: boolean;
  marketBrief: boolean;
  dataPack: boolean;
}

const FORMATS = [
  { key: 'fullReport', name: 'Full Report', price: '$4,500', recommended: true },
  { key: 'marketBrief', name: 'Market Brief', price: '$1,200', recommended: false },
  { key: 'dataPack', name: 'Data Pack', price: '$2,800', recommended: false },
];
```

**Recommended generic-typed:**

```ts
interface ComparisonFormat {
  key: string;
  name: string;
  price?: string;
  recommended?: boolean;
  badgeLabel?: string;
}

interface ComparisonFeature {
  label: string;
  values: Record<string, boolean>;  // keyed by format.key
}

interface ComparisonTableProps {
  features: ComparisonFeature[];
  formats: ComparisonFormat[];
  label?: string;
  title?: string;
  subtitle?: string;
  background?: 'warm' | 'white' | 'black';
}
```

---

## 10. States

- **Default:** rendered table · 8 rows × 3 columns
- **Recommended column:** subtle `rgba(0,0,0,0.03)` bg highlight on header · `rgba(0,0,0,0.02)` on body cells
- **No selected state · no interactivity** — purely informational
- **No loading / empty / error** — data is static

---

## 11. Variants

**OG: single variant.** Could support:
- `compact` (smaller padding · fewer cols)
- `priced-cta` (price + Buy button per column)
- `quarterly` vs `annual` pricing toggle

---

## 12. Responsive behavior

- `overflow-x-auto` (L51) — horizontal scroll on narrow viewports
- `min-w-[600px]` on table (L54) — prevents collapse below 600px
- Cell padding `px-4 py-3` — consistent at all breakpoints
- **Mobile UX concern:** users must scroll horizontally to see all columns · sub-optimal · could use accordion pattern at <sm

---

## 13. Tokens used

✅ `var(--text-xs)` (L62) — header column "Feature" label
✅ `var(--text-sm)` (L75, 106) — format name + feature label
✅ `var(--text-xs)` (L90) — "from $X" price text
✅ `var(--radius-element)` (L52) — outer overflow wrapper

⚠️ Inline rgba (should be tokens):
- `rgba(0,0,0,0.4)` (L62) — header text
- `rgba(0,0,0,0.8)` — format name
- `rgba(0,0,0,0.6)` (L107) — feature label
- `rgba(0,0,0,0.08)` · `0.04` — borders
- `rgba(0,0,0,0.03)` · `0.02` — recommended-column bg
- `rgba(34,139,34,0.7)` (L129) — green checkmark color (raw hex `#228b22` · not in token system)
- `rgba(0,0,0,0.15)` — minus icon color

---

## 14. A11y rules

✅ Real `<table>` element w/ `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>` (semantic table)
✅ Column headers in `<th>` (L58, 71)
✅ "Popular" Badge labels the recommended column

❌ No `<caption>` on table (WCAG 1.3.1 recommends)
❌ No `scope="col"` on `<th>` (improves SR navigation)
❌ Check / Minus icons have no text alternative — SR users hear nothing for included/excluded features. Should add `aria-label="Included"` / `aria-label="Not included"` or visually-hidden text.
❌ Color-only conveyance — green check + gray minus rely on color difference (low contrast risk). Adding icons + labels mitigates but not done.
❌ `<table>` has no `aria-label` or `aria-describedby` linking to SectionHeading

---

## 15. Motion rules

None. Table is static.

---

## 16. Anti-patterns ❌

- ❌ Zero props — all data hard-coded · cannot be reused for any other comparison
- ❌ Format keys `'fullReport' | 'marketBrief' | 'dataPack'` baked into `Feature` interface (L17–20) · changing tier-count requires interface edit
- ❌ Hard-coded green color `rgba(34,139,34,0.7)` — only green used in entire DS · should be `--color-feedback-included` token
- ❌ Mobile UX: horizontal scroll table is sub-optimal · should be accordion at <sm
- ❌ Recommended-column highlight is bg-color-only — could be border + badge cluster
- ❌ Check / Minus a11y not addressed
- ❌ Price string `'$4,500'` hard-coded — no currency/locale support · no live pricing API

---

## 17. REUSABILITY SCORE

**3/5 ⭐⭐⭐☆☆** — pattern reusable for any feature-comparison table BUT zero-prop form makes it single-use as written. Promote to 5/5 with data-driven props.

---

## 18. Linked components

- **Atoms:** `SectionWrapper` · `SectionHeading` · `Badge` · `Check` / `Minus` (lucide)
- **Should-add:** `ComparisonTableRow` (extract row pattern) · `TableCaption` (n/a · missing)
- **Sibling organisms:** `ResearchMethodology` (also "informational" section) · `KeyMarketIndicators` (data-display)
- **No hooks · no state · pure presentational**

---

## 19. Composition rule (in a page recipe)

**Where this fits (recommended position):**

```
Section X: ComparisonTable      ← warm · informational mid-page block
```

**Before:** typically a `FeaturedCarousel` or `BrowseGrid` (white)
**After:** typically `ResearchMethodology` or `CTABanner`
**Bg-alternation:** warm fits after white · before warm/black.

**Best placement:** mid-page on Report Store HOME (after browse · before final CTA) · or PDP-tier-selector section.

---

## 20. Reasons + Decisions log

- **Why hard-coded data?** Original Figma-design pass-through · was never refactored to props. The 3 RS report tiers are stable business config but should still be data-driven for i18n + pricing-update flexibility.
- **Why 3 tiers (Full Report · Market Brief · Data Pack)?** Per RS product strategy (project_kenresearch_brief.md) · 3-tier offering matches industry standards (Bloomberg/Gartner/IDC all use 3-tier).
- **Why Full Report = "Popular"?** Sales psychology — anchoring middle/high tier as recommended steers buyers away from cheapest. Standard pricing-page nudge.
- **Why green Check + gray Minus?** Conventional UX semantics for included/excluded · low cognitive load. Color choice is the weak point (could fail color-blindness).
- **Why warm surface?** Editorial-reading tone · "consider this carefully" vibe vs cinematic-dark CTA tension.
- **Why min-w-600px table?** Below 600px, 4-column table (Feature + 3 formats) becomes unreadable · horizontal scroll is the lesser-evil.
- **Why no Buy/Select button per column?** Comparison-only · buying happens elsewhere (PDP) · simplification. Could be enhanced w/ inline CTAs.
- **Why no quarterly/annual pricing toggle?** Demo phase · simple static pricing. Future enhancement.
- **Why `from $X` not exact price?** "Starting from" implies volume/contract pricing · matches B2B SaaS convention. Avoids commitment to a specific number.
- **Why 8 features?** Demo content · covers the typical decision factors. Production version may have 15–20.

---

**Audit conclusion:** Solid table pattern · zero-prop blocking reuse. Port to core-v2 w/ full prop-lifting + a11y fixes (aria-labels on Check/Minus, caption, scope) + mobile-accordion variant + green color tokenization. Estimated effort: 6 hours.
