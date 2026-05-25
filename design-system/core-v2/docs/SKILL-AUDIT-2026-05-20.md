# SKILL AUDIT · WORKFLOW-RESET Phase 5

**Date:** 2026-05-20
**Status:** complete · prune list ready
**Audit scope:** 7 active workspace skills + 4 external + 1 graphify + 1 caveman = 13 inventory items

---

## 1 · Skill inventory (per `skills/` directory listing)

| # | Skill | Path | Last-used signal | Decision |
|---|---|---|---|---|
| 1 | aura-design ★ | `skills/aura-design/` | Used Phase 2 page-build decisions · stage 4 craft pass · referenced in CANONICAL-WORKFLOW §2 | KEEP |
| 2 | aura-craft ★ | `skills/aura-craft/` | Step 4.5 of 9-step page-build (HARD gate) · referenced in CANONICAL-WORKFLOW §2 | KEEP |
| 3 | page (slash command) | `skills/page/` | `/page <recipe>` slash command · referenced for "build Ken page from intent" | KEEP |
| 4 | ken-research | `skills/ken-research/` | Ken strategy / wedge / competitor research · referenced periodically | KEEP |
| 5 | frontend-design | `skills/frontend-design/` | Production HTML/CSS/JSX · used for ad-hoc design tasks | KEEP (light use) |
| 6 | webapp-testing | `skills/webapp-testing/` (symlinked to `.agents/skills/webapp-testing/`) | Playwright + axe + Lighthouse · used Stage 5 + P0-P5 QA | KEEP (canonical QA) |
| 7 | skill-creator | `skills/skill-creator/` | Used 0 times in last 30 days · no current Aura needs new skill creation | ARCHIVE |
| 8 | impeccable | external | Frontend polish / critique / audit · un-gated · referenced in CLAUDE.md skill-routing | KEEP (passive) |
| 9 | graphify | `~/.local/bin/graphify` + skill dirs | Large-repo intel · used token-efficiency rule 1 · mandatory at >50 files/>100k tokens | KEEP |
| 10 | caveman | hooks at `~/.claude/hooks/` | Output compression · always-on via hooks · default-FULL mode | KEEP |
| 11 | framer-motion (ad-hoc) | external docs · referenced in CLAUDE.md | Motion lib · ad-hoc usage · referenced per CANONICAL-WORKFLOW | KEEP (reference-only) |
| 12 | _external/ reference repos | `skills/_external/` | 3 reference repos (ui-ux-pro-max · interface-design · awesome-claude-design) · MIT · for aura-craft synthesis | KEEP (reference) |
| 13 | _archive/ (already cleaned in earlier sprint) | `skills/_archive/` | Per DECISIONS 2026-05-08 · deletion approved · already gone per WR Phase 2 catalog | n/a (gone) |

---

## 2 · Decisions

**11 KEEP · 1 ARCHIVE · 1 already gone**

### KEEP (canonical · current)
- aura-design · aura-craft · page · ken-research · frontend-design · webapp-testing · impeccable · graphify · caveman · framer-motion · _external/

### ARCHIVE
- **skill-creator** · move to `skills/_archive/skill-creator-2026-05-20/` · zero usage in last 30 days · creates new skills but no current pipeline · rare future need

---

## 3 · SKILL_ROUTING.md update

Current file references 12 active. After ARCHIVE: 11 active. Update SKILL_ROUTING.md:
- Remove skill-creator from trigger table
- Update header line "8 workspace + 4 external = 12 active" → "7 workspace + 4 external = 11 active"
- Replace `[../workflows/ROUTING.md]` link → `[../workflows/CANONICAL-WORKFLOW.md]` (Phase 4 rename)
- Update `## Triggers → skill table` to align with CANONICAL-WORKFLOW §2-7 scenarios

---

## 4 · Execution (post-approval)

```bash
# Archive skill-creator
mkdir -p /Users/vishalchauchan/Downloads/Anti-folder01/skills/_archive
mv /Users/vishalchauchan/Downloads/Anti-folder01/skills/skill-creator \
   /Users/vishalchauchan/Downloads/Anti-folder01/skills/_archive/skill-creator-2026-05-20

# Update SKILL_ROUTING.md (edit script · see below)
```

---

## 5 · Cross-cutting findings

- **SKILL_ROUTING.original.md** · backup pre-prune 2026-05-08 · 12+ months stale · ARCHIVE candidate (move to `skills/_archive/` post-cleanup)
- **FOLDER_CONTEXT.md** in skills/ · 1-line directory description · KEEP as-is
- **INDEX_BY_CATEGORY.md** · full what/where/why/when/how per skill · KEEP · update if SKILL_ROUTING changes

---

## 6 · Recommendation

Execute archive + SKILL_ROUTING update inline this session. Low risk. Proceed.

---

**END · SKILL-AUDIT-2026-05-20.md**
**Next:** Phase 6 · Aura master-pointer refresh
