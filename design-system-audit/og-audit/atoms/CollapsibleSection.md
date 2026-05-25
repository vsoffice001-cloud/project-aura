# CollapsibleSection · Atom · OG Audit

**Source:** `Design_system_vs_26 (og and final)/src/app/components/CollapsibleSection.tsx` (54 lines)

---

## 1. WHAT

Expandable/collapsible content section. Bordered 10px rounded white container with header (title + optional subtitle + chevron toggle) and body that mounts/unmounts on click. Default `isOpen=true`.

## 2. WHY

OG JSDoc (`CollapsibleSection.tsx:1-5`): "Expandable/collapsible content section with smooth animation"

- Docs/FAQ-style sections where reader self-selects depth
- Token catalog pages — group dozens of tokens behind collapsible headers
- Reduces visual overwhelm on dense reference pages
- Default-open keeps content accessible while still toggleable
- Note: JSDoc says "smooth animation" but body simply mounts/unmounts (no height transition) — **honest gap**

## 3. WHEN to use ✅

- Token catalog group ("Color tokens", "Spacing tokens", etc.)
- FAQ accordion in resource pages
- Settings group ("Advanced options")
- Long-form documentation chunked into expandable subsections
- Pattern catalog "show details" toggle

## 4. WHEN NOT to use ❌

- Form accordion w/ validation → use `shadcn/ui Accordion` (more a11y features, controlled state mgmt)
- Interactive UI panel with state persistence → use bespoke organism w/ localStorage
- Mobile filter sheet → use `<FilterAccordion>` molecule (specialized for filter group pattern)
- Multi-step wizard step disclosure → use a dedicated stepper component
- Tooltip-style hover-reveal → use `<Tooltip>`

## 5. WHERE used

- **Honest gap:** No grep'd direct usage. Likely under-used or replaced by `shadcn/ui Accordion` in active surfaces.

## 6. HOW to implement

```tsx
// Default open
<CollapsibleSection title="Color tokens">
  <TokenList items={colorTokens} />
</CollapsibleSection>

// Start collapsed with subtitle
<CollapsibleSection
  title="Advanced settings"
  subtitle="Optional configuration for power users"
  defaultOpen={false}
>
  ...
</CollapsibleSection>
```

## 7. Properties

| Prop | Type | Default | Why exists |
|---|---|---|---|
| `title` | `string` | required | Header heading text (rendered as `<h4>`) |
| `subtitle` | `string` | — | Optional 2nd-line context (`CollapsibleSection.tsx:34-36`) |
| `defaultOpen` | `boolean` | `true` | Default expanded — content visible by default supports discoverability (`CollapsibleSection.tsx:13`) |
| `children` | `ReactNode` | required | Collapsible body |

No `onChange` callback exposed — state is fully internal. (Smell: parent can't observe state.)

## 8. States

- **Open:** Header bg neutral, chevron rotated 180° (`CollapsibleSection.tsx:40`), body visible with `border-t` (`CollapsibleSection.tsx:46-50`)
- **Closed:** Body unmounted, chevron at 0°
- **Hover (header):** `hover:bg-black/[0.02]` subtle tint (`CollapsibleSection.tsx:30`)
- **No focus / disabled state** — relies on native `<button>` focus

## 9. Variants

None.

## 10. Sizes

Fixed: header `px-6 py-4`, body `px-6 py-6`. Heading `text-lg` (`CollapsibleSection.tsx:33`).

## 11. Tokens used

- None — Tailwind utility-driven: `border border-black/10`, `bg-white`, `rounded-[10px]`, etc.
- `rounded-[10px]` — matches `--rc-radius-card` (10px) but hard-coded
- `text-lg` (18px) heading, `text-sm` (14px) subtitle, `text-black/60` subtitle

## 12. A11y rules

- Header `<button>` — keyboard reachable
- **Gap:** No `aria-expanded` on toggle button
- **Gap:** No `aria-controls` linking button → body
- **Gap:** No `id` on body for ARIA association
- Body mount/unmount — content disappears from DOM on collapse (better than `display:none` for AT, but transition feels abrupt)
- Heading `<h4>` is fixed — may not match doc heading hierarchy (smell)

## 13. Motion rules

- Chevron rotation: `transition-transform` (no explicit duration — Tailwind default ~150ms) (`CollapsibleSection.tsx:39`)
- Header hover bg: `transition-colors` (`CollapsibleSection.tsx:30`)
- **Body mount/unmount: INSTANT, no animation** despite JSDoc claim — **smell**
- Reduced-motion: implicitly respected (no animations on body)

## 14. Anti-patterns ❌

- Never nest `<CollapsibleSection>` inside another — visual depth becomes confusing
- Never use for content that must be available to crawlers / AT users without interaction — they may not expand
- Never use without `title` — header is the only collapse trigger
- Never override `rounded-[10px]` — DS surface radius rule
- Never assume `<h4>` matches your doc hierarchy — if your page has h1 → h2 → h3, a CollapsibleSection at "h3-equivalent" position breaks semantics
- Never assume smooth animation per JSDoc — body actually snaps

## 15. REUSABILITY SCORE

**2/5 ⭐⭐** — Tight purpose; no observed call sites in grep; missing key a11y attributes; missing the animation it claims. Lower-tier atom.

## 16. Linked components

- **Parent:** docs pages (potential)
- **Sibling atoms:** `<FilterSectionHeader>` (collapse trigger for filter groups — has the a11y attrs CollapsibleSection lacks), `shadcn/ui Accordion` (more complete alternative)
- **Hooks involved:** none — internal `useState`

## 17. Reasons + Decisions log

- **Why `<h4>` hard-coded (`CollapsibleSection.tsx:33`):** Assumption that CollapsibleSection sits within an h3 section context. Doesn't generalize — should accept `headingLevel` prop.
- **Why `defaultOpen=true` (`CollapsibleSection.tsx:13`):** Discoverability first. Closed-by-default risks users missing content. Editorial bias toward "show, don't hide".
- **Why `text-lg` heading (`CollapsibleSection.tsx:33`):** Larger than body so the toggle target is visually anchored, but smaller than `<SectionHeading>` (~22-30px) so it doesn't compete.
- **Why border + rounded surface (`CollapsibleSection.tsx:26`):** Defines the collapsible as a distinct "card-like" zone — visual containment improves comprehension.
- **Why mount/unmount instead of `hidden` (`CollapsibleSection.tsx:46`):** Better AT behavior — collapsed content isn't read. Trade-off: animation impossible without measuring height first.
- **No `onChange` callback (smell):** Decision: fully encapsulated state. Trade-off: parent can't sync (e.g., "expand all").
- **Missing a11y attrs (gap):** `aria-expanded`, `aria-controls`, `aria-labelledby` should all be added — standard accordion pattern.
- **JSDoc says "smooth animation" but implementation snaps (smell):** Aspirational JSDoc. Either remove claim or add Framer Motion AnimatePresence wrapper with measured-height.
- **Why `<ChevronDown>` rotates 180° not swaps to `<ChevronUp>` (`CollapsibleSection.tsx:38-42`):** Rotation is GPU-cheap + animation-friendly. Swap would need conditional render = no transition.
