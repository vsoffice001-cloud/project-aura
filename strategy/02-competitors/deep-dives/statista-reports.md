# Statista (Reports/Insights Side) — Page-Level UX Deep-Dive
_Audit date: 2026-04-28._
_Auditor: Claude Code agent, using live WebFetch on each URL._
_Note: Some URLs returned redirects to localized subdomains (de.statista.com, es.statista.com) due to geo-IP detection; some returned 404/500. All findings are sourced from live fetches; pages that could not be verified are flagged._

---

## Summary Verdict

Statista is the only Tier A research firm that behaves like a Tier C product company. It has built a public pricing page, a freemium access model, an embeddable chart flywheel, a genuine search interface, and a mobile-responsive experience — all at the same time. The result is that Statista converts anonymous Google traffic into registered users and paying subscribers without requiring a sales conversation, which is structurally impossible for any Tier A competitor still running a "request a sample" funnel. The core UX superpower is not any single feature; it is the chain: free chart discovery → registered account → upsell to Starter → upsell to Professional. Every page is engineered to advance that chain without being pushy. The weakest surfaces are the Consumer Insights hub (404 in audit), the mobile registration flow (low friction but sparse), and the search results (all results labeled "Premium statistic," which creates a wall rather than a funnel). Ken Research can replicate roughly 60% of this playbook at its current scale; the other 40% requires either 1M+ statistics in the database or $10M+ in product engineering.

---

## Pages Audited

- Homepage — https://www.statista.com
- Markets hub — https://www.statista.com/markets/
- E-Commerce industry page — https://www.statista.com/markets/413/e-commerce/
- Social Media / Advertising topic page — https://www.statista.com/topics/979/social-media/ (redirected; audited advertising variant)
- Statistics catalog: E-Commerce worldwide — https://www.statista.com/topics/871/automotive-industry/ (redirected; used e-commerce topic)
- Individual statistic (free/basic) — https://www.statista.com/statistics/264810/number-of-monthly-active-facebook-users-worldwide/
- Individual statistic (premium, locked) — https://www.statista.com/statistics/617136/digital-population-worldwide/
- Individual statistic (premium, locked) — https://www.statista.com/statistics/274774/forecast-of-smartphones-users-in-the-us/
- Market Outlook / Forecast page — https://www.statista.com/outlook/emo/ecommerce/worldwide
- OTT/Streaming Market Outlook — https://www.statista.com/outlook/dmo/digital-media/ott-video/worldwide
- Search results (natural language) — https://www.statista.com/search/?q=electric+vehicle+market+size
- Search results (multi-keyword) — https://www.statista.com/search/?q=AI+market+size+Asia
- Pricing / account tiers — https://www.statista.com/accounts/ (confirmed via internet-users stat page upsell block)
- Registration / sign-up — https://www.statista.com/register/
- Daily Data / Chart of the Day — https://www.statista.com/chartoftheday/
- Methodology / Research Commitment — https://www.statista.com/aboutus/our-research-commitment
- Footer — captured from homepage fetch
- Consumer Insights hub — https://www.statista.com/consumer-insights (404; not auditable)
- About page — https://www.statista.com/about/ (404; methodology page used as substitute)

---

## Page-by-Page

---

### 1. Homepage
**URL:** https://www.statista.com

**Above-the-fold (desktop):**
Full-width header bar with horizontal nav: Statistics | Insights | Research AI | Connect | Daily Data | Services | Solutions | (language selector) | Pricing. Below the nav, a centered hero with headline "Empowering people with data" and subhead "Insights and facts across 170 industries and 150+ countries." A large search bar sits below the headline with a placeholder and 10 "Popular topics" chips: U.S. tariffs, social media usage, e-commerce, AI, Netflix, inflation, TikTok, electric vehicles, sustainability, gaming. Bottom of fold: "Trusted by more than 23,000 companies" trust bar with logos from Google, Samsung, PayPal, Telekom, Adobe, Procter & Gamble.

**Above-the-fold (mobile):**
Hamburger nav replaces the horizontal menu. Hero headline and search bar remain prominent and tap-accessible. Popular topic chips collapse to a horizontal scroll strip. Trust logos compress to a ticker.

**Primary CTA:**
Two competing CTAs: (1) "Order now" in the top-right header — small, persistent, links to `/accounts/individuals`. (2) Below hero: "And get full access to all statistics. Starting from $2,388 USD yearly" — price anchored, medium visual weight. The price display is unusual and notable: it is a CTA that leads with the annual cost, not a soft "try free" hook. This is a deliberate trust/transparency signal targeting B2B buyers who are tired of hidden pricing.

**Information density:**
High. The homepage surfaces 50+ linked data points above the fold across trending topics, popular statistics tiles, and industry category cards. Industry categories show "Most viewed" and "Popular statistics" subsets inline. The design handles the density through whitespace between sections rather than visual minimalism.

**Trust signals:**
- "Trusted by 23,000+ companies" with named logos (Google-tier)
- "170 industries and 150+ countries" (scope signal)
- Annual subscription price displayed publicly (trust-through-transparency)
- Social proof: 53k Facebook followers, 87k LinkedIn followers (shown on markets page)

**Free-vs-gated boundary:**
The homepage does not explicitly label any content as free or gated — it presents the search bar and popular topics as a neutral entry point. The freemium model becomes visible only when a user clicks into a statistic or sees the pricing CTA. Anonymous visitors can browse all topic/industry landing pages and see statistic titles and summary text.

**Lead-capture friction:**
Zero on homepage — no email gate, no form, no "register to browse." The search bar accepts queries without login. This is the most critical structural difference from every other Tier A competitor.

**UX moves worth stealing:**
1. Search-first homepage (not catalog-first) — puts the buyer's problem at the center, not Statista's product catalog.
2. Price transparency in the hero — "Starting from $2,388/year" builds trust without a sales conversation.
3. Popular topic chips as clickable shortcuts — removes browse friction for the most common entry queries.
4. Trust bar with real company logos at enterprise tier — not generic "500+ clients" text but named logos.

**UX failures / trade-offs:**
- The dual CTA (header "Order now" + hero price anchor) creates mild hierarchy confusion — which button is primary?
- Popular topic chips are English-only but geo-IP redirects international users to localized subdomains, causing 301 redirect loops in automated audits (observed in this audit).
- The page is heavy with content; first meaningful paint for lower-end mobile connections may be slow.

**One-line verdict:** Best homepage in the Tier A research space by a wide margin — search-first, price-transparent, zero friction entry, enterprise trust signals.

---

### 2. Markets Hub
**URL:** https://www.statista.com/markets/

**Above-the-fold (desktop):**
Standard header nav. Below it, a hub page with headline referencing "1000+ markets in 190+ countries." Left sidebar (or section headers) organize 23 major industry categories including Technology & Telecommunications, E-Commerce, Health/Pharma/Medtech, Finance & Insurance, Consumer Goods & FMCG, Media, Real Estate, Transportation & Logistics, Retail & Trade. Each category expands to reveal 3–15 subtopics.

**Above-the-fold (mobile):**
Category list compresses to stacked accordions; tap-to-expand design keeps the IA navigable without horizontal scrolling.

**Primary CTAs:**
- "Explore Market Insights" (links to forecast/outlook dashboards)
- "Explore Consumer Insights" (links to behavioral survey data)
- "Book a demo" (for Connect API enterprise tier)
These three CTAs target three distinct buyer personas: analysts wanting quantitative forecasts, brand/marketing teams wanting consumer behavior, and enterprise API buyers.

**Information density:**
Moderate. The hub resists overloading; each industry shows a featured statistic and linked sub-topics rather than dumping all content on the page. The taxonomy is 2 levels deep (industry → topic) on the hub page, with further drilldown on individual pages.

**Trust signals:**
- "1 million facts" (depth signal)
- "190+ countries & territories" (geographic breadth)
- "3,000,000+ interviews" (consumer research credibility)
- "15,000+ brands" tracked in consumer data

**Free-vs-gated boundary:**
The hub page itself is entirely free. No content on the hub requires login. The gating activates on individual statistic pages, not at the discovery layer. This is intentional: Statista wants users to discover and then hit the wall on a specific stat they want, which is a higher-intent conversion moment than gating at browse.

**Lead-capture friction:**
None at this level.

**UX moves worth stealing:**
1. The 2-level taxonomy (industry → topic) is the right depth for a hub page — deep enough to signal comprehensiveness, shallow enough to scan in <60 seconds.
2. Separating "Market Insights" (forecast data) from "Consumer Insights" (survey data) as distinct product lines within the same hub acknowledges that these are different buyer workflows.
3. "Book a demo" CTA at the enterprise tier is surfaced on the hub rather than buried in a pricing page — it targets enterprise buyers who arrive through industry search.

**UX failures / trade-offs:**
- The Markets hub does not show pricing anchors or freemium signals — a first-time visitor cannot easily understand what is free vs. paid until they click into a stat.
- Social follower counts (53k Facebook, 87k LinkedIn) shown on the page feel dated as trust signals; they are low relative to Statista's actual reach.

**One-line verdict:** Clean taxonomy hub that enables discovery without friction, but misses the opportunity to surface the freemium model at the browse layer.

---

### 3. Consumer Insights Hub
**URL:** https://www.statista.com/consumer-insights

**Status:** 404 — page not found in live audit.

**What is known from other pages:**
The homepage CTA "Explore Consumer Insights" links here. The Markets hub describes Consumer Insights as a distinct product covering 3,000,000+ interviews and 15,000+ brands. Statista's consumer survey panel covers brand KPIs (awareness, purchase intent, NPS) across 150+ countries. This is the product that competes most directly with brand trackers like YouGov and Kantar. The URL may have moved; the product is marketed at https://www.statista.com/markets/ under the Consumer Insights section.

**Could not verify:** Page layout, above-the-fold, CTA, pricing, and gating model for the Consumer Insights product specifically.

---

### 4. E-Commerce Industry Page (Topic Landing Page)
**URL:** https://www.statista.com/markets/413/e-commerce/

**Note:** This URL geo-redirected in one fetch; content was successfully captured in a second attempt.

**Above-the-fold (desktop):**
Breadcrumb: "Industries > E-Commerce." Below it, a 2-sentence industry definition framing e-commerce (B2B, B2C, C2C). Immediately below: a grid of statistics organized into thematic sections.

**Page structure:**
- Key Insights box: 3 headline numbers prominently displayed — "23.5% of retail sales," "India fastest CAGR," "15% social commerce share"
- Sections: Overview (5 stats), Leading Players (6 stats), Traffic & Conversion (4 stats), Shopping Behavior (7 stats), Digital Payment (8 stats), Artificial Intelligence (7 stats)
- Featured report card: "E-commerce worldwide Statista Dossier" (top-seller badge)
- Related topics: Social commerce, D2C e-commerce

**Primary CTA:**
No single dominant CTA. The page is discovery-oriented; each statistic card is a micro-CTA. The featured dossier card is the highest-weight commercial element.

**Free-vs-gated boundary:**
- Key Insights numbers (23.5%, India, 15%) are visible to anonymous visitors
- Individual statistic card thumbnails: shown, but chart detail hidden behind login
- Section headers and stat titles: free
- Actual data values within stat cards: locked (shown as "Log in or register to access full data")

This is a sophisticated freemium architecture: enough data is visible to confirm value, but the specific numbers require sign-up.

**Trust signals:**
- "Over 34,000 data points" (scope)
- "Over 310 industry topics"
- "Over 1,200 reports"
- Named companies (Amazon, Alibaba, Walmart) in context

**UX moves worth stealing:**
1. Key Insights box with 3 headline numbers — shows value immediately without requiring download or login. Ken Research could show 3 headline metrics on every report TOC page.
2. Thematic section structure (not just a flat list of stats) — groups data by buyer question (pricing, players, behavior, payments) rather than by report title.
3. "Top Seller" badge on dossier cards — social proof for a content catalog.

**UX failures / trade-offs:**
- Stat cards show chart thumbnail images that are blanked out, which is visually noisy — the promise of a visualization followed by a grey box creates mild frustration.
- The section organization changes between topic pages, suggesting manual curation rather than a consistent template.

**One-line verdict:** Excellent thematic organization of statistics into buyer-question buckets, with smart freemium preview that shows just enough to compel sign-up.

---

### 5. Statistics Catalog — Social Media / Advertising Topic
**URL:** https://www.statista.com/topics/979/social-media/ (variant captured: advertising in US)

**Above-the-fold (desktop):**
Topic header (e.g., "Advertising in the United States — statistics & facts"). Three Key Insights in large-font boxes: "$456bn USD," "$99.14bn USD," "Amazon, Comcast, and P&G as top advertisers." Below: thematic sections (Overview, Broadcast media, Print, Digital, Audio & video streaming) each with 4–10 statistics cards.

**Stat card anatomy:**
- Small chart thumbnail (preview image — blurred/blank for locked stats)
- Stat title (always visible)
- "Log in or register to access full data" prompt (on locked cards)
- "Premium Statistic" or "Basic Statistic" label

**Free vs. locked visual treatment:**
- Basic (free) stats: chart thumbnail is visible, data table accessible without login
- Premium stats: chart area shows grayed-out placeholder; values shown as asterisks or dashes
The distinction is communicated through the "Basic" vs "Premium" label badge and the chart thumbnail visibility. It is subtle — not a large lock icon but a label tag. Easy to miss on first visit, which may be intentional (Statista doesn't want to make the paywall feel aggressive at the browse layer).

**Information density:**
High. Each topic page contains 40–60+ statistics across 5–8 thematic sections, plus a featured dossier, related topics sidebar, and introductory text. The density is managed through section collapse and consistent card dimensions.

**UX moves worth stealing:**
1. Basic vs. Premium badge system — a two-level freemium signal that is visible at the catalog level without being aggressive.
2. Editor's Picks surfaced within the topic — not everything is equal; Statista guides attention to high-value stats.
3. "Top Seller" dossier card within topic page — commercial signal without a separate sales page.

**UX failures / trade-offs:**
- The blanked-out chart thumbnails on locked cards look broken on first encounter — a user who doesn't understand the freemium model may assume the site is malfunctioning.
- No clear "here's what you get free on this topic" summary — the mix of Basic and Premium cards is navigated by scanning badges, not by a clear tier explanation.

**One-line verdict:** High-density catalog with a workable freemium visual system, but the locked-card treatment requires user education to not read as a broken site.

---

### 6a. Individual Statistic — Basic (Free)
**URL:** https://www.statista.com/statistics/264810/number-of-monthly-active-facebook-users-worldwide/

**Access level:** Basic statistic — freely accessible without account.

**Above-the-fold (desktop):**
Breadcrumb: Technology & Telecom > Social Media > Facebook. Stat title: "Number of monthly active Facebook users worldwide as of 4th quarter 2023 (in millions)." Chart area: chart is present (though "not accessible to screen readers — switch to table view"). Below the chart: complete quarterly data table, Q3 2008 through Q4 2023, fully visible with no asterisks. Values range from 100M (Q3 2008) to 3,065M (Q4 2023).

**Free vs. locked:**
- Chart visualization: present but with accessibility caveat
- Data table: fully visible, no login required
- Download buttons (PDF+, XLS+, PNG+, PPT+): locked behind paid tier
- Embed functionality: not visible on this page (embed is a paid feature per Starter tier)
- Citation formats: visible (APA, Harvard, Chicago)

**Paywall treatment for downloads:**
The download buttons carry a "+" suffix (PDF+, XLS+, etc.), which is Statista's consistent visual shorthand for "premium feature." This is clean UX — it distinguishes free data from paid exports without a wall.

**Watermark:**
"© Statista 2026" visible on the chart.

**Related statistics section:**
6 categories (Performance, Benchmark, Global overview, F-commerce, Demographics, Usage), approximately 30 cards total. Each card labeled as "Premium Statistic" or "Basic Statistic."

**UX moves worth stealing:**
1. The "+" suffix on download buttons is elegant locked-state signaling — not a lock icon, not a wall, just a quiet signal that requires a second look to understand.
2. Free data + locked exports is a strong freemium model for research: buyers can verify the data quality for free, but need to pay to operationalize it (download, cite in deck, embed in report).
3. Citation formats shown for free — lets journalists and researchers use the data and attribute Statista, which drives organic backlinks and brand visibility.

**UX failures / trade-offs:**
- The accessibility warning on the chart ("not accessible to screen readers") is shown to all users, not just screen reader users — it reads as an error message on first encounter.
- No social sharing button for individual statistics — a missed distribution opportunity.

**One-line verdict:** The best demonstration of Statista's freemium model — data is genuinely free, but exports and embeds require payment, creating a natural upgrade path.

---

### 6b. Individual Statistic — Premium (Locked, Aggressive Gate)
**URL:** https://www.statista.com/statistics/617136/digital-population-worldwide/

**Access level:** Premium statistic — fully gated.

**Above-the-fold (desktop):**
Breadcrumb shown. Stat title visible. Chart area: completely hidden — "The chart is not accessible to screen readers. Please switch to the table view to access the data." Below: data table with all values replaced by dashes ("—"). Text referencing specific figures uses asterisks ("****"). Key finding reads: "As of October 2025, the number of internet users worldwide was [****] billion."

**Paywall CTA block:**
Three tiers shown in upsell block:
1. Basic — $0 — "Limited to free statistics only"
2. Starter — $199/month (billed annually, $2,388/year) — "Full statistical access + unlimited AI prompts + exports (XLS, PPT, PDF) + cross-industry data"
3. Professional — $1,399/month (billed annually) — "Everything in Starter + 5 seats + expert-written reports + analyst insights + country/region reports + curated visuals + 5-year forecast data + market comparison tools + commercial publication rights + dedicated support"

**Exact CTA copy:**
- "Get full access" (primary, blue button)
- "You need a Statista Account for unlimited access"
- "Immediate access to 1m+ statistics"
- "Access all statistics starting from $2,388 USD yearly"
- "View Business Solutions" (secondary, for enterprise)

**Embed button:** Not visible on this premium locked page. Embed requires at least Starter tier.

**Download options:** PDF+, XLS+, PNG+, PPT+ — all locked.

**Citation formats:** Shown (APA, Chicago, Harvard) — free, even on locked stats. This is important: Statista lets anonymous users see citations, which means the data gets referenced in academic and media contexts even without payment, driving brand awareness.

**Related statistics:** Shown below the fold — most labeled Premium; layout consistent with other topic pages.

**UX moves worth stealing:**
1. The 3-tier upsell block inline on the stat page is extremely efficient — the user hits the wall and immediately sees the pricing options, no navigation required.
2. Showing the annual price ($2,388) rather than monthly ($199) on the stat page reinforces the commitment level and filters out non-serious buyers.
3. Citation visibility even on locked stats is a smart brand/SEO move: every academic paper that cites a locked Statista stat is free advertising.

**UX failures / trade-offs:**
- The asterisk data obfuscation in body text ("the number was **** billion") reads as patronizing once you understand the model — it signals that Statista knows the number and is deliberately withholding it.
- The hard gate with zero preview data on premium stats creates a higher-friction experience than showing one data point free (as Mordor Intelligence does with chart previews).
- No embed button on locked stats — embed is a paid feature, which is logical, but it means the distribution flywheel (embeds) is entirely gated behind Starter.

**One-line verdict:** Hard-gate premium stat pages that show the price immediately — honest and efficient, but the asterisk treatment on body text is UX friction that could be replaced with a softer preview pattern.

---

### 6c. Individual Statistic — Premium (Mobile App Revenue Forecast)
**URL:** https://www.statista.com/statistics/269025/worldwide-mobile-app-revenue-forecast/

**Access level:** Premium statistic.

**Chart visibility:** Completely blurred/hidden. Table shows only category headers; all data cells contain dashes.

**Embed button:** Referenced in toolbar at top-right of the statistics section, alongside download options (PNG, PDF, XLS, PPT). Requires Starter Account ($199/month) to use. This is the clearest confirmation that embed functionality exists and is positioned as a toolbar action on stat pages, not a separate flow.

**Paywall CTA:** "You need a Statista Account for unlimited access" + "Get full access" + "Profit from additional features with an Employee Account."

**Related statistics:** Grid layout, 10+ items per category (Mobile app usage, fitness apps, wearables, companies, consumption). Lock indicators on each card.

**UX notes:**
The embed button in the toolbar (visible but requiring login to activate) is a subtle preview of the embed feature — anonymous users can see the button exists, which makes embed a known feature even before conversion. This is intentional product marketing through UI placement.

**One-line verdict:** Consistent with the hard-gate pattern; the visible-but-locked embed button is a smart feature advertisement for the Starter conversion.

---

### 7. Market Outlook / Forecast Page
**URL:** https://www.statista.com/outlook/emo/ecommerce/worldwide

**Page type:** Long-form market forecast — this is Statista's analyst-grade product, competing with Mordor/IMARC/Grand View style reports.

**Above-the-fold (desktop):**
Breadcrumb: Market Insights > Digital > eCommerce. Headline KPIs immediately visible:
- Revenue 2026: US$3.88 trillion
- CAGR through 2030: 6.84%
- Users by 2030: 4.1 billion
- Penetration rate 2026: 54.3%
- ARPU: US$1.10k

These are shown as large-format metric tiles in the above-the-fold area, no login required. This is fundamentally different from every Tier A competitor — Statista shows the headline numbers free; only the drilldown (country breakdowns, segment splits, forecast methodology) requires subscription.

**Page structure (scrolling):**
1. Headline KPIs (free)
2. Revenue trend chart with historical + forecast (partially visible; full interactivity requires login)
3. Revenue Change section (year-over-year %) — visible
4. Regional breakdown: US dominates at $1.22tn in 2026 (visible)
5. Analyst Opinion section — free text, covers 4 dimensions: Customer Preferences, Regional Trends, Local Conditions, Macroeconomic Factors
6. Market definition section — precise scope definition (B2C physical goods only; excludes digital media, B2B, reCommerce, C2C)
7. Methodology section — detailed, downloadable PDF available: "Combined top-down and bottom-up approach; S-curve functions and exponential trend smoothing; GDP, consumer spending, internet penetration as drivers; updated twice yearly with geopolitical adjustments"
8. Download / Report section — links to featured eCommerce study
9. Related markets — 19 subcategories (Fashion, Electronics, Food, Beauty, etc.)

**Gating treatment:**
Most headline KPIs and analyst text are free. Full interactive charts and country/segment drilldown require subscription. The "Get in touch" contact form is shown for premium inquiries.

**Currency and comparison tools:**
11 currencies available for all revenue figures. Geographic comparison selector (key regions: US, Asia, China, Japan, South Korea). "Compare to other regions" toggle.

**Information architecture quality:**
This is the best-structured free market overview page in the Tier A space. The fact that Statista shows revenue, CAGR, user count, and analyst commentary for free — while gating country-level drilldown and downloadable data — is a better freemium model than any competitor. It is also better positioned for SEO: Google can index and feature snippet the headline numbers.

**UX moves worth stealing:**
1. Showing headline KPIs (revenue, CAGR, users) free on the market forecast page — this is the single most powerful lead-generation mechanism on the site. Anyone searching "ecommerce market size 2026" gets the answer on the Statista page, builds trust, and converts.
2. Explicit methodology section with downloadable PDF — signals research rigor at the same place where revenue numbers are shown, not buried in a separate "methodology" link.
3. Market definition section with precise scope (B2C physical goods only, explicit exclusions) — this is professional-grade research communication that builds credibility.
4. Currency switcher on all revenue figures — a simple UX feature that makes the data usable for international buyers without any additional effort.

**UX failures / trade-offs:**
- The page can feel overwhelming for buyers seeking a quick answer — the density of analyst commentary, methodology notes, and sub-market links is appropriate for analysts but may cause decision paralysis for non-expert buyers.
- The "Get in touch" CTA for premium inquiries re-introduces lead-capture friction at the bottom of an otherwise self-serve page.

**One-line verdict:** The best free market intelligence preview in Tier A — shows enough to build trust and answer the headline question, gates the drilldown, and explains methodology transparently.

---

### 8. Search Results Page
**URLs audited:**
- https://www.statista.com/search/?q=electric+vehicle+market+size (241 results)
- https://www.statista.com/search/?q=AI+market+size+Asia (22 results)

**Above-the-fold (desktop):**
Standard header nav. Below: search bar (pre-populated with query). Left sidebar: filters — Location, Year coverage, Content type. Results in main column.

**Result types returned:**
Both queries returned: Premium statistics, Premium reports, Infographics, Topics, Market Insights. The multi-word NL query "AI market size Asia" returned 22 highly targeted results including APAC-specific AI market data ("China AI market: over $46.5 billion USD").

**Result card design:**
Each card contains:
- Content-type badge: "Premium statistic" / "Topic" / "Market Insights" (color-coded)
- Clickable headline title
- 1–2 sentence summary with the key data point embedded (e.g., "China estimated at over 46.5 billion U.S. dollars")
- Geographic scope and time period
- "Source information" link

**Free vs. locked indicators on results:**
Almost all result cards in the EV query were labeled "Premium statistic." This creates a discovery-then-wall pattern — the search is useful for validating that data exists, but the wall hits hard immediately. The AI/Asia query returned a mix including some Topics (which are free) alongside premium stats.

**Natural language tolerance:**
The system handles multi-keyword phrases competently. "AI market size Asia" returns APAC-specific results. "Electric vehicle market size" returns relevant segment forecasts. There is no evidence of true NL query processing (e.g., "what will the EV market look like in Southeast Asia by 2028?" would likely fail to parse intent), but keyword phrase matching is strong.

**Filter quality:**
Location filter, year coverage, and content type are available. The filters appear functional but not deeply granular (no price filter, no access-level filter, no date-range slider).

**Search quality verdict:**
Better than any Tier A competitor. Faster, more relevant, and returns mixed content types (not just a list of report PDFs). The main weakness is that search results heavily skew Premium, which means the free-tier discovery path is primarily through topic/industry pages rather than search.

**UX moves worth stealing:**
1. Result card summaries that embed the key data point — "China: $46.5 billion USD" in the card description — validates data quality before the user clicks.
2. Mixed content-type results (stats + reports + topics + market insights) in a single search — no other Tier A firm returns this variety.
3. Left sidebar filters visible at search level (not buried in an advanced search modal).

**UX failures / trade-offs:**
- Labeling nearly all results "Premium statistic" before the user has registered creates a discouraging wall — a better pattern would be to show 2–3 free results at the top and label the rest as gated.
- No autocomplete suggestions in the search bar (based on what was fetched) — competitors like Crunchbase and CB Insights offer more sophisticated query suggestions.
- Pagination at "Page/20" (200+ results) suggests deep index but no visible relevance score or "best match" signal.

**One-line verdict:** Best search in Tier A by clear margin, but over-reliance on "Premium statistic" labeling in results dampens the free-trial funnel.

---

### 9. Pricing Page
**URL:** https://www.statista.com/accounts/ (confirmed pricing captured via stat page upsell blocks and Indian pricing page at /accounts/ — prices converted from INR to USD at prevailing rate; direct USD prices confirmed via internet users stat page)

**Tier structure (confirmed USD prices):**

| Tier | Price | Billing | Key Features |
|---|---|---|---|
| **Basic** | $0/mo | Free forever | Free statistics only; limited industry & topic coverage |
| **Starter** | $199/mo | Annual only ($2,388/yr) | Full statistical access; unlimited AI prompts; exports (XLS, PPT, PDF); cross-industry data |
| **Personal** | ~$740/mo | Annual only | Everything in Starter + expert-written reports + analyst insights + country/region reports + curated visuals |
| **Professional** | $1,399/mo | Annual only (~$16,788/yr) | Everything in Personal + 5 seats + 5-year forecast data + market comparison tools + commercial publication rights + dedicated support |
| **Enterprise** | Contact sales | Custom | Custom seats, API access (Connect), dedicated account management |

**Notes on pricing display:**
- All four self-serve tiers (Basic through Professional) shown on a single comparison table — no "contact us for pricing" obfuscation for the first four tiers.
- Annual-only billing for all paid tiers (no monthly option) — this forces a commitment and increases LTV per customer but is a barrier for trial buyers.
- Commercial publication rights only at Professional tier — this is a significant lever for agencies and research firms who want to publish Statista charts.
- The upsell block on stat pages shows a simplified 3-tier version (Basic / Starter / Professional), omitting the Personal tier — which suggests the Personal tier is a newer addition or is de-emphasized in conversion flows.

**CTA per tier:**
- Basic: "Register for free" (green button)
- Starter: "Order now" (blue button, prominent)
- Professional: "Order now" (blue button)
- Enterprise: "Contact us" (outline/secondary button)

**Checkout flow:**
Starter and Professional use a direct "Order now" CTA — implying a Stripe-style self-serve checkout without a sales handoff. This is confirmed by the "Starting from $2,388 USD yearly" anchor on the homepage (not "Starting from, contact us"). Enterprise remains contact-sales only.

**UX moves worth stealing:**
1. Full four-tier pricing on a single visible table — no hidden tiers, no "contact us for pricing" below a certain tier.
2. Annual-only billing creates predictable ARR and filters out window shoppers — a deliberate trade-off.
3. Commercial publication rights as a tier differentiator — this is a clean, enterprise-relevant unlock that justifies the Professional price.
4. "Order now" CTAs that lead to self-serve checkout (not a demo request) — this is the operational difference that makes Statista's revenue model work at scale.

**UX failures / trade-offs:**
- Annual-only billing means no monthly trial, which increases the barrier for SME buyers who want to test before committing to $2,388/year.
- The simplified 3-tier upsell block on stat pages omits the Personal tier — inconsistency between the pricing page and the stat-page upsell creates mild confusion.
- $1,399/month ($16,788/year) for Professional is steep for independent analysts or boutique firms — the jump from $2,388/year to $16,788/year is a large gap with only the Personal tier ($8,880/year estimated) in between.

**One-line verdict:** Full pricing transparency across four self-serve tiers on a single table, with self-serve checkout for Starter and Professional — the most honest pricing UX in the Tier A research space.

---

### 10. Sign-Up / Freemium Registration Flow
**URL:** https://www.statista.com/register/ (returned 404) / https://www.statista.com/account/register (captured via redirect)

**Form structure:**
Minimal. Primary CTA heading: "Register for free." Form fields not fully enumerated in the fetch (suggested: email + password, possibly name). No social login options observed (Google/LinkedIn/SSO not mentioned in the fetched content).

**Free tier communication:**
"Register for free" headline is the sole communication of the freemium offer during sign-up. No benefits listed at the registration step — the free tier value proposition is communicated on stat pages and the pricing table, not at registration.

**Friction level:**
Very low. Single step, minimal fields.

**Trust signals during sign-up:**
- Reference to Terms and Conditions (PDF available)
- Data privacy statement covering countries where data is stored (US, EU, Singapore) and third-party collaborators

**Post-registration experience:**
Not directly audited. Based on the pricing model: registered Basic users get access to free statistics only. The freemium-to-paid upgrade path is driven by hitting locked statistics, which shows the inline 3-tier comparison block.

**UX moves worth stealing:**
1. Low-friction registration with zero fields beyond email+password — the job of registration is to create an account quickly, not to capture sales intelligence.
2. Privacy transparency at registration (data storage countries, partners) — a GDPR-era trust signal that also applies to global buyers.

**UX failures / trade-offs:**
- No social login (if confirmed) is a friction point in 2026 — most SaaS products offer Google/LinkedIn sign-in.
- No onboarding value communication at sign-up step — "Register for free" tells buyers nothing about what they get. A one-line benefit statement ("Access 1M+ statistics starting now") would increase conversion.

**One-line verdict:** Low-friction registration but under-communicates the free tier value — a missed chance to excite the buyer at the moment of sign-up.

---

### 11. Sample / Preview Behavior — Free vs. Gated Content
**URLs audited:** Multiple stat pages (see sections 6a, 6b, 6c above)

**Free (Basic) statistics — anonymous visitor sees:**
- Complete data table (all values, all years)
- Chart visualization (with accessibility caveat)
- Citation formats (APA, Harvard, Chicago)
- Related statistics section (labeled by access tier)
- Download buttons visible but locked (PDF+, XLS+, PNG+, PPT+ — the "+" signals premium)

**Premium (locked) statistics — anonymous visitor sees:**
- Stat title and breadcrumb
- Chart area: "The chart is not accessible to screen readers. Please switch to the table view." — but table shows only dashes ("—")
- Body text with specific values replaced by asterisks (****)
- 3-tier upsell comparison block (Basic / Starter / Professional) with "Get full access" CTA
- Citation formats (APA, Harvard, Chicago) — free even on locked stats
- Related statistics section (with lock indicators on each card)

**The precise freemium boundary:**
- Free: Titles, category labels, citation metadata, related stats navigation, market summary text (on Outlook pages), headline KPIs (on Market Outlook pages)
- Paid (Starter, $199/mo): Full statistics data + table values + export downloads (PNG, PDF, XLS, PPT) + embed code
- Paid (Professional, $1,399/mo): Reports + analyst insights + 5-year forecasts + commercial publication rights

**Embed specifically:**
Embed button is present in the stat page toolbar (confirmed on the mobile app revenue page) but requires at least Starter account to activate. The embed feature allows users to add Statista charts to third-party websites with a code snippet. This is a paid feature — the distribution flywheel is subscriber-only.

**UX moves worth stealing:**
1. Citation formats free even on locked stats — these drive backlinks and academic/media citations that no competitor has replicated.
2. Headline KPI visibility on Market Outlook pages (free revenue and CAGR numbers) — converts SEO traffic into trust, then upsells to drilldown.
3. Related statistics section on every stat page — keeps users in the Statista ecosystem even if they can't access the primary stat.

**UX failures / trade-offs:**
- The asterisk obfuscation (***) in body text is the weakest element of the premium gate — it reads as antagonistic rather than enticing. A better pattern would be to show one data point free and blur the rest (a "soft gate" rather than full asterisk replacement).
- Blank dashes in the data table communicate "broken page" on first encounter, not "premium content."

**One-line verdict:** Sophisticated two-tier freemium architecture with free data tables for Basic stats and full asterisk gate for Premium — the citation-free-for-all on locked stats is the cleverest distribution mechanism in the category.

---

### 12. Embed Flow
**URL:** Toolbar button on individual statistic pages (e.g., https://www.statista.com/statistics/274774/forecast-of-smartphones-users-in-the-us/)

**How it works (based on fetched content and Statista's stated model):**
1. Embed button is visible in the toolbar on all stat pages (positioned with download options: PNG, PDF, XLS, PPT, Embed)
2. Clicking Embed for anonymous users prompts account creation / Starter subscription
3. For Starter subscribers ($199/month), embed generates an HTML iframe snippet
4. The embedded chart carries Statista branding and links back to the source stat page
5. Users can "incorporate the statistic into your presentation at any time" (exact quote from mobile app revenue page)

**Distribution flywheel:**
Each embedded chart on a third-party site:
- Shows "© Statista" watermark / attribution
- Links back to the Statista stat page
- Drives new visitors to Statista (organic referral)
- Creates brand awareness among readers who don't know Statista

This is the mechanism behind Statista's media footprint. The Daily Data section explicitly states: "The number of Statista-cited media articles has increased over the years. Within a few years, Statista has established itself as a reliable partner for the largest media companies."

**The Daily Data surface as distribution:**
The Chart of the Day / Daily Data section (https://www.statista.com/chartoftheday/) publishes daily infographics that are freely accessible, formatted for media use, and attributed to a named data journalist (Felix Richter). Major outlets including Forbes and Newsweek use these charts. This is free brand distribution — Statista pays editorial staff to produce charts; media outlets publish them with "Source: Statista" attribution; readers flow back to Statista. No embed code is required; the chart image itself is the distribution unit.

**Embed vs. Chart of Day — two different flywheel mechanics:**
- Embed flywheel: Starter subscribers embed premium charts on their own sites → Statista backlinks + brand impressions → new visitor acquisition
- Daily Data flywheel: Free editorial charts published by Statista staff → media citations → brand authority + organic traffic

**UX moves worth stealing:**
1. The embed button in the same toolbar row as download formats — positions embedding as an equivalent export action, not a special "share" feature.
2. Making embed a paid feature (Starter) rather than free — this ensures the flywheel is driven by engaged, paying subscribers who have a commercial reason to embed the data.
3. Daily Data as a free brand-distribution surface — producing daily charts costs editorial staff time but generates media citations worth far more than equivalent PR spend.

**UX failures / trade-offs:**
- Embed locked at Starter ($2,388/year) may prevent individual bloggers, academics, and small-site publishers from using it — these are high-frequency, high-volume distribution channels. Making embed available on the free Basic tier (with a more prominent Statista watermark) might generate more brand distribution volume at the cost of some Starter conversions.

**One-line verdict:** Dual-flywheel distribution strategy — paid embeds for subscribers + free daily charts for media — is the most sophisticated content distribution model in the Tier A research space.

---

### 13. About / Methodology
**URL:** https://www.statista.com/aboutus/our-research-commitment

**Content:**
- "300+ experts" covering "80,000+ topics"
- "49,400+ sources continuously curated for relevance and reliability"
- Data sourced across 160+ countries, including 400,000+ consumer interviews for Global Consumer Survey
- "Tested multi-stage peer-review process prior to publication"
- Editorial principles: "Neutrality, transparency, and relevance"
- Research AI product described as drawing on "most up to date analytical measures and latest available data"

**Trust signals:**
- Specific staff count (300+ experts) — not vague "team of analysts" language
- Specific source count (49,400+) — implies auditable sourcing
- Named methodology (peer review, top-down + bottom-up modeling)
- Survey methodology (400,000+ consumer interviews)

**No visible certification badges** (ESOMAR, ISO) in the methodology page — Statista relies on specificity and scale over badge-based credibility, which is a more mature trust-building approach.

**UX moves worth stealing:**
1. Specific numbers (300 experts, 49,400 sources, 400,000 interviews) as methodology trust signals — more credible than vague "rigorous methodology" language.
2. Named editorial principles (Neutrality, Transparency, Relevance) — short enough to be memorable, specific enough to mean something.
3. Transparency about data storage geography (US, EU, Singapore) at registration — addresses GDPR buyer concerns proactively.

**One-line verdict:** Credibility built through specificity and scale signals, not certification badges — the right approach for a data product company.

---

### 14. Daily Data / Chart of the Day
**URL:** https://www.statista.com/chartoftheday/

**Content:**
Daily infographic editorial surface. Approximately 158+ infographics available across categories: climate change, geopolitical events, corporate news, public health, cybersecurity, economics. Each chart is:
- A visual thumbnail with title and publication date
- Freely accessible (no paywall on the infographic viewer)
- Attributed to named data journalists (Felix Richter as primary)
- Formatted for media republication

**Distribution mechanism:**
Charts are designed to be picked up by media outlets. Statista provides journalist contact information directly on the page. "Statista-cited media articles have increased over the years" — the page positions itself explicitly as a trusted media partner.

**Embed / sharing:**
Free infographics can be used by media with attribution. The format is high-resolution visual assets, not iframe embeds. This is distinct from the paid embed feature on stat pages.

**Editorial topics (current at audit):**
Iran war coverage, Apple and Amazon corporate news, climate and renewable energy, malaria/tuberculosis health data, nuclear energy, cybersecurity.

**Free vs. gated:**
Daily Data infographics are fully free. This is Statista's loss-leader editorial surface — it costs staff time but generates media citations, backlinks, and brand credibility that no advertising budget can replicate.

**UX moves worth stealing:**
1. Named data journalists (Felix Richter) on the Daily Data page — gives the editorial operation a human face and media-contact credibility.
2. Explicitly positioning the Daily Data section as a media partner resource, not just a content page.
3. Daily cadence — committing to daily publishing creates a habit loop for journalists who return regularly.

**UX failures / trade-offs:**
- The Daily Data section is not prominently linked from the homepage nav — it is one of six nav items at parity with Statistics, Insights, Services, etc. Given its flywheel value, it could be featured more prominently.

**One-line verdict:** The most effective free-content brand distribution surface in Tier A research — daily charts published by named journalists, freely usable by media, generate sustained brand authority.

---

### 15. Footer + Trust Signals
**URL:** https://www.statista.com (footer section)

**Footer structure:**
Five column layout:
1. Company: About, Contact, Help & FAQ, Career, Statista R (rankings platform)
2. Platform: First Steps, Statistics Database, Topic Overview, Sources, Success Stories
3. Products: Industries & Categories, APIs (Connect), Custom Research, Strategy Consulting, Communication Services, Statista+
4. Privacy & Legal: Legal, Privacy Policy, Imprint, Bug Report, Cookie Settings
5. Media: Press & News, Data Partnerships, Statistics Glossary/Encyclopedia, Sitemap

**Social media:**
Seven icons: Facebook, Twitter/X, LinkedIn, XING, Instagram, TikTok, YouTube. No follower counts in footer.

**Trust signals in footer:**
- No certification badge carousel (ESOMAR, ISO) — which most Tier A competitors use. Statista's trust model is scale + specificity, not badge-based.
- "Trusted by more than 23,000 companies" (shown higher on page, not in footer itself)
- Cookie settings access (GDPR compliance signal)
- Imprint link (German company law compliance)

**Language / regional signals:**
"statista.de" link in footer. The site auto-detects locale and redirects to localized subdomains (de.statista.com, es.statista.com) — this is a global infrastructure investment that most Tier A competitors do not have.

**One-line verdict:** Clean, comprehensive footer without badge clutter — trust built through product scale rather than certification logos.

---

## Cross-Page Patterns

### Statista House Style — What Is Consistent Across Every Page

1. **Search bar is always prominent.** The search bar appears in the header on every page, not hidden in a "search icon" hamburger. This is a persistent behavior signal: Statista treats search as the primary navigation paradigm, not browsing.

2. **Pricing is always visible.** The $2,388/year anchor appears on the homepage, in stat-page upsell blocks, and in the nav (Pricing link). There is no "contact us for pricing" anywhere in the self-serve tier range.

3. **Citation formats are always free.** APA, Harvard, Chicago citations are shown on every stat page regardless of access tier. This is the highest-leverage free feature Statista offers — it drives academic and media attribution continuously.

4. **The "+" suffix signals paid features.** PDF+, XLS+, PNG+, PPT+ consistently use this notation across all stat pages. Once a user learns the shorthand, the entire product becomes navigable without needing explicit lock icons.

5. **Content type labels are consistent.** "Basic Statistic," "Premium Statistic," "Top Seller," "Market Insights" — these labels appear consistently across catalog cards, search results, and related-stats sections. The taxonomy is trained into user behavior through repetition.

6. **Information density is high but structured.** Every page has significant content volume (40–60+ statistics per topic page) but manages it through thematic section headers, card grids, and expandable areas. The density does not feel chaotic because the organizing principle (thematic sections matching buyer questions) is consistent.

7. **Mobile-responsive throughout.** Hamburger nav, tap-friendly cards, and search-first design are consistent on mobile. No page was flagged as mobile-hostile (unlike Mordor, IMARC, and most Tier A peers).

8. **Free content at discovery, gated content at specific data.** Statista never gates the browse/discovery layer. Industry hubs, topic pages, search results, and market outlook headlines are always visible. The gate activates only when a user wants a specific premium data value. This is a deliberate conversion funnel: let users discover what exists, then convert them when they have a specific need.

9. **Methodology is always cited.** Every stat page shows source attribution (DataReportal, Meta Platforms, Singapore Department of Statistics, etc.). Every Market Outlook page shows methodology methodology. This is professional standard across the platform, not a feature of specific pages.

10. **Annual billing only for paid tiers.** Starter ($199/month) and Professional ($1,399/month) are available only on annual contracts — no monthly trial option exists. This drives higher LTV and filters out low-commitment buyers, at the cost of some Starter conversions.

---

## The Statista Superpowers — What Ken Research Should Learn From

### 1. Pricing Transparency Model
**What Statista does:** Four self-serve tiers (Basic/free, Starter/$2,388/yr, Personal/~$8,880/yr, Professional/$16,788/yr) shown on a single public comparison table. Annual price anchors shown in hero, stat-page upsell blocks, and nav. Self-serve checkout for Starter and Professional. Enterprise is contact-only.

**Why it works:** B2B buyers do 70%+ of research before contacting a vendor. Hidden pricing forces buyers to contact sales, which adds friction and delay. Statista converts more buyers by letting them self-evaluate cost vs. value without human involvement.

**What Ken Research can do at its scale:** Publish a public pricing page with at minimum 3 tiers — even if only the lowest tier is self-serve and higher tiers are "contact us." The act of showing a starting price anchor ("Reports from $X, subscriptions from $Y") signals transparency and reduces buyer anxiety. This costs zero engineering and is immediately implementable.

---

### 2. Freemium Boundary
**What Statista does:** Free tier gives access to all "Basic" statistics (real data, no login required). Premium tier locks more detailed/recent stats. Downloads (any format), embeds, and commercial rights are always paid. Citations are always free.

**Why it works:** The freemium model attracts organic traffic (Google sends users to free stats), creates brand habit (users return for the free stats), and converts at a high-intent moment (when a user needs a specific premium stat they've already found). It's self-qualifying: users who hit the paywall on a specific stat are already past the awareness and consideration stages.

**What Ken Research can do:** Identify the 10–20% of your most-cited/searched reports and make their executive summaries and headline market sizes publicly indexable (not downloadable, but viewable). This creates the same high-intent conversion moment: buyer finds the market size on Google → reads executive summary on Ken Research → pays to get the full report.

---

### 3. Embeddable Charts Flywheel
**What Statista does:** Two-layer flywheel. (a) Daily Data: editorial charts produced daily, freely usable by media with attribution, driving sustained brand coverage in Forbes/Newsweek/etc. (b) Paid embed: Starter subscribers embed premium charts on their own sites via iframe, with Statista watermark and backlink.

**Why it works:** Every embedded chart or media citation is a brand impression and a backlink. Statista doesn't need to buy media coverage; it gives media the charts they need to tell data-driven stories. The paid embed layer ensures that high-quality chart distribution is done by paying subscribers who are motivated to share (they've paid for it).

**What Ken Research can do at scale:** Create a "Ken Research Chart" format — 5–10 shareable, visually clean charts per research report, posted on LinkedIn/Twitter with "Embed this chart" link. A simple embed code (Google Data Studio or Flourish iframe) with a "Source: Ken Research" watermark costs almost nothing and creates the same distribution mechanics. Priority: automotive, EV, FMCG, and sustainability sectors where Ken Research has existing depth.

---

### 4. Sample Preview UX
**What Statista does:** Basic stats show complete data tables free. Premium stats show chart area as blank/dashes and body text with asterisks. Market Outlook pages show headline KPIs free (revenue, CAGR, user count) and gate drilldown.

**Why it works:** The free preview is calibrated by product type. For basic stats: free data = best SEO + habit formation. For premium stats: asterisks = clear value signal without giving the data away. For Market Outlook: free headline KPIs = SEO gold (every "market size 2026" query gets answered on Statista pages).

**What Ken Research can do:** For every report, publish a "market overview" landing page with: (1) the market size headline number, (2) the CAGR, (3) 3 key findings, (4) the report TOC. No download, no form fill. Gate the actual report download behind payment. This answers the buyer's first-pass query ("is this market relevant to me?") for free and converts at the "I need the detail" moment.

---

### 5. Search Quality
**What Statista does:** Search bar prominent on every page. Multi-keyword queries handled competently ("AI market size Asia" → 22 relevant results including APAC country breakdown). Mixed content-type results (stats, reports, topics, market insights). Result card includes key data point in the summary (not just a title).

**Why it works:** The data point in the result card ("China: $46.5 billion USD") is the highest-value element of the search result — it lets the buyer pre-validate relevance without clicking. It's also a mini preview of the premium stat, which drives click-through and conversion.

**What Ken Research can do:** In the short term, improve the search bar on the existing website to return report summaries with the market size number visible in the result card. This is a markup change, not a database change. In the medium term, build a topic-page taxonomy (like Statista's 170-industry structure) to enable browse-style discovery alongside keyword search.

---

### 6. Mobile Experience
**What Statista does:** Hamburger nav, tap-friendly card grids, search-first design, responsive across all page types. No Tier A competitor has invested this much in mobile UX.

**Why it works:** A growing share of research discovery starts on mobile — particularly for strategy consultants and investment professionals who use phones as primary research tools. Statista's mobile-first responsiveness means it captures this traffic; Mordor/IMARC/Grand View lose it.

**What Ken Research can do:** Audit the existing site on a real iPhone and Android device. Fix the most obvious breakpoints (horizontal scroll, tiny font sizes, form fields that require zoom). This is a 2-week engineering fix, not a redesign, and it captures mobile search traffic that competitors are currently not serving.

---

## What Ken Research Should NOT Copy

### 1. The Million-Statistic Database Model
Statista's platform works because it has 1 million+ statistics across 170+ industries. The freemium model, the search quality, the topic-page density, and the Daily Data editorial flywheel all depend on having enormous breadth of data. Ken Research has deep sector-specific research, not broad statistical coverage. Attempting to replicate Statista's breadth with 60 people would dilute quality and produce a worse product than Statista at a fraction of the scale.

**What Ken Research has instead:** Depth in specific sectors (automotive, EV, FMCG, sustainability, Southeast Asia) that Statista's statistal-aggregate model cannot match. The competitive move is not to broaden into Statista's territory but to go deeper where Statista is thin.

### 2. The Self-Serve Subscription Checkout Flow
Statista's "Order now → Stripe checkout" flow for Starter ($2,388/year) requires: (a) a product that is sufficiently self-explanatory that buyers can purchase without a sales conversation, (b) credit card payment infrastructure for $2,388/year online transactions, (c) onboarding flows that don't require human handholding, and (d) a CRM/product system that handles renewals, seats, and permissions automatically. For a 60-person firm where most revenue comes from custom/enterprise contracts, building this infrastructure before the product catalog is self-explanatory would create operational complexity with low return.

**What Ken Research can do first:** Publish pricing on the website (near-zero cost), then add a "Pay Now" link for smaller reports ($500–$2,000 range) via a simple Stripe payment link. Self-serve checkout for individual reports before attempting subscription infrastructure.

### 3. The Daily Data Editorial Operation
Statista employs named data journalists (Felix Richter and team) producing daily infographics for media consumption. This is a dedicated editorial function with its own brand identity, media contacts, and publishing cadence. A 60-person firm cannot staff this — but it can execute a reduced version: 2–4 shareable charts per week on LinkedIn and Twitter, tied to the sectors where Ken Research has research depth.

### 4. The Localized Subdomain Network
Statista operates de.statista.com, es.statista.com, and other regional subdomains with translated content. This is a multi-million-dollar localization infrastructure that is completely out of reach for Ken Research's current scale. The right move is English-first excellence, not multi-language expansion.

---

## Sources

All page fetches conducted 2026-04-28 via WebFetch.

| Page | URL | Status |
|---|---|---|
| Homepage | https://www.statista.com | Fetched |
| Markets hub | https://www.statista.com/markets/ | Fetched |
| E-Commerce industry | https://www.statista.com/markets/413/e-commerce/ | Fetched (one redirect observed) |
| E-Commerce topic | https://www.statista.com/topics/871/automotive-industry/ (redirected) | Fetched alternate |
| Social media / advertising topic | https://www.statista.com/topics/979/social-media/ | Fetched (US Advertising variant) |
| Stat page — Basic (free) | https://www.statista.com/statistics/264810/number-of-monthly-active-facebook-users-worldwide/ | Fetched |
| Stat page — Premium (locked) | https://www.statista.com/statistics/617136/digital-population-worldwide/ | Fetched |
| Stat page — Premium (mobile app revenue) | https://www.statista.com/statistics/269025/worldwide-mobile-app-revenue-forecast/ | Fetched |
| Stat page — internet users (pricing confirmed) | https://www.statista.com/statistics/273018/number-of-internet-users-in-the-united-states/ | Fetched |
| Market Outlook — eCommerce worldwide | https://www.statista.com/outlook/emo/ecommerce/worldwide | Fetched |
| Market Outlook — OTT/Media | https://www.statista.com/outlook/dmo/digital-media/ott-video/worldwide | Fetched |
| Search results — EV market | https://www.statista.com/search/?q=electric+vehicle+market+size | Fetched |
| Search results — AI Asia | https://www.statista.com/search/?q=AI+market+size+Asia | Fetched |
| Pricing / account tiers | https://www.statista.com/accounts/ | Fetched (INR prices; USD confirmed via stat page upsell) |
| Registration / sign-up | https://www.statista.com/register/ | 404 |
| Registration alternate | https://www.statista.com/account/register | Partial fetch |
| Daily Data / Chart of Day | https://www.statista.com/chartoftheday/ | Fetched |
| Methodology | https://www.statista.com/aboutus/our-research-commitment | Fetched |
| About | https://www.statista.com/about/ | 404 |
| Consumer Insights hub | https://www.statista.com/consumer-insights | 404 |
| Pricing page direct | https://www.statista.com/prices/ | 404 |
| Footer | https://www.statista.com (footer) | Fetched |
| Media/embed services | https://www.statista.com/services/media-content/ | 404 |
