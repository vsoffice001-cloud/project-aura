# IBM Carbon Design System · Industry DS Reference

**Source:** [carbondesignsystem.com](https://carbondesignsystem.com) · `github.com/carbon-design-system/carbon` · IBM Design Language docs.
**Audited:** 2026-05-13 · for Ken Research DS gap analysis · methodology: WWWWH per `01_methodology.md`.

---

## WWWWH summary

### WHAT (essence)
Carbon is **IBM's open-source enterprise design system** built on the IBM Design Language. It centers on a **2x Grid geometry** (8px mini-unit · fluid + fixed grids), **multi-theme token packaging** (white · g10 · g90 · g100), a **3-tier contribution model** (Light · Medium · Heavy), and **deep data-visualization tooling** (Carbon Charts · 26 chart types across React/Vue/Angular/Svelte/vanilla).

### WHY they exist (problem · adoption story)
- **Enterprise software at IBM scale.** IBM ships hundreds of internal + customer-facing products (Watson, Cloud Pak, MaaS360, IBM.com, internal admin tools). Without shared tokens + components, every team rebuilt the same data table and tabs.
- **Federation, not dictatorship.** IBM teams have wildly different needs (Watson AI ≠ banking ≠ Cognos analytics). Carbon's contribution model accepts upstream contributions instead of forcing top-down design, which is the only way to stay alive at this scale.
- **Open source as recruitment + standards bet.** Carbon is MIT-licensed; external adoption (Knapsack, NYC.gov rumored adopters, smaller fintechs) creates a talent pipeline of devs who already know the system.
- **Accessibility as enterprise table-stakes.** US federal contracts require Section 508; EU clients require EN 301 549. Carbon is WCAG 2.1 AA by construction — non-negotiable for IBM revenue.

### WHEN their approach fits ✅
- Multi-product enterprise (5+ apps, 50+ surfaces)
- Heavy data UI: tables · forms · dashboards · charts · admin panels
- Need to support light/dark + multiple density modes
- Strong governance + steering committee feasible (5+ DS team members)
- Section 508 / WCAG AA / a11y compliance is contractual

### WHEN NOT ❌
- **Marketing / editorial site.** Carbon's component vocabulary is product-app: data table, modal, tabs, accordion, notification. Awkward for a long-form case study or storytelling layout.
- **Brand-expressive / cinematic surfaces.** Carbon is intentionally restrained, almost utilitarian (IBM Plex everywhere, blue-leaning neutrals). Bolting in cinematic-dark hero motion fights the system.
- **Small team without governance bandwidth.** Carbon's strength is its contribution model · that model assumes a steering committee can review PRs, run RFCs, etc. Solo designer + 1 dev cannot sustain it.
- **No data-viz needs.** Half of Carbon's differentiation is Carbon Charts; if you don't show data, you're paying tax for nothing.

### WHERE deployed (scale)
- **IBM.com** marketing site (Carbon for IBM dotcom extension package)
- **IBM Cloud** console + admin
- **Watson** products (Studio, Assistant, Discovery, OpenScale)
- **Cognos Analytics** · **Maximo** · **Cloud Pak** suite
- **Internal IBM tools** (hundreds, unnamed publicly)
- **External adopters:** open-source / fintech / govtech orgs · per Carbon partners page
- Multi-thousand engineer adoption · ~10y running (Carbon v1 ~2016 · v11 active in 2025)

### HOW structured (folder + token format + doc method)
- **Monorepo:** `github.com/carbon-design-system/carbon` · `packages/` workspace
  - `@carbon/react` (primary consumer) · `@carbon/styles` (SCSS) · `@carbon/themes` (4 themes) · `@carbon/grid` · `@carbon/icons-react` · `@carbon/pictograms-react` · `@carbon/colors` · `@carbon/type` · `@carbon/motion` · `@carbon/layout` · `@carbon/elements` (umbrella)
- **Token format:** SCSS variables + CSS custom properties + JS exports (multi-format). Themes export tokens like `interactive01`, `text01`, `ui-background`, `layer-01`/`-02`/`-03` (layer model).
- **Doc method:** every component page on carbondesignsystem.com has Usage · Style · Code · Accessibility tabs. Code tab is exhaustive (props table, every state, RTL behavior).

---

## Token system deep dive

Carbon's tokens evolved across major versions; v11 (current) uses a **layer model** that's the key innovation.

### Themes (4 packaged)
- **white** — light theme, lightest (primary)
- **g10** — light theme, slightly darker (subtle contrast for nested surfaces)
- **g90** — dark theme, mid (supporting theme · v11 caveat: can't be primary in some configs)
- **g100** — dark theme, deepest (primary dark)

Theme switching is global via SCSS mixin `@include carbon--theme($carbon--theme--g90)` or CSS class scoping.

### Layer model (v11 · the key insight)
Instead of using shadow for elevation, Carbon stacks surfaces by **layer tokens** — `$layer-01`, `$layer-02`, `$layer-03`. Each layer is a tonal step away from background. Component backgrounds reference `$layer` (the contextual current layer). When you nest a component, you increment to `$layer-02`, and the system automatically resolves the correct color. This is mostly what Material called "surface-container" but **explicitly contextual** — Carbon resolves layer by DOM nesting, not by component prop.

### Token role naming
Tokens are role-named not value-named:
- `text-primary` · `text-secondary` · `text-helper` · `text-error` · `text-on-color`
- `background` · `layer` · `layer-accent` · `field` · `border-subtle` · `border-strong`
- `interactive` · `focus` · `link-primary` · `link-visited`
- `support-error` · `support-success` · `support-warning` · `support-info`
- `icon-primary` · `icon-secondary` · `icon-on-color`

Each role exists in all 4 themes — same name, different value.

### Type tokens
IBM Plex (Sans · Serif · Mono) only. Tokens like `body-01`, `body-02`, `heading-01`–`heading-07`, `productive-heading-*` (denser) vs `expressive-heading-*` (marketing density). The productive/expressive split is Carbon's acknowledgment that one type scale doesn't fit data tables AND landing pages.

### Motion tokens
`@carbon/motion` exports easing curves (`productive-standard`, `expressive-standard`, `expressive-entrance`, `productive-exit`) and durations (`fast-01` 70ms · `fast-02` 110ms · `moderate-01` 150ms · `moderate-02` 240ms · `slow-01` 400ms · `slow-02` 700ms). Productive = data UI · Expressive = marketing surfaces.

---

## 2x Grid system

The geometric heart of Carbon. Every Carbon layout descends from this.

- **Mini-unit:** 8px square. Every dimension is a multiple.
- **Spacing scale:** 1x, 2x, 3x, 4x, 6x, 8x, 10x, 12x mini-units → `$spacing-01` (2px) · `$spacing-02` (4px) · `$spacing-03` (8px) · `$spacing-04` (12px) · `$spacing-05` (16px) · `$spacing-06` (24px) · `$spacing-07` (32px) · `$spacing-08` (40px) · `$spacing-09` (48px) · `$spacing-10` (64px) · `$spacing-11` (80px) · `$spacing-12` (96px) · `$spacing-13` (160px).
- **Breakpoints (5):** `sm` 320px · `md` 672px · `lg` 1056px · `xlg` 1312px · `max` 1584px.
- **Columns:** legacy 12-column · v11 introduces 16-column behind feature flag `grid-columns-16`.
- **Padding:** fixed 16px at all standard breakpoints (not fluid).
- **Fluid vs Fixed grid:** fluid = available width ÷ 2 recursively (mostly for hero/marketing) · fixed = column-count × column-width (default for product app).

The named numeric tokens (`spacing-01` through `-13`) is the right pattern. Magic numbers are banned; everything maps to a named step.

---

## Component documentation method

Carbon component pages (e.g., [Button](https://carbondesignsystem.com/components/button/usage/) · [Data table](https://carbondesignsystem.com/components/data-table/usage/) · [Modal](https://carbondesignsystem.com/components/modal/usage/)) have a consistent 4-tab structure:

1. **Usage** — when to use · when not to use (explicit list contrasting siblings) · live examples · variants enumerated
2. **Style** — anatomy diagram w/ measurements · color tokens · typography tokens · spacing tokens · states (default, hover, active, focus, disabled, read-only, error). Every measurement labeled.
3. **Code** — React, Web Components, Angular, Vue tabs · full prop table · all variants demoed live
4. **Accessibility** — keyboard interactions (Tab, Enter, Space, Esc, arrows specific to component) · screen-reader announcements · ARIA roles · WCAG criteria addressed

Data Table specifically has separate pages for: overview · expansion · selection · batch actions · sorting · filtering · pagination · inline editing · empty state. Each pattern documented as its own component.

---

## Decision tree examples (use X when Y)

- **Notification type:** Toast (transient · auto-dismiss · non-critical) · Inline (in-flow · contextual to form) · Actionable (requires user dismissal · critical message)
- **Modal variants:** Modal (full-screen dialogue, requires user decision) · Side panel (non-blocking, editing/details) · Tearsheet (Carbon for IBM Products extension · for complex tasks)
- **Tile variants:** Clickable tile (entire tile is action) · Selectable tile (checkbox-like) · Expandable tile (reveals more content) · Radio tile (single-select in group)
- **Button hierarchy:** Primary (1 per view section) · Secondary · Tertiary · Ghost (lowest emphasis) · Danger (destructive · primary or tertiary variants)
- **Form layout:** Always pair label + input + (optional) helper + (optional) error · vertical stack only · no inline labels (a11y)

Each component's Usage page leads w/ "When to use" then "When not to use" — same sibling-disambiguation pattern Material uses.

---

## Governance + contribution model

This is Carbon's organizational secret sauce.

- **Steering committee** — Carbon practitioners (not management) · oversight + roadmap direction. Voice of customer + business.
- **Core team** — maintainers · merge PRs · publish releases.
- **Working groups** — per-domain SIGs (a11y, data viz, motion, web components).
- **Contribution levels:**
  - **Light** — typo fix · small visual tweak · docs change. Fast review.
  - **Medium** — new icon · new guideline · enhancement to existing component. RFC optional.
  - **Heavy** — whole new component or pattern. Requires RFC · steering committee review · design + dev sign-off · a11y review.

This 3-level gradient is **the right structure for federated DS**. It tells contributors "small thing? fast lane. Big thing? expect process." Without it, you either burn maintainers on bikeshedding or block everyone behind committee review.

---

## Data visualization integration

Carbon Charts is a separate package but ships under the Carbon umbrella:
- 26 chart types (line · bar · stacked bar · area · pie · donut · gauge · meter · sankey · circle pack · tree · alluvial · etc.)
- Framework-agnostic core (D3 underneath) w/ React, Angular, Vue, Svelte, vanilla wrappers
- Charts use Carbon color tokens by default → theme switch propagates
- Accessibility baked: keyboard nav for legend · screen reader summaries · sonification experiments

This is differentiated from Material (no equivalent) and Lightning (data tables but no charting). For Ken showing report analytics, this is precedent.

---

## Accessibility standards

- **WCAG 2.1 AA** baseline · many components hit AAA contrast.
- **Keyboard nav** documented per component · spec includes arrow keys for complex widgets (data table cell focus, accordion).
- **Screen reader** support: every component tested w/ NVDA, JAWS, VoiceOver. Announcements documented.
- **Focus management:** explicit focus order, trap-focus in modals, return-focus on close.
- **High-contrast mode** support (Windows HCM) via system color keywords.
- **Reduced motion:** `prefers-reduced-motion` honored across all `@carbon/motion` transitions.
- **Touch target:** 44×44px minimum (mobile · per WCAG 2.5.5).
- **Color independence:** never communicate state by color alone · always paired w/ icon or text.

---

## Motion philosophy

Two scales for two contexts:
- **Productive motion** (data UI · transactional) — fast, functional, low-emphasis. Easings like `productive-standard` (cubic-bezier(0.2, 0, 0.38, 0.9)) · durations 70–240ms.
- **Expressive motion** (marketing · onboarding · brand) — slower, more emotive. `expressive-entrance` curves · durations 240–700ms.

The productive/expressive split is Carbon's most underrated insight: **one motion language fits no one**. Same applies to type, density, even spacing. Carbon explicitly bifurcates.

---

## Strengths (5 things Ken should learn)

1. **Named spacing scale (`spacing-01` through `-13`).** Numeric steps replace magic numbers. Every gap, padding, margin maps to a token. Ken's `tokens.css` likely has some of this — Carbon's discipline is enforcing it 100%.
2. **Layer model for nested surfaces.** `$layer-01`/`-02`/`-03` resolves contextually by nesting. Solves the "what background should a card-inside-a-card use?" problem without designer judgment. Critical for cinematic-dark (no shadows · need tonal layers).
3. **Productive vs expressive duality.** Two type scales, two motion scales, two density modes — same brand, different intent. Maps perfectly to Ken's cinematic vs editorial variant split. Adopt the dual-track naming.
4. **3-tier contribution model.** Even at Ken's scale (small team), formalizing "Light · Medium · Heavy" change classes prevents every CSS tweak triggering a meeting. Bake into `aura-design` workflow.
5. **Per-component a11y page.** Every Carbon component has its own accessibility section documenting keyboard map · screen-reader behavior. Ken's WWWWH methodology already requires this — Carbon is the gold standard to benchmark against.

---

## Weaknesses / overkill (3 things NOT to copy)

1. **Steering committee + working groups + RFC process.** Carbon's governance is right for IBM (hundreds of contributors). Ken at current scale (1 designer + occasional dev) would die under this overhead. Adopt the **contribution-level gradient** without the committee scaffolding.
2. **4 packaged themes (white/g10/g90/g100).** Ken has 2 variants (cinematic · editorial). Carbon's 4-theme structure assumes IBM-scale brand-extension needs that don't apply. Stop at 2 themes.
3. **IBM Plex typography lock-in.** Carbon couples typography tokens to Plex assumptions (line-height ratios, weight availability). Ken uses Noto Serif + DM Sans — replicate the token shape, not the type-family assumptions.

---

## Specific patterns Ken should adopt + why

| Pattern | Why | Where in Ken |
|---|---|---|
| **Named numeric spacing scale (`spacing-01..13`)** | Eliminates magic numbers · enforces 8px rhythm · familiar to devs | Audit `tokens/build/tokens.css` · convert ad-hoc `--space-*` to numbered scale (verify rhythm consistency) |
| **Layer model for surfaces** | Solves nested-card-on-dark-bg problem · cinematic-dark needs this | Add `--surface-layer-01`/`-02`/`-03` tokens for cinematic · component reads via inherited custom property |
| **Productive vs Expressive duality (type + motion)** | Maps to cinematic/editorial split · same brand · 2 intent modes | Rename existing type tokens w/ productive/expressive prefixes · same for motion easings |
| **3-tier contribution model (Light/Medium/Heavy)** | Right-sizes review per change class · saves bandwidth | Add to `aura-design` skill docs · classify edits before opening PR · gate by class |
| **Per-component A11y doc section (mandatory)** | Already in WWWWH · Carbon is benchmark for depth | Audit existing WWWWH docs against Carbon Button + Data Table a11y depth |
| **Component-pattern split (Data Table → sorting / filtering / pagination as separate pages)** | Avoids "1 component, 50 props" mega-doc · each behavior gets its own page | Apply to Ken's Card (CardGrid · CardFlip · CardWithCTA as distinct molecules · each w/ own doc) |
| **Carbon Charts approach (separate package, shared tokens)** | Future-proof for Ken showing report analytics · don't bake into core DS prematurely | Defer · evaluate when first analytics-heavy page (PDP w/ adoption stats?) needs charts |

---

## Sources

- [Carbon Design System homepage](https://carbondesignsystem.com/)
- [2x Grid · Carbon](https://carbondesignsystem.com/elements/2x-grid/overview/)
- [Themes · Carbon](https://carbondesignsystem.com/elements/themes/overview/)
- [Carbon Charts](https://charts.carbondesignsystem.com/)
- [Carbon monorepo · GitHub](https://github.com/carbon-design-system/carbon)
- [@carbon/themes on npm](https://www.npmjs.com/package/@carbon/themes)
- [IBM Design Language · 2x Grid](https://www.ibm.com/design/language/2x-grid/)
- [Lessons learned · Carbon for IBM.com (Knapsack)](https://www.knapsack.cloud/blog/lessons-learned-from-working-on-carbon-for-ibm-com)
- [The power to serve · Shixie on Carbon (Medium)](https://medium.com/carbondesign/the-power-to-serve-fb84387deef8)
- [IBM Carbon overview · designsystems.surf](https://designsystems.surf/design-systems/ibm)
