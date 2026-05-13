/**
 * RecommendedForYou — Organism (DS v4.3)
 *
 * WHAT: Recommended reports browse grid for the Report Store home page.
 * WHY:  Wraps BrowseGrid with RS-specific content and data.
 * WHEN: Section 4 of ReportStorePage (Home mode).
 * HOW:  Renders BrowseGrid with RECOMMENDED_REPORTS from data.ts.
 */
import { useState } from 'react';
import { BrowseGrid } from '@/app/components/organisms/BrowseGrid';
import { ReportCard } from '@/app/components/molecules/ReportCard';
import type { ViewMode } from '@/app/components/ViewToggle';
import { RECOMMENDED_REPORTS } from '@/app/components/data';

export function RecommendedForYou() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [loading, setLoading] = useState(false);

  const simulateLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 800);
  };

  return (
    <BrowseGrid
      label="Recommended"
      title="Reports for You"
      subtitle="Personalized recommendations based on your industry interests"
      items={RECOMMENDED_REPORTS}
      viewMode={viewMode}
      onViewModeChange={(m) => { setViewMode(m); simulateLoading(); }}
      loading={loading}
      renderCard={(r, vm) => <ReportCard key={r.id} {...r} layout={vm} />}
    />
  );
}
