import { ArrowUpRight } from 'lucide-react';
import { CSSProperties, useState } from 'react';

export interface AnimatedArrowProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  duration?: number;
  className?: string;
  isHovered?: boolean;
}

export function AnimatedArrow({
  size = 20,
  color = 'currentColor',
  strokeWidth = 2,
  duration = 300,
  className = '',
  isHovered = false
}: AnimatedArrowProps) {
  const [internalHovered, setInternalHovered] = useState(false);
  const shouldAnimate = isHovered || internalHovered;

  const containerStyle: CSSProperties = {
    width: size,
    height: size,
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  };

  const arrow1Style: CSSProperties = {
    position: 'absolute',
    color: color,
    transition: `opacity ${duration}ms cubic-bezier(0.4, 0, 0.2, 1), transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
    opacity: shouldAnimate ? 0 : 1,
    transform: shouldAnimate ? 'translate(20px, -20px)' : 'translate(0, 0)'
  };

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
      <ArrowUpRight size={size} strokeWidth={strokeWidth} style={arrow1Style} />
      <ArrowUpRight size={size} strokeWidth={strokeWidth} style={arrow2Style} />
    </span>
  );
}
