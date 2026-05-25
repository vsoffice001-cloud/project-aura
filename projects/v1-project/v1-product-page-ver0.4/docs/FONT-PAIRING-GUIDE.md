# Font Pairing Guide · v0.4 PDP

**Source authority:** stakeholder decision 2026-05-21 + ref-pattern study
**Owner (design):** Aura · `design@kenresearch.com`
**Related:** `REF-PATTERNS-ADOPTION.md` · `design-system/core-v2/docs/FOUNDATIONS.md`

---

## 1 · Why this exists

Ken brand keeps **Noto Serif display + DM Sans body**. Refs (rainbow-pothos + merged-report) use SANS-serif only. We diverge intentionally on font family, but **adopt refs' usage logic** for when serif vs sans · how to handle small/dense spaces · how italic carries meaning.

Without this guide, serif gets jammed into 11px stat labels (illegible · loses premium feel) OR sans gets used for the brand H2 (loses Ken identity).

---

## 2 · Two-font system · clear roles

| Family | Role | Token |
|---|---|---|
| **Noto Serif** | Identity · anchor moments · large display | `--font-display` |
| **DM Sans** | Utility · density · all small text | `--font-body` |

**Mental model:** serif = where reader pauses (H1/H2 · hero stat numbers). sans = where reader scans (tables · labels · captions · body prose).

---

## 3 · Size + family mapping

| Size range | Use | Family | Weight | Why |
|---|---|---|---|---|
| 48-64px | Hero stat numbers · main page H1 | Noto Serif · 300 (light) | Serif at scale reads as premium publication · weight 300 keeps elegance |
| 32-48px | Stat callout numbers (refs use this scale) | Noto Serif · 300 | Same · anchor moment |
| 28-40px | Section H2 (eyebrow + H2 pair) | Noto Serif · 300 | Section openers · brand signal |
| 20-26px | Subsection H3 · prominent stat numbers | Noto Serif · 300 (large) OR DM Sans · 500 (smaller end) | Boundary zone · choose by context |
| 17-20px | Lede paragraph · pull-quote · sub-headline | DM Sans · 400 (regular) | Body-tier · scannable |
| 14-16px | Body prose · table cells (large) · stat labels | DM Sans · 400-500 | Default reading text |
| 12-14px | Captions · eyebrows · table headers · meta | DM Sans · 500-600 (semibold) | Dense info · weight up for hierarchy |
| 10-12px | Source citations · tier pills · ultra-meta | DM Sans · 600 (semibold) · uppercase tracked | Smallest legible at premium feel |
| **NEVER** | <11px or 11-14px in Serif | — | Serif loses readability under 16px · use sans only |

**Hard rule:** any text under 16px MUST be DM Sans. Period.

### 3.1 · Metric size scale per display context (S3 · 2026-05-22)

Different contexts warrant different metric sizes. Random big numbers fight for attention. Enforce this table.

| Context | Size | Family | Weight | Notes |
|---|---|---|---|---|
| Hero stat (1 of 1-3 · above fold) | 48-64px | Noto Serif | 300 | Full-page anchor · loud is OK here |
| MetricStrip (3-5 stats in a row) | 32-44px | Noto Serif | 300 | Section-level anchor · clamp(32px, 3.5vw, 44px) |
| IndicatorCard (4-5 grid) | 28-36px | Noto Serif | 300 | Grid context · cap at clamp(28px, 3vw, 36px) |
| Inline lede stat (bold prose) | 17-19px | DM Sans | 600 | Matches body size · weight carries it |
| Table cell value | 13-14px | DM Sans | 500 tabular | Dense table context · tabular-nums mandatory |

**Rule:** Hero stat may be 48-64px only when it's the primary visual anchor of a section. Any stat inside a 4+ item grid caps at 36px.

---

## 4 · Italic usage (refs pattern · adopted)

Italic is reserved · NEVER decorative.

| Italic for | Example | Where |
|---|---|---|
| Source citations | _Ken Primary · Q3 2024_ | SourceCluster · figcaptions |
| Quoted user/operator voice | _"Pharma cold-chain demand sustained..."_ | QuotedVoice atom · §12 end-user voices |
| Thematic descriptor labels | _The legacy luxury core_ · _Historical anchor_ | MilestoneRow descriptors · section sublabels |
| Figcaption / interpretation | _Forecast reaches AUD 10.7 Bn..._ | Chart captions · explainer notes |
| Footnotes · methodology notes | _50% confidence interval · methodology §19_ | Footer disclaimers |

**Never italic for:**
- Headings · subheadings (lose readability)
- CTAs (lose call-to-action energy)
- Stat callout numbers (numerals shouldn't be italic ever)
- Long-form prose paragraphs (eye fatigue)
- Tags / pills / chips (italic on labels reads as broken)

---

## 5 · Tabular numerics (mandatory rule)

Every numeric value MUST use tabular-nums + lining-nums. Non-tabular numbers shift column widths and break visual rhythm.

```css
font-variant-numeric: tabular-nums lining-nums;
```

**Where mandatory:**
- All stat callout numbers
- All table numeric columns (year · size · % · count · price)
- MilestoneRow values (`AUD 4.2 Bn`)
- CAGR values (`+10.3%`)
- Source citation years
- Tier-count pills (`1 primary · 3 secondary`)
- Dataset preview rows

**Pattern: never use a numeric value without tabular-nums.** Audit checklist line item.

---

## 6 · Letter-spacing / tracking discipline

| Style | Tracking | Where |
|---|---|---|
| Uppercase eyebrow labels (10-12px) | `+0.1em` to `+0.14em` | Section eyebrows · "SECTION 08 · MARKET SIZE" · tier pills |
| Uppercase meta (12-14px) | `+0.08em` to `+0.1em` | Table header labels · source labels |
| Display large (32px+) | `-0.015em` to `-0.025em` | H1 · H2 · stat numbers (tighter = premium) |
| Body prose | `0` (default) | All running text · captions |
| Small caps · pills | `+0.1em` | Lock-pill labels · status pills |

**Hard rule:** uppercase text MUST be tracked positive (+0.08 minimum). Tight uppercase is unreadable · old-template feel.

---

## 7 · Weight discipline · 3-weight cap

| Weight | Used for | Notes |
|---|---|---|
| 300 (light) | Noto Serif display · large stat numbers | Premium publication weight · only use on Serif · never under 24px |
| 400 (regular) | DM Sans body · running prose · captions | Default for body text |
| 500 (medium) | DM Sans labels · emphasis stats · eyebrow labels | Subtle emphasis · use when bold would over-shout |
| 600 (semibold) | DM Sans uppercase eyebrows · table headers · tier pills | Maximum weight for small text |
| 700 (bold) | RESERVED · only for inline bold stats in prose | E.g. "**AUD 6,547.8 Mn**" inside body para · matches refs |

**Hard rule:** don't use weight 700 for headings · use weight 300 Noto Serif. Bold display reads as cheap.

---

## 8 · Per-component font spec (canonical · v0.4)

### Section header (eyebrow + H2 + lede)

```tsx
{/* Eyebrow · DM Sans 500 · 11px · uppercase · tracked +0.14em */}
<p className="font-body uppercase tracking-[0.14em] text-[var(--semantic-ink-subtle)]"
   style={{ fontSize: '11px', fontWeight: 600 }}>
  Section 08 · Market Size & Growth
</p>

{/* H2 · Noto Serif 300 · clamp(28px, 3vw, 39px) · tight tracking */}
<h2 className="font-display font-light text-[var(--semantic-ink-strong)]"
    style={{ fontSize: 'clamp(28px, 3vw, 39px)',
             letterSpacing: '-0.015em',
             lineHeight: 1.15 }}>
  A decade of acceleration...
</h2>

{/* Lede · DM Sans 400 · 16px · default tracking */}
<p className="font-body text-[var(--semantic-ink-body)]"
   style={{ fontSize: '16px', lineHeight: 1.65 }}>
  Australia's cold chain crossed...
</p>
```

### Stat callout (borderless · refs pattern)

```tsx
{/* Eyebrow label · DM Sans 600 · 11px · uppercase tracked */}
<p className="font-body uppercase tracking-[0.12em] text-[var(--semantic-ink-subtle)]"
   style={{ fontSize: '11px', fontWeight: 600 }}>
  2022 · today
</p>

{/* Stat number · Noto Serif 300 · 32-48px · tabular-nums · tight */}
<p className="font-display font-light text-[var(--semantic-ink-strong)]"
   style={{ fontSize: 'clamp(32px, 3.6vw, 48px)',
            fontVariantNumeric: 'tabular-nums lining-nums',
            letterSpacing: '-0.025em',
            lineHeight: 1 }}>
  AUD 6.5 Bn
</p>

{/* Italic descriptor · DM Sans 400 · 12px · italic muted */}
<p className="font-body italic text-[var(--semantic-ink-muted)]"
   style={{ fontSize: '12px' }}>
  Latest reported · 9.1% historical CAGR
</p>
```

### Table cells

```tsx
{/* Header · DM Sans 600 · 11px · uppercase tracked */}
<th className="font-body uppercase tracking-[0.08em] text-[var(--semantic-ink-strong)]"
    style={{ fontSize: '11px', fontWeight: 600 }}>
  Year
</th>

{/* Cell · DM Sans 400 · 13px · tabular-nums for numeric */}
<td className="font-body tabular-nums text-[var(--semantic-ink-body)]"
    style={{ fontSize: '13px' }}>
  AUD 6,547.8 Mn
</td>

{/* Cell italic source · DM Sans 400 · 11px italic */}
<td className="font-body italic text-[var(--semantic-ink-subtle)]"
    style={{ fontSize: '11px' }}>
  PRD anchor
</td>
```

### Inline bold stat in prose (refs pattern)

```tsx
<p className="font-body text-[var(--semantic-ink-body)]"
   style={{ fontSize: '16px', lineHeight: 1.65 }}>
  Australia's cold chain crossed{' '}
  <strong className="font-medium text-[var(--semantic-ink-strong)] tabular-nums">
    AUD 6.5 Bn
  </strong>
  {' '}in 2022...
</p>
```

**Key:** weight is **500 medium** · not 700 bold. Refs use 700 inline but Ken serif identity is broken w/ heavy bold in sans body · medium reads as emphasis without shouting.

### Caption / source line

```tsx
{/* Italic interpretation · DM Sans 400 · 13px italic */}
<p className="font-body italic text-[var(--semantic-ink-body)]"
   style={{ fontSize: '13px', lineHeight: 1.55 }}>
  Solid bars show historical · dashed segment is forecast.
</p>

{/* Source · DM Sans 600 · 11px uppercase tracked subtle */}
<p className="font-body uppercase tracking-[0.08em] text-[var(--semantic-ink-subtle)]"
   style={{ fontSize: '11px', fontWeight: 600 }}>
  Ken Research Analysis · methodology §19
</p>
```

---

## 9 · Dense vs sparse layout patterns

### Dense layouts (tables · multi-stat strips · dataset modals)
- Default to DM Sans throughout · NO serif
- Smaller scale (10-13px range)
- Tighter line-height (1.3-1.5)
- More semibold/medium weight to compensate for size

### Sparse layouts (hero · section opener · pull stat)
- Serif anchors are appropriate
- Larger scale (24-48px+)
- Generous line-height (1.15-1.3)
- Lighter weight (300 light)

**Rule:** if a section has 4+ stat callouts in row · use compact pattern (sans · smaller scale). If 1-2 hero stats · use anchored pattern (serif · larger).

---

## 10 · Mobile font scaling

Use CSS `clamp()` for fluid type:
- Display: `clamp(min, vw-based, max)` e.g. `clamp(28px, 3vw, 39px)`
- Stat numbers: `clamp(24px, 3vw, 38px)` (drops ~30% on narrow)
- Body: stays fixed 16px (don't shrink reading text below 14px)
- Captions: stays fixed 11-12px (already at floor)

**At 320-414px mobile:**
- H2 drops to 22-26px range
- Stat numbers drop to 24-28px range
- Padding shrinks (24-32px section padding vs 64-80px desktop)
- Italic + tracking unchanged

**At 768-1024px tablet:**
- Mid-range of clamp triggers
- Padding standard (40-64px)

**At 1280px+ desktop:**
- Full scale
- Padding generous (64-80px+)

---

## 11 · Anti-patterns (banned)

| Anti-pattern | Why bad | Use instead |
|---|---|---|
| Noto Serif at 11px | Illegible · loses premium feel | DM Sans |
| Noto Serif 700 bold | Heavy · cheap | Noto Serif 300 light at scale |
| Mixing 4+ weights in section | Visual noise | 3-weight cap (300/400/500/600) |
| Italic on heading | Loses authority | Bold serif heading · italic in caption below |
| Italic on stat number | Numerals can't italicize cleanly | Tabular-nums upright |
| `font-feature-settings: 'tnum' off` on numerics | Column shifts · breaks rhythm | Always `tabular-nums lining-nums` |
| Tracking 0 on uppercase | Unreadable | +0.08em minimum |
| Tracking +0.1em on lowercase body | Loose · childish | 0 default |

---

## 12 · Per-section font spec (v0.4)

All sections inherit canonical pattern · listed where deviation needed.

| § | Section | Deviation |
|---|---|---|
| 01 | Executive Summary | Standard |
| 02 | Scope | Standard |
| 03 | Country Infra | 4-up stat strip uses 24-32px nums (slightly smaller than §08 hero scale) |
| 04 | Market Overview | Genesis tab prose may use 17px lede (vs 16px default) for narrative weight |
| 05 | Definitions | Standard · italic temperature descriptors |
| 06 | Taxonomy | MindMap node labels DM Sans 500 · 13-14px (tight nested layout) |
| 07 | Ecosystem | Per-player table 13px cells · 11px header · all DM Sans |
| 08 | Market Size | Standard · MilestoneRow 32-48px serif stat nums |
| 09 | Submarkets | Standard · 4-up stat strip 24-32px |
| 10 | Segment Intel | Heatmap cell labels 11px uppercase tracked |
| 11 | Industry | Standard |
| 12 | End-User | QuotedVoice atom · italic 14-15px serif (only place serif under 24px is appropriate · short pull-quote treatment) |
| 13 | D-S Gap | Heatmap pattern matches §10 |
| 14 | Competitor | PropertyTable pattern matches §07 |
| 15 | Regulatory | Standard |
| 16 | Future Outlook | ConvergenceCallout uses 24-28px serif numbered findings |
| 17 | Opportunities | RatingStars 14px · star Unicode symbols inherit DM Sans |
| 18 | Macro | 4-series legend 11px uppercase |
| 19 | Methodology | Standard · prose-heavy |
| 20-24 | Standard |

---

## 13 · Audit checklist (every new component)

- [ ] All text under 16px uses DM Sans (not serif)
- [ ] All numeric values have `tabular-nums lining-nums`
- [ ] Uppercase labels tracked +0.08em minimum
- [ ] Display serif uses weight 300 (not 700)
- [ ] Italic restricted to sources · quoted voice · thematic descriptors
- [ ] Max 3-4 weights per section
- [ ] Line-height: 1.15 display · 1.3-1.5 body · 1.5-1.65 prose
- [ ] Mobile clamp() defined for all responsive sizes
- [ ] No serif in tables · pills · tags

---

## Related

- `design-system/core-v2/docs/FOUNDATIONS.md` — font tokens canonical
- `docs/REF-PATTERNS-ADOPTION.md` — full ref-mining plan
- `docs/COLOR-USAGE-GUIDE.md` — color counterpart
