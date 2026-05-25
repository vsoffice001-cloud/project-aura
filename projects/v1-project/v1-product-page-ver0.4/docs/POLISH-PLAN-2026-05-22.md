# Polish Sprint Plan · v0.4 PDP · 2026-05-22

> **Owner:** Aura · `design@kenresearch.com`
> **Trigger:** User mandate 2026-05-22 — "polish sections UI" w/ 4 concrete asks:
> 1. Methodology section content → divide into tabs
> 2. Chart colors → verify use defined palette
> 3. Tables → use refs-style tables (currently many lack borders/aesthetic)
> 4. Font colors → verify 5-tier ink hierarchy correctly applied
>
> **Constraint:** Document plan first · no deviation · execute per documented reasons + learnings.
>
> **Authority docs (binding):** `COLOR-USAGE-GUIDE.md` · `FONT-PAIRING-GUIDE.md` · `CHARTS-TABLES-PATTERNS.md` · `TABS-SWITCHERS-INFO-COMPOSITION.md` · `REF-PATTERNS-ADOPTION.md`

---

## A · Observation findings

### A.1 · Methodology §19 · single-column scroll · needs tabs

**Observed:** §19 is one long vertical stack — MetricStrip → ProcessFlowDiagram → MethodologyPillar (3-col) → donut chart → SourceCluster → InsightBox. 5 distinct sub-stories crammed top-to-bottom. ~1200px scroll height. User has to scroll all of it to grasp methodology.

**Why this matters:** ref-pattern study shows methodology is a "trust anchor" section. Buyers scan for credibility signals · then skip to relevant deep-dive. Single-scroll layout buries the trust hook (process flow + pillars) below scroll.

**Proposed tab split (4 tabs):**
| Tab | Content | Why this group |
|---|---|---|
| 1. Overview | Lede + MetricStrip (4 stats) | First-pass scan · credibility numbers in 5 seconds |
| 2. Process | ProcessFlowDiagram (4 stages) | "How we did the work" · refs use timeline pattern |
| 3. Pillars | MethodologyPillar (3 pillars · Primary / Secondary / Quantitative) | "What's behind the data" · deep credibility |
| 4. Sample | Donut chart (respondent composition) + figcaption | "Who we talked to" · sample integrity |

SourceCluster + InsightBox stay outside tabs (closing card · always visible). Tabs reuse §11 IndustryAnalysis · §07 Ecosystem pattern (Radix Tabs · canonical TABS guide §3).

### A.2 · Chart colors · audit findings

**Observed via grep + visual scan:**
- ✅ `_theme.ts` palette correct (purple-500 · periwinkle-500 · perano-800 · etc.) · matches `COLOR-USAGE-GUIDE.md §3.2`
- ⚠️ `MarketSizeSection.tsx:89` · PhaseStrip uses `rgba(50, 90, 140, 0.55)` (blue-slate) for "Recovery" phase pill — OFF-PALETTE blue
- ⚠️ `MarketSizeSection.tsx:275` · SegmentSplitBar uses same `rgba(50, 90, 140, 0.85)` for cold-storage fill — OFF-PALETTE
- ⚠️ `EcosystemTreemap.tsx:55,61,67,...` · uses `rgba(50,90,140,0.85)` · `rgba(90,130,180,0.55)` · `rgba(168,150,142,0.20)` — OFF-PALETTE (raw blue + warm-brown raw RGBs)
- ⚠️ `DefinitionsSection.tsx:143-155` · 3 category colors use raw `rgba(168,150,142)` warm + `rgba(120,160,200)` cool-blue + `rgba(90,130,180)` deep-blue — OFF-PALETTE
- ⚠️ `MethodologySection.tsx:173-178` · ChartFigure legend hardcodes `#9488ec`, `#c3c6f9`, `#86b3e5`, `#7075c8` — actual palette values BUT hardcoded (should reference `_theme.ts` exports OR CSS tokens)
- ⚠️ `SubmarketsSection.tsx:171,172,240,241` · hardcoded `#9488ec` purple in legend — same hardcoding issue

**Why this matters:** any non-palette color = drift · ref-aligned premium feel broken. Raw RGBs bypass token system · can't be themed/redesigned globally.

### A.3 · Tables · most lack refs-style aesthetic

**Observed:**
- `EndUserSection.tsx:346` Shelf-Life Matrix · `EndUserSection.tsx:473` Players & 3PL table · `MarketSizeSection.tsx:413` historical/forecast table · `PropertyTable.tsx:82` competitor matrix · `OpportunityRankingTable.tsx:273,345` ranking table
- Pattern: `border-separate · borderSpacing: 0` w/ inline `borderBottom: 1px solid var(--black-100/200)` per `<td>`/`<th>`
- Inconsistent: some 11px uppercase headers · some 13px regular · some hover bg · some not · some w/ italic on tech-requirement col · others not
- No canonical TableShell component — every section reimplements w/ subtle drift
- Ref pattern (CHARTS-TABLES-PATTERNS doc §6 · rainbow-pothos + merged-report): top + bottom hairline · row-level bottom hairline only · 40-48px row height · 11px uppercase DM Sans header · 13-14px body · italic only on "interpretation" col · tabular-nums on numerics · subtle row hover (`black-50`)

**Why this matters:** tables are the densest data carriers in PDP. Drift = "looks like a different report" feel per section. Need canonical TableShell atom.

### A.4 · Font color hierarchy · 5-tier ink audit

**Observed token usage across sections (grep):**
- `--semantic-ink-strong` (0.9) → headings · key numbers · strong bullets ✅ correct
- `--semantic-ink-body` (0.8) → body prose · lede ✅ correct
- `--semantic-ink-muted` (0.6) → secondary descriptors · italic figcaptions ✅ correct
- `--semantic-ink-subtle` (0.45) → eyebrow uppercase · timestamps · meta — used widely · **WCAG concern flagged in QA (3.36:1)** · user wants visual hierarchy preserved
- `--semantic-ink-faint` (0.35) → barely used · should be for "ultra meta" only

**Issues found:**
- `MethodologySection.tsx:113` lede italic uses `--semantic-ink-muted` (correct per FONT guide italic rule)
- `MethodologySection.tsx:128` eyebrow uses `--semantic-ink-subtle` · `fontSize: 10px` · OK
- Some atoms (PropertyTable :114) use `--semantic-ink-subtle` for column descriptor italic 11px · borderline ok at small text WCAG exception
- ⚠️ `IndicatorCard.tsx:30` comment says "green-ish periwinkle for positive" · semantic confusion · YoY direction shouldn't carry color baggage
- ⚠️ Some sections (ExecutiveSummary lede line 91+) use `--color-brand-red` on numbers/metrics — OK per `COLOR-USAGE-GUIDE §3.1` (headline forecast accent) but check restraint (max 1 per section · `DSGap` already flagged earlier for over-use)

**Why this matters:** 5-tier ink system is the primary hierarchy carrier (refs use grayscale only). Drift = chaotic visual rhythm.

---

## B · Plan of action · 5 work-streams

### Stream 1 · Methodology section · refactor to 4-tab pattern
- Add Radix Tabs (already used in §11 · §07) · 4 tabs (Overview · Process · Pillars · Sample)
- Tabs match canonical pattern from `TABS-SWITCHERS-INFO-COMPOSITION.md`
- Keep SourceCluster + InsightBox OUTSIDE tabs (always visible · always trust-anchor)
- Default open tab = "Overview"
- Acceptance: visual hierarchy clearer · 50%+ scroll height saved · all content preserved

### Stream 2 · Build canonical TableShell atom
- New atom: `src/components/atoms/TableShell.tsx`
- Props: `{ columns: ColumnDef[], rows: Row[], rowHoverable?, gatedFromColumn?, gatedFromRow?, italicCol?, className? }`
- Internal: refs-canonical styling (top hairline · 11px uppercase header · 13-14px body · 40-48px row · row-bottom hairline · tabular-nums forced on numeric cols · italic on flagged interpretation col)
- Colors: ink-strong header · ink-body cells · ink-muted italic interpretation · `black-100` row borders · `black-50` hover
- Gating: integrates `GatedBlock` for column or row gating
- Refactor 5 existing table call sites to use TableShell:
  1. `MarketSizeSection.tsx:413` (historical+forecast)
  2. `EndUserSection.tsx:346` (shelf-life matrix)
  3. `EndUserSection.tsx:473` (players & 3PL)
  4. `OpportunityRankingTable.tsx` keeps custom (has score bars · special) — wrap header w/ shared header utility OR pattern-match
  5. `PropertyTable.tsx` keeps custom (special row-header column · gated columns · cross-cell merge) — pattern-match style w/ TableShell tokens
- Acceptance: 2 sections + 1 atom use TableShell · visual consistency across all PDP tables · refs-canonical look

### Stream 3 · Chart color audit + sweep
- Replace ALL raw `rgba(50,90,140,...)` blue-slate with periwinkle/perano/purple from `_theme.ts`
- Replace `rgba(168,150,142,...)` warm + `rgba(120,160,200,...)` cool-blue in DefinitionsSection category map · pick 3 from data-viz palette (purple-500/periwinkle-500/perano-800)
- Replace EcosystemTreemap raw rgbas w/ Ken palette
- Convert hardcoded `#9488ec`/`#c3c6f9`/etc in section legends to import from `_theme.ts` (`KEN_CHART_COLORS[0]` etc.) for single source of truth
- Acceptance: `grep -rn "rgba\|#[0-9a-fA-F]\{6\}"` across `src/components/sections/` returns ZERO non-palette hits

### Stream 4 · Font hierarchy verify + minor fixes
- IndicatorCard YoY pill — strip color · use ink-strong text + arrow direction (▲▼) for semantic clarity · no color carries "positive/negative" (avoids semantic-red-on-negative concern)
- Audit every section's H1/H2/H3 chain → enforce: H2 = serif 28-36px ink-strong / H3 = sans-serif medium ink-strong / lede = sans 17px ink-body / eyebrow = 10-11px DM Sans 600 uppercase ink-subtle (FONT guide §3)
- Spot check `--semantic-ink-faint` (0.35) — used only for "ultra meta" (footnote disclaimers · methodology callouts) · not body prose
- Acceptance: no section breaks H2-H3-body-eyebrow chain · ink-subtle reserved for small uppercase eyebrows + tiny meta only

### Stream 5 · QA + ship
- `pnpm build` + `pnpm lint` clean
- Visual scroll-through at http://localhost:3000/test/phase-2
- Grep audit: zero raw rgba/hex in sections (except hero gradient which is intentional)
- Confirm Methodology tabs work · keyboard a11y · default tab opens
- Confirm tables share TableShell · visual consistency
- Confirm IndicatorCard YoY uses arrow-only · no color

---

## C · Discipline rules · per CLAUDE.md + memory

1. **NO patchwork** (memory `feedback_no_patchwork.md`) — if 3+ overrides fight library/atom · build local wrapper. TableShell IS this wrapper choice (was patchwork before · now canonical).
2. **NO brand-red on negative semantics** (memory · multiple feedback files) — IndicatorCard YoY won't use red for negative.
3. **NO blue/emerald/amber** (CLAUDE.md hard rule) — Stream 3 sweep enforces.
4. **5-tier ink hierarchy** (project doc FONT-PAIRING §6) — Stream 4 audit enforces.
5. **Token-only colors** (memory `feedback_foundations_first_token_discipline.md`) — replace raw rgba w/ palette refs / `_theme.ts` exports.
6. **Document-first then execute** (user mandate this turn) — this file IS the doc · won't deviate.
7. **No grow CLAUDE.md** (memory `feedback_anti_bloat.md`) — this lives in project docs/ · not in CLAUDE.md.

---

## D · Out of scope (deferred)

- B1 §11 IndustryAnalysis gating add (separate task)
- B2 Lighthouse prod-build retest (run after polish · prod env)
- B3 StatPair DD/DT order DS bug (DS-layer fix · separate sprint)
- P5 Mobile nav touch targets (chrome-layer · separate)
- New chart types (no new charts in this sprint · color-only sweep)

---

## E · Execution order

1. **Doc commit** (this file) — no code changes yet
2. **Stream 3** chart color sweep (lowest risk · pure replace)
3. **Stream 2** TableShell build + 2 refactors
4. **Stream 1** Methodology tabs
5. **Stream 4** Font hierarchy fixes (IndicatorCard YoY + spot audits)
6. **Stream 5** QA + ship

Estimated: 2-3hrs · single aura-builder dispatch w/ this doc as authority.

---

## F · Open questions (none blocking · noted for future)

- Should TableShell support a "compact" variant (32px row · 12px body) for ultra-dense tables? Defer · no current section needs it.
- Should §08 PhaseStrip Recovery pill move to coral-500 (memory: coral OK for "warning/recovery" status pills · `COLOR-USAGE-GUIDE.md §3.3`)? Yes · part of Stream 3.
- Should KEN_CHART_COLORS expand beyond 6 colors for treemap-heavy needs? No · refs use ≤3 per viz · we have 6 ramps which is plenty.

---

## G · Learnings to bank after ship

Will log to `docs/LEARNINGS.md` post-execution:
- Does TableShell adoption reduce per-table LOC? (measure)
- Does §19 tab-refactor improve scroll behavior? (measure scroll-to-bottom seconds)
- Any chart that needed color outside palette · document the exception case
- If raw rgba creep continues post-sweep · add lint rule
