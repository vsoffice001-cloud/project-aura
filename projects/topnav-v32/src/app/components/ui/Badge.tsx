/**
 * Badge Component
 * 
 * A small pill-shaped badge for displaying status, labels, or categories.
 * Features a sophisticated very light purple background with shimmer effect.
 * 
 * @component
 * @example
 * ```tsx
 * <Badge>Popular</Badge>
 * <Badge variant="featured">FEATURED</Badge>
 * <Badge variant="neutral">White Paper</Badge>
 * ```
 * 
 * Features:
 * - Multiple variants (very light purple with shimmer, neutral grey)
 * - Animated shimmer effect on featured badges
 * - Compact size with proper padding
 * - Rounded corners (10px)
 * - Centered text
 * 
 * Variants:
 * - neutral: Light grey gradient background (default)
 * - featured: Very light purple gradient with animated shimmer effect
 * - latest: Same as featured (alias for consistency)
 * 
 * Design Specifications:
 * Neutral variant (default):
 * - Background: gradient-to-b from-[#f5f5f5] to-[#e8e8e8]
 * - Text: #141016
 * 
 * Featured/Latest variant:
 * - Background: Very light purple gradient from-[#faf8ff] to-[#f2efff]
 * - Text: Dark purple (#4a3a8e)
 * - Shimmer: Moving white gradient (transparent → white → transparent)
 * - Animation: 2.5s infinite sweep across badge
 * 
 * Common:
 * - Padding: 6px horizontal, 2px vertical
 * - Border radius: 10px
 * - Text: 10px DM Sans Regular, letter-spacing 0.2px
 * - Line height: 12px
 */

interface BadgeProps {
  /** The text content to display in the badge */
  children: React.ReactNode;
  /** Visual variant of the badge */
  variant?: 'neutral' | 'latest' | 'featured';
  /** Optional custom CSS classes */
  className?: string;
}

export function Badge({ children, variant = 'neutral', className = '' }: BadgeProps) {
  const isShimmer = variant === 'latest' || variant === 'featured';
  
  const variantClasses = {
    neutral: 'bg-gradient-to-b from-[#f5f5f5] to-[#e8e8e8] text-[#141016]',
    latest: 'bg-gradient-to-b from-[#faf8ff] to-[#f2efff] text-[#4a3a8e]',
    featured: 'bg-gradient-to-b from-[#faf8ff] to-[#f2efff] text-[#4a3a8e]',
  };

  return (
    <div 
      className={`flex flex-col items-center justify-center overflow-hidden px-[6px] py-[2px] relative rounded-[10px] shrink-0 ${variantClasses[variant]} ${className}`}
    >
      {/* Shimmer effect overlay for featured/latest variants */}
      {isShimmer && (
        <div 
          className="absolute inset-0 animate-shimmer"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 20%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.4) 80%, transparent 100%)',
          }}
        />
      )}
      
      <div className="flex flex-col items-start relative shrink-0 z-10">
        <div className="flex flex-col items-start relative shrink-0 w-full">
          <div 
            className="flex flex-col font-nav font-normal justify-center leading-[0] relative shrink-0 whitespace-nowrap"
            style={{ 
              fontSize: 'var(--nav-metadata)',
              lineHeight: 'var(--nav-lh-metadata)',
              letterSpacing: 'var(--nav-ls-wide)',
              fontVariationSettings: "'opsz' 9" 
            }}
          >
            <p style={{ lineHeight: 'var(--nav-lh-metadata)' }}>{children}</p>
          </div>
        </div>
      </div>
    </div>
  );
}