# HeroSection — Organism Audit (OG)

**Source:** `Design_system_vs_26 (og and final)/src/app/components/HeroSection.tsx` (76 LOC)
**Reuse tier:** ⭐⭐⭐⭐☆ (4/5) — case-study hero · cross-engagement pattern
**Status:** Single-purpose hero · hard-coded content · production-shipped pattern · refactor target for prop-lifting

---

## 1. WHAT

Black-surface editorial hero for **case-study** pages. Renders editorial label ("Case Study") + serif H1 title + 4-card meta grid (Client · Industry · Geography · Engagement Owner) + scroll-cue CTA. Distinct from ProductHero (search-led black hero) — this is narrative-led, meta-anchored hero (HeroSection.tsx:11–74).

---

## 2. WHY

- Case studies need to ground the reader in "who · what · where · who-led" before narrative begins — 4-card meta grid is that contract
- Editorial-light voice but on cinematic-dark surface = signature Ken case-study look (per `design-system/DESIGN.md` cinematic case-study variant)
- Serif H1 + light weight + clamp font-size = brand display typography · `Noto Serif` cited in tokens
- Scroll-cue CTA (bouncing ChevronDown) = explicit "scroll for more" affordance — long case-studies hide depth, this signals it
- Hero must declare itself the start of the narrative (via `#client-context` scroll target · L7) — bridges to next section

---

## 3. WHEN to use ✅

- Top of every case-study page (template-v3 · template-v28 · future case-studies)
- Engagement deep-dives (where Client/Industry/Geography/Owner are the framing)
- Project showcases w/ tabular metadata
- Cinematic-dark surface required (do not light-mode this)

---

## 4. WHEN NOT to use ❌

- Product/catalog pages → use `ProductHero` (search-led)
- Listing pages → use `ProductHero` or no hero
- Marketing landing pages → use larger editorial hero (cinematic w/ video bg · not built yet)
- Light-surface contexts → no light variant exists · use bespoke
- When meta isn't 4 dimensions → currently locks to 4 cards (Client/Industry/Geo/Owner) — fork for 3 or 5 dimensions

---

## 5. WHERE used (consumer file:line)

- `projects/casestudy-templates/template-v3/` — primary consumer
- `projects/casestudy-templates/template-v28/` — primary consumer
- `Design_system_vs_26.../src/app/components/HeroSection.tsx` — DS reference build
- Worked-example: `design-system-audit/worked-examples/v0-lite-report-legacy/` (legacy pre-port)

---

## 6. HOW to implement

OG is **zero-prop** (anti-pattern · all content hard-coded):

```tsx
import { HeroSection } from '@/app/components/HeroSection';

// OG usage — no props · all content baked in
<section id="hero">  {/* MUST have id for Navbar useHeroVisibility */}
  <HeroSection />
</section>
```

**Recommended porting shape:**

```tsx
<HeroSection
  label="Case Study"
  title="Evaluating India's Transformer Bushing Market for IPO Readiness — ₹110 Cr TAM and Competitive Positioning Insights"
  meta={[
    { label: 'Client', value: 'Yash Highvoltage Insulators' },
    { label: 'Industry', value: 'Power Transmission • Electrical Equipment • Grid Infrastructure' },
    { label: 'Geography', value: 'India' },
    { label: 'Engagement Owner', value: 'Director – Strategy' },
  ]}
  scrollTarget="client-context"
  scrollCueLabel="Explore the Case Study"
/>
```

---

## 7. Composition tree

```
HeroSection (<section>)
├─ Grid overlay (linear-gradient 50px × 50px · opacity 0.02 · L13)
└─ Inner container (max-w-container-content · L16)
   ├─ Editorial label ("Case Study" · uppercase tracking-3px · L18–20)
   ├─ <h1> serif title (clamp font · light weight · tracking-tight · L23–25)
   ├─ Meta grid (1/2/4 cols responsive · L28–52)
   │  ├─ Client card  (label + value · bg-white/5 · backdrop-blur-sm · L30–33)
   │  ├─ Industry card (L36–39)
   │  ├─ Geography card (L42–45)
   │  └─ Engagement Owner card (L48–51)
   └─ Scroll-cue button (group · ChevronDown · animate-bounce · L55–72)
```

**Atoms used:** none from DS (raw HTML + Tailwind)
**Icons:** `lucide-react/ChevronDown` + unused imports `TrendingUp, Handshake, Zap, MapPin` (L1 · dead-code)
**Hooks:** none

---

## 8. Properties · WHY each exists

**OG: zero props.** All content hard-coded.

Implicit hard-coded values that should be props:

| Implicit | Value (L#) | Should be prop |
|---|---|---|
| label | "Case Study" (L19) | label?: string |
| title | full string (L24) | title: string (required) |
| meta[].label & value | 4 cards (L31–51) | meta: { label, value }[] |
| scrollTarget | "client-context" (L6) | scrollTargetId?: string |
| scrollCueLabel | "Explore the Case Study" (L65) | scrollCueLabel?: string |
| grid columns | locked to 4 at lg (L28) | columns?: 1 \| 2 \| 3 \| 4 |
| ariaLabel for cue | "Navigate to Explore the Case Study" (L59) | derive from scrollCueLabel |

---

## 9. Data contract

```ts
export interface HeroSectionProps {
  label?: string;                                    // default 'Case Study'
  title: string;                                     // required
  meta: { label: string; value: string }[];          // 3–5 items typical
  scrollTargetId?: string;                           // default 'client-context'
  scrollCueLabel?: string;                           // default 'Explore the Case Study'
  className?: string;
}
```

Consumer responsibility: provide title + meta array · DS owns surface, typography, scroll behavior.

---

## 10. States

- **Default:** rendered hero · cards static
- **Card hover:** bg/10 + 300ms transition (L30 `hover:bg-white/10 transition-all duration-300`)
- **Scroll-cue hover:** tracking expands 2px→2.5px (L62) · arrow translates `translate-y-1` · text white/60→white
- **Scroll-cue active (click):** smooth-scroll to `#client-context` (L7–9)
- **Focus on cue:** white ring + black offset (L58)
- **Loading / empty / error:** none (static content)

---

## 11. Variants

**OG: single variant.** Only black-surface + 4-card meta + bottom scroll-cue.

Gaps:
- ❌ 3-card variant
- ❌ Side-image variant
- ❌ Stat-augmented hero (e.g. "₹110 Cr TAM" as stat block)
- ❌ Light-surface editorial variant (theme inversion)
- ❌ Video-backdrop variant

---

## 12. Responsive behavior

- **`<sm`:** padding `py-12` · `px-4` · h1 clamp scales down · meta grid `grid-cols-1` (stacked)
- **`sm`–`md`:** `py-14` · `px-6` · meta `grid-cols-2` (2×2 cards)
- **`md`+:** `py-16` · `px-8` · meta `grid-cols-2` until lg
- **`lg`+:** meta `grid-cols-4` (single row, 4 cards)
- **Title clamp:** `clamp(1.75rem, 5vw, var(--text-3xl))` (L23) — scales fluidly
- **Card padding:** `p-5 md:p-6` (L30) — bumps at md+

---

## 13. Tokens used

✅ Strong token usage (better than Navbar):
- `var(--bg-pure-black)` (L12) — section bg
- `var(--container-content)` (L16) — max-width
- `var(--font-serif)` (L23) — Noto Serif for h1
- `var(--text-3xl)` (L23) — clamp cap
- `var(--text-nav)` (L19) — label font size
- `var(--text-sm)` / `var(--text-xs)` (L33–50, 63) — card text + label
- `var(--radius-element)` (L30 etc.) — card border-radius

⚠️ Inline:
- Grid pattern `linear-gradient(rgba(255,255,255,0.1) 1px...)` 50px stripe (L14) — raw
- Card bg `bg-white/5` · `bg-white/10` (hover) — Tailwind opacity utilities, not tokens
- Border `border-white/10` — same

---

## 14. A11y rules

✅ `<section>` landmark (L12)
✅ `<h1>` semantic (L23)
✅ `aria-label="Navigate to Explore the Case Study"` on scroll-cue (L59)
✅ Focus ring on cue button (L58 `focus:outline-none focus:ring-2 focus:ring-white`)
✅ Smooth-scroll behavior is keyboard-triggerable (button)

❌ Card labels rendered as `<div>` not `<dt>` — meta is semantically a definition list (matches feedback_a11y_patterns.md `definition-list` rule from Lighthouse 2026-05-13). Should be `<dl><dt>Client</dt><dd>Yash...</dd></dl>`.
❌ No skip-cue for scroll-cue button (some users prefer no auto-scroll · should be button not gesture)
❌ ChevronDown is decorative but has no `aria-hidden="true"` (L67)
❌ Bouncing animation on cue ChevronDown — vestibular concern · no reduced-motion guard

---

## 15. Motion rules

- **Card hover:** `transition-all duration-300` (L30) — bg fade
- **Scroll-cue hover:** tracking + translate-y + color transitions (L62, 68)
- **Scroll-cue idle:** `animate-bounce` ChevronDown (L68) — looping vertical bounce
- **Smooth scroll:** native `behavior: 'smooth'` (L7) — respects user prefers-reduced-motion at OS level

**Reduced-motion:** ⚠️ `animate-bounce` ignores `prefers-reduced-motion` — DS violation. Tailwind `motion-safe:animate-bounce` would fix.

---

## 16. Anti-patterns ❌

- ❌ Zero props · all content hard-coded — copy lives in component, not consumer (un-translatable, un-reusable across case studies)
- ❌ Dead imports (TrendingUp, Handshake, Zap, MapPin · L1) — leftover from earlier iteration
- ❌ Meta grid uses div+div not `<dl><dt><dd>` (semantic violation per a11y audit)
- ❌ Inline grid-pattern SVG-as-CSS (50px stripe) — should be token `--bg-grid-pattern`
- ❌ Mixed Tailwind opacity utility (`bg-white/5`) and CSS-var tokens (`var(--bg-pure-black)`) — inconsistent
- ❌ Card hover transitions are decoration · no hover-affordance carries function — wasted interaction budget
- ❌ Scroll-cue bouncing forever — visual noise after first 5s · should auto-stop after N cycles or on first scroll

---

## 17. REUSABILITY SCORE

**4/5 ⭐⭐⭐⭐☆** — pattern is reusable across all case studies BUT current zero-prop form makes copy-paste-edit the only way to consume it. Drops to 3/5 in-practice. After prop-lifting → 5/5.

---

## 18. Linked components

- **Atoms used:** none (raw HTML)
- **Icons:** `lucide-react/ChevronDown`
- **Sibling organisms (case-study flow):**
  - Before: `Navbar` (sets nav, reads `#hero`)
  - After: `ClientContextSection` (target of scroll-cue via `id="client-context"`)
  - Same page: `ChallengesSection` · `EngagementObjectivesSection` · `MethodologySection` · `ImpactSection` · `TestimonialSection` · `ResourcesSection` · `FinalCTASection`
- **Hooks dependencies:** Navbar's `useHeroVisibility` reads this section's existence — fragile coupling

---

## 19. Composition rule (in a page recipe)

**Case-study recipe (per design-system/recipes/case-study.md):**

```
Navbar               ← fixed top
HeroSection          ← order 1 · MUST have id="hero" for navbar hook
ClientContextSection ← order 2 · id="client-context" · target of HeroSection scroll-cue
ChallengesSection
EngagementObjectivesSection
MethodologySection
ImpactSection
TestimonialSection
ResourcesSection
FinalCTASection      ← bottom
```

**Before:** Navbar (the only thing above)
**After:** `<ClientContextSection id="client-context">` MUST exist for scroll-cue to work
**Bg-alternation:** HeroSection (black) → ClientContextSection (light/warm) — switch surface

---

## 20. Reasons + Decisions log

- **Why zero-prop?** Early build · was a Figma-export pass-through · was never refactored. Reflects design-first prototype state, not engineering shape. **Refactor priority high.**
- **Why 4 meta cards (Client/Industry/Geography/Owner)?** Matches the case-study brief framing — these 4 dimensions are the contract sales engineers sign off on per engagement.
- **Why serif h1 light weight?** Editorial · echoes Economist/HBR display tradition · contrast w/ DM Sans body. Per Quick_start_guide brand tokens.
- **Why clamp font?** Fluid responsive scaling avoids 4 breakpoint overrides · ranges (1.75rem mobile, ~3.5rem clamp peak, --text-3xl ceiling).
- **Why backdrop-blur-sm on cards?** Frosted-glass affordance on dark surface — adds depth without color-noise · cinematic touch.
- **Why uppercase 3px tracking on label?** "Case Study" is meta-categorical (says "this IS a case study") · uppercase-tracking is the editorial idiom for kickers.
- **Why bounce animation on cue?** "Scroll for more" hint — long-form case studies hide depth; without cue users may not scroll. Trade-off: vestibular load.
- **Why smooth-scroll not jump?** Preserves spatial context — user understands "I just moved down" vs "I teleported". WCAG-friendly when prefers-reduced-motion is set.
- **Why grid-pattern overlay at opacity 0.02?** Subliminal "engineering / data / technical" texture · cinematic-dark surface needs a hint of structure to not feel flat. Below conscious-perception threshold.
- **Why hard-code `#client-context`?** Tightly coupled to case-study recipe — every case study has client-context as section 2. Should still be a prop for resilience.

---

**Audit conclusion:** Strong visual pattern, weak engineering shape. Port to core-v2 w/ full prop lifting + `<dl>` semantic + reduced-motion guard + `motion-safe:animate-bounce`. Estimated effort: 4 hours. Unlocks reuse across all future case studies + makes the case-study recipe one-click composable.
