/**
 * KeyMarketIndicators — Organism (DS v4.3)
 *
 * WHAT: Report Store–specific wrapper around StatsRow with RS data.
 * WHY:  Encapsulates the Section 3 stat card configuration so the
 *       template doesn't inline props.
 * WHEN: Section 3 of ReportStorePage (Home mode).
 * HOW:  Thin wrapper around StatsRow with STAT_DATA from data.ts.
 */
import { StatsRow } from '@/app/components/organisms/StatsRow';
import { STAT_DATA } from '@/app/components/data';

export function KeyMarketIndicators() {
  return (
    <StatsRow
      label="Market Intelligence"
      title="Key Indicators"
      subtitle="Real-time market sizing and growth metrics from our research coverage"
      stats={STAT_DATA}
      columns={4}
    />
  );
}
