export interface SkipLinkProps {
  /** ID of the element to skip to (without #). Default: 'main-content' */
  targetId?: string;
  label?: string;
}

/**
 * SkipLink — WCAG 2.1 Level A skip-to-content link.
 *
 * Visually hidden until focused via keyboard (Tab); appears as white badge top-left.
 * Mount as first focusable element in every layout template.
 *
 * @promotedFrom topnav-v32/src/design-system/components/SkipLink.tsx
 */
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
        focus:bg-[var(--color-foundation-white)] focus:text-[var(--surface-text)]
        focus:px-4 focus:py-2 focus:rounded-md focus:shadow-[var(--shadow-lg)]
        focus:outline-none focus:ring-2 focus:ring-[rgba(20,16,22,0.5)]
        focus-visible:ring-offset-2
        font-[var(--typography-family-body)] font-bold
        text-[var(--typography-size-nav-primary)] leading-[var(--typography-line-height-nav-primary)]
      "
    >
      {label}
    </a>
  );
}
