# Ken Research Design System · Deep Audit + Industry Research

**Purpose:** Capture EVERY intent · decision · pattern · token · variant in OG DS + worked-example projects + industry-leading DS · so the path forward (port OG intent to new tech stack) is grounded · not improvised.

**Date started:** 2026-05-14
**Initiated by:** user request after 5 rounds of legacy-parity drift on reports-pdp-v2 build · root cause = agents miss intent because new DS lacks OG's documentation depth.

---

## Folder map

```
design-system-audit/
├── 00_README.md                      ← this file · how to read this audit
├── 01_methodology.md                 ← WWWWH framework definition + capture rules
├── og-audit/                         ← OG Design_system_vs_26 deep read (READ-ONLY ref)
│   ├── 00_overview.md                ← architecture · file count · tech stack
│   ├── tokens/                       ← color · typography · spacing · shadow · radius · motion
│   ├── atoms/                        ← 24 docs (Button · Card · Badge · ...)
│   ├── molecules/                    ← 26 docs (ReportCard · DataHighlightCard · ...)
│   ├── organisms/                    ← 42 docs (Navbar · ProductHero · BrowseGrid · ...)
│   ├── patterns/                     ← composition patterns (DarkGradientMesh · SectionBg)
│   ├── recipes/                      ← page-level recipes (case-study · PDP · listing)
│   ├── motion/                       ← entrance · scroll · hover · stagger · reduced-motion
│   ├── voice/                        ← brand tone · copy rules · microcopy
│   ├── a11y/                         ← WCAG patterns OG follows
│   └── anti-patterns/                ← OG's documented ❌ list
├── worked-examples/                  ← consumer-side WHY/WHAT/WHEN/WHERE/HOW
│   ├── topnav-v32/                   ← canonical Header source · :3005
│   ├── v0-lite-report-legacy/        ← :3020 · proper reasoning for everything (secondary btn wrong)
│   ├── v02-for-design-system/        ← :3030 · canonical Footer + best report PDP example
│   ├── report-store-legacy/          ← listing/store pattern reference
│   └── competition-benchmarking/     ← v01 + v02 · derived from report-store-legacy
├── industry-research/                ← how big tech does DS
│   ├── material-design.md            ← Google · token system · motion · accessibility
│   ├── carbon.md                     ← IBM · enterprise scale · governance
│   ├── polaris.md                    ← Shopify · commerce-first · merchant focus
│   ├── lightning.md                  ← Salesforce · accessibility-first
│   ├── atlassian.md                  ← Atlassian · cross-product · system thinking
│   ├── primer.md                     ← GitHub · dev tooling · code-near design
│   ├── spectrum.md                   ← Adobe · cross-platform · creative tools
│   ├── shadcn-ui.md                  ← copy-paste model · radix base · CVA variants
│   ├── radix-ui.md                   ← headless primitives · a11y baseline
│   ├── tailwind-ui.md                ← Tailwind Labs · pre-built page sections
│   └── synthesis.md                  ← common patterns + what Ken should adopt
├── gap-analysis/
│   ├── og-vs-core-v2.md              ← what new DS lost during port
│   ├── og-vs-industry.md             ← what OG has · what industry has more
│   └── prioritized-actions.md        ← port what · drop what · build what
└── 99_decision-record.md             ← final WWWWH: fix new DS · OR restart cleaner
```

---

## How to read this audit

1. **Start at `01_methodology.md`** — understand WWWWH framework + capture rules
2. **Read `og-audit/00_overview.md`** — get OG architecture mental model
3. **Read OG token docs in order:** colors → typography → spacing → shadow → radius → motion
4. **Per component:** read the WWWWH doc · scan `Linked components` section · jump to dependencies
5. **Worked examples** = real-world OG application · use to verify atom rules match consumer reality
6. **Industry research** = what big tech does that OG doesn't (or does better)
7. **Gap analysis** = synthesis · what's missing in new DS · what to port
8. **Decision record** = final answer · path forward

---

## What this audit IS

- Deep capture of intent · not surface inventory
- Per-component WWWWH: WHY · WHAT · WHEN · WHERE · HOW (+ States · Variants · Tokens · A11y · Motion · Anti-patterns · Reusability score · Linked components)
- Reasons for every decision (not just "it's like this" — "it's like this BECAUSE...")
- Industry context (how big tech approaches each problem)
- Read-only inspection (no edits to OG · worked-examples · or new DS during audit)

---

## What this audit IS NOT

- Not a code edit pass
- Not a refactor plan (yet)
- Not a port (yet)
- Not a build (yet)
- Not opinionated about "should new DS exist" (decision deferred to `99_decision-record.md`)

---

## Conventions

- **WWWWH per concept** = What · Why · When · Where · How (+ extended sections)
- **Token references** = always `var(--name)` syntax · never raw hex/px
- **File paths** = absolute from workspace root
- **Quotes** = lift exact OG inline comment when it carries intent
- **Reusability score** = 1-5 stars (1 = niche · 5 = used across every page type)
- **Worked examples** = link to specific file:line in consumer project where OG atom is consumed correctly

---

## Reading order recommendation

| Phase | Read | Time |
|---|---|---|
| 1 | `01_methodology.md` + `og-audit/00_overview.md` | 15 min |
| 2 | All `og-audit/tokens/*` | 1-2 hr |
| 3 | All `og-audit/atoms/*` (24 docs) | 2-3 hr |
| 4 | All `og-audit/molecules/*` (26 docs) | 2-3 hr |
| 5 | All `og-audit/organisms/*` (42 docs · or top 15 priority) | 3-4 hr |
| 6 | `og-audit/patterns/` · `recipes/` · `motion/` · `voice/` · `a11y/` · `anti-patterns/` | 2 hr |
| 7 | `worked-examples/*` (5 consumer audits) | 2 hr |
| 8 | `industry-research/*` (10 industry refs + synthesis) | 2-3 hr |
| 9 | `gap-analysis/` | 1 hr |
| 10 | `99_decision-record.md` | 30 min |
| **Total** | end-to-end pass | **~20 hours** |

For path forward decision: phases 1-2 + 7 + 9 + 10 are the critical path (~5 hr).
