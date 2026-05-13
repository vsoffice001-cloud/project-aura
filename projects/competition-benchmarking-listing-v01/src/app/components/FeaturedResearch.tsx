import { reports } from "./data";
import { SectionHeading } from "./SectionHeading";
import { ReportCard } from "./ReportCard";

interface FeaturedResearchProps {
  onViewReport: (id: string) => void;
}

export function FeaturedResearch({ onViewReport }: FeaturedResearchProps) {
  const featuredReports = reports.slice(0, 5);
  const heroReport = featuredReports[0];
  const sideReports = featuredReports.slice(1);

  return (
    <div>
      <SectionHeading
        label="Featured"
        title="Featured Research"
        subtitle="Editor's choice — handpicked by our research team"
        action={{ text: "View All Reports" }}
        spacing="compact"
      />

      {/* Featured hero card — full width */}
      <div className="mb-5">
        <ReportCard
          variant="featured"
          report={heroReport}
          onView={() => onViewReport(heroReport.id)}
          className="min-h-[280px] sm:min-h-[320px] md:min-h-[360px]"
        />
      </div>

      {/* Remaining cards — stacked list format */}
      <div className="flex flex-col gap-5">
        {sideReports.map((report) => (
          <ReportCard
            key={report.id}
            variant="list"
            report={report}
            onView={() => onViewReport(report.id)}
            showSave={false}
          />
        ))}
      </div>
    </div>
  );
}