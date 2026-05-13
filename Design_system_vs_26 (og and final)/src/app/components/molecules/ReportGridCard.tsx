/**
 * ReportGridCard — Backward-compatible wrapper
 *
 * Delegates to ReportCard with layout="grid".
 * New code should import ReportCard directly for grid+list support.
 *
 * @deprecated Use ReportCard with layout="grid" | "list" instead.
 */
import { ReportCard } from '@/app/components/molecules/ReportCard';
import type { ReportCardProps } from '@/app/components/molecules/ReportCard';

type ReportGridCardProps = Omit<ReportCardProps, 'layout' | 'description' | 'ctaLabel'>;

export function ReportGridCard(props: ReportGridCardProps) {
  return <ReportCard {...props} layout="grid" />;
}
