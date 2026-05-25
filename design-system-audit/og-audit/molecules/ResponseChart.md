# ResponseChart — Molecule Audit (OG DS · Surveys pillar)

> **Source:** `Design_system_vs_26 (og and final)/src/app/components/molecules/ResponseChart.tsx:36-123`
> **OG comment (line 1-10):** *"ResponseChart — Molecule (Surveys pillar). Lightweight bar chart for survey response distribution. Pure CSS — no chart library dependency. Uses DS tokens. Two modes: horizontal (default): horizontal bars with labels left, values right. donut: simple donut/ring chart (for overall completion)."*

---

## 1. WHAT
A zero-dependency chart molecule for visualizing survey response distributions. Two modes:
- **Horizontal** (default) — bar chart with per-bar label, percentage-width fill, total footer.
- **Donut** — single ring chart showing completion percentage with optional legend below.

No d3, no recharts, no chart.js — pure CSS + inline SVG.

## 2. WHY
- **No external chart lib** — keeps bundle slim; charts here are for "at-a-glance" survey state, not deep analytics.
- **Wraps `Card`** — visually matches other dashboard tiles.
- **DS color rotation built-in** (`DEFAULT_COLORS`, line 27-34) — six brand-consistent series colors; consumer doesn't need to pick.
- **Transitions for in/out** (line 67, 108) — CSS-only width transitions create "data updates" feel.
- **Donut mode for completion percent** — single most-important survey number, presented as a ring.

## 3. WHEN to use ✅
- Survey results page showing response distributions
- Dashboard tile showing completion percent (donut)
- Internal analytics quick-glance · `ComponentsContent.tsx:1174-1207`

## 4. WHEN NOT to use ❌
- Deep analytics (multi-axis, drill-down) → use a proper chart library
- Time-series → no x-axis time support
- Pie chart with multiple slices → donut mode is single-percent + legend; for true pie use a different molecule
- More than 6-8 bars → readability degrades; colors recycle
- Real-time streaming charts → no streaming/animation support

## 5. WHERE used (file:line)
- `components/ComponentsContent.tsx:1174-1207` — DS showcase (multiple variations)

## 6. HOW to implement

```tsx
import { ResponseChart } from '@/app/components/molecules/ResponseChart';

// Horizontal bars
<ResponseChart
  title="Role distribution"
  data={[
    { label: 'Designer',  value: 142 },
    { label: 'Engineer',  value:  98 },
    { label: 'PM',        value:  64 },
    { label: 'Founder',   value:  38 },
  ]}
/>

// Donut — completion percent
<ResponseChart
  title="Overall completion"
  mode="donut"
  total={500}
  data={[{ label: 'Completed', value: 142 }]}
/>

// Donut with legend (multi-series)
<ResponseChart
  mode="donut"
  total={500}
  data={[
    { label: 'Completed', value: 142, color: '#806ce0' },
    { label: 'In progress', value: 89 },
    { label: 'Not started', value: 269 },
  ]}
/>

// Custom colors
<ResponseChart
  data={[
    { label: 'Q1', value: 30, color: 'var(--green-700)' },
    { label: 'Q2', value: 50, color: 'var(--coral-500)' },
  ]}
/>
```

## 7. Composition tree

**Horizontal:**
- `Card` (padding="md")
  - Optional title `<p>`
  - `data.map`:
    - Row: label + value
    - Bar track + filled bar (`width: pct%`)
  - Footer (if `computedTotal > 0`): "Total" / number

**Donut:**
- `Card` (padding="md", flex-col items-center)
  - Title
  - 24×24 SVG with two `<circle>` rings (bg + arc)
  - Centered `%` text (serif light)
  - Optional legend (if data.length > 1)

**Atoms consumed:** `Card`.

## 8. Properties

| Prop | Type | Default | WHY |
|---|---|---|---|
| `title?` | string | — | Chart heading |
| `data` | `ResponseBarData[]` | — (required) | Series data |
| `mode?` | `'horizontal'\|'donut'` | `'horizontal'` | Chart mode |
| `total?` | number | sum of values | Override total (donut completion baseline) |
| `className?` | string | — | Pass-through |

`ResponseBarData = { label: string; value: number; color?: string }`

## 9. Data contract

```ts
interface ResponseBarData {
  label: string;
  value: number;
  color?: string;
}

interface ResponseChartProps {
  title?: string;
  data: ResponseBarData[];
  mode?: 'horizontal' | 'donut';
  total?: number;
  className?: string;
}
```

**Where data comes from:** survey response aggregation (consumer's responsibility).

## 10. States
- **Empty data:** `maxValue=1` fallback (line 37) prevents div-by-zero; bars all 0 width.
- **Single bar:** valid; one row.
- **All bars equal:** all 100% width.
- **Donut completion ≥100%:** capped (line 42).
- **No title:** title block omitted.
- **No legend** (single-series donut): legend skipped.

## 11. Variants
- `horizontal` (default) — for distributions
- `donut` — for single-percent completion

## 12. Responsive behavior
- Card fills container width.
- Bars and donut scale with parent width (donut is fixed 96×96 via `w-24 h-24`).
- Labels truncate via `truncate mr-2` (horizontal).

## 13. Tokens used
- `var(--text-xs)` labels + values
- `var(--text-base)` donut center number
- `var(--font-serif)`, `var(--font-weight-light)` donut percent
- `var(--green-700, #15803d)`, `var(--coral-500, #b01f24)` (in DEFAULT_COLORS)
- `var(--black-200)` total divider
- Inline rgba `0.04` (bar bg), `0.06` (donut bg ring)

## 14. A11y rules
- Title `<p>` — readable
- Bars are visual — no `aria-label` per bar
- **Gap:** chart should have `role="img"` + `aria-label` summarizing data ("Bar chart: Designer 142, Engineer 98, ...")
- **Gap:** donut shows visual percent only; no SR equivalent
- **Gap:** color is sole encoding for legend items (label adjacent helps)

## 15. Motion rules
- Horizontal bar fill: `transition-all duration-500`
- Donut stroke: `transition-all duration-700`
- No reduced-motion handling — could pulse jarringly

## 16. Anti-patterns ❌
- Don't pass empty `data` to donut mode — completedPct = 0; renders empty ring (cosmetic only).
- Don't pass negative values — bars go negative-width-zero (defensive max).
- Don't pass >6-8 bars — labels collapse, color recycle.
- Don't use for trend/line charts.
- Don't override Card padding via wrapping — Card is internal.
- Don't pass mode="donut" with multi-series expecting pie — only first slice fills; rest are legend.
- Don't use color alone to encode meaning (legend label needed for SR).

## 17. REUSABILITY SCORE
**3/5 ⭐⭐⭐** — Useful within Surveys / lightweight dashboards. Not a full charting solution; for analytics-heavy surfaces use a real lib. Three stars accurate for its scope.

## 18. Linked components
- **Parent organisms:** survey detail / dashboard tiles
- **Sibling molecules:** `CompletionBadge`, `QuestionPreview`, `SurveyCard`, `SurveySkeleton`
- **Child atom:** `Card`

## 19. Reasons + Decisions log
- **Why pure CSS, no chart lib?** Bundle weight. Charts here are decorative/summary; not analytical. recharts adds ~50kb gzipped; this molecule adds <1kb.
- **Why SVG circle for donut, not CSS conic-gradient?** SVG is more reliable across browsers for stroke-dasharray animation. Conic-gradient has uneven support for stroke effects.
- **Why `-rotate-90` on donut SVG?** Default circle starts at 3 o'clock (right); -rotate-90 starts at 12 (top), matching pie-chart convention.
- **Why six default colors?** Brand palette covers six "tints" without color collision. More slices = recycle (acceptable for casual charts).
- **Why first color periwinkle `#806ce0`?** Surveys-pillar accent; first slice = primary signal.
- **Why donut center text in serif light?** Same treatment as `StatCard`/`DataHighlightCard` hero numbers — visual identity for "key number".
- **Why bar height 2px (`h-2`)?** Tested 1.5-3; 2 is the sweet spot for scannability without dominating.
- **Why donut stroke-width 3?** Thin enough to read center text large; thick enough to register the ring.
- **Why `rounded-full` on bar fills?** Soft endcap rather than hard rectangle — modern data-viz aesthetic.
- **Why total only if `computedTotal > 0`?** Avoid "Total: 0" footer (visually noisy when data is empty).
- **Why no `tabular-nums` everywhere on numbers?** Inline `tabular-nums` (line 81, 104) applied where numbers shift; rest are static labels.
- **Why `transition-all duration-500/700`?** Differentiates horizontal (faster, more bars) from donut (slower, single big motion).
- **Why no axis labels (Y-axis)?** Out of scope; this is a quick-glance chart.
- **Why no `legend` prop?** Legend auto-rendered when donut has multi-series. Configurable would add scope creep.
