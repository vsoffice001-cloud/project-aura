import { useState } from 'react';
import { Copy, Check, Palette, Type, Ruler, Code, ArrowLeft, Download } from 'lucide-react';
import { colors, typography, spacing, borderRadius, shadows } from '@/design-system';

export function DesignSystemPage() {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const copyToClipboard = async (text: string, token: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        setCopiedToken(token);
        setTimeout(() => setCopiedToken(null), 2000);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopiedToken(token);
        setTimeout(() => setCopiedToken(null), 2000);
      }
    } catch (err) {
      alert(`Copy this: ${text}`);
    }
  };

  const ColorSwatchCard = ({ name, hex, usage, isPrimary }: { name: string; hex: string; usage: string; isPrimary?: boolean }) => (
    <div className="border border-[#e5e5e5] rounded-[8px] overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-24 relative" style={{ backgroundColor: hex }}>
        {isPrimary && (
          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold">
            PRIMARY
          </div>
        )}
      </div>
      <div className="p-3 space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-semibold">{name}</span>
          <button
            onClick={() => copyToClipboard(hex, name)}
            className="p-1 hover:bg-[#f5f5f5] rounded transition-colors"
            title="Copy hex value"
          >
            {copiedToken === name ? (
              <Check className="h-3 w-3 text-[#16a34a]" />
            ) : (
              <Copy className="h-3 w-3 text-[#a3a3a3]" />
            )}
          </button>
        </div>
        <div className="text-xs font-mono text-[#525252]">{hex}</div>
        <div className="text-xs text-[#737373]">{usage}</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f5f2f1]">
      {/* Header */}
      <header className="bg-white border-b border-[#e5e5e5] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 
                className="text-[40px] leading-[1.2] font-bold text-[#000000] mb-2"
                style={{ fontFamily: "'Noto Serif', serif" }}
              >
                Project K 2.0 Product Design System
              </h1>
              <p className="text-[14px] text-[#525252]">
                Version 2.0.0 • Complete design tokens, patterns, and guidelines for Ken Research applications
              </p>
            </div>
            <div className="flex gap-3">
              <a 
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white text-[#b01f24] border-2 border-[#b01f24] rounded-[5px] hover:bg-[#fef2f2] transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to App
              </a>
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-[#b01f24] text-white rounded-[5px] hover:bg-[#8f181d] transition-colors">
                <Download className="h-4 w-4" />
                Export Tokens
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Quick Navigation */}
      <nav className="bg-white border-b border-[#e5e5e5]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex gap-6 py-4 overflow-x-auto">
            {[
              { icon: Palette, label: 'Colors', href: '#colors' },
              { icon: Type, label: 'Typography', href: '#typography' },
              { icon: Ruler, label: 'Spacing', href: '#spacing' },
              { icon: Code, label: 'Components', href: '#components' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#525252] hover:text-[#b01f24] hover:bg-[#fef2f2] rounded-[5px] transition-colors whitespace-nowrap"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        
        {/* Introduction */}
        <section className="mb-16">
          <div className="bg-white border border-[#e5e5e5] rounded-[8px] p-8">
            <h2 
              className="text-[32px] leading-[1.2] font-bold text-[#000000] mb-4"
              style={{ fontFamily: "'Noto Serif', serif" }}
            >
              What's New in 2.0
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-[8px] bg-[#fef2f2] flex items-center justify-center">
                  <Palette className="h-6 w-6 text-[#b01f24]" />
                </div>
                <h3 className="text-[18px] font-semibold text-[#000000]">Simplified Colors</h3>
                <p className="text-[14px] text-[#525252] leading-[1.6]">
                  Streamlined from 3 palettes to grayscale + warm + brand red. Ken Bold Red (#b01f24) is now the primary brand color.
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-[8px] bg-[#f5f6fd] flex items-center justify-center">
                  <Type className="h-6 w-6 text-[#a7abf0]" />
                </div>
                <h3 className="text-[18px] font-semibold text-[#000000]">Clear Typography</h3>
                <p className="text-[14px] text-[#525252] leading-[1.6]">
                  Noto Serif for all H1-H6 headlines, DM Sans for body text and UI elements. Simple and consistent.
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-[8px] bg-[#f9f7f6] flex items-center justify-center">
                  <Code className="h-6 w-6 text-[#c8bcb8]" />
                </div>
                <h3 className="text-[18px] font-semibold text-[#000000]">Developer Ready</h3>
                <p className="text-[14px] text-[#525252] leading-[1.6]">
                  TypeScript exports, CSS variables, and Tailwind compatibility. Import and use immediately.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Colors Section */}
        <section id="colors" className="mb-16">
          <div className="mb-8">
            <h2 
              className="text-[32px] leading-[1.2] font-bold text-[#000000] mb-2"
              style={{ fontFamily: "'Noto Serif', serif" }}
            >
              Color System
            </h2>
            <p className="text-[14px] text-[#525252]">
              Complete color palette with foundation, grayscale, warm tones, brand colors, and utilities.
            </p>
          </div>

          {/* Foundation Colors */}
          <div className="bg-white border border-[#e5e5e5] rounded-[8px] p-6 mb-6">
            <h3 className="text-[22px] font-semibold text-[#000000] mb-6">Foundation</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ColorSwatchCard
                name="Black"
                hex="#000000"
                usage="Primary text, headlines, hero backgrounds"
                isPrimary
              />
              <ColorSwatchCard
                name="White"
                hex="#ffffff"
                usage="Primary backgrounds, cards, text on dark"
                isPrimary
              />
            </div>
          </div>

          {/* Grayscale */}
          <div className="bg-white border border-[#e5e5e5] rounded-[8px] p-6 mb-6">
            <h3 className="text-[22px] font-semibold text-[#000000] mb-2">Grayscale (Black Tints)</h3>
            <p className="text-sm text-[#525252] mb-6">Complete neutral scale for text, borders, and backgrounds</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries(colors.grayscale).map(([key, value]) => (
                <ColorSwatchCard
                  key={key}
                  name={`grayscale-${key}`}
                  hex={value}
                  usage={key === '600' ? 'Body text ⭐' : key === '200' ? 'Borders' : key === '100' ? 'Backgrounds' : ''}
                  isPrimary={key === '600'}
                />
              ))}
            </div>
          </div>

          {/* Warm Scale */}
          <div className="bg-white border border-[#e5e5e5] rounded-[8px] p-6 mb-6">
            <h3 className="text-[22px] font-semibold text-[#000000] mb-2">Warm Off-White Scale</h3>
            <p className="text-sm text-[#525252] mb-6">Warm neutrals for section backgrounds and subtle differentiation</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries(colors.warm).map(([key, value]) => (
                <ColorSwatchCard
                  key={key}
                  name={`warm-${key}`}
                  hex={value}
                  usage={key === '300' ? 'Sections ⭐' : key === '500' ? 'Borders' : ''}
                  isPrimary={key === '300'}
                />
              ))}
            </div>
          </div>

          {/* Ken Bold Red */}
          <div className="bg-white border border-[#e5e5e5] rounded-[8px] p-6 mb-6">
            <h3 className="text-[22px] font-semibold text-[#000000] mb-2">Ken Bold Red - Primary Brand</h3>
            <p className="text-sm text-[#525252] mb-6">#b01f24 is the primary brand color for all CTAs and key actions</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries(colors.red).map(([key, value]) => (
                <ColorSwatchCard
                  key={key}
                  name={`red-${key}`}
                  hex={value}
                  usage={key === '600' ? 'PRIMARY CTA ⭐' : key === '700' ? 'Hover' : key === '800' ? 'Active' : ''}
                  isPrimary={key === '600'}
                />
              ))}
            </div>
          </div>

          {/* Periwinkle */}
          <div className="bg-white border border-[#e5e5e5] rounded-[8px] p-6 mb-6">
            <h3 className="text-[22px] font-semibold text-[#000000] mb-2">Periwinkle - Soft Accents</h3>
            <p className="text-sm text-[#525252] mb-6">Trust and reliability, used for secondary elements and data visualization</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries(colors.periwinkle).map(([key, value]) => (
                <ColorSwatchCard
                  key={key}
                  name={`periwinkle-${key}`}
                  hex={value}
                  usage={key === '600' ? 'Accent color ⭐' : key === '100' ? 'Icon BG' : ''}
                  isPrimary={key === '600'}
                />
              ))}
            </div>
          </div>

          {/* Utility Colors */}
          <div className="bg-white border border-[#e5e5e5] rounded-[8px] p-6">
            <h3 className="text-[22px] font-semibold text-[#000000] mb-6">Utility Colors</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ColorSwatchCard
                name="green-600"
                hex={colors.green[600]}
                usage="Success, positive metrics"
              />
              <ColorSwatchCard
                name="rose-600"
                hex={colors.rose[600]}
                usage="Errors, critical warnings"
              />
              <ColorSwatchCard
                name="amber-600"
                hex={colors.amber[600]}
                usage="Warnings, highlights"
              />
            </div>
          </div>
        </section>

        {/* Typography Section */}
        <section id="typography" className="mb-16">
          <div className="mb-8">
            <h2 
              className="text-[32px] leading-[1.2] font-bold text-[#000000] mb-2"
              style={{ fontFamily: "'Noto Serif', serif" }}
            >
              Typography
            </h2>
            <p className="text-[14px] text-[#525252]">
              Clear typography hierarchy using Noto Serif for headlines and DM Sans for body text.
            </p>
          </div>

          <div className="bg-white border border-[#e5e5e5] rounded-[8px] p-6 mb-6">
            <h3 className="text-[22px] font-semibold text-[#000000] mb-6">Font Families</h3>
            <div className="space-y-6">
              <div className="border-b border-[#e5e5e5] pb-6">
                <div 
                  className="text-[24px] font-bold text-[#000000] mb-2"
                  style={{ fontFamily: "'Noto Serif', serif" }}
                >
                  Noto Serif - Display Font
                </div>
                <div className="text-sm text-[#525252] mb-3">
                  Used exclusively for H1, H2, H3, H4, H5, H6 headlines
                </div>
                <div className="text-xs font-mono bg-[#f5f5f5] px-3 py-2 rounded inline-block">
                  font-family: 'Noto Serif', Georgia, serif
                </div>
              </div>
              <div>
                <div className="text-[24px] font-bold text-[#000000] mb-2">
                  DM Sans - Body Font
                </div>
                <div className="text-sm text-[#525252] mb-3">
                  Used for all body text, UI elements, buttons, and general content
                </div>
                <div className="text-xs font-mono bg-[#f5f5f5] px-3 py-2 rounded inline-block">
                  font-family: 'DM Sans', sans-serif
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#e5e5e5] rounded-[8px] p-6">
            <h3 className="text-[22px] font-semibold text-[#000000] mb-6">Type Scale</h3>
            <div className="space-y-6">
              {[
                { size: '48px', label: 'Display XL', usage: 'Hero headlines' },
                { size: '36px', label: 'H1', usage: 'Page titles' },
                { size: '32px', label: 'H2', usage: 'Major sections' },
                { size: '26px', label: 'H3', usage: 'Subsections' },
                { size: '22px', label: 'H4', usage: 'Card titles' },
                { size: '18px', label: 'H5', usage: 'Small headings' },
                { size: '16px', label: 'Base / H6', usage: 'Body text, UI' },
                { size: '14px', label: 'Small', usage: 'Secondary text' },
                { size: '12px', label: 'Caption', usage: 'Labels, captions' },
              ].map((item) => (
                <div key={item.size} className="flex items-center justify-between border-b border-[#e5e5e5] pb-4 last:border-0">
                  <div>
                    <div 
                      style={{ 
                        fontSize: item.size,
                        fontFamily: item.label.includes('H') || item.label.includes('Display') ? "'Noto Serif', serif" : "'DM Sans', sans-serif",
                        lineHeight: '1.2'
                      }}
                      className="text-[#000000] font-bold"
                    >
                      {item.label}
                    </div>
                    <div className="text-xs text-[#737373] mt-1">{item.usage}</div>
                  </div>
                  <div className="text-sm font-mono text-[#525252]">{item.size}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Spacing Section */}
        <section id="spacing" className="mb-16">
          <div className="mb-8">
            <h2 
              className="text-[32px] leading-[1.2] font-bold text-[#000000] mb-2"
              style={{ fontFamily: "'Noto Serif', serif" }}
            >
              Spacing & Layout
            </h2>
            <p className="text-[14px] text-[#525252]">
              Consistent spacing scale based on 4px base unit.
            </p>
          </div>

          <div className="bg-white border border-[#e5e5e5] rounded-[8px] p-6 mb-6">
            <h3 className="text-[22px] font-semibold text-[#000000] mb-6">Base Spacing Scale</h3>
            <div className="space-y-4">
              {[
                { token: 'spacing[4]', value: '16px', usage: 'Base unit - Component padding' },
                { token: 'spacing[6]', value: '24px', usage: 'Paragraph gaps, card spacing' },
                { token: 'spacing[8]', value: '32px', usage: 'Component margins' },
                { token: 'spacing[12]', value: '48px', usage: 'Section spacing' },
                { token: 'spacing[16]', value: '64px', usage: 'Major sections' },
                { token: 'spacing[24]', value: '96px', usage: 'Hero spacing' },
              ].map((item) => (
                <div key={item.token} className="flex items-center justify-between border-b border-[#e5e5e5] pb-4 last:border-0">
                  <div>
                    <div className="font-mono text-sm text-[#000000] font-semibold">{item.token}</div>
                    <div className="text-xs text-[#737373] mt-1">{item.usage}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-sm font-mono text-[#525252]">{item.value}</div>
                    <div 
                      className="bg-[#b01f24] h-4"
                      style={{ width: item.value }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-[#e5e5e5] rounded-[8px] p-6">
              <h3 className="text-[18px] font-semibold text-[#000000] mb-4">Border Radius</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#f5f5f5] rounded-[5px]" />
                  <div>
                    <div className="text-sm font-mono">5px</div>
                    <div className="text-xs text-[#737373]">Standard (md)</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#f5f5f5] rounded-[8px]" />
                  <div>
                    <div className="text-sm font-mono">8px</div>
                    <div className="text-xs text-[#737373]">Cards (lg)</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#f5f5f5] rounded-full" />
                  <div>
                    <div className="text-sm font-mono">9999px</div>
                    <div className="text-xs text-[#737373]">Pills (full)</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#e5e5e5] rounded-[8px] p-6">
              <h3 className="text-[18px] font-semibold text-[#000000] mb-4">Shadows</h3>
              <div className="space-y-3">
                <div className="p-4 bg-white rounded-[5px] shadow-sm border border-[#e5e5e5]">
                  <div className="text-sm font-mono">shadow-sm</div>
                  <div className="text-xs text-[#737373]">Subtle elevation</div>
                </div>
                <div className="p-4 bg-white rounded-[5px] shadow-md">
                  <div className="text-sm font-mono">shadow-md</div>
                  <div className="text-xs text-[#737373]">Cards, hover states</div>
                </div>
                <div className="p-4 bg-white rounded-[5px] shadow-lg">
                  <div className="text-sm font-mono">shadow-lg</div>
                  <div className="text-xs text-[#737373]">Modals, popovers</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Components Section */}
        <section id="components" className="mb-16">
          <div className="mb-8">
            <h2 
              className="text-[32px] leading-[1.2] font-bold text-[#000000] mb-2"
              style={{ fontFamily: "'Noto Serif', serif" }}
            >
              Component Patterns
            </h2>
            <p className="text-[14px] text-[#525252]">
              Common UI patterns and component styles using the design system.
            </p>
          </div>

          {/* Buttons */}
          <div className="bg-white border border-[#e5e5e5] rounded-[8px] p-6 mb-6">
            <h3 className="text-[22px] font-semibold text-[#000000] mb-6">Buttons</h3>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-[#b01f24] text-white rounded-[5px] hover:bg-[#8f181d] transition-colors font-bold shadow-md">
                Primary CTA
              </button>
              <button className="px-6 py-3 bg-white text-[#b01f24] border-2 border-[#b01f24] rounded-[5px] hover:bg-[#fef2f2] transition-colors font-semibold">
                Secondary
              </button>
              <button className="px-6 py-3 bg-[#a7abf0] text-white rounded-[5px] hover:bg-[#8b90e0] transition-colors">
                Periwinkle Accent
              </button>
              <button className="px-6 py-3 bg-[#f5f5f5] text-[#525252] rounded-[5px] hover:bg-[#e5e5e5] transition-colors">
                Neutral
              </button>
            </div>
          </div>

          {/* Cards */}
          <div className="bg-white border border-[#e5e5e5] rounded-[8px] p-6 mb-6">
            <h3 className="text-[22px] font-semibold text-[#000000] mb-6">Cards</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="border border-[#e5e5e5] rounded-[8px] p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-[8px] bg-[#fef2f2] flex items-center justify-center mb-4">
                  <Palette className="h-6 w-6 text-[#b01f24]" />
                </div>
                <h4 className="text-[18px] font-semibold text-[#000000] mb-2">Icon Card</h4>
                <p className="text-[14px] text-[#525252] leading-[1.6]">
                  Card with icon background using brand red color scheme.
                </p>
              </div>
              <div className="border border-[#e5e5e5] rounded-[8px] p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-[8px] bg-[#f5f6fd] flex items-center justify-center mb-4">
                  <Type className="h-6 w-6 text-[#a7abf0]" />
                </div>
                <h4 className="text-[18px] font-semibold text-[#000000] mb-2">Periwinkle Card</h4>
                <p className="text-[14px] text-[#525252] leading-[1.6]">
                  Card with periwinkle accent for secondary elements.
                </p>
              </div>
              <div className="border border-[#e5e5e5] rounded-[8px] p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-[8px] bg-[#f9f7f6] flex items-center justify-center mb-4">
                  <Code className="h-6 w-6 text-[#c8bcb8]" />
                </div>
                <h4 className="text-[18px] font-semibold text-[#000000] mb-2">Warm Card</h4>
                <p className="text-[14px] text-[#525252] leading-[1.6]">
                  Card with warm neutral background for subtle variation.
                </p>
              </div>
            </div>
          </div>

          {/* Alternating Sections */}
          <div className="bg-white border border-[#e5e5e5] rounded-[8px] p-6">
            <h3 className="text-[22px] font-semibold text-[#000000] mb-6">Alternating Section Backgrounds</h3>
            <div className="space-y-1 overflow-hidden rounded-[5px]">
              <div className="bg-white p-6 text-center">
                <div className="text-sm font-mono text-[#525252]">White (#ffffff)</div>
              </div>
              <div className="bg-[#f5f2f1] p-6 text-center">
                <div className="text-sm font-mono text-[#525252]">Warm 300 (#f5f2f1)</div>
              </div>
              <div className="bg-white p-6 text-center">
                <div className="text-sm font-mono text-[#525252]">White (#ffffff)</div>
              </div>
            </div>
            <p className="text-xs text-[#737373] mt-4">
              Pattern: Alternate between white and warm-300 for visual section separation
            </p>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[#e5e5e5] py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <p className="text-[14px] text-[#525252]">
            Project K 2.0 Product Design System • Version 2.0.0 • January 2026
          </p>
          <p className="text-[12px] text-[#a3a3a3] mt-2">
            Built for Ken Research applications
          </p>
        </div>
      </footer>
    </div>
  );
}
