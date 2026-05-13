/**
 * ReportStoreOrganismsShowcase — Interactive showcase (DS v4.3)
 *
 * WHAT: Gallery of all Report Store organisms with live previews.
 * WHY:  Lets designers and developers see every RS organism rendered live,
 *       with prop info and usage notes — part of the Patterns tab.
 * WHEN: Patterns → RS Organisms sub-tab.
 * HOW:  Each organism wrapped in a labeled card with a description.
 */
import { useState } from 'react';
import { ChevronDown, ChevronRight, Eye, EyeOff } from 'lucide-react';

// ── Organisms ──
import { ReportStoreHero } from '@/app/components/organisms/ReportStoreHero';
import { FeaturedResearch } from '@/app/components/organisms/FeaturedResearch';
import { KeyMarketIndicators } from '@/app/components/organisms/KeyMarketIndicators';
import { RecommendedForYou } from '@/app/components/organisms/RecommendedForYou';
import { DailyDataHighlights } from '@/app/components/organisms/DailyDataHighlights';
import { AnalystPicks } from '@/app/components/organisms/AnalystPicks';
import { IndustrySectorsGrid } from '@/app/components/organisms/IndustrySectorsGrid';
import { CustomResearchCTA } from '@/app/components/organisms/CustomResearchCTA';
import { QuickAccessBar } from '@/app/components/organisms/QuickAccessBar';
import { TrendingTopics } from '@/app/components/organisms/TrendingTopics';
import { TopDownloads } from '@/app/components/organisms/TopDownloads';
import { RecentlyViewed } from '@/app/components/organisms/RecentlyViewed';
import { UpcomingReports } from '@/app/components/organisms/UpcomingReports';
import { ResearchMethodology } from '@/app/components/organisms/ResearchMethodology';
import { NewsletterSignup } from '@/app/components/organisms/NewsletterSignup';
import { IndustrySpotlight } from '@/app/components/organisms/IndustrySpotlight';
import { ComparisonTable } from '@/app/components/organisms/ComparisonTable';
import { TestimonialsRS } from '@/app/components/organisms/TestimonialsRS';
import { ReportPreview } from '@/app/components/organisms/ReportPreview';

// ── Listing organisms (shown inline) ──
import { ListingToolbar } from '@/app/components/organisms/ListingToolbar';
import { CardListing } from '@/app/components/organisms/CardListing';
import { FiltersPanel } from '@/app/components/organisms/FiltersPanel';
import { IndustrySidebar } from '@/app/components/organisms/IndustrySidebar';
import { IndustryFocusBanner } from '@/app/components/organisms/IndustryFocusBanner';
import { ActiveFilterChipBar } from '@/app/components/molecules/ActiveFilterChip';

// ── Atoms & Molecules ──
import { IconBadge } from '@/app/components/IconBadge';
import { CategoryListItem } from '@/app/components/CategoryListItem';
import { CategoryListCard } from '@/app/components/molecules/CategoryListCard';
import { LoadMoreSentinel } from '@/app/components/molecules/LoadMoreSentinel';
import { FilterSearchInput } from '@/app/components/FilterSearchInput';
import { FilterSectionHeader } from '@/app/components/FilterSectionHeader';
import { FilterCheckboxItem } from '@/app/components/FilterCheckboxItem';
import { FilterCheckbox } from '@/app/components/FilterCheckbox';
import { FilterChip } from '@/app/components/FilterChip';
import { FilterIndustryItem } from '@/app/components/FilterIndustryItem';
import { useReportFilters } from '@/app/hooks/useReportFilters';
import { ALL_REPORTS, FULL_INDUSTRIES } from '@/app/components/data';
import { BarChart3, TrendingUp, Globe, FileText } from 'lucide-react';
import { useRef } from 'react';

/* ─── Organism entry definition ─── */
interface OrganismEntry {
  id: string;
  name: string;
  phase: string;
  category: 'home' | 'listing' | 'detail' | 'atom' | 'molecule';
  description: string;
  render: () => React.ReactNode;
  darkBg?: boolean;
}

/* ─── Collapsible showcase card ─── */
function ShowcaseCard({
  entry,
  isOpen,
  onToggle,
}: {
  entry: OrganismEntry;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const categoryColors: Record<string, { bg: string; text: string }> = {
    home: { bg: 'rgba(128,108,224,0.08)', text: 'rgba(128,108,224,1)' },
    listing: { bg: 'rgba(59,130,246,0.08)', text: 'rgba(59,130,246,1)' },
    detail: { bg: 'rgba(16,185,129,0.08)', text: 'rgba(16,185,129,1)' },
    atom: { bg: 'rgba(245,158,11,0.08)', text: 'rgba(245,158,11,1)' },
    molecule: { bg: 'rgba(236,72,153,0.08)', text: 'rgba(236,72,153,1)' },
  };
  const cat = categoryColors[entry.category] || categoryColors.home;

  return (
    <div
      className="overflow-hidden"
      style={{
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: isOpen ? 'rgba(0,0,0,0.12)' : 'rgba(0,0,0,0.06)',
        borderRadius: '10px',
        transition: 'border-color 0.15s',
      }}
    >
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 px-5 py-4 cursor-pointer transition-colors"
        style={{ backgroundColor: isOpen ? 'rgba(0,0,0,0.02)' : 'rgba(0,0,0,0)' }}
      >
        {isOpen ? (
          <ChevronDown size={14} style={{ color: 'rgba(0,0,0,0.35)', flexShrink: 0 }} />
        ) : (
          <ChevronRight size={14} style={{ color: 'rgba(0,0,0,0.25)', flexShrink: 0 }} />
        )}

        <div className="flex-1 text-left min-w-0">
          <div className="flex items-center gap-2">
            <span
              className="font-mono"
              style={{ fontSize: 'var(--text-sm)', color: 'rgba(0,0,0,0.85)' }}
            >
              {entry.name}
            </span>
            <span
              className="px-1.5 py-0.5"
              style={{
                fontSize: '10px',
                borderRadius: '4px',
                backgroundColor: cat.bg,
                color: cat.text,
              }}
            >
              {entry.category}
            </span>
            <span
              className="px-1.5 py-0.5"
              style={{
                fontSize: '10px',
                borderRadius: '4px',
                backgroundColor: 'rgba(0,0,0,0.04)',
                color: 'rgba(0,0,0,0.4)',
              }}
            >
              {entry.phase}
            </span>
          </div>
          <p
            className="mt-0.5 truncate"
            style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.4)' }}
          >
            {entry.description}
          </p>
        </div>

        <span
          className="flex-shrink-0 flex items-center gap-1"
          style={{ fontSize: '10px', color: 'rgba(0,0,0,0.3)' }}
        >
          {isOpen ? <EyeOff size={12} /> : <Eye size={12} />}
          {isOpen ? 'Hide' : 'Preview'}
        </span>
      </button>

      {/* Preview */}
      {isOpen && (
        <div
          style={{
            borderTopWidth: '1px',
            borderTopStyle: 'solid',
            borderTopColor: 'rgba(0,0,0,0.06)',
            backgroundColor: entry.darkBg ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0)',
          }}
        >
          <div className="overflow-x-auto">
            {entry.render()}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Main showcase ─── */
export function ReportStoreOrganismsShowcase() {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());
  const [filterCat, setFilterCat] = useState<string>('all');
  const filters = useReportFilters();
  const sentinelRef = useRef<HTMLDivElement>(null);

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const expandAll = () => {
    setOpenIds(new Set(ORGANISMS.map((o) => o.id)));
  };

  const collapseAll = () => {
    setOpenIds(new Set());
  };

  /* ─── Organism registry ─── */
  const ORGANISMS: OrganismEntry[] = [
    // ── Atoms ──
    {
      id: 'icon-badge',
      name: 'IconBadge',
      phase: 'Phase 5',
      category: 'atom',
      description: 'Small icon container with background tint. Used in section headers, list items, card accents.',
      render: () => (
        <div className="p-6 flex items-center gap-4 flex-wrap">
          <div className="flex flex-col items-center gap-2">
            <IconBadge icon={BarChart3} size="xs" />
            <span style={{ fontSize: '10px', color: 'rgba(0,0,0,0.4)' }}>xs</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <IconBadge icon={TrendingUp} size="sm" />
            <span style={{ fontSize: '10px', color: 'rgba(0,0,0,0.4)' }}>sm</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <IconBadge icon={Globe} size="md" />
            <span style={{ fontSize: '10px', color: 'rgba(0,0,0,0.4)' }}>md</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <IconBadge icon={FileText} size="lg" />
            <span style={{ fontSize: '10px', color: 'rgba(0,0,0,0.4)' }}>lg</span>
          </div>
        </div>
      ),
    },
    {
      id: 'category-list-item',
      name: 'CategoryListItem',
      phase: 'Phase 5',
      category: 'atom',
      description: 'Single category row with icon, label, count, and chevron.',
      render: () => (
        <div className="p-4" style={{ maxWidth: '320px' }}>
          <CategoryListItem label="Technology & Telecom" count={42} icon={BarChart3} />
          <CategoryListItem label="Healthcare" count={28} icon={TrendingUp} active />
          <CategoryListItem label="Energy & Utilities" count={15} icon={Globe} />
        </div>
      ),
    },
    {
      id: 'filter-search-input',
      name: 'FilterSearchInput',
      phase: 'Phase 5',
      category: 'atom',
      description: 'Search input with icon and clear button. States: default, focused (border 0.9), disabled (bg 0.03).',
      render: () => (
        <div className="p-6 space-y-3" style={{ maxWidth: '320px' }}>
          <div>
            <p style={{ fontSize: 'var(--text-card-micro)', color: 'rgba(0,0,0,0.35)', marginBottom: '4px' }}>Default</p>
            <FilterSearchInput value="" onChange={() => {}} placeholder="Search filters..." />
          </div>
          <div>
            <p style={{ fontSize: 'var(--text-card-micro)', color: 'rgba(0,0,0,0.35)', marginBottom: '4px' }}>With value</p>
            <FilterSearchInput value="Technology" onChange={() => {}} />
          </div>
          <div>
            <p style={{ fontSize: 'var(--text-card-micro)', color: 'rgba(0,0,0,0.35)', marginBottom: '4px' }}>Disabled</p>
            <FilterSearchInput value="" onChange={() => {}} disabled />
          </div>
        </div>
      ),
    },
    {
      id: 'filter-section-header',
      name: 'FilterSectionHeader',
      phase: 'Phase 5',
      category: 'atom',
      description: 'Collapsible section header with icon-box, label, count badge, chevron. States: default, active, disabled.',
      render: () => (
        <div style={{ maxWidth: '280px' }}>
          <FilterSectionHeader icon={<Globe size={12} style={{ color: 'rgba(0,0,0,0.4)' }} />} label="Industries" isOpen={true} activeCount={0} />
          <FilterSectionHeader icon={<TrendingUp size={12} style={{ color: 'rgba(0,0,0,0.4)' }} />} label="Tags" isOpen={false} activeCount={2} active />
          <FilterSectionHeader icon={<FileText size={12} style={{ color: 'rgba(0,0,0,0.4)' }} />} label="Regions" isOpen={false} disabled />
        </div>
      ),
    },
    {
      id: 'filter-checkbox-item',
      name: 'FilterCheckboxItem',
      phase: 'Phase 5',
      category: 'atom',
      description: 'Multi-select checkbox row with square check, label, count. States: unchecked, checked (filled + borderLeft).',
      render: () => (
        <div style={{ maxWidth: '280px' }}>
          <FilterCheckboxItem label="North America" count={42} checked={false} />
          <FilterCheckboxItem label="Europe" count={38} checked={true} />
          <FilterCheckboxItem label="Asia Pacific" count={24} checked={false} />
          <FilterCheckboxItem label="Latin America" count={11} checked={true} />
        </div>
      ),
    },
    {
      id: 'filter-checkbox',
      name: 'FilterCheckbox',
      phase: 'Phase 5',
      category: 'atom',
      description: 'Single-select text row with borderLeft indicator. States: default, selected, disabled.',
      render: () => (
        <div style={{ maxWidth: '280px' }}>
          <FilterCheckbox label="All Reports" count={156} selected={false} />
          <FilterCheckbox label="Full Reports" count={89} selected={true} />
          <FilterCheckbox label="Market Briefs" count={42} selected={false} />
          <FilterCheckbox label="Archived" count={3} disabled />
        </div>
      ),
    },
    {
      id: 'filter-chip',
      name: 'FilterChip',
      phase: 'Phase 5',
      category: 'atom',
      description: 'Dismissible pill showing an active filter value with optional category prefix. States: with remove (X), read-only (no X).',
      render: () => (
        <div className="p-6 flex items-center gap-2 flex-wrap">
          <FilterChip label="Aftermarket & Spare Parts" category="SUB-INDUSTRY" onRemove={() => {}} />
          <FilterChip label="Electric Vehicles" category="SUB-INDUSTRY" onRemove={() => {}} />
          <FilterChip label="Africa" category="REGION" onRemove={() => {}} />
          <FilterChip label="2025" category="YEAR" onRemove={() => {}} />
          <FilterChip label="Technology" onRemove={() => {}} />
          <FilterChip label="Read-only" />
        </div>
      ),
    },
    {
      id: 'filter-industry-item',
      name: 'FilterIndustryItem',
      phase: 'Phase 5',
      category: 'atom',
      description: 'Expandable industry row with chevron, count, nested children. States: unselected, selected (expanded).',
      render: () => (
        <div style={{ maxWidth: '280px' }}>
          <FilterIndustryItem label="Technology" count={42} selected={false} />
          <FilterIndustryItem label="Healthcare" count={28} selected={true}>
            <div>
              <FilterCheckbox label="Pharma" count={12} />
              <FilterCheckbox label="Biotech" count={8} selected />
              <FilterCheckbox label="Medical Devices" count={8} />
            </div>
          </FilterIndustryItem>
          <FilterIndustryItem label="Energy" count={15} selected={false} />
        </div>
      ),
    },

    // ── Molecules ──
    {
      id: 'category-list-card',
      name: 'CategoryListCard',
      phase: 'Phase 5',
      category: 'molecule',
      description: 'Card containing a vertical list of navigable categories with counts.',
      render: () => (
        <div className="p-6" style={{ maxWidth: '320px' }}>
          <CategoryListCard
            title="Browse by Industry"
            label="Categories"
            items={[
              { label: 'Technology', count: 42, icon: BarChart3 },
              { label: 'Healthcare', count: 28, icon: TrendingUp },
              { label: 'Energy', count: 15, icon: Globe },
              { label: 'Financial Services', count: 33, icon: FileText },
            ]}
            activeLabel="Healthcare"
            showChevrons
          />
        </div>
      ),
    },
    {
      id: 'load-more-sentinel',
      name: 'LoadMoreSentinel',
      phase: 'Phase 5',
      category: 'molecule',
      description: 'Invisible IO trigger + loading indicator for infinite scroll.',
      render: () => (
        <div className="p-6">
          <LoadMoreSentinel
            sentinelRef={sentinelRef}
            hasMore={true}
            loading={true}
            visibleCount={12}
            totalCount={156}
          />
        </div>
      ),
    },

    // ── Home page organisms ──
    {
      id: 'report-store-hero',
      name: 'ReportStoreHero',
      phase: 'Phase 2',
      category: 'home',
      description: 'Full-bleed black hero with search bar, featured badge, and category quick-links.',
      darkBg: true,
      render: () => <ReportStoreHero />,
    },
    {
      id: 'quick-access-bar',
      name: 'QuickAccessBar',
      phase: 'Phase 4',
      category: 'home',
      description: 'Horizontal quick-access action bar with icon + label buttons.',
      render: () => <QuickAccessBar />,
    },
    {
      id: 'featured-research',
      name: 'FeaturedResearch',
      phase: 'Phase 2',
      category: 'home',
      description: 'Featured reports horizontal scroll with ReportCard thumbnails.',
      render: () => <FeaturedResearch />,
    },
    {
      id: 'key-market-indicators',
      name: 'KeyMarketIndicators',
      phase: 'Phase 4',
      category: 'home',
      description: 'StatsRow wrapper with RS market data (4 stat cards).',
      render: () => <KeyMarketIndicators />,
    },
    {
      id: 'recommended-for-you',
      name: 'RecommendedForYou',
      phase: 'Phase 4',
      category: 'home',
      description: 'BrowseGrid wrapper with personalized report recommendations + view toggle.',
      render: () => <RecommendedForYou />,
    },
    {
      id: 'daily-data-highlights',
      name: 'DailyDataHighlights',
      phase: 'Phase 3',
      category: 'home',
      description: 'Daily data points with DataHighlightCard grid (4 cards).',
      render: () => <DailyDataHighlights />,
    },
    {
      id: 'analyst-picks',
      name: 'AnalystPicks',
      phase: 'Phase 3',
      category: 'home',
      description: 'Expert analyst recommendations with AnalystPickCardB grid.',
      render: () => <AnalystPicks />,
    },
    {
      id: 'industry-sectors-grid',
      name: 'IndustrySectorsGrid',
      phase: 'Phase 3',
      category: 'home',
      description: 'Industry sector cards with icon badges and report counts.',
      render: () => <IndustrySectorsGrid />,
    },
    {
      id: 'trending-topics',
      name: 'TrendingTopics',
      phase: 'Phase 4',
      category: 'home',
      description: 'Trending research topics as clickable pills with growth badges.',
      render: () => <TrendingTopics />,
    },
    {
      id: 'top-downloads',
      name: 'TopDownloads',
      phase: 'Phase 4',
      category: 'home',
      description: 'Top downloaded reports ranked list with download counts.',
      render: () => <TopDownloads />,
    },
    {
      id: 'recently-viewed',
      name: 'RecentlyViewed',
      phase: 'Phase 4',
      category: 'home',
      description: 'Recently viewed reports horizontal scroll row (personalization).',
      render: () => <RecentlyViewed />,
    },
    {
      id: 'upcoming-reports',
      name: 'UpcomingReports',
      phase: 'Phase 4',
      category: 'home',
      description: 'Upcoming/pipeline reports with expected dates and notify buttons.',
      render: () => <UpcomingReports />,
    },
    {
      id: 'industry-spotlight',
      name: 'IndustrySpotlight',
      phase: 'Phase 4',
      category: 'home',
      description: 'Featured industry deep-dive with stats grid + featured report card.',
      render: () => <IndustrySpotlight />,
    },
    {
      id: 'testimonials-rs',
      name: 'TestimonialsRS',
      phase: 'Phase 4',
      category: 'home',
      description: 'Client testimonials section with quote cards (social proof).',
      render: () => <TestimonialsRS />,
    },
    {
      id: 'comparison-table',
      name: 'ComparisonTable',
      phase: 'Phase 4',
      category: 'home',
      description: 'Report format comparison table (Full Report vs Market Brief vs Data Pack).',
      render: () => <ComparisonTable />,
    },
    {
      id: 'research-methodology',
      name: 'ResearchMethodology',
      phase: 'Phase 4',
      category: 'home',
      description: 'Research methodology 5-step process section (trust-building).',
      render: () => <ResearchMethodology />,
    },
    {
      id: 'newsletter-signup',
      name: 'NewsletterSignup',
      phase: 'Phase 4',
      category: 'home',
      description: 'Newsletter/email subscription banner with email input + submit.',
      render: () => <NewsletterSignup />,
    },
    {
      id: 'custom-research-cta',
      name: 'CustomResearchCTA',
      phase: 'Phase 4',
      category: 'home',
      description: 'CTABanner wrapper with RS-specific CTA copy (black background).',
      darkBg: true,
      render: () => <CustomResearchCTA />,
    },

    // ── Listing organisms ──
    {
      id: 'industry-focus-banner',
      name: 'IndustryFocusBanner',
      phase: 'Phase 5',
      category: 'listing',
      description: 'Dark hero banner for selected industry with sub-category pills, count, and close button.',
      render: () => {
        const autoInd = FULL_INDUSTRIES.find(i => i.label === 'Automotive & Transportation')!;
        return (
          <div className="p-4">
            <IndustryFocusBanner
              industryName={autoInd.label}
              reportCount={autoInd.count}
              subCategories={autoInd.subs}
              selectedSubs={['Electric Vehicles', 'Autonomous Driving']}
              onToggleSub={() => {}}
              onClose={() => {}}
            />
          </div>
        );
      },
    },
    {
      id: 'active-filter-chip-bar',
      name: 'ActiveFilterChipBar',
      phase: 'Phase 5',
      category: 'molecule',
      description: 'Bar of active filter chips with "X FILTERS" count, category prefixes, and "Clear all" action.',
      render: () => (
        <div className="p-4">
          <ActiveFilterChipBar
            filters={[
              { label: 'Aftermarket & Spare Parts', category: 'SUB-INDUSTRY', onRemove: () => {} },
              { label: 'Electric Vehicles', category: 'SUB-INDUSTRY', onRemove: () => {} },
              { label: 'Autonomous Driving', category: 'SUB-INDUSTRY', onRemove: () => {} },
              { label: 'Africa', category: 'REGION', onRemove: () => {} },
              { label: '2025', category: 'YEAR', onRemove: () => {} },
            ]}
            onClearAll={() => {}}
          />
        </div>
      ),
    },
    {
      id: 'listing-toolbar',
      name: 'ListingToolbar',
      phase: 'Phase 2',
      category: 'listing',
      description: 'Toolbar with back nav, result count + industry context, view toggle, sort dropdown, and mobile filter button.',
      render: () => (
        <div className="p-4">
          <ListingToolbar
            resultCount={0}
            viewMode="grid"
            onViewModeChange={() => {}}
            sortBy="date"
            onSortChange={() => {}}
            activeFilterCount={5}
            onOpenMobileFilters={() => {}}
            selectedIndustry="Automotive & Transportation"
          />
        </div>
      ),
    },
    {
      id: 'filters-panel',
      name: 'FiltersPanel',
      phase: 'Phase 2',
      category: 'listing',
      description: 'Filter accordion panel with Industry, Format, and Region filter groups.',
      render: () => (
        <div className="p-4" style={{ maxWidth: '280px' }}>
          <FiltersPanel filters={filters} />
        </div>
      ),
    },
    {
      id: 'industry-sidebar',
      name: 'IndustrySidebar',
      phase: 'Phase 2',
      category: 'listing',
      description: 'SidebarPanel wrapper with industry filter list + "Filters" heading.',
      render: () => (
        <div className="p-4" style={{ maxWidth: '280px' }}>
          <IndustrySidebar filters={filters} />
        </div>
      ),
    },
    {
      id: 'card-listing',
      name: 'CardListing',
      phase: 'Phase 2',
      category: 'listing',
      description: 'Card grid/list with pagination, empty state, and loading skeletons.',
      render: () => (
        <div className="p-4">
          <CardListing
            items={filters.filtered.slice(0, 6)}
            paginated={filters.filtered.slice(0, 6)}
            viewMode="grid"
            loading={false}
            currentPage={1}
            totalPages={3}
            onPageChange={() => {}}
            onClearFilters={() => {}}
          />
        </div>
      ),
    },

    // ── Detail organisms ──
    {
      id: 'report-preview',
      name: 'ReportPreview',
      phase: 'Phase 4',
      category: 'detail',
      description: 'Full report detail view with breadcrumb, TOC, metadata, cover image, and download actions.',
      render: () => (
        <ReportPreview report={{ ...ALL_REPORTS[0], description: 'Complete TAM analysis of AI-optimized chips including GPUs, TPUs, and custom ASICs across cloud and edge deployments.' }} />
      ),
    },
  ];

  const categories = ['all', 'atom', 'molecule', 'home', 'listing', 'detail'];
  const filteredOrganisms = filterCat === 'all'
    ? ORGANISMS
    : ORGANISMS.filter((o) => o.category === filterCat);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div
        className="p-8"
        style={{
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'rgba(0,0,0,0.08)',
          borderRadius: '10px',
          backgroundColor: 'rgba(0,0,0,0.015)',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-2xl)',
            color: 'rgba(0,0,0,0.9)',
          }}
        >
          Report Store Organisms — Interactive Showcase
        </h1>
        <p
          className="mt-2"
          style={{ fontSize: 'var(--text-sm)', color: 'rgba(0,0,0,0.5)', maxWidth: '700px' }}
        >
          All {ORGANISMS.length} Report Store components ({ORGANISMS.filter(o => o.category === 'atom').length} atoms, {ORGANISMS.filter(o => o.category === 'molecule').length} molecules, {ORGANISMS.filter(o => o.category === 'home').length} home organisms,{' '}
          {ORGANISMS.filter(o => o.category === 'listing').length} listing organisms, {ORGANISMS.filter(o => o.category === 'detail').length} detail organism) built across Phases 2–5.
          Click any entry to toggle a live preview.
        </p>

        {/* Stats row */}
        <div className="flex items-center gap-4 mt-4 flex-wrap">
          <div
            className="px-3 py-1.5"
            style={{
              borderRadius: '6px',
              backgroundColor: 'rgba(128,108,224,0.06)',
              fontSize: 'var(--text-xs)',
              color: 'rgba(128,108,224,0.8)',
            }}
          >
            {ORGANISMS.length} components
          </div>
          <div
            className="px-3 py-1.5"
            style={{
              borderRadius: '6px',
              backgroundColor: 'rgba(0,0,0,0.03)',
              fontSize: 'var(--text-xs)',
              color: 'rgba(0,0,0,0.45)',
            }}
          >
            Phases 2–5 complete
          </div>
          <div
            className="px-3 py-1.5"
            style={{
              borderRadius: '6px',
              backgroundColor: 'rgba(34,139,34,0.06)',
              fontSize: 'var(--text-xs)',
              color: 'rgba(34,139,34,0.7)',
            }}
          >
            v4.3 architecture
          </div>
        </div>
      </div>

      {/* Filter bar + actions */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-1.5 flex-wrap">
          {categories.map((cat) => {
            const count = cat === 'all' ? ORGANISMS.length : ORGANISMS.filter((o) => o.category === cat).length;
            if (count === 0 && cat !== 'all') return null;
            return (
              <button
                key={cat}
                onClick={() => setFilterCat(cat)}
                className="px-3 py-1.5 transition-all cursor-pointer"
                style={{
                  borderRadius: '6px',
                  fontSize: 'var(--text-xs)',
                  backgroundColor: filterCat === cat ? 'rgba(0,0,0,0.08)' : 'rgba(0,0,0,0)',
                  color: filterCat === cat ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.4)',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: filterCat === cat ? 'rgba(0,0,0,0.12)' : 'rgba(0,0,0,0.06)',
                }}
              >
                {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)} ({count})
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={expandAll}
            className="px-3 py-1.5 cursor-pointer transition-colors"
            style={{
              borderRadius: '6px',
              fontSize: 'var(--text-xs)',
              color: 'rgba(0,0,0,0.4)',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: 'rgba(0,0,0,0.08)',
            }}
          >
            Expand all
          </button>
          <button
            onClick={collapseAll}
            className="px-3 py-1.5 cursor-pointer transition-colors"
            style={{
              borderRadius: '6px',
              fontSize: 'var(--text-xs)',
              color: 'rgba(0,0,0,0.4)',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: 'rgba(0,0,0,0.08)',
            }}
          >
            Collapse all
          </button>
        </div>
      </div>

      {/* Organism cards */}
      <div className="space-y-2">
        {filteredOrganisms.map((entry) => (
          <ShowcaseCard
            key={entry.id}
            entry={entry}
            isOpen={openIds.has(entry.id)}
            onToggle={() => toggle(entry.id)}
          />
        ))}
      </div>

      {/* Summary table */}
      <div
        style={{
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'rgba(0,0,0,0.08)',
          borderRadius: '10px',
          overflow: 'hidden',
        }}
      >
        <div
          className="px-5 py-3"
          style={{
            borderBottomWidth: '1px',
            borderBottomStyle: 'solid',
            borderBottomColor: 'rgba(0,0,0,0.06)',
            backgroundColor: 'rgba(0,0,0,0.02)',
          }}
        >
          <h3 style={{ fontSize: 'var(--text-sm)', color: 'rgba(0,0,0,0.7)' }}>
            Component Inventory
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left" style={{ fontSize: 'var(--text-xs)' }}>
            <thead>
              <tr style={{ borderBottomWidth: '2px', borderBottomStyle: 'solid', borderBottomColor: 'rgba(0,0,0,0.08)' }}>
                <th
                  className="text-left px-4 py-2.5"
                  style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.4)' }}
                >
                  Component
                </th>
                <th
                  className="text-left px-4 py-2.5"
                  style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.4)' }}
                >
                  Level
                </th>
                <th
                  className="text-left px-4 py-2.5"
                  style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.4)' }}
                >
                  Phase
                </th>
                <th
                  className="text-left px-4 py-2.5"
                  style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.4)' }}
                >
                  File
                </th>
              </tr>
            </thead>
            <tbody>
              {ORGANISMS.map((o) => (
                <tr
                  key={o.id}
                  style={{ borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: 'rgba(0,0,0,0.04)' }}
                >
                  <td
                    className="px-4 py-2 font-mono"
                    style={{ fontSize: 'var(--text-sm)', color: 'rgba(0,0,0,0.75)' }}
                  >
                    {o.name}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className="px-1.5 py-0.5"
                      style={{
                        fontSize: '10px',
                        borderRadius: '4px',
                        backgroundColor:
                          o.category === 'atom'
                            ? 'rgba(245,158,11,0.08)'
                            : o.category === 'molecule'
                            ? 'rgba(236,72,153,0.08)'
                            : o.category === 'home'
                            ? 'rgba(128,108,224,0.08)'
                            : 'rgba(59,130,246,0.08)',
                        color:
                          o.category === 'atom'
                            ? 'rgba(245,158,11,1)'
                            : o.category === 'molecule'
                            ? 'rgba(236,72,153,1)'
                            : o.category === 'home'
                            ? 'rgba(128,108,224,1)'
                            : 'rgba(59,130,246,1)',
                      }}
                    >
                      {o.category}
                    </span>
                  </td>
                  <td
                    className="px-4 py-2"
                    style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.4)' }}
                  >
                    {o.phase}
                  </td>
                  <td
                    className="px-4 py-2 font-mono"
                    style={{ fontSize: '10px', color: 'rgba(0,0,0,0.3)' }}
                  >
                    {o.category === 'atom'
                      ? `components/${o.name}.tsx`
                      : o.category === 'molecule'
                      ? `molecules/${o.name}.tsx`
                      : `organisms/${o.name}.tsx`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}