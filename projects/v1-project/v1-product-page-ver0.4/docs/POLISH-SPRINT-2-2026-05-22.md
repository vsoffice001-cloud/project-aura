# Polish Sprint 2 · v0.4 PDP · 2026-05-22 (afternoon)

> **Owner:** Aura · `design@kenresearch.com`
> **Trigger:** User feedback w/ 11 itemized UI observations + screenshots
> **Constraint:** plan FIRST · reasoning per item · then execute · learnings logged for future
> **Authority docs (binding):** `COLOR-USAGE-GUIDE.md` · `FONT-PAIRING-GUIDE.md` · `CHARTS-TABLES-PATTERNS.md` · `REF-PATTERNS-ADOPTION.md` · `POLISH-PLAN-2026-05-22.md` (sprint 1 · still valid)

---

## A · 11 user observations · my analysis + plan

### A1 · Body text too dark · feels close to bold/heading

**User:** body / normal text can be softer than the bold/highlighted · use neutral shades not pure black · use opacity correctly to differentiate (like v0-lite page).

**Analysis:** 5-tier ink token system exists in `globals.css` BUT inspecting current sections — `--semantic-ink-body` resolves to `rgba(0, 0, 0, 0.80)` which IS dark. v0-lite uses softer body (typically 0.65-0.70 range on light bg). Reading the screenshot #1 lede · the unhighlighted text reads near same weight as bold (less contrast hierarchy).

**Decision:** soften ink-body from 0.80 → 0.70 · soften ink-muted from 0.60 → 0.55 (preserve current ink-strong 0.90 to keep bold standing out). This widens the contrast gap between body and bold. Updates in `globals.css` only · cascades everywhere.

**Reason:** premium publication look (refs · v0-lite) achieves softness via opacity diff (~20 percentage points between bold and body). Current 10-point gap (0.90 vs 0.80) reads "all dark" · not "soft body w/ punchy bold".

**Learning:** opacity-driven hierarchy needs ≥18-percentage-point gap between adjacent tiers for visible difference on light bg. Save as memory.

---

### A2 · Paywall language ("metered" · "LEAD-GATED") + broken layouts

**User:** can't use words like "metered" · use realistic language · some paywall layouts look broken.

**Analysis:** PremiumLockCard line 113: `tier === 'lead' ? 'Lead-gated' : 'Premium · paid report'`. "Lead-gated" is internal jargon · NOT customer-facing language. Screenshots show:
- Minimal variant (small horiz pill) overflows / truncates "Player-level pipe..." → bad ellipsis
- Default variant (large card) has "LEAD-GATED" tag · big red button stack · feels heavy

Real B2B research sites (McKinsey · IBISWorld · Gartner): use "Preview only" · "Premium content" · "Subscribers only" · NEVER "metered" / "gated".

**Decision:**
- Replace `Lead-gated` → `Preview only`
- Replace `Premium · paid report` → `Premium content`
- Compact + minimal variants: increase max-width for label · prevent truncation OR use shorter labels ("More details below" · "Continue with sample")
- Tag pill: remove uppercase intensity · use ink-muted (smaller · less shouty)
- Layout fix: minimal variant needs explicit min-width to fit "Talk to expert →" without breaking

**Reason:** buyers see this · they make purchase decisions on tone. Jargon = distrust. Realistic language = professional.

**Learning:** any customer-facing string · run through "would a McKinsey buyer see this" filter. Internal taxonomy ≠ UI copy. Save as memory.

---

### A3 · Metrics font sizes too big in places · need systematic sync

**User:** metric font sizes are too big in some places · should not be this big · use systematic synced sizes + smaller sizes for the context.

**Analysis:** screenshot #6 shows MacroeconomicSection IndicatorCard variant A using `clamp(48px, 5.5vw, 64px)` — that's hero-scale on a 4-up grid card. Too dominant. Compare to top row (IndicatorCard variant B · smaller scale) — variant B reads more balanced. MetricStrip elsewhere uses 32-48px serif · canonical per FONT-PAIRING §3.

**Decision:** define metric size scale · enforce per context:

| Context | Metric size | Family |
|---|---|---|
| Hero stat (1 of 3) | 48-64px serif 300 | Noto Serif |
| Section MetricStrip (3-5 across) | 32-44px serif 300 | Noto Serif |
| IndicatorCard (4-5 grid) | 28-36px serif 300 | Noto Serif |
| Inline lede stat (bold prose) | 17-19px sans 600 | DM Sans (matches body) |
| Score / value in table cell | 13-14px sans 500 tabular | DM Sans |

Audit + fix:
- MacroeconomicSection top 4-card row · drop from 48-64px → 32-44px
- IndicatorCard component itself · cap at 36px max
- Any stat number > MetricStrip's size unless explicitly hero → trim

**Reason:** systematic scale = visual rhythm. Random big numbers fight each other for attention.

**Learning:** size scale per context · documented · enforced. Add to FONT-PAIRING-GUIDE.md §3. Save as project doc.

---

### A4 · Genesis Timeline · body text too dark · timeline-dot alignment · hover-focus state

**User:** small font + diff color for body (currently matches title pure black) · timeline line sync w/ dots · use black + red (brand red for start/end dots) · add hover-focus dim siblings.

**Analysis:** screenshot #4 GenesisTimeline · year (1925/1947 etc.) is ink-subtle gray correct · BUT event body (`Australian Cold Stores established in NSW...`) reads pure black · same weight as title. Title-vs-body distinction lost. Dots are uniform gray. No hover-focus dim.

**Decision:**
- Body text: smaller (13px not 14px) · `--semantic-ink-muted` (0.55) — clearly softer
- Title: keep current `--semantic-ink-strong` · bold weight (preserves title-vs-body contrast)
- Dots: 1st + last = brand-red `#b01f24` · middle dots = `rgba(0, 0, 0, 0.20)` (current) — frames the journey
- Timeline horizontal hairline: connect dot centers · sync line color to mid-dot color
- Hover state: on hover-over a column · set siblings to opacity 0.35 · transition 200ms · respects `prefers-reduced-motion`
- Active dot on hover: bg brand-red (or larger ring)

**Reason:** timeline IS the journey story · framing (red start/end) anchors beginning + present. Hover focus = scanability for 8-point timelines. Color contrast across rows = hierarchy.

**Learning:** any timeline/sequence ≥5 nodes should have terminus emphasis (color or weight) + hover-focus for sibling dim. Save to REF-PATTERNS.

---

### A5 · Forecast color · should use green for growth/future indication

**User:** forecast can use green palette · better suited for growth + future.

**Analysis:** **HARD DISAGREE w/ specific reasoning · but offer middle path.**

Per CLAUDE.md hard rules + `COLOR-USAGE-GUIDE.md` + prior stakeholder decision 2026-05-21:
- "Charts use periwinkle/perano/purple palette ONLY · NO blue/emerald/amber/green"
- Brand restraint: green = generic finance/stocks vibe · not Ken's design language
- Refs (rainbow-pothos · merged-report) use ZERO green for forecast

Green for "growth/future" = convention from Bloomberg/Yahoo Finance stock apps. Not premium research consulting (McKinsey · Bain · IBISWorld). Premium use neutral or brand-tinted forecasts (dashed periwinkle · ghost purple · perano-pale).

Current pattern (MarketSize): solid purple historical · dashed periwinkle forecast — IS premium · IS on-brand · matches refs.

**Decision (final · stakeholder approved compromise 2026-05-22):**
- CHART DATA SERIES: keep periwinkle/perano/purple forecast pattern · dashed periwinkle = forecast (matches data viz palette · refs-aligned · NEVER green here) — info sync w/ charts preserved
- UI CHROME signals (PhaseStrip pills · direction arrows · YoY badges): soft/light green ALLOWED for growth + future · sage / mint range · NOT Bloomberg-bright · token-bound
- New token: `--color-growth-soft-bg: rgba(120, 180, 140, 0.15)` · `--color-growth-soft-text: rgba(60, 110, 80, 0.95)` · `--color-growth-soft-border: rgba(120, 180, 140, 0.35)`
- Forecast PhaseStrip pill: use growth-soft tokens (replaces coral)
- IndicatorCard ▲ arrow: growth-soft-text color when positive · neutral ink-muted when flat · still NO color on negative (memory rule preserved · don't use red for down)
- Document the boundary in COLOR-USAGE-GUIDE.md: "green only for UI growth/forecast chrome · NEVER for chart data series · chart series stay periwinkle/perano/purple"

**Reason:** convention ≠ correctness. Stock-app convention conflicts w/ premium consulting brand. Educate stakeholder via doc · don't capitulate.

**Learning:** push back politely when user request conflicts w/ documented stakeholder decisions + ref-pattern study. Show reasoning · offer alternative. Save as memory (`feedback_pushback_with_reasons.md`).

---

### A6 · Sections after §13 lengthy single-view · convert to tabs?

**User:** some sections after §13 are lengthy single-view · convert to tabs · verify idea.

**Analysis:** audit sections §14-§19:
| Section | Current layout | Tab candidate? | Reason |
|---|---|---|---|
| §14 Competitor | inline lede + MetricStrip + bubble chart + PropertyTable + insight | NO | sequential story (concentration → players → properties) reads as scroll-narrative · refs use scroll |
| §15 Regulatory | lede + MetricStrip + PipelineTimeline + 4 RegulatorCard + insight | **YES** (2 tabs) | Pipeline vs. Regulators = 2 distinct lenses |
| §16 Future Outlook | lede + MetricStrip + ScenarioFanChart + ScenarioDriverMatrix + gated cards + insight | NO · ALREADY focused | chart + matrix tell single story |
| §17 Opportunities | lede + MetricStrip + OpportunityRankingTable + insight | NO | single ranked table |
| §18 Macro | lede + MetricStrip + IndicatorCards + multi-line chart + insight | **YES** (2 tabs) | Snapshot vs. Trend = 2 lenses |
| §19 Methodology | already 4-tab (sprint 1) | DONE | — |

**Decision:** tab-refactor only §15 + §18.

§15 tabs:
- Tab 1 "Regulators" · 4 RegulatorCard grid + brief intro
- Tab 2 "Pipeline" · PipelineTimeline w/ phase color coding

§18 tabs:
- Tab 1 "Snapshot 2024" · 4-5 IndicatorCard (current values) — see A7 fix
- Tab 2 "Trends 2018-2027" · KenMultiLineChart historical+forecast lines

**Reason:** tabs work when content splits into NON-OVERLAPPING perspectives ("regulators" vs "timeline" = different shapes of same data). Tabs FAIL when content is sequential narrative (§14: concentration → players is one story · not two). Forcing tabs = lose flow.

**Learning:** tab-decision rule: "can each tab stand alone w/o the others?" YES → tab. "Is one tab the natural consequence of the other?" → no tab · keep flow. Add to TABS-SWITCHERS doc.

---

### A7 · MacroeconomicSection · repetitive data shown twice

**User:** macro indicators show repetitive data one after another · why · fix UI if no reason.

**Analysis:** screenshot #6 confirms · top 4-card row (variant A · big serif 48-64px) shows: GDP 2.8% · CPI 3.4% · Income +2.1% · Trade +14Bn. Then BELOW it · 5-card row (variant B · smaller serif w/ chips · ▲▼ arrows · YoY pills · sublabels) shows: **SAME 4 indicators + FX 0.66**. Same data shown twice in slightly different chrome. Pure visual padding · no information gain.

**Decision:** combine. Single row · use variant B's richer treatment (▲▼ direction · YoY pill · sublabel) BUT at MetricStrip size scale (32-44px not 48-64px) — per A3 fix. Drop variant A entirely. Saves vertical space · doubles density · zero info loss. Wire to §18 Snapshot tab (per A6).

**Reason:** repetition for no reason = wasted scroll · breaks density expectations of McKinsey/Bain web pieces.

**Learning:** any "we'll show snapshot AND detail" layouts must justify the snapshot. If snapshot = detail-minus-arrows · they're the same · merge. Save as memory (`feedback_no_unjustified_repetition.md`).

---

### A8 · §20 "EXTENDED TABLE OF CONTENTS" eyebrow missing

**User:** add Extended Table of Contents label to §20.

**Analysis:** screenshot #7 shows §20 currently just has "SECTION 20" red eyebrow + "Australia Cold Chain Report Structure" h2. Missing: clarification this is the EXTENDED · multi-phase TOC (vs SideTOC).

**Decision:** keep "SECTION 20" red eyebrow on top. Add a thin secondary eyebrow line UNDER h2: `EXTENDED TABLE OF CONTENTS · INTERACTIVE VIEW` (DM Sans 11px uppercase ink-subtle letter-spacing 0.12em). Visual hierarchy: brand eyebrow (red) > h2 (serif large) > category eyebrow (gray meta) > description.

**Reason:** users land on §20 from scroll · need orientation cue · "this IS the TOC · interactive · expanded." Otherwise they think it's a chart section.

**Learning:** any section w/ tooling chrome (search · filter · variant switcher) needs a "what is this" sub-label so users don't have to decode the UI. Add to project pre-task checklist.

---

### A9 · §23 Related Reports cards · color headers cluttered · use neutral / images

**User:** card UI looks cluttered · diff color header per card looks wrong · should be standard color usage · report-store uses images OR neutral if no image · don't use chart colors for card headers.

**Analysis:** screenshot #8 confirms · 4 cards each w/ DIFFERENT color top-strip header (periwinkle · purple · perano · etc.) w/ category label inside. Chart colors used for navigation headers = semantic confusion. Report-store reference: uses ImageWithFallback image OR neutral. Never random chart-palette per card.

**Decision:**
- Drop color-strip header per card. Replace with subtle neutral top section · category label (DM Sans 10px uppercase ink-subtle letter-spacing 0.12em) above title — same color across all cards
- OR (premium variant): use `ImageWithFallback` image · category label as small chip over image OR below
- Card chrome: white bg · 1px border `black-100` · 16px radius · subtle shadow on hover only
- All 4 cards = visually identical chrome · ONLY content differs

**Reason:** chart colors carry meaning ("series 1 · series 2 · series 3"). Repurposing for nav header = mental load. Standard card chrome = scannable · industry standard (report-store · McKinsey insights · IBISWorld).

**Learning:** chart palette = chart palette ONLY. Never re-purpose for UI categorization. Hard rule. Save to memory.

---

### A10 · §22 Related + §23 CTA · should escape sticky SideTOC · own full width

**User:** report preview · banner · related reports should come after main report sections end · NO sticky side TOC on these · these need more space.

**Analysis:** current layout `phase-2/page.tsx`:
```
<div className="mx-auto max-w-[1240px] flex">
  <SideTOCV04 sections={PDP_SECTIONS} ... />
  <div className="flex-1 min-w-0">
    {PDP_SECTIONS.map(...) all 23 sections inside}
  </div>
</div>
```
Means §22 Related + §23 CTA render INSIDE the 2-col body w/ SideTOC visible. They're cramped.

**Decision:** split layout · main sections §01-§21 stay inside 2-col body w/ SideTOC. AFTER `</div>` of body container · close out · render §22 Related + §23 CTA as full-width sections OUTSIDE the SideTOC chrome.

Structure:
```
<main>
  <Hero />
  <div className="2-col-body">
    <SideTOC />
    <div className="content">§01-§21 (incl. §20 ExtendedTOC + §21 FAQs)</div>
  </div>
  {/* Below body container · full-width · no SideTOC */}
  <RelatedReportsSection />  // full-width
  <GetFullAccessSection />   // full-width
</main>
```

Also: SideTOC should NOT include §22 + §23 in its list (they're post-body chrome · not part of report sections). Drop from PDP_SECTIONS array · keep visual scroll-spy clean.

Also: PageProgressBar progress should reach 100% at end of §23 · not §21.

**Reason:** §22 Related = upsell + §23 CTA = conversion. Both need full-width visual breathing room. SideTOC's purpose = navigate REPORT content · not navigate footer chrome.

**Learning:** chrome boundaries — body navigation (SideTOC) covers REPORT body only · marketing/upsell/CTA chrome lives outside body container. Save to layout patterns doc.

---

### A11 · Button system · when small-secondary vs small-brand-red CTA

**User:** buttons should be sized + styled per context · sometimes secondary smaller is better than full-red · like report-store listing card.

**Analysis:** current PDP uses brand-red primary CTAs everywhere (PremiumLockCard "Talk to expert" · §24 banner CTA · FAQ "Contact Research Team" · etc.). Cluttered when 3-4 reds visible in single viewport. Need hierarchy:

| Context | Button style | Reason |
|---|---|---|
| Section gating CTA (PremiumLockCard inline) | Secondary-small (white bg · brand-red text · 1px brand-red border) | One per gated viewport · don't shout · primary CTA is §24 main banner |
| Hero CTA (above-the-fold) | Primary-large brand-red filled | Conversion moment · loud OK |
| FAQ closing CTA "Contact Research Team" | Secondary-medium | Sub-CTA · not the moment |
| §24 Final banner main CTA | Primary-large brand-red filled · ALSO secondary outline alt | Main conversion · loud appropriate |
| Related report "VIEW →" link | Text-link / tertiary | Card-level scan action |
| Sample download button | Secondary-medium | Sub-CTA |

**Decision:**
- PremiumLockCard primary CTA: default `secondary-small` style (was `primary-red filled`)
- Allow `variant="primary"` prop override for cases that need filled red (rare)
- FAQ contact CTA: convert to secondary-medium
- §24 banner CTA: keep primary-large + secondary outline alt (already there)
- Hero CTA: keep primary-large

Audit + sweep · normalize across all sections.

**Reason:** primary brand-red = signal · use it once per viewport at most. Repeated brand-red = devalues the signal. Report-store achieves this via secondary listing buttons + primary hero CTA pattern.

**Learning:** brand-red CTA budget = 1 per viewport. Sub-CTAs go secondary. Reserve loud red for THE moment. Save as memory (`feedback_button_hierarchy.md`).

---

## B · Plan of execution · 11 streams · ordered low→high risk

### Order rationale
1. Token tweak (A1) · single file · cascades to all sections
2. Copy fix (A2 strings) · find/replace
3. Doc updates (A5 · A6 · A9 · A11 reasoning) · text-only
4. PremiumLockCard layout fix (A2 layouts) · single atom
5. Button hierarchy sweep (A11) · multi-section · low LOC each
6. Metric size scale (A3) + IndicatorCard rework (A7) · single section + atom
7. Genesis Timeline polish (A4) · single section
8. Forecast color decision (A5) · doc + 1-2 token swaps
9. §15 + §18 tab refactor (A6) · 2 sections
10. §20 eyebrow add (A8) · 1 section
11. §23 Related cards rework (A9) · 1 section + 1 atom
12. Layout split §22+§23 outside body (A10) · 1 page file + PDP_SECTIONS trim

### Streams

**S1 (A1)** `globals.css` ink-body 0.80 → 0.70 · ink-muted 0.60 → 0.55

**S2 (A2)** PremiumLockCard: rename `Lead-gated` → `Preview only` · `Premium · paid report` → `Premium content` · minimal variant min-width fix · tag pill softer

**S3 (A3+A7)** Metrics scale enforcement:
- Update FONT-PAIRING-GUIDE.md §3 w/ context-size table
- IndicatorCard atom: cap big number at clamp(28px, 3vw, 36px) serif 300
- MacroeconomicSection: drop variant A 4-card top row · merge into variant B (single row · richer treatment)

**S4 (A4)** GenesisTimeline:
- Body text: 13px DM Sans · `--semantic-ink-muted`
- Title: keep `--semantic-ink-strong` font weight 500
- First + last dot · brand-red bg
- Hover handler on column: siblings opacity 0.35 · respects reduced-motion

**S5 (A5)** Forecast color decision documented:
- COLOR-USAGE-GUIDE.md add note · no green for forecast · why · alternatives
- MarketSize PhaseStrip · Forecast pill coral-500 → perano-700 (softer · on-palette)

**S6 (A6)** Tab refactor §15 + §18 (Radix Tabs · canonical pattern)

**S7 (A8)** §20 add secondary eyebrow `EXTENDED TABLE OF CONTENTS · INTERACTIVE VIEW`

**S8 (A9)** RelatedReportCard atom:
- Remove color-strip header
- Standard chrome: white bg · 1px black-100 border · 16px radius · hover shadow lift
- Category label = uniform DM Sans 10px uppercase ink-subtle ABOVE title
- Title + description = standard hierarchy
- Footer meta + VIEW link

**S9 (A10)** Layout split: §22 + §23 escape body container · full-width post-body · drop from PDP_SECTIONS · update PageProgressBar bounds

**S10 (A11)** Button hierarchy sweep:
- PremiumLockCard CTA default → secondary-small (white bg · brand-red text · 1px brand-red border)
- FAQ "Contact Research Team" → secondary-medium
- Audit any other 2-CTA-per-viewport · trim to 1 primary

**S11** QA + ship

### Acceptance per stream
- S1: visual scan · body text noticeably softer · bold still strong
- S2: zero "lead-gated" / "metered" strings in src · PremiumLockCard variants render w/o truncation
- S3: MetricStrip + IndicatorCard sizes uniform · no 48-64px on grid cards
- S4: GenesisTimeline body soft + smaller · terminal dots red · hover dims siblings
- S5: doc note added · PhaseStrip Forecast pill perano-700
- S6: §15 + §18 use Tabs · canonical pattern · keyboard a11y OK
- S7: §20 has 2nd eyebrow line
- S8: 4 related cards visually identical chrome
- S9: §22 + §23 render full-width · SideTOC ends at §21 · progress bar covers §23
- S10: zero stacked primary-red CTAs in single viewport
- S11: build clean · lint clean · scroll page · all asks reflected

---

## C · Discipline rules (carry over from sprint 1)

1. NO patchwork · build local wrapper
2. NO brand-red on negatives
3. NO blue/emerald/amber (or green for forecast · per A5 ruling)
4. 5-tier ink hierarchy enforced
5. Token-only colors
6. Document-first · then execute
7. Anti-bloat · add learnings to project docs · not CLAUDE.md

---

## D · Out of scope (deferred)

- B1 §11 IndustryAnalysis gating (separate task · still open from QA)
- B2 Lighthouse prod retest
- B3 StatPair DD/DT DS-layer bug
- Adding new chart types
- Mobile nav touch targets

---

## E · Learnings to log post-ship (will append to LEARNINGS.md)

1. Opacity hierarchy needs ≥18 pp gap between adjacent tiers on light bg
2. UI copy filter: "would a McKinsey buyer see this?" · no jargon
3. Metric size scale per context · documented · enforced
4. Timeline ≥5 nodes: terminal dot emphasis + hover-focus dim siblings
5. Pushback w/ reasons when user request conflicts w/ stakeholder decisions + ref study
6. Tab rule: "can each tab stand alone?" YES → tab · NO → keep scroll
7. No unjustified repetition · merge or drop
8. Sections w/ tooling chrome need explanatory sub-label
9. Chart palette = charts only · never UI nav headers
10. Layout chrome boundaries: SideTOC covers REPORT body only · CTA/marketing live outside
11. Brand-red CTA budget = 1 per viewport · secondary for sub-CTAs

---

## F · Execution

Single aura-builder dispatch · plan-doc-as-authority · 11 streams sequential · QA last. Estimated 3-4hrs.
