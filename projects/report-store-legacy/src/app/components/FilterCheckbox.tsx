/**
 * FilterCheckbox — Atom
 * Ken Bold DS v4.1
 *
 * Reusable custom checkbox for filter panels, TOC items, side nav selections.
 * Supports 6 interaction states: default, hover, checked, checked+hover, focus-visible, disabled.
 *
 * Visual spec:
 *   Box: 16×16, --radius-inner (2.5px), 1.5px border
 *   Default:  white bg, rgba(0,0,0,0.18) border, inset shadow
 *   Checked:  --text-primary fill, white Check icon, outer shadow
 *   Selected row: rgba(0,0,0,0.03) bg, 2px left-border accent rgba(0,0,0,0.6)
 *   Label: --text-xs, 50% opacity default → 85% checked
 *   Count: --text-2xs, tabular-nums, pill bg when checked
 */
import { Check } from "lucide-react";

export interface FilterCheckboxProps {
  label: string;
  checked: boolean;
  onToggle: () => void;
  count?: number | string;
  indented?: boolean;
  disabled?: boolean;
  className?: string;
}

export function FilterCheckbox({
  label,
  checked,
  onToggle,
  count,
  indented,
  disabled,
  className,
}: FilterCheckboxProps) {
  return (
    <div
      role="checkbox"
      aria-checked={checked}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      className={`flex items-center gap-2.5 select-none transition-all duration-100 ${
        disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
      } ${className || ""}`}
      style={{
        padding: indented ? "6px 16px 6px 28px" : "6px 16px",
        background: checked ? "rgba(0,0,0,0.03)" : "transparent",
        borderLeft: checked
          ? "2px solid rgba(0,0,0,0.6)"
          : "2px solid transparent",
      }}
      onMouseEnter={(e) => {
        if (!disabled && !checked) {
          (e.currentTarget as HTMLElement).style.background =
            "rgba(0,0,0,0.025)";
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          (e.currentTarget as HTMLElement).style.background = checked
            ? "rgba(0,0,0,0.03)"
            : "transparent";
        }
      }}
      onClick={() => {
        if (!disabled) onToggle();
      }}
      onKeyDown={(e) => {
        if (disabled) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
    >
      {/* Custom checkbox box */}
      <div
        className="w-4 h-4 flex-shrink-0 flex items-center justify-center transition-all duration-150"
        style={{
          borderRadius: "var(--radius-inner)",
          border: checked
            ? "1.5px solid var(--text-primary)"
            : "1.5px solid rgba(0,0,0,0.18)",
          background: checked ? "var(--text-primary)" : "white",
          boxShadow: checked
            ? "0 1px 2px rgba(0,0,0,0.15)"
            : "inset 0 1px 2px rgba(0,0,0,0.04)",
        }}
      >
        {checked && (
          <Check className="h-2.5 w-2.5" color="white" strokeWidth={3} />
        )}
      </div>

      {/* Label */}
      <span
        className="flex-1 text-left truncate transition-colors duration-100"
        style={{
          fontSize: "var(--text-xs)",
          color: checked ? "rgba(0,0,0,0.85)" : "rgba(0,0,0,0.5)",
        }}
      >
        {label}
      </span>

      {/* Count badge */}
      {count != null && (
        <span
          className="tabular-nums flex-shrink-0 transition-colors duration-100"
          style={{
            fontSize: "var(--text-2xs)",
            color: checked ? "rgba(0,0,0,0.45)" : "rgba(0,0,0,0.2)",
            background: checked ? "rgba(0,0,0,0.05)" : "transparent",
            padding: checked ? "1px 6px" : "0",
            borderRadius: "9999px",
          }}
        >
          {count}
        </span>
      )}
    </div>
  );
}