/**
 * V0 Lite Report — centralized mock-data gateway.
 *
 * TODO: replace w/ real API (Django /api/reports/<slug>) at handover.
 * Components MUST import from '@/lib/mock-data' — never from individual mock files.
 *
 * Source files (kept verbatim from V0_lite_report-legacy):
 *   - src/lib/mock/sample-report.ts  ← TOC items, ExtendedPhases, FilterOptions, FooterSummary
 *   - src/lib/mock/chart.ts          ← chart series
 *   - src/lib/mock/hero-themes.ts    ← visual theme presets (NOT data — variant DSL)
 *   - src/lib/mock/breadcrumb.ts     ← healthcare breadcrumb tree
 *
 * MSW handlers (Phase C step 8): /api/reports/<slug>, /api/breadcrumb/<slug>.
 */

// ── Sample report (TOC, extended phases, chapters) ──────────────────────────
export {
  // Types
  type TOCState,
  type TocVariant,
  type ChapterState,
  type TOCItem,
  type ExtendedSubsection,
  type ExtendedSection,
  type ExtendedPhase,
  type ExtendedStats,
  type FooterSummary,
  type FilterOption,
  // Data — TODO: replace w/ real API
  tocItems,
  accessibleChapterOrder,
  chapterIdMap,
  getChapterState,
  extendedTocPhases2,
  extendedTocStats2,
  extendedFooterSummary2,
  extendedTocPhases3,
  extendedTocStats3,
  extendedFooterSummary3,
  extendedFilters,
} from './mock/sample-report';

// ── Charts ──────────────────────────────────────────────────────────────────
export { chartData } from './mock/chart';

// ── Hero theme variants (visual presets, not data) ──────────────────────────
export {
  type HeroVariant,
  type HeroTheme,
  heroThemes,
  getHeroTheme,
  getAllHeroVariants,
} from './mock/hero-themes';

// ── Breadcrumb ──────────────────────────────────────────────────────────────
export {
  type BreadcrumbItem,
  type BreadcrumbLevel,
  healthcareBreadcrumbData,
} from './mock/breadcrumb';

// ── Report meta (Hero section) ──────────────────────────────────────────────
export { type ReportMeta, reportMeta } from './mock/report-meta';

// ── Slideshow ───────────────────────────────────────────────────────────────
export { type SlideMeta, slides } from './mock/slideshow';
