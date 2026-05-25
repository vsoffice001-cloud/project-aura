# Navbar — Organism Audit (OG)

**Source:** `Design_system_vs_26 (og and final)/src/app/components/Navbar.tsx` (501 LOC monolith · zero JSDoc · zero props · zero variants)
**Reuse tier:** ⭐⭐⭐⭐⭐ (5/5) — every page touches it
**Status:** Highest-priority organism · also the **worst-shaped one in the OG**

---

## 1. WHAT

Top fixed header for every page · multi-state w/ scroll-aware behavior · single React component holding two distinct visual modes (Hero-state vs Scrolled-state) plus mobile-menu drawer · plus secondary dark-bar plus in-page section nav. Five layouts in one file (Navbar.tsx:36–500).

---

## 2. WHY

- Ken needs continuous wayfinding across long scroll pages (case studies are 8+ section scrolls) — sticky w/ section-tracking solves it (Navbar.tsx:475–497 `activeSection` ribbon)
- Brand must establish at hero impression (dark accent bar w/ "Latest reports" promo at L57–146) · then collapse to utility mode after scroll
- Single CTA — `Schedule a Demo` brand button — must surface in hero state (L347–360) and mobile drawer (L457–466); other surfaces can let it ride only as floating Sticky-CTA
- Skip-to-content link (Navbar.tsx:43–48) is the only WCAG 2.4.1 skip-link in OG · navbar carries the burden
- Mobile-menu state · scroll-direction hide-on-scroll-down · hero-visibility two-state switch — all wired in one component because consumers shouldn't reconstruct any of this

---

## 3. WHEN to use ✅

- Every public Ken page · top of layout
- Case study pages (hero-state mode dominates the first viewport)
- PDP · listing · report-store home (scrolled-state mode dominates)
- Mobile · all breakpoints — has dedicated drawer

---

## 4. WHEN NOT to use ❌

- Admin / dashboard shells → use `DashboardLayout.tsx` (different IA · no public marketing nav)
- Modal / overlay views → modal already has its own header
- Embed contexts (iframe widgets) → use no chrome
- Inside a TopNav-aware product subsection that already has a contextual sub-navbar → use sub-navbar alone, don't double-stack

---

## 5. WHERE used (consumer file:line)

- `projects/v0-lite-report-legacy/src/app/components/Navbar.tsx` — full duplicate (legacy port, pre core-v2)
- `projects/report-store-legacy/src/app/components/Navbar.tsx` — duplicate
- `projects/topnav-v32/` — extracted standalone reference build
- Used implicitly at root of every page template in OG dashboard

---

## 6. HOW to implement

OG is **zero-prop** so consumers cannot configure anything (anti-pattern · sole reason it was forked per project). Worked usage:

```tsx
import { Navbar } from '@/app/components/Navbar';

export default function PageLayout({ children }) {
  return (
    <>
      <Navbar /> {/* fixed top · z-50 · 60px tall (collapsed) · 100px (hero state) */}
      <main id="main-content">{children}</main>
    </>
  );
}
```

Hero-state is auto-detected by `useHeroVisibility()` (Navbar.tsx:13) — fires off the existence of `#hero` (or similar) intersection. If your page lacks a hero section · navbar will permanently show scrolled-state. Section-nav ribbon hard-codes a 7-section list (L19–27).

---

## 7. Composition tree

```
Navbar
├─ <a href="#main-content"> skip-link  (L43–48)
├─ Secondary dark bar (hidden lg:block · only when isHeroVisible)
│   ├─ Latest reports promo (L65–80)
│   ├─ Procurement link (L89–94)
│   ├─ Company dropdown (L97–125)
│   └─ Login link (L128–142)
├─ Main white bar (always visible)
│   ├─ Logo SVG (L156–178)
│   ├─ Hero-state nav: Services · Industries · Resources · small-search (L183–249)
│   ├─ Scrolled-state nav: Services · Industries · wide-search (L250–304)
│   ├─ Hamburger (scrolled only · lg+) (L311–324)
│   ├─ Login (scrolled only · L327–344)
│   ├─ <Button variant="brand" size="sm">Schedule a Demo</Button>  (hero only · L347–360)
│   └─ Mobile hamburger (always <lg · L362–374)
├─ Mobile drawer (L381–469)
│   ├─ Services / Industries / Resources buttons w/ ChevronDown
│   ├─ Company submenu (Our Story / Experts / Careers / Contact)
│   ├─ Procurement + Login (hero-state mobile)
│   └─ <Button variant="brand" size="md" fullWidth>Schedule a Demo</Button>
└─ Section ribbon (L475–497 · scrolled-state · md+)
    └─ buttons per `sections[]` w/ activeSection highlight
```

**Atoms used:** `<Button>` (variant=brand) · `<ChevronDown>` (lucide)
**Hooks:** `useScrollDirection` · `useHeroVisibility` · `useActiveSection` (all three custom)
**Imports:** `svgPaths` from `@/imports/svg-fodxwe3cpi` (Figma-exported · logo + chevrons + login icon)

---

## 8. Properties · WHY each exists

**OG has ZERO props.** This is the central design flaw of this organism.

Implicit-internal "props" (all hard-coded — should be lifted):

| Implicit | Hard-coded value | Should be | Why |
|---|---|---|---|
| sections | 7-item case-study list (L19–27) | prop | reusable across page types |
| primary CTA label | "Schedule a Demo" (L357, 463) | prop | could be "Book a call" elsewhere |
| primary CTA variant | brand | prop | not every page is conversion-heavy |
| secondary bar promo | "India Makhana Market Outlook to 2030" (L68) | prop or fetch | hard-coded marketing copy |
| company dropdown items | 4 hard-coded links (L112–123) | prop or config | breaks if marketing changes IA |
| logo | inline SVG paths (L166–177) | static asset import | unmaintainable |
| z-index 50 | hard-coded (L38) | token | use `--z-navbar` |
| 60px / 56px navbar height | hard-coded (L151) | token | use `--navbar-height` |

---

## 9. Data contract

**OG: none.** Reads window scroll state + DOM section IDs only.

**Recommended (when porting to core-v2):**

```ts
export interface NavbarProps {
  sections?: { id: string; label: string }[]; // default: undefined → no ribbon
  cta?: { label: string; href?: string; onClick?: () => void; variant?: 'brand' | 'primary' };
  showSecondaryBar?: boolean;                  // default: true
  secondaryPromo?: { label: string; href: string };
  variant?: 'editorial' | 'cinematic';         // surface variant
  companyMenu?: { label: string; href: string }[]; // default: 4 OG items
  loginHref?: string;
  logoHref?: string;                           // default: '/'
}
```

Consumer responsibility: nothing. DS owns scroll-direction, hero-visibility, section-tracking, mobile-menu state, focus management.

---

## 10. States

- **Hero-visible · default:** dark secondary bar + main white bar + brand CTA right + no ribbon
- **Scrolled-down:** dark bar hidden · main bar shows hamburger + login + section ribbon · CTA gone (lives only at hero)
- **Scrolling down (hide-on-scroll):** entire navbar translates `-translate-y-full` (L38–40)
- **Scrolling up:** translates back to `translate-y-0` 300ms ease-in-out
- **Mobile menu open:** drawer expanded · main bar still visible · z-50
- **Section ribbon active:** clicked section button = black bg · others = 60% black on hover
- **Hovering company dropdown (>xl):** menu fades-in 200ms (L108)

**Missing states:** loading · error · empty (irrelevant for nav) · authenticated (login → user avatar swap — not built)

---

## 11. Variants

OG has implicit variants based on `isHeroVisible` boolean only · no explicit `variant` prop.

| Visual variant | Trigger | Where |
|---|---|---|
| Hero-state | `useHeroVisibility() === true` | top of any page w/ hero |
| Scrolled-state | `useHeroVisibility() === false` | mid-page |
| Mobile drawer | `showMobileMenu === true` | <lg breakpoints |

No light/dark surface variant — navbar is always light-white-bar w/ optional dark secondary strip. Cinematic-dark variant of navbar = **gap in OG**.

---

## 12. Responsive behavior

- **`<sm` (mobile):** white bar 56px · only hamburger right · drawer is full menu (L362–374, 381–469)
- **`sm`–`md`:** same as mobile but ribbon shows at md+ (L476: `hidden md:block`)
- **`lg` (1024px+):** desktop nav appears · CTA visible · dark secondary bar appears (L57: `hidden lg:block`)
- **`xl` (1280px+):** Company dropdown + Procurement + Login visible in dark bar (L91: `hidden xl:block`)
- **`>xl`:** "CTA here" badge in promo line shows (L71)

Padding scales: `px-4 sm:px-6 md:px-8` then absolute pixel offsets `lg:left-[40px]` / `lg:left-[48px]` / `lg:left-[76px]` (state-dependent · L159–161).

---

## 13. Tokens used

OG uses **mostly raw values · few tokens**:
- `--container-page` (L59 · L153 · L477) — the only well-tokenized value
- Raw hex: `#141016` (text) · `#f5f5fd` (search bg) · `#fcfcfc` (search inner) · `#D72B31` (logo accent) · `#806CE0` (purple glow rgba)
- Inline px: 12px / 14px / 16px / 22px font sizes (all literal · should be `--text-xs`, `--text-sm`, etc.)
- Custom shadow: `[0px_8px_12px_-4px_rgba(128,108,224,0.15)]` (purple-tint nav shadow · L50)
- `--text-xs` used once at L488 for ribbon font · everywhere else literal

**Token-discipline failure rate: ~90%.** Most-cited refactor target.

---

## 14. A11y rules (OG-built · documented gaps)

✅ Skip-to-content link (L43–48 · WCAG 2.4.1)
✅ Focus rings on Procurement link (L91 `focus:ring-2`)
✅ Mobile hamburger has `aria-label` (L316, 367)
✅ Section ribbon `aria-current="page"` for active (L489)

❌ No `<nav>` landmark (L36 is a `<div>` · should be `<nav aria-label="Primary">`)
❌ Company dropdown is hover-only (L99–100) · no keyboard activation · no `aria-expanded`
❌ Mobile drawer not trapped — Tab escapes to background page
❌ No `aria-controls` linking hamburger → drawer
❌ Logo SVG has no `<title>` / aria-label · invisible to AT
❌ Search "button" w/o button label (L225, 279) — fails axe `button-name` rule (Lighthouse audit 2026-05-13 caught this pattern · feedback_a11y_patterns.md)

---

## 15. Motion rules

- **Hide on scroll-down:** `transition-transform duration-300 ease-in-out` (L38)
- **Logo position shift (hero→scrolled):** `transition-all duration-300` (L157)
- **Company dropdown:** `transition-all duration-200` w/ opacity + translate-y-2 (L108–110)
- **Search hover:** `transition-all` shadow boost (L225, 279)
- **Mobile drawer:** `animate-in slide-in-from-top-2 duration-300` (L382)
- **Chevron rotate:** `group-hover:translate-y-0.5 transition-transform` (L193, 205, 218)

**Reduced-motion:** ❌ no `useReducedMotion()` · no `@media (prefers-reduced-motion)` opt-out. Hide-on-scroll-down WILL trigger vestibular distress on motion-sensitive users · DS-violation.

---

## 16. Anti-patterns ❌

- **Zero-prop monolith** — main reason consumers fork it per project · violates DRY (re-implemented 3× in `projects/*`)
- **Inline SVG paths from Figma export** (`@/imports/svg-fodxwe3cpi`) — opaque · unauditable · breaks on Figma re-export
- **Hard-coded sections array** (L19–27) — only valid for one case-study page
- **Hover-only dropdowns** — not keyboard accessible
- **Two near-identical 50-line nav clusters for hero vs scrolled states** (L183–249 vs L250–304) — should be one component w/ `compact` prop
- **Mixed Tailwind + inline-style + arbitrary classes** — token discipline failure
- **No SSR consideration** — `useState` at top w/o checking `typeof window` (L10–14)
- **`hidden lg:flex` chained anti-pattern** (L186) — Tailwind anti-pattern, should use single utility chain

---

## 17. REUSABILITY SCORE

**5/5 ⭐⭐⭐⭐⭐** — used everywhere · but **as written**, 0/5 maintainability. Per-project forks proliferated specifically because Navbar.tsx is unportable. Worked-examples reference: `projects/topnav-v32/` is a deliberate isolation of just-the-navbar so dev team can iterate without touching the OG monolith.

---

## 18. Linked components

- **Atoms:** `Button` (only DS atom used · L6) · `lucide ChevronDown`
- **Hooks (custom):** `useScrollDirection` · `useHeroVisibility` · `useActiveSection` (all in `@/app/hooks/`)
- **Sibling organisms:** `HeroSection.tsx` (sets `#hero` id that hero-visibility hook tracks) · `StickyCTA.tsx` (companion CTA · floats when navbar CTA is hidden)
- **Children:** `ReadingProgressBar.tsx` (separate organism · sits below navbar at scroll)
- **Inverse pairs:** `Footer` (n/a · OG lacks Footer organism · `DesignSystemDashboard.tsx` is the shell)

---

## 19. Composition rule (in a page recipe)

**Order:** Navbar is **always first** in any page body · OUTSIDE the main scroll container (it's `position: fixed`).

```
<Navbar />              ← order 0 · fixed · z-50
<main id="main-content"> ← order 1 · receives skip-link target
  <HeroSection />       ← MUST have id="hero" for useHeroVisibility to work
  ... other sections ...
  <FinalCTASection />
</main>
<ReadingProgressBar />  ← separate · top:0 below navbar via z-index
<StickyCTA />           ← bottom-right · z-40 (below navbar)
```

**Before:** nothing
**After:** `<HeroSection>` MUST be next (the contract for hero-visibility)

---

## 20. Reasons + Decisions log

- **Why fixed not sticky?** Sticky breaks at `position: sticky` ancestors w/ overflow · fixed always works at top of viewport · explicit choice
- **Why hide on scroll-down?** Maximize reading area for long-form case studies · re-shows on scroll-up so CTAs are 1 gesture away
- **Why two nav states (hero vs scrolled)?** Hero = brand impression (full IA + secondary promo bar) · scrolled = utility (compact + section nav). OG inline comments at L51–55 and L148–150 document the intent explicitly.
- **Why CTA at hero only?** Per OG inline comment L347 — "Only when AT hero". Avoids CTA-fatigue mid-scroll. `StickyCTA` carries scrolled state.
- **Why no `<nav>` landmark?** Likely oversight · zero defensive justification. **Gap.**
- **Why hard-code 7 sections?** Built for the canonical case-study layout · was never extracted to a prop. **Gap.**
- **Why purple-tint shadow `rgba(128,108,224,0.15)`?** Brand secondary purple `#806CE0` · adds depth without dark-shadow staleness · per Figma reference frame.
- **Why search-as-button not input?** OG renders search as a clickable button (L225, 279) that opens a separate search overlay — pattern not yet built · placeholder UX. Real search modal = future work.
- **Why Schedule-a-Demo not Book-a-call?** OG inline copy at L357. Ken design lead decision (per project_kenresearch_brief): demo is the funnel top, call is mid.
- **Why no auth state (avatar/profile)?** Public-marketing-only scope · auth lives in product app (`projects/ken-research-backend`). Public navbar stays minimal.
- **Why hamburger separate at lg (L311) and <lg (L362)?** Different visual states demand different placements · L311 sits next to logo in scrolled-state, L362 sits right in mobile. Should be unified w/ state-based positioning.

---

**Audit conclusion:** This is the **#1 refactor target** in OG. Re-write as `core-v2/organisms/Navbar.tsx` w/ explicit props · SVG logo as static asset · hooks lifted to DS package · keyboard-accessible dropdowns · reduced-motion-aware hide-on-scroll · proper `<nav>` landmark. Estimated effort: 1-2 days. Saves estimated 800+ LOC of duplication across `projects/*`.
