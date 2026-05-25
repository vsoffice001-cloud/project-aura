# DS v2 Execution Plan · Post-Audit Correction

**Date** · 2026-05-15 · **REVISED after real-state audit**
**State** · foundation locked · 500+ tokens in `base.css` · `FOUNDATIONS.md` + `RULES.md` canonical
**Goal** · close QUALITY gap between OG and core-v2 (port-quantity gap already closed)

---

## ⚠️ PLAN CORRECTION · 2026-05-15

**Prior plan** · 186hr · 23d · assumed major component porting needed
**Reality after audit** · ~73hr · 9d · quality sweep + 4 true gaps + CI guards

**Audit findings (filesystem-verified):**

| Layer | OG | v2 | Delta |
|---|---|---|---|
| Atoms | 31 | 44 | v2 = **parity + 15 added** · 4 true gaps |
| Molecules | 27 | 27 + navbar/ | **parity** |
| Organisms | 31 | 47 | v2 = **parity + 16 case-study sections** |
| Hooks | 15 | 22 | v2 = **parity + 8 added** · 1 gap |
| shadcn ui | 48 | 49 | **parity** |

**True file gaps · only 5:**
- atoms · `CodeBlockWithCopy.tsx` · `Navbar.tsx` · `TableOfContents.tsx`
- hooks · `useReportFilters.ts`
- (Navbar likely redundant — covered by DummyHeader + CaseStudyNavbar)

**Quality debt (the real work):**

| Gate | atoms | molecules | organisms |
|---|---|---|---|
| WWWWH JSDoc | 36/41 (88%) | 7/26 (**27% ⚠️**) | 34/45 (76%) |
| Hardcoded hex hits | 24 | 17 | **85 ⚠️** |
| `focus-visible` coverage | 7 files | **0 ⚠️** | 3 ⚠️ |
| `useReducedMotion` | 5 files total across all 3 layers ⚠️ |||

**Worst offenders (hex):** CaseStudyNavbar.tsx (44) · DummyFooter.tsx (29) · AnimatedArrowQuickRef.tsx (8) · ResponseChart.tsx (6) · Badge.tsx (5) · SurveyCard.tsx (4) · CompletionBadge.tsx (4) · DummyHeader.tsx (3)

---

## Where We Are (Retrospective)

### ✅ COMPLETE
1. **Foundation tokens** · 500+ tokens · 6 dashboard categories + 9 extras · `core-v2/styles/base.css` 597 lines · unlayered :root · cascade-safe
2. **Foundation docs** · `FOUNDATIONS.md` (30 sections · WWWWH · values)
3. **Rules** · `RULES.md` (10 sections · 90 explicit rules mined from OG)
4. **Variant CSS** · `editorial-light.css` + `cinematic-dark.css` w/ font binding fix
5. **Memory + learnings** · pinned foundations-first rule · OG correction logged
6. **Sample page** · `/sample` 14-section composition · DummyHeader + DummyFooter dummies · 6 P0/P1 fixes shipped
7. **Component porting** · atoms/molecules/organisms/hooks at parity-or-better w/ OG (audit verified 2026-05-15)

### ⚠️ QUALITY DEBT (real remaining work)
- 126 hardcoded hex hits across 15 files (token discipline · R5)
- 19 molecules missing WWWWH JSDoc header (60+ effort hours saved if templated)
- Near-zero `focus-visible` on molecules · sparse on organisms (a11y · R7)
- Only 5 files honor `useReducedMotion` (motion · R6)

### ❌ TRUE GAPS (file-level)
- `atoms/TableOfContents.tsx` (needed for /sample case-study aid)
- `hooks/useReportFilters.ts`
- `atoms/CodeBlockWithCopy.tsx` (low priority · doc demos only)
- `atoms/Navbar.tsx` audit · likely redundant w/ DummyHeader+CaseStudyNavbar
- `scripts/check-tokens.mjs` (CI guard · prevents recurrence)
- `scripts/check-components.mjs` (CI guard · raw HTML detector)

---

## Decisions Locked This Session

| # | Decision | Rationale |
|---|---|---|
| D1 | Foundation-first methodology | Stop page work until token universe stable |
| D2 | Keep OG short token names canonical | 2514 refs across codebase · breaking change blocked |
| D3 | Values in FOUNDATIONS.md (not just names) | Author can write without grepping CSS |
| D4 | Fix ALL foundations · not just spacing | One-sweep · avoid recurring "X missing" loop |
| D5 | Skip SEO/marketing/analytics scope | UI/UX + code only · burn tokens otherwise |
| D6 | Header = topnav-v32 :3005 · Footer = V0.2 :3030 | User-locked pixel sources |
| D7 | Animation = Framer Motion ONLY | GSAP + Lenis removed 2026-05-08 |
| D8 | Bookmark RULES.md + FOUNDATIONS.md as canonical | Read FIRST before building anything |

---

## Phased Execution Plan · REVISED 2026-05-15

**Methodology** · quality sweeps first (kill 126 hex + 19 missing JSDoc + a11y gaps) · then 5 true file gaps · then page polish + QA.

**Parallelization · 3 waves:**
- Wave 1 · 5 agents parallel · scripts + token sweep + JSDoc + doc audit
- Wave 2 · 4 agents parallel · a11y + motion + true gaps + page polish
- Wave 3 · aura-qa final gate + handover docs

---

### PHASE 1 · CI GUARDS + DOC SYNC (9hr · 1-2 days)
**Goal · prevent recurrence of foundation drift bugs**

#### 1.1 · Doc audit + sync (4hr · aura-mech Haiku)
- Grep fictional token mentions in `QUICK_START.md` · `CORE.md` · `COMPONENT_REFERENCE.md` · `COMMANDMENTS.md` · `TOKEN_PYRAMID.md`
- Generate replacement-list per doc
- Apply sed/replace · point all readers at FOUNDATIONS.md as source of truth

**Acceptance** · zero fictional token names in any DS doc · grep `--space-foo` returns 0 · all `var(--*)` references in docs match FOUNDATIONS.md token list

#### 1.2 · Token verify script (3hr · aura-builder Sonnet)
```bash
# scripts/check-tokens.mjs
# 1. grep var(--*) in core-v2/src + projects/*/src
# 2. parse :root{} from base.css + tokens.css + variant CSS
# 3. diff · exit 1 on undefined
# 4. allow-list shadcn/3rd-party tokens (--background --foreground --ring etc)
```

**Acceptance** · `node scripts/check-tokens.mjs` exits 1 on undefined · added to `package.json` `check:tokens` · documented usage

#### 1.3 · Component verify script (2hr · aura-builder Sonnet)
```bash
# scripts/check-components.mjs
# 1. grep raw <button> <a href> <h1-6> <input> outside DS atom files
# 2. detect ArrowRight/ChevronRight on CTA (R4.1.8)
# 3. detect static <ArrowUpRight> instead of showArrow prop (R4.1.9)
# 4. detect --brand-red on non-CTA (R1.2)
```

**Acceptance** · CI fail on R1.2 · R4.1.8 · R4.1.9 · R8.4 violations

**Sub-total · 9hr · 1-2 dev-days**

---

### PHASE 2 · TOKEN DISCIPLINE SWEEP (12hr · 1.5 days)
**Goal · kill 126 hardcoded hex hits across 15 files**

**Parallelization · 2 agents Wave 1:**

#### 2.a · Worst organisms (6hr · aura-builder Sonnet)
- `organisms/CaseStudyNavbar.tsx` · 44 hex → swap to `var(--*)` per FOUNDATIONS.md
- `organisms/DummyFooter.tsx` · 29 hex → swap
- `organisms/DummyHeader.tsx` · 3 hex → swap
- `organisms/ChallengesSection.tsx` · 2 hex → swap
- `organisms/ResourcesSection.tsx` + `MethodologySection.tsx` + `ClientContextSection.tsx` · 1 hex each

**Acceptance** · `grep -rohE "#[0-9a-fA-F]{3,8}" organisms/*.tsx` returns 0 (or only documented exception in comment)

#### 2.b · Atoms + molecules (6hr · aura-builder Sonnet)
- `atoms/AnimatedArrowQuickRef.tsx` · 8 hex → swap
- `atoms/Badge.tsx` · 5 hex → swap
- `atoms/ViewToggle.tsx` + `SubtleVariantSwitcher.tsx` · 1 hex each
- `molecules/ResponseChart.tsx` · 6 hex → swap (chart colors per `--chart-*` tokens)
- `molecules/SurveyCard.tsx` · 4 hex
- `molecules/CompletionBadge.tsx` · 4 hex
- `molecules/DataHighlightCard.tsx` · 1 hex

**Acceptance** · all atoms + molecules grep clean · build still compiles · zero visual regression on /sample (aura-qa verifies)

**Sub-total · 12hr · 1.5 dev-days**

---

### PHASE 3 · JSDOC WWWWH BACKFILL (8hr · 1 day)
**Goal · 19 molecules + 11 organisms + 5 atoms get WWWWH header per RULES.md §10**

#### 3.1 · Template per Execution Discipline Gate 1
```typescript
/**
 * WHY · rationale + problem solved
 * WHAT · mechanic + prop interface + what renders
 * WHEN · use cases · contexts where it fits
 * WHEN NOT · anti-patterns · contexts to skip
 * WHERE · which pages/sections consume it
 * HOW · code example
 *
 * @reusabilityScore 1-5
 * @a11y_status reviewed-AA | reviewed-A | pending-review | known-issue
 * @lifecycle alpha | beta | stable | deprecated
 * @promotedFrom OG file path if ported
 */
```

#### 3.2 · Files needing JSDoc (35 files · aura-builder Sonnet)
- 19 molecules · `ActiveFilterChip` · `AnalystPickCardB` · `BackToTop` · `CardFooterRow` · `CardMetaRow` · `CardReveal` · `CategoryListCard` · `CompletionBadge` · `DataHighlightCard` · `EmptyState` · `FilterAccordion` · `HorizontalScroll` · `IndustryBadge` · `LoadMoreSentinel` · `MobileFilterSheet` · `QuestionPreview` · `ReportCard` · `ReportGridCard` · `ResponseChart`
- 11 organisms · (audit returned 76% coverage · 11 files need backfill — to be enumerated by agent grep)
- 5 atoms · (audit returned 88% · 5 files need backfill — to be enumerated)

**Acceptance** · grep `WHY` in first 50 lines returns 100% atoms · 100% molecules · 100% organisms

**Sub-total · 8hr · 1 dev-day**

---

### PHASE 4 · A11Y BACKFILL (10hr · 1.25 days)
**Goal · `focus-visible` on all interactive · 44px touch · aria audit · keyboard nav**

#### 4.1 · `focus-visible` ring (4hr · aura-builder Sonnet)
- Audit `grep -L "focus-visible" *.tsx` per layer
- Add ring to all interactive · `focus-visible:ring-2 focus-visible:ring-[var(--brand-red)] focus-visible:ring-offset-2`

#### 4.2 · 44px touch targets (2hr · aura-builder Sonnet)
- Audit interactive · ensure `min-h-[44px] min-w-[44px]` per Fitts (R7.3)
- Mobile-priority components first

#### 4.3 · ARIA audit (3hr · aura-builder Sonnet)
- All `aria-label` on icon-only buttons
- `aria-expanded` synced on collapsibles (R7.5.2)
- `aria-controls` for collapsible regions (R7.5.3)
- `role` on non-semantic interactive

#### 4.4 · Keyboard nav verify (1hr · aura-qa Sonnet)
- Tab order · Shift+Tab · Enter · Space · Esc working on all atoms
- Live test on /sample via webapp-testing skill

**Acceptance** · axe-core via aura-qa returns zero violations · Lighthouse a11y 95+

**Sub-total · 10hr · 1.25 dev-days**

---

### PHASE 5 · MOTION BACKFILL (6hr · 0.75 days)
**Goal · `useReducedMotion` on every Framer Motion component · CSS opt-out audit**

#### 5.1 · Framer component audit (3hr · aura-builder Sonnet)
- `grep -rl "framer-motion" core-v2/src` → list components using motion
- Each component checked for `useReducedMotion()` hook
- Add hook + conditional `transition` props to all gaps

#### 5.2 · CSS prefers-reduced-motion (2hr · aura-builder Sonnet)
- Audit `base.css` global override active (already shipped — verify)
- Per-component CSS animations honor `@media (prefers-reduced-motion: reduce)`

#### 5.3 · DevTools reduced-motion verification (1hr · aura-qa Sonnet)
- Emulate `prefers-reduced-motion: reduce` on /sample
- All animations should be instant or zero · components still functional

**Acceptance** · grep `useReducedMotion|prefers-reduced-motion` returns hits in every motion component · DevTools test passes

**Sub-total · 6hr · 0.75 dev-days**

---

### PHASE 6 · TRUE FILE GAPS (6hr · 0.75 days)
**Goal · close 5 actual missing files**

#### 6.1 · `TableOfContents.tsx` atom (3hr · aura-builder Sonnet)
- Port from OG `app/components/TableOfContents.tsx`
- Needed for /sample case-study aid
- Full 7-gate compliance

#### 6.2 · `useReportFilters.ts` hook (2hr · aura-builder Sonnet)
- Port from OG `app/hooks/useReportFilters.ts`
- Used by RS listing page filters

#### 6.3 · `CodeBlockWithCopy.tsx` atom (1hr · aura-builder Sonnet)
- Port from OG · doc-page demos
- Low priority · optional

#### 6.4 · `Navbar.tsx` decision (10min · main Opus)
- Audit redundancy w/ DummyHeader + CaseStudyNavbar
- Decision · port · merge · or skip
- Decision logged in DECISIONS.md

**DECISION (2026-05-15 · aura-builder audit): SKIP**
OG `Navbar.tsx` is the exact same 501-LOC monolith already ported as `CaseStudyNavbar.tsx` (renamed on port to avoid collision). Confirmed identical: same hooks (useScrollDirection · useHeroVisibility · useActiveSection), same two-state layout (hero vs scrolled), same section ribbon, same mobile drawer, same svgPaths imports. `DummyHeader.tsx` covers the product/marketing nav use case (5-item main nav, no scroll-spy, stub menus). No behavior in OG Navbar falls outside what DummyHeader + CaseStudyNavbar already cover. Porting would create a third duplicate. Status: closed — no file created.

**Acceptance** · 4 files shipped · index.ts exports · `pnpm build` clean

**Sub-total · 6hr · 0.75 dev-days**

---

### PHASE 7 · REFERENCE PAGE POLISH (12hr · 1.5 days)
**Goal · /sample + case-study + RS-home + RS-listing visual + smoke pass**

#### 7.1 · /sample polish (4hr · aura-builder Sonnet)
- Q1-Q5 carryover decisions resolved
- Visual diff vs OG :3010 baseline
- All 14 sections re-verified w/ post-sweep tokens

#### 7.2 · Case-study page (4hr · aura-builder Sonnet)
- Use case-study recipe per RULES §9
- Compose w/ all post-sweep organisms

#### 7.3 · RS home + RS listing (4hr · aura-builder Sonnet)
- Compose w/ RS organisms
- Filter system live test

**Acceptance** · 4 pages live · pass visual smoke 1440/768/390 · pass cross-browser smoke Chrome+Safari

**Sub-total · 12hr · 1.5 dev-days**

---

### PHASE 8 · QA + HANDOVER (10hr · 1.25 days)
**Goal · aura-qa final gate + 13-pt pre-handover checklist + handover docs**

#### 8.1 · aura-qa final gate (4hr · aura-qa Sonnet)
- Playwright + axe + Lighthouse via webapp-testing skill
- 13-pt pre-handover checklist verified
- Visual regression vs baseline

#### 8.2 · Handover docs (3hr · aura-builder Sonnet)
- Update `HANDOVER_TRACKER.md` row
- Create `STATUS.md` · `HANDOVER.md` · `README.md` per template
- Mark `ready-for-tech`

#### 8.3 · Final memory + LEARNINGS sync (3hr · main Opus)
- Mark plan phases complete in EXECUTION_PLAN.md
- Log actual hours vs estimate per phase in LEARNINGS.md
- Update memory canonical doc w/ delivery date

**Acceptance** · all 10 SHIP criteria green · `ready-for-tech` status set

**Sub-total · 10hr · 1.25 dev-days**

---

## TOTAL EFFORT ESTIMATE · REVISED

| Phase | Effort | Days | Wave |
|---|---|---|---|
| P1 · CI guards + doc sync | 9hr | 1-2d | Wave 1 |
| P2 · Token discipline sweep | 12hr | 1.5d | Wave 1 |
| P3 · JSDoc WWWWH backfill | 8hr | 1d | Wave 1 |
| P4 · A11y backfill | 10hr | 1.25d | Wave 2 |
| P5 · Motion backfill | 6hr | 0.75d | Wave 2 |
| P6 · True file gaps | 6hr | 0.75d | Wave 2 |
| P7 · Reference page polish | 12hr | 1.5d | Wave 2 |
| P8 · QA + handover | 10hr | 1.25d | Wave 3 |
| **TOTAL** | **73hr** | **9 dev-days** | |

**Realistic calendar** · 2-week sprint w/ 5 agents parallel · OR 1.5-week if agents fully utilized in waves.

**Savings vs prior plan** · 113hr (61% reduction) · because component porting was already done.

---

## Critical Path · REVISED

```
Wave 1 (parallel · 1.5d max)
  ├─ P1.1 doc audit (Haiku)
  ├─ P1.2+1.3 CI scripts (Sonnet)
  ├─ P2.a worst organisms (Sonnet)
  ├─ P2.b atoms+molecules tokens (Sonnet)
  └─ P3 JSDoc backfill (Sonnet)
        ↓
Wave 2 (parallel · 1.5d max · after Wave 1 token landscape stable)
  ├─ P4 a11y (Sonnet)
  ├─ P5 motion (Sonnet)
  ├─ P6 true gaps (Sonnet)
  └─ P7 page polish (Sonnet)
        ↓
Wave 3 (sequential · 1.25d)
  └─ P8 QA + handover (aura-qa + main)
```

**Wall-clock w/ full parallelization · ~4 dev-days w/ aggressive fan-out**

---


## Acceptance Criteria · DS v2 SHIP

DS v2 is ready to ship when ALL of:

1. ✅ **Token discipline** · zero undefined `var(--*)` refs · CI guard active
2. ✅ **Component discipline** · zero raw `<button>` · zero `ArrowRight` · zero static `<ArrowUpRight>` · CI guard active
3. ✅ **Atom parity** · 34/34 atoms ported · WWWWH headers · TS interfaces · stories
4. ✅ **Molecule parity** · 22+/27 molecules ported · composition tested
5. ✅ **Organism parity** · cross-pillar (6) + case study (10) + RS home (10) + RS listing (5) = 31/40 minimum
6. ✅ **Page compositions** · 4 reference pages live (sample · case study · RS home · RS listing) · pass visual diff
7. ✅ **A11y** · WCAG AAA · Lighthouse 95+ · axe zero violations
8. ✅ **Motion** · prefers-reduced-motion respected · 60fps · Framer-only
9. ✅ **Docs** · FOUNDATIONS.md + RULES.md + per-atom WWWWH JSDoc · single source of truth
10. ✅ **Memory + LEARNINGS** · all decisions persisted · cross-session sync verified

---

## Risk Register

| # | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| 1 | Atom port introduces regression in /sample | M | M | aura-qa visual diff after each atom · `webapp-testing` skill |
| 2 | Tailwind v4 + DS class scan gap recurs | L | H | `@source` directive already shipped (2026-05-14 fix) · monitor |
| 3 | OG behavioral edge case missed in port | M | M | Manual visual comparison w/ OG :3010 reference · capture screenshot diff |
| 4 | DTCG tokens.css regen breaks core-v2 overrides | L | H | Unlayered `:root {}` in base.css always wins · documented in §22 FOUNDATIONS.md |
| 5 | Sprint scope creep (Surveys · admin · etc) | H | M | DEFER P3.6 survey molecules + P4.4 supporting organisms unless explicit user OK |
| 6 | Variant cinematic-dark bugs after light-mode polish | M | M | Test both variants on every reference page |

---

## Out-of-Scope (deferred to v3+)

- Storybook deployment
- Anatomy diagrams (per atom)
- Decision-tree pages (separate docs)
- BigNumber atom · DataTable molecule (no OG reference)
- Style Dictionary regen w/ corrected shadow values
- Multi-platform output (iOS/Android Swift/Compose)
- Dark mode beyond cinematic-dark variant
- i18n
- RTL support
- Component analytics (heatmaps · usage tracking)
- Figma Code Connect mapping

---

---

## Plan Integrity Check (deviation self-verify)

**Run this check before every DS-related task.**

### Step 1 · Is the task in the plan?

```
Task description: "<paste task>"

Match against phases:
  □ P1 · Doc sync + CI guards         → §P1 sub-tasks 1.1/1.2/1.3
  □ P2 · Atoms completion             → §P2 atom list (14 + 6 filter)
  □ P3 · Molecules completion         → §P3 molecule list (22 + 4 survey)
  □ P4 · Organisms completion         → §P4 organism list (6 cross + 10 case + 15 RS)
  □ P5 · Hooks completion             → §P5 hook list (5)
  □ P6 · Page compositions            → §P6 page list (4 reference pages)
  □ P7 · QA + handover                → §P7 sub-tasks 7.1/7.2/7.3
  □ Out-of-scope (deferred v3+)       → §Out-of-Scope list
  □ NOT IN PLAN                       → flag deviation · STOP

If NOT IN PLAN → STOP · flag to user · options:
  (a) Add to plan as new sub-task w/ effort estimate
  (b) Mark deferred to v3+
  (c) Skip + explicit user OK
```

### Step 2 · Acceptance criteria for this task

Look up the phase. Each phase has acceptance criteria. The task must meet ALL of:

- Phase-specific acceptance (e.g. P2 atom: WWWWH header + TS interface + tokens + a11y + story + /sample test)
- All 7 execution discipline gates (from `feedback_execution_discipline.md`)
- All applicable rules from `RULES.md` (token discipline · component discipline · a11y · motion)

### Step 3 · Self-check before delivery

Before marking task done · verify:

```
□ Task matched a phase in plan (Step 1)
□ Acceptance criteria all met (Step 2)
□ 7 gates passed (execution discipline memory)
□ Live-tested on consumer page (NOT just standalone demo)
□ Zero raw HTML where DS atom exists
□ Zero hardcoded hex (grep verified)
□ Memory + LEARNINGS updated if new pattern surfaced
□ Plan progress updated (mark sub-task complete · log actual vs estimated effort)
```

### Step 4 · Update the plan after delivery

After completing a phase sub-task:
1. Mark complete in this file (append `✅ DELIVERED 2026-MM-DD` to row)
2. Log actual effort vs estimated (capture variance for future estimates)
3. If discovered new dependency or gap → add as new sub-task
4. Update memory `project_ds_v2_plan_canonical.md` if structural changes

### Step 5 · Deviation log

If a task deviates from plan, log here:

| Date | Task | Plan deviation | User OK? | Resolution |
|---|---|---|---|---|
| _example_ | "Add new Tooltip variant" | Not in P2 atom list (only base Tooltip planned) | YES | Added as P2.1 sub-task #15 · 2hr |

(table grows as deviations occur)

---

## How to read this plan in future sessions

Every new Claude session starts cold. Workflow to resync:

```bash
# 1. Read pinned canonical docs (auto-loaded via memory)
cat design-system/core-v2/docs/EXECUTION_PLAN.md      # this file
cat design-system/core-v2/docs/RULES.md
cat design-system/core-v2/docs/FOUNDATIONS.md

# 2. Check progress against acceptance criteria
grep "✅ DELIVERED" design-system/core-v2/docs/EXECUTION_PLAN.md
# Should show all completed sub-tasks

# 3. Check active learnings
sed -n '/## Active/,/^---$/p' docs/LEARNINGS.md
# Last 5 entries · honor recent corrections

# 4. Check decisions
grep "## Active" docs/DECISIONS.md
# Locked decisions still binding

# 5. Confirm /sample reference page health
curl -s http://localhost:3000/sample > /dev/null && echo "OK"
```

If any of above missing or stale → STOP · ask user before resuming.

---

**End of EXECUTION_PLAN.md · v2 sprint plan · ~186hr · 23 dev-days · pair w/ RULES.md + FOUNDATIONS.md as canonical reference**

**Version:** 1.0
**Locked:** 2026-05-15
**Owner:** Aura (Opus) · executes via aura-builder Sonnet subagent
**Review cadence:** End of each phase · update acceptance criteria + capture learnings
