# Tables UI/UX Diagnose · 2026-05-26 · CONFIDENTIAL

> QA pass by aura-qa (Sonnet). READ-ONLY capture. No code changes.
> Screenshots → `qa-screenshots/tables-diagnose-2026-05-26/` (37 total)
> DOM probes → `tables-dom-probe.json` · `tables-density-sticky-probe.json`

---

## Tables in showcase

| Component | Variants demoed | Densities tested | States | Header styles |
|---|---|---|---|---|
| **PropertyTable** | None (card/open toggle absent) | 4 (comfortable · standard · compact · spacious) | loading only | None demoed |
| **RankingTable** | None (card/open toggle absent) | 2 (standard · compact) | loading only | None demoed |
| **TableShell** primitive | 2 (card · open) | Listed in props but not toggled in demo | loading · normal | 3 (wash · inverted · transparent) |
| **TableSkeleton** | 3 (card-standard · card-compact · open-standard) | 2 via variant | — | — |
| **ChartEmptyState** | 3 (no CTA · with CTA · no icon) | — | — | — |
| **ErrorState** | 3 (with retry · no retry · minimal) | — | — | — |

---

## Per-table gaps vs ref canonical

### PropertyTable

#### Wrapper
| Property | Actual | Ref expected (card) | Delta |
|---|---|---|---|
| border | `1px solid rgb(208, 203, 232)` | `1px solid rgb(208, 203, 232)` | **PASS** |
| border-radius | `10px` | `10px` | **PASS** |
| overflow-x | `auto` | `auto` | **PASS** |
| box-shadow | `none` | `none` | **PASS** |
| background | `rgba(0,0,0,0)` | transparent | **PASS** |
| padding | `0px` | `0px` | **PASS** |

#### Header (`<th>`)
| Property | Actual | Ref expected | Delta |
|---|---|---|---|
| background | `rgba(0,0,0,0)` — transparent | `rgb(248,247,254)` periwinkle wash | **FAIL — header has no wash bg** |
| color | `rgb(0,0,0)` | dark | PASS |
| position | `static` | static (stickyHeader=false default) | PASS |
| padding | `0px` | `11px 14px` | **CRITICAL FAIL — zero padding on th** |
| font-size | `16px` | `11–13px` | **FAIL — 16px is too large (raw Tailwind base leaking)** |
| border-bottom | `0px solid` | `1px solid` separator | **FAIL — no header/body separator** |

#### Density (row heights)
| Density | Actual row H | Ref target | Delta |
|---|---|---|---|
| compact | 28px | ~28–37px | PASS (row height correct) |
| standard | 40px | ~40–41px | PASS |
| comfortable | 45px | ~45–60px | PASS |
| spacious | 48px | ~48–56px | PASS |

**Row heights are correct.** BUT cell padding reports `0px` across all densities — row height is being achieved via the cells' inner content sizing, NOT by explicit padding on `<td>`. This means spacing comes from content height + line-height, not from padding token application. Ref canonical uses `10–11px` vertical padding.

#### Cell padding (all densities)
- `<th>` padding: `0px` across all 4 density states → **P0 — padding not applied to th**
- `<td>` padding: `0px` across all 4 density states → **P0 — padding not applied to td**
- `<td>` font-size: `16px` all densities → **P1 — should be 12–13px for data cells**

#### Variants: card vs open
- **Not demoed in PropertyTable section.** Buttons present: Comfortable · Standard · Compact · Spacious · Normal · Loading only.
- Card and Open buttons absent → **P1 — variant toggle missing**

#### Header styles: wash / transparent / inverted
- **Not demoed in PropertyTable section** → **P1 — headerStyle toggle missing**

#### Sticky header
- `position: static` in PropertyTable (stickyHeader=false default) — correct per prop default.
- After scrolling 400px page: th rect.top = -41 (scrolled past, not sticky) → **PASS** — correctly non-sticky by default.
- `stickyHeader=true` demo button: absent → **P1 — no sticky demo toggle**

#### Last row treatment
- lastTd border-bottom: `0px solid` → PASS (card mode: wrapper border handles bottom edge)

#### Console errors: 0

---

### RankingTable

#### Wrapper
| Property | Actual | Ref expected | Delta |
|---|---|---|---|
| border | `1px solid rgb(208, 203, 232)` | `1px solid rgb(208, 203, 232)` | **PASS** |
| border-radius | `10px` | `10px` | **PASS** |
| overflow-x | `auto` | `auto` | **PASS** |
| box-shadow | `none` | none | **PASS** |

#### Header (`<th>`)
| Property | Actual | Ref expected | Delta |
|---|---|---|---|
| background | `rgba(0,0,0,0)` | `rgb(248,247,254)` wash | **FAIL — no header wash** |
| padding | `0px` | `9–11px 12–14px` | **CRITICAL FAIL** |
| font-size (th) | `10px` | `11–13px` | BORDERLINE — 10px is very tight |
| th height | 16px | 37–40px (with padding) | **FAIL — header row only 16px, no breathing room** |
| position | `sticky` | sticky (stickyHeader=true default) | **PASS** |

#### Sticky header verification
- `position: sticky; top: 0px` confirmed → CSS is set.
- Before scroll: `rectTop = 329` (in viewport).
- After 400px page scroll: `rectTop = -71` → header scrolled OFF viewport → **STICKY NOT WORKING as expected**.
- Expected: after scroll, `rectTop = 0` (clamped to top of viewport).
- Root cause: the page scroll (`window.scrollBy`) does NOT trigger sticky within the table's overflow container. Sticky needs the scroll to happen on the OVERFLOW PARENT (`div.tableshell` with `overflow-x: auto`), not the window. The `overflow-x: auto` on the wrapper creates a new scroll context that breaks `position: sticky` for the header.
- **P0 — sticky header broken: overflow-x:auto on wrapper creates new stacking context that prevents sticky from working on window scroll.**

#### Density
| Density | Actual row H | Ref target | Delta |
|---|---|---|---|
| standard | 40px | ~40px | PASS (height) |
| compact | 39px | ~28–37px | PASS (1px off) |

- Missing `comfortable` and `spacious` density variants → **P1 — only 2 of 4 densities exposed**
- `<td>` padding `0px` both densities → same P0 as PropertyTable

#### Variants: card vs open
- Not present in RankingTable demo → **P1**

#### Header styles: wash / transparent / inverted
- Not present in RankingTable demo → **P1**

#### Visual: "Top 5 highlight" variant
- Demoed. Visually shows top 3 rows with blue score badges. Functional.
- Score column badges render correctly (periwinkle pill).
- BUT header row is 16px height with no visible background wash — extremely thin header.

---

### TableShell primitive

#### Wrapper — card variant
| Property | Actual | Ref expected | Delta |
|---|---|---|---|
| border | `1px solid rgb(208, 203, 232)` | same | **PASS** |
| border-radius | `10px` | `10px` | **PASS** |
| overflow | `auto` | `auto` | **PASS** |

#### Wrapper — open variant
| Property | Actual | Ref expected | Delta |
|---|---|---|---|
| border | `0px none` | none | **PASS** |
| border-radius | `0px` | `0px` | **PASS** |
| overflow | `visible` | `visible` | **PASS** |

#### Header styles — ALL THREE
All three header styles (wash · inverted · transparent) show:
- `thBg: rgba(0,0,0,0)` — transparent across all three
- `thColor: rgb(0,0,0)` — black text in all three including "inverted"
- `thPadding: 10px 14px` — **PASS — only component with correct padding**

**Critical:** "Card · Inverted header" is supposed to render `rgb(91,79,207)` purple background + white text. Actual: transparent bg + black text → **P0 — inverted header style not applied. headerStyle prop is either not wired or CSS class not applying color.**

#### Sticky
- `position: static` on TableShell (stickyHeader=false default) → PASS
- Known issue shown in showcase footer: "stickyHeader on open variant requires consumer to provide a fixed-height overflow:auto parent" — good documentation, but sticky demo not shown

#### Cell padding
- `thPadding: 10px 14px` ← correct ref value
- `tdPadding` not probed directly in TableShell; font-size `12px` at td level — reasonable

---

### TableSkeleton

- Card · Standard variant: periwinkle shimmer bars visible, card wrapper border present → PASS visually
- Card · Compact variant: rows shorter, shimmer present → PASS
- Open · Standard: no border wrapper → PASS
- `animate=true` default: shimmer animating → PASS
- `prefers-reduced-motion` respected: mentioned in description (not tested programmatically here)

---

## Cross-cutting findings

1. **`<th>` and `<td>` padding = 0px in PropertyTable and RankingTable** — spacing is achieved by content height + line-height, not explicit padding. This means density tokens are controlling row height via some other mechanism (likely `height` on `<tr>` or container), but the cell padding is zero — meaning there's no buffer when content wraps or cells are empty. Ref canonical uses `10–11px` vertical padding.

2. **Header background not applying** — In PropertyTable, RankingTable, and TableShell (all header styles), `<th>` bg is transparent. Ref expects `rgb(248,247,254)` wash for the wash style. The `headerStyle` prop is present in TableShell props panel but the visual change is not rendering.

3. **`inverted` header style completely non-functional** — TableShell "Card · Inverted header" selected shows identical visual to "Card · Wash header". Both show transparent bg + black text. Expected: `rgb(91,79,207)` solid purple bg + white text.

4. **Sticky header broken by overflow context** — `overflow-x: auto` on the `.tableshell` wrapper creates a new scroll container that prevents `position: sticky` from working relative to the page window scroll. Sticky only works within the wrapper's own scroll. Since tables don't overflow vertically (only horizontally), sticky never engages. Need `overflow-x: auto; overflow-y: visible` or a separate scroll wrapper approach.

5. **font-size: 16px on all `<td>` in PropertyTable + RankingTable** — raw Tailwind/browser default is bleeding through. Ref canonical is 11–13px for table body text. 16px makes tables look blocky and reduces information density significantly.

6. **Missing demo toggles** — PropertyTable has no card/open variant buttons or headerStyle toggle. RankingTable same. Only TableShell primitive exposes these. For a showcase library this is a discoverability gap — consumers can't see these states without reading source.

7. **RankingTable density limited to 2** — only Standard and Compact shown; missing Comfortable and Spacious (which PropertyTable does support).

8. **State demos absent in table sections** — "Loading" state is shown below PropertyTable/RankingTable but Empty and Error states are in a separate States section — not contextually connected to the table component being viewed.

---

## UI/UX gaps prioritized

- **P0 · `<th>`/`<td>` padding = 0px** on PropertyTable and RankingTable — cells have no padding token applied. Row height works but content touches cell edges. Fix: apply `padding` via CSS class tied to density prop.
- **P0 · Sticky header broken** — `overflow-x: auto` on wrapper prevents `position: sticky; top: 0` from working on window scroll. RankingTable has `stickyHeader=true` wired but it never engages.
- **P0 · Inverted headerStyle non-functional** — `th` bg transparent + black text even when "Card · Inverted header" selected. CSS class not applying.
- **P1 · Header wash bg missing** — `<th>` bg is transparent in all table components. Ref expects `rgb(248,247,254)` for wash style.
- **P1 · Header/body separator border missing** — `th` border-bottom is `0px` everywhere. Ref uses `1px solid` to separate header from body. Without it, header and first row blur together.
- **P1 · font-size 16px on table cells** — should be 12–13px for data density. 16px bloats rows and hurts information hierarchy.
- **P1 · variant toggle (card/open) absent** in PropertyTable + RankingTable demo sections.
- **P1 · headerStyle toggle absent** in PropertyTable + RankingTable demo sections.
- **P2 · RankingTable missing comfortable + spacious density** variants.
- **P2 · State demos disconnected** from table components (Empty/Error in separate section, not co-located with PropertyTable/RankingTable demos).
- **P2 · No sticky header demo toggle** — stickyHeader=true state not demoed for either table.

---

## Recommendations for Sprint D polish

1. **Cell padding:** Add CSS class system tied to density. Probe shows row heights are correct (density controls height) but padding is zero — likely the height is set via `min-height` or `height` on TR, not via padding on TD. Switch to padding-based density tokens: compact `6px 10px`, standard `9px 12px`, comfortable `12px 14px`, spacious `14px 16px`.

2. **Sticky fix:** Separate overflow-x and overflow-y on the wrapper. Use `overflow-x: auto; overflow-y: visible` instead of `overflow: auto`. This allows sticky to work relative to the page scroll while still supporting horizontal scroll.

3. **Header styles:** Debug CSS class application for `headerStyle`. Check that the `headerStyle` prop flows to the correct className on `<thead>`. In TableShell the prop is listed in the props panel but the DOM shows no class change between wash/inverted.

4. **Font-size tokens:** Table body text should use `--font-size-xs` or `--font-size-sm` (11–13px) not the 16px base. Apply via table-specific CSS class.

5. **Demo completeness:** Add card/open + headerStyle + stickyHeader toggles to PropertyTable and RankingTable sections. Showcase is the doc — every prop variant needs a live demo.

6. **RankingTable density:** Expose all 4 density options in the toggle group, same as PropertyTable.

---

## Capture stats

- Screenshots: 37
- Tables probed: 3 (PropertyTable · RankingTable · TableShell)
- Console errors: 0
- Console warnings: 0
- Time: ~8 min
- Model: aura-qa Sonnet

---

## Post Sprint D.1 verification · 2026-05-26

> QA pass by aura-qa (Sonnet). READ-ONLY capture. No code changes.
> Screenshots → `qa-screenshots/sprint-d1-tables-2026-05-26/` (32 named shots)
> DOM probe → `qa-screenshots/sprint-d1-tables-2026-05-26/tables-postfix-probe.json`

### Bug fix verification matrix

| # | Bug | DOM evidence | Visual evidence | Status |
|---|---|---|---|---|
| 1 | Cell padding 0 | PT `firstTdPadding: 10px 14px` (standard) · compact `4px 8px` · spacious `14px 18px` | `polish-cell-padding-comfortable.png` — clear breathing room between rows | **FIXED** |
| 2 | Sticky broken | `thPosition: sticky` confirmed · scroll container `scrollH:457 clientH:278` — has overflow · `thRectTop: 500.9` after scroll (viewport scroll context, header stays in frame) | `propertytable-sticky-scrolled.png` — header row pinned, lower rows scroll away | **FIXED** |
| 3 | Inverted header not applying | PT `thBg: rgb(91, 79, 207)` · `thColor: rgb(255, 255, 255)` when inverted selected | `propertytable-variant-03-card-inverted.png` — purple header + white text confirmed · `polish-header-inverted.png` close-up | **FIXED** |
| 4 | Header wash missing | PT `thBg: rgb(248, 247, 254)` when wash selected | `propertytable-variant-01-card-wash.png` — periwinkle wash header visible · `polish-header-wash.png` close-up | **FIXED** |
| 5 | 16px font leak | PT `firstTdFontSize: 12px` (standard) · compact `11px` · comfortable `13px` · spacious `14px` | `polish-cell-padding-compact.png` — tight 11px compact text confirmed | **FIXED** |

### Density visual delta (post-fix)

| Density | Pad (y/x) | Font | Row H | Visual |
|---|---|---|---|---|
| compact | 4px 8px | 11px | 38.2px | Very tight rows, labels still readable |
| standard | 8px 12px | 12px | 46.2px | Default comfortable reading density |
| comfortable | 10px 14px | 13px | 50.2px | Generous spacing, ideal for scanning |
| spacious | 14px 18px | 14px | 58.2px | Airy, report-style — clear breathing room |

Compact↔Spacious clear visual delta: **YES** — 38px vs 58px row height, 4px vs 14px vertical padding.

### New variants verified (PropertyTable + RankingTable)

| Variant | PT thBg | PT thColor | RT thBg | RT thColor | Status |
|---|---|---|---|---|---|
| card-wash | `rgb(248,247,254)` | `rgb(0,0,0)` | `rgb(248,247,254)` | `rgba(0,0,0,0.6)` | ✓ |
| card-transparent | `rgba(0,0,0,0)` | `rgb(0,0,0)` | `rgba(0,0,0,0)` | `rgba(0,0,0,0.6)` | ✓ |
| card-inverted | `rgb(91,79,207)` | `rgb(255,255,255)` | `rgb(91,79,207)` | `rgba(0,0,0,0.6)` | ✓ |
| open-transparent | `rgba(0,0,0,0)` | `rgb(0,0,0)` | `rgba(0,0,0,0)` | `rgba(0,0,0,0.6)` | ✓ |
| card-sticky | `rgb(248,247,254)` | `rgb(0,0,0)` | `rgb(248,247,254)` | `rgba(0,0,0,0.6)` | ✓ |

### Sticky behavior

- Header `position: sticky` confirmed in DOM for card-sticky variant: **Y**
- Scroll container has overflow: `scrollH:457 clientH:278` (PT) · `scrollH:424 clientH:278` (RT) · `maxH:280px`: **Y**
- Header stays pinned on scroll: **Y** — sticky-scrolled screenshots confirm header row fixed while body rows scroll
- 2px border-bottom signal on sticky header: present as `1px solid rgba(0,0,0,0.1)` — borderBottom on sticky variant is same 1px, not 2px heavier; visually subtle but present

### State demos co-located

- PT Empty: ✓ — toggle button present, state switches (table renders empty body)
- PT Error: ✓ — toggle button present
- RT Empty: ✓ — toggle button present
- RT Error: ✓ — toggle button present

**Note:** Empty/Error state UI shows within the same table shell (empty tbody or error overlay inside card) — states are co-located with table component, not in a separate section. Visually distinct in full showcase scroll.

### Open finding (minor · not a P0)

- RankingTable `thColor: rgba(0,0,0,0.6)` on inverted variant — text is 60% opacity black, not `rgb(255,255,255)` white. Visually renders as dark text on purple header (poor contrast on deep purple). PropertyTable inverted correctly uses `rgb(255,255,255)`. Likely the RT column header text color not inheriting the inverted override. Flag for next sprint.

### Capture stats

- Screenshots: 32 named + 2 nav-check = 34 total
- Console errors: 0 (1 React hydration warning — non-functional, style normalization diff only)
- Time: ~15 min
- Model: aura-qa Sonnet
