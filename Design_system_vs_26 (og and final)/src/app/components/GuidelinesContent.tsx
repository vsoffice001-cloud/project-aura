import { useState } from 'react';
import { 
  Copy, 
  Check,
  Eye,
  Ear,
  Hand,
  Monitor,
  Smartphone,
  Tablet,
  CheckCircle,
  XCircle,
  AlertCircle,
  Code,
  Zap,
  Shield,
  RefreshCw,
  TrendingUp
} from 'lucide-react';
import { DocSection } from '@/app/components/FoundationsContent';

/**
 * GUIDELINES CONTENT
 * ==================
 * All content for the Guidelines tab including:
 * - Accessibility
 * - Responsive Design
 * - Best Practices
 */

// ============================================
// HELPER COMPONENTS
// ============================================

function GuidelinePreview({ 
  title, 
  description, 
  children 
}: { 
  title: string; 
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-black/8 rounded-[5px] overflow-hidden mb-6">
      <div className="bg-black/[0.02] px-6 py-4 border-b border-black/8">
        <h3 className="font-semibold text-sm mb-1">{title}</h3>
        {description && <p className="text-xs text-black/60">{description}</p>}
      </div>
      <div className="p-8 bg-white">
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
    <div className="relative bg-black/5 rounded-[5px] p-4 border border-black/8">
      <button
        onClick={copyCode}
        className="absolute top-3 right-3 p-2 rounded bg-white/80 hover:bg-white transition-colors"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
      <pre className="text-xs font-mono text-black/80 overflow-x-auto pr-12 whitespace-pre-wrap">
        {code}
      </pre>
    </div>
  );
}

function ChecklistItem({ 
  checked, 
  children 
}: { 
  checked: boolean; 
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className={`flex-shrink-0 mt-0.5 ${checked ? 'text-green-600' : 'text-black/20'}`}>
        {checked ? <CheckCircle size={18} /> : <div className="w-[18px] h-[18px] border-2 border-black/20 rounded-full" />}
      </div>
      <div className="text-sm">{children}</div>
    </div>
  );
}

function ContrastChecker({ 
  bg, 
  fg, 
  label 
}: { 
  bg: string; 
  fg: string; 
  label: string;
}) {
  return (
    <div className="p-4 border border-black/8 rounded-[5px]">
      <div className="mb-3" style={{ backgroundColor: bg, color: fg, padding: '16px', borderRadius: '4px' }}>
        <div className="font-semibold mb-1">Sample Text</div>
        <div className="text-sm">The quick brown fox jumps over the lazy dog.</div>
      </div>
      <div className="text-xs text-black/60">
        {label}
      </div>
    </div>
  );
}

// ============================================
// ACCESSIBILITY CONTENT
// ============================================

export function AccessibilityContent() {
  const [focusedElement, setFocusedElement] = useState<number | null>(null);

  return (
    <div className="space-y-12">
      <DocSection
        title="Accessibility Guidelines"
        why="Accessibility is a legal requirement and moral imperative - everyone deserves equal access"
        what="WCAG 2.1 Level AA compliance standards for keyboard, screen reader, and visual accessibility"
        when="Apply accessibility standards to every component and feature from day one"
        whenNot="Never treat accessibility as an afterthought or 'nice to have'"
      >
        <p className="text-black/70">
          Our design system follows WCAG 2.1 Level AA standards as a baseline, 
          with AAA standards for color contrast where possible.
        </p>
      </DocSection>

      {/* WCAG Standards */}
      <section>
        <h3 className="text-xl font-normal mb-6">WCAG 2.1 Standards</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 border border-black/8 rounded-[5px]">
            <div className="w-12 h-12 bg-black/5 rounded-[5px] flex items-center justify-center mb-4">
              <Eye size={24} />
            </div>
            <h4 className="font-semibold mb-2">Perceivable</h4>
            <p className="text-sm text-black/70 mb-3">
              Information must be presentable to users in ways they can perceive.
            </p>
            <ul className="text-sm text-black/60 space-y-1">
              <li>• Text alternatives for images</li>
              <li>• Sufficient color contrast</li>
              <li>• Resizable text up to 200%</li>
            </ul>
          </div>

          <div className="p-6 border border-black/8 rounded-[5px]">
            <div className="w-12 h-12 bg-black/5 rounded-[5px] flex items-center justify-center mb-4">
              <Hand size={24} />
            </div>
            <h4 className="font-semibold mb-2">Operable</h4>
            <p className="text-sm text-black/70 mb-3">
              Users must be able to operate the interface.
            </p>
            <ul className="text-sm text-black/60 space-y-1">
              <li>• Keyboard accessible</li>
              <li>• Sufficient time to read</li>
              <li>• No seizure-inducing content</li>
            </ul>
          </div>

          <div className="p-6 border border-black/8 rounded-[5px]">
            <div className="w-12 h-12 bg-black/5 rounded-[5px] flex items-center justify-center mb-4">
              <Ear size={24} />
            </div>
            <h4 className="font-semibold mb-2">Understandable</h4>
            <p className="text-sm text-black/70 mb-3">
              Information and UI operation must be understandable.
            </p>
            <ul className="text-sm text-black/60 space-y-1">
              <li>• Readable text content</li>
              <li>• Predictable behavior</li>
              <li>• Input assistance</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Color Contrast */}
      <section>
        <h3 className="text-xl font-normal mb-6">Color Contrast Standards</h3>
        
        <div className="bg-blue-50 border border-blue-200 rounded-[5px] p-6 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">Contrast Ratios Required</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• <strong>Level AA:</strong> 4.5:1 for normal text, 3:1 for large text (18pt+)</li>
                <li>• <strong>Level AAA:</strong> 7:1 for normal text, 4.5:1 for large text</li>
                <li>• <strong>UI Components:</strong> 3:1 minimum for interactive elements</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ContrastChecker
            bg="#ffffff"
            fg="#000000"
            label="✅ Black on White: 21:1 (AAA) - Perfect for body text"
          />
          <ContrastChecker
            bg="#000000"
            fg="#ffffff"
            label="✅ White on Black: 21:1 (AAA) - Perfect for dark sections"
          />
          <ContrastChecker
            bg="#b01f24"
            fg="#ffffff"
            label="✅ White on Ken Bold Red: 5.5:1 (AA) - Good for CTAs"
          />
          <ContrastChecker
            bg="#f5f2f1"
            fg="#000000"
            label="✅ Black on Warm Tint: 19:1 (AAA) - Excellent"
          />
        </div>

        <div className="mt-6">
          <CodeBlock code={`/* Testing color contrast in your design */

1. Use online tools:
   - WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
   - Contrast Ratio: https://contrast-ratio.com/

2. Browser DevTools:
   - Chrome: Inspect > Accessibility panel shows contrast ratio
   - Firefox: Inspect > Accessibility tab

3. Design tools:
   - Figma: A11y - Color Contrast Checker plugin
   - Sketch: Stark plugin for accessibility testing

/* Never rely on color alone to convey information */
❌ BAD:  "Click the red button"
✅ GOOD: "Click the 'Submit' button" (with red CTA styling)`} />
        </div>
      </section>

      {/* Keyboard Navigation */}
      <section>
        <h3 className="text-xl font-normal mb-6">Keyboard Navigation</h3>
        
        <GuidelinePreview 
          title="Keyboard Accessibility Demo"
          description="All interactive elements must be keyboard accessible"
        >
          <div className="space-y-4">
            <p className="text-sm text-black/70 mb-4">
              Press <kbd className="px-2 py-1 bg-black/5 border border-black/20 rounded text-xs font-mono">Tab</kbd> to navigate through these elements:
            </p>
            
            {[1, 2, 3].map((num) => (
              <button
                key={num}
                onFocus={() => setFocusedElement(num)}
                onBlur={() => setFocusedElement(null)}
                className={`w-full px-4 py-3 border-2 rounded transition-all ${
                  focusedElement === num
                    ? 'border-black bg-black/5 ring-4 ring-black/10'
                    : 'border-black/20 hover:border-black/40'
                }`}
              >
                Focusable Element {num}
                {focusedElement === num && <span className="ml-2 text-xs">(Currently Focused)</span>}
              </button>
            ))}
          </div>
        </GuidelinePreview>

        <div className="space-y-4">
          <h4 className="font-semibold text-sm">Keyboard Navigation Requirements</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-black/8 rounded-[5px]">
              <h5 className="font-medium mb-2 text-sm">Tab Order</h5>
              <ul className="text-sm text-black/70 space-y-1">
                <li>• Logical, predictable tab sequence</li>
                <li>• Left-to-right, top-to-bottom</li>
                <li>• No keyboard traps</li>
                <li>• Skip to main content link</li>
              </ul>
            </div>

            <div className="p-4 border border-black/8 rounded-[5px]">
              <h5 className="font-medium mb-2 text-sm">Focus Indicators</h5>
              <ul className="text-sm text-black/70 space-y-1">
                <li>• Visible focus ring (minimum 2px)</li>
                <li>• High contrast (3:1 minimum)</li>
                <li>• Never remove :focus styles</li>
                <li>• Use :focus-visible for mouse vs keyboard</li>
              </ul>
            </div>

            <div className="p-4 border border-black/8 rounded-[5px]">
              <h5 className="font-medium mb-2 text-sm">Keyboard Shortcuts</h5>
              <ul className="text-sm text-black/70 space-y-1">
                <li>• <kbd>Tab</kbd> - Next element</li>
                <li>• <kbd>Shift + Tab</kbd> - Previous element</li>
                <li>• <kbd>Enter</kbd> - Activate buttons/links</li>
                <li>• <kbd>Space</kbd> - Activate buttons, checkboxes</li>
                <li>• <kbd>Esc</kbd> - Close modals/dropdowns</li>
                <li>• <kbd>Arrow keys</kbd> - Navigate lists/menus</li>
              </ul>
            </div>

            <div className="p-4 border border-black/8 rounded-[5px]">
              <h5 className="font-medium mb-2 text-sm">Interactive Elements</h5>
              <ul className="text-sm text-black/70 space-y-1">
                <li>• All clickable elements must be focusable</li>
                <li>• Use semantic HTML (&lt;button&gt;, &lt;a&gt;)</li>
                <li>• Add tabindex="0" for custom elements</li>
                <li>• Use tabindex="-1" to remove from tab order</li>
              </ul>
            </div>
          </div>
        </div>

        <CodeBlock code={`/* Proper focus styling */
.button:focus {
  outline: none; /* Remove default */
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.2); /* Custom focus ring */
}

/* Only show focus for keyboard navigation, not mouse clicks */
.button:focus:not(:focus-visible) {
  box-shadow: none;
}

.button:focus-visible {
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.2);
}

/* Skip to main content link (hidden until focused) */
.skip-link {
  position: absolute;
  left: -9999px;
}

.skip-link:focus {
  left: 0;
  top: 0;
  z-index: 9999;
  padding: 1rem;
  background: white;
  border: 2px solid black;
}`} />
      </section>

      {/* ARIA Labels & Semantic HTML */}
      <section>
        <h3 className="text-xl font-normal mb-6">ARIA Labels & Semantic HTML</h3>
        
        <div className="space-y-6">
          <div className="p-6 border border-black/8 rounded-[5px]">
            <h4 className="font-semibold mb-3">Use Semantic HTML First</h4>
            <p className="text-sm text-black/70 mb-4">
              Always use native HTML elements before adding ARIA. Native elements have built-in accessibility.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-red-50 border border-red-200 rounded">
                <div className="text-xs font-medium text-red-900 mb-2">❌ Bad</div>
                <code className="text-xs text-red-800">
                  &lt;div onClick=&#123;...&#125;&gt;Click me&lt;/div&gt;
                </code>
              </div>
              
              <div className="p-4 bg-green-50 border border-green-200 rounded">
                <div className="text-xs font-medium text-green-900 mb-2">✅ Good</div>
                <code className="text-xs text-green-800">
                  &lt;button onClick=&#123;...&#125;&gt;Click me&lt;/button&gt;
                </code>
              </div>
            </div>
          </div>

          <div className="p-6 border border-black/8 rounded-[5px]">
            <h4 className="font-semibold mb-3">When to Use ARIA</h4>
            <ul className="text-sm text-black/70 space-y-2">
              <li>• <strong>aria-label:</strong> Provide text alternative for icon-only buttons</li>
              <li>• <strong>aria-labelledby:</strong> Reference another element's text as label</li>
              <li>• <strong>aria-describedby:</strong> Additional description for context</li>
              <li>• <strong>aria-live:</strong> Announce dynamic content changes</li>
              <li>• <strong>aria-expanded:</strong> Indicate collapsible state (dropdowns, accordions)</li>
              <li>• <strong>aria-hidden:</strong> Hide decorative elements from screen readers</li>
            </ul>
          </div>
        </div>

        <CodeBlock code={`/* ARIA Examples */

// Icon-only button
<button aria-label="Delete item">
  <TrashIcon />
</button>

// Button with loading state
<button aria-busy={isLoading}>
  {isLoading ? 'Loading...' : 'Submit'}
</button>

// Dropdown menu
<button 
  aria-expanded={isOpen}
  aria-controls="dropdown-menu"
>
  Options
</button>
<div id="dropdown-menu" role="menu">
  {/* menu items */}
</div>

// Live region for announcements
<div aria-live="polite" aria-atomic="true">
  {statusMessage}
</div>

// Hide decorative images
<img src="decorative.png" alt="" aria-hidden="true" />

// Modal dialog
<div 
  role="dialog" 
  aria-modal="true"
  aria-labelledby="dialog-title"
>
  <h2 id="dialog-title">Confirm Action</h2>
  {/* dialog content */}
</div>`} />
      </section>

      {/* Screen Reader Testing */}
      <section>
        <h3 className="text-xl font-normal mb-6">Screen Reader Considerations</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border-2 border-green-200 bg-green-50 rounded-[5px]">
            <h4 className="font-semibold mb-3 flex items-center gap-2 text-green-900">
              <CheckCircle size={18} />
              Do
            </h4>
            <ul className="space-y-2 text-sm text-green-800">
              <li>• Write descriptive alt text for images</li>
              <li>• Use semantic headings (h1, h2, h3)</li>
              <li>• Provide text alternatives for icons</li>
              <li>• Announce state changes (loading, errors)</li>
              <li>• Use descriptive link text ("Read case study" not "Click here")</li>
              <li>• Test with actual screen readers (NVDA, JAWS, VoiceOver)</li>
            </ul>
          </div>
          
          <div className="p-6 border-2 border-red-200 bg-red-50 rounded-[5px]">
            <h4 className="font-semibold mb-3 flex items-center gap-2 text-red-900">
              <XCircle size={18} />
              Don't
            </h4>
            <ul className="space-y-2 text-sm text-red-800">
              <li>• Use "image" or "icon" in alt text</li>
              <li>• Skip heading levels (h1 → h3)</li>
              <li>• Leave form inputs without labels</li>
              <li>• Rely on placeholder text as labels</li>
              <li>• Use generic link text ("click here", "read more")</li>
              <li>• Assume screen readers see visual layout</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 p-6 border border-black/8 rounded-[5px]">
          <h4 className="font-semibold mb-3">Screen Reader Testing Tools</h4>
          <ul className="text-sm text-black/70 space-y-2">
            <li>• <strong>NVDA (Windows):</strong> Free, widely used - <a href="https://www.nvaccess.org/" target="_blank" rel="noopener noreferrer" className="underline">nvaccess.org</a></li>
            <li>• <strong>JAWS (Windows):</strong> Industry standard - <a href="https://www.freedomscientific.com/products/software/jaws/" target="_blank" rel="noopener noreferrer" className="underline">freedomscientific.com</a></li>
            <li>• <strong>VoiceOver (Mac/iOS):</strong> Built-in - Cmd+F5 to enable</li>
            <li>• <strong>TalkBack (Android):</strong> Built-in - Settings → Accessibility</li>
            <li>• <strong>ChromeVox (Chrome):</strong> Extension for quick testing</li>
          </ul>
        </div>
      </section>

      {/* Accessibility Checklist */}
      <section>
        <h3 className="text-xl font-normal mb-6">Accessibility Checklist</h3>
        
        <div className="p-6 border border-black/8 rounded-[5px] space-y-3">
          <ChecklistItem checked={true}>All images have descriptive alt text or aria-label</ChecklistItem>
          <ChecklistItem checked={true}>Color contrast meets WCAG AA minimum (4.5:1)</ChecklistItem>
          <ChecklistItem checked={true}>All interactive elements are keyboard accessible</ChecklistItem>
          <ChecklistItem checked={true}>Focus indicators are clearly visible</ChecklistItem>
          <ChecklistItem checked={true}>Semantic HTML used (&lt;button&gt;, &lt;nav&gt;, &lt;main&gt;, etc.)</ChecklistItem>
          <ChecklistItem checked={true}>Form inputs have associated labels</ChecklistItem>
          <ChecklistItem checked={true}>Heading hierarchy is logical (h1 → h2 → h3)</ChecklistItem>
          <ChecklistItem checked={true}>Links have descriptive text (not "click here")</ChecklistItem>
          <ChecklistItem checked={true}>Error messages are clear and actionable</ChecklistItem>
          <ChecklistItem checked={true}>Animation respects prefers-reduced-motion</ChecklistItem>
          <ChecklistItem checked={true}>Touch targets are minimum 44x44px</ChecklistItem>
          <ChecklistItem checked={true}>Tested with screen reader</ChecklistItem>
        </div>
      </section>
    </div>
  );
}

// ============================================
// RESPONSIVE DESIGN CONTENT
// ============================================

export function ResponsiveDesignContent() {
  return (
    <div className="space-y-12">
      <DocSection
        title="Responsive Design Guidelines"
        why="Users access interfaces on countless devices - design must adapt seamlessly"
        what="Mobile-first approach with fluid layouts and strategic breakpoints"
        when="Apply responsive principles to every component and layout"
      >
        <p className="text-black/70">
          Our responsive system uses a mobile-first approach with three core breakpoints 
          optimized for phones, tablets, and desktops.
        </p>
      </DocSection>

      {/* Breakpoints */}
      <section>
        <h3 className="text-xl font-normal mb-6">Breakpoint System</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 border-2 border-black/20 rounded-[5px]">
            <Smartphone size={32} className="mb-4" />
            <h4 className="font-semibold mb-2">Mobile</h4>
            <div className="text-2xl font-normal mb-2">&lt; 768px</div>
            <p className="text-sm text-black/60">
              Default / Base styles<br />
              Single column layouts<br />
              320px - 767px
            </p>
          </div>

          <div className="p-6 border-2 border-black/20 rounded-[5px]">
            <Tablet size={32} className="mb-4" />
            <h4 className="font-semibold mb-2">Tablet</h4>
            <div className="text-2xl font-normal mb-2">768px - 1023px</div>
            <p className="text-sm text-black/60">
              Medium breakpoint<br />
              2-column layouts<br />
              iPad, smaller tablets
            </p>
          </div>

          <div className="p-6 border-2 border-black/20 rounded-[5px]">
            <Monitor size={32} className="mb-4" />
            <h4 className="font-semibold mb-2">Desktop</h4>
            <div className="text-2xl font-normal mb-2">1024px+</div>
            <p className="text-sm text-black/60">
              Large breakpoint<br />
              3-4 column layouts<br />
              Laptops, desktops
            </p>
          </div>
        </div>

        <CodeBlock code={`/* Tailwind CSS Breakpoints (Mobile-First) */

/* Base styles (Mobile < 768px) */
.container {
  padding: 1rem;
}

/* Tablet (≥ 768px) */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}

/* Desktop (≥ 1024px) */
@media (min-width: 1024px) {
  .container {
    padding: 3rem;
  }
}

/* Tailwind utility classes */
<div className="px-4 md:px-8 lg:px-12">
  {/* Padding increases with screen size */}
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* 1 column → 2 columns → 3 columns */}
</div>`} />
      </section>

      {/* Mobile-First Approach */}
      <section>
        <h3 className="text-xl font-normal mb-6">Mobile-First Methodology</h3>
        
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="p-6 border-2 border-green-200 bg-green-50 rounded-[5px]">
            <h4 className="font-semibold mb-3 text-green-900">✅ Mobile-First (Recommended)</h4>
            <p className="text-sm text-green-800 mb-3">
              Start with mobile styles, progressively enhance for larger screens.
            </p>
            <code className="text-xs bg-green-100 p-2 rounded block">
              .element &#123;<br />
              &nbsp;&nbsp;width: 100%; /* Mobile */<br />
              &#125;<br />
              <br />
              @media (min-width: 768px) &#123;<br />
              &nbsp;&nbsp;.element &#123; width: 50%; &#125;<br />
              &#125;
            </code>
          </div>
          
          <div className="p-6 border-2 border-red-200 bg-red-50 rounded-[5px]">
            <h4 className="font-semibold mb-3 text-red-900">❌ Desktop-First (Avoid)</h4>
            <p className="text-sm text-red-800 mb-3">
              Starts large, strips features for mobile - leads to bloat.
            </p>
            <code className="text-xs bg-red-100 p-2 rounded block">
              .element &#123;<br />
              &nbsp;&nbsp;width: 50%; /* Desktop */<br />
              &#125;<br />
              <br />
              @media (max-width: 767px) &#123;<br />
              &nbsp;&nbsp;.element &#123; width: 100%; &#125;<br />
              &#125;
            </code>
          </div>
        </div>

        <div className="p-6 border border-black/8 rounded-[5px]">
          <h4 className="font-semibold mb-3">Why Mobile-First?</h4>
          <ul className="text-sm text-black/70 space-y-2">
            <li>• <strong>Performance:</strong> Mobile users load only what they need, not desktop bloat</li>
            <li>• <strong>Constraints breed creativity:</strong> Forces focus on essential features first</li>
            <li>• <strong>Progressive enhancement:</strong> Add features as screen real estate increases</li>
            <li>• <strong>Mobile usage:</strong> 60%+ of web traffic is mobile - design for majority first</li>
            <li>• <strong>Easier to enhance than strip:</strong> Adding is simpler than removing</li>
          </ul>
        </div>
      </section>

      {/* Touch Targets */}
      <section>
        <h3 className="text-xl font-normal mb-6">Touch Target Guidelines</h3>
        
        <div className="bg-amber-50 border border-amber-200 rounded-[5px] p-6 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-900 mb-2">Minimum Touch Target Size</h4>
              <p className="text-sm text-amber-800">
                <strong>44x44px minimum</strong> for all interactive elements on mobile (Apple HIG, WCAG 2.1 AAA).<br />
                <strong>48x48px recommended</strong> for comfortable tapping (Material Design).
              </p>
            </div>
          </div>
        </div>

        <GuidelinePreview title="Touch Target Size Examples">
          <div className="space-y-6">
            <div>
              <div className="text-xs text-black/60 mb-2">❌ Too Small (32px) - Difficult to tap</div>
              <button className="w-8 h-8 bg-red-100 border-2 border-red-500 rounded flex items-center justify-center text-xs">
                32
              </button>
            </div>

            <div>
              <div className="text-xs text-black/60 mb-2">⚠️ Minimum (44px) - Acceptable but tight</div>
              <button className="w-11 h-11 bg-amber-100 border-2 border-amber-500 rounded flex items-center justify-center text-xs">
                44
              </button>
            </div>

            <div>
              <div className="text-xs text-black/60 mb-2">✅ Recommended (48px+) - Comfortable to tap</div>
              <button className="w-12 h-12 bg-green-100 border-2 border-green-500 rounded flex items-center justify-center text-xs">
                48
              </button>
            </div>

            <div>
              <div className="text-xs text-black/60 mb-2">✅ Large (56px) - Easy to tap</div>
              <button className="w-14 h-14 bg-green-100 border-2 border-green-500 rounded flex items-center justify-center text-xs">
                56
              </button>
            </div>
          </div>
        </GuidelinePreview>

        <CodeBlock code={`/* Button touch targets */
.button {
  min-height: 44px; /* Minimum */
  min-width: 44px;
  padding: 12px 24px; /* Additional padding for comfort */
}

/* Icon button touch targets */
.icon-button {
  width: 48px;  /* Recommended */
  height: 48px;
  padding: 12px;
}

/* Small buttons get larger tap areas */
.small-button {
  padding: 8px 16px;
  /* Visual size is small, but hit area is expanded */
  position: relative;
}

.small-button::before {
  content: '';
  position: absolute;
  inset: -8px; /* Expands tap area */
}`} />
      </section>

      {/* Responsive Typography */}
      <section>
        <h3 className="text-xl font-normal mb-6">Responsive Typography</h3>
        
        <div className="p-6 border border-black/8 rounded-[5px] mb-6">
          <h4 className="font-semibold mb-3">Fluid Typography with clamp()</h4>
          <p className="text-sm text-black/70 mb-4">
            Use CSS <code>clamp()</code> for typography that scales smoothly between breakpoints.
          </p>
          
          <div className="space-y-4">
            <div className="p-4 bg-black/[0.02] rounded">
              <div style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }} className="font-normal mb-2">
                Fluid Heading
              </div>
              <code className="text-xs">font-size: clamp(2rem, 5vw, 3rem)</code>
            </div>

            <div className="p-4 bg-black/[0.02] rounded">
              <div style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)' }} className="mb-2">
                Fluid Body Text
              </div>
              <code className="text-xs">font-size: clamp(1rem, 2.5vw, 1.25rem)</code>
            </div>
          </div>
        </div>

        <CodeBlock code={`/* Fluid typography examples */

/* Hero heading: 32px (mobile) → 48px (desktop) */
h1 {
  font-size: clamp(2rem, 5vw, 3rem);
  /* min: 2rem (32px)
     preferred: 5vw (5% of viewport width)
     max: 3rem (48px) */
}

/* Section heading: 24px (mobile) → 39px (desktop) */
h2 {
  font-size: clamp(1.5rem, 3.5vw, 2.441rem);
}

/* Body text: 16px (mobile) → 18px (desktop) */
p {
  font-size: clamp(1rem, 1.5vw, 1.125rem);
}

/* Responsive line-height */
p {
  line-height: clamp(1.5, 2vw, 1.8);
}`} />
      </section>

      {/* Responsive Images */}
      <section>
        <h3 className="text-xl font-normal mb-6">Responsive Images</h3>
        
        <CodeBlock code={`/* Responsive image techniques */

/* 1. Fluid images - scale with container */
img {
  max-width: 100%;
  height: auto;
}

/* 2. Picture element - different images for breakpoints */
<picture>
  <source media="(min-width: 1024px)" srcset="large.jpg" />
  <source media="(min-width: 768px)" srcset="medium.jpg" />
  <img src="small.jpg" alt="Description" />
</picture>

/* 3. srcset - let browser choose best image */
<img 
  src="image-800.jpg"
  srcset="
    image-400.jpg 400w,
    image-800.jpg 800w,
    image-1200.jpg 1200w
  "
  sizes="(max-width: 768px) 100vw, 800px"
  alt="Description"
/>

/* 4. Object-fit for aspect ratio control */
img {
  width: 100%;
  height: 300px;
  object-fit: cover; /* or contain */
}`} />
      </section>

      {/* Responsive Testing Checklist */}
      <section>
        <h3 className="text-xl font-normal mb-6">Responsive Testing Checklist</h3>
        
        <div className="p-6 border border-black/8 rounded-[5px] space-y-3">
          <ChecklistItem checked={true}>Test on real devices (iPhone, Android, iPad)</ChecklistItem>
          <ChecklistItem checked={true}>Use browser DevTools device emulation</ChecklistItem>
          <ChecklistItem checked={true}>Test portrait and landscape orientations</ChecklistItem>
          <ChecklistItem checked={true}>Verify touch targets are 44x44px minimum</ChecklistItem>
          <ChecklistItem checked={true}>Check text readability on small screens</ChecklistItem>
          <ChecklistItem checked={true}>Ensure horizontal scrolling is not required</ChecklistItem>
          <ChecklistItem checked={true}>Test at 320px width (iPhone SE)</ChecklistItem>
          <ChecklistItem checked={true}>Verify images load and scale properly</ChecklistItem>
          <ChecklistItem checked={true}>Check forms are usable on mobile</ChecklistItem>
          <ChecklistItem checked={true}>Test navigation on small screens</ChecklistItem>
        </div>
      </section>
    </div>
  );
}

// ============================================
// BEST PRACTICES CONTENT
// ============================================

export function BestPracticesContent() {
  return (
    <div className="space-y-12">
      <DocSection
        title="Best Practices"
        why="Consistent standards ensure quality, maintainability, and team efficiency"
        what="Code quality, performance, and design principles for production systems"
        when="Apply these practices from day one, enforce through code review"
      >
        <p className="text-black/70">
          These best practices represent lessons learned from building and maintaining 
          enterprise design systems at scale.
        </p>
      </DocSection>

      {/* Code Quality */}
      <section>
        <h3 className="text-xl font-normal mb-6">Code Quality Standards</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 border border-black/8 rounded-[5px]">
            <div className="w-12 h-12 bg-black/5 rounded-[5px] flex items-center justify-center mb-4">
              <Code size={24} />
            </div>
            <h4 className="font-semibold mb-2">Clean Code</h4>
            <ul className="text-sm text-black/70 space-y-1">
              <li>• Descriptive naming</li>
              <li>• Single responsibility</li>
              <li>• DRY (Don't Repeat Yourself)</li>
              <li>• Consistent formatting</li>
            </ul>
          </div>

          <div className="p-6 border border-black/8 rounded-[5px]">
            <div className="w-12 h-12 bg-black/5 rounded-[5px] flex items-center justify-center mb-4">
              <Shield size={24} />
            </div>
            <h4 className="font-semibold mb-2">Type Safety</h4>
            <ul className="text-sm text-black/70 space-y-1">
              <li>• TypeScript for all components</li>
              <li>• Strict mode enabled</li>
              <li>• Explicit prop types</li>
              <li>• No any types</li>
            </ul>
          </div>

          <div className="p-6 border border-black/8 rounded-[5px]">
            <div className="w-12 h-12 bg-black/5 rounded-[5px] flex items-center justify-center mb-4">
              <RefreshCw size={24} />
            </div>
            <h4 className="font-semibold mb-2">Reusability</h4>
            <ul className="text-sm text-black/70 space-y-1">
              <li>• Component composition</li>
              <li>• Prop-based configuration</li>
              <li>• Avoid duplication</li>
              <li>• Export reusable utilities</li>
            </ul>
          </div>
        </div>

        <div className="mt-6">
          <CodeBlock code={`/* Component best practices */

// ✅ GOOD: Clean, typed component
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export function Button({ 
  variant, 
  size = 'md', 
  children, 
  onClick,
  disabled = false 
}: ButtonProps) {
  return (
    <button
      className={\`btn btn-\${variant} btn-\${size}\`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

// ❌ BAD: No types, unclear naming
export function Btn(props: any) {
  return <div className="thing" onClick={props.fn}>{props.txt}</div>;
}`} />
        </div>
      </section>

      {/* Performance */}
      <section>
        <h3 className="text-xl font-normal mb-6">Performance Optimization</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border-2 border-green-200 bg-green-50 rounded-[5px]">
            <h4 className="font-semibold mb-3 flex items-center gap-2 text-green-900">
              <Zap size={18} />
              Performance Best Practices
            </h4>
            <ul className="space-y-2 text-sm text-green-800">
              <li>• Lazy load images and components</li>
              <li>• Minimize bundle size (tree-shaking)</li>
              <li>• Use CSS for animations (GPU-accelerated)</li>
              <li>• Debounce search and resize handlers</li>
              <li>• Optimize images (WebP, responsive sizes)</li>
              <li>• Code-split routes and heavy components</li>
              <li>• Use React.memo for expensive renders</li>
              <li>• Avoid inline functions in render</li>
            </ul>
          </div>
          
          <div className="p-6 border border-black/8 rounded-[5px]">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <TrendingUp size={18} />
              Performance Metrics
            </h4>
            <ul className="space-y-2 text-sm text-black/70">
              <li>• <strong>First Contentful Paint:</strong> &lt; 1.8s</li>
              <li>• <strong>Largest Contentful Paint:</strong> &lt; 2.5s</li>
              <li>• <strong>Time to Interactive:</strong> &lt; 3.8s</li>
              <li>• <strong>Cumulative Layout Shift:</strong> &lt; 0.1</li>
              <li>• <strong>Total Bundle Size:</strong> &lt; 200KB gzipped</li>
              <li>• <strong>Lighthouse Score:</strong> 90+ (all categories)</li>
            </ul>
          </div>
        </div>

        <div className="mt-6">
          <CodeBlock code={`/* Performance optimization examples */

// Lazy loading
const HeavyComponent = lazy(() => import('./HeavyComponent'));

// Memoization
const ExpensiveComponent = memo(({ data }) => {
  // Expensive render logic
});

// Debouncing
const debouncedSearch = debounce((query) => {
  // Search API call
}, 300);

// Image optimization
<img 
  src="image.webp"
  loading="lazy"
  width="800"
  height="600"
  alt="Description"
/>

// Code splitting by route
const routes = [
  {
    path: '/dashboard',
    component: lazy(() => import('./Dashboard'))
  }
];`} />
        </div>
      </section>

      {/* Component Design Principles */}
      <section>
        <h3 className="text-xl font-normal mb-6">Component Design Principles</h3>
        
        <div className="space-y-4">
          <div className="p-6 border border-black/8 rounded-[5px]">
            <h4 className="font-semibold mb-2">1. Composition Over Configuration</h4>
            <p className="text-sm text-black/70">
              Build small, composable components rather than large, configurable ones.
            </p>
          </div>

          <div className="p-6 border border-black/8 rounded-[5px]">
            <h4 className="font-semibold mb-2">2. Single Responsibility</h4>
            <p className="text-sm text-black/70">
              Each component should do one thing well. Split complex components into smaller pieces.
            </p>
          </div>

          <div className="p-6 border border-black/8 rounded-[5px]">
            <h4 className="font-semibold mb-2">3. Controlled vs Uncontrolled</h4>
            <p className="text-sm text-black/70">
              Prefer controlled components (parent manages state) for flexibility, 
              unless the component truly owns its state.
            </p>
          </div>

          <div className="p-6 border border-black/8 rounded-[5px]">
            <h4 className="font-semibold mb-2">4. Sensible Defaults</h4>
            <p className="text-sm text-black/70">
              Provide good defaults so components work with minimal configuration.
            </p>
          </div>
        </div>
      </section>

      {/* Documentation */}
      <section>
        <h3 className="text-xl font-normal mb-6">Documentation Standards</h3>
        
        <div className="p-6 border border-black/8 rounded-[5px] mb-6">
          <h4 className="font-semibold mb-3">Every Component Should Have:</h4>
          <ul className="text-sm text-black/70 space-y-2">
            <li>• <strong>Purpose:</strong> What problem does it solve?</li>
            <li>• <strong>Props:</strong> All props documented with types</li>
            <li>• <strong>Examples:</strong> Common usage patterns with code</li>
            <li>• <strong>Accessibility:</strong> ARIA requirements, keyboard support</li>
            <li>• <strong>States:</strong> All interactive states shown (hover, disabled, loading)</li>
            <li>• <strong>Do/Don't:</strong> Best practices and anti-patterns</li>
          </ul>
        </div>

        <CodeBlock code={`/**
 * Button Component
 * 
 * Primary interactive element for user actions.
 * Supports 4 variants, 4 sizes, loading states, and icon placement.
 * 
 * @example
 * // Primary button with icon
 * <Button variant="primary" icon={<Download />}>
 *   Download Report
 * </Button>
 * 
 * @example
 * // Loading state
 * <Button loading={isSubmitting}>
 *   Submit
 * </Button>
 */
interface ButtonProps {
  /** Visual style variant */
  variant?: 'primary' | 'secondary' | 'ghost' | 'brand';
  /** Button size */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Button content */
  children: React.ReactNode;
  /** Optional icon element */
  icon?: React.ReactNode;
  /** Show loading spinner */
  loading?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Click handler */
  onClick?: () => void;
}

export function Button({ ... }: ButtonProps) {
  // Implementation
}`} />
      </section>

      {/* Maintenance & Versioning */}
      <section>
        <h3 className="text-xl font-normal mb-6">Maintenance & Versioning</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border border-black/8 rounded-[5px]">
            <h4 className="font-semibold mb-3">Semantic Versioning</h4>
            <p className="text-sm text-black/70 mb-3">
              Follow SemVer for predictable updates:
            </p>
            <ul className="text-sm text-black/70 space-y-2">
              <li>• <strong>MAJOR (1.0.0):</strong> Breaking changes</li>
              <li>• <strong>MINOR (0.1.0):</strong> New features, backwards compatible</li>
              <li>• <strong>PATCH (0.0.1):</strong> Bug fixes</li>
            </ul>
          </div>

          <div className="p-6 border border-black/8 rounded-[5px]">
            <h4 className="font-semibold mb-3">Deprecation Process</h4>
            <p className="text-sm text-black/70 mb-3">
              When removing features:
            </p>
            <ul className="text-sm text-black/70 space-y-2">
              <li>1. Mark as deprecated with warning</li>
              <li>2. Document migration path</li>
              <li>3. Wait one major version</li>
              <li>4. Then remove in next major</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Final Checklist */}
      <section>
        <h3 className="text-xl font-normal mb-6">Pre-Release Checklist</h3>
        
        <div className="p-6 border border-black/8 rounded-[5px] space-y-3">
          <ChecklistItem checked={true}>All components have TypeScript types</ChecklistItem>
          <ChecklistItem checked={true}>Accessibility tested (keyboard, screen reader)</ChecklistItem>
          <ChecklistItem checked={true}>Responsive on mobile, tablet, desktop</ChecklistItem>
          <ChecklistItem checked={true}>Documentation complete with examples</ChecklistItem>
          <ChecklistItem checked={true}>Unit tests for complex logic</ChecklistItem>
          <ChecklistItem checked={true}>Visual regression tests for components</ChecklistItem>
          <ChecklistItem checked={true}>Performance tested (Lighthouse 90+)</ChecklistItem>
          <ChecklistItem checked={true}>Cross-browser tested (Chrome, Firefox, Safari)</ChecklistItem>
          <ChecklistItem checked={true}>Design tokens exported and documented</ChecklistItem>
          <ChecklistItem checked={true}>Changelog updated with version number</ChecklistItem>
        </div>
      </section>
    </div>
  );
}