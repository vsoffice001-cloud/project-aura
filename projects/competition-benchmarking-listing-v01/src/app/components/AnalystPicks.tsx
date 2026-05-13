/**
 * AnalystPicks — Section Organism
 * Ken Bold DS v4.2
 *
 * WHAT:    Horizontal scrollable row of analyst-curated report cards with quotes
 * WHY:     Expert social proof — shows analyst endorsement alongside report data
 * WHERE:   Report Store home mode — after IndustrySectorsGrid
 * WHEN:    Renders when viewMode === "home"
 * HOW:     Composes SectionHeading + HorizontalScroll + AnalystPickCardB molecules
 *
 * Data coupling: imports `analystPicks` from data.ts
 * Props: onViewReport callback
 */
import { useState } from "react";
import { analystPicks } from "./data";
import { SectionHeading } from "./SectionHeading";
import { AnalystPickCardB, HorizontalScroll } from "./molecules";

export function AnalystPicks({ onViewReport }: { onViewReport: (id: string) => void }) {
  const [savedPicks, setSavedPicks] = useState<Set<string>>(new Set());

  const toggleSave = (id: string) => {
    setSavedPicks((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div>
      <SectionHeading
        label="Expert Curated"
        title="Analyst Picks"
        subtitle="Hand-picked by our senior research analysts"
        action={{ text: "View All Picks" }}
      />

      <HorizontalScroll fadeBg="var(--warm-200)">
        {analystPicks.map((pick, i) => (
          <div key={i} className="flex-shrink-0 self-stretch w-[280px] sm:w-[320px]">
            <AnalystPickCardB
              id={pick.report.id}
              image={pick.report.image}
              title={pick.report.title}
              industry={pick.report.industry}
              region={pick.report.region}
              date={pick.report.date}
              quote={pick.quote}
              analystName={pick.analyst.name}
              analystRole={pick.analyst.role}
              analystInitials={pick.analyst.initials}
              saved={savedPicks.has(pick.report.id)}
              onToggleSave={() => toggleSave(pick.report.id)}
              onClick={onViewReport}
            />
          </div>
        ))}
      </HorizontalScroll>
    </div>
  );
}
