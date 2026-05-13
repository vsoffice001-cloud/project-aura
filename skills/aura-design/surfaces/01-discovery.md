# Surface 01 — Discovery

**Buyer's question:** "Are these credible in 5 seconds?"
**North stars:** NYT election graphics × Linear marketing × Stripe.com × Apple newsroom · `references/design-systems/{linear,stripe,vercel}/`
**Brand variant:** Editorial light DEFAULT. Cinematic dark only for hero / featured-research band / `[data-variant-section="cinematic"]` activator.

Discovery = the homepage + sector landing + "what does Ken Research do" entry point. Tier A competitors fail this surface w/ thumbnail-soup grids + "1000+ reports" volume claims. Ken wins by **showing receipts** (cited counts, real chart, sourced number) above the fold.

---

## Information architecture

```
[Top — Navbar (DS organism `<TopNavigation>` from core-v2)]
  Logo · Industries · Reports · Insights · About · Search · Book a call (brand-red CTA)

[Hero band — cinematic dark variant]
  Eyebrow:   small caps · 12.8px · `--color-brand-red` · "Verified market intelligence"
  H1:        Noto Serif · 48-56px · 2 lines max · ends w/ a fact ("1.2M reports cited 47K times")
  Sub:       DM Sans · 19-21px · ≤2 lines · what Ken does + who for
  Receipt:   1 sourced data-row inline (e.g. "MCA-verified 62 employees · 4 offices · 12 sectors")
  CTAs:      [Browse reports] (brand-red) + [Book a call] (ghost on dark)
  Visual:    1 cinematic chart-still or scroll-animated hero (NOT a stock illustration). See `references/design-systems/nyt/` for chart-as-hero pattern.

[Receipts band — editorial light]
  Title:     "Cited by" small caps eyebrow
  Body:      Logo strip OR named-citation strip ("Cited in McKinsey Healthcare Q3 2025 · referenced by Forbes 2026 · ..."). Real names > fake logos.
  Counter:   1 live number ("47,294 academic + media citations as of 2026-05") tabular-nums

[Sector grid — 6-12 industries]
  Card:      Industry name (h3 Noto Serif) · 1-line description · "47 reports · last updated 2026-04" · subtle brand-red hover state (border + 2px shift up)
  Layout:    3-col desktop · 2-col tablet · 1-col mobile · 24px gap
  Anti-pattern: do NOT use stock photos per industry. Use icon OR small data-viz spark (e.g. 24-month trend line) per industry.

[Featured research — 3 reports]
  Card:      Cover thumbnail (NOT stock) · title (Noto Serif) · 1-line abstract · "Published 2026-04 · 82pp · cited 12×" · CTA [Read sample]
  Layout:    3-col equal · 24px gap · alternation w/ surrounding bands strict per recipe

[Methodology proof band — editorial light or warm-300]
  Title:     "How we research"
  3-col:     Primary research (% surveys · avg sample size) · Verified data sources (X partner DBs cited) · Independent QA (peer-review process)
  Anti-pattern: vague "rigorous" / "comprehensive" / "industry-leading" claims. Show numbers or skip the band.

[Insights / blog teaser — 4 posts]
  Card:      Eyebrow (sector) · Title (Noto Serif h3) · Date · Read-time · Author headshot 24px
  Layout:    4-col masonry · 1 hero post (2× width)

[Book-a-call band — cinematic dark]
  Pull quote: real client quote w/ attribution (Stripe Press pattern · italic Noto Serif 28px · hanging punctuation)
  CTA:        [Book 15-min intro call] (brand-red) — direct to scheduler

[Footer — DS molecule]
  Sitemap · offices (Gurugram · Dubai · Tangerang · Doha) · social · legal · newsletter signup
```

**Mobile (<768px):**
- Navbar collapses to logo + hamburger + brand-red CTA always visible
- Hero: stack vertically · h1 drops to 39px · CTAs full-width
- Sector grid: 1-col · cards full-width
- Featured: 1-col · max 3 cards · "View all" CTA
- Methodology: stack 3-col → 3 vertical cards w/ animated counters

---

## Type system

| Element | Size | Font | Notes |
|---|---|---|---|
| Hero h1 | 48-56px desktop · 39px mobile | Noto Serif 700 | text-wrap: balance · max 2 lines |
| Section h2 | 39px | Noto Serif 600 | one per section |
| Card h3 | 21-24px | Noto Serif 500 | line-height 1.3 |
| Body | 16px (90%) · 18-19px hero sub | DM Sans 400 | line-height 1.5-1.6 |
| Eyebrow / small caps | 12.8px | DM Sans 600 | letter-spacing 0.08em · uppercase |
| Stat counter | 39-48px | DM Sans 600 | tabular-nums · `useAnimatedCounter` from DS |
| Footer | 14px | DM Sans 400 | line-height 1.5 |

**Token rules:** `var(--text-...)` only. Never raw `text-2xl` / `font-bold` (Cat 1.1 anti-pattern + Tailwind v4 typography arbitrary-class no-op per LEARNING 2026-05-06).

---

## Color use (92-5-3 hierarchy)

- **92% foundation** — `--color-foundation-{black,white}`, warm ramps `--color-ramp-warm-{50..900}`, surface tokens
- **5% brand red** `#b01f24` — CTAs ONLY · 1 hover ring · 1 stat-counter accent · TOC active state. NEVER use red for body text, decorative borders, secondary buttons
- **3% accent purple/periwinkle/perano/coral** — sparingly · sector-icon tints · pull-quote underline · NEVER for primary CTA

**Variant rule:** Hero band cinematic-dark via `[data-variant-section="cinematic"]` activator. Receipts + sector + methodology + insights = editorial-light. Featured research + book-a-call = cinematic-dark (alternation).

---

## Motion system

| Element | Library | Trigger | Pattern |
|---|---|---|---|
| Hero H1 entrance | Framer Motion | mount | fade-up + 80ms stagger per word (NOT char) |
| Stat counters | DS `useAnimatedCounter` | inView | spring count from 0 to value · 1.2s · ease-out |
| Cinematic mesh hero bg | CSS only | always | 5-overlay gradient mesh per `core-v2/patterns/DarkGradientMesh.tsx` (no JS) |
| Sector cards hover | Framer Motion `whileHover` | hover | y: -2px · border `--color-brand-red` · 200ms |
| Featured cards entrance | Framer `useInView` + variants | scroll | stagger fade-up · 0.06s · ease `easeOut` · `viewport={{ once: true }}` |
| Methodology counters | DS `useAnimatedCounter` (Framer-based) | inView | counter from 0 · spring · respects `useReducedMotion()` |
| Smooth page scroll | CSS `html { scroll-behavior: smooth }` | always | DS `core-v2/styles/base.css` · zero JS |

**Stack lock-in 2026-05-08:** Framer Motion ONLY. GSAP + Lenis REMOVED for dev-team parity. Smooth scroll = native CSS at DS layer.

---

## Density rules

- **Vertical rhythm:** every band uses `--space-section-{md,lg,xl}` from tokens · no random `py-20` literals
- **Card padding:** consistent `--space-card-md` per surface · don't vary per band
- **Line-length:** body capped at 65-75ch · hero sub capped at 50ch (text-wrap: balance)
- **Mobile reading:** body never <16px on mobile · hero sub never <17px

---

## Anti-patterns (Discovery-specific)

1. **"1000+ reports" volume hero** — Tier A signature. Replace w/ specific verified count + citation receipt. (Cat 13.1 — vibes-over-receipts)
2. **Stock illustrations of "data" / abstract dashboards** — kills credibility in 2 seconds. Use real chart still or scroll-animated data-viz.
3. **Logo soup w/o context** — "trusted by" walls of grayed-out logos w/ no source. Replace w/ named citations.
4. **Generic methodology claims** ("rigorous", "comprehensive", "industry-leading") — Cat 13.2 (unsubstantiated claim). Show number or drop the band.
5. **Sector cards w/ stock photos** — every Tier A does this. Use icon + spark-line data-viz instead.
6. **Hero w/ 4+ CTAs** — 2 max (primary brand-red + ghost secondary).
7. **Auto-rotating carousels for featured** — kills reading. Use 3-card grid · static · "View all" link.
8. **Newsletter modal pop-up** — anti-pattern across all 5 surfaces. Footer signup only.

---

## DS components used (post-Sprint 2026-05-07 `core-v2`)

```ts
import {
  Button,            // CTAs (variant: brand | ghost)
  CTALink,           // text-link variant
  Card,              // sector + featured cards
  Badge,             // citation-count badge on featured
  SectionHeading,    // band h2
  SectionLabel,      // eyebrow caps
  SectionWrapper,    // band wrapper w/ token-backed bg
  AnimatedArrow,     // CTA chevron
  ScrollProgress,    // top reading progress bar
} from '@kenresearch/design-system/atoms';

import {
  StatCard,          // methodology counters
} from '@kenresearch/design-system/molecules';

import {
  TopNavigation,     // navbar via render-prop slots
} from '@kenresearch/design-system/organisms';

import {
  DarkGradientMesh,  // cinematic mesh hero bg
  SectionBg,         // section variant bg orchestration
} from '@kenresearch/design-system/patterns';

import { useAnimatedCounter } from '@kenresearch/design-system/hooks';
```

Never re-implement these atoms inline (Cat 13.8). If a needed atom doesn't exist in `core-v2`, STOP, propose addition, then continue (per LEARNING 2026-05-08 token-port discipline rule).

---

## Recipe pointer

When `/page sector-landing` or `/page discovery-home` shipped, recipe lives at `design-system/recipes/discovery.md` (TBD). Until then, build from this surface file + recipe-conformance gate via `aura-qa`.

---

## Cross-surface citations

- Receipt patterns shared w/ surface 03 (Report Viewer cite-block)
- Hero cinematic-dark mesh shared w/ surface 04 (Dashboard hero) · same `DarkGradientMesh` pattern
- Sector grid icons consistent w/ Report Store filter sidebar (surface 02)
