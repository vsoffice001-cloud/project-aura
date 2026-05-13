# Navbar Testing Specification

> Phase 5 — Test cases for hooks, atoms, molecules, organisms, integration, and accessibility.
> This document defines WHAT to test and expected behavior. Test implementation can use Vitest + React Testing Library + jsdom.

---

## 1. Hook Tests

### 1.1 `useNavDropdown`

| ID    | Test case                                    | Expected behavior                                               |
|-------|----------------------------------------------|-----------------------------------------------------------------|
| H1.1  | Initial state                                | `activeDropdown` is `null`, `announcement` is `''`              |
| H1.2  | `handleMouseEnter('reports')`                | `activeDropdown` becomes `'reports'`                            |
| H1.3  | `handleMouseLeave` after enter               | After 100ms, `activeDropdown` becomes `null`                    |
| H1.4  | `handleMouseLeave` cancelled by re-enter     | Enter → leave → enter within 100ms: dropdown stays open        |
| H1.5  | `toggleDropdown('reports')` opens             | `activeDropdown` becomes `'reports'`                            |
| H1.6  | `toggleDropdown('reports')` twice closes      | `activeDropdown` becomes `null`                                 |
| H1.7  | `closeAll` resets state                       | `activeDropdown` becomes `null`                                 |
| H1.8  | `handleKeyDown` Enter opens                   | Pressing Enter on 'reports' sets `activeDropdown` to `'reports'`|
| H1.9  | `handleKeyDown` Space opens                   | Pressing Space on 'reports' sets `activeDropdown` to `'reports'`|
| H1.10 | `handleKeyDown` Escape closes                 | Pressing Escape sets `activeDropdown` to `null`                 |
| H1.11 | `handleKeyDown` Enter prevents default        | `e.preventDefault()` called for Enter/Space                     |
| H1.12 | ARIA announcement on open                    | `announcement` = `'Reports menu opened'` when reports opens     |
| H1.13 | ARIA announcement on close                   | `announcement` = `'Menu closed'` when dropdown closes           |
| H1.14 | No announcement for 'company'                 | Opening 'company' doesn't trigger mega menu announcement        |
| H1.15 | Touch device skips hover                      | On touch device, `handleMouseEnter` is a no-op                  |
| H1.16 | Cleanup on unmount                            | Hover timeout is cleared when hook unmounts                     |
| H1.17 | Switching dropdowns                           | Enter 'reports' → enter 'industries': active = 'industries'    |

### 1.2 `useAuthPopover`

| ID    | Test case                                    | Expected behavior                                               |
|-------|----------------------------------------------|-----------------------------------------------------------------|
| H2.1  | Initial state                                | `isOpen` is `false`                                             |
| H2.2  | `toggle` opens                                | `isOpen` becomes `true`                                         |
| H2.3  | `toggle` twice closes                         | `isOpen` becomes `false`                                        |
| H2.4  | `close` closes                                | `isOpen` becomes `false`                                        |
| H2.5  | `open` opens                                  | `isOpen` becomes `true`                                         |
| H2.6  | Refs are initialized                          | `popoverRef`, `mobileButtonRef`, `desktopButtonRef` are valid refs |
| H2.7  | Outside click closes popover                  | Mousedown outside all 3 refs sets `isOpen` to `false`           |
| H2.8  | Click inside popover doesn't close            | Mousedown inside `popoverRef` keeps `isOpen` `true`             |
| H2.9  | Click on mobile button doesn't close          | Mousedown inside `mobileButtonRef` keeps `isOpen` `true`        |
| H2.10 | Click on desktop button doesn't close         | Mousedown inside `desktopButtonRef` keeps `isOpen` `true`       |
| H2.11 | Listener cleanup on unmount                   | `mousedown` listener removed on unmount                         |

### 1.3 `useMobileMenu`

| ID    | Test case                                    | Expected behavior                                               |
|-------|----------------------------------------------|-----------------------------------------------------------------|
| H3.1  | Initial state                                | `isOpen` is `false`                                             |
| H3.2  | `toggle` opens                                | `isOpen` becomes `true`                                         |
| H3.3  | `toggle` twice closes                         | `isOpen` becomes `false`                                        |
| H3.4  | `close` closes                                | `isOpen` becomes `false`                                        |
| H3.5  | Body scroll locked when open                  | `document.body.style.overflow` = `'hidden'` when open           |
| H3.6  | Body scroll unlocked when closed              | `document.body.style.overflow` = `'unset'` when closed          |
| H3.7  | Body scroll unlocked on unmount               | Cleanup function restores `'unset'` even if open                |

---

## 2. Atom Tests

### 2.1 `NavLink`

| ID    | Test case                                    | Expected behavior                                               |
|-------|----------------------------------------------|-----------------------------------------------------------------|
| A1.1  | Renders as `<a>` when `href` provided        | DOM element is `<a>` with correct `href`                        |
| A1.2  | Renders as `<button>` when `onClick` provided| DOM element is `<button>`                                       |
| A1.3  | Size `sm` applies helper text sizing         | Font size matches `var(--nav-helper-text)` (12px)               |
| A1.4  | Size `md` applies primary text sizing        | Font size matches `var(--nav-primary-text)` (14px)              |
| A1.5  | Icon renders when provided                   | Icon element is visible before text                             |
| A1.6  | Active state applies red text                | `text-[#b01f24]` class present when `active={true}`            |
| A1.7  | Has `font-nav` class                         | `.font-nav` class is applied                                    |
| A1.8  | Focus-visible ring present                   | `focus-visible:ring-2` class is applied                         |

### 2.2 `LogoButton`

| ID    | Test case                                    | Expected behavior                                               |
|-------|----------------------------------------------|-----------------------------------------------------------------|
| A2.1  | Renders children                             | Logo component appears inside button                            |
| A2.2  | Calls `onClick` when clicked                 | Handler fires on click                                          |
| A2.3  | Default aria-label                           | `aria-label="Ken Research Home"` present                        |
| A2.4  | Custom aria-label                            | Custom label overrides default                                  |
| A2.5  | Has correct dimensions                       | `h-[20px] w-[152px]` classes applied                            |
| A2.6  | Focus-visible ring present                   | Focus ring appears on keyboard focus                            |

### 2.3 `DropdownChevron`

| ID    | Test case                                    | Expected behavior                                               |
|-------|----------------------------------------------|-----------------------------------------------------------------|
| A3.1  | Renders SVG                                  | SVG element present in DOM                                      |
| A3.2  | Rotates when `isOpen={true}`                 | `rotate(180deg)` transform applied                              |
| A3.3  | Not rotated when `isOpen={false}`            | `rotate(0deg)` transform applied                                |
| A3.4  | Size 10 applies correct dimensions           | SVG width/height = 10                                           |
| A3.5  | Size 12 applies correct dimensions           | SVG width/height = 12                                           |

### 2.4 `IndicatorDot`

| ID    | Test case                                    | Expected behavior                                               |
|-------|----------------------------------------------|-----------------------------------------------------------------|
| A4.1  | Visible when `visible={true}`                | Dot renders in DOM                                              |
| A4.2  | Hidden when `visible={false}`                | Dot does not render                                             |
| A4.3  | Default color is red                         | Fill color is `#b01f24`                                         |
| A4.4  | Custom color                                 | Provided color overrides default                                |
| A4.5  | Default size is 8px                          | Width/height = 8px                                              |

### 2.5 `HamburgerIcon`

| ID    | Test case                                    | Expected behavior                                               |
|-------|----------------------------------------------|-----------------------------------------------------------------|
| A5.1  | 3 bars when closed                           | Three `<span>` elements visible                                 |
| A5.2  | X shape when open                            | Transform classes produce cross pattern                         |

### 2.6 `NavDivider`

| ID    | Test case                                    | Expected behavior                                               |
|-------|----------------------------------------------|-----------------------------------------------------------------|
| A6.1  | Renders 1px horizontal line                  | Element has `h-[1px]` class                                     |

### 2.7 `SkipLink`

| ID    | Test case                                    | Expected behavior                                               |
|-------|----------------------------------------------|-----------------------------------------------------------------|
| A7.1  | Hidden by default                            | `sr-only` class applied                                         |
| A7.2  | Visible on focus                             | `focus:not-sr-only` class applied                               |
| A7.3  | Links to `#main-content`                     | `href="#main-content"` present                                  |

---

## 3. Molecule Tests

### 3.1 `NavDropdownTrigger`

| ID    | Test case                                    | Expected behavior                                               |
|-------|----------------------------------------------|-----------------------------------------------------------------|
| M1.1  | Renders label text                           | Label text visible in DOM                                       |
| M1.2  | Chevron rotates when `isOpen={true}`         | DropdownChevron receives `isOpen={true}`                        |
| M1.3  | Gradient underline visible when open         | Underline element has opacity 1 when open                       |
| M1.4  | `onMouseEnter` fires on hover                | Handler called when mouse enters trigger                        |
| M1.5  | `onKeyDown` fires on key press               | Handler called with keyboard event                              |
| M1.6  | `aria-expanded` reflects state               | `true` when open, `false`/absent when closed                    |
| M1.7  | `aria-haspopup="true"` present               | Attribute exists on button                                      |

### 3.2 `CompanyTrigger`

| ID    | Test case                                    | Expected behavior                                               |
|-------|----------------------------------------------|-----------------------------------------------------------------|
| M2.1  | Renders default label "Company"              | Text "Company" visible                                          |
| M2.2  | Renders custom label                         | Provided label overrides default                                |
| M2.3  | Renders injected dropdown                    | ReactNode passed as `dropdown` appears in DOM                   |
| M2.4  | `aria-expanded` reflects `isOpen`            | Correct ARIA state                                              |
| M2.5  | `onMouseEnter` fires on hover                | Handler called on mouse enter                                   |
| M2.6  | `onKeyDown` fires on key press               | Handler called with keyboard event                              |
| M2.7  | Has `font-nav` class                         | `.font-nav` class applied to trigger button                     |

### 3.3 `SearchBar`

| ID    | Test case                                    | Expected behavior                                               |
|-------|----------------------------------------------|-----------------------------------------------------------------|
| M3.1  | Renders search icon                          | Phosphor MagnifyingGlass icon visible                           |
| M3.2  | Renders input field                          | Text input element present                                      |
| M3.3  | Beam animation container present             | Animation wrapper element exists                                |
| M3.4  | Has `font-nav` class                         | `.font-nav` class applied to input                              |

### 3.4 `AuthAvatar`

| ID    | Test case                                    | Expected behavior                                               |
|-------|----------------------------------------------|-----------------------------------------------------------------|
| M4.1  | Shows person SVG when no user                | Person silhouette SVG rendered                                  |
| M4.2  | Shows initials when user provided            | User initials text visible                                      |
| M4.3  | Size `sm` = 28px                             | Avatar dimension is 28px                                        |
| M4.4  | Size `md` = 40px                             | Avatar dimension is 40px                                        |
| M4.5  | Active state changes background              | Different background color when `isActive={true}`               |
| M4.6  | `onClick` handler fires                      | Click handler called on click                                   |
| M4.7  | Forwards ref                                 | Ref attaches to button element                                  |

### 3.5 `PopoverMenuItem`

| ID    | Test case                                    | Expected behavior                                               |
|-------|----------------------------------------------|-----------------------------------------------------------------|
| M5.1  | Renders icon and label                       | Both icon and label text visible                                |
| M5.2  | Renders subtitle when provided               | Subtitle text visible below label                               |
| M5.3  | Danger variant uses red text                 | `text-[#b01f24]` applied when `danger={true}`                  |
| M5.4  | `onClick` handler fires                      | Click handler called on click                                   |
| M5.5  | Has `role="menuitem"`                        | ARIA role is `menuitem`                                         |

### 3.6 `AuthButtons`

| ID    | Test case                                    | Expected behavior                                               |
|-------|----------------------------------------------|-----------------------------------------------------------------|
| M6.1  | Sign in and Sign up both render              | Both buttons visible                                            |
| M6.2  | `onSignIn` fires for sign in                 | Handler called when Sign in clicked                             |
| M6.3  | `onSignUp` fires for sign up                 | Handler called when Sign up clicked                             |
| M6.4  | Sign in has login SVG icon                   | Custom SVG icon (hand-rolled, not library) present              |
| M6.5  | Sign up has outlined style                   | Border/outline button pattern                                   |

---

## 4. Organism Tests

### 4.1 `SecondaryBar`

| ID    | Test case                                    | Expected behavior                                               |
|-------|----------------------------------------------|-----------------------------------------------------------------|
| O1.1  | Hidden on mobile (< 768px)                  | `hidden md:block` class present                                 |
| O1.2  | Shows Procurement and Expert Panel links     | Both NavLink texts visible                                      |
| O1.3  | Shows CompanyTrigger                         | Company trigger button visible                                  |
| O1.4  | Shows AuthButtons when logged out            | Sign in/up buttons visible                                      |
| O1.5  | Shows user name + avatar when logged in      | User name text + AuthAvatar visible                             |
| O1.6  | AuthPopover renders when avatar clicked      | Popover appears after toggle                                    |
| O1.7  | Height is 40px                               | `h-[40px]` class present                                        |
| O1.8  | Background is #fafafa                        | `bg-[#fafafa]` class present                                    |

### 4.2 `DesktopNavItems`

| ID    | Test case                                    | Expected behavior                                               |
|-------|----------------------------------------------|-----------------------------------------------------------------|
| O2.1  | Hidden on mobile (< 1024px)                 | `hidden lg:flex` / `hidden lg:block` classes present            |
| O2.2  | Renders 5 default triggers                   | 5 NavDropdownTrigger components rendered                        |
| O2.3  | Custom items override defaults               | Passing `items` prop renders custom triggers                    |
| O2.4  | SearchBar rendered                           | Search input visible                                            |
| O2.5  | Brand Button rendered                        | "Book discovery call" button visible                            |
| O2.6  | Active dropdown passed to correct trigger    | Only matching trigger receives `isOpen={true}`                  |

### 4.3 `MobileControls`

| ID    | Test case                                    | Expected behavior                                               |
|-------|----------------------------------------------|-----------------------------------------------------------------|
| O3.1  | Visible on mobile (< 1024px)                | `lg:hidden` class present                                       |
| O3.2  | Shows AuthAvatar                             | Avatar button visible                                           |
| O3.3  | Shows HamburgerIcon                          | Hamburger button visible                                        |
| O3.4  | Hamburger toggles menu state                 | `onToggleMobileMenu` called on click                            |
| O3.5  | Avatar toggles popover                       | AuthPopover appears/disappears                                  |

### 4.4 `AuthPopover`

| ID    | Test case                                    | Expected behavior                                               |
|-------|----------------------------------------------|-----------------------------------------------------------------|
| O4.1  | Not visible when `isOpen={false}`            | Popover not in DOM or has opacity 0                             |
| O4.2  | Logged-out: shows sign in/up options         | Welcome text + sign in + sign up menu items                     |
| O4.3  | Logged-in: shows account menu                | My Account, Saved Reports, Settings, Sign out items             |
| O4.4  | Sign out calls `onSignOut`                   | Handler fires on sign out click                                 |
| O4.5  | Navigation calls `onNavigate` with path      | Handler fires with correct path string                          |
| O4.6  | Has `role="menu"`                            | ARIA menu role on container                                     |
| O4.7  | Forwards ref                                 | Ref attaches to popover container                               |

---

## 5. Integration Tests

### 5.1 NavLayout Integration

| ID    | Test case                                    | Expected behavior                                               |
|-------|----------------------------------------------|-----------------------------------------------------------------|
| I1.1  | Renders SkipLink                             | Skip link element in DOM                                        |
| I1.2  | Renders SecondaryBar                         | Secondary bar visible on desktop                                |
| I1.3  | Renders primary nav with logo                | LogoButton with LogoContainer visible                           |
| I1.4  | Renders DesktopNavItems on desktop           | 5 triggers + search + CTA visible at >= 1024px                  |
| I1.5  | Renders MobileControls on mobile             | Avatar + hamburger visible at < 1024px                          |
| I1.6  | Logo click navigates to /                    | `navigate('/')` called on logo click                            |
| I1.7  | Mega menus render based on config            | All 5 MegaMenuEntry components registered                       |
| I1.8  | Hover Reports → ReportsDropdown opens        | `activeDropdown` = 'reports' → ReportsDropdown `isOpen={true}`  |
| I1.9  | Hover away closes dropdown                   | After 100ms, dropdown closes                                    |
| I1.10 | Backdrop blur appears for mega menus         | `bg-black/[0.02] backdrop-blur-[2px]` visible when dropdown open|
| I1.11 | No backdrop for company dropdown             | Backdrop NOT rendered when `activeDropdown === 'company'`       |
| I1.12 | Outlet renders page content                  | Child route component appears in `<main id="main-content">`    |
| I1.13 | ARIA live region announces dropdown          | Screen reader text updates on dropdown open/close               |

### 5.2 Auth Flow Integration

| ID    | Test case                                    | Expected behavior                                               |
|-------|----------------------------------------------|-----------------------------------------------------------------|
| I2.1  | Sign in button navigates to /auth?mode=signin| Clicking Sign in in SecondaryBar navigates correctly            |
| I2.2  | Sign up button navigates to /auth?mode=signup| Clicking Sign up in SecondaryBar navigates correctly            |
| I2.3  | Auth pages don't show navbar                 | /auth route renders AuthLayout, not NavLayout                   |
| I2.4  | After login, avatar appears                  | Completing auth flow shows avatar in navbar                     |
| I2.5  | Sign out returns to logged-out state         | Clicking sign out in popover shows AuthButtons again            |

### 5.3 Cross-Page Consistency

| ID    | Test case                                    | Expected behavior                                               |
|-------|----------------------------------------------|-----------------------------------------------------------------|
| I3.1  | Nav container alignment                      | Page `.nav-container` content left-aligns with navbar logo      |
| I3.2  | Sticky nav stays on scroll                   | Primary nav remains visible after scrolling 500px               |
| I3.3  | Secondary bar scrolls away                   | Secondary bar scrolls out of viewport                           |
| I3.4  | Nav z-index above page content               | Navbar overlays page content when sticky                        |
| I3.5  | Mobile menu covers full viewport             | Push menu overlay covers 100% width/height below nav            |

---

## 6. Accessibility Tests

### 6.1 Keyboard Navigation

| ID    | Test case                                    | Expected behavior                                               |
|-------|----------------------------------------------|-----------------------------------------------------------------|
| K1.1  | Tab through all nav items                    | Focus moves through: SkipLink → SecondaryBar links → Company → Auth → Logo → DesktopNavItems triggers → Search → CTA |
| K1.2  | Enter opens dropdown                         | Pressing Enter on Reports trigger opens ReportsDropdown         |
| K1.3  | Space opens dropdown                         | Pressing Space on Reports trigger opens ReportsDropdown         |
| K1.4  | Escape closes dropdown                       | Pressing Escape while dropdown open closes it                   |
| K1.5  | Escape closes auth popover                   | Pressing Escape while popover open closes it                    |
| K1.6  | Skip link jumps to main content              | Activating skip link moves focus to `#main-content`             |

### 6.2 ARIA Attributes

| ID    | Test case                                    | Expected behavior                                               |
|-------|----------------------------------------------|-----------------------------------------------------------------|
| K2.1  | Dropdown triggers have `aria-expanded`       | `true` when open, `false` when closed                           |
| K2.2  | Dropdown triggers have `aria-haspopup`       | `aria-haspopup="true"` on all trigger buttons                   |
| K2.3  | Popover has `role="menu"`                    | AuthPopover container has menu role                             |
| K2.4  | Menu items have `role="menuitem"`            | PopoverMenuItem elements have menuitem role                     |
| K2.5  | Live region announces changes                | `role="status" aria-live="polite"` element updates              |
| K2.6  | Logo button has accessible name              | `aria-label="Ken Research Home"` present                        |
| K2.7  | Hamburger button has accessible name         | Accessible label describes menu state                           |

### 6.3 Screen Reader

| ID    | Test case                                    | Expected behavior                                               |
|-------|----------------------------------------------|-----------------------------------------------------------------|
| K3.1  | "Reports menu opened" announced              | Live region text when Reports dropdown opens                    |
| K3.2  | "Menu closed" announced                      | Live region text when dropdown closes                           |
| K3.3  | Avatar button describes auth state           | Different label for logged-in vs logged-out                     |
| K3.4  | Indicator dot hidden from AT                 | Red dot is `aria-hidden="true"` or decorative                   |

### 6.4 Focus Management

| ID    | Test case                                    | Expected behavior                                               |
|-------|----------------------------------------------|-----------------------------------------------------------------|
| K4.1  | Focus-visible ring on all buttons            | 2px ring appears on keyboard focus for all interactive elements |
| K4.2  | No focus ring on mouse click                 | Ring only shows on keyboard navigation                          |
| K4.3  | Focus trap in mobile menu (when implemented) | Tab cycles within mobile menu when open                         |
| K4.4  | Focus returns after popover close            | Focus moves back to trigger button after popover dismissal      |

---

## 7. Visual Regression Checkpoints

These are key visual states to capture for snapshot/visual regression testing:

| Checkpoint                    | Viewport | Auth state  | Nav state           |
|-------------------------------|----------|-------------|---------------------|
| Desktop default               | 1366px   | Logged out  | All closed          |
| Desktop with dropdown         | 1366px   | Logged out  | Reports open        |
| Desktop logged in             | 1366px   | Logged in   | All closed          |
| Desktop auth popover          | 1366px   | Logged in   | Popover open        |
| Desktop company dropdown      | 1366px   | Logged out  | Company open        |
| Tablet default                | 768px    | Logged out  | All closed          |
| Tablet with hamburger open    | 768px    | Logged out  | Mobile menu open    |
| Mobile default                | 375px    | Logged out  | All closed          |
| Mobile logged in              | 375px    | Logged in   | All closed          |
| Mobile auth popover           | 375px    | Logged in   | Popover open        |
| Mobile hamburger open         | 375px    | Logged out  | Mobile menu open    |

---

## 8. Test Implementation Notes

### Recommended stack
- **Runner:** Vitest
- **DOM:** jsdom (or happy-dom)
- **Component testing:** @testing-library/react + @testing-library/user-event
- **Accessibility:** vitest-axe (or jest-axe adapter)
- **Visual regression:** Playwright (separate, browser-based)

### Mocking requirements
- `useNavigate` from 'react-router' — mock with `vi.fn()`
- `useAuth` from AuthContext — wrap tests in `AuthProvider` or mock context
- `LogoContainer` import — mock as simple `<div>` (SVG import)
- `window.matchMedia` — mock for responsive breakpoint tests
- `document.addEventListener('mousedown')` — real DOM for outside-click tests
- Touch detection — mock `navigator.maxTouchPoints` and `ontouchstart`

### File naming convention
```
/src/app/components/navbar/__tests__/
├── hooks/
│   ├── useNavDropdown.test.ts
│   ├── useAuthPopover.test.ts
│   └── useMobileMenu.test.ts
├── atoms/
│   ├── NavLink.test.tsx
│   ├── LogoButton.test.tsx
│   ├── DropdownChevron.test.tsx
│   └── ...
├── molecules/
│   ├── NavDropdownTrigger.test.tsx
│   ├── CompanyTrigger.test.tsx
│   └── ...
├── organisms/
│   ├── SecondaryBar.test.tsx
│   ├── DesktopNavItems.test.tsx
│   └── ...
├── integration/
│   ├── NavLayout.test.tsx
│   └── auth-flow.test.tsx
└── a11y/
    ├── keyboard.test.tsx
    └── aria.test.tsx
```

---

**Total test cases:** 106
**Last Updated:** February 2026
