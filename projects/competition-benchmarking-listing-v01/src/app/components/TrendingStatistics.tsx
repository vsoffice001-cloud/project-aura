/**
 * TrendingStatistics — Section Organism
 * Ken Bold DS v4.2
 *
 * WHAT:    4-column grid of key market indicator stat cards
 * WHY:     Real-time market intelligence dashboard — builds trust with live data
 * WHERE:   Report Store home mode — after AnalystPicks
 * WHEN:    Renders when viewMode === "home"
 * HOW:     Composes SectionHeading + StatCard molecules in a responsive grid
 *
 * Data coupling: imports `stats` from data.ts
 * Props: none (self-contained data display)
 */
import { stats } from "./data";
import { SectionHeading } from "./SectionHeading";
import { StatCard } from "./molecules";

export function TrendingStatistics() {
  return (
    <div>
      <SectionHeading label="Market Intelligence" title="Key Market Indicators" subtitle="Real-time metrics from our research database" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <StatCard
            key={i}
            category={s.category}
            value={s.value}
            label={s.label}
            description={s.description}
            growth={s.growth}
            metric={s.metric}
          />
        ))}
      </div>
    </div>
  );
}
