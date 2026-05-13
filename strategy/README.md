# Ken Research — Competitive Strategy Workspace

_Curated by Atlas (AI strategy partner) for design@kenresearch.com._
_Started: 2026-04-28._

## Why this exists

Ken Research is a global market-research and consulting firm. The category is crowded with content-rich but **experience-poor** competitors. This workspace is the single source of truth for how Ken Research wins the next 24 months on the one axis most rivals neglect: **design, UI, UX, and end-to-end client experience across web, report viewer, dashboards, mobile, and sales touchpoints.**

The work in [`projects/`](../projects/) (design system v26, case-study templates, report store, backend) executes the playbook authored here.

## Reading order

1. [`01-company/ken-research-fact-sheet.md`](01-company/ken-research-fact-sheet.md) — verified facts about us. Anchor before recommending anything.
2. [`02-competitors/competitor-landscape.md`](02-competitors/competitor-landscape.md) — who we are up against, globally.
3. [`02-competitors/ux-audits/digital-experience-scorecard.md`](02-competitors/ux-audits/digital-experience-scorecard.md) — where the experience bar actually sits today.
4. [`03-positioning/`](03-positioning/) — our wedge: how we describe ourselves so we don't sound like another report farm.
5. [`04-experience-playbook/`](04-experience-playbook/) — the "what specifically do we do better" plan, broken down by surface (homepage, report viewer, dashboards, sales, post-purchase).
6. [`05-design-improvements/`](05-design-improvements/) — concrete improvements to ship in the existing projects, mapped to design system v26.
7. [`06-research-log/`](06-research-log/) — sources, dated notes, anything we want to remember to revisit.

## Ground rules

- **Verified > vibes.** Every factual claim about Ken Research or competitors cites a source. Unverifiable items are marked, not deleted.
- **Experience-first.** Reports are commodity. Experience is not. We measure ourselves against the best digital products our buyers use (Stripe, Linear, Notion, PitchBook, CB Insights), not just other research firms.
- **One quality bar:** 9.5/10 — same as the Quick Start guide says. No exceptions for "internal" pages.
- **Tied to existing work.** Every recommendation must point at concrete projects in [`projects/`](../projects/) so it actually ships.

## How we use this with Atlas

- **Reasoning lives here** (Opus): positioning, competitive moves, design critique, prioritization.
- **Execution happens in `projects/`** (Sonnet sub-agents): code edits, scaffolding, mechanical refactors.
- See `~/.claude/.../memory/feedback_model_routing.md` for the standing rule.

## Folder map

```
strategy/
├── README.md                          ← you are here
├── 01-company/                        ← who we are (facts, not marketing)
├── 02-competitors/
│   ├── competitor-landscape.md        ← matrix + tiers
│   ├── profiles/                      ← one file per rival
│   └── ux-audits/                     ← experience scorecards
├── 03-positioning/                    ← our wedge & messaging
├── 04-experience-playbook/            ← surface-by-surface plan
├── 05-design-improvements/            ← shippable changes mapped to projects/
└── 06-research-log/                   ← sources + dated notes
```
