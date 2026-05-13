import { useState, useCallback } from "react";
import { Header } from "./components/Header";
import { ReportStoreHero } from "./components/ReportStoreHero";
import { FeaturedResearch } from "./components/FeaturedResearch";
import { IndustrySectorsGrid } from "./components/IndustrySectorsGrid";
import { IndustryReportSection } from "./components/IndustryReportSection";
import { CustomResearchCTA } from "./components/CustomResearchCTA";
import { IndustrySidebar } from "./components/IndustrySidebar";
import { ListingContextBanner } from "./components/ListingContextBanner";
import { ReportCard } from "./components/ReportCard";
import { Footer } from "./components/Footer";
import { RecommendedForYou } from "./components/RecommendedForYou";
import { AnalystPicks } from "./components/AnalystPicks";
import { TrendingStatistics } from "./components/TrendingStatistics";
import { DailyDataHighlights } from "./components/DailyDataHighlights";
import { QuickAccess } from "./components/QuickAccess";
import { TrendingTopics } from "./components/TrendingTopics";
import { ExploreByRegion } from "./components/ExploreByRegion";
import { Testimonials } from "./components/Testimonials";
import { UpcomingReports } from "./components/UpcomingReports";
import { Container } from "./components/Container";
import { SectionWrapper } from "./components/SectionWrapper";
import { FadeInSection } from "./components/FadeInSection";
import { BackToTop, LoadMoreSentinel } from "./components/molecules";
import type { ViewMode } from "./components/ViewToggle";
import { useReportFilters } from "./components/hooks/useReportFilters";
import { useProgressiveLoad } from "./components/hooks/useProgressiveLoad";
import { useCrossfade } from "./components/hooks/useCrossfade";
import { useMountTransition } from "./components/hooks/useMountTransition";
import { MobileFilterSheet } from "./components/MobileFilterSheet";
import { MobileFilterBar } from "./components/MobileFilterBar";
import { ListingToolbar } from "./components/ListingToolbar";
import { CardListing } from "./components/CardListing";
import { Toaster } from "sonner";

/* Report Store — Ken Research */
export default function App() {
  const f = useReportFilters();
  const [listingViewMode, setListingViewMode] = useState<ViewMode>("list");

  /* ── Progressive loading via hook ── */
  const {
    visibleItems: visibleReports,
    hasMore,
    isLoadingMore,
    sentinelRef,
  } = useProgressiveLoad(f.filteredReports, {
    initialCount: 12,
    loadMoreCount: 20,
  });

  /* ── Crossfade on filter change ── */
  const filterFingerprint = `${f.filteredReports.length}-${f.sidebarIndustry}-${f.searchQuery}-${f.sortBy}-${listingViewMode}`;
  const { crossfadeStyle } = useCrossfade(filterFingerprint);

  /* ── Banner mount transition ── */
  const showBanner = f.activeFilterCount > 0 || !!f.searchQuery;
  const { mounted: bannerMounted, transitionStyle: bannerTransitionStyle } = useMountTransition(showBanner);

  const handleViewReport = useCallback((id: string) => {
    alert(`Navigate to report detail page: /reports/${id}`);
  }, []);

  /* ── Build report data for ReportCard ── */
  const buildReportData = useCallback((report: typeof f.filteredReports[0]) => ({
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
    image: report.image || '',
  }), []);

  /* ── Skeleton count for load-more ── */
  const skeletonCount = listingViewMode === "grid" ? 3 : 4;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <ReportStoreHero
        searchQuery={f.searchQuery}
        onSearchChange={f.setSearchQuery}
        onSearchSubmit={f.handleSearchSubmit}
        onPopularClick={f.handlePopularClick}
        selectedCategory={f.searchCategory}
        onCategoryChange={f.setSearchCategory}
      />

      <main className="flex-1">
        {/* Persistent sidebar + content area */}
        <Container maxWidth="page">
          <div id="listing-area" className="flex gap-0 lg:gap-10 py-10 lg:py-12" style={{ scrollMarginTop: '72px' }}>
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
                <>
                  <div className="flex flex-col gap-12">
                    <FadeInSection>
                      <FeaturedResearch onViewReport={handleViewReport} />
                    </FadeInSection>
                    <FadeInSection delay={100}>
                      <RecommendedForYou onViewReport={handleViewReport} />
                    </FadeInSection>
                    <FadeInSection delay={150}>
                      <IndustrySectorsGrid onIndustrySelect={f.handleIndustrySelect} />
                    </FadeInSection>
                  </div>
                </>
              ) : (
                <>
                  {/* ===== LISTING MODE ===== */}

                  {/* -- Row 1: Listing Toolbar (extracted organism) -- */}
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

                  {/* -- Row 2: Unified Context Banner (smooth enter/exit) -- */}
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

                  {/* -- Row 3: Card Listing (extracted organism) -- */}
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
                        showProjection={true}
                        showMeta={true}
                        showViewButton={true}
                        showEyebrow={true}
                      />
                    )}
                  >
                    {/* LoadMoreSentinel via children slot */}
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

        {/* Full-width home sections */}
        {f.viewMode === "home" && (
          <>
            <FadeInSection>
              <SectionWrapper bg="white">
                <Container maxWidth="content">
                  <IndustryReportSection onIndustrySelect={f.handleIndustrySelect} onViewReport={handleViewReport} />
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

      <Footer />

      {/* Mobile filter sheet — below lg only */}
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

      {/* Mobile filter bar — sticky bottom, always visible below lg */}
      <MobileFilterBar
        activeFilterCount={f.activeFilterCount}
        onOpenFilters={() => f.setMobileFilterOpen(true)}
      />

      {/* Back to top floating button */}
      <BackToTop />

      {/* Toast notifications */}
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: "#1a1a1c",
            color: "rgba(255,255,255,0.85)",
            border: "1px solid rgba(255,255,255,0.08)",
            fontSize: "var(--text-xs)",
            borderRadius: "var(--radius-element)",
          },
        }}
      />
    </div>
  );
}
