/**
 * ListingContextBanner — Unified context + filter banner
 *
 * Two visual zones inside one component:
 *   Zone A — Industry hero banner (dark, prominent, with subcategory pills)
 *   Zone B — Compact filter chips strip (light, below the banner)
 *
 * States:
 *   1. Empty (no filters, no industry) → renders nothing
 *   2. Industry only → hero banner
 *   3. Filters only (no industry) → compact filter chips row
 *   4. Industry + filters → hero banner + filter chips strip below
 */
import { X, ChevronRight, Sparkles } from "lucide-react";
import { industries } from "./data";
import { HorizontalScroll } from "./molecules/HorizontalScroll";

interface FilterChipData {
  type: "search" | "subIndustry" | "tag" | "region" | "year";
  label: string;
  value: string;
  onRemove: () => void;
}

interface ListingContextBannerProps {
  selectedIndustry: string | null;
  selectedSubIndustries: string[];
  selectedTags: string[];
  selectedRegions: string[];
  selectedYears: string[];
  searchQuery: string;
  filteredCount: number;
  onRemoveIndustry: () => void;
  onRemoveSubIndustry: (value: string) => void;
  onRemoveTag: (value: string) => void;
  onRemoveRegion: (value: string) => void;
  onRemoveYear: (value: string) => void;
  onRemoveSearch: () => void;
  onClearAll: () => void;
  onSubcategoryClick: (sub: string) => void;
}

const chipStyles: Record<FilterChipData["type"], { bg: string; border: string }> = {
  search:      { bg: "rgba(0,0,0,0.04)",        border: "rgba(0,0,0,0.1)" },
  subIndustry: { bg: "rgba(128,108,224,0.06)",   border: "rgba(128,108,224,0.14)" },
  tag:         { bg: "rgba(16,185,129,0.06)",    border: "rgba(16,185,129,0.14)" },
  region:      { bg: "rgba(134,179,229,0.06)",   border: "rgba(134,179,229,0.14)" },
  year:        { bg: "rgba(245,158,11,0.06)",    border: "rgba(245,158,11,0.14)" },
};

const chipLabels: Record<FilterChipData["type"], string> = {
  search: "Search",
  subIndustry: "Sub-Industry",
  tag: "Tag",
  region: "Region",
  year: "Year",
};

function FilterChip({ chip }: { chip: FilterChipData }) {
  const style = chipStyles[chip.type];
  return (
    <span
      className="inline-flex items-center gap-1.5 pl-2.5 pr-1.5 py-1 transition-all"
      style={{
        fontSize: "var(--text-2xs)",
        background: style.bg,
        border: `1px solid ${style.border}`,
        borderRadius: "var(--radius-element)",
        color: "rgba(0,0,0,0.7)",
      }}
    >
      <span
        className="uppercase tracking-[0.05em] flex-shrink-0"
        style={{ fontSize: "var(--badge-xs-font)", color: "rgba(0,0,0,0.3)" }}
      >
        {chipLabels[chip.type]}
      </span>
      <span className="truncate" style={{ maxWidth: "180px" }}>
        {chip.label}
      </span>
      <button
        className="flex-shrink-0 flex items-center justify-center w-4 h-4 rounded-full transition-all ml-0.5"
        style={{ background: "rgba(0,0,0,0.06)" }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.15)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.06)";
        }}
        onClick={(e) => {
          e.stopPropagation();
          chip.onRemove();
        }}
      >
        <X className="h-2.5 w-2.5" color="rgba(0,0,0,0.45)" />
      </button>
    </span>
  );
}

export function ListingContextBanner({
  selectedIndustry,
  selectedSubIndustries,
  selectedTags,
  selectedRegions,
  selectedYears,
  searchQuery,
  filteredCount,
  onRemoveIndustry,
  onRemoveSubIndustry,
  onRemoveTag,
  onRemoveRegion,
  onRemoveYear,
  onRemoveSearch,
  onClearAll,
  onSubcategoryClick,
}: ListingContextBannerProps) {
  const industry = industries.find((i) => i.name === selectedIndustry);

  // Build filter chips (excluding industry — shown as the banner header)
  const chips: FilterChipData[] = [];

  if (searchQuery) {
    chips.push({
      type: "search",
      label: `"${searchQuery}"`,
      value: searchQuery,
      onRemove: onRemoveSearch,
    });
  }
  selectedSubIndustries.forEach((s) =>
    chips.push({ type: "subIndustry", label: s, value: s, onRemove: () => onRemoveSubIndustry(s) })
  );
  selectedTags.forEach((t) =>
    chips.push({ type: "tag", label: t, value: t, onRemove: () => onRemoveTag(t) })
  );
  selectedRegions.forEach((r) =>
    chips.push({ type: "region", label: r, value: r, onRemove: () => onRemoveRegion(r) })
  );
  selectedYears.forEach((y) =>
    chips.push({ type: "year", label: y, value: y, onRemove: () => onRemoveYear(y) })
  );

  const hasIndustry = !!industry;
  const hasChips = chips.length > 0;
  const totalActive = (hasIndustry ? 1 : 0) + chips.length;

  // Nothing active → render nothing
  if (!hasIndustry && !hasChips) return null;

  return (
    <div style={{ borderRadius: "10px", overflow: "hidden" }}>

      {/* ════════════════════════════════════════════════════
          ZONE A — Industry Hero Banner
          ════════════════════════════════════════════════════ */}
      {hasIndustry && industry && (
        <div
          className="relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1c 50%, #111113 100%)",
          }}
        >
          {/* Decorative dot grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />

          {/* Subtle purple glow — top right */}
          <div
            className="absolute -top-10 -right-10 w-48 h-48 rounded-full blur-[80px]"
            style={{ background: "rgba(128, 108, 224, 0.06)" }}
          />
          {/* Subtle warm glow — bottom left */}
          <div
            className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full blur-[60px]"
            style={{ background: "rgba(255,255,255,0.02)" }}
          />

          <div className="relative z-10 px-5 py-5 sm:px-6">
            {/* Top row: badge + dismiss */}
            <div className="flex items-center justify-between mb-3">
              <span
                className="inline-flex items-center gap-1.5 text-white/90 px-2.5 py-1"
                style={{
                  fontSize: "var(--text-2xs)",
                  background: "rgba(255,255,255,0.10)",
                  borderRadius: "var(--radius-element)",
                  letterSpacing: "0.02em",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <Sparkles className="h-3 w-3" />
                Industry Focus
              </span>

              <button
                className="flex items-center justify-center w-7 h-7 flex-shrink-0 rounded-full transition-all"
                style={{ background: "rgba(255,255,255,0.06)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.15)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                }}
                onClick={onRemoveIndustry}
                title="Remove industry filter"
              >
                <X className="h-3.5 w-3.5 text-white/40" />
              </button>
            </div>

            {/* Heading row: industry name + report count */}
            <div className="flex items-baseline gap-3 mb-1.5">
              <h2
                className="text-white"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontWeight: 'var(--font-weight-light)' as any,
                  fontSize: "clamp(20px, 3vw, 26px)",
                  lineHeight: 1.15,
                }}
              >
                {industry.name}
              </h2>
              <span
                className="text-white/30 flex-shrink-0"
                style={{ fontSize: "var(--text-2xs)" }}
              >
                {industry.count} research reports
              </span>
            </div>

            {/* Description line */}
            <p
              className="text-white/35 mb-4"
              style={{ fontSize: "var(--text-2xs)", maxWidth: "480px", lineHeight: 1.45 }}
            >
              Explore comprehensive market research across all{" "}
              {industry.name.toLowerCase()} sectors and sub-categories.
            </p>

            {/* Subcategory quick-links — horizontal scroll */}
            <HorizontalScroll fadeBg="#111113" gap="gap-2">
              {industry.subcategories.map((sub) => {
                const isActive = selectedSubIndustries.includes(sub);
                return (
                  <button
                    key={sub}
                    className="inline-flex items-center gap-1 px-3 py-1.5 transition-all duration-150 flex-shrink-0 whitespace-nowrap"
                    style={{
                      fontSize: "var(--text-2xs)",
                      color: isActive
                        ? "rgba(255,255,255,0.95)"
                        : "rgba(255,255,255,0.55)",
                      background: isActive
                        ? "rgba(255,255,255,0.16)"
                        : "rgba(255,255,255,0.05)",
                      border: isActive
                        ? "1px solid rgba(255,255,255,0.25)"
                        : "1px solid rgba(255,255,255,0.07)",
                      borderRadius: "var(--radius-element)",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)";
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.14)";
                        (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.85)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                        (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.55)";
                      }
                    }}
                    onClick={() => onSubcategoryClick(sub)}
                  >
                    {sub}
                    <ChevronRight className="h-3 w-3 opacity-40" />
                  </button>
                );
              })}
            </HorizontalScroll>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════
          ZONE B — Active Filter Chips Strip
          ════════════════════════════════════════════════════ */}
      {hasChips && (
        <div
          className="flex items-center gap-2 px-5 py-3 flex-wrap"
          style={{
            background: hasIndustry ? "rgba(0,0,0,0.02)" : "rgba(0,0,0,0.015)",
            borderTop: hasIndustry ? "none" : "1px solid rgba(0,0,0,0.06)",
            borderRight: hasIndustry ? undefined : "1px solid rgba(0,0,0,0.06)",
            borderBottom: hasIndustry ? undefined : "1px solid rgba(0,0,0,0.06)",
            borderLeft: hasIndustry ? undefined : "1px solid rgba(0,0,0,0.06)",
            borderRadius: hasIndustry ? undefined : "10px",
          }}
        >
          {/* Filter count label */}
          <span
            className="uppercase tracking-[0.06em] flex-shrink-0"
            style={{ fontSize: "var(--badge-xs-font)", color: "rgba(0,0,0,0.3)" }}
          >
            {chips.length} filter{chips.length > 1 ? "s" : ""}
          </span>
          <div
            className="w-px h-4 flex-shrink-0"
            style={{ background: "rgba(0,0,0,0.08)" }}
          />

          {/* Chips */}
          {chips.map((chip, i) => (
            <FilterChip key={`${chip.type}-${chip.value}-${i}`} chip={chip} />
          ))}

          {/* Clear all */}
          {totalActive > 1 && (
            <>
              <div className="flex-1" />
              <button
                className="flex items-center gap-1 flex-shrink-0 transition-colors"
                style={{ fontSize: "var(--text-2xs)", color: "rgba(0,0,0,0.3)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "rgba(0,0,0,0.7)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "rgba(0,0,0,0.3)";
                }}
                onClick={onClearAll}
              >
                <X className="h-3 w-3" />
                Clear all
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}