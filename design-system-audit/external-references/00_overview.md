# External Reference · VoltAgent `awesome-design-md` Collection

**Source:** [VoltAgent/awesome-design-md](https://github.com/voltagent/awesome-design-md) · MIT · 73 DESIGN.md files (May 2026 snapshot).
**Audited:** 2026-05-13 · for Ken Research DS gap analysis · methodology: WWWWH per `../01_methodology.md`.
**Locally cloned:** `/tmp/awesome-design-md/design-md/<slug>/DESIGN.md` (cite by file:line below).

---

## WHAT this repo is

A curated MIT-licensed collection of **DESIGN.md** files — a plain-text design system document format proposed by [Google Stitch](https://stitch.withgoogle.com/docs/design-md/overview/). The premise: instead of Figma exports, JSON schemas, or runtime SDKs, drop a single markdown file at project root and any AI coding agent (Claude Code, Cursor, Stitch, Lovable) reads it to generate UI consistent with a brand. Each file is reverse-engineered from a real public website — Wired, Stripe, Notion, Sanity, The Verge, etc. — by extracting publicly-visible CSS values and packaging them as a structured 9-section markdown document.

Every file follows the same shape:

1. YAML front-matter w/ tokens (`colors`, `typography`, `rounded`, `spacing`, `components`)
2. Visual Theme & Atmosphere prose
3. Color Palette & Roles (semantic naming + hex + functional role)
4. Typography Rules (font families, hierarchy table, principles, font-substitute notes)
5. Component Stylings (buttons, cards, inputs, navigation w/ states)
6. Layout Principles (spacing, grid, whitespace philosophy)
7. Depth & Elevation
8. Shapes (radius scale, photography geometry)
9. Do's and Don'ts
10. Responsive Behavior
11. Agent Prompt Guide

Each site also ships `preview.html` + `preview-dark.html` visual catalogs (color swatches, type scale, button/card mockups) so a human can audit before handing the doc to an agent.

The repo is **not** a design system itself — it is a *capture format* and a *gallery of captures*. The implicit thesis: markdown is the lossiest-but-most-useful representation an LLM can ingest end-to-end without parsing, and a 500–800-line file is the right granularity for "tell my agent how this brand looks."

---

## WHY useful for Ken Research

Ken's 9.5/10 cinematic-finish bar lives or dies on **brand-level decisions** that don't fit cleanly in any of the 10 industry-research docs already audited (Material · Carbon · Lightning · Polaris · Atlassian · Primer · Spectrum · shadcn · Radix · Tailwind UI). Those docs are *systems-vendor* references — they document how to build a system, not how a finished brand expresses identity through tokens.

This collection fills four specific gaps:

1. **Editorial brand voice for data-heavy reading** — Wired, The Verge, Notion, WIRED, Mintlify all solve the same problem Ken solves: long-form text-and-data on the web that must read as authoritative editorial, not as a SaaS product page. None of the industry-research docs cover this register.
2. **Dual-surface palettes done right** — Stripe, Mastercard, Apple, Sanity, Vercel, Notion all run a hybrid editorial-light + dark-product or cinematic-dark + editorial-light architecture. Ken's two-variant model (cinematic dark + editorial light, same brand) matches this directly. Carbon/Material/Polaris are single-surface-mode systems.
3. **The DESIGN.md format itself** — Ken's `aura-craft` skill, `aura-builder` agent, and `feedback_craft_skills.md` memory all converge on agent-readable design intent. Adopting DESIGN.md as a per-project handover artifact (next to `STATUS.md` + `HANDOVER.md`) would give the design→tech handover a single file an LLM can ground from. Currently Ken has none.
4. **Concrete brand-level decisions to study, not adopt wholesale** — every doc shows *why* one specific brand made one specific choice ("Sohne weight 300 with -1.4px tracking on hero" · "Stitch yellow-bold for high-emphasis feature banner only" · "StoryStream timeline w/ mono-uppercase timestamps"). Studying 5 of these against Ken's `b01f24` brand-red + DM Sans + Noto Serif + Major Third 1.25 stack will harden Ken's own decision log.

---

## WHEN to use this collection ✅ / WHEN NOT ❌

### Use this collection ✅

- Building a NEW Ken page and stuck on **brand voice** ("what does this page *feel* like") — read the relevant DESIGN.md before opening a Tailwind file
- Auditing a finished Ken page against editorial-light competitors (Wired, Notion, Stripe, Mintlify) for typographic density
- Auditing a finished Ken page against cinematic-dark competitors (Sanity, The Verge, Stripe-dashboard, Vercel) for surface depth
- Building an `aura-craft` doc for a new component — borrow the 9-section Stitch format
- Building a new DESIGN.md for a Ken handover folder (`projects/casestudy-templates/<name>/DESIGN.md`)
- Resolving a debate about token naming — these files show 73 real-world conventions

### Do NOT use this collection ❌

- For component **API design** (props, states, anatomy) — use Material, Carbon, Polaris, Spectrum instead. DESIGN.md captures appearance, not API.
- For **accessibility / WCAG / a11y patterns** — these files have minimal a11y content (touch-targets at best). Use Carbon, Material, Atlassian, Polaris.
- For **motion grammar / spring physics / scroll-driven choreography** — these files cover hover states + maybe transition durations. Use Material 3 Expressive, Polaris motion, Framer Motion docs.
- For **token architecture / 3-tier scaffolding** — these files are flat token lists (one layer). Use Material's ref/sys/comp split, Lightning Web Design System, or DTCG spec.
- For **governance / contribution / RFC process** — these files are extractions, not living systems. Use Polaris, Carbon, Atlassian.
- For **content/voice/microcopy guidelines** — minimal coverage here. Use Atlassian, Polaris, Lightning, Mailchimp content style guide.
- For **mobile-only or ecommerce-only references** — most files are landing-page captures; mobile patterns are noted briefly under "Responsive Behavior" only.

The **rule of thumb**: this collection answers "what does a finished page look like" — it does not answer "how do I build the system that produces it."

---

## TOP 15 selected DESIGN.md files for Ken

Ranked by relevance to Ken's actual surface mix (editorial-light case-studies · cinematic-dark report viewer · data-dense report listings · 168-component DS · Next 15 + RSC + Tailwind v4):

| # | Brand | Slug | 1-sentence WHY relevant to Ken | Variant family |
|---|---|---|---|---|
| 1 | **WIRED** | `wired` | Magazine-grade editorial-light with 3-family type ladder (display serif + body serif + sans) — direct template for Ken case-study + report-PDF reading surfaces. | Editorial-light |
| 2 | **The Verge** | `theverge` | StoryStream timeline component + saturated story tiles + mono-uppercase eyebrows — directly maps to Ken case-study chapter sequencing. | Cinematic-dark |
| 3 | **Sanity** | `sanity` | Single-CTA dark-first marketing surface (`#0b0b0b` canvas + single coral CTA) — direct mirror for Ken cinematic-dark + `#b01f24` single-CTA rule. | Cinematic-dark |
| 4 | **Notion** | `notion` | Warm minimalism + Inter-based humanist + pastel feature-card tints + 4-tier pricing table — maps to Ken editorial-light listings + 168-component scale. | Editorial-light |
| 5 | **Stripe** | `stripe` | Dual-surface (white marketing + navy dashboard) w/ tabular-figure (`tnum`) for numerics — direct match for Ken report listings + report-store financial data. | Hybrid light/dark |
| 6 | **Linear** | `linear.app` | Ultra-precise neutral palette + tight letter-spacing + minimal chrome — model for Ken navbar + admin-surface restraint. | Editorial-light |
| 7 | **Vercel** | `vercel` | Geist + Black-white precision + gradient hero atmosphere — model for Ken hero-band on dark variant. | Cinematic-dark |
| 8 | **Apple** | `apple` | Premium white space + SF Pro Display + cinematic photography geometry — model for Ken editorial-light hero proportions. | Editorial-light |
| 9 | **Mintlify** | `mintlify` | Documentation platform · reading-optimized w/ green accent · tabs + code-blocks — model for Ken methodology section + report-doc layout. | Editorial-light |
| 10 | **Claude (Anthropic)** | `claude` | Warm terracotta + clean editorial layout — closest peer to Ken's warm brand-red palette + serif-display + editorial canvas. | Editorial-light |
| 11 | **Cohere** | `cohere` | Vibrant gradient + data-rich dashboard aesthetic — model for Ken report-viewer chart-heavy panels. | Hybrid |
| 12 | **MongoDB** | `mongodb` | Documentation-focused green-leaf branding + developer doc patterns — comparator for Ken data-product doc layout. | Editorial-light |
| 13 | **PostHog** | `posthog` | Data-dense developer-friendly dark UI w/ playful brand voice — comparator for Ken cinematic dashboard charts. | Cinematic-dark |
| 14 | **Mastercard** | `mastercard` | Warm cream canvas + orbital pill shapes + editorial warmth — closest reference for Ken cream-tinted editorial-light variants. | Editorial-light |
| 15 | **Runway** | `runwayml` | Film-festival cinematic dark heroes + paper-white reading bands + pure-black pill CTAs — direct mirror for Ken cinematic-dark + editorial-light alternation. | Hybrid dark/light |

---

## Decision tree · "If you're building X, read Y from this collection first"

| If you're building... | Read first | Why |
|---|---|---|
| Ken **case-study page** (editorial-light, narrative-led) | **Wired** → **Notion** → **Apple** | Magazine-grade serif ladder, then warm minimalism for sections, then white-space proportions for hero |
| Ken **report-viewer page** (cinematic-dark, data-dense) | **Sanity** → **The Verge** → **PostHog** | Near-black canvas + single CTA, then chapter timeline, then data-dense dark dashboard chrome |
| Ken **report-store listing** (light, dense cards + filters) | **Stripe** → **Linear** → **Mintlify** | Tabular figures + pill CTAs, then ultra-precise neutral chrome, then doc-grade card density |
| Ken **case-study hero band** (cinematic dark above-the-fold) | **Vercel** → **Runway** → **The Verge** | Gradient atmosphere + Geist, then film-festival photo geometry, then saturated-block hero |
| Ken **methodology section** (long-form numbered steps + diagrams) | **Mintlify** → **Wired** → **Stripe** | Doc-grade reading optimization, then magazine narrative flow, then numbered-step pill anchors |
| Ken **navbar / top-bar** (cross-page consistency) | **Linear** → **Apple** → **Sanity** | Precision neutral chrome, then sticky scroll behavior, then dark-mode equivalent |
| Ken **pricing / engagement-tier comparison table** | **Notion** → **Stripe** | 4-tier featured-column treatment, then tabular-figure money rows |
| Ken **DESIGN.md handover artifact** (per-project) | **Wired** (cleanest 9-section editorial) **+ Stripe** (cleanest dual-surface) | Use as template for `projects/<name>/DESIGN.md` |
| Ken **chart / data-viz panel** | **PostHog** → **Cohere** → **Stripe-dashboard** | Dark dashboard density, then gradient analytics aesthetic, then financial tabular rigor |
| Ken **single-brand-red CTA discipline audit** | **Sanity** (`#f36458` coral) → **Claude** (terracotta) | Both run a single warm-red CTA on dark/editorial — proves Ken's `#b01f24` discipline is industry-grade |

---

## TOP 5 deep-dives written

Per Ken's relevance ranking, these 5 received full WWWWH deep-dives in this folder:

1. [`wired.md`](./wired.md) — magazine-grade editorial-light
2. [`theverge.md`](./theverge.md) — chapter-timeline cinematic-dark
3. [`sanity.md`](./sanity.md) — single-CTA dark-first marketing
4. [`notion.md`](./notion.md) — warm editorial w/ illustration + pastel tints
5. [`stripe.md`](./stripe.md) — dual-surface light/dark + tabular numerics

The remaining 10 (Linear · Vercel · Apple · Mintlify · Claude · Cohere · MongoDB · PostHog · Mastercard · Runway) are not deep-dived here — read their source DESIGN.md directly at `/tmp/awesome-design-md/design-md/<slug>/DESIGN.md` when needed for a specific build.

---

## Cross-reference w/ existing `industry-research/` audit (10 docs)

### What is NEW vs the existing 9 industry-research docs

The existing 9 industry docs (Material · Carbon · Lightning · Polaris · Atlassian · Primer · Spectrum · shadcn-ui · Radix · Tailwind UI) all cover **systems-vendor reference DSs** — they document *how* a DS is constructed (token tiers, governance, component anatomy, a11y standards). This collection covers **brand-finished surface captures** — they document *what* a single brand looks like end-to-end. The two are complementary, not overlapping.

NEW dimensions this collection adds:

| New dimension | Why missing from industry-research | Best file(s) in this collection |
|---|---|---|
| Editorial-grade typography ladder (display-serif + body-serif + UI-sans) | Material/Carbon/Polaris use sans-only families | Wired, Notion, Apple, Mastercard |
| Single-CTA discipline at brand level | Industry docs cover button *variants*, not "one filled CTA per band" rule | Sanity, Stripe, The Verge, Runway |
| Saturated color-block story tiles (not cards) | Industry docs assume card chrome; this collection shows full-bleed accent blocks | The Verge (mint + ultraviolet tiles), Notion (yellow-bold feature banner) |
| Cream/warm canvas (not pure white, not gray) | Industry docs assume `#FFFFFF` or neutral-50 | Mastercard (cream), Stripe (canvas-cream `#f5e9d4`), Notion (cream tint) |
| Gradient mesh as atmospheric backdrop | Industry docs treat gradients as decoration tokens; this shows them as *layout primitives* | Stripe (mesh hero), Cohere, Vercel |
| Tabular-figure numerics (`tnum` OpenType feature) | Industry docs mention but don't show *where* | Stripe (money cells), Linear (numerical IDs), Notion (pricing) |
| Mono-uppercase eyebrows + timestamps | Industry docs mention "eyebrow" pattern; this shows mono-specific implementation | The Verge (StoryStream), Wired (byline-row), Vercel |
| Single brand "hero" font at extreme weight (300 thin or 900 black) | Industry docs use brand fonts at 400/500/600 | Stripe (Sohne 300 + -1.4px tracking), Sanity (waldenburg + -4.48px), The Verge (Manuka 900 at 107px) |
| Zero-radius / square buttons (editorial choice) | Industry docs default 4–8px radius | Wired (0px universal), Renault, BMW |
| Pill-radius (9999px) buttons (signature shape) | Industry docs cover pill as one option | Stripe, Sanity, Claude, Notion (primary), Runway |
| StoryStream / timeline organism w/ dashed vertical rule | Not in any industry doc | The Verge (only) |
| Pastel feature-card palette echoing live-product database properties | Not in any industry doc | Notion (only — peach/rose/mint/lavender/sky/yellow/cream/gray) |
| Photography geometry rules (radius + aspect + treatment) | Industry docs cover image components; this covers brand *photography style* | Wired, Apple, Runway, Linear (illustration geometry) |

### Contradictions across files · what does Ken pick?

This collection contains conflicts between brands. Below are the conflicts most relevant to Ken's existing tokens and rules:

| Conflict | Brand A (says X) | Brand B (says Y) | Ken's verdict |
|---|---|---|---|
| **Button radius** | Wired (0 universal), Renault (0), BMW (0) | Stripe, Sanity, Notion (pill 9999) | Ken: pill primary, square ghost on cinematic-dark hero → resolve per-recipe |
| **Hero canvas** | Wired (pure white), Apple (white) | The Verge (`#131313`), Sanity (`#0b0b0b`), Runway (cinematic dark) | Ken: BOTH — variant flag per page (already in DS) |
| **Display weight** | Stripe (300 thin + tight tracking), Sanity (regular w/ -4.48px), Apple (light) | The Verge (900 Manuka at 107px), Wired (400 high-contrast serif) | Ken: 400 Noto Serif (already chosen) — closer to Wired register |
| **Brand-accent count** | Wired (1 link blue), Sanity (1 CTA coral + 1 hover blue), Stripe (1 indigo) | The Verge (mint + ultraviolet + cyan), Notion (purple + 8 pastel tints) | Ken: 1 brand-red CTA only — adopt Wired/Sanity/Stripe discipline |
| **Body type family** | Wired (BreveText serif body), Mastercard (warm serif body) | Linear, Vercel, Sanity (sans body) | Ken: DM Sans body (already chosen) — sans body matches industry majority |
| **Hover treatment** | Sanity ("everything shifts to electric blue on hover" — universal signal) | Most others (per-component hover) | Ken: shimmer-on-hover for brand CTA only — keep current discipline |
| **Card shadow** | Wired (zero shadow, hairline borders only), The Verge (zero shadow, 1px borders) | Notion (deep diffuse drop shadow under hero mockup), Apple (gentle elevation) | Ken: shadow-quiet on editorial-light, none on cinematic-dark (already in DS) — aligns w/ The Verge for cinematic |

### Patterns Ken should ADOPT (not in existing 9 industry docs)

After deep-dives on 5 + skim of remaining 10, six concrete patterns Ken should adopt that are absent from `industry-research/*`:

1. **Adopt DESIGN.md as a handover artifact format.** Every `projects/*` ready-for-tech folder gets a `DESIGN.md` next to `STATUS.md` + `HANDOVER.md`. Template = Wired's 9-section structure. Lets `aura-builder` / Cursor / Lovable / any future agent ground a build from a single readable file. (Adds to existing `HANDOVER_TRACKER.md` 13-point gate.)
2. **Adopt a sibling-disambiguation prose block per atom** ("Use Button when X, use CTALink when Y, use TextLink when Z") — modeled on Material's Guidelines section. The Verge's StoryStream doc and Notion's Pricing-Tabs doc both do this inline. Ken's WWWWH methodology already has WHEN ❌ → make it mandatory.
3. **Adopt a "Photography Geometry" token domain.** Apple, Wired, Runway all define photography rules at the token layer (aspect ratios · radius · treatment · overlay). Ken's current tokens omit this entirely; add to `design-system/tokens/build/photography.css`.
4. **Adopt tabular-figure numerics rule at the DS layer.** `font-feature-settings: "tnum"` everywhere numerics appear (report prices, stat cards, dashboard cells, comparison tables). Stripe and Linear show this is signature-grade. Add to atom-level Stat + Pricing + DataCell.
5. **Adopt a single named "atmospheric backdrop" element per variant.** Stripe's gradient mesh, The Verge's StoryStream rule, Runway's film-grain overlay — each brand names *one* atmospheric primitive that signals "this is our brand." Ken's cinematic-dark has none currently; consider a `--atmosphere-cinematic` token (subtle red→black radial gradient) for hero bands only.
6. **Adopt "Iteration Guide" + "Known Gaps" sections at end of every component doc.** Notion, Stripe, Mintlify all close their DESIGN.md w/ a "what would you iterate" + "what is missing" section. Ken's WWWWH methodology has no equivalent — adding it forces capture of the doc's blind spots.

### Patterns to REJECT (overkill or wrong-fit)

1. **Reject extreme display weights at extreme tracking** (Sanity's -4.48px on 112px hero, Stripe's -1.4px on 56px hero). Ken's `b01f24` brand + warm-cream editorial canvas does not want machined precision; Noto Serif at 400 with normal tracking already matches Ken's editorial-warm register.
2. **Reject multi-color brand spectrum** (Notion's 8-color brand-pink/orange/purple/teal/green/yellow/brown). Ken's discipline is single brand-red + neutrals; multi-color spectrum breaks the 5% rule.
3. **Reject saturated color-block story tiles** (The Verge's mint/ultraviolet/yellow full-bleed tiles). Ken is editorial-authority, not tech-tabloid; saturated blocks would dilute the research-firm voice.
4. **Reject zero-radius universal** (Wired, Renault). Ken's `--radius-button` and `--radius-card` are mid-radius (pill for primary, 12px for cards) — both proven on the existing case-study templates.
5. **Reject "everything-shifts-blue-on-hover" universal hover** (Sanity). Ken's signature is shimmer on brand CTA + bg-shift on cards — keep targeted not universal.

---

## Sources

- Repo: [github.com/voltagent/awesome-design-md](https://github.com/voltagent/awesome-design-md) · MIT
- Per-file capture format: [Stitch DESIGN.md format spec](https://stitch.withgoogle.com/docs/design-md/format/)
- Live preview gallery: [getdesign.md](https://getdesign.md)
- Local clone (this audit): `/tmp/awesome-design-md/design-md/<slug>/DESIGN.md`
- Existing Ken industry-research audit: `../industry-research/` (10 files · Material · Carbon · Lightning · Polaris · Atlassian · Primer · Spectrum · shadcn-ui · Radix · Tailwind UI)
- Ken methodology: `../01_methodology.md` (WWWWH framework)
