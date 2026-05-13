import { useState } from 'react';
import { Copy, Check, Download, Maximize2, Box } from 'lucide-react';

/**
 * ALL SPACING TOKENS - COMPLETE REFERENCE
 * =========================================
 * Comprehensive spacing reference with complete 4px-based scale,
 * visual demonstrations, and usage patterns.
 * 
 * Features:
 * - 10-step spacing scale (4px - 128px)
 * - Margin vs Padding guidelines
 * - Component spacing patterns
 * - Layout spacing examples
 * - Copy-to-clipboard functionality
 * - Downloadable JSON/CSS export
 */

// ============================================
// HELPER COMPONENTS
// ============================================

function SpacingTokenRow({ name, token, pixels, rem, usage, example }: {
  name: string;
  token: string;
  pixels: string;
  rem: string;
  usage: string;
  example: 'margin' | 'padding' | 'gap';
}) {
  const [copied, setCopied] = useState('');

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  const pixelValue = parseInt(pixels);

  return (
    <tr className="border-b border-black/8 hover:bg-black/[0.02]">
      <td className="p-4">
        <code className="text-xs font-mono font-semibold">{name}</code>
      </td>
      <td className="p-4">
        <button
          onClick={() => copyToClipboard(`var(${token})`, 'token')}
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
          onClick={() => copyToClipboard(pixels, 'pixels')}
          className="hover:bg-black/5 rounded px-2 py-1 transition-colors"
        >
          <code className="text-[10px] font-mono text-black/60">{pixels}</code>
          {copied === 'pixels' && <Check size={12} className="inline ml-1 text-green-600" />}
        </button>
      </td>
      <td className="p-4">
        <button
          onClick={() => copyToClipboard(rem, 'rem')}
          className="hover:bg-black/5 rounded px-2 py-1 transition-colors"
        >
          <code className="text-[10px] font-mono text-black/60">{rem}</code>
          {copied === 'rem' && <Check size={12} className="inline ml-1 text-green-600" />}
        </button>
      </td>
      <td className="p-4 text-xs">{usage}</td>
      <td className="p-4">
        {/* Visual representation */}
        <div className="flex items-center gap-2">
          {example === 'padding' && (
            <div className="border border-blue-300 bg-blue-50" style={{ padding: `${pixelValue}px` }}>
              <div className="w-12 h-12 bg-blue-400 rounded"></div>
            </div>
          )}
          {example === 'margin' && (
            <div className="bg-green-50 border border-green-300">
              <div style={{ margin: `${pixelValue}px` }} className="w-12 h-12 bg-green-400 rounded"></div>
            </div>
          )}
          {example === 'gap' && (
            <div className="flex gap-0 border border-purple-300 bg-purple-50 p-2" style={{ gap: `${pixelValue}px` }}>
              <div className="w-6 h-6 bg-purple-400 rounded"></div>
              <div className="w-6 h-6 bg-purple-400 rounded"></div>
            </div>
          )}
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

export function AllSpacingTokensContent() {
  const [downloadFormat, setDownloadFormat] = useState<'json' | 'css'>('json');

  const downloadTokens = () => {
    const data = downloadFormat === 'json' 
      ? JSON.stringify(spacingData, null, 2)
      : generateCSSExport();
    
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `spacing-tokens.${downloadFormat}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-[5px] p-5 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-normal mb-3">Complete Spacing Tokens Reference</h1>
            <p className="text-sm sm:text-base md:text-lg text-black/70 mb-4">
              Every spacing token in the design system with the complete 4px-based scale from 4px to 128px, 
              visual demonstrations, and usage patterns. Click any token to copy to clipboard.
            </p>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <span className="text-xs sm:text-sm text-black/60">📏 10-step spacing scale</span>
              <span className="text-xs sm:text-sm text-black/60">📐 4px base unit</span>
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
      <div className="bg-amber-50 border border-amber-200 rounded-[5px] p-5">
        <h3 className="font-semibold text-amber-900 mb-3">📖 How to Use This Reference</h3>
        <ul className="space-y-2 text-sm text-amber-900">
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>Click any token</strong> to copy to clipboard (--space-md, 16px, or 1rem)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>4px base unit</strong> - All spacing is a multiple of 4px for pixel-perfect alignment</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>Visual examples</strong> show padding (blue), margin (green), and gap (purple)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>Download</strong> complete token set as JSON or CSS for direct integration</span>
          </li>
        </ul>
      </div>

      {/* COMPLETE SPACING SCALE */}
      <CategorySection
        title="Complete Spacing Scale - 4px Base Unit"
        description="10-step spacing scale from 4px to 128px. Every value is a multiple of 4px."
      >
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-black/20 bg-black/[0.02]">
                <th className="text-left p-4 text-xs font-bold">Name</th>
                <th className="text-left p-4 text-xs font-bold">Token (Click to Copy)</th>
                <th className="text-left p-4 text-xs font-bold">Pixels</th>
                <th className="text-left p-4 text-xs font-bold">Rem</th>
                <th className="text-left p-4 text-xs font-bold">Common Usage</th>
                <th className="text-left p-4 text-xs font-bold">Visual</th>
              </tr>
            </thead>
            <tbody>
              <SpacingTokenRow
                name="space-2xs"
                token="--space-2xs"
                pixels="4px"
                rem="0.25rem"
                usage="Icon-to-text gap, tight spacing"
                example="gap"
              />
              <SpacingTokenRow
                name="space-xs"
                token="--space-xs"
                pixels="8px"
                rem="0.5rem"
                usage="Button padding (vertical), small gaps"
                example="padding"
              />
              <SpacingTokenRow
                name="space-sm"
                token="--space-sm"
                pixels="12px"
                rem="0.75rem"
                usage="Form input padding, small margins"
                example="padding"
              />
              <SpacingTokenRow
                name="space-md"
                token="--space-md"
                pixels="16px"
                rem="1rem"
                usage="⭐ MOST USED - Standard spacing, card padding"
                example="padding"
              />
              <SpacingTokenRow
                name="space-lg"
                token="--space-lg"
                pixels="24px"
                rem="1.5rem"
                usage="Section spacing, larger card padding"
                example="padding"
              />
              <SpacingTokenRow
                name="space-xl"
                token="--space-xl"
                pixels="32px"
                rem="2rem"
                usage="Component spacing, medium section gaps"
                example="margin"
              />
              <SpacingTokenRow
                name="space-2xl"
                token="--space-2xl"
                pixels="48px"
                rem="3rem"
                usage="Section padding, large component spacing"
                example="padding"
              />
              <SpacingTokenRow
                name="space-3xl"
                token="--space-3xl"
                pixels="64px"
                rem="4rem"
                usage="Hero section padding, major section gaps"
                example="padding"
              />
              <SpacingTokenRow
                name="space-4xl"
                token="--space-4xl"
                pixels="96px"
                rem="6rem"
                usage="Extra large section spacing"
                example="margin"
              />
              <SpacingTokenRow
                name="space-5xl"
                token="--space-5xl"
                pixels="128px"
                rem="8rem"
                usage="Massive spacing (rare), hero vertical space"
                example="margin"
              />
            </tbody>
          </table>
        </div>
      </CategorySection>

      {/* MARGIN VS PADDING GUIDE */}
      <CategorySection
        title="Margin vs Padding - When to Use Which"
        description="Clear guidelines for choosing between margin and padding in different contexts"
      >
        <div className="p-6 space-y-6">
          {/* Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Padding */}
            <div className="border border-blue-200 rounded-[5px] overflow-hidden bg-blue-50">
              <div className="bg-blue-100 border-b border-blue-200 p-4">
                <h4 className="font-semibold text-blue-900 flex items-center gap-2">
                  <Box size={18} />
                  Padding - Internal Spacing
                </h4>
              </div>
              <div className="p-6 space-y-3">
                <p className="text-sm text-blue-900 mb-4">
                  <strong>WHEN TO USE:</strong> Space INSIDE a component, between the border and content
                </p>
                <ul className="space-y-2 text-sm text-blue-900">
                  <li className="flex items-start gap-2">
                    <span>✓</span>
                    <span>Button padding (text to edge)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>✓</span>
                    <span>Card padding (content to card edge)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>✓</span>
                    <span>Form input padding</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>✓</span>
                    <span>Section/container internal spacing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>✓</span>
                    <span>When background color matters</span>
                  </li>
                </ul>
                
                {/* Visual Example */}
                <div className="mt-4 bg-white p-4 rounded border border-blue-300">
                  <div className="border-2 border-blue-500 bg-blue-100" style={{ padding: '24px' }}>
                    <div className="bg-blue-400 text-white text-xs font-mono p-2 rounded text-center">
                      Content
                    </div>
                  </div>
                  <p className="text-xs text-blue-700 mt-2 text-center">
                    Padding: 24px (space-lg)
                  </p>
                </div>
              </div>
            </div>

            {/* Margin */}
            <div className="border border-green-200 rounded-[5px] overflow-hidden bg-green-50">
              <div className="bg-green-100 border-b border-green-200 p-4">
                <h4 className="font-semibold text-green-900 flex items-center gap-2">
                  <Maximize2 size={18} />
                  Margin - External Spacing
                </h4>
              </div>
              <div className="p-6 space-y-3">
                <p className="text-sm text-green-900 mb-4">
                  <strong>WHEN TO USE:</strong> Space BETWEEN components, pushing elements apart
                </p>
                <ul className="space-y-2 text-sm text-green-900">
                  <li className="flex items-start gap-2">
                    <span>✓</span>
                    <span>Space between paragraphs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>✓</span>
                    <span>Space between sections</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>✓</span>
                    <span>Vertical rhythm (margin-bottom)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>✓</span>
                    <span>Component separation in lists</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>✓</span>
                    <span>When background doesn't matter</span>
                  </li>
                </ul>
                
                {/* Visual Example */}
                <div className="mt-4 bg-white p-4 rounded border border-green-300">
                  <div className="space-y-0">
                    <div className="bg-green-400 text-white text-xs font-mono p-2 rounded text-center" style={{ marginBottom: '24px' }}>
                      Component 1
                    </div>
                    <div className="bg-green-400 text-white text-xs font-mono p-2 rounded text-center">
                      Component 2
                    </div>
                  </div>
                  <p className="text-xs text-green-700 mt-2 text-center">
                    Margin-bottom: 24px (space-lg)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Gap (Flexbox/Grid) */}
          <div className="border border-purple-200 rounded-[5px] overflow-hidden bg-purple-50">
            <div className="bg-purple-100 border-b border-purple-200 p-4">
              <h4 className="font-semibold text-purple-900">Gap - Modern Layout Spacing (Flexbox/Grid)</h4>
            </div>
            <div className="p-6">
              <p className="text-sm text-purple-900 mb-4">
                <strong>WHEN TO USE:</strong> Space between flex/grid children (preferred modern approach)
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <ul className="space-y-2 text-sm text-purple-900">
                    <li className="flex items-start gap-2">
                      <span>✓</span>
                      <span>Flexbox layouts (horizontal/vertical)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>✓</span>
                      <span>Grid layouts (rows and columns)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>✓</span>
                      <span>Card grids, button groups, navigation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>✓</span>
                      <span>Cleaner than margin (no collapsing issues)</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded border border-purple-300">
                  <div className="flex gap-4">
                    <div className="bg-purple-400 text-white text-xs font-mono p-4 rounded flex-1 text-center">
                      Item 1
                    </div>
                    <div className="bg-purple-400 text-white text-xs font-mono p-4 rounded flex-1 text-center">
                      Item 2
                    </div>
                    <div className="bg-purple-400 text-white text-xs font-mono p-4 rounded flex-1 text-center">
                      Item 3
                    </div>
                  </div>
                  <p className="text-xs text-purple-700 mt-2 text-center">
                    gap: 16px (space-md)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CategorySection>

      {/* COMPONENT SPACING PATTERNS */}
      <CategorySection
        title="Component Spacing Patterns"
        description="Common spacing patterns for different component types"
      >
        <div className="p-6 space-y-8">
          {/* Buttons */}
          <div>
            <h4 className="font-semibold mb-4">Buttons</h4>
            <div className="bg-blue-50 border border-blue-200 rounded-[5px] p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-black text-white px-6 py-2 rounded-[5px] text-sm">
                    Primary Button
                  </div>
                  <code className="text-xs bg-black/5 px-2 py-1 rounded">padding: 8px 24px (space-xs × space-lg)</code>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-black text-white px-8 py-3 rounded-[5px]">
                    Large Button
                  </div>
                  <code className="text-xs bg-black/5 px-2 py-1 rounded">padding: 12px 32px (space-sm × space-xl)</code>
                </div>
                <div className="flex gap-3">
                  <div className="bg-black text-white px-6 py-2 rounded-[5px] text-sm">Button 1</div>
                  <div className="bg-black text-white px-6 py-2 rounded-[5px] text-sm">Button 2</div>
                </div>
                <code className="text-xs bg-black/5 px-2 py-1 rounded block">gap: 12px (space-sm) for button groups</code>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div>
            <h4 className="font-semibold mb-4">Cards</h4>
            <div className="bg-green-50 border border-green-200 rounded-[5px] p-6">
              <div className="border border-black/8 rounded-[5px] p-6 bg-white max-w-sm">
                <h5 className="font-semibold mb-3">Card Title</h5>
                <p className="text-sm text-black/70 mb-4">Card description content goes here with standard spacing patterns.</p>
                <button className="bg-black text-white px-4 py-2 rounded text-sm">Action</button>
              </div>
              <div className="mt-4 space-y-1 text-xs font-mono bg-white p-3 rounded border border-green-300">
                <p>• Card padding: 24px (space-lg)</p>
                <p>• Title margin-bottom: 12px (space-sm)</p>
                <p>• Description margin-bottom: 16px (space-md)</p>
              </div>
            </div>
          </div>

          {/* Forms */}
          <div>
            <h4 className="font-semibold mb-4">Forms</h4>
            <div className="bg-purple-50 border border-purple-200 rounded-[5px] p-6">
              <div className="max-w-sm space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full border border-black/10 rounded-[5px] px-3 py-2 bg-white text-black/90 placeholder:text-black/30 hover:border-black/25 focus:border-black/90 focus:outline-none transition-colors duration-150"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <input 
                    type="password" 
                    className="w-full border border-black/10 rounded-[5px] px-3 py-2 bg-white text-black/90 placeholder:text-black/30 hover:border-black/25 focus:border-black/90 focus:outline-none transition-colors duration-150"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              <div className="mt-4 space-y-1 text-xs font-mono bg-white p-3 rounded border border-purple-300">
                <p>• Input padding: 8px 12px (space-xs × space-sm)</p>
                <p>• Label margin-bottom: 8px (space-xs)</p>
                <p>• Form field spacing: 16px (space-md)</p>
              </div>
            </div>
          </div>

          {/* Sections */}
          <div>
            <h4 className="font-semibold mb-4">Page Sections</h4>
            <div className="bg-amber-50 border border-amber-200 rounded-[5px] p-6">
              <div className="bg-white rounded-[5px] border border-black/8 overflow-hidden">
                <div className="bg-black/2 p-12">
                  <h3 className="text-2xl font-normal mb-2">Section Title</h3>
                  <p className="text-black/70">Section content area</p>
                </div>
                <div className="bg-white p-12">
                  <h3 className="text-2xl font-normal mb-2">Another Section</h3>
                  <p className="text-black/70">More content</p>
                </div>
              </div>
              <div className="mt-4 space-y-1 text-xs font-mono bg-white p-3 rounded border border-amber-300">
                <p>• Section padding: 48px-64px (space-2xl to space-3xl)</p>
                <p>• Section heading margin-bottom: 24px (space-lg)</p>
                <p>• Between sections: 64px-96px (space-3xl to space-4xl)</p>
              </div>
            </div>
          </div>
        </div>
      </CategorySection>

      {/* CODE SNIPPET EXAMPLES */}
      <div className="border border-black/8 rounded-[5px] p-6 bg-black/[0.02]">
        <h3 className="text-xl font-semibold mb-4">💻 Code Snippet Examples</h3>
        <div className="space-y-4">
          <CodeSnippetBox
            title="CSS Variables - Spacing"
            code={`/* Using spacing tokens in CSS */
.button {
  padding: var(--space-xs) var(--space-lg); /* 8px 24px */
}

.card {
  padding: var(--space-lg);  /* 24px */
  margin-bottom: var(--space-xl);  /* 32px */
}

.section {
  padding: var(--space-3xl) 0;  /* 64px vertical */
}

/* Flexbox with gap */
.button-group {
  display: flex;
  gap: var(--space-sm);  /* 12px */
}`}
          />
          
          <CodeSnippetBox
            title="Grid Layout with Gap"
            code={`/* Grid with spacing tokens */
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-lg);  /* 24px between cards */
}

/* Responsive grid */
@media (max-width: 768px) {
  .card-grid {
    grid-template-columns: 1fr;
    gap: var(--space-md);  /* 16px on mobile */
  }
}`}
          />
          
          <CodeSnippetBox
            title="React Component Example"
            code={`// Using spacing tokens in React
<div style={{ padding: 'var(--space-lg)' }}>
  <h2 style={{ marginBottom: 'var(--space-md)' }}>
    Heading
  </h2>
  <p style={{ marginBottom: 'var(--space-lg)' }}>
    Paragraph text
  </p>
  <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
    <button>Button 1</button>
    <button>Button 2</button>
  </div>
</div>`}
          />
        </div>
      </div>

      {/* USAGE PRINCIPLES */}
      <div className="bg-indigo-50 border border-indigo-300 rounded-[5px] p-6">
        <h3 className="font-semibold text-indigo-900 mb-3">✅ SPACING USAGE PRINCIPLES</h3>
        <ul className="space-y-2 text-sm text-indigo-900">
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>Always use CSS variables</strong> - Prefer var(--space-md) over hardcoded pixel values</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>4px base unit</strong> - All spacing must be a multiple of 4px for pixel-perfect alignment</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>Use gap for modern layouts</strong> - Prefer gap over margin for flex/grid layouts</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>Padding for internal, margin for external</strong> - Choose based on relationship to component boundary</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>Consistent vertical rhythm</strong> - Use same spacing values for similar elements across the system</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>Responsive spacing</strong> - Consider reducing spacing on mobile (space-lg → space-md)</span>
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
const spacingData = {
  scale: {
    '2xs': { pixels: '4px', rem: '0.25rem' },
    'xs': { pixels: '8px', rem: '0.5rem' },
    'sm': { pixels: '12px', rem: '0.75rem' },
    'md': { pixels: '16px', rem: '1rem' },
    'lg': { pixels: '24px', rem: '1.5rem' },
    'xl': { pixels: '32px', rem: '2rem' },
    '2xl': { pixels: '48px', rem: '3rem' },
    '3xl': { pixels: '64px', rem: '4rem' },
    '4xl': { pixels: '96px', rem: '6rem' },
    '5xl': { pixels: '128px', rem: '8rem' },
  },
  baseUnit: '4px',
  patterns: {
    buttons: {
      small: 'padding: 8px 16px',
      medium: 'padding: 8px 24px',
      large: 'padding: 12px 32px',
    },
    cards: {
      padding: '24px',
      gap: '16px',
    },
    sections: {
      padding: '48px-64px',
      gap: '64px-96px',
    },
  },
};

function generateCSSExport() {
  return `:root {
  /* Spacing Scale - 4px base unit */
  --space-2xs: 0.25rem;  /* 4px */
  --space-xs: 0.5rem;    /* 8px */
  --space-sm: 0.75rem;   /* 12px */
  --space-md: 1rem;      /* 16px */
  --space-lg: 1.5rem;    /* 24px */
  --space-xl: 2rem;      /* 32px */
  --space-2xl: 3rem;     /* 48px */
  --space-3xl: 4rem;     /* 64px */
  --space-4xl: 6rem;     /* 96px */
  --space-5xl: 8rem;     /* 128px */
  
  /* Base Unit */
  --spacing-base-unit: 4px;
}`;
}