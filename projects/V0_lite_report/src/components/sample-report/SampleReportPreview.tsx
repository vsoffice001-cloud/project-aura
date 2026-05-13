'use client';

import { useState, useEffect, useRef } from 'react';
import { SectionWrapper } from '@kenresearch/design-system/atoms';
import { chapterIdMap, type TOCState } from '@/lib/mock-data';
import { SidebarTOC } from './SidebarTOC';
import { ChapterExecutiveSummary } from './ChapterExecutiveSummary';
import { ChapterMarketOverview } from './ChapterMarketOverview';
import { ChapterExtendedTOC } from './ChapterExtendedTOC';
import { ChapterMethodology } from '../sections/ChapterMethodology';
import { MobileTOC } from './MobileTOC';

/**
 * SampleReportPreview — orchestrator: sidebar + main + scroll-spy + 4 chapter sections.
 *
 * IntersectionObserver tracks active chapter; click-scroll syncs activeChapter w/o
 * triggering observer fires (isScrollingRef gate, 1s timeout).
 *
 * MobileTOC stub — deferred to Phase C step 7 (mobile-only floating bottom nav).
 *
 * @port V0_lite_report-legacy/src/app/components/SampleReportPreview.tsx
 */
export function SampleReportPreview() {
  const [tocState, setTocState] = useState<TOCState>('open');
  const [activeChapter, setActiveChapter] = useState(1);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    const handleIntersect: IntersectionObserverCallback = (entries) => {
      if (isScrollingRef.current) return;
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const match = Object.entries(chapterIdMap).find(([, elId]) => elId === id);
          if (match) setActiveChapter(Number(match[0]));
        }
      }
    };

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    });

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
    if (!el) return;
    isScrollingRef.current = true;
    setActiveChapter(chapterNumber);
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => { isScrollingRef.current = false; }, 1000);
  };

  const cycleTOCState = () => {
    if (tocState === 'open') setTocState('compressed');
    else if (tocState === 'compressed') setTocState('minimal');
    else setTocState('open');
  };

  return (
    <SectionWrapper
      id="report"
      background="white"
      spacing="sm"
      maxWidth="full"
      className="!px-0 !py-0 border-b border-[var(--border-soft)]"
    >
      <div className="flex gap-0 items-start -mx-4 sm:-mx-6 md:-mx-8">
        <SidebarTOC
          tocState={tocState}
          activeChapter={activeChapter}
          onChapterClick={handleChapterClick}
          onCycleTOCState={cycleTOCState}
        />

        <main className="flex-1 bg-[var(--color-foundation-white)] overflow-hidden">
          <div className="max-w-[var(--container-page)] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-8 sm:py-12 md:py-16">
            <ChapterExecutiveSummary />
            <div className="border-t border-[var(--border-soft)] my-8 sm:my-12" />
            <ChapterMarketOverview />
            <div className="border-t border-[var(--border-soft)] my-8 sm:my-12" />
            <ChapterExtendedTOC />
            <div className="border-t border-[var(--border-soft)] my-8 sm:my-12" />
            <ChapterMethodology />
          </div>
        </main>
      </div>

      <MobileTOC activeChapter={activeChapter} onChapterClick={handleChapterClick} />
    </SectionWrapper>
  );
}
