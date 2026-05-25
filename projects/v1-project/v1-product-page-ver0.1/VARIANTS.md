# VARIANTS — reports-pdp-v2

**Date:** 2026-05-06
**Status:** PRD-locked. V2A primary. V2B + V2C deferred until V2A QA passes.
**Pairs with:** [`SCHEMA.md`](SCHEMA.md) · [`recipes/report-detail-prd.md`](../../design-system/recipes/report-detail-prd.md)

Three renderer variants share schema (`ReportDetailV2`) per PRD §38. Variant chosen via `meta.variant` on payload.

**Build order (PRD pilot rollout §52 Phase 6 maps to V2A):**
1. **V2A** — long-scroll editorial light w/ sticky tabbed nav. PRIMARY for V2 design phase. Closest to PRD §7 design direction ("premium, structured, research-led, enterprise-grade").
2. **V2B** — sectioned dashboard tabs (deferred). Cluster groupKey-driven panels. Validates dashboard buyer cohort.
3. **V2C** — cinematic dark chapter navigator (deferred). Premium-tier reports. Glow accents, oversized numerals.

All variants share Next.js 16 codebase. Variant = renderer template at layout level.

---

## V1A — Editorial Light A: Long-scroll publication (DEFAULT)

### Intent
Reads like a premium research publication. Generous whitespace, serif display, structured rhythm. Long-scroll w/ sticky TOC + progress bar. Best for narrative-arc reports (geographic markets, single-vertical reports).

### Surface
- **Variant:** editorial-light per Quick_start_guide.md
- **Bg base:** `--color-warm-300` `#f5f2f1` page bg, white section alternation
- **Text:** `#000` body, `--color-warm-900` (`rgba(0,0,0,0.7)`) secondary
- **Accent:** purple `--color-accent-purple` for chart series + `IconBadge`s
- **Brand red:** CTAs only (per Cat 2 anti-pattern Cat 1)

### Hero treatment — `ReportPDPHero` editorial-A
- **Layout:** 60/40 split desktop. Left = breadcrumb + eyebrow industry pill + title (Noto Serif `--text-3xl`) + one-liner (DM Sans `--text-lg` 0.7 opacity) + 3-stat row + CTA pair. Right = snapshot growth chart (recharts AreaChart, gradient fill, AUD Mn historic + dotted forecast).
- **Mobile:** stacked. Title → one-liner → stats (3-col mini grid) → snapshot chart 16/9 → CTAs full-width.
- **Trust strip below hero:** analyst portrait (40px) + name + role + "Last updated Q1 2026" + share icons. Inline `<span>` separators, no badges-on-badges.
- **Bg:** warm-300.

### Density
- All organisms render inline. No tabs, no accordions until heavy threshold (>40 modules).
- TOC = slim sticky-top progress bar (mobile) / 240px left rail (desktop ≥1280px). Numbered chapters, active dot animates via Framer `layoutId`.
- Chart density: max 2 charts per section row, then break.
- Vertical rhythm: 96px between sections desktop, 64px mobile.

### Schema rendering
- `module.background` honors recipe's strict alternation pattern.
- `module.gated` Tier-3 → render `<GatedTeaser />` — locked card w/ blur preview + sample CTA.
- `mod.matrix` heavy paginate: 10 rows + "Show all 24 players" expand.

### Motion
- Hero: GSAP timeline page-load. Title fade-up (200ms in), then stats stagger 80ms, then chart line-draw 800ms `--ease-out-expo`.
- Sections: Framer `whileInView` fade-up `--duration-medium` (500ms).
- Card grids (drivers, trends): `CardReveal` stagger 80ms `--ease-spring`.
- Charts: recharts entrance enabled, `isAnimationActive={true}`, `animationDuration={800}`, disabled under reduced-motion.
- Sticky CTA + progress bar: CSS `opacity` `--duration-base`. No translate.

### Reference patterns
- Closest analog: `recipes/case-study.md` (long-scroll, editorial light, sticky CTA) + `recipes/report-detail.md` (light variant).
- Reuse: `Navbar`, `SectionWrapper`, `SectionHeading`, `Button`, `CTALink`, `Badge`, `IconBadge`, `Container`, `FadeInSection`, `StickyCTA`, `ReadingProgressBar`, `TableOfContents`, `ResearchMethodology`, `ComparisonTable`, `EngagementObjectivesSection`, `ChallengesSection`, `RecommendedForYou`, `Footer`.
- Build new: `ReportPDPHero`, `ReportTOCRail`, `MarketDefinitionsBlock`, `TaxonomyTree`, `EcosystemTierGrid`, `ChartCard` (normalized recharts wrapper), `MatrixTable`, `SWOTQuadrant`, `ValueChainStepper`, `CompetitorTimeline`, `MarketPositioningQuadrant`, `EmergingTechNodes`, `MacroIndicatorPanel`, `GatedTeaser`, `InlineCTASection`.

---

## V1B — Editorial Light B: Sectioned dashboard

### Intent
Dashboard-leaning. Buyer = analyst / ops team scanning quickly for specific data. Each cluster = ~1 viewport. Tab navigation collapses chart density.

### Surface
- **Variant:** editorial-light (same tokens as V1A)
- **Bg base:** `#fff` primary, warm-300 inter-tab dividers + sticky tab strip background
- **Text:** same as V1A
- **Accent:** purple + periwinkle for tab-active states
- **Brand red:** CTAs only

### Hero treatment — `ReportPDPHero` editorial-B
- **Layout:** 50/50 split desktop. Left = breadcrumb + title + one-liner + CTAs. Right = `MarketSizeChart` full (recharts ComboChart, historic+forecast). Stats moved BELOW hero into compact 5-col `StatsRow` strip.
- **Mobile:** stacked, chart compresses to 16/9.
- **Bg:** white.

### Density
- Module clusters collapse into sticky tab panels:
  - **Tab 1: Overview** (definitions + taxonomy)
  - **Tab 2: Market Size** (primary chart + segmentation charts)
  - **Tab 3: Dynamics** (SWOT + drivers + value chain + challenges)
  - **Tab 4: Competition** (timeline + market share + comparison + positioning)
  - **Tab 5: Forward** (trends + emerging tech + regulatory + forecasts)
  - **Tab 6: Macro & Methodology** (macro panel + methodology + limitations + FAQ)
- Sticky tab strip below hero. URL hash sync (`#overview`, `#market-size`, etc.).
- TOC drives tab state (click TOC entry → switch tab + scroll to anchor within tab).
- Charts within cluster stack vertically inside each tab.

### Schema rendering
- `module.groupKey` drives tab assignment. Renderer groups by groupKey before rendering.
- Inline CTAs render at end of each tab pane (sample + analyst).
- Tier-3 gated → locked card within Macro tab.

### Motion
- Hero: same GSAP timeline as V1A.
- Tab switch: Framer `AnimatePresence` fade `--duration-base` (300ms). `mode="wait"` to avoid overlap.
- Section entrances within tab: Framer fade-up `--duration-medium`.
- Charts: recharts entrance on tab-enter, `isAnimationActive={true}`.

### Reference patterns
- Closest analog: `recipes/report-store-listing.md` (dashboard-leaning, filter-driven).
- Reuse: same as V1A + sticky tab strip.
- Build new: same as V1A + `ReportPDPTabStrip` (sticky 6-tab nav w/ active state + count badges per tab).

---

## V1C — Cinematic Dark: Chapter navigator

### Intent
Premium-tier reports. Executive buyer, RFP-driven evaluation. Cinematic motion, dark immersive surface, oversized numerals, glow accents. Each cluster = "chapter."

### Surface
- **Variant:** cinematic-dark (`design-system/core/` cinematic variant)
- **Bg base:** `#0a0a0c` solid throughout. No alternation; section dividers via subtle gradients (`linear-gradient(180deg, rgba(0,229,255,0.08) 0%, transparent 100%)`).
- **Text:** `#FAFAFA` primary, `rgba(250,250,250,0.6)` secondary
- **Accent:** `--accent-teal` `#00e5ff` ONLY (per Cat 2 anti-pattern Cat 6 — cinematic dark uses teal, not purple)
- **Brand red:** CTAs only, slightly desaturated for dark surface

### Hero treatment — `ReportPDPHero` cinematic-dark
- **Layout:** centered, full-bleed. Eyebrow industry pill (uppercase tracking-wider). Oversized title (Noto Serif `--text-3xl` weight 900). Animated counter on first stat (count from 0 → final number). Glow accent behind primary stat. Snapshot chart = motion-led — line-draw on load, point dots pulse.
- **Mobile:** centered, slightly compressed.
- **Bg:** `#0a0a0c` w/ subtle radial gradient from center top.

### Density
- Each cluster renders as a "chapter" w/ chapter intro card (chapter number 01/06, chapter title, 1-line intro, "Begin" cue arrow).
- Left-rail chapter navigator (always-on desktop ≥1280px): 6 progress dots, active dot glows teal, scroll position drives active state.
- Mobile: chapter nav collapses to top "01 / 06" badge w/ progress fill.
- Tier-3 gated modules render as locked "chapters" — cinematic blur w/ glow CTA "Unlock Chapter (Download Sample)".
- Vertical rhythm: 128px between chapters desktop (more breathing room), 80px mobile.

### Schema rendering
- Same modules + groupKey clustering as V1B, but each cluster wrapped in `<ChapterShell />` w/ intro card + numbered eyebrow.
- Charts default to dark theme palette: teal primary line, periwinkle secondary, white grid lines at 0.06 opacity.
- Backgrounds NEVER alternate. Section visual rhythm via gradient dividers + chapter intro cards.
- `mod.macroPanel` always Tier-3 in cinematic — locked teaser w/ glow.

### Motion
- Hero: GSAP timeline. Title slide-up + opacity 0→1 (1000ms `--ease-out-expo`), counter animations 800ms, chart line-draw 1200ms.
- Chapter intro card on enter viewport: Framer fade-up + scale `0.96 → 1` (`--duration-medium`).
- Section entrances within chapter: Framer fade-up `--duration-medium`.
- Charts: recharts entrance DISABLED (per Cat 6 anti-pattern Cat 7 — no animation 1.5s post-load). Pre-rendered final state.
- Chapter rail active dot: Framer `layoutId` glow transition `--duration-base`.
- Sticky CTA: same pattern, slightly desaturated red on dark.
- Reduced-motion: all animations disabled, glow effects keep static state, counters show final values immediately.

### Reference patterns
- Closest analog: `recipes/case-study.md` (cinematic motion language, chapter-based) — but in DARK variant.
- Reuse: same atom set as V1A + dark variant tokens. `Navbar` switches to dark logo + light text.
- Build new: same as V1A + `ChapterShell` (intro card wrapper) + `ChapterRail` (left-rail nav) + `GlowCTA` (variant of `Button` w/ teal glow).

---

## Cross-variant rules

### Always identical across variants

- Schema (`SCHEMA.md`) — same module types, same payload shape.
- CTA labels — recipe-locked. NO price language anywhere.
- Module SEQUENCE — order is the same; variant changes layout/grouping/style only.
- A11y gates — all 3 variants pass same WCAG AA targets (recipe §A11y gates).
- Reduced-motion contract — all 3 honor `prefers-reduced-motion: reduce`.

### Variant-specific overrides

| Aspect | V1A | V1B | V1C |
|---|---|---|---|
| Surface | Editorial light, warm-300/white alternation | Editorial light, white + sticky tab strip | Cinematic dark `#0a0a0c` |
| Hero split | 60/40 | 50/50 | Centered full-bleed |
| Hero chart | Snapshot AreaChart | Full ComboChart | Animated line-draw + glow |
| TOC | Slim top progress (mobile) / 240px left rail | Sticky tab strip drives tabs | Chapter rail w/ glow dots |
| Section grouping | None — long scroll | 6 tabs | 6 chapters w/ intro cards |
| Chart palette | Purple primary | Purple + periwinkle | Teal `#00e5ff` |
| Chart entrance | Enabled (800ms) | Enabled on tab-enter | DISABLED (final state) |
| Tier-3 gating | Locked card + sample CTA | Locked card in Macro tab | Locked chapter + glow CTA |
| Vertical rhythm desktop | 96px | 80px | 128px |

---

## Decision matrix — which variant for which report?

V1 design exposes all three. Tech-team decides assignment logic post-V1.

| Report tier | Best variant | Why |
|---|---|---|
| Standard market reports (most of catalog) | V1A | Long-scroll editorial = familiar, scannable, low friction |
| Multi-segmentation chart-heavy reports (analysts) | V1B | Tabs reduce cognitive load on chart density |
| Premium-priced flagship reports | V1C | Cinematic finish matches premium positioning |
| New / experimental reports | A/B test V1A vs V1B | Validate buyer cohort preference |

For V1 demo: same Australia Cold Chain payload renders in all three variants (toggle via URL: `?variant=A|B|C`). Validates schema parity.

---

## Open questions for variant phase

1. **Variant switching UX:** allow buyer to switch variant on page (similar to dark-mode toggle), OR backend-pinned per report? V1 default: backend-pinned via `meta.variant`, w/ optional URL override for design QA only.
2. **Chart palette tokens:** add `--chart-series-1` through `--chart-series-6` to tokens.css per variant? Recommend yes; defer to tech-team.
3. **Chapter intro copy in V1C:** auto-generate from cluster heading, OR custom-authored per report? V1: auto-generate. V2: editorial may override.
4. **TOC accuracy:** does `report.toc` source-of-truth match `report.modules[].heading` ordering? V1 design assumes manual sync; tech to auto-derive.
