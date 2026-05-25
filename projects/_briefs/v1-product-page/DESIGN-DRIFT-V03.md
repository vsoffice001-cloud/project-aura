# DESIGN-DRIFT-V03 · v0.3 vs Legacy Refs

> User flagged: "v0.3 looks different from legacy design pages." Cross-checked against 3 canonical refs (V0_lite_report-legacy · V0.2-for-design-system · report-store-legacy) + research docs (DECISIONS.md · PRD-V2-design-direction.md · RESEARCH.md · SECTION-CANON-V03.md).
>
> **Source canon:**
> - Type scale: Major Third 1.25× · `V0_lite_report-legacy/src/design-system/tokens.ts`
> - Card pattern: 10px radius + dual-layer shadow + hover lift · `report-store-legacy/src/app/components/Card.tsx`
> - SectionLabel: `text-xs uppercase tracking-[0.2em] font-semibold` · `V0_lite_report-legacy/src/design-system/components/SectionLabel.tsx`
> - SectionHeading: H2 `text-[1.953rem] sm:text-[2.441rem]` font-serif font-light · `V0_lite_report-legacy/src/design-system/components/SectionHeading.tsx`
> - 92-5-3 color hierarchy · Brand red `#b01f24` ONLY for CTAs (5% usage)
> - PRD core grammar: `Title + Insight + Text + Chart/Stat + Analyst + CTA` per section

---

## §1 · Top-level drift summary

| # | Area | Legacy canon | Current v0.3 | Severity |
|---|---|---|---|---|
| 1 | **Type scale** | Major Third 1.25× exact (`2.441rem` / `1.953rem` / `1.563rem` / `1.25rem` / `1rem` / `0.8rem`) | Mixed · uses `var(--text-3xl)` Tailwind tokens · NOT Major Third aligned | **HIGH** |
| 2 | **SectionLabel tracking** | `tracking-[0.2em]` uppercase font-semibold text-xs | `letterSpacing: '0.06em'` text-xs uppercase | **HIGH** |
| 3 | **SectionHeading H2** | serif **font-light** `font-weight: 300` size `1.953rem` (31.25px) mobile · `2.441rem` (39px) desktop | DS atom serif weight 700 size unclear (likely defaults to ~32px) | **HIGH** |
| 4 | **Card pattern** | radius **10px** · shadow `0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)` rest → `0 8px 30px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)` hover · border `rgba(0,0,0,0.06)` → `0.10` hover · lift `translateY(-2px)` · transition `0.4s cubic-bezier(0.16, 1, 0.3, 1)` | radius 8px · border `rgba(0,0,0,0.07)` static · NO hover lift · NO shadow | **HIGH** |
| 5 | **Brand red usage** | 5% only · CTAs only (filled brand-red) · NOT for icons · NOT for badges · NOT for borders | Used everywhere · icon circles · badge bgs · borders · brand-red glow in Hero | **MED** |
| 6 | **SectionHeading default align** | `center` | Always left-aligned via header trio div | **MED** |
| 7 | **Hero cinematic depth** | Per DECISIONS D2.1+D2.2 · multi-blob glow · gradient mesh · noise · motion · Stripe Atlas / Linear / Vercel level premium | Has gradient + 2 orbs + grid overlay · NO noise · NO motion on orbs · feels static · less depth | **MED** |
| 8 | **PRD core grammar** | Every section: Title + Eyebrow + Insight one-liner + Body text + Chart/Stat + Analyst interpretation + Unlock/CTA | Most sections: Eyebrow + Title + summary + content (NO analyst interpretation · NO inline CTA moments) | **MED** |
| 9 | **Spacing rhythm** | `lg = py-12 md:py-20` (48/80px) section · gap 40/64 grid · 24px card pad | Mixed · `space-y-10` between sections · 20px/24px card pad varies | **LOW** |
| 10 | **Container max** | `wide = max-w-[1200px]` · `content = max-w-[1000px]` · padding `px-4 sm:px-6 md:px-8` | `1240px` · padding `var(--space-6)` (24px) static | **LOW** |
| 11 | **Tabs visual** | Radix Tabs · rounded-xl bg-muted (subtle gray pill bg) | Same primitive · OK · no drift | none |
| 12 | **Empty-state** | NEVER render empty cards · `shouldRenderSection()` guard mandatory | Most sections guard correctly · some still render empty (legacy stub macroeconomicIndicators in mock) | **LOW** |
| 13 | **In-section card hover** | Lift + shadow intensify (Card component canonical) | Static · only motion entrance · no hover | **MED** |
| 14 | **Brand red icon circles** | Should be subtle bg (`bg-{color}15` = 8% alpha) w/ icon in same color | Most cards use `rgba(176,31,36,0.08)` background + brand-red icon — matches BUT used too often (overuses 5% budget) | **LOW** |
| 15 | **Anti-pattern · inline styles** | DS atoms used pure (className-driven) | Heavy inline `style={{}}` on every section (`fontFamily: 'var(--font-noto-serif)'`) — verbose · drift risk | **LOW** (architectural · address later) |

---

## §2 · Per-component canonical specs (the rules to enforce)

### 2.1 · Type scale (Major Third 1.25×)
| Token | Value | Usage |
|---|---|---|
| `text-3xl` | **3.052rem (48.8px)** | Hero H1 ONLY |
| `text-2xl` | **2.441rem (39px)** | Section H2 desktop |
| `text-xl` | **1.953rem (31.25px)** | H3 subsection · Section H2 mobile |
| `text-lg` | **1.563rem (25px)** | Card titles (2-3 cards) |
| `text-base` | **1.25rem (20px)** | Large body · card titles (4+) |
| `text-sm` | **1rem (16px)** | Standard body |
| `text-xs` | **0.8rem (12.8px)** | Labels · metadata |

### 2.2 · SectionLabel (eyebrow)
```css
font-sans
font-semibold
tracking-[0.2em]          /* NOT 0.06em — must be wider */
uppercase
text-xs                    /* 12.8px */
color: #b01f24 (accent variant) | #737373 (default)
```

### 2.3 · SectionHeading H2
```css
font-family: serif (Noto Serif)
font-weight: 300 (light)   /* CRITICAL — light not bold/semibold */
font-size: 1.953rem mobile → 2.441rem desktop
line-height: leading-tight (1.2)
letter-spacing: tracking-tight (-0.025em equiv)
default align: center      /* with eyebrow alignment above */
```

### 2.4 · Card pattern (canonical · 10px radius)
```css
border-radius: 10px (var --rc-radius-card)
border: 1px solid rgba(0,0,0,0.06)
background: var(--white)
box-shadow:
  rest:  0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)
  hover: 0 8px 30px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)
transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1)
hover:
  transform: translateY(-2px)
  border-color: rgba(0,0,0,0.10)
```

### 2.5 · Section spacing rhythm
```
section:    py-12 md:py-20    (48px → 80px) · spacing="lg"
header trio mb-12             (48px below H2 trio)
card-grid gap-4 md:gap-6      (16 → 24px)
within-card padding p-6       (24px)
section max-w: 1000 content / 1200 wide
```

### 2.6 · CTA hierarchy (3-tier strict)
- **Primary** (Download Sample · brand-red filled): Hero · FinalCTA · BottomCTABar
- **Secondary** (Customize · brand-red outlined): inline CTAs per section
- **Tertiary** (Talk to Analyst · ghost): supporting/contextual
- Max 2 CTAs in same viewport. Mobile: 1 per viewport.

### 2.7 · Hero cinematic (D2 DECISIONS canon)
Light + dark BOTH cinematic premium:
- Multi-blob glow (3+ orbs · animated · drift)
- Gradient mesh background (radial blends · not flat)
- Subtle noise/grain texture overlay
- Motion: gentle orb drift + parallax on scroll
- Type: serif H1 + sans subhead · ample whitespace
- Right rail: report cover image OR mini chart preview OR 3-stat callout stack
- Trust strip: logos · stats · "trusted by"

---

## §3 · Fix order (highest-impact first)

| P | Fix | Files | Effort |
|---|---|---|---|
| **P0** | Adopt Major Third type scale in globals.css · update CSS vars `--text-*` | `src/app/globals.css` | S |
| **P0** | SectionHeading default `font-weight: 300` (serif light) — patch DS atom usage where overridden | `SectionHeading` callsites · or global CSS override | S |
| **P0** | SectionLabel `tracking-[0.2em]` (was 0.06em) — global CSS override targeting SectionLabel atoms | `globals.css` scope override | S |
| **P0** | Card pattern unify · 10px radius · dual-shadow · hover lift · transition · add `pdp-card` utility class | `globals.css` + section inline-style replacement w/ class | M |
| **P1** | Hero cinematic upgrade · animated orbs (Framer motion) · noise overlay · 3rd center orb · type tracking-tight | `HeroSection.tsx` | M |
| **P1** | SectionWrapper align default center · adjust section headers to center w/ eyebrow above | `SectionWrapper.tsx` callsites | S |
| **P1** | Spacing rhythm enforce · `mb-12` after section header trio · `gap-6` for card grids | Per-section inline tweaks via CSS class | M |
| **P2** | PRD core grammar pass · add Analyst Interpretation block to top sections (ExecSummary · MarketSize · Industry · Competitor · Methodology) | Per-section additions | L |
| **P2** | Brand red usage audit · move purple/teal accent for non-CTA icons · keep brand-red CTAs only | Icon color audit | M |
| **P3** | Inline-style → className migration · architectural cleanup | Future sprint | L |

---

## §4 · Concrete CSS patch (apply to globals.css)

```css
/* ─── Major Third type scale · v0.3 polish 2026-05-18 ────────────────── */
:root {
  --text-xs:   0.8rem;     /* 12.8px */
  --text-sm:   1rem;       /* 16px */
  --text-base: 1.25rem;    /* 20px */
  --text-lg:   1.563rem;   /* 25px */
  --text-xl:   1.953rem;   /* 31.25px */
  --text-2xl:  2.441rem;   /* 39px */
  --text-3xl:  3.052rem;   /* 48.8px */
  --text-4xl:  3.815rem;   /* 61px */
  --text-5xl:  4.769rem;   /* 76.3px */

  /* Card pattern */
  --pdp-card-radius: 10px;
  --pdp-card-border: 1px solid rgba(0,0,0,0.06);
  --pdp-card-border-hover: 1px solid rgba(0,0,0,0.10);
  --pdp-card-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02);
  --pdp-card-shadow-hover: 0 8px 30px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04);
  --pdp-card-transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

/* ─── SectionLabel canonical tracking ───────────────────────────────── */
[data-component="SectionLabel"] {
  letter-spacing: 0.2em !important;
  font-weight: 600;
}

/* ─── SectionHeading H2 serif light ─────────────────────────────────── */
[data-component="SectionHeading"] h2,
[data-component="SectionHeading"] h1 {
  font-weight: 300 !important;
  font-family: var(--font-noto-serif, Georgia, serif);
  letter-spacing: -0.025em;
  line-height: 1.2;
}

/* ─── Canonical PDP card utility ────────────────────────────────────── */
.pdp-card {
  border-radius: var(--pdp-card-radius);
  border: var(--pdp-card-border);
  background: var(--bg-pure-white, #ffffff);
  box-shadow: var(--pdp-card-shadow);
  transition: var(--pdp-card-transition);
}
.pdp-card:hover {
  border-color: rgba(0,0,0,0.10);
  box-shadow: var(--pdp-card-shadow-hover);
  transform: translateY(-2px);
}

/* ─── Hero cinematic upgrade ────────────────────────────────────────── */
[data-component="HeroSection"][data-variant-section="cinematic"] {
  background-image:
    radial-gradient(ellipse at 20% 30%, rgba(176, 31, 36, 0.18) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 70%, rgba(128, 108, 224, 0.12) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 100%, rgba(195, 198, 249, 0.08) 0%, transparent 50%),
    linear-gradient(135deg, #0a0a0c 0%, #171719 60%, #0a0a0c 100%);
}
[data-component="HeroSection"][data-variant-section="cinematic"]::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    url("data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='noise'><feTurbulence type='fractalNoise' baseFrequency='0.85'/></filter><rect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/></svg>");
  opacity: 0.04;
  pointer-events: none;
  mix-blend-mode: overlay;
}
```

---

## §5 · Research alignment verdict

Cross-checked v0.3 build against research docs:

| Research source | Rule | v0.3 status |
|---|---|---|
| PRD V2.1 §5 | 30 canonical sections (renumbered 1-30) | 25 of 30 built · 5 still missing (Trust Strip · Value Chain · Challenges-Solutions paired · SWOT separate · Recommendations distinct from Opportunities) |
| PRD §6.1 | Hero title exact `Australia Cold Chain Market Outlook (2022-2027)` | ✅ MATCHES |
| PRD §6.1 | CAGR 10.03% canonical | ✅ MATCHES |
| PRD §7 core grammar | Title + Insight + Text + Chart + Analyst + CTA per section | ❌ Most sections skip Analyst interpretation + inline CTA moment |
| PRD §6.5 | Ecosystem 4-tab (Cold Chain · Cold Storage · Cold Transport · Associations) | ❌ Current Ecosystem doesn't have 4 tabs |
| PRD §6.4 | Segmentation 7 tabs (End-User · Type · Temp · Region · Truck · Mode · Domestic-Intl) | ❌ Current has 1 tab |
| DECISIONS D2 | Hero CINEMATIC light+dark · multi-blob glow · gradient mesh · noise · motion | ⚠️ Partial · has gradient + 2 orbs · MISSING noise + motion + 3rd center orb |
| DECISIONS D3 | Token discipline · NO new hex · use core-v2 only | ⚠️ Several hardcoded `#15803d`/`#92400e`/`#1d4ed8` in IndustrySection SWOT quadrants — should use token |
| DECISIONS D5 | NEVER render empty cards/tabs | ✅ MATCHES (shouldRenderSection guards) |
| RESEARCH §9.4 | 6 key-stat cards in auto-fit grid | ✅ MATCHES (KeyStatsStrip) |
| RESEARCH §9.6 | Sample-value-demo BEFORE gate (1 chart + 1 segment narrative inline) | ✅ MATCHES (CompetitorSection 3 public + 2 metered) |
| RESEARCH §9.8 | 3-tier CTA hierarchy | ⚠️ Partial — primary in Hero/FinalCTA OK · secondary/tertiary not consistent |
| Major Third 1.25× type scale | exact ratios | ❌ Tailwind defaults don't match |
| 92-5-3 color hierarchy | red ONLY for CTAs (5%) | ❌ Red used in icon circles + badges + section borders |
| Card pattern 10px + hover lift | canonical | ❌ Static 8px no hover |

**Verdict:** v0.3 has correct architecture + content + tabs structure. Visual polish drift in type scale · card pattern · color usage · Hero cinematic depth · section grammar.

---

## §6 · Execution plan · next session

P0 (today): apply `globals.css` patch · single file change · zero new components · zero regression risk.
P1 (next session): Hero cinematic upgrade · Section align center default · spacing rhythm.
P2 (later): PRD grammar pass · Analyst interpretation blocks · brand-red usage audit · Ecosystem 4-tab · Segmentation 7-tab.
