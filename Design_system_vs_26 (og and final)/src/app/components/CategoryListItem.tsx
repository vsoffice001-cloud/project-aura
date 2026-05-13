/**
 * CategoryListItem — Atom (DS v4.3)
 *
 * WHAT: Single category row with icon, label, count, and optional chevron.
 * WHY:  Reusable row pattern for CategoryListCard, sidebar industry lists,
 *       and any grouped-item navigation where each row has a label + count.
 * WHEN: Inside CategoryListCard, IndustrySectorsGrid compact mode,
 *       or any list-based navigation.
 * HOW:  Renders [IconBadge] [label] ... [count] [chevron].
 *       Click handler optional.
 *
 * COLOR SYSTEM: Pure monochromatic black/opacity.
 */
import { ChevronRight, type LucideIcon } from 'lucide-react';
import { IconBadge } from '@/app/components/IconBadge';

interface CategoryListItemProps {
  /** Display label */
  label: string;
  /** Optional count badge */
  count?: number;
  /** Lucide icon component */
  icon?: LucideIcon;
  /** Whether the item is currently selected/active */
  active?: boolean;
  /** Whether to show trailing chevron */
  showChevron?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Additional className */
  className?: string;
}

export function CategoryListItem({
  label,
  count,
  icon,
  active = false,
  showChevron = true,
  onClick,
  className = '',
}: CategoryListItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2.5 px-3 py-2.5 transition-all duration-150 cursor-pointer group ${className}`}
      style={{
        borderLeft: active ? '3px solid rgba(0,0,0,0.9)' : '3px solid rgba(0,0,0,0)',
        backgroundColor: active ? 'rgba(0,0,0,0.04)' : 'rgba(0,0,0,0)',
      }}
    >
      {icon && (
        <IconBadge
          icon={icon}
          size="xs"
          color={active ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.35)'}
          bgColor={active ? 'rgba(0,0,0,0.08)' : 'rgba(0,0,0,0.04)'}
        />
      )}

      <span
        className="flex-1 text-left truncate transition-colors"
        style={{
          fontSize: 'var(--text-sm)',
          color: active ? 'rgba(0,0,0,0.9)' : 'rgba(0,0,0,0.55)',
        }}
      >
        {label}
      </span>

      {count !== undefined && (
        <span
          className="tabular-nums flex-shrink-0"
          style={{
            fontSize: 'var(--text-xs)',
            color: active ? 'rgba(0,0,0,0.45)' : 'rgba(0,0,0,0.2)',
          }}
        >
          {count.toLocaleString()}
        </span>
      )}

      {showChevron && (
        <ChevronRight
          size={14}
          className="flex-shrink-0 transition-transform group-hover:translate-x-0.5"
          style={{ color: active ? 'rgba(0,0,0,0.35)' : 'rgba(0,0,0,0.15)' }}
        />
      )}
    </button>
  );
}
