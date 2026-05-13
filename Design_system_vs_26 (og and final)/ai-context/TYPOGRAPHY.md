# Design System — Typography

**Module:** `ai-context/TYPOGRAPHY.md`  
**Version:** 4.3  
**Date:** 2026-03-18  
**Source of truth:** `/src/styles/theme.css`  
**Fonts:** `/src/styles/fonts.css`

---

## Font Pairing System (Two-Font Strategy)

### WHY
Contrast pairing creates editorial authority (Serif headings) while maintaining functional clarity (Sans body/UI). Proven editorial pattern used by NYT, Medium, and Stripe.

### WHAT
```css
--font-sans: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-serif: 'Noto Serif', Georgia, 'Times New Roman', serif;
--font-mono: 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace;
```

### WHEN
- **Serif** (`var(--font-serif)`) → h1-h3 headings, display text, hero titles, testimonial quotes, large editorial numbers
- **Sans** (`var(--font-sans)`) → Body text, buttons, badges, labels, navigation, forms, tooltips, card descriptions
- **Mono** (`var(--font-mono)`) → Code blocks, data tables, technical/metric values

### WHEN NOT
- NEVER use Serif for body text, buttons, labels, navigation, or any UI chrome
- NEVER use Sans for hero headings or section titles
- NEVER mix more than 2 custom typefaces

### Component-to-Font Mapping

| Component | Font Family | Reason |
|-----------|------------|--------|
| Hero h1, Section h2, h3 | `--font-serif` | Editorial authority |
| Testimonial quotes | `--font-serif` | Literary feel |
| Large display numbers | `--font-serif` | Visual weight |
| Body paragraphs | `--font-sans` | Readability |
| Buttons (all variants) | `--font-sans` | UI clarity |
| Badge / SectionLabel | `--font-sans` | Functional labels |
| Navigation / TOC | `--font-sans` | Compact readability |
| Form labels / inputs | `--font-sans` | Form UX |
| Card descriptions | `--font-sans` | Density |
| Code blocks | `--font-mono` | Monospace alignment |
| Metric values | `--font-mono` | Tabular data |

---

## Major Third Scale (1.25 Ratio)

### WHY
Mathematical progression creates harmonious visual hierarchy. 1.25× ratio provides clear size distinction while maintaining readability.

### WHAT
```css
--text-xs: 0.8rem;      /* 12.8px - Labels, metadata, categories */
--text-sm: 1rem;        /* 16px - Body text, descriptions — MOST USED */
--text-base: 1.25rem;   /* 20px - Large body, card titles */
--text-lg: 1.563rem;    /* 25px - Card titles (2-3 cards) */
--text-xl: 1.953rem;    /* 31.25px - Subsection headings (h3) */
--text-2xl: 2.441rem;   /* 39px - Section headings (h2) */
--text-3xl: 3.052rem;   /* 48.8px - Hero h1 — HERO ONLY */
--text-4xl: 3.815rem;   /* 61px - Extra large (challenge numbers) */
--text-5xl: 4.768rem;   /* 76.3px - Massive (rarely used) */
```

### Usage Rules

| Token | Pixel | Use For |
|-------|-------|---------|
| `--text-xs` | 12.8px | Labels, metadata, section eyebrows, badge text |
| `--text-sm` | 16px | ALL body text, paragraphs, descriptions (90% of text) |
| `--text-base` | 20px | Large body, card titles when 4+ cards in row |
| `--text-lg` | 25px | Card titles when 2-3 cards |
| `--text-xl` | 31.25px | Subsection headings (h3) |
| `--text-2xl` | 39px | ALL section headings (h2) |
| `--text-3xl` | 48.8px | Hero h1 and final CTA heading ONLY |

### WHEN NOT
- Don't use hardcoded font sizes unless spatial constraints require it
- Don't use `--text-3xl` for regular section headings (reserved for heroes)
- Don't skip scale levels (e.g., don't jump from xs to xl)

---

## Custom Font Sizes (Outside Scale)

### WHY
Navigation, compact UIs, and spatial constraints need specific pixel sizes not in the mathematical scale.

### WHAT
```css
--text-xs: 0.8rem;       /* 12.8px - All small text (unified — absorbed former --text-2xs) */
--text-compact: 0.875rem; /* 14px - Compact body text */
--text-nav: 0.875rem;    /* 14px - Navigation, TOC items */
--text-card-micro: 0.625rem; /* 10px - Side numbers, counts, micro-labels ONLY */
```

### WHEN
- `--text-nav`: TOC item titles, CTA descriptions, navigation menus
- `--text-compact`: Challenge cards (4+), dense content areas
- `--text-xs`: Navbar text, molecule labels, meta rows, chart labels, ALL main items/sub-items
- `--text-card-micro`: Side numbers, counts, micro-labels, filter accordion headings, chip text

### WHEN NOT
- Don't use for standard section headings (use scale)
- Don't use for body paragraphs (use `--text-sm`)
- Don't use `--text-card-micro` for main text items (ONLY for counts/numbers/micro-labels)

---

## Font Weights

```css
--font-weight-normal: 400;  /* Body text, paragraphs */
--font-weight-medium: 500;  /* Not used - skip */
--font-weight-semibold: 600; /* Headings, labels, emphasis */
```

### WHEN
- Use 400 for all body text and descriptions
- Use 600 for headings, navigation, labels, buttons

---

**v4.3 | March 18, 2026 | Part of [ai-context/](.) module system**