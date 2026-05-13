/**
 * TrendingTopics — Section Organism
 * Ken Bold DS v4.2
 *
 * WHAT:    5-column grid of trending research topic cards with growth indicators
 * WHY:     Surfaces emerging research areas — creates discovery and FOMO
 * WHERE:   Report Store home mode — after QuickAccess
 * WHEN:    Renders when viewMode === "home"
 * HOW:     Composes SectionHeading + Card + growth badge + report count
 *
 * Data coupling: imports `trendingTopics` from data.ts
 * Props: onTopicClick callback
 */
import { Flame, ArrowRight } from "lucide-react";
import { trendingTopics } from "./data";
import { iconColors } from "./iconColors";
import { SectionHeading } from "./SectionHeading";
import { Card } from "./Card";

export function TrendingTopics({ onTopicClick }: { onTopicClick: (topic: string) => void }) {
  return (
    <div>
      <SectionHeading label="What's Hot" title="Trending Topics" subtitle="Research areas gaining the most traction this quarter" action={{ text: "View All Topics" }} />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {trendingTopics.map((t, i) => (
          <Card
            key={i}
            hover
            padding="sm"
            className="group cursor-pointer"
            onClick={() => onTopicClick(t.name)}
          >
            <div className="flex items-center gap-1.5 mb-2.5">
              <Flame className="h-3.5 w-3.5 flex-shrink-0" color="var(--green-600)" />
              <span className="flex items-center gap-1 text-green-600 tabular-nums" style={{ fontSize: 'var(--text-xs)' }}>
                {t.growth}
              </span>
            </div>
            <h4 className="text-black/80 group-hover:text-black transition-colors mb-3 line-clamp-2" style={{ fontSize: 'var(--text-nav)' }}>
              {t.name}
            </h4>
            <div className="flex items-center justify-between mt-auto pt-2" style={{ borderTop: '1px solid var(--warm-500)' }}>
              <span className="text-black/35 tabular-nums" style={{ fontSize: 'var(--text-xs)' }}>
                {t.reports} reports
              </span>
              <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" color={iconColors.utility} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
