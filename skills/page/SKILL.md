---
name: page
description: |
  Build a Ken Research page from intent — `/page <intent> [--pillar=X] [--variant=Y]`. Reads the matching recipe in `design-system/recipes/`, composes from DS components, runs through aura-builder for code, then aura-qa for verification. Round-trip: intent → recipe → build → screenshot → report. Replaces ad-hoc page builds.

  Use when:
  - User types `/page <intent>` (e.g. `/page case-study`, `/page report-store-listing`)
  - User asks "build me a [page-type] page" matching a recipe in design-system/recipes/
  - User asks to build any of: case study, service overview, methodology, report store home/listing/detail, sector landing, survey listing/detail, DS doc page

  Do NOT use for:
  - Single-component builds (use aura-builder directly)
  - Critique-only / review-only tasks (use aura-design or design-review)
  - Pages with no matching recipe (propose new recipe first)

user-invocable: true
argument-hint: "<recipe-name> [--pillar=consulting|research|surveys|foundations] [--variant=cinematic-dark|editorial-light] [--target=<project-path>]"
---

# /page — Ken Research page builder

Round-trip page builder. Reads recipes, composes from DS, builds, verifies.

---

## Argument format

```
/page <recipe-name> [options]

Recipe names (must match files in design-system/recipes/):
  case-study
  service-overview
  methodology
  report-store-home
  report-store-listing
  report-detail
  sector-landing
  survey-listing
  survey-detail
  ds-doc-page

Options:
  --pillar=<consulting | research | surveys | foundations>
  --variant=<cinematic-dark | editorial-light>
  --target=<project-path>     (default: pick from active projects/* via prompt)
  --dry-run                   (read recipe + propose, don't write code)
```

If user types `/page` alone → ask for recipe name + show available list.

---

## Workflow (8 steps)

### Step 1 — Parse intent
- Extract recipe name from args
- Validate recipe exists at `design-system/recipes/<name>.md`
- If not found: list available recipes, exit with proposal to create new one

### Step 2 — Read context
- Read `design-system/recipes/<name>.md`
- Note pillar from recipe header
- Read `design-system/voice/<pillar>.md`
- Read `design-system/motion/MOTION_SPEC.md`
- Read `design-system/COMPONENT_REFERENCE.md` (relevant tables only)
- Read `design-system/ANTI_PATTERNS.md` (categories listed in recipe)

### Step 3 — Resolve target project
- If `--target` provided: validate path exists, is a project
- Else: list active projects in `projects/`, ask user to pick
- Confirm: target is in `projects/casestudy-templates/<name>/` or similar consumer surface

### Step 4 — Propose composition
- Output to chat:
  ```
  → Recipe: <name>
  → Pillar: <pillar>  
  → Variant: <variant — DEFAULT per recipe header unless --variant flag overrides>
  → Target: <path>
  → Voice: design-system/voice/<pillar>.md
  → Sections (N) [exact filenames from recipe organism table — NO renaming]:
      1. <organism-name-1>
      2. <organism-name-2>
      ...
  → Bg alternation sequence (per recipe L50): <print exact sequence>
  → DS components to import (per COMPONENT_REFERENCE.md): <list>
  → Mock data shape: <required keys>
  ```
- If `--dry-run`: stop here

### Step 4.5 — Blocking confirm (HARD GATE)
- Print: `→ Confirm: variant=<X>, organism count=<N>, names locked per recipe. Override variant? Override organism names? (y to proceed, anything else to abort.)`
- Wait for user `y` / proceed / OK / yes signal.
- If user types anything else → ABORT, log abort reason, do NOT spawn builder.
- If user override (e.g. "use cinematic-dark", "rename Hero to HeroSplash") → log override + reason in subsequent build brief so aura-qa knows recipe deviation is intentional.

### Step 5 — Spawn aura-builder
Build brief format:
```
Build page recipe: <name> at <target>

Variant LOCK: <editorial-light | cinematic-dark> — DO NOT change variant under any circumstance.
Organism filenames LOCK (exact, from recipe table — DO NOT improvise or shorten):
  <list>
Bg alternation LOCK: <exact sequence from recipe L50> — every section must apply.

Context to read:
- design-system/recipes/<name>.md (the recipe — section sequence, mock data shape, gates)
- design-system/voice/<pillar>.md (tone, vocabulary, headline/CTA rules)
- design-system/motion/MOTION_SPEC.md (motion patterns + reduced-motion contract)
- design-system/COMPONENT_REFERENCE.md (component import paths)
- design-system/ANTI_PATTERNS.md (categories: <list from recipe>)

Tasks:
1. Compose page using recipe-locked organism filenames (above). Inventing names = build is wrong, redo.
2. Apply variant LOCK. Do NOT switch to cinematic-dark "because it looks better."
3. Apply bg alternation per LOCK sequence on every <section>.
4. Import DS components per COMPONENT_REFERENCE.md. Re-implementing atoms inline = Cat 13.8 violation.
5. Use only tokens from design-system/tokens/tokens.json (or its CSS output). No hardcoded hex/rgba/px outside token wrappers.
6. Voice copy must follow design-system/voice/<pillar>.md
7. Motion follows design-system/motion/MOTION_SPEC.md
8. Avoid every rule in design-system/ANTI_PATTERNS.md categories listed
9. Add mock data per recipe shape, with `// TODO: replace w/ real API` markers
10. Run pnpm lint --fix and pnpm build, report any errors

Quality bar: 9.5/10 Premium Cinematic Finish. No "internal-only" excuses.

NO declaring "done" until aura-qa recipe-conformance gate passes (Step 7).
```

### Step 6 — Build runs
aura-builder spawns Sonnet, executes, returns:
- Files created
- Build status (pass/fail)
- Lint status
- Self-check (a11y notes, tokens used, confidence)

### Step 7 — Spawn aura-qa
QA brief:
```
Verify page recipe: <name> at <target>

URL: <localhost:port>/<route>

RUN RECIPE-CONFORMANCE GATE FIRST. If it fails, STOP — do not run a11y/perf/visual passes. Return P0 findings.

Recipe-conformance gate:
- Read design-system/recipes/<name>.md
- ls projects/<target>/src/components/ (or app/components/)
- Compare filenames EXACTLY to recipe organism table — flag every mismatch as P0
- Sample computed bg of each section in browser, assert matches recipe L50 alternation sequence — same bg on every section = FAIL
- grep imports for DS components per COMPONENT_REFERENCE.md — zero DS atom imports = FAIL
- Verify variant matches recipe DEFAULT (or override flagged in build brief)
- Post-scroll screenshot: scroll to bottom + back, then capture (NOT pre-scroll)

If gate passes, proceed:

Capture:
- Desktop 1440×900
- Tablet 768×1024
- Mobile 390×844

Verify against recipe gates:
- A11y: WCAG AA contrast, keyboard nav, ARIA, prefers-reduced-motion, 44px touch
- Perf: LCP < 2.5s, INP < 200ms, CLS < 0.1
- Visual: matches recipe section sequence, voice rules, motion patterns

Anti-patterns to flag:
<categories from recipe>

Return: pass/fail per gate + screenshot paths + flagged issues.
```

### Step 8 — Report to user
Final output format:
```
→ Page built: <name> at <path>

Files created (N):
- <path>/<file1>.tsx
- ...

Verification:
- Build: ✓
- Lint: ✓
- A11y: ✓ (WCAG AA pass)
- Perf: ✓ (LCP X.Xs / INP Xms / CLS X.X)
- Visual: <screenshot paths>

Issues flagged: <count>
- <issue 1>
- ...

Quality estimate: <X/10>

Next steps:
- Review screenshots
- Address flagged issues if any
- Or run `/page <recipe>` again with --variant or refinements
```

---

## Failure modes

| Failure | Handling |
|---|---|
| Recipe not found | List available, propose creating new recipe |
| Target project not found | List active projects, prompt to pick |
| Build fails | Return aura-builder error, don't proceed to QA |
| Lint errors | Fix automatically if possible, else report and ask |
| Component missing from COMPONENT_REFERENCE.md | Flag gap, suggest aura-design pillar review |
| Mock data shape unclear | Read recipe more carefully, fall back to ask user |
| QA gate fails | Report what failed, propose fix, ask before retry |
| Voice rule violation | Flag specific line, propose rewrite, don't ship |

---

## Examples

### `/page case-study --target=projects/casestudy-templates/new-cs/`
Builds full case study at given path. Uses Consulting voice + cinematic-dark variant by default.

### `/page report-store-listing --pillar=research`
Builds RS listing page. Variant defaults to editorial-light for Research pillar.

### `/page survey-detail --dry-run`
Reads recipe, proposes composition, doesn't write code.

### `/page` (no args)
Lists available recipes, asks which one.

---

## Integration w/ existing system

- **`/page` reads** `design-system/recipes/`, `voice/`, `motion/`, `ANTI_PATTERNS.md`, `COMPONENT_REFERENCE.md`, `tokens.json`
- **`/page` spawns** `aura-builder` (Sonnet) for code, `aura-qa` (Sonnet) for verification
- **`/page` logs** to `docs/CHANGELOG.md` if a new project page is shipped
- **`/page` writes** code only inside the resolved target project — never workspace infra files

---

## Phase 2 enhancements (post-sprint)

- Visual regression diff against baseline (per-recipe baseline screenshots)
- Auto-rerun on prop ambiguity (the 4 component-prop questions flagged in B1 recipes)
- `/page critique <path>` — read existing page, audit against matching recipe
- `/page evolve <recipe>` — propose recipe refinements based on observed builds
- Multi-recipe composition (`/page case-study + sector-landing` for case-on-sector layouts)
- Recipe versioning (semver — major break = section sequence change, minor = prop change)
- Recipe playground — rendered preview of recipe sequence as a wireframe
- Auto-update `mock-data.ts` schema when recipe changes

---

**Status:** Phase 1 (Aura Sprint 2026-05-01). First version — text-driven, manual orchestration. Phase 2 = auto-orchestration via slash command parser.
