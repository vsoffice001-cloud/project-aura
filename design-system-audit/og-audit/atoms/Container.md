# Container · Atom · OG Audit

**Source:** `Design_system_vs_26 (og and final)/src/app/components/Container.tsx` (66 lines)

---

## 1. WHAT

Width-constraint wrapper. Renders a `<div>` with `mx-auto px-4 sm:px-6 md:px-8` plus a `max-width` from the 5-tier hierarchy (page 1200 / content 1000 / narrow 900 / prose 700 / compact 600). Used inside full-bleed sections where the caller owns the bg + vertical padding but wants Ken's standard content-width.

## 2. WHY

OG JSDoc verbatim (`Container.tsx:1-34`):

> "WHY: Consistent content width constraints ensure optimal readability and visual rhythm. Centralizes the responsive padding + max-width pattern used across all case study sections."
> "WHAT: A semantic wrapper that applies --container-content (1000px) max-width, centers content, and adds responsive horizontal padding."
> "WHEN: Use in ALL case study page sections. Use in any full-width section that needs centered, constrained content"
> "WHEN NOT: Don't use for full-bleed backgrounds (wrap section around Container instead). Don't nest Containers"
> "CONTAINER WIDTH HIERARCHY (from theme.css): --container-page: 1200px — Full page shell, heros, nav. --container-content: 1000px — Standard sections, card grids (DEFAULT). --container-narrow: 900px — CTAs, testimonials, focused content. --container-prose: 700px — Long-form text, optimal line length. --container-compact: 600px — Short descriptions, methodology text"

- Encodes the 5-tier width hierarchy as enum, not magic numbers
- Token-driven (`var(--container-*)`) so the system can be retuned in one place
- Pairs with `<SectionWrapper>` — SectionWrapper handles bg + vertical padding; Container handles width
- Responsive padding `px-4 sm:px-6 md:px-8` baked in — no inline drift
- Default `content` (1000px) covers the majority case

## 3. WHEN to use ✅

- Inside a `<section className="bg-black">` where caller wants to own the bg
- Hero region needing the full 1200px page-width
- Testimonial / focused-CTA section needing `narrow` (900px)
- Long-form prose section needing `prose` (700px optimal line length)
- Methodology description needing `compact` (600px short-form)
- Any custom layout where SectionWrapper's enum (5 backgrounds) doesn't fit

## 4. WHEN NOT to use ❌

- Top-level section with bg → use `<SectionWrapper>` (handles bg, vertical padding, AND width)
- Card-level content → use `<Card>` (different surface system)
- Full-bleed image / video → don't constrain
- Nested inside another Container → double padding + double max-width
- Fixed-width sidebar — use grid or flex layout, Container is centered-only

## 5. WHERE used

- `ResourcesSection.tsx:417` — `<Container className="relative z-10">`
- `PatternsContent.tsx:125, 138, 153, 1028, 1079, 1130` — pattern catalog usage
- Note: usages use `width="content"` syntax in PatternsContent JSX — but the prop is named `maxWidth`. **Smell:** docs may be out of sync with implementation. (`Container.tsx:41`)

## 6. HOW to implement

```tsx
// Default 1000px content width
<Container>
  <h2>Section title</h2>
</Container>

// Inside a full-bleed dark section
<section className="bg-black text-white py-20">
  <Container className="relative z-10">
    <h2>Title</h2>
  </Container>
</section>

// Narrow CTA-focused section
<Container maxWidth="narrow">
  <p>One sentence. Centered. Calls user to action.</p>
</Container>

// Long-form prose
<Container maxWidth="prose">
  <article>...700px optimal line length...</article>
</Container>

// Full page-shell width
<Container maxWidth="page">
  <Navbar />
</Container>
```

## 7. Properties

| Prop | Type | Default | Why exists |
|---|---|---|---|
| `children` | `ReactNode` | required | Content |
| `className` | `string` | `''` | Escape hatch — appended after the auto-classes (`Container.tsx:59`) |
| `maxWidth` | `'page' \| 'content' \| 'narrow' \| 'prose' \| 'compact'` | `'content'` | 5-tier hierarchy maps to CSS vars in theme.css (`Container.tsx:41`) |

## 8. States

Pure presentational — no state.

## 9. Variants

5 width tiers via `maxWidth` enum (see Sizes section).

## 10. Sizes

| `maxWidth` | Value (via theme.css) | Use for |
|---|---|---|
| `page` | `--container-page` 1200px | Full page shell, hero, nav |
| `content` | `--container-content` 1000px | DEFAULT — sections, card grids |
| `narrow` | `--container-narrow` 900px | CTAs, testimonials, focused |
| `prose` | `--container-prose` 700px | Long-form text, optimal line length |
| `compact` | `--container-compact` 600px | Short descriptions, methodology |

(All values from `Container.tsx:29-33` JSDoc.)

## 11. Tokens used

- `--container-page` (1200px)
- `--container-content` (1000px)
- `--container-narrow` (900px)
- `--container-prose` (700px)
- `--container-compact` (600px)
- Tailwind `px-4 sm:px-6 md:px-8` for horizontal padding — **NOT tokenized**

## 12. A11y rules

- Renders generic `<div>` — no semantic landmark (relies on parent `<section>` / `<main>` / `<article>` for landmark structure)
- No ARIA props exposed
- Padding ensures touch-edge content has breathing room (16/24/32px progressive)

## 13. Motion rules

Static — no transitions.

## 14. Anti-patterns ❌

- Never nest Containers — double padding + double max-width = visually compressed
- Never use for full-bleed backgrounds — wrap the section AROUND the Container instead (per JSDoc `Container.tsx:17`)
- Never override max-width via style — defeats token-driven hierarchy
- Never use `maxWidth="page"` for content — 1200px hurts readability for body text
- Never use as a card surface — Container has no bg, no border, no shadow
- Never confuse with `<SectionWrapper>` — Container is INSIDE a section, not a section itself

## 15. REUSABILITY SCORE

**4/5 ⭐⭐⭐⭐** — Foundational layout primitive. Slightly less reuse than `SectionWrapper` (which handles bg too), but indispensable for custom-bg sections.

## 16. Linked components

- **Parent:** custom-bg `<section>` elements (when SectionWrapper's 5-bg enum doesn't fit)
- **Sibling atoms:** `<SectionWrapper>` (bg + vertical padding + max-width all together)
- **Hooks involved:** none

## 17. Reasons + Decisions log

- **Why 5 tiers not 3 (`Container.tsx:29-33`):** Empirical — Ken's editorial layouts need both 1000 (cards), 900 (testimonial), 700 (prose), AND 600 (methodology). Collapsing to 3 forced drift.
- **Why `content` (1000) default:** Majority case is card-grid sections — designed for 12-col responsive at desktop with optimal 3-col grid behavior.
- **Why 700px for prose (`Container.tsx:32`):** Optimal line length for body text is ~60-75 characters; at 16px base font that's ~600-700px. 700 is the Ken anchor.
- **Why responsive padding `px-4 sm:px-6 md:px-8` (`Container.tsx:59`):** Mobile (16px) → tablet (24px) → desktop (32px). Edges feel "tighter" on small screens, more "breathing" on big screens.
- **Why expose `maxWidth` as prop not slot (`Container.tsx:41`):** Enum is finite and decision-laden. Slot would invite freeform width values = drift.
- **Why CSS vars not hardcoded px (`Container.tsx:45-49`):** System-level retune — change theme.css once, every Container updates.
- **Doc inconsistency: `PatternsContent.tsx` uses `width=` prop but Container declares `maxWidth=` (smell):** Either patterns are showing aspirational future API or someone renamed without propagating. **Bug to flag.**
- **Why no `as` semantic prop:** Container is positioning-only — semantics come from parent `<section>` / `<main>` / `<article>`. Adding `as` would invite duplicate landmarks.
- **Why no inline `style` override exposed:** Forces consumers to use `className` (Tailwind utility-class layer) — keeps style debugging in one mental model.
