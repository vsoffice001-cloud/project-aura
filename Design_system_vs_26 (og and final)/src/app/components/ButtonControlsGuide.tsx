/**
 * BUTTON CONTROLS & USE CASES GUIDE
 * ==================================
 * Comprehensive guide for button controls and real-world use cases
 * Shimmer (always active) + Simple Arrow (optional showArrow prop)
 */

import { useState } from 'react';
import { Download, Heart, Star, Send, ExternalLink, LogIn, CreditCard, ShoppingCart } from 'lucide-react';
import { Button } from '@/app/components/Button';
import { AnimatedArrow } from '@/app/components/AnimatedArrow';

interface ComponentPreviewProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  bg?: 'white' | 'dark';
}

function ComponentPreview({ title, description, children, bg = 'white' }: ComponentPreviewProps) {
  return (
    <div className="border border-black/8 rounded-[5px] overflow-hidden">
      <div className="p-4 bg-black/[0.02] border-b border-black/8">
        <h4 className="font-semibold text-sm">{title}</h4>
        {description && <p className="text-xs text-black/60 mt-1">{description}</p>}
      </div>
      <div className={`p-6 ${bg === 'dark' ? 'bg-black' : 'bg-white'}`}>
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
    <div className="border border-black/8 rounded-[5px] overflow-hidden">
      {title && (
        <div className="bg-black/[0.02] px-4 py-2 border-b border-black/8 flex items-center justify-between">
          <span className="text-sm font-semibold">{title}</span>
          <button
            onClick={copyCode}
            className="text-xs px-3 py-1 hover:bg-black/5 rounded-[5px] transition-colors"
          >
            {copied ? '✓ Copied!' : 'Copy'}
          </button>
        </div>
      )}
      <pre className="p-4 overflow-x-auto bg-black/[0.02]">
        <code className="text-xs font-mono text-black/80">{code}</code>
      </pre>
    </div>
  );
}

export function ButtonControlsGuide() {
  return (
    <div className="space-y-12">
      {/* ==================== HEADER ==================== */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300 rounded-[10px] p-8">
        <h2 className="text-3xl font-normal mb-4">Button Controls & Use Cases</h2>
        <p className="text-lg text-purple-900 mb-6">
          Complete guide to button animations: <strong>Shimmer</strong> (always active) + <strong>Simple Arrow</strong> (optional).
          Both effects trigger simultaneously on hover for maximum impact.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-[5px] p-4">
            <h4 className="font-semibold text-purple-900 mb-2">✨ Shimmer Effect</h4>
            <p className="text-sm text-purple-900">Always active on all buttons<br />Core brand identity</p>
          </div>
          <div className="bg-white rounded-[5px] p-4">
            <h4 className="font-semibold text-purple-900 mb-2">➡️ Simple Arrow</h4>
            <p className="text-sm text-purple-900">Optional via <code className="bg-purple-200 px-1 rounded-[5px]">showArrow</code> prop<br />2-arrow replacement animation</p>
          </div>
        </div>
      </div>

      {/* ==================== SHIMMER EFFECT ==================== */}
      <section className="space-y-6">
        <div>
          <h3 className="text-2xl font-normal mb-3">✨ Shimmer Effect (Always Active)</h3>
          <div className="space-y-3">
            <div className="mb-3">
              <span className="text-sm font-semibold text-black/50 uppercase tracking-wide">WHY</span>
              <p className="text-sm text-black/70 mt-1">
                Like Apple's animations or Stripe's polish, the shimmer effect is our signature brand identity. 
                Creates premium, tactile feedback and sets us apart from competitors.
              </p>
            </div>
            <div className="mb-3">
              <span className="text-sm font-semibold text-black/50 uppercase tracking-wide">WHAT</span>
              <p className="text-sm text-black/70 mt-1">
                GPU-accelerated gradient sweep animation (700ms default). Activates on hover. 
                <strong> ALWAYS active - cannot be disabled.</strong> Optional: customize speed with shimmerDuration prop.
              </p>
            </div>
          </div>
        </div>

        <ComponentPreview title="Shimmer on All Variants" description="Hover to see signature shimmer effect">
          <div className="space-y-6">
            <div>
              <p className="text-xs text-black/60 mb-3 font-semibold">Primary Shimmer (Dark → Grey Gradient)</p>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" size="lg">Hover to Shimmer</Button>
                <Button variant="primary" size="lg" icon={<Download size={18} />}>Download Report</Button>
              </div>
            </div>
            
            <div>
              <p className="text-xs text-black/60 mb-3 font-semibold">Brand Shimmer (Red Gradient)</p>
              <div className="flex flex-wrap gap-4">
                <Button variant="brand" size="lg">Hover to Shimmer</Button>
                <Button variant="brand" size="lg" icon={<Star size={18} />}>Get Started</Button>
              </div>
            </div>
            
            <div>
              <p className="text-xs text-black/60 mb-3 font-semibold">Secondary Shimmer (Coral Warmth)</p>
              <div className="flex flex-wrap gap-4">
                <Button variant="secondary" size="lg">Hover to Shimmer</Button>
                <Button variant="secondary" size="lg" icon={<Heart size={18} />}>Add to Favorites</Button>
              </div>
            </div>
          </div>
        </ComponentPreview>

        <CodeBlock 
          title="Shimmer Usage"
          code={`// ✨ Shimmer is ALWAYS active (no prop needed)\n<Button variant="brand">\n  Get Started\n</Button>\n\n// Custom shimmer duration (optional)\n<Button variant="brand" shimmerDuration={1000}>\n  Slow Shimmer (1000ms)\n</Button>`}
        />
      </section>

      {/* ==================== SIMPLE ARROW (showArrow prop) ==================== */}
      <section className="space-y-6">
        <div>
          <h3 className="text-2xl font-normal mb-3">➡️ Simple Arrow with showArrow Prop</h3>
          <div className="space-y-3">
            <div className="mb-3">
              <span className="text-sm font-semibold text-black/50 uppercase tracking-wide">WHY</span>
              <p className="text-sm text-black/70 mt-1">
                Adds directional urgency for CTAs that redirect (forms, checkout, page navigation).
                Combined with shimmer, creates maximum engagement without being obnoxious.
              </p>
            </div>
            <div className="mb-3">
              <span className="text-sm font-semibold text-black/50 uppercase tracking-wide">WHAT</span>
              <p className="text-sm text-black/70 mt-1">
                When <code className="bg-black/5 px-1 rounded-[5px]">showArrow={`{true}`}</code>, renders AnimatedArrow component inside button.
                2-arrow replacement animation (300ms). Triggers simultaneously with shimmer on hover.
              </p>
            </div>
            <div className="mb-3">
              <span className="text-sm font-semibold text-black/50 uppercase tracking-wide">WHEN</span>
              <p className="text-sm text-black/70 mt-1">
                Use for urgency CTAs: form submissions, checkout buttons, page redirects with urgency, 
                conversion-critical moments. NOT for general buttons (use icon prop or no icon instead).
              </p>
            </div>
          </div>
        </div>

        <ComponentPreview title="Buttons with showArrow Prop" description="Hover to see shimmer + arrow animation together">
          <div className="space-y-6">
            <div>
              <p className="text-xs text-black/60 mb-3 font-semibold">Primary Buttons with Arrow (Urgency CTAs)</p>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" size="lg" showArrow>
                  Submit Form
                </Button>
                <Button variant="primary" size="lg" showArrow>
                  Proceed to Checkout
                </Button>
              </div>
            </div>
            
            <div>
              <p className="text-xs text-black/60 mb-3 font-semibold">Brand Buttons with Arrow (Maximum Impact)</p>
              <div className="flex flex-wrap gap-4">
                <Button variant="brand" size="lg" showArrow>
                  Buy Now
                </Button>
                <Button variant="brand" size="lg" showArrow>
                  Start Free Trial
                </Button>
              </div>
            </div>
            
            <div>
              <p className="text-xs text-black/60 mb-3 font-semibold">Secondary Buttons with Arrow</p>
              <div className="flex flex-wrap gap-4">
                <Button variant="secondary" size="lg" showArrow>
                  Skip to Dashboard
                </Button>
                <Button variant="secondary" size="lg" showArrow>
                  View Results
                </Button>
              </div>
            </div>

            <div>
              <p className="text-xs text-black/60 mb-3 font-semibold">Different Sizes</p>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="brand" size="xl" showArrow>Extra Large</Button>
                <Button variant="brand" size="lg" showArrow>Large</Button>
                <Button variant="brand" size="md" showArrow>Medium</Button>
                <Button variant="brand" size="sm" showArrow>Small</Button>
              </div>
            </div>
          </div>
        </ComponentPreview>

        <CodeBlock 
          title="showArrow Prop Usage"
          code={`import { Button } from '@/app/components/Button';\n\n// Enable arrow with showArrow prop\n<Button \n  variant="brand" \n  size="lg" \n  showArrow  // ← Adds AnimatedArrow component\n>\n  Submit Application\n</Button>\n\n// Works with all variants\n<Button variant="primary" showArrow>\n  Proceed to Checkout\n</Button>\n\n<Button variant="secondary" showArrow>\n  Skip to Dashboard\n</Button>`}
        />
      </section>

      {/* ==================== ANIMATED ARROW COMPONENT ==================== */}
      <section className="space-y-6">
        <div>
          <h3 className="text-2xl font-normal mb-3">🔧 AnimatedArrow Component (Custom Elements)</h3>
          <div className="space-y-3">
            <div className="mb-3">
              <span className="text-sm font-semibold text-black/50 uppercase tracking-wide">WHY</span>
              <p className="text-sm text-black/70 mt-1">
                For custom buttons, text links, and cards outside the Button component.
                Provides same arrow animation with full control over styling.
              </p>
            </div>
            <div className="mb-3">
              <span className="text-sm font-semibold text-black/50 uppercase tracking-wide">WHEN</span>
              <p className="text-sm text-black/70 mt-1">
                Use for: text links, card CTAs, custom styled buttons, navigation items.
                Import AnimatedArrow and add to any element.
              </p>
            </div>
          </div>
        </div>

        <ComponentPreview title="Custom Buttons with AnimatedArrow">
          <div className="space-y-4">
            <div>
              <p className="text-xs text-black/60 mb-3">Hover to see 2-arrow replacement</p>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-black text-white rounded-[5px] flex items-center gap-2 hover:bg-black/90 transition-colors">
                  <span>Learn More</span>
                  <AnimatedArrow size={18} color="white" />
                </button>
                
                <button className="px-6 py-3 bg-white text-black border border-black/20 rounded-[5px] flex items-center gap-2 hover:border-black/40 transition-colors">
                  <span>View Details</span>
                  <AnimatedArrow size={18} color="black" />
                </button>
                
                <button 
                  className="px-6 py-3 text-white rounded-[5px] flex items-center gap-2 hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: 'var(--brand-red)' }}
                >
                  <span>Get Started</span>
                  <AnimatedArrow size={18} color="white" />
                </button>
              </div>
            </div>
          </div>
        </ComponentPreview>

        <ComponentPreview title="Text Links with AnimatedArrow">
          <div className="space-y-4">
            <div className="space-y-3">
              <a href="#" className="inline-flex items-center gap-2 text-black hover:underline">
                <span>Read the full article</span>
                <AnimatedArrow size={16} color="black" />
              </a>
              
              <br />
              
              <a href="#" className="inline-flex items-center gap-2 hover:underline" style={{ color: 'var(--brand-red)' }}>
                <span>View case study</span>
                <AnimatedArrow size={16} color="var(--brand-red)" />
              </a>
              
              <br />
              
              <a href="#" className="inline-flex items-center gap-2 text-lg text-black hover:underline">
                <span>Explore our work</span>
                <AnimatedArrow size={20} color="black" />
              </a>
            </div>
          </div>
        </ComponentPreview>

        <CodeBlock 
          title="AnimatedArrow Component Usage"
          code={`import { AnimatedArrow } from '@/app/components/AnimatedArrow';\n\n// Custom button with arrow\n<button className="flex items-center gap-2">\n  Learn More\n  <AnimatedArrow size={18} color="white" />\n</button>\n\n// Text link with arrow\n<a href="#" className="inline-flex items-center gap-2">\n  View case study\n  <AnimatedArrow size={16} color="#b01f24" />\n</a>\n\n// Props: size, color, strokeWidth, duration, className`}
        />
      </section>

      {/* ==================== USE CASES GUIDE ==================== */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-normal mb-3">📋 Use Cases Guide</h2>
          <p className="text-sm text-black/70">
            Real-world scenarios with code examples.
          </p>
        </div>

        <ComponentPreview title="1. Form Submissions (Shimmer + Arrow)">
          <div className="space-y-4">
            <div className="bg-white border border-black/8 rounded-[5px] p-6 max-w-md">
              <h4 className="font-semibold mb-4">Contact Form</h4>
              <div className="space-y-3 mb-6">
                <input type="text" placeholder="Name" className="w-full px-3 py-2 border border-black/10 rounded-[5px] bg-white text-black/90 placeholder:text-black/30 hover:border-black/25 focus:border-black/90 focus:outline-none transition-colors duration-150" />
                <input type="email" placeholder="Email" className="w-full px-3 py-2 border border-black/10 rounded-[5px] bg-white text-black/90 placeholder:text-black/30 hover:border-black/25 focus:border-black/90 focus:outline-none transition-colors duration-150" />
              </div>
              <Button variant="brand" size="lg" fullWidth showArrow>
                Submit Application
              </Button>
            </div>
          </div>
        </ComponentPreview>

        <CodeBlock 
          title="Form Submit Pattern"
          code={`// Urgency CTA - Form submission\n<Button \n  variant="brand" \n  size="lg" \n  fullWidth \n  showArrow  // ← Adds urgency with arrow\n>\n  Submit Application\n</Button>`}
        />

        <ComponentPreview title="2. Checkout Flow (Shimmer + Arrow)">
          <div className="space-y-4">
            <div className="bg-white border border-black/8 rounded-[5px] p-6 max-w-md">
              <h4 className="font-semibold mb-4">Order Summary</h4>
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>$99.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>$10.00</span>
                </div>
                <div className="flex justify-between font-semibold pt-2 border-t border-black/8">
                  <span>Total</span>
                  <span>$109.00</span>
                </div>
              </div>
              <div className="space-y-3">
                <Button variant="brand" size="lg" fullWidth showArrow icon={<CreditCard size={18} />}>
                  Complete Purchase
                </Button>
                <Button variant="secondary" size="md" fullWidth>
                  Continue Shopping
                </Button>
              </div>
            </div>
          </div>
        </ComponentPreview>

        <CodeBlock 
          title="Checkout Pattern"
          code={`// Primary CTA - Checkout with urgency\n<Button \n  variant="brand" \n  size="lg" \n  fullWidth \n  showArrow \n  icon={<CreditCard size={18} />}\n>\n  Complete Purchase\n</Button>\n\n// Secondary action - No arrow\n<Button variant="secondary" size="md" fullWidth>\n  Continue Shopping\n</Button>`}
        />

        <ComponentPreview title="3. Text Links (AnimatedArrow Component)">
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Article Title</h4>
                <p className="text-sm text-black/70 mb-3">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Sed do eiusmod tempor incididunt ut labore...
                </p>
                <a href="#" className="inline-flex items-center gap-2 text-black hover:underline">
                  <span>Read full article</span>
                  <AnimatedArrow size={16} color="black" />
                </a>
              </div>
            </div>
          </div>
        </ComponentPreview>

        <CodeBlock 
          title="Text Link Pattern"
          code={`import { AnimatedArrow } from '@/app/components/AnimatedArrow';\n\n// Text link with arrow\n<a href="#" className="inline-flex items-center gap-2">\n  Read full article\n  <AnimatedArrow size={16} color="black" />\n</a>`}
        />

        <ComponentPreview title="4. Card CTAs (AnimatedArrow Component)">
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="border border-black/8 rounded-[5px] p-4 hover:border-black/20 transition-colors">
                <div className="w-full h-32 bg-black/5 rounded-[2.5px] mb-3" />
                <h4 className="font-semibold text-sm mb-2">Project Alpha</h4>
                <p className="text-xs text-black/60 mb-3">Web application redesign</p>
                <button className="flex items-center gap-2 text-sm hover:underline">
                  View project
                  <AnimatedArrow size={14} color="black" />
                </button>
              </div>
              
              <div className="border border-black/8 rounded-[5px] p-4 hover:border-black/20 transition-colors">
                <div className="w-full h-32 bg-black/5 rounded-[2.5px] mb-3" />
                <h4 className="font-semibold text-sm mb-2">Project Beta</h4>
                <p className="text-xs text-black/60 mb-3">Mobile app development</p>
                <button className="flex items-center gap-2 text-sm hover:underline">
                  View project
                  <AnimatedArrow size={14} color="black" />
                </button>
              </div>
              
              <div className="border border-black/8 rounded-[5px] p-4 hover:border-black/20 transition-colors">
                <div className="w-full h-32 bg-black/5 rounded-[2.5px] mb-3" />
                <h4 className="font-semibold text-sm mb-2">Project Gamma</h4>
                <p className="text-xs text-black/60 mb-3">Brand identity system</p>
                <button className="flex items-center gap-2 text-sm hover:underline">
                  View project
                  <AnimatedArrow size={14} color="black" />
                </button>
              </div>
            </div>
          </div>
        </ComponentPreview>

        <CodeBlock 
          title="Card CTA Pattern"
          code={`// Card with arrow CTA\n<div className="card">\n  <h4>Project Title</h4>\n  <p>Description...</p>\n  <button className="flex items-center gap-2">\n    View project\n    <AnimatedArrow size={14} color="black" />\n  </button>\n</div>`}
        />
      </section>

      {/* ==================== DECISION GUIDE ==================== */}
      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-300 rounded-[10px] p-8">
        <h3 className="text-xl font-semibold text-amber-900 mb-4">🎯 Quick Decision Guide</h3>
        <div className="space-y-4">
          <div className="bg-white rounded-[5px] p-4">
            <h4 className="font-semibold text-amber-900 mb-2">Use Shimmer (Always Active):</h4>
            <p className="text-sm text-amber-900">
              ✅ Every button has shimmer automatically<br />
              ✅ Core brand identity - cannot be disabled<br />
              ✅ Optional: customize duration with <code className="bg-amber-200 px-1 rounded-[5px]">shimmerDuration</code> prop
            </p>
          </div>

          <div className="bg-white rounded-[5px] p-4">
            <h4 className="font-semibold text-amber-900 mb-2">Use <code className="bg-amber-200 px-1 rounded-[5px]">showArrow</code> Prop (Button Component):</h4>
            <p className="text-sm text-amber-900">
              ✅ Form submissions, checkout, urgent page navigation<br />
              ✅ Conversion-critical moments<br />
              ✅ Maximum urgency without being obnoxious<br />
              ✅ Usage: <code className="bg-amber-200 px-1 rounded-[5px]">{'<Button showArrow>Submit</Button>'}</code>
            </p>
          </div>

          <div className="bg-white rounded-[5px] p-4">
            <h4 className="font-semibold text-amber-900 mb-2">Use AnimatedArrow Component (Custom Elements):</h4>
            <p className="text-sm text-amber-900">
              ✅ Text links, card CTAs, custom styled buttons<br />
              ✅ Any element outside Button component<br />
              ✅ Full styling control<br />
              ✅ Import: <code className="bg-amber-200 px-1 rounded-[5px]">{'import { AnimatedArrow } from "@/app/components/AnimatedArrow"'}</code>
            </p>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-[5px] p-4">
          <h4 className="font-semibold text-amber-900 mb-3">Decision Tree:</h4>
          <pre className="text-xs font-mono text-amber-900">
{`Need arrow animation?
    │
    ├─ YES → Is it inside Button component?
    │         │
    │         ├─ YES → Use showArrow prop
    │         │         <Button showArrow>Text</Button>
    │         │
    │         └─ NO → Use AnimatedArrow component
    │                   <AnimatedArrow size={18} />
    │
    └─ NO → Use Button without arrow
              <Button>Text</Button>
              (Shimmer still active automatically)`}
          </pre>
        </div>
      </div>

      {/* ==================== SIDE BY SIDE COMPARISON ==================== */}
      <ComponentPreview title="Side-by-Side: Shimmer Only vs Shimmer + Arrow" description="Compare the two patterns">
        <div className="space-y-6">
          <div>
            <p className="text-xs text-black/60 mb-3 font-semibold">Shimmer Only (Standard Buttons)</p>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="lg">Primary</Button>
              <Button variant="secondary" size="lg">Secondary</Button>
              <Button variant="brand" size="lg">Brand</Button>
            </div>
          </div>
          
          <div>
            <p className="text-xs text-black/60 mb-3 font-semibold">Shimmer + Arrow (Urgency CTAs)</p>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="lg" showArrow>Primary</Button>
              <Button variant="secondary" size="lg" showArrow>Secondary</Button>
              <Button variant="brand" size="lg" showArrow>Brand</Button>
            </div>
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
}