# OG Token Audit · Typography

**Source-of-truth:** `src/styles/theme.css:1–253` (CSS vars + ASCII rationale table) · `src/styles/fonts.css` (font imports) · `src/design-system/tokens.ts:61–114` · `ai-context/TYPOGRAPHY.md`
**Audit date:** 2026-05-14 · WWWWH framework

---

## WWWWH

**WHAT** — Typography is a **two-font editorial pairing** (Noto Serif + DM Sans + SF Mono mono fallback) layered on top of a **Major Third (1.25×) modular scale** anchored at 16px base. Tokens cover: font families · 9-step type scale (`--text-xs` → `--text-5xl`) · 2 outside-scale tokens (`--text-compact`, `--text-nav`) · 1 sub-scale micro (`--text-card-micro`) · 3 weights (`--font-weight-normal 400`, `--font-weight-medium 500`, semibold 600 used directly).

**WHY a separate domain** — Type carries the **editorial voice** (Noto Serif = authority · DM Sans = clarity) and the **information hierarchy** (size differentiation via 1.25× ratio). Mixing fonts/sizes with color tokens would let consumers eyeball pixel sizes inline, defeating the modular scale.

**WHEN to use** ✅
- Use `--text-sm` for ~90% of body copy (it's the base · 16px)
- Use `--text-2xl` for ALL section headings (h2 standard)
- Use `--text-3xl` for hero h1 and Final CTA only
- Use `--font-serif` inline only on editorial headings (SectionHeading · hero · testimonial quotes)
- Use `--font-sans` (default · inherited) for ALL UI chrome · body · forms · navigation
- Use `--font-mono` for code · metric values · tabular data

**WHEN NOT to use** ❌
- NEVER use `--text-3xl` for regular section headings — reserved for hero moments (`TYPOGRAPHY.md:81`)
- NEVER use serif for body / buttons / labels / navigation (`theme.css:28 · TYPOGRAPHY.md:29`)
- NEVER hardcode `font-size: 18px` — every value must map to a token (`theme.css:171`)
- NEVER use `--text-card-micro` for body text (only counts/numbers/micro-labels · `TYPOGRAPHY.md:110`)
- NEVER skip scale levels (xs → xl without stepping through) — breaks visual rhythm (`TYPOGRAPHY.md:84`)
- NEVER mix >2 custom typefaces (`theme.css:29`)

**WHERE deployed** — Inherited globally via `html { font-family: var(--font-sans) }` (`theme.css:641`) · serif applied per-component via inline `style={{ fontFamily: 'var(--font-serif)' }}` (e.g. `SectionHeading.tsx`) · scale tokens read via `style={{ fontSize: 'var(--text-2xl)' }}` everywhere.

**HOW to consume**
```tsx
// Sans-serif body (inherited — no action needed)
<p style={{ fontSize: 'var(--text-sm)' }}>Body copy</p>

// Editorial serif heading (must declare inline)
<h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-2xl)', fontWeight: 300 }}>
  Section title
</h2>

// Tailwind arbitrary
<p className="text-[length:var(--text-sm)] leading-[1.6]">

// NEVER:
<p style={{ fontSize: '18px' }}>           // ❌ hardcoded
<h2 className="text-3xl">                  // ❌ Tailwind generic, not scale-locked
<p style={{ fontFamily: 'Georgia' }}>      // ❌ bypass token
```

---

## Font families (`theme.css:41–43`)

```css
--font-sans:  'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-serif: 'Noto Serif', Georgia, 'Times New Roman', serif;
--font-mono:  'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace;
```

### Why this pairing — verbatim OG (`theme.css:7–39`)

> *"PRINCIPLE: Contrast through category (sans + serif), harmony through weight."*
>
> *"DM Sans (Sans-Serif): Body text, UI elements, buttons, labels, navigation — Geometric, modern, highly readable at small sizes — Optical sizing (opsz 9-40) adapts automatically — Weights: 300 (light), 400 (body), 500 (medium/labels), 700 (bold/buttons)"*
>
> *"Noto Serif (Serif): Headings, display text, hero titles, editorial moments — Classic proportions, editorial authority — Used for h1-h3 section titles, testimonial quotes, large numbers — Weights: 300 (light/headings), 400 (normal), 500 (medium emphasis)"*

**WHY Noto Serif + DM Sans not Georgia + Helvetica** — Noto Serif has the classic editorial proportions of a serif slab (NYT lineage) but is hinted for modern screens · DM Sans has optical-size variation (`opsz 9-40` in `fonts.css:11`) that geometrically tightens at large sizes — most sans fonts don't, so they look "loose" at 49px display.

**WHY mono for data not for code-only** — `SF Mono` first in stack (Apple system) keeps metric values monospaced for tabular alignment in Impact / Stats sections — falls back gracefully on Windows/Linux.

### Pairing rules verbatim (`theme.css:23–29`)

> *"✅ Serif headings + Sans body = Maximum contrast, editorial feel"*
> *"✅ Sans labels + Serif display = Functional clarity + visual impact"*
> *"✅ All UI chrome (buttons, badges, nav, forms) = ALWAYS Sans"*
> *"✅ Code/data = System monospace stack"*
> *"❌ NEVER use Serif for body text, buttons, labels, or navigation"*
> *"❌ NEVER mix more than 2 custom typefaces"*

### Implementation discipline (CRITICAL · `theme.css:31–38`)

> *"html root is set to DM Sans — everything inherits sans by default."*
> *"There is NO CSS rule that makes headings serif automatically."*
> *"Components must SET serif inline: fontFamily: 'var(--font-serif)'"*
> *"SectionHeading.tsx does this correctly for editorial headings."*
> *"Dashboard/UI headings stay DM Sans via inheritance (no override)."*
> *"If you create a new heading, decide: editorial (serif) or UI (sans)."*

**Modification risk** — Removing serif fallback (`Georgia`) → invisible-text-during-load on slow connections (`display=swap` mitigates · `fonts.css:32`). Changing stack order breaks Apple-first SF Mono optimization.

---

## Major Third scale (1.25× ratio · `theme.css:114–139`)

> OG inline: *"PURPOSE: Creates harmonious visual hierarchy through mathematical progression."* *"RATIO: Each size is 1.25× the previous size (Major Third musical interval)."* *"BASE: 16px (1rem) — Standard readable body text size."*

| Token | rem | px | Role · WHY this step | WHERE used (file:line refs) |
|---|---|---|---|---|
| `--text-xs` | `0.8rem` | 12.8px | Labels · metadata · molecule internals | Section eyebrows · IndustryBadge · CardMetaRow · Button xs · FilterCheckbox (`theme.css:131`) |
| `--text-sm` | `1rem` | 16px | **BASE** — body / paragraphs / descriptions (90% of all text) | All section body · ContactModal · HeroSection info cards (`theme.css:132`) |
| `--text-base` | `1.25rem` | 20px | Large body · card titles when 4+ cards | ChallengesSection · ResourceCard headings (`theme.css:133`) |
| `--text-lg` | `1.563rem` | 25px | Card titles when 2–3 cards | Mid-density card titles (`theme.css:134`) |
| `--text-xl` | `1.953rem` | 31.25px | Subsection headings (h3) · engagement objectives · methodology steps | h3 system-wide (`theme.css:135`) |
| `--text-2xl` | `2.441rem` | 39px | **SECTION HEADINGS (h2)** — NEW STANDARD | ALL section h2 (`theme.css:136`) |
| `--text-3xl` | `3.052rem` | 48.8px | **HERO h1** · Final CTA h2 — reserved for hero moments | HeroSection · FinalCTASection (`theme.css:137`) |
| `--text-4xl` | `3.815rem` | 61px | Extra large headings (challenge card numbers when <4 cards) | Rare display use (`theme.css:138`) |
| `--text-5xl` | `4.768rem` | 76.3px | Massive headings (future use · rarely needed) | Reserved (`theme.css:139`) |

### WHY 1.25× not 1.2× not 1.333×

- **1.2× (Minor Third)** — too subtle · adjacent steps feel like "almost same size" (h3 vs h2 = ~9% diff)
- **1.25× (Major Third)** — perceptibly distinct without aggressive jumps · maps cleanly to rem fractions
- **1.333× (Perfect Fourth)** — too aggressive for editorial layouts · creates "poster" look not "publication"

**Math** — `--text-3xl` = 1.25^4 × 16px = 39.0625px (rounded in scale as 48.8 = 1.25^5 × 16). Each token = `prev × 1.25`. Compounding doubles every ~3.1 steps.

> OG note: *"UPDATED: January 2025 - Section headings changed from --text-3xl to --text-2xl"* (`theme.css:127`) — confirms `--text-2xl` is the NEW standard for h2 (previously over-loud at 48.8px).

### Outside-scale tokens (intentional exceptions · `theme.css:141–166`)

> *"These exist for specific use cases where the mathematical scale doesn't provide the precise size needed for spatial/optical reasons."*

| Token | Value | px | WHY exists | WHEN to use |
|---|---|---|---|---|
| `--text-compact` | `0.875rem` | 14px | 16px body causes overflow in dense 4+ card grids; 14px maintains readability | ChallengesSection 4+ cards · dense card body |
| `--text-nav` | `0.875rem` | 14px | Same VALUE as compact · DIFFERENT ROLE — labels/navigation need distinct semantic token | Section eyebrows · TOC nav items · compact CTA · SectionHeading subtitle |
| `--text-card-micro` | `0.625rem` | 10px | Smallest readable text · 12px too large for card metadata in dense grids | Card metadata · category tags · NEW badges · avatar initials · FilterChip · FilterAccordion heading |

**WHY two 14px tokens with different names** — Semantic naming. `--text-compact` says "this is body text squeezed" · `--text-nav` says "this is a navigation label". If we later need to change nav-label-size independently (e.g. for accessibility), they decouple cleanly. OG verbatim: *"Same value as `--text-compact` but DIFFERENT ROLE — labels/navigation need a distinct semantic token"* (`theme.css:216`).

**Anti-pattern** — Using `--text-card-micro` (10px) for main body text — violates WCAG minimum touch text for sustained reading. Reserved for short identifiers always paired with uppercase + tracking (`theme.css:185`).

### Standardization rule (verbatim · `theme.css:171`)

> *"Every fontSize in the codebase MUST map to one of these tokens. No hardcoded pixel values allowed outside of clamp() ranges."*

### Sanctioned clamp() ranges (intentional · NOT tokenized · `theme.css:248–251`)

> *"CLAMP RANGES (intentionally not tokenized — context-specific):"*

- `clamp(19px, 2.8vw, 24px)` — ClientContextSection lead paragraph (editorial responsive)
- `clamp(1.75rem, 5vw, 2.5rem)` — ImpactSection metric values (prevents "₹110 Cr" wrapping)
- `clamp(1.375rem, 3vw, 1.875rem)` — SectionHeading h2 (responsive editorial headings)

**WHY not tokenize clamps** — They're context-specific responsive curves. Tokenizing would proliferate single-use vars. Comment them in source instead.

---

## Line heights (`tokens.ts:89–99`)

```ts
lineHeight: {
  '5xl': 1.1,   '4xl': 1.1,   '3xl': 1.2,
  '2xl': 1.3,   'xl':  1.4,   'lg':  1.5,
  'base': 1.6,  'sm':  1.6,   'xs':  1.5,
}
```

**WHY inverse to size** — Larger type needs tighter leading (1.1×) for visual density; smaller body type needs looser leading (1.6×) for readability. Standard editorial rule.

**Note** — Line heights live in `tokens.ts` only · NOT in `theme.css` as CSS vars. Consumers either hardcode (`leading-[1.6]`) or import the TS object. Decision-phase candidate to tokenize as `--leading-*` vars.

---

## Font weights (`theme.css:422–423 · tokens.ts:108–113`)

```css
--font-weight-normal: 400;
--font-weight-medium: 500;
```

```ts
fontWeight: { normal: 400, medium: 500, semibold: 600, bold: 700 }
```

**Per OG TYPOGRAPHY.md (`TYPOGRAPHY.md:117–124`):**
- 400 — body / paragraphs
- 500 — "Not used - skip" (TYPOGRAPHY.md note conflicts with theme.css declaration · flagged)
- 600 — headings · labels · navigation · buttons

**Per fonts.css DM Sans weights:** 300 (light) · 400 (normal) · 500 (medium) · 700 (bold)
**Per fonts.css Noto Serif weights:** 300 (light · used for headings) · 400 (normal) · 500 (medium emphasis)

**WHY Noto Serif 300 not 400 for headings** — Light-weight serif at large size reads as "editorial" not "academic" — see hero h1 typically `fontWeight: 300` inline.

**Modification risk** — Removing weight 300 from Google Fonts import (`fonts.css:14`) breaks every hero/section heading.

---

## Letter-spacing / tracking rules

Not tokenized as CSS vars. Applied inline per-context:

| Context | Tracking | WHY |
|---|---|---|
| Section eyebrow labels (uppercase) | `tracking-[3px]` | Editorial signal · readability at small uppercase |
| Badge xs (9px) | `0.075em` (= `--badge-xs-tracking`) | Optical balance at micro size |
| Badge sm (11px) | `0.09em` (= `--badge-sm-tracking`) | Readability at size |
| Badge md (13px) | `0.10em` (= `--badge-md-tracking`) | Standard pill tracking |
| Badge lg (15px) | `0.12em` (= `--badge-lg-tracking`) | Hero-badge tracking |
| Body text default | `normal` | DM Sans optical sizing handles spacing |

**WHY uppercase + tracking ALWAYS pair** (`theme.css:186`) — Uppercase loses ascender/descender readability cues · tracking restores letter-distinction. OG inline: *"Always pair with uppercase + tracking for readability."*

---

## Responsive typography rules

- **Mobile-first base** — 16px html root (`theme.css:4`) · all rem-based · scales automatically
- **No fluid root** — Root stays 16px across viewports (no `clamp()` on `html`). Predictable rem math.
- **Component-level fluidity** — Use clamp() sparingly for hero h1, lead paragraphs, metric values (see sanctioned list above)
- **No type-scale change at breakpoints** — Same scale tokens work mobile + desktop. Density changes via spacing tokens not type size.

---

## Anti-patterns (master list)

| Anti-pattern | Where banned | Use instead |
|---|---|---|
| Hardcoded `font-size: 18px` | `theme.css:171` | Map to nearest scale token |
| Serif for body / button / label | `theme.css:28` | `--font-sans` (default inherited) |
| Sans for hero / section title | `TYPOGRAPHY.md:30` | `--font-serif` inline |
| `--text-3xl` on regular section h2 | `TYPOGRAPHY.md:81` | `--text-2xl` |
| `--text-card-micro` for body | `TYPOGRAPHY.md:110` | `--text-xs` or `--text-sm` |
| Mixing >2 custom typefaces | `theme.css:29` | Stick to Noto Serif + DM Sans |
| Tailwind `text-3xl` (bypasses scale) | implicit | `style={{ fontSize: 'var(--text-3xl)' }}` |
| Uppercase without tracking | `theme.css:186` | Always pair `uppercase` + `tracking-[Npx]` |

---

## REUSABILITY SCORE
**5/5 ⭐⭐⭐⭐⭐** — Every text node uses these tokens. Major Third scale + 2-font pairing form the system's voice.

## LINKED concepts
- **colors.md** — text colors apply atop these size tokens (`--text-primary` · `--text-secondary` · `--label-on-*`)
- **spacing.md** — line-height + spacing-md (16px) work together; reading rhythm = font-size × line-height × paragraph-spacing
- **SectionHeading.tsx** — canonical editorial heading consumer (inline `font-serif` · `--text-2xl` · weight 300)
- **Badge size system** — its own micro-scale (9/11/13/15) tracks Major Third proportionally
- **Button size system** (`theme.css:436–438`) — sm `0.875rem` · md `1rem` · lg `1.125rem` · separate from text scale (button text doesn't follow MT ratio)
- **fonts.css** — Google Fonts import for DM Sans + Noto Serif (`display=swap` for no FOIT)
- **clamp() sanctioned list** — context-specific responsive type at hero / metrics / lead paragraphs
