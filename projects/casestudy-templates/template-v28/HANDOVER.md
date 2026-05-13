# HANDOVER — template-v28

> WARNING: EXPLORATION TEMPLATE — for reference only. Tech intake should treat as low-priority artifact until status flips to `cleanup` or `ready-for-tech`.

**For:** Tech team
**From:** Design team (Aura-assisted)
**Date:** 2026-04-30
**Version:** exploring / pre-handover

## TL;DR

Vite + React 18 case study template (YASH transformer bushing / IPO readiness). Figma Make origin — useful as a component/layout reference for ken-v1. Not production-ready; all gate checks deferred until status flips to `cleanup`.

## Run locally

```bash
pnpm install
pnpm dev   # → http://localhost:5178/
```

## Stack

- Framework: Vite 6.3.5
- React: 18.3.1 (peer dependency)
- Tailwind: v4 (via `@tailwindcss/vite`)
- Animation: `motion` v12.23.24 (Framer Motion rebranded package — NOT `framer-motion`)
- UI primitives: Radix UI (full suite) + MUI v7 + shadcn-style components
- Other: react-dnd, recharts, embla-carousel, react-day-picker, cmdk, sonner, vaul, react-hook-form

## Route map

| Route | Page | Purpose | Mobile? |
|---|---|---|---|
| `/` | App | Single-page case study (YASH) | unknown — not audited |

## Components

Located: `src/app/components/`

| Component | Status | Notes |
|---|---|---|
| HeroSection | done | enableVariantSwitcher prop |
| ClientContextSection | done | — |
| ChallengesSection | done | array prop |
| EngagementObjectivesSection | done | array prop |
| MethodologySection | done | array prop |
| ImpactSection | done | metrics array |
| ClientEndorsementSection | done | variant + enableVariantSwitcher |
| FinalCTASection | done | variant + enableVariantSwitcher |
| ResourcesSection | done | cardStyle prop |
| Navbar | done | search + contact callbacks |
| ReadingProgressBar | done | — |
| StickyCTA | done | contact callback |
| ContactModal | done | controlled open/close |
| SearchModal | done | controlled open/close |
| Badge, Button, Container, BackgroundHighlight, FrostedCard, InlineLink | done | primitives |
| SubtleVariantSwitcher | done | dev/exploration UI only |
| MegaMenu | done | — |
| ResourceCard | done | — |

Hooks: `src/app/hooks/` — useActiveSection, useCounter, useHeroVisibility, useMagneticEffect, useReadingProgress, useResponsiveGutter, useScrollAnimation, useScrollDirection, useSectionProgress.

## Mock data

- Location: inline in `src/app/App.tsx` (challenges, engagementObjectives, methodologySteps, impactMetrics arrays)
- Not extracted — deferred to cleanup phase
- Replace strategy: extract to `src/lib/mock-data.ts` with `// TODO: replace w/ real API` markers

## Env vars

None configured. No `.env.example`.

## Known issues / won't-fix (exploration phase)

- `@figma/my-make-file` package name is a Figma Make artifact — must be renamed to proper package name before handover
- Mock data inline in App.tsx — not extracted
- No lint config — `pnpm lint` has no script defined
- No TypeScript strict mode — no `tsconfig.json` strict flag visible
- `App.backup.tsx` moved to `_dev-notes/` (was near-duplicate of App.tsx)
- All stale internal docs moved to `_dev-notes/`
- `motion` package (v12) used — this is the rebranded Framer Motion; no `framer-motion` import found
- `vite.config.ts` includes `figmaAssetResolver` plugin for Figma Make asset resolution
- Radix + MUI both present — heavy bundle; not audited

## A11y baseline

- Not audited (exploration status)
- WCAG: unchecked
- Reduced-motion: unchecked

## Perf baseline

- Not audited (exploration status)

## Visual baseline

- Boot verified: HTTP 200 on localhost:5178

## Brand tokens

- Source: no Ken Research token file; uses inline Tailwind + MUI theming
- Not aligned to `globals.css @theme {}` tokens from ken-v1

## Animation rules

- Uses `motion` v12 (Framer Motion rebranded). No GSAP. No Lenis.

## Tech-team integration checklist

- [ ] Rename package (`@figma/my-make-file` → proper name)
- [ ] Match Node version ≥20 (no `.nvmrc`)
- [ ] Match pnpm ≥10 (`packageManager: pnpm@10.33.0`)
- [ ] Extract mock data from App.tsx
- [ ] Add lint config if promoting to cleanup
- [ ] Align brand tokens to Ken Research `globals.css` if porting patterns to ken-v1
- [ ] Audit MUI + Radix bundle overlap; prune unused

## Contact

Design lead: design@kenresearch.com (Aura-assisted)
