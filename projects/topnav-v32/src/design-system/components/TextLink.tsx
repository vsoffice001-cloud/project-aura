/**
 * TextLink — Inline text link with hover color transition
 *
 * Design System primitive. Renders as <a> (with href) or <button> (with onClick).
 * Two size variants: 'sm' (12px helper text) and 'md' (14px primary text).
 * Color transitions from secondary grey to brand red on hover.
 *
 * Promoted from: navbar/atoms/NavLink.tsx
 * Consumed by:   Navbar (SecondaryBar, AuthButtons), Footer, Mega menus, Auth pages
 *
 * @example
 * <TextLink href="/procurement" size="sm">Procurement</TextLink>
 * <TextLink as="button" onClick={fn} size="md">Sign in</TextLink>
 * <TextLink href="/about" size="sm" icon={<InfoIcon />}>About</TextLink>
 */

import { ReactNode } from 'react';

interface TextLinkProps {
  children: ReactNode;
  /** Renders as <a> when provided */
  href?: string;
  /** Renders as <button> when no href */
  onClick?: () => void;
  /** 'sm' = 12px helper text, 'md' = 14px primary text */
  size?: 'sm' | 'md';
  /** Optional leading icon element */
  icon?: ReactNode;
  /** Active state — text stays brand red */
  active?: boolean;
  /** Additional CSS classes */
  className?: string;
}

const sizeConfig = {
  sm: {
    fontSize: 'var(--nav-helper-text)',
    lineHeight: 'var(--nav-lh-helper)',
  },
  md: {
    fontSize: 'var(--nav-primary-text)',
    lineHeight: 'var(--nav-lh-primary)',
  },
};

export function TextLink({
  children,
  href,
  onClick,
  size = 'sm',
  icon,
  active = false,
  className = '',
}: TextLinkProps) {
  const baseClasses = `
    inline-flex items-center gap-1
    font-nav font-normal
    transition-colors
    focus-visible:outline-none focus-visible:ring-2
    focus-visible:ring-[rgba(20,16,22,0.5)] focus-visible:ring-offset-2
    rounded-[3px]
    ${active ? 'text-[#b01f24]' : 'text-[#656565] hover:text-[#b01f24]'}
    ${className}
  `.trim();

  const style = sizeConfig[size];

  if (href) {
    return (
      <a href={href} className={baseClasses} style={style}>
        {icon && <span className="flex-shrink-0">{icon}</span>}
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseClasses} bg-transparent border-none cursor-pointer`}
      style={style}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
