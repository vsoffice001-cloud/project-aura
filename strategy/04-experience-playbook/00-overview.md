# Experience Playbook — Overview

_Atlas, 2026-04-28._

Five surfaces decide whether the wedge in [`../03-positioning/wedge.md`](../03-positioning/wedge.md) wins or loses. Each surface gets its own file in this folder. This overview is the map.

## Why "five surfaces" not "one website"

The category audit ([`../02-competitors/competitor-landscape.md`](../02-competitors/competitor-landscape.md)) shows the experience battle is not one fight. A buyer touches up to five distinct surfaces between "I have a question" and "I trust this firm." Each surface has its own competitor benchmarks, its own UX laws in play, and its own ship target.

## The five

| # | Surface | Buyer asks | Ship target | Doc |
|---|---|---|---|---|
| 1 | **Discovery** | "Are these people credible in 5 seconds?" | Homepage, sector pages, top nav | [`01-discovery.md`](01-discovery.md) |
| 2 | **Report Store** | "Can I find, evaluate, and buy without talking to anyone?" | Catalog, search, report page, sample, checkout | [`02-report-store.md`](02-report-store.md) |
| 3 | **Report Viewer** | "Is this 80-page deliverable actually usable?" | In-browser viewer, downloads, sharing | [`03-report-viewer.md`](03-report-viewer.md) |
| 4 | **Dashboards / Data** | "Can I live with this data, not just read it?" | Interactive charts, filters, exports, embeds | [`04-dashboards.md`](04-dashboards.md) |
| 5 | **Engagement** | "What's it like to work with you?" | Proposal portal, kickoff page, delivery hub, account page | [`05-engagement.md`](05-engagement.md) |

## How each playbook is structured

Every surface doc follows the same shape so we can review fast and ship on the [Quick_start_guide.md](../../Quick_start_guide.md) plan-of-action:

1. **Buyer's job** — what the buyer is trying to do on this surface, in their words.
2. **Where the bar sits today** — reference competitors with concrete observations from the audit.
3. **Our north star** — what we want this surface to feel like, with named non-research references (Stripe, Linear, Notion, Apple, NYT, etc.).
4. **UX laws in play** — Fitts, Hick, Jakob, Tesler, Doherty, Aesthetic-Usability, Peak-End, Von Restorff, etc., named explicitly with the trade-offs we're making.
5. **Mobile-first layout brief** — the smallest viewport gets designed first, per the designer-buddy working agreement.
6. **Tokens / system decisions** — type, spacing, color usage from design system v26.
7. **Concrete moves** — what we ship, in 30 / 90 / 180 day buckets.
8. **Mapped projects** — which folder under [`../../projects/`](../../projects/) hosts the work.
9. **Acceptance criteria** — Core Web Vitals, WCAG AA, the 9.5/10 finish bar, and surface-specific KPIs.

## Sequencing

Don't try to ship all five at once — we're 60-person, not 600. Sequence:

- **Wave 1 (next 30 days):** Discovery + Report Store. Highest visibility. Highest competitor weakness.
- **Wave 2 (60–90 days):** Report Viewer. Differentiates the deliverable itself.
- **Wave 3 (90–180 days):** Dashboards. Moves us into Tier C territory.
- **Wave 4 (ongoing):** Engagement. Design-led proposal/portal experience for accounts.

Sequencing rationale lives in [`../05-design-improvements/roadmap.md`](../05-design-improvements/roadmap.md).

## What "9.5/10" means in practice

From [Quick_start_guide.md](../../Quick_start_guide.md): "Premium Cinematic Finish." Translated to acceptance:

- **Performance:** LCP < 2.0s, INP < 200ms, CLS < 0.05 on mid-range mobile.
- **Accessibility:** WCAG 2.2 AA across all interactive surfaces, no exceptions.
- **Motion:** Purposeful, never decorative. Respect `prefers-reduced-motion`.
- **Type:** Major Third 1.25x scale. Noto Serif display, DM Sans body. No off-token sizes.
- **Color:** `#030304` background, `#b01f24` for CTAs only, `#806ce0` accent, `#FAFAFA` text. No off-palette values.
- **Density:** Editorial. White space treated as content, not waste.
- **Tone:** Confident, specific, never generic.
- **Code:** Semantic HTML, design tokens not hard-coded values, components not duplicated markup, no dead code.

If a deliverable misses any of the above, it isn't shipped. It's iterated.
