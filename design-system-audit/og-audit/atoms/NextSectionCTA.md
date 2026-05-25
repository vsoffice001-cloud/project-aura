# NextSectionCTA · Atom · OG Audit

**Source:** `Design_system_vs_26 (og and final)/src/app/components/NextSectionCTA.tsx` (42 lines)

---

## 1. WHAT

Scroll-to-next-section affordance. Renders a centered uppercase label (e.g., "CHALLENGES") with an animated bouncing `ChevronDown` underneath. On click, smooth-scrolls to the element with the given `targetId`. Hover increases letter-spacing slightly and reveals deeper color.

## 2. WHY

No JSDoc on this file. Inferred intent from code:

- Long-scroll pages need "this isn't the end" affordance — encourages further engagement
- Section-to-section navigation pattern in case-study templates
- Centered + bouncing chevron = universally read "scroll for more"
- `darkMode` prop handles surface adaptation between cinematic-dark and editorial-light surfaces
- Uses `document.getElementById` + `scrollIntoView` — native smooth scroll, no library

## 3. WHEN to use ✅

- Between sections in case-study pages: `<NextSectionCTA targetId="challenges" label="Challenges" />`
- Editorial long-scroll content separator
- Hero-to-content transition cue: "EXPLORE"
- Mobile-first contexts where users may not know more content lies below the fold
- Replaces ambiguous "scroll for more" plain text with directional affordance

## 4. WHEN NOT to use ❌

- Cross-section nav not requiring scroll → use `<a href="#section-id">` (no animation)
- Final section / end of page — there's nothing to scroll to
- Inside a horizontal scroll context — vertical chevron is wrong direction
- Above the fold w/ no content below → broken affordance
- Navigation menu jump-to-section list → use `<TableOfContents>` (sidebar list, not section break)
- Modal-context content — `scrollIntoView` may not work as expected

## 5. WHERE used

- **Honest gap:** No grep'd direct usage in OG. Pattern is documented at template-level but consumers may be in `worked-examples/` consumers.

## 6. HOW to implement

```tsx
// Light surface, default
<section id="hero">
  ...hero content...
  <NextSectionCTA targetId="challenges" label="Challenges" />
</section>

<section id="challenges">
  ...challenges...
</section>

// Dark surface
<NextSectionCTA targetId="impact" label="Impact" darkMode />

// Common pattern: bottom of section
<SectionWrapper background="warm">
  <SectionHeading title="Methodology" />
  <div>...content...</div>
</SectionWrapper>
<NextSectionCTA targetId="results" label="Results" />
```

## 7. Properties

| Prop | Type | Default | Why exists |
|---|---|---|---|
| `targetId` | `string` | required | DOM id of the destination element (`NextSectionCTA.tsx:4`) |
| `label` | `string` | required | Uppercase text label |
| `darkMode` | `boolean` | `false` | Inverts text color (white on dark vs black on light) (`NextSectionCTA.tsx:6, 22-25`) |

Minimal API — single use case.

## 8. States

- **Default:** Label opacity 60% (dark) / 40% (light), label `var(--text-xs)`, uppercase, tracking-[2px], chevron at base position (`NextSectionCTA.tsx:23-24, 29-31`)
- **Hover (group):** Label opacity 100%, tracking-[2.5px] (subtle letter-spacing expand), chevron `translate-y-1` (`NextSectionCTA.tsx:22-25, 29, 36`)
- **Focus:** 2px ring (black on light, white on dark) with 2px offset (`NextSectionCTA.tsx:22-25`)
- **Bounce animation:** chevron `animate-bounce` always running (`NextSectionCTA.tsx:36`)

## 9. Variants

`darkMode` boolean — two visual variants (light surface / dark surface). No other variants.

## 10. Sizes

Fixed `py-8 md:py-12` outer padding, label `var(--text-xs)`, chevron `w-5 h-5`. (`NextSectionCTA.tsx:18, 30, 34`)

## 11. Tokens used

- `--text-xs` — label font (`NextSectionCTA.tsx:30`)
- `tracking-[2px]` → `tracking-[2.5px]` — inline literal — **should be tokenized** (smell)
- Tailwind primitives for color (`text-white`, `text-black`, etc.)
- `animate-bounce` Tailwind keyframe

## 12. A11y rules

- Real `<button>` — keyboard accessible
- `aria-label={\`Navigate to ${label}\`}` ✓ (`NextSectionCTA.tsx:26`)
- Focus ring explicit: `focus:outline-none focus:ring-2 focus:ring-{color} focus:ring-offset-2 focus:ring-offset-{bg}` — surface-aware focus styles ✓ (`NextSectionCTA.tsx:22-25`)
- **`animate-bounce` infinite — does not respect `prefers-reduced-motion`** (Tailwind v3 default; v4 may behave differently — verify). **Gap.**
- Smooth scroll: `scrollIntoView({ behavior: 'smooth' })` — respects `scroll-behavior: smooth` DS-level overrides? Probably falls through to native (`NextSectionCTA.tsx:12-14`)

## 13. Motion rules

- Label tracking: `group-hover:tracking-[2.5px] transition-all` (no explicit duration — Tailwind default ~150ms) (`NextSectionCTA.tsx:29`)
- Chevron translate: `group-hover:translate-y-1 transition-transform` (`NextSectionCTA.tsx:36`)
- Chevron bounce: `animate-bounce` (infinite, ~1s keyframe)
- Outer button: `transition-all duration-300` (`NextSectionCTA.tsx:21`)
- **Reduced-motion: `animate-bounce` does not auto-respect** — smell

## 14. Anti-patterns ❌

- Never use if `targetId` doesn't exist on page — silent failure, broken affordance
- Never use as primary CTA — affordance for scroll-progression, not conversion
- Never override `animate-bounce` — defeats the directional cue
- Never use in modal / dialog — scrollIntoView targets viewport, may not work
- Never duplicate within a section — only one "next section" affordance per section
- Never use above-the-fold with no content below — pointless

## 15. REUSABILITY SCORE

**3/5 ⭐⭐⭐** — Tight, well-encapsulated, single-purpose. Lower score because grep shows no direct usage and a11y has gaps.

## 16. Linked components

- **Parent:** section / page templates
- **Sibling atoms:** `<ScrollProgress>` (top-bar overview), `<ReadingProgressBar>` (case-study version), `<TableOfContents>` (sidebar nav alternative)
- **Children:** Lucide `<ChevronDown>`
- **Hooks involved:** none

## 17. Reasons + Decisions log

- **Why `tracking-[2px]` → `tracking-[2.5px]` letter-spacing expand on hover (`NextSectionCTA.tsx:29`):** Subtle "the label is alive" hover signal. Letter-spacing expand reads as "uppercase invitation" — same trick used by luxury brand UX.
- **Why centered + chevron-below layout (`NextSectionCTA.tsx:21, 32-37`):** Universal "scroll down" affordance. Text on top, arrow below = "go this way".
- **Why `animate-bounce` not `animate-pulse` (`NextSectionCTA.tsx:36`):** Bounce implies vertical motion = aligned with chevron's directional meaning. Pulse would be ambiguous.
- **Why `darkMode` boolean not `surface` enum (`NextSectionCTA.tsx:6`):** Only 2 surface contexts matter here — light page or dark CTA. Binary suffices.
- **Why focus ring `ring-offset-{bg}` per mode (`NextSectionCTA.tsx:22-25`):** Focus ring needs offset from element edge; offset color must match surface bg or it looks like a chunky border. Surface-aware.
- **Why `py-8 md:py-12` outer padding (`NextSectionCTA.tsx:18`):** Generous vertical breathing room — affordance lives BETWEEN sections, needs space to feel like a divider/transition, not a button.
- **Why `font-medium` + uppercase (`NextSectionCTA.tsx:29`):** Trade-mag uppercase eyebrow convention. Medium weight = readable but not shouty.
- **Why `strokeWidth={1.5}` on chevron (`NextSectionCTA.tsx:35`):** Thinner stroke than default 2 — feels elegant, not chunky. Matches editorial tone.
- **Why no `as` prop:** Always a button (semantically click-to-scroll). No reason to render as link.
- **`animate-bounce` no reduced-motion check (smell):** Should wrap with `motion-safe:animate-bounce` to respect user pref. Bug to fix.
- **No JSDoc (gap):** Only atom without documentation comment. Should be added for designer/dev clarity.
