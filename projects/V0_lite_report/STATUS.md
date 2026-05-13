# STATUS — V0 Lite Report

**Status:** `cleanup`
**Owner (current):** design
**Last review:** 2026-05-08
**Reviewer:** Aura

## Current state

Next.js 15 App Router scaffold created as Phase C Step 1 of sprint 2026-05-07. Project consumes `@kenresearch/design-system` and `@kenresearch/tokens` from pnpm workspace. Editorial-light variant is default; cinematic-dark is cookie-opt-in. No components ported yet — Phase C Step 2+ handles mock-data consolidation, atom parity audit, and incremental component port from `V0_lite_report-legacy/`. See port plan in `docs/aura-sprint-2026-05-07-port/A1-V0_lite_report-audit.md`.

## Pre-handover gate (mark as you pass each)
- [ ] `pnpm install` from clean clone boots
- [ ] Lint clean
- [ ] Build succeeds
- [ ] Mock data extracted to `src/lib/mock-data.ts` (or equivalent)
- [ ] TS strict mode on (or exception documented)
- [ ] A11y axe scan: 0 critical violations
- [ ] Lighthouse mobile ≥85 perf / ≥95 a11y / ≥95 best-practices
- [ ] `prefers-reduced-motion` honored
- [ ] `README.md` complete
- [ ] `HANDOVER.md` complete
- [ ] Visual baseline (gstack screenshots) captured
- [ ] Conventional commits in git log

## Open issues (won't fix in design phase)
- Component port in progress: all legacy components being migrated from `V0_lite_report-legacy/` per A1 audit recommended order.
- DS atoms not yet available in `@kenresearch/design-system` — co-developed in Phase C steps 4-9.
- `recharts` dependency in legacy: confirm zero app uses then drop (per A1 audit §Dependency Triage).
- Hash-anchor TOC links: `<a href="#id">` vs `<Link href="/#id">` — decision deferred to Phase C step 8.
- PNG assets (Vite `figma:asset/`): copy to `public/` or relative `src/` imports — decision deferred to Phase C step 7.
- `AnalyticsDashboard` dev-gate (Ctrl+Shift+A): keep per locked decision; shipping as-is.

## Versioning notes
- This is version `1` (clean Next 15 port). Previous: `V0_lite_report-legacy/` (Vite SPA, Figma Make origin).
- Next iteration → copy to `V0_lite_report-v2/`, do not edit this folder after handover.
