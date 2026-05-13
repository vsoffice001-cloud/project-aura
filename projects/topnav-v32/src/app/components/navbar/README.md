# @kenresearch/navbar

Ken Research's site-wide navigation system, built with Atomic Design methodology in React + Tailwind CSS v4.

## Quick Start

```tsx
// 1. Import what you need
import { SkipLink, LogoButton } from '@kenresearch/navbar/atoms';
import { SecondaryBar, DesktopNavItems, MobileControls } from '@kenresearch/navbar/organisms';
import { useNavDropdown, useAuthPopover, useMobileMenu } from '@kenresearch/navbar';
import type { NavItemConfig, MegaMenuEntry } from '@kenresearch/navbar/types';

// 2. Configure nav items
const NAV_ITEMS: NavItemConfig[] = [
  { id: 'reports', label: 'Reports' },
  { id: 'industries', label: 'Industries' },
];

// 3. Configure mega menus (your own components)
const MEGA_MENUS: MegaMenuEntry[] = [
  { id: 'reports', render: (isOpen) => <ReportsDropdown isOpen={isOpen} /> },
];

// 4. Assemble in your layout
function NavLayout() {
  const dropdown = useNavDropdown();
  const authPopover = useAuthPopover();
  const mobileMenu = useMobileMenu();

  return (
    <>
      <SkipLink />
      <SecondaryBar
        activeDropdown={dropdown.activeDropdown}
        onMouseEnter={dropdown.handleMouseEnter}
        onMouseLeave={dropdown.handleMouseLeave}
        onKeyDown={dropdown.handleKeyDown}
        isAuthenticated={false}
        companyDropdown={<YourCompanyDropdown />}
      />
      <nav>
        <LogoButton onClick={() => navigate('/')}>
          <YourLogo />
        </LogoButton>
        <DesktopNavItems
          items={NAV_ITEMS}
          activeDropdown={dropdown.activeDropdown}
          onMouseEnter={dropdown.handleMouseEnter}
          onKeyDown={dropdown.handleKeyDown}
          ctaButton={<YourCTAButton />}
        />
      </nav>
    </>
  );
}
```

## Package Boundary

### What's inside the package

| Layer      | Components                                                            |
|------------|-----------------------------------------------------------------------|
| Atoms (7)  | NavLink, LogoButton, DropdownChevron, IndicatorDot, HamburgerIcon, NavDivider, SkipLink |
| Molecules (6) | NavDropdownTrigger, CompanyTrigger, SearchBar, AuthAvatar, PopoverMenuItem, AuthButtons |
| Organisms (4+1) | SecondaryBar, DesktopNavItems, MobileControls, AuthPopover, popover-icons |
| Hooks (3)  | useNavDropdown, useAuthPopover, useMobileMenu                         |
| Types (4)  | NavUser, AuthPopoverConfig, NavItemConfig, MegaMenuEntry              |

### What the consumer provides (injection points)

| Slot                   | Injected via                          | Example                                |
|------------------------|---------------------------------------|----------------------------------------|
| Logo                   | `LogoButton` children                 | `<LogoButton><YourLogo /></LogoButton>`|
| CTA button             | `DesktopNavItems` `ctaButton` prop    | `ctaButton={<Button variant="brand" />}` |
| Company dropdown       | `SecondaryBar` `companyDropdown` prop | `companyDropdown={<CompanyDropdown />}` |
| Mega menu panels       | `MegaMenuEntry[]` render functions    | `{ id: 'reports', render: (isOpen) => <Panel /> }` |
| Nav items              | `NavItemConfig[]`                     | `[{ id: 'reports', label: 'Reports' }]` |
| Mobile menu            | Separate component (not in package)   | Consumer renders alongside navbar      |
| Auth context           | Consumer hooks into AuthPopoverConfig | Consumer calls useAuth() in layout     |
| Router                 | Consumer provides navigate/Outlet     | Consumer uses react-router             |

### What's NOT in the package

- `NavLayout.tsx` — template/orchestration (consumer-owned)
- Mega menu dropdown content (Reports, Industries, etc.)
- `CompanyDropdown` — injected via render prop
- DS `Button` component — injected via `ctaButton` slot
- `MobileMenu` / `PushMenu` — separate component system
- `AuthContext` — app-level state management
- `LogoContainer` — asset import
- `AuthLayout` + auth screens — separate auth flow

## Peer Dependencies

| Package               | Version   | Used by                  |
|-----------------------|-----------|--------------------------|
| `react`               | >= 18.0.0 | All components           |
| `react-dom`           | >= 18.0.0 | All components           |
| `motion`              | >= 12.0.0 | AuthPopover animations   |
| `@phosphor-icons/react` | >= 2.0.0 | SearchBar (MagnifyingGlass) |

## CSS Requirements

The consuming app must provide:

1. **`font-nav` utility class** — maps to `font-family: 'DM Sans', sans-serif`
2. **`nav-container` utility class** — responsive centered container (max 1440px, progressive padding)
3. **CSS custom properties** from `theme.css`:
   - `--nav-primary-text`, `--nav-helper-text`, `--nav-menu-item`, `--nav-section-header`
   - `--nav-lh-primary`, `--nav-lh-helper`, `--nav-lh-menu`
   - Color variables used by components
4. **Tailwind CSS v4** — all components use Tailwind utility classes

## Exports

```tsx
// Top-level barrel (everything)
import { NavLink, SecondaryBar, useNavDropdown } from '@kenresearch/navbar';

// Layer-specific
import { NavLink, LogoButton } from '@kenresearch/navbar/atoms';
import { SearchBar, AuthAvatar } from '@kenresearch/navbar/molecules';
import { SecondaryBar, DesktopNavItems } from '@kenresearch/navbar/organisms';

// Hooks (individual)
import { useNavDropdown } from '@kenresearch/navbar/hooks/useNavDropdown';
import { useAuthPopover } from '@kenresearch/navbar/hooks/useAuthPopover';
import { useMobileMenu } from '@kenresearch/navbar/hooks/useMobileMenu';

// Types
import type { NavUser, AuthPopoverConfig, NavItemConfig, MegaMenuEntry } from '@kenresearch/navbar/types';
```

## Documentation

| Document           | Purpose                                              |
|--------------------|------------------------------------------------------|
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Internal architecture, layer rules, data flow |
| [NAVBAR_USAGE.md](./NAVBAR_USAGE.md) | Props, code examples, states matrix          |
| [CONSISTENCY.md](./CONSISTENCY.md)   | Full-site consistency rules and contracts    |
| [TESTING.md](./TESTING.md)           | 106 test cases across all layers             |
| [CHANGELOG.md](./CHANGELOG.md)       | Phase-by-phase change history                |

## Design Decisions

- **Hand-rolled SVGs** in `popover-icons.tsx`, `AuthButtons.tsx`, `AuthAvatar.tsx`, `DropdownChevron.tsx` are intentional — do not replace with an icon library
- **SearchBar** using Phosphor's `MagnifyingGlass` is a deliberate one-off exception
- **`AuthButtons` not refactored to `NavLink`** — the Sign-in custom SVG + Sign-up outlined pattern don't fit the NavLink atom cleanly
- **Desktop breakpoint at 1024px (lg)** instead of 768px — 5 triggers + search + CTA need ~890px minimum

## License

Private — Ken Research internal use only.
