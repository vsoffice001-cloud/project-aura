# Navbar Architecture

> Internal architecture reference for the Ken Research navigation system.
> For usage examples and prop tables, see [NAVBAR_USAGE.md](./NAVBAR_USAGE.md).

---

## Design Methodology

**Atomic Design** (Brad Frost) — components are classified into atoms, molecules, organisms, and one template (NavLayout). Each layer has strict dependency rules:

| Layer     | May import from         | May NOT import from     |
|-----------|-------------------------|-------------------------|
| Atoms     | Nothing (self-contained)| Molecules, Organisms    |
| Molecules | Atoms                   | Organisms               |
| Organisms | Atoms, Molecules        | Other Organisms (except AuthPopover, which is embedded) |
| Template  | Atoms, Organisms, Hooks | Direct atom/molecule usage (delegates to organisms)     |

---

## Component Inventory

### Atoms (7) — `/src/app/components/navbar/atoms/`

| Component        | Lines | Responsibility                                    | DS Status |
|------------------|-------|---------------------------------------------------|-----------|
| `NavLink`        | re-export | Text link with size variants, hover, focus ring | Re-exports `TextLink` from DS |
| `DropdownChevron`| ~25   | Animated rotating chevron SVG (10px / 12px)       | Navbar-only |
| `IndicatorDot`   | re-export | Notification circle (red dot on avatar)         | Re-exports `StatusDot` from DS |
| `HamburgerIcon`  | ~20   | 3-bar to X-cross animation                        | Navbar-only |
| `NavDivider`     | re-export | 1px horizontal separator                        | Re-exports `Divider` from DS |
| `SkipLink`       | re-export | WCAG skip-to-content (sr-only until focused)    | Re-exports `SkipLink` from DS |
| `LogoButton`     | ~25   | Clickable logo wrapper with hover/focus states    | Navbar-only |

### Molecules (6) — `/src/app/components/navbar/molecules/`

| Component            | Lines | Composes                             | DS Status |
|----------------------|-------|--------------------------------------|-----------|
| `NavDropdownTrigger` | ~50   | DropdownChevron + gradient underline | Navbar-only |
| `SearchBar`          | ~55   | Phosphor MagnifyingGlass + beam animation | Navbar-only |
| `AuthAvatar`         | adapter | IndicatorDot + person SVG / initials | Thin adapter around DS `Avatar` |
| `PopoverMenuItem`    | re-export | Icon slot + label + optional subtitle | Re-exports `MenuItem` from DS |
| `AuthButtons`        | ~50   | Sign-in link + Sign-up outlined button | Navbar-only |
| `CompanyTrigger`     | ~35   | DropdownChevron + injectable dropdown slot | Navbar-only |

### Organisms (4 + 1 utility) — `/src/app/components/navbar/organisms/`

| Component        | Lines | Composes                                    |
|------------------|-------|---------------------------------------------|
| `TopNavigation`  | ~160  | SkipLink, SecondaryBar, PrimaryNav, all 3 hooks, backdrop overlay, mega menu loop |
| `PrimaryNav`     | ~40   | LogoButton, MobileControls, DesktopNavItems |
| `SecondaryBar`   | ~65   | NavLink, CompanyTrigger, AuthButtons, AuthAvatar, AuthPopover |
| `DesktopNavItems`| ~45   | NavDropdownTrigger x N, SearchBar, CTA slot |
| `MobileControls` | ~55   | AuthAvatar, AuthPopover, HamburgerIcon      |
| `AuthPopover`    | ~85   | NavDivider, PopoverMenuItem, popover-icons  |
| `popover-icons`  | ~60   | 6 hand-rolled SVG icon components (intentional, not library) |

### Hooks (3) — `/src/app/components/navbar/hooks/`

| Hook              | Lines | State managed                              |
|-------------------|-------|--------------------------------------------|
| `useNavDropdown`  | ~95   | Active dropdown, hover debounce, keyboard, ARIA announcements, touch detection |
| `useAuthPopover`  | ~55   | Popover open/close, 3-ref outside-click detection |
| `useMobileMenu`   | ~42   | Menu open/close, body scroll lock          |

### Shared Types — `/src/app/components/navbar/types.ts`

| Type               | Purpose                                          |
|--------------------|--------------------------------------------------|
| `NavUser`          | `{ name, email, initials }` — shared user shape  |
| `AuthPopoverConfig`| Full popover state + handlers + 3 refs           |
| `NavItemConfig`    | `{ id, label }` — primary nav item descriptor    |
| `MegaMenuEntry`    | `{ id, render }` — injectable mega menu renderer |

---

## Data Flow

```
NavLayout (Template) — thin routing shell
│
└─> TopNavigation (drop-in organism — owns all nav state)
    │
    ├── useNavDropdown() ──────────────────────┐
    ├── useAuthPopover() ──────────────┐       │
    ├── useMobileMenu() ─────────┐    │       │
    │                             │    │       │
    ├─> SecondaryBar              │    │       │
    │   ├── dropdown handlers ◄───┼────┼───────┘
    │   ├── authPopoverConfig ◄───┼────┘
    │   └── CompanyTrigger        │
    │       └── companyDropdown() (injected render fn)
    │                             │
    ├─> PrimaryNav                │
    │   ├─> MobileControls        │
    │   │   ├── mobileMenu ◄──────┘
    │   │   ├── authPopoverConfig
    │   │   └── AuthPopover
    │   │
    │   └─> DesktopNavItems
    │       ├── items: NavItemConfig[] (configurable)
    │       ├── dropdown handlers
    │       └── ctaButton (injected ReactNode)
    │
    ├─> megaMenus.map(render) ── MegaMenuEntry[]
    │   (each mega menu rendered by ID match)
    │
    └─> mobileMenu() (injected render fn)
```

**Key pattern:** All state lives in hooks, called once inside TopNavigation. Sub-organisms receive state via props. No sub-organism holds its own state. NavLayout only provides auth context + route navigate + injected content slots.

---

## Configuration System

NavLayout defines two configuration arrays as its single source of truth:

```tsx
// Primary nav items — drives DesktopNavItems triggers
const NAV_ITEMS: NavItemConfig[] = [
  { id: 'reports', label: 'Reports' },
  { id: 'industries', label: 'Industries' },
  // ...
];

// Mega menus — maps dropdown IDs to React components
const MEGA_MENUS: MegaMenuEntry[] = [
  { id: 'reports', render: (isOpen) => <ReportsDropdown isOpen={isOpen} /> },
  // ...
];
```

To add/remove/reorder nav items, edit these arrays. `DesktopNavItems` also accepts an `items` prop for override scenarios.

---

## Styling Architecture

### Font Utility
All navbar components use the `.font-nav` CSS utility class (defined in `theme.css`) instead of inline `font-['DM_Sans',sans-serif]`. This is the single point of control for the navbar font family.

### Design Tokens
Font sizes, line heights, and spacing reference CSS custom properties from `theme.css`:
- `--nav-primary-text` (14px), `--nav-helper-text` (12px), `--nav-menu-item` (13px)
- `--nav-lh-primary`, `--nav-lh-helper`, `--nav-lh-menu`
- Color palette: `--color-primary-black`, `--color-secondary-grey`, `--color-red`, etc.

A JS mirror of all theme.css tokens lives at `/src/design-system/tokens.ts` for programmatic access (charts, canvas, runtime calculations). The CSS custom properties remain the authoritative source.

### Design System Integration (Phases 1–3 complete)

Six generic components were promoted from the navbar package into `/src/design-system/components/`:

| Navbar name       | DS name     | Relationship |
|-------------------|-------------|--------------|
| `NavLink`         | `TextLink`  | Re-export (alias) |
| `IndicatorDot`    | `StatusDot` | Re-export (alias) |
| `NavDivider`      | `Divider`   | Thin wrapper (forwards `className`) |
| `SkipLink`        | `SkipLink`  | Re-export (identical name) |
| `AuthAvatar`      | `Avatar`    | Thin adapter (`user?.initials` → `initials` prop) |
| `PopoverMenuItem` | `MenuItem`  | Re-export (alias) |

The DS `Button` was also relocated from `/src/app/components/ds/Button.tsx` to `/src/design-system/components/Button.tsx`, with the original file converted to a re-export.

**Import stability:** All existing navbar import paths (`../atoms/NavLink`, `../molecules/AuthAvatar`, etc.) remain stable — the files at those paths are now thin re-exports/adapters. No consumer code changes needed.

**New code should import directly from the DS:**
```tsx
import { Avatar, Divider, TextLink, MenuItem } from '../../design-system/components';
```

### Hand-Rolled SVGs (Intentional)
The following components use custom SVG paths by design decision — do NOT replace with an icon library:
- `popover-icons.tsx` — 6 auth popover menu icons
- `AuthButtons.tsx` — Sign-in (login arrow) and Sign-up (person+) icons
- `AuthAvatar.tsx` — Person silhouette for unauthenticated state
- `DropdownChevron.tsx` — Animated chevron with two size variants

The `SearchBar` using Phosphor's `MagnifyingGlass` is a deliberate one-off exception.

---

## Accessibility

| Feature                    | Implementation                                |
|----------------------------|-----------------------------------------------|
| Skip-to-content            | `SkipLink` atom (sr-only, visible on focus)   |
| ARIA live announcements    | `useNavDropdown` sets announcement text        |
| Focus-visible rings        | All interactive atoms/molecules               |
| `aria-expanded`/`aria-haspopup` | All dropdown triggers + avatar buttons   |
| `role="menu"`/`role="menuitem"` | AuthPopover + PopoverMenuItem            |
| Touch detection            | `useNavDropdown` prevents hover-on-touch      |
| 44px tap targets           | MobileControls hamburger, mobile PopoverMenuItems |
| Keyboard navigation        | Enter/Space toggle, Escape close              |

---

## File Map

```
/src/app/components/navbar/
├── atoms/
│   ├── DropdownChevron.tsx
│   ├── HamburgerIcon.tsx
│   ├── IndicatorDot.tsx
│   ├── LogoButton.tsx
│   ├── NavDivider.tsx
│   ├── NavLink.tsx
│   ├── SkipLink.tsx
│   └── index.ts
├── molecules/
│   ├── AuthAvatar.tsx
│   ├── AuthButtons.tsx
│   ├── CompanyTrigger.tsx
│   ├── NavDropdownTrigger.tsx
│   ├── PopoverMenuItem.tsx
│   ├── SearchBar.tsx
│   └── index.ts
├── organisms/
│   ├── AuthPopover.tsx
│   ├── DesktopNavItems.tsx
│   ├── MobileControls.tsx
│   ├── PrimaryNav.tsx
│   ├── SecondaryBar.tsx
│   ├── TopNavigation.tsx
│   ├── popover-icons.tsx
│   └── index.ts
├── hooks/
│   ├── useAuthPopover.ts
│   ├── useMobileMenu.ts
│   └── useNavDropdown.ts
├── types.ts
├── index.ts                  (barrel export)
├── ARCHITECTURE.md           (this file)
├── CHANGELOG.md
└── NAVBAR_USAGE.md
```

---

**Total:** 7 atoms + 6 molecules + 7 organisms (including popover-icons utility) + 3 hooks + 4 shared types + 1 template

---

## Related Documentation

| Document                                    | Purpose                                           |
|---------------------------------------------|---------------------------------------------------|
| [NAVBAR_USAGE.md](./NAVBAR_USAGE.md)        | Usage guide — props, code examples, states matrix |
| [CONSISTENCY.md](./CONSISTENCY.md)          | Full-site consistency rules — layout, typography, colors, spacing, z-index, a11y contracts |
| [TESTING.md](./TESTING.md)                  | Test specifications — 106 cases across hooks, atoms, molecules, organisms, integration, a11y |
| [CHANGELOG.md](./CHANGELOG.md)              | Phase-by-phase change history                     |