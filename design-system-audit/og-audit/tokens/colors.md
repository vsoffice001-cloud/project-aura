# OG Token Audit · Colors

**Source-of-truth:** `src/styles/theme.css:255–402` (CSS vars) · `src/design-system/tokens.ts:14–43` (TS parallel) · `ai-context/COLORS.md` (intent docs)
**Audit date:** 2026-05-14 · WWWWH framework

---

## WWWWH

**WHAT** — Color is the single largest token domain in the OG DS. It encodes brand identity (Ken bold red), foundation neutrals (black + white + warm-300 off-white), four decorative accent families (purple · periwinkle · coral · perano), and three semantic state families (green · amber · rose). Every color is a CSS custom property under `:root` in `theme.css`, mirrored in `tokens.ts` for type-safe consumption.

**WHY a separate domain** — Color carries the heaviest brand load (Ken bold red is the singular conversion signal), the strongest UX-research load (92-5-3 ratio governs every layout), and the strictest accessibility load (WCAG contrast). Mixing color with spacing/typography would let consumers cherry-pick hex values inline, defeating the 92-5-3 discipline. The `tokens.ts:38–43` accent struct intentionally exposes ONLY base shades (`purple600 · periwinkle500 · perano500 · warm600`) so the type system blocks raw scale access.

**WHEN to use** ✅
- Reach for `--brand-red` only on CTAs / conversion actions (≤5% of any view)
- Use `--black · --white · --warm-300` for 92% of structural surfaces
- Use accent `*-600` / `*-500` BASE tokens for badges · iconography · data-viz differentiation (3% rule)
- Use semantic `--green-* · --amber-* · --rose-*` ONLY for state feedback (success / warning / error)
- Use opacity-on-black (`rgba(0,0,0,0.06–0.70)`) for borders + body text rather than literal grays

**WHEN NOT to use** ❌
- NEVER use raw hex inline — `style={{ color: '#b01f24' }}` is forbidden (`COLORS.md:257`). Always `var(--brand-red)` or `rgba()`.
- NEVER use `--rose-*` as a substitute for `--brand-red` (different role · different intent — `COLORS.md:204`)
- NEVER use accent colors for section backgrounds (only black · white · warm-300 — `COLORS.md:36`)
- NEVER use purple as text color (purple = shadow + content-icon + badge theme only — `COLORS.md:35`)
- NEVER use literal grays (`#aaa`, `#ccc`) — use the `--black-*` tint scale instead (`COLORS.md:62`)

**WHERE deployed** — `theme.css` :root (canonical) · `tokens.ts` (TS API) · every organism via `var(--*)` · `Badge.tsx` (11 themes) · `Card.tsx` (purple-tinted shadow) · `Button.tsx` (brand-red gradient) · `iconColors` helper (`#806ce0` content / `#737373` utility).

**HOW to consume**
```tsx
// In TSX — prefer var()
<button style={{ background: 'var(--brand-red)', color: 'var(--white)' }}>

// In Tailwind arbitrary value
<div className="bg-[var(--warm-300)] text-black/70">

// Token API for TS-checked usage
import { colors } from '@/design-system/tokens';
<div style={{ background: colors.brand.red600 }}>

// NEVER:
<div style={{ color: '#b01f24' }}>   // ❌ raw hex forbidden
<div className="text-gray-500">      // ❌ use --black-500 ladder
```

---

## The 92-5-3 Hierarchy (governing law)

| Tier | Share | Tokens | Role |
|---|---|---|---|
| **Foundation** | 92% | `--black` `#000000` · `--white` `#ffffff` · `--warm-300` `#f5f2f1` | Backgrounds · text · page structure |
| **Brand** | 5% | `--brand-red` `#b01f24` | CTAs ONLY (Book a call · Buy report) |
| **Accent** | 3% | Purple · Periwinkle · Coral · Perano | Badges · data-viz · card differentiation · shadows |

> *"The single most important color rule: 92% foundation, 5% brand, 3% accent."* (`COLORS.md:13`)

**Modification risk** — Shifting this ratio drifts the editorial identity. Every audit finds a 92-5-3 violation manifests as "too much red" or "rainbow cards" first.

---

## Brand colors (Ken bold red)

| Token | Value | Aliases | WHY this value | WHERE used | Risk |
|---|---|---|---|---|---|
| `--brand-red` | `#b01f24` | `--red-600` | Ken logo red since v1 — singular conversion signal · WCAG-AA on white (5.2:1) | Button.tsx brand variant · all CTAs · gradient start | Changing breaks brand recognition + every CTA contrast calc |
| `--brand-red-hover` | `#8f181d` | `--red-700` | -10% L* darkening · Weber's-Law-clearable hover delta | Button :hover · CTA :hover | Tuning <8% breaks perceptible hover, >15% feels "wrong color" |
| `--brand-red-active` | `#771419` | `--red-800` | -15% L* further darkening · pressed depth cue | Button :active | Must always be darker than hover |

### Full red scale (full 50–900 ladder)

| Token | Value | Use |
|---|---|---|
| `--red-50` | `#fef2f2` | Lightest — subtle backgrounds · alert highlights |
| `--red-100` | `#fee2e2` | Notice backgrounds · hover states |
| `--red-200` | `#fecaca` | Disabled states · soft accents |
| `--red-300` | `#fca5a7` | Borders · dividers |
| `--red-400` | `#f87176` | Icons · secondary buttons |
| `--red-500` | `#dc3238` | Links · active states (note: `tokens.ts:32` calls this `red500` "gradient end") |
| `--red-600` | `#b01f24` | PRIMARY BRAND · CTAs · gradient start |
| `--red-700` | `#8f181d` | Hover |
| `--red-800` | `#771419` | Active/pressed |
| `--red-900` | `#5f1014` | Darkest — text on light · deep emphasis |

> OG inline: *"PRIMARY BRAND - CTAs, buttons, key accents"* (`theme.css:275`)

**Anti-patterns** — Using `--rose-*` for "red" (rose is for errors only · `COLORS.md:204`) · using `--red-500` for brand CTAs (use `--red-600` / `--brand-red`) · using red for decorative borders (`COLORS.md:61` forbids).

---

## Foundation neutrals

### Black + tints (Black-50 → Black-900)

```css
--black: #000000;
--black-50: #fafafa;   /* near white — subtle bg */
--black-100: #f5f5f5;  /* lightest gray — card bg */
--black-200: #e5e5e5;  /* very light — borders */
--black-300: #d4d4d4;  /* light — disabled */
--black-400: #a3a3a3;  /* medium — placeholder */
--black-500: #737373;  /* gray — secondary text · utility icons */
--black-600: #525252;  /* dark — body alt */
--black-700: #404040;  /* darker — headings alt */
--black-800: #262626;  /* very dark — strong */
--black-900: #171717;  /* almost black — deep bg */
```

> OG inline comments verbatim above (`theme.css:285–294`)

**WHY a tint scale, not "gray"** — Mathematically tinting black to white in perceptual steps preserves a single brand temperature. Generic "neutral grays" would drift cool/warm against the warm-300 backdrop and feel un-paired.

**Common opacity patterns** (`COLORS.md:80–84`):
- `black/70` — body text default
- `black/50` — secondary text
- `black/8` — subtle borders (also `black/6` for disabled, `black/10` for default borders — see `theme.css:506` input system table)

### White + warm-tinted whites

```css
--white: #ffffff;
--white-900: #fafafa;   /* slightly off-white */
--white-800: #f5f5f5;   /* off-white */
```

**Modification risk** — Both white aliases overlap `--black-50` / `--black-100`. OG keeps them as semantic siblings — changing one without the other introduces visual breakage.

### Warm scale (warm-50 → warm-900) — the editorial identity

```css
--warm-50:  #fefdfd;    /* barely there overlays */
--warm-100: #fcfbfa;    /* hover bg */
--warm-200: #f9f7f6;    /* soft card bg */
--warm-300: #f5f2f1;    /* BASE — section bg (Challenges, Methodology) */
--warm-400: #f0ebe9;    /* alt bg */
--warm-500: #eae5e3;    /* borders */
--warm-600: #d9d1ce;    /* timeline base */
--warm-700: #c8bcb8;    /* timeline nodes */
--warm-800: #b7a9a3;    /* dark warm */
--warm-900: #a6968e;    /* darkest warm */
```

> OG inline: *"BASE - Current section backgrounds"* (`theme.css:308`)

**WHY warm not cool** — Warm-tinted off-white reads as paper · journal · editorial (NYT / Stripe / Medium lineage). A pure-gray section background reads as "system UI" and clashes with Noto Serif headings.

**Legacy aliases** (`theme.css:408–412`) — Kept for backwards compatibility · NEW code uses `--warm-*` scale:
- `--bg-warm` = `#f5f2f1` (= `--warm-300`)
- `--bg-warm-500` = `#eae5e3` (= `--warm-500`)
- `--bg-warm-600` = `#d9d1ce` (= `--warm-600`)
- `--bg-warm-700` = `#c8bcb8` (= `--warm-700`)
- `--bg-pure-black` = `#000000` · `--bg-pure-white` = `#ffffff`

---

## Decorative accents (3% slice)

### Purple — premium / innovation / insights (`theme.css:317–326`)

```css
--purple-50:  #f7f6fe;    /* lightest hl */
--purple-100: #efedfd;    /* hover states · cards */
--purple-200: #dfdcfb;    /* borders · dividers */
--purple-300: #c4bef7;    /* icons · badges */
--purple-400: #a89ff2;    /* secondary accents */
--purple-500: #9488ec;    /* standard interactive */
--purple-600: #806ce0;    /* BASE — premium / insights / content-icon */
--purple-700: #6c5bc0;    /* hover */
--purple-800: #5a4ba0;    /* active */
--purple-900: #483c80;    /* darkest text/accents */
```

**WHY purple** — Industry research (`tokens.ts:38` "premium · innovation") shows purple as the canonical "intelligence / insights" signal across analytics tools. Differentiates Ken from typical research-firm blue.

**Purple boundaries** (`COLORS.md:35–39` strict): purple = shadow-tint · content-icon `#806ce0` · badge-theme only. **Never** background · **never** text.

### Periwinkle — soft trust / reliability (`theme.css:329–338`)

```css
--periwinkle-50:  #fafbfe;
--periwinkle-100: #f5f6fd;
--periwinkle-200: #ebedfb;
--periwinkle-300: #dfe1f9;
--periwinkle-400: #d3d5f9;
--periwinkle-500: #c3c6f9;   /* BASE — trust indicators */
--periwinkle-600: #a7abf0;
--periwinkle-700: #8b90e0;
--periwinkle-800: #7075c8;
--periwinkle-900: #5a5fa0;
```

### Coral / Terracotta — warmth / energy (`theme.css:341–350`)

```css
--coral-50:  #fffbf9;
--coral-100: #fff5f1;
--coral-200: #ffebe4;
--coral-300: #fdd7cb;
--coral-400: #fbb8a7;
--coral-500: #f99b85;
--coral-600: #ea7a5f;    /* BASE — terracotta coral */
--coral-700: #d96548;
--coral-800: #c15138;
--coral-900: #a23f2d;
```

### Perano — light blue / calm / data (`theme.css:353–362`)

```css
--perano-50:  #fcfdfe;
--perano-100: #f9fbfe;
--perano-200: #f4f8fd;
--perano-300: #eff5fc;
--perano-400: #e9f2fb;
--perano-500: #dfeafa;   /* BASE — data sections */
--perano-600: #c8dff5;
--perano-700: #a7c9ed;
--perano-800: #86b3e5;
--perano-900: #6b94c0;
```

**Anti-pattern (all four families)** — Mixing >2–3 accent families per view creates "rainbow drift" (`COLORS.md:170`). Pick one accent per section.

---

## Semantic state colors

### Green — success / growth / positive (`theme.css:369–378`)
`--green-50 #ecfdf5` → `--green-500 #10b981` (BASE) → `--green-600 #059669` (impact metrics) → `--green-900 #064e3b`

### Amber — warning / caution (`theme.css:381–390`)
`--amber-50 #fffbeb` → `--amber-500 #f59e0b` (BASE) → `--amber-600 #d97706` (buttons) → `--amber-900 #78350f`

### Rose — error / destructive · DISTINCT from brand red (`theme.css:393–402`)
`--rose-50 #fff1f2` → `--rose-500 #f43f5e` (BASE) → `--rose-600 #e11d48` (destructive · delete) → `--rose-900 #881337`

> OG inline: *"DISTINCT from Brand Red"* — must never substitute (`theme.css:392 · COLORS.md:194`)

**WHY rose ≠ brand-red** — Brand red = conversion · rose = danger · same hue family but separate roles. Conflation breaks the conversion signal (user trains brain to fear red CTAs).

---

## Semantic text + label tokens (`theme.css:104–109`)

```css
--label-on-black:  rgba(255, 255, 255, 0.40);
--label-on-white:  rgba(0, 0, 0, 0.40);
--text-primary:    #000000;
--text-secondary:  rgba(0, 0, 0, 0.60);
```

**WHY 40% / 60% opacity not solid grays** — Opacity-on-bg makes labels auto-adapt to any surface. Solid grays would clash on warm-300 vs. white.

---

## Composition gradients (`theme.css:112 · tokens.ts:48–51`)

```css
--bg-composition-warm-editorial:
  linear-gradient(180deg, #faf9f8 0%, #f5f2f1 40%, #faf9f8 100%);
```
```ts
gradients = {
  primary:   'linear-gradient(90deg, #0a0a0a, #6a6a6a)',
  brandRed:  'linear-gradient(90deg, #b01f24, #c62d31)',
}
```

**Note** — `tokens.ts:32` exposes `red500: '#c62d31'` as "gradient end" but `theme.css:274` defines `--red-500: #dc3238`. **Mismatch** flagged for decision-phase reconciliation.

---

## Anti-patterns (master list)

| Anti-pattern | Where banned | Use instead |
|---|---|---|
| Raw hex inline `color: '#b01f24'` | `COLORS.md:257` | `color: 'var(--brand-red)'` |
| Tailwind `text-gray-500` | implicit | `text-black/50` or `var(--black-500)` |
| `--rose-*` for brand CTAs | `COLORS.md:204` | `--brand-red` |
| Purple as text/bg | `COLORS.md:35–39` | Reserve for shadow + icon + badge |
| Red borders / decoration | `COLORS.md:61` | `--black-200` or `black/10` |
| Mixing >2 accent families | `COLORS.md:170` | One accent per section |
| CSS shorthand inline for `border`/`background` | `COLORS.md:259` | Longhand (`borderColor` + `borderWidth` + `borderStyle`) |

---

## REUSABILITY SCORE
**5/5 ⭐⭐⭐⭐⭐** — Every component consumes color tokens. Zero exceptions across 100+ atoms/molecules/organisms.

## LINKED concepts
- **typography.md** — text colors apply via `var(--text-primary)` etc.
- **shadow.md** — accent shadows depend on `rgba(128,108,224,*)` (purple-600)
- **Badge.tsx** — 11-theme system maps each theme to a 50/500/600 triplet (purple · periwinkle · coral · perano · green · amber · rose · neutral · warm)
- **Button.tsx** — consumes `--brand-red` + `--brand-red-hover` + `--brand-red-active`
- **Card.tsx** — consumes purple-tinted shadow `rgba(128,108,224,0.08)`
- **iconColors** helper — `content: #806ce0` (= `--purple-600`) · `utility: #737373` (= `--black-500`)
- **Section recipes** (`LAYOUT.md:168–195`) — bg alternation black → white → warm-300 → white → warm-300 …
