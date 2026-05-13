/**
 * ExploreByRegion — Section Organism
 * Ken Bold DS v4.2
 *
 * WHAT:    Horizontal scrollable row of region cards with country tags, trending badges, top reports
 * WHY:     Geographic discovery — lets users explore market intelligence by economic zone
 * WHERE:   Report Store home mode — after TrendingTopics
 * WHEN:    Renders when viewMode === "home"
 * HOW:     Composes SectionHeading + HorizontalScroll + Card + IconBadge + Badge + Button
 *
 * Data coupling: imports `regions, reports` from data.ts
 * Props: onRegionClick callback
 */
import { Globe, MapPin, Flame } from "lucide-react";
import { regions, reports } from "./data";
import { iconColors } from "./iconColors";
import { SectionHeading } from "./SectionHeading";
import { Button } from "./Button";
import { Badge } from "./Badge";
import { HorizontalScroll } from "./molecules";
import { Card } from "./Card";
import { IconBadge } from "./IconBadge";

export function ExploreByRegion({ onRegionClick }: { onRegionClick: (region: string) => void }) {
  /* Map region names → matching reports from the master list */
  const regionKeywords: Record<string, string[]> = {
    "GCC & Middle East": ["GCC", "Saudi Arabia", "Middle East", "UAE", "Qatar", "Kuwait"],
    "India & South Asia": ["India", "Bangladesh", "Sri Lanka"],
    "Southeast Asia": ["Southeast Asia", "Singapore", "Indonesia", "Malaysia", "Thailand"],
    "Europe": ["Europe", "UK", "Germany", "France", "Netherlands"],
    "Americas": ["Americas", "USA", "Canada", "Brazil", "Mexico"],
    "Africa": ["Africa", "Nigeria", "South Africa", "Kenya", "Egypt"],
  };

  const getTopReports = (regionName: string, max: number = 3) => {
    const keywords = regionKeywords[regionName] || [];
    const matched = reports.filter(r => keywords.some(k => r.region.toLowerCase().includes(k.toLowerCase())));
    const pool = matched.length >= 2 ? matched : [...matched, ...reports.filter(r => r.region === "Global")];
    return pool
      .sort((a, b) => parseInt(b.downloads.replace(/,/g, '')) - parseInt(a.downloads.replace(/,/g, '')))
      .slice(0, max);
  };

  return (
    <div>
      <SectionHeading
        label="Geographic Coverage"
        title="Explore by Region"
        subtitle="Market intelligence across every major economic zone"
        action={{ text: "Explore All Regions" }}
      />
      <HorizontalScroll fadeBg="white">
        {regions.map((r, i) => {
          const topReports = getTopReports(r.name);
          return (
            <Card
              key={i}
              hover
              className="group flex-shrink-0 w-[280px] sm:w-80 overflow-hidden flex flex-col"
            >
              {/* Card header — uses IconBadge atom */}
              <div className="p-5 pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <IconBadge
                      icon={Globe}
                      size="lg"
                      tint="rgba(128, 108, 224, 0.05)"
                      iconColor={iconColors.content}
                    />
                    <div>
                      <h3
                        className="text-black/85 leading-tight"
                        style={{ fontSize: 'var(--text-nav)' }}
                      >
                        {r.name}
                      </h3>
                      <span className="text-black/40 tabular-nums" style={{ fontSize: 'var(--text-2xs)' }}>
                        {r.reports} reports
                      </span>
                    </div>
                  </div>
                </div>

                {/* Clickable country tags */}
                <div className="flex flex-wrap gap-1.5 mb-2.5">
                  {r.countries.map((c, j) => (
                    <Badge
                      key={j}
                      variant="rounded"
                      size="xs"
                      theme="warm"
                      mode="light"
                      bordered
                      interactive
                      uppercase={false}
                      onClick={() => onRegionClick(c)}
                    >
                      <MapPin className="h-2.5 w-2.5 flex-shrink-0" color={iconColors.utility} />
                      {c}
                    </Badge>
                  ))}
                </div>

                {/* Clickable trending tags */}
                <div className="flex flex-wrap gap-1.5">
                  {r.trending.map((tr, j) => (
                    <Badge
                      key={j}
                      variant="rounded"
                      size="xs"
                      theme="coral"
                      mode="light"
                      bordered
                      interactive
                      shimmer
                      uppercase={false}
                      onClick={() => onRegionClick(tr)}
                    >
                      <Flame className="h-2.5 w-2.5 flex-shrink-0" color="var(--coral-900)" />
                      {tr}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="mx-4" style={{ height: '1px', background: 'var(--warm-500)' }} />

              {/* Top reports listing */}
              <div className="p-4 pt-3 flex-1 flex flex-col">
                <p className="text-black/30 mb-2 tracking-wide uppercase" style={{ fontSize: 'var(--text-2xs)', letterSpacing: '1px' }}>
                  Top Reports
                </p>
                <div className="flex flex-col gap-2">
                  {topReports.map((rpt, j) => (
                    <div
                      key={rpt.id}
                      className="flex items-start gap-2 cursor-pointer group/report transition-colors hover:bg-black/[0.03] -mx-1.5 px-1.5 py-1.5"
                      style={{ borderRadius: 'var(--radius-element)' }}
                    >
                      <span
                        className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-black/25 tabular-nums"
                        style={{ fontSize: 'var(--badge-xs-font)' }}
                      >
                        {j + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-black/65 group-hover/report:text-black/85 transition-colors leading-snug line-clamp-2"
                          style={{ fontSize: 'var(--text-2xs)' }}
                        >
                          {rpt.title}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5" style={{ fontSize: 'var(--text-2xs)' }}>
                          <span className="text-black/35">{rpt.industry}</span>
                          <span className="text-black/15">&middot;</span>
                          <span className="text-black/35">{rpt.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card footer CTA */}
              <div className="px-4 pb-4 pt-2 mt-auto">
                <Button
                  variant="secondary"
                  size="xs"
                  fullWidth
                  showArrow
                  onClick={() => onRegionClick(r.name)}
                >
                  Explore {r.name}
                </Button>
              </div>
            </Card>
          );
        })}
      </HorizontalScroll>
    </div>
  );
}
