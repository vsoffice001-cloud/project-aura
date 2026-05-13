/**
 * LoadMoreSentinel — Molecule (DS v4.3)
 *
 * WHAT: Invisible trigger element for infinite scroll + loading indicator.
 * WHY:  Pairs with useProgressiveLoad hook to provide a visual "loading more"
 *       indicator at the bottom of progressively-loaded lists.
 * WHEN: Below the last visible card in any infinite-scroll list/grid.
 * HOW:  Renders a ref-target div (observed by IntersectionObserver) plus
 *       an optional loading spinner/skeleton row.
 *
 * COLOR SYSTEM: Pure monochromatic black/opacity.
 */

interface LoadMoreSentinelProps {
  /** Ref from useProgressiveLoad — attach to the sentinel element */
  sentinelRef: React.RefObject<HTMLDivElement | null>;
  /** Whether there are more items to load */
  hasMore: boolean;
  /** Whether items are currently loading */
  loading?: boolean;
  /** Total items count for the "showing X of Y" label */
  visibleCount?: number;
  totalCount?: number;
  /** Additional className */
  className?: string;
}

export function LoadMoreSentinel({
  sentinelRef,
  hasMore,
  loading = false,
  visibleCount,
  totalCount,
  className = '',
}: LoadMoreSentinelProps) {
  if (!hasMore && !loading) {
    // All items loaded — optional footer
    if (visibleCount && totalCount && visibleCount >= totalCount) {
      return (
        <div className={`text-center py-6 ${className}`}>
          <p style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.3)' }}>
            Showing all {totalCount.toLocaleString()} results
          </p>
        </div>
      );
    }
    return null;
  }

  return (
    <div className={className}>
      {/* Invisible sentinel — IntersectionObserver target */}
      <div ref={sentinelRef} className="h-px w-full" aria-hidden="true" />

      {/* Loading indicator */}
      {(hasMore || loading) && (
        <div className="flex items-center justify-center gap-3 py-8">
          {/* Animated dots */}
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  backgroundColor: 'rgba(0,0,0,0.2)',
                  animation: `skeleton-pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                }}
              />
            ))}
          </div>

          {visibleCount && totalCount && (
            <span
              className="tabular-nums"
              style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.3)' }}
            >
              {visibleCount.toLocaleString()} of {totalCount.toLocaleString()}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
