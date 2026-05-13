export type DropdownChevronSize = 10 | 12;

export interface DropdownChevronProps {
  isOpen: boolean;
  size?: DropdownChevronSize;
}

/**
 * DropdownChevron — animated rotating chevron SVG.
 *
 * Rotates 180° when `isOpen=true`. Used in dropdown triggers (Company + 5 main nav items).
 * Two sizes: 10px (secondary bar) · 12px (primary nav).
 *
 * @promotedFrom topnav-v32/src/app/components/navbar/atoms/DropdownChevron.tsx
 */
export function DropdownChevron({ isOpen, size = 12 }: DropdownChevronProps) {
  const viewBox = size === 10 ? '0 0 10 10' : '0 0 12 12';
  const path = size === 10 ? 'M8 3.5L5 6.5L2 3.5' : 'M9.75 4.5L6 8.25L2.25 4.5';

  return (
    <svg
      className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
      style={{ width: size, height: size }}
      fill="none"
      viewBox={viewBox}
      aria-hidden="true"
    >
      <path d={path} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
