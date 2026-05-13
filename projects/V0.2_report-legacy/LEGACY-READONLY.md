# LEGACY-READONLY — V0.2_report_handover_file (Vite/Figma Make export)

**Date frozen:** 2026-05-08
**Reason:** Replaced by `projects/V0.2_report/` (Next.js 15 port).
**DO NOT EDIT.** Read-only **STRUCTURE-ONLY** reference. Visuals discarded.

## Carry-over scope (per `docs/aura-sprint-2026-05-07-port/A3-V0.2_report-audit.md`)

**HEAVY REWRITE** — ~70-80% throwaway. Use legacy as STRUCTURE/POSITION ref only.

### KEEP (verbatim)
- **Information architecture:** 13-section sequence: MarketOverview (Ch1) → ScopeOfReport → MarketAnalysis → MarketDataTable (Ch4) → SegmentationSection → RegionalComparison (Ch6) → GrowthDriversChallenges → CompetitiveLandscape → TableOfContentsSection → TargetAudience → ResearchMethodology → FAQSection → RelatedReports → FinalCTA + Footer + FloatingCTA
- **Content/mock data (Qatar Fresh Herbs theme verbatim):** report meta ($150 Mn 2024, $213 Mn 2030, 6.0% CAGR, 82 pages, Doha 78%, 15+ players, base year 2024, code KRAD3953); scope mind-map (4 chapters × 3 sub × 3 leaves); 15-company competitive table; drivers/challenges/opportunities (3-col); methodology cards; FAQ Q&A; TOC time-estimates; footer nav (4 sections × 7-9 links + offices India/UAE)
- **Interaction patterns:** scroll-progress bar in header, scroll-spy active-section highlighting in sidebar, sidebar status states (completed check / active filled / upcoming dimmed / locked), sidebar collapse 80px, TOC time-estimates per chapter, sortable company table, mind-map zoom/pan/click (KEEP d3 per user), floating CTA post-hero scroll trigger, final CTA gradient banner before footer
- **d3 mindmap:** keep d3 + redesign visuals only (per user decision)
- **Hero variant:** cinematic-dark per KSA Coldchain reference + `kenresearch.com/ksa-coldchain-test-market` live ref

### DROP (visuals + dev artifacts)
- DM Sans-as-display override (return to Noto Serif)
- Off-brand purple `#7f5fe3` chart palette saturating product
- Cobalt purple `#6400E4` decorative in Footer
- 219 hex literals + 150 arbitrary `[Npx]/[#xxx]` + 43 inline `style={{}}` props (370+ deviation sites)
- "MANDATORY" off-scale padding `px-[67.5px]/84.375px/112.5px` baked in tokens
- Body opacity 0.7 + secondary color compounding washing-out
- `var(--pattern-*)` undefined tokens (broken at runtime)
- Glassmorphic hero card visual treatment (replace w/ proper editorial-light or cinematic-dark per recipe)
- Video bg in hero (replace w/ cinematic-dark gradient mesh per KSA Coldchain ref)
- DIY rAF orb floating animation (use Framer Motion)
- Footer giant decorative `text-[356px]`
- 4 parallel DS sources: `src/app/components/ui/`, `design-system/`, `design-system-export/`, `charts-export-package/`
- 50+ stale audit MDs at root
- 6 lazy "showcase" routes (DesignSystem/MindMapDemo/StakeholderIcons/SegmentationIcons/ChartsShowcase)
- d3 (keep for mindmap only) + Highcharts (replace) → use ONLY Highcharts via DS theme
- Phosphor (50 imports) → consolidate to Lucide
- All MUI/Emotion declared-not-imported deps
- DIY pathname-string router → Next App Router

## Lineage

- Source: V0.2_report_handover_file (Figma Make export, `@figma/my-make-file` package name)
- Target: `projects/V0.2_report/` (Next.js 15 + DS workspace, cinematic-dark hero variant)
- Audit: `docs/aura-sprint-2026-05-07-port/A3-V0.2_report-audit.md`
- Sprint: `docs/aura-sprint-2026-05-07-port/RESUME-NOTE.md`
- Estimate per audit: 9-13 working days
