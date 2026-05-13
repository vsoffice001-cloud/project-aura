# Design System — Color System

**Module:** `ai-context/COLORS.md`  
**Version:** 4.3  
**Date:** 2026-03-18  
**Source of truth:** `/src/styles/theme.css`  
**Visual reference:** Dashboard → Foundations → Complete Color Palette

---

## 92-5-3 Color Usage Hierarchy

The single most important color rule: **92% foundation, 5% brand, 3% accent.**

| Tier | Usage % | Colors | Purpose |
|------|---------|--------|---------|
| Foundation | 92% | Black `#000000`, White `#ffffff`, Warm `#f5f2f1` | Page structure, backgrounds, text |
| Brand | 5% | Ken Bold Red `#b01f24` | CTAs ONLY — buttons, conversion actions |
| Accent | 3% | Purple, Periwinkle, Coral, Perano | Data viz, badges, card differentiation |

### Element-Color Classification

| Element | Allowed Colors | Forbidden |
|---------|---------------|-----------|
| Section backgrounds | Black, White, Warm | Accent colors, brand red |
| Body text | `black/70`, `black/50` | Red, accent colors |
| Headings | Black, White (on dark bg) | Red, accent colors |
| CTA buttons | `--brand-red` (brand variant) | Any other color for brand CTAs |
| Secondary buttons | Black/neutral at rest, brand-red on hover | Full-time red |
| Content icons | `#806ce0` (iconColors.content) | Brand red, arbitrary hex |
| Utility icons | `#737373` (iconColors.utility) | Brand red, accent colors |
| Badge backgrounds | Theme-based (11 themes) | Hardcoded colors |
| Card shadows | Purple-tinted (`rgba(128,108,224,0.08)`) | Brand red shadows |

### Purple Boundaries
- Purple is for **card shadows, content icons, and badge themes** only
- NEVER use purple as a section background (use Black/White/Warm)
- NEVER use purple for text (use black tints)
- Purple shadow: `0 4px 16px rgba(128,108,224,0.08)` for cards

---

## Primary Brand Colors

```css
--brand-red: #b01f24;        /* Ken Bold Red - PRIMARY BRAND */
--brand-red-hover: #8f181d;  /* Hover state */
--brand-red-active: #771419; /* Active/pressed state */

--black: #000000;            /* Pure black */
--white: #ffffff;            /* Pure white */
```

### WHEN
- Use `--brand-red` ONLY for CTAs and conversion buttons
- Use `--black` for primary buttons, text, hero backgrounds
- Use `--white` for standard section backgrounds

### WHEN NOT
- **NEVER use red for decorative purposes** (CTAs only!)
- Don't use red for borders, icons, or general accents
- Don't use gray — use black tints instead

---

## Black Tints

```css
--black-50: #fafafa;   /* Near white */
--black-100: #f5f5f5;  /* Card backgrounds */
--black-200: #e5e5e5;  /* Borders, dividers */
--black-300: #d4d4d4;  /* Disabled states */
--black-400: #a3a3a3;  /* Placeholder text */
--black-500: #737373;  /* Secondary text */
--black-600: #525252;  /* Body text alternative */
--black-700: #404040;  /* Headings alternative */
--black-800: #262626;  /* Strong text */
--black-900: #171717;  /* Deep backgrounds */
```

### Common Opacity Patterns
- `black/70` — Body text opacity
- `black/50` — Secondary text
- `black/8` — Subtle borders

---

## Warm Palette (Highlighted Sections)

```css
--warm-100: #fcfbfa;   /* Very subtle */
--warm-200: #f9f7f6;   /* Soft card backgrounds */
--warm-300: #f5f2f1;   /* BASE - Section backgrounds */
--warm-500: #eae5e3;   /* Borders */
--warm-600: #d9d1ce;   /* Timeline base */
--warm-700: #c8bcb8;   /* Timeline nodes */
```

### WHEN
- Challenges section background
- Methodology section background
- Alternating section pattern

### WHEN NOT
- Don't use for hero sections (use pure black)
- Don't use for final CTA (use pure black)

---

## Red Scale (Full 50–900)

Brand red is `--red-600`. Full scale for backgrounds/badges and hover states.

```css
--red-50: #fef2f2;     /* Lightest — subtle backgrounds, alert highlights */
--red-100: #fee2e2;    /* Notice backgrounds, hover states */
--red-200: #fecaca;    /* Disabled states, soft accents */
--red-300: #fca5a7;    /* Borders, dividers */
--red-400: #f87176;    /* Icons, secondary buttons */
--red-500: #dc3238;    /* Links, active states */
--red-600: #b01f24;    /* PRIMARY BRAND (= --brand-red) — CTAs */
--red-700: #8f181d;    /* Hover (= --brand-red-hover) */
--red-800: #771419;    /* Active (= --brand-red-active) */
--red-900: #5f1014;    /* Darkest — text on light, deep emphasis */
```

---

## Accent Colors (Decorative Palette)

Four families for badges, data viz, and section variety. Each has full 50–900 scale in `theme.css`.

### Purple — Premium, Innovation, Insights
```css
--purple-50: #f7f6fe;   /* Lightest backgrounds */
--purple-500: #9488ec;  /* Standard interactive */
--purple-600: #806ce0;  /* BASE — features, insights, content icons */
--purple-900: #483c80;  /* Darkest text/accents */
```

### Periwinkle — Trust, Reliability, Soft Accents
```css
--periwinkle-50: #fafbfe;   /* Lightest backgrounds */
--periwinkle-500: #c3c6f9;  /* BASE — trust indicators */
--periwinkle-600: #a7abf0;  /* Standard interactive */
--periwinkle-900: #5a5fa0;  /* Darkest text */
```

### Coral/Terracotta — Warmth, Energy, Approachability
```css
--coral-50: #fffbf9;    /* Warmest white */
--coral-500: #f99b85;   /* Bright coral accent */
--coral-600: #ea7a5f;   /* BASE — terracotta coral */
--coral-900: #a23f2d;   /* Burnt terracotta */
```

### Perano (Light Blue) — Calm, Professional, Data
```css
--perano-50: #fcfdfe;    /* Barely visible backgrounds */
--perano-500: #dfeafa;   /* BASE — data sections, calm backgrounds */
--perano-600: #c8dff5;   /* Borders, dividers */
--perano-900: #6b94c0;   /* Darkest text */
```

### Accent Usage Rules
- Use for Badge component themes (`purple`, `periwinkle`, `coral`, `info`)
- Use for data visualization differentiation
- Don't use accent colors for primary CTAs (use `--brand-red`)
- Don't use accent colors for section backgrounds (use black/white/warm)
- Don't mix more than 2–3 accent families in a single view

---

## Utility Colors (Semantic States)

Three families for success/warning/error. **Distinct from decorative accents** — use only for semantic meaning.

### Green — Success, Growth, Positive
```css
--green-50: #ecfdf5;     /* Success backgrounds */
--green-500: #10b981;    /* BASE — success messages */
--green-600: #059669;    /* Impact metrics */
--green-900: #064e3b;    /* Success text on light */
```

### Amber — Warning, Attention, Caution
```css
--amber-50: #fffbeb;     /* Warning backgrounds */
--amber-500: #f59e0b;    /* BASE — warning messages */
--amber-600: #d97706;    /* Warning buttons */
--amber-900: #78350f;    /* Warning text on light */
```

### Rose — Error, Validation, Destructive (DISTINCT from Brand Red)
```css
--rose-50: #fff1f2;      /* Error backgrounds */
--rose-500: #f43f5e;     /* BASE — error messages */
--rose-600: #e11d48;     /* Destructive actions */
--rose-900: #881337;     /* Error text on light */
```

### Semantic Usage Rules
- Use for Badge themes (`success`, `warning`, `error`)
- Use for form validation states
- Use for toast/alert feedback
- Don't use `--rose-*` as substitute for `--brand-red`
- Don't use semantic colors decoratively

---

## Section Color Recipe

### Case Study Pages

| Section | Background | Text | Why |
|---------|-----------|------|-----|
| Hero | Black `#000` | White | Maximum contrast, editorial drama |
| Client Context | White `#fff` | Black/70 | Clean, readable |
| Challenges | Warm `#f5f2f1` | Black/70 | Visual break, warmth |
| Objectives | White | Black/70 | Clean |
| Methodology | Warm | Black/70 | Visual break |
| Impact | White | Black/70 | Clean |
| Value Pillars | White | Black/70 | Clean (border-t separator) |
| Testimonial | White | Black/70 | Clean (border-t separator) |
| Resources | Black (gradient mesh) | White | Dark drama, card contrast |
| Final CTA | White | Black/70 | Clean (border-t separator) |

### Report Store Pages

| Section | Background | Text | Why |
|---------|-----------|------|-----|
| ReportStoreHero | Black `#000` | White | Maximum impact |
| QuickAccessBar | Neutral50 `#fafafa` | Black/70 | Subtle divider |
| FeaturedResearch | White `#fff` | Black/70 | Clean cards |
| KeyMarketIndicators | Warm `#f5f2f1` | Black/70 | Visual break |
| RecommendedForYou | White | Black/70 | Clean cards |
| DailyDataHighlights | White (border) | Black/70 | Clean |
| AnalystPicks | Warm | Black/70 | Visual break |
| IndustrySectorsGrid | White | Black/70 | Clean grid |
| ResearchMethodology | Warm | Black/70 | Visual break |
| CustomResearchCTA | Black | White | Dark CTA section |

### Molecule Color Patterns

| Component | Colors | Note |
|-----------|--------|------|
| Card hover | `translateY(-2px)` + shadow intensify | No color change, just depth |
| Card border | `rgba(0,0,0,0.06)` rest → `rgba(0,0,0,0.10)` hover | Pure black opacity |
| Filter selected | `border-l-[3px] border-black` + `bg-black/[0.04]` | Monochromatic only |
| Content icons | `#806ce0` (purple-600) | Via `iconColors.content` |
| Utility icons | `#737373` (black-500) | Via `iconColors.utility` |
| Stat growth (+) | `--green-600` (#059669) | Semantic positive |
| Stat growth (-) | `--rose-500` (#f43f5e) | Semantic negative |

### Inline Style Color Rules

- ALWAYS use `rgba()` format or `var()` for inline style colors
- NEVER use hex colors in inline styles (e.g., `color: '#b01f24'` is WRONG)
- NEVER use CSS shorthand for `border` or `background` in inline styles — use longhand properties
- Use `style={{ color: 'rgba(0,0,0,0.7)' }}` or `style={{ color: 'var(--brand-red)' }}`

---

**v4.3 | March 18, 2026 | Part of [ai-context/](.) module system**