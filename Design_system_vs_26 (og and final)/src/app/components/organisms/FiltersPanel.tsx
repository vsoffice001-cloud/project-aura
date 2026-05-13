/**
 * FiltersPanel — Organism (DS v4.3)
 *
 * WHAT: Complete sidebar filter content composed from DS atoms.
 * WHY:  Extracted the ~200 lines of inline sidebar JSX from
 *       ReportStoreListingDemoContent into a single reusable organism.
 *       Shared between desktop SidebarPanel and MobileFilterSheet.
 * WHEN: Inside SidebarPanel (desktop) and MobileFilterSheet (mobile).
 * HOW:  Renders FilterSearchInput + FilterSectionHeader/FilterCheckboxItem
 *       sections for Industries, Tags, Regions, Publish Year.
 *
 * COLOR SYSTEM: All colors via inline style rgba(). No Tailwind color classes.
 * FONT TOKENS: var(--text-xs) for labels/items/empty states, var(--text-card-micro) for counts only.
 */
import { ChevronRight, ChevronDown, Layers, Tag, MapPin, Calendar, Lock } from 'lucide-react';
import { FilterSearchInput } from '@/app/components/FilterSearchInput';
import { FilterSectionHeader } from '@/app/components/FilterSectionHeader';
import { FilterCheckboxItem } from '@/app/components/FilterCheckboxItem';
import { FULL_REGIONS, PUBLISH_YEARS } from '@/app/components/data';
import type { ReportFilters } from '@/app/hooks/useReportFilters';

interface FiltersPanelProps {
  filters: ReportFilters;
}

export function FiltersPanel({ filters }: FiltersPanelProps) {
  const {
    sidebarSearch, setSidebarSearch,
    filteredSidebarIndustries,
    selectedIndustry, selectIndustry,
    selectedSubIndustries, toggleSubIndustry,
    industriesOpen, setIndustriesOpen,
    selectedTags, toggleTag,
    availableTags, tagsOpen, setTagsOpen,
    selectedRegions, toggleRegion,
    regionsOpen, setRegionsOpen,
    selectedYears, toggleYear,
    publishYearOpen, setPublishYearOpen,
    applyFilter,
  } = filters;

  return (
    <>
      {/* Search within filters */}
      <div className="px-3 py-2.5" style={{ borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: 'rgba(0,0,0,0.06)' }}>
        <FilterSearchInput value={sidebarSearch} onChange={setSidebarSearch} placeholder="Search filters..." />
      </div>

      {/* ── INDUSTRIES ── */}
      <div style={{ borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: 'rgba(0,0,0,0.06)' }}>
        <FilterSectionHeader
          icon={<Layers size={12} style={{ color: 'rgba(0,0,0,0.45)' }} />}
          label="Industries"
          activeCount={selectedIndustry ? 1 : 0}
          isOpen={industriesOpen}
          onToggle={() => setIndustriesOpen(!industriesOpen)}
          active={!!selectedIndustry}
        />
        {industriesOpen && (
          <div className="pb-0">
            <div className="py-0.5">
              {filteredSidebarIndustries.map((ind) => {
                const isSelected = selectedIndustry === ind.label;
                return (
                  <div key={ind.label}>
                    {/* Industry row */}
                    <div
                      className="flex items-center gap-1.5 px-3 py-2 cursor-pointer transition-all duration-100"
                      style={{
                        borderLeftWidth: isSelected ? '3px' : '3px',
                        borderLeftStyle: 'solid',
                        borderLeftColor: isSelected ? 'rgb(0,0,0)' : 'rgba(0,0,0,0)',
                        backgroundColor: isSelected ? 'rgba(0,0,0,0.04)' : 'rgba(0,0,0,0)',
                      }}
                      onClick={() => selectIndustry(ind.label)}
                    >
                      <button className="p-0.5 flex-shrink-0" style={{ borderRadius: 'var(--radius-inner)' }}>
                        {isSelected
                          ? <ChevronDown size={12} style={{ color: 'rgba(0,0,0,0.45)' }} />
                          : <ChevronRight size={12} style={{ color: 'rgba(0,0,0,0.45)' }} />
                        }
                      </button>
                      <span
                        className="flex-1 text-left truncate transition-colors"
                        title={ind.label}
                        style={{
                          fontSize: 'var(--text-xs)',
                          color: isSelected ? 'rgba(0,0,0,0.9)' : 'rgba(0,0,0,0.5)',
                        }}
                      >
                        {ind.label}
                      </span>
                      <span
                        className="tabular-nums flex-shrink-0"
                        style={{
                          fontSize: 'var(--text-card-micro)',
                          color: isSelected ? 'rgba(0,0,0,0.45)' : 'rgba(0,0,0,0.18)',
                        }}
                      >
                        {ind.count.toLocaleString()}
                      </span>
                    </div>

                    {/* Nested sub-industries */}
                    {isSelected && ind.subs && (
                      <div className="ml-7" style={{ borderLeftWidth: '1px', borderLeftStyle: 'solid', borderLeftColor: 'rgba(0,0,0,0.08)' }}>
                        {ind.subs.map((sub) => {
                          const isSubActive = selectedSubIndustries.includes(sub);
                          return (
                            <button
                              key={sub}
                              className="block w-full text-left px-3 py-1.5 transition-all duration-100 truncate cursor-pointer hover:bg-black/[0.02]"
                              title={sub}
                              style={{
                                fontSize: 'var(--text-xs)',
                                color: isSubActive ? 'rgba(0,0,0,0.9)' : 'rgba(0,0,0,0.4)',
                                backgroundColor: isSubActive ? 'rgba(0,0,0,0.05)' : 'rgba(0,0,0,0)',
                                borderLeftWidth: isSubActive ? '2px' : '2px',
                                borderLeftStyle: 'solid',
                                borderLeftColor: isSubActive ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0)',
                                marginLeft: '-1px',
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSubIndustry(sub);
                              }}
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

              {sidebarSearch && filteredSidebarIndustries.length === 0 && (
                <p className="py-2 px-3" style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.3)' }}>
                  No matching industries
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ── TAGS (checkbox, dependent on industry) ── */}
      <div style={{ borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: 'rgba(0,0,0,0.06)' }}>
        <FilterSectionHeader
          icon={<Tag size={12} style={{ color: 'rgba(0,0,0,0.45)' }} />}
          label="Tags"
          activeCount={selectedTags.length}
          isOpen={tagsOpen}
          onToggle={() => selectedIndustry && setTagsOpen(!tagsOpen)}
          active={selectedTags.length > 0}
          disabled={!selectedIndustry}
          trailing={!selectedIndustry ? <Lock size={12} style={{ color: 'rgba(0,0,0,0.2)' }} /> : undefined}
          showChevron={!!selectedIndustry}
        />
        {selectedIndustry && tagsOpen ? (
          <div className="pb-0 scrollbar-hide" style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {availableTags.map((tag) => (
              <FilterCheckboxItem
                key={tag}
                label={tag}
                checked={selectedTags.includes(tag)}
                onChange={() => toggleTag(tag)}
              />
            ))}
          </div>
        ) : !selectedIndustry ? (
          <div className="px-4 pb-2.5" style={{ marginTop: '-4px' }}>
            <p style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.3)', lineHeight: 1.4 }}>
              Select an industry first to filter by tags
            </p>
          </div>
        ) : null}
      </div>

      {/* ── REGIONS (checkbox) ── */}
      <div style={{ borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: 'rgba(0,0,0,0.06)' }}>
        <FilterSectionHeader
          icon={<MapPin size={12} style={{ color: 'rgba(0,0,0,0.45)' }} />}
          label="Regions"
          activeCount={selectedRegions.length}
          isOpen={regionsOpen}
          onToggle={() => setRegionsOpen(!regionsOpen)}
          active={selectedRegions.length > 0}
        />
        {regionsOpen && (
          <div className="pb-0 scrollbar-hide" style={{ maxHeight: '240px', overflowY: 'auto' }}>
            {FULL_REGIONS.map((reg) => (
              <FilterCheckboxItem
                key={reg.label}
                label={reg.label}
                count={reg.count}
                checked={selectedRegions.includes(reg.label)}
                onChange={() => toggleRegion(reg.label)}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── PUBLISH YEAR (checkbox) ── */}
      <div style={{ borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: 'rgba(0,0,0,0.06)' }}>
        <FilterSectionHeader
          icon={<Calendar size={12} style={{ color: 'rgba(0,0,0,0.45)' }} />}
          label="Publish Year"
          activeCount={selectedYears.length}
          isOpen={publishYearOpen}
          onToggle={() => setPublishYearOpen(!publishYearOpen)}
          active={selectedYears.length > 0}
        />
        {publishYearOpen && (
          <div className="pb-0">
            {PUBLISH_YEARS.map((year) => (
              <FilterCheckboxItem
                key={year}
                label={year}
                checked={selectedYears.includes(year)}
                showTooltip={false}
                onChange={() => toggleYear(year)}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}