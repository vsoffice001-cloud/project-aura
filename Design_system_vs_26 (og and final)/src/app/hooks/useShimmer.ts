import { useState } from 'react';

/**
 * useShimmer Hook
 * 
 * Manages shimmer effect hover state for buttons and interactive elements.
 * Part of the VS Design System's signature interaction patterns.
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
export function useShimmer(duration: number = 700) {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  return {
    isHovering,
    handleMouseEnter,
    handleMouseLeave,
    duration,
  };
}
