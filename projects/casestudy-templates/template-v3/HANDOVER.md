# HANDOVER — template-v3

> **EXPLORATION TEMPLATE — for reference only. Tech intake should treat as low-priority artifact until status flips to `cleanup` or `ready-for-tech`.**

**For:** Tech team
**From:** Design team (Aura-assisted)
**Date:** 2026-04-30
**Version:** v3 (exploring)

---

## TL;DR

Vite + React exploration template with 5 case-study layout variants (A–E) switchable at runtime. Design reference only — not production-ready. Do not integrate until status is `ready-for-tech`.

## Run locally

```bash
pnpm install
pnpm dev   # → http://localhost:5173
```

Boot confirmed at `localhost:5199` (port override tested 2026-04-30; default Vite port is 5173).

## Build

```bash
pnpm build
# No pnpm start script — static output only
```

## Stack

- Framework: Vite 6 + React 18
- Tailwind: v4 (`@tailwindcss/vite`)
- Animation: `motion` v12 (Framer Motion v12 tree-shaking export — **not** `framer-motion` package)
- UI primitives: Radix UI (full set) + MUI icons + custom shadcn-style components
- Other: `react-dnd`, `embla-carousel-react`, `recharts`, `sonner`, `cmdk`, `vaul`, `react-hook-form`
- Package manager: pnpm 10 (enforced via `packageManager` field + engines)

## Route map

| Route | Page | Purpose | Mobile? |
|---|---|---|---|
| `/` | App | 5-variant case-study switcher (A–E) | Unknown — not audited |

## Components

Located: `src/app/components/`

| Component | Notes |
|---|---|
| `TemplateA–E` | 5 layout variants, selectable via `VariantSwitcher` |
| `HeroSection`, `ChallengesSection`, `ImpactSection`, etc. | Shared section components |
| `Navbar`, `MegaMenu`, `StickyCTA`, `ReadingProgressBar` | Navigation layer |
| `ContactModal`, `SearchModal` | Overlays |
| `ResourceCard`, `Badge`, `Button`, `FrostedCard`, `Container` | Primitives |
| `DealTombstoneRail` | Finance-specific display |
| `BackgroundHighlight`, `InlineLink` | Visual helpers |

`_dev-notes/App.backup.tsx` — stale backup, not imported anywhere.

## Mock data

- `src/app/data/caseStudyContent.ts` — inline mock content
- No `src/lib/mock-data.ts` extraction done (deferred — exploration status)
- No `// TODO: replace w/` markers present yet

## Env vars

None required to run locally.

## Known issues / won't-fix (exploration phase)

- `package.json` name is `@figma/my-make-file` — Figma Make scaffolding artifact; rename before real handover
- `motion` package (v12) used instead of canonical `framer-motion` — confirm pattern alignment with ken-v1 before promoting
- No lint script in `package.json` — only `dev` and `build`
- No TypeScript strict mode audit done
- No a11y scan
- No Lighthouse baseline
- `_dev-notes/STALE-TECHNICAL_HANDOVER.md` contains outdated v1.0 handover notes for a previous iteration

## A11y baseline

Not audited — exploration status. Run axe before promoting.

## Perf baseline

Not measured — exploration status.

## Visual baseline

Not captured — exploration status.

## Brand tokens

No Ken Research brand tokens wired. Uses `default_shadcn_theme.css` + inline Tailwind classes. Migration to Ken v26 tokens required before any production use.

## Animation rules

Uses `motion` (Framer Motion v12 tree-shaking export). Ken v26 standard is:
- GSAP + `@gsap/react` for scroll/timelines
- Framer Motion for state/component motion
- Lenis for smooth scroll

Align to those rules during cleanup pass.

## Tech-team integration checklist (deferred until `cleanup`)

- [ ] Rename `package.json` `name` field
- [ ] Add lint script
- [ ] Match Node/pnpm versions
- [ ] Wire Ken v26 brand tokens
- [ ] Extract mock data with replace markers
- [ ] A11y axe scan
- [ ] Lighthouse mobile baseline
- [ ] `prefers-reduced-motion` audit

## Contact

Design lead: design@kenresearch.com (Aura-assisted)
