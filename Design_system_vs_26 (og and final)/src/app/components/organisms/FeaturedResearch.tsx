/**
 * FeaturedResearch — Organism (DS v4.3)
 *
 * WHAT: Featured research reports carousel for the Report Store home page.
 * WHY:  Wraps FeaturedCarousel with RS-specific content and data.
 * WHEN: Section 2 of ReportStorePage (Home mode).
 * HOW:  Renders FeaturedCarousel with FEATURED_REPORTS from data.ts,
 *       each item rendered via ReportCard layout="grid".
 */
import { FeaturedCarousel } from '@/app/components/organisms/FeaturedCarousel';
import { ReportCard } from '@/app/components/molecules/ReportCard';
import { FEATURED_REPORTS } from '@/app/components/data';

export function FeaturedResearch() {
  return (
    <FeaturedCarousel
      label="Featured"
      title="Latest Research"
      subtitle="Our most recent publications across key growth sectors"
      ctaText="View all reports"
    >
      {FEATURED_REPORTS.map((report) => (
        <div key={report.id} className="flex-shrink-0" style={{ width: '300px' }}>
          <ReportCard {...report} layout="grid" />
        </div>
      ))}
    </FeaturedCarousel>
  );
}
