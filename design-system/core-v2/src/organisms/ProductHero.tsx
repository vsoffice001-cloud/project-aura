/**
 * ProductHero — Organism (cross-pillar)
 *
 * WHY: Report Store · Surveys · Consulting pillar homes all need same hero pattern w/ pillar-specific content. Reusable template > 3 per-pillar organisms.
 * WHAT: Cinematic-dark hero w/ SectionHeading (label + title + subtitle) · optional search bar · badge row · optional extra children slot.
 * WHEN: Top of any pillar landing page (`/report-store` · `/surveys` · `/consulting`).
 * WHEN NOT: Case-study hero (use HeroSection) · Report PDP hero (use ReportPDPHero · v2 4-tab cockpit) · listing pages (use ListingToolbar).
 * HOW: Slot-based · `label · title · subtitle · searchPlaceholder · showSearch · badges · children`. Always cinematic-dark · `level=1` heading.
 *
 * Structure: SectionWrapper(black) → SectionHeading → optional search → Badge row → optional extra
 */
import type { ReactNode } from 'react';
import { useState } from 'react';
import { Search } from 'lucide-react';
import { SectionWrapper } from '../atoms/SectionWrapper';
import { SectionHeading } from '../atoms/SectionHeading';
import { Badge } from '../atoms/Badge';

export interface ProductHeroProps {
  /** SectionHeading label (e.g. "Report Store", "Surveys") */
  label: string;
  /** SectionHeading title */
  title: string;
  /** SectionHeading subtitle */
  subtitle: string;
  /** Search placeholder text */
  searchPlaceholder?: string;
  /** Whether to show the search bar */
  showSearch?: boolean;
  /** Badge strings shown beneath the search bar */
  badges?: string[];
  /** Optional extra content rendered below badges */
  children?: ReactNode;
  /** className for outer wrapper */
  className?: string;
}

export function ProductHero({
  label,
  title,
  subtitle,
  searchPlaceholder: _searchPlaceholder = 'Search...',
  showSearch = true,
  badges = [],
  children,
  className,
}: ProductHeroProps) {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <SectionWrapper background="black" spacing="xl" maxWidth="wide" className={className}>
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 md:px-8">
        <SectionHeading
          label={label}
          title={title}
          subtitle={subtitle}
          level={1}
          align="left"
          labelPulse
        />

        {showSearch && (
          <div className="mt-8">
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-[5px] transition-all"
              style={{
                backgroundColor: searchFocused ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.06)',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: searchFocused ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.1)',
              }}
            >
              <Search size={18} className="flex-shrink-0" style={{ color: 'rgba(255,255,255,0.4)' }} />
              <input
                type="text"
                placeholder="Search reports, industries, projections..."
                className="flex-1 border-none outline-none"
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'rgba(255,255,255,0.8)',
                  backgroundColor: 'rgba(0,0,0,0)',
                }}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
            </div>
          </div>
        )}

        {badges.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {badges.map((text) => (
              <Badge key={text} variant="rounded" size="sm" theme="neutral" bordered>
                {text}
              </Badge>
            ))}
          </div>
        )}

        {children && <div className="mt-6">{children}</div>}
      </div>
    </SectionWrapper>
  );
}