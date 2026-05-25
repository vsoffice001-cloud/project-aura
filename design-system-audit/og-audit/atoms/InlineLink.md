# InlineLink · Atom · OG Audit

**Source:** `Design_system_vs_26 (og and final)/src/app/components/InlineLink.tsx` (86 lines)

---

## 1. WHAT

Subtle paragraph-context link for content interlinking. Black text with persistent brand-red underline. On hover: text turns red, warm-100 background highlight fades in behind the text. NO arrow, NO urgency signaling — designed for natural reading flow.

## 2. WHY

OG JSDoc verbatim (`InlineLink.tsx:1-32`):

> "InlineLink Component"
> "A subtle inline link for paragraph interlinking with brand red underline."
> "NO arrow animation - designed for natural reading flow within text content."
> "Usage Guidelines: Use within paragraphs for cross-referencing content. Always shows brand red underline. On hover: text turns red + warm-100 background appears. NO urgency signals (no arrows)"
> "Visual Behavior: Default: Black text, red underline. Hover: Red text, red underline, warm-100 background"

- The third tier in the link system (Button → CTALink → InlineLink) — increasing subtlety
- Persistent red underline = "this is a link, here" — discoverable without hover
- Warm-100 bg-on-hover = warm editorial highlighter effect — premium feel
- NO arrow because arrow implies "go somewhere external" — inline interlinks are about reference, not departure
- 5% brand red tier rule preserved: underline color is the only red, not a fill — disciplined

## 3. WHEN to use ✅

- Body paragraph cross-reference: "See our [methodology] for details"
- Inline citation: "Per the [2024 report]..."
- Footer / fine-print link: "Read our [privacy policy]"
- Knowledge-base interlinks: "Learn about [atomic design]"
- Glossary term link
- Resource references in `ResourcesContent` / `LinksDocumentation` (`LinksDocumentation.tsx:429-451`)

## 4. WHEN NOT to use ❌

- Conversion CTA → use `<Button>` (button affordance + ripple)
- Urgency-tagged link → use `<CTALink>` (text + animated arrow)
- Navigation link in nav bar → use plain `<a>` with link tokens (nav links shouldn't carry red underline)
- Card click target → use `<Card onClick>` (whole-card affordance)
- External-URL signal needed → add an external-icon next to InlineLink OR use `<CTALink>`
- Hero CTA → too subtle, won't drive conversion

## 5. WHERE used

- `LinksDocumentation.tsx:429, 431, 437, 439, 451` — docs catalog
- **Production usage:** likely in paragraph-heavy content surfaces (case-study narrative, blog posts) — not directly grep'd but well-aligned with the inline-text intent.

## 6. HOW to implement

```tsx
// Inside a paragraph
<p>
  Read our <InlineLink href="/methodology">design methodology</InlineLink> for details.
</p>

// Multiple in same paragraph
<p>
  Built on <InlineLink href="/atomic">Atomic Design principles</InlineLink> and using
  the <InlineLink href="/color">Major Third ratio (1.25)</InlineLink> for typography.
</p>

// External URL
<p>
  See the <InlineLink href="https://example.com">reference doc</InlineLink>.
</p>
```

## 7. Properties

| Prop | Type | Default | Why exists |
|---|---|---|---|
| `children` | `ReactNode` | required | Link text |
| `href` | `string` | required | Destination URL |
| `className` | `string` | `''` | Escape hatch |
| `onClick` | `() => void` | — | Click handler (passed to `<a onClick>`) (`InlineLink.tsx:38, 52`) |

API is intentionally minimal — no variants, no sizes. Subtle inline link = single use case.

## 8. States

- **Default:** Black text, red `#b01f24` underline at `bottom: -2px`, no bg (`InlineLink.tsx:57, 80-82`)
- **Hover:** Red text `#b01f24`, warm-100 bg highlight (`var(--warm-100)`) appears behind text via absolute-positioned span (`InlineLink.tsx:57, 64-71`)
- **Focus:** Browser default outline (gap — no custom focus style)
- **Active / visited:** Not styled — relies on browser default

## 9. Variants

None.

## 10. Sizes

None — text size inherits from parent.

## 11. Tokens used

- `--warm-100` — hover bg highlight (`InlineLink.tsx:68`)
- Hard-coded `#b01f24` for both text + underline — should be `var(--brand-red)` (smell)
- `tracking-[0.0875px]` — inline literal (same as Button/CTALink, should be tokenized as `--tracking-link`)
- `font-medium` — Tailwind utility

## 12. A11y rules

- Renders semantic `<a href>` — keyboard navigable
- **Gap:** No custom focus-visible ring — browser default outline (which may or may not be visible against red text on warm-100 hover bg)
- **Gap:** No `external` indicator for external URLs
- Underline always visible — fails LESS than color-only links (good)
- Color contrast: black text on white = 21:1 ✓; red `#b01f24` on warm-100 = ~4.8:1 ✓

## 13. Motion rules

- `transition-all duration-200` on `<a>` (`InlineLink.tsx:56`)
- Warm-100 bg fades in: `transition-all duration-200` on the absolute-positioned span (`InlineLink.tsx:66`)
- Both opacity AND bg-color transition simultaneously
- Uses `useShimmer(200)` hook for hover state (`InlineLink.tsx:47`) — shared timing with CTALink
- **Reduced-motion:** not explicitly respected

## 14. Anti-patterns ❌

- Never use as primary CTA — too subtle, users miss it
- Never use without `href` — onClick-only flows belong on `<Button>`
- Never override the brand-red underline — defeats discoverability
- Never use in heading text — heading + inline link = visual noise
- Never nest InlineLink inside another link
- Never use multiple-per-sentence in marketing copy — link-density fatigue
- Never use for external URLs without an external-icon companion (gap to flag)

## 15. REUSABILITY SCORE

**4/5 ⭐⭐⭐⭐** — Third tier in the link system, well-encapsulated. Used in editorial / docs content. Less broad than Button but mandatory for content surfaces.

## 16. Linked components

- **Parent:** any paragraph in editorial/docs content
- **Sibling atoms:** `<Button>` (button affordance), `<CTALink>` (text+arrow urgency)
- **Hooks involved:** `useShimmer(200)` (shared with CTALink)

## 17. Reasons + Decisions log

- **Why persistent red underline (`InlineLink.tsx:79-82`):** Discoverability — link must be visible without hover. Color alone fails a11y (color-blindness). Underline = universal "this is a link".
- **Why warm-100 bg on hover (`InlineLink.tsx:64-71`):** Warm editorial highlighter — premium feel. Matches Ken's warm editorial palette. Subtle but distinctive vs generic underline-only links.
- **Why -2px underline position (`InlineLink.tsx:82`):** Spacing between text baseline and underline. -2px = "lifted slightly" vs -0px (sits flush, looks cramped). Calibrated.
- **Why text turns red on hover (`InlineLink.tsx:57`):** Reinforces the link semantic — the entire affordance "lights up". Pulls user attention without being shouty.
- **Why warm-100 not white bg (`InlineLink.tsx:68`):** White bg highlight on white page = invisible. Warm-100 is the warmest off-white that reads as "highlighted" on both white AND warm-200 pages.
- **Why `useShimmer(200)` not 300ms like CTALink (`InlineLink.tsx:47`):** Inline link is smaller, less visual mass — faster transition matches lighter weight. 200ms = "subtle and quick".
- **Why no arrow (`InlineLink.tsx:14`):** Explicit decision — inline interlinks are about reference, not departure. Arrows imply "click to leave". Keep flow uninterrupted.
- **Why hard-coded `#b01f24` not `var(--brand-red)` (`InlineLink.tsx:57, 80`):** Token gap. Should use the var. Smell flagged.
- **Why warm-100 bg via absolutely-positioned span (`InlineLink.tsx:64-71`):** Allows the bg to extend slightly beyond text (`-mx-1 -my-0.5`) — gives the "highlighter" margin without affecting layout. Inline `<a>` can't easily do this with `padding`.
- **Why `zIndex: -1` on bg span (`InlineLink.tsx:70`):** Pushes bg behind text without affecting flow. Subtle: makes warm-100 read as a highlighter behind black text.
- **`onClick` IS destructured here (vs CTALink which doesn't) (`InlineLink.tsx:42, 52`):** Bug parity check — InlineLink actually wires onClick. Compare to CTALink.md decision log where the same prop is declared but unused. Inconsistency to flag at audit-level.
