# Header Anatomy — Primary Nav Deep Dive

> Scope: the **60px sticky primary nav bar** (everything from the logo on the left to the CTA / hamburger on the right). The 40px utility bar above it is covered in `above-nav-and-menus.md`. Mega menu panels are also in that doc.

The primary nav lives in `src/app/components/navbar/organisms/PrimaryNav.tsx`. It is wrapped in a sticky positioning shell inside `TopNavigation.tsx:162-194`. Three breakpoint-scoped right-side clusters are rendered side-by-side; only one is visible at a time. The structure is described as code-comment verbatim inside `PrimaryNav.tsx:6-10`:

> "A `nav-container` flex row containing: LogoButton atom (left, always visible) · MobileControls organism (right, < 768px) · TabletControls organism (right, 768px-1023px) · DesktopNavItems organism (right, >= 1024px)."

---

## 1. Outer sticky shell (`TopNavigation.tsx:162-178`)

```tsx
<div className="sticky top-0 z-[50] w-full" onMouseLeave={dropdown.handleMouseLeave}>
  {/* Backdrop blur when mega menu is open (see §sticky behaviour) */}
  <nav className="relative bg-white backdrop-blur-[4px] h-[60px] shadow-[0px_8px_12px_-4px_rgba(128,108,224,0.15)] z-[50]">
    <PrimaryNav ... />
  </nav>
```

- **WHY:** The bar must stay pinned to the viewport so dropdowns, search, and CTA are always reachable. It also owns mouseleave for closing dropdowns when the cursor exits the entire nav region.
- **WHAT:** `sticky top-0 z-[50]`, 60px tall, `bg-white` with `backdrop-blur-[4px]` and a purple-tinted bottom shadow `0px 8px 12px -4px rgba(128,108,224,0.15)` (uses brand purple `#806ce0` at 15% alpha — the same purple-glow vocabulary that appears in `--shadow-md` / `--shadow-glow-purple` tokens in `theme.css:181, 184`).
- **WHEN:** Always rendered. The bar never hides on scroll.
- **WHERE:** `TopNavigation.tsx:178`.
- **HOW:** Container reuses `.nav-container` (see header-tokens.md) so its inner content aligns with `SecondaryBar` and page sections.

---

## 2. Logo (`PrimaryNav.tsx:85-87` → `atoms/LogoButton.tsx`)

- **WHY:** Logo button was 15 lines of inline JSX in NavLayout, coupling layout to specific sizing, hover, and focus styles. Extracting it makes the logo reusable and keeps NavLayout thin (`LogoButton.tsx:4-6` verbatim).
- **WHAT:** A `<button type="button">` wrapping injected `children` (the consumer's logo node). Hover effect: `hover:opacity-90 hover:scale-[1.02]` with `transition-all duration-200` (`LogoButton.tsx:40-42`). Focus-visible ring: `ring-2 ring-[rgba(20,16,22,0.5)] ring-offset-2`. Sizing adapts to children — the DS `Logo size="sm"` is 20px tall (token `--logo-height-sm`, `theme.css:165`).
- **WHEN:** First element in primary nav, always visible.
- **WHERE:** Left edge of `.nav-container` row.
- **HOW:** `<LogoButton onClick={() => navigate('/')}><Logo size="sm" /></LogoButton>`. `ariaLabel` defaults to `"Ken Research Home"` (`LogoButton.tsx:32`). The actual asset is injected — the navbar package never references the SVG itself, keeping the package boundary clean (README.md:75 confirms this is the "logo content injection" pattern).

**Variants:** none structural. The logo's *appearance* changes only with the DS `Logo` size prop. The 60px bar dictates vertical center; the 20px logo leaves ~20px breathing room top and bottom.

---

## 3. Primary nav triggers (desktop ≥1024px) (`organisms/DesktopNavItems.tsx`)

- **WHY:** Each of N main nav items would otherwise have identical 15-line trigger markup; grouping the 5 triggers + search + CTA as one organism keeps the main nav thin and makes the trigger pattern reusable (`DesktopNavItems.tsx:3-7`).
- **WHAT:** A flex row `hidden lg:flex items-center gap-6 xl:gap-8` (`DesktopNavItems.tsx:56`). Default items are 5 (`DEFAULT_NAV_ITEMS`, `DesktopNavItems.tsx:29-35`): Reports, Industries, Surveys, Consulting, Insights — exactly matching `NavLayout.tsx:60-66` `NAV_ITEMS`. Each is rendered through `NavDropdownTrigger` (`molecules/NavDropdownTrigger.tsx`).
- **WHEN:** ≥1024px viewport. Below that, hamburger replaces the row.
- **WHERE:** Right cluster of `PrimaryNav`, before `SearchBar` and CTA.
- **HOW:** `items.map(item => <NavDropdownTrigger key={item.id} label={item.label} isOpen={activeDropdown === item.id} onMouseEnter={() => onMouseEnter(item.id)} onKeyDown={(e) => onKeyDown(e, item.id)} />)` (`DesktopNavItems.tsx:57-65`).

### Trigger atom — NavDropdownTrigger (`molecules/NavDropdownTrigger.tsx`)

- Wrapper: `relative h-[60px] flex items-center group` (`L43`) — full nav height so hover region matches bar height.
- Button: `font-nav font-normal text-[#141016] hover:text-[#b01f24]` (`L51-52`). Font size `var(--nav-primary-text)` = 14px, line-height `var(--nav-lh-primary)` = 1.43 (`L58-59`, tokens at `theme.css:45, 55`).
- ARIA: `aria-expanded={isOpen}`, `aria-haspopup="true"`, `aria-label={`${label} menu`}` (`L61-63`).
- Chevron: 12px `DropdownChevron` (`L66`), rotates 180° when open (transition 300ms, `DropdownChevron.tsx:30`).
- Gradient underline: absolutely positioned bottom-0 strip, `h-[2px] bg-gradient-to-r from-[#141016] via-[#656565] to-[#b01f24]`, `scale-x-0 group-hover:scale-x-100 origin-left transition-all duration-300` (`L69-77`). This is the signature Ken brand hover — black → grey → red gradient, scaled from 0→1.

---

## 4. Search bar (`molecules/SearchBar.tsx`)

- **WHY:** The search bar has a complex purple beam orbit animation with SVG gradient, inner/outer border treatment, and specific sizing. Isolating it keeps this visual complexity out of the nav layout (`SearchBar.tsx:3-5`).
- **WHAT:** A pill-shaped input, **120px × 35px** (`L35`). Outer pill: `bg-[#f5f5fd]` with `shadow-[6.98px_-1.02px_14px_-4px_rgba(128,108,224,0.3)]` — same purple family. Inner container: `bg-[#fcfcfc]`, `inset-[2px]` (creates a 2px ring effect), `rounded-[99px]`, holds the `<input>` plus a 16px `MagnifyingGlass` (Phosphor) on the right (`L46-67`). The animation is a blurred radial-gradient SVG (purple → transparent) absolutely positioned `h-[31px] w-[65px]`, blurred 4px, animated via `animate-beam-orbit` keyframes (`L38-44`, keyframes in `theme.css:417-461`). The beam orbits the pill's perimeter at 6s linear infinite.
- **WHEN:** Visible on desktop and tablet (rendered both in `DesktopNavItems.tsx:67` and `TabletControls.tsx:56`). Hidden on mobile.
- **WHERE:** Between the trigger row and the CTA on desktop; first item in the tablet cluster.
- **HOW:** `<SearchBar />` with optional `placeholder` and `onSearch` props (`L23-27`). Default placeholder is `"Search"` (`L30`). `aria-label="Search Ken Research"` (`L61`). `fontVariationSettings: "'opsz' 9"` (`L60`) keeps DM Sans tight-optical at small sizes.

---

## 5. CTA button (injected) (`DesktopNavItems.tsx:71-75`, `TabletControls.tsx:58-63`)

- **WHY:** The package boundary explicitly excludes the DS Button — CTA is consumer-injected (README.md:77, `DesktopNavItems.tsx:42-43` comment: "Injected CTA button — keeps DS Button outside the package boundary").
- **WHAT:** Whatever the consumer passes as `ctaButton` prop. Canonical usage: `<Button variant="brand" size="sm">Book discovery call</Button>` (`NavLayout.tsx:90`). DS Button at `size="sm"` is 32px tall, 14px font, with shimmer + ripple effects (NAVBAR_USAGE.md:186).
- **WHEN:** Visible at tablet and desktop. Hidden on mobile.
- **WHERE:** Far right of the desktop cluster (`hidden lg:block` wrapper, `DesktopNavItems.tsx:72`); after the search bar on tablet (`shrink-0` wrapper, `TabletControls.tsx:60`).
- **HOW:** Conditional render — if no `ctaButton` prop is supplied, no node renders. Default Ken usage is brand-red gradient.

---

## 6. Auth state on primary nav (desktop)

The primary nav does **not** carry desktop auth controls — those live on the **secondary bar** (Sign in/up buttons or 28px avatar + popover). See `above-nav-and-menus.md` §SecondaryBar. The primary nav's right cluster on desktop is purely: triggers + search + CTA. This split is intentional (CONSISTENCY.md:218-224): the navbar owns its own auth UI, and the primary nav stays focused on content discovery.

On mobile/tablet, the primary nav *does* carry auth (via `MobileControls` / `TabletControls`), because the secondary bar collapses out at <768px and the entire auth experience must fit inside the sticky 60px bar.

---

## 7. Mobile hamburger + auth avatar (<768px) (`organisms/MobileControls.tsx`)

- **WHY:** On mobile, only two controls fit: the auth avatar (unified state icon) and the hamburger toggle. They share a 1px gap and need coordinated dismiss behaviour — opening one closes the other (`MobileControls.tsx:3-6`).
- **WHAT:** `<div className="md:hidden flex items-center gap-1">` containing:
  - **AuthAvatar (40px / `size="md"`)** with attached `AuthPopover`. When logged out: person silhouette + 8px red `IndicatorDot` (per `IndicatorDot` re-export). When logged in: user initials.
  - **Hamburger `<button>`** with 44×44 minimum tap target (`MobileControls.tsx:87`), `rounded-[8px]`, `hover:bg-[#f5f5f5] active:bg-[#ebebeb]`, focus-visible ring `ring-[rgba(20,16,22,0.5)]`. Contains the `HamburgerIcon` atom — three 24px × 2.5px bars with `gap-[5px]`, animated: bar 1 rotates 45° + translates 7.5px down, bar 2 fades and scales down, bar 3 rotates -45° + translates 7.5px up (`HamburgerIcon.tsx:24-39`). Transition: `300ms ease-out`.
- **WHEN:** <768px viewport (Tailwind `md:hidden`).
- **WHERE:** Right side of `PrimaryNav`.
- **HOW:** State coordination: `onClick` on avatar calls `authPopover.toggle()` then `if (isMobileMenuOpen) onCloseMobileMenu()` (`MobileControls.tsx:54-57`). The hamburger's `onClick` calls `onToggleMobileMenu()` then `if (authPopover.isOpen) authPopover.close()` (`MobileControls.tsx:81-83`).

ARIA: hamburger has `aria-label="Toggle mobile menu"` + `aria-expanded={isMobileMenuOpen}` (`L85-86`).

---

## 8. Tablet cluster (768–1023px) (`organisms/TabletControls.tsx`)

Bridges mobile and desktop. On tablet there is enough room for search + CTA alongside the mobile-style avatar + hamburger (`TabletControls.tsx:3-6`).

- Visibility: `hidden md:flex lg:hidden` (`L54`). Visible only between 768 and 1023px inclusive.
- Order: `SearchBar` → CTA → `AuthAvatar` (40px) + popover → Hamburger.
- All sub-controls mirror desktop / mobile behaviour exactly — no special tablet variants. This is deliberate: tablet gets "secondary bar + hamburger experience," not "shrunken desktop nav." See NAVBAR_USAGE.md:157: *"Tablet gets the hamburger (not desktop nav) because 768px minus padding = 688px available width, which cannot fit 5 triggers + search + CTA (~890px needed)."*

---

## 9. Sticky behaviour (`TopNavigation.tsx:162-205`)

- Position: `sticky top-0 z-[50]` on the wrapper `<div>` (`L162`).
- Inner `<nav>` keeps its own `z-[50]` so it stacks correctly above page content.
- The 40px `SecondaryBar` is **not** sticky — it scrolls away naturally (per CONSISTENCY.md:212). Therefore, total nav height starts at 100px and collapses to 60px once the user scrolls past the secondary bar.
- No scroll-threshold logic — no `IntersectionObserver`, no scroll-listener-based "compact mode," no hide-on-scroll-down pattern. The bar is constant once visible. This is a deliberate simplicity choice: less JS, fewer edge cases, no jumpy reveal animations.
- `onMouseLeave` on the sticky wrapper triggers `dropdown.handleMouseLeave()` which starts a 100ms debounce before clearing `activeDropdown` (`useNavDropdown.ts:60-65`). This avoids accidental close when the cursor briefly leaves the bar to reach a mega menu panel beneath it.

---

## 10. Backdrop blur (mega menu open) (`TopNavigation.tsx:163-176`)

- **WHY:** When a mega menu opens, the page content below should recede visually so the menu reads as the primary focus.
- **WHAT:** A `<motion.div>` `fixed inset-0 bg-black/[0.02] backdrop-blur-[2px] z-[45]` (`L172`). 0.02 alpha black tint + 2px Gaussian blur — barely perceptible but enough to soften any page content underneath without dimming. Note `z-[45]` sits **below** the primary nav (`z-[50]`) but **above** mega menu panels — wait, see §11 below.
- **WHEN:** Only when `dropdown.activeDropdown` is truthy AND it's not `'company'` or anything `mobile*` (`L164-166`). Company dropdown uses a small panel that does not warrant a full-page blur; mobile menu has its own overlay.
- **HOW:** Animated via Framer `initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}` (`L168-171`). `aria-hidden="true"`. `onMouseEnter={dropdown.closeAll}` (`L174`) — sliding the cursor onto the backdrop closes the menu immediately (no debounce).

The MegaMenuDropdown panel itself (rendered through `megaMenus.map()` at `TopNavigation.tsx:197-201`) also paints its own `bg-black/15 backdrop-blur-sm z-40` overlay (`MegaMenuDropdown.tsx:74`), so two backdrop layers coexist — the soft `0.02` blur close to the nav and the stronger `0.15` blur from the mega menu's own AnimatePresence.

---

## 11. Border + shadow treatment

- Bottom edge: **no explicit border**. Separation from page content is done entirely with the purple-tinted shadow `0px 8px 12px -4px rgba(128,108,224,0.15)` on `<nav>` (`TopNavigation.tsx:178`). This matches DS token `--shadow-md` family (`theme.css:181`) — purple is the "depth" colour in Ken's brand vocabulary.
- Top edge: none in primary nav. The SecondaryBar above carries a `border-b border-[rgba(0,0,0,0.05)]` at its bottom (see `above-nav-and-menus.md`), and the two bars sit directly stacked.
- No `border-radius` on the nav itself — full bleed.

---

## 12. Logged-in vs logged-out variants

Auth state is consumed via `isAuthenticated` + `user` props. There is no internal `AuthContext` call inside the package — keeps it framework-agnostic. The variants are:

| Surface | Logged out | Logged in |
|---|---|---|
| SecondaryBar right (desktop ≥768) | `<AuthButtons onSignIn onSignUp />` — text link "Sign in" + outlined "Sign up" button (`SecondaryBar.tsx:96-101`) | `<span>{user.name}</span>` + 28px `AuthAvatar size="sm"` + `AuthPopover` (`SecondaryBar.tsx:76-95`) |
| MobileControls / TabletControls avatar | 40px avatar with person silhouette + 8px red `IndicatorDot` (the `user={null}` branch in `Avatar`) | 40px avatar showing user `initials` (e.g. "JD") |
| Popover content | "Welcome / Access your account" header + Sign in / Sign up rows (`AuthPopover.tsx:127-153`, both with `iconBg` + `minHeight: 44`) | User name + email header + My Account / Saved Reports / Settings → divider → Sign out (danger) (`AuthPopover.tsx:85-122`) |

Switching the prop flips both surfaces instantly — no animation between auth states; the popover itself animates on open/close only.

---

## 13. Accessibility (audited contracts)

| Feature | Where | Verbatim |
|---|---|---|
| Skip link | `<SkipLink />` at top of `TopNavigation` render (`L144`) | Re-export from DS `SkipLink` |
| Live region | `<div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{dropdown.announcement}</div>` (`L145-147`) | Announces "Reports menu opened" / "Menu closed" |
| `aria-expanded` + `aria-haspopup` | Every trigger | `NavDropdownTrigger.tsx:61-62`, `CompanyTrigger.tsx:60-61` |
| `role="menu"` / `role="menuitem"` | AuthPopover card + PopoverMenuItem | `AuthPopover.tsx:82-83` |
| Touch detection | `useNavDropdown.ts:17-19` `('ontouchstart' in window) \|\| (navigator.maxTouchPoints > 0)` | Makes `handleMouseEnter` a no-op on touch |
| 44px tap targets | Hamburger button | `style={{ minWidth: '44px', minHeight: '44px' }}` (`MobileControls.tsx:87`) |
| Keyboard | Enter/Space toggle, Escape close (`useNavDropdown.ts:75-82`) | All triggers |
| Focus rings | `focus-visible:ring-2 focus-visible:ring-[rgba(20,16,22,0.5)] focus-visible:ring-offset-2` | Every interactive atom/molecule |

`prefers-reduced-motion` is not yet wired (per `STATUS.md:21` pending gate).

---

## 14. WWWWH summary per element

| Element | WHY | WHAT | WHEN | WHERE | HOW |
|---|---|---|---|---|---|
| Sticky shell | Always-reachable nav | 60px, sticky top-0, z-50, purple shadow | Always | Wraps `<nav>` | `sticky top-0 z-[50]` + `onMouseLeave` debounce |
| Logo | Home anchor | LogoButton with 20px DS Logo, hover scale+opacity | Always | Left of `.nav-container` | Injected via `logo` prop |
| Triggers | Mega menu entry | 5 NavDropdownTriggers, gradient underline hover | ≥1024px | Right cluster | `items` prop drives map |
| Search | Quick query | 120×35 pill, purple beam-orbit animation | ≥768px | After triggers / first in tablet | `<SearchBar />` |
| CTA | Convert | Brand-red DS Button | ≥768px | Far right | Injected via `ctaButton` prop |
| Avatar (40px) | Auth surface mobile/tablet | DS Avatar, person/initials | <1024px | Right of bar | Coordinated with hamburger |
| Hamburger | Mobile menu toggle | 44px button, 3-bar↔X anim | <1024px | After avatar | `useMobileMenu` toggle + scroll lock |
| Backdrop blur | Focus mega menu | 0.02 black + 2px blur, z-45 | When dropdown open (not company/mobile) | `fixed inset-0` | Framer fade 0.2s |
