# CB Insights — Page-Level UX Deep-Dive
_Audit date: 2026-04-28._

---

## Summary Verdict

CB Insights is the most product-sophisticated firm in the entire 20-company competitive set for Ken Research. Its UX is built on three interlocking pillars that no Tier A competitor has attempted: (1) workflow-first product framing that sells what you *do* not what you *get*, (2) free editorial as the top-of-funnel that builds trust before any sales contact, and (3) predictive intelligence as the category-defining differentiator that makes all company data feel proprietary even when the underlying sources are public. The homepage is clean and outcome-led; the product pages are the best workflow-framing examples in the category; the research hub is genuine thought-leadership distribution. Weaknesses are real: pricing is fully hidden, the 10-day trial is gated enough that exploration requires commitment, and the company profile pages show a tiered-access model that frustrates anonymous discovery. But the signal-to-noise ratio across the entire site is exceptional.

**Design maturity: 4.5/5.** CB Insights punches above a ~$80M revenue company because design is a deliberate strategic choice, not a cost center.

---

## Pages Audited

| # | Page | URL | Status |
|---|---|---|---|
| 1 | Homepage | https://www.cbinsights.com | 200 |
| 2 | Product overview | https://www.cbinsights.com/what-we-offer/ | 200 |
| 3 | Strategy Terminal product | https://www.cbinsights.com/what-we-offer/strategy-terminal/ | 200 |
| 4 | ChatCBI feature | https://www.cbinsights.com/what-we-offer/chatcbi/ | 200 |
| 5 | Team of Agents feature | https://www.cbinsights.com/what-we-offer/team-of-agents/ | 200 |
| 6 | Data products | https://www.cbinsights.com/what-we-offer/data/ | 200 |
| 7 | Integrations / MCP | https://www.cbinsights.com/what-we-offer/integrations/ | 200 |
| 8 | Pricing | https://www.cbinsights.com/what-we-offer/pricing/ | 200 |
| 9 | Research / editorial hub | https://www.cbinsights.com/research/ | 200 |
| 10 | Company profile — OpenAI | https://www.cbinsights.com/company/openai | 200 |
| 11 | Company profile — Tesla | https://www.cbinsights.com/company/tesla | 200 |
| 12 | Company profile — Anthropic | https://www.cbinsights.com/company/anthropic | 200 |
| 13 | Trial/signup flow | https://www.cbinsights.com/trial-signup | 200 |
| 14 | Footer (scraped from homepage) | https://www.cbinsights.com | 200 |
| 15 | Customer stories | https://www.cbinsights.com/customer-stories/ | 404 |
| 16 | M&A solutions | https://www.cbinsights.com/what-we-offer/solutions/ma/ | 404 |
| 17 | AI topic hub | https://www.cbinsights.com/research/artificial-intelligence/ | 200 |

---

## Page-by-Page

---

### Page 1 — Homepage
**URL:** https://www.cbinsights.com

**Above-the-fold composition (desktop):**
Sparse, high-signal top-navigation: Logo left, five mega-menu items (AI & Agents / Data / MCP & Integrations / Solutions / Research / Pricing), then right-side utility trio: "Contact sales" (text link) | "Log in" (text link) | "Start free trial" (filled button). Below nav: full-width hero with headline in large type, subheadline in smaller type, and a trust-badge row of 7 quantified client-market statements. No hero image — the trust badges *are* the visual anchor.

**Exact hero copy:**
- Headline: "Predictive intelligence on private companies"
- Subheadline: "How corporate strategy and deal teams see opportunity – before the market does"

**Trust badge row (exact copy):**
"10 largest businesses" | "All of the Big 4" | "86% of software companies" | "4 largest cloud providers" | "26 of 30 largest banks" | "4 largest pharma companies" | "All 5 FAANG companies"

**Above-the-fold composition (mobile):**
Hamburger nav collapses all menus. Hero headline and subheadline preserved. Trust badge row likely scrollable. "Start free trial" button remains prominent. No search bar on either breakpoint.

**Primary CTA:** "Start free trial" — top-right navigation (filled blue button) and repeated in hero body. Visual weight: high — only filled button in nav bar.

**Secondary CTAs:** "Contact sales" (text, top-right, lower weight); "Request pricing" (on pricing page).

**Information density:**
High but progressive. Above-the-fold is deliberately sparse — headline, sub, trust badges. Density increases as you scroll: feature tabs, agent demonstrations, customer outcome metrics (2.8x more acquisitions / 6x more investments / 4.5x more partnerships), logo carousel (Microsoft, 3M, Manulife, Wells Fargo), testimonials with named outcomes ("$100M+ deal," "$120 million opportunity"), integration logos (12+), solution areas (9), data category cards (15+).

**Trust signals:**
- Quantified market-share claims in badge row (not "we serve Fortune 500" — specific percentages and counts)
- Named clients: Microsoft, 3M, Wells Fargo, ADP, FAANG
- Outcome metrics tied to platform use (2.8x / 6x / 4.5x)
- Specific dollar deal outcomes from named-company testimonials
- "70% faster revenue growth than peers" for customers
- April 2026 product update (native Claude + ChatGPT integration via MCP) — freshness signal

**Free-vs-gated boundary:**
Free on homepage: everything visible. Gate appears at trial signup (form + 10-day trial). No freemium tier — the free access is time-limited trial.

**Lead-capture friction:**
Low intention-signal to medium friction: "Start free trial" is the primary path. Trial signup requires form submission (email + company fields implied by HubSpot tracking). No social login. "Contact sales" is a secondary path for enterprise qualification.

**UX moves worth stealing:**
1. **Outcome-first trust badges**: The badge row ("10 largest businesses," "All of the Big 4") is not a logo carousel — it's a statistical claim of market penetration. Ken Research could adapt this to: "Used by [X] of the top [Y] strategy consulting firms" or "Cited in [Z] investment memos."
2. **Subheadline framing as buyer persona**: "How corporate strategy and deal teams see opportunity — before the market does" is not a feature description; it is a self-recognition moment for a specific buyer type. The subheadline does persona qualification without a persona page.
3. **Outcome metrics as social proof**: "2.8x more acquisitions" is more credible than a testimonial quote because it's a measured result. Ken Research could develop: "Clients who use Ken Research reports for market entry decisions reduced vendor evaluation time by X%."
4. **Progressive density**: Sparse above-the-fold → dense feature sections → sparse testimonial quotes → dense integration catalog. Rhythm prevents fatigue.
5. **April 2026 "connects natively to Claude and ChatGPT" banner**: Timely freshness signals tied to real product releases create urgency without fake countdowns.

**UX failures or trade-offs:**
- No search bar on homepage — a 3M+ company database with no entry point on the home page forces users into the trial to discover the search experience
- Trust badges are text-only — a visual chart or credential mark would land harder for first-time visitors
- No free tier: the only access path is a time-limited trial, which is higher friction than Crunchbase's permanent free tier

**One-line verdict:** Best-in-class B2B SaaS homepage for research/intelligence; the outcome-led trust badges and progressive density are the receipts.

---

### Page 2 — Product Overview
**URL:** https://www.cbinsights.com/what-we-offer/

**Above-the-fold composition (desktop):**
Clean product catalog organized by category: AI & Agents tools (Strategy Terminal, Mobile app, Browser Extension, Team of Agents), Data (Predictive / Financial / Market / Firmographic / Primary Research / Contextual), MCP & Integrations (API, MCP, Snowflake, Salesforce, Copilot).

**Primary CTA:** "Start free trial" (persistent nav).

**Workflow-first framing:**
Products are organized by function first, then capability. The hierarchy is: *what you're trying to do* → *which tool does it* → *what data powers it*. This is the opposite of Tier A competitors who list data categories first.

**Key product descriptions (exact copy):**
- Strategy Terminal: "Predictive AI web app for company discovery, analysis, and tracking"
- Mobile app: "Predictive AI on your phone"
- Browser Extension: "Analyzes companies (and more) while you view their website"
- Team of Agents: "for company scouting, due diligence, new business acquisition, M&A"
- ChatCBI™: "Strategy LLM powered with our predictive data and analysis"

**Data hierarchy (notable):**
The data taxonomy goes: Predictive (Mosaic Score, Commercial Maturity, Exit Probability) → Financial (funding, valuations, revenues) → Foundational (taxonomies, firmographics, patents). Putting "Predictive" first in the data hierarchy is a positioning statement — it says "we don't just have data, we have *conclusions from data*."

**Trust signals:** Client logo row; "Double verified" data quality claim; 11M+ companies; 1,600+ markets.

**Free-vs-gated:** Full platform requires trial/subscription. Data access not previewed on this page.

**Information density:** Medium — catalog-style layout, not heavy prose.

**UX moves worth stealing:**
1. **Capability hierarchy that leads with outcomes**: Predictive → Financial → Foundational is a deliberate hierarchy that puts the AI/insight layer first. Ken Research should consider a similar inversion: "Intelligence" (analysis, forecasts, recommendations) before "Data" (raw tables, charts, market sizing) in product IA.
2. **Tool catalog framed by use case, not technology**: "Team of Agents for M&A" is more motivating than "AI agent with 11 modules."

**UX failures:** No pricing visible on the product overview page — forces a separate pricing click.

**One-line verdict:** Excellent workflow-first catalog; the Predictive → Financial → Foundational data hierarchy is the smartest data positioning taxonomy in the competitive set.

---

### Page 3 — Strategy Terminal (Feature Deep-Dive)
**URL:** https://www.cbinsights.com/what-we-offer/strategy-terminal/

**Above-the-fold composition (desktop):**
Hero with headline, trust claim, product screenshot. The headline "Your next move, first" is arguably the strongest positioning line on the site — it compresses the entire value proposition (speed + foresight + competitive advantage) into five words.

**Exact headline:** "Your next move, first"

**Core workflow structure (six domains):**
1. Companies: "Source & analyze 11M+ private companies"
2. Markets: "Intelligence across over 1,600 tech markets"
3. Competitors: "Real-time visibility into competitor investments, acquisitions, and partnerships"
4. AI Tools: "Purpose-built agents that translate predictive signals into exact outputs"
5. Alerts: "All signal, no noise"
6. Research: "Expert analyst-led insights integrated with predictive intelligence"

**Jobs-to-be-done language (exact copy):**
- "Spot breakout companies early"
- "back the right ones faster"
- "Discover where growth is forming, not where it's already priced in"
- "Spot emerging companies and partnerships before anyone else"

**Trust signals:** "Top 10 Fortune 500 firms trust CB Insights"; logo row; product screenshot.

**Pricing signals:** None visible. Directs to `/what-we-offer/pricing/` for pricing; 10-day free trial offered.

**UX moves worth stealing:**
1. **"Your next move, first"** — Five-word headline that contains speed, sequence, and competitive advantage. Ken Research should aim for this compression in product page heroes: something like "The market view others won't have until next quarter."
2. **Six workflow domains framing**: Structuring a product page around what the user *does* in the tool (Companies / Markets / Competitors / AI Tools / Alerts / Research) rather than what the tool *contains* is the workflow-first pattern that separates CB Insights from every Tier A competitor.
3. **"All signal, no noise" for Alerts**: Acknowledges the core anxiety of a monitoring product (too many notifications) and resolves it in four words.

**UX failures or trade-offs:**
- Product screenshots in hero are small and not interactive — a live demo widget would reduce time-to-understanding
- The six workflow domains have varying depth; "AI Tools" section is less developed than "Companies"

**One-line verdict:** The best workflow-first product page in the competitive set; "Your next move, first" is a five-word brand statement that Ken Research should study as a headline benchmark.

---

### Page 4 — ChatCBI (AI Feature Deep-Dive)
**URL:** https://www.cbinsights.com/what-we-offer/chatcbi/

**Above-the-fold composition (desktop):**
Hero with tagline, brief value prop, and CTA. AI feature is introduced as a research partner, not a chatbot.

**Exact headline/tagline:**
- "The fastest, most powerful way to research markets and companies"
- "Tomorrow's research partner. Available today."
- Value prop: "combining all our unique insight and data with the creativity of generative AI"

**Key capabilities (exact copy):**
- Magic Mode: "automates complex workflows like M&A analysis and competitive intelligence through preset use cases"
- Predictive Sourcing: "converts natural language queries into filtered searches across 11M+ companies using 60+ parameters"
- Data Integration: "upload documents (DOCX, PDF, PowerPoint) and blend personal research with CB Insights' database"
- API Access: "internal AI systems to 'call' ChatCBI as an expert agent via their Business Graph spanning 10 million companies"

**Natural language search positioning:**
"Predictive Sourcing" is the NL search feature. It's not called "search" — it's called "Predictive Sourcing," which positions the NL query as a forward-looking discovery action, not a lookup. This is deliberate framing: you're not searching for what exists, you're sourcing what to watch.

**AI integration model:**
ChatCBI is not a standalone chatbot — it is: (a) embedded in Strategy Terminal as a research assistant, (b) available via API for third-party LLM systems, (c) deployable in Microsoft 365 Copilot, Snowflake, and Salesforce. This is "AI as infrastructure" positioning, not "AI as interface."

**Trust signals:** Customer testimonial: "Wow — What you'll say after using it" (deliberately vague but memorable).

**Primary CTA:** "Start free trial" (10-day, frictionless entry).

**UX moves worth stealing:**
1. **"Predictive Sourcing" as NL search brand name**: Naming the natural language query feature something other than "search" elevates it from utility to methodology. Ken Research could brand its NL market query as "Market Scan" or "Sector Probe" to differentiate from generic search.
2. **"Magic Mode" for preset workflows**: Pre-built query templates named for the outcome (M&A analysis, competitive intelligence) lower the barrier for new users who don't know how to query. Ken Research's report store should have "Quick Briefs" for common use cases (market entry, competitor scan, sector overview).
3. **AI as infrastructure, not interface**: ChatCBI is positioned as something you plug into your existing tools (Copilot, Snowflake, Salesforce), not a new UI you have to learn. Ken Research should consider API/MCP access to its market data as a product tier.

**UX failures:**
- "Wow — What you'll say after using it" testimonial is clever but zero-information; it tells you nothing about what ChatCBI actually does for a user
- No live demo or interactive preview of the NL query capability on the feature page

**One-line verdict:** ChatCBI's integration model (AI as infrastructure) is more sophisticated than any Tier A competitor's "AI" branding; the naming of "Predictive Sourcing" is a masterclass in positioning generic NL search as a proprietary capability.

---

### Page 5 — Team of Agents (Feature Deep-Dive)
**URL:** https://www.cbinsights.com/what-we-offer/team-of-agents/

**Above-the-fold composition (desktop):**
Primary positioning: "Insights are good. Action is better." — this is the central UX philosophy of the agents product. Agents are not analytical tools; they are action-generating tools.

**Agent catalog (11 agents, exact names):**
1. ChatCBI™ — General-purpose research LLM with API/MCP access
2. Personal Briefing — Monitors news; surfaces opportunities/threats
3. Sales Account Planner — Account prioritization and competitive intel for sales reps
4. Partner & New Business Finder — Detects partnership opportunities from funding/competitor signals
5. Commercial Due Diligence Accelerator — "Turns weeks into hours" for due diligence
6. Acquisition Hunter — Identifies early-stage disruptors and acquisition-ready targets
7. Deep Analyst — "Generates presentation-ready research reports on any company/market"
8. Competitive Sentinel — Tracks competitor acquisitions, investments, strategic moves
9. Earnings Analyst — Analyzes public company earnings calls; "CEO-ready summaries"
10. Business Relationship Analyst — Maps customer/vendor/partner relationships
11. Scouting Report — "Produces analyst-grade SWOT analyses on command"

**Deployment options:**
CB Insights Strategy Terminal | Microsoft 365 Copilot | Snowflake | API & custom integrations

**Primary CTA:** "Request a demo" (not "Start free trial" — agents are positioned as enterprise, not self-serve).

**Information density:** Medium-high. Each agent described in 1-2 sentences. Clean grid layout.

**Free-vs-gated boundary:** Agents appear to be an enterprise/paid feature. The CTA shift from "Start free trial" to "Request a demo" is the clearest gating signal on the site.

**UX moves worth stealing:**
1. **Named agents with specific job titles**: "Deep Analyst," "Competitive Sentinel," "Acquisition Hunter" are named like team members, not software features. This is the "hiring someone to do this job" mental model. Ken Research should apply this to report bundles: "Sector Monitor," "Entry Analyst," "Competitor Watch" as named service types within a subscription.
2. **"Turns weeks into hours"** for Commercial Due Diligence: Time-compression claims are the strongest value-prop language in a research context. Ken Research should quantify time savings on its homepage.
3. **"Presentation-ready research reports"** for Deep Analyst: The output format (ready to present) is the trust signal — not the quality of analysis, but the deliverability. Ken Research's reports should emphasize the format/usability as much as the content quality.

**UX failures:**
- No screenshots or demo of any agent in action on the page — purely descriptive
- CTA shift to "Request a demo" creates a significant friction increase for users who arrived on the self-serve "Start free trial" path

**One-line verdict:** The agent naming convention ("Deep Analyst," "Acquisition Hunter") is the strongest product-as-service framing in the competitive set — steal this architecture for Ken Research's report service tier branding.

---

### Page 6 — Pricing
**URL:** https://www.cbinsights.com/what-we-offer/pricing/

**Above-the-fold composition:**
Three-tier product catalog with no prices shown. All tiers require "Request pricing" form submission.

**Visible tier structure:**
| Tier | Name | Target | CTA |
|---|---|---|---|
| 1 | Browser Analyst | Sales users | "Request pricing" |
| 2 | Strategy Terminal | Enterprise strategy/deal teams | "Request pricing" |
| 3 | Data Solutions | API/integration buyers | "Request pricing" (consumption-based noted) |

**What is visible without requesting pricing:**
- Tier names and one-line descriptions
- Feature bullet lists per tier (substantial — 5-8 items per tier)
- Trial offer: "Access the most powerful market intelligence for 10 days – free of charge"
- No pricing anchors, no "starts at," no price ranges

**Free-vs-gated boundary:**
The pricing page itself is not gated — the prices are. This is a deliberate sales qualification strategy: you see what you'd get, but not what it costs.

**Trial terms:** 10 days, full platform access, "free of charge" — but requires signup (form submission).

**Notable gating pattern:**
CB Insights uses a two-stage gate: first, trial signup captures the lead; second, pricing requires sales contact. This is more aggressive gating than Crunchbase (which shows partial pricing) but less aggressive than Tier A competitors (who gate the trial itself behind an analyst call).

**UX moves worth stealing:**
1. **Feature-rich tier pages with no prices**: The feature lists are detailed enough to qualify buyers without pricing — you can evaluate fit before raising your hand. Ken Research should show subscription feature lists (reports per month, analyst access, API calls) without showing prices, as a middle ground between full transparency and full opacity.
2. **10-day trial as the price anchor**: By offering a free trial, CB Insights shifts the conversation from "how much does it cost?" to "does it work for me?" — a much better sales qualification question.

**UX failures:**
- "Request pricing" on all three tiers creates the same friction as Tier A competitors — the feature lists are visible but the commitment required to get pricing is identical to a sales-first model
- No pricing range hints, no "teams under 10 users" guidance — buyers can't self-qualify

**One-line verdict:** Pricing is the one area where CB Insights is indistinguishable from Tier A competitors — fully hidden, fully sales-qualified, no self-serve path to a number.

---

### Page 7 — Research / Editorial Hub
**URL:** https://www.cbinsights.com/research/

**Above-the-fold composition (desktop):**
Hero section with headline "Research that reveals what's next" and subheadline: "Exclusive, data-driven research on emerging tech and the future of industries. Stay ahead of trends. Dig into your rivals' strategies. Identify the best companies."

Below hero: six topic tiles (AI Agents, Climate Tech, Enterprise Tech, Fintech, GenAI, Insurtech) — these are the primary content verticals. Below tiles: featured reports section, then upcoming webinars, then filterable all-research grid.

**Content types visible:**
- Quarterly State of [X] reports (State of Venture Q1'26, State of AI Q1'26, State of Fintech Q1'26, State of Digital Health Q1'26)
- Strategy Maps (e.g., "Book of Strategy Maps: The companies building tomorrow's AI ecosystems")
- Research Briefs
- Webinars (live and recorded)
- Conferences

**Filter system:**
Technologies | Industries (60+ listed, from Aerospace Tech to Wealth Tech) | Types (Webinar / Report / Research Brief / Conference). This is a proper taxonomy-based filter, not just tag clouds.

**Gating model:**
The hub listing page is fully free. Clicking into individual reports likely triggers a registration/trial gate (email capture for downloads, trial signup for full access). The hub functions as a free discovery layer — you browse titles and summaries without signing in.

**Lead capture:** "Start free trial" in nav. No inline email capture on the hub listing page. Webinars have "Register Now" and "Get the recording" CTAs inline.

**Content volume indicator:**
"Load more" pagination; 23+ AI-topic items visible on the AI sub-hub; implies 200+ total research items across all categories.

**Notable free content:**
State of Venture Q1'26 preview snippet visible: "Quarterly funding hit a record $286B. Exits declined to a two-year low." This is a headline data point — enough to make the report desirable, not enough to replace it.

**UX moves worth stealing:**
1. **Quarterly "State of [Category]" report series**: Named report series with consistent cadence (Q1/Q2/Q3/Q4) build anticipation and habit. Ken Research should develop a "State of [Sector]" quarterly series for its top 10 verticals — consistent naming, consistent structure, consistent cadence.
2. **Six-topic tile navigation**: Rather than a flat 60-category list, the six tiles (AI Agents / Climate Tech / Enterprise Tech / Fintech / GenAI / Insurtech) function as editorial editorial bets — CB Insights is saying "these are the six categories worth your attention." Ken Research's research hub should have 5-8 curated topic tiles reflecting its strongest verticals.
3. **Preview headline data point**: The one-line preview ("$286B, record quarter") functions as a free sample that drives report downloads without giving away the report. Ken Research should add one-line data previews to all report catalog cards.
4. **Webinar series as editorial product**: Webinars with named titles and dates create recurring touchpoints that function as a newsletter substitute — they bring users back to the site on a schedule.

**UX failures:**
- No bylines on report cards — who is the analyst? CB Insights deliberately anonymizes research (it's "institutional" not "individual"), but this reduces the personal trust signals that drive downloads
- No reader count, download count, or social proof on individual report cards
- The hub navigation (Technologies / Industries / Types) uses dropdowns, not faceted filters — you can only filter by one dimension at a time

**One-line verdict:** The best free editorial hub in the competitive set; the quarterly "State of" series and six-tile topic navigation are directly transferable patterns for Ken Research's research hub redesign.

---

### Page 8 — Long Editorial Piece (Research Hub article)
**URL:** https://www.cbinsights.com/research/ (AI hub: https://www.cbinsights.com/research/artificial-intelligence/)

**Note:** Direct URLs to individual CB Insights research reports redirected to the hub listing page, suggesting reports require login/trial to access full content. The hub listing page itself is fully accessible.

**Visible above-the-fold on AI hub:**
- Featured: "State of AI Q1'26 Report"
- Featured webinar: "Meet the 2026 AI 100" (May 5, 2 PM EDT)
- Content grid: 23+ items spanning Jan–Apr 2026

**Gating model for individual reports:**
Based on the hub's CTA structure and trial framing ("Start free trial to access research"), full reports require login. The preview layer (title + 1-2 sentence summary) is free; the report body is gated.

**Content format inside reports (inferred from previews):**
- Data-led headline statistics (e.g., "$286B quarterly funding")
- Named company rankings (AI 100, State of Venture)
- Market maps (visual ecosystem maps)
- Trend charts (funding by stage, geography)
- Expert commentary

**UX moves worth stealing:**
1. **AI 100 list as annual franchise content**: The "AI 100" (and sector equivalents) is a recurring list-based report that generates significant organic traffic and brand authority. Ken Research should create annual "Top 50 [Sector] Companies to Watch" reports as SEO-anchored free content.
2. **Market maps as visual editorial**: CB Insights' ecosystem maps (e.g., "companies building tomorrow's AI ecosystems") are visual assets that get shared, cited, and embedded. Ken Research's market sizing research is currently text/table-heavy — adding one shareable visual map per major report would dramatically increase distribution.

**One-line verdict:** Individual reports are gated behind trial; the free preview layer (title + stat) is the minimum viable content distribution unit.

---

### Page 9 — Company Search / Data Discovery
**URL:** https://www.cbinsights.com/company/ (inferred from profile URL structure)

**Note:** Dedicated search page (cbinsights.com/search) returned 404. Discovery appears to happen through the Strategy Terminal (authenticated) or through the research hub topic pages (editorial path). There is no public-facing company search page analogous to Crunchbase's open search.

**Free discovery model:**
Company profiles at `/company/[slug]` are partially public. The discovery path for unauthenticated users is:
1. Find a CB Insights mention in editorial content (research reports, news)
2. Follow the link to a company profile page
3. See partial data; hit a gate for full access

This is a SEO-driven discovery model: CB Insights' 11M company profiles create a massive long-tail SEO surface area, each profile acting as a landing page for search queries about specific companies.

**Natural language search (NL):**
"Predictive Sourcing" (ChatCBI feature) converts NL queries into structured searches across 11M+ companies using 60+ parameters. This is authenticated-only. The homepage has no search bar — all NL search lives behind the trial gate.

**UX moves worth stealing:**
1. **Company profile SEO as acquisition channel**: 11M public-facing profiles at predictable URL slugs creates a massive organic traffic surface. Ken Research should create public-facing market report pages at predictable URLs (e.g., `/market/ai-chips-southeast-asia/`) that function as organic landing pages.
2. **"Predictive Sourcing" as the NL search name**: Position the research query interface as a sourcing/discovery action, not a search action.

**UX failures:**
- No public-facing company search — users who want to "look up a company" have no entry point without a trial
- All advanced filtering lives behind authentication

**One-line verdict:** CB Insights has no public search experience — all discovery is either SEO-driven (company profile pages) or authenticated (Strategy Terminal); this is a deliberate gating choice that makes the trial the only full discovery path.

---

### Page 10 — Company Profile (OpenAI)
**URL:** https://www.cbinsights.com/company/openai

**Above-the-fold composition (desktop):**
Company header with logo, name, basic vitals in a scorecard format. Tab navigation: Overview & Products | Financials | People | Alternatives & Competitors. Mosaic Score health indicator prominently positioned ("+15 points in past 30 days" for Anthropic profile).

**Freely visible data (no login):**
- Founded year, stage, headquarters, website
- Total raised ($66.455B for Anthropic)
- Most recent funding round ($5B, 9 days prior for Anthropic)
- Company description (paragraph-length)
- Named competitors (6-7 entries with brief descriptions)
- Patent count and top topics
- Number of CB Insights research briefs mentioning the company (74 for Anthropic)
- News feed (multilingual articles)
- Expert Collections membership (e.g., "Unicorns - Billion Dollar Startups," "Generative AI 50")

**Gated content (requires login/demo):**
- Revenue/valuation figures (shown as "$0000 View" — deliberately obfuscated)
- Mosaic Score full methodology
- Complete investor list ("Google, Amazon...and 168 more")
- Full Financials tab
- Full People tab
- Detailed patent analysis chart
- Full research brief content (75 briefs listed, full access gated)

**Information density:** Medium on free tier. The profile has structure and substance without overwhelming — 5-6 sections, each with meaningful free data. The Mosaic Score direction (+/-X points in 30 days) is free; the number itself is gated.

**UX design of the gate:**
The "$0000 View" treatment for revenue/valuation is clever and slightly cruel — you know the data exists, the shape of it is hinted (4-digit number?), and the "View" link drives trial conversion. This is more effective than a hard paywall because it creates curiosity.

**UX moves worth stealing:**
1. **"$0000 View" progressive disclosure gate**: Show the field label and obfuscate the value rather than hiding the field entirely. This creates data hunger. Ken Research's gated report previews should show methodology, structure, and data headers — but gate the actual numbers.
2. **Mosaic Score direction without the value**: Showing "company health is improving" (direction) without the absolute score (number) is a clever partial-reveal that creates conversion motivation. Ken Research could show "market size estimate is available" without showing the number.
3. **Expert Collections as context**: The collections ("Unicorns," "Generative AI 50") give a company profile a sense of belonging within a larger intelligence universe — it's not just data, it's curation. Ken Research could create named collections: "Top 20 Battery Storage Companies," "Southeast Asia AI Leaders."

**UX failures:**
- The Financials and People tabs are labeled but non-functional for unauthenticated users — showing empty tabs creates a worse UX than hiding them
- Company profile URL at `/company/[slug]` doesn't always match company name conventions (apple → `apple` returns a fruit company, `apple-inc` returns Apple proper), suggesting inconsistent slug management

**One-line verdict:** The best partial-reveal company profile in the competitive set — the "$0000 View" gate and Mosaic Score direction are deliberate UX design that creates curiosity rather than frustration.

---

### Page 11 — Sign-up / Trial Flow
**URL:** https://www.cbinsights.com/trial-signup (redirected from app.cbinsights.com/signup/)

**Above-the-fold composition:**
Hero headline: "Try predictive intelligence on private companies – free for 10 days" with subheadline: "See companies and market trends that will impact your business before it's obvious."

**Form fields (inferred from structure):**
- Email address (primary)
- Company/organization (likely required for qualification)
- Privacy policy checkbox: "By submitting this form you agree to CB Insights' Privacy Policy"
- Submit button

**Friction level:** Low-medium. Single form, no phone number required, no credit card. 10-day duration is a meaningful commitment ask (not "3 days" or "limited access") — high enough to signal value, short enough to feel risk-free.

**Social login:** None observed. Email-only.

**Trial terms:**
- Duration: 10 days
- Cost: Free
- Access: "Full platform access" implied — Strategy Terminal, ChatCBI, 11M company profiles, 1,600 markets, Mosaic Score, etc.

**What you get in trial:**
11M+ company profiles | 1,600+ market profiles | ChatCBI™ AI | Predictive signals (Mosaic Score, Exit Probability, Commercial Maturity) | Strategy Terminal web app | Mobile app | Browser extension | Email alerts + watchlists

**Free-vs-gated boundary:**
No permanent free tier. The trial is the only path to product access. After 10 days, full paywall unless subscription purchased.

**UX moves worth stealing:**
1. **10-day trial with full access**: Giving full platform access for 10 days is a commitment to product quality — if your product is good enough to sell itself in 10 days, a free tier may be unnecessary. Ken Research's report store trial could offer 3 full reports + dashboard access for 14 days.
2. **Trial hero copy** ("See companies and market trends that will impact your business before it's obvious"): This framing turns the trial into a discovery mission, not an evaluation checklist. Ken Research's trial offer should be framed as "See your market before your competitors do" not "Try all features free."

**UX failures:**
- No permanent free tier: users who don't convert in 10 days lose all access, which creates a high churn risk and a negative brand experience
- No social login reduces signup speed
- No indication of what happens at day 10 (automatic paywall? Sales call? Downgrade to limited free tier?) — ambiguity increases trial abandonment

**One-line verdict:** 10-day full-access trial is a bold, product-confident move; the lack of a permanent free tier is the most significant UX vulnerability in the CB Insights model.

---

### Page 12 — Free Tier Behavior
**What is free (no account required):**
- Full homepage
- All research hub listing pages (titles, 1-2 sentence summaries, cover images)
- Company profile pages at `/company/[slug]` — partial data (founding year, stage, total raised, recent funding, description, ~6 competitors, patent count, news feed)
- Mosaic Score direction (not value)
- Research brief count per company (not content)
- Expert Collections membership list (not content)

**What is gated (trial or subscription required):**
- Full company profiles (revenue, valuation, full investor list, full financials, full people data)
- Full research reports and briefs
- ChatCBI and all AI agents
- Strategy Terminal search/filter interface
- Predictive scores (absolute values, not just direction)
- Mobile app and browser extension
- Watchlists and alerts

**Free tier UX quality:**
The free company profile pages are intentionally high-quality — enough real data to be useful (or to create curiosity), with strategic redactions to drive conversion. This is better free-tier UX than every Tier A competitor, most of whom show only report titles and require inquiry for any data.

**One-line verdict:** CB Insights' free tier is a sophisticated lead-generation layer — SEO-optimized company profiles with just enough data to create conversion motivation.

---

### Page 13 — Search Experience
**Natural language search:** "Predictive Sourcing" via ChatCBI — converts NL queries to 60+ parameter structured searches. Authenticated only.

**Structured search:** Strategy Terminal company database with filters for funding stage, geography, industry taxonomy, revenue, headcount, Mosaic Score range, etc. Authenticated only.

**Free search experience:** None. The homepage has no search bar. Discovery without authentication happens only through editorial content (research hub, company profile SEO).

**NL search positioning:** Not positioned as "search" — positioned as "sourcing," which frames it as a forward-looking discovery action (find companies I should watch) rather than a lookup action (find information about a specific company).

**One-line verdict:** CB Insights hides its search experience entirely behind authentication — no search bar on homepage, all NL and structured search are paid features.

---

### Page 14 — About / Company
**URL:** https://www.cbinsights.com/about (fetched but redirected to homepage)

**Available information from site-wide scraping:**
- Founded: New York (implied by HQ context); ~263 employees (from competitor-landscape.md)
- Revenue: ~$80M (unverified, from competitor-landscape.md)
- No founder names, no team page, no company story on public-facing pages
- Security: SOC 2, GDPR compliance mentioned in product pages
- Legal: CB Information Services, Inc. (copyright)

**Trust signals visible site-wide:**
- "10 largest businesses," "All of the Big 4," "86% of software companies," "26 of 30 largest banks," "All 5 FAANG companies" (on homepage badge row)
- Microsoft, 3M, Wells Fargo, ADP, Manulife logo row
- Named testimonial outcomes with dollar values

**One-line verdict:** No public about page found; the institutional trust signals (client statistics, named logos) substitute for a company story.

---

### Page 15 — Customer Stories / Case Studies
**URL:** https://www.cbinsights.com/customer-stories/ (returned 404)

**Visible throughout site (testimonial fragments):**
- "2.8x more acquisitions," "6x more investments," "4.5x more partnerships" — homepage outcome metrics attributed to customer cohort
- "$100M+ deal" — Big 4 consultant quote (homepage)
- "$120 million opportunity" — named company testimonial (homepage)
- "In a matter of minutes, we created a target list and screened 6 M&A targets for a big meeting. Our client acquired one of them 3 months later." — Big 4 consultant quote (homepage)
- Named companies: Microsoft, Wells Fargo, ADP, 3M, Manulife

**One-line verdict:** Customer stories page returned 404; social proof is distributed throughout the product pages as quantified outcome snippets rather than centralized case studies.

---

### Page 16 — Footer
**URL:** Extracted from https://www.cbinsights.com

**Structure:** Comprehensive mega-footer organized into 5 thematic columns.

**Columns (exact headings):**
1. AI & Agents: Strategy Terminal, Mobile app, Browser Extension, Team of Agents, ChatCBI™, Company Analysis, 11M+ profiles, 1,600+ markets, Watchlists & Alerts, Security & privacy
2. Data: Predictive (Mosaic Score, Commercial Maturity, Exit Probability, Customer Sentiment, Market Rankings, Business Relationships) | Financial (Funding/valuations, Private company revenues, Public company financials) | Research (Advanced human-led research) | Foundational (Taxonomies, Firmographics, Media/patents, Transcripts)
3. MCP & Integrations: MCP integration, Developer Portal, API & data feeds, Microsoft 365 Copilot, Snowflake, Salesforce CRM, A2A & MCP support
4. Solutions: Corporate venture capital, Sales & biz dev, M&A, Venture capital, Product strategy, Corporate strategy, GenAI strategy, Innovation, Market research & intelligence, Digital & IT strategy
5. Research: Recent research, Predictive signal trackers, AI research hub, Digital asset hub, Research webinars, Newsletter, Product releases, Request a briefing, Pricing

**Legal:** Copyright 2026 CB Information Services, Inc. | Website Terms of Use | Privacy Settings | Privacy Policy | Do Not Sell My Info | Partnerships

**Social:** X (Twitter), LinkedIn (only two social platforms — lean and professional)

**Information density of footer:** High — the footer is a complete site map. Every product, data type, solution, and content category is linked. This serves two purposes: SEO link equity distribution, and low-friction navigation for users who scroll to the bottom.

**One-line verdict:** The CB Insights footer is a complete taxonomy of the product, data, and solution architecture — a masterclass in using footer real estate for both SEO and navigation.

---

## Cross-Page Patterns

### Pattern 1: Outcome-first language at every level
From the homepage badge row ("10 largest businesses") to the product page headlines ("Your next move, first") to the agent descriptions ("Turns weeks into hours") to the trial page ("before it's obvious"), every layer of the site speaks in outcomes, not features. This is consistent brand voice discipline across 15+ pages.

### Pattern 2: Progressive disclosure as UX strategy
Above-the-fold is always sparse (headline + one trust signal). Mid-page is dense (feature grids, agent catalogs). Below-fold is social proof (testimonials, outcome metrics). The information architecture respects attention — important things first, proof second.

### Pattern 3: Workflow as information architecture
The site IA maps to buyer workflows, not product modules. Solutions are organized by function (M&A / VC / Sales / Corporate Strategy) not by product feature. This means a buyer entering from "M&A" sees only the 3-4 features relevant to M&A, not the full 50-feature product catalog.

### Pattern 4: The 10-day trial as the only gate
Everything on the public site is visible except the product itself. The trial is the gate, but it's a substantive trial (full access, 10 days). This builds trust before asking for money — a meaningful philosophical difference from Tier A competitors who gate everything behind inquiry forms.

### Pattern 5: Proprietary naming at every layer
Mosaic Score (not "company health score") | Predictive Sourcing (not "NL search") | Deep Analyst (not "report generator") | Competitive Sentinel (not "competitor monitor") | Magic Mode (not "preset templates"). CB Insights owns vocabulary that competitors cannot credibly use, creating a moat that compounds over time as these terms appear in analyst and consultant vocabulary.

### Pattern 6: MCP/integrations as product extension
The explicit "MCP & Integrations" navigation category and footer column signals that CB Insights is positioning itself as a data layer for other LLMs, not just a standalone platform. This is a 2026 AI-era positioning move that makes CB Insights compatible with any enterprise AI workflow.

---

## What Ken Research Should Steal (Specific, Page-Anchored)

### 1. The outcome-badge trust row (Homepage)
Replace the generic "ESOMAR certified / ISO 9001" badge row with: "Used by X of the top Y consulting firms / Cited in Z investment memos / Downloaded by W analysts at FAANG companies." Quantify market penetration, not certifications.
_Source: Homepage badge row_

### 2. Subheadline as buyer persona recognition (Homepage)
"How corporate strategy and deal teams see opportunity — before the market does" does not describe the product; it describes the buyer and what they want to feel. Ken Research's homepage subheadline should be: "How [strategy consultants / investment analysts / corporate development teams] access market intelligence before their clients ask for it."
_Source: Homepage hero_

### 3. Quarterly "State of [Sector]" report series (Research hub)
Commit to 10-12 free quarterly reports with consistent naming ("State of EV Batteries Q2'26"), consistent structure, and consistent release cadence. These become organic search anchors, newsletter drivers, and brand credibility builders simultaneously.
_Source: Research hub; State of Venture / State of AI pattern_

### 4. Six-tile editorial topic navigation (Research hub)
Replace Ken Research's flat 60-category report catalog with 6-8 curated topic hubs (e.g., Energy, Healthcare, Technology, Emerging Markets, Consumer, Industrials). Each hub has featured reports, upcoming webinars, and a data tracker. Users navigate by topic, not by taxonomy.
_Source: Research hub topic tiles_

### 5. "$0000 View" progressive disclosure gate (Company profile pages)
Show the structure and field labels of Ken Research's report data on preview pages. Obfuscate the actual values (market size, CAGR, forecast tables) with a blurred/hidden treatment and a "View" CTA. Creates curiosity rather than frustration. Better than "Download sample" with a form.
_Source: Company profile pages_

### 6. Named agent/service types (Team of Agents page)
Create named, persona-specific service tiers within Ken Research's subscription: "Sector Monitor" (weekly briefing on a chosen sector), "Market Entry Analyst" (deep research on a target market), "Competitor Watch" (real-time competitor intelligence). Name the services after the job, not the feature.
_Source: Team of Agents page_

### 7. Workflow-first solutions IA (Solutions navigation)
Organize Ken Research's product/service pages by buyer workflow and job function (Market Entry / Competitive Intelligence / Investment Due Diligence / Sector Monitoring), not by report category. Each solution page shows only the 3-4 report types relevant to that use case.
_Source: Strategy Terminal workflow domains; Solutions navigation_

### 8. Mosaic Score direction as partial-reveal (Company profiles)
For Ken Research's gated market data, show the direction of change ("This market is expanding faster than the sector average") without showing the number. Creates conversion motivation without devaluing the subscription.
_Source: Company profile Mosaic Score partial reveal_

---

## What Ken Research Should NOT Copy

### 1. Fully hidden pricing
CB Insights has no public pricing. This works when you have Fortune 500 brand recognition and a 10-day trial that demonstrates value before pricing discussion. For Ken Research, which is less known and competes against Statista's fully transparent pricing, hidden pricing creates a disadvantage. Ken Research should show at least tier/package structure even without exact prices.

### 2. No permanent free tier
CB Insights uses a time-limited trial with no freemium fallback. This is appropriate for a $80M+ enterprise SaaS with a high-quality product. Ken Research at ~$X revenue with a different buyer mix should maintain a permanent free tier (limited reports per month, open market summaries) to build habit and organic growth. Crunchbase's model is more appropriate here.

### 3. Pure private-company / startup-data focus
CB Insights' entire value proposition is built on private company intelligence for deal teams, VC, and M&A. Ken Research's value is industry market sizing, CAGR research, and sector intelligence. These are different enough that copy/pasting CB Insights' "private companies" framing would misrepresent Ken Research's actual product. Ken Research needs its own category framing: "Industry intelligence for strategy teams" not "private company intelligence for deal teams."

### 4. Agent-first AI positioning
CB Insights' "Team of Agents" is an enterprise B2B AI workflow product. Ken Research's AI opportunity is more focused: AI-assisted report generation, AI-powered market query, AI-summarized sector briefings. Positioning 11 named agents before Ken Research has even established basic platform UX would be jumping ahead of the product maturity curve.

---

## Sources

| Page | URL | Status |
|---|---|---|
| Homepage | https://www.cbinsights.com | 200 |
| Product overview | https://www.cbinsights.com/what-we-offer/ | 200 |
| Strategy Terminal | https://www.cbinsights.com/what-we-offer/strategy-terminal/ | 200 |
| ChatCBI | https://www.cbinsights.com/what-we-offer/chatcbi/ | 200 |
| Team of Agents | https://www.cbinsights.com/what-we-offer/team-of-agents/ | 200 |
| Data products | https://www.cbinsights.com/what-we-offer/data/ | 200 |
| Integrations | https://www.cbinsights.com/what-we-offer/integrations/ | 200 |
| Pricing | https://www.cbinsights.com/what-we-offer/pricing/ | 200 |
| Research hub | https://www.cbinsights.com/research/ | 200 |
| Company profile (OpenAI) | https://www.cbinsights.com/company/openai | 200 |
| Company profile (Tesla) | https://www.cbinsights.com/company/tesla | 200 |
| Company profile (Anthropic) | https://www.cbinsights.com/company/anthropic | 200 |
| Trial signup | https://www.cbinsights.com/trial-signup | 200 |
| AI research hub | https://www.cbinsights.com/research/artificial-intelligence/ | 200 |
| Customer stories | https://www.cbinsights.com/customer-stories/ | 404 |
| M&A solutions | https://www.cbinsights.com/what-we-offer/solutions/ma/ | 404 |
| About page | https://www.cbinsights.com/about | redirected to homepage |
| Crunchbase product pages | various | 403 (multiple) |
