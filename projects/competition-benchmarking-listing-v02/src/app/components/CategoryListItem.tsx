/**
 * CategoryListItem — Atom
 * Ken Bold DS v4.2
 *
 * Generic interactive list row: icon + label + trailing meta + hover arrow.
 * Domain-agnostic — reusable for any navigable list pattern:
 *   - Industry sector browsing
 *   - Topic/category navigation
 *   - Document section lists (TOC)
 *   - Settings menu items
 *   - Tag/keyword exploration
 *
 * Visual spec:
 *   Padding:    px-4 py-3
 *   Divider:    1px solid var(--warm-500) (bottom, configurable)
 *   Hover:      bg-black/[0.03]
 *   Arrow:      opacity 0 → 1 on hover, translateX +2px
 *   Label:      text-xs, black/70 → black on hover
 *   Meta:       text-xs, black/35, tabular-nums
 *
 * Accessibility:
 *   - role="button" with tabIndex for keyboard navigation
 *   - focus-visible ring for keyboard users
 *   - Enter/Space triggers onClick
 *   - aria-label combines label + meta for screen readers
 */
import type { ElementType, ReactNode, KeyboardEvent } from "react";
import { ArrowRight } from "lucide-react";
import { IconBadge } from "./IconBadge";
import { Tooltip } from "./Tooltip";
import { iconColors } from "./iconColors";

export interface CategoryListItemProps {
  /** Display label (e.g., industry name, category title) */
  label: string;
  /** Icon component (passed to IconBadge) */
  icon?: ElementType;
  /** Fallback when no icon (e.g., first letter of label) */
  iconFallback?: ReactNode;
  /** Trailing metadata text (e.g., report count, item count) */
  meta?: string;
  /** Tooltip for the meta element */
  metaTooltip?: string;
  /** Click handler */
  onClick?: () => void;
  /** Whether to show the trailing hover arrow */
  showArrow?: boolean;
  /** Whether to show the bottom divider */
  showDivider?: boolean;
  /** Divider color (CSS value) */
  dividerColor?: string;
  /** Additional className */
  className?: string;
  /** Custom trailing content (replaces meta + arrow) */
  trailing?: ReactNode;
}

export function CategoryListItem({
  label,
  icon,
  iconFallback,
  meta,
  metaTooltip,
  onClick,
  showArrow = true,
  showDivider = true,
  dividerColor = "var(--warm-500)",
  className = "",
  trailing,
}: CategoryListItemProps) {
  const handleKeyDown = (e: KeyboardEvent) => {
    if ((e.key === "Enter" || e.key === " ") && onClick) {
      e.preventDefault();
      onClick();
    }
  };

  const ariaLabel = meta ? `${label}, ${meta}` : label;

  return (
    <div
      role="button"
      tabIndex={0}
      className={`group flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors hover:bg-black/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-inset ${className}`}
      style={{
        borderBottom: showDivider ? `1px solid ${dividerColor}` : "none",
      }}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      aria-label={ariaLabel}
    >
      {/* Icon indicator */}
      {(icon || iconFallback) && (
        <IconBadge icon={icon} fallback={iconFallback} size="md" />
      )}

      {/* Label */}
      <span
        className="flex-1 min-w-0 text-black/70 group-hover:text-black transition-colors truncate"
        style={{ fontSize: "var(--text-xs)" }}
      >
        {label}
      </span>

      {/* Trailing zone */}
      {trailing ? (
        trailing
      ) : (
        <>
          {/* Meta count */}
          {meta && (
            <Tooltip text={metaTooltip || ""} position="top">
              <span
                className="flex-shrink-0 tabular-nums text-black/35"
                style={{ fontSize: "var(--text-xs)" }}
              >
                {meta}
              </span>
            </Tooltip>
          )}

          {/* Hover arrow */}
          {showArrow && (
            <ArrowRight
              className="h-3 w-3 flex-shrink-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
              color={iconColors.utility}
            />
          )}
        </>
      )}
    </div>
  );
}
