/**
 * FadeOverlay Component
 * 
 * A gradient overlay used to indicate scrollable content.
 * Commonly used at edges of scrollable containers to show there's more content.
 * 
 * @component
 * @example
 * ```tsx
 * <FadeOverlay direction="top" visible={showTopFade} />
 * <FadeOverlay direction="bottom" visible={showBottomFade} />
 * <FadeOverlay direction="right" visible={true} />
 * <FadeOverlay direction="left" visible={true} />
 * ```
 * 
 * Features:
 * - Smooth fade in/out animation
 * - Configurable direction (top, bottom, left, right)
 * - Controlled visibility
 * - Pointer events disabled (doesn't block interactions)
 * 
 * Design Specifications:
 * - Width (vertical): Full width with configurable height
 * - Height (horizontal): Full height with configurable width
 * - Gradient: Fades from white/95 to transparent
 * - Transition: 200ms opacity animation
 * - Position: Absolute with z-index 10
 */

import { motion } from 'motion/react';

interface FadeOverlayProps {
  /** Direction of the fade gradient */
  direction: 'top' | 'bottom' | 'left' | 'right';
  /** Controls visibility with smooth animation */
  visible: boolean;
  /** Size of the fade area (default: 48px for vertical, 80px for horizontal) */
  size?: string;
  /** Custom z-index (default: 10) */
  zIndex?: number;
  /** Background color to fade from (default: white/95) */
  fromColor?: string;
}

export function FadeOverlay({ 
  direction, 
  visible, 
  size,
  zIndex = 10,
  fromColor = 'white/95'
}: FadeOverlayProps) {
  // Default sizes
  const defaultSize = direction === 'left' || direction === 'right' ? 'w-20' : 'h-12';
  const sizeClass = size || defaultSize;

  // Position classes
  const positionClasses = {
    top: 'top-0 left-0 right-0',
    bottom: 'bottom-0 left-0 right-0',
    left: 'left-0 top-0 bottom-0',
    right: 'right-0 top-0 bottom-0',
  };

  // Gradient direction classes
  const gradientClasses = {
    top: 'bg-gradient-to-b',
    bottom: 'bg-gradient-to-t',
    left: 'bg-gradient-to-r',
    right: 'bg-gradient-to-l',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
      className={`absolute ${positionClasses[direction]} ${sizeClass} ${gradientClasses[direction]} from-${fromColor} to-transparent pointer-events-none`}
      style={{ zIndex }}
    />
  );
}
