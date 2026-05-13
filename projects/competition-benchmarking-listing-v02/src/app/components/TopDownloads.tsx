/**
 * TopDownloads — Section Organism
 * Ken Bold DS v4.2
 *
 * WHAT:    Horizontal scrollable row of most-downloaded reports with rank badges
 * WHY:     Social proof through popularity — "what others are reading"
 * WHERE:   Report Store home mode (optional section)
 * WHEN:    Renders when viewMode === "home"
 * HOW:     Composes SectionHeading + HorizontalScroll + ReportGridCard with rank overlay
 *
 * Data coupling: imports `reports` from data.ts
 * Props: onViewReport callback
 */
import { reports } from "./data";
import { SectionHeading } from "./SectionHeading";
import { ReportGridCard, HorizontalScroll } from "./molecules";

export function TopDownloads({ onViewReport }: { onViewReport: (id: string) => void }) {
  const sorted = [...reports].sort((a, b) => parseInt(b.downloads.replace(",", "")) - parseInt(a.downloads.replace(",", ""))).slice(0, 8);
  return (
    <div>
      <SectionHeading
        label="Most Popular"
        title="Top Downloads"
        subtitle="Reports generating the most interest from enterprise clients"
        action={{ text: "View All" }}
      />
      <HorizontalScroll fadeBg="var(--warm-200)">
        {sorted.map((r, i) => (
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
              overlayBadge={
                <div className="absolute top-2.5 left-2.5 w-6 h-6 flex items-center justify-center text-white tabular-nums" style={{ fontSize: 'var(--text-2xs)', borderRadius: 'var(--radius-element)', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}>
                  {i + 1}
                </div>
              }
            />
          </div>
        ))}
      </HorizontalScroll>
    </div>
  );
}
