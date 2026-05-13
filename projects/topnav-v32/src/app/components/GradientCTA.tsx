/**
 * GradientCTA Component
 * 
 * A reusable call-to-action link with gradient text and animated arrow icons.
 * Features a unique hover animation where arrows transition smoothly with masking.
 * 
 * @component
 * @example
 * ```tsx
 * <GradientCTA text="Explore Consulting" href="#consulting" />
 * <GradientCTA text="Learn More" href="/about" />
 * ```
 * 
 * Features:
 * - Gradient text effect (red #b01f24 to #eb484e)
 * - Dual arrow animation on hover with masking
 * - Arrow 1: Visible by default at center, slides diagonally up-left on hover
 * - Arrow 2: Hidden below, slides diagonally up-left to center on hover
 * - Smooth 300ms transition with easing
 * 
 * Design Specifications:
 * - Text: 12px DM Sans Regular, gradient fill
 * - Line height: 14.4px
 * - Arrow container: 13x13px with overflow masking
 * - Arrow icons: 12x12px SVG
 * - Arrow 1 position: left-0, top-0
 * - Arrow 2 position: left-0, top-[11px] (default), animates to left-0, top-0 (hover)
 */

interface GradientCTAProps {
  /** The text content to display */
  text: string;
  /** The href/URL for the link */
  href?: string;
  /** Optional click handler */
  onClick?: () => void;
  /** Optional additional CSS classes */
  className?: string;
  /** Size variant - 'sm' (default) or 'lg' (larger with padding for ~32px height) */
  size?: 'sm' | 'lg';
}

export function GradientCTA({ text, href = "#", onClick, className = "", size = 'sm' }: GradientCTAProps) {
  // Size-specific padding classes
  const sizeClasses = size === 'lg' ? 'py-[7px]' : '';
  
  return (
    <a 
      href={href}
      onClick={onClick}
      className={`flex items-center gap-[2px] group/cta ${sizeClasses} ${className}`}
    >
      {/* Gradient Text */}
      <span 
        className="bg-clip-text bg-gradient-to-r from-[#b01f24] to-[#eb484e] font-nav font-normal text-right group-hover/cta:opacity-80 transition-opacity duration-300"
        style={{ 
          fontSize: 'var(--nav-cta-text)',
          lineHeight: 'var(--nav-lh-menu)',
          fontVariationSettings: "'opsz' 9",
          WebkitTextFillColor: "transparent"
        }}
      >
        {text}
      </span>

      {/* Arrow Container with Masking */}
      <div className="relative size-[13px] shrink-0 overflow-hidden">
        {/* Arrow 1 - Visible by default at center, slides diagonally up-right on hover */}
        <svg 
          className="absolute left-0 top-0 size-[12px] transition-all duration-300 ease-in-out group-hover/cta:translate-x-[9px] group-hover/cta:-translate-y-[11px]" 
          fill="none" 
          viewBox="0 0 12 12"
        >
          <path 
            d="M3 9L9 3M9 3H4.125M9 3V7.875" 
            stroke="#EB484E" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </svg>

        {/* Arrow 2 - Hidden below-left, slides diagonally up-right to center on hover */}
        <svg 
          className="absolute left-[-9px] top-[11px] size-[12px] transition-all duration-300 ease-in-out group-hover/cta:translate-x-[9px] group-hover/cta:-translate-y-[11px]" 
          fill="none" 
          viewBox="0 0 12 12"
        >
          <path 
            d="M3 9L9 3M9 3H4.125M9 3V7.875" 
            stroke="#EB484E" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </svg>
      </div>
    </a>
  );
}