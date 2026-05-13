# HANDOVER — V0 Lite Report

**For:** Tech team
**From:** Design team (Aura-assisted)
**Date:** 2026-05-08
**Version:** 0.1.0 (scaffold — NOT ready for handover yet, status: cleanup)

## TL;DR

Next.js 15 App Router port of `V0_lite_report-legacy/` (Vite SPA). Consumes `@kenresearch/design-system` workspace package. Tech team wires backend `/api/reports/<slug>`, replaces mock data, and connects auth/analytics.

## Run locally
```bash
pnpm install
pnpm dev   # → http://localhost:3000
```

## Build
```bash
pnpm build
pnpm start  # production preview
```

## Stack
- Framework: Next.js 15 App Router
- React: 19
- Tailwind: v4 + @tailwindcss/postcss
- Animation: GSAP + Framer Motion + Lenis
- UI primitives: @kenresearch/design-system (workspace) + shadcn/ui
- Other: highcharts, lucide-react, @faker-js/faker, msw

## Route map
| Route | Page | Purpose | Mobile? |
|---|---|---|---|
| `/` | Home | Lite report full-page view (all sections stacked) | ✓ |

## Components
Located: `src/app/` (App Router layout + page) + `src/components/` (populated in Phase C steps 6-11)
| Component | File | Status | Notes |
|---|---|---|---|
| RootLayout | `src/app/layout.tsx` | done | Cookie-read variant, DS CSS imports, Noto Serif + DM Sans |
| LenisProvider | `src/app/lenis-provider.tsx` | done | Client component, reduced-motion respected |
| HomePage | `src/app/page.tsx` | scaffold | Placeholder — replaced in Phase C |

## Mock data
- Location: `src/lib/mock-data.ts`
- Markers: every mocked field has `// TODO: replace w/ real API (Django /api/reports/<slug>)` comment
- Replace strategy: `liteReport.hero` → `fetch(/api/reports/${slug})` then shape to typed interfaces

## Env vars
| Var | Purpose | Required? | Example |
|---|---|---|---|
| `NEXT_PUBLIC_API_URL` | Django backend base | yes | `http://localhost:8000` |

`.env.example` — add before Phase C step 6.

## Known issues / won't-fix
- Component port incomplete: all sections being migrated from legacy per A1 audit.
- DS atoms co-developed in Phase C: consumers may need `pnpm install` refresh as DS publishes.

## A11y baseline
- WCAG: AA (target)
- Tested via: `pnpm test` (Playwright + axe-core) — not yet run (scaffold stage)
- Reduced-motion: honored in LenisProvider

## Perf baseline
- Not yet measured (scaffold stage)

## Visual baseline
- Not yet captured (scaffold stage)

## Brand tokens
- Source: `@kenresearch/design-system/styles/editorial-light.css` (default) + `cinematic-dark.css` (opt-in)
- Quick ref: `<workspace>/Quick_start_guide.md`

## Animation rules
- GSAP for scroll/timeline; Framer for state/component motion; never both on same property
- Always honor `prefers-reduced-motion`

## Tech-team integration checklist
- [ ] Match Node version (`.nvmrc` at workspace root — Node 20.20.1)
- [ ] Match pnpm version (`packageManager: pnpm@10.33.0`)
- [ ] Wire backend env (`NEXT_PUBLIC_API_URL` etc.)
- [ ] Replace mock data calls (search `// TODO: replace w/`)
- [ ] Wire NextAuth if auth needed (design didn't ship auth)
- [ ] Wire analytics (GTM, GA, Clarity, Leadfeeder, Crazy Egg, Contentsquare per prod)
- [ ] Re-run a11y + perf gates against your CI

## Contact
Design lead: design@kenresearch.com (Aura-assisted)
