# Graph Report - .  (2026-05-12)

## Corpus Check
- 60 files · ~113,876 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 60 nodes · 292 edges · 9 communities detected
- Extraction: 79% EXTRACTED · 21% INFERRED · 0% AMBIGUOUS · INFERRED: 60 edges (avg confidence: 0.7)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Project Docs + Logs|Project Docs + Logs]]
- [[_COMMUNITY_Aura Design Surfaces|Aura Design Surfaces]]
- [[_COMMUNITY_Sprint 2026-05-07 Port Forensics|Sprint 2026-05-07 Port Forensics]]
- [[_COMMUNITY_Anti-Patterns + Surveys|Anti-Patterns + Surveys]]
- [[_COMMUNITY_Decisions Engine (variantdensitymotion)|Decisions Engine (variant/density/motion)]]
- [[_COMMUNITY_Research Pillar Recipes|Research Pillar Recipes]]
- [[_COMMUNITY_Consulting Pillar Recipes|Consulting Pillar Recipes]]
- [[_COMMUNITY_DS Phase Docs|DS Phase Docs]]
- [[_COMMUNITY_Page-Build Chain|Page-Build Chain]]

## God Nodes (most connected - your core abstractions)
1. `CHANGELOG` - 45 edges
2. `SKILL` - 32 edges
3. `PLAN-2026-05-08-aura-tightening` - 29 edges
4. `ANTI_PATTERNS` - 26 edges
5. `DECISIONS` - 25 edges
6. `LEARNINGS` - 20 edges
7. `MOTION_SPEC` - 18 edges
8. `surface-picker` - 18 edges
9. `README` - 16 edges
10. `case-study` - 15 edges

## Surprising Connections (you probably didn't know these)
- `AURA_SPRINT_2026-05-01` --references--> `4WH_AUDIT`  [INFERRED]
  docs/AURA_SPRINT_2026-05-01.md → design-system/4WH_AUDIT.md
- `CHANGELOG` --references--> `ANTI_PATTERNS`  [INFERRED]
  docs/CHANGELOG.md → design-system/ANTI_PATTERNS.md
- `RESUME-NOTE` --references--> `ANTI_PATTERNS`  [INFERRED]
  docs/aura-sprint-2026-05-07-port/RESUME-NOTE.md → design-system/ANTI_PATTERNS.md
- `B-DS-FORENSIC-v1-and-heal-plan` --references--> `COMPONENT_REFERENCE`  [INFERRED]
  docs/aura-sprint-2026-05-07-port/B-DS-FORENSIC-v1-and-heal-plan.md → design-system/COMPONENT_REFERENCE.md
- `aura-builder` --references--> `MOTION_SPEC`  [INFERRED]
  workflows/agents/aura-builder.md → design-system/motion/MOTION_SPEC.md

## Communities

### Community 0 - "Project Docs + Logs"
Cohesion: 0.44
Nodes (15): COMPONENT_REFERENCE, foundations, README, AURA_SPRINT_2026-05-01, DECISIONS, LEARNINGS, SPRINT-LEARNINGS-2026-05-08, SYSTEM-ARCHITECTURE (+7 more)

### Community 1 - "Aura Design Surfaces"
Cohesion: 0.57
Nodes (8): chart-picker, surface-picker, SKILL, 01-discovery, 02-report-store, 03-report-viewer, 04-dashboards, 05-engagement

### Community 2 - "Sprint 2026-05-07 Port Forensics"
Cohesion: 0.32
Nodes (8): 4WH_AUDIT, A1-V0_lite_report-audit, A2-report-store-audit, A3-V0.2_report-audit, A-synthesis-cross-project, B2-DS-patterns-backgrounds-deep-map, B-DS-FORENSIC-v1-and-heal-plan, RESUME-NOTE

### Community 3 - "Anti-Patterns + Surveys"
Cohesion: 0.67
Nodes (6): ANTI_PATTERNS, MOTION_SPEC, ds-doc-page, survey-detail, survey-listing, surveys

### Community 4 - "Decisions Engine (variant/density/motion)"
Cohesion: 0.73
Nodes (6): PLAN-2026-05-08-aura-tightening, brand-variant, density-picker, motion-router, cinematic-dark, editorial-light

### Community 5 - "Research Pillar Recipes"
Cohesion: 1.1
Nodes (5): report-detail, report-store-home, report-store-listing, sector-landing, research

### Community 6 - "Consulting Pillar Recipes"
Cohesion: 0.9
Nodes (5): case-study, methodology, README, service-overview, consulting

### Community 7 - "DS Phase Docs"
Cohesion: 0.83
Nodes (4): CHANGELOG, DESIGN_SYSTEM_EVOLUTION, KENRESEARCH_DESIGN_SYSTEM_PHASE1, VISUAL_GAP_MATRIX

### Community 8 - "Page-Build Chain"
Cohesion: 1.0
Nodes (3): anti-patterns, page-build, voice

## Knowledge Gaps
- **3 isolated node(s):** `VISUAL_GAP_MATRIX`, `A1-V0_lite_report-audit`, `A3-V0.2_report-audit`
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `CHANGELOG` connect `DS Phase Docs` to `Project Docs + Logs`, `Aura Design Surfaces`, `Sprint 2026-05-07 Port Forensics`, `Anti-Patterns + Surveys`, `Decisions Engine (variant/density/motion)`, `Research Pillar Recipes`, `Consulting Pillar Recipes`, `Page-Build Chain`?**
  _High betweenness centrality (0.318) - this node is a cross-community bridge._
- **Why does `SKILL` connect `Aura Design Surfaces` to `Project Docs + Logs`, `Sprint 2026-05-07 Port Forensics`, `Anti-Patterns + Surveys`, `Decisions Engine (variant/density/motion)`, `Research Pillar Recipes`, `Consulting Pillar Recipes`, `DS Phase Docs`, `Page-Build Chain`?**
  _High betweenness centrality (0.136) - this node is a cross-community bridge._
- **Why does `ANTI_PATTERNS` connect `Anti-Patterns + Surveys` to `Project Docs + Logs`, `Aura Design Surfaces`, `Sprint 2026-05-07 Port Forensics`, `Decisions Engine (variant/density/motion)`, `Research Pillar Recipes`, `Consulting Pillar Recipes`, `DS Phase Docs`, `Page-Build Chain`?**
  _High betweenness centrality (0.093) - this node is a cross-community bridge._
- **Are the 9 inferred relationships involving `CHANGELOG` (e.g. with `ANTI_PATTERNS` and `cinematic-dark`) actually correct?**
  _`CHANGELOG` has 9 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `SKILL` (e.g. with `cinematic-dark` and `editorial-light`) actually correct?**
  _`SKILL` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 15 inferred relationships involving `PLAN-2026-05-08-aura-tightening` (e.g. with `README` and `05-engagement`) actually correct?**
  _`PLAN-2026-05-08-aura-tightening` has 15 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `ANTI_PATTERNS` (e.g. with `CHANGELOG` and `RESUME-NOTE`) actually correct?**
  _`ANTI_PATTERNS` has 2 INFERRED edges - model-reasoned connections that need verification._