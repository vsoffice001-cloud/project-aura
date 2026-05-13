/**
 * MobileMenu — Full-screen mobile navigation drawer
 *
 * Slides in from right with backdrop blur. Contains all nav links,
 * secondary links (Procurement, Expert Panel, Company), auth actions,
 * and primary CTA. Proper touch targets (min 44px).
 */

import { useState } from 'react';
import { X, ChevronDown, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { iconColors } from '@/design-system/iconColors';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navSections = [
  { label: 'Reports', href: '#reports' },
  { label: 'Industries', href: '#industries' },
  { label: 'Surveys', href: '#surveys' },
  { label: 'Consulting', href: '#consulting' },
  { label: 'Insights', href: '#insights' },
];

const secondaryLinks = [
  { label: 'Procurement', href: '#procurement' },
  { label: 'Expert Panel', href: '#expert-panel' },
  { label: 'Company', href: '#company' },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 bottom-0 w-[85%] max-w-[360px] bg-white z-[70] overflow-y-auto shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--black-100)]">
              <h2 className="text-[1.25rem] font-medium text-black">Menu</h2>
              <button
                onClick={onClose}
                className="p-2.5 -mr-1 rounded-[5px] hover:bg-[var(--black-50)] transition-colors"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" color={iconColors.utility} />
              </button>
            </div>

            {/* Search */}
            <div className="px-5 py-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--black-400)]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full h-11 pl-10 pr-4 text-[0.875rem] border border-[var(--black-200)] rounded-[5px]
                    bg-[var(--black-50)] text-black placeholder:text-[var(--black-400)]
                    focus:border-black focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Primary Nav */}
            <nav className="flex-1 px-3 py-2" aria-label="Mobile navigation">
              <div className="space-y-0.5">
                {navSections.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center justify-between min-h-[48px] px-3 py-3 text-[1rem] font-medium text-black hover:bg-[var(--black-50)] rounded-[5px] transition-colors"
                  >
                    {item.label}
                    <ChevronDown className="h-4 w-4 text-[var(--black-400)] -rotate-90" />
                  </a>
                ))}
              </div>

              <div className="border-t border-[var(--black-100)] my-3 mx-3" />

              {/* Secondary Nav */}
              <div className="space-y-0.5">
                {secondaryLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center min-h-[44px] px-3 py-2.5 text-[0.875rem] text-[var(--black-500)] hover:text-black hover:bg-[var(--black-50)] rounded-[5px] transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </div>

              <div className="border-t border-[var(--black-100)] my-3 mx-3" />

              {/* Auth */}
              <a
                href="#signin"
                onClick={onClose}
                className="flex items-center gap-2 min-h-[44px] px-3 py-2.5 text-[0.875rem] text-[var(--black-500)] hover:text-black hover:bg-[var(--black-50)] rounded-[5px] transition-colors"
              >
                <svg className="size-[14px]" fill="none" viewBox="0 0 12 12" stroke="currentColor">
                  <path d="M6.5 1.5H2.5C2.22386 1.5 2 1.72386 2 2V10C2 10.2761 2.22386 10.5 2.5 10.5H6.5M8 8.5L10.5 6M10.5 6L8 3.5M10.5 6H5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Sign in
              </a>
            </nav>

            {/* Footer CTA */}
            <div className="px-5 py-4 border-t border-[var(--black-100)] space-y-3">
              <button
                onClick={onClose}
                className="w-full min-h-[48px] flex items-center justify-center gap-2 border border-[var(--warm-500)] bg-white text-black font-medium rounded-[5px] text-[0.875rem] hover:border-black hover:bg-[var(--coral-50)] active:bg-[var(--coral-100)] transition-all"
              >
                <svg className="size-[14px]" fill="none" viewBox="0 0 12 12" stroke="currentColor">
                  <path d="M6 5.5C6.82843 5.5 7.5 4.82843 7.5 4C7.5 3.17157 6.82843 2.5 6 2.5C5.17157 2.5 4.5 3.17157 4.5 4C4.5 4.82843 5.17157 5.5 6 5.5Z" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 9.5C3 8.17 4.34 7 6 7C7.66 7 9 8.17 9 9.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Sign up
              </button>
              <button
                onClick={onClose}
                className="w-full min-h-[48px] bg-gradient-to-r from-[var(--brand-red)] via-[var(--red-500)] to-[var(--brand-red)] text-white font-bold rounded-[5px] text-[0.875rem] hover:shadow-lg transition-shadow"
              >
                Book discovery call
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
