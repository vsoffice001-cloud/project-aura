/**
 * SidebarTOC — Sticky left sidebar with 3-state navigation
 * States: open (280px) → compressed (200px) → minimal (60px dot nav)
 *
 * Styling decisions (post-audit):
 *   - NO shadow-lg: removed because heavy shadows on sidebars compete
 *     with the main content hierarchy. Sidebar is a supporting element.
 *   - border-r uses `border-[var(--black-100)]` for subtle structural
 *     delineation, consistent with the 92% foundation tier.
 *   - bg-white/80 with backdrop-blur-xl provides depth without shadow.
 *   - Internal borders (header, footer) also use `border-[var(--black-100)]`
 *     for consistency with the outer border.
 */

import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { LockKey } from '@phosphor-icons/react';
import { Button } from '@/design-system/Button';
import {
  tocItems,
  getChapterState,
  type TOCState,
} from './data';

interface SidebarTOCProps {
  tocState: TOCState;
  activeChapter: number;
  onChapterClick: (chapterNumber: number) => void;
  onCycleTOCState: () => void;
}

export function SidebarTOC({
  tocState,
  activeChapter,
  onChapterClick,
  onCycleTOCState,
}: SidebarTOCProps) {
  const getTOCWidth = () => {
    if (tocState === 'open') return 'w-[280px]';
    if (tocState === 'compressed') return 'w-[200px]';
    return 'w-[60px]';
  };

  return (
    <aside
      className={`${getTOCWidth()} flex-shrink-0
        bg-white/80 backdrop-blur-xl border-r border-[var(--black-100)]
        transition-[width] duration-300 ease-in-out
        sticky top-[50px] self-start
        h-[calc(100vh-50px)]
        hidden lg:block z-40`}
      role="navigation"
      aria-label="Report chapters"
    >
      {tocState !== 'minimal' && (
        <div className="h-full pt-4 pb-0 relative flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-2 px-4 pb-3 pt-[20px] mb-2 border-b border-[var(--black-100)]">
            <h3 className="text-sm font-bold text-black uppercase tracking-wider">
              Table of Contents
            </h3>
            {tocState === 'open' && (
              <span className="ml-auto text-xs text-[var(--black-500)] bg-[var(--black-100)] px-2 py-0.5 rounded-full">
                56m
              </span>
            )}
          </div>

          {/* TOC Items */}
          <nav className="space-y-0.5 px-2 overflow-y-auto flex-1 min-h-0">
            {tocItems.map((item) => {
              const isAccessible = item.unlocked || ('isLink' in item && item.isLink);
              const chapterState = getChapterState(item.number, isAccessible, activeChapter);

              if (chapterState === 'locked') {
                return (
                  <div
                    key={item.number}
                    className="w-full text-left px-3 py-2 rounded-[2.5px] text-sm flex items-center gap-2
                      cursor-not-allowed select-none"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center">
                        <LockKey size={18} weight="fill" className="text-[var(--black-500)]/40" />
                      </div>
                    </div>
                    <span className="truncate flex-1 text-[14px] text-[var(--black-300)]">{item.title}</span>
                  </div>
                );
              }

              return (
                <button
                  key={item.number}
                  className={`w-full text-left px-3 py-2 rounded-[2.5px] text-sm flex items-center gap-2 group
                    transition-all duration-200 cursor-pointer
                    ${
                      chapterState === 'present'
                        ? 'bg-[var(--black-100)] text-black font-bold'
                        : 'text-[var(--black-500)] hover:bg-[var(--black-50)] hover:text-black'
                    }`}
                  onClick={() => onChapterClick(item.number)}
                  aria-current={chapterState === 'present' ? 'step' : undefined}
                >
                  <div className="flex-shrink-0">
                    {chapterState === 'past' ? (
                      <div className="w-5 h-5 rounded-full flex items-center justify-center bg-black text-white">
                        <Check className="w-3 h-3" strokeWidth={3} />
                      </div>
                    ) : chapterState === 'present' ? (
                      <div className="w-5 h-5 rounded-full flex items-center justify-center bg-black text-white">
                        <span className="text-xs">{item.number}</span>
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full flex items-center justify-center bg-[var(--black-100)] text-[var(--black-500)]">
                        <span className="text-xs">{item.number}</span>
                      </div>
                    )}
                  </div>
                  <span className="truncate flex-1 text-[14px]">{item.title}</span>
                </button>
              );
            })}
          </nav>

          {/* CTA Box at Bottom */}
          {tocState === 'open' && (
            <div className="px-4 pt-3 pb-4 border-t border-[var(--black-100)]">
              <div className="p-4 rounded-[5px] bg-[var(--black-100)]">
                <p className="text-xs text-[var(--black-500)] mb-3 leading-[1.5]">
                  Comprehensive market analysis across 50+ countries
                </p>
                <Button variant="brand" size="sm" className="w-full" animatedArrow>
                  Unlock Full Report
                </Button>
              </div>
            </div>
          )}

          {/* Bottom separator — meets the vertical border-r */}
          {tocState === 'compressed' && (
            <div className="border-t border-[var(--black-100)]" />
          )}
        </div>
      )}

      {/* Collapse Button */}
      {tocState !== 'minimal' && (
        <button
          onClick={onCycleTOCState}
          className="absolute bottom-[20%] -right-4
            h-8 w-8 rounded-full bg-white border border-[var(--black-200)]
            flex items-center justify-center shadow-md
            hover:bg-[var(--black-100)] transition-all duration-200
            z-[100]"
          aria-label="Collapse sidebar"
        >
          <ChevronLeft className="h-4 w-4 transition-transform" />
        </button>
      )}

      {/* MINIMAL STATE: Just chapter dots */}
      {tocState === 'minimal' && (
        <div className="p-3 flex flex-col items-center gap-3 mt-6">
          {tocItems.map((item) => {
            const isAccessible = item.unlocked || ('isLink' in item && item.isLink);
            const chapterState = getChapterState(item.number, isAccessible, activeChapter);
            return chapterState === 'locked' ? (
              <div
                key={item.number}
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs bg-[var(--black-100)] text-[var(--black-300)] cursor-not-allowed"
                aria-disabled="true"
                aria-label={`${item.title} (locked)`}
              >
                <LockKey size={10} weight="fill" className="text-[var(--black-300)]" />
              </div>
            ) : (
              <button
                key={item.number}
                onClick={() => onChapterClick(item.number)}
                aria-label={item.title}
                aria-current={chapterState === 'present' ? 'step' : undefined}
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs
                  transition-all duration-200 cursor-pointer
                  ${
                    chapterState === 'present'
                      ? 'bg-black text-white font-bold'
                      : chapterState === 'past'
                      ? 'bg-black text-white hover:scale-110'
                      : 'bg-[var(--black-100)] text-[var(--black-500)] hover:scale-110'
                  }`}
              >
                {chapterState === 'past' ? (
                  <Check className="w-3 h-3" strokeWidth={3} />
                ) : (
                  item.number
                )}
              </button>
            );
          })}
          <button
            onClick={onCycleTOCState}
            className="mt-4 p-2 hover:bg-[var(--black-100)] rounded-[5px] transition-colors"
            aria-label="Expand sidebar"
          >
            <ChevronRight className="h-4 w-4 text-[var(--black-500)]" />
          </button>
        </div>
      )}
    </aside>
  );
}