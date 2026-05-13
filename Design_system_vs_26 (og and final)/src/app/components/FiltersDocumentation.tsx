/**
 * FiltersDocumentation — v4.3
 *
 * Comprehensive filter system documentation page.
 * Covers all 6 atoms + 4 molecules with:
 *   - WHY / WHAT / WHEN / WHERE / HOW specs
 *   - Live interactive demos
 *   - Use cases per pillar (Research, Consulting, Surveys)
 *   - Interaction state matrix (10 components x 6 states)
 *   - Decision guide for component selection
 */
import { useState } from 'react';
import { FilterCheckbox } from '@/app/components/FilterCheckbox';
import { FilterChip } from '@/app/components/FilterChip';
import { FilterSearchInput } from '@/app/components/FilterSearchInput';
import { FilterSectionHeader } from '@/app/components/FilterSectionHeader';
import { FilterCheckboxItem } from '@/app/components/FilterCheckboxItem';
import { FilterIndustryItem } from '@/app/components/FilterIndustryItem';
import { FilterAccordion, SidebarPanel, ActiveFilterChipBar, MobileFilterSheet } from '@/app/components/molecules';
import {
  ChevronRight, Lock, X,
  Layers, Tag, MapPin, Calendar, SlidersHorizontal,
} from 'lucide-react';

// ── Helpers ──

function ComponentPreview({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6">
      <div className="mb-3">
        <p style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.7)' }}>{title}</p>
        {description && (
          <p className="mt-0.5" style={{ fontSize: 'var(--text-card-micro)', color: 'rgba(0,0,0,0.4)' }}>{description}</p>
        )}
      </div>
      <div
        className="p-6"
        style={{
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'rgba(0,0,0,0.08)',
          borderRadius: '10px',
          backgroundColor: 'rgba(255,255,255,1)',
        }}
      >
        {children}
      </div>
    </div>
  );
}

function MetaBox({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mt-4 p-4"
      style={{
        backgroundColor: 'rgba(250,250,249,1)',
        borderRadius: 'var(--radius-element)',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'rgba(0,0,0,0.06)',
      }}
    >
      {children}
    </div>
  );
}

function SpecTable({ rows }: { rows: [string, string][] }) {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full" style={{ fontSize: 'var(--text-xs)' }}>
        <tbody>
          {rows.map(([key, val]) => (
            <tr
              key={key}
              style={{ borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: 'rgba(0,0,0,0.04)' }}
            >
              <td
                className="py-2 pr-4 uppercase tracking-wider align-top whitespace-nowrap"
                style={{ fontSize: 'var(--text-card-micro)', width: '60px', color: 'rgba(0,0,0,0.4)' }}
              >
                {key}
              </td>
              <td className="py-2" style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.6)' }}>
                {val}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Main export ──

export function FiltersContent() {
  // Atom demo state
  const [searchQuery, setSearchQuery] = useState('');
  const [showSidebar, setShowSidebar] = useState(true);
  const [accordionVariant, setAccordionVariant] = useState<'static' | 'collapsible'>('static');
  const [selectedIndustry, setSelectedIndustry] = useState('All Industries');
  const [selectedFormat, setSelectedFormat] = useState('All Formats');

  // FilterSectionHeader demo
  const [sectionOpen, setSectionOpen] = useState(true);

  // FilterCheckboxItem demo
  const [demoChecked, setDemoChecked] = useState<string[]>(['Europe']);

  // FilterIndustryItem demo
  const [demoIndustry, setDemoIndustry] = useState<string | null>('Technology & Telecom');

  // MobileFilterSheet demo
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);

  // Full composition state
  const [compIndustry, setCompIndustry] = useState<string | null>(null);
  const [compRegions, setCompRegions] = useState<string[]>([]);
  const [compYears, setCompYears] = useState<string[]>(['2026']);
  const [compSearch, setCompSearch] = useState('');
  const [compIndustriesOpen, setCompIndustriesOpen] = useState(true);
  const [compRegionsOpen, setCompRegionsOpen] = useState(true);
  const [compYearsOpen, setCompYearsOpen] = useState(true);

  // ── Data ──
  const industryOptions = [
    { label: 'All Industries', count: 18 },
    { label: 'Technology', count: 5 },
    { label: 'Healthcare', count: 3 },
    { label: 'Energy', count: 3 },
    { label: 'Financial Services', count: 2 },
    { label: 'Automotive', count: 2 },
    { label: 'Logistics', count: 2 },
    { label: 'Agriculture', count: 2, disabled: true },
  ];

  const formatOptions = [
    { label: 'All Formats', count: 18 },
    { label: 'Full Report', count: 10 },
    { label: 'Market Brief', count: 5 },
    { label: 'Data Pack', count: 3 },
  ];

  const demoIndustries = [
    { label: 'Technology & Telecom', count: 3215 },
    { label: 'Healthcare & Life Sciences', count: 2187 },
    { label: 'Energy & Utilities', count: 1456 },
    { label: 'Banking & Financial Services', count: 1892 },
    { label: 'Consumer & Retail', count: 2034 },
  ];

  const demoRegions = [
    { label: 'Global', count: 67 },
    { label: 'Americas', count: 6 },
    { label: 'Europe', count: 8 },
    { label: 'GCC', count: 8 },
    { label: 'India', count: 19 },
    { label: 'Southeast Asia', count: 4 },
  ];

  // ── Active filter chips (simple demo) ──
  const activeFilters = [
    ...(selectedIndustry !== 'All Industries'
      ? [{ label: selectedIndustry, category: 'INDUSTRY', onRemove: () => setSelectedIndustry('All Industries') }]
      : []),
    ...(selectedFormat !== 'All Formats'
      ? [{ label: selectedFormat, category: 'FORMAT', onRemove: () => setSelectedFormat('All Formats') }]
      : []),
    ...(searchQuery
      ? [{ label: `\u201C${searchQuery}\u201D`, category: 'SEARCH', onRemove: () => setSearchQuery('') }]
      : []),
  ];

  // ── Full composition chips ──
  const compActiveChips = [
    ...compRegions.map((r) => ({
      label: r,
      category: 'REGION' as const,
      onRemove: () => setCompRegions((prev) => prev.filter((x) => x !== r)),
    })),
    ...compYears.map((y) => ({
      label: y,
      category: 'YEAR' as const,
      onRemove: () => setCompYears((prev) => prev.filter((x) => x !== y)),
    })),
    ...(compSearch
      ? [{ label: `\u201C${compSearch}\u201D`, category: 'SEARCH' as const, onRemove: () => setCompSearch('') }]
      : []),
  ];
  const compActiveCount = [compIndustry, compRegions.length > 0, compYears.length > 0, compSearch].filter(Boolean).length;

  const clearAll = () => {
    setSelectedIndustry('All Industries');
    setSelectedFormat('All Formats');
    setSearchQuery('');
  };

  const clearComp = () => {
    setCompIndustry(null);
    setCompRegions([]);
    setCompYears([]);
    setCompSearch('');
  };

  return (
    <div className="space-y-16">
      {/* ═══════════════════════════════════════════════
          HEADER
         ═══════════════════════════════════════════════ */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <h2 style={{ fontSize: 'var(--text-2xl)', color: 'rgba(0,0,0,0.9)' }}>Filter System</h2>
          <span
            className="px-2 py-0.5"
            style={{
              fontSize: 'var(--text-card-micro)',
              backgroundColor: 'rgba(0,0,0,0.06)',
              color: 'rgba(0,0,0,0.6)',
              borderRadius: 'var(--radius-element)',
            }}
          >
            v4.3
          </span>
        </div>
        <p
          className="mb-3"
          style={{ maxWidth: 'var(--container-prose)', fontSize: 'var(--text-sm)', color: 'rgba(0,0,0,0.6)' }}
        >
          A complete, composable filter system built from Atomic Design principles. Originally
          extracted from a monolithic 1,400-line IndustrySidebar, now decomposed into 6 atoms + 4
          molecules that compose together for desktop sidebars, mobile bottom sheets, and any
          future filter surface. Serves all three pillars &mdash; Research, Consulting, and
          Surveys.
        </p>
        <div
          className="flex gap-3 flex-wrap"
          style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.4)' }}
        >
          <span>6 atoms</span>
          <span>&middot;</span>
          <span>4 molecules</span>
          <span>&middot;</span>
          <span>6 interaction states each</span>
          <span>&middot;</span>
          <span>5 filter dimensions</span>
          <span>&middot;</span>
          <span>Responsive (desktop + mobile)</span>
        </div>

        {/* Architecture diagram */}
        <div
          className="mt-6 p-5"
          style={{
            borderRadius: '10px',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: 'rgba(0,0,0,0.06)',
            backgroundColor: 'rgba(0,0,0,0.012)',
          }}
        >
          <p
            className="uppercase tracking-[0.1em] mb-4"
            style={{ fontSize: 'var(--text-card-micro)', color: 'rgba(0,0,0,0.35)' }}
          >
            Atomic Architecture
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Atoms */}
            <div>
              <p
                className="mb-2"
                style={{
                  fontSize: 'var(--text-card-micro)',
                  color: 'rgba(0,0,0,0.5)',
                  letterSpacing: '0.08em',
                }}
              >
                ATOMS (6)
              </p>
              <div className="space-y-1.5">
                {(
                  [
                    ['FilterSearchInput', 'Search within filters'],
                    ['FilterCheckbox', 'Single-select radio row'],
                    ['FilterCheckboxItem', 'Multi-select checkbox row'],
                    ['FilterSectionHeader', 'Collapsible section toggle'],
                    ['FilterIndustryItem', 'Expandable industry row'],
                    ['FilterChip', 'Dismissible active filter pill'],
                  ] as const
                ).map(([name, desc]) => (
                  <div key={name} className="flex items-baseline gap-2">
                    <code
                      className="font-mono flex-shrink-0"
                      style={{ fontSize: 'var(--text-card-micro)', color: 'rgba(0,0,0,0.6)' }}
                    >
                      {name}
                    </code>
                    <span
                      className="truncate"
                      style={{ fontSize: 'var(--text-card-micro)', color: 'rgba(0,0,0,0.3)' }}
                    >
                      {desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {/* Molecules */}
            <div>
              <p
                className="mb-2"
                style={{
                  fontSize: 'var(--text-card-micro)',
                  color: 'rgba(0,0,0,0.5)',
                  letterSpacing: '0.08em',
                }}
              >
                MOLECULES (4)
              </p>
              <div className="space-y-1.5">
                {(
                  [
                    ['FilterAccordion', 'Titled group + FilterCheckbox list'],
                    ['SidebarPanel', 'Sticky sidebar container (inline/card)'],
                    ['ActiveFilterChipBar', 'Bar of active FilterChips'],
                    ['MobileFilterSheet', 'Bottom-slide sheet overlay'],
                  ] as const
                ).map(([name, desc]) => (
                  <div key={name} className="flex items-baseline gap-2">
                    <code
                      className="font-mono flex-shrink-0"
                      style={{ fontSize: 'var(--text-card-micro)', color: 'rgba(0,0,0,0.6)' }}
                    >
                      {name}
                    </code>
                    <span
                      className="truncate"
                      style={{ fontSize: 'var(--text-card-micro)', color: 'rgba(0,0,0,0.3)' }}
                    >
                      {desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {/* Organisms */}
            <div>
              <p
                className="mb-2"
                style={{
                  fontSize: 'var(--text-card-micro)',
                  color: 'rgba(0,0,0,0.5)',
                  letterSpacing: '0.08em',
                }}
              >
                ORGANISMS (Composed)
              </p>
              <div className="space-y-1.5">
                {(
                  [
                    ['Desktop Sidebar', 'SidebarPanel(card) + Sections + Atoms'],
                    ['Mobile Filter Sheet', 'MobileFilterSheet + shared content'],
                    ['Filter Toolbar', 'ActiveFilterChipBar + ViewToggle + Sort'],
                  ] as const
                ).map(([name, desc]) => (
                  <div key={name} className="flex items-baseline gap-2">
                    <span
                      className="flex-shrink-0"
                      style={{ fontSize: 'var(--text-card-micro)', color: 'rgba(0,0,0,0.6)' }}
                    >
                      {name}
                    </span>
                    <span
                      className="truncate"
                      style={{ fontSize: 'var(--text-card-micro)', color: 'rgba(0,0,0,0.3)' }}
                    >
                      {desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          ATOM 1: FilterSearchInput
         ═══════════════════════════════════════════════ */}
      <section>
        <h3 className="mb-1" style={{ fontSize: 'var(--text-lg)', color: 'rgba(0,0,0,0.85)' }}>FilterSearchInput</h3>
        <p className="mb-4" style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.4)' }}>
          Atom &mdash; Search input with icon and clear button
        </p>
        <SpecTable
          rows={[
            [
              'WHY',
              "Users need to narrow down long filter option lists (14+ industries, 15+ tags) without endless scrolling. Search-within-filters reduces cognitive load (Hick's Law).",
            ],
            [
              'WHAT',
              'Compact search input: [Search icon] + [text input] + [conditional X clear]. Styled with monochromatic black/opacity borders. Focus ring on outer container, not inner input.',
            ],
            [
              'WHEN',
              'Inside SidebarPanel header zone, above the filter sections. Also usable in listing page toolbars for search-across-results.',
            ],
            [
              'WHERE',
              'Report Store Listing sidebar, Surveys Listing sidebar, any future filter surface.',
            ],
            [
              'HOW',
              '<FilterSearchInput value={q} onChange={setQ} placeholder="Search filters..." />',
            ],
          ]}
        />
        <ComponentPreview title="States" description="Empty, with value, and disabled states">
          <div className="space-y-3" style={{ maxWidth: '320px' }}>
            <FilterSearchInput value="" onChange={() => {}} placeholder="Empty state..." />
            <FilterSearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Type to search..."
            />
            <FilterSearchInput
              value=""
              onChange={() => {}}
              placeholder="Disabled..."
              disabled
            />
          </div>
        </ComponentPreview>
        <MetaBox>
          <p className="mb-2" style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.4)' }}>Font &amp; radius tokens</p>
          <div className="flex gap-6 flex-wrap">
            <span style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.6)' }}>
              <code className="font-mono" style={{ color: 'rgba(0,0,0,0.5)' }}>--text-xs</code> (12.8px) &mdash; input text
            </span>
            <span style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.6)' }}>
              <code className="font-mono" style={{ color: 'rgba(0,0,0,0.5)' }}>var(--radius-element)</code> (5px) &mdash; border-radius
            </span>
          </div>
        </MetaBox>
      </section>

      {/* ═══════════════════════════════════════════════
          ATOM 2: FilterCheckbox (legacy single-select)
         ═══════════════════════════════════════════════ */}
      <section>
        <h3 className="mb-1" style={{ fontSize: 'var(--text-lg)', color: 'rgba(0,0,0,0.85)' }}>FilterCheckbox</h3>
        <p className="mb-4" style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.4)' }}>
          Atom &mdash; Single-select radio-style filter option with label + count
        </p>
        <SpecTable
          rows={[
            [
              'WHY',
              'Single-select filter dimensions (Format, Sort) need a simple radio-button-style row. No checkbox square needed - just text + borderLeft indicator.',
            ],
            [
              'WHAT',
              'Clickable row: [label] [count]. Selected state adds black left-border + darkened text. Monochromatic color system. Used inside FilterAccordion.',
            ],
            [
              'WHEN',
              'Inside FilterAccordion groups for simple, non-hierarchical single-select lists (Format, Sort Order).',
            ],
            [
              'WHERE',
              'FilterAccordion molecule composes these internally. Not typically used standalone.',
            ],
            [
              'HOW',
              '<FilterCheckbox label="Full Report" count={10} selected={isSelected} onClick={handler} />',
            ],
          ]}
        />
        <ComponentPreview title="States" description="Default, hover (try it), selected, and disabled">
          <div className="space-y-1" style={{ maxWidth: '240px' }}>
            <FilterCheckbox label="Default state" count={12} />
            <FilterCheckbox label="Selected state" count={5} selected />
            <FilterCheckbox label="Disabled state" count={0} disabled />
            <FilterCheckbox label="Selected + count" count={8} selected />
          </div>
        </ComponentPreview>
        <MetaBox>
          <p className="mb-2" style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.4)' }}>Font tokens</p>
          <div className="flex gap-6 flex-wrap">
            <span style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.6)' }}>
              <code className="font-mono" style={{ color: 'rgba(0,0,0,0.5)' }}>--text-xs</code> (12.8px) &mdash; label
            </span>
            <span style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.6)' }}>
              <code className="font-mono" style={{ color: 'rgba(0,0,0,0.5)' }}>--text-card-micro</code> (10px) &mdash; count
            </span>
          </div>
        </MetaBox>
      </section>

      {/* ═══════════════════════════════════════════════
          ATOM 3: FilterCheckboxItem (multi-select)
         ═══════════════════════════════════════════════ */}
      <section>
        <h3 className="mb-1" style={{ fontSize: 'var(--text-lg)', color: 'rgba(0,0,0,0.85)' }}>FilterCheckboxItem</h3>
        <p className="mb-4" style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.4)' }}>
          Atom &mdash; Multi-select checkbox row with check square, label, and optional count
        </p>
        <SpecTable
          rows={[
            [
              'WHY',
              "Multi-select dimensions (Tags, Regions, Years) need a checkbox-style control. Users expect a square check mark for \"select many\" semantics. Distinct from FilterCheckbox's radio-style.",
            ],
            [
              'WHAT',
              'Clickable row: [checkbox square] [label] [count?]. Checked state fills checkbox black + white Check icon. BorderLeft active indicator + subtle bg highlight. role="checkbox" for accessibility.',
            ],
            [
              'WHEN',
              'Inside sidebar filter sections for multi-select options: Tags, Regions, Publish Year. Any filter dimension where users can select multiple values simultaneously.',
            ],
            [
              'WHERE',
              'Report Store Listing sidebar (Tags/Regions/Years sections), Surveys Listing sidebar.',
            ],
            [
              'HOW',
              '<FilterCheckboxItem label="Europe" count={8} checked={isChecked} onChange={toggleHandler} />',
            ],
          ]}
        />
        <ComponentPreview title="States" description="Unchecked, checked, and interactive demo">
          <div style={{ maxWidth: '240px' }}>
            {demoRegions.slice(0, 4).map((reg) => (
              <FilterCheckboxItem
                key={reg.label}
                label={reg.label}
                count={reg.count}
                checked={demoChecked.includes(reg.label)}
                onChange={() =>
                  setDemoChecked((prev) =>
                    prev.includes(reg.label)
                      ? prev.filter((x) => x !== reg.label)
                      : [...prev, reg.label],
                  )
                }
              />
            ))}
          </div>
        </ComponentPreview>
        <MetaBox>
          <p className="mb-2" style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.4)' }}>Design tokens</p>
          <div className="flex gap-6 flex-wrap">
            <span style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.6)' }}>
              <code className="font-mono" style={{ color: 'rgba(0,0,0,0.5)' }}>--text-xs</code> (12.8px) &mdash; label
            </span>
            <span style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.6)' }}>
              <code className="font-mono" style={{ color: 'rgba(0,0,0,0.5)' }}>--text-card-micro</code> (10px) &mdash; count
            </span>
            <span style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.6)' }}>
              <code className="font-mono" style={{ color: 'rgba(0,0,0,0.5)' }}>--radius-inner</code> (2.5px) &mdash; checkbox square
            </span>
          </div>
        </MetaBox>
      </section>

      {/* ═══════════════════════════════════════════════
          ATOM 4: FilterSectionHeader
         ═══════════════════════════════════════════════ */}
      <section>
        <h3 className="mb-1" style={{ fontSize: 'var(--text-lg)', color: 'rgba(0,0,0,0.85)' }}>FilterSectionHeader</h3>
        <p className="mb-4" style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.4)' }}>
          Atom &mdash; Collapsible section header with icon-box, label, badge, and chevron toggle
        </p>
        <SpecTable
          rows={[
            [
              'WHY',
              'Extracted from 4x duplicate inline patterns. Industries, Tags, Regions, Publish Year all share the same header anatomy. One atom replaces 4 hardcoded copies.',
            ],
            [
              'WHAT',
              'Full-width button: [icon-in-bordered-box] [UPPERCASE LABEL] [badge count?] [lock icon?] [chevron toggle]. Active state darkens background and border. Disabled state (e.g., Tags when no industry selected) shows lock icon + muted opacity.',
            ],
            [
              'WHEN',
              'At the top of each filter section in the sidebar. Click toggles section open/closed.',
            ],
            ['WHERE', 'SidebarPanel filter sections, MobileFilterSheet sections.'],
            [
              'HOW',
              '<FilterSectionHeader icon={<Layers size={12} />} label="Industries" activeCount={1} isOpen={open} onToggle={toggle} />',
            ],
          ]}
        />
        <ComponentPreview
          title="States"
          description="Default, active with badge, disabled with lock, open/closed"
        >
          <div
            style={{
              maxWidth: '240px',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: 'rgba(0,0,0,0.06)',
              borderRadius: '10px',
              overflow: 'hidden',
            }}
          >
            <FilterSectionHeader
              icon={<Layers size={12} style={{ color: 'rgba(0,0,0,0.45)' }} />}
              label="Industries"
              activeCount={1}
              isOpen={sectionOpen}
              onToggle={() => setSectionOpen(!sectionOpen)}
              active
            />
            {sectionOpen && (
              <div
                className="px-4 py-2"
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'rgba(0,0,0,0.3)',
                }}
              >
                Section content here...
              </div>
            )}
            <FilterSectionHeader
              icon={<Tag size={12} style={{ color: 'rgba(0,0,0,0.45)' }} />}
              label="Tags"
              disabled
              trailing={<Lock size={12} style={{ color: 'rgba(0,0,0,0.2)' }} />}
              showChevron={false}
            />
            <div
              className="px-4 py-2"
              style={{
                fontSize: 'var(--text-xs)',
                color: 'rgba(0,0,0,0.25)',
              }}
            >
              Select an industry first
            </div>
            <FilterSectionHeader
              icon={<MapPin size={12} style={{ color: 'rgba(0,0,0,0.45)' }} />}
              label="Regions"
              activeCount={2}
              isOpen={true}
              onToggle={() => {}}
              active
            />
            <FilterSectionHeader
              icon={<Calendar size={12} style={{ color: 'rgba(0,0,0,0.45)' }} />}
              label="Publish Year"
              isOpen={false}
              onToggle={() => {}}
            />
          </div>
        </ComponentPreview>
        <MetaBox>
          <p className="mb-2" style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.4)' }}>Design tokens</p>
          <div className="flex gap-6 flex-wrap">
            <span style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.6)' }}>
              <code className="font-mono" style={{ color: 'rgba(0,0,0,0.5)' }}>--text-xs</code> (12.8px) &mdash; label (uppercase + tracking)
            </span>
            <span style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.6)' }}>
              <code className="font-mono" style={{ color: 'rgba(0,0,0,0.5)' }}>--radius-element</code> (5px) &mdash; icon box
            </span>
          </div>
        </MetaBox>
      </section>

      {/* ═══════════════════════════════════════════════
          ATOM 5: FilterIndustryItem
         ═══════════════════════════════════════════════ */}
      <section>
        <h3 className="mb-1" style={{ fontSize: 'var(--text-lg)', color: 'rgba(0,0,0,0.85)' }}>FilterIndustryItem</h3>
        <p className="mb-4" style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.4)' }}>
          Atom &mdash; Single-select expandable industry row with chevron icon swap, report count, and nested children slot
        </p>
        <SpecTable
          rows={[
            [
              'WHY',
              'Industries use a radio-style single-select pattern (not checkbox multi-select). Each row needs expand/collapse to reveal sub-industries, a report count badge, and a borderLeft active indicator. Extracted from inline industry row pattern in ReportStoreListingDemoContent.',
            ],
            [
              'WHAT',
              'Clickable row: [ChevronRight → ChevronDown icon swap] [industry label] [report count]. Selected state adds 3px solid borderLeft (rgb(0,0,0)), bg rgba(0,0,0,0.04), label darkens to 0.9, count to 0.45. Children slot renders nested sub-industry list inside a ml-7 container with 1px left border rgba(0,0,0,0.08).',
            ],
            [
              'WHEN',
              'Inside the Industries filter section of sidebar panels. Each row represents one industry; selecting it reveals sub-industries as nested children.',
            ],
            ['WHERE', 'Report Store Listing sidebar → Industries section (within SidebarPanel card variant).'],
            [
              'HOW',
              '<FilterIndustryItem label="Technology & Telecom" count={3215} selected={isSelected} onClick={handler}> {subIndustryList} </FilterIndustryItem>',
            ],
          ]}
        />
        <ComponentPreview title="Interaction States" description="Click any row to toggle — selected row shows borderLeft, icon swap, and nested children">
          <div
            style={{
              maxWidth: '260px',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: 'rgba(0,0,0,0.06)',
              borderRadius: '10px',
              overflow: 'hidden',
            }}
          >
            {demoIndustries.map((ind) => (
              <FilterIndustryItem
                key={ind.label}
                label={ind.label}
                count={ind.count}
                selected={demoIndustry === ind.label}
                onClick={() =>
                  setDemoIndustry(demoIndustry === ind.label ? null : ind.label)
                }
              >
                {demoIndustry === ind.label && (
                  <>
                    {(ind.label === 'Technology & Telecom'
                      ? ['5G & Connectivity', 'AI & Machine Learning', 'Cloud Computing', 'Cybersecurity Solutions']
                      : ind.label === 'Healthcare & Life Sciences'
                      ? ['Biotech', 'Medical Devices', 'Pharmaceuticals']
                      : ind.label === 'Energy & Utilities'
                      ? ['Oil & Gas', 'Renewables', 'Utilities']
                      : ind.label === 'Banking & Financial Services'
                      ? ['Capital Markets', 'Insurance', 'Retail Banking']
                      : ['E-Commerce', 'FMCG', 'Luxury']
                    ).map((sub) => (
                      <button
                        key={sub}
                        className="block w-full text-left px-3 py-1.5 transition-all duration-100 truncate cursor-pointer hover:bg-black/[0.02]"
                        style={{
                          fontSize: 'var(--text-xs)',
                          color: 'rgba(0,0,0,0.4)',
                        }}
                      >
                        {sub}
                      </button>
                    ))}
                  </>
                )}
              </FilterIndustryItem>
            ))}
          </div>
        </ComponentPreview>
        <MetaBox>
          <p className="mb-2" style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.4)' }}>Design tokens &amp; interaction states</p>
          <div className="flex gap-6 flex-wrap mb-3">
            <span style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.6)' }}>
              <code className="font-mono" style={{ color: 'rgba(0,0,0,0.5)' }}>--text-xs</code> (12.8px) &mdash; label + sub-items
            </span>
            <span style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.6)' }}>
              <code className="font-mono" style={{ color: 'rgba(0,0,0,0.5)' }}>--text-card-micro</code> (10px) &mdash; count (side numbers only)
            </span>
            <span style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.6)' }}>
              <code className="font-mono" style={{ color: 'rgba(0,0,0,0.5)' }}>borderLeft 3px solid</code> &mdash; selected indicator
            </span>
            <span style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.6)' }}>
              <code className="font-mono" style={{ color: 'rgba(0,0,0,0.5)' }}>children border</code> &mdash; 1px solid rgba(0,0,0,0.08) left
            </span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {([
              ['Default', 'label: rgba(0,0,0,0.5) · count: rgba(0,0,0,0.18) · ChevronRight · no borderLeft'],
              ['Hover', 'bg: rgba(0,0,0,0.02)'],
              ['Selected', 'label: rgba(0,0,0,0.9) · count: rgba(0,0,0,0.45) · ChevronDown · borderLeft 3px rgb(0,0,0) · bg: rgba(0,0,0,0.04)'],
            ] as const).map(([state, desc]) => (
              <div
                key={state}
                className="p-2"
                style={{
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: 'rgba(0,0,0,0.06)',
                  borderRadius: '6px',
                }}
              >
                <span className="block mb-1" style={{ fontSize: 'var(--text-card-micro)', color: 'rgba(0,0,0,0.5)' }}>{state}</span>
                <span className="block" style={{ fontSize: 'var(--text-card-micro)', color: 'rgba(0,0,0,0.4)' }}>{desc}</span>
              </div>
            ))}
          </div>
        </MetaBox>
      </section>

      {/* ═══════════════════════════════════════════════
          ATOM 6: FilterChip
         ═══════════════════════════════════════════════ */}
      <section>
        <h3 className="mb-1" style={{ fontSize: 'var(--text-lg)', color: 'rgba(0,0,0,0.85)' }}>FilterChip</h3>
        <p className="mb-4" style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.4)' }}>
          Atom &mdash; Dismissible pill showing an active filter value
        </p>
        <SpecTable
          rows={[
            [
              'WHY',
              "Users need to see which filters are active AND be able to remove them one-by-one. Chip pattern provides both visibility (what's applied) and control (remove with X).",
            ],
            [
              'WHAT',
              'Pill-shaped element: [label text] [X dismiss button]. Monochromatic black/opacity tint bg. X button with hover/press micro-interaction. Optional read-only mode (no X).',
            ],
            [
              'WHEN',
              'Inside ActiveFilterChipBar, above the card grid. Appears when any filter dimension has a selection. Dismissing a chip removes that specific filter.',
            ],
            ['WHERE', 'Report Store Listing (ActiveFilterChipBar zone), Surveys Listing.'],
            ['HOW', '<FilterChip label="Technology" onRemove={() => clearIndustry()} />'],
          ]}
        />
        <ComponentPreview
          title="Variants"
          description="Dismissible (with X) and read-only (no X)"
        >
          <div className="space-y-3">
            <div>
              <p className="mb-2" style={{ fontSize: 'var(--text-card-micro)', color: 'rgba(0,0,0,0.4)' }}>Dismissible (with X)</p>
              <div className="flex flex-wrap gap-2">
                <FilterChip label="Technology" onRemove={() => {}} />
                <FilterChip label="Full Report" onRemove={() => {}} />
                <FilterChip label={`\u201CAI chips\u201D`} onRemove={() => {}} />
              </div>
            </div>
            <div>
              <p className="mb-2" style={{ fontSize: 'var(--text-card-micro)', color: 'rgba(0,0,0,0.4)' }}>With category prefix (uppercase micro label)</p>
              <div className="flex flex-wrap gap-2">
                <FilterChip label="Technology" category="INDUSTRY" onRemove={() => {}} />
                <FilterChip label="Europe" category="REGION" onRemove={() => {}} />
                <FilterChip label="2026" category="YEAR" onRemove={() => {}} />
                <FilterChip label={`\u201Cmarket trends\u201D`} category="SEARCH" onRemove={() => {}} />
              </div>
            </div>
            <div>
              <p className="mb-2" style={{ fontSize: 'var(--text-card-micro)', color: 'rgba(0,0,0,0.4)' }}>Read-only (no X)</p>
              <div className="flex flex-wrap gap-2">
                <FilterChip label="Read-only chip" />
                <FilterChip label="Status" category="FILTER" />
              </div>
            </div>
          </div>
        </ComponentPreview>
        <MetaBox>
          <p className="mb-2" style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.4)' }}>Font &amp; layout tokens</p>
          <div className="flex gap-6 flex-wrap">
            <span style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.6)' }}>
              <code className="font-mono" style={{ color: 'rgba(0,0,0,0.5)' }}>--text-xs</code> (12.8px) &mdash; label
            </span>
            <span style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.6)' }}>
              <code className="font-mono" style={{ color: 'rgba(0,0,0,0.5)' }}>--text-card-micro</code> (10px) &mdash; category prefix (uppercase)
            </span>
            <span style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.6)' }}>
              <code className="font-mono" style={{ color: 'rgba(0,0,0,0.5)' }}>--radius-element</code> (5px) &mdash; pill border-radius
            </span>
          </div>
          <div className="mt-2">
            <p className="mb-1" style={{ fontSize: 'var(--text-card-micro)', color: 'rgba(0,0,0,0.4)' }}>Props</p>
            <div className="grid grid-cols-3 gap-x-4 gap-y-1" style={{ fontSize: 'var(--text-card-micro)' }}>
              <span style={{ color: 'rgba(0,0,0,0.5)' }}><code className="font-mono">label</code>: string</span>
              <span style={{ color: 'rgba(0,0,0,0.5)' }}><code className="font-mono">category?</code>: string</span>
              <span style={{ color: 'rgba(0,0,0,0.5)' }}><code className="font-mono">onRemove?</code>: () =&gt; void</span>
            </div>
          </div>
        </MetaBox>
      </section>

      {/* ═══════════════════════════════════════════════
          MOLECULE 1: FilterAccordion
         ═══════════════════════════════════════════════ */}
      <section>
        <h3 className="mb-1" style={{ fontSize: 'var(--text-lg)', color: 'rgba(0,0,0,0.85)' }}>FilterAccordion</h3>
        <p className="mb-4" style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.4)' }}>
          Molecule &mdash; Titled filter group composing FilterCheckbox atoms
        </p>
        <SpecTable
          rows={[
            [
              'WHY',
              'Unified the two duplicated FilterSection implementations (desktop sidebar vs mobile sheet) into one molecule with a variant prop. Reduces duplication and ensures consistent behavior.',
            ],
            [
              'WHAT',
              'Section heading + list of FilterCheckbox items. "static" variant (always open) for desktop sidebars. "collapsible" variant (toggle open/closed) for mobile filter sheets.',
            ],
            [
              'WHEN',
              'For simple single-select filter groups (Format, Sort Order) inside SidebarPanel or MobileFilterSheet. For multi-select or hierarchical filters, compose FilterSectionHeader + FilterCheckboxItem directly.',
            ],
            ['WHERE', 'Inside SidebarPanel body zone. Inside MobileFilterSheet body zone.'],
            [
              'HOW',
              '<FilterAccordion title="Format" variant="collapsible" options={opts} selectedValue={val} onSelect={handler} />',
            ],
          ]}
        />
        <div className="flex gap-3 mb-4">
          {(['static', 'collapsible'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setAccordionVariant(v)}
              className="px-3 py-1.5 transition-all cursor-pointer"
              style={{
                borderRadius: 'var(--radius-element)',
                fontSize: 'var(--text-xs)',
                backgroundColor: accordionVariant === v ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0)',
                color: accordionVariant === v ? 'rgba(255,255,255,1)' : 'rgba(0,0,0,0.5)',
                borderWidth: accordionVariant === v ? '0' : '1px',
                borderStyle: 'solid',
                borderColor: 'rgba(0,0,0,0.1)',
              }}
            >
              {v}
            </button>
          ))}
        </div>
        <ComponentPreview
          title={`variant="${accordionVariant}"`}
          description={
            accordionVariant === 'static'
              ? 'Always open - desktop sidebars'
              : 'Toggle open/closed - mobile filter sheets'
          }
        >
          <div className="space-y-6" style={{ maxWidth: '240px' }}>
            <FilterAccordion
              title="Industry"
              variant={accordionVariant}
              options={industryOptions}
              selectedValue={selectedIndustry}
              onSelect={setSelectedIndustry}
            />
            <FilterAccordion
              title="Format"
              variant={accordionVariant}
              options={formatOptions}
              selectedValue={selectedFormat}
              onSelect={setSelectedFormat}
            />
            <FilterAccordion
              title="Disabled Group"
              variant={accordionVariant}
              options={[
                { label: 'Option A', count: 3 },
                { label: 'Option B', count: 1 },
              ]}
              selectedValue="Option A"
              onSelect={() => {}}
              disabled
            />
          </div>
        </ComponentPreview>
        <MetaBox>
          <p className="mb-2" style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.4)' }}>Font tokens &amp; props</p>
          <div className="flex gap-6 flex-wrap mb-2">
            <span style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.6)' }}>
              <code className="font-mono" style={{ color: 'rgba(0,0,0,0.5)' }}>--text-xs</code> (12.8px) &mdash; section heading (uppercase + tracking-[0.1em])
            </span>
          </div>
          <div>
            <p className="mb-1" style={{ fontSize: 'var(--text-card-micro)', color: 'rgba(0,0,0,0.4)' }}>Props</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1" style={{ fontSize: 'var(--text-card-micro)' }}>
              <span style={{ color: 'rgba(0,0,0,0.5)' }}><code className="font-mono">title</code>: string</span>
              <span style={{ color: 'rgba(0,0,0,0.5)' }}><code className="font-mono">options</code>: {'{'}label, count?, disabled?{'}'}[]</span>
              <span style={{ color: 'rgba(0,0,0,0.5)' }}><code className="font-mono">selectedValue</code>: string</span>
              <span style={{ color: 'rgba(0,0,0,0.5)' }}><code className="font-mono">onSelect</code>: (value) =&gt; void</span>
              <span style={{ color: 'rgba(0,0,0,0.5)' }}><code className="font-mono">variant?</code>: &ldquo;static&rdquo; | &ldquo;collapsible&rdquo;</span>
              <span style={{ color: 'rgba(0,0,0,0.5)' }}><code className="font-mono">defaultOpen?</code>: boolean (true)</span>
              <span style={{ color: 'rgba(0,0,0,0.5)' }}><code className="font-mono">disabled?</code>: boolean</span>
            </div>
          </div>
        </MetaBox>
      </section>

      {/* ═══════════════════════════════════════════════
          MOLECULE 2: SidebarPanel
         ═══════════════════════════════════════════════ */}
      <section>
        <h3 className="mb-1" style={{ fontSize: 'var(--text-lg)', color: 'rgba(0,0,0,0.85)' }}>SidebarPanel</h3>
        <p className="mb-4" style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.4)' }}>
          Molecule &mdash; Reusable sticky sidebar container (inline &amp; card variants)
        </p>
        <SpecTable
          rows={[
            [
              'WHY',
              'Captures the exact container pattern (sticky positioning, elevation, max-height, header/footer zones, scroll behavior) so all pages get identical placement by importing one component.',
            ],
            [
              'WHAT',
              'Flex column with optional header/footer and scrollable children zone. Two variants: "inline" (border-right, flush with parent) and "card" (standalone sticky card with rounded-[10px], shadow, border). Card variant hidden below lg.',
            ],
            [
              'WHEN',
              'Desktop filter sidebar (card variant, sticky). TOC sidebar (inline variant). Settings panel. Any context needing a fixed sidebar with scroll.',
            ],
            [
              'WHERE',
              'Report Store Listing page (card variant), Case Study page (inline variant for TOC), future pages.',
            ],
            [
              'HOW',
              '<SidebarPanel variant="card" stickyTop={72} header={...} footer={...}> {filterSections} </SidebarPanel>',
            ],
          ]}
        />
        <div className="flex gap-3 mb-4">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="px-3 py-1.5 transition-all cursor-pointer"
            style={{
              borderRadius: 'var(--radius-element)',
              fontSize: 'var(--text-xs)',
              backgroundColor: showSidebar ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0)',
              color: showSidebar ? 'rgba(255,255,255,1)' : 'rgba(0,0,0,0.5)',
              borderWidth: showSidebar ? '0' : '1px',
              borderStyle: 'solid',
              borderColor: 'rgba(0,0,0,0.1)',
            }}
          >
            {showSidebar ? 'Hide Panel' : 'Show Panel'}
          </button>
        </div>
        <ComponentPreview
          title="Inline variant with header + footer"
          description="Width: 14rem, scrollable body, optional zones"
        >
          <div
            className="flex overflow-hidden"
            style={{
              height: '320px',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: 'rgba(0,0,0,0.08)',
              borderRadius: '10px',
            }}
          >
            <SidebarPanel
              visible={showSidebar}
              header={
                <p className="uppercase tracking-wider" style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.5)' }}>
                  Filter Panel
                </p>
              }
              footer={
                <button
                  onClick={clearAll}
                  className="underline transition-colors cursor-pointer"
                  style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.4)' }}
                >
                  Reset all
                </button>
              }
            >
              <FilterAccordion
                title="Industry"
                options={industryOptions.slice(0, 5)}
                selectedValue={selectedIndustry}
                onSelect={setSelectedIndustry}
              />
              <FilterAccordion
                title="Format"
                options={formatOptions}
                selectedValue={selectedFormat}
                onSelect={setSelectedFormat}
              />
            </SidebarPanel>
            <div className="flex-1 p-6 flex items-center justify-center" style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.3)' }}>
              Card grid area
            </div>
          </div>
        </ComponentPreview>
        <ComponentPreview
          title="Card variant (sticky sidebar)"
          description="Production-style card with shadow, border-radius, auto-hidden below lg"
        >
          <div
            className="flex gap-4"
            style={{ height: '280px' }}
          >
            <div style={{ width: '240px', flexShrink: 0 }}>
              <SidebarPanel
                variant="card"
                visible={true}
                header={
                  <p className="uppercase tracking-wider" style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.5)' }}>
                    Filters
                  </p>
                }
                footer={
                  <p
                    className="text-center"
                    style={{ fontSize: 'var(--text-card-micro)', color: 'rgba(0,0,0,0.35)' }}
                  >
                    <span className="tabular-nums" style={{ color: 'rgba(0,0,0,0.55)' }}>47</span> reports
                  </p>
                }
              >
                <FilterAccordion
                  title="Format"
                  options={formatOptions}
                  selectedValue={selectedFormat}
                  onSelect={setSelectedFormat}
                />
              </SidebarPanel>
            </div>
            <div className="flex-1 flex items-center justify-center" style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.2)' }}>
              Content area
            </div>
          </div>
        </ComponentPreview>
        <MetaBox>
          <p className="mb-2" style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.4)' }}>Layout tokens &amp; props</p>
          <div className="grid grid-cols-2 gap-2 mb-2">
            {(
              [
                ['Width', '15rem (240px, w-60)'],
                ['Border', 'rgba(0,0,0,0.08)'],
                ['Shadow (card)', '0 1px 3px /0.06, 0 4px 12px /0.03'],
                ['Radius (card)', '10px'],
                ['Sticky top', '72px (below nav)'],
                ['Max-height (card)', 'calc(100vh - 88px)'],
              ] as const
            ).map(([k, v]) => (
              <div key={k}>
                <span style={{ fontSize: 'var(--text-card-micro)', color: 'rgba(0,0,0,0.4)' }}>
                  {k}:{' '}
                </span>
                <span style={{ fontSize: 'var(--text-card-micro)', color: 'rgba(0,0,0,0.6)' }}>
                  {v}
                </span>
              </div>
            ))}
          </div>
          <div>
            <p className="mb-1" style={{ fontSize: 'var(--text-card-micro)', color: 'rgba(0,0,0,0.4)' }}>Props</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1" style={{ fontSize: 'var(--text-card-micro)' }}>
              <span style={{ color: 'rgba(0,0,0,0.5)' }}><code className="font-mono">children</code>: ReactNode</span>
              <span style={{ color: 'rgba(0,0,0,0.5)' }}><code className="font-mono">header?</code>: ReactNode</span>
              <span style={{ color: 'rgba(0,0,0,0.5)' }}><code className="font-mono">footer?</code>: ReactNode</span>
              <span style={{ color: 'rgba(0,0,0,0.5)' }}><code className="font-mono">variant?</code>: &ldquo;inline&rdquo; | &ldquo;card&rdquo;</span>
              <span style={{ color: 'rgba(0,0,0,0.5)' }}><code className="font-mono">visible?</code>: boolean (true)</span>
              <span style={{ color: 'rgba(0,0,0,0.5)' }}><code className="font-mono">stickyTop?</code>: number (72)</span>
              <span style={{ color: 'rgba(0,0,0,0.5)' }}><code className="font-mono">width?</code>: string</span>
              <span style={{ color: 'rgba(0,0,0,0.5)' }}><code className="font-mono">scrollRef?</code>: RefObject</span>
            </div>
          </div>
        </MetaBox>
      </section>

      {/* ═══════════════════════════════════════════════
          MOLECULE 3: ActiveFilterChipBar
         ═══════════════════════════════════════════════ */}
      <section>
        <h3 className="mb-1" style={{ fontSize: 'var(--text-lg)', color: 'rgba(0,0,0,0.85)' }}>ActiveFilterChipBar</h3>
        <p className="mb-4" style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.4)' }}>
          Molecule &mdash; Bar of active FilterChip atoms with &ldquo;Clear all&rdquo;.
          Self-hides when empty.
        </p>
        <SpecTable
          rows={[
            [
              'WHY',
              'Users need a persistent summary of all active filters with one-click removal. Reduces cognitive load by externalizing filter state from the sidebar into the content area.',
            ],
            [
              'WHAT',
              'Horizontal bar with: [filter count label] [FilterChip x N] [Clear all button]. Returns null (no DOM) when filters array is empty. Border-top separator. Wraps on mobile.',
            ],
            [
              'WHEN',
              'Below the listing page toolbar, above the card grid. Appears when any filter dimension has a selection.',
            ],
            ['WHERE', 'Report Store Listing page, Surveys Listing page.'],
            [
              'HOW',
              '<ActiveFilterChipBar filters={activeChips} onClearAll={clearAllFilters} />',
            ],
          ]}
        />
        <ComponentPreview
          title="Live demo"
          description="Select filters in the accordions above to see chips appear"
        >
          <div
            className="p-4"
            style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(0,0,0,0.08)', borderRadius: 'var(--radius-element)' }}
          >
            <p className="mb-2" style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.4)' }}>
              Active filters:{' '}
              {activeFilters.length === 0 ? 'none (bar hidden)' : activeFilters.length}
            </p>
            <ActiveFilterChipBar filters={activeFilters} onClearAll={clearAll} />
            {activeFilters.length === 0 && (
              <p className="mt-2 italic" style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.25)' }}>
                Select an industry or format above to see the chip bar
              </p>
            )}
          </div>
        </ComponentPreview>
        <MetaBox>
          <p className="mb-2" style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.4)' }}>Font tokens &amp; props</p>
          <div className="flex gap-6 flex-wrap mb-2">
            <span style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.6)' }}>
              <code className="font-mono" style={{ color: 'rgba(0,0,0,0.5)' }}>--text-card-micro</code> (10px) &mdash; &ldquo;N FILTERS&rdquo; count label (uppercase + tracking)
            </span>
            <span style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.6)' }}>
              <code className="font-mono" style={{ color: 'rgba(0,0,0,0.5)' }}>--text-xs</code> (12.8px) &mdash; &ldquo;Clear all&rdquo; link
            </span>
          </div>
          <div>
            <p className="mb-1" style={{ fontSize: 'var(--text-card-micro)', color: 'rgba(0,0,0,0.4)' }}>Props</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1" style={{ fontSize: 'var(--text-card-micro)' }}>
              <span style={{ color: 'rgba(0,0,0,0.5)' }}><code className="font-mono">filters</code>: {'{'}label, category?, onRemove{'}'}[]</span>
              <span style={{ color: 'rgba(0,0,0,0.5)' }}><code className="font-mono">onClearAll?</code>: () =&gt; void</span>
            </div>
          </div>
        </MetaBox>
      </section>

      {/* ═══════════════════════════════════════════════
          MOLECULE 4: MobileFilterSheet
         ═══════════════════════════════════════════════ */}
      <section>
        <h3 className="mb-1" style={{ fontSize: 'var(--text-lg)', color: 'rgba(0,0,0,0.85)' }}>MobileFilterSheet</h3>
        <p className="mb-4" style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.4)' }}>
          Molecule &mdash; Bottom-slide sheet overlay for mobile filter access (&lt; lg
          breakpoints)
        </p>
        <SpecTable
          rows={[
            [
              'WHY',
              "Desktop sidebar is hidden below lg. Mobile users need filter access without navigating away. Bottom sheet is thumb-reachable (Fitts's Law) and preserves context (users see partial content behind overlay).",
            ],
            [
              'WHAT',
              'Fixed overlay: [backdrop] + [bottom-slide panel]. Panel contains: [drag handle bar] [header with Filters title + count badge + close X] [scrollable body = shared sidebarContent] [footer with "Show N results" CTA + optional "Clear all"]. Locks body scroll. Closes on Escape. Max-height 85vh.',
            ],
            [
              'WHEN',
              'Triggered by the SlidersHorizontal button visible at lg:hidden. The sidebarContent JSX is extracted and shared between desktop SidebarPanel and mobile MobileFilterSheet.',
            ],
            ['WHERE', 'Report Store Listing page (mobile), Surveys Listing page (mobile).'],
            [
              'HOW',
              '<MobileFilterSheet isOpen={open} onClose={close} activeCount={count} resultCount={results} onClearAll={clear}> {sidebarContent} </MobileFilterSheet>',
            ],
          ]}
        />
        <ComponentPreview
          title="Interactive demo"
          description="Click the button to open the mobile filter sheet"
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileSheetOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 transition-all cursor-pointer"
              style={{
                borderRadius: 'var(--radius-element)',
                fontSize: 'var(--text-xs)',
                backgroundColor: 'rgba(0,0,0,1)',
                color: 'rgba(255,255,255,1)',
              }}
            >
              <SlidersHorizontal size={14} />
              Open Mobile Filter Sheet
            </button>
            <span style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.3)' }}>
              Opens a full bottom-sheet overlay
            </span>
          </div>
          <MobileFilterSheet
            isOpen={mobileSheetOpen}
            onClose={() => setMobileSheetOpen(false)}
            activeCount={2}
            resultCount={47}
            onClearAll={() => setMobileSheetOpen(false)}
          >
            <div style={{ borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: 'rgba(0,0,0,0.06)' }}>
              <FilterSectionHeader
                icon={<Layers size={12} style={{ color: 'rgba(0,0,0,0.45)' }} />}
                label="Industries"
                isOpen={true}
                onToggle={() => {}}
                active
                activeCount={1}
              />
              <div className="pb-2">
                {demoIndustries.slice(0, 3).map((ind) => (
                  <FilterIndustryItem
                    key={ind.label}
                    label={ind.label}
                    count={ind.count}
                    selected={ind.label === 'Technology & Telecom'}
                    onClick={() => {}}
                  />
                ))}
              </div>
            </div>
            <div style={{ borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: 'rgba(0,0,0,0.06)' }}>
              <FilterSectionHeader
                icon={<MapPin size={12} style={{ color: 'rgba(0,0,0,0.45)' }} />}
                label="Regions"
                isOpen={true}
                onToggle={() => {}}
                activeCount={1}
                active
              />
              <div className="pb-2">
                {demoRegions.slice(0, 4).map((reg) => (
                  <FilterCheckboxItem
                    key={reg.label}
                    label={reg.label}
                    count={reg.count}
                    checked={reg.label === 'Global'}
                    onChange={() => {}}
                  />
                ))}
              </div>
            </div>
            <div style={{ borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: 'rgba(0,0,0,0.06)' }}>
              <FilterSectionHeader
                icon={<Calendar size={12} style={{ color: 'rgba(0,0,0,0.45)' }} />}
                label="Publish Year"
                isOpen={true}
                onToggle={() => {}}
              />
              <div className="pb-2">
                {['2026', '2025', '2024'].map((y) => (
                  <FilterCheckboxItem
                    key={y}
                    label={y}
                    checked={y === '2026'}
                    onChange={() => {}}
                  />
                ))}
              </div>
            </div>
          </MobileFilterSheet>
        </ComponentPreview>
        <MetaBox>
          <p className="mb-2" style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.4)' }}>Layout tokens, font tokens &amp; props</p>
          <div className="grid grid-cols-2 gap-2 mb-2">
            {(
              [
                ['Max height', '85vh'],
                ['Top radius', '10px'],
                ['Backdrop', 'rgba(0,0,0,0.4)'],
                ['Shadow', '0 -4px 20px rgba(0,0,0,0.12)'],
                ['Z-index', '50'],
                ['Animation', 'slideUp 250ms cubic-bezier(0.16, 1, 0.3, 1)'],
              ] as const
            ).map(([k, v]) => (
              <div key={k}>
                <span style={{ fontSize: 'var(--text-card-micro)', color: 'rgba(0,0,0,0.4)' }}>
                  {k}:{' '}
                </span>
                <span style={{ fontSize: 'var(--text-card-micro)', color: 'rgba(0,0,0,0.6)' }}>
                  {v}
                </span>
              </div>
            ))}
          </div>
          <div className="flex gap-6 flex-wrap mb-2">
            <span style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.6)' }}>
              <code className="font-mono" style={{ color: 'rgba(0,0,0,0.5)' }}>--text-xs</code> (12.8px) &mdash; header title, footer CTA
            </span>
            <span style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.6)' }}>
              <code className="font-mono" style={{ color: 'rgba(0,0,0,0.5)' }}>--text-card-micro</code> (10px) &mdash; active count badge
            </span>
          </div>
          <div>
            <p className="mb-1" style={{ fontSize: 'var(--text-card-micro)', color: 'rgba(0,0,0,0.4)' }}>Props</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1" style={{ fontSize: 'var(--text-card-micro)' }}>
              <span style={{ color: 'rgba(0,0,0,0.5)' }}><code className="font-mono">isOpen</code>: boolean</span>
              <span style={{ color: 'rgba(0,0,0,0.5)' }}><code className="font-mono">onClose</code>: () =&gt; void</span>
              <span style={{ color: 'rgba(0,0,0,0.5)' }}><code className="font-mono">activeCount?</code>: number</span>
              <span style={{ color: 'rgba(0,0,0,0.5)' }}><code className="font-mono">resultCount?</code>: number</span>
              <span style={{ color: 'rgba(0,0,0,0.5)' }}><code className="font-mono">onClearAll?</code>: () =&gt; void</span>
              <span style={{ color: 'rgba(0,0,0,0.5)' }}><code className="font-mono">children</code>: ReactNode</span>
            </div>
          </div>
        </MetaBox>
      </section>

      {/* ═══════════════════════════════════════════════
          FULL COMPOSITION
         ═══════════════════════════════════════════════ */}
      <section>
        <h3 className="mb-1" style={{ fontSize: 'var(--text-lg)', color: 'rgba(0,0,0,0.85)' }}>Full Composition</h3>
        <p className="mb-4" style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.4)' }}>
          All 10 components composing together &mdash; mirrors the Report Store Listing page
          sidebar
        </p>
        <SpecTable
          rows={[
            [
              'WHY',
              'Demonstrates that all atoms and molecules compose into a production-ready filter sidebar. Proves the atomic decomposition works end-to-end with real filter state, real dimensions, and real interaction patterns.',
            ],
            [
              'WHAT',
              'SidebarPanel(card) containing: FilterSearchInput + FilterSectionHeader + FilterIndustryItem rows + FilterCheckboxItem rows + ActiveFilterChipBar. Shared sidebarContent JSX drives both desktop sidebar and mobile sheet.',
            ],
            [
              'WHEN',
              'On any listing page that needs multi-dimensional filtering. Report Store, Surveys, future Consulting project listings.',
            ],
            [
              'WHERE',
              'Desktop: SidebarPanel(card) sticky sidebar. Mobile: MobileFilterSheet bottom drawer. Both use identical sidebarContent.',
            ],
            [
              'HOW',
              'Extract sidebarContent as JSX variable. Pass to <SidebarPanel>{sidebarContent}</SidebarPanel> for desktop and <MobileFilterSheet>{sidebarContent}</MobileFilterSheet> for mobile.',
            ],
          ]}
        />

        <div
          className="overflow-hidden mt-6"
          style={{
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: 'rgba(0,0,0,0.1)',
            borderRadius: '10px',
            backgroundColor: 'rgba(255,255,255,1)',
            boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
          }}
        >
          {/* Active chips header */}
          <div className="px-6 py-4" style={{ borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: 'rgba(0,0,0,0.06)' }}>
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h4 style={{ fontSize: 'var(--text-sm)' }}>All Reports</h4>
                <p
                  className="mt-0.5"
                  style={{ fontSize: 'var(--text-card-micro)', color: 'rgba(0,0,0,0.4)' }}
                >
                  <span className="tabular-nums" style={{ color: 'rgba(0,0,0,0.7)' }}>47</span> reports found
                </p>
              </div>
              <FilterSearchInput
                value={compSearch}
                onChange={setCompSearch}
                placeholder="Search reports..."
                minWidth="200px"
              />
            </div>
            <ActiveFilterChipBar filters={compActiveChips} onClearAll={clearComp} />
          </div>

          <div className="flex" style={{ height: '420px' }}>
            {/* Desktop sidebar */}
            <div
              className="flex-shrink-0 hidden sm:block overflow-y-auto"
              style={{
                width: '240px',
                borderRightWidth: '1px',
                borderRightStyle: 'solid',
                borderRightColor: 'rgba(0,0,0,0.06)',
              }}
            >
              {/* Sidebar header */}
              <div
                className="p-4"
                style={{
                  borderBottomWidth: '1px',
                  borderBottomStyle: 'solid',
                  borderBottomColor: 'rgba(0,0,0,0.06)',
                  backgroundColor: 'rgba(250,250,250,1)',
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-7 h-7 flex items-center justify-center"
                      style={{
                        borderRadius: 'var(--radius-element)',
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        borderColor: 'rgba(0,0,0,0.08)',
                        backgroundColor: 'rgba(255,255,255,1)',
                      }}
                    >
                      <SlidersHorizontal size={14} style={{ color: 'rgba(0,0,0,0.45)' }} />
                    </div>
                    <h3
                      className="uppercase tracking-[0.1em]"
                      style={{
                        fontSize: 'var(--text-card-micro)',
                        color: 'rgba(0,0,0,0.5)',
                      }}
                    >
                      Filters
                    </h3>
                    {compActiveCount > 0 && (
                      <span
                        className="min-w-5 h-5 px-1.5 rounded-full flex items-center justify-center"
                        style={{ fontSize: '9px', backgroundColor: 'rgba(0,0,0,1)', color: 'rgba(255,255,255,1)' }}
                      >
                        {compActiveCount}
                      </span>
                    )}
                  </div>
                  {compActiveCount > 0 && (
                    <button
                      onClick={clearComp}
                      className="flex items-center gap-1 transition-colors cursor-pointer"
                      style={{
                        fontSize: 'var(--text-card-micro)',
                        color: 'rgba(0,0,0,0.4)',
                      }}
                    >
                      <X size={12} />
                      Clear all
                    </button>
                  )}
                </div>
              </div>

              {/* Industries section */}
              <div style={{ borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: 'rgba(0,0,0,0.06)' }}>
                <FilterSectionHeader
                  icon={<Layers size={12} style={{ color: 'rgba(0,0,0,0.45)' }} />}
                  label="Industries"
                  isOpen={compIndustriesOpen}
                  onToggle={() => setCompIndustriesOpen(!compIndustriesOpen)}
                  active={!!compIndustry}
                  activeCount={compIndustry ? 1 : 0}
                />
                {compIndustriesOpen &&
                  demoIndustries.map((ind) => (
                    <FilterIndustryItem
                      key={ind.label}
                      label={ind.label}
                      count={ind.count}
                      selected={compIndustry === ind.label}
                      onClick={() =>
                        setCompIndustry(
                          compIndustry === ind.label ? null : ind.label,
                        )
                      }
                    />
                  ))}
              </div>

              {/* Regions section */}
              <div style={{ borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: 'rgba(0,0,0,0.06)' }}>
                <FilterSectionHeader
                  icon={<MapPin size={12} style={{ color: 'rgba(0,0,0,0.45)' }} />}
                  label="Regions"
                  isOpen={compRegionsOpen}
                  onToggle={() => setCompRegionsOpen(!compRegionsOpen)}
                  active={compRegions.length > 0}
                  activeCount={compRegions.length}
                />
                {compRegionsOpen &&
                  demoRegions.map((reg) => (
                    <FilterCheckboxItem
                      key={reg.label}
                      label={reg.label}
                      count={reg.count}
                      checked={compRegions.includes(reg.label)}
                      onChange={() =>
                        setCompRegions((prev) =>
                          prev.includes(reg.label)
                            ? prev.filter((x) => x !== reg.label)
                            : [...prev, reg.label],
                        )
                      }
                    />
                  ))}
              </div>

              {/* Years section */}
              <div style={{ borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: 'rgba(0,0,0,0.06)' }}>
                <FilterSectionHeader
                  icon={<Calendar size={12} style={{ color: 'rgba(0,0,0,0.45)' }} />}
                  label="Publish Year"
                  isOpen={compYearsOpen}
                  onToggle={() => setCompYearsOpen(!compYearsOpen)}
                  active={compYears.length > 0}
                  activeCount={compYears.length}
                />
                {compYearsOpen &&
                  ['2026', '2025', '2024', '2023'].map((y) => (
                    <FilterCheckboxItem
                      key={y}
                      label={y}
                      checked={compYears.includes(y)}
                      onChange={() =>
                        setCompYears((prev) =>
                          prev.includes(y)
                            ? prev.filter((x) => x !== y)
                            : [...prev, y],
                        )
                      }
                    />
                  ))}
              </div>

              {/* Footer */}
              <div
                className="p-3"
                style={{ backgroundColor: 'rgba(250,250,250,1)' }}
              >
                <p
                  className="text-center"
                  style={{
                    fontSize: 'var(--text-card-micro)',
                    color: 'rgba(0,0,0,0.35)',
                  }}
                >
                  <span
                    className="tabular-nums"
                    style={{ color: 'rgba(0,0,0,0.55)' }}
                  >
                    20,836+
                  </span>{' '}
                  reports available
                </p>
              </div>
            </div>

            {/* Content area */}
            <div className="flex-1 p-6 flex items-center justify-center" style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.2)' }}>
              <div className="text-center">
                <p>Card grid renders here</p>
                <p className="mt-2" style={{ color: 'rgba(0,0,0,0.3)' }}>
                  Try selecting filters in the sidebar
                </p>
                {compActiveCount > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2 justify-center">
                    {compActiveChips.map((c, i) => (
                      <FilterChip key={i} label={c.label} category={c.category} onRemove={c.onRemove} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          USE CASES & SCENARIOS
         ═══════════════════════════════════════════════ */}
      <section>
        <h3 className="mb-1" style={{ fontSize: 'var(--text-lg)', color: 'rgba(0,0,0,0.85)' }}>Use Cases &amp; Scenarios</h3>
        <p className="mb-6" style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.4)' }}>
          Where and how the filter system serves each pillar
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              pillar: 'Research',
              scenario: 'Report Store Listing',
              dimensions: [
                'Industry (single-select, hierarchical)',
                'Sub-industries (multi-select, dependent)',
                'Tags (multi-select, dependent on industry)',
                'Regions (multi-select)',
                'Publish Year (multi-select)',
              ],
              pattern:
                'Desktop: SidebarPanel(card) + all atoms. Mobile: MobileFilterSheet. ActiveFilterChipBar above card grid.',
            },
            {
              pillar: 'Surveys',
              scenario: 'Survey Listing',
              dimensions: [
                'Category (single-select)',
                'Status (multi-select)',
                'Date Range (custom)',
                'Response Count (range)',
              ],
              pattern:
                'Same SidebarPanel + atoms with survey-specific filter dimensions. FilterAccordion for simple groups.',
            },
            {
              pillar: 'Consulting',
              scenario: 'Project Portfolio (future)',
              dimensions: [
                'Service Line (single-select)',
                'Industry Vertical (single-select)',
                'Region (multi-select)',
                'Engagement Type (multi-select)',
              ],
              pattern:
                'Reuse same atoms/molecules. FilterSectionHeader + FilterCheckboxItem for most dimensions.',
            },
          ].map((uc) => (
            <div
              key={uc.pillar}
              className="p-4"
              style={{
                borderRadius: '10px',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: 'rgba(0,0,0,0.06)',
                backgroundColor: 'rgba(0,0,0,0.012)',
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="uppercase tracking-[0.08em]"
                  style={{
                    fontSize: 'var(--text-card-micro)',
                    color: 'rgba(0,0,0,0.5)',
                  }}
                >
                  {uc.pillar}
                </span>
                <span style={{ color: 'rgba(0,0,0,0.15)' }}>&middot;</span>
                <span
                  style={{
                    fontSize: 'var(--text-card-micro)',
                    color: 'rgba(0,0,0,0.35)',
                  }}
                >
                  {uc.scenario}
                </span>
              </div>
              <p
                className="mb-2"
                style={{
                  fontSize: 'var(--text-card-micro)',
                  color: 'rgba(0,0,0,0.4)',
                  letterSpacing: '0.06em',
                }}
              >
                FILTER DIMENSIONS
              </p>
              <ul className="space-y-1 mb-3">
                {uc.dimensions.map((d) => (
                  <li key={d} className="flex items-start gap-1.5">
                    <ChevronRight
                      size={10}
                      className="mt-0.5 flex-shrink-0"
                      style={{ color: 'rgba(0,0,0,0.2)' }}
                    />
                    <span
                      style={{
                        fontSize: 'var(--text-xs)',
                        color: 'rgba(0,0,0,0.5)',
                      }}
                    >
                      {d}
                    </span>
                  </li>
                ))}
              </ul>
              <p
                className="mb-1"
                style={{
                  fontSize: 'var(--text-card-micro)',
                  color: 'rgba(0,0,0,0.4)',
                  letterSpacing: '0.06em',
                }}
              >
                COMPOSITION PATTERN
              </p>
              <p
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'rgba(0,0,0,0.45)',
                  lineHeight: 1.5,
                }}
              >
                {uc.pattern}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          INTERACTION STATE MATRIX
         ═══════════════════════════════════════════════ */}
      <section>
        <h3 className="mb-1" style={{ fontSize: 'var(--text-lg)', color: 'rgba(0,0,0,0.85)' }}>Interaction State Matrix</h3>
        <p className="mb-6" style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.4)' }}>
          10 components &times; 6 states &mdash; all implemented
        </p>

        <div className="overflow-x-auto">
          <table className="w-full" style={{ fontSize: 'var(--text-xs)' }}>
            <thead>
              <tr style={{ borderBottomWidth: '2px', borderBottomStyle: 'solid', borderBottomColor: 'rgba(0,0,0,0.1)' }}>
                {[
                  'Component',
                  'Default',
                  'Hover',
                  'Selected/Checked',
                  'Focus-Vis',
                  'Disabled',
                  'Pressed',
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left py-2 px-3"
                    style={{ color: 'rgba(0,0,0,0.4)' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                [
                  'FilterSearchInput',
                  'border /[.10]',
                  'border /[.25]',
                  'N/A',
                  'border /[.90]',
                  'opacity-40',
                  'clear: scale-0.9',
                ],
                [
                  'FilterCheckbox',
                  'text-black/50',
                  'text-black/[.85]',
                  'black/90+bg/4+borderL',
                  'red ring',
                  'opacity-40',
                  'scale-0.98',
                ],
                [
                  'FilterCheckboxItem',
                  'border /[.18]',
                  'subtle bg',
                  'filled+check+borderL',
                  'N/A (role=cb)',
                  'N/A',
                  'N/A',
                ],
                [
                  'FilterSectionHeader',
                  'bg /[.016]',
                  'N/A',
                  'bg /[.024]+label /[.7]',
                  'N/A',
                  'opacity-55+lock',
                  'N/A',
                ],
                [
                  'FilterIndustryItem',
                  'text /[.5]',
                  'subtle bg',
                  'borderL 3px+chevron\u2193',
                  'N/A',
                  'N/A',
                  'N/A',
                ],
                [
                  'FilterChip',
                  'bg-black/[.06]',
                  'X: black/50',
                  'N/A',
                  'red ring',
                  'N/A',
                  'X: scale-0.9',
                ],
                [
                  'FilterAccordion',
                  'text-black/50',
                  'text-black/[.7]',
                  'chevron 180\u00B0',
                  'red ring',
                  'opacity-40',
                  'scale-0.98',
                ],
                [
                  'SidebarPanel',
                  'border-r /[.06]',
                  'N/A',
                  'N/A',
                  'N/A',
                  'visible=false',
                  'N/A',
                ],
                [
                  'ActiveFilterChipBar',
                  'border-t /[.06]',
                  'clear: /[.8]',
                  'N/A',
                  'red ring',
                  '\u2205 \u2192 null',
                  'scale-0.95',
                ],
                [
                  'MobileFilterSheet',
                  'N/A (closed)',
                  'backdrop click',
                  'N/A',
                  'Escape key',
                  'N/A',
                  'CTA: bg /[.85]',
                ],
              ].map((row) => (
                <tr key={row[0]} style={{ borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: 'rgba(0,0,0,0.04)' }}>
                  {row.map((cell, i) => (
                    <td
                      key={i}
                      className={`py-2 px-3 ${i === 0 ? 'font-mono' : ''}`}
                      style={{ color: i === 0 ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.5)' }}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          DECISION GUIDE
         ═══════════════════════════════════════════════ */}
      <section>
        <h3 className="mb-1" style={{ fontSize: 'var(--text-lg)', color: 'rgba(0,0,0,0.85)' }}>Which Component Should I Use?</h3>
        <p className="mb-6" style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.4)' }}>
          Decision guide for choosing the right filter atom
        </p>

        <div className="overflow-x-auto">
          <table className="w-full" style={{ fontSize: 'var(--text-xs)' }}>
            <thead>
              <tr style={{ borderBottomWidth: '2px', borderBottomStyle: 'solid', borderBottomColor: 'rgba(0,0,0,0.1)' }}>
                {['Scenario', 'Selection Type', 'Component', 'Example'].map(
                  (h) => (
                    <th
                      key={h}
                      className="text-left py-2 px-3"
                      style={{ color: 'rgba(0,0,0,0.4)' }}
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {[
                [
                  'Simple list, pick one',
                  'Single-select',
                  'FilterCheckbox (via FilterAccordion)',
                  'Format: Full Report / Brief / Data Pack',
                ],
                [
                  'Checkbox list, pick many',
                  'Multi-select',
                  'FilterCheckboxItem',
                  'Regions: Global, Americas, Europe...',
                ],
                [
                  'Hierarchical with sub-items',
                  'Single-select + expand',
                  'FilterIndustryItem',
                  'Industry: Technology > AI, Cloud...',
                ],
                [
                  'Section toggle header',
                  'Open/close',
                  'FilterSectionHeader',
                  'Industries [v] / Tags [locked]',
                ],
                [
                  'Show active selections',
                  'Dismissible chips',
                  'FilterChip + ActiveFilterChipBar',
                  'Year: 2026 [x] | Europe [x]',
                ],
                [
                  'Search within filter options',
                  'Text input',
                  'FilterSearchInput',
                  'Type to narrow 14+ industries',
                ],
                [
                  'Desktop filter container',
                  'Layout',
                  'SidebarPanel (card variant)',
                  'Sticky sidebar with scroll',
                ],
                [
                  'Mobile filter access',
                  'Layout',
                  'MobileFilterSheet',
                  'Bottom sheet on < lg screens',
                ],
              ].map((row) => (
                <tr key={row[0]} style={{ borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: 'rgba(0,0,0,0.04)' }}>
                  <td className="py-2 px-3" style={{ color: 'rgba(0,0,0,0.6)' }}>{row[0]}</td>
                  <td className="py-2 px-3" style={{ color: 'rgba(0,0,0,0.5)' }}>{row[1]}</td>
                  <td className="py-2 px-3 font-mono" style={{ color: 'rgba(0,0,0,0.6)' }}>
                    {row[2]}
                  </td>
                  <td className="py-2 px-3 italic" style={{ color: 'rgba(0,0,0,0.4)' }}>{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          IMPORT REFERENCE
         ═══════════════════════════════════════════════ */}
      <section>
        <h3 className="mb-1" style={{ fontSize: 'var(--text-lg)', color: 'rgba(0,0,0,0.85)' }}>Import Reference</h3>
        <p className="mb-6" style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.4)' }}>
          Copy-paste import blocks for quick setup
        </p>

        <div className="space-y-4">
          <div
            className="p-4 overflow-x-auto"
            style={{
              backgroundColor: 'rgba(0,0,0,0.025)',
              borderRadius: '10px',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: 'rgba(0,0,0,0.06)',
            }}
          >
            <p className="mb-2 uppercase tracking-[0.08em]" style={{ fontSize: 'var(--text-card-micro)', color: 'rgba(0,0,0,0.4)' }}>
              Atoms (from root)
            </p>
            <pre className="font-mono" style={{ fontSize: 'var(--text-card-micro)', color: 'rgba(0,0,0,0.55)', lineHeight: 1.7 }}>
{`import { FilterSearchInput } from '@/app/components/FilterSearchInput';
import { FilterCheckbox } from '@/app/components/FilterCheckbox';
import { FilterCheckboxItem } from '@/app/components/FilterCheckboxItem';
import { FilterSectionHeader } from '@/app/components/FilterSectionHeader';
import { FilterIndustryItem } from '@/app/components/FilterIndustryItem';
import { FilterChip } from '@/app/components/FilterChip';`}
            </pre>
          </div>

          <div
            className="p-4 overflow-x-auto"
            style={{
              backgroundColor: 'rgba(0,0,0,0.025)',
              borderRadius: '10px',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: 'rgba(0,0,0,0.06)',
            }}
          >
            <p className="mb-2 uppercase tracking-[0.08em]" style={{ fontSize: 'var(--text-card-micro)', color: 'rgba(0,0,0,0.4)' }}>
              Molecules (from barrel)
            </p>
            <pre className="font-mono" style={{ fontSize: 'var(--text-card-micro)', color: 'rgba(0,0,0,0.55)', lineHeight: 1.7 }}>
{`import {
  FilterAccordion,
  SidebarPanel,
  ActiveFilterChipBar,
  MobileFilterSheet,
} from '@/app/components/molecules';`}
            </pre>
          </div>

          <div
            className="p-4 overflow-x-auto"
            style={{
              backgroundColor: 'rgba(0,0,0,0.025)',
              borderRadius: '10px',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: 'rgba(0,0,0,0.06)',
            }}
          >
            <p className="mb-2 uppercase tracking-[0.08em]" style={{ fontSize: 'var(--text-card-micro)', color: 'rgba(0,0,0,0.4)' }}>
              Common Lucide icons for filter UI
            </p>
            <pre className="font-mono" style={{ fontSize: 'var(--text-card-micro)', color: 'rgba(0,0,0,0.55)', lineHeight: 1.7 }}>
{`import {
  Layers,          // Industries section icon
  Tag,             // Tags section icon
  MapPin,          // Regions section icon
  Calendar,        // Publish Year section icon
  SlidersHorizontal, // Mobile filter trigger button
  Lock,            // Disabled section trailing icon
  X,               // Close / clear actions
} from 'lucide-react';`}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}
