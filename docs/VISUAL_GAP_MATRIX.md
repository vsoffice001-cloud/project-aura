# Visual Gap Matrix — ken-v1 ↔ DS-v26 ↔ DS-Dashboard

**Captured:** 2026-05-01  
**Method:** gstack (headless Chromium) screenshots — 1440×900 desktop + 390×844 mobile  
**Servers:** ken-v1 :3000 · DS-v26 :5173 · DS-Dashboard :5174  
**Purpose:** Side-by-side visual comparison to identify token drift, hierarchy gaps, and component alignment issues before Phase 2 DS evolution work.

---

## Surface Overview

| Dimension | ken-v1 (Cinematic Dark) | DS-v26 (Editorial Light) | DS-Dashboard (Editorial Light) |
|---|---|---|---|
| **Surface** | Production case-study template | DS component library (canonical) | DS documentation + live demos |
| **Background** | `#0a0a0c` near-black, continuous canvas | `#ffffff` / barely-warm white panels | Same as DS-v26 + one full-bleed dark section |
| **Text primary** | `#FAFAFA` | `#000000` | `#000000` |
| **Font display** | Noto Serif, 800–900 weight | Noto Serif, standard weight | Noto Serif, standard weight |
| **Font body** | DM Sans | DM Sans | DM Sans |
| **Hero scale** | `clamp(4rem, 9vw, 9rem)` — massive cinematic | ~48px (`--text-3xl`) standard | Same as DS-v26 |
| **Spacing feel** | Ultra-generous — 200–300px between sections | Editorial-dense — comfortable gutters | Slightly denser — docs tool |
| **Motion** | GSAP scroll reveals + Framer micro + Lenis smooth | Minimal / none visible | Minimal / none visible |
| **Overall quality** | 9/10 cinematic | 8/10 editorial | 8.5/10 richer content |

---

## Token Alignment

### Color

| Token / Usage | ken-v1 | DS-v26 | DS-Dashboard | Gap |
|---|---|---|---|---|
| Background base | `#0a0a0c` — correct dark variant | `#ffffff` — renders white, not warm `#f5f2f1` | Same, white | **DS background token not applied to `<body>`** — `#f5f2f1` specified but page body renders white |
| Ken Red CTAs | ✓ — small pill badge + CTA button only | ✓ — "Get Started" only | ✓ — "Get Started" + brand button in component demos | Both DS surfaces correct |
| Ken Red decorative | Red radial bloom glow in lower page | None | None | ken-v1 uses red as ambient glow — strictly this is decorative, not CTA. Brand-bending but intentional cinematic choice |
| Purple accent | Purple glow blob (subtle, left side) | Not visible | Not visible | ken-v1 uses purple; DS surfaces don't show it prominently in overview |
| Teal accent | Teal progress bar top-of-page | Not used | Not used | ken-v1 only — teal `#00e5ff` on scroll progress bar. Not in DS token set. Potential undocumented token drift |
| "Transformation" word | Rendered in non-white gradient/accent color | N/A | N/A | ken-v1 applies chromatic gradient to single inline word in heading. Sophisticated but undocumented pattern |
| Blue "View on GitHub" button | Not present | **Blue CTA in nav — off-brand** | **Blue CTA in nav — off-brand** | Both DS surfaces have blue interactive element at top-right. Breaks Ken red-only CTA discipline. Needs fix or explicit exception |
| Blue button variant | Not present | Not present | "Simple Blue" variant documented in Button component | DS-Dashboard documents a blue button variant. Not in DS-v26. Potential system drift or undocumented surface-specific variant |

### Typography

| Token / Usage | ken-v1 | DS-v26 | DS-Dashboard | Gap |
|---|---|---|---|---|
| Hero h1 size | `clamp(4rem, 9vw, 9rem)` — far exceeds `--text-3xl` (48.8px) | `--text-3xl` 48.8px standard | Same | ken-v1 hero intentionally oversized — cinematic display, not system token. Undocumented exception. |
| Section h2 | `2.441rem` ~39px — matches `--text-2xl` | `--text-2xl` 39px | Same | ✓ Aligned |
| Body text | `1rem` 16px | `1rem` 16px | Same | ✓ Aligned |
| Label/eyebrow | `--text-xs` 12.8px | `--text-xs` 12.8px | Same | ✓ Aligned |
| Font weights | Noto Serif 800–900 for hero | Noto Serif standard (400–700) | Same as DS-v26 | ken-v1 pushes display weight heavier than DS norm — intentional cinematic voice |
| Italic accent word | "Transformation" rendered italic + chromatic | Not used | Not used | ken-v1 uses italic + gradient-coloured inline word as accent — not a DS pattern, unique to cinematic variant |

### Spacing

| Dimension | ken-v1 | DS-v26 | DS-Dashboard | Gap |
|---|---|---|---|---|
| Section vertical padding | ~200–300px (8–12rem) | ~60–80px (4–5rem) | ~60–80px | ken-v1 intentionally 3–4× more spacious — cinematic pacing. Not a bug. |
| Card gutters | `gap-6` (24px) | Consistent gutters, similar | Same | ✓ Aligned |
| Container width | `--container-page` 1200px used | `--container-page` 1200px | Same | ✓ Aligned |

---

## Component Gaps

| Component | ken-v1 | DS-v26/Dashboard | Gap / Action |
|---|---|---|---|
| **Button** | Inline styled pill + ghost CTAs | Full system: 4 variants × 5 sizes, always-active shimmer | ken-v1 buttons lack shimmer brand signature. Phase 3: consume DS Button |
| **Nav** | Fixed top, minimal — "KEN" red badge + small all-caps links | Left sidebar in DS, collapsible | Different nav paradigm — correct for surface. No alignment needed |
| **Cards** | Inline card patterns per section | DS Card v4.0 (3 variants, ref-based hover, `as` prop) | ken-v1 has no reusable Card — parallel impl. Phase 3: consume DS Card |
| **Stats/Metrics** | 3-column `0%` counters (mock data showing) | StatCard molecule in DS | Different visual approach — DS StatCard is horizontal molecule; ken-v1 stats are display-scale counters. APIs differ. |
| **Section headings** | Inline heading markup | DS SectionHeading v4.0 (prop-based API) | Parallel. ken-v1 should consume DS SectionHeading in Phase 3 |
| **Progress bar** | Teal scroll progress bar (top) | ReadingProgressBar in DS | Different styling — ken-v1 uses undocumented teal, DS uses brand-agnostic version |
| **Testimonials** | Partial — "TESTIMO..." ghost text visible, section implied | TestimonialsRS organism in DS | ken-v1 testimonials section appears incomplete/placeholder |
| **CTA section** | Single pill CTA button near bottom | CTABanner organism in DS | Similar function, different implementation. DS CTABanner is a full organism with dark-panel variant |
| **Badge/Pill** | Hero chips as `rounded-full` ghost pills | DS Badge (11 themes, 4 sizes, 3 variants) | ken-v1 ghost pills are simpler than DS Badge system. Functional for now. |

---

## Mobile Comparison

| Issue | ken-v1 | DS-v26 | DS-Dashboard |
|---|---|---|---|
| Hero headline mobile | "Excellence Redefined." leads — "Industrial" absent | N/A | N/A | Verify: intentional mobile headline split or scroll-state capture artifact |
| Nav mobile | No hamburger/toggle visible in screenshot | Sidebar collapses, no visible trigger | Same as DS-v26 | All 3 surfaces have unclear mobile nav affordance — possible a11y gap |
| Content reflow | Single-column stack, clean | Clean reflow, Quick Links grid potentially too tight | Same — Composition Layer Map dark section preserved, looks strong | Quick Links at 390px needs spacing check |
| Touch targets | CTA button appears adequate | Mostly adequate | Mostly adequate | Not formally audited |
| Stats on mobile | Single-column, well-spaced | 2×2 collapse, acceptable | Same | ✓ No major issue |

---

## Notable Visual Observations

### ken-v1 strengths
- **Cinematic quality is genuinely high.** Near-black canvas + massive serif + generous negative space = premium editorial feel. Comparable to high-end agency work.
- **Red radial bloom** at lower page is a strong, unexpected moment — painterly, not corporate.
- **"Transformation" chromatic word** adds sophisticated typographic interest. Uncommon pattern, effective.
- **Motion architecture correct** — GSAP matchMedia + Framer + Lenis all wired, reduced-motion handled.

### ken-v1 gaps to fix
1. **Mock data `0%` stats** — most prominent data on page, all zero. Needs realistic placeholder values before any client-facing demo.
2. **Testimonials section incomplete** — "TESTIMO..." ghost text implies placeholder section not built out.
3. **Teal progress bar** — `#00e5ff` not in the DS token set. Either document as a ken-v1-specific accent or replace with a DS-compliant token.
4. **No shimmer on buttons** — DS brand signature missing on ken-v1 CTAs.
5. **Hero scale undocumented** — `clamp(4rem, 9vw, 9rem)` is a ken-v1-only override, not a DS token. Document as cinematic-dark variant exception.

### DS-v26 gaps to fix
1. **Background renders white, not `#f5f2f1`** — warm editorial base not applied to `<body>`. Check `src/styles/theme.css` body background declaration.
2. **Blue "View on GitHub" button** — off-brand blue interactive in top-right nav. Replace with black/outline button or explicitly document as external-link exception.
3. **Pillar 2 + 3 labels** appear in non-Ken colours (muted teal/green) — potential system drift in the Three-Pillar Architecture section.

### DS-Dashboard additional observations
- **Composition Layer Map** (full-bleed dark section) is the strongest content piece across all 3 surfaces — cinematic dark panel inside editorial light page. Strong visual precedent.
- **"Simple Blue" button variant** documented and live in Button component page — requires design decision (approved informational color or deprecate).
- **92-5-3 Color Rule section** with embedded dark preview panel — well executed, adds depth.

---

## Priority Fix List (from visual audit)

| # | Priority | Surface | Fix |
|---|---|---|---|
| V1 | P0 | DS-v26 + Dashboard | Fix body background — apply `#f5f2f1` to `<body>` or `:root` in `theme.css` |
| V2 | P0 | DS-v26 + Dashboard | Replace blue "View on GitHub" button with black outline or ghost button |
| V3 | P0 | ken-v1 | Replace `0%` mock stats with realistic placeholder values (e.g., 34%, 91%, 28%) |
| V4 | P1 | ken-v1 | Build out testimonials section (currently ghost placeholder) |
| V5 | P1 | DS-Dashboard | Decide: approve "Simple Blue" button variant or deprecate in favour of red+black only |
| V6 | P1 | ken-v1 | Document teal `#00e5ff` progress bar — add to cinematic-dark token set or replace |
| V7 | P1 | DS-v26 | Fix Pillar 2/3 label colors — confirm Ken brand colors only |
| V8 | P2 | ken-v1 | Document hero `clamp()` scale as cinematic-dark variant exception in DS Phase 1 doc |
| V9 | P2 | ken-v1 | Add shimmer to ken-v1 CTA buttons (DS brand signature) |
| V10 | P2 | All 3 | Verify mobile nav trigger visibility + touch targets (a11y pass pending) |

---

## Screenshots on disk

```
/tmp/gap-matrix-screenshots/
  ken-v1-desktop.png
  ken-v1-mobile.png
  ds-v26-desktop.png
  ds-v26-mobile.png
  ds-dashboard-desktop.png
  ds-dashboard-mobile.png
  ds-dashboard-components.png
```

*Note: screenshots are in /tmp — not persisted across reboots. Re-run gstack to regenerate.*
