/**
 * ReportStorePage — Template (DS v4.3)
 *
 * WHAT: Full Report Store page template with Home and Listing modes.
 * WHY:  Replaces the two monolithic demo content files (ReportStoreDemoContent
 *       and ReportStoreListingDemoContent) with a single composable template
 *       built entirely from DS organisms, molecules, and atoms.
 * WHEN: The Report Store page in the design system dashboard.
 * HOW:  `mode` prop switches between "home" (discovery) and "listing" (filtered).
 *       Each mode composes the appropriate organisms in section order.
 *
 * HOME MODE SECTIONS (10):
 *   1. ReportStoreHero (BLACK)
 *   2. QuickAccessBar (WHITE/subtle)
 *   3. FeaturedResearch (WHITE)
 *   4. KeyMarketIndicators (WARM)
 *   5. RecommendedForYou (WHITE)
 *   6. DailyDataHighlights (WHITE + border)
 *   7. AnalystPicks (WARM)
 *   8. IndustrySectorsGrid (WHITE)
 *   9. ResearchMethodology (WARM)
 *  10. CustomResearchCTA (BLACK)
 *
 * LISTING MODE SECTIONS:
 *   IndustryFocusBanner + ListingToolbar + ActiveFilterChipBar +
 *   IndustrySidebar + CardListing + MobileFilterSheet
 */
import { useState, useMemo } from 'react';
import type { ViewMode } from '@/app/components/ViewToggle';
import { ActiveFilterChipBar } from '@/app/components/molecules/ActiveFilterChip';
import { MobileFilterSheet } from '@/app/components/molecules/MobileFilterSheet';
import { IndustryFocusBanner } from '@/app/components/organisms/IndustryFocusBanner';
import {
  ReportStoreHero,
  FeaturedResearch,
  KeyMarketIndicators,
  RecommendedForYou,
  CustomResearchCTA,
  QuickAccessBar,
  ListingToolbar,
  CardListing,
  IndustrySidebar,
  FiltersPanel,
} from '@/app/components/organisms';
import { DailyDataHighlights } from '@/app/components/organisms/DailyDataHighlights';
import { AnalystPicks } from '@/app/components/organisms/AnalystPicks';
import { IndustrySectorsGrid } from '@/app/components/organisms/IndustrySectorsGrid';
import { ResearchMethodology } from '@/app/components/organisms/ResearchMethodology';
import { useReportFilters } from '@/app/hooks/useReportFilters';
import { FULL_INDUSTRIES } from '@/app/components/data';

type PageMode = 'home' | 'listing';

interface ReportStorePageProps {
  /** Initial mode — default 'home' */
  initialMode?: PageMode;
}

export function ReportStorePage({ initialMode = 'home' }: ReportStorePageProps) {
  const [mode, setMode] = useState<PageMode>(initialMode);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [loading, setLoading] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const filters = useReportFilters();

  const simulateLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 800);
  };

  // Derive the selected industry's data for the banner
  const selectedIndustryData = useMemo(() => {
    if (!filters.selectedIndustry) return null;
    return FULL_INDUSTRIES.find(ind => ind.label === filters.selectedIndustry) || null;
  }, [filters.selectedIndustry]);

  // ═══════════════════════════════════════════════════════════
  // HOME MODE
  // ═══════════════════════════════════════════════════════════
  if (mode === 'home') {
    return (
      <div>
        {/* Section 1: Hero */}
        <ReportStoreHero />

        {/* Section 2: Quick Access Bar */}
        <QuickAccessBar onActionClick={() => setMode('listing')} />

        {/* Section 3: Featured Research */}
        <FeaturedResearch />

        {/* Section 4: Key Market Indicators */}
        <KeyMarketIndicators />

        {/* Section 5: Recommended Reports */}
        <RecommendedForYou />

        {/* Section 6: Daily Data Highlights */}
        <DailyDataHighlights />

        {/* Section 7: Analyst Picks */}
        <AnalystPicks />

        {/* Section 8: Explore by Sector */}
        <IndustrySectorsGrid onSectorClick={() => setMode('listing')} />

        {/* Section 9: Research Methodology */}
        <ResearchMethodology />

        {/* Section 10: Final CTA */}
        <CustomResearchCTA onSecondaryClick={() => setMode('listing')} />
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════
  // LISTING MODE
  // ═══════════════════════════════════════════════════════════
  return (
    <div className="px-4 sm:px-6 md:px-8 py-6">
      {/* Industry Focus Banner — shown when an industry is selected */}
      {selectedIndustryData && (
        <IndustryFocusBanner
          industryName={selectedIndustryData.label}
          reportCount={selectedIndustryData.count}
          subCategories={selectedIndustryData.subs}
          selectedSubs={filters.selectedSubIndustries}
          onToggleSub={filters.toggleSubIndustry}
          onClose={() => filters.selectIndustry(selectedIndustryData.label)}
        />
      )}

      <div className="flex gap-0 lg:gap-8 items-start">
        {/* Desktop Sidebar */}
        <IndustrySidebar filters={filters} />

        {/* Content */}
        <div className="flex-1 min-w-0">
          <ListingToolbar
            resultCount={filters.filtered.length}
            viewMode={viewMode}
            onViewModeChange={(m) => { setViewMode(m); simulateLoading(); }}
            sortBy={filters.sortBy}
            onSortChange={(key) => { filters.setSortBy(key); filters.applyFilter(); }}
            activeFilterCount={filters.activeFilterCount}
            onOpenMobileFilters={() => setMobileFilterOpen(true)}
            onBack={() => setMode('home')}
            selectedIndustry={filters.selectedIndustry}
          />

          <ActiveFilterChipBar
            filters={filters.activeChips}
            onClearAll={filters.clearAllFilters}
          />

          <CardListing
            items={filters.filtered}
            paginated={filters.paginated}
            viewMode={viewMode}
            loading={loading}
            currentPage={filters.currentPage}
            totalPages={filters.totalPages}
            onPageChange={(page) => { filters.handlePageChange(page); simulateLoading(); }}
            onClearFilters={filters.clearAllFilters}
          />
        </div>
      </div>

      {/* Mobile Filter Sheet */}
      <MobileFilterSheet
        isOpen={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        activeCount={filters.activeFilterCount}
        resultCount={filters.filtered.length}
        onClearAll={filters.clearAllFilters}
      >
        <FiltersPanel filters={filters} />
      </MobileFilterSheet>
    </div>
  );
}
