---
title: Sprint 2026-05-07 — Consolidated Learnings
generated: 2026-05-08
status: closed-sprint summary
sprint: 3-project Vite→Next port + DS heal (Option B)
companion: WORKSPACE-MAP.md · LEARNINGS.md · DECISIONS.md
---

# Sprint 2026-05-07 — What we learned

Consolidation of 11 LEARNINGS entries written between 2026-05-08 audit-pass + sprint exit. Grouped by theme. Each learning links back to source LEARNING + ADR if any.

Use this as the **first read for the next sprint** before touching DS/port work.

---

## A. DS architecture (most expensive lessons)

### A1. Three-layer ownership — tokens / utilities / patterns
Mixing layers caused the v1 cleanup cost. Each layer owns ONE thing:

1. **Token layer** (`tokens.json` → `tokens.css`) owns VALUES — named gradients, palettes, blurs, durations
2. **Utility class layer** (`utilities.css`) owns COSMETIC EFFECTS — `.glass`, `.shadow-premium`, `.text-gradient-red` consuming tokens via `var()`
3. **Pattern component layer** (`patterns/*.tsx`) owns COMPOSITION — 5-overlay mesh, section bg orchestration, fade mask. Never accepts hex props, only tokens.

Atoms consume all three, never define own gradients. Never mix layers.

→ source: LEARNINGS 2026-05-08 "Three-part DS architecture"
→ enforced in: `core-v2/docs/PATTERNS.md` §1, `ANTI_PATTERNS.md` Cat 14

### A2. Audit-pass scope — 7-axis checklist
Original DS forensic missed patterns/backgrounds layer entirely. User had to prompt for catch-up. Future DS audit MUST include:

1. **Tokens** — namespace drift, missing groups
2. **Utilities** — hand-coded hex in CSS files
3. **Patterns** — inline gradient definitions in component bodies (gradient meshes, blur compositions, blend modes)
4. **Inline density** — `style={{}}` site count + arbitrary `[Npx]/[#xxx]` count
5. **Recipes** — section alternation HARD GATE, variant DEFAULT, 92-5-3 hierarchy hidden invariants
6. **Docs** — `ai-context/`, `recipes/`, foundation `*Content.tsx` brief documents
7. **Antipatterns** — what's documented vs what's enforced

→ source: LEARNINGS 2026-05-08 "Original DS audit missed patterns/backgrounds"

### A3. When to fork DS (Option B) vs heal-in-place
Heal-in-place only viable when issues are ≤2 + isolated. Fork v2 + freeze v1 read-only when DS has **3+ structural issues**:
- Token namespace drift (e.g., `--brand-red` vs canonical `--color-brand-red`)
- Dead-dep payload (zero `'use client'`, 1000+ inline-style sites, 400+ hex literals)
- Zero RSC compat
- Duplicate sources (4 AnimatedArrow files, etc.)

Forensic must enumerate all issues BEFORE this decision.

→ source: LEARNINGS 2026-05-08 "DS heal Option B" + ADR 2026-05-08

---

## B. Workspace mechanics (Next 15 + pnpm + TS)

### B1. Workspace DS exports must point to `src/*`
Next 15 `transpilePackages: ['@kenresearch/design-system']` consumes TS source directly. Package.json `exports` map MUST point to `./src/<subpath>/index.ts` — never `./dist/*` until publishing to npm.

Add `_exports_note` field reminding to swap to `dist/*` paths PRE-publish-only.

→ source: LEARNINGS 2026-05-08 "Workspace DS pkg exports must point to src/*" + ADR 2026-05-08

### B2. Drop `.js` import suffix when `transpilePackages` is in play
TS bundler resolution accepts `.js` suffix → typecheck passes. Webpack via `transpilePackages` rejects → build fails. Strip suffix everywhere internal:

```bash
sed -i '' "s|\(from '\./[^']*\)\.js'|\1'|g" path/to/files
```

Add back only when shipping compiled ESM dist to npm.

→ source: LEARNINGS 2026-05-08 ".js suffix drop" + ADR 2026-05-08

### B3. Token-port discipline — stop on gap, add to canonical, rebuild
Atom-by-atom hex→token migration is mechanical IF canonical token coverage is complete. When a gap surfaces mid-port:
1. STOP the port
2. Add gap to canonical `tokens.json`
3. Run `pnpm build` for Style Dictionary
4. Resume port

Never let an atom hardcode a hex "just for now" — every gap = a learning that DS canonical needs. When 3+ atoms in a row need the same gap (e.g., status colors), promote to dedicated semantic group, not ramp scale.

→ source: LEARNINGS 2026-05-08 "Token-port discipline"

### B4. Mock-data gateway pattern
Per project: `src/lib/mock-data.ts` is a pure re-export gateway. Raw mock files live in `src/lib/mock/<name>.ts`.

Steps:
1. Copy each legacy source verbatim to `src/lib/mock/<name>.ts`
2. Extract inline component data into matching `mock/` files
3. `mock-data.ts` re-exports only — never holds data
4. Preserve `// TODO: replace w/ real API` markers
5. Audit for legacy DS imports — replace with workspace import OR remove if unused
6. Components MUST import from `@/lib/mock-data`, never from individual mock files

→ source: LEARNINGS 2026-05-08 "Mock-data gateway pattern"

---

## C. Component-port mechanics

### C1. Render-prop slot pattern for consumer-specific atoms
`<TopNavigation>` (DS) accepts `logo`, `ctaButton`, `companyDropdown`, `mobileMenu` as render-prop slots. Consumer assembles:

```tsx
<TopNavigation
  logo={<Logo />}
  ctaButton={<Button variant="brand">Book call</Button>}
  companyDropdown={(isOpen) => <CompanyDropdown isOpen={isOpen} />}
/>
```

Reason: keeps DS bundle pure (no consumer-specific deps), lets consumer style/swap injected pieces, avoids circular workspace deps. Apply same pattern for hero CTAs, footer newsletter forms, modal content.

→ source: LEARNINGS 2026-05-08 "Render-prop injection pattern"

### C2. Strip cosmetic dev tools when porting
Legacy sections often carry `FloatingVariantSwitcher` (per-section dev toggles), `TrackedButton` (analytics wrappers), `dev-only` props. Triage:
- (a) production behavior → carry forward
- (b) dev-time toggles → REMOVE entirely (variant is now ROOT-level cookie + RSC)
- (c) cross-cutting concerns (analytics, telemetry) → defer to single integration step

Don't carry forward "just in case" — each carry-forward = drift surface.

→ source: LEARNINGS 2026-05-08 "Strip cosmetic dev tools"

### C3. Canonical-source rule for shared components
When 2+ projects have same component-class (e.g., navbar, filter sidebar, card), the most recent + most-atomic-organized version is canonical. Audit all candidates BEFORE selecting source for promotion.

Don't assume the project being ported owns its own version of every component — many components are workspace-shared. Example: V0_lite_report had inline 442-LOC Header. `topnav-v32/` had 22-file atomic-design tree w/ injectable slots — clear winner.

→ source: LEARNINGS 2026-05-08 "Navbar source = topnav-v32" + ADR 2026-05-08

### C4. DS-sync hierarchy — verbatim mirror first, extend after (older but reinforced)
When user says "use [pattern X] from [project Y]":
1. Read entire source file once
2. Copy structure verbatim into target, swap data inputs only
3. Add page-specific dimensions as additional sections w/ identical pattern (don't modify inherited section visuals)
4. Layer hybrid logic ONLY after step 1+2 produce visual parity
5. Never recreate from "inspired by" — copy + extend

DS sync is the WHOLE point of the DS. Interpretive recreation ≠ sync.

→ source: LEARNINGS 2026-05-06 "DS sync rule"

---

## D. Subagent operations

### D1. aura-builder hard cap: 15 files per spawn
30-file scaffold → aura-builder ran 53 tool uses + 944s, hit `overloaded_error`. Recovery via direct Edit/Write w/ Opus filling gaps.

Rule: SPLIT 25+ file scaffolds into 2-3 aura-builder calls (≤15 files each). Opus verifies between calls. Reduces overload risk + lets typecheck gate intermediates.

→ source: LEARNINGS 2026-05-08 "aura-builder agent overload"

### D2. Plan agent retry on 529 overload — second attempt usually succeeds
DS audit Plan agent first run hit 529. Retry succeeded. Don't escalate prematurely; one immediate retry is the right next step.

---

## E. Sprint-management lessons

### E1. Scaffold-only foundation for big-port projects
report-store = 110+ component files. V0.2_report = 9-13 working day estimate. When a single sprint can't fit detailed port, deliver foundation only:
- Next 15 scaffold + mock-data gateway + NavbarShell wired
- Production build clean
- Detailed section ports deferred consumer-driven, tracked in `HANDOVER_TRACKER.md` + audit `§10`/`§13`

This gives the consumer a working boot floor + clear pickup queue. Beats "skip scaffold, audit-only" (leaves consumer empty-handed).

→ source: ADR 2026-05-08 "Phase D + E scaffold-only foundation"

### E2. Self-analyze plans before executing
Initial 13-item plan had 38% wrong/duplicate items that would've wasted ~4hrs. Pattern:
- Read existing infra (DECISIONS / LEARNINGS / hooks / templates) BEFORE proposing new artifacts
- Prefer "extend existing" over "build new" (anti-bloat)
- Drop items that duplicate already-shipped work
- Surface missing items the original plan didn't catch

→ source: LEARNINGS 2026-05-07 "Batched 8 P0 DS fixes"

---

## F. Recipe-conformance findings (carried over from prior sprints, still active)

### F1. Recipes must be enforceable specs, not docs
ken-v2 case study failure: builder ignored variant DEFAULT, ignored bg alternation, invented organism names, re-implemented every atom inline, 35+ hardcoded `rgba()` literals. aura-qa passed it 8.5/10 because gates checked a11y/perf/DOM, not recipe conformance.

Enforce:
1. Recipe variant DEFAULT honored unless user explicit override
2. Organism filenames match recipe table
3. Bg alternation per recipe = P0 gate
4. DS components per `COMPONENT_REFERENCE.md` MUST be imported when present in same stack — re-implementation = Cat 13.8 anti-pattern

→ source: LEARNINGS 2026-05-05 "DS recipe bypassed end-to-end on ken-v2"

### F2. Tailwind v4 typography arbitrary classes silent no-op
`text-[var(--typography-size-*)]` + `font-[var(--typography-weight-*)]` produce ZERO `font-size`/`font-weight`/`font-family` rules. Page renders at 16px browser default.

Two valid patterns:
1. Register tokens in `@theme { --text-display-2xl: var(...); }` so Tailwind generates utility class
2. Inline `style={{ fontSize: 'var(...)' }}` for one-offs

NEVER use `text-[var()]`/`font-[var()]` arbitrary classes. NEVER use raw Tailwind size classes (`text-2xl`, `font-bold`) — they bypass token system.

→ source: LEARNINGS 2026-05-06 "Tailwind v4 typography no-op"

### F3. Recharts -1/-1 dims inside Framer motion.div w/ transform
Wrapping `<ResponsiveContainer>` inside `<motion.div initial={{ opacity: 0, y: 20 }}>` → Recharts measures parent w/ active transform → reads -1 → renders blank.

Fix: use `initial={{ opacity: 0 }}` only, NO `y` translate on chart wrappers. SSR-safe mount detection via `useSyncExternalStore`, not `useState + useEffect`.

→ source: LEARNINGS 2026-05-06 "Recharts ResponsiveContainer -1/-1 dims"

---

## G. Cross-cutting forcing functions

These are the "do this every time" rules surfacing across multiple sprints:

| Forcing function | Trigger | Action |
|---|---|---|
| **Read existing infra first** | Before proposing any new artifact | Read DECISIONS / LEARNINGS / hooks / templates. Extend over build-new. |
| **Verbatim mirror first** | User says "use X from Y" | Copy source file structure verbatim before any reinterpretation. |
| **Stop on token gap** | Atom port hits a hex with no canonical token | Add gap to `tokens.json`, rebuild SD, then continue. |
| **15-file cap on aura-builder** | Scaffold/refactor task | Split larger work into sequential calls w/ Opus verification between. |
| **7-axis DS audit** | Auditing any DS | tokens / utilities / patterns / inline / recipes / docs / antipatterns. |
| **Recipe-conformance gate** | Page-build aura-qa pass | Variant DEFAULT + organism names + bg alternation + DS imports as P0 checks. |
| **Mock-data gateway** | Per-project mock setup | `src/lib/mock-data.ts` re-export only; raw in `src/lib/mock/`. |
| **Render-prop slots for consumer atoms** | DS organism needs consumer-specific atom | Use slot props, not hard imports. |

---

## H. What's still deferred (carry-over to next sprint)

Tracked in `HANDOVER_TRACKER.md` + per-project audit files:

1. **report-store** — 110+ component files: Hero+3D globe SSR-wrap, IndustrySidebar (675 LOC), ReportCard (583 LOC), `useReportFilters` (465 LOC URL-state), MobileFilterSheet, ExploreByRegion, FeaturedResearch, AnalystPicks. Source: A2 audit §10.
2. **V0.2_report** — heavy rewrite: 13-section IA per A3 audit §13, cinematic-dark hero, d3 mindmap visual redesign, Qatar Fresh Herbs content carry-over. Estimate 9-13 days.
3. **V0_lite_report pre-handover gate** — a11y axe pass, Lighthouse CWV, visual baseline, real Logo asset, useAnalytics tracker (229 LOC stub), real slide assets.
4. **DS v1 cutover** — rename `core/` → `core-legacy-v1/`, delete `dashboard/` after merge. Phase B3 step 14 deferred.

---

## I. Pointers

- Workspace topology snapshot: [WORKSPACE-MAP.md](./WORKSPACE-MAP.md)
- All 11 sprint LEARNINGS verbatim: [LEARNINGS.md](./LEARNINGS.md) `## Active` 2026-05-08 entries
- All 8 sprint ADRs: [DECISIONS.md](./DECISIONS.md) `## Active` 2026-05-08 entries
- Aura-infra log: [CHANGELOG.md](./CHANGELOG.md)
- Sprint audits: [aura-sprint-2026-05-07-port/](./aura-sprint-2026-05-07-port/)
- Project status board: [HANDOVER_TRACKER.md](../HANDOVER_TRACKER.md)
