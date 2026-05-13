/**
 * AnalystPicks — Organism (DS v4.3)
 *
 * WHAT: Analyst picks section for the Report Store home page.
 * WHY:  Wraps SectionWrapper + SectionHeading + AnalystPickCardB grid.
 * WHEN: Section 6 of ReportStorePage (Home mode).
 */
import { SectionWrapper } from '@/app/components/SectionWrapper';
import { SectionHeading } from '@/app/components/SectionHeading';
import { AnalystPickCardB } from '@/app/components/molecules/AnalystPickCardB';
import { ANALYST_PICKS } from '@/app/components/data';

export function AnalystPicks() {
  return (
    <SectionWrapper background="warm" spacing="lg" maxWidth="wide">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 md:px-8">
        <SectionHeading
          label="Expert Insights"
          title="Analyst Picks"
          subtitle="Hand-selected reports from our senior research team"
        />
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {ANALYST_PICKS.map((pick) => (
            <AnalystPickCardB key={pick.id} {...pick} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
