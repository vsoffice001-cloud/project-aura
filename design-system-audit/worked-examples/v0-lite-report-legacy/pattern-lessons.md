# Pattern Lessons · V0_lite_report-legacy

> What the new DS should **REPLICATE**, **REJECT**, and **MODIFY** based on this worked example. Each entry: pattern name, evidence cite, recommendation, rationale.

The legacy project is a near-canonical reference but not perfect. This doc separates the **replicable craft** from the **legacy-export drift** from the **conceptually-sound-but-API-broken** patterns.

---

## REPLICATE — patterns the new DS should adopt verbatim

### R1. The 92-5-3 colour hierarchy as a centrally-declared constitution

**Evidence:** `src/design-system/tokens.ts:305-329` defines the rule in prose. `iconColors.ts:23-34` repeats it with permitted/prohibited lists. Five+ call-sites cite the rule when justifying their colour choice.

**Recommendation:** Keep this rule **and the prose**. Put it in `design-system/DESIGN.md` and in a top-of-file comment in `design-system/tokens/build/tokens.css`. Anywhere a consumer might be tempted to pick "purple" or "red", the rule should be one scroll away.

**Why:** the rule's *effectiveness* comes from being declared centrally and re-cited locally. Both halves matter.

---

### R2. Element-Color Classification (role-based, not lexical)

**Evidence:** `iconColors.ts:9-22` — `ChevronRight` appears under **both** content icons (decorative bullet) **and** utility icons (nav). Same icon, different roles, different colours. `ChapterMethodology.tsx:14-22` confirms at call-site.

**Recommendation:** Adopt the role-classification language verbatim. Categories: utility/navigation, conversion-CTA, content-icon, decorative. The categorisation is *the* discipline that prevents "what colour should this be?" from being a 5-minute conversation.

**Why:** the lexical approach (`<ChevronRight/>` → "it's a chevron, what colour are chevrons") doesn't survive a multi-author codebase. Role-based survives.

---

### R3. Major Third typography scale with named roles per step

**Evidence:** `src/styles/theme.css:11-19` — each scale step has a *named usage*, not just a number. *"Card titles (2-3 cards)"* vs *"Card titles (4+)"* is the kind of micro-discipline that prevents drift.

**Recommendation:** Keep Major Third 1.25 (already mandated workspace-wide). Keep the *named-role* annotation in `theme.css` comments. Don't simplify to "xs/sm/md/lg" abstract names — the *role* is the whole point.

**Why:** font-size choices are otherwise the highest-drift surface in any DS. Naming roles arrests drift.

---

### R4. Serif-at-XL rule with mobile-responsive type-shift

**Evidence:** `SectionHeading.tsx:39-45` — H1/H2 always serif-light, H3 sans-medium on mobile and serif-light on `sm+`. The hero `font-serif text-[1.953rem] sm:text-[2.441rem] md:text-[3.052rem] font-light leading-[1.2] tracking-[-0.02em]` (HeroSection.tsx:256) is the editorial-elegance signature.

**Recommendation:** Bake the serif-at-XL rule into the workspace `SectionHeading`. Keep `tracking-[-0.02em]` for serif H1 (Noto Serif at light weight needs negative tracking to feel premium-tight).

**Why:** the type-shift gives mobile users readable body-density type without sacrificing desktop elegance. Most DS's ship one font choice and call it responsive — this one is genuinely thoughtful.

---

### R5. SectionWrapper override pattern (named hack + compensation)

**Evidence:** `SectionWrapper.tsx:21-29` — documents the `!py-0` override as a *named pattern* with compensating internal padding. `SampleReportPreview.tsx:18-25` cites the pattern when using it.

**Recommendation:** Replicate exactly. Workspace `SectionWrapper` already exists in core-v2; add this commented override-pattern documentation.

**Why:** hacks-as-patterns prevent the hack from being deleted by the next reader who doesn't know why it's there.

---

### R6. Theme-as-typed-config object (heroThemes pattern)

**Evidence:** `heroThemes.ts:12-47` — 22-field `HeroTheme` interface enumerates every visual slot a variant might fill (bg, text, body, stat, button, badge, card decor, modal accent, glows…). Type system forces every variant to fill every slot.

**Recommendation:** When the new DS adds variant-driven sections (cinematic vs editorial-light), use a typed config object with **every** themeable slot declared. Don't ship variants where some surfaces fall back to "previous theme's value."

**Why:** typed-config beats CSS-cascade for cross-cutting theme variants because adding a new variant *can't* miss a surface — the compiler refuses.

---

### R7. JSDoc as visual-component contract

**Evidence:** `Button.tsx:5-55` — 50-line JSDoc with signature interactions ("Shimmer: ALWAYS active / Arrow: ONLY for urgency CTAs") + 3 example invocations + prop-table. Every other DS component has similar prose (`SectionLabel.tsx:1-48`, `iconColors.ts:1-44`, etc.).

**Recommendation:** Adopt JSDoc-as-contract for every DS atom in core-v2. Signature-interactions and example invocations matter more than prop tables (TS gives you the props for free).

**Why:** the JSDoc *teaches the discipline as the consumer imports the component*. Consumers don't have to leave their editor to learn the rules.

---

### R8. Light/Dark composition mirroring

**Evidence:** `CTASection.tsx:50-82` — light-variant background blobs are positionally identical to the dark-variant blobs, just re-tonalised. Each blob comment names its dark counterpart.

**Recommendation:** When the new DS supports both cinematic-dark and editorial-light surfaces (per Ken's two-palette discipline), require new sections to **mirror** the composition across both, not redesign independently.

**Why:** users perceive a brand more deeply when light and dark feel like the same product photographed under different lighting, not two different products.

---

### R9. JSX-block breakpoint pattern for sized buttons

**Evidence:** `HeroSection.tsx:285-345` — three separate JSX blocks for `<sm`, `sm:flex md:hidden`, `hidden md:flex`, each rendering buttons at `size="sm"`, `"md"`, `"lg"` respectively.

**Recommendation:** **Replicate the pattern, but reduce friction.** Provide a `<Button size={{ base: 'sm', sm: 'md', md: 'lg' }}/>` API so consumers stop having to triple-render. Same visual result, one JSX block.

**Why:** the *intent* (button grows responsively) is correct; the *ergonomics* (three blocks, ~60 lines for two buttons) is unwieldy. Modify the API to express the pattern declaratively.

---

### R10. Decomposition reasoning + audit datestamps

**Evidence:** `App.tsx:16-20` — "Post-audit state (Feb 26, 2026): Tier 4 decomposition complete… Tier 5 polish & accessibility complete". `SampleReportPreview.tsx:6-14` — explicit list of decomposed sub-components.

**Recommendation:** Every top-level page composition file in `projects/*` should have a comment block with last-audit date + decomposition status. Match the workspace `HANDOVER_TRACKER.md` discipline.

**Why:** future readers (or future-you) need to know whether the file is "in flux" or "shipped." A datestamp is one line and saves a half-hour of git-blame archaeology.

---

## REJECT — patterns the new DS must not adopt

### J1. `variant="secondary"` as defined here

**Evidence:** `Button.tsx:200-204` — secondary on light = white bg + 1.13:1 warm-grey border. Essentially invisible against white page bg. Full diagnosis: `secondary-button-issue.md`.

**Recommendation:** Remove the variant entirely (or rename and rewrite). Collapse `secondary` + `ghost` into one outline variant with ≥3:1 contrast border.

**Why:** any "secondary CTA" that is invisible against its page bg fails its job as a CTA. The current design's contrast is below WCAG 3:1 minimum for non-text UI.

---

### J2. The `background="light"|"dark"` Button prop

**Evidence:** `Button.tsx:65, 92, 200-211` — `background` prop forces consumers to pass theme info (`HeroSection.tsx:297, 318, 339`).

**Recommendation:** Drop the prop. Use CSS custom properties scoped via `data-variant-section="cinematic"` or `data-theme="dark"` ancestor, and have Button styles read those.

**Why:** the consumer should never need to know what surface its parent is on. This couples Button to every theme config and is the root cause of the desktop-only ghost-substitution band-aid.

---

### J3. Coral-50 shimmer on light-bg secondary

**Evidence:** `Button.tsx:298-307` — a separate gradient layer painted in `var(--coral-50)` (#fffbf9) over a button whose hover bg is *also* `var(--coral-50)`. Invisible by construction.

**Recommendation:** Remove. If the new DS keeps any shimmer on a secondary/outline variant, it should be a *colour change*, not a same-colour overlay.

**Why:** dead code that consumes layout/paint cycles without producing visible output. Token-discipline failure.

---

### J4. Dual tokens.ts + theme.css token sources

**Evidence:** `tokens.ts` defines colours as TS constants; `theme.css` defines the same colours as CSS custom properties. Same hex values, two files, no enforced sync.

**Recommendation:** Single source — Style Dictionary v4 / DTCG (already in place at `design-system/tokens/`). Auto-generate both the TS and the CSS from one JSON.

**Why:** dual sources drift. The legacy project happened to keep them in sync by hand discipline; that's not scalable. Style Dictionary already exists workspace-wide.

---

### J5. `src/app/components/ui/` shadcn mirror inside the consumer project

**Evidence:** 47 shadcn component files inside the project (`accordion`, `alert-dialog`, `pagination`, `chart`, `sidebar`, `command`, etc.). Almost none are used by the actual page.

**Recommendation:** Consumers import shadcn atoms from the workspace DS (`@kenresearch/design-system/ui/*`) not from a local mirror. Per `LEGACY-READONLY.md:27` this is already in the discard list for the port.

**Why:** 47 unused files is dead weight + 47 future-update-required surfaces.

---

### J6. `src/github-push/` push-staging directory

**Evidence:** Directory exists at `src/github-push/src/app/components/` — pre-staging duplicates of `Card`, `ScrollProgress`, `ScrollToTop`, `SectionHeading`, etc.

**Recommendation:** Don't replicate in any new project structure. Git is the staging system; never duplicate inside the source tree.

**Why:** confuses readers, duplicates editing surface, no longer fits any tooling.

---

### J7. `figma:asset/` imports left in source

**Evidence:** `SlideshowSection.tsx:20-25` imports 6 slide images via `import slide1 from 'figma:asset/4867fa5985f8822dbd9b8ed8fbc9b6a9dc077214.png'`. The `figma:asset/` resolver is Figma-Make-specific and breaks outside that tool.

**Recommendation:** New projects use `next/image` w/ `public/` paths or proper static-asset imports. Strip Figma-Make resolver references at port time.

**Why:** non-portable, breaks builds outside the Figma Make environment.

---

### J8. Per-component CSS variable naming inconsistency

**Evidence:** Some components use Tailwind arbitrary `text-[var(--black-500)]` (Footer); others use named utilities like `text-utility-icon` (ReportHighlights); a third group hardcodes hex like `text-[#737373]` (SectionLabel.tsx:104). Three flavours, same colour.

**Recommendation:** Pick one. Tailwind-v4 token-utilities (`text-utility-icon`) is the clearest, ties to DTCG output, gives autocomplete.

**Why:** three flavours of the same value = three places to drift.

---

## MODIFY — patterns to keep with surgery

### M1. Button shimmer-always-on

**Current behaviour:** all variants get a shimmer (`Button.tsx:288-296` for brand/primary/ghost gradients; `:298-307` for secondary). The JSDoc says "Shimmer: ALWAYS active on all buttons" (`:21`).

**Modify how:** Keep shimmer on `brand` (it's the brand-signature) but make it **opt-in** elsewhere via a `shimmer` boolean prop (default `false`). Visually-loud surfaces (outline variants, ghost links) don't need shimmer; default-off is calmer and lets the brand-CTA still feel special.

**Why:** universal shimmer dilutes the signature. Limit the brand-CTA's superpower to the brand-CTA.

---

### M2. AnimatedArrow on urgency CTAs only

**Current behaviour:** opt-in via `animatedArrow={true}` (`Button.tsx:34, HeroSection.tsx:289`). JSDoc rule: "Arrow: ONLY for urgency CTAs."

**Modify how:** Keep the prop but **rename to `urgent` or `cta`** and have it auto-set on `variant="brand"`. The "urgency" semantic should be at the *button* prop level, not at the arrow level.

**Why:** today, every brand CTA on the page redundantly types `animatedArrow={true}`. The default for brand should be true.

---

### M3. Tier-4 decomposition pattern (chapters extracted into `sample-report/`)

**Current behaviour:** `SampleReportPreview.tsx` is orchestrator-only; chapters live as siblings. Comment block lists them.

**Modify how:** Adopt for any page-level composition >500 lines, but **scope sub-files into co-located folders** named after the parent organism. The legacy uses `sample-report/` (parent is `SampleReportPreview`); naming is slightly off. Use `<parent-name-kebab>/` for clarity.

**Why:** decomposition is correct; folder-naming could be tighter to make grep predictable.

---

### M4. `iconColors.content` / `iconColors.utility` constants

**Current behaviour:** TS constants imported and passed as `color={iconColors.content}` prop to lucide icons (`ChapterExtendedTOC.tsx:71`, `ReportHighlights.tsx:72`).

**Modify how:** Wrap into a `<ContentIcon>` / `<UtilityIcon>` helper component that pre-applies the color and a default `strokeWidth`. Consumers stop importing the colour constant + the icon — they import the wrapper that knows its role.

**Why:** today's pattern is correct but verbose. Wrapping makes role-classification *literally part of the component name*.

---

### M5. FloatingVariantSwitcher dev affordance

**Current behaviour:** `FloatingVariantSwitcher` shows on hero + slideshow + CTA section (`HeroSection.tsx:184-195`, `SlideshowSection.tsx`, `CTASection.tsx:89-94`). Lets the user toggle variants live.

**Modify how:** Keep for dev mode only. Gate on `process.env.NODE_ENV === 'development'`. Real users shouldn't see it.

**Why:** the switcher is a *brilliant* design-review affordance (toggle light/dark in-page without rebuilding) but a confusing widget for actual readers.

---

### M6. Animated counter (`useAnimatedCounter`)

**Current behaviour:** inline hook in `HeroSection.tsx:14-43`. Easeing curve hardcoded as `easeOutCubic`.

**Modify how:** Promote to `design-system/core-v2/hooks/useAnimatedCounter.ts`. Accept an `easing` arg with sensible default. The hero stat counter is genuinely a Ken-visual-signature interaction and should be reusable.

**Why:** the *implementation* is great; the *location* (one-off inline) is wrong.

---

### M7. Glass-morphism preview card

**Current behaviour:** `HeroSection.tsx:427-445` — backdrop-blur + bg-white/80 + rounded-[10px] + theme-driven border. Hover lifts the card via shadow + scale.

**Modify how:** Promote to a DS atom `PreviewCard` w/ theme-aware props. The same card concept will reappear in report-store listings and case-study heroes.

**Why:** the visual idiom ("frosted floating panel showing a peek of the product") is reusable across surfaces; today it's hardcoded in one place.

---

### M8. SectionLabel `style="pill"` vs `style="text"`

**Current behaviour:** `SectionLabel` has a `style` prop accepting `"pill" | "text"` (`SectionLabel.tsx:59`). Pill style draws a rounded outline; text style is just typography.

**Modify how:** Pick one default and one explicit-opt-in. Currently both styles ship with shimmer (pill) or pulse (text) animations — pick one motion language per style.

**Why:** two styles × two motions × two background contexts × two variants = 16 visual permutations of a single label component. Reduce.

---

## Summary table

| # | Pattern | Action | Risk if ignored |
|---|---|---|---|
| R1 | 92-5-3 hierarchy declared centrally | Replicate | Colour drift across surfaces |
| R2 | Role-based icon classification | Replicate | Lexical drift across icons |
| R3 | Major Third with named roles | Replicate | Font-size sprawl |
| R4 | Serif-at-XL with mobile shift | Replicate | Loses editorial signature |
| R5 | Named `!important` override pattern | Replicate | Hacks get deleted by next reader |
| R6 | Typed theme-config object | Replicate | Variants miss surfaces |
| R7 | JSDoc-as-contract | Replicate | Consumer drift |
| R8 | Light/dark composition mirroring | Replicate | Variants feel like different products |
| R9 | Responsive button size triple-render | Replicate (API-sugar) | Verbose call-sites |
| R10 | Decomposition reasoning + audit dates | Replicate | Reader archaeology |
| J1 | Current `secondary` variant | Reject | WCAG 3:1 failure on light bg |
| J2 | `background` prop on Button | Reject | Couples Button to every theme |
| J3 | Coral-50 shimmer on light-secondary | Reject | Dead paint cycles |
| J4 | Dual tokens.ts + theme.css | Reject | Token drift |
| J5 | Local shadcn mirror | Reject | 47-file dead-weight |
| J6 | `github-push/` staging dir | Reject | Source duplication |
| J7 | `figma:asset/` imports | Reject | Non-portable |
| J8 | Inconsistent CSS-var notation | Reject | Three flavours of one value |
| M1 | Universal shimmer | Modify (opt-in) | Brand signature dilution |
| M2 | `animatedArrow` prop | Modify (rename + auto-set) | Verbose brand CTA call-sites |
| M3 | Tier-4 decomposition | Modify (folder-naming) | Grep predictability |
| M4 | `iconColors.*` constants | Modify (wrap to component) | Verbose icon usage |
| M5 | FloatingVariantSwitcher | Modify (dev-only) | Real-user confusion |
| M6 | useAnimatedCounter | Modify (promote to DS) | Inline duplication |
| M7 | Glass-morphism preview card | Modify (promote to DS) | Re-implementation drift |
| M8 | SectionLabel pill+text styles | Modify (reduce permutations) | 16-state matrix |

---

## Final disposition

This project is a **near-canonical reference** for Ken's editorial-light report surfaces. Adopting the R-list verbatim and applying the J/M-list surgery gives the new `design-system/core-v2/` a foundation that *teaches discipline as you read it* without inheriting the legacy export's structural issues.

The single user-flagged defect (secondary button) is well-localised to one variant in one component — fixing it requires no architectural rewrite, just a variant collapse and a contrast-ratio gate. See `secondary-button-issue.md` for the surgical plan.
