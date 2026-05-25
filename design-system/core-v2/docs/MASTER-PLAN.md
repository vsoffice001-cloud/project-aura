# MASTER PLAN · DS Heritage Reclaim + V1 Product Page Restore

**Date created:** 2026-05-19
**Owner:** Aura (Opus main)
**Status:** DRAFT · awaiting user approval before Stage 1 execution
**Master rules applied:** (1) 4WH-discipline · (2) TodoWrite decomposition w/ gates

---

## 0 · Problem (why this plan exists)

User built `design-system/core-v2/` to be the V2 of the OG DS. AI keeps producing low-quality UI when consuming new DS. Cause is NOT "new DS broken." Cause is:

1. **New DS is shell of OG vs_26 + topnav + report-store-atoms.** V0.2 organism layer NEVER ported. 13 of 22 V0.2 organisms missing (MindMap, ScopeOfReport, TOCSidebar, InlineStats, SectionHeader, RegionalComparison, SegmentationSection, GrowthDriversChallenges, MarketDataTable, RelatedReports, CompetitiveLandscape, AudioPlayer, TargetAudience).
2. **AI hits gap → invents flat substitute → rationalizes in JSDoc** (e.g., "NO cards", "lean PDP-specific fork", "White bg only"). Pattern in 5 of 6 v0.3 sections audited.
3. **Token rename trap** (`colors.warmBg` → `--warm-300`) · legacy snippets break silently → black fallback.
4. **No per-component WWWWH inside DS.** AI cannot decide WHEN/WHERE/WHY to pick a component. Falls back to invention.
5. **Multiple legacy heritage layers · no canonical-source map.** V0_lite_report upgrades V0.2 for FAQ/Chapters/Metrics/TOC/RM/SampleReport/text-pairing. Report-store-legacy upgrades V0_lite for buttons/arrows/listing/cards/dropdowns. Without per-component source-of-truth doc, AI picks wrong source.

---

## 1 · 4WH on plan itself

**WHAT** · Stage 1 audit · Stage 2 docs · Stage 3 port · Stage 4 v0.3 swap · Stage 5 QA gate
**WHY** · Restore design fidelity to V1 Product Page. Re-enable correct AI consumption of new DS by closing organism gap + writing per-component WWWWH guide.
**WHEN** · Now. Block all v0.3 design work until Stage 2 done.
**WHERE** · `design-system/core-v2/docs/LEGACY-AUDIT/` (audits) · `design-system/core-v2/docs/` (synthesis docs) · `design-system/core-v2/src/` (ported components) · `projects/v1-project/v1-product-page-ver0.3/src/components/sections/` (consumer swap)
**HOW** · 3 parallel audit agents (Sonnet) for Stage 1 · Opus synthesis for Stage 2 · Sonnet aura-builder for Stage 3 · Sonnet aura-builder + aura-qa for Stage 4

---

## 2 · Per-page verdicts (user-recorded · 2026-05-19)

### 2.1 V0_lite_report-legacy — overall ✅ KEEP (beautiful UI · all useful)
- ✅ Secondary text · text pairing · type rhythm · all sections
- 🔴 Buttons — outdated · replace w/ report-store buttons
- ✅ CANONICAL FOR: FAQ · Chapters · Metrics · KeyStats · ChapterMethodology · SampleReportPreview · Hero cinematic · AnalyticsDashboard · Slideshow · ScrollProgress · CTALink (verify vs store) · text-pairing patterns · type-scale rhythm

### 2.2 V0.2-for-ds — partial ⚠️
- ✅ KEEP: small-stats representation · SideTOC · Taxonomy · Scope · charts/graphs/bars · data tables · MindMap · MindMapModal · RegionalComparison · SegmentationSection · GrowthDriversChallenges · MarketDataTable · hidden-content layers (accordion · modal) · text-pairing + sizes
- 🔴 SKIP: bottom-rising FloatingCTA banner · buttons · CTAs · token usage not aligned w/ new-DS
- ✅ CANONICAL FOR: dense data viz organisms · interactive D3 graphs · accordion + modal hidden-content patterns

### 2.3 report-store-legacy — partial ✅
- ✅ KEEP: card management · listing patterns · filters · search · related-reports listing · dropdowns w/ store context · navbar (richest dropdown + utility bar) · footer · cross-sell rails · **buttons (all sizes · small buttons especially)** · **arrows + directional UX (CTA arrow · link arrow · animated hover-shift · external-link · scroll-down · pagination)** · icon buttons · pill/tag/chip buttons · disclosure toggles
- ✅ CANONICAL FOR: ALL button primitives · arrow components · directional UI · listing / card patterns · navbar · footer · filters · search

---

## 3 · Tier model (locked)

```
Tier 0 · Tokens          → core-v2/styles/base.css  (DTCG aliases · semantic + raw)
Tier 1 · Atoms           → core-v2/src/atoms        (Button · Badge · Card · SectionLabel · SectionHeading · Arrow · IconButton …)
Tier 2 · Molecules       → core-v2/src/molecules    (StatPair · LabelHeadingPair · CTALinkArrow · FilterChipRow …)
Tier 3 · Organisms       → core-v2/src/organisms    (Navbar · Footer · TOCSidebar · MindMap · ScopeOfReport · FAQSection · KeyStatsStrip …)
Tier 4 · Section templates → core-v2/src/templates    (NEW · locked section recipes)
Tier 5 · Page recipes    → core-v2/recipes/         (page-level composition · bg alternation · spacing rhythm)
```

Every component (Tier 1-4) ships with `wwwwh.md` sidecar OR JSDoc header containing 5 sections (WHAT · WHY · WHEN · WHERE · HOW + a11y + motion + tokens).

---

## 4 · Audit dimensions (13 · locked · no skipping)

Every legacy-page audit records:

1. **Section inventory** — block-by-block list w/ verdict (✅ USE · ⚠️ USE PARTIAL · 🔴 SKIP) + rationale
2. **Button inventory** — every variant · size · state · arrow · w/ verdict
3. **Arrow + directional UX inventory** — patterns w/ usage + verdict
4. **Type pairing inventory** — heading-desc · label-value · stat-label · CTA-arrow · text pairs · verdict
5. **Type scale + weight + tracking + leading** — used values · token match · verdict
6. **Color / palette usage** — every hex/var used · token match · verdict
7. **Spacing inventory** — per-block · WHAT · WHY · HOW MUCH · WHEN · WHERE · token match
8. **Composition recipes** — section recipes captured · WHEN-to-use rules
9. **Layout patterns** — page-level + section-level · grid + cols + sticky · WWWWH
10. **Token gap report** — every value vs `base.css :root` · ✅ matched · ⚠️ different · 🔴 missing
11. **Motion patterns** — transitions · scroll · hover · entrance · reduced-motion · verdict
12. **A11y patterns** — focus · keyboard · aria · landmark · verdict
13. **Cards + listing patterns** — when card · when listing · variant · padding · shadow · radius · verdict

Output template (per page): `core-v2/docs/LEGACY-AUDIT/<page>.md` w/ 13 H2 sections.

---

## 5 · Stage breakdown (locked · no skipping)

### Stage 1 — Audit (3 parallel Sonnet agents · ~60 min)

**1A** — V0_lite_report-legacy audit → `core-v2/docs/LEGACY-AUDIT/V0_lite_report.md`
**1B** — V0.2-for-ds audit → `core-v2/docs/LEGACY-AUDIT/V0.2-for-ds.md`
**1C** — report-store-legacy audit → `core-v2/docs/LEGACY-AUDIT/report-store-legacy.md`

Each agent reads only its assigned legacy folder · produces 13-dimension report · max 2500 words · explicit file:line refs · no recommendations (synthesis happens in Stage 2).

**Gate after Stage 1:** User reviews 3 audit docs. Approves OR redirects before Stage 2.

### Stage 2 — Synthesis docs (Opus main · ~60 min · serial)

Each doc has 4WH-validated content. Order:

**2.1** `CANONICAL-SOURCE-MAP.md` — per component · which legacy file owns canonical pattern · why
**2.2** `SPACING-COMPOSITION-LAYOUT-CANON.md` — cross-page rules · master spacing scale · composition library · layout library
**2.3** `TOKEN-GAP-REPORT.md` — every legacy value vs new-DS token · add/alias/keep recommendations
**2.4** `GAPS.md` — missing organisms + atoms + molecules · DO NOT INVENT list
**2.5** `AI-PICKER-GUIDE.md` — decision tree (5-step picker · "given task X, pick component Y")
**2.6** `ANTI-PATTERNS.md` update — add invention-rationalization patterns + token-rename trap + brand-red-overuse
**2.7** `PORT-PLAN.md` — batched port roadmap · dependency order · per-batch deliverable

**Gate after Stage 2:** User reviews 7 synthesis docs. Approves PORT-PLAN before Stage 3.

### Stage 3 — Port (Sonnet aura-builder · batched · gated between batches)

Default 3 batches (PORT-PLAN may revise):

**3.1 Batch 1 — Primitives (1-2 days)**
- Button (report-store source · all sizes · arrow variants)
- Arrow components (CTA-arrow · link-arrow · animated hover-shift · external-link · pagination · scroll-down)
- IconButton · FilterChip · Pill · Tag · DisclosureToggle
- SectionHeader (V0.2 atom · label+heading+desc combo)
- InlineStats / KeyStats (V0_lite source · most-recent stat-strip pattern)
- Token aliases for legacy names (`--warmBg` · `--warmBorder` · etc)

Gate · v0.3 visual check · approve before batch 2

**3.2 Batch 2 — Layout + dense-data organisms (2-3 days)**
- TableOfContentsSidebar (V0_lite or V0.2 · pick newest)
- ScopeOfReport + MindMap + MindMapModal (V0.2 source)
- TaxonomyTree (V0.2 source · interactive)
- KeyStatsStrip (V0_lite + chart hook)
- ChapterMethodology / ResearchMethodology (V0_lite)
- FAQSection (V0_lite bordered-card variant + "Still have questions?" CTA)
- SampleReportPreview (V0_lite)

Gate · v0.3 visual check · approve before batch 3

**3.3 Batch 3 — Specialty + listing organisms (2-3 days)**
- RegionalComparison (V0.2)
- SegmentationSection (V0.2)
- GrowthDriversChallenges (V0.2)
- MarketDataTable (V0.2)
- CompetitiveLandscape (V0.2)
- TargetAudience (V0.2)
- AudioPlayer (V0.2)
- RelatedReports (report-store)
- Navbar full (report-store · utility bar + dropdowns + search + mobile menu)
- Footer (report-store)
- Listing cards · filter chips · search UI (report-store)

Gate · v0.3 visual check · approve before Stage 4

### Stage 4 — v0.3 consumer swap (Sonnet aura-builder · ~1 day)

Per section:
- Swap invented inline UI → ported DS organism import
- Strip JSDoc rationalizations (`NO cards` · `lean PDP-specific fork` · `White bg only`)
- Remove inline `style={}` blocks → DS classes
- Restore brand-red discipline (CTA only)
- Restore `text-base 1rem` body type
- Restore card chrome where legacy has it

### Stage 5 — Final QA gate (Sonnet aura-qa · ~30 min)

- Playwright visual diff (v0.3 vs legacy reference screenshots · per section)
- axe a11y audit (zero serious violations)
- Lighthouse perf (≥90 perf · 100 a11y · 90 best-practices on `/`)
- Side-by-side screenshot pack for user signoff
- Update HANDOVER_TRACKER.md status

---

## 6 · Deliverables (locked file paths)

```
design-system/core-v2/docs/
├── MASTER-PLAN.md                       ← this doc
├── LEGACY-AUDIT/
│   ├── V0_lite_report.md                ← Stage 1A
│   ├── V0.2-for-ds.md                   ← Stage 1B
│   └── report-store-legacy.md           ← Stage 1C
├── CANONICAL-SOURCE-MAP.md              ← Stage 2.1
├── SPACING-COMPOSITION-LAYOUT-CANON.md  ← Stage 2.2
├── TOKEN-GAP-REPORT.md                  ← Stage 2.3
├── GAPS.md                              ← Stage 2.4
├── AI-PICKER-GUIDE.md                   ← Stage 2.5
├── ANTI-PATTERNS.md (update)            ← Stage 2.6
└── PORT-PLAN.md                         ← Stage 2.7

design-system/core-v2/src/
├── atoms/      (ported per batch · each w/ WWWWH JSDoc)
├── molecules/  (ported per batch)
├── organisms/  (ported per batch)
└── templates/  (NEW tier · locked section templates)

design-system/core-v2/styles/
└── base.css    (token aliases added · Stage 3.1)

projects/v1-project/v1-product-page-ver0.3/src/components/sections/
└── *           (swapped to DS imports · Stage 4)

docs/
├── CHANGELOG.md (entry per stage)
├── LEARNINGS.md (entry per stage learnings)
└── DECISIONS.md (Active entry · this plan)
```

---

## 7 · Gates (locked · no skip)

| Gate | After | Trigger | Approver |
|---|---|---|---|
| G1 | Stage 1 | 3 audit docs written | User |
| G2 | Stage 2 | 7 synthesis docs written | User |
| G3a | Stage 3 batch 1 | Primitives ported + v0.3 visual check | User |
| G3b | Stage 3 batch 2 | Layout + dense-data ported + v0.3 visual check | User |
| G3c | Stage 3 batch 3 | Specialty + listing ported + v0.3 visual check | User |
| G4 | Stage 4 | v0.3 swaps complete | User |
| G5 | Stage 5 | QA pack + Lighthouse ≥targets | User |

Each gate = STOP · show evidence · wait for "go" before next stage.

---

## 8 · Master-rule application

**Rule 1 — 4WH discipline**
Every doc + every component ported = 5-section WWWWH header (or sidecar).
Every stage in this plan = 4WH at top of stage section in PORT-PLAN.md.

**Rule 2 — TodoWrite decomposition + gates**
TodoWrite list created (17 todos · this conversation).
One in_progress at a time. Gate between each stage. Sub-batches inside Stage 3.

---

## 9 · Success criteria

- ✅ All 22 V0.2 + V0_lite + report-store canonical organisms exist in `core-v2/src/organisms/` w/ WWWWH header
- ✅ `CANONICAL-SOURCE-MAP.md` lists every component → legacy file path of canonical version
- ✅ `AI-PICKER-GUIDE.md` decision tree picks correct component in 95%+ test prompts (5 dry-run prompts to verify)
- ✅ v0.3 section files free of inline `style={}` blocks · free of `NO cards` style JSDoc rationalizations · use DS imports only
- ✅ Lighthouse perf ≥90 · a11y 100 · best-practices ≥90
- ✅ Playwright screenshot diff vs legacy reference < 5% delta per section

---

## 10 · Out of scope (this plan)

- Backend / data shape changes
- Motion lib swap (Framer Motion stays)
- New page recipes beyond V1 Product Page
- Cinematic Hero bg image content (kept as-is)
- Tech-team handover for v0.3 (separate workflow)
- New-DS atoms in `core-v2/src/atoms/` that already work — only audited, not refactored

---

## 11 · Risk register

| Risk | Likelihood | Mitigation |
|---|---|---|
| Audit reveals more gaps than expected · Stage 3 doubles in size | Medium | PORT-PLAN.md flags w/ revised estimate · user gates batch sizes |
| V0.2 D3 MindMap depends on d3 v5 · Next 16 React 19 compat | Medium | Stage 2.4 GAPS.md flags · port may need d3 v7 upgrade |
| Report-store buttons use Tailwind v3 · need v4 migration | Low | Audit captures v3 syntax · Stage 3.1 rewrites in v4 |
| Token aliases conflict w/ existing names | Low | Stage 2.3 TOKEN-GAP-REPORT.md validates before alias-add |
| User changes verdicts mid-port | Medium | Gates after each stage allow re-direction w/o waste |

---

## 12 · Self-check (skip-detection)

Things I almost skipped on planning · now included:
- ✅ Per-page verdict captured verbatim from user (§2)
- ✅ All 3 sources of canonical UI named (not just V0.2)
- ✅ Buttons + arrows + directional UX called out separately (§2.3)
- ✅ Spacing + composition + layout as dedicated audit dimension (§4 dims 7-10)
- ✅ Token gap as dedicated dimension (§4 dim 10)
- ✅ Tier 4 section templates + Tier 5 page recipes added (§3)
- ✅ Cards + listing patterns dedicated dim (§4 dim 13)
- ✅ Text pairing as dedicated dim (§4 dim 4)
- ✅ Type weight + tracking + leading as dim (§4 dim 5)
- ✅ AI-PICKER-GUIDE.md as core deliverable (§5 Stage 2.5)
- ✅ ANTI-PATTERNS.md update as deliverable (§5 Stage 2.6)
- ✅ Gates between every stage (§7)
- ✅ Master rules application section (§8)
- ✅ Success criteria w/ measurable thresholds (§9)
- ✅ Risk register (§11)
- ✅ Out-of-scope to bound work (§10)

---

## 13 · Approval

Plan locked at: `design-system/core-v2/docs/MASTER-PLAN.md`
Awaiting user "go" before executing Stage 1.

If user redirects: update plan · re-version · re-approve before any execution.
