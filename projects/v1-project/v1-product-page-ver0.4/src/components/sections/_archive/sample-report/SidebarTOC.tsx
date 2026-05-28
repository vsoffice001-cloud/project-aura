'use client';

/**
 * SidebarTOC — Sticky left sidebar · 3-state navigation
 *
 * @what  3-state sidebar TOC for §22 SamplePreviewSection.
 *        States: open (280px) → compressed (200px) → minimal (60px dot nav)
 *
 * @why   Port from V0_lite_report-legacy SidebarTOC.tsx. Adapted for v0.4:
 *        - @phosphor-icons LockKey → Lucide Lock
 *        - @/design-system/Button → inline button w/ same visual
 *        - Tokens: v0.4 CSS vars (--black-50/100/200/500 · --warm-500)
 *
 * @when  §22 SamplePreviewSection · desktop sidebar · hidden on mobile (lg:block)
 *
 * Styling: NO shadow-lg (too heavy vs content hierarchy) ·
 * border-r var(--black-100) for subtle structural delineation ·
 * bg-white/80 backdrop-blur-xl for depth
 */

import { Check, ChevronLeft, ChevronRight, Lock } from 'lucide-react';
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
        hidden lg:block z-40 relative`}
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
              <span className="ml-auto text-xs text-[var(--semantic-ink-subtle)] bg-[var(--black-100)] px-2 py-0.5 rounded-full">
                56m
              </span>
            )}
          </div>

          {/* TOC Items */}
          <nav className="space-y-0.5 px-2 overflow-y-auto flex-1 min-h-0">
            {tocItems.map((item) => {
              const chapterState = getChapterState(item.number, item.unlocked, activeChapter);

              if (chapterState === 'locked') {
                return (
                  <div
                    key={item.number}
                    className="w-full text-left px-3 py-2 rounded-[2.5px] text-sm flex items-center gap-2
                      cursor-not-allowed select-none"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center">
                        <Lock size={12} className="text-[var(--semantic-ink-subtle)] opacity-40" />
                      </div>
                    </div>
                    <span className="truncate flex-1 text-[14px] text-[var(--semantic-ink-muted)]">{item.title}</span>
                  </div>
                );
              }

              return (
                <button
                  key={item.number}
                  type="button"
                  className={`w-full text-left px-3 py-2 rounded-[2.5px] text-sm flex items-center gap-2 group
                    transition-all duration-200 cursor-pointer
                    ${
                      chapterState === 'present'
                        ? 'bg-[var(--black-100,#f5f5f5)] text-black font-bold'
                        : 'text-[var(--semantic-ink-subtle)] hover:bg-[var(--black-50,#fafafa)] hover:text-black'
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
                      <div className="w-5 h-5 rounded-full flex items-center justify-center bg-[var(--black-100,#f5f5f5)] text-[var(--semantic-ink-subtle)]">
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
              <div className="p-4 rounded-[5px] bg-[var(--black-100,#f5f5f5)]">
                <p className="text-xs text-[var(--semantic-ink-subtle)] mb-3 leading-[1.5]">
                  Comprehensive market analysis across 8 Australian states & territories
                </p>
                <a
                  href="/contact-expert?ref=sample-preview-sidebar"
                  className="inline-flex items-center justify-center gap-2 w-full rounded-[var(--radius-xs,5px)] bg-[var(--color-brand-red,#b01f24)] text-white px-4 py-2 font-body font-medium text-[13px] hover:bg-[#8f181d] transition-colors"
                >
                  Unlock Full Report →
                </a>
              </div>
            </div>
          )}

          {tocState === 'compressed' && (
            <div className="border-t border-[var(--black-100)]" />
          )}
        </div>
      )}

      {/* Collapse Button */}
      {tocState !== 'minimal' && (
        <button
          type="button"
          onClick={onCycleTOCState}
          className="absolute bottom-[20%] -right-4
            h-8 w-8 rounded-full bg-white border border-[var(--black-200,#e5e5e5)]
            flex items-center justify-center shadow-md
            hover:bg-[var(--black-100,#f5f5f5)] transition-all duration-200
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
            const chapterState = getChapterState(item.number, item.unlocked, activeChapter);
            return chapterState === 'locked' ? (
              <div
                key={item.number}
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs bg-[var(--black-100,#f5f5f5)] text-[var(--semantic-ink-muted)] cursor-not-allowed"
                aria-disabled="true"
                aria-label={`${item.title} (locked)`}
              >
                <Lock size={10} className="text-[var(--semantic-ink-muted)]" />
              </div>
            ) : (
              <button
                type="button"
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
                      : 'bg-[var(--black-100,#f5f5f5)] text-[var(--semantic-ink-subtle)] hover:scale-110'
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
            type="button"
            onClick={onCycleTOCState}
            className="mt-4 p-2 hover:bg-[var(--black-100,#f5f5f5)] rounded-[5px] transition-colors"
            aria-label="Expand sidebar"
          >
            <ChevronRight className="h-4 w-4 text-[var(--semantic-ink-subtle)]" />
          </button>
        </div>
      )}
    </aside>
  );
}
