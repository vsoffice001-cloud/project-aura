# The Wedge — How Ken Research Wins

_Atlas, 2026-04-28. Built from [`01-company/ken-research-fact-sheet.md`](../01-company/ken-research-fact-sheet.md) and [`02-competitors/competitor-landscape.md`](../02-competitors/competitor-landscape.md)._

---

## The honest starting position

We have to start with truth, not marketing. The fact sheet shows:

- ~₹9–11 cr revenue (FY24/25), declining, with negative margins.
- ~62 MCA-filed FTEs, even if LinkedIn says 201–500. The "500+ analysts" claim is unverified.
- Zero verified third-party client reviews (Clutch, TechBehemoths). All marquee client names (FIFA, Samsung, BMW, World Bank, IFC) come exclusively from our own materials.
- Glassdoor 3.2/5 with explicit accusations of seeded fake reviews.
- Real, verified strengths: 4 offices (Gurugram, Dubai, Tangerang, Doha), 5 named service lines, ex-UBS founders, dense GCC + SEA emerging-market output.

We are a **small, founder-led, emerging-market-strong, design-led firm** punching at a category dominated by larger but UX-tired players. That is the only honest story. Every claim that contradicts it is a long-term liability.

## The competitive truth

The competitor audit is unambiguous. The **upper-right quadrant — high data depth × high design maturity — is empty.** Gartner brushes it from above (advisory, not market sizing). Crunchbase and CB Insights brush it from the left (great UX, no industry sizing). Mordor / IMARC / Grand View / MarketsandMarkets dominate the high-data / low-design quadrant and are not moving.

> **No firm in the world combines Tier A research depth with Tier C product UX. That is the wedge.**

## The wedge in one sentence

**Ken Research is the design-led market intelligence firm — emerging-market depth, consultant-grade analysis, delivered as a product, not a PDF.**

Three load-bearing words:

- **Design-led** — every surface (homepage, store, viewer, dashboard, proposal) held to the 9.5/10 quality bar from [Quick_start_guide.md](../../Quick_start_guide.md).
- **Emerging-market depth** — the GCC, SEA, India, Africa output is real. Lean into where we already publish, not where we wish we did.
- **As a product, not a PDF** — the report viewer, dashboards, and store are the hero, not the 80-page deck.

## What we drop

If the wedge is the spine, these are the things we stop doing because they fight the spine:

| Stop | Why |
|---|---|
| "500+ analysts," "2,000+ clients," "70% Fortune 2000," "190+ countries" | Unverifiable. One investigative blog post or sharp prospect destroys trust. Replace with verifiable specifics. |
| Seeded Glassdoor reviews (if happening) | This is the kind of thing that ends firms. It's also discoverable and being discussed in current reviews. Internal leadership matter, not a strategy doc — but no design investment outruns a reputation hole. |
| Generic "global strategic consulting" tagline | Says nothing. Every Tier A competitor uses identical language. |
| Ken-Research-vs-Mordor / vs-Frost SEO comparison pages with no UX advantage | Battles fought on the loser's terms. We don't beat Mordor on report count; we beat them on the experience of one report. Reframe these pages as design-led. |
| Hidden pricing, "request a quote," demo-wall report store | The biggest single Tier A weakness. We invert it. |

## What we double down on

| Double down | Why | Where it ships |
|---|---|---|
| Public, transparent pricing on every report | Only Statista and Research and Markets do this. Massive trust + conversion lift. | [`projects/report-store-v07/`](../../projects/report-store-v07/) |
| Free citation formats (APA / Harvard / Chicago) on every report page, including locked ones | Statista's quietest superpower — academic + media backlinks at zero cost. Cost to copy: a static UI component. Single highest-leverage move in the deep-dive synthesis. | [`projects/report-store-v07/`](../../projects/report-store-v07/) |
| Driver/restraint impact tables with CAGR % contributions on every report | Mordor's strongest analytical format. Surfaces analyst judgment as scannable data above the fold. Nobody else in the audit shows this. | [`projects/report-store-v07/`](../../projects/report-store-v07/) |
| Post-sale analyst support stated explicitly on every report page | IMARC's most under-noticed differentiator ("10–12 weeks analyst access"). We already offer this; the gap is *display*. | [`projects/report-store-v07/`](../../projects/report-store-v07/) |
| API / MCP access tier as a strategic positioning move | CB Insights has staked the "data layer for Claude / ChatGPT / Snowflake" position; no Tier A rival has responded. Our backend data is already structured (CAGR, segments, geography). This is a near-term opportunity, not a roadmap fantasy. | [`projects/ken-research-backend/`](../../projects/ken-research-backend/) + [`design-system/dashboard/`](../../design-system/dashboard/) |
| A genuinely good in-browser report viewer | The category bar is "PDF email attachment." Trivial to clear. | New project — see [`05-design-improvements/`](../05-design-improvements/) |
| Live dashboards for top reports (interactive charts, filters, exports) | Tier C territory; nobody in Tier A is here. | [`design-system/dashboard/`](../../design-system/dashboard/) |
| GCC + SEA + Africa specialist authority | We already publish heavily here. Make it a brand pillar, not a happenstance. | Homepage [`projects/topnav-v32/`](../../projects/topnav-v32/) + sector pages |
| Case-study-as-trust-engine | Two case studies on the public site is anemic. We need 8–12 design-grade ones. | [`projects/casestudy-templates/ken-v1/`](../../projects/casestudy-templates/ken-v1/) |
| Free, embeddable charts + named persistent trackers ("CAGR Leaderboard", "Market Entry Hotspots") | Statista's flywheel + Crunchbase's tracker pattern. Bookmarkable tools that bring buyers back without email marketing. | [`design-system/dashboard/`](../../design-system/dashboard/) |
| Mobile-grade experience across all surfaces | Universally neglected in Tier A per the audit. Mobile-first per the designer-buddy working agreement. | All projects |

## The five surfaces (north stars)

The wedge plays out on five experience surfaces. Each gets its own playbook in [`04-experience-playbook/`](../04-experience-playbook/):

| Surface | Today's category bar | Our north star |
|---|---|---|
| **1. Discovery** (Google → home) | Stock photo + corporate navy | Editorial-grade, dark cinematic, GCC/SEA-led storytelling |
| **2. Report store** | Form-fill to see price | Stripe/Linear-grade catalog: search, preview, price, cart |
| **3. Report viewer** | PDF download | In-browser interactive viewer with charts, TOC, citations, share |
| **4. Dashboards / data** | Doesn't exist for Tier A | Tier C-grade live data product for our top sectors |
| **5. Engagement** (proposal → delivery → follow-up) | Word doc + email | Branded proposal portal, kickoff page, delivery hub |

## Receipts behind these moves

Every "double down" above is anchored in a specific competitor page in [`../02-competitors/deep-dives/_synthesis.md`](../02-competitors/deep-dives/_synthesis.md). That synthesis is the single most important reading after this wedge — it converts every recommendation here from principle to "do exactly this, here's the URL we're learning from."

## Why this wedge survives copying

A larger Tier A competitor *could* in theory copy this. They won't, fast enough, because:

- Their org is built around report production volume, not product design. Re-platforming hurts revenue before it helps.
- They've optimized SEO around hidden-pricing funnels for a decade. Removing the funnel terrifies their sales orgs.
- Their brands are already navy-corporate; rebranding to a design-led identity is a 2-year project.
- They're not in GCC/SEA the way we are.

We can move on this in months because we're 60-person sized, founder-led, and already have the design system v26 + 9 active projects in flight. **Speed × design × honesty is the moat.**

## Risks and counter-moves

| Risk | Counter |
|---|---|
| Statista or CB Insights moves into market sizing seriously | They haven't in a decade. If they do, our GCC/SEA depth is the defensible niche. |
| MarketsandMarkets actually ships KnowledgeStore as a public platform | They've been claiming it for years without showing it. Watch quarterly, but assume they don't. |
| Our small revenue base can't fund the design ambition | Phase the build. The five surfaces ship in sequence, not parallel. See [`05-design-improvements/`](../05-design-improvements/). |
| Public pricing tanks margins | Only on syndicated reports — keep custom and consulting quote-based. Statista has done this profitably for years. |
| The Glassdoor / fake-review issue surfaces publicly | Address at the source. No design budget outruns a reputation crisis. This belongs on a leadership agenda, not in this folder. |

## What this is not

- Not a brand book — that lives in design system v26.
- Not a content plan — downstream of this wedge.
- Not a sales playbook — also downstream.
- Not a guarantee. It is a hypothesis backed by the audit. We test it on the homepage and the report store first, in that order.
