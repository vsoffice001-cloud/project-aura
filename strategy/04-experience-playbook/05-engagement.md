# Surface 5 — Engagement

_Proposal. Kickoff. Delivery. Account. The custom-research and consulting client journey._

## Buyer's job
"I just signed a custom research engagement with Ken Research. Now I want to know who's on it, what's happening this week, where the deliverables live, when the next milestone is, and how to ask a question without writing yet another email."

## Where the bar sits today
- Tier A category: emailed proposals (Word doc), kickoff calls, monthly status decks, final PowerPoint, occasional Slack/email follow-up. No portal. No dashboard. No persistent client surface.
- Tier B (Gartner, Forrester): client portal exists, but is generally utilitarian, not designed.
- Tier C: the data products *are* the engagement; there's no separate "consulting" surface to design — the dashboard is the relationship.

This is the surface where consulting firms (BCG / Bain / smaller boutiques) compete on relationship. None of them are designed beautifully either — proposals are PowerPoint, status updates are Excel.

**The bar is "we send you Word documents." A designed engagement portal is unprecedented in the Tier A market research category.**

## Our north star
**Linear-style project surface × Notion-style shared workspace × Stripe-style invoicing/transparency.** Each engagement gets its own page. Branded. Live. The proposal lives there, the kickoff plan lives there, the deliverables, the next meeting, the analyst contacts, the invoice — all one URL, mobile and desktop.

## UX laws in play
- **Peak-End** — the *peak* of the engagement is when the deliverable lands; the *end* is the close-out. Both must be designed surfaces, not email attachments.
- **Aesthetic-Usability** — a designed proposal/portal will be perceived as more rigorous and more reliable than a Word doc, before the buyer reads a single sentence.
- **Postel's Law** — accept inputs liberally (let buyers comment in their own style), output strictly (status updates are crisp, structured, on-template).
- **Doherty** — even status surface interactions matter; clients are anxious between deliverables and want instant answers to "where are we."
- **Trade-off accepted:** designing the engagement layer takes work that doesn't show up in the catalog or store. The trade is that retention and referral go up, and our proposal win rate against Mordor / Frost goes up because no one else is showing up with this experience.

## Mobile-first layout brief
- **Engagement page (mobile):** title, status chip, next milestone date, primary contact analyst with face, list of latest activity (uploaded chart, sent draft, scheduled call). One persistent CTA: "Ask a question" (which can be email, in-portal comment, or scheduled call).
- **Sub-pages:** Proposal · Plan · Deliverables · Calls · Contacts · Invoices.
- **Designed proposal:** vertical-scroll, narrative, with embedded analyst bios and named methodologies. Replaces the static PDF proposal.
- **Designed close-out:** a final "engagement summary" page with key findings, charts pulled live from any related dashboards, downloadable artifacts.

## Tokens / system decisions
- Reuse v26 tokens; engagement portal uses a slightly *softer* dark surface (`#0a0a0e` vs `#030304`) to differentiate from marketing.
- Status chips: scarce color use — only the *current* status colored, prior statuses neutral.
- Typography: Noto Serif for engagement title and section headings; DM Sans for everything else.
- Branded export: every PDF generated from the portal is templated, sourced, and dated.

## Concrete moves
**30 days:**
- Audit current proposal flow. Where do we lose buyers between "interested" and "signed"? Time-to-proposal? Quality of proposal?
- Prototype a *designed* proposal page using the case-study template stack ([`projects/casestudy-templates/ken-v1/`](../../projects/casestudy-templates/ken-v1/)).

**90 days:**
- Ship designed proposals as the default for new custom-research and consulting pitches.
- Build a minimal engagement page MVP: title, status, deliverables list, contact, latest update. No comments, no real-time collab yet.

**180 days:**
- Full engagement portal: proposal → plan → deliverables → calls → contacts → invoices. Per-engagement, per-client.
- Branded close-out summaries, with live links into any associated dashboards (Surface 4).
- Quarterly account review template — automated from engagement data, hand-finished by analyst.

## Mapped projects
- [`projects/casestudy-templates/ken-v1/`](../../projects/casestudy-templates/ken-v1/) — proposal/case-study template stack reused
- [`projects/ken-research-backend/`](../../projects/ken-research-backend/) — engagement entities, auth, file storage
- [`design-system/core/`](../../design-system/core/) — components, tokens

## Acceptance criteria
- LCP < 2.0s on engagement page open (authenticated route).
- WCAG 2.2 AA across all client-facing surfaces.
- Every engagement generates a permanent, designed close-out artifact (not a one-off PowerPoint).
- Proposal-to-signed conversion improves measurably (baseline measured in 30-day audit).
- Client NPS captured at engagement close, target > 60 within 12 months.

---

## Page-level receipts (from [`../02-competitors/deep-dives/_synthesis.md`](../02-competitors/deep-dives/_synthesis.md))

The engagement surface is mostly white space — no competitor in the audit has a designed engagement portal. Most receipts here are about adjacent owned-content surfaces (free editorial, named series, case studies) that build trust *before* the engagement starts.

### Steal from
- **CB Insights research hub** ([cbinsights.com/research/](https://www.cbinsights.com/research/)) — **quarterly "State of [Category]" series** with consistent naming, structure, and full top-line data free; editorial hub organized by 6–8 curated topic tiles, not a flat 60-category list; webinar series as scheduled return visit. Ken Research equivalents: "State of GCC Healthcare Q3'26", "State of SEA OTT Q4'26", "State of India Nutraceuticals Q1'27" — leaning into our verified publishing density.
- **Crunchbase News article** ([news.crunchbase.com/venture/record-breaking-funding-ai-global-q1-2026/](https://news.crunchbase.com/venture/record-breaking-funding-ai-global-q1-2026/)) — **number-led headline construction** ("Asia Pacific Battery Storage Market Hits $47B" not "Significant Growth Observed"); named author with data-journalism credentials; TOC with anchor-linked sections in long-form articles; named owned distribution channel ("Crunchbase Daily" newsletter).
- **Mordor About** ([mordorintelligence.com/about](https://www.mordorintelligence.com/about)) — **downloadable recommendation letters with signatures** alongside testimonials (not just quotes — real letters); **company timeline 2014–2025** with specific milestones as a credibility arc.

### Avoid like
- **IMARC blog** ([imarcgroup.com/blog/cannabis-industry-trends](https://www.imarcgroup.com/blog/cannabis-industry-trends)) — **anonymous, dateless 400-word listicles** with no original data. Reads as AI-generated filler in 2026. Every Ken Research article must carry author name, title, photo, publish date, and minimum 800-word original analysis.
- **IMARC contact** ([imarcgroup.com/contact-us](https://www.imarcgroup.com/contact-us)) — **10-field + CAPTCHA contact form** with the strongest trust stats on the entire site ("34 of top 50 pharma firms") buried inside it. Trust signals must surface *before* the buyer commits to fill out a form.
