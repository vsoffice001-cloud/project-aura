# CTABanner — Organism Audit (OG)

**Source:** `Design_system_vs_26 (og and final)/src/app/components/organisms/CTABanner.tsx` (79 LOC)
**Reuse tier:** ⭐⭐⭐⭐⭐ (5/5) — used as Zone 7 of every ProductPageTemplate · model slot-based CTA banner
**Status:** Well-shaped · documented intent · port-ready

---

## 1. WHAT

Reusable bottom-of-page CTA section. Centered SectionHeading + primary/secondary button pair on a configurable background (black/white/warm). Per OG JSDoc verbatim (L1–8): *"Reusable bottom CTA section for Product pages. Centered layout with SectionHeading + primary/secondary button pair. Structure: SectionWrapper(black) → SectionHeading(center) → Button row"*

---

## 2. WHY

- Every product/listing page needs a final conversion moment — CTABanner is the canonical exit-call
- Centered layout = unambiguous focus point at scroll terminus
- Primary + secondary pair = 1 strong CTA + 1 alternate path (typical: "Talk to analyst" + "Browse all reports")
- Background-configurable = adapts to bg-alternation rule (penultimate-section determines CTABanner bg choice)
- Slot for `children` = lets consumer drop a fine-print / trust-badges / micro-link beneath the button pair

---

## 3. WHEN to use ✅

- Bottom of any Product page (Report Store · Surveys · catalogs)
- Bottom of marketing landing pages
- Bottom of pricing pages (paired w/ trust footer)
- Final-conversion moment of long-form content

---

## 4. WHEN NOT to use ❌

- Mid-page CTA → use `<Button>` directly inline or `<InlineCTA>` molecule (n/a in OG · gap)
- Case-study bottom → use `FinalCTASection.tsx` (different layout · light surface · ContactModal trigger)
- Side-bar lead-capture → use `LeadCaptureCard` (n/a · gap)
- Sticky bottom-bar CTA → use `StickyCTA.tsx`

---

## 5. WHERE used (consumer file:line)

- `Design_system_vs_26.../src/app/components/organisms/ProductPageTemplate.tsx:90` — Zone 8 (final CTA)
- `Design_system_vs_26.../src/app/components/organisms/CustomResearchCTA.tsx:19–28` — RS-specific wrapper using CTA_CONFIG
- `projects/report-store-legacy/src/app/components/CustomResearchCTA.tsx` — port
- `projects/competition-benchmarking-listing-v02/src/app/components/BenchmarkCustomResearchCTA.tsx` — port (renamed)

---

## 6. HOW to implement

```tsx
import { CTABanner } from '@/app/components/organisms';
import { ArrowRight } from 'lucide-react';

// Default (black surface · primary + secondary)
<CTABanner
  label="Get started"
  title="Talk to a Ken Research analyst"
  subtitle="Free 30-min strategy call · no commitment."
  primaryText="Book a call"
  primaryShowArrow
  secondaryText="Browse all reports"
  onPrimaryClick={() => openBookingModal()}
  onSecondaryClick={() => router.push('/reports')}
/>

// Warm surface (bg-alternation alt)
<CTABanner
  background="warm"
  label="Custom research"
  title="Need something off-shelf?"
  subtitle="We build bespoke reports — 4-6 week turnaround."
  primaryText="Request scope"
  primaryIcon={<Mail size={16} />}
  onPrimaryClick={handleScope}
/>

// White surface · single CTA · w/ trust block child
<CTABanner
  background="white"
  label="Subscribe"
  title="Quarterly market signals · free"
  primaryText="Subscribe"
  primaryShowArrow
>
  <p className="text-xs text-black/40">No spam · unsubscribe anytime · 12k+ subscribers.</p>
</CTABanner>
```

---

## 7. Composition tree

```
CTABanner
└─ SectionWrapper (background={background} · spacing="lg" · maxWidth="wide")  (L56)
   └─ inner wrapper (max-w-1000px · mx-auto · px-4/6/8 · text-center)  (L57)
      ├─ SectionHeading (label · title · subtitle · align=center · level=2)  (L58–64)
      ├─ Button row (mt-8 · flex justify-center · gap-4)  (L65)
      │  ├─ <Button variant="primary" size="lg" icon? showArrow?>{primaryText}</Button>
      │  └─ <Button variant="secondary" size="lg">{secondaryText}</Button>  (conditional)
      └─ {children} (L75 · conditional · mt-6)
```

**Atoms:** `SectionWrapper` · `SectionHeading` · `Button`
**No hooks · no state**

---

## 8. Properties · WHY each exists

| Prop | Type | Default | Why |
|---|---|---|---|
| label | string (required) | — | SectionHeading kicker — section identity |
| title | string (required) | — | H2 — the ask |
| subtitle | string? | — | Optional context line under title |
| primaryText | string (required) | — | Primary CTA label |
| primaryIcon | ReactNode? | — | Icon prefix on primary Button |
| primaryShowArrow | boolean | false | Adds AnimatedArrow suffix on primary (signature interaction) |
| secondaryText | string? | — | If omitted · only primary renders (single-CTA mode) |
| background | 'black' \| 'white' \| 'warm' | 'black' | Bg-alternation match · 3 surface options |
| onPrimaryClick | () => void | — | Handler — required for non-link CTAs |
| onSecondaryClick | () => void | — | Handler for secondary |
| children | ReactNode? | — | Slot for trust-badge / fine-print / extra micro-link |
| className | string? | — | Wrapper override |

**Note:** No `href` props — pure click-handler model. For `<a>`-based CTAs, wrap in `<Link>` externally (Next.js pattern).

---

## 9. Data contract

```ts
export interface CTABannerProps {
  label: string;
  title: string;
  subtitle?: string;
  primaryText: string;
  primaryIcon?: ReactNode;
  primaryShowArrow?: boolean;
  secondaryText?: string;
  background?: 'black' | 'white' | 'warm';
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  children?: ReactNode;
  className?: string;
}
```

**Adapter pattern (CustomResearchCTA.tsx:17–29):**

```ts
// data.ts
export const CTA_CONFIG = {
  label: 'Custom Research',
  title: 'Need something off-shelf?',
  subtitle: '...',
  primaryText: 'Request a custom scope',
  secondaryText: 'Browse all reports',
} as const;

// CustomResearchCTA.tsx
export function CustomResearchCTA({ onPrimaryClick, onSecondaryClick }) {
  return (
    <CTABanner
      {...CTA_CONFIG}
      primaryShowArrow
      onPrimaryClick={onPrimaryClick}
      onSecondaryClick={onSecondaryClick}
    />
  );
}
```

Consumer responsibility: copy + handlers · DS owns layout / surface / button styling / spacing.

---

## 10. States

- **Default:** rendered centered banner · 2 buttons (or 1 if no secondary)
- **Primary hover:** Button atom handles (shimmer · scale · bg-shift)
- **Secondary hover:** Button atom handles
- **Primary loading:** ❌ no loading prop — consumer wraps externally
- **Disabled (during submit):** ❌ no disabled prop
- **No secondary:** Button row renders single Button (conditional at L69–73)
- **No children:** children block not rendered (conditional at L75)

---

## 11. Variants

By `background` prop:
1. **black (default)** — cinematic-dark CTA at scroll terminus · brand impression close
2. **warm** — editorial-warm beige (Reading mode) · matches case-study tone
3. **white** — clean white · matches listings · low-emphasis CTA contexts

By CTA-count:
- 2-button (default · primary + secondary)
- 1-button (omit secondaryText)

By icon-presence:
- primary w/ icon (use primaryIcon)
- primary w/ arrow (use primaryShowArrow=true)
- primary plain (default)

---

## 12. Responsive behavior

- Padding scales: `px-4 sm:px-6 md:px-8` (L57)
- Button row: `flex justify-center gap-4` (L65) — **no mobile stacking** (anti-pattern · long button labels will overflow)
- Max-width 1000px (L57) — content cap
- SectionWrapper handles vertical rhythm (`spacing="lg"`)

**Gap:** `flex-col sm:flex-row` on button row is the standard pattern (see FinalCTASection.tsx:24) but CTABanner does NOT do this — buttons stay side-by-side at all breakpoints. Mobile bug.

---

## 13. Tokens used

✅ Inherited through SectionWrapper (background, spacing, maxWidth · all token-mapped at SectionWrapper level)
✅ SectionHeading uses internal token system (level=2 → H2 token sizing)
✅ Button atom uses --button-* tokens internally
⚠️ `mt-8` and `mt-6` raw Tailwind spacing — should be `--space-banner-row` / `--space-banner-fineprint`
⚠️ `gap-4` raw — should be `--space-cta-button-gap`

---

## 14. A11y rules

✅ SectionHeading produces semantic H2 (level=2)
✅ Buttons are real `<Button>` atoms (keyboard accessible by inheritance)
✅ `text-center` on container is purely visual · doesn't break semantics
✅ SectionWrapper provides landmark

❌ No `aria-label` on button row group — screen readers see two unconnected buttons
❌ Children block has no semantic role — if used for fine-print, should be `<p>` w/ explicit text
❌ Color contrast on warm/white surface secondary button — depends on Button atom (deferred to atom audit)

---

## 15. Motion rules

- Primary Button: shimmer animation (Button atom's brand-locked interaction) — runs on hover
- Primary `showArrow`: AnimatedArrow slides right on hover (signature interaction · Button + AnimatedArrow atoms)
- Secondary Button: hover bg-shift only
- No section-level entrance animation (relies on parent FadeInSection if wanted)
- **Reduced-motion:** inherited from Button atom (Button respects `prefers-reduced-motion`)

---

## 16. Anti-patterns ❌

- ❌ Button row doesn't stack on mobile — `gap-4` w/ `flex justify-center` overflows when both labels are long
- ❌ No `disabled` / `loading` state on primary — async actions (e.g. submit) can't be visually represented at this layer
- ❌ Hard-coded `mt-8` and `mt-6` — should be tokenized
- ❌ Always centered — no `align` prop for left-aligned CTA banner (matches some marketing patterns)
- ❌ No `<form>` wrapping for keyboard Enter-to-submit pattern

---

## 17. REUSABILITY SCORE

**5/5 ⭐⭐⭐⭐⭐** — true cross-pillar slot-based banner. Used by `ProductPageTemplate` Zone 8 + wrapped by `CustomResearchCTA`. Background-variant + slot children = handles 90% of CTA-banner needs.

---

## 18. Linked components

- **Parent:** `ProductPageTemplate` (Zone 8)
- **Wrappers:** `CustomResearchCTA` (RS) · `BenchmarkCustomResearchCTA` (Competition Benchmarking · in projects/)
- **Sibling (alternative bottom-CTA):** `FinalCTASection` (case-study only · different layout · has ContactModal)
- **Atoms:** `SectionWrapper` · `SectionHeading` · `Button` · `AnimatedArrow` (via Button's showArrow prop)
- **Companion organism:** `StickyCTA` (floats while CTABanner is in viewport · usually dismisses on intersection)

---

## 19. Composition rule (in a page recipe)

**ProductPageTemplate order (L65–93):**

```
Zone 1: ProductHero
Zone 2: FeaturedCarousel
Zone 3: StatsRow (optional)
Zone 4: afterStats
Zone 5: BrowseGrid
Zone 6: afterBrowse
Zone 7: beforeCta
Zone 8: CTABanner          ← ALWAYS last in template
```

**Before:** any organism · usually `beforeCta` slot or `BrowseGrid`
**After:** typically `Footer` (n/a in OG · gap) or end-of-page
**Bg-alternation:** if penultimate section is white → CTABanner=black (typical) · if penultimate is warm → CTABanner=black still works (warm→black is strongest contrast close).

---

## 20. Reasons + Decisions log

- **Why centered layout?** Conversion-moment focal — peripheral copy compresses attention to the button. Per F-pattern reading studies + CRO heuristics.
- **Why primary + secondary not 1 + dismiss?** Always offer alternate path · "either book a call OR browse more" reduces decision-paralysis exit. Bounce-back.
- **Why `showArrow` only on primary?** Brand-signature interaction reserved for the primary action · secondary stays subtle. Per OG Button atom contract.
- **Why background prop only 3 values?** Three brand surfaces: cinematic-dark (black), editorial-warm (warm), neutral (white). Anything else = off-brand.
- **Why no `tertiaryText`?** Three CTAs = decision-paralysis. Hard-cap at 2.
- **Why `spacing="lg"` not xl?** Hero is xl · CTABanner is lg — visual rhythm: open big, close strong-but-not-largest.
- **Why `maxWidth="wide"` then inner 1000px?** SectionWrapper provides outer breathing room (page-gutter), inner cap = readability line-length. Consistent w/ ProductHero, FeaturedCarousel, etc.
- **Why no `href` prop?** Click-handler model fits Next.js Link pattern · wrap with Link externally → use `onClick`. Keeps Button atom agnostic of routing layer.
- **Why optional subtitle?** Single-line title CTAs work (e.g. "Book a call") · subtitle is context-add. Default-off prevents redundant prose.

---

**Audit conclusion:** Best-shaped CTA banner organism in OG. Port to core-v2 verbatim · two fixes needed: (1) mobile button stacking via `flex-col sm:flex-row` · (2) tokenize `mt-8`/`mt-6` spacing. After fixes → 5/5 perfect.
