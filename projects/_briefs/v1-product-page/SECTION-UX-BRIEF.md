# SECTION-UX-BRIEF · V1 Product Page (v0.2)

> Per-section UX research bridge. RESEARCH.md gave category-level patterns. This doc applies those learnings section-by-section: **intent · scan pattern · density · hierarchy · CTA stance**. Drives organism rebuild decisions.
>
> Drafted 2026-05-18. Source inputs: RESEARCH.md §9 Top 10 · PRD-V2.1 §6 sections · MOCK-DATA-MEDIUM.md.

---

## Buyer scroll-depth model

Buyer arrives via SEO/email/LinkedIn ad. Two personas:
- **Scanner (70%)** — first 8 sec decides "is this credible? is the number what I need?" → either bounce OR commits to read.
- **Evaluator (30%)** — past 30 sec, reads narrative + methodology + sample chart → likely converts on `Download Sample`.

Scroll depths (typical PDP heatmap):
- **0–100%** (above-fold · 100% see) — Hero
- **100–200%** (90% see) — KeyStats · ExecSummary
- **200–500%** (60% see) — Scope · Country · Market Overview · Definitions
- **500–800%** (30% see) — Taxonomy · Ecosystem · MarketSize · Submarkets · Segments
- **800–1000%** (15% see) — Industry · End-User · DSGap · Competitor
- **>1000%** (5–10% see) — FinalCTA

Implication: **earlier sections must do conversion-lifting work**. Deep sections serve evaluators who already trust. Don't waste hero on data evaluators want at scroll 700%.

---

## Section-by-section brief

| # | Section | Buyer intent at this depth | Scan pattern | Density | Hierarchy (1 thing must register in 3s) | CTA stance |
|---|---|---|---|---|---|---|
| 1 | **Hero** (60/40) | "Is this the right report? Worth my time?" | Z-pattern (title L → snapshot R → CTA bottom) | LOW — 1 H1 · 1 metric · 1 CTA pair | **Market size + forecast year** | PRIMARY · Download Sample |
| 2 | **StickyPDPNav** | "Can I jump to what I need?" | Horizontal scan L→R | LOW — 6 chips max | Active section highlight | none (pure nav) |
| 3 | **KeyStatsStrip** | "What are the headline numbers?" | Grid scan (3-2-1 fixate) | LOW — 4-6 single-question cards | **Top-left card = current market size** | none (scan zone) |
| 4 | **ExecutiveSummary** | "TL;DR of report — do I keep reading?" | F-pattern (left-edge scan) | MED — 4-6 takeaway cards · NO walls of prose | **3 strategic insights as cards · not paragraph** | SECONDARY · "Get Full Summary" |
| 5 | **ReportScope** | "Does this cover MY use case?" | Checklist scan | LOW-MED — chip array + use-case row | **Segments covered chip-array** (GVR pattern) | none |
| 6 | **CountryInfra** | "Geo context — is data localized?" | Map + table | HIGH (gated) — show 1 country full · rest blurred | **Country map · sample country card unlocked** | TERTIARY · "Unlock regions" |
| 7 | **MarketOverview** | "Why this market matters now" | Narrative flow (stat→driver→forecast) | MED — 1 hero stat + 3 driver cards + 1 chart preview | **Hero number + 1-line "why now" caption** | none |
| 8 | **Definitions** | "Terms — is this written for me?" | Glossary scroll | LOW — accordion collapsed default | First 3 terms expanded · rest collapsed | none |
| 9 | **Taxonomy** | "Structure of the analysis" | Tree/diagram scan | MED — visual hierarchy diagram · NOT bullet list | **Diagram preview · expandable** | none |
| 10 | **Ecosystem** | "Who's in this market?" | Logo + tier grid | MED — logo wall w/ tier labels | **Top tier logos · 5-7 visible** (avoid logo soup) | none |
| 11 | **MarketSize** | "Size + trajectory" | Chart-led | HIGH — chart hero + 2 commentary points | **Chart fills card · commentary below** | TERTIARY · "Unlock chart data" |
| 12 | **Submarkets** | "Which submarket = my play?" | Grid of mini-cards | MED — 4-6 submarket cards w/ size · CAGR · 1 trend | **Submarket name + size · trend chip** | TERTIARY · per-submarket Unlock |
| 13 | **Segments** | "Buyer types · channels" | Tab + chart | HIGH (mostly gated) — 1 segment unlocked · rest gated preview | **Sample segment chart + narrative · gated CTA below** | SAMPLE-VALUE-DEMO (RESEARCH §9.6) |
| 14 | **Industry** | "Macroeconomic + regulatory context" | Sub-section accordion | MED — 4-5 indicators · 2-3 reg notes | **Top 3 indicators w/ trend** | none |
| 15 | **End-User** | "End-user landscape" | Persona grid | MED — 3-4 user-segment cards | **Largest user-segment card highlighted** | none |
| 16 | **DSGap** (Demand-Supply Gap) | "Opportunity sizing" | Side-by-side bar + commentary | MED-HIGH — gap chart + 2 callouts | **Gap value + direction** | TERTIARY · Unlock |
| 17 | **Competitor** | "Who am I up against?" | Comparison table | HIGH (mostly gated) — first 3 comps unlocked · rest blurred | **3 sample competitor rows + tier badges** | SAMPLE-VALUE-DEMO + Unlock CTA |
| 18 | **FinalCTABlock** | "OK I'm sold — what next?" | Centered conversion form | LOW — 1 headline · 1 form · 1 trust line | **Email capture form · primary CTA** | PRIMARY (final conversion) |

---

## Cross-cutting decisions (apply to all sections)

### D1 · Hierarchy enforcement
- One H1 per page (Hero only). Every other section uses H2 (SectionHeading) + optional H3 sub-heads.
- SectionLabel (eyebrow) PRECEDES every H2 — eye-track research: eyebrows lift scan-to-comprehension by 30%.
- One dominant fact per section in 3s. If user can't name it after 3s, section fails.

### D2 · Density tiers (caps per section)
- **LOW** — 1 hero element + 1-3 supports. No section exceeds 4 visible elements above fold.
- **MED** — 4-6 cards or 1 chart + 3 callouts. Cap at single-screen height when possible.
- **HIGH** — chart/table led. Allow scroll inside section if content rich. Add "View more" progressive disclosure.

### D3 · Narrative flow rule (RESEARCH §9.7)
Every section follows: **stat → driver → forecast/implication**. No isolated facts. Captions/sub-text must answer "why does this matter for buyer?"

Apply where: ExecSummary · MarketOverview · MarketSize · Submarkets · Segments · DSGap.

### D4 · Sample-value-demo (RESEARCH §9.6)
At LEAST one section shows 1 FULL sample artifact (chart OR segment narrative) inline before gate. Currently planned: **Segments section · 1 unlocked segment**. Also: **Competitor · 3 unlocked rows**. Drives 2-4× conversion lift.

### D5 · CTA hierarchy across sections (RESEARCH §9.8)
- **PRIMARY** (Download Sample · brand red filled): Hero · FinalCTA · BottomCTABar (when active)
- **SECONDARY** (Get Customized · brand red outlined): ExecSummary · BottomCTABar
- **TERTIARY** (Unlock · pill chip): per-card gated artifacts (CountryInfra · MarketSize · Submarkets · DSGap · Competitor)
- **Never** stack >2 CTAs in same viewport. Mobile · single CTA per viewport.

### D6 · Progressive disclosure (RESEARCH §9.9)
Collapsed-by-default · expand on intent. Apply to: Definitions · Taxonomy · Competitor profiles · Industry sub-sections. Default-collapsed = lower bounce + better scan-to-detail funnel.

### D7 · Bg alternation (already enforced)
Warm `#f5f2f1` ↔ White `#ffffff` strict zebra per recipe. Already correct post-rebuild 2026-05-18.

### D8 · Sticky chrome rules
- **StickyPDPNav** — appears after hero exits · pin top 64px · 6 chips max. Mobile: horizontal scroll.
- **BottomCTABar** — appears ONLY after `#cta-bar-trigger` (last section before FinalCTABlock) passes · hides when FinalCTABlock enters. Never during mid-doc reading. **Fixed 2026-05-18.**

### D9 · Reduced motion + a11y
- `useReducedMotion()` mandatory on every `motion.*`.
- All cards: 44px touch · focus-visible ring · aria-label where icon-only.
- Lock badges: aria-label="Premium access required" not just lock icon.

### D10 · Mobile-first stack rules
- Hero 60/40 → single col on <1024px · snapshot card below H1.
- StickyPDPNav → horizontal scrollable chip row · arrows on edges if overflow.
- KeyStats grid → 2-col mobile · 3-col tablet · auto-fill desktop.
- All cards: maintain padding · never shrink below `var(--space-4, 16px)` inner padding.

---

## Action items per organism (drives rebuild order)

Highest-impact rebuilds first (where current vs brief delta is biggest):

| Priority | Section | Current state | Brief gap | Effort |
|---|---|---|---|---|
| **P0** | ExecutiveSummary | text walls | 3-card takeaway grid + 1 sample chart | M |
| **P0** | MarketOverview | wordy intro | hero stat + 3 driver cards | M |
| **P0** | CountryInfra | dense table | map + 1 unlocked + rest gated | L |
| **P1** | Definitions | flat list | accordion w/ 3 expanded default | S |
| **P1** | Taxonomy | bullet hierarchy | visual diagram preview | M |
| **P1** | Ecosystem | logo grid | tier-labeled logo wall | S |
| **P1** | Submarkets | dense cards | 4-6 mini-cards w/ trend chips | S |
| **P2** | Industry §17 | not built | persona-style indicator grid | M |
| **P2** | End-User §18 | not built | 3-4 segment cards | M |
| **P2** | DSGap §19 | not built | gap chart + 2 callouts | L |
| **P2** | Competitor §20 | not built | 3 unlocked rows + gated rest | L |

P0 = visible drift from brief in current build. P1 = polish. P2 = Sprint 6 builds.

---

## Sources

- RESEARCH.md §1-9 (this brief)
- PRD-V2.1-australia-coldchain.md §6 (section catalog)
- Baymard PDP research (scan patterns)
- NN Group (3s rule · card cognitive load · F-pattern)
- Adapty 2026 (sample-value-demo conversion data)
