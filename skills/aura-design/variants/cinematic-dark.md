# Variant — Cinematic Dark

**Where used (DEFAULT):** Dashboards (04 long-session reading) · sections w/ `[data-variant-section="cinematic"]` activator (hero / featured / book-a-call bands across 01, 02, 03 optional).
**Where used (OPTIONAL):** Viewer (03) user-toggle for long reads · Engagement (05) user-toggle.

This variant = the "premium cinematic finish" surface signature. Done right, it differentiates Ken from Tier A flat dashboards. Done wrong, it's just dark mode.

---

## Activation

### Page-level
```html
<html data-variant="cinematic-dark">
```
Cookie-driven · RSC layout reads cookie → `<html>` data attr.

### Section-level (within editorial-light page)
```html
<section data-variant-section="cinematic">
```
CSS in `core-v2/styles/cinematic-dark.css` `[data-variant-section="cinematic"]` selector swaps tokens for that section only.

### User toggle
DS hook: `useVariant()` from `@kenresearch/design-system/hooks`. Toggle button uses Lucide `Moon`/`Sun` icons.

---

## Token swap (what's different vs editorial-light)

| Token | Value | Note |
|---|---|---|
| `--color-bg-deep` | `#0a0a0c` | Deep charcoal · NOT pure black (pure black = harsh) |
| `--surface-bg-primary` | rgba(15,15,20,1) | Slight blue cast |
| `--surface-bg-elevated` | rgba(22,22,28,1) | Elevated cards stand out by 1 step |
| `--surface-text` | `#FAFAFA` | Off-white · NOT pure white (eye fatigue) |
| `--surface-text-muted` | rgba(250,250,250,0.65) | 65% alpha · readable hierarchy |
| `--surface-text-subtle` | rgba(250,250,250,0.45) | Footnotes · captions |
| `--border-default` | rgba(255,255,255,0.08) | Hairline · 8% alpha |
| `--border-strong` | rgba(255,255,255,0.16) | Card borders · 16% alpha |
| `--composition-mesh` | 5-overlay radial gradient (see below) | Cinematic signature |
| `--shadow-premium` | 0 24px 64px -8px rgba(0,0,0,0.6) · big diffuse | Lift hero cards |
| `--shadow-inset-soft` | inset 0 1px 0 0 rgba(255,255,255,0.04) | Sharp top edge highlight |

**Unchanged across variants:** brand red `#b01f24` (CTAs only) · type scale · spacing scale · motion durations · radii.

---

## Cinematic gradient mesh (the signature)

Pattern at `core-v2/patterns/DarkGradientMesh.tsx`. **5 stacked radial gradients w/ blur 60-90px + screen blend mode:**

```css
background:
  radial-gradient(ellipse at 20% 30%, rgba(176,31,36,0.15), transparent 60%),  /* brand red glow top-left */
  radial-gradient(ellipse at 80% 20%, rgba(128,108,224,0.08), transparent 70%),  /* purple periwinkle accent */
  radial-gradient(ellipse at 60% 70%, rgba(20,40,80,0.12), transparent 60%),     /* navy depth */
  radial-gradient(ellipse at 30% 90%, rgba(176,31,36,0.06), transparent 50%),    /* brand red echo bottom */
  radial-gradient(ellipse at 90% 90%, rgba(0,0,0,0.4), transparent 70%),          /* corner darkness */
  var(--color-bg-deep);
```

**Blur layer:** `backdrop-filter: blur(0)` on parent · child gradients use `filter: blur(60-90px)` for soft mesh feel.

**Performance:** static CSS · zero JS · GPU-accelerated. Blur is the only expensive op — keep at 60-90px (not 200+).

**Anti-pattern:** never use this mesh in working surfaces (Dashboard data tile bg, Engagement portal). Mesh = hero/marketing impact only. Working surfaces use flat `--surface-bg-primary`.

---

## Type rendering on dark

| Element | Color | Weight | Note |
|---|---|---|---|
| H1 | `--surface-text` | 600-700 | Slight letter-spacing tightening (`-0.01em`) on serifs to reduce halation |
| H2-H3 | `--surface-text` | 500-600 | |
| Body | `--surface-text-muted` (65% alpha) | 400 | NOT pure white — reduces glare |
| Eyebrow / small caps | `--color-brand-red` | 600 | Red pops on dark — high contrast |
| Stat counter | `--surface-text` | 600 | tabular-nums |
| Pull quote | `--surface-text-muted` | 400 italic | Subtle on dark |
| Caption / footnote | `--surface-text-subtle` (45% alpha) | 400 | |

**Anti-pattern:** body text in pure `#FAFAFA` on dark = halation (text appears to vibrate). Use 65% alpha muted instead.

---

## Brand red on dark

`#b01f24` retains saturation on dark — DON'T desaturate or lighten for "softer dark mode" effect. Brand consistency = same red on both variants.

| Use | Visual treatment |
|---|---|
| Primary CTA button | Solid brand-red bg · white text · 8% white border on hover |
| Eyebrow / small caps | Red text on dark bg · 600 weight |
| Active TOC item | Red 2px left border |
| Stat counter accent | Red tinge on key stat (sparingly) |
| Hover ring on cards | Red border + 2px shadow ring |

**NEVER:**
- Decorative red accents (decorative borders, divider lines)
- Brand red as chart series color (use `chart.palette.{1..8}`)
- Light red `#ff4d4d` as alternative (drift)
- Brand red for body text (semantic-pollution)

---

## Image treatment on dark

- Cover thumbnails: 1px `--border-strong` 16% alpha border on cards
- Author avatars: ring-1 `--border-strong` outer
- Chart stills: dark-theme variant (Highcharts re-themes via `readToken()` runtime resolver)
- Photos / illustrations: prefer SVG · dark-bg-friendly

**Anti-pattern:** white-bg PNG screenshots dropped onto cinematic mesh = visual rift. Always export charts/illustrations in dark-bg variant for cinematic surfaces.

---

## Motion on dark

Same motion budget as light (per `decisions/motion-router.md`). Cinematic-dark doesn't justify MORE motion — restraint = signature feel.

**Special on dark:**
- `useShimmer` hook DS — subtle CTA shine animation (4s loop, 8% white gradient sweep) on primary CTAs · ease-out · GPU-accelerated · respects reduced-motion
- Brand-red CTA hover: subtle red glow shadow expand (200ms) — sparingly
- Avoid bright flashes (mounting white modals on dark · jarring)

---

## Components-on-dark adjustments

Most DS atoms work as-is via token swap. Specific overrides:

| Component | Dark adjustment |
|---|---|
| `<Card>` | `--surface-bg-elevated` bg · `--border-strong` border · `--shadow-premium` on hover |
| `<Button variant="brand">` | unchanged (red) · adds subtle white inset highlight on hover |
| `<Button variant="ghost">` | white text · `--border-default` border · hover bg `rgba(255,255,255,0.04)` |
| `<Badge>` | swap text/bg per status — see `tokens.semantic.status` group |
| `<Divider>` | `--border-default` (8% alpha) instead of light variant's rgba(0,0,0,0.08) |
| `<InlineLink>` | underline `--surface-text-muted` · hover swaps to `--color-brand-red` |
| `<SectionHeading>` | text `--surface-text` · uppercase eyebrow `--color-brand-red` |

---

## Anti-patterns specific to cinematic-dark

| Anti-pattern | Why wrong | Cat |
|---|---|---|
| Pure black `#000` background | Too harsh · use `--color-bg-deep` `#0a0a0c` | 1.3 |
| Pure white text on dark | Halation · use 65% alpha muted | 1.4 |
| Brand red shifted lighter "for dark mode harmony" | Brand drift · same `#b01f24` both variants | 13.10 |
| Building cinematic mesh inline w/ hex literals | Use `<DarkGradientMesh>` pattern component · token-only | 1.1 |
| Mesh blur >200px | Perf hit · 60-90px sweet spot | 14.1 (perf) |
| Cinematic on working data-grid surfaces (dashboard tile bg) | Context-mismatch · flat dark for data | 13.5 |
| Decorative red accents (red borders, divider lines) | Brand red = CTA/alert only · 5% color hierarchy | 13.6 |
| Auto-toggle dark by time-of-day | User pref only · system pref `prefers-color-scheme` ignored intentionally per Ken brand | 13.14 |

---

## Implementation files

- Tokens: `design-system/tokens/build/tokens.css` (canonical · `--*-dark` variants when needed)
- Variant CSS: `design-system/core-v2/src/styles/cinematic-dark.css` (page-level + section-level activator)
- Mesh pattern: `design-system/core-v2/src/patterns/DarkGradientMesh.tsx`
- Section bg orchestrator: `design-system/core-v2/src/patterns/SectionBg.tsx`
- Hook: `design-system/core-v2/src/hooks/useVariant.ts`
- Highcharts theme: `design-system/core-v2/src/charts/highchartsTheme.ts` (consumes tokens via `readToken()`)

---

## Cross-surface usage

- 01 Discovery — hero band default · book-a-call closing band
- 02 Store — hero + featured carousel band · detail-page hero optional
- 03 Viewer — user-controlled toggle (long-session reading)
- 04 Dashboards — DEFAULT (working command-center context)
- 05 Engagement — user-toggle optional (working surface, light DEFAULT)

ResourcesSection on case-study pages = ALWAYS cinematic-dark (per recipe HARD GATE) via `[data-variant-section="cinematic"]`.
