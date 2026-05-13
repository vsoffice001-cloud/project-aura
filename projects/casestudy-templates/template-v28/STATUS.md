# STATUS — template-v28

**Status:** `exploring`
**Owner (current):** design
**Last review:** 2026-04-30
**Reviewer:** Aura

## Current state

Vite + React 18 case study template. Figma Make origin (`@figma/my-make-file` package name). Single-page case study layout (YASH transformer bushing market / IPO readiness). 22 components. Uses `motion` (v12, not `framer-motion`). No animation library other than CSS/inline motion. Boot-verified: HTTP 200 on localhost:5178. Exploration reference only — design patterns and component variants are the value here, not the code quality.

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

- Reference/exploration template — not a primary handover target until status flips to `cleanup`. No gate checks required until then.
- `@figma/my-make-file` package name is a Figma Make artifact; must be renamed before any real handover.
- Mock data is inline in `App.tsx`; not extracted.
- No lint config present.
- No TypeScript strict mode configured.

## Versioning notes

- This is version `28`. Previous versions archived.
- Next iteration → copy to `template-v29/` (or promote to `ken-v2/`), do not edit this folder after handover.
