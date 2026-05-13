import { ReactNode } from 'react';

/**
 * InlineLink Component
 * 
 * A subtle inline link for paragraph interlinking with brand red underline.
 * NO arrow animation - designed for natural reading flow within text content.
 * 
 * Design System Context:
 * - Lowest visual weight in the 3-tier link hierarchy
 * - Perfect for cross-referencing content within paragraphs
 * - Part of VS Design System's editorial aesthetic
 * 
 * Usage Guidelines:
 * ✅ Use for: Paragraph interlinking, cross-references, documentation links, subtle navigation
 * ❌ Don't use for: High-urgency CTAs, primary actions, standalone links
 * 
 * Visual Behavior:
 * - Default: Black text, brand red underline (always visible)
 * - Hover: Text turns red + warm-100 background appears
 * - NO urgency signals (no arrows, no gradient animations)
 * 
 * Accessibility:
 * - Underline always visible (not dependent on hover)
 * - Sufficient color contrast for WCAG AA
 * - Clear focus states for keyboard navigation
 * 
 * @param children - Link text content
 * @param href - Destination URL
 * @param className - Additional CSS classes
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
}

export function InlineLink({
  children,
  href,
  className = '',
}: InlineLinkProps) {
  return (
    <a
      href={href}
      className={`
        inline
        text-black
        underline decoration-[var(--brand-red)] decoration-1 underline-offset-2
        transition-all duration-200
        hover:text-[var(--brand-red)] hover:bg-[var(--warm-100)]
        focus:outline-none focus:ring-2 focus:ring-[var(--brand-red)] focus:ring-offset-2
        ${className}
      `}
    >
      {children}
    </a>
  );
}
