import { ReactNode } from 'react';

/**
 * InlineLink — Ken Bold DS v3.2
 *
 * The lowest tier of the link hierarchy: Button → CTALink → InlineLink
 * Used for links within paragraph text — subtle underline, brand-red on hover.
 *
 * Usage:
 *   <p>Read the <InlineLink href="/methodology">full methodology</InlineLink> for details.</p>
 *   <InlineLink onClick={handleClick} onDark>Learn more</InlineLink>
 */

interface InlineLinkProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  onDark?: boolean;
  className?: string;
}

export function InlineLink({
  children,
  onClick,
  href,
  onDark = false,
  className = '',
}: InlineLinkProps) {
  const baseClass = `
    inline transition-colors duration-200 cursor-pointer
    border-b border-current
    ${onDark
      ? 'text-white/70 hover:text-white border-white/20 hover:border-white/50'
      : 'text-black/60 hover:text-[var(--brand-red)] border-black/15 hover:border-[rgba(176,31,36,0.4)]'
    }
    ${className}
  `.trim();

  if (href) {
    return (
      <a href={href} className={baseClass} style={{ fontSize: 'inherit' }}>
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={baseClass}
      style={{ fontSize: 'inherit' }}
    >
      {children}
    </button>
  );
}