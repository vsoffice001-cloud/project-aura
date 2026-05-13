/**
 * mock-data.ts — Mock Data Gateway
 * report-store-v07
 *
 * Single import point for all fixture/mock data.
 * In production, replace these exports with real API calls:
 *   industries → fetch('/api/industries')  // TODO: replace w/ real API
 *   reports    → fetch('/api/reports')      // TODO: replace w/ real API
 *
 * See src/app/components/hooks/useReportFilters.ts for consumption pattern.
 */

// TODO: replace w/ real API — GET /api/industries
export { industries } from "../app/components/data";

// TODO: replace w/ real API — GET /api/reports
export { reports } from "../app/components/data";
