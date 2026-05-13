/**
 * SampleReportPreview — Orchestrator
 *
 * Manages layout (sidebar + main), scroll-based chapter tracking,
 * and delegates rendering to sub-components.
 *
 * Sub-components (Tier 4 decomposition):
 *   - sample-report/data.ts                  — static data, types, constants
 *   - sample-report/SidebarTOC.tsx           — 3-state sidebar navigation
 *   - sample-report/ChapterExecutiveSummary  — Chapter 1 + stats
 *   - sample-report/ChapterMarketOverview    — Chapter 2 paywall
 *   - sample-report/ChapterExtendedTOC       — Chapter 9 extended TOC
 *   - ChapterMethodology.tsx                 — Chapter 11 (pre-existing)
 *   - mobile/MobileTOC.tsx                   — mobile-friendly TOC
 *
 * Layout & styling decisions (post-audit):
 *   - SectionWrapper uses `!py-0` override so the sidebar's vertical
 *     border-r runs full edge-to-edge (no padding gap at top/bottom).
 *   - Main content compensates with internal `py-10 sm:py-12 md:py-16`.
 *   - `border-b border-[var(--black-100)]` provides a subtle bottom line
 *     that cleanly meets the sidebar's vertical separator.
 *   - Sidebar has NO shadow (shadow-lg removed — too heavy, competes
 *     with content hierarchy). Uses subtle `border-r border-[var(--black-100)]`
 *     instead, consistent with the 92% foundation tier.
 */

import { useState, useEffect, useRef } from 'react';
import { SectionWrapper } from '@/design-system/components/SectionWrapper';
import { chapterIdMap, type TOCState } from './sample-report/data';
import { SidebarTOC } from './sample-report/SidebarTOC';
import { ChapterExecutiveSummary } from './sample-report/ChapterExecutiveSummary';
import { ChapterMarketOverview } from './sample-report/ChapterMarketOverview';
import { ChapterExtendedTOC } from './sample-report/ChapterExtendedTOC';
import { ChapterMethodology } from './ChapterMethodology';
import { MobileTOC } from './mobile/MobileTOC';

export function SampleReportPreview() {
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
    <SectionWrapper id="report" background="white" spacing="sm" maxWidth="full" className="!px-0 !py-0 border-b border-[var(--black-100)]">
      <div className="flex gap-0 items-start -mx-4 sm:-mx-6 md:-mx-8">
        {/* Sidebar TOC */}
        <SidebarTOC
          tocState={tocState}
          activeChapter={activeChapter}
          onChapterClick={handleChapterClick}
          onCycleTOCState={cycleTOCState}
        />

        {/* Main Content */}
        <main className="flex-1 bg-white overflow-hidden">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-8 sm:py-12 md:py-16">
            {/* Chapter 1: Executive Summary */}
            <ChapterExecutiveSummary />

            <div className="border-t border-black/5 my-8 sm:my-12"></div>

            {/* Chapter 2: Market Overview */}
            <ChapterMarketOverview />

            <div className="border-t border-black/5 my-8 sm:my-12"></div>

            {/* Chapter 9: Extended TOC */}
            <ChapterExtendedTOC />

            <div className="border-t border-black/5 my-8 sm:my-12"></div>

            {/* Chapter 11: Methodology */}
            <ChapterMethodology />
          </div>
        </main>
      </div>

      {/* Mobile TOC — floating bottom navigation (lg:hidden) */}
      <MobileTOC
        activeChapter={activeChapter}
        onChapterClick={handleChapterClick}
      />
    </SectionWrapper>
  );
}