# Tabs · Switchers · Info-Composition Guide · v0.4 PDP

**Source authority:** ref-pattern study (rainbow-pothos + merged-report · CONFIDENTIAL) + UX law cross-check + stakeholder decision 2026-05-21
**Owner (design):** Aura · `design@kenresearch.com`
**Related:** `REF-PATTERNS-ADOPTION.md` · `CHARTS-TABLES-PATTERNS.md`

---

## 1 · Why this exists

Refs use many tabbed/switcher/expander patterns to fit dense info in small spaces without overwhelming the reader. Stakeholder wants us to LEARN from them but VERIFY against UX laws before adopting · so we don't over-tab and create cognitive load.

This doc binds: when to use each switcher pattern · UX law check per pattern · v0.4 sections that apply.

---

## 2 · Switcher pattern taxonomy

| Pattern | Used for | Cognitive cost | UX trade-off |
|---|---|---|---|
| **Tabs (horizontal)** | 2-7 mutually exclusive views | Medium · 1 click to switch | Hides half data on first paint |
| **Tabs (vertical)** | 5-12 sequential sections | Medium · easier scan | Takes left rail real estate |
| **View-mode toggle** | 2-3 ways to view same data (Cards / TreeMap / Table) | Low · same data different lens | Pattern recognition required |
| **Tier filters** (chips) | 2-5 categorical filters · multi-select | Low | Compounds when 5+ filters |
| **Dropdowns** | 7+ options · less-used selections | High · 2-click reveal | Hides options · use sparingly |
| **Accordion / expander** | Sequential disclosure · long detail | Low · linear · stacks | Loses overview · breaks scan |
| **Time switchers** (FY25 · FY26 · FY27) | Step through periods | Low · sequential · clear progression | Limited to time-based data |
| **Numbered disclosure** (01 · 02 · 03 findings) | Force ordering · narrative anchor | Low · readers click through | Implies sequence matters |
| **Sticky-nav scroll-spy** | 8+ sections in one page | Low · familiar pattern | Requires correct active state tracking |
| **Modal drill-down** | Premium · paid detail | Medium · 1 click out · returns | Breaks scroll position · use for deep data only |

---

## 3 · UX law cross-check per pattern

Before adopting any pattern · verify against these laws.

### Jakob's Law · users expect things to work like other sites
- **Tabs:** must look like tabs (active state distinct · click target clear). Already canonical (filled-black pill + warm-500 inactive).
- **Accordion:** must show chevron + visual disclosure cue.
- **Toggle:** must look like binary control (two states clearly indicated).

### Hick's Law · time to decide increases with options
- **Tabs:** 7 is hard ceiling · 5 is comfortable · 3-4 is ideal
- **Filters:** if multi-select w/ 8+ options · use dropdown or search · not chip strip
- **Dropdowns:** keep under 12 items · group if more

### Doherty Threshold · interaction <400ms feels instant
- All switcher transitions must complete <400ms
- Avoid heavy chart re-renders on tab switch · pre-render OR show skeleton
- `prefers-reduced-motion` respected · skip transitions when set

### Miller's Law · 7±2 chunks in working memory
- Tabs: don't put 5+ stat callouts inside each of 4 tabs · reader can't compare across (16 stats total · over budget)
- Use single-tab strip for cross-comparison · only tab when content is genuinely independent

### Fitts' Law · target size matters
- Tab triggers: minimum 44×44px touch target (mobile)
- Active state must be visible without hover
- Disabled tabs must look different · not just opacity

### Aesthetic-Usability · pretty things FEEL more usable
- Tabs must align cleanly · no jagged edges
- Active state crisp · not blurry
- Bg/border must be consistent w/ section type rhythm

---

## 4 · Ref-mined patterns (annotated · with UX critique)

### 4.1 Pattern · Asset-class navigation (binary tabs)
**Ref (rainbow-pothos):** "Hotels · Serviced Residences · Rental · MICE" — 4 distinct asset classes navigate via vertical TOC + anchor jumps
**UX check:** ✅ 4 options · Hick passes · self-contained sections · clean
**Adopt:** ✅ for §07 Ecosystem tabs (Cold Chain · Cold Storage · Cold Transport · Associations) · already shipped · canonical pattern

### 4.2 Pattern · Zone deep-dive (numbered sub-tabs · 1A · 1B · 2A · 2B · 3A · 3B)
**Ref (rainbow-pothos):** 6 zones each with same structure · numbered scheme
**UX check:** ⚠️ 6 options · borderline · helped by clear sequential coding (1A · 1B · 2A · 2B)
**Adopt:** OK if structure is sequential AND coded (not just 6 random tabs). For §10 Segment Intel (5-8 end-users · each w/ sub-tab) · prefer accordion or vertical TOC instead of horizontal tabs (6+ horizontal = scroll · bad)

### 4.3 Pattern · View-mode toggle (Cards / TreeMap)
**Ref:** none in refs · we invented for §07
**UX check:** ✅ 2 options · same data · low cost · already shipped
**Adopt:** ✅ keep · use again in §14 Competitor (Cards/Bubble/Table tri-toggle)

### 4.4 Pattern · Tier filters (Luxury · Upscale · Midscale · Budget)
**Ref (rainbow-pothos):** filter chips above property table · multi-select
**UX check:** ✅ 4 options · multi-select OK · helps narrow large table
**Adopt:** ✅ for §07 PropertyTable · §14 Competitor table when 13+ rows exist

### 4.5 Pattern · Time switcher (FY25 · FY26 · FY27 · FY28)
**Ref (rainbow-pothos):** Gantt pipeline timeline · columns are FY years · readers scan horizontally
**UX check:** ✅ visual representation of time · no click required · scanning works
**Adopt:** ✅ for §15 Regulatory timeline · §16 Future Outlook · NOT as clickable tabs but as visual columns in PipelineTimeline molecule

### 4.6 Pattern · Numbered disclosure (01/02/03 findings)
**Ref (merged-report):** Three-Source Convergence callout · 3 numbered findings stacked
**UX check:** ✅ implies sequence · narrative weight · low cost
**Adopt:** ✅ for §01 Executive Summary (3 thesis points) · §16 Future Outlook (3 scenarios)

### 4.7 Pattern · "Top Praises / Top Complaints" binary split
**Ref (merged-report):** zone-level dual column · positive vs negative drivers
**UX check:** ✅ 2 options · clear · scannable
**Adopt:** ✅ for §12 End-User (top drivers / top constraints per end-user)

### 4.8 Pattern · Static sticky TOC w/ anchor jumps
**Ref (both):** linked TOC at top OR sticky side · anchor navigation
**UX check:** ✅ Jakob's law · users know anchor nav · no cognitive cost
**Adopt:** ✅ already shipped (SideTOCV04)

### 4.9 Pattern · "Status" tags inline (Confirmed / Delayed / Indicative / TBA)
**Ref (rainbow-pothos):** in pipeline cells · 4-tier color encoding
**UX check:** ⚠️ 4 states · need clear color + label · not color alone (a11y)
**Adopt:** ✅ for §15 Regulatory PipelineTimeline · §16 Future Outlook · paired w/ text label always

### 4.10 Pattern · 3-tier rating with stars (★★★ / ★★ / ★)
**Ref (rainbow-pothos):** heatmap cells + opportunity matrix · 3-tier color + star count + word label
**UX check:** ✅ 3 states · color + symbol + text · a11y triple-encoded
**Adopt:** ✅ for §10 Segment Intel · §13 D-S Gap · §17 Opportunities

---

## 5 · Info-composition patterns (refs canonical · how to bold/structure/dense)

### 5.1 Bold pattern · inline emphasis in prose
**Where:** bold key stats inside running paragraphs (NOT entire phrases bold)
- ✅ "Market grew at **9.1% CAGR** through 2022"
- ❌ "**Market grew at 9.1% CAGR through 2022**" (entire phrase bold = shouting)
- ✅ "The cold chain expanded to **AUD 6,547.8 Mn**"
- ❌ "**The** cold chain **expanded** to **AUD 6,547.8 Mn**" (scattered bold = noise)

**Rule:** bold ONLY: numeric values · proper nouns of products/players · 1-3 word key concepts. Never bold sentences.

### 5.2 Italic pattern · reserved roles
- Source citations: _(Ken Primary · 2024)_
- Quoted operator voice: _"Pharma cold-chain demand sustained..."_
- Thematic descriptors: _Historical anchor_ · _The legacy luxury core_
- Figcaption interpretation: _Solid bars are historical · dashed are forecast_
- Footnotes · methodology asides

**Never italic for:** headings · CTAs · stat numbers · long prose · tags.

### 5.3 Density patterns (fit more in less)

**Compact stat callout (refs):**
```
14,364
Hotel rooms (operational)
Across 67 operational properties · 6 zones
```
- Stat number: 48-64px · Noto Serif 300 · tabular
- Label: 14px regular sans
- Descriptor: 12px italic gray

**Inline stat ribbon (refs):**
```
20,755 reviews | 50 hotels | 6 zones | 4 asset classes
```
- Single row · pipe separators · DM Sans 12px · uppercase optional
- For ultra-compact meta-strip

**Tight table (refs):**
- Row 40-48px · padding 12-16px horizontal · 10-14px vertical
- DM Sans 13px cells · 11px headers uppercase tracked
- Fits 6-8 columns in 1100px container without crowding

### 5.4 Card vs no-card decision
- **No card** for: stat callouts (refs default · whitespace isolation) · prose blocks · standalone charts
- **Subtle card** (hairline border only · no shadow · no bg fill) for: grouped player cards (§07 Cold Storage tier cards) · related-report listings (§23) · ReportCard component
- **NEVER card** for: tables · individual stats in a strip · annotation cards (use border-left only)

### 5.5 Modular section structure (refs repeating pattern)

Every data-heavy section follows:

```
1. Eyebrow label + H2 + 1-line lede        [identity]
2. MetricStrip (3-5 callouts)               [the claim]
3. Prose intro (2-4 paragraphs · inline bold) [the explanation]
4. Chart / table / heatmap                  [the evidence]
5. AnnotationCards (3 narrative cards)      [the WHY]
6. InsightBox ("What this means for X")     [the implication]
7. SourceCluster collapsed                  [the provenance]
8. DatasetModalTrigger if applicable        [the depth]
```

Users learn this rhythm in §01 · apply to all sections · cognitive cost approaches zero.

---

## 6 · "How much data fits in small spaces" rules

### 6.1 In a stat callout box (~140-200px wide)
- 1 number (32-48px)
- 1 label (12-14px)
- 1 italic descriptor (11-12px)
- TOTAL: 3 text elements · no more

### 6.2 In a table row (40-48px tall)
- 5-8 columns max
- Each cell: 1 value (text OR number) + optional inline pill/icon
- NO multi-line cells (kills scan rhythm)

### 6.3 In an AnnotationCard (column ~280-340px wide)
- 1 year/eyebrow (11-13px)
- 1 label (13-14px medium)
- 1 body (13px · 3-4 lines max)
- Brand-red left-border for accent

### 6.4 In a tab strip (any width)
- 4-7 tabs max
- Each label: ≤3 words
- Active state pill + inactive border = canonical pattern

### 6.5 In a heatmap cell (~80-120px square)
- 1 star rating (★★★/★★/★)
- 1 short label (HIGH / MID / LOW)
- 1 numeric score (optional · 1.00-6.00)
- Tooltip on hover for full detail

### 6.6 In a PremiumLockCard minimal pill
- 1 lock icon
- 1 headline (3-6 words max · truncate at 30 chars)
- 1 CTA (≤3 words · "Talk to expert →")

---

## 7 · Per-section adoption plan (v0.4)

| § | Section | Switcher pattern used |
|---|---|---|
| 01 | Executive Summary | Numbered disclosure 01/02/03 (3 thesis points · ConvergenceCallout molecule) |
| 02 | Scope | NONE · single-view chip groups |
| 03 | Country Infra | NONE · single tab (V04 plan removed tabs) |
| 04 | Market Overview | Tabs · Overview · Genesis · Seasonality (3 tabs) ✅ |
| 05 | Definitions | Tabs · Key · Fundamental (2 tabs) ✅ |
| 06 | Taxonomy | NONE · single MindMap view |
| 07 | Ecosystem | Tabs (4 mutually exclusive players-type categories) ✅ + View-mode toggle Cards/TreeMap inside Cold Storage tab ✅ |
| 08 | Market Size | NONE · single unified chart (tabs killed per refs · tabs fragment a continuous story) ✅ |
| 09 | Submarkets | Tabs · Cold Storage · Cold Transport (2 tabs · 2 submarkets) |
| 10 | Segment Intel | OpportunityHeatmap (no tabs) + tier filter chips (Luxury/Mid/Low) above |
| 11 | Industry Analysis | Tab-OR-accordion (8 industries · prefer accordion) |
| 12 | End-User | "Top Drivers / Top Constraints" binary split per end-user · no tabs across users · use vertical TOC instead |
| 13 | D-S Gap | OpportunityHeatmap + OpportunityRankingTable · no tabs |
| 14 | Competitor | Tri-toggle (Cards / Bubble / Table) + Tier filter chips (T1/T2/T3) |
| 15 | Regulatory | PipelineTimeline · time-column (no clickable tabs · visual FY scan) |
| 16 | Future Outlook | Numbered 01/02/03 scenarios (ConvergenceCallout · NOT tabs · narrative weight) |
| 17 | Opportunities | RatingStars + OpportunityRankingTable · no tabs |
| 18 | Macro Indicators | Multi-axis chart · OR optional accordion per indicator |
| 19 | Methodology | Accordion (long-form prose · sequential disclosure) |
| 20 | TOC | sticky SideTOC ✅ |
| 21 | FAQs | Accordion (already AnswerBlock atoms · sequential) |
| 22 | Sample Preview | NONE · static |
| 23 | Related Reports | Filter chips (industry / region) · ReportCard grid |
| 24 | CTA Banner | NONE · single CTA pair |

**Tabs total across v0.4:** 6 sections use tabs (04 · 05 · 07 · 09 · 11 · 14). All have 2-4 tabs · all pass Hick's Law.

---

## 8 · Anti-patterns (banned)

| Anti-pattern | Why bad | Use instead |
|---|---|---|
| 8+ tabs in a horizontal strip | Cognitive overload · scroll required | Vertical TOC · accordion · filter chips |
| Tab labels >5 words | Eye fatigue · scan failure | ≤3-word labels |
| Tabs with same content (no differentiation) | Confused users · "why click?" | Merge into single view |
| Active tab indistinguishable from inactive | Users lose place | Filled-black pill canonical |
| Tabs that change page layout drastically on switch | Disorienting · breaks flow | Same shell · only content area changes |
| Accordion w/ all panels collapsed at start | First-paint = no info | Open first panel by default · or show 1-line preview when collapsed |
| Modal that traps focus indefinitely · no clear close | A11y fail · trapped state | Esc + backdrop click + visible × |
| Sticky elements that overlap each other at scroll | Visual chaos | Z-index discipline · plan stacking order |
| Drop shadows on tab strips | Heavy · template-y | Hairline borders only |
| Color-only state indication (active/inactive) | Color-blind fail | Color + weight + bg shape combined |

---

## 9 · Audit checklist (every new switcher/tab)

- [ ] 2-7 options (Hick's law)
- [ ] Labels ≤3 words
- [ ] Active state distinct (color + weight + bg shape)
- [ ] Minimum 44×44px touch target
- [ ] Keyboard nav works (Tab + arrow keys for Radix Tabs)
- [ ] Transition <400ms (Doherty)
- [ ] Skeleton OR pre-rendered content (no flash)
- [ ] Same content shell on switch (no layout shift)
- [ ] First tab = default · most-likely first read
- [ ] Color encoding paired with text/icon (a11y)
- [ ] Mobile responsive (drop to dropdown if 5+ tabs overflow)

---

## Related

- `docs/REF-PATTERNS-ADOPTION.md`
- `docs/CHARTS-TABLES-PATTERNS.md`
- `docs/COLOR-USAGE-GUIDE.md`
- `docs/FONT-PAIRING-GUIDE.md`
