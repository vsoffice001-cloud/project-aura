/**
 * CategoryListCard — Molecule
 * Ken Bold DS v4.2
 *
 * Card container that renders a vertical list of CategoryListItem atoms.
 * Domain-agnostic — reusable for any grouped list inside a card:
 *   - Industry sectors (Report Store)
 *   - Topic/category navigation panels
 *   - Table of Contents sections
 *   - Settings groups
 *
 * Features:
 *   - Wraps items in a Card with overflow-hidden
 *   - Automatically removes bottom divider from last item
 *   - Supports custom header and footer slots
 *   - Supports balanced multi-column layout via parent grid
 *
 * Usage:
 *   <CategoryListCard
 *     items={[{ label: "Healthcare", icon: Stethoscope, meta: "2,847" }]}
 *     onItemClick={(item) => handleSelect(item.label)}
 *   />
 */
import type { ElementType, ReactNode } from "react";
import { Card } from "../Card";
import { CategoryListItem } from "../CategoryListItem";

export interface CategoryListCardItem {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Icon component */
  icon?: ElementType;
  /** Fallback content when no icon */
  iconFallback?: ReactNode;
  /** Trailing metadata (e.g., count) */
  meta?: string;
  /** Tooltip for meta */
  metaTooltip?: string;
}

export interface CategoryListCardProps {
  /** List items to render */
  items: CategoryListCardItem[];
  /** Click handler — receives the full item */
  onItemClick?: (item: CategoryListCardItem) => void;
  /** Show hover arrows on items */
  showArrows?: boolean;
  /** Divider color between items */
  dividerColor?: string;
  /** Optional header content above the list */
  header?: ReactNode;
  /** Optional footer content below the list */
  footer?: ReactNode;
  /** Additional className for the Card wrapper */
  className?: string;
}

export function CategoryListCard({
  items,
  onItemClick,
  showArrows = true,
  dividerColor,
  header,
  footer,
  className = "",
}: CategoryListCardProps) {
  return (
    <Card className={`overflow-hidden ${className}`}>
      {header}
      {items.map((item, index) => (
        <CategoryListItem
          key={item.id}
          label={item.label}
          icon={item.icon}
          iconFallback={item.iconFallback}
          meta={item.meta}
          metaTooltip={item.metaTooltip}
          onClick={onItemClick ? () => onItemClick(item) : undefined}
          showArrow={showArrows}
          showDivider={index < items.length - 1}
          dividerColor={dividerColor}
        />
      ))}
      {footer}
    </Card>
  );
}
