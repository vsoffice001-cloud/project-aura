/**
 * report-store — centralized mock-data gateway.
 *
 * TODO: replace w/ real API at handover. Components MUST import from '@/lib/mock-data'.
 * Source verbatim from `report-store-legacy/src/app/components/data.ts` (10 exports, 413 LOC):
 *   - industries (14 entries)
 *   - reports (~45+ entries)
 *   - subcategoryTagMap (Record<string, string[]>)
 *   - trendingTopics, regions, stats, dailyHighlights, analystPicks, bundles, upcomingReports
 *
 * MSW handlers: /api/industries, /api/reports[?industry=&region=&q=&sort=], /api/trending, etc.
 */

export {
  industries,
  reports,
  subcategoryTagMap,
  trendingTopics,
  regions,
  stats,
  dailyHighlights,
  analystPicks,
  bundles,
  upcomingReports,
} from './mock/data';
