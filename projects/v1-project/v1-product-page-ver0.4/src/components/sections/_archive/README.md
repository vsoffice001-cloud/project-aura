# _archive

Sprint 4 chaptered viewer — replaced 2026-05-22 by `ReportPreviewSlideshow` per user mandate
(wrong v0-lite component ported originally · slideshow was target).

## Archived files

- `SamplePreviewSection.tsx` — §22 chaptered sample report viewer (IntersectionObserver-based, 4 chapters, sidebar TOC)
- `sample-report/` — Sub-components: SidebarTOC, ChapterExecutiveSummary, ChapterMarketOverview, ChapterExtendedTOC, ChapterMethodology, MobileTOC, data.ts

## Replacement

`src/components/sections/ReportPreviewSlideshow.tsx` — 1:1 port of `V0_lite_report-legacy/SlideshowSection.tsx`
with Next 15 App Router, DS v2 atoms, token-only styling, 49 Australia Cold Chain slides.
