# Footer Anatomy — V0.2 Canonical Ken Research Footer

**Source file:** `/Users/vishalchauchan/Downloads/Anti-folder01/projects/V0.2 -for design system/src/app/components/Footer.tsx`
**Lines:** 265
**Status:** ★ canonical Footer source for the workspace (per user)

This file is the single best footer in any Ken-Research-related project right now. It is dense, intentional, and ships every region a B2B research site is expected to have: nav, offices, newsletter, brand watermark, legal strip.

---

## 1. Top-level wrapper

```tsx
<footer className="bg-[#141016] pt-[77px] overflow-hidden pb-10">
  <div className="max-w-[1200px] w-full mx-auto px-2 max-md:px-4 container">
    …
  </div>
</footer>
```
File: `Footer.tsx:95-96`

**WHAT** — cinematic-dark footer block.
**WHY** — gives the page a hard visual close, brand-asserts via deep tone, contrasts with the editorial light body above.
**WHEN** — bottom of every report PDP, marketing page, listing page. One per page, full-width.
**WHERE in this codebase** — mounted in `App.tsx:191` after `<FinalCTA />` and outside the `<main>` flex container, so it spans full width (the left TOC sidebar does not push it).
**HOW** —
- Background `#141016` is the workspace's **footer-only** near-black (not pure `#000`, not `#0a0a0c`). It maps to the `--grey-800` token in `theme.css:68`. Slightly warm, intentionally one notch lighter than `--grey-900: #0a0a0a` so the white "Ken" wordmark inside doesn't crush.
- Top padding `77px` (not a Tailwind step — explicit pixel) creates breathing room from the section above.
- Bottom padding `pb-10` (40px).
- `overflow-hidden` is required because the `Ken` wordmark at 356px overflows the container on desktop.
- Max width `1200px` matches every other section in the project — keeps footer columns visually aligned with body content above.
- `px-2 max-md:px-4` — the desktop padding is *very* tight (only 8px) because the inner grid handles its own gutters. Mobile bumps to 16px.

**Contrast** — all foreground text is white or grey-on-dark:
- `#FFFFFF` for link text and primary copy
- `#BDBDBD` for column headings (low-emphasis grey)
- `#989898` for bottom-strip legal links
- `#7C7C7C` for newsletter helper text
- `#757575` for icon tint
All pass WCAG AA on `#141016` background.

---

## 2. Region A — Navigation columns (4-column grid)

```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-start justify-between gap-5 max-md:gap-7">
  {navigationSections.map((section) => ( … ))}
</div>
```
File: `Footer.tsx:98-140`

### Columns (definition at `Footer.tsx:12-69`):

1. **About Ken Research** — 7 links (Home, About Us, Services, Categories, News, Careers, Contact Us)
2. **Resources** — 8 links (Blogs, Industry Reports, Company Research Reports, Country Research Reports, Bundle Reports, Dossier 360, Go To Market Strategy, Paid Press Release)
3. **Expertise & Services** — 11 links (Industry Speaks, T&C, Privacy, Disclaimer, FAQ's, Sitemap, Design System, Stakeholder Icons, Segmentation Icons, Charts Showcase, IT Support, Website Issue — the last 2 are MS Forms URLs to an external Office 365 instance)
4. **How We Are Different?** — 9 competitor comparison links (Ken vs BCC, Euromonitor, Nielsen, MarketsandMarkets, McKinsey, Mordor, S&P Global, Grand View, Frost & Sullivan)

### WWWWH per column

**WHAT** — vertical link list with column heading.
**WHY** — declares Ken's product surface (Resources), authority (Expertise), and competitive positioning (How We Are Different) directly in the footer. The 4th column is **load-bearing** for SEO + brand positioning — Ken explicitly compares itself to 9 competitors.
**WHEN** — every page.
**WHERE** — top region of the footer, below pt-77.
**HOW** —
- Column heading: `Footer.tsx:101-110`
  ```
  font-bold mb-4 uppercase tracking-wider text-[#BDBDBD] text-[12px]
  ```
  12px uppercase widened-tracking grey-on-black — classic footer label. `mb-4` (16px) gap before links. Bound to `cursor-pointer` + `onClick={() => toggleSection(section.title)}` for mobile collapse.
- A `<ChevronDown />` icon (Lucide) appears next to the heading on **mobile only** (`sm:hidden`) and rotates 180° when expanded — `transition-transform`.
- Each link row (`Footer.tsx:117-132`):
  ```
  flex flex-row gap-[20px] items-center navItem
  opacity-40 hover:opacity-100 transition-all duration-300 ease-out
  ```
  The whole row sits at 40% opacity and brightens to 100% on hover — a strong but quiet hover signal.
- A **decorative 1px × 30px vertical divider** (`Footer.tsx:124`) precedes every link:
  ```
  <div className="w-[1px] h-[30px] bg-[#757575] opacity-10"></div>
  ```
  At 10% opacity it reads as a barely-there column rule, repeated per row. Creates a "list of tickets" texture.
- The link itself (`Footer.tsx:125-130`) is `text-white text-sm tracking-[0.62px]` — 14px, white, with a non-default letter-spacing of 0.62px that ties to a recurring tracking value used throughout the footer (see Region D legal strip below).
- There is a **leftover/aspirational marker** at `Footer.tsx:133-136`:
  ```
  <div
    className="absolute left-0 top-[-36px] w-[1px] h-[25px] bg-[#6400E4] …"
    style={{ transform: 'translateY(0px)', opacity: 0 }}
  />
  ```
  A 1×25px purple bar (#6400E4 — a *different* purple to the data purple #7f5fe3) positioned absolutely, opacity:0, transform unchanged. It is a vestigial "active link" indicator that was wired to JS movement in the OG site but is dormant here. **Do NOT replicate** — see `coding-differences-from-og.md`.

### Padding / responsive
- `gap-5` (20px) between columns on desktop, `max-md:gap-7` (28px) on mobile.
- Below `sm` (640px): single column with collapse/expand on heading click.
- At `sm` (640px+): 2 columns.
- At `lg` (1024px+): 4 columns.
- `items-start` so columns align at the top even when link counts differ (col 3 has 11, col 1 has 7).

### Accessibility notes
- ✅ Semantic `<footer>`, `<nav>`, `<h2>` for column titles, `<a>` for links.
- ⚠️ The chevron toggle has no `aria-expanded` / `aria-controls` — accordion behavior is invisible to screen readers. Fix on port.
- ⚠️ Cursor `cursor-pointer` is set on the `h2` but the heading is not actually a button on desktop (no toggle visible). Mild semantic noise.
- ⚠️ Opacity-40 default makes link rows 5.7:1 contrast — below WCAG AAA, passes AA for body text only. Mobile users get 100% opacity once tapped to expand.

---

## 3. Region B — Office locations ("Company Overview")

```tsx
<div className="flex flex-col mt-5 max-md:mt-7">
  <h2 className="font-bold mb-4 uppercase tracking-wider text-[#BDBDBD] text-[12px]">
    Company Overview
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 font-body">
    {offices.map((office) => ( … ))}
  </div>
</div>
```
File: `Footer.tsx:143-174`

**WHAT** — 4-card grid of physical office addresses with optional Google Maps deep-link.
**WHY** — proves Ken is a real multi-country business (India / UAE / Indonesia / Qatar), aids local SEO, signals scale to procurement teams reviewing the page.
**WHEN** — every page footer.
**WHERE** — directly below nav columns, above the wordmark.
**HOW** —
- Offices array at `Footer.tsx:71-92`:
  - India (Gurgaon HQ, full address, Maps URL)
  - UAE (Dubai, Maps URL)
  - Indonesia (Tangerang, Maps URL)
  - Qatar (Doha, `mapUrl: null` — falls back to `<p>` instead of `<a>`)
- Each office card (`Footer.tsx:151-172`):
  ```
  <div className="flex flex-col opacity-40 hover:opacity-100">
    <h2 className="font-bold mb-2 uppercase tracking-wider text-[#BDBDBD] text-[10px]">
      {office.title}
    </h2>
    <a className="text-[14px] m-0 leading-[24px] tracking-[.1px] text-white">
      {office.address}
    </a>  // or <p> if no mapUrl
  </div>
  ```
- Country label is `text-[10px]` uppercase widened — smaller than the column nav `12px` headings. Establishes hierarchy: nav columns are the primary footer content; office grid is secondary.
- Same `opacity-40 → 100` hover.
- Address is 14px white with 24px line-height, 0.1px tracking. Tight but readable.
- `font-body` is declared on the wrapping grid — this is the only place the explicit `font-body` utility appears in the footer, the rest inherits.

### Responsive
- 1 col mobile, 2 cols `sm`, 4 cols `lg`.
- `gap-10` (40px) — generous because each card has multi-line addresses.

---

## 4. Region C — Brand watermark + newsletter

```tsx
<div className="w-full flex items-end pt-12 max-md:flex-col max-md:gap-8">
  <div className="h-[270px] max-md:h-max w-3/5 max-md:w-full relative overflow-hidden">
    <p className="absolute max-md:hidden top-[-140px] left-0 text-[356px] tracking-[-0.02em] text-white">Ken</p>
    <p className="md:hidden text-[124px] text-white">Ken</p>
  </div>
  <div className="relative w-2/5 max-md:w-full flex flex-col gap-8">
    … newsletter …
  </div>
</div>
```
File: `Footer.tsx:177-229`

### Sub-region C1 — Wordmark (3/5 width on desktop)
**WHAT** — oversized "Ken" wordmark as background brand assertion.
**WHY** — converts the footer into a brand moment, not just a sitemap. Mirrors the editorial typographic boldness of brands like Stripe, Linear, NYT R&D.
**HOW** —
- Desktop: `text-[356px]` (yes, 356px) with `tracking-[-0.02em]` (tight tracking), positioned absolutely at `top-[-140px]` so the top of the K bleeds outside the visible container (which is why the root `<footer>` has `overflow-hidden`).
- Container is `h-[270px]` — the wordmark visually fills the space because it is taller than the box and clipped.
- Mobile: separate `<p>` at `text-[124px]` (124px) sitting in normal flow, `h-max` container.
- Font: inherits the page's `font-display` (Noto Serif) — confirmed by the lack of override. Could be wrong on port if `font-display` is not the default `<p>` font. **Check on copy.**

### Sub-region C2 — Newsletter (2/5 width on desktop)
**WHAT** — email capture w/ support email mailto + Subscribe button.
**WHY** — captures qualified leads from a high-intent surface (footer = end of page = engaged scroll).
**HOW** —
- Mail block (`Footer.tsx:191-198`):
  ```
  <Mail className="text-[#757575]" size={16} />
  <span>For Queries:</span>
  <a href="mailto:support@kenresearch.com" className="hover:underline">
    support@kenresearch.com
  </a>
  ```
  Lucide Mail icon, grey-tinted, 16px. Mailto-link, underline-on-hover. Sits as a single inline-flex paragraph.
- Helper copy (`Footer.tsx:199-208`):
  - Eyebrow: `text-[12px] text-[#7C7C7C] tracking-[0.62px]` — "Subscribe to our Newsletter"
  - H/headline: `text-[16px] text-white tracking-[0.62px]` — "Never Miss out on an update from us"
- Input + button row (`Footer.tsx:210-227`):
  - Input wrapper: `bg-[#FFFFFF1A]` (white at 10% alpha — gives a glass-tinted feel against the dark bg), `w-[421px]`, `h-[48px]`, `rounded-sm`. On mobile collapses to `w-full`.
  - Input itself: transparent, no border, `placeholder:text-white/50`, `pl-4 py-2`.
  - Subscribe button: **the only Ken-red element in the entire footer** —
    ```
    bg-[#B01F24] border-[#B01F24]
    hover:bg-[#8A191D] hover:border-[#8A191D]
    h-[44px] px-[16px] rounded-md
    text-[14px] leading-[16px] text-white
    letterSpacing: 0.60px
    ```
    Note: red value `#B01F24` is the canonical Ken brand red (also `--brand-red-500`). Hover `#8A191D` is slightly darker than the documented `--brand-red-600: #8f181d` — a 1-bit drift; minor.
  - Trailing icon: Lucide `<ArrowUpRight />` at size 18.

### Responsive
- Below `md`: stacks vertically (`flex-col`, `gap-8`) with desktop wordmark hidden and mobile wordmark shown.
- Input + button row: `max-md:flex-col max-md:items-start` — input full width, button below.

### Newsletter functional state
- `email` is held in `useState('')` (`Footer.tsx:5`).
- `onChange` is wired — **but there is no submit handler.** Subscribe is decorative until wired. Flag for port.

---

## 5. Region D — Divider + legal strip

```tsx
<div className="w-full h-[2px] bg-white mt-[100px]"></div>

<div className="w-full flex items-center justify-between mt-[40px]
                max-md:gap-4 max-md:flex-col max-md:items-start">
  <div className="flex gap-[60px] max-md:flex-col max-md:gap-4">
    <a … >Terms & Conditions</a>
    <a … >Privacy Policy</a>
    <a … >Cookie Policy</a>
  </div>
  <p>© Copyright 2026, Ken Research Pvt. Ltd. All rights reserved.</p>
</div>
```
File: `Footer.tsx:232-261`

**WHAT** — solid 2px white rule, then a row of 3 legal links + copyright.
**WHY** — visually closes the footer. Legal links are mandatory regulatory content (T&C, Privacy, Cookie). Copyright stamps the page year + entity.
**HOW** —
- **Divider** — `h-[2px] bg-white mt-[100px]`. White-on-`#141016` at 2px is bold; 100px top margin (`mt-[100px]`) creates a real visual pause before the legal block. This is one of the most assertive footer-dividers in the workspace.
- **Legal links** (`Footer.tsx:236-255`):
  - `text-[12px] text-[#989898] tracking-[1px]` — 12px, mid-grey, +1px letter-spacing. Sits on the left.
  - Hover: `hover:text-white transition-colors` — quiet color brighten.
  - 60px horizontal gap between the 3 (`gap-[60px]`).
  - On mobile: stacks vertically with 16px gap.
- **Copyright** (`Footer.tsx:256-260`):
  - Same `text-[12px] text-[#989898] tracking-[1px]`.
  - Sits on the right desktop, top of stack on mobile (because `max-md:flex-col max-md:items-start` reverses the order visually but DOM-order keeps links first).
  - Year is **hard-coded `2026`** (`Footer.tsx:259`). Not auto-`new Date().getFullYear()`. Flag for port.

### Mobile responsive
- Container becomes `flex-col items-start gap-4` — copyright drops below the legal stack.

---

## 6. Padding / spacing summary (quick reference)

| Region | Pad-top | Pad-bottom | Gap |
|---|---|---|---|
| `<footer>` outer | 77px | 40px | — |
| Inner container | 0 (px-2 / max-md:px-4) | — | — |
| Nav columns row | 0 (mt of next region creates gap) | — | 20px col, 28px col mobile |
| Office grid | mt-5 (20px) / mobile mt-7 (28px) | — | 40px |
| Wordmark+newsletter row | pt-12 (48px) | — | mobile gap-8 (32px) |
| Divider | mt-[100px] | — | — |
| Legal strip | mt-[40px] | — | 60px h, mobile 16px |

The **100px gap before the divider** is the most distinctive spacing choice — it isolates the legal strip as a quiet coda.

---

## 7. Color summary

| Hex | Token | Use |
|---|---|---|
| `#141016` | `--grey-800` | Footer background |
| `#FFFFFF` | `--white` | Primary link/copy text, divider |
| `#BDBDBD` | (none) | Column headings (12px), office country labels (10px) |
| `#989898` | (none) | Legal strip + copyright (12px) |
| `#7C7C7C` | (none) | Newsletter eyebrow text |
| `#757575` | (none) | Decorative dividers, mail icon |
| `#FFFFFF1A` | (white @ 10%) | Newsletter input wrapper |
| `#B01F24` | `--brand-red-500` | Subscribe button bg + border |
| `#8A191D` | (~`--brand-red-600`) | Subscribe button hover |
| `#6400E4` | (none) | Dormant active-link bar (unused) |

**Tokens NOT used** — although `theme.css` defines `--grey-800` etc., the Footer hard-codes every hex. This is the project's general code-quality drift — see `coding-differences-from-og.md`.

---

## 8. Typography summary

| Element | Size | Weight | Color | Letter-spacing | Notes |
|---|---|---|---|---|---|
| Column heading | 12px | bold | #BDBDBD | wider (default `tracking-wider`) | UPPERCASE |
| Office country | 10px | bold | #BDBDBD | wider | UPPERCASE |
| Nav link | 14px | normal | #FFFFFF | 0.62px | Sentence case |
| Office address | 14px | normal | #FFFFFF | 0.1px | leading-24 |
| Mail row | base | normal | #FFFFFF | 0.62px | inline-flex |
| Newsletter eyebrow | 12px | normal | #7C7C7C | 0.62px | — |
| Newsletter H | 16px | normal | #FFFFFF | 0.62px | — |
| Subscribe button | 14px | normal | #FFFFFF | 0.60px | line-height 16 |
| Wordmark desktop | 356px | (inherit display font) | #FFFFFF | -0.02em | tight |
| Wordmark mobile | 124px | (inherit display font) | #FFFFFF | normal | — |
| Legal link | 12px | normal | #989898 | 1px | hover:white |
| Copyright | 12px | normal | #989898 | 1px | — |

The recurring `tracking-[0.62px]` value across nav links + newsletter copy is unusual and ties the footer together typographically.

---

## 9. Replicate / Modify / Reject summary

| Element | Verdict | Reason |
|---|---|---|
| 4-col nav + 4-col office grid | ✅ Replicate | Canonical Ken footer shape |
| Opacity-40 → 100 hover pattern | ✅ Replicate | Quiet, distinctive, on-brand |
| Oversized "Ken" wordmark | ✅ Replicate | Best brand moment in workspace |
| 100px gap before divider | ✅ Replicate | Distinctive coda |
| Office cards w/ Google Maps deep links | ✅ Replicate | Local SEO + trust signal |
| Newsletter shape (mail + eyebrow + H + input + red button) | ✅ Replicate | Strong conversion surface |
| 12px white divider rule | ⚠ Modify | Consider 1px grey for less assertion |
| Subscribe button hover #8A191D | ⚠ Modify | Use token `--brand-red-600` (#8f181d) instead |
| `cursor-pointer` on column h2 (desktop) | ⚠ Modify | Only apply on `sm:hidden` accordion |
| Dormant `#6400E4` purple bar | ❌ Reject | Vestigial, removes for clarity |
| Hard-coded `2026` copyright | ❌ Reject | Use `new Date().getFullYear()` |
| Inline hex everywhere | ❌ Reject | Port to CSS variables — see `coding-differences-from-og.md` |
| Email input w/o submit handler | ⚠ Wire up | Provide onSubmit or fetch to backend |
| No `aria-expanded` on mobile accordion | ⚠ Modify | Add for a11y |
