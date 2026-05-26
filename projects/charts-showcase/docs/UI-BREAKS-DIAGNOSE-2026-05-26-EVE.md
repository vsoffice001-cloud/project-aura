# UI Breaks Diagnose · 2026-05-26 EVE · post tables-color fix

## Observed breaks

### 1. Row dividers TOO DARK
**Status: REFUTED for RankingTable · CONFIRMED for primitive-tableshell demo**

RankingTable `#table-ranking`:
- `tbody tr` borderBottom = `1px solid rgba(0,0,0,0.08)` ✓ — CORRECT hairline
- `thead tr` borderBottom = `1px solid rgba(0,0,0,0.08)` ✓ — CORRECT (scoped style applies 2px on sticky only)
- `th` borderBottom (via scoped style) = `2px solid rgba(0,0,0,0.12)` — this is the sticky header signal, expected

**Pure black row borders confirmed in `#primitive-tableshell`** (the TableShell primitives demo section):
- 4× `<TR>` rows with `border-bottom: 1px solid rgb(0,0,0)` — full opacity black
- Those TRs have no className (bare rows — likely the demo uses a `<table>` inside the TableShell demo that pre-dates the scoped-style injection, OR is a hand-written demo table that doesn't have Tailwind classes applied)
- Also one TR in `#table-property` (PropertyTable) with `border-bottom: 1px solid rgb(0,0,0)` · firstTdText: "Melbourne, VIC"

### 2. Score bars not rendering · only numbers visible
**Status: REFUTED — score bars ARE rendering**

DOM probe in `#table-ranking`:
- `nonFigureRoleImgCount: 14` — 14 score bar divs found (7 rows × 2 score bars each = 14 ✓)
- Sample ScoreBar: `aria-label="Score 9.2 of 10"` · `width: 33.1719px` · `height: 6px`
- Track bg: `rgba(148, 136, 236, 0.15)` (correct — KEN_CHART_SERIES.primary at 15% opacity = `#9488ec26`)
- Fill child: `background: linear-gradient(90deg, rgb(195,198,249) 0%, rgb(148,136,236) 60%, rgb(112,117,200) 100%)` · `width: 30.5156px` (=92% of track)
- **Score bars are in DOM and have correct gradient**

Possible visual confusion: `ScoreBar` container is `flex items-center gap-2 min-w-[80px]` — the outer `<td>` cell has `min-w-[110px]` Tailwind but the ScoreBar track div only gets `flex-1` width. If the TD is collapsing, the bar could be visually tiny (33px wide for a 110px column). This is a density/layout issue not a render failure.

### 3. Rank circle bg invisible
**Status: CONFIRMED — circle is collapsing to 3×18px (not 24×24)**

Measured: `computedWidth: 3.4375px · computedHeight: 17.5938px`
Expected: `w-6 h-6` = 24×24px (Tailwind rem-based)

Root cause: the `<td>` containing the circle has `py-2.5 pr-4` but no `pl-*` (no left padding). The TableShell scoped style injects `padding: 8px 12px` (standard density) but Tailwind `py-2.5 pr-4` on the `<td>` wins over the scoped style for td padding. The `<span>` inside has `w-6 h-6` Tailwind classes but those Tailwind classes may NOT be compiled because `core-v2/src/` is not in Tailwind v4 `@source` scan for this consumer. Result: `w-6` defaults to `width: auto` → collapses to content width (the rank number text ≈ "1" = 3.4px wide).

**Alternatively:** `w-6 h-6` = `1.5rem × 1.5rem`. At 16px base = 24×24px. The computed value 3.4px × 17.6px is not 24×24 — Tailwind classes on DS atoms not compiling in consumer.

### 4. Variant toggle · Comfortable button shows RED text
**Status: PARTIALLY CONFIRMED · mechanism identified, active state wrong**

DOM probe (ranking section variant toggle only has state buttons: Normal/Loading/Empty/Error).
The density toggle with Comfortable/Standard/Compact/Spacious is rendered BELOW the viewport in a separate group (not inside `#table-ranking` section's `[role=tablist]`).

From full-page button scan — `Comfortable` button: `color: rgb(0,0,0)` · `ariaPressed: "true"` · `bg: rgba(0,0,0,0)` — the ACTIVE state. Active = `variant="primary"` in VariantToggle. Primary button has:
- `variantClass` = `text-[var(--color-foundation-white)]` (Tailwind arbitrary)
- `variantInlineStyle` = `backgroundImage: var(--composition-gradient-brand-dark-shimmer)`
- Computed: `bg: rgba(0,0,0,0)` (gradient, not bg-color) · `backgroundImage: linear-gradient(...)` (gradient IS present) · **`color: rgb(0,0,0)` (black, NOT white)**

The `text-[var(--color-foundation-white)]` Tailwind class is NOT compiling — same Tailwind v4 scan miss as rank circle. So `--color-foundation-white` resolves to the token value but the Tailwind utility class itself is never emitted in the CSS. Text falls back to inherited body color = `rgb(0,0,0)` black. The gradient BG is dark (#141016 ≈ near-black), so black text on very dark gradient = effectively invisible/near-black on near-black, or at small viewport angles could read as red if the gradient has reddish midpoint.

Secondary hover shows `color: var(--brand-red)` = `rgb(176,31,36)` — this is the secondary 2-state hover. If user saw RED text on Comfortable, it may be: (a) secondary button hover state (before clicking), OR (b) the active/primary state on a different showcase that uses `background="dark"` prop.

### 5. Inverted header variant still rendering wrong color
**Status: CONFIRMED PARTIALLY**

Inverted header: `TableShell` uses `KEN_TABLE.headerInverted = 'rgba(0,0,0,0.85)'` but docs/inverted comment says `rgb(91,79,207)`. The scoped style injects `color: #ffffff` for inverted. The concern is whether the injected white color wins. Given the Tailwind v4 scan issue: the `<style>` tag injection (not Tailwind) SHOULD win since it's a real `<style>` element, not Tailwind utility class. Header color should be white for inverted. **Probe did not capture inverted state directly** — screenshot taken but not probed. Investigation incomplete for this item.

### 6. Pure black horizontal line · source identified
**Status: CONFIRMED · `#primitive-tableshell` section**

Source: rows inside `#primitive-tableshell` demo section. These are bare `<TR>` elements with no className. The TableShell scoped style only targets `[data-tableshell-id="X"] tbody tr` via the instanceId selector. If the demo inside `#primitive-tableshell` uses a raw `<table>` (not wrapped in TableShell), or uses TableShell but the demo data rows don't inherit the Tailwind `border-[rgba(0,0,0,0.08)]` class, the browser default table row border fallback fires as `1px solid rgb(0,0,0)`.

Also hit in `#table-property` (PropertyTable) · "Melbourne, VIC" row = TR with `border-bottom: 1px solid rgb(0,0,0)`.

### 7. Card wrapper right-edge clip
**Status: INCONCLUSIVE · screenshot too small (718 bytes)**

TableShell wrapper: `border: 1px solid rgb(208, 203, 232)` · `borderRadius: 10px` · `overflow: auto`. The `overflow: auto` on the card wrapper combined with `overflowX: auto` (scrollX=true default) could cause the rounded corner clipping to be incomplete — if the table content is wider than the wrapper, horizontal scroll appears and the right border-radius loses its visual clip. Card bbox: `w: 700px`. Table: `w: 698px`. Both have `borderCollapse: collapse` with `width: 100%`. There should be no overflow. **Needs visual verification from screenshot but the screenshot captured was essentially empty (wrapper edge outside viewport).**

---

## DOM probe summary

| Signal | Measured value | Expected | Status |
|---|---|---|---|
| RankingTable row divider | `1px solid rgba(0,0,0,0.08)` | `0.08` hairline | PASS |
| ScoreBar count in table DOM | 14 (7 rows × 2) | 14 | PASS |
| ScoreBar track bg | `rgba(148,136,236,0.15)` | `#9488ec26` | PASS |
| ScoreBar fill | gradient 92% width | proportional | PASS |
| Rank circle computed size | `3.4 × 17.6px` | `24 × 24px` | FAIL |
| Rank circle bg | `rgba(0,0,0,0.08)` (correct) | correct | PASS |
| Active button text color | `rgb(0,0,0)` | white `rgb(255,255,255)` | FAIL |
| Active button bg-image | dark gradient present | gradient | PASS (gradient renders) |
| Black border source | `#primitive-tableshell` + `#table-property` TRs | 0.08 alpha | FAIL |
| Wrapper card border | `1px solid rgb(208,203,232)` periwinkle | correct | PASS |

---

## Root cause (per break)

1. **Row dividers dark** — FALSE ALARM for RankingTable. Real breaks are in `#primitive-tableshell` demo + `#table-property`: bare `<TR>` rows without Tailwind `border-b border-[rgba(0,0,0,0.08)]` classes → browser default `1px solid black` fires. Both these demos use rows that either predate the scoped-style fix or use a different table pattern.

2. **Score bars not rendering** — CONFIRMED WORKING. Score bars render at 33px × 6px with correct periwinkle gradient. May appear invisible at a glance if the containing `<td>` is collapsed. Track is 33px wide in a 110px `min-w` column — bar renders small but is present.

3. **Rank circle collapsing** — `w-6 h-6` Tailwind utility on `<span>` inside DS component (`core-v2/`) not compiled in consumer (`charts-showcase`). Root: either `@source` directive in consumer `globals.css` doesn't scan `core-v2/src/charts/tables/RankingTable.tsx`, or Tailwind v4 purge not reaching that file. Fix: ensure `@source "../../../../design-system/core-v2/src/**/*.{tsx,ts}"` covers `charts/tables/` path.

4. **Active button text black not white** — `text-[var(--color-foundation-white)]` on Button primary variant not compiling → same Tailwind v4 `@source` scan miss. Button is in `core-v2/src/atoms/Button.tsx`. Text inherits body `rgb(0,0,0)`. The secondary hover → brand-red behavior IS working (inline style, not Tailwind). So: **any appearance of red** is the secondary button on hover before the click registers, OR `--color-brand-red` bleed from some other element.

5. **Inverted header color** — The scoped `<style>` tag with `color: #ffffff` for inverted should win over any Tailwind arbitrary. The bug Aura saw was pre-Sprint D.1. Current code: scoped style IS injected, should work. Not re-confirmed broken in this probe session — needs live visual check.

6. **Pure black horizontal line** — `#primitive-tableshell` demo table rows. Those TRs have no className at all. The TableShell scoped style targets its own `data-tableshell-id` wrapper and injects row divider styles via `[data-tableshell-id="X"] tbody tr` CSS selector — NOT via Tailwind classes on the TR. **But** the RankingTable's `RankingRowInner` has `className="group border-b border-[rgba(0,0,0,0.08)] last:border-0 transition-colors"` on the `<tr>` — this Tailwind class would also miss if core-v2 atoms aren't scanned. If `border-[rgba(0,0,0,0.08)]` class doesn't compile, `border-b` alone fires → browser default = `1px solid rgb(0,0,0)`. **This is the black line source for PropertyTable/primitive demo TRs too.**

7. **Card right-edge clip** — `overflow: auto` + `borderRadius: 10px` + `overflowX: auto` on wrapper. When table fits (698px in 700px wrapper), clip should be clean. If horizontal scroll activates (e.g. narrow viewport or wide columns), the scrollbar inside the border-radius creates a 1px dark sliver at the right edge. Not proven at 1440px. Likely a narrow viewport / specific column-width scenario.

---

## Fix recommendations (NO code · Opus will implement)

1. **Tailwind v4 @source path bug (ROOT CAUSE for breaks 3, 4, 6) — CONFIRMED:**
   `projects/charts-showcase/src/app/globals.css` line 18:
   `@source "../../../design-system/core-v2/src/**/*.{tsx,ts}";`
   This resolves to `/projects/design-system/core-v2/src/` — NON-EXISTENT path (3 levels up from `src/app/` lands in `projects/`, not workspace root).
   Correct path (4 levels up): `"../../../../design-system/core-v2/src/**/*.{tsx,ts}"`
   `src/app/` → `src/` → `charts-showcase/` → `projects/` → `design-system/core-v2/src/`.
   Fix: change `../../../` to `../../../../` on line 18. Then `pnpm build` to recompile. This single fix resolves rank circle collapse, active button black text, and TR `border-[rgba(0,0,0,0.08)]` class not compiling.

2. **`#primitive-tableshell` demo black borders:** The demo inside that section uses bare `<TR>` rows without TableShell wrapping, or uses pre-fix demo data. Check the ShowcaseContent or demo-registry for `primitive-tableshell` demo and either wrap the rows in a TableShell with the scoped style, or add `className="border-b border-[rgba(0,0,0,0.08)]"` to demo TRs.

3. **PropertyTable `#table-property` black row border:** Same issue. PropertyTable rows use `className="group hover:bg-[var(--black-50,rgba(0,0,0,0.03))] transition-colors"` — no `border-b border-[rgba(0,0,0,0.08)]`. Either the PropertyTable source needs the border class added to its `<tr>`, or the TableShell scoped style should cover it (which it would if `@source` scan is fixed and the Tailwind class compiles).

4. **Card right-edge dark sliver:** When viewport is narrow (< card content width), wrap the TableShell in a container with `overflow: hidden` at the outer level, or remove `scrollX` override and let only the inner table scroll horizontally. Alternatively: `overflow: clip` instead of `overflow: hidden` to prevent scroll context conflict with the border-radius clip.

5. **Inverted header verification:** After @source fix (rec 1), re-verify inverted header at `Card · Inverted header` variant. If still broken after scan fix, check whether `headerInverted` token value (`rgba(0,0,0,0.85)`) vs the docs description (`rgb(91,79,207)`) mismatch is intentional or a bug. Color discipline note (2026-05-22) says inverted = neutral dark, not periwinkle — `rgba(0,0,0,0.85)` is correct per color discipline, docs comment is stale.

---

## Screenshots: 8 saved

```
projects/charts-showcase/qa-screenshots/breaks-diagnose-2026-05-26-eve/
├── ranking-default-state.png         · full viewport at #table-ranking section
├── ranking-row-detail.png            · tbody first rows close-up
├── ranking-header-detail.png         · thead + first body row junction
├── ranking-rank-circle.png           · full viewport (circle too small to clip directly)
├── variant-toggle-detail.png         · full viewport (toggle below fold, captured full-page)
├── variant-toggle-comfortable.png    · comfortable button active state close-up
├── inverted-header-variant.png       · header close-up in inverted variant
├── card-right-edge.png               · right border edge (718 bytes — likely empty/outside viewport)
```

## Time + Model: aura-qa Sonnet · ~18 min
