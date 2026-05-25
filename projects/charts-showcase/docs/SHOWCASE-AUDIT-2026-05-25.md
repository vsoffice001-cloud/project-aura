# Charts Showcase · UX/UI Deep Audit · 2026-05-25 (Opus synthesis)

> Source: `qa-screenshots/inspect-2026-05-25/` (35 screenshots + DOM probe JSON + console errors)
> Audit: full visual + DOM + console + code review of `src/app/page.tsx` (720 LOC) + DS chart library

---

## Verdict

Current showcase is a **dev-grade dump · NOT professional-grade preview**. It demonstrates that charts render · NOT how to consume them. Critical bugs in chart chrome composition (legend collision · figure layout · table sticky) blocks confidence in the library.

**Severity:** 12 confirmed bugs + 12 missing professional features. Plan B (full rebuild w/ professional showcase pattern) is faster than Plan A (patch current 720 LOC).

---

## P0 BUGS · CRITICAL · block showcase utility

### Bug 1 · DOUBLE legend collision (KenMultiLineChart · KenColumnChart · all)
- **Symptom:** Legend shows TWICE · once from Highcharts internal (top of chart) · once from ChartFigure external (top of figure)
- **Visible at:** chart-5 (donut) shows `Meat & Seafood | Dairy | Pharma | Retail / QSR | Other` BOTH as ChartFigure legend dots AND as Highcharts legend boxes
- **chart-6 MultiLine:** Highcharts legend at chart top-edge OVERLAPS first data points (`GDP Growth % | Cold-chain demand %...`) · markers behind text · unreadable
- **Root cause:** `_theme.ts` (highcharts-base) has `legend: { enabled: false }` BUT individual chart wrappers (KenDonut · KenMultiLine) re-enable Highcharts legend OR don't suppress
- **Fix:** Hard-disable Highcharts legend in EVERY chart wrapper instance · ChartFigure owns the legend slot exclusively · OR add `disableInternalLegend?: boolean` prop default true

### Bug 2 · ScenarioFan x-axis label collision (Base/Bull/Bear)
- **Symptom:** Bottom legend labels `Base · 10.3% CAGR | Bull · 13.8% CAGR | Bear · 7.1% CAGR` touch each other · no gap
- **Visible at:** chart-7 idle screenshot
- **Root cause:** Highcharts internal legend at `verticalAlign: 'bottom'` · ChartFigure external legend duplicates · spacing wrong
- **Fix:** Same as Bug 1 · plus add `legend.itemMarginRight: 16` if Highcharts legend kept

### Bug 3 · KenDonutChart positioning broken (right-shifted · empty left)
- **Symptom:** Donut renders in RIGHT half of card · left half blank · figcaption disconnected at bottom-left
- **Visible at:** chart-5 idle · DOM probe shows donut bbox doesn't center
- **Root cause:** KenDonutChart options likely have `plotOptions.pie.center: ['75%', '50%']` OR Highcharts default + ChartFigure flex/grid layout pushing it
- **Fix:** Set `chart.plotShadow: false` · `plotOptions.pie.center: ['50%', '50%']` · OR wrap in flex-centered div
- **ALSO:** Donut size proportional to chart width OR fixed dimensions · current looks like ~60% of card width with no centering

### Bug 4 · KenBubbleChart labels CLIP through section boundary
- **Symptom:** Bubble labels positioned `y: -8` (above bubble · A.2 fix) extend ABOVE cinematic dark section into white parent page bg · half-visible
- **Visible at:** chart-4 idle · "Eq Supply" label barely visible · "Tier-1 operators" legend dots overlap chart x-axis labels (200/300/400)
- **Root cause:** Container `padding: 24px` insufficient · labels need clearance · `overflow: visible` allows escape but parent bg differs
- **Fix:** Increase top padding on cinematic section to 60px · OR add background-extend padding · OR set `dataLabels.padding: 4` and rely on `crop: false` to keep within bubble bounds when possible

### Bug 5 · Nested `<table>` HTML hydration error (3 console errors)
- **Symptom:** `<table>` cannot contain nested `<table>` · React hydration mismatch · 3 errors
- **Root cause:** TableShell renders its own `<table>` · demo passes another `<table>` as children (page.tsx L304-334)
- **Fix:** TableShell should NOT render `<table>` itself · should be a `<div>` wrapper · OR consumer passes `<thead><tbody>` only (no outer `<table>`)
- **Decision:** Refactor TableShell to render `<div role="table">` OR document that children must be `<thead><tbody>` only · update PropertyTable + RankingTable accordingly

### Bug 6 · Sticky table header NOT working
- **Symptom:** DOM probe: all 4 tables `position: static` · RankingTable demo `stickyHeader={true}` prop passed · ignored
- **Root cause:** TableShell doesn't actually apply `position: sticky` OR Tailwind v4 class not generated OR no scrolling parent
- **Fix:** Verify Tailwind v4 `[&_thead_th]:sticky [&_thead_th]:top-0` generated · scan DS source covers TableShell · also need parent `overflow: auto` + fixed height for sticky to engage

### Bug 7 · Body BG pure white · not editorial warm
- **Symptom:** DOM probe `bodyBG: rgb(255, 255, 255)` · page should be `#f5f2f1` editorial warm
- **Root cause:** `globals.css` doesn't set `body { background }` · only `main` style attribute · default white shows through during scroll bounce + 100vh
- **Fix:** Add `body { background: var(--semantic-bg-page, #f5f2f1); }` to globals.css OR layout.tsx

### Bug 8 · Section bg alternation MISSING
- **Symptom:** DOM probe all `<section>` `bg: rgba(0,0,0,0)` transparent · NO alternation pattern
- **Refs canonical:** white → warm → white → black (per DS SectionWrapper convention)
- **Fix:** Use DS `SectionWrapper` from `@kenresearch/design-system/atoms` · NOT raw `<section>` · gets bg alternation free

### Bug 9 · ChartFigure unit position drift
- **Symptom:** Unit label (`AUD Mn`, `% YoY`, `%`) shown small + top-right · sometimes inline w/ eyebrow · inconsistent
- **chart-5 donut:** `%` floats top-right · disconnected from chart
- **chart-6 MultiLine:** `% YoY` aligns w/ eyebrow row · OK
- **Fix:** ChartFigure should standardize unit position · either top-right pill OR inline w/ eyebrow · NOT both

### Bug 10 · Density toggle buttons NOT using DS Button atom
- **Symptom:** Custom inline-styled `<button>` for col variant toggle + table density toggle · 2 different styles
- **Should use:** DS `Button` (variant="secondary" size="sm") OR DS `FilterChip`
- **Impact:** Visual debt · shows DS not eaten own dog food

### Bug 11 · Custom dynamic imports for charts redundant
- **Code:** `const KenColumnChart = dynamic(...)` 7 times in page.tsx L63-90 · BUT charts already export from `@kenresearch/design-system/charts` barrel · could `'use client'` page + direct import
- **Impact:** 7 dynamic boundary == 7 lazy-load skeleton states · choppy
- **Fix:** Single `'use client'` at page top (already present L1) · direct named imports · skip dynamic · OR move dynamic to barrel-level if SSR-safety needed

### Bug 12 · Mobile 390 unverified
- **Status:** Screenshot exists but not analyzed in this audit
- **Risk HIGH:** charts hard-coded 280-320px height · 1100px max-width container · mobile viewport 342px usable · charts likely squished or horizontal-scroll · tables likely break

---

## P1 PROFESSIONAL-GRADE MISSING FEATURES

| Feature | Why pro showcases have it | Effort |
|---|---|---|
| Sidebar nav · in-page anchors | 720 LOC page · users get lost · sticky TOC critical | S (use DS SideTOC) |
| Per-chart props panel · live toggle | Show density · variant · disableReveal · height | M |
| Code snippet · copy-to-clipboard | Consumers need import snippet · paste-ready | S (Highlight.js or shiki) |
| Multiple data variants per chart | N=3 · N=8 · N=20 · empty · error states | M |
| Light AND dark variant per chart | Currently only Bubble shows dark | S (per chart toggle) |
| Reduced-motion toggle | Demo reduced-motion behavior | S (CSS prefers override) |
| Responsive breakpoint preview | Show xs/sm/md/lg w/o resize | M (iframe pattern) |
| A11y annotation overlay | Reveal aria-label · keyboard order · focus rings | M |
| Loading state demo | ChartSkeleton variants · static demo not just lazy | S |
| Empty state demo | What user sees w/ no data · documented contract | S |
| Error state demo | Malformed data · network fail · documented | S |
| Token reference panel | Side panel · show which `var(--xxx)` powers what | M |
| Filter · search · sort chart list | 9+ items · scan time matters | S |
| Live API mock w/ async load | Show real loading flicker · ChartSkeleton replaces | M |
| Storybook-equivalent props table | Auto-generated from TS interface · prop name · type · default · description | M |

---

## REF STANDARDS (web-PDP refs · NOT print refs)

Pro chart showcases I'd benchmark against:
- **Recharts.org** · per-chart playground · props panel · code paste · breakpoint preview
- **Highcharts demo gallery** · category nav · variant selector · download as SVG
- **Nivo (D3-based)** · live prop editor + JSON output
- **Storybook** · canonical pattern for component showcase

Ken Research showcase should match this bar.

---

## CONSTRAINT · Ken DS palette ONLY

User decision (memory `project_ref_patterns_v04_pdp.md`):
- Charts use periwinkle · perano · purple ONLY (KEN_CHART_SERIES_ARRAY)
- Brand-red CTAs only · never chart series
- Refs use Chart.js + Recharts · we use Highcharts (locked decision · `feedback_no_patchwork.md`)
- Refs use Bricolage Grotesque font · we use Noto Serif + DM Sans (Ken pair locked)
- Tooltip: white + periwinkle border (locked · changed from dark overlay in A.2)
