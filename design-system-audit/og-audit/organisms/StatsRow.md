# StatsRow — Organism Audit (OG)

**Source:** `Design_system_vs_26 (og and final)/src/app/components/organisms/StatsRow.tsx` (76 LOC)
**Reuse tier:** ⭐⭐⭐⭐⭐ (5/5) — cross-pillar stat-block section
**Status:** Lean · clean prop API · port-ready

---

## 1. WHAT

Reusable stat-card row section for Product pages. SectionHeading + responsive grid of `StatCard` molecules driven by a `stats` data array. (StatsRow.tsx:1–8 JSDoc: *"Renders a SectionHeading + responsive grid of StatCard components"*)

---

## 2. WHY

- Catalogs need to demonstrate scale ("2,400+ reports across 28 industries") — quantitative trust signal
- StatCard molecule is the canonical metric-display atom · StatsRow positions a fleet of them in a single coherent section
- Data-driven (`stats: StatItem[]`) — consumer provides array · DS renders · zero per-pillar fork
- Cross-pillar: Report Store uses for "Key Market Indicators" · Surveys for "Coverage stats" · Industries for "Sector breakdown"
- Warm-surface default = "trust block" tone · differentiates from cinematic-dark Hero and white BrowseGrid

---

## 3. WHEN to use ✅

- Zone 3 of any Product page (after Hero+Featured · before Browse)
- Trust-block / credibility section ("by the numbers")
- KPI dashboards w/ 2-4 metrics
- Mid-page interruption between two browse-heavy sections (visual rest)
- Anywhere 2-4 stats need equal-weight display

---

## 4. WHEN NOT to use ❌

- Single hero stat → use `StatCard` molecule directly (no section overhead)
- 5+ stats → grid becomes cramped at lg · use a different layout
- Stats w/ charts → use `ChartCard` (n/a · gap)
- Stats requiring nested narrative — use `KeyMarketIndicators` organism (richer composition)
- Hero-position stat callouts → use bespoke layout inline w/ Hero

---

## 5. WHERE used (consumer file:line)

- `Design_system_vs_26.../src/app/components/organisms/ProductPageTemplate.tsx:75` — Zone 3 (Stats · optional)
- `Design_system_vs_26.../src/app/components/organisms/KeyMarketIndicators.tsx` — wraps StatsRow w/ KMI data
- Worked-example pages: report-store-legacy uses via KMI wrapper

---

## 6. HOW to implement

```tsx
import { StatsRow } from '@/app/components/organisms';

<StatsRow
  label="By the numbers"
  title="Coverage at a glance"
  subtitle="Our research footprint across markets, industries, formats."
  stats={[
    { category: 'Reports', value: '2,400+', label: 'reports', description: 'Across 28 industries', growth: '+18% YoY' },
    { category: 'Markets', value: '85', label: 'countries', description: 'In active coverage' },
    { category: 'Analysts', value: '120+', label: 'analysts', description: 'Average 12yrs experience', metric: 'avg tenure' },
    { category: 'Updates', value: 'Weekly', label: 'cadence', description: 'New research each week' },
  ]}
  columns={4}
  background="warm"
/>

// 3-column variant
<StatsRow
  label="Impact"
  title="Last 12 months"
  stats={3StatsArray}
  columns={3}
  background="white"
/>

// w/ children below grid (e.g. methodology link)
<StatsRow {...props}>
  <div className="text-center text-xs text-black/50">
    Methodology · <a className="underline">how we count</a>
  </div>
</StatsRow>
```

---

## 7. Composition tree

```
StatsRow
└─ SectionWrapper (background={background} · spacing="lg" · maxWidth="wide")  (L60)
   └─ inner wrapper (max-w-1000px · mx-auto · px-4/6/8)  (L61)
      ├─ SectionHeading (label · title · subtitle · default align)  (L62–66)
      ├─ Grid (responsive · mt-8 · gap-4)  (L67–71)
      │  └─ <StatCard {...stat}> per stat in stats array
      └─ {children} (L72)
```

**Atoms:** `SectionWrapper` · `SectionHeading`
**Molecules:** `StatCard` (from `@/app/components/molecules`)
**No state · no hooks**

---

## 8. Properties · WHY each exists

| Prop | Type | Default | Why |
|---|---|---|---|
| label | string (required) | — | Kicker — section identity |
| title | string (required) | — | H2 |
| subtitle | string? | — | Context line |
| stats | StatItem[] (required) | — | Array of metric data — driven by consumer |
| background | 'white' \| 'warm' \| 'black' | 'warm' | Surface variant · warm default for "trust block" tone |
| columns | 2 \| 3 \| 4 | 4 | Grid columns at lg+ breakpoint |
| children | ReactNode? | — | Slot for methodology link / disclaimer / extra |
| className | string? | — | Wrapper override |

**StatItem shape (L14–21):**
| Field | Type | Required | Purpose |
|---|---|---|---|
| category | string | ✓ | Stat category label (e.g. "Reports") |
| value | string | ✓ | The headline number ("2,400+") |
| label | string | ✓ | Unit label ("reports") · also acts as React key |
| description | string | ✓ | Supporting context line |
| growth | string? | — | Growth metric ("+18% YoY") |
| metric | string? | — | Alternate metric ("avg tenure") |

---

## 9. Data contract

```ts
export interface StatItem {
  category: string;
  value: string;
  label: string;        // also used as React key — must be unique within stats[]
  description: string;
  growth?: string;
  metric?: string;
}

export interface StatsRowProps {
  label: string;
  title: string;
  subtitle?: string;
  stats: StatItem[];
  background?: 'white' | 'warm' | 'black';
  columns?: 2 | 3 | 4;
  children?: ReactNode;
  className?: string;
}
```

Consumer responsibility: provide `stats` array · ensure `label` values unique (used as key) · DS owns layout/typography/StatCard rendering.

---

## 10. States

- **Default:** rendered grid w/ all StatCards visible
- **stats=[]:** ❌ no empty-state · renders empty grid div
- **Loading:** ❌ no loading prop · consumer wraps externally w/ skeleton
- **Hover on card:** per StatCard molecule (deferred)
- **No children:** children block not rendered

---

## 11. Variants

By `background`: white / warm (default) / black
By `columns`: 2 / 3 / 4 (controls lg+ grid)

Responsive column reduction:
- columns=2: `grid-cols-1 sm:grid-cols-2` (always max 2)
- columns=3: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` (stair-step)
- columns=4 (default): `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` (stair-step, **skips 3-col stage**)

---

## 12. Responsive behavior

- Padding scales `px-4 sm:px-6 md:px-8` (L61)
- Max-width 1000px inner
- Grid: 1 column mobile → 2 at sm → final value at lg
- **Anomaly:** columns=4 jumps directly from 2 → 4 at lg, skips 3-column intermediate stage. With 4 wide cards (e.g. long descriptions), this can cramp at lg breakpoint just-past-2-column.

---

## 13. Tokens used

✅ Via SectionWrapper / SectionHeading / StatCard (delegated)
⚠️ `mt-8` and `gap-4` raw Tailwind — should be tokens
⚠️ `mt-8` on children block (L72) — same value used twice for different gap purposes

---

## 14. A11y rules

✅ SectionHeading produces semantic H2
✅ Grid is a CSS-only construct (no display:flex semantic loss)
✅ StatCards are individual atoms · per-card a11y deferred to molecule audit

❌ No `<dl>` semantic (each StatCard is a definition pair) — fails feedback_a11y_patterns.md `definition-list` rule. Each StatCard's `label` and `value` is semantically a `<dt>`/`<dd>` pair.
❌ No `aria-labelledby` linking SectionHeading to grid for SR navigation

---

## 15. Motion rules

- No section-level entrance animation
- Per-card animations: deferred to StatCard molecule
- **Reduced-motion:** inherited from molecule layer

---

## 16. Anti-patterns ❌

- ❌ React key uses `stat.label` (L69) — fragile if two stats share the same label string ("reports" vs "reports") · should be id-based
- ❌ No empty-state when stats=[]
- ❌ No loading state
- ❌ columns=4 skips 3-column responsive stage (1→2→4)
- ❌ `growth` and `metric` props on StatItem are both optional supporting strings — naming ambiguous (when to use which?)
- ❌ `gap-4` and `mt-8` not tokenized

---

## 17. REUSABILITY SCORE

**5/5 ⭐⭐⭐⭐⭐** — true cross-pillar data-driven stat section. Used as ProductPageTemplate Zone 3, wrapped by KMI. Drops to 4/5 in practice for missing empty/loading states + label-as-key fragility.

---

## 18. Linked components

- **Parent template:** `ProductPageTemplate` (Zone 3)
- **Wrappers:** `KeyMarketIndicators` (RS-specific stats) · `IndustryMetrics` (n/a · gap)
- **Sibling alternative:** `BrowseGrid` (after stats · catalog focus) · `FeaturedCarousel` (before stats · curation focus)
- **Atoms:** `SectionWrapper` · `SectionHeading`
- **Molecule:** `StatCard`

---

## 19. Composition rule (in a page recipe)

**ProductPageTemplate order:**

```
Zone 1: ProductHero       (black)
Zone 2: FeaturedCarousel  (white)
Zone 3: StatsRow          (warm · OPTIONAL · default)  ← trust block · bg-flip from white
Zone 4: afterStats slot
Zone 5: BrowseGrid        (white)
```

**Before:** FeaturedCarousel (white) — warm = strong bg-alternation
**After:** afterStats slot · then BrowseGrid (back to white)
**Bg-alternation:** warm is the default precisely because white→warm→white = correct rhythm.

---

## 20. Reasons + Decisions log

- **Why warm default?** Per bg-alternation rule · trust-block tone · differentiates from surrounding white sections · matches Reading mode aesthetic.
- **Why 4-column default?** Most-common stat-row pattern (Reports/Markets/Analysts/Updates) is 4 metrics · matches industry conventions (Bloomberg, FT, McKinsey "by the numbers" blocks).
- **Why columns prop only 2/3/4?** 1-column = use a single StatCard. 5+ = use a dedicated KMI organism w/ richer composition. Decision-narrowing.
- **Why StatItem.label as key?** Initial implementation · works for typical data · breaks if duplicate labels exist. Should be `id` field instead.
- **Why optional growth + metric?** StatCards have flexible bottom-row content — growth ("+18% YoY") vs metric ("avg tenure") covers two common UX patterns. Both optional · neither required.
- **Why `mt-8` between header and grid · `mt-8` between grid and children?** Equal-rhythm spacing · same visual weight. Could be tokenized.
- **Why no `align` prop on SectionHeading?** Default left-aligned matches editorial flow. Center-aligned StatsRow would feel "report cover" rather than "trust block".
- **Why slot for children?** Methodology disclaimer / data-source link belongs visually-tied to the stats — slot lets consumer place it directly under grid in-section.
- **Why skip 3-col responsive stage on columns=4?** Likely oversight · 1→2→4 produces sub-optimal layout in 768–1024px range. Should be 1→2→3→4 or 1→2→4 w/ explicit awareness. **Gap.**

---

**Audit conclusion:** Lean and proper. Port to core-v2 w/ 3 fixes: (1) `id` field on StatItem instead of label-as-key · (2) empty-state + loading prop · (3) fix columns=4 responsive ladder (add lg:grid-cols-3 intermediate). Estimated effort: 2 hours.
