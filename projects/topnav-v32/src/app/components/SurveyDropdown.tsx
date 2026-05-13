/**
 * SurveyDropdown Component
 * 
 * A full-width mega menu dropdown for survey services navigation.
 * Based on LFD design with 4-column layout and vertical navigation sidebar.
 * 
 * Features:
 * - Left sidebar: Vertical category navigation (SURVEY VERTICALS)
 * - Main content: Selected category details (Product & Pricing, etc.)
 * - Publications/Knowledge sections
 * - Get Started section with CTA cards and help card
 * 
 * Layout Strategy:
 * - Column 1 (15%): Vertical navigation sidebar (200px)
 * - Column 2 (30%): Main content with survey types (flex-1)
 * - Column 3 (20%): Publications & Knowledge links (200px)
 * - Column 4 (35%): Get Started CTAs (358px)
 * 
 * Components Used:
 * - MegaMenuDropdown (wrapper)
 * - SurveyNavItem (sidebar navigation)
 * - DropdownSection (content sections)
 * - DropdownItem (menu links)
 * - SimpleLink (view all links)
 * - Inline cards (gray CTA cards + pink help card)
 */

import { useState } from 'react';
import { MegaMenuDropdown, DropdownSection, DropdownItem, SurveyNavItem, SimpleLink, QuickAccessCard } from './ui';
import { GradientCTA } from './GradientCTA';
import { BarChart3, Users, Heart, DollarSign, Search, Settings } from 'lucide-react';

interface SurveyDropdownProps {
  /** Whether the dropdown is open */
  isOpen: boolean;
  /** Additional CSS classes */
  className?: string;
}

export function SurveyDropdown({ isOpen, className = '' }: SurveyDropdownProps) {
  const [activeCategory, setActiveCategory] = useState('brand-perception');

  // Survey vertical categories
  const surveyVerticals = [
    {
      id: 'brand-perception',
      label: 'Brand Perception',
    },
    {
      id: 'c-sat',
      label: 'C-SAT',
    },
    {
      id: 'dealer-voice',
      label: "Dealer's Voice",
    },
    {
      id: 'employee-engagement',
      label: 'Employee Engagement',
    },
    {
      id: 'customer-need',
      label: 'Customer Need, Desire and Pain Point',
    },
  ];

  // Content for each category - Product Pages with actual Ken Research surveys
  const categoryContent: Record<string, { title: string; surveys: { name: string; url: string }[] }> = {
    'brand-perception': {
      title: 'Brand Perception',
      surveys: [
        { name: 'Brand Awareness Recall Survey', url: 'https://www.kenresearch.com/survey/brand-awareness-recall-survey' },
        { name: 'Brand Loyalty Retention Survey', url: 'https://www.kenresearch.com/survey/brand-loyalty-retention-survey' },
        { name: 'Ad Effectiveness Tracking Survey', url: 'https://www.kenresearch.com/survey/ad-effectiveness-tracking-survey' },
        { name: 'Competitive Benchmarking Study Survey', url: 'https://www.kenresearch.com/survey/competitive-benchmarking-study-survey' },
        { name: 'Sustainability CSR Perception Survey', url: 'https://www.kenresearch.com/survey/sustainability-csr-perception-survey' },
        { name: 'Crisis Communication Effectiveness Survey', url: 'https://www.kenresearch.com/survey/crisis-communication-effectiveness-survey' },
      ],
    },
    'c-sat': {
      title: 'C-SAT',
      surveys: [
        { name: 'Customer Journey Mapping Survey', url: 'https://www.kenresearch.com/survey/customer-journey-mapping-survey' },
        { name: 'Healthcare Patient Satisfaction Survey', url: 'https://www.kenresearch.com/survey/healthcare-patient-satisfaction-survey' },
        { name: 'Commercial Tenant Satisfaction Survey', url: 'https://www.kenresearch.com/survey/commercial-tenant-satisfaction-survey' },
        { name: 'Service Quality Assessment Survey', url: 'https://www.kenresearch.com/survey/service-quality-assessment-survey' },
        { name: 'Product Usage Satisfaction Survey', url: 'https://www.kenresearch.com/survey/product-usage-satisfaction-survey' },
        { name: 'User Experience Research Survey', url: 'https://www.kenresearch.com/survey/user-experience-research-survey' },
        { name: 'Mobile App Usability Survey', url: 'https://www.kenresearch.com/survey/mobile-app-usability-survey' },
        { name: 'Fintech Platform Experience Evaluation Survey', url: 'https://www.kenresearch.com/survey/fintech-platform-experience-evaluation-survey' },
      ],
    },
    'dealer-voice': {
      title: "Dealer's Voice",
      surveys: [
        { name: 'Dealer Engagement and Performance Evaluation Survey', url: 'https://www.kenresearch.com/survey/dealer-engagement-and-performance-evaluation-survey' },
        { name: 'Enhancing Dealer Engagement and Retention Survey', url: 'https://www.kenresearch.com/survey/enhancing-dealer-engagement-and-retention-survey' },
        { name: 'Satisfaction Survey for Channel Partners Survey', url: 'https://www.kenresearch.com/survey/satisfaction-survey-for-channel-partners-survey' },
        { name: 'Channel Conflict Resolution Survey', url: 'https://www.kenresearch.com/survey/channel-conflict-resolution-survey' },
        { name: 'Distributor Reseller Collaboration Insights Survey', url: 'https://www.kenresearch.com/survey/distributor-reseller-collaboration-insights-survey' },
        { name: 'Franchisee Experience Evaluation Survey', url: 'https://www.kenresearch.com/survey/franchisee-experience-evaluation-survey' },
      ],
    },
    'employee-engagement': {
      title: 'Employee Engagement',
      surveys: [
        { name: 'Job Satisfaction Motivation Survey', url: 'https://www.kenresearch.com/survey/job-satisfaction-motivation-survey' },
        { name: 'Employee Benefits Satisfaction Survey', url: 'https://www.kenresearch.com/survey/employee-benefits-satisfaction-survey' },
        { name: 'Employee Onboarding Effectiveness Survey', url: 'https://www.kenresearch.com/survey/employee-onboarding-effectiveness-survey' },
        { name: 'Corporate Culture Assessment Survey', url: 'https://www.kenresearch.com/survey/corporate-culture-assessment-survey' },
        { name: 'Training Needs Assessment Survey', url: 'https://www.kenresearch.com/survey/training-needs-assessment-survey' },
      ],
    },
    'customer-need': {
      title: 'Customer Need, Desire and Pain Point',
      surveys: [
        { name: 'Consumer Purchase Intent Survey', url: 'https://www.kenresearch.com/survey/consumer-purchase-intent-survey' },
        { name: 'Market Segmentation Analysis Survey', url: 'https://www.kenresearch.com/survey/market-segmentation-analysis-survey' },
        { name: 'Pricing Sensitivity Perception Survey', url: 'https://www.kenresearch.com/survey/pricing-sensitivity-perception-survey' },
        { name: 'Product Development Innovation Survey', url: 'https://www.kenresearch.com/survey/product-development-innovation-survey' },
        { name: 'Usage and Attitude Survey (U&A Survey)', url: 'https://www.kenresearch.com/survey/usage-and-attitude-survey-ua-survey' },
        { name: 'Retail Shopper Behavior Survey', url: 'https://www.kenresearch.com/survey/retail-shopper-behavior-survey' },
        { name: 'Electric Vehicle Adoption Readiness Study Survey', url: 'https://www.kenresearch.com/survey/electric-vehicle-adoption-readiness-study-survey' },
      ],
    },
  };

  // Publications list
  const publications = [
    { label: 'VOC Impact', href: '/publications/voc-impact' },
    { label: 'Dashboards', href: '/publications/dashboards' },
    { label: 'Articles', href: '/publications/articles' },
    { label: 'Perspective', href: '/publications/perspective' },
  ];

  const currentContent = categoryContent[activeCategory];

  return (
    <MegaMenuDropdown isOpen={isOpen} variant="full-width" className={className}>
      {/* 4-Column Layout */}
      <div className="flex gap-[32px]">
        
        {/* Column 1: Survey Verticals Sidebar */}
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
              Survey Verticals
            </span>
          </div>
          <div className="flex flex-col gap-[4px]">
            {surveyVerticals.map((vertical) => (
              <SurveyNavItem
                key={vertical.id}
                label={vertical.label}
                isSelected={activeCategory === vertical.id}
                onMouseEnter={() => setActiveCategory(vertical.id)}
              />
            ))}
          </div>
        </div>

        {/* Column 2: Main Content - Selected Category */}
        <div className="w-[280px] pl-[32px] border-l border-[rgba(20,16,22,0.1)]">
          {/* Vertical Name Section - Shows single product page */}
          <DropdownSection 
            title="Vertical Name"
            gap="gap-[8px]"
          >
            {currentContent.surveys.slice(0, 5).map((survey, index) => (
              <DropdownItem
                key={index}
                label={survey.name}
                href={survey.url}
                variant="text-only"
                lineClamp={2}
                truncate={true}
              />
            ))}
            {/* CTA at bottom - Following design pattern: "View all {category} templates →" */}
            <div className="mt-[12px]">
              <SimpleLink 
                text={`View all ${currentContent.title.toLowerCase()} templates`}
                href={`/surveys/${activeCategory}`}
                withArrow={true}
                textColor="#b01f24"
              />
            </div>
          </DropdownSection>
        </div>

        {/* Column 3: Publications & Knowledge */}
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
        </div>

        {/* Column 4: Get Started */}
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
              Survey Types
            </span>
          </div>

          {/* Quick Access Cards */}
          <div className="flex flex-col gap-[12px]">
            {/* Explore Surveys Card */}
            <QuickAccessCard 
              href="/surveys/explore" 
              icon={<Search className="size-[18px] text-[#141016]" strokeWidth={1.5} />}
              title="Explore Surveys"
              description="Browse all templates"
            />

            {/* Custom Survey Card */}
            <QuickAccessCard 
              href="/surveys/custom" 
              icon={<Settings className="size-[18px] text-[#141016]" strokeWidth={1.5} />}
              title="Custom Survey"
              description="Tailored research"
            />
          </div>

          {/* Need Help Card - Pink accent */}
          <div className="px-[20px] py-[20px] bg-[#fcfcfc] rounded-[15px] border border-[rgba(20,16,22,0.1)] shadow-[0px_1px_16px_0px_rgba(255,77,109,0.15)]">
            <h4 className="font-nav text-[16px] leading-[19.2px] font-medium text-[#141016] mb-[8px]">
              Need help choosing?
            </h4>
            <p className="font-nav text-[14px] leading-[20px] font-normal text-[#656565] mb-[12px]">
              Our research team can recommend the right approach.
            </p>
            <GradientCTA 
              text="Talk to an expert"
              href="/contact-expert"
            />
          </div>
        </div>

      </div>
    </MegaMenuDropdown>
  );
}