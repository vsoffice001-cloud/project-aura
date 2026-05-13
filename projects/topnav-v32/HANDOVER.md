# HANDOVER — topnav-v32

**For:** Tech team
**From:** Design team (Aura-assisted)
**Date:** 2026-04-30
**Version:** v32

## TL;DR

This is a **component project, not a standalone app.** The deliverable is the Ken Research top navigation system (`TopNavigation` + sub-components). The Vite app (App.tsx, routes.tsx, HomePage.tsx) exists only as a browser showcase — tech team integration = drop `TopNavigation` into the target host app (likely `ken-v1` Next.js 15 case-study editorials) and adapt routing.

## Run locally
```bash
pnpm install
pnpm dev   # → http://localhost:5174 (5173 may be taken)
```

## Build
```bash
pnpm build
```
No `pnpm start` (Vite projects use `pnpm preview` for production preview).

## Stack
- Framework: Vite 6 + React 18 (peer dep)
- TypeScript: yes (no `tsconfig.json` strict flag audited yet — see open issues)
- Tailwind: v4 via `@tailwindcss/vite`
- Animation: `motion` v12 (Framer Motion v12 rebranded) — import path `motion/react`. No GSAP, no Lenis.
- UI primitives: Radix UI (full suite) + shadcn/ui component shells in `src/app/components/ui/`
- Icons: `lucide-react` + `@phosphor-icons/react`
- Routing: `react-router` v7 (showcase only — not part of nav component contract)
- Package manager: pnpm 10 (enforced via `packageManager` field)
- Node: ≥20 (enforced via `engines` field)

## Route map

None — this is a component, not a routed app. `App.tsx` renders a showcase only.

| Route | Page | Purpose | Mobile? |
|---|---|---|---|
| `/` | HomePage | Showcase: `TopNavigation` + dummy hero/stats/features content | ✓ |
| `/auth` | AuthPage | Showcase: auth sign-in/up flow (in-memory mock) | ✓ |
| `/auth/verify` | OTPVerification | Showcase: OTP step | ✓ |
| `/auth/complete-profile` | ProfileCompletion | Showcase: sign-up profile form | ✓ |
| `/auth/success` | SuccessScreen | Showcase: success confirmation | ✓ |

**Integration note for tech team:** Determine target host app — case-study editorials (`ken-v1`) are the most likely consumer. Auth routes (`/auth/*`) are showcase only; in production, auth is a separate concern (NextAuth or Django session).

## Components

Located: `src/app/components/navbar/` (the nav package), `src/app/components/` (mega menu content), `src/design-system/` (design primitives).

### Core nav component (the deliverable)

| Component | File | Status | Notes |
|---|---|---|---|
| `TopNavigation` | `navbar/organisms/TopNavigation.tsx` | done | Single drop-in component for the full nav. Accepts render props for mega menus, mobile menu, CTA button, company dropdown. |
| `PrimaryNav` | `navbar/organisms/PrimaryNav.tsx` | done | 60px sticky nav bar. Logo + MobileControls + DesktopNavItems. |
| `SecondaryBar` | `navbar/organisms/SecondaryBar.tsx` | done | 40px desktop-only utility bar. Hidden on mobile. |
| `DesktopNavItems` | `navbar/organisms/DesktopNavItems.tsx` | done | 5 trigger items (Reports, Industries, Surveys, Consulting, Insights). Hover opens mega menus. |
| `MobileControls` | `navbar/organisms/MobileControls.tsx` | done | Hamburger + auth avatar for mobile/tablet. |
| `TabletControls` | `navbar/organisms/TabletControls.tsx` | done | Tablet-specific controls. |
| `AuthPopover` | `navbar/organisms/AuthPopover.tsx` | done | User avatar + popover with profile/sign-out. Works in both auth states. |

### Mega menu dropdowns (consumer content — wired in NavLayout.tsx)

| Component | File | Status | Notes |
|---|---|---|---|
| `ReportsDropdown` | `components/ReportsDropdown.tsx` | done | Reports mega menu |
| `IndustriesDropdown` | `components/IndustriesDropdown.tsx` | done | Industries panel — uses `src/data/industries.tsx` for 14 industry categories |
| `ConsultingDropdown` | `components/ConsultingDropdown.tsx` | done | Consulting mega menu with capability sidebar |
| `SurveyDropdown` | `components/SurveyDropdown.tsx` | done | Surveys mega menu |
| `InsightsDropdown` | `components/InsightsDropdown.tsx` | done | Insights mega menu |
| `CompanyDropdown` | `components/CompanyDropdown.tsx` | done | Company links in secondary bar |

### Mobile navigation

| Component | File | Status | Notes |
|---|---|---|---|
| `MobileMenu` | `components/mobile/MobileMenu.tsx` | done | Outer wrapper — injected into TopNavigation via render prop |
| `PushMenuContainer` | `components/mobile/PushMenu/PushMenuContainer.tsx` | done | Multi-level push menu orchestrator |
| `PushMenuPanel` | `components/mobile/PushMenu/PushMenuPanel.tsx` | done | Slide panel — swipe-to-dismiss on mobile |
| Level panels | `PushMenu/levels/*.tsx` | done | Per-section panels: Main, Industries, IndustryDetail, Reports, Surveys, Consulting, Insights |

### Design system primitives

| Component | File | Status | Notes |
|---|---|---|---|
| `Button` | `design-system/components/Button.tsx` | done | 4 variants (brand, primary, secondary, ghost), 4 sizes. Shimmer + ripple on brand. |
| `Avatar` | `design-system/components/Avatar.tsx` | done | Initials-based circular avatar with StatusDot |
| `Logo` | `design-system/components/Logo.tsx` | done | Ken Research SVG logo, height-driven sizing |
| `MenuItem` | `design-system/components/MenuItem.tsx` | done | Popover/dropdown row |
| `TextLink` | `design-system/components/TextLink.tsx` | done | Inline hover-transition link |

### Hooks

| Hook | File | Notes |
|---|---|---|
| `useNavDropdown` | `navbar/hooks/useNavDropdown.ts` | Manages active mega menu, 100ms mouse-leave debounce, ARIA announcements |
| `useAuthPopover` | `navbar/hooks/useAuthPopover.ts` | Auth avatar popover state + focus trapping refs |
| `useMobileMenu` | `navbar/hooks/useMobileMenu.ts` | Mobile menu open/close + scroll lock |

## Props API — TopNavigation

```tsx
<TopNavigation
  logo={ReactNode}                          // logo content (LogoButton atom)
  onLogoClick?: () => void                  // optional logo click override
  isAuthenticated: boolean                  // auth state from consumer context
  user?: NavUser | null                     // { name, email, initials }
  onNavigate: (path: string) => void        // route navigation callback
  onSignOut: () => void                     // sign-out callback
  items?: NavItemConfig[]                   // primary nav items (default: 5 Ken Research items)
  megaMenus?: MegaMenuEntry[]              // mega menu panels: { id, render: (isOpen) => ReactNode }[]
  ctaButton?: ReactNode                     // CTA button element (injected — DS Button outside package)
  companyDropdown?: (isOpen: boolean) => ReactNode  // company dropdown render fn
  mobileMenu?: (isOpen: boolean, onClose: () => void) => ReactNode  // mobile menu render fn
/>
```

Integration pattern: see `src/app/components/layout/NavLayout.tsx` — this is the reference wiring showing how to compose the full nav with all mega menus.

## Mock data

- Location: `src/lib/mock-data.ts`
- Markers: every data section has `// TODO: replace w/ <real source>` comment
- `src/data/industries.tsx`: 14 industries with segments, popularTopics, icons — icon elements use JSX so kept in `.tsx`
- Auth: in-memory prototype in `src/app/context/AuthContext.tsx`
- Replace strategy: see comments in `src/lib/mock-data.ts`

## Env vars

None. This is a component showcase with no env-var dependencies.

## Known issues / won't-fix

- `package.json` name is `@figma/my-make-file` (Figma Make scaffold artifact): rename to `@kenresearch/topnav` before publishing
- `industries.tsx` uses JSX React elements inline (lucide icons in data): cannot be a plain `.ts` file. Defer icon-decoupling to tech.
- `src/imports/LogoContainer.tsx` + `svg-*.ts` files: Figma Make generated exports. `LogoContainer` is live (used by auth + mobile menu headers). Tech team should replace with the DS `Logo` component or a proper SVG import.
- No `.nvmrc` — Node ≥20 enforced via `engines` field in `package.json`
- TS strict mode: not audited — defer to tech QA pass
- A11y axe scan: not yet run — pending QA pass
- Lighthouse mobile: not yet run — pending QA pass
- `prefers-reduced-motion`: `motion/react` `AnimatePresence` components do not have explicit `useReducedMotion()` guards — defer to tech QA pass
- Dead-code reference: `ServicesDropdown.tsx`, `ResourcesDropdown.tsx`, `PushMenuGoldStandard.tsx` removed from src and archived in `_dev-notes/`

## A11y baseline
- WCAG: AA target
- Tested via: manual inspection only (this phase)
- Last scan: not run — pending
- Reduced-motion: not yet audited
- Present: SkipLink atom, ARIA live region for dropdown announcements, `role="nav"` on `<nav>`, keyboard handlers (Enter/Space/Escape) on triggers, focus-visible on interactive elements

## Perf baseline
- Lighthouse: not yet run — pending QA pass

## Visual baseline
- Screenshots: not yet captured — pending `gstack` run

## Brand tokens — editorial light variant

This nav uses the **editorial light** (white background) variant, not the dark `bg-deep` case-study variant. Token source: `src/styles/theme.css`.

| Token | Value | Usage |
|---|---|---|
| `--color-primary-black` | `#141016` | nav text, dark backgrounds |
| `--color-red` | `#b01f24` | CTAs, hover states |
| `--color-purple` | `#806ce0` | accents, shadows, highlights |
| `--color-bg-light` | `#fcfcfc` | nav backgrounds |
| `--color-white` | `#ffffff` | primary nav background |
| `--nav-primary-text` | 14px | main nav item text |
| `font-nav` | DM Sans | nav font utility class |

Quick reference: `<workspace>/Quick_start_guide.md`

## Animation rules

- All animation via `motion/react` (package: `motion` v12 — NOT `framer-motion`)
- Import: `import { motion, AnimatePresence } from 'motion/react'`
- No GSAP in this project
- `prefers-reduced-motion` guards: not yet added — tech team should audit

## Tech-team integration checklist

- [ ] Determine target host app — case-study editorials (`ken-v1`) are the most likely consumer
- [ ] Copy nav package to host: `src/app/components/navbar/`, `src/design-system/`, `src/app/components/<dropdown files>`, `src/app/components/mobile/`, `src/styles/theme.css`, `src/data/industries.tsx`
- [ ] Wire `TopNavigation` into host layout (see `NavLayout.tsx` for reference wiring)
- [ ] Replace `react-router` `useNavigate` / `RouterProvider` with Next.js `useRouter` in host
- [ ] Replace `LogoContainer` (Figma import) with DS `Logo` component or proper SVG
- [ ] Replace in-memory `AuthContext` with real auth (NextAuth or Django session)
- [ ] Replace mock nav data in `src/lib/mock-data.ts` with real API calls
- [ ] Rename `package.json` from `@figma/my-make-file` to `@kenresearch/topnav`
- [ ] Match Node ≥20 (check `.nvmrc` of host app), pnpm ≥10
- [ ] Run lint (`pnpm lint`) — not yet clean-verified
- [ ] Run build (`pnpm build`) — not yet clean-verified
- [ ] Run a11y axe scan (0 critical violations gate)
- [ ] Run Lighthouse mobile (≥85 perf / ≥95 a11y / ≥95 best-practices gate)
- [ ] Audit `prefers-reduced-motion` in all `motion/react` components
- [ ] Wire analytics (GTM, GA, Clarity, Leadfeeder, Contentsquare per prod)

## Contact
Design lead: design@kenresearch.com (Aura-assisted)
