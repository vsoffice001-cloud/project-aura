'use client';

import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { cn } from '../lib/cn';

export interface InlineLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> {
  children: ReactNode;
  href: string;
}

/**
 * InlineLink — subtle inline link for paragraph cross-references.
 *
 * Lowest tier in the 3-tier link hierarchy (InlineLink → CTALink → Button).
 * Always-visible Ken-red underline (1px). Hover: red text + warm-100 wash.
 *
 * Use for: paragraph interlinking, cross-references, doc links, subtle nav.
 * Do NOT use for: primary CTAs, urgency actions, standalone buttons.
 *
 * @promotedFrom V0_lite_report
 */
export function InlineLink({ children, href, className, ...rest }: InlineLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        'inline text-[var(--surface-text)]',
        'underline decoration-[var(--color-brand-red)] decoration-1 underline-offset-2',
        'transition-all duration-200',
        'hover:text-[var(--color-brand-red)] hover:bg-[var(--color-ramp-warm-100)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-red)] focus-visible:ring-offset-2',
        className,
      )}
      {...rest}
    >
      {children}
    </a>
  );
}
