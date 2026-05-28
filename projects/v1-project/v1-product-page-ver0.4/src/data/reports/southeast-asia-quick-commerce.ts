/**
 * Southeast Asia Quick Commerce Cold Chain Market Data — report variant 3
 *
 * @what  SE Asia quick-commerce cold chain (2024–2029 outlook).
 *        Q-commerce archetype — different report depth profile. Skips 5 sections:
 *        - countryInfra: multi-country study (6 markets) · infra too fragmented per-country
 *        - taxonomy: q-commerce cold chain taxonomy = standard food cold chain (no new taxonomy needed)
 *        - endUser: implied (urban B2C consumers) · no separate deep dive
 *        - macro: SE Asia macro covered in market overview (tab) · separate macro section redundant
 *        - dsGap: q-commerce supply = platform-defined · traditional DS gap model doesn't apply
 *
 * @why   Demonstrates 5-section skip pattern — q-commerce reports are operationally focused
 *        (logistics execution, last-mile, platform economics) rather than market-structure
 *        analysis. Sections not applicable = cleaner, shorter report page.
 *
 * @when  /test/phase-2?report=sea-quick-commerce
 *
 * // TODO: replace w/ GET /api/reports/southeast-asia-quick-commerce once Django backend ships
 */

import { BarChart3, TrendingUp, Globe } from 'lucide-react';
import type { ReportData } from './types';

export const southeastAsiaQuickCommerceReport: ReportData = {
  meta: {
    id: 'sea-quick-commerce',
    title: 'SE Asia Quick Commerce Cold Chain Market 2024–2029',
    industry: 'Quick Commerce Logistics',
    region: 'Southeast Asia',
    fiscalYear: '2024–2029',
    chipLabel: 'SEA Q-Commerce',
  },

  hero: {
    eyebrow: 'QUICK COMMERCE · SOUTHEAST ASIA · 2024–2029',
    title: 'SE Asia Quick Commerce Cold Chain Market 2024–2029',
    promise:
      'Last-mile cold chain execution, platform logistics infrastructure, dark store networks, and growth forecast across Indonesia, Vietnam, Thailand, Philippines, Malaysia, and Singapore.',
    stats: [
      { icon: BarChart3, value: 'USD 3,840 Mn', label: 'Market Size 2024' },
      { icon: TrendingUp, value: '22.7%', label: 'CAGR 2024-2029' },
      { icon: Globe, value: 'USD 10,650 Mn', label: 'Forecast 2029' },
    ],
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'Reports', href: '/reports' },
      { label: 'Quick Commerce', href: '/reports/quick-commerce' },
      { label: 'SE Asia Q-Commerce Cold Chain', href: '#' },
    ],
  },

  sections: {
    executiveSummary: true,
    scope: true,
    // Skipped: 6-market SE Asia study — per-country infra too fragmented for single section
    countryInfra: null,
    marketOverview: true,
    definitions: true,
    // Skipped: Q-commerce cold chain = standard food cold chain taxonomy, no proprietary taxonomy
    taxonomy: null,
    ecosystem: true,
    marketSize: true,
    submarkets: true,
    segmentation: true,
    industry: true,
    // Skipped: End-user = urban B2C consumers (implied) · no sector-shelf matrix applicable
    endUser: null,
    // Skipped: Q-commerce supply is platform-defined (Grab, GoTo, Lazada)
    // Traditional demand-supply gap analysis doesn't apply to platform-mediated markets
    dsGap: null,
    competitor: true,
    regulatory: true,
    futureOutlook: true,
    opportunities: true,
    // Skipped: SE Asia macro embedded in market overview multi-country tab
    macro: null,
    methodology: true,
    toc: true,
    faq: true,
    reportPreview: true,
    relatedReports: true,
    getFullAccess: true,
  },

  tocOverrides: [
    { id: 'executive-summary', number: '01', title: 'Executive Summary' },
    { id: 'scope', number: '02', title: 'Scope & Coverage' },
    { id: 'market-overview', number: '03', title: 'Market Overview' },
    { id: 'definitions', number: '04', title: 'Definitions' },
    { id: 'ecosystem', number: '05', title: 'Market Ecosystem' },
    { id: 'market-size', number: '06', title: 'Market Size & Growth' },
    { id: 'submarkets', number: '07', title: 'Submarkets' },
    { id: 'segmentation', number: '08', title: 'Segment Intelligence' },
    { id: 'industry', number: '09', title: 'Industry Analysis' },
    { id: 'competitor', number: '10', title: 'Competitor Landscape' },
    { id: 'regulatory', number: '11', title: 'Regulatory Landscape' },
    { id: 'future-outlook', number: '12', title: 'Future Outlook' },
    { id: 'opportunities', number: '13', title: 'Opportunities' },
    { id: 'methodology', number: '14', title: 'Methodology' },
    { id: 'toc', number: '15', title: 'Table of Contents' },
    { id: 'faq', number: '16', title: 'FAQs' },
  ],
};
