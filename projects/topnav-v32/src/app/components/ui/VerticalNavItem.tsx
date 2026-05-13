/**
 * VerticalNavItem Component
 * 
 * A vertical navigation item component for sidebar-style navigation menus.
 * Used in dropdown menus to display category options with icons.
 * 
 * Features:
 * - Icon + text layout (horizontal)
 * - Selected state with gradient background + shimmer effect + purple shadow
 * - Hover state with white background and border
 * - Activates on hover (not click) for instant feedback
 * - Smooth transitions
 * - Single-line text with ellipsis truncation for long labels
 * - Tooltip shows full label on hover (TOP positioned, never overlaps content)
 * - Size variants: small (compact) and medium (default)
 * 
 * Size Variants:
 * - small: 8px padding, 6px gap, 12px icon, 12px text, ~28px height
 *   → Used for: Insights/Consulting browse menus (fewer items)
 * - medium: 12px padding, 8px gap, 16px icon, 13px text, ~36px height (DEFAULT)
 *   → Used for: Industry/Survey listings (many items, scrollable)
 * 
 * States:
 * - default: Unselected state with transparent background
 * - hover: White background with border and purple shadow
 * - selected: Gradient background (black to grey) + shimmer animation
 * 
 * Design System Tokens Used:
 * - Small: --vertical-nav-sm-* tokens
 * - Medium: --vertical-nav-md-* tokens (also --vertical-nav-* for backward compatibility)
 * - Border Radius: var(--radius-sm) = 10px
 * - Shadow (Selected): var(--shadow-glow-purple)
 * - Shadow (Hover): var(--shadow-md)
 * - Transition: var(--transition-base) = 200ms
 * - Colors: var(--color-*) tokens
 * 
 * @example
 * ```tsx
 * // Medium (default) - for scrollable industry lists
 * <VerticalNavItem
 *   icon={<IndustryIcon />}
 *   label="Education & Recruitment"
 *   isSelected={activeIndustry === 'education'}
 *   onMouseEnter={() => setActiveIndustry('education')}
 * />
 * 
 * // Small - for compact browse menus
 * <VerticalNavItem
 *   size="sm"
 *   label="By Industry"
 *   isSelected={activeCategory === 'by-industry'}
 *   onMouseEnter={() => setActiveCategory('by-industry')}
 * />
 * ```
 */

import { ReactNode } from 'react';
import { Tooltip, TooltipTrigger, TooltipContent } from './tooltip';

interface VerticalNavItemProps {
  /** Icon element (SVG or React component) - optional */
  icon?: ReactNode;
  /** Display text for the navigation item */
  label: string;
  /** Whether this item is currently selected */
  isSelected: boolean;
  /** Mouse enter handler (for hover selection) */
  onMouseEnter: () => void;
  /** Optional href for link behavior */
  href?: string;
  /** Size variant: 'sm' (compact) or 'md' (default) */
  size?: 'sm' | 'md';
}

export function VerticalNavItem({
  icon,
  label,
  isSelected,
  onMouseEnter,
  href,
  size = 'md',
}: VerticalNavItemProps) {
  // Size-specific classes - using proper Tailwind classes
  const sizeClasses = size === 'sm'
    ? 'px-[8px] py-[6px] gap-[6px] rounded-[10px]'
    : 'px-[12px] py-[8px] gap-[8px] rounded-[10px]';

  const iconSizeClass = size === 'sm' ? 'size-[12px]' : 'size-[16px]';
  
  const textStyles = size === 'sm'
    ? { fontSize: '12px', lineHeight: '1.33' }
    : { fontSize: '13px', lineHeight: '1.38' };

  const baseClasses = `
    group
    flex items-center 
    ${sizeClasses}
    transition-all duration-200 ease-in-out
    cursor-pointer
    relative
    overflow-hidden
  `.trim().replace(/\s+/g, ' ');

  const stateClasses = isSelected
    ? 'bg-gradient-to-r from-[#141016] to-[#656565] text-white shadow-[0px_1px_30px_-5px_rgba(128,108,224,0.2)] border border-transparent'
    : 'bg-transparent text-[#656565] hover:text-[#b01f24] hover:bg-white hover:shadow-[0px_2px_8px_0px_rgba(128,108,224,0.12)] border border-transparent hover:border-[rgba(128,108,224,0.1)]';

  const className = `${baseClasses} ${stateClasses}`;

  const iconClassName = `flex items-center justify-center shrink-0 ${iconSizeClass} transition-colors duration-200 ${
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
        className="relative z-10 overflow-hidden text-ellipsis whitespace-nowrap font-nav font-normal flex-1 min-w-0"
        style={{
          fontSize: textStyles.fontSize,
          lineHeight: textStyles.lineHeight,
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