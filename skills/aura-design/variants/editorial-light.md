# Variant — Editorial Light

**Where used (DEFAULT):** Discovery (01) body bands · Report Store (02) listing + detail body · Report Viewer (03) primary reading · Engagement (05) working portal · case-study editorials.
**Where used (OPTIONAL):** Dashboards (04) user-toggle when user prefers light theme.

This variant = the "warm editorial" surface signature. Stripe Press × Apple Books × NYT magazine. Done right, it reads like printed paper digitized — not like flat Material/Bootstrap default.

---

## Activation

### Page-level
```html
<html data-variant="editorial-light">
```
This is the workspace DEFAULT (cookie absent → editorial-light). Cookie set when user explicitly toggles to cinematic-dark.

### User toggle
DS hook: `useVariant()` from `@kenresearch/design-system/hooks`.

---

## Token swap (what's different vs cinematic-dark)

| Token | Value | Note |
|---|---|---|
| `--surface-bg-primary` | `#f5f2f1` | Warm off-white · NOT pure white (#FFF = clinical) |
| `--surface-bg-elevated` | `#fafaf8` | Card bg · 1 step warmer than body |
| `--surface-bg-warm` | `#ede8e4` | Section alternation warm tint |
| `--surface-bg-warm-darker` | `#e0d8d2` (warm-400) | Stronger warm tint band |
| `--surface-text` | `#000000` | Pure black on warm = high contrast · NO halation |
| `--surface-text-muted` | rgba(0,0,0,0.6) | Body secondary · 60% alpha |
| `--surface-text-subtle` | rgba(0,0,0,0.45) | Captions · 45% alpha |
| `--border-default` | rgba(0,0,0,0.08) | Hairline · 8% alpha |
| `--border-strong` | rgba(0,0,0,0.12) | Card borders · 12% alpha |
| `--composition-mesh` | none (transparent) | NO mesh on editorial — flat warm bg signature |
| `--shadow-premium` | 0 8px 24px -4px rgba(0,0,0,0.08) | Subtle lift · NOT dramatic |
| `--shadow-soft` | 0 1px 2px rgba(0,0,0,0.04) | Card resting state |

**Unchanged across variants:** brand red `#b01f24` · type scale · spacing scale · motion durations · radii.

---

## Why warm off-white (NOT pure white)

Pure white `#FFF` reads as clinical / Material / SaaS. `#f5f2f1` warm off-white reads as printed paper / editorial / archival. Tiny shift, big perception delta.

Reference: NYT Magazine print PDFs · Apple Books default · Stripe Press · Substack reading view.

**Anti-pattern:** building w/ `#FFF` "because designers prefer pure" → drift from Ken brand. Always `var(--surface-bg-primary)`.

---

## Type rendering on light

| Element | Color | Weight | Note |
|---|---|---|---|
| H1 | `--surface-text` `#000` | 600-700 | Noto Serif · pure black on warm = sharp contrast |
| H2-H3 | `--surface-text` | 500-600 | Noto Serif |
| Body | `--surface-text` `#000` | 400 | Pure black readable on warm bg |
| Eyebrow / small caps | `--color-brand-red` | 600 | Red on warm = pops, less saturation than red on dark |
| Stat counter | `--surface-text` | 600 | tabular-nums |
| Pull quote | `--surface-text-muted` (60% alpha) | 400 italic | Slight de-emphasis vs body |
| Caption / footnote | `--surface-text-subtle` (45% alpha) | 400 | |
| Drop cap | `--color-brand-red` OR `--surface-text` | 700 | Editorial signature for chapter openers |

**Drop caps:** 4-line drop · Noto Serif 700 · used on chapter openers in Viewer (03) + report-detail samples (02b) + featured insight posts (01).

**Hanging punctuation:** Tailwind v4 `text-wrap: pretty` + manual margin-left offset on opening quote marks. Stripe Press signature.

---

## Brand red on light

Brand red `#b01f24` retains intent — but on warm bg appears slightly less saturated than on dark. Same hex — perception shifts due to surrounding color.

| Use | Visual treatment |
|---|---|
| Primary CTA button | Solid brand-red bg · white text · brand-red darken 10% on hover |
| Eyebrow / small caps | Red text · 600 weight · letter-spacing 0.08em |
| Active TOC item | Red 2px left border · 600 text weight |
| Stat counter accent | Subtle red color shift on key number |
| Hover ring on cards | Red border (subtle) · y-translate 2px · NO shadow ring (kept restrained on light) |
| Drop cap (occasional) | Red drop cap on signature chapter openers (Stripe Press pattern · sparingly) |

**NEVER (same rules as dark):**
- Decorative red accents (decorative borders, dividers)
- Brand red as chart series color
- Light red variants `#ff4d4d`
- Brand red for body text

---

## Image treatment on light

- Cover thumbnails: 1px `--border-strong` 12% alpha · soft `--shadow-soft` resting
- Author avatars: ring-1 `--border-default`
- Chart stills: light-theme variant (Highcharts re-themes via `readToken()`)
- Photos / illustrations: warm undertones photograph well on warm-bg · cool blue-cast photos look misplaced

**Anti-pattern:** dark-bg charts dropped onto warm light page = visual rift (same logic as cinematic-dark). Always export light-theme variant.

---

## Motion on light

Same motion router rules. Light variant = no special motion considerations. Restraint same as dark.

---

## Components-on-light adjustments

Most DS atoms work as-is via token swap. Specific:

| Component | Light adjustment |
|---|---|
| `<Card>` | `--surface-bg-elevated` bg · `--border-strong` border · `--shadow-soft` resting · `--shadow-premium` (lighter spec) on hover |
| `<Button variant="brand">` | unchanged (red) · subtle red darken 10% on hover · NO white inset highlight (that's dark-only) |
| `<Button variant="ghost">` | black text `--surface-text` · `--border-default` border · hover bg `rgba(0,0,0,0.04)` |
| `<Badge>` | per status — see `tokens.semantic.status` (light-variant tones) |
| `<Divider>` | `--border-default` 8% alpha black |
| `<InlineLink>` | underline `--surface-text-muted` · hover swaps to `--color-brand-red` |
| `<SectionHeading>` | text `--surface-text` `#000` · uppercase eyebrow `--color-brand-red` |

---

## Section alternation (HARD GATE per recipe)

Recipes specify `Bg alternation: black → warm-300 → white → black → warm-300 → ...` per L50.

Token-backed bg classes:
- `section-bg-warm-300` → `--surface-bg-warm` (`#ede8e4`)
- `section-bg-warm-400` → `--surface-bg-warm-darker` (`#e0d8d2`)
- `section-bg-white` → `--surface-bg-primary` (`#f5f2f1`)
- `section-bg-elevated` → `--surface-bg-elevated` (`#fafaf8`)

**Same bg every section = bug.** aura-qa fails recipe-conformance gate.

---

## Anti-patterns specific to editorial-light

| Anti-pattern | Why wrong | Cat |
|---|---|---|
| Pure white `#FFF` body bg | Clinical · drift from "warm editorial" signature | 1.3 |
| `bg-white` Tailwind class instead of `var(--surface-bg-primary)` | Token-only rule | 1.1 |
| Heavy shadows (`shadow-2xl` Tailwind defaults) | Light variant = restraint · use `--shadow-soft` / `--shadow-premium` (lighter spec) | 13.6 |
| Section alternation drift (every section warm-300) | Reads as monotone | 13.11 |
| Pure black h1 w/ pure black body — over-uniform | Use `--surface-text-muted` (60% alpha) for body to create hierarchy | 1.4 |
| Cool photos / illustrations (blue cast) on warm bg | Visual rift · prefer warm-undertone imagery OR convert | 13.6 |
| Stripe Press drop caps on EVERY chapter | Signature is sparing · 1 per chapter ONLY · overuse = decorative noise | 13.15 |

---

## Implementation files

- Tokens: `design-system/tokens/build/tokens.css` (canonical · light variant defaults)
- Variant CSS: `design-system/core-v2/src/styles/editorial-light.css`
- Section bg orchestrator: `design-system/core-v2/src/patterns/SectionBg.tsx`
- Hook: `design-system/core-v2/src/hooks/useVariant.ts`
- Highcharts theme: `design-system/core-v2/src/charts/highchartsTheme.ts` (consumes tokens via `readToken()`)

---

## Cross-surface usage

- 01 Discovery — body bands (receipts/sector/methodology/insights) DEFAULT
- 02 Store — listing + detail body DEFAULT · `Featured carousel` band uses cinematic activator
- 03 Viewer — DEFAULT primary reading variant
- 04 Dashboards — user-toggle optional (working surface DEFAULTS to dark)
- 05 Engagement — DEFAULT (working portal · light = scannable)
- All case-study editorial templates — DEFAULT light · ResourcesSection swaps to cinematic via activator
