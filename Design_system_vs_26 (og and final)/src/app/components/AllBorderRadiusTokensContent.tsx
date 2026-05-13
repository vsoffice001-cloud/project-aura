import { useState } from 'react';
import { Copy, Check, Download, Square, Circle as CircleIcon } from 'lucide-react';

/**
 * ALL BORDER RADIUS TOKENS - COMPLETE REFERENCE
 * ==============================================
 * Comprehensive border radius scale from 0px to full (9999px)
 * Incremental scale: 0, 2.5, 5, 10, 15, 20, 25, 30, 35... up to full
 * 
 * Features:
 * - Complete radius scale with 5px increments
 * - Component-specific usage guidelines
 * - Visual demonstrations for every size
 * - Copy-to-clipboard functionality
 * - Downloadable JSON/CSS export
 */

// ============================================
// HELPER COMPONENTS
// ============================================

function RadiusTokenRow({ name, token, value, pixels, usage, example, isHighlighted = false }: {
  name: string;
  token: string;
  value: string;
  pixels: string;
  usage: string;
  example?: string;
  isHighlighted?: boolean;
}) {
  const [copied, setCopied] = useState('');

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <tr className={`border-b border-black/8 hover:bg-black/[0.02] ${isHighlighted ? 'bg-yellow-50' : ''}`}>
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
          onClick={() => copyToClipboard(value, 'value')}
          className="hover:bg-black/5 rounded px-2 py-1 transition-colors"
        >
          <code className="text-[10px] font-mono text-black/60">{value}</code>
          {copied === 'value' && <Check size={12} className="inline ml-1 text-green-600" />}
        </button>
      </td>
      <td className="p-4">
        <code className="text-[10px] font-mono text-black/50">{pixels}</code>
      </td>
      <td className="p-4 text-xs">{usage}</td>
      {example && (
        <td className="p-4 text-xs text-black/50 italic">{example}</td>
      )}
      <td className="p-4">
        <div className="flex items-center justify-center">
          <div 
            className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-2 border-blue-500/40"
            style={{ borderRadius: value }}
          ></div>
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

export function AllBorderRadiusTokensContent() {
  const [downloadFormat, setDownloadFormat] = useState<'json' | 'css'>('json');

  const downloadTokens = () => {
    const data = downloadFormat === 'json' 
      ? JSON.stringify(radiusData, null, 2)
      : generateCSSExport();
    
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `border-radius-tokens.${downloadFormat}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 rounded-[5px] p-5 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-normal mb-3">Complete Border Radius Tokens Reference</h1>
            <p className="text-sm sm:text-base md:text-lg text-black/70 mb-4">
              Complete incremental border radius scale from 0px to full (9999px) in 5px increments. 
              Clear usage guidelines for every size from sharp corners to fully rounded elements.
            </p>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <span className="text-xs sm:text-sm text-black/60">📐 0, 2.5, 5, 10, 15, 20, 25, 30, 35...</span>
              <span className="text-xs sm:text-sm text-black/60">🎯 5px increments</span>
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
      <div className="bg-green-50 border border-green-200 rounded-[5px] p-5">
        <h3 className="font-semibold text-green-900 mb-3">📖 How to Use This Reference</h3>
        <ul className="space-y-2 text-sm text-green-900">
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>Click any radius value</strong> to copy the pixel value or token to clipboard</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>5px increments</strong> - Scale increases by 5px: 0 → 2.5 → 5 → 10 → 15 → 20...</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>Size matches context</strong> - Larger components (modals, cards) can use larger radius values</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>Visual preview</strong> shows how each radius value looks on a square element</span>
          </li>
        </ul>
      </div>

      {/* COMPLETE BORDER RADIUS SCALE */}
      <CategorySection
        title="Complete Border Radius Scale - 0px to Full"
        description="Incremental scale from sharp corners (0px) to fully rounded (9999px) with 5px increments"
      >
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-black/20 bg-black/[0.02]">
                <th className="text-left p-4 text-xs font-bold">Name</th>
                <th className="text-left p-4 text-xs font-bold">Token (Click to Copy)</th>
                <th className="text-left p-4 text-xs font-bold">Value</th>
                <th className="text-left p-4 text-xs font-bold">Pixels</th>
                <th className="text-left p-4 text-xs font-bold">Primary Usage</th>
                <th className="text-left p-4 text-xs font-bold">Example Component</th>
                <th className="text-left p-4 text-xs font-bold">Visual Preview</th>
              </tr>
            </thead>
            <tbody>
              {/* Sharp - 0px */}
              <RadiusTokenRow
                name="radius-0"
                token="--radius-0"
                value="0px"
                pixels="0px"
                usage="Sharp corners, no rounding"
                example="Technical interfaces, data tables"
              />

              {/* Minimal - 2.5px */}
              <RadiusTokenRow
                name="radius-2xs"
                token="--radius-2xs"
                value="2.5px"
                pixels="2.5px"
                usage="Barely visible rounding, subtle softening"
                example="Logos, icons, small images"
              />

              {/* Small - 5px */}
              <RadiusTokenRow
                name="radius-xs"
                token="--radius-xs"
                value="5px"
                pixels="5px"
                usage="⭐ MOST USED - Standard UI rounding"
                example="Buttons, inputs, small cards, badges"
                isHighlighted={true}
              />

              {/* Medium Small - 10px */}
              <RadiusTokenRow
                name="radius-sm"
                token="--radius-sm"
                value="10px"
                pixels="10px"
                usage="Moderate rounding, friendly feel"
                example="Medium cards, form groups, panels"
              />

              {/* Medium - 15px */}
              <RadiusTokenRow
                name="radius-md"
                token="--radius-md"
                value="15px"
                pixels="15px"
                usage="Noticeable rounding, softer appearance"
                example="Feature cards, modals, large buttons"
              />

              {/* Medium Large - 20px */}
              <RadiusTokenRow
                name="radius-lg"
                token="--radius-lg"
                value="20px"
                pixels="20px"
                usage="Strong rounding, premium feel"
                example="Hero cards, large containers, dashboards"
              />

              {/* Large - 25px */}
              <RadiusTokenRow
                name="radius-xl"
                token="--radius-xl"
                value="25px"
                pixels="25px"
                usage="Very rounded, playful aesthetic"
                example="Large modals, feature sections, hero images"
              />

              {/* Extra Large - 30px */}
              <RadiusTokenRow
                name="radius-2xl"
                token="--radius-2xl"
                value="30px"
                pixels="30px"
                usage="Heavy rounding, modern UI"
                example="Extra large cards, floating panels"
              />

              {/* 2X Extra Large - 35px */}
              <RadiusTokenRow
                name="radius-3xl"
                token="--radius-3xl"
                value="35px"
                pixels="35px"
                usage="Extreme rounding, statement pieces"
                example="Hero sections, landing page blocks"
              />

              {/* Full Round - 9999px */}
              <RadiusTokenRow
                name="radius-full"
                token="--radius-full"
                value="9999px"
                pixels="9999px"
                usage="Fully rounded / circular"
                example="Pills, avatars, badges, dots, circular buttons"
              />
            </tbody>
          </table>
        </div>

        <div className="p-6 bg-blue-50 border-t border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-3">🎯 Scale Logic - 5px Increments</h4>
          <p className="text-sm text-blue-900 mb-3">
            The border radius scale follows a <strong>5px increment pattern</strong> for easy mental math and consistent spacing:
          </p>
          <div className="bg-white rounded-[5px] p-4 font-mono text-xs text-blue-900">
            0px → 2.5px → 5px → 10px → 15px → 20px → 25px → 30px → 35px → ... → 9999px (full)
          </div>
          <p className="text-sm text-blue-900 mt-3">
            <strong>Pattern:</strong> Start at 0, jump to 2.5px for logos, then 5px increments (5, 10, 15, 20...) up to your needed size, ending with "full" for circles.
          </p>
        </div>
      </CategorySection>

      {/* SEMANTIC ALIASES */}
      <CategorySection
        title="Semantic Alias Tokens - Role-Based Mapping"
        description="These tokens map to the scale above but provide semantic meaning. Components should use these instead of raw scale tokens when the role is clear."
      >
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-black/20 bg-black/[0.02]">
                <th className="text-left p-4 text-xs font-bold">Semantic Token</th>
                <th className="text-left p-4 text-xs font-bold">Maps To</th>
                <th className="text-left p-4 text-xs font-bold">Resolved Value</th>
                <th className="text-left p-4 text-xs font-bold">Role / Usage</th>
                <th className="text-left p-4 text-xs font-bold">Used By</th>
              </tr>
            </thead>
            <tbody>
              <SemanticAliasRow
                token="--radius-element"
                mapsTo="--radius-xs"
                value="5px"
                role="Buttons, inputs, tags, icon containers"
                usedBy="ChallengesSection cards, ClientContext CTA, FinalCTA"
              />
              <SemanticAliasRow
                token="--radius-inner"
                mapsTo="--radius-2xs"
                value="2.5px"
                role="Skeleton shims, checkbox marks, inner details"
                usedBy="SkeletonCard shims, ClientContext logo"
              />
              <SemanticAliasRow
                token="--rc-radius-card"
                mapsTo="--radius-sm"
                value="10px"
                role="Card containers (outer shell)"
                usedBy="Card.tsx, SkeletonCard, ReportCard"
                isHighlighted
              />
              <SemanticAliasRow
                token="--rc-radius-card-inner"
                mapsTo="--radius-xs"
                value="5px"
                role="Nested elements inside cards"
                usedBy="AnalystPickCardB mini-card"
              />
              <SemanticAliasRow
                token="--rc-radius-image"
                mapsTo="--radius-2xs"
                value="2.5px"
                role="Thumbnails, small images"
                usedBy="AnalystPickCardB image, ReportCard thumbnail"
              />
            </tbody>
          </table>
        </div>

        <div className="p-6 bg-amber-50 border-t border-amber-200">
          <h4 className="font-semibold text-amber-900 mb-3">💡 Why Semantic Aliases?</h4>
          <p className="text-sm text-amber-900 mb-2">
            Semantic tokens decouple <strong>intent</strong> from <strong>value</strong>. If you later decide cards should use 12px radius instead of 10px, change <code className="text-xs bg-amber-100 px-1.5 py-0.5 rounded">--rc-radius-card</code> once — every Card, SkeletonCard, and ReportCard updates automatically.
          </p>
          <p className="text-sm text-amber-900">
            <strong>Rule:</strong> When a component has a clear role (card, button, image), use the semantic alias. When building something new or experimental, use the raw scale token.
          </p>
        </div>
      </CategorySection>

      {/* USAGE DECISION TREE */}
      <div className="border border-black/8 rounded-[5px] p-6 bg-purple-50">
        <h3 className="font-semibold text-purple-900 mb-4">🌳 Decision Tree - Which Radius to Use?</h3>
        <div className="space-y-4">
          <DecisionBranch
            question="Is it a circular element?"
            yes="Use radius-full (9999px)"
            yesExamples={['Avatars', 'Badges', 'Pills', 'Dots', 'Circular buttons']}
            no="Continue →"
          />
          
          <DecisionBranch
            question="Is it tiny or a logo?"
            yes="Use radius-2xs (2.5px)"
            yesExamples={['Company logos', 'Tiny icons', 'Small images']}
            no="Continue →"
          />
          
          <DecisionBranch
            question="Is it a standard UI element?"
            yes="Use radius-xs (5px) ⭐"
            yesExamples={['Buttons', 'Inputs', 'Small cards', 'Form fields', 'Standard badges']}
            no="Continue →"
          />
          
          <DecisionBranch
            question="Is it a medium-sized component?"
            yes="Use radius-sm or radius-md (10px-15px)"
            yesExamples={['Medium cards', 'Panels', 'Dropdowns', 'Tooltips', 'Modals']}
            no="Continue →"
          />
          
          <DecisionBranch
            question="Is it a large, prominent element?"
            yes="Use radius-lg to radius-2xl (20px-30px)"
            yesExamples={['Hero cards', 'Feature sections', 'Large modals', 'Dashboard panels']}
            no="Continue →"
          />
          
          <DecisionBranch
            question="Is it a hero/statement piece?"
            yes="Use radius-3xl (35px) or larger"
            yesExamples={['Landing page sections', 'Hero images', 'Feature blocks', 'Statement cards']}
            no="Default to radius-xs (5px)"
          />
        </div>
      </div>

      {/* COMPONENT-SPECIFIC GUIDELINES */}
      <CategorySection
        title="Component-Specific Radius Guidelines"
        description="Recommended border radius for different component types based on size and hierarchy"
      >
        <div className="p-6 space-y-8">
          {/* Buttons */}
          <div>
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
              Buttons & CTAs
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <ComponentExample
                title="Small Button"
                radius="5px"
                token="radius-xs"
              >
                <button className="w-full px-4 py-2 bg-black text-white text-sm" style={{ borderRadius: '5px' }}>
                  Small
                </button>
              </ComponentExample>

              <ComponentExample
                title="Standard Button"
                radius="5px"
                token="radius-xs ⭐"
              >
                <button className="w-full px-6 py-3 bg-black text-white text-sm" style={{ borderRadius: '5px' }}>
                  Standard
                </button>
              </ComponentExample>

              <ComponentExample
                title="Large Button"
                radius="10px"
                token="radius-sm"
              >
                <button className="w-full px-8 py-4 bg-black text-white" style={{ borderRadius: '10px' }}>
                  Large
                </button>
              </ComponentExample>

              <ComponentExample
                title="Pill Button"
                radius="9999px"
                token="radius-full"
              >
                <button className="w-full px-6 py-3 bg-black text-white text-sm rounded-full">
                  Pill
                </button>
              </ComponentExample>
            </div>
          </div>

          {/* Cards */}
          <div>
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
              Cards & Containers
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ComponentExample
                title="Small Card"
                radius="5px"
                token="radius-xs"
              >
                <div className="border border-black/8 bg-white p-4" style={{ borderRadius: '5px' }}>
                  <h5 className="font-semibold text-sm mb-1">Card Title</h5>
                  <p className="text-xs text-black/60">Small card content</p>
                </div>
              </ComponentExample>

              <ComponentExample
                title="Medium Card"
                radius="10px"
                token="radius-sm ⭐"
              >
                <div className="border border-black/8 bg-white p-5" style={{ borderRadius: '10px' }}>
                  <h5 className="font-semibold text-sm mb-2">Card Title</h5>
                  <p className="text-xs text-black/60">Medium card with moderate rounding</p>
                </div>
              </ComponentExample>

              <ComponentExample
                title="Large Card"
                radius="20px"
                token="radius-lg"
              >
                <div className="border border-black/8 bg-white p-6" style={{ borderRadius: '20px' }}>
                  <h5 className="font-semibold mb-2">Card Title</h5>
                  <p className="text-xs text-black/60">Large card with strong rounding</p>
                </div>
              </ComponentExample>
            </div>
          </div>

          {/* Form Inputs */}
          <div>
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded-sm"></div>
              Form Inputs
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ComponentExample
                title="Text Input"
                radius="5px"
                token="radius-xs ⭐"
              >
                <input 
                  type="text" 
                  placeholder="Enter text..."
                  className="w-full px-3 py-2 border border-black/10 bg-white text-black/90 placeholder:text-black/30 hover:border-black/25 focus:border-black/90 focus:outline-none transition-colors duration-150"
                  style={{ borderRadius: '5px' }}
                />
              </ComponentExample>

              <ComponentExample
                title="Rounded Input"
                radius="10px"
                token="radius-sm"
              >
                <input 
                  type="text" 
                  placeholder="Softer input..."
                  className="w-full px-4 py-2 border border-black/10 bg-white text-black/90 placeholder:text-black/30 hover:border-black/25 focus:border-black/90 focus:outline-none transition-colors duration-150"
                  style={{ borderRadius: '10px' }}
                />
              </ComponentExample>

              <ComponentExample
                title="Pill Input"
                radius="9999px"
                token="radius-full"
              >
                <input 
                  type="text" 
                  placeholder="Search..."
                  className="w-full px-4 py-2 border border-black/10 rounded-full bg-white text-black/90 placeholder:text-black/30 hover:border-black/25 focus:border-black/90 focus:outline-none transition-colors duration-150"
                />
              </ComponentExample>
            </div>
          </div>

          {/* Modals */}
          <div>
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
              Modals & Overlays
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ComponentExample
                title="Standard Modal"
                radius="10px"
                token="radius-sm"
              >
                <div className="border border-black/8 bg-white p-6 shadow-xl" style={{ borderRadius: '10px' }}>
                  <h5 className="font-semibold mb-2">Modal Title</h5>
                  <p className="text-xs text-black/60 mb-3">Modal content goes here</p>
                  <button className="px-4 py-2 bg-black text-white text-xs" style={{ borderRadius: '5px' }}>
                    Confirm
                  </button>
                </div>
              </ComponentExample>

              <ComponentExample
                title="Large Modal"
                radius="20px"
                token="radius-lg"
              >
                <div className="border border-black/8 bg-white p-8 shadow-xl" style={{ borderRadius: '20px' }}>
                  <h5 className="font-semibold mb-3">Large Modal</h5>
                  <p className="text-xs text-black/60 mb-4">Premium modal with strong rounding</p>
                  <button className="px-6 py-2 bg-black text-white text-xs" style={{ borderRadius: '10px' }}>
                    Continue
                  </button>
                </div>
              </ComponentExample>
            </div>
          </div>

          {/* Badges & Pills */}
          <div>
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <div className="w-3 h-3 bg-amber-500 rounded-sm"></div>
              Badges, Pills & Small Elements
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <ComponentExample
                title="Square Badge"
                radius="5px"
                token="radius-xs"
              >
                <span className="inline-block px-3 py-1 bg-black/10 text-black text-xs font-medium" style={{ borderRadius: '5px' }}>
                  New
                </span>
              </ComponentExample>

              <ComponentExample
                title="Rounded Badge"
                radius="10px"
                token="radius-sm"
              >
                <span className="inline-block px-3 py-1 bg-black/10 text-black text-xs font-medium" style={{ borderRadius: '10px' }}>
                  Featured
                </span>
              </ComponentExample>

              <ComponentExample
                title="Pill Badge"
                radius="9999px"
                token="radius-full ⭐"
              >
                <span className="inline-block px-3 py-1 bg-black/10 text-black text-xs font-medium rounded-full">
                  Premium
                </span>
              </ComponentExample>

              <ComponentExample
                title="Dot Indicator"
                radius="9999px"
                token="radius-full"
              >
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                  <div className="w-2 h-2 bg-black/20 rounded-full"></div>
                  <div className="w-2 h-2 bg-black/20 rounded-full"></div>
                </div>
              </ComponentExample>
            </div>
          </div>

          {/* Images & Media */}
          <div>
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <div className="w-3 h-3 bg-indigo-500 rounded-sm"></div>
              Images & Media
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <ComponentExample
                title="Logo"
                radius="2.5px"
                token="radius-2xs"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold" style={{ borderRadius: '2.5px' }}>
                  YI
                </div>
              </ComponentExample>

              <ComponentExample
                title="Thumbnail"
                radius="5px"
                token="radius-xs"
              >
                <div className="w-full h-20 bg-gradient-to-br from-green-400 to-blue-500" style={{ borderRadius: '5px' }}></div>
              </ComponentExample>

              <ComponentExample
                title="Feature Image"
                radius="15px"
                token="radius-md"
              >
                <div className="w-full h-20 bg-gradient-to-br from-purple-400 to-pink-500" style={{ borderRadius: '15px' }}></div>
              </ComponentExample>

              <ComponentExample
                title="Avatar"
                radius="9999px"
                token="radius-full"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
                  JD
                </div>
              </ComponentExample>
            </div>
          </div>
        </div>
      </CategorySection>

      {/* TAILWIND USAGE */}
      <div className="border border-black/8 rounded-[5px] p-6 bg-cyan-50">
        <h3 className="font-semibold text-cyan-900 mb-4">⚡ Tailwind CSS Implementation</h3>
        <p className="text-sm text-cyan-900 mb-4">
          Use Tailwind's arbitrary value syntax for precise control with your radius scale:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-[5px] overflow-hidden">
            <thead>
              <tr className="border-b border-cyan-200 bg-cyan-100">
                <th className="text-left p-3 text-xs font-bold text-cyan-900">Pixels</th>
                <th className="text-left p-3 text-xs font-bold text-cyan-900">Tailwind Class</th>
                <th className="text-left p-3 text-xs font-bold text-cyan-900">CSS Variable</th>
                <th className="text-left p-3 text-xs font-bold text-cyan-900">Most Common Use</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-cyan-100">
                <td className="p-3">0px</td>
                <td className="p-3"><code className="text-xs bg-cyan-50 px-2 py-1 rounded">rounded-none</code></td>
                <td className="p-3"><code className="text-xs">var(--radius-0)</code></td>
                <td className="p-3">Sharp corners</td>
              </tr>
              <tr className="border-b border-cyan-100">
                <td className="p-3">2.5px</td>
                <td className="p-3"><code className="text-xs bg-cyan-50 px-2 py-1 rounded">rounded-[2.5px]</code></td>
                <td className="p-3"><code className="text-xs">var(--radius-2xs)</code></td>
                <td className="p-3">Logos, icons</td>
              </tr>
              <tr className="border-b border-cyan-100 bg-yellow-50">
                <td className="p-3">5px</td>
                <td className="p-3"><code className="text-xs bg-cyan-50 px-2 py-1 rounded">rounded-[5px]</code></td>
                <td className="p-3"><code className="text-xs">var(--radius-xs)</code></td>
                <td className="p-3">⭐ Buttons, inputs, small cards</td>
              </tr>
              <tr className="border-b border-cyan-100">
                <td className="p-3">10px</td>
                <td className="p-3"><code className="text-xs bg-cyan-50 px-2 py-1 rounded">rounded-[10px]</code></td>
                <td className="p-3"><code className="text-xs">var(--radius-sm)</code></td>
                <td className="p-3">Medium cards, panels</td>
              </tr>
              <tr className="border-b border-cyan-100">
                <td className="p-3">15px</td>
                <td className="p-3"><code className="text-xs bg-cyan-50 px-2 py-1 rounded">rounded-[15px]</code></td>
                <td className="p-3"><code className="text-xs">var(--radius-md)</code></td>
                <td className="p-3">Feature cards, modals</td>
              </tr>
              <tr className="border-b border-cyan-100">
                <td className="p-3">20px</td>
                <td className="p-3"><code className="text-xs bg-cyan-50 px-2 py-1 rounded">rounded-[20px]</code></td>
                <td className="p-3"><code className="text-xs">var(--radius-lg)</code></td>
                <td className="p-3">Large cards, hero sections</td>
              </tr>
              <tr className="border-b border-cyan-100">
                <td className="p-3">25px</td>
                <td className="p-3"><code className="text-xs bg-cyan-50 px-2 py-1 rounded">rounded-[25px]</code></td>
                <td className="p-3"><code className="text-xs">var(--radius-xl)</code></td>
                <td className="p-3">Extra large containers</td>
              </tr>
              <tr className="border-b border-cyan-100">
                <td className="p-3">30px</td>
                <td className="p-3"><code className="text-xs bg-cyan-50 px-2 py-1 rounded">rounded-[30px]</code></td>
                <td className="p-3"><code className="text-xs">var(--radius-2xl)</code></td>
                <td className="p-3">Premium panels</td>
              </tr>
              <tr className="border-b border-cyan-100">
                <td className="p-3">35px</td>
                <td className="p-3"><code className="text-xs bg-cyan-50 px-2 py-1 rounded">rounded-[35px]</code></td>
                <td className="p-3"><code className="text-xs">var(--radius-3xl)</code></td>
                <td className="p-3">Hero blocks</td>
              </tr>
              <tr className="border-b border-cyan-100">
                <td className="p-3">9999px</td>
                <td className="p-3"><code className="text-xs bg-cyan-50 px-2 py-1 rounded">rounded-full</code></td>
                <td className="p-3"><code className="text-xs">var(--radius-full)</code></td>
                <td className="p-3">Pills, avatars, badges</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* CODE EXAMPLES */}
      <div className="border border-black/8 rounded-[5px] p-6 bg-black/[0.02]">
        <h3 className="text-xl font-semibold mb-4">💻 Code Snippet Examples</h3>
        <div className="space-y-4">
          <CodeSnippetBox
            title="CSS Variables - Complete Radius Scale"
            code={`:root {
  /* Border Radius Scale - 5px Increments */
  --radius-0: 0px;          /* Sharp corners */
  --radius-2xs: 2.5px;      /* Logos, icons */
  --radius-xs: 5px;         /* ⭐ PRIMARY - Buttons, inputs, small cards */
  --radius-sm: 10px;        /* Medium cards, panels */
  --radius-md: 15px;        /* Feature cards, modals */
  --radius-lg: 20px;        /* Large cards, hero sections */
  --radius-xl: 25px;        /* Extra large containers */
  --radius-2xl: 30px;       /* Premium panels */
  --radius-3xl: 35px;       /* Hero blocks */
  --radius-full: 9999px;    /* Pills, avatars, circles */
}

/* Usage Examples */
.button {
  border-radius: var(--radius-xs);  /* 5px */
}

.card {
  border-radius: var(--radius-sm);  /* 10px */
}

.modal {
  border-radius: var(--radius-lg);  /* 20px */
}

.badge {
  border-radius: var(--radius-full);  /* 9999px */
}`}
          />

          <CodeSnippetBox
            title="React Components with Tailwind"
            code={`// Button with 5px radius
<button className="px-6 py-3 bg-black text-white rounded-[5px] hover:bg-black/90">
  Click me
</button>

// Card with 10px radius
<div className="border border-black/8 rounded-[10px] p-6 bg-white">
  <h3>Card Title</h3>
  <p>Card content...</p>
</div>

// Modal with 20px radius
<div className="max-w-md mx-auto bg-white rounded-[20px] p-8 shadow-2xl">
  <h2>Modal Title</h2>
  <p>Modal content...</p>
</div>

// Badge with full radius (pill)
<span className="px-3 py-1 bg-black/10 rounded-full text-xs font-medium">
  New
</span>

// Avatar (circular)
<div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500">
  <img src={avatar} alt="User" className="w-full h-full rounded-full" />
</div>`}
          />
        </div>
      </div>

      {/* USAGE PRINCIPLES */}
      <div className="bg-blue-50 border border-blue-300 rounded-[5px] p-6">
        <h3 className="font-semibold text-blue-900 mb-3">✅ BORDER RADIUS USAGE PRINCIPLES</h3>
        <ul className="space-y-2 text-sm text-blue-900">
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>Match radius to size</strong> - Larger components can handle larger radius values (20px-30px)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>5px is the workhorse</strong> - Use radius-xs (5px) for most standard UI elements (buttons, inputs, small cards)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>10px for medium components</strong> - Cards, panels, and modals work well with 10-15px radius</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>20px+ for hero elements</strong> - Large cards and hero sections benefit from 20-30px radius</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>Full radius for pills only</strong> - Use 9999px (rounded-full) for badges, avatars, and true pill shapes</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>Consistency within groups</strong> - All buttons should use same radius, all cards should use same radius</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>Don't over-round</strong> - Excessive rounding (35px+) on small elements looks unprofessional</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

// Helper Components
function DecisionBranch({ question, yes, yesExamples, no }: {
  question: string;
  yes: string;
  yesExamples: string[];
  no: string;
}) {
  return (
    <div className="border border-purple-200 rounded-[5px] p-4 bg-white">
      <p className="font-semibold text-purple-900 mb-3">{question}</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="border-l-2 border-green-500 pl-3">
          <p className="text-sm font-medium text-green-700 mb-2">✅ YES → {yes}</p>
          <ul className="space-y-1">
            {yesExamples.map((example, idx) => (
              <li key={idx} className="text-xs text-green-600">• {example}</li>
            ))}
          </ul>
        </div>
        <div className="border-l-2 border-gray-400 pl-3">
          <p className="text-sm font-medium text-gray-700">❌ NO → {no}</p>
        </div>
      </div>
    </div>
  );
}

function ComponentExample({ title, radius, token, children }: {
  title: string;
  radius: string;
  token: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-black/8 rounded-[5px] p-3 bg-white">
      <p className="text-xs font-semibold mb-1">{title}</p>
      <div className="mb-2">
        {children}
      </div>
      <div className="space-y-0.5">
        <code className="block text-[10px] font-mono bg-black/5 px-2 py-0.5 rounded">{radius}</code>
        <code className="block text-[10px] font-mono text-black/50">{token}</code>
      </div>
    </div>
  );
}

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

function SemanticAliasRow({ token, mapsTo, value, role, usedBy, isHighlighted = false }: {
  token: string;
  mapsTo: string;
  value: string;
  role: string;
  usedBy: string;
  isHighlighted?: boolean;
}) {
  const [copied, setCopied] = useState('');

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <tr className={`border-b border-black/8 hover:bg-black/[0.02] ${isHighlighted ? 'bg-yellow-50' : ''}`}>
      <td className="p-4">
        <code className="text-xs font-mono font-semibold">{token}</code>
      </td>
      <td className="p-4">
        <button
          onClick={() => copyToClipboard(`var(${mapsTo})`, 'token')}
          className="text-left hover:bg-black/5 rounded px-2 py-1 transition-colors"
        >
          <code className="text-[10px] font-mono bg-black/5 px-1.5 py-0.5 rounded">
            {mapsTo}
          </code>
          {copied === 'token' && <Check size={12} className="inline ml-1 text-green-600" />}
        </button>
      </td>
      <td className="p-4">
        <code className="text-[10px] font-mono text-black/60">{value}</code>
      </td>
      <td className="p-4 text-xs">{role}</td>
      <td className="p-4 text-xs text-black/50 italic">{usedBy}</td>
    </tr>
  );
}

// Data structure for download
const radiusData = {
  scale: {
    '0': { value: '0px', usage: 'Sharp corners' },
    '2xs': { value: '2.5px', usage: 'Logos, icons' },
    'xs': { value: '5px', usage: 'Buttons, inputs, small cards (PRIMARY)' },
    'sm': { value: '10px', usage: 'Medium cards, panels' },
    'md': { value: '15px', usage: 'Feature cards, modals' },
    'lg': { value: '20px', usage: 'Large cards, hero sections' },
    'xl': { value: '25px', usage: 'Extra large containers' },
    '2xl': { value: '30px', usage: 'Premium panels' },
    '3xl': { value: '35px', usage: 'Hero blocks' },
    'full': { value: '9999px', usage: 'Pills, avatars, circles' },
  },
  pattern: '5px increments (0, 2.5, 5, 10, 15, 20, 25, 30, 35...)',
  primaryUsage: '5px (radius-xs) for most UI elements',
};

function generateCSSExport() {
  return `:root {
  /* Border Radius Scale - 5px Increments */
  --radius-0: 0px;
  --radius-2xs: 2.5px;
  --radius-xs: 5px;      /* PRIMARY */
  --radius-sm: 10px;
  --radius-md: 15px;
  --radius-lg: 20px;
  --radius-xl: 25px;
  --radius-2xl: 30px;
  --radius-3xl: 35px;
  --radius-full: 9999px;
}`;
}