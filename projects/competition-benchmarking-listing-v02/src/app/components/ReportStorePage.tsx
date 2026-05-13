/**
 * ReportStorePage — Page Template
 * Ken Bold DS v4.2
 *
 * WHAT:    Thin composition template for the Report Store page (content zone only)
 * WHY:     Demonstrates how to assemble DS organisms into a complete page
 * WHERE:   DS repo — templates directory; consumed by App.tsx or any page shell
 * WHEN:    Renders the full Report Store content between Header and Footer
 * HOW:     Pure composition glue — no inline logic; all behavior delegated to hooks and organisms
 *
 * NOTE: This template does NOT include Header/Footer — those are page shell concerns.
 *       The consuming App.tsx wraps this in <Header /> + <Footer />.
 *
 * HOOKS USED:
 *   - useReportFilters    → all filter/search/sort state + derived data
 *   - useProgressiveLoad  → infinite scroll with IntersectionObserver
 *   - useCrossfade        → opacity dip on filter change
 *   - useMountTransition  → banner enter/exit animation
 *
 * COMPOSITION PATTERN:
 *   ReportStoreHero
 *   ├─ Container > IndustrySidebar + content area
 *   │  ├─ HOME MODE:    FeaturedResearch → RecommendedForYou → IndustrySectorsGrid
 *   │  └─ LISTING MODE: ListingToolbar → ListingContextBanner → CardListing > ReportCard
 *   └─ HOME SECTIONS (full-width):
 *      IndustryReportSection → AnalystPicks → TrendingStatistics → DailyDataHighlights
 *      → QuickAccess → TrendingTopics → ExploreByRegion → Testimonials → UpcomingReports
 *      → CustomResearchCTA
 */

import { useState, useCallback } from "react";

/* ── DS Organisms ── */
import { ReportStoreHero } from "./ReportStoreHero";
import { FeaturedResearch } from "./FeaturedResearch";
import { IndustrySectorsGrid } from "./IndustrySectorsGrid";
import { IndustryReportSection } from "./IndustryReportSection";
import { CustomResearchCTA } from "./CustomResearchCTA";
import { IndustrySidebar } from "./IndustrySidebar";
import { ListingContextBanner } from "./ListingContextBanner";
import { ReportCard } from "./ReportCard";
import { RecommendedForYou } from "./RecommendedForYou";
import { AnalystPicks } from "./AnalystPicks";
import { TrendingStatistics } from "./TrendingStatistics";
import { DailyDataHighlights } from "./DailyDataHighlights";
import { QuickAccess } from "./QuickAccess";
import { TrendingTopics } from "./TrendingTopics";
import { ExploreByRegion } from "./ExploreByRegion";
import { Testimonials } from "./Testimonials";
import { UpcomingReports } from "./UpcomingReports";
import { ListingToolbar } from "./ListingToolbar";
import { CardListing } from "./CardListing";

/* ── DS Atoms / Molecules ── */
import { Container } from "./Container";
import { SectionWrapper } from "./SectionWrapper";
import { FadeInSection } from "./FadeInSection";
import { BackToTop, LoadMoreSentinel } from "./molecules";
import type { ViewMode } from "./ViewToggle";
import { MobileFilterSheet } from "./MobileFilterSheet";
import { MobileFilterBar } from "./MobileFilterBar";

/* ── Hooks ── */
import { useReportFilters } from "./hooks/useReportFilters";
import { useProgressiveLoad } from "./hooks/useProgressiveLoad";
import { useCrossfade } from "./hooks/useCrossfade";
import { useMountTransition } from "./hooks/useMountTransition";

/**
 * ReportStorePage — content zone template
 * Mount inside a page shell that provides Header + Footer.
 */
export function ReportStorePage() {
  const f = useReportFilters();
  const [listingViewMode, setListingViewMode] = useState<ViewMode>("list");

  /* ── Progressive loading ── */
  const {
    visibleItems: visibleReports,
    hasMore,
    isLoadingMore,
    sentinelRef,
  } = useProgressiveLoad(f.filteredReports);

  /* ── Crossfade on filter change ── */
  const filterFingerprint = `${f.filteredReports.length}-${f.sidebarIndustry}-${f.searchQuery}-${f.sortBy}-${listingViewMode}`;
  const { crossfadeStyle } = useCrossfade(filterFingerprint);

  /* ── Banner mount transition ── */
  const showBanner = f.activeFilterCount > 0 || !!f.searchQuery;
  const { mounted: bannerMounted, transitionStyle: bannerTransitionStyle } =
    useMountTransition(showBanner);

  /* ── Callbacks ── */
  const handleViewReport = useCallback((id: string) => {
    // Replace with router navigation in production
    alert(`Navigate to report detail page: /reports/${id}`);
  }, []);

  const buildReportData = useCallback(
    (report: (typeof f.filteredReports)[0]) => ({
      id: report.id,
      title: report.title,
      industry: report.industry,
      subcat: report.subcat,
      region: report.region,
      date: report.date,
      pages: report.pages,
      tables: report.tables,
      figures: report.figures,
      downloads: report.downloads,
      projection: report.projection,
      formats: report.formats,
      badge: report.badge,
      image: report.image || "",
    }),
    []
  );

  const skeletonCount = listingViewMode === "grid" ? 3 : 4;

  return (
    <>
      {/* ════════════════════════════════════════════════
          HERO
          ════════════════════════════════════════════════ */}
      <ReportStoreHero
        searchQuery={f.searchQuery}
        onSearchChange={f.setSearchQuery}
        onSearchSubmit={f.handleSearchSubmit}
        onPopularClick={f.handlePopularClick}
        selectedCategory={f.searchCategory}
        onCategoryChange={f.setSearchCategory}
      />

      <main className="flex-1">
        {/* ════════════════════════════════════════════════
            SIDEBAR + CONTENT AREA
            ════════════════════════════════════════════════ */}
        <Container maxWidth="page">
          <div
            id="listing-area"
            className="flex gap-0 lg:gap-10 py-10 lg:py-12"
            style={{ scrollMarginTop: "72px" }}
          >
            <IndustrySidebar
              selectedIndustry={f.sidebarIndustry}
              onIndustrySelect={f.handleSidebarIndustrySelect}
              onSubcategorySelect={f.handleSubcategorySelect}
              onClear={f.handleClearSidebar}
              viewMode={f.viewMode}
              currentSubIndustries={f.sidebarSubIndustries}
              currentTags={f.sidebarTags}
              currentRegions={f.sidebarRegions}
              currentYears={f.sidebarYears}
              onSubIndustriesChange={f.handleSidebarSubIndustriesChange}
              onTagsChange={f.handleSidebarTagsChange}
              onRegionsChange={f.handleSidebarRegionsChange}
              onYearsChange={f.handleSidebarYearsChange}
            />

            <div className="flex-1 min-w-0 flex flex-col">
              {f.viewMode === "home" ? (
                <HomeSections
                  onViewReport={handleViewReport}
                  onIndustrySelect={f.handleIndustrySelect}
                />
              ) : (
                <>
                  {/* Listing Toolbar */}
                  <ListingToolbar
                    backLabel="Back to Report Store"
                    onBack={f.handleBackToHome}
                    resultCount={f.filteredReports.length}
                    resultLabel="reports"
                    contextLabel={f.sidebarIndustry || undefined}
                    searchQuery={f.searchQuery}
                    viewMode={listingViewMode}
                    onViewModeChange={setListingViewMode}
                    sortBy={f.sortBy}
                    onSortChange={f.setSortBy}
                    activeFilterCount={f.activeFilterCount}
                    onOpenMobileFilters={() => f.setMobileFilterOpen(true)}
                  />

                  {/* Context Banner */}
                  {bannerMounted && (
                    <div className="mb-5" style={bannerTransitionStyle}>
                      <ListingContextBanner
                        selectedIndustry={f.sidebarIndustry}
                        selectedSubIndustries={f.sidebarSubIndustries}
                        selectedTags={f.sidebarTags}
                        selectedRegions={f.sidebarRegions}
                        selectedYears={f.sidebarYears}
                        searchQuery={f.searchQuery}
                        filteredCount={f.filteredReports.length}
                        onRemoveIndustry={f.removeIndustry}
                        onRemoveSubIndustry={f.removeSubIndustry}
                        onRemoveTag={f.removeTag}
                        onRemoveRegion={f.removeRegion}
                        onRemoveYear={f.removeYear}
                        onRemoveSearch={f.removeSearch}
                        onClearAll={f.clearAllFilters}
                        onSubcategoryClick={f.handleSubcategorySelect}
                      />
                    </div>
                  )}

                  {/* Card Listing */}
                  <CardListing
                    items={visibleReports}
                    keyExtractor={(report) => report.id}
                    viewMode={listingViewMode}
                    crossfadeStyle={crossfadeStyle}
                    isLoadingMore={isLoadingMore}
                    skeletonCount={skeletonCount}
                    emptyMessage="No reports found matching your criteria."
                    onEmptyAction={f.clearAllFilters}
                    renderCard={(report) => (
                      <ReportCard
                        variant={listingViewMode}
                        report={buildReportData(report)}
                        onView={() => handleViewReport(report.id)}
                        showSave={false}
                        showProjection
                        showMeta
                        showViewButton
                        showEyebrow
                      />
                    )}
                  >
                    <LoadMoreSentinel
                      ref={sentinelRef}
                      visibleCount={visibleReports.length}
                      totalCount={f.filteredReports.length}
                      hasMore={hasMore}
                      isLoading={isLoadingMore}
                      itemLabel="reports"
                    />
                  </CardListing>
                </>
              )}
            </div>
          </div>
        </Container>

        {/* ════════════════════════════════════════════════
            FULL-WIDTH HOME SECTIONS
            ════════════════════════════════════════════════ */}
        {f.viewMode === "home" && (
          <>
            <FadeInSection>
              <SectionWrapper bg="white">
                <Container maxWidth="content">
                  <IndustryReportSection
                    onIndustrySelect={f.handleIndustrySelect}
                    onViewReport={handleViewReport}
                  />
                </Container>
              </SectionWrapper>
            </FadeInSection>
            <FadeInSection>
              <SectionWrapper bg="neutral50">
                <Container maxWidth="content">
                  <AnalystPicks onViewReport={handleViewReport} />
                </Container>
              </SectionWrapper>
            </FadeInSection>
            <FadeInSection>
              <SectionWrapper bg="white">
                <Container maxWidth="content">
                  <TrendingStatistics />
                </Container>
              </SectionWrapper>
            </FadeInSection>
            <FadeInSection>
              <SectionWrapper bg="white">
                <Container maxWidth="content">
                  <DailyDataHighlights />
                </Container>
              </SectionWrapper>
            </FadeInSection>
            <FadeInSection>
              <SectionWrapper bg="white">
                <Container maxWidth="content">
                  <QuickAccess />
                </Container>
              </SectionWrapper>
            </FadeInSection>
            <FadeInSection>
              <SectionWrapper bg="white">
                <Container maxWidth="content">
                  <TrendingTopics onTopicClick={f.handlePopularClick} />
                </Container>
              </SectionWrapper>
            </FadeInSection>
            <FadeInSection>
              <SectionWrapper bg="white">
                <Container maxWidth="content">
                  <ExploreByRegion onRegionClick={f.handleRegionClick} />
                </Container>
              </SectionWrapper>
            </FadeInSection>
            <FadeInSection>
              <SectionWrapper bg="neutral50">
                <Container maxWidth="content">
                  <Testimonials />
                </Container>
              </SectionWrapper>
            </FadeInSection>
            <FadeInSection>
              <SectionWrapper bg="white">
                <Container maxWidth="content">
                  <UpcomingReports />
                </Container>
              </SectionWrapper>
            </FadeInSection>
          </>
        )}

        {f.viewMode === "home" && <CustomResearchCTA />}
      </main>

      {/* ════════════════════════════════════════════════
          MOBILE OVERLAYS
          ════════════════════════════════════════════════ */}
      <MobileFilterSheet
        isOpen={f.mobileFilterOpen}
        onClose={() => f.setMobileFilterOpen(false)}
        sidebarIndustry={f.sidebarIndustry}
        sidebarSubIndustries={f.sidebarSubIndustries}
        sidebarRegions={f.sidebarRegions}
        sidebarYears={f.sidebarYears}
        sortBy={f.sortBy}
        onSortChange={f.setSortBy}
        onIndustrySelect={f.handleSidebarIndustrySelect}
        onSubcategorySelect={f.handleSubcategorySelect}
        onRegionsChange={f.handleSidebarRegionsChange}
        onYearsChange={f.handleSidebarYearsChange}
        onClearAll={f.clearAllFilters}
        activeFilterCount={f.activeFilterCount}
      />

      <MobileFilterBar
        activeFilterCount={f.activeFilterCount}
        onOpenFilters={() => f.setMobileFilterOpen(true)}
      />

      <BackToTop />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   PRIVATE COMPOSITION FRAGMENTS
   Keeps the main template function focused on layout.
   These are NOT exported — they exist only to reduce nesting.
   ───────────────────────────────────────────────────────────── */

function HomeSections({
  onViewReport,
  onIndustrySelect,
}: {
  onViewReport: (id: string) => void;
  onIndustrySelect: (industry: string) => void;
}) {
  return (
    <div className="flex flex-col gap-12">
      <FadeInSection>
        <FeaturedResearch onViewReport={onViewReport} />
      </FadeInSection>
      <FadeInSection delay={100}>
        <RecommendedForYou onViewReport={onViewReport} />
      </FadeInSection>
      <FadeInSection delay={150}>
        <IndustrySectorsGrid onIndustrySelect={onIndustrySelect} />
      </FadeInSection>
    </div>
  );
}
