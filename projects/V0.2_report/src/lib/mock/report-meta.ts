/**
 * Qatar Fresh Herbs Market — report metadata.
 * Drives Hero glass card + sub. Carried verbatim from V0.2_report-legacy.
 *
 * TODO: replace w/ real API (Django /api/reports/<slug>/meta) at handover.
 */

export interface ReportMeta {
  region: string;
  monthLabel: string;
  title: string;
  yearsRange: string;
  bodyDescription: string;
  baseYear: string;
  pages: string;
  regionLong: string;
  author: string;
  productCode: string;
  ctaPrimaryLabel: string;
  ctaSecondaryLabel: string;
  marketValue: string;
  forecastValue: string;
  cagr: string;
  dominantCity: string;
  organicGrowth: string;
  keyPlayers: string;
}

export const reportMeta: ReportMeta = {
  region: 'Qatar',
  monthLabel: 'May 2026',
  title: 'Qatar Fresh Herbs Market',
  yearsRange: '2019–2030',
  bodyDescription:
    'Qatar fresh herbs market reaches $213 Mn by 2030, growing at 6.0% CAGR, driven by rising local cultivation and food-service demand.',
  baseYear: '2024',
  pages: '82',
  regionLong: 'Middle East',
  author: 'Rebecca',
  productCode: 'KRAD3953',
  ctaPrimaryLabel: 'Download sample report',
  ctaSecondaryLabel: 'Connect with Consultant',
  marketValue: '$150 Mn',
  forecastValue: '$213 Mn',
  cagr: '6.0%',
  dominantCity: 'Doha 78%',
  organicGrowth: '15% YoY',
  keyPlayers: '15+',
};
