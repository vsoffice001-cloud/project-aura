/**
 * FilterChip — Atom
 * Ken Bold DS v4.1
 *
 * Toggle chip for mobile filter sheets, tag clouds, and any multi-select UI.
 * Pill-shaped with active/inactive states and optional count.
 *
 * Visual spec:
 *   Height: min 40px (44px touch target on mobile)
 *   Default:  white bg, rgba(0,0,0,0.08) border, 55% text
 *   Active:   rgba(0,0,0,0.06) bg, rgba(0,0,0,0.2) border, Check icon, bold, shadow-sm
 *   Radius:   --radius-element (5px)
 *   Font:     --text-xs
 */
import { Check } from "lucide-react";

export interface FilterChipProps {
  label: string;
  active: boolean;
  onToggle: () => void;
  count?: number | string;
  disabled?: boolean;
  className?: string;
}

export function FilterChip({
  label,
  active,
  onToggle,
  count,
  disabled,
  className,
}: FilterChipProps) {
  return (
    <button
      className={`inline-flex items-center gap-1.5 px-3 py-2 transition-all min-h-[40px] ${
        active ? "shadow-sm" : ""
      } ${disabled ? "opacity-40 cursor-not-allowed" : ""} ${className || ""}`}
      style={{
        fontSize: "var(--text-xs)",
        borderRadius: "var(--radius-element)",
        border: `1px solid ${
          active ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.08)"
        }`,
        background: active ? "rgba(0,0,0,0.06)" : "white",
        color: active ? "var(--text-primary)" : "rgba(0,0,0,0.55)",
        fontWeight: active ? 600 : 400,
      }}
      onClick={() => {
        if (!disabled) onToggle();
      }}
      disabled={disabled}
    >
      {active && <Check className="h-3 w-3 flex-shrink-0" />}
      <span className="truncate">{label}</span>
      {count != null && (
        <span
          className="text-black/25 tabular-nums flex-shrink-0"
          style={{ fontSize: "var(--text-2xs)" }}
        >
          {count}
        </span>
      )}
    </button>
  );
}
