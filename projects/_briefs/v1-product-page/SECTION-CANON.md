# SECTION-CANON · V1 Product Page (v0.2)

> **Three-way reconciliation** · PRD V2.1 canonical taxonomy × live Ken Research page actual content × current v0.2 build × v0.2 DS atoms/molecules/organisms.
>
> Drafted 2026-05-18. Drives the rebuild order + naming + DS reuse decisions. **No code changes until user approves this canon.**
>
> Sources:
> - PRD V2.1 Expanded · `Ken_Research_V1_Product_Page_Rebuild_PRD_V2_Expanded_With_Australia_Example.pdf` (22 pages · master taxonomy + module registry)
> - Live page · https://www.kenresearch.com/australia-cold-chain-markets (actual section content + stats)
> - Current build · `projects/v1-project/v1-product-page-ver0.2/src/components/sections/` (23 organisms built · need rename + DS-replace pass)
> - DS v2 inventory · `design-system/core-v2/src/{atoms,molecules,organisms}` (48 atoms · 27 molecules · 50+ organisms)

---

## §1 · PRD V2.1 canonical 30-section taxonomy (§5 Master Page Architecture)

PRD §5 numbers sections 17-46 (continuation from prior TOC). Renumbered 1-30 here for clarity. **Bold** = PRD-mandated.

| # | PRD canonical name | PRD module-registry key | PRD intent (§8 Detailed Module Reqs) |
|---|---|---|---|
| 1 | **Global header + breadcrumb** | (chrome) | Standard nav + crumb · not module |
| 2 | **Interactive Hero · market intelligence cockpit** | `interactive_hero` | 2-col · cockpit toggle (Market Size · Forecast · Segmentation · Competitors · Methodology) · H1 + region + industry + report type + period + market size + CAGR + forecast + CTAs + metadata · stacked mobile · stats before long text |
| 3 | **Report intelligence snapshot** | `report_snapshot` | Report metadata + intelligence overview (separate from key stats) |
| 4 | **Sticky nav + mobile bottom CTA** | (chrome) | Persistent wayfinding · scroll-spy |
| 5 | **Key Stats Strip** | `key_stats_strip` | 4-8 metrics · label · value · unit · period · context · source · access. Crawlable HTML |
| 6 | **Executive Summary** | `executive_summary` | Boardroom-style. Market size · reason-for-growth · buyer relevance · 3-5 takeaways · use-case chips |
| 7 | **Report Scope & Coverage** | `report_scope` | Mandatory every page. Market · geo · period · segment coverage · competitor coverage · methodology · deliverables · customization |
| 8 | **Country & Infrastructure Context** | `country_infrastructure_context` | Country overview · import/export · population · roads · ports · rail · air. Every fact w/ relevance note. Mini charts + maps |
| 9 | **Market Overview & Genesis** | `market_overview_genesis` | Cards · overview · genesis · business cycle · supply ecosystem · seasonality. Visual anchors (timeline · ecosystem map · biz-cycle diagram) |
| 10 | **Market Definitions & Assumptions** | `definition_glossary` | Glossary cards w/ inclusion/exclusion scope · assumptions · abbreviations · related segments · crawlable |
| 11 | **Taxonomy** | `taxonomy_tree` | Parent-child structure · SEO-readable |
| 12 | **Market Ecosystem** | `ecosystem_infographic` | Hybrid · static infographic + structured text + categorized logo grids. Tabs (Cold Chain · Cold Storage · Cold Transport · Associations) |
| 13 | **Market Size & Growth** | `market_size_chart` | Historical + forecast interactive charts · insight line · controls · dataset preview · source · access state |
| 14 | **Submarket Intelligence** | `submarket_intelligence` | Per-submarket mini sections (Cold Storage · Cold Transport) · revenue · growth · pallets · price · occupancy |
| 15 | **Segment Intelligence (tabs)** | `segment_intelligence` | Tabbed per dimension (End User · Type · Temp · Region · Truck · Mode · Domestic/Intl). Each tab · text · chart · dataset · dominant-segment badge · analyst interpretation · unlock CTA. Auto-hide missing |
| 16 | **Industry Analysis** | `industry_analysis` | SWOT · drivers · challenges · risks · opportunities · trend cards · tech cards · regulation cards. **NO plain pasted tables** |
| 17 | **End-User Analysis + Deep Dives** | `end_user_deep_dive` | Sector cards · technologies · players · ownership/3PL · shelf-life table · temperature-controlled products |
| 18 | **Demand-Supply Gap** | (added in §7 No-Miss Matrix) | Supply-demand mismatch · shortage · opportunity |
| 19 | **Competitor Landscape & Positioning** | `competitor_landscape` | Logo strip · timeline · market-share chart · positioning matrix · company cards · comparison table. Mobile → cards. Top public · benchmark gated |
| 20 | **Trends · Tech · Automation · Emerging Tech** | (part of industry_analysis) | Trend cards (traceability · digitalization · e-com · sustainability) + emerging-tech cards (RPA · IoT · blockchain · advanced analytics) |
| 21 | **Regulatory Landscape** | (part of industry_analysis) | Reg cards · food standards · cold storage/transport · HACCP · biosecurity · COR |
| 22 | **Future Outlook · Forecast Scenarios** | `future_outlook` | Forecast chart · drivers · assumptions · unlock logic. Submarket-level forecast too |
| 23 | **Market Opportunities + Analyst Recommendations** | `opportunities_recommendations` | Setup recs · stage of development · strategic whitespaces. Separate by buyer type (investors · gov · incumbents · operators) |
| 24 | **Macroeconomic Indicators** | `macro_indicators` | GDP · inflation · population · trade · infrastructure · macro charts |
| 25 | **Research Methodology · Sample · Limitations · Disclaimer** | `methodology` | Stepper · secondary research · primary · sanity-checking · modelling. Sample size + limitations expandable |
| 26 | **Table of Contents** | `toc_accordion` | Nested accordion · chapter preview · gating |
| 27 | **FAQs** | `faq` | AI-ready Q&A · market size · forecast · CAGR · players · segments · methodology · delivery · customization · buying. FAQPage schema |
| 28 | **Related Reports** | `related_reports` | Internal linking + discovery |
| 29 | **Final CTA Block** | `cta_block` | Bottom-funnel conversion |
| 30 | **Footer** | (chrome) | Footer + legal + disclaimer + contact |

---

## §2 · Reconciliation matrix — PRD canonical × Live page × Current build × DS reuse

Status: **OK** = already matches · **RENAME** = wrong heading/sectionType · **MERGE** = current build splits what should be one · **SPLIT** = current build merges what should be separate · **NEW** = not built · **DROP-WRAPPER** = current organism duplicates a DS v2 organism that exists → swap to DS

| # | PRD canon | Live page heading | Current build organism | Status | Action | DS atoms/molecules/organisms to use |
|---|---|---|---|---|---|---|
| 1 | Header + Breadcrumb | "Quick Links" + breadcrumb | `ReportNavbar` + `ReportBreadcrumb` | OK | none | DS `DummyHeader` (canonical per memory) · `MegaBreadcrumb` |
| 2 | Interactive Hero · cockpit | "Australia Cold Chain Market (2022-2027)" + Download/Customize CTAs | `HeroSection` (2-col w/ tabs) | OK · partial | tab labels match PRD (Market Size · Forecast · Segmentation · Competitors · Methodology) — verify · add "Methodology" tab | DS `ProductHero` already exists · **DROP-WRAPPER candidate** — evaluate replacing local HeroSection w/ DS `ProductHero` + child cockpit |
| 3 | Report intelligence snapshot | embedded in title block (90 pages · Geetanshi · KRR71 · Nov 2025) | (none separate) | NEW | Build small `ReportSnapshotPanel` (file exists empty/stub) — pages · author · code · pub date · base year · forecast period | DS `CardMetaRow` · `Badge` · `IconBadge` |
| 4 | Sticky Nav | "Tabs": Market Overview · Market Ecosystem · Industry Analysis · Market Segmentation · Future Outlook · Competitor Analysis · Macroeconomic Indicators · Table of Content | `StickyPDPNav` | RENAME chip labels | Update chip labels to PRD: Summary · Scope · Country · Overview · Definitions · Taxonomy · Ecosystem · Market Size · Submarkets · Segments · Industry · End-User · Gap · Competitor · Trends · Regulation · Forecast · Opportunities · Macro · Methodology · TOC · FAQ. **Cap visible to 8 · "More" overflow** | DS `ReadingProgressBar` (use for the scroll-progress bar inside) |
| 5 | Key Stats Strip | inferred from summary copy ("AUD 6,547.8 Mn · 10.03% CAGR · AUD 10,705 Mn 2027") | `KeyStatsStrip` | OK | none | DS `StatsRow` exists — **DROP-WRAPPER candidate** · or keep local + reuse `StatCard` molecule |
| 6 | Executive Summary | "Summary Section" + "Market Overview Subsection" w/ stats | `ExecutiveSummary` | OK | none | DS `AnswerBlock` for SEO crawlable Q/A inline w/ takeaway cards |
| 7 | Report Scope & Coverage | (not present on live page · PRD mandates) | `ReportScopeSection` | OK | none | DS `FilterChip` for segment chips · `Card` |
| 8 | Country & Infra Context | "Macroeconomic Indicators Section" + (Country Overview · Infrastructure Analysis in TOC) | `CountryInfraSection` | RENAME | rename heading to PRD exact "Country & Infrastructure Context" · current heading matches PRD already · keep | DS `DataHighlightCard` molecule fits indicator cards |
| 9 | Market Overview & Genesis | "Market Overview Subsection" | `MarketOverviewSection` (w/ GenesisTimeline + SeasonalityCalendar) | OK | none | DS `LongFormReader` organism for prose · `Card` |
| 10 | Market Definitions | "Market Definitions Section" (Ambient · Frozen · Chiller · Captive · Non-Captive) | `DefinitionsSection` | OK | content swap to live page terms · 7 terms not generic | DS `CollapsibleSection` atom |
| 11 | Taxonomy | "Taxonomy Diagram" (Cold Storage · Cold Transport · Cold Warehousing · Temp-Sensitive Products · Refrigeration · Market Participants · Retail/Distribution · Food/Bev · Pharma · 3PL Providers) | `TaxonomySection` | RENAME taxonomy data | replace mock taxonomy w/ actual live-page taxonomy structure · 10 parent nodes per live page | DS `CategoryListItem` atom · `Divider` |
| 12 | Market Ecosystem | "Market Ecosystem Section" + (Cold Chain players 200-250 · logo grid) | `EcosystemSection` (w/ LogoTierGrid + AssociationStrip) | OK | none | DS `IndustryBadge` molecule · existing `LogoTierGrid` |
| 13 | Market Size & Growth | "Market Size Historical Data (2017-2022)" — 4231.1 → 6547.8 · 9.1% CAGR · peak 2019 10.4% | `MarketSizeSection` | OK | content swap · use exact PRD/live numbers | DS `ChartCard` molecule — wraps any Ken Charts component |
| 14 | Submarket Intelligence | "Cold Storage vs Cold Transport Segmentation" — Storage 2,647.8 (1,668→2,647.8 from 2017-22 · 9.7% CAGR) · Transport 3,900 (2,563.1→3,900 · 8.8% CAGR) | `SubmarketIntelligence` | OK | content swap to exact numbers · 2 tabs (Cold Storage · Cold Transport) | DS `ChartCard` + `StatCard` |
| 15 | Segment Intelligence (tabs) | "Market Segmentation by End Users" (Meat 43.8% AUD 2,867.1 · Fruit/Veg 23% AUD 1,506.7 · Pharma 17% AUD 1,112.4 · Confectionary 9.85% AUD 641.5) | `SegmentIntelligence` | OK | content swap · per PRD §6.4 add 7 tabs total (End-User · Market Type · Temp Range · Region · Reefer Truck · Transport Mode · Domestic/Intl). Currently 1 tab implied | DS `ChartCard` |
| 16 | Industry Analysis (SWOT-led) | "Industry Analysis - SWOT" (S · W · O · T full text) + "Growth Drivers" (4) + "Market Challenges" (4) | `IndustrySection` (currently macro+reg) | **SPLIT BUG** · **RENAME** | current `IndustrySection` is wrong scope — should be SWOT + drivers + challenges + trends + tech + regulation. Macro+reg is part of §24 (Macro) + §21 (Regulation). **REBUILD** | DS `Card` · `Badge` · new SWOT 2x2 grid pattern |
| 17 | End-User Analysis | (covered in Segmentation by End User · also in TOC "End User Analysis") | `EndUserSection` | RENAME | rename eyebrow + heading to PRD "End-User Analysis & Deep Dives" — add shelf-life table + 3PL/owned logic per PRD §8.11 | DS `Card` · `Badge` |
| 18 | Demand-Supply Gap | (not in live page text · PRD No-Miss "Added") | `DSGapSection` | OK | none | inline SVG chart fine for v1 · upgrade to Ken Charts later |
| 19 | Competitor Landscape | "Company Profiles Section" (Americold 1968 · Newcold 1986 · Karras 1989 · Auscold 1994 · ChillFreeze 1997) | `CompetitorSection` | RENAME mock data | replace mock competitors w/ live page 5 actual companies + founding years + descriptions. Add timeline + positioning matrix per PRD §8.12 | DS `ComparisonTable` organism exists — use for full benchmark table |
| 20 | Trends · Tech · Automation · Emerging Tech | (in TOC only · not visible body) | (none) | NEW | Build `TrendsTechSection` — trend cards (traceability · digitization · e-com · sustainability) + emerging-tech cards (IoT · RPA · blockchain · advanced analytics) | DS `Card` · `IconBadge` |
| 21 | Regulatory Landscape | (in TOC only · not visible body — PRD says cards · current build has it inside IndustrySection) | (currently embedded in IndustrySection) | **SPLIT** | extract regulation cards from IndustrySection → new `RegulatorySection` | DS `Card` · `Badge` · use current regulation card pattern |
| 22 | Future Outlook · Forecast Scenarios | "Future Outlook (2022-2027)" · overall 6,947 → 10,705 @ 10.9% · transport 3,900 → 6,099.9 @ 9.4% · peak 2027 10.1% | (none) | NEW | Build `FutureOutlookSection` — chart + drivers + assumptions. Submarket-level forecast nested | DS `ChartCard` molecule |
| 23 | Market Opportunities + Analyst Recommendations | (TOC mentions "Market Opportunities" only) | (none) | NEW | Build `OpportunitiesSection` — per-buyer-type tabs (Investor · Gov · Incumbent · Operator). Lead-gated per PRD §8.14 | DS `Card` · `Badge` |
| 24 | Macroeconomic Indicators | "Macroeconomic Indicators Section" (GDP 1428.5→1450 · pop 25.9M · imports 387→513.2 · top from China 19.4% · exports top to China 14% · iron ore 29%) | (none separate · currently rolled into CountryInfraSection) | **SPLIT** | extract macro indicators from CountryInfra into own `MacroIndicatorsSection` per PRD module registry · keeps Country (overview/infra) and Macro (GDP/trade/inflation/pop) separated | DS `DataHighlightCard` molecule |
| 25 | Research Methodology | "Research Methodology" (TOC entry) | `MethodologySection` (stepper · 4 stages) | OK | content swap from mock to PRD §6.6 actual (Secondary · Primary · Sanity · Modelling) | DS `ResearchMethodology` organism exists — **DROP-WRAPPER candidate** OR `MethodologySection` DS organism |
| 26 | Table of Contents | "Table of Contents" (17 major sections per live page) | `TableOfContentsSection` | OK | content swap w/ actual 17 chapters from live page | DS `TableOfContents` atom + `CollapsibleSection` |
| 27 | FAQs | (not visible on live page · PRD mandates) | `FAQSection` | OK | none | DS `FAQSection` organism exists — **DROP-WRAPPER candidate** |
| 28 | Related Reports | (footer-style on live · not body) | (none) | NEW | Build `RelatedReportsSection` · 3-4 cards | DS `ReportCard` molecule · `RelatedReports`-style grid |
| 29 | Final CTA | (page-end CTA on live) | `FinalCTABlock` | OK | none | DS `FinalCTASection` organism — **DROP-WRAPPER candidate** OR `CTABanner` |
| 30 | Footer | (live page extensive footer) | `ReportFooter` | OK | none | DS `DummyFooter` (canonical per memory) |

**Delta summary:**
- **DROP-WRAPPER candidates** (5) — Hero · KeyStats · Methodology · FAQ · FinalCTA. DS v2 already has organisms. Switch swaps a local file for the canonical DS organism with no functional regression.
- **NEW (4)** — TrendsTechSection (§20) · RegulatorySection (§21 extract) · FutureOutlookSection (§22) · OpportunitiesSection (§23) · RelatedReportsSection (§28). Also Report Snapshot panel (§3).
- **SPLIT (3)** — IndustrySection wrongly scoped (must rebuild as SWOT+drivers+challenges+trends+tech+regulation parent) · Regulation must extract · Macro must extract from CountryInfra.
- **RENAME / content swap (8)** — replace mock data w/ live page actual content. Most of the heavy text rewrite.

---

## §3 · DS reuse map · "where does each DS component fit"

### Atoms (foundation)
| Atom | Used in section | Why |
|---|---|---|
| `SectionWrapper` · `SectionLabel` · `SectionHeading` | every section | R3.7 rhythm enforced |
| `Container` | wherever section needs custom max-width override | replaces inline `maxWidth: 1200px` |
| `Card` | indicator cards · driver cards · segment cards · competitor cards · etc | shared shell |
| `Badge` · `IconBadge` | tier labels · impact badges · access badges (Metered/Lead) | semantic |
| `CollapsibleSection` | Definitions · TOC · Methodology details | PRD §6.6 expandable |
| `AnswerBlock` | inline AI-answer crawlable blocks in Summary + Market Size + Methodology | **PRD §12.2 mandates** — currently MISSING from build |
| `TextLink` · `InlineLink` · `CTALink` | inline links · cross-section anchors | consistent |
| `Button` (variant=brand/secondary/ghost) | all CTAs | 3-tier hierarchy per UX-BRIEF D5 |
| `Divider` | section internal dividers | |
| `IconBadge` | section eyebrow icons (HelpCircle for FAQ etc) | |
| `Tooltip` | metric definitions inline | PRD §8.2 stats need tooltip context |
| `ScrollProgress` | top of page progress bar | PRD §4 micro-detail |
| `ScrollToTop` | floating button below 40% scroll | |
| `SkipLink` | a11y | mandatory |
| `TableOfContents` | TOC organism inner rendering | |
| `Tooltip` | metric hover context | |

### Molecules (composed)
| Molecule | Used in section | Why |
|---|---|---|
| `StatCard` | KeyStats · Country snapshot · Macro indicators | canonical metric card · STOP custom-rolling these |
| `DataHighlightCard` | KeyStats hero card · MarketSize headline · DSGap headline | display-weight serif numbers |
| `ChartCard` | MarketSize · Submarkets · Segments · DSGap · Future Outlook · Macro charts | mandatory per PRD §9.1 chart card anatomy |
| `CardMetaRow` | Report snapshot panel · Competitor card meta | |
| `CardFooterRow` | Card-bottom CTAs | |
| `CompletionBadge` | report completeness · methodology confidence | |
| `EmptyState` | metered/lead empty fallback | per ANTI-PATTERNS §13.8 |
| `HorizontalScroll` | StickyPDPNav chip overflow · mobile segment tabs | replaces custom scroll-x |
| `IndustryBadge` | Ecosystem player tier · Industry breadcrumb | |
| `QuestionPreview` | FAQ row preview | reuse for FAQ accordion rows |
| `ReportCard` · `ReportGridCard` | Related Reports section | |
| `RevealImage` | infographic/diagram lazy reveal | |

### Organisms (full sections)
| Organism in DS v2 | Replaces current local file | Action |
|---|---|---|
| `ProductHero` | `HeroSection.tsx` | evaluate replace — keep local if cockpit tabs aren't in DS version, else swap |
| `StatsRow` | `KeyStatsStrip.tsx` | evaluate replace |
| `MethodologySection` | `MethodologySection.tsx` | evaluate replace · DS version may have stepper variant |
| `ResearchMethodology` | (alt name for same) | check DS · pick one |
| `FAQSection` | `FAQSection.tsx` | evaluate replace |
| `FinalCTASection` · `CTABanner` | `FinalCTABlock.tsx` | evaluate replace |
| `ProductPageTemplate` | `app/page.tsx` whole layout | longer-term · replace bespoke page w/ template + slots |
| `ReadingProgressBar` | (none currently) | NEW — add to StickyPDPNav header |
| `LongFormReader` | (none currently) | use for prose-heavy sections (MarketOverview narrative) |
| `ComparisonTable` | (none currently) | NEW — Competitor full benchmark table |
| `KeyMarketIndicators` | (none currently) | NEW — Macro indicators section |
| `StickyCTA` | `BottomCTABar.tsx` | evaluate replace |
| `MegaBreadcrumb` | `ReportBreadcrumb.tsx` | evaluate replace |
| `DummyHeader` · `DummyFooter` | `ReportNavbar.tsx` · `ReportFooter.tsx` | canonical per memory — replace |

**Rule of thumb (per memory `feedback_ds_port_workflow.md` + `feedback_aura_master_rules.md`):**
1. If DS v2 has the component → USE IT. Do not re-roll inline.
2. If local extends DS w/ legit difference → keep local but import DS atoms inside.
3. If DS lacks the component → build it in `core-v2` first (proper port), then consume.

---

## §4 · Naming/heading canon (PRD-exact strings · for SectionLabel + SectionHeading)

| # | Eyebrow (SectionLabel · uppercase) | H2 (SectionHeading) | DOM id (for sticky-nav · scroll-spy) |
|---|---|---|---|
| 2 | KEN RESEARCH · MARKET INTELLIGENCE | Australia Cold Chain Market Outlook (2022-2027) | `hero` |
| 5 | KEY METRICS | (no H2 · stats lead) | `key-stats` |
| 6 | EXECUTIVE SUMMARY | Executive Summary | `executive-summary` |
| 7 | REPORT SCOPE | Scope & Coverage | `scope` |
| 8 | COUNTRY CONTEXT | Country & Infrastructure Context | `country-infra` |
| 9 | MARKET CONTEXT | Market Overview & Genesis | `market-overview` |
| 10 | MARKET SCOPE | Market Definitions & Assumptions | `definitions` |
| 11 | MARKET STRUCTURE | Taxonomy | `taxonomy` |
| 12 | INDUSTRY ECOSYSTEM | Market Ecosystem | `ecosystem` |
| 13 | SIZE + GROWTH | Market Size & Growth | `market-size` |
| 14 | SUBMARKETS | Submarket Intelligence | `submarkets` |
| 15 | SEGMENTS | Segment Intelligence | `segmentation` |
| 16 | INDUSTRY ANALYSIS | SWOT, Drivers & Challenges | `industry` |
| 17 | END-USER ANALYSIS | End-User Analysis & Deep Dives | `end-user` |
| 18 | OPPORTUNITY SIZING | Demand-Supply Gap | `ds-gap` |
| 19 | COMPETITIVE LANDSCAPE | Competitor Landscape & Positioning | `competitor` |
| 20 | TRENDS + TECHNOLOGY | Trends, Technology & Automation | `trends-tech` |
| 21 | REGULATION | Regulatory Landscape | `regulatory` |
| 22 | FUTURE OUTLOOK | Future Outlook & Forecast Scenarios | `future-outlook` |
| 23 | OPPORTUNITIES | Market Opportunities & Analyst Recommendations | `opportunities` |
| 24 | MACRO INDICATORS | Macroeconomic Indicators | `macro` |
| 25 | HOW WE BUILT THIS | Research Methodology | `methodology` |
| 26 | WHAT'S INSIDE | Table of Contents | `toc` |
| 27 | FREQUENTLY ASKED | Frequently Asked Questions | `faq` |
| 28 | RELATED | Related Reports | `related` |
| 29 | TAKE THE NEXT STEP | Ready to Make Data-Driven Decisions? | `final-cta` |

**Rule:** every section uses SectionLabel + SectionHeading combo. NO custom headings outside DS atoms. Heading EXACT match per this canon — no improvising.

---

## §5 · Bg alternation map (warm/white zebra · already correct, locking in canon)

| # | Section | bg |
|---|---|---|
| 5 | KeyStats | warm |
| 6 | ExecSummary | white |
| 7 | Scope | warm |
| 8 | CountryInfra | white |
| 9 | MarketOverview | warm |
| 10 | Definitions | white |
| 11 | Taxonomy | warm |
| 12 | Ecosystem | white |
| 13 | MarketSize | warm |
| 14 | Submarkets | white |
| 15 | Segments | warm |
| 16 | Industry (SWOT) | white |
| 17 | EndUser | warm |
| 18 | DSGap | white |
| 19 | Competitor | warm |
| 20 | Trends/Tech | white |
| 21 | Regulatory | warm |
| 22 | Future Outlook | white |
| 23 | Opportunities | warm |
| 24 | Macro | white |
| 25 | Methodology | warm |
| 26 | TOC | white |
| 27 | FAQ | warm |
| 28 | Related | white |

---

## §6 · Build/rename plan · ordered by P (priority) · with effort estimate

P0 = canon-breaking · P1 = missing PRD-mandated · P2 = polish

| P | Task | Effort | Notes |
|---|---|---|---|
| P0 | Rebuild IndustrySection scope — turn into SWOT + Drivers + Challenges parent (currently it's macro+reg · WRONG) | M | live-page has actual SWOT text · use it |
| P0 | Extract Regulation into own `RegulatorySection` | S | take reg cards from current IndustrySection |
| P0 | Extract Macro into own `MacroIndicatorsSection` | M | populate w/ live-page GDP/trade/pop/imports data |
| P0 | Build `FutureOutlookSection` — PRD-mandated separate from MarketSize | M | forecast chart + assumptions |
| P0 | Replace mock taxonomy w/ live-page actual 10-node taxonomy | S | RENAME content only |
| P0 | Replace mock competitors w/ live-page actual 5 (Americold · Newcold · Karras · Auscold · ChillFreeze) + founding years | S | RENAME content only |
| P0 | Replace mock definitions w/ live-page actual 7 terms (Ambient · Frozen · Chiller · Captive · Non-Captive · Cold Transport · Cold Chain Market) | S | RENAME content only |
| P0 | Update StickyPDPNav chips to PRD canonical labels + new section IDs | S | also cap visible chips · overflow w/ "More" |
| P1 | Build `TrendsTechSection` (§20) | M | trend cards + emerging-tech cards |
| P1 | Build `OpportunitiesSection` (§23) | M | per-buyer-type tabs |
| P1 | Build `RelatedReportsSection` (§28) — DS `ReportCard` grid | S | |
| P1 | Build `ReportSnapshotPanel` (§3) — pages · author · code · pub date | S | small organism |
| P1 | Add inline `AnswerBlock` to ExecSummary + MarketSize (PRD §12.2 mandate · SEO/AI) | S | currently MISSING — 4 answer blocks min |
| P2 | DROP-WRAPPER pass · evaluate replacing 5 local organisms w/ DS equivalents | M | one-by-one · verify no regression |
| P2 | Segment Intelligence — add 6 missing tabs (currently 1 · PRD §6.4 needs 7) | L | major rebuild |
| P2 | Add `ComparisonTable` DS organism to Competitor for full benchmark table | M | |
| P2 | Add `ReadingProgressBar` to top of page | S | |
| P2 | Replace `ReportNavbar` w/ DS `DummyHeader` · `ReportFooter` w/ DS `DummyFooter` | S | canonical per memory |
| P2 | Replace `BottomCTABar` w/ DS `StickyCTA` | S | |
| P2 | Add Cold Chain Players ecosystem count card ("200-250 cold transportation and storage players") | S | live page has this fact · currently missing |

---

## §7 · Open questions for user (before rebuild execution)

1. **Drop-wrapper aggression** — replace 5 local organisms (Hero · KeyStats · Methodology · FAQ · FinalCTA) w/ DS v2 originals NOW · or defer to post-content rebuild?
2. **Segment tabs scope** — current has 1 tab. PRD §6.4 lists 7. Build all 7 with live-page data, or P2 defer 4 of them?
3. **Future Outlook vs MarketSize** — PRD has Market Size (§13) AND Future Outlook (§22) as separate sections. Current build folds forecast into MarketSize. Split per PRD, or combine?
4. **Opportunities + Recommendations** — PRD says lead-gated. Mock data acceptable, or block until real Ken content available?
5. **Live numbers** — there's a discrepancy in live page: "Overall market forecast: AUD 6,947 Mn in 2022 to AUD 10,705 at 10.9% CAGR" vs hero "10.03% CAGR". Use 10.03% (hero) or 10.9% (Future Outlook subsection)? **PRD §6.1 says 10.03% — use as canon.**
6. **Related Reports content** — fake 3-4 sibling reports or skip section for v1?

---

## §8 · Source mapping table — live page content → which v0.2 section consumes it

| Live page content | Goes into v0.2 section |
|---|---|
| AUD 6,547.8 Mn 2022 · AUD 10,705 Mn 2027 · 10.03% CAGR | Hero + KeyStats |
| Geetanshi Chugh · Nov 2025 · 90 pages · KRR71 · Base Year 2024 | ReportSnapshotPanel (new) |
| Ambient/Frozen/Chiller/Captive/Non-Captive definitions | DefinitionsSection (content swap) |
| 10-node Taxonomy diagram structure | TaxonomySection (content swap) |
| 200-250 cold chain players | EcosystemSection (insight card) |
| Market 4,231.1 → 6,547.8 (2017-2022) · 9.1% CAGR · peak 2019 10.4% | MarketSizeSection (content swap) |
| SWOT full text (4 cells of paragraphs) | IndustrySection (rebuild as SWOT) |
| 4 Growth Drivers (perishable demand · e-com · globalization · tech) | IndustrySection (Drivers subcards) |
| 4 Challenges (cost-vs-tech · last-mile · compliance · infrastructure) | IndustrySection (Challenges subcards) |
| Cold Storage 2,647.8 · 9.7% CAGR · Cold Transport 3,900 · 8.8% CAGR | SubmarketIntelligence (content swap) |
| Segmentation: Meat 43.8% · Fruit/Veg 23% · Pharma 17% · Confectionary 9.85% | SegmentIntelligence Tab 1 (content swap) |
| 5 Competitors (Americold/Newcold/Karras/Auscold/ChillFreeze) + years | CompetitorSection (content swap) |
| Forecast: total 10,705 @ 10.9% · transport 6,099.9 @ 9.4% · peak 2027 10.1% | FutureOutlookSection (NEW) |
| GDP 1,428.5 → 1,450 · pop 25.9M · imports 387 → 513.2 · top China 19.4% · iron ore 29% | MacroIndicatorsSection (NEW · extract from CountryInfra) |
| 17 TOC chapters (per live page) | TableOfContentsSection (content swap) |
| Pork 28.1 kg/capita · total meat 89.6 kg | dropped — too granular for v1 PDP (only in full report) |
| Footer contact info | ReportFooter |

---

## Decision needed from user

Read this canon. Tell me:

- (a) **Approve plan as-is** — I proceed in P0 → P1 → P2 order
- (b) **Adjust priorities** — flag which to skip/move
- (c) **Answer §7 open questions 1-6** — esp the drop-wrapper aggression call + Segment tabs scope

Once approved, I work the P0 list first — IndustrySection rebuild + Regulation/Macro extraction + content swaps. Then P1 new sections. Then P2 drop-wrapper sweep.

**No code changes until you reply.** Build is currently stable + green per the QA sweep above.
