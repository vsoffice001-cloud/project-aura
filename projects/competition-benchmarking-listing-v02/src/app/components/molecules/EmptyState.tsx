/**
 * EmptyState — Molecule
 *
 * Reusable empty/no-results state with icon, message, and optional action.
 * DS-compliant: warm border, radius token, neutral palette.
 * Includes a subtle fade + scale entrance animation.
 */
import { Search } from "lucide-react";
import type { ReactNode } from "react";

interface EmptyStateProps {
  icon?: ReactNode;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon,
  message = "No results found matching your criteria.",
  actionLabel = "Clear all filters",
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={`text-center py-20 border border-dashed ${className || ""}`}
      style={{
        borderColor: "var(--warm-500)",
        borderRadius: "var(--rc-radius-card)",
        background: "var(--warm-300)",
        animation: "fadeUp 0.45s cubic-bezier(0.16, 1, 0.3, 1) both",
      }}
    >
      <div
        className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center"
        style={{ background: "var(--warm-500)" }}
      >
        {icon || <Search className="h-5 w-5 text-black/30" />}
      </div>
      <p className="text-black/50 mb-2">{message}</p>
      {onAction && (
        <button
          className="hover:opacity-70 transition-colors"
          style={{
            fontSize: "var(--text-nav)",
            color: "rgba(0,0,0,0.5)",
          }}
          onClick={onAction}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
