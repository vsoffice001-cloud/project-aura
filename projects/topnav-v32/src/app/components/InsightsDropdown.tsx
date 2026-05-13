/**
 * InsightsDropdown Component
 * 
 * A full-width mega menu dropdown for insights navigation.
 * Based on Excel structure with vertical navigation sidebar.
 * 
 * Features:
 * - Left sidebar: Browse navigation (By Industry / By Region / Featured)
 * - Main content: Dynamic content based on selection with fade gradients
 * - Publications section: Articles, Impact Stories, Perspective, Blogs
 * - Featured panel: Latest featured content with FeaturedReportCard
 * - Scrollable industry list (14 items) with fade indicators
 * 
 * Layout Strategy:
 * - Column 1 (15%): Browse sidebar navigation (200px)
 * - Column 2 (30%): Dynamic content based on selection (280px) - matches Featured height
 * - Column 3 (20%): Publications links (200px)
 * - Column 4 (35%): Featured panel (358px)
 * 
 * Components Used:
 * - MegaMenuDropdown (wrapper)
 * - BrowseNavItem (sidebar navigation)
 * - DropdownSection (content sections)
 * - DropdownItem (menu links)
 * - FeaturedReportCard (featured content)
 * - GradientCTA (All insights link)
 */

import { useState, useRef, useEffect } from 'react';
import { MegaMenuDropdown, DropdownSection, DropdownItem, BrowseNavItem } from './ui';
import { FeaturedReportCard } from './FeaturedReportCard';
import { GradientCTA } from './GradientCTA';

interface InsightsDropdownProps {
  /** Whether the dropdown is open */
  isOpen: boolean;
  /** Additional CSS classes */
  className?: string;
}

export function InsightsDropdown({ isOpen, className = '' }: InsightsDropdownProps) {
  const [activeCategory, setActiveCategory] = useState('by-industry');

  // Browse categories
  const browseCategories = [
    {
      id: 'by-industry',
      label: 'By Industry',
    },
    {
      id: 'by-region',
      label: 'By Region',
    },
    {
      id: 'featured',
      label: 'Featured',
    },
  ];

  // Content for each category
  const categoryContent: Record<string, { title: string; items: { name: string; url: string }[] }> = {
    'by-industry': {
      title: 'By Industry',
      items: [
        { name: 'Agriculture & Animal Care', url: '/insights/industry/agriculture' },
        { name: 'Automotive, Transportation & Warehousing', url: '/insights/industry/automotive' },
        { name: 'BFSI', url: '/insights/industry/banking' },
        { name: 'Consumer Products & Retail', url: '/insights/industry/consumer-products' },
        { name: 'Defense & Security', url: '/insights/industry/defense' },
        { name: 'Education & Recruitment', url: '/insights/industry/education' },
        { name: 'Energy & Utilities', url: '/insights/industry/energy' },
        { name: 'Food, Beverage & Tobacco', url: '/insights/industry/food-beverage' },
        { name: 'Healthcare', url: '/insights/industry/healthcare' },
        { name: 'Hospitality & Tourism', url: '/insights/industry/hospitality' },
        { name: 'Manufacturing & Construction', url: '/insights/industry/manufacturing' },
        { name: 'Media & Entertainment', url: '/insights/industry/media' },
        { name: 'Real Estate & Construction', url: '/insights/industry/real-estate' },
        { name: 'Technology & Telecom', url: '/insights/industry/technology' },
      ],
    },
    'by-region': {
      title: 'By Region',
      items: [
        { name: 'North America', url: '/insights/region/north-america' },
        { name: 'Europe', url: '/insights/region/europe' },
        { name: 'Asia Pacific', url: '/insights/region/asia-pacific' },
        { name: 'Latin America', url: '/insights/region/latin-america' },
        { name: 'Middle East & Africa', url: '/insights/region/middle-east-africa' },
      ],
    },
    'featured': {
      title: 'Featured',
      items: [
        { name: 'Latest Insights', url: '/insights/featured/latest' },
        { name: 'Trending Now', url: '/insights/featured/trending' },
        { name: 'Editor\'s Pick', url: '/insights/featured/editors-pick' },
        { name: 'Most Popular', url: '/insights/featured/most-popular' },
      ],
    },
  };

  // Publications list
  const publications = [
    { label: 'Articles', href: '/insights/publications/articles' },
    { label: 'Impact Stories', href: '/insights/publications/impact-stories' },
    { label: 'Perspective', href: '/insights/publications/perspective' },
    { label: 'Blogs', href: '/insights/publications/blogs' },
  ];

  const currentContent = categoryContent[activeCategory];

  // Ref for the industry list container
  const insightsListRef = useRef<HTMLDivElement>(null);

  // State to track if fade gradients are needed
  const [showTopFade, setShowTopFade] = useState(false);
  const [showBottomFade, setShowBottomFade] = useState(false);

  // Effect to check scroll position and update fade gradients
  useEffect(() => {
    const currentRef = insightsListRef.current;
    if (currentRef && activeCategory === 'by-industry') {
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
      handleScroll();

      return () => {
        currentRef.removeEventListener('scroll', handleScroll);
      };
    } else {
      // Reset fade states when not on by-industry
      setShowTopFade(false);
      setShowBottomFade(false);
    }
  }, [isOpen, activeCategory]); // Re-run when dropdown opens or category changes

  return (
    <MegaMenuDropdown isOpen={isOpen} variant="full-width" className={className}>
      {/* 4-Column Layout */}
      <div className="flex gap-[32px]">
        
        {/* Column 1: Browse Sidebar */}
        <div className="w-[200px] flex-shrink-0">
          <div className="mb-[12px]">
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
              Browse
            </span>
          </div>
          <div className="flex flex-col gap-[4px]">
            {browseCategories.map((category) => (
              <BrowseNavItem
                key={category.id}
                label={category.label}
                isSelected={activeCategory === category.id}
                onMouseEnter={() => setActiveCategory(category.id)}
              />
            ))}
          </div>
        </div>

        {/* Column 2: Main Content - Based on Selection */}
        <div className="w-[280px] pl-[32px] border-l border-[rgba(20,16,22,0.1)]">
          {/* Section Header */}
          <div className="mb-[12px]">
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
              {currentContent.title}
            </span>
          </div>

          {/* Scrollable Insights List with Fade Indicators */}
          <div className="relative flex-1">
            {/* Top Fade Indicator - Shows more content above */}
            {showTopFade && (
              <div className="absolute top-0 left-0 right-0 h-[100px] bg-gradient-to-b from-white via-white/70 via-white/40 to-transparent pointer-events-none transition-opacity duration-300 z-10" />
            )}

            <div 
              ref={insightsListRef}
              className="max-h-[350px] overflow-y-auto custom-scrollbar space-y-[2px] px-[8px]"
            >
              {currentContent.items.map((item, index) => (
                <DropdownItem
                  key={index}
                  label={item.name}
                  href={item.url}
                  variant="text-only"
                />
              ))}
            </div>

            {/* Bottom Fade Indicator - Shows more content below */}
            {showBottomFade && (
              <div className="absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-t from-white via-white/70 via-white/40 to-transparent pointer-events-none transition-opacity duration-300 z-10" />
            )}

            {/* Show "View All Featured Insights" link when Featured is selected */}
            {activeCategory === 'featured' && (
              <div className="mt-[16px]">
                <GradientCTA 
                  text="View All Featured Insights" 
                  href="/insights/featured/all"
                />
              </div>
            )}
          </div>
        </div>

        {/* Column 3: Publications */}
        <div className="w-[200px] pl-[32px] border-l border-[rgba(20,16,22,0.1)]">
          <DropdownSection 
            title="Publications"
            gap="gap-[8px]"
          >
            {publications.map((pub, index) => (
              <DropdownItem
                key={index}
                label={pub.label}
                href={pub.href}
                variant="text-only"
              />
            ))}
          </DropdownSection>
        </div>

        {/* Column 4: Featured - Same as before */}
        <div className="w-[358px] flex-shrink-0 flex flex-col gap-[16px] pl-[32px] border-l border-[rgba(20,16,22,0.1)]">
          {/* Section Header */}
          <div className="mb-[4px]">
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
            Featured
          </span>
          </div>

          {/* Featured Report Card */}
          <div className="mb-[4px]">
            <FeaturedReportCard 
              resourceType="LATEST"
              title="2024 Global Market Outlook"
              description="Key trends shaping industries worldwide"
              ctaText="Read more"
              href="/insights/2024-global-market-outlook"
            />
          </div>

          {/* All Insights Link */}
          <div className="mb-[4px]">
            <GradientCTA 
              text="All insights" 
              href="/insights/all"
            />
          </div>

          {/* Subscribe to Updates - Simple Link */}
          <a 
            href="/subscribe" 
            className="font-nav font-normal text-[#656565] hover:text-black transition-colors underline"
            style={{ fontSize: 'var(--nav-helper-text)', lineHeight: 'var(--nav-lh-helper)' }}
          >
            Subscribe to Updates
          </a>

        </div>

      </div>
    </MegaMenuDropdown>
  );
}