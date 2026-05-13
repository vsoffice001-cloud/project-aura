import { ReactNode } from 'react';
import { AnimatedArrow } from '@/app/components/AnimatedArrow';
import { useShimmer } from '@/app/hooks/useShimmer';

/**
 * CTALink Component
 * 
 * A unified hover zone link with text + animated arrow for high-urgency CTAs.
 * When hovering anywhere on the component, both the text gradient and arrow animate together.
 * 
 * Usage Guidelines:
 * - Use for forms, redirects, or high-priority actions
 * - Unified hover behavior: hovering text OR arrow triggers both animations
 * - Part of VS Design System's urgency signaling patterns
 * 
 * @param children - Link text content
 * @param href - Destination URL
 * @param variant - Visual style: 'default' (black) or 'brand' (red)
 * @param size - Text size: 'sm' | 'md' | 'lg'
 * @param showArrow - Show animated arrow (default: true)
 * @param arrowSize - Arrow icon size in pixels (default: 20)
 * @param className - Additional CSS classes
 * @param onClick - Click handler
 * 
 * @example
 * ```tsx
 * // High-urgency CTA with brand color
 * <CTALink href="/contact" variant="brand" size="lg">
 *   Get Started Now
 * </CTALink>
 * 
 * // Default black CTA
 * <CTALink href="/learn-more">
 *   Learn More
 * </CTALink>
 * ```
 */

export type CTALinkVariant = 'default' | 'brand';
export type CTALinkSize = 'sm' | 'md' | 'lg';

interface CTALinkProps {
  children: ReactNode;
  href: string;
  variant?: CTALinkVariant;
  size?: CTALinkSize;
  showArrow?: boolean;
  arrowSize?: number;
  className?: string;
  onClick?: () => void;
}

export function CTALink({
  children,
  href,
  variant = 'default',
  size = 'md',
  showArrow = true,
  arrowSize = 20,
  className = '',
}: CTALinkProps) {
  const { isHovering, handleMouseEnter, handleMouseLeave } = useShimmer(300);

  // Size-based font sizing
  const sizeStyles = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  // Variant-based colors
  const getTextStyles = () => {
    if (variant === 'brand') {
      return isHovering
        ? 'bg-gradient-to-r from-[#b01f24] via-[#eb484e] to-[#b01f24] bg-clip-text text-transparent'
        : 'text-[#b01f24]';
    }
    // Default variant
    return isHovering
      ? 'bg-gradient-to-r from-[#141016] via-[#656565] to-[#141016] bg-clip-text text-transparent'
      : 'text-black';
  };

  const arrowColor = variant === 'brand' ? '#b01f24' : '#141016';

  return (
    <a
      href={href}
      className={`inline-flex items-center gap-2 font-medium tracking-[0.0875px] transition-all duration-300 ${sizeStyles[size]} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Text with gradient on hover */}
      <span className={`transition-all duration-300 ${getTextStyles()}`}>
        {children}
      </span>

      {/* Animated Arrow - moves on unified hover */}
      {showArrow && (
        <span className="inline-flex items-center">
          <AnimatedArrow 
            size={arrowSize} 
            color={arrowColor} 
            isHovered={isHovering} 
          />
        </span>
      )}
    </a>
  );
}
