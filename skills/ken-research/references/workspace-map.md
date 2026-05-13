# Workspace Map

Read this only when you need to know where a specific topic lives. For routine answers, the SKILL.md table is enough.

## strategy/

```
strategy/
├── EXECUTIVE_SUMMARY.md            ← 5-minute read; start here for new conversations
├── README.md                       ← reading order + ground rules
├── 01-company/
│   └── ken-research-fact-sheet.md  ← THE source of factual truth about Ken Research
├── 02-competitors/
│   ├── competitor-landscape.md     ← 20 competitors, 3 tiers, white-space map
│   ├── profiles/                   ← one file per rival (~20 files)
│   ├── ux-audits/digital-experience-scorecard.md
│   └── deep-dives/
│       ├── _index.md
│       ├── _synthesis.md           ← THE most actionable cross-cutting receipts
│       ├── mordor-intelligence.md
│       ├── imarc-group.md
│       ├── statista-reports.md
│       ├── cb-insights.md
│       └── crunchbase.md
├── 03-positioning/
│   ├── _frame.md
│   └── wedge.md                    ← THE spine
├── 04-experience-playbook/
│   ├── 00-overview.md
│   ├── 01-discovery.md
│   ├── 02-report-store.md
│   ├── 03-report-viewer.md
│   ├── 04-dashboards.md
│   └── 05-engagement.md
├── 05-design-improvements/
│   └── roadmap.md                  ← waves 1-4, mapped to projects/
└── 06-research-log/
    └── YYYY-MM-DD-*.md             ← dated research notes
```

## projects/ — surfaces that ship the strategy

| Project | Maps to surface | Purpose |
|---|---|---|
| `design-system-v26/` | All | Visual + interaction foundation |
| `topnav-v32/` | Discovery | Top nav anchor |
| `report-store-v07/` | Report Store | Catalog, search, report pages, checkout |
| `design-system-dashboard/` | Dashboards | Live data product |
| `ken-research-backend/` | All | Critical-path backend (search, pricing, checkout, data API) |
| `casestudy-templates/ken-v1/` | Engagement | Proposals, case studies |
| `webpages-ken/` | Discovery | About, sector pages |

## Brand tokens (locked, non-negotiable)

- Background `#030304` / Ken Red `#b01f24` (CTAs only) / Purple `#806ce0` / Text `#FAFAFA`
- Display: Noto Serif. Body: DM Sans. Type scale: Major Third 1.25x.
- Quality target: 9.5/10.
