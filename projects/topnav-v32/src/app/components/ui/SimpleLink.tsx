/**
 * SimpleLink Component
 * 
 * A reusable text link component with optional arrow icon.
 * Provides consistent styling and hover states for navigation links.
 * 
 * @component
 * @example
 * ```tsx
 * // With arrow
 * <SimpleLink 
 *   text="All Insights" 
 *   href="/resources/all" 
 *   withArrow={true}
 * />
 * 
 * // Plain text link
 * <SimpleLink 
 *   text="Subscribe to Updates" 
 *   href="/subscribe"
 * />
 * ```
 * 
 * Features:
 * - Two variants: with arrow or plain text
 * - Consistent hover states (color + arrow translation)
 * - DM Sans typography with optical sizing
 * - Smooth 300ms transitions
 * - Brand diagonal arrow with dual animation
 * 
 * Design Specifications:
 * - Text: 13px DM Sans Regular (reduced from 14px for refined typography)
 * - Line height: 15.6px
 * - Default color: #141016
 * - Hover color: #b01f24 (red) for links with arrows
 * - Hover color: #141016 (darker) for plain links
 * - Arrow: 45-degree diagonal arrow with dual slide animation
 * - Transition: 300ms ease-in-out
 */

interface SimpleLinkProps {
  /** The link text to display */
  text: string;
  /** The href/URL for the link */
  href: string;
  /** Whether to show an arrow icon */
  withArrow?: boolean;
  /** Custom text color (default: #141016) */
  textColor?: string;
  /** Custom hover text color */
  hoverColor?: string;
  /** Additional CSS classes */
  className?: string;
}

export function SimpleLink({
  text,
  href,
  withArrow = false,
  textColor = '#141016',
  hoverColor,
  className = '',
}: SimpleLinkProps) {
  // Determine hover color based on variant
  const defaultHoverColor = withArrow ? '#b01f24' : '#141016';
  const finalHoverColor = hoverColor || defaultHoverColor;

  return (
    <a
      href={href}
      className={`flex items-center gap-[8px] group/link w-fit ${className}`}
    >
      <span
        className={`text-[13px] leading-[15.6px] font-normal transition-colors duration-300`}
        style={{
          fontVariationSettings: "'opsz' 9",
          color: textColor,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = finalHoverColor;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = textColor;
        }}
      >
        {text}
      </span>
      
      {withArrow && (
        <div className="relative size-[13px] shrink-0 overflow-hidden">
          {/* Arrow 1 - Visible by default, slides diagonally up-right on hover */}
          <svg 
            className="absolute left-0 top-0 size-[12px] transition-all duration-300 ease-in-out group-hover/link:translate-x-[9px] group-hover/link:-translate-y-[11px]" 
            fill="none" 
            viewBox="0 0 12 12"
            style={{ color: textColor }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = finalHoverColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = textColor;
            }}
          >
            <path 
              d="M3 9L9 3M9 3H4.125M9 3V7.875" 
              stroke="currentColor" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
          </svg>
          
          {/* Arrow 2 - Hidden below-left, slides diagonally up-right to center on hover */}
          <svg 
            className="absolute left-[-9px] top-[11px] size-[12px] transition-all duration-300 ease-in-out group-hover/link:translate-x-[9px] group-hover/link:-translate-y-[11px]" 
            fill="none" 
            viewBox="0 0 12 12"
            style={{ color: textColor }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = finalHoverColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = textColor;
            }}
          >
            <path 
              d="M3 9L9 3M9 3H4.125M9 3V7.875" 
              stroke="currentColor" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
          </svg>
        </div>
      )}
    </a>
  );
}