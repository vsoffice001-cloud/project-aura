/**
 * ActiveFilterChip — Molecule
 * Ken Bold DS v4.1
 *
 * Removable chip for displaying active filters in context banners and toolbars.
 * Color-coded by filter type for visual scanning.
 *
 * Visual spec:
 *   Height:  26px (inline flex)
 *   Radius:  9999px (pill)
 *   Font:    --text-2xs (12px)
 *   X icon:  12px, hover darkens
 *   Types:   search (gray), subIndustry (purple), tag (green), region (blue), year (amber)
 */
import { X } from "lucide-react";

export type ActiveFilterType =
  | "search"
  | "subIndustry"
  | "tag"
  | "region"
  | "year"
  | "industry";

export interface ActiveFilterChipProps {
  label: string;
  type: ActiveFilterType;
  onRemove: () => void;
  className?: string;
}

const chipColors: Record<
  ActiveFilterType,
  { bg: string; border: string; text?: string }
> = {
  search: {
    bg: "rgba(0,0,0,0.04)",
    border: "rgba(0,0,0,0.1)",
  },
  industry: {
    bg: "rgba(0,0,0,0.04)",
    border: "rgba(0,0,0,0.12)",
  },
  subIndustry: {
    bg: "rgba(128,108,224,0.06)",
    border: "rgba(128,108,224,0.14)",
  },
  tag: {
    bg: "rgba(16,185,129,0.06)",
    border: "rgba(16,185,129,0.14)",
  },
  region: {
    bg: "rgba(59,130,246,0.06)",
    border: "rgba(59,130,246,0.14)",
  },
  year: {
    bg: "rgba(245,158,11,0.06)",
    border: "rgba(245,158,11,0.14)",
  },
};

export function ActiveFilterChip({
  label,
  type,
  onRemove,
  className,
}: ActiveFilterChipProps) {
  const colors = chipColors[type] || chipColors.search;

  return (
    <span
      className={`inline-flex items-center gap-1 pl-2.5 pr-1.5 py-0.5 transition-all group/chip ${className || ""}`}
      style={{
        fontSize: "var(--text-2xs)",
        borderRadius: "9999px",
        background: colors.bg,
        border: `1px solid ${colors.border}`,
        color: "rgba(0,0,0,0.7)",
      }}
    >
      <span className="truncate max-w-[120px]">{label}</span>
      <button
        className="flex-shrink-0 p-0.5 rounded-full transition-colors hover:bg-black/[0.06]"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        aria-label={`Remove ${label} filter`}
      >
        <X className="h-3 w-3 text-black/30 group-hover/chip:text-black/60 transition-colors" />
      </button>
    </span>
  );
}
