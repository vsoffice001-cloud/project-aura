import { ReactNode } from 'react';
import { useShimmer } from '@/app/hooks/useShimmer';

/**
 * InlineLink Component
 * 
 * A subtle inline link for paragraph interlinking with brand red underline.
 * NO arrow animation - designed for natural reading flow within text content.
 * 
 * Usage Guidelines:
 * - Use within paragraphs for cross-referencing content
 * - Always shows brand red underline
 * - On hover: text turns red + warm-100 background appears
 * - NO urgency signals (no arrows)
 * 
 * Visual Behavior:
 * - Default: Black text, red underline
 * - Hover: Red text, red underline, warm-100 background
 * 
 * @param children - Link text content
 * @param href - Destination URL
 * @param className - Additional CSS classes
 * @param onClick - Click handler
 * 
 * @example
 * ```tsx
 * <p>
 *   Learn more about our <InlineLink href="/methodology">design methodology</InlineLink> 
 *   and how we approach problems.
 * </p>
 * ```
 */

interface InlineLinkProps {
  children: ReactNode;
  href: string;
  className?: string;
  onClick?: () => void;
}

export function InlineLink({
  children,
  href,
  className = '',
  onClick,
}: InlineLinkProps) {
  const { isHovering, handleMouseEnter, handleMouseLeave } = useShimmer(200);

  return (
    <a
      href={href}
      onClick={onClick}
      className={`
        relative inline-block
        font-medium tracking-[0.0875px]
        transition-all duration-200
        ${isHovering ? 'text-[#b01f24]' : 'text-black'}
        ${className}
      `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Warm-100 Background on Hover */}
      <span
        className={`
          absolute inset-0 -mx-1 -my-0.5 rounded-sm
          transition-all duration-200
          ${isHovering ? 'bg-[var(--warm-100)] opacity-100' : 'bg-transparent opacity-0'}
        `}
        style={{ zIndex: -1 }}
      />

      {/* Text Content */}
      <span className="relative z-10">
        {children}
      </span>

      {/* Brand Red Underline - Always Visible */}
      <span
        className="absolute left-0 right-0 bottom-0 h-[1px] bg-[#b01f24]"
        style={{ bottom: '-2px' }}
      />
    </a>
  );
}
