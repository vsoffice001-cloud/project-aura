import { LucideIcon } from 'lucide-react';

export interface StatBadgeProps {
  icon: LucideIcon;
  value: string;
  label: string;
}

export function StatBadge({ icon: Icon, value, label }: StatBadgeProps) {
  return (
    <div className="flex items-center gap-2 bg-white border border-[var(--black-100)] rounded-[var(--radius-md)] px-4 py-2.5 transition-shadow duration-300">
      <Icon className="h-4 w-4 text-[var(--purple-500)]" />
      <span className="font-bold text-foreground">{value}</span>
      <span className="text-[var(--black-500)] text-sm">{label}</span>
    </div>
  );
}