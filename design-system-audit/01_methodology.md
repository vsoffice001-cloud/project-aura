# Methodology · WWWWH Framework

**Adopted from:** OG `COMPONENT_GUIDELINES_4WH.md` + pasted V0.2 `MASTER_COMPONENT_INDEX.md` (WWWWH framework).

**Purpose:** Capture INTENT not just artifact. An atom file shows WHAT. WWWWH captures WHY/WHEN/WHERE/HOW so an AI agent · new designer · or new developer can apply it correctly first-try.

---

## The 5 W's + H

### WHAT (1-2 sentences)
The essence. What this thing IS · in plain language.

> Example (Button): "Primary CTA atom for explicit user actions like form submit · navigation · or in-page interaction. Wraps a `<button>` element w/ brand-locked sizing · variants · and shimmer."

### WHY (3-5 bullets)
The problem it solves. What pain · drift · or inconsistency it prevents.

> Example (Button):
> - Conversion CTAs need consistent affordance across every Ken surface
> - Brand-locked shimmer is signature interaction — random inline buttons miss it
> - Reduced-motion handled at DS layer · consumers can't forget
> - Touch-target floor 44px ensured · WCAG 2.5.5 compliance baked in
> - 4 variants × 5 sizes × 2 modes covers 95% of CTA needs · prevents one-off styling

### WHEN to use ✅ (concrete · positive examples)
- Primary action on form (submit · save · publish)
- Conversion moment (Book a call · Download report · Talk to analyst)
- Inline CTA inside narrative section
- Modal confirmation
- Hero CTA (max 1-2 per screen)

### WHEN NOT to use ❌ (with "use X instead" pointer)
- Navigation link to another page → use `<CTALink>` (preserves text + arrow pattern · not button affordance)
- Text-only emphasis → use `<TextLink>` (inline w/ body copy · no button shape)
- Filter / toggle → use `<FilterChip>` or `<ToggleButton>` (selected state pattern)
- Icon-only inside Card → use `Card`'s built-in interactive prop (avoids nested click targets)
- Decorative badge → use `<Badge>` (no click affordance)

### WHERE used (concrete OG examples · file:line)
- `src/app/components/organisms/Navbar.tsx:248` — "Book a call" brand CTA top-right
- `src/app/components/organisms/ProductHero.tsx:89` — "Download Sample Report" hero primary
- `src/app/components/FinalCTASection.tsx:34` — "Talk to Analyst" cinematic dark surface ghost variant
- (and 20+ more usages logged per audit)

### HOW to implement (worked tsx · code block per variant)

```tsx
// Primary CTA · default
<Button variant="primary" size="md" onClick={handleClick}>
  Download Report
</Button>

// Brand CTA · conversion moments only (max 1-2 per screen)
<Button variant="brand" size="lg">
  Book a discovery call
</Button>

// Ghost on dark surface · use background="dark"
<Button variant="ghost" background="dark" size="md">
  Request Customization
</Button>

// Loading state
<Button variant="primary" size="md" loading>
  Submitting...
</Button>

// Icon-only (always include ariaLabel)
<Button variant="ghost" size="sm" iconOnly ariaLabel="Close modal">
  <X />
</Button>
```

---

## Extended sections (per atom doc)

### Properties
| Prop | Type | Default | Purpose · Why this exists |
|---|---|---|---|
| variant | 'primary' \| 'brand' \| 'secondary' \| 'ghost' | 'primary' | 4 variants cover 95% of needs · brand is conversion-only |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' | 'md' | 5 sizes mapped to touch-target + density needs |
| background | 'light' \| 'dark' | 'light' | Auto-inverts ghost text/border on dark surfaces |
| loading | boolean | false | Spinner replaces icon · disables button · accessible label swap |
| iconOnly | boolean | false | Square aspect · requires ariaLabel |
| shimmer | boolean | true | Brand-locked sweep animation · hover trigger |

### States
- **Default:** base color · standard shadow
- **Hover:** shimmer plays · slight bg-shift · cursor pointer
- **Active (mousedown):** Material ripple · subtle scale 0.98
- **Focus-visible:** 2px brand-red outline · 2px offset
- **Disabled:** 50% opacity · no pointer-events · no shimmer
- **Loading:** spinner + dimmed text · click disabled

### Variants
1. **primary** (default) — black bg · white text · for most CTAs
2. **brand** — red gradient bg · white text · conversion-only (Book call · Buy)
3. **secondary** — white bg · black border · neutral CTAs
4. **ghost** — transparent bg · text-only · inline w/ content

### Sizes
| Size | Height | Padding-x | Font | Use for |
|---|---|---|---|---|
| xs | 28px | 10px | 0.75rem | Card footer · table actions only |
| sm | 40px | 20px | 0.875rem | Navbar · compact density |
| md | 48px | 28px | 1rem | DEFAULT · most CTAs |
| lg | 56px | 32px | 1.0625rem | Hero · pricing · standout |
| xl | 64px | 40px | 1.125rem | Editorial hero · landing only |

### Tokens used
- `--button-height-{size}` · `--button-px-{size}` · `--button-font-{size}` · `--button-min-width-{size}`
- `--composition-gradient-brand-red-shimmer` · `--composition-gradient-brand-red-shimmer-hover`
- `--color-foundation-white` · `--color-foundation-black` · `--color-brand-red`
- `--radius-button` · `--shadow-button-default` · `--shadow-button-hover`
- Reduced-motion: respects `prefers-reduced-motion` via DS layer

### A11y rules
- All buttons keyboard reachable (Tab · Shift+Tab)
- Enter + Space trigger click
- `aria-label` required if iconOnly
- `aria-busy` true when loading
- `aria-disabled` true when disabled (not just `disabled` HTML attr)
- Focus ring: 2px brand-red outline · 2px offset · never `outline:none`
- Color contrast: text vs bg ≥ 4.5:1 every variant · verified WCAG AA
- Touch target ≥ 44×44px (xs exempt · footer-only context)

### Motion rules
- Shimmer: 700ms ease-out · runs on hover (or autoShimmer 4.5s loop)
- Ripple: 600ms Material default · contained to button bounds
- Hover bg-shift: 200ms ease-out
- Active scale: 0.98 transform · 100ms · reverts on mouseup
- Reduced-motion: ALL animations disabled · static state used

### Anti-patterns ❌
- Never use `<button>` raw HTML (lose shimmer · brand · sizing) — always `<Button>`
- Never override `bg` via className (use variant prop) — `variant="ghost" className="bg-red-500"` ❌
- Never disable shimmer on brand variant (kills signature interaction)
- Never use brand variant for >2 CTAs per screen (visual noise · loses meaning)
- Never use ghost on light surface w/o testing contrast (text becomes near-invisible)
- Never use xs outside card footer / table action (touch-target violation in body context)

### REUSABILITY SCORE
**5/5 ⭐⭐⭐⭐⭐** — Used on every page type (case-study · PDP · listing · landing). Mandatory CTA atom.

### Linked components
- **Parent organisms:** `Navbar` · `ProductHero` · `FinalCTASection` · `StickyCTA` · `LeadFormModal`
- **Sibling atoms:** `CTALink` (nav alternative) · `TextLink` (inline alternative) · `FilterChip` (selected-state alternative) · `IconButton` (icon-only specialist)
- **Molecules using this:** `LeadFormFields` · `StatCardWithCTA` · `PricingTier`
- **Hooks involved:** `useShimmer` · `useRipple` · `useReducedMotion`

### Reasons + Decisions log (intent capture)
- **Why brand red `#b01f24` for brand variant?** Ken brand red from logo · matches OG since v1. CTA-only tier (5% rule).
- **Why shimmer 700ms?** Tested vs 500ms (too quick) · 1000ms (sluggish). 700ms = perceived as "premium" without lag.
- **Why touch target floor 44px not 48?** WCAG 2.5.5 baseline. 48px = touch-target-comfortable but 44px is the spec floor. xs exempt because card-footer context provides external touch area.
- **Why no `xxs` size?** Tested — became indistinguishable from text emphasis. Use `<TextLink>` instead.
- **Why 5 variants not more?** 4 variants × 5 sizes × 2 modes = 40 combos already. Adding more = decision fatigue for designers. Stops here.

---

## Capture rules (every doc MUST have)

Every doc · regardless of layer (token · atom · molecule · organism · pattern · recipe) MUST include:

1. WHAT
2. WHY (with reasoning · not just description)
3. WHEN ✅
4. WHEN NOT ❌ (with "use X instead" pointers)
5. WHERE (concrete file:line examples)
6. HOW (worked code · per variant)
7. Reasons + Decisions log (capture the "why this specific value")

For atoms · molecules · organisms · additional:
8. Properties (prop · type · default · WHY this exists)
9. States (every interactive state)
10. Variants (with WHEN-to-use per variant)
11. Sizes (with WHEN-to-use per size)
12. Tokens used (every CSS var)
13. A11y rules
14. Motion rules
15. Anti-patterns
16. REUSABILITY SCORE
17. Linked components (parents · siblings · children · hooks)

For tokens · additional:
- Value
- Origin (Major Third scale · brand identity · WCAG calc · etc.)
- Aliases
- Where derived from
- Modification risk (what breaks if you change it)

For patterns · recipes · additional:
- Composition tree (parent → children · ordering)
- Bg alternation rules
- Section sequence
- When to deviate

---

## Hard rules during audit

1. **Read-only:** never edit OG · worked-examples · new DS during audit
2. **Cite source:** every claim → file:line
3. **Quote intent comments:** lift OG inline JSDoc/comments verbatim where they carry decision rationale
4. **Cross-reference:** link related concepts (Button → CTALink · Card → CardGrid molecule · etc.)
5. **Honest gaps:** if OG doesn't document something · say so — don't invent intent
6. **No new opinions yet:** capture · don't editorialize · decision phase comes last

---

## Audit completion criteria

Audit is "done" when:

- [ ] Every OG atom has WWWWH doc
- [ ] Every OG molecule has WWWWH doc
- [ ] Top 15 OG organisms (highest-reuse) have WWWWH doc
- [ ] All 6 token domains documented (color · typography · spacing · shadow · radius · motion)
- [ ] All 5 worked-example projects audited for consumer-side patterns
- [ ] 10 industry DSs researched + synthesis doc written
- [ ] Gap analysis complete (OG-vs-new · OG-vs-industry · prioritized actions)
- [ ] Decision record written (recommended path forward · trade-offs · effort)
- [ ] User reviews + picks path
