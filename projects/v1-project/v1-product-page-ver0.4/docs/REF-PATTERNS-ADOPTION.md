# Reference Patterns · Adoption Plan

**Sources analyzed (CONFIDENTIAL · internal-only):**
- `rainbow-pothos-3943b2.netlify.app` — Delhi NCR Supply Side View (GMR Aero Realty, FY25)
- `merged-report.vercel.app` — Delhi NCR market intelligence (GMR Aero Realty, May 2026)

Both are Ken Research's own premium B2B research deliverables for clients. Both achieve premium feel through **restraint**, not ornamentation. This is the closest in-house benchmark for what v0.4 PDP should converge toward.

**⚠ PRIVACY:** Reference URLs are CONFIDENTIAL · NEVER leak into public surfaces · NEVER include in code committed to public repos · treat as design-team-only learning material. Patterns extracted are reusable · sources stay internal.

**Last updated:** 2026-05-21
**Owner (design):** Aura · `design@kenresearch.com`

---

## STAKEHOLDER DECISIONS LOCKED (2026-05-21)

### Color · use Ken DS w/ hue/saturation discipline
- **Brand-red ONLY for justified moments** · CTAs · paywall unlock · accent CAGR · brand-red dot bullets
- **Data viz** = periwinkle · perano · purple ONLY (Ken DS data-viz palette)
- **Coral · red** = minor utility (status pills · warning) ONLY where justified
- **Grayscale neutrals** carry hierarchy
- Max 3-4 distinct colors per section · "too-many-color-variables" feel = childish · reject
- Full rules: `docs/COLOR-USAGE-GUIDE.md`

### Fonts · keep Noto Serif + DM Sans · adopt refs' usage logic
- Noto Serif at 32px+ ONLY (large display · anchor moments)
- DM Sans at all small sizes (10-20px)
- NO serif under 16px ever
- Italic reserved: source citations · quoted voice · thematic descriptors · figcaptions
- Tabular-nums mandatory on every numeric value
- Full rules: `docs/FONT-PAIRING-GUIDE.md`

### Charts / tables / visualization
- Bare chart frames · no card · no shadow
- Table: horizontal rules only · 40-48px row height · numeric right-align · tabular-nums
- Stat callouts: BORDERLESS · 32-48px serif number + 12px italic descriptor
- Premium data hiding: SOME charts public · SOME premium-blurred · NEVER leak in DOM
- Full rules: `docs/CHARTS-TABLES-PATTERNS.md`

### Confidence intervals (CI)
- Refs flag 50% CI · adopt **only where useful** (forecast spans 3+ years OR scenario-based)
- Skip for backward-looking historical · skip for current-state snapshots

---

## 1 · What both refs share (canonical patterns)

These are the patterns that appear in BOTH refs · highest-confidence adoption targets.

### 1.1 Typography discipline
- **Single sans-serif** family (system stack) · NO serif display, NO mono
- **3-4 weight system**: Light (300), Regular (400), Semibold (600), Bold (700)
- **Strict size scale**: 12, 14, 16, 18, 20, 24, 32, 40, 48, 56, 64px (multiples of 4 or 8)
- **Hierarchy via scale alone** — color does NOT carry hierarchy
- **Italic reserved** for: source citations, quoted user voice, thematic labels (e.g. "_The legacy luxury core_")
- **Letter-spacing**: uppercase labels tracked +0.08-0.1em · display tight (0 or -0.01em) · body neutral
- **Tabular-nums everywhere**: stat callouts, all numeric columns, percentages, currency

### 1.2 Color discipline
- **Pure white** background (no warm tint, no off-white)
- **Grayscale neutrals only**: #000, #1a1a1a, #333, #666, #999, #ccc, #ddd, #eee, #fff
- **NO brand accent color** running through body
- **3-tone categorical** for data state (High/Med/Low · teal/amber/gray or green/yellow/red)
- **Black bold** carries emphasis · never colored text for emphasis
- **Source citations** in lighter weight (300) or muted gray

### 1.3 Tables
- **Horizontal lines only** — no vertical grid, no full grid
- **Header**: semibold, light gray bg (#f5f5f5 OR plain white w/ underline)
- **No alternating rows** — clean white throughout
- **Numeric right-aligned · text left-aligned · categorical center**
- **Cell padding**: 12-16px horizontal · 10-14px vertical
- **Row height**: 40-48px (comfortable, NOT compact)
- **Tabular figures** mandatory in numeric columns
- **Total/summary row**: bold weight + ruled top border (no shaded bg)

### 1.4 Stat callouts (METRIC BLOCKS)
- **Borderless · NO background · NO chrome**
- **48-64px bold number** + **14-16px regular label**
- **Optional 12px italic descriptor** below label
- **Whitespace separation only** (no card bg, no shadow)
- **Stacked vertical** OR grouped 2-up · 3-up · 4-up
- **Left-aligned within container**, container grid-aligned

### 1.5 Data storytelling rhythm
Repeating arc across both reports:

```
1. Thesis / finding statement (bold prose · 1-2 lines)
2. Metric strip (3-5 callouts · stat block pattern · NO chart)
3. Prose explanation (2-4 paragraphs · embedded bold stats inline)
4. Data table or visualization
5. Insight box (typographic emphasis · narrative interpretation)
6. Cycle repeats for next zone/section
```

- **Prose-to-data ratio: 60% narrative · 40% data**
- **Inline bold stats** liberal (`**14,364 hotel rooms**`)
- **Source citations parenthetical**, italic, smaller type
- **Chart/table follows prose**, not leads · "deductive: data confirms what prose claims"

### 1.6 Section structure
- **Eyebrow chapter label** (uppercase, tracked, 12-14px)
- **H2 section title** (semibold, 32-40px)
- **H3 subsection focus** (semibold, 20-24px)
- **Body prose** + inline bold + tables
- **Visual break**: `* * *` em-dashes OR ample whitespace (60-80px between sections)

### 1.7 Restraint principles
- **NO drop shadows** anywhere
- **NO gradient backgrounds**
- **NO decorative borders** (only hairline functional)
- **NO emoji, NO icons in headings**
- **NO color-coded prose** (no green for positive, red for negative · all black)
- **NO animation/motion** unless functional (scroll-spy active state · accordion expand)
- **Whitespace as primary design tool**

### 1.8 Layout
- **Single-column** narrative max 960-1000px (rainbow-pothos) or 900-960px (merged-report)
- **Full-width tables/charts** within container
- **Side padding** 20-40px mobile · 60-80px desktop
- **Sticky elements minimal**: TOC at top, scroll-spy maybe · NO sticky header

---

## 2 · What rainbow-pothos has that merged-report doesn't

rainbow-pothos goes deeper on **data visualization**:
- **Bubble chart** (ADR vs Occupancy · bubble size = room count · 6 zones labeled)
- **Heatmap** (4 asset classes × 6 micro-markets · star ratings + 3-tier color)
- **Gantt/Pipeline timeline** (FY25-FY32 cells · confirmed/delayed/indicative color coding)
- **Opportunity matrix** (24 cells of prose + numeric rating 1.00-6.00)
- **Star rating** as visual encoding (★★★ · ★★ · ★)
- **Confidence intervals** stated ("50% confidence interval")
- **Anchored TOC** with linked jump navigation

---

## 3 · What merged-report has that rainbow-pothos doesn't

merged-report goes deeper on **narrative + synthesis**:
- **Three-Source Convergence** pattern (numbered 01/02/03 callouts · "independent signals pointing same direction")
- **Zone Identity Insight box** (typographic emphasis · quoted user voice + zone tags)
- **Opportunity ranking table** (rank · zone · opportunity signal · gap type · GMR fit)
- **What this means for GMR** closing line per section
- **Quoted user voice** inline (italic + Reddit-source citation)
- **"Top Praises / Top Complaints"** binary section split
- **White Space** opportunity labeling

---

## 4 · Current v0.4 §08 score vs refs

| Pattern | Refs | v0.4 §08 current | Gap |
|---|---|---|---|
| Sans-serif only | yes | mixed (Noto Serif display + DM Sans body) | **Diverge** intentionally — Ken serif brand is established · don't drop |
| 3-4 weight system | yes (700/600/400/300) | yes (light 300 + body 400 + medium 500 + serif light 300) | OK |
| Strict size scale | yes (12/14/16…) | yes (10/11/12/13/14/16/clamp) | OK |
| Pure white bg | yes | yes | OK |
| Grayscale neutrals + 1 brand accent | refs use neutrals only | brand-red sparingly (CTAs · CAGR accent · annotation borders) | **Modest divergence** — keep · brand red is Ken's IP |
| Tabular-nums | yes (mandatory) | yes (applied) | OK |
| Stat callout · borderless · no chrome | yes | NO · MilestoneRow uses card border + light shadow on 2022 center | **Adopt: kill card chrome on milestone · go borderless · scale alone** |
| Stat number 48-64px | yes | NO · clamp(18-30px) after revert | **Adopt: bump back up to 32-48px range · drop card chrome to compensate** |
| Stat label 14-16px | yes | YES (11-12px now) | **Adjust: bump labels to 12-13px** |
| Italic descriptor line | yes | NO | **Adopt: add italic descriptor under each stat** |
| Inline bold stats in prose | yes (liberal) | YES (in lede) | OK · extend further |
| Source citations italic + parenthetical | yes | NO · sources are tier-pilled in SourceCluster | **Diverge** — provenance system is canonical · refs are simpler |
| Tables · horizontal lines only | yes | YES (modal) | OK |
| Header bg light gray OR plain w/ underline | mixed | plain white w/ underline | OK |
| No alternating rows | yes | YES | OK |
| Right-align numeric · left-align text | yes | YES | OK |
| Row height 40-48px | yes | NO · 30-34px | **Adopt: bump cell padding · row 40-48px** |
| Section padding 60-80px top/bottom | yes | inconsistent · 32-64px | **Adopt: standardize 64-80px between sections** |
| Sticky TOC | yes | YES (SideTOCV04) | OK |
| Chart frame: bare · no card | yes (bare) | YES (ColumnChart bare) | OK |
| Chart annotation strategy | rainbow uses prose ABOVE/BELOW · not on chart | annotation cards BELOW chart | OK |
| Stat-strip rhythm: 3-5 callouts at section top | yes | NO · 3-card border strip mid | **Adopt: opening metric strip pattern · "stat at top sets the claim"** |
| Insight box · typographic only | yes | partially · AnnotationCards do this | OK · extend pattern |
| "What this means for X" closer | yes | NO | **Adopt: section-end insight callout w/ implication line** |

**Net: §08 is ~70% aligned. Top 4 deltas: stat-callout chrome · stat-number scale · row-height comfort · "what this means" closer.**

---

## 5 · Per-section adoption · v0.4 sections 01-24

### §01 Executive Summary
- **Adopt**: opening 3-5 metric strip (borderless stat callouts) · thesis statement bold prose
- **Adopt**: "What this means" closing line
- **Skip**: heatmap (no comparative density needed at this section)

### §02 Scope & Coverage
- **Adopt**: italic thematic descriptor under each chip group ("_What we sized · what we didn't_")
- **Adopt**: borderless stat callouts (X countries · Y years · Z deliverables)

### §03 Country & Infrastructure
- **Adopt**: 4-up borderless stat callout grid at top (population · GDP · trade flow · cold chain market AUD)
- **Adopt**: italic descriptor line under each
- **Skip**: bubble chart (positioning chart not relevant for macro stats)

### §04 Market Overview / Genesis
- **Adopt**: section opens w/ thesis statement bold paragraph
- **Adopt**: timeline-style prose for Genesis tab (rainbow-pothos pipeline pattern adapted)
- **Skip**: Gantt chart (textual timeline cleaner here)

### §05 Definitions
- **Adopt**: italic thematic groups ("_Captive vs non-captive · who owns the infrastructure_")
- **Already follows**: tabular term-by-term layout matches rainbow opportunity matrix

### §06 Taxonomy
- **Adopt**: tighter eyebrow + H2 + 1-line description (matches both refs)
- **Skip**: MindMap is appropriate · don't downgrade to a static tree

### §07 Ecosystem
- **Adopt**: borderless stat callouts in Cold Chain Overview tab (TOTAL PLAYERS · TOP 4 SHARE · LONG TAIL · NEW ENTRANTS) — currently cards
- **Adopt**: italic descriptor under each stat
- **Adopt**: per-player table follows rainbow property-table pattern · row height 44-48px · horizontal rules only
- **Adopt**: "Zone Identity Insight" equivalent — short narrative box per tier explaining "what this means strategically"
- **NEW visualization**: opportunity-style 3-tier heatmap (player capabilities × market segments) — uses rainbow pattern · stars + 3-tier color
- **NEW visualization**: bubble chart (player pallet count vs share %) — adapt rainbow ADR-vs-Occupancy bubble

### §08 Market Size & Growth (current)
- **Adopt**: drop card chrome on MilestoneRow · go borderless · bump scale to 32-48px · add italic descriptor
- **Adopt**: 60-80px section padding standardized
- **Adopt**: row 40-48px height in dataset modal
- **NEW**: opening 3-stat callout pattern BEFORE MilestoneRow (Historical CAGR · Forecast CAGR · 2027F size · in stat-callout style)
- **NEW**: "What this means for cold-chain operators" closing insight box (1 paragraph · italic emphasis)
- **Keep**: combo chart pattern · PhaseStrip · gated annotation · SourceCluster collapse · DatasetModal sticky thead

### §09 Submarkets (TBD)
- **Adopt**: Cold Storage + Cold Transport tabs · each follows pattern:
  - thesis line (bold prose)
  - 4-up borderless stat callouts (revenue · pallets · price · occupancy)
  - per-segment chart (ColumnChart for revenue trajectory)
  - property-style table (top 10 operators · rainbow pattern · 44-48px rows)
  - "What this means" closing insight
- **NEW visualization**: dual-axis chart (revenue + growth rate) · use MultiAxisLineChart from @ken-research/charts

### §10 Segment Intelligence
- **Adopt**: rainbow opportunity matrix pattern adapted to "segment × end-user grid" (5×8 cells · star ratings · 3-tier color)
- **Adopt**: per-cell prose + numeric score (rainbow rating 1.00-6.00 style)
- **Adopt**: heatmap legend below

### §11 Industry Analysis
- **Adopt**: 6-up borderless stat strip (top 6 industries · pallet share each)
- **Adopt**: stacked bar chart (industry composition over time)
- **Adopt**: closing "Which industry should you bet on" implication line per industry

### §12 End-User Deep Dives
- **Adopt**: zone-identity-insight pattern adapted to "end-user-identity-insight"
- **Adopt**: quoted operator voice (italic + Ken Primary citation · matches rainbow Reddit-quote pattern)
- **Adopt**: "Top Praises / Top Complaints" binary split (rainbow pattern · adapted to "Top Drivers / Top Constraints")

### §13 Demand-Supply Gap
- **NEW visualization**: capacity gap heatmap (segment × year · rainbow heatmap pattern)
- **Adopt**: opportunity ranking table (rank · segment · gap type · operator fit)
- **Adopt**: 50% confidence interval flag (rainbow's exact language)

### §14 Competitor Landscape
- **NEW visualization**: bubble chart (revenue × growth × bubble-size capacity) — rainbow ADR-Occupancy pattern adapted
- **Adopt**: full property-table for top 13 players (rainbow Aerocity table pattern · 44-48px rows · brand · tier · status · rooms · ADR · occupancy → adapted to operator · tier · status · pallets · price · occupancy)
- **Adopt**: 4-tier opportunity ranking (rainbow Aerocity/Central/Dwarka/etc. → Lineage/Americold/NewCold/long-tail)

### §15 Regulatory
- **Adopt**: timeline pattern (rainbow Gantt) for regulatory milestones FY18-FY27
- **Adopt**: italic descriptor under each regulatory body

### §16 Future Outlook
- **NEW visualization**: scenario fan chart (base/bull/bear forecast bands)
- **Adopt**: rainbow's "forward-looking projections · 50% confidence interval · forecast methodology" exact framing language
- **Adopt**: 3 numbered convergence findings ("Three independent signals · all pointing to the same outcome" — merged-report pattern)

### §17 Opportunities
- **Adopt**: merged-report's 4-priority synthesis pattern verbatim ("four prioritised investments")
- **Adopt**: per-opportunity star-rating + rationale + analyst recommendation

### §18 Macroeconomic Indicators
- **Adopt**: multi-axis line chart (4 macro indicators · price · inflation · GDP · trade)
- **Adopt**: 4-up borderless stat strip at top

### §19 Methodology
- **Adopt**: rainbow's rating mechanism prose pattern verbatim
- **Adopt**: numbered methodology weights (scoring formula + parameter table)
- **Adopt**: confidence interval disclaimer at end

### §20 Table of Contents
- **Adopt**: rainbow's linked TOC pattern (already implemented via SideTOC)

### §21 FAQs
- **Adopt**: AnswerBlock atom (already shipped)
- **Adopt**: italic Q · bold A pattern

### §22 Sample Preview
- **Adopt**: rainbow's confidential disclaimer language at footer of preview
- **Adopt**: 3-page sample · property-table style

### §23 Related Reports
- **Adopt**: 4-up borderless stat callouts (revenue · pages · base year · CAGR) per related report
- **Skip**: chart (cards-with-image more appropriate · matches existing ReportCard)

### §24 CTA Banner
- **Adopt**: merged-report's "What this means · contact us" closing prose pattern · stat-strip above CTAs

---

## 6 · NEW DS atoms / molecules needed (to land patterns above)

| Component | Tier | Pattern from refs |
|---|---|---|
| `<MetricStrip>` — 3-5 borderless stat callouts in row, large number + label + italic descriptor | **atom** | both refs (opening metric strip) |
| `<InsightBox>` — typographic emphasis · italic thesis · brand-red left border · "what this means" closer | **atom** | merged-report (Zone Identity Insight) |
| `<OpportunityHeatmap>` — N × M grid · star rating cells · 3-tier color · hover tooltip | **molecule** | rainbow-pothos (Opportunity Priority Heatmap) |
| `<RatingStars>` — ★★★ / ★★ / ★ · 3-tier color · 1-6 numeric score appended | **atom** | rainbow-pothos |
| `<PropertyTable>` — full-width data table · 44-48px rows · horizontal rules · sortable optional | **molecule** | both refs |
| `<PipelineTimeline>` — Gantt-style grid · year columns · phase color · cumulative narrative below | **molecule** | rainbow-pothos (FY25-FY32 pipeline) |
| `<QuotedVoice>` — italic block quote · attribution line · brand-red top border | **atom** | merged-report (Reddit-style quoted user voice) |
| `<ConvergenceCallout>` — numbered 01/02/03 findings · convergence language ("three independent signals") | **molecule** | merged-report |
| `<ScenarioFanChart>` — bull/base/bear forecast bands · custom chart (Ken Charts gap) | **deferred** | inspired by ref language ("50% confidence interval") |
| `<OpportunityRankingTable>` — rank · subject · opportunity · gap · fit columns | **molecule** | both refs |

**Strategy**: build each as `project-local` first in `src/components/atoms/` or `src/components/molecules/`. Promote to DS `core-v2` at 2nd consumer per anti-bloat 2-consumer rule.

---

## 7 · Restraint principles to ENFORCE going forward

These are non-negotiables · refs deviate from any of them = the design loses premium feel:

1. **No drop shadows** (kill remaining shadow on 2022 milestone center card · review SourceCluster shadow)
2. **No card chrome on stat callouts** (kill remaining MilestoneRow border + bg)
3. **No alternating row backgrounds in tables**
4. **No vertical grid lines in tables**
5. **Tabular-nums on every numeric value** (audit all sections)
6. **Italic only for: source citations · quoted voice · thematic labels** (audit current italic usage)
7. **No brand-red for prose emphasis** (only CTAs · accent borders · accent CAGR · tier dots)
8. **No emoji in headings or callouts** (already disciplined · keep)
9. **Section padding 64-80px top/bottom** (currently inconsistent · standardize)
10. **Whitespace > borders** (when in doubt, remove the border)

---

## 8 · Implementation order (recommended)

**Phase A · Polish §08 to ref-alignment (4-6 hr)**
1. Refactor MilestoneRow → borderless stat callouts (32-48px · italic descriptor · whitespace only)
2. Bump dataset modal row height to 40-48px
3. Add "What this means for cold-chain operators" InsightBox at section end
4. Standardize section padding 64-80px
5. Build `<MetricStrip>` atom · replace MilestoneRow chrome
6. Build `<InsightBox>` atom · close §08 with it

**Phase B · §07 Ecosystem ref-alignment (4-6 hr)**
1. Refactor TOTAL/SHARE/LONG TAIL stat strip → MetricStrip atom
2. Build `<PropertyTable>` molecule · use for player listings
3. Build `<OpportunityHeatmap>` molecule · NEW visualization for Cold Storage tab
4. Add `<RatingStars>` atom · used by heatmap cells

**Phase C · §09 Submarkets (~6 hr · 2 tabs · canonical pattern)**
- Apply MetricStrip + PropertyTable + ChartCard + InsightBox composition
- Sets template for §10-§18

**Phase D · §10-§24 (1-2 hr per section once templates built)**

---

## 9 · Stakeholder decisions resolved (2026-05-21)

1. **Brand-red discipline** — RESOLVED. Use Ken DS colors. Brand-red only for justified moments (CTAs · accent CAGR · brand-red dot bullets). Charts use periwinkle · perano · purple ONLY. Coral · red minor utility only. Full rules in `COLOR-USAGE-GUIDE.md`.

2. **Serif display** — RESOLVED. Keep Noto Serif (large display 32px+) + DM Sans (all small sizes). Adopt refs' usage logic (sans for small/dense · italic for sources/quotes/thematic descriptors). Full rules in `FONT-PAIRING-GUIDE.md`.

3. **Quoted voice** — DEFERRED. May be useful in some cases · not all the time · evaluate per section · NDAs need confirmation before publish.

4. **Confidence intervals** — RESOLVED. Adopt only where useful (forecast spans 3+ years OR scenario-based). Skip for historical · skip for current-state.

5. **Star rating scale** — DEFERRED. Use only where ranking is the story (§13 · §17). Skip where heatmap color tier alone is enough.

6. **Privacy** — RESOLVED. Reference URLs are CONFIDENTIAL · NEVER leak. Treat as design-team-only learning. Patterns reusable · sources stay internal.

7. **Premium data hiding** — RESOLVED. Some charts public · some premium-blurred · server-side redaction MANDATORY (CSS blur is decoy only). Full rules in `CHARTS-TABLES-PATTERNS.md` §5.

---

## Related

- `docs/SOURCE-PROVENANCE.md` — citation contract
- `docs/V04-MASTER-PLAN-2026-05-20.md` — full section spec
- `src/components/atoms/SourceCluster.tsx` — sources pattern
- `src/components/atoms/PremiumLockCard.tsx` + `GatedBlock.tsx` — paywall pattern
