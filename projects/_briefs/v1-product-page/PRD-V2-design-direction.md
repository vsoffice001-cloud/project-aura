# Ken Research V1 Product Page Rebuild PRD

**Text-Led Research Intelligence Page with Interactive Charts, Data Access Control, Django CMS Modularity, SEO/GEO/GXO Optimization**

**Source:** `Ken_Research_V1_Product_Page_Rebuild_PRD (1).pdf` (attached to Aura conversation 2026-05-18)
**Canonical for:** v0.2 build of `projects/v1-product-page/` · per-module design direction
**Companion:** `PRD-V2.1-australia-coldchain.md` (master example + no-miss matrix)
**Version:** Expanded PRD V2 · 6 May 2026

> **Document purpose:** This PRD translates the existing V1 report product page into a premium research intelligence interface: text-heavy by design, but powered by sharper hierarchy, interactive charts, datasets, infographics, info-wall/paywall logic, and AI-search-ready formatting.

**Document Control**

| Field | Detail |
|---|---|
| Prepared for | Ken Research leadership, product, design, technology, SEO, content and research teams |
| Prototype report | Australia Cold Chain Market |
| Design reference | V01 Lovable-style product page design direction |
| Chart system | @ken-research/charts and Ken Charts Storybook reference |
| CMS stack | Django CMS with modular report page builder requirement |
| Version | Expanded PRD V2 |
| Date | 6 May 2026 |

---

## Table of Contents

1. Product Name and Objective
2. Corrected Product Understanding
3. Why This Rebuild Is Needed
4. Product Vision and Strategic Goals
5. Product Positioning
6. Page Type Definition
7. Design Direction
8. Master Page Architecture
9. Hero Section PRD
10. Report Intelligence Snapshot
11. Sticky Navigation PRD
12. Key Stats Strip
13. Executive Summary Module
14. Report Scope Module
15. Market Overview Module
16. Market Definition Module
17. Taxonomy Module
18. Market Ecosystem Module
19. Market Size and Growth Module
20. Chart Library Integration
21. Dataset Preview System
22. Info-Wall and Paywall PRD
23. Segment Intelligence Module
24. Industry Analysis Module
25. SWOT Module
26. Growth Drivers Module
27. Value Chain Module
28. Challenges and Solutions Module
29. Competitor Landscape Module
30. Trends and Emerging Technologies Module
31. Regulatory Landscape Module
32. Future Outlook Module
33. Macroeconomic Indicators Module
34. Research Methodology Module
35. Table of Contents Module
36. FAQ Module
37. Related Reports Module
38. Django CMS Architecture
39. CMS Data Model
40. Admin Publishing Workflow
41. Dynamic Rendering Logic
42. SEO PRD
43. GEO and AI Ranking PRD
44. Schema PRD
45. Conversion PRD
46. Lead Form PRD
47. Analytics PRD
48. Performance PRD
49. Accessibility PRD
50. QA Checklist
51. Acceptance Criteria
52. Implementation Roadmap
53. Final Definition of Success
54. Reference Sources

---

## 1. Product Name and Objective

Product name: **Ken Research V1 Product Page Rebuild**.
Internal working name: **Ken Research Intelligence Product Page System**.

The objective is to build a next-generation research product page where long-form research content, sharp statistics, interactive charts, datasets, infographics, report scope, methodology, competitor intelligence and conversion CTAs are presented inside a premium, modular, card-based interface.

The page must remain text-heavy by design because Ken Research sells research depth, not shallow landing-page copy. The problem is not the volume of text. The problem is that the current V1 design does not structure research content with enough UX flexibility, visual hierarchy, modularity, interaction, data hierarchy or conversion strategy.

**Core product principle:** Research depth should remain. Presentation, structure, interactivity, ranking readiness and conversion logic must be upgraded.

---

## 2. Corrected Product Understanding

The product page should NOT become light, minimal or brochure-like. Ken Research sells intelligence, and the buyer expects depth. Long text, definitions, methodology, market-sizing explanations, segmentation, competitor detail and data tables are all acceptable and necessary.

The redesign must convert dense research into a premium product experience by improving hierarchy, sectioning, card design, chart interaction, mobile reading, gated data access, CMS publishing and search/AI extraction.

The uploaded Australia Cold Chain report is the ideal master reference because it includes nearly every content type that may appear on a rich report page: market highlights, definitions, taxonomy, ecosystem, market sizing, cold storage analysis, cold transport analysis, SWOT, drivers, value chain, challenges, segmentation, competitors, trends, emerging technologies, regulatory landscape, future outlook, macroeconomic indicators, methodology and FAQs.

---

## 3. Why This Rebuild Is Needed

The current V1 page already has a functional base. The Australia Cold Chain live page includes report title, Download Sample Report CTA, Get Customized Report CTA, author, page count, published date, product code, base year and tabs for Market Overview, Market Ecosystem, Industry Analysis, Market Segmentation, Future Outlook, Competitor Analysis, Macroeconomic Indicators and Table of Content.

This means V1 should NOT be discarded completely. It should be treated as a functional foundation that needs a new experience layer, a new modular CMS layer and a new data-intelligence layer.

| Current Issue | Required Correction |
|---|---|
| Weak UX/UI flexibility | Introduce modular cards, clear section hierarchy, sticky navigation, chart containers, dataset previews and section-level CTAs. |
| Django CMS rigidity | Create a report page builder with optional, reorderable, access-controlled modules. |
| Poor modularity | Design must gracefully support reports with full sections, fewer sections or additional custom sections. |
| Static data treatment | Convert charts, stats, datasets and infographics into interactive and monetizable assets. |
| Research value not packaged | Use insight cards, chart cards, methodology cards, competitor intelligence blocks and report scope cards. |
| No controlled access | Add public, metered, lead-gated, login-gated and paid states for every chart/stat/data module. |
| Weak AI/search extraction | Add answer blocks, structured headings, visible market facts, schema and dataset metadata. |
| Conversion not contextual | Place CTAs after market size, segmentation, competitor, forecast, methodology and TOC moments. |

---

## 4. Product Vision and Strategic Goals

**Vision:** Create the best research product page experience in the market intelligence category by combining text-heavy research depth with premium consulting-grade design, interactive chart intelligence, dataset previews, infographic walls, modular Django CMS publishing, info-wall/paywall logic and search/AI ranking architecture.

**Final experience statement:** This should not feel like a report listing. It should feel like a live preview of Ken Research's intelligence engine.

| Strategic Goal | Description |
|---|---|
| Increase qualified leads | Improve sample downloads, analyst calls, customization requests and paid report inquiries. |
| Increase perceived report value | Make charts, stats, datasets, TOC and methodology feel premium. |
| Improve discoverability | Rank better on Google and AI-driven discovery platforms. |
| Productize research depth | Convert document-heavy research into a modular web intelligence format. |
| Reduce CMS dependency | Allow internal teams to assemble pages without developer involvement for every layout variation. |
| Improve data monetization | Use info-wall, lead-wall and paywall to gate high-value charts and datasets. |
| Create scalable template | Use one flexible system across thousands of report pages. |

---

## 5. Product Positioning

Each report page should position the report as a consulting-led market intelligence asset built to support market entry, expansion, investment, competitor benchmarking, product strategy, procurement planning and growth decisions.

The page should communicate that Ken Research owns structured market intelligence, not generic content. It should show enough public intelligence to build trust and enough locked intelligence to create a clear reason to download the sample, speak to an analyst, request customization or purchase.

- Ken Research has structured market data.
- The report contains defensible methodology.
- The buyer can preview enough to trust the report.
- Deeper data is available through sample, analyst call, customization or purchase.
- The report is decision-support intelligence, not generic SEO content.

---

## 6. Page Type Definition

The rebuilt V1 page is a hybrid of five page types. It must behave like all five at the same time without becoming visually confusing.

| Page Type | Role in V1 Rebuild |
|---|---|
| Research report product page | Shows product metadata, scope, TOC, author, date, pages and CTAs. |
| Market intelligence landing page | Ranks for market-size, forecast, CAGR and industry-outlook keywords. |
| Interactive data preview page | Lets users interact with charts, datasets and infographics. |
| Lead-generation page | Uses sample download, analyst call, dataset unlock and customization CTAs. |
| Controlled-access content page | Uses info-wall, metering, lead-gating and paywall states. |

---

## 7. Design Direction

The page should adopt the V01 reference direction while adapting it for serious research consumption. It should feel premium, structured, research-led, enterprise-grade, data-rich, modular, clean, trustworthy and consulting-like.

The design must be text-first. Charts, infographics and cards should support the research narrative rather than replacing it. Every long section should have visual anchors and clear hierarchy.

| Use | Avoid |
|---|---|
| White/off-white background, large containers, card-based layout, muted borders, soft shadows | Flat CMS dump layout, one long text wall without hierarchy |
| Ken Red as CTA/accent color, charcoal/navy text, light grey section backgrounds | Too many loud colors, generic SaaS gradients |
| Interactive chart cards, dataset preview panels, infographic containers | Random chart placement or uncaptioned images |
| Sticky navigation, locked content overlays, clear section progress | Over-animation, floating elements that distract from research |
| Consistent spacing, responsive tables and mobile-first reading | Tables that overflow, broken responsive text and unhelpful whitespace |

---

## 8. Master Page Architecture

1. Global Header
2. Breadcrumb
3. Interactive Hero Section
4. Report Intelligence Snapshot
5. Sticky Navigation
6. Key Stats Strip
7. Executive Summary
8. Report Scope and Coverage
9. Market Overview
10. Market Definition
11. Taxonomy
12. Market Ecosystem
13. Market Size and Growth
14. Segment Intelligence
15. Industry Analysis
16. Growth Drivers
17. Value Chain
18. Challenges and Solutions
19. Competitor Landscape
20. Recent Trends
21. Emerging Technologies
22. Regulatory Landscape
23. Future Outlook
24. Macroeconomic Indicators
25. Research Methodology
26. Table of Contents
27. FAQs
28. Related Reports
29. Final CTA Block
30. Footer

**Core page grammar:** Every major section should follow the same pattern: Section Title + Executive Insight + Research Text + Embedded Chart/Stat/Dataset/Infographic + Analyst Interpretation + Unlock/CTA Moment.

---

## 9. Hero Section PRD

The hero should immediately create the feeling that the visitor has landed on a premium intelligence asset. It must answer: what report this is, which market it covers, the biggest number, the forecast, what data can be previewed and what action the buyer should take.

The hero should use a two-column desktop layout. The left column should carry the report positioning, while the right column should carry the interactive market intelligence cockpit. On mobile, this should become a stacked layout where the title, CTA and top metrics remain visible without excessive scroll.

| Hero Area | Required Elements |
|---|---|
| Left column | Breadcrumb, category chip, country/region chip, industry chip, report type chip, H1, one-line product promise, 3 research proof bullets, primary and secondary CTAs, trust strip. |
| Right column | Mini chart, stat cards, forecast badge, segment toggle, competitor preview and dataset unlock teaser. |
| Hero cockpit tabs | Market Size, Forecast, Segmentation and Competitors. |
| Hero metadata | Report title, market name, region, industry, report type, author, published date, pages, product code, base year, historical period, forecast period, format and delivery type. |
| Interactions | Toggle, hover tooltip, mini dataset preview, lock overlay after interaction limit, sample CTA, analyst CTA and mobile collapse. |

**Hero example:** Australia Cold Chain Market Outlook (2022-2027). Market size, segmentation, competitor landscape, growth drivers and forecast intelligence across Australia's cold storage and cold transport ecosystem. Include AUD 6,547.8 Mn 2022 market size, AUD 10,705.0 Mn 2027 forecast and 10.03% CAGR where relevant.

---

## 10. Report Intelligence Snapshot

This section should sit immediately below the hero and summarize the report in a premium product-card format. It should be fast, credible and data-forward.

| Field | Requirement |
|---|---|
| Market size | Show value, unit, year and source/methodology note. |
| Forecast | Show forecast year, value and CAGR. |
| Segments | Show primary segment groups and dominant segment if available. |
| Major companies | Show a limited competitor preview with full benchmark gated. |
| Buyer use cases | Market entry, competitive benchmarking, investment screening, expansion planning, supply chain strategy, procurement planning. |
| Available outputs | PDF report, charts, tables, sample report, analyst call, customization. |

---

## 11. Sticky Navigation PRD

The product page will be long. Sticky navigation is mandatory because it reduces cognitive load and makes the page feel like an intelligence system rather than a content dump.

The current V1 already uses a tab-like navigation row. The rebuild should upgrade this into a dynamic sticky navigation system with active-section highlighting, progress feedback and CTA placement.

| Device | Behavior |
|---|---|
| Desktop | Sticky after hero, active section highlight, section progress, CTA button on right, unavailable sections hidden, overflow menu for additional tabs. |
| Mobile | Horizontal scroll chips, sticky under header, active chip highlight and bottom sticky CTA bar. |
| Dynamic logic | Only show a navigation item when the section is published and has visible public or preview content. |

**Recommended nav items:** Summary, Scope, Definitions, Ecosystem, Market Size, Segmentation, Competition, Forecast, Methodology, TOC, FAQ.

---

## 12. Key Stats Strip

The key stats strip should show the report's most important data before the user reaches long content. It should become a strong scanning and conversion element.

| Metric Card Element | Requirement |
|---|---|
| Metric value | Large numeric display with unit and year/period. |
| Metric label | Clear market-intent label, e.g., Australia Cold Chain Market Size. |
| Tooltip | Explain definition, scope and source note. |
| Access state | Show lock indicator when the deeper data behind the stat is premium. |
| Interaction | Click to expand detail, view related chart or unlock deeper data. |

**Australia Cold Chain example:** Key stats can include 2022 market size, 2027 forecast value, 2022-2027 CAGR, cold storage market size and cold transport market size.

---

## 13. Executive Summary Module

The executive summary must transform the report intro into a boardroom-style brief. It should keep enough substance for ranking and buyer confidence while avoiding an unstructured wall of text.

**Structure:** H2, opening paragraph on market size and why the market matters, second paragraph on growth drivers, third paragraph on what the report helps the buyer decide, 3-5 key takeaways, one chart/stat card and CTA.

| Element | Requirement |
|---|---|
| Executive insight | A one-line conclusion at the top of the module. |
| Research narrative | Text-heavy but structured into short paragraphs with clear subheadings. |
| Takeaway cards | 3-5 cards covering demand, forecast, segments, competition and methodology. |
| Buyer-use-case chips | Market Entry, Competitive Benchmarking, Investment Screening, Expansion Planning, Supply Chain Strategy, Procurement Planning. |
| CTA | Download Sample Report or Talk to Analyst after the summary. |

---

## 14. Report Scope Module

The report scope module helps buyers quickly know whether the report covers their requirement. This should be mandatory on every product page.

| Scope Bucket | Example Fields |
|---|---|
| Market Coverage | Cold storage, cold transport, cold warehousing, temperature-sensitive products. |
| Geography Coverage | Country, region, cities, ports, state-level splits where available. |
| Segment Coverage | End users, mode of transport, temperature range, region, competitor type. |
| Competitor Coverage | Players, logos, market shares, positioning, company cards, comparison tables. |
| Time Coverage | Base year, historical period and forecast period. |
| Methodology Coverage | Secondary research, primary research, triangulation, sanity checking, limitations. |
| Deliverables | PDF, charts, datasets, table of contents, sample, customization. |
| Customization | Additional segments, geographies, competitors, forecast period or analyst support. |

---

## 15. Market Overview Module

The market overview should support detailed research writing but avoid unstructured text. It should include an executive insight, research text, market snapshot card, interactive chart, analyst note and CTA.

No long-text section should be published without at least one visual anchor such as a stat card, chart, dataset preview, infographic, quote/insight callout or table.

- Use short paragraphs with H3 subheadings for each theme.
- Add a visible market-size answer block for SEO and AI extraction.
- Add a chart card when structured data exists.
- Add a source/methodology note under every major claim or chart.
- Use CTA placement after the first high-value insight, not only at the top of the page.

---

## 16. Market Definition Module

Market definitions are essential because research buyers need clarity on what is included and excluded. The Australia Cold Chain document includes definitions for cold chain, cold storage, cold transport, ambient storage, frozen storage, chiller storage, captive warehouses and non-captive warehouses.

Definitions should be rendered as glossary cards or accordions, not as one long paragraph. Each definition should remain crawlable and readable.

| Definition Field | Requirement |
|---|---|
| Term | Short, clear, indexable term name. |
| Definition | Precise definition using research scope language. |
| Included in scope | What is counted in the report's market sizing. |
| Excluded from scope | What is not counted or not covered. |
| Related segments | Connect definition to taxonomy and segmentation modules. |

---

## 17. Taxonomy Module

The taxonomy module should show how the market is structured. The Australia Cold Chain report includes taxonomy across cold storage, cold transportation, cold warehousing, temperature-sensitive products, food and beverages, pharmaceuticals and biotechnology, chemicals, refrigeration systems, market participants and distribution channels.

The UI should be an interactive taxonomy tree on desktop and an accordion tree on mobile. The public layer should include major parent and child nodes, while deeper taxonomy-level opportunity analysis can be lead-gated.

| Desktop Layout | Mobile Layout |
|---|---|
| Left rail with parent categories; right panel with child nodes and descriptions. | Accordion tree where each parent category opens into child nodes. |
| Optional icon per parent category. | Compact icon or label chip per parent category. |
| Lead-gated deeper explanation. | Lead-gated deeper explanation after interaction limit. |

---

## 18. Market Ecosystem Module

The ecosystem module should convert ecosystem diagrams into a premium interactive intelligence module. The source report includes ecosystem visuals for cold chain, cold storage and cold transport players.

Use a hybrid approach: structured text for SEO/GEO and infographic/logo grid for visual understanding. The full ecosystem map can be locked.

| Ecosystem Element | Requirement |
|---|---|
| Tabs | Cold Chain, Cold Storage, Cold Transport, Associations, Certifications. |
| Visual | Logo grid, ecosystem map or infographic inside a clean card. |
| Text summary | Visible explanation of what the ecosystem means for buyers. |
| Logo normalization | All logos should appear at consistent visual size. |
| Caption | Each visual must have a caption for accessibility, SEO and AI extraction. |
| Access | Basic ecosystem public; full ecosystem map lead-gated or paid. |

---

## 19. Market Size and Growth Module

This is one of the most important ranking and conversion modules. It should include an AI-readable answer block, research explanation, interactive chart, dataset preview, analyst interpretation and unlock CTA.

The Australia Cold Chain page and document include historical market size, 2022 market size, 2027 forecast and CAGR.

**Suggested answer block:** The Australia Cold Chain Market reached AUD 6,547.8 million in 2022 and is expected to reach AUD 10,705.0 million by 2027, registering a CAGR of 10.03% during 2022-2027.

| Chart Requirement | Details |
|---|---|
| Chart type | Dual-axis bar + line chart, area chart for market growth, forecast chart with dotted future line. |
| Controls | Revenue toggle, growth-rate toggle, historical/forecast toggle, data-table view, fullscreen view, unlock dataset CTA. |
| Public content | Main market size, forecast value, CAGR and basic chart preview. |
| Locked content | Full year-wise dataset, assumptions, forecast model and downloadable data. |
| Fallback | Use a static chart image if structured data is unavailable, but include an HTML text summary. |

---

## 20. Chart Library Integration

The V1 rebuild should standardize all product-page visualizations using the Ken Research chart library: `@ken-research/charts`. The provided Storybook instance (https://ken-charts.netlify.app) should become the reference for approved chart behavior, styling, variants and interaction patterns.

The chart library should power the hero preview chart, market size charts, forecast charts, segmentation charts, competitor share charts, regional charts, pricing charts, occupancy charts, dataset preview charts and dashboard-like stat cards.

| Chart Type | Use Case |
|---|---|
| Area Chart | Market size trend and forecast trend. |
| Line Chart | Growth rate, price and occupancy trends. |
| Bar Chart | Segment comparison. |
| Stacked Bar Chart | Segment mix over time. |
| Donut Chart | Revenue share by end user or segment. |
| Horizontal Bar Chart | Competitor share or regional share. |
| Dual Axis Chart | Market size plus growth rate. |
| Bubble Chart | Market positioning matrix. |
| Heatmap | Regional or segment opportunity. |
| Map Chart | Geographic distribution. |
| Timeline Chart | Player evolution or market history. |
| Value Chain Chart | Supply-chain flow and margin movement. |
| Data Table | Dataset preview and paywall support. |

Every chart must sit inside a standardized chart card with chart header, chart title, insight line, chart controls, chart body, dataset preview, source note, access state and CTA.

**Chart Card formula:** `Header + Title + Insight Line + Controls + Visualization + Dataset Preview + Source Note + Access State + CTA`

---

## 21. Dataset Preview System

Research buyers trust data when they can preview the underlying dataset. Every major chart should offer a View Dataset action.

| State | Visible Data | CTA |
|---|---|---|
| Public Preview | 3 visible rows, column names, source note, locked rows blurred. | Unlock Full Dataset |
| Lead-Unlocked Preview | 8-10 visible rows, limited export disabled or sample export enabled, more methodology notes. | Request Full Report |
| Paid Access | Full dataset, CSV/Excel export, full methodology and chart download. | Download / Export |

- Dataset table fields: year, segment, value, unit, growth rate, source note, methodology note, last updated date and access level.
- Do not hide all numbers. Public content must expose main market size, forecast size, CAGR, primary segment share, major players, scope and methodology summary.
- Gate deeper proprietary data such as full year-wise dataset, forecast assumptions, market model and downloadable Excel.

---

## 22. Info-Wall and Paywall PRD

The info-wall is NOT a hard paywall. It is a controlled research-preview system. Users should get enough public value to trust the page. After deeper engagement, the page asks for identity, sample download, login or purchase.

Google's paywalled-content guidance uses `isAccessibleForFree` and `hasPart` with a CSS selector to mark paywalled page sections. The implementation should follow the same structured-data principle for locked report sections.

| Access Level | Definition | Examples |
|---|---|---|
| Public | Always visible to all users and crawlers. | Hero, summary, 3-5 key stats, basic chart preview, report scope, limited TOC, FAQ. |
| Metered | Accessible for a limited number of premium interactions. | Expanding chart, viewing dataset, switching to forecast, opening competitor matrix. |
| Lead-Gated | Requires form submission. | Full dataset preview, full segmentation breakdown, full competitor comparison, methodology expansion, sample report download. |
| Login-Gated | Requires user account. | Saved reports, extended previews, repeat access, account-based metering. |
| Paid | Requires purchase or manual access approval. | Full report PDF, forecast assumptions, complete market model, competitor benchmark, Excel downloads. |
| Hidden | Not rendered publicly. | Draft/internal modules or missing data modules. |

**First two premium interactions:** Anonymous users should receive 2 premium interactions per browser/session/device. After this limit, trigger an info-wall or lead-wall. Sync state server-side when a user logs in.

**Example paywall selector classes:** `.kr-paywall-chart` · `.kr-paywall-dataset` · `.kr-paywall-forecast` · `.kr-paywall-competitor-table`

---

## 23. Segment Intelligence Module

Segmentation is one of the highest-value parts of a research product page. It should be treated as a premium interactive module with tabs, charts, dataset preview, dominant segment badge and analyst interpretation.

The Australia Cold Chain report includes segmentation by end user, market type, temperature range, region, transport mode, truck type and domestic/international transportation.

| Segmentation Tab | Expected Content |
|---|---|
| By End User | Meat and seafood, fruits and vegetables, pharmaceuticals, confectionery and others. |
| By Market Type | Cold storage vs cold transport. |
| By Temperature Range | Frozen, chillers, ambient and other temperature requirements. |
| By Region | City/state/region revenue or share where available. |
| By Transport Mode | Land, sea, air and related revenue/share. |
| By Truck Type | Reefer trucks/vans by tonnage and fleet count. |
| By Domestic/International | Domestic and international transportation split. |

---

## 24. Industry Analysis Module

The industry analysis module should convert dense report analysis into a structured strategy section. It should group SWOT, growth drivers, challenges and solutions, value chain, trends, emerging technologies and regulatory landscape into a logical analysis stack.

- Each submodule must be a card or card group.
- No submodule should appear as plain pasted text only.
- Each submodule should have an executive insight line, body text, visual/data element and buyer implication.
- Long analysis should collapse after a short public preview, with deeper detail lead-gated where required.

---

## 25. SWOT Module

The SWOT module should use a 2x2 grid: Strengths, Weaknesses, Opportunities and Threats. It should be scan-friendly, but able to expand into deeper analysis.

| Quadrant | Behavior |
|---|---|
| Strengths | Show top 3 visible points and expand for more. |
| Weaknesses | Show top 3 visible points and expand for more. |
| Opportunities | Show top 3 visible points and expand for more. |
| Threats | Show top 3 visible points and expand for more. |
| Analyst note | Add a bottom insight explaining what the SWOT means for buyer decisions. |
| Access | Basic SWOT public; full SWOT with strategic implications can be lead-gated. |

---

## 26. Growth Drivers Module

Growth drivers should be rendered as driver cards with impact tags and related segments. For Australia Cold Chain, drivers include perishable goods demand, e-commerce/home delivery growth, globalization of food supply chains and technology advancement.

| Driver Card Field | Requirement |
|---|---|
| Driver title | Short, direct title. |
| Explanation | 2-4 lines of research-backed explanation. |
| Impact level | High, Medium or Low. |
| Related segment | Cold storage, cold transport, end user or region. |
| Supporting data | Add metric or chart where available. |
| CTA | Unlock deeper driver analysis or talk to analyst. |

---

## 27. Value Chain Module

The value chain should help users understand how the market works commercially. The Australia Cold Chain source includes a value-chain visual across shipper, procurement hubs, cold storage and distribution to end users.

| Device | Value Chain Layout |
|---|---|
| Desktop | Horizontal value-chain flow with stage cards, arrows, margin callouts and optional infographic. |
| Mobile | Vertical stepper with stage name, participant, activity, margin, pain point and opportunity. |
| Public layer | Basic value-chain stages and plain-language explanation. |
| Locked layer | Margin details, participant mapping and commercial opportunity analysis. |

---

## 28. Challenges and Solutions Module

Challenges should NOT be treated as negative filler. They are buyer-relevant decision points. This module should pair each challenge with a solution or market response.

| Field | Requirement |
|---|---|
| Challenge title | Concise challenge label. |
| Why it matters | Explain buyer or industry relevance. |
| Solution / market response | What companies, regulators or technologies are doing to address it. |
| Impact area | Cost, compliance, delivery, operations, infrastructure, workforce, technology. |
| Urgency | High, Medium or Low. |
| Related segment | Connect to market segment where relevant. |

---

## 29. Competitor Landscape Module

Competitor intelligence should be treated as a premium conversion section. The current Australia Cold Chain page includes company profiles, and the source document includes competitor timeline, market share, positioning and detailed competitor table.

The module should include a competitor overview, logo strip, market-share chart, positioning matrix, company cards, comparison table and locked detailed benchmark.

| Company Card Field | Requirement |
|---|---|
| Company name and logo | Logo normalized or fallback to text/initials. |
| Description | Brief research description. |
| Establishment year | If available. |
| Services | Cold storage, cold transport, 3PL, retail expertise, etc. |
| Facilities/warehouses | Where available. |
| Technology | WMS, EDI, GPS, automated systems, temperature monitoring etc. |
| Market share / pallets | If data exists. |
| Strategic note | Buyer implication or positioning note. |
| Access | Basic card public; full comparison lead-gated or paid. |

---

## 30. Trends and Emerging Technologies Module

Trends show where the market is moving. Technologies show what capabilities are changing the market. These can be separate tabs inside one module.

| Tab | Card Fields |
|---|---|
| Recent Trends | Trend name, description, impact level, time horizon, affected segment and buyer implication. |
| Emerging Technologies | Technology name, use case, adoption stage, market impact and companies adopting if available. |

- Possible trends: cold chain visibility, traceability, digitalization, e-commerce/home delivery, sustainable cold chain practices.
- Possible technologies: RPA, IoT/sensors, blockchain, advanced data analytics and predictive modeling.

---

## 31. Regulatory Landscape Module

For many industries, regulation is a purchase driver. The regulatory landscape module should show compliance themes and business implications.

| Field | Requirement |
|---|---|
| Regulation / authority | Name of authority or regulation. |
| What it governs | Food safety, transport, storage, biosecurity, chain of responsibility, etc. |
| Impacted participants | Operators, warehouses, transport companies, food/pharma players. |
| Compliance relevance | Operational and business impact. |
| Buyer implication | How regulation affects market entry, investment, procurement or operations. |
| Access | Major regulatory themes public; detailed compliance table gated. |

---

## 32. Future Outlook Module

Forecast is a premium value section. It should NOT be just a paragraph. It should include forecast summary, forecast chart, future growth drivers, forecast assumptions preview, locked forecast dataset and CTA.

| Public | Locked |
|---|---|
| Forecast market size | Year-wise forecast dataset. |
| Forecast CAGR | Forecast assumptions and model logic. |
| Key forecast drivers | Scenario analysis. |
| High-level analyst interpretation | Segment-level projections and sensitivity model. |

---

## 33. Macroeconomic Indicators Module

Macroeconomic indicators should NOT be dumped as generic country facts. Every indicator must explain why it matters to the market.

| Indicator Type | Possible Relevance |
|---|---|
| GDP | Market affordability, investment environment and industry capacity. |
| Inflation | Cost pressure, pricing and operating economics. |
| Population | Demand base and urban consumption. |
| Imports / Exports | Trade dependency and logistics relevance. |
| Infrastructure | Cold chain, transport, ports and distribution feasibility. |
| Ports / Road Network | Logistics route efficiency and regional market accessibility. |

**Writing rule:**
- BAD: Australia population was 25.9 Mn.
- BETTER: Australia's population base and urban consumption patterns support demand for perishable food distribution and cold chain logistics.

---

## 34. Research Methodology Module

Methodology is critical for trust. It should be visually upgraded as a trust-building module and not hidden at the bottom as a generic note.

1. Secondary Research
2. Primary Research
3. Data Triangulation
4. Sanity Checking
5. Forecast Modeling
6. Analyst Validation

| Methodology Field | Requirement |
|---|---|
| Secondary sources | Company reports, magazines, journals, online articles, government sources, World Bank, IMF etc. where applicable. |
| Primary research | Interview types, respondent categories and sample size where available. |
| Sanity checking | Cross-validation, expert checks, model review and internal assumptions. |
| Limitations | State limitations transparently. |
| Forecast methodology | Explain model type at public level; keep assumptions gated if proprietary. |
| Access | Summary public; sample-size details and respondent mix lead-gated; model assumptions paid. |

---

## 35. Table of Contents Module

TOC is a key purchase decision section. Serious buyers use it to evaluate whether the report covers their business question.

| TOC Layer | Behavior |
|---|---|
| Public | Major chapter titles and limited subsections. |
| Lead-gated | Full TOC preview after form submission. |
| Paid | Full report access. |
| UI | Expandable accordion with Expand All and Collapse All controls. |
| CTA | After TOC: Download the sample report to preview the full structure. |

---

## 36. FAQ Module

FAQs support SEO, GEO and buyer objections. Answers should be direct, factual and written in AI-extractable language. FAQ structured data should only be used for visible FAQ content. Google documentation shows FAQPage markup using Question and acceptedAnswer structures.

| FAQ Type | Example |
|---|---|
| Market size | What is the size of the Australia Cold Chain Market? |
| Forecast | What is the expected forecast value by 2027? |
| CAGR | What CAGR is expected during the forecast period? |
| Segments | Which segments are covered in the report? |
| Competitors | Who are the major players covered? |
| Coverage | What does the report include? |
| Methodology | How was the report prepared? |
| Customization | Can the report be customized? |
| Delivery | What is the delivery format? |
| Purchase | How can the report be purchased? |

---

## 37. Related Reports Module

Related reports improve internal linking, buyer discovery and topical authority. They should NOT be random. They should be matched by market, geography, industry, buyer use case and recency.

1. Same market, adjacent geography
2. Same geography, adjacent market
3. Same industry
4. Same buyer use case
5. Recently published reports
6. Custom research alternative

| Card Field | Requirement |
|---|---|
| Report title | Clear title with market and geography. |
| Industry | Category tag. |
| Region | Country/region tag. |
| Published date | Visible if available. |
| Short summary | One-line relevance statement. |
| CTA | View report or request custom research. |

---

## 38. Django CMS Architecture

Django CMS is currently rigid and difficult for non-technical publishing teams because report pages are not uniform. The rebuild requires a modular report page builder inside Django CMS.

Every report page should be assembled through modules. Each module should be optional, reorderable, hideable, previewable, access-controlled, SEO-compatible, chart-compatible and validated before publishing.

| Module Type | Purpose |
|---|---|
| interactive_hero | Hero with market intelligence cockpit and primary CTAs. |
| report_snapshot | Quick report metadata and key facts. |
| key_stats_strip | Headline stat cards. |
| executive_summary | Boardroom-style report summary. |
| report_scope | Coverage, period, geography, segments, deliverables. |
| market_overview | Research narrative with visual/data element. |
| definition_glossary | Market definitions and scope notes. |
| taxonomy_tree | Interactive taxonomy. |
| ecosystem_infographic | Ecosystem visual, logo wall and text summary. |
| market_size_chart | Historical and forecast market sizing. |
| segment_intelligence | Tabbed segmentation module. |
| industry_analysis | SWOT, drivers, challenges, trends etc. |
| competitor_landscape | Players, charts, matrix, company cards. |
| methodology | Trust-building methodology section. |
| toc_accordion | Expandable TOC. |
| faq | FAQ accordion and structured data. |
| cta_block | Contextual lead capture. |

---

## 39. CMS Data Model

The CMS data model must separate report metadata, sections, charts, datasets, competitors, FAQs and SEO fields. This prevents one giant rich-text field from controlling a complex product page.

| Collection | Core Fields |
|---|---|
| Report Core | report_id, product_code, slug, report_title, short_title, market_name, country, region, industry, sub_industry, report_type, author, pages, published_date, base_year, historical_period, forecast_period, currency, unit, format, delivery_type, status. |
| SEO | seo_title, meta_description, canonical_url, og_title, og_description, og_image, twitter fields, robots_index, robots_follow, primary_keyword, secondary_keywords, schema_type. |
| Section | section_id, report_id, section_type, section_title, section_eyebrow, section_summary, section_body, display_order, show_in_navigation, visibility_status, access_level, cta_enabled. |
| Chart | chart_id, report_id, section_id, chart_title, chart_subtitle, chart_type, chart_dataset_json, axis labels, unit, source_note, methodology_note, static_image_fallback, access_level, preview_row_limit, download_enabled. |
| Dataset | dataset_id, chart_id, columns, rows, visible_rows_public, visible_rows_lead_unlocked, download_permission, source_note, last_updated, access_level. |
| Competitor | competitor_id, report_id, company_name, logo, description, establishment_year, services, market_share, revenue, warehouses, technology, positioning, access_level. |
| FAQ | faq_id, report_id, question, answer, display_order, schema_enabled. |
| TOC | toc_id, report_id, chapter_number, chapter_title, subsection_number, subsection_title, display_order, access_level. |

---

## 40. Admin Publishing Workflow

The current workflow moves from research document to manually filled CMS fields. The new workflow should introduce structured extraction, chart data preparation, SEO review, data QA and design QA.

1. Research team finalizes report document.
2. Content team identifies modules.
3. Data team extracts chart datasets.
4. CMS operator creates report page.
5. CMS operator fills core metadata.
6. CMS operator adds modules.
7. CMS operator attaches charts, datasets and infographics.
8. SEO editor reviews title, meta, headings, FAQ and internal links.
9. Data QA checks numbers and chart values.
10. Design QA checks desktop/mobile rendering.
11. Product owner approves.
12. Page is published.
13. Indexing and analytics monitoring begin.

| Admin Dashboard Score | What It Measures |
|---|---|
| Completion score | Whether required fields and mandatory modules are filled. |
| SEO score | Title, meta, headings, slug, canonical, FAQ, schema and internal links. |
| Data completeness score | Whether charts/datasets have values, units, years and source notes. |
| Chart readiness score | Whether charts have type, dataset/fallback, title, caption and access setting. |
| Schema validation | Whether schema is valid and not populated with empty fields. |
| Paywall setup | Whether locked modules have access level and paywall metadata. |
| Preview | Desktop and mobile preview before publish. |
| Approval status | Draft, review, approved, published, archived. |

---

## 41. Dynamic Rendering Logic

The frontend should render only valid content and should never expose broken empty CMS structures. This is critical because different reports will have different section combinations.

| Rule | Requirement |
|---|---|
| Section rendering | Render only if section_status = published AND section has content/chart/dataset/image/table AND access_level is not hidden. |
| Navigation rendering | Render nav item only if show_in_navigation = true AND section is published AND section has visible public or preview content. |
| Empty states | Never show empty cards, empty titles, empty chart areas, broken images, missing logo placeholders, empty tabs or placeholder text. |
| Chart fallback | If chart dataset is missing, use static infographic. If image is missing, use text + stat card. |
| Competitor fallback | If logo is missing, show company initials or text-only card. |
| FAQ fallback | If FAQ is missing, hide FAQ section. |
| Forecast fallback | If forecast is missing, hide forecast tab and navigation item. |

---

## 42. SEO PRD

Each report page should rank for primary market keyword, market size keyword, market forecast keyword, market outlook keyword, market segmentation keyword, competitor keyword, industry report keyword and country + market keyword.

| SEO Element | Formation Logic |
|---|---|
| Title - Market Outlook | `{Country/Region} {Market Name} Outlook {Base Year}-{Forecast Year} \| Ken Research` |
| Title - Market Size | `{Country/Region} {Market Name} Size, Share & Forecast {Forecast Year} \| Ken Research` |
| Title - Report-Led | `{Report Title}: Size, Trends, Segmentation, Competitors & Forecast` |
| Title - Segment-Led | `{Country/Region} {Market Name} by {Top Segments}, Forecast {Forecast Year}` |
| H1 | `{Country/Region} {Market Name} Market Outlook ({Base Year}-{Forecast Year})` |
| Meta Description | Explore {Country/Region} {Market Name} size, CAGR, segmentation, growth drivers, competitor landscape and {Forecast Year} outlook. Download sample report by Ken Research. |
| URL Slug | /{country}-{market-name}-market, unless existing ranking URL must be preserved with redirects. |
| H2 Pattern | Market Summary, Report Scope, Market Definition, Market Ecosystem, Market Size, Market Segmentation, Growth Drivers, Competitor Landscape, Future Outlook, Research Methodology, TOC, FAQs. |
| H3 Pattern | Cold Storage Market Size, Cold Transport Market Size, Revenue by End User, Revenue by Region, Major Market Players, Forecast Assumptions. |

---

## 43. GEO and AI Ranking PRD

The page should be readable by AI search engines and answer engines. Every page should contain direct answer blocks and a visible Report Facts section.

| Required Answer Block | Purpose |
|---|---|
| What is the market size? | Extractable size answer for AI and search snippets. |
| What is the forecast value? | Extractable future outlook. |
| What is the CAGR? | Extractable growth answer. |
| Which segments are covered? | Help AI classify report scope. |
| Which companies are covered? | Help buyer and AI understand competitor coverage. |
| What are the growth drivers? | Extractable industry analysis. |
| What are the key challenges? | Extractable risk and challenge view. |
| What does the report include? | Support conversion and AI recommendations. |
| What methodology was used? | Trust-building and quality signal. |
| Who should buy this report? | Buyer qualification and LLM recommendation support. |

**Report Facts example:**
```
Market: Australia Cold Chain Market
Market Size: AUD 6,547.8 Mn, 2022
Forecast: AUD 10,705.0 Mn, 2027
CAGR: 10.03%, 2022-2027
Segments: Cold Storage, Cold Transport, Meat & Seafood, Fruits & Vegetables, Pharmaceuticals
Report Type: Market Intelligence Report
```

- Use direct sentences and avoid vague intros.
- Keep numbers visible in HTML text; do not place all data only in images.
- Add chart captions, dataset labels and methodology notes.
- Use consistent market naming across title, H1, answer blocks, schema and FAQs.
- Keep FAQs visible and not fully hidden behind interactions.

---

## 44. Schema PRD

Structured data should help search engines understand the page and its components. Product structured data can enable product-information enhancements in Search. Dataset structured data can describe datasets with fields such as name, description, distribution, temporal coverage and spatial coverage. FAQPage markup should be used only for visible FAQ content.

| Schema Type | Use in V1 Product Page |
|---|---|
| Organization | Ken Research entity details. |
| WebSite | Site-level search and brand structure. |
| WebPage | Report page identity. |
| BreadcrumbList | Breadcrumb trail. |
| Product | Report product metadata, SKU/product code, brand and offer/inquiry data. |
| CreativeWork / Report | Report-like content object when applicable. |
| Dataset | Dataset preview and structured market dataset descriptions. |
| FAQPage | Visible FAQs. |
| Paywalled Content | Locked charts, datasets, forecast assumptions and competitor tables using CSS selector classes. |

```json
{
  "@type": "WebPageElement",
  "isAccessibleForFree": false,
  "cssSelector": ".kr-paywall-chart"
}
```

---

## 45. Conversion PRD

Conversion must be contextual. The same CTA cannot be placed everywhere without logic. The CTA should match user intent at the point of reading.

| Location | CTA |
|---|---|
| Hero | Download Sample Report / Talk to Analyst |
| Stats Strip | Unlock Full Dataset |
| Market Size | Download Sample Report |
| Segmentation | Request Customization |
| Competitor Analysis | Talk to Analyst |
| Forecast | Unlock Forecast Data |
| Methodology | Download Sample Report |
| TOC | Preview Full TOC |
| Final Block | Get Report Access |

- CTA hierarchy: Download Sample Report, Talk to Analyst, Get Customized Report, Buy Now.
- CTA variants: Unlock Report Preview, View Full Dataset, Get Forecast Data, Preview Full TOC, Buy Full Report.

---

## 46. Lead Form PRD

| Form Type | Fields |
|---|---|
| Sample Download | Full name, business email, phone, company, designation, country, requirement note. |
| Dataset Unlock | Full name, business email, company, use case, dataset needed. |
| Analyst Call | Full name, business email, phone, company, business question, preferred call time. |
| Customization | Geography required, segment required, competitors required, forecast period, deadline, budget range optional, business objective. |
| Hidden fields | report_title, product_code, page_url, cta_location, chart_id, section_name, access_trigger, UTM source/medium/campaign, referrer, device, session_id, interaction_count. |

---

## 47. Analytics PRD

Analytics must measure the research interaction layer, not just page views and form submissions.

| Event | Trigger |
|---|---|
| product_page_view | Page load. |
| hero_chart_interaction | User toggles or hovers hero chart. |
| stat_card_click | User clicks a key stat card. |
| chart_filter_change | User changes chart filter/toggle. |
| dataset_preview_click | User opens dataset preview. |
| dataset_unlock_click | User attempts to unlock dataset. |
| info_wall_triggered | Metered interaction limit reached. |
| lead_wall_triggered | Form gate displayed. |
| paywall_triggered | Paid access gate displayed. |
| sample_cta_click | Sample CTA clicked. |
| analyst_cta_click | Analyst CTA clicked. |
| customization_cta_click | Customization CTA clicked. |
| form_start | First form field interaction. |
| form_submit | Successful form submission. |
| toc_expand | TOC chapter expanded. |
| faq_expand | FAQ expanded. |
| section_nav_click | Sticky navigation clicked. |
| related_report_click | Related report clicked. |
| scroll_depth | 25/50/75/100 percent scroll depth. |

**Event properties:** `report_title, product_code, industry, region, section_name, chart_id, cta_location, access_level, user_status, interaction_count, UTM source and device type.`

---

## 48. Performance PRD

| Metric | Target |
|---|---|
| LCP | Under 2.5 seconds |
| CLS | Under 0.1 |
| INP | Under 200ms |
| Mobile PageSpeed | 80+ |
| Desktop PageSpeed | 90+ |

- Lazy load below-fold charts and infographics.
- Use static fallback before chart hydration.
- Load only required chart components, not the entire library upfront.
- Compress images and use WebP/AVIF.
- Avoid unnecessary animations.
- Server-render SEO-critical text and schema.
- Do not render key content only client-side.

---

## 49. Accessibility PRD

| Area | Requirement |
|---|---|
| Charts | Title, description, data table fallback, keyboard controls, tooltip labels, contrast and screen-reader summary. |
| Forms | Visible labels, error messages, focus states, consent text and keyboard navigation. |
| Content | Proper heading hierarchy, text contrast, alt text, infographic captions and no information conveyed by color only. |
| Tables | Responsive behavior, header rows and readable mobile cards if table is too wide. |
| Locked content | Accessible lock message and clear CTA, not just visual blur. |

---

## 50. QA Checklist

| QA Area | Checklist |
|---|---|
| Content QA | Report title, market size, forecast value, CAGR, base year, forecast year, segment names, company names, TOC, FAQs, no duplicate sections, no placeholder text, grammar reviewed. |
| Data QA | Chart values match source, dataset values match chart, units consistent, currency consistent, percentage totals checked, forecast years correct, tooltips accurate, locked rows correctly hidden. |
| UX QA | Hero renders properly, sticky nav works, empty sections hidden, charts interactive, dataset preview works, info-wall triggers, paywall triggers, mobile CTA works, forms submit. |
| SEO QA | H1 once, title, meta, canonical, schema valid, FAQ visible, market size visible, forecast visible, internal links present, images have alt text, page indexable. |
| Performance QA | Images optimized, lazy loading active, no layout shift, mobile speed acceptable, non-critical scripts deferred. |
| Access QA | Public/locked states correctly applied, meter count works, lead-unlocked state works, paid state protected. |

---

## 51. Acceptance Criteria

1. The Australia Cold Chain page can be built as the full master template.
2. Lighter reports can render without broken sections.
3. Text-heavy content looks structured, premium and readable.
4. Every major section can support a chart, dataset, stat card, table or infographic.
5. Ken chart library is integrated into product-page modules.
6. Hero includes an interactive intelligence preview.
7. Info-wall works after defined interaction limit.
8. Chart-level paywall works.
9. Django CMS supports modular section creation.
10. SEO title, meta, headings, schema and AI answer blocks are programmatically supported.
11. Public content remains indexable and valuable.
12. Gated content is properly marked.
13. Mobile experience is clean and conversion-ready.
14. Lead forms pass report, CTA, chart and section context.
15. Analytics track chart, stat, dataset, CTA and paywall interactions.

---

## 52. Implementation Roadmap

| Phase | Scope |
|---|---|
| Phase 1 - Foundation | New page shell, interactive hero, key stats strip, sticky navigation, modular section renderer, CTA system, Django CMS module registry. |
| Phase 2 - Research Modules | Executive summary, report scope, market overview, definitions, taxonomy, ecosystem, methodology, TOC and FAQ. |
| Phase 3 - Chart and Dataset Layer | Ken chart library integration, market size chart, forecast chart, segmentation charts, competitor charts, dataset preview and chart card standard. |
| Phase 4 - Info-Wall and Paywall | Metered interactions, info-wall, lead-wall, paywall overlay, access-level rules and unlock tracking. |
| Phase 5 - SEO/GEO/GXO Layer | Programmatic title/meta, AI answer blocks, schema, dataset markup, paywall markup, internal linking and FAQ optimization. |
| Phase 6 - Pilot Rollout | Australia Cold Chain, India Energy Bar, India Confectionery, Global Automatic Transmission, Al Fujairah Taxi Service, Italy Agricultural Machinery, India Watch, Singapore Medical Clinics, India Electric Bike Over-the-Counter. |
| Phase 7 - Scale | CMS training guide, report ingestion SOP, data extraction checklist, SEO QA checklist, chart QA checklist and rollout to priority report categories. |

---

## 53. Final Definition of Success

The new V1 page should NOT feel like a CMS-generated report page. It should feel like a premium intelligence interface where every section has a job: text explains, stats prove, charts engage, datasets build trust, infographics simplify, methodology validates, CTAs convert, schema and structure rank, paywall monetizes and CMS scales.

This rebuild should become the foundation for Ken Research's next-generation report store and intelligence-led SEO architecture.

---

## 54. Reference Sources

1. Uploaded Australia Cold Chain Market report document: `Geetanshi_Australia Cold Chain Market Report.pdf`. Used for module coverage, market facts, taxonomy, ecosystem, market size, segmentation, competitor and methodology references.
2. Ken Research live Australia Cold Chain product page. Used to validate current V1 structure, metadata, CTAs, tab structure and visible market facts. URL: https://www.kenresearch.com/australia-cold-chain-markets
3. Ken Charts Storybook reference shared by the project team. URL: https://ken-charts.netlify.app/?path=/story/charts-areachart--basic
4. Google Search Central: Influencing Title Links in Google Search. URL: https://developers.google.com/search/docs/appearance/title-link
5. Google Search Central: How to Write Meta Descriptions. URL: https://developers.google.com/search/docs/appearance/snippet
6. Google Search Central: Subscription and Paywalled Content Markup. URL: https://developers.google.com/search/docs/appearance/structured-data/paywalled-content
7. Google Search Central: Intro to Product Structured Data. URL: https://developers.google.com/search/docs/appearance/structured-data/product
8. Google Search Central: Dataset Structured Data. URL: https://developers.google.com/search/docs/appearance/structured-data/dataset
9. Google Search Central: FAQPage Structured Data. URL: https://developers.google.com/search/docs/appearance/structured-data/faqpage
