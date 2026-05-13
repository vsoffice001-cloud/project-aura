import { useState } from 'react';
import { Download, Send, Heart, Edit, Trash2, Star, FileText, Share2, Bookmark, ArrowUpRight, ExternalLink, LogIn } from 'lucide-react';
import { Button } from '@/app/components/Button';
import { AnimatedArrow } from '@/app/components/AnimatedArrow';
import { ButtonControlsGuide } from '@/app/components/ButtonControlsGuide';

/**
 * BUTTON COMPONENT DOCUMENTATION
 * ================================
 * Complete reference for the Button component following Material Design documentation patterns
 * Combines technical API reference with practical usage examples
 */

// ==================== HELPER COMPONENTS ====================

function DocSection({ 
  title, 
  why, 
  what, 
  when, 
  whenNot, 
  how, 
  children 
}: {
  title: string;
  why?: string;
  what?: string;
  when?: string;
  whenNot?: string;
  how?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-6">
      <div>
        <h3 className="text-2xl font-normal mb-4">{title}</h3>
        {why && (
          <div className="mb-3">
            <span className="text-sm font-semibold text-black/50 uppercase tracking-wide">WHY</span>
            <p className="text-sm text-black/70 mt-1">{why}</p>
          </div>
        )}
        {what && (
          <div className="mb-3">
            <span className="text-sm font-semibold text-black/50 uppercase tracking-wide">WHAT</span>
            <p className="text-sm text-black/70 mt-1">{what}</p>
          </div>
        )}
        {when && (
          <div className="mb-3">
            <span className="text-sm font-semibold text-black/50 uppercase tracking-wide">WHEN</span>
            <p className="text-sm text-black/70 mt-1">{when}</p>
          </div>
        )}
        {whenNot && (
          <div className="mb-3">
            <span className="text-sm font-semibold text-black/50 uppercase tracking-wide">WHEN NOT</span>
            <p className="text-sm text-black/70 mt-1">{whenNot}</p>
          </div>
        )}
        {how && (
          <div className="mb-3">
            <span className="text-sm font-semibold text-black/50 uppercase tracking-wide">HOW</span>
            <p className="text-sm text-black/70 mt-1">{how}</p>
          </div>
        )}
      </div>
      {children}
    </section>
  );
}

function ComponentPreview({ 
  title, 
  description, 
  children, 
  bg = 'white' 
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  bg?: 'white' | 'dark';
}) {
  return (
    <div className="border border-black/8 rounded-[5px] overflow-hidden">
      <div className="bg-black/[0.02] px-6 py-4 border-b border-black/8">
        <h3 className="font-semibold text-sm">{title}</h3>
        {description && <p className="text-xs text-black/60 mt-1">{description}</p>}
      </div>
      <div className={`p-6 ${bg === 'dark' ? 'bg-black' : 'bg-white'}`}>
        {children}
      </div>
    </div>
  );
}

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border border-black/8 rounded-[5px] overflow-hidden">
      <div className="bg-black/[0.02] px-4 py-2 border-b border-black/8 flex items-center justify-between">
        <span className="text-sm font-semibold">Code</span>
        <button
          onClick={copyCode}
          className="text-xs px-3 py-1 hover:bg-black/5 rounded transition-colors"
        >
          {copied ? '✓ Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto bg-black/[0.02]">
        <code className="text-xs font-mono text-black/80">{code}</code>
      </pre>
    </div>
  );
}

function PropsTable({ props }: { props: PropItem[] }) {
  return (
    <div className="border border-black/8 rounded-[5px] overflow-x-auto">
      <table className="w-full min-w-[500px]">
        <thead>
          <tr className="border-b border-black/8 bg-black/[0.02]">
            <th className="text-left p-3 text-xs font-bold">Property</th>
            <th className="text-left p-3 text-xs font-bold">Type</th>
            <th className="text-left p-3 text-xs font-bold">Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop, idx) => (
            <tr key={idx} className="border-b border-black/8 last:border-0">
              <td className="p-3">
                <code className="text-xs font-mono bg-black/5 px-2 py-1 rounded">{prop.property}</code>
              </td>
              <td className="p-3">
                <code className="text-xs font-mono text-black/60">{prop.value}</code>
              </td>
              <td className="p-3 text-xs text-black/70">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ==================== MAIN COMPONENT ====================

export function ButtonDocumentation() {
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({});

  const handleLoadingDemo = (key: string) => {
    setLoadingStates({ ...loadingStates, [key]: true });
    setTimeout(() => {
      setLoadingStates({ ...loadingStates, [key]: false });
    }, 2000);
  };

  // Interactive Playground State
  const [playgroundVariant, setPlaygroundVariant] = useState<'primary' | 'secondary' | 'ghost' | 'brand'>('brand');
  const [playgroundSize, setPlaygroundSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('lg');
  const [playgroundLoading, setPlaygroundLoading] = useState(false);
  const [playgroundDisabled, setPlaygroundDisabled] = useState(false);
  const [playgroundIconPosition, setPlaygroundIconPosition] = useState<'none' | 'left' | 'right'>('right');
  const [playgroundText, setPlaygroundText] = useState('Click Me');

  const iconMap = {
    ArrowUpRight: <ArrowUpRight size={18} />,
    Download: <Download size={18} />,
    Heart: <Heart size={18} />,
  };
  const [playgroundSelectedIcon, setPlaygroundSelectedIcon] = useState<keyof typeof iconMap>('ArrowUpRight');

  const generatePlaygroundCode = () => {
    const props: string[] = [];
    if (playgroundVariant !== 'primary') props.push(`variant="${playgroundVariant}"`);
    if (playgroundSize !== 'lg') props.push(`size="${playgroundSize}"`);
    if (playgroundLoading) props.push('loading');
    if (playgroundDisabled) props.push('disabled');
    if (playgroundIconPosition !== 'none') {
      props.push(`icon={<${playgroundSelectedIcon} size={18} />}`);
      if (playgroundIconPosition !== 'right') props.push(`iconPosition="${playgroundIconPosition}"`);
    }

    const propsString = props.length > 0 ? ` ${props.join(' ')}` : '';
    return `import { Button } from '@/app/components/Button';\nimport { ${playgroundSelectedIcon} } from 'lucide-react';\n\n<Button${propsString}>\n  ${playgroundText}\n</Button>`;
  };

  return (
    <div className="space-y-12">
      {/* ==================== HERO HEADER ==================== */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-[5px] p-8">
        <h1 className="text-3xl font-normal mb-3">Button Component</h1>
        <p className="text-lg text-black/70 mb-4">
          A versatile button component with 4 variants, 4 sizes, interactive states, and shimmer animation.
        </p>
        <div className="flex flex-wrap items-center gap-4 text-sm text-black/60">
          <span>🎨 4 variants</span>
          <span>📏 4 sizes</span>
          <span>✨ Shimmer animation (always active)</span>
          <span>♿ WCAG AA compliant</span>
        </div>
      </div>

      {/* ==================== QUICK START ==================== */}
      <section className="space-y-4">
        <h2 className="text-2xl font-normal">Quick Start</h2>
        <p className="text-sm text-black/70">
          Import the Button component and start using it immediately with sensible defaults.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ComponentPreview title="Basic Button">
            <div className="flex flex-wrap gap-4">
              <Button>Default Button</Button>
              <Button variant="brand">Brand Button</Button>
            </div>
          </ComponentPreview>

          <CodeBlock 
            title="Basic Usage"
            code={`import { Button } from '@/app/components/Button';\n\n<Button>Default Button</Button>\n<Button variant="brand">Brand Button</Button>`}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ComponentPreview title="With Icons">
            <div className="flex flex-wrap gap-4">
              <Button icon={<Download size={18} />}>
                Download
              </Button>
              <Button variant="brand" icon={<Star size={18} />}>
                Get Started
              </Button>
            </div>
          </ComponentPreview>

          <CodeBlock 
            title="With Icons"
            code={`import { Button } from '@/app/components/Button';\nimport { Download, Star } from 'lucide-react';\n\n<Button icon={<Download size={18} />}>\n  Download\n</Button>\n\n<Button variant="brand" icon={<Star size={18} />}>\n  Get Started\n</Button>`}
          />
        </div>
      </section>

      {/* ==================== BUTTON STATES & ANIMATIONS ==================== */}
      <ButtonControlsGuide />

      {/* ==================== VARIANTS ==================== */}
      <DocSection
        title="Variants"
        why="Different visual weights communicate action hierarchy and guide users toward primary actions"
        what="4 distinct button variants: Primary (black gradient), Brand (Ken Bold Red), Secondary (two-state: neutral at rest → brand-red on hover), Ghost (transparent)"
        when="Use Primary for main actions, Brand for CTAs, Secondary for supporting actions (neutral border/text transitions to brand-red on hover — v3.3 two-state design), Ghost for tertiary actions on dark backgrounds"
      >
        <ComponentPreview 
          title="Primary - Black with Dark Gradient" 
          description="High-emphasis actions. Maximum one per screen section."
        >
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" size="lg">
              Primary Action
            </Button>
            <Button variant="primary" size="lg" icon={<Download size={18} />}>
              Download Report
            </Button>
            <Button variant="primary" size="lg" icon={<Send size={18} />} iconPosition="left">
              Send Message
            </Button>
          </div>
        </ComponentPreview>

        <ComponentPreview 
          title="Brand - Ken Bold Red (#b01f24)" 
          description="Special CTAs and conversion moments. Use sparingly for maximum impact."
        >
          <div className="flex flex-wrap gap-4">
            <Button variant="brand" size="lg">
              Get Started Free
            </Button>
            <Button variant="brand" size="lg" icon={<Star size={18} />}>
              Premium Feature
            </Button>
            <Button variant="brand" size="lg" icon={<Send size={18} />}>
              Schedule Demo
            </Button>
          </div>
        </ComponentPreview>

        <ComponentPreview 
          title="Secondary - Light Background (v3.3 Two-State)" 
          description="Neutral at rest (black/12 border, black/70 text) → Brand-red on hover (brand-red border, text, shadow). 300ms ease-out transition."
        >
          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="secondary" size="lg">
              Learn More
            </Button>
            <Button variant="secondary" size="lg" icon={<Download size={18} />}>
              Export Data
            </Button>
            <Button variant="secondary" size="lg" icon={<Heart size={18} />} iconPosition="left">
              Save for Later
            </Button>
            <Button variant="secondary" size="lg" disabled>
              Disabled
            </Button>
          </div>
        </ComponentPreview>

        <ComponentPreview 
          title="Secondary - Dark Background" 
          description="Frosted glass base, white/30 border → solid white on hover. Subtle white shimmer sweep."
          bg="dark"
        >
          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="secondary" background="dark" size="lg">
              Learn More
            </Button>
            <Button variant="secondary" background="dark" size="lg" icon={<Download size={18} />}>
              Export Data
            </Button>
            <Button variant="secondary" background="dark" size="lg" icon={<Heart size={18} />} iconPosition="left">
              Save for Later
            </Button>
            <Button variant="secondary" background="dark" size="lg" disabled>
              Disabled
            </Button>
          </div>
        </ComponentPreview>

        <ComponentPreview 
          title="Ghost - Transparent" 
          description="Low-emphasis actions. For tertiary actions on dark backgrounds."
          bg="dark"
        >
          <div className="flex flex-wrap gap-4">
            <Button variant="ghost" background="dark" size="lg">
              Ghost Action
            </Button>
            <Button variant="ghost" background="dark" size="lg" icon={<Edit size={18} />}>
              Edit Content
            </Button>
            <Button variant="ghost" background="dark" size="lg" showArrow>
              Learn More
            </Button>
          </div>
        </ComponentPreview>

        <CodeBlock 
          title="Variants Code"
          code={`// Primary - Main actions\n<Button variant="primary">Primary Action</Button>\n\n// Brand - CTAs and conversions\n<Button variant="brand">Get Started Free</Button>\n\n// Secondary - Supporting actions\n<Button variant="secondary">Learn More</Button>\n\n// Ghost - Tertiary actions on dark backgrounds\n<Button variant="ghost" background="dark">Ghost Action</Button>`}
        />
      </DocSection>

      {/* ==================== SIZES ==================== */}
      <DocSection
        title="Sizes"
        why="Different contexts require different button sizes for proper visual hierarchy and touch targets"
        what="4 size variants: sm (36px), md (42px - DEFAULT), lg (48px - big heroes only), xl (56px - rare)"
        when="Use md (default) for 90% of buttons including report page heroes. Reserve lg for homepage/major landing heroes only."
        whenNot="Don't use lg as default. Don't use xl frequently (dilutes impact)."
      >
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-[5px]">
          <h4 className="font-semibold mb-2 text-blue-900">🎯 Sizing Strategy Update</h4>
          <p className="text-sm text-blue-800">
            <strong>md (42px)</strong> is now the BASE/DEFAULT size. Use for report pages (v0, v0.1, v0.2, etc.) and standard CTAs.
            <br />
            <strong>lg (48px)</strong> is reserved for BIG homepage heroes and major landing pages only.
          </p>
        </div>

        <ComponentPreview title="Size Comparison">
          <div className="space-y-6">
            <div>
              <p className="text-xs text-black/60 mb-3 font-semibold">Small (36px height, 14px font) - Compact UIs, TOC navigation, secondary actions</p>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary" size="sm">Small Button</Button>
                <Button variant="brand" size="sm">Small Button</Button>
                <Button variant="secondary" size="sm">Small Button</Button>
              </div>
              <p className="text-xs text-black/50 mt-2">
                Font: var(--button-font-sm) = 14px = var(--text-nav) - Perfect for TOC items, compact CTAs
              </p>
            </div>
            
            <div className="p-4 bg-green-50 border-2 border-green-300 rounded-[5px]">
              <p className="text-xs text-green-900 mb-3 font-bold uppercase">✅ Medium (42px) - DEFAULT - Report Pages & Standard CTAs</p>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary">Medium Button (Default)</Button>
                <Button variant="brand">Medium Button (Default)</Button>
                <Button variant="secondary">Medium Button (Default)</Button>
              </div>
              <p className="text-xs text-green-800 mt-3">
                Use this size for: Report page heroes, standard CTAs, forms, modals, card actions
              </p>
            </div>
            
            <div className="p-4 bg-yellow-50 border-2 border-yellow-300 rounded-[5px]">
              <p className="text-xs text-yellow-900 mb-3 font-bold uppercase">⚡ Large (48px) - BIG HEROES ONLY</p>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary" size="lg">Large Button</Button>
                <Button variant="brand" size="lg">Large Button</Button>
                <Button variant="secondary" size="lg">Large Button</Button>
              </div>
              <p className="text-xs text-yellow-800 mt-3">
                Use this size for: Homepage heroes, major landing pages, marketing campaigns
              </p>
            </div>
            
            <div>
              <p className="text-xs text-black/60 mb-3 font-semibold">Extra Large (56px) - Rare, maximum impact</p>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary" size="xl">Extra Large</Button>
                <Button variant="brand" size="xl">Extra Large</Button>
                <Button variant="secondary" size="xl">Extra Large</Button>
              </div>
            </div>
          </div>
        </ComponentPreview>

        <CodeBlock 
          title="Size Usage Examples"
          code={`// Report page hero - Use default md (no need to specify)
<Button variant="brand" showArrow>
  View Full Report
</Button>

// Homepage big hero - Explicitly use lg
<Button variant="brand" size="lg" showArrow>
  Transform Your Business
</Button>

// Compact UI - Use sm
<Button variant="ghost" size="sm" icon={<Edit />}>
  Edit
</Button>

// Maximum impact event page - Use xl sparingly
<Button variant="brand" size="xl" showArrow>
  Register Now
</Button>`}
        />
      </DocSection>

      {/* ==================== ARROW ANIMATION RULES ==================== */}
      <section className="border border-black/8 rounded-[5px] p-6">
        <h3 className="text-2xl font-normal mb-4">Arrow Animation Rules</h3>
        <p className="text-sm text-black/60 mb-6">
          <code className="font-mono text-xs bg-black/5 px-1 rounded">showArrow=&#123;true&#125;</code> adds an animated ArrowUpRight (45° diagonal). Use ONLY for urgency CTAs.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-green-50 border border-green-200 rounded-[5px] p-5">
            <h4 className="font-semibold text-green-900 text-sm mb-3">Use showArrow for:</h4>
            <ul className="text-sm text-green-800 space-y-2">
              <li>• "Unlock Full Report"</li>
              <li>• "Schedule Demo"</li>
              <li>• "Get Started"</li>
              <li>• "Register Now"</li>
              <li>• Redirecting to forms/pages with urgency</li>
            </ul>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-[5px] p-5">
            <h4 className="font-semibold text-red-900 text-sm mb-3">NEVER use showArrow for:</h4>
            <ul className="text-sm text-red-800 space-y-2">
              <li>• "Learn More"</li>
              <li>• "View Details"</li>
              <li>• "Cancel" / "Back"</li>
              <li>• "Close" / "Dismiss"</li>
              <li>• Exploratory or non-urgent actions</li>
            </ul>
          </div>
        </div>

        <div className="bg-black/[0.02] border border-black/8 rounded-[5px] p-4">
          <p className="text-xs text-black/60 mb-2">Icon Rules:</p>
          <ul className="text-xs text-black/70 space-y-1">
            <li>• Always <strong>ArrowUpRight</strong> (45° diagonal) — never ArrowRight or ChevronRight</li>
            <li>• Arrow color matches text color and transitions on hover</li>
            <li>• Animation: subtle bounce on hover, static at rest</li>
          </ul>
        </div>
      </section>

      {/* ==================== STATES ==================== */}
      <DocSection
        title="States"
        why="Clear visual feedback for different interaction states improves UX and prevents user confusion"
        what="Default, hover, active, loading, and disabled states with smooth transitions"
      >
        <ComponentPreview title="Interactive States">
          <div className="space-y-4">
            <div>
              <p className="text-xs text-black/60 mb-3">Default & Hover - Hover to see shimmer and gradient shift</p>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" size="lg">Hover Me</Button>
                <Button variant="brand" size="lg">Hover Me</Button>
                <Button variant="secondary" size="lg">Hover Me</Button>
              </div>
            </div>
          </div>
        </ComponentPreview>

        <ComponentPreview title="Loading State">
          <div className="space-y-4">
            <p className="text-xs text-black/60">Click buttons to trigger 2-second loading state</p>
            <div className="flex flex-wrap gap-4">
              <Button 
                variant="primary" 
                size="lg" 
                loading={loadingStates['primary']}
                onClick={() => handleLoadingDemo('primary')}
              >
                Submit Form
              </Button>
              <Button 
                variant="brand" 
                size="lg" 
                loading={loadingStates['brand']}
                onClick={() => handleLoadingDemo('brand')}
              >
                Process Payment
              </Button>
              <Button 
                variant="secondary" 
                size="lg" 
                loading={loadingStates['secondary']}
                onClick={() => handleLoadingDemo('secondary')}
              >
                Save Draft
              </Button>
            </div>
          </div>
        </ComponentPreview>

        <ComponentPreview title="Disabled State">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="lg" disabled>Disabled Primary</Button>
              <Button variant="brand" size="lg" disabled>Disabled Brand</Button>
              <Button variant="secondary" size="lg" disabled>Disabled Secondary</Button>
            </div>
          </div>
        </ComponentPreview>
      </DocSection>

      {/* ==================== SHIMMER ANIMATION ==================== */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-normal mb-4">Shimmer Animation</h2>
          <p className="text-sm text-black/70">
            Our signature shimmer effect is always active on every button - it's our core brand identity.
          </p>
        </div>

        <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-300 rounded-[5px] p-6">
          <h3 className="text-xl font-semibold text-red-900 mb-3">✨ Shimmer Effect (Core Brand Signature)</h3>
          <p className="text-sm text-red-900 mb-4">
            The shimmer effect is <strong>ALWAYS active</strong> on every button - it's our core brand identity. 
            Like Apple's animations or Stripe's polish, this signature shine sets us apart from competitors.
          </p>
          <div className="bg-white rounded-[5px] p-4 space-y-3">
            <div className="flex flex-wrap gap-4">
              <Button variant="brand" size="lg">Hover to See Shimmer</Button>
              <Button variant="primary" size="lg">Metallic Shimmer</Button>
              <Button variant="secondary" size="lg">Coral Shimmer</Button>
            </div>
            <p className="text-xs text-black/60">
              <strong>Specs:</strong> 700ms duration, gradient sweep left-to-right, GPU-accelerated, respects prefers-reduced-motion. 
              Primary uses metallic dark gradient, Brand uses red gradient, Secondary uses coral-50 warmth sweep, Ghost uses translucent overlay.
            </p>
          </div>
        </div>

        <CodeBlock 
          title="Shimmer Usage"
          code={`// ✨ Shimmer is ALWAYS active (no prop needed)\n<Button variant="brand">\n  Shimmer Automatic\n</Button>\n\n// Custom shimmer duration (optional)\n<Button variant="brand" shimmerDuration={1000}>\n  Slow Shimmer\n</Button>`}
        />
      </section>

      {/* ==================== ICONS ==================== */}
      <DocSection
        title="Icons"
        why="Icons improve scannability and clarify button actions"
        what="Support for left/right icon positioning and icon-only buttons"
      >
        <ComponentPreview title="Icon Positions">
          <div className="space-y-4">
            <div>
              <p className="text-xs text-black/60 mb-3">Icon Right (default)</p>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" size="lg" icon={<Download size={18} />}>
                  Download Report
                </Button>
                <Button variant="secondary" size="lg" icon={<Share2 size={18} />}>
                  Share Content
                </Button>
              </div>
            </div>
            <div>
              <p className="text-xs text-black/60 mb-3">Icon Left</p>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" size="lg" icon={<Send size={18} />} iconPosition="left">
                  Send Message
                </Button>
                <Button variant="secondary" size="lg" icon={<Bookmark size={18} />} iconPosition="left">
                  Save for Later
                </Button>
              </div>
            </div>
          </div>
        </ComponentPreview>

        <ComponentPreview title="Icon-Only Buttons">
          <div className="space-y-4">
            <p className="text-xs text-black/60">Square buttons with icons only. Requires ariaLabel for accessibility.</p>
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary" size="xl" iconOnly icon={<Download size={24} />} ariaLabel="Download file" />
              <Button variant="primary" size="lg" iconOnly icon={<Download size={20} />} ariaLabel="Download file" />
              <Button variant="secondary" size="md" iconOnly icon={<Edit size={18} />} ariaLabel="Edit item" />
              <Button variant="ghost" size="sm" iconOnly icon={<Trash2 size={16} />} ariaLabel="Delete item" />
            </div>
          </div>
        </ComponentPreview>
      </DocSection>

      {/* ==================== INTERACTIVE PLAYGROUND ==================== */}
      <section className="space-y-6">
        <h2 className="text-2xl font-normal">Interactive Playground</h2>
        <p className="text-sm text-black/70">
          Experiment with different button configurations and see the generated code.
        </p>

        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-[5px] p-8 border border-black/8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Preview */}
            <div>
              <h4 className="text-sm font-bold text-black mb-4">Preview</h4>
              <div className="bg-white rounded-[5px] p-8 border border-black/10 flex items-center justify-center min-h-[200px]">
                <Button
                  variant={playgroundVariant}
                  size={playgroundSize}
                  loading={playgroundLoading}
                  disabled={playgroundDisabled}
                  icon={playgroundIconPosition !== 'none' ? iconMap[playgroundSelectedIcon] : undefined}
                  iconPosition={playgroundIconPosition !== 'none' ? playgroundIconPosition as any : undefined}
                >
                  {playgroundText}
                </Button>
              </div>
            </div>

            {/* Controls */}
            <div>
              <h4 className="text-sm font-bold text-black mb-4">Controls</h4>
              <div className="space-y-4">
                {/* Variant */}
                <div>
                  <label className="text-xs font-bold text-black/70 mb-2 block">Variant</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['brand', 'primary', 'secondary', 'ghost'] as const).map((v) => (
                      <button
                        key={v}
                        onClick={() => setPlaygroundVariant(v)}
                        className={`px-3 py-2 text-xs rounded border transition-all ${
                          playgroundVariant === v
                            ? 'bg-black text-white border-black'
                            : 'bg-white text-black border-black/10 hover:border-black/30'
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size */}
                <div>
                  <label className="text-xs font-bold text-black/70 mb-2 block">Size</label>
                  <div className="grid grid-cols-4 gap-2">
                    {(['sm', 'md', 'lg', 'xl'] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => setPlaygroundSize(s)}
                        className={`px-3 py-2 text-xs rounded border transition-all uppercase ${
                          playgroundSize === s
                            ? 'bg-black text-white border-black'
                            : 'bg-white text-black border-black/10 hover:border-black/30'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Icon */}
                <div>
                  <label className="text-xs font-bold text-black/70 mb-2 block">Icon</label>
                  <div className="grid grid-cols-3 gap-2 mb-2">
                    {(['ArrowUpRight', 'Download', 'Heart'] as const).map((icon) => (
                      <button
                        key={icon}
                        onClick={() => setPlaygroundSelectedIcon(icon)}
                        className={`px-3 py-2 text-xs rounded border transition-all flex items-center justify-center gap-2 ${
                          playgroundSelectedIcon === icon
                            ? 'bg-black text-white border-black'
                            : 'bg-white text-black border-black/10 hover:border-black/30'
                        }`}
                      >
                        {iconMap[icon]}
                      </button>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {(['none', 'left', 'right'] as const).map((pos) => (
                      <button
                        key={pos}
                        onClick={() => setPlaygroundIconPosition(pos)}
                        className={`px-3 py-2 text-xs rounded border transition-all ${
                          playgroundIconPosition === pos
                            ? 'bg-black text-white border-black'
                            : 'bg-white text-black border-black/10 hover:border-black/30'
                        }`}
                      >
                        {pos}
                      </button>
                    ))}
                  </div>
                </div>

                {/* States */}
                <div>
                  <label className="text-xs font-bold text-black/70 mb-2 block">States</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={playgroundLoading}
                        onChange={(e) => setPlaygroundLoading(e.target.checked)}
                        className="w-4 h-4 border-2 border-black/25 rounded-[2.5px] checked:bg-black checked:border-black accent-black cursor-pointer transition-colors duration-150"
                      />
                      <span className="text-sm text-black">Loading</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={playgroundDisabled}
                        onChange={(e) => setPlaygroundDisabled(e.target.checked)}
                        className="w-4 h-4 border-2 border-black/25 rounded-[2.5px] checked:bg-black checked:border-black accent-black cursor-pointer transition-colors duration-150"
                      />
                      <span className="text-sm text-black">Disabled</span>
                    </label>
                  </div>
                </div>

                {/* Text */}
                <div>
                  <label className="text-xs font-bold text-black/70 mb-2 block">Button Text</label>
                  <input
                    type="text"
                    value={playgroundText}
                    onChange={(e) => setPlaygroundText(e.target.value)}
                    className="w-full px-3 py-2 border border-black/10 rounded-[5px] bg-white text-black/90 placeholder:text-black/30 hover:border-black/25 focus:border-black/90 focus:outline-none transition-colors duration-150"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Generated Code */}
          <div className="mt-8">
            <h4 className="text-sm font-bold text-black mb-4">Generated Code</h4>
            <CodeBlock code={generatePlaygroundCode()} />
          </div>
        </div>
      </section>

      {/* ==================== REAL-WORLD EXAMPLES ==================== */}
      <section className="space-y-6">
        <h2 className="text-2xl font-normal">Real-World Examples</h2>
        <p className="text-sm text-black/70">
          Common button patterns from production applications.
        </p>

        {/* Navbar CTA */}
        <ComponentPreview title="1. Navbar CTA" description="Primary conversion action in navigation bar">
          <div className="bg-white border-b border-black/8 p-4 flex items-center justify-between">
            <div className="text-sm font-semibold">Company Logo</div>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-black/70 hover:text-black">Features</a>
              <a href="#" className="text-sm text-black/70 hover:text-black">Pricing</a>
              <Button variant="brand" size="sm">
                Get Started
              </Button>
            </div>
          </div>
        </ComponentPreview>

        <CodeBlock 
          title="Navbar Pattern"
          code={`<Button \n  variant="brand"     // ✅ Red for high visibility\n  size="sm"           // ✅ Small to fit navbar height\n>\n  Get Started\n</Button>`}
        />

        {/* Hero Section */}
        <ComponentPreview title="2. Hero Section CTAs" description="Primary and secondary actions in hero">
          <div className="bg-gradient-to-r from-gray-900 to-black p-12 text-center rounded-[5px]">
            <h3 className="text-3xl text-white mb-3">Transform Your Business Today</h3>
            <p className="text-white/70 mb-8 max-w-md mx-auto">
              Join thousands of companies using our platform to scale faster
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="brand" size="lg">
                Get Started Free
              </Button>
              <Button variant="ghost" background="dark" size="lg" icon={<FileText size={18} />}>
                View Demo
              </Button>
            </div>
          </div>
        </ComponentPreview>

        <CodeBlock 
          title="Hero Pattern"
          code={`// Primary CTA - High conversion\n<Button \n  variant="brand" \n  size="lg"\n>\n  Get Started Free\n</Button>\n\n// Secondary action - Lower emphasis\n<Button \n  variant="ghost" \n  background="dark" \n  size="lg" \n  icon={<FileText size={18} />}\n>\n  View Demo\n</Button>`}
        />

        {/* Form Submit */}
        <ComponentPreview title="3. Form Actions" description="Submit and cancel buttons in forms">
          <div className="bg-white border border-black/8 rounded-[5px] p-6 max-w-md">
            <h4 className="font-semibold mb-4">Contact Information</h4>
            <div className="space-y-3 mb-6">
              <input 
                type="text" 
                placeholder="Name" 
                className="w-full px-3 py-2 border border-black/10 rounded-[5px] bg-white text-black/90 placeholder:text-black/30 hover:border-black/25 focus:border-black/90 focus:outline-none transition-colors duration-150"
              />
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full px-3 py-2 border border-black/10 rounded-[5px] bg-white text-black/90 placeholder:text-black/30 hover:border-black/25 focus:border-black/90 focus:outline-none transition-colors duration-150"
              />
            </div>
            <div className="flex gap-3">
              <Button variant="primary" size="md" fullWidth type="submit">
                Submit
              </Button>
              <Button variant="secondary" size="md">
                Cancel
              </Button>
            </div>
          </div>
        </ComponentPreview>

        <CodeBlock 
          title="Form Pattern"
          code={`// Primary action - Form submit\n<Button \n  variant="primary" \n  size="md" \n  fullWidth \n  type="submit"\n>\n  Submit\n</Button>\n\n// Secondary action - Cancel\n<Button variant="secondary" size="md">\n  Cancel\n</Button>`}
        />
      </section>

      {/* ==================== PROPS API ==================== */}
      <section className="space-y-4">
        <h2 className="text-2xl font-normal">Props API Reference</h2>
        <PropsTable props={[
          { property: 'variant', value: 'primary | secondary | ghost | brand', description: 'Visual style variant (default: primary)' },
          { property: 'size', value: 'sm | md | lg | xl', description: 'Button size (default: lg)' },
          { property: 'background', value: 'light | dark', description: 'Background context for ghost/secondary variants (default: light)' },
          { property: 'icon', value: 'ReactNode', description: 'Optional icon element from lucide-react' },
          { property: 'iconPosition', value: 'left | right', description: 'Icon placement (default: right)' },
          { property: 'iconOnly', value: 'boolean', description: 'Icon-only button mode (square shape, requires ariaLabel)' },
          { property: 'shimmerDuration', value: 'number', description: '✨ Shimmer speed in ms - always active (default: 700)' },
          { property: 'loading', value: 'boolean', description: 'Loading state with spinner (default: false)' },
          { property: 'disabled', value: 'boolean', description: 'Disabled state (default: false)' },
          { property: 'fullWidth', value: 'boolean', description: 'Full container width (default: false)' },
          { property: 'ripple', value: 'boolean', description: 'Material ripple effect on click (default: true)' },
          { property: 'onClick', value: '() => void', description: 'Click handler function' },
          { property: 'className', value: 'string', description: 'Additional CSS classes' },
          { property: 'type', value: 'button | submit | reset', description: 'HTML button type (default: button)' },
          { property: 'ariaLabel', value: 'string', description: 'Accessibility label (required for iconOnly)' },
        ]} />
      </section>

      {/* ==================== ACCESSIBILITY ==================== */}
      <section className="space-y-4">
        <h2 className="text-2xl font-normal">Accessibility (WCAG AA)</h2>
        <div className="bg-purple-50 border border-purple-200 rounded-[5px] p-6">
          <h4 className="font-semibold text-purple-900 mb-4">♿ Accessibility Features</h4>
          <ul className="space-y-3 text-sm text-purple-900">
            <li className="flex items-start gap-2">
              <span className="font-bold">✓</span>
              <span><strong>Keyboard Navigation:</strong> All buttons focusable with Tab, activatable with Enter/Space</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">✓</span>
              <span><strong>Focus Indicators:</strong> Visible focus ring (2px black outline + 2px offset)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">✓</span>
              <span><strong>Screen Readers:</strong> Semantic button elements with aria-label support</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">✓</span>
              <span><strong>Touch Targets:</strong> Minimum 40px × 40px (WCAG 2.5.5)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">✓</span>
              <span><strong>Color Contrast:</strong> All variants meet WCAG AA (4.5:1 minimum)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">✓</span>
              <span><strong>Reduced Motion:</strong> Respects prefers-reduced-motion preference</span>
            </li>
          </ul>
        </div>

        <CodeBlock 
          title="Accessibility Best Practices"
          code={`// ✅ GOOD: Icon-only with aria-label\n<Button \n  iconOnly \n  icon={<Download size={20} />}\n  ariaLabel="Download annual report PDF"\n/>\n\n// ✅ GOOD: Proper form button\n<Button type="submit" disabled={!formValid}>\n  Submit Form\n</Button>\n\n// ❌ BAD: Icon-only without aria-label\n<Button iconOnly icon={<Download size={20} />} />\n// Screen readers can't describe this!`}
        />
      </section>

      {/* ==================== PERFORMANCE ==================== */}
      <div className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-200 rounded-[5px] p-6">
        <h3 className="font-semibold text-green-900 mb-4">⚡ Performance & Optimization</h3>
        <div className="space-y-2 text-sm text-green-900">
          <div className="flex items-start gap-2">
            <span className="font-bold">✓</span>
            <span><strong>Hardware Acceleration:</strong> Transitions use transform + opacity (GPU-accelerated)</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold">✓</span>
            <span><strong>60fps Interactions:</strong> All hover and active states maintain 60fps</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold">✓</span>
            <span><strong>CSS-Only Effects:</strong> No JavaScript for visual transitions (better performance)</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold">✓</span>
            <span><strong>No Layout Shifts:</strong> Fixed icon dimensions prevent CLS</span>
          </div>
        </div>
      </div>
    </div>
  );
}