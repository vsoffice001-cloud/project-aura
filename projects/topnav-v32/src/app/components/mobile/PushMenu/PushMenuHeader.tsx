/**
 * PushMenuHeader - Navigation Header with Back Button
 * 
 * Features:
 * - Logo / Back button (conditional)
 * - Title with animation
 * - Close button
 * - Breadcrumb navigation (when deep)
 * - Gradient border bottom
 */

import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, X } from 'lucide-react';
import { Haptics } from '../animations/transitions';
import LogoContainer from '../../../../imports/LogoContainer';

interface PushMenuHeaderProps {
  title: string;
  breadcrumb: string[];
  canGoBack: boolean;
  onBack: () => void;
  onClose: () => void;
  onBreadcrumbClick: (index: number) => void;
}

export function PushMenuHeader({ 
  title, 
  breadcrumb, 
  canGoBack, 
  onBack, 
  onClose,
  onBreadcrumbClick 
}: PushMenuHeaderProps) {
  return (
    <div className="relative bg-white" style={{
      borderBottom: '2px solid transparent',
      backgroundImage: 'linear-gradient(white, white), linear-gradient(90deg, #806ce0, #b01f24)',
      backgroundOrigin: 'border-box',
      backgroundClip: 'padding-box, border-box'
    }}>
      <div className="h-[64px] px-5 flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {canGoBack ? (
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                Haptics.light();
                onBack();
              }}
              className="
                size-[40px] rounded-[10px] flex-shrink-0
                bg-[#f5f3ff]
                flex items-center justify-center
                border border-[rgba(128,108,224,0.1)]
                hover:border-[#806ce0]
                hover:shadow-[0px_2px_8px_0px_rgba(128,108,224,0.15)]
                active:shadow-[0px_1px_4px_0px_rgba(128,108,224,0.1)]
                transition-all duration-150
                touch-manipulation
              "
              aria-label="Go back"
            >
              <motion.div
                animate={{ x: [-2, 0, -2] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowLeft className="size-[18px] text-[#141016]" strokeWidth={2.5} />
              </motion.div>
            </motion.button>
          ) : (
            <div className="h-[20px] w-[152px] flex items-center">
              <LogoContainer />
            </div>
          )}
          
          {/* Title and Breadcrumb Container */}
          <div className="flex-1 min-w-0 flex flex-col gap-0.5">
            {/* Breadcrumb (if deeper than level 1) - shown above title */}
            {breadcrumb.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: -3 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-1.5 text-[11px] font-medium overflow-x-auto scrollbar-hide"
              >
                {breadcrumb.slice(0, -1).map((crumb, index) => (
                  <div key={index} className="flex items-center gap-1.5 flex-shrink-0">
                    {index > 0 && <span className="text-[#ccc]">/</span>}
                    <button
                      onClick={() => {
                        Haptics.selection();
                        onBreadcrumbClick(index);
                      }}
                      className="
                        text-[#999999] hover:text-[#806ce0] transition-colors 
                        whitespace-nowrap touch-manipulation
                      "
                    >
                      {crumb}
                    </button>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Title - Only show if there's a back button (not on main menu) */}
            {canGoBack && (
              <AnimatePresence mode="wait">
                <motion.h2
                  key={title}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="
                    font-nav text-[16px] font-semibold text-[#141016]
                    truncate
                  "
                >
                  {title}
                </motion.h2>
              </AnimatePresence>
            )}
          </div>
        </div>

        {/* Right side: Close button */}
        <motion.button
          whileTap={{ scale: 0.95, rotate: 90 }}
          onClick={() => {
            Haptics.light();
            onClose();
          }}
          className="
            size-[40px] rounded-[10px] flex-shrink-0
            bg-[#f5f3ff]
            flex items-center justify-center
            border border-[rgba(128,108,224,0.1)]
            hover:border-[#b01f24]
            hover:shadow-[0px_2px_8px_0px_rgba(176,31,36,0.15)]
            active:shadow-[0px_1px_4px_0px_rgba(176,31,36,0.1)]
            transition-all duration-150
            touch-manipulation
          "
          aria-label="Close menu"
        >
          <X className="size-[18px] text-[#141016]" strokeWidth={2.5} />
        </motion.button>
      </div>
    </div>
  );
}