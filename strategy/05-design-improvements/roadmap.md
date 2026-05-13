# Design Improvements — Roadmap

_Atlas, 2026-04-28. Translates [`../03-positioning/wedge.md`](../03-positioning/wedge.md) and [`../04-experience-playbook/`](../04-experience-playbook/) into shippable work mapped to existing folders under [`../../projects/`](../../projects/)._

## Operating principles
- **One quality bar.** 9.5/10. No "internal beta" excuses.
- **Mobile-first.** Per the designer-buddy working agreement.
- **Honesty over puffery.** No claim ships that we can't defend.
- **Sequence ruthlessly.** We are 60-person, not 600. One wave at a time.
- **Tie everything to a project folder.** Strategy that doesn't ship is theatre.

## Wave 1 — Trust + Transaction (next 30 days)
**Goal:** A buyer can land on the homepage, find a report, see its price, and buy it without filling a form. Plus three zero-engineering trust dividends from the deep-dive synthesis.

| Move | Surface | Project | Owner action | Receipt |
|---|---|---|---|---|
| Rewrite homepage hero — drop "Global Strategic Consulting Firm" cliché, replace with one specific verifiable promise | Discovery | [`projects/topnav-v32/`](../../projects/topnav-v32/) + new home page | Copy + design pass | — |
| Replace logo carousel with one design-grade case study card | Discovery | [`projects/casestudy-templates/ken-v1/`](../../projects/casestudy-templates/ken-v1/) embedded | Use existing case study | — |
| Live "Recent reports" strip on homepage | Discovery | [`projects/topnav-v32/`](../../projects/topnav-v32/) + backend | Backend endpoint + FE component | Crunchbase live stats row |
| Quantified subheadline on homepage ("X reports across Y sectors") — single sourced number | Discovery | [`projects/topnav-v32/`](../../projects/topnav-v32/) | Copywriting + backend count | Mordor "26,683 reports across 100+ industry segments" |
| Outcome-first trust badge row replacing generic certification logos | Discovery | [`projects/topnav-v32/`](../../projects/topnav-v32/) | Copy + design + internal sourcing | CB Insights "All of the Big 4 / 86% of software companies" |
| Audit + remove unverifiable chip claims (190+ countries, 10 lakh+ assets, 500+ analysts, 70% F2000) | All | All marketing surfaces | Honest claim review | — |
| Pricing tiers visible on every report detail page (single / team / enterprise + regional differential) | Report Store | [`projects/report-store-v07/`](../../projects/report-store-v07/) | Backend pricing model + UI | IMARC EV global vs India ($3,999 vs $3,499) |
| Inline citation block (APA / Harvard / Chicago) on every report page including locked ones | Report Store | [`projects/report-store-v07/`](../../projects/report-store-v07/) | Static UI component, zero backend | Statista — single highest-leverage steal in the audit |
| "Includes X weeks of post-purchase analyst support" copy line on every report page | Report Store | [`projects/report-store-v07/`](../../projects/report-store-v07/) | One line of copy in metadata block | IMARC "10–12 Weeks Post Purchase Analyst Support" |
| Headline KPIs (market size, CAGR, year range) free above fold on every report landing page | Report Store + Discovery | [`projects/report-store-v07/`](../../projects/report-store-v07/) | Page template addition; backend data already structured | Statista Market Outlook |
| Driver/restraint impact table component with CAGR % contributions | Report Store | [`projects/report-store-v07/`](../../projects/report-store-v07/) | New component in report template | Mordor AI Market page |
| Auto-generated free preview (2 charts + 1 page summary) on every report | Report Store | [`projects/report-store-v07/`](../../projects/report-store-v07/) | Pipeline change + UI | — |
| Search input in store header (full-text MVP) | Report Store | [`projects/report-store-v07/`](../../projects/report-store-v07/) + backend | Search backend + UI | Crunchbase / Statista |
| Cap CTAs at 3 per report page (primary / secondary / tertiary text link) | Report Store | [`projects/report-store-v07/`](../../projects/report-store-v07/) | Design discipline | Avoid IMARC Cosmetics' 6 CTAs |
| Glassdoor reputation review at leadership level | All | n/a | Not a design issue. Flag, don't ignore. | — |

**Acceptance for Wave 1:** any first-time buyer can complete search → preview → see price → contact-or-buy in < 3 minutes on mobile, AND every report page carries a citation block + analyst-support line + headline KPIs.

The "Receipt" column links each move to the specific competitor page that proved it works, in [`../02-competitors/deep-dives/_synthesis.md`](../02-competitors/deep-dives/_synthesis.md).

## Wave 2 — The Deliverable (60–90 days)
**Goal:** Reports stop being PDFs. They become a designed in-browser experience that doubles as a brand asset.

| Move | Surface | Project | Notes |
|---|---|---|---|
| Real Stripe-backed checkout for syndicated reports | Report Store | [`projects/report-store-v07/`](../../projects/report-store-v07/) + backend | Custom/consulting stays quote-based |
| Faceted search (region, sector, date, price band) | Report Store | [`projects/report-store-v07/`](../../projects/report-store-v07/) | Chip-style on mobile |
| In-browser report viewer prototype (1 flagship report) | Report Viewer | new `projects/report-viewer-v01/` | Inherit Next.js stack from ken-v1 |
| Sector landing pages — single template, all 14 sectors | Discovery | [`projects/webpages-ken/`](../../projects/webpages-ken/) | Don't ship 14; ship the top 6 first |
| 6–8 design-grade case studies | Discovery / Engagement | [`projects/casestudy-templates/ken-v1/`](../../projects/casestudy-templates/ken-v1/) | Replaces the current 2 |
| Designed proposal template for new pitches | Engagement | [`projects/casestudy-templates/ken-v1/`](../../projects/casestudy-templates/ken-v1/) reused | Replaces Word doc proposals |

**Acceptance for Wave 2:** the report viewer is the default deliverable for new syndicated reports; PDF/PPT/XLSX become exports.

## Wave 3 — The Product (90–180 days)
**Goal:** Move from "research firm" to "research product." Tier C territory.

| Move | Surface | Project | Notes |
|---|---|---|---|
| Public-preview dashboard for 1 sector (GCC healthcare or SEA OTT) | Dashboards | [`design-system/dashboard/`](../../design-system/dashboard/) + backend | Free read, paid filters/export |
| Embeddable single-chart widgets | Dashboards | dashboard | Statista flywheel — every embed links back |
| Named persistent trackers ("CAGR Leaderboard", "Market Entry Hotspots") | Dashboards | [`design-system/dashboard/`](../../design-system/dashboard/) | Crunchbase tracker pattern; bookmarkable, returns visits without email |
| NL search across catalog (LLM with citations) | Report Store | [`projects/report-store-v07/`](../../projects/report-store-v07/) + backend | Tier-C-grade differentiator |
| **API / MCP access tier — public docs + small "API" page** | Dashboards / Strategic | [`projects/ken-research-backend/`](../../projects/ken-research-backend/) + [`design-system/dashboard/`](../../design-system/dashboard/) | CB Insights MCP/integrations is the move; our backend data is already structured. First Tier A firm to ship this owns the AI-pipeline distribution conversation. |
| Engagement page MVP (status, deliverables, contact, latest update) | Engagement | [`projects/ken-research-backend/`](../../projects/ken-research-backend/) + new portal | Authenticated route |
| 3 dashboards across chosen sectors | Dashboards | [`design-system/dashboard/`](../../design-system/dashboard/) | Pick sectors with verified data depth |
| Quarterly "State of [sector]" free editorial series — named, dated, analyst-attributed | Discovery / Engagement | [`projects/casestudy-templates/ken-v1/`](../../projects/casestudy-templates/ken-v1/) | CB Insights "State of Venture" pattern; brand distribution moat |

**Acceptance for Wave 3:** at least one public dashboard exists, with embedded charts driving measurable referral traffic.

## Wave 4 — The Relationship (180+ days, ongoing)
**Goal:** Engagement experience that retains and refers.

| Move | Surface | Project |
|---|---|---|
| Full engagement portal — proposal, plan, deliverables, calls, contacts, invoices | Engagement | [`projects/ken-research-backend/`](../../projects/ken-research-backend/) + portal |
| Branded close-out summaries linking into dashboards | Engagement | portal + dashboards |
| Annotate / comment for team plans on report viewer | Report Viewer | viewer |
| Saved views + scheduled digests on dashboards | Dashboards | dashboard + backend |
| Quarterly account review template (auto-drafted, hand-finished) | Engagement | portal |

## What we explicitly do NOT do
- Build all 14 sector dashboards. We pick 3–5 where data depth is real.
- Replace the design system v26 with a new system. v26 is the foundation; we build *within* it.
- Ship a public "platform" page that promises something we don't have. We ship things, then talk about them — not the reverse.
- Compete with Mordor or IMARC on report volume. We compete on the experience of one report.
- Compete with Crunchbase on private-company data. We compete on industry-sized market intelligence with their UX.

## Dependencies + risks
- **Backend capacity** ([`projects/ken-research-backend/`](../../projects/ken-research-backend/)) is on the critical path for Waves 1, 2, 3. If it can't deliver search, pricing, checkout, and a data API on time, the rest stalls.
- **Data structure** for dashboards — Wave 3 assumes underlying market sizing data is captured in structured form, not just narrative. Confirm before storyboarding.
- **Reputation overhang** — any design investment is undermined by an unaddressed Glassdoor pattern. Not a design problem; a leadership problem. But it constrains the strategy if not handled.
- **Cash** — FY25 was loss-making. Some moves (full engagement portal, NL search backend) may need to slip if runway tightens. Wave 1 is non-negotiable; Waves 3–4 are sequenced to be deferrable.
