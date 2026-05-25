# WORKFLOW-RESET-PLAN · post-Stage 5 workspace cleanup + AI consumption protocol

**Date created:** 2026-05-20
**Owner:** Aura (Opus main)
**Status:** DRAFT · awaiting user approval after Stage 5 P0-P5 execution
**Master rules applied:** (1) 4WH per phase · (2) TodoWrite gate-bound · gate between phases
**Prerequisite:** Stage 5 P0-P5 complete · v0.3 handover-ready

---

## 0 · WHY this plan exists

After 5 sprints + Stage 3-5 ports · workspace has accumulated process layers · stale docs · skill drift · confused AI context:

- 16 docs in `core-v2/docs/` · some pre-Sprint · some Stage 2 NEW · no canonical "read first" pointer
- 12 active skills + 72 archived · most unused
- 3 agent templates (.claude/agents/ + workflows/agents/) · 2 paths · sync drift
- 5 memory files · 30+ entries · most stale
- 32 CHANGELOG entries this session · agent observations · most never propagated to ANTI-PATTERNS or AI-PICKER-GUIDE
- Root CLAUDE.md references older states · workflows/ROUTING.md grew · SKILL_ROUTING.md narrowed
- Stage 3 ports proved AI discovers same patterns repeatedly (LogoButton href · InlineLink onDark · Breadcrumb naming · etc)

**Without cleanup:** next AI session reads 50+ docs · still misses canonical path · repeats discovery cycle · drifts.

---

## 1 · 4WH on this plan itself

**WHAT** · 6-phase workspace cleanup + AI consumption protocol reset
**WHY** · Lock canonical AI workflow · prevent next-session drift · pay-down accumulated process debt · close out DS reclaim work
**WHEN** · After Stage 5 P0-P5 complete (v0.3 handover-ready) · NOT before · need handover gate output to feed cleanup
**WHERE** · `design-system/core-v2/docs/` + `skills/` + `workflows/` + `.claude/agents/` + root `CLAUDE.md` + memory directory
**HOW** · 6 phases · gated · audit→prune→canonicalize→consume protocol→agent realign→sign-off

---

## 2 · Phase breakdown

### Phase 1 · DS Plan-vs-Delivery Audit (read-only · 1 hr)

**WHAT** · Verify MASTER-PLAN claims vs actual state. Did we ship what we said? Where did we drift?

**Deliverable:** `DS-AUDIT-2026-05-20.md`

**13 verification checks:**
1. 7 synthesis docs exist + accurate (TOKEN-GAP-REPORT · CANONICAL-SOURCE-MAP · etc)
2. 53 tokens in `base.css :root` · cite line range
3. 27 primitives (Stage 3.1) ported · cross-ref CANONICAL-SOURCE-MAP
4. 11 V0.2 cards (Stage 3.2a-redo) ported · TSC consume
5. 7 layout organisms (Stage 3.2b) ported
6. 4 D3 organisms (Stage 3.2c) ported + d3 deps installed
7. MapChart + TabStrip + RegionalComparison (Stage 3.3a) ported · react-simple-maps installed
8. 6 chrome molecules + Navbar + Footer + ReportHeroSection (Stage 3.3b)
9. 7 data organisms (Stage 3.3c) · MarketDataTable a11y keyboard fix verified
10. 7 listing organisms (Stage 3.3d) · 2 duplicates removed
11. 9 templates (Stage 3.3e · greenfield) + v1-product-page.md recipe
12. v0.3 swap (Stage 4) · 22 sections consuming DS · zero legacy-ds refs
13. Stage 5 QA · Lighthouse scores · axe violation count · DS escalations resolved

**Output sections:**
- ✅ Match (plan = delivery)
- ⚠️ Drift (delivery ≠ plan · note delta)
- 🔴 Gap (in plan · not delivered)

**Tools:** Bash grep · Read · subagent for Lighthouse re-run

**Gate G-WR1:** user reviews audit doc · decides if drift acceptable OR remediation needed before Phase 2

---

### Phase 2 · Doc Inventory + Prune (2 hr)

**WHAT** · Catalog every doc in workspace · classify (KEEP / UPDATE / ARCHIVE / DELETE) · execute pruning.

**Deliverable:** `DOC-INVENTORY-2026-05-20.md` + actual deletes/moves

**Locations to inventory:**
- `design-system/core-v2/docs/` (current count: 16+ files post-Stage 2)
- `design-system/` root (DESIGN.md · 4WH_AUDIT.md · ANTI_PATTERNS.md · COMPONENT_REFERENCE.md)
- `design-system/recipes/`
- `workflows/`
- `skills/SKILL_ROUTING.md` · `INDEX_BY_CATEGORY.md`
- Root `CLAUDE.md` · `CLAUDE.original.md` · `Quick_start_guide.md` · `FOLDER_CONTEXT.md` · `HANDOVER_TRACKER.md`
- `docs/` (LEARNINGS · DECISIONS · CHANGELOG)
- `templates/` (STATUS · HANDOVER · README templates)
- Memory: `~/.claude/projects/-Users-vishalchauchan-Downloads-Anti-folder01/memory/`

**Classification rules:**
- **KEEP** · canonical · current · referenced by current workflow
- **UPDATE** · canonical but stale content · refresh
- **ARCHIVE** · superseded but historically valuable · move to `_archive/`
- **DELETE** · obsolete · duplicate · confuses AI

**Likely DELETE candidates (proposal · subject to audit):**
- `CLAUDE.original.md` (backup pre-caveman · no longer needed if caveman stable)
- Old sprint logs `docs/SPRINT-LEARNINGS-2026-05-08.md` etc (already promoted to LEARNINGS.md)
- `design-system/dashboard/` (Figma Make duplicate · per CLAUDE.md "slated for delete after v1 cutover")
- `skills/_archive/` (73 dirs · 838 MB · per past DECISIONS · already approved deletion)
- Memory entries past 60 days w/ no recent reference

**Likely UPDATE candidates:**
- `CLAUDE.md` (root) · point to NEW canonical workflow (Phase 4)
- `workflows/ROUTING.md` · simplify · remove obsolete workflows
- `skills/SKILL_ROUTING.md` · audit 12 active skills · keep useful 5-7

**Gate G-WR2:** user reviews DOC-INVENTORY · approves DELETE list before execution

---

### Phase 3 · AI-Consumption Protocol (1.5 hr)

**WHAT** · Lock canonical "how AI consumes DS" protocol · single source of truth · feeds every future session.

**Deliverable:** `AI-CONSUMPTION-PROTOCOL.md` in `core-v2/docs/`

**Structure (8 sections):**

1. **Entry · session boot sequence**
   - Always-load: CLAUDE.md · MEMORY.md · ROUTING.md (or new equivalent)
   - On-demand: AI-PICKER-GUIDE · ANTI-PATTERNS · CANONICAL-SOURCE-MAP · TOKEN-GAP-REPORT

2. **Tier hierarchy + canonical paths**
   - Tier 0 Foundation · `core-v2/styles/base.css` · 200+ tokens · WWWWH per category
   - Tier 1 Atoms · `core-v2/src/atoms/` · WWWWH sidecar `.md` per atom
   - Tier 2 Molecules · `core-v2/src/molecules/`
   - Tier 3 Organisms · `core-v2/src/organisms/`
   - Tier 4 Templates · `core-v2/src/templates/`
   - Tier 5 Page recipes · `design-system/recipes/`

3. **5-step picker (from AI-PICKER-GUIDE · canonicalized)**

4. **Token-first rule + 23 port refactor rules (from TOKEN-GAP-REPORT §4)**

5. **Composition rules (from SPACING-COMPOSITION-LAYOUT-CANON · canonicalized)**

6. **GAPS · DO NOT INVENT list (auto-synced w/ GAPS.md)**

7. **ANTI-PATTERNS (40+ rules · canonicalized + sourced)**

8. **Master rules · 4WH + TodoWrite decomposition**

**This doc REPLACES the read-first ordering of the 7 synthesis docs.** Synthesis docs stay as deep reference · this doc is the index.

**Gate G-WR3:** user reviews AI-CONSUMPTION-PROTOCOL · approves canonicalization

---

### Phase 4 · NEW Workflow + Delete Old (2 hr)

**WHAT** · Replace `workflows/ROUTING.md` w/ NEW canonical workflow · delete old workflows that conflict.

**Deliverable:** NEW `workflows/CANONICAL-WORKFLOW.md` · delete `workflows/ROUTING.md` + obsolete workflow files

**NEW workflow structure (concrete · scenario-driven):**

```
SCENARIO → CANONICAL PATH

A · "Build a Ken Research page"
  → Read: CLAUDE.md · MEMORY.md · core-v2/docs/AI-CONSUMPTION-PROTOCOL.md
  → 9-step process: INTAKE · RESEARCH · PROPOSE+BLOCK · COMPOSE · CRAFT-PASS · SHOW FIRST CUT · PROPOSE QA · EXECUTE QA · EXIT
  → 2 hard gates (PROPOSE+BLOCK · SHOW FIRST CUT) + 1 craft gate (CRAFT-PASS)
  → Agent: aura-builder (Sonnet) for build · aura-qa (Sonnet) for QA gate
  → Skills used: aura-design (decisions) · aura-craft (per-section design) · webapp-testing (QA)

B · "Build a single component"
  → Read: AI-CONSUMPTION-PROTOCOL.md
  → 5-step picker → port-or-compose decision → write w/ sidecar .md → TSC verify
  → Agent: aura-builder

C · "Fix a bug"
  → Lite · diagnose → fix → verify · no plan needed if <3 steps

D · "Refactor / multi-file change"
  → TodoWrite plan · agent spawn if >15 files

E · "Quick answer / status"
  → Ultra terse · 1-line · no agent

F · "Audit / pre-handover"
  → 13-point checklist · aura-qa
```

**Delete:**
- `workflows/ROUTING.md` (old · superseded)
- Workflow templates that no longer apply (audit each)
- Old skill triggers that don't map to canonical workflow

**Gate G-WR4:** user approves NEW workflow · approves delete list

---

### Phase 5 · Skill Audit + Realign (1 hr)

**WHAT** · Audit 12 active skills · keep canonical 5-7 · delete unused · update entry points.

**Deliverable:** `SKILL-AUDIT-2026-05-20.md` + updated `skills/SKILL_ROUTING.md`

**Process per skill:**
1. List skill · last-used date · what it does
2. Decision: KEEP · UPDATE · ARCHIVE · DELETE
3. If KEEP · verify entry point matches NEW workflow scenarios
4. If UPDATE · prune content · canonicalize triggers
5. If DELETE · remove from `SKILL_ROUTING.md` + `INDEX_BY_CATEGORY.md`

**12 current active skills (per CLAUDE.md):**
- aura-design ★ · aura-craft ★ · ken-research · /page · frontend-design · framer-motion (ad-hoc) · webapp-testing · impeccable · graphify · caveman · skill-creator · (12th unconfirmed)

**Likely KEEP:**
- aura-design (decisions)
- aura-craft (per-section design · step 4.5 in page-build)
- /page slash command
- webapp-testing (Anthropic official)
- caveman (token compression · hooks installed)
- graphify (large-repo intel)

**Likely DELETE / ARCHIVE:**
- skill-creator (rarely used)
- impeccable (un-gated · but verify usage)
- frontend-design (ad-hoc usage · keep if referenced)
- ken-research (verify still active)

**Gate G-WR5:** user reviews skill audit · approves DELETE list

---

### Phase 6 · Aura Master-Pointer Refresh (30 min)

**WHAT** · Update Aura's master pointers (CLAUDE.md + MEMORY.md + workflows/agents/) to point to NEW canonical workflow + protocol.

**Deliverable:** updated CLAUDE.md + MEMORY.md · agent templates synced

**Edits:**
1. **CLAUDE.md (root)** · replace "Every task → read workflows/ROUTING.md first" w/ "Every task → read CANONICAL-WORKFLOW.md + AI-CONSUMPTION-PROTOCOL.md"
2. **MEMORY.md** · prune stale entries (>60 days · no recent reference) · add entry pointing to new canonical protocol
3. **workflows/agents/** · update aura-builder · aura-qa · aura-mech templates to reference new workflow + protocol
4. **.claude/agents/** · sync same edits (dual-path per `feedback_anti_bloat.md`)
5. **docs/CHANGELOG.md** · log workflow-reset completion · Aura-infra section

**Gate G-WR6:** user reviews refresh · final approval

---

## 3 · Per-phase deliverables (locked file paths)

| Phase | Deliverable | Path |
|---|---|---|
| 1 | DS audit | `core-v2/docs/DS-AUDIT-2026-05-20.md` |
| 2 | Doc inventory + actual deletes | `core-v2/docs/DOC-INVENTORY-2026-05-20.md` + filesystem changes |
| 3 | AI consumption protocol | `core-v2/docs/AI-CONSUMPTION-PROTOCOL.md` |
| 4 | NEW canonical workflow + deletes | `workflows/CANONICAL-WORKFLOW.md` + filesystem changes |
| 5 | Skill audit + realign | `core-v2/docs/SKILL-AUDIT-2026-05-20.md` + `skills/SKILL_ROUTING.md` updated |
| 6 | Aura master pointer refresh | `CLAUDE.md` + `MEMORY.md` + agent templates |

---

## 4 · Gates (6 · locked)

| Gate | After | Trigger | Approver |
|---|---|---|---|
| G-WR1 | Phase 1 | DS audit doc written | User |
| G-WR2 | Phase 2 | Doc inventory written · BEFORE deletes execute | User |
| G-WR3 | Phase 3 | AI-CONSUMPTION-PROTOCOL written | User |
| G-WR4 | Phase 4 | NEW workflow written · BEFORE deletes execute | User |
| G-WR5 | Phase 5 | Skill audit written · BEFORE deletes execute | User |
| G-WR6 | Phase 6 | All master pointers updated | User |

Each gate = STOP · show evidence · wait for "go" before next phase.

---

## 5 · Master-rule application

**Rule 1 · 4WH discipline**
Every phase has 4WH at top of section · every deliverable contains WWWWH per major artifact.

**Rule 2 · TodoWrite decomposition + gates**
TodoWrite list created at execution time · one in_progress · gate between phases.

---

## 6 · Success criteria

- ✅ DS-AUDIT-2026-05-20.md captures plan-vs-delivery · zero unflagged drift
- ✅ Doc inventory · canonical KEEP list · obsolete docs deleted · stale archived
- ✅ AI-CONSUMPTION-PROTOCOL.md is the single doc next-session AI reads first
- ✅ CANONICAL-WORKFLOW.md replaces old ROUTING.md · 6 scenarios mapped
- ✅ Skill list pruned 12 → 5-7 active · all entry points match workflow
- ✅ Aura master pointers updated · next session boots clean

---

## 7 · Out of scope

- v0.3 product page polish (P0-P5 covers this · separate plan)
- DS organism a11y fixes (P0 · separate)
- Highcharts perf fix (P1 · separate)
- Visual diff (P2 · separate)
- Backend / data shape changes
- New page recipes beyond v1-product-page
- Tech-team handover (separate workflow · post-P5)

---

## 8 · Risk register

| Risk | Mitigation |
|---|---|
| Phase 2 deletes break references | DRY-RUN grep all deletes · user reviews list before execution |
| AI-CONSUMPTION-PROTOCOL too long · AI doesn't read | Cap at 300 lines · all detail links to source docs |
| NEW workflow conflicts w/ existing CLAUDE.md auto-load | Phase 6 updates CLAUDE.md to point to new workflow · clean cutover |
| Skill deletes break in-flight invocations | Check `~/.claude/skills/` usage logs before delete |
| Memory entries deleted that are still useful | Aura approves each delete · user can override |
| Workflow-reset creates new drift over time | Add quarterly review cadence to LEARNINGS.md |

---

## 9 · Time estimate

| Phase | Time |
|---|---|
| 1 · Audit | 1 hr |
| 2 · Inventory + prune | 2 hr |
| 3 · AI consumption protocol | 1.5 hr |
| 4 · NEW workflow + delete | 2 hr |
| 5 · Skill audit | 1 hr |
| 6 · Master pointer refresh | 0.5 hr |
| **Total** | **8 hr** (1-2 sessions) |

---

## 10 · When to execute

**Prerequisite:** Stage 5 P0-P5 complete · v0.3 handover-ready · Lighthouse Perf ≥90 · A11y ≥95.

**Trigger:** User explicit approval after P0-P5 done.

**Order:** Sequential 1 → 6 · gated · CANNOT skip phases.

---

## 11 · Done when

- [ ] User approves this plan
- [ ] Stage 5 P0-P5 complete (prerequisite)
- [ ] All 6 phases executed · all 6 gates passed
- [ ] CLAUDE.md + MEMORY.md updated to point to new canonical workflow + protocol
- [ ] Next AI session boots cleanly · reads new docs · does NOT repeat discovery cycle
- [ ] DOC-INVENTORY logs all files deleted · all files updated · all files archived

---

## 12 · Approval

Plan locked at: `core-v2/docs/WORKFLOW-RESET-PLAN.md`

**Awaiting:**
1. User approves Option C (P0-P5 interleave) OR redirects
2. User approves THIS plan to execute AFTER Stage 5 P0-P5
3. Phase-by-phase gates apply once execution begins

---

**END · WORKFLOW-RESET-PLAN.md**
**Next action:** awaiting user call · then proceed P0-P5 from Stage 5 escalations · then this plan
