'use client';

import type { ReactNode, MouseEvent } from 'react';
import { AnimatedArrow } from './AnimatedArrow';
import { useShimmer } from '../hooks/useShimmer';
import { cn } from '../lib/cn';

export type CTALinkVariant = 'default' | 'brand';
export type CTALinkSize = 'sm' | 'md' | 'lg';

export interface CTALinkProps {
  children: ReactNode;
  href: string;
  variant?: CTALinkVariant;
  size?: CTALinkSize;
  className?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}

const sizeClass: Record<CTALinkSize, string> = {
  sm: 'text-[var(--typography-size-sm)]',
  md: 'text-[var(--typography-size-base)]',
  lg: 'text-[var(--typography-size-lg)]',
};

const arrowSize: Record<CTALinkSize, number> = { sm: 16, md: 18, lg: 20 };

const variantTextClass: Record<CTALinkVariant, string> = {
  default: 'text-[var(--surface-text)]',
  brand:   'text-[var(--color-brand-red)]',
};

const variantGradient: Record<CTALinkVariant, string> = {
  default: 'from-[var(--surface-text)] via-[var(--surface-text-muted)] to-[var(--surface-text)]',
  brand:   'from-[var(--color-brand-red)] via-[var(--color-ramp-red-500)] to-[var(--color-brand-red)]',
};

const arrowColor: Record<CTALinkVariant, 'black' | 'brand'> = {
  default: 'black',
  brand:   'brand',
};

/**
 * CTALink — middle-tier link (between InlineLink and Button).
 *
 * WHY: Forms · page redirects · high-priority lightweight actions need text+arrow
 *      unified-hover affordance · lighter than Button · stronger than InlineLink.
 * WHAT: Text + animated arrow w/ unified hover zone · 2 variants (default black · brand red).
 * WHEN: Exploratory navigation ("Learn more →" · "View methodology →") · form/redirect CTAs.
 * WHEN NOT: Paragraph cross-references (use InlineLink) · primary conversion CTAs (use Button variant="brand") · low-priority nav.
 * HOW: Unified hover state — text gradient + AnimatedArrow trigger together · respects reduced-motion.
 *
 * @promotedFrom V0_lite_report
 */
export function CTALink({
  children,
  href,
  variant = 'default',
  size = 'md',
  className,
  onClick,
}: CTALinkProps) {
  const { isHovering, handleMouseEnter, handleMouseLeave } = useShimmer();

  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'group inline-flex items-center gap-2 font-medium tracking-[0.0875px]',
        'transition-all duration-300',
        sizeClass[size],
        className,
      )}
    >
      <span className={cn('relative inline-block transition-all duration-300', variantTextClass[variant])}>
        <span
          className={cn(
            'absolute inset-0 bg-gradient-to-r bg-clip-text text-transparent',
            'transition-opacity duration-300',
            variantGradient[variant],
            isHovering ? 'opacity-100' : 'opacity-0',
          )}
        >
          {children}
        </span>
        <span className={cn('transition-opacity duration-300', isHovering ? 'opacity-0' : 'opacity-100')}>
          {children}
        </span>
      </span>
      <AnimatedArrow size={arrowSize[size]} color={arrowColor[variant]} isHovered={isHovering} />
    </a>
  );
}
