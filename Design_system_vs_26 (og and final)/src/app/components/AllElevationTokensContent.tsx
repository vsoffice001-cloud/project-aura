import { useState } from 'react';
import { Copy, Check, Download, Layers, MousePointer, Focus } from 'lucide-react';

/**
 * ALL ELEVATION TOKENS - COMPLETE REFERENCE
 * ==========================================
 * Comprehensive elevation and shadow reference with complete shadow system,
 * interactive states, hover/focus variations, and usage patterns.
 * 
 * Features:
 * - 6-tier elevation system (0-5)
 * - Accent shadow variants (purple)
 * - Hover and focus state shadows
 * - Interactive demonstrations
 * - Copy-to-clipboard functionality
 * - Downloadable JSON/CSS export
 */

// ============================================
// HELPER COMPONENTS
// ============================================

function ShadowTokenRow({ name, token, value, usage, elevation, interactive = false }: {
  name: string;
  token: string;
  value: string;
  usage: string;
  elevation: number;
  interactive?: boolean;
}) {
  const [copied, setCopied] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <tr className="border-b border-black/8 hover:bg-black/[0.02]">
      <td className="p-4">
        <code className="text-xs font-mono font-semibold">{name}</code>
      </td>
      <td className="p-4">
        <button
          onClick={() => copyToClipboard(value, 'value')}
          className="text-left hover:bg-black/5 rounded px-2 py-1 transition-colors"
        >
          <code className="text-[10px] font-mono bg-black/5 px-1.5 py-0.5 rounded block max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
            {value}
          </code>
          {copied === 'value' && <Check size={12} className="inline ml-1 text-green-600" />}
        </button>
      </td>
      <td className="p-4">
        <button
          onClick={() => copyToClipboard(`var(${token})`, 'token')}
          className="hover:bg-black/5 rounded px-2 py-1 transition-colors"
        >
          <code className="text-[10px] font-mono text-black/60">{token}</code>
          {copied === 'token' && <Check size={12} className="inline ml-1 text-green-600" />}
        </button>
      </td>
      <td className="p-4 text-xs">{usage}</td>
      <td className="p-4">
        <div className="flex items-center justify-center">
          <div 
            className={`w-24 h-16 bg-white rounded-[5px] transition-all ${interactive ? 'cursor-pointer' : ''}`}
            style={{ 
              boxShadow: isHovered && interactive 
                ? `0 ${elevation * 4 + 4}px ${elevation * 8 + 12}px rgba(0,0,0,${0.12 + elevation * 0.02})`
                : value 
            }}
            onMouseEnter={() => interactive && setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {interactive && (
              <div className="h-full flex items-center justify-center text-[10px] text-black/40">
                Hover me
              </div>
            )}
          </div>
        </div>
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

export function AllElevationTokensContent() {
  const [downloadFormat, setDownloadFormat] = useState<'json' | 'css'>('json');
  const [activeDemo, setActiveDemo] = useState<number | null>(null);

  const downloadTokens = () => {
    const data = downloadFormat === 'json' 
      ? JSON.stringify(elevationData, null, 2)
      : generateCSSExport();
    
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `elevation-tokens.${downloadFormat}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-[5px] p-5 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-normal mb-3">Complete Elevation Tokens Reference</h1>
            <p className="text-sm sm:text-base md:text-lg text-black/70 mb-4">
              Every elevation and shadow token in the design system with the complete 6-tier system, 
              accent variants, interactive states, and usage patterns. Click any value to copy.
            </p>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <span className="text-xs sm:text-sm text-black/60">🎨 6 elevation tiers</span>
              <span className="text-xs sm:text-sm text-black/60">✨ Accent shadows</span>
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
      <div className="bg-blue-50 border border-blue-200 rounded-[5px] p-5">
        <h3 className="font-semibold text-blue-900 mb-3">📖 How to Use This Reference</h3>
        <ul className="space-y-2 text-sm text-blue-900">
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>Click any shadow value</strong> to copy the complete box-shadow CSS property</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>6-tier elevation system</strong> - From flat (0) to floating modals (5)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>Accent shadows</strong> use purple tint for premium feel (cards, hero elements)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>Interactive examples</strong> show how shadows respond to hover/focus states</span>
          </li>
        </ul>
      </div>

      {/* COMPLETE ELEVATION SCALE - NEUTRAL SHADOWS */}
      <CategorySection
        title="Complete Elevation Scale - Neutral Shadows"
        description="6-tier elevation system from flat to floating. These are the standard black shadows for most UI elements."
      >
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-black/20 bg-black/[0.02]">
                <th className="text-left p-4 text-xs font-bold">Level</th>
                <th className="text-left p-4 text-xs font-bold">Shadow Value (Click to Copy)</th>
                <th className="text-left p-4 text-xs font-bold">Token</th>
                <th className="text-left p-4 text-xs font-bold">Common Usage</th>
                <th className="text-left p-4 text-xs font-bold">Visual Preview</th>
              </tr>
            </thead>
            <tbody>
              <ShadowTokenRow
                name="elevation-0"
                token="--shadow-none"
                value="none"
                usage="Flat surfaces, no elevation"
                elevation={0}
              />
              <ShadowTokenRow
                name="elevation-1"
                token="--shadow-sm"
                value="0 1px 3px rgba(0,0,0,0.08)"
                usage="Subtle cards, hover states ⭐ MOST USED"
                elevation={1}
              />
              <ShadowTokenRow
                name="elevation-2"
                token="--shadow-md"
                value="0 4px 12px rgba(0,0,0,0.12)"
                usage="Cards, buttons, tooltips"
                elevation={2}
              />
              <ShadowTokenRow
                name="elevation-3"
                token="--shadow-lg"
                value="0 8px 24px rgba(0,0,0,0.15)"
                usage="Dropdowns, popovers, sticky elements"
                elevation={3}
              />
              <ShadowTokenRow
                name="elevation-4"
                token="--shadow-xl"
                value="0 12px 32px rgba(0,0,0,0.18)"
                usage="Modals, drawers, overlays"
                elevation={4}
              />
              <ShadowTokenRow
                name="elevation-5"
                token="--shadow-2xl"
                value="0 20px 48px rgba(0,0,0,0.24)"
                usage="Critical dialogs, fullscreen modals"
                elevation={5}
              />
            </tbody>
          </table>
        </div>
      </CategorySection>

      {/* ACCENT SHADOWS - PURPLE TINT */}
      <CategorySection
        title="Accent Shadows - Purple Tint (Premium Feel)"
        description="Purple-tinted shadows for sophisticated, premium components. Use sparingly for hero cards, featured content, or premium CTAs."
      >
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-black/20 bg-black/[0.02]">
                <th className="text-left p-4 text-xs font-bold">Level</th>
                <th className="text-left p-4 text-xs font-bold">Shadow Value (Click to Copy)</th>
                <th className="text-left p-4 text-xs font-bold">Token</th>
                <th className="text-left p-4 text-xs font-bold">Common Usage</th>
                <th className="text-left p-4 text-xs font-bold">Visual Preview</th>
              </tr>
            </thead>
            <tbody>
              <ShadowTokenRow
                name="accent-shadow-sm"
                token="--shadow-accent-sm"
                value="0 2px 8px rgba(128,108,224,0.15), 0 1px 3px rgba(0,0,0,0.08)"
                usage="Premium cards, featured content"
                elevation={1}
              />
              <ShadowTokenRow
                name="accent-shadow-md"
                token="--shadow-accent-md"
                value="0 8px 24px rgba(128,108,224,0.24), 0 2px 8px rgba(0,0,0,0.12)"
                usage="Hero cards, highlighted sections ⭐"
                elevation={2}
              />
              <ShadowTokenRow
                name="accent-shadow-lg"
                token="--shadow-accent-lg"
                value="0 16px 40px rgba(128,108,224,0.32), 0 4px 12px rgba(0,0,0,0.15)"
                usage="Large feature cards, premium CTAs"
                elevation={3}
              />
            </tbody>
          </table>
        </div>

        <div className="p-6 bg-purple-50 border-t border-purple-200">
          <h4 className="font-semibold text-purple-900 mb-3">⚠️ Usage Guidelines - Accent Shadows</h4>
          <ul className="space-y-2 text-sm text-purple-900">
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span>
              <span><strong>Use sparingly</strong> - Maximum 1-3 accent shadows per page for maximum impact</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span>
              <span><strong>Hero elements only</strong> - Reserve for featured cards, premium content, or primary CTAs</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span>
              <span><strong>Consistent with color system</strong> - Purple accent aligns with --accent-purple token</span>
            </li>
          </ul>
        </div>
      </CategorySection>

      {/* INTERACTIVE STATE SHADOWS */}
      <CategorySection
        title="Interactive State Shadows - Hover & Focus"
        description="Dynamic shadow changes for interactive elements. Shadows increase on hover/focus to provide tactile feedback."
      >
        <div className="p-6 space-y-6">
          {/* Hover States */}
          <div>
            <h4 className="font-semibold mb-4">Hover State Progression</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InteractiveShadowDemo
                title="Card Hover"
                description="elevation-1 → elevation-2 on hover"
                defaultShadow="0 1px 3px rgba(0,0,0,0.08)"
                hoverShadow="0 4px 12px rgba(0,0,0,0.12)"
              />
              <InteractiveShadowDemo
                title="Button Hover"
                description="elevation-2 → elevation-3 on hover"
                defaultShadow="0 4px 12px rgba(0,0,0,0.12)"
                hoverShadow="0 8px 24px rgba(0,0,0,0.15)"
              />
              <InteractiveShadowDemo
                title="Premium Card Hover"
                description="accent-md → accent-lg on hover"
                defaultShadow="0 8px 24px rgba(128,108,224,0.24), 0 2px 8px rgba(0,0,0,0.12)"
                hoverShadow="0 16px 40px rgba(128,108,224,0.32), 0 4px 12px rgba(0,0,0,0.15)"
              />
            </div>
          </div>

          {/* Focus States */}
          <div>
            <h4 className="font-semibold mb-4">Focus State Shadows</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-black/8 rounded-[5px] p-6 bg-white">
                <p className="text-sm text-black/60 mb-4">Input Focus Shadow</p>
                <input
                  type="text"
                  placeholder="Click to focus"
                  className="w-full px-4 py-3 border border-black/10 rounded-[5px] bg-white text-black/90 placeholder:text-black/30 hover:border-black/25 focus:border-black/90 focus:outline-none transition-colors duration-150"
                  style={{
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                  }}
                />
                <code className="block mt-3 text-[10px] font-mono bg-black/5 px-2 py-1 rounded">
                  box-shadow: 0 1px 3px rgba(0,0,0,0.08);<br />
                  focus: + ring-2 ring-black/20
                </code>
              </div>

              <div className="border border-black/8 rounded-[5px] p-6 bg-white">
                <p className="text-sm text-black/60 mb-4">Button Focus Shadow</p>
                <button className="w-full px-6 py-3 bg-black text-white rounded-[5px] focus:outline-none focus:ring-4 focus:ring-black/20 transition-all hover:bg-black/90">
                  Focus me (Tab)
                </button>
                <code className="block mt-3 text-[10px] font-mono bg-black/5 px-2 py-1 rounded">
                  focus: ring-4 ring-black/20
                </code>
              </div>
            </div>
          </div>
        </div>
      </CategorySection>

      {/* COMPONENT-SPECIFIC SHADOWS */}
      <CategorySection
        title="Component-Specific Shadow Patterns"
        description="Recommended shadow usage for common component types"
      >
        <div className="p-6 space-y-6">
          {/* Cards */}
          <div>
            <h4 className="font-semibold mb-4">Cards</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ComponentShadowExample
                title="Static Card"
                shadow="0 1px 3px rgba(0,0,0,0.08)"
                token="--shadow-sm"
                description="Default state"
              />
              <ComponentShadowExample
                title="Hover Card"
                shadow="0 4px 12px rgba(0,0,0,0.12)"
                token="--shadow-md"
                description="On hover/active"
              />
              <ComponentShadowExample
                title="Premium Card"
                shadow="0 8px 24px rgba(128,108,224,0.24), 0 2px 8px rgba(0,0,0,0.12)"
                token="--shadow-accent-md"
                description="Featured content"
              />
            </div>
          </div>

          {/* Buttons */}
          <div>
            <h4 className="font-semibold mb-4">Buttons</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 border border-gray-200 rounded-[5px] p-6">
                <button 
                  className="w-full px-6 py-3 bg-black text-white rounded-[5px] transition-all"
                  style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}
                >
                  Default
                </button>
                <code className="block mt-3 text-[10px] font-mono bg-white px-2 py-1 rounded">
                  --shadow-sm
                </code>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-[5px] p-6">
                <button 
                  className="w-full px-6 py-3 bg-[var(--brand-red)] text-white rounded-[5px] transition-all"
                  style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.12)' }}
                >
                  Primary CTA
                </button>
                <code className="block mt-3 text-[10px] font-mono bg-white px-2 py-1 rounded">
                  --shadow-md
                </code>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-[5px] p-6">
                <button 
                  className="w-full px-6 py-3 bg-black text-white rounded-[5px] transition-all"
                  style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}
                >
                  Hero CTA
                </button>
                <code className="block mt-3 text-[10px] font-mono bg-white px-2 py-1 rounded">
                  --shadow-lg
                </code>
              </div>
            </div>
          </div>

          {/* Overlays */}
          <div>
            <h4 className="font-semibold mb-4">Overlays & Modals</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ComponentShadowExample
                title="Dropdown / Tooltip"
                shadow="0 8px 24px rgba(0,0,0,0.15)"
                token="--shadow-lg"
                description="Floating menus"
              />
              <ComponentShadowExample
                title="Modal Dialog"
                shadow="0 20px 48px rgba(0,0,0,0.24)"
                token="--shadow-2xl"
                description="Critical overlays"
              />
            </div>
          </div>
        </div>
      </CategorySection>

      {/* LAYERING & Z-INDEX INTEGRATION */}
      <div className="border border-black/8 rounded-[5px] p-6 bg-amber-50">
        <h3 className="font-semibold text-amber-900 mb-3">🎯 Layering & Z-Index Integration</h3>
        <p className="text-sm text-amber-900 mb-4">
          Elevation shadows should correspond with z-index layers for consistent visual hierarchy:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-[5px] overflow-hidden">
            <thead>
              <tr className="border-b border-amber-200 bg-amber-100">
                <th className="text-left p-3 text-xs font-bold text-amber-900">Z-Index Layer</th>
                <th className="text-left p-3 text-xs font-bold text-amber-900">Elevation Level</th>
                <th className="text-left p-3 text-xs font-bold text-amber-900">Shadow Token</th>
                <th className="text-left p-3 text-xs font-bold text-amber-900">Use Case</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-amber-100">
                <td className="p-3"><code className="text-xs">z-0</code></td>
                <td className="p-3">elevation-0 or 1</td>
                <td className="p-3"><code className="text-xs">--shadow-none / --shadow-sm</code></td>
                <td className="p-3">Base content, cards</td>
              </tr>
              <tr className="border-b border-amber-100">
                <td className="p-3"><code className="text-xs">z-10</code></td>
                <td className="p-3">elevation-2 or 3</td>
                <td className="p-3"><code className="text-xs">--shadow-md / --shadow-lg</code></td>
                <td className="p-3">Dropdowns, tooltips</td>
              </tr>
              <tr className="border-b border-amber-100">
                <td className="p-3"><code className="text-xs">z-20</code></td>
                <td className="p-3">elevation-3</td>
                <td className="p-3"><code className="text-xs">--shadow-lg</code></td>
                <td className="p-3">Sticky elements</td>
              </tr>
              <tr className="border-b border-amber-100">
                <td className="p-3"><code className="text-xs">z-30-40</code></td>
                <td className="p-3">elevation-4 or 5</td>
                <td className="p-3"><code className="text-xs">--shadow-xl / --shadow-2xl</code></td>
                <td className="p-3">Modals, overlays</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* CODE SNIPPET EXAMPLES */}
      <div className="border border-black/8 rounded-[5px] p-6 bg-black/[0.02]">
        <h3 className="text-xl font-semibold mb-4">💻 Code Snippet Examples</h3>
        <div className="space-y-4">
          <CodeSnippetBox
            title="CSS Variables - Shadows"
            code={`/* Using shadow tokens in CSS */
.card {
  box-shadow: var(--shadow-sm);  /* 0 1px 3px rgba(0,0,0,0.08) */
}

.card:hover {
  box-shadow: var(--shadow-md);  /* Elevation increases on hover */
}

/* Premium card with accent shadow */
.premium-card {
  box-shadow: var(--shadow-accent-md);
}

/* Modal with maximum elevation */
.modal {
  box-shadow: var(--shadow-2xl);
  z-index: 40;
}`}
          />
          
          <CodeSnippetBox
            title="Tailwind CSS - Custom Shadows"
            code={`/* tailwind.config.js */
module.exports = {
  theme: {
    extend: {
      boxShadow: {
        'sm': '0 1px 3px rgba(0,0,0,0.08)',
        'md': '0 4px 12px rgba(0,0,0,0.12)',
        'lg': '0 8px 24px rgba(0,0,0,0.15)',
        'xl': '0 12px 32px rgba(0,0,0,0.18)',
        '2xl': '0 20px 48px rgba(0,0,0,0.24)',
        'accent-md': '0 8px 24px rgba(128,108,224,0.24), 0 2px 8px rgba(0,0,0,0.12)',
      }
    }
  }
}

/* Usage in components */
<div className="shadow-sm hover:shadow-md transition-shadow">
  Card content
</div>`}
          />
          
          <CodeSnippetBox
            title="React Component with Hover State"
            code={`import { useState } from 'react';

function InteractiveCard({ children }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      className="p-6 rounded-[5px] transition-all duration-300"
      style={{
        boxShadow: isHovered 
          ? 'var(--shadow-md)'  // Hover state
          : 'var(--shadow-sm)'  // Default state
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </div>
  );
}`}
          />
        </div>
      </div>

      {/* USAGE PRINCIPLES */}
      <div className="bg-green-50 border border-green-300 rounded-[5px] p-6">
        <h3 className="font-semibold text-green-900 mb-3">✅ ELEVATION USAGE PRINCIPLES</h3>
        <ul className="space-y-2 text-sm text-green-900">
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>Progressive elevation</strong> - Higher z-index = stronger shadow for visual consistency</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>Hover feedback</strong> - Increase shadow by 1 level on hover (elevation-1 → elevation-2)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>Accent shadows sparingly</strong> - Use purple-tinted shadows for 1-3 hero elements max per page</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>Smooth transitions</strong> - Apply transition-all duration-300 for shadow changes</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>Combine with z-index</strong> - Match elevation level with appropriate z-index layer</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>Don't over-elevate</strong> - Most UI needs elevation-0 to elevation-2 only</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

// Helper function for interactive shadow demo
function InteractiveShadowDemo({ title, description, defaultShadow, hoverShadow }: {
  title: string;
  description: string;
  defaultShadow: string;
  hoverShadow: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="border border-black/8 rounded-[5px] p-6 bg-white">
      <p className="text-sm font-semibold mb-2">{title}</p>
      <p className="text-xs text-black/60 mb-4">{description}</p>
      <div
        className="w-full h-32 bg-white rounded-[5px] transition-all duration-300 cursor-pointer flex items-center justify-center"
        style={{ boxShadow: isHovered ? hoverShadow : defaultShadow }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <MousePointer size={20} className="text-black/40" />
      </div>
      <p className="text-[10px] text-black/40 mt-3 text-center">
        {isHovered ? 'Hovered' : 'Hover to see change'}
      </p>
    </div>
  );
}

// Helper function for component shadow example
function ComponentShadowExample({ title, shadow, token, description }: {
  title: string;
  shadow: string;
  token: string;
  description: string;
}) {
  return (
    <div className="border border-black/8 rounded-[5px] p-6 bg-white">
      <p className="text-sm font-semibold mb-2">{title}</p>
      <p className="text-xs text-black/60 mb-4">{description}</p>
      <div
        className="w-full h-24 bg-white rounded-[5px] mb-3"
        style={{ boxShadow: shadow }}
      ></div>
      <code className="block text-[10px] font-mono bg-black/5 px-2 py-1 rounded">
        {token}
      </code>
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
const elevationData = {
  neutral: {
    'elevation-0': 'none',
    'elevation-1': '0 1px 3px rgba(0,0,0,0.08)',
    'elevation-2': '0 4px 12px rgba(0,0,0,0.12)',
    'elevation-3': '0 8px 24px rgba(0,0,0,0.15)',
    'elevation-4': '0 12px 32px rgba(0,0,0,0.18)',
    'elevation-5': '0 20px 48px rgba(0,0,0,0.24)',
  },
  accent: {
    'accent-sm': '0 2px 8px rgba(128,108,224,0.15), 0 1px 3px rgba(0,0,0,0.08)',
    'accent-md': '0 8px 24px rgba(128,108,224,0.24), 0 2px 8px rgba(0,0,0,0.12)',
    'accent-lg': '0 16px 40px rgba(128,108,224,0.32), 0 4px 12px rgba(0,0,0,0.15)',
  },
  usage: {
    cards: 'elevation-1 (default) → elevation-2 (hover)',
    buttons: 'elevation-1 to elevation-3 depending on prominence',
    dropdowns: 'elevation-3',
    modals: 'elevation-4 or elevation-5',
    premium: 'accent-md or accent-lg for featured content',
  },
};

function generateCSSExport() {
  return `:root {
  /* Neutral Elevation Shadows */
  --shadow-none: none;
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.12);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.15);
  --shadow-xl: 0 12px 32px rgba(0, 0, 0, 0.18);
  --shadow-2xl: 0 20px 48px rgba(0, 0, 0, 0.24);
  
  /* Accent Elevation Shadows (Purple) */
  --shadow-accent-sm: 0 2px 8px rgba(128, 108, 224, 0.15), 0 1px 3px rgba(0, 0, 0, 0.08);
  --shadow-accent-md: 0 8px 24px rgba(128, 108, 224, 0.24), 0 2px 8px rgba(0, 0, 0, 0.12);
  --shadow-accent-lg: 0 16px 40px rgba(128, 108, 224, 0.32), 0 4px 12px rgba(0, 0, 0, 0.15);
}`;
}