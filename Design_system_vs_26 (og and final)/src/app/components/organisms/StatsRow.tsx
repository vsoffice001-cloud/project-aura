/**
 * StatsRow — Organism (cross-pillar)
 *
 * Reusable stat card row section for Product pages.
 * Renders a SectionHeading + responsive grid of StatCard components.
 *
 * Structure: SectionWrapper(warm) → SectionHeading → StatCard grid
 */
import type { ReactNode } from 'react';
import { SectionWrapper } from '@/app/components/SectionWrapper';
import { SectionHeading } from '@/app/components/SectionHeading';
import { StatCard } from '@/app/components/molecules';

export interface StatItem {
  category: string;
  value: string;
  label: string;
  description: string;
  growth?: string;
  metric?: string;
}

export interface StatsRowProps {
  /** SectionHeading label */
  label: string;
  /** SectionHeading title */
  title: string;
  /** SectionHeading subtitle */
  subtitle?: string;
  /** Array of stat data to render as StatCards */
  stats: StatItem[];
  /** Background color variant */
  background?: 'white' | 'warm' | 'black';
  /** Number of grid columns at large breakpoint */
  columns?: 2 | 3 | 4;
  /** Optional extra content rendered below the grid */
  children?: ReactNode;
  /** className for outer wrapper */
  className?: string;
}

export function StatsRow({
  label,
  title,
  subtitle,
  stats,
  background = 'warm',
  columns = 4,
  children,
  className,
}: StatsRowProps) {
  const colClass =
    columns === 2
      ? 'grid-cols-1 sm:grid-cols-2'
      : columns === 3
      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';

  return (
    <SectionWrapper background={background} spacing="lg" maxWidth="wide" className={className}>
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 md:px-8">
        <SectionHeading
          label={label}
          title={title}
          subtitle={subtitle}
        />
        <div className={`mt-8 grid ${colClass} gap-4`}>
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
        {children && <div className="mt-8">{children}</div>}
      </div>
    </SectionWrapper>
  );
}
