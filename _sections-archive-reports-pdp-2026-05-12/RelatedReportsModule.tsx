'use client';

/**
 * RelatedReportsModule — Row 31 — Recipe report-detail.md line 72
 * bg: white · spacing: lg · motion: CSS scroll-snap horizontal carousel
 * 6 match strategies · 4 cards visible desktop · 1-2 mobile
 * CSS scroll-snap-x mandatory · no HorizontalScroll molecule needed
 */

import { useRef } from 'react';
import Link from 'next/link';
import {
  SectionWrapper,
  SectionHeading,
  SectionLabel,
  Card,
  Badge,
} from '@kenresearch/design-system/atoms';
import { useAnalytics } from '@/hooks/useAnalytics';
import type { RelatedReport } from '@/types/schema';

const STRATEGY_LABELS: Record<RelatedReport['matchStrategy'], string> = {
  'same-market-adjacent-geo': 'Adjacent Market',
  'same-geo-adjacent-market': 'Adjacent Segment',
  'same-industry': 'Same Industry',
  'same-buyer-use-case': 'Same Use Case',
  'recently-published': 'Recently Published',
  'custom-research-alternative': 'Custom Alternative',
};

interface Props {
  related: RelatedReport[];
}

interface ReportCardProps {
  report: RelatedReport;
  onCardClick: (report: RelatedReport) => void;
}

function ReportCard({ report, onCardClick }: ReportCardProps) {
  return (
    <div
      className="snap-start shrink-0 w-[280px] sm:w-[300px] md:w-[320px] h-full"
      aria-label={report.title}
    >
      <Card variant="white" padding="md" className="h-full flex flex-col gap-3">
        {/* Thumbnail placeholder */}
        <div
          className="w-full h-32 rounded-md flex items-center justify-center"
          style={{ background: 'var(--color-ramp-warm-300)' }}
          aria-hidden="true"
        >
          <span
            className="text-xs font-medium uppercase tracking-wider"
            style={{ color: 'var(--color-neutral-400, #9ca3af)' }}
          >
            {report.region}
          </span>
        </div>

        {/* Strategy badge */}
        <div>
          <Badge theme="neutral">{STRATEGY_LABELS[report.matchStrategy]}</Badge>
        </div>

        {/* Title */}
        <h3
          className="font-[var(--typography-family-display)] font-semibold leading-snug line-clamp-3"
          style={{ fontSize: 'var(--typography-size-base)', color: 'var(--color-foundation-black)' }}
        >
          {report.title}
        </h3>

        {/* Meta badges */}
        <div className="flex flex-wrap gap-1.5">
          <Badge theme="neutral">{report.industry}</Badge>
          <Badge theme="info">{report.region}</Badge>
        </div>

        {/* Short summary */}
        <p
          className="leading-relaxed line-clamp-3"
          style={{ fontSize: 'var(--typography-size-sm)', color: 'var(--color-neutral-600, #4b5563)' }}
        >
          {report.shortSummary}
        </p>

        {/* Metadata */}
        <p
          className="text-xs"
          style={{ color: 'var(--color-neutral-400, #9ca3af)' }}
        >
          {report.pages} pages · {report.publishedDate}
        </p>

        {/* CTA */}
        <div className="mt-auto pt-2">
          <Link
            href={`/reports/${report.slug}`}
            onClick={() => onCardClick(report)}
            className="inline-flex items-center gap-1 font-medium transition-colors hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              fontSize: 'var(--typography-size-sm)',
              color: 'var(--color-brand-red, #b01f24)',
              outlineColor: 'var(--color-brand-red, #b01f24)',
            }}
          >
            View Report
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </Card>
    </div>
  );
}

export function RelatedReportsModule({ related }: Props) {
  const dispatch = useAnalytics();
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!related || related.length === 0) return null;

  const handleCardClick = (report: RelatedReport) => {
    dispatch('related_report_click', {
      section_name: 'RelatedReportsModule',
      chart_id: report.id,
    });
  };

  return (
    <SectionWrapper background="white" spacing="lg" id="sec-related">
      <SectionLabel>Related Reports</SectionLabel>
      <SectionHeading level={2} className="mt-2 mb-8">
        Reports You May Also Need
      </SectionHeading>

      {/* Horizontal scroll carousel */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4"
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
        role="list"
        aria-label="Related reports carousel"
      >
        {related.map((report) => (
          <div key={report.id} role="listitem" className="h-full">
            <ReportCard
              report={report}
              onCardClick={handleCardClick}
            />
          </div>
        ))}
      </div>

      {/* Scroll hint — mobile */}
      <p
        className="mt-2 text-xs text-center md:hidden"
        style={{ color: 'var(--color-neutral-400, #9ca3af)' }}
      >
        Swipe to see more
      </p>
    </SectionWrapper>
  );
}
