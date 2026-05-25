# COMPOSITION_GRAMMAR.md · Ken Research DS v2

**Canonical companion to FOUNDATIONS.md + RULES.md.** Extracted from V0_lite_report-legacy + report-store-legacy parallel audit · 2026-05-15.

> FOUNDATIONS.md = TOKENS (vocabulary)
> RULES.md = HARD RULES (grammar)
> **COMPOSITION_GRAMMAR.md = USE-CASE GRAMMAR (when X · why X · how X composes)**

Without this doc · AI cannot infer "which badge for what" or "when horizontal vs vertical" or "what gap inside this card." DS without composition grammar = vocabulary without sentence structure.

---

## §1 · SECTION LABEL TAXONOMY · 9 canonical variants

Atom: `SectionLabel` at `atoms/SectionLabel.tsx` · already supports all 9.

| # | Variant | Code shape | WHERE | WHY semantic |
|---|---|---|---|---|
| L1 | text · light · default | `<SectionLabel>` | Neutral eyebrow · low-emphasis sections | Quietest identifier · no semantic weight |
| **L2** | **text · light · accent** | `<SectionLabel variant="accent">` | **DEFAULT eyebrow for light editorial sections** | **Red carries brand pulse · canon for all chapter eyebrows** |
| L3 | text · dark · default | `<SectionLabel background="dark">` | Cinematic eyebrows neutral | Reduces contrast on `#0a0a0c` |
| L4 | text · dark · accent | `<SectionLabel background="dark" variant="accent">` | Cinematic eyebrows w/ emphasis | Coral (not red) chosen — red dies on `#0a0a0c` |
| L5 | text + pulse · light | `<SectionLabel variant="accent" pulse>` | "New Report Available" · "Live now" | Liveness signal · ONLY for fresh/available semantics |
| L6 | text + pulse · dark | `<SectionLabel background="dark" variant="accent" pulse>` | Hero "Live" on cinematic | Same as L5 on dark |
| L7 | text + icon | `<SectionLabel icon={<Shield/>}>` | Domain flavor · trust/data/premium cues | Icon = category cue · mutually exclusive w/ pulse |
| L8 | pill · light | `<SectionLabel style="pill">` | "OBJECTIVE 01" · "STEP 02" numbered sequence | Pill implies ordinal progression · shimmer = interactive feel |
| L9 | pill · light · accent | `<SectionLabel style="pill" variant="accent">` | "CHAPTER 01" red-bordered | Pill + accent = numbered + branded · chapter spine |

**Pulse color rule:**
- **Brand red / Coral pulse** = NEW / AVAILABLE / RELEASE (rare event)
- **Green pulse** = LIVE DATA / REALTIME (continuous stream) — render via Badge atom w/ green dot, NOT SectionLabel

**Anti-patterns:**
- ❌ NEVER inline-styled eyebrow `<p>` — always SectionLabel
- ❌ NEVER `variant="default"` on chapter pages — chapters carry brand · use `accent`
- ❌ NEVER pulse for static "Updated" / "Featured" — pulse = dynamic only
- ❌ NEVER mix SectionLabel + SectionHeading's `eyebrow` prop — pick ONE eyebrow source per section

---

## §2 · BADGE TAXONOMY · 10 canonical variants

| # | Variant | Use case | Visual signature |
|---|---|---|---|
| B1 | Section eyebrow | (use SectionLabel instead — Badge is for content) | n/a |
| B2 | Pulse eyebrow w/ green dot | "Live Data" status | Green dot 2x2 · pulse animate · `theme=neutral` minimal |
| B3 | Step pill | Methodology step indicators | Pill · warm · bordered · shimmer |
| B4 | Objective pill static | Case-study numbered objectives | Pill · neutral · bordered |
| B5 | Objective pill interactive | Clickable objective cards | Pill md · neutral · bordered · shimmer · `role="button"` |
| B6 | Info card label | Sub-labels inside data cards | Minimal · xs · opacity 0.7 |
| B7 | Category badge | Industry/category tags on cards | Rounded (5px · not pill) · bordered · `--radius-element` |
| B8 | Status badge | Order status · success/warning/error | Rounded · semantic color · bordered |
| **B9** | **On-image badge** | **Top-left of report cover images · "Hot" / "New" / "Featured"** | **Rounded xs · brand/neutral/warm · dark-mode tokens · higher opacity to survive over photo** |
| **B10** | **IndustryBadge** (separate atom) | **Industry/subcat text ABOVE card title** | **Text-only · `text-2xs` · `rgba(0,0,0,0.4)` · uppercase 0.06em tracking · NO shape · refuses to compete w/ title** |

**Hard rule:** Industry text is NEVER chipped (use IndustryBadge atom). Badge w/ `theme=brand` red is NEVER placed next to a Button — competes w/ the only red allowed (CTA).

---

## §3 · SECTION HEADER TRIO COMPOSITION

Universal pattern across both legacy projects:

```
┌─────────────────────────────────────────────────────────────┐
│ EYEBROW LEFT                            [optional endSlot]  │ ← mb-2 (8px)
├─────────────────────────────────────────────────────────────┤
│ H2 SECTION TITLE                        [optional action ↗] │ ← horizontal split when action exists
│ subtitle text descriptions sit below title                  │ ← mt-2 (8px)
└─────────────────────────────────────────────────────────────┘
                                                                ← mb-10 (40px) before content grid
```

**Hard rules:**
1. **Default align = `left`** · center reserved for HERO only · right NEVER
2. **Eyebrow ABOVE H2** — never beside · 8-12px gap below
3. **Subtitle BELOW H2** — never beside · `mt-2/3` (8-12px)
4. **CTA on RIGHT of H2 (same row)** when section has "View All →" action · `flex items-end justify-between gap-6`
5. **Trio AS BLOCK = vertical internally** · trio vs CTA outer = HORIZONTAL split (never stacks even mobile · CTA shrinks to icon if needed)
6. **`labelEndSlot` (extra controls)** = inline right at md+ · reflows below heading on mobile (`flex md:hidden mt-3`)
7. **Title `max-w-lg` when centered hero · no max when left-aligned listing**

**3 canonical gaps (memorize):**
- Eyebrow → H2 · **12px** (`--pair-label-heading` · `mb-3`)
- H2 → subtitle · **12px** (`--pair-heading-description` · `mt-3`)
- Subtitle → content grid · **40px** (`--section-header-mb` · `mb-10`)

---

## §4 · LAYOUT DIRECTION DECISION TREE

10 universal rules · emerge from 20+ legacy file audit.

### Rule 1 · Sibling / equal-weight (2-5 items) → HORIZONTAL
Stats · CTAs · cards · badges · KPIs · footer-link columns.
Mobile fallback: `grid-cols-1` for cards, `flex-wrap` for pills, NEVER `flex-col` for pills.

### Rule 2 · Parent → child hierarchy → VERTICAL
Eyebrow → H2 → subtitle → body. Card image → content. Hero title → CTA → stats. NEVER inverted.

### Rule 3 · Reading-oriented content → VERTICAL
Prose · FAQ list · filter sidebar · 3+ field forms.

### Rule 4 · Action-oriented compact bars → HORIZONTAL
Toolbars · filter bars · search bars · footer bottom-bars · header navs.
Wrap to `flex-col` only below `sm`.

### Rule 5 · Section-header internal trio → VERTICAL · trio-vs-CTA → HORIZONTAL
See §3 above.

### Rule 6 · Hero composition
- Text-block LEFT + visual RIGHT @ `lg+` (`grid lg:grid-cols-2`)
- Stacks below `lg`
- Text-block internal = VERTICAL (eyebrow → H1 → sub → CTAs → stats)
- CTA row = `flex-row` at `sm+` · `flex-col items-stretch` below `sm` · MAX 2 buttons

### Rule 7 · Forms
- 1-2 fields → `flex-col sm:flex-row gap-3`
- 3+ fields → `flex-col` always (vertical · one per line)
- Filter sidebar → vertical · MobileFilterSheet replacement below `lg`

### Rule 8 · Meta rows → `flex-wrap`, NEVER `flex-col`
EXCEPT when relocated to right-rail column → `flex-col items-end`

### Rule 9 · Mobile-first default
`flex-col` / `grid-cols-1` default · `sm:`/`md:`/`lg:flex-row`/`grid-cols-N` upgrades.
Exception: hero stats `grid-cols-3` always (compressed) · pill meta `flex-wrap` always.

### Rule 10 · Card image position determines card direction
- Image-top (16/9 aspect) → vertical card (`flex flex-col`)
- Image-left (2/3 portrait · `w-16/20`) → horizontal card
- No image-right canon

### Decision flowchart
```
content = sibling cards/stats/CTAs (2-5)? → HORIZONTAL @ sm+ · stack mobile
content = parent→child hierarchy?         → VERTICAL · no transform
content = reading prose / FAQ / sidebar?  → VERTICAL · no transform
content = toolbar / filter bar / nav?     → HORIZONTAL · flex-col mobile only
content = section-header trio?            → VERTICAL inside · HORIZONTAL split vs action
content = hero?                           → text-LEFT visual-RIGHT @ lg+ · vertical inside
content = form?                           → 1-2 fields row · 3+ col
content = meta?                           → flex-wrap (NEVER flex-col except right-rail)
content = card?                           → image-top vertical · image-left horizontal
```

---

## §5 · CARD COMPOSITION GRAMMAR

11 canonical card types · each w/ exact rhythm.

### 5.1 · Card type → grid context mapping

| Grid cols | Card variant | Title size | Body size | Image | Gap |
|---|---|---|---|---|---|
| 1-col list | ReportCard `list` | `--text-nav` (14px) | `--text-2xs` | 2:3 portrait `w-16/20` | `gap-4` |
| 2-col grid | ReportGridCard / ReportCard `grid` | `--text-nav` | `--text-2xs` | 16:9 | `gap-3 sm:gap-5` to `gap-6` |
| 3-col grid (xl+) | ReportCard `grid` / ReportGridCard | `--text-nav` | `--text-2xs` | 16:9 | `gap-6` |
| 4-col KPI | StatCard | label `--text-nav` · value `--text-xl` serif | `--text-xs` | icon w-8 | `gap-4` |
| 5-col compact | DataHighlightCard | `--text-xs` | `--text-xs` | icon w-3.5 | `gap-3` |
| Horizontal rail | ReportGridCard `w-64` | `--text-nav` | `--text-2xs` | 16:9 | rail-gap |
| Featured hero | ReportCard `featured` | `--text-base` 500 weight | `--text-xs` | full-bleed `min-h-[280-360px]` | n/a · 1× per section |
| Masonry | ReportGridCard | `--text-nav` | `--text-2xs` | 16:9 natural | `gutter=16px` |

**Default listing grid:** `grid sm:grid-cols-2 xl:grid-cols-3 gap-6` (NOT `lg:` — note `xl:` 1280px).

### 5.2 · Card internal rhythm (canonical pairings)

**ReportCard grid (vertical · image-top):**
```
Image (aspect-[16/9])
  ↓ p-4 (16px padding starts)
Eyebrow row (badge + industry inline)
  ↓ mb-2.5 (10px)
Title (line-clamp-2 · leading-snug · text-black/85 · var(--text-nav))
  ↓ mb-2.5 (10px)
Meta row 1 (badges flex-wrap)
  ↓ mb-2.5 (10px)
Meta row 2 (date · category)
  ↓ flex-1 (push footer down)
[no CTA in grid · CTA only in list variant]
```

**ReportCard list (horizontal · image-left):**
```
[Image w-16/20 portrait] [Content py-2.5 px-3/4] [Right rail py-2.5 pr-3/4]
                          ├ Eyebrow
                          │  ↓ mb-1.5 (6px · tighter — list density)
                          ├ Title
                          │  ↓ mb-1.5 (6px)
                          └ Meta
                                                  ├ Date
                                                  ├ Button secondary xs
                                                  └ (flex-col items-end)
```

**StatCard:**
```
[Badge top-left] [Icon tile w-8 top-right]
  ↓ mb-2.5 (10px)
Value (--text-xl · serif · 300 light · tabular-nums)
  ↓ mb-0.5 (2px · TIGHT pair — value+label read as one)
Label (--text-nav)
  ↓ mb-2.5 (10px)
Growth pill row
  ↓ mb-2 (8px)
Description text
  ↓ mt-auto pt-3 border-top --black-200
CTA footer (anchored)
```

**DataHighlightCard:**
```
[Time · Icon row]
  ↓ mb-2.5
Value (--text-base · serif)
  ↓ mb-0.5 (2px tight pair)
Title
  ↓ mb-1.5 (6px)
Growth pill
  ↓ mb-3 (12px)
[Source · Arrow footer · mt-auto pt-2.5 border-top]
```

### 5.3 · Card shell (base atom)

```css
radius: var(--rc-radius-card) = 10px
border rest:   1px solid rgba(0,0,0,0.06)
border hover:  1px solid rgba(0,0,0,0.10)
shadow rest:   0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)
shadow hover:  0 8px 30px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)
lift hover:    translateY(-2px) · 0.4s cubic-bezier(0.16, 1, 0.3, 1)
padding sm: 16 · md: 20 · lg: 24
```

Group-hover: every clickable card uses `group` + `group-hover:text-black` (75-85% opacity → full).
Stagger: `CardReveal delay={idx * 50ms}` first 8 items · instant after.

---

## §6 · WHEN TO USE WHICH CARD · decision rules

| Card type | WHEN |
|---|---|
| ReportCard grid | Default 2/3-col listings · IndustryReportSection grid mode |
| ReportCard list | Full-width listing list-view · FeaturedResearch side rail |
| ReportCard compact | TopDownloads ranked rows · narrow lists |
| ReportCard featured | Hero card 1× per section · `min-h-280-360` |
| ReportGridCard | Lean grids no save/CTA · QuickAccess · Masonry · scroll rails |
| StatCard | KPI 4-col grids · 7 slots · icon + animated value + growth pill + CTA footer |
| DataHighlightCard | 5-col ticker grids · density rails |
| AnalystPickCardB | Analyst quotes w/ nested mini-card |
| CategoryListCard | Sidebars · vertical category groupings |
| PhaseCard | Accordion-style chapter cards (V0_lite TOC) |

**Decision flowchart:**
```
need card with image?
├ yes 16:9 top + content below     → ReportCard grid (or ReportGridCard if no save/CTA needed)
├ yes 2:3 portrait left            → ReportCard list
└ yes full-bleed image overlay     → ReportCard featured

need KPI metric card?
├ rich (icon + value + growth + CTA) → StatCard
└ compact ticker                     → DataHighlightCard

need ranked list row?           → ReportCard compact
need analyst quote w/ ref?      → AnalystPickCardB
need category sidebar?          → CategoryListCard
need chapter TOC accordion?     → PhaseCard
```

---

## §7 · USAGE GRAMMAR — what to use where

### Eyebrows per section
- Hero w/ "Live" / "New" / "Available" → `<SectionLabel pulse>` (L5 · L6)
- Chapter section → `<SectionLabel variant="accent">CHAPTER N — TITLE</SectionLabel>` (L2)
- Methodology step → `<SectionLabel style="pill">STEP 0N</SectionLabel>` (L8)
- Premium content → `<SectionLabel icon={<Sparkles/>}>Premium</SectionLabel>` (L7)
- Live data section → `<Badge B2 pulse green>Live</Badge>` not SectionLabel

### Title pairing
- Hero → H1 serif 300 light · clamp `2.25rem → 5.5vw → 3.052rem` · tracking -0.02em
- Section → H2 serif 300 light · step `--text-xl → --text-2xl` · tracking -0.02em
- Subsection → H3 serif 300 light · step `--text-lg → --text-xl` · tracking -0.01em
- Card title → H4 sans 500 medium · `--text-nav` (14px) or `--text-base` (20px) for featured

### CTA placement per section
- Hero → 2 CTAs row at `sm+` · stack mobile · primary `brand` + secondary `ghost dark`
- Section header (listing) → "View All →" right of H2 same row · `secondary` variant
- Card grid item → no CTA in grid card · CTA only in list/featured variant
- Final CTA section → 2 CTAs row · primary `brand` (on dark) or `primary` (on light)

### Eyebrow format
- ASCII em-dash with spaces: `"CHAPTER 11 — METHODOLOGY"` NOT `"CHAPTER 11 · METHODOLOGY"`
- All caps · tracking 0.2em · font 600 · `--text-xs` (12.8px)

---

## §8 · ANTI-PATTERNS (composition specific)

- ❌ Inline-styled `<p>` for eyebrows — always `SectionLabel` atom
- ❌ Eyebrow + H2 + subtitle missing the 12/12/40px gap rhythm
- ❌ Center-aligned section header outside hero
- ❌ Subtitle BESIDE H2 (always below)
- ❌ CTA BELOW subtitle in listing section header (always right of H2 same row)
- ❌ "View All →" link as raw `<a>` not Button or CTALink
- ❌ Card grid using `flex-col` mobile fallback for cards (correct = `grid-cols-1`)
- ❌ Pill meta-row using `flex-col` (always `flex-wrap`)
- ❌ Hero CTAs `flex-col` at desktop (must be row at `sm+`)
- ❌ Card title weight 400 (must be 500 medium for sans card titles · 600 for featured)
- ❌ Hover translateY -1px or -4px (canonical = -2px exactly · cubic-bezier(0.16,1,0.3,1))
- ❌ ReportCard image w/o `aspect-[16/9]` (forces non-uniform grid heights)
- ❌ Cards w/o `group` class blocking `group-hover:text-black` discipline
- ❌ Mixing SectionLabel + SectionHeading `eyebrow` prop in same section (pick one)
- ❌ Industry text as `Badge` (must be `IndustryBadge` atom · no chip shape)

---

## §9 · WHY this doc exists

DS v2 first iteration shipped TOKENS only · AI built /sample technically-correct (token-compliant) but semantically WRONG (composition-drifted from legacy). Gap:
- Tokens describe vocabulary (`--text-xs · 12.8px`)
- Hard rules describe grammar (`R4.1.2 default size md`)
- **Composition grammar describes USE-CASE meaning** (`when section has View All CTA · title and CTA share same row` · `when hero status is "available" use pulse · "live data" use green pulse not red`)

Without composition grammar · every page-build burns tokens auditing legacy pages · DS does not scale.

**This doc is the single source of truth for "how should this look in actual UI."**

---

**Maintenance:** Update when new pattern emerges 3+ times in canonical pages. Single-instance ≠ canon. Two projects converged = strongest canon. Cite file:line for every rule.
