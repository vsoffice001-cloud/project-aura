/**
 * DailyDataHighlights — Organism (DS v4.3)
 *
 * WHAT: Daily data highlights section for the Report Store home page.
 * WHY:  Wraps SectionWrapper + SectionHeading + DataHighlightCard grid.
 * WHEN: Section 5 of ReportStorePage (Home mode).
 */
import { SectionWrapper } from '@/app/components/SectionWrapper';
import { SectionHeading } from '@/app/components/SectionHeading';
import { CTALink } from '@/app/components/CTALink';
import { DataHighlightCard } from '@/app/components/molecules/DataHighlightCard';
import { DATA_HIGHLIGHTS } from '@/app/components/data';

export function DailyDataHighlights() {
  return (
    <SectionWrapper background="white" spacing="lg" maxWidth="wide" className="border-t border-black/6">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 md:px-8">
        <SectionHeading
          label="Data Points"
          title="Daily Highlights"
          subtitle="The latest data points shaping market narratives"
          endSlot={<CTALink href="#">See all data</CTALink>}
        />
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DATA_HIGHLIGHTS.map((d, idx) => (
            <DataHighlightCard key={idx} {...d} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
