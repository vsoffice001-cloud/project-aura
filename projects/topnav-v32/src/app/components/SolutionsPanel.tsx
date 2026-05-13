/**
 * SolutionsPanel Component
 * 
 * Displays solution offerings with POV's and Case Studies sections.
 * Used in the Industries dropdown to showcase different solution types.
 * 
 * NOW USES REUSABLE COMPONENTS:
 * - InfoCard component (service variant)
 * 
 * Features:
 * - BOTH cards use service variant with identical hover behavior
 * - Normal state: lighter-gray background (#fcfcfc), NO shadow
 * - Hover state: white background + purple shadow appears
 * - Uses GradientCTA internally via InfoCard
 * - Consistent with Services menu cards
 * 
 * Design Specifications:
 * - Width: 209px
 * - Title: 20px DM Sans Medium
 * - Description width: 161px
 * - Hover: Background #fcfcfc → white + shadow appears
 * 
 * @component
 * @example
 * ```tsx
 * <SolutionsPanel />
 * ```
 */

import { InfoCard } from './ui';

export function SolutionsPanel() {
  return (
    <div className="w-[209px] flex flex-col gap-[10px]">
      {/* Header - h-[15px] to align with Industries header */}
      <div className="h-[15px] flex items-center justify-center">
        <h3 
          className="text-[12px] leading-[14.4px] font-medium text-[#656565] uppercase"
          style={{ fontVariationSettings: "'opsz' 14" }}
        >
          Solutions
        </h3>
      </div>

      {/* POV's Section - Service variant with hover shadow */}
      <InfoCard
        variant="service"
        title="POV's"
        description="Explore real-world use cases to drive results."
        ctaText="Get Inspired"
        ctaHref="/pov"
        background="lighter-gray"
        width="209px"
        descriptionWidth="161px"
      />

      {/* Case Studies Section - Service variant with hover shadow */}
      <InfoCard
        variant="service"
        title="Case Studies"
        description="See how brands like yours solve real challenges with Ken Research."
        ctaText="Explore Partner Stories"
        ctaHref="/case-studies"
        background="lighter-gray"
        width="209px"
        descriptionWidth="161px"
      />
    </div>
  );
}