# Header Tokens — Every CSS Variable, Height, Padding, Font Size, Color

> Source of truth: `projects/topnav-v32/src/styles/theme.css` (518 lines) + `tailwind.css` `.nav-container` utility. JS mirror at `src/design-system/tokens.ts` for runtime use (CSS remains authoritative — ARCHITECTURE.md:148).
>
> This doc lists **only the tokens the header consumes**. The full token system in `theme.css` covers buttons, cards, charts etc. — out of scope.

---

## 1. Font (DM Sans, via `.font-nav`)

The `.font-nav` utility class is the single point of control for the navbar font family. Definition (`theme.css:389-396`):

```css
/**
 * Navbar font family utility
 * Extracts the repeated font-['DM_Sans',sans-serif] declaration
 * used 13+ times across navbar atoms, molecules, and organisms.
 */
.font-nav {
  font-family: 'DM Sans', sans-serif;
}
```

Loading: DM Sans is imported in `src/styles/fonts.css` via Google Fonts with optical size axis `opsz 9..40` and weights 400/500/700 (per CONSISTENCY.md:91). The navbar applies `fontVariationSettings: "'opsz' 9"` on small text (e.g. SearchBar input, `SearchBar.tsx:60`; CompanyDropdown links, `CompanyDropdown.tsx:56`) to keep glyphs tight at small sizes.

---

## 2. Navigation semantic tokens (`theme.css:43-65`)

Sized following the "Modern Balanced Approach" cited at `theme.css:21-42` (researched against Airbnb / Stripe / Shopify / Figma / Notion). Comment block in source is verbatim worth quoting:

> "Industry Research:
> - Airbnb: 14px main nav, 14px dropdowns, 10px headers
> - Stripe: 15px main nav, 14px dropdowns, 11px headers
> - Shopify: 14px main nav, 13px dropdowns, 11px headers
> - Figma: 13px main nav, 13px dropdowns, 11px headers
> - Notion: 14px main nav, 14px dropdowns, 11px headers
>
> Hierarchy Pattern (Industry Standard):
> - Section Headers: 10-11px, lighter color (#999), uppercase, 0.08-0.1em spacing
> - Menu Items: 13-14px, darker color (#656565 → #141016), sentence case
>
> Accessibility: WCAG 2.1 AA Compliant
> - 14px minimum for primary navigation
> - 13px acceptable for secondary elements
> - 11px acceptable for non-interactive labels (headers)
>
> Scale Adherence: 87.5% (7/8 tokens on scale)
> Exception: 14px main nav (accessibility priority)"

### Font sizes

| Token | Value | Used by | Reference |
|---|---|---|---|
| `--nav-primary-text` | `14px` | Main nav triggers (Reports etc.), SearchBar input | `theme.css:45` · `NavDropdownTrigger.tsx:58`, `SearchBar.tsx:58` |
| `--nav-menu-item` | `var(--font-scale-base)` = `13px` | Dropdown menu items, "Featured Analysis" rows | `theme.css:46` |
| `--nav-section-header` | `11px` | Section headers (e.g. CAPABILITIES) — uppercase, non-interactive | `theme.css:47` |
| `--nav-featured-title` | `var(--font-scale-md)` = `16px` | Featured card titles inside mega menus | `theme.css:48` |
| `--nav-featured-desc` | `var(--font-scale-base)` = `13px` | Featured descriptions | `theme.css:49` |
| `--nav-cta-text` | `var(--font-scale-base)` = `13px` | "Read more" / "View all" CTA links | `theme.css:50` |
| `--nav-metadata` | `var(--font-scale-xs)` = `10px` | Badges like CASE STUDY / LATEST | `theme.css:51` |
| `--nav-helper-text` | `var(--font-scale-sm)` = `12px` | SecondaryBar links, CompanyTrigger, AuthButtons | `theme.css:52` · `CompanyTrigger.tsx:57`, `AuthButtons.tsx:39, 68` |

### Line heights (each tuned to its size)

| Token | Value | Rendered px @ size | Reference |
|---|---|---|---|
| `--nav-lh-primary` | `1.43` | 20px @ 14px — main nav | `theme.css:55` |
| `--nav-lh-menu` | `1.38` | 18px @ 13px — menu items | `theme.css:56` |
| `--nav-lh-header` | `1.27` | 14px @ 11px — section headers | `theme.css:57` |
| `--nav-lh-featured` | `1.375` | 22px @ 16px — featured cards | `theme.css:58` |
| `--nav-lh-metadata` | `1.2` | 12px @ 10px — badges | `theme.css:59` |
| `--nav-lh-helper` | `1.33` | 16px @ 12px — helper text | `theme.css:60` |

### Letter spacing

| Token | Value | Use | Reference |
|---|---|---|---|
| `--nav-ls-tight` | `0` | Regular text | `theme.css:63` |
| `--nav-ls-normal` | `0.08em` | Section headers — increased for better readability | `theme.css:64` |
| `--nav-ls-wide` | `0.1em` | Metadata/tags | `theme.css:65` |

### Spacing (nav-specific)

| Token | Value | Use | Reference |
|---|---|---|---|
| `--nav-column-gap` | `24px` | Mega menu column gap | `theme.css:71` |
| `--nav-item-gap` | `8px` | Between dropdown items | `theme.css:72` |
| `--nav-section-gap` | `14px` | Between mega menu sections | `theme.css:73` |
| `--nav-item-padding-x` | `10px` | Item horizontal padding | `theme.css:74` |
| `--nav-item-padding-y` | `6px` | Item vertical padding | `theme.css:75` |

---

## 3. Brand colour palette (the colours the header actually uses)

`theme.css:82-91`:

```css
--color-primary-black:  #141016;  /* primary text, dark backgrounds */
--color-secondary-grey: #656565;  /* secondary text, muted labels */
--color-light-grey:     #999999;  /* tertiary text, section headers */
--color-border-grey:    #e6e6e6;  /* dividers, borders */
--color-bg-light:       #fcfcfc;  /* light backgrounds, cards */
--color-bg-grey:        #f7f7f7;  /* featured card backgrounds */
--color-white:          #ffffff;  /* pure white */
--color-purple:         #806ce0;  /* accent, highlights */
--color-red:            #b01f24;  /* CTAs, hover states, brand red */
```

### Specific use in the header

| Surface | Colour | Where |
|---|---|---|
| Primary nav bar | `#ffffff` | `<nav className="bg-white ...">` (`TopNavigation.tsx:178`) |
| SecondaryBar | `#fafafa` (off-white, not in the token set above — intentional hairline contrast against `#ffffff`) | `SecondaryBar.tsx:55` |
| SecondaryBar bottom border | `rgba(0, 0, 0, 0.05)` | `SecondaryBar.tsx:55` |
| Primary nav text default | `#141016` | NavDropdownTrigger (`L52`) |
| Primary nav text hover | `#b01f24` (Ken brand red) | NavDropdownTrigger (`L52`) |
| Secondary bar text | `#656565` (grey) | CompanyTrigger (`L51`), AuthButtons (`L35`) |
| Secondary bar text hover | `#b01f24` | same lines |
| Username on SecondaryBar | `#656565` | `SecondaryBar.tsx:77` |
| Gradient trigger underline | `from-[#141016] via-[#656565] to-[#b01f24]` | `NavDropdownTrigger.tsx:73` |
| SearchBar outer pill bg | `#f5f5fd` (lavender tint) | `SearchBar.tsx:36` |
| SearchBar inner bg | `#fcfcfc` | `SearchBar.tsx:47` |
| SearchBar shadow | `6.98px -1.02px 14px -4px rgba(128,108,224,0.3)` (purple glow) | `SearchBar.tsx:36` |
| SearchBar beam gradient | `rgba(128,108,224,1)` → `rgba(128,108,224,0)` radial | `SearchBar.tsx:42` |
| Primary nav shadow | `0px 8px 12px -4px rgba(128,108,224,0.15)` (purple-tinted) | `TopNavigation.tsx:178` |
| AuthPopover bg | `#ffffff`, border `rgba(20,16,22,0.08)` | `AuthPopover.tsx:78` |
| AuthPopover shadow | `0px 8px 24px -4px rgba(20,16,22,0.12), 0px 2px 8px -2px rgba(20,16,22,0.08)` | `AuthPopover.tsx:79` |
| Hamburger hover bg | `#f5f5f5` (active: `#ebebeb`) | `MobileControls.tsx:76` |
| Focus ring colour | `rgba(20,16,22,0.5)` | everywhere — primary `focus-visible:ring` token |
| Backdrop blur (mega menu) | `bg-black/[0.02]` + `backdrop-blur-[2px]` | `TopNavigation.tsx:172` |
| Mega menu backdrop | `bg-black/15 backdrop-blur-sm` | `MegaMenuDropdown.tsx:74` |
| Hamburger bars | `#141016` | `HamburgerIcon.tsx:26, 31, 36` |

Note: `#fafafa` and `#f5f5f5` / `#ebebeb` are used inline in the navbar but are **not** in the token palette. These are deliberate one-offs — the SecondaryBar's `#fafafa` is its visual signature, and the hamburger button uses the standard hover-step pattern. Anyone porting should keep these exact hex values (CONSISTENCY.md:111 — *"Use these exact hex values. Do not approximate."*).

---

## 4. Header-specific layout dimensions

| Element | Dimension | Source |
|---|---|---|
| Primary nav height | `60px` (`h-[60px]`) | `TopNavigation.tsx:178` |
| Secondary bar height | `40px` (`h-[40px]`) | `SecondaryBar.tsx:55` |
| Total header height (initial) | `100px` | `NAVBAR_USAGE.md:243` |
| Total after scroll past SecondaryBar | `60px` | sticky only on primary nav |
| Hamburger button min size | `44px × 44px` | `MobileControls.tsx:87` (WCAG 2.5.5) |
| Hamburger button radius | `rounded-[8px]` | `MobileControls.tsx:75` |
| AuthAvatar sm | `28px` | DS Avatar (passed `size="sm"`) |
| AuthAvatar md | `40px` | DS Avatar (passed `size="md"`) |
| SearchBar | `120px × 35px` | `SearchBar.tsx:35` |
| SearchBar inner inset | `inset-[2px]` (2px ring effect) | `SearchBar.tsx:47` |
| SearchBar radius | `rounded-[99px]` (pill) | `SearchBar.tsx:36` |
| Beam gradient size | `31px × 65px`, `blur-[4px]` | `SearchBar.tsx:39` |
| AuthPopover card | `w-[220px]` | `AuthPopover.tsx:77` |
| AuthPopover offset from trigger | `top-[calc(100%+8px)] right-0` | `AuthPopover.tsx:76` |
| AuthPopover radius | `rounded-[12px]` | `AuthPopover.tsx:77` |
| CompanyDropdown | `w-56` = `224px`, `p-3` = 12px | `CompanyDropdown.tsx:48` |
| Mega menu max width | `1200px` (per `MegaMenuDropdown` design spec) | `MegaMenuDropdown.tsx:23, 31` |
| Mega menu inner padding | `px-6 py-8` | `MegaMenuDropdown.tsx:31` |
| NavDropdownTrigger wrapper | `h-[60px]` (full bar height — extends hover region) | `NavDropdownTrigger.tsx:43` |
| Trigger gradient underline | `h-[2px]`, `rounded-full` | `NavDropdownTrigger.tsx:72` |
| DropdownChevron sizes | `10px` (secondary), `12px` (primary) | `DropdownChevron.tsx:19, 21` |
| HamburgerIcon bars | `24px × 2.5px`, gap `5px` | `HamburgerIcon.tsx:24-39` |
| Desktop trigger row gap | `gap-6 xl:gap-8` (24px → 32px @ ≥1366) | `DesktopNavItems.tsx:56` |
| Mobile controls gap | `gap-1` (4px) | `MobileControls.tsx:46` |
| Tablet controls gap | `gap-3` (12px) | `TabletControls.tsx:54` |
| SecondaryBar left gap | `gap-6` (24px) | `SecondaryBar.tsx:60` |
| SecondaryBar right gap | `gap-3` (12px) | `SecondaryBar.tsx:74` |

---

## 5. `.nav-container` — responsive horizontal padding

Defined in `tailwind.css:107-149`. The single container utility every nav surface (and every page section, per CONSISTENCY.md:54-72) must use:

```css
.nav-container {
  @apply mx-auto px-6;
  width: 100%;
  max-width: 1440px;

  @media (min-width: 768px) {  @apply px-10; }
  @media (min-width: 1024px) { padding-left: 60px;  padding-right: 60px;  }
  @media (min-width: 1200px) { padding-left: 100px; padding-right: 100px; }
  @media (min-width: 1366px) { padding-left: 120px; padding-right: 120px; max-width: 1440px; }
}
```

| Viewport | Side padding | Content width |
|---|---|---|
| <768px | 24px (`px-6`) | 100vw − 48px |
| ≥768px | 40px (`px-10`) | 100vw − 80px |
| ≥1024px | 60px | 100vw − 120px |
| ≥1200px | 100px | 100vw − 200px |
| ≥1366px | 120px | max 1200px content (1440 − 240) |

Design target: 1200px content width at 1366px+ viewports (CONSISTENCY.md:84). This is the alignment grid the logo, nav triggers, CTA, and *all* page sections share.

---

## 6. Shadows used by the header

From `theme.css:178-185`:

```css
--shadow-xs: 0px 1px 2px 0px rgba(20, 16, 22, 0.05);
--shadow-sm: 0px 2px 4px 0px rgba(20, 16, 22, 0.08);
--shadow-md: 0px 2px 8px 0px rgba(128, 108, 224, 0.12);   /* purple */
--shadow-lg: 0px 4px 16px 0px rgba(20, 16, 22, 0.12);
--shadow-xl: 0px 8px 32px 0px rgba(20, 16, 22, 0.16);
--shadow-glow-purple: 0px 1px 30px -5px rgba(128, 108, 224, 0.2);
--shadow-glow-red:    0px 2px 12px 0px rgba(176, 31, 36, 0.15);
```

Header uses purple-family shadows for the depth signature (matches DS pattern — purple = "elevated" surfaces). Inline shadow values in source are functionally `--shadow-md` derivatives at custom intensities; consumers should consider replacing inline definitions with tokens where possible during port.

---

## 7. Z-index stack (header)

From `theme.css:194-198` plus inline usage:

| Layer | z-index | Used by |
|---|---|---|
| Page modals (consumer) | <40 | NOT navbar |
| MegaMenuDropdown backdrop | 40 | `MegaMenuDropdown.tsx:74` |
| Soft backdrop overlay | 45 | `TopNavigation.tsx:172` |
| Primary nav | 50 | `TopNavigation.tsx:162, 178` |
| Secondary bar | 60 | `SecondaryBar.tsx:55` |
| AuthPopover backdrop | 98 | `AuthPopover.tsx:63` |
| AuthPopover card | 99 | `AuthPopover.tsx:76` |

The DS scale tokens (`--z-dropdown: 1000`, `--z-sticky: 1020`, etc., `theme.css:194-198`) are **not** used by the header — the header has its own bespoke 40-99 range so it never clashes with the 1000-tier modal/popover tokens used elsewhere in the app.

---

## 8. Transition tokens

From `theme.css:188-191`:

```css
--transition-fast:   150ms ease-in-out;
--transition-base:   200ms ease-in-out;
--transition-slow:   300ms ease-in-out;
--transition-slower: 400ms ease-in-out;
```

| Where | Duration | Note |
|---|---|---|
| Trigger text colour | 200ms (`transition-colors`) | NavDropdownTrigger (`L55`) |
| Gradient underline | 300ms (`transition-all duration-300`) | NavDropdownTrigger (`L73`) |
| Chevron rotation | 300ms | DropdownChevron (`L30`) |
| Logo button hover | 200ms (`transition-all`) | LogoButton (`L43`) |
| Hamburger bar morph | 300ms ease-out | HamburgerIcon (`L26`) |
| Hamburger button hover | 200ms | MobileControls (`L77`) |
| AuthPopover open | spring (stiffness 400, damping 25) | AuthPopover (`L74`) |
| AuthPopover backdrop | 150ms | AuthPopover (`L62`) |
| Mega menu wrapper anim | 300ms ease `[0.4, 0, 0.2, 1]` | MegaMenuDropdown design spec |
| Soft backdrop (z-45) | 200ms duration | TopNavigation (`L171`) |
| CompanyDropdown | 200ms ease `[0.4, 0, 0.2, 1]` | CompanyDropdown (`L47`) |

---

## 9. Keyframe animations (header-owned)

Defined in `theme.css:401-462`:

- `@keyframes shimmer` (`L401-408`) → `.animate-shimmer` (`L410-412`) — 2.5s ease-in-out infinite. Used inside DS Button "selected" state.
- `@keyframes beamOrbit` (`L417-458`) → `.animate-beam-orbit` (`L460-462`) — **6s linear infinite**. Eight keyframes describe the purple beam orbiting the perimeter of the search bar. Drives `SearchBar.tsx:38-44`. This is the most distinctive animation in the header.

---

## 10. Logo size tokens (`theme.css:163-168`)

```css
--logo-height-xs: 16px;  /* favicon, breadcrumbs */
--logo-height-sm: 20px;  /* navbar — mobile + desktop, sidebar */
--logo-height-md: 24px;  /* sticky headers, email */
--logo-height-lg: 32px;  /* footer, about, partner sections */
--logo-height-xl: 48px;  /* hero, splash */
```

Header uses `--logo-height-sm` (20px). The DS `Logo` component reads its `size` prop to apply the matching token. NavLayout's call `<Logo size="sm" />` (`NavLayout.tsx:83`) is the canonical one.

---

## 11. What the header does NOT use (worth knowing)

- `--text-2xl`, `h1/h2/h3` from `@layer base` are not used by the header — the header overrides all text via `style={{ fontSize, lineHeight }}` inline + `font-nav` class.
- `--radius-sm/md/lg/xl/2xl` tokens are not applied inline — the header uses literal radii (`rounded-[5px]`, `[8px]`, `[12px]`, `[99px]`). These radii align with the DS scale but are not bound to the variable, so changing the token will not reshape the navbar.
- `--button-*` tokens are consumed only by the DS Button (`Button.tsx`), which the header *injects* — they don't directly affect any navbar atom.
- Editorial-light variant only. The cinematic-dark variant (`#0a0a0c` bg) is not exercised by topnav-v32 — there is no dark-nav surface in this project. Workspace activator `[data-variant-section="cinematic"]` (per `CLAUDE.md` brand-tokens section) is supported globally but unused here.

---

## 12. Quick reference card

```
Heights:        Secondary 40 · Primary 60 · Total 100 → 60 on scroll
Container:      .nav-container (max 1440, padding 24→40→60→100→120)
Z-stack:        backdrop 40·45 < nav 50 < secondary 60 < popover 98·99
Brand colours:  bg #ffffff/#fafafa · text #141016/#656565/#999999 · brand #b01f24 · purple #806ce0
Fonts:          14px primary · 13px menu · 12px helper · 11px section header · 10px metadata
Line heights:   1.43 · 1.38 · 1.27 · 1.33 · 1.2
Logo:           20px (sm)
Avatar:         28 (sm) / 40 (md)
Search bar:     120×35 pill, purple beam-orbit 6s linear infinite
Hamburger:      44×44 tap, 24px bars, 300ms morph
Animations:     200ms colour · 300ms chevron/underline · 300ms mega menu · spring 400/25 popover
Shadow:         purple-tinted on nav + search; black-tinted on popover
Border:         5% black hairline on SecondaryBar; no border on primary nav
```
