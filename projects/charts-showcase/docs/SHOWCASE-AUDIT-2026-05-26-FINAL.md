# Showcase UI/UX Final Audit · 2026-05-26 · Post Sprint E

## Summary
- Sprint state: A–E complete · 21 demos · 3-pane layout (240 | flex | 320) · DS Button dogfood · CSS vars · pill+href
- Audit goal: surface remaining UI/UX gaps before "v1.0" call
- Audited at: localhost:3070 · Playwright headless · DOM probe + source read
- Total findings: 2 P0 · 7 P1 · 5 P2
- Console errors: 0

---

## Per-surface findings

### Top bar

- **PASS** sticky 56px, backdrop-blur 8px, border-bottom hairline — clean
- **P0** Viewport switcher buttons (1440 / 1024 / 390) render at 23×33px, A11y at 21×33px, Motion at 36×33px — all below 44×44px WCAG touch target min. The `size="xs"` DS Button (`h-7` = 28px) + narrow content = fail. Source: `ShowcaseTopBar.tsx` via `IconBtn` → `Button size="xs"`.
- **P1** `ariaPressed` prop on `IconBtn` is accepted by the wrapper but DS `Button.tsx` has no `aria-pressed` in its props interface and does NOT forward it to the underlying `<button>`. Toggle state (active viewport / a11y on / motion mode) is visually communicated by variant change (ghost → secondary) but NOT announced to screen readers via `aria-pressed`. Source: `Button.tsx` L83 — `ariaPressed` missing from interface. `ShowcaseTopBar.tsx` passes `ariaPressed` to `IconBtn` which accepts it as a declared-but-unused prop (`ButtonProps` has no `ariaPressed`).
- **P1** Motion toggle label (`System` / `Off` / `On`) is terse — a11y users relying on `aria-label` get the full `MOTION_ARIA` string (good), but sighted users see only `System` / `Off` / `On` with no tooltip. The full context (`Toggle reduced motion`) only appears in aria-label. `title` prop is accepted by `IconBtn` but NOT forwarded by DS `Button`. No tooltip rendered.
- **P2** Search input hit-area height = 34px (`h-[34px]`) — 10px below 44px target. OK for desktop-only tool, but worth flagging.
- **P2** "Chart Library" label + version badge (`v0.1.0`) both hidden below `sm` breakpoint — at 390 only "Ken Research" shows. Combined with "/" separator still showing at sm, feels truncated at 390.

### Sidebar

- **PASS** 240px fixed width, sticky top:56px, overflow-y:auto, border-right hairline, `aria-label="Sidebar navigation"` — structural baseline clean.
- **P0** Category headings (`Primitives`, `Charts`, `Tables`, `States`) are NOT actual headings — they are `<div> > <span>` with `fontSize: 9px, fontWeight: 700, uppercase`. DOM probe shows `allCategories: []` because no `h2/h3/[class*="category"]` found inside the sidebar. Screen readers get no hierarchy; all 21 links appear flat in the landmark. Source: `ShowcaseSidebar.tsx` `CategoryHeader` component — should be `<h3>` or at minimum `role="heading" aria-level="3"`.
- **P1** Demo links have no `aria-label` (probe confirms `ariaLabel: null` on all 21). The link text IS the component name (accessible name = text = fine for sighted users), but the link goes to `#primitive-chartfigure` — no description of what it links to. Minor but worth a descriptive `aria-label` like `"Go to ChartFigure demo"`.
- **P1** Filter checkboxes at sidebar bottom have `aria-label="Show {meta.label} demos"` (good) but touch targets = 13×13px for the `<input type="checkbox">`. The `<label>` wrapping element has 4px vertical padding which grows hit area to ~21px — still below 44px. On mobile drawer this matters.
- **P1** "Copy" buttons inside `CodeSnippet` (rendered in the right panel) appear in the `aside` DOM before the script initialises them — they show `w-0 h-0` in the probe (the Playwright `clickHandler.click()` timed out on "Copy"). This is because at 1440 the right panel renders but CodeSnippet sections are closed (`defaultOpen=false`). Non-blocking but audit note: Code/Import/Example sections default closed means key copy affordance is hidden behind expand.
- **P2** Sidebar `@kenresearch/design-system` / `charts barrel · v0.1.0` label block at top has `fontSize: 10px` muted text with no visual separation weight — blends into first category label. Needs slightly stronger separator or color differentiation.

### Content pane · per demo

- **PASS** All 21 demo sections render with correct IDs (`primitive-*`, `chart-*`, `table-*`, `state-*`). `aria-labelledby={demo-title-${demo.id}}` on each `<section>` is correct.
- **PASS** bg alternation: even=white, odd=warm wash — confirmed in probe data. Working correctly.
- **PASS** Card spacing: 24px padding, 48px margin-bottom, 8px border-radius, 1px border. Rhythm is clean.
- **P1** All heading levels use `fontWeight: 300` (light) at every level: H1 40px/300, H2 24px/300, H3 20px/300. No weight contrast between levels — differentiation relies entirely on size. Chart title H3s (e.g. "Revenue by period · AUD Mn") appear at 19px/300 = almost identical weight and nearly-same size as demo-name H3s (20px/300). Two H3s at 19–20px same weight = no hierarchy.
- **P1** Category badge + demo H3 on same line (`flex items-center gap-3 flex-wrap`) — at narrow viewports (390px, main col = ~350px) they wrap to next line but the H3 appears as the second item AFTER the badge, which is correct DOM order but visually feels disconnected. Badge floats alone on line 1 with no H3 companion.
- **P1** `StateDemo` tabs (Normal / Loading / Empty / Error) use `aria-pressed` on DS `Button` — but as noted above DS Button does NOT forward `aria-pressed`. Screen readers get no state announcement on tab switch. These are acting as tabs (only one active at a time) so correct pattern would be `role="tablist"` + `role="tab"` + `aria-selected`. Using `aria-pressed` suggests toggle (independent), not tab (exclusive).
- **P2** `DemoCanvas` uses `details[open] > summary span[aria-hidden]` CSS rotation for the arrow chevron (in `ShowcaseRightPanel` `PanelSection`). The arrow `▾` is a Unicode character not an SVG — rotation is fine but no transition on it (no CSS `transition` on the `transform`). Instant snap vs smooth transitions elsewhere.
- **P2** `KenTreemap` and `KenHeatmap` demo cards are the tallest (870–904px). No sticky "Jump to top of section" affordance — user must scroll back ~9000px. Minor UX miss at this page length (16,334px total scroll height).

### Right panel

- **P1** DOM probe: `rightPanel.bbox = { x:0, y:56, width:240 }` — the selector hit the SIDEBAR (first `aside` in DOM), not the right panel. Right panel's `aria-label="Component inspector"` is not matched by `aside[aria-label*="inspector"]` because the CSS `display: none` at <1024px causes Playwright to query it but it resolves the visible sidebar first. The right panel's CSS is correct (`display:block` at ≥1024px per globals.css) but the Playwright context was 1440 so this should have been visible. Likely because the `aside[aria-label]` querySelector returns the first `aside` in DOM order (sidebar), not the second. Bug in my audit probe selector — not a product bug. However...
- **P1** Right panel `background: '#ffffff'` is hardcoded while sidebar uses `var(--semantic-bg-page, #f5f2f1)`. On dark-mode system OS setting this creates a white flash vs warm-wash discrepancy. Minor but inconsistent — should use `var(--semantic-bg-surface, #fff)` or a token.
- **P1** `PanelSection` uses `<details>/<summary>` for collapse. `summary` has `listStyle: none` (correctly set in globals.css) but the expand/collapse arrow is `▾` (Unicode text) not SVG. No `title` or ARIA label on `<summary>` — the collapsible region has no `aria-expanded` analog (details/summary provides this natively, so it IS accessible, but the visible toggle indicator text `▾` has no transition animation — contrasts with the shimmer/motion polish elsewhere).
- **P2** Panel section "DS Tokens used" — when `tokensUsed` array is populated shows token name + usage + category. When empty, shows 7 hardcoded common tokens as `<code>`. This fallback is visually identical to the populated state but contextually meaningless (shows generic tokens regardless of active demo). Aura call on whether to remove fallback and show "No specific tokens documented for this component" instead.

### Cross-cutting

- **P1** DS `Button` `ariaPressed` prop missing from interface — see P0/P1 above. Affects: top-bar viewport switcher (3 buttons), a11y toggle (1), motion toggle (1), all VariantToggle buttons (all demos), all StateDemo tabs (all demos w/ stateDemos). Total: ~80+ button instances have declared but un-forwarded `aria-pressed`. Architectural: needs 1-line fix in `Button.tsx` + `ButtonProps` interface.
- **P1** All control buttons (VariantToggle + surface "light"/"dark" + state tabs + compare toggle) have `height: 20px` (h-7 = 28px is the DS xs Button but DOM reports 20px). This suggests the DS Button `xs` size (`px-2.5 h-7`) is not being applied — likely because the `pill` prop or consumer `className` is overriding. Every single control button in every demo card = 20px height = below WCAG 44px minimum. Source: `DemoCanvas.tsx` `Button size="xs" pill` + `VariantToggle.tsx` `Button size="xs" pill`.
- **P2** `pre[aria-label="Code example"]` on CodeSnippet — `aria-label` on a `<pre>` element with no role is invalid per ARIA spec (labellable elements). Should be `role="region" aria-label="Code example"` or wrap in a `<figure>`.
- **P2** No skip-link. Keyboard users at localhost must tab through 56px top bar (6 buttons + 1 input = 7 tabs) then 21 sidebar links (21 tabs) before reaching content. 28 tabs to first demo heading = violation of Keyboard Navigation best practice. A "Skip to main content" link needed.
- **P2** `ShowcaseSidebar` mobile drawer has no focus trap. `role="dialog" aria-modal="true"` is declared but without focus trap implementation, keyboard users can Tab out of the drawer into the background content (which is still in DOM behind backdrop). `inert` attribute on background or a `FocusTrap` component needed.

---

## P0 fixes (block "polished" state · ~2–3 hr)

1. **Touch targets — top-bar IconBtns** · `ShowcaseTopBar.tsx` · Minimum 44×44px hit area. Options: (a) wrap `Button size="xs"` in a transparent 44×44px wrapper `div` with `position:relative` + `::before` pseudo extending hit area, or (b) switch to `size="sm"` (36px) + explicit `min-w-[44px] min-h-[44px]` on container. Affects: 3 viewport switcher btns + A11y btn + Motion btn = 5 buttons.
2. **Sidebar category headings** · `ShowcaseSidebar.tsx` `CategoryHeader` · Change `<div>/<span>` to `<h3 className="..." role="heading" aria-level="3">` or use `<h3>` natively. Screen reader navigation by heading will then expose the 4 category groups.

## P1 polish (worth doing · ~4–6 hr)

1. **DS Button `aria-pressed` forward** · `design-system/core-v2/src/atoms/Button.tsx` · Add `ariaPressed?: boolean` to `ButtonProps` + pass `aria-pressed={ariaPressed}` to underlying `<button>`. 2 lines. Unlocks correct screen-reader state for ALL toggle buttons across showcase.
2. **StateDemo semantics** · `StateDemo.tsx` · Replace `aria-pressed` tab buttons with proper `role="tablist"` + `role="tab"` + `aria-selected` + `aria-controls` pattern. Standard tab pattern, ~20 line change.
3. **Heading weight hierarchy** · `DemoCanvas.tsx` + `ShowcaseContent.tsx` · H2 section headers (Primitives/Charts/Tables) need `fontWeight: 500 or 600` to differentiate from H3 demo titles at 300. Consider: H1=300, H2=500, H3=400, chart-title H3=300. Adds visual rhythm without brand drift.
4. **Right panel background** · `ShowcaseRightPanel.tsx` · Change `background: '#ffffff'` to `var(--semantic-bg-surface, #ffffff)` for token consistency.
5. **Details/summary arrow transition** · `globals.css` · Add `transition: transform 0.2s ease` on `details > summary span[aria-hidden]:last-child`. 1 line.
6. **Skip-link** · `ShowcaseLayout.tsx` or `layout.tsx` · Add visually-hidden `<a href="#main-content" className="sr-only focus:not-sr-only ...">Skip to content</a>` as first DOM child. Standard pattern.
7. **Mobile drawer focus trap** · `ShowcaseSidebar.tsx` · Add `inert` attribute to background content when drawer open, or install `focus-trap-react`. Prevents keyboard escape from drawer.

## P2 nice-to-have (defer)

1. `pre[aria-label]` → wrap in `<figure>` or add `role="region"` — CodeSnippet.tsx
2. Sidebar package label visual separation — add `fontWeight: 500` or slightly darker color to `@kenresearch/design-system` identity label
3. DS Tokens fallback in RightPanel — remove generic fallback, show "No specific tokens documented" instead
4. `title` tooltip forwarding on DS Button (needs Button interface change) — so TopBar controls get native tooltip on hover
5. Long-page scroll navigation — "Back to top" button appears after scrollY > 600px (standard pattern)

---

## Recommendations for Sprint F

- **Fix P0s first**: touch targets + sidebar headings. Both are a11y blockers.
- **DS Button `aria-pressed` fix**: single prop addition in core-v2 unlocks correct ARIA state for every toggle button in showcase AND future consumers. Zero-risk change.
- **StateDemo tab pattern**: re-pattern before v1.0. Using `aria-pressed` on tabs is technically wrong even if visual behavior is correct.
- **Heading hierarchy weight**: quick win — makes the page scan dramatically better at a glance.
- **Skip-link**: single `<a>` element, ~5 min. Blocks keyboard-only users today.

---

## What is already solid (do not break)

- 3-pane grid layout is clean and responsive — mobile drawer, tablet 2-col, desktop 3-col all work
- Card bg alternation (even=white / odd=warm wash) correctly resets per-category — nice visual rhythm
- `aria-label="Chart library navigation"` on sidebar `<nav>` — landmark is correct
- `aria-current="location"` on active sidebar link — correct pattern, fires correctly via IntersectionObserver
- Hash navigation (URL sync + scroll-to on mount) — works correctly
- Top-bar search `/` shortcut + clear button — delightful, keyboard-correct
- A11y overlay feature is unique and genuinely useful — green/yellow badge coloring is clear
- Console: 0 errors, 0 warnings — clean runtime
- 0 overflow issues, 0 images missing alt text
- DS Button dogfood throughout (`variant`, `pill`, `size`, `ariaLabel`, `icon`) — good pattern

---

*Audit captured at: `projects/charts-showcase/qa-screenshots/showcase-audit-2026-05-26/`*
*DOM probe: `showcase-dom-probe.json` · Console: `console-output.txt`*
*Screenshots: 29 files (21 demos + 3 viewports + 5 close-ups)*
