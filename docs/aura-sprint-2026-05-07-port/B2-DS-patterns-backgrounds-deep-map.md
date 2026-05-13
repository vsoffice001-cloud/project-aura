# Phase B2 — DS Patterns + Backgrounds + Gradients Deep Map

**Date:** 2026-05-08
**Source:** Explore agent deep-map (filling gap from B-DS-FORENSIC-v1 audit)
**Verdict:** System EXISTS, FUNCTIONAL, UNDERDOCUMENTED. Three-part architecture across CSS tokens + utility classes + component-level inline gradients.

---

## Three-part architecture

1. **CSS Token Layer** (`theme.css`): `--bg-composition-warm-editorial`, `--warm-50..900`, `--bg-warm`, `--bg-pure-black/white`
2. **Utility Class Layer** (`modern-utilities.css`): `.glass`, `.glass-dark`, `.text-gradient-red`, `.text-gradient-dark`, `.shadow-premium`, `.shadow-inner-soft`, `.mask-fade-bottom`, `.custom-scrollbar`, `.aspect-cinematic`, `.aspect-portrait-editorial`
3. **Component Application Layer** (inline gradients in `ResourcesSection.tsx`, `Navbar.tsx`, `ChallengesSection.tsx`, `MethodologySection.tsx`, `Button.tsx`)

## Token inventory (theme.css)

| Token | Value | Status |
|---|---|---|
| `--bg-composition-warm-editorial` | `linear-gradient(180deg, #faf9f8 0%, #f5f2f1 40%, #faf9f8 100%)` | DECLARED, 0 consumers (dead or future-reserved) |
| `--bg-warm` | `#f5f2f1` (warm-300) | Used Navbar, ChallengesSection, footer |
| `--bg-warm-500/600/700` | tints | CSS-only, 0 tsx consumers |
| `--bg-pure-black/white` | `#000000`/`#ffffff` | Legacy, superseded by `--black`/`--white` |
| `--warm-50..900` 9 tiers | `#fefdfd` → `#a6968e` | Section bgs primary system |
| `--black-50..900` | `#fafafa` → `#000000` | Dark section text/utility |
| `--white/-800/-900` | `#fff`/`#f5f5f5`/`#fafafa` | Editorial-light primary |

## Utility classes (modern-utilities.css 81 LOC)

- `.glass` rgba 0.7 white + 12px blur — frosted overlay light bg
- `.glass-dark` rgba 0.5 black + 12px blur — frosted dark
- `.text-gradient-red` 135deg `#b01f24 → #ff4d4d` clipped to text
- `.text-gradient-dark` 135deg `#000 → #434343` text gradient
- `.shadow-premium` dual-layer (large diffuse + crisp small)
- `.shadow-inner-soft` inset 2px shadow
- `.mask-fade-bottom` vertical mask black→transparent bottom 20%
- `.custom-scrollbar` 6px webkit thumb
- `.aspect-cinematic` 21:9
- `.aspect-portrait-editorial` 3:4

## Inline gradient catalog (component-level)

### ResourcesSection — Dark Gradient Mesh (THE signature pattern)
**Composition:** linear base + 5 stacked radial overlays w/ blur + screen blend
- Base: `linear-gradient(180deg, #0f0f0f 0%, #1a1a1a 50%, #0f0f0f 100%)`
- Overlay TL: purple `rgba(76,95,215,0.15)` blur 80px screen
- Overlay TR: violet `rgba(124,58,237,0.18)` blur 90px screen
- Overlay BL: green `rgba(5,150,105,0.14)` blur 75px screen
- Overlay BR: orange `rgba(194,65,12,0.16)` blur 85px screen
- Overlay center: white `rgba(255,255,255,0.02)` blur 60px

**Rule:** Each overlay = `rgba(...) 0%, rgba(...alpha*0.5) 30%, transparent 60%` radial falloff.

### Other inline gradients
- **Navbar** radial purple glow `rgba(128,108,224,1) → 0` 32.5×15.5px ellipse + wider 72.78px variant — hover/scroll cinematic accent
- **ChallengesSection** carousel fade masks `linear-gradient(to right/left, #f5f2f1, transparent)` — overflow hint, matches section bg
- **MethodologySection** step ring `radial-gradient(circle, rgba(0,0,0,0.08) 0%, transparent 70%)` + vertical connector
- **Button** dark shimmer `linear-gradient(90deg, #141016, #656565, #141016)` + red shimmer `#b01f24, #eb484e, #b01f24` (BRAND-LOCKED, animated via useShimmer)

## Section alternation system (PRIMARY pattern organizer)

Per `recipes/case-study.md` L57-62:
```
1. HeroSection         → BLACK
2. ClientContextSection → WHITE
3. ChallengesSection    → WARM #f5f2f1
4. EngagementObjectives → WHITE
5. MethodologySection   → WARM
6. ImpactSection        → WHITE
7. ValuePillarsSection  → WHITE (border-t separator)
8. TestimonialSection   → WHITE (border-t)
9. ResourcesSection     → BLACK (dark gradient mesh)
10. FinalCTASection     → WHITE (border-t)
```

**HARD GATE:** Same bg twice in sequence = wrong. aura-qa samples `getComputedStyle(section).backgroundColor` per section + asserts alternation.

**Cinematic-dark variant:** alternates within dark ramp (deep / darker / surface). NOT default — opt-in only.

## Documented intent (PatternsContent.tsx + recipes)

| Pattern | Intent | Use case | Don't |
|---|---|---|---|
| Section alternation | Rhythm, readability, hierarchy via section breaks | Every case study/display page | Same bg twice; improvise sequence |
| BLACK section | Max contrast, editorial authority, premium | Hero, Resources, dark Testimonial | Body-heavy long-text content |
| WHITE section | Clean, readable, neutral default | Most product/content sections | Adding unnecessary gradients |
| WARM section | Visual break, cozy/approachable, subtle neutrality | Challenges, Methodology (alt) | Overuse — max once per 2-3 white |
| Dark gradient mesh | Cinematic depth, premium mood, color accent without saturation | ResourcesSection, future cinematic-dark | Single radial w/o blur stack = harsh |
| Carousel fade mask | Overflow hint w/o hard edge | Horizontal card scroll | Mismatched mask color → hard line |
| Navbar glass hover | Interactive affordance, brand accent signal | Nav link hover/scroll states | — |

## What original audit MISSED (now caught)

1. Three-part architecture (tokens + utilities + inline gradients)
2. Modern-utilities.css 81 LOC — full utility surface
3. Dark gradient mesh composition pattern (ResourcesSection — THE cinematic signature)
4. Section alternation HARD GATE rule + aura-qa enforcement spec
5. Carousel fade mask pattern w/ context-matching color
6. Navbar radial glow hover system (purple 32.5×15.5 + 72.78×15.5 ellipse variants)
7. ModernUtilitiesContent.tsx + PatternsContent.tsx as live executable spec surfaces
8. ai-context/CORE.md + LAYOUT.md + COLORS.md as undocumented in audit
9. 92-5-3 color hierarchy rule (92% foundation / 5% brand red / 3% accent)
10. Recipe-driven section bg sequence (10 sections × pillar)

## Heal plan amendments (added to 15-step plan)

### Amend Step 2 — Token foundation
ADD:
- Extract `--bg-composition-warm-editorial` to `tokens.json` `composition` group
- Map ResourcesSection 5-overlay mesh to named tokens: `--gradient-cinematic-base`, `--gradient-cinematic-overlay-tl/tr/bl/br/center`
- Build semantic section-bg tokens: `--section-bg-primary` (white), `--section-bg-accent` (warm), `--section-bg-contrast` (black)
- Verify DTCG composition tokens

### Amend Step 3 — Variant scaffolding
ADD:
- Editorial-light variant tokens map to white/warm/black solid bgs
- Cinematic-dark variant tokens map to dark ramp + gradient mesh active
- CSS layer: `@layer composition` for gradient overlays — applies after tokens, before atoms

### Amend Step 4 — Charts (already includes Highcharts theme)
NO ADDITION. Charts use chart palette tokens (separate from section bg gradients).

### NEW Step 9.5 — Pattern utilities + gradient mesh module
- Port `modern-utilities.css` to `core-v2/styles/utilities.css`
- Extract ResourcesSection dark gradient mesh to CSS custom-property template
- Create `<DarkGradientMesh>` pattern component (5-overlay composition reusable)
- Create `<SectionBg variant="primary|accent|contrast" pattern?: 'mesh'|'fade-mask'|'glass'>` orchestrator
- Document carousel fade-mask helper (auto-matches parent section bg via CSS var)
- Navbar glass hover utility (radial + screen blend)

### NEW Step 10.5 — PATTERNS.md module + lint rules
- Create `core-v2/docs/PATTERNS.md` (300+ LOC):
  - Section alternation rules per pillar (case-study, report-detail, sector-landing, service-overview, methodology, etc.)
  - Each section color → intent + use-case + don't
  - Dark gradient mesh copy-paste template
  - Editorial-light vs cinematic-dark decision flowchart
  - 92-5-3 color hierarchy
  - Fallback plan (solid color + opacity if gradient fails)
  - A11y contrast checklist per bg color
- ANTI_PATTERNS.md add Category 14 (Gradients):
  1. Never inline gradient w/o documenting intent
  2. Never radial w/o blur composition (single radial = harsh)
  3. Never mix blend modes w/o intent (`screen` glow / `multiply` darken / `overlay` texture)
  4. Never gradient text w/o fallback color
  5. Never fade mask w/o matching parent section bg
- Recipe-lint script: assert section bg alternation matches recipe L50 sequence per organism file order

### Amend Step 13 — Verification
ADD: throwaway Next consumer must render ResourcesSection w/ full 5-overlay gradient mesh + assert no SSR mismatch. Snapshot dark gradient mesh.

## Files to migrate
- `theme.css` lines 1-751 (all tokens, deduplicate `--bg-warm` legacy vs `--warm-300`)
- `modern-utilities.css` lines 1-81 → `core-v2/styles/utilities.css`
- `ResourcesSection.tsx` mesh as reference → extract to `<DarkGradientMesh>` pattern

## Files to RETIRE (not migrated to core-v2 exports)
- `ModernUtilitiesContent.tsx` (demo surface — keep in playground only)
- `PatternsContent.tsx` (demo surface — keep in playground only)

## Files to CREATE (Phase B3)
- `core-v2/styles/utilities.css` (port from modern-utilities)
- `core-v2/patterns/DarkGradientMesh.tsx`
- `core-v2/patterns/SectionBg.tsx`
- `core-v2/patterns/CarouselFadeMask.tsx`
- `core-v2/docs/PATTERNS.md` (300+ LOC)
- `core-v2/scripts/lint-section-alternation.mjs`
- ANTI_PATTERNS.md Category 14

## Coverage summary

| Element | Original audit | This audit |
|---|---|---|
| Token inventory | partial (`--bg-composition-warm-editorial` flagged absent — wrong, present unused) | full |
| Utility classes | not enumerated | 10 utilities mapped |
| Component inline gradients | density flagged 1207 | 7 named patterns mapped |
| Section alternation rule | not surfaced | HARD GATE + aura-qa spec |
| Dark gradient mesh | not surfaced | full 5-overlay composition |
| 92-5-3 hierarchy | mentioned in passing | rule documented |
| ModernUtilitiesContent.tsx | listed | parsed |
| PatternsContent.tsx | listed | parsed |
| ai-context CORE/LAYOUT/COLORS.md | listed | parsed |
