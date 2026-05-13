'use client';

import { Check, ChevronLeft, ChevronRight, Lock } from 'lucide-react';
import { Button } from '@kenresearch/design-system/atoms';
import { tocItems, getChapterState, type TOCState } from '@/lib/mock-data';

interface SidebarTOCProps {
  tocState: TOCState;
  activeChapter: number;
  onChapterClick: (chapterNumber: number) => void;
  onCycleTOCState: () => void;
}

/**
 * SidebarTOC — sticky left sidebar w/ 3-state navigation.
 * States: open(280px) → compressed(200px) → minimal(60px dot nav).
 *
 * @port V0_lite_report-legacy/src/app/components/sample-report/SidebarTOC.tsx
 * Note: Phosphor `LockKey` → Lucide `Lock` (icon consolidation).
 */
export function SidebarTOC({
  tocState,
  activeChapter,
  onChapterClick,
  onCycleTOCState,
}: SidebarTOCProps) {
  const widthClass =
    tocState === 'open' ? 'w-[280px]' : tocState === 'compressed' ? 'w-[200px]' : 'w-[60px]';

  return (
    <aside
      className={`${widthClass} flex-shrink-0
        bg-white/80 backdrop-blur-xl border-r border-[var(--border-soft)]
        transition-[width] duration-300 ease-in-out
        sticky top-[50px] self-start
        h-[calc(100vh-50px)]
        hidden lg:block z-40`}
      role="navigation"
      aria-label="Report chapters"
    >
      {tocState !== 'minimal' && (
        <div className="h-full pt-4 pb-0 relative flex flex-col">
          <div className="flex items-center gap-2 px-4 pb-3 pt-[20px] mb-2 border-b border-[var(--border-soft)]">
            <h3 className="text-sm font-bold text-[var(--surface-text)] uppercase tracking-wider">
              Table of Contents
            </h3>
            {tocState === 'open' && (
              <span className="ml-auto text-xs text-[var(--surface-text-muted)] bg-[var(--color-ramp-black-100)] px-2 py-0.5 rounded-full">
                56m
              </span>
            )}
          </div>

          <nav className="space-y-0.5 px-2 overflow-y-auto flex-1 min-h-0">
            {tocItems.map((item) => {
              const isAccessible = !!(item.unlocked || ('isLink' in item && item.isLink));
              const chapterState = getChapterState(item.number, isAccessible, activeChapter);

              if (chapterState === 'locked') {
                return (
                  <div
                    key={item.number}
                    className="w-full text-left px-3 py-2 rounded-[var(--radius-image)] text-sm flex items-center gap-2 cursor-not-allowed select-none"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center">
                        <Lock size={14} className="text-[var(--surface-text-muted)]/40" />
                      </div>
                    </div>
                    <span className="truncate flex-1 text-[14px] text-[var(--color-ramp-black-300)]">{item.title}</span>
                  </div>
                );
              }

              return (
                <button
                  key={item.number}
                  type="button"
                  onClick={() => onChapterClick(item.number)}
                  aria-current={chapterState === 'present' ? 'step' : undefined}
                  className={`w-full text-left px-3 py-2 rounded-[var(--radius-image)] text-sm flex items-center gap-2 group
                    transition-all duration-200 cursor-pointer
                    ${chapterState === 'present'
                      ? 'bg-[var(--color-ramp-black-100)] text-[var(--surface-text)] font-bold'
                      : 'text-[var(--surface-text-muted)] hover:bg-[var(--tint-soft)] hover:text-[var(--surface-text)]'
                    }`}
                >
                  <div className="flex-shrink-0">
                    {chapterState === 'past' ? (
                      <div className="w-5 h-5 rounded-full flex items-center justify-center bg-[var(--color-foundation-black)] text-[var(--color-foundation-white)]">
                        <Check className="w-3 h-3" strokeWidth={3} />
                      </div>
                    ) : chapterState === 'present' ? (
                      <div className="w-5 h-5 rounded-full flex items-center justify-center bg-[var(--color-foundation-black)] text-[var(--color-foundation-white)]">
                        <span className="text-xs">{item.number}</span>
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full flex items-center justify-center bg-[var(--color-ramp-black-100)] text-[var(--surface-text-muted)]">
                        <span className="text-xs">{item.number}</span>
                      </div>
                    )}
                  </div>
                  <span className="truncate flex-1 text-[14px]">{item.title}</span>
                </button>
              );
            })}
          </nav>

          {tocState === 'open' && (
            <div className="px-4 pt-3 pb-4 border-t border-[var(--border-soft)]">
              <div className="p-4 rounded-[var(--radius-button)] bg-[var(--color-ramp-black-100)]">
                <p className="text-xs text-[var(--surface-text-muted)] mb-3 leading-[1.5]">
                  Comprehensive market analysis across 50+ countries
                </p>
                <Button variant="brand" size="sm" className="w-full" animatedArrow>
                  Unlock Full Report
                </Button>
              </div>
            </div>
          )}

          {tocState === 'compressed' && <div className="border-t border-[var(--border-soft)]" />}
        </div>
      )}

      {tocState !== 'minimal' && (
        <button
          type="button"
          onClick={onCycleTOCState}
          className="absolute bottom-[20%] -right-4
            h-8 w-8 rounded-full bg-[var(--color-foundation-white)] border border-[var(--border-default)]
            flex items-center justify-center shadow-[var(--shadow-md)]
            hover:bg-[var(--color-ramp-black-100)] transition-all duration-200
            z-[100]"
          aria-label="Collapse sidebar"
        >
          <ChevronLeft className="h-4 w-4 transition-transform" />
        </button>
      )}

      {tocState === 'minimal' && (
        <div className="p-3 flex flex-col items-center gap-3 mt-6">
          {tocItems.map((item) => {
            const isAccessible = !!(item.unlocked || ('isLink' in item && item.isLink));
            const chapterState = getChapterState(item.number, isAccessible, activeChapter);
            return chapterState === 'locked' ? (
              <div
                key={item.number}
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs bg-[var(--color-ramp-black-100)] text-[var(--color-ramp-black-300)] cursor-not-allowed"
                aria-disabled="true"
                aria-label={`${item.title} (locked)`}
              >
                <Lock size={10} className="text-[var(--color-ramp-black-300)]" />
              </div>
            ) : (
              <button
                key={item.number}
                type="button"
                onClick={() => onChapterClick(item.number)}
                aria-label={item.title}
                aria-current={chapterState === 'present' ? 'step' : undefined}
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs
                  transition-all duration-200 cursor-pointer
                  ${chapterState === 'present'
                    ? 'bg-[var(--color-foundation-black)] text-[var(--color-foundation-white)] font-bold'
                    : chapterState === 'past'
                    ? 'bg-[var(--color-foundation-black)] text-[var(--color-foundation-white)] hover:scale-110'
                    : 'bg-[var(--color-ramp-black-100)] text-[var(--surface-text-muted)] hover:scale-110'
                  }`}
              >
                {chapterState === 'past' ? <Check className="w-3 h-3" strokeWidth={3} /> : item.number}
              </button>
            );
          })}
          <button
            type="button"
            onClick={onCycleTOCState}
            className="mt-4 p-2 hover:bg-[var(--color-ramp-black-100)] rounded-[var(--radius-button)] transition-colors"
            aria-label="Expand sidebar"
          >
            <ChevronRight className="h-4 w-4 text-[var(--surface-text-muted)]" />
          </button>
        </div>
      )}
    </aside>
  );
}
