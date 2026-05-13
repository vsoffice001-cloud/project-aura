/**
 * RecommendedForYou — Section Organism
 * Ken Bold DS v4.2
 *
 * WHAT:    Horizontal scrollable row of recommended report grid cards
 * WHY:     Personalized content discovery based on user's browsing history
 * WHERE:   Report Store home mode — after FeaturedResearch, before IndustrySectorsGrid
 * WHEN:    Renders when viewMode === "home"
 * HOW:     Composes SectionHeading + HorizontalScroll + ReportGridCard molecules
 *
 * Data coupling: imports `reports` from data.ts
 * Props: onViewReport callback
 */
import { reports } from "./data";
import { SectionHeading } from "./SectionHeading";
import { ReportGridCard, HorizontalScroll } from "./molecules";

export function RecommendedForYou({ onViewReport }: { onViewReport: (id: string) => void }) {
  const recommended = reports.slice(0, 8);

  return (
    <div>
      <SectionHeading label="Personalized" title="Recommended For You" subtitle="Based on your browsing history and interests" action={{ text: "View All" }} />
      <HorizontalScroll fadeBg="white">
        {recommended.map((r) => (
          <div key={r.id} className="flex-shrink-0 w-64">
            <ReportGridCard
              id={r.id}
              image={r.image}
              title={r.title}
              industry={r.industry}
              projection={r.projection}
              region={r.region}
              date={r.date}
              onClick={onViewReport}
              aspectRatio="16/9"
            />
          </div>
        ))}
      </HorizontalScroll>
    </div>
  );
}
