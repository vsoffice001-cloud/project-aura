/**
 * Card Component
 * 
 * A flexible base card component with consistent styling.
 * Provides background, border, shadow, and rounded corners.
 * 
 * @component
 * @example
 * ```tsx
 * <Card>Content here</Card>
 * <Card variant="light" padding="p-6">Custom padding</Card>
 * <Card shadow="shadow-lg">More shadow</Card>
 * ```
 * 
 * Features:
 * - Multiple background variants
 * - Configurable padding, shadow, border
 * - Rounded corners (15px default)
 * - Overflow control
 * 
 * Design Specifications:
 * - Default background: #fcfcfc
 * - Border: 0.5px rgba(20,16,22,0.1)
 * - Border radius: 15px
 * - Padding: 24px (default)
 */

interface CardProps {
  /** Card content */
  children: React.ReactNode;
  /** Background variant */
  variant?: 'white' | 'light' | 'gray';
  /** Padding class (default: p-[24px]) */
  padding?: string;
  /** Shadow class */
  shadow?: string;
  /** Whether to show border (default: true) */
  showBorder?: boolean;
  /** Custom CSS classes */
  className?: string;
}

export function Card({ 
  children, 
  variant = 'light',
  padding = 'p-[24px]',
  shadow,
  showBorder = true,
  className = ''
}: CardProps) {
  // Background colors
  const backgrounds = {
    white: 'bg-white',
    light: 'bg-[#fcfcfc]',
    gray: 'bg-[#f7f7f7]',
  };

  return (
    <div className={`${backgrounds[variant]} relative rounded-[15px] shrink-0 w-full ${className}`}>
      {/* Border Overlay */}
      {showBorder && (
        <div 
          aria-hidden="true" 
          className={`absolute border-[0.5px] border-[rgba(20,16,22,0.1)] border-solid inset-0 pointer-events-none rounded-[15px] ${shadow || ''}`}
        />
      )}
      
      {/* Content */}
      <div className={`relative ${padding}`}>
        {children}
      </div>
    </div>
  );
}
