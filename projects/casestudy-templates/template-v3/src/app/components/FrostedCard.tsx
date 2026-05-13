import { ReactNode, CSSProperties } from 'react';

// ═══════════════════════════════════════════════════════════════════════════
// TYPE DEFINITIONS
// ═══════════════════════════════════════════════════════════════════════════

export interface FrostedCardProps {
  /** Content to render inside the card */
  children: ReactNode;
  
  /** 
   * Blur intensity - accepts Tailwind presets OR custom CSS values
   * 
   * Tailwind Presets: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
   * Custom Values: '50px', '45px', '100px', etc.
   * 
   * Examples:
   * - blurIntensity="md" → Uses Tailwind backdrop-blur-md (12px)
   * - blurIntensity="50px" → Uses exact 50px blur (custom value)
   * - blurIntensity="3xl" → Uses Tailwind backdrop-blur-3xl (64px)
   */
  blurIntensity?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | string;
  
  /** Background color with opacity (e.g., 'rgba(255, 255, 255, 0.9)') */
  background?: string;
  
  /** Border color with opacity (e.g., 'rgba(0, 0, 0, 0.1)') */
  borderColor?: string;
  
  /** Border radius - uses your design system values */
  borderRadius?: '2.5px' | '5px' | '10px';
  
  /** Padding - uses Tailwind spacing */
  padding?: string;
  
  /** Optional shadow - uses Tailwind shadow classes */
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  
  /** Enable frosted glass effect (backdrop blur) */
  frosted?: boolean;
  
  /** Additional CSS classes */
  className?: string;
  
  /** Additional inline styles */
  style?: CSSProperties;
  
  /** z-index for content layer */
  contentZIndex?: number;
}

// ═══════════════════════════════════════════════════════════════════════════
// FROSTED CARD COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

/**
 * FrostedCard - Reusable frosted glass effect card component
 * 
 * Uses the same technique as the variant switcher:
 * - backdrop-blur for frosted glass effect
 * - Semi-transparent background
 * - Proper z-index layering
 * 
 * Can be used for both overlaid cards (desktop) and solid cards (mobile)
 * by toggling the frosted prop.
 * 
 * USAGE EXAMPLES:
 * 
 * 1. Classic 50px Blur (Premium Editorial):
 * <FrostedCard blurIntensity="50px" frosted={true}>
 *   <p>Your content here</p>
 * </FrostedCard>
 * 
 * 2. Tailwind Preset (Medium Blur):
 * <FrostedCard blurIntensity="md" frosted={true}>
 *   <p>Your content here</p>
 * </FrostedCard>
 * 
 * 3. Solid Card (No Blur):
 * <FrostedCard frosted={false} shadow="sm">
 *   <p>Your content here</p>
 * </FrostedCard>
 * 
 * 4. Custom Blur with Dark Theme:
 * <FrostedCard 
 *   blurIntensity="75px"
 *   background="rgba(26, 26, 26, 0.9)"
 *   borderColor="rgba(255, 255, 255, 0.15)"
 * >
 *   <p>Your content here</p>
 * </FrostedCard>
 */
export function FrostedCard({
  children,
  blurIntensity = 'md',
  background = 'rgba(255, 255, 255, 0.9)',
  borderColor = 'rgba(0, 0, 0, 0.1)',
  borderRadius = '5px',
  padding = 'clamp(12px, 1.2vw, 16px)',
  shadow = 'xl',
  frosted = true,
  className = '',
  style = {},
  contentZIndex = 1,
}: FrostedCardProps) {
  
  // Map blur intensity to Tailwind classes
  const blurClasses: Record<string, string> = {
    'none': '',
    'sm': 'backdrop-blur-sm',
    'md': 'backdrop-blur-md',
    'lg': 'backdrop-blur-lg',
    'xl': 'backdrop-blur-xl',
    '2xl': 'backdrop-blur-2xl',
    '3xl': 'backdrop-blur-3xl',
  };
  
  // Map shadow to Tailwind classes
  const shadowClasses: Record<string, string> = {
    'none': '',
    'sm': 'shadow-sm',
    'md': 'shadow-md',
    'lg': 'shadow-lg',
    'xl': 'shadow-xl',
    '2xl': 'shadow-2xl',
  };

  // Detect if blurIntensity is a Tailwind preset or custom value
  const isTailwindPreset = blurIntensity in blurClasses;
  const isCustomBlur = !isTailwindPreset && blurIntensity !== 'none';
  
  // Use Tailwind class only for presets, inline style for custom values
  const blurClass = frosted && isTailwindPreset ? blurClasses[blurIntensity] : '';
  const shadowClass = shadowClasses[shadow];
  
  // Get blur pixel value for inline styles
  const blurPxValue = isCustomBlur ? blurIntensity : getBlurPx(blurIntensity);

  return (
    <div
      className={`relative overflow-hidden ${shadowClass} ${className}`}
      style={{
        borderRadius,
        padding,
        border: `1px solid ${borderColor}`,
        ...style,
      }}
    >
      {/* Backdrop blur layer - creates frosted glass effect */}
      {frosted && (
        <div
          className={blurClass}
          style={{
            position: 'absolute',
            inset: 0,
            background: background,
            zIndex: 0,
            // Apply inline backdrop-filter for custom values or as fallback
            backdropFilter: isCustomBlur ? `blur(${blurIntensity})` : undefined,
            WebkitBackdropFilter: blurIntensity !== 'none' ? `blur(${blurPxValue})` : 'none',
          }}
        />
      )}
      
      {/* Solid background layer - for non-frosted cards */}
      {!frosted && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: background,
            zIndex: 0,
          }}
        />
      )}

      {/* Content layer - positioned above backdrop */}
      <div style={{ position: 'relative', zIndex: contentZIndex }}>
        {children}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Convert blur intensity to pixel values for WebKit fallback
 */
function getBlurPx(intensity: string): string {
  const blurMap: Record<string, string> = {
    'sm': '4px',
    'md': '12px',
    'lg': '16px',
    'xl': '24px',
    '2xl': '40px',
    '3xl': '64px',
  };
  return blurMap[intensity] || '12px';
}

// ═══════════════════════════════════════════════════════════════════════════
// PRESET VARIANTS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Preset variant configurations for common use cases
 */
export const FrostedCardPresets = {
  /** Light frosted glass - for overlaying on dark images */
  lightFrosted: {
    background: 'rgba(255, 255, 255, 0.9)',
    borderColor: 'rgba(0, 0, 0, 0.12)',
    frosted: true,
  },
  
  /** Dark frosted glass - for overlaying on light images */
  darkFrosted: {
    background: 'rgba(26, 26, 26, 0.9)',
    borderColor: 'rgba(255, 255, 255, 0.15)',
    frosted: true,
  },
  
  /** Solid light - for mobile/non-overlaid cards */
  lightSolid: {
    background: 'rgba(255, 255, 255, 1)',
    borderColor: 'rgba(0, 0, 0, 0.1)',
    frosted: false,
    shadow: 'sm' as const,
  },
  
  /** Solid dark - for mobile/non-overlaid cards */
  darkSolid: {
    background: 'rgba(26, 26, 26, 1)',
    borderColor: 'rgba(255, 255, 255, 0.15)',
    frosted: false,
    shadow: 'sm' as const,
  },
  
  /** Subtle frosted - less blur for minimal effect */
  subtleFrosted: {
    background: 'rgba(255, 255, 255, 0.85)',
    borderColor: 'rgba(0, 0, 0, 0.08)',
    blurIntensity: 'sm' as const,
    frosted: true,
  },
  
  /** Classic frosted - 50px blur for premium editorial aesthetic (matches original design) */
  classicFrosted: {
    background: 'rgba(255, 255, 255, 0.9)',
    borderColor: 'rgba(0, 0, 0, 0.12)',
    blurIntensity: '50px',
    frosted: true,
  },
  
  /** Heavy frosted - maximum blur for strong effect */
  heavyFrosted: {
    background: 'rgba(255, 255, 255, 0.95)',
    borderColor: 'rgba(0, 0, 0, 0.15)',
    blurIntensity: '3xl' as const,
    frosted: true,
  },
} as const;