# topnav-v32 — Overview (Canonical Header Reference)

> Audit target: `projects/topnav-v32/` · Live URL `http://localhost:3005/` · Read-only audit, no edits.
> Scope per user instruction: top header only (above-nav, primary nav bar, dropdown menus). Body content under nav = dummy and ignored.

---

## WHAT this project IS

A **standalone component project** whose entire deliverable is the Ken Research site-wide **top navigation system**. It is NOT a normal app — the Vite shell and `HomePage.tsx` only exist to render the navbar in a browser so it can be designed, reviewed, and exported. See `STATUS.md:10`:

> "topnav-v32 is a standalone Vite + React component project — it is NOT a standalone app. The entire deliverable is the Ken Research top navigation system (TopNavigation component + sub-pieces). App.tsx and routes.tsx exist only to showcase the component in a browser."

The `README.md:4-5` confirms: "This is a component in a host page. The Vite app exists only as a browser showcase. Tech team integration: drop `TopNavigation` into the target Next.js host app and adapt routing."

This is the only project in the workspace dedicated solely to header concerns. Every other consumer (case-study templates, report-store, V0_lite_report) is expected to import this header verbatim — props-shaped — and supply its own logo, CTA button, mega menu panels, and mobile menu. That makes topnav-v32 the **canonical Header source** for the workspace.

---

## WHY it's canonical Header source

Three reasons make this folder the reference:

1. **Folded discipline.** It is structured strictly per Atomic Design (atoms/molecules/organisms/hooks/types), with explicit dependency rules enforced in `navbar/ARCHITECTURE.md:13-19`:
   - Atoms: nothing
   - Molecules: atoms only
   - Organisms: atoms + molecules
   - Template: atoms + organisms + hooks (never direct molecule usage)
   No other surface in the workspace enforces these boundaries this rigorously.

2. **Single drop-in.** `TopNavigation.tsx` packages the entire navigation experience (skip link, ARIA live region, secondary bar, sticky primary nav, backdrop overlay, mega menu slot loop, mobile menu slot) so consumers add a header with **one** component instead of reassembling ~50 lines of template JSX + 3 hook calls (see header comment, `TopNavigation.tsx:4-9`).

3. **Documented contracts.** `navbar/` ships five sibling docs — `README.md`, `ARCHITECTURE.md`, `NAVBAR_USAGE.md`, `CONSISTENCY.md`, `TESTING.md` — that codify the API, breakpoint matrix, z-index stack, auth states, and 106 test specs. Consumers do not need to read source to integrate.

---

## Tech stack

| Layer | Choice | Source |
|---|---|---|
| Build tool | Vite 6.3.5 | `package.json:71` |
| Framework | React 18.3.1 + TypeScript | `package.json:74` |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) | `package.json:68,70` |
| UI primitives | shadcn/ui (Radix `@radix-ui/react-*` ×24) + Phosphor + Lucide | `package.json:17-42, 15, 49` |
| Animation | `motion` v12 (Framer Motion) | `package.json:50` |
| Routing (showcase only) | `react-router` v7 | `package.json:59` |
| Pkg manager | pnpm 10.33.0, Node ≥20 | `package.json:90-94` |
| Brand variant | Editorial-light (`#ffffff` bg, `#141016` text, `#b01f24` brand red) | `src/styles/theme.css:82-91` |
| Font | DM Sans (variable, opsz 9–40, weights 400/500/700) | `src/styles/fonts.css` + `theme.css:394-396` |

No GSAP, no Lenis (per workspace standard 2026-05-08). Scroll behaviour relies on native CSS + browser-default sticky positioning.

---

## File structure (header-relevant only)

```
projects/topnav-v32/
├── src/
│   ├── styles/
│   │   ├── theme.css                  ← brand tokens, --nav-* vars, animations
│   │   ├── tailwind.css               ← .nav-container utility (responsive padding)
│   │   ├── fonts.css                  ← DM Sans variable
│   │   └── index.css                  ← entry import
│   ├── design-system/
│   │   ├── tokens.ts                  ← JS mirror of theme.css
│   │   └── components/
│   │       ├── TextLink.tsx           ← atom — backs NavLink
│   │       ├── StatusDot.tsx          ← atom — backs IndicatorDot
│   │       ├── Divider.tsx            ← atom — backs NavDivider
│   │       ├── SkipLink.tsx           ← atom — re-exported as navbar SkipLink
│   │       ├── Avatar.tsx             ← molecule — backs AuthAvatar
│   │       ├── MenuItem.tsx           ← molecule — backs PopoverMenuItem
│   │       ├── Logo.tsx               ← consumer logo injection
│   │       └── Button.tsx             ← consumer CTA injection (DS Button)
│   ├── app/
│   │   ├── components/
│   │   │   ├── navbar/                ← THE PACKAGE (canonical header)
│   │   │   │   ├── atoms/             (7 files)
│   │   │   │   │   ├── NavLink.tsx          re-export → DS TextLink
│   │   │   │   │   ├── LogoButton.tsx       50 lines, clickable logo wrap
│   │   │   │   │   ├── DropdownChevron.tsx  43 lines, 10/12px sizes
│   │   │   │   │   ├── IndicatorDot.tsx     re-export → DS StatusDot
│   │   │   │   │   ├── HamburgerIcon.tsx    42 lines, 3-bar↔X anim
│   │   │   │   │   ├── NavDivider.tsx       wrapper → DS Divider
│   │   │   │   │   └── SkipLink.tsx         re-export → DS SkipLink
│   │   │   │   ├── molecules/         (6 files)
│   │   │   │   │   ├── NavDropdownTrigger.tsx  80 lines, gradient underline
│   │   │   │   │   ├── SearchBar.tsx           70 lines, beam-orbit animation
│   │   │   │   │   ├── AuthAvatar.tsx          adapter → DS Avatar
│   │   │   │   │   ├── PopoverMenuItem.tsx     re-export → DS MenuItem
│   │   │   │   │   ├── AuthButtons.tsx         87 lines, sign in/up pair
│   │   │   │   │   └── CompanyTrigger.tsx      70 lines, helper-sized trigger
│   │   │   │   ├── organisms/         (7 files)
│   │   │   │   │   ├── TopNavigation.tsx       208 lines · DROP-IN ENTRY POINT
│   │   │   │   │   ├── SecondaryBar.tsx        105 lines · 40px above-nav
│   │   │   │   │   ├── PrimaryNav.tsx          120 lines · 60px sticky bar
│   │   │   │   │   ├── DesktopNavItems.tsx     77 lines · ≥1024px right cluster
│   │   │   │   │   ├── TabletControls.tsx      111 lines · 768-1023px cluster
│   │   │   │   │   ├── MobileControls.tsx      92 lines · <768px cluster
│   │   │   │   │   ├── AuthPopover.tsx         163 lines · 220px floating card
│   │   │   │   │   └── popover-icons.tsx       61 lines · 6 hand-rolled SVGs
│   │   │   │   ├── hooks/             (3 files)
│   │   │   │   │   ├── useNavDropdown.ts       95 lines · active dropdown + hover debounce + ARIA
│   │   │   │   │   ├── useAuthPopover.ts       54 lines · 3-ref outside-click
│   │   │   │   │   └── useMobileMenu.ts        41 lines · scroll lock
│   │   │   │   ├── types.ts                    44 lines · NavUser / AuthPopoverConfig / NavItemConfig / MegaMenuEntry
│   │   │   │   ├── index.ts                    barrel
│   │   │   │   ├── README.md
│   │   │   │   ├── ARCHITECTURE.md
│   │   │   │   ├── NAVBAR_USAGE.md
│   │   │   │   ├── CONSISTENCY.md
│   │   │   │   ├── TESTING.md
│   │   │   │   └── CHANGELOG.md
│   │   │   ├── CompanyDropdown.tsx       consumer-provided · 224px simple list
│   │   │   ├── ReportsDropdown.tsx       consumer-provided · 4-col mega menu (249 lines)
│   │   │   ├── IndustriesDropdown.tsx    consumer-provided · 4-col mega menu (291 lines)
│   │   │   ├── InsightsDropdown.tsx      consumer-provided · 4-col mega menu (309 lines)
│   │   │   ├── SurveyDropdown.tsx        consumer-provided · 4-col mega menu (274 lines)
│   │   │   ├── ConsultingDropdown.tsx    consumer-provided · 4-col mega menu (220 lines)
│   │   │   ├── ui/MegaMenuDropdown.tsx   shared mega menu wrapper (full-width + backdrop)
│   │   │   ├── ds/Button.tsx             re-export of DS Button (CTA injection)
│   │   │   ├── layout/NavLayout.tsx      template that assembles TopNavigation + Outlet + Footer
│   │   │   ├── mobile/MobileMenu.tsx     consumer-provided · push overlay (re-exports PushMenuContainer)
│   │   │   └── mobile/PushMenu/         5 menu levels (Main, Industries, Reports, Surveys, Consulting, Insights, IndustryDetail)
│   │   ├── pages/HomePage.tsx           showcase only, ignored for header audit
│   │   ├── context/AuthContext.tsx      in-memory auth prototype
│   │   └── routes.tsx                   showcase routing
│   ├── data/industries.tsx              14 industries × segments × icons
│   └── lib/mock-data.ts                 nav structural data (TODO markers)
├── README.md
├── STATUS.md                            handover status: `cleanup`
├── HANDOVER.md                          tech-team integration guide
├── COPY_TO_NEW_PROJECT.md               copy/paste instructions
├── package.json                         pnpm, Node ≥20, name=@figma/my-make-file (rename pending)
└── pnpm-lock.yaml
```

Total nav package: **7 atoms + 6 molecules + 7 organisms + 3 hooks + 1 types module + 1 barrel**. Shared types in `types.ts` prevent contract drift across SecondaryBar / MobileControls / AuthPopover (ARCHITECTURE.md:66-74).

---

## Entry point + injection contract (WWWWH)

**Component:** `src/app/components/navbar/organisms/TopNavigation.tsx`

- **WHY:** Before this organism existed, NavLayout was ~50 lines of template JSX + 3 hook calls + handler wiring. If you wanted the nav on a different page or layout, you'd copy all of that. The drop-in packages the ENTIRE top navigation so any page can drop it in with **one line**: `<TopNavigation ... />` — `TopNavigation.tsx:4-9` verbatim.
- **WHAT:** Calls `useNavDropdown`, `useAuthPopover`, `useMobileMenu` internally. Renders SkipLink atom + ARIA live region + SecondaryBar organism + sticky section (backdrop blur overlay + `<nav>` PrimaryNav + mega menu loop + mobile menu slot). See `TopNavigation.tsx:11-20`.
- **WHEN:** Use on any page that needs the full Ken Research top navigation (`TopNavigation.tsx:21`).
- **WHERE:** NavLayout template, or any custom layout (`TopNavigation.tsx:22`).
- **HOW:** Eleven injection slots typed in `TopNavigationProps` (`TopNavigation.tsx:70-96`):

| Slot | Type | Purpose |
|---|---|---|
| `logo` | `ReactNode` | Renders inside `LogoButton` — keeps asset outside package |
| `onLogoClick?` | `() => void` | Defaults to `onNavigate('/')` |
| `isAuthenticated` | `boolean` | Auth-aware right side switch |
| `user?` | `NavUser \| null` | `{ name, email, initials }` |
| `onNavigate` | `(path) => void` | All internal navigation |
| `onSignOut` | `() => void` | Called after popover closes |
| `items?` | `NavItemConfig[]` | Defaults to 5 Ken items (Reports/Industries/Surveys/Consulting/Insights) |
| `megaMenus?` | `MegaMenuEntry[]` | Each `{ id, render(isOpen) }` matched against trigger id |
| `ctaButton?` | `ReactNode` | DS Button stays outside package |
| `companyDropdown?` | `(isOpen) => ReactNode` | Render fn for secondary-bar Company panel |
| `mobileMenu?` | `(isOpen, onClose) => ReactNode` | Render fn for push overlay |

`NavLayout.tsx:80-93` shows the canonical wiring: `<TopNavigation logo={<Logo size="sm" />} isAuthenticated user onNavigate={navigate} onSignOut={() => { logout(); navigate('/'); }} items={NAV_ITEMS} megaMenus={MEGA_MENUS} ctaButton={<Button variant="brand" size="sm">Book discovery call</Button>} companyDropdown={(isOpen) => <CompanyDropdown isOpen={isOpen} />} mobileMenu={(isOpen, onClose) => <MobileMenu isOpen={isOpen} onClose={onClose} />} />`.

---

## State architecture

All state is funnelled through three hooks called **once** inside `TopNavigation`. Sub-organisms receive state via props; no sub-organism holds its own state (ARCHITECTURE.md:111).

- `useNavDropdown` — `activeDropdown` string, 100ms hover-leave debounce, touch detection (`useNavDropdown.ts:17-19`), ARIA announcements (`useNavDropdown.ts:42-49`), Enter/Space/Escape keyboard.
- `useAuthPopover` — 3-ref outside-click detection (popoverRef + mobileButtonRef + desktopButtonRef, `useAuthPopover.ts:30-39`). Prevents close-on-trigger-click.
- `useMobileMenu` — body scroll lock via `document.body.style.overflow = 'hidden'` (`useMobileMenu.ts:21-30`), with cleanup on unmount to prevent leaks.

Coordination is explicit: tapping avatar while mobile menu is open closes the menu (`MobileControls.tsx:54-57`); tapping hamburger while popover is open closes the popover (`MobileControls.tsx:81-83`). Only one overlay at a time.

---

## Status (per `STATUS.md`)

- Handover state: `cleanup` (not yet `ready-for-tech`)
- Pre-handover gate: 5/12 passed. Pending: lint, build, TS strict, axe scan, Lighthouse, reduced-motion verification, visual baseline, conventional commits.
- Known issues: `package.json` name still `@figma/my-make-file` (Figma Make scaffold artefact — tech to rename to `@kenresearch/topnav`); auth is in-memory prototype only; `industries.tsx` uses inline JSX icons inside a data file (defer to tech).
- Versioning: this is `v32`. Future iterations copy to `topnav-v33/` per workspace handover discipline. Do not edit after handover.

---

**Bottom line:** topnav-v32 is the only project in the workspace whose entire purpose is the header. It exposes a one-line drop-in (`<TopNavigation />`), packages 23 internal components + 3 hooks + 4 types behind a tight injection API, and ships five docs that any consumer can read instead of source. Everything below `<main id="main-content">` in the showcase is dummy and out of scope for this audit.
