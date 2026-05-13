/**
 * MobileFilterBar — Sticky bottom bar for mobile
 *
 * Elevated, app-native filter access. Always visible below lg.
 * Compact pill design with frosted glass background.
 */
import { SlidersHorizontal } from "lucide-react";

interface MobileFilterBarProps {
  activeFilterCount: number;
  onOpenFilters: () => void;
}

export function MobileFilterBar({
  activeFilterCount,
  onOpenFilters,
}: MobileFilterBarProps) {
  const hasFilters = activeFilterCount > 0;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden flex justify-center pointer-events-none"
      style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom, 1rem))' }}
    >
      <button
        className="pointer-events-auto inline-flex items-center gap-2 shadow-lg active:scale-[0.97] transition-all"
        style={{
          padding: hasFilters ? "10px 18px 10px 14px" : "10px 20px 10px 16px",
          borderRadius: "9999px",
          background: "rgba(10, 10, 10, 0.88)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
        onClick={onOpenFilters}
        aria-label={hasFilters ? `Open filters, ${activeFilterCount} active` : 'Open filters'}
      >
        <SlidersHorizontal className="h-4 w-4 text-white/70" />
        <span
          className="text-white/90"
          style={{ fontSize: "var(--text-nav)" }}
        >
          Filters
        </span>
        {hasFilters && (
          <span
            className="min-w-[20px] h-[20px] px-1.5 rounded-full flex items-center justify-center tabular-nums"
            style={{
              fontSize: "10px",
              background: "var(--brand-red)",
              color: "white",
            }}
          >
            {activeFilterCount}
          </span>
        )}
      </button>
    </div>
  );
}