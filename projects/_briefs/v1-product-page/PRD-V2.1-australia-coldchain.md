# Ken Research V1 Product Page Rebuild PRD - Expanded V2.1

**Expanded V2.1 with Australia Cold Chain Market as Master Example**

Text-led research intelligence page with interactive charts, datasets, infographics, info-wall/paywall logic, Django CMS modularity, and SEO/GEO/GXO architecture

**Source:** `Ken_Research_V1_Product_Page_Rebuild_PRD_V2_Expanded_With_Australia_Example.pdf` (attached to Aura conversation 2026-05-18 by design@kenresearch.com)
**Canonical for:** v0.2 build of `projects/v1-product-page/`
**Companion:** `PRD-V2-design-direction.md` (per-module PRD detail · 54 sections)

---

## Core correction

The rebuilt page must remain text-heavy because Ken Research sells research depth. The issue is not text volume. The issue is weak UX/UI flexibility, rigid Django CMS structure, insufficient chart interactivity, weak data packaging, and missing access-control logic for premium stats, charts, and datasets.

| Document field | Detail |
|---|---|
| Prepared for | Ken Research product, marketing, SEO, technology, content, design, and CMS teams |
| Prototype report | Australia Cold Chain Market (2022-2027) |
| Reference design direction | V01 Lovable-style container/card design system + current V1 information architecture |
| Visualization standard | @ken-research/charts / Ken Charts Storybook component system |
| CMS context | Django CMS with current rigidity; rebuild requires modular report page builder |
| Primary outcome | A scalable research page operating system for thousands of product pages |

---

## Table of Contents

1. Executive Summary
2. Correct Product Understanding
3. Strategic Objectives and Success Metrics
4. Design System and Experience Principles
5. Master Page Architecture
6. Australia Cold Chain Market: Master Example
7. No-Miss Coverage Matrix
8. Detailed Module Requirements
9. Chart Library and Dataset System
10. Info-Wall, Metering, Lead-Wall, and Paywall
11. Django CMS Architecture
12. SEO, GEO, GXO, and Schema System
13. Conversion, Forms, CRM, and Analytics
14. Technical and Performance Requirements
15. QA, Acceptance Criteria, and Rollout Roadmap
16. Appendix: Field Dictionaries and Example Configurations

---

## 1. Executive Summary

Ken Research requires a rebuild of its V1 report product pages into a text-led, data-rich, modular research intelligence experience. The redesigned page should not become a lightweight landing page. It should preserve deep research content while presenting it through a premium container/card-based UI, interactive charts, structured datasets, infographics, contextual CTAs, and controlled-access logic.

The Australia Cold Chain Market report should be used as the master prototype because it contains almost every module a complex market intelligence product page may require: market highlights, definitions, taxonomy, ecosystem maps, market sizing, cold storage and cold transport submarkets, segmentation, competitor intelligence, growth drivers, challenges, value chain, trends, technologies, regulation, forecasts, macroeconomic indicators, methodology, FAQs, and table of contents.

**Decision:** Use Australia Cold Chain Market as the worst-case master template. If the system handles this report cleanly, lighter reports will render safely through plug-in/plug-out module logic.

| Outcome area | What the rebuild must deliver |
|---|---|
| Research depth | Long-form text remains intact but is split into readable sections with insight lines, stat cards, charts, tables, datasets, and infographics. |
| Product value | Every premium chart, forecast, segmentation, or competitor table is presented as an intelligence asset, not a static CMS block. |
| CMS scalability | Django CMS must support modular sections, repeaters, chart datasets, access controls, preview states, and auto-hide logic for missing sections. |
| AI and SEO ranking | Pages must expose market size, CAGR, forecast, segments, players, methodology, and FAQs as crawlable HTML and structured schema. |
| Monetization | Public preview, metered access, lead-gated unlock, login-gated preview, and paid access must work at chart/stat/dataset level. |
| Conversion | CTAs should appear contextually after high-intent data moments, not only in the hero. |

---

## 2. Correct Product Understanding

### 2.1 What is being rebuilt

The page is a hybrid of a report product page, long-form market intelligence page, interactive data preview, SEO landing page, AI-answer source, and lead-generation system. The product is not simply a page redesign; it is a research page operating system.

### 2.2 What should not be removed

- Long research text
- Definitions and scope boundaries
- Market overview and genesis
- Market ecosystem and value chain
- Historical and forecast data
- Submarket analysis
- Segmentation and competitor detail
- Methodology and limitations
- Table of contents and FAQs

### 2.3 What must be improved

- Text should be structured through executive insight lines, short summaries, collapsible detail, and evidence blocks.
- Charts should become interactive using Ken Charts, with tooltips, filters, dataset previews, and export/lock states.
- Infographics should sit inside professional cards with captions, summaries, and structured text equivalents.
- Every module must support public, metered, lead-gated, login-gated, paid, and hidden states.
- Django CMS must become module-driven rather than fixed-field driven.
- SEO/GEO/GXO must be coded at title, heading, schema, FAQ, dataset, and answer-block level.

---

## 3. Strategic Objectives and Success Metrics

| Objective | KPI | Target |
|---|---|---|
| Qualified lead growth | Sample downloads, analyst call requests, customization requests | +25% to +50% on pilot URLs |
| Research engagement | Scroll depth, chart interaction, dataset preview clicks, TOC expansion | +30% engagement on data modules |
| Ranking improvement | Google organic impressions, AI answer extraction, primary keyword movement | +20% to +40% impressions after rollout |
| CMS efficiency | Publishing time, QA rejection rate, broken-section cases | 30% faster publishing and near-zero broken sections |
| Data monetization | Info-wall triggers, unlock-form completion, paid inquiry clicks | Track unlock rate by chart/stat/module |
| Performance | Core Web Vitals | LCP under 2.5s, CLS under 0.1, INP under 200ms |

---

## 4. Design System and Experience Principles

**Design thesis:** Use the V01 reference direction for containers, cards, spacing, and premium interface feel, but adapt it for serious research consumption, not a light SaaS landing page.

- Use a text-first data page model: text explains, stats prove, charts engage, datasets build trust, infographics simplify, methodology validates, CTAs convert.
- Every major content block must live inside a card/container with a clear heading, executive insight, content body, and embedded intelligence component.
- The page should use white/off-white backgrounds, charcoal text, thin borders, subtle shadows, Ken Red CTAs, muted chart colors, and structured spacing.
- Avoid generic blog formatting, plain CMS dumps, inconsistent chart embeds, overdesigned gradients, and uncaptioned images.

| Design token | Requirement |
|---|---|
| Container width | 1180-1280px max on desktop; comfortable margins on tablet/mobile |
| Grid | 12-column desktop; main content plus optional sticky right rail; single-column mobile |
| Cards | Low-radius cards, thin border, soft shadow, consistent vertical rhythm |
| Typography | One H1, clear H2/H3 hierarchy, readable body text, strong metric styling |
| CTAs | Ken Red primary; neutral secondary; context-aware CTA placement |
| Charts | Inside chart cards with title, insight, controls, dataset preview, source note, and access state |
| Infographics | Card-framed, captioned, with text equivalent for SEO and accessibility |

---

## 5. Master Page Architecture

1. Global header and breadcrumb
2. Interactive hero section with market intelligence cockpit
3. Report intelligence snapshot
4. Sticky navigation and mobile bottom CTA
5. Key stats strip
6. Executive summary
7. Report scope and coverage
8. Country and infrastructure context
9. Market overview and genesis
10. Market definitions and assumptions
11. Taxonomy
12. Market ecosystem
13. Market size and growth
14. Submarket intelligence: storage, transport, and other report-specific submarkets
15. Segment intelligence tabs
16. Industry analysis: SWOT, drivers, challenges, value chain, seasonality, business cycle
17. End-user analysis and deep dives
18. Demand-supply gap module
19. Competitor landscape and positioning
20. Trends, existing technologies, automation, emerging technologies
21. Regulatory landscape
22. Future outlook and forecast scenarios
23. Market opportunities and analyst recommendations
24. Macroeconomic indicators
25. Research methodology, sample size, limitations, assumptions, and disclaimer
26. Table of contents
27. FAQs
28. Related reports
29. Final CTA block
30. Footer

**Expanded architecture note:** Compared with the earlier PRD, this version explicitly adds country/infrastructure context, business cycle/genesis, seasonality, demand-supply gaps, end-user deep dives, market opportunities, analyst recommendations, sample-size/limitations, and disclaimer handling so the Australia Cold Chain report is fully covered.

---

## 6. Australia Cold Chain Market: Master Example

### 6.1 Example hero

| Hero field | Example value |
|---|---|
| H1 | Australia Cold Chain Market Outlook (2022-2027) |
| Hero promise | Market size, segmentation, competitor landscape, growth drivers, cold storage and cold transport intelligence, and forecast outlook for Australia. |
| Primary metric | AUD 6,547.8 Mn market revenue in 2022 |
| Forecast metric | AUD 10,705.0 Mn by 2027 |
| CAGR | 10.03% during 2022-2027 |
| Segment tags | Cold Storage, Cold Transport, Meat and Seafood, Fruits and Vegetables, Pharmaceuticals, Confectionery |
| Hero interaction | Toggle: Market Size \| Forecast \| Segmentation \| Competitors \| Methodology |
| Hero CTAs | Download Sample Report, Talk to Analyst, Get Customized Report, Buy Now (secondary) |

### 6.2 Example key stats strip

| Metric card | Value | Access rule | UX treatment |
|---|---|---|---|
| Australia Cold Chain Market Size | AUD 6,547.8 Mn, 2022 | Public | Hero card + market-size answer block |
| Forecast Market Size | AUD 10,705.0 Mn, 2027 | Public headline; full forecast dataset paid/lead-gated | Forecast card + locked forecast data table |
| Forecast CAGR | 10.03%, 2022-2027 | Public | Metric card with tooltip |
| Cold Storage Market Size | AUD 2,647.8 Mn, 2022 | Public headline; detailed submarket data metered | Submarket chart card |
| Cold Transport Market Size | AUD 3,900.0 Mn, 2022 | Public headline; detailed data metered | Submarket chart card |
| Cold Chain Players | 200-250 cold transportation and storage players | Public | Ecosystem insight card |

### 6.3 Example chart and dataset modules

| Chart module | Source content example | Recommended chart type | Dataset preview |
|---|---|---|---|
| Historical market size | 2017-2022 market size and annual growth rate | Dual-axis bar + line or area + line | 3 public rows, full dataset lead-gated |
| Cold storage market size | 2017-2022 cold storage revenue and growth rate | Dual-axis chart | Public headline, metered dataset |
| Pallet growth | Number of pallets from 2017-2022 | Line or bar chart | Lead-gated dataset |
| Price per pallet/week | AUD 11.0 in 2017 to AUD 11.6 in 2022 | Line chart | Metered |
| Occupancy rate | 88.5% in 2017 to 93.0% in 2022 | Line chart | Metered |
| Cold transport market size | 2017-2022 revenue and growth rate | Dual-axis chart | Public headline, metered dataset |
| Future market size | 2022-2027F revenue and growth rate | Forecast bar + dotted line | Forecast assumptions paid/lead-gated |

### 6.4 Example segmentation intelligence

| Segmentation tab | Example data from report | UI module | Access rule |
|---|---|---|---|
| By End User | Meat and Seafood 43.8% AUD 2,867.1 Mn; Fruits/Veg 23.0% AUD 1,506.7 Mn; Pharma 17.0% AUD 1,112.4 Mn; Confectionery AUD 641.5 Mn; Others AUD 420.1 Mn | Donut/bar chart + dataset table + dominant segment badge | Headline public; full rows lead-gated |
| By Market Type | Cold Transport AUD 3,900.0 Mn; Cold Storage AUD 2,647.8 Mn | Stacked bar / comparative chart | Public headline; dataset metered |
| By Temperature Range | Frozen 45%, Chillers 40%, Ambient 15% | Donut chart + explanatory card | Public |
| By Region | Sydney 35.0%, Melbourne 27.5%, Brisbane 15.5%, Others 22.0% | Map + table | Metered |
| By Reefer Truck Type | 1-10 tons 59.6%, 10-20 tons 14.5%, 20+ tons 25.9% | Horizontal bar + vehicle cards | Metered |
| By Transport Mode | Land 57%, Sea 37%, Air 6% | Donut chart | Public headline; deeper data lead-gated |
| By Domestic/International | Domestic 56.9%, International 43.1% | Split card chart | Metered |

### 6.5 Example ecosystem and competitor intelligence

| Source asset | Required PRD treatment |
|---|---|
| Cold chain ecosystem logo wall | Interactive ecosystem module with tabs: Cold Chain, Cold Storage, Cold Transport, Associations and Certifications. Logos normalized. Text summary made crawlable. |
| Cold storage ecosystem by pallet capacity | Structured player tiers: >200,000 pallets, >15,000 pallets, <15,000 pallets. Use tier cards + logo grid. |
| Cold transport ecosystem | Logo strip/grid plus short explanation of transport ecosystem role. |
| Competitor timeline | Timeline component for major players and establishment/history. |
| Market share by pallets | Interactive horizontal bar chart. Lineage 12.5%, Americold 4.8%, NewCold 4.8%, Oxford Cold Storage 3.5%, Linfox 0.8%, Laverton 0.6%, Karras 0.5%, Auscold 0.5%, Swire 0.5%, P.Pullar 0.5%, Freezex 0.4%, Austco Polar 0.4%, Altona 0.4%, Others 66.9% |
| Cross comparison table | Responsive competitor cards on mobile; full table lead-gated or paid. |
| Positioning matrix | Bubble/scatter chart using total pallet positions and occupancy rate. |

### 6.6 Example methodology module

| Methodology source item | UI and CMS requirement |
|---|---|
| Secondary research | Methodology step card listing source types: company reports, magazines, journals, articles/company profiles, online articles, official institutions (Dept of Agriculture Australia · IMF · World Bank · NMIS). |
| Primary research | Step card for CATIs/interviews with 30+ major cold chain companies (Lineage · Americold · NewCold · Laverton · Karras · Auscold · P.Pullar · Oxford Cold Storage · Freezex). |
| Sanity checking | Trust card explaining validation of cold storage units, pallets, trading, production, interviews and target audience. |
| Sample size inclusion | Cold Storage Facilities 50-60 respondents; Food/Restaurant/Grocery 20-30 respondents; Industry Experts 15-20. Mix: C-Level 24%, Director/VP 8%, KAM/BD 60%, Others 8%. |
| Limitations | Expandable limitations card; visible summary, detailed limitations lead-gated. |
| Future conclusion | Forecast methodology: regression + moving average + subjective judgment + primary research + poll opinion. SPSS results rejected (false COVID signal). |

---

## 7. No-Miss Coverage Matrix

This matrix is the guardrail that ensures the PRD covers every content type found in the Australia Cold Chain example and keeps the template scalable for other reports.

| Source report content block | PRD module | UI/CMS treatment | Status |
|---|---|---|---|
| Market highlights | Interactive hero + key stats strip | Public headline stats + chart teaser + CTAs | Covered |
| Market definitions | Definition glossary | Term cards with inclusion/exclusion scope | Covered |
| Fundamental definitions | Glossary extension | Ambient, frozen, chiller, captive/non-captive | Covered |
| Taxonomy | Taxonomy tree | Parent-child market structure, SEO-readable | Covered |
| Market ecosystem | Ecosystem infographic | Tabs, logo grids, structured text, associations | Covered |
| Cold storage ecosystem | Submarket ecosystem tab | Pallet tier groups and player clusters | Covered |
| Cold transport ecosystem | Submarket ecosystem tab | Transport player grid and explanation | Covered |
| Historical market size | Market-size chart card | Interactive chart, dataset preview, access rules | Covered |
| Cold storage market size | Submarket intelligence module | Revenue, growth, pallets, price, occupancy | Covered |
| Cold transport market size | Submarket intelligence module | Revenue, growth, transport modes, truck types | Covered |
| SWOT analysis | SWOT grid | 2x2 strategy card with expansion | Covered |
| Growth drivers | Driver card grid | Impact tags, related segment, data support | Covered |
| Value chain | Value-chain stepper | Procurement, hubs, storage, distribution, margins | Covered |
| Challenges and solutions | Challenge-solution grid | Problem, impact, solution, CTA | Covered |
| Skilled labor/extreme weather | Additional risk cards | Expandable risk module | Covered |
| End-user analysis | End-user intelligence module | Sector cards, technologies, players, ownership/3PL | Covered |
| Revenue by end users | Segmentation tab | Donut/bar chart + dataset preview | Covered |
| Cold storage vs cold transport | Segmentation tab | Comparative chart | Covered |
| Temperature range | Segmentation tab | Frozen/chillers/ambient chart | Covered |
| Region/cities | Geo segmentation module | Map + revenue table + explanation | Covered |
| Reefer truck type | Transport segmentation module | Truck cards and comparative chart | Covered |
| Mode of transport | Transport mode chart | Land/sea/air share | Covered |
| Domestic vs international | Transport split chart | Domestic/international revenue split | Covered |
| Competitor timeline | Timeline component | Major players history and evolution | Covered |
| Market share by pallets | Competitor chart | Interactive share chart | Covered |
| Company comparison | Competitor table/cards | Services, pallets, occupancy, warehouses, tech | Covered |
| Positioning matrix | Bubble/scatter chart | Pallet positions vs occupancy/opportunity area | Covered |
| Recent trends | Trend cards | Traceability, digitalization, e-commerce, sustainability | Covered |
| Emerging technologies | Technology cards | RPA, IoT, blockchain, advanced analytics | Covered |
| Regulatory landscape | Regulation cards | Food standards, cold storage/transport, HACCP, biosecurity, COR | Covered |
| Future outlook | Forecast module | Forecast chart, drivers, assumptions, unlock logic | Covered |
| Future cold storage outlook | Submarket forecast module | Storage forecast chart and assumptions | Covered |
| Future cold transport outlook | Submarket forecast module | Transport forecast chart and assumptions | Covered |
| Macroeconomic indicators | Country/macro module | GDP, inflation, population, imports, exports, seaports | Covered |
| Country overview | Country context module | Country overview, import/export, population, infra relevance | Added |
| Infrastructure analysis | Infrastructure context module | Road, sea, air, rail, ports; market relevance | Added |
| Business cycle/genesis | Market genesis module | Business cycle, genesis, timeline, seasonality | Added |
| Seasonality trends | Seasonality module | Peak/low season and operational implication | Added |
| Existing technologies/automation | Technology adoption module | Current technology vs emerging tech | Added |
| Demand-supply gaps | Gap analysis module | Supply-demand mismatch, shortage, opportunity | Added |
| Temperature-controlled shelf lives | Product handling matrix | Shelf-life table and required technology | Added |
| End-user deep dives | End-user market deep dive module | Meat/seafood, RTE meals, dairy, pharma | Added |
| Market opportunities | Opportunity module | Set-up recommendations, stage of development, whitespaces | Added |
| Analyst recommendations | Recommendation module | Recommendations to government and companies | Added |
| Research methodology | Methodology module | Secondary, primary, sanity checking, modeling | Covered |
| Sample size inclusion | Methodology detail module | Respondent mix and sample logic | Covered |
| Limitations/future conclusion | Limitations module | Transparency and forecast caution | Covered |
| Disclaimer/contact us | Footer/legal/contact module | Legal/footer handling | Added |
| FAQs | FAQ module + FAQ schema | AI-ready Q&A with direct answers | Covered |
| Table of contents | TOC accordion | Chapter/subchapter preview and gating | Covered |

---

## 8. Detailed Module Requirements

### 8.1 Interactive Hero
- Two-column desktop layout with report positioning on left and market intelligence cockpit on right.
- Cockpit toggles: Market Size, Forecast, Segmentation, Competitors, Methodology.
- Hero must display H1, region, industry, report type, period, market size, CAGR, forecast, CTAs, and report metadata.
- Mobile hero becomes stacked, with metric cards before long text.

### 8.2 Report Snapshot and Key Stats
- Show 4-8 most important metrics in a horizontal strip or responsive grid.
- Each metric needs label, value, unit, period, context, source note, and access level.
- Stats must be crawlable HTML, not only image text.

### 8.3 Executive Summary
- Keep research depth but write a boardroom-style summary.
- Must include market size, reason for growth, buyer relevance, and top 3-5 takeaways.
- Include use-case chips: market entry, benchmarking, investment screening, expansion planning.

### 8.4 Report Scope and Coverage
- Mandatory on every page.
- Shows market coverage, geography, period, segment coverage, competitor coverage, methodology coverage, deliverables, customization options.

### 8.5 Country and Infrastructure Context
- Country overview, import/export, population, roads, ports, rail, air infrastructure.
- Every macro/infrastructure fact must explain relevance to the market.
- Should support mini charts, maps, and relevance notes.

### 8.6 Market Overview and Genesis
- Text-heavy narrative allowed.
- Break into cards: overview, market genesis, business cycle, supply ecosystem, seasonality trends.
- Add visual anchors: timeline, ecosystem map, or business-cycle diagram.

### 8.7 Definitions, Assumptions, and Taxonomy
- Use glossary cards and taxonomy tree.
- Support inclusion/exclusion scope, assumptions, abbreviations, and related segments.
- All terms must be crawlable and searchable.

### 8.8 Ecosystem and Value Chain
- Hybrid visual model: static infographic + structured text + categorized logo grids.
- Support cold chain/cold storage/cold transport tabs.
- Value chain: horizontal desktop stepper · vertical mobile timeline.

### 8.9 Market Size, Forecast, and Submarket Intelligence
- Historical and forecast data must use interactive charts when dataset exists.
- Each chart card includes insight line, controls, dataset preview, source note, access state.
- Submarkets (cold storage, cold transport) get their own mini intelligence sections.

### 8.10 Segmentation Intelligence
- Tabbed interface for every available segmentation dimension.
- Each tab: text explanation, chart, dataset preview, dominant segment badge, analyst interpretation, unlock CTA.
- Hide missing tabs automatically.

### 8.11 End-User Deep Dives and Product Handling Matrix
- Cover end-user analysis, temperature-controlled products, shelf lives, demand-supply gaps.
- Support sector cards, shelf-life tables, technology requirements, key players, 3PL/owned logic.

### 8.12 Competitor Landscape
- Logo strip, timeline, market share chart, positioning matrix, company cards, comparison table.
- Top-level competitor facts public; full benchmark lead-gated or paid.
- Mobile must convert wide tables into company cards.

### 8.13 Industry Analysis
- Includes SWOT, drivers, challenges, risks, opportunities, trend cards, technology cards, regulation cards.
- No plain pasted SWOT/challenge table; convert into structured cards.

### 8.14 Market Opportunities and Analyst Recommendations
- Separate recommendations by buyer type: investors/new entrants, government, existing companies, cold storage operators, cold transport providers.
- High-value lead-gated/premium content.

### 8.15 Methodology, Sample Size, Limitations, and Disclaimer
- Build trust with methodology stepper.
- Show summary publicly; sample details and limitations expandable or lead-gated.
- Disclaimer/contact handled in footer/legal module.

### 8.16 TOC and FAQ
- TOC: nested accordion with full chapter preview rules.
- FAQ: AI-ready direct answers around market size, forecast, CAGR, players, segments, methodology, delivery, customization, buying process.

---

## 9. Chart Library and Dataset System

The product page must standardize all visualizations through the Ken Research chart library (`@ken-research/charts` · https://ken-charts.netlify.app).

| Chart type | Use case in product page |
|---|---|
| Area chart | Market growth trend and forecast trend |
| Dual-axis bar + line | Revenue and growth rate together |
| Line chart | Price, occupancy, pallets, inflation, CAGR trend |
| Donut/Pie chart | Segment share, mode of transport, temperature range |
| Horizontal bar chart | Competitor market share, regional share, end-user revenue |
| Stacked bar chart | Submarket mix over time |
| Bubble/scatter chart | Competitor positioning matrix |
| Map chart | Regional/city contribution |
| Timeline | Major player history and market genesis |
| Value chain visual | Procurement-to-distribution flow and margin stages |
| Dataset table | Underlying data preview and lead-gated unlock |

### 9.1 Required chart card anatomy

- Eyebrow
- Chart title
- One-line insight
- Interactive controls
- Chart body
- Dataset preview
- Source/methodology note
- Access state
- CTA

### 9.2 Standard chart JSON contract

```json
{
  "chart_id": "australia_cold_chain_market_size_2017_2022",
  "chart_type": "dual_axis_bar_line",
  "title": "Australia Cold Chain Market Size, 2017-2022",
  "unit": "AUD Mn",
  "series": [
    {"name": "Market Size", "type": "bar", "data": [{"year": "2017", "value": 4231.1}, {"year": "2022", "value": 6547.8}]},
    {"name": "Growth Rate", "type": "line", "unit": "%", "data": [{"year": "2018", "value": 9.7}, {"year": "2022", "value": 8.0}]}
  ],
  "source": "Ken Research Analysis",
  "access_level": "metered",
  "public_preview_rows": 3,
  "lead_unlocked_rows": 8
}
```

---

## 10. Info-Wall, Metering, Lead-Wall, and Paywall

**Access strategy:** Do not hard-lock the entire page. Keep enough public content for SEO, AI extraction, and buyer trust. Gate the deeper datasets, assumptions, full competitor benchmarks, exports, and proprietary recommendations.

| Access level | What user sees | Example content |
|---|---|---|
| Public | Visible without login or form | Hero, summary, key stats, scope, selected chart preview, top FAQs |
| Metered | Accessible for first two premium interactions | Chart expand, forecast toggle, dataset preview, competitor matrix |
| Lead-gated | Requires business email form | Full TOC preview, deeper segmentation rows, sample report, method details |
| Login-gated | Requires account/session identity | Saved charts, more preview rows, limited export |
| Paid | Requires purchase or manual access | Full report PDF, Excel/model, forecast assumptions, full competitor benchmark |
| Hidden | Not rendered publicly | Missing modules or internal-only content |

- Anonymous users get two premium interactions before info-wall.
- Interaction count stored in cookie/localStorage and optionally server-side after login.
- Paywalled sections must include CSS selector mapping for structured data.
- Public answer blocks should not be locked, otherwise SEO and AI extraction suffer.

---

## 11. Django CMS Architecture

The current Django CMS must evolve into a modular report page builder. Every module should be optional, reorderable, hideable, previewable, access-controlled, SEO-compatible, and chart-compatible.

| CMS object | Purpose | Important fields |
|---|---|---|
| Report core | Holds product identity and metadata | report_id, slug, title, product_code, industry, region, author, pages, date, base_year, forecast_period |
| Section module | Holds modular page blocks | section_type, title, summary, body, display_order, show_in_nav, access_level, CTA settings |
| Metric object | Drives hero/stats cards | label, value, unit, year, context, source, access_level |
| Chart object | Drives Ken Charts | chart_type, dataset_json, source_note, fallback_image, controls, access_level |
| Dataset object | Drives data table preview and gating | columns, rows, public_rows, unlocked_rows, export_permission, source, updated_at |
| Taxonomy object | Drives hierarchy tree | parent, child, description, icon, display_order |
| Competitor object | Drives company cards and benchmarks | name, logo, services, share, revenue, pallets, warehouses, technology, access_level |
| FAQ object | Drives FAQ and FAQ schema | question, answer, display_order, schema_enabled |
| TOC object | Drives chapter accordion | chapter, subsection, depth, access_level |

---

## 12. SEO, GEO, GXO, and Schema System

### 12.1 Title formation rules

| Template | Example |
|---|---|
| `{Country/Region} {Market Name} Outlook {Base Year}-{Forecast Year} \| Ken Research` | Australia Cold Chain Market Outlook 2022-2027 \| Ken Research |
| `{Country/Region} {Market Name} Size, Share and Forecast {Forecast Year} \| Ken Research` | Australia Cold Chain Market Size, Share and Forecast 2027 \| Ken Research |
| `{Country/Region} {Market Name} by {Top Segments}, Forecast {Forecast Year}` | Australia Cold Chain Market by Cold Storage, Cold Transport and End Users, Forecast 2027 |
| `{Report Title}: Size, Trends, Segmentation, Competitors and Forecast` | Australia Cold Chain Market: Size, Trends, Segmentation, Competitors and Forecast |

### 12.2 AI answer blocks required on every page

- What is the market size?
- What is the forecast value?
- What is the CAGR?
- Which segments are covered?
- Which companies are covered?
- What are the growth drivers?
- What are the key challenges?
- What does the report include?
- What methodology was used?
- Who should buy this report?

### 12.3 Schema types

`Organization · WebSite · WebPage · BreadcrumbList · Product · CreativeWork/Report · Dataset (when data preview exists) · FAQPage (when FAQs visible) · Paywalled content markup for gated blocks`

---

## 13. Conversion, Forms, CRM, and Analytics

| CTA location | Primary CTA | Secondary CTA |
|---|---|---|
| Hero | Download Sample Report | Talk to Analyst |
| Stats strip | Unlock Full Dataset | Download Sample |
| Market size chart | View Full Dataset | Request Customization |
| Segmentation module | Unlock Segment Breakdown | Talk to Analyst |
| Competitor module | Unlock Competitor Benchmark | Request Analyst Call |
| Forecast module | Unlock Forecast Data | Get Customized Forecast |
| Methodology | Preview Methodology | Download Sample |
| TOC | Preview Full TOC | Download Sample |
| Final CTA | Get Report Access | Talk to Analyst |

### 13.1 Hidden CRM fields

`report_title · product_code · page_url · cta_location · chart_id · section_name · access_trigger · utm_source · utm_medium · utm_campaign · referrer · device · session_id · interaction_count`

### 13.2 Analytics events

`product_page_view · hero_chart_interaction · stat_card_click · chart_hover · chart_filter_change · dataset_preview_click · info_wall_triggered · lead_wall_triggered · paywall_triggered · sample_cta_click · analyst_cta_click · customization_cta_click · buy_now_click · form_start · form_submit · toc_expand · faq_expand · section_nav_click · related_report_click · scroll_depth`

---

## 14. Technical and Performance Requirements

- SEO-critical content server-rendered or rendered in crawlable HTML.
- Chart hydration client-side, but with static fallback and data table fallback.
- Only required chart components loaded per page.
- Images/infographics use WebP/AVIF, lazy-loaded below the fold.
- Interactive charts include accessible labels, keyboard controls, data table alternatives.
- Core Web Vitals targets: LCP < 2.5s · CLS < 0.1 · INP < 200ms.
- Mobile PageSpeed target: 80+. Desktop PageSpeed target: 90+.

---

## 15. QA, Acceptance Criteria, and Rollout Roadmap

### 15.1 Acceptance criteria

- Australia Cold Chain can be built as the full master page without any missing content block.
- Lighter pages render without broken empty sections, empty tabs, placeholder text, or layout gaps.
- Every major section supports text + chart/stat/dataset/infographic/table where data exists.
- Info-wall triggers after defined premium interactions.
- Chart-level and dataset-level access rules work.
- Django CMS users can add, reorder, hide, preview, and validate modules.
- Title, meta, headings, schema, FAQ, and AI answer blocks programmatically supported.
- Mobile design readable and conversion-ready.
- Lead forms pass chart, section, report, CTA, and UTM context to CRM.

### 15.2 Rollout roadmap

| Phase | Scope | Output |
|---|---|---|
| Phase 1 | Foundation | New shell, hero, stats strip, sticky nav, module renderer, CTA system |
| Phase 2 | Research modules | Summary, scope, definitions, taxonomy, ecosystem, methodology, TOC, FAQ |
| Phase 3 | Charts and data | Ken Charts integration, chart cards, dataset preview, segmentation, competitor charts |
| Phase 4 | Access control | Metered interactions, info-wall, lead-wall, paywall overlay, unlock tracking |
| Phase 5 | SEO/GEO/GXO | Programmatic title/meta, schema, answer blocks, dataset markup, internal links |
| Phase 6 | Pilot | Australia Cold Chain + priority sample URLs |
| Phase 7 | Scale | CMS training, SOPs, QA checklists, rollout across priority report categories |

### 15.3 Pilot URLs

- Australia Cold Chain Market
- India Energy Bar Market
- India Confectionery Market
- Global Automatic Transmission Market
- Al Fujairah Taxi Service Market
- Italy Agricultural Machinery Market
- India Watch Market
- Singapore Medical Clinics Market
- India Electric Bike Over-the-Counter Market

---

## 16. Appendix

### 16.1 Required module registry

| Module key | Purpose |
|---|---|
| interactive_hero | Hero and market intelligence cockpit |
| report_snapshot | Report metadata and intelligence overview |
| key_stats_strip | Top metrics with access states |
| executive_summary | Boardroom-style summary |
| report_scope | Coverage, period, geography, segments, deliverables |
| country_infrastructure_context | Country overview, import/export, road/sea/air/rail context |
| market_overview_genesis | Market overview, genesis, business cycle, seasonality |
| definition_glossary | Definitions, scope, inclusions, exclusions, assumptions |
| taxonomy_tree | Market hierarchy and child nodes |
| ecosystem_infographic | Ecosystem map, logos, associations, certifications |
| market_size_chart | Historical market size and growth |
| submarket_intelligence | Cold storage, cold transport, or report-specific submarkets |
| segment_intelligence | Segmentation tabs and dataset previews |
| end_user_deep_dive | End-user categories, shelf life, handling, demand-supply gaps |
| competitor_landscape | Competitors, market share, positioning, comparison |
| industry_analysis | SWOT, drivers, challenges, trends, tech, regulation |
| future_outlook | Forecast, assumptions, scenarios, future drivers |
| opportunities_recommendations | Market opportunities and analyst recommendations |
| macro_indicators | GDP, inflation, population, trade, infrastructure, macro charts |
| methodology | Research approach, sample size, limitations, assumptions |
| toc_accordion | Expandable table of contents |
| faq | AI-ready FAQ and schema |
| related_reports | Internal linking and discovery |
| cta_block | Contextual and final conversion blocks |

### 16.2 Publish gate checklist

- H1 exists and follows naming convention.
- SEO title and meta description generated and reviewed.
- Market size, forecast, CAGR, segments, players, methodology answer blocks exist.
- All charts have title, source note, dataset or fallback, alt text, access level, chart ID.
- All infographics have captions and text equivalents.
- Empty modules are hidden and removed from sticky navigation.
- FAQ and TOC complete enough for buyer evaluation.
- Schema validates and paywalled blocks marked.
- Forms pass hidden fields to CRM.
- Mobile layout checked per module.
- No placeholder text, broken images, missing logos, or empty tables.
- Australia Cold Chain no-miss matrix passes before pilot launch.

---

## Source Note

This PRD uses the uploaded Australia Cold Chain Market Report as the master example. Specific metrics, section categories, and visual-module examples are derived from the uploaded report pages and table of contents. External chart-library implementation details must be validated against the active Ken Charts package and Storybook before engineering handoff.
