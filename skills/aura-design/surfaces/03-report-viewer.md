# Surface 03 — Report Viewer

**Buyer's question:** "Is this 80-page PDF actually usable in browser?"
**North stars:** Apple Books × Notion × Substack × Stripe Press × Posthog handbook
**Brand variant:** Editorial light primary (reading), cinematic dark optional toggle (long-session reading)

The Viewer is where Ken Research **earns the price**. Tier A delivers PDF — we deliver a product. Quality of this surface = direct conversion lever for next purchase.

---

## Information architecture

```
[Sticky top bar — minimal]
  Logo · Report title (truncates) · Page progress · Share · Cite · Download · Theme toggle (dark/light)

[Layout — 3 zones]
  Left rail (desktop):  Sticky TOC w/ scroll-spy + bookmarks + reader settings
  Center (~720px):      Reading column. Body 17-19px (NOT 16). Leading 1.6-1.7. Line-length 65-75ch.
  Right rail (desktop): Citations panel · Related charts · "Cited in X reports" · Notes

[Footer of each section]
  Section share-link · Cite-this-section button · Next section CTA
```

**Mobile (<768px):**
- Hamburger menu = TOC (Linear-style slide-in, NOT hamburger-junk)
- No right rail — citations expand inline on tap
- Page progress = thin top bar (Readwise pattern)
- Reader settings (font size, theme, line-height) in 1 modal

**Tablet (768-1024px):** TOC collapsed by default, no right rail (tap a citation = expand inline)

---

## Type system (overrides marketing defaults)

| Element | Size | Font | Line-height | Notes |
|---|---|---|---|---|
| Body | **17-19px** (not 16) | DM Sans | 1.6-1.7 | Reading distance differs from marketing — 16px causes fatigue at 80pp |
| H1 (chapter) | 39px | Noto Serif | 1.2 | One per chapter, not per page |
| H2 (section) | 28px | Noto Serif | 1.3 | |
| H3 (subsection) | 21px | Noto Serif | 1.35 | |
| Caption (chart, footnote) | 14px italic | DM Sans | 1.5 | Italic = reading-mode signal (Stripe Press pattern) |
| Pull quote | 24-28px serif italic | Noto Serif | 1.4 | Hanging punctuation, optical margin alignment via `text-wrap: pretty` (Tailwind v4) |
| TOC item | 14px | DM Sans | 1.4 | Active state = brand red `#b01f24` 2px left border |

**Drop caps** for chapter openers (Stripe Press pattern). 4-line drop, Noto Serif.

**Hanging punctuation** on pull quotes. Use Tailwind v4 `text-wrap: pretty` + manual margin offset for opening quote mark.

---

## Charts (in-viewer requirements — non-negotiable)

Every chart must include:
1. **Title + subtitle** (subtitle = method/source 1 line)
2. **Source citation footer** w/ date (`Source: Ken Research, Q1 2026 · n=2,847`)
3. **`tabular-nums`** for all numeric labels (no jitter on hover)
4. **3 affordances visible w/o hover** (NOT hidden in menu):
   - "Copy chart as PNG" (canvas → clipboard)
   - "Download CSV" (raw data)
   - "Cite this" (auto-formatted APA/Harvard)
5. **Embed code** behind 1 click (Statista flywheel — every embed links back to source page)
6. **Dark mode adaptive** — chart re-themes when reader toggles theme

**Chart type:** see `decisions/chart-picker.md` (chart-type decision tree). **Banned in viewer:** 3D charts, pie >3 slices, dual y-axis, donut for >5 categories.

---

## Reading ergonomics (Apple Books / Posthog handbook patterns)

### Sticky TOC w/ scroll-spy
- Active section highlighted brand-red border + 600 weight
- Bookmarks: 1-click save, persists in localStorage + (when authed) account
- Hierarchy: 2 levels visible (chapter + section), 3rd level expands on click
- Search inside report: ⌘K opens overlay, fuzzy match across body + headings

### In-line definitions (Posthog pattern)
- Glossary terms have dotted underline
- Hover (desktop) / tap (mobile) → tooltip w/ 1-2 line def + "see full glossary →" link
- Don't auto-detect — explicit markup only (avoids false-positive noise)

### Margin notes (Readwise pattern)
- Right rail (desktop): notes column for highlights + user annotations
- Highlight a passage (drag-select) → floating bar: `Highlight · Note · Cite · Share`
- Notes stay w/ user account, exportable as MD

### Section share-links (Substack/Notion pattern)
- Hover any heading → `#` icon appears → click = copy direct URL to that section
- Share modal: Twitter / LinkedIn / Email + auto-generated quote-card image (160 char excerpt + brand frame)

---

## Pagination vs infinite scroll

**Default: infinite scroll w/ chapter breaks.** Chapter end = explicit "Next chapter" CTA + "Back to TOC" + reading progress (e.g. "Chapter 4 of 7 · 23 min remaining").

**Optional: pagination toggle** in reader settings (Apple Books pattern — reduces fatigue for 80+ pp reports). Persists per-user.

**Don't:** auto-load next chapter without break. Reader needs breath.

---

## Cite + share affordances (the leverage move)

Per strategy audit: **citation block on every report = "single highest-leverage move in the entire audit."**

Every section, every chart, every report-level page must offer:

```
Cite this section
─────────────────
APA:     Ken Research. (2026). [Section title]. In [Report title]. Retrieved from [URL]
Harvard: Ken Research, 2026. [Section title]. In: [Report title]. Available at: [URL]
Chicago: Ken Research. 2026. "[Section title]." In [Report title]. [URL]
BibTeX:  @misc{ken2026..., ...}

[Copy APA] [Copy Harvard] [Copy Chicago] [Copy BibTeX]
```

Free preview pages = citation block visible (drives backlinks even from non-buyers). Locked pages = citation visible, body gated.

---

## Theme toggle (cinematic dark / editorial light)

Reader chooses. Default = editorial light (reading-optimized). Dark variant = cinematic dark Ken-v1 tokens.

**Dark variant behavior:**
- True black NOT pure black: `--color-bg-deep #0a0a0c` (not `#000` — OLED smearing)
- Body text: `#FAFAFA` at 19px (slightly larger than light, dark needs more weight)
- Charts re-theme: white grid lines → `rgba(255,255,255,0.08)`, axis labels → `rgba(255,255,255,0.65)`
- Brand red CTAs unchanged (`#b01f24` works on both)

**Light variant behavior:**
- bg `#f5f2f1` (warm off-white, not `#fff` — eye fatigue on white)
- Body text `#000000` at 17-18px
- Charts: light grid `rgba(0,0,0,0.08)`, axis `rgba(0,0,0,0.65)`

Toggle persists per-user. Smooth crossfade transition (200ms, opacity only, no color animation — flicker risk).

---

## Mobile-specific (mobile-first overrides)

- Reading column = full width minus 16px gutters
- Body type bumped to 18px (touchscreen reading distance is shorter than desktop)
- Charts: scrollable horizontally w/ "Scroll for more →" affordance, OR stacked w/ "Tap to expand"
- Sticky bottom bar: `[Cite] [Share] [Bookmark] [TOC]` — 56px tall, thumb-zone optimized
- Pull-to-refresh disabled in viewer (accidental gesture risk)
- Tap target ≥44px everywhere

---

## A11y (WCAG 2.2 AA minimum, enforced by `aura-qa`)

- Skip link to "Reading content" first interactive element
- TOC = `<nav aria-label="Table of contents">`, sections = `<article>` w/ `aria-labelledby`
- Charts: `<figure>` + `<figcaption>` for source, `aria-describedby` for trend summary (auto-generated 1-line)
- Theme toggle: `aria-pressed`, announce mode change via live region
- Highlight tools: focus trap in modal, ESC dismisses
- Reading progress: `<progress>` element, announced as percentage
- Hanging punctuation: don't break selection (use `text-wrap: pretty` not `text-indent` hacks that break screen-reader flow)

---

## Anti-patterns (specific to viewer — extends `anti-patterns.md`)

| Don't | Why |
|---|---|
| Reader-mode that strips charts | We sell the data viz — never reduce to text-only |
| Fixed pagination w/o infinite-scroll option | Ken reports = research, not novels. Skim flow matters |
| Modal "register to continue reading" interstitials | Substack pattern. Burns trust |
| Auto-play audio narration | Even if available, off by default. Surprise audio = anti-pattern |
| "Trending in your sector" sidebar | Notion pattern. Steals attention from current read |
| Recommendation cards mid-read | Medium pattern. Distracts |
| Heatmaps of "popular highlights" | Privacy concern + signals "you're being tracked" |
| Comments / discussion section | Not a community product. Email author for feedback |
| "Print this page" w/ janky CSS | Ship a real PDF download, not browser-print fallback |

---

## Performance budgets

- LCP <2.0s (lower than marketing 2.5s — reading needs fast paint)
- Cumulative Layout Shift <0.05 (chart load shouldn't push body)
- Charts lazy-load below fold (IntersectionObserver, NOT scroll listener)
- TOC: client-side, no blocking JS for scroll-spy (use IntersectionObserver)
- Theme toggle: CSS-only via `data-theme` attribute on root, no re-render

---

## Build brief template (paste into `aura-builder` spawn)

```
## Build brief for aura-builder
Surface: Report Viewer (surfaces/03)
Brand variant: editorial-light (default) + cinematic-dark toggle
Components needed:
  - <ViewerLayout> (3-zone: rail / column / rail)
  - <StickyTOC> w/ scroll-spy + bookmarks
  - <ReaderColumn> 65-75ch, 17-19px body
  - <SectionShareLinks> hover-reveal
  - <CiteBlock> APA/Harvard/Chicago/BibTeX 1-click copy
  - <ChartCard> w/ source + 3 affordances + embed
  - <ThemeToggle> persists to localStorage
  - <HighlightBar> floating on text-select (desktop)
  - <ReaderSettings> modal (size/theme/line-height)
Tokens used: --color-bg-deep, --color-text-primary, --color-accent-primary (cite buttons), --font-sans, --font-serif, --text-base (body), --text-2xl (h2)
Motion: theme toggle = 200ms opacity crossfade. Scroll-spy = no animation (instant). Highlight-bar reveal = 100ms scale-from-0.95 + opacity
States: empty (no notes), loading (skeleton matching reading column shape NOT spinner), error (reload prompt)
A11y: skip-link, ARIA on charts/toggle, focus-trap in modal, kbd nav for TOC arrow keys
Anti-pattern flags:
  - NO reader-mode strip-charts
  - NO modal "register to continue"
  - NO auto-play audio
File path: projects/<consumer-surface>/src/app/reports/[slug]/page.tsx (or new route)
```

---

## Known patterns / anti-patterns

(seeded as LEARNINGS accumulate from real builds)
