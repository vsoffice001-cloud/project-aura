# Research Workflow — How to Add New Competitive Research

When new research lands, the structure has to absorb it without bloating. This file is the recipe.

## Decision tree

```
New finding arrives
│
├─ About Ken Research itself?
│   ├─ Verifies an existing claim → strike the [unverified] tag in fact-sheet.md
│   ├─ Contradicts an existing claim → add a "Correction" sub-section, keep the old text crossed-through
│   └─ Net new fact → add to the right §section in fact-sheet.md, cite source inline
│
├─ About a competitor?
│   ├─ One of the 5 deep-dived (Mordor / IMARC / Statista / CB Insights / Crunchbase)
│   │     → update strategy/02-competitors/deep-dives/<slug>.md
│   │     → if cross-cutting, add a one-line entry to _synthesis.md
│   │
│   ├─ One of the other 15 in the landscape
│   │     → update strategy/02-competitors/profiles/<slug>.md
│   │     → if a meaningful UX move, also note in competitor-landscape.md
│   │
│   └─ A new competitor we hadn't tracked
│         → create strategy/02-competitors/profiles/<slug>.md
│         → add a row to competitor-landscape.md master matrix
│         → place in the right tier (A: direct syndicated rival, B: premium advisory, C: data product)
│
├─ Strategic implication for our wedge?
│   → update strategy/03-positioning/wedge.md
│   → log a dated note in strategy/06-research-log/YYYY-MM-DD-<slug>.md
│
├─ Shippable design improvement?
│   → place in the right surface playbook (04-experience-playbook/0X-*.md)
│   → add row to strategy/05-design-improvements/roadmap.md, in the right wave
│   → map to a specific projects/ folder
│
└─ Just a note worth remembering?
    → strategy/06-research-log/YYYY-MM-DD-<slug>.md
```

## File templates

### Competitor profile — `02-competitors/profiles/<slug>.md`

```markdown
# <Company Name> — Profile
_Tier <A/B/C>. Last updated YYYY-MM-DD._

## One-liner
[Their positioning, in their words, then in plain language.]

## Scale
- HQ:
- Employees:
- Revenue (if disclosed):
- Funding:

## What they sell
[Syndicated reports / subscription / custom / data platform / consulting — % feel.]

## Sectors / verticals
[Bullets.]

## Pricing
[Visible y/n. Ranges if shown. Source URL.]

## Digital experience — first impressions
- Homepage:
- Catalog UX:
- Sample preview:
- Checkout / lead capture:
- Dashboard (if any):
- Mobile:
- Page speed feel:

## Standout strength
[What they do better than most.]

## Visible weakness
[What looks dated, clunky, or broken.]

## What we should steal / avoid
[For Ken Research — anchored in our wedge.]

## Sources
[URLs.]
```

### Deep-dive — `02-competitors/deep-dives/<slug>.md`

Use the existing 5 as templates. Required sections:
- Summary verdict
- Pages audited (with URLs)
- Page-by-page (URL, desktop above-fold, mobile above-fold, primary CTA, density, trust signals, lead-capture friction, steal, avoid, verdict — each page)
- Cross-page patterns
- What Ken Research should beat them at
- Sources

### Research-log entry — `06-research-log/YYYY-MM-DD-<slug>.md`

```markdown
# Research Log — YYYY-MM-DD <Slug>

## Context
[What happened, who triggered it, why it matters.]

## Findings
[Bullets, with sources.]

## Implications for our strategy
[Which wedge clause / playbook surface / project this changes.]

## Open threads
[What we need to chase next.]
```

## Cross-linking discipline

When adding a finding to one file, update the references that depend on it:

| You changed | Also update |
|---|---|
| `fact-sheet.md` §Scale or §Service Lines | `EXECUTIVE_SUMMARY.md` if a headline number moves |
| `_synthesis.md` ranked moves | The relevant `04-experience-playbook/0X-*.md` "Steal from" section |
| `wedge.md` "Double down" or "Stop" | `roadmap.md` waves; `EXECUTIVE_SUMMARY.md` |
| `roadmap.md` Wave 1 row | The relevant playbook surface "Concrete moves" 30-day section |
| New competitor in `profiles/` | `competitor-landscape.md` master matrix |

Cross-linking is what keeps the workspace alive. Without it, files drift apart and the synthesis dies.

## What does NOT belong in the workspace

- Internal HR matters (the Glassdoor reputation issue is *flagged* in fact-sheet.md and EXECUTIVE_SUMMARY.md, but is leadership work, not strategy-doc work).
- Pricing decisions (those happen in operating meetings; the workspace records them after the fact).
- Live experiments / prototypes — those live in `projects/`.
- Marketing copy in production. Production copy lives in the project files; the workspace records the *principles* the copy follows.

## Anti-patterns

- **Unsourced claims.** Every factual statement in the workspace cites a source.
- **Promoting marketing claims to fact.** "70% Fortune 2000" stays unverified until two independent sources confirm.
- **Adding a new file without cross-linking.** Orphan files don't get read.
- **Stale research notes.** If a `06-research-log/` entry is contradicted by later findings, mark it superseded; don't delete (we want the history).
- **Theoretical recommendations.** If a recommendation can't be mapped to a `projects/` folder, it's theatre.
