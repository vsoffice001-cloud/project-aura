/**
 * FloatingVariantSwitcher — Design System VS 26 Molecule
 *
 * Reusable floating dropdown for switching section style variants.
 * Extracted from 4× duplicated pattern in Hero, Slideshow, SlideshowDark, and CTA.
 *
 * Features:
 * - Palette icon trigger with animated chevron
 * - Dropdown menu with active/inactive option styling
 * - Outside-click-to-close behavior
 * - Light/dark trigger color schemes
 * - Motion entrance/exit animations
 *
 * @example
 * <FloatingVariantSwitcher
 *   options={[{ key: 'light', label: 'Light' }, { key: 'dark', label: 'Dark Premium' }]}
 *   activeKey="light"
 *   onSelect={(key) => setVariant(key)}
 * />
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Palette } from 'lucide-react';

export interface VariantOption {
  key: string;
  label: string;
}

export interface FloatingVariantSwitcherProps {
  /** Available variant options */
  options: VariantOption[];
  /** Currently active variant key */
  activeKey: string;
  /** Called when user selects a variant */
  onSelect: (key: string) => void;
  /** Trigger button color scheme */
  colorScheme?: 'light' | 'dark';
  /** Menu header title */
  menuTitle?: string;
  /** Menu dropdown width class */
  menuWidth?: string;
  /** Container positioning className */
  position?: string;
  /** Entrance animation delay in seconds */
  delay?: number;
}

export function FloatingVariantSwitcher({
  options,
  activeKey,
  onSelect,
  colorScheme = 'light',
  menuTitle = 'Section Style',
  menuWidth = 'w-52',
  position = 'absolute top-0 right-4 z-20 hidden sm:block',
  delay = 0.5,
}: FloatingVariantSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Outside-click-to-close
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const isDark = colorScheme === 'dark';

  return (
    <motion.div
      ref={containerRef}
      className={position}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <div className="relative">
        {/* Trigger Button */}
        <motion.button
          onClick={() => setIsOpen((o) => !o)}
          className={`flex items-center gap-2 px-4 py-2 rounded-[5px] backdrop-blur-md border shadow-lg hover:shadow-xl transition-all duration-200 ${
            isDark
              ? 'bg-white/10 border-white/20 hover:bg-white/15'
              : 'bg-white/90 border-black/10 hover:bg-white'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Palette className="h-4 w-4 text-[var(--purple-600)]" />
          <span
            className={`text-[0.875rem] font-medium ${
              isDark ? 'text-white' : 'text-black'
            }`}
          >
            Style
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="ml-1"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              className={isDark ? 'text-white/50' : 'text-[var(--black-500)]'}
            >
              <path
                d="M3 4.5L6 7.5L9 4.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </motion.button>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`absolute top-full right-0 mt-2 ${menuWidth} rounded-[10px] bg-white/95 backdrop-blur-md border border-black/10 shadow-2xl overflow-hidden`}
            >
              <div className="p-2 space-y-1">
                <div className="px-3 py-2 text-[0.75rem] font-medium text-[var(--black-500)] uppercase tracking-wide">
                  {menuTitle}
                </div>
                {options.map((option) => {
                  const isActive = activeKey === option.key;
                  return isActive ? (
                    <div
                      key={option.key}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-[5px] bg-[var(--purple-600)] text-white shadow-md"
                    >
                      <span className="text-[0.875rem] font-medium">
                        {option.label}
                      </span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M13.3333 4L6 11.3333L2.66667 8"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  ) : (
                    <motion.button
                      key={option.key}
                      onClick={() => {
                        onSelect(option.key);
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-[5px] text-left text-black hover:bg-black/5 transition-all duration-200"
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-[0.875rem] font-medium">
                        {option.label}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}