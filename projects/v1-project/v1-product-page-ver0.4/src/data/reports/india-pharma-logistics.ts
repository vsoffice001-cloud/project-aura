/**
 * India Pharma Logistics Cold Chain Market Data — report variant 2
 *
 * @what  India pharmaceutical cold chain market (2023–2028 outlook).
 *        Pharma-specific archetype — skips sections not applicable to pharma cold chain
 *        (EndUser deep dives replaced by regulatory depth · no reefer-truck segmentation).
 *        Sections skipped: endUser (pharma users covered in §10 segmentation · no separate
 *        sector-shelf matrix needed) · countryInfra (India infra covered via macroeconomic).
 *
 * @why   Demonstrates conditional section rendering — 2 sections hidden vs baseline.
 *        Pharma reports emphasise regulatory + demand-supply gap heavily; end-user
 *        and generic infra sections are less differentiated.
 *
 * @when  /test/phase-2?report=india-pharma
 *
 * // TODO: replace w/ GET /api/reports/india-pharma-logistics once Django backend ships
 */

import { BarChart3, TrendingUp, Globe } from 'lucide-react';
import type { ReportData } from './types';

export const indiaPharmaLogisticsReport: ReportData = {
  meta: {
    id: 'india-pharma',
    title: 'India Pharma Logistics Cold Chain Market 2023–2028',
    industry: 'Healthcare Logistics',
    region: 'India',
    fiscalYear: '2023–2028',
    chipLabel: 'IN Pharma',
  },

  hero: {
    eyebrow: 'PHARMA LOGISTICS · INDIA · 2023–2028',
    title: 'India Pharmaceutical Cold Chain Market 2023–2028',
    promise:
      'Cold chain infrastructure, regulatory compliance, capacity gap, competitor landscape, and growth forecast for India\'s pharmaceutical logistics sector.',
    stats: [
      { icon: BarChart3, value: 'USD 8,320 Mn', label: 'Market Size 2023' },
      { icon: TrendingUp, value: '13.2%', label: 'CAGR 2023-2028' },
      { icon: Globe, value: 'USD 15,680 Mn', label: 'Forecast 2028' },
    ],
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'Reports', href: '/reports' },
      { label: 'Healthcare Logistics', href: '/reports/healthcare-logistics' },
      { label: 'India Pharma Cold Chain', href: '#' },
    ],
  },

  sections: {
    executiveSummary: true,
    scope: true,
    // Skipped: India infra overview covered in macro section (§18)
    // — country-level infra not differentiated enough for pharma-specific report
    countryInfra: null,
    marketOverview: true,
    definitions: true,
    taxonomy: true,
    ecosystem: true,
    marketSize: true,
    submarkets: true,
    segmentation: true,
    industry: true,
    // Skipped: End-user deep dives (shelf-life matrix + sector analysis)
    // — pharma end-users covered in §10 segmentation · separate sector matrix N/A
    endUser: null,
    dsGap: true,
    competitor: true,
    // Regulatory is the CORE differentiator for pharma cold chain
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

  tocOverrides: [
    { id: 'executive-summary', number: '01', title: 'Executive Summary' },
    { id: 'scope', number: '02', title: 'Scope & Coverage' },
    { id: 'market-overview', number: '03', title: 'Market Overview' },
    { id: 'definitions', number: '04', title: 'Definitions' },
    { id: 'taxonomy', number: '05', title: 'Taxonomy' },
    { id: 'ecosystem', number: '06', title: 'Market Ecosystem' },
    { id: 'market-size', number: '07', title: 'Market Size & Growth' },
    { id: 'submarkets', number: '08', title: 'Submarkets' },
    { id: 'segmentation', number: '09', title: 'Segment Intelligence' },
    { id: 'industry', number: '10', title: 'Industry Analysis' },
    { id: 'ds-gap', number: '11', title: 'Demand-Supply Gap' },
    { id: 'competitor', number: '12', title: 'Competitor Landscape' },
    { id: 'regulatory', number: '13', title: 'Regulatory Landscape' },
    { id: 'future-outlook', number: '14', title: 'Future Outlook' },
    { id: 'opportunities', number: '15', title: 'Opportunities' },
    { id: 'macro', number: '16', title: 'Macroeconomic Indicators' },
    { id: 'methodology', number: '17', title: 'Methodology' },
    { id: 'toc', number: '18', title: 'Table of Contents' },
    { id: 'faq', number: '19', title: 'FAQs' },
  ],
};
