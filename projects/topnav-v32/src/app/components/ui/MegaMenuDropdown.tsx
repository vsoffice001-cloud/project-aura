/**
 * MegaMenuDropdown Component
 * 
 * A reusable full-width dropdown wrapper for mega menu navigation.
 * Provides consistent animations, styling, and layout structure.
 * 
 * @component
 * @example
 * ```tsx
 * <MegaMenuDropdown isOpen={isOpen}>
 *   <DropdownSection title="Resources">
 *     <DropdownItem icon={<FileCheck />} label="Case Studies" href="..." />
 *   </DropdownSection>
 * </MegaMenuDropdown>
 * ```
 * 
 * Features:
 * - Smooth slide-down animation (300ms)
 * - AnimatePresence for exit animations
 * - Full-width or rounded variants
 * - Backdrop blur overlay with dark shade for depth hierarchy
 * - Purple-tinted shadow
 * - Max-width container (1200px)
 * - Loading skeleton support
 * 
 * Design Specifications:
 * - Animation: opacity 0→1, y: -10→0 (300ms ease)
 * - Background: solid white (#ffffff)
 * - Backdrop: rgba(0,0,0,0.15) with blur-md for visual depth and dark shade
 * - Shadow: 0px 8px 30px -5px rgba(128,108,224,0.25)
 * - Padding: px-6 py-8 (inner container)
 * - Full-width variant: border-top, straight edges
 * - Rounded variant: border wrapper, rounded-[15px]
 */

import { motion, AnimatePresence } from 'motion/react';

interface MegaMenuDropdownProps {
  /** Whether the dropdown is visible */
  isOpen: boolean;
  /** Children content to display inside */
  children: React.ReactNode;
  /** Variant style - full-width for main nav, rounded for sub-menus */
  variant?: 'full-width' | 'rounded';
  /** Additional CSS classes */
  className?: string;
  /** Callback when exit animation completes */
  onExitComplete?: () => void;
  /** Loading state for skeleton display */
  isLoading?: boolean;
}

export function MegaMenuDropdown({ 
  isOpen, 
  children, 
  variant = 'full-width',
  className = '',
  onExitComplete,
  isLoading = false
}: MegaMenuDropdownProps) {
  
  // Full-width variant (Services, Resources)
  if (variant === 'full-width') {
    return (
      <AnimatePresence onExitComplete={onExitComplete}>
        {isOpen && (
          <>
            {/* Dark backdrop overlay with blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="fixed inset-0 bg-black/15 backdrop-blur-sm z-40"
              aria-hidden="true"
            />

            {/* Dropdown content - solid white */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className={`
                absolute left-0 right-0 top-full
                bg-white
                shadow-[0px_8px_30px_-5px_rgba(128,108,224,0.25)]
                border-t border-gray-100
                z-50
                ${className}
              `}
            >
              {/* Responsive max-width container with generous padding */}
              <div className="nav-container py-8">
                {children}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }
  
  // Rounded variant (Industries)
  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className={`
            absolute left-0 top-full mt-2
            bg-white rounded-[15px] 
            shadow-[0px_8px_30px_-5px_rgba(128,108,224,0.25)]
            overflow-hidden
            ${className}
          `}
        >
          {/* Border */}
          <div 
            aria-hidden="true" 
            className="absolute border border-[rgba(20,16,22,0.1)] border-solid inset-0 pointer-events-none rounded-[15px]" 
          />
          
          {/* Content */}
          <div className="relative py-8 px-6">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}