/**
 * MobileFilterSheet — Organism
 * Ken Bold DS v4.1
 *
 * Full-screen filter drawer for mobile (< lg breakpoint).
 * Composes: FilterAccordion (sheet variant), FilterChip, Button
 *
 * Features:
 *   - Slide-from-right animation (300ms cubic-bezier)
 *   - Body scroll lock when open
 *   - Focus trap (Tab/Shift+Tab cycle, Escape to close)
 *   - Backdrop click to close
 *   - Sort integration as top-level section
 *   - Collapsible sections with per-section active counts
 *   - Sticky header with title + active count + clear all
 *   - Sticky footer with "Show Results" brand button
 *   - Max-width 380px, full height
 */
import { useState, useEffect, useRef } from "react";
import {
  X,
  Layers,
  Tag,
  MapPin,
  Calendar,
  ArrowUpDown,
} from "lucide-react";
import { industries, reports } from "./data";
import { iconColors } from "./iconColors";
import { Button } from "./Button";
import { FilterChip } from "./FilterChip";
import { FilterAccordion } from "./molecules/FilterAccordion";

/* ─── Derive filter options from data ─── */
function deriveRegions(): string[] {
  const regions = new Set<string>();
  reports.forEach((r) => regions.add(r.region));
  return Array.from(regions).sort();
}

function deriveYears(): string[] {
  const years = new Set<string>();
  reports.forEach((r) => {
    const match = r.date.match(/\d{4}/);
    if (match) years.add(match[0]);
  });
  return Array.from(years).sort((a, b) => Number(b) - Number(a));
}

const allRegions = deriveRegions();
const allYears = deriveYears();
const sortOptions = [
  "Newest First",
  "Oldest First",
  "Most Popular",
  "A-Z",
  "Z-A",
];

/* ─── Types ─── */
interface MobileFilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  sidebarIndustry: string | null;
  sidebarSubIndustries: string[];
  sidebarRegions: string[];
  sidebarYears: string[];
  sortBy?: string;
  onSortChange?: (sort: string) => void;
  onIndustrySelect: (industry: string) => void;
  onSubcategorySelect: (subcategory: string) => void;
  onRegionsChange: (regions: string[]) => void;
  onYearsChange: (years: string[]) => void;
  onClearAll: () => void;
  activeFilterCount: number;
}

/* ═══ Main Component ═══ */
export function MobileFilterSheet({
  isOpen,
  onClose,
  sidebarIndustry,
  sidebarSubIndustries,
  sidebarRegions,
  sidebarYears,
  onIndustrySelect,
  onSubcategorySelect,
  onRegionsChange,
  onYearsChange,
  onClearAll,
  activeFilterCount,
  sortBy,
  onSortChange,
}: MobileFilterSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);

  // Accordion open state — managed locally since sheet mounts/unmounts
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    sort: true,
    industry: true,
    segments: true,
    region: false,
    year: false,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Focus trap
  useEffect(() => {
    if (!isOpen) return;
    const sheet = sheetRef.current;
    if (!sheet) return;

    const closeBtn = sheet.querySelector<HTMLElement>(
      '[aria-label="Close filters"]'
    );
    closeBtn?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      const focusable = sheet.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const currentIndustry = industries.find((i) => i.name === sidebarIndustry);
  const subcats = currentIndustry?.subcategories || [];

  const toggleRegion = (region: string) => {
    const next = sidebarRegions.includes(region)
      ? sidebarRegions.filter((r) => r !== region)
      : [...sidebarRegions, region];
    onRegionsChange(next);
  };

  const toggleYear = (year: string) => {
    const next = sidebarYears.includes(year)
      ? sidebarYears.filter((y) => y !== year)
      : [...sidebarYears, year];
    onYearsChange(next);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 lg:hidden"
        style={{
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.25s ease",
        }}
      >
        <div
          className="absolute inset-0"
          style={{ background: "rgba(0,0,0,0.4)" }}
          onClick={onClose}
        />

        {/* Sheet — slides from right */}
        <div
          className="absolute right-0 top-0 bottom-0 w-full max-w-[380px] bg-white flex flex-col shadow-2xl"
          role="dialog"
          aria-modal="true"
          aria-label="Filters & Sort"
          style={{
            transform: isOpen ? "translateX(0)" : "translateX(100%)",
            transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          ref={sheetRef}
        >
          {/* ── Sticky Header ── */}
          <div
            className="flex-shrink-0 flex items-center justify-between px-4 py-3"
            style={{
              borderBottom: "1px solid rgba(0,0,0,0.06)",
              background: "white",
            }}
          >
            <div className="flex items-center gap-2.5">
              <h3
                style={{
                  fontSize: "var(--text-base)",
                  color: "var(--text-primary)",
                  fontWeight: "var(--font-weight-heading)" as any,
                }}
              >
                Filters & Sort
              </h3>
              {activeFilterCount > 0 && (
                <span
                  className="min-w-[22px] h-[22px] px-1.5 rounded-full flex items-center justify-center tabular-nums"
                  style={{
                    fontSize: "10px",
                    background: "var(--text-primary)",
                    color: "white",
                  }}
                >
                  {activeFilterCount}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1">
              {activeFilterCount > 0 && (
                <button
                  className="text-black/40 hover:text-black transition-colors px-3 py-2"
                  style={{ fontSize: "var(--text-xs)" }}
                  onClick={onClearAll}
                >
                  Clear all
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 hover:bg-black/[0.03] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                style={{ borderRadius: "var(--radius-element)" }}
                aria-label="Close filters"
              >
                <X className="h-5 w-5" color={iconColors.utility} />
              </button>
            </div>
          </div>

          {/* ── Scrollable Content ── */}
          <div className="flex-1 overflow-y-auto overscroll-contain">
            {/* Sort */}
            {sortBy && onSortChange && (
              <FilterAccordion
                variant="sheet"
                icon={
                  <ArrowUpDown
                    className="h-3.5 w-3.5"
                    color={iconColors.utility}
                  />
                }
                label="Sort By"
                isOpen={openSections.sort}
                onToggle={() => toggleSection("sort")}
              >
                {sortOptions.map((opt) => (
                  <FilterChip
                    key={opt}
                    label={opt}
                    active={sortBy === opt}
                    onToggle={() => onSortChange(opt)}
                  />
                ))}
              </FilterAccordion>
            )}

            {/* Industries */}
            <FilterAccordion
              variant="sheet"
              icon={
                <Layers
                  className="h-3.5 w-3.5"
                  color={iconColors.utility}
                />
              }
              label="Industry"
              isOpen={openSections.industry}
              onToggle={() => toggleSection("industry")}
              count={sidebarIndustry ? 1 : 0}
            >
              {industries.map((ind) => (
                <FilterChip
                  key={ind.name}
                  label={ind.name}
                  active={sidebarIndustry === ind.name}
                  onToggle={() => onIndustrySelect(ind.name)}
                  count={ind.count}
                />
              ))}
            </FilterAccordion>

            {/* Sub-industries (contextual) */}
            {sidebarIndustry && subcats.length > 0 && (
              <FilterAccordion
                variant="sheet"
                icon={
                  <Tag
                    className="h-3.5 w-3.5"
                    color={iconColors.utility}
                  />
                }
                label={`${sidebarIndustry} Segments`}
                isOpen={openSections.segments}
                onToggle={() => toggleSection("segments")}
                count={sidebarSubIndustries.length}
              >
                {subcats.map((sub) => (
                  <FilterChip
                    key={sub}
                    label={sub}
                    active={sidebarSubIndustries.includes(sub)}
                    onToggle={() => onSubcategorySelect(sub)}
                  />
                ))}
              </FilterAccordion>
            )}

            {/* Regions */}
            <FilterAccordion
              variant="sheet"
              icon={
                <MapPin
                  className="h-3.5 w-3.5"
                  color={iconColors.utility}
                />
              }
              label="Region"
              isOpen={openSections.region}
              onToggle={() => toggleSection("region")}
              count={sidebarRegions.length}
            >
              {allRegions.map((region) => (
                <FilterChip
                  key={region}
                  label={region}
                  active={sidebarRegions.includes(region)}
                  onToggle={() => toggleRegion(region)}
                />
              ))}
            </FilterAccordion>

            {/* Years */}
            <FilterAccordion
              variant="sheet"
              icon={
                <Calendar
                  className="h-3.5 w-3.5"
                  color={iconColors.utility}
                />
              }
              label="Year"
              isOpen={openSections.year}
              onToggle={() => toggleSection("year")}
              count={sidebarYears.length}
            >
              {allYears.map((year) => (
                <FilterChip
                  key={year}
                  label={year}
                  active={sidebarYears.includes(year)}
                  onToggle={() => toggleYear(year)}
                />
              ))}
            </FilterAccordion>

            {/* Bottom breathing room */}
            <div className="h-4" />
          </div>

          {/* ── Sticky Footer ── */}
          <div
            className="flex-shrink-0 px-4 py-3"
            style={{
              borderTop: "1px solid rgba(0,0,0,0.06)",
              background: "white",
            }}
          >
            <Button variant="brand" size="sm" fullWidth onClick={onClose}>
              Show Results
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
