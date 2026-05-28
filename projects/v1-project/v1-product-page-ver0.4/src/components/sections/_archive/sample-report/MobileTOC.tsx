'use client';

/**
 * MobileTOC — Floating bottom-sheet chapter navigation (mobile/tablet)
 *
 * @what  Shown on screens < lg where SidebarTOC is hidden.
 *        Compact bottom bar shows current chapter. Expands to full-screen
 *        bottom sheet with complete TOC. Closes after chapter selection.
 *
 * @why   Port from V0_lite_report-legacy mobile/MobileTOC.tsx.
 *        Adapted for v0.4: motion/react → framer-motion · @phosphor-icons → Lucide Lock ·
 *        @/design-system/Button → inline anchor. Content = Australia Cold Chain.
 *        Color: black (92% foundation tier — utility navigation, not CTA).
 *
 * @when  §22 SamplePreviewSection · mobile/tablet only (lg:hidden) ·
 *        visible only when section is in viewport
 */

import { useState, useEffect } from 'react';
import { ChevronUp, Check, X, BookOpen, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { tocItems, getChapterState } from './data';

interface MobileTOCProps {
  activeChapter: number;
  onChapterClick: (chapterNumber: number) => void;
}

export function MobileTOC({ activeChapter, onChapterClick }: MobileTOCProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Show only when inside the sample-preview section
  useEffect(() => {
    const handleScroll = () => {
      const reportSection = document.getElementById('sample-preview');
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
            type="button"
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
                max-h-[75vh] flex flex-col"
            >
              {/* Drag handle */}
              <div className="flex items-center justify-center py-3">
                <div className="w-10 h-1 rounded-full bg-[var(--black-300,#d4d4d4)]" />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between px-5 pb-3 border-b border-[var(--black-100,#f5f5f5)]">
                <h3 className="text-[1rem] font-medium text-black">
                  Table of Contents
                </h3>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-[5px] hover:bg-[var(--black-50,#fafafa)] transition-colors"
                  aria-label="Close"
                >
                  <X className="h-4 w-4 text-[var(--semantic-ink-subtle)]" />
                </button>
              </div>

              {/* Chapter list */}
              <nav
                className="flex-1 overflow-y-auto px-3 py-2"
                aria-label="Report chapters"
              >
                <div className="space-y-0.5">
                  {tocItems.map((item) => {
                    const chapterState = getChapterState(item.number, item.unlocked, activeChapter);

                    if (chapterState === 'locked') {
                      return (
                        <div
                          key={item.number}
                          className="flex items-center gap-3 px-3 py-3 rounded-[5px] opacity-40"
                        >
                          <div className="w-7 h-7 rounded-full flex items-center justify-center bg-[var(--black-100,#f5f5f5)]">
                            <Lock size={14} className="text-[var(--semantic-ink-muted)]" />
                          </div>
                          <span className="text-[0.875rem] text-[var(--semantic-ink-muted)]">
                            {item.title}
                          </span>
                        </div>
                      );
                    }

                    return (
                      <button
                        type="button"
                        key={item.number}
                        onClick={() => handleChapterSelect(item.number)}
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-[5px]
                          transition-all duration-200 text-left
                          ${
                            chapterState === 'present'
                              ? 'bg-black text-white'
                              : 'text-black hover:bg-[var(--black-50,#fafafa)]'
                          }`}
                      >
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-[0.75rem] font-medium
                            ${
                              chapterState === 'present'
                                ? 'bg-white/20 text-white'
                                : chapterState === 'past'
                                ? 'bg-black text-white'
                                : 'bg-[var(--black-100,#f5f5f5)] text-[var(--semantic-ink-subtle)]'
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
              <div className="px-5 py-4 border-t border-[var(--black-100,#f5f5f5)]">
                <a
                  href="/contact-expert?ref=sample-preview-mobile-toc"
                  className="inline-flex items-center justify-center gap-2 w-full rounded-[var(--radius-xs,5px)] bg-[var(--color-brand-red,#b01f24)] text-white px-4 py-2.5 font-body font-medium text-[13.5px] hover:bg-[#8f181d] transition-colors"
                >
                  Unlock Full Report →
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
