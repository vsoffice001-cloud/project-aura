/**
 * IndustryBadge — Atom-level wrapper
 *
 * Text-only industry/subcategory label used across all
 * card and listing layouts. No chip, no background — just text.
 */
import type { ReactNode } from "react";

interface IndustryBadgeProps {
  children: ReactNode;
  className?: string;
}

export function IndustryBadge({ children, className }: IndustryBadgeProps) {
  return (
    <span
      className={`block truncate uppercase ${className ?? ''}`}
      style={{
        fontSize: 'var(--text-xs)',
        color: 'rgba(0,0,0,0.4)',
        letterSpacing: '0.06em',
      }}
    >
      {children}
    </span>
  );
}