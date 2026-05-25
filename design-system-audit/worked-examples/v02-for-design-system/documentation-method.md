# Documentation Method · V0.2 -for design system

**WHAT** — The WWWWH framework + supporting structure that V0.2's 98 sidecar MDs use to capture intent. This is the REAL deliverable of V0.2 (the running app is the demo · the docs are the product).

**WHY user said "captures reasons better"** — Every visual choice has explicit `## WHY` before code or visual reference. Other Ken projects document WHAT (here's a button) but not WHY (because action-color must equal brand-color so eye associates conversion with identity). V0.2 docs answer reviewer-style questions before they're asked.

**WHEN to reference this method ✅**
- Writing new component docs in new DS
- Establishing doc conventions for any new project
- Onboarding new designers/devs/AI agents
- Reviewing intent before changing a token

**WHEN NOT ❌**
- Don't copy V0.2's 98 MDs wholesale · de-duplicate to ~25 canonical
- Don't copy doc-as-code pattern of inline hex · DS docs reference tokens

**WHERE applied in V0.2** — All 98 root MDs · most disciplined in PART1-7 (~60 component entries follow template strictly).

**HOW the method works** (extracted template):

```md
## Component Name

### WHAT
1-sentence definition. No fluff.

### WHY
3-5 bulleted business justifications. WHY this exists at all. WHY in this codebase. WHY this shape.

### WHEN
✅ DO use for:
- concrete use case 1
- concrete use case 2
- concrete use case 3

❌ DON'T use for:
- misuse case 1 (use X instead)
- misuse case 2 (use Y instead)

### WHERE
- file:line citation 1 · context
- file:line citation 2 · context
- (at least 3 citations · concrete sections in this codebase)

### HOW
Code snippet per variant. EACH variant has a "Use When:" sub-rationale.

```tsx
// Default · use when standard data card
<StatCard ... />
```

### PROPERTIES
| prop | type | default | purpose · why this exists |
|---|---|---|---|
| value | string | — | display number · centered prominence |
| label | string | — | semantic label · below value |

### STATES
- Default: described
- Hover: described + reasoning
- Focus: described + a11y
- Active: described
- Disabled: described

### COLOR RULES
Explicit token + hex per token usage. WHY this color · what alternative was rejected.

### REUSABILITY SCORE
⭐⭐⭐⭐⭐ (1-5) + bulleted rationale.
- ⭐⭐⭐⭐⭐ = repository-grade · used 5+ sections
- ⭐⭐⭐⭐ = high reuse · 3-4 sections
- ⭐⭐⭐ = moderate · 1-2 sections + likely future use
- ⭐⭐ = niche · 1 section
- ⭐ = page-specific · won't be reused
```

---

## Top 10 docs extracted from V0.2 root

### 1. `START_HERE.md` (10.9KB)
**Onboarding + decision tree.** 3-step page-build flow (Copy template → Add components → Follow color rules) + RED/PURPLE/GREY decision tree + 4-section quality checklist.

### 2. `QUICK_REFERENCE.md` (7.9KB)
**One-page cheat sheet.** Color table (RED #b01f24 · PURPLE #7f5fe3 · grey tokens) · when-to-use RED/PURPLE/GREY · section structure recipe · 4 component patterns (Primary CTA · Outline · StatCard · IconCard) · decision tree · typography rules · import methods (contextColors · CSS vars · direct colors).

### 3. `MASTER_COMPONENT_INDEX.md` (14.1KB)
**The constitution.** Quick reference + implementation checklist + component selection guide + 4 common patterns + **THE 10 COMMANDMENTS at lines 287-338** ← single most important doc fragment in V0.2.

### 4. `COMPREHENSIVE_COMPONENT_ANALYSIS_PART1.md` (25KB)
**Foundation atoms.** Cards (StatCard · IconCard · AnalysisCard) + Card Comparison Matrix + Colors (RED purpose/use · PURPLE purpose/use · semantic) + Icons + Shadows.

### 5. `COMPREHENSIVE_COMPONENT_ANALYSIS_PART5.md` (24.5KB)
**Page-level organisms.** HeroSection (7-layer composition · RAF animations · gradient overlays) · Header · Footer · FloatingCTA · MindMap · MarketDataTable · InlineStats.

### 6. `MIGRATION_GUIDE.md` (23.2KB)
**Refactor playbook.** 6 phases (Prep → Setup → Execute → Validate → Polish → Document) · audit/map/gap-analysis steps · per-section migration order · dependency install list · common pitfalls.

### 7. `DESIGN_SYSTEM_MASTER_PLAN.md` (10.4KB)
**6-phase rollout.** Discovery 1h · Foundation 1.5h · Atomic 2h · Composite 3h · Layout 2h · Docs 2h = 11.5h total. Per-phase deliverables · DS folder structure proposal · 5 design principles (Consistency · Composability · A11y · Responsive · Performance) · progressive enhancement strategy · 5 quantitative + 4 qualitative success metrics.

### 8. `TOC_DOCUMENTATION.md` (16.8KB)
**Sticky-TOC deep dive.** TableOfContentsSidebar architecture · useScrollSpy hook · scroll tracking algorithm (bottom-up scroll-position loop) · 3-state model (completed/active/upcoming) · progress formula `(activeIdx+1)/total * 100` · smooth scroll w/ `offset = 120` · full color/typography rules for expanded vs collapsed.

### 9. `DESIGN_SYSTEM_MASTER_INDEX.md` (26.9KB)
**Cross-reference index.** Maps every component to every doc location · prevents fragmentation when 98 MDs exist.

### 10. `MASTER_DESIGN_SYSTEM_SUMMARY.md` (24.5KB)
**Final summary.** TL;DR of whole system · what's covered · what's not · who-uses-what.

---

## The 10 Commandments (verbatim · MASTER_COMPONENT_INDEX.md:287-338)

1. **Consistent Padding** — `px-[84.375px] lg:px-[112.5px]`
2. **Color Semantics** — RED = brand / action · PURPLE = data
3. **Font Usage** — Noto Serif h1-h6 only · DM Sans else
4. **Alternating Backgrounds** — odd = white · even = grey-50
5. **Icon Sources** — Phosphor for data · Lucide for UI · centralized stakeholder/segmentation registries
6. **Shadow Hierarchy** — purple for data · grey for interactive · none for factual
7. **Hover States** — 300ms · purple shadow for data · border-darken for parameters
8. **Grid Responsive** — mobile 1col · tablet 2col · desktop 2-4col
9. **Component Composition** — DRY · compose complex from simple · never recreate
10. **Accessibility** — semantic HTML · color + text never alone · high contrast · keyboard reachable

---

## REUSABILITY SCORE pattern (key insight)

Every component rated 1-5 ⭐ with bulleted rationale (e.g., "highly reusable" · "4 variants cover all use cases" · "flexible props"). Lets teams triage: which are repository-grade vs page-specific.

Examples found in PART1-7:
- StatCard ⭐⭐⭐⭐⭐ — "5 variants · data display · most reused"
- IconCard ⭐⭐⭐⭐⭐ — "flexible icon + label · multi-context"
- SegmentationCard ⭐⭐⭐⭐⭐ — "7 cuts use this · indexed icon"
- StakeholderCard ⭐⭐⭐⭐ — "8 stakeholders · TargetAudience only"
- TimelineCard ⭐⭐⭐ — "MarketOverview only · niche but present in PRD"
- MindMap ⭐⭐ — "ScopeOfReport only · expensive d3"
- PlayerVariantSwitcher ⭐ — "debug widget · strip on port"

---

## ✅ DO / ❌ DON'T pattern

Every component's `## WHEN` section has paired lists. ~60 instances across PART1-7. Prevents misuse by being explicit before someone has to ask.

Example for IconCard:
```md
### WHEN ✅ DO use for:
- Feature/benefit grids w/ icon + 2-line description
- Methodology step illustrations
- Stakeholder type cards
- Service offering cards

### WHEN ❌ DON'T use for:
- Stat display (use StatCard · purple shadow signals data)
- Hero CTAs (use Button · brand action)
- Navigation links (use NavLink · sticky context)
- Tags/badges (use Badge · pill shape)
```

---

## Decision trees

At least 3 explicit decision trees in V0.2:

1. **Color choice** (`START_HERE.md:142-164`):
   - Is it brand / action? → RED
   - Is it data / analysis? → PURPLE
   - Is it content / neutral? → GREY
   - Is it semantic (success/error/warning)? → use semantic colors (NOT brand red)

2. **Component selection** (`MASTER_COMPONENT_INDEX.md:209-233`):
   - Card with number? → StatCard (PURPLE shadow)
   - Card with icon + text? → IconCard
   - Card representing a person/role? → StakeholderCard
   - Card representing a timeline event? → TimelineCard
   - Card for compare/contrast? → ComparisonParameterCard (border-darken)
   - Card with d3 viz? → MindMap

3. **When to migrate** (`MIGRATION_GUIDE.md:24-72`):
   - Building new section · already have similar in another project? → CHECK first · compose · don't recreate
   - Have inline hex? → Replace w/ token before merging
   - Have hover behavior? → Match tri-modal language per content type

---

## Reasons + Decisions log

- **WHY 98 MDs?** Iterative discovery during build · each phase produced new audit/spec docs · NOT all canonical · ~30 are redundant audits. Compress to ~25 on port.
- **WHY WWWWH not 4WH (WHY/WHEN/WHEN-NOT/HOW)?** Adds WHERE (concrete file:line references) · forces grounding in actual code · prevents abstract guidance.
- **WHY paired ✅/❌ lists?** Boundary-setting > description. Tells reader what NOT to do as explicitly as what to do.
- **WHY REUSABILITY SCORE?** Quantifies "should this be repo-level" decision. Stops drift of building 5 niche variants when 1 universal would do.
- **WHY decision trees as docs not code?** Decision trees are designer-facing · should be readable without TypeScript fluency. Code generates from decisions · not vice versa.

---

## REUSABILITY SCORE

⭐⭐⭐⭐⭐ — Documentation METHOD is repo-grade · should be the standard for ALL Ken DS docs going forward. Specific docs (98 MDs) need pruning · but the framework is gold.

## Linked concepts
- `00_overview.md` — V0.2 identity
- `report-pdp-anatomy.md` — sister doc applying method to one page
- `pattern-lessons.md` — what to replicate from this method
- `og-audit/00_overview.md` — OG's older documentation strategy (3-tier docs not 98 MDs)
- `01_methodology.md` (audit root) — the WWWWH spec that drives this whole audit
