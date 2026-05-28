/**
 * Australia Cold Chain Market Data — v0.4 default report
 *
 * @what  Report variant 1 of 3. Full 21-section coverage — all body sections present.
 *        This is the baseline report used throughout v0.4 development.
 *
 * @why   Extracted from inline page.tsx hardcoded values so all 3 variants
 *        share a single conditional-render system in phase-2/page.tsx.
 *
 * @when  Default load at /test/phase-2 (no ?report= param) and ?report=australia-cold-chain.
 *
 * // TODO: replace w/ GET /api/reports/australia-cold-chain once Django backend ships
 */

import { BarChart3, TrendingUp, Globe } from 'lucide-react';
import type { ReportData } from './types';

export const australiaColdChainReport: ReportData = {
  meta: {
    id: 'australia-cold-chain',
    title: 'Australia Cold Chain Market Outlook 2022–2027',
    industry: 'Logistics',
    region: 'Australia',
    fiscalYear: '2022–2027',
    chipLabel: 'AU Cold Chain',
  },

  hero: {
    eyebrow: 'LOGISTICS · AUSTRALIA · 2022–2027',
    title: 'Australia Cold Chain Market Outlook 2022–2027',
    promise:
      'Market size, segmentation, competitor landscape, growth drivers, and forecast outlook for Australia\'s cold chain industry.',
    stats: [
      { icon: BarChart3, value: 'AUD 6,547.8 Mn', label: 'Market Size 2022' },
      { icon: TrendingUp, value: '10.03%', label: 'CAGR 2022-2027' },
      { icon: Globe, value: 'AUD 10,705 Mn', label: 'Forecast 2027' },
    ],
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'Reports', href: '/reports' },
      { label: 'Logistics', href: '/reports/logistics' },
      { label: 'Australia Cold Chain', href: '#' },
    ],
  },

  // All 21 body sections + 3 full-width escape sections = full coverage
  sections: {
    executiveSummary: true,
    scope: true,
    countryInfra: true,
    marketOverview: true,
    definitions: true,
    taxonomy: true,
    ecosystem: true,
    marketSize: true,
    submarkets: true,
    segmentation: true,
    industry: true,
    endUser: true,
    dsGap: true,
    competitor: true,
    regulatory: true,
    futureOutlook: true,
    opportunities: true,
    macro: true,
    methodology: true,
    toc: true,
    faq: true,
    reportPreview: true,
    relatedReports: true,
    getFullAccess: true,
  },
};
