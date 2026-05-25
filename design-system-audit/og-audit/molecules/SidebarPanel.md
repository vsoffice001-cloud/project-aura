# SidebarPanel — Molecule Audit (OG DS v4.3)

> **Source:** `Design_system_vs_26 (og and final)/src/app/components/molecules/SidebarPanel.tsx:50-164`
> **OG comment (line 1-30):** *"SidebarPanel — Molecule (DS v4.3). WHAT: Reusable sticky sidebar container with header, scrollable body, and optional footer. WHY: Captures the exact container pattern (sticky positioning, elevation, max-height, header/footer zones, scroll behavior) so future pages — TOC, side nav, settings — get identical placement and spacing by importing one component. WHEN: Desktop filter sidebar, TOC sidebar, settings panel."*

---

## 1. WHAT
A reusable sticky sidebar container with optional header, scrollable body, and optional footer. Two variants:
- **`inline`** (default) — original border-right separator, flush with parent (legacy pattern)
- **`card`** — standalone sticky card with rounded corners (`10px`), subtle shadow, border, viewport-aware max-height. Hidden below `lg`.

## 2. WHY
- **Sticky pattern unification** — TOC sidebars, filter sidebars, settings panels all need: stick below nav, scroll within max-height, header/body/footer zones. This molecule captures the pattern once.
- **Two variants address two design eras** — `inline` for layouts where the panel is a structural column with a border-right; `card` for the newer "floating card sidebar" treatment matching the production report store ref.
- **Viewport-aware max-height** (card variant, line 74): `calc(100vh - ${stickyTop + 16}px)` — scroll only when content exceeds available height.
- **`visible=false` returns null** — caller can hide programmatically without removing the JSX.

## 3. WHEN to use ✅
- Desktop filter sidebar paired with `MobileFilterSheet` · `IndustrySidebar.tsx:16` · `FiltersDocumentation.tsx:1055, 1099`
- TOC sidebar
- Settings panel / preferences
- Card-style explore sidebar with header (`label + title`)

## 4. WHEN NOT to use ❌
- Mobile filters (< lg) → use `MobileFilterSheet`
- Top-bar nav → use horizontal organism
- Modal/dialog overlay → use a different overlay primitive
- Inline within a card body (not the whole sidebar) → use a regular `<div>`
- Full-page off-canvas drawers → use a different drawer molecule

## 5. WHERE used (file:line)
- `components/organisms/IndustrySidebar.tsx:16` — primary organism wrapper
- `components/FiltersDocumentation.tsx:1055, 1099, 1433` — showcase + docs

## 6. HOW to implement

```tsx
import { SidebarPanel } from '@/app/components/molecules/SidebarPanel';
import { FilterAccordion } from '@/app/components/molecules/FilterAccordion';

const sidebarContent = (
  <>
    <FilterAccordion title="Industry" options={...} selectedValue={...} onSelect={...} />
    <FilterAccordion title="Region"   options={...} selectedValue={...} onSelect={...} />
  </>
);

// Card variant — modern sticky sidebar
<SidebarPanel
  variant="card"
  stickyTop={72}
  width="16rem"
  header={<div className="p-4">Filters</div>}
  footer={<button className="p-3 w-full">Clear all</button>}
>
  {sidebarContent}
</SidebarPanel>

// Inline variant — legacy structural column with border-right
<SidebarPanel variant="inline" width="15rem">
  {sidebarContent}
</SidebarPanel>

// Use same content in mobile sheet
<MobileFilterSheet isOpen={open} onClose={close} ...>
  {sidebarContent}
</MobileFilterSheet>
```

## 7. Composition tree

**Card variant:**
- `<aside>` (flex-shrink-0, hidden lg:block, width)
  - Sticky `<div>` (overflow-hidden, flex-col, viewport max-height)
    - Optional header `<div>` (with bottom border)
    - Scrollable `<div ref={scrollRef}>` (flex-1, scrollbar-hide)
    - Optional footer `<div>` (with top border, muted bg)

**Inline variant:**
- `<aside>` (flex-shrink-0, flex-col, border-right)
  - Optional header (bottom border)
  - Scrollable `<div ref={scrollRef}>` (flex-1)
  - Optional footer (top border)

**Atoms consumed:** none directly (layout primitive).

## 8. Properties

| Prop | Type | Default | WHY |
|---|---|---|---|
| `children` | ReactNode | — (required) | Body content (typically `FilterAccordion`s) |
| `header?` | ReactNode | — | Header zone |
| `footer?` | ReactNode | — | Footer zone |
| `width?` | string | `'15rem'` | Aside width (CSS length) |
| `className?` | string | `''` | Pass-through to `<aside>` |
| `visible?` | boolean | `true` | Hide via early return |
| `scrollRef?` | `RefObject<HTMLDivElement\|null>` | — | Ref to scrollable body |
| `variant?` | `'inline'\|'card'` | `'inline'` | Visual treatment |
| `stickyTop?` | number | `72` | Sticky offset (card variant, px) |

## 9. Data contract

```ts
type SidebarVariant = 'inline' | 'card';

interface SidebarPanelProps {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  width?: string;
  className?: string;
  visible?: boolean;
  scrollRef?: RefObject<HTMLDivElement | null>;
  variant?: SidebarVariant;
  stickyTop?: number;
}
```

No data input — purely structural.

## 10. States
- **Visible** (`visible=true`): rendered.
- **Hidden** (`visible=false`): returns null.
- **Card variant + below lg:** `hidden lg:block` collapses; mobile users use `MobileFilterSheet` instead.
- **Inline variant:** always rendered (no breakpoint gate inside molecule).

## 11. Variants
- `inline` — flush border-right, no border-radius, full-height
- `card` — rounded `10px`, shadow, viewport-aware max-height, sticky-positioned

## 12. Responsive behavior
- Card variant: `hidden lg:block` (mobile users get MobileFilterSheet)
- Inline variant: always renders — caller is responsible for hiding on mobile
- Width via prop (caller controls)

## 13. Tokens used
- Inline: `rgba(0,0,0,0.06)` border-right
- Card:
  - Border `rgba(0,0,0,0.08)`
  - Border-radius `10px` (DS container radius)
  - Shadow `0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.03)`
  - Footer bg `var(--black-50, rgba(250,250,250,1))`

## 14. A11y rules
- `<aside>` semantic landmark ✅
- **Gap:** no `aria-label` on aside ("Filters" or "Table of contents" would help SR navigation)
- **Gap:** scrollable body has no `tabindex="0"` — keyboard users may not be able to scroll the body without an interactive element inside
- **Gap:** sticky positioning can clip focus rings; verify with keyboard nav

## 15. Motion rules
- None — pure layout primitive.

## 16. Anti-patterns ❌
- Don't pass `variant="card"` for mobile breakpoints — won't render below lg.
- Don't omit `header`/`footer` in mid-design then add later expecting same layout — `flex-1` body changes height.
- Don't put long-form scrolling content in a card variant with no `maxHeight` consideration — would cause double scrollbars.
- Don't manually set `position: sticky` via className — molecule's sticky is handled internally for card variant.
- Don't pass `stickyTop` smaller than the actual nav height — content hides under nav.
- Don't wrap a `SidebarPanel` inside a `SidebarPanel`.
- Don't use as a full-screen drawer — it's not designed for that.

## 17. REUSABILITY SCORE
**4/5 ⭐⭐⭐⭐** — Universal sticky sidebar pattern. Two variants give it stretch across legacy + modern layouts. Loses one star for a11y gaps and limited mobile applicability (no breakpoint switch inside).

## 18. Linked components
- **Sibling molecule:** `MobileFilterSheet` (mobile counterpart)
- **Typical children:** `FilterAccordion`, `FilterSearchInput`, `CategoryListCard`
- **Parent organism:** `IndustrySidebar`, future TOC/settings sidebars

## 19. Reasons + Decisions log
- **Why two variants `inline` + `card`?** Two design eras coexisted. `inline` predates the "floating card sidebar" pattern; `card` is the newer treatment used in the production report store ref. Both shipped to avoid disruptive refactor of legacy pages.
- **Why `15rem` (240px) default width?** Matches the production reference; wide enough for two-line filter labels, narrow enough not to dominate.
- **Why sticky-top 72px default (card)?** Matches Navbar height (typical 60-72px) — places card below nav.
- **Why `calc(100vh - ${stickyTop + 16}px)` max-height?** Sticky-top offset + 16px bottom margin = available scroll height. Content scrolls within; window doesn't.
- **Why `scrollbar-hide` class?** Visual cleanliness; aligns with the rest of the DS (HorizontalScroll, ScrollFade both hide scrollbars).
- **Why footer gets a muted bg `var(--black-50)`?** Visual separation from body — "this is the action zone" vs "this is filter content".
- **Why border-bottom on header / border-top on footer?** Internal dividers — make zones explicit without backgrounds (inline variant).
- **Why card variant `hidden lg:block` but inline isn't?** Card variant is paired with `MobileFilterSheet` by design (the variant 4WH-stated "WHEN: Desktop"). Inline variant has wider use cases (TOC, settings) which may need mobile handling differently.
- **Why optional `scrollRef`?** Allows parent to programmatically scroll the body (e.g., "scroll to selected filter"). Without ref, body still scrolls — caller just can't control it.
- **Why `flex-shrink-0` on aside?** Prevents collapsing in a flex parent (sidebar + main content row).
- **Why `visible` prop instead of conditional render at call site?** Both work; this is a convenience. Future could remove if not used.
- **Why `top` set via inline `style: top: ${stickyTop}px` not className?** Dynamic prop — Tailwind classes are static. Inline style is the right tool.
