# Doc Inventory · WORKFLOW-RESET Phase 2 (Catalog · BEFORE Prune)

**Date:** 2026-05-20
**Status:** AWAITING USER APPROVAL of DELETE list
**Owner:** Aura (read-only catalog · NO deletions executed)

---

## Summary

| Metric | Count |
|---|---|
| Total `.md` files cataloged (workspace, excl. node_modules / .git / dist) | ~704 |
| KEEP | 71 |
| UPDATE | 8 |
| ARCHIVE | 40 |
| DELETE | 188+ (largely concentrated in 2 legacy project doc-stashes) |
| Estimated MB freed (md-only · folder DELETEs separate) | ~5-8 MB md text · ~450 MB if `Design_system_vs_26 (og and final)` folder ARCHIVED · already-deleted DELETE items: 0 MB |

**Pre-state notes (already deleted before this catalog ran):**
- `design-system/core/` (v1 frozen) — NOT FOUND · already removed
- `design-system/dashboard/` (Figma Make dup) — NOT FOUND · already removed
- `skills/_archive/` — NOT FOUND · already removed
- Memory file count = 36 entries (32 pinned + MEMORY.md + .DS_Store + 2 others)

---

## KEEP list (canonical · current · referenced by active workflow)

### Root `/Users/vishalchauchan/Downloads/Anti-folder01/`
- `CLAUDE.md` (18 KB · May 12) · auto-loaded master pointer · canonical (note: UPDATE flagged below for workflow pointer refresh in Phase 6)
- `Quick_start_guide.md` (4 KB · May 8) · brand-token reference · cited in CLAUDE.md
- `HANDOVER_TRACKER.md` (10 KB · May 20) · canonical project status table · just updated
- `README.md` (6 KB · May 13) · workspace entry-point
- `FOLDER_CONTEXT.md` (2 KB · May 8) · workspace map
- `run.sh` · canonical run script
- `pnpm-workspace.yaml`, `package.json`, `.nvmrc` · live config
- `HANDOVER_DELIVERY.md` (9 KB · May 13) · canonical hand-off doc

### `/docs/` (workspace logs · canonical)
- `CHANGELOG.md` (175 KB · 1419 lines · May 20) · Aura infra log · canonical append-only
- `LEARNINGS.md` (136 KB · 865 lines · May 19) · canonical learning ledger
- `DECISIONS.md` (45 KB · 342 lines · May 19) · canonical decisions ledger
- `WORKSPACE-MAP.md` (13 KB · May 13) · workspace topology
- `SYSTEM-ARCHITECTURE.md` (29 KB · May 8) · stack architecture
- `API_CONTRACT.md` (7 KB · May 13) · mock-data contract

### `/workflows/`
- `ROUTING.md` (18 KB · May 13) · canonical workflow routing (UPDATE flagged for Phase 4 replacement)
- `agents/aura-builder.md` · canonical Sonnet build template
- `agents/aura-qa.md` · canonical Sonnet QA template
- `agents/aura-mech.md` · canonical Haiku mech template
- `.claude/agents/{aura-builder,aura-qa,aura-mech}.md` · dual-path CLI versions (sync with `workflows/agents/`)

### `/templates/`
- `STATUS.md.template`, `HANDOVER.md.template`, `README.md.template` · canonical handover scaffolds

### `/design-system/` (root files)
- `DESIGN.md` (17 KB · May 13) · DS vocabulary · cited in CLAUDE.md
- `ANTI_PATTERNS.md` (18 KB · May 7) · canonical DS anti-patterns
- `COMPONENT_REFERENCE.md` (1 KB · May 13) · canonical reference pointer
- `4WH_AUDIT.md` (1 KB · May 13) · canonical 4WH audit pointer
- `motion/MOTION_SPEC.md`, `voice/*.md`, `recipes/*.md` (12 files), `catalogs/README.md`, `tokens/README.md` · all canonical DS authoring docs

### `/design-system/core-v2/` (root)
- `STATUS.md`, `HANDOVER.md`, `README.md`, `CHANGES.md` · canonical DS package docs
- `package.json`, `tsconfig*.json`, `vite.config.ts`, `playground/README.md` · live config

### `/design-system/core-v2/docs/` — canonical synthesis docs (Stage 1-5)
- `MASTER-PLAN.md` (15 KB · May 19) · Stage 3 master plan · authoritative
- `PORT-PLAN.md` (18 KB · May 19) · Stage 3 batched roadmap · referenced by builders
- `CANONICAL-SOURCE-MAP.md` (27 KB · May 19) · Stage 2 synthesis · authoritative
- `FOUNDATIONS.md` (53 KB · May 19) · 30-section token foundations · pinned in MEMORY.md
- `RULES.md` (40 KB · May 15) · 90 OG rules · pinned in MEMORY.md
- `EXECUTION_PLAN.md` (21 KB · May 15) · 7-phase 186hr plan · pinned in MEMORY.md
- `WORKFLOW-RESET-PLAN.md` (15 KB · May 20) · ACTIVE Phase 2 plan
- `DS-AUDIT-2026-05-20.md` (13 KB · May 20) · Stage 1 audit · current
- `TOKEN-GAP-REPORT.md` (33 KB · May 19) · Stage 2 token decisions
- `GAPS.md` (28 KB · May 20) · open gaps register
- `ANTI_PATTERNS.md` (30 KB · May 20) · DS-side anti-patterns
- `AI-PICKER-GUIDE.md` (22 KB · May 19) · AI consumption protocol
- `COMPONENT_REFERENCE.md` (28 KB · May 15) · canonical component list
- `COMPONENT_LIFECYCLE.md` (18 KB · May 14)
- `COMPOSITION_GRAMMAR.md` (17 KB · May 15) · third canonical doc
- `SPACING-COMPOSITION-LAYOUT-CANON.md` (25 KB · May 19)
- `ICONS.md` (21 KB · May 14)
- `VOICE.md` (21 KB · May 14)
- `CORE.md` (31 KB · May 14)
- `COMMANDMENTS.md` (26 KB · May 14)
- `TOKEN_PYRAMID.md` (23 KB · May 14)
- `QUICK_START.md` (52 KB · May 14)
- `LEGACY-AUDIT/{V0.2-for-ds,V0_lite_report,report-store-legacy}.md` · Stage 1 audit subdocs

### `/skills/` (active set per CLAUDE.md)
- `SKILL_ROUTING.md` (UPDATE flagged for Phase 5 prune)
- `INDEX_BY_CATEGORY.md`
- `FOLDER_CONTEXT.md`
- `page/SKILL.md`, `aura-craft/SKILL.md` + `reference/`, `aura-design/SKILL.md` + decisions/surfaces/variants/chains/voice/anti-patterns subdirs, `frontend-design/SKILL.md`, `ken-research/SKILL.md` + references/, `skill-creator/SKILL.md` + sub, `webapp-testing/SKILL.md`
- `_external/` (4 reference repos · 2.0 MB · cited in CLAUDE.md craft-pass)

### `/strategy/` (active Ken Research strategy)
- All 41 strategy `.md` files KEEP · referenced by aura-design surfaces · `ken-research` skill cites these · MEMORY.md `project_kenresearch_brief.md` anchors them

### Memory `/Users/vishalchauchan/.claude/projects/.../memory/` (35 `.md` files)
- `MEMORY.md` · canonical index
- All `feedback_*.md` entries cited in MEMORY.md (most recent 2026-05-15) · KEEP
- All `project_*.md` entries cited in MEMORY.md · KEEP

### `/projects/` (active + ready-for-tech projects · STATUS / HANDOVER / README docs only)
- `v1-project/v1-product-page-ver0.{1,2,3}/STATUS.md HANDOVER.md README.md` · canonical handover trio
- `competition-benchmarking-listing-v02/{STATUS,HANDOVER,README}.md` · ready-for-tech docs
- `topnav-v32/{STATUS,HANDOVER,README,ATTRIBUTIONS,FOLDER_CONTEXT,COPY_TO_NEW_PROJECT}.md`
- `_briefs/v1-product-page/*` · pinned in MEMORY.md `project_v1_product_page_brief.md`
- `casestudy-templates/*/STATUS.md, HANDOVER.md, README.md` (exploring · keep handover trio)
- `report-store-legacy/{STATUS,HANDOVER,README,LEGACY-READONLY,ATTRIBUTIONS,FOLDER_CONTEXT,MIGRATION_LOG}.md` · frozen-readonly but docs are reference
- `V0_lite_report-legacy/{LEGACY-READONLY,README,ATTRIBUTIONS}.md` only · 33 other md files in folder → ARCHIVE (see below)
- `ken-research-backend/FOLDER_CONTEXT.md`
- `webpages-ken/*` STATUS/HANDOVER if present

### `/scripts/`
- `FOLDER_CONTEXT.md`, all `.mjs` / `.sh` · canonical tooling

### `/design-system-audit/` (Stage 1 forensic · current value)
- `00_README.md`, `01_methodology.md`, `99_decision-record.md` · top-level audit trail
- `external-references/{wired,theverge,00_overview}.md` · design ref
- `gap-analysis/{og-vs-core-v2,og-vs-industry,prioritized-actions}.md`
- `industry-research/*.md` (10 files) · DS benchmarks
- `worked-examples/*` · pattern-lesson docs · still cited

---

## UPDATE list (canonical but stale content · needs Phase 6 refresh)

| File | Why UPDATE | Specifics to fix |
|---|---|---|
| `/CLAUDE.md` | Points to ROUTING.md which will be superseded by NEW canonical workflow doc in Phase 4 | Swap workflow pointer · refresh skill-routing line · add `CANONICAL-WORKFLOW.md` cite |
| `/workflows/ROUTING.md` | Will be merged/replaced by Phase 4 `CANONICAL-WORKFLOW.md` synthesis | Mark deprecated or merge sections into new doc |
| `/skills/SKILL_ROUTING.md` | Stale skill list — references skills that may be pruned in Phase 5 | Sync w/ active 8 workspace + 4 external set |
| `/skills/INDEX_BY_CATEGORY.md` | Same as SKILL_ROUTING — may have stale category counts post-prune | Refresh post-Phase 5 |
| `/design-system/COMPONENT_REFERENCE.md` (root) | 1 KB pointer · may need redirect to `core-v2/docs/COMPONENT_REFERENCE.md` (28 KB authoritative version) | Mark as pointer, ensure single source |
| `/design-system/4WH_AUDIT.md` (root) | 1 KB · same pattern · pointer file w/ minimal content | Confirm canonical lives in core-v2/docs/ |
| `/docs/CHANGELOG.md` | 1419 lines · canonical but growing fast · per WORKFLOW-RESET §2 candidate for consolidation of duplicated agent-observation TODOs | Phase 6 review: dedupe + propagate to ANTI-PATTERNS |
| `/HANDOVER_TRACKER.md` | Canonical but row count grows w/o pruning frozen-readonly + deleted projects | Phase 6: archive `deleted-` rows to docs/HANDOVER_TRACKER_ARCHIVE.md |

---

## ARCHIVE list (move to `_archive/` · not delete)

| File | Move to | Why ARCHIVE |
|---|---|---|
| `/docs/SPRINT-LEARNINGS-2026-05-08.md` (13 KB) | `docs/_archive/sprints/` | Sprint 2026-05-08 closed · already promoted to LEARNINGS.md per MEMORY.md |
| `/docs/AURA_SPRINT_2026-05-01.md` (29 KB) | `docs/_archive/sprints/` | Sprint 2026-05-01 closed · DS Phase 1.5 history |
| `/docs/PLAN-2026-05-08-aura-tightening.md` (23 KB) | `docs/_archive/plans/` | Plan executed · sprint complete · `project_tightening_sprint_2026-05-08.md` already captures it |
| `/docs/VISUAL_GAP_MATRIX.md` (10 KB · May 1) | `docs/_archive/` | One-off audit doc · superseded by core-v2 GAPS.md |
| `/docs/KENRESEARCH_DESIGN_SYSTEM_PHASE1.md` (15 KB · Apr 30) | `docs/_archive/phase1/` | Phase 1 closed · DS now on v2 |
| `/docs/DESIGN_SYSTEM_EVOLUTION.md` (10 KB · Apr 30) | `docs/_archive/phase1/` | Same — Phase 1 doc · superseded by EXECUTION_PLAN.md |
| `/docs/aura-sprint-2026-05-07-port/` (7 files: A-synth, A1-A3 audits, B-DS-forensic, B2, RESUME-NOTE) | `docs/_archive/sprints/2026-05-07/` | Sprint closed per MEMORY.md `project_sprint_2026-05-07_3-port-resume.md` |
| `/CLAUDE.original.md` (8 KB · Apr 29) | `_archive/` OR DELETE if caveman stable >30 days | Pre-caveman backup; caveman stable per MEMORY.md `project_caveman_setup.md` — recommend ARCHIVE first, DELETE after 30 more days |
| `/skills/SKILL_ROUTING.original.md` | `skills/_archive/` | Pre-prune backup · referenced as "original" |
| `/design-system/core-v2/docs/MIGRATION_FROM_V1.md` (2 KB · May 8) | `docs/_archive/` | v1 deleted · migration done |
| `/design-system/core-v2/docs/RECIPES.md` (1 KB · May 8) | `_archive/` | Stub · authoritative is `design-system/recipes/` root |
| `/design-system/core-v2/docs/PATTERNS.md` (13 KB · May 8) | Review for merge into ANTI_PATTERNS or COMPOSITION_GRAMMAR | Likely superseded · check overlap |
| `"Design_system_vs_26 (og and final)"/` (395 MB folder) | `_archive/Design_system_vs_26/` at root | OG reference DS · "read-only forever" per MEMORY.md `feedback_ds_port_workflow.md` · should live under `_archive/` to signal frozen status (currently top-level confuses AI) — 19 md files inside become archive value |
| `/_sections-archive-reports-pdp-2026-05-12/` (39 files · 364 KB · already named `_sections-archive-`) | Move to `projects/_archive/` for tidiness | Already-archived sections · just relocate |
| `/projects/V0.2 -for design system/PHASE_*_COMPLETE.md` (~10 files: `PHASE_2_FOUNDATION_COMPLETE`, `PHASE_3_ATOMIC_COMPONENTS_COMPLETE`, `PHASE_4_COMPOSITE_COMPONENTS_COMPLETE`, `PHASE_5_ORGANISMS_COMPLETE`, etc.) | `projects/V0.2 -for design system/_archive/phases/` | Completion reports of finished phases · history only |
| `/projects/V0_lite_report-legacy/PHASE_*_COMPLETE.md, FIXES_*.md, AUDIT_*.md, FIX_PLAN_*.md` (~33 files of 36 total) | `projects/V0_lite_report-legacy/_archive/` | Whole project is `frozen-readonly` per HANDOVER_TRACKER.md. Per `feedback_handover_discipline.md` rule "never edit handed/frozen folders" — but internal docs from history should be bundled in `_archive/` subdir to declutter root listing. Keep only LEGACY-READONLY.md + README.md + ATTRIBUTIONS.md at root |
| `/design-system-audit/og-audit/` (70 individual atom/molecule .md files) | Keep as-is OR `design-system-audit/_archive/og-audit/` | Stage 1 individual component audits · synthesis is in `LEGACY-AUDIT/` core-v2 docs · low day-to-day value |

---

## DELETE list (confirmed safe · awaiting user approval)

| Path | Size | Why DELETE | Risk |
|---|---|---|---|
| `/.DS_Store` (11 instances across workspace) | ~80 KB total | macOS metadata · generated artifact · `.gitignore` should suppress | Zero |
| `/projects/V0.2 -for design system/COMPREHENSIVE_COMPONENT_ANALYSIS_PART{1,2,3,4,4B,5,5B,5C,6,6B,7}.md` (11 files) | ~500 KB est | Agent-generated component analysis spam from old sprint · series of progressively-numbered reports w/ no consolidated summary doc · contradicts newer canonical `core-v2/docs/COMPONENT_REFERENCE.md` (28 KB authoritative list) · confuses AI w/ stale component mapping | Low — content history is in git |
| `/projects/V0.2 -for design system/CLEANUP_{EXECUTION_SUMMARY,SUCCESS_REPORT,VISUAL_SUMMARY,COMPLETED}.md, DETAILED_CLEANUP_PLAN.md, EXECUTIVE_SUMMARY_CLEANUP.md, FILES_TO_DELETE_REVIEW.md, CODE_CLEANUP_AUDIT.md` (~8 files) | ~150 KB | Recursive cleanup-meta-docs · self-referential agent-loop artifact · pure noise | Low |
| `/projects/V0.2 -for design system/AUDIT*` series (~10 files: AUDIT-QUICK-SUMMARY, AUDIT-SUMMARY-QUICK-VIEW, AUDIT_AND_REMEDIATION_SUMMARY, COMPREHENSIVE_AUDIT_REPORT, DESIGN-SYSTEM-AUDIT-REPORT, DESIGN-SYSTEM-AUDIT-SCORECARD, DESIGN-SYSTEM-COMPLIANCE-AUDIT, DESIGN-SYSTEM-COMPONENT-AUDIT, DESIGN_SYSTEM_AUDIT, DESIGN_SYSTEM_AUDIT_REPORT, KP-2.0-COMPLIANCE-AUDIT-FULL, MARKET-ANALYSIS-AUDIT-REPORT, PROJECT-KP-2.0-COMPREHENSIVE-AUDIT-REPORT, REAL_DESIGN_SYSTEM_AUDIT, REGIONAL_COMPARISON_AUDIT) | ~250 KB | Duplicate / superseded audit docs · authoritative is now `core-v2/docs/DS-AUDIT-2026-05-20.md` + `design-system-audit/` synthesis · these old per-feature audits contradict newer canon · confuse AI | Low |
| `/projects/V0.2 -for design system/*_FIXES_COMPLETE.md, *_FIX_*.md, MARKET-*-FIXES-COMPLETE.md, MARKET-OVERVIEW-FIXES-COMPLETE.md, SCOPE-OF-REPORT-FIXES-COMPLETE.md, SCOPE-OF-REPORT-REBUILD-COMPLETE.md, TABLE-OF-CONTENTS-FIXES-COMPLETE.md, COLOR_SYSTEM_FIX_COMPLETE.md, CHAPTER_5_FIXES_COMPLETE.md, DESIGN_SYSTEM_FIX_PLAN.md, DESIGN_SYSTEM_FIX_EXECUTIVE_SUMMARY.md` (~12 files) | ~200 KB | One-off fix-complete reports from old V0.2 sprint · history exists in git · zero forward value | Low |
| `/projects/V0.2 -for design system/DESIGN_SYSTEM_{COMPLETE,ANALYSIS_COMPLETE,STATUS_SUMMARY,PROGRESS_REPORT,UPDATE_SUMMARY,MASTER_INDEX,MASTER_PLAN,2.0-COMPLETE}.md, DESIGN-SYSTEM-2.0-COMPLETE.md, MASTER_DESIGN_SYSTEM_SUMMARY.md` (~10 files) | ~250 KB | Multiple competing "master" docs · directly contradict `core-v2/docs/MASTER-PLAN.md` (which IS canonical) · confuses AI when grep'ing for "master plan" | Medium — verify none referenced by tech team or HANDOVER_TRACKER |
| `/projects/V0.2 -for design system/BLITZ-MODE-PROGRESS-UPDATE-7-OF-10.md, CHAPTER_STRUCTURE_VERIFIED.md, COMPONENT_ANALYSIS_IN_PROGRESS.md, MASSIVE-10-SECTION-AUDIT-SUMMARY.md, COMPONENT-SCORECARD.md, FINAL_UPDATE_SUMMARY.md, FINAL_PROJECT_STATUS.md, GLOBAL_UPDATES_REPORT.md, IMPLEMENTATION_CHECKLIST.md, IMPLEMENTATION_COMPLETE.md, LAYOUT-SYSTEM-ADDED.md, TYPOGRAPHY-RULE-ADDED.md, FONT-MONO-REMOVAL-SUMMARY.md, NEXT_STEPS_GUIDE.md, PHOSPHOR_ICONS_MIGRATION_GUIDE.md, COMPLIANCE-VISUAL-CHART.md, MIGRATION_GUIDE.md, REGIONAL_COMPARISON_UPDATE.md, STATCARD_EXTRACTION_REGIONAL.md, STICKY_TOC_ANSWER.md, TOC_{COMPLETE_PACKAGE,USAGE_GUIDE,QUICK_REFERENCE,DOCUMENTATION}.md, VIOLATIONS_QUICK_LIST.md, WHAT-TO-SHARE.md, README_DESIGN_SYSTEM_COMPLETE.md, START_HERE.md, QUICK_REFERENCE.md, QUICK_START_GUIDE.md, PROJECT_DOCUMENTATION.md, CLEANUP_VISUAL_SUMMARY.md, PHASE_1_DISCOVERY_ANALYSIS_REPORT.md, PHASE_1_2_COMPLETION_REPORT.md, PHASE_3_4_COMPLETION_REPORT.md, PHASE_3_4_PROGRESS_REPORT.md, COMPREHENSIVE_ANALYSIS_PLAN.md, COMPONENT_MAP.md, COMPONENT_MAPPING.md, MASTER_COMPONENT_INDEX.md, CHARTS-PACKAGE-SUMMARY.md` (~40 files) | ~500 KB | Remaining agent-generated noise from V0.2 sprint · all duplicated by canonical synthesis docs in `core-v2/docs/` · per `feedback_anti_bloat.md` should never have existed · CLAUDE.md doesn't reference any | Low |
| `/projects/V0_lite_report-legacy/PHASES_COMPLETION_REPORT.md, PHASE_1_COMPLETION_REPORT.md, PHASE_1_PROGRESS.md, PHASE_2_COMPLETE.md, PHASE2_FIXES_COMPLETE.md, PHASE_4_COMPLETE.md, PHASE_5_COMPLETE.md, PHASE_5_TYPOGRAPHY_AUDIT.md, EXECUTION_SUMMARY.md, ANALYSIS_EXECUTIVE_SUMMARY.md, ARCHITECTURAL_ANALYSIS_REPORT.md, AUDIT_AND_FIX_PLAN.md, ARROW_DIRECTION_FIX.md, TYPOGRAPHY_CHANGES_NEEDED.md, UNINTENDED_CHANGES_ANALYSIS.md, ICON_AUDIT_REPORT.md, FIXES_APPLIED_SUMMARY.md, OPTION_A_STATUS_UPDATE.md, SECTION_LABEL_COMPONENT_GUIDE.md, LABEL-BADGE-USAGE-GUIDE.md, HERO_GLOW_FIX.md, DATA_UPDATES_SUMMARY.md, FIX_PLAN_PHASE2.md, HERO_SECTION_DESIGN_SYSTEM_GUIDE.md, CHANGES_SUMMARY_FOR_USER.md, FINAL_IMPLEMENTATION_GUIDE.md, VARIABLE_FONTS_IMPLEMENTATION_GUIDE.md` (~30 files) | ~400 KB | V0_lite_report-legacy `frozen-readonly` per HANDOVER_TRACKER · these are agent-spawn docs from history · LEGACY-READONLY.md + README.md + ATTRIBUTIONS.md sufficient to mark folder. Alternative: ARCHIVE rather than DELETE (see ARCHIVE list above) — listed here for user choice | Low — git has history |
| `/projects/reports-pdp-v2/` (empty per ls + HANDOVER_TRACKER says deleted-2026-05-11) | 16 KB | Per HANDOVER_TRACKER: "DELETED 2026-05-11" but path still exists w/ residue — purge | Zero — already marked deleted |
| `/graphify-out/GRAPH_REPORT.md` + 2.7 MB out dir | 2.7 MB | Generated artifact · regenerable via `graphify build` · per `.gitignore` should be excluded | Zero — regenerable |
| `/skills-lock.json` if no consumer | 519 B | Old skills lock pre-prune · CLAUDE.md doesn't cite it · likely orphan | Low — verify before delete |
| `/qa-screenshots/` (94 MB) | 94 MB | Screenshot bin · old QA captures · not load-bearing in any canonical doc | Zero — regenerable from QA runs |

---

## Cross-cutting findings

1. **2 mega-doc-stashes account for ~100+ stale docs:**
   - `projects/V0.2 -for design system/` has **98 .md files** at folder root. ~85 of them are agent-spawn artifacts from one closed sprint (phase-complete reports, audits, fix-completes, master-plan duplicates).
   - `projects/V0_lite_report-legacy/` has **36 .md files** in a `frozen-readonly` project. ~33 are sprint-history.
   - These two folders alone account for ~120 of the ~188 DELETE candidates.

2. **"Master plan" / "audit" naming collision:**
   - At least 10 docs across V0.2 and V0_lite use names like `MASTER_PLAN`, `MASTER_INDEX`, `DESIGN_SYSTEM_MASTER_*`, `COMPREHENSIVE_AUDIT_REPORT`. The canonical `core-v2/docs/MASTER-PLAN.md` is hidden in the noise. AI grep'ing for "MASTER" hits these stale ones first.

3. **Memory entries — all current:** 32 pinned MEMORY.md entries reviewed. None are >60 days w/o reference. Most recent batch is 2026-05-15 to 2026-05-18. NO stale memory entries to delete. (Originally flagged as candidate in WORKFLOW-RESET-PLAN §2 — false alarm.)

4. **CHANGELOG.md size watch:** 175 KB / 1419 lines. Per `feedback_anti_bloat.md` size budgets should self-check. Consider Phase 6 split into yearly/quarterly slices.

5. **Already-executed cleanups (no action needed):** `design-system/core/` (v1), `design-system/dashboard/`, `skills/_archive/` are ALL already gone. CLAUDE.md still references `design-system/dashboard/` and v1 `core/` in workspace map → UPDATE the workspace-map paragraph in CLAUDE.md.

6. **Top-level `Design_system_vs_26 (og and final)/` (395 MB):** at workspace root, named ambiguously ("og and final"). Per MEMORY.md `feedback_ds_port_workflow.md` it's "OG read-only forever". Should ARCHIVE under `_archive/` to signal frozen status — currently confuses AI at top-level scan.

7. **`design-system-audit/og-audit/` 70 individual atom/molecule .md files:** synthesis lives in `core-v2/docs/LEGACY-AUDIT/`. Per-component audits add archaeological value but cost grep noise. Suggest ARCHIVE in-place.

8. **Likely cross-link breakage if DELETEs proceed:** CHANGELOG entries reference some `V0.2 -for design system/PHASE_*_COMPLETE.md` docs. Recommend Phase 2b validator: grep DELETE list against CHANGELOG before executing.

---

## Recommendation

**Proceed to Phase 2b? YES — but in 3 graduated batches:**

| Batch | Risk | Action | Estimated time | MB freed |
|---|---|---|---|---|
| **B1 — zero-risk DELETEs** | None | `.DS_Store` (11) · `graphify-out/` · `qa-screenshots/` · empty `reports-pdp-v2/` residue | 5 min | ~97 MB |
| **B2 — ARCHIVEs (reversible)** | Low | Move all 40 ARCHIVE items to `_archive/` subdirs · keep history | 20 min | 0 MB freed (just relocated) but eliminates ~120 stale docs from top-level greps |
| **B3 — DELETE list (after user spot-checks)** | Low-Med | 188 V0.2 + V0_lite-legacy spam docs · git history preserves | 30 min after sample-validation | ~2 MB md text (folders stay; just md docs go) |

**Pre-B3 gate:** validator script grep CHANGELOG.md + workflows/ + skills/ + memory/MEMORY.md for any cross-references INTO the DELETE list. Any hit → demote to ARCHIVE.

**UPDATEs (Phase 6 · separate from this prune):**
- CLAUDE.md workspace-map paragraph: remove `core/` v1 frozen + `dashboard/` mentions (already deleted)
- CLAUDE.md workflow pointer: swap to `CANONICAL-WORKFLOW.md` post-Phase 4
- SKILL_ROUTING.md / INDEX_BY_CATEGORY.md: refresh post-Phase 5 prune
- HANDOVER_TRACKER.md: archive `deleted-*` and `frozen-readonly` rows to `docs/_archive/HANDOVER_TRACKER_ARCHIVE.md`

**Total cleanup estimate:** ~60 min execution · ~100 MB freed · ~250 stale docs removed/relocated · zero canonical loss.

---

**END · DOC-INVENTORY-2026-05-20.md**
