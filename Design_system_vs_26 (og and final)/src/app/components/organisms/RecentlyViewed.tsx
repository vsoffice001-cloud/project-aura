/**
 * RecentlyViewed — Organism (DS v4.3)
 *
 * WHAT: Recently viewed reports horizontal scroll row.
 * WHY:  Personalization — lets users quickly revisit reports they've viewed.
 * WHEN: Report Store home page, below hero or featured sections.
 * HOW:  SectionWrapper(white) + HorizontalScroll + compact ReportCard thumbnails.
 *
 * COLOR SYSTEM: Pure monochromatic black/opacity.
 */
import { SectionWrapper } from '@/app/components/SectionWrapper';
import { SectionHeading } from '@/app/components/SectionHeading';
import { CTALink } from '@/app/components/CTALink';
import { HorizontalScroll } from '@/app/components/molecules/HorizontalScroll';
import { ReportCard } from '@/app/components/molecules/ReportCard';
import { FEATURED_REPORTS } from '@/app/components/data';

export function RecentlyViewed() {
  // Use first 4 featured reports as "recently viewed" mock data
  const recentReports = FEATURED_REPORTS.slice(0, 4);

  return (
    <SectionWrapper background="white" spacing="md" maxWidth="wide">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 md:px-8">
        <SectionHeading
          label="Your Activity"
          title="Recently Viewed"
          subtitle="Pick up where you left off"
          endSlot={<CTALink href="#">View history</CTALink>}
        />
        <div className="mt-6">
          <HorizontalScroll>
            {recentReports.map((report) => (
              <div key={report.id} className="flex-shrink-0" style={{ width: '240px' }}>
                <ReportCard {...report} layout="grid" />
              </div>
            ))}
          </HorizontalScroll>
        </div>
      </div>
    </SectionWrapper>
  );
}