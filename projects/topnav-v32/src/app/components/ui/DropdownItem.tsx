/**
 * DropdownItem Component
 * 
 * A reusable clickable item for dropdown menus with multiple variants.
 * Provides consistent spacing, hover states, and interactions.
 * 
 * @component
 * @example
 * ```tsx
 * // With icon and shadow hover (default - matches Industries)
 * <DropdownItem 
 *   icon={<FileCheck className="size-4" />}
 *   label="Case Studies"
 *   href="/resources/case-studies"
 *   variant="with-icon"
 *   hoverEffect="shadow"
 * />
 * 
 * // Text only with background hover
 * <DropdownItem 
 *   label="A Comprehensive Guide to Future Workspaces..."
 *   href="/article"
 *   variant="text-only"
 *   hoverEffect="background"
 *   lineClamp={2}
 * />
 * 
 * // Expandable (for Industries)
 * <DropdownItem 
 *   icon={<Building2 className="size-4" />}
 *   label="Healthcare"
 *   variant="expandable"
 *   isExpanded={isExpanded}
 *   onClick={handleClick}
 * />
 * ```
 * 
 * Features:
 * - Three variants: with-icon, text-only, expandable
 * - Two hover effects: shadow (default) or background
 * - Consistent padding (px-[12px] py-[10px])
 * - Smooth hover transitions (300ms)
 * - Icon color changes on hover
 * - Support for links or buttons
 * - Line clamping for long text
 * 
 * Design Specifications:
 * - Padding: px-[12px] py-[10px]
 * - Border radius: rounded-[10px]
 * - Gap (icon to text): gap-[8px]
 * - Text: 14px DM Sans Regular, #141016
 * - Hover (shadow): shadow-[0px_2px_8px_0px_rgba(128,108,224,0.2)] - Subtle, tight shadow for small nav items
 * - Hover (background): background change + icon color
 * - Transition: 300ms
 * 
 * Navigation Consistency:
 * - Resources dropdown: Uses shadow hover (matches Industries)
 * - Industries dropdown: Uses shadow hover
 * - Services dropdown: Uses background + shadow hover
 */

import { ChevronRight } from 'lucide-react';
import { Tooltip, TooltipTrigger, TooltipContent } from './tooltip';

type DropdownItemVariant = 'with-icon' | 'text-only' | 'expandable';

// Hover effect types
type HoverEffect = 'background' | 'shadow';

interface DropdownItemProps {
  /** The text label to display */
  label: string;
  /** Optional icon (ReactNode for flexibility) */
  icon?: React.ReactNode;
  /** Link href (creates <a> tag) */
  href?: string;
  /** Click handler (creates <button> tag) */
  onClick?: () => void;
  /** Variant style */
  variant?: DropdownItemVariant;
  /** For expandable variant - whether item is expanded */
  isExpanded?: boolean;
  /** Hover effect type: 'background' or 'shadow' */
  hoverEffect?: HoverEffect;
  /** Hover background color (only used when hoverEffect is 'background') */
  hoverBg?: string;
  /** Icon hover color (for with-icon variant) */
  iconHoverColor?: string;
  /** Icon background gradient (e.g., 'bg-gradient-to-r from-[#806ce0] to-[#9966ff]') */
  iconBackground?: string;
  /** Number of lines to clamp (for text-only variant) */
  lineClamp?: number;
  /** Font family (Inter for trending, DM Sans for others) */
  fontFamily?: 'dm-sans' | 'inter';
  /** Font weight override (e.g., 'font-medium' for emphasized items) */
  fontWeight?: 'font-normal' | 'font-medium' | 'font-bold';
  /** Enable truncation with tooltip */
  truncate?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export function DropdownItem({
  label,
  icon,
  href,
  onClick,
  variant = 'with-icon',
  isExpanded = false,
  hoverEffect = 'shadow',
  hoverBg = '#fcfcfc',
  iconHoverColor = '#806ce0',
  iconBackground,
  lineClamp,
  fontFamily = 'dm-sans',
  fontWeight = 'font-normal',
  truncate = false,
  className = '',
}: DropdownItemProps) {
  
  // Base classes - Using CSS custom properties from theme
  const baseClasses = `
    flex items-center gap-[8px] 
    rounded-[10px] 
    transition-all duration-300
    ${className}
  `.trim();
  
  // Apply spacing from CSS variables
  const spacingClasses = 'px-[var(--nav-item-padding-x)] py-[var(--nav-item-padding-y)]';
  
  // Hover style - shadow or background based on hoverEffect prop
  const hoverClass = hoverEffect === 'shadow'
    ? 'hover:shadow-[0px_2px_8px_0px_rgba(128,108,224,0.2)] hover:bg-white'
    : variant === 'text-only' && hoverBg === '#fcfcfc' 
    ? 'hover:bg-white' 
    : `hover:bg-${hoverBg === '#fcfcfc' ? 'white' : '[#fcfcfc]'}`;
  
  // Font classes - NO red text hover for shadow effect (card-based items)
  const fontClasses = fontFamily === 'inter'
    ? `font-['Inter',sans-serif] ${fontWeight} text-[#656565] ${hoverEffect === 'shadow' ? 'hover:text-[#141016]' : 'hover:text-[#b01f24]'}`
    : `font-nav ${fontWeight} text-[#656565] ${hoverEffect === 'shadow' ? 'hover:text-[#141016]' : 'hover:text-[#b01f24]'}`;
  
  // Line clamp class
  const lineClampClass = lineClamp ? `line-clamp-${lineClamp}` : '';
  
  // Content based on variant
  const content = (() => {
    switch (variant) {
      case 'with-icon':
        return (
          <>
            {icon && (
              iconBackground ? (
                // Icon with soft background (modern, clean aesthetic)
                <div className={`${iconBackground} rounded-[10px] p-[10px] text-[#141016] transition-colors duration-200`}>
                  {icon}
                </div>
              ) : (
                // Default icon (no background)
                <div className="text-[#141016] group-hover:text-[#806ce0] transition-colors">
                  {icon}
                </div>
              )
            )}
            <span 
              className={`${fontClasses} ${truncate ? 'overflow-hidden text-ellipsis whitespace-nowrap' : ''}`}
              style={{ 
                fontSize: 'var(--nav-menu-item)', 
                lineHeight: 'var(--nav-lh-menu)',
                fontVariationSettings: "'opsz' 9" 
              }}
            >
              {label}
            </span>
          </>
        );
      
      case 'text-only':
        return (
          <p 
            className={`${fontClasses} ${lineClampClass}`}
            style={{ 
              fontSize: 'var(--nav-menu-item)', 
              lineHeight: 'var(--nav-lh-menu)' 
            }}
          >
            {label}
          </p>
        );
      
      case 'expandable':
        return (
          <>
            {icon && (
              <div className="text-[#141016]">
                {icon}
              </div>
            )}
            <span 
              className={`${fontClasses} flex-1 text-left`}
              style={{ 
                fontSize: 'var(--nav-menu-item)', 
                lineHeight: 'var(--nav-lh-menu)',
                fontVariationSettings: "'opsz' 9" 
              }}
            >
              {label}
            </span>
            <ChevronRight 
              className={`size-4 text-[#656565] transition-transform duration-300 ${
                isExpanded ? 'rotate-90' : ''
              }`}
            />
          </>
        );
      
      default:
        return null;
    }
  })();
  
  const tooltipContent = truncate ? (
    <TooltipContent 
      side="top" 
      sideOffset={8}
      hideArrow={false}
      className="bg-[#141016] text-white font-nav font-normal px-[8px] py-[4px] rounded-[6px] shadow-lg max-w-[200px] border-none z-[9999]"
      style={{
        fontSize: 'var(--nav-metadata)',
        lineHeight: 'var(--nav-lh-metadata)',
      }}
    >
      <span className="block">{label}</span>
    </TooltipContent>
  ) : null;
  
  // Render as link or button
  if (href) {
    const linkElement = (
      <a
        href={href}
        className={`${baseClasses} ${hoverClass} ${variant === 'with-icon' ? 'group' : ''} ${spacingClasses}`}
      >
        {content}
      </a>
    );

    if (truncate && tooltipContent) {
      return (
        <Tooltip delayDuration={500}>
          <TooltipTrigger asChild>
            {linkElement}
          </TooltipTrigger>
          {tooltipContent}
        </Tooltip>
      );
    }

    return linkElement;
  }
  
  const buttonElement = (
    <button
      onClick={onClick}
      className={`${baseClasses} ${hoverClass} ${variant === 'with-icon' ? 'group' : ''} w-full ${spacingClasses}`}
    >
      {content}
    </button>
  );

  if (truncate && tooltipContent) {
    return (
      <Tooltip delayDuration={500}>
        <TooltipTrigger asChild>
          {buttonElement}
        </TooltipTrigger>
        {tooltipContent}
      </Tooltip>
    );
  }

  return buttonElement;
}