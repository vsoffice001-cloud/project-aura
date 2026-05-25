# Aura Routing — task → workflow → skill → agent

Read this **first** on every new task. Classify, announce route, execute.

Pair with: [skills/SKILL_ROUTING.md](../skills/SKILL_ROUTING.md) (skill picker) · [workflows/agents/](agents/) (Sonnet spawn templates) · [docs/CHANGELOG.md](../docs/CHANGELOG.md) (Aura-infra log).

---

## Model ladder (cost-quality, recalibrated 2026-04-30)

| Tier | Model | Subagent | Use for | Hard NEVER |
|---|---|---|---|---|
| **L0** | Haiku | `aura-mech` | Locked-scope mechanical: find/replace ≤3 files · rename · move · fill template w/ provided values · single-attribute add · `pnpm lint:fix` · format · append log entry · `package.json` field bump · `pip freeze` | shadcn/Framer Motion/Tailwind v4 · multi-file judgment · token decisions · brand voice · "what's dead" calls · >3 files |
| **L1** | Sonnet | `aura-builder` (build) · `aura-qa` (validate) | Stack-aware build: components/pages · motion wiring · token-aware refactor · multi-file w/ light judgment · pre-handover gate · a11y/perf/visual passes · 5-15 files | brand/voice forks · plan from ambiguity · cross-cutting architecture · >15 files |
| **L2** | Opus | main thread (no subagent) | Judgment + synthesis: ambiguity · plan/critique · brand/token/architecture decisions · screenshot critique · trade-off analysis · 5+ md file synthesis · routing decisions · LEARNINGS propagation | n/a — ceiling |
| **L3** | Search | `Explore` | "Where is X" · "find Y" · excerpt-only · doesn't pollute context | n/a |
| **L4** | Plan | `Plan` | Multi-file research → plan only · trade-off options | never edits |

**Decision tree (apply on every task):**
```
1. Ambiguous / synthesis / judgment        → L2 Opus (main)
2. Locked-scope + clear + no stack nuance  → L0 Haiku (aura-mech)
3. Locked-scope + clear + stack-aware      → L1 Sonnet (aura-builder)
4. QA gate (a11y/perf/visual/handover)     → L1 Sonnet (aura-qa)
5. "Where is X / find Y"                   → L3 Explore
6. "Plan but don't code"                   → L4 Plan
7. Default                                 → L1 Sonnet
```

**Rule:** Pick the cheapest model that won't fail. Match tier to actual cognitive load, not surface verb. Boundaries:
- Haiku reads ≤3 files. >3 → escalate Sonnet.
- Sonnet reads ≤15 files. >15 → Opus splits.
- Opus may delegate same task to multiple Sonnets/Haikus in parallel.

Full use-case map: `feedback_model_routing.md` memory.

**Token discipline rules (6, full spec at `feedback_token_efficiency.md`):**
1. **Graphify** — repo >50 files / query needs cross-file synthesis / >100k tokens → `graphify build <path>` then `graphify query "..."`. Never read 50+ files naively.
2. **Slice big files** — `Read(offset, limit)` for known sections · whole-file only when <200 lines · emit `→ Read: <path>:N-M (slice)` when slicing
3. **Parallel tool calls** when independent — single message · multiple tool blocks · emit `→ Step N · K parallel calls`
4. **Scoped grep** — `grep -rn "<pat>" projects/<name>/src/` not `grep -rn "<pat>" .` · use `--include` for file type · prefer `Glob` for file-pattern lookup
5. **Memory-then-verify** — use memory facts w/o re-read unless gating user action · emit `→ Scan: memory <file> (no re-read)`
6. **Skip TodoWrite** for <3 step tasks · use only when 3+ distinct steps OR multi-turn span

---

## Trace markers (visible pipeline proof)

`→ Route:` (classify) · `→ Scan:` (LEARNINGS+DECISIONS · or `memory <file>` (no re-read needed)` per Rule 5) · `→ Read: <path>:N-M (slice)` (when reading >500-line file partially per Rule 2) · `→ Step N/M · Model:` (workflow step) · `→ Step N · K parallel calls` (when emitting K independent tool calls in single message per Rule 3) · `→ Spawn: agent · Model:` (subagent invoke, L1) · `→ Return: agent · Model used:` (subagent return, L3) · `→ Log:` (DECISION/LEARNING/CHANGELOG) · `→ Check:` (anti-bloat) · `→ Exit:` (done). Full spec: `feedback_visible_trace.md` + `feedback_token_efficiency.md`. **Model-switch enforcement = L1 announced vs L3 reported. Mismatch = drift, log LEARNING.**

---

## Announce-route rule

Before acting on any non-trivial task, output trace marker:

```
→ Route: <workflow> · Skill: <skill or none> · Workflow steps: <N>
```

Skip announce only for `quick-answer` workflow (trivial Q, rename, 1-line edit).

User can redirect: "wrong workflow, use X" → re-route, no penalty.

---

## Task classifier

User phrasing is fuzzy. Match on intent, not regex. When ambiguous → ask 1 line.

| User says (intent) | Workflow |
|---|---|
| "build the [page/section/route]", "/page X", "make a new page for X" | `page-build` |
| "build the [card/button/atom]", "promote X to DS", "wire shadcn X" | `component-build` |
| "what should X look like", "explore options for Y", "ideas for Z" | `design-exploration` |
| "review this page", "critique screenshot", "audit the design" | `design-review` |
| "add scroll animation", "animate X on hover", "scroll-driven reveal" | `motion-pass` |
| "X is broken / fix / regression" · "clean up X / refactor / DRY" · "update copy / swap data / change headline" | `bug-fix` (folds refactor + content-update) |
| "is it ready to ship", "a11y check", "perf check", "handover audit", "prepare X for tech", "is X ready for tech" | `pre-handover` (folds a11y-perf-audit) |
| "what is X", "where is Y", "how does Z work" | `quick-answer` |
| "add new workflow", "edit Aura memory", "change CLAUDE.md" | `infra-change` |
| "/impeccable …", "polish with impeccable", "impeccable audit/live/colorize/…" | `impeccable-polish` |

---

## Workflow library

### `page-build` — CANONICAL 8-step process (updated 2026-05-12)

Full new Ken page or major UI build. **Two hard gates** at step 3 + step 5 (BLOCK on user OK). Recipe-driven via `/page <intent>` when applicable. Full chain: `skills/aura-design/chains/page-build.md`.

| Step | Mode | Skill | Agent | Gate? |
|---|---|---|---|---|
| 1. INTAKE — lock intent from PRD/brief/prompt · project target · recipe match · constraints | Lite | `aura-design` | Opus main | — |
| 2. RESEARCH — read PRD + recipe + voice + motion + anti-patterns + surface + density-picker + brand-variant + canonical consumers (v0_lite/v0.2/report-store). WRITE `projects/<name>/RESEARCH.md` | Verbose | `aura-design` + `ken-research` | Opus main (heavy = `Explore`) | — |
| 3. **PROPOSE** — approach + 3 LOCKS + DS atoms list + spacing tokens + grid + anti-pattern cats. **BLOCK on user OK** | Verbose | `aura-design` | Opus main | **HARD** |
| 4. COMPOSE — spawn aura-builder w/ RESEARCH.md path + 3 LOCKS + DS atoms list + spacing/grid cite. ≤15 files per spawn (split if larger) | Lite | `aura-builder` template | **Sonnet** (`aura-builder`) | — |
| 5. **SHOW FIRST CUT** — screenshots desktop + mobile · live URL · summary of built vs stub. **BLOCK on user response** | Lite | (none) | Opus main | **HARD** |
| 6. PROPOSE QA — gate menu · user picks priority subset OR delegates to Aura | Lite | (none) | Opus main | — |
| 7. EXECUTE QA — selected gates only · inline fixes ≤5 LOC · iterate per priority | Lite | `webapp-testing` + `aura-qa` template | **Sonnet** (`aura-qa`) | — |
| 8. EXIT — summary · LEARNINGS · STATUS · CHANGELOG if infra changed | Lite | (none) | Opus main | — |

**Why 8 steps with 2 hard gates:**
- Step 3 PROPOSE+BLOCK catches drift at plan stage (1 LOC cost) vs build-then-fix (10000+ LOC). User-validated approach BEFORE any spawn.
- Step 5 SHOW FIRST CUT catches visible issues BEFORE QA spawns (saves cycles, user agency on refinement direction).
- Step 6 PROPOSE QA respects user priorities (blanket gates = waste).

**Anti-patterns:**
- Skip step 2 RESEARCH → build = guess · no reference anchor
- Skip step 3 PROPOSE+BLOCK → user surprise at 10000 LOC built wrong
- Skip step 5 SHOW FIRST CUT → auto-QA on broken page · wasted cycles
- Skip step 6 PROPOSE QA → blanket gate run · misaligned priorities
- Spawn aura-builder w/ >15 files → token cap risk (LEARNING 2026-05-08)

**Logs (step 8):**
- CHANGELOG entry if infra changed (new tokens · new components · new DS atoms · workflow changes)
- LEARNINGS entry per correction/validation signal during build
- DECISIONS entry if non-default variant/density/grid chosen
- STATUS.md flip + gate checklist update
- HANDOVER_TRACKER.md row update if status changed

**Real incidents this process prevents:**
- ken-v2 case study (2026-05-05 · deleted same day): variant wrong · names invented · no bg alternation. Root: skipped gate.
- reports-pdp-v2 (2026-05-12 · partial rebuild): bespoke 600-LOC organisms · raw `<button>` · arbitrary spacing. Root: skipped PROPOSE+BLOCK + SHOW FIRST CUT.

Both traced to bypassing canonical chain. See `docs/LEARNINGS.md` entries.

---

### `component-build`
Single atom/molecule/organism — DS evolution OR project-local. Standalone (not always part of page-build).

| Step | Mode | Skill | Agent |
|---|---|---|---|
| 1. Frame (props, states, a11y, where consumed) | Lite | `aura-design` | Opus main |
| 2. Build (HTML, styles, states, types, JSDoc `@promotedFrom` if DS) | Lite | `frontend-design` | **Sonnet** (`aura-builder`) |
| 3. Validate (kbd nav, ARIA, contrast, token-only) | Lite | `webapp-testing` | Sonnet (`aura-qa`) |

**Logs:** CHANGELOG if new DS atom promoted to `core-v2/`.

---

### `design-exploration`
"What should X look like" — no code, judgment + refs.

| Step | Mode | Skill | Agent |
|---|---|---|---|
| 1. Frame goal + constraints | Verbose | `aura-design` | Opus main |
| 2. Refs/competitor scan if relevant | Verbose | `ken-research` (competitor wedge) · `references/design-systems/` browse | `Explore` agent |
| 3. Propose 2-3 directions w/ UX-law + Ken-anti-pattern rationale | Verbose | `aura-design` | Opus main |

**Logs:** DECISIONS entry if direction picked diverges from prior pattern.

---

### `bug-fix`
UI bug, regression, refactor (cleanup w/o behavior change), content-update (copy/data swap). All three folded here.

| Step | Mode | Skill | Agent |
|---|---|---|---|
| 1. Reproduce + root-cause | Lite | none (Aura native investigation) | **L2 Opus** main |
| 2. Fix (smallest diff) | Lite | none | **L0 Haiku** (`aura-mech`) if Opus gave precise diff (file:line + exact change, ≤3 files, no shadcn/Framer Motion/Tailwind v4 touched) · **L1 Sonnet** (`aura-builder`) for stack-aware fix · stay **L2 Opus** if cross-cutting |
| 3. Verify fix + check for regressions | Lite | `webapp-testing` | **L1 Sonnet** (`aura-qa`) |

**Sub-modes:**
- **Refactor** (rename/move, no behavior change): step 2 = L0 Haiku if scope tight ≤3 files
- **Content-update** (copy/data swap, no logic): step 2 = L0 Haiku default; verify step = visual scan only (no test run)

**Logs:** CHANGELOG if shared infra moved during refactor sub-mode.

---

### `design-review`
Critique screenshot/page. No code unless requested.

| Step | Mode | Skill | Agent |
|---|---|---|---|
| 1. Read page/screenshot | Verbose | `aura-design` | Opus main |
| 2. Structured critique (UX laws, hierarchy, motion, a11y, brand, recipe-conformance) | Verbose | `aura-design` · `impeccable critique` for scoring/persona testing | Opus main |
| 3. Prioritized fix list (P0-P3 per `impeccable audit` if used) | Verbose | none | Opus main |

**Logs:** none (chat captures).

---

### `impeccable-polish` (un-gated 2026-05-08)
External skill `impeccable`. Use freely for frontend polish/critique/audit on any `projects/*` surface. Localhost only for live-inject subcommands.

| Step | Mode | Skill | Agent |
|---|---|---|---|
| 1. Pick subcommand by intent: polish (`craft`/`polish`/`delight`/`bolder`), audit (`audit`/`critique`), live (`live`/`overdrive` localhost only), typography (`typeset`), color (`colorize`), motion (`animate`), layout (`layout`), doc-gen (`document`/`extract`) | Lite | `impeccable` | Opus main |
| 2. Run `npx impeccable <subcmd> <target>` directly | Lite | `impeccable` | Opus main or Sonnet (`aura-builder`) per scope |
| 3. Review diff · revert via git if not useful | Lite | none | Opus main |
| 4. If output diverges from Ken brand (red CTA-only, type scale, variants) → cross-check w/ `aura-design`, decide keep/revert | Lite | `aura-design` | Opus main |

**Scope limits:** frontend `projects/*` only · backend folders skipped · prod URLs never · live-inject localhost only.

**Logs:** `docs/DECISIONS.md` if accepted output forks Ken brand defaults · `docs/LEARNINGS.md` if subcommand misbehaves vs. existing skill.

---

### `motion-pass`
Add scroll or state animation to existing page/component. Standalone — not always part of page-build.

| Step | Mode | Skill | Agent |
|---|---|---|---|
| 1. Decide motion type: state (Framer `motion.*` + `AnimatePresence`) · scroll-driven (Framer `useScroll`+`useTransform`+`useInView`) · simple CSS transition · DS `useAnimatedCounter` | Verbose | `aura-design` (`decisions/motion-router.md`) | Opus main |
| 2. Implement w/ `useReducedMotion()` guard MANDATORY · CSS `@media (prefers-reduced-motion: reduce)` already global at DS layer | Lite | none (Framer docs ad-hoc) | Sonnet (`aura-builder`) |
| 3. Verify 60fps + reduced-motion path · use `impeccable animate` for polish if needed | Lite | `webapp-testing` · optional `impeccable animate` | Sonnet (`aura-qa`) |

**Anti-pattern reminder:** never apply both libs to same property on same element.

**Logs:** none.

---

### `quick-answer`
Trivial Q, rename, 1-line edit. Skip announce.

| Step | Mode | Skill | Agent |
|---|---|---|---|
| 1. Answer or apply | Lite/Ultra | none | **L2 Opus** main (chat Q) · **L3 Explore** (find/where) · **L0 Haiku** `aura-mech` (rename, file lookup w/ exact spec) |

**Routing:**
- "where is X defined" / "find files matching Y" → **L3 Explore**
- "rename Y to Z" / "fill template w/ values" → **L0 Haiku** (`aura-mech`)
- Conversational Q / "what is X" / "how does Y work" → **L2 Opus** main

**Logs:** none.

---

### `pre-handover`
Audit + clean a project for design→tech handover. Folds in a11y/perf/visual passes (no separate `a11y-perf-audit` workflow). Project moves `cleanup` → `ready-for-tech`.

| Step | Mode | Skill | Agent |
|---|---|---|---|
| 1. Read project state (STATUS.md, code, current handover gate) | Lite | none | **L2 Opus** (synthesis) |
| 2. Code cleanup (dead-code strip w/ judgment, mock-data gateway extract per LEARNING 2026-05-08, TS strict, drop `.js` suffix per ADR) | Lite | `frontend-design` | **L1 Sonnet** (`aura-builder`) |
| 3. A11y pass (axe-playwright, kbd nav, ARIA, contrast WCAG AA) — folds in former `a11y-perf-audit` workflow | Lite | `webapp-testing` · optional `impeccable audit` | **L1 Sonnet** (`aura-qa`) |
| 4. Perf pass (Lighthouse mobile, Core Web Vitals baseline LCP/INP/CLS, bundle audit) | Lite | `webapp-testing` (Lighthouse via Playwright) | **L1 Sonnet** (`aura-qa`) |
| 5. Visual QA baseline (screenshots, cross-device) · optional `impeccable critique` for UX scoring | Lite | `webapp-testing` · optional `impeccable critique` | **L1 Sonnet** (`aura-qa`) |
| 6. Recipe-conformance gate (variant DEFAULT, organism filenames, bg alternation, DS imports per `core-v2/COMPONENT_REFERENCE.md`) | Lite | `aura-design` | **L1 Sonnet** (`aura-qa`) |
| 7. Fill `README.md` + `HANDOVER.md` from templates w/ provided field values | Lite | none | **L0 Haiku** (`aura-mech`) if field values pre-provided · else L1 Sonnet |
| 8. Run 13-point pre-handover gate from `HANDOVER_TRACKER.md` | Lite | none | **L1 Sonnet** (`aura-qa`) |
| 9. Update `STATUS.md` → `ready-for-tech` if all 13 pass; else list failures | Lite | none | **L2 Opus** main (judgment) |
| 10. Update `HANDOVER_TRACKER.md` row (text from Opus) | Lite | none | **L0 Haiku** (`aura-mech`) — append-only mechanical |
| 11. Workspace-level delivery doc · update `HANDOVER_DELIVERY.md` shipping list when final project of batch flips to `ready-for-tech` | Lite | none | **L2 Opus** (synthesis) |
| 12. API contract update · revise `docs/API_CONTRACT.md` if new endpoints needed for this project's mock-data shape | Lite | none | **L1 Sonnet** (`aura-builder`) |
| 13. Git commit handoff · stage all changes · single commit `feat(<project>): ready-for-tech 2026-MM-DD` · prepare branch for tech intake | Lite | none | **L0 Haiku** (`aura-mech`) — mechanical |

**Logs:** CHANGELOG entry mandatory when project flips to `ready-for-tech` or `handed-over`.

---

### `infra-change`
Edit CLAUDE.md, ROUTING.md, agents, memories, hooks.

| Step | Mode | Skill | Agent |
|---|---|---|---|
| 1. Confirm change w/ user | Verbose | none | Opus main |
| 2. Apply edit | Lite | none | Opus main (no delegation — Aura owns its config) |
| 3. **Append CHANGELOG entry** (mandatory) | Lite | none | Opus main |

**Logs:** CHANGELOG mandatory.

---

## Agent spawn pattern

CLI: `subagent_type: "aura-builder" | "aura-qa" | "aura-mech"` direct (native at `.claude/agents/`).
Antigravity: paste template into `general-purpose` w/ correct model.

```
// L0 Haiku — locked-scope mechanical
Agent({ subagent_type: "aura-mech", model: "haiku", prompt: "<file:line + exact change>" })

// L1 Sonnet — stack-aware build
Agent({ subagent_type: "aura-builder", model: "sonnet", prompt: "<task brief>" })

// L1 Sonnet — QA gate
Agent({ subagent_type: "aura-qa", model: "sonnet", prompt: "<gate to verify>" })

// L3 — read-only search
Agent({ subagent_type: "Explore", prompt: "<search question>" })

// L4 — plan only
Agent({ subagent_type: "Plan", prompt: "<task to plan>" })
```

Antigravity fallback: paste `workflows/agents/<template>.md` body into `general-purpose` prompt + add task.

---

## Exit / abort

User says: "stop", "abort", "never mind", "switch to <other workflow>" → drop current step, ask 1-line "what next?". No silent continuation.

---

## Correction loop

If Aura picked wrong route, user types: "wrong workflow, use X". Aura:
1. Acknowledge in 1 line: "Re-routing to X."
2. Re-classify, re-announce, restart from step 1 of new workflow
3. No retry penalty, no defensive explanation
