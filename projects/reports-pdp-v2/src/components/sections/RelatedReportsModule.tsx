'use client';

/**
 * CRAFT (aura-craft step 4.5 · 2026-05-12)
 * Lead: report title (text-xl font-display font-medium · h3 per card · industry + region tags follow as Badge pills)
 * Type rhythm: xl/sm/base/xs — report title = text-xl · industry/region badges = text-xs · 1-line summary = text-sm · date = text-xs · CTA = Button sm (text-sm)
 * Motion: horizontal scroll momentum (CSS scroll-snap mobile) · stagger 80ms card entrance desktop (whileInView · once)
 *   — useReducedMotion disables stagger; all cards render at final state · CSS scroll still works
 * Depth: subtle-shadows — Card border + --shadow-card-default · hover --shadow-card-hover translateY(-2px) · shadow crucial on white bg
 * Mobile: horizontal scroll card carousel (overflow-x-auto scroll-snap mandatory · CSS only · no Framer) · 3-col desktop grid · stack column mobile
 */

/**
 * RelatedReportsModule — 6 strategies (recipe row 31)
 *
 * Variant: editorial-light
 * Background: white · spacing: lg (LOCK 3)
 *
 * 6 match strategies: same market adj geo · same geo adj market · same industry
 *                     same buyer use case · recent · custom research alt
 *
 * Mobile: horizontal scroll card carousel (CSS scroll-snap + momentum)
 * Desktop: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
 *
 * Per card: title · industry tag · region · publishedDate · 1-line summary · "View Report" CTA
 *
 * A11y: <ul> list · keyboard-navigable · scroll region labelled.
 * Framer stagger 80ms · useReducedMotion guard.
 */

import { motion, useReducedMotion } from 'framer-motion';

import { ArrowUpRight } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1] as unknown as [number, number, number, number];
import {
  SectionWrapper,
  SectionHeading,
  SectionLabel,
  Card,
  Badge,
} from '@kenresearch/design-system/atoms';
import type { RelatedReport } from '@/types/schema';

export interface RelatedReportsModuleProps {
  reports: RelatedReport[];
}

// Match strategy → display label
const STRATEGY_LABELS: Record<RelatedReport['matchStrategy'], string> = {
  'same-market-adjacent-geo': 'Same market · adjacent geography',
  'same-geo-adjacent-market': 'Same geography · adjacent market',
  'same-industry': 'Same industry',
  'same-buyer-use-case': 'Same buyer use case',
  'recently-published': 'Recently published',
  'custom-research-alternative': 'Custom research alternative',
};

interface RelatedReportCardProps {
  report: RelatedReport;
  index: number;
  shouldReduceMotion: boolean;
}

function RelatedReportCard({ report, index, shouldReduceMotion }: RelatedReportCardProps) {
  return (
    <motion.li
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.4, ease: EASE, delay: shouldReduceMotion ? 0 : index * 0.08 }}
      className="list-none"
      // For horizontal scroll on mobile: min-width ensures card doesn't shrink
      style={{ minWidth: '280px' }}
    >
      <a
        href={`/reports/${report.slug}`}
        className="block h-full group focus-visible:outline-none"
        aria-label={`View report: ${report.title}`}
      >
        <Card
          padding="md"
          className="h-full flex flex-col gap-3 transition-shadow duration-200 group-hover:shadow-md"
        >
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            <Badge theme="neutral" variant="minimal">{report.industry}</Badge>
            <Badge theme="muted" variant="minimal">{report.region}</Badge>
          </div>

          {/* Title */}
          <h3
            className="text-base font-display font-medium leading-snug flex-1"
            style={{ color: 'var(--color-foundation-black)' }}
          >
            {report.title}
          </h3>

          {/* Summary */}
          <p
            className="text-compact font-body leading-relaxed"
            style={{ color: 'var(--surface-text-muted)' }}
          >
            {report.shortSummary}
          </p>

          {/* Meta row */}
          <div
            className="flex items-center justify-between pt-2"
            style={{ borderTop: '1px solid var(--border-soft)' }}
          >
            <div className="flex flex-col gap-0.5">
              <span className="text-compact font-body" style={{ color: 'var(--surface-text-muted)' }}>
                {report.publishedDate} · {report.pages}pp
              </span>
              <span className="text-compact font-body" style={{ color: 'var(--surface-text-muted)', fontSize: '11px' }}>
                {STRATEGY_LABELS[report.matchStrategy]}
              </span>
            </div>
            <span
              className="flex items-center gap-1 text-compact font-display font-medium transition-colors group-hover:text-brand"
              style={{ color: 'var(--color-brand)' }}
              aria-hidden="true"
            >
              View <ArrowUpRight size={14} />
            </span>
          </div>
        </Card>
      </a>
    </motion.li>
  );
}

export function RelatedReportsModule({ reports }: RelatedReportsModuleProps) {
  const shouldReduceMotion = useReducedMotion() ?? false;

  if (!reports || reports.length === 0) return null;

  return (
    <SectionWrapper background="white" spacing="lg" id="related-reports">
      <div className="flex flex-col gap-8">

        {/* Heading */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <SectionLabel>Related Intelligence</SectionLabel>
          <SectionHeading level={2} align="left">
            Related Reports
          </SectionHeading>
          <p className="mt-2 text-compact font-body" style={{ color: 'var(--surface-text-muted)' }}>
            Adjacent markets, geographies, and sectors relevant to your research context.
          </p>
        </motion.div>

        {/* Mobile: horizontal scroll carousel */}
        <div className="md:hidden">
          <ul
            className="flex gap-4 overflow-x-auto pb-4"
            style={{
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
              scrollPadding: '0 var(--space-4)',
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
            }}
            aria-label="Related reports — swipe to see more"
          >
            {reports.map((report, idx) => (
              <RelatedReportCard
                key={report.id}
                report={report}
                index={idx}
                shouldReduceMotion={shouldReduceMotion}
              />
            ))}
          </ul>
        </div>

        {/* Desktop: grid */}
        <ul
          className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          aria-label="Related reports grid"
        >
          {reports.map((report, idx) => (
            <RelatedReportCard
              key={report.id}
              report={report}
              index={idx}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </ul>

      </div>
    </SectionWrapper>
  );
}
