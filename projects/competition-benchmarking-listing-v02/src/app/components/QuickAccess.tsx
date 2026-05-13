/**
 * QuickAccess — Section Organism
 * Ken Bold DS v4.2
 *
 * WHAT:    Tabbed grid of reports with pagination and meta variant switcher (Metrics/Compact)
 * WHY:     Fast browsing across curated tabs — Trending, New, Most Downloaded, Recently Updated
 * WHERE:   Report Store home mode — after DailyDataHighlights
 * WHEN:    Renders when viewMode === "home"
 * HOW:     Composes SectionHeading + ScrollFade + ReportGridCard + tab bar + pagination
 *
 * Data coupling: imports `reports` from data.ts
 * Props: none (self-contained tabbed browser)
 */
import { TrendingUp, Calendar, Star } from "lucide-react";
import { useState } from "react";
import { reports } from "./data";
import { SectionHeading } from "./SectionHeading";
import { ReportGridCard, ScrollFade } from "./molecules";
import type { CardMetaVariant } from "./molecules/CardMetaRow";

const ITEMS_PER_PAGE = 8;

export function QuickAccess() {
  /* Tab definitions with filter logic */
  const tabs = [
    { label: "Trending Now", filter: () => [...reports].sort((a, b) => parseInt(b.downloads.replace(/,/g, '')) - parseInt(a.downloads.replace(/,/g, ''))), count: 48 },
    { label: "New This Week", filter: () => reports.filter(r => r.date.includes("2024") || r.date.includes("2026")).slice(0, 24), count: 24 },
    { label: "Most Downloaded", filter: () => [...reports].sort((a, b) => parseInt(b.downloads.replace(/,/g, '')) - parseInt(a.downloads.replace(/,/g, ''))), count: 156 },
    { label: "Recently Updated", filter: () => reports.filter(r => r.date.includes("Dec") || r.date.includes("Nov") || r.date.includes("Oct")), count: 89 },
  ];

  const [activeTab, setActiveTab] = useState(0);
  const [page, setPage] = useState(1);
  const [metaVariant, setMetaVariant] = useState<CardMetaVariant>("A");

  const filteredReports = tabs[activeTab].filter();
  const totalPages = Math.max(1, Math.ceil(filteredReports.length / ITEMS_PER_PAGE));
  const pagedReports = filteredReports.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  /* Reset to page 1 on tab switch */
  const handleTabChange = (idx: number) => {
    setActiveTab(idx);
    setPage(1);
  };

  /* Format date to short form like "Feb, 18 '26" */
  const fmtDate = (d: string) => {
    const parts = d.split(" ");
    if (parts.length === 2) return `${parts[0].slice(0, 3)}, ${Math.floor(Math.random() * 28 + 1).toString().padStart(2, '0')} '${parts[1].slice(2)}`;
    return d;
  };

  /* Determine if report is "new" — first item in each page gets the badge for demo */
  const isNew = (idx: number) => idx === 0 && page === 1;

  const metaVariantSwitcher = (
    <div
      className="flex items-center gap-0.5 p-0.5 flex-shrink-0"
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
  );

  return (
    <div>
      {/* Header */}
      <SectionHeading
        title="Quick Access"
        subtitle="Find reports faster"
        action={{ text: "View All" }}
        endSlot={metaVariantSwitcher}
      />

      {/* Tab bar */}
      <ScrollFade fadeBg="white" showButtons className="mb-8 -mt-6">
        <div className="flex items-center border-b w-full" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              className="relative flex items-center gap-2 px-4 py-2.5 whitespace-nowrap transition-all cursor-pointer"
              style={{
                fontSize: 'var(--text-nav)',
                color: activeTab === i ? '#000' : 'rgba(0,0,0,0.4)',
              }}
              onClick={() => handleTabChange(i)}
            >
              {tab.label}
              <span
                className="inline-flex items-center justify-center px-1.5 py-0.5 tabular-nums transition-all"
                style={{
                  fontSize: 'var(--badge-xs-font)',
                  borderRadius: '9999px',
                  background: activeTab === i ? 'rgba(0,0,0,0.08)' : 'rgba(0,0,0,0.04)',
                  color: activeTab === i ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.3)',
                  minWidth: '20px',
                }}
              >
                {tab.count}
              </span>
              {/* Active underline indicator */}
              {activeTab === i && (
                <span
                  className="absolute bottom-0 left-4 right-4 h-[2px] bg-black"
                  style={{ borderRadius: '1px 1px 0 0' }}
                />
              )}
            </button>
          ))}
        </div>
      </ScrollFade>

      {/* Card grid — 2 col mobile → 2 cols sm → 3 cols lg */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
        {pagedReports.map((r, i) => (
          <ReportGridCard
            key={r.id}
            id={r.id}
            image={r.image}
            title={r.title}
            industry={r.industry}
            projection={r.projection}
            region={r.region}
            date={fmtDate(r.date)}
            metaVariant={metaVariant}
            aspectRatio="16/9"
            overlayBadge={isNew(i) ? (
              <div
                className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 text-white"
                style={{ fontSize: 'var(--badge-xs-font)', borderRadius: '9999px', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
              >
                <Star className="h-3 w-3 fill-current" />
                NEW
              </div>
            ) : undefined}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1.5 mt-10">
          <button
            className="px-3.5 py-2.5 sm:py-1.5 transition-all cursor-pointer"
            style={{
              fontSize: 'var(--text-nav)',
              color: page > 1 ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.2)',
              pointerEvents: page > 1 ? 'auto' : 'none',
            }}
            onClick={() => setPage(p => Math.max(1, p - 1))}
          >
            Previous
          </button>
          {Array.from({ length: Math.min(totalPages, 4) }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              className="min-w-[36px] min-h-[36px] sm:w-8 sm:h-8 flex items-center justify-center tabular-nums transition-all cursor-pointer"
              style={{
                fontSize: 'var(--text-nav)',
                borderRadius: 'var(--radius-element)',
                background: page === p ? '#000' : 'transparent',
                color: page === p ? '#fff' : 'rgba(0,0,0,0.5)',
              }}
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          ))}
          <button
            className="px-3.5 py-2.5 sm:py-1.5 transition-all cursor-pointer"
            style={{
              fontSize: 'var(--text-nav)',
              color: page < totalPages ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.2)',
              pointerEvents: page < totalPages ? 'auto' : 'none',
            }}
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
