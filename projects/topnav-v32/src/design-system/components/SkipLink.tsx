/**
 * SkipLink — Accessibility skip-to-content link
 *
 * Design System primitive. WCAG 2.1 Level A requires a mechanism to bypass
 * repetitive navigation blocks. This component is visually hidden until
 * focused via keyboard (Tab), then appears as a white badge at top-left.
 *
 * Promoted from: navbar/atoms/SkipLink.tsx
 * Consumed by:   Every layout template (NavLayout, AuthLayout, etc.)
 *
 * @example
 * <SkipLink />                                    // Default: links to #main-content
 * <SkipLink targetId="content" label="Skip nav" /> // Custom target and label
 */

interface SkipLinkProps {
  /** ID of the element to skip to (without #). Default: 'main-content' */
  targetId?: string;
  /** Visible link text. Default: 'Skip to main content' */
  label?: string;
}

export function SkipLink({
  targetId = 'main-content',
  label = 'Skip to main content',
}: SkipLinkProps) {
  return (
    <a
      href={`#${targetId}`}
      className="
        sr-only focus:not-sr-only
        focus:absolute focus:top-2 focus:left-2 focus:z-[100]
        focus:bg-white focus:text-[#141016]
        focus:px-4 focus:py-2 focus:rounded-md focus:shadow-lg
        focus:outline-none focus:ring-2 focus:ring-[rgba(20,16,22,0.5)]
        focus-visible:ring-offset-2
        font-nav font-bold
      "
      style={{
        fontSize: 'var(--nav-primary-text)',
        lineHeight: 'var(--nav-lh-primary)',
      }}
    >
      {label}
    </a>
  );
}
