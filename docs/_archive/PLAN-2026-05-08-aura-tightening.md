---
title: Aura tightening sprint — doc sanity + skill prune + selective agents/workflows + finish aura-design Phase 2
generated: 2026-05-08
status: draft, awaiting user approval
owner: Aura (Opus main)
---

# Aura tightening sprint — Plan

User intent (verbatim): "skill in progress that we need to build correctly, find out what was that and before that we need to update all docs and files and contains file structure knowledge and mapping what to use where and why use, what use, where use, when use, how use … find out which is not updated, also work on file sanity, reduce skills not of use, use selective skills + selective agents + selective workflows necessary for build/design pages/planning/research."

## Who you are (Aura's read of user)

- **Identity:** design@kenresearch.com — design lead at Ken Research (global market-research firm).
- **Workspace role:** runs frontend + DS evolution + handover to tech team. Local full-stack OK (frontend/backend/DS). No remote push, no prod, no deploy.
- **Cadence:** sprint-based, ships projects from `projects/*` to tech team via 13-point handover gate.
- **Voice preference:** caveman-FULL output (fragments, terse) + verbose for design critique. Scenario-aware.

## Tasks user wants Aura focused on

1. **Build/design pages** for Ken surfaces (Discovery, Report Store, Report Viewer, Dashboards, Engagement) — recipe-driven, DS-grounded.
2. **Planning** — pre-build plans w/ Plan agent, scope-decision support.
3. **Research** — competitive (`ken-research` skill), strategic wedge protection, anti-pattern flagging.
4. **DS evolution** — token/atom/recipe additions, Aura-infra hygiene.
5. **Handover prep** — pre-handover gates, status docs.

Everything else is non-essential. Plan optimizes around these 5.

---

## What's in this plan

Five tracks. Each = independent, can run sequentially or partially in parallel. Tracks 1-2 are blocking for Track 5 (skill-in-progress completion).

| # | Track | Scope | Blocker? | Est |
|---|---|---|---|---|
| 1 | **Doc sanity sweep** | Update stale path refs (`core/` → `core-v2/`), skill counts, post-sprint state | Yes (blocks 5) | 1-2 hr |
| 2 | **What/where/why/when/how mapping** | Single `INDEX_BY_CATEGORY.md` covering 6 skills + 5 workflows + 3 agents w/ what/where/why/when/how columns | Yes (blocks 5) | 1 hr |
| 3 | **Skill prune (REVISED 79 → 6)** | Aggressive prune per user direction. Archive 71. Delete 2. | No (parallel) | 1.5 hr |
| 3b | **Workflow narrow (REVISED 11 → 5+2)** | Ken-only workflows. Merge motion/a11y/refactor/content. | No (parallel) | 1 hr |
| 4 | **Agent skill-ref updates** | Sync agent templates to 6-skill set | After 3 | 0.5 hr |
| 5 | **Finish aura-design Phase 2** | 4 missing surface files + 5 decision-trees + 2 brand-variant detail files + workflow chain | After 1+2 | 4-6 hr |

**Total runway:** ~9-12 hr.

---

## Track 1 — Doc sanity sweep

### What's stale (found in recon)

| File | Line(s) | Issue | Fix |
|---|---|---|---|
| `CLAUDE.md` | L55-56, L58, L77, L204 | Points at `design-system/core/` (v1 frozen) for active DS work | Swap to `design-system/core-v2/` w/ note "v1 retained read-only" |
| `Quick_start_guide.md` | L7, L38, L78 | Same — `design-system/core/` as canonical | Swap to `core-v2/`, link `docs/WORKSPACE-MAP.md` for full topology |
| `FOLDER_CONTEXT.md` (root) | L8 | "77 curated AI skills (13 categories)" | Re-count to actual (79 currently, 25 after prune) |
| `skills/FOLDER_CONTEXT.md` | exists? | check | verify aligned |
| `skills/INDEX_BY_CATEGORY.md` | L5 | "77 curated" | re-count after Track 3 prune |
| `skills/aura-design/SKILL.md` | description block | refs `design-system/core/src/styles/theme.css` (v1 path) | Swap to `core-v2` paths; update Phase 1 status |
| `.claude/agents/aura-builder.md` + `workflows/agents/aura-builder.md` | DS path refs | Same v1 paths | Sync swap (dual-path rule) |
| `HANDOVER_TRACKER.md` | check | post-sprint state may need refresh | verify 6 sprint entries reflect current |
| `workflows/ROUTING.md` | check | 11 workflows — narrowing depends on Track 4 | flagged in Track 4 |

### Method
- One pass per file. Use `Edit` w/ `replace_all` where path appears 2+ times. Don't grep-and-replace — read context first (some refs to `core/` mean "the canonical DS folder" semantically, others mean "v1 specifically").
- After each fix, append CHANGELOG entry.

### Acceptance
- `grep -rn "design-system/core/" --include="*.md"` returns only references in `MIGRATION_FROM_V1.md`, `LEGACY-READONLY.md`, sprint audit folder, and explicit "v1 legacy" call-outs.
- All counts match reality.

### Subtasks (checkable)
- [x] CLAUDE.md path refresh (4 sites) + skills count refresh
- [x] Quick_start_guide.md path refresh (3 sites) + add WORKSPACE-MAP pointer
- [x] FOLDER_CONTEXT.md (root) skill count refresh + post-sprint folder list
- [x] skills/INDEX_BY_CATEGORY.md count refresh (after Track 3)
- [x] skills/aura-design/SKILL.md path refresh + Phase 1/2 status update
- [x] .claude/agents/aura-builder.md + workflows/agents/aura-builder.md sync swap
- [x] HANDOVER_TRACKER.md verify post-sprint state
- [x] CHANGELOG entry per file batch
- [x] Final grep-audit: zero stale `core/` refs outside legacy-explicit contexts

---

## Track 2 — What/where/why/when/how mapping

### Goal
For every active artifact (folder, skill, agent, workflow, recipe), Aura can answer in <5 seconds:
- **What** = artifact does
- **Where** = it lives (path)
- **Why** = it exists (problem solved)
- **When** = to invoke (trigger conditions)
- **How** = to invoke (cmd / spawn pattern)

### Where this knowledge lives today (and the gaps)

| Knowledge | Current home | Complete? | Gap |
|---|---|---|---|
| Workspace folder structure | `docs/WORKSPACE-MAP.md`, `FOLDER_CONTEXT.md` (root + skills/) | YES (just shipped) | Map needs project-stack column |
| Skill what/when | `SKILL_ROUTING.md` (trigger table), `INDEX_BY_CATEGORY.md` (group view) | PARTIAL | No why/how column. No "skill X used by workflow Y" bidirectional map |
| Agent what/when/how | `workflows/ROUTING.md` model-tier table + agent template files | PARTIAL | Spawn examples scattered, not consolidated |
| Workflow what/when | `workflows/ROUTING.md` (11 named workflows w/ steps) | YES | But 5 workflows likely deprecate per Track 4 |
| Project what/where | `HANDOVER_TRACKER.md` + `docs/WORKSPACE-MAP.md` | YES | OK |
| DS recipe what/where/how | `design-system/recipes/*.md` + `recipes/RECIPES.md` | PARTIAL | No central recipe index w/ trigger phrases |
| Brand tokens | `Quick_start_guide.md` + `tokens/build/tokens.css` | YES | OK |
| Anti-patterns | `design-system/ANTI_PATTERNS.md` (Cat 1-14) | YES | OK |
| Strategy / wedge | `strategy/` folder | YES (skill `ken-research` reads it) | OK |

### Plan: 2 new "USE-GUIDE" indexes + 1 audit

**A. `skills/USE_GUIDE.md`** — single table per skill: `what · where · why · when (trigger) · how (invoke)`. Replaces split between SKILL_ROUTING + INDEX_BY_CATEGORY for the **selective set** (post-prune).

**B. `workflows/USE_GUIDE.md`** — same shape per workflow + per agent. Replaces scattered spawn examples in ROUTING.md w/ canonical reference.

**C. Audit pass** — for each USE_GUIDE entry, validate `when` triggers ≠ ambiguous (e.g., `aura-design` trigger phrases overlap w/ generic design ones — need disambig priority).

### Acceptance
- Both USE_GUIDE files written.
- CLAUDE.md adds 2 pointers ("Skills: see `skills/USE_GUIDE.md`. Workflows: see `workflows/USE_GUIDE.md`").
- Aura can answer "what skill for X" / "what agent for Y" / "what workflow for Z" by reading ≤1 file.

### Subtasks (checkable)
- [ ] Draft `skills/USE_GUIDE.md` post-prune (depends on Track 3 selective set)
- [ ] Draft `workflows/USE_GUIDE.md` post-narrow (depends on Track 4)
- [ ] CLAUDE.md add pointers
- [ ] Audit trigger overlap, add disambig rules
- [ ] Cross-link from CLAUDE.md / WORKSPACE-MAP.md / SPRINT-LEARNINGS

---

## Track 3 — Skill prune (79 → 6 essential, REVISED 2026-05-08)

User direction: "5-6 skills only, main skills, finalize w/ proper reasoning. Workflows useful for Ken Research only."

### Method
Map each candidate skill to a user-task category. Keep ONLY if:
- (a) covers a Ken-task category no other skill covers, AND
- (b) Aura cannot do equivalent work natively w/ tools (Read/Edit/Write/Grep/Bash) + memory + workflow templates.

Test (b) is the killer — most skills are "convenience layers" Aura can replicate by reading docs once + applying judgment. Real skills earn their slot via deep domain knowledge or reusable assets (token catalogs, anti-pattern lists, eval suites, test harnesses).

### Final selective set (6)

| # | Skill | Category | Why irreplaceable |
|---|---|---|---|
| 1 | **`aura-design`** | Build / design | Ken design second-brain — 5 surfaces · 2 brand variants · anti-patterns · voice · recipe router. Encodes ALL Ken-specific design decisions. NOT replicable by reading docs each time — too dense. **Phase 2 still pending** (Track 5). |
| 2 | **`ken-research`** | Research / wedge | Anchored in `strategy/` — competitive playbook, claim-guard, wedge protection, eval suite (ran iteration-1 benchmark 22/24 hard assertions). Encodes "verified > vibes" voice + sourcing discipline. NOT replicable by Aura on the fly. |
| 3 | **`page`** | Build / planning | Recipe-driven page builder `/page <intent>`. Round-trip = recipe → DS compose → aura-builder → aura-qa. Replaces ad-hoc page builds. Wires the other 5 skills + 3 agents. Slash-command surface user already uses. |
| 4 | **`webapp-testing`** | QA | Playwright local — concrete tooling Aura cannot replace w/ judgment. Real test harness. Used by aura-qa workflow. |
| 5 | **`gsap-scrolltrigger`** | Build (motion) | GSAP ScrollTrigger config-recipes. Cinematic scroll = recurring need. Not replicable — too many subtle config patterns. Companion `gsap-react` folded INTO this one (consolidate to single GSAP entry). |
| 6 | **`skill-creator`** | Meta / authoring | Used to create/improve/eval skills (incl. aura-design Phase 2 quality). Self-tooling. Run rarely but high-leverage when needed. |

### Why each rejected category

| Category | Examples archived | Reason |
|---|---|---|
| Generic UX (`ui-ux-pro-max`, `expert-ui-ux-designer`, `frontend-design`, `ui-styling`, `design-system`, `design-consultation`) | 6 skills | All overlap `aura-design` for Ken work. Generic UX laws live in `aura-design/voice.md` + `anti-patterns.md`. Frontend code skills are docs Aura reads once on demand. |
| Other GSAP modules (`gsap-react`, `gsap-timeline`, `gsap-core`, `gsap-frameworks`, `gsap-plugins`, `gsap-performance`, `gsap-utils`) | 7 skills | Fold patterns into `gsap-scrolltrigger` as needed. Single entry covers Ken's actual GSAP usage (scroll + timeline). |
| Other QA (`gstack`, `qa`, `qa-only`, `browse`, `benchmark`, etc.) | 7+ skills | Aura-qa agent runs Lighthouse/axe natively via Bash. `gstack` was redundant w/ `webapp-testing`. |
| Reviews (`review`, `design-review`, `devex-review`, `health`, `plan-*`) | 8 skills | Aura's own design-review workflow + aura-qa agent cover. Plan-* skills duplicate the Plan agent. |
| Themes/art/banner (`theme-factory`, `algorithmic-art`, `canvas-design`, `banner-design`, `design-html`, `design-shotgun`, `design`, `brand`, `brand-guidelines`) | 9 skills | All overlap `aura-design` or out-of-scope. Brand canonical in `Quick_start_guide.md`. |
| Documents (`pptx`, `docx`, `xlsx`, `pdf`, `make-pdf`, `slides`, `doc-coauthoring`, `internal-comms`, `slack-gif-creator`, `web-artifacts-builder`) | 10 skills | Out of scope for design lead. Aura writes Markdown natively; user converts as needed via direct tools. |
| Ship / deploy (`ship`, `land-and-deploy`, `setup-deploy`, `canary`, `document-release`, `gstack-upgrade`) | 6 skills | Out of scope per CLAUDE.md "no remote push, no deploy." |
| Safety / context (`careful`, `guard`, `freeze`, `unfreeze`, `autoplan`, `learn`, `context-save`, `context-restore`, `retro`, `office-hours`, `cso`, `codex`, `investigate`, `pair-agent`, `mcp-builder`) | 15 skills | All replicable by Aura natively (Read+Edit discipline) or covered by Plan agent / aura-mech. `learn` covered by manual LEARNINGS.md edits. |
| Misc (`impeccable`, `ken-research-workspace`) | 2 | impeccable = gated opt-in (uninstall — never used in 6 weeks); ken-research-workspace = empty scaffold (delete). |

### Tally (REVISED)
- **Kept: 6**
- **Archived: ~71** (move to `skills/_archive/`)
- **Deleted: 2** (`ken-research-workspace/` empty + `impeccable/` if uninstall confirmed)

### Acceptance
- `skills/_archive/` w/ `README.md` listing what + why per archived skill (recovery path).
- `skills/INDEX_BY_CATEGORY.md` rewritten — 6 skills only, 1 line each, w/ what/where/why/when/how columns.
- `skills/SKILL_ROUTING.md` rewritten — 6-skill trigger table.
- `CLAUDE.md` skill-routing table cut to 6 rows.
- USE_GUIDE collapses INTO `INDEX_BY_CATEGORY.md` (single doc, no duplicate index).

### Subtasks (checkable)
- [x] User confirmed (proceed systematically)
- [x] Create `skills/_archive/` + README
- [x] Move 72 archived skills (batch `mv` per category) — final set: 7 workspace (aura-design · ken-research · page · frontend-design · gsap-scrolltrigger · webapp-testing · skill-creator)
- [x] Archive `skills/ken-research-workspace/` empty scaffold (kept under _archive instead of delete)
- [x] Archive `skills/impeccable/` workspace duplicate (canonical install at `~/.agents/skills/impeccable/`)
- [x] Rewrite `skills/INDEX_BY_CATEGORY.md` (10 entries: 7 workspace + 3 external, w/ what/where/why/when/how)
- [x] Rewrite `skills/SKILL_ROUTING.md` (active-set trigger table + decision tree)
- [x] Update `CLAUDE.md` skill table (cut to 11 rows)
- [ ] Update `feedback_model_routing.md` memory + relevant memories (DEFERRED — next session, lower priority)
- [x] CHANGELOG batch entry

---

## Track 3b — Workflows Ken-only (REVISED, was Track 4)

User direction: "workflows useful for Ken Research only."

### Final workflow set (5 + 1 special)

| # | Workflow | What | When | Skills/agents used |
|---|---|---|---|---|
| 1 | **`page-build`** | Recipe-driven Ken page build | "/page X" or "build [Ken page]" | `page` skill → `aura-design` → `aura-builder` → `aura-qa` |
| 2 | **`design-exploration`** | "What should X look like" | Ambiguity, options needed | `aura-design` (no agent — Opus main) |
| 3 | **`design-review`** | Screenshot/page critique | "review", "critique", "audit design" | `aura-design` (Opus main, no agent) |
| 4 | **`bug-fix`** | Debug + fix (incl. refactor + content-update merged in) | "broken", "fix", "regression" | `aura-builder` or `aura-mech` per scope |
| 5 | **`pre-handover`** | 13-point gate to tech team (incl. a11y/perf/motion/visual passes merged in) | "ready for tech", "handover audit" | `aura-qa` |

### Special (always-on)
| # | Workflow | What |
|---|---|---|
| S1 | **`quick-answer`** | Trivial Q / rename / 1-line — no announce |
| S2 | **`infra-change`** | Aura-meta edits (CLAUDE.md, agents, memories) — mandatory CHANGELOG |

### Dropped
- `component-build` — folded into `page-build` (atom port = recipe step)
- `motion-pass` — folded into `page-build` (animation = part of build)
- `a11y-perf-audit` — folded into `pre-handover`
- `refactor` — folded into `bug-fix`
- `content-update` — folded into `bug-fix` (or direct edit, no workflow needed)
- `impeccable-polish` — drop entirely (uninstall skill)

### Tally
- 11 workflows → 5 + 2 special = **7 total** (vs prior 11)
- All 5 mainline workflows = Ken-task-aligned. No generic.

### Acceptance
- `workflows/ROUTING.md` rewritten — 7 workflows max, classifier table aligned.
- Dropped workflows moved to `workflows/_archive/`.
- `CLAUDE.md` workflow pointer updated.

### Subtasks (checkable)
- [x] User confirmed (proceed systematically)
- [x] Rewrite `workflows/ROUTING.md` — 11 → 9 workflows (page-build · component-build · design-exploration · design-review · motion-pass · bug-fix · pre-handover · quick-answer · infra-change · impeccable-polish gated). `refactor`+`content-update` folded into `bug-fix`. `a11y-perf-audit` folded into `pre-handover`. Per-workflow skill refs updated to active 7-skill workspace + 3 external set.
- [x] Removed workflows in-place (kept inline as folded sub-modes, no separate `_archive/` needed)
- [x] CLAUDE.md workflow pointer updated (skill-routing table refresh covers it)
- [x] CHANGELOG entry

### Acceptance
- `skills/_archive/` created. Archived skills moved (`mv` not delete — recovery path).
- `INDEX_BY_CATEGORY.md` rewritten w/ selective set + "Archived" appendix listing what moved + why.
- `SKILL_ROUTING.md` slimmed to selective set triggers only.
- Memory + CLAUDE.md skill-routing table updated.
- USE_GUIDE.md (Track 2) covers selective set only.

### Subtasks (checkable)
- [ ] User reviews + approves selective set list (some calls subjective)
- [ ] Create `skills/_archive/` + `_archive/README.md` w/ recovery instructions
- [ ] Move archived skills (`mv` per category)
- [ ] Delete `ken-research-workspace/` empty scaffold
- [ ] Rewrite `INDEX_BY_CATEGORY.md`
- [ ] Slim `SKILL_ROUTING.md`
- [ ] Update CLAUDE.md skill-routing table
- [ ] CHANGELOG batch entry

---

## Track 4 — Agents (no prune, just confirm)

3 agents today, all kept:

| Agent | Tier | Used by workflow |
|---|---|---|
| `aura-builder` | L1 Sonnet | page-build, bug-fix |
| `aura-mech` | L0 Haiku | bug-fix (locked-scope only) |
| `aura-qa` | L1 Sonnet | page-build, pre-handover |

Native: `Explore` (find/search), `Plan` (multi-file research), `general-purpose` (fallback). All selective.

**Action:** dual-path sync (`.claude/agents/` + `workflows/agents/`) stays. No move, no archive. Spawn templates updated to reference 6-skill set only.

### Subtasks (checkable)
- [x] Update `.claude/agents/aura-builder.md` skill references → active set + core-v2 paths
- [x] Update `.claude/agents/aura-qa.md` skill references → webapp-testing + impeccable + Playwright-native (gstack removed)
- [x] Mirror to `workflows/agents/*.md` (dual-path sync)
- [x] CHANGELOG entry
- [ ] `.claude/agents/aura-mech.md` audit (no changes needed — mech rarely loads skills, boundary check rules unchanged)

---

## Track 5 — Finish aura-design Phase 2 (the skill-in-progress)

### What was found in progress
**`skills/aura-design/`** — Phase 1 shipped 2026-04-30 (per ADR). Phase 1 = SKILL.md + 1 surface file (`surfaces/03-report-viewer.md`) + `anti-patterns.md` + `voice.md`.

**Phase 2 deferred work (per CLAUDE.md skill-routing table + SKILL.md L104):**
- 4 missing surface files: `surfaces/01-discovery.md`, `02-report-store.md`, `04-dashboards.md`, `05-engagement.md`
- 5 decision-tree files (chart picker, motion router, brand variant, surface picker, density picker)
- 2 brand-variant detail files (cinematic-dark / editorial-light comprehensive guides)
- Workflow chain files (build flow, critique flow)

### Method
- One file at a time. Surface files first (highest leverage — recipe-driven page builds depend on them).
- Each surface file: ~150-250 LOC w/ structure: hero pattern · grid · scroll behavior · density · color use · motion · component cross-ref · anti-patterns specific to surface · 1 inspirational reference call-out.
- Prereq: Track 1 paths corrected (so SKILL.md links work). Track 2 USE_GUIDE updated post-Phase-2.

### Output structure (per surface)
```md
---
surface: <id>-<name>
parent-skill: aura-design
trigger-phrases: ["...", "..."]
---

# Surface: <name>
## What user feels in 5 sec
## Reference playbook (the "× ×" recipe)
## Layout invariants
## Density rules (px / hierarchy / breathing)
## Token rules (color / type / motion)
## Anti-patterns (surface-specific)
## DS components used
## Recipe pointer (if applicable)
```

### Acceptance
- 4 surfaces written + linked from `aura-design/SKILL.md` table.
- 5 decision-tree files written (separate dir `aura-design/decisions/`).
- 2 brand-variant detail files (`aura-design/variants/cinematic-dark.md`, `editorial-light.md`).
- 1 workflow-chain file (`aura-design/chains/page-build.md`) — bridges to `/page` skill + `aura-builder`.
- SKILL.md "Phase 1 status" line updated to "Phase 2 complete YYYY-MM-DD".
- LEARNINGS entry: validation signal logged.
- DECISIONS entry: ADR closing-out Phase 2 fork (e.g., did we ship all 5 decision-trees or did some merge?).

### Subtasks (checkable)
- [x] `surfaces/01-discovery.md` (homepage / sector landing — NYT × Linear × Stripe playbook)
- [x] `surfaces/02-report-store.md` (Stripe checkout × Linear product page playbook)
- [x] `surfaces/04-dashboards.md` (Hex × Mode × Stripe Sigma × Coinbase Prime playbook)
- [x] `surfaces/05-engagement.md` (Linear authenticated × Vercel dashboard playbook)
- [x] `decisions/chart-picker.md`
- [x] `decisions/motion-router.md`
- [x] `decisions/brand-variant.md`
- [x] `decisions/surface-picker.md`
- [x] `decisions/density-picker.md`
- [x] `variants/cinematic-dark.md`
- [x] `variants/editorial-light.md`
- [x] `chains/page-build.md`
- [x] SKILL.md status update + cross-link surfaces table
- [x] LEARNINGS + DECISIONS + CHANGELOG entries

---

## Order of operations (recommended)

```
[Track 1] Doc sanity   ──┐
                         ├──→ [Track 2] USE_GUIDEs (post-prune set) ──→ [Track 5] Phase 2 builds
[Track 3] Skill prune  ──┤
[Track 4] Wf narrow    ──┘
```

Run 1+3+4 in parallel — they touch different files. 2 depends on 3+4 selective sets. 5 depends on 1+2.

**Realistic:** session 1 = 1+3+4 (3-4hr). Session 2 = 2 (1-2hr). Sessions 3-5 = Track 5 (4-6hr split per surface).

---

## Forcing functions (per CLAUDE.md learning loop)

After each Track:
- [ ] CHANGELOG entry (Aura-infra meta)
- [ ] DECISIONS entry if non-default choice made (e.g., "archive `pptx` over keep")
- [ ] LEARNINGS entry on validation/correction signals during prune
- [ ] Memory update if discovery is reusable next sprint
- [ ] Subtask checkbox flipped in this file

---

## Open questions for user (block start of execution)

1. **6-skill final set** — confirm: `aura-design` · `ken-research` · `page` · `webapp-testing` · `gsap-scrolltrigger` · `skill-creator`. Swap any?
2. **5-workflow final set** — confirm: `page-build` · `design-exploration` · `design-review` · `bug-fix` · `pre-handover` (+ `quick-answer` + `infra-change` special). OK?
3. **Phase 2 scope** — finish ALL 12 deferred aura-design files, or subset (just 4 surfaces, defer decisions + variants)?
4. **Sequencing** — parallel 1+3+3b in this session, or sequential (1 first, then prune)?
5. **`impeccable` uninstall** — confirm uninstall + delete (currently gated opt-in, never used in 6 wks)?

---

## Self-check — Aura's read of priorities

- ✅ Identified user (design lead, 5 task categories)
- ✅ Identified skill-in-progress (aura-design Phase 2, 12 deferred files)
- ✅ Mapped doc gaps (8 stale files w/ `core/` paths post-sprint, skill counts off, USE_GUIDE missing)
- ✅ Inventoried 79 skills + 3 agents + 11 workflows
- ✅ Drafted prune list (79 → 25), narrow list (11 → 8)
- ✅ Sequenced tracks w/ blockers identified
- ⏳ Awaiting user approval on 5 open questions before execution

---

## Where this plan lives

- This file: `docs/PLAN-2026-05-08-aura-tightening.md`
- Subtask checkboxes flipped in this file as work completes (single source of truth for progress).
- CHANGELOG entries reference this file by name.
- On completion: rename to `PLAN-2026-05-08-aura-tightening-COMPLETE.md` + memory entry pointing here.
