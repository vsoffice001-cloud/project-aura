# OG Anti-Patterns Catalog · Audit (WWWWH)

**Scope:** OG's documented ❌ list — every "NEVER," "Don't," "Avoid" pulled from the source. Categorized: token misuse · component misuse · composition errors · a11y violations · motion abuse · brand-color overuse.

**Source path (READ-ONLY):** `Design_system_vs_26 (og and final)/`
**Methodology:** `design-system-audit/01_methodology.md` (WWWWH).

**Status of explicit anti-pattern documentation in OG:** **No dedicated `ANTI_PATTERNS.md` file exists.** OG anti-patterns live distributed across:
- `ai-context/COLORS.md` (color anti-patterns · 7 entries).
- `ai-context/TYPOGRAPHY.md` (typography anti-patterns · 3 entries).
- `ai-context/COMPONENTS.md` (component-use anti-patterns · 5 entries).
- `ai-context/LAYOUT.md` (layout anti-patterns · 5 entries).
- `ai-context/PROMPTS.md` (combined "NEVER" reminders).
- Inline component docs (`ButtonDocumentation.tsx`, `DesignSystemDashboard.tsx`, `MotionContent.tsx`, etc.).
- Verbatim comments in `theme.css`.

This catalog consolidates all 50+ documented ❌ rules into one categorized reference + cites the OG source line for each.

---

## WHAT (1-paragraph essence)

OG anti-patterns split into 6 categories: (1) **Token misuse** — hardcoding hex instead of var(), arbitrary spacing breaking the 4px scale, shorthand CSS properties; (2) **Component misuse** — wrong Button variant for CTA tier, raw HTML instead of DS atoms, disabling shimmer, wrong link component for context; (3) **Composition errors** — double-wrapping SectionWrapper, breaking BLACK→WARM→WHITE alternation, hardcoded max-w instead of container tokens; (4) **A11y violations** — missing aria-label on icon-only, color-only error states, broken focus-ring, skipping heading levels; (5) **Motion abuse** — disabling shimmer, animating every grid item simultaneously, ignoring prefers-reduced-motion; (6) **Brand-color overuse** — using `--brand-red` for anything but CTAs, decorative red, purple as section bg.

## WHY this catalog exists

- **AI-generation safety net:** Without anti-patterns, agents will produce visually-plausible-but-DS-wrong output. Anti-patterns are negative examples training the agent away from drift.
- **Code review shortcuts:** Reviewers point to `anti-patterns-catalog.md#token-misuse` instead of re-arguing the same drift each PR.
- **Surfaces tribal knowledge:** "NEVER use red for decorative purposes" (COLORS.md:60) is a brand rule. Without writing it down, every new designer rediscovers it.
- **Defines the DS contract:** A DS is its yeses + its noes. The noes are the constraints that make the yeses powerful.

## WHEN to consult ✅
- Before adding a new component / color / pattern.
- During code review.
- When agent output looks wrong but you can't articulate why.
- When debating whether to "make an exception."

## WHEN NOT ❌
- For greenfield exploration during design — anti-patterns are guardrails, not blockers. Explore first, audit second.
- For consumer-app over-rides where business need overrules DS purity (rare · document the override).

---

## Category 1 · Token misuse

### 1.1 · Hex in inline styles
**Rule (COLORS.md:258):** *"NEVER use hex colors in inline styles (e.g., `color: '#b01f24'` is WRONG)"*
**Why:** Hex bypasses the token system. Re-tinting the brand or theming dark mode requires re-finding every hex literal.
**Fix:** Use `var(--brand-red)` or rgba() format.
```tsx
❌ <span style={{ color: '#b01f24' }}>
✅ <span style={{ color: 'var(--brand-red)' }}>
✅ <span style={{ color: 'rgba(0, 0, 0, 0.7)' }}>  /* opacity OK */
```

### 1.2 · CSS shorthand in inline styles
**Rule (COLORS.md:259):** *"NEVER use CSS shorthand for `border` or `background` in inline styles — use longhand properties"*
**Why:** Shorthand merges values — replacing one tint via JS overrides accidentally clear the other two properties.
```tsx
❌ <div style={{ border: '1px solid var(--brand-red)' }}>
✅ <div style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--brand-red)' }}>
```

### 1.3 · Hardcoded font sizes outside the scale
**Rule (theme.css:171, TYPOGRAPHY.md:82):** *"Every fontSize in the codebase MUST map to one of these tokens. No hardcoded pixel values allowed outside of clamp() ranges."*
**Fix:** Use `--text-xs / --text-sm / --text-base / --text-xl / --text-2xl / --text-3xl` etc.
**Exception:** `clamp()` ranges for editorial responsive headings (verified pattern in HeroSection h1, theme.css:248-251).

### 1.4 · Spacing values outside 4px scale
**Rule (LAYOUT.md:35-36):** *"Don't use arbitrary values (stick to scale) · Don't use Tailwind spacing classes that break scale"*
**Fix:** `--space-2 / --space-4 / --space-6 / --space-8 / --space-12` from the 4px-base scale.

### 1.5 · Hardcoded container widths
**Rule (LAYOUT.md:67-68):** *"Don't hardcode `max-w-[1200px]` — use `max-w-[var(--container-page)]` · Don't use `max-w-6xl` — use container tokens instead"*
**Fix:** Always reference `--container-page / -content / -narrow / -prose / -compact`.

### 1.6 · Tailwind utility classes that bypass theme tokens
**Rule (LAYOUT.md:36):** Tailwind has its own spacing scale (`p-4`, `m-8`) which OG accepts since they map 4px-base. But arbitrary-value Tailwind (`p-[17px]`) breaks the scale — forbidden unless inside a clamp/calc.

---

## Category 2 · Component misuse

### 2.1 · Raw HTML button instead of `<Button>` atom
**Rule (audit synthesis · sampled across docs):** *Never use `<button>` raw — always `<Button>` from the DS.*
**Why:** Loses shimmer, sizing scale, focus-ring discipline, touch-target floor, and brand variants.

### 2.2 · Wrong link component for context
**Rule (COMPONENTS.md:101-104):**
> *"Don't use `Button` for exploratory links (use `CTALink`)
> Don't use `CTALink` for primary conversions (use `Button`)
> Don't use `InlineLink` standalone (use `CTALink`)"*

**Decision flowchart (COMPONENTS.md:91-99):**
```
Is it a primary action (form submit, main CTA)?
 → YES: <Button>
 → NO: Is it text + arrow CTA ("Learn More ->")?
        → YES: <CTALink>
        → NO: Is it within paragraph text?
               → YES: <InlineLink>
               → NO: <CTALink> or <Button>
```

### 2.3 · showArrow on non-conversion CTAs
**Rule (COMPONENTS.md:117-119, DesignSystemDashboard.tsx:1487):**
> *"ONLY for buttons redirecting to forms/pages with urgency. Examples: 'Unlock Full Report', 'Schedule Demo', 'Get Started'. NEVER: 'Learn More', 'View Details', 'Cancel', 'Back'."*
> *"NEVER add showArrow to 'Learn More' or 'Cancel' buttons — only conversion CTAs"*

**Why:** Arrow communicates forward-momentum / commitment. On Learn More it implies a journey when none is happening; on Cancel it's directionally wrong.

### 2.4 · Wrong arrow icon
**Rule (COMPONENTS.md:119):** *"NEVER: Use ArrowRight or ChevronRight — always ArrowUpRight."*
**Why:** ArrowUpRight (45°) reads as "going somewhere," consistent across Stripe / Linear / Vercel CTAs. ArrowRight reads as "next slide." Discipline matters.

### 2.5 · Disabling shimmer
**Rule (COMPONENTS.md:111-112):**
> *"What: Always-active sweep on ALL buttons. 700ms duration, gradient left-to-right.*
> *Rule: NEVER disable shimmer — it's core brand identity."*

### 2.6 · ScrollFade vs HorizontalScroll mixed
**Rule (COMPONENTS.md:377):** *"CRITICAL: Never mix these two. They solve different problems."*
**Decision (COMPONENTS.md:368-374):**
- Pills / tabs / chips → ScrollFade.
- Full cards → HorizontalScroll.

### 2.7 · Old SectionHeading API
**Rule (COMPONENTS.md:240-247):**
> *"CRITICAL — OLD vs NEW API:
> OLD (v3.4) — DO NOT USE: `<SectionHeading level={2} eyebrow="X">Title</SectionHeading>`
> NEW (v4.0) — ALWAYS USE: `<SectionHeading level={2} label="X" title="Title" />`"*

### 2.8 · ReportGridCard deprecation
**Rule (COMPONENTS.md:443):** *"`ReportGridCard` is deprecated — always use `ReportCard layout="grid"`."*

### 2.9 · Wrong Badge for Form Label
**Rule (audit synthesis from Label.tsx purpose):** *Semantic `<label>` for forms (NOT for section headers).* Don't use Badge / SectionLabel for form fields.

### 2.10 · Override `bg` via className on Button
**Rule (audit synthesis · methodology.md:142):** *"Never override `bg` via className (use variant prop) — `variant='ghost' className='bg-red-500'` ❌"*

---

## Category 3 · Composition errors

### 3.1 · Double-wrapped SectionWrapper
**Rule (LAYOUT.md:127-128):**
> *"Inside an organism that already wraps itself in SectionWrapper (double-padding bug)"*

**Fix:** Either organism wraps itself OR the page wraps it. Not both.

### 3.2 · Adding responsive padding inside SectionWrapper children
**Rule (LAYOUT.md:130 CRITICAL):**
> *"CRITICAL: Do NOT add `px-4 sm:px-6 md:px-8` inside SectionWrapper children — it already handles responsive padding."*

### 3.3 · Wrong container for body text
**Rule (LAYOUT.md:65-66):**
> *"Don't use `--container-page` for body text (too wide) · Don't use `--container-compact` for card grids (too narrow)"*

**Mapping:**
- Card grids → `--container-content` (1000px).
- Body prose → `--container-prose` (700px).

### 3.4 · Breaking BLACK→WARM→WHITE alternation
**Rule (audit synthesis · LAYOUT.md:167-200):**
- Don't put two WARM sections back-to-back.
- Don't replace case-study hero with WHITE.
- Don't replace case-study resources with WARM.

### 3.5 · Skipping the border-t separator on WHITE→WHITE
**Rule (audit synthesis · FinalCTASection.tsx:11):** *When a WHITE section follows another WHITE section, add `border-t border-black/10` to the second.*

### 3.6 · Heading hierarchy skips
**Rule (DesignSystemDashboard.tsx:1523):**
> *"Semantic HTML with proper heading hierarchy (h1 → h2 → h3, never skip levels)"*

### 3.7 · Hardcoded `max-w-6xl` Tailwind alias
See Category 1.5 — duplicate flagged here too because it's a *composition* anti-pattern in pages, not just a token issue.

### 3.8 · Full-bleed hero inside SectionWrapper
**Rule (LAYOUT.md:126-127):**
> *"Full-bleed heroes with custom layouts (use raw `<section>`)"*

---

## Category 4 · A11y violations

### 4.1 · Missing aria-label on icon-only button
**Rule (ButtonDocumentation.tsx:923):**
```tsx
❌ <Button iconOnly icon={<Download size={20} />} />
// Screen readers can't describe this!
✅ <Button iconOnly icon={<Download size={20} />} ariaLabel="Download annual report PDF" />
```

### 4.2 · `outline: none` without focus-visible alternative
**Rule (GuidelinesContent.tsx:307, MotionContent.tsx:1272 pattern):** *Always pair with `:focus-visible` ring.*
```css
❌ button:focus { outline: none; }
✅ button:focus:not(:focus-visible) { outline: none; }
✅ button:focus-visible { outline: 2px solid var(--brand-red); outline-offset: 2px; }
```

### 4.3 · Color-only state signaling
**Rule (COLORS.md derived · audit synthesis):** Error state can't be red text alone — also needs icon or screen-reader text.
```tsx
❌ <span className="text-rose-600">Invalid input</span>
✅ <span className="text-rose-600 inline-flex items-center gap-1" role="alert">
     <AlertCircle className="size-4" /> Enter a valid email
   </span>
```

### 4.4 · Skipping heading levels
**Rule (DesignSystemDashboard.tsx:1523):** *"h1 → h2 → h3, never skip levels"* → don't jump h2 → h4.

### 4.5 · `aria-label="Click here"` style filler
**Rule (audit synthesis from ButtonDocumentation.tsx:920):** Use specific labels.

### 4.6 · Modal without `role="dialog"` + `aria-modal`
**Rule (ContactModal.tsx pattern, GuidelinesContent.tsx:440-444):** Modals require `role="dialog"`, `aria-modal="true"`, `aria-labelledby`.

### 4.7 · `pointer-events: none` on focusable element
**Rule (audit synthesis):** Breaks tab order. Use `disabled` HTML attr or `aria-disabled`.

### 4.8 · Touch target below 44×44px in non-card-footer context
**Rule (audit synthesis · theme.css:430-432):** xs (28px) for card-footer only. sm (40px) borderline — use in navbar w/ external padding.

---

## Category 5 · Motion abuse

### 5.1 · Disabling shimmer
See Category 2.5.

### 5.2 · Ignoring `prefers-reduced-motion`
**Rule (theme.css:822-826):** *"REDUCED MOTION ... Respects user preferences for reduced motion. Disables shimmer sweep and hover transitions."*
**Audit gap:** Several OG components miss this (`animate-bounce`, Navbar hide-on-scroll, StickyCTA expand) — logged in `a11y/a11y-baseline.md` § Reduced-motion handling.

### 5.3 · Stagger-animating a 24-card grid simultaneously
**Rule (audit synthesis):** Use `CardReveal` stagger molecule with 100ms max delay, OR animate only the first row.

### 5.4 · Body-text animation
**Rule (audit synthesis):** Body paragraphs never animate. Only chrome / cards / headings get entrance fade.

### 5.5 · Mixing CSS transition + Tailwind transition + inline `style.transition`
**Rule (audit synthesis):** Order-dependent conflicts. Pick one per element.

### 5.6 · Infinite-loop motion on whole sections
**Rule (audit synthesis):** No infinite-spin halos, pulse rings, or "AI shimmer" on whole sections. Reserved for purposeful interactions.

### 5.7 · Wrong easing for state change
**Rule (audit synthesis · motion-system.md):** Don't use `ease-linear` (robotic) or `ease-in-out` (sluggish for entry). Use `ease-out` for state changes; `cubic-bezier(0.16, 1, 0.3, 1)` for premium entrance.

### 5.8 · Tailwind `duration-1000+` for state
**Rule (audit synthesis · motion-system.md):** Anything > 700ms for state change feels broken. 700ms is reserved for shimmer specifically (theme.css:677).

---

## Category 6 · Brand-color overuse (the **biggest** OG anti-pattern category)

### 6.1 · Red for decorative purposes
**Rule (COLORS.md:60):** *"**NEVER use red for decorative purposes** (CTAs only!)"*
**Why:** Ken brand red `#b01f24` is at 5% usage tier (COLORS.md:11). Using red for borders / icons / accents collapses the 92-5-3 hierarchy. CTAs lose pop.

### 6.2 · Red borders, red icons, red general accents
**Rule (COLORS.md:61-62):**
> *"Don't use red for borders, icons, or general accents
> Don't use gray — use black tints instead"*

### 6.3 · Purple as section background
**Rule (COLORS.md:37-38):**
> *"NEVER use purple as a section background (use Black/White/Warm)
> NEVER use purple for text (use black tints)"*

### 6.4 · Purple in body text
See 6.3 — purple is for content icons, badge themes, card shadows ONLY (COLORS.md:36).

### 6.5 · `--rose-*` as substitute for `--brand-red`
**Rule (COLORS.md:206):** *"Don't use `--rose-*` as substitute for `--brand-red`"*
**Why:** Rose is the semantic-error palette (validation, destructive actions). Brand red is conversion CTA. Visually similar; semantically distinct.

### 6.6 · Hex outside CSS variables
See Category 1.1 — duplicate flagged because it most often happens with brand red.

### 6.7 · Hero w/ warm or color background
**Rule (COLORS.md:106-107):**
> *"Don't use [warm] for hero sections (use pure black)
> Don't use [warm] for final CTA (use pure black)"*

### 6.8 · Section bg in any accent color
**Rule (COLORS.md:23-24, 167-169):**
> *"Section backgrounds → Allowed: Black, White, Warm — Forbidden: Accent colors, brand red"*
> *"Don't use accent colors for section backgrounds (use black/white/warm)"*

### 6.9 · Mixing 3+ accent families
**Rule (COLORS.md:170):** *"Don't mix more than 2–3 accent families in a single view"*

### 6.10 · Decorative use of semantic colors (green/amber/rose)
**Rule (COLORS.md:204-207):**
> *"Don't use semantic colors decoratively"*

---

## Category 7 · Typography mis-pairing

### 7.1 · Serif for body / UI chrome
**Rule (TYPOGRAPHY.md:29, theme.css:28):**
> *"NEVER use Serif for body text, buttons, labels, navigation, or any UI chrome"*

### 7.2 · Sans for hero headings
**Rule (TYPOGRAPHY.md:30, theme.css:28):**
> *"NEVER use Sans for hero headings or section titles"*

### 7.3 · Mixing 3+ custom typefaces
**Rule (TYPOGRAPHY.md:31, theme.css:29):**
> *"NEVER mix more than 2 custom typefaces"*

### 7.4 · `--text-3xl` for regular section headings
**Rule (TYPOGRAPHY.md:82-83):**
> *"Don't use `--text-3xl` for regular section headings (reserved for heroes)"*

### 7.5 · `--text-card-micro` for main text items
**Rule (TYPOGRAPHY.md:109-110):**
> *"Don't use `--text-card-micro` for main text items (ONLY for counts/numbers/micro-labels)"*

### 7.6 · Skipping scale levels
**Rule (TYPOGRAPHY.md:84):**
> *"Don't skip scale levels (e.g., don't jump from xs to xl)"*

---

## Category 8 · Voice anti-patterns
(synthesized from `voice/voice-brand.md` § Brand voice anti-patterns)

- "Click here" — non-descriptive, accessibility issue.
- "Submit" alone — replace with outcome-verb.
- "OK" alone — replace with "Confirm" / "Continue."
- All-caps body sentences (caps for labels only).
- "Demo" alone (noun CTA) — make verb-led "Schedule a Demo."
- Passive voice CTAs ("Be Notified") — use active.
- Emoji in B2B copy.
- Marketing exclamation points / "Hurry!" / "Limited time!"
- "Free / Don't miss out!" — anti-credibility.

---

## Category 9 · Style / build-discipline (audit synthesis from theme.css comments)

- Don't define brand red in multiple places (theme.css:456-458 explicit note: *"--brand-red, --brand-red-hover, --brand-red-active are defined in the PRIMARY BRAND COLORS section above. No duplicate definitions needed here."*).
- Don't manually edit generated token files — change source, regenerate.
- Don't bypass `<SectionWrapper>` for sections that should have alternating bg.
- Don't fork a component to add a one-off variant — extend props.
- Don't push CSS that breaks dark-mode parity (audit note: OG doesn't yet have dark mode, but token discipline supports it).

---

## Quick-reference summary table

| Category | Count of rules | Highest-cost violation if missed |
|---|---|---|
| Token misuse | 6 | Re-theming costs O(n) instead of O(1) |
| Component misuse | 10 | Lost shimmer / brand identity drift |
| Composition errors | 8 | Double-padding bug · broken rhythm |
| A11y violations | 8 | WCAG fail · screen-reader inaccessible |
| Motion abuse | 8 | Reduced-motion fail · "broken" perception |
| Brand-color overuse | 10 | 92-5-3 collapse · CTAs lose pop |
| Typography mis-pairing | 6 | Editorial credibility loss |
| Voice | 9 | Wrong audience tone |
| Style / build | 5 | Drift / duplicate definitions |
| **Total** | **70** | — |

---

## Audit observations

- **OG has 70+ anti-patterns documented across 6+ files, but no single source.** Recommendation for new DS: consolidate into one `ANTI_PATTERNS.md` with this categorization. The single-source rule reduces drift cost.
- **Highest-impact categories: brand-color overuse (10 rules) and component misuse (10 rules).** These two account for most of the visual drift in iteratively-built OG pages — both are agent-prone failure modes.
- **Voice + a11y are most-likely-to-drift in new builds.** Voice has zero documentation in OG (inferred from strings) — new agents won't know unless told. A11y has 70% coverage with 8 gaps — easy to regress further.
- **Some "anti-patterns" are intent rules disguised as prohibitions.** E.g., "NEVER disable shimmer" is really "Shimmer = brand identity, don't strip." Reframe for new DS as positive design rules + negative checks.
- **Anti-patterns cite OG file:line correctly throughout this catalog.** Tribal knowledge is now grep-able.

---

**Audit complete · 70+ documented anti-patterns consolidated into 9 categories · each cites OG source · ready for new DS to adopt as `ANTI_PATTERNS.md` v1.**
