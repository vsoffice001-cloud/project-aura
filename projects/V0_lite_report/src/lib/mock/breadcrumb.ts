/**
 * Breadcrumb mock data — extracted from V0_lite_report-legacy/src/app/components/Breadcrumb.tsx L40-111
 *
 * TODO: replace w/ real API (Django /api/breadcrumb/<slug>) at handover.
 * Schema: BreadcrumbLevel[] — multi-level w/ optional dropdown siblings + children.
 */

export interface BreadcrumbItem {
  label: string;
  href: string;
  active?: boolean;
}

export interface BreadcrumbLevel {
  label: string;
  href: string;
  /** Column header shown in the dropdown (e.g. "Search category") */
  dropdownLabel?: string;
  /** Sibling items at this level */
  siblings?: BreadcrumbItem[];
  /** Next-level items shown in the right column */
  children?: {
    dropdownLabel: string;
    items: BreadcrumbItem[];
  };
}

export const healthcareBreadcrumbData: BreadcrumbLevel[] = [
  {
    label: 'Home',
    href: '#',
  },
  {
    label: 'Healthcare',
    href: '#',
    dropdownLabel: 'Search category',
    siblings: [
      { label: 'Food, Beverage and Tobacco', href: '#' },
      { label: 'Public Sector and Administration', href: '#' },
      { label: 'Defense and Security', href: '#' },
      { label: 'Healthcare', href: '#', active: true },
      { label: 'Banking Financial Services and Insurance', href: '#' },
      { label: 'Media and Entertainment', href: '#' },
      { label: 'Information Technology', href: '#' },
    ],
    children: {
      dropdownLabel: 'Search subcategory',
      items: [
        { label: 'AI in Healthcare', href: '#', active: true },
        { label: 'Medical Devices', href: '#' },
        { label: 'Pharmaceuticals', href: '#' },
        { label: 'Digital Health', href: '#' },
        { label: 'Diagnostics', href: '#' },
        { label: 'Telehealth', href: '#' },
        { label: 'Clinical Trials', href: '#' },
      ],
    },
  },
  {
    label: 'AI in Healthcare',
    href: '#',
    dropdownLabel: 'Search subcategory',
    siblings: [
      { label: 'AI in Healthcare', href: '#', active: true },
      { label: 'Medical Devices', href: '#' },
      { label: 'Pharmaceuticals', href: '#' },
      { label: 'Digital Health', href: '#' },
      { label: 'Diagnostics', href: '#' },
      { label: 'Telehealth', href: '#' },
      { label: 'Clinical Trials', href: '#' },
    ],
    children: {
      dropdownLabel: 'Search tag',
      items: [
        { label: 'Market Analysis', href: '#', active: true },
        { label: 'Competitive Landscape', href: '#' },
        { label: 'Drug Discovery AI', href: '#' },
        { label: 'Medical Imaging AI', href: '#' },
        { label: 'NLP in Healthcare', href: '#' },
        { label: 'Predictive Analytics', href: '#' },
        { label: 'Robot-Assisted Surgery', href: '#' },
      ],
    },
  },
  {
    label: 'Market Analysis',
    href: '#',
    dropdownLabel: 'Search tag',
    siblings: [
      { label: 'Market Analysis', href: '#', active: true },
      { label: 'Competitive Landscape', href: '#' },
      { label: 'Drug Discovery AI', href: '#' },
      { label: 'Medical Imaging AI', href: '#' },
      { label: 'NLP in Healthcare', href: '#' },
      { label: 'Predictive Analytics', href: '#' },
      { label: 'Robot-Assisted Surgery', href: '#' },
    ],
  },
];
