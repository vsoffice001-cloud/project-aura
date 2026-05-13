/**
 * IconBadge — Atom (DS v4.3)
 *
 * WHAT: Small icon container with background tint and rounded shape.
 * WHY:  Reusable decorative icon holder for section headers, list items,
 *       and card accents. Prevents each component from hand-coding the
 *       same 7-line icon wrapper pattern.
 * WHEN: SectionHeading icon slots, CategoryListItem leading icon,
 *       IndustrySectorsGrid sector icons, sidebar filter section headers.
 * HOW:  Renders a fixed-size container with a Lucide icon centered inside.
 *       Size, color, and background are configurable via props.
 *
 * COLOR SYSTEM: Background uses rgba() opacity tint of the icon color.
 * Defaults to content icon color (#806ce0 at 10% bg).
 */
import type { LucideIcon } from 'lucide-react';
import { iconColors } from '@/app/components/iconColors';

type IconBadgeSize = 'xs' | 'sm' | 'md' | 'lg';

interface IconBadgeProps {
  /** Lucide icon component */
  icon: LucideIcon;
  /** Size preset */
  size?: IconBadgeSize;
  /** Icon stroke color — defaults to iconColors.content */
  color?: string;
  /** Background color — defaults to 10% opacity of `color` */
  bgColor?: string;
  /** Additional className */
  className?: string;
}

const SIZE_MAP: Record<IconBadgeSize, { container: number; icon: number }> = {
  xs: { container: 24, icon: 12 },
  sm: { container: 28, icon: 14 },
  md: { container: 32, icon: 16 },
  lg: { container: 40, icon: 20 },
};

export function IconBadge({
  icon: Icon,
  size = 'sm',
  color = iconColors.content,
  bgColor,
  className = '',
}: IconBadgeProps) {
  const dims = SIZE_MAP[size];

  // Default bg: 10% opacity of the icon color
  const resolvedBg = bgColor || `${color}1a`; // hex + 1a = ~10% opacity

  return (
    <div
      className={`flex items-center justify-center flex-shrink-0 ${className}`}
      style={{
        width: `${dims.container}px`,
        height: `${dims.container}px`,
        borderRadius: 'var(--radius-inner, 6px)',
        backgroundColor: resolvedBg,
      }}
    >
      <Icon size={dims.icon} color={color} />
    </div>
  );
}
