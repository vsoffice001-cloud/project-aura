# Navbar Changelog

All notable changes to the navbar component system.

---

## Phase 7 — Design System Integration (Feb 2026)

### Added
- **`/src/design-system/`** — new top-level design system directory:
  - `tokens.ts` — JS mirror of `theme.css`, fully synced: z-index 45-101 navbar stack (was 0-300), breakpoints including 1024px (was missing), nav height 40+60=100px (was 80px), font scale base=13px (was 16px), border radius 2xs-2xl (was xs-lg), all shadow variants
  - `components/Avatar.tsx` — promoted from `AuthAvatar`, generic interface (`initials` prop instead of `user` object)
  - `components/Button.tsx` — relocated from `ds/Button.tsx`, fixed `font-['DM_Sans']` → `font-nav`
  - `components/Divider.tsx` — promoted from `NavDivider`, added `orientation` and `variant` props
  - `components/MenuItem.tsx` — promoted from `PopoverMenuItem`, identical interface
  - `components/SkipLink.tsx` — promoted from navbar `SkipLink`, added `targetId` and `label` props
  - `components/StatusDot.tsx` — promoted from `IndicatorDot`, added `borderColor` prop
  - `components/TextLink.tsx` — promoted from `NavLink`, identical interface
  - `components/index.ts` — component barrel with inventory JSDoc
  - `index.ts` — top-level barrel exporting all tokens + components + types

### Changed
- **Navbar atoms → DS re-exports:**
  - `NavLink.tsx` → re-exports `TextLink` from DS
  - `IndicatorDot.tsx` → re-exports `StatusDot` from DS
  - `NavDivider.tsx` → thin wrapper forwarding `className` to DS `Divider`
  - `SkipLink.tsx` → re-exports `SkipLink` from DS
- **Navbar molecules → DS re-exports/adapters:**
  - `AuthAvatar.tsx` → thin adapter mapping `user?.initials` → DS `Avatar.initials` prop
  - `PopoverMenuItem.tsx` → re-exports `MenuItem` from DS
- **`ds/Button.tsx`** → re-export from `/src/design-system/components/Button.tsx`
- **`ui/index.ts`** → consolidated from dual barrel (index.ts + index.tsx) into single classified barrel, deleted redundant `index.tsx`
- **`ARCHITECTURE.md`** → added DS Status column to component inventory, added Design System Integration section
- **`NAVBAR_USAGE.md`** → added DS integration notes for Atoms and Molecules sections
- **`COPY_TO_NEW_PROJECT.md`** → full rewrite: updated from monolithic App.tsx to NavLayout + TopNavigation architecture, added DS directory, auth context, React Router setup, correct package list

### Import Stability
All existing navbar import paths remain unchanged. The files at `atoms/NavLink.tsx`, `molecules/AuthAvatar.tsx`, etc. are now thin re-exports. No consumer code changes required.

---

## Phase 6 — Package (Feb 2026)

### Added
- **`TopNavigation` organism** — single drop-in component for the entire top navigation experience:
  - Calls `useNavDropdown`, `useAuthPopover`, `useMobileMenu` internally
  - Renders SkipLink + ARIA live region + SecondaryBar + sticky section (backdrop + PrimaryNav + mega menus + mobile menu)
  - Accepts clean injection props: `logo`, `ctaButton`, `companyDropdown()`, `mobileMenu()`, `megaMenus[]`, `items[]`
  - Consumer only provides: auth state, navigation callback, sign-out callback, content slots
  - Zero template boilerplate — any page can add the full nav with one `<TopNavigation ... />` call
- **`PrimaryNav` organism** — extracted from inline JSX in NavLayout:
  - Owns `LogoButton` + `MobileControls` + `DesktopNavItems` composition
  - Accepts `logo` and `ctaButton` as injection slots
- **`package.json`** — defines `@kenresearch/navbar` package with:
  - Subpath exports: `.`, `./atoms`, `./molecules`, `./organisms`, `./hooks/*`, `./types`
  - Peer dependencies: `react >= 18`, `motion >= 12`, `@phosphor-icons/react >= 2`
  - `sideEffects: false` for tree-shaking
- **`README.md`** — consumer-facing package documentation:
  - Quick start integration guide
  - Package boundary definition (what's in, what's out, injection points)
  - Peer dependency table
  - CSS requirements (`.font-nav`, `.nav-container`, theme tokens)
  - Export map examples
  - Design decisions reference

### Changed
- **`SecondaryBar`** — removed hard import of `CompanyDropdown`. Now accepts `companyDropdown?: ReactNode` prop (injected from TopNavigation). Zero cross-boundary imports.
- **`DesktopNavItems`** — removed hard import of DS `Button`. Now accepts `ctaButton?: ReactNode` prop (injected from PrimaryNav). Zero cross-boundary imports.
- **`NavLayout`** — refactored from ~90-line template to ~30-line thin routing shell. Now just renders `<TopNavigation ... />` + `<main><Outlet /></main>`. All nav orchestration moved into TopNavigation.
- **`NAVBAR_USAGE.md`** — comprehensive rewrite:
  - Added full device-by-device responsive breakdown (Mobile, Tablet, Desktop, Wide)
  - Added ASCII layout diagrams for each breakpoint
  - Added responsive component visibility matrix
  - Added height & z-index stack reference
  - Added interaction patterns by device (hover, touch, keyboard, dismiss)
  - Added TopNavigation props table and drop-in quick start
  - Updated architecture tree to reflect TopNavigation + PrimaryNav
- **`ARCHITECTURE.md`** — updated data flow diagram, component inventory, file map, and total counts

### Verified
- **Zero cross-boundary imports** — `grep` for `../../` imports across all navbar `*.tsx` files returns 0 matches. The package is fully self-contained.

---

## Phase 5 — Test Specification (Feb 2026)

### Added
- **`TESTING.md`** — 106 test cases across 8 categories:
  - Hook tests (17 + 11 + 7 = 35 cases for useNavDropdown, useAuthPopover, useMobileMenu)
  - Atom tests (25 cases across 7 atoms including LogoButton)
  - Molecule tests (24 cases across 6 molecules including CompanyTrigger)
  - Organism tests (21 cases across 4 organisms)
  - Integration tests (18 cases for NavLayout, auth flow, cross-page consistency)
  - Accessibility tests (18 cases for keyboard, ARIA, screen reader, focus management)
  - Visual regression checkpoints (11 viewport/state combinations)
  - Implementation notes (stack, mocking, file conventions)

## Phase 4 — Document (Feb 2026)

### Added
- **`ARCHITECTURE.md`** — internal reference: atomic design layer rules, component inventory with line counts, data flow diagram, configuration system, styling architecture, accessibility matrix, file map.
- **`CHANGELOG.md`** — structured reverse-chronological log of all changes across phases.
- **`CONSISTENCY.md`** — full-site consistency guide: layout architecture (NavLayout vs AuthLayout), container alignment rules, typography/color/spacing contracts, responsive breakpoint contract with the nav, z-index stack, accessibility contract, page integration patterns, known inconsistencies table.

### Changed
- **`NAVBAR_USAGE.md`** — comprehensive rewrite reflecting all Phase 2-3 additions: LogoButton atom, CompanyTrigger molecule, shared types table, NavItemConfig/MegaMenuEntry configuration with code examples, DesktopNavItems custom items override, `.font-nav` utility, cross-links to ARCHITECTURE.md and CHANGELOG.md.

---

## Phase 3 — Decouple (Feb 2026)

### Added
- **`LogoButton` atom** (`atoms/LogoButton.tsx`) — Extracted 15-line inline logo button from NavLayout. Accepts `onClick`, `children`, and optional `ariaLabel`.
- **`CompanyTrigger` molecule** (`molecules/CompanyTrigger.tsx`) — Extracted 20-line inline Company dropdown trigger from SecondaryBar. Accepts injectable `dropdown` render prop for the panel content.
- **`NavItemConfig` type** — `{ id, label }` descriptor for primary nav items.
- **`MegaMenuEntry` type** — `{ id, render }` injectable mega menu renderer.
- **`NAV_ITEMS` config array** in NavLayout — single source of truth for primary nav items.
- **`MEGA_MENUS` config array** in NavLayout — maps dropdown IDs to mega menu components via render functions.
- **`items` prop on `DesktopNavItems`** — optional override for nav item configuration (defaults to built-in 5 items).

### Changed
- **NavLayout** — replaced inline logo button with `<LogoButton>`, replaced 5 hardcoded mega menu JSX elements with `MEGA_MENUS.map()`, imports `NavItemConfig`/`MegaMenuEntry` types.
- **SecondaryBar** — replaced 20-line inline Company trigger markup with `<CompanyTrigger>` molecule. Removed `DropdownChevron` direct import.
- **DesktopNavItems** — `NAV_ITEMS` array moved to default prop value, accepts `items?: NavItemConfig[]`.
- **CompanyDropdown** — applied `font-nav` utility (5 instances of `font-['DM_Sans',sans-serif]` replaced).
- **Barrel exports** — added `LogoButton`, `CompanyTrigger`, `NavItemConfig`, `MegaMenuEntry`.

---

## Phase 2 — Standardize (Feb 2026)

### Added
- **`types.ts`** (`/src/app/components/navbar/types.ts`) — shared type definitions:
  - `NavUser` — `{ name, email, initials }` replacing 3 duplicate interfaces.
  - `AuthPopoverConfig` — full popover state/handlers/refs replacing 2 inline prop types.
- **`.font-nav` CSS utility** in `theme.css` — single-point font family control for all navbar components.

### Changed
- **13 files** — replaced `font-['DM_Sans',sans-serif]` with `font-nav` class across all navbar atoms, molecules, and organisms:
  - Atoms: `NavLink`, `SkipLink`
  - Molecules: `AuthAvatar`, `AuthButtons`, `NavDropdownTrigger`, `SearchBar`, `PopoverMenuItem`
  - Organisms: `SecondaryBar`, `AuthPopover`
- **SecondaryBar** — replaced `SecondaryBarUser` with `NavUser`, replaced inline authPopover type with `Pick<AuthPopoverConfig, ...>`.
- **MobileControls** — replaced `MobileControlsUser` with `NavUser`, replaced inline authPopover type with `Pick<AuthPopoverConfig, ...>`.
- **AuthPopover** — replaced `AuthPopoverUser` with `NavUser`.
- **Barrel export** — added `NavUser`, `AuthPopoverConfig` type exports.

### Removed
- `SecondaryBarUser` interface (SecondaryBar.tsx)
- `MobileControlsUser` interface (MobileControls.tsx)
- `AuthPopoverUser` interface (AuthPopover.tsx)

---

## Phase 1 — Fix Bugs / Dead Code (Feb 2026)

### Fixed
- **`SearchBar`** — removed vestigial `searchIconPath` prop that was never consumed (Phosphor `MagnifyingGlass` is used directly).
- **`DropdownChevron`** — removed dead dynamic Tailwind class that was unreachable.
- **`useNavDropdown`** — converted hover timeout from `useState` to `useRef` to avoid unnecessary re-renders. Added `useEffect` cleanup on unmount to prevent timeout leaks.

### Notes
- A React Fast Refresh "Should have a queue" error appeared after the `useState` to `useRef` change. Resolved with a trivial whitespace edit to `NavLayout.tsx` to force a clean re-mount. No actual code bug.

---

## Phase 0 — Atomic Decomposition (Feb 2026)

### Added
- Full atomic design decomposition of monolithic `NavLayout.tsx` (579 lines) into:
  - 6 atoms: `NavLink`, `DropdownChevron`, `IndicatorDot`, `HamburgerIcon`, `NavDivider`, `SkipLink`
  - 5 molecules: `NavDropdownTrigger`, `SearchBar`, `AuthAvatar`, `PopoverMenuItem`, `AuthButtons`
  - 4 organisms + 1 utility: `SecondaryBar`, `DesktopNavItems`, `MobileControls`, `AuthPopover`, `popover-icons`
  - 3 hooks: `useNavDropdown`, `useAuthPopover`, `useMobileMenu`
  - Barrel exports at each layer + top-level
  - `NAVBAR_USAGE.md` documentation
- NavLayout reduced to ~95-line thin orchestration template.