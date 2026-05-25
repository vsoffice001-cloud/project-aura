# OG Token Audit · Spacing

**Source-of-truth:** `src/styles/theme.css:557–586` (scale + aliases + card padding) · `theme.css:80–101` (containers + section py) · `theme.css:605–627` (badge padding sub-scale) · `theme.css:430–453` (button padding sub-scale) · `src/design-system/tokens.ts:123–153` · `ai-context/LAYOUT.md`
**Audit date:** 2026-05-14 · WWWWH framework

---

## WWWWH

**WHAT** — Spacing is a **4px base-unit modular scale** (`--spacing-base-unit: 4px`) with named t-shirt tokens (`--space-2xs` → `--space-5xl`), numeric aliases (`--space-4`, `--space-6`, `--space-12`), container width tokens (page · content · narrow · prose · compact), responsive padding tokens (mobile · tablet · desktop), section vertical-spacing tokens, plus component-specific padding sub-scales (card · button · badge).

**WHY a separate domain** — Spacing controls **rhythm** (vertical scan flow) and **density** (information-per-screen). A 4px base unit ensures every margin/padding/gap is a multiple of 4 — visual grid never misaligns. Container tokens enforce **Baymard's readability law** (50–75 chars/line). Without tokenized spacing, a 17px padding leaks in and breaks the rhythm forever.

**WHEN to use** ✅
- Use `--space-md` (16px) for default element spacing
- Use `--space-2xl` (48px) for between-section spacing on mobile · `--space-3xl` (64px) tablet · `--section-py-desktop` 80px desktop
- Use `--container-content` (1000px) for standard sections + card grids
- Use `--container-prose` (700px) for long-form paragraph text (~65–70 chars at 16px · Baymard optimum)
- Use `--padding-mobile / -tablet / -desktop` for horizontal page padding (16/24/32)
- Use `--card-padding-*` for card internal padding
- Use `--button-px-*` / `--button-py-*` for button padding (don't mix with `--space-*`)

**WHEN NOT to use** ❌
- NEVER hardcode `padding: 17px` (arbitrary values break the grid · `LAYOUT.md:35`)
- NEVER use `--container-page` (1200px) for body text — too wide for readability (`LAYOUT.md:65`)
- NEVER use `--container-compact` (600px) for card grids — too narrow (`LAYOUT.md:66`)
- NEVER use `max-w-6xl` Tailwind — use container tokens (`LAYOUT.md:68`)
- NEVER double-pad inside SectionWrapper children — wrapper already handles `px-4 sm:px-6 md:px-8` (`LAYOUT.md:130`)
- NEVER use `--space-*` tokens for button/badge internals — they have their own sub-scales

**WHERE deployed** — Every layout · every gap · every section · `Container.tsx` (consumes container widths) · `SectionWrapper.tsx` (consumes section py + padding) · `Card.tsx` (card-padding tokens) · `Button.tsx` (button-px/py tokens) · `Badge.tsx` (badge-px/py tokens).

**HOW to consume**
```tsx
// Standard section pattern (LAYOUT.md:150-156)
<section className="py-12 sm:py-16 md:py-20">
  <div className="px-4 sm:px-6 md:px-8 mx-auto max-w-[var(--container-content)]">
    {/* content */}
  </div>
</section>

// PREFERRED — SectionWrapper handles all spacing
<SectionWrapper background="white" spacing="lg" maxWidth="wide">
  {/* content — no px/py needed */}
</SectionWrapper>

// Inline gap via var
<div style={{ gap: 'var(--space-lg)' }}>

// NEVER:
<div className="p-[17px]">     // ❌ arbitrary
<div className="max-w-6xl">    // ❌ bypasses container tokens
```

---

## Base unit (`theme.css:566`)

```css
--spacing-base-unit: 4px;
```

**WHY 4px not 8px** — 4px gives finer granularity for tight UI (badges, micro-pills, icon padding) while still maintaining a regular grid. 8px-only systems force awkward decisions like "is this 8 or 16?" with no in-between. 4px halves are intentional.

**WHY rem not px in scale** — Rem allows future accessibility scaling via root font-size change. Comments preserve px equivalents for designer mental math.

---

## Primary scale (T-shirt naming · `theme.css:567–576`)

| Token | rem | px | Multiplier | Role |
|---|---|---|---|---|
| `--space-2xs` | `0.25rem` | 4px | 1× | Tightest spacing · inline gap |
| `--space-xs` | `0.5rem` | 8px | 2× | Compact · icon padding |
| `--space-sm` | `0.75rem` | 12px | 3× | Small gaps · between badges |
| `--space-md` | `1rem` | 16px | 4× | **DEFAULT** · element spacing · card internal |
| `--space-lg` | `1.5rem` | 24px | 6× | Medium · between cards · form gap |
| `--space-xl` | `2rem` | 32px | 8× | Large · between blocks |
| `--space-2xl` | `3rem` | 48px | 12× | Section spacing (mobile) |
| `--space-3xl` | `4rem` | 64px | 16× | Large sections (tablet) |
| `--space-4xl` | `6rem` | 96px | 24× | XL sections |
| `--space-5xl` | `8rem` | 128px | 32× | Maximum |

**Progression** — Doubles between most tiers (4→8→16→32→64→128) with intermediate steps (12, 24, 48, 96) for finer control. NOT a strict 1.25× geometric scale like type — spacing benefits from doubling rhythm.

**Modification risk** — Changing base 4px breaks every Tailwind padding class (Tailwind's default scale also = 0.25rem unit). Don't.

---

## Numeric aliases (`theme.css:578–581`)

```css
--space-4:  var(--space-md);    /* 16px */
--space-6:  var(--space-lg);    /* 24px */
--space-12: var(--space-2xl);   /* 48px */
```

### WHY two naming systems

- **T-shirt names (`--space-md`)** → semantic · communicate intent ("this is the default")
- **Numeric aliases (`--space-4`)** → match Tailwind's spacing scale (where 4 = 1rem = 16px) for developer cross-reference

Some components were authored against Tailwind mental model (`p-4 p-6 p-12`) and migrated by aliasing. New code SHOULD prefer t-shirt names; numeric aliases preserved for compatibility (`theme.css:578` inline comment: *"Numeric aliases (used in some components as --space-4, --space-6, --space-12)"*).

**Anti-pattern** — Creating new numeric aliases (`--space-8`, `--space-16`) — proliferates without semantic gain. Only 4/6/12 codified because those map to existing component churn.

---

## Container width tokens (`theme.css:80–84`)

```css
--container-page:    75rem;     /* 1200px */
--container-content: 62.5rem;   /* 1000px */
--container-narrow:  56.25rem;  /* 900px */
--container-prose:   43.75rem;  /* 700px */
--container-compact: 37.5rem;   /* 600px */
```

### Readability law verbatim (`theme.css:59–63`)

> *"READABILITY LAW (Baymard Institute / UX research):"*
> *"- Optimal line length: 50-75 characters per line"*
> *"- At 16px body: ~700px = 65-70 chars (ideal)"*
> *"- At 20px body: ~600px = 55-60 chars (acceptable)"*
> *"- Never exceed 80 chars per line — causes reader fatigue"*

| Token | px | Decision | Char count @ 16px |
|---|---|---|---|
| `--container-page` | 1200 | Outer page shell · navbar · full-bleed heroes | n/a (structural) |
| `--container-content` | 1000 | Standard sections · card grids · main content | n/a (multi-col) |
| `--container-narrow` | 900 | CTAs · testimonials · focused content | ~90 (top end) |
| `--container-prose` | 700 | Long-form paragraphs · body copy | **~65–70 (IDEAL)** |
| `--container-compact` | 600 | Tight descriptions · methodology blurbs | ~55–60 (compact) |

**Modification risk** — Widening `--container-prose` past 800px violates Baymard ceiling; narrowing below 600px breaks card-grid 3-col on tablet.

---

## Responsive padding (`theme.css:87–89`)

```css
--padding-mobile:  1rem;     /* 16px */
--padding-tablet:  1.5rem;   /* 24px */
--padding-desktop: 2rem;     /* 32px */
```

### Mobile-first principles verbatim (`theme.css:71–76`)

> *"- Fitts's Law: Touch targets min 44px, generous tap spacing on mobile"*
> *"- Miller's Law: Reduce visible options on small screens (progressive disclosure)"*
> *"- Hick's Law: Simpler choices on mobile = faster decisions"*
> *"- Proximity: Tighter grouping on mobile to show relationships in limited space"*
> *"- Content stacking: 1-column below 640px, 2-col at 768px, multi-col at 1024px+"*

**WHY 16/24/32 ramp** — Each step = +50% of previous. Phones need edge-to-edge feel · tablets need breathing room · desktop needs editorial generous margins. Standard Tailwind ramp is 16/24/32 (`px-4 sm:px-6 md:px-8`).

**Standard pattern** (`LAYOUT.md:150–156`):
```tsx
<section className="py-12 sm:py-16 md:py-20">
  <div className="px-4 sm:px-6 md:px-8 mx-auto max-w-[var(--container-content)]">
```

---

## Section vertical spacing (`theme.css:92–101`)

```css
/* Mobile-first vertical spacing */
--section-py-mobile:   3rem;   /* 48px = py-12 */
--section-py-tablet:   4rem;   /* 64px = sm:py-16 */
--section-py-desktop:  5rem;   /* 80px = md:py-20 */

/* Composition tokens (used by ResourcesSection, SectionHeader) */
--section-py-standard:        3rem;       /* 48px mobile-first */
--section-header-mb:          3rem;       /* 48px gap after section header block */
--pair-label-heading:         0.75rem;    /* 12px gap label→heading */
--pair-heading-description:   1rem;       /* 16px gap heading→description */
--text-measure:               43.75rem;   /* 700px max width for readable text */
```

**WHY 48/64/80 not 32/48/64** — 48px floor establishes the editorial "breath" between sections. Going below 48px on mobile makes sections feel tabbed-together not narrative-chunked.

**WHY pair-label-heading 12px not 16px** — Tighter pair-grouping creates a "title block" Gestalt (proximity). 12px reads as "these belong together" · 16px reads as "two separate things."

### SectionWrapper spacing tiers (`LAYOUT.md:112–118`)

| Tier | Mobile | Desktop |
|---|---|---|
| `sm` | 32px | 48px |
| `md` | 40px | 64px |
| `lg` | 48px | 80px (DEFAULT) |
| `xl` | 64px | 96px |

---

## Component-specific padding sub-scales

### Card padding (`theme.css:583–586`)

```css
--card-padding-sm: 0.75rem;   /* 12px */
--card-padding-md: 1rem;      /* 16px */
--card-padding-lg: 1.5rem;    /* 24px */
```

**WHY a sub-scale not just `--space-*`** — Cards have a 3-tier density pattern (compact / standard / spacious) that needs semantic naming. `--space-sm/-md/-lg` would conflict with general element spacing decisions inside the card.

### Button padding (`theme.css:430–449`)

```css
/* Horizontal */
--button-px-sm: 1.25rem;     /* 20px */
--button-px-md: 1.75rem;     /* 28px */
--button-px-lg: 2.25rem;     /* 36px */
--button-px-xl: 2.5rem;      /* 40px */

/* Vertical (for auto-height buttons) */
--button-py-sm: 0.625rem;    /* 10px */
--button-py-md: 0.875rem;    /* 14px */
--button-py-lg: 1rem;        /* 16px */

/* Min widths */
--button-min-width-sm: 5rem;   /* 80px */
--button-min-width-md: 7rem;   /* 112px */
--button-min-width-lg: 9rem;   /* 144px */
```

**WHY button px non-standard (20/28/36/40)** — Optical balance between text width and button "presence." 16px padding around 14px text feels skimpy · 28px feels confident. These DO NOT follow the 4px scale strictly — `--button-px-sm: 20px` is on scale, but `--button-px-md: 28px` is 7×4 (intentional asymmetry for visual weight).

**WHY py smaller than px** — Vertical breathing < horizontal breathing matches reading-direction visual weight (wider-than-tall buttons feel stable).

**WHY min-widths** — Prevents short-label buttons ("Buy") from collapsing to non-tappable widths. WCAG 2.5.5 touch target ≥ 44×44px.

### Badge padding sub-scale (`theme.css:605–627`)

Each badge size has its own `py / px / tracking` triplet to maintain ~0.77 py-to-font ratio (optical balance).

| Size | Font | py | px | Tracking |
|---|---|---|---|---|
| xs | 9px | 3px | 8px | 0.075em (~1.2px) |
| sm | 11px | 5px | 10px | 0.09em (~1.5px) |
| md | 13px | 6px | 12px | 0.10em (~1.6px) |
| lg | 15px | 7px | 14px | 0.12em (~2.0px) |

**WHY 0.77 ratio** (`theme.css:602`) — *"PADDING RATIO: ~0.77 (py ÷ font) for optical balance"*. Tested ratio that keeps pill height proportional regardless of size.

---

## Grid gutters / gap conventions

Not tokenized as separate vars; consume `--space-*`:
- **Card grid gap** — typically `gap: var(--space-lg)` (24px) or `gap: var(--space-md)` (16px) for dense
- **Inline element gap** — `gap: var(--space-xs)` (8px) inside cards
- **Form field gap** — `gap: var(--space-md)` (16px) between rows

`useResponsiveGutter` hook (referenced in `LAYOUT.md:306` Resources section) generates responsive gaps for masonry grids — not in token file.

---

## Anti-patterns (master list)

| Anti-pattern | Where banned | Use instead |
|---|---|---|
| Arbitrary `padding: 17px` | `LAYOUT.md:35` | Nearest `--space-*` token |
| `max-w-6xl` Tailwind | `LAYOUT.md:68` | `max-w-[var(--container-content)]` |
| `--container-page` for body text | `LAYOUT.md:65` | `--container-prose` (700px) |
| Double padding inside SectionWrapper | `LAYOUT.md:130` | Let SectionWrapper own px-4 sm:px-6 md:px-8 |
| `--space-*` inside button padding | implicit | `--button-px-*` / `--button-py-*` |
| Hardcoded `max-w-[1200px]` | `LAYOUT.md:67` | `max-w-[var(--container-page)]` |
| Numeric alias for new code (`--space-8`) | by convention | T-shirt `--space-xl` instead |

---

## REUSABILITY SCORE
**5/5 ⭐⭐⭐⭐⭐** — Every layout · every section · every card consumes spacing tokens. Highest churn of any token domain.

## LINKED concepts
- **typography.md** — line-height + spacing-md (16px) determine reading rhythm
- **shadow.md** — card spacing + shadow depth jointly create elevation cue
- **radius.md** — corner radius scales with card-padding (10px radius on 24px padding card = optical match)
- **SectionWrapper.tsx** — consumer of `--section-py-*` + `--padding-*` + `--container-*`
- **Container.tsx** — consumer of `--container-*` width tokens
- **Card.tsx** — consumer of `--card-padding-*` + corner radius
- **Button.tsx** — consumer of `--button-px-*` + `--button-py-*` + min-widths
- **Badge.tsx** — consumer of `--badge-*-py/-px/-tracking` sub-scale
- **Tailwind config** — must match spacing scale (4px unit ensures Tailwind `p-N` classes align)
