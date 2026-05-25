# Anti-Patterns — Ken Research Design System

**Purpose:** Single source of "never do this" rules across tokens, color, typography, motion, copy, components, layout, accessibility, and tech.  
**Voice:** Foundations — instructive, exact, scannable.  
**Status:** Phase 1 — consolidates rules from `ai-context/CORE.md`, `voice/`, `motion/MOTION_SPEC.md`, `aura-design` skill, and observed bugs.

---

## How to use this doc

When designing or building anything for Ken Research:

1. **Skim category headings** for the rule area you're working in.
2. **Before shipping**, scan against your category's list — every "never" is a real bug source.
3. **If unsure whether a rule applies**, default to following it. Exceptions require named approval.

This is a **growing list**. New violations get logged here, not buried in chat history.

---

## Category 1 — Tokens

1. **Never hardcode hex colors** in components. Use `--color-*` token or `rgba(var(--color-*-rgb), alpha)`. (See `tokens.json`.)
2. **Never hardcode pixel values** for spacing, font size, or radius. Use `--space-*`, `--text-*`, `--radius-*` tokens.
3. **Never hardcode font families** in components. Use `--font-display`, `--font-body`, `--font-mono`.
4. **Never invent a token outside `tokens.json`.** If a value is needed and not there, add to `tokens.json` first, build, then use.
5. **Never use a Tailwind arbitrary class** (`text-[15px]`, `bg-[#abc]`) when a token exists. Tokens > arbitrary always.
6. **Never override a token value at component level** via inline style. Override at variant level (cinematic vs editorial) only.
7. **Never duplicate the same token under two names.** One source per value.

---

## Category 2 — Color

1. **Never use `--brand-red` (`#b01f24`) for anything except CTA buttons.** No decorative use, no body text emphasis, no border accents, no section dividers, no hover states on non-CTAs.
2. **Never break the 92-5-3 hierarchy.** 92% foundation (black/white/warm) · 5% brand (Ken Red) · 3% accent (purple/periwinkle/perano/coral). Audit any page that exceeds these ratios.
3. **Never use accent colors as primary text.** Accents are for badges, data viz, icons. Body text uses foundation only.
4. **Never use hex strings in inline `style` attribute.** Use `rgba()` or `var()`.
5. **Never use CSS shorthand for `border`, `background`, `font` in inline styles.** Use longhand (`borderTop`, `borderColor`, `backgroundImage`).
6. **Never use accent-teal `#00e5ff` outside cinematic dark variant.** Editorial light surfaces use purple as the primary accent.
7. **Never use blue (web-default link blue) anywhere.** Ken has no blue brand color. Replace any default browser link blue with token color.
8. **Never use red badges for non-error / non-CTA contexts.** Red = Ken brand red = CTA only.
9. **Never use icon colors other than `iconColors.content` (purple) or `iconColors.utility` (grey).** No red icons, no per-icon custom colors.
10. **Never invert the variant accidentally.** Cinematic dark needs `#FAFAFA` text on `#0a0a0c` bg. Editorial light needs `#000` text on `#f5f2f1` bg. Mixing = broken contrast.

---

## Category 3 — Typography

1. **Never use `--text-3xl` (48.8px) for section headings.** Reserved for hero h1 only. Section h2 = `--text-2xl` (39px).
2. **Never use Serif (Noto Serif) for body text, buttons, labels, or navigation.** Sans only for UI chrome.
3. **Never use Sans (DM Sans) for hero headings or section titles.** Serif only for display.
4. **Never use `--text-card-micro` (10px) for main text or labels.** ONLY for side numbers, counts, micro-labels.
5. **Never use Tailwind size classes** (`text-2xl`, `text-3xl`) when CSS variable tokens exist. Tokens preserve responsive behavior.
6. **Never use `font-bold` on Serif headings without intent.** Default Serif weight is 500-700; black weight (900) only for cinematic display.
7. **Never use uppercase on body text.** Uppercase reserved for eyebrow labels (`--text-xs` ALL CAPS, tracking-wider).
8. **Never use mixed font sizes within a paragraph.** One size per block of body text.
9. **Never use line-heights below 1.4** for body text or below 1.1 for display.
10. **Never use letter-spacing tighter than `-0.025em`** for any text size — readability collapses.
11. **Never use the wrong 14px token.** Three exist: `--text-nav` (navigation), `--text-compact` (dense card grids), `--button-font-sm` (small buttons). Equal value, different semantic intent.
12. **Never abbreviate body copy.** Spell out: *"Compound Annual Growth Rate (CAGR)"* on first reference.

---

## Category 4 — Spacing & Layout

1. **Never invent spacing values.** Use `--space-1` through `--space-24` (base-10 scale).
2. **Never duplicate `px-4 sm:px-6 md:px-8` padding inside a `SectionWrapper` child.** Double-padding bug. SectionWrapper handles horizontal padding.
3. **Never use arbitrary container widths.** Use `--container-page` / `--container-content` / `--container-narrow` / `--container-prose` / `--container-compact`.
4. **Never put grid cards adjacent without `gap`.** Min `gap-6` (24px).
5. **Never wrap an organism in another `SectionWrapper`.** Each organism owns its own. Wrapping = double padding (the "double-padding bug").
6. **Never use `min-height` on text-containing elements** unless there's a specific reason. Text overflow = broken layout.
7. **Never use absolute positioning for primary layout flow.** Reserved for decorative overlays only.
8. **Never put more than 4 columns in a card grid above tablet.** Beyond 4 = density crisis. Use carousel or pagination.
9. **Never use `overflow: hidden` on the page body.** Breaks scroll behavior, position: sticky, anchor links.
10. **Never use fixed `h-*` on a card-image thumb wrapper inside a flex container.** Image will not cover full vertical area when sibling content is taller. Use `self-stretch` + width-only on wrapper, `absolute inset-0 w-full h-full object-cover` on `<img>`. Parent flex must have `items-stretch` (default OK, make explicit when siblings have explicit heights). Verified bug: `<div className="w-24 h-24"><img inset-0>` left 44px white gap below image when content was 140px tall (caught 2026-05-07 in `BenchmarkHeroBanner` featured carousel).

---

## Category 5 — Components

1. **Never use `Button` `size="lg"` as default.** Default = `size="md"` (42px). `lg` only for homepage hero.
2. **Never use `Button` `size="xs"` outside card footer CTAs** (28px height).
3. **Never add `showArrow={true}` to every button.** Only for urgency or form-redirect actions.
4. **Never use `ArrowRight` or `ChevronRight` on buttons / CTAs.** ALWAYS `ArrowUpRight` via `showArrow` prop. (45° diagonal = Ken brand signature.)
5. **Never embed a static `<ArrowUpRight>` icon inside Button/CTALink.** Use the `showArrow` prop. Otherwise hover transforms break.
6. **Never disable the `useShimmer` brand signature.** It's brand-locked. Hook is annotated DO NOT DELETE.
7. **Never use `ReportGridCard`** (deprecated v4.0). Use `ReportCard layout="grid"` instead.
8. **Never put "View Report" buttons inside grid card bodies.** Removed in v4.0 audit. Card itself = clickable.
9. **Never put divider lines inside grid cards.** Removed in v4.0 audit. Visual noise.
10. **Never use both `BackToTop` AND `ScrollToTop`** on the same page. Pick one.
11. **Never mix `HorizontalScroll` and `ScrollFade`** for the same use case. `HorizontalScroll` = card carousel w/ momentum. `ScrollFade` = pill/tab overflow w/ fade masks.
12. **Never nest `CardReveal` inside `FadeInSection`.** Double animation, jarring.
13. **Never use `Badge` w/ inline color styles.** Use `theme` prop (11 themes available).
14. **Never use `SectionLabel` w/ arbitrary color.** Follows pillar color rules (purple = Research/Surveys, black = Consulting).
15. **Never apply `color` style to icons that should inherit from `iconColors`.** Use the helper.
16. **Never bypass `Container` for width constraints.** Don't use `max-w-[1200px]` arbitrary — use `Container variant="page"`.
17. **Never compose Case Study organisms via the `organisms/` barrel index.** Case Study orgs live flat in `src/app/components/`, not in `organisms/` dir.

---

## Category 6 — Motion

1. **Never animate `top`, `left`, `width`, `height`, `margin`** for state changes. Use `transform` + `opacity`.
2. **Never use `transition: all`.** Specify properties.
3. **Never invent custom easings.** Use the 6 canonical tokens (see `motion/MOTION_SPEC.md`).
4. **Never invent custom durations.** Use the 5 canonical tokens (150ms / 300ms / 500ms / 800ms / 1500ms).
5. **Never violate reduced-motion contract.** Every animation MUST disable (set final state) under `prefers-reduced-motion: reduce`.
6. **Never use scroll-jacking** (overriding native scroll). Lenis = smooth scroll, not hijacked.
7. **Never animate during the first 1.5s after page load** unless brand hero entrance.
8. **Never trigger card animations on `mouseenter` for sections.** Sections = scroll-triggered, cards = hover-triggered.
9. **Never animate the same property on the same element from two motion libraries.** Race condition.
10. **Never use scroll-driven motion in Framer.** GSAP owns scroll. Framer owns state.
11. **Never use stagger delays beyond 150ms per item** in card grids.
12. **Never use parallax on mobile (< 1024px).** Disable.
13. **Never autoplay sound or video** in any motion context.
14. **Never use bouncy easings on body text.**
15. **Never use stagger reveals beyond 8 items** at once. Becomes parade.

---

## Category 7 — Copy / Voice

1. **Never use exclamation marks** in any pillar voice (Consulting / Research / Surveys / Foundations). Period-only.
2. **Never use second-person sales language** ("you'll discover", "your dream") on Consulting or Research surfaces. CTAs OK.
3. **Never use "powered by", "driven by", "fueled by"** filler.
4. **Never use clichés:** "journey", "leverage" (verb), "synergy", "best-in-class", "world-class", "cutting-edge", "revolutionary", "game-changing", "innovative" (positive descriptor), "actionable insights", "comprehensive".
5. **Never use weather/sports metaphors** ("storm", "winning", "championship", "marathon").
6. **Never use scarcity manipulation** in Surveys ("only X spots left", "last chance").
7. **Never bury time estimate** on surveys — top of card and detail page.
8. **Never bury privacy stance** on surveys — visible before any data collection.
9. **Never use industry acronyms unexplained.** Define on first use.
10. **Never write claims without methodology link** in Consulting voice. "We achieved X" = always include "through structured Y" or page link.
11. **Never use emoji in copy** (Foundations table indicators are sole exception: ✅ ❌).
12. **Never use marketing language in DS docs** ("powerful", "elegant", "amazing", "best-in-class").
13. **Never abbreviate report titles.** Full publication name always.
14. **Never use vague time references** ("recently", "soon", "shortly"). Use exact: *"Published Q1 2026"*.
15. **Never write narrative prose for what fits in a table.** Tables scannable, prose isn't.
16. **Never use "obviously"** — if obvious, wouldn't need documenting.

---

## Category 8 — Accessibility

1. **Never ship without `prefers-reduced-motion` respect.** Animation MUST be disable-able.
2. **Never use color alone to convey state.** Pair w/ icon + label.
3. **Never use touch targets smaller than 44px** on mobile (WCAG AA).
4. **Never use contrast ratios below WCAG AA** (4.5:1 body, 3:1 large text). 3.0:1 minimum for graphical objects.
5. **Never disable focus rings.** Use `:focus-visible` w/ visible ring on all interactive elements.
6. **Never use `<div>` for clickable elements.** Use `<button>` or `<a>`.
7. **Never miss `aria-label`** on icon-only buttons.
8. **Never use `aria-hidden` on actively interactive elements.**
9. **Never use placeholder text as label substitute.** Visible label required.
10. **Never use `tabindex > 0`.** Disrupts natural tab order.
11. **Never trap focus** in non-modal contexts.
12. **Never animate transform without `will-change` hint** in fixed-position contexts.
13. **Never use auto-playing carousels** without pause control.
14. **Never use motion that flashes more than 3 times per second** (WCAG seizure trigger).
15. **Never miss `lang` attribute** on HTML root.

---

## Category 9 — Forms (Phase 2 anticipated — flag now)

1. **Never use placeholder as label.**
2. **Never validate on every keystroke** for non-critical fields. Validate on blur.
3. **Never strip whitespace from password fields silently.**
4. **Never use red border alone** for error state. Pair w/ message + icon.
5. **Never disable Submit button before user has touched form.** Allow attempt, then validate.
6. **Never auto-advance focus** without explicit affordance (e.g. OTP fields w/ visible separator).
7. **Never reset form silently** on validation error.
8. **Never use `required` without visible asterisk.**
9. **Never use `<label>` without `for`/`htmlFor` linking.**

---

## Category 10 — Performance

1. **Never animate at less than 60fps on desktop, 30fps mobile.** Profile or remove.
2. **Never use `setInterval` for animation.** `requestAnimationFrame`.
3. **Never block scroll handler for > 50ms.**
4. **Never use unoptimized images.** Use `next/image` or proper srcset.
5. **Never load Google Fonts via `@import`** in CSS (render-blocking). Use `<link rel="preconnect">` + `<link rel="stylesheet">` in `<head>`.
6. **Never ship without `prefers-reduced-data` respect** (where applicable — disable parallax, video autoplay).
7. **Never animate `box-shadow`** if avoidable (paint cost).
8. **Never use `position: fixed` ancestor without GPU layer hint** for child animations.
9. **Never load > 250KB JS gzipped on initial paint** without code-splitting reasoning.

---

## Category 11 — Data / Mock data

1. **Never inline mock data inside components.** Centralize in `src/lib/mock-data.ts` (or equivalent per project).
2. **Never ship mock data without `// TODO: replace w/ real API` markers.**
3. **Never claim mock data as Ken Research's real numbers** in client-facing or external surfaces.
4. **Never use `<Math.floor(Math.random())>` for stats** in mock data. Use realistic seeded values.
5. **Never use placeholder lorem-ipsum** in design review screenshots. Use realistic copy or label as "PLACEHOLDER".

---

## Category 12 — Tech / Build

1. **Never run `npm install` in any project.** Use `pnpm` exclusively. Pkg manager pinned in `package.json` `engines`.
2. **Never `git push` without explicit user request.** Local-only workspace until explicit OK.
3. **Never use `@figma/my-make-file` or other Figma Make placeholder package names.** Use `@kenresearch/*`.
4. **Never push Figma Make divergences to GitHub** (App.tsx, src/imports/, src/app/components/ui/, figma:asset/ resolver). Document split in GITHUB_PUSH_GUIDE.
5. **Never edit a `handed-over` project folder.** Copy to `<name>-v<n+1>/` and edit the copy.
6. **Never break the dual-path agent sync** (.claude/agents/ + workflows/agents/ must mirror).
7. **Never modify `tokens.json` without rebuilding outputs** (`pnpm build:tokens` or `./run.sh tokens`).
8. **Never bypass token system w/ inline `style={{color: '#abc'}}`.** Use the token or add to `tokens.json` first.

---

## Category 13 — Process / Communication

1. **Never claim "9.5/10 quality" without screenshot evidence + a11y + perf verification.**
2. **Never mark a project `ready-for-tech` with any of the 13 pre-handover gate items failing.**
3. **Never ship a major change without CHANGELOG entry** in `docs/CHANGELOG.md`.
4. **Never edit `CLAUDE.md` / `ROUTING.md` / agent templates / memory / hooks without CHANGELOG entry** (mandatory for all infra changes).
5. **Never auto-execute destructive operations** (delete folder, drop table, force-push) without user confirm.
6. **Never run `/ultrareview` autonomously.** User-triggered, billed.
7. **Never claim a fix is verified without round-trip** (build → run → screenshot → compare).
8. **Never re-implement DS components inside a `projects/*` consumer surface** when the DS already exports the component. (ken-v1's parallel implementations were the cause of the visual gap matrix issues.)
9. **Never improvise organism names against an existing recipe.** If `recipes/<x>.md` lists `HeroSection`, `ChallengesSection`, etc., the consumer surface must use those exact filenames. Inventing `Hero`, `Chapter1Challenge`, `ClosingScene`, etc. = drift, fails recipe-conformance gate. (Surfaced 2026-05-05 from ken-v2 case-study build — recipe specified 13 organisms, builder shipped 12 differently-named components, aura-qa missed the mismatch because it only checked DOM presence not name match.)
10. **Never skip recipe variant DEFAULT.** If recipe header says `Variant: editorial-light (DEFAULT)`, builder must use editorial-light. Cinematic-dark requires explicit user override OR project-level pre-flag — Sonnet defaulting to "cinematic feels nicer" = anti-pattern.
11. **Never declare a build "done" without aura-qa recipe-conformance gate.** Build clean + lint zero + a11y pass ≠ recipe-conformant. Recipe gate verifies: variant matches, organism names match recipe table, bg alternation per recipe sequence, DS components imported per COMPONENT_REFERENCE.md.

---

## Category 14 — Gradients & Backgrounds (NEW v2)

Surfaced 2026-05-08 from `docs/aura-sprint-2026-05-07-port/B2-DS-patterns-backgrounds-deep-map.md`. Enforced by `scripts/lint-section-alternation.mjs` (static) + aura-qa runtime gate.

1. **Never use inline gradient without documented intent.** All gradients consume CSS variables (`--gradient-cinematic-base`, `--gradient-cinematic-overlay-tl`, etc.) or are exposed via `<DarkGradientMesh>` / `<SectionBg>` / `<CarouselFadeMask>` pattern components. Inline `style={{ backgroundImage: 'linear-gradient(...)' }}` in atoms = anti-pattern.
2. **Never use a single `radial-gradient` without blur composition.** Single radial = harsh edge. The cinematic dark mesh signature uses 5 stacked radials w/ blur 60-90px + `mix-blend-mode: screen`. If you need cinematic depth, use `<DarkGradientMesh>`. If you need a hover glow, use `NavbarGlassHover` utility.
3. **Never mix gradient blend modes without intent.** `screen` = additive (glow stack). `multiply` = darken (vignette). `overlay` = texture. Verify blend chain works under both `editorial-light` AND `cinematic-dark` variants — a screen-blend that's beautiful on dark mesh becomes invisible on white bg.
4. **Never use gradient text without solid color fallback.** `background-clip: text; -webkit-text-fill-color: transparent` requires `color: <token>` fallback for browsers without `background-clip:text` (older Edge, accessibility tools, print). See `.text-gradient-red` in `styles/utilities.css` — has `color: var(--color-brand-red)` fallback.
5. **Never apply gradient fade mask without matching parent section bg.** Carousel mask (`linear-gradient(to right, <bg>, transparent)`) must match the parent section's `--section-bg-*` value. Mismatched mask color = visible hard edge. Use `<CarouselFadeMask>` — auto-matches via CSS var inheritance.
6. **Never break the section bg alternation rule.** Per `recipes/<pillar>.md`, sections alternate (BLACK / WHITE / WARM). Same bg twice in sequence = wrong build. aura-qa samples `getComputedStyle(section).backgroundColor` per section + asserts alternation. Static check via `pnpm lint:recipes`.
7. **Never use gradient text on body type or labels.** Display + headline only. Gradient on body = kerning collapse + a11y fail.
8. **Never animate `box-shadow` for hover states.** Paint cost. Animate `opacity` on a pseudo-element shadow layer instead.
9. **Never apply `backdrop-filter: blur` without testing on Safari + Firefox.** Fallback solid bg required (`background: rgba(255,255,255,0.95)` baseline + `@supports (backdrop-filter: blur(...))` enhancement).
10. **Never use `--bg-pure-black`/`--bg-pure-white` (legacy, v1).** Use canonical `--color-foundation-black` / `--color-foundation-white` from `@kenresearch/tokens`.
11. **Never instantiate `<DarkGradientMesh>` outside cinematic-dark variant sections.** The 5-overlay composition is variant-specific. Editorial-light sections use solid `--section-bg-{primary,accent,contrast}` only.

---

## Phase 2 review

Add to this list whenever a new violation pattern is observed. Cull anything that's no longer relevant.

**Owner:** Vishal + Aura · **Cadence:** every sprint exit · **Source of truth:** this file

---

## Phase 3 · 2026-05-19 update · v0.3 regression rules

**Context:** v1-product-page v0.3 audit revealed AI invents flat substitutes when DS organisms missing. New rules locked here.

### Invention-rationalization patterns (NEW)

12. **Never write JSDoc that rationalizes a regression.** Phrases like `NO cards`, `lean PDP-specific fork`, `White bg only`, `tree-style list — NO graphs`, `flat dl substitute` codify the simplification as if intent. These are invention markers. If you wrote one, the canonical organism is missing — STOP, port from CANONICAL-SOURCE-MAP, then consume.

13. **Never invent a substitute when DS organism is missing.** Read `GAPS.md` before any component task. If listed → port first. If not listed → ADD to `GAPS.md` + port. Inventing inline = regression that propagates.

14. **Never re-implement an organism inline in a section file.** Section files are CONSUMERS · they import organisms · they do NOT re-implement card grids, accordion logic, scroll-spy, sticky behavior, D3 graphs, modals, dropdowns, search inputs. If the section file is >150 LOC of layout code, you are re-implementing — STOP, extract to organism.

### Token-rename traps (NEW)

15. **Never use legacy V0.2 size names without verification.** `--text-sm` (V0.2 13px) ≠ `--text-sm` (core-v2 16px). Read TOKEN-GAP-REPORT §4 port refactor rules. Apply per row.

16. **Never use `--radius-md` for 10px.** core-v2 `--radius-md = 15px`. For 10px use `--radius-sm`. V0.2 had this swapped.

17. **Never use `--radius-sm` for 2.5px.** core-v2 `--radius-sm = 10px`. For 2.5px use `--radius-2xs`.

18. **Never use undefined Tailwind classes.** `bg-warm-200` is NOT a class — use `bg-[var(--warm-200)]`. Same for any `bg-<token>-<step>` not in tailwind.config.

### Brand-red overuse (NEW)

19. **Never paint brand-red on neutral UI states.** Active TOC dot · FAQ chevron · scope bullet · accordion expand icon · stat dividers — all NEUTRAL. Brand-red = CTA only. Per Quick_start_guide.md.

19a. **R1.2 exception · brand-red gradient bg ALLOWED on dedicated CTA section organisms only.** Carve-out · added 2026-05-20 via ReportFinalCTASection. Conditions:
- Organism is EXPLICITLY a final CTA / urgency CTA section (NOT decorative chapter section)
- `background="red-gradient"` prop is OPT-IN · default is NOT red-gradient
- Text on bg uses white + WCAG AA (4.5:1) verified
- Form/buttons inverse-styled · use `<Button variant="ghost" background="dark">` not solid brand-red
- Documented in component sidecar `.md` w/ exception rationale
- Approved organism list: `ReportFinalCTASection` · future urgency CTAs require approval
- Banned everywhere else · chapter section bg · card bg · header chrome · stat row bg etc.

### Type / weight (NEW)

20. **Never ship body text smaller than 16px (`--text-sm`).** `text-[0.9375rem]` (15px) seen in v0.3 = drift. 16px DEFAULT body. For dense card body use `--text-compact` (14px), not 15.

21. **Never write `font-bold` 700 against the V0.2 atom assumption that "core-v2 ships 400+500 only".** core-v2 will ship `--font-weight-bold: 700` per TOKEN-GAP-REPORT §3. Use the token. DM Sans variable axis supports 700.

### Spacing drift (NEW)

22. **Never use `py-24 lg:py-32` for section padding.** That's V0.2 — too tall (96/128px). Cap at `--section-py-xl` (64/96px). Use `<SectionWrapper spacing="xl">` not inline.

22a. **V0.2 `leading-tight` (1.25) port → use `leading-[1.25]` inline · NOT `--leading-snug`.** core-v2 `--leading-snug` is `1.3` (OG canonical · post-Batch 3.0 reconciliation). 0.05 line-height drift acceptable when used inline.

23. **Never hardcode horizontal padding `px-[84.375px]`** (V0.2 anti-pattern). Use `px-4 sm:px-6 md:px-8` standard.

24. **Never skip `--section-header-mb` (40-48px).** Section header block (eyebrow+h2+lede) → content needs this air. V0.2 used 64px (`mb-16`) — REJECTED. core-v2 canon = `mb-10 md:mb-12`.

### Inline style leak (NEW)

25. **Never inline `style={{...}}` for tokens.** `style={{ fontSize: 'var(--text-sm)' }}` reads but bypasses Tailwind class generation. Use `text-sm` Tailwind utility OR component prop. v0.3 SideTOC had 40+ inline `style={}` blocks — DRIFT VECTOR.

### Motion + a11y (NEW)

26. **Never write rAF animation without `useReducedMotion()` guard.** Framer Motion provides `useReducedMotion()` — call it · branch on it · skip rAF when `true`. V0.2 Hero orbs lacked this guard.

27. **Never disable Highcharts a11y.** `accessibility.enabled: false` is V0.2 anti-pattern. Set `true` · add `point.description` per series.

28. **Never make sortable `<th onClick>` non-keyboard-focusable.** Add `role="button"` · `tabIndex={0}` · Enter/Space handler. V0.2 MarketDataTable missing this.

### Button / arrow drift (NEW)

29. **Never use V0.2 buttons or V0_lite gradient buttons.** Both outdated per user direction. Canonical = report-store-legacy Button (4 variants × 5 sizes · token-driven). `xs` size (28px) = small button canon.

30. **Never use bottom-rising FloatingCTA banner.** User explicit reject. Drop from DS · do not port from V0.2.

31. **Never invent arrow components.** Canonical arrow system = report-store-legacy `AnimatedArrow.tsx` + `CTALink.tsx` + `InlineLink.tsx`. Port these · use them. Do not re-implement.

### Composition (NEW)

32. **Never strip card chrome that legacy has.** If canonical source uses bordered card (FAQ V0_lite) or container card (Scope V0.2), DO NOT skip the card. Strip = regression.

33. **Never replace canonical section header (eyebrow + h2 + lede) with custom layout.** Use `<SectionHeader>` molecule (V0.2 canon · 4-prop packaging) or compose `<SectionLabel>` + `<SectionHeading>` + `<BodyText>` in canonical order with `--pair-*` spacing.

34. **Never use `<Card variant="warm">` without verifying core-v2 accepts the string.** core-v2 may have renamed the prop. Read `Card.tsx` types before using.

### Legacy ports specific (NEW)

35. **Never port V0.2 `var(--content-max-width)` without alias.** Token broken in V0.2 source. core-v2 base.css will add alias `--content-max-width: var(--container-page)` per TOKEN-GAP-REPORT.

36. **Never port V0.2 hardcoded hex (`#171717` / `#737373` / `#7f5fe3` etc.) literally.** Refactor to `var(--<token-name>)` during port. Hex shifts are OK · token names are canonical.

37. **Never accept V0.2 `--purple-500 #7f5fe3` hex during port.** Use core-v2 `#9488ec`. Hex shifts visible to user · log in CHANGELOG.

### Documentation discipline (NEW)

38. **Every ported component MUST ship sidecar `.md` matching WWWWH template.** No port is "done" without WHAT / WHY / WHEN / WHEN NOT / WHERE / HOW + token usage + a11y + motion + responsive sections. Skip = regression vector for future AI sessions.

38a. **Write sidecar `.md` BEFORE moving to next component, not at end of batch.** When agents batch-write multiple components and write sidecars at the end, Write tool may block .md writes ("findings as text not report files" pattern). Mitigation: write .tsx + sidecar .md as a pair per component, not all .tsx first then all .md last.

38b. **Before adding NEW component to core-v2 · grep existing.** If `<Name>.tsx` already exists in atoms/molecules/organisms/ — STOP. Verify if it's the same component. Versions of same UI = duplication risk. If older version is canonical w/ established consumers, ENHANCE not duplicate. Discovered Batch 3.3d: ReportCardOrganism duplicated existing molecules/ReportCard (May 15) → deleted duplicate.

39. **Every Stage 3 batch MUST update `GAPS.md` entries to ✅ PORTED `YYYY-MM-DD`.** Living doc · stale entries = blind spots.

40. **Never bypass the 5-step picker in `AI-PICKER-GUIDE.md`.** Even for "small" component decisions. CLASSIFY → GAPS → EXPORT → CANON → ANTI-PATTERNS. Skipping = invention door.

---

## Quick-reference: 10 most common v0.3 violations to avoid

```
✗ <div className="border rounded-[10px] p-4">         → use <Card>
✗ <button className="bg-[#b01f24] ...">              → use <Button variant="primary">
✗ <h2 className="text-[2.441rem] font-light ...">    → use <SectionHeading level={2}>
✗ <p style={{ fontSize: 'var(--text-sm)' }}>         → use <BodyText> · NO inline style
✗ /** @what NO cards · stripped flat list */          → STOP · port organism
✗ JSDoc · "lean PDP-specific fork"                    → STOP · use canonical
✗ py-24 lg:py-32                                      → use SectionWrapper spacing="xl" (max py-16 md:py-24)
✗ <Card variant="warm">  (unverified)                 → verify prop · use bg="warm-300"
✗ text-[0.9375rem] body                              → use --text-sm (1rem)
✗ brand-red on TOC active dot                         → use --black-900 neutral · brand-red = CTA only
```

---

## How to use this doc (AI session start)

1. Load CLAUDE.md (auto)
2. Load ANTI-PATTERNS.md (this file)
3. Load AI-PICKER-GUIDE.md
4. Load GAPS.md
5. Begin task → run 5-step picker → respect all 40 rules

If any rule is unclear → escalate to user · do not improvise.
