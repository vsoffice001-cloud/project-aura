import { Button } from '@/app/components/Button';
import { CTALink } from '@/app/components/CTALink';
import { InlineLink } from '@/app/components/InlineLink';

/**
 * Quick Test Page for Link System
 * 
 * Replace App.tsx content with this to test all three components side-by-side.
 */

export default function TestLinkSystem() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Button Examples */}
      <section className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-12 space-y-8">
        <h1 className="text-5xl font-bold mb-4">Button Component</h1>
        <p className="text-xl text-gray-400 mb-8">Hover to see shimmer effect (always active)</p>
        
        <div className="flex flex-wrap gap-6 justify-center">
          <Button variant="brand" showArrow>
            Brand + Arrow
          </Button>
          <Button variant="brand">
            Brand No Arrow
          </Button>
          <Button variant="primary" showArrow>
            Primary + Arrow
          </Button>
          <Button variant="secondary" background="dark">
            Secondary
          </Button>
          <Button variant="ghost" background="dark">
            Ghost
          </Button>
        </div>

        <div className="mt-12 p-6 bg-white/10 rounded-[5px] max-w-2xl">
          <p className="text-sm text-gray-300">
            ✨ <strong>Shimmer Effect:</strong> Always active on all buttons (right-to-left sweep on hover)
            <br />
            ➡️ <strong>Arrow Animation:</strong> Only use for urgency CTAs (forms, redirects)
          </p>
        </div>
      </section>

      {/* CTALink Section */}
      <section className="min-h-screen flex flex-col items-center justify-center bg-white text-black p-12 space-y-8">
        <h1 className="text-5xl font-bold mb-4">CTALink Component</h1>
        <p className="text-xl text-gray-600 mb-8">Unified hover zone - text OR arrow triggers both effects</p>
        
        <div className="flex flex-col gap-8 items-center">
          <div className="text-center space-y-4">
            <p className="text-sm text-gray-500 uppercase tracking-wider">Brand Variant</p>
            <CTALink href="#" variant="brand" size="lg">
              Get Started Today
            </CTALink>
            <p className="text-xs text-gray-400 mt-2 max-w-xs">
              Hover over text or arrow → both animate together
            </p>
          </div>

          <div className="text-center space-y-4">
            <p className="text-sm text-gray-500 uppercase tracking-wider">Default Variant</p>
            <CTALink href="#" variant="default" size="lg">
              Learn More About Our Process
            </CTALink>
            <p className="text-xs text-gray-400 mt-2 max-w-xs">
              Single hover state shared by text + arrow
            </p>
          </div>

          <div className="text-center space-y-4">
            <p className="text-sm text-gray-500 uppercase tracking-wider">Different Sizes</p>
            <div className="space-y-3">
              <CTALink href="#" variant="brand" size="sm">
                Small Size
              </CTALink>
              <CTALink href="#" variant="brand" size="md">
                Medium Size
              </CTALink>
              <CTALink href="#" variant="brand" size="lg">
                Large Size
              </CTALink>
            </div>
          </div>
        </div>

        <div className="mt-12 p-6 bg-gray-50 rounded-[5px] max-w-2xl">
          <p className="text-sm text-gray-600">
            🎯 <strong>Use for:</strong> High-urgency CTAs, form redirects, lightweight call-to-actions
            <br />
            ⚡ <strong>Behavior:</strong> Text gradient + arrow animation (unified hover zone)
          </p>
        </div>
      </section>

      {/* InlineLink Section */}
      <section className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-12 space-y-8">
        <h1 className="text-5xl font-bold mb-4">InlineLink Component</h1>
        <p className="text-xl text-gray-400 mb-8">Paragraph interlinking with red underline (no arrow)</p>
        
        <div className="max-w-3xl space-y-8">
          <div className="p-8 bg-white rounded-[5px]">
            <p className="text-lg text-black leading-relaxed">
              Our design system follows{' '}
              <InlineLink href="#">Atomic Design methodology</InlineLink>
              {' '}to ensure consistency across all components. This approach allows us to build{' '}
              <InlineLink href="#">reusable components</InlineLink>
              {' '}that maintain visual harmony while providing maximum flexibility.
            </p>
          </div>

          <div className="p-8 bg-white rounded-[5px]">
            <p className="text-lg text-black leading-relaxed">
              The typography scale uses a{' '}
              <InlineLink href="#">Major Third ratio (1.25)</InlineLink>
              {' '}to create a harmonious hierarchy. All color tokens are defined in{' '}
              <InlineLink href="#">our color palette</InlineLink>
              {' '}which includes Ken Bold Red (#b01f24) as the primary CTA color.
            </p>
          </div>

          <div className="p-8 bg-white rounded-[5px]">
            <p className="text-lg text-black leading-relaxed">
              Motion design is critical to our{' '}
              <InlineLink href="#">interaction principles</InlineLink>
              . We use shimmer effects for all buttons and arrow animations exclusively for{' '}
              <InlineLink href="#">urgency-based CTAs</InlineLink>
              {' '}to guide user attention appropriately.
            </p>
          </div>
        </div>

        <div className="mt-12 p-6 bg-white/10 rounded-[5px] max-w-2xl">
          <p className="text-sm text-gray-300">
            📝 <strong>Use for:</strong> Paragraph interlinking, cross-references, documentation
            <br />
            🎨 <strong>Visual:</strong> Red underline always visible + warm-100 background on hover
            <br />
            ❌ <strong>No arrow:</strong> Designed for natural reading flow
          </p>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-100 p-12">
        <h1 className="text-5xl font-bold text-black mb-12">Decision Matrix</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
          {/* Button Card */}
          <div className="p-8 bg-white border-2 border-black rounded-[5px] space-y-4 hover:shadow-2xl transition-shadow">
            <div className="text-6xl mb-4">🔘</div>
            <h3 className="text-2xl font-bold text-black">Button</h3>
            <p className="text-gray-600">Primary actions, forms, modals</p>
            
            <div className="pt-4 space-y-2">
              <p className="text-sm text-gray-700">✅ Shimmer (always)</p>
              <p className="text-sm text-gray-700">✅ Arrow (optional)</p>
              <p className="text-sm text-gray-700">✅ Ripple effect</p>
              <p className="text-sm text-gray-700">✅ Loading states</p>
            </div>

            <div className="pt-4">
              <Button variant="brand" showArrow fullWidth>
                Example
              </Button>
            </div>
          </div>

          {/* CTALink Card */}
          <div className="p-8 bg-white border-2 border-[#b01f24] rounded-[5px] space-y-4 hover:shadow-2xl transition-shadow">
            <div className="text-6xl mb-4">🔗</div>
            <h3 className="text-2xl font-bold text-black">CTALink</h3>
            <p className="text-gray-600">Urgency CTAs, redirects</p>
            
            <div className="pt-4 space-y-2">
              <p className="text-sm text-gray-700">✅ Text gradient</p>
              <p className="text-sm text-gray-700">✅ Arrow (always)</p>
              <p className="text-sm text-gray-700">✅ Unified hover</p>
              <p className="text-sm text-gray-700">✅ Lightweight</p>
            </div>

            <div className="pt-4 flex justify-center">
              <CTALink href="#" variant="brand" size="lg">
                Example
              </CTALink>
            </div>
          </div>

          {/* InlineLink Card */}
          <div className="p-8 bg-white border-2 border-gray-300 rounded-[5px] space-y-4 hover:shadow-2xl transition-shadow">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-bold text-black">InlineLink</h3>
            <p className="text-gray-600">Paragraph interlinking</p>
            
            <div className="pt-4 space-y-2">
              <p className="text-sm text-gray-700">✅ Red underline</p>
              <p className="text-sm text-gray-700">✅ Warm background</p>
              <p className="text-sm text-gray-700">❌ No arrow</p>
              <p className="text-sm text-gray-700">✅ Reading flow</p>
            </div>

            <div className="pt-4">
              <p className="text-sm text-black">
                See <InlineLink href="#">example here</InlineLink> in context
              </p>
            </div>
          </div>
        </div>

        {/* Usage Guide */}
        <div className="mt-16 max-w-4xl">
          <div className="bg-black text-white p-8 rounded-[5px] space-y-4">
            <h3 className="text-2xl font-bold mb-4">Quick Usage Guide</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-[#b01f24] mb-2">❌ Don't Use Arrow For:</h4>
                <ul className="text-sm space-y-1 text-gray-300">
                  <li>• Paragraph interlinking</li>
                  <li>• Documentation links</li>
                  <li>• Cancel/back buttons</li>
                  <li>• Low-priority actions</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-[#b01f24] mb-2">✅ Use Arrow For:</h4>
                <ul className="text-sm space-y-1 text-gray-300">
                  <li>• Form submissions</li>
                  <li>• Page redirects with urgency</li>
                  <li>• Time-sensitive actions</li>
                  <li>• High-priority CTAs</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/20">
              <p className="text-sm text-gray-400">
                <strong>Design System Principle:</strong> Shimmer is our signature interaction (always active on buttons).
                Arrow animation is reserved for urgency signaling only.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}