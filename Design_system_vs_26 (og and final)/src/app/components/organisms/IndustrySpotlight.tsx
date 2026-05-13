/**
 * IndustrySpotlight — Organism (DS v4.3)
 *
 * WHAT: Featured industry deep-dive section with key stats and featured report.
 * WHY:  Highlights a specific industry vertical with contextual data,
 *       driving deeper engagement with sector-specific content.
 * WHEN: Report Store home page, mid-page discovery section.
 * HOW:  SectionWrapper(white) + split layout (stats left, report card right).
 *
 * COLOR SYSTEM: Pure monochromatic black/opacity.
 */
import { TrendingUp, BarChart3, Users, FileText } from 'lucide-react';
import { SectionWrapper } from '@/app/components/SectionWrapper';
import { SectionHeading } from '@/app/components/SectionHeading';
import { IconBadge } from '@/app/components/IconBadge';
import { ReportCard } from '@/app/components/molecules/ReportCard';
import { FEATURED_REPORTS } from '@/app/components/data';

const SPOTLIGHT_STATS = [
  { icon: BarChart3, label: 'Market Size', value: '$487B', sublabel: 'by 2032' },
  { icon: TrendingUp, label: 'CAGR', value: '29.4%', sublabel: '2026-2032' },
  { icon: FileText, label: 'Reports', value: '234', sublabel: 'published' },
  { icon: Users, label: 'Analysts', value: '18', sublabel: 'covering sector' },
];

export function IndustrySpotlight() {
  const spotlightReport = FEATURED_REPORTS[0];

  return (
    <SectionWrapper background="white" spacing="lg" maxWidth="wide">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 md:px-8">
        <SectionHeading
          label="Spotlight"
          title="Industry Deep Dive: Technology"
          subtitle="Our most active research vertical with 234 published reports"
        />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {SPOTLIGHT_STATS.map((stat) => (
              <div
                key={stat.label}
                className="p-4"
                style={{
                  borderRadius: 'var(--radius-element)',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: 'rgba(0,0,0,0.06)',
                }}
              >
                <IconBadge icon={stat.icon} size="sm" className="mb-3" />
                <p style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.4)' }}>
                  {stat.label}
                </p>
                <p
                  className="mt-1 tabular-nums"
                  style={{ fontSize: 'var(--text-xl)', color: 'rgba(0,0,0,0.9)' }}
                >
                  {stat.value}
                </p>
                <p style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.3)', marginTop: '2px' }}>
                  {stat.sublabel}
                </p>
              </div>
            ))}
          </div>

          {/* Featured report */}
          <div>
            <ReportCard
              {...spotlightReport}
              layout="grid"
              description="Complete TAM analysis of AI-optimized chips including GPUs, TPUs, and custom ASICs across cloud and edge deployments."
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
