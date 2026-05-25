# SectionHeading · Atom · OG Audit

**Source:** `Design_system_vs_26 (og and final)/src/app/components/SectionHeading.tsx` (131 lines)

---

## 1. WHAT

Editorial-feel section header that composes `label` (uppercase eyebrow with optional pulse dot), main heading (h1/h2/h3 semantic), `subtitle`, and optional action slot (renders `<CTALink>`). Generous bottom margin, left/center align, max-width control.

## 2. WHY

OG JSDoc verbatim (`SectionHeading.tsx:1-10`):

> "SectionHeading — Ken Bold DS v4.0"
> "Clean section header with generous whitespace and editorial feel."
> "Supports semantic heading levels (h1/h2/h3) via `level` prop."
> "Prop-driven API: title, subtitle, label, action, slots."

- Encodes the Ken section-opener pattern: eyebrow label → serif heading → optional subtitle + CTA
- Semantic level (`level={1|2|3}`) lets one component serve hero h1, section h2, subsection h3 without re-implementing typography
- Action slot always renders a `<CTALink>` — composing the urgency-link atom in the canonical "section action" position
- `labelPulse` enables the green-dot live-indicator pattern (`SectionHeading.tsx:55-60`)
- `endSlot` + `labelEndSlot` provide controlled extension points without bloating the prop surface

## 3. WHEN to use ✅

- Every page section opening (after `<SectionWrapper>` opens, before the section's content body)
- Subsection header inside a long section (`level={3}`)
- Hero h1 when the surrounding `<SectionWrapper>` doesn't already encode the title
- Listing toolbar header with "view all" action via `action={{ text, href }}` slot
- Featured-section pattern with live indicator: `<SectionHeading label="LIVE" labelPulse ... />`

## 4. WHEN NOT to use ❌

- Heading inside a card → use raw `<h3>`/`<h4>` (Card content shouldn't trigger section-heading spacing)
- Single inline title with no eyebrow/subtitle/action → use `<h2>` directly with type tokens
- Form section divider → use `<Label>` + thin border (different semantic)
- Modal/dialog title → use `shadcn/ui Dialog.Title` (focus management)
- Hero with title overlaid on image → build a bespoke organism; SectionHeading is paragraph-flow not absolute-positioned

## 5. WHERE used

- `organisms/ResearchMethodology.tsx:31` — section header for methodology steps
- `organisms/UpcomingReports.tsx:28` — listing section
- `organisms/BrowseGrid.tsx` (transitively via `SectionWrapper`)
- `PatternsContent.tsx:1029, 1080, 1133` — pattern catalog usage
- Plus implicit usage in nearly every editorial section across the DS

## 6. HOW to implement

```tsx
// Default h2 with label + subtitle
<SectionHeading
  label="HIGHLIGHTS"
  title="Report findings"
  subtitle="Five key insights from 1,200 interviews"
/>

// With action slot (auto-CTALink)
<SectionHeading
  title="Featured Research"
  action={{ text: "View all", href: "/research" }}
/>

// Hero h1 (one per page)
<SectionHeading
  level={1}
  label="CASE STUDY"
  title="How a tier-one bank deployed AI in 90 days"
/>

// Subsection h3, centered
<SectionHeading
  level={3}
  title="Methodology"
  align="center"
  maxWidth="lg"
/>

// Live indicator
<SectionHeading
  label="LIVE NOW"
  labelPulse
  title="Trending reports"
  action={{ text: "All trending →", href: "/trending" }}
/>

// With custom end slot (e.g., ViewToggle)
<SectionHeading
  title="Reports"
  endSlot={<ViewToggle viewMode={vm} onViewModeChange={setVm} />}
/>
```

## 7. Properties

| Prop | Type | Default | Why exists |
|---|---|---|---|
| `title` | `string` | required | Heading text |
| `subtitle` | `string` | — | 2nd-line context, opacity 40% (`SectionHeading.tsx:97-103`) |
| `label` | `string` | — | Uppercase eyebrow, opacity 35%, letter-spacing 0.15em (`SectionHeading.tsx:51-62`) |
| `action` | `{ text; href?; onClick? }` | — | Renders right-aligned `<CTALink size="md">` (`SectionHeading.tsx:112-118`) |
| `spacing` | `'default' \| 'compact'` | `'default'` | `mb-10 md:mb-12` vs `mb-8 md:mb-10` — controls gap to content below (`SectionHeading.tsx:41`) |
| `align` | `'left' \| 'center'` | `'left'` | Center for hero-style or testimonial section openers (`SectionHeading.tsx:42`) |
| `maxWidth` | `'xl' \| 'lg' \| 'none'` | `'none'` | Limits heading column width — center mode forces `max-w-lg` (`SectionHeading.tsx:43-44`) |
| `level` | `1 \| 2 \| 3` | `2` | Semantic heading level — h1 hero, h2 default, h3 subsection (`SectionHeading.tsx:21`) |
| `endSlot` | `ReactNode` | — | Right-side companion (ViewToggle, filter chips) — hidden on mobile, shown sm+ (`SectionHeading.tsx:107-111`) |
| `labelEndSlot` | `ReactNode` | — | Right-side of LABEL row — mobile shows below heading (`SectionHeading.tsx:64-68, 124-128`) |
| `labelPulse` | `boolean` | — | Green animated pulse dot before label (`SectionHeading.tsx:55-60`) |
| `children` | `ReactNode` | — | Declared but **not consumed** in JSX — see Decisions |

## 8. States

Static atom — no interactive state. The `action` slot delegates state to `CTALink`. `labelPulse` runs `animate-pulse` indefinitely if enabled.

## 9. Variants

No formal `variant` prop. Visual variation through:
- `level={1|2|3}` semantic (typography stays same — only DOM element changes)
- `align={left|center}` 
- `spacing={default|compact}`
- `labelPulse` on/off

## 10. Sizes

No `size` prop. Title uses fluid clamp: `clamp(1.375rem, 3vw, 1.875rem)` (22-30px) regardless of level. (`SectionHeading.tsx:81`)

> **Smell:** semantic level changes but visual size doesn't. h1 hero looks same as h2 section. Designed deliberately for editorial consistency, but consumers needing visual h1 emphasis may be surprised.

## 11. Tokens used

- `--font-serif` — heading font (Noto Serif) (`SectionHeading.tsx:79`)
- `--font-weight-normal` (fallback 400) (`SectionHeading.tsx:80`)
- `--text-xs` — label + subtitle font size (`SectionHeading.tsx:54, 99`)
- `--green-500` — labelPulse dot color (`SectionHeading.tsx:59`)
- Inline `clamp(1.375rem, 3vw, 1.875rem)` for title — **NOT tokenized** (smell)
- Inline `tracking-[-0.01em]` heading + `tracking-[0.15em]` label — **NOT tokenized**
- Margin: `mb-10 md:mb-12` / `mb-8 md:mb-10` — Tailwind utilities, not tokens

## 12. A11y rules

- Semantic `<h1>` / `<h2>` / `<h3>` via `level` prop — screen readers announce heading level correctly
- `<p>` for label + subtitle (not heading) — correct: they're not navigable headings
- `animate-pulse` on labelPulse: **does not respect `prefers-reduced-motion`** — Tailwind's `animate-pulse` does respect it by default via Tailwind's motion-safe pattern. **Honest gap:** need to verify Tailwind v4 config.
- `endSlot` hidden on `<sm` via `hidden sm:flex` — content may be inaccessible on mobile if it's not also revealed elsewhere

## 13. Motion rules

- Static — no transitions
- `labelPulse` → `animate-pulse` (Tailwind default 2s pulse keyframe)
- Reduced-motion: deferred to Tailwind config

## 14. Anti-patterns ❌

- Never use `level={1}` more than once per page — violates h1 uniqueness
- Never pass `children` expecting it to render — the prop is declared but not used in JSX (smell — see Decisions)
- Never use without `<SectionWrapper>` for top-level sections — relies on parent for max-width + bg + padding
- Never put a `<Button>` in `endSlot` for a primary CTA — `endSlot` is hidden on mobile (`hidden sm:flex`)
- Never override the title's serif font — breaks editorial system
- Never use `labelPulse` for static content — it implies "live, updating" — misleading

## 15. REUSABILITY SCORE

**5/5 ⭐⭐⭐⭐⭐** — Used in every section across the DS. Foundational layout atom.

## 16. Linked components

- **Parent organisms:** virtually every section organism — `ResearchMethodology`, `UpcomingReports`, `BrowseGrid`, `FeaturedResearch`, `AnalystPicks`, `TrendingTopics`, etc.
- **Direct child atoms:** `CTALink` (when `action` prop set)
- **Sibling atoms:** `SectionWrapper` (encloses SectionHeading), `Badge`/`SectionLabel` (alt eyebrow style — used when SectionHeading's bare-text label is too plain)
- **Hooks involved:** none

## 17. Reasons + Decisions log

- **Why fluid clamp `1.375rem → 1.875rem` (`SectionHeading.tsx:81`):** Editorial scale stays readable on mobile (22px) and grows to 30px on desktop. Designed to fit ~6-9 word headlines without overflow.
- **Why opacity 35% for label, 40% for subtitle (`SectionHeading.tsx:52, 98`):** Visual hierarchy — label is meta (35%), subtitle is content (40%), heading is primary (100%). Tight, deliberate stepping.
- **Why `tracking-[-0.01em]` on heading (`SectionHeading.tsx:84`):** Slight negative letter-spacing for serif display fonts — counters Noto Serif's slightly loose default spacing at display size.
- **Why `tracking-[0.15em]` on label (`SectionHeading.tsx:53`):** Large letter-spacing on uppercase = editorial trade-magazine eyebrow convention.
- **Why action slot auto-renders CTALink (not a generic ReactNode) (`SectionHeading.tsx:112-118`):** Forces consistency — every section action has the same affordance shape (text + arrow). Power-users use `endSlot` for non-CTALink content.
- **Why `endSlot` hidden on `<sm` (`SectionHeading.tsx:108`):** Mobile real estate too tight for parallel content next to heading. Trade-off recorded.
- **Why `labelEndSlot` flips to mobile-below pattern (`SectionHeading.tsx:124-128`):** Mobile: stack vertically (label, heading, end-slot below). Desktop: inline. Smart-default responsive.
- **Why `labelPulse` requires green `var(--green-500)` (`SectionHeading.tsx:59`):** "Live" semantic is universally green — no other color makes sense here.
- **`children` declared but not rendered (`SectionHeading.tsx:22`):** Declared in interface but not destructured into the JSX body. Either dead code or an extension point that was never wired. **Bug / smell to flag.**
- **Why level=2 default (`SectionHeading.tsx:36`):** Most pages have ONE h1 (hero) and many h2 sections. Default reflects the majority case.
