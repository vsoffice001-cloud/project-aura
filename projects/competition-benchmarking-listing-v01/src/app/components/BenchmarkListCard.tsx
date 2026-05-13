/**
 * BenchmarkListCard — Horizontal list-mode card
 * competition-benchmarking-listing-v01
 *
 * Mirrors RS-v07 ReportCard `list` variant 1:1 for typography/colors per design-system sync rule.
 * 3-col layout: thumb / content / right-actions.
 * Pages info intentionally excluded — varies report-to-report (PDP only).
 * DS tokens only — no hardcoded hex/px.
 */

import { Calendar, MapPin, Users } from 'lucide-react';
import { Card } from './Card';
import { Button } from './Button';
import { IndustryBadge } from './molecules/IndustryBadge';
import { iconColors } from './iconColors';
import type { BenchmarkReport } from '../../lib/mock-data';

interface BenchmarkListCardProps {
  report: BenchmarkReport;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export function BenchmarkListCard({ report }: BenchmarkListCardProps) {
  const onView = () => { window.location.href = `/research/competition-benchmarking/${report.slug}`; };

  return (
    <Card
      as="article"
      hover
      className="group flex cursor-pointer overflow-hidden"
      onClick={onView}
    >
      {/* Col 1: Image — portrait 2:3-ish (RS: w-16 sm:w-20, edge-to-edge self-stretch) */}
      <div className="w-16 sm:w-20 flex-shrink-0 relative overflow-hidden self-stretch">
        <div className="absolute inset-0">
          <img
            src={report.thumbnailUrl}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="w-full h-full object-cover img-zoom"
          />
        </div>
      </div>

      {/* Col 2: Content */}
      <div className="flex-1 min-w-0 flex flex-col py-2.5 px-3 sm:px-4">
        {/* Eyebrow — IndustryBadge (text-2xs, uppercase, 0.4 alpha, no border) */}
        <div className="flex items-center gap-2 mb-1.5" style={{ fontSize: 'var(--text-2xs)' }}>
          <IndustryBadge>{report.industry}</IndustryBadge>
        </div>

        {/* Title — RS list: text-black/80 text-nav line-clamp-2 group-hover:text-black */}
        <h3
          className="leading-snug line-clamp-2 mb-1.5 transition-colors group-hover:text-black"
          style={{
            fontSize: 'var(--text-nav)',
            color: 'rgba(0,0,0,0.80)',
          }}
          title={report.title}
        >
          {report.title}
        </h3>

        {/* Meta row — region · competitors (mirrors CardMetaRow style) */}
        <div
          className="flex items-center gap-1.5 flex-wrap"
          style={{ fontSize: 'var(--text-2xs)' }}
        >
          <span className="flex items-center gap-1" style={{ color: 'rgba(0,0,0,0.40)' }}>
            <MapPin className="h-3 w-3 flex-shrink-0" color={iconColors.utility} />
            {report.region}
          </span>
          <span style={{ color: 'rgba(0,0,0,0.15)' }}>·</span>
          <span className="flex items-center gap-1" style={{ color: 'rgba(0,0,0,0.35)' }}>
            <Users className="h-3 w-3 flex-shrink-0" color={iconColors.utility} />
            {report.competitorSetSize} competitors
          </span>
        </div>
      </div>

      {/* Col 3: Right — date + View Report button (desktop only, RS pattern) */}
      <div className="hidden sm:flex flex-col items-end flex-shrink-0 justify-between py-2.5 pr-3 sm:pr-4">
        <div className="flex flex-col items-end gap-1.5">
          <div
            className="flex items-center gap-2.5"
            style={{
              fontSize: 'var(--text-2xs)',
              color: 'rgba(0,0,0,0.40)',
            }}
          >
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" color={iconColors.utility} />
              {formatDate(report.publishedDate)}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div onClick={(e) => e.stopPropagation()}>
            <Button variant="secondary" size="xs" showArrow onClick={onView}>
              View Report
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile: inline date + arrow */}
      <div className="flex sm:hidden flex-col items-end justify-between flex-shrink-0 py-2.5 pr-3">
        <div
          className="flex items-center gap-1"
          style={{
            fontSize: 'var(--text-2xs)',
            color: 'rgba(0,0,0,0.40)',
          }}
        >
          <Calendar className="h-3 w-3" color={iconColors.utility} />
          {formatDate(report.publishedDate)}
        </div>
        <div onClick={(e) => e.stopPropagation()}>
          <Button variant="secondary" size="xs" showArrow onClick={onView}>
            View
          </Button>
        </div>
      </div>
    </Card>
  );
}
