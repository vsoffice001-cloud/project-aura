import { useState } from 'react';
import { ExternalLink, FileText } from 'lucide-react';
import { CTALink } from '@/app/components/CTALink';
import { InlineLink } from '@/app/components/InlineLink';
import { Button } from '@/app/components/Button';

/**
 * LINKS & CTAs COMPONENT DOCUMENTATION
 * ====================================
 * Complete reference for CTALink and InlineLink components
 * Part of VS Design System's interaction patterns
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
  bg?: 'white' | 'dark' | 'warm';
}) {
  const bgClasses = {
    white: 'bg-white',
    dark: 'bg-black',
    warm: 'bg-[var(--warm-100)]'
  };

  return (
    <div className="border border-black/8 rounded-[5px] overflow-hidden">
      <div className="bg-black/[0.02] px-6 py-4 border-b border-black/8">
        <h4 className="font-semibold text-sm">{title}</h4>
        {description && <p className="text-xs text-black/60 mt-1">{description}</p>}
      </div>
      <div className={`p-8 ${bgClasses[bg]}`}>
        {children}
      </div>
    </div>
  );
}

function CodeBlock({ code, title }: { code: string; title?: string }) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-2">
      {title && <p className="text-sm font-semibold text-black/70">{title}</p>}
      <div className="relative bg-black/5 rounded-[5px] p-4 border border-black/8">
        <button
          onClick={copyCode}
          className="absolute top-3 right-3 px-3 py-1.5 text-xs rounded bg-white hover:bg-black/5 transition-colors border border-black/10"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
        <pre className="text-xs font-mono text-black/80 overflow-x-auto pr-24">
          {code}
        </pre>
      </div>
    </div>
  );
}

// ==================== MAIN COMPONENT ====================

export function LinksDocumentation() {
  return (
    <div className="space-y-16 pb-24">
      {/* Header */}
      <div className="space-y-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal">Links & CTAs</h2>
        <p className="text-lg text-black/70 max-w-3xl">
          Three specialized components for different linking scenarios: Button for primary actions,
          CTALink for unified hover urgency CTAs, and InlineLink for paragraph interlinking.
        </p>
      </div>

      {/* Overview Section */}
      <DocSection
        title="Overview"
        why="Different interaction patterns require different link treatments. Buttons signal primary actions, CTALinks indicate urgency, and InlineLinks provide seamless content navigation."
        what="A comprehensive link system with three components optimized for specific use cases"
        when="Use the decision matrix below to choose the appropriate component for your use case"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 border-2 border-black rounded-[5px] space-y-3">
            <div className="text-4xl">🔘</div>
            <h4 className="text-lg font-semibold">Button</h4>
            <p className="text-sm text-black/60">Primary actions, forms, modals</p>
            <ul className="text-xs text-black/60 space-y-1">
              <li>• Shimmer always active</li>
              <li>• Arrow for urgency only</li>
              <li>• Full accessibility</li>
            </ul>
          </div>

          <div className="p-6 border-2 border-[#b01f24] rounded-[5px] space-y-3">
            <div className="text-4xl">🔗</div>
            <h4 className="text-lg font-semibold">CTALink</h4>
            <p className="text-sm text-black/60">Urgency CTAs, redirects</p>
            <ul className="text-xs text-black/60 space-y-1">
              <li>• Unified hover zone</li>
              <li>• Text gradient + arrow</li>
              <li>• Lightweight treatment</li>
            </ul>
          </div>

          <div className="p-6 border-2 border-black/20 rounded-[5px] space-y-3">
            <div className="text-4xl">📝</div>
            <h4 className="text-lg font-semibold">InlineLink</h4>
            <p className="text-sm text-black/60">Paragraph interlinking</p>
            <ul className="text-xs text-black/60 space-y-1">
              <li>• Red underline always visible</li>
              <li>• Warm-100 background hover</li>
              <li>• No arrow animation</li>
            </ul>
          </div>
        </div>
      </DocSection>

      {/* Decision Flowchart — from COMPONENTS.md */}
      <section className="border border-black/8 rounded-[5px] p-6">
        <h3 className="text-2xl font-normal mb-4">Decision Flowchart</h3>
        <p className="text-sm text-black/60 mb-6">Use this to pick the right component every time.</p>
        <div className="space-y-3">
          {[
            { question: 'Is it a primary action (form submit, main CTA)?', yes: 'Button', yesColor: 'bg-black text-white', no: null },
            { question: 'Is it text + arrow CTA ("Learn More →")?', yes: 'CTALink', yesColor: 'bg-[var(--brand-red)] text-white', no: null },
            { question: 'Is it within paragraph text?', yes: 'InlineLink', yesColor: 'bg-black/10 text-black', no: 'CTALink or Button' },
          ].map((step, idx) => (
            <div key={idx} className="flex items-start gap-4 p-4 bg-black/[0.02] rounded-[5px] border border-black/8">
              <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 font-mono text-sm">
                {idx + 1}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium mb-2">{step.question}</p>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-black/50">YES →</span>
                  <span className={`text-xs px-3 py-1 rounded font-semibold ${step.yesColor}`}>{step.yes}</span>
                  {step.no && (
                    <>
                      <span className="text-xs text-black/30">|</span>
                      <span className="text-xs text-black/50">NO →</span>
                      <span className="text-xs px-3 py-1 rounded bg-black/5 text-black/70">{step.no}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* DO / DON'T */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div className="bg-green-50 border border-green-200 rounded-[5px] p-4">
            <h4 className="font-semibold text-green-900 text-sm mb-2">DO</h4>
            <ul className="text-xs text-green-800 space-y-1">
              <li>• Button for primary conversions and form submits</li>
              <li>• CTALink for exploratory "Learn More" / "See How" links</li>
              <li>• InlineLink within paragraph text only</li>
            </ul>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-[5px] p-4">
            <h4 className="font-semibold text-red-900 text-sm mb-2">DON'T</h4>
            <ul className="text-xs text-red-800 space-y-1">
              <li>• Don't use Button for exploratory links (use CTALink)</li>
              <li>• Don't use CTALink for primary conversions (use Button)</li>
              <li>• Don't use InlineLink standalone (use CTALink)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTALink Component */}
      <DocSection
        title="CTALink Component"
        why="High-urgency CTAs need lighter visual weight than full buttons but stronger signaling than inline links"
        what="A unified hover zone combining text gradient and arrow animation for urgency signaling"
        when="Use for forms, page redirects, high-priority actions, and lightweight CTAs"
        whenNot="Don't use within paragraphs or for low-priority navigation"
      >
        <div className="space-y-8">
          {/* Brand Variant */}
          <div className="space-y-4">
            <h4 className="text-xl font-normal">Brand Variant</h4>
            <ComponentPreview 
              title="Ken Bold Red (#b01f24)" 
              description="Use for highest priority CTAs and time-sensitive actions"
            >
              <div className="flex flex-col gap-6">
                <div className="space-y-2">
                  <p className="text-xs text-black/50 uppercase tracking-wider">Large</p>
                  <CTALink href="#" variant="brand" size="lg">
                    Get Started Today
                  </CTALink>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-black/50 uppercase tracking-wider">Medium (Default)</p>
                  <CTALink href="#" variant="brand" size="md">
                    View Pricing Plans
                  </CTALink>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-black/50 uppercase tracking-wider">Small</p>
                  <CTALink href="#" variant="brand" size="sm">
                    Request Demo
                  </CTALink>
                </div>
              </div>
            </ComponentPreview>

            <CodeBlock 
              title="Usage"
              code={`import { CTALink } from '@/app/components';

<CTALink href="/contact" variant="brand" size="lg">
  Get Started Today
</CTALink>`} 
            />
          </div>

          {/* Default Variant */}
          <div className="space-y-4">
            <h4 className="text-xl font-normal">Default Variant</h4>
            <ComponentPreview 
              title="Black (#141016)" 
              description="Use for standard priority CTAs and secondary actions"
            >
              <div className="flex flex-col gap-6">
                <CTALink href="#" variant="default" size="lg">
                  Learn More About Our Process
                </CTALink>
                <CTALink href="#" variant="default" size="md">
                  Download Resources
                </CTALink>
                <CTALink href="#" variant="default" size="sm">
                  View Documentation
                </CTALink>
              </div>
            </ComponentPreview>

            <CodeBlock 
              code={`<CTALink href="/learn-more" variant="default" size="md">
  Learn More
</CTALink>`} 
            />
          </div>

          {/* Unified Hover Behavior */}
          <div className="space-y-4">
            <h4 className="text-xl font-normal">Unified Hover Behavior</h4>
            <ComponentPreview 
              title="Single hover zone" 
              description="Hovering text OR arrow triggers both effects simultaneously"
              bg="warm"
            >
              <div className="space-y-6">
                <div className="p-6 bg-white rounded-[5px] border-2 border-black/10">
                  <p className="text-sm text-black/60 mb-4">
                    Try hovering over just the text or just the arrow - both effects trigger together:
                  </p>
                  <CTALink href="#" variant="brand" size="lg">
                    Hover Over Me
                  </CTALink>
                  <div className="mt-4 text-xs text-black/50 space-y-1">
                    <p>✨ Text: Solid → Gradient transition</p>
                    <p>➡️ Arrow: Static → Animated movement</p>
                  </div>
                </div>
              </div>
            </ComponentPreview>

            <CodeBlock 
              title="How it works"
              code={`// Single hover state shared by text and arrow
const { isHovering } = useShimmer(300);

<a onMouseEnter={...} onMouseLeave={...}>
  <span className={isHovering ? 'gradient' : 'solid'}>
    Text
  </span>
  <AnimatedArrow isHovered={isHovering} />
</a>`} 
            />
          </div>

          {/* Props API */}
          <div className="space-y-4">
            <h4 className="text-xl font-normal">Props API</h4>
            <div className="overflow-x-auto border border-black/8 rounded-[5px]">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-black/20 bg-black/[0.02]">
                    <th className="text-left p-4 text-sm font-semibold">Prop</th>
                    <th className="text-left p-4 text-sm font-semibold">Type</th>
                    <th className="text-left p-4 text-sm font-semibold">Default</th>
                    <th className="text-left p-4 text-sm font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-black/8">
                    <td className="p-4 font-mono text-xs">href</td>
                    <td className="p-4 text-sm">string</td>
                    <td className="p-4 text-sm">-</td>
                    <td className="p-4 text-sm">Destination URL</td>
                  </tr>
                  <tr className="border-b border-black/8 bg-black/[0.01]">
                    <td className="p-4 font-mono text-xs">variant</td>
                    <td className="p-4 text-sm">'default' | 'brand'</td>
                    <td className="p-4 text-sm">'default'</td>
                    <td className="p-4 text-sm">Visual style (black or red)</td>
                  </tr>
                  <tr className="border-b border-black/8">
                    <td className="p-4 font-mono text-xs">size</td>
                    <td className="p-4 text-sm">'sm' | 'md' | 'lg'</td>
                    <td className="p-4 text-sm">'md'</td>
                    <td className="p-4 text-sm">Text size (14px | 16px | 18px)</td>
                  </tr>
                  <tr className="border-b border-black/8 bg-black/[0.01]">
                    <td className="p-4 font-mono text-xs">showArrow</td>
                    <td className="p-4 text-sm">boolean</td>
                    <td className="p-4 text-sm">true</td>
                    <td className="p-4 text-sm">Show animated arrow</td>
                  </tr>
                  <tr className="border-b border-black/8">
                    <td className="p-4 font-mono text-xs">arrowSize</td>
                    <td className="p-4 text-sm">number</td>
                    <td className="p-4 text-sm">20</td>
                    <td className="p-4 text-sm">Arrow icon size in pixels</td>
                  </tr>
                  <tr className="bg-black/[0.01]">
                    <td className="p-4 font-mono text-xs">className</td>
                    <td className="p-4 text-sm">string</td>
                    <td className="p-4 text-sm">''</td>
                    <td className="p-4 text-sm">Additional CSS classes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </DocSection>

      {/* InlineLink Component */}
      <DocSection
        title="InlineLink Component"
        why="Paragraph links need subtle treatment that doesn't disrupt reading flow"
        what="A subtle inline link with brand red underline and warm background hover effect"
        when="Use within paragraphs for cross-references, documentation links, and content navigation"
        whenNot="Don't use for high-urgency CTAs or primary actions"
      >
        <div className="space-y-8">
          {/* Basic Examples */}
          <div className="space-y-4">
            <h4 className="text-xl font-normal">In Context</h4>
            <ComponentPreview 
              title="Paragraph interlinking" 
              description="Seamlessly integrates with body text for natural reading flow"
            >
              <div className="space-y-6 max-w-2xl">
                <p className="text-base text-black leading-relaxed">
                  Our design system follows{' '}
                  <InlineLink href="#">Atomic Design methodology</InlineLink>
                  {' '}to ensure consistency across all components. This approach allows us to build{' '}
                  <InlineLink href="#">reusable components</InlineLink>
                  {' '}that maintain visual harmony while providing maximum flexibility.
                </p>

                <p className="text-base text-black leading-relaxed">
                  The typography scale uses a{' '}
                  <InlineLink href="#">Major Third ratio (1.25)</InlineLink>
                  {' '}to create a harmonious hierarchy. All color tokens are defined in{' '}
                  <InlineLink href="#">our color palette</InlineLink>
                  {' '}which includes Ken Bold Red (#b01f24) as the primary CTA color.
                </p>
              </div>
            </ComponentPreview>

            <CodeBlock 
              title="Usage"
              code={`import { InlineLink } from '@/app/components';

<p>
  Learn more about our{' '}
  <InlineLink href="/methodology">design methodology</InlineLink>
  {' '}and how we approach problems.
</p>`} 
            />
          </div>

          {/* Visual States */}
          <div className="space-y-4">
            <h4 className="text-xl font-normal">Visual States</h4>
            <ComponentPreview 
              title="Hover behavior" 
              description="Red underline always visible, warm-100 background appears on hover"
            >
              <div className="space-y-6 p-6 bg-white border-2 border-black/10 rounded-[5px]">
                <div>
                  <p className="text-xs text-black/50 uppercase tracking-wider mb-3">Default State</p>
                  <p className="text-base text-black">
                    Black text (#000000) + Red underline (#b01f24)
                  </p>
                </div>

                <div>
                  <p className="text-xs text-black/50 uppercase tracking-wider mb-3">Hover State</p>
                  <p className="text-base text-black">
                    Red text (#b01f24) + Red underline (#b01f24) + Warm-100 background (#fcfbfa)
                  </p>
                </div>

                <div className="pt-4 border-t border-black/10">
                  <p className="text-xs text-black/50 mb-3">Try it:</p>
                  <p className="text-base text-black">
                    Hover over <InlineLink href="#">this example link</InlineLink> to see the effect
                  </p>
                </div>
              </div>
            </ComponentPreview>

            <CodeBlock 
              title="Visual breakdown"
              code={`// Default
text-black  /* #000000 */
border-bottom: 1px solid #b01f24

// Hover
text-[#b01f24]  /* Ken Bold Red */
background: var(--warm-100)  /* #fcfbfa */
border-bottom: 1px solid #b01f24`} 
            />
          </div>

          {/* Props API */}
          <div className="space-y-4">
            <h4 className="text-xl font-normal">Props API</h4>
            <div className="overflow-x-auto border border-black/8 rounded-[5px]">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-black/20 bg-black/[0.02]">
                    <th className="text-left p-4 text-sm font-semibold">Prop</th>
                    <th className="text-left p-4 text-sm font-semibold">Type</th>
                    <th className="text-left p-4 text-sm font-semibold">Default</th>
                    <th className="text-left p-4 text-sm font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-black/8">
                    <td className="p-4 font-mono text-xs">href</td>
                    <td className="p-4 text-sm">string</td>
                    <td className="p-4 text-sm">-</td>
                    <td className="p-4 text-sm">Destination URL</td>
                  </tr>
                  <tr className="border-b border-black/8 bg-black/[0.01]">
                    <td className="p-4 font-mono text-xs">children</td>
                    <td className="p-4 text-sm">ReactNode</td>
                    <td className="p-4 text-sm">-</td>
                    <td className="p-4 text-sm">Link text content</td>
                  </tr>
                  <tr className="border-b border-black/8">
                    <td className="p-4 font-mono text-xs">className</td>
                    <td className="p-4 text-sm">string</td>
                    <td className="p-4 text-sm">''</td>
                    <td className="p-4 text-sm">Additional CSS classes</td>
                  </tr>
                  <tr className="bg-black/[0.01]">
                    <td className="p-4 font-mono text-xs">onClick</td>
                    <td className="p-4 text-sm">function</td>
                    <td className="p-4 text-sm">-</td>
                    <td className="p-4 text-sm">Click handler</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </DocSection>

      {/* Decision Matrix */}
      <DocSection
        title="Decision Matrix"
        why="Choosing the right component ensures appropriate urgency signaling and user experience"
        what="A comprehensive guide to selecting between Button, CTALink, and InlineLink"
      >
        <div className="space-y-6">
          <div className="overflow-x-auto border-2 border-black/10 rounded-[5px]">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-black/20 bg-black/[0.02]">
                  <th className="text-left p-4 text-sm font-semibold">Use Case</th>
                  <th className="text-left p-4 text-sm font-semibold">Component</th>
                  <th className="text-left p-4 text-sm font-semibold">Reasoning</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-black/8">
                  <td className="p-4 text-sm">Form submission</td>
                  <td className="p-4 font-mono text-xs">Button variant="brand" showArrow</td>
                  <td className="p-4 text-sm">Critical action needs full button treatment</td>
                </tr>
                <tr className="border-b border-black/8 bg-black/[0.01]">
                  <td className="p-4 text-sm">"Get Started" hero CTA</td>
                  <td className="p-4 font-mono text-xs">CTALink variant="brand"</td>
                  <td className="p-4 text-sm">High urgency but lighter visual weight</td>
                </tr>
                <tr className="border-b border-black/8">
                  <td className="p-4 text-sm">Download action</td>
                  <td className="p-4 font-mono text-xs">Button variant="secondary" icon</td>
                  <td className="p-4 text-sm">Standard action with icon clarity</td>
                </tr>
                <tr className="border-b border-black/8 bg-black/[0.01]">
                  <td className="p-4 text-sm">"Learn More" section link</td>
                  <td className="p-4 font-mono text-xs">CTALink variant="default"</td>
                  <td className="p-4 text-sm">Medium urgency with arrow signaling</td>
                </tr>
                <tr className="border-b border-black/8">
                  <td className="p-4 text-sm">Paragraph cross-reference</td>
                  <td className="p-4 font-mono text-xs">InlineLink</td>
                  <td className="p-4 text-sm">Natural reading flow, no urgency</td>
                </tr>
                <tr className="border-b border-black/8 bg-black/[0.01]">
                  <td className="p-4 text-sm">Documentation navigation</td>
                  <td className="p-4 font-mono text-xs">InlineLink</td>
                  <td className="p-4 text-sm">Subtle, non-disruptive interlinking</td>
                </tr>
                <tr className="bg-black/[0.01]">
                  <td className="p-4 text-sm">Cancel/Back button</td>
                  <td className="p-4 font-mono text-xs">Button variant="ghost"</td>
                  <td className="p-4 text-sm">Low priority, reversible action</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Visual Urgency Hierarchy */}
          <div className="p-6 bg-[var(--warm-100)] rounded-[5px] border border-black/8">
            <h4 className="font-semibold mb-4">Urgency Hierarchy (Highest → Lowest)</h4>
            <ol className="space-y-2 text-sm text-black/70">
              <li><strong>1.</strong> Button Brand + Arrow — Critical CTAs (forms, purchases)</li>
              <li><strong>2.</strong> CTALink Brand — Important redirects with urgency</li>
              <li><strong>3.</strong> Button Primary — Standard primary actions</li>
              <li><strong>4.</strong> CTALink Default — Standard CTAs with signaling</li>
              <li><strong>5.</strong> Button Secondary — Secondary actions</li>
              <li><strong>6.</strong> InlineLink — Content navigation (no urgency)</li>
              <li><strong>7.</strong> Button Ghost — Low-priority actions</li>
            </ol>
          </div>
        </div>
      </DocSection>

      {/* Best Practices */}
      <DocSection
        title="Best Practices"
        how="Follow these guidelines to ensure consistent and effective link usage"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Do's */}
          <div className="p-6 border-2 border-green-500/20 bg-green-50/30 rounded-[5px]">
            <h4 className="font-semibold mb-4 text-green-900">✅ Do</h4>
            <ul className="space-y-3 text-sm text-black/70">
              <li>• Use CTALink for unified hover zones (text + arrow together)</li>
              <li>• Use InlineLink within paragraph text for cross-references</li>
              <li>• Keep arrow animation exclusive to urgency CTAs</li>
              <li>• Maintain red underline visibility on InlineLinks</li>
              <li>• Use warm-100 background for subtle hover feedback</li>
              <li>• Test hover behavior across all link types</li>
            </ul>
          </div>

          {/* Don'ts */}
          <div className="p-6 border-2 border-red-500/20 bg-red-50/30 rounded-[5px]">
            <h4 className="font-semibold mb-4 text-red-900">❌ Don't</h4>
            <ul className="space-y-3 text-sm text-black/70">
              <li>• Don't add arrows to InlineLinks (disrupts reading flow)</li>
              <li>• Don't use CTALink within paragraphs (too prominent)</li>
              <li>• Don't remove red underline from InlineLinks</li>
              <li>• Don't create separate hover zones for text and arrow</li>
              <li>• Don't overuse brand variant CTALinks (dilutes urgency)</li>
              <li>• Don't mix link types inappropriately</li>
            </ul>
          </div>
        </div>
      </DocSection>

      {/* Accessibility */}
      <DocSection
        title="Accessibility"
        why="All users must be able to navigate and interact with links effectively"
      >
        <div className="space-y-4">
          <div className="p-6 bg-black/[0.02] border border-black/8 rounded-[5px]">
            <h4 className="font-semibold mb-4">Built-in Features</h4>
            <ul className="space-y-2 text-sm text-black/70">
              <li>✅ Semantic HTML (<code>&lt;a&gt;</code> tags)</li>
              <li>✅ Keyboard navigation support (Tab, Enter)</li>
              <li>✅ Focus states with visible indicators</li>
              <li>✅ Color contrast ratios meet WCAG AA standards</li>
              <li>✅ Motion respects <code>prefers-reduced-motion</code></li>
              <li>✅ Clear hover and focus feedback</li>
            </ul>
          </div>

          <ComponentPreview title="Focus states" description="All links have visible focus indicators">
            <div className="space-y-4">
              <div>
                <p className="text-xs text-black/50 mb-2">CTALink focus</p>
                <CTALink href="#" variant="brand">
                  Press Tab to focus
                </CTALink>
              </div>
              <div>
                <p className="text-xs text-black/50 mb-2">InlineLink focus</p>
                <p className="text-base text-black">
                  Try tabbing to <InlineLink href="#">this inline link</InlineLink> to see focus state
                </p>
              </div>
            </div>
          </ComponentPreview>
        </div>
      </DocSection>
    </div>
  );
}