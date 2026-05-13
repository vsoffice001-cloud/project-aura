/**
 * IndustrySidebar — Organism
 * Ken Bold DS v4.1
 *
 * Desktop filter panel for the Report Store listing mode.
 * Composes: SidebarPanel, FilterAccordion, FilterCheckbox, FilterSearchInput
 *
 * Features:
 *   - Sticky positioning (SidebarPanel handles container)
 *   - 4 accordion sections: Industries (tree), Tags, Regions, Years
 *   - Tags section disabled until an industry is selected
 *   - Search-within-filters: auto-opens sections with matches
 *   - Auto-expand industries with active subcategories
 *   - Auto-scroll to active subcategory after expand animation
 *   - Show All / collapse for 8+ industries
 *   - Active filter count badge per section
 *   - Clear All button in header
 */
import { useState, useMemo, useEffect, useRef } from "react";
import {
  ChevronRight,
  ChevronDown,
  Layers,
  Tag,
  MapPin,
  Calendar,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { industries, reports } from "./data";
import { iconColors } from "./iconColors";
import { Tooltip } from "./Tooltip";
import { FilterCheckbox } from "./FilterCheckbox";
import { FilterSearchInput } from "./FilterSearchInput";
import { FilterAccordion } from "./molecules/FilterAccordion";
import { SidebarPanel } from "./molecules/SidebarPanel";

/* ─── Derive filter options from data ─── */
function deriveTagsForIndustry(selectedIndustry: string | null): string[] {
  if (selectedIndustry) {
    const ind = industries.find((i) => i.name === selectedIndustry);
    return ind?.tags ?? [];
  }
  const allTags = new Set<string>();
  industries.forEach((ind) => {
    ind.tags?.forEach((tag) => allTags.add(tag));
  });
  return Array.from(allTags).sort();
}

function deriveYears(): string[] {
  const years = new Set<string>();
  reports.forEach((r) => {
    const match = r.date.match(/\d{4}/);
    if (match) years.add(match[0]);
  });
  return Array.from(years).sort((a, b) => Number(b) - Number(a));
}

/* ─── Types ─── */
interface IndustrySidebarProps {
  selectedIndustry: string | null;
  onIndustrySelect: (industry: string) => void;
  onSubcategorySelect: (subcategory: string) => void;
  onClear: () => void;
  viewMode?: "home" | "listing";
  currentSubIndustries?: string[];
  currentTags?: string[];
  currentRegions?: string[];
  currentYears?: string[];
  onSubIndustriesChange?: (subs: string[]) => void;
  onTagsChange?: (tags: string[]) => void;
  onRegionsChange?: (regions: string[]) => void;
  onYearsChange?: (years: string[]) => void;
}

type SectionKey = "industries" | "tags" | "regions" | "years";

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════ */
export function IndustrySidebar({
  selectedIndustry,
  onIndustrySelect,
  onSubcategorySelect,
  onClear,
  viewMode = "home",
  currentSubIndustries = [],
  currentTags = [],
  currentRegions = [],
  currentYears = [],
  onSubIndustriesChange,
  onTagsChange,
  onRegionsChange,
  onYearsChange,
}: IndustrySidebarProps) {
  /* Expanded accordion sections */
  const [openSections, setOpenSections] = useState<Set<SectionKey>>(
    new Set(["industries"])
  );

  /* Derive Sets from controlled props */
  const selectedSubIndustries = useMemo(
    () => new Set(currentSubIndustries),
    [currentSubIndustries]
  );
  const selectedTags = useMemo(() => new Set(currentTags), [currentTags]);
  const selectedRegions = useMemo(
    () => new Set(currentRegions),
    [currentRegions]
  );
  const selectedYears = useMemo(() => new Set(currentYears), [currentYears]);

  /* Industries expand */
  const [expandedIndustries, setExpandedIndustries] = useState<Set<string>>(
    new Set()
  );
  const [showAllIndustries, setShowAllIndustries] = useState(false);

  /* Ref for scrollable filter area */
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  /* Auto-expand industries whose subcategories are currently selected */
  useEffect(() => {
    if (currentSubIndustries.length === 0) return;
    const industriesWithActiveSubs = new Set<string>();
    industries.forEach((ind) => {
      if (
        ind.subcategories?.some((sub) => currentSubIndustries.includes(sub))
      ) {
        industriesWithActiveSubs.add(ind.name);
      }
    });
    if (industriesWithActiveSubs.size > 0) {
      setExpandedIndustries((prev) => {
        const next = new Set(prev);
        industriesWithActiveSubs.forEach((name) => next.add(name));
        return next;
      });
      setOpenSections((prev) => {
        if (prev.has("industries")) return prev;
        const next = new Set(prev);
        next.add("industries");
        return next;
      });

      // Auto-scroll to the first selected subcategory after DOM updates
      requestAnimationFrame(() => {
        setTimeout(() => {
          const container = scrollContainerRef.current;
          if (!container) return;
          const activeEl = container.querySelector(
            '[data-sub-active="true"]'
          );
          if (activeEl) {
            activeEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
          }
        }, 220);
      });
    }
  }, [currentSubIndustries]);

  /* Search query */
  const [searchQuery, setSearchQuery] = useState("");

  /* Derived data */
  const tags = useMemo(
    () =>
      deriveTagsForIndustry(selectedIndustry).sort((a, b) =>
        a.localeCompare(b)
      ),
    [selectedIndustry]
  );
  const regionList = useMemo(() => {
    const regionMap = new Map<string, number>();
    reports.forEach((r) => {
      regionMap.set(r.region, (regionMap.get(r.region) || 0) + 1);
    });
    return Array.from(regionMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);
  const years = useMemo(() => deriveYears(), []);

  /* Filter items by search query */
  const q = searchQuery.toLowerCase().trim();

  const filteredIndustries = useMemo(() => {
    const sorted = [...industries].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    const base = showAllIndustries ? sorted : sorted.slice(0, 8);
    if (!q) return base;
    return sorted.filter(
      (ind) =>
        ind.name.toLowerCase().includes(q) ||
        ind.subcategories?.some((sub) => sub.toLowerCase().includes(q))
    );
  }, [q, showAllIndustries]);

  const filteredTags = useMemo(
    () => (q ? tags.filter((t) => t.toLowerCase().includes(q)) : tags),
    [q, tags]
  );

  const filteredRegions = useMemo(
    () =>
      q
        ? regionList.filter((r) => r.name.toLowerCase().includes(q))
        : regionList,
    [q, regionList]
  );

  const filteredYears = useMemo(
    () => (q ? years.filter((y) => y.includes(q)) : years),
    [q, years]
  );

  /* Auto-open sections that have matching results when searching */
  const searchMatchSections = useMemo(() => {
    if (!q) return null;
    const matches = new Set<SectionKey>();
    if (filteredIndustries.length > 0) matches.add("industries");
    if (filteredTags.length > 0) matches.add("tags");
    if (filteredRegions.length > 0) matches.add("regions");
    if (filteredYears.length > 0) matches.add("years");
    return matches;
  }, [q, filteredIndustries, filteredTags, filteredRegions, filteredYears]);

  const isSectionOpen = (key: SectionKey) => {
    if (searchMatchSections) return searchMatchSections.has(key);
    return openSections.has(key);
  };

  const visibleIndustries = filteredIndustries;
  const totalReports = industries.reduce(
    (sum, ind) => sum + parseInt(ind.count.replace(",", "")),
    0
  );

  /* Total active filter count */
  const activeCount =
    (selectedIndustry ? 1 : 0) +
    selectedSubIndustries.size +
    selectedTags.size +
    selectedRegions.size +
    selectedYears.size;

  /* Helpers */
  const toggleSection = (key: SectionKey) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const toggleIndustryExpand = (name: string) => {
    setExpandedIndustries((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const toggleSubIndustry = (value: string) => {
    const next = new Set(selectedSubIndustries);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    onSubIndustriesChange?.(Array.from(next));
  };

  const toggleTag = (value: string) => {
    const next = new Set(selectedTags);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    onTagsChange?.(Array.from(next));
  };

  const toggleRegion = (value: string) => {
    const next = new Set(selectedRegions);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    onRegionsChange?.(Array.from(next));
  };

  const toggleYear = (value: string) => {
    const next = new Set(selectedYears);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    onYearsChange?.(Array.from(next));
  };

  const clearAll = () => {
    onClear();
    onSubIndustriesChange?.([]);
    onTagsChange?.([]);
    onRegionsChange?.([]);
    onYearsChange?.([]);
  };

  return (
    <SidebarPanel
      scrollRef={scrollContainerRef}
      header={
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div
                className="w-7 h-7 bg-white flex items-center justify-center"
                style={{
                  borderRadius: "var(--radius-element)",
                  border: "1px solid rgba(0,0,0,0.08)",
                }}
              >
                <SlidersHorizontal
                  className="h-3.5 w-3.5"
                  color={iconColors.utility}
                />
              </div>
              <h3
                className="tracking-[0.1em] uppercase"
                style={{
                  fontSize: "var(--text-2xs)",
                  color: "rgba(0,0,0,0.5)",
                  fontWeight: "var(--font-weight-heading)",
                }}
              >
                Filters
              </h3>
              {activeCount > 0 && (
                <span
                  className="min-w-5 h-5 px-1.5 rounded-full bg-black text-white flex items-center justify-center"
                  style={{ fontSize: "var(--badge-xs-font)" }}
                >
                  {activeCount}
                </span>
              )}
            </div>
            {activeCount > 0 && (
              <button
                className="flex items-center gap-1 transition-colors"
                style={{
                  fontSize: "var(--text-2xs)",
                  color: "rgba(0,0,0,0.4)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color =
                    "rgba(0,0,0,0.8)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color =
                    "rgba(0,0,0,0.4)";
                }}
                onClick={clearAll}
              >
                <X className="h-3 w-3" />
                Clear all
              </button>
            )}
          </div>
        </div>
      }
      footer={
        <div className="p-3">
          <p
            className="text-center"
            style={{
              fontSize: "var(--text-2xs)",
              color: "rgba(0,0,0,0.35)",
            }}
          >
            <span
              className="tabular-nums"
              style={{ color: "rgba(0,0,0,0.55)" }}
            >
              {totalReports.toLocaleString()}+
            </span>{" "}
            reports available
          </p>
        </div>
      }
    >
      {/* ── Search ── */}
      <div
        className="px-3 py-2.5 flex-shrink-0"
        style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}
      >
        <FilterSearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search filters..."
        />
      </div>

      {/* ━━ 1. Industries ━━ */}
      <FilterAccordion
        variant="sidebar"
        icon={<Layers className="h-3 w-3" color={iconColors.utility} />}
        label="Industries"
        isOpen={isSectionOpen("industries")}
        onToggle={() => toggleSection("industries")}
        count={selectedIndustry ? 1 : 0}
      >
        <div className="py-0.5">
          {visibleIndustries.map((industry) => {
            const isExpanded = expandedIndustries.has(industry.name);
            const isSelected = selectedIndustry === industry.name;

            return (
              <div key={industry.name}>
                <div
                  className="flex items-center gap-1.5 px-3 py-2 cursor-pointer transition-all duration-100"
                  style={{
                    borderLeft: `3px solid ${
                      isSelected ? "#000000" : "transparent"
                    }`,
                    background: isSelected
                      ? "rgba(0, 0, 0, 0.04)"
                      : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected)
                      (e.currentTarget as HTMLElement).style.background =
                        "rgba(0,0,0,0.02)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected)
                      (e.currentTarget as HTMLElement).style.background =
                        "transparent";
                  }}
                >
                  <button
                    className="p-0.5 flex-shrink-0 transition-colors rounded"
                    style={{ borderRadius: "var(--radius-inner)" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background =
                        "rgba(0,0,0,0.06)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background =
                        "transparent";
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleIndustryExpand(industry.name);
                    }}
                  >
                    {isExpanded ? (
                      <ChevronDown
                        className="h-3 w-3"
                        color={iconColors.utility}
                      />
                    ) : (
                      <ChevronRight
                        className="h-3 w-3"
                        color={iconColors.utility}
                      />
                    )}
                  </button>
                  <button
                    className="flex-1 text-left truncate transition-colors"
                    style={{
                      fontSize: "var(--text-xs)",
                      color: isSelected
                        ? "rgba(0,0,0,0.9)"
                        : "rgba(0,0,0,0.5)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color =
                        "rgba(0,0,0,0.85)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = isSelected
                        ? "rgba(0,0,0,0.9)"
                        : "rgba(0,0,0,0.5)";
                    }}
                    onClick={() => onIndustrySelect(industry.name)}
                  >
                    {industry.name}
                  </button>
                  <span
                    className="tabular-nums flex-shrink-0"
                    style={{
                      fontSize: "var(--text-2xs)",
                      color: isSelected
                        ? "rgba(0,0,0,0.45)"
                        : "rgba(0,0,0,0.18)",
                    }}
                  >
                    {industry.count}
                  </span>
                </div>

                {isExpanded && industry.subcategories && (
                  <div
                    className="ml-7"
                    style={{
                      borderLeft: "1px solid rgba(0,0,0,0.08)",
                    }}
                  >
                    {[...industry.subcategories]
                      .sort((a, b) => a.localeCompare(b))
                      .map((sub) => {
                        const isSubSelected = selectedSubIndustries.has(sub);
                        return (
                          <button
                            key={sub}
                            className="block w-full text-left px-3 py-1.5 transition-all duration-100"
                            style={{
                              fontSize: "var(--text-2xs)",
                              color: isSubSelected
                                ? "rgba(0,0,0,0.9)"
                                : "rgba(0,0,0,0.4)",
                              background: isSubSelected
                                ? "rgba(0,0,0,0.05)"
                                : "transparent",
                              borderLeft: isSubSelected
                                ? "2px solid rgba(0,0,0,0.6)"
                                : "2px solid transparent",
                              marginLeft: "-1px",
                            }}
                            onMouseEnter={(e) => {
                              const el = e.currentTarget as HTMLElement;
                              el.style.color = "rgba(0,0,0,0.85)";
                              if (!isSubSelected)
                                el.style.background = "rgba(0,0,0,0.025)";
                            }}
                            onMouseLeave={(e) => {
                              const el = e.currentTarget as HTMLElement;
                              el.style.color = isSubSelected
                                ? "rgba(0,0,0,0.9)"
                                : "rgba(0,0,0,0.4)";
                              el.style.background = isSubSelected
                                ? "rgba(0,0,0,0.05)"
                                : "transparent";
                            }}
                            onClick={() => onSubcategorySelect(sub)}
                            data-sub-active={isSubSelected}
                          >
                            {sub}
                          </button>
                        );
                      })}
                  </div>
                )}
              </div>
            );
          })}

          {!showAllIndustries && industries.length > 8 && (
            <button
              className="w-full text-center py-2.5 transition-colors"
              style={{
                fontSize: "var(--text-2xs)",
                borderTop: "1px solid rgba(0,0,0,0.06)",
                color: "rgba(0,0,0,0.45)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color =
                  "rgba(0,0,0,0.7)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color =
                  "rgba(0,0,0,0.45)";
              }}
              onClick={() => setShowAllIndustries(true)}
            >
              + Show all {industries.length} industries
            </button>
          )}
        </div>
      </FilterAccordion>

      {/* ━━ 2. Tags ━━ */}
      <FilterAccordion
        variant="sidebar"
        icon={<Tag className="h-3 w-3" color={iconColors.utility} />}
        label="Tags"
        isOpen={isSectionOpen("tags")}
        onToggle={() => toggleSection("tags")}
        count={selectedTags.size}
        disabled={!selectedIndustry}
        disabledHint="Select an industry first to filter by tags"
      >
        <div style={{ maxHeight: "300px", overflowY: "auto" }}>
          {filteredTags.map((tag) => (
            <FilterCheckbox
              key={tag}
              label={tag}
              checked={selectedTags.has(tag)}
              onToggle={() => toggleTag(tag)}
            />
          ))}
          {filteredTags.length === 0 && (
            <p
              className="px-4 py-3 text-center"
              style={{
                fontSize: "var(--text-2xs)",
                color: "rgba(0,0,0,0.3)",
              }}
            >
              No matches found
            </p>
          )}
        </div>
      </FilterAccordion>

      {/* ━━ 3. Regions / Geography ━━ */}
      <FilterAccordion
        variant="sidebar"
        icon={<MapPin className="h-3 w-3" color={iconColors.utility} />}
        label="Regions"
        isOpen={isSectionOpen("regions")}
        onToggle={() => toggleSection("regions")}
        count={selectedRegions.size}
      >
        <div style={{ maxHeight: "240px", overflowY: "auto" }}>
          {filteredRegions.map((r) => (
            <FilterCheckbox
              key={r.name}
              label={r.name}
              checked={selectedRegions.has(r.name)}
              onToggle={() => toggleRegion(r.name)}
              count={r.count}
            />
          ))}
          {filteredRegions.length === 0 && (
            <p
              className="px-4 py-3 text-center"
              style={{
                fontSize: "var(--text-2xs)",
                color: "rgba(0,0,0,0.3)",
              }}
            >
              No matches found
            </p>
          )}
        </div>
      </FilterAccordion>

      {/* ━━ 4. Publish Years ━━ */}
      <FilterAccordion
        variant="sidebar"
        icon={<Calendar className="h-3 w-3" color={iconColors.utility} />}
        label="Publish Year"
        isOpen={isSectionOpen("years")}
        onToggle={() => toggleSection("years")}
        count={selectedYears.size}
      >
        {filteredYears.map((y) => (
          <FilterCheckbox
            key={y}
            label={y}
            checked={selectedYears.has(y)}
            onToggle={() => toggleYear(y)}
          />
        ))}
        {filteredYears.length === 0 && (
          <p
            className="px-4 py-3 text-center"
            style={{
              fontSize: "var(--text-2xs)",
              color: "rgba(0,0,0,0.3)",
            }}
          >
            No matches found
          </p>
        )}
      </FilterAccordion>
    </SidebarPanel>
  );
}
