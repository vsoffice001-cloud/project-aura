# Ken DS · The 10 Commandments + REUSABILITY SCORE Methodology

**Module:** `design-system/core-v2/docs/COMMANDMENTS.md`
**Version:** v0.1.0 · core-v2
**Date:** 2026-05-13
**Ported from:** V0.2 `MASTER_COMPONENT_INDEX.md:287-338` (the original 10 Commandments) · adapted for core-v2 stack (Next 15 + React 19 + Tailwind v4 + Style Dictionary v4 + Framer Motion + Lucide).
**Reading position:** 3rd in onboarding. Read AFTER [`CORE.md`](./CORE.md) + [`QUICK_START.md`](./QUICK_START.md). Read BEFORE [`ANTI_PATTERNS.md`](./ANTI_PATTERNS.md) + [`COMPONENT_REFERENCE.md`](./COMPONENT_REFERENCE.md).

---

## CRITICAL — THE CONSTITUTION

These ten rules are the **non-negotiable design contract** for every page, component, and pattern shipped from `design-system/core-v2/`. They are the constitution: short, testable, brand-locked. If a build violates any one of them, it fails the craft-pass gate (step 4.5 of the 9-step page-build process) and does NOT proceed to SHOW FIRST CUT.

Everything else in the docs (CORE.md's 27-point checklist, ANTI_PATTERNS.md's 14 categories, COMPONENT_REFERENCE.md's decision trees) elaborates on these ten. When in doubt, return here.

> *"A DS is its yeses + its noes. The noes are the constraints that make the yeses powerful."* — `anti-patterns-catalog.md` audit observation, OG `Design_system_vs_26`.

---

## Part 1 · The 10 Commandments (stack-adapted)

### 1. Padding rhythm via tokens · never magic numbers

Section horizontal padding follows the Style Dictionary scale via CSS variables. The legacy `px-[84.375px] lg:px-[112.5px]` magic-number pattern from V0.2 is forbidden — those numbers reverse-engineered from Figma exports drift the moment the scale changes.

```tsx
// ❌ Forbidden
<section className="px-[84.375px] lg:px-[112.5px]">

// ✅ Required
<section className="px-[var(--section-px-base)] lg:px-[var(--section-px-lg)]">

// ✅ Also acceptable (Tailwind step that maps 4px-scale)
<section className="px-20 lg:px-28">
```

**Why:** Magic pixel values escape the token build and break re-skinning. Tokens give you O(1) re-theming. Tailwind 4px-scale utilities are acceptable because they map cleanly to `--spacing-N`. Arbitrary pixel values like `px-[17px]` are forbidden unless inside a `clamp()` for editorial responsive headings (the one documented exception, per `theme.css:248-251` audit).

**Enforcement:** `pnpm lint` rejects `px-[\d+(\.\d+)?px]` arbitrary classes in source.

---

### 2. Color semantics · 92-5-3 hierarchy

Every Ken Research surface must allocate visual weight in this proportion:

- **92% foundation** — black, white, warm-300, grey ramp. Body text, section bg, borders, dividers, micro-meta.
- **5% brand** — Ken Red `#b01f24`. **CTAs only.** Maximum 1-2 brand-red elements per screen. Headlines that earn the inversion (FinalCTA hero word) count toward the 5%.
- **3% accent** — Periwinkle `#806ce0` (data icons, card shadows, mini-viz). **NEVER as section background. NEVER for body text.**

```tsx
// ❌ Forbidden
<h2 className="text-[#b01f24]">Market Outlook</h2>          // red headline
<section className="bg-[#806ce0]">                            // purple section bg
<Icon color="var(--brand-red)" />                             // red icon

// ✅ Required
<h2 className="text-foundation-black">Market Outlook</h2>
<Button variant="brand">Schedule a demo</Button>              // red where it earns
<Icon color={iconColors.content} />                            // periwinkle for data
```

**Why:** The 92-5-3 split is the load-bearing constraint behind Stripe / Linear / Vercel-quality editorial feel. The moment red leaks beyond CTAs, CTAs lose pop — scarcity = power. This is the single most-violated OG rule (`COLORS.md:60`: *"NEVER use red for decorative purposes"*) and the most damaging when it drifts.

**Enforcement:** Visual review during craft-pass + axe contrast checks + manual count of brand-red elements per screen.

---

### 3. Font usage · Serif for display, Sans for everything else

- **Noto Serif** (`--font-serif`) — h1-h6 display headings, hero titles, section headings. Display use ONLY.
- **DM Sans** (`--font-sans`) — body, UI chrome, buttons, labels, navigation, badges, micro-meta, captions.
- **SF Mono** (or system mono fallback) — code snippets, data tables that need tabular alignment.

**Never italic on display headings.** Italic Noto Serif at h1/h2 sizes reads as decorative-blog, not authority-research. Italic is acceptable inline within body paragraphs for emphasis (rare) or for technical terms.

```tsx
// ❌ Forbidden
<h1 className="font-sans italic">                              // sans on display
<p className="font-serif">This is body text.</p>               // serif on body
<button className="font-serif">Submit</button>                  // serif on UI

// ✅ Required
<h1 style={{ fontFamily: 'var(--font-serif)' }}>Market Outlook</h1>
<p style={{ fontFamily: 'var(--font-sans)' }}>Body copy.</p>
<Button>Submit</Button>                                         // DS atom owns font
```

**Why:** Noto Serif carries editorial authority; DM Sans carries UI clarity. Mixing them collapses both signals. Italic display headings undermine authority — Ken is research, not lifestyle. (`TYPOGRAPHY.md:29-31` verbatim: *"NEVER use Serif for body text, buttons, labels, navigation, or any UI chrome. NEVER use Sans for hero headings or section titles. NEVER mix more than 2 custom typefaces."*)

**Enforcement:** `pnpm lint` checks for `font-serif` on non-heading tags + manual review.

---

### 4. Alternating backgrounds · strict rhythm

Section backgrounds follow the recipe's defined sequence. NO two consecutive same-bg sections. Cinematic-dark is reserved for hero + FinalCTA earned moments only.

**Case-study (editorial-light variant default):** BLACK → WHITE → WARM → repeat per recipe `case-study.md` L50.
**Report-store-listing:** BLACK → WHITE → NEUTRAL-50.
**Cinematic embed (per-section):** `data-variant-section="cinematic"` only for hero and FinalCTA, never for mid-page factual sections.

```tsx
// ❌ Forbidden
<section className="bg-white">…</section>
<section className="bg-white">…</section>    // 2 consecutive white — broken rhythm

<section data-variant-section="cinematic">    // cinematic mid-page on a methodology
  <MethodologySection />
</section>

// ✅ Required
<section className="bg-foundation-black" data-variant-section="cinematic">
  <HeroSection />
</section>
<section className="bg-white">
  <ChallengesSection />
</section>
<section className="bg-warm-300">
  <MethodologySection />
</section>
```

**Why:** Rhythm without color noise. Editorial typography needs negative space contrast to breathe. Cinematic earned-only because dark backgrounds carry more weight — using them mid-page for routine content drains the FinalCTA's power. (`LAYOUT.md:167-200` + recipe L50 alternation contract.)

**Enforcement:** `pnpm lint:recipes` (`README.md:71`) validates alternation pattern per surface.

---

### 5. Icon library Lucide-only

Ken core-v2 uses **Lucide React** exclusively. The V0.2 dual-library pattern (Phosphor for data + Lucide for UI) is **REJECTED** in the port. No Phosphor. No MUI icons. No custom inline SVG (unless it's a `figma:asset/*` brand mark in `public/`).

Icon-only Buttons MUST carry `ariaLabel` (the camelCase core-v2 prop, NOT raw `aria-label`).

```tsx
// ❌ Forbidden
import { ChartBar } from '@phosphor-icons/react';              // Phosphor banned
import { Download } from '@mui/icons-material';                 // MUI banned
<svg viewBox="0 0 24 24"><path d="…" /></svg>                  // inline custom SVG

<Button iconOnly icon={<Download size={20} />} />               // no ariaLabel — screen-reader fail

// ✅ Required
import { Download, BarChart3 } from 'lucide-react';
import { iconColors } from '@kenresearch/design-system/atoms';

<Button
  iconOnly
  icon={<Download size={20} color={iconColors.utility} />}
  ariaLabel="Download annual report PDF"
/>
```

**Why:** Two icon libraries = 80KB bloat + two mental models. Lucide alone covers Ken's surface area (1,500+ icons). Centralized `iconColors` module enforces the Periwinkle (`content`, data icons) vs Grey (`utility`, nav/action icons) split (`iconColors.ts:1-19` OG verbatim: *"Every Lucide icon must use one of these two colors — no exceptions."*).

**Enforcement:** `pnpm lint` rejects `@phosphor-icons/react` and `@mui/icons-material` imports.

---

### 6. Shadow hierarchy · semantic, not stylistic

Four shadow tokens map to four content semantics:

- `shadow-sm` — factual content (timeline cards, methodology steps, stakeholder profiles). Subtle elevation, no interaction implied.
- `shadow-md` — interactive default (most buttons, dropdowns, cards with onClick).
- `shadow-card-hover` — lift-on-hover state for data cards (StatCard, DataHighlightCard). Pairs with `-translate-y-1` 300ms.
- `shadow-premium` — hero + featured sections ONLY. Aggressive elevation, earned moments. Never on mid-page cards.

NO custom inline shadows. NO `shadow-[0_4px_12px_rgba(0,0,0,0.15)]` arbitrary classes.

```tsx
// ❌ Forbidden
<div className="shadow-[0_4px_24px_rgba(0,0,0,0.2)]">          // arbitrary
<Card className="shadow-premium">Methodology step 3</Card>      // wrong tier for content

// ✅ Required
<Card className="shadow-sm">Methodology step 3</Card>           // factual = sm
<StatCard className="shadow-md hover:shadow-card-hover" />      // data interactive
<HeroSection className="shadow-premium" />                       // earned
```

**Why:** Shadow tiers communicate content type AND interaction affordance. Mixing tiers (premium shadow on factual card) lies to the user about importance. (Adapted from V0.2 `MASTER_COMPONENT_INDEX.md:287-338` Commandment 6: *"purple for data · grey for interactive · none for factual"* — core-v2 codifies as 4 named tokens.)

**Enforcement:** `pnpm lint` rejects `shadow-[…]` arbitrary classes.

---

### 7. Hover states · 300ms with reduced-motion respect

Every interactive hover transition uses the standard Ken motion contract:

```css
transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
```

300ms = perceptually crisp without feeling rushed. The cubic-bezier is the Material 3 standard easing (often called "ease-out" in shorthand). NEVER `ease-linear` (robotic) or `ease-in-out` (sluggish for state changes).

**`prefers-reduced-motion` is mandatory on every animation.** Use Framer `useReducedMotion()` in JS or `motion-reduce:` Tailwind utility in CSS. NEVER ship an animation that runs unconditionally.

```tsx
// ❌ Forbidden
<Card className="hover:scale-110 duration-1000 ease-linear">     // wrong easing + duration
<motion.div animate={{ y: -8 }} />                                // no reduced-motion guard

// ✅ Required
<Card className="transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1 motion-reduce:hover:translate-y-0">
  Data signal
</Card>

// ✅ Or with Framer
const reduce = useReducedMotion();
<motion.div animate={reduce ? {} : { y: -8 }} transition={{ duration: 0.3 }} />
```

**Why:** Consistent motion = perceived quality. 300ms is the Goldilocks duration validated by Material 3 + Carbon + Polaris. Reduced-motion respect is WCAG-mandated AND it's the right thing for users with vestibular disorders. (`theme.css:822-826` OG verbatim: *"REDUCED MOTION ... Respects user preferences for reduced motion."*)

**Enforcement:** Manual review during craft-pass + axe motion checks.

---

### 8. Grid responsive · 1 / 2 / 2-4 column

Card grids follow the Tailwind responsive utility pattern. NO custom grid widths. NO `grid-cols-[repeat(3,minmax(280px,1fr))]` arbitraries unless the recipe explicitly defines a mixed-grid composition (e.g., SegmentationSection 2/3/2 rhythm — see `pattern-lessons.md` REPLICATE table).

- **Mobile (default)** — 1 column. Full-bleed cards readable on 375px viewport.
- **Tablet (`md:`, ≥768px)** — 2 columns.
- **Desktop (`lg:`, ≥1024px)** — 2 to 4 columns depending on content density.

```tsx
// ❌ Forbidden
<div className="grid grid-cols-3">                              // no mobile fallback
<div className="grid grid-cols-[repeat(5,1fr)]">                // arbitrary; 5col fails tablet

// ✅ Required
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {cards.map(…)}
</div>

// ✅ Mixed-grid (recipe-defined exception)
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_3fr_2fr] gap-6">
  {/* SegmentationSection 2/3/2 editorial rhythm */}
</div>
```

**Why:** Predictable responsive breakpoints = predictable reading flow. 4-col desktop is the ceiling because card content (icon + heading + 2-line body) needs ≥240px width to breathe. Mixed-grid rhythms break monotony only when the recipe earns it — improvising them creates visual chaos.

**Enforcement:** Manual review against recipe spec + visual test at mobile/tablet/desktop breakpoints.

---

### 9. Composition over re-implementation · always import atoms

Every interactive primitive must come from the DS atom surface. Re-implementing `<button>`, `<a>`, `<input>` raw HTML inline is a P0 anti-pattern.

```tsx
// ❌ Forbidden
<button className="bg-red-500 px-6 py-3 rounded-lg">Subscribe</button>
<a href="/report" className="text-brand-red underline">View report</a>
<div className="rounded-xl shadow-md p-6 bg-white">…</div>      // raw card-shaped div

// ✅ Required
import { Button, InlineLink, Card } from '@kenresearch/design-system/atoms';

<Button variant="brand">Subscribe</Button>
<InlineLink href="/report">View report</InlineLink>
<Card>…</Card>
```

**Why:** Raw `<button>` loses shimmer animation (brand identity), brand sizing scale, focus-ring discipline, 44px touch-target floor, and the `ariaLabel` contract. Raw `<a>` loses InlineLink's underline-on-hover treatment, contrast tokens, and the `showArrow` arrow-animation discipline. Raw `<div>` card loses Card's `role="button"` + keyboard handling when interactive (`Card.tsx:91-103` core-v2 fix). Composition is the contract; re-implementation silently breaks it.

**Enforcement:** `pnpm lint` rejects raw `<button>`, `<a>`, `<input>` in `src/**/*.{ts,tsx}` files. Lint rule is *"no raw `<button>` / `<a>` without DS wrapper"* (`README.md:70`).

---

### 10. Accessibility · semantic HTML, AA contrast, 44px floor

Every Ken surface ships with these baseline guarantees:

- **Semantic HTML always.** `<button>` (via `<Button>`) for actions, `<a>` (via `<InlineLink>`/`<CTALink>`) for navigation. Never click-handlers on `<div>`. Headings descend without skipping levels (h1 → h2 → h3, never h2 → h4).
- **WCAG AA contrast minimum.** Body text 4.5:1, large text 3:1, non-text UI 3:1. AAA aspirational where feasible.
- **44px touch-target floor** on mobile for all interactive elements (WCAG 2.5.5). Button `xs` (28px) is exempt because card-footer context provides external touch area; `sm` (40px) borderline-OK in navbar w/ external padding.
- **Color + text together, never alone.** Error states need icon AND red color AND screen-reader text. Success states need check icon AND green color.
- **Keyboard reachable.** Every interactive element accessible via Tab. `:focus-visible` ring on every interactive element. Card with `onClick` MUST also have `role="button"` + `tabIndex={0}` + `onKeyDown` for Enter/Space.
- **`useReducedMotion()` honored.** Mandatory pairing with every Framer Motion animation.

```tsx
// ❌ Forbidden
<div onClick={handleClick}>Click me</div>                       // no semantics
<span className="text-rose-600">Invalid email</span>             // color-only error
<button className="size-6">                                      // 24px touch target

// ✅ Required
<Button onClick={handleClick}>Click me</Button>
<span role="alert" className="text-rose-600 inline-flex items-center gap-1">
  <AlertCircle className="size-4" /> Enter a valid email
</span>
<Button size="md">                                              {/* 48px, AA pass */}
```

**Why:** A11y is not a polish step — it's a P0 design constraint. Every violation excludes a real user. WCAG AA is the production baseline for Ken; AAA is aspirational. (Adapted from OG `CORE.md:134-136` + `ButtonDocumentation.tsx:923` + `anti-patterns-catalog.md` Category 4.)

**Enforcement:** `pnpm test` runs axe via Playwright + manual keyboard run-through during craft-pass + Lighthouse a11y ≥95 per consumer.

---

## Part 2 · REUSABILITY SCORE methodology

Every component in `src/atoms/`, `src/molecules/`, `src/organisms/` carries a star rating in its JSDoc frontmatter. The rating answers: *"Should this exist at this layer?"*

### The 5-tier scale

| Tier | Stars | Usage scope | Layer | Example |
|---|---|---|---|---|
| **1/5** | ⭐ | Page-specific · won't be reused | Consumer app, not DS | `PlayerVariantSwitcher` (debug widget — strip on port) |
| **2/5** | ⭐⭐ | Niche · 1 section uses | Organism if expensive, else don't promote | `MindMap` (only ScopeOfReport · d3 cost justifies) |
| **3/5** | ⭐⭐⭐ | Moderate · 1-2 sections + likely future | Molecule layer | `TimelineCard` (MarketOverview now, future PDP pages) |
| **4/5** | ⭐⭐⭐⭐ | High reuse · 3-4 sections | Standard DS molecule | `StakeholderCard`, `MethodologyCard`, `IndustryBadge` |
| **5/5** | ⭐⭐⭐⭐⭐ | Repository-grade · 5+ sections | Atom-tier · mandatory | `Button`, `Card`, `Badge`, `SectionHeading`, `Container` |

### The triage rule

When designing a new component, ask:

1. **Am I about to build 5 niche variants when 1 universal would do?** → STOP. Build 1 universal component with a `variant` prop instead.
2. **Is the score 1/5?** → Question existence. Does this need to be a component at all, or is it just markup? If it must exist, keep it in the consumer app, NOT in DS.
3. **Is the score 5/5 on a niche pattern?** → Promote to atom layer immediately. If 5+ sections need it, it's load-bearing.
4. **Is the score 3/5 trending upward?** → Promote from organism to molecule. Generalize the API.

### Citation discipline

Every component's JSDoc MUST cite its score with rationale. Example:

```tsx
/**
 * StakeholderCard · ⭐⭐⭐⭐ 4/5
 *
 * High reuse: TargetAudience section (8 stakeholders) + Methodology section (3 personas)
 * + Engagement section (5 client roles) + future CompetitiveLandscape (planned 4 roles).
 *
 * Promotion path: stays at molecule layer unless 5th section adoption pushes to 5/5.
 *
 * WHEN ✅: Use for any "person/role + descriptor + icon" card pattern.
 * WHEN ❌: Don't use for stat display (StatCard · purple shadow signals data).
 */
```

This citation is what enables the docs to triage future drift: when someone proposes a 5th near-duplicate card pattern, the score makes the "promote to atom" decision obvious instead of arguable.

### Why the score exists

The scoring methodology is the antidote to the V0.2 "98 MDs · 30 redundant audits · 5 niche card variants" sprawl problem. It quantifies the "should this be repo-level" decision that previously lived in tribal knowledge. (`documentation-method.md` audit observation: *"Stops drift of building 5 niche variants when 1 universal would do."*)

---

## Part 3 · Tri-modal hover language

Maps content type → interaction signal. **Pick ONE hover behavior per card-grid section.** NEVER mix hover languages within a single grid.

| Card type | Hover behavior | Use for |
|---|---|---|
| **Purple shadow** | `shadow-purple-md` + `-translate-y-1` 300ms | Data signal · stats · metrics · analysis cards |
| **Static grey** | No hover state · subtle `bg-grey-50` on enter (optional) | Factual content · timeline · stakeholder · methodology |
| **Border darken** | `border-grey-300` 200ms | Comparison · parameter cards · spec tables |
| **Red gradient** | `bg-gradient` transform · `scale-105` | FinalCTA ONLY · once per page · earned cinematic |

### Implementation reference

```tsx
// Data card · purple-shadow hover
<StatCard className="transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
                     hover:shadow-[var(--shadow-purple-md)] hover:-translate-y-1
                     motion-reduce:hover:translate-y-0" />

// Factual card · static (no hover)
<TimelineCard className="bg-white border border-grey-200" />

// Comparison card · border-darken
<ComparisonParameterCard className="border border-grey-200
                                    transition-colors duration-200
                                    hover:border-grey-300" />

// FinalCTA · red-gradient (page-final, once)
<FinalCTASection className="bg-gradient-to-br from-brand-red-500 to-brand-red-600
                            transition-transform duration-300
                            hover:scale-[1.02] motion-reduce:hover:scale-100" />
```

### Hard prohibitions

- ❌ **NEVER mix hover languages** within the same card-grid section. If a section has 6 cards and 3 use purple-shadow + 3 use border-darken, the user reads it as "broken." Pick one and commit.
- ❌ **NEVER use red-gradient** for non-CTA cards. Red-gradient is the page-final earned moment. Using it on a mid-page card collapses the FinalCTA's signal.
- ❌ **NEVER use purple-shadow** on static factual cards. Purple = data. Putting it on a stakeholder profile lies about content type.
- ❌ **NEVER add hover state to a card that doesn't navigate.** Hover affordance implies "click me." If the card is purely informational (timeline event with no link), keep it static.

### Why tri-modal

V0.2 stumbled onto a grammar: interaction style communicates content type before the user reads the words. Purple-shadow + lift = "this is data, click to drill in." Static + grey-50 = "this is reference, just read it." Border-darken = "this is one option among many, hover to compare." Red-gradient = "this is the moment to convert." Mixing them is like mixing typefaces — it undermines authority. (`pattern-lessons.md` REPLICATE table: *"Maps content type → interaction · readable grammar."*)

---

## Part 4 · Reading order (re-affirm)

These ten commandments are the **center** of a six-doc reading flow. Onboard in this order; total time ~15 min for full mental model:

1. **[`CORE.md`](./CORE.md)** — rules · 27-point checklist · 21 DON'Ts · 19 DOs · inventory · stack gotchas · quality metrics.
2. **[`QUICK_START.md`](./QUICK_START.md)** — page-build workflow · 9-step process with 2 hard gates + craft-pass · 1-min agent onboarding.
3. **[`COMMANDMENTS.md`](./COMMANDMENTS.md)** *(this file)* — the 10 constitutional rules + REUSABILITY SCORE methodology + tri-modal hover language.
4. **[`ANTI_PATTERNS.md`](./ANTI_PATTERNS.md)** — 14 categories of forbidden patterns with "use X instead" pointers.
5. **[`COMPONENT_REFERENCE.md`](./COMPONENT_REFERENCE.md)** — full API surface · decision trees · prop tables.
6. **`/design-system/tokens/build/tokens.css`** — the emitted token surface (read-only · regenerate via Style Dictionary).

When you finish reading COMMANDMENTS.md you should be able to:
- Recite the 92-5-3 color rule.
- Pick the right hover language for a card type.
- Cite a REUSABILITY SCORE for any proposed new component.
- Reject a `px-[84.375px]` magic number on sight.
- Refuse to ship an animation without `useReducedMotion()`.

If you can't do all five, re-read the relevant section before composing.

---

## REUSABILITY SCORE

⭐⭐⭐⭐⭐ — This document is **repository-grade**. It is the constitution every Ken Research surface defers to. Every page-build agent (aura-craft, aura-builder, aura-qa) reads it as part of step 4.5 (craft-pass) and step 7 (PROPOSE QA). Without these ten rules codified in one place, the workspace would re-derive them per-build via tribal knowledge and drift would accelerate.

This doc is also the canonical citation target: when ANTI_PATTERNS.md says *"violates Commandment 2"*, it points here. When a PR review comment says *"breaks the 92-5-3 rule"*, it points here. The constitution must be short, testable, and brand-locked so it can carry that citation weight.

---

## Linked concepts

- **[`CORE.md`](./CORE.md)** — 27-point pre-flight checklist (operationalizes Commandments 1, 3, 5, 7, 9, 10)
- **[`QUICK_START.md`](./QUICK_START.md)** — page-build workflow (where craft-pass enforces these commandments at step 4.5)
- **[`ANTI_PATTERNS.md`](./ANTI_PATTERNS.md)** — 14 forbidden-pattern categories (the "noes" that pair with these "yeses")
- **[`COMPONENT_REFERENCE.md`](./COMPONENT_REFERENCE.md)** — decision trees that consume REUSABILITY SCORE for triage
- **[`PATTERNS.md`](./PATTERNS.md)** — section composition · dark gradient mesh · fade mask · 92-5-3 hierarchy applied
- **[`RECIPES.md`](./RECIPES.md)** — per-surface bg alternation contracts (Commandment 4 enforcement)
- **`design-system/tokens/build/tokens.css`** — the token surface every commandment references
- **`design-system-audit/worked-examples/v02-for-design-system/documentation-method.md`** — V0.2 source: 10 Commandments verbatim + REUSABILITY SCORE pattern origin
- **`design-system-audit/worked-examples/v02-for-design-system/pattern-lessons.md`** — V0.2 source: tri-modal hover language origin + REPLICATE/REJECT/MODIFY synthesis
- **`design-system-audit/og-audit/anti-patterns/anti-patterns-catalog.md`** — OG 70+ anti-patterns catalog (the "noes" reference)
- **`skills/aura-craft/SKILL.md`** — craft-pass skill that enforces these commandments at page-build step 4.5
- **`workspace CLAUDE.md`** — Aura operating rules · feedback_craft_skills · feedback_page_build_process

---

**v0.1.0 · 2026-05-13 · ported from V0.2 `MASTER_COMPONENT_INDEX.md:287-338` (10 Commandments) + V0.2 `documentation-method.md` (REUSABILITY SCORE) + V0.2 `pattern-lessons.md` (tri-modal hover) · adapted for core-v2 stack (Next 15/16 + React 19 + Tailwind v4 + Style Dictionary v4 + Framer Motion + Lucide). Audit source-of-truth: `design-system-audit/`. Constitution status: **load-bearing** — every craft-pass cites this doc.**
