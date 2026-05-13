import { useState } from "react";
import { Search, ChevronDown, ChevronUp, SlidersHorizontal } from "lucide-react";
import { iconColors } from "./iconColors";
import { Button } from "./Button";
import { Card } from "./Card";

interface FiltersPanelProps {
  selectedIndustries: string[];
  onIndustriesChange: (industries: string[]) => void;
  selectedGeographies: string[];
  onGeographiesChange: (geos: string[]) => void;
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  selectedYears: string[];
  onYearsChange: (years: string[]) => void;
}

const industryFilters = [
  { name: "Healthcare", count: 1970 },
  { name: "Technology & Telecom", count: 1270 },
  { name: "Banking & Financial Services", count: 1090 },
  { name: "Energy & Utilities", count: 1090 },
  { name: "Consumer & Retail", count: 870 },
];

const geographyFilters = [
  { name: "Global", count: 4195 },
  { name: "India", count: 1830 },
  { name: "United States", count: 855 },
  { name: "GCC", count: 547 },
  { name: "UAE", count: 342 },
];

const tagFilters = [
  { name: "AI & Machine Learning", count: 417 },
  { name: "Electric Vehicles", count: 187 },
  { name: "Digital Health", count: 187 },
  { name: "Fintech", count: 187 },
];

const yearFilters = [
  { name: "2024", count: 3420 },
  { name: "2023", count: 2890 },
  { name: "2022", count: 1540 },
  { name: "2021", count: 890 },
];

function CheckboxFilterSection({
  title,
  items,
  selected,
  onChange,
  searchable = false,
  defaultCollapsed = false,
}: {
  title: string;
  items: { name: string; count: number }[];
  selected: string[];
  onChange: (selected: string[]) => void;
  searchable?: boolean;
  defaultCollapsed?: boolean;
}) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = searchable && searchTerm
    ? items.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : items;

  const toggleItem = (name: string) => {
    if (selected.includes(name)) {
      onChange(selected.filter((s) => s !== name));
    } else {
      onChange([...selected, name]);
    }
  };

  return (
    <div className="pb-4 mb-4 last:mb-0 last:pb-0" style={{ borderBottom: '1px solid var(--warm-500)' }}>
      <button
        className="flex items-center justify-between w-full text-left mb-3 group"
        onClick={() => setCollapsed(!collapsed)}
      >
        <h4 className="tracking-wide uppercase" style={{ fontSize: 'var(--text-xs)', color: 'var(--black-600, #525252)', fontWeight: 'var(--font-weight-heading)' }}>{title}</h4>
        {collapsed ? (
          <ChevronDown className="h-3.5 w-3.5 transition-colors" color={iconColors.utility} />
        ) : (
          <ChevronUp className="h-3.5 w-3.5 transition-colors" color={iconColors.utility} />
        )}
      </button>

      {!collapsed && (
        <>
          {searchable && (
            <div className="relative mb-3">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3" color={iconColors.utility} />
              <input
                type="text"
                placeholder={`Search ${title.toLowerCase()}...`}
                className="w-full pl-7 pr-3 py-1.5 outline-none transition-all"
                style={{ fontSize: 'var(--text-xs)', background: 'var(--warm-300)', border: '1px solid var(--warm-500)', borderRadius: 'var(--radius-element)' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}
          <div className="space-y-0.5">
            {filteredItems.map((item) => (
              <label
                key={item.name}
                className="flex items-center gap-2.5 cursor-pointer group py-1.5 px-1 transition-colors hover:bg-black/[0.03]"
                style={{ borderRadius: 'var(--radius-element)' }}
                onClick={() => toggleItem(item.name)}
              >
                <div
                  className="w-3.5 h-3.5 flex items-center justify-center flex-shrink-0 transition-all"
                  style={{
                    borderRadius: 'var(--radius-inner)',
                    border: `1px solid ${selected.includes(item.name) ? 'var(--text-primary)' : 'var(--warm-700)'}`,
                    background: selected.includes(item.name) ? 'var(--text-primary)' : 'transparent',
                  }}
                >
                  {selected.includes(item.name) && (
                    <svg
                      className="h-2.5 w-2.5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
                <span className="flex-1 truncate transition-colors text-black/60 group-hover:text-black/80" style={{ fontSize: 'var(--text-xs)' }}>
                  {item.name}
                </span>
                <span className="text-black/40 tabular-nums" style={{ fontSize: 'var(--text-xs)' }}>
                  {item.count.toLocaleString()}
                </span>
              </label>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function FiltersPanel({
  selectedIndustries,
  onIndustriesChange,
  selectedGeographies,
  onGeographiesChange,
  selectedTags,
  onTagsChange,
  selectedYears,
  onYearsChange,
}: FiltersPanelProps) {
  return (
    <aside className="w-56 flex-shrink-0 hidden xl:block">
      <div className="sticky top-20">
        <Card className="overflow-hidden">
          <div className="p-3.5 flex items-center gap-2" style={{ borderBottom: '1px solid rgba(0,0,0,0.06)', background: 'var(--black-50)' }}>
            <div className="w-6 h-6 bg-white flex items-center justify-center" style={{ borderRadius: 'var(--radius-element)', border: '1px solid var(--warm-500)' }}>
              <SlidersHorizontal className="h-3 w-3" color={iconColors.utility} />
            </div>
            <h3 className="tracking-wide uppercase" style={{ fontSize: 'var(--text-xs)', color: 'var(--text-primary)', fontWeight: 'var(--font-weight-heading)' }}>Refine Results</h3>
          </div>

          <div className="p-4">
            <CheckboxFilterSection
              title="Industry"
              items={industryFilters}
              selected={selectedIndustries}
              onChange={onIndustriesChange}
            />
            <CheckboxFilterSection
              title="Geography"
              items={geographyFilters}
              selected={selectedGeographies}
              onChange={onGeographiesChange}
            />
            <CheckboxFilterSection
              title="Tags"
              items={tagFilters}
              selected={selectedTags}
              onChange={onTagsChange}
              searchable
            />
            <CheckboxFilterSection
              title="Publish Year"
              items={yearFilters}
              selected={selectedYears}
              onChange={onYearsChange}
              defaultCollapsed
            />
          </div>
        </Card>

        {/* Request Custom Research */}
        <div className="mt-4 bg-black p-4 text-center" style={{ borderRadius: 'var(--rc-radius-card)' }}>
          <p className="text-white/40 mb-3" style={{ fontSize: 'var(--text-xs)' }}>
            Can&apos;t find what you need?
          </p>
          <Button variant="brand" size="sm" fullWidth>
            Request Custom Research
          </Button>
        </div>
      </div>
    </aside>
  );
}