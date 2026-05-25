import { useState } from 'react';
import { Copy, Check, Palette, Type, Ruler, Layout, Code, Download, ExternalLink } from 'lucide-react';

export function DesignSystem() {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const copyToClipboard = async (text: string, token: string) => {
    try {
      // Try modern Clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        setCopiedToken(token);
        setTimeout(() => setCopiedToken(null), 2000);
      } else {
        // Fallback to older method
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          document.execCommand('copy');
          setCopiedToken(token);
          setTimeout(() => setCopiedToken(null), 2000);
        } catch (err) {
          console.error('Fallback copy failed:', err);
          // Show the text for manual copying
          alert(`Copy this: ${text}`);
        } finally {
          document.body.removeChild(textArea);
        }
      }
    } catch (err) {
      console.error('Copy failed:', err);
      // Fallback: show text in alert for manual copying
      alert(`Copy this CSS variable: ${text}`);
    }
  };

  // Color Palettes
  const boldKenColors = [
    { name: 'bold-ken-50', hex: '#fef2f2', var: '--bold-ken-50' },
    { name: 'bold-ken-100', hex: '#fde3e4', var: '--bold-ken-100' },
    { name: 'bold-ken-200', hex: '#fdcbcd', var: '--bold-ken-200' },
    { name: 'bold-ken-300', hex: '#faa7aa', var: '--bold-ken-300' },
    { name: 'bold-ken-400', hex: '#f57478', var: '--bold-ken-400' },
    { name: 'bold-ken-500', hex: '#eb484e', var: '--bold-ken-500' },
    { name: 'bold-ken-600', hex: '#d72b31', var: '--bold-ken-600' },
    { name: 'bold-ken-700', hex: '#b01f24', var: '--bold-ken-700' },
    { name: 'bold-ken-800', hex: '#961e22', var: '--bold-ken-800' },
    { name: 'bold-ken-900', hex: '#7d1f22', var: '--bold-ken-900' },
    { name: 'bold-ken-950', hex: '#440b0d', var: '--bold-ken-950' },
    { name: 'bold-ken-951', hex: '#291b19', var: '--bold-ken-951' },
  ];

  const periwinkleColors = [
    { name: 'periwinkle-50', hex: '#eff1fe', var: '--periwinkle-50' },
    { name: 'periwinkle-100', hex: '#e2e4fd', var: '--periwinkle-100' },
    { name: 'periwinkle-200', hex: '#c3c6f9', var: '--periwinkle-200' },
    { name: 'periwinkle-300', hex: '#acadf5', var: '--periwinkle-300' },
    { name: 'periwinkle-400', hex: '#908aef', var: '--periwinkle-400' },
    { name: 'periwinkle-500', hex: '#7d6ee6', var: '--periwinkle-500' },
    { name: 'periwinkle-600', hex: '#6d52d9', var: '--periwinkle-600', primary: true },
    { name: 'periwinkle-700', hex: '#5e43bf', var: '--periwinkle-700' },
    { name: 'periwinkle-800', hex: '#4d399a', var: '--periwinkle-800' },
    { name: 'periwinkle-900', hex: '#41347b', var: '--periwinkle-900' },
    { name: 'periwinkle-950', hex: '#271f47', var: '--periwinkle-950' },
  ];

  const alabasterColors = [
    { name: 'alabaster-50', hex: '#fcfcfc', var: '--alabaster-50' },
    { name: 'alabaster-75', hex: '#f7f7f7', var: '--alabaster-75' },
    { name: 'alabaster-100', hex: '#efefef', var: '--alabaster-100' },
    { name: 'alabaster-200', hex: '#dcdcdc', var: '--alabaster-200' },
    { name: 'alabaster-300', hex: '#bdbdbd', var: '--alabaster-300' },
    { name: 'alabaster-400', hex: '#989898', var: '--alabaster-400' },
    { name: 'alabaster-500', hex: '#7c7c7c', var: '--alabaster-500' },
    { name: 'alabaster-600', hex: '#656565', var: '--alabaster-600' },
    { name: 'alabaster-700', hex: '#525252', var: '--alabaster-700' },
    { name: 'alabaster-800', hex: '#464646', var: '--alabaster-800' },
    { name: 'alabaster-900', hex: '#3d3d3d', var: '--alabaster-900', primary: true },
    { name: 'alabaster-950', hex: '#292929', var: '--alabaster-950' },
  ];

  const systemColors = [
    { name: 'system-green-light', hex: '#dcffde', var: '--system-green-light' },
    { name: 'system-green-dark', hex: '#0d7c0f', var: '--system-green-dark' },
  ];

  const ColorPaletteCard = ({ 
    title, 
    colors, 
    description 
  }: { 
    title: string; 
    colors: typeof boldKenColors; 
    description: string;
  }) => (
    <div className="bg-white border border-alabaster-200 rounded-lg p-6 mb-8">
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-alabaster-600">{description}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {colors.map((color) => (
          <div 
            key={color.name}
            className="border border-alabaster-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div 
              className="h-24 relative"
              style={{ backgroundColor: color.hex }}
            >
              {color.primary && (
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-foreground">
                  PRIMARY
                </div>
              )}
            </div>
            <div className="p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-foreground">
                  {color.name}
                </span>
                <button
                  onClick={() => copyToClipboard(color.var, color.name)}
                  className="p-1 hover:bg-alabaster-100 rounded transition-colors"
                  title="Copy CSS variable"
                >
                  {copiedToken === color.name ? (
                    <Check className="h-3 w-3 text-system-green-dark" />
                  ) : (
                    <Copy className="h-3 w-3 text-alabaster-500" />
                  )}
                </button>
              </div>
              <div className="text-xs text-alabaster-600 font-mono">{color.hex}</div>
              <div className="text-xs text-alabaster-500 font-mono bg-alabaster-50 px-2 py-1 rounded">
                var({color.var})
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-alabaster-50">
      {/* Header */}
      <header className="bg-white border-b border-alabaster-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2" style={{ fontFamily: "'Noto Serif', serif" }}>
                Project K 2.0 Design System
              </h1>
              <p className="text-alabaster-600">
                Comprehensive design tokens and guidelines for Ken Research applications
              </p>
            </div>
            <a 
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 bg-periwinkle-600 text-white rounded-lg hover:bg-periwinkle-700 transition-colors"
            >
              Back to App
            </a>
          </div>
        </div>
      </header>

      {/* Quick Navigation */}
      <nav className="bg-white border-b border-alabaster-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex gap-6 py-4 overflow-x-auto">
            {[
              { icon: Palette, label: 'Colors', href: '#colors' },
              { icon: Type, label: 'Typography', href: '#typography' },
              { icon: Ruler, label: 'Spacing', href: '#spacing' },
              { icon: Layout, label: 'Components', href: '#components' },
              { icon: Code, label: 'Usage', href: '#usage' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-alabaster-700 hover:text-periwinkle-600 hover:bg-periwinkle-50 rounded-lg transition-colors whitespace-nowrap"
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
          <div className="bg-gradient-to-br from-periwinkle-50/50 to-alabaster-50/30 border border-periwinkle-100/50 rounded-lg p-8">
            <h2 className="text-3xl font-semibold text-foreground mb-4" style={{ fontFamily: "'Noto Serif', serif" }}>
              Welcome to Project K 2.0
            </h2>
            <p className="text-alabaster-600 leading-relaxed mb-4">
              This design system provides a comprehensive set of design tokens, components, and guidelines 
              to ensure consistency across all Ken Research digital products. Built with modern web standards 
              and optimized for accessibility and performance.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white border border-alabaster-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-periwinkle-600 mb-1">38</div>
                <div className="text-sm text-alabaster-600">Color Tokens</div>
              </div>
              <div className="bg-white border border-alabaster-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-periwinkle-600 mb-1">3</div>
                <div className="text-sm text-alabaster-600">Core Palettes</div>
              </div>
              <div className="bg-white border border-alabaster-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-periwinkle-600 mb-1">100%</div>
                <div className="text-sm text-alabaster-600">Tailwind Compatible</div>
              </div>
            </div>
          </div>
        </section>

        {/* Colors Section */}
        <section id="colors" className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-semibold text-foreground mb-2" style={{ fontFamily: "'Noto Serif', serif" }}>
              Color Palettes
            </h2>
            <p className="text-alabaster-600">
              All colors are available as CSS variables, Tailwind classes, and direct hex values. 
              Click the copy icon to copy the CSS variable name.
            </p>
          </div>

          <ColorPaletteCard
            title="Bold Ken (Red Scale)"
            colors={boldKenColors}
            description="Primary brand red palette for CTAs, alerts, and accent elements. Bold Ken 700 (#b01f24) is the primary CTA color."
          />

          <ColorPaletteCard
            title="Periwinkle (Purple/Indigo Scale)"
            colors={periwinkleColors}
            description="Primary brand purple palette for icons, charts, and interactive elements. Periwinkle 600 (#6d52d9) is the primary brand color and standard for all icons."
          />

          <ColorPaletteCard
            title="Alabaster (Neutral Gray Scale)"
            colors={alabasterColors}
            description="Neutral gray palette for text, backgrounds, and borders. Alabaster 900 (#3d3d3d) is the primary text color."
          />

          <div className="bg-white border border-alabaster-200 rounded-lg p-6">
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-foreground mb-2">System Colors</h3>
              <p className="text-sm text-alabaster-600">Special purpose colors for success states and system feedback</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {systemColors.map((color) => (
                <div 
                  key={color.name}
                  className="border border-alabaster-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div 
                    className="h-24"
                    style={{ backgroundColor: color.hex }}
                  ></div>
                  <div className="p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold text-foreground">
                        {color.name}
                      </span>
                      <button
                        onClick={() => copyToClipboard(color.var, color.name)}
                        className="p-1 hover:bg-alabaster-100 rounded transition-colors"
                        title="Copy CSS variable"
                      >
                        {copiedToken === color.name ? (
                          <Check className="h-3 w-3 text-system-green-dark" />
                        ) : (
                          <Copy className="h-3 w-3 text-alabaster-500" />
                        )}
                      </button>
                    </div>
                    <div className="text-xs text-alabaster-600 font-mono">{color.hex}</div>
                    <div className="text-xs text-alabaster-500 font-mono bg-alabaster-50 px-2 py-1 rounded">
                      var({color.var})
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Typography Section */}
        <section id="typography" className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-semibold text-foreground mb-2" style={{ fontFamily: "'Noto Serif', serif" }}>
              Typography
            </h2>
            <p className="text-alabaster-600">
              Typography system using DM Sans for body text and Noto Serif for headings.
            </p>
          </div>

          <div className="bg-white border border-alabaster-200 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold text-foreground mb-4">Font Families</h3>
            <div className="space-y-4">
              <div className="border-b border-alabaster-100 pb-4">
                <div className="font-semibold text-foreground mb-2" style={{ fontFamily: "'Noto Serif', serif" }}>
                  Noto Serif - Display Font
                </div>
                <div className="text-sm text-alabaster-600">
                  Used for display headings (H1-H6) and section titles
                </div>
                <div className="mt-2 text-xs font-mono bg-alabaster-50 px-2 py-1 rounded inline-block">
                  font-family: 'Noto Serif', Georgia, serif
                </div>
              </div>
              <div>
                <div className="font-semibold text-foreground mb-2">
                  DM Sans - Heading & Body Font
                </div>
                <div className="text-sm text-alabaster-600">
                  Used for headings, body text, UI elements, and general content
                </div>
                <div className="mt-2 text-xs font-mono bg-alabaster-50 px-2 py-1 rounded inline-block">
                  font-family: 'DM Sans', sans-serif
                </div>
              </div>
            </div>
          </div>

          {/* CRITICAL TYPOGRAPHY RULE */}
          <div className="bg-gradient-to-br from-bold-ken-50 to-periwinkle-50 border-2 border-bold-ken-300 rounded-lg p-6 mb-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-bold-ken-700 flex items-center justify-center flex-shrink-0">
                <Type className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg text-bold-ken-900 mb-1">
                  ⚠️ MANDATORY Typography Rule
                </h3>
                <p className="text-sm text-bold-ken-800 font-semibold">
                  ALL H1, H2, H3, H4, H5, H6 elements MUST use Noto Serif — never override
                </p>
              </div>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-bold-ken-200">
              <div className="text-xs font-mono text-alabaster-900 mb-2 font-semibold">
                Global CSS Rule (Applied in theme.css):
              </div>
              <div className="bg-alabaster-900 text-alabaster-100 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <pre>{`h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display); /* Noto Serif – MANDATORY */
  font-weight: var(--font-bold);
  letter-spacing: -0.02em;
  color: var(--color-text-primary);
}`}</pre>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-system-green-light flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="h-3 w-3 text-system-green-dark" />
                </div>
                <div className="text-sm text-alabaster-800">
                  <span className="font-semibold">Correct:</span> Use semantic HTML tags (h1-h6) and let the design system handle the font
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-bold-ken-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-bold-ken-700 font-bold text-xs">✕</span>
                </div>
                <div className="text-sm text-alabaster-800">
                  <span className="font-semibold">Wrong:</span> Never override with <code className="bg-alabaster-900 text-alabaster-100 px-1 rounded text-xs">font-family: 'DM Sans'</code> on headings
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-bold-ken-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-bold-ken-700 font-bold text-xs">✕</span>
                </div>
                <div className="text-sm text-alabaster-800">
                  <span className="font-semibold">Wrong:</span> Never use <code className="bg-alabaster-900 text-alabaster-100 px-1 rounded text-xs">className="font-body"</code> on h1-h6 elements
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-bold-ken-200">
              <p className="text-xs text-alabaster-700">
                <span className="font-semibold">Why this rule?</span> Consistent heading typography across all pages is critical for brand identity. 
                Noto Serif creates visual hierarchy and distinguishes headings from body content. This rule is enforced 
                globally in theme.css and applies to ALL semantic heading tags.
              </p>
            </div>
          </div>

          <div className="bg-white border border-alabaster-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-foreground mb-6">Typography Scale</h3>
            
            {/* Three column layout */}
            <div className="grid gap-6 md:grid-cols-3">
              {/* Noto Serif Display - H1 to H6 */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-alabaster-200">
                  <div className="text-sm font-semibold text-foreground">Noto Serif</div>
                  <span className="text-xs bg-periwinkle-100 text-periwinkle-700 px-2 py-0.5 rounded font-medium">
                    Display
                  </span>
                </div>
                
                <div className="space-y-4">
                  <div className="border-b border-alabaster-100 pb-3">
                    <div style={{ fontFamily: "'Noto Serif', serif", fontSize: "36px", lineHeight: "1.2" }} className="text-foreground break-words">
                      Display H1
                    </div>
                    <div className="text-xs font-mono text-alabaster-500 mt-1">36px</div>
                  </div>
                  <div className="border-b border-alabaster-100 pb-3">
                    <div style={{ fontFamily: "'Noto Serif', serif", fontSize: "32px", lineHeight: "1.2" }} className="text-foreground break-words">
                      Display H2
                    </div>
                    <div className="text-xs font-mono text-alabaster-500 mt-1">32px</div>
                  </div>
                  <div className="border-b border-alabaster-100 pb-3">
                    <div style={{ fontFamily: "'Noto Serif', serif", fontSize: "26px", lineHeight: "1.3" }} className="text-foreground break-words">
                      Display H3
                    </div>
                    <div className="text-xs font-mono text-alabaster-500 mt-1">26px</div>
                  </div>
                  <div className="border-b border-alabaster-100 pb-3">
                    <div style={{ fontFamily: "'Noto Serif', serif", fontSize: "22px", lineHeight: "1.3" }} className="text-foreground break-words">
                      Heading H4
                    </div>
                    <div className="text-xs font-mono text-alabaster-500 mt-1">22px</div>
                  </div>
                  <div className="border-b border-alabaster-100 pb-3">
                    <div style={{ fontFamily: "'Noto Serif', serif", fontSize: "18px", lineHeight: "1.4" }} className="text-foreground break-words">
                      Heading H5
                    </div>
                    <div className="text-xs font-mono text-alabaster-500 mt-1">18px</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Noto Serif', serif", fontSize: "16px", lineHeight: "1.5" }} className="text-foreground break-words">
                      Heading H6
                    </div>
                    <div className="text-xs font-mono text-alabaster-500 mt-1">16px</div>
                  </div>
                </div>
              </div>

              {/* DM Sans Headings - H1 to H6 */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-alabaster-200">
                  <div className="text-sm font-semibold text-foreground">DM Sans</div>
                  <span className="text-xs bg-periwinkle-100 text-periwinkle-700 px-2 py-0.5 rounded font-medium">
                    Headings
                  </span>
                </div>
                
                <div className="space-y-4">
                  <div className="border-b border-alabaster-100 pb-3">
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "36px", lineHeight: "1.2" }} className="text-foreground break-words">
                      Display H1
                    </div>
                    <div className="text-xs font-mono text-alabaster-500 mt-1">36px</div>
                  </div>
                  <div className="border-b border-alabaster-100 pb-3">
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "32px", lineHeight: "1.2" }} className="text-foreground break-words">
                      Display H2
                    </div>
                    <div className="text-xs font-mono text-alabaster-500 mt-1">32px</div>
                  </div>
                  <div className="border-b border-alabaster-100 pb-3">
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "26px", lineHeight: "1.3" }} className="text-foreground break-words">
                      Display H3
                    </div>
                    <div className="text-xs font-mono text-alabaster-500 mt-1">26px</div>
                  </div>
                  <div className="border-b border-alabaster-100 pb-3">
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "22px", lineHeight: "1.3" }} className="text-foreground break-words">
                      Heading H4
                    </div>
                    <div className="text-xs font-mono text-alabaster-500 mt-1">22px</div>
                  </div>
                  <div className="border-b border-alabaster-100 pb-3">
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "18px", lineHeight: "1.4" }} className="text-foreground break-words">
                      Heading H5
                    </div>
                    <div className="text-xs font-mono text-alabaster-500 mt-1">18px</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px", lineHeight: "1.5" }} className="text-foreground break-words">
                      Heading H6
                    </div>
                    <div className="text-xs font-mono text-alabaster-500 mt-1">16px</div>
                  </div>
                </div>
              </div>

              {/* DM Sans Body */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-alabaster-200">
                  <div className="text-sm font-semibold text-foreground">DM Sans</div>
                  <span className="text-xs bg-periwinkle-100 text-periwinkle-700 px-2 py-0.5 rounded font-medium">
                    Body
                  </span>
                </div>
                
                <div className="space-y-4">
                  <div className="border-b border-alabaster-100 pb-3">
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px", lineHeight: "1.5" }} className="text-foreground break-words">
                      Body Large - Used for emphasized body text and introductions
                    </div>
                    <div className="text-xs font-mono text-alabaster-500 mt-1">16px</div>
                  </div>
                  <div className="border-b border-alabaster-100 pb-3">
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", lineHeight: "1.6" }} className="text-foreground break-words">
                      Body - Standard body text for paragraphs and content
                    </div>
                    <div className="text-xs font-mono text-alabaster-500 mt-1">14px</div>
                  </div>
                  <div className="border-b border-alabaster-100 pb-3">
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", lineHeight: "1.6" }} className="text-foreground break-words">
                      Body Small - Captions, labels, and secondary text
                    </div>
                    <div className="text-xs font-mono text-alabaster-500 mt-1">12px</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", lineHeight: "1.6" }} className="text-foreground break-words">
                      Micro - Fine print and minimal UI elements
                    </div>
                    <div className="text-xs font-mono text-alabaster-500 mt-1">10px</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Spacing Section */}
        <section id="spacing" className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-semibold text-foreground mb-2" style={{ fontFamily: "'Noto Serif', serif" }}>
              Spacing Tokens
            </h2>
            <p className="text-alabaster-600">
              Consistent spacing system for layouts, components, and content.
            </p>
          </div>

          <div className="bg-white border border-alabaster-200 rounded-lg p-6">
            <div className="space-y-4">
              {[
                { name: 'Container Padding (Small)', value: '67.5px', var: '--space-container-sm' },
                { name: 'Container Padding (Large)', value: '90px', var: '--space-container-lg' },
                { name: 'Card Padding', value: '16px', var: '--space-card-padding' },
                { name: 'Card Gap', value: '20px', var: '--space-card-gap' },
                { name: 'Section Margin', value: '64px', var: '--space-section-margin' },
                { name: 'Paragraph Gap', value: '24px', var: '--space-paragraph-gap' },
              ].map((spacing) => (
                <div key={spacing.name} className="flex items-center justify-between border-b border-alabaster-100 pb-4 last:border-0">
                  <div>
                    <div className="font-medium text-foreground">{spacing.name}</div>
                    <div className="text-xs font-mono text-alabaster-500 mt-1">var({spacing.var})</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-sm font-mono text-alabaster-600">{spacing.value}</div>
                    <div 
                      className="bg-periwinkle-600 h-4"
                      style={{ width: spacing.value }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Components Section */}
        <section id="components" className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-semibold text-foreground mb-2" style={{ fontFamily: "'Noto Serif', serif" }}>
              Component Examples
            </h2>
            <p className="text-alabaster-600">
              Common UI patterns and component styles using the design system.
            </p>
          </div>

          {/* Buttons */}
          <div className="bg-white border border-alabaster-200 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold text-foreground mb-4">Buttons</h3>
            <div className="flex flex-wrap gap-4">
              <button className="px-4 py-2 bg-bold-ken-700 text-white rounded-lg hover:bg-bold-ken-800 transition-colors">
                Primary CTA
              </button>
              <button className="px-4 py-2 bg-periwinkle-600 text-white rounded-lg hover:bg-periwinkle-700 transition-colors">
                Secondary
              </button>
              <button className="px-4 py-2 bg-alabaster-100 text-alabaster-700 border border-alabaster-200 rounded-lg hover:bg-alabaster-200 transition-colors">
                Outline
              </button>
            </div>
          </div>

          {/* Cards */}
          <div className="bg-white border border-alabaster-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-foreground mb-4">Cards</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-alabaster-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-periwinkle-100 flex items-center justify-center mb-3">
                  <Palette className="h-5 w-5 text-periwinkle-600" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Icon Card</h4>
                <p className="text-sm text-alabaster-600">Standard card with icon background using periwinkle-100 and icon color periwinkle-600.</p>
              </div>
              <div className="bg-gradient-to-br from-periwinkle-50/50 to-alabaster-50/30 border border-periwinkle-100/50 rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-2">Gradient Card</h4>
                <p className="text-sm text-alabaster-600">Card with subtle gradient background for emphasis or highlights.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Usage Section */}
        <section id="usage" className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-semibold text-foreground mb-2" style={{ fontFamily: "'Noto Serif', serif" }}>
              Usage Guidelines
            </h2>
            <p className="text-alabaster-600">
              How to use the design system in your code.
            </p>
          </div>

          <div className="space-y-6">
            {/* Tailwind Classes */}
            <div className="bg-white border border-alabaster-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Code className="h-5 w-5 text-periwinkle-600" />
                Tailwind Classes (Recommended)
              </h3>
              <div className="bg-alabaster-900 text-alabaster-100 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <pre>{`// Background colors
<div className="bg-periwinkle-100">...</div>

// Text colors
<span className="text-periwinkle-600">...</span>

// Border colors
<div className="border border-alabaster-200">...</div>

// With opacity
<div className="bg-periwinkle-200/20">...</div>`}</pre>
              </div>
            </div>

            {/* CSS Variables */}
            <div className="bg-white border border-alabaster-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">CSS Variables</h3>
              <div className="bg-alabaster-900 text-alabaster-100 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <pre>{`// In inline styles
<div style={{ backgroundColor: 'var(--periwinkle-100)' }}>...</div>

// In CSS
.custom-class {
  background-color: var(--periwinkle-600);
  color: var(--alabaster-50);
  border-color: var(--alabaster-200);
}`}</pre>
              </div>
            </div>

            {/* Best Practices */}
            <div className="bg-white border border-alabaster-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">Best Practices</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-system-green-light flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-system-green-dark" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Always use Tailwind classes</div>
                    <div className="text-sm text-alabaster-600">Prefer Tailwind utility classes over inline styles for consistency</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-system-green-light flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-system-green-dark" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Use CSS variables for dynamic values</div>
                    <div className="text-sm text-alabaster-600">When you need programmatic color changes, use var(--token)</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-system-green-light flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-system-green-dark" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Never hardcode hex values</div>
                    <div className="text-sm text-alabaster-600">Avoid #6D52D9 - use text-periwinkle-600 or var(--periwinkle-600)</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-system-green-light flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-system-green-dark" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">All icons use periwinkle-600</div>
                    <div className="text-sm text-alabaster-600">Standard icon color is #6d52d9 (periwinkle-600)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Download Section */}
        <section className="bg-gradient-to-br from-periwinkle-50/50 to-alabaster-50/30 border border-periwinkle-100/50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Need the complete design tokens?
          </h2>
          <p className="text-alabaster-600 mb-6 max-w-2xl mx-auto">
            All color tokens, spacing values, and typography settings are available in the theme.css file.
            View the source code to access the complete design system implementation.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a 
              href="/src/styles/theme.css"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-periwinkle-600 text-white rounded-lg hover:bg-periwinkle-700 transition-colors"
            >
              <Code className="h-4 w-4" />
              View theme.css
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-alabaster-200 mt-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
          <div className="flex items-center justify-between">
            <div className="text-sm text-alabaster-600">
              © 2026 Ken Research. All rights reserved.
            </div>
            <div className="text-sm text-alabaster-600">
              Project K 2.0 Design System v2.0.0
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}