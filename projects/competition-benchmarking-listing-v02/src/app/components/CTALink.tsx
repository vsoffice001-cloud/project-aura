import { useState, type ReactNode, type CSSProperties } from 'react';
import { AnimatedArrow } from './AnimatedArrow';

/**
 * CTALink — Ken Bold DS v3.2
 *
 * The middle tier of the link hierarchy: Button → CTALink → InlineLink
 * Used for "View All", "Explore", "See More" actions — text + animated arrow.
 * NOT a full button; lighter visual weight but still a clear call-to-action.
 *
 * Usage:
 *   <CTALink onClick={handleClick}>Explore all Healthcare reports</CTALink>
 *   <CTALink href="/reports" onDark>View collection</CTALink>
 */

export type CTALinkSize = 'sm' | 'md' | 'lg';

interface CTALinkProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  size?: CTALinkSize;
  onDark?: boolean;
  className?: string;
}

export function CTALink({
  children,
  onClick,
  href,
  size = 'md',
  onDark = false,
  className = '',
}: CTALinkProps) {
  const [isHovered, setIsHovered] = useState(false);

  const sizeConfig = {
    sm: { fontSize: 'var(--text-xs)', arrowSize: 14, gap: 'gap-1.5' },
    md: { fontSize: 'var(--text-nav)', arrowSize: 16, gap: 'gap-2' },
    lg: { fontSize: 'var(--text-sm)', arrowSize: 18, gap: 'gap-2.5' },
  };

  const { fontSize, arrowSize, gap } = sizeConfig[size];

  const textColor = onDark
    ? isHovered ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.7)'
    : isHovered ? 'var(--brand-red)' : 'rgba(0,0,0,0.6)';

  const arrowColor = onDark
    ? isHovered ? 'white' : 'rgba(255,255,255,0.7)'
    : isHovered ? 'var(--brand-red)' : 'rgba(0,0,0,0.5)';

  const underlineColor = onDark
    ? isHovered ? 'rgba(255,255,255,0.4)' : 'transparent'
    : isHovered ? 'rgba(176, 31, 36, 0.3)' : 'transparent';

  const commonProps = {
    className: `inline-flex items-center ${gap} transition-colors duration-200 cursor-pointer ${className}`,
    style: {
      fontSize,
      color: textColor,
    } as CSSProperties,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
  };

  const content = (
    <>
      <span
        className="transition-all duration-200"
        style={{
          borderBottom: `1px solid ${underlineColor}`,
          paddingBottom: '1px',
        }}
      >
        {children}
      </span>
      <AnimatedArrow
        size={arrowSize}
        color={arrowColor}
        isHovered={isHovered}
        duration={250}
      />
    </>
  );

  if (href) {
    return (
      <a href={href} {...commonProps}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} {...commonProps}>
      {content}
    </button>
  );
}