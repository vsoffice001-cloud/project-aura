# Root Workspace Context — Ken Research

**What**: Primary workspace for Ken Research web design + DS evolution. Contains active projects, canonical design system, AI skills + agents + workflows ecosystem.

**Primary Folders**:
- `projects/` — Active Ken projects + reference templates + frozen legacy
  - Active (Next 15): `V0_lite_report/` (full port) · `report-store/` + `V0.2_report/` (foundations)
  - References: `topnav-v32/` (navbar canonical), `report-store-v07/` (listing canonical), `casestudy-templates/`
  - Legacy frozen: `*-legacy/` 3 folders (read-only)
  - Backend: `ken-research-backend/` (Django, local-edit OK, no remote push)
- `design-system/` — Canonical DS home
  - `tokens/` (Style Dictionary v4 DTCG, active)
  - `core-v2/` (active post-Sprint 2026-05-07)
  - `core/` (v1 frozen read-only)
  - `dashboard/` (slated for delete)
  - `recipes/`, `catalogs/`, `motion/`, `voice/`, `ANTI_PATTERNS.md`, `COMPONENT_REFERENCE.md`
- `skills/` — AI skills (prune in flight: 79 → 8 workspace + 3 external per `docs/PLAN-2026-05-08-aura-tightening.md`)
- `workflows/` — `ROUTING.md` task classifier + `agents/` Sonnet spawn templates
- `docs/` — `CHANGELOG.md` (Aura-infra) · `DECISIONS.md` (ADR) · `LEARNINGS.md` · `WORKSPACE-MAP.md` (topology) · `SPRINT-LEARNINGS-2026-05-08.md` · sprint audit folders
- `templates/` — STATUS / HANDOVER / README templates for design→tech handover
- `references/` — `design-systems/` (59 documented, MIT, inspiration only)
- `strategy/` — Competitive playbook (company facts, competitors, wedge, research log)
- `scripts/` — Utility scripts
- `.claude/agents/` — Native Claude Code subagent files (`aura-builder.md` · `aura-mech.md` · `aura-qa.md`)

**Key Files**:
- `CLAUDE.md` — Auto-loaded session context
- `Quick_start_guide.md` — Brand tokens + skill routing quick reference
- `HANDOVER_TRACKER.md` — Per-project handover state (13-point gate)
- `run.sh` — Runner: tokens / design / backend / frontend

**How**: Every task → read `workflows/ROUTING.md` first → classify → announce 1-line route → execute. All build work in `projects/<active-name>/` consuming `design-system/core-v2/`. Pre-handover via `aura-qa` agent before tech handoff.
