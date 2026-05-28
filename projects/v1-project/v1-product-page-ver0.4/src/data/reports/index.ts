/**
 * Report data registry — v0.4 multi-report system
 *
 * @what  Central registry for all 3 report data variants.
 *        `getReport(id)` resolves ?report= URL param to ReportData.
 *        Falls back to australia-cold-chain (default) for unknown ids.
 *
 * // TODO: replace registry w/ API call to /api/reports/:id
 */

export type { ReportData, ReportMeta, SectionAvailabilityMap, HeroStat, TocItemOverride } from './types';

export { australiaColdChainReport } from './australia-cold-chain';
export { indiaPharmaLogisticsReport } from './india-pharma-logistics';
export { southeastAsiaQuickCommerceReport } from './southeast-asia-quick-commerce';

import { australiaColdChainReport } from './australia-cold-chain';
import { indiaPharmaLogisticsReport } from './india-pharma-logistics';
import { southeastAsiaQuickCommerceReport } from './southeast-asia-quick-commerce';
import type { ReportData } from './types';

/** All available reports — drives variant switcher chips */
export const ALL_REPORTS: ReportData[] = [
  australiaColdChainReport,
  indiaPharmaLogisticsReport,
  southeastAsiaQuickCommerceReport,
];

/** Default report shown at /test/phase-2 with no ?report= param */
export const DEFAULT_REPORT_ID = 'australia-cold-chain';

/**
 * Resolve a ?report= URL param value to ReportData.
 * Returns default (australia-cold-chain) for unknown ids.
 */
export function getReport(id: string | null | undefined): ReportData {
  if (!id) return australiaColdChainReport;
  const found = ALL_REPORTS.find((r) => r.meta.id === id);
  return found ?? australiaColdChainReport;
}
