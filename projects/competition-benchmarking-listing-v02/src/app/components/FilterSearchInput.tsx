/**
 * FilterSearchInput — Atom
 * Ken Bold DS v4.1
 *
 * Compact search input for filtering within panels (sidebar, sheets, dropdowns).
 * Shows clear button when value is present. Border darkens when has value.
 *
 * Visual spec:
 *   Font:    --text-2xs (12px)
 *   Border:  rgba(0,0,0,0.08) default → rgba(0,0,0,0.2) when has value
 *   Radius:  --radius-inner (2.5px)
 *   Icon:    Search (iconColors.utility), 14px
 *   Clear:   X icon, 12px, 30%→60% hover transition
 */
import { Search, X } from "lucide-react";
import { iconColors } from "./iconColors";

export interface FilterSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  ariaLabel?: string;
  className?: string;
}

export function FilterSearchInput({
  value,
  onChange,
  onClear,
  placeholder = "Search filters...",
  ariaLabel = "Search filter options",
  className,
}: FilterSearchInputProps) {
  const handleClear = () => {
    onChange("");
    onClear?.();
  };

  return (
    <div
      className={`flex items-center gap-2 px-2.5 py-2 bg-white transition-all ${className || ""}`}
      style={{
        borderRadius: "var(--radius-inner)",
        border: value
          ? "1px solid rgba(0,0,0,0.2)"
          : "1px solid rgba(0,0,0,0.08)",
      }}
    >
      <Search
        className="h-3.5 w-3.5 flex-shrink-0"
        color={iconColors.utility}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className="flex-1 bg-transparent outline-none text-black/70 placeholder:text-black/25 min-w-0"
        style={{ fontSize: "var(--text-2xs)" }}
      />
      {value && (
        <button
          className="flex-shrink-0 text-black/30 hover:text-black/60 transition-colors"
          onClick={handleClear}
          aria-label="Clear search"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}
