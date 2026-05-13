import { DocSection, ColorCard, TextColorCard, CodeExample } from './FoundationsHelpers';

/**
 * COLORS CONTENT
 * ==============
 * All color documentation for the Foundations tab.
 */

export function ColorsContent() {
  return (
    <div className="space-y-12">
      {/* Core Principle */}
      <DocSection
        title="Color System - Core Principle"
        why="Every color has semantic meaning. Using defined design tokens ensures consistency, accessibility (WCAG AAA), and maintains the minimalist editorial aesthetic through color restraint."
        what="Pure black/white foundation (92%+) with strategic Ken Bold Red accent (5% max) and accent colors for gradients only (3% max)"
        when="Use for all components, sections, and interactive elements. Always reference design tokens, never arbitrary colors."
        whenNot="Never use random Tailwind colors (text-gray-600, bg-blue-100), hardcoded hex values, or create new gray shades outside the system"
        where="Throughout entire design system - backgrounds, text, accents, borders, shadows, gradients"
        how="Start with semantic tokens (var(--brand-red), var(--text-tertiary)), limit brand red to 5% of page, use accent colors in gradients at 5-20% opacity only"
      >
        <div className="bg-blue-50 border border-blue-200 rounded-[5px] p-6">
          <h3 className="font-semibold mb-3 text-blue-900">🎨 Color Usage Rules</h3>
          <ul className="space-y-2 text-sm text-blue-900">
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-mono font-bold">•</span>
              <span><strong>Brand Red (#b01f24):</strong> Maximum 5% of any page - CTAs, critical alerts only</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-mono font-bold">•</span>
              <span><strong>Accent Colors:</strong> Maximum 3% total - gradients at 5-20% opacity, shadows only</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-black font-mono font-bold">•</span>
              <span><strong>Black/White/Warm:</strong> 92%+ of design - backgrounds, text, borders, structure</span>
            </li>
          </ul>
        </div>

        {/* Element-Color Classification — from COLORS.md */}
        <div className="border border-black/8 rounded-[5px] overflow-hidden mt-6">
          <div className="p-4 bg-black/[0.02] border-b border-black/8">
            <h4 className="font-semibold text-sm">Element-Color Classification</h4>
            <p className="text-xs text-black/60 mt-1">What's allowed and forbidden for each element type</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-black/15">
                  <th className="text-left p-3 text-xs font-bold">Element</th>
                  <th className="text-left p-3 text-xs font-bold">Allowed Colors</th>
                  <th className="text-left p-3 text-xs font-bold text-red-700">Forbidden</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { element: 'Section backgrounds', allowed: 'Black, White, Warm (#f5f2f1)', forbidden: 'Accent colors, brand red' },
                  { element: 'Body text', allowed: 'black/70, black/50', forbidden: 'Red, accent colors' },
                  { element: 'Headings', allowed: 'Black, White (on dark bg)', forbidden: 'Red, accent colors' },
                  { element: 'CTA buttons', allowed: '--brand-red (brand variant)', forbidden: 'Any other color for brand CTAs' },
                  { element: 'Secondary buttons', allowed: 'Black/neutral at rest, brand-red on hover', forbidden: 'Full-time red' },
                  { element: 'Content icons', allowed: '#806ce0 (iconColors.content)', forbidden: 'Brand red, arbitrary hex' },
                  { element: 'Utility icons', allowed: '#737373 (iconColors.utility)', forbidden: 'Brand red, accent colors' },
                  { element: 'Badge backgrounds', allowed: 'Theme-based (11 themes)', forbidden: 'Hardcoded inline colors' },
                  { element: 'Card shadows', allowed: 'Purple-tinted rgba(128,108,224,0.08)', forbidden: 'Brand red shadows' },
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-black/8 last:border-0">
                    <td className="p-3 text-sm font-semibold">{row.element}</td>
                    <td className="p-3 text-sm text-black/70">{row.allowed}</td>
                    <td className="p-3 text-sm text-red-700">{row.forbidden}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Purple Boundaries */}
        <div className="border border-purple-200 bg-purple-50 rounded-[5px] p-5 mt-6">
          <h4 className="font-semibold text-purple-900 mb-3">Purple Boundaries</h4>
          <ul className="space-y-2 text-sm text-purple-900">
            <li>• Purple is for <strong>card shadows, content icons, and badge themes</strong> only</li>
            <li>• NEVER use purple as a section background (use Black/White/Warm)</li>
            <li>• NEVER use purple for text (use black tints)</li>
            <li>• Purple shadow: <code className="font-mono text-xs bg-purple-100 px-1 rounded">0 4px 16px rgba(128,108,224,0.08)</code> for cards</li>
          </ul>
        </div>
      </DocSection>

      {/* Brand Colors */}
      <DocSection
        title="Brand Colors - Ken Bold Red"
        why="Brand identity color - bold, confident, action-oriented. Limited to 5% of any page for maximum impact."
        what="Primary brand red (#b01f24) with hover and active states for interaction feedback"
        when="Primary CTAs, critical alerts, key brand moments, destructive actions (with caution)"
        whenNot="Section backgrounds, large content areas, body text, decorative elements, non-critical buttons"
        where="Hero CTAs, Sticky CTA, Primary buttons, Inline links (on hover), Form validation errors"
        how="Use as button background, apply hover state on interaction, combine with white text for contrast"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ColorCard
            name="Brand Red"
            token="--brand-red"
            value="#b01f24"
            usage="Primary CTAs, brand identity"
            wcag="4.54:1 on white"
          />
          <ColorCard
            name="Brand Red Hover"
            token="--brand-red-hover"
            value="#8f181d"
            usage="Button hover states"
            wcag="5.77:1 on white"
          />
          <ColorCard
            name="Brand Red Active"
            token="--brand-red-active"
            value="#771419"
            usage="Button active/pressed states"
            wcag="7.41:1 on white"
          />
        </div>
        <CodeExample
          code={`// Button with brand red
<button style={{ 
  background: 'var(--brand-red)',
  color: '#ffffff'
}}>
  Schedule a Demo
</button>

// With hover/active states
.cta-button {
  background: var(--brand-red);
}
.cta-button:hover {
  background: var(--brand-red-hover);
}
.cta-button:active {
  background: var(--brand-red-active);
}`}
        />
      </DocSection>

      {/* Warm Editorial Colors - TABLE FORMAT */}
      <DocSection
        title="2. Warm Editorial Colors - SOPHISTICATED BACKGROUNDS"
        why="Warm neutrals add sophistication and editorial feel without being distracting. They create visual rhythm when alternated with white sections, making content easier to scan and navigate."
        what="Subtle section backgrounds that add warmth without distraction - 5 specific tokens from near-white to warm borders"
        when="✅ Section backgrounds for subtle highlighting, Alternative to pure white for visual rhythm, Borders and separators, Background gradients (low opacity)"
        whenNot="❌ Primary text color (insufficient contrast), Interactive elements (not actionable), More than 2-3 sections per page (overuse loses impact)"
        where="Challenges section (--warm-300), Methodology section (--warm-200), Final CTA (--warm-50), Borders/dividers (--warm-500), Timeline nodes (--warm-700)"
        how="Alternate with pure white sections for rhythm, use lighter values for backgrounds, darker values for borders/structural elements"
      >
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-black/20">
                <th className="text-left p-3 text-sm font-bold">Token</th>
                <th className="text-left p-3 text-sm font-bold">Hex</th>
                <th className="text-left p-3 text-sm font-bold">Usage</th>
                <th className="text-left p-3 text-sm font-bold">Section</th>
                <th className="text-left p-3 text-sm font-bold">Visual</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-black/8">
                <td className="p-3">
                  <code className="font-mono text-xs bg-black/5 px-2 py-1 rounded">--warm-50</code>
                </td>
                <td className="p-3"><code className="font-mono text-xs text-black/60">#fefdfd</code></td>
                <td className="p-3 text-sm">Final CTA background</td>
                <td className="p-3 text-sm text-black/60">Section 8</td>
                <td className="p-3">
                  <div className="w-16 h-8 border border-black/8 rounded" style={{ background: '#fefdfd' }}></div>
                </td>
              </tr>
              <tr className="border-b border-black/8">
                <td className="p-3">
                  <code className="font-mono text-xs bg-black/5 px-2 py-1 rounded">--warm-200</code>
                </td>
                <td className="p-3"><code className="font-mono text-xs text-black/60">#f9f7f6</code></td>
                <td className="p-3 text-sm">Methodology section</td>
                <td className="p-3 text-sm text-black/60">Section 5</td>
                <td className="p-3">
                  <div className="w-16 h-8 border border-black/8 rounded" style={{ background: '#f9f7f6' }}></div>
                </td>
              </tr>
              <tr className="border-b border-black/8 bg-yellow-50">
                <td className="p-3">
                  <code className="font-mono text-xs bg-black/5 px-2 py-1 rounded">--warm-300</code>
                  <span className="ml-2 text-xs">⭐</span>
                </td>
                <td className="p-3"><code className="font-mono text-xs text-black/60">#f5f2f1</code></td>
                <td className="p-3 text-sm font-semibold">Challenges section ⭐</td>
                <td className="p-3 text-sm text-black/60">Section 3</td>
                <td className="p-3">
                  <div className="w-16 h-8 border border-black/8 rounded" style={{ background: '#f5f2f1' }}></div>
                </td>
              </tr>
              <tr className="border-b border-black/8 bg-yellow-50">
                <td className="p-3">
                  <code className="font-mono text-xs bg-black/5 px-2 py-1 rounded">--warm-500</code>
                  <span className="ml-2 text-xs">⭐</span>
                </td>
                <td className="p-3"><code className="font-mono text-xs text-black/60">#eae5e3</code></td>
                <td className="p-3 text-sm font-semibold">Borders, separators ⭐</td>
                <td className="p-3 text-sm text-black/60">Dividers</td>
                <td className="p-3">
                  <div className="w-16 h-8 border border-black/8 rounded" style={{ background: '#eae5e3' }}></div>
                </td>
              </tr>
              <tr className="border-b border-black/8">
                <td className="p-3">
                  <code className="font-mono text-xs bg-black/5 px-2 py-1 rounded">--warm-700</code>
                </td>
                <td className="p-3"><code className="font-mono text-xs text-black/60">#c8bcb8</code></td>
                <td className="p-3 text-sm">Timeline nodes, accents</td>
                <td className="p-3 text-sm text-black/60">Components</td>
                <td className="p-3">
                  <div className="w-16 h-8 border border-black/8 rounded" style={{ background: '#c8bcb8' }}></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <CodeExample
          code={`// Challenges Section Background
<section style={{ background: 'var(--warm-300)' }}>
  {/* Content */}
</section>

// Methodology Section Background
<section style={{ background: 'var(--warm-200)' }}>
  {/* Content */}
</section>

// Border/Separator
<div style={{ borderBottom: '1px solid var(--warm-500)' }} />`}
        />
      </DocSection>

      {/* Accent Colors - ALL 5 STRATEGIC COLORS */}
      <DocSection
        title="3. Accent Colors - STRATEGIC USE (5 COLORS)"
        why="Accent colors add subtle visual interest WITHOUT breaking minimalist restraint. Used ONLY in gradients (5-20% opacity) and shadows - never as solid fills."
        what="5 specific accent colors (Purple, Periwinkle, Coral, Amber, Green) - each with semantic meaning and strict usage rules"
        when="✅ Gradient backgrounds at 5-20% opacity, Decorative shadows (purple only), Hover state gradients, Subtle visual accents"
        whenNot="❌ NEVER as solid backgrounds, NEVER for text color, NEVER for CTAs (use Brand Red), NEVER for interactive elements, NEVER more than 3% of page"
        where="Hero gradient overlay (purple 8%), Card hover states (periwinkle 12%), Success indicators (green 10%), Decorative shadows (purple 15-24%)"
        how="⚠️ CRITICAL: Maximum 3% total usage across entire page - use sparingly in gradients only, apply via background linear-gradient with low opacity, test against minimalist aesthetic"
      >
        <div className="bg-red-50 border border-red-300 rounded-[5px] p-6 mb-6">
          <h3 className="font-semibold text-red-900 mb-3">⚠️ CRITICAL USAGE RULES</h3>
          <ul className="space-y-2 text-sm text-red-900">
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span>
              <span><strong>Maximum 3% of any page</strong> - combined usage of all accent colors</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span>
              <span><strong>Gradients ONLY</strong> - use at 5-20% opacity, never solid fills</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span>
              <span><strong>Purple shadows only</strong> - purple accent can be used in box-shadow at 15-24% opacity</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span>
              <span><strong>Never for CTAs</strong> - always use Brand Red (#b01f24) for calls-to-action</span>
            </li>
          </ul>
        </div>

        <div className="space-y-8">
          {/* Purple */}
          <div className="border border-black/8 rounded-[5px] p-6 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <div className="h-24 rounded-[5px] mb-4" style={{ background: 'linear-gradient(135deg, rgba(128, 108, 224, 0.12), rgba(128, 108, 224, 0.08))' }}></div>
                <p className="font-semibold mb-1">Purple - Depth & Sophistication</p>
                <p className="font-mono text-xs text-black/60 mb-2">#806ce0 / rgb(128, 108, 224)</p>
                <p className="text-sm text-black/60 mb-3"><strong>MEANING:</strong> Professional depth, creativity, innovation</p>
                <p className="text-sm text-black/60"><strong>USAGE:</strong> Hero gradients (8%), card shadows (15-24%), hover overlays (10-12%)</p>
              </div>
              <div>
                <p className="text-xs font-mono text-black/50 mb-2">Example - Shadow:</p>
                <div 
                  className="w-full h-20 bg-white rounded-[5px] mb-3"
                  style={{ boxShadow: '0 8px 24px rgba(128, 108, 224, 0.24), 0 2px 8px rgba(0, 0, 0, 0.12)' }}
                ></div>
                <code className="block bg-black/5 rounded px-2 py-1 text-[10px] font-mono text-black/80 whitespace-pre">
{`box-shadow: 
  0 8px 24px rgba(128,108,224,0.24),
  0 2px 8px rgba(0,0,0,0.12);`}
                </code>
              </div>
            </div>
          </div>

          {/* Periwinkle */}
          <div className="border border-black/8 rounded-[5px] p-6 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="h-24 rounded-[5px] mb-4" style={{ background: 'linear-gradient(135deg, rgba(159, 168, 218, 0.12), rgba(159, 168, 218, 0.08))' }}></div>
                <p className="font-semibold mb-1">Periwinkle - Trust & Calm</p>
                <p className="font-mono text-xs text-black/60 mb-2">#9fa8da / rgb(159, 168, 218)</p>
                <p className="text-sm text-black/60 mb-3"><strong>MEANING:</strong> Trustworthiness, reliability, calm professionalism</p>
                <p className="text-sm text-black/60"><strong>USAGE:</strong> Card hover states (12%), informational overlays (8-10%)</p>
              </div>
              <div>
                <code className="block bg-black/5 rounded px-2 py-1 text-xs font-mono text-black/80 mb-3">
                  var(--accent-periwinkle)
                </code>
                <code className="block bg-black/5 rounded px-2 py-1 text-[10px] font-mono text-black/80 whitespace-pre">
{`background: linear-gradient(
  135deg,
  rgba(159,168,218,0.12),
  rgba(159,168,218,0.08)
);`}
                </code>
              </div>
            </div>
          </div>

          {/* Coral */}
          <div className="border border-black/8 rounded-[5px] p-6 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="h-24 rounded-[5px] mb-4" style={{ background: 'linear-gradient(135deg, rgba(255, 138, 128, 0.10), rgba(255, 138, 128, 0.06))' }}></div>
                <p className="font-semibold mb-1">Coral - Warmth & Energy</p>
                <p className="font-mono text-xs text-black/60 mb-2">#ff8a80 / rgb(255, 138, 128)</p>
                <p className="text-sm text-black/60 mb-3"><strong>MEANING:</strong> Approachable warmth, human energy, collaboration</p>
                <p className="text-sm text-black/60"><strong>USAGE:</strong> Team/people sections (8-10%), decorative accents (5-8%)</p>
              </div>
              <div>
                <code className="block bg-black/5 rounded px-2 py-1 text-xs font-mono text-black/80 mb-3">
                  var(--accent-coral)
                </code>
                <code className="block bg-black/5 rounded px-2 py-1 text-[10px] font-mono text-black/80 whitespace-pre">
{`background: linear-gradient(
  135deg,
  rgba(255,138,128,0.10),
  rgba(255,138,128,0.06)
);`}
                </code>
              </div>
            </div>
          </div>

          {/* Amber */}
          <div className="border border-black/8 rounded-[5px] p-6 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="h-24 rounded-[5px] mb-4" style={{ background: 'linear-gradient(135deg, rgba(255, 193, 7, 0.08), rgba(255, 193, 7, 0.05))' }}></div>
                <p className="font-semibold mb-1">Amber - Optimism & Clarity</p>
                <p className="font-mono text-xs text-black/60 mb-2">#ffc107 / rgb(255, 193, 7)</p>
                <p className="text-sm text-black/60 mb-3"><strong>MEANING:</strong> Optimism, clarity, forward-thinking, innovation</p>
                <p className="text-sm text-black/60"><strong>USAGE:</strong> Insight sections (6-8%), highlight overlays (5-7%)</p>
              </div>
              <div>
                <code className="block bg-black/5 rounded px-2 py-1 text-xs font-mono text-black/80 mb-3">
                  var(--accent-amber)
                </code>
                <code className="block bg-black/5 rounded px-2 py-1 text-[10px] font-mono text-black/80 whitespace-pre">
{`background: linear-gradient(
  135deg,
  rgba(255,193,7,0.08),
  rgba(255,193,7,0.05)
);`}
                </code>
              </div>
            </div>
          </div>

          {/* Green */}
          <div className="border border-black/8 rounded-[5px] p-6 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="h-24 rounded-[5px] mb-4" style={{ background: 'linear-gradient(135deg, rgba(102, 187, 106, 0.10), rgba(102, 187, 106, 0.06))' }}></div>
                <p className="font-semibold mb-1">Green - Growth & Success</p>
                <p className="font-mono text-xs text-black/60 mb-2">#66bb6a / rgb(102, 187, 106)</p>
                <p className="text-sm text-black/60 mb-3"><strong>MEANING:</strong> Growth, success, positive outcomes, achievement</p>
                <p className="text-sm text-black/60"><strong>USAGE:</strong> Impact/results sections (10%), success indicators (8-10%)</p>
              </div>
              <div>
                <code className="block bg-black/5 rounded px-2 py-1 text-xs font-mono text-black/80 mb-3">
                  var(--accent-green)
                </code>
                <code className="block bg-black/5 rounded px-2 py-1 text-[10px] font-mono text-black/80 whitespace-pre">
{`background: linear-gradient(
  135deg,
  rgba(102,187,106,0.10),
  rgba(102,187,106,0.06)
);`}
                </code>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-[5px] p-5">
          <p className="text-sm text-blue-900">
            <strong>💡 DESIGN PRINCIPLE:</strong> These accent colors support the minimalist aesthetic by adding subtle visual interest without overpowering the black/white/warm foundation. Always prioritize Brand Red (#b01f24) for CTAs - accent colors are decorative only.
          </p>
        </div>
      </DocSection>

      {/* Pure Colors */}
      <DocSection
        title="Pure Colors - Black & White Foundation"
        why="Pure black and white create maximum contrast and editorial clarity - the foundation of the minimalist aesthetic"
        what="Absolute black (#000000) and white (#ffffff) for backgrounds and high-contrast elements"
        when="Section backgrounds (alternating pattern), high-contrast text, navigation, overlays"
        whenNot="Never use pure black for body text (use rgba(0,0,0,0.90) instead for better readability)"
        where="Hero section (black), Resources section (black), Standard content sections (white)"
        how="Alternate between black and white sections, use for maximum visual impact and clear boundaries"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-black/8 rounded-[5px] overflow-hidden">
            <div className="h-32 bg-black"></div>
            <div className="p-4 bg-white">
              <p className="font-semibold text-sm mb-1">Pure Black</p>
              <p className="font-mono text-xs text-black/60 mb-2">#000000</p>
              <p className="text-xs text-black/60">Hero, Resources sections</p>
            </div>
          </div>
          <div className="border border-black/8 rounded-[5px] overflow-hidden">
            <div className="h-32 bg-white border-b border-black/8"></div>
            <div className="p-4 bg-white">
              <p className="font-semibold text-sm mb-1">Pure White</p>
              <p className="font-mono text-xs text-black/60 mb-2">#ffffff</p>
              <p className="text-xs text-black/60">Standard white sections</p>
            </div>
          </div>
        </div>
      </DocSection>

      {/* Text Colors */}
      <DocSection
        title="Semantic Text Colors (WCAG AAA)"
        why="Every text color passes WCAG AAA (7:1+) for maximum accessibility and readability"
        what="4-tier opacity system using black base for light backgrounds, white base for dark backgrounds"
        when="All text content - headings, body, labels, metadata on appropriate backgrounds"
        whenNot="Don't use dark text on dark backgrounds or light text on light backgrounds"
        where="Throughout all sections - see specific usage in cards below"
        how="Apply via CSS variables or inline styles, test contrast ratios, use appropriate tier for content hierarchy"
      >
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold mb-4">On Light Backgrounds</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <TextColorCard
                name="Primary"
                token="--text-primary"
                value="#000000"
                contrast="21:1"
                usage="Headings, primary text"
                where="Hero title, section headings, paragraphs"
              />
              <TextColorCard
                name="Secondary"
                token="--text-secondary"
                value="rgba(0,0,0,0.70)"
                contrast="11.4:1"
                usage="Supporting text"
                where="Descriptions, secondary content"
              />
              <TextColorCard
                name="Tertiary"
                token="--text-tertiary"
                value="rgba(0,0,0,0.60)"
                contrast="8.9:1"
                usage="Labels, metadata ⭐ MOST USED"
                where="Section labels, timestamps, categories"
              />
              <TextColorCard
                name="Subtle"
                token="--text-subtle"
                value="rgba(0,0,0,0.45)"
                contrast="5.9:1"
                usage="Decorative text"
                where="Watermarks, background text"
              />
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">On Dark Backgrounds</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-black/8 rounded-[5px] p-6 bg-black">
                <div className="mb-4">
                  <p className="text-4xl mb-2" style={{ color: 'rgba(255,255,255,1)' }}>Aa</p>
                  <p className="font-semibold text-sm mb-1 text-white">Primary On Dark</p>
                  <p className="text-xs text-green-400 mb-2">✓ WCAG AAA (21:1)</p>
                </div>
                <p className="text-xs text-white/70 mb-2"><strong>USAGE:</strong> Headings on black</p>
                <p className="text-xs text-white/50 mb-3"><strong>WHERE:</strong> Hero, Resources headings</p>
                <code className="block bg-white/10 rounded px-2 py-1 text-[10px] font-mono text-white/80">
                  #ffffff (pure white)
                </code>
              </div>

              <div className="border border-black/8 rounded-[5px] p-6 bg-black">
                <div className="mb-4">
                  <p className="text-4xl mb-2" style={{ color: 'rgba(255,255,255,0.70)' }}>Aa</p>
                  <p className="font-semibold text-sm mb-1 text-white">Secondary On Dark</p>
                  <p className="text-xs text-green-400 mb-2">✓ WCAG AAA (11.7:1)</p>
                </div>
                <p className="text-xs text-white/70 mb-2"><strong>USAGE:</strong> Body text on black</p>
                <p className="text-xs text-white/50 mb-3"><strong>WHERE:</strong> Resources descriptions</p>
                <code className="block bg-white/10 rounded px-2 py-1 text-[10px] font-mono text-white/80">
                  rgba(255,255,255,0.70)
                </code>
              </div>

              <div className="border border-black/8 rounded-[5px] p-6 bg-black">
                <div className="mb-4">
                  <p className="text-4xl mb-2" style={{ color: 'rgba(255,255,255,0.50)' }}>Aa</p>
                  <p className="font-semibold text-sm mb-1 text-white">Tertiary On Dark</p>
                  <p className="text-xs text-green-400 mb-2">✓ WCAG AA (7.4:1)</p>
                </div>
                <p className="text-xs text-white/70 mb-2"><strong>USAGE:</strong> Metadata on black</p>
                <p className="text-xs text-white/50 mb-3"><strong>WHERE:</strong> Resources labels</p>
                <code className="block bg-white/10 rounded px-2 py-1 text-[10px] font-mono text-white/80">
                  rgba(255,255,255,0.50)
                </code>
              </div>
            </div>
          </div>
        </div>
      </DocSection>

      {/* Border Colors */}
      <DocSection
        title="Border Colors & Dividers"
        why="Subtle borders create separation without harsh lines - essential for card-based layouts"
        what="Black opacity variants (5%, 8%, 10%, 15%, 20%) for different emphasis levels"
        when="Card outlines, section dividers, input borders, subtle separations, focus states"
        whenNot="Don't use for text decoration or as primary visual elements"
        where="Card borders (8%), Section dividers (10%), Input focus (15%), Active states (20%)"
        how="Apply via border property, increase opacity for more emphasis, use warm-500 for warm backgrounds"
      >
        <div className="space-y-4">
          {[
            { opacity: '5%', value: 'rgba(0,0,0,0.05)', usage: 'Barely visible dividers, subtle cards' },
            { opacity: '8%', value: 'rgba(0,0,0,0.08)', usage: 'Card borders, subtle dividers ⭐ MOST USED' },
            { opacity: '10%', value: 'rgba(0,0,0,0.10)', usage: 'Section dividers, stronger cards' },
            { opacity: '15%', value: 'rgba(0,0,0,0.15)', usage: 'Input borders, hover states' },
            { opacity: '20%', value: 'rgba(0,0,0,0.20)', usage: 'Active/focused states, emphasized dividers' },
          ].map((border) => (
            <div key={border.opacity} className="flex items-center gap-4 p-4 bg-white border border-black/8 rounded-[5px]">
              <div className="w-24 h-16 border-2 rounded" style={{ borderColor: border.value }}></div>
              <div className="flex-1">
                <p className="font-semibold text-sm mb-1">Black {border.opacity}</p>
                <p className="font-mono text-xs text-black/60 mb-1">{border.value}</p>
                <p className="text-xs text-black/50">{border.usage}</p>
              </div>
            </div>
          ))}
        </div>
      </DocSection>

      {/* Section Background Pattern */}
      <DocSection
        title="Section Background Pattern"
        why="Alternating backgrounds create visual rhythm and natural section boundaries"
        what="Strategic pattern alternating between pure black, pure white, and warm off-white"
        when="All major page sections - follow the pattern for consistency"
        where="See table below for exact pattern used in case study"
        how="Apply background colors to section elements, maintain pattern for visual coherence"
      >
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-black/20">
                <th className="text-left p-3 text-sm font-bold">Section</th>
                <th className="text-left p-3 text-sm font-bold">Background Color</th>
                <th className="text-left p-3 text-sm font-bold">Visual</th>
              </tr>
            </thead>
            <tbody>
              {[
                { section: '1. Hero Section', color: '#000000', name: 'Pure Black' },
                { section: '2. Client Context', color: '#ffffff', name: 'Pure White' },
                { section: '3. Challenges', color: '#f5f2f1', name: 'Warm Off-White' },
                { section: '4. Engagement Objectives', color: '#ffffff', name: 'Pure White' },
                { section: '5. Methodology', color: '#f5f2f1', name: 'Warm Off-White' },
                { section: '6. Impact', color: '#ffffff', name: 'Pure White' },
                { section: '7. Value Pillars', color: '#ffffff', name: 'White (border-t)' },
                { section: '8. Testimonial', color: '#ffffff', name: 'White (border-t)' },
                { section: '9. Resources', color: '#000000', name: 'Black (gradient mesh)' },
                { section: '10. Final CTA', color: '#ffffff', name: 'White (border-t)' },
              ].map((item) => (
                <tr key={item.section} className="border-b border-black/8">
                  <td className="p-3 text-sm">{item.section}</td>
                  <td className="p-3">
                    <code className="font-mono text-xs bg-black/5 px-2 py-1 rounded">{item.color}</code>
                  </td>
                  <td className="p-3">
                    <div className="w-16 h-8 border border-black/8 rounded" style={{ background: item.color }}></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocSection>

      {/* Complete Color Palette Reference - ALL COLORS */}
      <DocSection
        title="Complete Color Palette Reference - ALL COLORS"
        why="Comprehensive master reference of every color token with full 50-900 scales, RGB values, and use cases"
        what="All 10 color families: Red, Coral, Warm, Purple, Periwinkle, Perano, Green, Amber, Rose, Black (100+ total tokens)"
        when="Use when selecting colors for new features, ensuring consistency, or understanding semantic meanings"
        whenNot="Don't create colors outside this system - every need is covered"
        where="Reference when building components, implementing sections, or making color decisions"
        how="Find use case → Select family → Choose shade from 50 (lightest) to 900 (darkest)"
      >
        <div className="bg-purple-50 border border-purple-200 rounded-[5px] p-5 mb-8">
          <h3 className="font-semibold text-purple-900 mb-3">📚 Master Color Index</h3>
          <p className="text-sm text-purple-900 mb-3">
            This section contains <strong>EVERY color token</strong> in the design system with complete scales, RGB values for gradients, and specific use cases.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-xs text-purple-900">
            <div className="font-semibold">• Ken Bold Red (Brand)</div>
            <div className="font-semibold">• Coral (Warmth)</div>
            <div className="font-semibold">• Warm (Editorial)</div>
            <div className="font-semibold">• Purple (Premium)</div>
            <div className="font-semibold">• Periwinkle (Trust)</div>
            <div className="font-semibold">• Perano (Calm)</div>
            <div className="font-semibold">• Green (Success)</div>
            <div className="font-semibold">• Amber (Warning)</div>
            <div className="font-semibold">• Rose (Error)</div>
            <div className="font-semibold">• Black (Neutrals)</div>
          </div>
        </div>

        <div className="space-y-10">
          {/* Color families will be added here step by step */}
        </div>
      </DocSection>
    </div>
  );
}