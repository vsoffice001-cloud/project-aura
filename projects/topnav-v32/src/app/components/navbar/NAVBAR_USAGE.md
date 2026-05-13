# Navbar Component System — Usage Documentation

## Architecture Overview

The navbar is decomposed using **Atomic Design** methodology into reusable, testable units.
For internal architecture details, dependency rules, and data flow diagrams, see [ARCHITECTURE.md](./ARCHITECTURE.md).

```
TopNavigation (Organism — drop-in entry point)
│   Calls: useNavDropdown, useAuthPopover, useMobileMenu
│
├── SkipLink (Atom)
├── ARIA Live Region
├── SecondaryBar (Organism) — desktop only, 40px
│   ├── NavLink x 2 (Atom) — Procurement, Expert Panel
│   ├── CompanyTrigger (Molecule) — injectable dropdown slot
│   │   └── CompanyDropdown (injected)
│   └── Auth section:
│       ├── AuthButtons (Molecule) — logged out
│       └── AuthAvatar (Molecule) + AuthPopover (Organism) — logged in
├── Sticky Section
│   ├── Backdrop overlay — motion blur when mega menu is open
│   ├── PrimaryNav (Organism) — 60px nav bar
│   │   ├── LogoButton (Atom) — clickable logo wrapper
│   │   │   └── Logo content (injected)
│   │   ├── MobileControls (Organism) — < 1024px
│   │   │   ├── AuthAvatar (Molecule)
│   │   │   ├── AuthPopover (Organism)
│   │   │   └── HamburgerIcon (Atom) in button
│   │   └── DesktopNavItems (Organism) — >= 1024px, configurable
│   │       ├── NavDropdownTrigger x N (Molecule) — driven by NavItemConfig[]
│   │       ├── SearchBar (Molecule)
│   │       └── CTA button (injected)
│   ├── Mega Menu Dropdowns x N — driven by MegaMenuEntry[]
│   └── Mobile Menu (injected)
└── (NavLayout adds: <main><Outlet /></main>)
```

---

## Quick Start — Drop-in Usage

```tsx
import { TopNavigation } from '../navbar/organisms';
import type { NavItemConfig, MegaMenuEntry } from '../navbar/types';

// In your layout:
<TopNavigation
  logo={<YourLogo />}
  isAuthenticated={isAuthenticated}
  user={user}
  onNavigate={(path) => navigate(path)}
  onSignOut={() => { logout(); navigate('/'); }}
  items={NAV_ITEMS}
  megaMenus={MEGA_MENUS}
  ctaButton={<Button variant="brand" size="sm">Book discovery call</Button>}
  companyDropdown={(isOpen) => <CompanyDropdown isOpen={isOpen} />}
  mobileMenu={(isOpen, onClose) => <MobileMenu isOpen={isOpen} onClose={onClose} />}
/>
```

That's it. One component gives you: SkipLink, ARIA announcements, secondary bar, sticky primary nav, backdrop overlay, mega menus, mobile menu, and all keyboard/hover/touch interactions.

### TopNavigation Props

| Prop              | Type                                          | Required | Default          | Description                                      |
|-------------------|-----------------------------------------------|----------|------------------|--------------------------------------------------|
| `logo`            | `ReactNode`                                   | Yes      | —                | Logo content inside LogoButton                   |
| `onLogoClick`     | `() => void`                                  | No       | `onNavigate('/')`| Logo click override                              |
| `isAuthenticated` | `boolean`                                     | Yes      | —                | Auth state from consumer                         |
| `user`            | `NavUser \| null`                             | No       | —                | Authenticated user shape                         |
| `onNavigate`      | `(path: string) => void`                      | Yes      | —                | All internal navigation callback                 |
| `onSignOut`       | `() => void`                                  | Yes      | —                | Sign-out action callback                         |
| `items`           | `NavItemConfig[]`                             | No       | 5 default items  | Primary nav item descriptors                     |
| `megaMenus`       | `MegaMenuEntry[]`                             | No       | `[]`             | Mega menu panel renderers                        |
| `ctaButton`       | `ReactNode`                                   | No       | —                | CTA button (injected)                            |
| `companyDropdown` | `(isOpen: boolean) => ReactNode`              | No       | —                | Company dropdown render function                 |
| `mobileMenu`      | `(isOpen: boolean, onClose: () => void) => ReactNode` | No | —           | Mobile menu render function                      |

---

## Responsive Behavior — Device-by-Device Breakdown

### Breakpoint System

| Token   | Width Range    | Tailwind Class | CSS Media Query          |
|---------|----------------|----------------|--------------------------|
| Mobile  | 0 – 767px      | (default)      | —                        |
| Tablet  | 768 – 1023px   | `md:`          | `@media (min-width: 768px)` |
| Desktop | 1024 – 1365px  | `lg:`          | `@media (min-width: 1024px)` |
| Wide    | 1366px+        | `xl:`          | `@media (min-width: 1366px)` |

**WHY 1024px for the desktop nav breakpoint (not 768px)?**
5 dropdown triggers + search bar + CTA button = ~890px minimum content width. At 768px with 80px total padding, only 688px is available — nav items would overflow. At 1024px with 120px padding, 904px fits comfortably.

---

### Mobile (0 – 767px) — Phones

```
┌─────────────────────────────────────┐
│ [Logo]                    [👤] [☰]  │  ← 60px, sticky top-0
└─────────────────────────────────────┘
```

| Feature              | Behavior                                                                   |
|----------------------|----------------------------------------------------------------------------|
| **Secondary bar**    | **Hidden** (`hidden md:block`). Not visible at all.                        |
| **Primary nav**      | 60px tall, sticky `top-0`, `z-[50]`, white background, purple shadow.      |
| **Logo**             | Left-aligned. Clickable (navigates home). Scales to fit.                   |
| **Desktop nav items**| **Hidden** (`hidden lg:flex`). Triggers, search, CTA all invisible.        |
| **Mobile controls**  | **Visible** (`lg:hidden`). Shows AuthAvatar (40px) + Hamburger button.     |
| **AuthAvatar**       | 40px circle. Shows person icon (logged out) or initials (logged in).       |
| **Indicator dot**    | 8px red dot on avatar when logged out (draws attention to auth).           |
| **Auth popover**     | Opens on avatar tap. 220px floating card with spring animation.            |
|                      | Logged out: "Welcome" + Sign in / Sign up with icon backgrounds.          |
|                      | Logged in: User info + My Account / Saved / Settings / Sign out.           |
| **Hamburger icon**   | 44px tap target (WCAG). 3-bar ↔ X animated transition.                    |
| **Mobile menu**      | Full push overlay. Body scroll locked. Contains all nav sections.          |
| **Mega menus**       | **Not shown** — accessed through mobile menu instead.                      |
| **Company dropdown** | **Not shown** — part of secondary bar.                                     |
| **Dismiss behavior** | Tapping avatar closes hamburger menu (and vice versa). One panel at a time.|
| **Touch detection**  | `useNavDropdown` detects touch devices → disables hover-to-open.           |

**Tap target compliance:**
- Hamburger button: `44px × 44px` (`min-width/min-height: 44px`)
- AuthAvatar: `40px × 40px` (meets WCAG 2.5.8 draft, slightly under 44px target)
- Popover menu items: `min-height: 44px` when `iconBg` variant is used

---

### Tablet (768 – 1023px) — iPads, Small Laptops

```
┌─────────────────────────────────────────────────────┐
│ Procurement  Expert Panel  Company ▾   [Sign in] [Sign up] │  ← 40px secondary bar
├─────────────────────────────────────────────────────┤
│ [Logo]                                    [👤] [☰]  │  ← 60px, sticky
└─────────────────────────────────────────────────────┘
```

| Feature              | Behavior                                                                   |
|----------------------|----------------------------------------------------------------------------|
| **Secondary bar**    | **Visible** (`hidden md:block`). 40px, `#fafafa` bg, `z-[60]`.            |
|                      | Left: NavLink (Procurement, Expert Panel) + CompanyTrigger with dropdown.  |
|                      | Right: AuthButtons (logged out) or user name + AuthAvatar 28px (logged in).|
| **Primary nav**      | Same as mobile — 60px, sticky, white.                                      |
| **Desktop nav items**| **Still hidden** (`hidden lg:flex`). Tablet gets the hamburger experience. |
| **Mobile controls**  | **Still visible** (`lg:hidden`). AuthAvatar 40px + Hamburger.              |
| **Company dropdown** | Opens on hover over CompanyTrigger in secondary bar.                       |
| **Auth popover**     | Desktop variant: appears attached to 28px avatar in secondary bar.         |
|                      | Mobile variant: appears attached to 40px avatar in primary nav.            |
|                      | Both use same AuthPopover organism with same spring animation.             |
| **Mega menus**       | **Not shown** (desktop triggers hidden). Accessed via mobile menu.         |
| **Mobile menu**      | Same as mobile — full push overlay with scroll lock.                       |

**Key design decision:** Tablet gets the hamburger (not desktop nav) because 768px minus padding = 688px available width, which cannot fit 5 triggers + search + CTA (~890px needed).

---

### Desktop (1024 – 1365px) — Laptops, Small Monitors

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ Procurement  Expert Panel  Company ▾                       [Sign in] [Sign up] │  ← 40px
├──────────────────────────────────────────────────────────────────────────────┤
│ [Logo]    Reports▾  Industries▾  Surveys▾  Consulting▾  Insights▾  [🔍]  [CTA] │  ← 60px
├──────────────────────────────────────────────────────────────────────────────┤
│ ┌────────────────────────────────────────────────────────────────────────┐  │
│ │                        Mega Menu Panel (if open)                       │  │
│ └────────────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────────────┘
```

| Feature              | Behavior                                                                   |
|----------------------|----------------------------------------------------------------------------|
| **Secondary bar**    | **Visible**. Same as tablet but with more horizontal space.                |
| **Primary nav**      | 60px, sticky `top-0`. Full desktop experience.                             |
| **Desktop nav items**| **Visible** (`hidden lg:flex`). 5 triggers + SearchBar + CTA.              |
|                      | Gap: `gap-6` (24px) between triggers, `gap-8` (32px) at `xl:`.            |
| **Mobile controls**  | **Hidden** (`lg:hidden`). No hamburger on desktop.                         |
| **Dropdown triggers**| Hover-to-open with 100ms debounce. Keyboard: Enter/Space toggle, Esc close.|
|                      | Gradient underline animation (black→grey→red) on hover.                    |
|                      | DropdownChevron rotates 180deg when open.                                  |
| **SearchBar**        | 120px × 35px pill. Purple beam orbit animation. Phosphor MagnifyingGlass.  |
| **CTA button**       | DS Button `variant="brand" size="sm"` (32px height). Shimmer + ripple.     |
| **Mega menus**       | Full-width panels below sticky nav. Rendered by `MegaMenuEntry[].render()`. |
| **Backdrop overlay** | When mega menu is open: fixed `bg-black/[0.02] backdrop-blur-[2px]`.       |
|                      | Hovering the backdrop closes the menu. `z-[45]` behind nav `z-[50]`.      |
| **Auth popover**     | Desktop: attached to 28px avatar in secondary bar.                         |
| **Company dropdown** | Hover-to-open from secondary bar CompanyTrigger.                           |
| **Mobile menu**      | **Not shown** — desktop uses mega menus instead.                           |

**Container:** `nav-container` class applies responsive padding:
- 1024px: ~60px side padding
- Content max-width: 1440px, centered

---

### Wide Desktop (1366px+) — Large Monitors, Ultrawides

| Feature              | Behavior                                                                   |
|----------------------|----------------------------------------------------------------------------|
| **Layout**           | Same as desktop. Container caps at `max-width: 1440px` with `120px` side padding. |
| **Trigger gap**      | Increases from `gap-6` (24px) to `gap-8` (32px) at `xl:` breakpoint.      |
| **Secondary bar**    | Same as desktop, more breathing room.                                      |
| **Content centering**| Nav container is centered with `margin: 0 auto`.                           |

---

## Responsive Component Visibility Matrix

| Component              | Mobile (<768) | Tablet (768-1023) | Desktop (1024-1365) | Wide (1366+) |
|------------------------|:-------------:|:-----------------:|:-------------------:|:------------:|
| SecondaryBar           | Hidden        | Visible           | Visible             | Visible      |
| NavLink (Procurement)  | Hidden        | Visible           | Visible             | Visible      |
| CompanyTrigger         | Hidden        | Visible           | Visible             | Visible      |
| AuthButtons (desktop)  | Hidden        | Visible           | Visible             | Visible      |
| AuthAvatar (28px)      | Hidden        | Visible           | Visible             | Visible      |
| LogoButton             | Visible       | Visible           | Visible             | Visible      |
| MobileControls         | Visible       | Visible           | Hidden              | Hidden       |
| AuthAvatar (40px)      | Visible       | Visible           | Hidden              | Hidden       |
| HamburgerIcon          | Visible       | Visible           | Hidden              | Hidden       |
| DesktopNavItems        | Hidden        | Hidden            | Visible             | Visible      |
| NavDropdownTrigger x N | Hidden        | Hidden            | Visible             | Visible      |
| SearchBar              | Hidden        | Hidden            | Visible             | Visible      |
| CTA Button             | Hidden        | Hidden            | Visible             | Visible      |
| Mega Menu Panels       | Hidden        | Hidden            | Visible             | Visible      |
| Backdrop Overlay       | Hidden        | Hidden            | Visible             | Visible      |
| Mobile Menu            | Visible       | Visible           | Hidden              | Hidden       |

---

## Height & Z-Index Stack

### Fixed Heights

| Element          | Height | Notes                                        |
|------------------|--------|----------------------------------------------|
| Secondary bar    | 40px   | Non-sticky, scrolls away                     |
| Primary nav      | 60px   | Sticky `top-0`, stays visible on scroll      |
| Total (initial)  | 100px  | Before any scroll                            |
| Total (scrolled) | 60px   | Only primary nav remains                     |

### Z-Index Stack (bottom to top)

| Layer              | z-index | Element                                      |
|--------------------|---------|----------------------------------------------|
| Backdrop overlay   | 45      | `fixed inset-0` blur behind mega menu        |
| Primary nav        | 50      | Sticky `<nav>` bar                           |
| Secondary bar      | 60      | Above primary nav (scrolls away naturally)   |
| Auth popover bg    | 98      | Fixed backdrop for popover dismiss            |
| Auth popover card  | 99      | Floating card above everything                |

---

## Interaction Patterns by Device

### Hover Behavior (Desktop Only)

```
Mouse enters trigger → useNavDropdown.handleMouseEnter(id)
                     → setActiveDropdown(id) immediately
                     → Cancel any pending close timeout

Mouse leaves nav    → useNavDropdown.handleMouseLeave()
                     → Start 100ms timeout → setActiveDropdown(null)

Mouse enters mega   → Mouse is still in nav area → timeout cancelled
menu panel          → Menu stays open

Mouse enters        → dropdown.closeAll() → immediate close
backdrop overlay
```

### Touch Behavior (Mobile/Tablet)

```
useNavDropdown detects touch device (ontouchstart / maxTouchPoints)
→ handleMouseEnter becomes no-op
→ handleMouseLeave becomes no-op
→ Only explicit toggle/close actions work
→ Prevents "hover-open-then-stuck" on touch screens
```

### Keyboard Navigation

| Key           | Action                                              |
|---------------|-----------------------------------------------------|
| `Tab`         | Move focus between interactive elements              |
| `Enter`       | Toggle dropdown open/close                           |
| `Space`       | Toggle dropdown open/close                           |
| `Escape`      | Close active dropdown                                |
| `Tab` (skip)  | SkipLink → "Skip to main content" (sr-only, visible on focus) |

### Auth Popover Dismiss

```
Outside click detected via useAuthPopover:
  - Checks 3 refs: popoverRef, mobileButtonRef, desktopButtonRef
  - If click is outside ALL three → close popover
  - Prevents closing when clicking the trigger button itself
```

### Mobile Menu / Auth Popover Coordination

```
User taps hamburger while auth popover is open:
  → authPopover.close() → mobile menu opens

User taps avatar while mobile menu is open:
  → onCloseMobileMenu() → auth popover opens

Only one overlay at a time.
```

---

## Auth States Matrix

| State               | Logged Out                          | Logged In                              |
|---------------------|-------------------------------------|----------------------------------------|
| Desktop secondary   | Sign in link + Sign up button       | User name + 28px avatar + popover      |
| Desktop popover     | N/A (uses AuthButtons)              | My Account / Saved Reports / Settings / Sign out |
| Mobile avatar       | Person silhouette + red dot         | User initials (e.g., "JD")             |
| Mobile popover      | Welcome header + Sign in/Sign up    | User info + My Account / Saved / Settings / Sign out |
| Hamburger menu      | Same in both states                 | Same in both states                    |

---

## Shared Types

All shared types live in `types.ts` and are re-exported from the barrel `index.ts`.

```tsx
import type { NavUser, AuthPopoverConfig, NavItemConfig, MegaMenuEntry } from '../navbar';
```

| Type               | Shape                                    | Used by                                   |
|--------------------|------------------------------------------|-------------------------------------------|
| `NavUser`          | `{ name, email, initials }`              | TopNavigation, SecondaryBar, MobileControls, AuthPopover |
| `AuthPopoverConfig`| `{ isOpen, toggle, close, onNavigate, onSignOut, popoverRef, mobileButtonRef, desktopButtonRef }` | TopNavigation (internal), SecondaryBar, MobileControls, PrimaryNav |
| `NavItemConfig`    | `{ id, label }`                          | TopNavigation, DesktopNavItems            |
| `MegaMenuEntry`    | `{ id, render: (isOpen) => ReactNode }`  | TopNavigation, NavLayout                  |

---

## Atoms

> **DS Integration note:** NavLink, IndicatorDot, NavDivider, and SkipLink are now thin
> re-exports from `/src/design-system/components/` (TextLink, StatusDot, Divider, SkipLink).
> Import paths within the navbar are unchanged. New code outside the navbar should import
> directly from the DS: `import { TextLink, StatusDot } from '../../design-system/components'`.

### NavLink
**File:** `atoms/NavLink.tsx`
**WHY:** Eliminates repeated grey-to-red hover text link across 6+ instances.
**WHAT:** Text link with two sizes, optional icon, WCAG focus ring.
**WHEN:** Any navbar text link (Procurement, Expert Panel, Sign in).
**WHERE:** SecondaryBar, AuthButtons.

```tsx
<NavLink href="/procurement" size="sm">Procurement</NavLink>
<NavLink size="md" onClick={fn} icon={<SvgIcon />}>Sign in</NavLink>
```

| Prop      | Type                    | Default | Description                    |
|-----------|-------------------------|---------|--------------------------------|
| children  | ReactNode               | —       | Link text                      |
| href?     | string                  | —       | Renders as `<a>` when provided |
| onClick?  | () => void              | —       | Renders as `<button>`          |
| size      | `'sm'` \| `'md'`        | `'sm'`  | 12px helper / 14px primary     |
| icon?     | ReactNode               | —       | Leading icon element           |
| active?   | boolean                 | false   | Active state (red text)        |
| className?| string                  | —       | Override classes                |

### LogoButton
**File:** `atoms/LogoButton.tsx`
**WHY:** 15-line inline logo button extracted from NavLayout for reusability.
**WHAT:** Clickable button wrapping logo content with hover scale/opacity and focus ring.

```tsx
<LogoButton onClick={() => navigate('/')}>
  <LogoContainer />
</LogoButton>
```

| Prop       | Type       | Default              | Description                |
|------------|------------|----------------------|----------------------------|
| onClick    | () => void | —                    | Navigation handler         |
| children   | ReactNode  | —                    | Logo component to render   |
| ariaLabel? | string     | `"Ken Research Home"`| Accessible label           |

### DropdownChevron
**File:** `atoms/DropdownChevron.tsx`
**WHY:** Same SVG + rotation logic repeated in 6 triggers.

```tsx
<DropdownChevron isOpen={isDropdownOpen} size={12} />
```

| Prop   | Type          | Default | Description              |
|--------|---------------|---------|--------------------------|
| isOpen | boolean       | —       | Controls 180deg rotation |
| size   | `10` \| `12`  | `12`    | Pixel size               |

### IndicatorDot
**File:** `atoms/IndicatorDot.tsx`
**WHY:** Red notification circle on mobile auth avatar.

```tsx
<IndicatorDot visible={!isAuthenticated} />
```

| Prop      | Type     | Default      | Description           |
|-----------|----------|--------------|-----------------------|
| visible   | boolean  | —            | Show/hide             |
| color?    | string   | `#b01f24`    | Fill color            |
| size?     | number   | `8`          | Diameter in px        |
| position? | string   | `top-right`  | Corner placement      |

### HamburgerIcon
**File:** `atoms/HamburgerIcon.tsx`
**WHY:** 3-bar to X animation is pure visual concern.

```tsx
<HamburgerIcon isOpen={isMobileMenuOpen} />
```

### NavDivider
**File:** `atoms/NavDivider.tsx`
**WHY:** `h-[1px] bg-[rgba(20,16,22,0.06)]` appears 5+ times.

```tsx
<NavDivider />
```

### SkipLink
**File:** `atoms/SkipLink.tsx`
**WHY:** WCAG 2.1 skip-to-content mechanism.

```tsx
<SkipLink /> {/* Renders as first element in navbar */}
```

---

## Molecules

> **DS Integration note:** AuthAvatar and PopoverMenuItem are now thin re-exports/adapters
> from `/src/design-system/components/` (Avatar and MenuItem respectively). Import paths
> within the navbar are unchanged. New code should use the DS imports directly.

### NavDropdownTrigger
**File:** `molecules/NavDropdownTrigger.tsx`
**WHY:** Each of N main nav items had identical 15-line trigger markup.
**WHAT:** Label + DropdownChevron + gradient underline on hover.

```tsx
<NavDropdownTrigger
  label="Reports"
  isOpen={activeDropdown === 'reports'}
  onMouseEnter={() => handleMouseEnter('reports')}
  onKeyDown={(e) => handleKeyDown(e, 'reports')}
/>
```

### CompanyTrigger
**File:** `molecules/CompanyTrigger.tsx`
**WHY:** 20-line inline Company trigger extracted from SecondaryBar; injectable dropdown slot decouples the trigger from CompanyDropdown.

```tsx
<CompanyTrigger
  isOpen={activeDropdown === 'company'}
  onMouseEnter={() => onMouseEnter('company')}
  onKeyDown={(e) => onKeyDown(e, 'company')}
  dropdown={<CompanyDropdown isOpen={activeDropdown === 'company'} />}
/>
```

| Prop         | Type                         | Default     | Description                    |
|--------------|------------------------------|-------------|--------------------------------|
| label?       | string                       | `"Company"` | Trigger text                   |
| isOpen       | boolean                      | —           | Chevron rotation + ARIA state  |
| onMouseEnter | () => void                   | —           | Hover intent handler           |
| onKeyDown    | (e: KeyboardEvent) => void   | —           | Keyboard handler               |
| dropdown     | ReactNode                    | —           | Injected dropdown panel        |

### SearchBar
**File:** `molecules/SearchBar.tsx`
**WHY:** Complex purple beam orbit animation isolated from nav layout.

```tsx
<SearchBar placeholder="Search" />
```

### AuthAvatar
**File:** `molecules/AuthAvatar.tsx`
**WHY:** Avatar button appears in both mobile (40px) and desktop (28px).

```tsx
<AuthAvatar
  ref={buttonRef}
  size="md"          // 'sm' = 28px, 'md' = 40px
  user={{ initials: 'JD' }}  // null = logged out (person icon)
  isActive={isPopoverOpen}
  onClick={togglePopover}
/>
```

### PopoverMenuItem
**File:** `molecules/PopoverMenuItem.tsx`
**WHY:** 7+ identical menu item buttons across auth popovers.

```tsx
<PopoverMenuItem icon={<PersonIcon />} label="My Account" onClick={fn} />
<PopoverMenuItem icon={<LogoutIcon />} label="Sign out" danger onClick={fn} />
<PopoverMenuItem icon={<SignInIcon />} label="Sign in" subtitle="Existing account" iconBg onClick={fn} />
```

### AuthButtons
**File:** `molecules/AuthButtons.tsx`
**WHY:** Desktop Sign in + Sign up always appear/disappear together.

```tsx
<AuthButtons onSignIn={() => navigate('/auth?mode=signin')} onSignUp={() => navigate('/auth?mode=signup')} />
```

---

## Organisms

### TopNavigation (Entry Point)
**File:** `organisms/TopNavigation.tsx`
**WHY:** The ENTIRE top navigation as a single drop-in component. Calls hooks internally, renders all sub-organisms, accepts injection slots for consumer content.

See [Quick Start](#quick-start--drop-in-usage) above for full props table and usage.

### PrimaryNav
**File:** `organisms/PrimaryNav.tsx`
**WHY:** The inner content of the 60px sticky nav bar — logo + mobile controls + desktop nav.

```tsx
<PrimaryNav
  logo={<LogoContainer />}
  onLogoClick={() => navigate('/')}
  isAuthenticated={isAuthenticated}
  user={user}
  isMobileMenuOpen={mobileMenu.isOpen}
  onToggleMobileMenu={mobileMenu.toggle}
  onCloseMobileMenu={mobileMenu.close}
  authPopover={authPopoverConfig}
  items={NAV_ITEMS}
  activeDropdown={dropdown.activeDropdown}
  onMouseEnter={dropdown.handleMouseEnter}
  onKeyDown={dropdown.handleKeyDown}
  ctaButton={<Button variant="brand" size="sm">Book discovery call</Button>}
/>
```

### SecondaryBar
**File:** `organisms/SecondaryBar.tsx`
**WHY:** Complete 40px desktop utility bar with auth-aware right section.
**WHEN:** Visible >= 768px (secondary bar is fine at tablet width).

```tsx
<SecondaryBar
  activeDropdown={dropdown.activeDropdown}
  onMouseEnter={dropdown.handleMouseEnter}
  onMouseLeave={dropdown.handleMouseLeave}
  onKeyDown={dropdown.handleKeyDown}
  isAuthenticated={isAuthenticated}
  user={user}
  authPopover={authPopoverConfig}
  companyDropdown={<CompanyDropdown isOpen={activeDropdown === 'company'} />}
/>
```

### DesktopNavItems
**File:** `organisms/DesktopNavItems.tsx`
**WHY:** N triggers + search + CTA grouped as desktop-only strip.
**WHEN:** Visible >= 1024px.

```tsx
<DesktopNavItems
  items={NAV_ITEMS}
  activeDropdown={dropdown.activeDropdown}
  onMouseEnter={dropdown.handleMouseEnter}
  onKeyDown={dropdown.handleKeyDown}
  ctaButton={<Button variant="brand" size="sm">Book discovery call</Button>}
/>
```

| Prop           | Type             | Default              | Description                |
|----------------|------------------|----------------------|----------------------------|
| items?         | NavItemConfig[]  | 5 default items      | Configurable nav items     |
| activeDropdown | string \| null   | —                    | Current open dropdown ID   |
| onMouseEnter   | (menu) => void   | —                    | Hover enter handler        |
| onKeyDown      | (e, menu) => void| —                    | Keyboard handler           |
| ctaButton?     | ReactNode        | —                    | Injected CTA button        |

### MobileControls
**File:** `organisms/MobileControls.tsx`
**WHY:** AuthAvatar + hamburger with coordinated dismiss.
**WHEN:** Visible < 1024px.

```tsx
<MobileControls
  user={user}
  isAuthenticated={isAuthenticated}
  isMobileMenuOpen={mobileMenu.isOpen}
  onToggleMobileMenu={mobileMenu.toggle}
  onCloseMobileMenu={mobileMenu.close}
  authPopover={authPopoverConfig}
/>
```

### AuthPopover
**File:** `organisms/AuthPopover.tsx`
**WHY:** Most complex repeating UI — 200 lines duplicated between mobile/desktop.

```tsx
<AuthPopover
  ref={popoverRef}
  isOpen={isOpen}
  user={user}           // null = logged out state
  onClose={close}
  onNavigate={navigate}
  onSignOut={signOut}
/>
```

---

## Hooks

### useNavDropdown
**File:** `hooks/useNavDropdown.ts`
**WHY:** 40+ lines of dropdown state tangled in NavLayout.

```tsx
const {
  activeDropdown,     // Current open dropdown ID or null
  handleMouseEnter,   // (menu: string) => void — hover intent (no-op on touch)
  handleMouseLeave,   // () => void — 100ms debounced close (no-op on touch)
  toggleDropdown,     // (menu: string) => void — click toggle
  closeAll,           // () => void — close everything
  handleKeyDown,      // (e, menu) => void — Enter/Space/Escape
  announcement,       // string — ARIA live region text
  isTouch,            // boolean — touch device detected
} = useNavDropdown();
```

### useAuthPopover
**File:** `hooks/useAuthPopover.ts`
**WHY:** 3-ref outside-click detection would be spaghetti inline.

```tsx
const {
  isOpen,             // boolean
  toggle,             // () => void
  close,              // () => void
  open,               // () => void
  popoverRef,         // RefObject<HTMLDivElement>
  mobileButtonRef,    // RefObject<HTMLButtonElement>
  desktopButtonRef,   // RefObject<HTMLButtonElement>
} = useAuthPopover();
```

### useMobileMenu
**File:** `hooks/useMobileMenu.ts`
**WHY:** Body scroll lock side-effect needs cleanup.

```tsx
const {
  isOpen,   // boolean
  toggle,   // () => void
  close,    // () => void
} = useMobileMenu();
```

---

## Nav Configuration

NavLayout uses two config arrays as its single source of truth. To add, remove, or reorder nav items and their mega menus, edit these arrays:

```tsx
// In NavLayout.tsx:
const NAV_ITEMS: NavItemConfig[] = [
  { id: 'reports', label: 'Reports' },
  { id: 'industries', label: 'Industries' },
  { id: 'survey', label: 'Surveys' },
  { id: 'consulting', label: 'Consulting' },
  { id: 'insights', label: 'Insights' },
];

const MEGA_MENUS: MegaMenuEntry[] = [
  { id: 'consulting', render: (isOpen) => <ConsultingDropdown isOpen={isOpen} /> },
  { id: 'industries', render: (isOpen) => <IndustriesDropdown isOpen={isOpen} /> },
  { id: 'insights', render: (isOpen) => <InsightsDropdown isOpen={isOpen} /> },
  { id: 'survey', render: (isOpen) => <SurveyDropdown isOpen={isOpen} /> },
  { id: 'reports', render: (isOpen) => <ReportsDropdown isOpen={isOpen} /> },
];
```

Each `MegaMenuEntry.id` must match a `NavItemConfig.id` for the trigger-to-panel mapping to work.

---

## Styling

### `.font-nav` utility
All navbar components use `.font-nav` (defined in `theme.css`) instead of inline `font-['DM_Sans',sans-serif]`. This is the single point of control for the navbar font family.

### `.nav-container` layout
Responsive centered container defined in `theme.css`:
- Applies progressive padding: 16px (mobile) → 40px (tablet) → 60px (desktop) → 120px (wide)
- Max-width: 1440px, centered with `margin: 0 auto`
- Used by both SecondaryBar and PrimaryNav for consistent alignment

### Design System Integration
**Brand Button** from `/src/app/components/ds/Button.tsx`:
- `<Button variant="brand" size="sm">Book discovery call</Button>`
- 32px height, 14px font, shimmer-on-hover, ripple-on-click
- Injected via `ctaButton` prop (not imported inside navbar package)

---

## Quick Start

```tsx
// In your routes.ts:
import { NavLayout } from './components/layout/NavLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: NavLayout,  // Wraps all pages with navbar
    children: [
      { index: true, Component: HomePage },
    ],
  },
]);

// In your App.tsx:
import { RouterProvider } from 'react-router';
import { AuthProvider } from './context/AuthContext';
import { router } from './routes';

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
```

---

**Last Updated:** February 2026
**Changelog:** [CHANGELOG.md](./CHANGELOG.md)
**Architecture:** [ARCHITECTURE.md](./ARCHITECTURE.md)
**Consistency Guide:** [CONSISTENCY.md](./CONSISTENCY.md)
**Test Specs:** [TESTING.md](./TESTING.md)