# STATUS — reports-pdp-v2

**Status:** `ready-for-tech`
**Owner (current):** design (handing) → tech-team
**Last review:** 2026-05-15
**Reviewer:** Aura

## Current state

Next.js 15 · React 19 · Tailwind v4 consumer. PRD-driven rebuild of Ken Research Reports PDP. 5 routes shipped (4 static + 1 dynamic). DS dependency: `@kenresearch/design-system` from `design-system/core-v2/` via `transpilePackages`.

**Build status:** TS exit 0 · `pnpm build` exit 0 · 5 routes prerendered.

**Routes shipped:**
- `/` — landing
- `/sample` — Report PDP · 14 sections · cinematic hero + 12 body chapters + final CTA
- `/case-study` — Acme Logistics · 10-section case-study recipe
- `/report-store-listing` — RS listing · 11 sections · sidebar filter + grid
- `/reports/[slug]` — dynamic · template ready · empty data (tech wires backend)

**Lint status:** not run · ESLint not gated in this phase.

**Test status:** tests excluded from compile · Playwright suite present at `tests/`.

**A11y status:** Lighthouse ≥95 on 3 sample pages (/sample · /case-study · /report-store-listing). 1 pre-existing color-contrast issue in case-study heading hierarchy (P1 backlog · non-blocking).

**Mock data:**
- `/sample` — 6 `// TODO: replace w/ real API` markers in `src/lib/mock-data.ts`
- `/case-study` — 4-7 `// TODO: replace w/ real API` markers
- `/report-store-listing` — 5+ `// TODO: replace w/ real API` markers

**Last design touch:** 2026-05-15
**Sign-off:** design (Aura) · awaiting tech intake

## Pre-handover gate

- [x] `pnpm install` from clean clone boots cleanly
- [ ] Lint clean — not run · not gated in this phase
- [x] Build succeeds — TS exit 0 · `pnpm build` exit 0 · 5 routes
- [x] Mock data isolated to `src/lib/mock-data.ts` w/ `// TODO: replace w/ real API` markers
- [x] TypeScript strict mode on
- [x] A11y axe: Lighthouse a11y ≥95 on 3 sample pages (2026-05-15)
- [x] `prefers-reduced-motion` honored (Framer `useReducedMotion()` + CSS global fallback)
- [x] `README.md` present
- [x] `HANDOVER.md` present
- [x] Visual QA baseline on key pages
- [ ] Conventional commits — deferred · tech commits on intake

## Open P1 backlog (non-blocking · documented in HANDOVER.md)

- StatCard count-up animation (motion design call · live now via animate prop)
- §11 mobile methodology timeline connector hidden (organism responsive choice)
- 4 a11y items: case-study heading-order H1→H3 · ReportCard nested-interactive · design-call items
- SlideshowSection + SampleReportPreview NOT ported (architecture fork · see HANDOVER.md)
- Bg alternation post-R1.5: §1-§7 all white per white-dominant rule (documented · not a bug)

## Versioning notes

- Predecessor: `projects/reports-pdp-v1/` DELETED 2026-05-11. Recoverable from git.
- Next iteration → copy to `reports-pdp-v3/`. Never edit this folder post-handover.
