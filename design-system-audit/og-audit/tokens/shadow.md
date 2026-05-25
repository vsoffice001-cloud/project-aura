# OG Token Audit · Shadow / Elevation

**Source-of-truth:** `src/styles/theme.css:535–555` (5 neutral + 3 accent shadows) · `src/design-system/tokens.ts:176–192` (TS parallel · 3 levels + brand button + accent) · `Card.tsx:13` (card transition inline) · `ResourcesContent.tsx:1038–1045` (elevation reference snippet)
**Audit date:** 2026-05-14 · WWWWH framework

---

## WWWWH

**WHAT** — Shadow is a **two-track elevation system**: a primary **5-level neutral ramp** (`--shadow-none` → `--shadow-2xl`) using black at 8/12/15/18/24% opacity, plus an **accent track** (`--shadow-accent-sm/md/lg`) using purple-tinted multi-stop shadows reserved for "premium/featured" elements. The TS `tokens.ts` exposes a simpler 3-level surface (`sm/md/lg`) plus brand-button special-case and accent shadow tints — historical pre-expansion shape preserved for backwards compat.

**WHY a separate domain** — Shadow encodes **depth hierarchy** (Material Design / iOS depth metaphor). It MUST stay neutral-only by default to avoid color noise · accent shadows are the singular exception (purple = premium tier per 92-5-3). Without tokenized shadow, every card would re-invent its own `box-shadow` and the elevation system fragments.

**WHEN to use** ✅
- Use `--shadow-sm` for subtle resting card depth (1dp equivalent)
- Use `--shadow-md` for default cards (rest state · 4dp)
- Use `--shadow-lg` for hovered cards / dropdown panels (8dp)
- Use `--shadow-xl` for modals · popovers (12dp)
- Use `--shadow-2xl` for highest elevation · drawers · overlays (20dp)
- Use `--shadow-accent-*` ONLY for premium/featured cards (purple tier · max 1–2 per view)
- Use brand-button shadow (`tokens.ts:182`) ONLY on brand CTA at rest + hover

**WHEN NOT to use** ❌
- NEVER stack 2+ shadow tokens together (visual blur · breaks depth metaphor)
- NEVER use brand-red shadows (`COLORS.md:33` forbids — purple is the only accent shadow)
- NEVER hardcode `box-shadow: 0 4px 12px rgba(0,0,0,0.12)` — that's `--shadow-md` · use the var
- NEVER use accent shadow on regular cards (decision-fatigue; only 1–2 "premium" elements per page)
- NEVER use `--shadow-2xl` on resting state (it's a modal/overlay token · sustained 2xl = visual noise)
- NEVER animate shadow blur with transform (use opacity tween or shadow-only transition)

**WHERE deployed** — `Card.tsx` (rest md → hover lg) · `Modal.tsx` / `ContactModal.tsx` (2xl) · `Navbar.tsx` (purple-tinted on scroll) · `Button.tsx` brand variant (special brand-button shadow) · `ScrollToTop.tsx` (`0 4px 16px / 0 8px 24px` near-equivalents · `ScrollToTop.tsx:53`).

**HOW to consume**
```tsx
// Default card
<div style={{ boxShadow: 'var(--shadow-md)' }}>

// Hover transition
<div style={{
  boxShadow: 'var(--shadow-md)',
  transition: 'box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
}}
onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow-lg)'}>

// Premium / featured card
<div style={{ boxShadow: 'var(--shadow-accent-md)' }}>

// Tailwind arbitrary
<div className="shadow-[var(--shadow-lg)]">

// NEVER:
<div className="shadow-2xl">                          // ❌ Tailwind generic
<div style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }}>  // ❌ hardcoded
```

---

## Neutral ramp (5-tier · `theme.css:545–550`)

```css
--shadow-none: none;
--shadow-sm:   0 1px 3px  rgba(0, 0, 0, 0.08);
--shadow-md:   0 4px 12px rgba(0, 0, 0, 0.12);
--shadow-lg:   0 8px 24px rgba(0, 0, 0, 0.15);
--shadow-xl:   0 12px 32px rgba(0, 0, 0, 0.18);
--shadow-2xl:  0 20px 48px rgba(0, 0, 0, 0.24);
```

### WHY 5 tiers not 3 not 8

- **3 tiers** (the original `tokens.ts:177–179` simpler form) — too coarse for the modal · panel · drawer separation needed once dashboards landed
- **8 tiers** (Material Design 24dp ramp) — over-specified for an editorial system that uses elevation sparingly
- **5 tiers** — covers card-rest / card-hover / dropdown / modal / overlay distinctly

### WHY single-stop blur (not multi-stop)

Each neutral shadow is a **single drop shadow** (one offset, one blur). Many DS use two-stop shadows (one tight + one diffuse) for "Apple realism." OG chose single-stop because:
1. Single-stop renders faster (one rasterization)
2. Editorial layouts already have warm-300 background + serif headings — extra shadow softness reads as "too soft / web 2.0"
3. Single-stop pairs cleanly with sharp `radius-card 10px` corners

| Token | Y-offset | Blur | Opacity | Visual role | WHY this exact value |
|---|---|---|---|---|---|
| `--shadow-none` | 0 | 0 | 0 | Flat / inset | Explicit "no shadow" token for `Card hover={false}` paths |
| `--shadow-sm` | 1px | 3px | 8% | Resting subtle lift | Just-perceivable depth · doesn't darken light bg |
| `--shadow-md` | 4px | 12px | 12% | **DEFAULT card** | Clear depth · WCAG visible · doesn't dominate |
| `--shadow-lg` | 8px | 24px | 15% | Hover state · dropdown | Step-doubled offset signals "lifted further" |
| `--shadow-xl` | 12px | 32px | 18% | Modal panel | Floating-above-page intent |
| `--shadow-2xl` | 20px | 48px | 24% | Highest overlay · drawer | Maximum dramatic depth |

**Progression math** — Offset doubles (1→4→8→12→20) · blur ~3× offset (consistent diffuse-to-offset ratio) · opacity climbs ~1.5× per tier (8→12→15→18→24). Predictable scaling.

**Modification risk** — Drop any tier and consumers wedge between siblings (e.g. md→lg jump too aggressive). Add a tier and you create decision fatigue. Five is the locked count.

---

## Accent shadows (purple · `theme.css:553–555`)

```css
--shadow-accent-sm: 0 2px 8px rgba(128, 108, 224, 0.15),
                    0 1px 3px rgba(0, 0, 0, 0.08);

--shadow-accent-md: 0 8px 24px rgba(128, 108, 224, 0.24),
                    0 2px 8px rgba(0, 0, 0, 0.12);

--shadow-accent-lg: 0 16px 40px rgba(128, 108, 224, 0.32),
                    0 4px 12px rgba(0, 0, 0, 0.15);
```

### WHY multi-stop here

Unlike neutral shadows, accent shadows use **two stops**: a tinted-purple diffuse + a neutral grounding stop. WHY:
- Single-stop purple at 15% would tint the surrounding light · look like a "bug"
- The neutral grounding stop anchors the card in space · the purple stop adds the "premium glow"
- This is the singular brand-perception cue for "this is featured/premium content"

### WHY rgba(128, 108, 224)

`#806ce0` = `--purple-600` (BASE purple). Confirms the accent shadow is tied to the same purple used for content icons + premium badges — single accent identity.

### Opacity ladder reasoning

- 15% / 8% — subtle: featured card at rest
- 24% / 12% — clear: featured card hovered
- 32% / 15% — emphatic: hero-tier premium element (max one per view)

**Modification risk** — Using brand-red for accent shadow would conflate "premium" with "buy now" — kills both signals. Per `COLORS.md:33`: *"Brand red shadows"* explicitly forbidden in card shadows.

---

## Brand-button shadow (`tokens.ts:182–185`)

```ts
brandButton: {
  default: '0 8px 24px rgba(176, 31, 36, 0.15)',
  hover:   '0 12px 32px rgba(176, 31, 36, 0.25)',
}
```

**Why this is the ONE exception to "no red shadows"** — Brand CTA buttons emit a faint red glow at rest as the conversion signal. This is intentional brand identity (the only place red leaves a shadow trace). Limited to brand-variant Button only.

**Opacity 15% → 25%** on hover creates Weber-Law-perceptible glow intensification.

**Note** — Not exposed as CSS var · only via `tokens.ts`. Decision-phase candidate to add as `--shadow-brand-button-default / -hover`.

---

## Accent shadow tints (`tokens.ts:188–191`) — simplified accent

```ts
accent: {
  purple: '0 8px 24px rgba(128, 108, 224, 0.06)',
  warm:   '0 4px 12px rgba(217, 209, 206, 0.08)',
}
```

**Difference from `--shadow-accent-*`** — These TS-only tints are **single-stop · much lower opacity** (6%/8% vs 15%/24%). Used for the gentlest premium hint (e.g. resting featured card before hover). The CSS var `--shadow-accent-*` is the bolder version. Two parallel scales exist — flagged for reconciliation.

---

## Hover transition pattern (canonical · `Card.tsx:13`)

```ts
// Verbatim from Card.tsx:13
// "Transition: 0.4s cubic-bezier(0.16, 1, 0.3, 1)"

transition: 'box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1),
             transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
             border-color 0.4s ease'
```

**WHY 400ms · NOT 200ms** — Shadow transitions feel "premium" at 400ms · 200ms feels rushed (the lift isn't perceived, just snaps). 600ms+ feels sluggish. 400ms is the editorial sweet spot.

**WHY cubic-bezier(0.16, 1, 0.3, 1)** — Custom "ease-out-quart" feel · starts fast (0.16) then strongly decelerates to a soft landing (0.3, 1). Better than default `ease-out` for depth changes — mimics gravity easing.

---

## Card elevation pattern (4-tier within Card.tsx)

Per `COMPONENT_GUIDELINES_4WH.md:1372`:
```tsx
<Card variant="white" padding="md" shadow="md">    // default
<Card variant="warm" padding="lg" shadow="sm">      // subtle
<Card hover={false} shadow="none" padding="sm">     // flat
```

Card prop maps: `'none' | 'sm' | 'md' | 'lg'` → respective `--shadow-*` tokens.
On hover (when `hover={true}` default): card uses next-tier shadow (md → lg).
The `xl` and `2xl` tiers are intentionally NOT exposed on Card (reserved for modal/drawer).

---

## Modal / dropdown / overlay shadows

Per usage scan:
- **ContactModal** (`ContactModal.tsx:74`) — uses Tailwind `shadow-2xl` (~`--shadow-2xl`)
- **Navbar** (`Navbar.tsx:50`) — purple-tinted on scroll: `0px 8px 12px -4px rgba(128, 108, 224, 0.15)`
- **ScrollToTop** (`ScrollToTop.tsx:53`) — `0 4px 16px rgba(0,0,0,0.12)` rest → `0 8px 24px rgba(0,0,0,0.18)` hover (≈ md→lg)

**Inconsistency flagged** — Some components use Tailwind shadow classes · others use CSS vars · some hardcode. Reconciliation candidate for decision phase.

---

## Reduced-motion handling

Shadow transitions automatically suppressed via global `prefers-reduced-motion` rule (`theme.css:828`). Card.tsx's transition only applies when user hasn't requested reduced motion.

```css
@media (prefers-reduced-motion: reduce) {
  .badge { transition: none !important; }
  /* Card.tsx replicates this pattern via inline conditional */
}
```

---

## Comparison: theme.css 5-tier vs tokens.ts 3-tier

| theme.css CSS var | tokens.ts equivalent | Status |
|---|---|---|
| `--shadow-none` | — | CSS only |
| `--shadow-sm` (1/3/8%) | `shadows.sm` (`0 1px 2px / 0.05`) | Mismatch values — flagged |
| `--shadow-md` (4/12/12%) | `shadows.md` (`0 4px 6px -1px / 0.1`) | Mismatch values — flagged |
| `--shadow-lg` (8/24/15%) | `shadows.lg` (`0 10px 15px -3px / 0.1`) | Mismatch values — flagged |
| `--shadow-xl` (12/32/18%) | — | CSS only |
| `--shadow-2xl` (20/48/24%) | — | CSS only |
| `--shadow-accent-sm/md/lg` | `shadows.accent.{purple,warm}` | Different shapes |
| — | `shadows.brandButton.{default,hover}` | TS only |

**Decision-phase priority** — Reconcile or pick canonical track. CSS-var track is more complete + matches comments-as-docs; TS track is more conservative. Both reference same intent but drifted.

---

## Anti-patterns (master list)

| Anti-pattern | Where banned | Use instead |
|---|---|---|
| Stacking 2+ shadows manually | implicit | Use accent shadow (already 2-stop) |
| Red/rose shadow on card | `COLORS.md:33` | `--shadow-accent-*` (purple) |
| Hardcoded `box-shadow: ...` | by convention | `var(--shadow-*)` |
| Tailwind `shadow-2xl` | implicit (varies by component) | `shadow-[var(--shadow-2xl)]` |
| Shadow on resting hero h1 | implicit | Heroes are flat · drama via type |
| Animating shadow + transform together >400ms | `Card.tsx:92` | Stay within 0.4s ease-out-quart |
| `--shadow-2xl` on regular card rest | implicit | `--shadow-md` rest · `--shadow-lg` hover |

---

## REUSABILITY SCORE
**4/5 ⭐⭐⭐⭐** — Used on every elevated surface (cards · modals · dropdowns · navbar). Lower than colors/spacing because flat sections (hero · body text) don't consume shadow. Plus active reconciliation gap between CSS-var and TS tracks.

## LINKED concepts
- **colors.md** — purple-600 `#806ce0` underlies all accent shadows · brand-red underlies brand-button shadow
- **radius.md** — shadow + radius pair (10px radius card looks unbalanced with 32px+ blur)
- **motion.md** — shadow transitions use the 400ms / `cubic-bezier(0.16, 1, 0.3, 1)` curve
- **Card.tsx** — primary consumer · 4-tier shadow prop maps to none/sm/md/lg
- **Navbar.tsx** — purple-tinted scroll shadow (DS-level brand cue)
- **Button.tsx** — brand-button special shadow at rest + hover
- **`prefers-reduced-motion`** — global suppression at `theme.css:828`
- **TS / CSS reconciliation gap** — flagged for decision phase
