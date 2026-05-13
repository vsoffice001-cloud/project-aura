/**
 * BaseDropdown Component
 * 
 * A reusable full-width mega menu dropdown wrapper providing consistent
 * navigation experience across all major dropdowns.
 * 
 * Design Specifications:
 * - Position: absolute left-0 right-0 top-full (full-width)
 * - Background: white/95 with backdrop-blur-md
 * - Shadow: 0px 8px 30px -5px rgba(128,108,224,0.25)
 * - Border: top border with gray-100
 * - Container: max-w-[1200px] mx-auto px-6 py-8
 * - Animation: slide-down with fade (300ms ease-in-out)
 * - Z-index: z-50 (above content, below modals)
 * 
 * @component
 * @example
 * ```tsx
 * <BaseDropdown isOpen={isOpen}>
 *   <YourDropdownContent />
 * </BaseDropdown>
 * ```
 * 
 * Usage:
 * - Services dropdown ✅
 * - Industries dropdown ✅
 * - Resources dropdown ✅
 * - Any future dropdown with many items
 */

import { motion, AnimatePresence } from 'motion/react';

interface BaseDropdownProps {
  /** Controls visibility of the dropdown */
  isOpen: boolean;
  /** Dropdown content */
  children: React.ReactNode;
  /** Optional callback when dropdown exits */
  onExitComplete?: () => void;
  /** Additional CSS classes */
  className?: string;
}

export function BaseDropdown({ 
  isOpen, 
  children, 
  onExitComplete,
  className = '' 
}: BaseDropdownProps) {
  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ 
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1] // ease-in-out bezier curve
          }}
          className={`
            absolute left-0 right-0 top-full
            bg-white/95 backdrop-blur-md 
            shadow-[0px_8px_30px_-5px_rgba(128,108,224,0.25)]
            border-t border-gray-100
            z-50
            ${className}
          `}
        >
          {/* Max-width container for centered content */}
          <div className="max-w-[1200px] mx-auto px-6 py-8">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
