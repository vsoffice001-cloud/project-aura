import { useState } from 'react';
import { Copy, Check, Download, Monitor, Tablet, Smartphone, Maximize2 } from 'lucide-react';

/**
 * ALL LAYOUT & GRID TOKENS - COMPLETE REFERENCE
 * ==============================================
 * Comprehensive layout and grid reference with breakpoints, container widths,
 * column configurations, gutter systems, and z-index layers.
 * 
 * Features:
 * - Responsive breakpoints (5 tiers)
 * - Container max-widths
 * - 12-column grid system
 * - Gutter/gap tokens
 * - Z-index layer system
 * - Copy-to-clipboard functionality
 * - Downloadable JSON/CSS export
 */

// ============================================
// HELPER COMPONENTS
// ============================================

function BreakpointRow({ name, token, minWidth, maxWidth, device, columns, containerWidth, icon }: {
  name: string;
  token: string;
  minWidth: string;
  maxWidth: string;
  device: string;
  columns: string;
  containerWidth: string;
  icon: React.ReactNode;
}) {
  const [copied, setCopied] = useState('');

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <tr className="border-b border-black/8 hover:bg-black/[0.02]">
      <td className="p-4">
        <div className="flex items-center gap-2">
          <span className="text-black/60">{icon}</span>
          <code className="text-xs font-mono font-semibold">{name}</code>
        </div>
      </td>
      <td className="p-4">
        <button
          onClick={() => copyToClipboard(token, 'token')}
          className="text-left hover:bg-black/5 rounded px-2 py-1 transition-colors"
        >
          <code className="text-[10px] font-mono bg-black/5 px-1.5 py-0.5 rounded">
            {token}
          </code>
          {copied === 'token' && <Check size={12} className="inline ml-1 text-green-600" />}
        </button>
      </td>
      <td className="p-4">
        <button
          onClick={() => copyToClipboard(minWidth, 'min')}
          className="hover:bg-black/5 rounded px-2 py-1 transition-colors"
        >
          <code className="text-[10px] font-mono text-black/60">{minWidth}</code>
          {copied === 'min' && <Check size={12} className="inline ml-1 text-green-600" />}
        </button>
      </td>
      <td className="p-4">
        <code className="text-[10px] font-mono text-black/50">{maxWidth}</code>
      </td>
      <td className="p-4 text-xs">{device}</td>
      <td className="p-4 text-xs">{columns}</td>
      <td className="p-4">
        <code className="text-[10px] font-mono bg-blue-50 text-blue-900 px-2 py-1 rounded">{containerWidth}</code>
      </td>
    </tr>
  );
}

function CategorySection({ title, description, children }: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-black/8 rounded-[5px] overflow-hidden">
      <div className="p-6 bg-black/[0.02] border-b border-black/8">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-sm text-black/70">{description}</p>
      </div>
      {children}
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export function AllLayoutGridTokensContent() {
  const [downloadFormat, setDownloadFormat] = useState<'json' | 'css'>('json');

  const downloadTokens = () => {
    const data = downloadFormat === 'json' 
      ? JSON.stringify(layoutData, null, 2)
      : generateCSSExport();
    
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `layout-grid-tokens.${downloadFormat}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-[5px] p-5 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-normal mb-3">Complete Layout & Grid Tokens Reference</h1>
            <p className="text-sm sm:text-base md:text-lg text-black/70 mb-4">
              Every layout token in the design system with responsive breakpoints, container widths, 
              12-column grid configurations, gutter systems, and z-index layers. Click any token to copy.
            </p>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <span className="text-xs sm:text-sm text-black/60">📱 5 responsive breakpoints</span>
              <span className="text-xs sm:text-sm text-black/60">📐 12-column grid system</span>
              <span className="text-xs sm:text-sm text-black/60">⚡ Copy-to-clipboard enabled</span>
            </div>
          </div>
          <div className="flex-shrink-0">
            <button
              onClick={downloadTokens}
              className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-[5px] hover:bg-black/90 transition-colors"
            >
              <Download size={16} />
              <span className="text-sm font-medium">Download Tokens</span>
            </button>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => setDownloadFormat('json')}
                className={`px-3 py-1 text-xs rounded ${
                  downloadFormat === 'json' ? 'bg-black text-white' : 'bg-black/10 text-black'
                }`}
              >
                JSON
              </button>
              <button
                onClick={() => setDownloadFormat('css')}
                className={`px-3 py-1 text-xs rounded ${
                  downloadFormat === 'css' ? 'bg-black text-white' : 'bg-black/10 text-black'
                }`}
              >
                CSS
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Reference Legend */}
      <div className="bg-purple-50 border border-purple-200 rounded-[5px] p-5">
        <h3 className="font-semibold text-purple-900 mb-3">📖 How to Use This Reference</h3>
        <ul className="space-y-2 text-sm text-purple-900">
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>Click any token</strong> to copy breakpoint values, container widths, or z-index layers</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>Mobile-first approach</strong> - styles apply at minimum width and cascade up</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>12-column grid</strong> - all layouts use 12-column base for maximum flexibility</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>Download</strong> complete token set as JSON or CSS for direct integration</span>
          </li>
        </ul>
      </div>

      {/* RESPONSIVE BREAKPOINTS */}
      <CategorySection
        title="Responsive Breakpoints - Mobile-First System"
        description="5-tier breakpoint system from mobile (320px) to ultra-wide (1920px+). Mobile-first approach with min-width media queries."
      >
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-black/20 bg-black/[0.02]">
                <th className="text-left p-4 text-xs font-bold">Breakpoint</th>
                <th className="text-left p-4 text-xs font-bold">Token (Click to Copy)</th>
                <th className="text-left p-4 text-xs font-bold">Min Width</th>
                <th className="text-left p-4 text-xs font-bold">Max Width</th>
                <th className="text-left p-4 text-xs font-bold">Device Type</th>
                <th className="text-left p-4 text-xs font-bold">Typical Columns</th>
                <th className="text-left p-4 text-xs font-bold">Container Max-Width</th>
              </tr>
            </thead>
            <tbody>
              <BreakpointRow
                name="mobile"
                token="--breakpoint-mobile"
                minWidth="0px"
                maxWidth="639px"
                device="Phones (portrait)"
                columns="1-2 cols"
                containerWidth="100%"
                icon={<Smartphone size={18} />}
              />
              <BreakpointRow
                name="sm"
                token="--breakpoint-sm"
                minWidth="640px"
                maxWidth="767px"
                device="Phones (landscape)"
                columns="2 cols"
                containerWidth="640px"
                icon={<Smartphone size={18} className="rotate-90" />}
              />
              <BreakpointRow
                name="md"
                token="--breakpoint-md"
                minWidth="768px"
                maxWidth="1023px"
                device="Tablets ⭐"
                columns="2-3 cols"
                containerWidth="768px"
                icon={<Tablet size={18} />}
              />
              <BreakpointRow
                name="lg"
                token="--breakpoint-lg"
                minWidth="1024px"
                maxWidth="1279px"
                device="Desktop ⭐ MOST USED"
                columns="3-4 cols"
                containerWidth="1024px"
                icon={<Monitor size={18} />}
              />
              <BreakpointRow
                name="xl"
                token="--breakpoint-xl"
                minWidth="1280px"
                maxWidth="1535px"
                device="Large Desktop"
                columns="4 cols"
                containerWidth="1280px"
                icon={<Monitor size={18} />}
              />
              <BreakpointRow
                name="2xl"
                token="--breakpoint-2xl"
                minWidth="1536px"
                maxWidth="∞"
                device="Ultra-wide"
                columns="4-6 cols"
                containerWidth="1536px"
                icon={<Maximize2 size={18} />}
              />
            </tbody>
          </table>
        </div>
      </CategorySection>

      {/* CONTAINER WIDTHS */}
      <CategorySection
        title="Container Max-Width System"
        description="Constrained content widths for optimal readability and visual hierarchy"
      >
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            {[
              { name: 'prose', width: '65ch', pixels: '~650px', usage: 'Long-form content, articles, optimal reading width ⭐', bg: 'bg-amber-50', border: 'border-amber-200' },
              { name: 'content', width: '1000px', pixels: '1000px', usage: 'Main content area, case study sections ⭐ MOST USED', bg: 'bg-blue-50', border: 'border-blue-200' },
              { name: 'wide', width: '1200px', pixels: '1200px', usage: 'Dashboard, grid layouts, wide content', bg: 'bg-green-50', border: 'border-green-200' },
              { name: 'full', width: '100%', pixels: '100%', usage: 'Full-width sections, hero areas', bg: 'bg-purple-50', border: 'border-purple-200' },
            ].map((container) => (
              <div key={container.name} className={`${container.bg} border ${container.border} rounded-[5px] p-5`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <code className="font-mono text-sm font-semibold">--container-{container.name}</code>
                    <p className="text-xs text-black/60 mt-1">{container.usage}</p>
                  </div>
                  <div className="text-right">
                    <code className="font-mono text-xs bg-white px-2 py-1 rounded">{container.width}</code>
                    <p className="text-[10px] text-black/50 mt-1">{container.pixels}</p>
                  </div>
                </div>
                {/* Visual representation */}
                <div className="bg-white h-12 rounded border border-black/8" style={{ maxWidth: container.width === '100%' ? '100%' : container.width, width: '100%' }}>
                  <div className="h-full bg-black/5 rounded flex items-center justify-center text-xs text-black/40">
                    {container.name} container
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CategorySection>

      {/* 12-COLUMN GRID SYSTEM */}
      <CategorySection
        title="12-Column Grid System"
        description="Flexible 12-column grid for all layout needs - span 1 to 12 columns"
      >
        <div className="p-6 space-y-6">
          {/* Grid Visualization */}
          <div>
            <p className="text-sm text-black/60 mb-4">12 equal columns with customizable gaps</p>
            <div className="grid grid-cols-12 gap-3">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="bg-blue-500/20 border border-blue-500/40 rounded p-2 text-center">
                  <span className="text-[10px] font-mono text-blue-900">{i + 1}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Common Column Configurations */}
          <div>
            <h4 className="font-semibold mb-4">Common Column Configurations</h4>
            <div className="space-y-4">
              {/* Halves */}
              <div>
                <p className="text-xs font-mono text-black/60 mb-2">Halves (6 + 6) - 50/50 split</p>
                <div className="grid grid-cols-12 gap-3">
                  <div className="col-span-6 bg-green-500/20 border border-green-500/40 rounded p-4 text-center">
                    <code className="text-xs font-mono">col-span-6</code>
                  </div>
                  <div className="col-span-6 bg-green-500/20 border border-green-500/40 rounded p-4 text-center">
                    <code className="text-xs font-mono">col-span-6</code>
                  </div>
                </div>
              </div>

              {/* Thirds */}
              <div>
                <p className="text-xs font-mono text-black/60 mb-2">Thirds (4 + 4 + 4) - Equal columns</p>
                <div className="grid grid-cols-12 gap-3">
                  <div className="col-span-4 bg-purple-500/20 border border-purple-500/40 rounded p-4 text-center">
                    <code className="text-xs font-mono">col-span-4</code>
                  </div>
                  <div className="col-span-4 bg-purple-500/20 border border-purple-500/40 rounded p-4 text-center">
                    <code className="text-xs font-mono">col-span-4</code>
                  </div>
                  <div className="col-span-4 bg-purple-500/20 border border-purple-500/40 rounded p-4 text-center">
                    <code className="text-xs font-mono">col-span-4</code>
                  </div>
                </div>
              </div>

              {/* Sidebar Layout */}
              <div>
                <p className="text-xs font-mono text-black/60 mb-2">Sidebar (8 + 4) - Content + Sidebar ⭐</p>
                <div className="grid grid-cols-12 gap-3">
                  <div className="col-span-8 bg-amber-500/20 border border-amber-500/40 rounded p-4 text-center">
                    <code className="text-xs font-mono">col-span-8 (Main Content)</code>
                  </div>
                  <div className="col-span-4 bg-amber-500/20 border border-amber-500/40 rounded p-4 text-center">
                    <code className="text-xs font-mono">col-span-4 (Sidebar)</code>
                  </div>
                </div>
              </div>

              {/* Quarters */}
              <div>
                <p className="text-xs font-mono text-black/60 mb-2">Quarters (3 + 3 + 3 + 3) - Card grids</p>
                <div className="grid grid-cols-12 gap-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="col-span-3 bg-red-500/20 border border-red-500/40 rounded p-4 text-center">
                      <code className="text-xs font-mono">col-span-3</code>
                    </div>
                  ))}
                </div>
              </div>

              {/* Asymmetric */}
              <div>
                <p className="text-xs font-mono text-black/60 mb-2">Asymmetric (7 + 5) - Hero layouts</p>
                <div className="grid grid-cols-12 gap-3">
                  <div className="col-span-7 bg-cyan-500/20 border border-cyan-500/40 rounded p-4 text-center">
                    <code className="text-xs font-mono">col-span-7 (Featured)</code>
                  </div>
                  <div className="col-span-5 bg-cyan-500/20 border border-cyan-500/40 rounded p-4 text-center">
                    <code className="text-xs font-mono">col-span-5 (Secondary)</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CategorySection>

      {/* GUTTER/GAP SYSTEM */}
      <CategorySection
        title="Gutter & Gap System"
        description="Consistent spacing between grid columns and flex items"
      >
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-black/20 bg-black/[0.02]">
                  <th className="text-left p-4 text-xs font-bold">Size</th>
                  <th className="text-left p-4 text-xs font-bold">Value</th>
                  <th className="text-left p-4 text-xs font-bold">Usage</th>
                  <th className="text-left p-4 text-xs font-bold">Visual Example</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-black/8">
                  <td className="p-4"><code className="text-xs font-mono">gap-sm</code></td>
                  <td className="p-4"><code className="text-xs font-mono">12px</code></td>
                  <td className="p-4 text-xs">Compact grids, tight layouts</td>
                  <td className="p-4">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-blue-400 rounded"></div>
                      <div className="w-8 h-8 bg-blue-400 rounded"></div>
                      <div className="w-8 h-8 bg-blue-400 rounded"></div>
                    </div>
                  </td>
                </tr>
                <tr className="border-b border-black/8 bg-yellow-50">
                  <td className="p-4"><code className="text-xs font-mono">gap-md</code></td>
                  <td className="p-4"><code className="text-xs font-mono">24px</code></td>
                  <td className="p-4 text-xs">Standard grids ⭐ MOST USED</td>
                  <td className="p-4">
                    <div className="flex gap-6">
                      <div className="w-8 h-8 bg-green-400 rounded"></div>
                      <div className="w-8 h-8 bg-green-400 rounded"></div>
                      <div className="w-8 h-8 bg-green-400 rounded"></div>
                    </div>
                  </td>
                </tr>
                <tr className="border-b border-black/8">
                  <td className="p-4"><code className="text-xs font-mono">gap-lg</code></td>
                  <td className="p-4"><code className="text-xs font-mono">32px</code></td>
                  <td className="p-4 text-xs">Generous spacing, large cards</td>
                  <td className="p-4">
                    <div className="flex gap-8">
                      <div className="w-8 h-8 bg-purple-400 rounded"></div>
                      <div className="w-8 h-8 bg-purple-400 rounded"></div>
                      <div className="w-8 h-8 bg-purple-400 rounded"></div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </CategorySection>

      {/* Z-INDEX LAYER SYSTEM */}
      <CategorySection
        title="Z-Index Layer System"
        description="Organized stacking order prevents z-index chaos"
      >
        <div className="p-6">
          <div className="space-y-3">
            {[
              { layer: 'Base Content', value: '0', usage: 'Default page content, standard elements', color: 'bg-gray-50' },
              { layer: 'Dropdowns', value: '10', usage: 'Dropdown menus, tooltips, popovers', color: 'bg-blue-50' },
              { layer: 'Sticky Elements', value: '20', usage: 'Sticky headers, sticky CTAs, fixed navigation', color: 'bg-green-50' },
              { layer: 'Overlays', value: '30', usage: 'Modal backgrounds, overlay layers', color: 'bg-purple-50' },
              { layer: 'Modals', value: '40', usage: 'Modal dialogs, lightboxes', color: 'bg-amber-50' },
              { layer: 'Notifications', value: '50', usage: 'Toast messages, alerts, snackbars', color: 'bg-red-50' },
              { layer: 'Critical', value: '60', usage: 'Emergency overlays, system messages', color: 'bg-red-100' },
            ].map((item) => (
              <div key={item.value} className={`${item.color} border border-black/8 rounded-[5px] p-4 flex items-center justify-between`}>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <code className="font-mono text-sm font-semibold">z-{item.value}</code>
                    <span className="text-sm font-medium">{item.layer}</span>
                  </div>
                  <p className="text-xs text-black/60">{item.usage}</p>
                </div>
                <div className="relative w-16 h-16 flex items-center justify-center">
                  {/* Visual stacking representation */}
                  <div className="absolute inset-0 bg-black/5 rounded" style={{ transform: 'translate(0, 0)', zIndex: 0 }}></div>
                  <div className="absolute inset-0 bg-black/10 rounded" style={{ transform: 'translate(4px, 4px)', zIndex: parseInt(item.value) / 10 }}></div>
                  <div className="relative z-10 text-xs font-mono font-bold">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CategorySection>

      {/* CODE SNIPPET EXAMPLES */}
      <div className="border border-black/8 rounded-[5px] p-6 bg-black/[0.02]">
        <h3 className="text-xl font-semibold mb-4">💻 Code Snippet Examples</h3>
        <div className="space-y-4">
          <CodeSnippetBox
            title="Responsive Breakpoints"
            code={`/* Mobile-first media queries */
.container {
  width: 100%;
  padding: 0 16px;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    max-width: 768px;
    margin: 0 auto;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
  }
}`}
          />
          
          <CodeSnippetBox
            title="12-Column Grid System"
            code={`/* 12-column grid with gap */
.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
}

/* Sidebar layout (8 + 4) */
.main-content {
  grid-column: span 8;
}

.sidebar {
  grid-column: span 4;
}

/* Responsive: stack on mobile */
@media (max-width: 767px) {
  .main-content,
  .sidebar {
    grid-column: span 12;
  }
}`}
          />
          
          <CodeSnippetBox
            title="Z-Index Layer System"
            code={`/* Z-index variables */
:root {
  --z-base: 0;
  --z-dropdown: 10;
  --z-sticky: 20;
  --z-overlay: 30;
  --z-modal: 40;
  --z-notification: 50;
  --z-critical: 60;
}

/* Usage */
.header-sticky {
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
}

.modal {
  z-index: var(--z-modal);
}

.toast {
  z-index: var(--z-notification);
}`}
          />

          <CodeSnippetBox
            title="React Grid Component"
            code={`// Responsive grid component
<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {items.map((item) => (
    <div key={item.id} className="...">
      {/* Card content */}
    </div>
  ))}
</div>

// Container with max-width
<div className="max-w-[1000px] mx-auto px-6">
  {/* Content */}
</div>

// Sidebar layout
<div className="grid grid-cols-12 gap-8">
  <main className="col-span-12 lg:col-span-8">
    {/* Main content */}
  </main>
  <aside className="col-span-12 lg:col-span-4">
    {/* Sidebar */}
  </aside>
</div>`}
          />
        </div>
      </div>

      {/* USAGE PRINCIPLES */}
      <div className="bg-teal-50 border border-teal-300 rounded-[5px] p-6">
        <h3 className="font-semibold text-teal-900 mb-3">✅ LAYOUT & GRID USAGE PRINCIPLES</h3>
        <ul className="space-y-2 text-sm text-teal-900">
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>Mobile-first approach</strong> - Design for mobile, enhance for larger screens</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>12-column grid base</strong> - All layouts use 12-column foundation for maximum flexibility</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>Constrain content width</strong> - Use max-width containers (1000px) for optimal readability</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>Consistent gutters</strong> - Use 24px (gap-md) for standard grids, adjust for density</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>Z-index organization</strong> - Use defined layers (0, 10, 20...) to prevent stacking issues</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>Responsive columns</strong> - Stack columns on mobile (1 col), expand on desktop (3-4 cols)</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

// Helper function for code snippets
function CodeSnippetBox({ title, code }: { title: string; code: string }) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border border-black/8 rounded-[5px] overflow-hidden">
      <div className="bg-black/5 px-4 py-2 border-b border-black/8 flex items-center justify-between">
        <span className="text-sm font-semibold">{title}</span>
        <button
          onClick={copyCode}
          className="flex items-center gap-2 px-3 py-1 text-xs font-medium hover:bg-black/10 rounded transition-colors"
        >
          {copied ? (
            <>
              <Check size={14} />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto bg-white">
        <code className="text-xs font-mono text-black/80">{code}</code>
      </pre>
    </div>
  );
}

// Mock data structure for download functionality
const layoutData = {
  breakpoints: {
    mobile: { min: '0px', max: '639px' },
    sm: { min: '640px', max: '767px' },
    md: { min: '768px', max: '1023px' },
    lg: { min: '1024px', max: '1279px' },
    xl: { min: '1280px', max: '1535px' },
    '2xl': { min: '1536px', max: 'infinity' },
  },
  containers: {
    prose: '65ch',
    content: '1000px',
    wide: '1200px',
    full: '100%',
  },
  grid: {
    columns: 12,
    gaps: {
      sm: '12px',
      md: '24px',
      lg: '32px',
    },
  },
  zIndex: {
    base: 0,
    dropdown: 10,
    sticky: 20,
    overlay: 30,
    modal: 40,
    notification: 50,
    critical: 60,
  },
};

function generateCSSExport() {
  return `:root {
  /* Breakpoints */
  --breakpoint-mobile: 0px;
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
  
  /* Container Max-Widths */
  --container-prose: 65ch;
  --container-content: 1000px;
  --container-wide: 1200px;
  --container-full: 100%;
  
  /* Grid System */
  --grid-columns: 12;
  --gap-sm: 12px;
  --gap-md: 24px;
  --gap-lg: 32px;
  
  /* Z-Index Layers */
  --z-base: 0;
  --z-dropdown: 10;
  --z-sticky: 20;
  --z-overlay: 30;
  --z-modal: 40;
  --z-notification: 50;
  --z-critical: 60;
}`;
}