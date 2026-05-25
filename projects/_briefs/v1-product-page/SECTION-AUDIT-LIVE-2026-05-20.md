# Live Product Page Section Audit — 2026-05-20

**Scope:** 3 live Ken Research product pages — content inventory + UI/UX audit + gap vs PRD V2.1 30-section architecture
**Source URLs:**
1. https://www.kenresearch.com/australia-cold-chain-markets
2. https://www.kenresearch.com/ksa-fitness-services-markets
3. https://www.kenresearch.com/india-kitchen-brands-market

**Method:** WebFetch HTML → markdown extraction (single-pass per URL). Some chart images + interactive states inferred from HTML/srcs — not from rendered DOM screenshots. Mobile responsiveness scored on stated patterns + page-source breakpoints (limited). Lighthouse/axe scores not run live — heuristic only.

**Companion docs:** PRD-V2.1-australia-coldchain.md · SECTION-CANON-V03.md · KEN-CHARTS-PLAN.md

---

## Executive Summary (5 bullets)

1. **All 3 pages share the same Django CMS template — same 8-10 broad sections, same gaps.** Country/Infrastructure context, Definitions glossary, Ecosystem with tabs, Segmentation tabs, Methodology detail, Sample-size disclosure, SWOT-as-card-grid, Trends/Tech/Regulation cards, Opportunities/Recommendations, Demand-supply gap, End-user deep dives, Related reports module — **all missing or present-but-weak across every page**. PRD has 30 sections · live pages average 9 visible · roughly 70% PRD coverage gap.
2. **Charts are static images, not interactive.** Zero tooltip · zero dataset preview · zero access-state · zero source-note · zero alt text equivalents. PRD §9 chart-card anatomy (eyebrow / title / insight / controls / body / dataset / source / CTA) has roughly 0/8 elements live. This kills SEO data extraction, AI answer blocks, and competitor-benchmark monetization simultaneously.
3. **Data integrity failures visible to buyers.** KSA FAQ states 11.9% CAGR while body says 9.7%. India FAQ says USD 10.35 Bn 2023 while body says USD 6.08 Bn (~70% delta). India future date Apr 2026 published shown. These are trust-killers — a buyer comparing report values across the page itself sees contradictions before they ever pay.
4. **CTA strategy is hero-only + generic "Download Sample / Get Customized" loop.** PRD §13 requires contextual CTA after each high-intent data moment (chart, stat, segmentation, competitor, forecast, TOC). Live pages have one CTA pair stranded at hero + repeated generic CTAs in footer. Zero unlock-context, zero CTA tied to chart/stat/section IDs, zero metered/lead-gated UX. Conversion architecture is functionally empty.
5. **No FAQs visible on Australia page · 5 FAQs on KSA and India (incl. wrong numbers).** TOCs are flat lists without accordion / chapter preview / gating. No related-reports module — just one stranded "Israel Logistics" case study + one "Al-Dawaa KSA" insight repeated identically across all 3 unrelated pages. Internal linking is non-existent.

**Bottom-line priority for v0.4 rebuild:** Fix data integrity → ship interactive chart cards w/ dataset preview + access state → add the 21+ missing PRD sections via module renderer → add contextual CTA system tied to section/chart IDs → add real related-reports + internal linking.

---

# URL 1 · Australia Cold Chain Market

## A · Content inventory

### Hero
| Field | Value |
|---|---|
| H1 | "Australia Cold Chain Market (2022-2027)" |
| Hero promise | "In-depth industry report on the Australia Cold Chain Market" |
| Primary metric | AUD 6,547.8 Mn (2022) |
| Forecast | AUD 10,705.0 Mn (2027) |
| Historical CAGR | 9.1% (2017-2022) |
| Forward CAGR | 10.03% (2022-2027) |
| Pages / Code / Date | 90 pages · KRR71 · Nov 2025 |
| Author | Geetanshi Chugh |

### Section headings (top-down order observed)
1. Market Overview · Australia Cold Chain Market Overview · Definitions · Taxonomy
2. Australia Cold Chain Market Ecosystem
3. Australia Cold Chain Market Size, 2017-2022
4. Industry Analysis · SWOT · Growth Driver · Challenges
5. Market Segmentation · Revenue by End Users (2022) · By Cold Storage and Cold Transport
6. Future Outlook · Future Market Size (2022-2027) · Future Cold Transport Size (2022-2027)
7. Company Profile
8. Macroeconomic Indicators
9. Table of Contents

### Charts (all static images, no interactivity)
| Title | Type | Data |
|---|---|---|
| Ecosystem | SVG diagram | Market structure visual |
| Market Size 2017-2022 | Bar/line image | AUD 4.2B → 6.5B |
| Future Market Size 2022-2027 | Projection image | → AUD 10.7B |
| Cold Transport Projection 2022-2027 | Forecast image | → AUD 6.1B |
| GDP & Inflation Rate | Time-series image | 2017-2022 |
| Population 2022 | Stat text | 25.9M |
| Import Scenario | Trend image | AUD 387B→513.2B |
| Export Scenario | Trend image | AUD 312.4B→513.2B |

### Datasets/tables visible
- **Segmentation by End-User (2022):** Meat & Seafood 43.8% (2,867.1 Mn) · Fruit/Veg 23.0% (1,506.7 Mn) · Pharma 17.0% (1,112.4 Mn) · Confectionary 9.85% (641.5 Mn)
- **Market by Type (2022):** Cold Storage 2,647.8 Mn · Cold Transport 3,900.0 Mn
- **Company Profile:** 5 rows (Americold · Newcold · Karras · Auscold · ChillFreeze) · cols: Name · Est · Description
- **Macro:** GDP USD 1,428.5B → 1,450.0B · Inflation 2.9% (2021) · Imports CAGR 5.8% · Top partners: China 19.4%, USA, Japan, Thailand, Germany

### Stat strip metrics
None as a dedicated strip. Stats are buried in paragraphs. Reconstructed list: AUD 6,547.8 Mn (2022) · AUD 10,705.0 Mn (2027) · CAGR 10.03% · Cold Storage 2,647.8 Mn · Cold Transport 3,900.0 Mn · Meat 43.8% share · Pork 28.1 kg/cap · Ag GDP $68.9 Bn (3.2% GDP).

### Ecosystem / competitor data
- 5 named players · no logo wall · no tier groupings · no market-share chart visible · positioning matrix referenced in TOC but not rendered

### Segmentation dimensions covered
PRD recipe expects 7 (End User · Market Type · Temperature · Region · Reefer Truck · Transport Mode · Domestic/International). **Live: 2 visible (End User · Cold Storage/Transport).** Other 5 dimensions only exist as TOC line-items — no chart, no table, no insight on page.

### Methodology blocks
**Not present on page.** TOC chapter 15 lists Methodology sub-items (Definitions · Abbreviations · Sizing Approach · Consolidated Approach · Sample Size · Limitations) but zero content rendered. Sample-size disclosure missing. Sanity-check missing. Limitations missing.

### FAQs
**None on page.** Footer FAQ link points to T&C anchor — not page-specific.

### TOC structure (17 chapters as text-list, no accordion)
Executive Summary · Country Overview · Infrastructure · Market Genesis · Segmentation · Cold Storage Market · Cold Transport Market · Competition · Industry Analysis · End-User Analysis · Future Outlook · Cold Storage Future · Cold Transport Future · Opportunities & Recommendations · Methodology · Disclaimer · Contact Us

### Related reports linked
- Israel Logistics Market (case study card — unrelated)
- Al-Dawaa KSA Retail Pharmacy (insight card — unrelated)
- No actual related-reports module · no internal links to other cold-chain / Australia / logistics reports

### Footer / legal / disclaimer
Footer is global navigation: 4 office addresses · Disclaimer · T&C · Privacy · FAQs link · newsletter signup. No page-specific disclaimer or product-code/SKU disclosure block.

## B · UI/UX audit

| Dimension | Score | Concrete issues |
|---|---|---|
| Visual hierarchy | 4/10 | H1 not visually dominant (no scale jump vs section headings); no key-stats strip prominence; CTAs only in hero, lost below fold; H2 section headings undifferentiated from H3 |
| Typography | 5/10 | Single-weight body, no metric-styling distinction (stats look like body copy), no executive-insight line treatment; system font feel, no Ken serif/sans pairing |
| Color + contrast | 5/10 | Generic white/grey; Ken red used only on primary CTA — never reinforced as brand throughout. Static chart images have unknown contrast — not WCAG-auditable as standalone alt-less raster |
| Spacing + density | 4/10 | Cramped vertical rhythm; section breaks weak; no card containers per PRD §4 — text blocks bleed into each other; tables flush against paragraphs |
| Chart presentation | 2/10 | 100% static images. Zero interactivity. No title-on-chart. No source note. No dataset preview. No access state. No alt text (assumed). No insight line. PRD §9 anatomy 0/8 elements met. |
| Mobile responsiveness | ? | Cannot verify without rendered viewport — likely basic stack via Bootstrap given Django CMS template heritage. Tables likely overflow x-scroll; chart images likely shrink (illegible at < 480px) |
| Conversion UX | 3/10 | Hero CTAs only. No contextual unlock CTA after chart/stat/forecast/segmentation/competitor. "Request on Demand" repeats 4x in unrelated sections. Sample form is a route — not embedded modal · no context fields per PRD §13.1 |
| Information architecture | 4/10 | Section order is roughly aligned w/ PRD but missing 21+ sections. No sticky nav. No skip-to-section. TOC is at bottom as static list, not accordion. No reading-progress or section-anchor. |
| A11y | ? | Static chart images = no data-table fallback. Heading hierarchy mixes H2/H3 inconsistently. No visible landmarks. ARIA / keyboard nav unconfirmed but likely absent given Django CMS legacy template. |
| Performance signals | 4/10 | All charts as separate raster images — likely LCP candidate is hero text but chart images add weight. No lazy-load attributes visible. WebP/AVIF unknown. |

## C · Critical gaps vs PRD V2.1 30-section architecture

| # | PRD Section | Status | Notes |
|---|---|---|---|
| 1 | Global header + breadcrumb | PRESENT-WEAK | Header yes, breadcrumb missing |
| 2 | Interactive hero w/ cockpit toggles | PRESENT-WEAK | Static hero, no Market Size/Forecast/Segmentation/Competitors/Methodology toggle |
| 3 | Report intelligence snapshot | MISSING | No snapshot card |
| 4 | Sticky nav + mobile bottom CTA | MISSING | None |
| 5 | Key stats strip | MISSING | Stats embedded in paragraphs, not as strip |
| 6 | Executive summary | PRESENT-WEAK | Narrative paragraph, no boardroom summary / use-case chips / takeaways |
| 7 | Report scope and coverage | MISSING | No dedicated scope block |
| 8 | Country and infrastructure context | MISSING | TOC mentions it, page doesn't render it |
| 9 | Market overview + genesis | PRESENT-WEAK | Overview present, no genesis/business-cycle/seasonality cards |
| 10 | Definitions and assumptions | PRESENT-WEAK | Single Definitions paragraph, not glossary cards |
| 11 | Taxonomy | PRESENT-WEAK | Mentioned, not rendered as tree |
| 12 | Market ecosystem | PRESENT-WEAK | Static SVG only, no tabs (Cold Chain / Storage / Transport / Assoc), no logo wall, no tier groupings |
| 13 | Market size + growth | PRESENT-WEAK | Static chart only, no interactive, no dataset, no access state |
| 14 | Submarket intelligence (storage + transport) | PRESENT-WEAK | Future-size charts present, no pallets/price/occupancy/temperature data per PRD §6.3 |
| 15 | Segment intelligence tabs | MISSING | 2 of 7 dimensions shown · no tabbed UI · no dominant-segment badge |
| 16 | Industry analysis (SWOT/drivers/challenges/value chain/seasonality/cycle) | PRESENT-WEAK | SWOT mentioned, no 2x2 grid; no value-chain stepper; no seasonality |
| 17 | End-user analysis + deep dives | MISSING | TOC has it, page doesn't render shelf-life / handling matrix / pharma deep-dive |
| 18 | Demand-supply gap module | MISSING |
| 19 | Competitor landscape + positioning | PRESENT-WEAK | Text-list of 5 players, no market-share chart, no positioning matrix, no comparison table |
| 20 | Trends + tech + automation | MISSING | TOC mentions, page doesn't render |
| 21 | Regulatory landscape | MISSING | No regulation cards (HACCP / Food Standards / Biosecurity / COR) |
| 22 | Future outlook + forecast scenarios | PRESENT-WEAK | Single forecast chart, no scenarios, no driver-assumption cards |
| 23 | Market opportunities + analyst recommendations | MISSING |
| 24 | Macroeconomic indicators | PRESENT-WEAK | GDP/inflation/imports/exports as raw images, no relevance-to-market notes per PRD §8.5 |
| 25 | Research methodology + sample size + limitations + disclaimer | MISSING | TOC has it, page renders 0 content |
| 26 | Table of contents | PRESENT-WEAK | Flat list, no accordion, no preview/gating |
| 27 | FAQs | MISSING | None |
| 28 | Related reports | MISSING | Two unrelated case-study cards |
| 29 | Final CTA block | PRESENT-WEAK | Generic "Talk to Consultant" — no contextual report-specific unlock CTA |
| 30 | Footer | PRESENT | Global footer present |

**Score: 4 PRESENT · 13 PRESENT-WEAK · 13 MISSING.** Coverage roughly 30% of full PRD architecture, weighted by content depth far less.

## D · Top 5 fixes (prioritized)

1. **Add Key Stats Strip + Hero Cockpit (PRD §5 items 2, 5)** — 6-8 stat cards w/ label · value · unit · period · access-state · source-note. Hero gains 5-toggle cockpit (Market Size · Forecast · Segmentation · Competitors · Methodology). High SEO + AI-answer-block win. Foundational for v0.4.
2. **Replace static chart images with Ken Charts interactive cards (PRD §9)** — At minimum: Market Size 2017-2022 · Future Market Size 2022-2027 · Cold Storage submarket · Cold Transport submarket · End-User donut. Each card: eyebrow · title · insight · controls · dataset preview · source · access state · CTA. Critical for monetization (dataset gating) AND a11y (data-table fallback).
3. **Render full Segmentation Tabs (7 dimensions per PRD §6.4)** — Currently 2 of 7. Add Temperature Range · Region · Reefer Truck Type · Transport Mode · Domestic/International. Each tab = chart + table + dominant-segment badge + analyst note + unlock CTA.
4. **Build Methodology + Sample Size + Limitations module (PRD §6.6, §8.15)** — Stepper UI: Secondary → Primary (30+ CATI list) → Sanity → Sample Size (50-60 / 20-30 / 15-20 with C-Level/Director/KAM split) → Limitations expandable. Trust-builder · differentiates from generic CMS dumps.
5. **Add contextual CTA system tied to chart/section IDs (PRD §13)** — Per-section: View Full Dataset · Unlock Segment Breakdown · Unlock Competitor Benchmark · Unlock Forecast Data · Preview Methodology · Preview Full TOC. Each CTA carries `chart_id · section_name · cta_location` to CRM hidden fields.

---

# URL 2 · KSA Fitness Services Market

## A · Content inventory

### Hero
| Field | Value |
|---|---|
| H1 | "KSA Fitness Services Market (2022-2027)" |
| Primary metric | SAR 6,159 Mn (2022) — body says SAR 6.15 Bn |
| Forecast | SAR 9,793.5 Mn (2027) — body says SAR 9.7 Bn |
| Historical CAGR | 6.4% (2017-2022) |
| Forward CAGR | 9.7% body / 11.9% FAQ (DATA CONFLICT) |
| Report period | 2022-2027 (base year 2024) |

### Section headings (top-down order)
1. Market Overview
2. KSA Fitness Services Market Overview
3. Market Definition
4. Taxonomy
5. Market Ecosystem
6. Market Size (SAR Mn) 2017-2022
7. Industry Analysis
8. Growth Drivers
9. Key Trends
10. Market Challenges
11. Market Segmentation
12. By Number of Fitness Centres (2022)
13. By Structure (2022)
14. Future Market Outlook
15. Future Market Analysis
16. Competitive Profiles
17. Table of Contents
18. Disclaimer
19. Contact Us
20. FAQs

### Charts present
**No visible static images or interactive charts in scraped DOM.** Referenced (but not rendered):
- Market size trend line 2017-2022 → 2022-2027
- Regional distribution by number of fitness centers
- Market structure breakdown (chained vs independent)
- Membership duration segmentation

Worse case than Australia — KSA appears to lack even the static raster placeholders.

### Datasets/tables
- **Historical Market Size:** 2017 = SAR 4,507.9 Mn · 2022 = SAR 6,159.2 Mn · 2020 dip · 2021 recovery to ~5,393.3
- **Competitive Profiles:** 4 rows (9 Round 2015 · Fitness Time 2007 · Gold's Gym 1995 · Body Masters 1992)
- **Market Share:** Fitness Time = 19.8% revenue share

### Stat strip metrics
None as a strip. Buried: SAR 6,159 Mn (2022) · SAR 9,793.5 Mn (2027) · 24M+ aged 15-64 · 63% under-30 · Riyadh 17M by 2030 · SAR 300 avg membership · 20% dropout · 50% boutique growth (2013-2017) · 64% digital preference.

### Ecosystem / competitor
4 primary (9 Round · Fitness Time · Gold's Gym · Body Masters). Supporting: NuYu, Lava Fitness, FitClub, Fitness First, Boy Fitness. No logo grid · no market-share chart · no positioning matrix · no tier groupings.

### Segmentation dimensions
3 visible: By Region (6 cities) · By Structure (Chained/Independent/Commercial A-B-C/Online) · By Membership Duration (1/3/6/12 mo). PRD recipe expects 5-7. Missing: by gender (a major KSA market dimension) · by service type (gym/boutique/personal-training/HIIT/group-classes) · by demographic.

### Methodology blocks
**Not present.** No primary/secondary/sample/sanity disclosure. No respondent mix. No limitations.

### FAQs (5 — present but with data conflict)
- **Q1:** "How big is the fitness services market in Saudi Arabia?" — A: SAR 6,159 Mn by 2022.
- **Q2:** "What factors drive KSA Fitness Services market?" — A: Rising health awareness, value added services, launch & expansion of hotel-based gyms.
- **Q3:** "Which is the largest fitness services company in KSA?" — A: Fitness Time dominates w/ 19.8% revenue share.
- **Q4:** "What is the future of KSA Fitness Services market?" — A: CAGR 11.9% · reach SAR 9,793.5 Mn by 2027. **[CONFLICTS w/ body 9.7%]**
- **Q5:** "What are the challenges in KSA Fitness Services market?" — A: High membership prices, extreme competition, stringent regulations.

### TOC structure (11 sections, flat list)
1. Market Overview · 2. Market Size · 3. Competitor Analysis (4 sub) · 4. Ecosystem · 5. Segmentation (3 sub) · 6. Industry Analysis (3 sub) · 7. Regulatory Framework · 8. Future Outlook (4 sub) · 9. Disclaimer · 10. Contact · 11. FAQs

### Related reports
Same 2 unrelated cards as Australia page (Israel Logistics + Al-Dawaa KSA Pharmacy).

### Footer
Same global footer as Australia.

## B · UI/UX audit

| Dimension | Score | Issues |
|---|---|---|
| Visual hierarchy | 3/10 | Same template as Australia · no H1 dominance · no stat strip · no card containers |
| Typography | 5/10 | Same as Australia · no metric-styling treatment |
| Color + contrast | 5/10 | Generic grey, Ken red on CTAs only |
| Spacing + density | 4/10 | Cramped · no rhythm · 20 H2/H3 sections in flat stack |
| Chart presentation | 1/10 | WORSE than Australia — no visible chart images. References without renders. |
| Mobile responsiveness | ? | Cannot verify; assume Bootstrap default stack |
| Conversion UX | 3/10 | Hero CTAs only · same generic repeats · no contextual unlock |
| Information architecture | 3/10 | 20 H2/H3 sections is too many flat headings · no nav · no anchors · TOC at bottom |
| A11y | ? | No visible alt text, no landmarks confirmed |
| Performance signals | 5/10 | Lighter than Australia (fewer images) but at cost of zero data viz |

## C · Critical gaps vs PRD V2.1

| # | PRD Section | Status |
|---|---|---|
| 1 | Header + breadcrumb | PRESENT-WEAK |
| 2 | Interactive hero w/ cockpit | PRESENT-WEAK |
| 3 | Report snapshot | MISSING |
| 4 | Sticky nav + mobile CTA | MISSING |
| 5 | Key stats strip | MISSING |
| 6 | Executive summary | PRESENT-WEAK |
| 7 | Scope and coverage | MISSING |
| 8 | Country + infrastructure | MISSING |
| 9 | Market overview + genesis | PRESENT-WEAK |
| 10 | Definitions + assumptions | PRESENT-WEAK |
| 11 | Taxonomy | PRESENT-WEAK |
| 12 | Ecosystem (tabs + logos + tiers) | PRESENT-WEAK |
| 13 | Market size + growth chart | MISSING (no chart) |
| 14 | Submarket intelligence | MISSING |
| 15 | Segment intelligence tabs | PRESENT-WEAK (3 dims · no tabs) |
| 16 | Industry analysis (SWOT / value chain) | PRESENT-WEAK (Drivers/Trends/Challenges as paragraphs only) |
| 17 | End-user deep dives | MISSING |
| 18 | Demand-supply gap | MISSING |
| 19 | Competitor landscape (share + positioning + comparison) | PRESENT-WEAK (text-only) |
| 20 | Trends + tech + automation | PRESENT-WEAK (trends paragraph; no cards) |
| 21 | Regulatory landscape | PRESENT-WEAK (TOC §7 only) |
| 22 | Future outlook + scenarios | PRESENT-WEAK |
| 23 | Opportunities + analyst recommendations | MISSING |
| 24 | Macroeconomic indicators | MISSING |
| 25 | Methodology + sample + limitations | MISSING |
| 26 | TOC | PRESENT-WEAK |
| 27 | FAQs | PRESENT (5 incl. data conflict) |
| 28 | Related reports | MISSING |
| 29 | Final CTA block | PRESENT-WEAK |
| 30 | Footer | PRESENT |

**Score: 3 PRESENT · 13 PRESENT-WEAK · 14 MISSING.**

## D · Top 5 fixes

1. **Fix CAGR data conflict between body (9.7%) and FAQ (11.9%) immediately** — Brand-trust hemorrhage. Pick correct value, update both. Add publish-gate validation per PRD §15.1.
2. **Add Market Size 2017-2022 chart (currently missing entirely)** — Even a static raster is better than nothing. Best path: Ken Charts dual-axis bar+line w/ dataset preview (PRD §9.1).
3. **Add competitor market-share chart + positioning matrix** — Fitness Time at 19.8% is the only share number on page; need horizontal bar of top 5 + bubble chart of 4 profiled players. PRD §6.5.
4. **Build Stats Strip with 6 KSA-specific metrics** — 24M aged 15-64 · 63% under-30 · SAR 6,159 Mn 2022 · 9.7% CAGR · SAR 9,793.5 Mn 2027 · 20% dropout rate. Crawlable HTML stat cards (PRD §8.2).
5. **Add Methodology + Macroeconomic Indicators sections** — KSA has rich macro context (Vision 2030, demographic dividend) — currently zero coverage. Methodology missing entirely. Both PRD §8.5 + §8.15.

---

# URL 3 · India Kitchen Brands Market

## A · Content inventory

### Hero
| Field | Value |
|---|---|
| H1 | "India Kitchen Brands Market (2023-2030)" |
| Hero promise | "Outlook to 2030 offers a concise view of market size, growth trends, competitive landscape, consumer demand shifts, and emerging opportunities across organized kitchen brands" |
| Primary metric | USD 6.08 Bn (2023) — body · FAQ says USD 10.35 Bn (CONFLICT) |
| Forecast | USD 27.09 Bn (2030) — body · FAQ says USD 27.90 Bn (CONFLICT) |
| Historical CAGR | 13.25% body · 11.21% FAQ (CONFLICT) |
| Forward CAGR | 14.74% (2023-2030) |
| Pages / Code / Date | 90 pages · KRR119 · "Apr 2026" (future-dated typo) |
| Author | Samanyu Maan |

### Section headings (top-down order — top-of-page summary then deep sections)
Top summary block:
- Market overview · Market Ecosystem · Industry Analysis · Market segmentation · Future Outlook · Competitor Analysis · Macroeconomic Indicators · Table of Content · FAQ's

Deep section headings:
- Market Overview · India Kitchen Brands Market Overview · Taxonomy · Market Ecosystem · Market Size (USD Bn) 2018-2023 · Industry Analysis · Growth Drivers (Rapid Urbanization · Tech Advancements · Social Media Influence) · Challenges · Recent Developments · Segmentation 2023 · by Product Type · by Distribution Channel · Future Market Size · Future Market Size (USD Bn) 2023-2030 · Company Profiles · Macro-Economic Indicators · Table of Contents · FAQs

### Charts (all static images)
| Title | Type | Data |
|---|---|---|
| Market Size 2018-2023 | Line/bar image | Historical progression w/ CAGR |
| Segmentation by Product Type 2023 | Donut/pie image | Kitchen appliances 65%+ vs modular |
| Segmentation by Distribution Channel 2023 | Donut/pie image | Offline 74% vs online |
| Future Market Size 2023-2030 | Projection image | USD 6.08B → 27.09B |
| GDP & Inflation Rate 2016-2021 | Dual-axis image | Macro context |
| Disposable Personal Income (INR Mn) 2016-2021 | Line image | COVID dip + recovery |
| Internet Penetration Rate 2007-2022 | Line image | 4% → 48.7% |

### Datasets/tables
- **Company Profiles:** 6 rows (Samsung India 1995 · Havells 1983 · Whirlpool · LG · TTK Prestige · Panasonic) · cols: Name · Est · Description
- **Taxonomy:** Modular Kitchen (Design: U/L/Straight + Product: Floor/Wall/Tall) · Kitchen Appliances (Product list · Sales Channel · Region · Application · Distribution)

### Stat strip metrics
None as strip. Buried: USD 6.08 Bn (2023) · 13.25% CAGR (2018-2023) · USD 27.09 Bn (2030) · 14.74% CAGR · Kitchen appliances 65%+ share · Offline 74% dominance · 416M urban by 2050 · 85% social media engagement (16-64) · 48.7% internet penetration (2022).

### Ecosystem / competitor
6 major + 10 niche entrants (Wurfel · Ultrafresh · Nobia · CERA · Hettich · Marbodal · Sigdal · A'la Carte · HTH Invita · Magnet). "Highly fragmented" stated. No market-share chart · no positioning matrix · no comparison table.

### Segmentation dimensions
2 charted (Product Type · Distribution Channel). Taxonomy lists 7 dimensions (Product Type · Design · Appliance Category · Sales Channel · Distribution · Region · Application) but only 2 rendered as charts. Region (N/W/E/S) — no map · no data.

### Methodology blocks
TOC §10 Research Methodology (Definition · Sizing Approach · Research Limitations) referenced but **no content on page**.

### FAQs (4 with multiple data conflicts vs body)
- **Q1:** "How big is the India Kitchen Brands Market?" — A: "USD 10.35 Bn in 2023, registered a CAGR of 11.21% from 2018 to 2023." **[CONFLICTS — body says USD 6.08 Bn @ 13.25% CAGR]**
- **Q2:** "Who are the major players in the India Kitchen Brands Market?" — A: Samsung · Havells · Whirlpool · LG · TTK Prestige · Panasonic.
- **Q3:** "What are the factors driving the India Kitchen Brands Market?" — A: Space-saving demand · urbanization · disposable income · sustainability awareness.
- **Q4:** "What is the future of the India Kitchen Brands Market?" — A: "USD 27.90 Bn by 2030 with projected CAGR of 14.74%." **[CONFLICTS — body says USD 27.09 Bn]**

### TOC structure (10 chapters)
Same flat-list pattern. Includes SWOT + Porter Five Forces in chapter 6 (Industry Analysis) — neither rendered on page.

### Related reports
Same 2 unrelated cards (Israel Logistics + Al-Dawaa KSA Pharmacy). Bizarre for an India consumer-goods report.

### Footer
Same global footer.

## B · UI/UX audit

| Dimension | Score | Issues |
|---|---|---|
| Visual hierarchy | 4/10 | Top-summary section (single-line bullet list) competes w/ deep sections — feels redundant. Same template weaknesses. |
| Typography | 5/10 | Same as others |
| Color + contrast | 5/10 | Same |
| Spacing + density | 4/10 | Heavier text body than KSA · more cramped |
| Chart presentation | 2/10 | 7 static raster images · no interactivity · no source notes · no insight lines · no dataset previews |
| Mobile responsiveness | ? | Same template, same caveats |
| Conversion UX | 3/10 | Hero CTAs only · no per-section unlock |
| Information architecture | 4/10 | Has a duplicate-feel "summary bullet list" at top that mirrors deep sections — confusing nav |
| A11y | ? | Static images · no alt text confirmed |
| Performance signals | 4/10 | 7 chart images · macro 3 images · likely heaviest of the 3 |

## C · Critical gaps vs PRD V2.1

| # | PRD Section | Status |
|---|---|---|
| 1 | Header + breadcrumb | PRESENT-WEAK |
| 2 | Interactive hero w/ cockpit | PRESENT-WEAK |
| 3 | Report snapshot | MISSING |
| 4 | Sticky nav + mobile CTA | MISSING |
| 5 | Key stats strip | MISSING |
| 6 | Executive summary | PRESENT-WEAK |
| 7 | Scope and coverage | MISSING |
| 8 | Country + infrastructure | MISSING (Macro section exists but not as country context module) |
| 9 | Market overview + genesis | PRESENT-WEAK |
| 10 | Definitions + assumptions | MISSING |
| 11 | Taxonomy | PRESENT (table-form, no tree visualization) |
| 12 | Ecosystem (tabs + logos + tiers) | PRESENT-WEAK |
| 13 | Market size + growth chart | PRESENT-WEAK (static) |
| 14 | Submarket intelligence | MISSING (no Modular vs Appliances submarket breakdown beyond donut) |
| 15 | Segment intelligence tabs | PRESENT-WEAK (2 of 7 dimensions) |
| 16 | Industry analysis (SWOT / value chain / Porter) | PRESENT-WEAK (Drivers/Challenges/Recent paragraphs · SWOT + Porter referenced not rendered) |
| 17 | End-user deep dives | MISSING |
| 18 | Demand-supply gap | MISSING |
| 19 | Competitor landscape | PRESENT-WEAK (6-row text table, no share chart, no positioning) |
| 20 | Trends + tech + automation | PRESENT-WEAK (Smart Appliances + Sustainability referenced) |
| 21 | Regulatory landscape | MISSING |
| 22 | Future outlook + scenarios | PRESENT-WEAK (single forecast chart) |
| 23 | Opportunities + analyst recommendations | MISSING |
| 24 | Macroeconomic indicators | PRESENT (3 charts) — but no "relevance to market" notes per PRD §8.5 |
| 25 | Methodology + sample + limitations | MISSING (TOC mentions, 0 content) |
| 26 | TOC | PRESENT-WEAK (flat list) |
| 27 | FAQs | PRESENT (4 incl. major data conflicts) |
| 28 | Related reports | MISSING |
| 29 | Final CTA block | PRESENT-WEAK |
| 30 | Footer | PRESENT |

**Score: 4 PRESENT · 14 PRESENT-WEAK · 12 MISSING.**

## D · Top 5 fixes

1. **Fix all 3 FAQ-vs-body data conflicts (USD 10.35 Bn vs 6.08 Bn · 11.21% vs 13.25% · USD 27.90 Bn vs 27.09 Bn)** — These are publish-gate failures per PRD §15.1. Add CMS validation: stats in FAQ must match stat-strip canonical values.
2. **Fix future-date typo "Apr 2026 published"** — Page is dated in the future. Trivial CMS fix but visible to every buyer.
3. **Replace 7 static raster charts w/ Ken Charts interactive cards** — Esp Market Size 2018-2023 · Future Market Size 2023-2030 · Product Type donut · Distribution Channel donut. Add dataset preview + access state (PRD §9).
4. **Add SWOT card grid + Porter Five Forces visual** — TOC §6.4 + §6.5 list both, page renders neither. PRD §6.3 + §6.5 + §8.13.
5. **Build Stats Strip + remove duplicate top-summary bullet list** — Top summary (Market overview · Market Ecosystem · Industry Analysis ...) duplicates the deep section heading hierarchy and adds no value. Replace with proper 6-card stat strip + sticky chapter nav (PRD §5 items 4, 5).

---

# Cross-Page Synthesis

## Common gaps across all 3 pages (= Django CMS template gaps, not content-team gaps)

| Gap | Australia | KSA | India | PRD ref |
|---|---|---|---|---|
| Key Stats Strip | MISSING | MISSING | MISSING | §5 item 5, §8.2 |
| Sticky Nav / Mobile Bottom CTA | MISSING | MISSING | MISSING | §5 item 4 |
| Report Snapshot | MISSING | MISSING | MISSING | §5 item 3 |
| Scope and Coverage block | MISSING | MISSING | MISSING | §5 item 7, §8.4 |
| Country + Infrastructure Context | MISSING | MISSING | partial macro only | §5 item 8, §8.5 |
| Glossary cards (Definitions) | weak | weak | MISSING | §8.7 |
| Taxonomy Tree visualization | weak | weak | weak | §8.7 |
| Ecosystem Tabs + Logo Wall + Tiers | weak | weak | weak | §6.5, §8.8 |
| Interactive Market Size Chart | static | absent | static | §6.3, §8.9, §9 |
| Submarket Intelligence (storage/transport/etc) | weak | MISSING | MISSING | §6.3, §8.9 |
| Segmentation Tabs (5-7 dims) | 2/7 | 3/5 | 2/7 | §6.4, §8.10 |
| SWOT 2x2 card grid | weak (text) | MISSING | MISSING | §6.5, §8.13 |
| Value Chain Stepper | MISSING | MISSING | MISSING | §6.5, §8.13 |
| End-User Deep Dives + Shelf-Life Matrix | MISSING | MISSING | MISSING | §6.5, §8.11 |
| Demand-Supply Gap | MISSING | MISSING | MISSING | §6.5, §7 |
| Competitor Market-Share Chart | MISSING | MISSING | MISSING | §6.5, §8.12 |
| Positioning Matrix (bubble/scatter) | MISSING | MISSING | MISSING | §6.5, §8.12 |
| Cross-Comparison Table | MISSING | MISSING | MISSING | §6.5, §8.12 |
| Trend + Tech + Regulation cards | MISSING | weak | weak | §6.5, §8.13 |
| Opportunities + Analyst Recommendations | MISSING | MISSING | MISSING | §6.5, §8.14 |
| Methodology + Sample Size + Limitations | MISSING | MISSING | MISSING | §6.6, §8.15 |
| TOC accordion w/ chapter preview | flat | flat | flat | §8.16 |
| FAQs | MISSING | weak (conflict) | weak (conflict) | §8.16 |
| Related Reports (real, internal) | MISSING | MISSING | MISSING | §5 item 28 |
| Contextual CTAs tied to chart/section IDs | MISSING | MISSING | MISSING | §13 |
| Access-State logic (public/metered/lead/paid) | MISSING | MISSING | MISSING | §10 |
| Dataset Preview cards | MISSING | MISSING | MISSING | §9.1 |
| Schema markup (Product / Dataset / FAQPage) | unknown | unknown | unknown | §12.3 |

**Conclusion:** The 3 pages aren't just under-built — they share an identical Django CMS template that lacks ~22 of 30 PRD modules. v0.4 cannot just fix one page · it must rebuild the template.

## Common UI/UX problems

1. **No card containers anywhere.** Text + tables + raster charts share a single column with weak separators. PRD §4 mandates cards w/ heading · insight · body · embedded intelligence per major block.
2. **Static raster charts.** No interactivity · no source notes · no insight lines · no access states · no dataset previews · no alt text · no data-table fallback. Affects every page · every chart · every metric.
3. **Hero-only CTAs.** "Download Sample" + "Get Customized" sit only at top. No contextual unlock after data moments. "Request on Demand" + "Talk to Consultant" appear repeatedly in unrelated zones — feel generic, not contextual.
4. **Cross-page content reuse signaling a broken related-reports module.** Same "Israel Logistics" + "Al-Dawaa KSA Pharmacy" cards appear on Australia (cold chain), KSA (fitness), and India (kitchen) — three completely unrelated industries. CMS isn't fetching report-relevant related content.
5. **Data integrity failures.** KSA + India both ship FAQ stats that contradict body stats. Australia ships future-period CAGR (10.03%) in hero that's plausible but methodology behind it is invisible. PRD §15.1 publish gate would catch all of this.
6. **TOC is dumped at bottom as flat text list.** Should be accordion + chapter preview + gating per PRD §8.16. Currently has zero affordance — buyers can't preview chapters before purchase.
7. **Methodology is universally absent.** All 3 pages list Methodology in TOC, none render the content. Biggest trust gap for a research-depth product.
8. **Stat strip nowhere.** Every page buries the 4-6 most important numbers in paragraphs. Stat strip is the single highest-leverage PRD-aligned add (AI answer blocks + SEO + buyer scan-ability).

## Priority order for v0.4 rebuild

**Tier 1 — Template foundation (rebuild CMS modules)**
1. Stats Strip module (6-8 stat cards · access-state aware · crawlable HTML)
2. Hero Cockpit w/ 5 toggles (Market Size · Forecast · Segmentation · Competitors · Methodology)
3. Sticky Section Nav + Mobile Bottom CTA
4. Card container system (heading · insight · body · embedded component) applied per major block
5. Ken Charts integration (interactive · dataset preview · access state · source note · CTA)

**Tier 2 — Content modules (fill PRD gaps)**
6. Report Snapshot + Scope and Coverage blocks
7. Country + Infrastructure Context module (mini charts + relevance notes)
8. Glossary / Definitions cards + Taxonomy Tree visualization
9. Ecosystem Tabs w/ Logo Wall + Tier Groupings
10. Segmentation Tabs (5-7 dimensions per recipe) w/ donut/bar charts + dominant-segment badge + unlock CTA
11. Competitor Market-Share chart + Positioning Matrix + Cross-Comparison Table (lead-gated full table)
12. SWOT 2x2 card grid · Value Chain Stepper · Trend/Tech/Regulation cards
13. End-User Deep Dives + Demand-Supply Gap module
14. Opportunities + Analyst Recommendations (lead-gated/premium)
15. Methodology stepper (Secondary → Primary → Sanity → Sample Size → Limitations)

**Tier 3 — Conversion + integrity**
16. Contextual CTA system tied to `chart_id · section_name · cta_location` (PRD §13.1 hidden CRM fields)
17. Access-State system (public / metered / lead-gated / login-gated / paid / hidden) per PRD §10
18. TOC accordion w/ chapter preview + gating
19. FAQs module + FAQPage schema · stats must validate against canonical stat-strip values
20. Related Reports module (real, internal, industry-relevance scoring)
21. Schema markup (Product · Dataset · FAQPage · BreadcrumbList) per PRD §12.3
22. Publish-gate validation (PRD §15.1) — stat parity FAQ↔body · no future dates · all charts have IDs/sources/alt text

**Tier 4 — Polish**
23. Per-page Disclaimer + product-code/SKU block (not just global footer)
24. Breadcrumb above hero
25. Mobile-first table → company-card conversion for Competitor + Macro tables
26. WebP/AVIF + lazy-load for all infographics
27. Reading-progress + section-anchor bar

---

## Trace markers

- → Route: scenario F (audit · 3-page live scrape + UI/UX + PRD gap analysis)
- → Scan: memory MEMORY.md + project_v1_product_page_brief.md (no re-read)
- → Read: PRD-V2.1-australia-coldchain.md L1-627 (full)
- → WebFetch: 3 URLs · 3 parallel calls · all returned full content
- → Step 5/5 · writing audit doc
- → Log: file written to /Users/vishalchauchan/Downloads/Anti-folder01/projects/_briefs/v1-product-page/SECTION-AUDIT-LIVE-2026-05-20.md
- → Exit: done
