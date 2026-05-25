# Color Usage Guide · v0.4 PDP

**Source authority:** stakeholder decision 2026-05-21 + ref-pattern study (rainbow-pothos + merged-report)
**Owner (design):** Aura · `design@kenresearch.com`
**Related:** `REF-PATTERNS-ADOPTION.md` · `design-system/core-v2/docs/FOUNDATIONS.md`

---

## 1 · Why this exists

Refs taught us premium = restraint. Stakeholder rule: use Ken DS colors but with **hue/saturation discipline** so pages don't feel childish or too-many-color-variables.

This doc binds: which color · where · why · why NOT.

---

## 2 · 4-tier color budget

Every section follows this budget. Going over = drift.

| Tier | Max colors used in section | Purpose |
|---|---|---|
| **Neutrals** | unlimited | Hierarchy via grayscale ink + foundation surfaces. Carries 80%+ of section. |
| **Brand-red** | 1 instance per section (rare) | CTAs · paywall unlock · accent CAGR · brand-red dot bullets. NEVER prose emphasis. |
| **Data viz palette** | 3-5 hues from periwinkle/perano/purple ramp | Charts · heatmaps · tier encoding · player tier dots. |
| **Status (semantic)** | 1-2 instances per section | Pre-COVID/COVID/Recovery/Forecast pills · pass/fail badges · only when categorical state must be readable. |

Rule: never combine 2+ tier expansions in same section. If you need 5+ chart colors AND 3 status colors AND 2 brand-red CTAs · you've over-budgeted · cut.

---

## 3 · Palette assignment by use case

### 3.1 Brand-red · `--color-brand-red: #b01f24`

**WHERE:**
- Primary CTAs (paywall unlock · "Talk to expert" · "Download sample")
- Accent CAGR arrow + value in MilestoneRow (1 instance · the forward bet)
- AnnotationCard left-border (1px wide · subtle anchor only)
- SourceCluster · hover state on chevron/links
- Brand-red dot bullets (atom level · 4px diameter · sparingly)

**NEVER:**
- Body prose emphasis (use bold black instead)
- Section H1/H2 text color (always ink-strong)
- Chart data series (use periwinkle/perano/purple)
- Tag/badge default state
- Borders > 2px wide (overpowering)
- Backgrounds (paywall lock pill is exception · contained · small)

**Why restraint:** ref-pattern study showed both refs use ZERO brand color in prose. Brand-red is Ken's IP · save it for CTA + accent moments · loses meaning if repeated.

### 3.2 Data viz palette · periwinkle · perano · purple

**Periwinkle** `--periwinkle-500: #c3c6f9` (cool soft purple-blue)
- Use: secondary chart series · "high engagement" tier in heatmaps · low-emphasis category encoding
- Ramp: 100 (faint bg) · 300 (mid hover) · 500 (default) · 700 (text contrast on light) · 800 (dark contrast)

**Perano** `--perano-500: #dfeafa` (cool pale blue · lightest of the 3)
- Use: tertiary chart series · "low priority" tier · neutral pale fills for grouping
- Ramp: 100 (whisper) · 500 (default) · 700-800 (deeper)

**Purple** `--purple-500: #9488ec` (saturated purple · strongest of 3)
- Use: primary chart series · "high priority" tier · key data anchor color
- Ramp: 100 (bg) · 500 (default) · 700-900 (text contrast)

**Combination rules:**
- 1 chart = pick 1 (use ramp 300/500/700 for shades) OR all 3 (3-tier heatmap: purple high · periwinkle mid · perano low)
- Never use 5+ colors in single chart (refs use max 3-tier categorical)
- Sequential ramps for ordinal data · categorical 3-hue for nominal data
- Forecast/projected segments = same hue as historical · differentiated by dashed line OR translucent fill (NOT different color)

**Color-blind audit:** purple-vs-periwinkle hue distance is small. For accessibility, pair color encoding with pattern (dashed line · star icon · text label).

### 3.3 Coral · red minor utility · `--coral-500: #f99b85` + `--red-700: #b01f24`

**Coral** `#f99b85` (warm pinkish-orange)
- Use: status pills ("warning" · "delayed" · "review needed")
- ONLY when: a categorical status must be visually distinct AND brand-red would be too heavy
- NEVER for data series · NEVER for default tags

**Red** (same as brand) for utility
- Use: "error" status · "deprecated" badge · "premium locked" lock pill (already approved)
- NEVER for: text emphasis · CTA secondary buttons · chart series

**Why coral exists separately:** brand-red feels alarming for non-critical status. Coral softens to "attention needed" without "danger." Use sparingly · max 1 coral instance per section.

### 3.3-A · Growth-soft · positive GROWTH direction signals only (S3-update · 2026-05-22)

**SEMANTIC BOUNDARY (CRITICAL · S3-2026-05-22 correction):**

`--color-growth-soft-*` and `--color-forecast-*` are TWO SEPARATE semantics. Do NOT mix.

```
--color-growth-soft-bg:     rgba(120, 180, 140, 0.15)   ← POSITIVE GROWTH signals
--color-growth-soft-text:   rgba(60, 110, 80, 0.95)
--color-growth-soft-border: rgba(120, 180, 140, 0.35)

--color-forecast-bg:        rgba(195, 198, 249, 0.20)   ← FORECAST UI chrome (periwinkle · syncs w/ chart)
--color-forecast-text:      rgba(112, 117, 200, 0.95)
--color-forecast-border:    rgba(195, 198, 249, 0.45)
```

**`--color-growth-soft-*` WHERE (UI chrome only · standalone growth signals):**
- YoY positive chips in non-time-series contexts (if color is desired — currently IndicatorCard uses neutral)
- "Growth" trend pills outside forecast context
- Any UI chrome signaling "positive direction" NOT tied to a future/forecast period

**`--color-forecast-*` WHERE (forecast UI chrome):**
- PhaseStrip "Forecast" pill (§08) — syncs with dashed periwinkle forecast bars in chart
- Any UI chrome labeling a "forecast / projected" period
- TableShell phasePill renderer "Forecast" value

**NEVER (either token set):**
- Chart data series (charts stay periwinkle/perano/purple ONLY)
- Backgrounds wider than ~80px
- Body prose color or text emphasis
- growth-soft on IndicatorCard arrow/pill (S3-2026-05-22: neutralized to ink-muted · no color on direction)

**Why separate:** chart says forecast = periwinkle (dashed bars). UI chrome must echo. Using green for forecast disconnects chart + chrome. Using periwinkle for growth-chips would bleed forecast semantics into standalone callouts. Two semantics = two tokens = info sync.

**Authority:** S3-2026-05-22 correction per plan doc §B + §G rule 1.

### 3.4 Grayscale neutrals (carries hierarchy)

| Token | Hex | Use |
|---|---|---|
| `--semantic-ink-strong` | rgba(0,0,0,0.9) | H1/H2/H3 · stat numbers · primary text |
| `--semantic-ink-body` | rgba(0,0,0,0.70) | Body prose · table cells · S1 2026-05-22 softened |
| `--semantic-ink-muted` | rgba(0,0,0,0.55) | Captions · descriptors · S1 2026-05-22 softened |
| `--semantic-ink-subtle` | rgba(0,0,0,0.45) | Eyebrows · labels · meta |
| `--semantic-ink-faint` | rgba(0,0,0,0.35) | Skeletal/placeholder text |
| `--semantic-ink-whisper` | rgba(0,0,0,0.18) | Disabled state · ghost text |
| `--black-50` | #fafafa | Subtle hover bg · zebra alternation (avoid · refs use no alt) |
| `--black-100` | #f5f5f5 | Hairline borders · subtle dividers |
| `--black-200` | #e5e5e5 | Default borders · header underlines |
| `--black-300` | #d4d4d4 | Stronger borders · disabled outlines |
| `--color-foundation-white` | #ffffff | Bg for ALL sections (no warm tint) |

**Hierarchy carries via neutrals · NOT color.** Refs explicit on this · v0.4 follows.

### 3.5 Phase classification colors (§08 specific · §16 future outlook)

Sequential color narrative: neutral → cool (disruption) → warm (recovery) → cool (forecast = future).

| Phase | Bg | Text | Semantic |
|---|---|---|---|
| Pre-COVID | `var(--black-50)` rgba(0,0,0,0.04) | `var(--semantic-ink-muted)` | Neutral · historical baseline |
| COVID | rgba(195,198,249,0.20) | `var(--periwinkle-800, #7075c8)` | Cool periwinkle · disruption |
| Recovery | rgba(249,155,133,0.18) | rgba(176,84,60,0.95) | Coral-soft · warm transition · NOT bright |
| Forecast | `var(--color-forecast-bg)` | `var(--color-forecast-text)` | Periwinkle · syncs w/ dashed forecast chart bars |

**S3-2026-05-22 correction:** Forecast pill changed from growth-soft-green → `--color-forecast-*` periwinkle. Recovery changed from bright `coral-500` → coral-soft `rgba(249,155,133,0.18)`. Info sync: chart forecast bars are dashed periwinkle · phase strip must echo.

**Why sequential:** neutral → cool → warm → cool encodes time progression as hue journey. All pills same size/weight/casing · ONLY color differs. No one pill dominates.

---

## 4 · Anti-patterns (banned · code review reject)

| Anti-pattern | Why bad | Use instead |
|---|---|---|
| Green for "positive" + red for "negative" prose emphasis | Childish + accessibility fail | Bold black · use scale/weight |
| Per-tag color (8 tags = 8 colors) | "Too-many-color-variables" feel | Single neutral pill · differentiate via text only OR 3 max color tiers |
| Brand-red on heading text | Erodes CTA meaning · alarm fatigue | Black ink-strong · brand-red dot bullet if accent needed |
| Periwinkle + perano + purple + coral + brand-red in same chart | Hue noise · color-blind hostile | Pick ONE family · use ramp for shades |
| Bg color on prose paragraph (highlight box · yellow tint) | Childish · refs use NO bg highlight on prose | Italic + brand-red left border = InsightBox |
| Gradient backgrounds | Refs use NO gradients · loses premium feel | Solid bg · use shadow if depth needed (sparingly) |
| Shadow for emphasis | Heavy · old-template feel | Use weight + scale + whitespace |
| Bright saturated colors at full opacity for status pills | Reads as childish | Use 0.18-0.30 alpha tints · text in dark ink |

---

## 5 · Per-section color budget (v0.4 PDP sections)

| § | Section | Budget |
|---|---|---|
| 01 | Executive Summary | Neutrals only + 1 brand-red CTA |
| 02 | Scope & Coverage | Neutrals + tags use single neutral pill (NO per-tag color) |
| 03 | Country Infrastructure | Neutrals + 3-hue periwinkle/perano/purple if showing 3 macro indicators chart |
| 04 | Market Overview / Genesis | Neutrals only (prose-heavy) |
| 05 | Definitions | Neutrals + temperature-range badge color (only existing exception · cold/warm encoded) |
| 06 | Taxonomy | Neutrals + perano-500 for MindMap branches (single accent) |
| 07 | Ecosystem | Neutrals + tier-encoding (purple-500 high · periwinkle-500 mid · perano-500 low) + 1 brand-red CTA |
| 08 | Market Size | Neutrals + phase-tint colors (4) + 1 brand-red CAGR accent + 1 brand-red CTA |
| 09 | Submarkets | Neutrals + 2-hue chart (purple primary · periwinkle secondary) |
| 10 | Segment Intelligence | Neutrals + 3-tier heatmap (purple high · periwinkle mid · perano low) |
| 11 | Industry Analysis | Neutrals + sequential ramp (purple-300/500/700) for industry size encoding |
| 12 | End-User Deep Dives | Neutrals only (prose-heavy) + 1 italic quoted-voice block per end-user |
| 13 | Demand-Supply Gap | Neutrals + 3-tier heatmap |
| 14 | Competitor Landscape | Neutrals + tier-encoding (matches §07) + 1 brand-red CTA |
| 15 | Regulatory | Neutrals only |
| 16 | Future Outlook | Neutrals + phase-tint (matches §08) + scenario bands (3 hues from periwinkle/perano/purple ramp) |
| 17 | Opportunities | Neutrals + RatingStars 3-tier color |
| 18 | Macroeconomic Indicators | Neutrals + 4-series chart (use periwinkle-300/500/700 + perano-500 OR purple ramp) |
| 19-24 | Methodology · TOC · FAQ · Sample · Related · CTA | Neutrals only + 1 brand-red CTA in 24 |

**Budget violation = code review rejection.**

---

## 6 · Accessibility binding

- WCAG AA contrast required on every text/bg combination
- Color encoding NEVER sole signal · always paired with text label / pattern / icon
- Pre-COVID/COVID/Recovery/Forecast pills carry text labels (color is augment only)
- Tier dots in SourceCluster paired with "1 primary · 3 secondary · 2 derived" count text
- Heatmap cells carry star count + label (color is augment only)
- Brand-red text on white = 5.5:1 ratio (AA OK · AAA fail for body · OK for CTAs)
- Periwinkle-500 text on white = ~2.8:1 (AA FAIL for body · OK only as bg fill OR with ink-strong text overlay)

**Audit checklist:** every new component MUST pass `axe` color-contrast rule. Tier-color cells need text alternative.

---

## 7 · How to add a new color (process)

1. Stop · ask: can I solve this with existing tokens + scale/weight?
2. If no · is this a recurring need across 3+ sections OR 1 section that needs deep encoding?
3. If 1-time use · use Tailwind arbitrary value `bg-[#xxxxxx]` w/ TODO comment to lift to token if pattern repeats
4. If 3+ uses · propose token in FOUNDATIONS.md · get stakeholder approval BEFORE adding
5. New tokens must follow existing ramp pattern (50/100/200/.../900)
6. Update this guide w/ where the new color is used + why

**Never add color in TSX without going through this filter.**

---

## 8 · Open audit items

- [ ] §07 EcosystemSection currently uses raw rgba blues for tier encoding · should migrate to `--periwinkle-700` / `--periwinkle-500` / `--perano-500` tokens
- [ ] §08 MarketSizeSection phase colors hardcoded rgba · should add as named tokens `--phase-pre-covid` etc. in FOUNDATIONS.md
- [ ] §07 + §08 ColumnChart uses default Highcharts brand-red bars · should override w/ `--purple-500` per data-viz palette rule
- [ ] PremiumLockCard lock-pill uses black bg · OK · but tier label color should be reviewed for AA compliance

---

## Related

- `design-system/core-v2/docs/FOUNDATIONS.md` — canonical token registry
- `docs/REF-PATTERNS-ADOPTION.md` — full ref-mining plan
- `docs/SOURCE-PROVENANCE.md` — source tier colors (primary brand-red · secondary periwinkle-700 · derived amber)
