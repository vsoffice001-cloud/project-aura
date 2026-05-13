# HANDOVER — ken-research-about

**For:** Tech team
**From:** Design team (Aura-assisted)
**Date:** 2026-04-30
**Version:** v1 (exploration)

> ⚠ EXPLORATION ARTIFACT — static HTML mock. Tech intake should treat as low-priority reference until status flips to `cleanup` or `ready-for-tech`.

## TL;DR
About-Us page mock for Ken Research. Vanilla HTML/CSS/JS with GSAP scroll animations + WebGL canvas background overlay. No build step required.

## Run locally
```bash
# Option 1 — open directly in browser:
open index.html

# Option 2 — local server (recommended for testing module behavior):
python3 -m http.server 8080
# → http://localhost:8080
```

## Build
None — no build step, no bundler. Files served as-is.

## Stack
- Framework: vanilla HTML5
- Styling: CSS3 (custom, no preprocessor)
- JS: ES6+ vanilla
- Animation: **GSAP 3** (loaded via CDN — verify CDN refs in `index.html`)
- Effects: custom cursor + WebGL canvas (likely Three.js or shader, check `main.js`)

## Route map
Single page. Sections via in-page anchors:
| Anchor | Section | Purpose |
|---|---|---|
| `#story` | Our Story | Company history since 2011 |
| `#stats` | Intelligence | Stat counters / KPIs |
| `#global` | Global Reach | Geographic footprint |
| `#leadership` | Leadership | Team profile cards (Ankur, Avdhesh, Namit) |
| `#cta` | Connect With Experts | Contact CTA |

## Components
N/A — single-file HTML. Sections defined inline.

## Mock data
- Content baked into `index.html` (text + section structure).
- 3 team photos in PNG: `ankur.png`, `avdhesh.png`, `namit.png` (~2 MB total).
- Replace strategy: tech team to wire CMS / data layer if dynamic content needed.

## Env vars
None.

## Known issues / won't-fix (design-phase)
- Custom cursor (`#custom-cursor` + `#cursor-follower`) — accessibility/touch concern. Tech to decide keep/strip.
- WebGL canvas overlay — perf cost on mobile (GPU + battery).
- No `prefers-reduced-motion` guard on GSAP animations. Tech: add `gsap.matchMedia()` reduced-motion variant before ship.
- 3 PNG photos at full quality — convert to WebP/AVIF + responsive `<picture>` before prod.
- No semantic HTML5 landmarks audit — verify `<main>`, `<nav>` ARIA roles, heading hierarchy before ship.
- GSAP loaded via CDN — tech to decide self-host or pin version in production.
- No favicon.

## A11y baseline
- WCAG: pending — full pass required (axe-core, kbd nav, screen reader)
- Custom cursor likely fails WCAG 2.1 AA on pointer cancellation
- Reduced-motion: not honored

## Perf baseline
- Pending — Lighthouse mobile not yet run.
- Likely issues: 2MB image weight, WebGL overhead, custom cursor JS on every mouse move.

## Visual baseline
- Pending — gstack screenshots not yet captured.

## Brand tokens
- Cinematic dark variant — matches ken-v1.
- All colors hard-coded in `style.css` — does NOT consume workspace `Quick_start_guide.md` tokens.
- Pre-handover task: tech to swap hard-coded values for CSS vars matching prod theme.

## Animation rules
- GSAP for scroll animations.
- No Framer Motion (vanilla project).
- **TODO** before prod: `gsap.matchMedia()` reduced-motion guard.

## Tech-team integration checklist
- [ ] Decide: keep static or migrate to Next.js as `app/about/page.tsx`
- [ ] If migrating: extract sections as React components, wire to design system tokens
- [ ] Reduced-motion guard on all GSAP timelines
- [ ] Convert PNG photos → WebP/AVIF responsive `<picture>`
- [ ] Self-host GSAP or pin version (no CDN in prod)
- [ ] Touch/keyboard alternative for custom cursor
- [ ] WebGL canvas — confirm shader source, license, perf budget
- [ ] Wire analytics (GTM, Clarity, Leadfeeder, Crazy Egg, Contentsquare) per prod
- [ ] Add favicon
- [ ] Re-run a11y + perf gates against CI

## Contact
Design lead: design@kenresearch.com (Aura-assisted)
