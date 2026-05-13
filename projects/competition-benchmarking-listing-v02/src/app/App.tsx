/**
 * Competition Benchmarking Listing v01 — App
 * Ken Research
 *
 * Sections (bg alternation per spec):
 *   1. Navbar              — transparent over black
 *   2. HeroBanner          — bg: black
 *   3. ContextBanner       — bg: warm-300 (breadcrumb + count + clear-all)
 *   4. 2-col listing body  — bg: white
 *   5. TrendingTopics      — bg: warm-300
 *   6. MethodologyPreview  — bg: white (replaces Testimonials)
 *   7. CustomCTA           — bg: black (var(--black-900))
 *   8. Footer              — bg: black
 */

import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { useBenchmarkFilters } from './components/hooks/useBenchmarkFilters';
import { useProgressiveLoad } from './components/hooks/useProgressiveLoad';
import { useCrossfade } from './components/hooks/useCrossfade';

// DS primitives
import { SectionWrapper } from './components/SectionWrapper';
import { Container } from './components/Container';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CardReveal } from './components/molecules/CardReveal';
import { EmptyState } from './components/molecules/EmptyState';
import { LoadMoreSentinel } from './components/molecules/LoadMoreSentinel';
import { BackToTop } from './components/molecules/BackToTop';
import { MobileFilterBar } from './components/MobileFilterBar';

// Page-specific organisms
import { BenchmarkContextBanner } from './components/ListingContextBanner';
import { BenchmarkHeroBanner } from './components/BenchmarkHeroBanner';
import { BenchmarkFilterSidebar } from './components/BenchmarkFilterSidebar';
import { BenchmarkListingToolbar } from './components/BenchmarkListingToolbar';
import { BenchmarkCard } from './components/BenchmarkCard';
import { BenchmarkListCard } from './components/BenchmarkListCard';
import { BenchmarkMobileFilterSheet } from './components/BenchmarkMobileFilterSheet';
import { BenchmarkTrendingTopics } from './components/BenchmarkTrendingTopics';
import { BenchmarkMethodologyPreview } from './components/BenchmarkMethodologyPreview';
import { BenchmarkCustomResearchCTA } from './components/BenchmarkCustomResearchCTA';
import { BenchmarkActiveFilters } from './components/BenchmarkActiveFilters';
import { BenchmarkStatsStrip } from './components/BenchmarkStatsStrip';
import { METHODOLOGY_LABELS } from '../lib/mock-data';

import type { ViewMode } from './components/ViewToggle';
import { Toaster } from 'sonner';

export default function App() {
  const f = useBenchmarkFilters();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  // Progressive load
  const {
    visibleItems: visibleReports,
    hasMore,
    isLoadingMore,
    sentinelRef,
    visibleCount,
  } = useProgressiveLoad(f.filteredReports, {
    initialCount: 12,
    loadMoreCount: 12,
    rootMargin: '200px',
  });

  // Crossfade on filter change
  const { crossfadeStyle } = useCrossfade(f.filterHash);

  // Ref retained on sidebar header (reserved for future sticky behavior)
  const sidebarHeaderRef = useRef<HTMLDivElement>(null);

  const scrollToListing = useCallback(() => {
    const el = document.getElementById('listing-area');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  // Masonry gutter — 24px mobile, 32px desktop (md+)
  const [masonryGutter, setMasonryGutter] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth >= 768 ? 32 : 24
  );
  useEffect(() => {
    const handleResize = () => {
      setMasonryGutter(window.innerWidth >= 768 ? 32 : 24);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Facet allYears derived
  const allYears = useMemo(
    () => Object.keys(f.facetCounts.yearCounts).sort((a, b) => b.localeCompare(a)),
    [f.facetCounts.yearCounts]
  );

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--warm-300)' }}>
      <Header />

      {/* 1. Hero — bg: black */}
      <BenchmarkHeroBanner onExplore={scrollToListing} />

      {/* 2. Context banner — bg: warm-300 (breadcrumb + count + clear-all) */}
      <BenchmarkContextBanner
        resultCount={f.filteredReports.length}
        activeFilterCount={f.activeFilterCount}
        onClearAll={f.clearAll}
      />

      {/* 3. Stats strip — bg: black, slim, key counts moved out of slim hero (Variant D) */}
      <BenchmarkStatsStrip />

      <main className="flex-1">
        {/* 4. 2-col body — bg: white */}
        <SectionWrapper bg="white" id="listing-area">
          <Container maxWidth="page">
            <div className="flex flex-col xl:flex-row gap-0 xl:gap-10">
              {/* Sidebar — desktop only */}
              <BenchmarkFilterSidebar
                industries={f.industries}
                regions={f.regions}
                countries={f.countries}
                tags={f.tags}
                competitorSetSizes={f.competitorSetSizes}
                methodologies={f.methodologies}
                years={f.years}
                allYears={allYears}
                facetCounts={f.facetCounts}
                activeFilterCount={f.activeFilterCount}
                onToggleIndustry={f.toggleIndustry}
                onToggleRegion={f.toggleRegion}
                onToggleCountry={f.toggleCountry}
                onToggleTag={f.toggleTag}
                onToggleSize={f.toggleSize}
                onToggleMethodology={f.toggleMethodology}
                onToggleYear={f.toggleYear}
                onClearAll={f.clearAll}
                headerRef={sidebarHeaderRef}
              />

              {/* Main column */}
              <div className="flex-1 min-w-0">
                {/* Toolbar */}
                <BenchmarkListingToolbar
                  resultCount={f.filteredReports.length}
                  activeChips={[]}
                  sort={f.sort}
                  onSortChange={f.setSort}
                  viewMode={viewMode}
                  onViewModeChange={setViewMode}
                  activeFilterCount={f.activeFilterCount}
                  onOpenMobileFilters={() => f.setMobileFilterOpen(true)}
                  onClearAll={f.clearAll}
                />

                {/* Active filter chips — RS ListingContextBanner Zone B clone, shown above grid when filters active */}
                <BenchmarkActiveFilters
                  industries={f.industries}
                  tags={f.tags}
                  regions={f.regions}
                  countries={f.countries}
                  competitorSetSizes={f.competitorSetSizes}
                  methodologies={f.methodologies}
                  years={f.years}
                  searchQuery={f.searchQuery}
                  methodologyLabels={METHODOLOGY_LABELS}
                  onRemoveIndustry={f.toggleIndustry}
                  onRemoveTag={f.toggleTag}
                  onRemoveRegion={f.toggleRegion}
                  onRemoveCountry={f.toggleCountry}
                  onRemoveSize={f.toggleSize}
                  onRemoveMethodology={f.toggleMethodology}
                  onRemoveYear={f.toggleYear}
                  onRemoveSearch={() => f.setSearchQuery('')}
                  onClearAll={f.clearAll}
                />

                {/* Card grid / list */}
                <div style={crossfadeStyle}>
                  {visibleReports.length === 0 ? (
                    <EmptyState
                      message="No benchmarking reports match your current filters."
                      actionLabel="Clear all filters"
                      onAction={f.clearAll}
                    />
                  ) : viewMode === 'grid' ? (
                    <ResponsiveMasonry columnsCountBreakPoints={{ 0: 1, 640: 2, 1280: 3 }}>
                      <Masonry gutter={`${masonryGutter}px`}>
                        {visibleReports.map((report, idx) => (
                          <CardReveal key={report.id} delay={Math.min(idx, 8) * 80}>
                            <BenchmarkCard report={report} slotIndex={idx} />
                          </CardReveal>
                        ))}
                      </Masonry>
                    </ResponsiveMasonry>
                  ) : (
                    <div className="flex flex-col gap-3">
                      {visibleReports.map((report, idx) => (
                        <CardReveal key={report.id} delay={Math.min(idx, 8) * 60}>
                          <BenchmarkListCard report={report} />
                        </CardReveal>
                      ))}
                    </div>
                  )}

                  {/* Infinite scroll sentinel */}
                  <LoadMoreSentinel
                    ref={sentinelRef}
                    visibleCount={visibleCount}
                    totalCount={f.filteredReports.length}
                    hasMore={hasMore}
                    isLoading={isLoadingMore}
                    itemLabel="reports"
                  />

                  {/* Mobile bottom padding for sticky filter bar */}
                  <div className="h-20 xl:hidden" />
                </div>
              </div>
            </div>
          </Container>
        </SectionWrapper>

        {/* 5. TrendingTopics — bg: warm-300 (#f5f2f1) */}
        <section className="py-8 sm:py-10 md:py-12" style={{ background: 'var(--warm-300)' }}>
          <Container maxWidth="content">
            <BenchmarkTrendingTopics />
          </Container>
        </section>

        {/* 6. Methodology Preview — bg: white */}
        <SectionWrapper bg="white" compact>
          <Container maxWidth="content">
            <BenchmarkMethodologyPreview />
          </Container>
        </SectionWrapper>

        {/* 7. Custom Research CTA — bg: black (var(--black-900)) */}
        <BenchmarkCustomResearchCTA />
      </main>

      <Footer />

      {/* Mobile filter sheet */}
      <BenchmarkMobileFilterSheet
        isOpen={f.mobileFilterOpen}
        onClose={() => f.setMobileFilterOpen(false)}
        industries={f.industries}
        regions={f.regions}
        countries={f.countries}
        tags={f.tags}
        competitorSetSizes={f.competitorSetSizes}
        methodologies={f.methodologies}
        years={f.years}
        allYears={allYears}
        sort={f.sort}
        facetCounts={f.facetCounts}
        activeFilterCount={f.activeFilterCount}
        onToggleIndustry={f.toggleIndustry}
        onToggleRegion={f.toggleRegion}
        onToggleCountry={f.toggleCountry}
        onToggleTag={f.toggleTag}
        onToggleSize={f.toggleSize}
        onToggleMethodology={f.toggleMethodology}
        onToggleYear={f.toggleYear}
        onSortChange={f.setSort}
        onClearAll={f.clearAll}
      />

      {/* Mobile sticky filter button */}
      <MobileFilterBar
        activeFilterCount={f.activeFilterCount}
        onOpenFilters={() => f.setMobileFilterOpen(true)}
      />

      <BackToTop />

      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: 'var(--surface-cinematic-1)',
            color: 'var(--ink-on-dark-strong)',
            border: '1px solid var(--hairline-on-dark-soft)',
            fontSize: 'var(--text-xs)',
            borderRadius: 'var(--radius-element)',
          },
        }}
      />
    </div>
  );
}
