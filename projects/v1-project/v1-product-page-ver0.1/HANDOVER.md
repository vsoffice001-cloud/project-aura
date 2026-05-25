# HANDOVER — reports-pdp-v2

**For:** Tech team
**From:** Design team (Aura-assisted)
**Date:** 2026-05-15
**Version:** Phase 4 (3 sample pages + PDP template complete)

## TL;DR

Next.js 15 · React 19 · Tailwind v4 consumer with 5 routes. 3 fully-built sample pages (/sample · /case-study · /report-store-listing) + landing (/) + dynamic PDP template (/reports/[slug]). DS consumed from `design-system/core-v2/` via `transpilePackages`. TS exit 0 · build clean · Lighthouse a11y ≥95 on sample pages. P1 backlog is non-blocking — documented below.

## Run locally

```bash
pnpm install
pnpm dev      # → http://localhost:3001
pnpm build    # TS + Next build · exit 0
pnpm start    # production preview
pnpm test     # Playwright suite at tests/
```

Prod build live at `http://localhost:3001` until tech takes over.

## Stack

- **Framework:** Next.js 15 · React 19 · Tailwind v4
- **Package manager:** pnpm 10.33.0 · Node 20+
- **DS dependency:** `@kenresearch/design-system` from `design-system/core-v2/` (workspace · `transpilePackages`)
- **Animation:** Framer Motion ONLY (no GSAP · no Lenis · dev-team parity 2026-05-08)
- **Tokens:** CSS custom props from `design-system/tokens/build/tokens.css`
- **UI primitives:** shadcn/ui via `@kenresearch/design-system/ui`

## Routes shipped

| Route | Page | Sections | Variant | Notes |
|---|---|---|---|---|
| `/` | Landing | — | editorial-light | Redirects / intro |
| `/sample` | Report PDP | 14 | Cinematic-dark hero · editorial-light body | 12 body chapters + final CTA |
| `/case-study` | Acme Logistics case-study | 10 | Editorial-light | Case-study recipe |
| `/report-store-listing` | RS listing | 11 | Editorial-light | Sidebar filter + grid |
| `/reports/[slug]` | Dynamic PDP | template | — | Template wired · empty data · tech fills backend |

## Mock data inventory

All mock data in `src/lib/mock-data.ts`. Replace strategy: tech wires real API calls per `// TODO: replace w/ real API` markers.

| Page | TODO marker count | Notes |
|---|---|---|
| `/sample` | 6 | Report metadata · pricing · chapters · related reports |
| `/case-study` | 4-7 | Client data · impact metrics · testimonial · resources |
| `/report-store-listing` | 5+ | Report cards · filter options · pagination · featured |

No inline mock data on page files — all centralized per handover gate rule.

## DS docs (MANDATORY READ before touching DS layer)

| Doc | Path | Purpose |
|---|---|---|
| FOUNDATIONS.md | `design-system/core-v2/docs/FOUNDATIONS.md` | ~500 tokens · 6 categories · unlayered `:root` |
| RULES.md | `design-system/core-v2/docs/RULES.md` | 90 hard rules · 10 sections · WWWWH per rule |
| COMPOSITION_GRAMMAR.md | `design-system/core-v2/docs/COMPOSITION_GRAMMAR.md` | Use-case grammar · MANDATORY READ before any organism change |

## Token discipline

0 hardcoded hex on consumer pages (verified 2026-05-15). All colors via `var(--color-*)`, spacing via `var(--space-*)`.

## Bg alternation (important — not mechanical)

Post `core-v2/docs/RULES.md` R1.5 (white-dominant rule): §1-§7 all white. This is deliberate, not a bug. Documented in RULES.md. Do not apply mechanical alternation.

## Open P1 backlog (NOT blocking ship)

These are deliberate design-phase deferrals. None block tech intake.

| Item | Detail | Priority |
|---|---|---|
| StatCard count-up animation | Restored via `animate` prop · live now · motion design call documented | P1 |
| §11 mobile methodology timeline connector | Hidden on mobile · organism responsive choice · acceptable | P1 |
| case-study heading-order H1→H3 | 1 pre-existing color-contrast issue · Lighthouse a11y P1 | P1 |
| ReportCard nested-interactive | axe warning · design-call item · not critical | P1 |
| SlideshowSection + SampleReportPreview NOT ported | Architecture fork: /sample is 14-section PDP not legacy 6-section marketing. Design-call needed if porting later | P1-architecture |
| /reports/[slug] empty data | Template wired · tech fills backend · route renders correctly with empty state | P1-backend |

## A11y baseline

- WCAG: AA target
- Lighthouse a11y ≥95 on `/sample` · `/case-study` · `/report-store-listing` (2026-05-15)
- `prefers-reduced-motion` honored via Framer `useReducedMotion()` + CSS `@media (prefers-reduced-motion: reduce)` global

## Animation rules

- **Framer Motion ONLY** — state · component · scroll-driven
- **Scroll-driven:** `useScroll` + `useTransform` for parallax · `useInView` for entrance triggers
- **Smooth scroll:** native CSS `html { scroll-behavior: smooth }` via DS `base.css`
- **Reduced motion:** `useReducedMotion()` MANDATORY in JS components

## Tech-team integration checklist

- [ ] Match Node 20+ (`.nvmrc` at workspace root)
- [ ] Match pnpm 10.33.0 (`packageManager` in `package.json`)
- [ ] Wire real API for `/reports/[slug]` dynamic route
- [ ] Replace mock data per `// TODO: replace w/ real API` markers in `src/lib/mock-data.ts`
- [ ] Wire NextAuth for gated routes (if needed)
- [ ] Run Playwright suite (`pnpm test`) against real data
- [ ] Re-run Lighthouse a11y after any DS or page changes
- [ ] Address P1 backlog items per priority (above)
- [ ] Read DS docs before touching DS layer (FOUNDATIONS · RULES · COMPOSITION_GRAMMAR)

## Contact

Design lead: design@kenresearch.com (Aura-assisted)
