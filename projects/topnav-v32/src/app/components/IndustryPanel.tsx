/**
 * IndustryPanel Component
 * 
 * Displays the expanded view of an industry with back button, header, and subcategories.
 * Used in the IndustriesDropdown to show subcategory options.
 * 
 * @component
 * @example
 * ```tsx
 * <IndustryPanel
 *   industry={selectedIndustry}
 *   onBack={() => setSelectedIndustry(null)}
 * />
 * ```
 */

import { BackButton, SubCategoryItem } from './ui';
import { GradientCTA } from './GradientCTA';
import type { Industry } from '@/data/industries';

interface IndustryPanelProps {
  /** The industry to display */
  industry: Industry;
  /** Back button click handler */
  onBack: () => void;
  /** Additional CSS classes */
  className?: string;
}

export function IndustryPanel({ industry, onBack, className = '' }: IndustryPanelProps) {
  return (
    <div 
      className={`
        content-stretch flex flex-col gap-[16px] items-start relative
        ${className}
      `}
    >
      {/* Header with Back Button and Title */}
      <div className="content-stretch flex gap-[8px] isolate items-center justify-center relative shrink-0 w-full">
        {/* Back Button */}
        <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 z-[2]">
          <BackButton onClick={onBack} />
        </div>
        
        {/* Title and CTA */}
        <div className="content-stretch flex flex-[1_0_0] items-start min-h-px min-w-px relative z-[1]">
          {/* Category Title */}
          <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative">
            <div 
              className="text-[12px] leading-[14.4px] font-medium text-[#656565] uppercase"
              style={{ fontVariationSettings: "'opsz' 14" }}
            >
              {industry.label}
            </div>
          </div>
          
          {/* Explore CTA */}
          <div className="content-stretch flex flex-col items-start relative shrink-0">
            <GradientCTA 
              text={`Explore ${industry.ctaText || industry.label.split(' ')[0]}`}
              href={`/industries/${industry.id}`}
            />
          </div>
        </div>
      </div>
      
      {/* Subcategories List */}
      <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
        {industry.subcategories.map((subcategory) => (
          <SubCategoryItem
            key={subcategory.id}
            label={subcategory.label}
            href={subcategory.href}
          />
        ))}
      </div>
    </div>
  );
}