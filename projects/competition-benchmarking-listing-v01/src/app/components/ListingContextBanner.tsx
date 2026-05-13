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
 *
 * Also exports BenchmarkContextBanner — lightweight breadcrumb + count + clear-all
 * variant for the benchmark listing page (warm-300 bg, no industry hero).
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
  search:      { bg: "var(--surface-tint)",        border: "var(--hairline)" },
  subIndustry: { bg: "var(--accent-purple-bg)",   border: "var(--accent-purple-border)" },
  tag:         { bg: "var(--accent-emerald-bg)",    border: "var(--accent-emerald-border)" },
  region:      { bg: "var(--accent-blue-bg)",   border: "var(--accent-blue-border)" },
  year:        { bg: "var(--accent-amber-bg)",    border: "var(--accent-amber-border)" },
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
        color: "var(--ink-body)",
      }}
    >
      <span
        className="uppercase tracking-[0.05em] flex-shrink-0"
        style={{ fontSize: "var(--badge-xs-font)", color: "var(--ink-faint)" }}
      >
        {chipLabels[chip.type]}
      </span>
      <span className="truncate" style={{ maxWidth: "180px" }}>
        {chip.label}
      </span>
      <button
        className="flex-shrink-0 flex items-center justify-center w-4 h-4 rounded-full transition-all ml-0.5"
        style={{ background: "var(--hairline-faint)" }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background = "var(--ink-whisper)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = "var(--hairline-faint)";
        }}
        onClick={(e) => {
          e.stopPropagation();
          chip.onRemove();
        }}
      >
        <X className="h-2.5 w-2.5" color="var(--ink-subtle)" />
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
            /* Cinematic dark gradient — token approximations (no exact #0a0a0a/#1a1a1c/#111113 tokens; using nearest blacks) */
            background: "linear-gradient(135deg, var(--black-900) 0%, var(--black-800) 50%, var(--black-900) 100%)",
          }}
        >
          {/* Decorative dot grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, var(--ink-on-dark-whisper) 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />

          {/* Subtle purple glow — top right */}
          <div
            className="absolute -top-10 -right-10 w-48 h-48 rounded-full blur-[80px]"
            style={{ background: "var(--accent-purple-bg)" }}
          />
          {/* Subtle warm glow — bottom left */}
          <div
            className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full blur-[60px]"
            style={{ background: "var(--hairline-on-dark-faint)" }}
          />

          <div className="relative z-10 px-5 py-5 sm:px-6">
            {/* Top row: badge + dismiss */}
            <div className="flex items-center justify-between mb-3">
              <span
                className="inline-flex items-center gap-1.5 text-white/90 px-2.5 py-1"
                style={{
                  fontSize: "var(--text-2xs)",
                  background: "var(--hairline-on-dark-soft)",
                  borderRadius: "var(--radius-element)",
                  letterSpacing: "0.02em",
                  border: "1px solid var(--hairline-on-dark)",
                }}
              >
                <Sparkles className="h-3 w-3" />
                Industry Focus
              </span>

              <button
                className="flex items-center justify-center w-7 h-7 flex-shrink-0 rounded-full transition-all"
                style={{ background: "var(--hairline-on-dark-faint)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "var(--ink-on-dark-whisper)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "var(--hairline-on-dark-faint)";
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
            <HorizontalScroll fadeBg="var(--black-900)" gap="gap-2">
              {industry.subcategories.map((sub) => {
                const isActive = selectedSubIndustries.includes(sub);
                return (
                  <button
                    key={sub}
                    className="inline-flex items-center gap-1 px-3 py-1.5 transition-all duration-150 flex-shrink-0 whitespace-nowrap"
                    style={{
                      fontSize: "var(--text-2xs)",
                      color: isActive
                        ? "var(--ink-on-dark-strong)"
                        : "var(--ink-on-dark-subtle)",
                      background: isActive
                        ? "var(--hairline-on-dark)"
                        : "var(--hairline-on-dark-faint)",
                      border: isActive
                        ? "1px solid var(--ink-on-dark-subtle)"
                        : "1px solid var(--hairline-on-dark-faint)",
                      borderRadius: "var(--radius-element)",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.background = "var(--hairline-on-dark)";
                        (e.currentTarget as HTMLElement).style.borderColor = "var(--hairline-on-dark)";
                        (e.currentTarget as HTMLElement).style.color = "var(--ink-on-dark-strong)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.background = "var(--hairline-on-dark-faint)";
                        (e.currentTarget as HTMLElement).style.borderColor = "var(--hairline-on-dark-faint)";
                        (e.currentTarget as HTMLElement).style.color = "var(--ink-on-dark-subtle)";
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
            background: hasIndustry ? "var(--surface-tint-soft)" : "var(--surface-tint-soft)",
            borderTop: hasIndustry ? "none" : "1px solid var(--hairline-faint)",
            borderRight: hasIndustry ? undefined : "1px solid var(--hairline-faint)",
            borderBottom: hasIndustry ? undefined : "1px solid var(--hairline-faint)",
            borderLeft: hasIndustry ? undefined : "1px solid var(--hairline-faint)",
            borderRadius: hasIndustry ? undefined : "10px",
          }}
        >
          {/* Filter count label */}
          <span
            className="uppercase tracking-[0.06em] flex-shrink-0"
            style={{ fontSize: "var(--badge-xs-font)", color: "var(--ink-faint)" }}
          >
            {chips.length} filter{chips.length > 1 ? "s" : ""}
          </span>
          <div
            className="w-px h-4 flex-shrink-0"
            style={{ background: "var(--hairline-soft)" }}
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
                style={{ fontSize: "var(--text-2xs)", color: "var(--ink-faint)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--ink-body)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--ink-faint)";
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

/* ════════════════════════════════════════════════════════════════
   BenchmarkContextBanner
   Lightweight breadcrumb + result count + clear-all strip.
   Sits between HeroBanner and ListingToolbar per spec section 3.
   Bg: warm-300 (var(--warm-300)).
   Renders only when activeFilterCount > 0 or always (per caller).
   ════════════════════════════════════════════════════════════════ */

interface BenchmarkContextBannerProps {
  /** Total filtered result count */
  resultCount: number;
  /** Number of active filters (0 → banner still renders for breadcrumb context) */
  activeFilterCount: number;
  /** Callback to clear all active filters */
  onClearAll: () => void;
}

export function BenchmarkContextBanner({
  resultCount,
  activeFilterCount,
  onClearAll,
}: BenchmarkContextBannerProps) {
  return (
    <section
      aria-label="Page context and filters"
      style={{ background: "var(--warm-300)", borderBottom: "1px solid var(--hairline-faint)" }}
    >
      <div
        className="mx-auto px-4 sm:px-6 md:px-8 py-3"
        style={{ maxWidth: "var(--container-page)" }}
      >
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Left: breadcrumb */}
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-1" style={{ listStyle: "none", margin: 0, padding: 0 }}>
              <li>
                <a
                  href="/"
                  style={{
                    fontSize: "var(--text-2xs)",
                    color: "var(--ink-subtle)",
                    textDecoration: "none",
                    transition: "color 150ms ease",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--ink-body)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--ink-faint)"; }}
                >
                  Home
                </a>
              </li>
              <li aria-hidden="true" style={{ color: "var(--ink-whisper)", fontSize: "var(--text-2xs)" }}>
                <ChevronRight className="inline h-3 w-3" />
              </li>
              <li>
                <a
                  href="/research"
                  style={{
                    fontSize: "var(--text-2xs)",
                    color: "var(--ink-subtle)",
                    textDecoration: "none",
                    transition: "color 150ms ease",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--ink-body)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--ink-faint)"; }}
                >
                  Research
                </a>
              </li>
              <li aria-hidden="true" style={{ color: "var(--ink-whisper)", fontSize: "var(--text-2xs)" }}>
                <ChevronRight className="inline h-3 w-3" />
              </li>
              <li>
                <span
                  aria-current="page"
                  style={{ fontSize: "var(--text-2xs)", color: "var(--ink-body)", fontWeight: 500 }}
                >
                  Competition Benchmarking
                </span>
              </li>
            </ol>
          </nav>

          {/* Right: jump links + result count + clear all */}
          <div className="flex items-center gap-3 flex-shrink-0 flex-wrap">
            {/* Jump links */}
            <div className="hidden sm:flex items-center gap-1.5">
              <span style={{ fontSize: "var(--text-2xs)", color: "var(--ink-subtle)" }}>Jump to:</span>
              {([
                { label: 'Industry', href: '#filter-industry' },
                { label: 'Region', href: '#filter-region' },
                { label: 'Methodology', href: '#filter-methodology' },
              ] as const).map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="transition-colors"
                  style={{
                    fontSize: "var(--text-2xs)",
                    color: "var(--ink-subtle)",
                    border: "1px solid var(--hairline)",
                    borderRadius: "var(--radius-element)",
                    padding: "0.1rem 0.5rem",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--ink-body)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--ink-whisper)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--ink-faint)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--hairline)"; }}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.querySelector(link.href);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="w-px h-3 hidden sm:block" style={{ background: "var(--hairline)" }} />

            <span
              style={{
                fontSize: "var(--text-2xs)",
                color: "var(--ink-subtle)",
              }}
            >
              {resultCount.toLocaleString()} report{resultCount !== 1 ? "s" : ""}
            </span>

            {activeFilterCount > 0 && (
              <>
                <div className="w-px h-3" style={{ background: "var(--hairline)" }} />
                <button
                  className="flex items-center gap-1 transition-colors"
                  style={{
                    fontSize: "var(--text-2xs)",
                    color: "var(--ink-subtle)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "0.25rem 0",
                    minHeight: "44px",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--ink-body)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--ink-faint)"; }}
                  onClick={onClearAll}
                  aria-label={`Clear all ${activeFilterCount} active filter${activeFilterCount !== 1 ? "s" : ""}`}
                >
                  <X className="h-3 w-3" />
                  Clear all filters
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}