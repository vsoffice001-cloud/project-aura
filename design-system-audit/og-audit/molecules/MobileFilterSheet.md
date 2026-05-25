# MobileFilterSheet — Molecule Audit (OG DS v4.3)

> **Source:** `Design_system_vs_26 (og and final)/src/app/components/molecules/MobileFilterSheet.tsx:50-220`
> **OG comment (line 1-30):** *"MobileFilterSheet — Molecule (DS v4.3). WHAT: Bottom-slide sheet overlay for mobile filter access (< lg breakpoints). WHY: Desktop sidebar is hidden below lg — mobile users need filter access. Sheet pattern matches mobile-first UX (Fitts's Law: thumb-reachable, Miller's Law: progressive disclosure of filter options). WHEN: Triggered by the SlidersHorizontal button visible at `lg:hidden`. HOW: Fixed overlay with backdrop + bottom-sliding panel containing the same `sidebarContent` JSX shared with the desktop SidebarPanel."*

---

## 1. WHAT
A modal-style bottom sheet that slides up from the viewport bottom on mobile (< lg), containing a drag-handle bar, a header (Filters + count badge + close), a scrollable body (filter content passed as children), and a footer with "Show N results" CTA + optional "Clear all". Designed to mirror the desktop sidebar's filter UI in a mobile-native interaction model.

## 2. WHY
- **Mobile filter access need** — desktop `SidebarPanel variant="card"` is `hidden lg:block`; without this sheet, mobile users couldn't filter.
- **Shared `children` contract with desktop sidebar** — caller extracts filter JSX once, passes to both panels. Single source of filter content.
- **Bottom-up sheet matches mobile UX laws:**
  - Fitts's Law — thumb-reachable from bottom (most apps put filters/actions here)
  - Miller's Law — progressive disclosure (filters hidden until invoked)
- **Body scroll lock** (line 64-67) — prevents background page scroll while sheet open.
- **Escape key close** (line 71-74) — keyboard escape works.
- **"Show N results" CTA** is the close action — explicit action with feedback (knows the result count).

## 3. WHEN to use ✅
- Mobile filter UX on any listing page · `ReportStorePage.tsx:170`
- Any time desktop has a sidebar filter panel that needs mobile parity
- Showcases of filter system · `FiltersDocumentation.tsx:1290`

## 4. WHEN NOT to use ❌
- Desktop filter UX → use `SidebarPanel variant="card"`
- Generic dialogs/forms → use a `Modal` atom (not a sheet)
- Drawers from sides → would need a different sheet primitive (right/left drawer)
- Confirmation dialogs → too heavy; use a small modal
- Full-screen modals → `maxHeight: 85vh` leaves status bar visible; full-screen needs different molecule

## 5. WHERE used (file:line)
- `components/ReportStorePage.tsx:170` — primary consumer
- `components/FiltersDocumentation.tsx:1290` — showcase

## 6. HOW to implement

```tsx
import { MobileFilterSheet } from '@/app/components/molecules/MobileFilterSheet';
import { SlidersHorizontal } from 'lucide-react';

const [open, setOpen] = useState(false);

// Trigger button (mobile only)
<button className="lg:hidden ..." onClick={() => setOpen(true)}>
  <SlidersHorizontal size={18} />
  Filters
</button>

<MobileFilterSheet
  isOpen={open}
  onClose={() => setOpen(false)}
  activeCount={appliedFilters.length}
  resultCount={filteredReports.length}
  onClearAll={clearAllFilters}
>
  {sidebarContent /* same JSX as desktop */}
</MobileFilterSheet>
```

## 7. Composition tree
- Backdrop `<div>` (full-screen black 40% opacity, click to close)
- Sheet Panel `<div>` (rounded top corners, slide-up animation)
  - Drag handle (10×4 pill at top)
  - Header row: SlidersHorizontal icon + "Filters" + `Badge` (count) + close `X` button
  - Scrollable body — `{children}` (filter content)
  - Footer: "Clear all" + "Show N results" CTA
- Inline `<style>` for `fadeIn` + `slideUp` keyframes

**Atoms consumed:** `Badge`.
**Hooks:** `useEffect` (body lock + escape) · `useState` (hover states).
**Icons:** `X`, `SlidersHorizontal`.

## 8. Properties

| Prop | Type | Default | WHY |
|---|---|---|---|
| `isOpen` | boolean | — (required) | Controls render — unmount when false |
| `onClose` | `()=>void` | — (required) | Close handler (backdrop click, X button, Show CTA, Escape) |
| `activeCount?` | number | `0` | Filter count badge in header; clear-all visibility |
| `resultCount?` | number | `0` | "Show N results" CTA label |
| `onClearAll?` | `()=>void` | — | Clear-all handler (closes after clearing) |
| `children` | ReactNode | — (required) | Filter content JSX |

## 9. Data contract

```ts
interface MobileFilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  activeCount?: number;
  resultCount?: number;
  onClearAll?: () => void;
  children: ReactNode;
}
```

**Where data comes from:** consumer page holds open state, active filter count, filtered result count.

## 10. States
- **Closed** (`!isOpen`): `return null`, no DOM.
- **Opening:** backdrop fades in (`fadeIn 200ms`), sheet slides up (`slideUp 250ms`).
- **Open:** body scroll locked, escape key armed.
- **With active filters** (`activeCount > 0`): badge in header + "Clear all" visible.
- **Without active:** no badge, no clear-all.
- **Close button hover:** bg shifts to `rgba(0,0,0,0.04)`.
- **Show CTA hover:** bg shifts `rgba(0,0,0,1)` → `0.85`.

## 11. Variants
None.

## 12. Responsive behavior
- `lg:hidden` — only renders on < lg breakpoints.
- `maxHeight: 85vh` — keeps top of screen visible.
- Backdrop covers full viewport.

## 13. Tokens used
- `var(--radius-element)` close button + icon container radius
- `var(--text-xs)` header + footer text
- `var(--black-50, rgba(250,250,250,1))` footer bg
- Inline `borderRadius: '10px 10px 0 0'` sheet top corners (DS container radius)
- Inline shadows + colors

## 14. A11y rules
- Escape key closes ✅
- Close button has `aria-label="Close filters"` ✅
- Body scroll locked while open ✅
- **Gap:** no `role="dialog"` / `aria-modal="true"` on sheet panel — screen readers won't trap focus
- **Gap:** no focus trap implemented — Tab can leave the sheet
- **Gap:** no auto-focus on open (initial focus should land on close or first interactive)
- **Gap:** keyframe animations don't respect `prefers-reduced-motion`

## 15. Motion rules
- Backdrop `fadeIn 200ms ease-out`
- Sheet `slideUp 250ms cubic-bezier(0.16, 1, 0.3, 1)` (DS premium easing)
- Hover transitions on close button + CTA
- **No reduced-motion guard** — should snap-open on reduced motion

## 16. Anti-patterns ❌
- Don't render this on desktop — `lg:hidden` already gates, but if you wrap in your own layout, double-check.
- Don't pass a different `children` JSX than the desktop sidebar — defeats parity. Extract `sidebarContent` once.
- Don't omit `onClose` — sheet can't close.
- Don't put non-filter content as children — semantic creep.
- Don't nest sheets inside sheets.
- Don't use without ARIA dialog wiring → screen-reader UX is broken (Gap to fix).
- Don't override `maxHeight` — `85vh` is the designed safe area for status bar + safety.

## 17. REUSABILITY SCORE
**4/5 ⭐⭐⭐⭐** — Mandatory for any mobile-filter listing page. Loses one star for a11y gaps (no focus trap, no role="dialog", no reduced-motion).

## 18. Linked components
- **Parent organisms:** `ReportStorePage`, any listing organism with mobile filter trigger
- **Sibling molecule:** `SidebarPanel` (desktop counterpart sharing `children`)
- **Child atoms:** `Badge`
- **Icons:** lucide X, SlidersHorizontal

## 19. Reasons + Decisions log
- **Why bottom sheet not center modal?** Fitts's Law thumb reach + mobile-native pattern (iOS/Android/most apps use bottom sheets).
- **Why `maxHeight: 85vh`?** Status bar (notch / camera island) + URL bar typically take 10-15%; 85% leaves a slim peek of background to signal "this is overlay, not page".
- **Why drag handle pill at top?** Universal "you can swipe this" affordance, even though current code doesn't implement swipe-to-dismiss (Gap: future feature).
- **Why "Filters" header uppercase tracked?** Matches `FilterAccordion` heading style — consistent visual vocabulary.
- **Why Show CTA shows result count?** Anchoring: "Show 142 reports" tells user the change. Empty trigger = "Show 0 reports" = sign to clear filters.
- **Why escape via window listener vs `onKeyDown` on panel?** Panel may not have focus if focus trap missing; window listener fires regardless.
- **Why body scroll lock toggles `overflow: hidden` on body?** Standard sheet pattern; alternatives (position:fixed) cause scroll-jump artifacts.
- **Why backdrop click closes but no swipe-down?** v1 simplification. Swipe-down gesture handler would mirror iOS sheet behavior; future enhancement.
- **Why `onClearAll` + `onClose` chained (line 180)?** Clearing while sheet open is wasteful; user expects filter+close as one action when they hit "clear all".
- **Why animations inline `<style>` not CSS file?** Local keyframes scoped to molecule; reduces DS CSS surface. Tradeoff: re-injects on each render (cheap).
- **Why inline rgba instead of tokens for the panel bg `rgba(255,255,255,1)`?** OG inline-rgba philosophy; would benefit from `--color-surface` token.
- **Why no swipe-down dismiss gesture?** Not yet implemented (Gap). User has 3 close paths: X button, backdrop, escape, Show CTA.
- **Why use of `Badge` for activeCount?** Visual unification across header chips and badges; size="xs" theme="neutral" matches.
