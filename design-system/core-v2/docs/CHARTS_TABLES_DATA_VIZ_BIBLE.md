# Charts · Tables · Data Viz Bible

**Status:** Canonical · 2026-05-27
**Scope:** All chart and table primitives in `@kenresearch/design-system/charts`
**Audience:** AI agents (Claude · Sonnet · Opus) building or modifying viz · plus human contributors
**Read before:** Building any new chart · modifying existing viz · designing a page using charts/tables · spawning aura-builder for chart work

This is the single source of truth for HOW Ken Research charts · tables · and data visualizations work across light/dark surfaces · desktop/touch/keyboard · compare mode · mobile · forced-colors · print · reduced-motion.

If you are about to write `KEN_INK.muted` inside a chart primitive · stop. Read § Color Adaptation.
If you are about to write `opacity: 0.4` for hover · stop. Read § Hover Doctrine.
If you are about to add `responsive.rules` that drops dataLabels at maxWidth 640 · stop. Read § Mobile Decision Matrix.

---

## §1 · Foundational rules (apply everywhere · no exceptions)

### 1.1 Color adaptation via CSS variables only
Every text color · border color · background color inside a chart or table primitive MUST resolve via CSS custom property · NEVER a hardcoded TS constant.

**Why:** TS constants (`KEN_INK.muted`) are baked at component-render time · cannot cascade through `[data-surface="dark"]` scope · break on dark surface · break in compare mode · break in forced-colors.

**Allowed:**
```tsx
style={{ color: 'var(--semantic-ink-strong)' }}
className="text-[var(--semantic-ink-muted)]"
```

**Forbidden:**
```tsx
style={{ color: KEN_INK.strong }}              // dies on dark
style={{ borderColor: 'rgba(0,0,0,0.08)' }}    // dies on dark
style={{ background: '#ffffff' }}              // dies on dark
```

**Exceptions (only these):**
- Brand-red CTAs · `var(--brand-red)` is the canonical · TS constant `KEN_BRAND.red` allowed if and only if no CSS var path exists in scope
- Chart series colors · `KEN_CHART_SERIES_LUMINANCE_SAFE.*` for tier-encoded viz · `KEN_CHART_SERIES.*` for brand series · these are data-encoding · not chrome
- Tier-inversion mapping for dark surface · handled via `getTierColors(surface)` pattern · documented per chart

### 1.2 Surface prop fallback when CSS var unreachable
Some primitives render into Highcharts SVG via callback string · cannot resolve CSS vars. For these:
```tsx
interface PrimitiveProps {
  surface?: 'light' | 'dark';
}

const color = surface === 'dark'
  ? 'rgba(255,255,255,0.75)'
  : 'var(--semantic-ink-body)';
```
The `surface` prop is the escape hatch · NOT the default. CSS var first · prop only when CSS var fails.

### 1.5 Soft-first palette policy (added 2026-05-28 · supersedes default-bold patterns)

Reference v1 report (v0.4) sets aesthetic baseline · editorial · premium · subtle. Prominent / bold shades create dashboard-y noise · aesthetic exhaustion · loss of hierarchy. Apply this policy across ALL charts.

**Default fills MUST sit in upper-half luminance (L*55+):**
- `secondary` `#9488ec` (L*62)
- `quaternary` `#7075c8` (L*55) · use sparingly · sits at threshold
- `tertiary` `#c3c6f9` (L*78)
- `light` `#e0e3fb` (L*90)

**Darker shades reserved for emphasis ONLY · never blanket fill:**
- `primary` `#5e51c8` (L*45) · use for hover/active state · accent · "most opaque" semantic tier where data demands
- `darkest` `#3d3499` (L*30) · DO NOT use as fill on near-black dark surface (1.8:1 contrast fail) · reserved for high-emphasis on light surface or stroke accent only

**Rule of three:**
1. Most data uses upper-half (L*55+) · `secondary` · `tertiary` · `light` ramp
2. Accent / emphasis / hover uses one step down (`primary`)
3. `darkest` rarely · only when contrast permits AND semantic demands

**Tier semantics revised:**
Tier 1 = "highest data value" BUT not necessarily darkest fill. Use `secondary` (L*62) as default tier-1 fill · darker for hover/active only. Hierarchy comes from luminance STEP not absolute darkness.

**Forecast / uncertainty distinction:**
Use stroke-width AND dash style · not color jump. Historical 2.5px solid · forecast 1.5px dashed · same color family. Don't fade to lighter shade (loses series identity in legend).

**Text-as-data exception:**
When TEXT itself encodes data (KeywordScatter · annotated labels) · WCAG 1.4.3 4.5:1 floor for normal text supersedes soft-first fill policy. Light surface use `primary` (L*45 · 7:1 on white) · `darkest` (L*30 · 10:1 on white). Dark surface · soft-first ramp passes 4.5:1 on near-black for text rendering. KenKeywordScatter applies this exception.

**Neutrals (rgba black/white alphas) allowed in chrome:**
- Tooltip border 1px (already `KEN_CHART_BORDERS.tooltipBorder`)
- Dividers · hairlines · subtle separators
- "Other" / "Sparse" / "N/A" data category fills (when periwinkle would force a sixth slot risk) · use `rgba(0,0,0,0.12)` light · `rgba(255,255,255,0.18)` dark
- Empty cell dashed border (already canonical)

**Examples · before vs after:**

| Chart | Before (bold default) | After (soft-first) |
|---|---|---|
| Treemap tier 1 fill | `primary` #5e51c8 | `secondary` #9488ec |
| Treemap tier 2 fill | `secondary` #9488ec | `tertiary` #c3c6f9 |
| Treemap tier 3 fill | `tertiary` #c3c6f9 | `light` #e0e3fb |
| Bubble series 1 | `primary` #5e51c8 | `secondary` #9488ec |
| Bubble series 2 | `secondary` #9488ec | `tertiary` #c3c6f9 |
| Donut 5-slice | primary/quaternary/secondary/tertiary/light | secondary/quaternary/tertiary/light + neutral `rgba(0,0,0,0.12)` for "Other" |
| Gantt planning | `darkest` #3d3499 (fails dark contrast) | `light` #e0e3fb (lowest emphasis) |
| Gantt completed | `light` #e0e3fb (lowest emphasis) | `primary` #5e51c8 (achievement emphasis · semantic flip) |
| Column / Bar single series | `primary` #5e51c8 | `secondary` #9488ec |

**Dark surface contrast floor:**
Any fill on near-black bg (#0a0a0c) MUST hit 3:1 minimum · which means L*≥62 (`secondary` or lighter). Tier inversion on dark uses upper-half ramp · `darkest` BANNED as dark-surface fill.

**Hover state under soft-first policy:**
Default fill = upper-half soft · hover state = one step DOWN (toward `primary`) · creates emphasis without harsh jump. Combined with 2px periwinkle stroke (Bible § 2.2) · two signals · sufficient hierarchy.

**Status enforcement:**
Per-chart audit during G.10 sprint · each chart soft-palette compliance verified. Anti-pattern banned (§ 9.16) · "blanket bold fill" · using `primary` or `darkest` as default data fill.

---

### 1.6 Editorial subtle palette · industry-standard research (2026-05-28)

**Research summary · how premium editorial data publications handle subtle contrast:**

| Publication | Hue strategy | Saturation | Luminance band | Neutral support |
|---|---|---|---|---|
| McKinsey Insights | Navy + teal + muted ochre + warm coral · 4-5 distinct hues | 40-55% | L*55-78 mid | Warm gray rgba |
| FT Visual Vocabulary | ColorBrewer single-hue sequential OR diverging dual-hue | 45-60% | L*50-85 wide | Cool gray |
| Gartner / Forrester | Cool blue family + warm amber/ochre accent | 50-65% | L*55-75 | Neutral gray chrome |
| CB Insights | Navy primary + sage green + warm gray + accent gold | 40-55% | L*55-75 | Warm tan |
| Stripe Press | Single-hue progression + neutral gray support · paper-feel | 30-50% | L*60-85 | Paper neutrals |
| The Pudding / Pew | ColorBrewer Set2 / Pastel2 · 5-6 distinct soft hues | 35-55% | L*65-85 soft | Slate gray |
| Bloomberg Terminal | Amber + sage + slate · earthy desaturated | 35-50% | L*55-78 | Charcoal/slate |

**Common pattern · 4 universal traits:**

1. **Reduced saturation** · 40-60% saturation · NOT 70-90% (which feels dashboard-y / digital-clinical)
2. **Multi-hue ramp** · cool primary + ONE warm accent (ochre · tan · sage · coral) for visual variance · prevents monochrome boredom
3. **Upper-half luminance** · L*55-85 mostly · darker shades reserved for emphasis / headlines only
4. **Neutral gray backbone** for chrome · rgba alpha · warm or cool depending on brand

### 1.7 Ken editorial palette · v3 FINAL (2026-05-28 · v0.4 reference-aligned · OPACITY strategy)

**VISUAL BASELINE CONFIRMED 2026-05-28 via Sprint G.11:**
v0.4 at `http://localhost:3040/test/phase-2` is the CANONICAL visual reference. Screenshot-level parity (not just code-level) is required for every chart in the showcase. Confirmed via Playwright DOM probe: v0.4 and DS showcase produce IDENTICAL computed fills for all 9 charted sections (see parity matrix in `qa-screenshots/g11-v04-reference-baseline-2026-05-28/`). Pre-change rule: before ANY chart primitive edit, screenshot both v0.4 instance AND showcase equivalent · note visual delta · apply minimal change to close gap. Code-level token equality is necessary but NOT sufficient — visual confirmation required.

**The v0.4 secret** (discovered by reading EcosystemTreemap.tsx 2026-05-28):
v0.4 charts look editorial-soft NOT because of desaturated hex values · but because **lower tiers use the SAME hex at LOW OPACITY** (e.g. `rgba(134,179,229,0.20)` for tier 3 perano).

This creates:
- Color family consistency (no random hue jumps)
- Editorial airy feel (opacity reads as "negative space tint" not "solid color")
- Brand integrity (still Ken periwinkle / perano · not desaturated approximations)

**Strategy revision:**
1. **KEEP original Ken hex values** · `#9488ec` `#c3c6f9` `#86b3e5` `#5e51c8` etc · do NOT desaturate
2. **Tier 1 (highest data)** · solid Ken hex + WHITE text (when L*<65)
3. **Tier 2 (mid)** · solid Ken hex lighter (L*78) + dark ink text
4. **Tier 3 (faint)** · SAME hex at 0.15-0.30 opacity · NOT a lighter pre-blended hex
5. **Hover** · bump opacity 0.20 → 0.35 for tier 3 · step to next-solid for tier 1/2
6. **"Other" / "Sparse"** · sage neutral `#b8c4c0` · NEVER chart series color
7. **Growth-oriented data** (positive trend · success metric) · sage green `#7da982` · SEMANTIC ONLY · NOT default

**Banned (per user direction 2026-05-28):**
- Pre-blended desaturated hex (`#a39ee0` was wrong) · use solid + opacity instead
- Warm ochre · amber · gold · coral · tan
- Green family beyond `sageGrowth` semantic emphasis
- ANY new hue family

**Pre-change screenshot rule (enforced 2026-05-28 Sprint G.11):**
Before editing any chart primitive · capture BOTH:
1. `http://localhost:3040/test/phase-2` — scroll to the relevant section · screenshot the chart
2. `http://localhost:3070/` — navigate to matching demo · screenshot the chart
Note pixel-level delta. Apply MINIMUM change. Re-screenshot both to verify gap closed. Code-token equality alone does NOT confirm visual parity — rendering context (section bg, spacing, ChartFigure wrapper) differs and can shift perceived color.

**v0.4 confirmed fills (Sprint G.11 DOM probe · 2026-05-28):**

| Chart | v0.4 series fill slot 1 | v0.4 series fill slot 2 | Tier 3 / Opacity strategy |
|---|---|---|---|
| KenColumnChart (market-size) | `#9488ec` solid | `#9488ec99` (60% opacity forecast) | n/a |
| KenBarChart / KenDualColumn (ds-gap) | `#9488ec` | `#c3c6f9` | n/a |
| KenDonutChart (segmentation) | `#9488ec` `#c3c6f9` `#86b3e5` `#7075c8` `#a7c9ed` `#b8c4c0` | — | "Other" = neutral `#b8c4c0` |
| KenBubbleChart (competitor) | `rgba(148,136,236,0.55)` series 1 | `rgba(195,198,249,0.55)` series 2 | All bubbles at 0.55 opacity (prop override) |
| KenScenarioFanChart (future-outlook) | `#9488ec` base line | `#7075c8` bull · `#86b3e5` bear | Fan area = `#a7c9ed` at 0.22 fillOpacity |
| KenTreemap (ecosystem) | `#9488ec` tier 1 solid | `#c3c6f9` tier 2 solid | Tier 3 = `rgba(134,179,229,0.20)` |
| Gridline color (all Highcharts) | `#e6e6e6` | — | — |
| Axis label fill (all Highcharts) | `rgba(0,0,0,0.6)` | — | 11px DM Sans |

### 1.7 v2 ARCHIVE (superseded · kept for history)

Earlier v2 attempt pre-blended desaturated hex (`#a39ee0` `#c5c3ec` etc). Resulted in washed-out monochrome. Reverted to v0.4 opacity strategy.

### 1.7 v1 (DEPRECATED · 2026-05-28 · pre-revision)

**ARCHIVED reasoning · misdiagnosed problem.** Original Ken palette saturation was correct · problem was using SOLID lighter hex for tier 3 instead of opacity-on-original. See § 1.7 v3 FINAL above.

**Problem with v1:** Saturation too high (70-80%) · dashboard-y feel · over-prominent. NOT a hue problem.

**User constraint:** NO new hue families (no warm ochre · no green · no coral). Use existing Ken periwinkle + perano family ONLY. Add NEUTRAL grays (sage · cool gray) where necessary for "Other"/"Sparse" semantic AND for chrome separation.

**v2 REVISED strategy · desaturate existing palette + add neutrals:**

| Token | New hex | Old hex | L* | Saturation | Hue family | Use |
|---|---|---|---|---|---|---|
| `primary` | `#a39ee0` | `#9488ec` | L*65 | 50% (was 70%) | Periwinkle 245° | Default tier-1 fill |
| `secondary` | `#c5c3ec` | `#c3c6f9` | L*78 | 35% (was 50%) | Periwinkle 245° | Mid fill |
| `tertiary` | `#a8c0e0` | `#86b3e5` | L*75 | 40% (was 55%) | Perano blue 215° (existing) | Cool perano separator |
| `quaternary` | `#b0aed8` | `#7075c8` | L*70 | 30% | Neutral-periwinkle | Soft accent · was darker purple |
| `light` | `#e6e7f5` | `#e0e3fb` | L*92 | 20% (was 35%) | Periwinkle | Lightest fill |
| `neutral` | `#b8c4c0` | n/a | L*76 | 8% | Sage gray 165° | "Other" / sparse · neutral chrome |
| `accentEmphasis` | `#6b5fb8` | n/a (NEW) | L*48 | 55% | Periwinkle | Hover / active emphasis ONLY |

**Result · 7 tokens · periwinkle + perano (existing Ken families) + sage neutral · saturation capped 55% · luminance L*48-92.**

**Banned (per user direction 2026-05-28):**
- Warm ochre · amber · gold · coral · tan
- Green family beyond sage neutral
- ANY new hue family not in existing Ken palette

The original Ken palette (periwinkle + perano) is correct · the fix is DESATURATION + adding NEUTRAL grays · not new hues.

### 1.8 Fill ⟷ text pairing rule (canonical · 2026-05-28)

User feedback locked: "darker shades with darker text · lighter shades with lighter text" was incorrect interpretation. Correct rule:

| Fill luminance | Text color | Rationale |
|---|---|---|
| L* < 45 (very dark) | `rgba(255,255,255,0.95)` WHITE | High contrast · 7:1+ |
| L* 45-50 (dark) | `rgba(255,255,255,0.95)` WHITE | 4.5:1+ on `#5e51c8` L*45 PASSES |
| L* 50-60 (mid-dark · CAUTION) | DARK INK preferred | White FAILS 4.5:1 on `#7075c8` L*55 (3.5:1) · use dark ink (5.6:1) |
| L* 60-75 (mid) | `rgba(26,26,46,0.92)` DARK INK | `#9488ec` L*62 + white = 2.86:1 FAIL · dark ink = 7.1:1 PASS |
| L* 75-90 (light) | `rgba(26,26,46,0.90)` DARK INK | Dark on light · 7:1+ |
| L* > 90 (lightest) | `rgba(26,26,46,0.85)` DARK INK | Soft dark · prevents harsh on near-white |

**Banned anti-pattern (§ 9.16):** Light text on light fill (e.g. white on `#e6e7f5`) · invisible · 1.5:1 contrast fail. Equally banned · dark text on dark fill.

### 1.9 Text overflow handling · canonical (2026-05-28 · added § 4.5)

When chart/table content exceeds container:

| Context | Strategy | Fallback |
|---|---|---|
| Axis label (Highcharts) | Rotate -45° at narrow · OR · truncate w/ `…` | Full text in tooltip on hover |
| Chart cell label (Heatmap · Gantt · Treemap) | Adaptive font-size per cell area (already in KenTreemap) · OR · hide label if cell too small | CellTooltip reveals on hover/tap |
| Table cell text | `TruncatedText` · ResizeObserver · scrollWidth>clientWidth | `tooltipMeta` reveals full + secondary |
| Table column header subtitle | 2-line clamp · `-webkit-line-clamp: 2` | Tooltip on hover |
| Section title | 2-line clamp at narrow viewport | Full in `<title>` element + sr-only |
| Tag / Badge | `max-width: 200px` + `overflow: hidden text-overflow: ellipsis` | `title` HTML attr · screen reader |
| Tooltip content | `max-width: 280px` (CellTooltip canonical) | Wrap to multi-line · max 6 lines |
| Long legend label | Truncate at 32 chars · `…` | Full in tooltip |

**Universal rule:** Content NEVER vanishes. Truncation always paired with disclosure path (tooltip · expand · scroll · sr-only).

### 1.10 Min-width / touch target compliance (WCAG 2.5.5 · added 2026-05-28)

All interactive chrome elements (buttons · tabs · badges · tags · toggles · pills · chips) MUST hit minimum touch target:

- `min-width: 44px` · `min-height: 44px` · target itself OR via padding
- HitArea wrapper (showcase-local · Sprint F) wraps smaller visual elements
- Exception · inline-flow links · WCAG 2.5.5 AAA only · AA allows smaller for in-line text
- Tag/Badge default · `min-h-[24px]` visual · wrap in HitArea OR pad to `py-3 px-4` for standalone

### 1.11 Font system canonical (added 2026-05-28 · G.13 doctrine lock)

**Two families ONLY · no third family · no overlap:**

- `--font-serif` · Noto Serif · Georgia fallback · DISPLAY ONLY · headings ≥18px · final CTA · paywall titles
- `--font-sans` · DM Sans · system fallback · BODY default · labels · UI · data · tables

**Scale · Major Third 1.25× · base 16px · canonical (NEVER raw px):**

| Token | Value | Use |
|---|---|---|
| `--text-2xs` | 11px | Micro labels · badges · "PREVIEW ONLY" eyebrows |
| `--text-xs` | 12.8px | Labels · metadata · molecule internals · CTA button text |
| `--text-sm` | 16px | BODY DEFAULT · 90% of text · paragraphs |
| `--text-base` | 20px | Large body · card titles (4+ cards) · paywall titles |
| `--text-lg` | 25px | Card titles (2-3 cards) |
| `--text-xl` | 31.25px | Subsection h3 |
| `--text-2xl` | 39px | Section h2 |
| `--text-3xl` | 48.8px | Hero h1 · final CTA h2 ONLY |
| `--text-4xl` | 61px | Extra-large emphasis (challenge numbers) |

**Semantic font tokens (purpose-named aliases · point to scale OR mid-step ref-justified · NO new families):**

| Token | Value | Use |
|---|---|---|
| `--text-eyebrow` | `--text-2xs` (11px) + uppercase + tracking 0.10em | Section eyebrows · "CHART · DEMO" · "PREVIEW ONLY" |
| `--text-paywall-title` | 18px Noto Serif 400 weight + tracking-tight | PremiumLockCard title (between text-2xs and text-base · ref-justified for compact paywall) |
| `--text-paywall-body` | 13px DM Sans 500 | Paywall body lines (between xs and sm · compact list items) |
| `--text-paywall-cta` | `--text-xs` (12.8px) DM Sans 500 | Paywall CTA button text |
| `--text-source-citation` | 11px DM Sans italic | Source citations · footnotes · "Source: X" lines |
| `--text-data-label` | 9.5px-10px DM Sans 600 tabular-nums | Chart axis labels · data point labels · uppercase eyebrow on axis title |

**Weight tokens (canonical):**

- `--font-weight-light` 300 · large display headings
- `--font-weight-normal` 400 · serif display + body
- `--font-weight-medium` 500 · emphasis body · CTA button text · paywall body
- `--font-weight-semibold` 600 · eyebrows · table headers
- `--font-weight-bold` 700 · rare · only for stat callouts

**Banned (per G.13 doctrine 2026-05-28):**

- Raw px values for fontSize in components (use scale tokens OR semantic tokens)
- Third font family (no Inter · Roboto · Source Sans · etc.)
- Font weight outside 300/400/500/600/700 (no 350 · 450 · 550)
- Letter-spacing per component (use canonical patterns: 0 default · -0.01em display · 0.04em labels · 0.10em uppercase eyebrows)

**Migration policy:**

- v0.4 sections w/ hardcoded px values · gradual migration · NOT mass-refactor (visual regression risk)
- New components MUST use semantic tokens OR scale tokens · NO raw px
- Enforce via `scripts/check-font-scale.mjs` · scans component sources · flags raw px in fontSize

**Reason for semantic tokens · not new families:**

Current 2-family system (serif/sans) creates editorial-premium feel · adding new family would dilute brand. Repeated patterns (eyebrow · paywall · source citation · data label) need named tokens to prevent per-component drift to mid-scale px values. Semantic tokens point to existing scale values OR justified mid-step values (e.g. paywall-title 18px sits between text-2xs and text-base · ref-aligned compact size for premium teaser).

**No overlap check:**

| Existing token | New semantic | Overlap? |
|---|---|---|
| `--text-2xs` 11px | `--text-eyebrow` (11px alias) | NO · semantic name only |
| `--text-md` 18px (v0.2 legacy) | `--text-paywall-title` 18px | OVERLAPS · use `--text-md` ref to consolidate (TODO migrate) |
| `--text-xs` 12.8px | `--text-paywall-cta` (12.8 alias) | NO · semantic name only |

Detected ONE overlap (paywall-title vs text-md). Consolidate · `--text-paywall-title` → references `--text-md`. Doc updated.

---

### 1.12 Font color canonical · semantic-ink ONLY (added 2026-05-28 · G.13 doctrine lock)

**Rule:** Every text color MUST resolve via `--semantic-ink-*` scale. Raw `--black-N` BANNED for text. Brand colors (`--color-brand-red`) for CTAs only.

**Why semantic-ink:**
- Dark surface cascade · `[data-surface="dark"]` flips automatically
- WCAG verified · all 5 tokens pass AA on light
- Maintenance · ONE way to express "muted text" not 4

**Canonical scale (5 tokens):**

| Token | Resolves to | Hex | Contrast on white | WCAG | Use |
|---|---|---|---|---|---|
| `--semantic-ink-strong` | `--black-900` | #171717 | 15.5:1 | AAA | Headings · primary body emphasis · `<strong>` |
| `--semantic-ink-body` | `--black-700` | #404040 | 10.4:1 | AAA | Body text default · paragraphs |
| `--semantic-ink-muted` | `--black-600` | #525252 | 7.4:1 | AA | Captions · eyebrows · units · footnotes · placeholders |
| `--semantic-ink-subtle` | `--black-500` | #737373 | 4.5:1 | AA borderline | Dividers · disabled · low-priority labels |
| `--semantic-ink-faint` | rgba(0,0,0,0.35) | n/a | ~3.4:1 | FAIL body | Decorative ONLY · dots · faint borders |

**Banned (per G.13 doctrine 2026-05-28):**

| Anti-pattern | Issue | Migration |
|---|---|---|
| `text-[var(--black-500)]` | Raw scale · no semantic | → `text-[var(--semantic-ink-subtle)]` |
| `text-[var(--black-600)]` | Raw scale | → `text-[var(--semantic-ink-muted)]` |
| `text-[var(--black-700)]` | Raw scale | → `text-[var(--semantic-ink-body)]` |
| `text-[var(--black-400)]` | 2.8:1 WCAG FAIL body | → `text-[var(--semantic-ink-muted)]` |
| `text-[var(--black-300)]` | 1.6:1 WCAG FAIL | → `text-[var(--semantic-ink-muted)]` or decorative use only |
| `text-black` Tailwind class | Hardcoded · dark-surface broken | → `text-[var(--semantic-ink-strong)]` |
| `text-white` Tailwind class | Hardcoded · light-surface broken | → `text-[var(--semantic-ink-on-dark-strong)]` (use on cinematic ONLY) |
| Inline fallback hex in token (`var(--black-500, #a3a3a3)`) | Drift risk | → `var(--semantic-ink-subtle)` (DS cascade owns fallback) |

**Exceptions (acceptable raw color):**

- `bg-black text-white` paired toggle/pill · dark-on-light intentional design · NOT semantic flip
- Cinematic hero surface · always-dark context · `text-white` explicit
- Chart series colors · KEN_CHART_SERIES tokens · NOT text colors
- Brand red CTA · `text-[var(--color-brand-red,#b01f24)]` · CTAs only

**§1.12.1 · Why graded contrast for hierarchy (added 2026-05-28 G.13 refinement)**

NOT a WCAG floor decision · this is an INTENTIONAL editorial design pattern.

**Research basis:**

Industry-standard editorial publications (NYT · Stripe · GitHub · Bloomberg · Vercel · Linear) use graded ink levels:

| Publisher | Heading | Body | Caption |
|---|---|---|---|
| NYT | 16:1 | 10:1 | 6.5:1 |
| Stripe | 15:1 | 8:1 | 4.8:1 |
| GitHub | 15:1 | 5.3:1 | 4:1 |
| Bloomberg | 15:1 | 10:1 | 6:1 |

Body at 10:1 not 15:1 is INTENTIONAL · creates hierarchy via contrast gradient + size + weight. Eye anchors on heading, body recedes naturally.

**Reasons (Bringhurst · Butterick · Lupton):**
1. Pure black on white = visual vibration · tires eyes on long-form reading
2. Heading = body contrast equality removes visual hierarchy · everything competes
3. Card-internal body uses lower contrast than page-level body · card frame already adds visual weight · ink can soften
4. WCAG 4.5:1 is the FLOOR not the OPTIMAL · 7-12:1 reads best for sustained text

**Practical role mapping (revised G.13.1):**

| UI role | Token | Contrast | Pattern reference |
|---|---|---|---|
| **Page-level body** (standalone `<p>` not in card) | `--semantic-ink-body` | 10.4:1 | Editorial standard NYT/Stripe/Bloomberg |
| **Card-internal body** (text inside contained card frame) | `--semantic-ink-muted` | 7.4:1 | Card frame adds weight · ink can soften |
| **Subtitle / lead-in below heading** | `--semantic-ink-muted` | 7.4:1 | Recedes from heading · prefaces body |
| **Inline caption · source line · figcaption** | `--semantic-ink-muted` | 7.4:1 | Italic source · "Source: ABS Cat. 8731" |
| **Eyebrow · unit · micro-label** | `--semantic-ink-muted` | 7.4:1 | "CHART · DEMO" · "AUD MN" |
| **Placeholder · disabled · divider · ghost text** | `--semantic-ink-subtle` | 4.5:1 | Search placeholder · disabled button |
| **Decorative dots · faint borders** | `--semantic-ink-faint` | ~3.4:1 | Decorative ONLY · never body |

**Default rule (G.13.3 FINAL CANONICAL · user-locked 2026-05-28):**

- **Standalone page-level `<p>` body** (including subtitle/lead-in directly under heading) → `--semantic-ink-body` (10.4:1)
- **Card-internal `<p>` body** (inside `<div className="...border...rounded...">` frame) → `--semantic-ink-subtle` (4.5:1)
- `<p>` placeholder · disabled · ghost → `--semantic-ink-subtle` (4.5:1)
- NEVER body on `--semantic-ink-faint` (3.4:1 fails WCAG body)

**Why this rule:**

| Element | Token | Contrast | Reason |
|---|---|---|---|
| h1/h2/h3 heading | strong | 15.5:1 | MAX visual anchor |
| Subtitle / lead-in (first `<p>` below heading) | body | 10.4:1 | Same as body · readable · prefaces content |
| Body paragraph | body | 10.4:1 | Primary reading |
| Card-internal body (`<p>` inside frame) | subtle | 4.5:1 | Card frame already provides hierarchy via border/bg/shadow · receded ink reinforces "inside frame" semantic |
| Caption · source citation italic 10-13px | muted | 7.4:1 | Footnote weight |
| Eyebrow uppercase tracked 9-12px | muted | 7.4:1 | Label weight |
| Stat sublabels · units · "Chapters" type | muted | 7.4:1 | Meta weight |
| Placeholder · disabled · divider | subtle | 4.5:1 | Receded UI |

**Visual cascade (heading → body → card → caption):**
- Heading 15:1 (anchor)
- Standalone body 10:1 (-33% from heading · primary read)
- Card-internal 4.5:1 (-56% from body · receded · frame provides hierarchy)
- Caption muted 7.4:1 (-29% from body · footnote)

Distinct visual weight per UI role. Standalone subtitle uses body so reader gets full readability for primary intro content. Card body receded because frame compensates.

**Why card text uses subtle (user direction):**
- Card frame already provides hierarchy via border/bg/shadow
- Card content is secondary/contained · subtle ink reinforces "inside frame" semantic
- Standalone page-level body needs full body contrast for primary reading
- Cards are accessory content · subtle ink correct for receded weight

**`muted` reserved STRICTLY for (NOT card body):**
- Captions · figcaptions · source citations (italic 10-13px)
- Eyebrows · uppercase tracked labels (9-12px)
- Subtitle lead-in (1 single `<p>` directly below heading · prefaces body)
- Subsection sublabels · stats units · "Chapters" "Operators Profiled" type labels

**`subtle` ALSO covers (G.13.3 expanded scope):**
- ALL card-internal body text (`<p>` inside bordered/rounded card frame)
- Placeholders · disabled · dividers
- Inline meta annotations

**Migration status (G.13 audit 2026-05-28):**
- 289 raw `--black-N` text replacements completed across v0.4 + showcase
- 59 files migrated · TSC clean · HTTP 200 verify
- 5 residual `text-black/text-white` migrated in FAQs · 1 acceptable retained in Ecosystem (toggle pair)
- Cinematic hero `text-white` retained (always-dark context)

**Migration status (G.13.1 ink-role audit 2026-05-28 · second pass):**
- ~60 `--semantic-ink-subtle` on eyebrow/caption/subtitle/card-body roles → fixed to `--semantic-ink-muted`
- 15+ files touched · all DRIFT_EYEBROW / DRIFT_CAPTION / DRIFT_SUBTITLE / DRIFT_CARD_BODY categories
- KEEP_* (decorative icons · disabled states · inactive nav items · toggle pills · dividers) untouched

**Gap 1 · Size-aware contrast floor (added G.13.1 · 2026-05-28):**
- ≥14px text: all 4 tiers acceptable (strong / body / muted / subtle)
- 10–13px text: `--semantic-ink-muted` minimum — subtle (4.5:1) insufficient at small size
- <10px text: `--semantic-ink-body` minimum + bold weight required (anti-aliasing reduces effective contrast at sub-10px)

**Gap 2 · Italic rule (added G.13.1 · 2026-05-28):**
Italic at any size → `--semantic-ink-muted` minimum. Italic + subtle = double legibility decrement (oblique stroke + low contrast compound). No exceptions.

**Gap 3 · Dark surface inversion (added G.13.1 · 2026-05-28):**
Mirror semantic-ink scale to dark surface via CSS var override in dark-scope. Already in DemoCanvas via `[data-surface="dark"]` block.
- `--semantic-ink-on-dark-strong` = `rgba(255,255,255,0.92)` — headings on dark
- `--semantic-ink-on-dark-body` = `rgba(255,255,255,0.78)` — body paragraphs on dark
- `--semantic-ink-on-dark-muted` = `rgba(255,255,255,0.60)` — captions / eyebrows on dark
- `--semantic-ink-on-dark-subtle` = `rgba(255,255,255,0.42)` — disabled / placeholder on dark
DemoCanvas dark scope already injects these. ReportPreviewSlideshow uses inline rgba() for pre-token fallback — acceptable until DS dark tokens land.

**Gap 4 · Lint enforcement (added G.13.1 · 2026-05-28):**
`scripts/check-ink-roles.mjs` scans for `--semantic-ink-subtle` on `<p>` body, uppercase, italic patterns and flags DRIFT. See script for full pattern set.

**Enforcement:**
- New components MUST use semantic-ink tokens
- Eyebrow / caption / italic / sub-10px → `--semantic-ink-muted` minimum (never subtle)
- `scripts/check-ink-roles.mjs` catches drift at pre-handover gate
- `scripts/check-font-colors.mjs` catches raw `--black-N` drift (future)

---

### 1.3 Tokens · the only acceptable values

| Token name | Light value | Dark value | Use |
|---|---|---|---|
| `--semantic-ink-strong` | rgba(0,0,0,0.92) | rgba(255,255,255,0.92) | Titles · headings · primary text |
| `--semantic-ink-body` | rgba(0,0,0,0.75) | rgba(255,255,255,0.75) | Body text · axis labels |
| `--semantic-ink-muted` | rgba(0,0,0,0.62) | rgba(255,255,255,0.62) | Captions · eyebrows · units · legend · "Data as of" |
| `--semantic-ink-subtle` | rgba(0,0,0,0.42) | rgba(255,255,255,0.42) | UI chrome only · dividers · placeholder · disabled |
| `--semantic-ink-faint` | rgba(0,0,0,0.18) | rgba(255,255,255,0.18) | Decorative dots · faint borders |
| `--border-hairline` | rgba(0,0,0,0.08) | rgba(255,255,255,0.12) | Row dividers · slice separators · subtle dividers |
| `--border-default` | rgba(0,0,0,0.18) | rgba(255,255,255,0.18) | Card borders · table outer |

WCAG verified · all body/heading tokens pass 4.5:1 on both surfaces · `subtle` passes 3:1 UI minimum.

### 1.4 Test every change on BOTH surfaces · BEFORE claiming done
- Light alone
- Dark alone
- Compare side-by-side (both surfaces in same viewport)
- Mobile 390 (each surface)
- Forced-colors active (Windows High Contrast emulation)
- Print preview
- Reduced motion

Skipping any of these on a chart change = bug in production.

---

## §2 · Hover doctrine (the unified pattern)

The earlier "border accent only · no dim" rule (Sprint G.1) is SUPERSEDED. Real-world testing showed users need both signals · isolate AND dim · for fast pattern recognition.

### 2.1 Canonical hover behavior (all data viz)
On mouse-over of any data element:
1. **Isolate** · target gains visual emphasis (one or more of: brighten · border accent · elevate · scale)
2. **Dim** · all OTHER data elements drop to 0.35-0.5 opacity (per viz type below)
3. **Disclose** · CellTooltip appears with full data (after 100ms delay)
4. **Cursor** · pointer
5. **Transition** · 200ms ease-out · respects `useReducedMotion()` (instant if reduced)

### 2.2 Per-viz type hover spec

| Viz type | Isolate technique | Dim others | Tooltip | Cursor |
|---|---|---|---|---|
| **Bar / Column** | Full opacity + 2px stroke periwinkle | opacity 0.4 | Yes · top-anchored | pointer |
| **Stacked bar** | Hovered segment full + stroke · other segments in same stack 0.6 · other bars 0.4 | tiered | Yes · segment-specific | pointer |
| **Line** | Stroke 4px (was 3px) + full opacity + marker visible | opacity 0.3 + 2px stroke | Yes · point-anchored | pointer |
| **Area / Scenario fan** | Top-line + fill full + stroke accent | opacity 0.35 fills · 0.3 strokes | Yes | pointer |
| **Bubble** | Full opacity + 2px stroke + z×1.0 | opacity 0.35 + z×0.85 (subtle shrink) | Yes · point-anchored | pointer |
| **Donut / Pie** | Slice translate-out 6px + full opacity + 2px outer stroke | opacity 0.5 | Yes · slice-anchored | pointer |
| **Treemap** | 2px periwinkle border (inset) + brighten to next-tier-lighter shade on dark · darker on light | opacity 0.5 | Yes · cell-anchored portal | pointer |
| **Heatmap** | 2px inset shadow periwinkle + bg shift to next-tier-brighter | opacity 0.5 | Yes · cell-anchored | pointer |
| **Gantt** | Whole-row highlight (NOT per-cell) · entity label borderLeft 3px periwinkle · phase cells inset 2px + overlay `inset 0 0 0 9999px rgba(255,255,255,0.05)` | other rows opacity 0.45 | Yes · phase-anchored | pointer |
| **Scatter / Keyword** | Full opacity + 2px stroke + label always-visible | opacity 0.3 + label hidden | Yes | pointer |

### 2.3 Per-viz isolate/dim color values

**Dim opacity** is consistent per chart type · DO NOT vary per demo:
- High-density (heatmap · treemap · gantt) · 0.5 (preserves spatial scan)
- Medium-density (multi-line · bubble · scatter) · 0.3-0.35 (creates strong focus)
- Low-density (bar · column · donut) · 0.4-0.5 (less dim · others still legible)

**Stroke accent color** · always `KEN_CHART_BORDERS.tooltipBorder` (periwinkle `rgb(228,226,240)`) · `var(--border-periwinkle-accent)` if defined.

### 2.4 Tables hover (different doctrine)
Tables DO NOT dim other rows. Tables shift the hovered row to next-skip palette shade:

| State | Light bg | Dark bg |
|---|---|---|
| Row default · even | `var(--table-row-bg)` ≈ #fff | rgba(255,255,255,0.02) |
| Row default · odd (zebra) | `var(--table-row-alt-bg)` ≈ rgba(0,0,0,0.025) | rgba(255,255,255,0.04) |
| Row HOVER | `var(--table-row-hover-bg)` ≈ rgba(0,0,0,0.06) · skip one step beyond zebra | rgba(255,255,255,0.08) |
| Row HOVER + zebra | tier above hover · rgba(0,0,0,0.09) | rgba(255,255,255,0.12) |

**Why skip-shade not dim:** Tables are read row-by-row. Dimming other rows breaks scan flow. Shifting hovered row up creates "selected" feel · keeps siblings legible.

**Transition** · 150ms ease-out · respect reduced-motion.

### 2.5 Implementation pattern · CSS-grid charts (Heatmap · Gantt)

```tsx
const [hoveredId, setHoveredId] = useState<string | null>(null);
const prefersReducedMotion = useReducedMotion();

const transition = prefersReducedMotion
  ? 'none'
  : 'opacity 200ms ease-out, box-shadow 150ms ease-out, background-color 200ms ease-out';

return cells.map(cell => {
  const isHovered = hoveredId === cell.id;
  const isDimmed = hoveredId !== null && !isHovered;
  return (
    <div
      key={cell.id}
      onMouseEnter={() => setHoveredId(cell.id)}
      onMouseLeave={() => setHoveredId(null)}
      onFocus={() => setHoveredId(cell.id)}
      onBlur={() => setHoveredId(null)}
      tabIndex={0}
      style={{
        opacity: isDimmed ? 0.5 : 1,
        boxShadow: isHovered ? 'inset 0 0 0 2px var(--border-periwinkle-accent)' : 'none',
        background: isHovered ? getTierBgHover(cell.tier, surface) : getTierBg(cell.tier, surface),
        transition,
      }}
    />
  );
});
```

### 2.6 Implementation pattern · Highcharts (Bar · Column · Line · Bubble · Donut · MultiLine · ScenarioFan)

Use built-in inactive state · don't roll custom:
```ts
plotOptions: {
  series: {
    states: {
      hover: {
        lineWidth: 4,        // line · default 3
        brightness: 0,
        halo: { size: 8, opacity: 0.25 },
      },
      inactive: {
        opacity: 0.35,        // 0.3 line · 0.4 bar · 0.5 donut/bubble per matrix
      },
    },
    point: {
      events: {
        mouseOver: function() { /* CellTooltip portal · if used */ },
        mouseOut: function() { /* clear */ },
      },
    },
  },
},
```

### 2.7 Implementation pattern · SVG charts (Treemap)
Treemap renders own SVG (D3-hierarchy) · CellTooltip HTML invalid inside `<svg>` · own portal pattern:
```tsx
<rect
  fill={isHovered ? colors.hover : isDimmed ? colors.dim : colors.default}
  stroke={isHovered ? 'var(--border-periwinkle-accent)' : 'transparent'}
  strokeWidth={isHovered ? 3 : 0}
  style={{ transition: 'fill 200ms ease-out, stroke 200ms ease-out' }}
  onMouseEnter={(e) => {
    setHoveredId(cell.id);
    setTooltipState({ x: e.clientX, y: e.clientY, data: cell });
  }}
  onMouseLeave={() => {
    setHoveredId(null);
    setTooltipState(null);
  }}
/>
```

---

## §3 · No-hover device fallback (touch · keyboard)

The hover doctrine assumes a pointer. Touch and keyboard users get equivalent behavior via different inputs.

### 3.1 Touch (no hover)
| User action | System response |
|---|---|
| Single tap on data element | Isolate target + dim others + show CellTooltip · 3s auto-dismiss |
| Tap again (≤500ms) on same element | Treat as activation (drilldown · link · whatever the data does on click) |
| Long press ≥500ms | Persistent tooltip (stays until tap outside) |
| Tap outside | Clear isolate + dim + dismiss tooltip |
| Pinch / spread | Native browser zoom (don't intercept) |

### 3.2 Keyboard
| Key | Behavior |
|---|---|
| `Tab` | Focus first interactive cell/bar/segment · `focus-visible` ring 2px periwinkle |
| `Tab` again | Move to next chart (don't trap unless explicit) |
| `Arrow keys` (within focused chart) | Iterate cells: ←/→ horizontal · ↑/↓ vertical (heatmap · table · grid) · ←/→ siblings (bar · line points · donut slices) |
| `Enter` / `Space` | Activate (drilldown · link · open data table aside · whatever click would do) |
| `Escape` | Clear focus / close tooltip / collapse drilldown |

### 3.3 Implementation per primitive
**CellTooltip** already implements:
- `onTouchStart` start timer + clear previous auto-dismiss
- `onTouchEnd` ≥500ms → persistent · <500ms → show + 3s auto-dismiss
- Document `touchstart` listener · dismiss on outside tap when persistent

**Chart wrappers** must add:
- `tabIndex={0}` on root SVG/grid wrapper
- `onKeyDown` arrow-iterate · maintain `focusedIndex` state · sync to `hoveredId`
- `onFocus`/`onBlur` mirror mouse enter/leave (visual treatment identical)
- `role="application"` on root if keyboard nav active · OR `role="img" aria-label="..."` w/ sr-only data table fallback

### 3.4 Reduced motion
`useReducedMotion()` hook from framer-motion · when true:
- All hover transitions instant (no fade)
- All tooltip transitions instant (no opacity fade)
- All theme-switch transitions instant
- All scroll-into-view `behavior: 'instant'`

### 3.5 Forced-colors active
- Hover indicator → `Highlight` system color (forced-colors block in base.css)
- Tooltip → `Canvas` bg · `CanvasText` text · `CanvasText` border
- Focus ring → `2px solid Highlight`
- Chart series colors → unchanged (data encoding · users keep semantic info)
- Border accent → `1px solid CanvasText`

---

## §4 · Mobile decision matrix

The G.3 responsive.rules pass was too aggressive (dropped dataLabels at maxWidth 640 · broke compare mode where each pane is ~370px but the breakpoint should only fire on TRUE mobile viewport).

### 4.1 Breakpoint clarification
- **Compare mode** · each pane ~370px · BUT viewport is desktop · DO NOT trigger mobile rules
- **True mobile** · viewport ≤ 480px · trigger mobile rules
- **Tablet** · 480 < viewport ≤ 1024 · mid-rules (keep most features · scroll horizontally if needed)
- **Desktop** · viewport > 1024 · full features

Use `window.matchMedia('(max-width: 480px)')` checked inside chart wrapper · NOT Highcharts `responsive.rules` which fires on container width (catches compare mode incorrectly).

For Highcharts container-width rules · raise threshold to 360 OR use viewport-aware responsive helper.

### 4.2 Per-chart mobile behavior

| Chart | True mobile (≤480) | Compare mode | Strategy |
|---|---|---|---|
| **KenColumnChart** | rotate x-labels -45° · fontSize 10px · keep all bars | unchanged | Adjust labels only |
| **KenBarChart** | already horizontal · yAxis fontSize 10px | unchanged | Mostly nothing |
| **KenDualColumnChart** | min-width 600 wrapper · h-scroll | min-width 480 in compare cell | Scroll |
| **KenBubbleChart** | dataLabels only for top-3 by z · minSize 2% | KEEP all labels in compare | Filter on true-mobile only |
| **KenDonutChart** | dataLabels: keep · use connector + percentage only (drop name) at ≤320 viewport · keep full at >320 | KEEP full labels in compare | Compress label · not drop |
| **KenMultiLineChart** | legend itemDistance 8 · min-width 700 wrapper · h-scroll · keep all series | KEEP full | Scroll |
| **KenScenarioFanChart** | rotate x-labels -45° · forecast labels stay (italic year is data · not decoration) | unchanged | Adjust labels only |
| **KenTreemap** | min-height clamp() responsive · cells reflow naturally | unchanged | CSS clamp |
| **KenHeatmap** | min-width 120 + cols×50 · h-scroll | min-width 120 + cols×40 in compare | Scroll · narrower cells |
| **KenGanttTimeline** | min-width 120 + periods×60 · h-scroll | unchanged | Scroll |
| **KenKeywordScatter** | ResizeObserver-driven · clamps to container · NO scroll | unchanged | Native fit |
| **PropertyTable** | h-scroll · sticky first column · all columns visible via scroll | unchanged | Scroll |
| **RankingTable** | h-scroll · sticky rank column · NEVER drop columns | unchanged | Scroll |

### 4.3 Anti-patterns banned
- Disabling dataLabels at container-width thresholds (breaks compare mode)
- Hiding columns on mobile (loses data)
- Replacing chart with text on mobile (loses spatial encoding)
- Tap-to-show-more on chart (touch users can't always discover · use CellTooltip + sr-only data table instead)

### 4.4 Forecast / uncertainty rendering
Data points marked as forecast (year suffixed with F · or explicit `isForecast: true`) MUST be visually distinct from historical:
- **Line / Area** · `dashStyle: 'Dash'` · opacity 0.75 · marker outline-only (no fill)
- **Bar / Column** · pattern fill (diagonal hatch) OR border-only · opacity 0.75
- **Year axis labels** · italic for forecast years · already correct
- **Legend** · separate entry "Forecast" with same dash style · OR · tooltip text "Forecast" appended

Use Highcharts `zones` to split a single series at forecast boundary:
```ts
zones: [
  { value: forecastStartYear }, // historical · default style
  { dashStyle: 'Dash', fillOpacity: 0.5 }, // forecast
],
```

---

## §5 · Compare mode contract

Side-by-side compare (light vs dark · or variant A vs variant B) is its own rendering context. Two charts must independently surface-adapt.

### 5.1 Required structure
```tsx
<div className="compare-grid grid grid-cols-2 gap-4">
  <div data-surface="light" style={{ colorScheme: 'light', /* CSS vars light */ }}>
    <ChartFigure surface="light" {...} />
  </div>
  <div data-surface="dark" style={{ colorScheme: 'dark', /* CSS vars dark */ }}>
    <ChartFigure surface="dark" {...} />
  </div>
</div>
```

Each cell:
- Owns its own surface attribute
- Owns its own CSS variable scope (injection at cell level · NOT outer wrapper)
- Owns its own surface prop passed to ChartFigure
- Owns its own colorScheme CSS property

### 5.2 Compare mode constraints
- DataLabels · keep both sides (don't trigger mobile rules)
- Responsive · use viewport not container
- Series colors · tier-inversion applies per side
- Tooltip · stays canonical (white bg + periwinkle border) on both sides
- Hover · independent (hovering left side doesn't affect right side)
- Forecast styling · same on both sides

### 5.3 Compare mode tests
1. Title visible on dark side
2. Eyebrow + unit visible on dark side
3. DataLabels present on both sides
4. Series colors correctly inverted on dark side (tier mapping flipped)
5. Slice borders subtle on both sides (NOT bright white on dark)
6. Legend text visible on both sides
7. Source line italic visible on both sides
8. Forecast styling applied on both sides

---

## §6 · Print stylesheet contract

When printed:
- Charts kept (B&W friendly · series colors print as gray shades)
- Tooltips: hidden (CellTooltip portals don't reach print DOM cleanly) · sr-only data table reveals as primary alternate
- Interactive chrome hidden (variant toggle · sidebar · export menu)
- Page breaks · `figure { page-break-inside: avoid }` · `h1-h3 { page-break-after: avoid }`
- Light theme forced

Already implemented in `design-system/core-v2/src/styles/print.css` (G.4).

---

## §7 · Forced colors (Windows High Contrast)

System tokens used · `Canvas` · `CanvasText` · `Highlight` · `LinkText`. Already implemented in `base.css` `@media (forced-colors: active)` block (G.2).

**Per primitive · ensure works in forced-colors:**
- TableShell borders → `1px solid CanvasText`
- Heatmap cells → `1px solid CanvasText`
- Tooltip → `Canvas` bg · `CanvasText` text · `1px solid CanvasText` border
- Focus → `2px solid Highlight`
- SVG charts (Treemap) inline `<style>` with same rules (CSS can't reach `<svg>` from outer base.css)

---

## §8 · Per-primitive surface prop contract

These primitives require `surface?: 'light' | 'dark'` prop · because they render content where CSS vars don't reach OR cascade is unreliable:

| Primitive | Why surface prop |
|---|---|
| `ChartFigure` | Renders title/eyebrow/unit via CSS vars · prop is fallback for forced contexts |
| `CellTooltip` | Renders via createPortal to document.body · OUTSIDE the surface scope · MUST use surface prop |
| `ExportMenu` | Icon · border · bg colors via TS constants (TS-typed Highcharts callbacks elsewhere force this pattern) · surface prop required |
| `DataFreshness` | Italic muted text · surface prop required |
| `KenDonutChart` | Slice borderColor renders into Highcharts SVG via callback · surface prop must pass into surfaceOverrides() |
| `KenBubbleChart` | Same pattern |
| All Highcharts wrappers | All use surfaceOverrides() pattern · surface prop canonical |
| `KenTreemap` | SVG charts render own portal · surface prop passed to getTierColors() |
| `KenHeatmap` | CSS-grid · CSS vars work · surface prop optional but recommended |
| `KenGanttTimeline` | Same · CSS vars + surface prop |

Pattern:
```tsx
interface PrimitiveProps {
  surface?: 'light' | 'dark';   // default light
  // ...rest
}

export function Primitive({ surface = 'light', ...rest }: PrimitiveProps) {
  // use CSS var first
  // fall back to surface prop for callback-resolved colors
}
```

---

## §9 · Anti-patterns banned

1. **TS constant for chrome color** · `KEN_INK.muted` inside primitive · breaks dark surface · use CSS var
2. **Hardcoded white slice border** · `borderColor: '#fff'` · breaks dark donut · use surface-aware
3. **Hardcoded black axis text** · breaks dark · use surfaceOverrides() pattern
4. **`responsive.rules` at container-width** that drops data · breaks compare mode · use viewport rules OR raise threshold
5. **Hover dim without isolate** OR isolate without dim · doctrine requires BOTH
6. **Table row dim on hover** · tables use skip-shade not dim
7. **Drop columns on mobile** · scroll instead
8. **Replace chart with text on mobile** · loses spatial encoding
9. **No keyboard nav on chart** · WCAG 2.1.1 fail · arrow-iterate required
10. **No sr-only data table** · WCAG 1.1.1 fail · ChartDataTable required for SVG charts
11. **Tooltip without dismiss on outside tap** · WCAG 1.4.13 fail · touch users trapped
12. **Forecast identical to historical** · UX rule · uncertainty must be visually distinct
13. **Non-tier hue encoding** · color-blind fail · use `KEN_CHART_SERIES_LUMINANCE_SAFE` for tiers
14. **Tooltip dark on dark surface** · ref-canonical · tooltip stays WHITE everywhere
15. **Brand-red on charts** · brand-red is CTAs ONLY · charts use periwinkle palette

---

## §10 · Verification checklist (use for every chart change)

Before claiming a chart change done · verify ALL:

- [ ] Light surface · title visible · 4.5:1+ contrast
- [ ] Dark surface · title visible · 4.5:1+ contrast
- [ ] Eyebrow + unit visible both surfaces
- [ ] Subtitle (if present) visible both surfaces
- [ ] Legend text visible both surfaces
- [ ] Axis labels visible both surfaces
- [ ] Tooltip white bg + periwinkle border on both surfaces
- [ ] Slice/cell borders subtle on dark (not bright white)
- [ ] Hover · isolate target · dim others · per matrix § 2.2
- [ ] Hover · 200ms transition · respects reduced-motion
- [ ] Touch · tap to isolate · 2nd tap to act · outside to clear
- [ ] Touch · long-press ≥500ms persistent · single-tap 3s auto-dismiss
- [ ] Keyboard · Tab focuses chart · arrows iterate · Enter acts · Esc clears
- [ ] Focus ring 2px periwinkle on hovered/focused element
- [ ] Mobile 390 · data NOT stripped · scroll if needed
- [ ] Compare mode · both sides surface-adapt · dataLabels both sides
- [ ] Forecast visually distinct (dashed line · faded fill · italic year)
- [ ] Sr-only data table present · WCAG 1.1.1
- [ ] Forced-colors · cells/borders use system tokens
- [ ] Print · sr-only reveals · chrome hides
- [ ] No TS-constant chrome colors (grep `KEN_INK\.` `KEN_CHART_BORDERS\.` in primitive · should only be in surfaceOverrides fallback)
- [ ] TSC clean · ESLint clean · axe-core clean

If any unchecked · change is not done.

---

## §11 · AI consumption protocol

When an AI agent receives a chart-related task:

1. **Read this doc first** · don't skip · don't summarize · don't assume
2. **MANDATORY VISUAL BASELINE CHECK (G.11 lock 2026-05-28):**
   - Screenshot http://localhost:3040/test/phase-2 instance of the equivalent chart
   - Screenshot http://localhost:3070/ showcase instance
   - DOM-probe computed styles via Playwright `getComputedStyle` · NOT just visual eyeball
   - If delta exists · apply minimal change to close gap · v0.4 IS the standard
   - Code-level alignment is INSUFFICIENT · pixel/computed-style parity required
3. **Identify viz type** · pick the row in § 2.2 · use that exact hover spec
4. **Identify surface scope** · solo · compare · which surface(s) · apply § 1.1 + § 5
5. **Identify input device scope** · mouse · touch · keyboard · all three · apply § 3
6. **Identify viewport scope** · desktop · tablet · mobile · apply § 4
7. **Build using existing primitives** · CellTooltip · TruncatedText · ChartFigure · ChartDataTable · LazyChart · ExportMenu · DataFreshness · don't reinvent
8. **Use existing tokens** · § 1.3 table · don't add new
9. **Verify against § 10** · all 22 checks · before claiming done
10. **v0.4 visual confirmation BEFORE declaring done** · spawn aura-qa for screenshot side-by-side · per Bible § 11.2 rule

When in doubt · stop · ask user · DO NOT improvise color values or hover behavior.

### § 11.2 v0.4 Visual Baseline · CANONICAL (locked G.11 2026-05-28)

**v0.4 (http://localhost:3040/test/phase-2) IS the visual standard for ALL Ken Research charts and tables.**

Confirmed visual decisions from v0.4 (40-screenshot parity audit · 11-chart × 10-aspect DOM probe matrix · 2026-05-28):

| Decision | v0.4 canonical value | Apply to |
|---|---|---|
| Series 1 / Tier 1 fill | `#9488ec` SOLID periwinkle | All Highcharts series · tier maps · default |
| Series 2 / Tier 2 fill | `#c3c6f9` SOLID periwinkle-light | Second slot |
| Tier 3 / Faint fill | `rgba(134,179,229,0.20)` perano @ 20% opacity | Heatmap faint · Treemap tier 3 · Gantt planning |
| "Other" / 6th slot | `#b8c4c0` sage neutral | Slot 6 in series array |
| Bubble fill opacity | `0.55` (NOT 0.5) | KenBubbleChart default |
| ScenarioFan fan area | `#a7c9ed` @ `0.22` fillOpacity | KenScenarioFanChart |
| Gridlines | `#e6e6e6` 1px hairline | All Highcharts |
| Axis label | `rgba(0,0,0,0.6)` 11px DM Sans | All Highcharts axis labels |
| Forecast bars | base color @ `99` alpha (60%) | Projection styling |
| Forecast line | LongDash + base color · 2.5px historical · 2px forecast | Line + ScenarioFan zones |

**Banned (per v0.4 reference):**
- Pre-blended desaturated hex (`#a39ee0` `#c5c3ec` etc · ARCHIVED as misdiagnosis)
- Warm ochre · amber · gold · coral · NEW hues
- Saturation < 50% on default fills (creates washed-out feel · NOT editorial)

**Pre-change discipline (mandatory for ALL chart work):**
1. Open v0.4 in browser · find chart equivalent
2. Open showcase · find chart equivalent
3. Compare side-by-side OR screenshot both
4. Apply minimal change to close ANY gap
5. Spawn aura-qa screenshot verify after change

If v0.4 doesn't have a chart equivalent (e.g. KenGanttTimeline is DS-only) · ScenarioFan/MultiLine for chart family precedent · apply same color discipline.

### § 11.3 Visual baseline pre-task scan trigger

EVERY chart task MUST emit trace marker before code change:
```
→ v0.4 baseline check: <chart-name> · ref-url:<v0.4 URL> · delta:<none|hex-diff>
```

NO chart change ships without this trace. If marker missing in builder output · QA rejects · spawn aura-qa for screenshot audit before merging.

---

## §12 · References

- `design-system/core-v2/docs/FOUNDATIONS.md` · all tokens
- `design-system/core-v2/docs/AI-CONSUMPTION-PROTOCOL.md` · DS-level AI protocol
- `design-system/core-v2/src/charts/theme/tokens.ts` · `KEN_CHART_SERIES_LUMINANCE_SAFE` · `KEN_CHART_BORDERS` · `KEN_INK`
- `design-system/core-v2/src/charts/theme/highcharts-base.ts` · `surfaceOverrides()` pattern
- `design-system/core-v2/src/charts/primitives/CellTooltip.tsx` · canonical disclosure
- `design-system/core-v2/src/styles/base.css` · CSS vars · forced-colors block
- `design-system/core-v2/src/styles/print.css` · print rules
- Memory: `project_sprint_G1_disclosure_2026-05-26.md` · G.1 originals
- Memory: `project_sprint_G2_dark_surface_2026-05-26.md` · tier inversion
- Memory: `project_sprint_G4_G5_a11y_perf_2026-05-27.md` · primitives shipped

---

### 1.13 Paywall content doctrine (canonical · 2026-05-28)

Premium/gated content rendered in charts MUST use defense-in-depth across 3 layers. CSS overlay alone is insufficient — DOM is inspectable.

| Layer | Approach | Required |
|---|---|---|
| **1 · Data redaction** | Replace gated names with "Player N" · jitter values within tolerance (±20% revenue · ±2% growth · ±15% capacity) at render time BEFORE chart receives data | ALWAYS · client-side minimum |
| **2 · Visual obscure** | Gated bubbles/cells: neutral gray fill (`rgba(115,115,115,0.35)`) · dashed stroke or low opacity · CSS blur via GatedBlock gauze overlay | ALWAYS · UI signal |
| **3 · Backend redaction** | Real API sends only free-tier data with real values · gated slots sent as `null` or placeholder | PRODUCTION mandatory |

**Banned:**

- Real gated competitor names in client DOM (DevTools-extractable)
- Real gated metric values in client bundle (JS bundle is readable)
- CSS blur as the ONLY protection (decorative · not enforcement)
- Visible-only overlay on top of fully readable chart data
- `Math.random()` for jitter values (re-render instability · use deterministic index-based offsets)

**Required per chart with gated data:**

- `gated: boolean` flag per data point in raw data interface
- Module-private raw data array (never exported, never passed to components)
- `redactGatedData()` function applied to raw array BEFORE chart prop
- Gated points: `name: 'Player N'` · approximate x/y/z via deterministic JITTER constants · `color: GATED_BUBBLE_COLOR`
- GatedBlock + PremiumLockCard overlay positioned over gated zone
- JSDoc on section component: "PAYWALL · 3-LAYER DEFENSE-IN-DEPTH"
- `// TODO[prod]: backend MUST redact gated data at API boundary` comment

**Reference implementation:**

`projects/v1-project/v1-product-page-ver0.4/src/components/sections/CompetitorLandscapeSection.tsx`
- `BUBBLE_DATA_RAW` (module-private BubblePointRaw[] with `gated` flag)
- `redactGatedData()` (deterministic jitter · JITTER_X/Y/Z arrays)
- `BUBBLE_DATA_REDACTED` (passed to KenBubbleChart)
- `GATED_BUBBLE_COLOR = 'rgba(115, 115, 115, 0.35)'` (gray neutral · never chart series)

**Jitter tolerance (bubble chart canonical):**

| Axis | Tolerance | Rationale |
|---|---|---|
| x (revenue) | ±20% | Hides real revenue band · preserves general position cluster |
| y (growth) | ±2pp | Hides exact CAGR · preserves quadrant placement |
| z (capacity) | ±15% | Hides exact scale · preserves relative size signal |

---

## §13 · Changelog

| Date | Change |
|---|---|
| 2026-05-28 | §1.13 Paywall content doctrine added · defense-in-depth · 3-layer canonical pattern |
| 2026-05-27 | Initial canonical · supersedes ad-hoc rules in G.1-G.6 memories · adds hover doctrine · table skip-shade pattern · compare mode contract · forecast rendering · mobile decision matrix |
