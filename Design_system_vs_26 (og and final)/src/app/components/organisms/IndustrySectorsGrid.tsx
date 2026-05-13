/**
 * IndustrySectorsGrid — Organism (DS v4.3)
 *
 * WHAT: Industry coverage grid for the Report Store home page.
 * WHY:  Shows all 14 FULL_INDUSTRIES in two side-by-side cards (7 + 7),
 *        each row = [icon-badge] [label] [count] [hover arrow].
 * WHEN: Section 8 of ReportStorePage (Home mode).
 *
 * COMPOSITES:
 *   SectionWrapper → SectionHeading + 2-column card grid
 *   Each card is a borderless container of CategoryListItem-style rows.
 *
 * COLOR SYSTEM: Pure monochromatic black/opacity + periwinkle icon tint.
 * ROW DIVIDERS: border-bottom via var(--warm-500), last row none.
 */
import { SectionWrapper } from '@/app/components/SectionWrapper';
import { SectionHeading } from '@/app/components/SectionHeading';
import { FULL_INDUSTRIES } from '@/app/components/data';
import { getIndustryIcon } from '@/app/components/industryIconMap';
import { iconColors } from '@/app/components/iconColors';
import { ArrowRight } from 'lucide-react';

interface IndustrySectorsGridProps {
  onSectorClick?: (sector: string) => void;
}

export function IndustrySectorsGrid({ onSectorClick }: IndustrySectorsGridProps) {
  // Split 14 industries into two balanced columns (7 + 7)
  const midpoint = Math.ceil(FULL_INDUSTRIES.length / 2);
  const leftColumn = FULL_INDUSTRIES.slice(0, midpoint);
  const rightColumn = FULL_INDUSTRIES.slice(midpoint);

  return (
    <SectionWrapper background="white" spacing="lg" maxWidth="content">
      <SectionHeading
        label="Coverage"
        title="Industry Coverage"
        subtitle={`Explore ${FULL_INDUSTRIES.length} industry verticals`}
      />
      <div className="mt-8 grid sm:grid-cols-2 gap-0 sm:gap-5">
        <IndustryColumn
          items={leftColumn}
          onItemClick={onSectorClick}
        />
        <IndustryColumn
          items={rightColumn}
          onItemClick={onSectorClick}
          className="mt-3 sm:mt-0"
        />
      </div>
    </SectionWrapper>
  );
}

/* ── Column card container ── */

interface IndustryColumnProps {
  items: typeof FULL_INDUSTRIES;
  onItemClick?: (label: string) => void;
  className?: string;
}

function IndustryColumn({ items, onItemClick, className = '' }: IndustryColumnProps) {
  return (
    <div
      className={`overflow-hidden ${className}`}
      style={{
        background: 'rgb(255, 255, 255)',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'rgba(0, 0, 0, 0.06)',
        borderRadius: 'var(--rc-radius-card)',
        boxShadow: 'rgba(0, 0, 0, 0.04) 0px 1px 3px, rgba(0, 0, 0, 0.02) 0px 1px 2px',
      }}
    >
      {items.map((industry, idx) => {
        const Icon = getIndustryIcon(industry.label);
        const isLast = idx === items.length - 1;

        return (
          <div
            key={industry.label}
            role="button"
            tabIndex={0}
            className="group flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors hover:bg-black/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-inset"
            aria-label={`${industry.label}, ${industry.count.toLocaleString()}`}
            style={{
              borderBottomWidth: isLast ? '0' : '1px',
              borderBottomStyle: 'solid',
              borderBottomColor: isLast ? 'transparent' : 'var(--warm-500)',
            }}
            onClick={() => onItemClick?.(industry.label)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onItemClick?.(industry.label);
              }
            }}
          >
            {/* Icon badge */}
            <div
              className="w-7 h-7 flex-shrink-0 flex items-center justify-center"
              aria-hidden="true"
              style={{
                borderRadius: 'var(--radius-element)',
                backgroundColor: 'rgba(128, 108, 224, 0.05)',
              }}
            >
              <Icon className="w-3.5 h-3.5" color={iconColors.content} />
            </div>

            {/* Label */}
            <span
              className="flex-1 min-w-0 text-black/70 group-hover:text-black transition-colors truncate"
              style={{
                fontSize: 'var(--text-xs)',
              }}
            >
              {industry.label}
            </span>

            {/* Count */}
            <span style={{ display: 'inline-flex', position: 'relative' }}>
              <span
                className="flex-shrink-0 tabular-nums text-black/35"
                style={{
                  fontSize: 'var(--text-xs)',
                }}
              >
                {industry.count.toLocaleString()}
              </span>
            </span>

            {/* Hover arrow */}
            <ArrowRight
              className="h-3 w-3 flex-shrink-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
              color={iconColors.utility}
            />
          </div>
        );
      })}
    </div>
  );
}