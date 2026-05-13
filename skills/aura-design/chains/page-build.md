# Workflow Chain — page-build (CANONICAL · updated 2026-05-12 · 9-step with craft-pass)

**When to load:** task = "build a page" · `/page <recipe>` slash · "build me a [surface]" matching any Ken surface · ANY major UI build for Ken Research.

**Output:** 8-step process · user-validated · enforces DS-first + research-first + show-first-cut. Maps `aura-design` skill into workspace.

**Replaces:** all prior page-build approaches (Sprint 2026-05-01 6-step chain · 10-step recipe router · ad-hoc spawn flows).

---

## The 9 steps (CRAFT-PASS added 2026-05-12)

```
1.   INTAKE        — Lock intent from PRD / brief / prompt.
2.   RESEARCH      — why/what/when/where/how. Write RESEARCH.md.
3.   PROPOSE       — Approach + 3 LOCKS + DS atoms list. BLOCK on user OK.
4.   COMPOSE       — Spawn aura-builder. DS-first. Hard-ban greps = 0.
4.5. CRAFT-PASS    — aura-craft skill · per-section design decisions
                     (hierarchy / type rhythm / motion event / depth /
                     mobile override). 7 additional hard-bans. Edit in place.
5.   SHOW FIRST CUT — Localhost URL + summary to user.
6.   PROPOSE QA    — Gate menu. User picks priority subset.
7.   EXECUTE QA    — Iterate per user direction.
8.   EXIT          — Summary + LEARNINGS + STATUS.
```

**Two hard gates:** step 3 PROPOSE+BLOCK · step 5 SHOW FIRST CUT. Skip either = process broken = build will drift.

**One craft gate** (step 4.5): MUST run aura-craft skill between COMPOSE and SHOW FIRST CUT. Skip = builds ship structurally correct but craft-empty (proved by reports-pdp-v2 build 2026-05-12 — 37 organisms passed all greps but page lacked craft layer · user flagged · gap closed via this step).

---

## Step 1 — INTAKE (Aura Opus main)

Lock intent before any reading.

**Inputs to capture:**
- PRD / brief / directional prompt (verbatim · don't paraphrase)
- Project target — which `projects/<name>/`? V0_lite_report · report-store · V0.2_report · reports-pdp-v2 · new project?
- Recipe match — does `design-system/recipes/<name>.md` exist for this intent?
- User constraints — variant override · density override · timeline · scope cuts

**Output:** 3-line intake summary user reads back. If ambiguous → ask. If clear → proceed.

---

## Step 2 — RESEARCH (Aura Opus main · OR Explore agent if heavy)

Investigate before building. Don't compose blind.

**Read in order:**
1. PRD / brief in full (slice-read >200 LOC docs)
2. Matching recipe `design-system/recipes/<name>.md`
3. Pillar voice `design-system/voice/<pillar>.md`
4. Motion spec `design-system/motion/MOTION_SPEC.md`
5. Anti-patterns `design-system/ANTI_PATTERNS.md` Cat 1-7 minimum
6. Surface playbook `surfaces/<id>-<name>.md`
7. Density picker `decisions/density-picker.md`
8. Brand variant picker `decisions/brand-variant.md`
9. Motion router `decisions/motion-router.md`
10. **Reference consumers** — read 2-3 gold-standard sections from `projects/V0_lite_report/src/components/sections/` (e.g. HeroSection · KeyStats · FAQSection · CTASection) to see the canonical Ken-page shape. THIS IS NON-NEGOTIABLE.
11. `design-system/COMPONENT_REFERENCE.md` for atom/molecule/organism import paths

**Output: WRITE `projects/<name>/RESEARCH.md`** (~150 LOC) with sections:
```
# Research — <page name>

## Intent (from PRD)
[1-2 sentence summary of what page does + who for]

## Why (user need)
[1 paragraph — buyer's question, surface intent, pillar fit]

## What (scope)
[bullet list — sections/modules in scope, what's deferred]

## When + Where (placement, sequence)
[where in funnel/IA, scroll rhythm, mobile vs desktop priority]

## How (design approach)
[1 paragraph — variant choice + density + grid + motion library + tone]

## References mirrored (canonical patterns)
- v0_lite_report/.../HeroSection.tsx — hero pattern
- v0_lite_report/.../KeyStats.tsx — stat strip pattern
- etc.

## 3 LOCKS (from recipe)
1. Variant LOCK: editorial-light | cinematic-dark
2. Organism filenames LOCK: [N items from recipe table]
3. Bg alternation LOCK: <sequence per recipe>

## DS atoms required (CITE COMPONENT_REFERENCE.md import paths)
- Button (variant=brand for CTAs)
- Badge (theme=...)
- Card (variant=... padding=...)
- SectionWrapper (background=... spacing=...)
- SectionHeading + SectionLabel
- Container (variant=page|content|narrow)
- ...

## Anti-patterns flagged
Cat 1.1 · Cat 2.1 · Cat 4.5 · Cat 5.4 · Cat 13.9 · Cat 13.10 · etc.

## Open questions for user
- Q1 · Q2 · ...
```

---

## Step 3 — PROPOSE (BLOCKING · user-facing)

Show user the approach BEFORE any build spawn. Format:

```
## Aura Page-Build Plan — confirm before build

**Page:** <name> · **Project:** <target>
**Recipe:** design-system/recipes/<name>.md
**Research doc:** projects/<name>/RESEARCH.md

**Variant LOCK:** editorial-light | cinematic-dark
**Density LOCK:** <profile from density-picker.md>
**Motion LOCK:** Framer Motion only (state + scroll-driven via useScroll/useInView)
**Voice LOCK:** <pillar>

**3 LOCKS from recipe:**
1. Variant: <X>
2. Organism filenames: [N items · exact]
3. Bg alternation: <sequence>

**DS atoms list (compose ONLY from these):**
- <atom 1> · <atom 2> · ...

**Spacing system (CITE):**
- Section vertical: var(--space-md/lg/xl) · NO arbitrary py-N
- Container width: <Container variant="page|content|narrow"> · NO arbitrary max-w
- Card padding: <Card padding="sm|md|lg"> · NO inline px-/py-
- Grid: <N> cols desktop · <M> tablet · 1 col mobile · gap-<token>

**Anti-patterns flagged for this build:** [list cat numbers]

**Build plan:** Phase A (rows X-Y) · Phase B (rows Z-W) · Phase C (rows V-U)

**OK to proceed? (Yes / change <X> / cancel)**
```

**BLOCK on user response. NEVER spawn step 4 without explicit OK.** No exceptions.

---

## Step 4 — COMPOSE (Sonnet aura-builder)

Spawn signature:
```
→ Step 4/8 · Spawn: aura-builder · Model: sonnet · Reason: build per approved plan
```

**Brief MUST include:**
- Path to `projects/<name>/RESEARCH.md` (full read by builder)
- Recipe path
- 3 LOCKS (variant · organism filenames · bg alternation) embedded
- DS atoms list (CITE `COMPONENT_REFERENCE.md` paths · no improvising)
- Spacing tokens map (CITE specific `var(--space-*)` per use case)
- Container width rule (CITE `<Container variant>` enforcement)
- Reference patterns to mirror (CITE specific file paths in v0_lite/v0.2/report-store)
- Anti-patterns to enforce (CITE specific Cat numbers)
- Hard cap: ≤15 files per spawn (split into Phase A/B/C if larger)

**aura-builder writes:** layout shell · page composition · section organisms per recipe · mock-data updates if needed.

**aura-builder returns:**
```
→ Step 4/8 · Return: aura-builder · Model used: sonnet
```

Plus: files touched · DS atoms consumed table · LOCK conformance per row · tsc/lint/build status.

---

## Step 4.5 — CRAFT-PASS (NEW 2026-05-12 · MANDATORY before SHOW FIRST CUT)

**Skill invoked:** `aura-craft` (`skills/aura-craft/SKILL.md`)
**Synthesizes:** ui-ux-pro-max reasoning rules + interface-design pattern persistence + awesome-claude-design DESIGN.md vocabulary
**Reference:** `design-system/DESIGN.md` (Ken brand vocabulary · section-type defaults table)

### Why this step exists

Reports-pdp-v2 build 2026-05-12 passed all 5 aura-builder hard-ban greps (no raw `<button>` · no `max-w-[` · no `text-[` · no `bg-[` · no hex). All 37 organisms used DS atoms correctly. ARIA semantics correct. TypeScript clean.

**But:** user reviewed and flagged "did you do UI/UX development or just structure?"

Builder produces structurally-compliant scaffold. Craft-pass adds the craft layer that separates 7/10 from 9.5/10.

### 6 craft principles (full detail in `skills/aura-craft/SKILL.md`)

1. **Visual hierarchy per section** — explicit lead/support/body/micro decisions · NOT page-default
2. **Type rhythm tuned per content density** — hero/content-dense/stat-dense/chart/CTA each gets distinct scale
3. **Cinematic moments** (research voice · NOT SaaS-glitz) — hero entrance · stat reveal · chart hydration · drawer spring
4. **Depth strategy = subtle-shadows** (Ken Research baseline · NOT borders-only · NOT layered)
5. **Motion budget** — max 3 simultaneous visible · max 8 across page lifecycle · `useReducedMotion` mandatory
6. **Section-by-section craft brief** — `// CRAFT:` comments OR exported `CRAFT` const at top of every section file

### 7 additional hard-bans (on top of builder's 5)

6. Section file w/o `// CRAFT:` decision → fail
7. >3 simultaneous motion events → fail
8. Animation duration outside 150-400ms (micro) or 400-800ms (cinematic) → fail
9. Cards w/o depth (no border AND no shadow) → fail
10. Headline/body same type token → fail
11. DS default type scale w/o intentional override comment → fail
12. `prefers-reduced-motion` missing from animated component → fail

### How aura-craft is invoked

Pattern 1 (auto · main flow):
```
After aura-builder Wave N done:
  Aura main → aura-craft skill → applies per-section craft → returns clean
  → Step 5 SHOW FIRST CUT proceeds
```

Pattern 2 (manual · explicit user request):
```
User: "polish this page" / "craft-pass reports-pdp-v2"
  Aura main → aura-craft skill direct
```

Pattern 3 (selective · single section):
```
User: "craft-pass ReportPDPHero only"
  Aura main → aura-craft --section ReportPDPHero
```

### Trace markers

```
→ Step 4.5 · CRAFT-PASS · aura-craft skill · target: <project>/<sections>
→ Step 4.5 · 6 principles applied to N sections
→ Step 4.5 · 7 additional hard-bans · M failures · fixed
→ Step 4.5 · Return: craft-pass complete · localhost 200
```

### Skip rule (RARE · explicit user opt-out)

User must say "skip craft-pass" verbatim. Otherwise mandatory. Aura cannot skip silently.

---

## Step 5 — SHOW FIRST CUT (BLOCKING · user-facing)

NEVER auto-spawn QA. Capture + present:

1. Take desktop + mobile screenshots (Playwright · scroll-through if needed)
2. Confirm dev server URL live (curl 200)
3. Summarize:
   - What's built (sections rendered · DS atoms used · LOCK conformance)
   - What's stub (placeholders awaiting Phase B/C)
   - Known issues observed during build
4. Show screenshots inline to user
5. **ASK:** "What's wrong / what to refine before QA?"

**BLOCK on user response.** User picks:
- Direct refinements (specific section · specific change)
- "Proceed to QA · your pick of gates"
- "Proceed to QA · I'll specify gates"

---

## Step 6 — PROPOSE QA PLAN (BLOCKING · user-facing)

Present gate menu. User picks priority subset.

```
## QA gates available for this page

**Hard gates (recommended baseline):**
- [ ] Recipe-conformance — variant · organism names · bg alternation · DS atom usage
- [ ] axe-playwright a11y — WCAG AA · 0 critical/serious target
- [ ] Reduced-motion — useReducedMotion honored across all motion components

**Quality gates (pick per priority):**
- [ ] Lighthouse mobile — Perf ≥85 · A11y ≥95 · BP ≥95 · SEO ≥95
- [ ] Visual baseline — Playwright screenshots desktop/tablet/mobile saved to qa-screenshots/
- [ ] Voice scan — pillar voice forbidden words · exclamation marks · emoji
- [ ] Perf budget — bundle ≤250KB gzipped · LCP <2.5s · CLS <0.1
- [ ] Cross-device — render + interaction at 375/768/1024/1440
- [ ] DS-atom-compliance — grep raw <button>, max-w-[N], px-N, text-[N] in src/components/sections/ returns 0
- [ ] Analytics events — verify dataLayer pushes per recipe event list

**Heavy gates (only if requested):**
- [ ] impeccable critique — UX scoring + persona testing
- [ ] aura-qa visual diff against reference consumer (v0_lite/v0.2/report-store)
- [ ] Production-build Lighthouse (not dev server)

**Pick: [list gate numbers] OR "all" OR "Aura decide"**
```

**BLOCK on user response.**

---

## Step 7 — EXECUTE QA (Sonnet aura-qa)

Spawn:
```
→ Step 7/8 · Spawn: aura-qa · Model: sonnet · Gates: [user-selected list]
```

aura-qa runs ONLY the selected gates. Applies small fixes inline (≤5 LOC, low-risk). Reports findings ranked P0/P1/P2/P3.

**Iterate:**
- P0 → block · fix immediately via aura-builder or aura-mech
- P1 → fix this session
- P2-P3 → log to project STATUS.md as deferred

Loop until P0/P1 clear OR user calls done.

---

## Step 8 — EXIT

Output:
```
→ Exit: page-build complete

## Summary
[1-2 lines what shipped]

## Pre-handover gate status
[checklist items passed/failed]

## Open items deferred
[P2-P3 from QA]
```

**Log mandatory:**
- `docs/CHANGELOG.md` entry if infra changed (new tokens · new components · new DS atoms · workflow changes)
- `docs/LEARNINGS.md` entry per correction/validation signal during build
- `docs/DECISIONS.md` entry if non-default variant/density/grid chosen
- `projects/<name>/STATUS.md` status flip + gate checklist update
- Update `HANDOVER_TRACKER.md` if status changed

---

## Why this chain works

| Step | What it prevents |
|---|---|
| 1 INTAKE | Building wrong thing (lost PRD intent) |
| 2 RESEARCH | Blind composition (no reference pattern · no anti-pattern awareness) |
| 3 PROPOSE+BLOCK | User surprise at 10000 LOC (catch drift at plan stage · 1 LOC cost) |
| 4 COMPOSE | DS-atom-bypass (brief embeds DS atoms list + spacing tokens · no invention) |
| 5 SHOW FIRST CUT | Auto-QA on broken page (user catches visible issues · saves QA cycles) |
| 6 PROPOSE QA | Blanket QA waste (user picks gates that matter · not all-or-nothing) |
| 7 EXECUTE | Process opacity (each gate fires explicitly · trace marker per spawn) |
| 8 EXIT | Lost learnings (CHANGELOG + LEARNINGS + DECISIONS + STATUS all updated) |

---

## Anti-patterns (chain-level)

| Anti-pattern | Why wrong |
|---|---|
| Skip step 2 RESEARCH | Build = guess · no reference anchor · drifts from canonical |
| Skip step 3 PROPOSE+BLOCK | User surprised by output · refactor cost compounds |
| Skip step 5 SHOW FIRST CUT | Auto-QA spawn = wasted cycles on broken page |
| Skip step 6 PROPOSE QA | Blanket gate run · misaligned priorities |
| Spawn aura-builder w/ >15 files | Token cap risk · LEARNING 2026-05-08 hard cap |
| Embed PRD intent only (no RESEARCH.md path) in builder brief | Builder re-derives approach · drifts from user-approved plan |
| Iterate w/ impeccable before step 5 passes | Polish on broken foundation · waste |
| Auto-fire QA gates blanket | Burns tokens · user agency removed |

---

## Spawn pattern reference

```
// Step 4 — build
Agent({
  subagent_type: "aura-builder",
  model: "sonnet",
  prompt: `<brief embedding RESEARCH.md path + 3 LOCKS + DS atoms list + spacing tokens + grid cite + anti-pattern Cat numbers + reference paths>`
})

// Step 7 — validate (only after user picks gates in step 6)
Agent({
  subagent_type: "aura-qa",
  model: "sonnet",
  prompt: `<gate list per user pick + project root path>`
})

// Optional polish — only after step 7 passes
Agent({
  subagent_type: "aura-mech",
  model: "haiku",
  prompt: `<file:line + exact mechanical change>`
})
```

---

## Cross-references

- `../SKILL.md` — Aura design second brain (anchor)
- `surfaces/{01-discovery,02-report-store,03-report-viewer,04-dashboards,05-engagement}.md`
- `decisions/{chart-picker,motion-router,brand-variant,surface-picker,density-picker}.md`
- `variants/{cinematic-dark,editorial-light}.md`
- `../anti-patterns.md` (Cat 1-14)
- `../voice.md` (pillar router)
- `../../page/SKILL.md` (slash-command surface — `/page <recipe>`)
- `../../../workflows/ROUTING.md` (workspace workflow library)
- `../../../workflows/agents/{aura-builder,aura-qa,aura-mech}.md` (agent templates)
- `design-system/recipes/<name>.md` (binding spec per build)
- `design-system/COMPONENT_REFERENCE.md` (DS atom cross-ref)
- `~/.claude/projects/.../memory/feedback_page_build_process.md` (cross-session enforcement)
