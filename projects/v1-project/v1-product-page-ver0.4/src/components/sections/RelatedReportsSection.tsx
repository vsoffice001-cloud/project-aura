'use client';

/**
 * RelatedReportsSection — v0.4 §23 Related Reports
 *
 * @what  Inline narrative lede (4 related Ken Research reports) ·
 *        NO MetricStrip (cards are the visual) ·
 *        4-col grid desktop · 2-col tablet · 1-col mobile of RelatedReportCard atoms ·
 *        SourceCluster (Ken Research publication catalog) ·
 *        NO closing InsightBox (cards carry the value · no analyst insight needed)
 *
 * @why   Cross-sell adjacent research is a high-value conversion path for B2B research
 *        buyers. Users who reached §23 are committed to the research category — surfacing
 *        adjacent markets (pharma logistics · APAC cold chain · last-mile) may convert
 *        as additional purchase or demo request. IBISWorld + Gartner both close their
 *        report PDPs with related report grids.
 *
 * @when  v0.4 PDP body §23. Below §22 Sample Preview · above §24 Get Full Access.
 *
 * Source: Ken Research publication catalog · 2024.
 */

import { SectionLabel } from '@kenresearch/design-system/atoms';
import { RelatedReportCard } from '@/components/atoms/RelatedReportCard';
import { SourceCluster } from '@/components/atoms/SourceCluster';
import { getSources } from '@/lib/sources';

// ─────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────

interface RelatedReport {
  id: string;
  category: string;
  title: string;
  description: string;
  meta: { pages: number; year: number; priceBand: string };
  href: string;
}

const RELATED_REPORTS: RelatedReport[] = [
  {
    id: 'rr-01',
    category: 'Pharma Logistics',
    title: 'Australia Pharma Logistics Market 2023–2028',
    description:
      'End-to-end pharmaceutical cold-chain logistics · TGA-compliant distribution · vaccine cold chain · biologics · 3PL penetration and forecast across all Australian states.',
    meta: { pages: 198, year: 2023, priceBand: 'AUD 3,800+' },
    href: '/reports/australia-pharma-logistics-2023',
  },
  {
    id: 'rr-02',
    category: 'APAC Cold Chain',
    title: 'Asia-Pacific Cold Chain Outlook 2024–2029',
    description:
      'Regional cold chain market dynamics across 12 APAC markets · China · Japan · Australia · Southeast Asia · capacity benchmarking · operator consolidation trends · 5-year forecast.',
    meta: { pages: 320, year: 2024, priceBand: 'AUD 5,400+' },
    href: '/reports/apac-cold-chain-2024',
  },
  {
    id: 'rr-03',
    category: 'Last-Mile Logistics',
    title: 'Australia Last-Mile Delivery & E-commerce Logistics 2023–2027',
    description:
      'Grocery e-commerce fulfilment · cold last-mile density · dark store expansion · Woolworths vs Coles vs independents · regulatory mandates on refrigerated delivery vehicles.',
    meta: { pages: 175, year: 2023, priceBand: 'AUD 3,200+' },
    href: '/reports/australia-last-mile-ecommerce-2023',
  },
  {
    id: 'rr-04',
    category: 'Reefer Containers',
    title: 'Global Reefer Container Market 2024–2030',
    description:
      'Global reefer container fleet size · lease rates · OEM competitive landscape · Australia import/export reefer flow · demand drivers from fresh produce + pharma + meat protein trade.',
    meta: { pages: 240, year: 2024, priceBand: 'AUD 4,600+' },
    href: '/reports/global-reefer-container-2024',
  },
];

const CITATIONS = getSources(['ken-primary-coldchain-2024']);

// ─────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────

export function RelatedReportsSection() {
  return (
    <section
      id="related"
      aria-label="Related Ken Research Reports"
      className="px-4 sm:px-6 lg:px-16 py-16 sm:py-20 bg-[var(--color-foundation-white,#ffffff)] w-full"
    >
      <div className="max-w-[1240px] mx-auto w-full">
      {/* Eyebrow */}
      <div className="inline-flex mb-3">
        <SectionLabel background="light" variant="accent">
          Section 23
        </SectionLabel>
      </div>

      {/* Section heading */}
      <h2
        className="font-display font-light text-[clamp(24px,2.6vw,36px)] leading-[1.1] tracking-tight text-[var(--semantic-ink-strong)] mb-3"
        style={{ letterSpacing: '-0.015em' }}
      >
        Related Reports
      </h2>

      {/* Inline narrative lede */}
      <p className="font-body text-[var(--semantic-ink-body)] mb-10 max-w-[58ch]" style={{ fontSize: '15px', lineHeight: 1.6 }}>
        <strong className="font-semibold text-[var(--semantic-ink-strong)]">4 related Ken Research reports</strong>
        {' '}· adjacent markets and deeper cuts to complement the Australia Cold Chain study.
      </p>

      {/* 4-col grid desktop · 2-col tablet · 1-col mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center sm:justify-items-start">
        {RELATED_REPORTS.map((report) => (
          <RelatedReportCard
            key={report.id}
            category={report.category}
            title={report.title}
            description={report.description}
            meta={report.meta}
            href={report.href}
            className="w-full max-w-none"
          />
        ))}
      </div>

      {/* Source cluster */}
      <div className="mt-8">
        <SourceCluster citations={CITATIONS} methodologyHref="#methodology" />
      </div>
      </div>{/* /max-w inner wrapper */}
    </section>
  );
}
