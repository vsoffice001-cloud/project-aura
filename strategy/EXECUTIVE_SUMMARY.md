# Executive Summary — Ken Research Competitive Strategy

_Atlas, 2026-04-28. Updated 2026-04-29 with deep-dive synthesis. The 5-minute read. Full reasoning in linked docs._

---

## The honest truth (start here)

Ken Research is a **small (~₹9–11 cr revenue, ~62 MCA-filed FTEs, FY25 loss-making), founder-led, emerging-market-strong, design-led firm** competing in a category dominated by larger but UX-tired global players. Several headline marketing claims (2,000+ clients, 70% Fortune 2000, 500+ analysts, 190+ countries) are unverifiable from public sources. Glassdoor sentiment is hostile and includes 2026 reviews accusing leadership of seeding fake 5-star reviews — a reputation overhang no design strategy can outrun.

Full evidence: [`01-company/ken-research-fact-sheet.md`](01-company/ken-research-fact-sheet.md).

## The competitive truth

**Round 1** — 20 global competitors audited across 3 tiers:
- **Tier A (IMARC, Mordor, Grand View, MarketsandMarkets, Allied, Technavio, Fortune BI):** Large-catalog rivals with 2012-era B2B funnel UX. No pricing transparency. Form-fill to see anything. Demo-wall "platforms." 1.5–2.5 / 5 design maturity.
- **Tier B (Gartner, Forrester, GlobalData, IDC, Frost):** Premium advisory, role-based IA, gated platforms. Gartner sets the bar at 5/5.
- **Tier C (Crunchbase, CB Insights, PitchBook, Tracxn, Statista platform):** Modern data-product UX. Self-serve. Free tiers. AI-native search. 4–4.5 / 5.

> **The upper-right quadrant — high data depth × high design maturity — is empty.**

**Round 2** — page-by-page deep-dives of 5 chosen rivals (Mordor, IMARC, Statista, CB Insights, Crunchbase) on mobile + desktop with sourced URLs. Synthesis surfaced 12 ranked moves to steal and 8 failures to avoid. Three findings stand out:

1. **Statista shows APA / Harvard / Chicago citation formats free on every locked stat page.** Drives academic and media backlinks at zero cost. No Tier A rival does this. Cost to copy: a static UI component. Single highest-leverage move in the entire audit.
2. **CB Insights has staked the "MCP & Integrations" position** — a data layer for Claude / ChatGPT / Snowflake / Salesforce workflows. No Tier A rival has responded. Our backend data is already structured (CAGR, segments, geography). This is a near-term opportunity, not a roadmap fantasy.
3. **Mordor's report detail pages are genuinely strong** — driver/restraint impact tables with CAGR % contributions, free segment percentages, sibling regional links. The bar is higher than Round 1 implied. The site architecture *around* their report pages (sector hubs, methodology, case studies) is where they're broken — and where we win.

Full evidence: [`02-competitors/competitor-landscape.md`](02-competitors/competitor-landscape.md), [`02-competitors/deep-dives/_synthesis.md`](02-competitors/deep-dives/_synthesis.md), and 5 page-level deep-dives in [`02-competitors/deep-dives/`](02-competitors/deep-dives/).

## The wedge

**Ken Research is the design-led market intelligence firm — emerging-market depth, consultant-grade analysis, delivered as a product, not a PDF.**

Why it works: nobody combines Tier A research depth with Tier C product UX. We have credible emerging-market depth (verified offices: Gurugram, Dubai, Tangerang, Doha; verified GCC + SEA + India + Africa publishing density). We are small enough to move on a design ambition that paralyzes Mordor or IMARC. We already have design system v26, brand tokens locked, and 9 active projects in flight.

Full reasoning: [`03-positioning/wedge.md`](03-positioning/wedge.md).

## The five surfaces

We win or lose on five experience surfaces. Each has a playbook in [`04-experience-playbook/`](04-experience-playbook/).

| # | Surface | Today's bar | Our north star |
|---|---|---|---|
| 1 | Discovery (homepage, sectors) | Stock photo + corporate navy | NYT × Linear × Stripe — editorial, dark, specific |
| 2 | Report Store | Form-fill to see price | Stripe checkout × Linear product page |
| 3 | Report Viewer | PDF email attachment | Apple Books × Notion × Substack reader |
| 4 | Dashboards / Data | Doesn't exist for Tier A | Statista freemium × Linear × Stripe Sigma |
| 5 | Engagement | Word doc proposal + email | Linear-style portal per engagement |

## The roadmap

Sequenced in [`05-design-improvements/roadmap.md`](05-design-improvements/roadmap.md). We do not parallel-build all five.

- **Wave 1 (30 days):** Trust + transaction. Honest hero, public pricing, free previews, basic search. Highest leverage; lowest competitor competence.
- **Wave 2 (60–90 days):** The deliverable. Real checkout, faceted search, in-browser report viewer prototype, designed proposals.
- **Wave 3 (90–180 days):** The product. Public dashboards, embeddable charts, NL search, engagement portal MVP. Tier-C territory.
- **Wave 4 (180+ days):** The relationship. Full engagement portal, branded close-outs, saved views, quarterly account reviews.

## What we stop doing
- Unverifiable headline claims that one investigative blog post destroys.
- Generic "Global Strategic Consulting Firm" copy that's identical to every Tier A rival.
- "Ken-Research-vs-Mordor" comparison pages without an actual UX advantage to demonstrate.
- Hidden pricing and demo-wall report stores.
- Any pattern of seeded reviews. (This is not a design fix. It is a leadership decision.)

## What we double down on
- Public, transparent pricing on every report.
- **Free citation block (APA / Harvard / Chicago) on every report page**, including locked ones.
- **Driver/restraint impact tables** with CAGR % contributions on every report.
- **Post-sale analyst support copy** ("Includes X weeks of analyst access") on every report page — we already deliver this, the gap is display.
- **Headline KPIs** (market size, CAGR, year range) free above-fold on every report landing page.
- **API / MCP access tier** — first Tier A firm to ship this owns the AI-pipeline distribution conversation.
- A genuinely good in-browser report viewer.
- Live dashboards for our top sectors + named persistent trackers ("CAGR Leaderboard", "Market Entry Hotspots").
- GCC + SEA + Africa specialist authority — leaning into where we already publish.
- 8–12 design-grade case studies (not 2).
- Free, embeddable charts (Statista's distribution flywheel).
- Quarterly "State of [sector]" series — named, dated, analyst-attributed.
- Mobile-first across every surface.

## The non-design risks we have to flag
- **Reputation:** the Glassdoor pattern needs leadership attention. No design budget outruns it.
- **Cash:** FY25 was loss-making. Wave 1 is non-negotiable; Waves 3–4 are deferrable if runway tightens.
- **Data structure:** dashboards assume underlying data is structured, not just narrative. Confirm before Wave 3.
- **Backend capacity:** [`projects/ken-research-backend/`](../projects/ken-research-backend/) is on the critical path. Resourcing matters.

## How this workspace is meant to be used
- Read this summary first.
- Read [`01-company/ken-research-fact-sheet.md`](01-company/ken-research-fact-sheet.md) to anchor in truth.
- Read [`03-positioning/wedge.md`](03-positioning/wedge.md) to internalize the spine.
- Pick a surface in [`04-experience-playbook/`](04-experience-playbook/) and ship from [`05-design-improvements/roadmap.md`](05-design-improvements/roadmap.md).
- Add to [`06-research-log/`](06-research-log/) as we learn — competitor moves, internal data, prototype results.

The workspace is alive. It updates with us.
