import { useState } from 'react';

/**
 * useShimmer Hook
 * 
 * Manages shimmer effect hover state for buttons and interactive elements.
 * Part of the VS Design System's signature interaction patterns.
 * 
 * Design System Context:
 * - Shimmer effect is ALWAYS active on all buttons (brand signature)
 * - Right-to-left sweep animation on hover
 * - 700ms default duration (can be customized)
 * - Respects prefers-reduced-motion
 * 
 * Benefits:
 * - Centralized hover state logic
 * - Reusable across Button, CTALink, and other interactive components
 * - Consistent timing and behavior
 * - Easy to test and maintain
 * 
 * @param duration - Animation duration in milliseconds (default: 700ms)
 * @returns Object containing hover state and handlers
 * 
 * @example
 * ```tsx
 * const { isHovering, handleMouseEnter, handleMouseLeave } = useShimmer(700);
 * 
 * <button 
 *   onMouseEnter={handleMouseEnter}
 *   onMouseLeave={handleMouseLeave}
 * >
 *   {isHovering && <div className="shimmer-effect" />}
 * </button>
 * ```
 */

export interface UseShimmerReturn {
  isHovering: boolean;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
}

export function useShimmer(duration: number = 700): UseShimmerReturn {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return {
    isHovering,
    handleMouseEnter,
    handleMouseLeave,
  };
}
