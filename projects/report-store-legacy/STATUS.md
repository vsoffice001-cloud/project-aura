# STATUS — report-store-v07

**Status:** `cleanup`
**Owner (current):** design
**Last review:** 2026-04-30
**Reviewer:** Aura

## Current state

Report Store UI for Ken Research — a Vite + React 19 single-page application rendering the full report store experience: hero search, industry sidebar, report card listing (list/grid), filter system, analyst picks, testimonials, globe region explorer, and supporting sections. Editorial light variant (warm white backgrounds, Ken red `#b01f24` accent). Mock data lives in `src/app/components/data.ts` with a re-export gateway at `src/lib/mock-data.ts`. Phase 3 cleanup complete: audit docs moved to `_dev-notes/`, orphaned draft imports moved, mock-data gateway created, STATUS/HANDOVER/README written.

## Pre-handover gate (mark as you pass each)

- [ ] `pnpm install` from clean clone boots
- [ ] Lint clean
- [ ] Build succeeds
- [ ] Mock data extracted to `src/lib/mock-data.ts` (or equivalent) — **DONE** (gateway at `src/lib/mock-data.ts`; source remains `src/app/components/data.ts`)
- [ ] TS strict mode on (or exception documented) — not verified; tsconfig not yet audited
- [ ] A11y axe scan: 0 critical violations
- [ ] Lighthouse mobile ≥85 perf / ≥95 a11y / ≥95 best-practices
- [ ] `prefers-reduced-motion` honored — partial (CSS animations respect it via `theme.css`; component-level JS motion not fully audited)
- [ ] `README.md` complete — **DONE**
- [ ] `HANDOVER.md` complete — **DONE**
- [ ] Visual baseline (gstack screenshots) captured
- [ ] Conventional commits in git log

## Open issues (won't fix in design phase)

- **Optional peer deps (react/react-dom 18.3.1):** `package.json` declares `react` and `react-dom` as optional peer deps rather than regular deps. Non-blocking — Vite resolves them correctly from workspace node_modules. Tech team should move to regular `dependencies` on intake. See HANDOVER.md Known Issues.
- **package name `@figma/my-make-file`:** Figma Make default name. Tech team must rename to `@kenresearch/report-store` or equivalent on intake.
- **`TopDownloads` + `NewsletterSignup` + `ReportStorePage`:** Exported from barrel but not wired in `App.tsx`. Available for tech team to integrate as needed.
- **`src/imports/` folder:** `afghanistan-angola-geo-2.json` stays (imported by `ui/globe.tsx`). Other draft files moved to `_dev-notes/`.
- **`motion` package (v12):** Installed as `motion` not `framer-motion`. No `framer-motion` imports found. All motion usage is v12 API. Confirm with tech team if `framer-motion` alias needed.
- **A11y baseline:** Not yet run. Axe scan + Lighthouse pending.
- **Visual baseline:** gstack screenshots not yet captured.

## Versioning notes

- This is version `07`. Previous iterations exist as earlier Figma Make exports.
- Next iteration → copy to `report-store-v08/`, do not edit this folder after handover.
