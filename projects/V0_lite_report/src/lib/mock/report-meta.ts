/**
 * Report metadata — drives Hero glass card + Hero subtitle.
 * TODO: replace w/ real API (Django /api/reports/<slug>/meta).
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
}

export const reportMeta: ReportMeta = {
  region: 'United Arab Emirates',
  monthLabel: 'May 2026',
  title: 'AI in Healthcare Market',
  yearsRange: '2024–2030',
  bodyDescription:
    'AI healthcare market to reach $148.4 Bn by 2030, growing at 32.5% CAGR, driven by diagnostic imaging adoption and precision medicine demand.',
  baseYear: '2024',
  pages: '165',
  regionLong: 'Middle East',
  author: 'Rebecca',
  productCode: 'KRV02-005000',
  ctaPrimaryLabel: 'Download sample report',
  ctaSecondaryLabel: 'Connect with Consultant',
};
