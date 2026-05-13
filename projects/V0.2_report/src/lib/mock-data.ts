/**
 * V0.2_report — centralized mock-data gateway.
 *
 * TODO: replace w/ real API (Django /api/reports/qatar-fresh-herbs) at handover.
 * Components MUST import from '@/lib/mock-data' — never from individual mock files.
 *
 * Carried verbatim from V0.2_report-legacy (content + IA preserved; visuals discarded):
 *   - reportMeta (Qatar Fresh Herbs report metadata)
 *   - scopeTree (mind-map data: 4 chapters × 3 sub × 3 leaves) — Phase E section port adds
 *   - 15-company competitive table — Phase E section port adds
 *   - drivers/challenges/opportunities (3-col content) — Phase E adds
 *   - segments, regionalData, stakeholders, methodologySteps, faqs, relatedReports, tableOfContents
 *   - navSections (mega-menu data), footerSections, offices (India/UAE)
 */

export { type ReportMeta, reportMeta } from './mock/report-meta';
