import { useState, useMemo } from "react";
import { FileText, TrendingUp, LayoutList, LayoutGrid, Calendar } from "lucide-react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { reports, industries } from "./data";
import { CTALink } from "./CTALink";
import { SectionHeading } from "./SectionHeading";
import { Button } from "./Button";
import { iconColors } from "./iconColors";
import { ReportCard } from "./ReportCard";
import { ReportGridCard, ScrollFade } from "./molecules";
import type { CardMetaVariant } from "./molecules/CardMetaRow";

interface IndustryReportSectionProps {
  onIndustrySelect: (industry: string) => void;
  onViewReport: (id: string) => void;
}

export function IndustryReportSection({
  onIndustrySelect,
  onViewReport,
}: IndustryReportSectionProps) {
  const [selectedIndustry, setSelectedIndustry] = useState("Healthcare");
  const [selectedSubcat, setSelectedSubcat] = useState("All");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [metaVariant, setMetaVariant] = useState<CardMetaVariant>("A");

  const industryTabs = industries.map((ind) => ({
    name: ind.name,
    count: ind.count,
    subcategories: ind.subcategories,
  }));

  const currentIndustry = industryTabs.find(
    (t) => t.name === selectedIndustry
  );
  const subcats = currentIndustry?.subcategories || [];

  const subcatCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    subcats.forEach((s) => {
      counts[s] = reports.filter(
        (r) => r.industry === selectedIndustry && r.subcat === s
      ).length;
    });
    return counts;
  }, [selectedIndustry, subcats]);

  const industryReports = useMemo(
    () => reports.filter((r) => r.industry === selectedIndustry),
    [selectedIndustry]
  );

  const filteredReports = useMemo(() => {
    if (selectedSubcat === "All") return industryReports;
    return industryReports.filter((r) => r.subcat === selectedSubcat);
  }, [industryReports, selectedSubcat]);

  return (
    <div>
      {/* Section Header */}
      <SectionHeading
        label="Industry Reports"
        title="Discover by Industry"
        subtitle="Explore comprehensive insights across 14 industries, each providing strategic analysis of market trends and opportunities."
        maxWidth="xl"
      />

      {/* Industry Tabs */}
      <ScrollFade fadeBg="white" showButtons className="pb-1 mb-5">
        <div className="flex gap-1.5 min-w-max">
          {industryTabs.map((tab) => (
            <button
              key={tab.name}
              className={`px-3.5 py-2.5 sm:py-1.5 transition-all whitespace-nowrap border ${
                selectedIndustry === tab.name
                  ? "bg-black text-white border-black"
                  : "bg-transparent text-black/50 hover:text-black hover:border-black/30"
              }`}
              style={{
                fontSize: "var(--text-nav)",
                borderRadius: "var(--radius-element)",
                borderColor:
                  selectedIndustry === tab.name
                    ? undefined
                    : "var(--warm-500)",
              }}
              onClick={() => {
                setSelectedIndustry(tab.name);
                setSelectedSubcat("All");
              }}
            >
              {tab.name}
              <span
                className="ml-1.5 opacity-60"
                style={{ fontSize: "var(--text-xs)" }}
              >
                ({tab.count})
              </span>
            </button>
          ))}
        </div>
      </ScrollFade>

      {/* Subcategory pills + count */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <ScrollFade fadeBg="white" className="flex-1 min-w-0" innerClassName="pb-0.5">
          <div className="flex gap-1.5 min-w-max">
            <button
              className={`px-2.5 py-2 sm:py-1 transition-all border ${
                selectedSubcat === "All"
                  ? "bg-black text-white border-black"
                  : "bg-transparent text-black/45 hover:text-black hover:border-black/30"
              }`}
              style={{
                fontSize: "var(--text-2xs)",
                borderRadius: "var(--radius-element)",
                borderColor:
                  selectedSubcat === "All" ? undefined : "var(--warm-500)",
              }}
              onClick={() => setSelectedSubcat("All")}
            >
              All ({industryReports.length})
            </button>
            {subcats.map((s) => (
              <button
                key={s}
                className={`px-2.5 py-2 sm:py-1 transition-all border ${
                  selectedSubcat === s
                    ? "bg-black text-white border-black"
                    : "bg-transparent text-black/45 hover:text-black hover:border-black/30"
                }`}
                style={{
                  fontSize: "var(--text-2xs)",
                  borderRadius: "var(--radius-element)",
                  borderColor:
                    selectedSubcat === s ? undefined : "var(--warm-500)",
                }}
                onClick={() => setSelectedSubcat(s)}
              >
                {s}
                {subcatCounts[s] > 0 ? ` (${subcatCounts[s]})` : ""}
              </button>
            ))}
          </div>
        </ScrollFade>

        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Meta variant switcher */}
          <div
            className="hidden sm:flex items-center gap-0.5 p-0.5"
            style={{
              border: "1px solid var(--warm-500)",
              borderRadius: "var(--radius-element)",
              background: "var(--warm-300)",
            }}
          >
            <button
              className={`inline-flex items-center justify-center gap-1 h-7 px-2 transition-all cursor-pointer whitespace-nowrap ${
                metaVariant === "A"
                  ? "bg-white text-black shadow-sm"
                  : "text-black/35 hover:text-black/60"
              }`}
              style={{ borderRadius: "var(--radius-inner)", fontSize: "var(--text-2xs)" }}
              onClick={() => setMetaVariant("A")}
              title="Projection + Region"
            >
              <TrendingUp className="h-3 w-3" />
              Metrics
            </button>
            <button
              className={`inline-flex items-center justify-center gap-1 h-7 px-2 transition-all cursor-pointer whitespace-nowrap ${
                metaVariant === "B"
                  ? "bg-white text-black shadow-sm"
                  : "text-black/35 hover:text-black/60"
              }`}
              style={{ borderRadius: "var(--radius-inner)", fontSize: "var(--text-2xs)" }}
              onClick={() => setMetaVariant("B")}
              title="Region + Date"
            >
              <Calendar className="h-3 w-3" />
              Compact
            </button>
          </div>

          {/* View mode toggle */}
          <div
            className="hidden sm:flex items-center gap-0.5 p-0.5"
            style={{
              border: "1px solid var(--warm-500)",
              borderRadius: "var(--radius-element)",
              background: "var(--warm-300)",
            }}
          >
            <button
              className={`inline-flex items-center justify-center w-7 h-7 transition-all ${
                viewMode === "list"
                  ? "bg-white text-black shadow-sm"
                  : "text-black/35 hover:text-black/60"
              }`}
              style={{ borderRadius: "var(--radius-inner)" }}
              onClick={() => setViewMode("list")}
              title="List view"
            >
              <LayoutList className="h-3.5 w-3.5" />
            </button>
            <button
              className={`inline-flex items-center justify-center w-7 h-7 transition-all ${
                viewMode === "grid"
                  ? "bg-white text-black shadow-sm"
                  : "text-black/35 hover:text-black/60"
              }`}
              style={{ borderRadius: "var(--radius-inner)" }}
              onClick={() => setViewMode("grid")}
              title="Grid view"
            >
              <LayoutGrid className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* ... remove report count text ... */}
        </div>
      </div>

      {/* Report listing / grid */}
      {filteredReports.length > 0 ? (
        viewMode === "list" ? (
          <div className="flex flex-col gap-4">
            {filteredReports.map((report) => (
              <ReportCard
                key={report.id}
                variant="list"
                report={report}
                onView={() => onViewReport(report.id)}
                showSave={false}
                showProjection
                showMeta
                showViewButton
                metaVariant={metaVariant}
              />
            ))}
          </div>
        ) : (
          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 640: 2, 1024: 3 }}>
            <Masonry gutter="16px">
              {filteredReports.map((report) => (
                <ReportGridCard
                  key={report.id}
                  id={report.id}
                  image={report.image}
                  title={report.title}
                  industry={report.subcat || report.industry}
                  projection={report.projection}
                  region={report.region}
                  date={report.date}
                  onClick={onViewReport}
                  metaVariant={metaVariant}
                />
              ))}
            </Masonry>
          </ResponsiveMasonry>
        )
      ) : (
        <div
          className="text-center py-16 border border-dashed"
          style={{
            borderColor: "var(--warm-500)",
            borderRadius: "var(--rc-radius-card)",
            background: "var(--warm-300)",
          }}
        >
          <div
            className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center"
            style={{ background: "var(--warm-500)" }}
          >
            <FileText className="h-5 w-5" color={iconColors.utility} />
          </div>
          <p
            className="text-black/50 mb-1"
            style={{ fontSize: "var(--text-nav)" }}
          >
            No reports available yet
          </p>
          <p
            className="text-black/40"
            style={{ fontSize: "var(--text-xs)" }}
          >
            Reports for {selectedIndustry} are coming soon
          </p>
        </div>
      )}

      {/* View All CTA */}
      <div className="text-center mt-10">
        <CTALink
          size="md"
          onClick={() => onIndustrySelect(selectedIndustry)}
        >
          Explore all {selectedIndustry} reports
        </CTALink>
      </div>
    </div>
  );
}