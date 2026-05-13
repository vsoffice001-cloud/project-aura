/**
 * ListingToolbar — Organism (domain-agnostic)
 * Ken Bold DS v4.2
 *
 * WHAT:    Horizontal toolbar for filtered listing pages — back nav, result count, view toggle, sort, mobile filter trigger
 * WHY:     Every listing page needs a consistent toolbar above its card grid; extracting avoids copy-paste across templates
 * WHERE:   Report Store listing mode, future Industry Deep Dive, Search Results, etc.
 * WHEN:    Renders when a listing page is in "results" mode (not home/browse)
 * HOW:     Pure presentational — all state managed by parent via props; composes ViewToggle atom internally
 *
 * Data coupling: none (all data via props)
 */

import { ArrowLeft, ChevronDown, SlidersHorizontal } from "lucide-react";
import { ViewToggle } from "./ViewToggle";
import type { ViewMode } from "./ViewToggle";

export interface ListingToolbarProps {
  /** Label for back button (e.g. "Back to Report Store") */
  backLabel?: string;
  /** Callback when back button is clicked */
  onBack: () => void;
  /** Number of results currently matching filters */
  resultCount: number;
  /** Noun for results (e.g. "reports", "articles", "case studies") */
  resultLabel?: string;
  /** Optional context string shown after count (e.g. "in Healthcare") */
  contextLabel?: string;
  /** Optional search query to display */
  searchQuery?: string;
  /** Current view mode */
  viewMode: ViewMode;
  /** Callback when view mode changes */
  onViewModeChange: (mode: ViewMode) => void;
  /** Current sort value */
  sortBy: string;
  /** Callback when sort changes */
  onSortChange: (value: string) => void;
  /** Sort option labels */
  sortOptions?: string[];
  /** Number of active filters (shows badge on mobile trigger) */
  activeFilterCount?: number;
  /** Callback to open mobile filter sheet */
  onOpenMobileFilters?: () => void;
  /** Optional className override */
  className?: string;
}

const DEFAULT_SORT_OPTIONS = [
  "Newest First",
  "Oldest First",
  "Most Popular",
  "A-Z",
  "Z-A",
];

export function ListingToolbar({
  backLabel = "Back",
  onBack,
  resultCount,
  resultLabel = "reports",
  contextLabel,
  searchQuery,
  viewMode,
  onViewModeChange,
  sortBy,
  onSortChange,
  sortOptions = DEFAULT_SORT_OPTIONS,
  activeFilterCount = 0,
  onOpenMobileFilters,
  className,
}: ListingToolbarProps) {
  return (
    <div className={`flex items-center gap-3 mb-4 flex-wrap ${className || ""}`}>
      {/* Back button */}
      <button
        className="inline-flex items-center gap-1.5 min-h-[44px] sm:min-h-0 text-black/50 hover:text-black transition-colors flex-shrink-0 group"
        style={{ fontSize: "var(--text-nav)" }}
        onClick={onBack}
        title={backLabel}
        aria-label={backLabel}
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
        <span className="hidden sm:inline">{backLabel}</span>
      </button>

      {/* Divider */}
      <div
        className="h-5 w-px flex-shrink-0"
        style={{ background: "rgba(0,0,0,0.1)" }}
      />

      {/* Result count summary */}
      <p
        style={{ fontSize: "var(--text-nav)" }}
        className="text-black/40 min-w-0 truncate"
      >
        <span className="text-black/70 tabular-nums">{resultCount}</span>{" "}
        {resultLabel}
        {contextLabel && (
          <span>
            {" "}
            in <span className="text-black/70">{contextLabel}</span>
          </span>
        )}
        {searchQuery && (
          <span className="hidden sm:inline">
            {" "}
            for &ldquo;
            <span className="text-black/70">{searchQuery}</span>&rdquo;
          </span>
        )}
      </p>

      {/* Controls — pushed right */}
      <div className="relative ml-auto flex-shrink-0 flex items-center gap-2 sm:gap-3">
        {/* Mobile filter trigger — below lg only */}
        {onOpenMobileFilters && (
          <button
            className="lg:hidden inline-flex items-center justify-center relative min-h-[44px] min-w-[44px] p-2 transition-colors hover:bg-black/[0.03]"
            style={{
              borderRadius: "var(--radius-element)",
              border: "1px solid rgba(0,0,0,0.1)",
            }}
            onClick={onOpenMobileFilters}
            aria-label="Open filters"
          >
            <SlidersHorizontal className="h-4 w-4 text-black/50" />
            {activeFilterCount > 0 && (
              <span
                className="absolute -top-1 -right-1 min-w-4 h-4 px-0.5 rounded-full bg-black text-white flex items-center justify-center"
                style={{ fontSize: "9px" }}
              >
                {activeFilterCount}
              </span>
            )}
          </button>
        )}

        {/* View toggle */}
        <ViewToggle viewMode={viewMode} onViewModeChange={onViewModeChange} />

        {/* Divider */}
        <div
          className="h-5 w-px flex-shrink-0 hidden sm:block"
          style={{ background: "rgba(0,0,0,0.1)" }}
        />

        {/* Sort dropdown */}
        <div className="relative hidden sm:block">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="appearance-none bg-white pl-3 pr-8 py-1.5 cursor-pointer text-black/70 hover:text-black transition-colors"
            style={{
              fontSize: "var(--text-xs)",
              border: "1px solid rgba(0,0,0,0.1)",
              borderRadius: "var(--radius-element)",
            }}
          >
            {sortOptions.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 pointer-events-none text-black/40" />
        </div>
      </div>
    </div>
  );
}
