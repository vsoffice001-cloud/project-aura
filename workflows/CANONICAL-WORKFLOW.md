# CANONICAL-WORKFLOW · single source of truth for Aura task routing

**Date:** 2026-05-20
**Status:** AUTHORITATIVE · replaces `workflows/ROUTING.md` (archived)
**Audience:** Aura (Opus main) + subagents (aura-builder Sonnet · aura-qa Sonnet · aura-mech Haiku)
**Master rules:** (1) 4WH per scenario · (2) TodoWrite decompose · gate between sub-tasks

---

## 0 · Session boot

Every session reads (auto-load):
1. `CLAUDE.md` (root)
2. `MEMORY.md` (~/.claude/projects/.../memory/)
3. `core-v2/docs/AI-CONSUMPTION-PROTOCOL.md`
4. THIS doc

That's the canonical entry sequence. All deeper docs load on-demand.

---

## 1 · Classify task → pick scenario

Every task maps to one of 6 scenarios. Classify in 1 line · announce route w/ `→ Route: <scenario>` marker · execute.

| Scenario | Trigger | Time |
|---|---|---|
| **A** · Page build | "build a Ken Research page" · new full surface | hours-days |
| **B** · Component build | "build the X component" · single atom/molecule/organism | 30-90 min |
| **C** · Bug fix | "fix X" · diagnose + patch | 5-30 min |
| **D** · Refactor / multi-file | "rename X across codebase" · "swap Y" · spans 4+ files | 1-3 hr |
| **E** · Quick answer | "did X pass" · "is Y done" · status / question | <2 min |
| **F** · Audit / pre-handover | "is this ready for tech" · "QA gate" | 30-60 min |

If ambiguous · default to Plan agent for clarification.

---

## 2 · Scenario A · Page build (9-step process · 3 gates)

**Trigger:** user requests a page build OR major UI rebuild.

**9 steps · 2 HARD gates + 1 craft gate:**

```
1 · INTAKE          → understand requirements · capture WHY · scope · constraints
2 · RESEARCH        → audit legacy refs · skim recipe docs · find canonical patterns
3 · PROPOSE+BLOCK   → approach + 3 locks + DS atoms list + spacing + grid
   ⛔ GATE 1 · user blocks · says "yes / change / cancel" before step 4
4 · COMPOSE         → spawn aura-builder · build per locked approach · TSC green per batch
4.5 · CRAFT-PASS    → invoke aura-craft skill · per-section design polish · 6 principles
   ⛔ GATE 2 · craft-pass complete · proves per-section design vs DS-default drift
5 · SHOW FIRST CUT  → screenshot + dev URL · user reviews
   ⛔ GATE 3 · user blocks · says "yes / fix X / cancel" before step 6
6 · PROPOSE QA      → list QA scope · what'll be tested · estimate
7 · EXECUTE QA      → spawn aura-qa · Playwright + axe + Lighthouse · fix small issues inline
8 · EXIT            → update HANDOVER_TRACKER.md · README + HANDOVER + STATUS scaffold · sign-off
```

**Agents:**
- Step 4 · `aura-builder` (Sonnet)
- Step 4.5 · `aura-craft` skill OR `aura-builder` for craft polish
- Step 7 · `aura-qa` (Sonnet)

**Skills referenced:**
- `aura-design` · decisions
- `aura-craft` · per-section design (step 4.5)
- `webapp-testing` · Playwright + axe + Lighthouse (step 7)

**Never:**
- Skip steps 3 · 4.5 · 5 (HARD gates · regression vectors per LEARNINGS 2026-05-12)
- Spawn aura-builder without user OK
- Auto-spawn aura-qa without proposing QA scope

---

## 3 · Scenario B · Component build (5-step picker · 12-step port)

**Trigger:** "build/port the X atom/molecule/organism."

**5-step picker (from AI-CONSUMPTION-PROTOCOL.md §2):**
1. Classify (atom/molecule/organism/template/recipe)
2. Check GAPS.md · listed missing?
3. Check core-v2/src/<tier>/index.ts · exported?
4. Check SPACING-COMPOSITION-LAYOUT-CANON · spacing/comp/layout
5. Check ANTI-PATTERNS.md · no violation

**If port needed · 12-step process per component:**

```
1 · Read CANONICAL-SOURCE-MAP row
2 · Read source file at canonical legacy path
3 · Read existing core-v2 file if exists
4 · Apply TOKEN-GAP-REPORT §4 port refactor rules (23 rules)
5 · Apply SPACING-COMPOSITION-LAYOUT-CANON tokens
6 · Apply ANTI-PATTERNS rules (40+)
7 · Write core-v2/src/<tier>/<Name>.tsx (WWWWH JSDoc · TS props · 'use client' if interactive · zero hardcoded · a11y · Framer reduced-motion)
8 · Write sidecar <Name>.md (WWWWH + API + tokens + a11y + motion + responsive + code example)
9 · Update core-v2/src/<tier>/index.ts export
10 · Mark GAPS.md entry ✅ PORTED YYYY-MM-DD
11 · Run pnpm tsc --noEmit · expect green
12 · Log CHANGELOG entry
```

**Agent:** aura-builder (Sonnet) for stack-aware build · aura-mech (Haiku) for locked-scope mechanical (rename · move · fill template · ≤3 files).

---

## 4 · Scenario C · Bug fix

**Trigger:** "fix X" / "X is broken."

**Process:**
1. Diagnose · read file at error site · understand root cause
2. Fix · apply targeted patch · prefer Edit over Write
3. Verify · TSC + HTTP 200 + relevant test passes
4. Log CHANGELOG (Aura-infra) if infra change · else inline

**No TodoWrite needed if <3 steps · just execute · ultra terse.**

**Agent:** Opus main thread OR aura-builder if stack-aware.

---

## 5 · Scenario D · Refactor / multi-file change

**Trigger:** "rename X across codebase" · "swap Y" · "refactor Z" · spans 4+ files.

**Process:**
1. TodoWrite plan first (decompose · master rule 2)
2. Spawn agent based on scope:
   - <3 files locked-spec → aura-mech (Haiku)
   - 5-15 files stack-aware → aura-builder (Sonnet)
   - >15 files OR cross-cutting → escalate to Opus main · sub-batches
3. Gate between sub-batches · user OR auto-mode default

---

## 6 · Scenario E · Quick answer

**Trigger:** "did X pass" · "what's the status of Y" · "is Z done."

**Process:** Read 1-2 sources · 1-line answer.

**No TodoWrite · no agent · ultra terse.**

---

## 7 · Scenario F · Audit / pre-handover

**Trigger:** "is this ready for tech" · "QA gate this" · "audit X."

**13-point pre-handover checklist (per HANDOVER_TRACKER.md):**
1. Lint passes
2. TSC clean
3. Build succeeds
4. Mock data realistic + complete
5. README · STATUS · HANDOVER docs present
6. No console errors in production
7. axe a11y · zero serious
8. Lighthouse a11y ≥95
9. Lighthouse perf ≥90
10. Mobile responsive (375 · 768 · 1024 · 1440)
11. Keyboard nav · skip-link + tab order
12. Reduced-motion respected
13. No legacy-ds references · zero invented UI

**Agent:** aura-qa (Sonnet) · uses webapp-testing skill (Playwright + axe + Lighthouse).

**Output:** HANDOVER-GATE-YYYY-MM-DD.md report · update HANDOVER_TRACKER.md status.

---

## 8 · Agent + model routing

| Tier | Model | Agent | Scope | Hard NEVER |
|---|---|---|---|---|
| L0 | Haiku | aura-mech | Locked-spec mechanical (≤3 files): find/replace · rename · move · fill template · lint:fix · format · log append · package.json field bump | shadcn/Framer/Tailwind v4 logic · multi-file judgment · token decisions · brand voice · "what's dead" · >3 files |
| L1 | Sonnet | aura-builder (build) · aura-qa (validate) | Stack-aware build/refactor (5-15 files) · motion wiring · token-aware refactor · pre-handover gate · a11y/perf/visual passes | brand/voice forks · plan from ambiguity · cross-cutting arch · >15 files |
| L2 | Opus | main thread | Judgment + synthesis · ambiguity · plan/critique · brand/token/architecture · screenshot critique · trade-off analysis · routing decisions | n/a · ceiling |
| L3 | search | Explore | "Where is X" · "find Y" · read-only excerpts | n/a |
| L4 | plan | Plan | Multi-file research → plan only | never edits |

**Decision tree:**
- Ambiguous / synthesis → Opus
- Locked + no stack → Haiku
- Locked + stack-aware → Sonnet build
- QA gate → Sonnet QA
- Find/where → Explore
- Plan-only → Plan
- Default → Sonnet

**Boundaries:**
- Haiku ≤3 files
- Sonnet ≤15 files
- Opus may parallel-delegate

---

## 9 · Token-efficiency rules (6 enforced)

1. **Graphify mandatory** at >50 files OR >100k tokens · `graphify build <path> && graphify query "..."` before naive read
2. **Slice big files** · `Read(offset, limit)` for known sections · whole-file only when <200 lines
3. **Parallel tool calls** for independent ops · single message · multiple tool blocks
4. **Scoped grep** · `grep -rn "<pat>" projects/<name>/src/` not `grep -rn "<pat>" .`
5. **Memory-then-verify** · use memory facts w/o re-reading source unless gating user action
6. **Skip TodoWrite** for <3 step tasks · use only when task spans turns or has 3+ distinct steps

**Edit > Write** for existing files.

---

## 10 · Visible trace markers

Every routing/spawn/log/check action emits a `→` prefixed marker line so user can validate pipeline fired:

- `→ Route: <scenario>` (after classify)
- `→ Scan: <doc>` (memory/docs read)
- `→ Step N · <action>`
- `→ Spawn: <agent> (model)` (before agent invoke)
- `→ Return: <agent> · <summary>` (after agent finish)
- `→ Log: <file>` (CHANGELOG / LEARNINGS / DECISIONS append)
- `→ Check: <verification>` (TSC / lint / build / HTTP)
- `→ Exit: <stage>` (gate reached · awaiting user)

Model-switch enforced via 3 visible layers:
- L1 announced spawn ("→ Spawn: aura-builder (Sonnet)")
- L2 actual invoke (Agent tool · subagent_type)
- L3 agent-reported "Model used: Sonnet" in self-check

---

## 11 · Output style (caveman-FULL default)

Drop articles · fragments OK · short synonyms · abbreviations. Code/commands/security verbatim. Auto-clarity for destructive ops.

- User says "lite" → keep grammar
- "normal" / "verbose" → full prose
- "ultra" → telegraphic

Caveman skill installed · hooks at `~/.claude/hooks/` · mode in `~/.config/caveman/config.json`.

---

## 12 · Anti-bloat enforcement

Size budgets:
- CLAUDE.md (root) · ≤150 lines · point to deeper docs
- MEMORY.md · ≤200 lines (truncated after that)
- LEARNINGS.md `## Active` ≤50 entries
- DECISIONS.md `## Active` ≤30 entries
- THIS doc · ≤500 lines

Self-check before editing canonical docs · never grow them to fit new content · move detail to pointed-to file.

---

## 13 · Learning loop

Before each task:
- Scan last 5 LEARNINGS `## Active` entries
- Scan last 3 DECISIONS `## Active` entries
- Apply matching patterns

After each task (exit checklist):
- Log corrections / validations / fork decisions / infra changes
- Propagate build/QA learnings to agent templates
- Update GAPS.md if new gap discovered
- Update ANTI-PATTERNS if new violation pattern seen

---

## 14 · Infra change protocol

Any change to:
- CLAUDE.md
- THIS doc (CANONICAL-WORKFLOW.md)
- AI-CONSUMPTION-PROTOCOL.md
- Agent templates (workflows/agents/ + .claude/agents/)
- Memories
- Hooks

→ Mandatory entry in `docs/CHANGELOG.md` (Aura-infra section).

Dual-path agent sync:
- Claude Code CLI uses `.claude/agents/` (native `subagent_type` direct)
- Antigravity pastes template into `general-purpose` prompt
- Substantive edits propagate to BOTH paths

---

## 15 · Per-scenario behavior cheat-sheet

| Scenario | Mode | Who |
|---|---|---|
| Design exploration ("what should X look like") | Verbose | Opus main |
| Component build ("build the card") | Lite frame → delegate → lite summary | Opus frame · Sonnet build |
| Status check ("did lint pass") | Ultra (1 line) | Opus main |
| Bug fix | Lite + code | Opus or Sonnet by complexity |
| Screenshot/page critique | Verbose · structured (UX laws · hierarchy · motion · a11y) | Opus main |
| Commit msg | Conventional · ≤50 char subject · why over what | inline |
| PR review comment | One line: `L42: 🔴 bug: X. Fix: Y.` | inline |
| Multi-file research before impl | Returns plan only | Plan agent |
| Lookup ("where is X defined") | Excerpts only | Explore agent |
| Pre-handover gate | Structured 13-point checklist | Opus frame · Sonnet QA |

---

## 16 · Done when

- [ ] User approves this doc
- [ ] `workflows/ROUTING.md` archived to `workflows/_archive/`
- [ ] CLAUDE.md updated to point to this doc + AI-CONSUMPTION-PROTOCOL
- [ ] Next AI session reads this doc · routes via §1 scenarios · no ROUTING.md reference

---

**END · CANONICAL-WORKFLOW.md**
**Replaces:** workflows/ROUTING.md (archive post-approval)
**Next:** Phase 5 · SKILL-AUDIT-2026-05-20.md
