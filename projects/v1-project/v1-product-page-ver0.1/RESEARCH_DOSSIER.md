# RESEARCH DOSSIER — reports-pdp-v1

**Date:** 2026-05-06
**Author:** Aura (Opus, synthesis from 3 parallel research agents)
**Status:** Pre-design. Read this before opening any design tool.

---

## TL;DR

V1 builds Ken Research's **Reports Product Page (PDP)** = page that sells one market research report. Critical conversion surface for 1M+ report catalog.

**Three signals dominate:**

1. **Live page is dated 2014-template tier.** No price, no sticky CTA, no chart preview, dead 17-item TOC, generic boilerplate prose, $2-5k product positioned like sub-$500 SEO content. Big rebuild opportunity.
2. **Existing `report-detail.md` recipe is light.** 7-section, designed for slim reports (~180pg pharma example). Insufficient for "heavy" reports (Australia Cold Chain = 43 content blocks, 16 charts, 5 ecosystem maps, SWOT, value chain, competitor positioning). V1 needs an extended recipe — `report-detail-heavy.md` — schema-driven, that gracefully also handles light reports.
3. **DS reuse is high.** ~60% reuse from `design-system/core/` + `design-system/dashboard/`. Recharts 2.15.2 covers all chart types. StickyCTA + ReadingProgressBar are production-proven. Build-new only: SWOT quadrant, taxonomy tree, value-chain stepper, ecosystem-tier grid, market-positioning quadrant, sector-card multi-stat tile.

---

## A. Live page audit (kenresearch.com/australia-cold-chain-markets)

### IA observed (top → bottom)
Top nav (logo, sign-in, 14-industry mega) · Quick links (All / By Industry / By Region) · Breadcrumb · Hero (title, author, pages, date, 2 CTAs: Download Sample, Get Customized) · 9-tab strip (NON-sticky) · Exec summary (real numbers) · Definitions (italic jargon wall) · SWOT (text only, no quadrant) · Drivers (4 numbered prose) · Challenges (4 numbered prose) · End-user segmentation (table) · Storage vs transport split · Future outlook (CAGR text only) · Company profiles (5 stubs, founding year + one-liner) · Macro indicators · 17-section static TOC · Site-wide promo strips · Footer.

**Missing:** related reports, recently viewed, pricing, testimonials, sticky CTA, sample preview imagery, methodology snippet.

### Top 5 UX problems
1. **Hero asks for two competing CTAs, no price anchor.** No "Buy Now" exists at all on public PDP. Buyer can't tell what report costs or what sample contains.
2. **17-item static TOC, not a navigator.** No anchor links. 9-tab strip near hero implies in-page nav but doesn't stick on scroll.
3. **Boilerplate kills credibility.** Quotes like *"Dispersed population presents logistical challenges…"* — generic, AU-non-specific, templated. No analyst voice.
4. **Company profiles = Wikipedia stubs.** Founding year + one-liner. Useless for vendor shortlisting (the actual buyer JTBD).
5. **Charts referenced in copy but not rendered.** Captions promise data, page shows generic placeholders. Visual data layer absent.

### A11y red flags
- No alt text on chart images (filenames `Container.*.svg`)
- TOC items = static text, not anchors → keyboard users can't jump
- Tab strip ARIA roles unclear, focus rings unverified
- Italicized jargon wall = no `<dl>` semantics
- No skip-link, no `<meta viewport>` confirmed

### Value preview vs paywall
**~60% preview / 40% gated** by surface area, but preview is **low-density**. Page tells you the report exists; doesn't *demonstrate* its quality. No sample-page screenshots, no redacted chart previews, no methodology snippet.

### Visual/brand verdict
"2014 syndicated-report SEO template." Generic sans, no display type, white bg, plain HTML tables, zero data-viz styling, no editorial photography, no analyst portrait, no brand color discipline beyond a single red CTA. Density high but unstructured.

### V1 measurable improvement targets
1. **Time-to-price ≤ 5s** — visible price (or transparent quote-range) above fold; clear CTA hierarchy.
2. **Sample-quality demonstrated, not promised** — ≥3 redacted chart previews, 1 methodology paragraph, real prose excerpt.
3. **Sticky in-page nav + reading progress** — anchored to ~8-10 section IA. Replace dead 17-item TOC.
4. **Competitor module = comparison, not list** — positioning 2×2 + share-of-market chart + side-by-side spec table for top 5.
5. **Trust block above purchase decision** — analyst portrait + bio + prior reports, ≥3 client logos, 1 testimonial, methodology snippet, last-updated date prominent.

---

## B. Reuse map (DS + workspace)

**Existing recipe scaffold:** `design-system/recipes/report-detail.md` (light, 7-section). Lift structure; **extend** to a `report-detail-heavy` variant for 43-block reports.

| PDP Module | Decision | Path |
|---|---|---|
| Hero | REUSE | `design-system/dashboard/.../organisms/ProductHero.tsx` + `core/HeroSection.tsx` |
| Definitions accordion | REUSE | `core/FilterAccordion.tsx` + Radix `accordion.tsx` |
| Taxonomy tree | BUILD NEW | No tree component; needs nesting |
| Ecosystem tier grid | PARTIAL | `dashboard/.../IndustrySectorsGrid.tsx` — needs logo display + tier sizing |
| Market size charts | REUSE | recharts 2.15.2 + `dashboard/.../ui/chart.tsx` ChartContainer |
| Industry analysis (price/occupancy/pallet trends) | REUSE | recharts + ChartContainer + `dashboard/.../molecules/StatCard.tsx` |
| SWOT 4-quadrant | BUILD NEW | No quadrant pattern exists |
| Growth drivers (4-card) | REUSE | `core/EngagementObjectivesSection.tsx` (asymmetric grid + stagger) |
| Value chain stepper | PARTIAL | `core/MethodologySection.tsx` shows phase timeline; adapt horizontal |
| Challenges/solutions | REUSE | `core/ChallengesSection.tsx` + `dashboard/ui/table.tsx` |
| End-user sector cards | REUSE | `dashboard/.../molecules/StatCard.tsx` (multi-stat variant) |
| Segmentation pies/donuts | REUSE | recharts PieChart + ChartContainer |
| Competitor timeline | BUILD NEW | No swim-lane component |
| Market-share bar | REUSE | recharts BarChart |
| Player comparison table | REUSE | `dashboard/.../organisms/ComparisonTable.tsx` |
| Market-positioning quadrant | BUILD NEW | Custom recharts ScatterChart + axis labels |
| Trends/regulatory/emerging-tech card stacks | REUSE | `core/ResourceCard.tsx` + FadeInSection |
| Future outlook charts ×3 | REUSE | recharts (repeat) |
| Macro panel (GDP/pop/import-export + map) | PARTIAL | `dashboard/.../organisms/KeyMarketIndicators.tsx` likely exists; map = new (or lift Globe from `report-store-v07` if installed) |
| Methodology / Research approach diagram | REUSE | `dashboard/.../organisms/ResearchMethodology.tsx` |
| FAQs | REUSE | Radix accordion + schema.org FAQ markup |
| TOC | REUSE | `core/TableOfContents.tsx` |
| Sticky CTA | REUSE | `core/StickyCTA.tsx` (section-aware, `useActiveSection` driven) |
| Reading progress | REUSE | `core/ReadingProgressBar.tsx` |
| Navbar | REUSE | `projects/topnav-v32/.../Navbar.tsx` (canonical) |

### Charts library status
- recharts 2.15.2 installed (BarChart, LineChart, ComboChart, PieChart, AreaChart, RadialBarChart, ScatterChart)
- `ChartContainer` wrapper handles dark/light theming via CSS vars
- **Gaps:** no heatmap, no sankey (would need for value chain if going beyond stepper), no tree diagram → custom SVG or skip

---

## C. Module taxonomy (15 reusable types)

Source: Plan agent. 43 sample-report blocks collapse into 15 types.

| ID | Required? | Inputs (gist) | Tier |
|---|---|---|---|
| `mod.hero` | Required ×1 | title, subtitle, marketHighlights[3-5], snapshotChart, badges, ctas | 1 |
| `mod.definitions` | Optional, repeatable | heading, terms[{term, body, icon?}] | 2 |
| `mod.taxonomy` | Optional ×1 | root, branches[{label, children[]}], depth | 2 |
| `mod.ecosystem` | Optional, repeatable | title, tiers[{label, threshold, logos[], count}] | 2 |
| `mod.chart` | Optional, repeatable | title, chartType (line\|bar\|stacked\|pie\|donut\|area\|gauge\|map), series[], unit, year-range, source | 1 (primary) / 2 (secondary) |
| `mod.matrix` | Optional, repeatable | columns[], rows[{cells[], badges[]}], stickyFirstCol | 1 (player comparison) / 2 (others) |
| `mod.quadrant` | Optional, repeatable | axes:{x,y}, quadrants[4] OR points[{x,y,label}] | 2 |
| `mod.cardGrid` | Optional, repeatable | heading, cards[{icon, title, body, accent?}], cols:2-4 | 1 (drivers) / 2 (trends/regulatory) |
| `mod.flow` | Optional, repeatable | steps[{label, body, metric?}], orientation, annotations | 2 |
| `mod.issueTable` | Optional, repeatable | rows[{problem, solution, severity?, icon}] | 2 |
| `mod.timeline` | Optional, repeatable | entities[{name, events[{year, label}]}], range | 2 |
| `mod.nodes` | Optional ×1 | centerLabel?, nodes[{label, body, icon}] | 2 |
| `mod.macroPanel` | Optional ×1 | panels[{type:chart\|map\|kpi}] | 3 (gated/locked teaser) |
| `mod.faq` | Optional ×1 | items[{q, a}] | 1 |
| `mod.toc` | Required ×1 | sections[{title, subItems[], pageRef?}] | 1 |

**Auxiliary (non-content):** `mod.trustStrip`, `mod.pricingBox`, `mod.analystCta`, `mod.relatedReports`, `mod.coverageBadge`, `mod.sampleDownload`, `mod.recentlyViewed`.

Each module declares: `id`, `type`, `tier (1|2|3)`, `priority (0-100)`, `payload`, optional `groupKey` (for clustering).

---

## D. Page section order rules (default heavy report)

1. `mod.hero`
2. `mod.trustStrip` (badges: published date, pages, analyst, sample CTA inline)
3. `mod.toc` (sticky chapter-nav offshoot on desktop)
4. **Overview cluster:** `mod.definitions` → `mod.taxonomy`
5. **Market shape cluster:** `mod.ecosystem` → primary `mod.chart` (market size historic)
6. **Inline CTA #1** (sample + analyst)
7. **Sizing & segmentation cluster:** secondary `mod.chart`s + `mod.matrix` (end-user)
8. **Dynamics cluster:** `mod.quadrant` (SWOT) → `mod.cardGrid` (drivers) → `mod.flow` (value chain) → `mod.issueTable` (challenges)
9. **Inline CTA #2** (pricing + sample)
10. **Competition cluster:** `mod.timeline` → `mod.chart` (market-share) → `mod.matrix` (player comparison) → `mod.quadrant` (positioning)
11. **Forward-looking cluster:** `mod.cardGrid` (trends) → `mod.nodes` (emerging tech) → `mod.cardGrid` (regulatory) → forecast `mod.chart` set
12. `mod.macroPanel`
13. `mod.flow` (methodology) + limitations
14. `mod.faq`
15. **Inline CTA #3** (custom research + analyst)
16. `mod.relatedReports`
17. `mod.recentlyViewed` (returning users only)
18. Footer trust block (`mod.coverageBadge` + author bio)

### Conditional rules
- If `mod.taxonomy` absent → expand `mod.definitions` to full width, add "Scope" sub-block.
- If SWOT `mod.quadrant` absent but drivers `mod.cardGrid` present → header becomes "Market Dynamics."
- If `mod.matrix`(player comparison) present but `mod.timeline` absent → competition cluster opens with the matrix.
- If `mod.macroPanel` absent → skip; no empty placeholder.
- If `<3` charts total → merge sizing + segmentation into single section "Market Size & Structure."

### CTA cadence
- **Sticky bar** always-on (bottom on mobile / right rail on desktop): Price · Download Sample · Talk to Analyst.
- **Inline CTAs** at ~25%, ~55%, ~85% scroll depth.
- **Hero CTA** primary "Buy Now," secondary "Download Sample" — always above fold.
- **Exit-intent / 60s dwell** prompt = Talk to Analyst (variant-controlled).

---

## E. Scalability rules

### Light reports (<20 blocks)
- Hero → "expanded" treatment: 100vh + 2-3 stat tiles pulled forward from charts.
- Definitions + taxonomy → side-by-side 2-col instead of stacked.
- Related reports module enlarged (3 → 6 tiles), moved up.
- Methodology + author cards expand inline (not gated).
- Section gaps tighten (96px → 64px vertical rhythm).

### Heavy reports (>40 blocks)
- TOC → persistent left-rail chapter navigator (desktop), collapses past 1.5 viewports.
- Tier-2 modules auto-collapse to accordion (first 30% + Expand).
- Chart-dense clusters → tab grouping ("By Temp / By Region / By End-User").
- Floating "Jump to chapter" pill after 3 viewports.
- Player comparison + matrices → auto-paginate (10 rows + Show all).

### Tier mapping
- **Tier 1 (always render, never collapse):** hero, toc, primary chart, player comparison, drivers, faq, pricingBox, sampleDownload.
- **Tier 2 (collapse to accordion if heavy):** definitions, taxonomy, ecosystem, issueTable, timeline, flow, nodes, secondary charts, trends/regulatory cardGrids.
- **Tier 3 (gate behind sample/purchase):** macroPanel, methodology detail, deep segmentation beyond top 3, repeated quadrants.

Every Tier-3 gated module MUST have adjacent `sampleDownload` or `analystCta`.

---

## F. Trust + conversion surfaces

| Surface | Module | Placement |
|---|---|---|
| Author / methodology credibility | `mod.authorCard` | Below hero + methodology cluster (full bio) + footer |
| Sample download | `mod.sampleDownload` | Hero secondary CTA, sticky bar, inline CTA #1, Tier-3 unlock |
| Pricing | `mod.pricingBox` | Sticky bar (compact), inline CTA #2 (full card w/ license tiers), pre-FAQ |
| Talk to analyst | `mod.analystCta` | Sticky bar, inline CTAs #1 & #3, exit-intent prompt |
| Custom research | `mod.customResearchCta` | Inline CTA #3, footer band |
| Related reports | `mod.relatedReports` | Slot 16 (post-FAQ) |
| Recently viewed | `mod.recentlyViewed` | Slot 17, returning users only |
| Coverage badge | `mod.coverageBadge` | Top trust strip + footer |

---

## G. Three variants (same schema, different renderers)

### V1A — Editorial Light A: "Long-scroll publication" (DEFAULT)
- **Surface:** editorial-light per [Quick_start_guide.md](../../Quick_start_guide.md).
- **Density:** continuous long-scroll, generous whitespace, Noto Serif headings.
- **Hero:** full-bleed editorial — large title, photographic/illustrative anchor, stats as understated inline figures.
- **Schema rendering:** every module renders inline; no tabs/accordions until heavy threshold. TOC = slim sticky-top progress.
- **Best for:** sectors with strong narrative arc (geographic markets, single-vertical reports).

### V1B — Editorial Light B: "Sectioned tabs / dashboard"
- **Surface:** editorial-light, denser.
- **Density:** clusters → tab groups; each cluster ~1 viewport.
- **Hero:** split — title left, snapshot chart right.
- **Schema rendering:** `groupKey` clusters collapse into tabbed panels. TOC drives tab state. Charts stack vertically inside each tab.
- **Best for:** dashboard-leaning buyers (analysts, ops teams) who scan quickly. Heavy reports w/ many charts.

### V1C — Cinematic Dark: "Chapter navigator"
- **Surface:** cinematic-dark (`design-system/core/` cinematic variant; reference [Quick_start_guide.md](../../Quick_start_guide.md)).
- **Density:** chapter-paginated; left-rail navigator with progress dots.
- **Hero:** dark, motion-led (animated chart, glow accents, large numerals).
- **Schema rendering:** each cluster = "chapter" with intro card. Tier-3 gated modules render as locked "chapters" with cinematic blur. Charts default to dark theme + neon accent palette.
- **Best for:** premium-tier reports, executive buyers, RFP-driven evaluations. A/B against editorial.

Choice signal: same payload, three templates. Variant assignment can be report-tier driven or A/B per visitor.

---

## H. Risks / unknowns (Aura must resolve before design phase)

1. **Content-completeness signal.** No metadata flag today on a report saying which modules exist. Aura needs a CMS audit: structured payloads or PDF-extracted prose? If latter, an extraction/tagging pipeline = prerequisite. → **For V1 design: assume schema-tagged data exists; build the page; flag the pipeline as tech-team work.**
2. **Chart data shape consistency.** 16+ chart blocks across pies, gauges, maps, stacked bars. Normalized chart-data contract required for `mod.chart` to be one component. → **For V1: define the contract in schema doc; tech implements normalization later.**
3. **Gating policy.** Tier-3 gating assumes Ken buys in to lock content. Sales may resist; SEO may want full text indexable. → **For V1: design with gates; flag for stakeholder review.**
4. **Localization & RTL.** 1M+ reports likely span regions. Chapter navigator + matrix scroll behave differently RTL. → **V1 scope: LTR only, English. Flag RTL for V2.**
5. **Performance budget.** 45-module, 16-chart page will blow LCP/INP if all hydrate eagerly. → **V1: chart lazy-load below fold (intersection observer); Tier-3 don't render at all pre-purchase (only locked teaser).**

---

## I. What Aura builds in V1 design phase

### Deliverables
1. **`design-system/recipes/report-detail-heavy.md`** — extended recipe covering 43-block heavy reports. Section sequence + organism names locked per recipe-driven anti-pattern guard (per `feedback_anti_bloat.md` lesson from ken-v2).
2. **`projects/reports-pdp-v1/SCHEMA.md`** — module taxonomy + payload contracts (TS-style spec, not implementation).
3. **`projects/reports-pdp-v1/VARIANTS.md`** — three variant briefs with hero treatment, density rules, motion strategy per variant.
4. **`projects/reports-pdp-v1/MOCK_DATA.md`** — Australia Cold Chain sample report mapped to schema (full payload).
5. **3 design explorations** built against the schema. Implementation tooling decision (Next.js vs Vite) deferred until after recipe + schema lock.

### Order of operations
1. ✅ Project log + research (this dossier)
2. → Write extended recipe (`report-detail-heavy.md`) [next]
3. → Write SCHEMA.md (TS contracts)
4. → Write VARIANTS.md (3 briefs)
5. → Write MOCK_DATA.md (Australia Cold Chain payload)
6. → Decide implementation stack (Next.js vs Vite) — likely Next.js per CLAUDE.md L1 web stack
7. → Spawn aura-builder × 3 (one per variant) OR 1 builder for shared scaffold + 3 variant renderers

### Out of scope for V1
- RTL / i18n
- Backend integration (mocks only)
- Real chart-data extraction pipeline
- Pricing page deep-flow (we surface pricing; checkout is a separate surface)
- A/B test infrastructure (variant choice is manual for V1)

---

## J. Open questions for user before design starts

1. **Implementation stack:** Next.js 15 (per CLAUDE.md production stack) or Vite/React (matches existing `template-v3` / `report-store-v07`)?
2. **Variant priority:** which variant gets built FIRST (other two stubbed)? Recommend: V1A (editorial long-scroll) — closest to existing recipe + lowest risk.
3. **Pricing display:** Ken does not currently show price on PDP. Show $X price OR "Get pricing" + range? V1 default: show transparent USD price + license tier popover.
4. **Sample report:** is one report enough for V1, or do you want a 2nd light report stubbed to prove scalability rendering? Recommend: stub a 2nd lightweight report w/ ~15 blocks to validate light-report rules.

→ Lock answers; proceed to recipe + SCHEMA.md.
