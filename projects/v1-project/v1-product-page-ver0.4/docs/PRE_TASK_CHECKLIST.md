# Pre-Task Checklist · v0.4 PDP

**Authority:** Aura constant-learning rule (memory `feedback_constant_learning_mechanism.md` ★★★)
**Applies to:** every task in `v1-product-page-ver0.4` · no exceptions
**Last updated:** 2026-05-21

---

## The 5-step gate

Before ANY task on this project · run this checklist · emit trace marker proof.

### Step 1 · Scan memory (top 8 entries)

```
→ Pre-task scan: MEMORY.md ★/★★/★★★ entries
```

Quick checks:
- Has user already decided this? → use that decision
- Is there a "no patchwork" / "no half-baked" rule that applies? → respect it
- Is there a stakeholder rule re color/font/gating/sourcing? → follow it
- Is there a feedback memory I need to apply (workflow · scope · execution)? → apply

**Key memories for THIS project:**
- `feedback_constant_learning_mechanism.md` ★★★ — this gate itself
- `feedback_no_patchwork.md` ★★★ — when libraries fight, build wrapper not patches
- `project_ref_patterns_v04_pdp.md` ★★ — all ref patterns + stakeholder rules
- `feedback_canonical_workflow_reset.md` ★★★ — 6 scenarios A-F routing

### Step 2 · Scan project docs/

```
→ Pre-task scan: projects/v1-project/v1-product-page-ver0.4/docs/
```

Existing guides (use them · don't reinvent):

| Doc | When to use |
|---|---|
| `REF-PATTERNS-ADOPTION.md` | Any UI/layout/visual decision · refs already mined |
| `COLOR-USAGE-GUIDE.md` | Any color/palette decision · 4-tier budget locked |
| `FONT-PAIRING-GUIDE.md` | Any typography decision · size/family mapping locked |
| `CHARTS-TABLES-PATTERNS.md` | Any chart/viz/table decision · per-section plan locked |
| `TABS-SWITCHERS-INFO-COMPOSITION.md` | Any tab/switcher/accordion decision · UX-law-checked patterns |
| `SOURCE-PROVENANCE.md` | Any source/citation decision · tier registry locked |
| `PRE_TASK_CHECKLIST.md` | This file · run it every time |

### Step 3 · Check refs (if UI/UX/design task)

```
→ Pre-task scan: refs (rainbow-pothos · merged-report)
```

Refs are CONFIDENTIAL Ken Research deliverables · learned 2026-05-21 · patterns saved in `REF-PATTERNS-ADOPTION.md`. Don't re-fetch URLs · read saved analysis.

**Ref-aligned patterns already extracted:**
- Stat callouts borderless · 32-48px serif num + 12px italic descriptor
- Tables horizontal rules only · 40-48px rows · numeric right-align
- Charts naked · no card frame · hairline gridlines
- Italic for sources/quotes/thematic descriptors only
- "What this means for X" closing line per section
- 60-80px section padding

### Step 4 · Check skills

```
→ Pre-task scan: skills/SKILL_ROUTING.md
```

12 active skills · pick the right one (or none):

| Task type | Skill |
|---|---|
| Ken-design decisions | `aura-design` |
| Per-section craft pass (step 4.5) | `aura-craft` |
| Page build from recipe | `/page` |
| QA · Playwright · axe · Lighthouse | `webapp-testing` (via `aura-qa` agent) |
| Frontend polish/critique | `impeccable` |
| Large-repo context (>50 files / >100k tokens) | `graphify` |
| Output compression | `caveman` (auto via hooks) |

Skill = right tool. Skipping = re-inventing.

### Step 5 · Grep existing code

```
→ Pre-task scan: src/ for existing pattern
```

Before writing a new component/util/style:
- `grep -rn "ComponentName" src/components/` — does it exist already?
- `grep -rn "utility-pattern" src/lib/` — already utility?
- Check `src/components/charts/` for chart wrappers (KenColumnChart shipped · KenLineChart/KenStackedBarChart/etc. follow same pattern)
- Check `src/components/atoms/` (PremiumLockCard · GatedBlock · SourceCluster · ChartFigure all shipped)

---

## Trace marker template

Emit this BEFORE starting any task (single line, all 5 steps OR what was scanned):

```
→ Pre-task scan: MEMORY ★★★no-patchwork+constant-learning · docs CHARTS-TABLES + FONT-PAIRING · refs ref-patterns-adoption · skills aura-craft · src/components/charts existing
```

Or shorter (just the relevant ones):

```
→ Pre-task scan: feedback_no_patchwork + CHARTS-TABLES-PATTERNS + src/components/charts/KenColumnChart
```

If any scan returns "nothing relevant", trace marker says so · explicit.

---

## Common task types · short pre-task scan

### "Build a new chart"
1. `feedback_no_patchwork.md` → if `@ken-research/charts` doesn't fit, build local wrapper
2. `CHARTS-TABLES-PATTERNS.md` § per-section plan
3. `COLOR-USAGE-GUIDE.md` § 3.2 (data viz palette)
4. `src/components/charts/_theme.ts` (shared Highcharts theme · reuse)
5. `src/components/charts/KenColumnChart.tsx` (reference pattern · model new wrapper on this)
6. `src/components/charts/ChartFigure.tsx` (wrap chart for UX context)

### "Add gating to a section"
1. `project_ref_patterns_v04_pdp.md` § gating rules
2. `CHARTS-TABLES-PATTERNS.md` § 5 (gating decision matrix per chart)
3. `src/components/atoms/GatedBlock.tsx` (existing wrapper)
4. `src/components/atoms/PremiumLockCard.tsx` (3 variants: default/compact/minimal)
5. Pick variant per slot size · refs canonical

### "Add a new tab/switcher"
1. `TABS-SWITCHERS-INFO-COMPOSITION.md` § UX law check (Jakob · Hick · Doherty · Miller · Fitts)
2. § 7 per-section adoption plan (which sections use which switcher)
3. Canonical filled-black pill TabsList style (already exists in §04 · §05 · §07)
4. Tab labels ≤3 words · 2-7 options max

### "Color decision"
1. `COLOR-USAGE-GUIDE.md` § 3 palette per use case
2. § 5 per-section budget (max 3-4 distinct colors per section)
3. § 4 anti-patterns (banned: red prose emphasis · per-tag color · etc.)
4. Brand-red CTAs only · charts use periwinkle/perano/purple

### "Font / type decision"
1. `FONT-PAIRING-GUIDE.md` § 3 size + family mapping
2. § 4 italic usage (sources · quotes · thematic descriptors only)
3. § 8 per-component canonical spec
4. NEVER serif under 16px · always DM Sans for small/dense

### "Source attribution"
1. `SOURCE-PROVENANCE.md` § 3-tier model
2. `src/lib/sources.ts` (25 citations · use existing IDs · don't fabricate)
3. `src/components/atoms/SourceCluster.tsx` (collapsed-default · already shipped)

---

## Forcing functions

- This file lives in project `docs/` · indexed in memory · auto-loaded reference
- Trace marker `→ Pre-task scan:` must appear BEFORE task work begins
- If no trace marker · self-correct · scan now · then proceed
- After task · note in memory: did skipping pre-task scan cost me anything?

---

## Anti-patterns (banned per `feedback_constant_learning_mechanism.md`)

1. Starting any task without scanning memory + docs first
2. Asking user a question that's already answered in memory
3. Patching a library when memory says "wrapper exists / library fights overrides"
4. Building a new component when existing one in `src/components/` already does it
5. Re-fetching ref URLs when analysis is already saved in docs
6. Saying "shipped" before aura-qa confirms

---

## Self-audit (every 20 turns OR end of session)

- Did I emit `→ Pre-task scan:` trace marker on major tasks? Y/N
- Did I cite refs/docs/memories in decisions? Y/N
- Did user catch a "should have known" mistake? Y/N · IF YES · add memory entry now
- Tokens burned on re-discovery vs new work? Aim: <10% on re-discovery

If self-audit fails · add a forcing function (memory entry · doc update · hook).

---

## Related

- `MEMORY.md` (workspace · auto-loaded boot index)
- `feedback_constant_learning_mechanism.md` (this rule's authority)
- `feedback_no_patchwork.md` (specific application · libraries)
- `CLAUDE.md` (workspace boot · ref to this file)
- `skills/SKILL_ROUTING.md` (skill picker)
- `workflows/CANONICAL-WORKFLOW.md` (6 scenarios routing)
