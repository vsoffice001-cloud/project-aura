/**
 * ConsultingDropdown Component
 * 
 * A full-width mega menu dropdown for consulting services navigation.
 * Based on Excel structure with vertical navigation sidebar.
 * 
 * Features:
 * - Left sidebar: Vertical category navigation (CAPABILITIES)
 * - Main content: Selected category details (Strategy Consulting / Deals & IPO Advisory)
 * - Publications section
 * - Get in Touch section with CTA cards
 * 
 * Layout Strategy:
 * - Column 1 (15%): Vertical navigation sidebar (200px)
 * - Column 2 (30%): Main content with consulting services (280px)
 * - Column 3 (20%): Publications links (200px)
 * - Column 4 (35%): Get in Touch + Featured (358px)
 * 
 * Components Used:
 * - MegaMenuDropdown (wrapper)
 * - BrowseNavItem (sidebar navigation)
 * - DropdownSection (content sections)
 * - DropdownItem (menu links)
 * - QuickAccessCard (CTA cards)
 * - FeaturedReportCard (case study)
 */

import { useState } from 'react';
import { MegaMenuDropdown, DropdownSection, DropdownItem, BrowseNavItem, QuickAccessCard } from './ui';
import { FeaturedReportCard } from './FeaturedReportCard';
import { GradientCTA } from './GradientCTA';
import { MessageSquare, FileText } from 'lucide-react';

interface ConsultingDropdownProps {
  /** Whether the dropdown is open */
  isOpen: boolean;
  /** Additional CSS classes */
  className?: string;
}

export function ConsultingDropdown({ isOpen, className = '' }: ConsultingDropdownProps) {
  const [activeCategory, setActiveCategory] = useState('strategy-consulting');

  // Consulting capabilities categories
  const capabilities = [
    {
      id: 'strategy-consulting',
      label: 'Strategy Consulting',
    },
    {
      id: 'deals-ipo-advisory',
      label: 'Deals & IPO Advisory',
    },
  ];

  // Content for each category
  const categoryContent: Record<string, { title: string; services: { name: string; url: string }[] }> = {
    'strategy-consulting': {
      title: 'Strategy Consulting',
      services: [
        { name: 'Market Entry', url: '/consulting/strategy/market-entry' },
        { name: 'Market Penetration', url: '/consulting/strategy/market-penetration' },
        { name: 'Product Strategy', url: '/consulting/strategy/product-strategy' },
        { name: 'Startup Acceleration Strategy', url: '/consulting/strategy/startup-acceleration' },
      ],
    },
    'deals-ipo-advisory': {
      title: 'Deals & IPO Advisory',
      services: [
        { name: 'IPO Advisory', url: '/consulting/deals/ipo-advisory' },
        { name: 'Deal Sourcing', url: '/consulting/deals/deal-sourcing' },
        { name: 'Due Diligence', url: '/consulting/deals/due-diligence' },
        { name: 'Investor Relations', url: '/consulting/deals/investor-relations' },
      ],
    },
  };

  // Publications list
  const publications = [
    { label: 'Client Impact', href: '/publications/client-impact' },
    { label: 'Deal Spotlight', href: '/publications/deal-spotlight' },
    { label: 'Articles', href: '/publications/articles' },
    { label: 'Perspective', href: '/publications/perspective' },
  ];

  const currentContent = categoryContent[activeCategory];

  return (
    <MegaMenuDropdown isOpen={isOpen} variant="full-width" className={className}>
      {/* 4-Column Layout */}
      <div className="flex gap-[32px]">
        
        {/* Column 1: Capabilities Sidebar */}
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
              Capabilities
            </span>
          </div>
          <div className="flex flex-col gap-[4px]">
            {capabilities.map((capability) => (
              <BrowseNavItem
                key={capability.id}
                label={capability.label}
                isSelected={activeCategory === capability.id}
                onMouseEnter={() => setActiveCategory(capability.id)}
              />
            ))}
          </div>

          {/* All Services Link */}
          <div className="mt-[16px]">
            <GradientCTA 
              text="All Services" 
              href="/consulting/all"
            />
          </div>
        </div>

        {/* Column 2: Main Content - Selected Category */}
        <div className="w-[280px] pl-[32px] border-l border-[rgba(20,16,22,0.1)]">
          <DropdownSection 
            title={currentContent.title}
            gap="gap-[8px]"
          >
            {currentContent.services.map((service, index) => (
              <DropdownItem
                key={index}
                label={service.name}
                href={service.url}
                variant="text-only"
              />
            ))}
          </DropdownSection>
        </div>

        {/* Column 3: Publications + Get in Touch */}
        <div className="w-[200px] flex flex-col gap-[24px] pl-[32px] border-l border-[rgba(20,16,22,0.1)]">
          {/* Publications Section */}
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

          {/* Get in Touch Section */}
          <DropdownSection 
            title="Get in Touch"
            gap="gap-[8px]"
          >
            <DropdownItem
              label="Talk to Consultant"
              href="/contact/analyst"
              variant="text-only"
            />
          </DropdownSection>
        </div>

        {/* Column 4: Featured */}
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

          {/* Featured Case Study Card */}
          <div className="mb-[4px]">
            <FeaturedReportCard 
              resourceType="CASE STUDY"
              title="Strategic Market Entry"
              description="How we helped a Fortune 500 enter emerging markets"
              ctaText="Read more"
              href="/consulting/case-study-market-entry"
            />
          </div>

          {/* Request on Demand - Simple Link */}
          <a 
            href="/contact/request" 
            className="font-nav font-normal text-[#656565] hover:text-black transition-colors underline"
            style={{ fontSize: 'var(--nav-helper-text)', lineHeight: 'var(--nav-lh-helper)' }}
          >
            Request on Demand
          </a>

        </div>

      </div>
    </MegaMenuDropdown>
  );
}