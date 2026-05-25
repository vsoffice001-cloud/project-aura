# Reasoning Log · V0_lite_report-legacy

> The gold doc — every visible "WHY this was done" decision lifted verbatim from inline JSDoc, comment blocks, and prose-style class choices. Each entry: file:line citation, the verbatim quote, and what the decision *means*.

This is what the user is referring to with *"proper reasons of everything."* The codebase reasons about its own decisions in prose, in place, where the decision happens — not in a separate design-doc file that goes stale.

---

## 1. Color hierarchy — the 92-5-3 rule

### Declaration: where the rule is defined

`src/design-system/tokens.ts:305-329` — the canonical statement:

> ```ts
> export const designSystem = {
>   version: '1.0.0',
>   name: 'Premium Editorial Design System',
>   colorHierarchy: {
>     foundation: '92%',  // Black/White/Warm
>     brandRed: '5%',     // CTAs only
>     accents: '3%',      // Shadows & highlights
>   },
>   /**
>    * Element-Color Classification Rule:
>    * Every UI element must be classified before assigning color:
>    *   - Utility/Navigation → 92% Foundation (black/white)
>    *   - Conversion CTA     → 5% Brand Red
>    *   - Content Icons      → 3% Accent Purple (stroke only)
>    *   - Decorative         → 3% Accent (low opacity only)
>    *
>    * Purple (#806ce0) may only be used as icon stroke color or at
>    * low opacity (10% fills, 6% shadows). Never as solid backgrounds.
>    *
>    * Exception: Badge.tsx defines its own internal theme color configs
>    * with hardcoded hex values (the only intentional exception).
>    */
> ```

This is the page's constitution. Every later decision references back to it implicitly.

### Application 1: ScrollProgress = brand red (legitimate)

`src/app/App.tsx:9-12`:

> ```
> * - ScrollProgress: Brand-red top bar tracking scroll depth (brand red is
> *   appropriate here — it's a persistent visual indicator drawing attention
> *   to engagement depth, effectively serving as a soft conversion signal)
> ```

**Why this matters:** brand red would *naively* violate "CTAs only" (a progress bar isn't a CTA). The comment names the override-reason: scroll depth is a conversion-engagement proxy. The author *knew* it looked like a rule-break and pre-justified it.

### Application 2: ScrollToTop = black (strict enforcement)

`src/app/App.tsx:13-14`:

> ```
> * - ScrollToTop: Black utility FAB (92% foundation tier — NOT purple/red,
> *   because it's a navigation aid, not a CTA or decorative accent)
> ```

**Why this matters:** the same author who allowed ScrollProgress to "break the rule" *refuses* to do so for ScrollToTop. Same surface (persistent overlay), different role (navigation vs engagement signal) → different color tier. The discipline holds.

### Application 3: Stat-card icons = purple at 10% opacity (3% tier compliant)

`src/app/components/sample-report/ChapterExecutiveSummary.tsx:6-8`:

> ```
> * Extracted from the monolith as part of Tier 4 decomposition.
> * Stat card icons use `iconColors.content` (#806ce0) with 10% opacity
> * container backgrounds — within the 3% accent tier boundary.
> ```

**Why this matters:** explicitly names the *quantitative compliance* (10% opacity stays inside the 3% accent budget visually). Code at `ChapterExecutiveSummary.tsx:70` confirms: `bg-content-icon/10`.

### Application 4: Paywall has two tiers in tension

`src/app/components/sample-report/ChapterMarketOverview.tsx:5-9`:

> ```
> * The paywall lock icon uses `iconColors.content` (#806ce0) with a
> * 10% opacity container — within the 3% accent tier boundary.
> * The "Unlock Full Report" CTA uses brand red (5% tier) — correct
> * because it's a conversion action.
> ```

**Why this matters:** one component, two color tiers, both justified at point-of-use. The lock = decoration (3%). The unlock button = action (5%). The reader sees the *contrast* and intuits "the locked thing is calm, the action is hot."

---

## 2. Icon classification — content vs utility

`src/design-system/iconColors.ts:7-44` — full prose:

> ```
> /**
>  * Icon Color System - Design System VS 26
>  *
>  * Provides semantic color classification for icons based on their purpose.
>  *
>  * ## Icon Classification Rules:
>  *
>  * **CONTENT ICONS** (#806ce0 - Periwinkle):
>  * - Feature icons (Sparkles, Lightbulb, Target, Zap)
>  * - Metric/data icons (TrendingUp, BarChart3, PieChart)
>  * - Phase/section icons (BookOpen, Layers, Building2)
>  * - Content representation (FileText, Globe, Phone)
>  * - Decorative bullet pointers (ChevronRight used as list markers)
>  *
>  * **UTILITY ICONS** (#737373 - Gray):
>  * - Navigation controls (ChevronLeft, ChevronRight, ChevronDown, ChevronUp)
>  * - Action buttons (X, Download, Trash2, Save)
>  * - UI controls (Search, Filter, Settings, Menu)
>  * - State indicators (Check, Lock, Unlock)
>  * - View controls (Maximize2, Minimize2, Eye, EyeOff)
>  *
>  * ## Purple (#806ce0) Usage Boundaries:
>  *
>  * ✅ PERMITTED:
>  * - Icon stroke color via `iconColors.content`
>  * - Icon container backgrounds at 10% opacity
>  * - Subtle shadow tints at 6% opacity
>  *
>  * ❌ PROHIBITED:
>  * - Solid button/element backgrounds
>  * - Full-opacity text color (except inside Badge.tsx internal themes)
>  * - Full-opacity borders
>  */
> ```

**Why this matters:** `ChevronRight` shows up twice in the lists — once as a content icon (when used as a decorative bullet pointer) and once as a utility icon (when used as nav). The same lucide-react icon, two different `iconColors.*` values, depending on *role*. Decisions are role-based, not lexical-based.

This is reinforced at the call-site:

`src/app/components/ChapterMethodology.tsx:14-22`:

> ```
>  * Design decisions (confirmed post-audit — no changes needed):
>  *   - ChevronRight icons in bullet lists are DECORATIVE POINTERS (visual
>  *     bullet markers), NOT disclosure/expand arrows. They use
>  *     `iconColors.content` (#806ce0) because they represent content structure.
>  *   - `group-hover:text-black` on bullet items is INTENTIONAL: hovering the
>  *     card highlights all bullet text simultaneously to signal the card as
>  *     a unified interactive unit.
>  *   - Cards do NOT expand/collapse — the shadow depth change via `activeStep`
>  *     is the only visual state shift.
> ```

The "INTENTIONAL" in caps is the author preemptively answering a reviewer's "why is this here" question.

---

## 3. Typography — Major Third scale, serif-at-XL rule

`src/styles/theme.css:9-19`:

> ```
> /* Typography Scale - Major Third (1.25 ratio) */
> --text-xs: 0.8rem;      /* 12.8px - Labels, metadata */
> --text-sm: 1rem;        /* 16px - Body text */
> --text-base: 1.25rem;   /* 20px - Large body, card titles (4+) */
> --text-lg: 1.563rem;    /* 25px - Card titles (2-3 cards) */
> --text-xl: 1.953rem;    /* 31.25px - Subsection headings (h3) */
> --text-2xl: 2.441rem;   /* 39px - Section headings (h2) */
> --text-3xl: 3.052rem;   /* 48.8px - Hero h1 only */
> ```

Each step has a **named role**, not just a size. *"Card titles (2-3 cards)"* vs *"Card titles (4+)"* is the kind of micro-rule that prevents one-off "let me just bump this up" drift.

`src/design-system/components/SectionHeading.tsx:39-45`:

> ```
> // font-serif only at XL (1.953rem) and above; font-sans below
> const fontClasses = {
>   1: 'font-serif font-light',        // Always ≥ XL → serif
>   2: 'font-serif font-light',        // Always ≥ XL → serif
>   3: 'font-sans font-medium sm:font-serif sm:font-light', // LG on mobile → sans; XL on sm+ → serif
> };
> ```

**Why this matters:** the **serif-at-XL** rule is the editorial-elegance signature. H3 *responsively switches typeface* — at mobile it stays sans-medium (readable at small sizes), at `sm:` and up it adopts serif-light (cohere with H1/H2). This is one of the most considered details on the page.

Hero heading inline at `HeroSection.tsx:255-256`:

> ```tsx
> {/* Hero heading - text-3xl (48.8px) - Noto Serif Light for editorial elegance */}
> <motion.h1 className={`font-serif text-[1.953rem] sm:text-[2.441rem] md:text-[3.052rem] font-light leading-[1.2] tracking-[-0.02em]`}>
> ```

The comment names both the spec (`text-3xl` = 48.8px) and the *intent* (editorial elegance) at the point of use.

Body text at `HeroSection.tsx:267-268`:

> ```
> {/* Body text - text-sm (16px) - DM Sans for readability */}
> ```

Same pattern — spec + intent. The reader never has to guess.

---

## 4. Layout — sectionwrapper override pattern

`src/design-system/components/SectionWrapper.tsx:21-29`:

> ```
> * Override pattern:
> * Some sections need to suppress wrapper padding for edge-to-edge layout
> * (e.g. SampleReportPreview uses `!py-0` so the sidebar's vertical
> * border-r runs the full section height without padding gaps). In these
> * cases the section's internal content area must add its own compensating
> * padding (e.g. `py-10 sm:py-12 md:py-16`).
> ```

**Why this matters:** documents the **!important override** as a *named pattern with a reason* instead of a hack. The hack is then enforced consistently — the override and its compensation are both verbalised.

Compensating padding lives at `src/app/components/SampleReportPreview.tsx:18-25`, quoted verbatim already in 00_overview.md.

---

## 5. Background composition — light/dark mirroring

`src/app/components/CTASection.tsx:50`:

> ```tsx
> {/* Light variant backgrounds — mirrors dark composition 1:1 */}
> ```

And within the same block, every blob comment names the *dark counterpart* it's replacing (`:55-65`):

> ```
> {/* Top-left blob — warm (dark: coral/10, 600px) */}
> {/* Bottom-right blob — perano (dark: orange-accent/8, 700px) */}
> {/* Mid-right blob — coral (dark: coral-light/7, 400px) */}
> {/* Mid-left blob — black/neutral (dark: brand-red/6, 500px) */}
> ```

**Why this matters:** the light/dark variants weren't designed independently — they were **transposed from a single underlying composition**. Each blob is the *light-tonal-equivalent* of a dark blob in the same position. This is craft-level discipline.

Same pattern in `heroThemes.ts:118-139` (light theme glow comments):

> ```
> // Top-right — perano (cool light blue), bleeds off corner
> // Provides a cool "ambient light" feel on the card side
> ```
> ```
> // Bottom-left — periwinkle (medium purple), bleeds off corner
> // Creates diagonal color tension with glow 1
> ```
> ```
> // Center-right — content-icon (deep purple), subtle halo behind card area
> // Gives the preview card a "lit from behind" depth effect
> ```

Each glow is named *and* its compositional role described (ambient / tension / lit-from-behind). Theme-construction prose.

---

## 6. Animation choices — comments name the easing

`src/app/components/HeroSection.tsx:29-31`:

> ```ts
> // Easing function (easeOutCubic)
> const easeProgress = 1 - Math.pow(1 - progress, 3);
> setCount(Math.floor(easeProgress * target));
> ```

The math is uncommented one-liner-able, but the author labels it with the **named curve**. Anyone editing this knows what they're touching.

`HeroSection.tsx:139`:

> ```tsx
> transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
> ```

Staggered chart-bar animation — `delay: index * 0.1` is the standard stagger pattern, and `ease: "easeOut"` is named (not the default `ease: "linear"` you'd get if you forgot).

---

## 7. Button system — JSDoc as contract

`src/design-system/Button.tsx:5-55` — a 50-line JSDoc block defining variants, sizes, signature interactions, and 3 example invocations. Quoted highlights:

> ```
> * Design System Best Practices:
> * - ✅ Prop-driven API for maximum flexibility
> * - ✅ Accessible (ARIA labels, focus states, keyboard navigation)
> * - ✅ Motion respect (prefers-reduced-motion support)
> * - ✅ Consistent token usage (CSS variables from theme.css)
> * - ✅ Separated concerns (shimmer hook, AnimatedArrow component)
> *
> * Signature Interactions:
> * - Shimmer: ALWAYS active on all buttons (right-to-left sweep on hover)
> * - Arrow: ONLY for urgency CTAs (forms, redirects with time pressure)
> ```

**Why this matters:** "Shimmer ALWAYS / Arrow ONLY FOR URGENCY" is the kind of rule that propagates discipline. Brand-CTA + animated arrow is *the* visual signature of a Ken urgency CTA across the page.

`HeroSection.tsx:286-292` confirms it at call-site:

> ```tsx
> <Button
>   variant="brand"
>   size="sm"
>   animatedArrow={true}
>   className="font-sans font-bold w-full"
> >
>   Download Sample Report
> </Button>
> ```

`animatedArrow={true}` is explicit, not defaulted, even though there's an entire prop dedicated to it. The author is gesturing: "yes, urgency CTA, I checked."

---

## 8. Mobile-first breakpoint discipline

`HeroSection.tsx:284-345` — three separate JSX blocks for breakpoints:

> ```tsx
> {/* Mobile (<sm): sm size, flex-1 so both fill the row equally */}
> {/* Tablet (sm–md): md size, natural widths side by side */}
> {/* Desktop (md+): lg size, natural widths side by side */}
> ```

**Why this matters:** instead of one block with `className="text-sm md:text-base lg:text-lg"`, the author *triple-renders* the CTAs with different sizes per breakpoint. Heavy-handed but **gives different button sizes per breakpoint without responsive-Tailwind soup**. The intent (button size grows from sm → md → lg) is impossible to miss reading the JSX. And the size choice is *commented as intentional* at each block.

The desktop block also flips secondary→ghost on dark backgrounds (`:336-345`) — the only place this happens. (See `secondary-button-issue.md`.)

---

## 9. Decomposition reasoning

`src/app/components/SampleReportPreview.tsx:6-14`:

> ```
> * Sub-components (Tier 4 decomposition):
> *   - sample-report/data.ts                  — static data, types, constants
> *   - sample-report/SidebarTOC.tsx           — 3-state sidebar navigation
> *   - sample-report/ChapterExecutiveSummary  — Chapter 1 + stats
> *   - sample-report/ChapterMarketOverview    — Chapter 2 paywall
> *   - sample-report/ChapterExtendedTOC       — Chapter 9 extended TOC
> *   - ChapterMethodology.tsx                 — Chapter 11 (pre-existing)
> *   - mobile/MobileTOC.tsx                   — mobile-friendly TOC
> ```

**Why this matters:** the decomposition is *named* ("Tier 4") and the inventory is right there. Anyone arriving knows what to read. This is the kind of pointer comment that costs nothing and prevents an hour of grepping.

`App.tsx:16-20`:

> ```
> * Post-audit state (Feb 26, 2026):
> *   - Tier 4 decomposition complete (SampleReportPreview split into 6 files)
> *   - Tier 5 polish & accessibility complete
> *   - All sidebar, separator, and utility element colors verified against 92-5-3
> ```

Includes a **date stamp** and an **audit checklist outcome**. The page knows when it was last audited and against which rules.

---

## 10. Variant-driven theming — the heroThemes pattern

`src/app/components/heroThemes.ts:1-7`:

> ```
> /**
>  * Hero Section Theme Configuration - Design System VS 26
>  *
>  * Centralized theme variants using design system tokens.
>  * All colors reference the design system for maintainability.
>  */
> ```

The `HeroTheme` interface (`:12-47`) is **22 fields long** — name, background, textColor, subtitleGradient, bodyText, statText, statLabel, buttonBackground, badgeVariant, previewCardBg, previewCardBorder, previewCardText, 4 cardDecor fields, 3 modalAccent fields, 4 badge fields, glows array. Every visual surface a variant might affect has a named slot.

**Why this matters:** by enumerating every slot a theme can fill, the author makes *all themes guaranteed-complete*. Adding a 5th theme can't accidentally miss a surface — the type system requires every field.

---

## Pattern summary

What makes this codebase "proper reasons of everything" is the **consistent application of five disciplines**:

1. **Rule-of-thumb declared centrally** (the 92-5-3 in `tokens.ts`), **applied with explicit justification at every call-site**.
2. **Override hacks named as patterns** with their compensating fix (the `!py-0` example).
3. **Quantitative compliance cited** (10% opacity ≤ 3% accent budget).
4. **Role-based classification beats lexical** (ChevronRight as bullet vs nav).
5. **Decisions dated and audited** (`Post-audit state (Feb 26, 2026)`).

The result is a codebase that *teaches as you read it* — and which the user trusts as a reference precisely because every line earns its place by saying *why* it is there.

The one exception, the one place where the *application* of the rule produces a visually-wrong outcome, is the secondary button. See `secondary-button-issue.md`.
