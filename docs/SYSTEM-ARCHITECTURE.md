---
title: Aura System Architecture
generated: 2026-05-08
status: post-tightening-sprint
purpose: Visual map of where files live, how Aura system works, how cross-session sync operates
---

# Aura System Architecture — visual map

How the entire Aura + Ken Research workspace fits together. Where files live, how they're loaded, how multiple chats stay in sync.

---

## 1. Macro view — three storage zones

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│   ZONE A: WORKSPACE (in-repo, version-controlled)                            │
│   /Users/vishalchauchan/Downloads/Anti-folder01/                             │
│   ───────────────────────────────────────────────────                        │
│   • All Ken Research code, projects, design system                           │
│   • All Aura's own config (CLAUDE.md, ROUTING.md, agents, skills, docs)      │
│   • Single source of truth for everything project-related                    │
│                                                                              │
│   ZONE B: USER-HOME PERSISTENT (cross-conversation, machine-local)           │
│   ~/.claude/                                                                 │
│   ───────────────────                                                        │
│   • Memory (per-project topic files + index)                                 │
│   • Activity log (cross-session record of tool calls)                        │
│   • Hooks (caveman output compression, activity logger)                      │
│   • External skills (graphify, impeccable, caveman)                          │
│   • Cross-machine NOT synced (separate per laptop)                           │
│                                                                              │
│   ZONE C: ANTHROPIC CLOUD (transient, per-conversation)                      │
│   ─────────────────────────                                                  │
│   • Conversation context window (compacted as needed)                        │
│   • Native subagents: Explore, Plan, general-purpose                         │
│   • TodoWrite list (per-session, ephemeral)                                  │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

Most things you care about live in **Zone A** (workspace, in-repo, version-controlled). **Zone B** is persistence layer — memory + activity log + hooks. **Zone C** is the conversation runtime.

---

## 2. Zone A — Workspace tree (in-repo)

```
Anti-folder01/                                  ← workspace root
│
├── CLAUDE.md                                   ← Auto-loaded EVERY session. Aura's identity + scope + model routing + brand tokens.
├── CLAUDE.original.md                          ← Verbose backup before caveman compression
├── Quick_start_guide.md                        ← Brand tokens reference (Major Third scale, Noto Serif/DM Sans, Ken-red)
├── FOLDER_CONTEXT.md                           ← Workspace overview pointer
├── HANDOVER_TRACKER.md                         ← Per-project design→tech handover state (13-point gate)
├── pnpm-workspace.yaml                         ← 4 active packages
├── run.sh                                      ← One-click runner: tokens / design / backend / frontend
│
├── .claude/                                    ← Claude-Code-specific (in-repo)
│   └── agents/                                 ← Native subagent files (CLI direct invoke)
│       ├── aura-builder.md                     ← L1 Sonnet build agent
│       ├── aura-mech.md                        ← L0 Haiku mechanical agent
│       └── aura-qa.md                          ← L1 Sonnet QA agent
│
├── design-system/                              ← CANONICAL DS HOME
│   ├── tokens/                                 ← Style Dictionary v4 DTCG (active)
│   │   ├── tokens.json                         ← Canonical brand tokens
│   │   └── build/tokens.css                    ← Generated CSS vars
│   ├── core-v2/                                ← Active DS post-Sprint 2026-05-07
│   │   ├── src/{atoms,molecules,organisms,patterns,hooks,charts,styles}/
│   │   ├── PATTERNS.md, ANTI_PATTERNS.md, MIGRATION_FROM_V1.md, COMPONENT_REFERENCE.md
│   │   └── package.json (exports → src/*/index.ts)
│   ├── core/                                   ← v1 frozen read-only (legacy)
│   ├── dashboard/                              ← Figma Make duplicate, slated delete
│   ├── catalogs/ken-research.ts                ← Industries · regions · countries · methodologies (canonical)
│   ├── recipes/                                ← Page-build binding specs (case-study, report-store-listing, etc.)
│   ├── motion/, voice/                         ← Phase 1 DS docs
│   ├── ANTI_PATTERNS.md (root)                 ← Cat 1-14 catalog
│   ├── COMPONENT_REFERENCE.md (root)
│   └── 4WH_AUDIT.md
│
├── projects/                                   ← Consumer surfaces
│   │   Active (Next 15):
│   ├── V0_lite_report/                         ← Full port (Sprint 2026-05-07)
│   ├── report-store/                           ← Foundation only
│   ├── V0.2_report/                            ← Foundation only
│   │   References:
│   ├── topnav-v32/                             ← Navbar canonical source
│   ├── report-store-v07/                       ← Listing canonical source
│   ├── casestudy-templates/{template-v3,template-v28}/
│   │   Frozen legacy:
│   ├── V0_lite_report-legacy/                  ← read-only (LEGACY-READONLY.md)
│   ├── report-store-legacy/                    ← read-only
│   ├── V0.2_report-legacy/                     ← read-only
│   │   Other:
│   ├── ken-research-backend/                   ← Django (local-edit OK, no remote push)
│   ├── webpages-ken/                           ← Static HTML brand pages
│   ├── reports-pdp-v1/, competition-benchmarking-listing-v01/v02/  ← exploratory
│   └── FOLDER_CONTEXT.md
│
├── skills/                                     ← AI skills (post-prune)
│   ├── INDEX_BY_CATEGORY.md                    ← Single what/where/why/when/how index for active set
│   ├── SKILL_ROUTING.md                        ← Trigger phrase → skill table
│   ├── FOLDER_CONTEXT.md
│   │   Active workspace skills (7):
│   ├── aura-design/                            ← Ken design 2nd brain (Phase 2 COMPLETE — 14 files)
│   │   ├── SKILL.md
│   │   ├── anti-patterns.md, voice.md
│   │   ├── surfaces/{01-discovery, 02-report-store, 03-report-viewer, 04-dashboards, 05-engagement}.md
│   │   ├── decisions/{chart-picker, motion-router, brand-variant, surface-picker, density-picker}.md
│   │   ├── variants/{cinematic-dark, editorial-light}.md
│   │   └── chains/page-build.md
│   ├── ken-research/                           ← Strategy/wedge research (eval-tested 22/24)
│   ├── page/                                   ← /page <recipe> slash builder
│   ├── frontend-design/                        ← Production HTML/CSS/JSX
│   ├── gsap-scrolltrigger/                     ← Scroll motion
│   ├── webapp-testing/                         ← Playwright local
│   ├── skill-creator/                          ← Meta tooling
│   └── _archive/                               ← 72 archived skills (recovery via mv)
│       └── README.md
│
├── workflows/                                  ← Workflow library
│   ├── ROUTING.md                              ← Task classifier + 9 workflows + decision tree
│   └── agents/                                 ← Sonnet spawn templates (mirror of .claude/agents/)
│       ├── aura-builder.md, aura-mech.md, aura-qa.md
│
├── docs/                                       ← Aura-infra logs + sprint records
│   ├── CHANGELOG.md                            ← Append-only Aura-meta change log
│   ├── DECISIONS.md                            ← ADRs (active + archive)
│   ├── LEARNINGS.md                            ← Corrections + validations + observations
│   ├── WORKSPACE-MAP.md                        ← Topology snapshot post-Sprint 2026-05-07
│   ├── SPRINT-LEARNINGS-2026-05-08.md          ← Consolidated 11 sprint learnings
│   ├── SYSTEM-ARCHITECTURE.md                  ← THIS FILE
│   ├── PLAN-2026-05-08-aura-tightening.md      ← Tightening sprint plan w/ checkboxes
│   ├── KENRESEARCH_DESIGN_SYSTEM_PHASE1.md, DESIGN_SYSTEM_EVOLUTION.md, AURA_SPRINT_2026-05-01.md
│   ├── VISUAL_GAP_MATRIX.md
│   └── aura-sprint-2026-05-07-port/            ← Per-sprint audits (A1+A2+A3+A-synthesis+B-forensic+B2-deepmap+RESUME-NOTE)
│
├── templates/                                  ← STATUS / HANDOVER / README templates for handover
│
├── references/                                 ← External design system catalog (read-only, MIT)
│   └── design-systems/                         ← 59 documented systems (Linear, Stripe, Vercel, Figma, etc.)
│
├── strategy/                                   ← Competitive playbook (read by ken-research skill)
│   └── (company facts, competitors, wedge, research log)
│
└── scripts/                                    ← Utility scripts
```

---

## 3. Zone B — User-home persistent (`~/.claude/`)

```
~/.claude/
├── settings.json                               ← Hook config (PreToolUse, Stop hooks wired)
├── settings.json.pre-aura-bak                  ← Rollback if needed
│
├── CLAUDE.md                                   ← User's GLOBAL instructions (rare — most config in workspace)
│
├── projects/                                   ← Per-project memory store
│   └── -Users-vishalchauchan-Downloads-Anti-folder01/   ← This workspace's memory
│       ├── memory/
│       │   ├── MEMORY.md                       ← Index (auto-loaded EVERY session)
│       │   ├── feedback_*.md                   ← Standing rules / feedback patterns (12 files)
│       │   └── project_*.md                    ← Per-project / per-sprint state (8 files)
│       └── <session-id>.jsonl                  ← Conversation transcripts (Anthropic format)
│
├── skills/                                     ← External skills (symlinked to ~/.agents/skills/)
│   ├── graphify/                               ← Large-repo intel (CLI: ~/.local/bin/graphify)
│   ├── impeccable/                             ← Frontend polish (un-gated, 23 subcommands, 36 ref docs)
│   └── (caveman has NO skill dir — hooks-only)
│
├── hooks/                                      ← Hook scripts
│   ├── caveman-activate.js                     ← Output compression (always-on)
│   ├── caveman-config.js
│   ├── caveman-mode-tracker.js
│   ├── caveman-statusline.sh
│   ├── statusline-extended.sh
│   └── package.json
│
├── aura/                                       ← Cross-session activity system
│   ├── README.md                               ← Full system spec
│   ├── activity.jsonl                          ← Append-only event log (1027 entries, 7d/5000-line trim)
│   ├── log-activity.py                         ← Hook script: writes events
│   ├── scrub.py                                ← Privacy filter (quote-aware shell parser, secret-drop)
│   ├── inject-digest.py                        ← Digest builder (NOT auto-injected per option C ADR)
│   ├── aura-status                             ← CLI: formatted view of recent activity
│   └── rotate.py                               ← 7d/5000-line log trim
│
└── agents/skills/                              ← Canonical install location
    ├── graphify/                               ← (symlinked from ~/.claude/skills/graphify)
    └── impeccable/                             ← (symlinked from ~/.claude/skills/impeccable)
```

---

## 4. Cross-session sync flow (how multiple chats stay in sync)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Chat A starts                          Chat B starts (later, parallel)      │
│  ─────────────                          ────────────────────────────         │
│       │                                          │                           │
│       ├─→ AUTO-LOAD CLAUDE.md ←──────────────────┤                           │
│       │   (workspace identity, scope, routing)   │                           │
│       │                                          │                           │
│       ├─→ AUTO-LOAD MEMORY.md ←──────────────────┤                           │
│       │   (per-topic memory pointers — last 200 lines)                       │
│       │                                          │                           │
│       ├─→ READ on demand:                        │                           │
│       │     • workflows/ROUTING.md (every task)  │                           │
│       │     • docs/LEARNINGS.md last 5 Active    │                           │
│       │     • docs/DECISIONS.md last 3 Active    │                           │
│       │     • memory/<topic>.md (matched files)  │                           │
│       │                                          │                           │
│       │   ↓ Chat A makes change                  │                           │
│       │                                          │                           │
│       ├─→ EDIT FILES in workspace ───────────────┤                           │
│       │     (file system = single source         │                           │
│       │      of truth · git captures)            │                           │
│       │                                          │                           │
│       ├─→ APPEND to docs/CHANGELOG.md ───────────┤                           │
│       │   (Aura-meta changes mandatory)          │                           │
│       │                                          │                           │
│       ├─→ APPEND to docs/DECISIONS.md ───────────┤                           │
│       │   (ADRs for non-default choices)         │                           │
│       │                                          │                           │
│       ├─→ APPEND to docs/LEARNINGS.md ───────────┤                           │
│       │   (3-signal pattern: correction +        │                           │
│       │    validation + observation)             │                           │
│       │                                          │                           │
│       ├─→ WRITE memory file if persistent fact ──┤                           │
│       │     (~/.claude/projects/.../memory/      │                           │
│       │      + add 1-line to MEMORY.md)          │                           │
│       │                                          │                           │
│       ├─→ HOOK fires: PreToolUse + Stop          │                           │
│       │     ↓                                    │                           │
│       │   ~/.claude/aura/activity.jsonl ←────────┤  (single shared log)      │
│       │     (sid · ws · act · obj · ts)          │                           │
│       │                                          │                           │
│       │                                          ├─→ READS state at any time:│
│       │                                          │     • Same workspace docs │
│       │                                          │     • Same memory files   │
│       │                                          │     • aura-status CLI     │
│       │                                          │       for activity log    │
│       │                                          │                           │
│       └─→ End-of-turn HOOK fires ────────────────┴─→ activity.jsonl entry    │
└──────────────────────────────────────────────────────────────────────────────┘
```

**Key insight:** Sync = file-system-mediated. Chat A writes → file changes → Chat B reads same file. No real-time push. No auto-inject (intentional per ADR 2026-05-07 option C).

**Conflict semantics:** Last-write-wins on simultaneous edits. Mitigation = user discipline (1 chat per task domain).

---

## 5. Active operating model (post-tightening 2026-05-08)

```
                        ┌──────────────────────────┐
                        │      USER (you)          │
                        │  design@kenresearch.com  │
                        └────────────┬─────────────┘
                                     │
                                     ▼
                        ┌──────────────────────────┐
                        │   AURA (Opus main)       │  ← reads CLAUDE.md, MEMORY.md, scans docs
                        │   judgment + synthesis   │
                        └─┬──────────────────────┬─┘
                          │                      │
        ┌─────────────────┴──┐   ┌─── delegation ┴───┐
        ▼                    ▼   ▼                   ▼
  ┌──────────┐       ┌──────────┐  ┌──────────┐  ┌──────────┐
  │  Skills  │       │ aura-    │  │  Native  │  │ External │
  │  (10)    │       │ agents   │  │ Anthropic│  │  CLI     │
  │          │       │  (3)     │  │ (3)      │  │ tools    │
  │ aura-    │       │          │  │          │  │          │
  │  design  │       │ builder  │  │ Explore  │  │ pnpm     │
  │ ken-res  │       │  (Sonnet)│  │ Plan     │  │ git      │
  │  earch   │       │ mech     │  │ general- │  │ playwright│
  │ page     │       │  (Haiku) │  │  purpose │  │ Highchart │
  │ frontend │       │ qa       │  │          │  │ MSW      │
  │ -design  │       │  (Sonnet)│  │          │  │ Lenis    │
  │ gsap-scr │       │          │  │          │  │ GSAP     │
  │ olltrigg │       │          │  │          │  │ Framer   │
  │ webapp-  │       │          │  │          │  │ shadcn   │
  │ testing  │       │          │  │          │  │ Lucide   │
  │ skill-   │       │          │  │          │  │ npx      │
  │ creator  │       │          │  │          │  │          │
  │          │       │          │  │          │  │          │
  │ + EXTERNAL: │    │          │  │          │  │          │
  │ graphify │       │          │  │          │  │          │
  │ caveman  │       │          │  │          │  │          │
  │ impec-   │       │          │  │          │  │          │
  │  cable   │       │          │  │          │  │          │
  └──────────┘       └──────────┘  └──────────┘  └──────────┘

  All consume:
        ┌─────────────────────────────────────────────────────┐
        │ design-system/{tokens, core-v2, recipes, catalogs}  │
        │           ↓                                         │
        │   projects/<consumer> via Next transpilePackages    │
        └─────────────────────────────────────────────────────┘
```

---

## 6. Workflow execution flow (e.g. `/page case-study`)

```
USER: "/page case-study --target=projects/V0.2_report"
          │
          ▼
   AURA reads workflows/ROUTING.md
   classifies → page-build workflow
          │
          ▼
   → Route: page-build · Skill: aura-design + page · Steps: 6
          │
          ▼
   Step 1 — Decisions (Aura Opus main reads):
     • skills/aura-design/decisions/surface-picker.md → matches surface 03 (Viewer pattern for case-study)
     • skills/aura-design/surfaces/03-report-viewer.md → IA + type + density playbook
     • skills/aura-design/decisions/brand-variant.md → editorial-light DEFAULT per recipe
     • skills/aura-design/decisions/density-picker.md → reading-dense profile
     • skills/aura-design/decisions/motion-router.md → Lenis + Framer for state
     • skills/aura-design/anti-patterns.md → Cat 1-14 cross-ref
     • skills/aura-design/voice.md → tone calibration
     • design-system/recipes/case-study.md → BINDING SPEC (variant LOCK, organism filenames LOCK, bg alternation L50)
          │
          ▼
   Step 2 — Mock data (Aura main or aura-mech Haiku)
     • src/lib/mock-data.ts gateway pattern
          │
          ▼
   Step 3 — Build (spawn aura-builder Sonnet)
     • frontend-design skill loaded
     • DS components from core-v2 imported
     • Recipe LOCK respected (variant + organism names + bg alternation)
     • Hard cap 15 files per spawn
          │
          ▼
   Step 4 — Motion (optional spawn aura-builder Sonnet)
     • gsap-scrolltrigger or framer-motion docs
     • prefers-reduced-motion guard MANDATORY
          │
          ▼
   Step 5 — Validate (spawn aura-qa Sonnet)
     • RECIPE-CONFORMANCE GATE first (HARD GATE)
     • a11y axe-playwright
     • Lighthouse mobile + CWV
     • visual baseline (Playwright screenshots)
     • motion path (reduced-motion + 60fps)
     • optional impeccable critique
          │
          ▼
   Step 6 — Iterate or polish (Aura Opus main)
     • Fix P0 failures
     • Optional: impeccable polish/colorize/typeset subcommands
     • Brand cross-check via aura-design
          │
          ▼
   → Exit: page-build complete
   → Log: CHANGELOG entry · DECISIONS if non-default · LEARNINGS if signal
```

---

## 7. Trace marker convention (visible pipeline proof)

Every non-trivial action emits a marker line so you can validate the pipeline fired:

```
→ Route: <workflow> · Skill: <skill> · Workflow steps: <N>
→ Scan: last 5 LEARNINGS + last 3 DECISIONS Active
→ Step 3/6 · Spawn: aura-builder · Model: sonnet
→ Step 3/6 · Return: aura-builder · Model used: sonnet
→ Log: CHANGELOG entry appended
→ Check: anti-bloat self-check passed
→ Exit: workflow complete
```

Model-switch enforcement: announced model (L1) must match reported `Model used` (L3) — mismatch logged as LEARNING.

---

## 8. Anti-patterns (system-level)

| Anti-pattern | Why wrong | Mitigation |
|---|---|---|
| Real-time chat-to-chat sync attempt | Memory poisoning · ADR 2026-05-07 option C blocks auto-inject | Read state via boot sequence |
| Building config outside workspace docs | Drift across machines · loses git capture | Workspace docs = source of truth |
| Memory file w/o MEMORY.md index entry | Future-Aura won't find it | Always update index when adding memory file |
| Skipping CHANGELOG entry on infra change | Future-Aura misses why config differs | infra-change workflow has mandatory CHANGELOG step |
| 2 chats editing same file simultaneously | Last-write-wins data loss | User discipline · 1 chat per task domain |
| Stale memory contradicting current code | Memory points to deleted file | "Verify before recommending" rule (CLAUDE.md memory section) |
| Auto-inject of cross-session digest | Unauthorized persistence · steers context | inject-digest.py exists but NOT wired (option C) |

---

## 9. Recovery + audit

| Need | Tool |
|---|---|
| What did I work on yesterday | `~/.claude/aura/aura-status` (CLI · reads activity.jsonl) |
| What changed in workspace recently | `git log --oneline -20` (workspace) |
| What was the latest decision | top of `docs/DECISIONS.md` |
| What was the latest learning | top of `docs/LEARNINGS.md` `## Active` |
| What's the current sprint | `MEMORY.md` index (latest `project_*` entry) |
| Where does X live | `docs/WORKSPACE-MAP.md` quick locator |
| Why did I fork core to core-v2 | `docs/DECISIONS.md` 2026-05-08 ADR |
| What's archived | `skills/_archive/README.md` |
| Restore archived skill | `mv skills/_archive/<name> skills/<name>` |

---

## 10. Quick reference — where everything lives

| Type of thing | Location |
|---|---|
| Aura's identity / scope / model rules | `CLAUDE.md` (workspace root) |
| Brand tokens / quick start | `Quick_start_guide.md` (workspace root) |
| Workspace topology snapshot | `docs/WORKSPACE-MAP.md` |
| System architecture (THIS FILE) | `docs/SYSTEM-ARCHITECTURE.md` |
| Active workflows | `workflows/ROUTING.md` |
| Active skills (10) | `skills/` (7) + `~/.claude/skills/` (3) |
| Skill index / what-where-why-when-how | `skills/INDEX_BY_CATEGORY.md` |
| Skill triggers | `skills/SKILL_ROUTING.md` |
| Aura agents (3) | `.claude/agents/` + `workflows/agents/` (dual-path) |
| Aura-design 2nd brain (14 files) | `skills/aura-design/{SKILL.md, anti-patterns.md, voice.md, surfaces/, decisions/, variants/, chains/}` |
| Active DS | `design-system/core-v2/` |
| Tokens canonical | `design-system/tokens/build/tokens.css` |
| Recipes | `design-system/recipes/<name>.md` |
| Anti-patterns catalog | `design-system/ANTI_PATTERNS.md` (Cat 1-14) |
| Active projects | `projects/{V0_lite_report, report-store, V0.2_report}/` (Next 15) |
| Per-project handover state | `HANDOVER_TRACKER.md` |
| Aura-meta change log | `docs/CHANGELOG.md` |
| ADRs | `docs/DECISIONS.md` |
| Learnings | `docs/LEARNINGS.md` |
| Sprint records | `docs/aura-sprint-*-port/` + `docs/SPRINT-LEARNINGS-*.md` |
| Per-conversation memory | `~/.claude/projects/.../memory/<topic>.md` |
| Memory index | `~/.claude/projects/.../memory/MEMORY.md` |
| Cross-session activity log | `~/.claude/aura/activity.jsonl` |
| External skills | `~/.claude/skills/` (symlink to `~/.agents/skills/`) |
| Output compression hooks | `~/.claude/hooks/caveman-*` |

---

## See also

- [WORKSPACE-MAP.md](WORKSPACE-MAP.md) — pure topology snapshot (post-Sprint 2026-05-07)
- [SPRINT-LEARNINGS-2026-05-08.md](SPRINT-LEARNINGS-2026-05-08.md) — 11 sprint learnings consolidated
- [PLAN-2026-05-08-aura-tightening.md](PLAN-2026-05-08-aura-tightening.md) — tightening sprint plan + checkbox progress
- `~/.claude/aura/README.md` — activity log system spec
- `~/.claude/projects/-Users-vishalchauchan-Downloads-Anti-folder01/memory/feedback_cross_session_sync.md` — sync rule memory
