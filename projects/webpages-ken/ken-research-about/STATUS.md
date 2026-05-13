# STATUS — ken-research-about

**Status:** `exploring`
**Owner (current):** design
**Last review:** 2026-04-30
**Reviewer:** Aura (Opus main)

## Current state
Static About-Us page mock for Ken Research. Vanilla HTML/CSS/JS w/ GSAP scroll animations + WebGL canvas background. No build step. 3 team-photo PNGs (~2MB total). Phase 3 light cleanup: STATUS + HANDOVER + README scaffolded; no code touched.

## Pre-handover gate (mark as you pass each)
- [ ] `pnpm install` from clean clone boots — N/A (no build, vanilla HTML)
- [ ] Lint clean — N/A (no lint configured)
- [ ] Build succeeds — N/A (no build)
- [ ] Mock data extracted — N/A (content baked into HTML)
- [ ] TS strict mode on — N/A (no TS)
- [ ] A11y axe scan: 0 critical — pending
- [ ] Lighthouse mobile ≥85/95/95 — pending
- [ ] `prefers-reduced-motion` honored — pending (GSAP animations need `gsap.matchMedia()` guard)
- [ ] `README.md` complete — ✓
- [ ] `HANDOVER.md` complete — ✓
- [ ] Visual baseline (gstack screenshots) captured — pending
- [ ] Conventional commits in git log — N/A (no git history yet)

## Open issues (won't fix in design phase)
- **Custom cursor** (`#custom-cursor` + `#cursor-follower`) → tech-team decision: keep for cinematic feel or strip for accessibility/touch.
- **WebGL canvas** (`#webgl-canvas`) → flag for perf review (mobile GPU cost, battery).
- **No reduced-motion guard** on GSAP animations.
- **Image weight** — 3 PNG photos total ~2MB. Convert to WebP/AVIF before prod.

## Versioning notes
- Version 1, no prior. Static page, exploration-phase mock.
- If iteration → copy folder to `ken-research-about-v2/`, never edit this folder after handover.
