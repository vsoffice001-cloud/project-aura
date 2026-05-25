# Adobe Spectrum · Industry Research

**Source URLs:**
- https://spectrum.adobe.com/
- https://spectrum.adobe.com/page/design-tokens/
- https://adobe.design/stories/design-for-scale/introducing-spectrum-2
- https://blog.logrocket.com/ux-design/spectrum-2-adobes-revamped-design-system/
- https://blog.adobe.com/en/publish/2023/12/12/adobe-unveils-spectrum-2-design-system-reimagining-user-experience-over-100-adobe-applications
- https://github.com/adobe/spectrum-design-data
- https://react-spectrum.adobe.com/
- https://spectrum.adobe.com/page/data-visualization-fundamentals/

Audit applied via WWWWH framework per `01_methodology.md`.

---

## 1 · WHAT

Adobe Spectrum is the in-house design system that unifies experience across 100+ Adobe applications spanning Creative Cloud (Photoshop, Illustrator, Premiere, Express), Document Cloud (Acrobat), and Experience Cloud (Analytics, Target, Marketo). It is a multi-platform system delivering tokens, components, and patterns for web, macOS, Windows, iOS, Android, and emerging mixed-reality surfaces. The current generation — **Spectrum 2** — shipped publicly in late 2023 and reframes the system around three pillars: feel-at-home (platform-native conventions), accessibility-first, and joyful (not just functional).

The system is delivered as: (1) the canonical design language site at `spectrum.adobe.com`, (2) `react-spectrum` (React + React Aria primitives), (3) `spectrum-web-components` (W3C custom elements), (4) `spectrum-css` (raw CSS reference), and (5) `spectrum-design-data` (token + component schemas published as machine-readable JSON for cross-tool consumption).

---

## 2 · WHY (problem it solves)

- Adobe ships hundreds of apps across decades-spanning codebases (Photoshop = 1990, Express = 2020s). Without a unifying system, every product re-invents Button, Slider, and Color Picker — each subtly different. Spectrum is the contract that ensures a Premiere user opening Illustrator feels continuity.
- Creative apps are data-heavy and density-critical (timeline panels, color pickers, layer trees, properties inspectors w/ 50+ controls per screen). Spectrum defines density modes (compact, regular, spacious) and t-shirt sizes baked into tokens so creative-tool teams aren't forced into marketing-page sizing.
- Cross-platform consistency was over-corrected in Spectrum 1 (everything looked "Adobe-flat" everywhere). Spectrum 2 explicitly walks that back — platform variants are now allowed and encouraged so a macOS app feels macOS and a Windows app feels Windows.
- Accessibility is industrial-scale: any change must pass WCAG audits across 100+ apps. Spectrum bakes a11y into primitives (via React Aria) so consuming teams can't accidentally drift below the floor.
- Adobe needs to feed tokens into Figma plugins, code, marketing sites, AND design tools simultaneously. Hence DTCG-compatible token files published as data (`spectrum-design-data` repo) rather than just CSS.

---

## 3 · WHEN (Ken should reference Spectrum)

- When designing **data-heavy surfaces** (report viewer, analytics dashboard, large catalog tables) — Spectrum's table virtualization + density modes are gold.
- When defining **token tiers** at scale — Spectrum demonstrates global → alias → component naming conventions that survive cross-platform export.
- When planning **multi-surface variants** of one brand (Ken cinematic dark vs editorial light is analogous to Spectrum's platform variants).
- When auditing **color contrast at scale** — Adobe's adaptive palette method (perceptual lightness + WCAG-bonded steps) is the reference.
- When building **density modes** for power-user surfaces (Aura's report viewer + future internal analyst tools).

---

## 4 · WHEN NOT (don't import wholesale)

- Spectrum is **enterprise-creative-tool grade** — its density, control variety, and chrome are wrong for Ken's consumer-marketing surfaces. Use Tailwind UI / shadcn aesthetics for case studies + report-store, not Spectrum.
- Spectrum's **visual language** (Adobe Clean font, blue accents, geometric icons) is Adobe-owned brand — never copy the look, only the structure.
- Spectrum is heavyweight — `react-spectrum` ships substantial JS. Ken's consumer pages should not pull in Spectrum runtime; use it as a reference architecture only.

---

## 5 · WHERE (concrete reference points)

- **Tokens (the gold standard):** `spectrum.adobe.com/page/design-tokens/` and `github.com/adobe/spectrum-design-data/tree/main/packages/tokens` — DTCG-aligned JSON
- **Table component** (large-data reference): `spectrum.adobe.com/page/table/`, `react-spectrum.adobe.com/react-spectrum/TableView.html`
- **Data visualization fundamentals:** `spectrum.adobe.com/page/data-visualization-fundamentals/`
- **Big number** (KPI atom — Ken needs equivalent for report-store): `spectrum.adobe.com/page/big-number/`
- **React Aria primitives** (a11y substrate underneath Spectrum, MIT-licensed and reusable directly): `react-spectrum.adobe.com/react-aria/`

---

## 6 · HOW (architectural patterns)

### Token tier architecture
Spectrum uses a strict 3-tier model:

1. **Global tokens** — raw values, brand-neutral. Example: `--spectrum-blue-700: #0265dc;`
2. **Alias tokens** — semantic intent referencing globals. Example: `--spectrum-accent-color-default: var(--spectrum-blue-900);`
3. **Component tokens** — locked to component context. Example: `--spectrum-button-primary-background-color-default: var(--spectrum-accent-color-default);`

The chain enforces that a designer changing the brand accent in one place propagates to every component automatically. Component-level tokens isolate breakage — a Button restyle never touches Slider tokens.

### Scale / density
Spectrum exposes t-shirt sizes (`s`, `m`, `l`, `xl`) tied to token scales. Components consume `--spectrum-component-height-100/200/300/400` rather than hard-coded heights. Density mode swaps which scale row is active, so the same JSX renders compact in Photoshop and roomy in Express.

### Platform variants
Each component has platform overrides driven by `data-platform="desktop|mobile|touch"` on a root provider. Hit targets grow to 44px on touch automatically. macOS gets system-blue focus rings; Windows gets Fluent-aligned scrollbars.

### Data visualization
A separate package (`react-spectrum-charts`) layers declarative React on top of Vega-Lite. Chart tokens (axis stroke, gridline, label color) inherit from the same global tier as buttons — so a brand color change ripples through dashboards. Spectrum's `Big Number` atom standardizes the headline-stat pattern (value, label, delta indicator, trend sparkline).

```tsx
// Reference pattern (NOT for Ken consumption — illustrates intent)
<Provider theme={defaultTheme} colorScheme="dark" scale="medium">
  <TableView density="compact" overflowMode="truncate" selectionMode="multiple">
    <TableHeader>{columns.map(c => <Column key={c.id}>{c.label}</Column>)}</TableHeader>
    <TableBody items={rows}>{row => (
      <Row>{columnKey => <Cell>{row[columnKey]}</Cell>}</Row>
    )}</TableBody>
  </TableView>
</Provider>
```

---

## 7 · Tokens (deeper)

- **Color tokens** use perceptual lightness rather than hex math — Spectrum 2 adopted OKLCH-style intent for adaptive palettes that maintain contrast in light + dark + high-contrast modes.
- **Typography** uses Adobe Clean (proprietary) with sizing scale `t-shirt-S/M/L/XL` and line-height ratio tokens, not pixel values, so localization (e.g. Japanese / Arabic) can override the ratio without breaking layout.
- **Motion tokens** standardize durations (`--spectrum-animation-duration-100..1000`) and easing curves named by intent (`--spectrum-animation-ease-in-out`).
- **Spacing** is on a 4px base grid w/ named tokens (`size-50` = 4px, `size-100` = 8px, etc) — avoids raw pixel literals.
- Tokens are published as **DTCG-format JSON** so Figma Tokens, Style Dictionary, and custom build tools can all consume the same source. Mirrors Ken's Style Dictionary v4 setup already in `design-system/tokens/`.

---

## 8 · Component documentation method

Each Spectrum component page contains: WHAT (overview) · anatomy diagram · options matrix · states table · accessibility checklist · behavior spec · responsive rules · localization notes · API reference · changelog. Anatomy diagrams are first-class — every part is labeled (e.g., Button has `container`, `label`, `icon`, `focus-indicator`) and those labels match the token names. This bidirectional naming is one of the strongest patterns Ken should steal.

---

## 9 · Decision trees

Spectrum publishes explicit decision trees for ambiguous cases: "Should I use a Toast or a Dialog?", "Should I use a Picker or a Combo Box?". Each tree asks 3-5 questions and lands on one component, with anti-pattern callouts. This converts "what do I use" from designer judgment into a deterministic flow — critical at 100+ apps where consistency is harder than choice.

---

## 10 · Accessibility

- All interactive components built on **React Aria** (Adobe's open-source a11y hook library, MIT) — used by Spectrum but also adoptable independently. Handles ARIA roles, keyboard, focus, screen reader announcements.
- Every component documents keyboard map (Tab, Arrow, Enter, Escape, Space) and announcement strings.
- Color contrast verified against WCAG 2.1 AA at minimum, AAA where feasible.
- High-contrast mode is a first-class color scheme alongside light/dark.
- Touch targets enforced at 44×44px minimum on touch platforms (auto-promoted via density).
- RTL is built-in across all spatial tokens.

---

## 11 · Motion

Spectrum 2 added expressive but disciplined motion as a "joyful" principle. Motion is tokenized by intent (e.g., `--spectrum-animation-ease-out-snappy` for confirmations, `--spectrum-animation-ease-in-out-gentle` for transitions). Reduced-motion is honored at the DS layer — components disable transitions on `prefers-reduced-motion: reduce`. Motion is sparing in productivity surfaces (Photoshop) and richer in marketing surfaces (Adobe.com) using the same tokens — context controls intensity, not redefinition.

---

## 12 · Strengths

1. Token tier discipline (global / alias / component) — bulletproof against drift at 100+ apps.
2. Token data as DTCG JSON — toolchain-agnostic, future-proof.
3. React Aria substrate — separates a11y/behavior from styling cleanly.
4. Density + platform variants — proves one DS can serve dense pro tools AND marketing surfaces.
5. Decision trees + anatomy diagrams — turn judgment into deterministic flow.
6. Big-number, table virtualization, color picker, slider patterns — best-in-class for data-heavy surfaces.
7. Public release cadence + governance model documented openly.

---

## 13 · Weaknesses

1. Heavyweight — `react-spectrum` runtime is large; not appropriate for marketing pages.
2. Visual language is Adobe-locked (Clean font, blue accents, geometric icons) — useless visually outside Adobe.
3. Documentation lives across 4 separate sites (spectrum, react-spectrum, react-aria, spectrum-web-components) — discoverability suffers.
4. Component customization beyond tokens is hard — overriding internal layout requires forking primitives.
5. Theming beyond light/dark/high-contrast is constrained — full brand re-skinning is non-trivial.
6. Onboarding cost is high — designers need weeks to internalize the system before producing on-spec work.

---

## 14 · Ken-adopt list (prioritized)

1. **Token tier discipline** (global → alias → component) — already partially in place via Style Dictionary; tighten naming so component tokens reference alias tokens reference globals, never skipping a tier. HIGH.
2. **Anatomy diagrams in every atom doc** — label every part of Button / Card / Input and align with token names (`--button-container-bg`, `--button-label-color`). HIGH for the audit project.
3. **Decision trees per ambiguity** — Ken already has "use Button vs CTALink vs TextLink" pointers in WWWWH docs; promote these to explicit 3-question flowcharts on a hub page. MEDIUM.
4. **DTCG JSON token export** — make sure `design-system/tokens/` outputs DTCG-format JSON alongside CSS so Figma + future tooling can consume one source. MEDIUM (already mostly true via Style Dictionary v4).
5. **Big Number atom** — Ken's report-store needs this for sample-pages stats, ARR-impact callouts, etc. Spectrum's pattern (value + label + delta + sparkline) is reusable. ADD to Ken DS.
6. **Density modes** — for the eventual analyst-facing internal dashboard, plan density swap at provider level rather than per-component prop. LOW (future).
7. **React Aria substrate awareness** — when Ken needs a complex component Radix doesn't ship (Color Picker, DateRangePicker), use React Aria hooks directly instead of building from scratch. MEDIUM.
8. **Reduced-motion as DS-layer concern** — already true in Ken DS via `useReducedMotion`; reaffirm with Spectrum as precedent.
9. **Adaptive contrast in dark mode** — Spectrum's perceptual lightness method is a future upgrade path for Ken's cinematic-dark variant (currently hex-tuned). LOW.

---

**Net read for Ken:** Spectrum is the architectural reference for scale, tokens, and a11y. Steal the structure, never the look. Specifically: tier discipline, anatomy labeling, decision trees, DTCG export.
