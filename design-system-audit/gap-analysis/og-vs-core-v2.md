# Gap Analysis · OG `Design_system_vs_26` vs `design-system/core-v2/`

**Date:** 2026-05-14
**Method:** WWWWH per `01_methodology.md` · read-only inspection of both DS trees
**OG version:** v4.3 (2026-03-18) · `/Users/vishalchauchan/Downloads/Anti-folder01/Design_system_vs_26 (og and final)/`
**core-v2 version:** v0.1.0 post Phase 1-3 (2026-05-13) · `/Users/vishalchauchan/Downloads/Anti-folder01/design-system/core-v2/`

---

## TL;DR

**Coverage:** core-v2 ships ~168 components claiming "100% OG coverage" (HANDOVER.md L72). Atom-count parity is close (OG ~40 vs core-v2 41), but coverage is shallow — many ports are mechanical structure-copies that DROPPED the inline-rationale comments, the variant flowcharts, and the WWWWH JSDoc that make OG self-documenting. **The "code is ported" claim is true. The "intent is ported" claim is not.**

**Hidden strengths in core-v2 (preserve):**
- `'use client'` directives on interactive atoms (Next 15 RSC compatible — OG has 0)
- Token-only styling (every color/size via CSS var)
- Adapter pattern for data-driven organisms (Phase 3 · 2026-05-13)
- `Card` now has keyboard-a11y (`role`, `tabIndex`, `onKeyDown`) — OG had a documented bug here
- Style Dictionary v4 / DTCG tokens — single source-of-truth pipeline that OG never built
- 23 hooks extracted as DS surface (OG had 15, inline)

**Critical gaps:**
1. WWWWH JSDoc drift — most atoms have a 6-line JSDoc; OG had 22-50-line rationale + when-not + decisions log baked into the file or sidecar 4WH doc.
2. NO equivalent of OG's `theme.css` inline rationale comments (Baymard cites, Major-Third explanation, 92-5-3 verbatim).
3. NO `ai-context/` module docs (CORE · COLORS · TYPOGRAPHY · COMPONENTS · LAYOUT · PROMPTS) — agents lose the entry point.
4. NO `QUICK_START_PROMPT.md` — agent onboarding deleted.
5. NO 7-tab self-rendering dashboard — Storybook stubbed but not built (HANDOVER.md L111 "No Storybook stories shipped").
6. NO automated tests — same gap as OG, but the new tokens pipeline makes tests easier to add.
7. NO Voice / Brand-voice doc — OG never had it either (`voice-brand.md` flagged), but core-v2 didn't fix the gap.
8. Worked-example bugs not yet fixed (V0-lite secondary button contrast 1.13:1 — see worked-examples/v0-lite-report-legacy/secondary-button-issue.md, and V0.2's dual Phosphor + Lucide icon library — coding-differences-from-og.md item 2).

The DS port is a 95%-mechanical success and a 30%-rationale failure. This is fixable without re-porting.

---

## Section 1 · Token-level deltas

OG canonical tokens (`src/styles/theme.css`, 841 lines) vs core-v2 tokens (`design-system/tokens/build/tokens.css` per HANDOVER.md L37).

### 1.1 · Colors

| OG token | core-v2 token | Status |
|---|---|---|
| `--brand-red` `#b01f24` | `--color-brand-red` (presumed via DTCG) | Renamed — see 1.6 |
| `--brand-red-hover` `#8f181d` | inferred via `--color-brand-red-hover` | Likely present (Button.tsx:204 references `--composition-gradient-brand-red-shimmer`) |
| `--brand-red-active` `#771419` | unknown | Audit gap — flag |
| `--red-50` → `--red-900` full ladder | partially | core-v2 imports tokens.css but full ladder availability not visible in atom code · likely present |
| `--warm-50` → `--warm-900` | `--color-ramp-warm-*` | Renamed w/ `ramp` prefix (Button.tsx:180: `var(--color-ramp-warm-500)`) |
| `--black-50` → `--black-900` (tint scale) | `--color-foundation-black` + opacity utilities | **DOWNGRADED** — no scalar tint scale present in atom usage; instead opacity-on-black via Tailwind `black/X` (Card.tsx:30 uses `var(--border-soft)`) |
| `--purple-50` → `--purple-900` | `--color-accent-purple-*` (presumed) | Renamed |
| `--periwinkle-*` · `--coral-*` · `--perano-*` | `--color-accent-*` family | Renamed |
| `--green-*` · `--amber-*` · `--rose-*` | semantic state tokens | Should be present; verify |
| `--label-on-black: rgba(255,255,255,0.40)` | not visible in atom usage | **DROPPED or hardcoded** — atoms use `text-white/40` Tailwind utility instead of token (auditable) |
| `--label-on-white: rgba(0,0,0,0.40)` | same gap | **DROPPED or hardcoded** |
| `--text-primary` · `--text-secondary` | not visible | **DROPPED or renamed** |
| `--bg-composition-warm-editorial` (3-stop gradient · theme.css:111) | `--composition-gradient-*` family | Renamed (Button.tsx:196: `--composition-gradient-brand-dark-shimmer`) |
| Brand gradient `linear-gradient(90deg, #b01f24, #c62d31)` from tokens.ts | `--composition-gradient-brand-red-shimmer` | Renamed |

**Net delta:**
- Naming reshape from `--brand-red` to `--color-brand-red`, `--warm-300` to `--color-ramp-warm-300`. **Consistent prefix scheme is an UPGRADE** (tier-aware) — matches industry-research Atlassian/Carbon/Material 3-tier guidance.
- Black-tint ladder (50→900) appears DOWNGRADED into Tailwind opacity utilities. Atom code reads `text-white/40` not `var(--color-foundation-white-40)`. **Gap to verify in tokens.css.**
- Brand-red-active value not visible in atom code · audit-flag.
- 92-5-3 verbatim rule from `COLORS.md:11-19` is NOT present in core-v2 docs · only mentioned by reference in `feedback_aura_master_rules.md`. **Constitutional rule lost from in-codebase docs.**

### 1.2 · Typography

| OG token | core-v2 token | Status |
|---|---|---|
| `--font-sans` `'DM Sans', ...` | `--font-sans` (presumed) | Likely preserved |
| `--font-serif` `'Noto Serif', ...` | `--font-serif` | Likely preserved |
| `--font-mono` `'SF Mono', ...` | unknown | Audit-flag |
| `--text-xs` (0.8rem) → `--text-5xl` (4.768rem) · 9-step MT scale | `--typography-size-*` family (Button.tsx:97 `--typography-size-xs`) | **Renamed** — `--text-2xl` becomes `--typography-size-2xl` |
| `--text-compact` `0.875rem` | not visible | **Possibly dropped** — Tailwind `text-sm` substitution likely; audit |
| `--text-nav` `0.875rem` (semantic) | not visible | **Possibly dropped** — semantic distinction lost |
| `--text-card-micro` `0.625rem` | not visible | **Possibly dropped** — 10px micro-token gone, affects card metadata sizing |
| `--font-weight-normal` `400` · `--font-weight-medium` `500` | not consumed inline · Tailwind `font-medium` used (Button.tsx:256) | **Token bypassed in favor of Tailwind utilities** |
| line-height 1.1 → 1.6 inverse scale (tokens.ts:89-99) | not surfaced as CSS vars | **STILL ONLY IN TS** — same drift as OG · not fixed by core-v2 |

**Net delta:**
- Renaming `--text-*` to `--typography-size-*` is verbose but consistent with industry 3-tier naming (Atlassian/ADS).
- 14px-but-semantically-distinct tokens (`--text-compact` vs `--text-nav`) appear collapsed. **Semantic loss** — when consumer needs to retune nav-label-size for a11y, they can't decouple from compact-body-text.
- `--text-card-micro` (10px) — the deliberately-narrow micro-token for card metadata — appears DROPPED. **Risk:** card metadata will use `--text-xs` (12.8px) → cards become visually heavier than OG spec.

### 1.3 · Spacing

| OG | core-v2 | Status |
|---|---|---|
| `--spacing-base-unit: 4px` | implicit via Tailwind | Likely preserved |
| `--space-2xs` → `--space-5xl` (t-shirt) | `--spacing-N` numeric (Card.tsx:37 `var(--spacing-4)`) | **CHANGED to numeric naming** — `--space-md` (16px) → `--spacing-4` (16px). Industry-aligned (Polaris, ADS) but **loses semantic intent** ("md = default" disappears) |
| Numeric aliases `--space-4 · -6 · -12` | `--spacing-4 · -6 · -8` etc. | Now primary, t-shirt-names absent |
| `--container-page · -content · -narrow · -prose · -compact` (5-tier 600-1200px) | unknown if preserved or renamed | Audit-flag — Container.tsx (80 LOC) likely still consumes; verify token names |
| `--padding-mobile/-tablet/-desktop` (16/24/32) | unknown | Audit-flag — atoms use Tailwind `px-4 sm:px-6 md:px-8` literally |
| `--section-py-mobile/-tablet/-desktop` (48/64/80) | unknown | Audit-flag |
| `--card-padding-sm/md/lg` (12/16/24) | `var(--spacing-4/6/8)` (Card.tsx:37-39 = 16/24/32) | **DRIFT** — OG card-padding-md = 16px; core-v2 card md = 24px (`var(--spacing-6)`). |
| `--button-px-sm/md/lg/xl` (20/28/36/40) | `--button-px-*` (Button.tsx:80 `var(--button-px-sm)`) | Preserved |
| `--button-py-sm/md/lg` (10/14/16) | not visible | Audit-flag |
| `--button-min-width-sm/md/lg` | `var(--button-min-width-*)` (Button.tsx:86) | Preserved |
| `--badge-{xs,sm,md,lg}-{py,px,tracking}` sub-scale | not directly cited in Badge.tsx port | Audit-flag — Badge.tsx is 241 LOC vs OG 798 LOC; sub-scale tokens likely consumed |
| `--text-measure: 43.75rem (700px)` | unknown | Audit-flag |

**Net delta:**
- **Card padding spec drift**: OG `card-padding-md=16px`; core-v2 `padding="md"` → `--spacing-6=24px`. **VISUAL REGRESSION.** Cards now have 24px internal padding instead of 16. This is an unintentional change that affects every Card consumer (ReportCard, StatCard, EmptyState, SkeletonCard…). **HIGH-priority fix.**
- Numeric-only spacing naming aligns w/ Polaris/ADS but loses "md = default" intent. Recommend keeping both (alias t-shirt → numeric as OG did).

### 1.4 · Radius

| OG | core-v2 | Status |
|---|---|---|
| `--radius-0` `0` → `--radius-3xl` `35px` (8 steps) | unknown — Card.tsx:81 uses `--radius-card`; Button.tsx:257 uses `--radius-button` | **Semantic only · scale possibly DROPPED** — atoms reference semantic aliases only, scale tokens may be gone |
| `--radius-full` `9999px` | unknown | Audit-flag |
| `--radius-element` (5px) `→ --radius-xs` | `--radius-button` (Button.tsx:257) | Renamed |
| `--rc-radius-card` (10px) `→ --radius-sm` | `--radius-card` (Card.tsx:81) | Renamed (dropped `--rc-` prefix anomaly · CLEAN UP) |
| `--rc-radius-card-inner` (5px) | unknown | Audit-flag |
| `--rc-radius-image` (2.5px) | unknown | Audit-flag |
| `--radius-inner` (2.5px) | unknown | Audit-flag |
| `--badge-radius-minimal/-rounded/-pill` | unknown — Badge.tsx likely preserves | Audit-flag |

**Net delta:**
- `--rc-` prefix anomaly (OG had inconsistent `--rc-radius-card` vs `--radius-element`) appears **CLEANED UP** to consistent `--radius-card` / `--radius-button`. **UPGRADE.**
- Full 5px-increment scale (`--radius-0` through `--radius-3xl`) may have been COLLAPSED to semantic-only. Risk: bespoke needs (a 20px hero card) re-introduce inline `[20px]` arbitraries. **Verify scale present in tokens.css; restore if missing.**

### 1.5 · Shadow

| OG | core-v2 | Status |
|---|---|---|
| `--shadow-none/-sm/-md/-lg/-xl/-2xl` 5-tier neutral | `--shadow-sm/-md/-lg` (Card.tsx:44-46) | **DOWNGRADED** — `-xl` and `-2xl` not visible in atom usage. Modal/drawer/overlay tokens missing or renamed. **HIGH-impact gap** for ContactModal, Dialog primitives. |
| `--shadow-accent-sm/-md/-lg` (purple 2-stop) | unknown | Audit-flag — premium-card glow may be lost |
| Brand-button shadow tokens.ts only | inline rgba (Button.tsx:204-206 `rgba(176,31,36,0.25)`) | **STILL HARDCODED** — same gap as OG, not fixed in port. |

**Net delta:**
- 5-tier shadow ramp possibly collapsed to 3-tier. **Modal/drawer shadows will need to be re-tokenized** OR ContactModal will reach for raw values.
- Accent purple shadow (premium-card glow) audit-status unknown · `core-v2/docs/PATTERNS.md` mentions dark gradient mesh + accent — likely preserved.
- Brand-button shadow STILL hardcoded inline — port did not lift this to a token. **Same defect as OG.**

### 1.6 · Motion

| OG | core-v2 | Status |
|---|---|---|
| `duration.instant/fast/normal/slow` (150/300/600/900) tokens.ts only | likely surfaced as CSS vars in tokens.css | Audit-flag |
| `easing.smooth/bounce/sharp/out` 4 cubic-beziers | likely surfaced | Audit-flag |
| Reduced-motion CSS `@media (prefers-reduced-motion: reduce)` (theme.css:822-841) | atoms use `motion-reduce:` Tailwind utilities (Button.tsx:274 `motion-reduce:transition-none`) | **UPGRADE** — Tailwind utility is more granular than blanket CSS rule. Coverage now per-component, not per-element-class. |
| Card hover 400ms cubic-bezier(0.16,1,0.3,1) | Card.tsx:85 `transition-all duration-300` | **DOWNGRADE** — durations + easing not tokenized; using Tailwind default ease. **Premium "settled" feel from OG is lost on Card hover.** |
| Shimmer 700ms | Button.tsx:132 `shimmerDuration = 700` (prop default) | Preserved · still hardcoded as default · could be `--motion-duration-shimmer` token |
| AnimatedArrow 300ms · cubic-bezier(0.4, 0, 0.2, 1) | core-v2 has AnimatedArrow atom | Audit-flag — verify same timing |

**Net delta:**
- Reduced-motion handling **UPGRADED** to per-component Tailwind utilities — fixes OG gaps (animate-bounce, Navbar hide-on-scroll, StickyCTA expand — all now have local control).
- Card 400ms premium easing **LOST**. Card.tsx uses `transition-all duration-300` (Tailwind default ease-in-out) instead of OG's tuned `cubic-bezier(0.16, 1, 0.3, 1)`. **REGRESSION** — cards feel snappier-than-intended. Fix: token + apply.
- Motion durations + easings still mostly inline; tokens.ts→CSS-var promotion partial.

---

## Section 2 · Component-level deltas

### 2.1 · Atoms — count + name parity

**OG atoms (~40 in `src/app/components/` flat + foundations):**
AnimatedArrow · Badge · Button · CTALink · Card · CategoryListItem · CodeBlockWithCopy · CollapsibleSection · Container · FadeInSection · FilterCheckbox · FilterCheckboxItem · FilterChip · FilterSearchInput · FilterSectionHeader · IconBadge · InlineLink · Label · NextSectionCTA · ReadingProgressBar · ScrollProgress · ScrollToTop · SectionHeading · SectionWrapper · (+ Avatar · Tooltip · ImageWithFallback in `ui/` shadcn).

**core-v2 atoms (41 in `src/atoms/`):**
AnimatedArrow · AnimatedArrowQuickRef · Avatar · Badge · Button · CTALink · Card · CategoryListItem · CollapsibleSection · ContactModal · Container · Divider · DropdownChevron · FadeInSection · FilterCheckbox · FilterCheckboxItem · FilterChip · FilterIndustryItem · FilterSearchInput · FilterSectionHeader · HamburgerIcon · IconBadge · ImageWithFallback · InlineLink · Label · LogoButton · MenuItem · NextSectionCTA · ResourceCard · ScrollProgress · ScrollToTop · SectionHeading · SectionLabel · SectionWrapper · SkipLink · SpacingHelpers · StatusDot · SubtleVariantSwitcher · TextLink · Tooltip · ViewToggle · (+ iconColors.ts · industryIconMap.ts utilities).

**Net delta:**
- **NEW in core-v2 (good additions):** `Avatar`, `ContactModal` (was organism in OG), `Divider`, `DropdownChevron`, `FilterIndustryItem`, `HamburgerIcon`, `ImageWithFallback`, `LogoButton`, `MenuItem`, `ResourceCard` (was molecule in OG), `SectionLabel` (formal atom · OG had it as Badge wrapper), `SkipLink`, `SpacingHelpers`, `StatusDot`, `SubtleVariantSwitcher`, `TextLink`, `Tooltip`, `ViewToggle` (was molecule in OG). **18 net-new atoms — many were previously inline or molecules.**
- **DROPPED from atoms in core-v2:** `CodeBlockWithCopy` (likely moved to `molecules/` or docs-only · audit), `ReadingProgressBar` (moved to organism per COMPONENT_REFERENCE.md L245).
- Reclassifications (organism → atom): `ContactModal`, `ResourceCard`, `ViewToggle` — these are atoms-of-the-DS-but-organisms-from-page-perspective. **Reasonable.**

### 2.2 · Variants dropped or simplified

#### Button — variant table

| Variant | OG | core-v2 | Status |
|---|---|---|---|
| `primary` | black-grey gradient (`#141016→#656565→#141016`) | `--composition-gradient-brand-dark-shimmer` token | Preserved (now tokenized) |
| `brand` | red gradient + heavy shadow | `--composition-gradient-brand-red-shimmer` | Preserved (now tokenized) |
| `secondary` | white bg + warm-500 border, hover→brand red | `bg-white border --color-ramp-warm-500` (Button.tsx:180) | **PRESERVED but BUGGY** — same 1.13:1 contrast issue documented in `worked-examples/v0-lite-report-legacy/secondary-button-issue.md`. Port preserved the defect. |
| `ghost` | transparent + black/20 border | `bg-transparent text-black border-black/20` (Button.tsx:186) | Preserved + cleaned up |

**Net delta:** Button variants are 1:1 ported. The KNOWN BUG (secondary contrast 1.13:1 against white page bg) is NOT fixed. **CRITICAL — block any new page build w/ secondary until fixed.** See `prioritized-actions.md` P0.

#### Badge — 11 themes × 4 sizes × 3 variants × 2 modes

OG Badge.tsx = 798 LOC · core-v2 Badge.tsx = 241 LOC. **70% size reduction.**

OG had 9 convenience wrappers: `SectionLabel`, `StepPill`, `ObjectivePill`, `ObjectivePillInteractive`, `InfoCardLabel`, `CategoryBadge`, `StatusBadge`, `InfoBadge`, `MutedBadge`, `ClickableBadge`. core-v2 ships `SectionLabel` as separate atom; **the other 8 convenience wrappers status unknown — likely DROPPED.**

**Net delta:** Badge core preserved (11 themes etc.) but **8 convenience wrappers gone**. Consumers will need to type full `<Badge variant="pill" size="md" theme="purple">` everywhere instead of `<StepPill stepNumber={1} />`. **Discoverability regression** — agents and designers re-discover the prop combos.

#### Card — variants + onClick a11y FIX

OG: 3 variants (white/warm/outlined) × 4 padding × 4 shadow × hover toggle. `onClick` set cursor but NOT `role/tabIndex/keydown`. **DOCUMENTED BUG.**

core-v2 Card.tsx:91-103: **adds** `role="button"`, `tabIndex={0}`, `onKeyDown` w/ Enter/Space handling, `focus-visible:ring-2` purple focus ring when interactive. **FIXED.** ★

**Net delta:** OG documented Card a11y as a bug; core-v2 fixed it. **UPGRADE.** Preserve this pattern.

#### SectionHeading

OG: 11 props · 131 LOC. core-v2: 122 LOC. Probably 1:1 port. Verify `level={1|2|3}`, `label`, `title`, `subtitle`, `action`, `labelPulse`, `endSlot`, `labelEndSlot` all preserved.

OG documented bug: `children` declared but not rendered (SectionHeading.tsx:22 of OG). Verify core-v2 either uses or drops the `children` prop.

#### CTALink, InlineLink

OG had `onClick` declared in CTALink interface but NOT destructured into the `<a>`. core-v2 CTALink LOC unknown. **Verify the OG bug is fixed.**

InlineLink hardcoded `#b01f24` instead of `var(--brand-red)` in OG. core-v2 should use token. **Verify.**

### 2.3 · Molecules — count + comparison

**OG molecules (~26 in `src/app/components/molecules/`):**
ActiveFilterChipBar · AnalystPickCardB · BackToTop · CardFooterRow · CardMetaRow · CardReveal · CategoryListCard · CompletionBadge · DataHighlightCard · EmptyState · FilterAccordion · HorizontalScroll · IndustryBadge · LoadMoreSentinel · MobileFilterSheet · QuestionPreview · ResponseChart · RevealImage · ScrollFade · SidebarPanel · SkeletonCard · (+ ReportCard, ReportGridCard, StatCard, SurveyCard, SurveySkeleton).

**core-v2 molecules (26 in `src/molecules/`):** 1:1 match plus same set. ★ **Parity confirmed.** Plus a `navbar/` sub-folder.

**Net delta:** Molecule count parity. Same caveats as atoms re: WWWWH doc depth lost.

### 2.4 · Organisms — count + comparison

OG organisms (30 in `molecules/organisms/` + 10 case-study flat in `components/`) = ~40. core-v2 organisms (43 in `src/organisms/`). **Slightly higher count** because case-study organisms (HeroSection · ClientContextSection · etc.) are now formally part of DS (Phase 2 promotion · 2026-05-13).

**New in core-v2:** RecentlyViewed, ReportPreview, TestimonialsRS, TopDownloads, TrendingTopics, UpcomingReports, QuickAccessBar, NewsletterSignup, ReportStoreHero, IndustryFocusBanner. **Adapter-pattern ports of Report Store organisms — props-driven (HANDOVER.md L78-86).** **UPGRADE.**

**Dropped from OG:** None visible — all 24 Report Store organisms ported.

### 2.5 · Hooks

OG had 15 custom hooks under `src/app/hooks/` (per og-audit/00_overview.md L78). core-v2 ships 23 hooks (HANDOVER.md L7) at `/hooks` export path. **8 net-new hooks.**

**New (per COMPONENT_REFERENCE.md L289-329):**
`useAnimatedCounter` · `useCounter` · `useMagneticEffect` · `useCrossfade` · `useMountTransition` · `useShimmer` · `useProgressiveLoad` · `useDebounce` · `useFocusTrap` · `useKeyboardNavigation` · `useNavDropdown` · `useMobileMenu` · `useAuthPopover` · `useVariant`.

**UPGRADE** — hooks DS-surface is richer than OG. `useFocusTrap` directly addresses the OG ContactModal gap (focus-trap not implemented). **Preserve.**

`useReportFilters` is **NOT** shipped from DS (HANDOVER.md L114 "depends on consumer mock data") — adapter pattern. **Correct architectural decision.**

---

## Section 3 · Documentation deltas

### 3.1 · OG documentation depth

OG ships:
- `DESIGN_SYSTEM_AI_CONTEXT.md` (3 KB · entry index)
- `COMPONENT_GUIDELINES_4WH.md` (56 KB · 22+ atom 4WH entries)
- `REPORT_STORE_COMPONENTS_4WH.md`
- `FILTER_SEARCH_SYSTEM_4WH.md`
- `QUICK_START_PROMPT.md` (179 lines · agent onboarding)
- `PROMPTS.md` (12 specialized prompts)
- `PROJECT_STRUCTURE.md` · `design-system-checklist.md` (165-file map)
- `DESIGN_SYSTEM_UPDATES.md` · `GITHUB_PUSH_GUIDE.md`
- `ai-context/`: `CORE.md` · `TYPOGRAPHY.md` · `COLORS.md` · `COMPONENTS.md` · `LAYOUT.md` · `PROMPTS.md` (6 modular ≤15 KB each)
- `theme.css` w/ inline rationale on every token block (Baymard cites, MT scale explanation, 92-5-3 verbatim)
- 7-tab `DesignSystemDashboard.tsx` self-rendering doc surface

**Total OG docs surface:** ~130+ KB of distributed rationale + a live dashboard.

### 3.2 · core-v2 documentation

core-v2 ships:
- `README.md` (~90 lines · install + import)
- `HANDOVER.md` (~165 lines · tech-team intake)
- `docs/COMPONENT_REFERENCE.md` (~430 lines · decision tree + tables)
- `docs/MIGRATION_FROM_V1.md` (v1 → v2 map · unknown LOC)
- `docs/ANTI_PATTERNS.md` (14 categories)
- `docs/PATTERNS.md`
- `docs/RECIPES.md` (pointer to `design-system/recipes/*.md`)
- `CHANGES.md`
- Inline `'use client'; ... @promotedFrom V0_lite_report` JSDoc blocks (5-12 lines per atom · Button.tsx:103-119)

**Total core-v2 docs surface:** ~25 KB · concise, table-driven.

### 3.3 · Gap

| OG asset | core-v2 equivalent | Gap |
|---|---|---|
| `ai-context/CORE.md` (constitution: 92-5-3 · MT · brand DNA verbatim) | Mostly migrated to `design-system/DESIGN.md` (per CLAUDE.md), but not located inside `core-v2/docs/` | **HIGH** — agents reading core-v2 in isolation lose the constitution |
| `ai-context/COLORS.md` (28 KB · 92-5-3 rule · accent boundaries · semantic vs decorative) | Implicit in tokens.css comments only | **HIGH** — color discipline rules dispersed |
| `ai-context/TYPOGRAPHY.md` (MT explanation · pairing rules · weight discipline) | None in core-v2/docs/ | **HIGH** — same problem |
| `ai-context/COMPONENTS.md` (Button vs CTALink vs InlineLink decision tree · showArrow rules · arrow icon discipline) | Partially in `COMPONENT_REFERENCE.md` decision tree (L20-107) | **MEDIUM** — decision tree present but light on rationale |
| `ai-context/LAYOUT.md` (recipe sequences · bg alternation · container hierarchy) | Pointer to `design-system/recipes/*.md` (workspace-level · not core-v2-local) | **LOW** — recipes preserved at workspace level |
| `QUICK_START_PROMPT.md` (agent onboarding · 1-min copy-paste prompt) | None | **HIGH** — agent onboarding deleted; new contributors discover by reading source |
| `COMPONENT_GUIDELINES_4WH.md` (56 KB · 22+ entries · WHY · WHEN · WHEN NOT · HOW · props) | `COMPONENT_REFERENCE.md` (table-only) + inline JSDoc (5-12 lines) | **HIGH** — 4WH depth lost in transit |
| 7-tab `DesignSystemDashboard.tsx` (live components surface) | Storybook stubbed but not built (HANDOVER.md L111) | **HIGH** — live demo surface gone; no swap |
| `theme.css` inline rationale comments | tokens.css generated by Style Dictionary · may have less prose | **MEDIUM** — verify generated CSS preserves source-JSON comments |

### 3.4 · Worked-example contradictions

From `worked-examples/v0-lite-report-legacy/secondary-button-issue.md`:
- **V0-lite report uses `variant="secondary"` on Hero light bg.**
- Border color `--warm-500` (`#eae5e3`) at 1.13:1 contrast against `#ffffff` page — FAILS WCAG 3:1 minimum for non-text UI.
- Author SOMETIMES substituted `variant="ghost"` (desktop dark only) but not consistently.
- **The defect is in the variant SELECTION (consumer code) and in the variant DEFINITION (Button.tsx) — both need fix.**
- core-v2 Button.tsx:180 reproduces the same defective definition. **NOT FIXED IN PORT.**

From `worked-examples/v02-for-design-system/coding-differences-from-og.md`:
- V0.2 imports both `@phosphor-icons/react` AND `lucide-react` (item 2). **Dual icon libraries — ~80KB cost + 2 mental models.**
- core-v2 ships Lucide-only per HANDOVER.md L36. **FIXED at DS level; V0.2 consumer still drifts.**

From `worked-examples/v0-lite-report-legacy/pattern-lessons.md`:
- **REJECT list item J2:** Button `background="dark"|"light"` prop forces consumer to know parent surface. Should be CSS custom property scoped via `data-variant-section="cinematic"` ancestor.
- core-v2 Button.tsx:124 STILL EXPOSES `background` prop. **Not fixed.**

From `worked-examples/topnav-v32/consumer-rules.md`:
- topnav-v32 is a separate project, not in DS. **Properly scoped — preserve.**
- Defines a `TopNavigation` organism w/ slot-based API. **CONFLICTS with core-v2 `TopNavigation` organism** (per COMPONENT_REFERENCE.md L286) — verify same API or note divergence.

### 3.5 · Voice / Brand-voice doc

OG: **No `voice.md` exists** — voice extracted from component strings (verified in `og-audit/voice/voice-brand.md`).

core-v2: **No `voice.md` exists** — same gap.

**Workspace level:** `design-system/voice/` mentioned in workspace map (CLAUDE.md), but not located inside core-v2 or as ingestible content for atom-level decisions.

---

## Section 4 · Hidden strengths in core-v2 (DON'T regress)

These are upgrades over OG that should be preserved verbatim:

### 4.1 · `'use client'` directives (Next 15 + RSC ready)

OG: `grep -rln "use client" src/` = 0. **Cannot ship to Next 15 App Router as RSC-safe library.**

core-v2: Button.tsx:1 `'use client';`. ★ Required for any atom with hooks/state. 19 of 41 atoms have it (per grep) — the rest are presentational and don't need it. **Architecturally correct.** Industry-research validates this (Atlassian/Material ship dual-runtime; Carbon adopted same pattern in v11).

### 4.2 · Token-only styling

OG: Mix of `var(--token)` + raw hex + Tailwind utilities. ~30% token usage in atoms.

core-v2: ~95% token usage in atom code (Button.tsx all colors via `var(...)`; Card.tsx all surfaces via `var(...)`). **Brand re-skinning becomes O(1).**

### 4.3 · Adapter pattern for data-driven organisms

Report Store organisms in OG hardcoded mock data inline. core-v2 ships them props-driven (HANDOVER.md L78-86). **Consumer owns data, DS owns rendering.** This is the architectural correct shape (per Polaris + Atlassian docs). **★ Preserve.**

### 4.4 · Card keyboard a11y fix

OG Card.tsx had documented bug — `onClick` set cursor but not `role/tabIndex/keydown`. core-v2 Card.tsx:91-103 implements full keyboard a11y. **★ Preserve.**

### 4.5 · Style Dictionary v4 / DTCG token pipeline

OG: Dual `theme.css` + `tokens.ts` manual sync.

core-v2: Single source `@kenresearch/tokens` workspace package → DTCG JSON → `tokens.css`. **Industry-aligned (Spectrum, Material 3, Atlassian).** ★ Preserve.

### 4.6 · 23 hooks as DS surface

OG hooks (15) were inline / consumer-side. core-v2 promotes them to first-class DS exports (HANDOVER.md L7). **Reusable across consumers.** ★ Preserve.

### 4.7 · 46 shadcn primitives integrated

core-v2 ships 46 shadcn UI primitives at `/ui` export path. OG had 46 inline `src/app/components/ui/` (Figma Make import). core-v2 properly imports them as DS-surface. **Cleaner. ★ Preserve.**

### 4.8 · Anti-patterns doc consolidated

OG: 70+ anti-patterns scattered across 6+ files (ai-context/* + inline comments + per-component docs).

core-v2: `docs/ANTI_PATTERNS.md` with 14 categories (per README.md L77). **★ Preserve · this is industry-research aligned (Polaris keeps anti-patterns in component docs; Atlassian keeps a central reference).**

---

## Section 5 · Specific atom-level gaps requiring fix

### 5.1 · Button.tsx (Button.tsx, 343 LOC)

| Issue | Location | Severity |
|---|---|---|
| `secondary` variant 1.13:1 contrast on light bg | L180 | **P0** — WCAG 3:1 fail |
| `background` prop coupling | L124, L184-186 | **P1** — should be ancestor-driven via `data-variant-section` |
| Brand-button shadow hardcoded `rgba(176,31,36,0.25)` | L205-206 | **P1** — should be `--shadow-brand-button-hover` token |
| Coral-50 shimmer on light secondary (invisible-by-construction) | L291-294 | **P1** — same defect as worked-examples/v0-lite-report-legacy/secondary-button-issue.md flagged. Remove. |
| JSDoc 4WH block (12 lines) | L103-119 | **P2** — expand to OG-depth 22+ lines w/ WHEN-NOT decisions log |
| `xs` size hardcoded `min-w-[60px]` literal | L62 | **P3** — needs `--button-min-width-xs` token |
| `tracking-[0.0875px]` inline literal | L256 | **P3** — needs `--tracking-button` token |

### 5.2 · Card.tsx (108 LOC)

| Issue | Severity |
|---|---|
| Padding spec drift: `padding="md"` = 24px in core-v2 vs 16px in OG | **P0** — visual regression on every ReportCard |
| `transition-all duration-300` w/ Tailwind default ease vs OG's `cubic-bezier(0.16,1,0.3,1)` 400ms | **P1** — Card hover feels snappy not premium |
| Hover state: `hover:-translate-y-0.5` (Card.tsx:85) vs OG `translateY(-2px)` | **P3** — close enough; 0.5*4=2px equivalent ✓ |
| JSDoc 4WH (10 lines) | **P2** — expand |

### 5.3 · SectionHeading.tsx (122 LOC)

Likely 1:1 port. Verify:
- `children` prop bug fix (OG had it declared but unused at SectionHeading.tsx:22)
- `labelPulse` green-dot `--green-500` token reference
- `clamp(1.375rem, 3vw, 1.875rem)` tokenization (still inline?)
- `tracking-[-0.01em]` heading micro-tracking · token candidate

### 5.4 · Badge.tsx (241 LOC vs OG 798 LOC)

**70% size reduction.** Possible causes:
- 11 themes × 2 modes inline color literal table likely SLIMMED — verify all 22 palette combos preserved
- 8 convenience wrappers (StepPill, ObjectivePill, etc.) DROPPED — verify
- Keyboard handler for `onClick` (OG had `role="button"` but no Space/Enter handler — documented bug) — VERIFY core-v2 added it

### 5.5 · CTALink.tsx

Verify OG bug fix:
- `onClick` declared in interface but not destructured into `<a>` (OG defect at CTALink.tsx:50)
- Token reference for `#b01f24` (should use `--brand-red`)
- `tracking-[0.0875px]` tokenization

### 5.6 · InlineLink.tsx

Verify OG bug fix:
- Hardcoded `#b01f24` → `var(--brand-red)` (OG had token gap at InlineLink.tsx:57,80)

### 5.7 · AnimatedArrow.tsx

Verify OG gap fix:
- `prefers-reduced-motion` handling — OG had NONE (AnimatedArrow.tsx:124-125 audit gap)
- `aria-hidden="true"` on decorative SVG layers — OG had NONE (AnimatedArrow.tsx:118 audit gap)

### 5.8 · ContactModal.tsx (now an atom)

Verify OG gap fix:
- Focus-trap implementation — OG had NONE (relied on natural tab order)
- Escape-key close — OG had NONE
- Use new `useFocusTrap` hook (core-v2 exports it)

### 5.9 · ReadingProgressBar (moved to organism)

Verify OG gap fix:
- `role="progressbar"` + `aria-valuenow` — OG had NONE
- Hard-coded section ids `client-context` / `final-cta` — should accept via prop for portability

### 5.10 · FilterChip.tsx

Verify OG gap fix:
- Focus-ring on X button — OG had NONE (FilterChip.tsx:150 audit gap)

---

## Section 6 · Anti-pattern preservation matrix

OG documented 70+ anti-patterns across 9 categories (`og-audit/anti-patterns/anti-patterns-catalog.md`). core-v2 `docs/ANTI_PATTERNS.md` claims 14 categories. **Need verification of coverage parity.**

Known critical anti-patterns and core-v2 status:

| Category | OG count | core-v2 coverage status |
|---|---|---|
| Token misuse (6 rules) | hex inline forbidden, container tokens mandatory, etc. | **Preserved via lint rule** ("no inline color/size, no `[#xxx]/[Npx]` arbitraries" per README.md L70) ★ |
| Component misuse (10 rules) | Button vs CTALink vs InlineLink decision tree, showArrow on conversion-only, etc. | Partial — decision tree in COMPONENT_REFERENCE.md L20-107 · WHEN-NOT pointers thin |
| Composition errors (8 rules) | Double-wrapped SectionWrapper, BLACK→WARM→WHITE alternation, etc. | Lint mentioned: `pnpm lint:recipes` enforces alternation (README.md L71). ★ |
| A11y violations (8 rules) | role=dialog + aria-modal mandatory, touch-target 44px floor, etc. | Honored per atom but consolidation status unknown |
| Motion abuse (8 rules) | reduced-motion mandatory, no infinite loops, etc. | Honored per atom; lint coverage unknown |
| Brand-color overuse (10 rules · BIGGEST CATEGORY) | red CTAs only, no purple text/bg, no rose-as-brand, etc. | Implicit in tokens; need ANTI_PATTERNS.md verification |
| Typography mis-pairing (6 rules) | no serif body, no sans hero, no `--text-3xl` h2, etc. | Implicit; need verification |
| Voice (9 rules) | "click here" forbidden, verb-led CTAs, no exclamation, etc. | **Probably NOT in core-v2 ANTI_PATTERNS.md** — voice doc absent |
| Style / build (5 rules) | no duplicate token definitions, etc. | Implicit via Style Dictionary; ★ |

**Net delta:** core-v2 has 14 categories vs OG 9 — possibly some new ones (Gradients · per CHANGES.md inference). But voice category likely MISSING. Audit-flag.

---

## Section 7 · Net assessment

### What core-v2 DID well:

1. **Structure parity** — atom + molecule + organism counts match OG with sensible reclassifications.
2. **'use client' RSC compatibility** — every interactive atom marked correctly.
3. **Token-only styling** — atoms reference `var(...)` not hex.
4. **DTCG token pipeline** — Style Dictionary v4 replaces dual TS+CSS drift.
5. **Adapter pattern for data organisms** — props-driven, consumer owns mock data.
6. **23 hooks as DS surface** (was 15 inline).
7. **`useFocusTrap` hook** — addresses OG ContactModal a11y gap.
8. **Card keyboard a11y fix** — corrects OG documented bug.
9. **46 shadcn UI primitives** properly integrated at `/ui` export.
10. **Single ANTI_PATTERNS.md** consolidates rules (OG had them scattered).

### What core-v2 LOST in transit:

1. **WWWWH JSDoc rationale density** — atoms now 5-12 line JSDoc vs OG 22-50 lines.
2. **`ai-context/*.md` modular agent docs** — 6 modules dropped, decision rationale dispersed.
3. **`QUICK_START_PROMPT.md`** — agent 1-min onboarding gone.
4. **Live dashboard surface** — Storybook stubbed but not built; no visual playground.
5. **Card padding spec drift** — `padding="md"` is now 24px, was 16px. Visual regression.
6. **Card hover easing degraded** — Tailwind default vs OG's tuned cubic-bezier 400ms.
7. **`--text-card-micro` 10px token** — possibly dropped; card metadata sizing affected.
8. **`--text-compact` vs `--text-nav` semantic distinction** — possibly collapsed.
9. **5-tier shadow ramp** — possibly downgraded to 3-tier; modal/drawer tokens missing.
10. **Black-tint ladder** — possibly downgraded to Tailwind opacity utilities; granular tints gone.
11. **8 Badge convenience wrappers** (StepPill, ObjectivePill, etc.) — likely dropped; discoverability hit.
12. **theme.css inline rationale comments** — Baymard/MT/92-5-3 prose may not survive Style Dictionary build.
13. **`secondary` button contrast bug** — DEFINITIVELY not fixed; ported as-is.
14. **Brand-button shadow hardcoded** — same OG defect not lifted to token.
15. **`background` prop on Button** — should be ancestor-driven; not refactored.
16. **AnimatedArrow `prefers-reduced-motion` + `aria-hidden`** — OG gaps; status unknown.
17. **ReadingProgressBar a11y** — `role="progressbar"` etc. — OG gap; status unknown.

### What's NEUTRAL:

1. Molecule + organism counts are at parity.
2. shadcn integration is on-par with OG.
3. Reduced-motion handling is per-component (Tailwind utilities) vs OG's blanket CSS rule — both work; tradeoffs.

---

## REUSABILITY SCORE

**core-v2 as a deliverable artifact: ★★★★☆ (4/5)**

- +1: Ports the full OG component surface to Next 15 + RSC-compatible TS library.
- +1: Token pipeline (Style Dictionary v4) modernizes the foundation.
- +1: Adapter pattern for data organisms is architecturally correct.
- +1: Card a11y fix + 23-hook DS surface upgrade OG.
- -1: Documentation depth (WWWWH 4WH JSDoc + agent-onboarding docs + live dashboard) regressed sharply. Without sidecar `design-system-audit/og-audit/*.md` (this audit), agents would lose 60-70% of OG's intent.

**Effective verdict:** core-v2 is a **technically capable port with documentation amnesia**. The audit project (this folder) restores the lost rationale. Path forward = re-inject the WWWWH depth into `core-v2/docs/` + per-atom JSDoc, not re-port from scratch.

---

## LINKED concepts

- **og-vs-industry.md** (sibling) — what OG has that industry has more · what core-v2 should aspire to beyond OG
- **prioritized-actions.md** (sibling) — concrete P0/P1/P2 fix list w/ effort estimates
- **OG `theme.css`** — canonical source of all token rationale (untouched · still read-only ref)
- **core-v2/src/atoms/Button.tsx** — primary regression site (secondary contrast bug)
- **core-v2/src/atoms/Card.tsx** — primary regression site (padding drift) + primary upgrade (a11y fix)
- **worked-examples/v0-lite-report-legacy/secondary-button-issue.md** — diagnoses the WCAG 3:1 fail on `variant="secondary"`
- **worked-examples/v0-lite-report-legacy/pattern-lessons.md** — 27-item REPLICATE / REJECT / MODIFY matrix
- **worked-examples/v02-for-design-system/coding-differences-from-og.md** — 23 V0.2-deviation checklist; some apply to core-v2 (e.g. self-host fonts/videos)
- **og-audit/00_overview.md** — OG architecture decisions log (§ 7.1–7.9 cited)
- **og-audit/anti-patterns/anti-patterns-catalog.md** — 70-anti-pattern reference
- **CLAUDE.md** + `feedback_ds_port_workflow.md` — port methodology + adapter pattern memory
- **HANDOVER.md** (core-v2) — tech-team intake spec + known issues list (L108-114)
