/**
 * VerticalDivider Component
 * 
 * A simple vertical line divider for separating content sections.
 * 
 * @component
 * @example
 * ```tsx
 * <VerticalDivider />
 * <VerticalDivider height="h-full" />
 * <VerticalDivider color="bg-gray-300" />
 * ```
 * 
 * Features:
 * - Minimal 1px width
 * - Configurable height and color
 * - Shrink-0 to prevent flex compression
 * 
 * Design Specifications:
 * - Default color: #e6e6e6
 * - Default height: h-[456px]
 * - Width: 1px (w-px)
 */

interface VerticalDividerProps {
  /** Height class (default: h-[456px]) */
  height?: string;
  /** Background color class (default: bg-[#e6e6e6]) */
  color?: string;
  /** Custom CSS classes */
  className?: string;
}

export function VerticalDivider({ 
  height = 'h-[456px]', 
  color = 'bg-[#e6e6e6]',
  className = ''
}: VerticalDividerProps) {
  return (
    <div 
      className={`${color} ${height} shrink-0 w-px ${className}`}
      aria-hidden="true"
    />
  );
}
