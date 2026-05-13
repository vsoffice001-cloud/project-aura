# STATUS — @kenresearch/design-system v2 (core-v2)

**Status:** `ready-for-tech`
**Owner (current):** design (Aura)
**Last review:** 2026-05-13
**Reviewer:** Aura

## Current state

Ken Research Design System v2 — workspace-published library (`@kenresearch/design-system`). 100% coverage of OG `Design_system_vs_26 (og and final)/` Figma export post DS Port Phase 1-3 (2026-05-13). ~168 components across 23 hooks · 42 atoms · 26 molecules · 38 organisms · 46 shadcn UI · 13 public types. Token-only · TypeScript strict · Next 15 + RSC compat (`'use client'` directives present where stateful). Editorial-light default + cinematic-dark variant. Consumed by 4 active projects (`V0_lite_report` · `V0.2_report` · `report-store` · `reports-pdp-v2`).

## Pre-handover gate (library variant — gate adapted from app template)
- [x] `pnpm install` from workspace root boots clean
- [x] Typecheck clean (`pnpm typecheck`)
- [ ] Lint clean — `pnpm lint` script broken (ESLint not installed in core-v2). Defer to tech intake or install w/ shared workspace config.
- [x] Build clean (`pnpm build` → `dist/` w/ .d.ts + .d.ts.map for all subpath exports)
- [x] Mock data isolated — DS exports types only · no mock data ships from DS (adapter pattern: consumers inject data via props)
- [x] TS strict mode on (`strict: true` + `noUnusedLocals` + `noUnusedParameters` + `noFallthroughCasesInSwitch`)
- [ ] A11y axe scan — N/A (library has no page · run on consumer playgrounds). Atoms/molecules tested in-context via `reports-pdp-v2` axe sweep 2026-05-11 (0 critical · 0 serious).
- [ ] Lighthouse — N/A (library)
- [x] `prefers-reduced-motion` honored — Framer `useReducedMotion()` + CSS `motion-reduce:` utilities throughout; `useScrollAnimation` + `useMagneticEffect` reset cleanly
- [x] `README.md` complete (incl. adapter pattern usage + Phase 1-3 component counts)
- [x] `HANDOVER.md` complete (this commit)
- [ ] Visual baseline — deferred (no playground actively maintained; consumers carry visual baselines)
- [x] Conventional commits in workspace git log

## Open issues (won't fix in design phase)

- **ESLint setup:** `pnpm lint` script references `eslint src/` but no `eslint.config.js`/`.eslintrc.*` exists and ESLint not installed. Tech to wire workspace-shared ESLint config OR remove the lint script.
- **Storybook stories:** No stories shipped for the 28 organisms added in Phase 2-3. Tech may add per-component stories OR rely on consumer-app screenshots as visual reference.
- **Playground:** `pnpm playground` referenced in scripts but `playground/` not actively maintained. Consumer apps serve as live reference.
- **`FigmaButtonComparison.tsx`:** stays in `src/atoms/_consumer-coupled/` (excluded from build via `tsconfig.build.json`) — doc-page demo only · Figma SVG imports · not a runtime atom. Safe to delete if Figma comparison docs are obsolete.
- **`useReportFilters` hook:** NOT lifted to DS — depends on consumer mock data shape (uses `FULL_INDUSTRIES`, `FEATURED_REPORTS` etc. directly). DS exports `ReportFilters` shape · consumer owns the hook implementation.

## Versioning notes

- This is `v0.1.0` of `@kenresearch/design-system`. Previous: `design-system/core/` (Vite/React v1) DELETED 2026-05-11 post audit. Recoverable from git history.
- Next iteration → bump `package.json` version (semver) · workspace continues to consume via `workspace:*`.
- For external npm publish: switch `package.json` exports map from `./src/*.ts` paths to `./dist/*.js` paths (see `_exports_note` field in package.json).
