# TOKEN-GAP-REPORT · P0 BLOCKER · resolved-first synthesis

**Date:** 2026-05-19
**Owner:** Aura (Opus main)
**Status:** AUTHORITATIVE · feeds CANONICAL-SOURCE-MAP + PORT-PLAN
**Master rules applied:** 4WH per decision + TodoWrite gate-bound

---

## 0 · WHY this doc exists

3 legacy pages × 3 token systems × 1 new-DS. Same token NAMES often carry DIFFERENT VALUES → silent visual drift on port.

**Concrete examples found in audits:**
- `--purple-500` · V0.2 `#7f5fe3` vs core-v2 `#9488ec` · different hex
- `--text-sm` · V0.2 0.8125rem (13px) vs core-v2 1rem (16px) · different size
- `--radius-md` · V0.2 0.625rem (10px) vs core-v2 15px · 5px drift
- `--green-600` · V0.2 `#16a34a` vs core-v2 `#059669` · different green
- `--font-bold 700` · V0.2 used everywhere vs core-v2 ships 400+500 only

**Without resolving these before port: every component silently shifts size/color/radius on consume. Aborts port quality.**

---

## 1 · Strategy decision (locked)

**Strategy A** — **core-v2 values win · legacy ports refactor to new names/values**

Why:
- core-v2 = brand canon (OG vs_26 alignment) · derived from latest brand decisions
- core-v2 values are AA-contrast verified (`--green-600` flagged 3.77:1 fix · `--color-red-800` AA-compliant alias added)
- core-v2 ramp is 9-step (50-900) · legacy mixes 3/5/9 step ramps → core-v2 ramp is superset
- Legacy values were drift · not source of truth
- Foundation lock 2026-05-15 already committed to these values

Why NOT Strategy B (override core-v2 to legacy):
- Reverts brand alignment
- Breaks AA contrast guarantees
- Foundation re-work · invalidates `foundation_lock_complete_2026-05-15` memory

Why NOT Strategy C (namespace legacy as `--text-legacy-sm`):
- Permanent tech debt
- AI confusion · two coexisting scales
- Doubles maintenance

---

## 2 · Token diff matrix (legacy → core-v2 · action per row)

### 2.1 COLOR · BRAND RED · ✅ aligned

| Token | V0_lite | V0.2 | report-store | core-v2 | Action |
|---|---|---|---|---|---|
| `--brand-red` | `#b01f24` | `#b01f24` | `#b01f24` | `#b01f24` | ✅ keep · no change |
| `--brand-red-hover` | `#8f181d` | `#8f181d` | `#8f181d` | `#8f181d` | ✅ |
| `--brand-red-active` | `#771419` | `#771419` | `#771419` | `#771419` | ✅ |
| `--red-500` | `#d23940` (V0_lite) | n/a | n/a | `#dc3238` | ⚠️ core-v2 wins · V0_lite outdated |
| `--red-600` | n/a | n/a | n/a | `#b01f24` (= brand-red) | ✅ |
| `#c62d31` gradient mid | V0_lite Button | n/a | n/a | none | 🔴 OUTDATED · drop entirely (gradient buttons banned R1.2) |
| `#eb484e` shimmer mid | V0_lite Button | n/a | report-store shimmer slide | none | 🔴 OUTDATED for button gradient · ⚠️ shimmer may retain as derived from `--brand-red @ 60% lightness` if shimmer kept on new buttons |

### 2.2 COLOR · PURPLE / DATA · 🔴 collision resolved

| Token | V0.2 | core-v2 | Action |
|---|---|---|---|
| `--purple-500` | `#7f5fe3` | `#9488ec` | 🔴 core-v2 wins · V0.2 ports must accept hex shift |
| `--purple-300` | `#b8aeef` | `#c4bef7` | 🔴 core-v2 wins |
| `--purple-100` | `#eff1fe` | `#efedfd` | ⚠️ close · core-v2 wins |
| `--purple-600` | (deprecated alias) | `#806ce0` | ✅ core-v2 canon · CANONICAL purple for icons/glow |
| `#6D52D9` StatCard atom | V0.2 hardcoded | none | 🔴 hardcode · replace w/ `--purple-600` |

### 2.3 COLOR · BLACK / GREY · ✅ mostly aligned

| Token | Legacy | core-v2 | Action |
|---|---|---|---|
| `--black-50` `#fafafa` | all 3 | all 3 | ✅ |
| `--black-100` `#f5f5f5` | all 3 | ✅ | ✅ |
| `--black-200` `#e5e5e5` | all 3 | ✅ | ✅ |
| `--black-300` `#d4d4d4` | V0_lite + V0.2 | ✅ | ✅ |
| `--black-400` `#a3a3a3` | V0_lite + V0.2 | ✅ | ✅ |
| `--black-500` `#737373` | all 3 | ✅ | ✅ |
| `--black-600` `#525252` | V0_lite + V0.2 | ✅ | ✅ |
| `--black-700` `#404040` | V0_lite + V0.2 | ✅ | ✅ |
| `--black-800` `#262626` | none used | ✅ | ✅ (new tier) |
| `--black-900` `#171717` | all 3 | ✅ | ✅ |
| `--black-25` `#fcfcfc` | V0.2 hardcode | 🔴 missing | **ADD `--black-25: #fcfcfc`** to core-v2 |
| `#656565` | V0.2 Header hardcode | none in ramp | 🔴 hardcode · use `--black-600` (`#525252`) as nearest |
| `--neutral-50` | n/a | aliased to `--black-50` | ✅ already aliased 2026-05-15 |

### 2.4 COLOR · WARM · ✅ aligned

| Token | Legacy | core-v2 | Action |
|---|---|---|---|
| `--warm-300 #f5f2f1` | V0_lite "warmBg" | `--warm-300` canonical | ✅ |
| `--warm-500 #eae5e3` | V0_lite "warmBorder" | `--warm-500` canonical | ✅ |
| `--warm-100 #fcfbfa` | V0_lite Badge | `--warm-100` | ✅ |
| `--warm-900 #a6968e` | V0_lite Badge-warm text | `--warm-900` | ✅ |
| Full 50-900 ramp | none used full | ✅ all 9 steps | ✅ superset |
| Legacy alias `--warmBg` | V0_lite consumer code | none | **ADD ALIAS `--warmBg: var(--warm-300)`** to base.css for legacy snippet compat |
| Legacy alias `--warmBorder` | V0_lite consumer code | none | **ADD ALIAS `--warmBorder: var(--warm-500)`** |

### 2.5 COLOR · PERIWINKLE · PERANO · CORAL · ✅ aligned (superset)

All 3 ramps fully aligned · core-v2 ships 9-step · legacy used subset. No action.

### 2.6 COLOR · ACCENT (cinematic / dark surface)

| Token | Source | core-v2 | Action |
|---|---|---|---|
| `#ff6b6b` SectionLabel-accent-dark | V0_lite Hero | none direct · use `--coral-400 #fbb8a7` or `--red-400 #f87176` | ⚠️ map to nearest · use `--red-400` (coral lacks accent intensity) |
| `--label-on-black rgba(255,255,255,0.4)` | (report-store / V0.2) | ✅ exists | ✅ |
| `--label-on-white rgba(0,0,0,0.4)` | (report-store / V0.2) | ✅ exists | ✅ |

### 2.7 COLOR · GLASS TOKENS · 🔴 ADD WHOLE SUITE

V0.2 Hero glass card uses 7 glass tokens — NONE in core-v2.

| Token | V0.2 value | Action |
|---|---|---|
| `--glass-bg` | `rgba(255,255,255,0.08)` | **ADD** |
| `--glass-border` | `rgba(255,255,255,0.15)` | **ADD** |
| `--glass-glow` | `rgba(255,255,255,0.05)` | **ADD** |
| `--glass-accent` | `rgba(176,31,36,0.8)` | **ADD** (= brand-red @ 80% alpha) |
| `--glass-text` | `rgba(255,255,255,0.95)` | **ADD** |
| `--glass-text-muted` | `rgba(255,255,255,0.5)` | **ADD** |
| `--glass-hover` | `rgba(255,255,255,0.12)` | **ADD** |

→ **ALL 7 added to base.css** if cinematic Hero / dark surfaces kept (user has confirmed Hero kept).

### 2.8 COLOR · SEMANTIC GREEN / AMBER / ROSE

| Token | V0.2 | core-v2 | Action |
|---|---|---|---|
| `--green-600` | `#16a34a` (Tailwind default) | `#059669` (Emerald — AA-compliant on white) | 🔴 core-v2 wins · V0.2 ports refactor green icons |
| `--green-700` | n/a | `#047857` | ✅ use for body-text on light surface (per existing comment) |
| `--amber-400` | `#fbbf24` | `#fbbf24` | ✅ |
| `--red-600` (status) | `#dc2626` | self-contained · uses `--red-600 #b01f24` brand · separate `--rose-600 #e11d48` for form errors | ⚠️ V0.2 used `--red-600` for "Challenge icons" → in core-v2 this is BRAND RED · use `--rose-600` instead for non-brand error/risk states |

### 2.9 TYPE · SCALE · 🔴 collision resolved — core-v2 Major Third wins

| Name | V0.2 value | core-v2 value | Action |
|---|---|---|---|
| `--text-2xs` | n/a | 0.6875rem (11px) | ✅ |
| `--text-xs` | n/a | 0.8rem (12.8px) | ✅ |
| `--text-compact` | n/a | 0.875rem (14px) | ✅ |
| `--text-nav` | n/a | 0.875rem (14px) | ✅ |
| `--text-sm` | **0.8125rem (13px)** | **1rem (16px)** | 🔴 NAME COLLISION · core-v2 wins · V0.2 port: where V0.2 used `text-sm` for 13px body → MAP to `--text-xs` (12.8px) OR add new `--text-13: 0.8125rem` if specifically needed |
| `--text-base` | **14px** | **1.25rem (20px)** | 🔴 NAME COLLISION · core-v2 wins · V0.2 port: where V0.2 used `text-base` for 14px → MAP to `--text-compact` (14px) |
| `--text-lg` | 18px | 1.563rem (25px) | 🔴 V0.2 port: map 18px → `--text-md` ADD (`--text-md: 1.125rem` = 18px) OR use `--text-sm` (16px) where intent was "slightly bigger body" |
| `--text-xl` | 20px | 1.953rem (31.25px) | 🔴 V0.2 port: 20px → core-v2 `--text-base` (1.25rem = 20px) |
| `--text-2xl` | 24px | 2.441rem (39px) | 🔴 V0.2 port: 24px → no exact match · ADD `--text-24: 1.5rem` for sub-headings OR map to `--text-lg` (25px) |
| `--text-3xl` | 30px | 3.052rem (48.8px) | 🔴 V0.2 port: 30px → ADD `--text-30: 1.875rem` OR map to `--text-2xl` (39px · larger) |
| `--text-4xl` | 32px (`2rem`) | 3.815rem (61px) | 🔴 V0.2 port: 32px → ADD `--text-32: 2rem` OR use `--text-2xl` (39px) |
| `--text-5xl` | n/a | 4.768rem (76.3px) | ✅ |
| Hardcoded `text-[13px]` | V0.2 GrowthDrivers · MarketAnalysis | none | 🔴 hardcode · use `--text-xs` (12.8px ≈ 13px) |
| Hardcoded `text-[16px]` | V0.2 GrowthDrivers · IconCard | `--text-sm` (16px) ✅ | refactor to var |
| Hardcoded `text-[26px]` | V0.2 TextCard · TimelineCard | none | 🔴 hardcode · use `--text-lg` (25px) closest |
| Hardcoded `text-[48px]` | V0.2 RegionalComparison · GrowthDrivers | `--text-3xl` (48.8px) ✅ ish | refactor to var |
| V0_lite `0.813rem` navHelper | V0_lite Breadcrumb · Methodology · NewHeader | none | **ADD `--text-nav-helper: 0.813rem`** (13px) |
| V0_lite `0.875rem / 14px` | V0_lite FAQ · Methodology | `--text-nav` or `--text-compact` (both 0.875rem) | ✅ use existing alias |

**Decision: do NOT add a parallel V0.2 13/14/18/20/24/30/32 scale. Force port refactor to Major Third + 3 outside-scale aliases (`--text-nav-helper`, `--text-md` if needed, `--text-compact`).**

### 2.10 TYPE · WEIGHTS

| Weight | Legacy usage | core-v2 | Action |
|---|---|---|---|
| 300 (light) | V0_lite serif headings | `--font-weight-light: 300` available via font-family variable axis | ✅ exposed in font-variation-settings · usable in css `font-weight: 300` |
| 400 (normal) | all | `--font-weight-normal: 400` | ✅ |
| 500 (medium) | all | `--font-weight-medium: 500` | ✅ |
| 600 (semibold) | V0_lite stat-value · SectionLabel · report-store | `--font-weight-heading: 600` (per audit) | ⚠️ confirm token name · ADD `--font-weight-semibold: 600` if missing |
| 700 (bold) | V0.2 StatCard · OverheadText · badge · V0_lite brand button · report-store | core-v2 ships 400+500 only per audit | 🔴 ADD `--font-weight-bold: 700` token (DM Sans variable supports 700) · audit overstated absence |

**Decision: ADD explicit 600 + 700 tokens · DM Sans is variable axis 100-700 · no font load cost.**

### 2.11 TYPE · TRACKING (letter-spacing)

| Pattern | V0_lite | V0.2 | report-store | core-v2 | Action |
|---|---|---|---|---|---|
| Display tight | `-0.02em` (hero h1) | `-0.025em` (hero h1) | `-0.01em` (section headings) | `--tracking-display-tight: -0.01em` (per audit) | ⚠️ align all 3 sources → core-v2 `-0.01em` wins |
| Button | `0.0875px` | n/a | `0.0875px` | none | **ADD `--tracking-button: 0.0875px`** |
| Label uppercase | `0.2em` (SectionLabel) | `0.1em` (OverheadText) | `0.15em` (footer/section labels) | `--tracking-widest: 0.1em` (per audit) | **ADD scaled set: `--tracking-label-tight: 0.1em` · `--tracking-label-wide: 0.15em` · `--tracking-label-x-wide: 0.2em`** · let consumer pick by context |
| Breadcrumb | `0.2px` | n/a | n/a | none | use existing `--tracking-button` (`0.0875px` close enough) |
| Nav | n/a | `1.62px` (Header) / `0.62px` (nav items) | `0.62px` (filter titles) | none | 🔴 hardcoded · ADD `--tracking-nav-loose: 1.62px` · `--tracking-nav: 0.62px` |
| Stat numeric | tight (`-0.01em`) | n/a | n/a | core-v2 has `--tracking-tight` | ✅ |
| Badge per-size | `[0.15/0.12/0.08/0.05em]` | n/a | n/a | none | scope to Badge atom · inline · NOT global tokens |

### 2.12 TYPE · LEADING (line-height)

| Pattern | V0_lite | V0.2 | report-store | core-v2 | Action |
|---|---|---|---|---|---|
| Display | `[1.1]` 4xl/5xl · `[1.2]` h1 | `leading-tight 1.25` · `leading-[1.1]` | `leading-[1.1]` | `--leading-tight: 1.1` | ⚠️ V0.2 `leading-tight = 1.25` mismatches core-v2 `1.1` · V0.2 port: replace `leading-tight` (1.25) → `leading-snug` (1.25 if added) OR re-tune to 1.1 |
| Snug | n/a | n/a | `leading-snug` (cards) | none direct · `--leading-snug` likely 1.25 | **ADD `--leading-snug: 1.25`** |
| Normal | n/a | n/a | n/a | n/a | use 1.5 default |
| Relaxed | `[1.6]` Highlights lede · `[1.7]` chapter lede | `1.625` body | `leading-relaxed` body | `--leading-relaxed: 1.6` | ✅ core-v2 wins · V0.2 1.625 close enough |
| Stat-label | `[1.5]` | n/a | n/a | use 1.5 inline OR ADD `--leading-stat-label: 1.5` | low priority |

**Decision: ADD `--leading-snug: 1.25` · keep core-v2 1.1/1.6 as canon.**

### 2.13 RADIUS · 🔴 collision resolved

| Name | V0.2 | report-store | V0_lite | core-v2 | Action |
|---|---|---|---|---|---|
| `--radius-0` | n/a | n/a | n/a | 0 | ✅ |
| `--radius-2xs` | n/a | 2.5px (rc-image) | 2.5px (chart bars) | 2.5px | ✅ all aligned |
| `--radius-xs` | n/a | 5px (radius-element) | 5px (mini chart) | 5px | ✅ |
| `--radius-sm` | **0.15625rem (2.5px)** | 10px (rc-radius-card) | 5px | 10px | 🔴 NAME COLLISION · core-v2 wins · V0.2 port: where V0.2 used `--radius-sm` for 2.5px → use `--radius-2xs` |
| `--radius-md` | **0.625rem (10px)** | 15px | 10px | 15px | 🔴 NAME COLLISION · core-v2 wins · V0.2 port: where V0.2 used `--radius-md` for 10px → use `--radius-sm` |
| `--radius-lg` | **1rem (16px)** | 20px | 20px | 20px | 🔴 NAME COLLISION · core-v2 wins · V0.2 port: 16px → no exact · use `--radius-md` (15px) closest OR ADD `--radius-16: 1rem` for FAQ accordion specifically |
| `--radius-xl` | n/a | 25px | n/a | 25px | ✅ |
| `--radius-2xl/3xl/full` | n/a | n/a | n/a | 30/35/9999 | ✅ |
| Semantic aliases | `--radius-element` 5 · `--radius-inner` 2.5 · `--rc-radius-card` 10 · `--rc-radius-card-inner` 5 · `--rc-radius-image` 2.5 | same | n/a | ✅ all present | ✅ |
| FAQ rounded `10px` (V0_lite) | n/a | n/a | hardcoded `10px` · `5px` sub | `--radius-sm: 10px` ✅ | refactor to var |

**Decision: core-v2 5px-step scale wins · V0.2 port refactors all `--radius-sm/md/lg` references.**

### 2.14 SHADOWS

| Shadow | V0_lite | V0.2 | report-store | core-v2 | Action |
|---|---|---|---|---|---|
| Card rest | `0 1px 3px rgba(0,0,0,0.04)` (Highlights) | n/a | `0 1px 3px rgba(0,0,0,0.04)` (Card.tsx) | `--shadow-sm` `0 1px 3px rgba(0,0,0,0.08)` (per audit) | ⚠️ darker · keep core-v2 OR ADD softer `--shadow-card-rest: 0 1px 3px rgba(0,0,0,0.04)` |
| Card hover | `0 8px 24px rgba(0,0,0,0.06)` | n/a | card-lift hover | `--shadow-lg` `0 10px 15px -3px rgba(0,0,0,0.15)` (per audit) | ⚠️ core-v2 darker · ADD `--shadow-card-hover: 0 8px 24px rgba(0,0,0,0.06)` |
| Brand button | `rgba(176,31,36,0.15-0.25)` red glow | n/a | n/a | only purple accents | 🔴 ADD `--shadow-brand-button: 0 4px 12px rgba(176,31,36,0.15)` · `--shadow-brand-button-hover: 0 6px 16px rgba(176,31,36,0.25)` |
| Dual-layer card-active | `0 4px 16px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)` (Methodology) | n/a | n/a | none | 🔴 ADD `--shadow-card-active` dual-layer |
| Accent purple shadow | `0 0 0 1px purple-300 / 0 12px 32px purple alpha` (V0.2 mindmap hover) | ✅ | n/a | `--shadow-accent-sm/md/lg` (per audit) | ✅ |
| Search hero shadow | n/a | n/a | `0 20px 60px rgba(0,0,0,0.3)` | none | 🔴 ADD `--shadow-search-hero: 0 20px 60px rgba(0,0,0,0.3)` (or scope to search organism inline) |
| Glass-header | n/a | n/a | `backdrop-filter: blur(12px) saturate(1.4)` + `rgba(255,255,255,0.82)` | partial · existing `--glass-*` family extends to surface | **ADD `--glass-header-bg: rgba(255,255,255,0.82)` · `--glass-header-blur: blur(12px) saturate(1.4)`** |

### 2.15 SPACING

Core-v2 already has full named (2xs-5xl) + numeric (1-12) aliases. Audit confirms:

| Token need | core-v2 has? | Action |
|---|---|---|
| `--space-1` (4px) | ✅ | ✅ |
| `--space-2` (8px) | ✅ | ✅ |
| `--space-3` (12px) | ✅ | ✅ |
| `--space-4` (16px) | ✅ | ✅ |
| `--space-5` (20px) | ✅ | ✅ |
| `--space-6` (24px) | ✅ | ✅ |
| `--space-8` (32px) | ✅ | ✅ |
| `--space-10` (40px) | ✅ | ✅ |
| `--space-12` (48px) | ✅ | ✅ |
| `--space-14` (56px) | 🔴 missing | ADD `--space-14: 3.5rem` |
| `--space-16` (64px) | (= `--space-3xl`) | use `--space-3xl` |
| `--space-20` (80px) | (= `--section-py-desktop`?) | ADD `--space-20: 5rem` |
| `--space-24` (96px) | (= `--space-4xl`) | use `--space-4xl` |
| `--space-32` (128px) | (= `--space-5xl`) | use `--space-5xl` |
| Section vertical `py-24 lg:py-32` (96/128px) | V0.2 uses this | core-v2 `--section-py-desktop = 5rem` (80px) | 🔴 V0.2 uses TALLER sections (96/128px) · core-v2 wins at 80px · port follows core-v2 |
| Section horizontal `84.375px/112.5px` | V0.2 hardcode | core-v2 32px desktop | 🔴 V0.2 odd px values · port maps to core-v2 standard |
| `--padding-mobile: 16px` | report-store | confirm in core-v2 | ✅ matches `--padding-mobile` |
| `--padding-tablet: 24px` | report-store | confirm | ✅ |
| `--padding-desktop: 32px` | report-store | confirm | ✅ |
| Section-header bottom `mb-16 (64px)` (V0.2) vs `--section-header-mb: 48px` (core-v2) | drift | core-v2 wins | port refactor |

### 2.16 MOTION · EASING + DURATION

| Token | Found | core-v2 | Action |
|---|---|---|---|
| `cubic-bezier(0.22, 1, 0.36, 1)` "smooth" | V0_lite Motion | none | **ADD `--ease-smooth: cubic-bezier(0.22, 1, 0.36, 1)`** |
| `cubic-bezier(0.4, 0, 0.2, 1)` "arrow/material" | V0_lite + report-store AnimatedArrow | none | **ADD `--ease-arrow: cubic-bezier(0.4, 0, 0.2, 1)`** |
| `cubic-bezier(0.16, 1, 0.3, 1)` "card-lift" | report-store Card | none | **ADD `--ease-card-lift: cubic-bezier(0.16, 1, 0.3, 1)`** |
| Duration 150ms | various | partial | **ADD `--duration-instant: 150ms`** |
| Duration 200ms | V0.2 chart-title-header | `--duration-fast: 200ms`? | **VERIFY/ADD `--duration-fast: 200ms`** |
| Duration 300ms | AnimatedArrow | none | **ADD `--duration-normal: 300ms`** |
| Duration 500ms | V0_lite entrance | none | **ADD `--duration-medium: 500ms`** |
| Duration 600ms | V0_lite scroll | none | **ADD `--duration-slow: 600ms`** |
| Duration 700ms | report-store shimmer | none | **ADD `--duration-shimmer: 700ms`** |
| Duration 1000ms | V0.2 video fade | none | **ADD `--duration-slowest: 1000ms`** |

### 2.17 BG COMPOSITION · GRADIENTS

| Pattern | Source | core-v2 | Action |
|---|---|---|---|
| `--bg-composition-warm-editorial` warm 3-stop | report-store | ✅ present (per audit) | ✅ |
| Section bg tinted (KeyStats) `linear-gradient(180deg, rgba(250,251,254,0.6), rgba(235,237,251,0.45))` | V0_lite | none | **ADD `--bg-section-stats-tinted`** |
| Card bg methodology `linear-gradient(135deg, #f3f4ff80, #fafafa4d)` | V0_lite | none | **ADD `--bg-card-methodology`** |
| Pattern `dot-pattern` radial-gradient 20px grid 0.05 opacity | V0.2 | none | **ADD pattern token suite: `--pattern-opacity: 0.05` · `--pattern-grid-size: 20px` · `--pattern-dot-size: 1px`** |
| Gradient takeaways card `rgba(243,244,255,0.5)→rgba(250,250,250,0.3)` | V0.2 (line 146) | none | 🔴 violates R1.2 brand-red gradient ban · UNTIL audited as non-brand-red · ALLOW · scope to TakeawaysCard inline OR ADD `--bg-card-takeaways` |

### 2.18 GLOBAL FLAGS

| Reference | Source | Action |
|---|---|---|
| `var(--content-max-width)` (V0.2 MarketOverview:30) | undefined in V0.2 too | 🔴 BROKEN reference · ALIAS to `--container-page` (`75rem`/1200px) · ADD `--content-max-width: var(--container-page)` |
| `bg-warm-200` class (V0.2 stat-card:151) | undefined Tailwind class | 🔴 BROKEN · port fixes to `bg-[var(--warm-200)]` (token exists) |

---

## 3 · Token ADD list (final · scope: base.css)

**18 token blocks to add to `core-v2/src/styles/base.css :root`** before Stage 3.1 batch 1 port.

```css
/* ============================================================
   LEGACY COMPAT ALIASES · added 2026-05-19 per TOKEN-GAP-REPORT
   Lets V0_lite + V0.2 + report-store snippets keep rendering.
   Maps OLD names → canonical core-v2 names.
   ============================================================ */
--warmBg:     var(--warm-300);              /* V0_lite legacy alias */
--warmBorder: var(--warm-500);              /* V0_lite legacy alias */
--content-max-width: var(--container-page); /* V0.2 broken ref fix */

/* ============================================================
   ADDED TYPE TOKENS · 2026-05-19
   ============================================================ */
--text-nav-helper: 0.813rem;   /* 13px · Breadcrumb / Methodology / Header secondary */
--text-md:         1.125rem;   /* 18px · card body (sub-sub-heading) */
--text-13:         0.8125rem;  /* 13px · V0.2 small body remap */
--text-24:         1.5rem;     /* 24px · V0.2 sub-heading remap */
--text-30:         1.875rem;   /* 30px · V0.2 h2 remap */
--text-32:         2rem;       /* 32px · V0.2 hero h1 remap */

/* ============================================================
   ADDED WEIGHT TOKENS · 2026-05-19
   ============================================================ */
--font-weight-light:    300;
--font-weight-semibold: 600;
--font-weight-bold:     700;

/* ============================================================
   ADDED TRACKING TOKENS · 2026-05-19
   ============================================================ */
--tracking-display-tight:  -0.02em;
--tracking-button:          0.0875px;
--tracking-label-tight:     0.1em;
--tracking-label-wide:      0.15em;
--tracking-label-x-wide:    0.2em;
--tracking-nav:             0.62px;
--tracking-nav-loose:       1.62px;

/* ============================================================
   ADDED LEADING TOKENS · 2026-05-19
   ============================================================ */
--leading-snug:        1.25;
--leading-stat-label:  1.5;

/* ============================================================
   ADDED COLOR · 2026-05-19
   ============================================================ */
--black-25: #fcfcfc;

/* ============================================================
   GLASS TOKEN SUITE · 2026-05-19 · cinematic-dark hero / glass cards
   ============================================================ */
--glass-bg:         rgba(255, 255, 255, 0.08);
--glass-border:     rgba(255, 255, 255, 0.15);
--glass-glow:       rgba(255, 255, 255, 0.05);
--glass-accent:     rgba(176,  31,  36, 0.8);
--glass-text:       rgba(255, 255, 255, 0.95);
--glass-text-muted: rgba(255, 255, 255, 0.5);
--glass-hover:      rgba(255, 255, 255, 0.12);

/* Glass-header · light surface · used by report-store navbar */
--glass-header-bg:   rgba(255, 255, 255, 0.82);
--glass-header-blur: blur(12px) saturate(1.4);

/* ============================================================
   ADDED SHADOWS · 2026-05-19
   ============================================================ */
--shadow-card-rest:           0 1px 3px rgba(0, 0, 0, 0.04);
--shadow-card-hover:          0 8px 24px rgba(0, 0, 0, 0.06);
--shadow-card-active:         0 4px 16px rgba(0, 0, 0, 0.06), 0 1px 4px rgba(0, 0, 0, 0.04);
--shadow-brand-button:        0 4px 12px rgba(176, 31, 36, 0.15);
--shadow-brand-button-hover:  0 6px 16px rgba(176, 31, 36, 0.25);
--shadow-search-hero:         0 20px 60px rgba(0, 0, 0, 0.3);

/* ============================================================
   ADDED SPACING · 2026-05-19
   ============================================================ */
--space-14: 3.5rem;   /* 56px · section-py-standard report-store */
--space-20: 5rem;     /* 80px · section-py-desktop */

/* ============================================================
   MOTION · EASING + DURATION · 2026-05-19
   ============================================================ */
--ease-smooth:     cubic-bezier(0.22, 1, 0.36, 1);   /* entrance · default */
--ease-arrow:      cubic-bezier(0.4, 0, 0.2, 1);     /* AnimatedArrow · material */
--ease-card-lift:  cubic-bezier(0.16, 1, 0.3, 1);    /* card hover lift */

--duration-instant:  150ms;
--duration-fast:     200ms;
--duration-normal:   300ms;
--duration-medium:   500ms;
--duration-slow:     600ms;
--duration-shimmer:  700ms;
--duration-slowest:  1000ms;

/* ============================================================
   BG COMPOSITIONS · 2026-05-19
   ============================================================ */
--bg-section-stats-tinted: linear-gradient(180deg, rgba(250, 251, 254, 0.6) 0%, rgba(235, 237, 251, 0.45) 100%);
--bg-card-methodology:     linear-gradient(135deg, rgba(243, 244, 255, 0.5) 0%, rgba(250, 250, 250, 0.3) 100%);
--bg-card-takeaways:       linear-gradient(135deg, rgba(243, 244, 255, 0.5) 0%, rgba(250, 250, 250, 0.3) 100%);

/* ============================================================
   PATTERN TOKENS · dot-pattern bg · 2026-05-19
   ============================================================ */
--pattern-opacity:   0.05;
--pattern-grid-size: 20px;
--pattern-dot-size:  1px;
--pattern-dot-position: 0 0;
```

**Total ADD:** ~50 tokens
**Total RENAME / REFACTOR enforce on legacy port:** ~20 (font-size scale collision · radius scale collision · purple/green/red-500 hex shifts · section padding / header-mb drift · text-base/lg/xl/2xl name collision)

---

## 4 · Port refactor rules (apply during Stage 3 batch port)

When porting any legacy snippet into `core-v2/src/`:

1. **`text-sm` (V0.2 13px) → `--text-xs` (12.8px)** or `--text-13` if exact 13px needed
2. **`text-base` (V0.2 14px) → `--text-nav` / `--text-compact` (both 14px)**
3. **`text-lg` (V0.2 18px) → `--text-md` (18px new alias)**
4. **`text-xl` (V0.2 20px) → `--text-base` (1.25rem = 20px)**
5. **`text-2xl` (V0.2 24px) → `--text-24` (new alias)** or `--text-lg` (25px)
6. **`text-3xl` (V0.2 30px) → `--text-30` (new alias)** or `--text-2xl` (39px) if larger acceptable
7. **`text-4xl` (V0.2 32px) → `--text-32` (new alias)**
8. **`--radius-sm` (V0.2 2.5px) → `--radius-2xs`**
9. **`--radius-md` (V0.2 10px) → `--radius-sm`**
10. **`--radius-lg` (V0.2 16px) → `--radius-md` (15px closest)**
11. **`--purple-500 #7f5fe3` (V0.2) → keep var name · accept hex shift to `#9488ec`**
12. **`--green-600 #16a34a` (V0.2) → keep var name · accept hex shift to `#059669`**
13. **`--red-600 #dc2626` (V0.2 status) → REPLACE with `--rose-600`** (avoid brand-red collision)
14. **`#171717/#737373/#525252` etc hardcodes → use `--black-900/-500/-600`**
15. **`#7f5fe3` hardcode → `--purple-500`** (accept hex shift)
16. **`bg-warm-200` undefined class (V0.2 stat-card:151) → `bg-[var(--warm-200)]`** (token exists)
17. **`var(--content-max-width)` (V0.2 broken) → already aliased · works after alias added**
18. **Hero rAF orbs animation (V0.2) → ADD `useReducedMotion()` guard · skip rAF when reduced**
19. **Highcharts `accessibility.enabled: false` → set to `true`** + add `point.description` per series
20. **Gradient buttons (V0_lite + V0.2) → DROP entirely · use solid brand-red Button from report-store**
21. **Shimmer slide on buttons → MAY KEEP (visual flair) · NOT in V0.2 buttons but YES in report-store buttons**
22. **`leading-tight` (V0.2 = 1.25) → use `--leading-snug` (1.25) explicitly · do not collide w/ `--leading-tight` (1.1)**
23. **`tracking-tight` (V0.2 = -0.025em) → use `--tracking-display-tight` (-0.02em)** — closest semantic match

---

## 5 · 4WH per added token (audit-trail · spot check 5 examples)

**`--text-md: 1.125rem`**
- WHAT · 18px font size · between `--text-sm` 16 and `--text-base` 20
- WHY · V0.2 card titles (`SegmentationCard:109`) need 18px · no existing slot
- WHEN · sub-section heading · card title · slightly bigger body
- WHERE · molecules / organisms in port
- HOW · `font-size: var(--text-md)` · weight typically 500

**`--glass-bg: rgba(255,255,255,0.08)`**
- WHAT · semi-transparent white surface on dark bg
- WHY · Hero V0.2 glass card + cinematic-dark variant
- WHEN · only on dark `--bg-cinematic` surface · NEVER on light
- WHERE · HeroSection · cinematic surface organisms only
- HOW · `background: var(--glass-bg); border: 1px solid var(--glass-border); backdrop-filter: blur(12px);`

**`--ease-arrow: cubic-bezier(0.4, 0, 0.2, 1)`**
- WHAT · material-like ease curve for arrow hover-shift
- WHY · canonical from report-store AnimatedArrow (300ms 0.4,0,0.2,1)
- WHEN · arrow exits up-right + enters from down-left · any directional shift
- WHERE · AnimatedArrow atom · CTALink arrow · button arrow
- HOW · `transition: transform var(--duration-normal) var(--ease-arrow)`

**`--shadow-brand-button: 0 4px 12px rgba(176,31,36,0.15)`**
- WHAT · soft red glow under brand-red buttons
- WHY · V0_lite Button (`tokens.ts` shadows.brandButton)
- WHEN · brand-red CTA button rest state (not hover)
- WHERE · Button variant="primary"
- HOW · `box-shadow: var(--shadow-brand-button); transition: box-shadow var(--duration-fast) var(--ease-smooth);`

**`--text-nav-helper: 0.813rem`**
- WHAT · 13px UI helper text size · between micro 12.8 and 14 nav
- WHY · V0_lite Breadcrumb / Methodology / Header secondary nav · "navHelper" recurring
- WHEN · secondary nav label · breadcrumb item · methodology meta · sample-report chapter label
- WHERE · Breadcrumb · Methodology atoms
- HOW · `font-size: var(--text-nav-helper); letter-spacing: var(--tracking-nav);`

(Remaining 45 tokens follow same WWWWH structure · captured at apply-time in atom JSDoc · not duplicated here for brevity.)

---

## 6 · Apply order (Stage 3.1 — first action)

1. Backup `core-v2/src/styles/base.css` → `.bak`
2. Append the 18 token blocks from §3 to `:root` in `base.css` (after existing tokens · do NOT replace)
3. Run TypeScript build to verify no class generation breakage
4. Visual smoke test on v0.3 (dev server should look identical · only adds · no overrides)
5. Commit · log entry in `docs/CHANGELOG.md` (Aura-infra)
6. Update `core-v2/docs/FOUNDATIONS.md` § new tokens · log token additions
7. THEN start primitive port (Button · Arrow · etc)

---

## 7 · Risks + mitigations

| Risk | Likelihood | Mitigation |
|---|---|---|
| `--text-bold` 700 weight not supported by DM Sans variable axis | Low | DM Sans 100-700 axis · confirmed · ship `font-variation-settings: "wght" 700` |
| `--green-600` hex shift breaks AA contrast somewhere | Low | core-v2 `#059669` already AA-verified on light surface (per existing comment) |
| Adding `--warmBg` alias conflicts with future canonical | Low | aliases are read-only · `--warm-300` is canon · alias depends on it |
| `--purple-500` hex shift visually noticeable to user | Medium | flag in CHANGELOG · user reviews v0.3 visual after Stage 3.2 ports |
| Glass tokens encourage cinematic overuse | Medium | scope to cinematic-dark variant ONLY · enforce via RULES.md |
| Pattern token usage on light surfaces creates noise | Medium | opacity capped 0.05 · ADD to RULES.md "pattern bg only on `--warm-300` or `--black-50`" |

---

## 8 · Out of scope (this doc)

- Component-level token usage (handled in atom JSDoc + CANONICAL-SOURCE-MAP)
- Anti-pattern rules (handled in ANTI-PATTERNS.md update)
- Composition rules (handled in SPACING-COMPOSITION-LAYOUT-CANON.md)
- Highcharts a11y enable (handled in port-time refactor · not a token change)
- Hero rAF reduced-motion (component refactor · not token)

---

## 9 · Done when

- [ ] User approves this doc
- [ ] 18 token blocks appended to `base.css :root` (Stage 3.1 first action)
- [ ] `core-v2/docs/FOUNDATIONS.md` updated w/ new tokens
- [ ] `core-v2/docs/CHANGELOG.md` (or workspace CHANGELOG) logs the addition
- [ ] Visual smoke test on v0.3 confirms no regression (additions only · no overrides)
- [ ] Port refactor rules from §4 cited in PORT-PLAN.md per batch

---

## 10 · Post-Batch-3.0 reconciliation log (2026-05-19)

After applying §3 to `base.css`, 2 collisions discovered with existing tokens. Resolved:

### 10.1 `--leading-snug` collision
- Existing core-v2 value: **`1.3`** (base.css L448 · `= --typography-line-height-snug · section h2`)
- §2.12 spec proposed: `1.25`
- **DECISION:** existing `1.3` wins · OG canonical · do NOT override
- **CONSEQUENCE:** ANTI-PATTERNS.md rule §22 + port refactor rules MUST map V0.2 `leading-tight` (1.25) → custom inline `leading-[1.25]` OR accept 1.3 (close enough · 0.05 line-height diff)
- **PORT REFACTOR RULE UPDATE:** rule §22 (in §4 above) — V0.2 `leading-tight 1.25` → use `leading-[1.25]` inline · do not rely on `--leading-snug`

### 10.2 `--duration-slow` collision
- Existing core-v2 value: **`500ms`** (base.css L476)
- §2.16 spec proposed: `600ms`
- **DECISION:** existing `500ms` wins · OG canonical · do NOT override
- **CONSEQUENCE:** V0_lite scroll animations (600ms) port → 500ms (barely perceptible diff)
- **REPLACEMENT FOR 600ms USE-CASES:** newly added `--duration-shimmer: 700ms` covers shimmer · newly added `--duration-medium: 500ms` covers entrance · 600ms specifically unused after additions

### 10.3 Tokens not added because already exist (no-op)
- `--leading-snug` (exists 1.3)
- `--shadow-card-hover` (exists at L139)
- `--duration-instant` `--duration-fast` `--duration-normal` `--duration-slow` `--duration-slowest` (existing core-v2 motion suite L470-478)

### 10.4 Final token count
- **49 tokens appended** to base.css (target was ~50 · 1 omitted due to existing `--leading-snug` collision)
- **396 total tokens** in base.css after addition (up from ~347)
- **3 legacy aliases** ensure V0_lite + V0.2 + report-store snippets render

---

**END · TOKEN-GAP-REPORT.md**
**Next doc:** CANONICAL-SOURCE-MAP.md (Stage 2.1)
