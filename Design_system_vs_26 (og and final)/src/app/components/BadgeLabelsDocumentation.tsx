/**
 * ===============================================================================
 * BADGES & SECTION LABELS DOCUMENTATION (COMPONENTS TAB)
 * ===============================================================================
 * 
 * WHY: Single source of truth for all badge/label visual documentation
 * WHAT: Badge system showcase + Section Label + Chapter Label patterns
 * WHEN: Accessed via Components > Badges & Section Labels in design system dashboard
 * WHERE: Renders inside DesignSystemDashboard when subTab === 'badges-labels'
 * HOW: BadgeShowcase (core docs) + extended section/chapter label guidance
 * 
 * -------------------------------------------------------------------------------
 * STRUCTURE (3 categories, 1 unified Badge component)
 * -------------------------------------------------------------------------------
 * 1. Badges (pill-shaped indicators): PHASE 1, STEP 2, +316%, status pills
 *    - 3 variants (minimal, rounded, pill), 4 sizes, 11 themes
 *    - Shown in BadgeShowcase component
 * 
 * 2. Section Labels (text-only markers): KEY INSIGHTS, REPORT PREVIEW
 *    - Above section headings, no background, minimal variant
 *    - SectionLabel wrapper with configurable theme (pillar color rules)
 * 
 * 3. Chapter Labels (text-only with numbering): CHAPTER 1 - INDUSTRY ANALYSIS
 *    - Direct Badge usage pattern (no wrapper needed)
 *    - Documented here with examples
 * 
 * -------------------------------------------------------------------------------
 * SHARED FONT DNA: font-sans, semibold, uppercase, wide tracking
 * DIFFERENCE: shape & context (badges = pill/bordered, labels = text-only)
 * -------------------------------------------------------------------------------
 * 
 * NOTE: Form labels (Label.tsx) are documented separately on the Form Inputs page.
 * Label.tsx is a semantic <label> element for forms — completely different purpose.
 */

import { BadgeShowcase } from '@/app/components/BadgeShowcase';
import { 
  Badge, 
  SectionLabel, 
  type BadgeTheme 
} from '@/app/components/Badge';
import { DocSection } from '@/app/components/FoundationsContent';
import { useState, type ReactNode } from 'react';
import { Copy, Check } from 'lucide-react';

// ===============================================================================
// REUSABLE COMPONENTS
// ===============================================================================

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative bg-black/5 rounded-[5px] p-4 border border-black/8 mb-6">
      <button
        onClick={copyCode}
        className="absolute top-3 right-3 p-2 rounded bg-white/80 hover:bg-white transition-colors flex items-center gap-2 text-xs"
      >
        {copied ? (
          <>
            <Check size={14} />
            Copied!
          </>
        ) : (
          <>
            <Copy size={14} />
            Copy
          </>
        )}
      </button>
      <pre className="text-xs font-mono text-black/80 overflow-x-auto pr-12 whitespace-pre-wrap">
        {code}
      </pre>
    </div>
  );
}

function ComponentPreview({ 
  title, 
  description, 
  children 
}: { 
  title: string; 
  description?: string;
  children: ReactNode;
}) {
  return (
    <div className="border border-black/8 rounded-[5px] overflow-hidden mb-6">
      <div className="bg-black/[0.02] px-6 py-4 border-b border-black/8">
        <h4 className="font-semibold text-sm mb-1">{title}</h4>
        {description && <p className="text-xs text-black/60">{description}</p>}
      </div>
      <div className="p-8 bg-white">
        {children}
      </div>
    </div>
  );
}

// ===============================================================================
// ALL 11 THEMES DATA
// ===============================================================================

const ALL_THEMES: Array<{
  theme: BadgeTheme;
  label: string;
  colorFamily: string;
  purpose: string;
  paletteNumber: string;
}> = [
  { theme: 'neutral', label: 'Neutral', colorFamily: 'Black Tints', purpose: 'Default state, no opinion, general-purpose', paletteNumber: '#10' },
  { theme: 'warm', label: 'Warm', colorFamily: 'Warm Editorial', purpose: 'Sophistication, premium feel, editorial sections', paletteNumber: '#3' },
  { theme: 'brand', label: 'Brand', colorFamily: 'Ken Bold Red', purpose: 'Brand identity, report/product/research pages', paletteNumber: '#1' },
  { theme: 'coral', label: 'Coral', colorFamily: 'Coral/Terracotta', purpose: 'Warmth, energy, approachability, creative content', paletteNumber: '#2' },
  { theme: 'purple', label: 'Purple', colorFamily: 'Purple', purpose: 'Premium features, innovation, insights, survey pillar', paletteNumber: '#4' },
  { theme: 'periwinkle', label: 'Periwinkle', colorFamily: 'Periwinkle', purpose: 'Trust, reliability, calm, phase badges', paletteNumber: '#5' },
  { theme: 'info', label: 'Info', colorFamily: 'Perano (Light Blue)', purpose: 'Informational, data sections, methodology', paletteNumber: '#6' },
  { theme: 'success', label: 'Success', colorFamily: 'Green', purpose: 'Positive outcomes, growth, confirmations', paletteNumber: '#7' },
  { theme: 'warning', label: 'Warning', colorFamily: 'Amber', purpose: 'Caution, attention, important notices', paletteNumber: '#8' },
  { theme: 'error', label: 'Error', colorFamily: 'Rose', purpose: 'Errors, validation failures, destructive actions', paletteNumber: '#9' },
  { theme: 'muted', label: 'Muted', colorFamily: 'Black Tints (subdued)', purpose: 'Deprecated, optional, archived, de-emphasized', paletteNumber: '#10 (reduced)' },
];

// ===============================================================================
// MAIN EXPORT
// ===============================================================================

export function BadgeLabelsDocumentation() {
  return (
    <div className="space-y-16">
      {/* ========================================== */}
      {/* 4W+H OVERVIEW                              */}
      {/* ========================================== */}
      <DocSection
        title="Badges & Section Labels"
        what="A unified Badge component covering 3 categories: Badges (pill indicators), Section Labels (text-only markers), and Chapter Labels (numbered text) — all sharing the same font DNA (font-sans, semibold, uppercase, wide tracking)"
        why="Consistent visual categorization across the entire design system with 11 themes mapped to all 10 color palette families, WCAG AAA accessibility, and pillar-based color rules"
        when="Use Badges for tags, status, categories, and interactive filters. Use Section Labels above headings. Use Chapter Labels for numbered content divisions"
        where="Badges: dashboards, content cards, navigation, filters. Section Labels: case study pages, report sections. Chapter Labels: long-form editorial content"
        how="Import pre-configured wrappers (SectionLabel, StepPill, ClickableBadge, etc.) or use base Badge component with variant/theme/size props"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 bg-black/[0.02] rounded-[5px] border border-black/5">
            <h4 className="font-semibold text-sm mb-2">Badges</h4>
            <p className="text-xs text-black/60">
              Pill-shaped indicators: PHASE 1, STEP 2, +316%, status pills. 
              3 variants, 4 sizes, 11 themes.
            </p>
          </div>

          <div className="p-4 bg-black/[0.02] rounded-[5px] border border-black/5">
            <h4 className="font-semibold text-sm mb-2">Section Labels</h4>
            <p className="text-xs text-black/60">
              Text-only markers above headings: KEY INSIGHTS, REPORT PREVIEW. 
              SectionLabel wrapper with configurable theme prop.
            </p>
          </div>

          <div className="p-4 bg-black/[0.02] rounded-[5px] border border-black/5">
            <h4 className="font-semibold text-sm mb-2">Chapter Labels</h4>
            <p className="text-xs text-black/60">
              Numbered text markers: CHAPTER 1 - INDUSTRY ANALYSIS. 
              Direct Badge usage pattern (no wrapper needed).
            </p>
          </div>
        </div>

        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-[5px]">
          <p className="text-xs text-amber-800">
            <strong>Looking for form labels?</strong> The Label component (<code className="px-1 py-0.5 bg-amber-100 rounded">Label.tsx</code>) is documented on the <strong>Form Inputs</strong> page. 
            Label.tsx is a semantic <code className="px-1 py-0.5 bg-amber-100 rounded">&lt;label&gt;</code> element for forms — completely separate from badges.
          </p>
        </div>
      </DocSection>

      {/* ========================================== */}
      {/* BADGE SYSTEM (COMPLETE SHOWCASE)            */}
      {/* ========================================== */}
      <section>
        <div className="mb-8">
          <h2 className="text-2xl font-normal mb-2">Badge Component System</h2>
          <p className="text-sm text-black/60">
            Complete badge system with interactive demos, all 11 themes, and copy-paste code snippets
          </p>
        </div>

        {/* Import the complete BadgeShowcase */}
        <BadgeShowcase />
      </section>

      {/* ========================================== */}
      {/* ALL 11 THEMES VISUAL GALLERY               */}
      {/* ========================================== */}
      <section>
        <div className="mb-8 pb-4 border-b border-black/10">
          <h2 className="text-2xl font-normal mb-2">Complete Theme Gallery</h2>
          <p className="text-sm text-black/60">
            All 11 themes mapped to the full color palette — showing how each looks across all 3 variants (pill, rounded, minimal)
          </p>
        </div>

        {/* Light mode gallery */}
        <h3 className="text-xl font-normal mb-6">Light Mode</h3>
        
        <div className="space-y-4 mb-12">
          {ALL_THEMES.map(({ theme, label, colorFamily, purpose, paletteNumber }) => (
            <div key={theme} className="border border-black/8 rounded-[5px] p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-sm mb-1">{label} <span className="text-black/40 font-normal">({colorFamily})</span></h4>
                  <p className="text-xs text-black/50">Palette {paletteNumber} — {purpose}</p>
                </div>
                <code className="text-[10px] font-mono bg-black/5 px-2 py-1 rounded">theme="{theme}"</code>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <Badge variant="pill" size="sm" theme={theme} bordered shimmer>
                  PILL BADGE
                </Badge>
                <Badge variant="rounded" size="sm" theme={theme} bordered>
                  ROUNDED
                </Badge>
                <Badge variant="minimal" size="sm" theme={theme}>
                  MINIMAL
                </Badge>
                <Badge variant="pill" size="xs" theme={theme} bordered>
                  XS SIZE
                </Badge>
                <Badge variant="pill" size="md" theme={theme} bordered shimmer>
                  MD SIZE
                </Badge>
                <Badge variant="pill" size="lg" theme={theme} bordered>
                  LG SIZE
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {/* Dark mode gallery */}
        <h3 className="text-xl font-normal mb-6">Dark Mode</h3>
        
        <div className="space-y-4 mb-8">
          {ALL_THEMES.map(({ theme, label, colorFamily, paletteNumber }) => (
            <div key={`dark-${theme}`} className="border border-white/[0.08] rounded-[5px] p-6 bg-[#0a0a0a]">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-sm mb-1 text-white/90">{label} <span className="text-white/35 font-normal">({colorFamily})</span></h4>
                  <p className="text-xs text-white/45">Palette {paletteNumber} — Dark mode</p>
                </div>
                <code className="text-[10px] font-mono bg-white/[0.06] text-white/60 px-2 py-1 rounded border border-white/[0.06]">mode="dark"</code>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <Badge variant="pill" size="sm" theme={theme} mode="dark" bordered shimmer>
                  PILL BADGE
                </Badge>
                <Badge variant="rounded" size="sm" theme={theme} mode="dark" bordered>
                  ROUNDED
                </Badge>
                <Badge variant="minimal" size="sm" theme={theme} mode="dark">
                  MINIMAL
                </Badge>
                <Badge variant="pill" size="xs" theme={theme} mode="dark" bordered>
                  XS SIZE
                </Badge>
                <Badge variant="pill" size="md" theme={theme} mode="dark" bordered shimmer>
                  MD SIZE
                </Badge>
                <Badge variant="pill" size="lg" theme={theme} mode="dark" bordered>
                  LG SIZE
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {/* Muted vs Neutral comparison */}
        <ComponentPreview
          title="Muted vs Neutral — Side by Side"
          description="Muted is NOT the same as neutral. Muted actively communicates 'this is less important' through reduced opacity and softer borders."
        >
          <div className="space-y-6">
            <div>
              <p className="text-xs text-black/50 mb-3 uppercase tracking-wider">Neutral (default — no opinion)</p>
              <div className="flex flex-wrap gap-3">
                <Badge variant="pill" size="sm" theme="neutral" bordered>ACTIVE FEATURE</Badge>
                <Badge variant="rounded" size="sm" theme="neutral" bordered>CURRENT</Badge>
                <Badge variant="minimal" size="sm" theme="neutral">STANDARD LABEL</Badge>
              </div>
            </div>
            <div className="pt-4 border-t border-black/8">
              <p className="text-xs text-black/50 mb-3 uppercase tracking-wider">Muted (deliberately subdued — de-emphasized)</p>
              <div className="flex flex-wrap gap-3">
                <Badge variant="pill" size="sm" theme="muted" bordered>DEPRECATED</Badge>
                <Badge variant="rounded" size="sm" theme="muted" bordered>ARCHIVED</Badge>
                <Badge variant="minimal" size="sm" theme="muted">OPTIONAL</Badge>
              </div>
            </div>
            <div className="p-3 bg-black/[0.02] rounded-[5px] border border-black/5 text-xs text-black/60">
              <strong>WHY muted exists:</strong> Deprecated features, optional/non-essential metadata, archived content, 
              background categorization that shouldn't draw attention. Where neutral says "I'm here," muted says "I'm here but don't look at me."
            </div>
          </div>
        </ComponentPreview>
      </section>

      {/* ========================================== */}
      {/* SECTION LABELS DOCUMENTATION                */}
      {/* ========================================== */}
      <section>
        <div className="mb-8 pb-4 border-b border-black/10">
          <h2 className="text-2xl font-normal mb-2">Section Labels</h2>
          <p className="text-sm text-black/60">
            Text-only markers that appear above section headings — the SectionLabel wrapper from Badge.tsx
          </p>
        </div>

        {/* Section Label 4W+H */}
        <div className="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-[5px]">
          <h3 className="font-semibold text-blue-900 mb-3">Section Label Quick Reference</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
            <div>
              <strong>WHAT:</strong> Text-only markers above section headings (no background, no border)
            </div>
            <div>
              <strong>WHY:</strong> Visual anchors that connect content to page identity via pillar colors
            </div>
            <div>
              <strong>WHEN:</strong> Above h2/h3 headings on case study pages, report sections, editorial content
            </div>
            <div>
              <strong>FONT DNA:</strong> font-sans, semibold (600), uppercase, wide tracking, minimal variant
            </div>
            <div>
              <strong>IMPORT:</strong> <code className="px-1 py-0.5 bg-blue-100 rounded text-xs">import &#123; SectionLabel &#125; from '@/app/components/Badge'</code>
            </div>
            <div>
              <strong>DEFAULT:</strong> theme="neutral", fontWeight=600, size="sm", 12px bottom margin
            </div>
          </div>
        </div>

        {/* Pillar Color Rules */}
        <h3 className="text-xl font-normal mb-6">Pillar Color Rules</h3>
        
        <ComponentPreview
          title="Theme Selection by Page Context"
          description="Section label colors follow page pillar rules — not arbitrary choice"
        >
          <div className="space-y-8">
            <div>
              <p className="text-xs text-black/50 mb-3 uppercase tracking-wider">Report / Product / Research Pages → theme="brand"</p>
              <div className="space-y-2">
                <SectionLabel theme="brand">KEY INSIGHTS</SectionLabel>
                <SectionLabel theme="brand">REPORT PREVIEW</SectionLabel>
                <SectionLabel theme="brand">RESEARCH FINDINGS</SectionLabel>
              </div>
            </div>

            <div className="pt-4 border-t border-black/8">
              <p className="text-xs text-black/50 mb-3 uppercase tracking-wider">Service Pages (Survey) → theme="purple"</p>
              <div className="space-y-2">
                <SectionLabel theme="purple">SURVEY METHODOLOGY</SectionLabel>
                <SectionLabel theme="purple">DATA COLLECTION</SectionLabel>
              </div>
            </div>

            <div className="pt-4 border-t border-black/8">
              <p className="text-xs text-black/50 mb-3 uppercase tracking-wider">Service Pages (Consulting) → theme="warm"</p>
              <div className="space-y-2">
                <SectionLabel theme="warm">CONSULTING APPROACH</SectionLabel>
                <SectionLabel theme="warm">ENGAGEMENT MODEL</SectionLabel>
              </div>
            </div>

            <div className="pt-4 border-t border-black/8">
              <p className="text-xs text-black/50 mb-3 uppercase tracking-wider">Default / General → theme="neutral"</p>
              <div className="space-y-2">
                <SectionLabel>CHALLENGES</SectionLabel>
                <SectionLabel>CLIENT CONTEXT</SectionLabel>
                <SectionLabel>MEASURABLE OUTCOMES</SectionLabel>
              </div>
            </div>

            <div className="pt-4 border-t border-black/8 bg-black p-6 -mx-8 -mb-8 rounded-b-lg">
              <p className="text-xs text-white/50 mb-3 uppercase tracking-wider">Dark Background → mode="dark"</p>
              <div className="space-y-2">
                <SectionLabel mode="dark">RESOURCES</SectionLabel>
                <SectionLabel mode="dark" theme="brand">CASE STUDY</SectionLabel>
              </div>
            </div>
          </div>
        </ComponentPreview>

        {/* All themes as Section Labels */}
        <h3 className="text-xl font-normal mb-6">Section Label in Every Theme</h3>
        
        <ComponentPreview
          title="All 11 Themes as Section Labels"
          description="Showing how SectionLabel looks with every available theme"
        >
          <div className="space-y-4">
            {ALL_THEMES.map(({ theme, label, purpose }) => (
              <div key={`sl-${theme}`} className="flex items-center gap-4">
                <div className="w-32 shrink-0">
                  <code className="text-[10px] font-mono bg-black/5 px-1.5 py-0.5 rounded">{theme}</code>
                </div>
                <SectionLabel theme={theme} style={{ marginBottom: 0 }}>{label.toUpperCase()} SECTION</SectionLabel>
                <span className="text-xs text-black/40 ml-auto hidden md:block">{purpose}</span>
              </div>
            ))}
          </div>
        </ComponentPreview>

        {/* Font Weight Examples */}
        <h3 className="text-xl font-normal mb-6">Font Weight Options</h3>
        
        <ComponentPreview
          title="fontWeight Comparison"
          description="Default is 600 (semibold) for editorial hierarchy. Use 400 for subtle markers."
        >
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <code className="text-[10px] font-mono bg-black/5 px-1.5 py-0.5 rounded w-28 shrink-0">fontWeight=400</code>
              <SectionLabel theme="brand" fontWeight={400} style={{ marginBottom: 0 }}>SUBTLE MARKER</SectionLabel>
              <span className="text-xs text-black/40 ml-auto">Body-context, soft presence</span>
            </div>
            <div className="flex items-center gap-4">
              <code className="text-[10px] font-mono bg-black/5 px-1.5 py-0.5 rounded w-28 shrink-0">fontWeight=500</code>
              <SectionLabel theme="brand" fontWeight={500} style={{ marginBottom: 0 }}>MEDIUM MARKER</SectionLabel>
              <span className="text-xs text-black/40 ml-auto">Balanced, category-like</span>
            </div>
            <div className="flex items-center gap-4">
              <code className="text-[10px] font-mono bg-black/5 px-1.5 py-0.5 rounded w-28 shrink-0">fontWeight=600</code>
              <SectionLabel theme="brand" fontWeight={600} style={{ marginBottom: 0 }}>STRONG MARKER</SectionLabel>
              <span className="text-xs text-black/40 ml-auto">Default — editorial heading hierarchy</span>
            </div>
          </div>
        </ComponentPreview>

        {/* Section Label Code */}
        <CodeBlock code={`import { SectionLabel } from '@/app/components/Badge';

// Default (neutral theme, semibold)
<SectionLabel>CHALLENGES</SectionLabel>

// Report/Product/Research pages — brand red
<SectionLabel theme="brand">KEY INSIGHTS</SectionLabel>

// Service pillar — survey page
<SectionLabel theme="purple">SURVEY METHODOLOGY</SectionLabel>

// Dark background
<SectionLabel mode="dark">RESOURCES</SectionLabel>

// Subtle body-context marker
<SectionLabel theme="brand" fontWeight={400}>REPORT PREVIEW</SectionLabel>

// Full props
<SectionLabel 
  theme="brand" 
  mode="light" 
  fontWeight={600} 
  className="custom-class"
  style={{ marginBottom: '16px' }}
>
  ENGAGEMENT VALUE PILLARS
</SectionLabel>`} />
      </section>

      {/* ========================================== */}
      {/* CHAPTER LABELS DOCUMENTATION                */}
      {/* ========================================== */}
      <section>
        <div className="mb-8 pb-4 border-b border-black/10">
          <h2 className="text-2xl font-normal mb-2">Chapter Labels</h2>
          <p className="text-sm text-black/60">
            Numbered text-only markers for long-form editorial content — using Badge directly (no wrapper needed)
          </p>
        </div>

        {/* Chapter Label 4W+H */}
        <div className="mb-8 p-6 bg-purple-50 border border-purple-200 rounded-[5px]">
          <h3 className="font-semibold text-purple-900 mb-3">Chapter Label Quick Reference</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-purple-800">
            <div>
              <strong>WHAT:</strong> Text-only label with numbering: "CHAPTER 1 - INDUSTRY ANALYSIS"
            </div>
            <div>
              <strong>WHY:</strong> Creates clear content divisions in long-form editorial layouts
            </div>
            <div>
              <strong>WHEN:</strong> Reports, whitepapers, research documents, multi-section case studies
            </div>
            <div>
              <strong>FONT DNA:</strong> Same as SectionLabel — font-sans, semibold, uppercase, wide tracking
            </div>
            <div>
              <strong>PATTERN:</strong> Use Badge directly with variant="minimal", size="sm", fontWeight=600
            </div>
            <div>
              <strong>NO WRAPPER:</strong> Chapter labels are infrequent enough that a convenience wrapper adds no value
            </div>
          </div>
        </div>

        {/* Chapter Label Examples */}
        <ComponentPreview
          title="Chapter Label Pattern"
          description="Direct Badge usage for numbered chapter headers"
        >
          <div className="space-y-6">
            <div>
              <Badge variant="minimal" size="sm" theme="brand" fontWeight={600} style={{ marginBottom: '12px' }}>
                CHAPTER 1 - INDUSTRY ANALYSIS
              </Badge>
              <h3 className="text-xl">Understanding the Market Landscape</h3>
            </div>
            
            <div className="pt-4 border-t border-black/8">
              <Badge variant="minimal" size="sm" theme="brand" fontWeight={600} style={{ marginBottom: '12px' }}>
                CHAPTER 2 - METHODOLOGY
              </Badge>
              <h3 className="text-xl">Research Approach & Framework</h3>
            </div>
            
            <div className="pt-4 border-t border-black/8">
              <Badge variant="minimal" size="sm" theme="brand" fontWeight={600} style={{ marginBottom: '12px' }}>
                CHAPTER 3 - FINDINGS
              </Badge>
              <h3 className="text-xl">Key Results & Analysis</h3>
            </div>
          </div>
        </ComponentPreview>

        {/* Chapter Labels with different themes */}
        <ComponentPreview
          title="Chapter Labels Across Themes"
          description="Chapters follow the same pillar color rules as section labels"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <code className="text-[10px] font-mono bg-black/5 px-1.5 py-0.5 rounded w-28 shrink-0">brand</code>
              <Badge variant="minimal" size="sm" theme="brand" fontWeight={600}>CHAPTER 1 - REPORT SECTION</Badge>
            </div>
            <div className="flex items-center gap-4">
              <code className="text-[10px] font-mono bg-black/5 px-1.5 py-0.5 rounded w-28 shrink-0">purple</code>
              <Badge variant="minimal" size="sm" theme="purple" fontWeight={600}>CHAPTER 1 - SURVEY SECTION</Badge>
            </div>
            <div className="flex items-center gap-4">
              <code className="text-[10px] font-mono bg-black/5 px-1.5 py-0.5 rounded w-28 shrink-0">warm</code>
              <Badge variant="minimal" size="sm" theme="warm" fontWeight={600}>CHAPTER 1 - CONSULTING SECTION</Badge>
            </div>
            <div className="flex items-center gap-4">
              <code className="text-[10px] font-mono bg-black/5 px-1.5 py-0.5 rounded w-28 shrink-0">neutral</code>
              <Badge variant="minimal" size="sm" theme="neutral" fontWeight={600}>CHAPTER 1 - GENERAL SECTION</Badge>
            </div>
          </div>
        </ComponentPreview>

        {/* Chapter Label Code */}
        <CodeBlock code={`import { Badge } from '@/app/components/Badge';

// Chapter label pattern — use Badge directly
<Badge 
  variant="minimal" 
  size="sm" 
  theme="brand" 
  fontWeight={600}
  style={{ marginBottom: '12px' }}
>
  CHAPTER 1 - INDUSTRY ANALYSIS
</Badge>
<h3>Understanding the Market Landscape</h3>

// WHY no wrapper?
// Chapter labels appear infrequently (3-8 per document) and the pattern
// is simple enough that a wrapper adds no real value. Just use Badge
// directly with these props:
//   variant="minimal"  → no background, no border
//   size="sm"          → 11px, standard label size
//   theme="brand"      → follows pillar color rules
//   fontWeight={600}   → semibold for heading context

// Dynamic chapter numbering
{chapters.map((chapter, index) => (
  <Badge 
    key={chapter.id}
    variant="minimal" 
    size="sm" 
    theme="brand" 
    fontWeight={600}
    style={{ marginBottom: '12px' }}
  >
    CHAPTER {index + 1} - {chapter.title}
  </Badge>
))}`} />
      </section>

      {/* ========================================== */}
      {/* ACCESSIBILITY GUIDELINES                    */}
      {/* ========================================== */}
      <section>
        <h2 className="text-2xl font-normal mb-8 pb-4 border-b border-black/10">Accessibility Guidelines</h2>

        <div className="space-y-6">
          <div className="p-6 bg-blue-50 border border-blue-200 rounded-[5px]">
            <h3 className="font-semibold text-blue-900 mb-3">Badge Accessibility</h3>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>Uses semantic <code className="px-1 py-0.5 bg-blue-100 rounded">&lt;span&gt;</code> element</li>
              <li>Relies on text content for screen readers</li>
              <li>For decorative badges, add <code className="px-1 py-0.5 bg-blue-100 rounded">aria-hidden="true"</code></li>
              <li>For status badges, ensure context is clear to assistive technology</li>
              <li>Icon-only badges should have descriptive text or aria-label</li>
              <li><strong>Icon layout rule:</strong> Icons in badges are ALWAYS horizontal (left of text), never stacked vertically. Use the <code className="px-1 py-0.5 bg-blue-100 rounded">icon</code> prop for size-matched icons (xs=10px, sm=12px, md=14px, lg=16px)</li>
              <li>All 11 themes tested for WCAG AAA compliance (7:1+ contrast ratio in light mode)</li>
              <li>Muted theme intentionally targets WCAG AA (5.2:1) — acceptable for de-emphasized content</li>
            </ul>
          </div>

          <div className="p-6 bg-green-50 border border-green-200 rounded-[5px]">
            <h3 className="font-semibold text-green-900 mb-3">Section & Chapter Label Accessibility</h3>
            <ul className="text-sm text-green-800 space-y-2">
              <li>Section/Chapter labels are decorative visual markers, not semantic headings</li>
              <li>The actual heading (<code className="px-1 py-0.5 bg-green-100 rounded">&lt;h2&gt;</code>, <code className="px-1 py-0.5 bg-green-100 rounded">&lt;h3&gt;</code>) below carries the semantic meaning</li>
              <li>Screen readers will naturally read the label text, then the heading</li>
              <li>Do NOT use section labels as a replacement for heading elements</li>
              <li>For form labels, use <code className="px-1 py-0.5 bg-green-100 rounded">Label.tsx</code> (documented on Form Inputs page)</li>
            </ul>
          </div>

          <CodeBlock code={`// Badge with context for screen readers
<div>
  <span className="sr-only">Status: </span>
  <Badge>Active</Badge>
</div>

// Decorative badge (hidden from screen readers)
<Badge aria-hidden="true">New</Badge>

// Section label + heading (correct pattern)
<SectionLabel theme="brand">KEY INSIGHTS</SectionLabel>
<h2>Market Analysis Results</h2>
// Screen reader: "KEY INSIGHTS Market Analysis Results, heading level 2"

// Chapter label + heading (correct pattern)
<Badge variant="minimal" size="sm" theme="brand" fontWeight={600}>
  CHAPTER 1 - INDUSTRY ANALYSIS
</Badge>
<h2>Understanding the Market Landscape</h2>`} />
        </div>
      </section>
    </div>
  );
}