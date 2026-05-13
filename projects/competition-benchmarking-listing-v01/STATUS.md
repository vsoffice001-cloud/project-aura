# STATUS — competition-benchmarking-listing-v01

**Status:** `exploring`
**Owner (current):** design
**Last review:** 2026-05-06
**Reviewer:** Aura (aura-builder Sonnet)

## Current state

Competition Benchmarking listing page for Ken Research — Vite + React SPA. Renders: black hero banner (no image, GSAP fade-up, stats row), 2-col body (280px desktop sidebar with faceted filters + masonry card grid), progressive load (12+12 per scroll), URL-synced filters (debounced 300ms), mobile filter sheet with focus trap, sticky active-filter bar (intersection observer), TrendingTopics, Testimonials, and custom research CTA. Editorial light variant throughout (warm white bg, black text, Ken red CTA only). All 24 mock benchmark entries seeded in `src/lib/mock-data.ts`.

Build: `pnpm build` — clean. Dev: `pnpm dev` — starts on next free port from 5173.

## Pre-handover gate (mark as you pass each)

- [x] `pnpm install` from clean clone boots
- [ ] Lint clean — no ESLint config in this project (inherited from Figma Make scaffold)
- [x] Build succeeds — `pnpm build` ✓
- [x] Mock data extracted to `src/lib/mock-data.ts` with `// TODO: replace w/ real API` markers
- [ ] TS strict mode on (or exception documented) — no tsconfig; Vite transpile-only
- [ ] A11y axe scan: 0 critical violations
- [ ] Lighthouse mobile ≥85 perf / ≥95 a11y / ≥95 best-practices
- [x] `prefers-reduced-motion` honored — GSAP matchMedia + CSS card-reveal class
- [x] `README.md` complete
- [x] `HANDOVER.md` complete
- [ ] Visual baseline (gstack screenshots) captured
- [ ] Conventional commits in git log

## Open issues (won't fix in design phase)

- **No ESLint config:** Inherited from Figma Make scaffold. Tech team to add ESLint + Prettier on intake.
- **No tsconfig:** Vite transpile-only (no tsc type-check in build). Tech team to add strict tsconfig.
- **Optional peer deps (react/react-dom):** Declared as peerDependencies with optional flag. Move to dependencies on tech intake.
- **`react-responsive-masonry` not installed:** Not used — spec called for it but native CSS grid masonry suffices with current data. Pure CSS 3-col grid used instead.
- **Unsplash images:** Dev URLs. Replace with Ken Research CDN on production.
- **`/research/competition-benchmarking/methodology` href:** Hero "How we benchmark" link is placeholder href. Wire to real page.
- **`/contact` href:** Custom research CTA links to `/contact`. Wire to real CRM form.
- **A11y baseline:** Not yet run.
- **Visual baseline:** gstack screenshots not yet captured.

## Versioning notes

- This is version `01`. First build of this page type.
- Next iteration → copy to `competition-benchmarking-listing-v02/`, do not edit this folder after handover.
