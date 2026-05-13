/**
 * IndustrySectorsGrid — Organism
 * Ken Bold DS v4.2
 *
 * Composes domain-agnostic atoms/molecules into an industry-specific layout:
 *   - IconBadge (atom) — icon container
 *   - CategoryListItem (atom) — row pattern
 *   - CategoryListCard (molecule) — card + list wrapper
 *   - SectionHeading (atom) — section header
 *
 * This organism is the ONLY place where industry-specific data
 * (data source, section title) is encoded.
 * Icon mapping is shared via industryIconMap.ts.
 * All visual patterns are reusable via the extracted components.
 */
import { industries } from "./data";
import { SectionHeading } from "./SectionHeading";
import { CategoryListCard } from "./molecules/CategoryListCard";
import type { CategoryListCardItem } from "./molecules/CategoryListCard";
import { industryIconMap } from "./industryIconMap";

interface IndustrySectorsGridProps {
  onIndustrySelect: (industry: string) => void;
}

/** Transform domain data into generic CategoryListCardItem[] */
function toListItems(slice: typeof industries): CategoryListCardItem[] {
  return slice.map((industry) => ({
    id: industry.name,
    label: industry.name,
    icon: industryIconMap[industry.name],
    iconFallback: industry.name[0],
    meta: industry.count,
    metaTooltip: `${industry.count} reports`,
  }));
}

export function IndustrySectorsGrid({
  onIndustrySelect,
}: IndustrySectorsGridProps) {
  // Split into two balanced columns
  const midpoint = Math.ceil(industries.length / 2);
  const leftItems = toListItems(industries.slice(0, midpoint));
  const rightItems = toListItems(industries.slice(midpoint));

  const handleItemClick = (item: CategoryListCardItem) => {
    onIndustrySelect(item.label);
  };

  return (
    <div>
      <SectionHeading
        label="Coverage"
        title="Industry Coverage"
        subtitle={`Explore ${industries.length} industry verticals`}
      />

      {/* Single column on mobile, two columns on sm+ */}
      <div className="grid sm:grid-cols-2 gap-0 sm:gap-5">
        <CategoryListCard
          items={leftItems}
          onItemClick={handleItemClick}
          dividerColor="var(--warm-500)"
        />
        <CategoryListCard
          items={rightItems}
          onItemClick={handleItemClick}
          dividerColor="var(--warm-500)"
          className="mt-3 sm:mt-0"
        />
      </div>
    </div>
  );
}
