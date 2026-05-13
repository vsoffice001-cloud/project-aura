import { DocSection, TypeScaleDemo } from './FoundationsHelpers';

/**
 * TYPOGRAPHY CONTENT
 * ==================
 * All typography documentation for the Foundations tab.
 */

export function TypographyContent() {
  const typeScale = [
    { token: '--text-xs', pixels: '12.8px', usage: 'Section labels, metadata ⭐', where: '"CASE STUDY" badge, category tags' },
    { token: '--text-sm', pixels: '16px', usage: 'Body text, descriptions ⭐ MOST USED', where: 'All paragraph content, challenge questions' },
    { token: '--text-base', pixels: '20px', usage: 'Large body, card titles', where: 'Card headings with 4+ cards' },
    { token: '--text-xl', pixels: '31.25px', usage: 'Subsection headings (h3)', where: 'Methodology steps, objective titles' },
    { token: '--text-2xl', pixels: '39px', usage: 'Section headings (h2) ⭐', where: 'Client Context, Challenges, Impact, etc.' },
    { token: '--text-3xl', pixels: '48.8px', usage: 'Hero headings (h1) ⭐ HERO ONLY', where: 'Hero Section title, Final CTA heading' },
  ];

  return (
    <div className="space-y-12">
      <DocSection
        title="Type Scale - Major Third (1.25 Ratio)"
        why="Mathematical progression creates harmonious visual hierarchy. Major Third (1.25x) ratio provides clear distinction between sizes while maintaining readability."
        what="Each size is 1.25× the previous size, starting from 16px base"
        when="Use for all typography - headings, body text, labels. Only deviate for spatial constraints."
        where="Throughout all 9 sections of the case study"
      >
        <div className="space-y-4">
          {typeScale.map((type) => (
            <TypeScaleDemo key={type.token} {...type} />
          ))}
        </div>
      </DocSection>

      {/* Font Pairing System */}
      <DocSection
        title="Font Pairing System"
        why="Two-font pairing creates editorial contrast: serif headings communicate authority and craft, sans-serif body ensures readability and modern feel. This sans+serif combination is the gold standard of editorial design (NYT, Medium, The Atlantic)."
        what="DM Sans (sans-serif) for body/UI + Noto Serif (serif) for headings/display. Three CSS tokens: --font-sans, --font-serif, --font-mono"
        when="ALWAYS use Serif for h1-h3 section headings, hero titles, testimonial quotes, large display numbers. ALWAYS use Sans for body text, buttons, badges, labels, navigation, forms, metadata."
        whenNot="NEVER use Serif for buttons, badges, labels, navigation, form inputs. NEVER use Sans for hero titles or section headings. NEVER introduce a 3rd custom typeface."
      >
        <div className="space-y-6">
          {/* Live Pairing Demo */}
          <div className="border-2 border-black/15 rounded-[5px] overflow-hidden">
            <div className="p-6">
              <p className="text-[42px] leading-[1.15] tracking-[-0.015em]">
                Live Font Pairing Preview
              </p>
              <p className="text-xs text-black/60 mt-1">How our two fonts work together in practice</p>
            </div>
            <div className="p-8 space-y-6">
              <div>
                <p className="text-xs text-black/40 uppercase tracking-[1.8px] mb-2" style={{ fontFamily: 'var(--font-sans)' }}>CASE STUDY</p>
                <h2 className="mb-3" style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-2xl)', fontWeight: 300 }}>Strategic Market Intelligence</h2>
                <p className="text-black/70 leading-[1.7]" style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)' }}>
                  A comprehensive analysis of market dynamics, competitive positioning, and growth opportunities 
                  for enterprise-scale transformation. Our methodology combines quantitative rigor with qualitative insight.
                </p>
              </div>
              <div className="border-l-2 border-black/10 pl-6">
                <blockquote className="text-black/80 italic leading-[1.6]" style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-base)' }}>
                  "The insights delivered transformed our approach to the market entirely."
                </blockquote>
                <p className="text-xs text-black/50 mt-2" style={{ fontFamily: 'var(--font-sans)' }}>— Sarah Chen, VP of Strategy</p>
              </div>
            </div>
          </div>

          {/* Component-to-Font Mapping */}
          <div className="border border-black/8 rounded-[5px] overflow-hidden">
            <div className="p-4 bg-black/[0.02] border-b border-black/8">
              <h4 className="font-semibold text-sm">Component-to-Font Mapping</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-black/15">
                    <th className="text-left p-3 text-xs font-bold">Element</th>
                    <th className="text-left p-3 text-xs font-bold">Font Family</th>
                    <th className="text-left p-3 text-xs font-bold">Weight</th>
                    <th className="text-left p-3 text-xs font-bold">Token</th>
                    <th className="text-left p-3 text-xs font-bold">Rationale</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { element: 'Hero h1', font: 'Noto Serif', weight: '300 (Light)', token: '--font-serif', rationale: 'Maximum editorial impact, light weight = elegance' },
                    { element: 'Section h2', font: 'Noto Serif', weight: '300 (Light)', token: '--font-serif', rationale: 'Authority without heaviness, clear hierarchy' },
                    { element: 'Subsection h3', font: 'Noto Serif', weight: '400 (Normal)', token: '--font-serif', rationale: 'Slightly heavier for smaller heading size' },
                    { element: 'Body paragraphs', font: 'DM Sans', weight: '400 (Normal)', token: '--font-sans', rationale: 'Geometric sans for maximum readability' },
                    { element: 'Section labels', font: 'DM Sans', weight: '500 (Medium)', token: '--font-sans', rationale: 'All-caps tracking, functional clarity' },
                    { element: 'Buttons', font: 'DM Sans', weight: '500-700', token: '--font-sans', rationale: 'UI chrome must always be sans-serif' },
                    { element: 'Badges', font: 'DM Sans', weight: '500 (Medium)', token: '--font-sans', rationale: 'Small, functional elements need sans clarity' },
                    { element: 'Navigation', font: 'DM Sans', weight: '500 (Medium)', token: '--font-sans', rationale: 'Wayfinding = functional = sans-serif' },
                    { element: 'Form labels', font: 'DM Sans', weight: '500 (Medium)', token: '--font-sans', rationale: 'Forms are functional UI, not editorial' },
                    { element: 'Testimonial quotes', font: 'Noto Serif', weight: '400 (Normal)', token: '--font-serif', rationale: 'Italic serif for editorial quote treatment' },
                    { element: 'Large numbers', font: 'Noto Serif', weight: '300 (Light)', token: '--font-serif', rationale: 'Impact metrics, statistical display' },
                    { element: 'Card titles', font: 'DM Sans', weight: '600 (Semi-bold)', token: '--font-sans', rationale: 'Cards are UI components, not editorial' },
                    { element: 'Code/data', font: 'System mono', weight: '400', token: '--font-mono', rationale: 'Monospace for technical content' },
                    { element: 'Metadata/tags', font: 'DM Sans', weight: '400-500', token: '--font-sans', rationale: 'Small functional text, needs sans clarity' },
                  ].map((row, idx) => (
                    <tr key={idx} className="border-b border-black/8 last:border-0">
                      <td className="p-3 text-sm font-semibold">{row.element}</td>
                      <td className="p-3 text-sm" style={{ fontFamily: row.font === 'Noto Serif' ? 'var(--font-serif)' : row.font === 'System mono' ? 'var(--font-mono)' : 'var(--font-sans)' }}>
                        {row.font}
                      </td>
                      <td className="p-3 text-xs font-mono text-black/60">{row.weight}</td>
                      <td className="p-3"><code className="text-xs font-mono bg-black/5 px-2 py-1 rounded">{row.token}</code></td>
                      <td className="p-3 text-xs text-black/60">{row.rationale}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Weight Pairing Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 border border-green-200 rounded-[5px] p-6">
              <h4 className="font-semibold text-green-900 mb-3">Correct Pairings</h4>
              <ul className="space-y-2 text-sm text-green-900">
                <li>Serif 300 heading + Sans 400 body</li>
                <li>Serif 400 quote + Sans 500 attribution</li>
                <li>Sans 500 label + Serif 300 display heading</li>
                <li>Sans 700 button + Sans 400 description</li>
                <li>Sans 500 badge + Sans 400 card body</li>
              </ul>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-[5px] p-6">
              <h4 className="font-semibold text-red-900 mb-3">Incorrect Pairings</h4>
              <ul className="space-y-2 text-sm text-red-900">
                <li>Serif body text (unreadable at 16px long-form)</li>
                <li>Sans hero heading (loses editorial authority)</li>
                <li>Serif button text (functional elements need sans)</li>
                <li>Serif navigation (wayfinding must be sans)</li>
                <li>Mixing Serif weights 300+500 on same heading</li>
              </ul>
            </div>
          </div>

          {/* CSS Token Usage */}
          <div className="border border-black/8 rounded-[5px] overflow-hidden">
            <div className="bg-black/[0.02] px-4 py-2 border-b border-black/8">
              <span className="text-sm font-semibold">CSS Token Usage</span>
            </div>
            <pre className="p-4 overflow-x-auto bg-black/[0.02]">
              <code className="text-xs font-mono text-black/80">{`/* Font family tokens in theme.css */
--font-sans: 'DM Sans', ...sans-serif;
--font-serif: 'Noto Serif', Georgia, serif;
--font-mono: 'SF Mono', 'Fira Code', monospace;

/* Headings - always serif */
<h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 300 }}>
  Section Heading
</h2>

/* Body inherits Sans from body rule - no style needed */
<p>Body text automatically uses DM Sans</p>

/* Explicit serif for quotes */
<blockquote style={{ fontFamily: 'var(--font-serif)' }}>
  "Editorial quote..."
</blockquote>`}</code>
            </pre>
          </div>
        </div>
      </DocSection>

      {/* Font Weights */}
      <DocSection
        title="Font Weight System"
        why="Limited weight variations create consistency and prevent visual confusion"
        what="Two primary weights: Regular (400) for body, Semi-bold (600) for emphasis"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-black/[0.02] border border-black/8 rounded-[5px] p-6">
            <p style={{ fontWeight: 400 }} className="text-xl mb-1">Regular (400)</p>
            <p className="text-sm text-black/60">Body text, paragraphs, descriptions, most content</p>
          </div>
          <div className="bg-black/[0.02] border border-black/8 rounded-[5px] p-6">
            <p style={{ fontWeight: 600 }} className="text-xl mb-1">Semibold (600)</p>
            <p className="text-sm text-black/60">Headings, labels, navigation, emphasis</p>
          </div>
        </div>
      </DocSection>

      {/* Letter Spacing */}
      <DocSection
        title="Letter Spacing (Tracking)"
        why="Fine-tuning for optical balance - large text needs tightening, small all-caps need opening"
        what="Context-specific tracking adjustments"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-black/[0.02] border border-black/8 rounded-[5px] p-6">
            <p className="text-xs text-black/60 mb-3">All-Caps Labels</p>
            <p style={{ letterSpacing: '1.8px', textTransform: 'uppercase', fontSize: '12.8px' }} className="mb-4">
              CASE STUDY
            </p>
            <p className="text-xs text-black/50"><strong>Tracking:</strong> 1.8px</p>
          </div>
          <div className="bg-black/[0.02] border border-black/8 rounded-[5px] p-6">
            <p className="text-xs text-black/60 mb-3">Hero Headings</p>
            <p style={{ letterSpacing: '-0.5px', fontSize: '32px' }} className="mb-4">
              Large Title
            </p>
            <p className="text-xs text-black/50"><strong>Tracking:</strong> -0.5px</p>
          </div>
          <div className="bg-black/[0.02] border border-black/8 rounded-[5px] p-6">
            <p className="text-xs text-black/60 mb-3">Normal Text</p>
            <p style={{ letterSpacing: '0', fontSize: '16px' }} className="mb-4">
              Standard Text
            </p>
            <p className="text-xs text-black/50"><strong>Tracking:</strong> 0</p>
          </div>
        </div>
      </DocSection>

      {/* Custom Font Sizes - NEW SECTION FOR 14px */}
      <DocSection
        title="Custom Font Sizes (Outside Scale)"
        why="Some contexts require specific pixel sizes that don't fit the mathematical scale - navigation elements, compact UIs, and spatial constraints"
        what="Dedicated tokens for 12px and 14px use cases"
        when="Use when the Major Third scale doesn't provide the right size for compact navigation, TOC items, or spatial constraints"
        whenNot="Don't use for standard headings or body text - stick to the scale for those"
      >
        <div className="space-y-6">
          {/* 14px Token Family */}
          <div className="border-2 border-blue-500 bg-blue-50/50 rounded-[5px] p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-lg font-semibold text-blue-900 mb-1">14px Token Family</h4>
                <p className="text-sm text-blue-800">Three semantic tokens, same value - different purposes</p>
              </div>
              <div className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-mono">
                0.875rem = 14px
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* --text-nav */}
              <div className="bg-white border border-blue-200 rounded-[5px] p-4">
                <code className="text-sm font-mono text-blue-700 block mb-2">--text-nav</code>
                <p className="text-sm text-black/70 mb-3">Navigation elements</p>
                <ul className="text-xs text-black/60 space-y-1">
                  <li>✓ TOC item titles</li>
                  <li>✓ CTA descriptions</li>
                  <li>✓ Navigation menus</li>
                  <li>✓ Compact interfaces</li>
                </ul>
                <div className="mt-4 pt-3 border-t border-blue-100">
                  <p style={{ fontSize: 'var(--text-nav)' }} className="text-black font-medium">
                    Table of Contents Item
                  </p>
                </div>
              </div>

              {/* --text-compact */}
              <div className="bg-white border border-blue-200 rounded-[5px] p-4">
                <code className="text-sm font-mono text-blue-700 block mb-2">--text-compact</code>
                <p className="text-sm text-black/70 mb-3">Compact body text</p>
                <ul className="text-xs text-black/60 space-y-1">
                  <li>✓ Challenge cards (4+)</li>
                  <li>✓ Dense content areas</li>
                  <li>✓ Secondary paragraphs</li>
                  <li>✓ Prevent text wrapping</li>
                </ul>
                <div className="mt-4 pt-3 border-t border-blue-100">
                  <p style={{ fontSize: 'var(--text-compact)' }} className="text-black">
                    Compact body paragraph
                  </p>
                </div>
              </div>

              {/* --button-font-sm */}
              <div className="bg-white border border-blue-200 rounded-[5px] p-4">
                <code className="text-sm font-mono text-blue-700 block mb-2">--button-font-sm</code>
                <p className="text-sm text-black/70 mb-3">Small button text</p>
                <ul className="text-xs text-black/60 space-y-1">
                  <li>✓ Navbar CTAs</li>
                  <li>✓ Compact buttons</li>
                  <li>✓ TOC "Unlock" buttons</li>
                  <li>✓ Secondary actions</li>
                </ul>
                <div className="mt-4 pt-3 border-t border-blue-100">
                  <button 
                    className="px-4 py-2 bg-black text-white rounded"
                    style={{ fontSize: 'var(--button-font-sm)' }}
                  >
                    Small Button
                  </button>
                </div>
              </div>
            </div>

            {/* Usage Example */}
            <div className="mt-6 bg-blue-900 text-white rounded-[5px] p-4">
              <p className="text-sm font-semibold mb-2">💡 Why Three Tokens for Same Value?</p>
              <p className="text-xs leading-relaxed">
                Semantic naming improves code readability and maintainability. When you see <code className="bg-blue-800 px-1 rounded">var(--text-nav)</code>, 
                you immediately know it's for navigation. If we later need to adjust navigation text independently, we can change one token 
                without affecting buttons or compact body text.
              </p>
            </div>
          </div>

          {/* 12px Token — REMOVED: --text-2xs merged into --text-xs (Session 30) */}
          <div className="bg-black/[0.02] border border-black/10 rounded-[5px] p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-lg font-semibold text-black mb-1">12.8px Token (Unified)</h4>
                <code className="text-sm font-mono text-black/60">--text-xs</code>
              </div>
              <div className="bg-black text-white px-3 py-1 rounded text-sm font-mono">
                0.8rem = 12.8px
              </div>
            </div>
            <p className="text-sm text-black/70 mb-4">
              All small text — labels, metadata, molecule internals, navbar items, meta rows, chart labels
            </p>
            <ul className="text-sm text-black/60 space-y-2 mb-4">
              <li>✓ Navbar text & molecule labels</li>
              <li>✓ Card footer dates, meta rows</li>
              <li>✓ Chart labels, completion badges</li>
              <li>✓ SectionHeading label prop</li>
            </ul>
            <div className="bg-white border border-black/10 rounded-[5px] p-4">
              <p style={{ fontSize: 'var(--text-xs)' }} className="text-black">
                Navbar Menu Item
              </p>
            </div>
          </div>

          {/* Decision Matrix */}
          <div className="border border-black/10 rounded-[5px] overflow-hidden">
            <div className="bg-black/[0.02] p-4 border-b border-black/10">
              <h4 className="font-semibold">Decision Matrix: When to Use Custom Sizes</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-black/10">
                    <th className="text-left p-4 text-sm font-semibold bg-black/[0.02]">Use Case</th>
                    <th className="text-left p-4 text-sm font-semibold bg-black/[0.02]">Token</th>
                    <th className="text-left p-4 text-sm font-semibold bg-black/[0.02]">Why Custom</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-black/8">
                    <td className="p-4 text-sm">TOC Item Titles</td>
                    <td className="p-4 font-mono text-xs">var(--text-nav)</td>
                    <td className="p-4 text-sm text-black/60">Navigation needs to be readable but compact</td>
                  </tr>
                  <tr className="border-b border-black/8 bg-black/[0.01]">
                    <td className="p-4 text-sm">Small Button Text</td>
                    <td className="p-4 font-mono text-xs">var(--button-font-sm)</td>
                    <td className="p-4 text-sm text-black/60">Navbar height constraint (36-40px)</td>
                  </tr>
                  <tr className="border-b border-black/8">
                    <td className="p-4 text-sm">Challenge Cards (4+)</td>
                    <td className="p-4 font-mono text-xs">var(--text-compact)</td>
                    <td className="p-4 text-sm text-black/60">Prevents wrapping, maintains card height</td>
                  </tr>
                  <tr className="border-b border-black/8 bg-black/[0.01]">
                    <td className="p-4 text-sm">Navbar Menu / Molecule Labels</td>
                    <td className="p-4 font-mono text-xs">var(--text-xs)</td>
                    <td className="p-4 text-sm text-black/60">Unified small text token (12.8px)</td>
                  </tr>
                  <tr className="bg-black/[0.01]">
                    <td className="p-4 text-sm">CTA Descriptions</td>
                    <td className="p-4 font-mono text-xs">var(--text-nav)</td>
                    <td className="p-4 text-sm text-black/60">Compact but readable sub-text</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </DocSection>

      {/* Line Height */}
      <DocSection
        title="Line Height System"
        why="Proper line height improves readability and creates comfortable rhythm"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-black/[0.02] border border-black/8 rounded-[5px] p-6">
            <p className="font-mono text-sm mb-2">Headings</p>
            <p className="text-2xl font-bold mb-3">1.2-1.3</p>
            <p className="text-xs text-black/60">Tight, impactful</p>
          </div>
          <div className="bg-black/[0.02] border border-black/8 rounded-[5px] p-6">
            <p className="font-mono text-sm mb-2">Body Text</p>
            <p className="text-2xl font-bold mb-3">1.6-1.7</p>
            <p className="text-xs text-black/60">Comfortable reading</p>
          </div>
          <div className="bg-black/[0.02] border border-black/8 rounded-[5px] p-6">
            <p className="font-mono text-sm mb-2">Labels</p>
            <p className="text-2xl font-bold mb-3">1.4-1.5</p>
            <p className="text-xs text-black/60">Compact but clear</p>
          </div>
        </div>
      </DocSection>
    </div>
  );
}