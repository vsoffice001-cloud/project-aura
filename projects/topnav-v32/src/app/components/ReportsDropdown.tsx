/**
 * ReportsDropdown Component - Modern Clean Aesthetic
 * 
 * A full-width mega menu dropdown for reports navigation with subtle, elegant design.
 * 
 * Layout (4 columns):
 * - Column 1: Browse navigation (left sidebar) - 220px, clean white background
 * - Column 2: Report Types section with SOFT COLORED ICONS - flex-1
 * - Column 3: Benchmarking section with clean styling + CTA - flex-1
 * - Column 4: Get in Touch + Featured card with subtle design - 280px
 * 
 * Content Structure:
 * - Browse: All Reports, By Industry, By Region, Latest Releases
 * - Report Types: Industry Reports, Global Reports, Regional Reports, Competition Benchmarking
 * - Benchmarking: By Industry, By Region, Our Methodology + "Request study" CTA
 * - Get in Touch: Request On Demand, Talk to Analyst + Featured "10 Lac+ Reports" card
 * 
 * Features:
 * - Browse vertical navigation with minimal hover states
 * - Report types with SOFT PASTEL icon backgrounds (non-prominent)
 * - Better spacing and visual hierarchy
 * - Featured stats card with clean gray background and red CTA link
 * - Vertical dividers between columns
 * - Smooth, minimal hover animations
 * 
 * Design Philosophy:
 * - Modern, clean, breathable
 * - Soft pastel accents (blues, greens, oranges - NOT prominent)
 * - Subtle shadows for depth
 * - Better typography hierarchy
 * - Minimal color usage
 * - Professional and elegant
 */

import { MegaMenuDropdown } from './ui';
import { DropdownItem, DropdownSection } from './ui';
import { GradientCTA } from './GradientCTA';
import { StatsCard } from './StatsCard';
import { FileText, Building2, MapPin, Globe, Search } from 'lucide-react';

interface ReportsDropdownProps {
  /** Whether the dropdown is open */
  isOpen: boolean;
  /** Additional CSS classes */
  className?: string;
}

export function ReportsDropdown({ isOpen, className = '' }: ReportsDropdownProps) {
  return (
    <MegaMenuDropdown isOpen={isOpen} variant="full-width" className={className}>
      {/* 4-Column Layout with Dividers - Responsive for tablet */}
      <div className="flex flex-wrap lg:flex-nowrap gap-[24px] lg:gap-[32px]">
        
        {/* Column 1: Browse Sidebar (Left) - Clean White Background */}
        <div className="w-full lg:w-[220px] flex-shrink-0 bg-white rounded-[10px] p-[16px] lg:-my-[16px] lg:-ml-[16px]">
          {/* Search Bar */}
          <div className="relative mb-[20px]">
            <Search className="absolute left-[12px] top-1/2 -translate-y-1/2 size-[14px] text-[#656565]" strokeWidth={2} />
            <input
              type="text"
              placeholder="Search reports..."
              className="w-full pl-[36px] pr-[32px] py-[8px] bg-white rounded-[8px] border border-[rgba(20,16,22,0.1)] font-nav text-[13px] text-[#141016] placeholder:text-[#999999] focus:outline-none focus:ring-1 focus:ring-[#806ce0] transition-all duration-200"
            />
            <span className="absolute right-[12px] top-1/2 -translate-y-1/2 font-nav text-[11px] text-[#999999] font-medium">
              /
            </span>
          </div>
          
          {/* Browse Section */}
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
              Quick Links
            </span>
          </div>
          
          {/* Browse Links */}
          <div className="flex flex-col gap-[4px]">
            <a
              href="/reports"
              className="px-[12px] py-[8px] rounded-[8px] font-nav text-[13px] leading-[15.6px] font-normal text-[#656565] hover:text-[#b01f24] transition-colors duration-200"
              style={{ fontVariationSettings: "'opsz' 9" }}
            >
              All Reports
            </a>
            <a
              href="/reports/by-industry"
              className="px-[12px] py-[8px] rounded-[8px] font-nav text-[13px] leading-[15.6px] font-normal text-[#656565] hover:text-[#b01f24] transition-colors duration-200"
              style={{ fontVariationSettings: "'opsz' 9" }}
            >
              By Industry
            </a>
            <a
              href="/reports/by-region"
              className="px-[12px] py-[8px] rounded-[8px] font-nav text-[13px] leading-[15.6px] font-normal text-[#656565] hover:text-[#b01f24] transition-colors duration-200"
              style={{ fontVariationSettings: "'opsz' 9" }}
            >
              By Region
            </a>
            <a
              href="/reports/latest"
              className="px-[12px] py-[8px] rounded-[8px] font-nav text-[13px] leading-[15.6px] font-normal text-[#656565] hover:text-[#b01f24] transition-colors duration-200"
              style={{ fontVariationSettings: "'opsz' 9" }}
            >
              Latest Releases
            </a>
            <a
              href="/reports/syndicated"
              className="px-[12px] py-[8px] rounded-[8px] font-nav text-[13px] leading-[15.6px] font-normal text-[#656565] hover:text-[#b01f24] transition-colors duration-200"
              style={{ fontVariationSettings: "'opsz' 9" }}
            >
              Syndicated Reports
            </a>
            <a
              href="/reports/custom"
              className="px-[12px] py-[8px] rounded-[8px] font-nav text-[13px] leading-[15.6px] font-normal text-[#656565] hover:text-[#b01f24] transition-colors duration-200"
              style={{ fontVariationSettings: "'opsz' 9" }}
            >
              Custom Reports
            </a>
            <a
              href="/reports/country-level"
              className="px-[12px] py-[8px] rounded-[8px] font-nav text-[13px] leading-[15.6px] font-normal text-[#656565] hover:text-[#b01f24] transition-colors duration-200"
              style={{ fontVariationSettings: "'opsz' 9" }}
            >
              Country Level Reports
            </a>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="bg-[#e6e6e6] w-px self-stretch shrink-0" />

        {/* Column 2: Report Types with SOFT COLORED ICONS */}
        <div className="flex-1 min-w-0">
          <DropdownSection title="Report Types" gap="gap-[12px]">
            <DropdownItem 
              icon={<FileText className="size-5" strokeWidth={1.5} />}
              label="Industry Reports"
              href="/reports/industry"
              variant="with-icon"
              hoverEffect="shadow"
              iconBackground="bg-[#f5f5fd]"
            />
            <DropdownItem 
              icon={<Building2 className="size-5" strokeWidth={1.5} />}
              label="Global Reports"
              href="/reports/global"
              variant="with-icon"
              hoverEffect="shadow"
              iconBackground="bg-[#f0f0f0]"
            />
            <DropdownItem 
              icon={<MapPin className="size-5" strokeWidth={1.5} />}
              label="Regional Reports"
              href="/reports/regional"
              variant="with-icon"
              hoverEffect="shadow"
              iconBackground="bg-[#f5f5fd]"
            />
            <DropdownItem 
              icon={<Globe className="size-5" strokeWidth={1.5} />}
              label="Competition Benchmarking"
              href="/benchmarking"
              variant="with-icon"
              hoverEffect="shadow"
              iconBackground="bg-[#f5f5fd]"
            />
          </DropdownSection>
        </div>

        {/* Vertical Divider */}
        <div className="bg-[#e6e6e6] w-px self-stretch shrink-0" />

        {/* Column 3: Benchmarking with Clean Styling + CTA */}
        <div className="flex-1 min-w-0">
          <DropdownSection title="Benchmarking" gap="gap-[8px]">
            <DropdownItem 
              label="By Industry"
              href="/benchmarking/industry"
              variant="text-only"
              hoverEffect="shadow"
            />
            <DropdownItem 
              label="By Region"
              href="/benchmarking/region"
              variant="text-only"
              hoverEffect="shadow"
            />
            <DropdownItem 
              label="Our Methodology"
              href="/benchmarking/methodology"
              variant="text-only"
              hoverEffect="shadow"
            />
            
            {/* Request Study Link - Using GradientCTA for consistency */}
            <div className="mt-[8px]">
              <GradientCTA 
                text="Request study"
                href="/request-study"
              />
            </div>
          </DropdownSection>
        </div>

        {/* Vertical Divider */}
        <div className="bg-[#e6e6e6] w-px self-stretch shrink-0" />

        {/* Column 4: Get in Touch (Right) with Subtle Design */}
        <div className="w-[280px] flex-shrink-0">
          <DropdownSection title="Get in Touch" gap="gap-[8px]">
            <DropdownItem 
              label="Request On Demand"
              href="/custom-research"
              variant="text-only"
              hoverEffect="shadow"
            />
            <DropdownItem 
              label="Talk to Analyst"
              href="/talk-to-analyst"
              variant="text-only"
              hoverEffect="shadow"
            />
          </DropdownSection>

          {/* Stats Card - Using StatsCard Component */}
          <div className="mt-[24px]">
            <StatsCard 
              title="10 Lac+ Reports"
              description="Access comprehensive market research across 14+ industries worldwide"
              ctaText="Explore all reports"
              href="/reports/all"
            />
          </div>
        </div>

      </div>
    </MegaMenuDropdown>
  );
}