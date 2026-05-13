/**
 * UpcomingReports — Section Organism
 * Ken Bold DS v4.2
 *
 * WHAT:    Stacked list of upcoming report entries with "Notify Me" CTA
 * WHY:     Pre-registration funnel — captures intent before reports publish
 * WHERE:   Report Store home mode — after Testimonials
 * WHEN:    Renders when viewMode === "home"
 * HOW:     Composes SectionHeading + Card + IconBadge + IndustryBadge + Button
 *
 * Data coupling: imports `upcomingReports` from data.ts
 * Props: none (self-contained)
 */
import { Calendar, Bell, MapPin } from "lucide-react";
import { IndustryBadge } from "./molecules";
import { upcomingReports } from "./data";
import { iconColors } from "./iconColors";
import { Button } from "./Button";
import { SectionHeading } from "./SectionHeading";
import { Card } from "./Card";
import { IconBadge } from "./IconBadge";

export function UpcomingReports() {
  return (
    <div>
      <SectionHeading
        title="Upcoming Reports"
        subtitle="Pre-register for early access and priority notifications"
        action={{ text: "View All Upcoming" }}
      />

      <Card className="overflow-hidden">
        {upcomingReports.map((r, i) => (
          <div
            key={i}
            className="group transition-colors hover:bg-black/[0.015]"
            style={{ borderBottom: i < upcomingReports.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none' }}
          >
            <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5">
              <IconBadge
                icon={Calendar}
                tint="var(--warm-300)"
                iconColor={iconColors.utility}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-black/80 group-hover:text-black transition-colors leading-snug" style={{ fontSize: 'var(--text-nav)' }}>
                      {r.title}
                    </h4>
                  </div>
                  <div className="hidden sm:block flex-shrink-0">
                    <Button variant="secondary" size="sm" icon={<Bell />} iconPosition="left">
                      Notify Me
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 mt-2 flex-wrap" style={{ fontSize: 'var(--text-xs)' }}>
                  <IndustryBadge>{r.industry}</IndustryBadge>
                  <span className="text-black/40 flex items-center gap-1">
                    <MapPin className="h-3 w-3" color={iconColors.utility} />{r.region}
                  </span>
                  <span className="hidden sm:inline text-black/15">|</span>
                  <span className="text-black/50" style={{ fontSize: 'var(--text-xs)' }}>{r.expected.replace(/\s\d{1,2},/, '')}</span>
                </div>
                {/* Mobile: Notify Me button below meta */}
                <div className="flex sm:hidden mt-2.5">
                  <Button variant="secondary" size="xs" icon={<Bell />} iconPosition="left">
                    Notify Me
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
