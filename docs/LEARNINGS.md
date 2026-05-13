# Aura Learnings

Pattern + counter-example log. What worked, what failed, what to do differently next time.

**Read pattern:** Aura reads `## Active` section last 5 entries on every task (per learning-loop forcing function). Full file only when task domain matches an entry.

**Write pattern:** Three signals, each w/ explicit conditions (per `feedback_learning_loop.md`):
1. **Correction signal** — user said "no, do X instead" / "wrong" / "use Y not Z" → log immediately
2. **Validation signal** — user explicit positive ("yes that's right" / "perfect" / "keep doing that") → log as confirmed; provisional otherwise (decay rule applies)
3. **Subagent observation** — Sonnet/Haiku return reports a pattern in `## Patterns I noticed` section → Aura evaluates, logs if reusable

**Bloat protocol:** Active section ≤50 entries. Provisional entries decay if untouched 30 days. Confirmed entries stay until superseded.

Entry format:
```
## YYYY-MM-DD — [task type] short title
**Signal:** correction | validation | subagent-observation
**Tried/observed:** what happened
**Correction or rule:** the takeaway
**Tied to:** lib/version/file dependencies (for staleness)
**Propagated to:** aura-builder.md | aura-qa.md | none (Opus-only learning)
**Status:** confirmed | provisional (expires YYYY-MM-DD) | superseded by <link> | archived
```

---

## Active

## 2026-05-12 — [process] Page-build process formalized · 8 steps w/ 2 HARD user-blocking gates
**Signal:** user-correction (reports-pdp-v2 rebuild · multiple rounds · root cause = process skip)
**Tried/observed:** Built 34 bespoke 600-LOC organisms before showing user. Used raw `<button>` instead of DS Button. Arbitrary `text-[var(--token)]` Tailwind classes (silently no-op in v4). Arbitrary spacing/padding/grid. No grid system enforcement. Skipped reading canonical consumer references (v0_lite/v0.2). Skipped PROPOSE+BLOCK gate. Skipped SHOW FIRST CUT gate. User caught after 34 sections shipped wrong = ~10000 LOC rework.
**Root cause:** Process not enforced. `aura-design` skill chain (`chains/page-build.md`) existed with PROPOSE+BLOCK rule but I bypassed it. Went straight from "build page" → aura-builder spawn. No research doc · no plan confirmation · no first-cut show before QA.
**Decision:** Formalize CANONICAL 8-step process. Lock 2 HARD gates user must approve before continuing:
  - Step 3 PROPOSE+BLOCK (approach + 3 LOCKS + DS atoms list)
  - Step 5 SHOW FIRST CUT (screenshots + summary BEFORE QA spawn)
8 steps: INTAKE · RESEARCH (write RESEARCH.md) · PROPOSE+BLOCK · COMPOSE · SHOW FIRST CUT · PROPOSE QA · EXECUTE QA · EXIT.
**Files updated:**
- `skills/aura-design/SKILL.md` — replaced 10-step recipe router w/ 8-step process
- `skills/aura-design/chains/page-build.md` — full canonical chain rewrite
- `workflows/agents/aura-builder.md` — DS atom compliance HARD GATE (12 rules · self-grep before reporting done)
- `workflows/agents/aura-qa.md` — 7 sub-checks added (C1-C7) for raw `<button>` · arbitrary `max-w` · hardcoded hex · arbitrary text classes · arbitrary section padding · token usage ratio
- `workflows/ROUTING.md` — page-build entry replaced w/ 8-step table + gate enforcement
- `CLAUDE.md` — pointer added for page-build canonical
- Memory `feedback_page_build_process.md` — cross-session enforcement
- MEMORY.md — added pointer to new memory
**Generalizable:** YES — applies to any page build OR major UI build for Ken Research. Not just PDP.
**Propagate:** Done in this entry. All AI agents + team members reading workspace inherit via canonical chain doc.

## 2026-05-12 — [process] DS atom compliance must be HARD GATE in builder · not soft request
**Signal:** correction (raw `<button>` + arbitrary spacing slipped through despite brief saying "use DS atoms")
**Tried/observed:** Phase A/B/C aura-builder briefs said "use DS atoms only" + listed available atoms. Builder still wrote raw `<button>` in InlineCTA1/2 · arbitrary `max-w-[1200px]` · hardcoded hex `#0a0a0c` for cinematic FinalCTA · `text-[var(--token)]` arbitrary classes throughout. aura-qa caught after build but cost was already paid.
**Decision:** Move DS atom compliance from "instruction" to "self-grep gate before reporting done" in `aura-builder.md`. Builder MUST run:
```
grep -rn "<button" src/components/sections/ → expect 0
grep -rn "max-w-\[" src/components/sections/ → expect 0
grep -rn "bg-\[#" src/ → expect 0
grep -rn "text-\[" src/ → expect 0
grep -rn "#[0-9a-f]\{3,6\}" src/components/ → expect 0
```
Non-zero hit = fix before reporting done. Don't pass burden to aura-qa.
Mirror gate in `aura-qa.md` C1-C7 sub-checks · runs even if builder claims clean.
**Generalizable:** YES — any DS-driven build. Same gate.

## 2026-05-12 — [process] Skipped reading canonical consumer references → page lacks visual rhythm
**Signal:** user-feedback "page not following design language like V0_lite_report does"
**Tried/observed:** Built v2 sections w/o reading V0_lite/V0.2/report-store consumer patterns. Spacing inconsistent · grid loose · typography hierarchy off vs gold-standard consumer pattern. Recipe + DS atoms necessary but NOT sufficient — canonical CONSUMER patterns encode "how a Ken page actually looks." 
**Decision:** Step 2 RESEARCH MUST read at least 2-3 canonical consumer sections (e.g. `V0_lite_report/src/components/sections/HeroSection.tsx`) before composing. Add to `chains/page-build.md` step 2 as NON-NEGOTIABLE. Embed reference file paths in step 4 build brief.
**Generalizable:** YES — any new page build inherits visual rhythm from existing consumers, not just from DS atoms + recipe.

## 2026-05-11 — [build] Phase split (1B → 2A/2B → 3A/3B) keeps Sonnet under 32K cap reliably
**Signal:** subagent-success (reports-pdp-v2 v2a complete)
**Tried/observed:** Split big multi-organism builds into 5 focused spawns (1B foundation · 2A hero+sticky · 2B 5 research modules · 3A chart+overlays · 3B forms+TOC+FAQ+related). Each came back tsc + lint clean, no truncation, avg ~80K total_tokens (input + output), output ~10-15K. Phase 1 (single-spawn, original) hit cap at 80%; Phase 2-3 (split) zero cap hits.
**Decision:** Default split rule for Sonnet builder spawns: ≤6 new files per spawn, ≤3 organisms per spawn, route-wiring counts as 1 file. Document in agent template + this LEARNING.
**Generalizable:** YES — applies to any Sonnet aura-builder spawn building >3 components from PRD-scale specs.
**Propagate:** Update `workflows/agents/aura-builder.md` "scope guard" section + ROUTING.md component-build workflow notes.

## 2026-05-11 — [a11y] Tailwind v4 design tokens via CSS `var()` fallback must use AA-safe fallback value
**Signal:** qa-correction (aura-qa caught 4 organisms using `var(--variant-editorial-text-tertiary, #888)` — fallback `#888` fails AA 4.5:1 at 3.18)
**Tried/observed:** Token not defined in `tokens.css`. Fallback `#888` shipped in 4 files. axe flagged 4× serious color-contrast violations on the same fallback. Fix: changed fallback to `#6b6b6b` (4.78:1) in all 4 sites.
**Decision:** When using `var(--token, FALLBACK)` syntax, FALLBACK must satisfy AA contrast against expected bg even if token is registered later. Treat fallback as production-quality, not placeholder.
**Generalizable:** YES — applies to every CSS var fallback referencing color in this workspace.
**Propagate:** Add to `feedback_token_efficiency.md` + design-system anti-patterns doc.

## 2026-05-11 — [a11y] Highcharts SVG empty aria-label triggers axe `svg-img-alt` serious violation
**Signal:** qa-correction (ChartCardOrganism wrapping @ken-research/charts)
**Tried/observed:** Highcharts renders `<svg aria-label="">` (empty string). axe treats empty label as missing label → serious violation. Parent `role="figure"` + accessible name was correctly set on outer container but didn't satisfy axe rule scoped to inner svg.
**Decision:** Wrap chart renderer in `<div aria-hidden="true">` when parent already has `role="figure"` + accessible name. AT users hear figure label, axe stops scanning hidden svg.
**Generalizable:** YES — applies to all chart libs that emit aria-label="" (recharts, victory, highcharts, chart.js). Same fix.
**Propagate:** Add to chart-integration recipe + design-system component-reference.

## 2026-05-11 — [schema] `var()` token must exist for `var(--variant-editorial-text-tertiary)` — design-system gap
**Signal:** infra-gap (referenced in 4 organisms, undefined in tokens.css)
**Tried/observed:** 4 organisms reference `var(--variant-editorial-text-tertiary)`. Token never defined in `design-system/tokens/build/tokens.css`. CSS falls back silently to declared fallback (or default if none).
**Decision:** Schedule token registration in next DS sweep — value should be `#6b6b6b` (AA-safe on warm + white bgs). Until then, organisms ship AA-passing fallback values inline.
**Generalizable:** Token-system enforcement: grep `var(--variant-` references vs declared tokens during DS health audits. Mismatch = silent prod bug.

## 2026-05-06 — [build] Subagent output 32K token cap on big-payload spawns
**Signal:** subagent-observation (Phase 1 builder, reports-pdp-v2)
**Tried/observed:** aura-builder briefed w/ schema TS port + 1660-line mock-data migration + 3 new components + route wiring in single spawn. Hit `Claude's response exceeded the 32000 output token maximum` mid-task. Schema + GSAP purge shipped; mock-data + 3 components NOT shipped. Tool-use count 76 across ~30min before cap.
**Correction or rule:** NEVER bundle schema rewrite + big mock-data migration + multiple components in one builder prompt. Output budget exhausts ~30K. Splits:
  1. Schema-only spawn (~5-10K out)
  2. Mock-data migration spawn (~10-15K out — file diffs are biggest expense)
  3. New components spawn (~5-10K each, batch 2-3 small files OR 1 large)
  4. Route wiring + integration spawn (~5K)
Pattern: compound prompts inflate w/ explanatory dumps + interim reports. Splitting respects cap AND lets each subagent return clean.
**Tied to:** any aura-builder task touching >5 files OR rewriting >500 LOC OR creating multiple new components.
**Propagated to:** aura-builder.md (split-spawn rule), workflows/ROUTING.md (Sonnet decomposition guidance).
**Status:** confirmed

## 2026-05-06 — [schema] Inconsistent CTA trigger naming `analyst` vs `analyst-call`
**Signal:** subagent-observation (Phase 1A builder, reports-pdp-v2)
**Tried/observed:** Schema v2 had `AccessControl.ctaTrigger: 'sample' | 'analyst' | ...` but `LeadFormType: 'sample' | 'analyst-call' | ...` and `HeroCta.trigger: LeadFormType`. Same concept, different members. Builder filed silent correction in mock-data; downstream components had to know mapping.
**Correction or rule:** Canonical CTA trigger names = `LeadFormType`: `'sample' | 'dataset-unlock' | 'analyst-call' | 'customization'`. Add `'login' | 'purchase'` only for AccessControl. NEVER use bare `'analyst'`. When designing discriminated unions for related concepts, define ONE canonical enum and reuse via type composition.
**Tied to:** schema design pattern, any project w/ related state-discriminated-unions.
**Propagated to:** reports-pdp-v2/src/types/schema.ts patched 2026-05-06.
**Status:** confirmed

## 2026-05-08 — [stack] Removing unused deps surfaces ZERO bundle change — confirms scaffolding ≠ shipping
**Signal:** validation (build delta after stack lock-in)
**Tried/observed:** Removed `gsap` + `@gsap/react` + `lenis` from 3 active projects · expected bundle reduction · got ZERO delta. V0_lite_report still 179kB First Load JS · report-store + V0.2_report still 159kB. Reason: GSAP/Lenis were imported in `lenis-provider.tsx` files but tree-shaken since pages didn't actually use motion features dependent on them yet. Confirms: scaffolded deps in `package.json` ≠ shipped bundle. ALSO confirms removing wasn't load-bearing on actual UX.
**Correction or rule:** When auditing stack parity w/ dev team, AUDIT WHAT'S ACTUALLY USED via `grep -rn "import.*<lib>"` in src/, not just `package.json` deps. If lib only imported in scaffolding (provider files, demo components) but not in shipping section organisms, removal is zero-risk. When dep IS used heavily, refactor first then remove. Always run `pnpm build` before+after to confirm bundle delta == expected.
**Tied to:** 3 projects' build outputs (`.next/` build trace · 179kB / 159kB / 159kB First Load · same pre+post)
**Propagated to:** future stack-parity migrations (V0.2 cinematic-dark hero · report-store section ports · case-study builds)
**Status:** confirmed

## 2026-05-08 — [skill-build] aura-design Phase 2 closeout — 12 files in single Opus session validates "judgment-heavy = Opus main, not Sonnet"
**Signal:** validation (user "proceed systematically" + executed in single session w/o blockers)
**Tried/observed:** Wrote 12 surface/decision/variant/chain files in `skills/aura-design/` Phase 2 closeout. Each file = ~250-400 LOC of Ken-grounded design judgment (recipe LOCK rules, anti-pattern flags w/ category numbers, north-star pattern recipes). Considered spawning aura-builder Sonnet for parallel scaffolding — rejected because surface files require Ken-specific judgment (verified-vs-vibes voice, brand-variant routing, surface-specific anti-patterns) that Sonnet would underspec. Wrote serially in Opus main, ~30 min total. Build file count `12 files / 30 min = 24 sec/file` is high pace because pattern was repeatable (header → IA → type → motion → density → anti-patterns → DS imports → cross-refs).
**Correction or rule:** When skill content is judgment-heavy (Ken-grounded, brand-specific, voice-calibrated, anti-pattern-flagged), Opus main writes serially — NOT delegated to Sonnet. Sonnet excels at code generation w/ given spec; underspecs domain-knowledge content where the spec IS the judgment. Use the structural template (header / IA / type / motion / density / anti-patterns / DS / cross-refs) as a forcing function for consistency across files. Pattern carries to future skill expansions (Phase 2.x for surface 04 future organisms, Phase 3 for new Ken surfaces).
**Tied to:** `skills/aura-design/{surfaces, decisions, variants, chains}/` 12 new files
**Propagated to:** none — Opus-only routing decision (don't delegate skill-content writing to Sonnet)
**Status:** confirmed

## 2026-05-08 — [build] Drop `.js` suffix from internal imports when consuming TS source via Next `transpilePackages`
**Signal:** correction (build failure surfaced after typecheck passed)
**Tried/observed:** TS files in DS + consumer used `from './Foo.js'` ESM-strict suffix. TS bundler resolution accepted (typecheck clean). `pnpm build` in V0_lite_report (Next 15, `transpilePackages: ['@kenresearch/design-system']`) failed — webpack can't resolve `.js` paths back to `.ts` source. 82 sites in DS + 5 in consumer mock-data. Fixed via sed strip — TS bundler resolution still works extensionless.
**Correction or rule:** When DS package consumed via Next `transpilePackages` (TS source, no compiled dist), internal imports MUST be extensionless. tsconfig `moduleResolution: "bundler"` + Next webpack both accept extensionless. `.js` suffix only when shipping compiled ESM dist (publish to npm). NEVER use `.js` suffix in workspace-internal imports.
**Tied to:** `core-v2/src/**/*.{ts,tsx}` 82 sites + `V0_lite_report/src/lib/mock-data.ts` 5 sites.
**Propagated to:** aura-builder.md scaffold + atom-port instructions.
**Status:** confirmed

## 2026-05-08 — [port] Navbar source = topnav-v32 NOT legacy project Header; defer Header port until consumer ready
**Signal:** correction (user directive mid-Phase-C-step-4)
**Tried/observed:** Original Phase C step 4 plan = port V0_lite_report-legacy Header (442 LOC monolith). User redirected: "real navbar is in @projects/topnav-v32, we need to cleanly extract." topnav-v32 = component-only project (Vite playground showcase + 22-file atomic-design navbar tree at `src/app/components/navbar/{atoms,molecules,organisms,hooks,types.ts}` — already DS-aligned, w/ injectable render-props for logo/ctaButton/companyDropdown/mobileMenu).
**Correction or rule:** When 2+ project versions of same component-class exist, the most recent + most-atomic-organized version is canonical. Audit all candidates BEFORE selecting source for promotion. Don't assume the project being ported owns its own version of every component — many components are workspace-shared.
**Tied to:** topnav-v32 navbar promotion to `core-v2/src/{atoms,molecules,hooks,organisms/navbar}`
**Propagated to:** Phase D + E ports — for any component class w/ multiple workspace candidates, audit + select most atomic-organized version first.
**Status:** confirmed

## 2026-05-08 — [build] Render-prop injection pattern enables DS-package boundary while consuming consumer atoms
**Signal:** subagent-observation (topnav-v32 TopNavigation API)
**Tried/observed:** topnav-v32's `<TopNavigation>` accepts `logo`, `ctaButton`, `companyDropdown`, `mobileMenu` as render-prop slots (`(isOpen) => ReactNode` for stateful ones). Reason: keeps DS Button + project-specific dropdowns OUTSIDE the navbar package boundary. Consumer assembles: `<TopNavigation logo={<Logo/>} ctaButton={<Button variant="brand">Book call</Button>} companyDropdown={(isOpen) => <CompanyDropdown isOpen={isOpen}/>} />`.
**Correction or rule:** When a component depends on consumer-specific atoms or stateful sub-trees, prefer render-prop slots over hard imports. Keeps the DS bundle pure (no consumer-specific deps), lets consumer style/swap injected pieces, avoids circular workspace deps. Apply same pattern for: hero CTA buttons, footer newsletter form, modal content.
**Tied to:** `core-v2/src/organisms/navbar/types.ts` `MegaMenuEntry`, future `<TopNavigation>` organism port
**Propagated to:** Phase D report-store filter molecule, Phase E V0.2_report hero+CTA injection.
**Status:** confirmed

## 2026-05-08 — [build] Workspace DS pkg exports must point to src/* (not dist/*) when consumed via Next transpilePackages
**Signal:** correction (typecheck error revealed config mismatch)
**Tried/observed:** v2 DS scaffold shipped w/ exports `./atoms` → `./dist/atoms/index.d.ts` per ADR. Consumer Next.js project (V0_lite_report) couldn't resolve `import from '@kenresearch/design-system/atoms'` — TS error `Cannot find module ... or its corresponding type declarations`. Root cause: `dist/` doesn't exist (DS builds via `tsc -p tsconfig.build.json` only on publish). In workspace dev mode, Next consumes TS source directly via `transpilePackages: ['@kenresearch/design-system']`, so subpath exports must point to `./src/*/index.ts`.
**Correction or rule:** For workspace DS packages consumed by Next 15 via `transpilePackages`, package.json `exports` MUST point to `src/<subpath>/index.ts` (not `dist/<subpath>/index.{js,d.ts}`). Add `_exports_note` field reminding to swap to `dist/*` paths PRE-publish-to-npm only. Build step optional for dev. The dual `dist/dev` configs add zero value when `transpilePackages` is in play.
**Tied to:** `design-system/core-v2/package.json` exports map, `projects/V0_lite_report/next.config.ts` transpilePackages
**Propagated to:** aura-builder.md + scaffold instructions for next ports — DS workspace package exports MUST point to src/, not dist/.
**Status:** confirmed

## 2026-05-08 — [port] Strip cosmetic dev tools when porting (FloatingVariantSwitcher, TrackedButton)
**Signal:** subagent-observation (Phase C step 3b sections port)
**Tried/observed:** Legacy `CTASection.tsx` had a `FloatingVariantSwitcher` (per-section dark/light dev toggle) + `TrackedButton` (analytics wrapper). Neither belongs in production: variant is now ROOT-level (cookie + RSC at `<html data-variant>`), and analytics tracking is consumer-cross-cutting (deferred to step 7). Removed both during port: simplified CTASection to single editorial-light variant + plain `<Button>`. Net: -42 LOC, -2 imports, +1 layer of clarity.
**Correction or rule:** When porting sections, distinguish (a) production behavior, (b) dev-time toggles, (c) cross-cutting concerns. Remove (b) entirely. Defer (c) to a single integration step. Don't carry forward "just in case" — each carry-forward = drift surface.
**Tied to:** `projects/V0_lite_report/src/components/sections/CTASection.tsx` vs legacy
**Propagated to:** Apply same triage to Phase D + Phase E section ports.
**Status:** confirmed

## 2026-05-08 — [build] Token-port discipline — atom-by-atom hex→token migration is mechanical when canonical token coverage is complete
**Signal:** validation (Phase C step 2b atom port succeeded w/o blockers)
**Tried/observed:** Ported 10 V0_lite_report atoms (1797 LOC source) to core-v2 token-only impl. Pattern: read legacy → identify hex/inline/arbitrary patterns → swap to canonical CSS var (`var(--color-brand-red)`, `var(--button-height-md)`, etc.) → preserve API shape, narrow string args to typed enums → add `'use client'` for interactive atoms → add `@promotedFrom V0_lite_report` JSDoc. Mid-port discovered Badge needed 4 missing token groups (`semantic.status.{success,warning,error,info}`) + Button needed `button.{px,font}` scales — added to canonical `tokens.json`, rebuilt SD, continued port. Zero typecheck errors at end. Atoms barrel + V0_lite consumer typecheck both pass.
**Correction or rule:** When porting atoms, EXPECT token gaps. Don't fork-and-fix on the fly — STOP, add gap to canonical `tokens.json`, run `pnpm build` for SD, THEN continue. Discipline: never let an atom hardcode a hex "just for now" — every gap is a learning that DS canonical needs. When 3+ atoms in a row need the same gap (e.g., status colors), promote to dedicated semantic group, not ramp scale.
**Tied to:** `design-system/core-v2/src/atoms/{Button,Badge}.tsx`, `design-system/tokens/tokens.json` `semantic.status` + `button.{px,font}` groups
**Propagated to:** aura-builder.md template — atom port instructions: "Stop on token gap. Add to canonical, rebuild SD, continue."
**Status:** confirmed

## 2026-05-08 — [build] Mock-data gateway pattern: re-export from `mock/*.ts` files via single `mock-data.ts`
**Signal:** subagent-observation (audit recommended this; first-port validated)
**Tried/observed:** V0_lite_report-legacy had 4 mock-data sources scattered across `app/components/`: `sample-report/data.ts` (452 LOC), `chartData.ts`, `heroThemes.ts`, inline `healthcareBreadcrumbData` in `Breadcrumb.tsx`. Port pattern: copy each source verbatim to `src/lib/mock/<name>.ts`, extract inline data from components into matching `mock/` files, then write `src/lib/mock-data.ts` as pure re-export gateway. Components MUST import from `@/lib/mock-data`, never from individual mock files. `// TODO: replace w/ real API` markers preserved per source. Single typecheck blocker: legacy `import { colors }` from `../../design-system/tokens` (unused at runtime — comment-only) — removed cleanly.
**Correction or rule:** Mock-data gateway = (a) copy sources verbatim to `src/lib/mock/`, (b) consolidate inline component data into matching `mock/` files, (c) `mock-data.ts` is pure re-export, (d) preserve TODO markers, (e) audit for legacy DS imports + replace w/ workspace import OR remove if unused. Never write derivative shapes — keep raw verbatim. MSW handlers later wire `/api/<resource>` → mock data.
**Tied to:** `projects/V0_lite_report/src/lib/{mock-data.ts, mock/}`
**Propagated to:** aura-builder.md template — mock-data port section. Apply same pattern to Phase D (report-store) + Phase E (V0.2_report).
**Status:** confirmed

## 2026-05-08 — [infra] DS heal Option B (fork core-v2) preferred when v1 has Figma Make + token drift + 1000+ inline-style sites
**Signal:** correction (user-decided after my fork-vs-heal question)
**Tried/observed:** v1 had 1207 inline `style={{}}` sites, 436 hex literals, 850 `[Npx]/[#xxx]` arbitraries, zero `'use client'`, duplicate hook dirs, token namespace drift (`--brand-red` vs canonical `--color-brand-red`), 4 AnimatedArrow files w/ 4 MD docs, 26 stale .md files. Fork was cheaper than reconciling.
**Correction or rule:** When DS v1 has 3+ structural issues (token-namespace drift + dead-dep payload + zero RSC compat + duplicate sources), fork v2 + freeze v1 read-only. Heal-in-place only viable when issues are ≤2 + isolated. Forensic must enumerate all issues before this decision.
**Tied to:** `docs/aura-sprint-2026-05-07-port/B-DS-FORENSIC-v1-and-heal-plan.md`, `B2-DS-patterns-backgrounds-deep-map.md`, `design-system/core-v2/`
**Propagated to:** none (Opus-only routing decision)
**Status:** confirmed

## 2026-05-08 — [audit] Original DS audit missed patterns/backgrounds layer entirely — second-pass deep-map needed
**Signal:** correction (user prompted "did you map the patterns/backgrounds I defined?")
**Tried/observed:** First DS forensic Plan agent enumerated component count + dep audit + token namespace drift + hex/inline density + Figma Make signatures — all surface gaps. Did NOT parse `ModernUtilitiesContent.tsx`, `modern-utilities.css`, `ResourcesSection.tsx` inline gradients (the 5-overlay cinematic mesh signature), `ai-context/CORE.md` + `LAYOUT.md` + `COLORS.md`, `recipes/*.md` section alternation HARD GATE rules. User had to prompt for catch-up.
**Correction or rule:** When auditing a DS, INCLUDE in scope: (1) all CSS files in `styles/` not just main theme, (2) all foundation `.tsx` documenting patterns (often `*Content.tsx`), (3) `ai-context/` briefs, (4) `recipes/` files for hidden invariants (section alternation, variant gates, 92-5-3 hierarchy), (5) inline gradient definitions in component bodies (gradient meshes, blur compositions, blend modes). Use a 7-axis checklist: tokens / utilities / patterns / inline / recipes / docs / antipatterns.
**Tied to:** `docs/aura-sprint-2026-05-07-port/B2-DS-patterns-backgrounds-deep-map.md`
**Propagated to:** Future Plan-agent prompts auditing DS will include explicit "patterns/backgrounds depth" deliverable + 7-axis checklist.
**Status:** confirmed

## 2026-05-08 — [build] aura-builder agent overload at ~944s on 30-file scaffold; recovery via Opus filling gaps
**Signal:** subagent-observation
**Tried/observed:** Spawned aura-builder for `core-v2` scaffold (~30 files: package.json + tsconfig*.json + vite + 5 styles CSS + 4 patterns + charts + presets + storybook + docs + scripts + playground). Agent ran 53 tool uses + 944s then hit `overloaded_error` (server-side). Filesystem state showed ~85% files created — package.json, tsconfig, all src/, all styles/, patterns/, charts/. Missing: README.md + CHANGES.md root, docs/PATTERNS.md + ANTI_PATTERNS.md, scripts/. Recovery via direct Edit/Write w/ Opus filling gaps in ~5 min.
**Correction or rule:** For 25+ file scaffolds, SPLIT into 2-3 aura-builder calls (≤15 files each). Opus verifies between calls. Reduces overload risk + lets typecheck gate intermediates. Hard cap: 15 files per single aura-builder spawn.
**Tied to:** sprint 2026-05-07 Phase B3 step 1 execution
**Propagated to:** aura-builder.md template "Scope discipline" section needs: "Hard cap 15 files per call. Split larger work into sequential calls w/ Opus verification between."
**Status:** confirmed

## 2026-05-08 — [tokens] Three-part DS architecture (tokens / utilities / pattern components) must stay in lane
**Signal:** subagent-observation (B2 deep-map surfaced this)
**Tried/observed:** v1 mixed three layers: gradients defined as inline `style={{ backgroundImage: 'linear-gradient(...)' }}` in component bodies, utility classes hand-coded w/ hex (`linear-gradient(135deg, #b01f24, #ff4d4d)`), `tokens.json` had no composition group. Result: gradient changes required cross-cutting edits across all three layers + drift risk.
**Correction or rule:** Three layers w/ clear ownership:
  1. **Token Layer** (`tokens.json` → `tokens.css`) owns VALUES (named gradients, palettes, blurs, durations)
  2. **Utility Class Layer** (`utilities.css`) owns COSMETIC EFFECTS (`.glass`, `.shadow-premium`, `.text-gradient-red`) consuming tokens via `var()`
  3. **Pattern Component Layer** (`patterns/*.tsx`) owns COMPOSITION (5-overlay mesh, section bg orchestration, fade mask) — never accepts hex props, only tokens
Atom layer = consumer of all three, never defines own gradients. Never mix layers.
**Tied to:** `core-v2/src/styles/utilities.css`, `core-v2/src/patterns/`, `tokens/tokens.json` composition group
**Propagated to:** `core-v2/docs/PATTERNS.md` §1 documents; `docs/ANTI_PATTERNS.md` Cat 14 enforces.
**Status:** confirmed

## 2026-05-07 — [infra] Aura cross-session activity log shipped (option C: log-only, no auto-inject)
**Signal:** validation (user requested + approved + ran)
**Tried/observed:** Built `~/.claude/aura/` system: scrub.py (privacy filter w/ secret-pattern drop + path/email/bearer/hex regex scrub), log-activity.py (PreToolUse + Stop hooks → JSONL line per event), inject-digest.py (SessionStart digest builder, NOT wired), aura-status CLI (formatted table view), rotate.py (7d/5000-line trim). Settings guardrail blocked first wire attempt: "SessionStart hook injecting cross-session content = memory poisoning / unauthorized persistence." User picked option C (logging only, no auto-inject). PreToolUse + Stop wired, SessionStart untouched. Live-verified: hooks fire, JSONL writes scrubbed entries, `aura-status` prints formatted view. Caught + fixed scrub bug: `re.split(r'&&|;|\\|\\|', cmd)` split on `;` INSIDE quoted strings (e.g. `python3 -c "import json; ..."`); fixed w/ quote-aware shell parser walking char-by-char tracking quote state.
**Correction or rule:** (a) When designing cross-session persistence mechanisms, **default to log-write + manual-read**, not auto-inject; auto-inject = potential context steering + system guardrail trip. (b) Shell command parsing for log scrubbing must be quote-aware — naive `re.split` breaks on real-world commands. (c) System guardrails on `~/.claude/settings.json` writes are correctly conservative — escalate to user for SessionStart hook installation w/ explicit authorization, never assume permission. (d) Privacy regex must DROP entire summary on secret pattern hit, not partial-redact (partial = leakage risk).
**Tied to:** `~/.claude/aura/scrub.py` (quote-aware shell parser at L93+, secret-drop at L51), `log-activity.py`, `inject-digest.py`, `aura-status`, `rotate.py`, `~/.claude/settings.json` (PreToolUse + Stop hooks wired), `~/.claude/settings.json.pre-aura-bak` (rollback). Ref: `~/.claude/aura/README.md`.
**Propagated to:** workflow templates Phase 2 — when implementing any persistence/sync mechanism: default-deny posture, explicit user authorize for cross-session context injection, fail-soft hooks (silent exit 0, never block parent). Future Aura instances reading `~/.claude/aura/activity.jsonl` on demand for cross-session context (manual = intentional).
**Status:** confirmed.

## 2026-05-07 — [DS-infra] Batched 8 P0 DS fixes from competition-benchmarking-listing-v01 learnings
**Signal:** validation (user approved + executed P0 batch in auto-mode after plan analysis)
**Tried/observed:** After analyzing my own initial 13-item plan, dropped 5 wrong/duplicate items (#1 new skill = bloat → appended to aura-design instead; #2 recipe-conformance-gate = already done per ken-v2; #3 source-truth.md per recipe = lighter as inline header; #11 lint/test/tsconfig = tech-team scope; #13 read-cadence doc = existing rule, fix execution not docs). Added 3 missing items (image-overlay badge as DS atom not just doc; Ken canonical catalogs file; flex-stretch image-thumb anti-pattern). Shipped 8 P0 items in ~2hrs: A) recipe source-of-truth headers (report-store-listing.md + case-study.md), B) 35 new `--semantic-*` tokens (ink/ink-on-dark/hairline/surface-tint/scrim/brand-red-alpha) in tokens.json + rebuilt tokens.css, C) `SectionWrapper bg="warm-darker"` option, D) `ResourceCard metaSlot?: ReactNode` prop, E) `SidebarPanel style?: CSSProperties` prop, F) new `<ImageOverlayBadge>` atom (canonical glassmorphism wrapper, WCAG AAA), G) source-mirror checklist appended to aura-design SKILL.md, H) `design-system/catalogs/ken-research.ts` (canonical industries · regions · countries · trending tags · methodologies).
**Correction or rule:** (a) **Always self-analyze plans before executing** — initial plan had 38% wrong/duplicate items that would have wasted 4hrs. Pattern: read existing infra (DECISIONS.md / LEARNINGS.md / hooks / templates) BEFORE proposing new artifacts; prefer "extend existing" over "build new" (anti-bloat per `feedback_anti_bloat.md`). (b) Token namespacing: `--semantic-*` prefix prevents collision w/ component-scoped tokens; group by intent (ink/hairline/surface) not by raw value (rgba). (c) DS atom additions: `metaSlot?: ReactNode` + `style?: CSSProperties` are universal escape-hatch patterns — add proactively to molecules/organisms instead of forcing local copies. (d) `<ImageOverlayBadge>` pattern: image-overlay badges need 65% bg + 12px blur + text-shadow. Standard 15-20% alpha fails over images. Now atom-level so consumers can't mis-implement.
**Tied to:** `design-system/recipes/report-store-listing.md` + `case-study.md` (source-of-truth headers), `design-system/tokens/tokens.json` + `build/tokens.css` (semantic namespace), `design-system/core/src/app/components/SectionWrapper.tsx` + `ResourceCard.tsx` + `ImageOverlayBadge.tsx` (NEW), `design-system/core/src/app/components/molecules/SidebarPanel.tsx`, `design-system/catalogs/ken-research.ts` (NEW), `skills/aura-design/SKILL.md`. Logged: `docs/DECISIONS.md` 2026-05-07 entry, `docs/CHANGELOG.md` 2026-05-07 infra entry.
**Propagated to:** `aura-design` SKILL.md "Source-mirror checklist" 8-step section (pre-build / during / post-build); enforces these atoms + tokens for next consumer page.
**Status:** confirmed.

## 2026-05-07 — [DS-anti-pattern] Flex-stretch image thumb pattern (Cat 4 addition)
**Signal:** correction (user screenshot: "image left side not fully covering area")
**Tried/observed:** BenchmarkCard hero featured-card had `<div className="w-24 h-24"><img absolute inset-0 w-full h-full />`. Fixed-height (`h-24`) capped image at 96px even when sibling content right was 140px tall. Visual: 44px gap below image. Fix: `<div className="flex items-stretch"><div className="w-24 self-stretch"><img absolute inset-0 w-full h-full />` — drop fixed height, parent flex `items-stretch` makes thumb auto-grow to match content height.
**Correction or rule:** Card-image thumb in flex-stretch container needs `self-stretch` + width-only constraints, never fixed height. Parent flex must have `items-stretch` (default `stretch` works but make explicit if items have explicit heights). Image inside: `absolute inset-0 w-full h-full object-cover` for full coverage at any wrapper height.
**Tied to:** `competition-benchmarking-listing-v01/src/app/components/BenchmarkHeroBanner.tsx` FeaturedReportCarousel.
**Propagated to:** `design-system/ANTI_PATTERNS.md` Cat 4 (Spacing & Layout) — to be added: "Card-image thumb in flex-stretch container: NEVER use fixed `h-*` on thumb wrapper. Use `self-stretch` + width-only. Image absolute-fills."
**Status:** confirmed (visual screenshot diff confirmed fix).

## 2026-05-06 — [build] Tailwind v4 `text-[var()]` + `font-[var()]` silent no-op
**Signal:** subagent-observation (aura-qa V1A audit, reports-pdp-v1)
**Tried/observed:** Builder generated 110× `text-[var(--typography-size-*)]` + 81× `font-[var(--typography-weight-*)]` + `font-[var(--typography-family-*)]` Tailwind arbitrary classes. Tailwind v4 produces ZERO `font-size` / `font-weight` / `font-family` rules for these. DOM has class, stylesheet has no rule. Result: every heading rendered at 16px browser default — page reads as one undifferentiated typographic blob despite shipping 25 organisms + tokens system intact. `bg-[var()]` / `border-[var()]` / `rounded-[var()]` / `py-[var()]` DO work — only typography arbitrary vars silently no-op.
**Correction or rule:** For token-driven typography in Tailwind v4 — TWO valid patterns:
  1. **Register tokens in `@theme`**: in `globals.css` add `@theme { --text-display-2xl: var(--typography-size-2xl); ... }` so Tailwind generates `.text-display-2xl` utility class. Preferred for systematic.
  2. **Inline `style={{ fontSize: 'var(--typography-size-2xl)' }}`**: when one-offs. NEVER mix `text-[var()]` and `font-[var()]` — they don't work.
NEVER use raw Tailwind size classes like `text-2xl`, `font-bold` — those work but bypass token system (Cat 3.5 anti-pattern).
**Tied to:** Tailwind v4 (any version), Next.js 15+ App Router projects.
**Propagated to:** aura-builder.md (rule), aura-qa.md (audit checkpoint), `design-system/ANTI_PATTERNS.md` Cat 1 — addendum.
**Status:** confirmed

## 2026-05-06 — [build] Recharts ResponsiveContainer -1/-1 dims inside Framer motion.div
**Signal:** subagent-observation (aura-qa V1A audit + builder report, reports-pdp-v1)
**Tried/observed:** 16 `ChartCard` instances rendered as blank white rectangles. Console: "The width(-1) and height(-1) of chart should be greater than 0". Cause: `ResponsiveContainer` measures container synchronously on first render. Wrapping in `<FadeInSection>` (Framer `motion.div` w/ `initial={{ opacity: 0, y: 20 }}`) means parent has transform applied at first paint — Recharts reads -1 dimensions and bails. Builder also found `react-hooks/set-state-in-effect` lint blocks standard `useEffect → setMounted(true)` mount guard.
**Correction or rule:** Two fixes:
  1. **DON'T** wrap `ResponsiveContainer` inside Framer `motion.div` w/ transform initial state. Use `initial={{ opacity: 0 }}` only — NO `y` translate. Reserves real dimensions before chart measures.
  2. SSR-safe mount detection: use `useSyncExternalStore`, not `useState + useEffect`:
     ```ts
     export const useIsClient = () => useSyncExternalStore(
       () => () => {}, () => true, () => false
     );
     ```
**Tied to:** recharts 2.x/3.x + Framer Motion 11+/12+ + Next.js App Router (RSC streaming).
**Propagated to:** aura-builder.md (charts checklist), `design-system/ANTI_PATTERNS.md` Cat 6 — addendum.
**Status:** confirmed

## 2026-05-06 — [layout] Fixed-overlay offset must apply to all content siblings, not just `<main>`
**Signal:** subagent-observation (aura-qa V1A audit, reports-pdp-v1)
**Tried/observed:** TOC rail fixed-position 240px on left. Builder added `xl:pl-60` to `<main>` only. `ReportPDPHero` rendered as sibling of `<main>`, not inside — hero left 240px occluded by TOC overlay.
**Correction or rule:** When fixed overlay takes horizontal space — wrap ALL page content (including hero) inside `<main>` with offset class. Only truly global UI (navbar, sticky CTA, reading progress bar) lives outside `<main>`. Hero = page content, not chrome.
**Tied to:** any layout w/ persistent left-rail navigation.
**Propagated to:** aura-builder.md (layout-architecture rule), report-detail-heavy.md recipe.
**Status:** confirmed

## 2026-05-05 — [tooling] tsconfig errors in DS projects: Figma Make legacy + missing TS infra + phantom server cache
**Signal:** correction (user audit: "we are having some errors in tsconfig solve them")
**Tried/observed:** Two reported errors pointed at deleted ken-v1/ken-v2 paths — were VSCode TS server cache (phantom, fix = Restart TS Server). While diagnosing, audited surviving DS projects (`design-system/core/` + `design-system/dashboard/`) found 10 architectural bugs: (1) core package.json name = `@figma/my-make-file` violating Cat 12.3 anti-pattern explicitly; (2) typescript not installed either project; (3) `@types/node` + `@types/react-dom` missing; (4) react/react-dom in peerDeps optional (apps not installing React); (5) no typecheck script; (6) tsconfig `moduleResolution: Node` Vite-incompatible w/ TS 5+; (7) tsconfig `baseUrl` TS 6.0 deprecation; (8) no `vite-env.d.ts` (figma:asset + CSS imports unresolved); (9) target ESNext (float); (10) strict: true on Figma Make legacy = 200 TS errors blocking builds. Vite build reported success the whole time because esbuild transpile != typecheck.
**Correction or rule:** (a) When importing Figma Make output, run normalization checklist on EVERY project: rename pkg, install TS, add types, move React peerDeps→deps, add typecheck script, add vite-env.d.ts, set bundler moduleResolution. (b) Build success ≠ correctness — always run typecheck. (c) When deleting folders w/ tsconfigs, restart TS server in VSCode to clear cache (not a tsconfig bug).
**Tied to:** `design-system/core/package.json` + tsconfig.json + new vite-env.d.ts; `design-system/dashboard/package.json` + tsconfig.json + new vite-env.d.ts; `ANTI_PATTERNS.md` Cat 12.3 (existed but unenforced).
**Propagated to:** HANDOVER_TRACKER.md 13-point gate (Phase 2: add `pnpm typecheck` per project as gate item); ANTI_PATTERNS.md Phase 2 enforcement scripts (e.g. `pkg-name-check.sh` fail if any package.json starts with `@figma/`); aura-builder template (Phase 2: include "verify pkg name + TS infra" pre-build check for new projects).
**Status:** confirmed.

## 2026-05-05 — [page-build] DS recipe bypassed end-to-end on ken-v2 case study
**Signal:** correction (user audit: "not following our design system guardrails")
**Tried/observed:** ken-v2 was built via aura-builder Sonnet for `/page case-study` recipe. Builder ignored recipe variant DEFAULT (editorial-light → built cinematic-dark), ignored bg alternation rule (recipe: black→white→warm→…; built: all dark), invented own organism names (`Hero` `Chapter1-5` `ClosingScene` instead of recipe-mandated `HeroSection` `ChallengesSection` `EngagementObjectivesSection` `MethodologySection` `ImpactSection` `TestimonialSection` `ResourcesSection` `FinalCTASection`), zero DS component imports (re-implemented every atom inline), 35+ hardcoded `rgba(250,250,250,X)` literals violating Cat 1.1+2.4. aura-qa passed it as "8.5/10" because gates checked a11y + perf + DOM-presence, not recipe conformance.
**Correction or rule:** Recipes must become enforceable specs, not documentation. Specifically: (1) recipe variant DEFAULT must be honored unless user explicit override; (2) organism filenames must match recipe table; (3) bg alternation per recipe is a P0 gate; (4) DS components per COMPONENT_REFERENCE must be imported when present in same stack — re-implementation is anti-pattern Cat 13.8.
**Tied to:** `design-system/recipes/case-study.md` v1, `skills/aura-design/SKILL.md` (current ken-v1 PRIMARY hardcode at L80), `skills/page/SKILL.md` (workflow has propose step but no blocking validation), `.claude/agents/aura-builder.md` L21 (ken-v1 PRIMARY hardcode), `.claude/agents/aura-qa.md` (no recipe-conformance gate).
**Propagated to:** aura-builder.md (de-personalize from ken-v1), aura-qa.md (add recipe-conformance gate), aura-design SKILL.md (remove ken-v1 PRIMARY hardcode), recipes/case-study.md (move variant DEFAULT to top + bold), ANTI_PATTERNS.md Cat 13 (add "never improvise organism names against existing recipe"), page/SKILL.md (add blocking confirm gate before builder spawn).
**Status:** confirmed — directly observed across full ken-v2 build cycle.



## 2026-05-06 — [page-build] DS sync rule: when consuming an existing surface, FIRST step = verbatim source mirror, not interpretive recreate
**Signal:** correction (user, after 4 rounds of color/typography/layout fixes on competition-benchmarking-listing-v01: *"the filter ui colors and fonts entirely same as the design system report store filters... the purpose of the design system is to sync everything we build right? next time i should not explain this much"*)
**Tried/observed:** Built filter sidebar + cards from design intent (RS-pattern-inspired) vs RS source verbatim. Result: width 280px not RS's 224px (`w-56`); section divider `--hairline-faint` not RS's `--warm-500`; section h4 `--text-primary` (later) but RS uses `--black-600`; checkbox accent toggled red/black between iterations; hover row recreated as inline JS handlers vs RS `hover:bg-black/[0.03]` Tailwind class; standalone `CheckboxFilterSection.tsx` w/ extended API instead of inline RS pattern; sidebar visibility `lg` not RS's `xl`; no separate "Request Custom Research" black box below Card. 4 user-correction rounds before we landed on near-verbatim mirror. Same pattern in cards (ResourceCard variant rotation initially used in masonry but lost RS card chrome — title size, eyebrow style, meta colors all drifted).
**Correction or rule:** **"DS-sync hierarchy" — when building any consumer page that consumes an existing pattern (filter, card, hero, listing), the build sequence is:**
  1. **Verbatim mirror** the source-of-truth file from the canonical project (e.g. `report-store-v07/FiltersPanel.tsx`, `report-store-v07/ReportCard.tsx`) — copy into project, rename, swap data inputs only
  2. **Add page-specific dimensions** as additional sections w/ identical pattern (do NOT modify the inherited section visuals)
  3. **Layer hybrid logic** (e.g. ResourceCard variant rotation for grid masonry rhythm) ONLY after step 1+2 produce visual parity w/ source
  4. Never recreate from "inspired by" — copy + extend.
**Why:** DS sync is the WHOLE point of having a DS. Interpretive recreation ≠ sync. User shouldn't have to specify width / spacing / hover / selected / unselected / colors / labels / positions per build — those come from source automatically when you mirror.
**How to apply:** When user says "use [pattern X] from [project Y]", read the entire source file once, copy structure verbatim into target, then ADD page-specifics as new sections of same shape. Pattern mirroring is L0/L1 mechanical work — should never bloom into 4 rounds of correction. If unclear which source to mirror, ASK before building.
**Tied to:** `projects/competition-benchmarking-listing-v01/src/app/components/BenchmarkFilterSidebar.tsx` (now near-verbatim RS-v07 FiltersPanel clone), `BenchmarkCard.tsx` (RS GridCard chrome + ResourceCard variant rotation hybrid), `BenchmarkListCard.tsx` (RS ListCard verbatim).
**Propagated to:** workflows/agents/aura-builder template — add pre-build "source-mirror checklist" step when user mentions consuming existing DS pattern. Phase 2: skill template `consumer-page-builder` w/ baked-in checklist (read source → mirror → extend → hybridize). docs/CHANGELOG.md infra entry.
**Status:** confirmed.

## 2026-05-06 — [enhancement] CheckboxFilterSection onChange/toggle bridging friction + ResourceCard metaSlot pattern
**Signal:** subagent observation (aura-builder enhancement pass returned 3 distinct integration friction points)
**Tried/observed:** (1) **CheckboxFilterSection `onChange(string[])` vs hook `toggle(value)` mismatch** — sidebar receives full new selection array, hook exposes single-value toggles. Each section needs diff+map bridging code (~5 lines × 6 sections). Friction repeats per-listing-page. (2) **`{key, label, count}` items pattern** — methodology + page-count need separate display labels and selection keys. CheckboxFilterSection initially used `name` for both → keys leaked into UI. Fix: extended FilterItem to optional `key` (defaults to `name`). Pattern works clean. (3) **ResourceCard children/meta injection** — DS ResourceCard had no slot for extra metadata (page count + region + competitors). Builder workaround used negative-margin sibling div. Aura added `metaSlot?: ReactNode` prop to project-local ResourceCard copy. Renders cleanly inside content area after description. Validated.
**Correction or rule:** (a) `CheckboxFilterSection` should optionally accept individual `onToggle(value)` callback alongside `onChange(array)` — eliminates bridging code. Future sidebar molecules in DS adopt same pattern. (b) Filter item shape `{key, label, count}` is canonical — `key` ≠ `name`/`label` whenever display differs from underlying value. Bake into DS molecule contract. (c) Card components used in masonry listings need `metaSlot?: ReactNode` to support page-specific meta extensions without re-implementing the card. Apply to ResourceCard in DS Phase 2.
**Tied to:** `projects/competition-benchmarking-listing-v01/src/app/components/CheckboxFilterSection.tsx`, `BenchmarkFilterSidebar.tsx`, `BenchmarkMobileFilterSheet.tsx`, `BenchmarkCard.tsx`, `ResourceCard.tsx` (project-local copy w/ metaSlot); originals in `design-system/core/src/app/components/`.
**Propagated to:** docs/LEARNINGS.md (this entry); HANDOVER_TRACKER.md (project notes); aura-builder template Phase 2 (when consuming CheckboxFilterSection or ResourceCard, check for metaSlot + key/label split — flag missing).
**Status:** confirmed.

## 2026-05-06 — [page-build] DS gaps surfaced building competition-benchmarking-listing-v01
**Signal:** subagent observation (aura-builder + aura-qa returned 6 distinct DS-level gaps during page build)
**Tried/observed:** Built new listing page consuming DS atoms strictly. 6 friction points emerged: (1) **No pure-black token** — `theme.css` max is `--black-900: #171717`. Multiple components use `#000000` raw because no canonical token exists. (2) **`SectionWrapper` lacks `warm-300` bg option** — only `white | neutral50 | black | transparent`. Spec routinely calls for warm-300; forces inline style workaround. (3) **`FilterAccordion` requires all 3 props (`icon`, `isOpen`, `onToggle`)** — no `defaultOpen` shortcut. ~10 lines boilerplate per sidebar. (4) **`SidebarPanel width` prop is Tailwind-class string only** — no inline-style escape hatch, no token-based numeric width. (5) **`react-responsive-masonry` not in any project template** — installed fresh per page build. (6) **GSAP not in `report-store-v07` template** — installed fresh; spec hero motion required it. **Pervasive hardcoded hex** in DS-shared atoms (`SectionWrapper`, `Button`, `Card`, `iconColors`) — DS itself violates Cat 1.1.
**Correction or rule:** (a) Add `--black: #000000` to `theme.css` as canonical token (Haiku-mech once approved). (b) Extend `SectionWrapper` `bg` type to include `warm300` (DS edit, P1). (c) Add `defaultOpen` prop to `FilterAccordion` + `style` passthrough to `SidebarPanel` (DS Phase 2). (d) `react-responsive-masonry` + `gsap` belong in shared listing-page template — fold into `report-store-v07` so future listing pages inherit. (e) DS-internal hex anti-pattern is systemic (~11 sites) — needs dedicated mech-pass to replace `#000000` / `#ffffff` w/ tokens across DS components. Out-of-scope for any single page build; route through Aura → Haiku batch.
**Tied to:** `design-system/core/src/styles/theme.css`, `design-system/core/src/app/components/SectionWrapper.tsx`, `FilterAccordion.tsx`, `SidebarPanel.tsx`, `Button.tsx`, `Card.tsx`, `iconColors.ts`; `projects/report-store-v07/package.json` (template); `projects/competition-benchmarking-listing-v01/` (concrete instance).
**Propagated to:** HANDOVER_TRACKER.md (new project entry w/ open gaps noted); aura-builder template Phase 2 (pre-build check: confirm masonry + GSAP deps present in template, install if not + flag); ANTI_PATTERNS.md Cat 1 enforcement script Phase 2 (grep DS components for raw hex).
**Status:** confirmed.

---

## Archive

(empty)
