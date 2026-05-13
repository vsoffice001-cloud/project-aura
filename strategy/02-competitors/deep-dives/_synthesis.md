# Deep-Dive Synthesis — What the 5 Audits Mean for Ken Research
_Atlas, 2026-04-28._

---

## TL;DR

1. **404 rot is endemic across the two direct rivals.** Mordor and IMARC each have 20+ broken URLs — methodology, case studies, pricing pages, sector landing pages — that appear in navigation and footer links. Every page Ken Research ships that actually exists is an asymmetric trust advantage over both.
2. **Pricing opacity is a deliberate strategy for Mordor; an accidental one for IMARC.** Mordor shows pricing on exactly one audited report page (Cannabis). IMARC shows it consistently but with a reversed-strikethrough bug on at least one page. Statista, the best-in-class reference, shows four tiers publicly. Showing any pricing at all is already above par.
3. **Statista's free-citations trick is the single most efficient distribution move in the category.** Showing APA/Harvard/Chicago citation formats on every stat page — including locked ones — drives academic and media attribution that no advertising budget can replicate. The cost is zero. Ken Research can copy this today.
4. **CB Insights' MCP/integrations positioning signals where the category is heading.** No Tier A competitor has responded to the AI-tool-chaining moment. CB Insights has a dedicated nav item and footer column for "MCP & Integrations." Ken Research is closer to this distribution opportunity than any direct rival because its data is structured (CAGR, market size, segments) and therefore API-composable.
5. **Sector landing pages are missing across the board.** Both Mordor sector pages and IMARC sector pages are either 404 (Mordor) or marketing-copy shells with no report listings (IMARC). A sector hub that shows sub-sector taxonomy, report count, and CAGR callouts for featured reports is a complete whitespace win.
6. **The free-content flywheel only works when it's genuinely free.** Crunchbase News publishes "$300B into 6,000 startups" for free. Statista shows market size headline numbers for free. IMARC's and Mordor's blogs are anonymous, dateless, and short. The firms with the best organic traffic do not gate the headline number.
7. **Driver/restraint impact tables with CAGR percentage contributions are unique to Mordor** and appear nowhere else in the competitive set. This specific data format (+8.2% predictive analytics demand, -5.8% GPU bottlenecks) is the most imitable, highest-signal format across all five audits.
8. **Post-sale analyst support is IMARC's most under-noticed differentiator.** "10–12 Weeks" analyst access post-purchase appears on every IMARC report page and is not matched by Mordor, Statista, CB Insights, or Crunchbase. Ken Research already offers this; it needs to say so, in those words, on every report page.

---

## The strongest single moves we should steal (ranked by leverage)

**1. Driver/restraint impact table with CAGR % contributions on every report page**
- Source: Mordor Intelligence — `https://www.mordorintelligence.com/industry-reports/artificial-intelligence-market`
- Why it works: Surfaces analyst judgment ("GPU bottlenecks cost -5.8% CAGR") as a scannable table above the fold. No other competitor shows this. Buyers immediately see Ken Research is doing analysis, not just aggregation.
- Cost to copy: Low — it is a structured data component in the report template, not a new product capability. Add as a fixed section in the report detail page.
- Surface: Report Store (Surface 2), feeds into Report Viewer (Surface 3)
- Project: `projects/report-store-v07/`

**2. Free citation formats (APA, Harvard, Chicago) on every report and stat page — including locked ones**
- Source: Statista — `https://www.statista.com/statistics/617136/digital-population-worldwide/`
- Why it works: Academic, media, and consultant citation of a locked stat generates a backlink and brand impression with zero cost. Every paper that cites "Ken Research, 2026" trains a professional audience. Statista's entire media authority is partly built on this mechanism.
- Cost to copy: Low — a static UI component below every report card and report viewer page. No backend change required.
- Surface: Report Store (Surface 2), Report Viewer (Surface 3)
- Project: `projects/report-store-v07/`

**3. Inline 3-tier pricing block on every report page — with regional vs. global differential**
- Source: IMARC Group — `https://www.imarcgroup.com/electric-vehicles-market` (global) and `https://www.imarcgroup.com/india-electric-vehicle-market` (regional, ~$500 lower)
- Why it works: IMARC is the only Tier A competitor showing consistent pricing across all report pages. Mordor shows it on one page. The regional discount architecture (India EV: $3,499 vs. Global EV: $3,999) signals rational pricing logic that builds trust. Ken Research showing pricing here immediately surpasses Mordor.
- Cost to copy: Low — pricing tiers are already known; this is a display decision, not a pricing strategy change. The regional tier differential requires one design decision.
- Surface: Report Store (Surface 2)
- Project: `projects/report-store-v07/`

**4. "View Global Report" + sibling regional variants navigation on report pages**
- Source: Mordor Intelligence — `https://www.mordorintelligence.com/industry-reports/india-electric-vehicle-market`
- Why it works: A buyer on the India EV page sees linked alternatives (Africa, Asia, Europe, Global) in a sidebar without navigating back to search. This is a cross-sell embedded in the reading experience, not a separate recommendation widget. It dramatically increases pages-per-session on report pages.
- Cost to copy: Low-Medium — requires a data model that associates parent/sibling reports by topic+geography. Backend query exists in `ken-research-backend`; the front-end component is new.
- Surface: Report Store (Surface 2), Report Viewer (Surface 3)
- Project: `projects/report-store-v07/`, `projects/ken-research-backend/`

**5. Quantified subheadline immediately under the homepage headline**
- Source: Mordor Intelligence — `https://www.mordorintelligence.com` ("26,683 reports across 100+ industry segments")
- Why it works: Replaces vague superlatives ("leading market research firm") with a specific, verifiable number. Buyers in 3 seconds know the catalog depth. Mordor's use of two different report counts (26,683 and 17,000 on the same page) is the error to avoid; pick one number and maintain it.
- Cost to copy: Low — copywriting change on the homepage hero. The number (Ken Research's catalog size) should be exact and sourced from the backend catalog count.
- Surface: Discovery (Surface 1)
- Project: `projects/topnav-v32/` (homepage is part of the topnav/homepage scope)

**6. Headline KPIs free on every market overview landing page (market size, CAGR, year range)**
- Source: Statista — `https://www.statista.com/outlook/emo/ecommerce/worldwide`
- Why it works: Every "EV market size India 2030" Google query that lands on a Ken Research page and immediately sees "USD 110.7 Billion by 2029 at 19.44% CAGR" builds trust and satisfies the discovery intent. The buyer then pays to get the full segmentation and forecast tables. This is also an SEO mechanism — Google can feature-snippet the number.
- Cost to copy: Medium — requires a consistent "market overview card" at the top of every report landing page with the headline KPIs exposed to anonymous visitors (no login, no form). Backend data is already structured (CAGR and market size are fields); the page template is new work.
- Surface: Report Store (Surface 2), Discovery (Surface 1)
- Project: `projects/report-store-v07/`

**7. Search bar as primary homepage interactive element with example NL chips**
- Source: Crunchbase — `https://www.crunchbase.com` (search bar + NL chips); Statista — `https://www.statista.com` (prominent persistent search)
- Why it works: Both best-UX references in the set treat search as the product's identity on the homepage, not a utility in the header. The example query chips ("EV battery market India 2030" / "healthcare AI CAGR Southeast Asia") teach NL behavior without documentation and reduce blank-slate paralysis.
- Cost to copy: Medium — the `topnav-v32` project already scopes the nav bar redesign. Adding a hero search bar with chips is a component addition, not an architecture change. Requires search results page work in `report-store-v07`.
- Surface: Discovery (Surface 1)
- Project: `projects/topnav-v32/`, `projects/report-store-v07/`

**8. Live statistics row on homepage ("X reports published / Y new this month / Z sectors")**
- Source: Crunchbase — `https://www.crunchbase.com` ("4,658,038 new predictions / 51,380 new insights / 3,453 new funding rounds")
- Why it works: Makes the homepage feel like a live product dashboard instead of a static brochure. Three numbers updated monthly cost near-zero to maintain and replace "trusted by Fortune 500" copy with a product vitality signal.
- Cost to copy: Low — static numbers updated monthly, or a simple API call to the backend catalog count. Zero new infrastructure.
- Surface: Discovery (Surface 1)
- Project: `projects/topnav-v32/`

**9. Sector hub pages with report count, sub-sector taxonomy, and CAGR callouts for featured reports**
- Source: Mordor Intelligence — `https://www.mordorintelligence.com/industry-reports` (the "TRENDING REPORTS" with CAGR callouts is the one working element); IMARC sector pages (`https://www.imarcgroup.com/categories/healthcare-market-research-reports`) are the failure mode to avoid.
- Why it works: A sector hub that shows "Healthcare: 1,240 reports / Pharmaceuticals 18.3% CAGR / Medical Devices 12.1% CAGR / Diagnostics 9.4% CAGR" with filterable sub-sectors is a complete whitespace win — neither direct rival has this page working. Buyers evaluating sector coverage see depth signal before clicking into any individual report.
- Cost to copy: Medium — new page template, requires catalog data grouped by sector taxonomy. `ken-research-backend` likely has the sector tagging; the front-end page is new.
- Surface: Discovery (Surface 1), Report Store (Surface 2)
- Project: `projects/report-store-v07/`

**10. Named quarterly "State of [Sector]" report series with full top-line data free**
- Source: CB Insights — `https://www.cbinsights.com/research/` (State of Venture Q1'26, State of AI Q1'26); Crunchbase News — `https://news.crunchbase.com/venture/record-breaking-funding-ai-global-q1-2026/`
- Why it works: A consistent naming convention ("State of EV Batteries Q2'26") creates anticipation, SEO anchor pages, and a newsletter driver simultaneously. Publishing headline market size and CAGR free — with the 80-page breakdown gated — converts search traffic at the "I need the detail" moment, which is a much higher-intent conversion point than form-gating everything.
- Cost to copy: Medium — editorial workflow change, not a product engineering change. Requires analyst time + a consistent template. The casestudy-templates project (`projects/casestudy-templates/ken-v1/`) is the natural design system home for the article format.
- Surface: Engagement (Surface 5), Discovery (Surface 1)
- Project: `projects/casestudy-templates/ken-v1/`

**11. Post-sale analyst support commitment, stated explicitly on every report page**
- Source: IMARC Group — `https://www.imarcgroup.com/electric-vehicles-market` ("10–12 Weeks Post Purchase Analyst Support")
- Why it works: This is the only service-level promise on any Tier A report page. It differentiates Ken Research from a pure report-delivery model and is directly applicable since Ken Research already offers this. The gap is not product — it is display. Not saying it is the failure.
- Cost to copy: Low — a single line of copy added to the report page metadata block. Zero engineering.
- Surface: Report Store (Surface 2), Engagement (Surface 5)
- Project: `projects/report-store-v07/`

**12. Outcome-first trust badge row in homepage hero (not generic certification logos)**
- Source: CB Insights — `https://www.cbinsights.com` ("All of the Big 4 / 86% of software companies / 26 of 30 largest banks")
- Why it works: Certification badges (ISO, ESOMAR, MRSI) are category hygiene — every credible firm has them. CB Insights' trust row quantifies market penetration ("10 of the 10 largest businesses") rather than credentials. Ken Research's equivalent: "Downloaded by analysts at [X] of the top 50 consulting firms / Cited in [Y] investment memos" — specific, verifiable, buyer-relevant.
- Cost to copy: Low — copywriting + design change in the homepage hero section. The numbers require internal sourcing (download logs, client references).
- Surface: Discovery (Surface 1)
- Project: `projects/topnav-v32/`

---

## The strongest single failures we must avoid (ranked by frequency × severity)

**1. Footer and nav links that 404 (appeared on 2 of 5 sites; moderate-high severity)**
- Observed: Mordor (`/methodology`, `/case-studies`, `/subscription-plans`, `/sample-request`, 15+ sector pages); IMARC (`/case-studies`, `/industries`, `/methodology`, `/pricing`, 20+ report pages)
- Why it matters: A link in the footer to a page that 404s communicates "we promised something we don't have." Enterprise buyers checking methodology or case studies are the highest-intent visitors. A 404 at that moment is a trust exit.
- Avoid pattern: Do not add nav or footer links to planned-but-not-yet-built pages. Ship the page first, then link it.

**2. CTA overload creating decision paralysis on report pages (IMARC, 5 of 5 audited report pages)**
- Observed: IMARC — `https://www.imarcgroup.com/cosmetics-market` (6 CTAs: Buy Now Discount Offer / Request Sample / Request Customization / Speak to Analyst / Request Brochure / Inquire Before Buying)
- Why it matters: Hick's Law. More CTA options on one page reduces conversion rate for every individual CTA. A buyer who doesn't know whether to "Request Sample" or "Inquire Before Buying" or "Request Brochure" often does none.
- Avoid pattern: Maximum 3 action paths per report page. Recommended hierarchy: primary (Buy Now) / secondary (Request Sample) / tertiary text link (Speak to Analyst). Everything else is footer-level.

**3. Sector landing pages that are marketing shells with no report listings (IMARC, all tested)**
- Observed: IMARC — `https://www.imarcgroup.com/categories/healthcare-market-research-reports`; `https://www.imarcgroup.com/categories/food-beverages-market-reports`
- Why it matters: A buyer arriving at a sector page to browse "all pharma reports" and seeing three paragraphs about IMARC's consulting capabilities will bounce immediately. The page's job is to show the product, not sell the firm.
- Avoid pattern: No sector page ships without at minimum 10 real report cards, a sub-sector filter, and a report count.

**4. Anonymous, dateless blog content claiming analyst expertise (IMARC, Mordor)**
- Observed: IMARC blog posts (`https://www.imarcgroup.com/blog/cannabis-industry-trends`, `https://www.imarcgroup.com/blog/ice-cream-trends`) — no author, no date; Mordor blog — no author bylines, visible cadence gaps (posts from 2025 alongside Oct 2023 post)
- Why it matters: "Analyst credibility" is a claimed differentiator for both firms but neither posts show who wrote them or when. The expertise signal requires a name, photo, title, and date. Anonymous, dateless content reads as AI-generated filler in 2026 and destroys the credibility of the analyst brand it's meant to build.
- Avoid pattern: Every Ken Research article must carry: author name, author title, publish date, and minimum 800-word original analysis. Not 400-word listicles.

**5. Pricing inconsistency across report pages (Mordor — confirmed on 4 audited pages)**
- Observed: Mordor — pricing shown on `https://www.mordorintelligence.com/industry-reports/cannabis-market` (Single $4,750 / Team $5,250 / Corporate $8,750) but absent on AI, EV, and Coffee report pages. IMARC — reversed strikethrough pricing on `https://www.imarcgroup.com/packaged-food-market` (shows $3,999 crossed out → $4,500, the reverse of other pages).
- Why it matters: A buyer comparing two Mordor reports who sees pricing on one and not the other has no reliable signal — they either assume pricing varies by report (true, but confusing) or that the site is broken (also a reasonable interpretation). Inconsistency is worse than opacity.
- Avoid pattern: Pricing display logic must be systematic. Either show pricing on all report pages or on none. A partial implementation is more damaging than a clean no-pricing-shown policy.

**6. Homepage hero CTA pointing to a different business (IMARC — singular but severe)**
- Observed: IMARC — `https://www.imarcgroup.com` — primary hero CTA is "Explore IMARC Engineering" linking to an EPCM engineering solutions site
- Why it matters: A research buyer landing on the homepage of a market research company whose first CTA promotes a construction engineering division will bounce or be confused. Brand identity fragmentation at the entry point is the most expensive UX failure possible — it wastes all acquisition spend on the homepage.
- Avoid pattern: Ken Research's homepage must have exactly one identity: market research and consulting. No cross-promotion of non-research services above the fold.

**7. "Platform" marketing without any screenshots or demo (Mordor, partly CB Insights)**
- Observed: Mordor Synapse page — `https://www.mordorintelligence.com/synapse` — "Your Market Intelligence Command Centre," no screenshots of actual UI; CB Insights Team of Agents page — no screenshots of any agent in action
- Why it matters: In 2026, "AI platform" is a category claim made by every research firm. The differentiator is showing the UI. A product page with zero screenshots is indistinguishable from vaporware.
- Avoid pattern: Any Ken Research platform or portal page must include at minimum 2 real UI screenshots (not mock-ups — actual rendered interface) and a demo video or interactive element.

**8. "Trusted by Fortune 500" as the sole trust signal (IMARC About, Mordor About)**
- Observed: IMARC About page — `https://www.imarcgroup.com/about-us` — no named leadership, no certifications, no timeline; strongest client stats ("34 of top 50 pharma firms") buried on the Contact page (`https://www.imarcgroup.com/contact-us`), not on About
- Why it matters: The strongest trust signals are placed where buyers are least likely to see them. High-intent buyers who go to About are evaluating trust; giving them generic stats and no leadership names fails the evaluation.
- Avoid pattern: Ken Research's About/Methodology pages must surface the strongest trust data in the hero — not in the Contact page footer copy.

---

## Cross-cutting patterns

**Pattern 1: The 404 rot law.** All four sites with significant content archives (Mordor, IMARC, CB Insights, Crunchbase) have meaningful numbers of broken URLs. Mordor and IMARC are the worst — sector pages, methodology pages, case study pages, pricing pages, and sample request pages all 404. The pattern is consistent enough to suggest a structural cause: these firms built site navigation to signal ambition ("we have methodology / case studies / pricing") before building the pages, then never backfilled. The footer and nav promise more than the site delivers. Ken Research must invert this — pages are linked only when they exist, not when they are planned.

**Pattern 2: Free content at discovery, paid at specificity.** Statista and Crunchbase have both independently converged on the same freemium architecture: the browse/discovery layer is fully free (topic pages, hub pages, homepage, editorial), and the gate appears only when a user wants a specific data value. Neither IMARC nor Mordor has implemented this — their sample forms appear before any data is revealed, which means the gate fires before value is demonstrated. The conversion implication: Statista and Crunchbase convert higher-intent buyers (users who hit the wall on a specific stat they already found and want) rather than lower-intent buyers (users who fill out a form hoping the report might be relevant). For Ken Research, the operative question is not "should we gate?" but "at what specificity should the gate fire?"

**Pattern 3: Pricing transparency is the exception, not the norm.** Of the five audited sites, only Statista shows a complete public pricing table (4 tiers, annual cost, feature list). IMARC shows per-report pricing consistently but has no pricing page. Mordor shows pricing on one audited report page inconsistently. CB Insights and Crunchbase hide all pricing behind contact/trial gates. The market norm is opacity. This means any pricing display by Ken Research — even just "Reports from $X, subscriptions from $Y" — is a differentiation signal, not a commodity feature. Statista's transparent pricing page creates higher organic trust; Ken Research should do the minimum viable version of this.

**Pattern 4: Mobile is a neglected surface for Tier A.** None of the five audited Tier A sites has invested meaningfully in mobile UX. Statista is the exception — hamburger nav, tap-friendly card grids, search-first design are explicitly noted as functional. Mordor and IMARC are assumed to be basic responsive stacks. CB Insights and Crunchbase were not independently verified on mobile. The deep-dives could not fully audit mobile rendering. Given that research discovery now starts frequently on mobile (strategy consultants, investment analysts with phones as primary tools), any Ken Research audit should treat mobile rendering as a first-class surface, not an afterthought.

**Pattern 5: Post-sale service is a report-page trust signal, not a post-purchase feature.** IMARC's "10–12 Weeks Post Purchase Analyst Support" appears on the report detail page before purchase — it is a purchase motivator, not a fulfillment note. No other Tier A competitor shows this kind of service-level commitment on the product page. Ken Research's equivalent (analyst follow-up, call access, data clarification) should be stated explicitly on every report page in the format: "Includes X weeks of analyst support post-purchase."

**Pattern 6: Proprietary naming compounds brand authority.** CB Insights: "Mosaic Score," "Predictive Sourcing," "Deep Analyst," "Competitive Sentinel." Crunchbase: "CB Rank," "Growth Prediction," "Unicorn Board," "Megadeals Board." Statista: "Market Outlook," "Chart of the Day," "Research AI." None of the Tier A direct rivals (Mordor, IMARC) have named any features or scores with proprietary brand vocabulary — their product language is entirely generic ("market research reports," "industry analysis"). Ken Research has an opportunity to name its analytical formats (driver/restraint impact table, sector concentration label, regional confidence score) and build brand vocabulary that competitors cannot credibly copy.

**Pattern 7: Certifications are hygiene, not differentiation.** Mordor, IMARC, and both Tier C reference companies all display some combination of ISO 9001, ISO 27001, ESOMAR, MRSI, and Great Place to Work certifications. Statista — the best-performing site — displays none of these in prominent positions and instead uses specific staff counts (300+ experts), source counts (49,400+), and methodology transparency. The implication: certification badges belong in the footer and methodology page, not in the hero. What replaces them in the trust hierarchy is specificity: named analysts, named data sources, named validation steps.

---

## Surface-by-surface receipt index

### Discovery (Surface 1)

- Steal from: `https://www.crunchbase.com` — search bar as the primary hero interactive element, with NL query chips below ("Search reports or ask a research question"); live statistics row showing catalog vitality ("X reports / Y new this month / Z sectors covered")
- Steal from: `https://www.mordorintelligence.com` — quantified subheadline under the main headline ("26,683 reports across 100+ industry segments"); the "TRENDING REPORTS" section on the hub page with CAGR callouts
- Steal from: `https://www.statista.com` — search bar in persistent header, not hidden behind a search icon; popular topic chips in hero; price anchor in nav ("Reports from $X")
- Steal from: `https://www.cbinsights.com` — outcome-first trust badge row replacing generic certification badges; subheadline written as buyer persona recognition ("How strategy teams access market intelligence before their clients ask for it")
- Avoid like: `https://www.imarcgroup.com` — hero CTA pointing to IMARC Engineering instead of research; density overload combining EPCM services, research stats, client logos, testimonials, and FAQ in a single page with no hierarchy of intent
- Avoid like: `https://www.mordorintelligence.com/industry-reports` — "Contact Us" as the sector hub CTA, immediately converting a browse experience into a sales inquiry before the buyer has seen any reports

### Report Store (Surface 2)

- Steal from: `https://www.imarcgroup.com/electric-vehicles-market` — inline 3-tier pricing block with strikethrough anchoring; "10–12 Weeks Post Purchase Analyst Support" as a stated commitment on the page; conversion ladder of max 3 CTAs (Buy Now / Request Sample / Speak to Analyst)
- Steal from: `https://www.imarcgroup.com/india-electric-vehicle-market` — regional pricing visibly lower than global pricing; sub-national data previewed free
- Steal from: `https://www.mordorintelligence.com/industry-reports/artificial-intelligence-market` — driver/restraint impact table with specific CAGR % contributions; major player logos in a labeled grid above fold; segment percentages in Key Takeaways visible without form fill
- Steal from: `https://www.mordorintelligence.com/industry-reports/india-electric-vehicle-market` — "View Global Report" + sibling regional variant links for lateral navigation
- Steal from: `https://www.mordorintelligence.com/industry-reports/cannabis-market` — explicit gating disclaimer ("Segment shares available upon report purchase") which is more honest than hiding the gate; FAQ section (6 questions) answering buyer objections inline; methodology explanation addressing data discrepancies vs. competitors
- Steal from: `https://www.statista.com/outlook/emo/ecommerce/worldwide` — headline KPIs free above fold (market size, CAGR, user count); methodology section with downloadable detail on the same page as the data; market scope definition (explicit inclusions/exclusions)
- Steal from: `https://www.statista.com/statistics/617136/digital-population-worldwide/` — citation format block (APA, Harvard, Chicago) free on every stat page including locked ones
- Avoid like: `https://www.imarcgroup.com/cosmetics-market` — 6 competing CTAs creating Hick's Law paralysis
- Avoid like: `https://www.imarcgroup.com/packaged-food-market` — reversed strikethrough pricing (original shown as lower than discounted) which destroys pricing credibility
- Avoid like: `https://www.imarcgroup.com/categories/healthcare-market-research-reports` — sector page that is a marketing-copy shell with no report listings; "Inquire Before Buying" as the only sector CTA

### Report Viewer (Surface 3)

- Steal from: `https://www.statista.com/statistics/264810/number-of-monthly-active-facebook-users-worldwide/` — the "+" suffix on download buttons (PDF+, XLS+, PNG+) as a clean locked-state signal without an intrusive lock icon; free data table + locked exports as the freemium boundary for the viewer
- Steal from: `https://www.cbinsights.com/company/anthropic` — "$0000 View" progressive disclosure gate: show field labels and data structure with obfuscated values rather than hiding the field entirely; creates data hunger rather than a wall
- Steal from: `https://www.mordorintelligence.com/industry-reports/cannabis-market` — sticky bottom CTA on long-scroll pages ("Complete My Request" pattern)
- Note: This surface is genuinely sparse across all 5 audits. None of the competitors has a real in-browser report viewer. Ken Research building even a basic in-browser TOC navigator with unlockable section previews would be first-in-class in the direct peer set.

### Dashboards (Surface 4)

- Steal from: `https://news.crunchbase.com` — named persistent data trackers ("Unicorn Board," "Layoffs Tracker") that update on a schedule and become bookmarked tools; Ken Research equivalent: "Global CAGR Leaderboard" (top 25 sectors by current CAGR), "Market Entry Hotspots" (fastest-growing emerging markets)
- Steal from: `https://www.statista.com/chartoftheday/` — named data journalist attribution on dashboard-style editorial; daily/weekly publish cadence that creates habit loops
- Steal from: `https://www.statista.com/outlook/emo/ecommerce/worldwide` — currency switcher on all revenue figures; geographic comparison selector; "Compare to other regions" toggle — these are the minimum interactive dashboard features that make static data feel alive
- Note: `design-system/dashboard/` is the primary home for these patterns.

### Engagement (Surface 5)

- Steal from: `https://www.cbinsights.com/research/` — quarterly "State of [Category]" series with consistent naming, consistent structure, and full top-line data free; editorial hub organized by 6-8 curated topic tiles, not a flat 60-category list; webinar series as editorial product that creates scheduled return visits
- Steal from: `https://news.crunchbase.com/venture/record-breaking-funding-ai-global-q1-2026/` — number-led headline construction ("Asia Pacific Battery Storage Market Hits $47B" not "Significant Growth Observed"); named author with data journalism credentials; table of contents with anchor-linked sections in long-form articles; "Crunchbase Daily" newsletter as a named owned distribution channel
- Steal from: `https://www.mordorintelligence.com/about` — downloadable recommendation letters alongside testimonials (not just quotes — actual letters with signatures); company timeline 2014–2025 with specific milestones as a credibility arc
- Avoid like: `https://www.imarcgroup.com/blog/cannabis-industry-trends` — anonymous, dateless blog posts with no author byline; 400-word listicles with no original data; internal links as the only value-add
- Avoid like: `https://www.imarcgroup.com/contact-us` — 10-field + CAPTCHA contact form; strongest trust stats on the site ("34 of top 50 pharma firms") buried on the contact page where high-intent buyers are forced to encounter them after already deciding to reach out
- Note: `projects/casestudy-templates/ken-v1/` is the design system home for the free article and quarterly report formats.

---

## What changed in our thinking after these deep-dives

- **Before these audits, we believed Mordor was a UX laggard we could easily beat on fundamentals.** The depth audit confirmed the report page quality is actually strong — CAGR tables, driver/restraint impact data, and segment percentages are visible without a form fill. What Mordor has broken is everything around the report pages: navigation, sector hubs, methodology, case studies, pricing. The corrected view: Mordor's report detail page is the bar to beat, not the floor. The site architecture around it is where we win.

- **Before these audits, we assumed IMARC's 10-field contact form was a minor irritant.** The depth audit showed it is structurally contradictory: the report pages show transparent pricing (suggesting a self-serve buyer) but the contact form is the heaviest in the entire competitive set (suggesting a high-friction sales-qualified model). IMARC has not resolved which model it is. This contradiction creates a conversion leak that Ken Research can exploit by being explicit about which buyer type each CTA targets.

- **CB Insights' MCP/integrations positioning was not visible in the breadth audit.** The depth audit revealed it has a dedicated nav category ("MCP & Integrations"), a footer column, and a product page. This is not a feature; it is a distribution strategy. CB Insights is positioning itself as a data layer for Claude, ChatGPT, Copilot, and Snowflake workflows. The implication for Ken Research is meaningful: structured market data (CAGR, market size, segments, geographic breakdowns) is exactly the kind of data that enterprise AI workflows want to pull via API. `ken-research-backend` already has this data in structured form. An API/MCP access tier is not a roadmap fantasy — it is a near-term positioning opportunity.

- **Statista's free-citations finding was not anticipated from the breadth audit.** We knew Statista showed pricing. We did not know it shows APA/Harvard/Chicago citations on locked stat pages for free. This turns every gated page into a passive brand distribution mechanism. The cost of implementing this on Ken Research's report pages is zero. It should be in the next sprint.

- **The breadth audit implied Mordor's structural 404 rot was a known maintenance issue.** The depth audit confirmed it is systemic and severe — 17+ confirmed 404 URLs spanning core pages (methodology, pricing, case studies, sample request, sector landing pages). This is not a maintenance backlog; it is a promise the site makes that the actual site does not keep. The competitive implication is sharper than the breadth audit suggested: not just "we should have working pages" but "every working page at Ken Research is a differentiator against the Tier A set."

- **IMARC's pricing intelligence product (700+ commodity pricing reports with annual subscription tiers) was completely invisible in the breadth audit.** The depth audit found it in the pricing sitemap. It is a distinct product line with a different pricing model (biannual/quarterly/monthly update subscriptions at $3,999–$7,999/year) that no direct Tier A competitor offers at this scale. This is not directly relevant to Ken Research's current roadmap but is evidence that the most defensible moats in the category are product extensions that competitors haven't noticed, not incremental improvements to shared product types.

---

## What we still don't know

1. **Mobile rendering on real devices for Mordor and IMARC.** Both deep-dives relied on desktop observations with stated assumptions about responsive stacking. We don't know whether Mordor's data-dense report pages collapse gracefully on mobile or break (font sizes, form fields, data tables). Given that the hypothesis is "mobile neglect is endemic in Tier A," we need a real iPhone/Android audit of both competitors' report pages to confirm the whitespace and calibrate how much mobile investment Ken Research needs.

2. **What the gated Statista pricing pages actually show for India-based buyers.** The Statista audit noted that the `/accounts/` URL returned INR pricing due to geo-IP detection, requiring USD conversion. We don't know whether Statista shows a different pricing tier or UI to Indian buyers (Ken Research's primary market). If Statista has a localized India pricing page at a materially lower price point, it changes the competitive landscape for Ken Research's domestic subscription pricing.

3. **IMARC's actual sample report content and delivery.** The audit confirmed the "Request Sample" CTA exists on every report page but could not verify what the sample contains (page count, format, data completeness). If IMARC delivers a 20-page substantive preview, Ken Research's sample needs to be at least as comprehensive. If it delivers a 2-page brochure, Ken Research can differentiate on sample quality immediately.

4. **Mordor's Synapse actual product experience behind the 7-day trial.** The Synapse page shows CTAs ("Start Your Trial," "Login to Synapse") but no pricing and no screenshots of the actual UI. We don't know whether Synapse is a genuinely functional platform or a thin layer over the existing report catalog. If Synapse is a real competitive product, it changes the priority of `design-system/dashboard` work. A hands-on trial audit of Synapse is required before scoping the dashboards surface.

5. **CB Insights' and Crunchbase's actual conversion rates from their freemium and trial models.** The audits documented the UX design of both companies' free-to-paid funnels but cannot verify what conversion rates they achieve. Before Ken Research commits engineering resources to a freemium tier or free report summaries, it would be valuable to find any public data (case studies, investor materials, press coverage) on how many free-tier Crunchbase users convert to Pro, or how many Statista Basic users convert to Starter. This would calibrate whether the freemium investment is worth the product complexity at Ken Research's current scale.
