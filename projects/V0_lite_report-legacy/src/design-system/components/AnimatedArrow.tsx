import { ArrowUpRight } from 'lucide-react';

/**
 * AnimatedArrow Component
 * 
 * A 2-arrow replacement animation system for urgency CTAs in the VS Design System.
 * On hover, the first arrow slides UP and fades out while the second arrow 
 * slides UP from below and fades in, creating a smooth replacement effect.
 * 
 * Design Principles:
 * - 2-arrow replacement system (exit arrow + enter arrow)
 * - Smooth 300ms transition with ease-out timing
 * - Color-aware (adapts to button variant)
 * - Motion-respect (respects prefers-reduced-motion)
 * - UP-RIGHT arrow (↗) for urgency and forward momentum
 * 
 * Usage Guidelines:
 * - ONLY for urgency CTAs (forms, checkout, page redirects with urgency)
 * - Combined with shimmer creates maximum engagement without being obnoxious
 * - NOT for general buttons (use icon prop or no icon instead)
 * 
 * @param size - Arrow icon size in pixels (matches button icon size)
 * @param color - Arrow color ('white' | 'black' | 'brand') - adapts to button variant
 * @param isHovered - Hover state from parent button
 */

export interface AnimatedArrowProps {
  size?: number;
  color?: 'white' | 'black' | 'brand';
  isHovered?: boolean;
}

export function AnimatedArrow({ 
  size = 20, 
  color = 'white',
  isHovered = false 
}: AnimatedArrowProps) {
  const colorClass = color === 'white' ? 'text-white' : color === 'brand' ? 'text-[var(--brand-red)]' : 'text-black';

  return (
    <span className="relative inline-block overflow-visible" style={{ width: size, height: size, verticalAlign: 'middle' }}>
      {/* Arrow 1 (Exit Arrow) - Slides UP-RIGHT diagonally and fades out on hover */}
      <ArrowUpRight
        size={size}
        strokeWidth={2}
        className={`
          absolute top-0 left-0
          transition-all duration-300 ease-out
          motion-reduce:transition-none
          ${colorClass}
          ${isHovered 
            ? 'translate-x-[150%] translate-y-[-150%] opacity-0' 
            : 'translate-x-0 translate-y-0 opacity-100'
          }
        `}
        style={{ display: 'block' }}
      />
      
      {/* Arrow 2 (Enter Arrow) - Slides UP-RIGHT diagonally from bottom-left and fades in on hover */}
      <ArrowUpRight
        size={size}
        strokeWidth={2}
        className={`
          absolute top-0 left-0
          transition-all duration-300 ease-out
          motion-reduce:transition-none
          ${colorClass}
          ${isHovered 
            ? 'translate-x-0 translate-y-0 opacity-100' 
            : 'translate-x-[-150%] translate-y-[150%] opacity-0'
          }
        `}
        style={{ display: 'block' }}
      />
    </span>
  );
}
