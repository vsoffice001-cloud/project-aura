import { useState } from 'react';
import { Copy, Check, Download } from 'lucide-react';

/**
 * ALL COLORS PALETTE - COMPLETE 50-900 REFERENCE
 * ==============================================
 * Comprehensive, downloadable color palette showing ALL color tokens
 * with full 50-900 scales, RGB values, and code snippets.
 * 
 * Features:
 * - 10 color families with complete scales
 * - Copy-to-clipboard for each token
 * - Downloadable JSON/CSS export
 * - Code snippet examples
 * - Visual swatches with hex + RGB
 */

// ============================================
// HELPER COMPONENTS
// ============================================

function ColorSwatchRow({ shade, token, hex, rgb, usage, star }: {
  shade: string;
  token: string;
  hex: string;
  rgb: string;
  usage: string;
  star?: boolean;
}) {
  const [copied, setCopied] = useState('');

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <tr className={`border-b border-black/8 hover:bg-black/[0.02] ${star ? 'bg-yellow-50' : ''}`}>
      <td className="p-3">
        <div className="flex items-center gap-2">
          <code className="text-xs font-mono">{shade}</code>
          {star && <span className="text-xs">⭐</span>}
        </div>
      </td>
      <td className="p-3">
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
      <td className="p-3">
        <button
          onClick={() => copyToClipboard(hex, 'hex')}
          className="hover:bg-black/5 rounded px-2 py-1 transition-colors"
        >
          <code className="text-[10px] font-mono text-black/60">{hex}</code>
          {copied === 'hex' && <Check size={12} className="inline ml-1 text-green-600" />}
        </button>
      </td>
      <td className="p-3">
        <button
          onClick={() => copyToClipboard(rgb, 'rgb')}
          className="hover:bg-black/5 rounded px-2 py-1 transition-colors"
        >
          <code className="text-[10px] font-mono text-black/50">{rgb}</code>
          {copied === 'rgb' && <Check size={12} className="inline ml-1 text-green-600" />}
        </button>
      </td>
      <td className="p-3 text-xs">{usage}</td>
      <td className="p-3">
        <div className="w-16 h-8 border border-black/8 rounded" style={{ background: hex }}></div>
      </td>
    </tr>
  );
}

function ColorFamilySection({ title, description, baseColor, purpose, usage, colors }: {
  title: string;
  description: string;
  baseColor: string;
  purpose: string;
  usage: string;
  colors: Array<{
    shade: string;
    token: string;
    hex: string;
    rgb: string;
    usage: string;
    star?: boolean;
  }>;
}) {
  return (
    <div className="border border-black/8 rounded-[5px] overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-6 bg-black/[0.02] border-b border-black/8">
        <h3 className="text-lg sm:text-xl font-semibold mb-3">{title}</h3>
        <p className="text-sm text-black/70 mb-2"><strong>PURPOSE:</strong> {description}</p>
        <p className="text-sm text-black/70 mb-2"><strong>BASE:</strong> {baseColor}</p>
        <p className="text-sm text-black/70"><strong>USAGE:</strong> {usage}</p>
        <div className="mt-4 text-sm text-black/60 bg-white border border-black/8 rounded px-3 py-2">
          💡 <strong>Purpose:</strong> {purpose}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b-2 border-black/20 bg-black/[0.02]">
              <th className="text-left p-3 text-xs font-bold">Shade</th>
              <th className="text-left p-3 text-xs font-bold">Token (Click to Copy)</th>
              <th className="text-left p-3 text-xs font-bold">Hex</th>
              <th className="text-left p-3 text-xs font-bold">RGB</th>
              <th className="text-left p-3 text-xs font-bold">Usage</th>
              <th className="text-left p-3 text-xs font-bold">Visual</th>
            </tr>
          </thead>
          <tbody>
            {colors.map((color) => (
              <ColorSwatchRow key={color.shade} {...color} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export function AllColorsPaletteContent() {
  const [downloadFormat, setDownloadFormat] = useState<'json' | 'css'>('json');

  const downloadPalette = () => {
    // Implementation for downloading color tokens
    const data = downloadFormat === 'json' 
      ? JSON.stringify(colorData, null, 2)
      : generateCSSExport();
    
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `color-palette.${downloadFormat}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-[5px] p-5 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-normal mb-3">Complete Color Palette Reference</h1>
            <p className="text-sm sm:text-base md:text-lg text-black/70 mb-4">
              Every color token in the design system with full 50-900 scales, RGB values for gradients, 
              and specific use cases. Click any token to copy to clipboard.
            </p>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <span className="text-xs sm:text-sm text-black/60">📋 100+ color tokens</span>
              <span className="text-xs sm:text-sm text-black/60">🎨 10 color families</span>
              <span className="text-xs sm:text-sm text-black/60">⚡ Copy-to-clipboard enabled</span>
            </div>
          </div>
          <div className="flex-shrink-0">
            <button
              onClick={downloadPalette}
              className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-[5px] hover:bg-black/90 transition-colors"
            >
              <Download size={16} />
              <span className="text-sm font-medium">Download Palette</span>
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
            <span><strong>Click any token</strong> to copy to clipboard (--red-600, #b01f24, or RGB values)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>⭐ Stars</strong> indicate the most frequently used shades in each family</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>50 = Lightest,</strong> gradually darker to <strong>900 = Darkest</strong></span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>RGB values</strong> are provided for use in rgba() gradients and overlays</span>
          </li>
        </ul>
      </div>

      {/* COLOR FAMILIES */}
      
      {/* 1. KEN BOLD RED - BRAND */}
      <ColorFamilySection
        title="1. Ken Bold Red - Brand Identity"
        description="Primary brand color - bold, confident, action-oriented"
        baseColor="#b01f24 (red-600) ⭐"
        purpose="Brand identity, CTAs, critical alerts, key brand moments"
        usage="Maximum 5% of any page - Primary CTAs, buttons, critical alerts only"
        colors={[
          { shade: '50', token: '--red-50', hex: '#fef2f2', rgb: '254, 242, 242', usage: 'Subtle backgrounds, lightest tint' },
          { shade: '100', token: '--red-100', hex: '#fee2e2', rgb: '254, 226, 226', usage: 'Alert highlights, notice backgrounds' },
          { shade: '200', token: '--red-200', hex: '#fecaca', rgb: '254, 202, 202', usage: 'Soft hover states, disabled buttons' },
          { shade: '300', token: '--red-300', hex: '#fca5a7', rgb: '252, 165, 167', usage: 'Borders, soft accents' },
          { shade: '400', token: '--red-400', hex: '#f87176', rgb: '248, 113, 118', usage: 'Icons, secondary interactive' },
          { shade: '500', token: '--red-500', hex: '#dc3238', rgb: '220, 50, 56', usage: 'Links, badges, active states' },
          { shade: '600', token: '--red-600', hex: '#b01f24', rgb: '176, 31, 36', usage: 'PRIMARY BRAND - CTAs, buttons ⭐', star: true },
          { shade: '700', token: '--red-700', hex: '#8f181d', rgb: '143, 24, 29', usage: 'Hover - Button hover states' },
          { shade: '800', token: '--red-800', hex: '#771419', rgb: '119, 20, 25', usage: 'Active - Pressed states' },
          { shade: '900', token: '--red-900', hex: '#5f1014', rgb: '95, 16, 20', usage: 'Text on light, deep emphasis' },
        ]}
      />

      {/* 2. CORAL/TERRACOTTA - WARMTH */}
      <ColorFamilySection
        title="2. Coral/Terracotta - Warmth & Energy"
        description="Sophisticated warm backgrounds, approachable energy"
        baseColor="#ea7a5f (coral-600) ⭐"
        purpose="Warm backgrounds, approachability, creative energy"
        usage="Background overlays 4-6% opacity, warm accents, gradient components"
        colors={[
          { shade: '50', token: '--coral-50', hex: '#fffbf9', rgb: '255, 251, 249', usage: 'Warmest white - Base backgrounds ⭐', star: true },
          { shade: '100', token: '--coral-100', hex: '#fff5f1', rgb: '255, 245, 241', usage: 'Very light warm' },
          { shade: '200', token: '--coral-200', hex: '#ffebe4', rgb: '255, 235, 228', usage: 'Light blush - Perceptible coral wash' },
          { shade: '300', token: '--coral-300', hex: '#fdd7cb', rgb: '253, 215, 203', usage: 'Soft coral - Gentle peachy tone' },
          { shade: '400', token: '--coral-400', hex: '#fbb8a7', rgb: '251, 184, 167', usage: 'Medium coral - Clear peachy presence' },
          { shade: '500', token: '--coral-500', hex: '#f99b85', rgb: '249, 155, 133', usage: 'Bright coral - Warm accent' },
          { shade: '600', token: '--coral-600', hex: '#ea7a5f', rgb: '234, 122, 95', usage: 'BASE - Terracotta coral ⭐', star: true },
          { shade: '700', token: '--coral-700', hex: '#d96548', rgb: '217, 101, 72', usage: 'Deep coral - Hover state' },
          { shade: '800', token: '--coral-800', hex: '#c15138', rgb: '193, 81, 56', usage: 'Rich terracotta - Active state' },
          { shade: '900', token: '--coral-900', hex: '#a23f2d', rgb: '162, 63, 45', usage: 'Burnt terracotta - Darkest accent' },
        ]}
      />

      {/* 3. WARM EDITORIAL - SOPHISTICATION */}
      <ColorFamilySection
        title="3. Warm Editorial - Sophistication & Premium"
        description="Editorial feel, sophisticated section backgrounds"
        baseColor="#f5f2f1 (warm-300) ⭐"
        purpose="Section backgrounds, editorial sophistication, premium feel"
        usage="Challenges section, Methodology section, borders, timeline elements"
        colors={[
          { shade: '50', token: '--warm-50', hex: '#fefdfd', rgb: '254, 253, 253', usage: 'Final CTA background' },
          { shade: '100', token: '--warm-100', hex: '#fcfbfa', rgb: '252, 251, 250', usage: 'Very subtle hover' },
          { shade: '200', token: '--warm-200', hex: '#f9f7f6', rgb: '249, 247, 246', usage: 'Methodology section ⭐', star: true },
          { shade: '300', token: '--warm-300', hex: '#f5f2f1', rgb: '245, 242, 241', usage: 'Challenges section ⭐', star: true },
          { shade: '400', token: '--warm-400', hex: '#f0ebe9', rgb: '240, 235, 233', usage: 'Alternative backgrounds' },
          { shade: '500', token: '--warm-500', hex: '#eae5e3', rgb: '234, 229, 227', usage: 'Borders, separators ⭐', star: true },
          { shade: '600', token: '--warm-600', hex: '#d9d1ce', rgb: '217, 209, 206', usage: 'Timeline base' },
          { shade: '700', token: '--warm-700', hex: '#c8bcb8', rgb: '200, 188, 184', usage: 'Timeline nodes ⭐', star: true },
          { shade: '800', token: '--warm-800', hex: '#b7a9a3', rgb: '183, 169, 163', usage: 'Dark warm, active dots' },
          { shade: '900', token: '--warm-900', hex: '#a6968e', rgb: '166, 150, 142', usage: 'Editorial labels ⭐', star: true },
        ]}
      />

      {/* 4. PURPLE - PREMIUM & INNOVATION */}
      <ColorFamilySection
        title="4. Purple - Premium, Innovation & Insights"
        description="Premium features, creativity, innovation, insights"
        baseColor="#806ce0 (purple-600) ⭐"
        purpose="Premium features, innovation sections, creative content"
        usage="Gradient overlays 5-20% opacity, shadows 15-24%, premium accents"
        colors={[
          { shade: '50', token: '--purple-50', hex: '#f7f6fe', rgb: '247, 246, 254', usage: 'Lightest - Subtle highlights' },
          { shade: '100', token: '--purple-100', hex: '#efedfd', rgb: '239, 237, 253', usage: 'Very light - Hover states' },
          { shade: '200', token: '--purple-200', hex: '#dfdcfb', rgb: '223, 220, 251', usage: 'Light - Borders, dividers' },
          { shade: '300', token: '--purple-300', hex: '#c4bef7', rgb: '196, 190, 247', usage: 'Medium light - Icons, badges' },
          { shade: '400', token: '--purple-400', hex: '#a89ff2', rgb: '168, 159, 242', usage: 'Medium - Secondary accents' },
          { shade: '500', token: '--purple-500', hex: '#9488ec', rgb: '148, 136, 236', usage: 'Standard - Interactive elements' },
          { shade: '600', token: '--purple-600', hex: '#806ce0', rgb: '128, 108, 224', usage: 'BASE - Premium features ⭐', star: true },
          { shade: '700', token: '--purple-700', hex: '#6c5bc0', rgb: '108, 91, 192', usage: 'Hover - Button hover' },
          { shade: '800', token: '--purple-800', hex: '#5a4ba0', rgb: '90, 75, 160', usage: 'Active - Button active' },
          { shade: '900', token: '--purple-900', hex: '#483c80', rgb: '72, 60, 128', usage: 'Darkest - Text, deep accents' },
        ]}
      />

      {/* 5. PERIWINKLE - TRUST & CALM */}
      <ColorFamilySection
        title="5. Periwinkle - Trust, Reliability & Calm"
        description="Trustworthiness, calm professionalism, stability"
        baseColor="#c3c6f9 (periwinkle-500) ⭐"
        purpose="Trust indicators, calm sections, reliability messaging"
        usage="Card hover states 12%, informational overlays 8-10%, trust elements"
        colors={[
          { shade: '50', token: '--periwinkle-50', hex: '#fafbfe', rgb: '250, 251, 254', usage: 'Lightest - Subtle backgrounds' },
          { shade: '100', token: '--periwinkle-100', hex: '#f5f6fd', rgb: '245, 246, 253', usage: 'Very light - Card backgrounds' },
          { shade: '200', token: '--periwinkle-200', hex: '#ebedfb', rgb: '235, 237, 251', usage: 'Light - Hover states' },
          { shade: '300', token: '--periwinkle-300', hex: '#dfe1f9', rgb: '223, 225, 249', usage: 'Medium light - Soft accents' },
          { shade: '400', token: '--periwinkle-400', hex: '#d3d5f9', rgb: '211, 213, 249', usage: 'Medium - Borders, dividers' },
          { shade: '500', token: '--periwinkle-500', hex: '#c3c6f9', rgb: '195, 198, 249', usage: 'BASE - Trust indicators ⭐', star: true },
          { shade: '600', token: '--periwinkle-600', hex: '#a7abf0', rgb: '167, 171, 240', usage: 'Standard - Interactive elements' },
          { shade: '700', token: '--periwinkle-700', hex: '#8b90e0', rgb: '139, 144, 224', usage: 'Hover - Links, buttons' },
          { shade: '800', token: '--periwinkle-800', hex: '#7075c8', rgb: '112, 117, 200', usage: 'Active - Active states' },
          { shade: '900', token: '--periwinkle-900', hex: '#5a5fa0', rgb: '90, 95, 160', usage: 'Darkest - Text on light' },
        ]}
      />

      {/* 6. PERANO (LIGHT BLUE) - CALM & PROFESSIONAL */}
      <ColorFamilySection
        title="6. Perano (Light Blue) - Calm, Professional & Data"
        description="Data sections, calm backgrounds, professional clarity"
        baseColor="#dfeafa (perano-500) ⭐"
        purpose="Data visualizations, methodology sections, calm professional areas"
        usage="Data sections, calm backgrounds, professional elements"
        colors={[
          { shade: '50', token: '--perano-50', hex: '#fcfdfe', rgb: '252, 253, 254', usage: 'Lightest - Barely visible' },
          { shade: '100', token: '--perano-100', hex: '#f9fbfe', rgb: '249, 251, 254', usage: 'Very light - Subtle highlights' },
          { shade: '200', token: '--perano-200', hex: '#f4f8fd', rgb: '244, 248, 253', usage: 'Light - Card backgrounds' },
          { shade: '300', token: '--perano-300', hex: '#eff5fc', rgb: '239, 245, 252', usage: 'Medium light - Hover states' },
          { shade: '400', token: '--perano-400', hex: '#e9f2fb', rgb: '233, 242, 251', usage: 'Medium - Soft accents' },
          { shade: '500', token: '--perano-500', hex: '#dfeafa', rgb: '223, 234, 250', usage: 'BASE - Data sections ⭐', star: true },
          { shade: '600', token: '--perano-600', hex: '#c8dff5', rgb: '200, 223, 245', usage: 'Standard - Borders, dividers' },
          { shade: '700', token: '--perano-700', hex: '#a7c9ed', rgb: '167, 201, 237', usage: 'Hover - Interactive elements' },
          { shade: '800', token: '--perano-800', hex: '#86b3e5', rgb: '134, 179, 229', usage: 'Active - Active states' },
          { shade: '900', token: '--perano-900', hex: '#6b94c0', rgb: '107, 148, 192', usage: 'Darkest - Text, strong accents' },
        ]}
      />

      {/* 7. GREEN - SUCCESS & GROWTH (UTILITY) */}
      <ColorFamilySection
        title="7. Green - Success, Growth & Positive Outcomes (UTILITY)"
        description="Success states, positive metrics, confirmations, growth indicators"
        baseColor="#10b981 (green-500), #059669 (green-600) ⭐"
        purpose="Impact metrics, success messages, growth indicators, positive feedback"
        usage="Impact section metrics, success states, confirmation messages, growth data"
        colors={[
          { shade: '50', token: '--green-50', hex: '#ecfdf5', rgb: '236, 253, 245', usage: 'Success backgrounds' },
          { shade: '100', token: '--green-100', hex: '#d1fae5', rgb: '209, 250, 229', usage: 'Success highlights' },
          { shade: '200', token: '--green-200', hex: '#a7f3d0', rgb: '167, 243, 208', usage: 'Soft success states' },
          { shade: '300', token: '--green-300', hex: '#6ee7b7', rgb: '110, 231, 183', usage: 'Success borders, soft accents' },
          { shade: '400', token: '--green-400', hex: '#34d399', rgb: '52, 211, 153', usage: 'Success icons, secondary' },
          { shade: '500', token: '--green-500', hex: '#10b981', rgb: '16, 185, 129', usage: 'BASE - Success messages ⭐', star: true },
          { shade: '600', token: '--green-600', hex: '#059669', rgb: '5, 150, 105', usage: 'Impact metrics ⭐', star: true },
          { shade: '700', token: '--green-700', hex: '#047857', rgb: '4, 120, 87', usage: 'Success hover' },
          { shade: '800', token: '--green-800', hex: '#065f46', rgb: '6, 95, 70', usage: 'Success pressed' },
          { shade: '900', token: '--green-900', hex: '#064e3b', rgb: '6, 78, 59', usage: 'Success text on light' },
        ]}
      />

      {/* 8. AMBER - WARNING & ATTENTION (UTILITY) */}
      <ColorFamilySection
        title="8. Amber - Warning, Attention & Caution (UTILITY)"
        description="Warning states, attention highlights, important notices"
        baseColor="#f59e0b (amber-500) ⭐"
        purpose="Warning messages, attention callouts, caution indicators"
        usage="Warning states, alerts, important callouts, caution elements"
        colors={[
          { shade: '50', token: '--amber-50', hex: '#fffbeb', rgb: '255, 251, 235', usage: 'Warning backgrounds ⭐', star: true },
          { shade: '100', token: '--amber-100', hex: '#fef3c7', rgb: '254, 243, 199', usage: 'Alert highlights' },
          { shade: '200', token: '--amber-200', hex: '#fde68a', rgb: '253, 230, 138', usage: 'Soft warning states' },
          { shade: '300', token: '--amber-300', hex: '#fcd34d', rgb: '252, 211, 77', usage: 'Warning borders' },
          { shade: '400', token: '--amber-400', hex: '#fbbf24', rgb: '251, 191, 36', usage: 'Warning icons, attention' },
          { shade: '500', token: '--amber-500', hex: '#f59e0b', rgb: '245, 158, 11', usage: 'BASE - Warning messages ⭐', star: true },
          { shade: '600', token: '--amber-600', hex: '#d97706', rgb: '217, 119, 6', usage: 'Warning buttons' },
          { shade: '700', token: '--amber-700', hex: '#b45309', rgb: '180, 83, 9', usage: 'Warning hover' },
          { shade: '800', token: '--amber-800', hex: '#92400e', rgb: '146, 64, 14', usage: 'Warning pressed' },
          { shade: '900', token: '--amber-900', hex: '#78350f', rgb: '120, 53, 15', usage: 'Warning text on light' },
        ]}
      />

      {/* 9. ROSE - ERROR & VALIDATION (UTILITY) */}
      <ColorFamilySection
        title="9. Rose - Error, Validation & Destructive (UTILITY)"
        description="Error states, form validation, destructive actions - DISTINCT from Brand Red"
        baseColor="#f43f5e (rose-500) ⭐"
        purpose="Form errors, validation feedback, destructive actions, delete buttons"
        usage="Form errors, validation messages, delete actions (NOT brand CTAs)"
        colors={[
          { shade: '50', token: '--rose-50', hex: '#fff1f2', rgb: '255, 241, 242', usage: 'Error backgrounds' },
          { shade: '100', token: '--rose-100', hex: '#ffe4e6', rgb: '255, 228, 230', usage: 'Error highlights' },
          { shade: '200', token: '--rose-200', hex: '#fecdd3', rgb: '254, 205, 211', usage: 'Soft error states' },
          { shade: '300', token: '--rose-300', hex: '#fda4af', rgb: '253, 164, 175', usage: 'Error borders, soft validation' },
          { shade: '400', token: '--rose-400', hex: '#fb7185', rgb: '251, 113, 133', usage: 'Error icons, field validation' },
          { shade: '500', token: '--rose-500', hex: '#f43f5e', rgb: '244, 63, 94', usage: 'BASE - Error messages ⭐', star: true },
          { shade: '600', token: '--rose-600', hex: '#e11d48', rgb: '225, 29, 72', usage: 'Destructive actions, delete' },
          { shade: '700', token: '--rose-700', hex: '#be123c', rgb: '190, 18, 60', usage: 'Error hover' },
          { shade: '800', token: '--rose-800', hex: '#9f1239', rgb: '159, 18, 57', usage: 'Error active/pressed' },
          { shade: '900', token: '--rose-900', hex: '#881337', rgb: '136, 19, 55', usage: 'Error text on light' },
        ]}
      />

      {/* 10. BLACK TINTS - FOUNDATION GRAYS */}
      <ColorFamilySection
        title="10. Black Tints - Foundation Grays & Neutrals"
        description="Neutral grays for UI elements, backgrounds, text hierarchy"
        baseColor="#000000 (pure black) ⭐"
        purpose="Text hierarchy, disabled states, subtle backgrounds, UI structure"
        usage="All neutral gray needs throughout the system"
        colors={[
          { shade: '50', token: '--black-50', hex: '#fafafa', rgb: '250, 250, 250', usage: 'Near white - Very subtle backgrounds' },
          { shade: '100', token: '--black-100', hex: '#f5f5f5', rgb: '245, 245, 245', usage: 'Lightest gray - Card backgrounds' },
          { shade: '200', token: '--black-200', hex: '#e5e5e5', rgb: '229, 229, 229', usage: 'Very light gray - Borders, dividers' },
          { shade: '300', token: '--black-300', hex: '#d4d4d4', rgb: '212, 212, 212', usage: 'Light gray - Disabled states' },
          { shade: '400', token: '--black-400', hex: '#a3a3a3', rgb: '163, 163, 163', usage: 'Medium gray - Placeholder text' },
          { shade: '500', token: '--black-500', hex: '#737373', rgb: '115, 115, 115', usage: 'Gray - Secondary text' },
          { shade: '600', token: '--black-600', hex: '#525252', rgb: '82, 82, 82', usage: 'Dark gray - Body text alternative' },
          { shade: '700', token: '--black-700', hex: '#404040', rgb: '64, 64, 64', usage: 'Darker gray - Headings alternative' },
          { shade: '800', token: '--black-800', hex: '#262626', rgb: '38, 38, 38', usage: 'Very dark - Strong text' },
          { shade: '900', token: '--black-900', hex: '#171717', rgb: '23, 23, 23', usage: 'Almost black - Deep backgrounds' },
          { shade: 'pure', token: '--black', hex: '#000000', rgb: '0, 0, 0', usage: 'Pure black - Hero, primary text ⭐', star: true },
        ]}
      />

      {/* CLOSING PRINCIPLE BOX */}
      <div className="bg-green-50 border border-green-300 rounded-[5px] p-6">
        <h3 className="font-semibold text-green-900 mb-3">✅ COMPLETE PALETTE - USAGE PRINCIPLES</h3>
        <ul className="space-y-2 text-sm text-green-900">
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>Never create new colors</strong> - Every use case is covered by these 100+ tokens</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>Use semantic tokens first</strong> - Prefer --text-primary over hardcoded rgba values</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>Respect usage limits</strong> - Brand Red 5% max, Accent Colors 3% max combined</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>Maintain WCAG AAA</strong> - Always test contrast ratios (7:1+ for normal text)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>RGB for gradients</strong> - Use provided RGB values in rgba() for gradient overlays</span>
          </li>
        </ul>
      </div>

      {/* CODE SNIPPET EXAMPLES */}
      <div className="border border-black/8 rounded-[5px] p-6 bg-black/[0.02]">
        <h3 className="text-xl font-semibold mb-4">💻 Code Snippet Examples</h3>
        <div className="space-y-4">
          <CodeSnippetBox
            title="CSS Variables"
            code={`/* Using color tokens in CSS */
.my-button {
  background: var(--red-600);
  color: var(--white);
}

.my-button:hover {
  background: var(--red-700);
}

.success-message {
  color: var(--green-600);
  background: var(--green-50);
  border: 1px solid var(--green-300);
}`}
          />
          
          <CodeSnippetBox
            title="Gradient with RGB Values"
            code={`/* Using RGB values for gradients */
.hero-section {
  background: linear-gradient(
    135deg,
    rgba(128, 108, 224, 0.12) 0%,    /* purple-600 at 12% opacity */
    rgba(176, 31, 36, 0.08) 100%     /* red-600 at 8% opacity */
  );
}

/* Radial gradient for soft glow */
.feature-card {
  background: radial-gradient(
    circle 600px at 100% 100%,
    rgba(234, 122, 95, 0.06) 0%,     /* coral-600 at 6% opacity */
    transparent 70%
  );
}`}
          />
          
          <CodeSnippetBox
            title="React/Tailwind Usage"
            code={`// Using color tokens in React components
<button 
  style={{ background: 'var(--red-600)' }}
  className="px-6 py-3 rounded-[5px] text-white"
>
  Primary CTA
</button>

// Success state with semantic colors
<div 
  style={{ 
    background: 'var(--green-50)', 
    border: '1px solid var(--green-300)',
    color: 'var(--green-700)'
  }}
>
  Success: Your changes have been saved.
</div>`}
          />
        </div>
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
const colorData = {
  red: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a7',
    400: '#f87176',
    500: '#dc3238',
    600: '#b01f24',
    700: '#8f181d',
    800: '#771419',
    900: '#5f1014',
  },
  coral: {
    50: '#fffbf9', 100: '#fff5f1', 200: '#ffebe4', 300: '#fdd7cb', 400: '#fbb8a7',
    500: '#f99b85', 600: '#ea7a5f', 700: '#d96548', 800: '#c15138', 900: '#a23f2d',
  },
  warm: {
    50: '#fefdfd', 100: '#fcfbfa', 200: '#f9f7f6', 300: '#f5f2f1', 400: '#f0ebe9',
    500: '#eae5e3', 600: '#d9d1ce', 700: '#c8bcb8', 800: '#b7a9a3', 900: '#a6968e',
  },
  purple: {
    50: '#f7f6fe', 100: '#efedfd', 200: '#dfdcfb', 300: '#c4bef7', 400: '#a89ff2',
    500: '#9488ec', 600: '#806ce0', 700: '#6c5bc0', 800: '#5a4ba0', 900: '#483c80',
  },
  periwinkle: {
    50: '#fafbfe', 100: '#f5f6fd', 200: '#ebedfb', 300: '#dfe1f9', 400: '#d3d5f9',
    500: '#c3c6f9', 600: '#a7abf0', 700: '#8b90e0', 800: '#7075c8', 900: '#5a5fa0',
  },
  perano: {
    50: '#fcfdfe', 100: '#f9fbfe', 200: '#f4f8fd', 300: '#eff5fc', 400: '#e9f2fb',
    500: '#dfeafa', 600: '#c8dff5', 700: '#a7c9ed', 800: '#86b3e5', 900: '#6b94c0',
  },
  green: {
    50: '#ecfdf5', 100: '#d1fae5', 200: '#a7f3d0', 300: '#6ee7b7', 400: '#34d399',
    500: '#10b981', 600: '#059669', 700: '#047857', 800: '#065f46', 900: '#064e3b',
  },
  amber: {
    50: '#fffbeb', 100: '#fef3c7', 200: '#fde68a', 300: '#fcd34d', 400: '#fbbf24',
    500: '#f59e0b', 600: '#d97706', 700: '#b45309', 800: '#92400e', 900: '#78350f',
  },
  rose: {
    50: '#fff1f2', 100: '#ffe4e6', 200: '#fecdd3', 300: '#fda4af', 400: '#fb7185',
    500: '#f43f5e', 600: '#e11d48', 700: '#be123c', 800: '#9f1239', 900: '#881337',
  },
  black: {
    50: '#fafafa', 100: '#f5f5f5', 200: '#e5e5e5', 300: '#d4d4d4', 400: '#a3a3a3',
    500: '#737373', 600: '#525252', 700: '#404040', 800: '#262626', 900: '#171717',
    pure: '#000000',
  },
};

function generateCSSExport() {
  const lines = [':root {'];
  const familyNames = Object.keys(colorData) as Array<keyof typeof colorData>;
  for (const family of familyNames) {
    lines.push(`  /* ${family.charAt(0).toUpperCase() + family.slice(1)} */`);
    const shades = colorData[family];
    for (const [shade, hex] of Object.entries(shades)) {
      lines.push(`  --${family}-${shade}: ${hex};`);
    }
    lines.push('');
  }
  lines.push('}');
  return lines.join('\n');
}