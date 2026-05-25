# Above the Primary Nav, and the Dropdown Menus

> Two zones the canonical header owns beyond the 60px primary bar:
>
> 1. **Secondary bar** — 40px utility strip rendered **above** the primary nav.
> 2. **Mega menu dropdowns** — full-width panels rendered **below** the primary nav when a trigger opens.
>
> There is *no* announcement bar in topnav-v32 (no marketing strap, no GDPR banner, no "now in beta" ribbon). The secondary bar is the only "above" element. Anyone porting this header should not invent an announcement bar without explicit design sign-off.

---

## Part A — SecondaryBar (40px, above the primary nav)

**File:** `src/app/components/navbar/organisms/SecondaryBar.tsx` (105 lines).

### WWWWH

- **WHY (verbatim, `SecondaryBar.tsx:3-6`):**
  > "The 40px secondary bar contains utility links (Procurement, Expert Panel), Company dropdown, and auth-aware right section (Sign in/up OR avatar+popover). It's a complete organism with its own visual identity separate from primary nav."
- **WHAT (verbatim, `SecondaryBar.tsx:7-10`):**
  > "A #fafafa bar, 40px tall, hidden on mobile (<768px), containing: Left: NavLink atoms for Procurement, Expert Panel, Company dropdown trigger · Right: AuthButtons (logged-out) OR user name + AuthAvatar + popover (logged-in)."
- **WHEN:** Always rendered on desktop and tablet; hidden on mobile via `hidden md:block` (`L55`). NOT sticky (CONSISTENCY.md:212 — *"The secondary bar (40px) is NOT sticky — it scrolls away."*).
- **WHERE:** First visible element inside `TopNavigation` after `SkipLink` + ARIA live region (`TopNavigation.tsx:150-159`).
- **HOW:** Receives shared dropdown state + `authPopover` config + `companyDropdown` render slot. No local state. Sibling-aware via `activeDropdown` string comparison.

### Visual spec (from source)

```tsx
<div
  className="bg-[#fafafa] border-b border-[rgba(0,0,0,0.05)] h-[40px] relative w-full z-[60] hidden md:block"
  onMouseLeave={onMouseLeave}
>
  <div className="nav-container h-full flex items-center justify-between">
    {/* Left side */}
    {/* Right side */}
  </div>
</div>
```
(`SecondaryBar.tsx:53-58`)

- **Background:** `#fafafa` — a near-white off-white, distinct from page `#ffffff`. This creates the "two-tone stripe" that signals utility vs primary navigation. Per CONSISTENCY.md:135 — *"The navbar's white (`bg-white`) and secondary bar's `#fafafa` must visually 'flow into' the page content without jarring contrast jumps."*
- **Bottom border:** `border-b border-[rgba(0,0,0,0.05)]` — 1px hairline at 5% alpha, visible only when scrutinised. Provides a soft separator from the primary nav's white surface below.
- **Height:** exactly 40px (`h-[40px]`).
- **Z-index:** `z-[60]` — above the primary nav's `z-[50]` so the Company dropdown can extend down across the primary nav without being clipped.
- **Width:** full-bleed `w-full`. Inner content reuses `.nav-container` for the same responsive padding as the primary nav.

### Left cluster (`SecondaryBar.tsx:59-71`)

```tsx
<div className="flex items-center gap-6">
  <NavLink href="/procurement" size="sm">Procurement</NavLink>
  <NavLink href="/expert-panel" size="sm">Expert Panel</NavLink>
  <CompanyTrigger
    isOpen={activeDropdown === 'company'}
    onMouseEnter={() => onMouseEnter('company')}
    onKeyDown={(e) => onKeyDown(e, 'company')}
    dropdown={companyDropdown}
  />
</div>
```

- **Two utility links** rendered through the `NavLink` atom (which is a re-export of DS `TextLink`, `NavLink.tsx:10`). Size `sm` = 12px font, line-height 16px (per `--nav-helper-text` token, `theme.css:52`). They render as `<a href>` because `href` is provided.
- **Company dropdown trigger** (`molecules/CompanyTrigger.tsx`, 70 lines). Helper-size 12px font, grey `#656565` → red `#b01f24` on hover (`CompanyTrigger.tsx:51`), 10px `DropdownChevron` (`L65`). The dropdown panel itself is **injected** via the `dropdown` prop — `SecondaryBar` does not import `CompanyDropdown`. That happens in `NavLayout.tsx:91`: `companyDropdown={(isOpen) => <CompanyDropdown isOpen={isOpen} />}`.

### Right cluster (`SecondaryBar.tsx:73-102`) — auth-aware switch

Logged out → `<AuthButtons onSignIn={() => authPopover.onNavigate('/auth?mode=signin')} onSignUp={() => authPopover.onNavigate('/auth?mode=signup')} />` (`L97-100`):

- "Sign in" — text link with 12px login arrow SVG (custom-drawn at `AuthButtons.tsx:43-48`).
- "Sign up" — outlined button with 12px person+ SVG (`AuthButtons.tsx:72-83`). Border `#141016`, padding `px-3 py-1.5`, `rounded-[5px]`. Hover inverts: `hover:bg-[#141016] hover:text-white` (`AuthButtons.tsx:62`).

Logged in (`L75-95`):

```tsx
<div className="relative flex items-center gap-3">
  <span className="font-nav font-normal text-[#656565] text-[12px]">{user.name}</span>
  <AuthAvatar ref={authPopover.desktopButtonRef} size="sm" user={{ initials: user.initials }} isActive={authPopover.isOpen} onClick={authPopover.toggle} />
  <AuthPopover ref={authPopover.popoverRef} ... />
</div>
```

- User's full name in 12px helper-grey.
- 28px avatar (`size="sm"`).
- Same `AuthPopover` organism as mobile — different attachment point (the `desktopButtonRef` ref vs `mobileButtonRef`). Single popover code, two anchor positions.

### CompanyTrigger anatomy (`molecules/CompanyTrigger.tsx`)

```tsx
<div className="relative" onMouseEnter={onMouseEnter}>
  <button className="flex items-center gap-1 font-nav font-normal text-[#656565] hover:text-[#b01f24] focus-visible:ring-2 ... rounded-[3px] transition-colors"
          style={{ fontSize: 'var(--nav-helper-text)', lineHeight: 'var(--nav-lh-helper)' }}
          aria-expanded={isOpen} aria-haspopup="true" onKeyDown={onKeyDown}>
    {label /* default "Company" */}
    <DropdownChevron isOpen={isOpen} size={10} />
  </button>
  {dropdown}
</div>
```
(`L44-69`)

- 10px chevron (vs 12px on the primary nav triggers) — visual hierarchy cue that this is a secondary-bar control.
- `rounded-[3px]` focus radius (vs `rounded-[5px]` on primary triggers).
- The injected `dropdown` node is rendered as a direct sibling — positioning is the responsibility of the injected component (`CompanyDropdown` uses `absolute top-full left-0 mt-[4px]`, `CompanyDropdown.tsx:48`).

### CompanyDropdown panel (consumer-supplied) (`src/app/components/CompanyDropdown.tsx`)

This is the *only* "menu" attached to the secondary bar. It's intentionally **simple, not a mega menu** (`CompanyDropdown.tsx:1-3`):

- Width: `w-56` = 224px.
- Inner padding: `p-3` (12px).
- Background: solid `bg-white` with `border border-[rgba(20,16,22,0.1)]`, `rounded-lg`, `shadow-[0px_4px_20px_rgba(0,0,0,0.1)]` (`L48`).
- Animation (`L43-47`): Framer `initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}` — soft slide-down 200ms.
- Items: About / Leadership / Careers / Contact Us → divider → Policies (muted). Per-item: `px-[10px] py-[6px] rounded-md font-nav text-[14px] leading-[20px] text-[#656565] hover:text-[#b01f24]` (`L55`).
- Comment block (`CompanyDropdown.tsx:18-27`) cites token mapping: `--spacing-3` (12px) container padding; "Compact spacing improves scannability (Jakob's Law - users expect tight nav menus)".

### WWWWH for above-nav elements

| Element | WHY | WHAT | WHEN | WHERE | HOW |
|---|---|---|---|---|---|
| SecondaryBar | Utility/auth/company separate from content nav | 40px `#fafafa` strip with hairline border | ≥768px, never sticky | Above primary nav | `<SecondaryBar isAuthenticated user authPopover companyDropdown={...} />` |
| Procurement / Expert Panel | Quick utility access | Two NavLink atoms (12px text) | ≥768px | Left cluster | Re-export of DS TextLink |
| Company trigger | Reveal simple about-Ken menu | 12px button + 10px chevron | ≥768px | Left, after utility links | Receives `dropdown` as render-prop slot |
| Sign in / Sign up | Logged-out CTA | Text link + outlined button pair | ≥768px logged-out | Right cluster | `AuthButtons` molecule |
| User name + avatar + popover | Logged-in identity | 12px name + 28px Avatar + AuthPopover | ≥768px logged-in | Right cluster | Shared AuthPopover via `desktopButtonRef` |

---

## Part B — Mega menu dropdowns (below the primary nav)

The five primary nav triggers each map to a mega menu panel via the `MegaMenuEntry[]` config in `NavLayout.tsx:68-74`:

```tsx
const MEGA_MENUS: MegaMenuEntry[] = [
  { id: 'consulting', render: (isOpen) => <ConsultingDropdown isOpen={isOpen} /> },
  { id: 'industries', render: (isOpen) => <IndustriesDropdown isOpen={isOpen} /> },
  { id: 'insights',   render: (isOpen) => <InsightsDropdown   isOpen={isOpen} /> },
  { id: 'survey',     render: (isOpen) => <SurveyDropdown     isOpen={isOpen} /> },
  { id: 'reports',    render: (isOpen) => <ReportsDropdown    isOpen={isOpen} /> },
];
```

`TopNavigation.tsx:197-201` loops the array:

```tsx
{megaMenus.map((menu) => (
  <span key={menu.id}>{menu.render(dropdown.activeDropdown === menu.id)}</span>
))}
```

Each panel is **consumer-owned** — they live outside the navbar package (in `src/app/components/`). The navbar only routes which one is "open" by passing `isOpen`.

### Shared mega menu wrapper (`ui/MegaMenuDropdown.tsx`)

All five panels use this wrapper as their outer shell.

- **WHY (`MegaMenuDropdown.tsx:2-4`):** A reusable full-width dropdown wrapper for mega menu navigation. Provides consistent animations, styling, and layout structure.
- **WHAT (`MegaMenuDropdown.tsx:17-33` verbatim):**
  > "Smooth slide-down animation (300ms) · AnimatePresence for exit animations · Full-width or rounded variants · Backdrop blur overlay with dark shade for depth hierarchy · Purple-tinted shadow · Max-width container (1200px) · Loading skeleton support. Design Specifications: Animation: opacity 0→1, y: -10→0 (300ms ease) · Background: solid white (#ffffff) · Backdrop: rgba(0,0,0,0.15) with blur-md for visual depth and dark shade · Shadow: 0px 8px 30px -5px rgba(128,108,224,0.25) · Padding: px-6 py-8 (inner container) · Full-width variant: border-top, straight edges · Rounded variant: border wrapper, rounded-[15px]."
- **WHEN:** Whenever any of the five trigger ids matches `activeDropdown`.
- **WHERE:** Rendered as a direct sibling under `<nav>` inside `TopNavigation`'s sticky wrapper.
- **HOW:** `variant="full-width"` for all five (paints its own black/15 backdrop, `z-40`); the `rounded` variant is unused in current Ken configuration.

### Panel structure (consistent across all five)

Each of `ReportsDropdown` (249 lines), `IndustriesDropdown` (291), `InsightsDropdown` (309), `SurveyDropdown` (274), `ConsultingDropdown` (220) follows the same **4-column grid**. Take `ReportsDropdown.tsx:8-20` as the canonical doc:

> "Layout (4 columns):
> - Column 1: Browse navigation (left sidebar) - 220px, clean white background
> - Column 2: Report Types section with SOFT COLORED ICONS - flex-1
> - Column 3: Benchmarking section with clean styling + CTA - flex-1
> - Column 4: Get in Touch + Featured card with subtle design - 280px"

Column 1 acts as a vertical nav (Browse: All / By Industry / By Region / Latest), Columns 2-3 hold categorised links with soft pastel icon backgrounds, Column 4 hosts a CTA (`GradientCTA` or `Request study`) plus a featured stats card.

The design philosophy (`ReportsDropdown.tsx:25-32`): *"Modern, clean, breathable · Soft pastel accents (blues, greens, oranges - NOT prominent) · Subtle shadows for depth · Better typography hierarchy · Minimal color usage · Professional and elegant."*

### Animation + backdrop coordination

Two backdrop layers coexist when a mega menu opens:

1. `MegaMenuDropdown` paints `fixed inset-0 bg-black/15 backdrop-blur-sm z-40` (`MegaMenuDropdown.tsx:74`) — the strong panel-owned dim.
2. `TopNavigation` paints `fixed inset-0 bg-black/[0.02] backdrop-blur-[2px] z-[45]` (`TopNavigation.tsx:172`) — the soft "behind the menu, in front of nav" haze that also acts as a mouse-detection trap (`onMouseEnter={dropdown.closeAll}` at `L174`).

The doubling looks intentional: the lower z-40 dims content; the higher z-45 carries the close behaviour and ensures clicking near the bar dismisses cleanly.

### Open/close behaviour

- **Hover open:** Mouse enters trigger → `useNavDropdown.handleMouseEnter(id)` → `setActiveDropdown(id)` immediately (`useNavDropdown.ts:51-58`). No open-delay.
- **Hover close:** Mouse leaves sticky wrapper → `handleMouseLeave()` → 100ms debounce → clear (`useNavDropdown.ts:60-65`). The debounce lets the cursor cross from the trigger down through dead space into the panel without flicker.
- **Mouse onto z-45 backdrop:** `closeAll()` immediately (`TopNavigation.tsx:174`). No debounce — anywhere outside both the nav and the panel = explicit dismiss intent.
- **Keyboard:** Enter / Space toggle (`useNavDropdown.ts:75-82`). Escape closes.
- **Touch:** `isTouchDevice` is detected on mount (`useNavDropdown.ts:28-30`). All hover handlers become no-ops (`L52, 61`). Touch users open menus via Enter/Tap → toggle. This prevents the "hover-open-then-stuck" failure mode on iOS/Android.

### Mobile equivalent — push menu (consumer-supplied)

On <1024px the mega menus are not rendered (`NAVBAR_USAGE.md:153-154` matrix). Instead, the consumer-injected `mobileMenu` slot renders a push overlay. In topnav-v32 this is `MobileMenu` re-export of `PushMenuContainer` (`mobile/PushMenu/PushMenuContainer.tsx`, 251 lines) — a level-stack (MainMenu → IndustriesMenu / ReportsMenu / etc.) with Framer slide transitions (`mobile/animations/transitions.ts`, 169 lines).

The push menu is **out of the navbar package boundary** by design (README.md:90 — *"MobileMenu / PushMenu — separate component system"*). New consumers can supply their own as long as it matches the `(isOpen, onClose) => ReactNode` signature.

### WWWWH per mega menu element

| Element | WHY | WHAT | WHEN | WHERE | HOW |
|---|---|---|---|---|---|
| MegaMenuDropdown wrapper | One consistent visual shell for all panels | 1200px max-width white surface + dark backdrop, slide-down anim | Any trigger active on desktop | Below `<nav>` in sticky wrapper | `<MegaMenuDropdown isOpen variant="full-width">{cols}</MegaMenuDropdown>` |
| Backdrop (`z-[45]`) | Trap mouseleave + soft veil over page | `fixed inset-0 bg-black/[0.02] backdrop-blur-[2px]` | Dropdown active AND not company/mobile | Inside sticky wrapper | `<motion.div>` opacity fade 200ms; `onMouseEnter=closeAll` |
| 4-col panel content | Categorised mega menu layout | Browse · 2 mid columns · CTA+featured | Per-trigger | Inside wrapper | Consumer-owned `<ReportsDropdown>` etc. |
| CompanyDropdown (small) | Simple about-Ken jump menu | 224px panel, 5 links | Company trigger active, ≥768px | Below CompanyTrigger in SecondaryBar | Simple absolute-positioned `<motion.div>` |
| Mobile push menu | Replace mega menus on touch | Full-screen level-stack overlay | <1024px hamburger open | Renders below `<nav>` via `mobileMenu` slot | Consumer-owned, scroll-locked via `useMobileMenu` |

---

## Summary

- **Above nav:** one element, the 40px `SecondaryBar` at `#fafafa` with a hairline border, holding two utility links + Company trigger on the left and auth controls on the right. NOT sticky. Hidden <768px. The single source for `Company` dropdown attach point and desktop auth controls.
- **Inside menus:** five full-width 4-column mega panels (Reports / Industries / Surveys / Consulting / Insights), each consumer-injected through `MegaMenuEntry[]`, each using the shared `MegaMenuDropdown` shell with 1200px max-width, 300ms slide-down, dual backdrop layers. Company has a separate small 224px dropdown.
- **Out of scope here, kept compact:** mobile push menu (entirely consumer-owned, lives in `mobile/PushMenu/`).
