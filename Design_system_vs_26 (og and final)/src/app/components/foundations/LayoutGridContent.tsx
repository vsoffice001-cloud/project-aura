import { DocSection } from './FoundationsHelpers';

/**
 * LAYOUT & GRID CONTENT
 * =====================
 * All layout and grid documentation for the Foundations tab.
 */

export function LayoutGridContent() {
  return (
    <div className="space-y-12">
      {/* Container Width System */}
      <DocSection
        title="Container Width System"
        why="Content width directly impacts readability (Baymard Institute: 50-75 chars/line optimal). Wider containers lose focus, narrower containers feel cramped. A tiered system matches content type to optimal width."
        what="5 container widths via CSS tokens: --container-page (1200px), --container-content (1000px), --container-narrow (900px), --container-prose (700px), --container-compact (600px)"
        when="Use --container-page for outer shells/navbars, --container-content for standard sections, --container-narrow for CTAs/testimonials, --container-prose for body text measure, --container-compact for descriptions"
        whenNot="NEVER let body text run wider than 700px. NEVER use --container-page for content sections (too wide, loses focus)."
      >
        <div className="space-y-6">
          {/* Visual Width Demo */}
          <div className="border border-black/8 rounded-[5px] p-6 bg-black/[0.02] space-y-4">
            <p className="text-sm text-black/60 mb-2">Container Width Hierarchy (scaled to fit)</p>
            {[
              { token: '--container-page', width: '1200px', pct: '100%', color: 'bg-black/10', usage: 'Page shell, navbar, hero backgrounds' },
              { token: '--container-content', width: '1000px', pct: '83.3%', color: 'bg-black/15', usage: 'Standard sections, card grids' },
              { token: '--container-narrow', width: '900px', pct: '75%', color: 'bg-black/20', usage: 'CTAs, testimonials, forms' },
              { token: '--container-prose', width: '700px', pct: '58.3%', color: 'bg-black/25', usage: 'Body text, paragraphs (~65-75 chars)' },
              { token: '--container-compact', width: '600px', pct: '50%', color: 'bg-black/30', usage: 'Descriptions, tight reading' },
            ].map((c) => (
              <div key={c.token}>
                <div className="flex items-center gap-3 mb-1">
                  <code className="text-xs font-mono text-black/70 w-48 flex-shrink-0">{c.token}</code>
                  <span className="text-xs text-black/50">{c.width}</span>
                </div>
                <div className={`${c.color} rounded h-8 flex items-center px-3`} style={{ width: c.pct }}>
                  <span className="text-xs text-white mix-blend-difference">{c.usage}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Section-to-Container Mapping */}
          <div className="border border-black/8 rounded-[5px] overflow-hidden">
            <div className="p-4 bg-black/[0.02] border-b border-black/8">
              <h4 className="font-semibold text-sm">Section-to-Container Mapping</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-black/15">
                    <th className="text-left p-3 text-xs font-bold">Page Section</th>
                    <th className="text-left p-3 text-xs font-bold">Container</th>
                    <th className="text-left p-3 text-xs font-bold">Width</th>
                    <th className="text-left p-3 text-xs font-bold">Text Measure</th>
                    <th className="text-left p-3 text-xs font-bold">Tailwind Pattern</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { section: 'Navbar / Footer', container: '--container-page', width: '1200px', measure: 'N/A', tw: 'max-w-[var(--container-page)]' },
                    { section: 'Hero Section', container: '--container-content', width: '1000px', measure: '--container-prose', tw: 'max-w-[var(--container-content)]' },
                    { section: 'Client Context', container: '--container-content', width: '1000px', measure: '--container-prose', tw: 'max-w-[var(--container-content)]' },
                    { section: 'Challenges (cards)', container: '--container-content', width: '1000px', measure: 'N/A (cards)', tw: 'max-w-[var(--container-content)]' },
                    { section: 'Methodology', container: '--container-content', width: '1000px', measure: '--container-compact', tw: 'max-w-[var(--container-content)]' },
                    { section: 'Impact / Results', container: '--container-content', width: '1000px', measure: '--container-prose', tw: 'max-w-[var(--container-content)]' },
                    { section: 'Value Pillars', container: '--container-content', width: '1000px', measure: '--container-prose', tw: 'max-w-[var(--container-content)]' },
                    { section: 'Testimonial', container: '--container-narrow', width: '900px', measure: 'Full width', tw: 'max-w-[var(--container-narrow)]' },
                    { section: 'Final CTA', container: '--container-narrow', width: '900px', measure: '--container-prose', tw: 'max-w-[var(--container-narrow)]' },
                    { section: 'Resources (cards)', container: '--container-content', width: '1000px', measure: '--container-prose', tw: 'max-w-[var(--container-content)]' },
                    { section: 'Insights / Blog', container: '--container-narrow', width: '900px', measure: '--container-prose', tw: 'max-w-[var(--container-narrow)]' },
                  ].map((row, idx) => (
                    <tr key={idx} className="border-b border-black/8 last:border-0">
                      <td className="p-3 text-sm font-semibold">{row.section}</td>
                      <td className="p-3"><code className="text-xs font-mono bg-black/5 px-2 py-1 rounded">{row.container}</code></td>
                      <td className="p-3 text-sm text-black/60">{row.width}</td>
                      <td className="p-3"><code className="text-xs font-mono text-black/50">{row.measure}</code></td>
                      <td className="p-3"><code className="text-xs font-mono bg-blue-50 px-2 py-1 rounded text-blue-800">{row.tw}</code></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Code Pattern */}
          <div className="border border-black/8 rounded-[5px] overflow-hidden">
            <div className="bg-black/[0.02] px-4 py-2 border-b border-black/8">
              <span className="text-sm font-semibold">Standard Section Pattern (Token-Based)</span>
            </div>
            <pre className="p-4 overflow-x-auto bg-black/[0.02]">
              <code className="text-xs font-mono text-black/80">{`/* Standard content section */
<section className="py-12 sm:py-16 md:py-20 bg-white">
  <div className="max-w-[var(--container-content)] mx-auto px-4 sm:px-6 md:px-8">
    {/* Section content here */}
    <p className="max-w-[var(--container-prose)]">
      Body text constrained to readable measure...
    </p>
  </div>
</section>

/* Focused CTA section */
<section className="py-12 sm:py-16 md:py-20">
  <div className="max-w-[var(--container-narrow)] mx-auto px-4 sm:px-6 md:px-8 text-center">
    <h2>Ready to get started?</h2>
    <p className="max-w-[var(--container-prose)] mx-auto">...</p>
  </div>
</section>

/* Full-width hero with inner content constraint */
<section className="bg-black">
  <div className="max-w-[var(--container-content)] mx-auto px-4 sm:px-6 md:px-8">
    {/* Hero content */}
  </div>
</section>`}</code>
            </pre>
          </div>
        </div>
      </DocSection>

      {/* Responsive Padding Scale */}
      <DocSection
        title="Responsive Padding Scale"
        why="Horizontal padding must scale with viewport to maintain content breathing room on small screens while creating editorial white space on large screens"
        what="3-step mobile-first padding: 16px (mobile) → 24px (tablet) → 32px (desktop). Tokenized as --padding-mobile, --padding-tablet, --padding-desktop"
      >
        <div className="space-y-6">
          <div className="border border-black/8 rounded-[5px] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-black/15 bg-black/[0.02]">
                    <th className="text-left p-3 text-xs font-bold">Breakpoint</th>
                    <th className="text-left p-3 text-xs font-bold">Viewport</th>
                    <th className="text-left p-3 text-xs font-bold">Horizontal Padding</th>
                    <th className="text-left p-3 text-xs font-bold">Tailwind</th>
                    <th className="text-left p-3 text-xs font-bold">Token</th>
                    <th className="text-left p-3 text-xs font-bold">Rationale</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { bp: 'Mobile', vp: '0-639px', px: '16px', tw: 'px-4', token: '--padding-mobile', rationale: 'Maximum content area, edge-to-edge feel' },
                    { bp: 'Tablet', vp: '640-1023px', tw: 'sm:px-6', px: '24px', token: '--padding-tablet', rationale: 'Comfortable margins, breathing room' },
                    { bp: 'Desktop', vp: '1024px+', px: '32px', tw: 'md:px-8', token: '--padding-desktop', rationale: 'Generous margins, editorial white space' },
                    { bp: 'Wide', vp: '1280px+', px: 'Auto (mx-auto)', tw: 'mx-auto', token: 'N/A', rationale: 'Content centers, padding becomes decorative' },
                  ].map((row, idx) => (
                    <tr key={idx} className="border-b border-black/8 last:border-0">
                      <td className="p-3 text-sm font-semibold">{row.bp}</td>
                      <td className="p-3 text-sm text-black/60">{row.vp}</td>
                      <td className="p-3 text-sm">{row.px}</td>
                      <td className="p-3"><code className="text-xs font-mono bg-blue-50 px-2 py-1 rounded text-blue-800">{row.tw}</code></td>
                      <td className="p-3"><code className="text-xs font-mono bg-black/5 px-2 py-1 rounded">{row.token}</code></td>
                      <td className="p-3 text-xs text-black/60">{row.rationale}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </DocSection>

      {/* Mobile-First Design Principles */}
      <DocSection
        title="Mobile-First Design Principles"
        why="60%+ of web traffic is mobile. Designing mobile-first ensures core experience works on constrained devices, then progressively enhances for larger screens. This avoids the 'desktop-then-shrink' anti-pattern."
        what="UX law-driven approach: Fitts's Law (touch targets), Miller's Law (cognitive load), Hick's Law (choice reduction), Proximity principle (grouping), progressive disclosure"
      >
        <div className="space-y-6">
          {/* UX Laws Applied */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { law: "Fitts's Law", rule: 'Touch targets minimum 44x44px. Space interactive elements 8px+ apart. Larger targets for primary actions.', mobile: 'Buttons full-width, generous tap areas', desktop: 'Buttons auto-width, tighter spacing acceptable' },
              { law: "Miller's Law", rule: 'Limit visible items to 5-9 chunks. Progressive disclosure on mobile.', mobile: '1-2 cards visible, swipe for more', desktop: '3-4 cards in grid, all visible' },
              { law: "Hick's Law", rule: 'Fewer choices = faster decisions. Simplify navigation on mobile.', mobile: 'Hamburger menu, 1 CTA per screen', desktop: 'Full nav, multiple CTAs acceptable' },
              { law: "Proximity", rule: 'Related items grouped tightly. Use spacing to show relationships.', mobile: 'Tighter gaps (16px), vertical stacking', desktop: 'Wider gaps (24-32px), horizontal layouts' },
            ].map((item, idx) => (
              <div key={idx} className="border border-black/8 rounded-[5px] p-5">
                <h4 className="font-semibold text-sm mb-2">{item.law}</h4>
                <p className="text-xs text-black/60 mb-3">{item.rule}</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-blue-50 rounded p-2">
                    <p className="text-xs font-semibold text-blue-900 mb-1">Mobile</p>
                    <p className="text-xs text-blue-800">{item.mobile}</p>
                  </div>
                  <div className="bg-green-50 rounded p-2">
                    <p className="text-xs font-semibold text-green-900 mb-1">Desktop</p>
                    <p className="text-xs text-green-800">{item.desktop}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Content Stacking Strategy */}
          <div className="border border-black/8 rounded-[5px] overflow-hidden">
            <div className="p-4 bg-black/[0.02] border-b border-black/8">
              <h4 className="font-semibold text-sm">Content Stacking Strategy (Mobile-First)</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-black/15">
                    <th className="text-left p-3 text-xs font-bold">Viewport</th>
                    <th className="text-left p-3 text-xs font-bold">Columns</th>
                    <th className="text-left p-3 text-xs font-bold">Layout Pattern</th>
                    <th className="text-left p-3 text-xs font-bold">Tailwind</th>
                    <th className="text-left p-3 text-xs font-bold">Section Padding (Y)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { vp: '0-639px (Mobile)', cols: '1 column', pattern: 'Full-width stacked, vertical scroll', tw: 'grid-cols-1', py: 'py-12 (48px)' },
                    { vp: '640-767px (Large Mobile)', cols: '1-2 columns', pattern: 'Cards side-by-side where sensible', tw: 'sm:grid-cols-2', py: 'sm:py-16 (64px)' },
                    { vp: '768-1023px (Tablet)', cols: '2-3 columns', pattern: 'Sidebar layouts, card grids', tw: 'md:grid-cols-2 lg:grid-cols-3', py: 'md:py-20 (80px)' },
                    { vp: '1024px+ (Desktop)', cols: '3-4 columns', pattern: 'Full grid, sidebar+content, multi-col', tw: 'lg:grid-cols-3 xl:grid-cols-4', py: 'md:py-20 (80px)' },
                    { vp: '1280px+ (Wide)', cols: '4-6 columns', pattern: 'Content centers, generous whitespace', tw: 'Content max-widths kick in', py: 'md:py-20 (80px)' },
                  ].map((row, idx) => (
                    <tr key={idx} className="border-b border-black/8 last:border-0">
                      <td className="p-3 text-sm font-semibold">{row.vp}</td>
                      <td className="p-3 text-sm">{row.cols}</td>
                      <td className="p-3 text-xs text-black/60">{row.pattern}</td>
                      <td className="p-3"><code className="text-xs font-mono bg-blue-50 px-2 py-1 rounded text-blue-800">{row.tw}</code></td>
                      <td className="p-3"><code className="text-xs font-mono text-black/50">{row.py}</code></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile-First Code Pattern */}
          <div className="border border-black/8 rounded-[5px] overflow-hidden">
            <div className="bg-black/[0.02] px-4 py-2 border-b border-black/8">
              <span className="text-sm font-semibold">Mobile-First Code Pattern</span>
            </div>
            <pre className="p-4 overflow-x-auto bg-black/[0.02]">
              <code className="text-xs font-mono text-black/80">{`/* CORRECT: Mobile-first (start small, add breakpoints up) */
<div className="
  grid grid-cols-1          /* Mobile: 1 column (default) */
  sm:grid-cols-2            /* 640px+: 2 columns */
  lg:grid-cols-3            /* 1024px+: 3 columns */
  gap-4 sm:gap-6 md:gap-8  /* Gap scales with viewport */
">

/* CORRECT: Padding scales mobile-first */
<div className="px-4 sm:px-6 md:px-8">

/* CORRECT: Typography scales mobile-first */
<h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.052rem)' }}>

/* WRONG: Desktop-first (don't do this) */
<div className="grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
/* This works but violates mobile-first principle */`}</code>
            </pre>
          </div>
        </div>
      </DocSection>

      {/* Grid System */}
      <DocSection
        title="Grid System"
        why="A flexible grid system ensures consistent layouts across all screen sizes"
        what="12-column responsive grid with customizable gaps"
      >
        <div className="space-y-6">
          {/* Grid Demo */}
          <div className="p-6 bg-black/[0.02] border border-black/8 rounded-[5px]">
            <p className="text-sm text-black/60 mb-4">12-Column Grid Example</p>
            <div className="grid grid-cols-12 gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="h-20 bg-[var(--brand-red)] rounded flex items-center justify-center text-white text-xs">
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Common Layouts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-black/8 rounded-[5px]">
              <p className="text-sm font-semibold mb-2">Halves (6-6)</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="h-16 bg-black/10 rounded"></div>
                <div className="h-16 bg-black/10 rounded"></div>
              </div>
            </div>
            <div className="p-4 border border-black/8 rounded-[5px]">
              <p className="text-sm font-semibold mb-2">Thirds (4-4-4)</p>
              <div className="grid grid-cols-3 gap-2">
                <div className="h-16 bg-black/10 rounded"></div>
                <div className="h-16 bg-black/10 rounded"></div>
                <div className="h-16 bg-black/10 rounded"></div>
              </div>
            </div>
            <div className="p-4 border border-black/8 rounded-[5px]">
              <p className="text-sm font-semibold mb-2">Sidebar (8-4)</p>
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2 h-16 bg-black/10 rounded"></div>
                <div className="h-16 bg-black/10 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </DocSection>

      {/* Breakpoints */}
      <DocSection
        title="Responsive Breakpoints"
        why="Standard Tailwind breakpoints ensure consistent responsive behavior across the system"
        what="Mobile-first approach with 5 breakpoints matching Tailwind defaults"
      >
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-black/20">
                <th className="text-left p-3 text-sm font-bold">Breakpoint</th>
                <th className="text-left p-3 text-sm font-bold">Prefix</th>
                <th className="text-left p-3 text-sm font-bold">Min Width</th>
                <th className="text-left p-3 text-sm font-bold">Device</th>
                <th className="text-left p-3 text-sm font-bold">Columns</th>
                <th className="text-left p-3 text-sm font-bold">Container</th>
              </tr>
            </thead>
            <tbody>
              {[
                { bp: 'Mobile (default)', prefix: '(none)', width: '0px', device: 'Small phones', cols: '1', container: 'Full width' },
                { bp: 'Small', prefix: 'sm:', width: '640px', device: 'Large phones / Small tablets', cols: '1-2', container: 'Full width' },
                { bp: 'Medium', prefix: 'md:', width: '768px', device: 'Tablets', cols: '2-3', container: 'Full width' },
                { bp: 'Large', prefix: 'lg:', width: '1024px', device: 'Laptops / Small desktops', cols: '3-4', container: 'max-w tokens kick in' },
                { bp: 'Extra Large', prefix: 'xl:', width: '1280px', device: 'Desktops', cols: '4-6', container: 'Centered with mx-auto' },
              ].map((row, idx) => (
                <tr key={idx} className="border-b border-black/8">
                  <td className="p-3 text-sm font-semibold">{row.bp}</td>
                  <td className="p-3"><code className="font-mono text-sm bg-blue-50 px-2 py-1 rounded text-blue-800">{row.prefix}</code></td>
                  <td className="p-3 font-mono text-sm">{row.width}</td>
                  <td className="p-3 text-sm text-black/60">{row.device}</td>
                  <td className="p-3 text-sm">{row.cols}</td>
                  <td className="p-3 text-xs text-black/60">{row.container}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocSection>

      {/* Border Radius Decision Table — from LAYOUT.md */}
      <DocSection
        title="Border Radius Decision Table"
        why="Consistent radius creates visual harmony. Three tiers ensure appropriate rounding for each element type."
        what="3-tier system: images (2.5px), buttons/badges (5px), cards/modals (10px)"
        when="Apply based on element type — never use arbitrary border-radius values"
        whenNot="Don't use fully-rounded (9999px) except for pills and avatars"
      >
        <div className="border border-black/8 rounded-[5px] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-black/15 bg-black/[0.02]">
                  <th className="text-left p-3 text-xs font-bold">Element</th>
                  <th className="text-left p-3 text-xs font-bold">Radius</th>
                  <th className="text-left p-3 text-xs font-bold">Token</th>
                  <th className="text-left p-3 text-xs font-bold">Visual</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { element: 'Images', radius: '2.5px', token: '--radius-image', color: 'bg-black/20' },
                  { element: 'Buttons, small cards, badges', radius: '5px', token: '--radius-button', color: 'bg-black/15' },
                  { element: 'Large cards, modals', radius: '10px', token: '--radius-card', color: 'bg-black/10' },
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-black/8 last:border-0">
                    <td className="p-3 text-sm font-semibold">{row.element}</td>
                    <td className="p-3 text-sm font-mono">{row.radius}</td>
                    <td className="p-3"><code className="text-xs font-mono bg-black/5 px-2 py-1 rounded">{row.token}</code></td>
                    <td className="p-3">
                      <div className={`w-16 h-12 ${row.color} border border-black/8`} style={{ borderRadius: row.radius }}></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </DocSection>

      {/* Z-Index Strategy */}
      <DocSection
        title="Z-Index Strategy"
        why="Organized z-index prevents layering issues and maintains predictable stacking"
        what="Layered system with designated ranges for different element types"
      >
        <div className="space-y-3">
          {[
            { layer: 'Base Content', range: '0', usage: 'Default page content' },
            { layer: 'Dropdowns', range: '10', usage: 'Dropdown menus, tooltips' },
            { layer: 'Sticky Elements', range: '20', usage: 'Sticky headers, CTAs' },
            { layer: 'Modals', range: '30', usage: 'Modal dialogs' },
            { layer: 'Notifications', range: '40', usage: 'Toast messages, alerts' },
            { layer: 'Critical', range: '50', usage: 'Urgent overlays' },
          ].map((item) => (
            <div key={item.layer} className="flex items-center justify-between p-4 bg-white border border-black/8 rounded-[5px]">
              <div>
                <p className="font-semibold text-sm mb-1">{item.layer}</p>
                <p className="text-xs text-black/60">{item.usage}</p>
              </div>
              <code className="font-mono text-sm bg-black/5 px-3 py-1 rounded">z-{item.range}</code>
            </div>
          ))}
        </div>
      </DocSection>
    </div>
  );
}