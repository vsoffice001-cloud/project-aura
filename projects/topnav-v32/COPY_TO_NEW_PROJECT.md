# Copy Navigation to New Figma Make Project

## Quick Start Guide

Follow these steps to copy the Ken Research navigation system to a new project.

---

## Step 1: Install Required Packages

```bash
# Core dependencies
pnpm install motion @phosphor-icons/react lucide-react react-router
```

| Package                 | Used by                                     |
|-------------------------|---------------------------------------------|
| `motion`                | TopNavigation backdrop, AuthPopover springs  |
| `@phosphor-icons/react` | SearchBar (MagnifyingGlass icon)            |
| `lucide-react`          | DS Button (Loader2 spinner)                 |
| `react-router`          | NavLayout routing (RouterProvider, Outlet)  |

---

## Step 2: Copy Files & Folders

### 2a. Styles (all files from `/src/styles/`)

```
/src/styles/
  fonts.css          # DM Sans font imports
  theme.css          # Design tokens, .font-nav utility, button vars (CRITICAL)
  tailwind.css       # Tailwind directives
  index.css          # Global styles (imports the above)
```

### 2b. Design System (`/src/design-system/` — entire folder)

```
/src/design-system/
  tokens.ts          # JS mirror of theme.css for programmatic access
  index.ts           # Top-level barrel export
  components/
    Avatar.tsx       # Circular avatar with initials + status dot
    Button.tsx       # Brand button (shimmer, ripple, 4 variants, 4 sizes)
    Divider.tsx      # Horizontal/vertical separator
    MenuItem.tsx     # Popover/dropdown menu row
    SkipLink.tsx     # WCAG skip-to-content link
    StatusDot.tsx    # Notification indicator circle
    TextLink.tsx     # Inline text link with hover transition
    index.ts         # Component barrel
```

### 2c. Navbar Package (`/src/app/components/navbar/` — entire folder)

```
/src/app/components/navbar/
  package.json       # @kenresearch/navbar — subpath exports, peer deps
  types.ts           # Shared types: NavUser, AuthPopoverConfig, NavItemConfig, MegaMenuEntry
  index.ts           # Barrel export
  atoms/             # 7 atoms (4 are DS re-exports: NavLink→TextLink, etc.)
  molecules/         # 6 molecules (3 are DS re-exports: AuthAvatar→Avatar, etc.)
  organisms/         # 6 organisms + popover-icons utility
  hooks/             # useNavDropdown, useAuthPopover, useMobileMenu
```

### 2d. Layout (`/src/app/components/layout/`)

```
/src/app/components/layout/
  NavLayout.tsx      # Thin routing shell: TopNavigation + <Outlet />
```

### 2e. Auth Context

```
/src/app/context/
  AuthContext.tsx     # Mock auth provider (isAuthenticated, user, login, logout)
```

### 2f. Mega Menu Dropdowns (consumer content)

```
/src/app/components/
  CompanyDropdown.tsx
  ConsultingDropdown.tsx
  IndustriesDropdown.tsx
  InsightsDropdown.tsx
  ReportsDropdown.tsx
  SurveyDropdown.tsx
```

Plus their supporting components:

```
  ConnectCard.tsx, ConnectCardCompact.tsx, FeaturedCard.tsx,
  FeaturedReportCard.tsx, GradientCTA.tsx, IndustryPanel.tsx,
  IndustryTile.tsx, QuizCard.tsx, ServiceCard.tsx,
  SolutionsPanel.tsx, StatsCard.tsx
```

### 2g. UI Components (`/src/app/components/ui/` — mega menu primitives)

```
/src/app/components/ui/
  index.ts             # Barrel with classified exports
  MegaMenuDropdown.tsx # Animated dropdown container
  DropdownSection.tsx  # Column section with title/icon
  DropdownItem.tsx     # Menu item (icon + label + desc)
  SectionHeader.tsx    # Uppercase section label
  Badge.tsx            # Status/category tag pill
  ... (see ui/index.ts for full inventory)
```

### 2h. Mobile Navigation (`/src/app/components/mobile/` — entire folder)

```
/src/app/components/mobile/
  MobileMenu.tsx
  PushMenu/
    PushMenuContainer.tsx
    PushMenuGoldStandard.tsx
    PushMenuHeader.tsx
    PushMenuPanel.tsx
    levels/           # Per-section mobile menu panels
    animations/       # Transition configs
```

### 2i. DS Button (legacy path — re-export)

```
/src/app/components/ds/
  Button.tsx           # Re-exports from /src/design-system/components/Button.tsx
```

### 2j. Figma Imports (`/src/imports/` — entire folder)

```
/src/imports/
  LogoContainer.tsx    # Logo component
  svg-*.ts             # SVG path data files
```

### 2k. Data Files

```
/src/data/
  industries.tsx       # Industry navigation data
```

---

## Step 3: Set Up Routing

Create `/src/app/routes.ts`:

```tsx
import { createBrowserRouter } from 'react-router';
import { NavLayout } from './components/layout/NavLayout';
import { HomePage } from './pages/HomePage'; // your page

export const router = createBrowserRouter([
  {
    path: '/',
    Component: NavLayout,
    children: [
      { index: true, Component: HomePage },
      // Add more routes here
    ],
  },
]);
```

Set up `/src/app/App.tsx`:

```tsx
import { RouterProvider } from 'react-router';
import { router } from './routes';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
```

That's it. `NavLayout` renders `<TopNavigation />` + `<Outlet />`. One component gives you everything: SkipLink, ARIA announcements, secondary bar, sticky primary nav, backdrop overlay, mega menus, mobile menu, and all keyboard/hover/touch interactions.

---

## Step 4: Verify Styling

Ensure your styles import chain is correct:

**`/src/styles/index.css`:**
```css
@import './tailwind.css';
@import './fonts.css';
@import './theme.css';
```

**Critical:** `theme.css` defines `.font-nav`, `--nav-*` custom properties, `--button-*` tokens, and the full color/spacing/shadow/radius system. Without it, nothing renders correctly.

---

## Step 5: Verification Checklist

### Visual
- [ ] Secondary bar visible at >= 768px (40px, #fafafa bg)
- [ ] Primary nav 60px, sticky, white bg, purple shadow
- [ ] Logo displays correctly
- [ ] All 5 dropdown triggers visible at >= 1024px
- [ ] Search bar with purple beam animation
- [ ] CTA button with red gradient + shimmer

### Interaction
- [ ] Hover opens mega menu dropdowns (desktop)
- [ ] 100ms debounce on mouse leave
- [ ] Backdrop blur behind open mega menu
- [ ] Mobile hamburger at < 1024px
- [ ] Push menu slides from right
- [ ] Auth avatar with popover (both logged-in and logged-out states)

### Responsive
- [ ] Mobile (< 768px): Logo + avatar + hamburger only
- [ ] Tablet (768–1023px): Secondary bar + hamburger (no desktop triggers)
- [ ] Desktop (>= 1024px): Full navigation with mega menus

### Accessibility
- [ ] Skip-to-content link visible on Tab
- [ ] ARIA live announcements on dropdown open/close
- [ ] Enter/Space toggle dropdowns, Escape closes
- [ ] Focus-visible rings on all interactive elements
- [ ] 44px minimum tap targets on mobile

---

## Architecture Quick Reference

```
NavLayout (Template — thin routing shell)
└─> TopNavigation (Organism — owns all nav state via 3 hooks)
    ├── SkipLink (DS)
    ├── ARIA live region
    ├── SecondaryBar (Organism)
    │   ├── NavLink x 2 (DS TextLink re-export)
    │   ├── CompanyTrigger + CompanyDropdown (injected)
    │   └── Auth section (AuthButtons or AuthAvatar + AuthPopover)
    └── Sticky section
        ├── Backdrop overlay
        ├── PrimaryNav (Organism)
        │   ├── LogoButton
        │   ├── MobileControls (< 1024px)
        │   └── DesktopNavItems (>= 1024px)
        ├── Mega Menu Dropdowns x N (injected via MegaMenuEntry[])
        └── Mobile Menu (injected)
```

**Key pattern:** Consumer provides content via render props (mega menus, company dropdown, CTA button, mobile menu). The navbar package owns zero domain-specific content.

---

## Common Issues

| Issue                        | Fix                                                              |
|------------------------------|------------------------------------------------------------------|
| Fonts not loading            | Ensure `fonts.css` is imported in `/src/styles/index.css`        |
| Colors/spacing wrong         | Verify `theme.css` is copied and imported                        |
| Motion animations fail       | `import { motion } from 'motion/react'` (not `framer-motion`)   |
| SearchBar icon missing       | Install `@phosphor-icons/react`                                  |
| Button spinner missing       | Install `lucide-react`                                           |
| Routing broken               | Use `react-router` (not `react-router-dom`) with `RouterProvider`|
| Auth state not working       | Wrap app in `<AuthProvider>` from `AuthContext.tsx`              |
| DS components not found      | Ensure `/src/design-system/` folder is copied                    |

---

**Last Updated:** February 28, 2026
