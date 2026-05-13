/**
 * IndustriesDropdown Component - LFD Implementation
 * 
 * A full-width mega menu dropdown for industries navigation matching the LFD design.
 * 
 * Layout (3 columns):
 * - Column 1: Vertical industry list (left sidebar) - 280px, scrollable with LARGER items
 * - Column 2: Selected industry content (segments + popular tags) - flex-1, 418px content height
 * - Column 3: Quick Access cards (right sidebar) - 260px, auto height
 * 
 * Total dropdown height: 450px (418px content + 32px padding)
 * 
 * Features:
 * - Hover-based selection (no click required)
 * - VerticalNavItem with gradient highlight + shimmer effect (15px text, 12px padding)
 * - SCROLLABLE industry list showing ~5-6 items at a time (forces scroll interaction)
 * - Smart fade gradients (top & bottom) - only visible when content exceeds
 * - Enhanced purple scrollbar for visual feedback
 * - Industry icons from Figma imports
 * - 2-column segment layout
 * - Popular Tags as pill-shaped badges (rounded-full)
 * - Quick Access cards with icons
 * - GradientCTA for "Explore" button
 * - Vertical dividers between columns
 * - Enhanced purple scrollbar with visible position indicator (industries list)
 * - Custom subtle scrollbar (content column)
 * 
 * Design System:
 * - Selected state: Gradient background (black to grey) + shimmer + purple shadow
 * - Industry items: 15px font (larger, more readable), 12px padding (spacious)
 * - Column width: 280px (wider for better readability)
 * - DM Sans font throughout
 * - Purple accents (#806ce0)
 * - Smooth transitions (200ms)
 * - Consistent gaps (32px between columns)
 * - Total height: 450px for balanced, compact viewport experience (desktop & tablet)
 */

import { useState, useRef, useEffect } from 'react';
import { MegaMenuDropdown, QuickAccessCard, IndustryNavItem } from './ui';
import { GradientCTA } from './GradientCTA';
import { industries, type Industry } from '@/data/industries';
import { FileText, BarChart2, Search } from 'lucide-react';

interface IndustriesDropdownProps {
  /** Whether the dropdown is open */
  isOpen: boolean;
  /** Additional CSS classes */
  className?: string;
}

export function IndustriesDropdown({ isOpen, className = '' }: IndustriesDropdownProps) {
  // Default to first industry with segments
  const defaultIndustry = industries.find(ind => ind.segments && ind.segments.length > 0) || industries[0];
  const [activeIndustry, setActiveIndustry] = useState(defaultIndustry.id);

  // Get current industry data
  const currentIndustry = industries.find(ind => ind.id === activeIndustry) || defaultIndustry;

  // Ref for the industries list container
  const industriesListRef = useRef<HTMLDivElement>(null);

  // State to track if fade gradients are needed
  const [showTopFade, setShowTopFade] = useState(false);
  const [showBottomFade, setShowBottomFade] = useState(false);

  // Effect to check scroll position and update fade gradients
  useEffect(() => {
    const currentRef = industriesListRef.current;
    if (currentRef) {
      const handleScroll = () => {
        const scrollTop = currentRef.scrollTop;
        const scrollHeight = currentRef.scrollHeight;
        const clientHeight = currentRef.clientHeight;
        
        // Show top fade if scrolled down more than 10px
        setShowTopFade(scrollTop > 10);
        
        // Show bottom fade if there's more content below (with 10px threshold)
        setShowBottomFade(scrollTop + clientHeight < scrollHeight - 10);
      };

      currentRef.addEventListener('scroll', handleScroll);
      
      // Initial check on mount and when dropdown opens
      // Use setTimeout to ensure DOM is fully rendered
      const timeoutId = setTimeout(() => {
        handleScroll();
      }, 50);

      return () => {
        currentRef.removeEventListener('scroll', handleScroll);
        clearTimeout(timeoutId);
      };
    }
  }, [isOpen]); // Re-run when dropdown opens

  return (
    <MegaMenuDropdown isOpen={isOpen} variant="full-width" className={className}>
      {/* 3-Column Layout with Dividers */}
      <div className="flex gap-[32px]">
        
        {/* Column 1: Industry List (Left Navigation) - Fixed Height with Scroll */}
        <div className="w-[280px] h-[418px] shrink-0 flex flex-col">
          {/* Section Header */}
          <span 
            className="font-nav uppercase mb-[16px]" 
            style={{ 
              fontSize: 'var(--nav-section-header)', 
              lineHeight: 'var(--nav-lh-header)',
              letterSpacing: 'var(--nav-ls-normal)',
              fontVariationSettings: "'opsz' 14",
              fontWeight: 600,
              color: '#999999'
            }}
          >
            By Industry
          </span>
          
          {/* Scrollable Industry List with Fade Indicators */}
          <div className="relative flex-1 overflow-hidden">
            {/* Top Fade Indicator - Shows more content above */}
            {showTopFade && (
              <div className="absolute top-0 left-0 right-0 h-[100px] bg-gradient-to-b from-white via-white/70 via-white/40 to-transparent pointer-events-none transition-opacity duration-300 z-10" />
            )}

            <div 
              ref={industriesListRef}
              className="h-full overflow-y-auto custom-scrollbar space-y-[6px] px-[4px]"
            >
              {industries.map((industry) => (
                <IndustryNavItem
                  key={industry.id}
                  icon={industry.icon}
                  label={industry.label}
                  isSelected={activeIndustry === industry.id}
                  onMouseEnter={() => setActiveIndustry(industry.id)}
                />
              ))}
            </div>

            {/* Bottom Fade Indicator - Shows more content below */}
            {showBottomFade && (
              <div className="absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-t from-white via-white/70 via-white/40 to-transparent pointer-events-none transition-opacity duration-300 z-10" />
            )}
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="bg-[#e6e6e6] w-px h-[418px] shrink-0" />

        {/* Column 2: Selected Industry Content (Middle) - Fixed Height with Scroll */}
        <div className="flex-1 min-w-0 h-[418px] overflow-y-auto custom-scrollbar pr-[16px]">
          {/* Industry Header with segment count */}
          <div className="flex items-center justify-between mb-[20px]">
            <h3 className="font-nav text-[16px] leading-[19.2px] font-semibold text-[#141016]">
              {currentIndustry.label}
            </h3>
            {currentIndustry.segments && currentIndustry.segments.length > 0 && (
              <span className="font-nav text-[12px] leading-[14.4px] font-normal text-[#656565]">
                {currentIndustry.segments.length} segments
              </span>
            )}
          </div>

          {/* Segments Grid (2 columns) */}
          {currentIndustry.segments && currentIndustry.segments.length > 0 ? (
            <>
              <div className="grid grid-cols-2 gap-x-[32px] gap-y-[12px] mb-[24px]">
                {currentIndustry.segments.map((segment, index) => (
                  <a
                    key={index}
                    href={segment.href}
                    className="font-nav text-[13px] leading-[15.6px] font-normal text-[#656565] hover:text-[#b01f24] transition-colors duration-200"
                    style={{ fontVariationSettings: "'opsz' 9" }}
                  >
                    {segment.name}
                  </a>
                ))}
              </div>

              {/* Popular Tags Header */}
              <div className="pt-[20px] border-t border-[rgba(20,16,22,0.1)]">
                <h4 
                  className="font-nav uppercase mb-[12px]"
                  style={{ 
                    fontSize: 'var(--nav-section-header)',
                    lineHeight: 'var(--nav-lh-header)',
                    letterSpacing: 'var(--nav-ls-normal)',
                    fontVariationSettings: "'opsz' 14",
                    fontWeight: 600,
                    color: '#999999'
                  }}
                >
                  POPULAR TAGS
                </h4>

                {/* Popular Tags - Pill-shaped Badges */}
                {currentIndustry.popularTopics && currentIndustry.popularTopics.length > 0 && (
                  <div className="flex flex-wrap gap-[8px] mb-[20px]">
                    {currentIndustry.popularTopics.map((topic, index) => (
                      <span
                        key={index}
                        className="px-[var(--tag-padding-x)] py-[var(--tag-padding-y)] bg-[var(--color-bg-light)] rounded-[var(--tag-radius)] border border-[rgba(20,16,22,0.1)] font-nav font-normal text-[var(--color-secondary-grey)] hover:text-[var(--color-red)] hover:bg-white hover:border-[var(--color-red)] hover:shadow-[var(--tag-shadow-hover)] transition-all duration-[var(--tag-transition)] cursor-pointer"
                        style={{ 
                          fontSize: 'var(--tag-font-size)',        /* 12px from design system */
                          lineHeight: 'var(--nav-lh-helper)',       /* 1.33 = 16px at 12px */
                          fontVariationSettings: "'opsz' 9" 
                        }}
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                )}

                {/* Explore CTA */}
                <GradientCTA 
                  text={`Explore ${currentIndustry.ctaText || currentIndustry.label}`}
                  href={`/industries/${currentIndustry.id}`}
                  size="lg"
                />
              </div>
            </>
          ) : (
            /* Fallback for industries without segments */
            <div className="py-[40px] text-center">
              <p className="font-nav text-[14px] leading-[20px] font-normal text-[#656565] mb-[16px]">
                Explore insights and research for {currentIndustry.label}
              </p>
              <GradientCTA 
                text={`Explore ${currentIndustry.ctaText || currentIndustry.label}`}
                href={`/industries/${currentIndustry.id}`}
              />
            </div>
          )}
        </div>

        {/* Vertical Divider */}
        <div className="bg-[#e6e6e6] w-px self-stretch shrink-0" />

        {/* Column 3: Quick Access (Right) - Fixed Height */}
        <div className="w-[260px] flex-shrink-0">
          {/* Section Header */}
          <div className="mb-[16px]">
            <span 
              className="font-nav uppercase"
              style={{ 
                fontSize: 'var(--nav-section-header)',
                lineHeight: 'var(--nav-lh-header)',
                letterSpacing: 'var(--nav-ls-normal)',
                fontVariationSettings: "'opsz' 14",
                fontWeight: 600,
                color: '#999999'
              }}
            >
              Quick Access
            </span>
          </div>

          {/* Quick Access Cards */}
          <div className="flex flex-col gap-[12px] p-[4px] -m-[4px]">
            {/* Industry Reports Card */}
            <QuickAccessCard 
              href="/industries/reports" 
              icon={<FileText className="size-[18px] text-[#141016]" strokeWidth={1.5} />}
              title="Industry Reports"
              description="All reports"
            />

            {/* Benchmarking Card */}
            <QuickAccessCard 
              href="/industries/benchmarking" 
              icon={<BarChart2 className="size-[18px] text-[#141016]" strokeWidth={1.5} />}
              title="Benchmarking"
              description="Competition Benchmarking"
            />

            {/* Insights Card */}
            <QuickAccessCard 
              href="/industries/insights" 
              icon={<Search className="size-[18px] text-[#141016]" strokeWidth={1.5} />}
              title="Insights"
              description="Industry insights"
            />
          </div>
        </div>

      </div>
    </MegaMenuDropdown>
  );
}