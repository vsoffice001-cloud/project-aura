/**
 * ANIMATED ARROW COMPONENT
 * =========================
 * 
 * Simple 2-arrow replacement animation for 45-degree arrows (ArrowUpRight).
 * On hover, the 2nd arrow smoothly replaces the 1st arrow.
 * 
 * USAGE:
 * ------
 * <AnimatedArrow size={20} color="currentColor" duration={300} />
 * 
 * PROPS:
 * ------
 * - size: Icon size in pixels (default: 20)
 * - color: Icon color (default: "currentColor" - inherits parent color)
 * - strokeWidth: Icon stroke width (default: 2)
 * - duration: Animation duration in ms (default: 300)
 * - className: Additional CSS classes
 * - isHovered: Parent can control hover state (default: false)
 * 
 * ANIMATION LOGIC:
 * ----------------
 * Arrow 1: Visible by default → On hover: exits top-right (translate 20px diagonal)
 * Arrow 2: Hidden bottom-left (translate -20px diagonal) → On hover: enters to center
 * 
 * Both arrows use opacity + transform for smooth transition.
 */

import { ArrowUpRight } from 'lucide-react';
import { CSSProperties, useState } from 'react';

export interface AnimatedArrowProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  duration?: number;
  className?: string;
  isHovered?: boolean; // NEW: Parent can control hover state
}

export function AnimatedArrow({
  size = 20,
  color = 'currentColor',
  strokeWidth = 2,
  duration = 300,
  className = '',
  isHovered = false // NEW: Default to false
}: AnimatedArrowProps) {
  const [internalHovered, setInternalHovered] = useState(false);
  
  // Use parent hover state if provided, otherwise use internal hover
  const shouldAnimate = isHovered || internalHovered;
  
  const containerStyle: CSSProperties = {
    width: size,
    height: size,
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0 // Prevent shrinking
  };

  // Arrow 1: Default visible, exits top-right when shouldAnimate
  const arrow1Style: CSSProperties = {
    position: 'absolute',
    color: color,
    transition: `opacity ${duration}ms cubic-bezier(0.4, 0, 0.2, 1), transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
    opacity: shouldAnimate ? 0 : 1,
    transform: shouldAnimate ? 'translate(20px, -20px)' : 'translate(0, 0)'
  };

  // Arrow 2: Hidden bottom-left, enters center when shouldAnimate
  const arrow2Style: CSSProperties = {
    position: 'absolute',
    color: color,
    transition: `opacity ${duration}ms cubic-bezier(0.4, 0, 0.2, 1), transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
    opacity: shouldAnimate ? 1 : 0,
    transform: shouldAnimate ? 'translate(0, 0)' : 'translate(-20px, 20px)'
  };

  return (
    <span 
      className={`animated-arrow-container ${className}`}
      style={containerStyle}
      onMouseEnter={() => setInternalHovered(true)}
      onMouseLeave={() => setInternalHovered(false)}
    >
      {/* Arrow 1: Default visible, exits top-right on hover */}
      <ArrowUpRight
        size={size}
        strokeWidth={strokeWidth}
        style={arrow1Style}
      />
      
      {/* Arrow 2: Hidden bottom-left, enters center on hover */}
      <ArrowUpRight
        size={size}
        strokeWidth={strokeWidth}
        style={arrow2Style}
      />
    </span>
  );
}

/**
 * USAGE EXAMPLES:
 * ===============
 * 
 * Example 1: Default usage
 * ------------------------
 * <AnimatedArrow />
 * 
 * Example 2: Custom size and color
 * ---------------------------------
 * <AnimatedArrow size={24} color="#b01f24" />
 * 
 * Example 3: In a button
 * ----------------------
 * <button className="flex items-center gap-2">
 *   Learn More
 *   <AnimatedArrow size={18} />
 * </button>
 * 
 * Example 4: As a standalone link indicator
 * ------------------------------------------
 * <a href="#" className="inline-flex items-center gap-2 text-brand-red hover:underline">
 *   View Case Study
 *   <AnimatedArrow size={20} color="#b01f24" />
 * </a>
 * 
 * Example 5: Custom animation duration
 * -------------------------------------
 * <AnimatedArrow size={20} duration={500} />
 * 
 * Example 6: Inherit parent color
 * --------------------------------
 * <div className="text-blue-600">
 *   <AnimatedArrow size={16} color="currentColor" />
 * </div>
 */