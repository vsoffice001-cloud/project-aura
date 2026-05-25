'use client';

/**
 * SamplePreviewSection — §22 Sample Report Preview
 *
 * @what  Full-width section wrapper for the v0-lite sample report viewer.
 *        Orchestrates layout: sidebar TOC (left) + 4-chapter content (right) +
 *        mobile bottom-sheet TOC. Renders OUTSIDE the 2-col body chrome (no SideTOC).
 *
 * @why   User mandate: "report preview section (same as v0-lite section · difference is
 *        just we change the language)". Port V0_lite_report-legacy SampleReportPreview.tsx
 *        as a v0.4 section. Content = Australia Cold Chain.
 *        Sprint 4 restoration — was DROPPED in Sprint 2 (over-correction).
 *
 * @when  §22 · full-width below 2-col body · before RelatedReportsSection (§23) +
 *        GetFullAccessSection (§24). Same full-width zone as §23 + §24.
 *
 * @how   Scroll tracking via IntersectionObserver → activeChapter state.
 *        SidebarTOC receives tocState + activeChapter + callbacks.
 *        Chapter components render in main scrolling column.
 *
 * Sub-components:
 *   sample-report/data.ts                  — types · consts · getChapterState
 *   sample-report/SidebarTOC.tsx           — 3-state sidebar navigation
 *   sample-report/ChapterExecutiveSummary  — Ch1 · body + stat cards
 *   sample-report/ChapterMarketOverview    — Ch2 · fade + paywall
 *   sample-report/ChapterExtendedTOC       — Ch9 · extended TOC
 *   sample-report/ChapterMethodology       — Ch11 · stepper + cards
 *   sample-report/MobileTOC.tsx            — mobile bottom-sheet navigation
 */

import { useState, useEffect, useRef } from 'react';
import { chapterIdMap, type TOCState } from '@/components/sample-report/data';
import { SidebarTOC } from '@/components/sample-report/SidebarTOC';
import { ChapterExecutiveSummary } from '@/components/sample-report/ChapterExecutiveSummary';
import { ChapterMarketOverview } from '@/components/sample-report/ChapterMarketOverview';
import { ChapterExtendedTOC } from '@/components/sample-report/ChapterExtendedTOC';
import { ChapterMethodology } from '@/components/sample-report/ChapterMethodology';
import { MobileTOC } from '@/components/sample-report/MobileTOC';

export function SamplePreviewSection() {
  const [tocState, setTocState] = useState<TOCState>('open');
  const [activeChapter, setActiveChapter] = useState(1);
  const isScrollingRef = useRef(false);

  // IntersectionObserver for scroll-based active chapter tracking
  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      if (isScrollingRef.current) return;
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const match = Object.entries(chapterIdMap).find(([, elId]) => elId === id);
          if (match) setActiveChapter(Number(match[0]));
        }
      }
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    Object.values(chapterIdMap).forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleChapterClick = (chapterNumber: number) => {
    const targetId = chapterIdMap[chapterNumber];
    if (!targetId) return;
    const el = document.getElementById(targetId);
    if (el) {
      isScrollingRef.current = true;
      setActiveChapter(chapterNumber);
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => { isScrollingRef.current = false; }, 1000);
    }
  };

  const cycleTOCState = () => {
    if (tocState === 'open') setTocState('compressed');
    else if (tocState === 'compressed') setTocState('minimal');
    else setTocState('open');
  };

  return (
    <section
      id="sample-preview"
      aria-label="Sample Report Preview"
      className="w-full border-b border-[var(--black-100,#f5f5f5)] bg-white"
    >
      {/* Viewer chrome — sidebar + main content */}
      <div className="flex gap-0 items-start -mx-4 sm:-mx-6 md:-mx-8">
        {/* Sidebar TOC · desktop only */}
        <SidebarTOC
          tocState={tocState}
          activeChapter={activeChapter}
          onChapterClick={handleChapterClick}
          onCycleTOCState={cycleTOCState}
        />

        {/* Main Content */}
        <main className="flex-1 bg-white overflow-hidden">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-8 sm:py-12 md:py-16">
            {/* Chapter 1 · Executive Summary */}
            <ChapterExecutiveSummary />

            <div className="border-t border-black/5 my-8 sm:my-12" />

            {/* Chapter 2 · Market Overview */}
            <ChapterMarketOverview />

            <div className="border-t border-black/5 my-8 sm:my-12" />

            {/* Chapter 9 · Extended TOC */}
            <ChapterExtendedTOC />

            <div className="border-t border-black/5 my-8 sm:my-12" />

            {/* Chapter 11 · Methodology */}
            <ChapterMethodology />
          </div>
        </main>
      </div>

      {/* Mobile TOC · floating bottom navigation (lg:hidden) */}
      <MobileTOC
        activeChapter={activeChapter}
        onChapterClick={handleChapterClick}
      />
    </section>
  );
}
