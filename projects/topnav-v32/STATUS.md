# STATUS — topnav-v32

**Status:** `cleanup`
**Owner (current):** design
**Last review:** 2026-04-30
**Reviewer:** Aura

## Current state

topnav-v32 is a standalone Vite + React component project — it is NOT a standalone app. The entire deliverable is the Ken Research top navigation system (TopNavigation component + sub-pieces). App.tsx and routes.tsx exist only to showcase the component in a browser. Dead code stripped (ServicesDropdown, ResourcesDropdown, PushMenuGoldStandard, Figma Make Guidelines placeholder, ~50 Figma export files archived to `_dev-notes/`). Nav structural mock data catalogued in `src/lib/mock-data.ts` with TODO markers. Boot verified: HTTP 200 on `pnpm dev`. Phase 3 cleanup complete. A11y axe scan, Lighthouse baseline, and visual screenshots pending before `ready-for-tech`.

## Pre-handover gate (mark as you pass each)
- [x] `pnpm install` from clean clone boots
- [ ] Lint clean
- [ ] Build succeeds
- [x] Mock data extracted to `src/lib/mock-data.ts` w/ TODO markers
- [ ] TS strict mode on (or exception documented)
- [ ] A11y axe scan: 0 critical violations
- [ ] Lighthouse mobile ≥85 perf / ≥95 a11y / ≥95 best-practices
- [ ] `prefers-reduced-motion` honored
- [x] `README.md` complete
- [x] `HANDOVER.md` complete
- [ ] Visual baseline (gstack screenshots) captured
- [ ] Conventional commits in git log

## Open issues (won't fix in design phase)
- No `.nvmrc` / no `tsconfig.json` strict flag check: defer lint/TS audit to QA pass
- `industries.tsx` uses JSX icons inline (React elements in data file): cannot move to plain `.ts` without refactor — defer to tech for icon-system decoupling
- Figma Make original exports (`src/imports/`, ~50 SVG/container files): archived to `_dev-notes/imports-FIGMA-EXPORTS/`. Only `LogoContainer.tsx` is still live (used by auth + mobile menu). Tech team must replace with proper SVG import or DS Logo component.
- `ServicesDropdown.tsx`, `ResourcesDropdown.tsx`, `PushMenuGoldStandard.tsx` removed from src — archived in `_dev-notes/` if needed for reference.
- `package.json` name is `@figma/my-make-file` (Figma Make scaffold artifact): tech team should rename to `@kenresearch/topnav` before publishing.
- Auth is in-memory prototype only — no persistence, no real backend wiring.

## Versioning notes
- This is version `v32`. Folder name encodes version.
- Next iteration → copy to `topnav-v33/`, do not edit this folder after handover.
