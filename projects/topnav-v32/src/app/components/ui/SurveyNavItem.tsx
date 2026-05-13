/**
 * SurveyNavItem Component
 * 
 * Specialized navigation item for Survey dropdown vertical listings.
 * Optimized for medium-length survey category names.
 * 
 * Features:
 * - Icon + text layout (horizontal)
 * - Selected state with gradient background + shimmer effect + purple shadow
 * - Hover state with white background and border
 * - Activates on hover (not click) for instant feedback
 * - Text truncation for longer names (single-line with ellipsis)
 * - Tooltip shows full name on hover (TOP positioned)
 * - Same size as IndustryNavItem for consistency
 * 
 * Design Specs:
 * - Padding: 12px × 10px (horizontal × vertical) - MATCHES IndustryNavItem
 * - Gap: 8px (icon to text)
 * - Icon: 16px
 * - Font: 13px DM Sans
 * - Border Radius: 10px
 * - Total Height: ~38px
 * 
 * States:
 * - default: Transparent background, grey text
 * - hover: White background with border and purple shadow
 * - selected: Gradient background (black to grey) + shimmer animation
 * 
 * @example
 * ```tsx
 * <SurveyNavItem
 *   icon={<BarChartIcon />}
 *   label="Customer Need, Desire and Pain Point"
 *   isSelected={activeCategory === 'customer-need'}
 *   onMouseEnter={() => setActiveCategory('customer-need')}
 * />
 * ```
 */

import { ReactNode } from 'react';
import { Tooltip, TooltipTrigger, TooltipContent } from './tooltip';

interface SurveyNavItemProps {
  /** Icon element (SVG or React component) - optional */
  icon?: ReactNode;
  /** Display text for the survey category */
  label: string;
  /** Whether this item is currently selected */
  isSelected: boolean;
  /** Mouse enter handler (for hover selection) */
  onMouseEnter: () => void;
  /** Optional href for link behavior */
  href?: string;
}

export function SurveyNavItem({
  icon,
  label,
  isSelected,
  onMouseEnter,
  href,
}: SurveyNavItemProps) {
  const baseClasses = `
    group
    flex items-center
    w-full
    px-[12px] py-[10px] gap-[8px]
    rounded-[10px]
    transition-all duration-200 ease-in-out
    cursor-pointer
    relative
    overflow-hidden
  `.trim().replace(/\s+/g, ' ');

  const stateClasses = isSelected
    ? 'bg-gradient-to-r from-[#141016] to-[#656565] text-white shadow-[0px_1px_30px_-5px_rgba(128,108,224,0.2)] border border-transparent'
    : 'bg-transparent text-[#656565] hover:text-[#b01f24] hover:bg-white hover:shadow-[0px_2px_8px_0px_rgba(128,108,224,0.12)] border border-transparent hover:border-[rgba(128,108,224,0.1)]';

  const className = `${baseClasses} ${stateClasses}`;

  const iconClassName = `flex items-center justify-center shrink-0 size-[16px] transition-colors duration-200 ${
    isSelected ? 'text-white' : 'text-[#656565] group-hover:text-[#b01f24]'
  }`;

  const content = (
    <>
      {/* Shimmer effect overlay for selected state */}
      {isSelected && (
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white to-transparent" />
        </div>
      )}
      {icon && <div className={iconClassName}>{icon}</div>}
      <span
        className="relative z-10 overflow-hidden text-ellipsis whitespace-nowrap text-left font-nav font-normal flex-1 min-w-0 block"
        style={{
          fontSize: '13px',
          lineHeight: '1.33',
          fontVariationSettings: "'opsz' 9",
        }}
      >
        {label}
      </span>
    </>
  );

  const tooltipContent = (
    <TooltipContent
      side="top"
      sideOffset={8}
      hideArrow={false}
      className="bg-[#141016] text-white font-nav text-[12px] leading-[14.4px] font-normal px-[12px] py-[6px] rounded-[10px] shadow-lg max-w-[250px] border-none z-[9999]"
    >
      <span className="block">{label}</span>
    </TooltipContent>
  );

  if (href) {
    return (
      <Tooltip delayDuration={500}>
        <TooltipTrigger asChild>
          <a href={href} className={className} onMouseEnter={onMouseEnter}>
            {content}
          </a>
        </TooltipTrigger>
        {tooltipContent}
      </Tooltip>
    );
  }

  return (
    <Tooltip delayDuration={500}>
      <TooltipTrigger asChild>
        <button className={className} onMouseEnter={onMouseEnter}>
          {content}
        </button>
      </TooltipTrigger>
      {tooltipContent}
    </Tooltip>
  );
}