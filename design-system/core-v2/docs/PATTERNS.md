# Patterns — Backgrounds, Gradients, Composition

**Source of truth.** All consumer surfaces (Next.js ports, design playgrounds, exported docs) follow these rules. Anti-patterns enforced via `docs/ANTI_PATTERNS.md` Category 14 + `scripts/lint-section-alternation.mjs` + aura-qa runtime gate.

**Background:** synthesized 2026-05-08 from `/docs/aura-sprint-2026-05-07-port/B2-DS-patterns-backgrounds-deep-map.md` after the original DS forensic missed depth on the patterns/backgrounds layer.

---

## 1. Three-part architecture

The DS patterns/backgrounds system has three layers. Stay in lane.

| Layer | Where | Purpose | Example |
|---|---|---|---|
| **Token Layer** | `@kenresearch/tokens/build/tokens.css` | Named CSS variables — single source of truth | `--color-warm-300`, `--gradient-cinematic-base`, `--section-bg-primary` |
| **Utility Class Layer** | `src/styles/utilities.css` | Reusable cosmetic effects | `.glass`, `.glass-dark`, `.text-gradient-red`, `.shadow-premium`, `.mask-fade-bottom`, `.aspect-cinematic` |
| **Pattern Component Layer** | `src/patterns/*.tsx` | Composed cinematic/editorial structures | `<DarkGradientMesh>`, `<SectionBg>`, `<CarouselFadeMask>`, `NavbarGlassHover` (utility) |

**Rule:** Pattern components own composition logic. Utility classes own cosmetic effects. Tokens own values. **Never mix layers** (e.g., never pass a hex into a pattern component prop).

---

## 2. Section background alternation (HARD GATE)

Every recipe in `/design-system/recipes/` defines a locked section sequence. Same bg twice in sequence = wrong build.

### Default pillar (case-study)
Per `recipes/case-study.md` L57-62:

| # | Section | bg | Notes |
|---|---|---|---|
| 1 | HeroSection | BLACK | `--section-bg-contrast` (or DarkGradientMesh if cinematic-dark variant) |
| 2 | ClientContextSection | WHITE | `--section-bg-primary` |
| 3 | ChallengesSection | WARM | `--section-bg-accent` (`--color-warm-300`) |
| 4 | EngagementObjectivesSection | WHITE | |
| 5 | MethodologySection | WARM | |
| 6 | ImpactSection | WHITE | |
| 7 | ValuePillarsSection | WHITE | + `border-t` separator |
| 8 | TestimonialSection | WHITE | + `border-t` separator |
| 9 | ResourcesSection | BLACK + DarkGradientMesh | always cinematic, even in editorial-light variant |
| 10 | FinalCTASection | WHITE | + `border-t` separator |

### Other pillars
- **report-detail / report-detail-heavy** — see `recipes/report-detail.md`
- **report-store-home / report-store-listing** — see `recipes/report-store-*.md`
- **methodology** — see `recipes/methodology.md`
- **service-overview** — see `recipes/service-overview.md`
- **sector-landing** — see `recipes/sector-landing.md`
- **survey-detail / survey-listing** — see `recipes/survey-*.md`
- **ds-doc-page** — see `recipes/ds-doc-page.md`

### Enforcement
- **Static:** `pnpm lint:recipes <path-to-page.tsx>` walks AST + matches sequence
- **Runtime:** aura-qa samples `getComputedStyle(section).backgroundColor` per section + asserts alternation
- **Visual:** aura-qa snapshots per section, compares against recipe-locked baseline

### Cinematic-dark variant
Same alternation principle, but within the dark ramp: `--bg-deep / --bg-darker / --bg-surface`. No white sections in cinematic-dark. Opt-in only via cookie + RSC read (see `app/layout.tsx` template in MIGRATION_FROM_V1.md).

---

## 3. 92-5-3 color hierarchy

| Tier | Share | Family | Rule |
|---|---|---|---|
| Foundation | **92%** | black + white + warm | Section bgs, body text, hairlines, surfaces |
| Brand | **5%** | Ken red `#b01f24` | CTA buttons ONLY. No body emphasis. No decorative use. |
| Accent | **3%** | purple, periwinkle, perano, coral, teal (cinematic) | Badges, data viz, icons, hover states on non-CTAs |

**Audit:** any page exceeding these ratios = drift. Runtime checker `validateColorHierarchy()` (Phase B3 step 9) samples computed styles, classifies pixels by family, asserts ratios.

**Common violations:**
- Purple chart palette saturating product (V0.2_report observed) — accent pushed past 3%
- Brand red on icons or borders — should be CTA only
- Cobalt purple `#6400E4` decorative — off-brand, not a defined accent

---

## 4. Variant system

| Variant | Default | When to use |
|---|---|---|
| **editorial-light** | YES | Default for all consumers. White / warm / black sections. Calm, readable, editorial authority. |
| **cinematic-dark** | NO — opt-in | Premium product surfaces, hero moments, immersive showcases. Dark ramp + DarkGradientMesh on hero sections. Requires explicit user override OR project pre-flag. |

### Activation
```tsx
// app/layout.tsx (Next 15)
import { cookies } from 'next/headers';
const variant = cookies().get('ds-variant')?.value ?? 'editorial-light';
return (
  <html lang="en" data-variant={variant}>
    <body className={inter.variable + ' ' + notoSerif.variable}>
      {children}
    </body>
  </html>
);
```

### CSS layer order
```css
/* src/styles/layers.css */
@layer reset, base, tokens, composition, atoms, components, recipe-overrides;
```

Variants attach via `[data-variant="cinematic-dark"]` selectors in `cinematic-dark.css` under `@layer recipe-overrides`. Editorial is `:root` defaults under `@layer base`.

**No flicker:** variant set on `<html>` before paint via cookie read in RSC. Avoids client-side flash.

---

## 5. Cinematic dark gradient mesh (signature pattern)

The depth-creating composition for hero / resources / premium sections in cinematic-dark variant.

### Recipe
- **Base:** linear vertical vignette `linear-gradient(180deg, #0f0f0f 0%, #1a1a1a 50%, #0f0f0f 100%)` (use `var(--gradient-cinematic-base)`)
- **5 stacked radial overlays** w/ blur 60-90px + `mix-blend-mode: screen`:

| Position | Color | Token | Blur |
|---|---|---|---|
| Top-left | purple `rgba(76,95,215,0.15)` | `--gradient-cinematic-overlay-tl` | 80px |
| Top-right | violet `rgba(124,58,237,0.18)` | `--gradient-cinematic-overlay-tr` | 90px |
| Bottom-left | green `rgba(5,150,105,0.14)` | `--gradient-cinematic-overlay-bl` | 75px |
| Bottom-right | orange `rgba(194,65,12,0.16)` | `--gradient-cinematic-overlay-br` | 85px |
| Center | white `rgba(255,255,255,0.02)` | `--gradient-cinematic-overlay-center` | 60px |

### Falloff rule (per overlay)
`rgba(...) 0% → rgba(...) at 50% alpha at 30% → transparent at 60%`

### Usage
```tsx
import { DarkGradientMesh } from '@kenresearch/design-system/patterns';

<section className="relative">
  <DarkGradientMesh />
  <div className="relative z-10">{/* content */}</div>
</section>
```

### When to use
- HeroSection (cinematic-dark variant only)
- ResourcesSection (always — cinematic even in editorial-light pages)
- TestimonialSection (cinematic-dark variant)
- Premium showcase sections explicitly authored with cinematic intent

### When NOT to use
- Editorial-light HeroSection — use `--section-bg-contrast` solid black
- Body content sections — too busy
- Listing pages — distracting
- Any section serving long-form text (low readability)

---

## 6. Carousel fade mask

Soft overflow hint for horizontally-scrollable card carousels (ChallengesSection, AnalystPicks, etc.).

### Recipe
- Linear gradient `linear-gradient(to right|left, var(--section-bg-current), transparent)` matching parent section's bg
- Applied via `<CarouselFadeMask>` component on left + right edges

### Usage
```tsx
import { CarouselFadeMask } from '@kenresearch/design-system/patterns';

<section data-section-bg="warm">
  <div className="relative">
    <CarouselFadeMask side="left" />
    <ScrollContainer>{/* cards */}</ScrollContainer>
    <CarouselFadeMask side="right" />
  </div>
</section>
```

`<CarouselFadeMask>` reads `data-section-bg` from nearest ancestor + applies matching gradient. Eliminates color-mismatch hard-edge bug.

### Fallback
If parent has no `data-section-bg`, mask defaults to `var(--section-bg-primary)` (white). Document in JSDoc.

---

## 7. Glass overlay (`.glass`, `.glass-dark`)

Frosted-glass layered surface for navbar scroll states, modal backdrops, floating cards on dark mesh.

### Recipe (`.glass`)
```css
background: rgba(255, 255, 255, 0.7);
backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.3);
```

### When to use
- Navbar background after scroll past hero (light pages)
- Modal/dialog backdrop layer
- Floating CTA cards over imagery
- Hero detail glass card (KSA Coldchain pattern)

### Anti-pattern
- Don't use on text — clipping kills a11y
- Don't use without translucent parent (effect invisible)
- Test Safari + Firefox `backdrop-filter` support

---

## 8. Navbar glass hover (radial bloom)

Cinematic accent: purple radial glow behind nav link on hover/scroll-active states.

### Recipe
`radial-gradient(ellipse 32.5px 15.5px at center, rgba(128,108,224,1) 0%, rgba(128,108,224,0) 100%)` — narrow ellipse, 0% center → 100% transparent.

Wider variant (different nav items): `ellipse 72.78px 15.5px at center` for optical balance.

### Usage
Utility class (not a component): `data-navbar-hover` triggers ::before pseudo with radial.

```tsx
<a className="navbar-link" data-navbar-hover>
  Reports
</a>
```

`NavbarGlassHover` exported as React component wrapper for non-anchor cases.

---

## 9. Section bg orchestrator (`<SectionBg>`)

Single component to enforce variant-correct, recipe-correct section backgrounds.

### API
```tsx
type SectionBgProps = {
  variant: 'primary' | 'accent' | 'contrast' | 'mesh';  // primary=white, accent=warm, contrast=black, mesh=DarkGradientMesh
  pattern?: 'glass' | 'fade-mask';                       // optional overlay
  children: React.ReactNode;
  className?: string;
  borderTop?: boolean;                                   // separator above (Sections 7/8/10 case-study)
};
```

### Behavior
- Reads variant CSS layer (`editorial-light` vs `cinematic-dark`) automatically
- Sets `data-section-bg={variant}` for child `<CarouselFadeMask>` inheritance
- Renders `<DarkGradientMesh>` if variant=mesh
- Adds `border-t border-[--color-hairline]` if borderTop=true

### Usage
```tsx
<SectionBg variant="warm">
  <CarouselFadeMask side="left" />
  {/* content */}
</SectionBg>
```

---

## 10. Fallbacks + a11y contrast

### Gradient fallbacks
- Gradient text → solid color via `color:` property
- `backdrop-filter: blur` → solid bg via `@supports` query
- `mix-blend-mode: screen` → may not render on print stylesheets — provide print fallback (solid color)

### Contrast checklist (per section bg)
| bg | Body text | Display text | Min ratio |
|---|---|---|---|
| WHITE | `--color-ink-body` | `--color-ink-display` | 7:1 (AAA) |
| WARM `#f5f2f1` | `--color-ink-body` | `--color-ink-display` | 7:1 |
| BLACK | `--color-ink-on-dark` | `--color-ink-on-dark-display` | 7:1 |
| DarkGradientMesh | `--color-ink-on-dark` | `--color-ink-on-dark-display` | 7:1 against ANY mesh sample point (test at 5+ positions) |

aura-qa runs axe + samples per-section contrast. Failures = blocker.

### Reduced motion
- Cinematic mesh stacks are static (no animation by default — animate via `useScrollAnimation` opt-in)
- Glass `backdrop-filter` is static (no animation)
- Navbar radial bloom appears via opacity transition, NOT box-shadow animation
- Respect `prefers-reduced-motion: reduce` — disable all bloom transitions, show final state

---

## 11. Mock data for pattern surfaces

Pattern components are bg primitives — no data props. Their consumers (HeroSection, ResourcesSection, etc.) consume mock data via `src/lib/mock-data.ts` per consumer project. See `MIGRATION_FROM_V1.md` for atom data prop interfaces.

---

## 12. Open questions / future work

- **Recipe lint coverage:** `lint-section-alternation.mjs` is stub. Phase B3 step 10.5 implements full AST walk. Currently relies on aura-qa runtime check.
- **`validateColorHierarchy()` runtime:** Phase B3 step 9. Browser-only — gates pre-handover.
- **DarkGradientMesh perf:** 5 stacked radials w/ blur = paint cost. Test on mid-range mobile. Consider GPU compositing hints (`will-change`, `transform: translateZ(0)`).
- **Editorial cinematic mode:** ResourcesSection is BLACK even in editorial-light pages. Confirm with brand whether other sections should follow (likely no — confined to ResourcesSection per recipe).
- **Tokens missing in v1 canonical:**
  - `--bg-composition-warm-editorial` declared in `theme.css` but 0 consumers — promote to `tokens.json` or delete
  - `--gradient-cinematic-overlay-{tl,tr,bl,br,center}` — net new in v2 (Phase B3 step 2)
  - `--section-bg-{primary,accent,contrast,mesh}` — semantic tokens net new in v2

---

## Critical files

- `/design-system/core-v2/src/styles/utilities.css` — `.glass`, `.glass-dark`, gradients, shadows, masks
- `/design-system/core-v2/src/patterns/*.tsx` — DarkGradientMesh, SectionBg, CarouselFadeMask, NavbarGlassHover
- `/design-system/core-v2/scripts/lint-section-alternation.mjs` — recipe enforcement (stub)
- `/design-system/recipes/*.md` — locked sequences per pillar
- `/design-system/tokens/tokens.json` — canonical token source (Style Dictionary v4 → DTCG)
- `/design-system/core-v2/docs/ANTI_PATTERNS.md` — Category 14 (Gradients) enforcement rules
