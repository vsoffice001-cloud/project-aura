# Filter System — UX deep dive

> Atom-by-atom WWWWH for every filter primitive in the report-store-legacy listing.
> Citations `file:line` against `projects/report-store-legacy/src/app/components/`.

The filter system is the single most-considered surface in this project. It spans **5 atoms** (chip · checkbox · search-input · custom dropdown · range — implicit), **3 molecules** (accordion · active-filter-chip · sidebar-panel), **2 organisms** (sidebar · mobile sheet), and **one mega-hook** (`useReportFilters`, 466 lines) that holds the consistency rules. This doc takes each atom/molecule in isolation, then describes the meta-behaviours (clear-all, search-within, cross-industry switch) that make them feel like one system.

---

## 1. Chip — `FilterChip.tsx`

**What.** A pill-shaped toggle button with optional check-icon and count badge. Two visual states: inactive (white bg, gray border, 55% text) and active (light-black bg, dark border, bold text, soft shadow, check icon). `FilterChip.tsx:26-66`.

**Why.** Touch-fat toggle for **mobile filter sheet** (Section 9) where checkbox-density would be cramped. Also useful for tag-clouds and multi-select chip rows in general (a future Competition-Benchmarking use case: dimension chip-cloud).

**Where.** Defined in `FilterChip.tsx`. Used inside `MobileFilterSheet.tsx:280-388` (every sheet section uses FilterChip rather than FilterCheckbox).

**When.** Inside the mobile filter sheet for: sort options, industries, sub-categories, regions, years. Effectively the **default mobile filter primitive**.

**How.**
- Touch target: `min-h-[40px]` (note: not 44px — should be bumped for WCAG AA, see `pattern-lessons.md` Modify #4).
- Active style: `bg rgba(0,0,0,0.06)`, `border rgba(0,0,0,0.2)`, font-weight 600, `shadow-sm`. Check icon prepended.
- Optional count: `--text-2xs`, tabular-nums, `text-black/25`.
- Disabled state: opacity 0.4, `cursor-not-allowed`.
- Radius: `var(--radius-element)` (5px). Width: inline auto.

**Replicate?** Yes. Fattening touch target (40 → 44px) is the only mod.

---

## 2. Checkbox — `FilterCheckbox.tsx`

**What.** Custom-styled row with a 16×16 checkbox box, label, optional count badge, full-row clickable surface, accent-bar on the left when checked. `FilterCheckbox.tsx:28-123`.

**Why.** Desktop-density filter primitive — 32px row height vs Chip's 40px, packs 12+ options in a 240px column. The full-row click target (not just the box) is a UX win — eliminates miss-clicks. Check icon is filled (not just bordered) for legibility at small sizes.

**Where.** Used inside `IndustrySidebar.tsx` for Tags (`:589-595`), Regions (`:621-627`), Years (`:653-659`). NOT used in Industries section (that's a custom tree, see Section 6 below).

**When.** In the desktop sidebar for flat multi-select lists.

**How.**
- Outer `<div role="checkbox" aria-checked tabIndex={0}>` — accessibility-correct.
- Keyboard handling: Enter / Space toggle.
- Visual:
  - Box: 16×16, `--radius-inner` (2.5px), 1.5px border `rgba(0,0,0,0.18)` default → `--text-primary` when checked. Inset shadow when unchecked, outset shadow when checked.
  - Checked icon: white Check, strokeWidth 3.
  - Row-active: bg `rgba(0,0,0,0.03)` + 2px left-border `rgba(0,0,0,0.6)` (accent bar).
  - Label: `--text-xs`, `text-black/50` → `text-black/85` when checked, truncate.
  - Count: `--text-2xs`, tabular-nums; becomes a pill when checked.
- Hover (when not checked): bg `rgba(0,0,0,0.025)`.
- `indented` prop adds left padding for nested rows (used in the industry tree for subcategories).

**Replicate?** Yes. Already a11y-friendly. Token migration only.

---

## 3. FilterSearchInput — `FilterSearchInput.tsx`

**What.** Compact search-within-filters input: search icon + native `<input>` + clear button when value present. `FilterSearchInput.tsx:27-74`.

**Why.** With 14 industries × N subcategories × dozens of tags / regions / years, **filter-search-within-filter** is essential. Typing "neur" instantly narrows industries (Healthcare → Neurology) + tags + regions across all sections. Without it, the rail becomes unscannable.

**Where.** Used once in `IndustrySidebar.tsx:391-396` as the top-of-rail search.

**When.** Always visible in desktop sidebar. NOT used in mobile sheet (mobile relies on full-section visibility instead).

**How.**
- Container: bg-white, `var(--radius-inner)`, border 1px `rgba(0,0,0,0.08)` default → `rgba(0,0,0,0.2)` when has value (border darkens to confirm input).
- Icon: Search 14px, `iconColors.utility`.
- Input: `bg-transparent`, `outline-none`, `--text-2xs`, placeholder `text-black/25`.
- Clear button: X icon 12px, only renders when value present, hover-darken.
- Two callbacks: `onChange` (every keystroke) + `onClear` (optional, after value cleared).
- **Critical side-effect inside the sidebar**: `useMemo` of `searchMatchSections` (`IndustrySidebar.tsx:219-228`) **auto-opens** every accordion section that has matches and **temporarily overrides** the user's manually-toggled section state. When search clears, manual state is restored. This is the **best UX trick in the whole filter system** — replicate first.

**Replicate?** Yes. The auto-open-on-search behaviour is what makes search-within-filters feel magical.

---

## 4. ActiveFilterChip — `molecules/ActiveFilterChip.tsx`

**What.** Removable pill displaying one active filter; color-coded by type; tiny X button removes it. `ActiveFilterChip.tsx:62-93`.

**Why.** Surface what's filtering "right now" outside the rail, with surgical-remove affordance (1 click vs. opening the sidebar, scrolling, unchecking).

**Where.** Defined in `molecules/ActiveFilterChip.tsx`. Note: the listing **doesn't actually use this molecule directly** — it builds its own equivalent `FilterChip` (the inner component) inside `ListingContextBanner.tsx:59-99`. The molecule exists as a reusable export but the banner inlined its own version. **Code smell — consolidation candidate.**

**When.** Wherever a filter chip strip renders (banner Zone B).

**How.**
- Type-keyed colours: search (gray), industry (gray), subIndustry (purple), tag (green), region (blue), year (amber). `:32-60`.
- Pill: `inline-flex items-center gap-1 pl-2.5 pr-1.5 py-0.5`, radius `9999px`, 1px border.
- Label: truncate at 120px.
- X button: rounded, padding 0.5, hover bg `rgba(0,0,0,0.06)`.

**Replicate?** Consolidate the duplicate impl (`ListingContextBanner.tsx:59-99`) into this molecule, then replicate.

---

## 5. FilterAccordion — `molecules/FilterAccordion.tsx`

**What.** Collapsible section with two visual variants: `sidebar` (compact, bordered icon, uppercase label, chevron-right rotate) and `sheet` (spacious, tinted-circle icon, normal-case label, chevron-down rotate). Supports disabled state with lock icon + hint. `FilterAccordion.tsx:45-233`.

**Why.** Filter sections (Industries / Tags / Regions / Years) each need a collapsible shell with: clickable header, active-count badge, expand/collapse animation, optional disabled state. Doing this once vs. four times saves ~400 lines.

**Where.** Defined in `molecules/FilterAccordion.tsx`. Used in `IndustrySidebar.tsx` (variant `sidebar`, four times: `:399-575, 578-609, 612-642, 645-672`) and `MobileFilterSheet.tsx` (variant `sheet`, five times: `:268-388`).

**When.** Every filter-section header.

**How.**
- Header: `<button>` with `aria-expanded`-equivalent state via `isOpen` prop.
- Variant `sidebar`: 24×24 icon-tile (bordered white box → bordered tinted box when active), uppercase label with 0.08em tracking, `--text-2xs`, chevron-right that rotates 90° on open.
- Variant `sheet`: 28×28 icon-tile (tinted circle), normal-case label, `--text-nav`, chevron-down that rotates 180° on open.
- Active count: in sidebar = black-filled pill; in sheet = `rgba(0,0,0,0.08)` gray pill. Tooltip on sidebar count: "N selected" (`:182-191`).
- Disabled: 0.55 opacity, `cursor-not-allowed`, Lock icon replaces chevron, optional `disabledHint` paragraph shown below. Used for Tags when no industry picked (`IndustrySidebar.tsx:585-587`).
- Expand animation: `maxHeight: 0 → 600px`, `opacity: 0 → 1`, 200-300ms. The hardcoded 600px max is a known limitation — long lists will clip. Should be removed in favor of measured height or `display: none`/`block` swap with `transition: height`.

**Replicate?** Yes, but lift the 600px cap. The variant prop pattern is solid.

---

## 6. Industry tree (custom, inline)

**What.** Hierarchical list inside the Industries section of the sidebar: each industry has an expand-chevron, name, count badge. Expanded industries reveal indented subcategory rows with their own checked/unchecked state. NOT a generic primitive — fully inlined in `IndustrySidebar.tsx:408-573`.

**Why.** Industry → subcategory is the core taxonomy of the report corpus. Flattening it (e.g. "Healthcare: Pharma" / "Healthcare: Devices" as flat tags) loses the parent-context. The tree pattern is standard in CMS / DAM tools (Notion sidebar, Figma layers, file explorers).

**Where.** Inlined in `IndustrySidebar.tsx:407-573`. Subcategory toggle calls back to `onSubcategorySelect` (`:540`).

**When.** Always visible in desktop sidebar Industries accordion.

**How.**
- Industry row: 3-col flex (chevron-button · name-button · count). Chevron toggles `expandedIndustries` set; clicking name selects/deselects industry (`:435-450`).
- Active industry style: left-border-3px-black, bg `rgba(0,0,0,0.04)` (`:414-422`).
- Subcategory rows: `ml-7` indent + `border-left: 1px solid rgba(0,0,0,0.08)` to draw a tree-line. Each row has its own active state: bg `rgba(0,0,0,0.05)` + 2px left-border accent.
- Auto-expand: when `currentSubIndustries` change, parent industries with active subs are auto-expanded + the Industries accordion auto-opens + the first active sub `scrollIntoView({behavior: "smooth"})` after 220ms (`:123-161`).
- "Show all N industries" button appears when more than 8 are listed (`:553-573`).
- Inline hover effects: `onMouseEnter` / `onMouseLeave` write inline `background` — should be CSS pseudoclasses, see `pattern-lessons.md` Reject #3.

**Replicate?** Yes — but extract as `<FilterTreeItem>` molecule rather than inlining 165 lines. The auto-expand-on-selection + scroll-to-active behaviours are the keepers.

---

## 7. Range filter

**What.** Not present. The listing doesn't filter by numeric range (e.g. pages > N, market-size > $B). Years are filtered as discrete multi-select, not as a range slider.

**Why catalogued.** Competition-Benchmarking is likely to need range filters (e.g. score 0-100, revenue 1M-100M, employee count). If the new DS needs a slider, **Radix Slider** (`@radix-ui/react-slider` is already in `package.json:35`) is the right choice. No precedent in this project to inherit from.

---

## 8. Sort dropdown — inline `<select>`

**What.** Native `<select>` styled with `appearance-none` + custom chevron, 5 options hardcoded. `ListingToolbar.tsx:150-166`.

**Why.** Native select is **screen-reader-perfect**, **mobile-OS-integrated** (iOS shows the wheel picker, Android the modal), zero JS, zero a11y debt. The styled-custom-dropdown alternative (Radix Select) is heavier and usually worse on mobile.

**Where.** `ListingToolbar.tsx:150-166`. Hidden below `sm:` — mobile uses a sort section in the filter sheet instead.

**When.** Desktop / tablet sort changes.

**How.**
- Wrapper `<div className="relative">` with `<select>` inside.
- `appearance-none`, padding `pl-3 pr-8 py-1.5`, custom border + radius.
- `<ChevronDown>` absolutely positioned right, `pointer-events-none`.
- Options come from props (`sortOptions` array) — domain-agnostic.
- 5 defaults: `Newest First / Oldest First / Most Popular / A-Z / Z-A`.

**Replicate?** Yes — keep native. Don't downgrade to Radix Select.

---

## 9. Mobile filter sheet — `MobileFilterSheet.tsx`

Already covered in `listing-anatomy.md` §9 from the chrome perspective. Filter-system view here:

- **Sort** is a top-level accordion section (`:267-289`) — different from desktop's dropdown placement.
- **Industries** are listed as `<FilterChip>` toggles (`:305-313`) — different from desktop's tree.
- **Sub-industries** appear only after an industry is picked (`:317-340`), labelled `"{industry} Segments"`.
- **Regions / Years** are flat chip-clouds (`:343-388`).
- The mobile sheet is **less hierarchical** than the desktop rail by design — taps > clicks, breadth > depth.

---

## 10. Clear-all

**What.** Three clear-all paths:
1. Header X-link inside the sidebar (`IndustrySidebar.tsx:342-362`) — visible whenever `activeCount > 0`.
2. "Clear all" in the chip strip footer (`ListingContextBanner.tsx:331-345`) — visible when `totalActive > 1`.
3. "Clear all" in the mobile sheet header (`MobileFilterSheet.tsx:244-252`) — visible whenever `activeFilterCount > 0`.

**Why.** Power-user shortcut. Three entry points is fine because each is contextual (rail-local, banner-local, sheet-local).

**How.** All wire to `useReportFilters.clearAllFilters` (`useReportFilters.ts:207-216`) which zeros every filter axis + resets pagination + scrolls nothing (intentional — user stays where they are).

---

## 11. Cross-industry consistency rules (the brain)

**What.** Three invariants enforced in `useReportFilters.ts`:

1. **Rule 1.** When a sub-industry is toggled ON and it doesn't belong to the current `sidebarIndustry` → auto-switch to its parent industry; clear tags; toast confirmation. `:165-180, 271-283`.
2. **Rule 2.** When an industry is selected → drop sub-industries that don't belong to the newly selected industry. `:96, 137`.
3. **Rule 3.** Tags depend on industry context; deselecting industry clears tags. `:131-133, 228`.

**Why.** Without these rules, the filter UI yields incoherent states ("industry=Healthcare AND sub=Solar Panels"). The toast + auto-switch keeps user agency intact while preventing impossible queries. **This is a signature UX detail and the strongest replicate candidate of the whole project.**

**Where.** Logic in `useReportFilters.ts:128-186` (`handleSidebarIndustrySelect`, `handleSubcategorySelect`) and `:258-287` (`handleSidebarSubIndustriesChange`).

**How.** Helpers `getSubsForIndustry`, `allSubsBelongToIndustry`, `filterSubsToIndustry`, `findParentIndustry` (`:22-54`). Toast uses `sonner` with 2500ms duration. The auto-switch is silent if no parent is found (defensive), but in practice every sub has a parent.

**Replicate?** Absolutely. Generalise: when one filter axis depends on another (parent-child, A-implies-B), enforce coherence and explain the auto-correction.

---

## 12. Auto-scroll to listing area

**What.** Whenever a filter is set that switches viewMode home → listing, scroll the page to anchor `#listing-area`. `useReportFilters.ts:57-62, 99, 118, 125, 143, 222`.

**Why.** Home is long-scrolling (8+ sections). After clicking an industry tile near the bottom, the listing renders far above — user has no idea anything changed. Auto-scroll lands them exactly at the toolbar.

**How.** `document.getElementById("listing-area").scrollIntoView({behavior: "smooth", block: "start"})`. Anchor is set on the two-col shell (`App.tsx:101`) with `scrollMarginTop: 72px` so the sticky header doesn't cover it.

**Replicate?** Yes. Tiny but high-impact UX nicety.

---

## 13. URL synchronisation

**What.** None. Filter state lives in React state only; URL never updates. Refreshing the page wipes all filters; deep-linking is impossible.

**Why catalogued.** **This is the biggest functional gap in the project** and is flagged in `MIGRATION_LOG.md` as tech-debt for the Next.js port. The new DS / production build MUST sync filter state to `searchParams` (e.g. `?industry=healthcare&region=apac&sort=newest`). Until then, the listing is non-shareable.

**Replicate?** Reject the current approach. Build URL-sync in the new system.

---

## WWWWH summary

| Primitive | File | What | Why | Where used | When triggered | How (composition) |
|---|---|---|---|---|---|---|
| FilterChip | `FilterChip.tsx:26-66` | Pill toggle | Mobile/touch | MobileFilterSheet | Sheet open | shadcn-flavoured button w/ check icon |
| FilterCheckbox | `FilterCheckbox.tsx:28-123` | Custom checkbox row | Desktop density | Sidebar (Tags/Regions/Years) | Sidebar visible | role=checkbox custom div + check icon |
| FilterSearchInput | `FilterSearchInput.tsx:27-74` | Search-within-filters | Cuts 14×N options to N | Sidebar top | Always (desktop) | bordered input + Search icon + X clear |
| ActiveFilterChip | `molecules/ActiveFilterChip.tsx:62-93` | Removable pill | Surface + surgical remove | Banner Zone B (via inline dup) | Filters active | type-colored pill + X |
| FilterAccordion | `molecules/FilterAccordion.tsx:45-233` | Collapsible section | Group + count + collapse | Sidebar (sidebar) + Sheet (sheet) | Header click | button + maxHeight tween + icon-tile |
| Industry tree | inlined `IndustrySidebar.tsx:407-573` | Hierarchical multi-select | Domain taxonomy | Sidebar Industries section | Always | chevron-button + name-button + count + indent |
| Sort `<select>` | `ListingToolbar.tsx:150-166` | Native sort dropdown | A11y + mobile native | Toolbar | Listing mode | native select + custom chevron |
| Mobile sheet | `MobileFilterSheet.tsx:183-409` | Slide-in filter drawer | Mobile parity | App.tsx mount | Sheet open | Backdrop + slide transform + accordion stack |
| Clear-all | sidebar header / banner footer / sheet header | Reset everything | Power-user escape | All filter UIs | activeCount>0 | call useReportFilters.clearAllFilters |
| Cross-industry rules | `useReportFilters.ts:128-186, 258-287` | Coherence invariants | Prevent impossible states | Filter handlers | Sub-cat / industry change | findParentIndustry + filterSubsToIndustry + toast |
| Auto-scroll-to-listing | `useReportFilters.ts:57-62` | Scroll to results | Anchor user after filter | After viewMode home→listing | Filter set triggers transition | scrollIntoView w/ scrollMarginTop |
| URL sync | — (absent) | Persist state to URL | Shareable, refresh-safe | (none — gap) | (n/a) | (reject current; build in port) |

---

## What benchmarking listing needs to inherit, modify, or skip

| Need | Decision |
|---|---|
| Toggle chips (mobile) | Inherit FilterChip; bump touch target 40→44 |
| Desktop checkbox rows | Inherit FilterCheckbox as-is |
| Search-within-filters | Inherit + reuse auto-open-on-search behaviour |
| Removable active chips | Consolidate dup into ActiveFilterChip; inherit |
| Section accordion | Inherit; uncap 600px maxHeight |
| Tree filter | Extract `<FilterTreeItem>` molecule; inherit auto-expand-on-selection + scroll-to-active |
| Range slider (score, market-size) | NEW — use Radix Slider (`@radix-ui/react-slider` in deps) |
| Sort dropdown | Inherit native `<select>` |
| Mobile sheet | Inherit; swap hand-rolled focus trap for Radix Dialog |
| Clear-all (3 entry points) | Inherit |
| Cross-axis coherence rules | Inherit pattern; generalise as `useFilterCoherence` hook |
| Auto-scroll to listing | Inherit |
| URL sync | NEW — build with Next.js `useSearchParams` |
