# STATUS — template-v3

**Status:** `exploring`
**Owner (current):** design
**Last review:** 2026-04-30
**Reviewer:** Aura

## Current state

Vite + React reference template featuring 5 case-study layout variants (A–E) with a live switcher. Built against Tailwind v4, Radix UI, shadcn-style primitives, MUI icons, and the `motion` package (not `framer-motion`). Used as design exploration / reference artefact. Not a primary deliverable — full cleanup deferred until status flips to `cleanup`.

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

- Reference/exploration template — not a primary handover target until status flips to `cleanup`.
- `package.json` name is `@figma/my-make-file` (Figma Make scaffolding artifact) — rename before real handover.
- Animation uses `motion` (Framer Motion v12 tree-shaking export), not `framer-motion` directly — verify compatibility if migrating to ken-v1 patterns.
- `App.backup.tsx` and stale `TECHNICAL_HANDOVER.md` moved to `_dev-notes/` — review before any cleanup pass.

## Versioning notes

- This is version `3`. Previous exploration artefact. If promoted, copy to `template-v4/` — do not edit this folder after handover.
