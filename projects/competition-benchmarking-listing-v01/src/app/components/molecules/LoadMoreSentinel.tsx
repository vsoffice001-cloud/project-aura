/**
 * LoadMoreSentinel — Molecule (domain-agnostic)
 * Ken Bold DS v4.2
 *
 * WHAT:    Infinite-scroll progress indicator — "Showing X of Y", spinner, progress bar, and completion message
 * WHY:     Every infinite-scroll listing needs this pattern; extracting avoids re-implementing across pages
 * WHERE:   Report Store listing, future Search Results, article feeds, etc.
 * WHEN:    Renders below a card listing when progressive loading is active
 * HOW:     Accepts a sentinel ref for IntersectionObserver (from useProgressiveLoad); pure presentational
 *
 * Data coupling: none (all data via props)
 */

import { Loader2 } from "lucide-react";
import { forwardRef } from "react";

export interface LoadMoreSentinelProps {
  /** Number of items currently visible */
  visibleCount: number;
  /** Total number of items available */
  totalCount: number;
  /** Whether more items are available to load */
  hasMore: boolean;
  /** Whether items are currently being loaded */
  isLoading?: boolean;
  /** Noun for items (e.g. "reports", "articles", "results") */
  itemLabel?: string;
  /** Loading message (e.g. "Loading more reports...") */
  loadingMessage?: string;
  /** Whether to show the progress bar */
  showProgressBar?: boolean;
  /** Optional className override */
  className?: string;
}

export const LoadMoreSentinel = forwardRef<HTMLDivElement, LoadMoreSentinelProps>(
  function LoadMoreSentinel(
    {
      visibleCount,
      totalCount,
      hasMore,
      isLoading = false,
      itemLabel = "reports",
      loadingMessage,
      showProgressBar = true,
      className,
    },
    ref
  ) {
    const resolvedLoadingMessage =
      loadingMessage || `Loading more ${itemLabel}...`;
    const progress =
      totalCount > 0 ? (visibleCount / totalCount) * 100 : 0;

    if (hasMore) {
      return (
        <div
          ref={ref}
          className={`flex flex-col items-center gap-3 mt-8 py-4 ${className || ""}`}
        >
          <p
            className="text-black/40"
            style={{ fontSize: "var(--text-xs)" }}
          >
            Showing{" "}
            <span className="text-black/70 tabular-nums">{visibleCount}</span>{" "}
            of{" "}
            <span className="text-black/70 tabular-nums">{totalCount}</span>{" "}
            {itemLabel}
          </p>

          {isLoading && (
            <div
              className="flex items-center gap-2 text-black/40"
              style={{
                fontSize: "var(--text-xs)",
                animation: "fadeUp 0.25s ease-out both",
              }}
            >
              <Loader2 className="h-4 w-4 animate-spin" />
              {resolvedLoadingMessage}
            </div>
          )}

          {showProgressBar && (
            <div
              className="w-48 h-1 rounded-full overflow-hidden"
              style={{ background: "var(--warm-300)" }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: "var(--warm-800)",
                  transition:
                    "width 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />
            </div>
          )}
        </div>
      );
    }

    // All items loaded
    if (visibleCount > 0) {
      return (
        <p
          className={`text-center text-black/30 mt-8 py-4 ${className || ""}`}
          style={{
            fontSize: "var(--text-xs)",
            animation: "fadeUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) both",
          }}
        >
          Showing all {totalCount} {itemLabel}
        </p>
      );
    }

    return null;
  }
);
