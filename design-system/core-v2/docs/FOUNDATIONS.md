# FOUNDATIONS · @kenresearch/design-system v2

**Canonical reference · single source of truth · every primitive token w/ value + WWWWH (why · what · when · where · how).**

> READ FIRST · before any page or component build. Reference this file · NEVER invent token names. If a token isn't here, it doesn't exist.

---

## Cascade order (how tokens reach the page)

```
1. design-system/tokens/build/tokens.css     (DTCG · auto-gen · ~290 lines · unlayered :root)
   ↓ imported by
2. core-v2/styles/base.css                   (unlayered :root overrides + bindings · always wins)
   ↓ imported by
3. core-v2/styles/editorial-light.css        (variant overlay · @layer tokens · default)
   OR core-v2/styles/cinematic-dark.css      (variant overlay · @layer tokens · opt-in)
   ↓ imported by
4. consumer globals.css                      (@source directives + safelist + page-specific)
```

**RULE:** Variant CSS (Layer 3) must NOT redeclare anything Layer 2 sets unlayered · cascade trap (`feedback_css_layer_cascade_trop.md`). When in conflict, unlayered `:root {}` in base.css wins regardless of source order.

---

## Token namespace decision

DS exposes **BOTH long + short token names**. Pick whichever reads better in your context. Both resolve to identical value.

| Long (DTCG canonical) | Short (legacy convention · MATCHES v0_lite + report-store usage) |
|---|---|
| `var(--color-ramp-purple-300)` | `var(--purple-300)` |
| `var(--color-ramp-red-600)` | `var(--red-600)` · or `var(--brand-red)` for CTA semantic |
| `var(--color-ramp-warm-300)` | `var(--warm-300)` |
| `var(--color-foundation-black)` | `var(--black)` |
| `var(--typography-size-3xl)` | `var(--text-3xl)` |

**Canonical for new pages: SHORT names** (matches your existing legacy authoring pattern). Long names exist for compat w/ atoms that already use them. New pages = short.

---

## 1 · Colors

### 1.1 Foundation (`92% surface usage`)

| Token | Value | WHY |
|---|---|---|
| `--color-foundation-black` · `--black` | `#000000` | **Editorial-light text default** · Foundation neutral · 92% of all text surfaces |
| `--color-foundation-white` · `--white` | `#ffffff` | **Editorial-light bg default + cinematic-dark text** · Foundation neutral surface |

### 1.2 Brand (`5% surface usage · CTAs ONLY`)

| Token | Value | WHY · WHEN |
|---|---|---|
| `--color-brand-red` · `--brand-red` · `--red-600` | `#b01f24` | **Ken Bold Red** · primary CTA only · never decorative · never icon fills · never section bgs |
| `--brand-red-hover` · `--red-700` | `#8f181d` | Hover state on `--brand-red` CTAs · ~12% darker |
| `--brand-red-active` · `--red-800` | `#771419` | Active/pressed state on `--brand-red` CTAs |

### 1.3 Accent (`3% surface usage · highlights/shadows only`)

| Token | Value | WHY · WHEN |
|---|---|---|
| `--color-accent-purple` · `--purple-600` | `#806ce0` | **Purple accent** · data-card hover shadow tint · "premium features" labels · interactive data |
| `--color-accent-periwinkle` · `--periwinkle-500` | `#c3c6f9` | **Trust indicator** · subtle backgrounds · authority signals (analyst badges) |
| `--color-accent-perano` · `--perano-500` | `#dfeafa` | **Data section bg** · very subtle blue tint · chart backdrops |
| `--color-accent-warm` · `--warm-600` | `#d9d1ce` | **Neutral accent border** · muted dividers · soft chrome |
| `--color-accent-coral` · `--coral-500` | `#f99b85` | **Warmth/energy** · used on contrast badges · expert-profile accents |
| `--color-accent-teal` | `#00e5ff` | **Cinematic-dark ONLY** · glow/neon · never on editorial-light |

### 1.4 Red ramp (10-step · brand family)

```
--red-50:  #fef5f5   /* lightest tint · disabled CTA bg */
--red-100: #fde8e9   /* badge bg light */
--red-200: #fbd1d2   /* hover tint on red badges */
--red-300: #f5a3a6
--red-400: #e56d72
--red-500: #d23940   /* error semantic alias */
--red-600: #b01f24   /* === --brand-red · CANONICAL BRAND */
--red-700: #8f181d   /* === --brand-red-hover */
--red-800: #6e1317   /* === --brand-red-active */
--red-900: #4d0d10
```
Long names: `var(--color-ramp-red-{step})`

### 1.5 Black ramp (10-step · neutral grey)

```
--black-50:  #fafafa   /* almost-white · disabled bg */
--black-100: #f5f5f5   /* subtle hover bg */
--black-200: #e5e5e5   /* default border on light surface */
--black-300: #d4d4d4   /* divider · stronger border */
--black-400: #a3a3a3   /* placeholder text · muted icon */
--black-500: #737373   /* secondary text · utility icons · meta */
--black-600: #525252   /* body text on warm bg */
--black-700: #404040   /* heading-secondary */
--black-800: #262626   /* heading on light bg · near-black */
--black-900: #171717   /* darkest tier · never use #000 except CTAs */
```
Long names: `var(--color-ramp-black-{step})`

### 1.6 Warm ramp (editorial signature)

```
--warm-50:  #fefdfd   /* almost-white warm tint */
--warm-100: #fcfbfa
--warm-200: #f9f7f6   /* card bg on warm sections */
--warm-300: #f5f2f1   /* === --bg-warm · CANONICAL EDITORIAL SECTION BG */
--warm-400: #f0ebe9
--warm-500: #eae5e3   /* default border on warm cards */
--warm-600: #d9d1ce   /* === --color-accent-warm · stronger border */
--warm-700: #c8bcb8
--warm-800: #b7a9a3
--warm-900: #a6968e
```
Long names: `var(--color-ramp-warm-{step})`

### 1.7 Purple ramp (data/premium signal)

```
--purple-50:  #f7f6fe   /* purple tint hover bg */
--purple-100: #efedfd
--purple-200: #dfdcfb
--purple-300: #c4bef7   /* lighter purple text on dark bg · hero eyebrow */
--purple-400: #a89ff2
--purple-500: #9488ec
--purple-600: #806ce0   /* === --color-accent-purple · CANONICAL */
--purple-700: #6c5bc0
--purple-800: #5a4ba0
--purple-900: #483c80
```
Long names: `var(--color-ramp-purple-{step})`

### 1.8 Periwinkle ramp (trust)

```
--periwinkle-50:  #fafbfe
--periwinkle-100: #f5f6fd
--periwinkle-200: #ebedfb
--periwinkle-300: #dfe1f9
--periwinkle-400: #d3d5f9
--periwinkle-500: #c3c6f9   /* === --color-accent-periwinkle · CANONICAL */
--periwinkle-600: #a7abf0
--periwinkle-700: #8b90e0
--periwinkle-800: #7075c8
--periwinkle-900: #5a5fa0
```
Long names: `var(--color-ramp-periwinkle-{step})`

### 1.9 Perano ramp (data sections)

```
--perano-50:  #fcfdfe
--perano-100: #f9fbfe
--perano-200: #f4f8fd
--perano-300: #eff5fc
--perano-400: #e9f2fb
--perano-500: #dfeafa   /* === --color-accent-perano · CANONICAL */
--perano-600: #c8dff5
--perano-700: #a7c9ed
--perano-800: #86b3e5
--perano-900: #6b94c0
```
Long names: `var(--color-ramp-perano-{step})`

### 1.10 Coral ramp (warmth)

```
--coral-50:  #fffbf9
--coral-100: #fff5f1
--coral-200: #ffebe4
--coral-300: #fdd7cb
--coral-400: #fbb8a7
--coral-500: #f99b85   /* === --color-accent-coral · CANONICAL */
--coral-600: #ea7a5f   /* terracotta base */
--coral-700: #d96548
--coral-800: #c15138
--coral-900: #a23f2d
```
Long names: `var(--color-ramp-coral-{step})`

### 1.11 Utility · Green (success) · Amber (warning) · Rose (error)

```
/* GREEN · success only (CAGR up · check icons · status pills) */
--green-50:  #ecfdf5
--green-100: #d1fae5
--green-500: #10b981   /* base success */
--green-600: #059669   /* canonical success text · CAGR positive */
--green-700: #047857

/* AMBER · warning only (medium-risk · pending state) */
--amber-50:  #fffbeb
--amber-100: #fef3c7
--amber-400: #fbbf24
--amber-500: #f59e0b   /* base warning */
--amber-600: #d97706

/* ROSE · error/validation (DISTINCT from brand-red · form errors only) */
--rose-50:  #fff1f2
--rose-100: #ffe4e6
--rose-500: #f43f5e   /* base error · NOT for brand · forms only */
--rose-600: #e11d48
```

**WHY:** Brand-red is reserved for CTAs (5% rule). Form validation errors get `--rose-*` so error color never visually competes with conversion intent.

---

## 2 · Semantic ink (text alpha on white/black)

**Use these instead of raw rgba.** They encode contrast intent w/ AA-compliant alpha values.

### 2.1 Editorial-light (text on white/warm)

| Token | Value | WHEN |
|---|---|---|
| `--semantic-ink-strong` | `rgba(0,0,0,0.9)` | Primary headings · hover state |
| `--semantic-ink-body` | `rgba(0,0,0,0.8)` | Body text · list-card titles |
| `--semantic-ink-muted` | `rgba(0,0,0,0.6)` | Secondary text · dek · descriptions |
| `--semantic-ink-subtle` | `rgba(0,0,0,0.45)` | Meta lines · eyebrow · link tier |
| `--semantic-ink-faint` | `rgba(0,0,0,0.35)` | Counts · ranks · very-muted |
| `--semantic-ink-whisper` | `rgba(0,0,0,0.18)` | Dot separators · dividers as text-color |

### 2.2 Cinematic-dark (text on `#0a0a0c`)

| Token | Value | WHEN |
|---|---|---|
| `--semantic-ink-on-dark-strong` | `rgba(255,255,255,0.92)` | Hero H1 · primary headings on dark |
| `--semantic-ink-on-dark-body` | `rgba(255,255,255,0.75)` | Body on dark · descriptions |
| `--semantic-ink-on-dark-muted` | `rgba(255,255,255,0.62)` | Dek · secondary on dark |
| `--semantic-ink-on-dark-subtle` | `rgba(255,255,255,0.45)` | Eyebrow · counts on dark |
| `--semantic-ink-on-dark-faint` | `rgba(255,255,255,0.30)` | Very muted on dark |
| `--semantic-ink-on-dark-whisper` | `rgba(255,255,255,0.18)` | Dot · divider on dark |

### 2.3 Variant-bound aliases (auto-switch by `[data-variant]`)

| Alias | Editorial-light value | Cinematic-dark value |
|---|---|---|
| `--surface-bg` | `#ffffff` | `#0a0a0c` |
| `--surface-text` | `#000000` | `#fafafa` |
| `--surface-text-muted` | `rgba(0,0,0,0.80)` | `rgba(250,250,250,0.65)` |
| `--surface-text-subtle` | `rgba(0,0,0,0.60)` | `rgba(250,250,250,0.40)` |

**HOW:** Use `--surface-*` for variant-aware text/bg · use `--semantic-ink-*` for explicit variant-locked text.

---

## 3 · Hairlines / borders

| Token | Value | WHEN |
|---|---|---|
| `--semantic-hairline-strong` · `--border-strong` | `rgba(0,0,0,0.18)` | Hover-state borders · "selected" state |
| `--semantic-hairline-default` · `--border-default` | `rgba(0,0,0,0.12)` | Default card/input border on light surface |
| `--semantic-hairline-soft` · `--border-soft` | `rgba(0,0,0,0.08)` | Subtle card border · default |
| `--semantic-hairline-faint` | `rgba(0,0,0,0.07)` | Subtle dividers · table rules |
| `--semantic-hairline-on-dark-default` | `rgba(255,255,255,0.12)` | Default on cinematic-dark |
| `--semantic-hairline-on-dark-soft` | `rgba(255,255,255,0.10)` | Subtle on cinematic-dark |

---

## 4 · Surface tints (hover/selected backgrounds)

| Token | Value | WHEN |
|---|---|---|
| `--semantic-surface-tint-soft` · `--tint-soft` | `rgba(0,0,0,0.025)` | Hover row · table list hover |
| `--semantic-surface-tint-default` · `--tint-default` | `rgba(0,0,0,0.04)` | Selected row · ghost button hover |
| `--semantic-surface-tint-strong` · `--tint-strong` | `rgba(0,0,0,0.06)` | Active row · pressed state |
| `--semantic-surface-white-glass` | `rgba(255,255,255,0.95)` | Sticky bars w/ backdrop-filter blur |
| `--semantic-surface-cinematic-1` | `#1a1a1c` | Toaster · raised dark surface |
| `--semantic-surface-cinematic-2` | `#111113` | Dark card surface |
| `--semantic-scrim` | `rgba(0,0,0,0.5)` | Modal/sheet backdrop overlay |

---

## 5 · Section backgrounds (variant-bound · drives recipe alternation)

| Token | Editorial-light | Cinematic-dark | WHEN |
|---|---|---|---|
| `--section-bg-primary` | `#ffffff` | `#111114` | Default section · most sections |
| `--section-bg-accent` | `#f5f2f1` (warm-300) | `#1a1a1e` | Alternation break · every ~3rd |
| `--section-bg-contrast` | `#000000` | `#050506` (deep) | Hero · resources · contrast moments |
| `--section-bg-mesh` | `transparent` | `transparent` | DarkGradientMesh component supplies bg |

**HARD GATE:** Recipe alternation enforced by `scripts/lint-section-alternation.mjs`. Hand-picking section bg in page code violates recipe lock.

---

## 6 · Status colors (success/warning/error/info)

| Token | text | bg | border |
|---|---|---|---|
| `--semantic-status-success-*` | `#166534` | `#f0fdf4` | `#bbf7d0` |
| `--semantic-status-warning-*` | `#92400e` | `#fffbeb` | `#fde68a` |
| `--semantic-status-error-*` | `#991b1b` | `#fef2f2` | `#fecaca` |
| `--semantic-status-info-*` | `#1e40af` | `#eff6ff` | `#bfdbfe` |

Hover variants: `--semantic-status-{success|warning|error|info}-{bg|border}-hover` (e.g. `--semantic-status-success-bg-hover: #dcfce7`).

---

## 7 · Typography

### 7.1 Family

| Token | Value | WHEN |
|---|---|---|
| `--typography-family-display` · `--font-serif` | `var(--font-noto-serif), 'Noto Serif', Georgia, ...` | Headings · hero · editorial · NEVER body/buttons |
| `--typography-family-body` · `--font-sans` | `var(--font-dm-sans), 'DM Sans', -apple-system, ...` | Body · UI · buttons · labels · nav |
| `--typography-family-mono` | `'SF Mono', 'Fira Code', ...` | Code · data display only |

**CRITICAL:** Next/font CSS vars (`--font-noto-serif` · `--font-dm-sans`) bind in `base.css :root`. Variants MUST NOT redeclare. String-literal redeclaration kills Next/font var resolution → Georgia fallback.

### 7.2 Scale (Major Third · 1.25× ratio)

| Long (canonical) | Short alias | Value | px | WHEN |
|---|---|---|---|---|
| `--typography-size-2xs` | `--text-2xs` | `0.6875rem` | 11 | Micro labels · badges · compact metadata (short alias added 2026-05-15 for project ref parity) |
| `--typography-size-xs` | `--text-xs` | `0.8rem` | 12.8 | Labels · metadata · categories · eyebrows |
| `--typography-size-compact` | `--text-compact` | `0.875rem` | 14 | Compact body · 4+ card grids |
| `--typography-size-nav` | `--text-nav` | `0.875rem` | 14 | Nav · TOC items · compact CTAs |
| `--typography-size-sm` | `--text-sm` | `1rem` | 16 | **BODY DEFAULT · 90% of text** |
| `--typography-size-base` | `--text-base` | `1.25rem` | 20 | Large body · card titles (4+ cards) |
| `--typography-size-lg` | `--text-lg` | `1.563rem` | 25 | Card titles (2–3 cards) |
| `--typography-size-xl` | `--text-xl` | `1.953rem` | 31.25 | Subsection headings (h3) |
| `--typography-size-2xl` | `--text-2xl` | `2.441rem` | 39 | **Section headings (h2)** |
| `--typography-size-3xl` | `--text-3xl` | `3.052rem` | 48.8 | **Hero h1 · final CTA h2 ONLY** |
| `--typography-size-4xl` | `--text-4xl` | `3.815rem` | 61 | Extra-large headings · challenge card numbers |
| `--typography-size-5xl` | `--text-5xl` | `4.768rem` | 76.3 | Massive headings · future use |

### 7.3 Weight

```
--typography-weight-light:   300   /* heading default · serif H1/H2 */
--typography-weight-normal:  400   /* body default */
--typography-weight-medium:  500
--typography-weight-bold:    700
--typography-weight-black:   900
```

### 7.4 Line height · long names (DTCG) + short aliases

Both work. Short = Tailwind class convention (Tailwind `leading-tight` maps to `--leading-tight`).

| Short alias | Long name | Value | WHEN |
|---|---|---|---|
| `--leading-none` | — | `1` | Display + hero numbers · tight optical |
| `--leading-tight` | `--typography-line-height-tight` | `1.1` | 4xl-5xl headings |
| `--leading-snug` | `--typography-line-height-snug` | `1.3` | Section h2 |
| `--leading-normal` | `--typography-line-height-normal` | `1.5` | Card titles · compact text |
| `--leading-relaxed` | `--typography-line-height-relaxed` | `1.6` | **Body default** · descriptions |
| `--leading-loose` | — | `1.75` | Editorial long-form prose |
| `--leading-nav` | `--typography-line-height-nav-primary` | `1.4` | Nav text · TOC items |

### 7.5 Letter spacing (tracking)

| Token | Value | WHEN |
|---|---|---|
| `--tracking-tightest` | `-0.05em` | Massive display (5xl+) · optical correction |
| `--tracking-tighter` | `-0.025em` | Hero h1 · large headings |
| `--tracking-tight` | `-0.01em` | Section h2 · subtle |
| `--tracking-normal` | `0` | Body default |
| `--tracking-wide` | `0.025em` | Small caps · button text |
| `--tracking-wider` | `0.05em` | Eyebrow labels · uppercase tags |
| `--tracking-widest` | `0.1em` | Section labels (CHAPTER 1) · 3px at 16px base |
| `--tracking-label` | `1.8px` | OG canonical eyebrow (CASE STUDY) |
| `--tracking-hero` | `-0.5px` | OG canonical hero h1 negative |

### 7.6 Font Pairing by Role (canon · V0_lite + RS-legacy verified)

The single source of truth for font/weight/tracking/leading by role. Every component MUST resolve a role from this table before deciding typography.

| Role | Font | Weight | Tracking | Leading | Size token | Reasoning |
|---|---|---|---|---|---|---|
| H1 hero | Noto Serif | 300 | -0.02em | 1.2 | `--text-3xl` + clamp | Editorial voice · light prevents bulk at 48.8px+ · tight tracking corrects optical loosening |
| H2 section | Noto Serif | 300 | -0.02em | 1.2-1.3 | `--text-xl → --text-2xl` (step) | Continues editorial register · light harmonizes w/ H1 |
| H3 subsection | Noto Serif | 300 | -0.01em | 1.3 | `--text-lg → --text-xl` (step) | Stays serif at 25-31px (>=XL threshold) |
| H4 card title | DM Sans | 500 | normal | 1.4 | `--text-base` (20px) | Drops to sans · serif loses clarity below 25px in dense UI |
| H5 dense card | DM Sans | 500 | normal | 1.4 | `--text-base` | Same size, weight differentiates from H4 |
| Eyebrow / Label | DM Sans | 600 | 0.2em (`--tracking-widest`) | 1.5 | `--text-xs` (12.8px) | Wide tracking + UPPERCASE = functional label · sans always |
| Body paragraph | DM Sans | 400 | normal | 1.6-1.7 (`--leading-relaxed`) | `--text-sm` (16px) | Readability default · relaxed leading for long-form |
| Body lede / subtitle | DM Sans | 400 | normal | 1.625 | `--text-sm` or `--text-base` | Sub-display copy stays sans · contrasts serif headline |
| Button primary | DM Sans | 700 | normal | 1.5 | `--button-font-md` (16px) | Bold = action confidence |
| Button secondary | DM Sans | 500 | normal | 1.5 | `--button-font-md` | Step-down weight signals secondary |
| Meta / caption | DM Sans | 400 | normal | 1.5 | `--text-xs` (12.8px) | Smallest readable · regular weight max legibility |
| Badge / pill | DM Sans | 600 | 0.15-0.2em | 1.5 | `--text-xs` | Same eyebrow logic — labels not display |
| Stat numeral (editorial display) | Noto Serif | 300 | tight | 1.0-1.1 | `--text-3xl` / `--text-4xl` | Hero stat = display moment · serif claims authority |
| Stat numeral (data table) | DM Sans | 600 + `tabular-nums` | normal | 1.2 | `--text-base` | Functional data · tabular alignment trumps serif |
| Testimonial quote body | Noto Serif | 300 | normal | 1.625 (`relaxed`) | `--text-lg` (25px) | The ONE body-serif exception · quote = editorial moment |
| Table header | DM Sans | 600 | 0.05em | 1.5 | `--text-xs` or `--text-sm` | Slight tracking for scannability |
| Table cell | DM Sans | 400 (+`tabular-nums` if numeric) | normal | 1.5 | `--text-sm` | Tabular figures for numeric column alignment |
| Nav link | DM Sans | 500 | normal | 1.4 (`--leading-nav`) | `--text-nav` (14px) | Slightly tighter than body · UI register |

**Universal section-header trio:** Sans eyebrow (600 uppercase 0.2em) → Serif H2 (300 light · -0.02em) → Sans body (400 relaxed). This 3-line pattern repeats across EVERY section in both legacy projects · canonized.

---

## 8 · Spacing — TWO SYSTEMS coexist

**OG canonical** (theme.css L566-581): named-step `--space-*` scale · CSS vars · what every OG component uses.

**Tailwind utility scale** (`--spacing-0..24` numeric · auto from Tailwind config): for utility classes like `p-8` `gap-6`.

**Both work.** Pick by context — `style={{padding: 'var(--space-xl)'}}` AND `className="p-8"` are both correct (both = 32px).

### 8.1 OG named scale · CSS vars · canonical for component-internal styling

| Token | Value | px | WHEN |
|---|---|---|---|
| `--space-2xs` | `0.25rem` | 4 | Hairline gap · icon-text micro-gap |
| `--space-xs` | `0.5rem` | 8 | Tight pair · button icon gap |
| `--space-sm` | `0.75rem` | 12 | Label-to-content · card row gap |
| `--space-md` | `1rem` | 16 | **Card padding DEFAULT** · gap default |
| `--space-lg` | `1.5rem` | 24 | Generous card padding · section content gap |
| `--space-xl` | `2rem` | 32 | Large card padding · section-internal gap |
| `--space-2xl` | `3rem` | 48 | Section header bottom margin |
| `--space-3xl` | `4rem` | 64 | Between-section gap (mobile/tablet) |
| `--space-4xl` | `6rem` | 96 | Between-section gap (desktop) |
| `--space-5xl` | `8rem` | 128 | Cinematic hero vertical · rare |

Numeric aliases: `--space-4` = `--space-md` (16) · `--space-6` = `--space-lg` (24) · `--space-12` = `--space-2xl` (48).

Card-specific: `--card-padding-sm` 12 · `--card-padding-md` 16 · `--card-padding-lg` 24.

### 8.2 Tailwind utilities · for inline classNames

| Tailwind class | Value | px |
|---|---|---|
| `p-1` / `gap-1` | 0.25rem | 4 |
| `p-2` / `gap-2` | 0.5rem | 8 |
| `p-3` / `gap-3` | 0.75rem | 12 |
| `p-4` / `gap-4` | 1rem | 16 |
| `p-6` / `gap-6` | 1.5rem | 24 |
| `p-8` / `gap-8` | 2rem | 32 |
| `p-12` / `gap-12` | 3rem | 48 |
| `p-16` / `gap-16` | 4rem | 64 |
| `p-20` / `gap-20` | 5rem | 80 |
| `p-24` / `gap-24` | 6rem | 96 |

### 8.3 Section vertical padding (variant-bound)

```
--section-py-mobile:    3rem    /* 48px · py-12 */
--section-py-tablet:    4rem    /* 64px · py-16 */
--section-py-desktop:   5rem    /* 80px · py-20 */
--section-py-standard:  3rem    /* py-12 default */
```

### 8.4 Section composition helpers (canonical pairings · REASONED)

The single source of truth for vertical rhythm inside sections. Use these tokens NOT raw `mb-N` classes for header-internal gaps. See R3.7 in RULES.md for canonical rhythm rule.

```
--section-header-mb:         2.5rem    /* 40px · header trio → content grid · "header ends here" declarator */
--pair-label-heading:        0.75rem   /* 12px · eyebrow → H2 · tight semantic pairing */
--pair-heading-description:  0.75rem   /* 12px · H2 → subtitle · matches eyebrow→H2 = visual rhythm consistency */
--text-measure:              43.75rem  /* 700px · max-width for readable body (50-75 chars/line Baymard) */
```

| Gap | Token | Class | Use case | Reasoning |
|---|---|---|---|---|
| Eyebrow → H2 | `--pair-label-heading` | `mb-3` | Below every eyebrow | Tight pairing = semantic relationship · 12px clear gap without orphaning |
| H2 → subtitle | `--pair-heading-description` | `mt-3` | Below H2 when subtitle follows | Matches eyebrow→H2 = consistent rhythm |
| Subtitle → CTA / content | n/a | `mb-8 sm:mb-10` | Below section subtitle before grid/CTA | Larger gap separates header-trio from body |
| Header-trio → content grid | `--section-header-mb` | `mb-10` | Below entire (eyebrow+H2+sub) block | 40px declares "header ends" · editorial convention |
| Stack gap default | `--space-lg` (24px) | `space-y-6` | Vertical sibling rhythm in hero / content blocks | 24px = half of 40px section-header-mb · scales harmonically |
| Stack gap tight | `--space-md` (16px) | `space-y-4` | List items · dense card stacks | One step down from default |
| Grid gap standard | `--space-md → --space-lg` | `gap-4 sm:gap-6` | Card grids · content grids | Mobile tight → desktop loose · matches container px rhythm |
| Grid gap generous | `--space-xl → --space-3xl` | `gap-8 sm:gap-12 md:gap-16` | Stat columns · hero key-numbers | Editorial breathing where density would dilute hierarchy |
| Card title → meta | `--space-sm` (12px) | `mb-3` | Card title row → meta row | Same 12px pairing rhythm as section header |

### 8.5 Button geometry (canonical · verbatim from V0_lite + RS-legacy)

Button geometry tokens are IDENTICAL across both legacy projects = strongest canon. Use these tokens NOT inline `h-N w-N` classes.

```
/* Heights */
--button-height-xs: 1.75rem;   /* 28px · card footer CTAs ONLY */
--button-height-sm: 2.5rem;    /* 40px · navbar · TOC unlock */
--button-height-md: 3rem;      /* 48px · DEFAULT · mobile-tap-safe (44px WCAG cleared) */
--button-height-lg: 3.5rem;    /* 56px · homepage heroes only */
--button-height-xl: 4rem;      /* 64px · cinematic hero only */

/* Horizontal padding (generous = CTA importance signal) */
--button-px-xs: 1rem;          /* 16px */
--button-px-sm: 1.25rem;       /* 20px */
--button-px-md: 1.75rem;       /* 28px · DEFAULT */
--button-px-lg: 2.25rem;       /* 36px */
--button-px-xl: 2.5rem;        /* 40px */

/* Font size (matches type scale) */
--button-font-xs: 0.8rem;      /* 12.8px = --text-xs */
--button-font-sm: 0.875rem;    /* 14px = --text-nav */
--button-font-md: 1rem;        /* 16px = --text-sm */
--button-font-lg: 1.125rem;    /* 18px */
--button-font-xl: 1.125rem;    /* 18px */

/* Min-width (prevents wobble on short labels "OK" "Buy") */
--button-min-w-xs: 4rem;       /* 64px */
--button-min-w-sm: 5rem;       /* 80px */
--button-min-w-md: 7rem;       /* 112px · DEFAULT */
--button-min-w-lg: 9rem;       /* 144px */
--button-min-w-xl: 10rem;      /* 160px */
```

**Reasoning:** md (48px) = default · WCAG 44px tap-target cleared with 4px margin · 4pt grid alignment · px 28 generous declares CTA importance · min-width 112 prevents text-wobble on short labels.

### 8.1 Section vertical padding (variant-bound)

```
--section-py-mobile:    3rem    /* 48px · py-12 */
--section-py-tablet:    4rem    /* 64px · py-16 */
--section-py-desktop:   5rem    /* 80px · py-20 */
--section-py-standard:  3rem    /* py-12 default */
```

Use via `SectionWrapper` atom · its `spacing` prop maps to these.

### 8.2 Responsive page padding

```
--padding-mobile:   1rem      /* 16px · px-4 */
--padding-tablet:   1.5rem    /* 24px · sm:px-6 */
--padding-desktop:  2rem      /* 32px · md:px-8 */
```

### 8.3 Section composition helpers

```
--section-header-mb:         3rem      /* 48px · gap after section header block */
--pair-label-heading:        0.75rem   /* 12px · gap section label → heading */
--pair-heading-description:  1rem      /* 16px · gap heading → description */
--text-measure:              43.75rem  /* 700px · max-width for readable text blocks */
```

---

## 9 · Containers (max-width)

| Token | Value | WHEN |
|---|---|---|
| `--container-page` | `75rem` (1200) | Full page shell · hero bgs · navbar |
| `--container-content` | `62.5rem` (1000) | Standard sections · card grids · main content **DEFAULT** |
| `--container-narrow` | `56.25rem` (900) | CTAs · testimonials · focused content |
| `--container-prose` | `43.75rem` (700) | Paragraph text · body copy (65–75 chars/line) |
| `--container-compact` | `37.5rem` (600) | Tight descriptions · methodology blurbs |

---

## 10 · Border Radius · OG canonical 5px-increment scale

10-step scale · OG canonical (theme.css L474-491).

| Token | Value | WHEN |
|---|---|---|
| `--radius-0` | `0px` | Sharp corners · rare |
| `--radius-2xs` | `2.5px` | Logos · icons · sub-element details · checkboxes |
| `--radius-xs` | `5px` | **PRIMARY** · buttons · inputs · small cards · badges |
| `--radius-sm` | `10px` | Medium cards · form groups · panels |
| `--radius-md` | `15px` | Feature cards · modals · large buttons |
| `--radius-lg` | `20px` | Hero cards · large containers · dashboards |
| `--radius-xl` | `25px` | Large modals · feature sections |
| `--radius-2xl` | `30px` | Extra-large cards · floating panels |
| `--radius-3xl` | `35px` | Hero sections · landing blocks |
| `--radius-full` | `9999px` | Pills · avatars · dots |

### Semantic aliases (role-based · OG canonical)

| Alias | Resolves to | WHEN |
|---|---|---|
| `--radius-element` | `var(--radius-xs)` = 5px | Buttons · inputs · tags · icon containers |
| `--radius-inner` | `var(--radius-2xs)` = 2.5px | Skeleton shims · checkbox marks |
| `--rc-radius-card` | `var(--radius-sm)` = 10px | Card containers (ResourceCard) |
| `--rc-radius-card-inner` | `var(--radius-xs)` = 5px | Nested elements inside cards |
| `--rc-radius-image` | `var(--radius-2xs)` = 2.5px | Thumbnails · small images |

### Legacy aliases (tokens.css primitives · auto-resolve via DTCG)

| Token | Value | Maps to |
|---|---|---|
| `--radius-image` | `2.5px` | = `--radius-2xs` |
| `--radius-button` | `5px` | = `--radius-xs` |
| `--radius-card` | `10px` | = `--radius-sm` |
| `--radius-pill` | `9999px` | = `--radius-full` |

---

## 11 · Elevation / Shadow · OG canonical (theme.css L546-555)

5 neutral levels + 3 purple-accent levels. Single-layer simple rgba (OG style).

### Neutral shadows

| Token | Value | WHEN |
|---|---|---|
| `--shadow-none` | `none` | Reset · flat |
| `--shadow-sm` | `0 1px 3px rgba(0,0,0,0.08)` | Subtle · cards default · resting state |
| `--shadow-md` | `0 4px 12px rgba(0,0,0,0.12)` | Default card lift · dropdowns · tooltips |
| `--shadow-lg` | `0 8px 24px rgba(0,0,0,0.15)` | Hover state · modals · raised |
| `--shadow-xl` | `0 12px 32px rgba(0,0,0,0.18)` | Floating CTA · BackToTop FAB |
| `--shadow-2xl` | `0 20px 48px rgba(0,0,0,0.24)` | Highest elevation · overlays |

### Purple-accent shadows (premium · data-card · interactive)

| Token | Value | WHEN |
|---|---|---|
| `--shadow-accent-sm` | `0 2px 8px rgba(128,108,224,0.15), 0 1px 3px rgba(0,0,0,0.08)` | Subtle premium hint · card rest |
| `--shadow-accent-md` | `0 8px 24px rgba(128,108,224,0.24), 0 2px 8px rgba(0,0,0,0.12)` | **Card hover · interactive data signal** |
| `--shadow-accent-lg` | `0 16px 40px rgba(128,108,224,0.32), 0 4px 12px rgba(0,0,0,0.15)` | Featured premium card · highest emphasis |

### Aliases (back-compat · resolve to OG values)

| Token | Resolves to | WHEN |
|---|---|---|
| `--shadow-card-hover` | `var(--shadow-accent-md)` | Card hover · interactive data variant |
| `--shadow-card-hover-soft` | `var(--shadow-accent-sm)` | Subtle hover lift |
| `--shadow-premium` | dual-layer black | Editorial card lift (non-purple) |
| `--shadow-inset-soft` | `inset 0 1px 2px rgba(0,0,0,0.06)` | Recessed UI · form fields |

---

## 12 · Motion · long names (DTCG · ms primitives) + short aliases (with ms unit · CSS-ready)

### 12.1 Duration

| Short alias | Long name (DTCG · raw ms) | Value | WHEN |
|---|---|---|---|
| `--duration-instant` | `--motion-duration-instant` | `100ms` | Micro feedback · button press |
| `--duration-fast` | `--motion-duration-fast` | `200ms` | Hover · focus · simple transitions |
| `--duration-normal` | `--motion-duration-normal` | `300ms` | Default UI transitions |
| `--duration-slow` | `--motion-duration-slow` | `500ms` | Section reveals · modals |
| `--duration-slower` | `--motion-duration-slower` | `800ms` | Hero entrance · cinematic timeline |
| `--duration-slowest` | `--motion-duration-slowest` | `1200ms` | Long-form scroll-driven |

### 12.2 Easing curves

| Token | Value | WHEN |
|---|---|---|
| `--ease-linear` | `linear` | Constant motion · loading spinners |
| `--ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | **Default UI exit** · hover · focus |
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | Hero entrance · expressive reveals |
| `--ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | Symmetric · button hover · subtle |
| `--ease-in-out-quart` | `cubic-bezier(0.77, 0, 0.175, 1)` | Slow symmetric · cinematic timeline |
| `--ease-spring` | `cubic-bezier(0.5, 1.5, 0.5, 1)` | Bouncy snap · use sparingly |

### 12.3 Stagger (Framer staggerChildren)

| Token | Value | WHEN |
|---|---|---|
| `--stagger-tight` | `40ms` | Tight card stagger · 6+ items |
| `--stagger-default` | `80ms` | Default Framer staggerChildren |
| `--stagger-loose` | `150ms` | Max before feels disjointed |

### 12.4 Composite transitions (ready-to-use)

```css
--transition-fast:      all 200ms ease-out
--transition-normal:    all 300ms ease-out
--transition-slow:      all 500ms ease-out-expo
--transition-color:     color 200ms · bg 200ms · border 200ms (parallel)
--transition-shadow:    box-shadow 300ms ease-out
--transition-transform: transform 300ms ease-out
```

Use: `style={{ transition: 'var(--transition-fast)' }}` or `className="transition-[var(--transition-color)]"`.

**A11y:** Always wrap motion in `useReducedMotion()` check (Framer hook) · DS `base.css` also forces `animation-duration: 0.01ms` global override under `prefers-reduced-motion`.

---

## 13 · Button (component primitives)

### 13.1 Height (matches OG · 4pt grid)

```
--button-height-sm:  40px
--button-height-md:  48px   /* DEFAULT · touch-target compliant */
--button-height-lg:  56px
--button-height-xl:  64px
```

### 13.2 Horizontal padding

```
--button-px-sm:  20px
--button-px-md:  28px
--button-px-lg:  32px
--button-px-xl:  40px
```

### 13.3 Min-width (prevents text-only collapse)

```
--button-min-width-sm:  96px
--button-min-width-md:  120px
--button-min-width-lg:  144px
--button-min-width-xl:  168px
```

### 13.4 Font size

```
--button-font-sm:  0.875rem   /* 14px */
--button-font-md:  1rem        /* 16px · OG canonical */
--button-font-lg:  1.0625rem   /* 17px */
```

---

## 14 · Z-index (stacking discipline) · long + short aliases

| Short alias | Long name | Value | WHEN |
|---|---|---|---|
| `--z-base` | `--z-index-base` | `0` | Default page content |
| `--z-dropdown` | `--z-index-dropdown` | `10` | Dropdown menus · simple tooltips |
| `--z-sticky` | `--z-index-sticky` | `20` | Sticky header · TOC sidebar |
| `--z-fab` | `--z-index-fab` | `30` | Floating CTA · BackToTop |
| `--z-overlay` | `--z-index-overlay` | `40` | Modal backdrop scrim |
| `--z-modal` | `--z-index-modal` | `50` | Modal dialogs |
| `--z-popover` | `--z-index-popover` | `60` | Tooltips · dropdown menus |
| `--z-toast` | `--z-index-toast` | `70` | Toast messages · alerts |
| `--z-max` | `--z-index-max` | `9999` | Last resort only |

---

## 15 · Brand red alpha (legitimate brand-red transparent usage)

```
--semantic-brand-red-alpha-12:  rgba(176,31,36,0.12)   /* hover wash */
--semantic-brand-red-alpha-30:  rgba(176,31,36,0.30)
--semantic-brand-red-alpha-65:  rgba(176,31,36,0.65)   /* "Featured" badge bg over images · WCAG AAA */
--semantic-brand-red-alpha-80:  rgba(176,31,36,0.80)   /* Image-overlay badge border */
```

---

## 16 · Composition tokens (multi-stop gradients)

```
--composition-gradient-cinematic-base:           linear-gradient(180deg, #0f0f0f 0%, #1a1a1a 50%, #0f0f0f 100%)
--composition-gradient-brand-red-cta:            linear-gradient(90deg, #b01f24 0%, #c62d31 100%)
--composition-gradient-brand-red-shimmer:        linear-gradient(90deg, #b01f24 0%, #eb484e 50%, #b01f24 100%)
--composition-gradient-brand-dark-shimmer:       linear-gradient(90deg, #141016 0%, #656565 50%, #141016 100%)
--composition-gradient-navbar-hover-glow-narrow: radial-gradient(ellipse 32.5px 15.5px at center, rgba(128,108,224,1) 0%, rgba(128,108,224,0) 100%)
--composition-gradient-navbar-hover-glow-wide:   radial-gradient(ellipse 72.78px 15.5px at center, rgba(128,108,224,1) 0%, rgba(128,108,224,0) 100%)
```

Cinematic overlays (used by `DarkGradientMesh` component):

```
--composition-gradient-cinematic-overlay-tl: radial-gradient(circle at top left, rgba(76,95,215,0.15) 0%, ..., transparent 60%)
--composition-gradient-cinematic-overlay-tr: radial-gradient(circle at top right, rgba(124,58,237,0.18) 0%, ...)
--composition-gradient-cinematic-overlay-bl: radial-gradient(circle at bottom left, rgba(5,150,105,0.14) 0%, ...)
--composition-gradient-cinematic-overlay-br: radial-gradient(circle at bottom right, rgba(194,65,12,0.16) 0%, ...)
```

### 16.1 · Blur-blob composition pattern (CANONICAL · Hero + CTA section bgs)

**Added 2026-05-15.** This is the CANONICAL approach for Hero and CTA section backgrounds across Ken Research. Do NOT use a simple solid color, a plain brand-red gradient, or a single radial gradient — those are Cat 13.10 anti-patterns for these surfaces.

#### What it is

A multi-layer glow blob composition: 3-5 large radial orbs (300–700px diameter, 100–180px blur, 3–15% opacity) positioned at corners and center over a base bg gradient. Layers in order:

1. **Base bg** — Tailwind gradient-to-br or solid black/white
2. **Optional gradient overlay** — full-inset diagonal tint (CTA sections only)
3. **Glow blobs** — large `rounded-full` divs with `blur-[Npx]` and `opacity-[0.N]`; colors from the 3% accent palette (coral · perano · periwinkle · amber · purple-600)
4. **Noise overlay** — SVG feTurbulence at `opacity-[0.02]` + `mix-blend-overlay` for film-grain texture
5. **Edge vignette** — radial gradient darkening/warming the frame edges
6. **Top hairline** — 1px horizontal gradient for section separator

#### Which tokens to use for blob colors

Use only declared ramp tokens — never hex in blob className:

| Palette slot      | Token                  | Use case                                      |
|-------------------|------------------------|-----------------------------------------------|
| Purple (content)  | `var(--purple-600)`    | darkPremium / light variants — cool premium   |
| Periwinkle (trust)| `var(--periwinkle-500)`| Light hero — diagonal tension with perano     |
| Perano (sky)      | `var(--perano-500)`    | Light hero + warm editorial — cool contrast   |
| Coral (warmth)    | `var(--coral-500)`     | Ember / CTA dark — primary warm anchor        |
| Coral light       | `var(--coral-400)`     | Ember / warm editorial — secondary warm layer |
| Amber (golden)    | `var(--amber-200)`     | Ember variant — golden lower-card warmth      |
| Brand-red ghost   | `var(--brand-red)`     | CTA dark only · 6% ghost tint for depth ONLY  |

#### color-mix() usage

`color-mix()` is allowed in this pattern per §16 special-case rules. Use it for:
- Blob opacity via Tailwind arbitrary: `bg-[color-mix(in_srgb,var(--coral-500)_12%,transparent)]`
- Border-color on overlay cards: `color-mix(in srgb, var(--purple-600) 20%, transparent)`

Never use `color-mix()` for general text color tinting — that remains anti-pattern (see §20).

#### Source files

- Theme configs: `src/lib/heroThemes.ts` · `src/lib/ctaThemes.ts`
- Render atoms: `src/atoms/HeroBackground.tsx` · `src/atoms/CTABackground.tsx`
- Reference page: `src/patterns/sample/` (add after atom promotion)

See also: §17 Charts → colour palette cross-ref.

---

## 17 · Charts (Highcharts palette + axis tokens)

```
--chart-palette-1:    #b01f24   /* Ken red · primary series */
--chart-palette-2:    #262626   /* black-800 · foundation neutral */
--chart-palette-3:    #806ce0   /* purple accent · 3% slot */
--chart-palette-4:    #a6968e   /* warm-900 · foundation tint */
--chart-palette-5:    #c3c6f9   /* periwinkle · trust */
--chart-palette-6:    #d96548   /* coral-700 · warm accent */
--chart-palette-7:    #737373   /* black-500 */
--chart-palette-8:    #dfeafa   /* perano-500 · subtle */
--chart-palette-blue: #4a6ea8   /* medium blue · WCAG AA on white+warm · data series · added 2026-05-15 */
--chart-palette-green-bright: #22c55e  /* Tailwind green-500 parity · active-state dots · added 2026-05-15 */

/* NOTE · NO --bg-composition-brand-cta token · R1.2 strict.
   brand-red is BUTTON-only · NOT section-bg.
   CTA sections (FinalCTA/CTABanner) use background="black|white|warm" + brand-red Button inside. */

--chart-axis-label:    rgba(0,0,0,0.6)    /* = --semantic-ink-muted */
--chart-axis-title:    rgba(0,0,0,0.8)    /* = --semantic-ink-body */
--chart-gridline-color:rgba(0,0,0,0.08)   /* = --semantic-hairline-soft */
--chart-gridline-width:1px
--chart-tooltip-bg:    #000000
--chart-tooltip-text:  #ffffff
--chart-tooltip-radius:5px
--chart-line-width:    2px
```

---

## 18 · Variant-specific (cinematic-dark only · do NOT use in editorial-light pages)

```
--variant-cinematic-bg-deep:        #0a0a0c   /* primary dark bg */
--variant-cinematic-bg-darker:      #050506   /* deeper · hero underlays */
--variant-cinematic-bg-surface:     #111114   /* card/section on dark */
--variant-cinematic-bg-navbar:      #141016   /* CaseStudyNavbar secondary bar · DummyFooter bg · canonical near-black · added 2026-05-15 */
--variant-cinematic-bg-secondary:   #141016   /* alias of bg-navbar for semantic clarity */
--variant-cinematic-text-primary:   #fafafa
--variant-cinematic-text-secondary: rgba(250,250,250,0.65)
--variant-cinematic-text-muted:     rgba(250,250,250,0.40)
--variant-cinematic-accent-primary: #b01f24   /* same as --brand-red */
--variant-cinematic-accent-secondary: #806ce0
--variant-cinematic-accent-tertiary:#c62d31   /* red gradient end on dark */
--variant-cinematic-accent-teal:    #00e5ff   /* neon · cinematic only */
```

---

## 19 · CTA aliases (variant-bound · auto-switch)

```
--cta-bg:        var(--color-brand-red)              /* both variants */
--cta-text:      var(--color-foundation-white)
--cta-bg-hover:  var(--color-ramp-red-700) (editorial) | var(--variant-cinematic-accent-tertiary) (cinematic)
--cta-shadow:    var(--shadow-md) (editorial) | var(--shadow-lg) (cinematic)
```

---

## 20 · Anti-patterns (DO NOT WRITE)

**CORRECTION 2026-05-15:** Earlier version of this doc incorrectly claimed `--space-*` was fictional. **It is OG-canonical** (theme.css L566-581). See §8.1. Use freely.

| ❌ Don't write | ✅ Write instead | WHY |
|---|---|---|
| Hardcoded `#b01f24` in JSX | `var(--brand-red)` or `var(--color-brand-red)` | Token discipline · 92-5-3 rule enforcement |
| Raw `box-shadow: 0px 8px 24px rgba(127,95,227,0.15)` | `var(--shadow-accent-md)` or `var(--shadow-card-hover)` | Use the token · don't inline literal |
| Hardcoded `rgba(0,0,0,0.6)` for text | `var(--text-secondary)` or `var(--semantic-ink-muted)` | Semantic ink discipline |
| Raw `<button>` w/ inline styles | `<Button variant="brand">` | DS atom (Commandment 9) |
| Brand-red on decoration (icon fills · bg sections) | Brand-red on CTAs ONLY (5% rule · §1.2) | Reserved for conversion intent |
| Brand-red gradient `--bg-composition-brand-cta` for section bg | Black/white/warm SectionWrapper + brand Button INSIDE | R1.2 strict · brand-red = BUTTONS only · never section background |
| `color-mix(in srgb, var(--purple-600) 60%, white)` arbitrary tinting | Use defined ramp tokens (`--purple-100..900`) OR semantic alpha tokens | `color-mix()` allowed ONLY for special cases · hero gradients · CTA section gradients · button alpha states · never for general tint replacement |
| Section bg = accent color (purple · periwinkle · coral) | `var(--bg-pure-black)` or `var(--bg-pure-white)` or `var(--warm-300)` | Accents = gradients/shadows only · never solid section bgs |
| Body text in accent color | `var(--text-primary)` or `var(--text-secondary)` | Text = black tints only · accents fail contrast |
| Mix `--text-*` weights on same heading (300 + 500 same h2) | One weight per heading | Type-weight discipline |
| Inline `style={{fontFamily: 'serif'}}` | `style={{fontFamily: 'var(--font-serif)'}}` or `<SectionHeading>` atom | Use tokens · prevent Georgia fallback |
| `@layer tokens { :root {} }` for token overrides | bare `:root {}` (unlayered) | `@layer` always loses to unlayered · cascade trap |
| Redeclare `--font-serif`/`--font-sans` in variant CSS | Bind once in `base.css` only | Next/font CSS var resolution breaks |
| Arbitrary border-radius (e.g. `6px` · `8px` · `12px`) | Stick to `--radius-2xs/xs/sm/md/lg/xl/2xl/3xl/full` (10-step scale) | Scale discipline · prevents fragmentation |
| Adding new tokens without spec | Update tokens/build/tokens.css source + FOUNDATIONS.md ROW first · then use | Doc/code parity rule |

---

## 21 · How to verify a token exists (before writing)

```bash
# Token in tokens.css (long names · DTCG primitives)
grep -E "^\s+--<token-name>:" design-system/tokens/build/tokens.css

# Token in core-v2 base.css overrides
grep -E "^\s+--<token-name>:" design-system/core-v2/src/styles/base.css

# Token in editorial-light aliases (short legacy names)
grep -E "^\s+--<token-name>:" design-system/core-v2/src/styles/editorial-light.css

# Token in cinematic-dark variant
grep -E "^\s+--<token-name>:" design-system/core-v2/src/styles/cinematic-dark.css
```

If absent from all 4: token doesn't exist · don't write `var(--xxx)` to reference it. **Pick from FOUNDATIONS.md only.**

---

## 22 · Maintenance rules

1. **Adding a new token:** First add to `tokens/build/tokens.css` (or its source JSON · regenerate) · then add row to this doc with WHY/WHAT/WHEN. Doc + code ship together.
2. **Removing a token:** Find all `grep -rn "var(--<name>)" .` references first · migrate them · then remove from CSS + doc.
3. **Renaming a token:** Add new name as alias first · keep old · let usages migrate · delete old after 30 days.
4. **Variant-specific tokens:** Only put in `editorial-light.css` or `cinematic-dark.css` if value differs between variants. If same in both → put in `base.css :root` unlayered.
5. **NEVER:** Redeclare `--font-serif`/`--font-sans` outside `base.css :root`. NEVER use `@layer tokens` for token overrides (always lose to unlayered cascade).

---

## 23 · Token verification (build-time guard · TODO)

Planned · not yet shipped:

```bash
node scripts/check-tokens.mjs
# greps all var(--*) references in src/ + projects/*/src/
# diffs against actual :root{} definitions in *.css
# fails build on undefined token
```

When this lands, page.tsx referencing `var(--space-xl)` will fail CI · not ship broken.

---

---

## 24 · Container widths · short Tailwind-style aliases

For inline `style={{ maxWidth: 'var(--max-w-content)' }}` or `className="max-w-[var(--max-w-prose)]"`.

| Short alias | Long name | Value | WHEN |
|---|---|---|---|
| `--max-w-prose` | `--container-prose` | `43.75rem` (700px) | Body text · 65-75 char measure |
| `--max-w-compact` | `--container-compact` | `37.5rem` (600px) | Methodology · tight reading |
| `--max-w-narrow` | `--container-narrow` | `56.25rem` (900px) | CTAs · testimonials · focused |
| `--max-w-content` | `--container-content` | `62.5rem` (1000px) | **DEFAULT section content** |
| `--max-w-page` | `--container-page` | `75rem` (1200px) | Full page shell · navbar |

---

## 25 · Status colors · short aliases (forms · alerts · pills)

| Token | Value | WHEN |
|---|---|---|
| `--success-text` | `#166534` | Success message text · check icons |
| `--success-bg` | `#f0fdf4` | Success alert background |
| `--success-border` | `#bbf7d0` | Success alert border |
| `--warning-text` | `#92400e` | Warning text |
| `--warning-bg` | `#fffbeb` | Warning alert bg |
| `--warning-border` | `#fde68a` | Warning border |
| `--error-text` | `#991b1b` | Error/validation text · NOT brand-red |
| `--error-bg` | `#fef2f2` | Error alert bg |
| `--error-border` | `#fecaca` | Error border |
| `--info-text` | `#1e40af` | Info text |
| `--info-bg` | `#eff6ff` | Info alert bg |
| `--info-border` | `#bfdbfe` | Info border |

Long DTCG names: `--semantic-status-{success,warning,error,info}-{text,bg,border}`.

---

## 26 · Opacity tokens · semantic states

| Token | Value | WHEN |
|---|---|---|
| `--opacity-disabled` | `0.4` | Disabled button · input · link |
| `--opacity-hover` | `0.85` | Hover overlay over solid surface |
| `--opacity-pressed` | `0.7` | Active/pressed state |
| `--opacity-overlay` | `0.5` | Modal scrim (= `--semantic-scrim` alpha) |
| `--opacity-watermark` | `0.08` | Subtle bg text (e.g. footer "Ken" wordmark) |

---

## 27 · Border opacity · 5-tier system (matches dashboard recipe)

For light backgrounds:

| Token | Value | WHEN |
|---|---|---|
| `--border-hairline` | `rgba(0,0,0,0.05)` | Barely visible · subtle dividers |
| `--border-card` | `rgba(0,0,0,0.08)` | **MOST USED** · default card border |
| `--border-section` | `rgba(0,0,0,0.10)` | Section dividers · stronger |
| `--border-input` | `rgba(0,0,0,0.15)` | Input borders · hover states |
| `--border-active` | `rgba(0,0,0,0.20)` | Focused/emphasized · selected |

For dark backgrounds (cinematic):

| Token | Value | WHEN |
|---|---|---|
| `--border-on-dark-hairline` | `rgba(255,255,255,0.06)` | Subtlest on dark |
| `--border-on-dark-card` | `rgba(255,255,255,0.10)` | Default card on dark |
| `--border-on-dark-section` | `rgba(255,255,255,0.12)` | Section divider on dark |
| `--border-on-dark-input` | `rgba(255,255,255,0.18)` | Input on dark |
| `--border-on-dark-active` | `rgba(255,255,255,0.25)` | Focused on dark |

---

## 28 · Icon colors · 4-class taxonomy (OG canonical)

| Token | Value | WHEN |
|---|---|---|
| `--icon-content` | `#806ce0` (= `--purple-600`) | **Content icons** · semantic data · charts · KPI markers |
| `--icon-utility` | `#737373` (= `--black-500`) | **Utility icons** · nav chrome · arrows · meta |
| `--icon-brand` | `#b01f24` (= `--brand-red`) | **Brand icons** · CTAs ONLY · 5% rule |
| `--icon-on-dark` | `#fafafa` | White-tinted on cinematic-dark surfaces |

**4 classes from ICONS.md** (`core-v2/docs/ICONS.md`):
1. **Content** · semantic meaning · use `--icon-content`
2. **Utility** · UI chrome (chevrons · close · menu) · use `--icon-utility`
3. **Brand** · CTAs only · use `--icon-brand`
4. **Decorative** · pure visual · purple/coral accent (use accent color tokens)

---

## 29 · Breakpoints · CSS clamp() helpers (Tailwind handles classes)

Use ONLY for inline CSS `clamp()` or `min()`/`max()`. Tailwind classes (`sm:` `md:` `lg:` `xl:` `2xl:`) handle utility-class breakpoints.

| Token | Value | Tailwind prefix |
|---|---|---|
| `--bp-sm` | `640px` | `sm:` |
| `--bp-md` | `768px` | `md:` |
| `--bp-lg` | `1024px` | `lg:` |
| `--bp-xl` | `1280px` | `xl:` |
| `--bp-2xl` | `1536px` | `2xl:` |

Use: `width: clamp(320px, 50vw, var(--bp-lg))`.

---

## 30 · Section bg variants (variant-bound + unlayered fallback)

| Token | Editorial-light | Cinematic-dark | WHEN |
|---|---|---|---|
| `--section-bg-primary` | `#ffffff` | `#111114` | Default section bg |
| `--section-bg-accent` | `#f5f2f1` (warm-300) | `#1a1a1e` | Alternation break |
| `--section-bg-contrast` | `#000000` | `#050506` | Hero · resources · contrast |
| `--section-bg-mesh` | `transparent` | `transparent` | DarkGradientMesh supplies bg |
| `--bg-warm` | `#f5f2f1` | — | Editorial section bg alias |
| `--bg-pure-black` | `#000000` | — | Pure black section |
| `--bg-pure-white` | `#ffffff` | — | Pure white section |

**Recipe alternation** (case-study OG · 10-section pattern):
1. Hero · `--bg-pure-black`
2. Client Context · `--bg-pure-white`
3. Challenges · `--warm-300`
4. Engagement Objectives · `--bg-pure-white`
5. Methodology · `--warm-300`
6. Impact · `--bg-pure-white`
7. Value Pillars · `--bg-pure-white` (border-t)
8. Testimonial · `--bg-pure-white` (border-t)
9. Resources · `--bg-pure-black` (DarkGradientMesh)
10. Final CTA · `--bg-pure-white` (border-t)

---

**End of FOUNDATIONS.md** · 30 sections · 500+ tokens documented · single source of truth · regenerate sections from `tokens/build/tokens.css` after any DTCG rebuild.

---

## Added 2026-05-19 · Batch 3.0 token foundation

18 token blocks (~47 new tokens) appended to `core-v2/src/styles/base.css :root` per TOKEN-GAP-REPORT.md §3.
All are ADDITIONS only — no existing token was overridden or removed.

### Conflicts resolved (not added · already existed)
- `--leading-snug` (L449 · value `1.3`) — TOKEN-GAP-REPORT wanted `1.25` · **kept existing · no override**
- `--shadow-card-hover` (L139 · alias to `--shadow-accent-md`) — **kept existing**
- `--duration-instant/fast/normal/slow/slowest` (L473-478) — **kept existing · added only `--duration-medium` + `--duration-shimmer`**

### Blocks added

1. **LEGACY COMPAT ALIASES** — `--warmBg` · `--warmBorder` · `--content-max-width`
2. **ADDED TYPE TOKENS** — `--text-nav-helper` · `--text-md` · `--text-13` · `--text-24` · `--text-30` · `--text-32`
3. **ADDED WEIGHT TOKENS** — `--font-weight-light` · `--font-weight-semibold` · `--font-weight-bold`
4. **ADDED TRACKING TOKENS** — `--tracking-display-tight` · `--tracking-button` · `--tracking-label-tight` · `--tracking-label-wide` · `--tracking-label-x-wide` · `--tracking-nav` · `--tracking-nav-loose`
5. **ADDED LEADING TOKENS** — `--leading-stat-label` (stat-label = 1.5)
6. **ADDED COLOR** — `--black-25: #fcfcfc`
7. **GLASS TOKEN SUITE** — `--glass-bg` · `--glass-border` · `--glass-glow` · `--glass-accent` · `--glass-text` · `--glass-text-muted` · `--glass-hover` · `--glass-header-bg` · `--glass-header-blur`
8. **ADDED SHADOWS** — `--shadow-card-rest` · `--shadow-card-active` · `--shadow-brand-button` · `--shadow-brand-button-hover` · `--shadow-search-hero`
9. **ADDED SPACING** — `--space-14` · `--space-20`
10. **MOTION EASING** — `--ease-smooth` · `--ease-arrow` · `--ease-card-lift`
11. **MOTION DURATION (new)** — `--duration-medium` · `--duration-shimmer`
12. **BG COMPOSITIONS** — `--bg-section-stats-tinted` · `--bg-card-methodology` · `--bg-card-takeaways`
13. **PATTERN TOKENS** — `--pattern-opacity` · `--pattern-grid-size` · `--pattern-dot-size` · `--pattern-dot-position`

### Usage notes
- Glass tokens: cinematic-dark surface ONLY (`--bg-cinematic`). Never on editorial-light.
- Pattern tokens: opacity capped 0.05 · use only on `--warm-300` or `--black-50` bg.
- Legacy compat aliases: `--warmBg`/`--warmBorder` are read-only bridges → `--warm-300`/`--warm-500` canonical.
- `--content-max-width` was a broken V0.2 reference → now aliases `--container-page` (75rem/1200px).
