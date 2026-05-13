/**
 * CardListing — Organism (domain-agnostic)
 * Ken Bold DS v4.2
 *
 * WHAT:    Grid/list card layout with stagger animation, skeleton loading, empty state, and crossfade
 * WHY:     Every listing page needs card rendering with view-mode switching; extracting avoids duplicating
 *          ~120 lines of layout + animation logic across templates
 * WHERE:   Report Store listing, future Search Results, Industry Deep Dive, etc.
 * WHEN:    Renders the card grid/list within any filtered listing page
 * HOW:     Accepts items + renderCard render-prop for zero coupling to any specific card component;
 *          composes CardReveal, SkeletonCard, EmptyState internally
 *
 * Data coupling: none (card rendering via render-prop, all config via props)
 */

import { type ReactNode, type CSSProperties } from "react";
import { CardReveal, SkeletonCard, EmptyState } from "./molecules";

/* ─── Animation defaults ─── */
const DEFAULT_STAGGER_DELAY = 50;
const DEFAULT_MAX_STAGGER = 8;
const SKELETON_STAGGER = 60;

export interface CardListingProps<T> {
  /** Items to render */
  items: T[];
  /** Render function for each item — receives item and index */
  renderCard: (item: T, index: number) => ReactNode;
  /** Unique key extractor for each item */
  keyExtractor: (item: T) => string;
  /** Current view mode */
  viewMode: "grid" | "list";
  /** Optional crossfade style (from useCrossfade hook) */
  crossfadeStyle?: CSSProperties;
  /** Whether more items are being loaded (shows skeletons) */
  isLoadingMore?: boolean;
  /** Number of skeleton placeholders to show during loading */
  skeletonCount?: number;
  /** Stagger delay between card reveals (ms) */
  staggerDelay?: number;
  /** Max number of cards to stagger (rest appear instantly) */
  maxStaggerItems?: number;
  /** Empty state message */
  emptyMessage?: string;
  /** Empty state action label */
  emptyActionLabel?: string;
  /** Callback for empty state action (e.g. "Clear all filters") */
  onEmptyAction?: () => void;
  /** Grid CSS class override (default: "grid sm:grid-cols-2 xl:grid-cols-3 gap-6") */
  gridClassName?: string;
  /** List CSS class override (default: "flex flex-col gap-3") */
  listClassName?: string;
  /** Additional content rendered after the cards (e.g. LoadMoreSentinel) */
  children?: ReactNode;
  /** Optional className for the outer crossfade wrapper */
  className?: string;
}

export function CardListing<T>({
  items,
  renderCard,
  keyExtractor,
  viewMode,
  crossfadeStyle,
  isLoadingMore = false,
  skeletonCount = 3,
  staggerDelay = DEFAULT_STAGGER_DELAY,
  maxStaggerItems = DEFAULT_MAX_STAGGER,
  emptyMessage = "No results found matching your criteria.",
  emptyActionLabel = "Clear all filters",
  onEmptyAction,
  gridClassName = "grid sm:grid-cols-2 xl:grid-cols-3 gap-6",
  listClassName = "flex flex-col gap-3",
  children,
  className,
}: CardListingProps<T>) {
  const getDelay = (idx: number) =>
    idx < maxStaggerItems ? idx * staggerDelay : 0;

  const skeletonVariant = viewMode;

  return (
    <div style={crossfadeStyle} className={className}>
      {items.length > 0 ? (
        viewMode === "grid" ? (
          <div className={gridClassName}>
            {items.map((item, idx) => (
              <CardReveal key={keyExtractor(item)} delay={getDelay(idx)}>
                {renderCard(item, idx)}
              </CardReveal>
            ))}

            {/* Skeleton placeholders during load-more */}
            {isLoadingMore &&
              Array.from({ length: skeletonCount }).map((_, i) => (
                <div
                  key={`skel-grid-${i}`}
                  style={{
                    animation: `fadeUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) ${i * SKELETON_STAGGER}ms both`,
                  }}
                >
                  <SkeletonCard variant={skeletonVariant} />
                </div>
              ))}
          </div>
        ) : (
          <div className={listClassName}>
            {items.map((item, idx) => (
              <CardReveal key={keyExtractor(item)} delay={getDelay(idx)}>
                {renderCard(item, idx)}
              </CardReveal>
            ))}

            {/* Skeleton placeholders during load-more */}
            {isLoadingMore &&
              Array.from({ length: skeletonCount }).map((_, i) => (
                <div
                  key={`skel-list-${i}`}
                  style={{
                    animation: `fadeUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) ${i * SKELETON_STAGGER}ms both`,
                  }}
                >
                  <SkeletonCard variant={skeletonVariant} />
                </div>
              ))}
          </div>
        )
      ) : (
        <EmptyState
          message={emptyMessage}
          actionLabel={emptyActionLabel}
          onAction={onEmptyAction}
        />
      )}

      {/* Slot for LoadMoreSentinel or any footer content */}
      {children}

      {/* Bottom padding for sticky mobile filter bar */}
      <div className="h-16 lg:hidden" />
    </div>
  );
}
