/**
 * MobileTOC — Floating bottom-sheet chapter navigation for mobile/tablet
 *
 * Shown on screens < lg where the SidebarTOC is hidden.
 * Provides a compact bottom bar with current chapter indicator
 * that expands into a draggable bottom sheet with full TOC.
 *
 * Color: black (92% foundation tier — utility navigation, not CTA)
 */

import { useState, useEffect } from 'react';
import { ChevronUp, Check, X, BookOpen } from 'lucide-react';
import { LockKey } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/design-system/Button';
import {
  tocItems,
  getChapterState,
} from '../sample-report/data';

interface MobileTOCProps {
  activeChapter: number;
  onChapterClick: (chapterNumber: number) => void;
}

export function MobileTOC({ activeChapter, onChapterClick }: MobileTOCProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Show only when inside the report section
  useEffect(() => {
    const handleScroll = () => {
      const reportSection = document.getElementById('report');
      if (!reportSection) return;

      const rect = reportSection.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.7 && rect.bottom > 100;
      setIsVisible(inView);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeItem = tocItems.find((item) => item.number === activeChapter);

  const handleChapterSelect = (chapterNumber: number) => {
    onChapterClick(chapterNumber);
    setIsOpen(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Floating bottom bar — lg:hidden */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-4 left-4 right-4 z-[55] lg:hidden
              flex items-center justify-between gap-3
              bg-black text-white rounded-[10px] px-4 py-3
              shadow-[0_8px_32px_rgba(0,0,0,0.25)]
              active:scale-[0.98] transition-transform"
            aria-label="Open table of contents"
          >
            <div className="flex items-center gap-3 min-w-0">
              <BookOpen className="h-4 w-4 flex-shrink-0 text-white/70" />
              <div className="flex flex-col items-start min-w-0">
                <span className="text-[0.7rem] text-white/50 uppercase tracking-wider">
                  Chapter {activeChapter}
                </span>
                <span className="text-[0.875rem] font-medium truncate w-full">
                  {activeItem?.title || 'Table of Contents'}
                </span>
              </div>
            </div>
            <ChevronUp className="h-4 w-4 flex-shrink-0 text-white/50" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Bottom sheet overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[60] lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Sheet */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed bottom-0 left-0 right-0 z-[65] lg:hidden
                bg-white rounded-t-[16px] shadow-[0_-8px_32px_rgba(0,0,0,0.15)]
                max-h-[75vh] flex flex-col safe-bottom"
            >
              {/* Drag handle */}
              <div className="flex items-center justify-center py-3">
                <div className="w-10 h-1 rounded-full bg-[var(--black-300)]" />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between px-5 pb-3 border-b border-[var(--black-100)]">
                <h3 className="text-[1rem] font-medium text-black">
                  Table of Contents
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-[5px] hover:bg-[var(--black-50)] transition-colors"
                  aria-label="Close"
                >
                  <X className="h-4 w-4 text-[var(--black-500)]" />
                </button>
              </div>

              {/* Chapter list */}
              <nav
                className="flex-1 overflow-y-auto px-3 py-2"
                aria-label="Report chapters"
              >
                <div className="space-y-0.5">
                  {tocItems.map((item) => {
                    const isAccessible = item.unlocked || ('isLink' in item && item.isLink);
                    const chapterState = getChapterState(item.number, isAccessible, activeChapter);

                    if (chapterState === 'locked') {
                      return (
                        <div
                          key={item.number}
                          className="flex items-center gap-3 px-3 py-3 rounded-[5px] opacity-40"
                        >
                          <div className="w-7 h-7 rounded-full flex items-center justify-center bg-[var(--black-100)]">
                            <LockKey size={14} weight="fill" className="text-[var(--black-400)]" />
                          </div>
                          <span className="text-[0.875rem] text-[var(--black-400)]">
                            {item.title}
                          </span>
                        </div>
                      );
                    }

                    return (
                      <button
                        key={item.number}
                        onClick={() => handleChapterSelect(item.number)}
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-[5px]
                          transition-all duration-200 text-left
                          ${
                            chapterState === 'present'
                              ? 'bg-black text-white'
                              : 'text-black hover:bg-[var(--black-50)]'
                          }`}
                      >
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-[0.75rem] font-medium
                            ${
                              chapterState === 'present'
                                ? 'bg-white/20 text-white'
                                : chapterState === 'past'
                                ? 'bg-black text-white'
                                : 'bg-[var(--black-100)] text-[var(--black-500)]'
                            }`}
                        >
                          {chapterState === 'past' ? (
                            <Check className="w-3 h-3" strokeWidth={3} />
                          ) : (
                            item.number
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[0.875rem] font-medium truncate block">
                            {item.title}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </nav>

              {/* Footer CTA */}
              <div className="px-5 py-4 border-t border-[var(--black-100)]">
                <Button variant="brand" size="sm" className="w-full" animatedArrow>
                  Unlock Full Report
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}