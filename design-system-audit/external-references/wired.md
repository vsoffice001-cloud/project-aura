# WIRED · Editorial-Light Reference

**Source DESIGN.md:** [`/tmp/awesome-design-md/design-md/wired/DESIGN.md`](https://github.com/voltagent/awesome-design-md/blob/main/design-md/wired/DESIGN.md) · 497 lines · MIT
**Brand origin:** [wired.com](https://www.wired.com) · flagship Condé Nast technology magazine
**Audited:** 2026-05-13 · for Ken Research DS gap analysis · methodology: WWWWH per `../01_methodology.md`.

---

## WWWWH summary

### WHAT (essence)

Wired's DESIGN.md captures a **magazine-grade editorial-light surface** — a strict black-on-white canvas with no atmospheric chrome, no gradient mesh, no accent color beyond a single link blue. The brand identity is carried almost entirely by a **3-family type ladder**: a proprietary high-contrast display serif (`WiredDisplay`), a humanist serif body face (`BreveText`), and a humanist sans (`Apercu`) for metadata, navigation, and buttons. Buttons are 0-radius square rectangles. Cards have hairline borders, never drop shadows. The single moment of color is `#057dbc` (link blue) inside long-form body copy.

This is the cleanest "long-form publication ported to the web" reference in the repo. There are no marketing-page tropes — no hero-with-gradient, no SaaS feature-grid, no pricing tiers. Every section reads as a printed magazine page.

### WHY (Ken should learn from this)

- **Closest aesthetic peer to Ken's editorial-light variant.** Ken Research is a research firm; the work it publishes (reports, case studies, methodology pages) is editorial publication content, not SaaS product UX. Wired is the cleanest reference in the entire repo for this register.
- **Proves type ladder can carry brand identity without a color system.** Wired uses 2 surface colors + 1 link blue + 1 text gray. If Ken doubts whether its `b01f24` red is the *only* accent it needs, Wired confirms: yes, one accent + a strong type system is enough.
- **Zero shadow, hairline borders.** Ken's editorial-light already leans this way; Wired is the unambiguous template.
- **Numeric token discipline.** Wired's YAML front-matter (`colors`, `typography`, `rounded`, `spacing`, `components`) is the tightest in the repo — every component (`nav-bar`, `button-primary`, `story-card-large`, `data-table-cell`, `hero-band`, `footer`) is a token bundle referencing primitive tokens. Ken's DS does this too; Wired confirms the convention is industry-best-practice.
- **Two type registers (serif body + sans metadata) on one canvas.** Most industry docs (Material, Carbon, Polaris) pick one or the other. Wired splits the burden: serif for narrative, sans for structure. Ken's Noto Serif + DM Sans pairing maps 1:1.

### WHEN to use this reference ✅

- Building Ken **case-study editorial sections** (Challenges, Engagement Objectives, Methodology, Impact narrative)
- Building Ken **report-PDF reading surface** (long-form text + inline charts + sidenotes)
- Building Ken **research/insight article** layout (single-column long-form w/ pull quotes)
- Auditing whether a Ken page is "too SaaS-y" (gradient hero, soft shadows, friendly illustration) — Wired is the corrective reference
- Reviewing Ken's **byline / publication-date / category-eyebrow** treatment
- Establishing Ken's **data-table** chrome on light surfaces (Wired's `ex-data-table-cell` is exemplary)
- Establishing Ken's **photography geometry** rules for editorial photo placement

### WHEN NOT to use this reference ❌

- **Building any cinematic-dark surface** — Wired has no dark mode at all; use [`sanity.md`](./sanity.md) or [`theverge.md`](./theverge.md) instead
- **Building Ken hero bands w/ visual atmosphere** — Wired heroes are 100% type-only on white; use [`stripe.md`](./stripe.md) (gradient mesh) or [`vercel.md`](https://github.com/voltagent/awesome-design-md/blob/main/design-md/vercel/DESIGN.md) instead
- **Building pricing tables / engagement tier cards** — Wired's example pricing tier (`ex-pricing-tier-featured`) is polarity-flipped dark fill, not the comparison-table pattern Ken needs; use [`notion.md`](./notion.md) for 4-tier comparison
- **Designing illustration / icon / motion grammar** — Wired barely has illustrations and zero motion grammar; use Polaris or Material 3
- **Picking a saturated brand accent palette** — Wired runs only one blue link color; if Ken's red were not already chosen, this doc would not help pick a brand color
- **Building product UI / dashboard chrome** — Wired is publication, not product; use Linear, Vercel, Sanity for product surfaces

### WHERE evidence sits in the source file

- YAML front-matter tokens: `wired/DESIGN.md:1-90`
- Type hierarchy (8 weights × 5 sizes, ~30 token combos): `wired/DESIGN.md:14-120`
- Component bindings (`nav-bar`, `button-primary`, `button-outline`, `button-icon-circular`, `text-input`, `story-card-large`, `story-card`, `byline-row`, `hero-band`, `masthead-band`, `hairline-divider`, `footer`): `wired/DESIGN.md:120-200`
- Example variant components (`ex-pricing-tier`, `ex-app-shell-row`, `ex-data-table-cell`, `ex-modal-card`, `ex-toast`, `ex-empty-state-card`): `wired/DESIGN.md:200-260`
- "Overview" prose: `wired/DESIGN.md:262-280`
- "Do's and Don'ts": `wired/DESIGN.md:~420-460`

### HOW Ken should apply this reference

Three specific applications, in order of cost-to-value:

1. **Adopt Wired's 3-family ladder convention for Ken's editorial-light variant.** Ken already uses Noto Serif + DM Sans (2 families). Wired adds a *display-only* font separate from body-serif — a precedent for Ken to consider a different cut of Noto Serif (or a sibling display serif like Source Serif Pro Display) at hero scale, leaving the existing Noto Serif for body. Cost: low (just a font-family-display token). Value: gives Ken's hero a stronger editorial signature.
2. **Adopt Wired's `byline-row` + `category-eyebrow` token bundles wholesale.** Ken's case-study templates currently render byline + date + reading-time as ad-hoc spans; Wired captures the exact serif `byline` typography (`12.73px BreveText 700 / 28px line-height / 0.108px tracking`) as a reusable token. Cost: 1 atom file. Value: every Ken case study + research article gets a consistent byline.
3. **Adopt Wired's `ex-data-table-cell` chrome for Ken report listings.** Wired specifies: `headerBackground: canvas-soft`, `headerTypography: caption (mono-uppercase)`, `bodyTypography: body-sm`, `cellPadding: md lg`, `rowBorder: hairline`. This is a complete data-table specification in 5 tokens. Map Ken's listing table to this exact pattern. Cost: low (existing tokens already cover this). Value: removes Ken's current report-listing ad-hoc styling.

---

## Token system deep-dive

Wired's `colors` block (`wired/DESIGN.md:8-19`) is **9 tokens total** — the leanest in the repo.

```yaml
colors:
  primary:   "#000000"   # used as ink + button fill
  on-primary: "#ffffff"
  ink:       "#000000"   # alias of primary
  ink-soft:  "#1a1a1a"   # secondary headings
  body:      "#757575"   # body metadata
  hairline:  "#e0e0e0"   # all borders
  canvas:    "#ffffff"   # page bg
  canvas-soft: "#f5f5f5" # alt surface
  link:      "#057dbc"   # only chromatic moment
```

That's it. No `error`, no `success`, no `warning` color tokens at all — Wired's surface doesn't surface those states (you don't get a "form validation error" while reading an article). Compare to Material 3's 40+ color roles: Wired is 9.

**Lesson for Ken:** Ken's `tokens/build/tokens.css` currently mixes brand tokens, surface tokens, and component tokens at one level. Wired demonstrates that on an editorial surface, a 9-color palette is sufficient — the bloat in Ken's current tokens may be removable by separating surface palette (Wired-sized: ~10) from semantic state palette (form/error/success: separate file, only loaded by forms).

**Typography** (`wired/DESIGN.md:14-120`): Three families × 8 size tokens × inline weight × inline line-height × inline letter-spacing = 24 typography token bundles. The bundle pattern (every type role names its full setting in one block) is the convention DTCG recommends. Ken already does this.

**Rounded** (`wired/DESIGN.md:91-93`): Two values only — `none: 0px` and `full: 9999px`. Wired uses `none` everywhere except `button-icon-circular`. This is the most extreme radius minimalism in the repo. Ken would not adopt the universal 0 but the **structural lesson** is: pick 2–3 radius tokens, never more. Ken's current `--radius-{sm|md|lg|button|card|pill}` is closer to 6 — possibly trimmable.

**Spacing** (`wired/DESIGN.md:94-104`): 9-step scale `xxs(2) xs(4) sm(8) md(12) lg(16) xl(20) 2xl(24) 3xl(32) 4xl(48)`. This is a **Major Second** (1.5×) scale, not Major Third. Ken uses Major Third 1.25× per `Quick_start_guide.md` — Ken's scale is tighter. Wired's is slightly more generous. Neither is wrong; the lesson is that the spacing scale must be **named** and **referenced**, never inline.

---

## Component documentation method

Wired's components block is structured as **token bundles** — not anatomy diagrams, not API docs, not state matrices. Every component is a flat YAML block referencing primitive tokens:

```yaml
button-primary:
  backgroundColor: "{colors.primary}"
  textColor: "{colors.on-primary}"
  typography: "{typography.button-md}"
  rounded: "{rounded.none}"
  padding: "{spacing.md} {spacing.xl}"
```

This is a deliberately **lossy** format. It captures appearance but not:
- API (props, variants)
- States (hover, focus, disabled, loading)
- A11y (touch targets, ARIA roles, keyboard interaction)
- Motion (transition durations, easing)

The trade-off is that an LLM agent can read this block + the prose context and produce a passable component implementation. It cannot produce a *production-grade* one. **Wired's DESIGN.md is an intent-capture format, not a production spec.**

**Lesson for Ken:** Ken's WWWWH methodology captures appearance + API + states + a11y + motion + anti-patterns in long-form markdown. Wired captures only appearance, but in a YAML format that's machine-parseable. Ken should consider **adding a YAML front-matter block to every WWWWH atom doc** that captures the appearance-tokens in Wired-style YAML — gives the file two readers (humans read the markdown, agents read the YAML).

---

## Key patterns Ken should adopt

### 1. Zero-decoration editorial surface (Adopt for case-study + research-article)

Wired runs zero atmospheric chrome — no gradient, no shadow, no illustration, no decorative shapes. The page is type + photography + hairlines.

Ken's case-study editorial-light variant already aligns w/ this direction but has occasional drift (decorative gradient on hero, shadow on stat-card). Wired's reference says: **strip those.** Trust the type ladder.

### 2. 3-family type ladder (display-serif + body-serif + sans-metadata)

Wired's 3 families:
- `WiredDisplay` (proprietary high-contrast serif) — hero + section headlines, 32–64px
- `BreveText` (humanist serif) — long-form body, bylines, captions, 16–19px
- `Apercu` (humanist sans) — metadata, buttons, eyebrows, navigation, 12–17px

Ken currently runs 2 families (Noto Serif + DM Sans). Wired suggests Ken consider:
- Noto Serif **Display** (heavier optical-display cut) for hero + chapter headlines
- Noto Serif (regular text cut) for body + bylines + pull-quotes
- DM Sans for metadata + buttons + nav + eyebrows

This is one font addition to capture an entire register Ken doesn't currently have. Trial in `aura-craft` next page-build session.

### 3. `byline-row` as a first-class atom

Wired's `byline-row` (`DESIGN.md:170-172`):
```yaml
byline-row:
  backgroundColor: "{colors.canvas}"
  textColor: "{colors.body}"
  typography: "{typography.byline}"
```

…where `byline` typography is `12.73px BreveText 700 / 28px line-height / 0.108px tracking`. Author + date + read-time in a single hairline-bordered row. Ken's case-studies need this — adopt as `Byline` atom in DS core-v2.

### 4. `category-eyebrow` (mono-uppercase brand tag)

Wired's eyebrow: `body-sm-strong` Apercu sans, 14px, 700, 0.4px tracking, used as topic/category tag above headlines.

Ken's case-studies currently don't have a consistent eyebrow; they use ad-hoc `<span>` tags. Adopt as `Eyebrow` atom (or merge into existing `Badge` atom w/ `variant="eyebrow"`).

### 5. `ex-data-table-cell` for report listings

Wired's data-table spec is 5 tokens (`DESIGN.md:218-224`). Ken's report listing needs this exact treatment. Already supported by Ken's existing tokens — the gap is consistency, not capability.

---

## Patterns to REJECT

### 1. Reject 0-radius universal (zero-radius everywhere)

Wired's `rounded.none` universal works because the brand is a 130-year-old print publication with associated typographic gravity. Ken Research is a modern research firm whose visual identity already runs pill-radius primary CTAs + 12px card radius. Switching to 0-radius would read as "trying too hard to be a magazine" — inauthentic.

### 2. Reject single chromatic accent for body (link blue only)

Wired uses `#057dbc` for inline body links and *nothing else*. Ken's `#b01f24` brand red is used for CTAs *and* heading underlines *and* chart highlights — a different discipline. Don't shrink Ken's red to body-link-only.

### 3. Reject zero-shadow universal

Wired uses zero shadow, hairlines only. Ken's editorial-light surface uses `shadow-quiet` (a near-imperceptible shadow under cards). Keep Ken's quiet shadow — it adds depth without breaking the editorial register. Wired's flatness is correct for a magazine; Ken's mild elevation is correct for cards-in-a-listing.

### 4. Reject `BreveText`-style proprietary serif as body face

Wired uses a foundry-licensed proprietary serif (`BreveText`). Ken uses Noto Serif (open-source, free). Don't switch — Noto Serif's licensing is one of Ken's cost advantages, and the type quality is comparable.

### 5. Reject 8-weight × 5-size type combinatorial scale

Wired ships 24 typography tokens. That's already a lot for an editorial site. Ken currently has a similar count (~20). Don't grow this further — at 30+ tokens, designer decision fatigue sets in. Keep Ken's type system bounded at ~20.

---

## Specific tokens · components · doc-method that map to Ken's existing structure

| Wired pattern | Ken's existing equivalent | Action |
|---|---|---|
| `colors.primary` (`#000000`) | `--color-foundation-black` | Already aligned — Ken uses near-black `#0a0a0c` for cinematic, pure black `#000000` for editorial primary text |
| `colors.canvas` (`#ffffff`) | `--color-bg-editorial` (`#f5f2f1` warm off-white) | Ken's canvas is warm cream, Wired's is pure white — DIVERGE intentionally |
| `colors.body` (`#757575`) | `--color-text-secondary` | Probably already exists — confirm during atom audit |
| `colors.hairline` (`#e0e0e0`) | `--color-border-hairline` | Should exist — confirm |
| `colors.link` (`#057dbc`) | n/a — Ken uses brand red for links | Diverge; Ken's red is brand-locked for links |
| `WiredDisplay` (proprietary display serif) | Noto Serif (single cut) | Consider Noto Serif Display addition |
| `BreveText` (humanist body serif) | Noto Serif | Aligned in spirit |
| `Apercu` (humanist sans) | DM Sans | Aligned in spirit |
| `typography.byline` | n/a — currently ad-hoc | Adopt `Byline` atom |
| `typography.caption` (12px mono-ish) | `--font-size-caption` | Confirm during atom audit |
| `button-primary` (0-radius, black fill) | `Button variant="primary"` (pill, black fill) | Diverge on radius, align on fill |
| `button-icon-circular` (full radius, hairline border) | `IconButton` | Should already exist |
| `story-card-large` / `story-card` | `Card` atom + variants | Map "story-card" pattern as Ken's `ArticleCard` molecule |
| `byline-row` | n/a — needed | NEW atom |
| `category-eyebrow` | `Badge` w/ `variant="eyebrow"` | Probably already exists; verify |
| `hero-band` | `HeroSection` organism | Aligned in shape, diverge in chrome |
| `masthead-band` | `Navbar` organism | Aligned |
| `hairline-divider` | `<hr>` or `Divider` atom | Should exist |
| `footer` (dark fill + light text) | `Footer` organism | Aligned in spirit (Ken footer is dark on both variants) |
| `ex-data-table-cell` | n/a — Ken uses ad-hoc | Adopt as `DataTable` molecule spec |
| `ex-modal-card` | `Modal` organism | Probably exists |
| `ex-toast` | `Toast` molecule | Probably exists |
| `ex-empty-state-card` | n/a — needed | Adopt as `EmptyState` molecule |

---

## Compare to existing `industry-research/*.md`

| Existing audit doc | Overlap with Wired | Unique to Wired |
|---|---|---|
| `material-design.md` | Both cover token-bundle component bindings | Wired adds: editorial typographic ladder, photography geometry, no-shadow editorial discipline (Material can't model this) |
| `polaris.md` | Both cover editorial-leaning surfaces | Wired adds: magazine-grade serif body, byline atom, mono-eyebrow pattern |
| `shadcn-ui.md` | Both are sparse on motion and a11y | Wired adds: a real brand voice (shadcn is intentionally generic), Stitch DESIGN.md format itself |
| `radix-ui.md` | Wired has no component API equivalent | Wired adds: appearance rules; Radix gives API |
| `tailwind-ui.md` | Both target Tailwind-style markup | Wired adds: token-bundle YAML format; Tailwind UI ships compositions, not tokens |
| `carbon.md` · `lightning.md` · `spectrum.md` · `atlassian.md` · `primer.md` | Enterprise systems w/ no editorial register | Wired is the **only** editorial-publication reference in the audit |

**Net new from Wired:** the *editorial-publication register* itself. None of the existing 9 industry-research docs has it. This is the single biggest gap Wired fills.

---

## Sources

- [Wired's DESIGN.md (full)](https://github.com/voltagent/awesome-design-md/blob/main/design-md/wired/DESIGN.md) · 497 lines · MIT
- [wired.com](https://www.wired.com) · live brand surface for verification
- [Klim Type Foundry · `WiredDisplay`](https://klim.co.nz) · proprietary display serif
- [Google Fonts · Noto Serif](https://fonts.google.com/noto/specimen/Noto+Serif) · Ken's editorial body face
- [DTCG token format](https://design-tokens.github.io/community-group/format/) · token-bundle convention
- Local clone: `/tmp/awesome-design-md/design-md/wired/DESIGN.md`
- Ken methodology: `../01_methodology.md`
