# Polish Sprint 3 · v0.4 PDP · 2026-05-22 (evening)

> **Owner:** Aura · `design@kenresearch.com`
> **Trigger:** User feedback w/ 7 screenshots · post-Sprint-2 issues
> **Constraint:** plan FIRST · per-image diagnosis · then execute · learnings logged

---

## A · Per-image deep diagnosis

### Image 1 · §08 Market Size dataset modal · TABLE WRONG

**Observed:**
- Header row sticks BELOW first data row (header "YEAR/SIZE/YOY/PHASE/SOURCE" appears under 2018 row · 2019 row obscured)
- Pre-COVID + COVID + Recovery + Forecast phase pills using OLD coral/lavender/perano — Recovery still BRIGHT coral
- Forecast pill green tint applied (S5 worked here)
- Table uses bordered hairlines BUT layout broken (header stickiness issue · likely modal table re-uses old chrome not TableShell)

**Root cause:** dataset modal table = custom inline w/ position-sticky header bug · NOT using TableShell. Sprint 2 created TableShell but didn't migrate this table.

**Fix:**
- Migrate dataset modal table → TableShell
- Phase pill renderer needs token unification (Recovery → growth-soft? OR keep neutral · since Forecast already growth-soft · Recovery is between · use coral-soft toned down)
- Decide: Recovery = "warm transition" · use coral-100 bg `rgba(249, 155, 133, 0.18)` + coral-700 text. Pre-COVID = neutral black-50 + ink-muted. COVID = periwinkle-100 + periwinkle-800. Forecast = growth-soft (current)
- Sticky header fix in TableShell (add prop `stickyHeader?: boolean`)

---

### Image 2 · PremiumLockCard minimal variant · STILL TRUNCATED

**Observed:** "Player-level pipeline intel" text fits but "Talk to expert" → CLIPS to "Talk to exp" + arrow cuts. Card overflow visible.

**Root cause:** min-width 280px not enough · OR parent container narrower than 280px (some gated viewports). Truncation = layout broken.

**Fix:**
- Bump minimal variant min-width: 360px (was 280px)
- OR: shorten CTA label to "Talk →" in minimal variant only
- OR: stack vertically (label row 1 · CTA row 2) when w < 360px
- Best: stack vertically on narrow + preserve full label · responsive flex-wrap

---

### Image 3 · §12 EndUser Shelf-Life Matrix · TABLE STYLE WRONG

**Observed:**
- Top hairline + header row · header text 11px uppercase OK
- Each row separated by SUBTLE hairline · 16px row padding
- Rows look CLOSE TO ref but: italic "Tech requirement" col uses 12.5px italic ink-muted · reads WAY softer than other cols · creates visual valley not hierarchy

**Refs canonical (rainbow-pothos · merged-report):** italic col same SIZE as other cols (13-14px) · just italic-styled · maybe ink-muted but NOT smaller. Smaller italic = weaker hierarchy · cells feel orphaned.

**Fix:**
- TableShell italic col: keep 13.5px (same as other cols) · italic font-style · ink-muted color — DON'T downsize to 12.5px
- Row height: consistent 14px padding top + bottom · 48px effective row height
- Add subtle row striping option? NO · refs use hairline-only · no striping

---

### Image 4 · §14 Competitor bubble chart · PAYWALL BLUR WRONG

**Observed:**
- Bubble chart renders correctly · labels visible (NewCold · Swire · Linfox · etc.)
- Bottom-right shows premium overlay pill "PREVIEW ONLY · 6 additional players · full positioning data · Talk to expert"
- BUT pill is in BLUE-BORDERED rectangle (looks like a debug box?) · OR is that the brand-red outline being too light? Hard to tell from screenshot · the box looks DESATURATED · transparent · semi-broken

**Root cause:** PremiumLockCard sitting OVER chart canvas · transparent bg · text/border barely visible on light chart bg. Need solid card chrome.

**Fix:**
- PremiumLockCard inline-overlay variant: solid white bg w/ shadow + border instead of transparent
- Position center-bottom not bottom-right (overlap less critical chart area)
- "Talk to expert" inside card · NOT as outline button next to label · use SECONDARY button (Sprint 2 default) but ensure visible w/ shadow

---

### Image 5 · §08 Market Size chart + phase strip · MOSTLY OK BUT...

**Observed:**
- Historical purple bars solid · forecast bars dashed periwinkle outline · CORRECT (info sync)
- Legend OK
- Phase strip: Pre-COVID gray · COVID periwinkle-tint · Recovery CORAL (orange) · Forecast green-soft
- Coral Recovery pill JARS against periwinkle COVID + green Forecast · color story breaks
- "RECOVERY 2022-2023" uppercase white-on-coral too loud · feels like alert badge not phase marker

**Root cause:** phase strip uses 4 different color systems (neutral · periwinkle · coral · green) · no logical color progression. Should be sequential: muted → mid → emphasized → forecast.

**Fix:**
- Pre-COVID: ink-faint neutral (gray-100 bg · ink-muted text)
- COVID: periwinkle-100 bg · periwinkle-800 text (cool · disruption signal)
- Recovery: coral-100 bg `rgba(249, 155, 133, 0.18)` · coral-700 text `rgba(176, 84, 60, 0.95)` (NOT bright orange · soft warmth · "returning")
- Forecast: growth-soft-bg · growth-soft-text (green-tint · future)
- All pills same size · same weight · same casing · ONLY color differs (sequential narrative)

---

### Image 6 · §17 Opportunities · METRIC NUMBERS HUGE + IN 2 ROWS

**Observed:**
- Lede has brand-red highlights ("7 opportunity areas" · "AUD 1.8 Bn TAM") — TOO MUCH red in single paragraph
- "AUD 1.8 Bn" big-serif WRAPS to 2 lines: "AUD 1.8" + "Bn" — wrap broken
- "15.6 mo" also large + descriptor wraps
- "Opportunity areas identified" — 2-line eyebrow · descriptor "Ranked by impact × feasibility" — too much chrome around small number "7"
- ALL metrics rendered at clamp(24px, 2.8vw, 36px) per MetricStrip · 4-up grid · BUT the longer values ("AUD 1.8 Bn" · "15.6 mo") need MORE width or smaller size
- "8.7" alone tiny but "Pharma cold-chain 3PL · highest composite" descriptor wraps

**Root cause:**
- MetricStrip 4-up grid · each cell ~280px max @ 1240px container · "AUD 1.8 Bn" needs ~320px at 36px serif
- Brand-red on TWO metrics in same strip (TAM + the lede mentions are different · but the strip itself has brand-red on metric 2 via `accent` prop?) — actually `accent={1}` likely · still over-budget per COLOR-USAGE-GUIDE
- No `whiteSpace: nowrap` on value · serif wrapping mid-number breaks tabular feel

**Fix:**
- MetricStrip · add `whiteSpace: 'nowrap'` on value · clamp font-size lower for longer values OR `text-wrap: balance`
- Drop accent brand-red on metric strip (already 2 brand-red highlights in lede · don't pile on)
- Reduce metric size when 4-up: clamp(20px, 2.4vw, 32px) — slightly smaller default so "AUD 1.8 Bn" fits one line
- For OpportunitiesSection specifically: drop redundant "7" stat (it's already in lede prose) · use 3-up grid (TAM · Time · Score) — saves a column · gives each more breathing room

---

### Image 7 · §18 Macro · DUPLICATE DATA STILL VISIBLE + NEW TAB UI DIFFERENT

**Observed:**
- Top row: 4 big serif metrics (GDP 2.8% · CPI 3.4% · DI +2.1% · TB +14Bn) — these are MetricStrip
- "Snapshot 2024 | Trends 2018-2027" tab pill (pill-style switcher · black bg active · gray inactive) — DIFFERENT from canonical Tabs elsewhere in PDP (canonical tabs are underline-style w/ brand-red bottom-border)
- Below tabs: 5 IndicatorCards (GDP · CPI · DI · TB · FX) — SAME 4 indicators as MetricStrip + FX
- USER IS RIGHT: MetricStrip + Snapshot tab IndicatorCards show overlapping data. MetricStrip is essentially the "snapshot" already.

**Root cause:**
1. MetricStrip kept outside tabs (per Sprint 2 plan: "MetricStrip stays always-visible") · BUT Snapshot tab content = same 4 indicators + FX = redundant
2. New §18 tabs use pill-style not underline-style · INCONSISTENT w/ §11 IndustryAnalysis · §07 Ecosystem · §19 Methodology (which use canonical underline tabs)

**Fix:**
1. Remove MetricStrip from §18 entirely · move ALL indicators (GDP · CPI · DI · TB · FX) into "Snapshot 2024" tab as IndicatorCards (5-up grid). No more duplication.
2. §18 + §15 tabs: convert to canonical underline-style (match §11 · §07 · §19) · single tab pattern across entire PDP
3. Apply same canonical tab style everywhere · audit ALL sections using `Tabs` · ensure consistency

---

## B · Forecast green color confidence check

**User asked:** "can we sync correct colors with the graph for the chart of forecast · the green now looks too much different if it is not in the chart agree?"

**Analysis:** YES · user is right. Currently:
- Charts: dashed periwinkle forecast bars (purple family)
- PhaseStrip Forecast pill: green-soft (sage)
- IndicatorCard positive arrow: green-soft

The disconnect: chart says "forecast = periwinkle" · phase pill says "forecast = green" · visual story splits.

**Decision (correction · MUST sync):**
- OPTION A · move all forecast UI chrome to periwinkle/perano (drop green entirely):
  - PhaseStrip Forecast pill: periwinkle-100 bg · periwinkle-800 text
  - IndicatorCard positive arrow: KEEP neutral ink-muted (no color · arrow direction carries semantic)
- OPTION B · move chart forecast bars to green-soft (sync down to chrome decision):
  - Chart forecast: dashed green-soft outline instead of dashed periwinkle
  - NO · breaks data viz palette discipline + COLOR-USAGE-GUIDE §3.2 hard rule

**PICK A** (drop green for forecast · use periwinkle chrome). Keep growth-soft tokens around for OTHER positive signals (YoY arrow · "growth" callout chips) but NOT for forecast specifically. Forecast = periwinkle family (matches chart).

Update tokens:
- KEEP `--color-growth-soft-*` tokens (still useful for positive YoY direction · "growth" chips)
- ADD `--color-forecast-bg: rgba(195, 198, 249, 0.20)` (periwinkle-100-ish) · `--color-forecast-text: rgba(112, 117, 200, 0.95)` (periwinkle-800) · `--color-forecast-border: rgba(195, 198, 249, 0.45)`
- PhaseStrip Forecast pill: use forecast tokens (NOT growth-soft)
- IndicatorCard positive arrow: drop green-soft · use neutral

**Why this is right:**
1. Info sync — chart says forecast is periwinkle · UI chrome echoes
2. Growth/positive in standalone (no forecast context) = still uses green-soft (chips · YoY pills) — DIFFERENT semantic
3. Two semantically distinct things deserve distinct colors: "forecast = future periwinkle" · "positive growth = sage green" · don't conflate

---

## C · Tables · full set redefinition (per user mandate)

User: "create tables correctly this time · using our colors · if you need to redefine and discard old ones discard them · but create the full set to use in future now"

**Full set of table variants required (defined here · canonical):**

### Variant 1 · TableShell (default · data-row table)
- Use: list of comparable rows w/ uniform columns (Shelf-Life Matrix · Players & 3PL · Historical+Forecast · Macro data)
- Chrome: top + bottom header hairline (black-200) · row-bottom hairline (black-100) · 14px header pad · 14px row pad · 11px DM Sans uppercase header ink-strong · 13.5px DM Sans body cells · italic col SAME size as body (13.5px) not smaller · ink-strong first col · ink-body other cols · ink-muted italic col · tabular-nums on numeric cols · row hover black-50 (skip-able)
- Color usage: ZERO chart palette. Only ink + black-100/200 borders.
- Sticky header optional (sticky bg-white-95 backdrop-blur-sm)

### Variant 2 · ComparisonTable (PropertyTable existing)
- Use: row-headers down left col · col-headers as entities being compared (Competitor properties · player matrix)
- Chrome: same as Variant 1 BUT first col is sticky row-header style (medium weight ink-strong · bg-black-50/30 left col)
- Color: gated cols use blurred decoy + PremiumLockCard overlay
- Already exists as PropertyTable · align styling to Variant 1 tokens

### Variant 3 · RankingTable (OpportunityRankingTable existing)
- Use: ranked rows w/ score bars + multi-dim scoring (Opportunities · ranked items)
- Chrome: same border treatment as V1 BUT each row has: rank badge (col 1 · circle bg-black-50 · 11px) · label (col 2 · ink-strong) · score bar (col 3 · periwinkle gradient fill 0-100%) · meta chips (right side)
- Color: score bars use periwinkle-500 fill · NOT brand-red (that was earlier fix · keep)

### Variant 4 · DataMatrix (NEW · 2-axis numeric grid)
- Use: cross-tab numerics (e.g. price by region × year · capacity by operator × segment)
- Chrome: heatmap-light · cells colored by value-tier (periwinkle 100/300/500 ramp · low/mid/high) · row + col headers DM Sans 11px uppercase
- Defer build · no current consumer · doc here for future

### Variant 5 · MicroTable (NEW · ultra-compact 2-3 col)
- Use: inline data alongside narrative (e.g. 3-row summary · within figcaption · ≤200px wide)
- Chrome: no header · row pad 8px · 12px sans body · ink-strong + ink-body cells · NO borders (or single bottom hairline per row)
- Defer build · no current consumer · doc here

**Tables to migrate to canonical V1 (TableShell) immediately:**
1. §08 Market Size dataset modal table (currently broken sticky header)
2. §12 EndUser Shelf-Life Matrix (italic col size fix)
3. §12 EndUser Players & 3PL (already migrated · audit)
4. Any other raw `<table>` discovered

**TableShell prop additions:**
- `stickyHeader?: boolean` (default false · enable for modal-bound tables)
- `phaseColumn?: string` (key of phase column · renders pills using canonical phase pill tokens · auto)
- Italic col size: 13.5px (was 12.5px · per Image 3 fix)

---

## D · Metric strip · full fix

**Issues:** 2-row wrap on long values · brand-red overload · too-big at 4-up

**Fix:**
1. `MetricStrip` value style: add `whiteSpace: 'nowrap'` · `overflow: 'hidden'` · `textOverflow: 'ellipsis'`
2. Reduce default clamp: clamp(20px, 2.4vw, 32px) when columns ≥ 4 · clamp(24px, 2.8vw, 36px) when columns ≤ 3
3. Accent prop: deprecate `accent` (brand-red on metric value) · use neutral · brand-red reserved for ONE callout per section · NOT inside MetricStrip
4. Long value handling: if value text length > 9 chars (e.g. "AUD 1.8 Bn") · auto-shrink one tier · OR wrap unit ("Bn") as sub-span

**OpportunitiesSection specific:**
- Drop "7 opportunity areas identified" metric (already in prose lede)
- Use 3-up grid: TAM · Time-to-monetize · Top weighted score
- Each metric fits one line at clamp(28px, 2.8vw, 38px) — 3-up has more width budget

---

## E · Tabs · full unification

**Decision:** ONE tab pattern across PDP · underline-style (NOT pill-style).

**Canonical (matches §11 · §07 · §19 Methodology):**
- TabsList: horizontal flex · gap-6 · border-bottom hairline black-100
- TabsTrigger: DM Sans 13px · ink-muted · pb-3 · transparent border-bottom
- Active TabsTrigger: ink-strong · border-bottom 2px brand-red
- No bg pills · no rounded · no shadow
- Hover inactive: ink-body

**Fix:**
- §15 Regulatory tabs · convert pill → underline (Sprint 2 used Radix Tabs · ensure styling is underline not pill)
- §18 Macro tabs · same fix
- Audit any other section using pill-style · convert

---

## F · Plan of execution

### Order
1. **Forecast color sync (B)** · update tokens · re-apply Phase pill + IndicatorCard arrow
2. **MetricStrip fix (D)** · whitespace · size auto-shrink · drop accent
3. **OpportunitiesSection metric strip 4→3 col**
4. **TableShell additions (C)** · stickyHeader · italic 13.5px · phaseColumn renderer
5. **§08 Market Size dataset modal → migrate to TableShell**
6. **§12 Shelf-Life italic col size fix**
7. **§08 Phase Strip color sequence fix (per Image 5)**
8. **PremiumLockCard minimal variant min-width 360 + responsive stack**
9. **PremiumLockCard inline-overlay solid bg (per Image 4)**
10. **§18 Macro · drop MetricStrip · 5 IndicatorCards in Snapshot tab**
11. **§15 + §18 tabs · underline canonical style sweep**
12. **QA**

### Acceptance
- Image 1: dataset modal table uses TableShell · sticky header works · phase pills sequential color
- Image 2: minimal lock CTA fits w/o truncation in viewport ≥320px
- Image 3: Shelf-Life italic col same size as body cols (13.5px)
- Image 4: bubble chart paywall overlay has solid white card · visible on light chart
- Image 5: PhaseStrip neutral→periwinkle→coral-soft→periwinkle-forecast sequential
- Image 6: Opportunities metrics one-line · 3-up grid · no brand-red in strip
- Image 7: §18 single IndicatorCard row · no MetricStrip · underline tabs

---

## G · Discipline rules

1. Forecast UI = periwinkle (sync w/ charts) · NOT green
2. Growth-soft = positive direction signals only · separate semantic from forecast
3. ALL tables go through TableShell (or one of the 5 defined variants)
4. Brand-red CTA budget: 1 per viewport · NEVER inside MetricStrip
5. Single tab pattern (underline) across entire PDP

---

## H · Learnings (post-ship)

1. Info sync between chart data palette + UI chrome of same semantic concept (forecast)
2. Italic in tables = font-style only · NOT size reduction (size shift = hierarchy break)
3. MetricStrip 4-up needs nowrap + auto-shrink · long values break the rhythm
4. Single tab style across product · don't reinvent per-section
5. Paywall overlays on chart canvases need solid chrome · transparent doesn't read
