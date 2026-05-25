# Consumer Rules — Using topnav-v32 as a Dummy Header in New Page Builds

> Audience: anyone building a new page (case study, report page, marketing landing) who needs the canonical Ken Research header *visually present* without wiring real auth / real routes / real search. This document distils what to keep verbatim, what to stub, and what props to pass.
>
> Treat the topnav-v32 navbar as a **fully built dummy chrome** — instant context-setting for any new design without re-implementing nav.

---

## 1. What you import (and from where)

Single drop-in component. Everything else is supplied as a prop.

```tsx
import { TopNavigation } from '<path-to>/navbar/organisms';
import type { NavItemConfig, MegaMenuEntry, NavUser } from '<path-to>/navbar/types';
```

The barrel `<path-to>/navbar/index.ts` exports everything (atoms, molecules, organisms, hooks, types). For a consumer, only `TopNavigation` + the four types are needed in 99% of cases.

**Do NOT import:**

- The mega menu panel components (`ReportsDropdown`, `IndustriesDropdown`, etc.) unless you want the real Ken mega menus. They live in `app/components/`, not in the navbar package — they are **consumer content**.
- The `MobileMenu` push overlay — it's also consumer content (`app/components/mobile/MobileMenu.tsx`).
- The CompanyDropdown — also consumer content.
- `NavLayout` — it's a *template* showing how to wire the dummy; you write your own layout.

The package boundary is enforced (README.md:84-93). If you find yourself reaching for files outside `navbar/`, you've crossed it.

---

## 2. Minimum-viable dummy wiring

The smallest valid call. Use this when you want the nav to *render* and look right, but every action should be a noop.

```tsx
import { TopNavigation } from '@/components/navbar/organisms';
import { Logo } from '@/design-system/components/Logo';

export function PageWithDummyNav({ children }) {
  return (
    <div className="min-h-screen bg-white">
      <TopNavigation
        logo={<Logo size="sm" />}
        isAuthenticated={false}
        onNavigate={() => {}}     // stub
        onSignOut={() => {}}      // stub
        // items, megaMenus, ctaButton, companyDropdown, mobileMenu all omitted
      />
      <main id="main-content">{children}</main>
    </div>
  );
}
```

What this gives you:

- Secondary bar with Procurement / Expert Panel / Company trigger + Sign in / Sign up buttons (logged-out state).
- Sticky primary nav with logo + 5 default triggers (Reports / Industries / Surveys / Consulting / Insights, from `DEFAULT_NAV_ITEMS` in `DesktopNavItems.tsx:29-35`) + search + **no CTA** (since `ctaButton` is undefined, the conditional render at `DesktopNavItems.tsx:71` skips it).
- Mobile hamburger that toggles but opens nothing (since `mobileMenu` is undefined).
- All triggers will *open the auth popover* on the avatar, *highlight* on hover, but the mega menu rows beneath show no content (`megaMenus={[]}` default).

This is the "dummy" mode. Everything is visually present; nothing actually does anything. Perfect for static page mocks.

---

## 3. Recommended dummy wiring (looks more "real")

If you want the nav to look like a fully populated production nav while still stubbing actions, add a CTA and a stubbed company dropdown:

```tsx
<TopNavigation
  logo={<Logo size="sm" />}
  isAuthenticated={false}
  onNavigate={(path) => console.log('nav stub:', path)}
  onSignOut={() => {}}
  ctaButton={<Button variant="brand" size="sm">Book discovery call</Button>}
  companyDropdown={(isOpen) => (
    <div className={isOpen ? 'absolute top-full left-0 mt-1 p-3 w-56 bg-white rounded-lg shadow-lg border border-[rgba(20,16,22,0.1)]' : 'hidden'}>
      <a className="block px-2 py-1.5 text-sm text-[#656565] hover:text-[#b01f24]">About</a>
      <a className="block px-2 py-1.5 text-sm text-[#656565] hover:text-[#b01f24]">Careers</a>
      <a className="block px-2 py-1.5 text-sm text-[#656565] hover:text-[#b01f24]">Contact</a>
    </div>
  )}
/>
```

Or just import the real `CompanyDropdown` if you accept the dependency.

For mega menus during dummy use: **omit `megaMenus` entirely**. Triggers will animate but nothing will drop down. That's correct for most case-study and content-page contexts where you don't want users disappearing into Reports / Industries mid-page.

---

## 4. What to KEEP visually (do not modify)

These are the visual signatures of the Ken header. Changing them will drift from canon.

| Element | Spec | Where defined |
|---|---|---|
| Secondary bar background | `#fafafa` with `border-b rgba(0,0,0,0.05)` | `SecondaryBar.tsx:55` |
| Primary nav background | `bg-white` with `backdrop-blur-[4px]` | `TopNavigation.tsx:178` |
| Primary nav shadow | `0px 8px 12px -4px rgba(128,108,224,0.15)` (purple) | `TopNavigation.tsx:178` |
| Heights | 40px secondary · 60px primary | `SecondaryBar.tsx:55`, `TopNavigation.tsx:178` |
| Sticky behaviour | Only primary nav sticky `top-0 z-[50]`; secondary scrolls away | `TopNavigation.tsx:162` |
| Hover gradient underline | `from-[#141016] via-[#656565] to-[#b01f24]` 2px scale-x | `NavDropdownTrigger.tsx:73` |
| Trigger text colour | `#141016 → #b01f24` on hover | `NavDropdownTrigger.tsx:52` |
| Search bar | 120×35 pill with purple beam-orbit animation | `SearchBar.tsx:35-44`, `theme.css:417-462` |
| Auth popover spring animation | `stiffness: 400, damping: 25` | `AuthPopover.tsx:74` |
| Backdrop blur when mega open | `bg-black/[0.02] backdrop-blur-[2px] z-[45]` | `TopNavigation.tsx:172` |
| Trigger row gap | `gap-6 xl:gap-8` (24/32px) | `DesktopNavItems.tsx:56` |
| `.nav-container` responsive padding | 24 → 40 → 60 → 100 → 120 | `tailwind.css:107-149` |
| Font | DM Sans via `.font-nav` | `theme.css:394-396` |
| Tap targets | 44×44 on hamburger; 44px min on iconBg popover items | `MobileControls.tsx:87`, `AuthPopover.tsx:142, 150` |

**Hard rule:** all these tokens / hex values are exact, not approximate (CONSISTENCY.md:111). Don't substitute `#666` for `#656565` or `#b00` for `#b01f24`.

---

## 5. What to STUB (no live behaviour)

| Action | Stub signature | Notes |
|---|---|---|
| Navigation | `onNavigate={() => {}}` or `onNavigate={(p) => console.log(p)}` | Required prop. Used by logo click default, auth popover Sign in/out paths, and any internal `onLogoClick` defaults |
| Logo click | `onLogoClick={() => {}}` | Optional — defaults to `onNavigate('/')` |
| Sign out | `onSignOut={() => {}}` | Required prop. Wire when auth is real |
| Search input | `<SearchBar onSearch={() => {}} />` (default no-op fine) | Search bar accepts an optional `onSearch?: (q: string) => void` callback (`SearchBar.tsx:25`). Internal `<input>` is uncontrolled — typing works visually but no submission/results |
| Auth state | `isAuthenticated={false}` constant | Avoid wiring `useAuth()` unless your page actually depends on it |
| User object | `user={null}` | Triggers logged-out renderings everywhere |
| Mega menu open | `megaMenus={[]}` (the default) | Triggers visually animate but reveal nothing |
| Mobile menu | `mobileMenu={undefined}` | Hamburger toggles but nothing renders |
| Company dropdown | `companyDropdown={undefined}` or stub markup | Trigger animates but no panel |
| Form actions inside auth screens | N/A — `AuthLayout` is out of scope for the navbar package | Auth screens are separate (per CONSISTENCY.md:37-50) |

**Pattern:** All callbacks accept noop. None of them are *required* to do real work for the nav to render and look right.

---

## 6. Auth handling — three options

### Option A — Hard-stubbed logged-out (recommended for static mocks)

```tsx
<TopNavigation isAuthenticated={false} user={null} onSignOut={() => {}} ... />
```

Shows: Sign in / Sign up on secondary bar; person silhouette + red dot avatar on mobile.

### Option B — Hard-stubbed logged-in (for "post-login dashboard" mocks)

```tsx
<TopNavigation
  isAuthenticated={true}
  user={{ name: 'Demo User', email: 'demo@example.com', initials: 'DU' }}
  onSignOut={() => {}}
  ...
/>
```

Shows: Demo User name + 28px initials avatar; popover with My Account / Saved Reports / Settings / Sign out (all noops on close).

### Option C — Real `AuthContext`

Only if your page actually needs to test live auth flows. Wrap your page tree in `<AuthProvider>` (from `app/context/AuthContext.tsx`) and read with `useAuth()`. **This couples your page to the topnav-v32 AuthContext implementation**, which is in-memory only (per `STATUS.md:32` — *"Auth is in-memory prototype only — no persistence, no real backend wiring"*). Don't ship a real consumer with this.

---

## 7. Page content alignment contract

Every section on your page must use `.nav-container` for horizontal centering, so content aligns with the navbar logo, triggers, and CTA. From CONSISTENCY.md:60-71:

```tsx
// CORRECT
<section className="py-24 bg-white">
  <div className="nav-container">
    {/* content */}
  </div>
</section>

// WRONG
<section className="py-24 bg-white">
  <div className="max-w-7xl mx-auto px-4">
    {/* content will NOT align with nav */}
  </div>
</section>
```

If you skip `.nav-container`, you'll see telltale misalignment at the 1366px breakpoint where your logo sits at 120px left and your hero text sits somewhere else. Always inherit the container.

---

## 8. Sticky-nav reservation

The primary nav is `sticky top-0 z-[50]` and 60px tall (secondary scrolls away). Page-level fixed/sticky elements must reserve:

- **No** vertical padding for the nav at the top of the page (the nav itself takes flow space; your `<main>` starts directly below it).
- **z-index < 40** for page modals, tooltips, sticky CTAs (CONSISTENCY.md:248 — *"Page-level modals, tooltips, and popovers must use z-index < 40 to avoid conflicting with the navbar."*).
- If you have a hero `min-h-screen`, use `min-h-[calc(100vh-60px)]` to account for the sticky nav height (CONSISTENCY.md:213).

---

## 9. Mega-menu stubbing — when to populate, when to leave empty

| Page type | Recommended `megaMenus` |
|---|---|
| Case study page (single narrative) | `[]` — don't let user escape into Reports/Industries mid-read |
| Marketing landing | `[]` or 1 entry (e.g. Reports) for cross-sell |
| Reports listing | full set — users expect to switch verticals |
| Auth screens | N/A (uses `AuthLayout`, NOT `NavLayout`) |
| About / Contact | `[]` — utility pages, no discovery flow needed |

When stubbing a mega panel:

```tsx
megaMenus={[
  {
    id: 'reports',
    render: (isOpen) => (
      <div className={isOpen ? 'border-t border-[rgba(0,0,0,0.05)] bg-white py-8 px-6' : 'hidden'}>
        <div className="nav-container">
          <p className="font-nav text-sm text-[#656565]">Mega menu stub — replace with real content</p>
        </div>
      </div>
    ),
  },
]}
```

Trigger ids must match what's in your `items` prop (or the defaults). Mismatched id → trigger opens, nothing renders.

---

## 10. Full prop API stub (TypeScript reference)

For consumers writing their own TS wrapper around `TopNavigation`:

```ts
import type { ReactNode } from 'react';

/** From navbar/types.ts (verbatim) */
export interface NavUser {
  name: string;
  email: string;
  initials: string;
}

export interface NavItemConfig {
  id: string;     // e.g. 'reports' — must match MegaMenuEntry.id
  label: string;  // e.g. 'Reports' — display text
}

export interface MegaMenuEntry {
  id: string;                                // matches NavItemConfig.id
  render: (isOpen: boolean) => ReactNode;    // renders the panel
}

/** From organisms/TopNavigation.tsx */
export interface TopNavigationProps {
  logo: ReactNode;                                                    // required
  onLogoClick?: () => void;                                           // optional, defaults to onNavigate('/')
  isAuthenticated: boolean;                                           // required
  user?: NavUser | null;                                              // optional
  onNavigate: (path: string) => void;                                 // required
  onSignOut: () => void;                                              // required
  items?: NavItemConfig[];                                            // optional, defaults to 5 Ken items
  megaMenus?: MegaMenuEntry[];                                        // optional, defaults to []
  ctaButton?: ReactNode;                                              // optional
  companyDropdown?: (isOpen: boolean) => ReactNode;                   // optional
  mobileMenu?: (isOpen: boolean, onClose: () => void) => ReactNode;   // optional
}
```

Field-by-field required/optional matrix:

| Prop | Required | Default | Stub-friendly? |
|---|---|---|---|
| `logo` | Yes | — | Pass `<Logo size="sm" />` or any 20px-tall node |
| `onLogoClick` | No | `() => onNavigate('/')` | Yes |
| `isAuthenticated` | Yes | — | Yes, `false` or `true` |
| `user` | No | undefined | Pass `null` when logged out |
| `onNavigate` | Yes | — | Yes, `() => {}` |
| `onSignOut` | Yes | — | Yes, `() => {}` |
| `items` | No | 5 default Ken items | Yes |
| `megaMenus` | No | `[]` | Yes |
| `ctaButton` | No | undefined | Yes |
| `companyDropdown` | No | undefined | Yes |
| `mobileMenu` | No | undefined | Yes |

`logo`, `isAuthenticated`, `onNavigate`, `onSignOut` are the four mandatory props. Everything else is optional and the component will render correctly without it.

---

## 11. CSS requirements (consumer host app must provide)

From README.md:104-114:

1. **`.font-nav` utility class** — copy from `theme.css:394-396`. Maps to `font-family: 'DM Sans', sans-serif;`.
2. **`.nav-container` utility class** — copy from `tailwind.css:107-149`. Responsive centered container.
3. **CSS custom properties** — at minimum `--nav-primary-text`, `--nav-helper-text`, `--nav-menu-item`, `--nav-section-header`, `--nav-lh-primary`, `--nav-lh-helper`, `--nav-lh-menu`, plus the colour palette (`theme.css:43-91`).
4. **Tailwind CSS v4** — components use Tailwind utility classes throughout.
5. **DM Sans font loaded** — Google Fonts import or self-hosted woff2, with `opsz 9..40` and weights 400/500/700.

If any are missing, the nav will render but look wrong (wrong font, misaligned padding, missing colour vars resolved to inherit / black).

---

## 12. What NOT to do

Common port mistakes:

- **Don't re-implement atoms.** The navbar exports them. Need a link with the navbar style? Use `TextLink` from DS (or `NavLink` from navbar). Need a divider? `Divider` / `NavDivider`. Re-implementing breaks visual consistency.
- **Don't wrap the nav in its own div with padding.** The nav owns its own `.nav-container`. Adding `<div className="px-4 py-2"><TopNavigation /></div>` will shrink the bar inside your wrapper and misalign with the body.
- **Don't override the nav background or shadow.** These are brand signatures.
- **Don't render two TopNavigations** (e.g. one for "auth screens" and one for "main"). Auth screens use `AuthLayout` (which has no nav at all), not a second TopNavigation (CONSISTENCY.md:37-50).
- **Don't bypass `onNavigate`.** If you put raw `<a href="/x">` anchors inside an injected dropdown, you'll get full-page reloads instead of SPA navigation. Always wire through `onNavigate(path)` — which the consumer maps to `react-router`'s `navigate(path)`.
- **Don't hard-code `isAuthenticated={true}` in production.** Wire real auth state when shipping, or you'll mislead users with a logged-in-look navbar before login.
- **Don't forget `<main id="main-content">`.** The `SkipLink` jumps to `#main-content` — if your page doesn't have one, the skip link fails (CONSISTENCY.md:259).

---

## 13. Snippet — clip-and-go dummy

Single block to drop into any new page during scaffolding. Replace `'@/...'` paths with whatever the host project uses.

```tsx
'use client'; // if Next.js App Router

import { TopNavigation } from '@/navbar/organisms';
import { Logo } from '@/design-system/components/Logo';
import { Button } from '@/design-system/components/Button';

export function DummyNavShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <TopNavigation
        logo={<Logo size="sm" />}
        isAuthenticated={false}
        user={null}
        onNavigate={(path) => console.log('[dummy nav]', path)}
        onSignOut={() => console.log('[dummy nav] sign out')}
        ctaButton={<Button variant="brand" size="sm">Book discovery call</Button>}
        // omit items → defaults to 5 Ken items
        // omit megaMenus → triggers animate but nothing opens
        // omit companyDropdown → company trigger animates but nothing opens
        // omit mobileMenu → hamburger toggles but nothing renders
      />
      <main id="main-content">
        {children}
      </main>
    </div>
  );
}
```

That is the canonical dummy. The only thing missing from a real Ken page is content — drop your section JSX inside `{children}` and you'll see the nav exactly as it appears on production designs, with zero wiring overhead and zero risk of nav drift.

---

## 14. When to graduate from dummy to real

Promote the dummy to real wiring (live auth, real mega menus, real router) when:

1. The page is moving from design exploration to dev handover (`STATUS.md` transitions from `cleanup` to `ready-for-tech` per workspace handover discipline).
2. You're building an actual logged-in surface (dashboard, account page).
3. The page is the primary entry point to the Reports / Industries hub.

Until then, the dummy is correct. The whole point of `TopNavigation` being a one-line drop-in with injection slots is that **dummies and production calls look identical** at the call site — only the slots differ.
