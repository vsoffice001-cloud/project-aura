/**
 * Divider — Horizontal or vertical separator line
 *
 * Design System primitive. Source of truth for all divider/separator usage.
 *
 * Promoted from: navbar/atoms/NavDivider.tsx
 * Consumed by:   Navbar (AuthPopover sections), Auth pages, Footer, Mega menus
 *
 * @example
 * <Divider />                          // Default horizontal, subtle
 * <Divider className="my-2" />         // With custom margin
 * <Divider orientation="vertical" />   // Vertical separator
 * <Divider variant="strong" />         // Visible divider (border-grey)
 */

interface DividerProps {
  /** Additional CSS classes (e.g. margins) */
  className?: string;
  /** Horizontal (default) or vertical */
  orientation?: 'horizontal' | 'vertical';
  /** 'subtle' = 6% opacity (popovers), 'strong' = border-grey #e6e6e6 (sections) */
  variant?: 'subtle' | 'strong';
}

const variantStyles = {
  subtle: 'bg-[rgba(20,16,22,0.06)]',
  strong: 'bg-[#e6e6e6]',
};

export function Divider({
  className = '',
  orientation = 'horizontal',
  variant = 'subtle',
}: DividerProps) {
  const isHorizontal = orientation === 'horizontal';

  return (
    <div
      className={`
        ${isHorizontal ? 'h-[1px] w-full' : 'w-[1px] h-full'}
        ${variantStyles[variant]}
        ${className}
      `.trim()}
      role="separator"
      aria-orientation={orientation}
      aria-hidden="true"
    />
  );
}
