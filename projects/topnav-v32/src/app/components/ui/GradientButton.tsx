/**
 * GradientButton Component
 * 
 * A button with gray gradient background and optional overlay effect.
 * Used for primary CTAs and form submissions.
 * 
 * @component
 * @example
 * ```tsx
 * <GradientButton onClick={handleSubmit}>
 *   Submit
 * </GradientButton>
 * <GradientButton type="submit" disabled={loading}>
 *   Connect now
 * </GradientButton>
 * ```
 * 
 * Features:
 * - Gray gradient background (left to right)
 * - Complex gradient overlay effect
 * - White text with bold weight
 * - Hover opacity transition
 * - Shadow effect
 * 
 * Design Specifications:
 * - Background: gradient-to-l from-[#656565] to-[#989898]
 * - Overlay: gradient-to-r with dark black tones
 * - Text: 12px DM Sans Bold, white
 * - Shadow: 0px 1px 30px -5px rgba(128,108,224,0.2)
 * - Border radius: 10px
 * - Padding: 12px horizontal, 7.25px/8px vertical
 */

interface GradientButtonProps {
  /** Button content */
  children: React.ReactNode;
  /** Click handler */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** Button type */
  type?: 'button' | 'submit' | 'reset';
  /** Disabled state */
  disabled?: boolean;
  /** Custom CSS classes */
  className?: string;
}

export function GradientButton({ 
  children, 
  onClick,
  type = 'button',
  disabled = false,
  className = ''
}: GradientButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`bg-gradient-to-l content-stretch flex from-[#656565] items-start overflow-hidden pb-[8px] pt-[7.25px] px-[12px] relative rounded-[10px] shadow-[0px_1px_30px_-5px_rgba(128,108,224,0.2)] shrink-0 to-[#989898] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {/* Background Gradient Overlay */}
      <div className="absolute bg-gradient-to-r from-[#141016] inset-[0_-102px_0_0] to-[#141016] via-[#656565] via-[50.384%]" />
      
      {/* Text Content */}
      <div className="content-stretch flex flex-col items-start relative shrink-0 z-10">
        <div 
          className="flex flex-col font-nav font-bold justify-center leading-[0] relative shrink-0 text-[12px] text-white whitespace-nowrap"
          style={{ fontVariationSettings: "'opsz' 14" }}
        >
          <p className="leading-[14.4px]">{children}</p>
        </div>
      </div>
    </button>
  );
}