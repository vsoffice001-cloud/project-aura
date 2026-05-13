/**
 * BrowseNavItem Component
 * 
 * Specialized navigation item for Consulting & Insights browse menus.
 * Optimized for short category names (no icons, compact layout).
 * 
 * Features:
 * - Text-only layout (no icons needed)
 * - Selected state with gradient background + shimmer effect + purple shadow
 * - Hover state with white background and border
 * - Activates on hover (not click) for instant feedback
 * - Same size as IndustryNavItem for consistency
 * - No truncation needed (short labels like "By Industry", "By Topic")
 * 
 * Design Specs:
 * - Padding: 12px × 10px (horizontal × vertical) - MATCHES IndustryNavItem
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
 * <BrowseNavItem
 *   label="By Industry"
 *   isSelected={activeCategory === 'by-industry'}
 *   onMouseEnter={() => setActiveCategory('by-industry')}
 * />
 * ```
 */

import { Tooltip, TooltipTrigger, TooltipContent } from './tooltip';

interface BrowseNavItemProps {
  /** Display text for the browse category */
  label: string;
  /** Whether this item is currently selected */
  isSelected: boolean;
  /** Mouse enter handler (for hover selection) */
  onMouseEnter: () => void;
  /** Optional href for link behavior */
  href?: string;
}

export function BrowseNavItem({
  label,
  isSelected,
  onMouseEnter,
  href,
}: BrowseNavItemProps) {
  const baseClasses = `
    group
    flex items-center
    w-full
    px-[12px] py-[10px]
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

  const content = (
    <>
      {/* Shimmer effect overlay for selected state */}
      {isSelected && (
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white to-transparent" />
        </div>
      )}
      <span
        className="relative z-10 text-left font-nav font-normal flex-1 block"
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
      className="bg-[#141016] text-white font-nav text-[12px] leading-[14.4px] font-normal px-[12px] py-[6px] rounded-[10px] shadow-lg max-w-[200px] border-none z-[9999]"
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