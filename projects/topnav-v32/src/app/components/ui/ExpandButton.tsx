/**
 * ExpandButton Component
 * 
 * An animated toggle button that transitions between plus (+) and X states.
 * Used for expandable UI elements like accordions and dropdown panels.
 * 
 * @component
 * @example
 * ```tsx
 * <ExpandButton 
 *   isExpanded={isOpen}
 *   onClick={() => setIsOpen(!isOpen)}
 * />
 * ```
 */

import { motion } from 'motion/react';

interface ExpandButtonProps {
  /** Whether the button is in expanded (X) state */
  isExpanded: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Button size */
  size?: 'sm' | 'md';
  /** Additional CSS classes */
  className?: string;
}

export function ExpandButton({ 
  isExpanded, 
  onClick, 
  size = 'sm',
  className = '' 
}: ExpandButtonProps) {
  const iconSize = size === 'sm' ? '12px' : '16px';
  
  return (
    <button
      onClick={onClick}
      className={`
        bg-white relative rounded-[10px] shrink-0
        transition-all duration-300 ease-in-out
        hover:shadow-[0px_1px_8px_-2px_rgba(128,108,224,0.3)]
        ${className}
      `}
      style={{ width: '20px', height: '20px' }}
      aria-label={isExpanded ? 'Collapse' : 'Expand'}
      aria-expanded={isExpanded}
    >
      <div className="content-stretch flex items-center justify-center p-[4px] relative rounded-[inherit] size-full">
        {/* Plus Icon with Rotation */}
        <motion.div
          className="size-[12px]"
          animate={{ rotate: isExpanded ? 90 : 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          <svg 
            className="block size-full" 
            fill="none" 
            preserveAspectRatio="none" 
            viewBox="0 0 12 12"
          >
            <g>
              <path 
                d="M6 2V10M2 6H10" 
                stroke="black" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </motion.div>
      </div>
      
      {/* Border */}
      <div 
        aria-hidden="true" 
        className="absolute border border-[rgba(20,16,22,0.1)] border-solid inset-0 pointer-events-none rounded-[10px]" 
      />
    </button>
  );
}
