import { useState } from 'react';
import { DocSection } from '@/app/components/FoundationsContent';
import { Button } from '@/app/components/Button';
import { ChevronRight, Copy, Check } from 'lucide-react';
import { ScrollFade } from '@/app/components/molecules/ScrollFade';

// ============================================
// HELPER — ComponentPreview
// ============================================

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
    <div className="border border-black/8 rounded-[10px] overflow-hidden mb-6">
      <div className="bg-black/[0.02] px-6 py-4 border-b border-black/8">
        <h3 className="font-semibold text-sm mb-1">{title}</h3>
        {description && <p className="text-xs text-black/60">{description}</p>}
      </div>
      <div className="p-8 bg-white">{children}</div>
    </div>
  );
}

// ============================================
// HELPER — CodeBlock
// ============================================

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative bg-black/5 rounded-[5px] p-4 border border-black/8">
      <button
        onClick={copyCode}
        className="absolute top-3 right-3 p-2 rounded bg-white/80 hover:bg-white transition-colors"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
      <pre className="text-xs font-mono text-black/80 overflow-x-auto pr-12">
        {code}
      </pre>
    </div>
  );
}

// ============================================
// DEMO — Solid Tabs (Pill / Border)
// ============================================

function SolidTabsDemo() {
  const [activePrimary, setActivePrimary] = useState(0);
  const [activeSub, setActiveSub] = useState(0);

  const primaryTabs = [
    { label: 'Healthcare', count: 2847 },
    { label: 'Technology & Telecom', count: 3215 },
    { label: 'Banking & Financial Services', count: 1892 },
    { label: 'Energy & Utilities', count: 1456 },
    { label: 'Consumer & Retail', count: 2134 },
    { label: 'Manufacturing', count: 1678 },
    { label: 'Automotive & Transportation', count: 1543 },
    { label: 'Food & Beverage', count: 1234 },
    { label: 'Education & Training', count: 876 },
    { label: 'Defense & Security', count: 654 },
    { label: 'Agriculture', count: 987 },
    { label: 'Media & Entertainment', count: 1123 },
    { label: 'Mining & Chemicals', count: 765 },
    { label: 'Public Sector', count: 432 },
  ];

  const subTabs = [
    { label: 'All', count: 19 },
    { label: 'Ambulatory Health Care Services', count: undefined },
    { label: 'Hospitals', count: 2 },
    { label: 'Nursing and Residential Care', count: undefined },
    { label: 'Social Assistance', count: undefined },
    { label: 'General Medical and Surgical Hospitals', count: 3 },
    { label: 'Specialty Hospitals', count: 1 },
    { label: 'Outpatient Care Centers', count: 4 },
    { label: 'Ambulatory Health Services', count: 3 },
    { label: "Physicians' Offices", count: 1 },
    { label: 'Dental Services', count: 1 },
    { label: 'Home Health Care Services', count: 2 },
    { label: 'Nursing Care Facilities', count: 1 },
    { label: 'Assisted Living Facilities', count: 1 },
  ];

  return (
    <ComponentPreview
      title="Solid Tabs — Interactive Demo"
      description="Primary industry row + sub-industry row. Scroll-fade right edge with hover arrow. Click to switch."
    >
      <div className="space-y-4">
        {/* Primary row */}
        <ScrollFade showButtons className="pb-1">
          <div className="flex gap-1.5 min-w-max">
            {primaryTabs.map((tab, i) => (
              <button
                key={tab.label}
                onClick={() => {
                  setActivePrimary(i);
                  setActiveSub(0);
                }}
                className={`px-3.5 py-2.5 sm:py-1.5 transition-all whitespace-nowrap cursor-pointer ${
                  activePrimary === i
                    ? 'bg-black text-white'
                    : 'bg-transparent text-black/50 hover:text-black hover:border-black/30'
                }`}
                style={{
                  fontSize: 'var(--text-nav)',
                  borderRadius: 'var(--radius-element)',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor:
                    activePrimary === i ? 'rgba(0,0,0,1)' : 'var(--warm-500)',
                }}
              >
                {tab.label}
                <span
                  className="ml-1.5 opacity-60"
                  style={{ fontSize: 'var(--text-xs)' }}
                >
                  ({tab.count.toLocaleString()})
                </span>
              </button>
            ))}
          </div>
        </ScrollFade>

        {/* Sub row */}
        <ScrollFade showButtons>
          <div className="flex gap-1.5 min-w-max">
            {subTabs.map((tab, i) => (
              <button
                key={tab.label}
                onClick={() => setActiveSub(i)}
                className={`px-2.5 py-2 sm:py-1 transition-all whitespace-nowrap cursor-pointer ${
                  activeSub === i
                    ? 'bg-black text-white'
                    : 'bg-transparent text-black/45 hover:text-black hover:border-black/30'
                }`}
                style={{
                  fontSize: 'var(--text-2xs)',
                  borderRadius: 'var(--radius-element)',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor:
                    activeSub === i ? 'rgba(0,0,0,1)' : 'var(--warm-500)',
                }}
              >
                {tab.label}
                {tab.count != null && (
                  <span className="ml-1 opacity-60">({tab.count})</span>
                )}
              </button>
            ))}
          </div>
        </ScrollFade>
      </div>
    </ComponentPreview>
  );
}

// ============================================
// DEMO — Line Tabs (Underline)
// ============================================

function LineTabsDemo() {
  const [activeLineTab, setActiveLineTab] = useState(0);

  const lineTabs = [
    { label: 'Trending Now', count: 48 },
    { label: 'New This Week', count: 24 },
    { label: 'Most Downloaded', count: 156 },
    { label: 'Recently Updated', count: 89 },
  ];

  return (
    <ComponentPreview
      title="Line Tabs — Interactive Demo"
      description="Underline-style tabs with pill count badges and scroll-fade. Used for Quick Access sections."
    >
      <div>
        <ScrollFade showButtons>
          <div
            className="flex items-center w-full"
            style={{
              borderBottomWidth: '1px',
              borderBottomStyle: 'solid',
              borderBottomColor: 'rgba(0,0,0,0.06)',
            }}
          >
            {lineTabs.map((tab, i) => (
              <button
                key={tab.label}
                onClick={() => setActiveLineTab(i)}
                className="relative flex items-center gap-2 px-4 py-2.5 whitespace-nowrap transition-all cursor-pointer"
                style={{
                  fontSize: 'var(--text-nav)',
                  color:
                    activeLineTab === i
                      ? 'rgba(0,0,0,1)'
                      : 'rgba(0,0,0,0.4)',
                }}
              >
                {tab.label}
                <span
                  className="inline-flex items-center justify-center px-1.5 py-0.5 tabular-nums transition-all"
                  style={{
                    fontSize: 'var(--badge-xs-font, 10px)',
                    borderRadius: '9999px',
                    backgroundColor:
                      activeLineTab === i
                        ? 'rgba(0,0,0,0.08)'
                        : 'rgba(0,0,0,0.04)',
                    color:
                      activeLineTab === i
                        ? 'rgba(0,0,0,0.7)'
                        : 'rgba(0,0,0,0.3)',
                    minWidth: '20px',
                  }}
                >
                  {tab.count}
                </span>
                {activeLineTab === i && (
                  <span
                    className="absolute bottom-0 left-4 right-4 h-[2px]"
                    style={{
                      backgroundColor: 'rgba(0,0,0,1)',
                      borderRadius: '1px 1px 0 0',
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </ScrollFade>

        <div
          className="p-6"
          style={{
            borderWidth: '0 1px 1px 1px',
            borderStyle: 'solid',
            borderColor: 'rgba(0,0,0,0.06)',
            borderRadius: '0 0 5px 5px',
          }}
        >
          <p className="text-sm" style={{ color: 'rgba(0,0,0,0.6)' }}>
            Showing content for:{' '}
            <span style={{ color: 'rgba(0,0,0,0.9)' }}>
              {lineTabs[activeLineTab].label}
            </span>{' '}
            ({lineTabs[activeLineTab].count} reports)
          </p>
        </div>
      </div>
    </ComponentPreview>
  );
}

// ============================================
// NAVIGATION DOCUMENTATION — Main Export
// ============================================

export function NavigationContent() {
  return (
    <div className="space-y-12">
      <DocSection
        title="Navigation Components"
        why="Navigation helps users understand where they are and move efficiently through the interface"
        what="Navigation patterns including navbars, breadcrumbs, tabs, and pagination"
        when="Use for site navigation, content organization, and wayfinding"
      >
        <p className="text-black/70">
          Clear navigation is essential for usability - it should always be
          accessible and indicate current location.
        </p>
      </DocSection>

      {/* Navbar */}
      <section>
        <h3 className="text-xl font-normal mb-6">Navigation Bar</h3>

        <ComponentPreview title="Horizontal Navbar">
          <nav className="flex items-center justify-between p-4 border border-black/8 rounded-[5px]">
            <div className="flex items-center gap-8">
              <div className="font-semibold">Brand</div>
              <div className="flex gap-6">
                {['Home', 'Products', 'About', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-sm hover:text-black/70 transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
            <Button variant="primary" size="sm">
              Sign In
            </Button>
          </nav>
        </ComponentPreview>
      </section>

      {/* Breadcrumbs */}
      <section>
        <h3 className="text-xl font-normal mb-6">Breadcrumbs</h3>

        <ComponentPreview title="Breadcrumb Navigation">
          <nav className="flex items-center gap-2 text-sm">
            <a
              href="#"
              className="text-black/60 hover:text-black transition-colors"
            >
              Home
            </a>
            <ChevronRight size={16} className="text-black/40" />
            <a
              href="#"
              className="text-black/60 hover:text-black transition-colors"
            >
              Products
            </a>
            <ChevronRight size={16} className="text-black/40" />
            <span className="text-black font-medium">Category</span>
          </nav>
        </ComponentPreview>
      </section>

      {/* ━━ Tabs — Two Variants ━━ */}
      <section>
        <h3 className="text-xl font-normal mb-2">Tabs</h3>
        <p className="text-sm text-black/60 mb-6">
          Two tab variants used across Product pages. Both support horizontal
          scrolling for overflow, optional count badges, and smooth transitions.
          Used in Report Store for industry filtering and content categorization.
        </p>

        {/* Variant 1: Solid Tabs */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <h4 className="font-medium">Variant 1 — Solid Tabs</h4>
            <span
              className="text-[10px] px-2 py-0.5 rounded-[5px]"
              style={{
                backgroundColor: 'rgba(0,0,0,0.05)',
                color: 'rgba(0,0,0,0.5)',
              }}
            >
              Pill / Border
            </span>
          </div>
          <SolidTabsDemo />
          <CodeBlock
            code={`// Solid Tabs — Pill/Border variant
// Active: black bg, white text, black border
// Inactive: transparent bg, warm-500 border, muted text

<div className="overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
  <div className="flex gap-1.5 min-w-max">
    {tabs.map((tab, i) => (
      <button
        key={tab.label}
        onClick={() => setActive(i)}
        className={\`px-3.5 py-1.5 transition-all whitespace-nowrap border \${
          active === i
            ? 'bg-black text-white border-black'
            : 'bg-transparent text-black/50 hover:text-black hover:border-black/30'
        }\`}
        style={{
          fontSize: 'var(--text-nav)',
          borderRadius: 'var(--radius-element)',
          borderColor: active !== i ? 'var(--warm-500)' : undefined,
        }}
      >
        {tab.label}
        <span className="ml-1.5 opacity-60"
          style={{ fontSize: 'var(--text-xs)' }}>
          ({tab.count.toLocaleString()})
        </span>
      </button>
    ))}
  </div>
</div>`}
          />
          <div className="border border-black/8 rounded-[10px] overflow-hidden mt-4">
            <div className="bg-black/[0.02] px-6 py-3 border-b border-black/8">
              <span className="font-semibold text-sm">
                Solid Tabs — Specs
              </span>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr
                  className="border-b border-black/8"
                  style={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                >
                  <th
                    className="text-left p-3 font-medium"
                    style={{
                      color: 'rgba(0,0,0,0.5)',
                      fontSize: 'var(--text-xs)',
                    }}
                  >
                    Property
                  </th>
                  <th
                    className="text-left p-3 font-medium"
                    style={{
                      color: 'rgba(0,0,0,0.5)',
                      fontSize: 'var(--text-xs)',
                    }}
                  >
                    Active
                  </th>
                  <th
                    className="text-left p-3 font-medium"
                    style={{
                      color: 'rgba(0,0,0,0.5)',
                      fontSize: 'var(--text-xs)',
                    }}
                  >
                    Inactive
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/8">
                <tr>
                  <td
                    className="p-3 font-mono text-xs"
                    style={{ color: 'rgba(0,0,0,0.6)' }}
                  >
                    background
                  </td>
                  <td className="p-3 text-xs">black</td>
                  <td className="p-3 text-xs">transparent</td>
                </tr>
                <tr>
                  <td
                    className="p-3 font-mono text-xs"
                    style={{ color: 'rgba(0,0,0,0.6)' }}
                  >
                    text
                  </td>
                  <td className="p-3 text-xs">white</td>
                  <td className="p-3 text-xs">black/50</td>
                </tr>
                <tr>
                  <td
                    className="p-3 font-mono text-xs"
                    style={{ color: 'rgba(0,0,0,0.6)' }}
                  >
                    border
                  </td>
                  <td className="p-3 text-xs">black</td>
                  <td className="p-3 text-xs">var(--warm-500)</td>
                </tr>
                <tr>
                  <td
                    className="p-3 font-mono text-xs"
                    style={{ color: 'rgba(0,0,0,0.6)' }}
                  >
                    border-radius
                  </td>
                  <td className="p-3 text-xs" colSpan={2}>
                    var(--radius-element)
                  </td>
                </tr>
                <tr>
                  <td
                    className="p-3 font-mono text-xs"
                    style={{ color: 'rgba(0,0,0,0.6)' }}
                  >
                    font-size
                  </td>
                  <td className="p-3 text-xs" colSpan={2}>
                    var(--text-nav) primary / var(--text-2xs) sub-level
                  </td>
                </tr>
                <tr>
                  <td
                    className="p-3 font-mono text-xs"
                    style={{ color: 'rgba(0,0,0,0.6)' }}
                  >
                    padding
                  </td>
                  <td className="p-3 text-xs" colSpan={2}>
                    px-3.5 py-1.5 (primary) / px-2.5 py-1 (sub)
                  </td>
                </tr>
                <tr>
                  <td
                    className="p-3 font-mono text-xs"
                    style={{ color: 'rgba(0,0,0,0.6)' }}
                  >
                    hover (inactive)
                  </td>
                  <td className="p-3 text-xs" colSpan={2}>
                    text-black, border-black/30
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Variant 2: Line Tabs */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <h4 className="font-medium">Variant 2 — Line Tabs</h4>
            <span
              className="text-[10px] px-2 py-0.5 rounded-[5px]"
              style={{
                backgroundColor: 'rgba(0,0,0,0.05)',
                color: 'rgba(0,0,0,0.5)',
              }}
            >
              Underline
            </span>
          </div>
          <LineTabsDemo />
          <CodeBlock
            code={`// Line Tabs — Underline variant
// Active: black text, 2px bottom bar, opaque count badge
// Inactive: black/40 text, no bar, subtle count badge

<div className="overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
  <div className="flex items-center border-b"
    style={{ borderColor: 'rgba(0, 0, 0, 0.06)' }}>
    {tabs.map((tab, i) => (
      <button
        key={tab.label}
        onClick={() => setActive(i)}
        className="relative flex items-center gap-2 px-4 py-2.5
          whitespace-nowrap transition-all cursor-pointer"
        style={{
          fontSize: 'var(--text-nav)',
          color: active === i ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0.4)',
        }}
      >
        {tab.label}
        <span style={{
          fontSize: 'var(--badge-xs-font)',
          borderRadius: '9999px',
          background: active === i ? 'rgba(0,0,0,0.08)' : 'rgba(0,0,0,0.04)',
          color: active === i ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.3)',
          minWidth: '20px', padding: '2px 6px',
        }}>
          {tab.count}
        </span>
        {active === i && (
          <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-black"
            style={{ borderRadius: '1px 1px 0 0' }} />
        )}
      </button>
    ))}
  </div>
</div>`}
          />
          <div className="border border-black/8 rounded-[10px] overflow-hidden mt-4">
            <div className="bg-black/[0.02] px-6 py-3 border-b border-black/8">
              <span className="font-semibold text-sm">
                Line Tabs — Specs
              </span>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr
                  className="border-b border-black/8"
                  style={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                >
                  <th
                    className="text-left p-3 font-medium"
                    style={{
                      color: 'rgba(0,0,0,0.5)',
                      fontSize: 'var(--text-xs)',
                    }}
                  >
                    Property
                  </th>
                  <th
                    className="text-left p-3 font-medium"
                    style={{
                      color: 'rgba(0,0,0,0.5)',
                      fontSize: 'var(--text-xs)',
                    }}
                  >
                    Active
                  </th>
                  <th
                    className="text-left p-3 font-medium"
                    style={{
                      color: 'rgba(0,0,0,0.5)',
                      fontSize: 'var(--text-xs)',
                    }}
                  >
                    Inactive
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/8">
                <tr>
                  <td
                    className="p-3 font-mono text-xs"
                    style={{ color: 'rgba(0,0,0,0.6)' }}
                  >
                    text color
                  </td>
                  <td className="p-3 text-xs">rgba(0,0,0,1)</td>
                  <td className="p-3 text-xs">rgba(0,0,0,0.4)</td>
                </tr>
                <tr>
                  <td
                    className="p-3 font-mono text-xs"
                    style={{ color: 'rgba(0,0,0,0.6)' }}
                  >
                    indicator
                  </td>
                  <td className="p-3 text-xs">2px bottom bar, bg-black</td>
                  <td className="p-3 text-xs">none</td>
                </tr>
                <tr>
                  <td
                    className="p-3 font-mono text-xs"
                    style={{ color: 'rgba(0,0,0,0.6)' }}
                  >
                    indicator inset
                  </td>
                  <td className="p-3 text-xs" colSpan={2}>
                    left-4 right-4 (inset from edges)
                  </td>
                </tr>
                <tr>
                  <td
                    className="p-3 font-mono text-xs"
                    style={{ color: 'rgba(0,0,0,0.6)' }}
                  >
                    count badge bg
                  </td>
                  <td className="p-3 text-xs">rgba(0,0,0,0.08)</td>
                  <td className="p-3 text-xs">rgba(0,0,0,0.04)</td>
                </tr>
                <tr>
                  <td
                    className="p-3 font-mono text-xs"
                    style={{ color: 'rgba(0,0,0,0.6)' }}
                  >
                    count badge text
                  </td>
                  <td className="p-3 text-xs">rgba(0,0,0,0.7)</td>
                  <td className="p-3 text-xs">rgba(0,0,0,0.3)</td>
                </tr>
                <tr>
                  <td
                    className="p-3 font-mono text-xs"
                    style={{ color: 'rgba(0,0,0,0.6)' }}
                  >
                    count badge radius
                  </td>
                  <td className="p-3 text-xs" colSpan={2}>
                    9999px (full pill)
                  </td>
                </tr>
                <tr>
                  <td
                    className="p-3 font-mono text-xs"
                    style={{ color: 'rgba(0,0,0,0.6)' }}
                  >
                    border-bottom
                  </td>
                  <td className="p-3 text-xs" colSpan={2}>
                    container: 1px solid rgba(0,0,0,0.06)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* When to use which */}
        <div className="border border-black/8 rounded-[10px] overflow-hidden">
          <div className="bg-black/[0.02] px-6 py-3 border-b border-black/8">
            <span className="font-semibold text-sm">When to Use Which</span>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                className="border-l-2 pl-4"
                style={{ borderColor: 'rgba(0,0,0,1)' }}
              >
                <h5 className="font-medium text-sm mb-2">Solid Tabs</h5>
                <ul className="space-y-1.5">
                  <li
                    className="text-xs"
                    style={{ color: 'rgba(0,0,0,0.6)' }}
                  >
                    Primary category filtering (industries, topics)
                  </li>
                  <li
                    className="text-xs"
                    style={{ color: 'rgba(0,0,0,0.6)' }}
                  >
                    Hierarchical sub-categories (industry to sub-industry)
                  </li>
                  <li
                    className="text-xs"
                    style={{ color: 'rgba(0,0,0,0.6)' }}
                  >
                    When tabs have count badges showing volume
                  </li>
                  <li
                    className="text-xs"
                    style={{ color: 'rgba(0,0,0,0.6)' }}
                  >
                    Scrollable rows with many options (10+)
                  </li>
                  <li
                    className="text-xs"
                    style={{ color: 'rgba(0,0,0,0.6)' }}
                  >
                    Two size tiers: primary (text-nav) and sub (text-2xs)
                  </li>
                </ul>
              </div>
              <div
                className="border-l-2 pl-4"
                style={{ borderColor: 'rgba(128,108,224,1)' }}
              >
                <h5 className="font-medium text-sm mb-2">Line Tabs</h5>
                <ul className="space-y-1.5">
                  <li
                    className="text-xs"
                    style={{ color: 'rgba(0,0,0,0.6)' }}
                  >
                    Section-level content switching (Quick Access)
                  </li>
                  <li
                    className="text-xs"
                    style={{ color: 'rgba(0,0,0,0.6)' }}
                  >
                    Fewer options (2 to 5 tabs)
                  </li>
                  <li
                    className="text-xs"
                    style={{ color: 'rgba(0,0,0,0.6)' }}
                  >
                    When paired with SectionHeading above
                  </li>
                  <li
                    className="text-xs"
                    style={{ color: 'rgba(0,0,0,0.6)' }}
                  >
                    Pill count badges for result counts
                  </li>
                  <li
                    className="text-xs"
                    style={{ color: 'rgba(0,0,0,0.6)' }}
                  >
                    Lighter visual weight, editorial feel
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pagination */}
      <section>
        <h3 className="text-xl font-normal mb-6">Pagination</h3>

        <ComponentPreview title="Page Navigation">
          <div className="flex items-center justify-center gap-2">
            <button className="px-3 py-2 border border-black/10 rounded hover:bg-black/5 transition-colors">
              Previous
            </button>
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                className={`w-10 h-10 rounded transition-colors ${
                  page === 2
                    ? 'bg-black text-white'
                    : 'border border-black/10 hover:bg-black/5'
                }`}
              >
                {page}
              </button>
            ))}
            <button className="px-3 py-2 border border-black/10 rounded hover:bg-black/5 transition-colors">
              Next
            </button>
          </div>
        </ComponentPreview>
      </section>
    </div>
  );
}