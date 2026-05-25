# Salesforce Lightning Design System (SLDS) · Industry DS Reference

**Source:** [lightningdesignsystem.com](https://www.lightningdesignsystem.com/) · `developer.salesforce.com` LWC docs · `github.com/salesforce-ux/design-system`.
**Audited:** 2026-05-13 · for Ken Research DS gap analysis · methodology: WWWWH per `01_methodology.md`.

---

## WWWWH summary

### WHAT (essence)
SLDS is Salesforce's open-source design system powering the Salesforce platform (CRM, Service Cloud, Marketing Cloud, etc.). It centers on **framework-agnostic Component Blueprints** (semantic HTML + CSS + a11y attributes · no JS logic), a **BEM CSS class architecture** (`slds-button__icon--small` style), **utility classes** (`slds-m-left_medium`), and a **two-version strategy** — SLDS 1 (Sass design tokens) and SLDS 2 (CSS custom properties · "global styling hooks" · introduced Spring '25).

### WHY they exist (problem · adoption story)
- **Salesforce platform scale.** Millions of business users · admins · ISVs build apps on Salesforce. Every customer customizes — without a system, every org would look like a Frankenstein.
- **Implementation-agnostic by mandate.** Salesforce ships products in Aura, LWC (Lightning Web Components), legacy Visualforce, and now React (Lightning Design System for React). One CSS-only blueprint must work in all.
- **Accessibility-first because regulated industries are core customer base.** Healthcare, government, financial services on Salesforce → Section 508 / WCAG / ADA compliance non-negotiable. SLDS bakes a11y into blueprints rather than relying on devs.
- **AppExchange ISV ecosystem.** 7000+ third-party apps build on Salesforce. SLDS gives them a free-tier design language so their products look native.

### WHEN their approach fits ✅
- **Data-heavy enterprise app** (CRM, admin, dashboards w/ dense tables, modals, forms)
- Multi-framework reality (some teams on React · others on legacy frameworks · need shared visual layer)
- **Strict a11y compliance** (Section 508, WCAG 2.1 AA · regulated industry)
- ISV/plugin ecosystem where third parties build on your platform
- Brand vocabulary leans utilitarian (clarity > delight)

### WHEN NOT ❌
- **Marketing / brand expression sites.** SLDS is overtly product-utility. No animation library, no hero patterns, no cinematic anything.
- **Mobile-first consumer app.** SLDS is desktop-first (admins live in dense screens) · mobile patterns exist but secondary.
- **Single-framework shop.** SLDS's framework-agnosticism is overhead if you're React-only. You'll fight w/ CSS classes when you'd rather use React component composition.
- **Brand-locked tight palette.** SLDS 2 styling hooks are flexible but the SLDS look is recognizable — fully white-labeling fights the system.

### WHERE deployed (scale)
- **Salesforce platform** — Sales Cloud, Service Cloud, Marketing Cloud, Commerce Cloud, Experience Cloud (Communities), Salesforce Industries verticals
- **Lightning Experience** (the modern Salesforce UI shell · core CRM)
- **AppExchange** — 7000+ third-party apps · most consume SLDS classes/tokens
- **Trailhead** (Salesforce's learning platform · partially SLDS)
- ~5M+ daily users (Salesforce platform user count est.)
- Hundreds of customer org admins building internal apps on the platform

### HOW structured (folder + token format + doc method)
- **Repo:** `github.com/salesforce-ux/design-system` (CSS source) + `salesforce/design-system-react` (React impl) + LWC base components in Salesforce platform
- **Blueprint output:** raw HTML + CSS for every component · framework-agnostic · no JS
- **Token format:**
  - **SLDS 1:** Sass design tokens (`$brand-primary`, `$color-text-error`) compiled to CSS · also surfaced as platform `t()` function in Aura
  - **SLDS 2:** CSS custom properties · namespaced `--slds-*` · two tiers: global styling hooks (`--slds-g-*`) and component styling hooks (`--slds-c-*`)
- **CSS architecture:** BEM (Block-Element-Modifier) w/ Salesforce single-underscore variant (`slds-button__icon_small` instead of `slds-button__icon--small` · due to XML conflicts w/ double-hyphen)
- **Doc method:** every component page has Overview · Live blueprints (browser-renderable HTML) · Markup tabs (Aura, LWC, React) · Accessibility · Specs

---

## Token system deep dive

### SLDS 1 (legacy · still default in many Salesforce orgs)
- **Sass-based design tokens.** Compiled to platform `t()` function for Aura · also generated as CSS.
- Categories: `colorBackground*`, `colorText*`, `colorBorder*`, `colorBrand*`, `fontSize*`, `fontFamily*`, `lineHeight*`, `spacing*`, `sizing*`, `radius*`, `shadow*`, `zIndex*`.
- Examples: `colorBackgroundAlt` · `colorTextDefault` · `colorBrandPrimary` · `spacingMedium`.
- Sass mixins for theme overrides (high-contrast, dark variants).

### SLDS 2 (Spring '25 · new architecture)
- **CSS custom properties** replace Sass tokens · live-themable at runtime
- **Two-tier hooks:**
  - **Global styling hooks** (`--slds-g-*`) — system-wide. Examples: `--slds-g-color-brand-base-50` · `--slds-g-radius-border-1`. Identified by `-g-` in the name.
  - **Component styling hooks** (`--slds-c-*`) — per-component override. Example: `--slds-c-button-color-background` to recolor only a button's bg without touching others. (Note: per docs, `--slds-c-*` support is partial in beta.)
- **Numerical sets**: hooks come in sets w/ common base + numeric suffix incrementing from `1`. Example: `--slds-g-radius-border-1`, `--slds-g-radius-border-2`, `--slds-g-radius-border-3`.
- **Cosmos theme** — SLDS 2 default theme · refreshed look · more modern.

The SLDS 1→2 jump is the right direction for any DS born in Sass: move tokens to CSS custom properties so they're runtime-themable + composable w/ Shadow DOM (LWC uses Shadow DOM heavily).

---

## Component blueprints (the differentiator)

A blueprint is **framework-agnostic, accessible HTML + CSS that defines how a component looks and behaves visually · but ships no JS logic**.

Why this matters: Salesforce platform supports Aura · LWC · React · Visualforce. Each framework wraps the blueprint's HTML structure. The blueprint guarantees the visual layer · the framework adds behavior.

Example: `slds-button` blueprint defines:
```html
<button class="slds-button slds-button_brand">
  Submit
</button>
```
Then `slds-button` CSS handles padding, color, hover, focus, disabled. React wrapper adds onClick; LWC wrapper adds `@api` props; Aura wrapper adds attributes. All look identical.

For Ken — currently single-framework (React) — this overhead doesn't apply. But the **discipline of separating visual contract from behavioral wiring** is portable: define an atom's visual contract (CSS · tokens · structure) before adding React-specific props.

---

## BEM CSS architecture

- **Block:** `.slds-button` (high-level component)
- **Element:** `.slds-button__icon` (descendent within block)
- **Modifier:** `.slds-button_brand` (variant or state)

SLDS uses **single-underscore modifier syntax** (`_brand`) not double-hyphen (`--brand`) because XML and templating engines mangle double-hyphens.

Naming examples:
- `.slds-form-element` · `.slds-form-element__label` · `.slds-form-element__control` · `.slds-form-element_error`
- `.slds-modal` · `.slds-modal__container` · `.slds-modal__header` · `.slds-modal_large`
- `.slds-grid` · `.slds-grid_vertical` · `.slds-grid_align-center`

The naming is unambiguous + grep-able. You can `grep -r "slds-button"` and find every usage. Ken's Tailwind-utility approach loses this — but Ken's CSS modules / token-prop approach for `core-v2` can retain it via stable class prefixes.

---

## Utility classes

SLDS ships ~hundreds of utility classes covering:
- **Spacing:** `slds-m-top_medium`, `slds-p-around_x-small`, `slds-m-horizontal_large` (margin/padding × direction × size)
- **Grid:** `slds-grid`, `slds-col`, `slds-size_1-of-3`, `slds-grid_align-center`, `slds-grid_vertical-stretch`
- **Alignment:** `slds-text-align_center`, `slds-align-middle`, `slds-float_right`
- **Visibility:** `slds-show`, `slds-hide`, `slds-assistive-text` (screen-reader-only)
- **Truncation:** `slds-truncate`
- **Borders:** `slds-border_top`, `slds-border_right`

This is essentially a precursor to Tailwind w/ explicit naming. Verbose but predictable. The `slds-assistive-text` pattern (visually hidden but screen-reader-readable) is one Ken should adopt verbatim — it's the cleanest visually-hidden utility I've seen.

---

## Component documentation method

Every SLDS component page (e.g., [Data Tables](https://www.lightningdesignsystem.com/components/data-tables/) · [Button](https://www.lightningdesignsystem.com/components/buttons/) · [Modals](https://www.lightningdesignsystem.com/components/modals/)) follows:

1. **Overview** — essence · live demo · variant selector
2. **Examples** — every variant rendered in-page · code-toggle to view HTML/Aura/LWC/React
3. **Specs** — anatomy diagram · measurements · tokens used per region
4. **Accessibility** — keyboard interactions · ARIA roles/states · screen-reader announcements · WCAG criteria addressed
5. **Implementation** — framework-specific code (LWC base component name · Aura component name · React import)

Data Tables specifically is exhaustive — covers: basic · w/ row selection · w/ batch actions · inline edit · sortable · fixed header · resizable columns · w/ infinite scroll · empty state · loading state · row hover · row focus. Each variant ships as a complete blueprint w/ a11y notes.

**What's distinctive:** SLDS docs go deeper on **states** than most. Default · hover · focus · disabled · error · read-only · selected · indeterminate — each documented as a separate spec block, not crammed into one "states" list.

---

## Decision tree examples (use X when Y)

- **Button variants:** Neutral (default · low-emphasis · most uses) · Brand (primary action · 1 per view) · Outline-brand (alt to brand for layout) · Destructive (irreversible · w/ confirmation) · Success (confirmation actions) · Text (lowest emphasis · inline)
- **Notification:** Toast (transient · 3-8s · success/info) · Alert (persistent · in-page · warning/error) · Prompt (modal · requires action)
- **Form layout:** Stacked (default · label above input) · Horizontal (label left · for compact forms) · Inline (rare · auto-suggest)
- **Modal sizing:** Small (alerts, confirmations) · Medium (default forms) · Large (data tables in modal) · Full (immersive, edge-to-edge)
- **Data table variant:** Basic (read-only) · Editable (inline edit cells) · Selectable (row checkboxes) · Resizable (col widths user-controlled) — combinable

---

## Accessibility standards

This is SLDS's strongest dimension. Accessibility is treated as **definitional**, not as a layer on top.

- **WCAG 2.1 AA compliance · audited per component release.**
- **ARIA-first:** every blueprint includes correct `role`, `aria-*` attributes inline in the HTML example. Devs can't accidentally omit them.
- **Screen reader testing:** automated w/ axe; manual w/ JAWS, NVDA, VoiceOver. Documented per component.
- **Keyboard interactions:** every interactive component lists exact keys (Tab, Shift+Tab, Enter, Space, Esc, Arrows, Home, End, Page Up/Down for tables). Behavior documented per key.
- **Focus management:** modal focus-trap · return-focus on close · focus-visible distinct from focus.
- **`slds-assistive-text` utility** — the standard screen-reader-only class. Visually hidden but accessible.
- **Color contrast:** every brand color paired w/ tested foregrounds at 4.5:1.
- **Touch targets:** 44×44px minimum.
- **High-contrast mode:** components tested in Windows HCM · use system color keywords where appropriate.

For a CRM where blind users in call centers depend on screen readers for their job, this depth is non-negotiable. SLDS sets the bar.

---

## Motion philosophy

Honestly: **SLDS is the weakest of the three on motion.**

- A few easing curves and durations documented under `motion` tokens (`slds-motion-ease-in-out`, `slds-motion-duration-medium`).
- No spring physics · no choreography system · no animation library.
- Component transitions are minimal — fades, slides, expand/collapse for accordions and modals.

This is intentional: Salesforce is a workhorse CRM. Excessive motion would slow admins doing 200 ticket-touches a day. **Motion-restrained-on-purpose** is a valid design decision Ken should consider for the report-viewer surface (data + tables · motion should support not delight).

---

## Strengths (5 things Ken should learn)

1. **A11y-first as default · not layered.** Every blueprint ships w/ correct ARIA attributes inline. Devs literally cannot copy a button blueprint without the accessibility attrs. Ken should adopt this — every atom's `HOW` code example must include the a11y attrs verbatim in the snippet.
2. **`slds-assistive-text` utility class.** Visually hidden but screen-reader accessible. Ken should add this as a utility (or DS hook) — currently there's no standard "SR-only" helper documented.
3. **States as first-class spec sections.** Default, hover, focus, active, disabled, error, read-only, selected, indeterminate — each its own block in component spec, w/ visual + token + behavior. Ken's WWWWH methodology lists states; SLDS depth is the benchmark.
4. **CSS custom property hierarchy (Global + Component hooks).** `--slds-g-*` vs `--slds-c-*` — two-tier hook scheme means designers can override globally OR per-component without breaking. Ken should adopt the `-g-` / `-c-` naming convention.
5. **Per-state documentation for data-heavy components.** Data Tables ships specs for: row selection · batch actions · inline edit · sorting · pagination · empty · loading · resizable cols. Each documented separately. Ken's PDP / report-viewer will need a similar table — copy this depth.

---

## Weaknesses / overkill (3 things NOT to copy)

1. **Framework-agnostic blueprints.** Beautiful in theory · overhead in practice for a React-only shop. Ken doesn't need this layer · go straight from token + atom (React) to consumer.
2. **BEM with single-underscore.** SLDS adopted single-underscore because of XML conflicts — irrelevant to Ken's JSX context. If Ken adopts BEM-ish naming, use double-hyphen (industry standard). But honestly, with CSS modules + tokens, BEM is overhead.
3. **Restrained motion.** Right for Salesforce admin density · wrong for Ken's cinematic case-study surfaces. Ken needs motion as a brand differentiator — borrow SLDS a11y depth, not its motion austerity.

---

## Specific patterns Ken should adopt + why

| Pattern | Why | Where in Ken |
|---|---|---|
| **A11y attrs inline in every code example** | Devs copy-paste · attrs ship by default · no "I'll add ARIA later" drift | Update every WWWWH atom doc's HOW block to include `aria-*` attrs in the worked code |
| **`slds-assistive-text` (visually-hidden utility)** | Standard SR-only class · cleaner than ad-hoc `sr-only` reinventions | Add `.sr-only` / `--util-visually-hidden` mixin to `design-system/core-v2/styles/utilities.css` |
| **States as first-class spec sections per component** | Default/hover/focus/active/disabled/error/read-only/selected — each w/ visual + token + behavior | Audit existing WWWWH atom docs · expand "States" section to SLDS depth (currently a 1-line list) |
| **Global vs Component styling hook hierarchy (`-g-` / `-c-`)** | Two-tier override system · global theme + per-component escape hatch | Adopt `--ken-g-*` (global) and `--ken-c-*` (component) naming · refactor `tokens.css` accordingly |
| **Exhaustive state docs for data-heavy components** | Report viewer · PDP listing will need table-like UI · SLDS Data Tables is the reference | When building report-viewer surface, ship variants for: empty · loading · sorting · selection · row-hover · row-focus · expanded |
| **Keyboard interaction map per atom** | SLDS lists every key + behavior · catches Enter/Space/Arrow gaps early | Add "Keyboard map" subsection to every interactive atom WWWWH doc |
| **WCAG criteria cited per component (e.g., "addresses 2.5.5 Target Size")** | Forces designer to think compliance-per-decision · not "we'll audit later" | WWWWH "A11y rules" section · cite WCAG SC numbers verbatim |

---

## Sources

- [Lightning Design System 2 homepage](https://www.lightningdesignsystem.com/)
- [SLDS Data Tables (React)](https://react.lightningdesignsystem.com/components/data-tables/)
- [SLDS Styling Hooks · Salesforce Developers](https://developer.salesforce.com/docs/platform/lwc/guide/create-components-css-custom-properties.html)
- [SLDS Design Tokens · Salesforce Developers](https://developer.salesforce.com/docs/platform/lwc/guide/create-components-css-design-tokens.html)
- [Style with Lightning Design System · LWC Guide](https://developer.salesforce.com/docs/platform/lwc/guide/create-components-css-slds.html)
- [Compare SLDS 1 vs SLDS 2](https://developer.salesforce.com/docs/platform/lwc/guide/create-components-css-slds1-slds2.html)
- [Get Started w/ SLDS · Trailhead](https://trailhead.salesforce.com/content/learn/modules/lightning-design-system-development-for-designers/get-started-with-slds)
- [What is SLDS 2 · Salesforce blog](https://www.salesforce.com/blog/what-is-slds-2/)
- [SLDS 2 future-proof · Salesforce Ben](https://www.salesforceben.com/slds-2-beta-how-you-can-future-proof-your-salesforce-ui/)
- [SLDS GitHub source](https://github.com/salesforce-ux/design-system)
- [SLDS React impl](https://github.com/salesforce/design-system-react)
