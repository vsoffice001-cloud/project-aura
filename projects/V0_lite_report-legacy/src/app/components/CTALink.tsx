import { type ReactNode } from 'react';
import { AnimatedArrow } from '../../design-system/components/AnimatedArrow';
import { useShimmer } from '../hooks/useShimmer';

/**
 * CTALink Component
 * 
 * A unified hover zone link with text + animated arrow for high-urgency CTAs.
 * When hovering anywhere on the component, both the text gradient and arrow animate together.
 * 
 * Design System Context:
 * - Lighter weight than full buttons but stronger signaling than inline links
 * - Perfect for forms, redirects, or high-priority actions
 * - Part of VS Design System's 3-tier link hierarchy
 * 
 * Usage Guidelines:
 * ✅ Use for: Forms, page redirects, high-priority actions, lightweight CTAs
 * ❌ Don't use for: Within paragraphs, low-priority navigation, subtle cross-references
 * 
 * Visual Behavior:
 * - Default: Text in variant color, arrow static
 * - Hover (unified): Text gradient animates + arrow slides up
 * - Both text AND arrow trigger the same hover effect (unified zone)
 * 
 * Variants:
 * - 'default' (black): Standard urgency CTAs
 * - 'brand' (red): Highest priority CTAs
 * 
 * @param children - Link text content
 * @param href - Destination URL
 * @param variant - Visual style: 'default' (black) or 'brand' (red)
 * @param size - Text size: 'sm' | 'md' | 'lg'
 * @param className - Additional CSS classes
 * @param onClick - Optional click handler
 * 
 * @example
 * ```tsx
 * <CTALink href="/contact" variant="brand" size="lg">
 *   Get Started Now
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
  className?: string;
  onClick?: () => void;
}

export function CTALink({
  children,
  href,
  variant = 'default',
  size = 'md',
  className = '',
}: CTALinkProps) {
  const { isHovering, handleMouseEnter, handleMouseLeave } = useShimmer();

  // Size styles
  const sizeStyles = {
    sm: 'text-[var(--text-sm)]',   // 16px
    md: 'text-[var(--text-base)]', // 20px
    lg: 'text-[var(--text-lg)]',   // 25px
  };

  // Variant styles
  const variantStyles = {
    default: {
      text: 'text-black',
      gradient: 'from-black via-black/60 to-black',
      arrow: 'black' as const,
    },
    brand: {
      text: 'text-[var(--brand-red)]',
      gradient: 'from-[var(--brand-red)] via-[var(--brand-red-hover)] to-[var(--brand-red)]',
      arrow: 'brand' as const,
    },
  };

  const styles = variantStyles[variant];

  return (
    <a
      href={href}
      className={`
        group inline-flex items-center gap-2 
        font-medium tracking-[0.0875px]
        transition-all duration-300
        ${sizeStyles[size]}
        ${className}
      `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Text with gradient on hover */}
      <span
        className={`
          relative inline-block
          transition-all duration-300
          ${styles.text}
        `}
      >
        {/* Text gradient overlay on hover */}
        <span
          className={`
            absolute inset-0
            bg-gradient-to-r ${styles.gradient}
            bg-clip-text text-transparent
            transition-opacity duration-300
            ${isHovering ? 'opacity-100' : 'opacity-0'}
          `}
        >
          {children}
        </span>
        
        {/* Regular text (visible when not hovering) */}
        <span
          className={`
            transition-opacity duration-300
            ${isHovering ? 'opacity-0' : 'opacity-100'}
          `}
        >
          {children}
        </span>
      </span>

      {/* Animated Arrow */}
      <AnimatedArrow
        size={size === 'sm' ? 16 : size === 'md' ? 18 : 20}
        color={styles.arrow}
        isHovered={isHovering}
      />
    </a>
  );
}