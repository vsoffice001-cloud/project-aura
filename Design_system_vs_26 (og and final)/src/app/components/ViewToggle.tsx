/**
 * ViewToggle — Ken Bold DS v4.0
 *
 * Compact list/grid toggle with warm pill container.
 * Uses Tooltip for icon labels. 44px touch targets on mobile.
 */

import { LayoutList, LayoutGrid } from "lucide-react";
import { Tooltip } from '@/app/components/Tooltip';

export type ViewMode = "list" | "grid";

interface ViewToggleProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  count?: number;
  countLabel?: string;
}

export function ViewToggle({ viewMode, onViewModeChange, count, countLabel = "items" }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="inline-flex items-center p-0.5"
        style={{
          background: 'var(--warm-300)',
          borderRadius: 'var(--radius-element, 5px)',
          border: '1px solid var(--warm-500)',
        }}
      >
        <Tooltip text="List view">
          <button
            type="button"
            className={`inline-flex items-center justify-center w-9 h-9 sm:w-7 sm:h-7 transition-all ${
              viewMode === "list"
                ? "bg-white text-black shadow-sm"
                : "text-black/35 hover:text-black/60"
            }`}
            style={{ borderRadius: "var(--radius-inner, 2.5px)" }}
            onClick={() => onViewModeChange("list")}
            aria-label="List view"
          >
            <LayoutList className="h-3.5 w-3.5" />
          </button>
        </Tooltip>
        <Tooltip text="Grid view">
          <button
            type="button"
            className={`inline-flex items-center justify-center w-9 h-9 sm:w-7 sm:h-7 transition-all ${
              viewMode === "grid"
                ? "bg-white text-black shadow-sm"
                : "text-black/35 hover:text-black/60"
            }`}
            style={{ borderRadius: "var(--radius-inner, 2.5px)" }}
            onClick={() => onViewModeChange("grid")}
            aria-label="Grid view"
          >
            <LayoutGrid className="h-3.5 w-3.5" />
          </button>
        </Tooltip>
      </div>
      {count !== undefined && (
        <p
          className="text-black/40 hidden sm:block"
          style={{ fontSize: "var(--text-xs)" }}
        >
          {count} {countLabel}
        </p>
      )}
    </div>
  );
}
