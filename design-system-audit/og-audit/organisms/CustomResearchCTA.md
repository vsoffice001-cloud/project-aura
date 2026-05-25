# CustomResearchCTA — Organism Audit (OG · Wrapper)

**Source:** `Design_system_vs_26 (og and final)/src/app/components/organisms/CustomResearchCTA.tsx` (30 LOC)
**Reuse tier:** ⭐⭐⭐⭐☆ (4/5) — RS-specific CTA wrapper
**Status:** Thin wrapper · clean pattern · port-ready

---

## 1. WHAT

Report Store-specific CTA banner — thin wrapper around `CTABanner` with RS copy pulled from `CTA_CONFIG` in `data.ts`. Per OG JSDoc (L1–8): *"WHAT: Report Store–specific CTA banner wrapping CTABanner with RS copy. WHY: Encapsulates the final CTA configuration."*

---

## 2. WHY

- CTABanner is generic · Report Store needs **specific** CTA copy ("Need custom research? Talk to analyst")
- Encapsulating that config + `primaryShowArrow=true` (RS-signature) lets RSPage stay declarative
- Co-locates "what's the final ask" config in one place
- Mirrors `ReportStoreHero` / `FeaturedResearch` wrapper pattern — consistent across all RS sections
- Exposes `onPrimaryClick` / `onSecondaryClick` so parent can route handlers (e.g. open modal · navigate to listing) without owning the copy

---

## 3. WHEN to use ✅

- Final section of Report Store HOME page (`ReportStorePage.tsx:111`)
- Bottom of Report Store landing surfaces (legacy projects)
- When you need the canonical RS "custom research" CTA

---

## 4. WHEN NOT to use ❌

- Other pillars → use their own wrapper (`SurveysCTA`, etc.)
- Mid-page CTA → use `<Button>` inline or `<InlineCTA>` (n/a · gap)
- Case-study bottom → use `FinalCTASection.tsx` (different layout · ContactModal)
- Generic context → use `CTABanner` directly w/ explicit props

---

## 5. WHERE used (consumer file:line)

- `Design_system_vs_26.../src/app/components/ReportStorePage.tsx:111` — Section 10 of HOME mode
- `Design_system_vs_26.../src/app/components/organisms/index.ts:45` — barrel export
- `projects/report-store-legacy/src/app/components/CustomResearchCTA.tsx` — port
- `projects/competition-benchmarking-listing-v02/src/app/components/BenchmarkCustomResearchCTA.tsx` — renamed port

---

## 6. HOW to implement

```tsx
import { CustomResearchCTA } from '@/app/components/organisms';

// w/ handlers
<CustomResearchCTA
  onPrimaryClick={() => openBookingModal()}
  onSecondaryClick={() => setMode('listing')}
/>

// Default no handlers (buttons render but don't do anything · placeholder mode)
<CustomResearchCTA />
```

Body (L17–29):

```tsx
export function CustomResearchCTA({ onPrimaryClick, onSecondaryClick }) {
  return (
    <CTABanner
      label={CTA_CONFIG.label}
      title={CTA_CONFIG.title}
      subtitle={CTA_CONFIG.subtitle}
      primaryText={CTA_CONFIG.primaryText}
      primaryShowArrow
      secondaryText={CTA_CONFIG.secondaryText}
      onPrimaryClick={onPrimaryClick}
      onSecondaryClick={onSecondaryClick}
    />
  );
}
```

---

## 7. Composition tree

```
CustomResearchCTA
└─ CTABanner (full reuse · see CTABanner.md audit)
   └─ SectionWrapper(black) → SectionHeading(center) → Button row
```

**Imports:** `CTABanner` · `CTA_CONFIG` (data.ts)

---

## 8. Properties · WHY each exists

| Prop | Type | Default | Why |
|---|---|---|---|
| onPrimaryClick | () => void? | — | Routes primary CTA click — typically opens custom-research booking modal |
| onSecondaryClick | () => void? | — | Routes secondary CTA — typically navigates to Browse listing |

**Note:** Doesn't expose `background` · `label` · `title` · etc. — those locked to CTA_CONFIG. Could be enhanced w/ override props.

---

## 9. Data contract

```ts
// data.ts canonical source
export const CTA_CONFIG = {
  label: string,
  title: string,
  subtitle: string,
  primaryText: string,
  secondaryText: string,
} as const;

// Wrapper exposes only handlers
interface CustomResearchCTAProps {
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}
```

Consumer responsibility: provide handlers · DS owns copy/layout/surface (black via CTABanner default).

---

## 10. States

Pure pass-through. All states inherited from CTABanner.

---

## 11. Variants

**OG: single variant.** Locks `primaryShowArrow=true` (RS-signature interaction).

---

## 12. Responsive behavior

Inherited from CTABanner — and inherits CTABanner's mobile-button-stacking bug (buttons don't stack at <sm).

---

## 13. Tokens used

Inherited from CTABanner.

---

## 14. A11y rules

Inherited from CTABanner.

---

## 15. Motion rules

Inherited. Primary button gets the AnimatedArrow signature interaction (via `primaryShowArrow`).

---

## 16. Anti-patterns ❌

- ❌ Only exposes 2 handler props · no copy override · no surface override
- ❌ `primaryShowArrow` hard-locked true — no opt-out
- ❌ CTA_CONFIG copy in shared `data.ts` w/ 30KB of demo data — should be localized
- ❌ No `className` passthrough
- ❌ No ability to A/B test different CTA copy without editing data.ts

---

## 17. REUSABILITY SCORE

**4/5 ⭐⭐⭐⭐☆** — pillar-specific wrapper · single-use by design. Pattern is sound.

---

## 18. Linked components

- **Composes:** `CTABanner`
- **Reads config from:** `data.ts` → `CTA_CONFIG`
- **Sibling wrappers:** `ReportStoreHero` · `FeaturedResearch` · `AnalystPicks` · etc.
- **Parent consumer:** `ReportStorePage` Section 10 (HOME MODE)

---

## 19. Composition rule (in a page recipe)

**ReportStorePage HOME MODE (L83–112):**

```
...
Section 9:  ResearchMethodology     (warm)
Section 10: CustomResearchCTA       ← THIS · black · FINAL
```

**Before:** ResearchMethodology (warm) — black=strong bg-flip at conversion moment
**After:** end of HOME mode (or Footer · n/a)
**Bg-alternation:** warm → black = canonical conversion-close.

---

## 20. Reasons + Decisions log

- **Why pass-through handlers but lock copy?** Marketing controls copy via data.ts · Engineering routes handlers · clean separation of concerns.
- **Why `primaryShowArrow` always true?** Per RS-design-decision — primary CTA on Report Store ALWAYS has the AnimatedArrow signature. Brand-locked interaction · not configurable.
- **Why no `background` override?** Per CTA_CONFIG · final CTA on RS is always cinematic-dark black. If a variant page needs warm/white, fork the wrapper.
- **Why exposed as 2 props not 0?** Different page modes need different actions (HOME's secondary → switch to LISTING mode · standalone landing's secondary → external link). Handlers must be parent-controllable.
- **Why "Custom Research" naming?** The primary CTA text in CTA_CONFIG is about ordering custom research — wrapper name matches the dominant intent. Subtly · the CTA also serves general conversion.
- **Why not a single OnClick prop?** Two CTAs · two handlers · ergonomic separation. Could be `{ primary, secondary }` object but flat props is more explicit at consumer site.

---

**Audit conclusion:** Model wrapper. Port to core-v2 w/ optional `override?: Partial<CTABannerProps>` for campaign A/B. Estimated effort: 30 minutes.
