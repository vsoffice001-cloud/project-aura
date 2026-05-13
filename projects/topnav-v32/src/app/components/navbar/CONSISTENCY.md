# Navbar Consistency Guide

> Rules and contracts for maintaining a consistent navigation experience across every page on the Ken Research website. This document is the source of truth for any developer adding new pages, sections, or layouts.

---

## 1. Layout Architecture

The site uses two layout patterns. Every page must use exactly one.

### NavLayout (standard pages)

All content pages live as children of `NavLayout` in the route config. NavLayout provides:
- **Secondary bar** (40px, desktop only) with utility links + auth
- **Primary nav** (60px, sticky) with logo, nav triggers, search, CTA
- **Mega menu dropdowns** (injectable via config)
- **Mobile menu** (push overlay, < 1024px)
- **`<Outlet />`** renders the page content inside `<main id="main-content">`

```tsx
// routes.ts — every standard page is a child of NavLayout
{
  path: '/',
  Component: NavLayout,
  children: [
    { index: true, Component: HomePage },
    { path: 'reports', Component: ReportsPage },
    { path: 'about', Component: AboutPage },
    { path: '*', Component: HomePage },  // catch-all fallback
  ],
}
```

**Rule:** Never render NavLayout components (SecondaryBar, DesktopNavItems, etc.) manually inside a page. NavLayout handles all navigation chrome. Pages only render content.

### AuthLayout (auth screens)

Auth pages (`/auth`, `/auth/verify`, `/auth/complete-profile`, `/auth/success`) sit **outside** NavLayout. They use `AuthLayout` which provides:
- Centered card (max 420px) with Ken Research logo
- `onBack` (back arrow) and `onClose` (X button + click-outside dismiss)
- Trust footer (SSL/GDPR badges)
- No navbar, no secondary bar, no mega menus

```tsx
// routes.ts — auth routes are top-level, NOT children of NavLayout
{ path: '/auth', Component: AuthPage },
{ path: '/auth/verify', Component: OTPVerification },
```

**Rule:** Auth screens must never show the main navbar. The logo in AuthLayout links back to `/` (home), which re-enters NavLayout.

---

## 2. Container & Horizontal Alignment

Every section on every page must use the `.nav-container` class for horizontal centering. This ensures content aligns with the navbar logo, nav items, and CTA button.

```tsx
// CORRECT — content aligns with navbar
<section className="py-24 bg-white">
  <div className="nav-container">
    {/* content */}
  </div>
</section>

// WRONG — content misaligns with navbar
<section className="py-24 bg-white">
  <div className="max-w-7xl mx-auto px-4">
    {/* content will NOT align with nav */}
  </div>
</section>
```

### Container breakpoints (for reference)

| Breakpoint     | Viewport  | Side padding | Content width                |
|----------------|-----------|--------------|------------------------------|
| Mobile         | < 768px   | 24px (px-6)  | 100vw - 48px                 |
| Tablet         | >= 768px  | 40px (px-10) | 100vw - 80px                 |
| Desktop Small  | >= 1024px | 60px         | 100vw - 120px                |
| Desktop Std    | >= 1200px | 100px        | 100vw - 200px                |
| Desktop Wide   | >= 1366px | 120px        | max 1200px (1440 - 240)      |

**Rule:** The design target is 1200px content width at 1366px+ viewports. Never use a different max-width for page content.

---

## 3. Typography

### Font family
The entire site uses **DM Sans** (imported via `/src/styles/fonts.css` with optical size axis `opsz 9..40` and weights 400/500/700).

- Inside the navbar package: use `.font-nav` utility class
- Inside page content: use `font-['DM_Sans',sans-serif]` (or adopt `.font-nav` — they're identical)
- Never use Inter, system fonts, or any other typeface unless explicitly approved

### Font loading
DM Sans is loaded via Google Fonts in `fonts.css`. It's imported at the top of `App.tsx`. Do not add duplicate font imports in page-level CSS.

### Text color palette

| Token                    | Hex       | Usage                                     |
|--------------------------|-----------|-------------------------------------------|
| `--color-primary-black`  | `#141016` | Headings, primary text, dark backgrounds  |
| `--color-secondary-grey` | `#656565` | Body text, descriptions, secondary labels |
| `--color-light-grey`     | `#999999` | Tertiary text, section headers, captions  |
| `--color-red`            | `#b01f24` | Links, hover states, CTAs, brand accents  |
| `--color-purple`         | `#806ce0` | Accent highlights, badges, decorative     |
| `#fcfcfc` / `#fafafa`    | —         | Light section backgrounds                 |

**Rule:** Use these exact hex values. Do not approximate (#666 instead of #656565, #b00 instead of #b01f24, etc.).

### Hover pattern
All interactive text follows the same hover transition:
- Default: `text-[#656565]` (grey)
- Hover: `text-[#b01f24]` (brand red)
- Transition: `transition-colors duration-200`

This applies to navbar links, footer links, dropdown items, and any page-level text links.

---

## 4. Color & Background Rules

### Section backgrounds (approved palette)

| Background                          | Usage                          |
|-------------------------------------|--------------------------------|
| `bg-white` / `#ffffff`              | Standard content sections      |
| `bg-[#fcfcfc]`                      | Light grey sections, cards     |
| `bg-[#fafafa]`                      | Secondary bar, subtle alt rows |
| `bg-[#141016]`                      | Dark sections (stats, CTA)     |
| `bg-gradient-to-br from-[#fcfcfc] via-white to-[#f5f5fd]` | Hero, featured sections |
| `bg-gradient-to-r from-[#141016] via-[#1a1520] to-[#141016]` | Dark gradient CTAs |

**Rule:** Don't introduce new background colors. The navbar's white (`bg-white`) and secondary bar's `#fafafa` must visually "flow into" the page content without jarring contrast jumps.

### Border pattern
Consistent border color across the entire site:
- `border-[rgba(20,16,22,0.1)]` — standard borders (cards, dividers)
- `border-[rgba(0,0,0,0.05)]` — very subtle borders (secondary bar bottom)
- `border-[#e6e6e6]` — dropdown dividers

---

## 5. Spacing & Grid

### Vertical rhythm
- Section padding: `py-24` (96px) for standard sections, `py-16` (64px) for compact
- Heading-to-content gap: `mb-16` (64px) for section titles, `mb-4` for heading-to-subtitle
- Card grid gap: `gap-8` (32px)

### Horizontal grid
- Use CSS Grid or Flexbox within `nav-container`
- Standard grid: `grid md:grid-cols-2` or `grid md:grid-cols-3` or `grid md:grid-cols-4`
- Column gap: `gap-8` (32px) minimum, `gap-12` (48px) for wide layouts, `gap-16` (64px) for 2-column hero splits

---

## 6. Interactive Elements

### Buttons (CTA)
All buttons must use the Design System `Button` component from `/src/app/components/ds/Button.tsx`:

```tsx
import { Button } from './components/ds/Button';

// Primary CTA (brand red gradient, shimmer effect)
<Button variant="brand" size="md">Explore Reports</Button>

// Secondary CTA (outlined, dark border)
<Button variant="secondary" size="md">Book a Call</Button>

// Navbar CTA (compact)
<Button variant="brand" size="sm">Book discovery call</Button>
```

**Rule:** Do NOT create raw `<button>` elements with inline gradient/padding styles for CTAs. Use the `Button` component. The homepage currently has raw buttons that should migrate to `Button` in a future pass.

### Links
All text links follow the navbar's hover pattern:
- `text-[#656565] hover:text-[#b01f24] transition-colors`
- Underline only when semantically necessary (not for nav-style links)

### Cards
Standard card pattern:
```
rounded-[16px] bg-[#fcfcfc] border border-[rgba(20,16,22,0.1)]
hover:border-[#806ce0] hover:shadow-[0px_4px_24px_0px_rgba(128,108,224,0.15)]
transition-all duration-300
```

---

## 7. Responsive Behavior

### Breakpoint contract with the navbar

| Viewport     | Nav shows                      | Page should                                    |
|--------------|--------------------------------|------------------------------------------------|
| < 768px      | Logo + avatar + hamburger      | Stack to single column, `px-6` via nav-container |
| 768-1023px   | + secondary bar                | 2-column grids OK, `px-10` via nav-container    |
| >= 1024px    | + full desktop nav             | Full grid layouts, `px-[60px]` via nav-container |
| >= 1200px    | Same, wider padding            | `px-[100px]` via nav-container                  |
| >= 1366px    | Same, max 1440px container     | Content caps at 1200px, perfectly aligned       |

**Rule:** Never use breakpoints that conflict with these. Don't show desktop-only content at `md` (768px) if it would visually conflict with the hamburger nav still being active at that width.

### Sticky nav interaction
- The primary nav is `sticky top-0 z-[50]`
- Page content scrolls beneath it
- Full-page sections with `min-h-screen` should account for the 60px nav height: use `min-h-[calc(100vh-60px)]` or `pt-[60px]` for hero sections if needed
- The secondary bar (40px) is NOT sticky — it scrolls away

---

## 8. Navigation State & Auth

### Auth state consistency
`AuthContext` provides `isAuthenticated` and `user` globally. The navbar reacts automatically:
- Logged out: Sign in/up buttons (desktop), person silhouette + red dot (mobile)
- Logged in: User name + avatar + popover (desktop), initials avatar (mobile)

Pages can read auth state via `useAuth()` but should never modify navbar appearance directly. The navbar owns its own auth UI.

### Active page indication
Currently, nav items don't show "active page" state (no route-based highlighting). When this is added, it must use the `NavDropdownTrigger` or `NavLink` `active` prop — never inline styles on the page.

### Navigation behavior
- All internal navigation uses React Router (`useNavigate`, `<Link>`)
- Navbar links use `onClick={() => navigate('/path')}` (not `<a href>`)
- Footer links currently use `<a href="#">` — these should eventually migrate to React Router `<Link>` for SPA consistency

---

## 9. Z-Index Stack

The navbar owns the top z-index layers. Page content must stay below.

| Layer                  | Z-index | Owner          |
|------------------------|---------|----------------|
| Secondary bar          | 60      | NavLayout      |
| Primary nav            | 50      | NavLayout      |
| Backdrop blur          | 45      | NavLayout      |
| Mobile menu overlay    | 40      | MobileMenu     |
| Page modals/popovers   | 30-39   | Page content   |
| Page content           | auto    | Page content   |

**Rule:** Page-level modals, tooltips, and popovers must use z-index < 40 to avoid conflicting with the navbar.

---

## 10. Accessibility Contract

The navbar provides these accessibility features globally. Pages must not break them:

| Feature              | Navbar provides                            | Page must NOT do                         |
|----------------------|--------------------------------------------|-----------------------------------------|
| Skip link            | "Skip to main content" → `#main-content`  | Remove or rename `<main id="main-content">` |
| ARIA live region     | Dropdown announcements                     | Add competing `aria-live` regions at top of DOM |
| Focus management     | Focus ring on all interactive elements     | Use `outline: none` without visible alternative |
| Keyboard navigation  | Enter/Space/Escape for dropdowns           | Trap focus in page elements that block Escape |
| Color contrast       | WCAG AA (4.5:1 for text)                   | Use colors below contrast threshold      |

---

## 11. File/Import Conventions

### Page component structure
```tsx
// /src/app/pages/AboutPage.tsx
export function AboutPage() {
  return (
    <>
      <section className="py-24 bg-white">
        <div className="nav-container">
          {/* Section content */}
        </div>
      </section>
      {/* More sections... */}
    </>
  );
}
```

- Export as named function (not default)
- Return fragment `<>` wrapping `<section>` elements
- Each section has its own background, padding, and `nav-container`
- No `<header>`, `<nav>`, or `<footer>` at page level (NavLayout handles header/nav, footer is part of the home page and should eventually be extracted to NavLayout)

### Route registration
```tsx
// routes.ts — add new pages as children of NavLayout
{
  path: '/',
  Component: NavLayout,
  children: [
    { index: true, Component: HomePage },
    { path: 'about', Component: AboutPage },     // NEW
    { path: 'reports', Component: ReportsPage },  // NEW
    { path: '*', Component: HomePage },
  ],
}
```

---

## 12. Known Inconsistencies (To Fix)

These are documented deviations from the consistency rules. They exist in the current codebase and should be addressed:

| File               | Issue                                                       | Fix                                          |
|--------------------|-------------------------------------------------------------|----------------------------------------------|
| `HomePage.tsx`     | Uses `font-['DM_Sans',sans-serif]` ~30 times               | Migrate to `font-nav` class                  |
| `HomePage.tsx`     | Raw `<button>` elements with inline gradient styles         | Migrate to DS `Button` component             |
| `HomePage.tsx`     | Footer lives inside the page, not in NavLayout              | Extract to a `Footer` organism in NavLayout  |
| `AuthLayout.tsx`   | Uses `font-['DM_Sans',sans-serif]` in trust footer         | Migrate to `font-nav` class                  |
| Mega menu dropdowns| ConsultingDropdown, IndustriesDropdown, etc. use inline font | Migrate to `font-nav` class                  |
| Footer links       | Use `<a href="#">` instead of React Router                  | Migrate to `<Link to="/path">`               |

---

**Last Updated:** February 2026
**Related:** [ARCHITECTURE.md](./ARCHITECTURE.md) | [NAVBAR_USAGE.md](./NAVBAR_USAGE.md) | [CHANGELOG.md](./CHANGELOG.md)
