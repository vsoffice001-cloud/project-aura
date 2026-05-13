import { useState } from 'react';
import { Copy, Check, Download } from 'lucide-react';

/**
 * ALL TYPOGRAPHY TOKENS - COMPLETE REFERENCE
 * ===========================================
 * Comprehensive typography reference with all scales, weights,
 * line heights, letter spacing, and code snippets.
 * 
 * Features:
 * - Type scale (9 sizes: xs → 5xl)
 * - Font weights (3 weights)
 * - Line heights (3 tiers)
 * - Letter spacing (3 contexts)
 * - Copy-to-clipboard functionality
 * - Downloadable JSON/CSS export
 */

// ============================================
// HELPER COMPONENTS
// ============================================

function TypeTokenRow({ name, token, pixels, rem, usage, example }: {
  name: string;
  token: string;
  pixels: string;
  rem: string;
  usage: string;
  example: string;
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
        <code className="text-xs font-mono">{name}</code>
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
        <p style={{ fontSize: token.replace('--text-', 'var(--text-') + ')', lineHeight: 1.3 }} className="truncate max-w-[200px]">
          {example}
        </p>
      </td>
    </tr>
  );
}

function TokenCategorySection({ title, description, children }: {
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

export function AllTypographyTokensContent() {
  const [downloadFormat, setDownloadFormat] = useState<'json' | 'css'>('json');

  const downloadTokens = () => {
    const data = downloadFormat === 'json' 
      ? JSON.stringify(typographyData, null, 2)
      : generateCSSExport();
    
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `typography-tokens.${downloadFormat}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-[5px] p-5 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-normal mb-3">Complete Typography Tokens Reference</h1>
            <p className="text-sm sm:text-base md:text-lg text-black/70 mb-4">
              Every typography token in the design system with full scales, pixel/rem values, 
              and visual examples. Click any token to copy to clipboard.
            </p>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <span className="text-xs sm:text-sm text-black/60">📋 40+ typography tokens</span>
              <span className="text-xs sm:text-sm text-black/60">📏 Major Third (1.25) ratio</span>
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
            <span><strong>Click any token</strong> (hex, rem, or CSS variable) to copy to clipboard</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>Type scale</strong> follows Major Third (1.25×) ratio for harmonious visual hierarchy</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>Base size</strong> is 16px (1rem) - standard for accessible web typography</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>Download</strong> complete token set as JSON or CSS for direct integration</span>
          </li>
        </ul>
      </div>

      {/* FONT FAMILY SYSTEM - NOTO SERIF & DM SANS */}
      <TokenCategorySection
        title="Font Family System - Noto Serif & DM Sans"
        description="Strategic font pairing: Noto Serif for editorial sophistication, DM Sans for clean UI clarity"
      >
        <div className="p-6 space-y-8">
          {/* Overview */}
          <div className="bg-purple-50 border border-purple-200 rounded-[5px] p-6">
            <h3 className="font-semibold text-purple-900 mb-4">🎯 Font Usage Strategy</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="font-semibold text-purple-900 mb-2" style={{ fontFamily: "'Noto Serif', serif", fontSize: '20px' }}>
                  Noto Serif - Editorial & Sophistication
                </p>
                <ul className="space-y-2 text-sm text-purple-900">
                  <li className="flex items-start gap-2">
                    <span>✓</span>
                    <span><strong>Headings:</strong> Hero h1, Section h2, Subsection h3</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>✓</span>
                    <span><strong>Editorial content:</strong> Long-form case studies, articles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>✓</span>
                    <span><strong>Emphasis:</strong> Quotes, testimonials, key callouts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>✓</span>
                    <span><strong>Brand moments:</strong> Hero sections, final CTAs</span>
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-purple-900 mb-2" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '20px' }}>
                  DM Sans - UI & Functional Clarity
                </p>
                <ul className="space-y-2 text-sm text-purple-900">
                  <li className="flex items-start gap-2">
                    <span>✓</span>
                    <span><strong>Body text:</strong> Descriptions, paragraphs, content blocks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>✓</span>
                    <span><strong>UI elements:</strong> Buttons, forms, navigation, labels</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>✓</span>
                    <span><strong>Data:</strong> Numbers, metrics, statistics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>✓</span>
                    <span><strong>Functional text:</strong> Metadata, timestamps, tags</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* NOTO SERIF - COMPLETE SCALE */}
          <div className="border border-black/8 rounded-[5px] overflow-hidden">
            <div className="bg-amber-50 border-b border-amber-200 p-4">
              <h4 className="font-semibold text-amber-900 mb-2" style={{ fontFamily: "'Noto Serif', serif" }}>
                Noto Serif - Editorial Typography Scale
              </h4>
              <p className="text-sm text-amber-900">
                <strong>WHEN TO USE:</strong> Headings (h1, h2, h3), editorial content, quotes, testimonials, brand moments
              </p>
            </div>
            <div className="p-6 bg-white space-y-4">
              {/* Each size demonstrated */}
              <div className="border-b border-black/5 pb-4">
                <p style={{ fontFamily: "'Noto Serif', serif", fontSize: '76.3px', lineHeight: 1.2 }}>
                  The quick brown fox
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <code className="text-xs font-mono bg-black/5 px-2 py-1 rounded">text-5xl</code>
                  <span className="text-xs text-black/60">76.3px / 4.768rem</span>
                  <span className="text-xs text-black/50">Hero (Extra Large)</span>
                </div>
              </div>

              <div className="border-b border-black/5 pb-4">
                <p style={{ fontFamily: "'Noto Serif', serif", fontSize: '61px', lineHeight: 1.2 }}>
                  The quick brown fox
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <code className="text-xs font-mono bg-black/5 px-2 py-1 rounded">text-4xl</code>
                  <span className="text-xs text-black/60">61px / 3.815rem</span>
                  <span className="text-xs text-black/50">Hero Alternative</span>
                </div>
              </div>

              <div className="border-b border-black/5 pb-4 bg-yellow-50">
                <p style={{ fontFamily: "'Noto Serif', serif", fontSize: '48.8px', lineHeight: 1.2 }}>
                  The quick brown fox jumps
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <code className="text-xs font-mono bg-black/5 px-2 py-1 rounded">text-3xl</code>
                  <span className="text-xs text-black/60">48.8px / 3.052rem</span>
                  <span className="text-xs text-black/50"><strong>⭐ HERO H1 - MOST USED</strong></span>
                </div>
              </div>

              <div className="border-b border-black/5 pb-4 bg-yellow-50">
                <p style={{ fontFamily: "'Noto Serif', serif", fontSize: '39px', lineHeight: 1.3 }}>
                  The quick brown fox jumps over
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <code className="text-xs font-mono bg-black/5 px-2 py-1 rounded">text-2xl</code>
                  <span className="text-xs text-black/60">39px / 2.441rem</span>
                  <span className="text-xs text-black/50"><strong>⭐ SECTION H2 - MOST USED</strong></span>
                </div>
              </div>

              <div className="border-b border-black/5 pb-4">
                <p style={{ fontFamily: "'Noto Serif', serif", fontSize: '31.25px', lineHeight: 1.3 }}>
                  The quick brown fox jumps over the lazy dog
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <code className="text-xs font-mono bg-black/5 px-2 py-1 rounded">text-xl</code>
                  <span className="text-xs text-black/60">31.25px / 1.953rem</span>
                  <span className="text-xs text-black/50">Subsection H3</span>
                </div>
              </div>

              <div className="border-b border-black/5 pb-4">
                <p style={{ fontFamily: "'Noto Serif', serif", fontSize: '25px', lineHeight: 1.4 }}>
                  The quick brown fox jumps over the lazy dog
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <code className="text-xs font-mono bg-black/5 px-2 py-1 rounded">text-lg</code>
                  <span className="text-xs text-black/60">25px / 1.563rem</span>
                  <span className="text-xs text-black/50">Featured Text, Quotes</span>
                </div>
              </div>

              <div className="border-b border-black/5 pb-4">
                <p style={{ fontFamily: "'Noto Serif', serif", fontSize: '20px', lineHeight: 1.5 }}>
                  The quick brown fox jumps over the lazy dog with elegant sophistication
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <code className="text-xs font-mono bg-black/5 px-2 py-1 rounded">text-base</code>
                  <span className="text-xs text-black/60">20px / 1.25rem</span>
                  <span className="text-xs text-black/50">Large Editorial Body</span>
                </div>
              </div>

              <div className="pb-4">
                <p style={{ fontFamily: "'Noto Serif', serif", fontSize: '16px', lineHeight: 1.7 }}>
                  The quick brown fox jumps over the lazy dog with elegant sophistication and editorial grace
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <code className="text-xs font-mono bg-black/5 px-2 py-1 rounded">text-sm</code>
                  <span className="text-xs text-black/60">16px / 1rem</span>
                  <span className="text-xs text-black/50">Editorial Paragraphs (Rare)</span>
                </div>
              </div>
            </div>
          </div>

          {/* DM SANS - COMPLETE SCALE */}
          <div className="border border-black/8 rounded-[5px] overflow-hidden">
            <div className="bg-blue-50 border-b border-blue-200 p-4">
              <h4 className="font-semibold text-blue-900 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                DM Sans - Functional UI Scale
              </h4>
              <p className="text-sm text-blue-900">
                <strong>WHEN TO USE:</strong> Body text, UI elements, buttons, forms, navigation, labels, data, metadata
              </p>
            </div>
            <div className="p-6 bg-white space-y-4">
              <div className="border-b border-black/5 pb-4">
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '61px', lineHeight: 1.2, fontWeight: 600 }}>
                  The quick brown fox
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <code className="text-xs font-mono bg-black/5 px-2 py-1 rounded">text-4xl</code>
                  <span className="text-xs text-black/60">61px / 3.815rem</span>
                  <span className="text-xs text-black/50">Marketing Headers (Rare)</span>
                </div>
              </div>

              <div className="border-b border-black/5 pb-4">
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '48.8px', lineHeight: 1.2, fontWeight: 600 }}>
                  The quick brown fox jumps
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <code className="text-xs font-mono bg-black/5 px-2 py-1 rounded">text-3xl</code>
                  <span className="text-xs text-black/60">48.8px / 3.052rem</span>
                  <span className="text-xs text-black/50">Landing Page Headers</span>
                </div>
              </div>

              <div className="border-b border-black/5 pb-4">
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '39px', lineHeight: 1.3, fontWeight: 600 }}>
                  The quick brown fox jumps over
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <code className="text-xs font-mono bg-black/5 px-2 py-1 rounded">text-2xl</code>
                  <span className="text-xs text-black/60">39px / 2.441rem</span>
                  <span className="text-xs text-black/50">Dashboard Headers, Section Titles</span>
                </div>
              </div>

              <div className="border-b border-black/5 pb-4 bg-yellow-50">
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '31.25px', lineHeight: 1.3, fontWeight: 600 }}>
                  The quick brown fox jumps over the lazy dog
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <code className="text-xs font-mono bg-black/5 px-2 py-1 rounded">text-xl</code>
                  <span className="text-xs text-black/60">31.25px / 1.953rem</span>
                  <span className="text-xs text-black/50"><strong>⭐ CARD TITLES - COMMON</strong></span>
                </div>
              </div>

              <div className="border-b border-black/5 pb-4">
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '25px', lineHeight: 1.4, fontWeight: 500 }}>
                  The quick brown fox jumps over the lazy dog
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <code className="text-xs font-mono bg-black/5 px-2 py-1 rounded">text-lg</code>
                  <span className="text-xs text-black/60">25px / 1.563rem</span>
                  <span className="text-xs text-black/50">Subheadings, Feature Titles</span>
                </div>
              </div>

              <div className="border-b border-black/5 pb-4">
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '20px', lineHeight: 1.5 }}>
                  The quick brown fox jumps over the lazy dog with clean clarity
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <code className="text-xs font-mono bg-black/5 px-2 py-1 rounded">text-base</code>
                  <span className="text-xs text-black/60">20px / 1.25rem</span>
                  <span className="text-xs text-black/50">Large Body, Important Text</span>
                </div>
              </div>

              <div className="border-b border-black/5 pb-4 bg-yellow-50">
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '16px', lineHeight: 1.7 }}>
                  The quick brown fox jumps over the lazy dog with clean clarity and functional precision
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <code className="text-xs font-mono bg-black/5 px-2 py-1 rounded">text-sm</code>
                  <span className="text-xs text-black/60">16px / 1rem</span>
                  <span className="text-xs text-black/50"><strong>⭐ BODY TEXT - MOST USED</strong></span>
                </div>
              </div>

              <div className="pb-4 bg-yellow-50">
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12.8px', lineHeight: 1.5, textTransform: 'uppercase', letterSpacing: '1.8px', fontWeight: 500 }}>
                  CASE STUDY • DESIGN SYSTEM
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <code className="text-xs font-mono bg-black/5 px-2 py-1 rounded">text-xs</code>
                  <span className="text-xs text-black/60">12.8px / 0.8rem</span>
                  <span className="text-xs text-black/50"><strong>⭐ LABELS - MOST USED</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* SIDE-BY-SIDE COMPARISON */}
          <div className="border border-purple-200 rounded-[5px] overflow-hidden bg-purple-50">
            <div className="p-4 border-b border-purple-200">
              <h4 className="font-semibold text-purple-900">Side-by-Side Comparison</h4>
            </div>
            <div className="p-6 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Noto Serif Example */}
                <div className="border border-black/8 rounded-[5px] p-6 bg-amber-50">
                  <p className="text-xs font-mono text-amber-900 mb-3">NOTO SERIF - Editorial</p>
                  <h3 style={{ fontFamily: "'Noto Serif', serif", fontSize: '39px', lineHeight: 1.3, marginBottom: '16px' }}>
                    Digital Transformation
                  </h3>
                  <p style={{ fontFamily: "'Noto Serif', serif", fontSize: '20px', lineHeight: 1.6, color: 'rgba(0,0,0,0.70)' }}>
                    A sophisticated approach to modernizing enterprise systems with editorial elegance.
                  </p>
                  <div className="mt-4 text-xs text-black/60">
                    <strong>Feeling:</strong> Sophisticated, Editorial, Premium
                  </div>
                </div>

                {/* DM Sans Example */}
                <div className="border border-black/8 rounded-[5px] p-6 bg-blue-50">
                  <p className="text-xs font-mono text-blue-900 mb-3">DM SANS - Functional</p>
                  <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '39px', lineHeight: 1.3, fontWeight: 600, marginBottom: '16px' }}>
                    Digital Transformation
                  </h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '16px', lineHeight: 1.7, color: 'rgba(0,0,0,0.70)' }}>
                    A sophisticated approach to modernizing enterprise systems with editorial elegance.
                  </p>
                  <div className="mt-4 text-xs text-black/60">
                    <strong>Feeling:</strong> Clean, Modern, Functional
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* USAGE DECISION TREE */}
          <div className="bg-green-50 border border-green-200 rounded-[5px] p-6">
            <h4 className="font-semibold text-green-900 mb-4">🌳 Font Selection Decision Tree</h4>
            <div className="space-y-3 text-sm text-green-900">
              <div className="flex items-start gap-3">
                <span className="font-bold">1.</span>
                <div>
                  <strong>Is it a heading (h1, h2, h3)?</strong>
                  <p className="text-green-800 mt-1">→ Use <strong>Noto Serif</strong> for editorial sophistication</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-bold">2.</span>
                <div>
                  <strong>Is it a quote or testimonial?</strong>
                  <p className="text-green-800 mt-1">→ Use <strong>Noto Serif</strong> for emphasis and elegance</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-bold">3.</span>
                <div>
                  <strong>Is it body text or description?</strong>
                  <p className="text-green-800 mt-1">→ Use <strong>DM Sans</strong> for readability and clarity</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-bold">4.</span>
                <div>
                  <strong>Is it a UI element (button, form, navigation)?</strong>
                  <p className="text-green-800 mt-1">→ Use <strong>DM Sans</strong> for functional clarity</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-bold">5.</span>
                <div>
                  <strong>Is it data/numbers/metrics?</strong>
                  <p className="text-green-800 mt-1">→ Use <strong>DM Sans</strong> for clean precision</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-bold">6.</span>
                <div>
                  <strong>Is it metadata/labels/tags?</strong>
                  <p className="text-green-800 mt-1">→ Use <strong>DM Sans</strong> (uppercase + tracking) for clarity</p>
                </div>
              </div>
            </div>
          </div>

          {/* CODE IMPLEMENTATION */}
          <div className="space-y-4">
            <h4 className="font-semibold">💻 Implementation Examples</h4>
            
            <CodeSnippetBox
              title="Font Family CSS Variables"
              code={`/* Font family tokens */
:root {
  --font-serif: 'Noto Serif', Georgia, serif;
  --font-sans: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

/* Usage */
h1, h2, h3, blockquote {
  font-family: var(--font-serif);
}

body, p, button, input, label {
  font-family: var(--font-sans);
}`}
            />

            <CodeSnippetBox
              title="React Component Example"
              code={`// Heading with Noto Serif
<h2 style={{ 
  fontFamily: "'Noto Serif', serif",
  fontSize: 'var(--text-2xl)',
  lineHeight: 1.3
}}>
  Section Heading
</h2>

// Body text with DM Sans
<p style={{ 
  fontFamily: "'DM Sans', sans-serif",
  fontSize: 'var(--text-sm)',
  lineHeight: 1.7
}}>
  Body paragraph with clean, readable typography.
</p>

// Label with DM Sans + uppercase
<span style={{ 
  fontFamily: "'DM Sans', sans-serif",
  fontSize: 'var(--text-xs)',
  letterSpacing: '1.8px',
  textTransform: 'uppercase',
  fontWeight: 500
}}>
  CASE STUDY
</span>`}
            />
          </div>
        </div>
      </TokenCategorySection>

      {/* TYPE SCALE - COMPLETE REFERENCE */}
      <TokenCategorySection
        title="Type Scale - Major Third (1.25 Ratio)"
        description="9-step typographic scale from 12.8px to 76.3px. Each size is 1.25× the previous size."
      >
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-black/20 bg-black/[0.02]">
                <th className="text-left p-4 text-xs font-bold">Name</th>
                <th className="text-left p-4 text-xs font-bold">Token (Click to Copy)</th>
                <th className="text-left p-4 text-xs font-bold">Pixels</th>
                <th className="text-left p-4 text-xs font-bold">Rem</th>
                <th className="text-left p-4 text-xs font-bold">Usage</th>
                <th className="text-left p-4 text-xs font-bold">Example</th>
              </tr>
            </thead>
            <tbody>
              <TypeTokenRow
                name="text-xs"
                token="--text-xs"
                pixels="12.8px"
                rem="0.8rem"
                usage="Section labels, metadata, category tags, step badges, secondary info"
                example="CASE STUDY"
              />
              <TypeTokenRow
                name="text-sm"
                token="--text-sm"
                pixels="16px"
                rem="1rem"
                usage="Body text, descriptions, paragraphs, sidebar titles ⭐"
                example="Standard body text"
              />
              <TypeTokenRow
                name="text-base"
                token="--text-base"
                pixels="20px"
                rem="1.25rem"
                usage="Large body text, card titles (4+ cards)"
                example="Card Title"
              />
              <TypeTokenRow
                name="text-lg"
                token="--text-lg"
                pixels="25px"
                rem="1.563rem"
                usage="Card titles (2-3 cards), featured text"
                example="Featured Title"
              />
              <TypeTokenRow
                name="text-xl"
                token="--text-xl"
                pixels="31.25px"
                rem="1.953rem"
                usage="Subsection headings (h3), methodology steps"
                example="Subsection Heading"
              />
              <TypeTokenRow
                name="text-2xl"
                token="--text-2xl"
                pixels="39px"
                rem="2.441rem"
                usage="Section headings (h2) ⭐ MOST USED"
                example="Section Heading"
              />
              <TypeTokenRow
                name="text-3xl"
                token="--text-3xl"
                pixels="48.8px"
                rem="3.052rem"
                usage="Hero h1, Final CTA - HERO ONLY ⭐"
                example="Hero Headline"
              />
              <TypeTokenRow
                name="text-4xl"
                token="--text-4xl"
                pixels="61px"
                rem="3.815rem"
                usage="Extra large headings (rarely used)"
                example="Extra Large"
              />
              <TypeTokenRow
                name="text-5xl"
                token="--text-5xl"
                pixels="76.3px"
                rem="4.768rem"
                usage="Massive headings (future use)"
                example="Massive"
              />
            </tbody>
          </table>
        </div>
      </TokenCategorySection>

      {/* CUSTOM FONT SIZES (Outside Scale) */}
      <TokenCategorySection
        title="Custom Font Sizes (Outside Major Third Scale)"
        description="Specific sizes for tight spaces, navigation, and micro-labels — each with a clear role"
      >
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-black/20 bg-black/[0.02]">
                <th className="text-left p-4 text-xs font-bold">Token</th>
                <th className="text-left p-4 text-xs font-bold">Value</th>
                <th className="text-left p-4 text-xs font-bold">Role</th>
                <th className="text-left p-4 text-xs font-bold">Where Used</th>
                <th className="text-left p-4 text-xs font-bold">Example</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-black/8 hover:bg-black/[0.02]">
                <td className="p-4"><code className="text-xs font-mono bg-black/5 px-2 py-1 rounded">--text-card-micro</code></td>
                <td className="p-4"><code className="text-xs font-mono">10px / 0.625rem</code></td>
                <td className="p-4 text-xs">Smallest readable text — card micro-labels, category tags, dates, avatar initials, sub-section captions</td>
                <td className="p-4 text-xs">ResourceCard, AnalystPickCardB, ClientContextSection</td>
                <td className="p-4">
                  <span style={{ fontSize: 'var(--text-card-micro)', letterSpacing: '1.5px', textTransform: 'uppercase' as const, fontWeight: 500, color: 'rgba(0,0,0,0.4)' }}>CATEGORY</span>
                </td>
              </tr>
              {/* --text-2xs row REMOVED — merged into --text-xs (Session 30) */}
              <tr className="border-b border-black/8 hover:bg-black/[0.02]">
                <td className="p-4"><code className="text-xs font-mono bg-black/5 px-2 py-1 rounded">--text-compact</code></td>
                <td className="p-4"><code className="text-xs font-mono">14px / 0.875rem</code></td>
                <td className="p-4 text-xs">Compact BODY TEXT in dense card layouts (4+ cards) — NEVER for labels</td>
                <td className="p-4 text-xs">ChallengesSection question text (4+ cards)</td>
                <td className="p-4">
                  <p style={{ fontSize: 'var(--text-compact)', lineHeight: 1.5 }}>Compact body text for tight cards</p>
                </td>
              </tr>
              <tr className="border-b border-black/8 hover:bg-black/[0.02]">
                <td className="p-4"><code className="text-xs font-mono bg-black/5 px-2 py-1 rounded">--text-nav</code></td>
                <td className="p-4"><code className="text-xs font-mono">14px / 0.875rem</code></td>
                <td className="p-4 text-xs">Navigation text, section eyebrow labels, button text, TOC items — LABEL role (same value as --text-compact)</td>
                <td className="p-4 text-xs">All section eyebrows, HeroSection, Navbar TOC, SectionHeading subtitle</td>
                <td className="p-4">
                  <span style={{ fontSize: 'var(--text-nav)', letterSpacing: '3px', textTransform: 'uppercase' as const, fontWeight: 500, color: 'rgba(0,0,0,0.4)' }}>SECTION EYEBROW</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Semantic distinction callout */}
        <div className="bg-amber-50 border border-amber-200 rounded-[5px] p-5 mt-4">
          <h5 className="font-semibold text-amber-900 mb-2">--text-compact vs --text-nav (both 14px)</h5>
          <div className="text-sm text-amber-800 space-y-1">
            <p><strong>--text-compact:</strong> Body text in tight containers (card questions, dense layouts). Inherits body text styling.</p>
            <p><strong>--text-nav:</strong> Labels, navigation, eyebrows. Always paired with uppercase + tracking. Never for body paragraphs.</p>
            <p className="mt-2 text-amber-700 italic">Same pixel value, different semantic roles. This is intentional — don't merge them.</p>
          </div>
        </div>
      </TokenCategorySection>

      {/* FONT WEIGHTS */}
      <TokenCategorySection
        title="Font Weight System"
        description="3-tier weight system for hierarchy and emphasis"
      >
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-black/20 bg-black/[0.02]">
                <th className="text-left p-4 text-xs font-bold">Weight Name</th>
                <th className="text-left p-4 text-xs font-bold">Value</th>
                <th className="text-left p-4 text-xs font-bold">Usage</th>
                <th className="text-left p-4 text-xs font-bold">Example</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-black/8 hover:bg-black/[0.02]">
                <td className="p-4"><code className="text-xs font-mono">Regular</code></td>
                <td className="p-4"><code className="text-xs font-mono bg-black/5 px-2 py-1 rounded">400</code></td>
                <td className="p-4 text-xs">Body text, paragraphs, descriptions, most content</td>
                <td className="p-4"><p style={{ fontWeight: 400 }} className="text-lg">Regular Text</p></td>
              </tr>
              <tr className="border-b border-black/8 hover:bg-black/[0.02]">
                <td className="p-4"><code className="text-xs font-mono">Medium</code></td>
                <td className="p-4"><code className="text-xs font-mono bg-black/5 px-2 py-1 rounded">500</code></td>
                <td className="p-4 text-xs">Subtle emphasis, call-out text, important info</td>
                <td className="p-4"><p style={{ fontWeight: 500 }} className="text-lg">Medium Weight</p></td>
              </tr>
              <tr className="border-b border-black/8 hover:bg-black/[0.02]">
                <td className="p-4"><code className="text-xs font-mono">Semi-bold</code></td>
                <td className="p-4"><code className="text-xs font-mono bg-black/5 px-2 py-1 rounded">600</code></td>
                <td className="p-4 text-xs">Headings, labels, navigation, strong emphasis ⭐</td>
                <td className="p-4"><p style={{ fontWeight: 600 }} className="text-lg">Semi-bold Heading</p></td>
              </tr>
            </tbody>
          </table>
        </div>
      </TokenCategorySection>

      {/* LINE HEIGHTS */}
      <TokenCategorySection
        title="Line Height System"
        description="3-tier line height system for readability and hierarchy"
      >
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-black/20 bg-black/[0.02]">
                <th className="text-left p-4 text-xs font-bold">Context</th>
                <th className="text-left p-4 text-xs font-bold">Value</th>
                <th className="text-left p-4 text-xs font-bold">Usage</th>
                <th className="text-left p-4 text-xs font-bold">Example</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-black/8 hover:bg-black/[0.02]">
                <td className="p-4"><code className="text-xs font-mono">Headings</code></td>
                <td className="p-4"><code className="text-xs font-mono bg-black/5 px-2 py-1 rounded">1.2 - 1.3</code></td>
                <td className="p-4 text-xs">Tight, impactful headlines (h1, h2, h3)</td>
                <td className="p-4">
                  <p style={{ fontSize: '24px', lineHeight: 1.25 }}>
                    Tight Heading<br />Second Line
                  </p>
                </td>
              </tr>
              <tr className="border-b border-black/8 hover:bg-black/[0.02]">
                <td className="p-4"><code className="text-xs font-mono">Body Text</code></td>
                <td className="p-4"><code className="text-xs font-mono bg-black/5 px-2 py-1 rounded">1.6 - 1.7</code></td>
                <td className="p-4 text-xs">Comfortable reading for paragraphs ⭐</td>
                <td className="p-4">
                  <p style={{ fontSize: '16px', lineHeight: 1.7, maxWidth: '200px' }}>
                    This is body text with comfortable line height for extended reading.
                  </p>
                </td>
              </tr>
              <tr className="border-b border-black/8 hover:bg-black/[0.02]">
                <td className="p-4"><code className="text-xs font-mono">Labels</code></td>
                <td className="p-4"><code className="text-xs font-mono bg-black/5 px-2 py-1 rounded">1.4 - 1.5</code></td>
                <td className="p-4 text-xs">Compact but clear for metadata, captions</td>
                <td className="p-4">
                  <p style={{ fontSize: '14px', lineHeight: 1.5 }}>
                    Label Text<br />Metadata
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </TokenCategorySection>

      {/* LETTER SPACING (TRACKING) */}
      <TokenCategorySection
        title="Letter Spacing (Tracking)"
        description="Context-specific tracking adjustments for optical balance"
      >
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-black/20 bg-black/[0.02]">
                <th className="text-left p-4 text-xs font-bold">Context</th>
                <th className="text-left p-4 text-xs font-bold">Value</th>
                <th className="text-left p-4 text-xs font-bold">Usage</th>
                <th className="text-left p-4 text-xs font-bold">Example</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-black/8 hover:bg-black/[0.02]">
                <td className="p-4"><code className="text-xs font-mono">All-Caps Labels</code></td>
                <td className="p-4"><code className="text-xs font-mono bg-black/5 px-2 py-1 rounded">1.8px - 2px</code></td>
                <td className="p-4 text-xs">Section labels, category tags, eyebrows</td>
                <td className="p-4">
                  <p style={{ letterSpacing: '1.8px', textTransform: 'uppercase', fontSize: '12.8px' }}>
                    CASE STUDY
                  </p>
                </td>
              </tr>
              <tr className="border-b border-black/8 hover:bg-black/[0.02]">
                <td className="p-4"><code className="text-xs font-mono">Normal Text</code></td>
                <td className="p-4"><code className="text-xs font-mono bg-black/5 px-2 py-1 rounded">0</code></td>
                <td className="p-4 text-xs">Body text, standard paragraphs ⭐</td>
                <td className="p-4">
                  <p style={{ letterSpacing: '0', fontSize: '16px' }}>
                    Normal tracking text
                  </p>
                </td>
              </tr>
              <tr className="border-b border-black/8 hover:bg-black/[0.02]">
                <td className="p-4"><code className="text-xs font-mono">Large Headings</code></td>
                <td className="p-4"><code className="text-xs font-mono bg-black/5 px-2 py-1 rounded">-0.5px to -1px</code></td>
                <td className="p-4 text-xs">Hero headlines, large titles (optical correction)</td>
                <td className="p-4">
                  <p style={{ letterSpacing: '-0.5px', fontSize: '32px' }}>
                    Large Title
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </TokenCategorySection>

      {/* RESPONSIVE TYPOGRAPHY */}
      <TokenCategorySection
        title="Responsive Typography - Fluid Sizing"
        description="clamp() values for responsive scaling across devices"
      >
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-black/20 bg-black/[0.02]">
                <th className="text-left p-4 text-xs font-bold">Element</th>
                <th className="text-left p-4 text-xs font-bold">clamp() Value</th>
                <th className="text-left p-4 text-xs font-bold">Range</th>
                <th className="text-left p-4 text-xs font-bold">Usage</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-black/8 hover:bg-black/[0.02]">
                <td className="p-4"><code className="text-xs font-mono">Hero h1</code></td>
                <td className="p-4"><code className="text-[10px] font-mono bg-black/5 px-2 py-1 rounded">clamp(2.5rem, 5vw, 4rem)</code></td>
                <td className="p-4 text-xs">40px → 64px</td>
                <td className="p-4 text-xs">Scales hero headlines smoothly mobile to desktop</td>
              </tr>
              <tr className="border-b border-black/8 hover:bg-black/[0.02]">
                <td className="p-4"><code className="text-xs font-mono">Section h2</code></td>
                <td className="p-4"><code className="text-[10px] font-mono bg-black/5 px-2 py-1 rounded">clamp(1.75rem, 3.5vw, 2.441rem)</code></td>
                <td className="p-4 text-xs">28px → 39px</td>
                <td className="p-4 text-xs">Section headings that adapt to viewport</td>
              </tr>
              <tr className="border-b border-black/8 hover:bg-black/[0.02]">
                <td className="p-4"><code className="text-xs font-mono">Body text</code></td>
                <td className="p-4"><code className="text-[10px] font-mono bg-black/5 px-2 py-1 rounded">clamp(0.875rem, 2vw, 1rem)</code></td>
                <td className="p-4 text-xs">14px → 16px</td>
                <td className="p-4 text-xs">Body text slightly smaller on mobile for space</td>
              </tr>
            </tbody>
          </table>
        </div>
      </TokenCategorySection>

      {/* CODE SNIPPET EXAMPLES */}
      <div className="border border-black/8 rounded-[5px] overflow-hidden">
        <h3 className="text-xl font-semibold mb-4">💻 Code Snippet Examples</h3>
        <div className="space-y-4">
          <CodeSnippetBox
            title="CSS Variables"
            code={`/* Using typography tokens in CSS */
.hero-title {
  font-size: var(--text-3xl);
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.5px;
}

.section-heading {
  font-size: var(--text-2xl);
  font-weight: 600;
  line-height: 1.3;
}

.body-text {
  font-size: var(--text-sm);
  font-weight: 400;
  line-height: 1.7;
}

.label-text {
  font-size: var(--text-xs);
  font-weight: 500;
  letter-spacing: 1.8px;
  text-transform: uppercase;
}`}
          />
          
          <CodeSnippetBox
            title="Responsive Typography with clamp()"
            code={`/* Fluid typography that scales smoothly */
.responsive-hero {
  font-size: clamp(2.5rem, 5vw, 4rem);
  /* 40px (mobile) → 64px (desktop) */
}

.responsive-heading {
  font-size: clamp(1.75rem, 3.5vw, 2.441rem);
  /* 28px (mobile) → 39px (desktop) */
}

.responsive-body {
  font-size: clamp(0.875rem, 2vw, 1rem);
  /* 14px (mobile) → 16px (desktop) */
}`}
          />
          
          <CodeSnippetBox
            title="React/Tailwind Usage"
            code={`// Using typography tokens in React components
<h1 style={{ fontSize: 'var(--text-3xl)', fontWeight: 600 }}>
  Hero Headline
</h1>

<h2 style={{ fontSize: 'var(--text-2xl)', lineHeight: 1.3 }}>
  Section Heading
</h2>

<p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.7 }}>
  Body paragraph text with comfortable reading line height.
</p>

// All-caps label with letter spacing
<span style={{ 
  fontSize: 'var(--text-xs)', 
  letterSpacing: '1.8px',
  textTransform: 'uppercase' 
}}>
  CASE STUDY
</span>`}
          />
        </div>
      </div>

      {/* USAGE PRINCIPLES */}
      <div className="bg-blue-50 border border-blue-300 rounded-[5px] p-6">
        <h3 className="font-semibold text-blue-900 mb-3">✅ TYPOGRAPHY USAGE PRINCIPLES</h3>
        <ul className="space-y-2 text-sm text-blue-900">
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>Always use CSS variables</strong> - Prefer var(--text-2xl) over hardcoded pixel values</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>Respect the scale</strong> - Major Third (1.25×) ratio creates harmonious hierarchy</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>Line height matters</strong> - Tight for headings (1.2-1.3), comfortable for body (1.6-1.7)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>Letter spacing for caps</strong> - Add 1.8px+ tracking for all-caps labels</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>Use responsive sizing</strong> - clamp() for fluid typography on hero/heading elements</span>
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
const typographyData = {
  typeScale: {
    xs: { pixels: '12.8px', rem: '0.8rem' },
    sm: { pixels: '16px', rem: '1rem' },
    base: { pixels: '20px', rem: '1.25rem' },
    lg: { pixels: '25px', rem: '1.563rem' },
    xl: { pixels: '31.25px', rem: '1.953rem' },
    '2xl': { pixels: '39px', rem: '2.441rem' },
    '3xl': { pixels: '48.8px', rem: '3.052rem' },
    '4xl': { pixels: '61px', rem: '3.815rem' },
    '5xl': { pixels: '76.3px', rem: '4.768rem' },
  },
  fontWeights: {
    regular: 400,
    medium: 500,
    semibold: 600,
  },
  lineHeights: {
    headings: '1.2 - 1.3',
    body: '1.6 - 1.7',
    labels: '1.4 - 1.5',
  },
  letterSpacing: {
    caps: '1.8px - 2px',
    normal: '0',
    large: '-0.5px to -1px',
  },
};

function generateCSSExport() {
  return `:root {
  /* Typography Scale - Major Third (1.25 ratio) */
  --text-xs: 0.8rem;      /* 12.8px */
  --text-sm: 1rem;        /* 16px */
  --text-base: 1.25rem;   /* 20px */
  --text-lg: 1.563rem;    /* 25px */
  --text-xl: 1.953rem;    /* 31.25px */
  --text-2xl: 2.441rem;   /* 39px */
  --text-3xl: 3.052rem;   /* 48.8px */
  --text-4xl: 3.815rem;   /* 61px */
  --text-5xl: 4.768rem;   /* 76.3px */
  
  /* Font Weights */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  
  /* Line Heights */
  --line-height-tight: 1.2;
  --line-height-heading: 1.3;
  --line-height-label: 1.5;
  --line-height-body: 1.7;
  
  /* Letter Spacing */
  --letter-spacing-caps: 1.8px;
  --letter-spacing-normal: 0;
  --letter-spacing-tight: -0.5px;
}`;
}