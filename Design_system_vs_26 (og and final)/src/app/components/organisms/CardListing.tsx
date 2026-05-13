/**
 * CardListing — Organism (DS v4.3)
 *
 * WHAT: Card grid/list with pagination, skeleton loading, and empty state.
 * WHY:  Extracted from ReportStoreListingDemoContent to make the card display
 *       area a reusable, composable organism.
 * WHEN: Main content area of the Report Store listing page.
 * HOW:  Renders a grid or list of ReportCards with pagination controls,
 *       SkeletonCard loading state, and EmptyState fallback.
 *
 * COLOR SYSTEM: Pure monochromatic black/opacity.
 * FONT TOKENS: var(--text-xs) for pagination, var(--radius-element) for radius.
 */
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReportCard } from '@/app/components/molecules/ReportCard';
import { SkeletonCard } from '@/app/components/molecules/SkeletonCard';
import { EmptyState } from '@/app/components/molecules/EmptyState';
import { Button } from '@/app/components/Button';
import type { ViewMode } from '@/app/components/ViewToggle';
import type { ReportItem } from '@/app/components/data';
import { PAGE_SIZE } from '@/app/components/data';

interface CardListingProps {
  items: ReportItem[];
  paginated: ReportItem[];
  viewMode: ViewMode;
  loading: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onClearFilters?: () => void;
}

export function CardListing({
  items,
  paginated,
  viewMode,
  loading,
  currentPage,
  totalPages,
  onPageChange,
  onClearFilters,
}: CardListingProps) {
  const gridClass = viewMode === 'grid'
    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'
    : 'flex flex-col gap-3';

  return (
    <div className="mt-4">
      {loading ? (
        <div className={gridClass}>
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <SkeletonCard key={`sk-${i}`} variant={viewMode} />
          ))}
        </div>
      ) : items.length === 0 ? (
        <EmptyState
          title="No reports found"
          description="Try adjusting your filters or search query to find reports."
          action={
            onClearFilters ? (
              <Button variant="secondary" size="sm" onClick={onClearFilters}>
                Clear Filters
              </Button>
            ) : undefined
          }
        />
      ) : (
        <div className={gridClass}>
          {paginated.map((report) => (
            <ReportCard
              key={report.id}
              id={report.id}
              image={report.image}
              title={report.title}
              industry={report.industry}
              subcat={report.subcat}
              projection={report.projection}
              region={report.region}
              date={report.date}
              layout={viewMode}
              description={report.description}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && items.length > 0 && totalPages > 1 && (
        <div
          className="flex items-center justify-between mt-8 pt-6"
          style={{ borderTopWidth: '1px', borderTopStyle: 'solid', borderTopColor: 'rgba(0,0,0,0.06)' }}
        >
          <p style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.4)' }}>
            Showing {(currentPage - 1) * PAGE_SIZE + 1}&ndash;{Math.min(currentPage * PAGE_SIZE, items.length)} of {items.length}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-8 h-8 flex items-center justify-center transition-all disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer"
              style={{
                borderRadius: 'var(--radius-element)',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: 'rgba(0,0,0,0.08)',
                color: 'rgba(0,0,0,0.4)',
              }}
            >
              <ChevronLeft size={14} />
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => onPageChange(i + 1)}
                className="w-8 h-8 flex items-center justify-center transition-all cursor-pointer"
                style={{
                  borderRadius: 'var(--radius-element)',
                  fontSize: 'var(--text-xs)',
                  ...(currentPage === i + 1
                    ? { backgroundColor: 'rgba(0,0,0,1)', color: 'rgba(255,255,255,1)' }
                    : { borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(0,0,0,0.08)', color: 'rgba(0,0,0,0.4)' }
                  ),
                }}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="w-8 h-8 flex items-center justify-center transition-all disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer"
              style={{
                borderRadius: 'var(--radius-element)',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: 'rgba(0,0,0,0.08)',
                color: 'rgba(0,0,0,0.4)',
              }}
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}