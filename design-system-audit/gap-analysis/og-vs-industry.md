# Gap Analysis · OG `Design_system_vs_26` vs Industry-Leading Design Systems

**Date:** 2026-05-14
**Industry corpus:** 10 leading DSs audited under `industry-research/` — Material 3 (Google) · Carbon (IBM) · Polaris (Shopify) · Lightning (Salesforce SLDS) · Atlassian (ADS) · Primer (GitHub) · Spectrum (Adobe) · shadcn/ui · Radix UI · Tailwind UI.
**Method:** WWWWH-driven cross-reference per `01_methodology.md`.

---

## TL;DR

OG is a **5/5 design intent system** with a **3.5/5 deliverable artifact** (per OG audit overview L195). Compared to the 10 industry references, OG is **best-in-class for editorial-cinematic intent**, **mid-tier for tooling**, and **bottom-quartile for governance scaffolding**.

**Where OG OUTPERFORMS industry:**
1. Documentation density per token (inline `theme.css` rationale paragraphs · Baymard cites · MT explanation)
2. 92-5-3 hierarchy as constitutional rule (no industry DS articulates this so explicitly)
3. AI-first authoring (`ai-context/*.md` + `QUICK_START_PROMPT.md` are years ahead of most DS docs)
4. Editorial typography vocabulary (Noto Serif + DM Sans pairing + MT scale is more refined than Material's 15-style scale or Carbon's productive/expressive split)
5. Dashboard-as-playground (self-rendering single source-of-truth · no Storybook drift)

**Where OG UNDERPERFORMS industry (10+ gaps):**
1. **No 3-tier token architecture (ref → sys → comp).** Material 3, Spectrum, Atlassian, Polaris all enforce this; OG is essentially single-tier.
2. **No paired role tokens (`on-primary`, `on-surface`, `on-warm`).** Material 3 + Spectrum + Atlassian use these to guarantee bg/fg contrast at the token level. OG relies on consumer judgment.
3. **No component lifecycle status badges (alpha/beta/stable/deprecated).** Atlassian + Primer ship per-component lifecycle. OG has no signal of risk.
4. **No anatomy diagrams w/ token names per part.** Spectrum + Material 3 label every visual region against tokens. OG has prose-only component docs.
5. **No decision-tree pickers for ambiguous cases.** Spectrum publishes "Toast vs Dialog?" 3-question decision trees. OG has "WHEN-NOT use X instead" pointers but no decision-tree UI.
6. **No WCAG-criteria-cited-per-component pattern.** SLDS cites "addresses 2.5.5 Target Size" inline. OG has a a11y section per component but doesn't cite WCAG SC numbers.
7. **No density vocabulary (compact/regular/spacious).** Carbon + Spectrum + Polaris differentiate density tiers per component. OG has one density.
8. **No surface-layer model for elevation in dark mode.** Material 3 uses `surface-container-low` through `-highest` so dark mode doesn't rely on shadows (shadows don't read on dark). OG has no surface-tier system.
9. **No RFC process for major DS changes.** Atlassian + Carbon enforce RFC for new atoms / breaking renames / variant additions. OG has no governance.
10. **No automated tests (axe, Lighthouse, Playwright in CI).** SLDS + Spectrum + Carbon all run a11y CI. OG has zero tests.
11. **Voice documentation completely absent.** Polaris embeds content rules INSIDE component docs (button labels, empty state, error messages). OG voice is inferred from strings.
12. **Mobile-behavior section missing per component.** Polaris ships explicit mobile behavior section. OG implicit only.
13. **No per-component CHANGELOG.** Atlassian + Polaris ship `<atom>/CHANGELOG.md`. OG has one workspace CHANGELOG only.
14. **No big-number / KPI primitive.** Spectrum's Big Number atom standardizes value + label + delta + sparkline. OG re-implements per organism (StatCard, DataHighlightCard) without a shared atom.
15. **No data-table primitive.** OG has zero table tooling; report-store needs it. SLDS + Carbon Data Tables are gold standard.
16. **Single icon library + role classification needs sharpening.** OG's `iconColors.ts` (`content: #806ce0`, `utility: #737373`) is a great START but Material/Spectrum/Polaris classify by intent (decorative/functional/conversion/state) with more granularity.

OG also **over-does** vs industry norm in 4 areas (covered in §3).

---

## Section 1 · What OG already does well (industry-validated)

### 1.1 · 92-5-3 color hierarchy as a constitutional rule (UNIQUE strength)

OG `COLORS.md:11-19` verbatim: *"The single most important color rule: 92% foundation, 5% brand, 3% accent."*

**Industry comparison:**
- **Material 3** has color roles (primary/secondary/tertiary) but no quota rule — designers must self-discipline.
- **Carbon** has brand layer but no 92-5-3 articulation.
- **Polaris** has Pro Design Language (density-vs-clarity) but no color quota.
- **Atlassian** has accent layers per product but no global quota rule.
- **Primer** has functional naming (`bgColor.inset`, `borderColor.default`) but no quota.

**Verdict:** OG's 92-5-3 is **best-in-class for marketing-cinematic surfaces**. Industry equivalents (Polaris Pro Design Language, Material productive/expressive split) come close but don't quantify percentages. **Keep verbatim.**

### 1.2 · Major Third 1.25× typography scale (refined by industry standards)

OG `theme.css:114-129` verbatim: *"RATIO: Each size is 1.25× the previous size (Major Third musical interval). BASE: 16px (1rem)."* w/ named roles per step (`--text-card-micro` = "card metadata", `--text-nav` = "nav labels").

**Industry comparison:**
- **Material 3**: 15-style scale (Display / Headline / Title / Body / Label × Large/Medium/Small) — too many.
- **Carbon**: productive vs expressive duality — type-tokens split by surface intent. **More flexible than OG.**
- **Polaris**: numeric scale `--p-font-size-100/200/300` — extensible but loses semantic intent.
- **Primer**: hybrid — t-shirt for spacing, base.color.X.Y for color. Pragmatic.
- **Spectrum**: t-shirt scale `s/m/l/xl` w/ line-height-ratio tokens (not pixels) for localization.

**Verdict:** OG's MT 1.25 + named-role-per-step is **clearer than Material 3** and **less extensible than Carbon's productive/expressive split**. Recommend: keep MT scale, **add productive/expressive duality** for the cinematic-vs-editorial variant split (per industry-research/carbon.md adopt #3).

### 1.3 · Single icon library w/ semantic-role classification

OG `iconColors.ts:1-19`: *"Every Lucide icon must use one of these two colors — no exceptions. Content (#806ce0 Periwinkle): feature/metric/phase/content. Utility (#737373 Gray): navigation/action/UI/state."*

**Industry comparison:**
- **Material 3** has decorative vs functional but no color codification.
- **Carbon** has icon-primary / icon-secondary / icon-on-color roles — 3-tier (richer).
- **Polaris** has `color-icon-*` role tokens (`color-icon-critical`, `color-icon-info`).
- **Primer** uses Octicons w/ functional color tokens.
- **Spectrum**: per-component icon-color binding.

**Verdict:** OG's 2-class system (`content` vs `utility`) is **right for marketing surfaces** but **insufficient for data-heavy surfaces** where state-icons (success/warning/error) need their own classification. Carbon's 3-tier is better. **Recommend: extend OG to 4-class — `content / utility / state / brand` — with state being the green/amber/rose family.**

### 1.4 · Editorial dual-font pairing (Noto Serif + DM Sans)

OG `theme.css:7-39`: *"Contrast through category (sans + serif), harmony through weight."*

**Industry comparison:**
- **Material 3**: Roboto everywhere (single family).
- **Carbon**: IBM Plex (3 weights: Sans/Serif/Mono) but mostly Plex Sans.
- **Polaris**: Inter / system-ui.
- **Primer**: System sans-serif everywhere.
- **Spectrum**: Adobe Clean (proprietary).
- **Atlassian**: Atlassian Sans (single family).
- **shadcn**: System font + Inter.

**Verdict:** OG's Noto Serif + DM Sans is **the ONLY editorial-pairing in the industry sample**. Every other industry-DS is sans-only or Plex-only. **OG's typography choice is its strongest brand asset — preserve verbatim.** Editorial pairing differentiates Ken from "another SaaS DS."

### 1.5 · Dashboard-as-playground (self-rendering docs)

OG `DesignSystemDashboard.tsx` (84-91): 7-tab live surface that IS the docs.

**Industry comparison:**
- **Material 3**: Separate docs site + Compose preview tooling.
- **Carbon**: Storybook + carbondesignsystem.com (separate).
- **Polaris**: separate polaris.shopify.com + Web Component live previews.
- **Atlassian**: atlassian.design + per-package npm docs.
- **Primer**: primer.style + Storybook.
- **shadcn**: ui.shadcn.com w/ live previews (similar idea).
- **Spectrum**: spectrum.adobe.com + react-spectrum docs (separate).

**Verdict:** Dashboard-as-playground is **uncommon in the industry**; OG and shadcn are the closest matches. Material/Polaris/Atlassian/Carbon all separate docs from code. **OG's pattern is a strength** — keep, modernize via Storybook if needed but don't fragment docs from preview.

### 1.6 · AI-first authoring docs

OG `QUICK_START_PROMPT.md` (179 lines · agent onboarding) + `ai-context/*.md` (6 modules ≤15 KB each for context-window optimization).

**Industry comparison:**
- **Atlassian** introduced AI patterns (Rovo) in 2025 — for AI surfaces IN products, not for AI agents building w/ the DS.
- **Material 3** has no AI-authoring docs.
- **Carbon** has no AI-authoring docs.
- **Polaris** has no AI-authoring docs.
- **shadcn** markets itself as "AI-Ready" (per shadcn-ui.md L893) — code-as-data philosophy is AI-friendly but no copy-paste-prompt asset.
- **Primer**: no.
- **Spectrum**: no.

**Verdict:** OG is **ahead of the industry on AI-agent-authoring documentation**. This is a Ken-specific moat. **Preserve verbatim and expand.**

### 1.7 · Self-documenting `theme.css` (inline rationale)

OG `theme.css:7-39, 58-101, 114-139, 462-471` etc. — every token block carries Baymard cites, MT explanation, decision rationale.

**Industry comparison:**
- **Material 3**: tokens in DTCG JSON · descriptions live in docs site, not in source.
- **Carbon**: SCSS variables w/ minimal inline comments.
- **Polaris**: similar — token docs at polaris.shopify.com, not in source.
- **Primer**: `primer.style/foundations/primitives` separates description from source.

**Verdict:** OG's source-inline rationale is **uncommon and unusually helpful** (per `og-audit/00_overview.md` § Strength 1). Agents and humans both onboard fast because reading the source = reading the docs. **Preserve verbatim.**

### 1.8 · Component composition over inheritance

OG `ProductPageTemplate` (organisms) + slot-based hero (ProductHero) + render-prop browse (BrowseGrid) — declarative + composable, not inheritance-based.

**Industry comparison:**
- **shadcn / Radix**: Compound Component pattern (`Dialog.Trigger` + `Dialog.Content`) — same philosophy.
- **Material**: more prop-based; less compound.
- **Polaris**: ResourceList pattern — also compound.
- **Atlassian**: prop-based mostly.
- **Primer**: prop-based.

**Verdict:** OG's composition style is **on-par with shadcn/Radix industry-leaders**. **Preserve.**

---

## Section 2 · What OG lacks that industry has (10+ gaps)

### 2.1 · 3-tier token architecture (ref → sys → comp)

OG tokens are essentially single-tier. `--brand-red: #b01f24` is the value AND the semantic AND the consumer-binding all-in-one.

**Industry standard (Material 3, Spectrum, Atlassian):**
- **Ref tier** (`md.ref.color.primary-50`, `--spectrum-blue-700`) — raw palette
- **Sys tier** (`md.sys.color.primary`, `--spectrum-accent-color-default`) — semantic role
- **Comp tier** (`md.comp.filled-button.container.color`, `--spectrum-button-primary-bg`) — component binding

**Why OG loses:**
- Cannot retheme cinematic-vs-editorial without re-defining brand red twice.
- Cannot dark-mode without manual re-binding.
- No isolation: changing a Button color requires touching the global `--brand-red` (high-blast-radius edit).

**Recommended adopt:** Material 3 / Spectrum 3-tier hierarchy. core-v2's Style Dictionary v4 already supports this; just needs the JSON source to be re-structured. **HIGH PRIORITY.**

### 2.2 · Paired role tokens (`on-primary`, `on-surface`)

OG has surface tokens (`--white`, `--warm-300`, `--black`) and text tokens (`--text-primary`, `--label-on-black`) but the *pairings* are by convention not enforced at the token level.

**Industry standard (Material 3, Spectrum):**
- `md.sys.color.primary` ALWAYS paired with `md.sys.color.on-primary` — contrast guaranteed by construction.
- Apply `on-{role}` for every surface.

**Why OG loses:**
- Designer must remember which text color goes on which bg. Drift inevitable.
- Black-on-warm-300 = 21:1 (fine). Brand-red-text-on-warm-300 = lower (depends). No automatic check.

**Recommended adopt:** Material 3 `on-{role}` token pairs. **HIGH PRIORITY.**

### 2.3 · Component lifecycle status badges

OG has no signal of which atoms are stable vs experimental vs deprecated.

**Industry standard (Atlassian, Primer):**
- Atlassian: `alpha | beta | stable | deprecated` per `@atlaskit/*` package.
- Primer: lifecycle stages documented at `primer.github.io/contribute/component-lifecycle/`.

**Why OG loses:**
- Consumers don't know if `ResourceCard` is production-ready or experimental.
- Refactor risk hidden.

**Recommended adopt:** add `status: alpha|beta|stable|deprecated` to each WWWWH atom doc front-matter (per `industry-research/atlassian.md` adopt #2). **MEDIUM PRIORITY.**

### 2.4 · Anatomy diagrams w/ token-named parts

OG component docs are prose; no labeled anatomy.

**Industry standard (Spectrum, Material 3):**
- Spectrum Button doc labels: `container` · `label` · `icon` · `focus-indicator` — each label matches a token name (`--spectrum-button-container-bg`).
- Material Cards page shows every part w/ its `md.comp.*` token.

**Why OG loses:**
- Agents and designers can't pin a visual change to a specific token. Have to read CSS rules to find what controls what.

**Recommended adopt:** add "Anatomy → Token map" diagram or table to every WWWWH atom doc. Spectrum's pattern is the gold standard. **HIGH PRIORITY** (per `industry-research/spectrum.md` adopt #2).

### 2.5 · Decision-tree pickers (3-question flowcharts)

OG has "WHEN NOT use X instead" pointer rows but no formal decision-tree UI.

**Industry standard (Spectrum):**
- "Should I use a Toast or a Dialog?" 3-5 question flow → deterministic component pick.
- "Should I use a Picker or a Combo Box?"

**Why OG loses:**
- Picking Button vs CTALink vs InlineLink still requires reading three docs.
- Agent error-prone.

**Recommended adopt:** publish decision-tree pages in `core-v2/docs/decisions/` — pattern from Spectrum. Atlassian and Polaris also publish similar. **MEDIUM PRIORITY** (per `industry-research/spectrum.md` adopt #3).

### 2.6 · WCAG-cited-per-component

OG component docs have a "A11y rules" section but don't cite WCAG SC numbers verbatim.

**Industry standard (Lightning SLDS):**
- "addresses 2.5.5 Target Size" inline in component docs.
- Every interaction maps to a Success Criterion.

**Why OG loses:**
- Hard to defend compliance in procurement audits (VPAT). Have to back-derive WCAG mapping.

**Recommended adopt:** add "WCAG SC" sub-section per atom WWWWH doc — cite 2.1.1, 2.4.7, 2.5.5, 1.4.3, etc. per applicable. **MEDIUM PRIORITY** (per `industry-research/lightning.md` adopt #5).

### 2.7 · Density vocabulary (compact/regular/spacious)

OG has one density. All atoms are sized for editorial-cinematic surfaces.

**Industry standard (Carbon, Spectrum, Polaris):**
- Carbon: productive (data UI) vs expressive (marketing) type + spacing scales.
- Spectrum: `s/m/l/xl` t-shirt sizes + provider-level density swap.
- Polaris: density framing per surface ("Pro Design Language").

**Why OG loses:**
- Report-viewer (analyst dashboard) needs dense table UI. Listings need mid-density. Marketing pages need spacious.
- OG forces one density everywhere; consumers re-implement.

**Recommended adopt:** add `data-density="compact|regular|spacious"` ancestor selector + token swap. Spectrum's provider-level density is the model. **LOW-MEDIUM PRIORITY** (becomes critical once data surfaces ship).

### 2.8 · Surface-layer model for elevation

OG dark mode = `#0a0a0c` flat. Elevation = shadow.

**Industry standard (Material 3):**
- Surface roles `surface-container-low` through `surface-container-highest` provide tonal elevation (shadows don't read on dark).
- 5-tier surface ramp.

**Why OG loses:**
- Cinematic-dark cards stack flatly. Hover/elevation doesn't communicate visually because shadow is invisible on near-black.
- Workarounds = inline rgba tweaks.

**Recommended adopt:** add `--surface-1` through `--surface-4` tokens for cinematic-dark. Material 3's `surface-container-*` is the model. **MEDIUM PRIORITY** (per `industry-research/material-design.md` adopt #5).

### 2.9 · RFC process for major DS changes

OG has no RFC — changes happen via inline commit.

**Industry standard (Atlassian, Carbon):**
- RFC template → proposal → review → decision → rollout.
- Especially for breaking token renames, new atoms, new variants.

**Why OG loses:**
- Token renaming (e.g. `--brand-red` → `--color-brand-red`) silently broke consumers.
- No record of WHY a token was renamed.

**Recommended adopt:** template `docs/RFC-template.md` for major DS changes. Atlassian's model. **LOW PRIORITY** for now (team is small), but document the template. (Per `industry-research/atlassian.md` adopt #5.)

### 2.10 · Automated a11y + visual tests in CI

OG: zero tests. No axe, no Lighthouse, no Playwright, no visual regression.

**Industry standard (Lightning, Spectrum, Carbon):**
- SLDS: axe + Storybook visual regression in CI.
- Spectrum: React Aria suite has unit tests per primitive.
- Carbon: monorepo CI runs axe + visual regression.

**Why OG loses:**
- Every page audit is human-only (slow + error-prone).
- A11y regressions land silently.

**Recommended adopt:** **MEDIUM PRIORITY.** Already on Ken roadmap per workspace `webapp-testing` skill install (2026-05-12 · CLAUDE.md L51). Wire it into core-v2 build.

### 2.11 · Voice documentation as first-class

OG: voice extracted from component strings only. No `voice.md`.

**Industry standard (Polaris):**
- Content guidelines INSIDE component docs.
- Button labels, empty-state copy, error-state copy specified per component.

**Why OG loses:**
- Every page reinvents CTA copy. "Click here" vs "Get started" vs "Schedule a demo" — drift.
- Inferred audit (voice-brand.md) is a one-time pass; doesn't auto-enforce.

**Recommended adopt:** ship `core-v2/voice/voice.md` w/ canonical CTA library + headline patterns + microcopy conventions (per `og-audit/voice/voice-brand.md` synthesis). Pattern from Polaris. **MEDIUM PRIORITY.**

### 2.12 · Per-component mobile-behavior section

OG component docs are mostly desktop-default. Mobile = "responsive Tailwind classes inferred."

**Industry standard (Polaris):**
- Each component doc has explicit mobile behavior: touch gestures, layout collapse, responsive transformations.

**Why OG loses:**
- Mobile design ambiguity → consumer-side drift.

**Recommended adopt:** add "Mobile behavior" sub-section to WWWWH methodology (`01_methodology.md`). **MEDIUM PRIORITY.**

### 2.13 · Per-component CHANGELOG

OG: single workspace `CHANGELOG.md`. No per-atom changelog.

**Industry standard (Atlassian, Polaris):**
- `@atlaskit/button/CHANGELOG.md` per package.

**Why OG loses:**
- Hard to track when a component's API changed.

**Recommended adopt:** add `<atom>/CHANGELOG.md` per changed atom. **LOW PRIORITY** unless atoms split into packages.

### 2.14 · KPI / Big Number primitive

OG has `StatCard` (molecule) + `DataHighlightCard` (molecule) — two different shapes for the same intent.

**Industry standard (Spectrum):**
- Big Number atom = value + label + delta indicator + trend sparkline. Single primitive.

**Why OG loses:**
- 2-component duplication (StatCard, DataHighlightCard).
- Inconsistent visual treatment across surfaces.

**Recommended adopt:** consolidate `StatCard` + `DataHighlightCard` into a `BigNumber` atom (or molecule) with slot-driven variation. Spectrum's pattern. **LOW-MEDIUM PRIORITY** (per `industry-research/spectrum.md` adopt #5).

### 2.15 · Data-table primitive

OG ships zero table tooling. Report-store + listing surfaces handle tabular data via card grids.

**Industry standard (SLDS, Carbon, Polaris):**
- SLDS Data Tables: 8+ docs (row selection, batch actions, inline edit, sorting, pagination, empty, loading, resizable).
- Carbon Data Tables: similar exhaustive coverage.
- Polaris IndexTable + ResourceList.

**Why OG loses:**
- Future analyst dashboards / report comparison tables = re-implement from scratch.

**Recommended adopt:** plan a `DataTable` molecule + state hooks per SLDS pattern depth. **LOW PRIORITY** until consumer needs it (analyst dashboard / comparison surface).

### 2.16 · 4-class icon role system

OG `iconColors.ts` has 2 classes: `content` (#806ce0 purple) + `utility` (#737373 gray).

**Industry standard (Carbon):**
- icon-primary (semantic strong)
- icon-secondary (semantic weak)
- icon-on-color (icon on filled bg)
- icon-{state} for success/warning/error

**Why OG loses:**
- State icons (green check, amber warning, rose error) re-derive their color each use.
- No designated "icon-on-brand-red" rule.

**Recommended adopt:** extend `iconColors.ts` to 4-class — `content / utility / state / brand`. State = green/amber/rose family. **MEDIUM PRIORITY.**

---

## Section 3 · What OG over-does vs industry norm

### 3.1 · Too many shadcn primitives shipped but not used

OG ships 46 shadcn primitives in `src/app/components/ui/` (Figma Make import artifact). Most are unused.

**Industry equivalent:** shadcn philosophy is "add what you use" — don't bulk-import. Atlassian/Polaris/Carbon ship per-component packages.

**Verdict:** prune unused shadcn primitives from core-v2 build. Industry-research/shadcn-ui.md L976-979 recommends auditing usage. **CLEAN-UP TASK.**

### 3.2 · Dual TS + CSS token sources

OG has both `theme.css` (CSS vars) and `tokens.ts` (TS constants) — manual sync, no build step.

**Industry equivalent:** every modern DS (Material, Spectrum, Atlassian, Polaris) uses Style Dictionary or equivalent to generate from one source.

**Verdict:** core-v2 has already fixed this via Style Dictionary v4 (per HANDOVER.md L37). ★ But OG itself is "over-doing" by having two parallel sources.

### 3.3 · 24 RS organisms + 10 case-study organisms in flat folder

OG `components/` is a flat folder with 76 .tsx files. Hard to navigate at scale.

**Industry equivalent:** every industry DS uses nested folders by domain or category (Atlassian splits by feature, Carbon by component-type).

**Verdict:** core-v2 already splits into `atoms/molecules/organisms` (per `src/`). ★ OG's flat folder is the over-do.

### 3.4 · 11-theme Badge × 4 sizes × 3 variants × 2 modes (22 + 12 + 22 = 528 visual permutations)

OG Badge.tsx is 798 LOC for this matrix. Used 9 convenience wrappers to manage the surface area (`SectionLabel`, `StepPill`, etc.).

**Industry equivalent:**
- Material 3 Badge: 1 variant, color via outer chip theme.
- Polaris Badge: ~5 themes (Status: info/success/warning/critical/new).
- Atlassian Lozenge: ~4 themes.

**Verdict:** 11 themes is industry-rich (good for editorial expressiveness) BUT 22 color combos × 4 sizes is over-spec'd for a single atom. Consider: 6 themes max (brand · neutral · success · warning · error · accent) + 2 modes. Save 5 specialty themes (warm · coral · perano · periwinkle · muted) for inline override use only. **LOW-MEDIUM PRIORITY.**

---

## Section 4 · Cross-DS patterns Ken should adopt (priority list)

Synthesized from all 10 industry references + OG audit. Ordered by HIGHEST IMPACT first.

### Priority 1: 3-tier token architecture (ref → sys → comp)

**Source:** Material 3, Spectrum, Atlassian, Polaris.
**Why:** future-proofs cinematic vs editorial split, dark mode, future whitelabel.
**Action:** restructure `design-system/tokens/` JSON source into 3 layers; Style Dictionary supports it.

### Priority 2: Paired role tokens (`on-primary`, `on-surface`, `on-warm`)

**Source:** Material 3, Spectrum.
**Why:** guarantee contrast at the token level, eliminate "what text color goes on this bg?" judgment.
**Action:** add `--color-on-{role}` tokens. Apply in atom code.

### Priority 3: Component lifecycle status badges (alpha/beta/stable/deprecated)

**Source:** Atlassian, Primer.
**Why:** signal risk to consumers; surface refactor candidates.
**Action:** add `status:` front-matter to each WWWWH atom doc; surface in COMPONENT_REFERENCE.md.

### Priority 4: WCAG-criteria cited per component

**Source:** Lightning SLDS.
**Why:** procurement / VPAT defensibility.
**Action:** add "WCAG SC" sub-section to atom WWWWH docs.

### Priority 5: Decision-tree pickers (3-question flowcharts)

**Source:** Spectrum, Atlassian, Polaris.
**Why:** convert ambiguous component choice into deterministic flow.
**Action:** publish decision-tree pages in `core-v2/docs/decisions/` (e.g. `cta-picker.md`).

### Priority 6: Anatomy diagrams w/ token names per part

**Source:** Spectrum, Material 3.
**Why:** pin visual change to specific token; agents and designers benefit.
**Action:** add anatomy diagrams (Mermaid or SVG) to atom WWWWH docs.

### Priority 7: Density vocabulary (compact/regular/spacious)

**Source:** Carbon, Spectrum, Polaris.
**Why:** report-viewer needs dense; listings need mid; marketing needs spacious. One DS, three surfaces.
**Action:** add `data-density` ancestor selector + token swap.

### Priority 8: Surface-layer model for dark elevation

**Source:** Material 3.
**Why:** cinematic-dark surfaces stack flatly without shadow; need tonal elevation.
**Action:** define `--surface-1` through `--surface-4` for cinematic-dark.

### Priority 9: Voice documentation as first-class

**Source:** Polaris.
**Why:** prevent CTA / empty-state / error-state drift across consumers.
**Action:** ship `core-v2/voice/voice.md` w/ canonical CTA library + microcopy conventions.

### Priority 10: Automated a11y + visual testing CI

**Source:** Lightning, Spectrum, Carbon.
**Why:** prevent silent a11y regressions; catch visual drift.
**Action:** wire `webapp-testing` skill (already installed) into core-v2 build pipeline.

### Priority 11: KPI / Big Number primitive

**Source:** Spectrum.
**Why:** consolidate StatCard + DataHighlightCard into one shared primitive.
**Action:** build `BigNumber` atom with slot-driven variation.

### Priority 12: 4-class icon role system

**Source:** Carbon, Polaris.
**Why:** state-icons need their own color classification beyond content/utility.
**Action:** extend `iconColors.ts` to `content / utility / state / brand` classes.

### Priority 13: Per-component mobile-behavior section

**Source:** Polaris.
**Why:** prevent mobile design ambiguity.
**Action:** add to WWWWH methodology.

### Priority 14: Per-component CHANGELOG (long-term)

**Source:** Atlassian, Polaris.
**Why:** track API drift per atom.
**Action:** defer until atoms split into packages.

### Priority 15: RFC process for breaking changes

**Source:** Atlassian, Carbon.
**Why:** document WHY a breaking change happened.
**Action:** template `docs/RFC-template.md`; use for next major DS change.

---

## Section 5 · What CORE-V2 already inherits from industry (and shouldn't lose)

Per `og-vs-core-v2.md` § 4, core-v2 already implements:

| Industry pattern | core-v2 status | Source |
|---|---|---|
| Style Dictionary / DTCG tokens | ★ Implemented | Spectrum, Material 3, Atlassian |
| Radix UI a11y substrate | ★ Implemented (46 primitives ported from shadcn) | Radix, shadcn, Atlassian (Reshaped) |
| `'use client'` RSC compatibility | ★ Implemented | Modern Next.js pattern |
| `asChild` polymorphism | ★ Implemented (via Radix Slot) | Radix |
| `cn()` + `cva` variant pattern | ★ Implemented | shadcn |
| Compound Component pattern (Card.Body, Dialog.Trigger) | ★ Partial — Radix-based atoms have it; Ken-original atoms don't | Radix, shadcn |
| Adapter pattern for data-driven organisms | ★ Implemented (Phase 3 · 2026-05-13) | Polaris ResourceList |
| Reduced-motion at DS layer | ★ Implemented via Tailwind `motion-reduce:` utilities | Material 3, Spectrum |
| Single source-of-truth ANTI_PATTERNS.md | ★ Implemented (14 categories) | Polaris, Atlassian |

These should be **carefully preserved** during any further DS work.

---

## Section 6 · OG inferred priorities vs industry priorities

| OG inferred priority (from audit) | Industry priority | Alignment |
|---|---|---|
| 1. Brand discipline (92-5-3 + MT + 2-font) | 1. Brand discipline (varies per DS) | ✅ aligned, OG more explicit |
| 2. AI-first authoring (`ai-context/*.md` + QUICK_START_PROMPT) | n/a (no industry equivalent) | Ken-specific moat |
| 3. Component composition over inheritance | ★★★★★ | ✅ aligned |
| 4. Editorial cinematic feel | n/a (most industry DS are utility-flavored) | Ken-specific brand asset |
| 5. Self-rendering dashboard | ★★★☆ (shadcn does this; others separate) | aligned |
| 6. Token-driven theming | ★★★★★ | aligned but OG single-tier vs industry 3-tier |
| 7. WCAG 2.1 AA | ★★★★★ | aligned, mid-quality coverage |
| n/a (OG has no spec) | 8. 3-tier tokens · paired roles · status badges · anatomy diagrams · decision trees · density vocab · surface layers · voice docs · automated tests | **GAPS** |

---

## Section 7 · The big picture

OG is a **brand-locked editorial-cinematic DS** built when the industry was still arguing about Material vs Atomic. It's earlier than Spectrum 2, Material 3, ADS-w-tokens. As a result:

- **Where OG is BETTER:** 92-5-3 discipline, editorial typography, source-inline rationale, AI-onboarding docs, dashboard-as-playground.
- **Where OG is WORSE:** token tier discipline, paired roles, anatomy diagrams, density modes, surface layers, automated testing.
- **Where OG and industry MATCH:** Radix a11y substrate, compound components, reduced-motion, anti-patterns documentation.

core-v2 has done some of the upgrade work (Style Dictionary, RSC compat, adapter pattern) but skipped the documentation layer that gives OG its 5/5 intent score. The path forward is **NOT** "make OG more like industry" — it's "preserve OG's strengths + adopt industry's discipline layers."

**One-line direction:** Keep OG's brand-cinematic identity (Noto Serif + DM Sans + 92-5-3 + warm-300 + MT scale). Adopt industry's three-tier token architecture, role-paired tokens, lifecycle badges, anatomy diagrams, decision-trees, and automated test discipline.

---

## REUSABILITY SCORE

**OG-as-reference-against-industry:** ★★★★ (4/5) — best-in-class for editorial brand intent, mid-tier for tooling discipline.

**Industry-research corpus → Ken adopt list:** ★★★★★ (5/5) — 16+ concrete pattern adoptions identified; all align with Ken's editorial + AI-authoring direction without forcing industry homogenization.

---

## LINKED concepts

- **og-vs-core-v2.md** (sibling) — port-level deltas + hidden strengths in core-v2 that should not regress
- **prioritized-actions.md** (sibling) — concrete P0/P1/P2 action list w/ effort
- **industry-research/material-design.md** — 3-tier tokens, surface layers, dynamic color
- **industry-research/carbon.md** — productive vs expressive duality, layer model, 4-theme packaging
- **industry-research/polaris.md** — Pro Design Language (density), content guidelines first-class, numeric token scale
- **industry-research/lightning.md** — WCAG-cited components, slds-assistive-text, exhaustive state docs
- **industry-research/atlassian.md** — multi-product token theming, component lifecycle, RFC process, AI patterns (Rovo)
- **industry-research/primer.md** — functional naming, documentation density, multi-repo separation
- **industry-research/spectrum.md** — 3-tier tokens, anatomy diagrams, decision trees, big-number, density modes
- **industry-research/shadcn-ui.md** — copy-paste model, cn+cva, RSC review pattern
- **industry-research/radix-ui.md** — compound components, asChild, data-state, focus management
- **industry-research/tailwind-ui.md** — pattern dictionary for marketing surfaces, decision-tree variant naming
- **og-audit/00_overview.md** — OG architecture + identified weaknesses (§ 11)
- **og-audit/anti-patterns/anti-patterns-catalog.md** — OG's 70-anti-pattern catalog (alignment w/ Polaris + Atlassian centralized lists)
- **og-audit/a11y/a11y-baseline.md** — OG WCAG 2.1 AA target (alignment w/ Radix + SLDS)
- **og-audit/voice/voice-brand.md** — OG voice extracted from strings (gap that Polaris fills natively)
