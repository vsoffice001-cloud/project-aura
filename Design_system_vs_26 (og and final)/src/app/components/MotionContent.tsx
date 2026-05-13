import { useState } from 'react';
import { 
  Copy, 
  Check,
  Play,
  RotateCcw,
  Zap,
  Clock,
  Sparkles,
  ChevronRight,
  Heart,
  Bell,
  Star,
  Loader2,
  Check as CheckIcon,
  X
} from 'lucide-react';
import { Button } from '@/app/components/Button';
import { DocSection } from '@/app/components/FoundationsContent';

/**
 * MOTION CONTENT
 * ==============
 * All content for the Motion tab including:
 * - Motion Principles
 * - Duration Scale
 * - Transitions
 * - Micro-interactions
 */

// ============================================
// HELPER COMPONENTS
// ============================================

function ComponentPreview({ 
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

function CodeBlock({ code, title }: { code: string; title?: string }) {
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
      <pre className="text-xs font-mono text-black/80 overflow-x-auto pr-12">
        {code}
      </pre>
    </div>
  );
}

function AnimationDemo({ 
  title,
  duration,
  children,
  onTrigger
}: { 
  title: string;
  duration: string;
  children: React.ReactNode;
  onTrigger: () => void;
}) {
  return (
    <div className="p-6 border border-black/8 rounded-[5px]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="font-semibold text-sm mb-1">{title}</h4>
          <p className="text-xs text-black/60">{duration}</p>
        </div>
        <button
          onClick={onTrigger}
          className="px-3 py-1.5 bg-black text-white rounded text-xs font-medium hover:bg-black/80 transition-colors flex items-center gap-2"
        >
          <Play size={12} />
          Play
        </button>
      </div>
      <div className="h-32 bg-black/[0.02] rounded-[5px] flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}

// ============================================
// MOTION PRINCIPLES CONTENT
// ============================================

export function MotionPrinciplesContent() {
  return (
    <div className="space-y-12">
      <DocSection
        title="Motion Design Principles"
        why="Motion creates continuity, provides feedback, and guides attention - but only when used purposefully"
        what="A minimal, intentional approach to animation that enhances rather than distracts"
        when="Use motion to communicate state changes, direct focus, and provide feedback"
        whenNot="Never animate for decoration - every motion must serve a functional purpose"
      >
        <p className="text-black/70">
          Our motion system follows three core principles: purposeful, subtle, and responsive.
        </p>
      </DocSection>

      {/* Core Principles */}
      <section>
        <h3 className="text-xl font-normal mb-6">Core Principles</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 border border-black/8 rounded-[5px]">
            <div className="w-12 h-12 bg-black/5 rounded-[5px] flex items-center justify-center mb-4">
              <Zap size={24} />
            </div>
            <h4 className="font-semibold mb-2">Purposeful</h4>
            <p className="text-sm text-black/70">
              Every animation communicates something - state change, focus, feedback, or hierarchy. 
              No decorative motion.
            </p>
          </div>

          <div className="p-6 border border-black/8 rounded-[5px]">
            <div className="w-12 h-12 bg-black/5 rounded-[5px] flex items-center justify-center mb-4">
              <Sparkles size={24} />
            </div>
            <h4 className="font-semibold mb-2">Subtle</h4>
            <p className="text-sm text-black/70">
              Animations should enhance, not dominate. Users notice the effect, not the animation itself.
            </p>
          </div>

          <div className="p-6 border border-black/8 rounded-[5px]">
            <div className="w-12 h-12 bg-black/5 rounded-[5px] flex items-center justify-center mb-4">
              <Clock size={24} />
            </div>
            <h4 className="font-semibold mb-2">Responsive</h4>
            <p className="text-sm text-black/70">
              Fast enough to feel instant, slow enough to be perceived. Respect prefers-reduced-motion.
            </p>
          </div>
        </div>
      </section>

      {/* When to Use Motion */}
      <section>
        <h3 className="text-xl font-normal mb-6">When to Use Motion</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border-2 border-green-200 bg-green-50 rounded-[5px]">
            <h4 className="font-semibold mb-3 flex items-center gap-2 text-green-900">
              <CheckIcon size={18} />
              Do Animate
            </h4>
            <ul className="space-y-2 text-sm text-green-800">
              <li>• State changes (open/close, expand/collapse)</li>
              <li>• User feedback (hover, click, focus)</li>
              <li>• Loading and progress indicators</li>
              <li>• Attention direction (new content, errors)</li>
              <li>• Spatial relationships (modals, dropdowns)</li>
              <li>• Micro-interactions on interactive elements</li>
            </ul>
          </div>
          
          <div className="p-6 border-2 border-red-200 bg-red-50 rounded-[5px]">
            <h4 className="font-semibold mb-3 flex items-center gap-2 text-red-900">
              <X size={18} />
              Don't Animate
            </h4>
            <ul className="space-y-2 text-sm text-red-800">
              <li>• Page load (no intro animations)</li>
              <li>• Static content (text, images at rest)</li>
              <li>• Background decorations</li>
              <li>• Continuous looping (unless loading)</li>
              <li>• Multiple elements simultaneously</li>
              <li>• Critical user flows (keep instant)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Easing */}
      <section>
        <h3 className="text-xl font-normal mb-6">Easing Functions</h3>
        
        <div className="space-y-4">
          <div className="p-6 border border-black/8 rounded-[5px]">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold mb-1">ease-out (Default)</h4>
                <code className="text-xs text-black/60">cubic-bezier(0, 0, 0.2, 1)</code>
              </div>
            </div>
            <p className="text-sm text-black/70 mb-3">
              Starts fast, slows down. Use for most UI transitions - feels responsive and natural.
            </p>
            <div className="bg-black/5 rounded-[5px] p-3">
              <code className="text-xs">transition: all 300ms cubic-bezier(0, 0, 0.2, 1);</code>
            </div>
          </div>

          <div className="p-6 border border-black/8 rounded-[5px]">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold mb-1">ease-in-out</h4>
                <code className="text-xs text-black/60">cubic-bezier(0.4, 0, 0.2, 1)</code>
              </div>
            </div>
            <p className="text-sm text-black/70 mb-3">
              Smooth acceleration and deceleration. Use for larger movements or element transitions.
            </p>
            <div className="bg-black/5 rounded-[5px] p-3">
              <code className="text-xs">transition: transform 500ms cubic-bezier(0.4, 0, 0.2, 1);</code>
            </div>
          </div>

          <div className="p-6 border border-black/8 rounded-[5px]">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold mb-1">linear</h4>
                <code className="text-xs text-black/60">linear</code>
              </div>
            </div>
            <p className="text-sm text-black/70 mb-3">
              Constant speed. Use only for opacity changes, rotations, or loading spinners.
            </p>
            <div className="bg-black/5 rounded-[5px] p-3">
              <code className="text-xs">transition: opacity 200ms linear;</code>
            </div>
          </div>
        </div>
      </section>

      {/* Accessibility */}
      <section>
        <h3 className="text-xl font-normal mb-6">Motion Accessibility</h3>
        
        <div className="bg-blue-50 border border-blue-200 rounded-[5px] p-6">
          <div className="flex items-start gap-3">
            <div className="text-blue-600 flex-shrink-0 mt-1">
              <Sparkles size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">Respect User Preferences</h4>
              <p className="text-sm text-blue-800 mb-4">
                Always respect the <code className="bg-blue-100 px-1 rounded-[5px]">prefers-reduced-motion</code> media query. 
                Users with vestibular disorders or motion sensitivity must be able to disable animations.
              </p>
              <CodeBlock code={`/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}`} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ============================================
// DURATION SCALE CONTENT
// ============================================

export function DurationScaleContent() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  const triggerAnimation = (id: string) => {
    setActiveDemo(id);
    setTimeout(() => setActiveDemo(null), 1000);
  };

  return (
    <div className="space-y-12">
      <DocSection
        title="Duration Scale"
        why="Consistent timing creates rhythm and predictability across the interface"
        what="A 4-layer duration system optimized for perceived performance"
        when="Choose duration based on element size and complexity of change"
      >
        <p className="text-black/70">
          Our duration scale follows a simple principle: smaller, simpler changes are faster; 
          larger, more complex changes take longer.
        </p>
      </DocSection>

      {/* Duration Scale Overview */}
      <section>
        <h3 className="text-xl font-normal mb-6">The 4-Layer System</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-6 border border-black/8 rounded-[5px] text-center">
            <div className="text-3xl font-normal mb-2">100ms</div>
            <div className="text-xs font-medium text-black/60 mb-2">INSTANT</div>
            <p className="text-xs text-black/60">Micro-interactions</p>
          </div>
          <div className="p-6 border border-black/8 rounded-[5px] text-center">
            <div className="text-3xl font-normal mb-2">200ms</div>
            <div className="text-xs font-medium text-black/60 mb-2">FAST</div>
            <p className="text-xs text-black/60">Simple transitions</p>
          </div>
          <div className="p-6 border border-black/8 rounded-[5px] text-center">
            <div className="text-3xl font-normal mb-2">300ms</div>
            <div className="text-xs font-medium text-black/60 mb-2">NORMAL</div>
            <p className="text-xs text-black/60">Standard UI</p>
          </div>
          <div className="p-6 border border-black/8 rounded-[5px] text-center">
            <div className="text-3xl font-normal mb-2">500ms</div>
            <div className="text-xs font-medium text-black/60 mb-2">SLOW</div>
            <p className="text-xs text-black/60">Complex changes</p>
          </div>
        </div>
      </section>

      {/* 100ms - Instant */}
      <section>
        <h3 className="text-xl font-normal mb-6">100ms - Instant Feedback</h3>
        
        <ComponentPreview 
          title="Micro-interactions and hover states"
          description="Feels immediate - users perceive as instant"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimationDemo
              title="Hover Scale"
              duration="100ms"
              onTrigger={() => triggerAnimation('hover-scale')}
            >
              <div 
                className={`w-16 h-16 bg-black rounded-[5px] transition-transform duration-100 ${
                  activeDemo === 'hover-scale' ? 'scale-110' : 'scale-100'
                }`}
              />
            </AnimationDemo>

            <AnimationDemo
              title="Icon Rotate"
              duration="100ms"
              onTrigger={() => triggerAnimation('icon-rotate')}
            >
              <ChevronRight 
                size={32} 
                className={`transition-transform duration-100 ${
                  activeDemo === 'icon-rotate' ? 'rotate-90' : 'rotate-0'
                }`}
              />
            </AnimationDemo>

            <AnimationDemo
              title="Color Change"
              duration="100ms"
              onTrigger={() => triggerAnimation('color-change')}
            >
              <div 
                className={`w-16 h-16 rounded-[5px] transition-colors duration-100 ${
                  activeDemo === 'color-change' ? 'bg-[var(--brand-red)]' : 'bg-black'
                }`}
              />
            </AnimationDemo>
          </div>
        </ComponentPreview>

        <div className="space-y-3">
          <h4 className="font-semibold text-sm">Use 100ms for:</h4>
          <ul className="text-sm text-black/70 space-y-1">
            <li>• Hover state changes (color, scale, opacity)</li>
            <li>• Focus ring appearance</li>
            <li>• Small icon animations (rotate, flip)</li>
            <li>• Ripple effect initialization</li>
            <li>• Tooltip triggers</li>
          </ul>
        </div>

        <CodeBlock code={`/* 100ms - Instant feedback */
.button:hover {
  transform: scale(1.05);
  transition: transform 100ms ease-out;
}

.icon {
  transition: transform 100ms ease-out;
}

.icon:hover {
  transform: rotate(90deg);
}`} />
      </section>

      {/* 200ms - Fast */}
      <section>
        <h3 className="text-xl font-normal mb-6">200ms - Fast Transitions</h3>
        
        <ComponentPreview 
          title="Simple state transitions"
          description="Smooth but quick - ideal for most UI changes"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimationDemo
              title="Fade In/Out"
              duration="200ms"
              onTrigger={() => triggerAnimation('fade')}
            >
              <div 
                className={`w-20 h-20 bg-black rounded-[5px] transition-opacity duration-200 ${
                  activeDemo === 'fade' ? 'opacity-100' : 'opacity-30'
                }`}
              />
            </AnimationDemo>

            <AnimationDemo
              title="Slide In"
              duration="200ms"
              onTrigger={() => triggerAnimation('slide')}
            >
              <div 
                className={`w-20 h-20 bg-black rounded-[5px] transition-transform duration-200 ${
                  activeDemo === 'slide' ? 'translate-x-0' : '-translate-x-8'
                }`}
              />
            </AnimationDemo>

            <AnimationDemo
              title="Border Pulse"
              duration="200ms"
              onTrigger={() => triggerAnimation('border')}
            >
              <div 
                className={`w-20 h-20 rounded-[5px] transition-all duration-200 ${
                  activeDemo === 'border' 
                    ? 'border-4 border-black' 
                    : 'border border-black/20'
                }`}
              />
            </AnimationDemo>
          </div>
        </ComponentPreview>

        <div className="space-y-3">
          <h4 className="font-semibold text-sm">Use 200ms for:</h4>
          <ul className="text-sm text-black/70 space-y-1">
            <li>• Fade in/out effects</li>
            <li>• Button state transitions</li>
            <li>• Simple slide animations</li>
            <li>• Border and shadow changes</li>
            <li>• Badge appearances</li>
          </ul>
        </div>

        <CodeBlock code={`/* 200ms - Fast transitions */
.card {
  transition: all 200ms ease-out;
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.notification {
  opacity: 0;
  animation: fadeIn 200ms ease-out forwards;
}

@keyframes fadeIn {
  to { opacity: 1; }
}`} />
      </section>

      {/* 300ms - Normal */}
      <section>
        <h3 className="text-xl font-normal mb-6">300ms - Standard UI</h3>
        
        <ComponentPreview 
          title="Default duration for most animations"
          description="The sweet spot - perceptible but not slow"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimationDemo
              title="Expand"
              duration="300ms"
              onTrigger={() => triggerAnimation('expand')}
            >
              <div 
                className={`bg-black rounded-[5px] transition-all duration-300 ${
                  activeDemo === 'expand' ? 'w-24 h-24' : 'w-16 h-16'
                }`}
              />
            </AnimationDemo>

            <AnimationDemo
              title="Dropdown"
              duration="300ms"
              onTrigger={() => triggerAnimation('dropdown')}
            >
              <div className="relative">
                <div className="w-20 h-10 bg-black rounded" />
                <div 
                  className={`absolute top-12 left-0 w-20 bg-black/90 rounded transition-all duration-300 origin-top ${
                    activeDemo === 'dropdown' 
                      ? 'h-16 opacity-100 scale-y-100' 
                      : 'h-0 opacity-0 scale-y-0'
                  }`}
                />
              </div>
            </AnimationDemo>

            <AnimationDemo
              title="Modal Entry"
              duration="300ms"
              onTrigger={() => triggerAnimation('modal')}
            >
              <div 
                className={`w-24 h-20 bg-black rounded-[5px] transition-all duration-300 ${
                  activeDemo === 'modal' 
                    ? 'opacity-100 scale-100' 
                    : 'opacity-0 scale-95'
                }`}
              />
            </AnimationDemo>
          </div>
        </ComponentPreview>

        <div className="space-y-3">
          <h4 className="font-semibold text-sm">Use 300ms for:</h4>
          <ul className="text-sm text-black/70 space-y-1">
            <li>• Component transitions (accordion, tabs)</li>
            <li>• Modal and dialog appearances</li>
            <li>• Dropdown menus</li>
            <li>• Card hover effects</li>
            <li>• Page element transitions</li>
            <li>• Default button ripple duration</li>
          </ul>
        </div>

        <CodeBlock code={`/* 300ms - Standard duration */
.modal {
  opacity: 0;
  transform: scale(0.95);
  transition: all 300ms cubic-bezier(0, 0, 0.2, 1);
}

.modal.open {
  opacity: 1;
  transform: scale(1);
}

.dropdown-menu {
  max-height: 0;
  overflow: hidden;
  transition: max-height 300ms ease-out;
}

.dropdown-menu.open {
  max-height: 400px;
}`} />
      </section>

      {/* 500ms - Slow */}
      <section>
        <h3 className="text-xl font-normal mb-6">500ms - Complex Changes</h3>
        
        <ComponentPreview 
          title="Large movements and complex state changes"
          description="Noticeable timing - use sparingly"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimationDemo
              title="Page Transition"
              duration="500ms"
              onTrigger={() => triggerAnimation('page')}
            >
              <div 
                className={`w-24 h-24 bg-black rounded-[5px] transition-all duration-500 ${
                  activeDemo === 'page' 
                    ? 'translate-x-0 opacity-100' 
                    : 'translate-x-12 opacity-0'
                }`}
              />
            </AnimationDemo>

            <AnimationDemo
              title="Drawer Slide"
              duration="500ms"
              onTrigger={() => triggerAnimation('drawer')}
            >
              <div 
                className={`h-24 bg-black rounded-[5px] transition-all duration-500 ${
                  activeDemo === 'drawer' ? 'w-24' : 'w-0'
                }`}
              />
            </AnimationDemo>

            <AnimationDemo
              title="Skeleton Load"
              duration="500ms"
              onTrigger={() => triggerAnimation('skeleton')}
            >
              <div 
                className={`w-24 h-24 rounded-[5px] transition-all duration-500 ${
                  activeDemo === 'skeleton' 
                    ? 'bg-black' 
                    : 'bg-gradient-to-r from-black/20 via-black/10 to-black/20'
                }`}
              />
            </AnimationDemo>
          </div>
        </ComponentPreview>

        <div className="space-y-3">
          <h4 className="font-semibold text-sm">Use 500ms for:</h4>
          <ul className="text-sm text-black/70 space-y-1">
            <li>• Page transitions (when necessary)</li>
            <li>• Drawer/sidebar animations</li>
            <li>• Large modal entrances</li>
            <li>• Complex state changes</li>
            <li>• Skeleton screen transitions to content</li>
          </ul>
        </div>

        <CodeBlock code={`/* 500ms - Complex transitions */
.sidebar {
  transform: translateX(-100%);
  transition: transform 500ms cubic-bezier(0.4, 0, 0.2, 1);
}

.sidebar.open {
  transform: translateX(0);
}

.page-transition {
  animation: slideIn 500ms cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}`} />
      </section>

      {/* Decision Tree */}
      <section>
        <h3 className="text-xl font-normal mb-6">Duration Decision Tree</h3>
        
        <div className="p-6 border border-black/8 rounded-[5px] space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">
              1
            </div>
            <div>
              <p className="font-semibold mb-1">Is it a micro-interaction? (hover, focus, click feedback)</p>
              <p className="text-sm text-black/60">→ Use <strong>100ms</strong></p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">
              2
            </div>
            <div>
              <p className="font-semibold mb-1">Is it a simple state change? (show/hide, color, opacity)</p>
              <p className="text-sm text-black/60">→ Use <strong>200ms</strong></p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">
              3
            </div>
            <div>
              <p className="font-semibold mb-1">Is it a standard UI component? (dropdown, modal, accordion)</p>
              <p className="text-sm text-black/60">→ Use <strong>300ms</strong></p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">
              4
            </div>
            <div>
              <p className="font-semibold mb-1">Is it complex or large? (page transition, drawer, major layout shift)</p>
              <p className="text-sm text-black/60">→ Use <strong>500ms</strong></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ============================================
// TRANSITIONS CONTENT
// ============================================

export function TransitionsContent() {
  const [activeTransition, setActiveTransition] = useState<string | null>(null);

  const triggerTransition = (id: string) => {
    setActiveTransition(id);
    setTimeout(() => setActiveTransition(null), 600);
  };

  return (
    <div className="space-y-12">
      <DocSection
        title="Common Transitions"
        why="Reusable transition patterns ensure consistency and save development time"
        what="Pre-defined transitions for common UI patterns"
        when="Use these as starting points - customize timing if needed"
      >
        <p className="text-black/70">
          These transitions cover 90% of UI animation needs.
        </p>
      </DocSection>

      {/* Fade Transitions */}
      <section>
        <h3 className="text-xl font-normal mb-6">Fade Transitions</h3>
        
        <ComponentPreview title="Opacity-based transitions for subtle appearances">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimationDemo
              title="Fade In"
              duration="200ms"
              onTrigger={() => triggerTransition('fade-in')}
            >
              <div 
                className={`w-20 h-20 bg-black rounded-[5px] transition-opacity duration-200 ${
                  activeTransition === 'fade-in' ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {activeTransition === 'fade-in' && (
                  <div className="w-full h-full flex items-center justify-center text-white text-xs">
                    ✓
                  </div>
                )}
              </div>
            </AnimationDemo>

            <AnimationDemo
              title="Fade In Up"
              duration="300ms"
              onTrigger={() => triggerTransition('fade-in-up')}
            >
              <div 
                className={`w-20 h-20 bg-black rounded-[5px] transition-all duration-300 ${
                  activeTransition === 'fade-in-up' 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-4'
                }`}
              />
            </AnimationDemo>

            <AnimationDemo
              title="Fade In Scale"
              duration="300ms"
              onTrigger={() => triggerTransition('fade-in-scale')}
            >
              <div 
                className={`w-20 h-20 bg-black rounded-[5px] transition-all duration-300 ${
                  activeTransition === 'fade-in-scale' 
                    ? 'opacity-100 scale-100' 
                    : 'opacity-0 scale-90'
                }`}
              />
            </AnimationDemo>
          </div>
        </ComponentPreview>

        <CodeBlock code={`/* Fade transitions */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.fade-in { animation: fadeIn 200ms ease-out; }
.fade-in-up { animation: fadeInUp 300ms ease-out; }
.fade-in-scale { animation: fadeInScale 300ms cubic-bezier(0, 0, 0.2, 1); }`} />
      </section>

      {/* Slide Transitions */}
      <section>
        <h3 className="text-xl font-normal mb-6">Slide Transitions</h3>
        
        <ComponentPreview title="Directional movement for spatial context">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <AnimationDemo
              title="Slide Left"
              duration="300ms"
              onTrigger={() => triggerTransition('slide-left')}
            >
              <div 
                className={`w-16 h-16 bg-black rounded-[5px] transition-transform duration-300 ${
                  activeTransition === 'slide-left' ? 'translate-x-0' : 'translate-x-8'
                }`}
              />
            </AnimationDemo>

            <AnimationDemo
              title="Slide Right"
              duration="300ms"
              onTrigger={() => triggerTransition('slide-right')}
            >
              <div 
                className={`w-16 h-16 bg-black rounded-[5px] transition-transform duration-300 ${
                  activeTransition === 'slide-right' ? 'translate-x-0' : '-translate-x-8'
                }`}
              />
            </AnimationDemo>

            <AnimationDemo
              title="Slide Up"
              duration="300ms"
              onTrigger={() => triggerTransition('slide-up')}
            >
              <div 
                className={`w-16 h-16 bg-black rounded-[5px] transition-transform duration-300 ${
                  activeTransition === 'slide-up' ? 'translate-y-0' : 'translate-y-8'
                }`}
              />
            </AnimationDemo>

            <AnimationDemo
              title="Slide Down"
              duration="300ms"
              onTrigger={() => triggerTransition('slide-down')}
            >
              <div 
                className={`w-16 h-16 bg-black rounded-[5px] transition-transform duration-300 ${
                  activeTransition === 'slide-down' ? 'translate-y-0' : '-translate-y-8'
                }`}
              />
            </AnimationDemo>
          </div>
        </ComponentPreview>

        <CodeBlock code={`/* Slide transitions */
.slide-enter-left {
  transform: translateX(100%);
  transition: transform 300ms ease-out;
}

.slide-enter-left.active {
  transform: translateX(0);
}

.slide-enter-right {
  transform: translateX(-100%);
  transition: transform 300ms ease-out;
}

.slide-enter-right.active {
  transform: translateX(0);
}`} />
      </section>

      {/* Scale Transitions */}
      <section>
        <h3 className="text-xl font-normal mb-6">Scale Transitions</h3>
        
        <ComponentPreview title="Size-based transitions for emphasis">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimationDemo
              title="Scale Up"
              duration="300ms"
              onTrigger={() => triggerTransition('scale-up')}
            >
              <div 
                className={`bg-black rounded-[5px] transition-transform duration-300 ${
                  activeTransition === 'scale-up' ? 'w-20 h-20' : 'w-12 h-12'
                }`}
              />
            </AnimationDemo>

            <AnimationDemo
              title="Bounce"
              duration="500ms"
              onTrigger={() => triggerTransition('bounce')}
            >
              <div 
                className={`w-16 h-16 bg-black rounded-[5px] ${
                  activeTransition === 'bounce' ? 'animate-bounce-once' : ''
                }`}
              />
            </AnimationDemo>

            <AnimationDemo
              title="Pulse"
              duration="300ms"
              onTrigger={() => triggerTransition('pulse')}
            >
              <div 
                className={`w-16 h-16 bg-black rounded-[5px] transition-transform duration-300 ${
                  activeTransition === 'pulse' ? 'scale-110' : 'scale-100'
                }`}
              />
            </AnimationDemo>
          </div>
        </ComponentPreview>

        <CodeBlock code={`/* Scale transitions */
@keyframes scaleUp {
  from { transform: scale(0); }
  to { transform: scale(1); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

@keyframes bounceOnce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-25%); }
}

.scale-up { animation: scaleUp 300ms cubic-bezier(0, 0, 0.2, 1); }
.pulse { animation: pulse 300ms ease-in-out; }
.bounce-once { animation: bounceOnce 500ms ease-in-out; }`} />
      </section>

      {/* Rotate Transitions */}
      <section>
        <h3 className="text-xl font-normal mb-6">Rotate Transitions</h3>
        
        <ComponentPreview title="Rotational animations for icons and indicators">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimationDemo
              title="Rotate 90°"
              duration="100ms"
              onTrigger={() => triggerTransition('rotate-90')}
            >
              <ChevronRight 
                size={32}
                className={`transition-transform duration-100 ${
                  activeTransition === 'rotate-90' ? 'rotate-90' : 'rotate-0'
                }`}
              />
            </AnimationDemo>

            <AnimationDemo
              title="Rotate 180°"
              duration="200ms"
              onTrigger={() => triggerTransition('rotate-180')}
            >
              <ChevronRight 
                size={32}
                className={`transition-transform duration-200 ${
                  activeTransition === 'rotate-180' ? 'rotate-180' : 'rotate-0'
                }`}
              />
            </AnimationDemo>

            <AnimationDemo
              title="Spin (Loading)"
              duration="1000ms"
              onTrigger={() => triggerTransition('spin')}
            >
              <Loader2 
                size={32}
                className={`${
                  activeTransition === 'spin' ? 'animate-spin' : ''
                }`}
              />
            </AnimationDemo>
          </div>
        </ComponentPreview>

        <CodeBlock code={`/* Rotate transitions */
.rotate-90 {
  transition: transform 100ms ease-out;
}

.rotate-90.active {
  transform: rotate(90deg);
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spinner {
  animation: spin 1s linear infinite;
}`} />
      </section>
    </div>
  );
}

// ============================================
// MICRO-INTERACTIONS CONTENT
// ============================================

export function MicroInteractionsContent() {
  const [likeCount, setLikeCount] = useState(42);
  const [isLiked, setIsLiked] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const [isStarred, setIsStarred] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
      setIsLiked(false);
    } else {
      setLikeCount(likeCount + 1);
      setIsLiked(true);
    }
  };

  const handleNotification = () => {
    setNotificationCount(0);
  };

  const handleStar = () => {
    setIsStarred(!isStarred);
  };

  return (
    <div className="space-y-12">
      <DocSection
        title="Micro-interactions"
        why="Small, delightful animations create emotional connection and provide immediate feedback"
        what="Subtle animations on interactive elements - hover, click, focus states"
        when="Apply to all interactive elements for consistent, responsive feel"
      >
        <p className="text-black/70">
          Micro-interactions are the polish that separates good interfaces from great ones.
        </p>
      </DocSection>

      {/* Interactive Demos */}
      <section>
        <h3 className="text-xl font-normal mb-6">Interactive Demos</h3>
        
        <ComponentPreview title="Try these micro-interactions">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Like Button */}
            <div className="text-center">
              <button
                onClick={handleLike}
                className="group relative mb-4"
              >
                <Heart 
                  size={48}
                  className={`transition-all duration-300 ${
                    isLiked 
                      ? 'fill-red-500 text-red-500 scale-110' 
                      : 'text-black/40 hover:text-red-500 hover:scale-110'
                  }`}
                />
              </button>
              <div className="text-2xl font-normal mb-1">{likeCount}</div>
              <div className="text-xs text-black/60">Click to like</div>
            </div>

            {/* Notification Bell */}
            <div className="text-center">
              <button
                onClick={handleNotification}
                className="group relative mb-4"
              >
                <Bell 
                  size={48}
                  className={`transition-all duration-300 ${
                    notificationCount > 0
                      ? 'text-black hover:scale-110 animate-bounce-subtle'
                      : 'text-black/40 hover:text-black hover:scale-110'
                  }`}
                />
                {notificationCount > 0 && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold animate-fade-in-scale">
                    {notificationCount}
                  </div>
                )}
              </button>
              <div className="text-2xl font-normal mb-1">{notificationCount}</div>
              <div className="text-xs text-black/60">Notifications</div>
            </div>

            {/* Star Rating */}
            <div className="text-center">
              <button
                onClick={handleStar}
                className="group relative mb-4"
              >
                <Star 
                  size={48}
                  className={`transition-all duration-300 ${
                    isStarred 
                      ? 'fill-amber-400 text-amber-400 scale-110 rotate-12' 
                      : 'text-black/40 hover:text-amber-400 hover:scale-110'
                  }`}
                />
              </button>
              <div className="text-2xl font-normal mb-1">{isStarred ? '★' : '☆'}</div>
              <div className="text-xs text-black/60">Add to favorites</div>
            </div>
          </div>
        </ComponentPreview>
      </section>

      {/* Hover States */}
      <section>
        <h3 className="text-xl font-normal mb-6">Hover States</h3>
        
        <ComponentPreview title="Hover feedback on interactive elements">
          <div className="space-y-4">
            <div className="p-4 border border-black/8 rounded-[5px] hover:border-black/20 hover:shadow-lg transition-all duration-200 cursor-pointer">
              <p className="text-sm">Card with border + shadow on hover</p>
            </div>

            <div className="p-4 border border-black/8 rounded-[5px] hover:bg-black/[0.02] transition-colors duration-200 cursor-pointer">
              <p className="text-sm">Card with background color on hover</p>
            </div>

            <div className="p-4 border border-black/8 rounded-[5px] hover:scale-[1.02] transition-transform duration-200 cursor-pointer">
              <p className="text-sm">Card with subtle scale on hover</p>
            </div>
          </div>
        </ComponentPreview>

        <CodeBlock code={`/* Hover state patterns */
.card {
  transition: all 200ms ease-out;
}

/* Border + Shadow */
.card:hover {
  border-color: rgba(0, 0, 0, 0.2);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

/* Background tint */
.card:hover {
  background-color: rgba(0, 0, 0, 0.02);
}

/* Subtle scale */
.card:hover {
  transform: scale(1.02);
}`} />
      </section>

      {/* Click Feedback */}
      <section>
        <h3 className="text-xl font-normal mb-6">Click Feedback</h3>
        
        <ComponentPreview title="Immediate visual response to clicks">
          <div className="flex gap-4">
            <Button variant="primary" size="lg">
              Click me (ripple effect)
            </Button>
            <Button variant="secondary" size="lg">
              Button with feedback
            </Button>
          </div>
        </ComponentPreview>

        <CodeBlock code={`/* Click feedback (active state) */
.button:active {
  transform: scale(0.98);
  transition: transform 100ms ease-out;
}

/* Ripple effect (see Button component for full implementation) */
.ripple {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  animation: ripple-animation 600ms ease-out;
}

@keyframes ripple-animation {
  to {
    transform: scale(4);
    opacity: 0;
  }
}`} />
      </section>

      {/* Focus States */}
      <section>
        <h3 className="text-xl font-normal mb-6">Focus States</h3>
        
        <ComponentPreview title="Keyboard navigation feedback">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Focus this input (Tab key)"
              className="w-full px-4 py-3 border border-black/10 rounded-[5px] bg-white text-black/90 placeholder:text-black/30 hover:border-black/25 focus:border-black/90 focus:outline-none transition-colors duration-150"
            />
            <button className="px-6 py-3 bg-black text-white rounded focus:outline-none focus:ring-4 focus:ring-black/20 transition-all duration-200">
              Focus this button (Tab key)
            </button>
          </div>
        </ComponentPreview>

        <CodeBlock code={`/* Focus states for accessibility */
.input:focus {
  outline: none;
  border-color: rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.2);
  transition: all 200ms ease-out;
}

.button:focus {
  outline: none;
  box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.2);
  transition: box-shadow 200ms ease-out;
}

/* Always show focus ring for keyboard navigation */
.button:focus-visible {
  box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.2);
}`} />
      </section>

      {/* Loading States */}
      <section>
        <h3 className="text-xl font-normal mb-6">Loading States</h3>
        
        <ComponentPreview title="Progress and loading indicators">
          <div className="flex gap-6 items-center">
            <Loader2 size={32} className="animate-spin" />
            <div className="flex gap-2">
              <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
            <div className="w-32 h-1 bg-black/10 rounded-full overflow-hidden">
              <div className="h-full bg-black rounded-full animate-loading-bar"></div>
            </div>
          </div>
        </ComponentPreview>

        <CodeBlock code={`/* Loading animations */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spinner {
  animation: spin 1s linear infinite;
}

/* Dot bounce */
.dot {
  animation: bounce 1.4s infinite ease-in-out both;
}

.dot:nth-child(1) { animation-delay: -0.32s; }
.dot:nth-child(2) { animation-delay: -0.16s; }

@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}

/* Progress bar */
@keyframes loadingBar {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(400%); }
}

.loading-bar {
  animation: loadingBar 1.5s ease-in-out infinite;
}`} />
      </section>

      {/* Best Practices */}
      <section>
        <h3 className="text-xl font-normal mb-6">Micro-interaction Best Practices</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border-2 border-green-200 bg-green-50 rounded-[5px]">
            <h4 className="font-semibold mb-3 flex items-center gap-2 text-green-900">
              <CheckIcon size={18} />
              Do
            </h4>
            <ul className="space-y-2 text-sm text-green-800">
              <li>• Keep animations under 300ms</li>
              <li>• Provide immediate visual feedback</li>
              <li>• Use consistent timing across similar elements</li>
              <li>• Test with keyboard navigation</li>
              <li>• Make feedback proportional to action</li>
            </ul>
          </div>
          
          <div className="p-6 border-2 border-red-200 bg-red-50 rounded-[5px]">
            <h4 className="font-semibold mb-3 flex items-center gap-2 text-red-900">
              <X size={18} />
              Don't
            </h4>
            <ul className="space-y-2 text-sm text-red-800">
              <li>• Delay feedback (must be instant)</li>
              <li>• Animate multiple elements at once</li>
              <li>• Use heavy effects on frequently used actions</li>
              <li>• Forget about reduced-motion preferences</li>
              <li>• Over-animate (causes fatigue)</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}