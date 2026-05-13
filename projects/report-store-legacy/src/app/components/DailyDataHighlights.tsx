/**
 * DailyDataHighlights — Section Organism
 * Ken Bold DS v4.2
 *
 * WHAT:    5-column grid of daily data highlight cards with live pulse indicator
 * WHY:     Fresh daily intelligence creates return visits and urgency
 * WHERE:   Report Store home mode — after TrendingStatistics
 * WHEN:    Renders when viewMode === "home"
 * HOW:     Composes SectionHeading (with labelPulse) + DataHighlightCard molecules
 *
 * Data coupling: imports `dailyHighlights` from data.ts
 * Props: none (self-contained data display)
 */
import { dailyHighlights } from "./data";
import { SectionHeading } from "./SectionHeading";
import { DataHighlightCard } from "./molecules";

export function DailyDataHighlights() {
  return (
    <div>
      <SectionHeading
        label="Live Data"
        title="Daily Data Highlights"
        subtitle="Latest numbers from our intelligence desk"
        labelPulse={true}
      />
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {dailyHighlights.map((d, i) => (
          <DataHighlightCard
            key={i}
            value={d.value}
            title={d.title}
            source={d.source}
            growth={d.growth}
            time={d.time}
          />
        ))}
      </div>
    </div>
  );
}
