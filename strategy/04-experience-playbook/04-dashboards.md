# Surface 4 — Dashboards / Data

_Tier C territory. Where Ken Research stops being a research firm and starts being a product._

## Buyer's job
"I don't want to wait 12 months for the next report cycle. I want to pull up the GCC EV market dashboard, change the year window, filter to KSA only, export the chart, and drop it into my Monday morning. Then come back next week."

## Where the bar sits today
From the audit:
- **Tier A:** No real dashboards. MarketsandMarkets KnowledgeStore, Mordor Synapse, Grand View Horizon, IMARC portal — all claimed, none publicly inspectable. Demo-wall theater.
- **Tier B:** Gartner / Forrester have advisor terminals; gated, not consumer-grade.
- **Tier C real product:** Statista (full dashboard product, freemium), Euromonitor Passport (industrial-strength, $20K+/seat), CB Insights, PitchBook, Crunchbase.

> "Hiding a 'platform' behind a demo wall is not a platform strategy — it's a sales motion using the word 'platform'." — [`competitor-landscape.md`](../02-competitors/competitor-landscape.md)

If we ship a real dashboard, even narrow in scope, we leapfrog Tier A and start being measured against Tier C — which is exactly the wedge.

## Our north star
**Statista freemium × Linear's product surface × Stripe Sigma.** Live data. Public-facing previews. Self-serve sign-up. AI-assisted natural-language queries. Embeddable charts.

We don't try to outscale Statista. We pick **3–5 sectors where we already publish heavily** (GCC healthcare, SEA OTT, India BFSI, GCC parking/mobility, Indonesia digital banking) and build deep, not wide.

## UX laws in play
- **Tesler's Law** — data complexity is real. We absorb it in good defaults, sensible presets, and saved views — not by exposing every knob.
- **Aesthetic-Usability** — dashboards are commonly ugly. Tier A's are non-existent or behind walls; Tier C's are utilitarian. A *beautiful* dashboard is a brand statement on its own.
- **Hick's Law** — default view ≤ 5 chart tiles per dashboard. "Add chart" / "edit view" lives one click deeper.
- **Doherty** — every interaction < 200ms. Skeleton loaders, optimistic UI, server-side caching.
- **Fitts's Law** — primary controls (date range, geography, export) live in a fixed position with generous targets.
- **Peak-End** — the export action is the surface where buyers feel the product earned its keep. Make exports beautiful (branded, sourced, one click).
- **Trade-off accepted:** building any dashboard is materially harder than publishing reports. We accept that, because dashboards are the moat. Sequencing matters — see [`../05-design-improvements/roadmap.md`](../05-design-improvements/roadmap.md).

## Mobile-first layout brief
Mobile dashboards are a known hard problem. Honest answer:
- **Mobile = read mode.** Default to single-column, swipeable chart cards, prominent date/geo filters at the top, share + export per card.
- **Desktop = work mode.** Multi-tile grid, drag-to-rearrange, save-as-view, embed-this-chart.
- Don't try to make mobile do work mode — Tier C (PitchBook, CB Insights) doesn't either.

## Tokens / system decisions
- Reuse design-system v26 tokens; introduce a "data" sub-palette only if needed for chart series (token names like `--chart-series-1` not raw hex).
- Tabular numerics, fixed column widths, no jitter on data refresh.
- Skeleton loaders use the dark surface palette, not gray.
- Every chart has a "view source" link to the underlying report — the dashboards are the *front door* to the catalog, not a replacement for it.

## Concrete moves
**30 days:**
- Pick the 3 sectors with deepest publishing density. Confirm we have the underlying data structured (not just narrative).
- Storyboard a single dashboard end-to-end: GCC OTT dashboard, mobile + desktop. Static prototype, no backend.

**90 days:**
- Backend in [`projects/ken-research-backend/`](../../projects/ken-research-backend/) gets a `data/` API layer — versioned, cached, source-attributed.
- Ship 1 public-preview dashboard (free read access, paid for filters/export).
- Embeddable single-chart widgets for the public dashboards — every embed links back to Ken Research.

**180 days:**
- Ship 3 dashboards across the chosen sectors.
- Saved views, scheduled email digests, CSV/PNG/embed exports.
- Natural-language query for charts ("Show me KSA EV imports vs GCC average, 2020–2025").

## Mapped projects
- [`design-system/dashboard/`](../../design-system/dashboard/) — primary
- [`projects/ken-research-backend/`](../../projects/ken-research-backend/) — data layer
- [`design-system/core/`](../../design-system/core/) — chart system, tokens

## Acceptance criteria
- LCP < 2.5s on dashboard open (acceptable looser than marketing pages — there's real data).
- Filter/date-range interactions < 200ms perceived.
- WCAG 2.2 AA — all charts must have data-table view; keyboard navigation across tiles.
- Each public dashboard generates measurable embed traffic within 6 months (Statista flywheel test).
- A buyer can sign up and reach an "aha" moment (find a useful chart, export it) in < 5 minutes (user-test target).

---

## Page-level receipts (from [`../02-competitors/deep-dives/_synthesis.md`](../02-competitors/deep-dives/_synthesis.md))

### Steal from
- **Crunchbase News persistent trackers** ([news.crunchbase.com](https://news.crunchbase.com)) — **named persistent data trackers** ("Unicorn Board," "Layoffs Tracker") that update on a schedule and become bookmarked tools. Ken Research equivalents to ship: **"Global CAGR Leaderboard"** (top 25 sectors by current CAGR), **"Market Entry Hotspots"** (fastest-growing emerging markets, GCC/SEA-led).
- **Statista Chart of the Day** ([statista.com/chartoftheday/](https://www.statista.com/chartoftheday/)) — **named data-journalist attribution** on dashboard-style editorial; daily/weekly publish cadence creates habit loops. Ours can be weekly given our scale.
- **Statista Outlook** ([statista.com/outlook/emo/ecommerce/worldwide](https://www.statista.com/outlook/emo/ecommerce/worldwide)) — **currency switcher** on revenue figures; **geographic comparison selector**; **"Compare to other regions" toggle**. The minimum interactive features that make static data feel alive.

### CB Insights MCP/integrations — strategic, not just UX
- **CB Insights "MCP & Integrations"** ([cbinsights.com](https://www.cbinsights.com), nav category) — CB Insights positions itself as a **data layer for Claude / ChatGPT / Snowflake / Salesforce workflows**. This is a distribution strategy, not a feature. Ken Research's structured market data (CAGR, market size, segments, geographic breakdowns) is exactly what enterprise AI pipelines want to pull via API. The backend data is already structured; **an API/MCP access tier is a near-term positioning opportunity, not a roadmap fantasy.** Surface candidate: a small "API / MCP" page in [`design-system/dashboard/`](../../design-system/dashboard/) once the first dashboard ships.

### Avoid like
- **Mordor Synapse page** ([mordorintelligence.com/synapse](https://www.mordorintelligence.com/synapse)) — **"Your Market Intelligence Command Centre" with no UI screenshots and no demo.** Vaporware aesthetics. Any Ken Research dashboard or platform page must include real rendered UI screenshots and a demo (video or interactive), not a marketing landing page.
