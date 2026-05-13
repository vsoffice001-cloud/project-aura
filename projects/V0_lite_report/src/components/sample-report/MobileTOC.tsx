'use client';

import { useState, useEffect } from 'react';
import { ChevronUp, Check, X, BookOpen, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@kenresearch/design-system/atoms';
import { tocItems, getChapterState } from '@/lib/mock-data';

interface MobileTOCProps {
  activeChapter: number;
  onChapterClick: (chapterNumber: number) => void;
}

/**
 * MobileTOC — floating bottom-sheet chapter nav for mobile/tablet.
 *
 * Visible only when scrolled into `#report` section. Compact bottom bar
 * → tap → expands into bottom sheet w/ full TOC.
 *
 * @port V0_lite_report-legacy/src/app/components/mobile/MobileTOC.tsx
 * Note: Phosphor `LockKey` → Lucide `Lock`. `motion/react` → `framer-motion`.
 */
export function MobileTOC({ activeChapter, onChapterClick }: MobileTOCProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

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
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            type="button"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-4 left-4 right-4 z-[55] lg:hidden
              flex items-center justify-between gap-3
              bg-[var(--color-foundation-black)] text-[var(--color-foundation-white)] rounded-[var(--radius-card)] px-4 py-3
              shadow-[var(--shadow-lg)]
              active:scale-[0.98] transition-transform"
            aria-label="Open table of contents"
          >
            <div className="flex items-center gap-3 min-w-0">
              <BookOpen className="h-4 w-4 flex-shrink-0 text-white/70" />
              <div className="flex flex-col items-start min-w-0">
                <span className="text-[0.7rem] text-white/50 uppercase tracking-wider">
                  Chapter {activeChapter}
                </span>
                <span className="text-[var(--typography-size-compact)] font-medium truncate w-full">
                  {activeItem?.title || 'Table of Contents'}
                </span>
              </div>
            </div>
            <ChevronUp className="h-4 w-4 flex-shrink-0 text-white/50" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[60] lg:hidden"
              onClick={() => setIsOpen(false)}
              aria-hidden
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed bottom-0 left-0 right-0 z-[65] lg:hidden
                bg-[var(--color-foundation-white)] rounded-t-[16px] shadow-[var(--shadow-xl)]
                max-h-[75vh] flex flex-col"
            >
              <div className="flex items-center justify-center py-3">
                <div className="w-10 h-1 rounded-full bg-[var(--color-ramp-black-300)]" />
              </div>

              <div className="flex items-center justify-between px-5 pb-3 border-b border-[var(--border-soft)]">
                <h3 className="text-[var(--typography-size-sm)] font-medium text-[var(--surface-text)]">
                  Table of Contents
                </h3>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-[var(--radius-button)] hover:bg-[var(--tint-soft)] transition-colors"
                  aria-label="Close"
                >
                  <X className="h-4 w-4 text-[var(--surface-text-muted)]" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-3 py-2" aria-label="Report chapters">
                <div className="space-y-0.5">
                  {tocItems.map((item) => {
                    const isAccessible = !!(item.unlocked || ('isLink' in item && item.isLink));
                    const chapterState = getChapterState(item.number, isAccessible, activeChapter);

                    if (chapterState === 'locked') {
                      return (
                        <div
                          key={item.number}
                          className="flex items-center gap-3 px-3 py-3 rounded-[var(--radius-button)] opacity-40"
                        >
                          <div className="w-7 h-7 rounded-full flex items-center justify-center bg-[var(--color-ramp-black-100)]">
                            <Lock size={14} className="text-[var(--surface-text-subtle)]" />
                          </div>
                          <span className="text-[var(--typography-size-compact)] text-[var(--surface-text-subtle)]">
                            {item.title}
                          </span>
                        </div>
                      );
                    }

                    return (
                      <button
                        key={item.number}
                        type="button"
                        onClick={() => handleChapterSelect(item.number)}
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-[var(--radius-button)]
                          transition-all duration-200 text-left
                          ${chapterState === 'present'
                            ? 'bg-[var(--color-foundation-black)] text-[var(--color-foundation-white)]'
                            : 'text-[var(--surface-text)] hover:bg-[var(--tint-soft)]'
                          }`}
                      >
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-[0.75rem] font-medium
                            ${chapterState === 'present'
                              ? 'bg-white/20 text-[var(--color-foundation-white)]'
                              : chapterState === 'past'
                              ? 'bg-[var(--color-foundation-black)] text-[var(--color-foundation-white)]'
                              : 'bg-[var(--color-ramp-black-100)] text-[var(--surface-text-muted)]'
                            }`}
                        >
                          {chapterState === 'past' ? <Check className="w-3 h-3" strokeWidth={3} /> : item.number}
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[var(--typography-size-compact)] font-medium truncate block">
                            {item.title}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </nav>

              <div className="px-5 py-4 border-t border-[var(--border-soft)]">
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
