/**
 * SurveysListingDemoContent — Interactive Surveys Listing Page Demo
 *
 * Product page showing the browsing/filtering experience:
 * - Filters sidebar (topic, status, date)
 * - ViewToggle + SurveyCard/SurveySkeleton triad
 * - Pagination
 * - Empty state handling
 */
import { useState, useMemo } from 'react';
import { Search, Filter, X, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { ViewToggle, type ViewMode } from '@/app/components/ViewToggle';
import { Badge } from '@/app/components/Badge';
import { Button } from '@/app/components/Button';
import { Card } from '@/app/components/Card';
import {
  SurveyCard,
  SurveySkeleton,
  EmptyState,
} from '@/app/components/molecules';

// ─── Mock Data ─────────────────────────────────────────────

type SurveyStatus = 'draft' | 'active' | 'completed' | 'closed';

interface MockSurvey {
  id: string;
  title: string;
  description: string;
  category: string;
  questionCount: number;
  responseCount: number;
  targetCount: number;
  status: SurveyStatus;
  date: string;
  estimatedTime: string;
}

const ALL_SURVEYS: MockSurvey[] = [
  { id: 'l-1', title: 'Enterprise AI Adoption & Readiness Assessment', description: 'Comprehensive evaluation of AI adoption maturity across Fortune 500 organizations.', category: 'Technology', questionCount: 28, responseCount: 612, targetCount: 800, status: 'active', date: 'Mar 2026', estimatedTime: '10 min' },
  { id: 'l-2', title: 'Consumer Healthcare Preferences: Post-Pandemic Trends', description: 'Tracking shifts in healthcare consumer behavior including telehealth adoption.', category: 'Healthcare', questionCount: 22, responseCount: 1450, targetCount: 1500, status: 'active', date: 'Mar 2026', estimatedTime: '7 min' },
  { id: 'l-3', title: 'Clean Energy Workforce Development Survey', description: 'Assessing skills gaps and training needs in the renewable energy sector.', category: 'Energy', questionCount: 18, responseCount: 320, targetCount: 500, status: 'active', date: 'Feb 2026', estimatedTime: '6 min' },
  { id: 'l-4', title: 'SaaS Pricing Sensitivity Analysis', description: 'Understanding willingness to pay across segments for B2B software products.', category: 'Product', questionCount: 20, responseCount: 2100, targetCount: 2000, status: 'completed', date: 'Jan 2026', estimatedTime: '8 min' },
  { id: 'l-5', title: 'Remote Work Productivity & Wellbeing Index', description: 'Annual benchmark study measuring employee productivity in distributed work.', category: 'Workplace', questionCount: 35, responseCount: 3200, targetCount: 3000, status: 'completed', date: 'Dec 2025', estimatedTime: '12 min' },
  { id: 'l-6', title: 'FinTech User Experience Benchmark', description: 'Comparative UX evaluation of digital banking apps and neobanks.', category: 'Financial Services', questionCount: 24, responseCount: 456, targetCount: 750, status: 'active', date: 'Mar 2026', estimatedTime: '9 min' },
  { id: 'l-7', title: 'Cybersecurity Awareness: Employee Risk Assessment', description: 'Measuring security awareness maturity and identifying training gaps.', category: 'Cybersecurity', questionCount: 16, responseCount: 0, targetCount: 400, status: 'draft', date: 'Apr 2026', estimatedTime: '5 min' },
  { id: 'l-8', title: 'Sustainable Packaging Consumer Preferences', description: 'Exploring consumer attitudes toward eco-friendly packaging solutions.', category: 'Sustainability', questionCount: 14, responseCount: 1800, targetCount: 1800, status: 'closed', date: 'Nov 2025', estimatedTime: '4 min' },
  { id: 'l-9', title: 'Autonomous Vehicle Trust & Adoption Intent', description: 'Gauging public sentiment and purchase intent for autonomous vehicles.', category: 'Automotive', questionCount: 19, responseCount: 670, targetCount: 1000, status: 'active', date: 'Feb 2026', estimatedTime: '7 min' },
  { id: 'l-10', title: 'Supply Chain Resilience: Lessons from 2025', description: 'Evaluating supply chain risk management practices and near-shoring decisions.', category: 'Logistics', questionCount: 15, responseCount: 890, targetCount: 1000, status: 'active', date: 'Feb 2026', estimatedTime: '5 min' },
  { id: 'l-11', title: 'Digital Banking Adoption: Gen Z & Millennials', description: 'Understanding digital-first banking preferences and switching behavior.', category: 'Financial Services', questionCount: 21, responseCount: 1100, targetCount: 1200, status: 'active', date: 'Mar 2026', estimatedTime: '8 min' },
  { id: 'l-12', title: 'Pharmaceutical Supply Chain Transparency', description: 'Assessing transparency expectations and traceability adoption in pharma.', category: 'Healthcare', questionCount: 17, responseCount: 540, targetCount: 600, status: 'completed', date: 'Jan 2026', estimatedTime: '6 min' },
  { id: 'l-13', title: 'Edge Computing Adoption in Manufacturing', description: 'Evaluating edge infrastructure investments and ROI across manufacturing.', category: 'Technology', questionCount: 23, responseCount: 0, targetCount: 350, status: 'draft', date: 'Apr 2026', estimatedTime: '9 min' },
  { id: 'l-14', title: 'Retail Omnichannel Strategy Effectiveness', description: 'Measuring omnichannel integration maturity and customer experience impact.', category: 'Retail', questionCount: 26, responseCount: 780, targetCount: 800, status: 'active', date: 'Mar 2026', estimatedTime: '10 min' },
  { id: 'l-15', title: 'Carbon Offset Market Confidence Index', description: 'Gauging institutional investor confidence in voluntary carbon markets.', category: 'Sustainability', questionCount: 12, responseCount: 450, targetCount: 450, status: 'completed', date: 'Dec 2025', estimatedTime: '4 min' },
  { id: 'l-16', title: 'Workplace Diversity & Inclusion Benchmark', description: 'Annual assessment of D&I program effectiveness and employee sentiment.', category: 'Workplace', questionCount: 30, responseCount: 2800, targetCount: 3000, status: 'active', date: 'Mar 2026', estimatedTime: '11 min' },
  { id: 'l-17', title: 'Cloud Security Posture Management Survey', description: 'Evaluating CSPM adoption and cloud security maturity across enterprise IT.', category: 'Cybersecurity', questionCount: 20, responseCount: 380, targetCount: 500, status: 'active', date: 'Feb 2026', estimatedTime: '7 min' },
  { id: 'l-18', title: 'Electric Vehicle Fleet Conversion Readiness', description: 'Assessing commercial fleet electrification timelines and infrastructure needs.', category: 'Automotive', questionCount: 18, responseCount: 600, targetCount: 600, status: 'closed', date: 'Oct 2025', estimatedTime: '6 min' },
];

const TOPICS = ['All Topics', 'Technology', 'Healthcare', 'Energy', 'Financial Services', 'Product', 'Workplace', 'Cybersecurity', 'Sustainability', 'Automotive', 'Logistics', 'Retail'];
const STATUSES: { label: string; value: SurveyStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
  { label: 'Draft', value: 'draft' },
  { label: 'Closed', value: 'closed' },
];

const PAGE_SIZE = 6;

// ─── Component ─────────────────────────────────────────────

export function SurveysListingDemoContent() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All Topics');
  const [selectedStatus, setSelectedStatus] = useState<SurveyStatus | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(true);

  // Filter logic
  const filtered = useMemo(() => {
    return ALL_SURVEYS.filter((s) => {
      const matchesTopic = selectedTopic === 'All Topics' || s.category === selectedTopic;
      const matchesStatus = selectedStatus === 'all' || s.status === selectedStatus;
      const matchesSearch = !searchQuery ||
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTopic && matchesStatus && matchesSearch;
    });
  }, [selectedTopic, selectedStatus, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const simulateLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1200);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    simulateLoading();
  };

  const handleFilterChange = (setter: Function, value: any) => {
    setter(value);
    setCurrentPage(1);
    simulateLoading();
  };

  const clearFilters = () => {
    setSelectedTopic('All Topics');
    setSelectedStatus('all');
    setSearchQuery('');
    setCurrentPage(1);
  };

  const hasActiveFilters = selectedTopic !== 'All Topics' || selectedStatus !== 'all' || searchQuery !== '';

  // Count per status
  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { all: ALL_SURVEYS.length };
    ALL_SURVEYS.forEach(s => { counts[s.status] = (counts[s.status] || 0) + 1; });
    return counts;
  }, []);

  return (
    <div className="space-y-8">
      {/* Demo Header */}
      <div className="border border-black/10 rounded-[5px] p-8 bg-[#fafaf9]">
        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-3xl font-normal">Surveys Listing — Live Demo</h1>
          <span className="px-2 py-0.5 text-[10px] font-medium bg-[#806ce0]/10 text-[#806ce0] rounded">Interactive</span>
        </div>
        <p className="text-sm text-black/70 mb-4">
          Product page listing with filter sidebar, ViewToggle/SurveySkeleton triad, search, and pagination.
          All filters, sorting, and loading states are functional.
        </p>
        <div className="flex gap-3 text-xs text-black/40">
          <span>{ALL_SURVEYS.length} total surveys</span>
          <span>·</span>
          <span>{PAGE_SIZE} per page</span>
          <span>·</span>
          <span>SurveySkeleton mirrors SurveyCard layout</span>
        </div>
      </div>

      {/* Page Preview Container */}
      <div className="border border-black/10 rounded-[5px] overflow-hidden shadow-sm bg-white">
        {/* Listing Header */}
        <div className="border-b border-black/6 px-6 py-5">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-xl font-normal">All Surveys</h2>
              <p className="text-xs text-black/40 mt-0.5">{filtered.length} surveys found</p>
            </div>
            <div className="flex items-center gap-3">
              {/* Search */}
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-[5px] border border-black/8 hover:border-black/15 transition-colors"
                style={{ minWidth: '220px' }}
              >
                <Search size={14} className="text-black/30 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search surveys..."
                  value={searchQuery}
                  onChange={(e) => handleFilterChange(setSearchQuery, e.target.value)}
                  className="bg-transparent border-none outline-none text-sm text-black/70 placeholder:text-black/25 flex-1 min-w-0"
                />
                {searchQuery && (
                  <button onClick={() => handleFilterChange(setSearchQuery, '')} className="text-black/25 hover:text-black/50 transition-colors">
                    <X size={12} />
                  </button>
                )}
              </div>

              {/* Toggle filters button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-[5px] border text-xs font-medium transition-all ${
                  showFilters
                    ? 'border-black/15 bg-black/[0.03] text-black/60'
                    : 'border-black/8 text-black/40 hover:border-black/15'
                }`}
              >
                <SlidersHorizontal size={13} />
                Filters
                {hasActiveFilters && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#806ce0]" />
                )}
              </button>

              {/* ViewToggle */}
              <ViewToggle
                viewMode={viewMode}
                onViewModeChange={(mode) => { setViewMode(mode); simulateLoading(); }}
                count={filtered.length}
                countLabel="surveys"
              />
            </div>
          </div>

          {/* Active filter pills */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-black/4">
              <span className="text-[10px] text-black/30 uppercase tracking-wider">Filters:</span>
              {selectedTopic !== 'All Topics' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] bg-[#806ce0]/8 text-[#806ce0] rounded">
                  {selectedTopic}
                  <button onClick={() => handleFilterChange(setSelectedTopic, 'All Topics')}>
                    <X size={10} />
                  </button>
                </span>
              )}
              {selectedStatus !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] bg-[#806ce0]/8 text-[#806ce0] rounded">
                  {selectedStatus}
                  <button onClick={() => handleFilterChange(setSelectedStatus, 'all')}>
                    <X size={10} />
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] bg-[#806ce0]/8 text-[#806ce0] rounded">
                  "{searchQuery}"
                  <button onClick={() => handleFilterChange(setSearchQuery, '')}>
                    <X size={10} />
                  </button>
                </span>
              )}
              <button
                onClick={clearFilters}
                className="text-[10px] text-black/30 hover:text-black/50 underline transition-colors ml-1"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-56 flex-shrink-0 border-r border-black/6 p-5 space-y-6">
              {/* Topic Filter */}
              <div>
                <h3 className="text-[10px] font-medium uppercase tracking-wider text-black/40 mb-3">Topic</h3>
                <div className="space-y-0.5">
                  {TOPICS.map((topic) => {
                    const count = topic === 'All Topics'
                      ? ALL_SURVEYS.length
                      : ALL_SURVEYS.filter(s => s.category === topic).length;
                    return (
                      <button
                        key={topic}
                        onClick={() => handleFilterChange(setSelectedTopic, topic)}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded text-xs transition-all ${
                          selectedTopic === topic
                            ? 'bg-[#806ce0]/8 text-[#806ce0] font-medium'
                            : 'text-black/50 hover:text-black/70 hover:bg-black/[0.02]'
                        }`}
                      >
                        <span>{topic}</span>
                        <span className={`font-mono text-[10px] ${selectedTopic === topic ? 'text-[#806ce0]/60' : 'text-black/25'}`}>{count}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <h3 className="text-[10px] font-medium uppercase tracking-wider text-black/40 mb-3">Status</h3>
                <div className="space-y-0.5">
                  {STATUSES.map((st) => (
                    <button
                      key={st.value}
                      onClick={() => handleFilterChange(setSelectedStatus, st.value)}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded text-xs transition-all ${
                        selectedStatus === st.value
                          ? 'bg-[#806ce0]/8 text-[#806ce0] font-medium'
                          : 'text-black/50 hover:text-black/70 hover:bg-black/[0.02]'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            st.value === 'active' ? 'bg-green-500' :
                            st.value === 'completed' ? 'bg-[#806ce0]' :
                            st.value === 'draft' ? 'bg-black/20' :
                            st.value === 'closed' ? 'bg-black/15' :
                            'bg-black/10'
                          }`}
                        />
                        {st.label}
                      </span>
                      <span className={`font-mono text-[10px] ${selectedStatus === st.value ? 'text-[#806ce0]/60' : 'text-black/25'}`}>
                        {statusCounts[st.value] || 0}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="pt-4 border-t border-black/6">
                <h3 className="text-[10px] font-medium uppercase tracking-wider text-black/40 mb-3">Quick Stats</h3>
                <div className="space-y-2">
                  {[
                    { label: 'Total responses', value: '16.6K' },
                    { label: 'Avg. completion', value: '78%' },
                    { label: 'Avg. questions', value: '20' },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-center justify-between">
                      <span className="text-[10px] text-black/40">{stat.label}</span>
                      <span className="text-xs text-black/60 font-mono">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Card Grid / List */}
          <div className="flex-1 p-6">
            {loading ? (
              <div className={viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'
                : 'flex flex-col gap-3'
              }>
                {Array.from({ length: PAGE_SIZE }).map((_, i) => (
                  <SurveySkeleton key={`sk-${i}`} variant={viewMode} />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <EmptyState
                title="No surveys found"
                description="Try adjusting your filters or search query to find surveys."
                action={
                  <Button variant="secondary" size="sm" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                }
              />
            ) : (
              <div className={viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'
                : 'flex flex-col gap-3'
              }>
                {paginated.map((survey) => (
                  <SurveyCard key={survey.id} {...survey} layout={viewMode} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {!loading && filtered.length > 0 && (
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-black/6">
                <p className="text-xs text-black/40">
                  Showing {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, filtered.length)} of {filtered.length}
                </p>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="w-8 h-8 flex items-center justify-center rounded border border-black/8 text-black/40 hover:border-black/20 hover:text-black/60 disabled:opacity-25 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handlePageChange(i + 1)}
                      className={`w-8 h-8 flex items-center justify-center rounded text-xs font-medium transition-all ${
                        currentPage === i + 1
                          ? 'bg-black text-white'
                          : 'border border-black/8 text-black/40 hover:border-black/20 hover:text-black/60'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="w-8 h-8 flex items-center justify-center rounded border border-black/8 text-black/40 hover:border-black/20 hover:text-black/60 disabled:opacity-25 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Section Map Legend */}
      <div className="border border-black/8 rounded-[5px] p-6 bg-[#fafaf9]">
        <h3 className="text-sm font-medium mb-4">Listing Page Anatomy</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { name: 'Search + Filters Bar', molecules: 'Search input, filter pills, ViewToggle' },
            { name: 'Sidebar', molecules: 'Topic filter, Status filter, Quick Stats' },
            { name: 'Card Grid/List', molecules: 'SurveyCard (grid/list) + SurveySkeleton' },
            { name: 'Pagination', molecules: 'Page numbers, prev/next, result count' },
          ].map((s, idx) => (
            <Card key={idx} padding="sm">
              <p className="text-xs font-medium text-black/70 mb-1">{s.name}</p>
              <p className="text-[10px] text-black/40">{s.molecules}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}